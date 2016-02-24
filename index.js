csvParse = require('csv-parse');
fs = require('fs');

function parseCsvFile (filePath, cb) {
  fs.readFile(filePath, {encoding: "utf-8"}, function(err, result) {
    if (err) {
      throw err
    } else {
      csvParse(result, {delimiter: ',', trim: true}, function(err, data) {
        if (err) {
          throw err
        } else {
          var headers = data[0];
          var rows = data.slice(1);
          cb(arrayWithHeadersToObjects(headers, rows))
        }
      })
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