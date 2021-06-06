import {useState} from 'react'
import { Select, Button, Form, InputNumber } from 'antd';
import styled from 'styled-components'
import { useFXrates } from './hooks/useFXrates';
import { useAccountBalance } from './hooks/useAccountBalance'

const { Option } = Select;
const ExchangeInputWrapper = styled.div`
    display: flex;
    background-color: #2c2828;
    border-radius: 5px;
    margin: 10px 0;
    padding: 5px;
    width: 100%;
    justify-content: space-between;
    .ant-input-number-input {
      background-color: #2b2828
    }
    .ant-row.ant-form-item.ant-form-item-with-help.ant-form-item-has-error {
      margin-bottom: 0;
      margin-right: 16px;
    }
    .ant-row.ant-form-item.ant-form-item-with-help.ant-form-item-has-success {
      margin-bottom: 0;
      margin-right: 16px;

    }
    .ant-row.ant-form-item.ant-form-item-has-success {
      margin-bottom: 0;
    }
    .ant-form-item .ant-input-number-handler-wrap {
      z-index: 2;
      display: none;
  }
    
  .ant-select-arrow {
    color: #fff;
  }
}
`
const ExchangeValueSelect = styled.div`
  display: flex;
  flex-direction: column;
  > span {
    width: 140px;
    color: #fff;
  }
  .ant-select:not(.ant-select-customize-input) .ant-select-selector {
    padding-left: 0;
  }
 
`
interface ExchangeFormProps {
  buyCurrencyType: string
  sellCurrencyType: string
  updateSellCurrencyType: (value: string) => void
  updateBuyCurrencyType: (value: string) => void
  setMarketOrderRate: (value: number) => void
}
export const ExchangeForm: React.FC<ExchangeFormProps> = ({
  buyCurrencyType,
  sellCurrencyType,
  updateSellCurrencyType,
  setMarketOrderRate,
  updateBuyCurrencyType,
   }) => {
  const [form] = Form.useForm();

  const { getConvertedRates, getMarketRate } = useFXrates()  
  const { updateSellBalance, balanceValue } = useAccountBalance()
  const [isDisabled, setIsDisabled] = useState(true)


  const onFinish = (values) => {
    form.setFieldsValue({ buy: 0, sell: 0 })
    updateSellBalance(sellCurrencyType, values.sell, 'sell')
    updateSellBalance(buyCurrencyType, values.buy, 'buy')
   
    setIsDisabled(true)

  };

  const validateMessages = async (value: number, sellOrBuyType: string) => {
   
    const currentBalance = balanceValue(sellOrBuyType)
    if (currentBalance) {
     
      const balanceCheck = parseFloat(currentBalance) - value
      if (balanceCheck < 0) {
        return Promise.reject(new Error('Balance exceeds'));
      }
    }
  }

  const onChangeSellCurrency = async (valueSelected: string) => {
    updateSellCurrencyType(valueSelected)
    const response = await getMarketRate(valueSelected, buyCurrencyType)
    setMarketOrderRate(response.rates[buyCurrencyType])
    form.setFieldsValue({ buy: 0, sell: 0 })
  }

  const onChangeBuyCurrency = async (valueSelected:string) => {
    updateBuyCurrencyType(valueSelected)
    const response = await getMarketRate(sellCurrencyType, valueSelected)
    setMarketOrderRate(response.rates[valueSelected])
    form.setFieldsValue({ buy: 0, sell: 0 })
  }

  const onChangeSellInput = async (value: number) => {
    if (value > 0) {
      const convertedRate = await getConvertedRates(sellCurrencyType, buyCurrencyType, value)
      form.setFieldsValue({ buy: (convertedRate.result).toFixed(2) })
      setIsDisabled(false)
    } else {
      setIsDisabled(true)
      form.setFieldsValue({ buy: 0 })
    }
  }

  const onChangeBuyInput = async (value: number) => {
    if (value > 0) {
      const convertedRate = await getConvertedRates(buyCurrencyType, sellCurrencyType, value)
      form.setFieldsValue({ sell: (convertedRate.result).toFixed(2) })
      setIsDisabled(false)
    } else {
      setIsDisabled(true)
      form.setFieldsValue({ sell: 0 })
    }
  }

  return (
    <>
      <Form
        name="exchange_form"
        layout="inline"
        form={form}
        onFinish={onFinish}
        data-testid='form'
      >
        <ExchangeInputWrapper>
          <ExchangeValueSelect>
            <Form.Item>
              <Select defaultValue="RON" style={{ width: 80, color: '#fff' }} bordered={false} onChange={onChangeSellCurrency}>
                <Option value="RON">RON</Option>
                <Option value="EUR">EUR</Option>
                <Option value="GBP">GBP</Option>
                <Option value="USD">USD</Option>
              </Select>

            </Form.Item>

            <span data-testid='buy-balance'>Balance: {balanceValue(sellCurrencyType)} {sellCurrencyType}</span>
          </ExchangeValueSelect>
          <Form.Item
            name="sell"
            label=''
            initialValue={0}
            data-testid='sell'
            rules={[
              { pattern: /^\d+(\.\d{1,2})?$/, message: '2 digits only' },
              {
                validator: async (_, value) => {
                  await validateMessages(value, sellCurrencyType)
                }
              },
            ]}

          >
            <InputNumber
              bordered={false}
              style={{
                width: 100,
                color: '#fff'
              }}
              placeholder='0'
              onChange={onChangeSellInput}
            />

          </Form.Item>

        </ExchangeInputWrapper>
        <ExchangeInputWrapper>
          <ExchangeValueSelect>
            <Form.Item>
              <Select defaultValue="EUR" style={{ width: 80, color: '#fff' }} bordered={false} onChange={onChangeBuyCurrency}>
                <Option value="RON">RON</Option>
                <Option value="EUR">EUR</Option>
                <Option value="GBP">GBP</Option>
                <Option value="USD">USD</Option>
              </Select>
            </Form.Item>
            <span data-testid='sell-balance'>Balance: {balanceValue(buyCurrencyType)} {buyCurrencyType}</span>
          </ExchangeValueSelect>
          <Form.Item
            name="buy"
            label=""
            initialValue={0}
            data-testid='buy'
            rules={[
              { pattern: /^\d+(\.\d{1,2})?$/, message: '2 digits only' },
            ]}
          >
            <InputNumber
              bordered={false}
              placeholder='0'
              style={{
                width: 100,
                color: '#fff'
              }}
              onChange={onChangeBuyInput}
            />
          </Form.Item>

        </ExchangeInputWrapper>
        <Form.Item style={{margin: '50px auto'}}>
          <Button type="primary" htmlType="submit" disabled={isDisabled } >
            Sell {sellCurrencyType} for {buyCurrencyType}
          </Button>
        </Form.Item>
      </Form>
    </>
  )
}
