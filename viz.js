visualize_protparam_properties = function(protparams){
  var color_palette = d3.scaleOrdinal(d3.schemeCategory10)
  var lengths = protparams.map(function(protparam){ return protparam.protein.length })
  var length_zscores = convert_to_zscores(lengths)
  var molecular_weights = protparams.map(function(protparam){ return protparam.molecular_weight() })
  var molecular_weight_zscores = convert_to_zscores(molecular_weights)
  var gravys = protparams.map(function(protparam){ return protparam.gravy() })
  var gravy_zscores = convert_to_zscores(gravys)
  var absorbances = protparams.map(function(protparam){ return protparam.absorbance() })
  var absorbance_zscores = convert_to_zscores(absorbances)
  var instability_indexes = protparams.map(function(protparam){ return protparam.instability_index() })
  var instability_index_zscores = convert_to_zscores(instability_indexes)
  var datasets = []
  var original_value_datasets = []
  for (var i in protparams){
    protparam = protparams[i]
    var dataset = {
        label: protparam.id,
        borderColor: color_palette(i),
        data: [
          length_zscores[i],
          molecular_weight_zscores[i],
          gravy_zscores[i],
          absorbance_zscores[i],
          instability_index_zscores[i]
        ]
    }
    original_value_datasets.push([
      lengths[i],
      molecular_weights[i],
      gravys[i],
      absorbances[i],
      instability_indexes[i]
    ])
    datasets.push(dataset)
  }

  var ctx = document.getElementById('property').getContext('2d');
  return new Chart(ctx, {
    type: 'radar',
    data: {
        labels: ['Length', 'Molecular Weight', 'Gravy', 'Absorbance', 'Instability Index'],
        datasets: datasets
    },
    options: {
      title: {
            display: true,
            text: 'Property (standardlized as zscore)'
      },
      scales: {
        yAxes: [{ ticks: { beginAtZero:true } }]
      },
      tooltips: {
        callbacks: {
          label: function(item, data) {
            return original_value_datasets[item.datasetIndex][item.index]
          }
        }
      }
    }
  });
}

visualize_aa_composition = function(protparams){
  color_palette = d3.scaleOrdinal(d3.schemeCategory10)
  datasets = []
  for (var i in protparams){
    protparam = protparams[i]
    frequency_dict = protparam.get_amino_acids_percent()
    labels = []
    data = []
    for (var aa in frequency_dict){
      var prob = frequency_dict[aa] * 100
      labels.push(aa)
      data.push(prob)
    }
    datasets.push({
        label: protparam.id,
        backgroundColor: color_palette(i),
        borderColor: color_palette(i),
        data: data,
    })
  }

  var ctx = document.getElementById('aa_dist').getContext('2d');
  return new Chart(ctx, {
    type: 'bar',
    data: {
        labels: labels,
        datasets: datasets
    },
    options: {
      title: {
            display: true,
            text: 'Amino Acid Composition(%)'
      },
      scales: {
        yAxes: [{ ticks: { beginAtZero:true } }]
      }
    }
  });
}

visualize_kd_hydrophobicity = function(protparams){
  max_length = 0
  color_palette = d3.scaleOrdinal(d3.schemeCategory10)
  datasets = []
  for (var i in protparams){
    protparam = protparams[i]
    if(protparam.protein.length>max_length){
      max_length = protparam.protein.length
    }
    datasets.push({
      label: protparam.id,
      backgroundColor: color_palette(i+2),
      borderColor: color_palette(i+2),
      borderWidth: 0.6,
      pointRadius: 0.6,
      data: protparam.kd_hydrophobicity(),
      fill: false
    })
  }

  var ctx = document.getElementById('kd_hydrophobicity').getContext('2d');
  return new Chart(ctx, {
    type: 'line',
    data: {
      labels: [...Array(max_length).keys()],
      datasets: datasets
    },
    options: {
      title: {
            display: true,
            text: 'KD Hydrophobicity'
      },
      scales: {
        yAxes: [{ ticks: { beginAtZero:true } }]
      },
      tooltips: {
        callbacks: {
          label: function(item, data) {
            return ' ' + protparams[item.datasetIndex].protein[item.index] + ' | ' + protparams[item.datasetIndex].id
          }
        }
      }
    }
  });
}
