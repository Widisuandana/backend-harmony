module.exports = {
    secret: process.env.JWT_SECRET,
    refreshSecret: process.env.JWT_REFRESH_SECRET
    ,tokenExpiration: '15m',
    refreshTokenExpiration: '7d'
  };