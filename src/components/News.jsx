import React, { useState } from 'react'
import { Typography, Row, Col, Card, Avatar, Select } from 'antd'
import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi'
import altImg from '../images/cryptoimg.png'
import moment from 'moment'
import { useGetCryptosQuery } from '../services/cryptoApi'
import Loader from './Loader'

const { Text, Title } = Typography
const { Option } = Select

const News = ({simplified}) => {
  const [newsCategory, setNewsCategory] = useState('Cryptocurrency')
  const  { data } = useGetCryptoNewsQuery({newsCategory, count: simplified ? 6: 12})
  const { data: cryptoList } = useGetCryptosQuery(100)
  if(!data?.value) return <Loader />

  return (
    <>
      {
        !simplified && (
          <Title level={2} className='heading'>News</Title>
        )
      }
      <Row gutter={[20, 20]} className='news-card-container'>
        {
          !simplified && (
            <Col span={24}>
              <Select
                showSearch
                className='select-news'
                placeholder='Select a Crypto'
                optionFilterProp='children'
                onChange={(value) => setNewsCategory(value)}
                filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase())}
              >
                <Option value='Cryptocurrency'>Cryptocurrency</Option>
                {cryptoList?.data?.coins.map((coin, id) => <Option value={coin.name} key={id}>{coin.name}</Option>)}
              </Select>
            </Col>
          )
        }
        {
          data.value.map((news, id) => (
            <Col xs={24} sm={12} lg={8} key={id} className='news-container'>
              <Card hoverable className='news-card'>
                <a href={news.url} target='_blank' rel='noreferrer'>
                  <div className="news-image-container">
                    <Title level={5} className='news-title'>{news.name}</Title>
                    <img src={news?.image?.thumbnail?.contentUrl || altImg} alt='newsicon' />
                  </div>
                  <p className='news-desc'>{news.description > 100 ? news.description.substring(0, 100) + '...' : news.description}</p>
                  <div className="provider-container">
                    <div>
                      <Avatar src={news.provider[0]?.image?.thumbnail?.contentUrl || altImg} alt='providericon'></Avatar>
                      <Text className='provider-name'>{news.provider[0]?.name}</Text>
                    </div>
                    <Text className='news-date'><span>{moment(news.datePublished).startOf('ss').fromNow()}</span></Text>
                  </div>
                </a>
              </Card>
            </Col>
          ))
        }
      </Row>
    </>
  )
}

export default News