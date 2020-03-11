/**
	* 雪碧图position定位说明
**/
const image2base = require('./image2base')

const width = 400
const number = 2
const dis = 50
let W = width * number, H = 0, cssText = ''

const images = []

const splitImage = () => {
	const length = Math.ceil(images.length / number)
	const array = []
	for( var i = 0; i < length; i++) {
		array.push(images.splice(0, number))
	}
	array.forEach((arr, index) => {
		const height = parseInt(width / arr[0].width * arr[0].height)
		const max = arr.length > 1 ? Math.max(height, parseInt(width / arr[1].width * arr[1].height)) : height
		drawImage(arr, max)
		if (index === array.length - 1) {
			const style = document.createElement('style')
			style.innerHTML = cssText
			document.head.appendChild(style)
		}
	})
}

const drawImage = (arr, height) => {
	const canvas = document.createElement('canvas')
	canvas.width = W
	canvas.height = height
	const ctx = canvas.getContext('2d')
	let cssName = ''
	let cssBgSize = ''
	arr.forEach((item, index) => {
		const name = item.name
		const canImgHeight = width / item.width * item.height
		ctx.drawImage(item.image, index * width, 0, width, canImgHeight)
		cssName += `.${name},`
		cssBgSize += `.${name} {background-size: 200% auto; background-position: ${index * 100}% 0}`
	})
	cssText += `${cssName.slice(0, cssName.length - 1)} {background:url('${canvas.toDataURL()}') no-repeat} ${cssBgSize}`
}

module.exports =  (arr) => {
	const length = arr.length
	let errorLength = 0, loadedLength = 0
	arr.forEach(item => {
		image2base(item).then(res => {
			const filename = item.slice(item.lastIndexOf('/') + 1).split('.')[0]
			loadedLength++
			const image = new Image()
			image.src = res.base64
			images.push({
				image: image,
				name: filename,
				width: res.width,
				height: res.height
			})
			image.onload = () => {
				if (loadedLength + errorLength === length) {
					splitImage()
				}
			}
		}).catch(() => {
			errorLength++
		})
	})
}
