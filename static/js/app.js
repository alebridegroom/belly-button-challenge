//where the data set it
const capsules = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

//function for graphs
function bar_chart(sample_name) {


  // Fetch the JSON data and console log it
  d3.json(capsules).then(function(data) {
    // console.log(data);

//mapping all the id's from the sample data set
    let samples_df_filtered = data.samples.filter(item => item.id == sample_name)
    // console.log(data.samples.filter(item => item.id));
    //graphing the the first elements from sampls
    let samples_df_filtered1 = samples_df_filtered[0]
    let sample_values = samples_df_filtered1.sample_values;
    let otu_ids = samples_df_filtered1.otu_ids;
    let sample_labels = samples_df_filtered1.otu_labels;
    // console.log(sample_values.slice(0,10).reverse())

    let bar_graph = {
      x: sample_values.slice(0,10).reverse(),
      //mapping the names if the id's to the graphs
      y: otu_ids.slice(0,10).reverse().map(row => "OTU" + row),
      text: sample_labels.slice(0,10).reverse(),
      type: "bar",
      orientation: "h",
      marker: {
        color : '#cea2fd',
        line: {
          color: '#35063e',
          width: 1.5
        }

      }
    };

    let layout = {
      margin: {
        l: 100,
        r: 100,
        t: 100,
        b: 100
      }
    };

    let bubble_graph = {
      x: otu_ids.reverse(),
      y: sample_values.reverse(),
      mode: "markers",
      text: sample_labels.reverse(),
      marker: {
        color: otu_ids,
        colorscale: "Blackbody",
        size: sample_values,
        line: {
          color: '#35063e',
          width: 1.5
        }
      }
    };
    let layout2 = {
      xaxis: {title: "OTU Labels"},
      autsize: true,
      margin: {
        l: 100,
        r: 50,
        t: 50,
        b: 50,
      }
    };
    final_graph = [bar_graph]
    final_buble = [bubble_graph]
    //plotting the graphs in there respective places
    Plotly.newPlot("bar", final_graph, layout);
    Plotly.newPlot("bubble", final_buble, layout2);
  });
}



function metadata(meta_name) {
  //calling the data
  d3.json(capsules).then(function(data) {
    //meta data set
    let mdata = data.metadata;
    //letting variable equal the meta_name so we can call this function later
    let meta_data_id = mdata.filter(item => item.id == meta_name);
    let metadata_html = d3.select("#sample-metadata");
    //first parameters of the metadata
    let result = meta_data_id[0];
    metadata_html.html("");
    for (key in result){
      metadata_html.append("h6").text(`${key.toUpperCase()}:${result[key]}`);
    };

  });

}

function init() {

  d3.json(capsules).then(function(data) {
  let names = data.names;
  let dropdownMenu = d3.select("#selDataset");
  for (let i = 0; i < names.length; i++) {
  	dropdownMenu
    	.append('option')
    	.text(names[i])
    	.property("value", names[i]);

}

  let first_sample = names[0]
  

  bar_chart(first_sample);
  metadata(first_sample)

  });
//shows different graphs for the id's
}
function optionChanged(sample){
  bar_chart(sample);
  metadata(sample);

}
init();