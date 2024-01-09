'use client'
import BigNumber from 'bignumber.js'
import Web3 from 'web3'
import { toast } from 'react-hot-toast/headless'
import { isAndroid } from '@/utils/platform'
import { getParseError } from '@/contracts/parseerror'
// import estimateGasFee from './estimateGasFee'

interface TxInterface {
	account: string
	to: string
	rpcUrl: string
	web3: Web3
	isPoPP?: boolean
	data: any
	value?: string
	onTransactionHash?: (hash: string) => void
	isLocal: 'en' | 'zh-Hans'
}

export const getBanlanceOfs = async (rpcUrl: string, account: string): Promise<string> => {
	const newWeb3 = new Web3(rpcUrl)
	const banlanceOf = await newWeb3.eth.getBalance(account)
	return fromWeiPowBanlances({ balance: banlanceOf.toString() })
}

export const sendTransaction = (props: TxInterface): object | undefined =>
	new Promise(async (resolve, reject) => {
		const { account, to, rpcUrl, isPoPP = false, web3, data, onTransactionHash, isLocal, value = '0x0' } = props

		// 查询账户的余额
		const handleBanlanceOf = async (): Promise<string> => {
			const newWeb3 = new Web3(rpcUrl)
			const banlanceOf = await newWeb3.eth.getBalance(account)
			return fromWeiPowBanlances({ balance: banlanceOf.toString() })
		}

		// 获取当前交易所需的gasPrice
		const handleGasPrice = async (): Promise<string> => {
			if (!isPoPP) {
				return (await web3.eth.getGasPrice()).toString()
			} else {
				const newWeb3 = new Web3(rpcUrl)
				return (await newWeb3.eth.getGasPrice()).toString()
			}
		}

		// 获取当前交易所需的gas
		const handleGas = async (tx: any): Promise<string> => {
			try {
				return (await web3.eth.estimateGas(tx)).toString()
			} catch (error) {
				return '0'
			}
		}
		if (!isPoPP) {
			const accountBanlanOf = await handleBanlanceOf()
			if (Number(accountBanlanOf) === 0) {
				reject(isLocal === 'en' ? 'Current wallet balance is insufficient' : '当前钱包余额不足')
			} else {
				try {
					const receipt = await data
						.send({
							from: account,
							value: value,
						})
						.on('transactionHash', function (hash: string) {
							console.log('Transaction hash:', hash)
							if (onTransactionHash) onTransactionHash(hash)
						})
						.on('error', function (error: any) {
							console.log('error', error)
							reject(getParseError(error.message) ?? error)
						})
					resolve(receipt)
				} catch (error: any) {
					console.log('error', error, error?.messge)
					reject(getParseError(error.message) ?? error)
				}
			}
		} else {
			const encodeABI = data.encodeABI()
			// 预估Gas，验证是否能够支付手续费
			const txGas = {
				from: account,
				to: to,
				data: encodeABI,
				value: value,
			}

			// 当前交易所需的gas和gasPrice await estimateGasFee({ tx: txGas })
			const gasEstimate = await handleGas(txGas),
				gasPrice = await handleGasPrice()
			const gas = new BigNumber(Number(gasEstimate))
			// 当前需要发送的交易
			const tx = {
				...txGas,
				gasPrice,
				gas: Number(gas),
			}

			console.log('zx', tx)
			if (isAndroid()) {
				const { ethereum }: any = window
				try {
					const receipt = await ethereum
						.request({
							method: 'eth_sendTransaction',
							params: [tx],
						})
						.then((res: string) => {
							if (onTransactionHash) onTransactionHash(res)
						})
						.catch((error: any) => {
							reject(getParseError(error.message) ?? error)
						})
					resolve(receipt)
				} catch (error: any) {
					reject(getParseError(error.message) ?? error)
				}
			} else {
				try {
					const receipt = await web3.eth
						.sendTransaction(tx)
						.on('transactionHash', hash => {
							if (onTransactionHash) onTransactionHash(hash)
						})
						.on('error', error => {
							reject(getParseError(error.message) ?? error)
						})
					resolve(receipt)
				} catch (error: any) {
					reject(getParseError(error.message) ?? error)
				}
			}
		}
	})

// 金额单位换算
const fromWeiPowBanlances = ({ decimals = '18', balance }: { decimals?: string; balance: string }) => {
	let wei = new BigNumber(10).pow(decimals)
	let balances = new BigNumber(balance).div(wei)
	return balances.toString()
}

/**
 * 
if (!isPoPP) {
	// 当前的账户余额

	// const totalGas = await estimateGasFee({
	// 	from: account,
	// 	to,
	// 	data: data.encodeABI(),
	// })
	// const totalGasNumber = fromWeiPowBanlances({ balance: totalGas })
	// console.log('diff', totalGasNumber.toString(), accountBanlanOf.toString())
	// if (Number(accountBanlanOf) < Number(totalGasNumber)) {
	// 	toast.error(isLocal === 'en' ? 'Insufficient balance to pay Gas Fees' : '账户余额不足以支付Gas费用')
	// 	return undefined
	// }
}
 */
