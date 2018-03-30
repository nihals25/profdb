var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var conn = mongoose.connection;
var multer = require('multer');
var GridFsStorage = require('multer-gridfs-storage');
var Grid = require('gridfs-stream');
Grid.mongo = mongoose.mongo;
var gfs;

mongoose.connection.once('open', function () {	
    gfs = Grid(mongoose.connection.db);
});

var storage = GridFsStorage({
	url: 'mongodb://localhost:27017/profdb',
    gfs : gfs,
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]);
    },    
    metadata: function(req, file, cb) {
        cb(null, { originalname: file.originalname });
    },
    root: 'ctFiles'
});

var upload = multer({ 
    storage: storage
}).single('file');

router.post('/upload', function(req, res) {
	console.log(req);
    upload(req,res,function(err){
        if(err){
             res.json({error_code:1,err_desc:err});
             return;
        }
         res.json({error_code:0,err_desc:null});
    });
});

router.get('/file/:filename', function(req, res){
    gfs.collection('ctFiles'); 
    
    gfs.files.find({filename: req.params.filename}).toArray(function(err, files){
        if(!files || files.length === 0){
            return res.status(404).json({
                responseCode: 1,
                responseMessage: "error"
            });
        }        
        var readstream = gfs.createReadStream({
            filename: files[0].filename,
            root: "ctFiles"
        });        
        res.set('Content-Type', files[0].contentType)        
        return readstream.pipe(res);
    });
});

module.exports = router;