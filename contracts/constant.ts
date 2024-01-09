import { CHAINS } from '@/contracts/chains'
import type { UseConstantType } from '@/types'
import { REACT_APP_ENV } from '@/contracts/chains'

import PoPPHub from '@/contracts/abi/PoPPHub.json'
import USDT from '@/contracts/abi/USDT.json'
import FeeCollectModule from '@/contracts/abi/FeeCollectModule.json'
import FinancePool from '@/contracts/abi/FinancePool.json'
import FinancePoolModule from '@/contracts/abi/FinancePoolModule.json'
import Events from '@/contracts/abi/Events.json'
import ERC721 from '@/contracts/abi/ERC721.json'
import ERC1155 from '@/contracts/abi/ERC1155.json'

import EchoNFT from '@/contracts/abi/EchoNFT.json'
import MirrorNFT from '@/contracts/abi/MirrorNFT.json'

// 默认链
export const DEFAULT_CHAINID: number = Object.keys(CHAINS).map(Number)[0]

// 判断是否支持该链
export const getActiveChainId = (arr: string[], network: number) => {
	if (network === null) return false
	return arr.some(item => Number(item) === Number(network))
}

/**
 * 配置环境变量的合约参数
 * 测试环境 DAI-USDT
 */
export const useConstant: { [env: string]: UseConstantType } = {
	dev: {
		97: {
			PoPPHub_ADDRESS: '0xDd721eeFdBa04CE39e0a13c03D74A08c912096Ec',
			Profile_Follow_Module_ADDRESS: '0xE5ce2a681fC68316Fd8D5BBa610c8DbD1Cd3CcB1',
			Fee_Collect_Module_ADDRESS: '0x3c611DfAa4EC6Dd3ACBD35af68d999BBA58ad986',
			Finance_Pool_Module_ADDRESS: '0x608eF8ed5B7E63f32D231da930E3E2b0cd2eCb0E',
			Follower_Only_Reference_Module_ADDRESS: '0x19be154d05FA88F04db0CDaa8AC7245A8B6Dc85f',
			Usdt_ADDRESS: '0x0000000000000000000000000000000000000000',
			Finance_Pool_ADDRESS: '0x2C481ee8CE999bFF6Ff8ff51e09cb105C46d130A',
			Mirror_NFT_impl_ADDRESS: '0xC7e965C51A3fFf2F76C9946A7364221b1fA3446F',
			apiKey: '',
			apiUrl: '',
			rpcUrl: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
			network: 'Bsc Test',
		},
	},
	prd: {
		56: {
			PoPPHub_ADDRESS: '',
			Profile_Follow_Module_ADDRESS: '',
			Fee_Collect_Module_ADDRESS: '',
			Finance_Pool_Module_ADDRESS: '',
			Follower_Only_Reference_Module_ADDRESS: '',
			Usdt_ADDRESS: '',
			Finance_Pool_ADDRESS: '',
			Mirror_NFT_impl_ADDRESS: '',
			apiKey: '',
			apiUrl: '',
			rpcUrl: 'https://bsc-dataseed1.binance.org',
			network: 'Bsc',
		},
	},
}

export const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000'

export const USECONSTANT: UseConstantType = useConstant[REACT_APP_ENV]

export const PoPPHub_ABI: any = PoPPHub
export const USDT_ABI: any = USDT
export const FeeCollectModule_ABI: any = FeeCollectModule
export const FinancePoolModule_ABI: any = FinancePoolModule
export const Events_ABI: any = Events
export const ERC721_ABI: any = ERC721
export const ERC1155_ABI: any = ERC1155
export const FinancePool_ABI: any = FinancePool
export const EchoNFT_ABI: any = EchoNFT
export const MirrorNFT_ABI: any = MirrorNFT
