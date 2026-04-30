const dns = require('dns');
dns.resolveSrv('_mongodb._tcp.cluster0.u27e8qb.mongodb.net', (err, addresses) => {
    if (err) console.error(err);
    else console.log(JSON.stringify(addresses, null, 2));
});
