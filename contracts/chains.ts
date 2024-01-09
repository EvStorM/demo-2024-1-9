import type { AddEthereumChainParameter } from '@web3-react/types'

export const REACT_APP_ENV = process.env.appEnv || 'dev'

const ETH: AddEthereumChainParameter['nativeCurrency'] = {
	name: 'Ether',
	symbol: 'ETH',
	decimals: 18,
}

const MATIC: AddEthereumChainParameter['nativeCurrency'] = {
	name: 'Matic',
	symbol: 'MATIC',
	decimals: 18,
}

const CELO: AddEthereumChainParameter['nativeCurrency'] = {
	name: 'Celo',
	symbol: 'CELO',
	decimals: 18,
}

const BNB: AddEthereumChainParameter['nativeCurrency'] = {
	name: 'BNB',
	symbol: 'BNB',
	decimals: 18,
}

const TCBNB: AddEthereumChainParameter['nativeCurrency'] = {
	name: 'tcBNB',
	symbol: 'tcBNB',
	decimals: 18,
}

const MANTLE: AddEthereumChainParameter['nativeCurrency'] = {
	name: 'MNT',
	symbol: 'MNT',
	decimals: 18,
}

interface BasicChainInformation {
	urls: string[]
	name: string
}

interface ExtendedChainInformation extends BasicChainInformation {
	nativeCurrency: AddEthereumChainParameter['nativeCurrency']
	blockExplorerUrls: AddEthereumChainParameter['blockExplorerUrls']
}

function isExtendedChainInformation(
	chainInformation: BasicChainInformation | ExtendedChainInformation,
): chainInformation is ExtendedChainInformation {
	return !!(chainInformation as ExtendedChainInformation).nativeCurrency
}

export function getAddChainParameters(chainId: number): AddEthereumChainParameter | number {
	const chainInformation = CHAINS[chainId]
	if (isExtendedChainInformation(chainInformation)) {
		return {
			chainId,
			chainName: chainInformation.name,
			nativeCurrency: chainInformation.nativeCurrency,
			rpcUrls: chainInformation.urls,
			blockExplorerUrls: chainInformation.blockExplorerUrls,
		}
	} else {
		return chainId
	}
}

const getInfuraUrlFor = (network: string) =>
	process.env.infuraKey ? `https://${network}.infura.io/v3/${process.env.infuraKey}` : undefined
const getAlchemyUrlFor = (network: string) =>
	process.env.alchemyKey ? `https://${network}.alchemyapi.io/v2/${process.env.alchemyKey}` : undefined

type ChainConfig = { [chainId: number]: BasicChainInformation | ExtendedChainInformation }

/**
 * 主网配置
 */
export const MAINNET_CHAINS: ChainConfig = {
	1: {
		urls: [getInfuraUrlFor('mainnet'), getAlchemyUrlFor('eth-mainnet'), 'https://cloudflare-eth.com'].filter(Boolean) as any,
		name: 'Mainnet',
	},
	10: {
		urls: ['https://mainnet.optimism.io'].filter(Boolean) as any,
		name: 'Optimism',
		nativeCurrency: ETH,
		blockExplorerUrls: ['https://optimistic.etherscan.io'],
	},
	42161: {
		urls: [getInfuraUrlFor('arbitrum-mainnet'), 'https://arb1.arbitrum.io/rpc'].filter(Boolean) as any,
		name: 'Arbitrum One',
		nativeCurrency: ETH,
		blockExplorerUrls: ['https://arbiscan.io'],
	},
	137: {
		urls: ['https://rpc.ankr.com/polygon'].filter(Boolean) as any,
		name: 'Polygon Mainnet',
		nativeCurrency: MATIC,
		blockExplorerUrls: ['https://polygonscan.com'],
	},
	56: {
		urls: ['https://bsc-dataseed1.binance.org'],
		name: 'BNB Smart Chain Mainnet',
		nativeCurrency: BNB,
		blockExplorerUrls: ['https://bscscan.com'],
	},
	5000: {
		urls: ['https://rpc.mantle.xyz'],
		name: 'Mantle',
		nativeCurrency: MANTLE,
		blockExplorerUrls: ['https://explorer.mantle.xyz'],
	},
}

/**
 * test 链配置
 */
export const TESTNET_CHAINS: ChainConfig = {
	5: {
		urls: [getInfuraUrlFor('goerli')].filter(Boolean) as any,
		name: 'Görli',
	},
	420: {
		urls: ['https://goerli.optimism.io'].filter(Boolean) as any,
		name: 'Optimism Goerli',
		nativeCurrency: ETH,
		blockExplorerUrls: ['https://goerli-explorer.optimism.io'],
	},
	421613: {
		urls: [getInfuraUrlFor('arbitrum-goerli'), 'https://goerli-rollup.arbitrum.io/rpc'].filter(Boolean) as any,
		name: 'Arbitrum Goerli',
		nativeCurrency: ETH,
		blockExplorerUrls: ['https://testnet.arbiscan.io'],
	},
	80001: {
		urls: [getInfuraUrlFor('polygon-mumbai')].filter(Boolean) as any,
		name: 'Polygon Mumbai',
		nativeCurrency: MATIC,
		blockExplorerUrls: ['https://mumbai.polygonscan.com'],
	},
	5611: {
		urls: ['https://opbnb-testnet-rpc.bnbchain.org'],
		name: 'opBNB Testnet',
		nativeCurrency: TCBNB,
		blockExplorerUrls: ['https://opbnbscan.com'],
	},
	97: {
		urls: ['https://data-seed-prebsc-2-s3.binance.org:8545'],
		name: 'BNB Smart Chain Testnet',
		nativeCurrency: BNB,
		blockExplorerUrls: ['https://testnet.bscscan.com'],
	},
}

/**
 * 不同环境下的支持的链信息
 */
const PRD: number[] = [56]
const DEV: number[] = [97]
export const CHAINSAll: ChainConfig = {
	...MAINNET_CHAINS,
	...TESTNET_CHAINS,
}

const CHAIN_REACT_APP_ENV: {
	type: 'dev' | 'prd'
	chainds: number[]
	data: any
}[] = [
	{
		type: 'dev',
		chainds: DEV,
		data: Object.keys(CHAINSAll).reduce((accumulator, current) => {
			let isTrue = DEV.filter(item => item === Number(current))
			if (isTrue && isTrue.length === 1) return { ...accumulator, [current]: CHAINSAll[Number(current)] }
			return accumulator
		}, {}),
	},
	{
		type: 'prd',
		chainds: PRD,
		data: Object.keys(CHAINSAll).reduce((accumulator, current) => {
			let isTrue = PRD.filter(item => item === Number(current))
			if (isTrue && isTrue.length === 1) return { ...accumulator, [current]: CHAINSAll[Number(current)] }
			return accumulator
		}, {}),
	},
]

/** 不同环境下的 CHAINS */
export const CHAINS: ChainConfig = CHAIN_REACT_APP_ENV.filter(item => item.type === REACT_APP_ENV)[0].data

export const URLS: { [chainId: number]: string[] } = Object.keys(CHAINS).reduce<{ [chainId: number]: string[] }>(
	(accumulator, chainId) => {
		const validURLs: string[] = CHAINS[Number(chainId)].urls

		if (validURLs.length) {
			accumulator[Number(chainId)] = validURLs
		}

		return accumulator
	},
	{},
)
