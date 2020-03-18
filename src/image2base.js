const image2upload = require('./image2upload')
module.exports = (params) => {
  const tp = typeof params === 'string'
  let type = tp ? 'jpeg' : params.type
  const imgSrc = tp ? params : params.url
  const upload = tp ? false : params.upload
  const isSupport = ['jpeg', 'png', 'webp'].find(item => {
    return item === type
  })
  type = isSupport || 'jpeg'
  function getBase64Image(img, width, height) {
    var canvas = document.createElement('canvas')
    canvas.width = width || img.width
    canvas.height = height || img.height
    var ctx = canvas.getContext('2d')
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
    var dataURL = canvas.toDataURL(`image/${type}`)
    return dataURL
  }
  var image = new Image()
  image.crossOrigin = ''
  image.src = imgSrc
  return new Promise((resolve, reject) => {
    image.onerror = function() {
      const error = {
        e: 'Picture does not exist: ' + imgSrc
      }
      consolo.error(error.e)
      reject(error)
    }
    image.onload = function() {
      if (upload) {
        image2upload.init()
        image2upload.send({
          url: getBase64Image(image),
          fileType: type,
          success: (src) => {
            resolve({
              src,
              base64: getBase64Image(image),
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
        base64: getBase64Image(image),
        width: image.width,
        height: image.height
      })
    }
  })
}