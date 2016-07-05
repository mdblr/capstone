'use strict';

const data = require('./orgs_services.json');
const locations = data.data;

exports.seed = (knex, Promise) => {
  return knex('locdata').del()
    .then(() => {
      return knex('orgdata').del();
    })
    .then(() => {
      return knex('services').del();
    })
    .then(() => {
      return Promise.all([
        knex.raw('ALTER SEQUENCE locdata_id_seq restart;'),
        knex.raw('ALTER SEQUENCE orgdata_id_seq restart;'),
        knex.raw('ALTER SEQUENCE services_id_seq restart;')
      ]);
    })
    .then(() => {
      return Promise.all(
        locations.map(location => {
          return knex('locdata').insert({
              lat: location.lat,
              long: location.long
            }, 'id')
            .then(loc_id => {
              return Promise.all(
                location.orgs.map(org => {
                  return knex('orgdata').insert({
                      name: org.name,
                      phone_1: org.phone_1,
                      phone_2: org.phone_2,
                      address: org.address,
                      loc_id: loc_id[0]
                    }, 'id')
                    .then(org_id => {
                      return Promise.all(
                        org.services.map(service => {
                          return knex('services').insert({
                            health: service.health,
                            human: service.human,
                            material: service.material,
                            subcategory: service.subcategory,
                            description: service.description,
                            hours: service.hours,
                            verified: service.verified,
                            link: service.link,
                            org_id: org_id[0]
                          });
                        })
                      );
                    });
                })
              );
            });
        })
      );
    });
}
