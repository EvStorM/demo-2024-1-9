"use client";
import React, { useState, useEffect, useMemo } from "react";
import { useWeb3React } from "@web3-react/core";
import { useEagerConnect } from "@/hooks/useWeb3ProviderHooks";
import { ConstantInit } from "@/contracts/constant.init";
import { URLS } from "@/contracts/chains";
import { DEFAULT_CHAINID, getActiveChainId } from "@/contracts/constant";
import AllProviderContext from "@/context/allProvider";

declare var window: any;

const Web3ProviderPage = ({ children }: { children: React.ReactNode }) => {
  const { provider, chainId, account } = useWeb3React();
  const chainIds = Object.keys(URLS);

  // 连接器的是否重新连接
  useEagerConnect(chainId);

  // 停止
  const [blockNumber, setBlockNumber] = useState<number | undefined>(undefined);
  const [amount, setAmount] = useState<number>(0);

  // 获取当前是否在PoPP内登录

  /**
   * 用户成功链接后，初始化全局参数，更具链接的链是否支持，不支持使用默认链初始化web3
   * getActiveChainId 判断当前chainId是否在当前环境中的chainIds中
   */
  const data = useMemo<any>(() => {
    if (!chainId) {
      let callProvider = URLS[DEFAULT_CHAINID][0];
      return new ConstantInit(URLS[DEFAULT_CHAINID][0], DEFAULT_CHAINID, callProvider);
    } else {
      let isTrue = getActiveChainId(chainIds, chainId);
      let callProvider = URLS[!isTrue ? DEFAULT_CHAINID : chainId][0];
      return new ConstantInit((provider as any)?.provider || URLS[!isTrue ? DEFAULT_CHAINID : chainId][0], !isTrue ? DEFAULT_CHAINID : chainId, callProvider);
    }
  }, [chainId, chainIds, provider]);

  useEffect(() => {
    if (data && account) handleAmountData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, account]);

  useEffect(() => {
    if (typeof window !== undefined) window.data = data;
  }, [data]);

  // useEffect((): any => {
  // 	if (!!provider) {
  // 		let stale = false
  // 		provider
  // 			.getBlockNumber()
  // 			.then((blockNumber: number) => {
  // 				if (!stale) setBlockNumber(blockNumber)
  // 			})
  // 			.catch(() => {
  // 				if (!stale) setBlockNumber(undefined)
  // 			})
  // 		const updateBlockNumber = (blockNumber: number) => setBlockNumber(blockNumber)
  // 		provider.on('block', updateBlockNumber)
  // 		return () => {
  // 			stale = true
  // 			provider.removeListener('block', updateBlockNumber)
  // 			setBlockNumber(undefined)
  // 		}
  // 	}
  // }, [provider, chainId]) // ensures refresh if referential identity of library doesn't change across chainIds

  /**
   * 用户在不同链 链接后的账户余额查询
   */
  const handleAmountData = async () => {
    if (!account) return;
    const { web3, fromWeiPowBanlance } = data;
    try {
      const balance = await web3.eth.getBalance(account);
      // const balanceNum = web3.utils.fromWei(balance, 'ether')
      // const balanceInNumber = parseFloat(balanceNum)
      setAmount(Number(fromWeiPowBanlance({ balance, decimals: 18 })));
    } catch (error) {}
  };

  return <AllProviderContext.Provider value={{ blockNumber, data, balance: amount }}>{children}</AllProviderContext.Provider>;
};

export default Web3ProviderPage;
