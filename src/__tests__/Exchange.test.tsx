
import { render } from '@testing-library/react'
import { Exchange } from '../Exchange/Exchange';
Object.defineProperty(window, 'matchMedia', {
  value: () => {
    return {
      matches: false,
      addListener: () => {},
      removeListener: () => {}
    };
  }
})

describe(('it should render Exchange component'), () => {
 
  it(('should render Exchange component'), () => {
     render(<Exchange />)
  })
})
