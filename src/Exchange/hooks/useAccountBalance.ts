import { useState  } from 'react'

const defaultBalance = [
{type: 'RON', value: 123.56},
{type: 'EUR', value: 3.44},
{type: 'USD', value: 0},
{type: 'GBP', value: 44},
]
 

interface Balance {
  type: string,
  value: number
}
interface HookResult {
  updateSellBalance: (currencyToUpdate: string, value: string, action: string) => void
  getCurrentBalance: (selectedValue: string) => void
  balanceValue(value: string | undefined | number): string
}
export const useAccountBalance = ():HookResult => {
  const [balance, setBalance] = useState<Balance[] | undefined>(defaultBalance)
  const [currentBalance, setCurrentBalance ] = useState<number>(0)
  const getCurrentBalance = (selectedValue: string) => {
    balance?.forEach(el => {
      if (el.type === selectedValue) {
        setCurrentBalance(el.value)
      }
    })
  }

  const updateSellBalance = (currencyToUpdate: string, value: string, action: string) => {
    for (let i in balance) {
      if (balance[i].type === currencyToUpdate && action === 'sell') {
        balance[i].value = balance[i].value - parseFloat(value);
         break; 
      }
      if (balance[i].type === currencyToUpdate && action === 'buy') {
        balance[i].value = balance[i].value + parseFloat(value);
         break; 
      }
    }
    setBalance(balance)
   } 

   const balanceValue = (value: string):any => {
    const item = balance?.find(el => el.type === value)
    return item?.value.toFixed(2)
  }
   
  

  return { updateSellBalance, getCurrentBalance, balanceValue}
}
