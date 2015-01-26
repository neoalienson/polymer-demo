var abv = require('./abv')

var dbPromise = abv.dbConnect('dev',
function() {
/*
  abv.upload('tests/abv.js', function() {
    abv.mongoose.connection.close();
  });
*/
});

