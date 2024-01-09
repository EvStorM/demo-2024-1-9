import type { ChainNetworkInfoType } from '@/types'

// 支持的链的基本信息列表
export const CHAINNETWORKINFO: ChainNetworkInfoType[] = [
	{
		name: 'Ethereum',
		fullName: 'Ethereum Mainnet',
		chainId: 1,
		image: require('@/assets/token/ETH.svg'),
		unit: 'ETH',
	},
	{
		name: 'Optimism',
		fullName: 'Optimism Mainnet',
		chainId: 10,
		image: require('@/assets/token/Optimism.svg'),
		unit: 'ETH',
	},
	{
		name: 'Arbitrum',
		fullName: 'Arbitrum One',
		chainId: 42161,
		image: require('@/assets/token/Arbitrum.svg'),
		unit: 'ETH',
	},
	{
		name: 'Polygon',
		fullName: 'Polygon Mainnet',
		chainId: 137,
		image: require('@/assets/token/Polygon.svg'),
		unit: 'MATIC',
	},
	{
		name: 'BNB Chain',
		fullName: 'BNB Smart Chain Mainnet',
		chainId: 56,
		image: require('@/assets/token/BNB.svg'),
		unit: 'BNB',
	},
	{
		name: 'Görli',
		fullName: 'Görli',
		chainId: 5,
		image: require('@/assets/token/ETH.svg'),
		unit: 'ETH',
	},
	{
		name: 'Optimism',
		fullName: 'Optimism Goerli',
		chainId: 420,
		image: require('@/assets/token/Optimism.svg'),
		unit: 'ETH',
	},
	{
		name: 'Arbitrum',
		fullName: 'Arbitrum Goerli',
		chainId: 421613,
		image: require('@/assets/token/Arbitrum.svg'),
		unit: 'ETH',
	},
	{
		name: 'Mumbai',
		fullName: 'Polygon Mumbai',
		chainId: 80001,
		image: require('@/assets/token/Polygon.svg'),
		unit: 'MATIC',
	},
	{
		name: 'opBNB Testnet',
		fullName: 'opBNB Testnet',
		chainId: 5611,
		image: require('@/assets/token/BNB.svg'),
		unit: 'tcBNB',
	},
	{
		name: 'BNB Testnet',
		fullName: 'BNB Smart Chain Testnet',
		chainId: 97,
		image: require('@/assets/token/BNB.svg'),
		unit: 'tBNB',
	},
	{
		name: 'Mantle',
		fullName: 'Mantle',
		chainId: 5000,
		image: require('@/assets/token/mnt.svg'),
		unit: 'MNT',
	},
]
