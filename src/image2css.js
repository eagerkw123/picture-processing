/**
	* 雪碧图position定位说明
**/

const { createCanvas, loadImage } = require('canvas')
const fs = require('fs')
const path = require('path')

const width = 400
const number = 2
const dis = 50
let W = width * number, H = 0, cssText = ''

const images = []
const imagesHeight = []

const readImages = function (src) {
	return new Promise((resolve, reject) => {
		fs.readdir(src, (err, files) => {
			if (err) {
				reject(err)
				return
			}
			resolve(files)
		})
	})
}

const splitImage = () => {
	const length = Math.ceil(images.length / number)
	const array = []
	const arrayHeight = []
	for( var i = 0; i < length; i++) {
		array.push(images.splice(0, number))
		arrayHeight.push(imagesHeight.splice(0, number))
	}
	array.forEach((arr, index) => {
		const heights = arrayHeight[index]
		const max = Math.max(heights[0] , heights[1] || 0)
		drawImage(arr, max)
		if (index === array.length - 1) {
			fs.writeFile('base64.css', cssText, (err) => {
				console.log('create css fail: ' + err)
			})
		}
	})
}

const drawImage = (arr, height) => {
	const canvas = createCanvas(W, height)
	const ctx = canvas.getContext('2d')
	let cssName = ''
	let cssBgSize = ''
	arr.forEach((image, index) => {
		const name = path.parse(image.src).name
		const canImgHeight = width / image.width * image.height
		ctx.drawImage(image, index * width, 0, width, canImgHeight)
		cssName += `.${name},`
		cssBgSize += `.${name} {background-size: 200% auto; background-position: ${index * 100}% 0}`
	})
	cssText += `${cssName.slice(0, cssName.length - 1)} {background:url('${canvas.toDataURL()}') no-repeat} ${cssBgSize}`
}

module.exports = {
	init: (src) => {
		readImages(src).then(res => {
			const length = res.length
			res.forEach((imgSrc, index) => {
				loadImage(src + '/' + imgSrc).then(image => {
					images.push(image)
					imagesHeight.push(Math.ceil(width / image.width * image.height))
					if (index === length - 1) {
						splitImage()
					}
				}).catch(res => {
					console.log('loading image fail: ' + res)
				})
			})
		}).catch((e) => {
			console.log('read images fail:' + e)
		})
	}
}