import React from 'react';
import styled from 'styled-components';
import { Tree, TreeNode } from 'react-organizational-chart';
import UserCattleCard from './UserCattleCard';

const StyledTreeContainer = styled.div`
  overflow-x: auto;
  padding: 30px;
`;

const StyledLinkTag = styled.a`
  color: #111;
  text-decoration: none;
`

const CattleTreeSample = (props) => {
  const {cattleData, fatherData, motherData} = props

  console.log('가축 데이터', cattleData)
  console.log('부친 데이터', fatherData)
  console.log('모친 데이터', motherData)

  return (
    <StyledTreeContainer>
      <Tree
        lineWidth={'2px'}
        lineColor={'green'}
        lineBorderRadius={'10px'}
        label={<StyledLinkTag href='/'><UserCattleCard cattle={cattleData}>Root</UserCattleCard></StyledLinkTag>}
      >
        <TreeNode label={<StyledLinkTag href={`/cattle-family-tree/${fatherData.cattleId}`}><UserCattleCard cattle={fatherData} /></StyledLinkTag>}></TreeNode>
        <TreeNode label={<StyledLinkTag href={`/cattle-family-tree/${motherData.cattleId}`}><UserCattleCard cattle={motherData} /></StyledLinkTag>}></TreeNode>
      </Tree>
    </StyledTreeContainer>
  )
}

export default CattleTreeSample