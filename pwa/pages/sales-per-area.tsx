import d3, { svg } from "d3";
import Head from "next/head";
import { FunctionComponent, useState, useEffect, useRef } from "react";


const Donut_chart = ({ donut_data }) => {

  const ref = useRef()
  const width = 900
  const height = 900

  var format_data = {}
  console.log(JSON.stringify(donut_data))
  donut_data["hydra:member"].map((sale) => {
    console.log(JSON.stringify(sale))
    let distribution = Math.round(Number(sale.distribution))
    if (distribution > 0)
      format_data[sale.region] = Math.round(Number(sale.distribution))
  })

  useEffect(() => {
    async function fetchD3() {

      const d3: any = await import('d3') // asynchronically import d3 

      // set the dimensions and margins of the graph

      const margin = 200;

      // The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
      const radius = Math.min(width, height) / 2 - margin

      // append the svg object to the div called 'my_dataviz'
      const svg = d3.select("svg")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append("g")
        .attr("transform", `translate(${width / 2},${height / 2})`);

      const data = format_data

      // set the color scale
      const color = d3.scaleOrdinal()
        .domain([Object.keys(data)])
        .range(d3.schemeDark2);

      // Compute the position of each group on the pie:
      const pie = d3.pie()
        .sort(null) // Do not sort group by size
        .value(d => d[1])
      const data_ready = pie(Object.entries(data))

      // The arc generator
      const arc = d3.arc()
        .innerRadius(radius * 0.5)         // This is the size of the donut hole
        .outerRadius(radius * 0.8)





      // Another arc that won't be drawn. Just for labels positioning
      const outerArc = d3.arc()
        .innerRadius(radius * 0.8)
        .outerRadius(radius * 0.8)
      const outerArc2 = d3.arc()
        .innerRadius(radius * 0.9)
        .outerRadius(radius * 0.9)

      // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
      svg
        .selectAll('allSlices')
        .data(data_ready)
        .join('path')
        .attr('d', arc)
        .attr('fill', d => color(d.data[1]))
        .attr("stroke", "white")
        .style("stroke-width", "2px")
        .style("opacity", 0.7)

      // Add the polylines between chart and labels:
      svg
        .selectAll('allPolylines')
        .data(data_ready)
        .enter()
        .append('polyline')
        .attr("stroke", "black")
        .style("fill", "none")
        .attr("stroke-width", 1)
        .attr('points', function (d) {
          var posA = outerArc.centroid(d) // line insertion in the slice
          var posB = outerArc2.centroid(d) // line break: we use the other arc generator that has been built only for that
          var posC = outerArc2.centroid(d); // Label position = almost the same as posB
          var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2 // we need the angle to see if the X position will be at the extreme right or extreme left
          posC[0] = radius * 0.90 * (midangle < Math.PI ? 1 : -1); // multiply by 1 or -1 to put it on the right or on the left
          return [posA, posB, posC]
        })


      // Add labels:
      svg
        .selectAll('allLabels')
        .data(data_ready)
        .join('text')
        .text(d => d.data[0])
        .attr('transform', function (d) {
          const pos = outerArc2.centroid(d);
          const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
          pos[0] = radius * 0.95 * (midangle < Math.PI ? 1 : -1);
          return `translate(${pos})`;
        })
        .style('text-anchor', function (d) {
          const midangle = d.startAngle + (d.endAngle - d.startAngle) / 2
          return (midangle < Math.PI ? 'start' : 'end')
        })
        .style("font-size", 12)

      // Creating annotations of sale distribution on the chart
      svg
        .selectAll('allSlices')
        .data(data_ready)
        .join('text')
        .text(function (d) { return d.data[1] + " %" })
        .attr("transform", function (d) { return `translate(${arc.centroid(d)})` })
        .style("text-anchor", "middle")
        .style("font-size", 12)

    }
    fetchD3()
  }, [])

  return (

    <>
      <Head>
        <title>FullStack Lab</title>
      </Head>

      <style>

      </style>

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
      <div className="container text-center">

        <svg width={width.toString()} height={height.toString()}
          ref={ref}
        />

      </div>
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