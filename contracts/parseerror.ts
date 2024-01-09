export const getParseError = (err: any): string => {
	try {
		if (typeof err === 'string') {
			const dataMessage = getErrorMessage({ str: err })
			return dataMessage[dataMessage.length - 1]
		} else return err
	} catch (error: any) {
		return err
	}
}

const getErrorMessage = ({ str, test = `"message":` }: { str: string; test?: string }): string[] => {
	try {
		let dataMessage: string[] = []
		let index = str.indexOf(`${test}`),
			number = 0
		while (index !== -1) {
			let endStr = str.substring(index + 1)
			console.log(index, endStr.indexOf(`",`))
			let messages = str.substring(index + test.length + 2, index + 1 + endStr.indexOf(`",`))
			dataMessage.push(messages)
			number++
			index = str.indexOf(`${test}`, index + 1)
		}
		return dataMessage
	} catch (error) {
		return []
	}
}
