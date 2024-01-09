// import { ethers } from 'ethers'
// import { getL1GasPrice, decimals, scalar, overhead } from '@mantleio/sdk'

// async function estimateGasFee(tx: any) {
// 	const l2RpcProvider = new ethers.providers.JsonRpcProvider('https://rpc.mantle.xyz')

// 	try {
// 		// By calling the BVM_GasPriceOracle contract method l1basefee()
// 		const gasPrice = await getL1GasPrice(l2RpcProvider)
// 		const decimals1: any = await decimals(l2RpcProvider)
// 		const scalar1 = await scalar(l2RpcProvider)
// 		const gasUsed = await overhead(l2RpcProvider)

// 		// L1RollupFee
// 		const l1RollupFee = gasPrice
// 			.mul(gasUsed)
// 			.mul(scalar1)
// 			.div(10 ** decimals1)

// 		// L2TxnFee
// 		const l2Gas = await l2RpcProvider.estimateGas(tx)
// 		const l2GasPrice = await l2RpcProvider.getGasPrice()
// 		const l2TxnFee = l2GasPrice.mul(l2Gas)

// 		// Total estimated Gas Fee
// 		const totalEstimatedGasFee = l1RollupFee.add(l2TxnFee)
// 		console.log(`Total estimated Gas Fee: ${totalEstimatedGasFee.toString()}`)
// 		return totalEstimatedGasFee.toString()
// 	} catch (error) {
// 		console.error('Error estimating gas:', error)
// 		return '0'
// 	}
// }
// export default estimateGasFee
