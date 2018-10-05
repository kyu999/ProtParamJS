var protein_analysis = new Vue({
  el: '#protein_analysis',
  data: {
    fasta: ''
  },
  computed: {
    protparams: function(){
      if(this.fasta == ''){
        return null
      }
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
    if(this.protparams){
      aa_composition_chart.destroy()
      aa_composition_chart = visualize_aa_composition(this.protparams)
      kd_hydrophobicity_chart.destroy()
      kd_hydrophobicity_chart = visualize_kd_hydrophobicity(this.protparams)
      molecular_weight_chart.destroy()
      molecular_weight_chart = visualize_molecular_weight(this.protparams)
    }
  }
})

init_protparams = [new ProtParam('')]
var aa_composition_chart = visualize_aa_composition(init_protparams)
var kd_hydrophobicity_chart = visualize_kd_hydrophobicity(init_protparams)
var molecular_weight_chart = visualize_molecular_weight(init_protparams)


$(function() {
        var droppable = $("#droppable");

        if(!window.FileReader) {
          alert("File API がサポートされていません。");
          return false;
        }

        var cancelEvent = function(event) {
            event.preventDefault();
            event.stopPropagation();
            return false;
        }

        droppable.bind("dragenter", cancelEvent);
        droppable.bind("dragover", cancelEvent);

        var handleDroppedFile = function(event) {
          var files = event.originalEvent.dataTransfer.files
          var file = files[files.length-1]; // always get up-to-date file, and allow only single file

          var fileReader = new FileReader();
          fileReader.onload = function(event) {
            protein_analysis.fasta = event.target.result
          }
          fileReader.readAsText(file);

          // デフォルトの処理をキャンセルします.
          cancelEvent(event);
          return false;
        }

        // ドロップ時のイベントハンドラを設定します.
        droppable.bind("drop", handleDroppedFile);
      });
