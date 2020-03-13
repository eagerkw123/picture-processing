/**
	拖动和缩放逻辑说明
	拖动是改变图片的translate3d属性 拖动的位置是鼠标移动的距离
	所以每次拖动 再鼠标按下时需要把上一次设置的translate3d清空 否则按下的时候图片会发生偏差 会出现跳动的效果
	缩放时 需要保留上一次translate的位置再进行缩放 否则 缩放时定位图片会出现跳动的效果
**/
const image2base = require('./image2base')

let W
let H
let image // 全貌展示的图片节点
let cutImage // 被裁剪的图片节点
let scale = 1 // 图片缩放的比例
let minScale = 0.5
const maxScale = 2
let imgSrc // 裁剪图片url
let cutWidth // 裁剪框宽度
let cutHeight // 裁剪框高度
let imgWidth // 图片实际展示的宽度
let imgHeight // 图片实际展示的高度
let imgScale // 图片的宽高比
let moveLeft = 0 // 窗口移动的左边距
let moveTop = 0 // 窗口移动的上边距
let disX = 0 // 鼠标移动的x轴距离
let disY = 0 // 鼠标移动的y轴距离
let scaleDisX = 0 // 缩放按钮鼠标移动的x轴距离
let sizeCss = '' // 窗口大小固定css
let picCss = '' // 图片定位及大小固定css
let picCutCss = '' // 裁剪图片定位及大小固定css
let picCssAll = ''
let picCutCssAll = ''
let halfDisX // 图片宽度与屏幕宽度的差值的1/2
let halfDisY // 图片高度与屏幕高度的差值的1/2
let cutToPrintDisX = 0 // 裁剪框尺寸与屏幕尺寸差值的1/2
let cutToPrintDisY = 0 // 裁剪框尺寸与屏幕尺寸差值的1/2
const style = document.createElement('style')
const box = document.createElement('section')
const cutBox = document.createElement('div')
const cutPart = document.createElement('p')
const loading = document.createElement('ul')
const scaleBox = document.createElement('ul')
const cutDoBox = document.createElement('ul')
const scaleBtnWidth = 30 // 缩放按钮宽度
let scaleParentWidth // 缩放按钮父节点宽度
let scaleBtn


const createBox = () => {
	const zIndex = 10000
	const clName = 'image-2-cut-box'
	const fixed = 'position:fixed;left:0;top:0;width:100%;height:100%;'
	style.innerHTML = `.image-2-cut-fixed {${fixed}}
	.${clName} {z-index: ${zIndex};background: #fff;font-size: 20px}.${clName} img {display: block}.${clName} ul {list-style-type:  none}
	.${clName}::after {content: '';display: block;z-index:${zIndex + 2};${fixed}background: rgba(0, 0, 0, 0.6)}
	.${clName} div {z-index:${zIndex + 3};${fixed}}
	.${clName} div p {position: absolute;left: 50%;top: 50%;transform: translate3d(-50%, -50%, 0);overflow: hidden;background: #000}
	.${clName} .cut-2-loading {position: absolute;z-index:${zIndex + 5}; left: 50%;top: 50%;transform: translate3d(-50%, -50%, 0);height: 30px}
	.${clName} .cut-2-loading li {display: inline-block; width: 10px;height: 10px;margin-right: 6px;border-radius: 50%;background: #fff;animation: cut_2_li 1s 0s infinite}
	.${clName} .cut-2-loading li:nth-child(2) {animation: cut_2_li 1s 0.2s infinite}
	.${clName} .cut-2-loading li:nth-child(3) {animation: cut_2_li 1s 0.4s infinite}
	.${clName} .cut-2-loading li:nth-child(4) {animation: cut_2_li 1s 0.6s infinite}
	.${clName} .cut-2-do {position: absolute;left: 0;width: 100%;bottom: 3%;text-align:center;height: 36px; line-height: 36px;font-size: 14px}
	.${clName} .cut-2-do li:last-child{background: #999; color: #666}
	.${clName} .cut-2-do li {background: #fff;width: 120px;display: inline-block;margin: 0 8px;border-radius: 10px;color: #333}
	.${clName} .cut-2-scale {position: absolute;left: 0;top: 30px;height: 36px;width: 100%;text-align: center;z-index:${zIndex + 4}}.${clName} .cut-2-scale li{display: inline-block;}
	.${clName} .cut-2-scale li:first-child, .${clName} .cut-2-scale li:last-child {box-sizing:border-box;width: 32px;height: 32px;color: #fff;line-height: 30px}
	.${clName} .cut-2-scale li:nth-child(2) {width: 60%;margin: 0 5%;height: 10px;background: #ccc;border-radius: 20px;transform: translate3d(0, -4px, 0)}
	.${clName} .cut-2-scale li:nth-child(2) p {position: absolute;width: 100%;left: 0;top: 0;width: 0;background: #fff;height: 100%;border-radius: 20px}
	.${clName} .cut-2-scale li:nth-child(2) b {position: absolute;width: ${scaleBtnWidth}px;height: ${scaleBtnWidth}px;border-radius: 50%;left: 0;top: -10px;display: block;background: #999}
	@-webkit-keyframes cut_2_li {0%, 100% {transform: translate3d(0, -100%, 0);opacity: 0} 30% {transform: translate3d(0, 0, 0);opacity: 1} 60% {transform: translate3d(0, 100%, 0);opacity: 0}}
	`
	box.className = 'image-2-cut-fixed ' + clName
	document.body.appendChild(box)
	box.appendChild(cutBox)
	box.appendChild(scaleBox)
	cutBox.appendChild(cutPart)
	cutBox.appendChild(cutDoBox)
	scaleBox.className = 'cut-2-scale'
	scaleBox.innerHTML = '<li>-</li><li><p></p><b></b></li><li>+</li>'
	cutDoBox.className = 'cut-2-do'
	cutDoBox.innerHTML = '<li>确定</li><li>取消</li>'
	loading.className = 'cut-2-loading'
	loading.innerHTML = '<li></li><li></li><li></li><li></li>'
	cutPart.style.opacity = 0
	box.appendChild(loading)
	document.head.appendChild(style)
}

