visualize_aa_composition = function(protparam){
  frequency_dict = protparam.get_amino_acids_percent()
  labels = []
  data = []
  for (var aa in frequency_dict){
    var prob = frequency_dict[aa]
    labels.push(aa)
    data.push(prob)
  }
  var ctx = document.getElementById('aa_dist').getContext('2d');
  new Chart(ctx, {
    type: 'bar',
    data: {
        labels: labels,
        datasets: [{
            label: "Amino Acid Composition",
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: data,
        }]
    },
    options: {
      events: []
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
    visualize_aa_composition(this.protparam)
  }
})
