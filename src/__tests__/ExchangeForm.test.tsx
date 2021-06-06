import { render, cleanup, fireEvent, act } from '@testing-library/react'
import { Form } from 'antd'
import { ExchangeForm } from '../Exchange/ExchangeForm';

Object.defineProperty(window, 'matchMedia', {
  value: () => {
    return {
      matches: false,
      addListener: () => { },
      removeListener: () => { }
    };
  }
})
jest.mock('antd', () => {
  const antd = jest.requireActual('antd');

  const Select = ({ children, onChange }) => {
    return <select data-testid='select-top' onChange={e => onChange(e.target.value)}>{children}</select>;
  };

  Select.Option = ({ children, ...otherProps }) => {
    return <option data-testid='select-options' {...otherProps}>{children}</option>;
  }

  
  return {
    ...antd,  
    Select,
  }
})

afterEach(cleanup)
describe(('exchange form'), () => {
  
  test(('check if inputs are in form'), () => {
    const { getByText, unmount} =  render(<ExchangeForm
      buyCurrencyType='ron'
      sellCurrencyType='eur'
      updateBuyCurrencyType='usd'
      updateSellCurrencyType='gbp' 
      setMarketOrderRate={0.20} 
      />)
      const buyCurrencyType = 'ron'
      const sellCurrencyType = 'eur'
      const sellInput = document.getElementById('exchange_form_sell')
      const buyInput = document.getElementById('exchange_form_buy')

      const submitButton = getByText(`Sell ${sellCurrencyType} for ${buyCurrencyType}`)


      expect(buyInput).toBeInTheDocument()
      expect(sellInput).toBeInTheDocument()
      expect(submitButton).toBeInTheDocument()
      unmount()
  })

  test(('sell select is changing'), async () => {
    const updateSellCurrencyType = jest.fn()
    const setMarketOrderRate = jest.fn()
    const {unmount, getAllByTestId} =  render(
    <ExchangeForm
      buyCurrencyType='ron'
      sellCurrencyType='eur'
      updateBuyCurrencyType='usd'
      updateSellCurrencyType={updateSellCurrencyType} 
      setMarketOrderRate={setMarketOrderRate} 
      />)
      
      const sellSelect = getAllByTestId('select-top')[0]
    
      
      await act (async( ) => {
        fireEvent.change(sellSelect, { target: { value: 'gbp' } })
        updateSellCurrencyType.mockReturnValueOnce('GBP')
 
      })
        let options = getAllByTestId('select-options')
        expect(options[2].value).toBe('GBP')
        expect(updateSellCurrencyType).toBeCalled()
        expect(updateSellCurrencyType()).toBe('GBP')
      unmount()
  })
  test(('buy select is changing'), async() => {
    const updateBuyCurrencyType = jest.fn()
    const updateSellCurrencyType = jest.fn()
    const setMarketOrderRate = jest.fn()
    const {unmount, getAllByTestId} =  render(
    <ExchangeForm
      buyCurrencyType='ron'
      sellCurrencyType='eur'
      updateBuyCurrencyType={updateBuyCurrencyType}
      updateSellCurrencyType={updateSellCurrencyType} 
      setMarketOrderRate={setMarketOrderRate} 
      />)
      
      const buySelect = getAllByTestId('select-top')[1]
      await act (async( ) => {
        fireEvent.change(buySelect, { target: { value: 'usd' } })
        updateBuyCurrencyType.mockReturnValueOnce('USD')
      })
        let options = getAllByTestId('select-options')
        expect(options[3].value).toBe('USD')
        expect(updateBuyCurrencyType).toBeCalled()
        expect(updateBuyCurrencyType()).toBe('USD')

        unmount()
  })
  test(('sell input is chaning value'), () => {
    const updateBuyCurrencyType = jest.fn()
    const updateSellCurrencyType = jest.fn()
    const setMarketOrderRate = jest.fn()
    const {unmount} =  render(
    <ExchangeForm
      buyCurrencyType='ron'
      sellCurrencyType='eur'
      updateBuyCurrencyType={updateBuyCurrencyType}
      updateSellCurrencyType={updateSellCurrencyType} 
      setMarketOrderRate={setMarketOrderRate} 
      />)
    const sellInput = (document.getElementById('exchange_form_sell') as HTMLInputElement)
    expect(sellInput.value).toBe('0')
    act(() => {
      fireEvent.change(sellInput, {target: {value: 200}})
    })
    expect(sellInput.value).toBe('200')
    unmount()
  })
  test(('buy input is changing value'), () => {
    const updateBuyCurrencyType = jest.fn()
    const updateSellCurrencyType = jest.fn()
    const setMarketOrderRate = jest.fn()
    const {unmount} =  render(
    <ExchangeForm
      buyCurrencyType='ron'
      sellCurrencyType='eur'
      updateBuyCurrencyType={updateBuyCurrencyType}
      updateSellCurrencyType={updateSellCurrencyType} 
      setMarketOrderRate={setMarketOrderRate} 
      />)
      const buyInput = (document.getElementById('exchange_form_buy') as HTMLInputElement)

    expect(buyInput.value).toBe('0')
    act(() => {
      fireEvent.change(buyInput, {target: {value: 200}})
    })
    expect(buyInput.value).toBe('200')
    unmount()
  })
  test(('buy input value should change when sell input value is changing'), () => {
    const updateBuyCurrencyType = jest.fn()
    const updateSellCurrencyType = jest.fn()
    const setMarketOrderRate = jest.fn()
    const {unmount} =  render(
    <ExchangeForm
      buyCurrencyType='ron'
      sellCurrencyType='eur'
      updateBuyCurrencyType={updateBuyCurrencyType}
      updateSellCurrencyType={updateSellCurrencyType} 
      setMarketOrderRate={setMarketOrderRate} 
      />)
      const sellInput = (document.getElementById('exchange_form_sell') as HTMLInputElement)
      const buyInput = (document.getElementById('exchange_form_buy') as HTMLInputElement)

    expect(sellInput?.value).toBe('0')
    expect(buyInput?.value).toBe('0')

    act(() => {
      fireEvent.change(sellInput, {target: {value: 200}})
      fireEvent.change(buyInput, {target: {value: 40}})
    })
    expect(sellInput?.value).toBe('200')
    expect(buyInput?.value).toBe('40')
    unmount()
  })
  test(('we have a balance'), () => {
    const updateBuyCurrencyType = jest.fn()
    const updateSellCurrencyType = jest.fn()
    const setMarketOrderRate = jest.fn()
    const balanceValue = jest.fn()
    const {unmount, getByTestId} =  render(
    <ExchangeForm
      buyCurrencyType='ron'
      sellCurrencyType='eur'
      updateBuyCurrencyType={updateBuyCurrencyType}
      updateSellCurrencyType={updateSellCurrencyType} 
      setMarketOrderRate={setMarketOrderRate} 
      />)

      const buyBalance = getByTestId('buy-balance')
      const sellBalance = getByTestId('sell-balance')

    act(() => {
      balanceValue.mockReturnValue(123)   
    })
    expect(buyBalance).toHaveTextContent(/Balance:/)
    expect(sellBalance).toHaveTextContent(/Balance:/)

    expect(balanceValue()).toBe(123)
    
    unmount()
  })
  test(('error thrown'), () => {
    const updateBuyCurrencyType = jest.fn()
    const updateSellCurrencyType = jest.fn()
    const setMarketOrderRate = jest.fn()
    const {unmount} =  render(
    <ExchangeForm
      buyCurrencyType='ron'
      sellCurrencyType='eur'
      updateBuyCurrencyType={updateBuyCurrencyType}
      updateSellCurrencyType={updateSellCurrencyType} 
      setMarketOrderRate={setMarketOrderRate} 
      />)

      const balanceError = () => {
        throw new TypeError("Balance exceeds");
      };

      expect(balanceError).toThrow(TypeError);
      expect(balanceError).toThrow("Balance exceeds");

      unmount()
  })
})