let isChangeScale = false
// 设置图片放大缩小比例
const setScale = (b) => {
	W = parseInt(window.innerWidth * scale) // 图片的显示宽度
	H = parseInt(W / imgWidth * imgHeight) // 图片的显示高度
	if (H < cutHeight) {
	  H = cutHeight
	  W = parseInt(H / imgHeight * imgWidth)
	}
	if (W < cutWidth) {
	  W = cutWidth
	  H = parseInt(W / imgWidth * imgHeight)
	}
	halfDisX = parseInt((window.innerWidth - W) / 2)
	halfDisY = parseInt((window.innerHeight - H) / 2)
	if (!nowMargin) {
		nowMargin = [halfDisY + moveTop, 0, 0, halfDisX + moveLeft]
	}
	picCss = `margin:${halfDisY + moveTop}px 0 0 ${halfDisX + moveLeft}px;width:${W}px`
	picCutCss = `margin:${moveTop + halfDisY - cutToPrintDisY}px 0 0 ${moveLeft + halfDisX - cutToPrintDisX}px;width:${W}px`
	// 比例缩放时  裁剪框内的图片css跟着变化
	picCssAll = picCssAll.replace(/marign:.*px/, '')
	picCutCssAll = picCutCssAll.replace(/marign:.*px/, '')
	image.style.cssText = picCssAll + picCss
	cutImage.style.cssText = picCutCssAll + picCutCss
	// 因为比例缩放需要重新赋值图片新的高度
	imgWidth = W
	imgHeight = parseInt(W / imgScale)
	if (b) {
		isChangeScale = true
	}
}

let nowMargin

