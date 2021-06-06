
import { render } from '@testing-library/react'
import { SellCurrency } from '../Exchange/SellCurrency';
Object.defineProperty(window, 'matchMedia', {
  value: () => {
    return {
      matches: false,
      addListener: () => {},
      removeListener: () => {}
    };
  }
})

describe(('it should render SellCurrency component'), () => {
 
  it(('should render SellCurrency component'), () => {
     render(<SellCurrency currencyName='EUR'/>)
  })
  it(('should show currency name(EUR) at the top of the converter'), () => {
    const {getByText} = render(<SellCurrency currencyName='EUR'/>)
    expect(getByText('Sell EUR').textContent).toBe('Sell EUR')
 })
  it(('should show currency name(USD) at the top of the converter'), () => {
    const {getByText} = render(<SellCurrency currencyName='USD'/>)
    expect(getByText('Sell USD').textContent).toBe('Sell USD')
  })
})