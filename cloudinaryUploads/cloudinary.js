var cloudinary = require('cloudinary');

exports.uploads = function(file){
    return new Promise (resolve =>{
        cloudinary.uploader.upload(file, function(result){
            resolve({url: result.secure_url, Id:result.public_id})
        },{resource_type: "auto"})
    })
}