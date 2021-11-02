import express from 'express'
import multer from 'multer'
const router = express.Router()
// import { protect, admin } from '../middleware/authMiddleware.js'

import multerS3 from 'multer-s3'
import aws from 'aws-sdk'

//multer s3
const s3 = new aws.S3()
aws.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  accessSecretKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'us-east-1',
})

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true)
  } else {
    cb(new Error('Invalid file type, only JPEG and PNG is allowed!'), false)
  }
}

const upload = multer({
  fileFilter,
  storage: multerS3({
    acl: 'public-read',
    s3: s3,
    bucket: `ropes-app`,
    metadata: function (req, file, cb) {
      cb(null, { fieldName: 'TESTING_METADATA' })
    },
    key: function (req, file, cb) {
      cb(null, Date.now().toString())
    },
  }),
})

const returnImageUrl = (req, res) => {
  return res.send(`${req.file.location}`)
}

// router.route('/').post(protect, admin, upload.single('image'), returnImageUrl)
router.route('/').post(upload.single('image'), returnImageUrl)

export default router
