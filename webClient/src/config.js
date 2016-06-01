var port = process.env.PORT || 3000,
    host = process.env.WEBSITE_HOSTNAME || 'http://localhost:'+port;

module.exports = {port: port, host:host};