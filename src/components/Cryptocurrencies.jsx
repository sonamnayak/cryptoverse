import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Card, Row, Col, Input, Typography } from 'antd'
import { useGetCryptosQuery } from '../services/cryptoApi'
import millify from 'millify'
import Loader from './Loader'

const Cryptocurrencies = ({simplified}) => {
    const count = simplified ? 10 : 100
    const {data, isFetching} = useGetCryptosQuery(count)
    const [cryptos, setCryptos] = useState([])
    const [searchTerm, setSearchTerm] = useState('')
    useEffect(() => {
        const filteredData = data?.data?.coins.filter((coin) => (coin.name.toLowerCase().includes(searchTerm.toLowerCase())))
        setCryptos(filteredData)
    }, [cryptos, searchTerm])
    useEffect(() => {
        const filteredData = data?.data?.coins.filter((coin) => (coin.name.toLowerCase().includes(searchTerm.toLowerCase())))
        setCryptos(filteredData)
    }, [cryptos, searchTerm])
    if (isFetching) return <Loader />

    return (
        <>
            {
                !simplified && (
                    <div>
                        <Typography.Title level={2} className='heading'>Cryptocurrencies</Typography.Title>
                        <div className="crypto-search">
                            <Input placeholder='Search Cryptocurrency' onChange={(e) => setSearchTerm(e.target.value)} />
                        </div>
                    </div>
                )
            }
            <Row gutter={[32, 32]} className='crypto-card-container'>
                {cryptos?.map((crypto, id) => (
                    <Col xs={24} sm={12} lg={6} key={id} className='crypto-card'>
                        <Link to={`/crypto/${crypto.uuid}`}>
                            <Card 
                                title={`${crypto.rank}. ${crypto.name}`}
                                extra={<img className='crypto-image' src={crypto.iconUrl} alt='cryptoicon' />}
                                hoverable
                            >
                                <p>Price: {millify(crypto.price)}</p>
                                <p>Market Cap: {millify(crypto.marketCap)}</p>
                                <p>Daily Change: {millify(crypto.change)}%</p>
                            </Card>
                        </Link>
                    </Col>
                ))}
            </Row>
        </>
    )
}

export default Cryptocurrencies