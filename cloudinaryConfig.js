const cloudinary = require('cloudinary');

cloudinary.config({ 
    cloud_name: 'code-freak', 
    api_key: '658454372364862', 
    api_secret: 'Pbfkkw4LWPcvXpxTMAvzA9P8NL0' 
  });

  // uploading the image to cloudinary

  exports.uploads = (file) =>{
    return new Promise(resolve => {
        cloudinary.uploader.upload(file, (result) =>{
            resolve({url: result.url, id: result.public_id})
        }, {resource_type: "auto"})
    })
  }