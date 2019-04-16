var imageModel = require('./models');
var cloud = require('./cloudinaryConfig')


exports.createApp = (req, res) => {
    try{
        var imageDetails = {
            imageName: req.body.imageName,
        }

        imageModel.find({imageName: imageDetails.imageName}, (err, callback) => {
            if (err) {
                console.log(err)
                res.json({
                    err: err,
                    message: 'there was a problem uploading image'
                })
            } else if(callback.length >= 1 ) {
                res.json({
                    message: 'file already exist'
                })
            }else {
                var imageDetails = {
                    imageName: req.body.imageName,
                    cloudImage: req.files[0].path,
                    imageId: ''
                }
               console.log('i got here')
                console.log(imageDetails.cloudImage)
                cloud.uploads(imageDetails.cloudImage).then((result) => {
                    console.log(result)
                    var imageDetails = {
                        imageName: req.body.imageName,
                        cloudImage: result.url,
                        imageId: result.id
                    }
                    
                        console.log('i reached here too')
                        console.log(imageDetails.cloudImage)
                        
                        imageModel.create(imageDetails, (err, created)=> {
                        if(err){
                            res.json({
                                err: err,
                                message: 'could not upload image, try again'
                            })
                        }else {
                            res.json({
                                created: created,
                                message: "image uploaded successfully!!"
                            })
                        }
                    })
                    
                    
                })
        
            }
        });
    }catch(execptions){
        console.log(execptions)
    }

}