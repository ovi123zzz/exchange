import styled from 'styled-components'
import { ExchangeCalculator } from './ExchangeCalculator'
const ExchangeWrapper = styled.div`
  display: flex;
  background-color: #151313;
  color: #fff;
  width: 350px;
  padding: 20px;
  height: 500px;
  margin: 20px auto;
  display: flex;
  flex-direction: column;
`

export const Exchange: React.FC = () => {
  return (
    <ExchangeWrapper>
      <ExchangeCalculator />
    </ExchangeWrapper>
  )
}
