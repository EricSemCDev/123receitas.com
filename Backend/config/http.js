module.exports.http = {
  middleware: {
    order: [
      'cookieParser',
      'session',
      'bodyParser',
      'compress',
      'router',
      'www',
      'favicon',
    ],
    bodyParser: require('skipper')(),
  }
};