const nV = document.querySelector('.J_nv')
const cV = document.querySelector('.J_cv')
const eV = document.querySelector('.J_ev')
const timeBox = document.querySelector('.J_time')
const returnTime = document.querySelector('.J_return-time')
const recordBtn = document.querySelector('.J_record-btn')
const clearBtn = document.querySelector('.J_clear-btn')
const recordField = document.querySelector('.J_record')
const linkTimeBtn = document.querySelector('.J_link-time')
const linkTimeContent = document.querySelector('.J_link-time-content')
const linkNoteBtn = document.querySelector('.J_link-note')
const linkNoteContent = document.querySelector('.J_link-note-content')
const linkBacklogBtn = document.querySelector('.J_link-backlog')
const linkBacklogContent = document.querySelector('.J_link-backlog-content')
const jsBtn = document.querySelector('.J_note-btn')
const jsSource = document.querySelector('.J_note-source')
const jsResult = document.querySelector('.J_note-result')

nV.innerText = process.versions.node
cV.innerText = process.versions.chrome
eV.innerText = process.versions.electron

const formatTime = (fmt) => {
	const date = new Date()
	const o = {
		'M+': date.getMonth() + 1,
		'd+': date.getDate(),
		'h+': date.getHours(),
		'm+': date.getMinutes(),
		's+': date.getSeconds(),
		'S': date.getMilliseconds()
	}
	if (/(y+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, date.getFullYear() + '').substr(4 - RegExp.$1.length)
	}
	for (let i in o) {
		if (new RegExp('(' + i + ')').test(fmt)) {
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[i]) : (('00' + o[i]).substr(('' + o[i]).length)))
		}
	}
	return fmt
}

const getNowTime = () => {
	return formatTime('yyyy年MM月dd日 hh:mm:ss.S')
}

const setTime = () => {
	timeBox.innerText = getNowTime()
}

const recordTime = () => {
	const newItem = document.createElement('p')
	newItem.innerText = getNowTime()
	recordField.insertBefore(newItem, recordField.querySelector('p'))
}

const clearTime = () => {
	recordField.innerHTML = ''
}

const returnTimeFunc = () => {
	returnTime.innerHTML = formatTime(timeStr)
}
const showLinkTimeContent = () => {
	linkTimeBtn.classList.add('focus')
	linkNoteBtn.classList.remove('focus')
	linkBacklogBtn.classList.remove('focus')

	linkTimeContent.classList.remove('hide')
	linkNoteContent.classList.add('hide')
	linkBacklogContent.classList.add('hide')
}
const showLinkNoteContent = () => {
	linkNoteBtn.classList.add('focus')
	linkTimeBtn.classList.remove('focus')
	linkBacklogBtn.classList.remove('focus')

	linkNoteContent.classList.remove('hide')
	linkTimeContent.classList.add('hide')
	linkBacklogContent.classList.add('hide')
}
const showBacklogContent = () => {
	linkBacklogBtn.classList.add('focus')
	linkTimeBtn.classList.remove('focus')
	linkNoteBtn.classList.remove('focus')

	linkBacklogContent.classList.remove('hide')
	linkTimeContent.classList.add('hide')
	linkNoteContent.classList.add('hide')
}
const jsExecute = () => {
	const jsString = jsSource.textContent
	let result = jsString
	try {
		result = eval(jsString)
	} catch(e) {
		result = e
	}
	jsResult.innerHTML = result
}

linkTimeBtn.addEventListener('click', showLinkTimeContent, false)
linkNoteBtn.addEventListener('click', showLinkNoteContent, false)
linkBacklogBtn.addEventListener('click', showBacklogContent, false)
recordBtn.addEventListener('click', recordTime, false)
clearBtn.addEventListener('click', clearTime, false)

jsBtn.addEventListener('click', jsExecute)

setInterval(() => {
	setTime()
}, 1)