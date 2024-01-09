'use client'
import { Web3ReactHooks, Web3ReactProvider } from '@web3-react/core'
import type { MetaMask } from '@web3-react/metamask'
import type { WalletConnect as WalletConnectV2 } from '@web3-react/walletconnect-v2'
import type { Network } from '@web3-react/network'

import { hooks as metaMaskHooks, metaMask } from '@/connectors/metaMask'
import { hooks as networkHooks, network } from '@/connectors/network'
import { hooks as walletConnectV2Hooks, walletConnectV2 } from '@/connectors/walletConnectV2'

import ProviderPage from '@/app/components/Provider'

/**
 * web3-react 注册器，主要注册内容为Metamask WalletConnect NetWork连接器
 */
const connectors: [MetaMask | WalletConnectV2 | Network, Web3ReactHooks][] = [
	[metaMask, metaMaskHooks],
	[walletConnectV2, walletConnectV2Hooks],
	[network, networkHooks],
]

export default function Web3ProviderPage({ children }: { children: React.ReactNode }) {
	return (
		<Web3ReactProvider connectors={connectors}>
				<ProviderPage>{children}</ProviderPage>
		</Web3ReactProvider>
	)
}
