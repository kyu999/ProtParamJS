visualize_aa_composition = function(protparam){
  frequency_dict = protparam.get_amino_acids_percent()
  labels = []
  data = []
  for (var aa in frequency_dict){
    var prob = frequency_dict[aa] * 100
    labels.push(aa)
    data.push(prob)
  }
  var ctx = document.getElementById('aa_dist').getContext('2d');
  return new Chart(ctx, {
    type: 'bar',
    data: {
        labels: labels,
        datasets: [{
            label: "Amino Acid Composition(%)",
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: data,
        }]
    },
    options: {
      scales: {
        yAxes: [{ ticks: { beginAtZero:true } }]
      }
    }
  });
}

visualize_kd_hydrophobicity = function(protparam){
  var ctx = document.getElementById('kd_hydrophobicity').getContext('2d');
  return new Chart(ctx, {
    type: 'line',
    data: {
        labels: protparam.aa_list,
        datasets: [{
            label: "KD Hydrophobicity",
            backgroundColor: 'rgb(153,204,255)',
            borderColor: 'rgb(153,204,255)',
            data: protparam.kd_hydrophobicity(),
            fill: false
        }]
    },
    options: {
      scales: {
        yAxes: [{ ticks: { beginAtZero:true } }]
      }
    }
  });
}

var protein_analysis = new Vue({
  el: '#protein_analysis',
  data: {
    sequence: ''
  },
  computed: {
    protparam: function(){
      return new ProtParam(this.sequence)
    },
    molecular_weight: function () {
      if(this.sequence == ''){
        return 0
      } else {
        return this.protparam.molecular_weight()
      }
    },
    gravy: function () {
      if(this.sequence == ''){
        return 0
      } else {
        return this.protparam.gravy()
      }
    },
    absorbance: function () {
      if(this.sequence == ''){
        return 0
      } else {
        return this.protparam.absorbance()
      }
    },
    instability_index: function() {
      if(this.sequence == ''){
        return 0
      } else {
        return this.protparam.instability_index()
      }
    }
  },
  updated: function () {
    aa_composition_chart.destroy()
    aa_composition_chart = visualize_aa_composition(this.protparam)
    kd_hydrophobicity_chart.destroy()
    kd_hydrophobicity_chart = visualize_kd_hydrophobicity(this.protparam)
  }
})

var aa_composition_chart = visualize_aa_composition(new ProtParam(''))
var kd_hydrophobicity_chart = visualize_kd_hydrophobicity(new ProtParam(''))
