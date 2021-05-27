import React, { FC } from 'react'
import { Button } from 'antd'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
const MessageWrapper = styled.div`
    width: 500px;
    height: 200px;
    background-color: #001B2E;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    color: #fff;
    span {
      font-size: 20px;
      font-weight: bold;
    }
`
export const ExchangeMain: FC = () => {
  return (
    <MessageWrapper>
      <span>Welcome, please proceed to exchange!</span>
      <Button type='primary'>
        <Link to="/exchange">Exchange</Link>
      </Button>
    </MessageWrapper>
  )
}
