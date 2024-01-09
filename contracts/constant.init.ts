import Web3 from 'web3'
import { REACT_APP_ENV } from '@/contracts/chains'
import BigNumber from 'bignumber.js'
import { ERC1155_ABI, FeeCollectModule_ABI, FinancePool_ABI, MirrorNFT_ABI, PoPPHub_ABI, USECONSTANT } from '@/contracts/constant'

export interface ConstantTypes {
	ContractPoPPHub: any
	ContractFinancePool: any
	ContractFeeCollectModule: any
	ContractMirrorNFTimpl: any
}
/**
 * web3 - 根据不同环境、不同链的实例化
 * toWeiPowBanlance - 加多少0 decimals: 多少个0 . balance: 金额
 * fromWeiPowBanlance - 去掉多少个0,保留6位小数
 * fromWeiPowBanlances - 去掉多少个0,保留全局小数
 */
export interface ConstantInitTypes {
	web3: Web3
	web3Call: Web3
	constant: ConstantTypes
	constantCall: ConstantTypes
	apiUrl: string
	apiKey: string
	rpcUrl: string
	network: string
	PoPPHub_ADDRESS: string
	Profile_Follow_Module_ADDRESS: string
	Mirror_NFT_impl_ADDRESS: string
	Usdt_ADDRESS: string
	Finance_Pool_Module_ADDRESS: string
	Finance_Pool_ADDRESS: string
	Fee_Collect_Module_ADDRESS: string
	Follower_Only_Reference_Module_ADDRESS: string
	toWeiPowBanlance: ({ decimals, balance }: { decimals: string; balance: string }) => string
	fromWeiPowBanlance: ({ decimals, balance }: { decimals: string; balance: string }) => string
	fromWeiPowBanlances: ({ decimals, balance }: { decimals: string; balance: string }) => string
}

export class ConstantInit {
	web3: Web3
	web3Call: Web3
	constant: ConstantTypes
	constantCall: ConstantTypes
	apiUrl: string
	apiKey: string
	rpcUrl: string
	network: string
	PoPPHub_ADDRESS: string
	Profile_Follow_Module_ADDRESS: string
	Usdt_ADDRESS: string
	Finance_Pool_Module_ADDRESS: string
	Fee_Collect_Module_ADDRESS: string
	Follower_Only_Reference_Module_ADDRESS: string
	Finance_Pool_ADDRESS: string
	Mirror_NFT_impl_ADDRESS: string

	constructor(provider: any, chainId: number, callProvider: any) {
		const {
			PoPPHub_ADDRESS,
			Profile_Follow_Module_ADDRESS,
			Usdt_ADDRESS,
			Fee_Collect_Module_ADDRESS,
			Finance_Pool_Module_ADDRESS,
			Follower_Only_Reference_Module_ADDRESS,
			Finance_Pool_ADDRESS,
			Mirror_NFT_impl_ADDRESS,
			apiKey,
			apiUrl,
			rpcUrl,
			network,
		} = USECONSTANT[chainId]

		this.web3 = new Web3(provider)
		this.apiUrl = apiUrl
		this.apiKey = apiKey
		this.PoPPHub_ADDRESS = PoPPHub_ADDRESS
		this.Profile_Follow_Module_ADDRESS = Profile_Follow_Module_ADDRESS
		this.Usdt_ADDRESS = Usdt_ADDRESS
		this.Finance_Pool_Module_ADDRESS = Finance_Pool_Module_ADDRESS
		this.Fee_Collect_Module_ADDRESS = Fee_Collect_Module_ADDRESS
		this.Follower_Only_Reference_Module_ADDRESS = Follower_Only_Reference_Module_ADDRESS
		this.Finance_Pool_ADDRESS = Finance_Pool_ADDRESS
		this.rpcUrl = rpcUrl
		this.network = network
		this.Mirror_NFT_impl_ADDRESS = Mirror_NFT_impl_ADDRESS
		this.constant = {
			ContractPoPPHub: new this.web3.eth.Contract(PoPPHub_ABI, PoPPHub_ADDRESS),
			ContractFinancePool: new this.web3.eth.Contract(FinancePool_ABI, Finance_Pool_ADDRESS),
			ContractFeeCollectModule: new this.web3.eth.Contract(FeeCollectModule_ABI, Fee_Collect_Module_ADDRESS),
			ContractMirrorNFTimpl: new this.web3.eth.Contract(MirrorNFT_ABI, Mirror_NFT_impl_ADDRESS),
		}

		this.web3Call = new Web3(callProvider)
		this.constantCall = {
			ContractPoPPHub: new this.web3Call.eth.Contract(PoPPHub_ABI, PoPPHub_ADDRESS),
			ContractFinancePool: new this.web3Call.eth.Contract(FinancePool_ABI, Finance_Pool_ADDRESS),
			ContractFeeCollectModule: new this.web3Call.eth.Contract(FeeCollectModule_ABI, Fee_Collect_Module_ADDRESS),
			ContractMirrorNFTimpl: new this.web3Call.eth.Contract(MirrorNFT_ABI, Mirror_NFT_impl_ADDRESS),
		}

		// console.log('REACT_APP_ENV', REACT_APP_ENV)
	}

	fromWeiPowBanlance = ({ decimals, balance }: { decimals: string; balance: string }) => {
		let wei = new BigNumber(10).pow(decimals)
		let balances = new BigNumber(balance).div(wei).toFixed(6)
		return balances
	}

	fromWeiPowBanlances = ({ decimals, balance }: { decimals: string; balance: string }) => {
		let wei = new BigNumber(10).pow(decimals)
		let balances = new BigNumber(balance).div(wei)
		return balances.toString()
	}

	toWeiPowBanlance = ({ decimals, balance }: { decimals: string; balance: string }) => {
		let wei = new BigNumber(10).pow(decimals)
		let balances = new BigNumber(balance).times(wei).toFixed(0)
		return balances
	}
}
