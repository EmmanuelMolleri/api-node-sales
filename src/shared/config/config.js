module.exports = {
    port: 3000,
    jwtSecret: '@!myCr1pt0S3qu3nc3!@',
    jwtExpirationInSeconds: 60 * 60,
    roles: {
      USER: 'user',
      ADMIN: 'admin',
      CLIENT: 'client'
    },
    productPriceUnits: {
      DOLLAR: 'dollar'
    }
  }