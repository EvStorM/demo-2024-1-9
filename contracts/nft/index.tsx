import { ERC721_ABI, ERC1155_ABI } from '@/contracts/constant'
import Web3 from 'web3'

// 验证地址是否是ERC721 或者ERC1155
export const rulesAddressErc721Or1155 = async ({
	address,
	web3,
}: {
	address: string
	web3: Web3
}): Promise<{
	address: string
	ercType: '1155' | '721'
	isTrue: boolean
}> => {
	const contract721: any = new web3.eth.Contract(ERC721_ABI, address)
	const isTrue721 = await contract721.methods.supportsInterface('0x80ac58cd').call()

	const contract1155 = new web3.eth.Contract(ERC1155_ABI, address)

	return {
		address: '',
		ercType: '1155',
		isTrue: false,
	}
}
