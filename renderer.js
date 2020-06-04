const nV = document.querySelector(".n_v")
const cV = document.querySelector(".c_v")
const eV = document.querySelector(".e_v")
const timeBox = document.querySelector(".time")
const returnTime = document.querySelector(".returnTime")
const recordBtn = document.querySelector(".recordBtn")
const clearBtn = document.querySelector(".clearBtn")
const recordField = document.querySelector(".recordField")

nV.innerText = process.versions.node
cV.innerText = process.versions.chrome
eV.innerText = process.versions.electron

const formatTime = (fmt) => {
	const date = new Date()
	const o = {
		"M+": date.getMonth() + 1,
		"d+": date.getDate(),
		"h+": date.getHours(),
		"m+": date.getMinutes(),
		"s+": date.getSeconds(),
		"S": date.getMilliseconds()
	}
	if (/(y+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, date.getFullYear() + "").substr(4 - RegExp.$1.length)
	}
	for (let i in o) {
		if (new RegExp("(" + i + ")").test(fmt)) {
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[i]) : (("00" + o[i]).substr(("" + o[i]).length)))
		}
	}
	return fmt
}

const getNowTime = () => {
	return formatTime("yyyy年MM月dd日 hh:mm:ss.S")
}

const setTime = () => {
	timeBox.innerText = getNowTime()
}

const recordTime = () => {
	const p = document.createElement("p")
	p.innerText = getNowTime()
	recordField.appendChild(p)
}

const clearTime = () => {
	recordField.innerHTML = ''
}

const returnTimeFunc = () => {
	returnTime.innerHTML = formatTime(timeStr)
}

recordBtn.addEventListener("click", () => {
	recordTime()
}, false)

clearBtn.addEventListener("click", () => {
	clearTime()
}, false)

setInterval(() => {
	setTime()
}, 1)