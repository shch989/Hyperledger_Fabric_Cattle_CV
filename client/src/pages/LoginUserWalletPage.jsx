import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import { Link } from 'react-router-dom'

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

const LoginUserWalletPage = () => {
  const [userId, setUserId] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const breeder = await axios.get(`http://localhost:5000/user/login/${userId}`);
      const breederId = breeder.data.data
      sessionStorage.setItem('breeder', breederId);
      console.log('로그인 완료!');
      setUserId('')
    } catch (error) {
      console.log('로그인 실패!');
    }
  };

  return (
    <Wrapper>
      <Navbar/>
      <FormWrapper>
        <Title>유저 로그인</Title>
        <form onSubmit={handleSubmit}>
          <Input
            label="아이디"
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
          <Button type="submit">로그인</Button>
          <Text>
            지갑이 없으신가요? <Link to="/user-register">유저 지갑 생성</Link>
          </Text>
        </form>
      </FormWrapper>
    </Wrapper>
  )
}

export default LoginUserWalletPage
