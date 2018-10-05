var protein_analysis = new Vue({
  el: '#protein_analysis',
  data: {
    fasta: ''
  },
  computed: {
    protparams: function(){
      records = parse_fasta(this.fasta)
      for (var i in records){
        record = records[i]
        protparam = new ProtParam(record['sequence'], id = record['id'], description = record['description'])
        protparams.push(protparam)
      }
      return protparams
    }
  },
  updated: function () {
    aa_composition_chart.destroy()
    aa_composition_chart = visualize_aa_composition(this.protparams)
    kd_hydrophobicity_chart.destroy()
    kd_hydrophobicity_chart = visualize_kd_hydrophobicity(this.protparams)
    molecular_weight_chart.destroy()
    molecular_weight_chart = visualize_molecular_weight(this.protparams)
  }
})

init_protparams = [new ProtParam('')]
var aa_composition_chart = visualize_aa_composition(init_protparams)
var kd_hydrophobicity_chart = visualize_kd_hydrophobicity(init_protparams)
var molecular_weight_chart = visualize_molecular_weight(init_protparams)
