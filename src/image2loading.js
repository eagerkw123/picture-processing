const clName = 'cut-2-loading'
const createBox = () => {
	if (document.getElementById(clName)) {
		return
	}
	const loading = document.createElement('section')
	loading.className = clName
	loading.id = clName
	loading.innerHTML = '<li></li><li></li><li></li><li></li>'
	document.body.appendChild(loading)
	if (document.getElementById(clName + '-style')) {
		return
	}
	const style = document.createElement('style')
	style.innerHTML = `
	.${clName} {position: absolute;z-index:10000; left: 50%;top: 50%;transform: translate3d(-50%, -50%, 0);height: 30px}
	.${clName} li {display: inline-block; width: 10px;height: 10px;margin-right: 6px;border-radius: 50%;background: #fff;animation: cut_2_li 1s 0s infinite}
	.${clName} li:nth-child(2) {animation: cut_2_li 1s 0.2s infinite}
	.${clName} li:nth-child(3) {animation: cut_2_li 1s 0.4s infinite}
	.${clName} li:nth-child(4) {animation: cut_2_li 1s 0.6s infinite}
	@-webkit-keyframes cut_2_li {0%, 100% {transform: translate3d(0, -100%, 0);opacity: 0} 30% {transform: translate3d(0, 0, 0);opacity: 1} 60% {transform: translate3d(0, 100%, 0);opacity: 0}}
	`
	style.id = clName + '-style'
	document.head.appendChild(style)
}

module.exports = {
	show: createBox,
	hide: () => {
		const box = document.getElementById(clName)
		if (box) {
			document.body.removeChild(box)
		}
	}
}