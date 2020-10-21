import React from 'react'
import { Link } from 'react-router-dom'
import { HashLink } from 'react-router-hash-link'
import styled, { css } from 'styled-components'

import { useRoot } from '../../contexts/RootContext'

const Header = styled.header`
  display: flex;
  background: #fff;
  z-index: 999;
  justify-content: space-between;
  align-items: center;
  /* box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.05); */
  padding: 0 2rem;

  @media screen and (min-width: 1000px) {
    padding: 0 calc((100vw - 1000px + 2rem) / 2);
  }
`

const Nav = styled.nav`
  display: flex;
`

const Logo = styled(Link)`
  padding: 1rem 0;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary-color);
  text-decoration: none;
  display: flex;
  flex-direction: column;

  div {
    margin-bottom: 0;
    padding: 0;
    font-family: 'Futura Bold';
  }

  span {
    font-size: 0.85rem;
    color: #333;
    font-weight: 400;
  }
`

const StyledLink = css`
  padding: 0.5rem 1rem;
  border-radius: 3px;
  font-weight: 600;
  font-size: 0.95rem;
  margin: 0.4rem;
  transition: background 800ms ease;
  background: var(--primary-color);
  color: #fff;
  cursor: pointer;
  text-decoration: none;

  :hover {
    color: #fff;
    background: var(--secondary-color);
  }

  :last-child {
    margin-right: 0;
  }

  &.hiddenOnSmall {
    @media screen and (max-width: 768px) {
      display: none;
    }
  }
`

const NavLink = styled(Link)`
  ${StyledLink}
`
const NavHashLink = styled(HashLink)`
  ${StyledLink}
`

const HeaderComponent = () => {
  const { isLoggedIn, defaultAddress } = useRoot()

  return (
    <Header>
      <Logo to="/">
        <div>VeriPay</div>
        <span>Deposit, borrow, get insurance</span>
      </Logo>

      <Nav>
        <NavHashLink smooth to="/#marketplace">
          Marketplace
        </NavHashLink>
        <NavLink to="/connect-wallet" className="hiddenOnSmall">
          {isLoggedIn()
            ? `Connected ${defaultAddress.substring(0, 6)}...`
            : 'Connect Wallet'}
        </NavLink>
      </Nav>
    </Header>
  )
}

export default HeaderComponent
