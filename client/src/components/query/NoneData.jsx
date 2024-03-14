import React from 'react'
import styled from 'styled-components'
import NoneDataText from './NoneDataText'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 20px 15px;
`

const DataBox = styled.div`
  width: 100%;
  height: 80vh;
  padding: 15px;
  border: 2px solid #0f0f0f;
  border-radius: 10px;
  background-color: #fff;
  border-style: dashed;
`

const NoneData = () => {
  return (
    <Container>
      <DataBox>
        <NoneDataText />
      </DataBox>
    </Container>
  )
}

export default NoneData
