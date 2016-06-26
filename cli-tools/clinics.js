'use strict';
var fs = require('fs');
var path = require('path');
var locationPath = path.join(__dirname,'..','json','clinics-in-seattle.json');
var node = path.basename(process.argv[0]);
var file = path.basename(process.argv[1]);
var name = process.argv[2];
var phone = process.argv[3];
var address = process.argv[4];
var description = process.argv[5];
var hours = process.argv[6];
var lat = process.argv[7];
var long = process.argv[8];
var verified = process.argv[9];

hours = hours.split(/(\r\n|\n|\r)/gm);
hours.forEach(function(item) {
  if (item === "\n") {
    hours.splice(hours.indexOf(item), 1)
  }
});

var input = [name, phone, address, description, hours, lat, long, verified];

function Clinic(input) {
  this.name = input[0];
  this.phone = input[1];
  this.address = input[2];
  this.description = input[3];
  this.hours = input[4];
  this.lat = input[5];
  this.long = input[6];
  this.verified = input[7];
}

fs.readFile(locationPath, 'utf8', function(err, data) {
  if (err) {
    throw err;
  }

  var clinic = new Clinic(input);
  data = JSON.parse(data);
  data.push(clinic);
  data = JSON.stringify(data);

  fs.writeFile(locationPath, data, function(writeErr) {
    if (writeErr) {
      throw writeErr;
    }

    process.exit(1);
  });
});