const getAndSetMargin = () => {
	if (!picCssAll) return;
	// translate 转化为margin  且move的距离需要归0
	const trlNumber = picCssAll.slice(picCssAll.indexOf('translate3d(') + 12, picCssAll.indexOf('0)')).split(',')
	const marNumber = picCssAll.slice(picCssAll.indexOf('margin:') + 7, picCssAll.lastIndexOf(';')).split(' ')
	if (trlNumber.length === 3 && marNumber.length === 4) {
		nowMargin = [parseInt(marNumber[0]) + parseInt(trlNumber[1]), 0, 0, parseInt(marNumber[3]) + parseInt(trlNumber[0])]
		picCss = `margin:${nowMargin[0]}px 0 0 ${nowMargin[3]}px;width:${W}px`
		image.style.cssText = picCss
	}
	const trlNumberCut = picCutCssAll.slice(picCutCssAll.indexOf('translate3d(') + 12, picCutCssAll.indexOf('0)')).split(',')
	const marNumberCut = picCutCssAll.slice(picCutCssAll.indexOf('margin:') + 7, picCutCssAll.lastIndexOf(';')).split(' ')
	if (trlNumberCut.length === 3 && marNumberCut.length === 4) {
		picCutCss = `margin:${parseInt(marNumberCut[0]) + parseInt(trlNumberCut[1])}px 0 0 ${parseInt(marNumberCut[3]) + parseInt(trlNumberCut[0])}px;width:${W}px`
		cutImage.style.cssText = picCutCss
	}
	moveLeft = 0
	moveTop = 0
}
const touchStart = (ev) => {
    const touch = ev.touches[0]
    disX = touch.pageX - moveLeft
    disY = touch.pageY - moveTop
}
const touchMove = (ev) => {
    const touch = ev.touches[0]
    const target = ev.target
    const arr = picCssAll.replace()
    let left = parseInt(touch.pageX - disX)
    let top = parseInt(touch.pageY - disY)
    // 裁剪框的边框能超出图片的边框 确保图片边框与裁剪框边框能够重合
    // 注意裁剪框的宽高 和裁剪框距离屏幕的边距 和 图片距离屏幕的边距
    left = left >= (cutToPrintDisX - nowMargin[3]) ? (cutToPrintDisX - nowMargin[3]) : left
    left = left <= -(W + nowMargin[3] - cutWidth - cutToPrintDisX) / 2 ? -(W + nowMargin[3] - cutWidth - cutToPrintDisX) : left
    top = top >= (cutToPrintDisY - nowMargin[0]) ? (cutToPrintDisY - nowMargin[0]) : top
    top = top <= -(H + nowMargin[0] - cutHeight - cutToPrintDisY) / 2 ? -(H + nowMargin[0] - cutHeight - cutToPrintDisY) : top
    moveLeft = left
    moveTop = top
    picCssAll = `-webkit-transform:translate3d(${left}px,${top}px,0);${picCss}`
    picCutCssAll = `-webkit-transform:translate3d(${left}px,${top}px,0);${picCutCss}`
    image.style.cssText = picCssAll
    // 因为裁剪框内图需要跟背景图重合 而裁剪框内的图是相对于裁剪框的 背景图的定位是相对于屏幕的
    // 所以 裁剪框内的图定位要减去 裁剪框相对于的屏幕的差值
    // target.style.cssText = `margin:${top + halfDisY - cutToPrintDisY}px 0 0 ${left + halfDisX - cutToPrintDisX}px;width:${W}px`
    target.style.cssText = picCutCssAll
}

const touchEnd = () => {
	getAndSetMargin()
	isChangeScale = false
}

const scaleTouchStart = (ev) => {
    const touch = ev.touches[0]
    scaleDisX = touch.pageX - scaleBtn.offsetLeft
}
const scaleTouchMove = (ev) => {
    const touch = ev.touches[0]
    const max = scaleParentWidth - scaleBtnWidth / 2
    let left = parseInt(touch.pageX - scaleDisX)
    left = left <= 0 ? 0 : left
    left = left >= max ? max : left
    scaleBtn.style.left = left + 'px'
    scaleBtn.parentNode.children[0].style.width = left + 'px'
    scale = (left / max * (maxScale - minScale) + minScale).toFixed(2)
    setScale(1)
}
const scaleTouchEnd = () => {
	// 如果图片没移动过 需要重新获取图片缩放后的margin
	if (!picCssAll) {
		const marNumber = picCss.slice(picCss.indexOf('margin:') + 7, picCssAll.lastIndexOf(';')).split(' ')
		if (marNumber.length === 4) {
			nowMargin = [parseInt(marNumber[0]), 0, 0, parseInt(marNumber[3])]
		}
	}
	getAndSetMargin()
}

const close = () => {
	document.head.removeChild(style)
	document.body.removeChild(box)
}

