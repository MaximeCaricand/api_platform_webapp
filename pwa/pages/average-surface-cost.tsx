import BarChart, { offsetValue } from "components/BarChart";
import LineChart, { ILineChartData } from "components/LineChart";
import React, { useState } from "react";
import {ENTRYPOINT} from "../config/entrypoint";

export default function Index(props: { data: Array<ILineChartData> }) {
    return (
        <>
            <div className={`container h-100 number-of-sales`}>
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12 p-5 text-center">
                        <h2 className="fw-bold mb-5">Prix moyen du m<sup>2</sup></h2>
                        <LineChart {...props}></LineChart>
                    </div>
                </div>
            </div>
        </>
    );
};

export async function getStaticProps(context): Promise<{ props: { data: Array<ILineChartData> } } | { notFound: boolean }> {
    process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = '0'
    const res = await fetch(ENTRYPOINT+`/land_values/priceAvg`);
    if (res.status === 200) {
        const data = await res.json();
        return data ? { props: { data: data['hydra:member'] } } : { notFound: true }
    }
}