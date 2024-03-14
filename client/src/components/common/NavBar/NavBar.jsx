import React from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

const MenuItem = styled.li.attrs((props) => ({
  isActive: props.isActive,
}))`
  margin-left: 1rem;
  a {
    display: inline-block;
    padding: 0.5rem;
    font-size: 25px;
    font-weight: 600;
    color: ${(props) => (props.isActive ? '#000' : '#a2a2a2')};
    text-decoration: none;
    transition: all 0.2s;
    &:hover {
      color: #000;
    }
  }
`;

MenuItem.shouldForwardProp = (prop) => prop !== 'isActive';

const Container = styled.nav`
  position: fixed;
  top: 0;
  width: 100%;
  background-color: #fff;
  z-index: 100;
  height: 80px;
  padding: 5px 0;
`;

const MainNav = styled.div`
  display: flex;
  align-items: center;
  color: #fff;
  width: 70%;
  max-width: 1200px;
  margin: 0 auto;
`;

const Menu = styled.ul`
  display: flex;
  list-style-type: none;
  padding-left: 0;
  margin: 0;
  margin-right: auto;
`;

const Navbar = () => {
  const { pathname } = useLocation();
  // 테스트용
  return (
    <Container>
      <MainNav>
        <Menu>
          <MenuItem isActive={pathname === '/'}>
            <a href="/">관리자 생성</a>
          </MenuItem>
          <MenuItem isActive={pathname === '/user-login'}>
            <a href="/user-login">사용자 생성</a>
          </MenuItem>
          <MenuItem isActive={pathname === '/add-cattle'}>
            <a href="/add-cattle">가축 등록</a>
          </MenuItem>
          <MenuItem isActive={pathname === '/query-all-cattle'}>
            <a href="/query-all-cattle">가축 리스트</a>
          </MenuItem>
          <MenuItem isActive={pathname === '/query-cattle'}>
            <a href="/query-cattle">가축 검색</a>
          </MenuItem>
          <MenuItem isActive={pathname === '/cattle-family-tree'}>
          <a href="/cattle-family-tree">혈통 정보</a>
        </MenuItem>
        </Menu>
      </MainNav>
    </Container>
  );
};

export default Navbar;