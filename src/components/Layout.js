import React from 'react'
import styled from 'styled-components'
import Header from './layout/Header'
import Footer from './layout/Footer'

const Main = styled.main`
  padding: 3rem 2rem;

  @media screen and (min-width: 1000px) {
    padding: 3rem calc((100vw - 1000px + 2rem) / 2);
  }
`

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <Main>{children}</Main>
      <Footer />
    </>
  )
}

export default Layout
