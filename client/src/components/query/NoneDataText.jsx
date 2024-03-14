import React from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 32vh;
`

const Text1 = styled.p`
  font-size: 30px;
  color: #0f0f0f;
  font-weight: bold;
`;

const NoneDataText = () => {
  return (
    <Container>
      <Text1>검색하고자 하는 개체의 아이디를 입력하시오. </Text1>
    </Container>
  )
}

export default NoneDataText