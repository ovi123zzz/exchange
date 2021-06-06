import { useState } from 'react'
import { useTypeOfCurrency } from './hooks/useTypeOfCurrency'
import { MarketOrderDetails } from './MarketOrderDetails'
import { ExchangeForm } from './ExchangeForm'
import styled from 'styled-components'

const SellMessage = styled.div`
  font-size: 35px;
  font-weight: bold;
`
export const ExchangeCalculator: React.FC = () => {
  const { sellCurrencyType, buyCurrencyType, updateSellCurrencyType, updateBuyCurrencyType } = useTypeOfCurrency()

  const [marketOrderRate, setMarketOrderRate] = useState(0.20)
  
  return (
    <div>
      <SellMessage>
        Sell {sellCurrencyType}
      </SellMessage>

      <MarketOrderDetails sellCurrencyType={sellCurrencyType} marketOrderRate={marketOrderRate} buyCurrencyType={buyCurrencyType} />

      <ExchangeForm
        buyCurrencyType={buyCurrencyType}
        sellCurrencyType={sellCurrencyType}
        updateSellCurrencyType={updateSellCurrencyType}
        setMarketOrderRate={setMarketOrderRate}
        updateBuyCurrencyType={updateBuyCurrencyType}
      />
    </div>

  )
}
