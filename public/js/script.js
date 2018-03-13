// let tagsInfo;
// let allData;
// let buttons;
// var groupSet = new Set();

let worldChart;
// let table;
// var groupIDs;

// read tags information data
d3.json("https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2014-01-01&endtime=2014-01-02", function (json) {
    //let tagcloud = d3.select("#tagCloud");
    //var geoObject = JSON.parse(data);
    let features = [];

    features = json.features;
    //console.log(features);
    let jproperties = json.features.map(function (d) { 
        let lat = d.geometry.coordinates[0];
        let lon = d.geometry.coordinates[1];
        let id =  d.id;
        //console.log(d.id);
        let data = {
            "lat": lat ,
            "lon": lon,
            "id": id,
            "properties":d.properties
        }
        return data; 

    });
    worldChart = new WorldChart(jproperties);
})

var pathColorScale = d3.scaleOrdinal() //ten colors
    .domain(d3.range(0, 9))
    .range(['#1f77b4', '#d448ce', '#edaf6d', '#f492a8', '#965628', '#3e8934', '#21c2ce', '#070cc2', '#70c32a', '#e9272a']);
//[blue, Magenta, olive, Teal, brown, dark green, purple, Navy, green, Red]