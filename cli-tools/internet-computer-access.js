'use strict';

var fs = require('fs');
var path = require('path');
var locationPath = path.join(__dirname, '..', 'json', 'free-internet-access.json');

var node = path.basename(process.argv[0]);
var file = path.basename(process.argv[1]);
var pin = path.basename(process.argv[2]);

function Location(input) {
  this.name = input[0];
  this.address = input[1];
  this.city = input[2];
  this.zip = input[3];
  this.phone = input[4];
  this.hours = input[5];
}

pin = pin.replace(/(\r\n|\n|\r)/gm, ",");
pin = pin.replace(/(,Name: |Address: |City: |Zip: |Phone: |Hours: )/gm, "");
pin = pin.split(',');

fs.readFile(locationPath, 'utf8', function(err, data) {
  if (err) {
    throw err;
  }
  var locations = JSON.parse(data);
  var newData = new Location(pin);
  newData = JSON.stringify(newData);

  fs.writeFile(locationPath, newData, function(writeErr) {
    if (writeErr) {
      throw writeErr;
    }

    process.exit(1);
  });
});
