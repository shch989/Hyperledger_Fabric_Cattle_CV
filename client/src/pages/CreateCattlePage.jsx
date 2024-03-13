import React, { useState } from 'react';
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

const CreateCattlePage = () => {
  const [cattleId, setCattleId] = useState('');
  const [userId, setUserId] = useState('');
  const [residence, setResidence] = useState('');
  const [birth, setBirth] = useState('');
  const [fatherId, setFatherId] = useState('')
  const [motherId, setMotherId] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axios.post('http://localhost:5000/cattle', {
        cattleId,
        userId,
        residence,
        birth,
        parentId: {
          fatherId,
          motherId
        }
      });

      console.log('신규 가축 등록 성공!');
      setCattleId('')
      setUserId('')
      setResidence('')
      setBirth('')
      setFatherId('')
      setMotherId('')
    } catch (error) {
      console.log('신규 가축 등록 실패!');
    }
  };

  return (
    <Wrapper>
      <Navbar />
      <FormWrapper>
        <Title>가축 등록</Title>
        <form onSubmit={handleSubmit}>
          <Input
            label="가축 ID"
            type="text"
            value={cattleId}
            onChange={(e) => setCattleId(e.target.value)}
          />
          <Input
            label="소유자"
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
          />
          <Input
            label="거주지"
            type="text"
            value={residence}
            onChange={(e) => setResidence(e.target.value)}
          />
          <Input
            label="출산일"
            type="date"
            value={birth}
            onChange={(e) => setBirth(e.target.value)}
          />
          <Input
            label="부모개체 ID (부)"
            type="text"
            value={fatherId}
            onChange={(e) => setFatherId(e.target.value)}
          />
          <Input
            label="부모개체 ID (모)"
            type="text"
            value={motherId}
            onChange={(e) => setMotherId(e.target.value)}
          />
          <Button type="submit">가축 등록</Button>
        </form>
      </FormWrapper>
    </Wrapper>
  );
}

export default CreateCattlePage
