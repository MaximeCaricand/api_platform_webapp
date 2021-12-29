import BarChart, { offsetValue } from "components/BarChart";
import React, { useState } from "react";
import styles from './number-of-sales.module.css';

const offsetValues: { [key in offsetValue]: { value: offsetValue, view: string } } = {
    year: { value: offsetValue.Year, view: 'Année' },
    month: { value: offsetValue.Month, view: 'Mois' },
    day: { value: offsetValue.Day, view: 'Jour' },
}

const FIRST_DATE = '2016-07-01';
const LAST_DATE = '2021-06-30'

export default function Index(props) {
    const [offset, setOffset] = useState(offsetValues.year.value);
    const [startDate, setStartDate] = useState(FIRST_DATE);
    const [endDate, setEndDate] = useState(LAST_DATE);

    const selectValues = Object.keys(offsetValues).map((offsetKey, index) => {
        return (<option key={`offsetOption${index}`} value={offsetValues[offsetKey].value}>{offsetValues[offsetKey].view}</option>);
    })

    return (
        <>
            <div className={`container h-100 number-of-sales ${styles['number-of-sales']}`}>
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12 p-5 text-center">
                        <h2 className="fw-bold mb-5">Nombre de ventes par {offsetValues[offset].view}</h2>
                        <BarChart {...{ offset, startDate, endDate }}></BarChart>
                    </div>
                    <div className="row">
                        <div className=" col-md-4 col-sm-6">
                            <label htmlFor="offset" className={styles['form-label']}>Ventes par</label>
                            <select id="offset" value={offset} className="form-select" onChange={(event) => setOffset(event.target.value as offsetValue)}>
                                {selectValues}
                            </select>
                        </div>
                        <div className="form-group col-md-4 col-sm-6">
                            <label htmlFor="startDate" className={styles['form-label']}>entre le</label>
                            <input type="date" id="startDate" className="form-control" min={FIRST_DATE} max={endDate} onChange={(event) => setStartDate(event.target.value)} value={startDate} required />
                        </div>
                        <div className="form-group col-md-4 col-sm-6">
                            <label htmlFor="endDate" className={styles['form-label']}>et le</label>
                            <input type="date" id="endDate" className="form-control" min={startDate} max={LAST_DATE} onChange={(event) => setEndDate(event.target.value)} value={endDate} required />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

