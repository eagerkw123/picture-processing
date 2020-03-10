module.exports = (imgSrc) => {
  function getBase64Image(img, width, height) {
    var canvas = document.createElement('canvas')
    canvas.width = width || img.width
    canvas.height = height || img.height
    var ctx = canvas.getContext('2d')
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
    var dataURL = canvas.toDataURL()
    return dataURL
  }
  var image = new Image()
  image.crossOrigin = ''
  image.src = imgSrc
  return new Promise((resolve, reject) => {
    image.onload = function() {
      resolve({
        base64: getBase64Image(image),
        width: image.width,
        height: image.height
      })
    }
    image.onerror = function() {
      const error = {
        e: 'Picture does not exist: ' + imgSrc
      }
      consolo.error(error.e)
      reject(error)
    }
  })
}