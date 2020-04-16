const width = 91 * 2
const height = 91 * 2
const setTimer = function(fn,time){
  if(!fn || !time){
    return
  }
  const o = {}
  let startTime = Date.now()
  const startFn = () => {
    o.go = goFn
    o.stop = false
    o.go()
  }
  const goFn = () => {
    var now = Date.now()
    if(now - startTime >= time){
      fn()
      startTime = now
    }
    if(!o.stop){
      o.timer = requestAnimationFrame(o.go)
    }
  }
  o.cleanTimer = function(){
    if(o.timer){
      cancelAnimationFrame(o.timer)
      o.go = null
    }
    o.stop = true
  }
  o.restart = startFn
  startFn()
  return o
}
const stopPercent = parseInt(Math.random() * 5) + 85
const canvas = document.createElement('canvas')
const ctx = canvas.getContext('2d')
const logoPos = {
	left: 64,
	top: 46
}
const point = {
	x: width / 2,
	y: height / 2 - 26,
	r: 46
}
let timer
let percent = 0
const drawLogo = () => {
	const left = logoPos.left
	const top = logoPos.top
	const lineWidth = 6
	ctx.beginPath()
	ctx.fillStyle = '#fff'
	ctx.fillRect(left, top, lineWidth, 14)
	ctx.fillRect(left, top + 14, 18, lineWidth)
	ctx.fillRect(left + 12, top + 18, lineWidth, 12)
	ctx.fillRect(left, top + 30, 18, lineWidth)
	ctx.moveTo(left + 28, top + 9)
	ctx.lineTo(left + 32, top + 14)
	ctx.lineTo(left + 28, top + 18)
	ctx.lineTo(left + 23, top + 14)
	ctx.lineTo(left + 28, top + 9)
	ctx.fill()
	ctx.moveTo(left + 46, top + 8)
	ctx.lineTo(left + 50, top + 13)
	ctx.lineTo(left + 25, top + 37)
	ctx.lineTo(left + 22, top + 32)
	ctx.lineTo(left + 46, top + 8)
	ctx.fill()
	ctx.moveTo(left + 38, top + 18)
	ctx.lineTo(left + 50, top + 31)
	ctx.lineTo(left + 46, top + 37)
	ctx.lineTo(left + 35, top + 26)
	ctx.lineTo(left + 38, top + 18)
	ctx.fill()
	ctx.closePath()
	ctx.font = '26px Arial'
	ctx.fillText('上传中' + percent + '%', width / 2 - 60, height - 30)
}
const drawCircleMv = (n) => {
	const arr = [{
		s: 1.5,
		e: 1.6,
		o: 0
	}, {
		s: 1.6,
		e: 1.8,
		o: 0.3
	}, {
		s: 1.8,
		e: 2,
		o: 0.6
	}, {
		s: 0,
		e: 0.3,
		o: 0.8
	}, {
		s: 0.1,
		e: 0.4,
		o: 1
	}, {
		s: 0.2,
		e: 0.6,
		o: 1
	}, {
		s: 0.3,
		e: 0.9,
		o: 1
	}, {
		s: 0.5,
		e: 1,
		o: 0.8
	}, {
		s: 0.8,
		e: 1.1,
		o: 0.6
	}, {
		s: 0.9,
		e: 1.2,
		o: 0.5
	}, {
		s: 1,
		e: 1.3,
		o: 0.3
	}, {
		s: 1.2,
		e: 1.5,
		o: 0.2
	}, {
		s: 1.4,
		e: 1.5,
		o: 0.1
	}]
	const current = arr[n % arr.length]
	ctx.clearRect(0, 0, width, height)
	ctx.fillStyle = 'rgba(0, 0, 0, 0.7)'
	ctx.fillRect(0, 0, width * 2, height * 2)
	ctx.beginPath()
	ctx.strokeStyle = `rgba(255, 255, 255, ${current.o})`
	ctx.lineWidth = 3
	ctx.arc(point.x, point.y, point.r, current.s * Math.PI, Math.PI * current.e);
  ctx.stroke()
  ctx.closePath()
  drawLogo()
}

module.exports = {
	start: () => {
		canvas.style.cssText = `width: ${width / 2}px; height: ${height / 2}px; border-radius: 4px; position: fixed; left: 50%; top: 50%; transform: translate3d(-50%, -50%, 0); z-index: 100000`
		canvas.width = width
		canvas.height = height
		document.body.appendChild(canvas)
		let index = 0
		let random = parseInt(2 + Math.random() * 3) * 10
		timer = setTimer(() => {
			drawCircleMv(index)
			index++
			if (percent > 100) {
				percent = 100
				timer.cleanTimer()
				document.body.removeChild(canvas)
			} else if (percent > 10 & percent < 20) {
				percent = percent + 2
			} else if ((percent > random && percent < random + 10) || (percent > random + 20 && percent < random + 30)) {
				if (index % 5 === 0) {
					percent++
				}
			} else if (percent >= stopPercent && percent < stopPercent + 5) {
				if (index % 40 === 0) {
					percent++
				}
			} else  {
				percent++
			}
			percent = percent >= stopPercent + 5 && percent < stopPercent + 7 ? stopPercent + 5 : percent
		}, 100)
		return canvas
	},
	end: () => {
		// percent = stopPercent + 7
	}
}