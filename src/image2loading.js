const clName = 'cut-2-loading'
let isStopPropatation = false
const createBox = () => {
	if (document.getElementById(clName)) {
		return
	}
	const loading = document.createElement('section')
	loading.className = clName
	loading.id = clName
	loading.innerHTML = '<ul><li></li><li></li><li></li><li></li></ul>'
	document.body.appendChild(loading)
	if (document.getElementById(clName + '-style')) {
		return
	}
	const style = document.createElement('style')
	style.innerHTML = `
	${isStopPropatation ? '.' + clName + '{position: fixed;left: 0;top: 0;width: 100%;height: 100%; z-index: 100000}' : ''}
	.${clName} ul {position: fixed;width: 100%;height: 30px;z-index:100001; left: 0;border-radius: 10px;text-align:center;top: 50%;transform: translate3d(0, -50%, 0)}
	.${clName} li {display: inline-block; width: 10px;height: 10px;margin-right: 6px;border-radius: 50%;background: #fff;animation: cut_2_li 1s 0s infinite}
	.${clName} li:nth-child(2) {animation: cut_2_li 1s 0.2s infinite}
	.${clName} li:nth-child(3) {animation: cut_2_li 1s 0.4s infinite}
	.${clName} li:nth-child(4) {animation: cut_2_li 1s 0.6s infinite}
	@-webkit-keyframes cut_2_li {0%, 100% {transform: translate3d(0, -100%, 0);background: rgba(0, 0, 0, 0.5)} 30% {transform: translate3d(0, 0, 0);background: #fff} 60% {transform: translate3d(0, 100%, 0);background: rgba(0, 0, 0, 0)}}
	`
	style.id = clName + '-style'
	document.head.appendChild(style)
}

module.exports = {
	show: (b) => {
		isStopPropatation = b || false
		createBox()
	},
	hide: () => {
		const box = document.getElementById(clName)
		if (box) {
			document.body.removeChild(box)
		}
	}
}