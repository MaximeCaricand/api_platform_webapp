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
      <Head>
        <title>FullStack Lab</title>
      </Head>

      <div>
        <header>
        </header>
        <section>
          <div>
            <h1>
              <strong>Distribution des ventes par région en {year}</strong>
            </h1>
          </div>
        </section>
      </div>
      <div className="container">
        <div className="mb-3 row justify-content-md-center mt-5 mb-0">
          <label className="col-sm-2 col-form-label">Sélectionner année</label>
          <div className="col-sm-2">
            <select id="year_selector" className="form-select" onChange={(e) => setYear(e.target.value)}>
              {years.map((y) => (
                <option key={years.indexOf(y)} value={y}>{y}</option>
              ))}
            </select>
          </div>
        </div>
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 text-center">
            <DonutChart selectedYear={year}></DonutChart>
          </div>
        </div>
      </div>
    </>
  )
}

export default salesPerArea;