//https://github.com/jasondavies/d3-cloud

class WorldChart {

    /**
     * Constructor for text cloud chart
     * @param   data network data, including links and nodes.
     */
    constructor (data, geojson) {
        this.Data = data;
        this.Geojson = geojson;
        // Initializes the svg elements required for this chart
        this.margin = {top: 10, right: 20, bottom: 30, left: 20};
        let divnwChart = d3.select("#worldmap").classed("content", true);

        //fetch the svg bounds
        this.svgBounds = divnwChart.node().getBoundingClientRect();
        this.svgWidth = this.svgBounds.width - this.margin.left - this.margin.right;
        this.svgHeight = 500;

        //add the svg to the div
        this.svg = divnwChart.append("svg")
            .attr("width", this.svgWidth)
            .attr("height", this.svgHeight)
            .attr("class", "wordcloud");

        this.colorScale = d3.scaleQuantize() //ten colors
                  .domain(d3.range(0,9))
                  .range(['#1f77b4','#d448ce','#edaf6d','#f492a8','#965628','#3e8934','#21c2ce','#070cc2','#70c32a','#e9272a']);  
                  
        
        this.world_g = this.svg.append('g')
            .attr('class', 'countries');
        this.allpath = this.world_g.selectAll('path')
            .data(this.Geojson.features);

           
        this.update();  
    };

    retriveNewData(){
        console.log('click button');
    }

    /**
     * Renders the HTML content for tool tip.
     *
     * @param tooltip_data information that needs to be populated in the tool tip
     * @return text HTML content for tool tip
     */
    circle_tooltip_render(tooltip_data) {
        let text = "<h2 style='color:"  + tooltip_data.color + ";' >" + tooltip_data.tag + "</h2>";
        text +=  "Group ID: " + tooltip_data.groupid;

        return text;
    }

    /**
     * Creates a chart with circles representing each election year, populates text content and other required elements for the Year Chart
     */
    update () {
        const projection = d3.geoMercator()
          .scale(130)
          .translate( [this.svgWidth / 2, this.svgHeight / 1.5]);

        const path = d3.geoPath().projection(projection);

        this.allpath.enter().append('path')
              .attr('d', path)
              .style('fill', '#3c3c3c')
              .style('stroke', 'white')
              .style('opacity', 0.8)
              .style('stroke-width', 0.3);
              // tooltips
              // .on('mouseover',function(d){
              //   tip.show(d);
              //   d3.select(this)
              //     .style('opacity', 1)
              //     .style('stroke-width', 3);
              // })
              // .on('mouseout', function(d){
              //   tip.hide(d);
              //   d3.select(this)
              //     .style('opacity', 0.8)
              //     .style('stroke-width',0.3);
              // });
          //world_g.append('path')    
          this.svg.append('path')
            .datum(topojson.mesh(this.Geojson.features, function(a, b) { return a !== b; }))
            .attr('class', 'names')
            .attr('d', path);
        
        this.updateCircle(projection);  
    } 

    updateCircle(projection){
        let rScale = d3.scaleLinear()
                        .domain([-1, 9])
                        .range([3, 9]); 

        let eqdata = this.Data;
        //this.world_g.selectAll('circle').remove();

        this.world_g.selectAll('circle')
                .data(eqdata)
                .enter().append('circle')
                .attr("cx", function (d){ 
                    return projection(d['pos'])[0]; 
                })                
                .attr("cy", (d)=> { return projection(d['pos'])[1]; })
                .attr("r", (d)=> { 
                    return rScale(+d['properties']['mag']);
                    //return 4; 
                })
                .attr("fill", "red")
                .on('click',(d)=>{
                    console.log(d['properties']);
                });

    }    


};