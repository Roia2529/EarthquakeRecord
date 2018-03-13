//https://github.com/jasondavies/d3-cloud

class WorldChart {

    /**
     * Constructor for text cloud chart
     * @param   data network data, including links and nodes.
     */
    constructor (data) {
        this.Data = data;
     
        // Initializes the svg elements required for this chart
        this.margin = {top: 10, right: 20, bottom: 30, left: 20};
        let divnwChart = d3.select("#worldmap").classed("content", true);

        //fetch the svg bounds
        this.svgBounds = divnwChart.node().getBoundingClientRect();
        this.svgWidth = this.svgBounds.width - this.margin.left - this.margin.right;
        this.svgHeight = 450;

        //add the svg to the div
        this.svg = divnwChart.append("svg")
            .attr("width", this.svgWidth)
            .attr("height", this.svgHeight)
            .attr("class", "wordcloud");

        this.colorScale = d3.scaleOrdinal() //ten colors
                  .domain(d3.range(0,9))
                  .range(['#1f77b4','#d448ce','#edaf6d','#f492a8','#965628','#3e8934','#21c2ce','#070cc2','#70c32a','#e9272a']);  
                  //[blue, Magenta, olive, Teal, brown, dark green, purple, Navy, green, Red]
        this.textScale = d3.scaleOrdinal() //ten colors
                  .domain(['exploration','society','computers','health','brain','culture','design','relationships','future','other'])
                  .range(d3.range(0,10));  
          
        // this.sizeScale = d3.scaleLinear()
        //                 .domain([1, 2386])
        //                 .range([8, maxT]); 
        this.update();                


    };

    updateButton() {
        d3.select("#worldmap").selectAll('li')
        .classed('active',(d,i,object)=>{
          let obj = d3.select(object[i]).select('a');
            let t = d3.select(object[i]).text();
            if(t==this.selectedCategory){
              obj.style('border-color',()=>{return this.colorScale(this.selectedId)})
                  .style('border-bottom-color',"transparent");
              return true;
            }
            else {
              obj.style('border-color',"transparent");
               // .style('border-bottom-color',"transparent");
              return false;
            }

        });
        d3.select('#ulid').style('border-bottom-color',()=>{return this.colorScale(this.selectedId)});
    }
    /**
     * call by networkChart
     */
    setColor() {
        //this.colorScale = colscale;
        this.update();
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

        let result = document.getElementById('worldmap');
        this.Data.forEach( function(d, i) {
            //console.log(d);
            result.innerText = result.innerText + d["id"] + "\n";
        });

  }     


};