import styled from 'styled-components'
const MarketOrderWrapper = styled.div`
  color: #0b65eb;
  font-weight: 500;
`
export const MarketOrderDetails = ({ sellCurrencyType, marketOrderRate, buyCurrencyType }) => {
  return (
    <MarketOrderWrapper>
      Market Order - 1 {sellCurrencyType} = {marketOrderRate.toFixed(2)} {buyCurrencyType}
    </MarketOrderWrapper>
  )
}
