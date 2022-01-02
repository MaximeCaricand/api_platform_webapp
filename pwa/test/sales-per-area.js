const { expect } = require('chai');
const { describe, it } = require('mocha');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

//emulate dom tree
const dom = new JSDOM(`<!DOCTYPE html><body><svg></svg></body>`);
const document = dom.window.document;


async function fetchD3() {
    const d3 = await import('d3') // asynchronically import d3 
    return d3;
}

function drawDonutChart(d3, formatted_data) {

    const width = 1200
    const height = 600
    const margin = 30;
    const radius = Math.min(width, height) / 2 - margin
    
    var generator = {}

    generator.render = function () {
        d3.select(document)
            .select("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", `translate(${width / 2},${height / 2})`)

        // set the color scale
        const color = d3.scaleOrdinal()
            .domain([Object.keys(formatted_data)])
            .range(["#073B3A", "#0B6E4F", "#08A045", "#6BBF59", "#DDB771", "#77A6B6"]);


        // Compute the position of each group on the pie:
        const pie = d3.pie()
            .sort(null) // Do not sort group by size
            .value(d => d[1])
        const data_ready = pie(Object.entries(formatted_data))

        // The arc generator
        const arc = d3.arc()
            .cornerRadius(5)
            .innerRadius(radius * 0.5)
            .outerRadius(radius * 0.7)

        // Arcs that won't be drawn for labels positioning
        const outerArc = d3.arc()
            .innerRadius(radius * 0.7)
            .outerRadius(radius * 0.7)
        const outerArc2 = d3.arc()
            .innerRadius(radius * 0.8)
            .outerRadius(radius * 0.8)

        // Build the donut chart slices
        d3.select(document)
            .select("svg")
            .selectAll('allSlices')
            .data(data_ready)
            .join('path')
            .attr('d', arc)
            .attr('fill', d => color(d.data[1]))
            .attr("stroke", "white")
            .style("stroke-width", "1px")
            .style("opacity", 0.7)

        // Add the polylines between chart and labels:
        d3.select(document)
        .select("svg")
            .selectAll('allPolylines')
            .data(data_ready)
            .enter()
            .append('polyline')
            .attr("stroke", "black")
            .style("fill", "none")
            .style("opacity", 0.3)
            .attr("stroke-width", 2)
            .attr('points', function (d) {
                var posA = outerArc.centroid(d) // line insertion in the slice
                var posB = outerArc2.centroid(d) // line break: we use the other arc generator that has been built only for that
                var posC = outerArc2.centroid(d); // Label position = almost the same as posB
                var midangle = d.startAngle + (d.endAngle - d.startAngle) / 2 // we need the angle to see if the X position will be at the extreme right or extreme left
                posC[0] = radius * 0.90 * (midangle < Math.PI ? 1 : -1); // multiply by 1 or -1 to put it on the right or on the left
                return [posA, posB, posC]
            })


        // Add labels:
        d3.select(document)
            .select("svg")
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
        d3.select(document)
            .select("svg")
            .selectAll('allSlices')
            .data(data_ready)
            .join('text')
            .text(function (d) { return d.data[1] + " %" })
            .attr("transform", function (d) { return `translate(${arc.centroid(d)})` })
            .style("text-anchor", "middle")
            .style("font-size", 12)
    }

    return generator;
}

describe('Test D3.js', function () {
    var c;
    var mock_data = { 'a': 12, 'b': 5, 'c': 8, 'd': 18, 'e': 21, 'f': 3 }

    before( async function () {
        d3 = await fetchD3()
        c = drawDonutChart(d3, mock_data);
        c.render();
    });

    describe('the svg', function () {
        it('should be created', function () {
            expect(d3.select(document)).not.to.be.null;
        });

        it('should have the correct height', function () {
            expect(d3.select(document).select("svg").attr("height")).to.be.equal("600");
        });

        it('should have the correct width', function () {
            expect(d3.select(document).select("svg").attr("width")).to.be.equal("1200");
        });

        it('should have 6 slices', function () {
            expect(d3.select(document).select("svg").selectAll("path").size()).to.be.equal(6)
        });
        it('should contain defined data values', function () {
            const donut_data = [];
            d3.select(document).select("svg").selectAll("path").each(function(d,i) { donut_data.push(d.value); });
            expect(donut_data).to.have.members(Object.values(mock_data))
        });
    });

});

