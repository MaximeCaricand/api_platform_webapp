import d3, { svg } from "d3";
import Head from "next/head";
import { FunctionComponent, useState, useEffect, useRef } from "react";

const donut_chart = ({donut_data}) => (
  
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
            <strong>Sale distribution per region</strong>
          </h1>
        </div>
      </section>
    </div>

    <ul>
      {donut_data["hydra:member"].map((obj) => (
        <li>{obj.region + " " + obj.distribution}</li>
      ))}
    </ul>

  </>
);

const Donut_chart = ({donut_data}) => {
  const ref = useRef()
  useEffect(() => {
    async function fetchD3(){

        const d3:any = await import('d3') // asynchronically import d3 
        const svg = d3.select('svg');
    
      
        
    }
    fetchD3()
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
              <strong>Sale distribution per region</strong>
            </h1>
          </div>
        </section>
      </div>

      <ul>
        {donut_data["hydra:member"].map((obj) => (
          <li>{obj.region + " " + obj.distribution}</li>
        ))}
      </ul>
      <svg
          ref={ref}
      />
    </>
  )
}

export async function getStaticProps(context) {
  process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = '0'

  const res = await fetch(`https://localhost/land_values/distributionRegion/2021`)
  const donut_data = await res.json()

  if (!donut_data) {
    return {
      notFound: true,
    }
  }

  return {
    props: { donut_data }, 
  }
}

export default Donut_chart;