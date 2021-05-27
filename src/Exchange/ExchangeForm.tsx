import { Select, Button, Form, InputNumber } from 'antd';
import styled from 'styled-components'
import { useFXrates } from './hooks/useFXrates';

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

export const ExchangeForm = ({ form,
  onFinish,
  buyCurrencyType,
  sellCurrencyType,
  getCurrentBalance,
  updateSellCurrencyType,
  setMarketOrderRate,
  validateMessages,
  updateBuyCurrencyType,
  isDisabled,
  setIsDisabled,
  balanceValue }) => {
  const { getConvertedRates, getMarketRate } = useFXrates()  
  return (
    <>
      <Form
        name="exchange_form"
        layout="inline"
        form={form}
        onFinish={onFinish}
      >
        <ExchangeInputWrapper>
          <ExchangeValueSelect>
            <Form.Item>
              <Select defaultValue="RON" style={{ width: 80, color: '#fff' }} bordered={false} onChange={async (valueSelected) => {
                getCurrentBalance(valueSelected)
                updateSellCurrencyType(valueSelected)
                const response = await getMarketRate(valueSelected, buyCurrencyType)
                setMarketOrderRate(response.rates[buyCurrencyType])
                form.setFieldsValue({ buy: 0, sell: 0 })
              }}>
                <Option value="RON">RON</Option>
                <Option value="EUR">EUR</Option>
                <Option value="GBP">GBP</Option>
                <Option value="USD">USD</Option>
              </Select>

            </Form.Item>


            <span>Balance: {balanceValue(sellCurrencyType)} {sellCurrencyType}</span>
          </ExchangeValueSelect>
          <Form.Item
            name="sell"
            label=''
            initialValue={0}
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
              onChange={async (value) => {
                if (value > 0) {
                  const convertedRate = await getConvertedRates(sellCurrencyType, buyCurrencyType, value)
                  form.setFieldsValue({ buy: (convertedRate.result).toFixed(2) })
                  setIsDisabled(false)
                } else {
                  setIsDisabled(true)
                  form.setFieldsValue({ buy: 0 })
                }
                
              }}
            />

          </Form.Item>

        </ExchangeInputWrapper>
        <ExchangeInputWrapper>
          <ExchangeValueSelect>
            <Form.Item>
              <Select defaultValue="EUR" style={{ width: 80, color: '#fff' }} bordered={false} onChange={async (valueSelected) => {
               
                getCurrentBalance(valueSelected)
                updateBuyCurrencyType(valueSelected)
                const response = await getMarketRate(sellCurrencyType, valueSelected)
                setMarketOrderRate(response.rates[valueSelected])
                form.setFieldsValue({ buy: 0, sell: 0 })
              }}>
                <Option value="RON">RON</Option>
                <Option value="EUR">EUR</Option>
                <Option value="GBP">GBP</Option>
                <Option value="USD">USD</Option>
              </Select>
            </Form.Item>
            <span>Balance: {balanceValue(buyCurrencyType)} {buyCurrencyType}</span>
          </ExchangeValueSelect>
          <Form.Item
            name="buy"
            label=""
            initialValue={0}
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
             
              onChange={async (value) => {
                if (value > 0) {
                  const convertedRate = await getConvertedRates(buyCurrencyType, sellCurrencyType, value)
                  form.setFieldsValue({ sell: (convertedRate.result).toFixed(2) })
                  setIsDisabled(false)
                } else {
                  setIsDisabled(true)
                  form.setFieldsValue({ sell: 0 })
                }
              }}
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
