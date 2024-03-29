import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  width: 10%;
  height: 40px;
  color: #fff;
  border: none;
  box-sizing: border-box;
  font-size: 16px;
  letter-spacing: 1px;
  text-align: center;
  font-weight: 600;
  border-radius: 4px;
  background-color: #008080;
  margin-left: 5px;

  &:focus {
    outline: none;
  }
`;

const Button = (props) => {
  const { type, children, onClick } = props;

  return (
    <StyledButton type={type} onClick={onClick}>
      {children}
    </StyledButton>
  );
};

export default Button;