<!U20452568>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>D3.js Dynamic Bar Chart</title>
    <style>
        .bar {
            fill: steelblue;
        }
        .bar:hover {
            fill: orange;
        }
        text {
            fill: white;
            font: 12px sans-serif;
            text-anchor: end;
        }
    </style>
</head>
<body>
    <script src="https://d3js.org/d3.v6.min.js"></script>
    <script>
        const data = [100, 420, 230, 850, 560, 925];

        const barHeight = 20;
        const barMargin = 1;
        const width = 500;
        const height = (barHeight + barMargin) * data.length;

        const svg = d3.select("body")
            .append("svg")
            .attr("width", width)
            .attr("height", height);

        const xScale = d3.scaleLinear()
            .domain([0, d3.max(data)])
            .range([50, width]);

        const bars = svg.selectAll("g")
            .data(data)
            .enter()
            .append("g")
            .attr("transform", (d, i) => `translate(0, ${i * (barHeight + barMargin)})`);

        bars.append("rect")
            .attr("class", "bar")
            .attr("width", d => xScale(d))
            .attr("height", barHeight);

        bars.append("text")
            .attr("x", d => xScale(d) - 5)
            .attr("y", barHeight / 2)
            .attr("dy", ".35em")
            .text(d => d);

        bars.selectAll("rect")
            .attr("width", 0)
            .transition()
            .duration(1000)
            .attr("width", d => xScale(d));

        bars.selectAll("rect")
            .on("mouseover", function() {
                d3.select(this).attr("fill", "orange");
            })
            .on("mouseout", function() {
                d3.select(this).attr("fill", "steelblue");
            });
    </script>
</body>
</html>