const cut = (fn) => {
	const copy = document.createElement('canvas')
	copy.width = W
	copy.height = H
	const ctxCopy = copy.getContext('2d')
	ctxCopy.drawImage(image, 0, 0, W, H)
	const src = copy.toDataURL()
	const copyImage = new Image()
	copyImage.src = src
	copyImage.onload = () => {
		const canvas = document.createElement('canvas')
		const left = Math.abs(nowMargin[3] - cutToPrintDisX)
		const top = Math.abs(nowMargin[0] - cutToPrintDisY)
		canvas.width = cutWidth
		canvas.height = cutHeight
		const ctx = canvas.getContext('2d')
		ctx.drawImage(copyImage, left, top, cutWidth, cutHeight, 0, 0, cutWidth, cutHeight)
		let src = canvas.toDataURL('image/jpeg', 0.8)
		close()
		fn && fn(src)
	}
}

const addListener = (node, type, fn) => {
	node.addEventListener(type, (ev) => {
		fn && fn(ev)
		ev.preventDefault()
    	ev.stopPropagation()
	}, false)
}

const init = (fn) => {
	imgWidth = image.width
	imgHeight = image.height
	imgScale = imgWidth / imgHeight
	cutToPrintDisX = parseInt((W - cutWidth) / 2)
	cutToPrintDisY = parseInt((H - cutHeight) / 2)
	box.appendChild(image)
	cutPart.appendChild(cutImage)
	// 设置默认比例
	setScale()
	// 图片添加拖动事件
	addListener(cutImage, 'touchstart', touchStart)
	addListener(cutImage, 'touchmove', touchMove)
	addListener(cutImage, 'touchend', touchEnd)

	// 缩放按钮添加拖动事件
	// 拖动的最大距离为拖动按钮父节点宽度 - 拖动按钮的1/2
	// 默认比例为1 最大比例为maxScale 最小缩放比例为minScale
	// 所有默认的按钮位置应该为 默认比例1 - 最小缩放比例 / 比例差
	scaleBtn = scaleBox.children[1].children[1]
	scaleParentWidth = scaleBtn.parentNode.offsetWidth
	let defaultWidth = (scale - minScale) / (maxScale - minScale) * scaleParentWidth
	defaultWidth = Math.min(defaultWidth, scaleParentWidth - scaleBtnWidth / 2)
	addListener(scaleBtn, 'touchstart', scaleTouchStart)
	addListener(scaleBtn, 'touchmove', scaleTouchMove)
	addListener(scaleBtn, 'touchend', scaleTouchEnd)
	scaleBtn.style.left = defaultWidth + 'px'
	scaleBtn.parentNode.children[0].style.width = defaultWidth + 'px'
	box.removeChild(loading)
	cutPart.style.opacity = 1

	//裁剪和取消
	addListener(cutDoBox.children[0], 'touchstart', () => {
		cut(fn)
	})
	addListener(cutDoBox.children[1], 'touchstart', () => {
		fn && fn()
		close()
	})
}

module.exports = (params) => {
	const paramsType = typeof params
	W = window.innerWidth
	H = window.innerHeight
	imgSrc = paramsType === 'string' ? params : params.url
	cutWidth = paramsType === 'string' ? W / 2 : (params.width || W / 2)
	cutWidth = Math.min(W, parseInt(cutWidth))
	cutHeight = paramsType === 'string' ? cutWidth : (params.height || cutWidth)
	cutHeight = Math.min(window.innerHeight, parseInt(cutHeight))
	cutPart.style.cssText = `width: ${cutWidth}px;height: ${cutHeight}px;`
	// 创建弹窗
	createBox()
	return new Promise((resolve, reject) => {
		image2base(imgSrc).then(res => {
			imgSrc = res.base64
			image = new Image()
			image.src = imgSrc
			cutImage = new Image()
			cutImage.src = imgSrc
			image.onload = () => {
				init((src) => {
					if (src) {
						resolve(src)
					} else {
						reject({
							error: '用户取消了操作'
						})
					}
				})
			}
		}).catch(e => {
			reject({
				error: '图片加载失败，请确认图片路径是否正确'
			})
		})
		addListener(box, 'touchmove')
	})
}