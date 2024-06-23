/ U20452568
// Set up function.
function main() {
    //Set SVG container.
    var data = [100, 420, 230, 850, 560, 925]
    const margin = 1
    const barHeight = 20
    var height = data.length * barHeight + 20
    var width = 500

    // Create SVG element.
    var svg = d3.select('body').append('svg')
        .attr("width", width)
        .attr("height", height)

    // X-scale
    var xScale = d3.scaleLinear()
        .domain([d3.min(data), d3.max(data)])
        .range([50, width])
    
    // Make the bars.
    var bar = svg.selectAll('g')
        .data(data)
        .enter().append('g')
        .attr('transform', function (d, i) {
            return 'translate(0,'+ i * barHeight +')'
        });
       
    // Add bars.
    bar.append("rect").attr('width', function(d){
        return xScale(d);
    })
        .attr('height', barHeight - 1)
    
    // Add x-axis 
    var x_axis = d3.axisBottom()
        .scale(xScale);

    svg.append('g')
        .attr("transform", `translate(0, ${height -20})`)
        .call(x_axis)

    // Add labels.
    bar.append('text').attr('x', function(d){
        return xScale(d) - 25;})
        .attr('y', barHeight / 2)
        .attr('dy', '.35em')
        .text(function(d) {
            return d; 
        });

    // Animate bars.
    d3.selectAll('rect')
        .transition()
        .ease(d3.easeLinear)
        .duration(5000)
        .delay(function(d,i){return i*50})

    // Add hover effect.
    d3.selectAll("rect")
        .on("mouseover", function(){
            d3.select(this)
                .style("fill","aqua")
        })
        .on("mouseout", function(){
            d3.select(this)
                .style("fill","lightskyblue")
        })

}
