module.exports = {
    routes: [
      {
        method: 'POST',
         path: '/login/player/:mobile/:otp',
        handler: 'playerlogin.playerlogin',
      }
    ]
  }