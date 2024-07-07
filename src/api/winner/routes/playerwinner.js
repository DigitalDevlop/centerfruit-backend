module.exports = {
    routes: [
      {
        method: 'POST',
         path: '/player/winner/:id/:category',
        handler: 'playerwinner.playerwinner',
      }
    ]
  }