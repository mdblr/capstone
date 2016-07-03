'use strict';

const fs = require('fs');
const parse = require('csv-parse');

fs.readFile('./seeds/orgs_services.csv', (err, data) => {
  if (err) throw err;

  let result = { data: [] };

  parse(data, (err, data) => {

    for (let i = 1 ; i < data.length ; i++) {

      let row = data[i];

      let location = {
        lat: row[0],
        long: row[1],
        orgs: []
      };

      let org = {
        name: row[2],
        phone_1: row[3],
        phone_2: row[4] || null,
        address: row[5],
        services: []
      };

      let service = {
        health: row[6] === "TRUE" ? true : false,
        human: row[7] === "TRUE" ? true : false,
        tech: row[8] === "TRUE" ? true : false,
        material: row[9] === "TRUE" ? true : false,
        subcategory: row[10] || null,
        description: row[11],
        hours: row[12] || null,
        verified: row[13] || null,
        link: row[14] || null
      }

      let update_location;
      let update_org;

      for (let j = 0; j < result.data.length ; j++) {

        if (result.data[j].lat === row[0] && result.data[j].long === row[1]) {

          update_location = j;

          for (var k = 0; k < result.data[j].orgs.length; k++) {
            if (result.data[j].orgs[k].name === row[2]) {
              update_org = k;
            }
          }
          break;
        }
      }

      if ((update_location && update_org) !== undefined) {
        result.data[update_location].orgs[update_org].services.push(service);
      }
      else if (update_location !== undefined) {
        org.services.push(service);
        result.data[update_location].orgs.push(org);
      }
      else {
        org.services.push(service);
        location.orgs.push(org);
        result.data.push(location);
      }

    }
    fs.writeFile('./seeds/orgs_services.json', JSON.stringify(result), err => {
      if (err) throw err;

      console.log('successful');
    });
  });
});
