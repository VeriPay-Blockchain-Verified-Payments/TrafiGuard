import React from 'react'
import styled from 'styled-components'

const Footer = styled.footer`
  background-color: #343a40;
  color: #fff;
  padding: 3rem 2rem;

  @media screen and (min-width: 1000px) {
    padding: 1rem calc((100vw - 1000px + 2rem) / 2);
  }
`

const FooterComponent = () => (
  <Footer>
    <div>Copyright 2020</div>
  </Footer>
)

export default FooterComponent
