var express = require('express');
var monk = require('monk');
var db = monk('localhost:27017/profdb');
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

router.post('/upload', function(req, res, cb) {
    var collection = db.get('users');
    var filename = '';    
    collection.find({accountid: req.query.userid}, {resumefile: 1}, function(err, name) {
        if(err) throw err;
        filename = name;
    })
    if(filename !== '') {
        var files = db.get('fs.files');
        files.findOne({filename: filename}, function(err, file) {
            if(err) throw err;
            db.get('fs.chunks').remove({file_id: file._id}, function(err, result) {
                if(err) throw err;
                files.remove({filename: filename}, function (err, res) {
                    if(err) throw err;
                });
            });
        });
    }    
    upload(req,res,function(err){
        if(err){
             res.json({error_code:1,err_desc:err});
             return;
        }        
        collection.update({accountid: req.query.userid}, {
            $set: {resumefile: req.file.filename}
        }, function(err, result) {
            if(err) throw err;            
        });
        res.json({error_code:0,err_desc:null});
    });
});

router.get('/getfile/:filename', function(req, res) {        
    gfs.collection('ctFiles');         
    //console.log(s);    
    gfs.files.find({filename: '9377367e1987358ad79076fe1326146f'}).toArray(function(err, files) {   
        console.log(files);     
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
        res.set('Content-Type', files[0].contentType);
        console.log(res);        
        return readstream.pipe(res);
    });
});

module.exports = router;