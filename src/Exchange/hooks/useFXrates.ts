
interface Query {
  from: string
  to: string
  amount: number
}
interface Info {
  timestamp: number
  rate: number
}
interface FxAPIresult {
  success:boolean 
  query:Query
  info:Info
  date: string
  result: number
}
interface Rates {
  USD: number,
  EUR: number,
  GBP: number,
  RON: number
}
interface MarketRates {
  success: boolean
  timestamp: number
  base: string
  date: string
  rates: Rates
}
interface UseFxHookResult {
  getConvertedRates(from: string, to: string, fxValue: string | number):Promise<FxAPIresult>
  getMarketRate(baseValue: string, toValue: string): Promise<MarketRates>
}
export const useFXrates = ():UseFxHookResult => {
  const getConvertedRates = async (from: string, to: string, fxValue: string | number) => {
    const response = await fetch(`https://data.fixer.io/api/convert?access_key=18013dc98f11d0114ef627dc116928e2&from=${from}&to=${to}&amount=${fxValue ? fxValue : 1}`)
    const rates = await response.json()
    return rates
  } 
  const getMarketRate = async (baseValue:string, toValue:string) => {
    const response = await fetch(`https://data.fixer.io/api/latest?access_key=18013dc98f11d0114ef627dc116928e2&base=${baseValue}&symbols=${toValue}`)
    const marketRate = await response.json()
    return marketRate
  }

  
  return {
    getConvertedRates,
    getMarketRate
  }
}
