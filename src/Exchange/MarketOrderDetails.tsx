import styled from 'styled-components'
const MarketOrderWrapper = styled.div`
  color: #0b65eb;
  font-weight: 500;
`
interface MarketOrderDetailsProps {
  sellCurrencyType: string
  marketOrderRate: number
  buyCurrencyType: string
}
export const MarketOrderDetails: React.FC<MarketOrderDetailsProps> = ({ sellCurrencyType, marketOrderRate, buyCurrencyType }) => {
  return (
    <MarketOrderWrapper>
      Market Order - 1 {sellCurrencyType} = {marketOrderRate.toFixed(2)} {buyCurrencyType}
    </MarketOrderWrapper>
  )
}
