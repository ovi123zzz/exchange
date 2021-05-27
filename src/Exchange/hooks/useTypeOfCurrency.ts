import {useState} from 'react'


interface HookResult {
  sellCurrencyType: string,
  buyCurrencyType: string,
  updateSellCurrencyType: (type: string) => void
  updateBuyCurrencyType: (type: string) => void

}
export const useTypeOfCurrency = (): HookResult => {
  const [sellCurrencyType, setSellCurrencyType] = useState<string>('RON')
  const [buyCurrencyType, setBuyCurrencyType] = useState<string>('EUR')

  const updateSellCurrencyType = (type: string):void => {
    setSellCurrencyType(type)
  }
  const updateBuyCurrencyType = (type:string): void => {
    setBuyCurrencyType(type)
  }
  return {
    sellCurrencyType,
    buyCurrencyType,
    updateSellCurrencyType,
    updateBuyCurrencyType
  }
}
