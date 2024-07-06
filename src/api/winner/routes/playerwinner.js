module.exports = {
    routes: [
      {
        method: 'POST',
         path: '/player/winner/:id/:otp/:category',
        handler: 'playerwinner.playerwinner',
      }
    ]
  }