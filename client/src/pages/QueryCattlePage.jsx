import React, { useState, useEffect, Fragment } from 'react';
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components';
import axios from 'axios';
import MainBackground from '../components/UI/MainBackground';
import MainTitle from '../components/common/Main/MainTitle';
import Navbar from '../components/common/NavBar/NavBar';
import UserCattleCard from '../components/UI/UserCattleCard';
import Input from '../components/UI/Input';
import Button from '../components/UI/Button';
import NoneData from '../components/query/NoneData';

const MainTitleStyle = styled.div`
  margin-top: 20px;
`;

const StyledDiv = styled.div`
  display: flex;
  flex-direction: row;
  width: 80%;
  margin-top: 30px;
  margin-left: 15px;
`;

const QueryCattlePage = () => {
  const navigate = useNavigate();

  const [cattleId, setCattleId] = useState('');
  const [cattleData, setCattleData] = useState({});
  const [searching, setSearching] = useState(false);

  const breederData = sessionStorage.getItem('breeder')

  useEffect(() => {
    if (!breederData) {
      navigate("/user-login");
      return;
    }
  
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/cattle/user2/${cattleId}`);
        const responseData = response.data.data.message;
        console.log(responseData)
        setCattleData(responseData);
        console.log('가축정보 출력 완료!');
        setSearching(false);
      } catch (error) {
        console.log('가축정보 출력 실패!');
        setSearching(false);
      }
    };

    if (searching && cattleId.trim() !== '') {
      fetchData();
    }
  }, [breederData, searching, cattleId]);

  const handleSearch = () => {
    setSearching(true);
  };

  return (
    <Fragment>
      <Navbar />
      <MainBackground>
        <MainTitleStyle>
          <MainTitle>가축 검색</MainTitle>
        </MainTitleStyle>
        <StyledDiv>
          <Input type="text" value={cattleId} onChange={(e) => setCattleId(e.target.value)} />
          <Button onClick={handleSearch}>검색</Button>
        </StyledDiv>
        {cattleData ? <UserCattleCard cattle={cattleData} /> : <NoneData />}
      </MainBackground>
    </Fragment>
  );
};

export default QueryCattlePage;