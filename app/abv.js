var Abv = function() {
};

Abv.dbConnect = function(env) {
  this.mongoose = require('mongoose');
  var db = this.mongoose.connection;
  db.on('error', console.error);
  var abv = this;
  db.once('open', function() {
    console.log('open');
    abv.createSchema();
  });
  var connectionStr = 'mongodb://localhost/' + env;
  console.log('connecting to ' + connectionStr);
  this.mongoose.connect(connectionStr);
} // dbconnect

Abv.dbInit = function(mongoose) {
  
}

Abv.createSchema = function() {
  console.log('creating schema');
  this.schema = {};
  this.schema.story = new this.mongoose.Schema( {
    desc : { type : String },
    requirements : { type : Object }
  });
} // createSchema

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
}; // upload

module.exports = Abv;
