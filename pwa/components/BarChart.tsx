import { useEffect, useRef, useState } from "react";
import styles from './BarChart.module.css';

const MAX_TICK_SIZE = 70;
const TICK_OFFSET = 12;

export default function BarChart(props: { offset: string, startDate: string, endDate: string }) {
    const [loading, setLoading] = useState(true);
    const svgRef = useRef(null)

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

            const margin = { top: 30, right: 20, bottom: 90, left: 80 };
            const width = 1200 - margin.left - margin.right;
            const height = 400 - margin.top - margin.bottom;

            const x = d3.scaleBand().domain(data.map(d => d.Date)).range([0, width]).padding(0.2);
            const y = d3.scaleLinear().domain([0, d3.max(data, d => d.nb)]).range([height, 0]);

            const tickSize = x.domain().length;
            const tickvalues = tickSize > MAX_TICK_SIZE ? x.domain().filter((date, i) => (i % (Math.ceil(tickSize / TICK_OFFSET)) === 0) || i === tickSize - 1) : x.domain();

            const svgEl = d3.select(svgRef.current)
                .attr("id", "svg")
                .attr("width", width + margin.left + margin.right)
                .attr("height", height + margin.top + margin.bottom)
                .append("g")
                .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
                .style("fill", '#CA2D0B');

            const tooltip = d3.select("body").append("div")
                .attr("class", "tooltip")
                .style("opacity", 0);


            svgEl.append("g")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(x).tickSize(0).tickValues(tickvalues))
                .selectAll("text")
                .style("text-anchor", "end")
                .attr("dx", "-.8em")
                .attr("dy", ".15em")
                .attr("transform", "rotate(-65)");

            svgEl.append("g")
                .call(d3.axisLeft(y).ticks(6))
                .append("text")
                .attr("fill", "#000")
                .attr("transform", "rotate(90)")
                .attr("y", 6)
                .attr("dy", "-0.8em")
                .style("text-anchor", "start")
                .style("font-weight", "bold")
                .text("Nombre de ventes");

            const tooltipDate = (date: string): string => {
                const params: Intl.DateTimeFormatOptions = { year: 'numeric' };
                if (props.offset !== offsetValue.Year) {
                    params.month = 'short';
                    if (props.offset !== offsetValue.Month) {
                        params.day = 'numeric';
                    }
                }
                return new Date(date).toLocaleString('fr-FR', params);
            };
            const tooltipNb = (nb: number): string => nb.toLocaleString('fr');

            svgEl.selectAll(".bar")
                .data(data)
                .enter().append("rect")
                .attr("class", "bar")
                .attr("x", d => x(d.Date))
                .attr("width", x.bandwidth())
                .attr("y", d => y(d.nb))
                .attr("height", d => height - y(d.nb))
                .on("mouseover", (event, d) => {
                    tooltip.style("opacity", .9)
                        .style("border-radius", '5px')
                        .style("padding", '4px')
                        .style("color", 'white')
                        .style("background-color", 'black');
                    tooltip.html(`${tooltipDate(d.Date)}<br>Nombre de vente : <strong>${tooltipNb(d.nb)}</strong>`)
                        .style("left", (event.pageX + 10) + "px")
                        .style("top", (event.pageY - 50) + "px");
                })
                .on("mouseout", (event, d) => {
                    tooltip.style("opacity", 0);
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

export enum offsetValue {
    Year = 'year',
    Month = 'month',
    Day = 'day'
}