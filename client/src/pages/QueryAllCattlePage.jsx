import React, { useState, useEffect, Fragment } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import UserCattleCard from '../components/UI/UserCattleCard';
import MainBackground from '../components/UI/MainBackground';
import MainTitle from '../components/common/Main/MainTitle';
import Navbar from '../components/common/NavBar/NavBar';

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  max-height: 1000px; 
  overflow: auto; 
`;

const MainTitleStyle = styled.div`
  margin-top: 20px;
`;

const QueryAllCattlePage = () => {
  const [cattleData, setCattleData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/cattle/user2/all-cattles');
        const responseData = response.data.data.message;
        setCattleData(responseData);
        console.log('가축정보 출력 완료!');
      } catch (error) {
        console.log('가축정보 출력 실패!');
      }
    };

    fetchData();
  }, []);

  console.log(cattleData)

  return (
    <Fragment>
      <Navbar />
      <MainBackground>
        <MainTitleStyle>
          <MainTitle>등록된 가축 리스트({cattleData.length})</MainTitle>
        </MainTitleStyle>
        {cattleData.length > 0 && (
          <StyledGrid>
            {cattleData.map((cattle) => (
              <UserCattleCard key={cattle.cattleId} cattle={cattle} />
            ))}
          </StyledGrid>
        )}
      </MainBackground>
    </Fragment>
  );
};

export default QueryAllCattlePage;