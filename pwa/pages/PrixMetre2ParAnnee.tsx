import { FunctionComponent, useState, useEffect } from "react";


const fakeData = {0 : {"date" : "08/01/2022", "prixMoyenParMettreCarre": 2}, 1 : {"date" : "08/01/2021", "prixMoyenParMettreCarre": 3}, 2 : {"date" : "09/01/2021", "prixMoyenParMettreCarre": 1}, 3 : {"date" : "10/01/2020", "prixMoyenParMettreCarre": 4}};

// dans le conteneur React
export default function PrixMetre2ParAnneeComponnent() {
    useEffect(() => {
        const import_d3 = async () => {
            // import {LineChart} from "@d3/line-chart"
            const d3 = await import('d3');
            const width = window.screen.width / 2;
            const heigh = window.screen.height / 2;
            const coordonneesBaseTransitionx = 50
            const coordonneesBaseTransitiony = 50;
            const svg = d3.select('svg')
                .attr("width", width)
                .attr("height", heigh);
            let nombreDanneesTraite = 0;

            const data = new Array();
            for (let i in fakeData) {
                let date = fakeData[i].date.split("/");
                date = date[2] + date[1] + date[0];
                console.log(date)
                data.push([new Date(fakeData[i].date), fakeData[i].prixMoyenParMettreCarre])
                nombreDanneesTraite++;
            }
          //  data.sort((a, b) => a[0] - b[0]);
            const X_annee = new Array();
            const Y_prixMoyen = new Array();
            for (let i in data) {
                X_annee.push(data[i][0]);
                Y_prixMoyen.push(data[i][1]);
            }
            X_annee.sort((a, b) => a - b);
            console.log(data);

            var xScale = d3.scaleTime()
              //  .domain([data[0][0], data[data.length - 1][0]])
                .range([0, width * 3/4])
                .domain(d3.extent(data, d => d[0]));
               // .tickFormat(d3.timeFormat('%Y'));
            var yScale = d3.scaleLinear()
                .domain([1, 4])
                .range([heigh/2, 0]);
            const curve = d3.curveLinear;
            const I = d3.range(X_annee.length);
            const defined = (d, i) => !isNaN(X_annee[i]) && !isNaN(Y_prixMoyen[i]);
            const D = d3.map(data, defined);
            const line = d3.line()
                .defined(i => D[i])
                .curve(curve)
                .x(i => xScale(X_annee[i]))
                .y(i => yScale(Y_prixMoyen[i]));

            svg.append("path")
                .attr("fill", "none")
                .attr("stroke", "blue")
                .attr("stroke-width", 2)
                .attr("stroke-linecap", 1)
                .attr("stroke-linejoin", 1)
                .attr("stroke-opacity", 0.5)
                .attr("d", line(I))
                .attr("transform", "translate(" + coordonneesBaseTransitionx + ", 0)");
            svg.append("text")
                .attr("x", (width / 2))
                .attr("y", (coordonneesBaseTransitiony / 2))
                .attr("text-anchor", "middle")
                .style("fill", "#5a5a5a")
                .style("font-family", "Raleway")
                .style("font-weight", "300")
                .style("font-size", "24px")
                .text("Prix Moyen du M²");
            creationAxis(d3, svg, heigh, coordonneesBaseTransitionx, coordonneesBaseTransitiony, xScale, yScale, data);
        };
        import_d3();
    }, [])

    function creationAxis(d3, svg, heigh, coordonneesBaseTransitionx, coordonneesBaseTransitiony, xScale, yScale) {
        var x_axis = d3.axisBottom(xScale)
            .tickValues(xScale.ticks(d3.timeYear, 1))
            .tickFormat(d3.timeFormat("%Y"));
        var y_axis = d3.axisLeft(yScale)
            .scale(yScale);
        svg.append("g")
            .attr("transform", "translate(" + coordonneesBaseTransitionx + ", " + (heigh/2 + coordonneesBaseTransitiony) + ")")
            .call(x_axis);
        svg.append("g")
            .attr("transform", "translate(" + coordonneesBaseTransitionx + ", " + coordonneesBaseTransitiony + ")")
            .call(y_axis);
    }

    return (
        //...
        <svg></svg>
    )
}