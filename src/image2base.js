const image2upload = require('./image2upload')
let type, upload, isSupport, imgSrc, uploadType = 1
const getBase64Image = (img, width, height) => {
  console.log(type)
  var canvas = document.createElement('canvas')
  canvas.width = width || img.width
  canvas.height = height || img.height
  var ctx = canvas.getContext('2d')
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
  return canvas.toDataURL(`image/${type}`)
}

const checkImage = (src, resolve, reject, file) => {
  var image = new Image()
  image.crossOrigin = ''
  image.src = src
  image.onerror = function() {
    const error = {
      e: 'Picture does not exist: ' + src
    }
    console.error(error.e)
    reject(error)
  }
  image.onload = function() {
    const base64 = file ? src : getBase64Image(image)
    if (upload) {
      image2upload.init(uploadType === 2)
      image2upload.send({
        url: file || base64,
        fileType: type,
        success: (src) => {
          resolve({
            src,
            base64,
            width: image.width,
            height: image.height
          })
        },
        fail: (code) => {
          reject({
            code 
          })
        }
      })
      return
    }
    resolve({
      base64,
      width: image.width,
      height: image.height
    })
  }
}

const goReturn = (src, fileType) => {
  return new Promise((resolve, reject) => {
    if (fileType) {
      var reader = new FileReader()
      reader.onload = function(e) {
        checkImage(e.target.result, resolve, reject, src)
      }
      reader.readAsDataURL(src)
    } else {
      checkImage(src, resolve, reject)
    }
  })
}

module.exports = (params) => {
  const tp = typeof params === 'string'
  type = tp ? 'jpeg' : params.type
  imgSrc = tp ? params : params.url
  upload = tp ? false : params.upload
  uploadType = tp ? uploadType : (params.uploadType || uploadType)
  isSupport = ['jpeg', 'png', 'webp'].find(item => {
    return item === type
  })
  type = isSupport || 'jpeg'
  // 如果是file类型
  if (typeof imgSrc === 'object' && imgSrc.name && imgSrc.type && imgSrc.type.indexOf('image') > -1) {
    return goReturn(imgSrc, 1)
  } else {
    return goReturn(imgSrc)
  }
}