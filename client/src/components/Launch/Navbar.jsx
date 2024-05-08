import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
  width: 100vw;
  height: 70px;
  position: fixed;
  z-index: 99;
  background: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 50px 0 50px;
  box-sizing: border-box;
  border-bottom: 2px solid #217ec3;
`;

const ButtonContainer = styled.div`
  width: auto;
  height: auto;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
`;

const Button = styled.div`
  width: 120px;
  height: 30px;
  margin: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: "Roboto";
  font-size: 16px;
  transition: 0.2s all;
  border: 2px solid transparent;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    border: 2px solid #217ec3;
  }
`;

const Logo = styled.div`
  width: auto;
  height: auto;
  font-family: "Freeman";
  font-size: 20px;
  user-select: none;
`;

const Navbar = () => {
  return (
    <Container>
      <Logo>
        <Link to="/" style={{ textDecoration: "none", color: "#004990", fontWeight: "900", fontSize: "2.1em" }}>
          DeepKinZero
        </Link>
      </Logo>
      <ButtonContainer>
        <Link to="/about" style={{ textDecoration: "none", color: "#004990" }}>
          <Button>About</Button>
        </Link>
        <Link to="/" style={{ textDecoration: "none", color: "#004990" }}>
          <Button>Predict</Button>
        </Link>
      </ButtonContainer>
    </Container>
  );
};

export default Navbar;
