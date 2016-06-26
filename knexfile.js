module.exports = {

  development : {
    client: 'pg',
    connection: 'postgres://localhost/scn'
  },
  production: {
    client: 'pg',
    connection: process.env.DATABASE_URL
  }
};
