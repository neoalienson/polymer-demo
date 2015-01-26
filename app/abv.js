var Abv = function() {
};

Abv.dbConnect = function(env, onOpen) {
  this.mongoose = require('mongoose');
  var db = this.mongoose.connection;
  var abv = this;
  var connectionStr = 'mongodb://localhost/' + env;
  console.log('connecting to ' + connectionStr);
  this.mongoose.connect(connectionStr);
  abv.createSchema();
  onOpen();
} // dbconnect

Abv.dbInit = function(mongoose) {
  
}

Abv.createSchema = function() {
  console.log('creating schema');
  var mongoose = this.mongoose;
  
  this.schema = {};
  this.models = {};
  
  this.schema.requirement = new mongoose.Schema( {
    desc : { type : String, required: true }
  });
  this.models.requirement = this.mongoose.model('Requirement', this.schema.requirement);
  
  this.schema.story = new this.mongoose.Schema( {
    desc : { type : String, required: true },
    requirements : [{ type : this.mongoose.Schema.Types.ObjectId, ref: 'Requirement' }]
  });
  
  this.models.story = this.mongoose.model('Story', this.schema.story);  
} // createSchema

Abv.upload = function(filename, onUploaded) {
  var fs = require('fs')
  var abv = this;
                          
  fs.readFile(filename, function(err, data) {
    if (err) throw err;
    
    var text = data.toString();
    
    // extract describe
    var desc = text.match(/describe\('([^']*)/)[1];
    var story = new abv.models.story({ desc : desc, requirements : [] });
    
    // extract it
    var xit;
    var re = /xit\('([^']*)/g;
    
    while ((xit = re.exec(text)) !== null) {
      var requirement = new abv.models.requirement({ desc : desc });
      story.requirements.push(requirement);
    }
    
    console.log(desc);
    story.save();
    
    onUploaded();
  });
}; // upload

module.exports = Abv;
