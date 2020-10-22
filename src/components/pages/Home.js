import React from 'react'
import { HashLink } from 'react-router-hash-link'
import styled from 'styled-components'
import { Image, Row, Col, Typography } from 'antd'
import { PlayCircleOutlined } from '@ant-design/icons'
import Tabs from '../custom/Tabs'

const { Title, Paragraph } = Typography

const PrimaryTitle = styled.span`
  color: var(--primary-color);
  font-weight: 700;
`

const ButtonsGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`

const FancyButton = styled(HashLink)`
  padding: 0.3rem 1.4rem;
  font-size: 0.9rem;
  background: var(--primary-color);
  border-radius: 20px;
  color: #fff;
  font-weight: 600;

  &:hover {
    background: var(--secondary-color);
    color: #fff;
  }
`

const VideoLink = styled.span`
  font-size: 0.9rem;
  display: flex;
  margin-right: 2rem;
  align-items: center;

  .icon {
    margin-right: 0.6rem;
    font-size: 1.4rem;
  }

  a {
    font-weight: 600;
  }
`

const FrontImage = styled.img`
  width: 380px;
  display: block;
  margin: 0 auto;

  @media screen and (max-width: 768px) {
    margin-top: 0;
    display: none;
  }
`

const FooterImage = styled.img`
  width: 300px;
  display: block;
  margin: 0 auto;
  margin-top: -2rem;

  @media screen and (max-width: 768px) {
    margin-top: 0;
  }
`

const HandImage = styled.img`
  margin-left: 2.2rem;
  width: 200px;

  @media screen and (max-width: 768px) {
    display: block;
    margin: 0 auto;
  }
`

const Home = () => {
  return (
    <>
      {/* <Row gutter={48}>
        <Col span={24} md={14} style={{ marginTop: '1rem' }}>
          <Title>
            The Place where even your mom can start to earn with crypto
          </Title>
          <Paragraph>
            A trusted, decentralized place where you can start investing your
            crypto-assets in one click, using different profit strategies
            (VeriPays), uploaded by trusted developers.
          </Paragraph>
          <ButtonsGroup>
            <VideoLink>
              <PlayCircleOutlined className="icon" />
              <a href="/">Watch video</a>
            </VideoLink>

            <FancyButton smooth to="/#marketplace">
              Go to Marketplace
            </FancyButton>
          </ButtonsGroup>
          <HandImage src="/images/e2.svg" alt="Grow here" height="200px" />
        </Col>
        <Col span={24} md={10}>
          <BloomQR/>
        </Col>
      </Row> */}

      {/* <Title level={2} style={{ textAlign: 'center', margin: '2rem 0 4rem 0' }}>
        Why <PrimaryTitle>VeriPay</PrimaryTitle>?
      </Title>
      <Row gutter={48} style={{ marginBottom: '4rem' }}>
        <Col span={24} md={8}>
          <Image
            alt="1-click"
            src="/images/j1.svg"
            style={{ display: 'block' }}
            height="200px"
            className="fImage"
          />
          <Title level={3} style={{ textAlign: 'center', fontSize: '1.1rem' }}>
            Invest in 1-click
          </Title>
          <Paragraph style={{ textAlign: 'center' }}>
            Today it is really complicated to make an investment in crypto, We
            developed a platform where you can do it in 1-click.
          </Paragraph>
        </Col>
        <Col span={24} md={8}>
          <Image
            alt="One place"
            src="/images/j3.svg"
            style={{ display: 'block' }}
            height="200px"
            className="fImage"
          />
          <Title level={3} style={{ textAlign: 'center', fontSize: '1.1rem' }}>
            One place all flows
          </Title>
          <Paragraph style={{ textAlign: 'center' }}>
            Our platform allows you to have one entrance to all possible
            investment products.
          </Paragraph>
        </Col>
        <Col span={24} md={8}>
          <Image
            alt="Casual users"
            src="/images/j4.svg"
            style={{ display: 'block' }}
            height="200px"
            className="fImage"
          />
          <Title level={3} style={{ textAlign: 'center', fontSize: '1.1rem' }}>
            Place for casual users
          </Title>
          <Paragraph style={{ textAlign: 'center' }}>
            Our team developed a platform for casual users, not for
            crypto-enthusiasts. That's why even your mom can invest easily.
          </Paragraph>
        </Col>
      </Row> */}

      <Tabs />

      <Title level={2} style={{ textAlign: 'center', margin: '2rem 0 4rem 0' }}>
        How does it work?
        <VideoLink style={{ textAlign: 'center', display: 'block' }}>
          <PlayCircleOutlined className="icon" />
          <a href="/">Watch video</a>
        </VideoLink>
      </Title>

      {/* <Row>
        <Col span={24} sm={12} md={6}>
          <Image
            src="/images/j5.svg"
            style={{ display: 'block' }}
            height="200px"
            className="fImage"
          />
          <Paragraph style={{ textAlign: 'center' }}>Connect Wallet</Paragraph>
        </Col>
        <Col span={24} sm={12} md={6}>
          <Image
            src="/images/j2.svg"
            style={{ display: 'block' }}
            height="200px"
            className="fImage"
          />
          <Paragraph style={{ textAlign: 'center' }}>
            Choose VeriPay
          </Paragraph>
        </Col>
        <Col span={24} sm={12} md={6}>
          <Image
            src="/images/e2.svg"
            style={{ display: 'block' }}
            height="200px"
            className="fImage"
          />
          <Paragraph style={{ textAlign: 'center' }}>Deposit Crypto</Paragraph>
        </Col>
        <Col span={24} sm={12} md={6}>
          <Image
            src="/images/j6.svg"
            style={{ display: 'block' }}
            height="200px"
            className="fImage"
          />
          <Paragraph style={{ textAlign: 'center' }}>
            Earn and Withdraw
          </Paragraph>
        </Col>
      </Row> */}

      <Row
        style={{
          padding: '4rem 4rem 0rem 4rem',
          background: '#fafafa',
          marginTop: '2rem',
        }}
      >
        <Col spn={24} md={12}>
          <Title level={3}>
            Do business globally with&nbsp;
            <PrimaryTitle>TraFiGuard</PrimaryTitle>
          </Title>
          <Row style={{ margin: '1.2rem 0' }}>
            <Col span={8}>Open Finance</Col>
            <Col span={8}>Global Trading</Col>
            <Col span={8}>Borderless Payments</Col>
          </Row>
          <ButtonsGroup>
            <VideoLink>
              <PlayCircleOutlined className="icon" />
              <a href="/">Watch video</a>
            </VideoLink>

            <FancyButton smooth to="/#marketplace">
              Go to Marketplace
            </FancyButton>
          </ButtonsGroup>
        </Col>
        <Col spn={24} md={12}>
          <FooterImage src="/images/e3.jpeg" />
        </Col>
      </Row>
    </>
  )
}

export default Home
