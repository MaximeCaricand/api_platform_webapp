import { useEffect, useRef, useState } from "react";
import styles from './BarChart.module.css';

export default function BarChart(props: { offset: string, startDate: string, endDate: string }) {
    const [loading, setLoading] = useState(true);
    const svgRef = useRef(null)
    console.log("HEEERERERE");

    useEffect(() => {
        (async () => {
            setLoading(true);
            // asynchronically import d3 
            const d3 = await import('d3');
            // Fetch data
            const data: Array<IBarChartData> = await (async () => {
                process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = '0'
                const res = await fetch(`https://localhost/land_values/nbSaleBy/${props.offset}/${props.startDate}/${props.endDate}`);
                if (res.status === 200) {
                    const data = await res.json();
                    if (data) {
                        setLoading(false);
                        return data['hydra:member'];
                    }
                }
            })();

            const margin = { top: 20, right: 20, bottom: 90, left: 80 };
            const width = 1200 - margin.left - margin.right;
            const height = 400 - margin.top - margin.bottom;

            const x = d3.scaleBand().range([0, width]).padding(0.2);
            const y = d3.scaleLinear().range([height, 0]);

            const svgEl = d3.select(svgRef.current)
                .attr("id", "svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
                .style("fill", '#CA2D0B');

            const div = d3.select("body").append("div")
                .attr("class", "tooltip")
                .style("opacity", 0);

            x.domain(data.map(d => d.Date));
            y.domain([0, d3.max(data, d => d.nb)]);

            svgEl.append("g")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(x).tickSize(0))
                .selectAll("text")
                .style("text-anchor", "end")
                .attr("dx", "-.8em")
                .attr("dy", ".15em")
                .attr("transform", "rotate(-65)");

            svgEl.append("g")
                .call(d3.axisLeft(y).ticks(6));

            svgEl.selectAll(".bar")
                .data(data)
                .enter().append("rect")
                .attr("class", "bar")
                .attr("x", d => x(d.Date))
                .attr("width", x.bandwidth())
                .attr("y", d => y(d.nb))
                .attr("height", d => height - y(d.nb))
                .on("mouseover", (event, d) => {
                    div.transition()
                        .duration(200)
                        .style("opacity", .9)
                        .style("border-radius", '5px')
                        .style("padding", '4px')
                        .style("color", 'white')
                        .style("background-color", 'black');
                    div.html("Nombre de vente : " + d.nb.toLocaleString('fr'))
                        .style("left", (event.pageX + 10) + "px")
                        .style("top", (event.pageY - 50) + "px");
                })
                .on("mouseout", (event, d) => {
                    div.transition()
                        .duration(250)
                        .style("opacity", 0);
                });
        })();
    }, [props]);

    return (
        <>
            {loading && <div className={styles['lds-ring']}><div></div><div></div><div></div><div></div></div>}
            {!loading && <svg ref={svgRef} />}
        </>
    );
}

export interface IBarChartData {
    nb: number;
    Date: string;
}