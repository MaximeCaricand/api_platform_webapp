import BarChart, { IBarChartData } from "components/BarChart";
import React, { useState } from "react";
// import styles from './sales-per-area.module.css';

const offsetValues = {
    year: { value: 'year', view: 'Année' },
    month: { value: 'month', view: 'Mois' },
    day: { value: 'day', view: 'Jour' },
}

export default function Index(props: { data: Array<IBarChartData> }) {
    const [offset, setOffset] = useState(offsetValues.year.value);
    const [startDate, setStartDate] = useState('2019-01-01');
    const [endDate, setEndDate] = useState('2022-01-04');

    function handleSubmit(event) {
        console.log("event");
        console.log(event);
    }

    const selectValues = Object.keys(offsetValues).map(offsetKey => {
        return (<option value={offsetValues[offsetKey].value}>{offsetValues[offsetKey].view}</option>);
    })

    return (
        <>
            <div className="container h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12 p-5 text-center">
                        <h2 className="fw-bold mb-5">Nombre de ventes</h2>
                        <BarChart {...props}></BarChart>
                    </div>
                    <div className="row">
                        <div className=" col-md-3 col-sm-6">
                            <label htmlFor="offset">Ventes par</label>
                            <select id="offset" value={offset} className="form-select" onChange={(event) => setOffset(event.target.value)}>
                                {selectValues}
                            </select>
                        </div>
                        <div className="form-group col-md-3 col-sm-6">
                            <label htmlFor="startDate">entre le</label>
                            <input type="date" id="startDate" className="form-control" onChange={(event) => setStartDate(event.target.value)} value={startDate} />
                        </div>
                        <div className="form-group col-md-3 col-sm-6">
                            <label htmlFor="endDate">et le</label>
                            <input type="date" id="endDate" className="form-control" onChange={(event) => setEndDate(event.target.value)} value={endDate} />
                        </div>
                        <div className="col-md-3 col-sm-6">
                            <button className="btn btn-dark btn-lg px-5" onSubmit={handleSubmit}>Appliquer</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};


export async function getStaticProps(context): Promise<{ props: { data: Array<IBarChartData> } } | { notFound: boolean }> {
    process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = '0'
    const res = await fetch(`https://localhost/land_values/nbSaleBy/month/2019-01-01/2022-01-04`);
    if (res.status === 200) {
        const data = await res.json();
        return data ? { props: { data: data['hydra:member'] } } : { notFound: true }
    }
}

