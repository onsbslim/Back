var multer  = require('multer');
var mime = require('mime-types');
var crypto = require('crypto');

// define multer storage configuration     
const storage = multer.diskStorage({
    destination : function(req,file,callback){
        callback(null, './public/CVs/');
    },
    filename: function(req,file,callback){

        crypto.pseudoRandomBytes(16, function (err, raw) {
            if (err) return callback(err)
      
            callback(null, raw.toString('hex') + '.'+ mime.extension(file.mimetype))
          })
    }
  });
  
  module.exports = multer({ storage : storage});
