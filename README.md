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
