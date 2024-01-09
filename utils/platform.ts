import { isEmpty, judgePlat } from '.'

interface NativeCall {
	method: string
	data?: any
	callback?: Function
}

export function sendToNative({ data, method, callback }: NativeCall) {
	const plat = judgePlat()
	console.log('___________H5_________' + plat)
	if (plat === 'IOS') {
		if (callback) {
			console.log('%c [ callback ]-10-「platform.ts」', 'font-size:13px; background:#FFE47F; color:#000000;', callback)
			excuteCallbackIos(callback, method, data)
		} else {
			sendToNativeIos(data ?? {}, method)
		}
	} else if (plat === 'Android') {
		if (callback) {
			excuteCallbackAn(callback, method, data)
		} else {
			if (method === 'hideLoading') {
				sendToNativeAn({}, method)
			} else sendToNativeAn(data, method)
		}
	}
}

// ios回调方法
function excuteCallbackIos(callback: Function, method: string, data: any) {
	var callbackId = 'callback_' + method
		; (window as any)[callbackId] = callback
	if (
		(window as any).webkit &&
		(window as any).webkit.messageHandlers &&
		(window as any).webkit.messageHandlers.DemeAliveNativeCall
	) {
		; (window as any).webkit.messageHandlers.DemeAliveNativeCall.postMessage({
			method: 'excuteCallback',
			args: JSON.stringify({ callback_method: callbackId, data: data ?? {} }),
		})
	}
}

// 安卓回调方法
function excuteCallbackAn(callback: Function, method: string, data: any) {
	var callbackId = 'callback_' + method
		; (window as any)[callbackId] = callback
	if ((window as any).poppAndroid && (window as any).poppAndroid.excuteCallback) {
		; (window as any).poppAndroid?.excuteCallback?.(
			JSON.stringify({ callback_method: callbackId, data: typeof data === 'string' ? JSON.parse(data) : data ?? {} }),
		)
	}
}
// 内容传递给ios
export function sendToNativeIos(data: any, method: string) {
	if (
		(window as any).webkit &&
		(window as any).webkit.messageHandlers &&
		(window as any).webkit.messageHandlers.DemeAliveNativeCall
	) {
		; (window as any).webkit.messageHandlers.DemeAliveNativeCall.postMessage({
			method: method,
			args: JSON.stringify(data),
		})
	}
}
// 内容传递给android
export function sendToNativeAn(data: any, method: string) {
	if ((window as any).poppAndroid && (window as any).poppAndroid[method]) {
		if (isEmpty(data)) {
			; (window as any).poppAndroid?.[method]?.()
			console.log('___________H5_________' + isEmpty(data))
		} else {
			; (window as any).poppAndroid?.[method]?.(JSON.stringify(data))
		}
	}
}

//  安卓处理选择NFT传参为Array
export function sendToNativeAnArray(data: any) {
	const plat = judgePlat()
	if (plat === 'IOS') {
		return data
	} else if (plat === 'Android') {
		return [data]
	}
}
/**
 * 关闭webview
 */
export function NativeCloseWebView() {
	const plat = judgePlat()
	if (plat === 'IOS') {
		sendToNativeIos({ data: 'closeWebView' }, 'closeWebView')
	} else if (plat === 'Android') {
		sendToNativeAn({}, 'closeWebView')
	}
}

// 是手机浏览器环境
export const isMobile = () => {
	const plat = judgePlat()
	if (plat === 'IOS') {
		return true
	} else if (plat === 'Android') {
		return true
	} else {
		return false
	}
}
// 是app环境
export const isApp = () => {
	if (
		(window as any).webkit &&
		(window as any).webkit.messageHandlers &&
		(window as any).webkit.messageHandlers.DemeAliveNativeCall
	) {
		return true
	} else if ((window as any).poppAndroid) {
		return true
	} else {
		return false
	}
}
// 是Ios环境
export const isIos = () => {
	if (
		(window as any).webkit &&
		(window as any).webkit.messageHandlers &&
		(window as any).webkit.messageHandlers.DemeAliveNativeCall
	) {
		return true
	} else {
		return false
	}
}
// 是android环境
export const isAndroid = () => {
	if ((window as any).poppAndroid) {
		return true
	} else {
		return false
	}
}
