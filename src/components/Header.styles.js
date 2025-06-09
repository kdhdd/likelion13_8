import styled from "styled-components";

export const HeaderWrapper = styled.header`
  padding: 20px 100px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Logo = styled.h1`
  color: #1c1c1c;
  text-align: center;
  font-size: 48px;
  font-style: normal;
  font-weight: 700;
  text-decoration: none;
`;

export const Nav = styled.nav`
  display: flex;
  gap: 20px;
`;

export const NavItem = styled.div`
  font-size: 20px;
  color: inherit;
  font-weight: 500;
  cursor: pointer;
  text-decoration: none;

  &.active {
    color: black;
    font-weight: bold;
    border-bottom: 2px solid black;
  }
`;
