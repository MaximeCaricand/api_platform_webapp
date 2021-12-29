import BarChart, { IBarChartData } from "components/BarChart";
import React, { useEffect, useState } from "react";
import styles from './number-of-sales.module.css';

const offsetValues = {
    year: { value: 'year', view: 'Année' },
    month: { value: 'month', view: 'Mois' },
    day: { value: 'day', view: 'Jour' },
}

export default function Index(props) {
    const [offset, setOffset] = useState(offsetValues.year.value);
    const [startDate, setStartDate] = useState('2019-01-01');
    const [endDate, setEndDate] = useState('2022-01-04');

    const selectValues = Object.keys(offsetValues).map((offsetKey, index) => {
        return (<option key={`offsetOption${index}`} value={offsetValues[offsetKey].value}>{offsetValues[offsetKey].view}</option>);
    })

    return (
        <>
            <div className={`container h-100 number-of-sales ${styles['number-of-sales']}`}>
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12 p-5 text-center">
                        <h2 className="fw-bold mb-5">Nombre de ventes</h2>
                        <BarChart {...{ offset, startDate, endDate }}></BarChart>
                    </div>
                    <div className="row">
                        <div className=" col-md-4 col-sm-6">
                            <label htmlFor="offset" className={styles['form-label']}>Ventes par</label>
                            <select id="offset" value={offset} className="form-select" onChange={(event) => setOffset(event.target.value)}>
                                {selectValues}
                            </select>
                        </div>
                        <div className="form-group col-md-4 col-sm-6">
                            <label htmlFor="startDate" className={styles['form-label']}>entre le</label>
                            <input type="date" id="startDate" className="form-control" onChange={(event) => setStartDate(event.target.value)} value={startDate} />
                        </div>
                        <div className="form-group col-md-4 col-sm-6">
                            <label htmlFor="endDate" className={styles['form-label']}>et le</label>
                            <input type="date" id="endDate" className="form-control" onChange={(event) => setEndDate(event.target.value)} value={endDate} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

