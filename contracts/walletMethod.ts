import { WalletMethodType } from '@/types'

// 支持的连接器基本信息列表
export const WALLETMETHOD: WalletMethodType[] = [
	{
		name: 'Metamask',
		link: 'Metamask',
		icon: require('@/assets/wallet/metamask.svg'),
	},
	{
		name: 'WalletConnect',
		link: 'WalletConnect',
		icon: require('@/assets/wallet/wallet-connect.svg'),
	},
]
