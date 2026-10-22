// GenAI: steps follow the Exercise 5.3 brief; drafted with Claude Opus 5.5 and reviewed by me
d3.csv("data/tvScreenSizeCategory.csv", d => {
  return {
    Screensize_Category: d.Screensize_Category,
    Count: +d.Count
  };
}).then(data => {
  console.log(data);
  drawDonutChart(data);
});

const drawDonutChart = data => {
  const width = 1000;
  const height = 500;
  const radius = Math.min(width, height) / 2 - 20;

  const color = d3.scaleOrdinal()
    .domain(data.map(d => d.Screensize_Category))
    .range(["#f6e3a1", "#eeaa46", "#7d6747"]);

  const pie = d3.pie()
    .value(d => d.Count)
    .sort(null);

  const arcGenerator = d3.arc()
    .innerRadius(radius * 0.6)
    .outerRadius(radius * 1)
    .padAngle(0.02)
    .cornerRadius(4);

  const svg = d3.select("#donut-chart")
    .append("svg")
      .attr("viewBox", `0, 0, ${width}, ${height}`);

  const innerChart = svg
    .append("g")
      .attr("transform", `translate(${width / 2}, ${height / 2})`);

  let total = 0;
  data.forEach(d => {
    total = total + d.Count;
  });

  innerChart
    .selectAll("path")
    .data(pie(data))
    .join("path")
      .attr("d", arcGenerator)
      .attr("fill", d => color(d.data.Screensize_Category))
      .attr("stroke", "white")
      .attr("stroke-width", 2);

  innerChart
    .selectAll(".donut-label")
    .data(pie(data))
    .join("text")
      .attr("class", "donut-label")
      .attr("transform", d => `translate(${arcGenerator.centroid(d)})`)
      .attr("text-anchor", "middle")
      .attr("fill", d => d.data.Screensize_Category === "large" ? "white" : "#3d3326")
      .text(d => `${d.data.Screensize_Category} ${d3.format(".0%")(d.data.Count / total)}`);

  innerChart
    .append("text")
      .attr("class", "donut-label")
      .attr("text-anchor", "middle")
      .attr("y", 6)
      .text(`${total} TV models`);
};
