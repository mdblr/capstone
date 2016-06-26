var neighborhoodClinics = require('../seed.json');
var seeds = [];

neighborhoodClinics = JSON.parse(neighborhoodClinics);
for (var i = 0; i< neighborhoodClinics.length; i++) {
  seeds.push(
    function() {
      knex('neighborhood-clinics').insert(neighborhoodClinics[i]);
    }
  );
}

exports.seed = function(knex, Promise) {
  return knex('neighborhood-clinics').del().then(function() {
    return Promise.all(seeds);
  })
}
