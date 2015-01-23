var Abv = function() {
};

Abv.dbConnect = function(account, pwd) {
      var cloudant = require('cloudant')
      
      cloudant({account:account, password:pwd}, function(er, cloudant) {
        if (er)
          return console.log('Error connecting to Cloudant account %s: %s', me, er.message)
        cloudant.ping(function(er, reply) {
          console.log('Server version = %s', reply.version)
          console.log('I am %s and my roles are %j', reply.userCtx.name, reply.userCtx.roles)

          cloudant.db.list(function(er, all_dbs) {
            if (er)
              return console.log('Error listing databases: %s', er.message)

            console.log('All my databases: %s', all_dbs.join(', '))
          })
        })
      })
    }

Abv.upload = function(filename) {
      var fs = require('fs')
                              
      fs.readFile('tests/abv.js', function(err, data) {
        if (err) throw err;
        
        var text = data.toString();
        
        // extract describe
        var desc = text.match(/describe\('([^']*)/)[1];
        
        // extract it
        var xit;
        var re = /xit\('([^']*)/g;
        
        while ((xit = re.exec(text)) !== null) 
          console.log(xit[1]);
        
        console.log(desc);
        
        return true;
      });
    };


module.exports = Abv;
