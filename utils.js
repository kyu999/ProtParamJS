parse_fasta = function(fasta){
  protparams = []
  var eof = false
  lines = fasta.split('\n')
  var i = 0
  var pair_info = null
  var sequence = []
  var data = []
  while(!eof){
    if(i >= lines.length){
      data.push({
        'id': pair_info['id'],
        'description': pair_info['description'],
        'sequence': sequence.join('')
      })
      return data
    }
    line = lines[i]
    if(line[0] == '>'){
      // save record
      if(sequence.length > 0){
        data.push({
          'id': pair_info['id'],
          'description': pair_info['description'],
          'sequence': sequence.join('')
        })
        sequence = []
        pair_info = null
      }
      id = line.split(' ')[0].slice(1)
      pair_info = {'id': id, 'description': line}
    } else {
      sequence.push(lines[i])
    }
    i += 1
  }
  return null
}

convert_to_zscores = function(data){
  if(data.length == 0){
    return []
  } else if(data.length == 1){
    return data
  }
  var mean = math.mean(data)
  var std  = math.std(data)
  return data.map(function(x){ return (x-mean)/std })
}
