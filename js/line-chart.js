// GenAI: steps follow the Exercise 5.2 brief; drafted with Claude Opus 5.5 and reviewed by me
d3.csv("data/ARE_Spot_Prices.csv", d => {
  return {
    year: +d.Year,
    averagePrice: +d["Average Price (notTas-Snowy)"]
  };
}).then(data => {
  console.log(data);
  drawLineChart(data);
});

const drawLineChart = data => {
  const margin = { top: 40, right: 170, bottom: 60, left: 60 };
  const width = 1000;
  const height = 500;
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const xScale = d3.scaleLinear()
    .domain(d3.extent(data, d => d.year))
    .range([0, innerWidth]);

  const yScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.averagePrice)])
    .range([innerHeight, 0])
    .nice();

  const bottomAxis = d3.axisBottom(xScale)
    .tickFormat(d3.format("d"));

  const leftAxis = d3.axisLeft(yScale);

  const svg = d3.select("#line-chart")
    .append("svg")
      .attr("viewBox", `0 0 ${width} ${height}`);

  const innerChart = svg
    .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

  innerChart
    .append("g")
      .attr("transform", `translate(0, ${innerHeight})`)
      .call(bottomAxis);

  innerChart
    .append("g")
      .call(leftAxis);

  innerChart
    .append("text")
      .attr("class", "axis-label")
      .text("Average spot price ($ per megawatt hour)")
      .attr("x", -margin.left)
      .attr("y", -15)
      .attr("text-anchor", "start");

  innerChart
    .append("text")
      .attr("class", "axis-label")
      .text("Year")
      .attr("x", innerWidth)
      .attr("y", innerHeight + 45)
      .attr("text-anchor", "end");

  const lineGenerator = d3.line()
    .x(d => xScale(d.year))
    .y(d => yScale(d.averagePrice));

  innerChart
    .append("path")
      .attr("d", lineGenerator(data))
      .attr("fill", "none")
      .attr("stroke", "#7d6747")
      .attr("stroke-width", 2);

  innerChart
    .selectAll("circle")
    .data(data)
    .join("circle")
      .attr("r", 4)
      .attr("cx", d => xScale(d.year))
      .attr("cy", d => yScale(d.averagePrice))
      .attr("fill", "#eeaa46");

  const lastPoint = data[data.length - 1];

  innerChart
    .append("text")
      .attr("class", "line-label")
      .text(`${lastPoint.year}: $${lastPoint.averagePrice}`)
      .attr("x", xScale(lastPoint.year) + 10)
      .attr("y", yScale(lastPoint.averagePrice))
      .attr("dominant-baseline", "middle");
};
