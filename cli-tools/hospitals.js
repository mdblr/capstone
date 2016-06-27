'use strict';
var fs = require('fs');
var path = require('path');
var locationPath = path.join(__dirname,'..','json','hospitals-in-seattle.json');
var node = path.basename(process.argv[0]);
var file = path.basename(process.argv[1]);
var name = process.argv[2];
var phone = process.argv[3];
var address = process.argv[4];
var description = process.argv[5];
var lat = process.argv[6];
var long = process.argv[7];
var verified = process.argv[8];
var link = process.argv[9];

function Directory(phoneArr) {
  var x = this;
  phoneArr.forEach(function(num) {
    x[num[0]] = num[1];
  })
}

function Hospital(input) {
  this.name = input[0];
  this.phone = input[1];
  this.address = input[2];
  this.description = input[3];
  this.lat= input[4];
  this.long = input[5];
  this.verified = input[6];
  this.link = input[7];
}

if (phone.length > 12) {
  phone = phone.split(',');

  var n = phone.length;
  for (var i = 0; i < phone.length; i++) {
    phone[i] = phone[i].split(':');
  }
  phone = new Directory(phone);
}

var input = [name, phone, address, description, lat, long, verified, link];

fs.readFile(locationPath, 'utf8', function(err, data) {
  if (err) {
    throw err;
  }

  var clinic = new Hospital(input);
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
