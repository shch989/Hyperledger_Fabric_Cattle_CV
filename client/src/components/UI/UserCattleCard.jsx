import React from 'react';
import styled from 'styled-components';

const StyledCard = styled.div`
  padding: 15px;
  margin: 20px 15px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background-color: ${props => props.isAlive ? 'transparent' : 'rgba(0, 0, 0, 0.2)'};
`;

/*
const SellCattleLink = styled.a`
  text-decoration: none; 
  font-weight: 600;
  color: #111;
  margin: 0 10px;  
`
*/

const UserCattleCard = (props) => {
  const { cattleId, userId, residence, birth, parentId } = props.cattle

  // parentId가 존재하지 않을 경우를 대비하여 기본값을 설정합니다.
  const dad = parentId ? (parentId.fatherId !== '' ? parentId.fatherId : 'N/A') : 'N/A';
  const mom = parentId ? (parentId.motherId !== '' ? parentId.motherId : 'N/A') : 'N/A';

  return (
    <StyledCard>
      <h2>가축 ID: {cattleId}</h2>
      <p>소유자 ID: {userId}</p>
      <p>서식지: {residence}</p>
      <p>출생일: {birth}</p>
      <p>부모개체 ID:  부: {dad}, 모: {mom} </p>
    </StyledCard>
  );
}

export default UserCattleCard;