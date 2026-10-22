# Exercise 5: Multi-chart web page

COS30045 Data Visualisation, Bui Dang Minh (105716425)

Live page: https://buidangminh23.github.io/cos30045-ex5-multichart/

Three charts on one page, one JavaScript file per chart: a vertical bar chart with axes (5.1), a scatter plot turned into a line chart (5.2) and a donut chart (5.3).

## Files

- `js/bar-chart.js` - average energy use of 55 inch TVs by screen type
- `js/line-chart.js` - Australian electricity spot price 1998-2024 (`data/ARE_Spot_Prices.csv`)
- `js/donut-chart.js` - share of small, medium and large TV models
- `data/tv55ScreenTechEnergy.csv` and `data/tvScreenSizeCategory.csv` - TV data filtered and aggregated with the same steps as my Exercise 2 KNIME workflow (available models sold in Australia, screen size in inches, size bands small up to 43, medium 44-65, large 66 and above)

## Run locally

Open the folder in VS Code and start Live Server, or run `python -m http.server` in the folder and open http://localhost:8000. The page must be served by a server so that `d3.csv` can load the data files.

## Generative AI Reflection

- **Tool:** Claude Opus 5.5 (Anthropic), used through Claude Code in October 2026.
- **What I used it for:** drafting the HTML, CSS and D3 code by following the steps of the exercise brief, and explaining what each D3 method does.
- **What I changed or checked:** I ran the page with a local server, checked the data in the browser console and the elements in the DOM, and checked that the code only uses techniques from the Week 4 to Week 6 lectures and exercises.
- **What I learned:** the margin convention, axis generators, the line generator and how d3.pie turns values into angles for d3.arc.
- **Limitations:** the AI wrote code faster than I could read it, so I went through every file line by line before the demonstration. Each commit that contains generated code says so in the commit message, and each code file starts with a comment marking the GenAI use.
