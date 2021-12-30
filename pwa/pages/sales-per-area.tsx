import { ENTRYPOINT } from "config/entrypoint";
import Head from "next/head";
import { useState, useEffect, useRef } from "react";
import DonutChart from "components/DonutChart";

const salesPerArea = () => {
  const years = ['2016', '2017', '2018', '2019', '2020', '2021'];
  var [year, setYear] = useState('2016');

  useEffect(() => {
    let select = (document.getElementById("year_selector") as HTMLTextAreaElement)
    select.value = "2016"
  }, [])


  return (
    <>
      <div className={`container h-100 number-of-sales `}>
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 p-5 text-center">
            <h2 className="fw-bold mb-4">Distribution des ventes par région en {year}</h2>
            <div className="row justify-content-md-center mb-0">
              <label className="col-sm-2 col-form-label">Sélectionner année</label>
              <div className="col-sm-2">
                <select id="year_selector" className="form-select" onChange={(e) => setYear(e.target.value)}>
                  {years.map((y) => (
                    <option key={years.indexOf(y)} value={y}>{y}</option>
                  ))}
                </select>
              </div>
            </div>
            <DonutChart selectedYear={year}></DonutChart>
          </div>
        </div>
      </div>
    </>
  )
}

export default salesPerArea;