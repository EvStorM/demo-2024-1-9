
export const formatStrAddress = (left: number, right: number, str: string) => {
	if (!str) {
		return ''
	}
	return str?.substring(0, left) + new Array(4).join('.') + str?.substring(str.length - right, str.length)
}

export const baseURL = process.env.baseUri

// profile & echo
export const graphURL = process.env.graphUrl

export const Adapth5 = 768

// 随机生成颜色
export const getRandomColor = () => {
	var letters = '0123456789ABCDEF'
	var color = '#'
	for (var i = 0; i < 6; i++) {
		color += letters[Math.floor(Math.random() * 16)]
	}
	return color
}

// 没有图片创建一个新的图片
export const handleNftImage = (uri: any, text: any): string => {
	if (uri) return uri
	const canvas: any = document.createElement('canvas')
	canvas.width = 100
	canvas.height = 100
	const ctx = canvas.getContext('2d')
	const bgColor = getRandomColor()

	ctx.fillStyle = bgColor
	ctx.fillRect(0, 0, 100, 100)

	ctx.font = '110px Arial'
	ctx.fillStyle = 'white'
	ctx.textAlign = 'center'
	ctx.fillText(text, 50, 100)
	return canvas.toDataURL()
}

// 判断是否是能被JSON.parse解析的字符串
export function isJSON(str: any) {
	if (typeof str == 'string') {
		try {
			var obj = JSON.parse(str)
			if (typeof obj == 'object' && obj) {
				return obj
			} else {
				return false
			}
		} catch (e) {
			console.log('error：' + str + '!!!' + e)
			return false
		}
	} else if (typeof str == 'object') {
		return str
	} else {
		return false
	}
}

// 判断string object array 是否为空
export const isEmpty = (value: any) => {
	if (value === null || value === undefined || value === '') {
		return true
	} else if (typeof value === 'object') {
		if (Array.isArray(value)) {
			return value.length === 0
		} else {
			return Object.keys(value).length === 0
		}
	} else {
		return false
	}
}

// 终端判断
export const judgePlat = () => {
	let platName = 'PC'
	if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {
		platName = 'IOS'
	} else if (/(Android)/i.test(navigator.userAgent)) {
		platName = 'Android'
	} else if (/(MicroMessenger)/i.test(navigator.userAgent)) {
		platName = 'weixin'
	} else if (window.innerWidth < 500) {
		platName = 'h5'
	} else {
		platName = 'PC'
	}
	return platName
}
// 删除字符串的某些字符
export const deleteText = (text: string, identifying: string) => {
	if (text.length === 0 || !text) {
		return ''
	}
	const data = text.split(identifying).join('')
	console.log('data', data)
	return data
}
/**
 * 超出千位显示k
 */
export const thousandDigit = (price: number | undefined) => {
	if (price) {
		if (price >= 1000 && price < 1100) {
			return '1k'
		} else if (price >= 1100) {
			const integer = price.toString().slice(0, price.toString().length - 3)
			const points = price.toString().slice(price.toString().length - 3, price.toString().length - 2)
			return `${integer}.${points}k`
		} else {
			return price
		}
	} else {
		return 0
	}
}

// 数组去重复
export const unique = (arr: any[], val: string) => {
	const res = new Map()
	return arr.filter(item => !res.has(item[val]) && res.set(item[val], 1))
}
// 图片转base64格式
export const urlToBase64 = (imageUrl: string) => {
	return new Promise((resolve, reject) => {
		let canvas = document.createElement('canvas') as any
		const ctx = canvas.getContext('2d') as any
		let img = new Image() as any
		img.crossOrigin = 'Anonymous' // 解决Canvas.toDataURL 图片跨域问题
		img.src = imageUrl
		img.onload = function () {
			canvas.height = img.height
			canvas.width = img.width
			ctx.fillStyle = '#fff' // canvas背景填充颜色默认为黑色
			ctx.fillRect(0, 0, img.width, img.height)
			ctx.drawImage(img, 0, 0) // 参数可自定义
			const dataURL = canvas.toDataURL('image/png', 1) // 获取Base64编码
			resolve(dataURL)
			canvas = null // 清除canvas元素
			img = null // 清除img元素
		}
		img.onerror = function () {
			reject(new Error('Could not load image at ' + imageUrl))
		}
	})
}
// 判断是否是Safari浏览器
export const determineSafari = () => {
	if (/Safari/.test(navigator.userAgent)) {
		return true
	}
	return false
}
