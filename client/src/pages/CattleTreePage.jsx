import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import Navbar from '../components/common/NavBar/NavBar';
import MainBackground from '../components/UI/MainBackground';
import CattleTreeSample from '../components/UI/CattleTreeSample';
import MainTitle from '../components/common/Main/MainTitle';

const MainTitleStyle = styled.div`
  margin-top: 20px;
`;

const CattleTreePage = () => {
  const params = useParams();
  const [cattleData, setCattleData] = useState({});
  const [fatherData, setFatherData] = useState({});
  const [motherData, setMotherData] = useState({});

  console.log(params.cattleId)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/cattle/user2/${params.cattleId}`);
        const responseData = response.data.data.message;
        setCattleData(responseData);
        const fatherResponse = await axios.get(`http://localhost:5000/cattle/user2/${responseData.parentId.fatherId}`);
        const motherResponse = await axios.get(`http://localhost:5000/cattle/user2/${responseData.parentId.motherId}`);
        const fatherResponseData = fatherResponse.data.data.message;
        const motherResponseData = motherResponse.data.data.message;
        setFatherData(fatherResponseData)
        setMotherData(motherResponseData)
        console.log('가축정보 출력 완료!');
      } catch (error) {
        console.log('가축정보 출력 실패!');
      }
    };

    fetchData();
  }, []);


  return (
    <>
      <Navbar />
      <MainBackground>
        <MainTitleStyle>
          <MainTitle>가축 혈통 정보</MainTitle>
        </MainTitleStyle>
        <CattleTreeSample cattleData={cattleData} fatherData={fatherData} motherData={motherData} />
      </MainBackground>
    </>
  );
}

export default CattleTreePage;
