module.exports = {
    routes: [
      {
        method: 'POST',
         path: '/external/:mobilenumber/:message',
        handler: 'external.external',
      }
    ]
  }