const winston = require("winston");
var where = require('node-where');
const level ='debug';

const logger = new winston.Logger({
    transports: [
        new winston.transports.Console({
            level: level,
            timestamp: function () {
                return (new Date()).toISOString();
            }
        })
    ]
});


const getMetaData =(IP ,callback )=>{ where.is(IP, function(err, result) {
  if(err) return callback(err)
  if (result) {
   return callback(null,result);
 
  }
})
};

module.exports ={ logger , getMetaData};