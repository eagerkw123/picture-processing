const width = 130 * 2
const height = 130 * 2
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
	left: width / 3,
	top: 80
}
const point = {
	x: width / 2,
	y: height / 2 - 24,
	r: 80
}
let timer
let percent = 0
const drawLogo = () => {
	const left = logoPos.left
	const top = logoPos.top
	const lineWidth = 10
	ctx.beginPath()
	ctx.fillStyle = '#fff'
	ctx.fillRect(left, top, lineWidth, 26)
	ctx.fillRect(left, top + 26, 30, lineWidth)
	ctx.fillRect(left + 20, top + 26, lineWidth, 22)
	ctx.fillRect(left, top + 48, 30, lineWidth)
	ctx.moveTo(left + 42, top + 11)
	ctx.lineTo(left + 51, top + 20)
	ctx.lineTo(left + 42, top + 29)
	ctx.lineTo(left + 33, top + 20)
	ctx.lineTo(left + 42, top + 11)
	ctx.fill()
	ctx.moveTo(left + 76, top + 11)
	ctx.lineTo(left + 86, top + 19)
	ctx.lineTo(left + 42, top + 60)
	ctx.lineTo(left + 34, top + 51)
	ctx.lineTo(left + 76, top + 11)
	ctx.fill()
	ctx.moveTo(left + 60, top + 25)
	ctx.lineTo(left + 86, top + 51)
	ctx.lineTo(left + 78, top + 60)
	ctx.lineTo(left + 54, top + 38)
	ctx.lineTo(left + 60, top + 25)
	ctx.fill()
	ctx.closePath()
	ctx.font = '32px Georgia'
	ctx.fillText('已完成' + percent + '%', width / 2 - 73, height - 20)
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
	ctx.fillStyle = 'rgba(0, 0, 0, 0.4)'
	ctx.fillRect(0, 0, width * 2, height * 2)
	ctx.beginPath()
	ctx.strokeStyle = `rgba(255, 255, 255, ${current.o})`
	ctx.lineWidth = 6
	ctx.arc(point.x, point.y, point.r, current.s * Math.PI, Math.PI * current.e);
  ctx.stroke()
  ctx.closePath()
  drawLogo()
}

module.exports = {
	start: () => {
		canvas.style.cssText = `width: ${width / 2}px; height: ${height / 2}px; border-radius: 10px; position: fixed; left: 50%; top: 50%; transform: translate3d(-50%, -50%, 0); z-index: 100000`
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
		percent = stopPercent + 7
	}
}