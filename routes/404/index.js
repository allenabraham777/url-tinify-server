module.exports.register = (server, options) => {
  server.route({
    method: '*',
    path: '/{any*}',
    config: {
      auth: false
    },
    handler: function (request, h) {

        return h.redirect('https://client.cutcut.cf/404')
    }
});
}

module.exports.pkg = {
  name: '404'
}