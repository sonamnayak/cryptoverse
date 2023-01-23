import { Layout, Space, Typography } from 'antd';
import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import './App.css'
import { Navbar, Exchanges, Cryptocurrencies, Cryptodetails, News, Home } from './components'

const App = () => {
  return (
    <div className="app">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="main">
        <Layout>
          <div className="routes">
            <Routes>
              <Route exact path='/' element={<Home />} />
              <Route path='/cryptocurrencies' element={<Cryptocurrencies />} />
              <Route path='/crypto/:coinId' element={<Cryptodetails />} />
              {/* <Route path='/exchanges' element={<Exchanges />} /> */}
              <Route path='/news' element={<News />} />
            </Routes>
          </div>
        </Layout>
        <div className="footer">
          <Typography.Title level={5} style={{color: 'white', textAlign: 'center'}} >
            Cryptoverse <br />
            All Rights Reserved <br />
          </Typography.Title>
          <Space>
            <Link to='/' >Home</Link>
            <Link to='/cryptocurrencies' >Cryptocurrencies</Link>
            {/* <Link to='/exchanges' >Exchanges</Link> */}
            <Link to='/news' >News</Link>
          </Space>
        </div>
      </div>
    </div>
  )
}

export default App