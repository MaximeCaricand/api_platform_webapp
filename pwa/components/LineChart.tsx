import { useEffect, useRef, useState } from "react";
import styles from './LineChart.module.css';

export default function LineChart(props: { data: Array<ILineChartData> }) {
    const [loading, setLoading] = useState(true);
    const svgRef = useRef(null)

    useEffect(() => {
        (async () => {
            setLoading(true);
            const d3 = await import('d3');
            setLoading(false);

            const margin = { top: 60, right: 60, bottom: 30, left: 80 };
            const width = 1200 - margin.left - margin.right;
            const height = 500 - margin.top - margin.bottom;

            const tooltipNb = (nb: number): string => nb.toLocaleString('fr');
            const tooltipDate = d3.timeFormat("%m/%Y");

            const map: { [date: string]: number } = {};
            const data = props.data.map(d => {
                map[d.Date] = d.avgPrice;
                return {
                    date: d3.timeParse("%Y-%m")(d.Date),
                    avgPrice: +d.avgPrice
                }
            });

            //@ts-ignore 
            const line = d3.line().x(function (d) { return x(d.date) }).y(function (d) { return y(d.avgPrice) });

            const svg = d3.select(svgRef.current)
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

            const x = d3.scaleTime().domain(d3.extent(data, d => d.date)).range([0, width]);
            const y = d3.scaleLinear().domain([0, d3.max(data, function (d) { return d.avgPrice; })]).range([height, 0]);

            svg.append("g").attr("transform", "translate(0," + height + ")").call(d3.axisBottom(x).tickFormat(d3.timeFormat("%Y")).ticks(5));
            svg.append("g").call(d3.axisLeft(y));

            svg.append("path")
                .datum(data)
                .attr("fill", "none")
                .attr("stroke", "steelblue")
                .attr("stroke-width", 3)
                //@ts-ignore
                .attr("d", line);

            // tooltip
            const tooltip = svg.append("g")
                .attr("id", "tooltip")
                .style("display", "none");

            tooltip.append("circle")
                .attr("fill", "black")
                .attr("stroke", "white")
                .attr("stroke-width", "2px")
                .attr("r", 5);

            tooltip.append("polyline")
                .attr("points", "0,0 0,40 55,40 230,40 230,0 0,0")
                .style("fill", "white")
                .style("stroke", "black")
                .style("opacity", "0.9")
                .style("stroke-width", "1")
                .attr("transform", "translate(-30, -55)");

            const text = tooltip.append("text")
                .style("font-size", "13px")
                .style("font-family", "Segoe UI")
                .style("color", "#333333")
                .style("fill", "#333333")
                .attr("transform", "translate(-25, -40)");

            text.append("tspan").attr("id", "tooltip-date");
            text.append("tspan").attr("dx", "-42").attr("dy", "17").text("Nombre moyen de ventes : ");
            text.append("tspan").attr("id", "tooltip-close").style("font-weight", "bold");

            const bisectDate = d3.bisector((d: { date: Date }) => d.date).left;

            function mousemove(event) {
                const x0 = x.invert(d3.pointer(event)[0]);
                const i = bisectDate(data, x0);
                const d = data[i];
                tooltip.attr("transform", "translate(" + x(d.date) + "," + y(d.avgPrice) + ")");
                d3.select('#tooltip-date').text(tooltipDate(d.date));
                d3.select('#tooltip-close').text(tooltipNb(d.avgPrice));
            }

            svg.append("rect")
                .attr("class", "overlay")
                .attr("width", width)
                .attr("height", height)
                .attr("fill", "transparent")
                .on("mouseover", function (event) {
                    tooltip.style("display", null);
                })
                .on("mouseout", function (event) {
                    tooltip.style("display", "none");
                })
                .on("mousemove", mousemove);
        })();
    }, []);

    return (
        <>
            {loading && <div className={styles['lds-ring']}><div></div><div></div><div></div><div></div></div>}
            {!loading && <svg ref={svgRef}></svg>}
        </>
    );
}

export interface ILineChartData {
    avgPrice: number;
    Date: string;
}