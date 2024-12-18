const multer = require("multer")

const storage = multer.diskStorage({
    filename: function (req, file, cb) {
      const newFilename = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, newFilename + '-' + file.fieldname)
    }
  })
  
  const upload = multer({ storage })

  module.exports = upload