import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';
import styled from 'styled-components';

// Components
import Input from '../components/UI/Input';
import Navbar from '../components/common/NavBar/NavBar';

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #e0ffff;
`;

const FormWrapper = styled.div`
  flex: 2;
  max-width: 500px;
  width: 100%;
  padding: 40px;
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
`;

const Title = styled.h2`
  text-align: center;
  margin: 0;
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 20px;
`;

const Text = styled.span`
  display: block;
  margin-top: 20px;
  text-align: center;
  color: #333;

  &:hover {
    color: #4caf50;
  }
`;

const Button = styled.button`
  display: block;
  width: 100%;
  padding: 10px;
  margin-top: 20px;
  border: none;
  border-radius: 5px;
  background-color: #008080;
  color: #fff;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;

  &:hover {
    background-color: #056b93;
  }

  &:focus {
    outline: none;
  }
`;

const CreateUserWalletPage = () => {
  const [userId, setUserId] = useState('');
  const [affilication, setAffilication] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.post('http://localhost:5000/user', {
        userId,
        affilication,
      });
      console.log('유저 지갑 생성 완료!');
      setUserId('')
      setAffilication('')
    } catch (error) {
      console.log('유저 지갑 생성 실패!');
    }
  };

  return (
    <Wrapper>
      <Navbar/>
      <FormWrapper>
        <Title>유저 지갑 생성</Title>
        <form onSubmit={handleSubmit}>
          <Input
            label="아이디"
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
          <Input
            label="부서"
            type="select"
            value={affilication}
            onChange={(e) => setAffilication(e.target.value)}
          >
            <option value="">선택하세요</option>
            <option value="org1.department1">org1.department1</option>
            <option value="org1.department2">org1.department2</option>
          </Input>
          <Button type="submit">회원가입</Button>
          <Text>
            사용자가 아니신가요? <Link to="/">관리자 지갑 생성</Link>
          </Text>
        </form>
      </FormWrapper>
    </Wrapper>
  );
};

export default CreateUserWalletPage
