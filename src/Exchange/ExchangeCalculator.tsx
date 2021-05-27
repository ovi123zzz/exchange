import { useState } from 'react'
import {  Form  } from 'antd';
import { useTypeOfCurrency } from './hooks/useTypeOfCurrency'
import { useAccountBalance } from './hooks/useAccountBalance'
import { MarketOrderDetails } from './MarketOrderDetails'
import { ExchangeForm } from './ExchangeForm'
import styled from 'styled-components'


export const ExchangeCalculator = () => {
  const [form] = Form.useForm();

  const { sellCurrencyType, buyCurrencyType, updateSellCurrencyType, updateBuyCurrencyType } = useTypeOfCurrency()
  const { updateSellBalance, getCurrentBalance, balanceValue } = useAccountBalance()

  const [marketOrderRate, setMarketOrderRate] = useState(0.20)
  const [isDisabled, setIsDisabled] = useState(true)


  const onFinish = (values) => {
    form.setFieldsValue({ buy: 0, sell: 0 })
    updateSellBalance(sellCurrencyType, values.sell, 'sell')
    updateSellBalance(buyCurrencyType, values.buy, 'buy')
    getCurrentBalance(sellCurrencyType)
   
    setIsDisabled(true)

  };





  const validateMessages = async (value, sellOrBuyType) => {
    const currentBalance = balanceValue(sellOrBuyType)
    if (currentBalance) {
      const balanceCheck = parseFloat(currentBalance) - value
      if (balanceCheck < 0) {
        return Promise.reject(new Error('Balance exceeds'));
      }
    }
  }

  const SellMessage = styled.div`
  font-size: 35px;
    font-weight: bold;
  `

  return (
    <div>
      <SellMessage>
        Sell {sellCurrencyType}
      </SellMessage>

      <MarketOrderDetails sellCurrencyType={sellCurrencyType} marketOrderRate={marketOrderRate} buyCurrencyType={buyCurrencyType} />

      <ExchangeForm
        form={form}
        onFinish={onFinish}
        buyCurrencyType={buyCurrencyType}
        sellCurrencyType={sellCurrencyType}
        getCurrentBalance={getCurrentBalance}
        updateSellCurrencyType={updateSellCurrencyType}
        setMarketOrderRate={setMarketOrderRate}
        validateMessages={validateMessages}
        updateBuyCurrencyType={updateBuyCurrencyType}
        balanceValue={balanceValue}
        setIsDisabled={setIsDisabled}
        isDisabled={isDisabled}
      />
    </div>

  )
}
