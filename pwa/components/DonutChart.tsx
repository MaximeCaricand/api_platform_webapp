import { useEffect, useState, useRef } from "react";
import { ENTRYPOINT } from "config/entrypoint";
import styles from './BarChart.module.css';


export default function DonutChart({ selectedYear }) {

    const [loading, setLoading] = useState(true);
    const ref = useRef()
    const width = 1200
    const height = 600
    const margin = 40;


    useEffect(() => {
        (async () => {

            /** Fetch api data */
            var api_data = await (async () => {
                setLoading(true);
                process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = '0'
                let url = ENTRYPOINT + `/land_values/distributionRegion/` + selectedYear;
                console.log(url)
                const res = await fetch(url);
                const data = await res.json()

                if (!data) {
                    return {
                        notFound: true,
                    }
                } else {
                    setLoading(false)
                }
                return data;
            })();

            /** Draw donut chart */
            var formatted_data = {}
            api_data["hydra:member"].map((sale) => {
                let distribution = Math.round(Number(sale.distribution))
                if (distribution > 0)
                    formatted_data[sale.region] = Math.round(Number(sale.distribution))
            })

            const d3: any = await import('d3') // asynchronically import d3 
            // d3.select("svg").selectAll("*").remove();
            const radius = Math.min(width, height) / 2 - margin

            // append the svg object to the div called 'my_dataviz'
            const svg = d3.select(ref.current)
                .append("svg")
                .attr("width", width)
                .attr("height", height)
                .append("g")
                .attr("transform", `translate(${width / 2},${height / 2})`)

            // set the color scale
            const color = d3.scaleOrdinal()
                .domain([0, Object.keys(formatted_data).length])
                .range(d3.schemeDark2);


            // Compute the position of each group on the pie:
            const pie = d3.pie()
                .sort(null) // Do not sort group by size
                .value(d => d[1])
            const data_ready = pie(Object.entries(formatted_data))

            // The arc generator
            const arc = d3.arc()
                .cornerRadius(5)
                .innerRadius(radius * 0.5)
                .outerRadius(radius * 0.7)

            // Arcs that won't be drawn for labels positioning
            const outerArc = d3.arc()
                .innerRadius(radius * 0.7)
                .outerRadius(radius * 0.7)
            const outerArc2 = d3.arc()
                .innerRadius(radius * 0.8)
                .outerRadius(radius * 0.8)

            // Build the donut chart slices
            svg
                .selectAll('allSlices')
                .data(data_ready)
                .join('path')
                .attr('d', arc)
                .attr('fill', d => color(d.data[1]))
                .attr("stroke", "white")
                .style("stroke-width", "1px")
                .style("opacity", 0.7)

            // Add the polylines between chart and labels:
            svg
                .selectAll('allPolylines')
                .data(data_ready)
                .enter()
                .append('polyline')
                .attr("stroke", "black")
                .style("fill", "none")
                .style("opacity", 0.3)
                .attr("stroke-width", 2)
                .attr('points', function (d) {
                    var posA = outerArc.centroid(d) // line insertion in the slice
                    var posB = outerArc2.centroid(d) // line break: we use the other arc generator that has been built only for that
                    var posC = outerArc2.centroid(d); // Label position = almost the same as posB
                    var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2 // we need the angle to see if the X position will be at the extreme right or extreme left
                    posC[0] = radius * 0.90 * (midangle < Math.PI ? 1 : -1); // multiply by 1 or -1 to put it on the right or on the left
                    return [posA, posB, posC]
                })


            // Add labels:
            svg
                .selectAll('allLabels')
                .data(data_ready)
                .join('text')
                .text(d => d.data[0])
                .attr('transform', function (d) {
                    const pos = outerArc2.centroid(d);
                    const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
                    pos[0] = radius * 0.95 * (midangle < Math.PI ? 1 : -1);
                    return `translate(${pos})`;
                })
                .style('text-anchor', function (d) {
                    const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
                    return (midangle < Math.PI ? 'start' : 'end')
                })
                .style("font-size", 12)

            // Creating annotations of sale distribution on the chart
            svg
                .selectAll('allSlices')
                .data(data_ready)
                .join('text')
                .text(function (d) { return d.data[1] + " %" })
                .attr("transform", function (d) { return `translate(${arc.centroid(d)})` })
                .style("text-anchor", "middle")
                .style("font-size", 12)
        })();
    }, [selectedYear])

    return (
        <>
            {loading && <div className={styles['lds-ring']}><div></div><div></div><div></div><div></div></div>}
            {!loading && <svg id="donut_chart" width={width.toString()} height={height.toString()} ref={ref} />}
        </>
    );

}
