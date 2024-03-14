import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { Tree, TreeNode } from 'react-organizational-chart';
import UserCattleCard from './UserCattleCard';

const StyledNode = styled.div`
  padding: 5px;
  border-radius: 8px;
  display: inline-block;
  border: 1px solid red;
`;

const StyledTreeContainer = styled.div`
  overflow-x: auto;
  padding: 30px;
`;

const CattleTreeSample = (props) => {
  const [cattleData, setCattleData] = useState({});
  const [fatherData, setFatherData] = useState({});
  const [motherData, setMotherData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/cattle/user2/${props.cattleId}`);
        const responseData = response.data.data.message;
        setCattleData(responseData);
        console.log('가축정보 출력 완료!');
      } catch (error) {
        console.log('가축정보 출력 실패!');
      }
    };

    const fatherData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/cattle/user2/C43`);
        const responseData = response.data.data.message;
        setFatherData(responseData);
        console.log('가축정보 출력 완료!');
      } catch (error) {
        console.log('가축정보 출력 실패!');
      }
    };

    const MotherData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/cattle/user2/C39`);
        const responseData = response.data.data.message;
        setMotherData(responseData);
        console.log('가축정보 출력 완료!');
      } catch (error) {
        console.log('가축정보 출력 실패!');
      }
    };

    fetchData();
    fatherData();
    MotherData();
  }, []);

  console.log(cattleData)

  return (
    <StyledTreeContainer>
      <Tree
        lineWidth={'2px'}
        lineColor={'green'}
        lineBorderRadius={'10px'}
        label={<UserCattleCard cattle={cattleData}>Root</UserCattleCard>}
      >
        <TreeNode label={<UserCattleCard cattle={fatherData} />}></TreeNode>
        <TreeNode label={<UserCattleCard cattle={motherData} />}></TreeNode>
      </Tree>
    </StyledTreeContainer>
  )
}

export default CattleTreeSample
