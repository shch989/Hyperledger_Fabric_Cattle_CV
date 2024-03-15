import React, { useState, useEffect, Fragment } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import UserCattleCard from '../components/UI/UserCattleCard';
import MainBackground from '../components/UI/MainBackground';
import MainTitle from '../components/common/Main/MainTitle';
import Navbar from '../components/common/NavBar/NavBar';
import { useNavigate } from 'react-router-dom';

const StyledGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
  max-height: 1000px; 
  overflow: auto; 
`;

const StyledLinkTag = styled.a`
  color: #111;
  text-decoration: none;
`

const MainTitleStyle = styled.div`
  margin-top: 20px;
`;

const QueryAllCattlePage = () => {
  const [cattleData, setCattleData] = useState([]);
  const navigate = useNavigate();
  const breederData = sessionStorage.getItem('breeder');

  useEffect(() => {
    if (!breederData) {
      navigate("/user-login");
      return;
    }

    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/cattle/${breederData}/all-cattles`);
        const responseData = response.data.data.message;
        setCattleData(responseData);
        console.log('가축정보 출력 완료!');
      } catch (error) {
        console.log('가축정보 출력 실패!');
      }
    };

    fetchData();
  }, [breederData, navigate]);

  console.log(cattleData);

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
              <StyledLinkTag href={`cattle-family-tree/${cattle.cattleId}`}><UserCattleCard key={cattle.cattleId} cattle={cattle} /></StyledLinkTag>
            ))}
          </StyledGrid>
        )}
      </MainBackground>
    </Fragment>
  );
};

export default QueryAllCattlePage;