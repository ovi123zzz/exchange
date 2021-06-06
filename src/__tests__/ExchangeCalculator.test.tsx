import { render, cleanup } from '@testing-library/react'
import { ExchangeCalculator } from '../Exchange/ExchangeCalculator';
Object.defineProperty(window, 'matchMedia', {
  value: () => {
    return {
      matches: false,
      addListener: () => {},
      removeListener: () => {}
    };
  }
})

afterEach(cleanup)
describe(('exchange calculator'), () => {
 it(('should  render ExchangeCalculator component'), () => {
  render(<ExchangeCalculator/>)
 })
} )