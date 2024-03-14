import styled from 'styled-components';
import Navbar from '../components/common/NavBar/NavBar';
import MainBackground from '../components/UI/MainBackground';
import CattleTreeSample from '../components/UI/CattleTreeSample';
import MainTitle from '../components/common/Main/MainTitle';

const MainTitleStyle = styled.div`
  margin-top: 20px;
`;

const CattleTreePage = () => {

  return (
    <>
      <Navbar />
      <MainBackground>
        <MainTitleStyle>
          <MainTitle>가축 혈통 정보</MainTitle>
        </MainTitleStyle>
        <CattleTreeSample cattleId={"C105"}/>
      </MainBackground>
    </>
  );
}

export default CattleTreePage;