import { FunctionComponent, useState, useEffect } from "react";


const fakeData = {0 : {"date" : "2017", "prixMoyenParMettreCarre": 2}, 1 : {"date" : "2018", "prixMoyenParMettreCarre": 3}, 2 : {"date" : "2019", "prixMoyenParMettreCarre": 4}};

// dans le conteneur React
export default function PrixMetre2ParAnneeComponnent() {
    useEffect(() => {
        const import_d3 = async () => {
            // import {LineChart} from "@d3/line-chart"
            const d3 = await import('d3');
            const width = window.screen.width / 2;
            const heigh = window.screen.height / 2;
            const coordonneesBaseTransitionx = 50
            const coordonneesBaseTransitiony = 10;
            const svg = d3.select('svg')
                .attr("width", width)
                .attr("height", heigh);
            var scale = d3.scaleLinear()
                .domain([2017, 2019])
                .range([0, width]);
            var x_axis = d3.axisBottom(scale)
                .scale(scale)
                .tickValues([2017, 2018, 2019]);
            var scale = d3.scaleLinear()
                .domain([2, 4])
                .range([heigh/2, 0]);
            var y_axis = d3.axisLeft(scale)
                .scale(scale)
                .tickValues([2, 3, 4]);
            svg.append("g")
                .attr("transform", "translate(" + coordonneesBaseTransitionx + ", " + (heigh/2 + coordonneesBaseTransitiony) + ")")
                .call(x_axis);
            svg.append("g")
                .attr("transform", "translate(" + coordonneesBaseTransitionx + ", " + coordonneesBaseTransitiony + ")")
                .call(y_axis);
        };
        import_d3();
    }, [])

//...
    return (
        //...
        <svg></svg>
    )
}