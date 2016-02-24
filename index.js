csvParse = require('csv-parse')

function parseCsvFile (filePath, cb) {
  csvParse(filePath, {delimiter: ',', trim: true}, function(err, data) {
    if (err) {
      throw err
    } else {
      var headers = data[0];
      var rows = data.slice(1);
      cb(arrayWithHeadersToObjects(headers, rows))
    }
  })
}

function arrayWithHeadersToObjects (headers, rows) {
  return rows.map(function(row) {
    var object = {};
    for (var i = 0; i < headers.length; i++) {
    var header = headers[i];
    object[header] = row[i]
  }
  return object
  })
}

module.exports = parseCsvFile;