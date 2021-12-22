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
        };
        import_d3();
    }, [])

//...
    return (
        //...
        <svg></svg>
    )
}