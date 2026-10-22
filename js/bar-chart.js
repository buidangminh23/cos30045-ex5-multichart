// GenAI: steps follow the Exercise 5.1 brief; drafted with Claude Opus 5.5 and reviewed by me
d3.csv("data/tv55ScreenTechEnergy.csv", d => {
  return {
    Screen_Tech: d.Screen_Tech,
    Energy_Consumption: +d.Energy_Consumption
  };
}).then(data => {
  data.sort((a, b) => b.Energy_Consumption - a.Energy_Consumption);
  console.log(data);
  drawBarChart(data);
});

const drawBarChart = data => {
  const margin = { top: 40, right: 170, bottom: 40, left: 60 };
  const width = 1000;
  const height = 500;
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const svg = d3.select("#bar-chart")
    .append("svg")
      .attr("viewBox", `0 0 ${width} ${height}`);

  const innerChart = svg
    .append("g")
      .attr("transform", `translate(${margin.left}, ${margin.top})`);

  const xScale = d3.scaleBand()
    .domain(data.map(d => d.Screen_Tech))
    .range([0, innerWidth])
    .padding(0.1);

  const yScale = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.Energy_Consumption)])
    .range([innerHeight, 0])
    .nice();

  const bottomAxis = d3.axisBottom(xScale)
    .tickSizeOuter(0)
    .tickSize(0)
    .tickPadding(10);

  const leftAxis = d3.axisLeft(yScale);

  innerChart
    .append("g")
      .attr("transform", `translate(0, ${innerHeight})`)
      .call(bottomAxis)
      .style("font-size", "16px");

  innerChart
    .append("g")
      .call(leftAxis);

  innerChart
    .append("text")
      .attr("class", "axis-label")
      .text("Energy Consumption (kWh/year)")
      .attr("x", -margin.left)
      .attr("y", -15)
      .attr("text-anchor", "start");

  innerChart
    .selectAll(".bar")
    .data(data)
    .join("rect")
      .attr("class", "bar")
      .attr("width", xScale.bandwidth())
      .attr("height", d => innerHeight - yScale(d.Energy_Consumption))
      .attr("x", d => xScale(d.Screen_Tech))
      .attr("y", d => yScale(d.Energy_Consumption))
      .attr("fill", "#eeaa46");

  innerChart
    .selectAll(".bar-label")
    .data(data)
    .join("text")
      .attr("class", "bar-label")
      .text(d => `${Math.round(d.Energy_Consumption)} kWh`)
      .attr("x", d => xScale(d.Screen_Tech) + xScale.bandwidth() / 2)
      .attr("y", d => yScale(d.Energy_Consumption) - 8)
      .attr("text-anchor", "middle");
};
