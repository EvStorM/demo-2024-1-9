import AwsStorageClient from '@/contracts/aws'
import { ConstantInit } from '@/contracts/constant.init'
import { createContext } from 'react'

import { ConstantInitTypes } from '@/contracts/constant.init'
import { AwsStorageClientTypes } from '@/contracts/aws'

/**
 * data web3-合约、不同环境默认参数（独属于某个环境、某条链配置）
 * blockNumber - 当前链的块
 * balance - 用户当前链的 钱包余额
 * awsStore - aws s3 上传
 * buildVersion PoPP版本号
 * registerType 0未知 1手机 2钱包 3钱包直连
 */
export type IAllProviderContext = {
	data?: typeof ConstantInit
	blockNumber: number | undefined
	balance: number
	awsStore?: typeof AwsStorageClient
}

const AllProviderContext = createContext<IAllProviderContext>({
	data: undefined,
	blockNumber: undefined,
	balance: 0,
	awsStore: undefined,
})

// use data
export interface DataTypes {
	data: ConstantInitTypes
	blockNumber?: number
	balance?: number
	awsStore: AwsStorageClientTypes
	buildVersion: number | string | undefined
	registerType?: number
}

export default AllProviderContext
