import React from 'react'
import { Tabs as AntTabs, Empty } from 'antd'
import {
  ShoppingCartOutlined,
  SelectOutlined,
  HistoryOutlined,
  MoneyCollectOutlined
} from '@ant-design/icons'

import Buyer from './Buyer'
import Seller from './Seller'

const { TabPane } = AntTabs

const Tabs = () => (
  <AntTabs defaultActiveKey="2" id="marketplace" centered>
    <TabPane
      tab={
        <span>
          <ShoppingCartOutlined />
          Financier
        </span>
      }
      key="1"
    >
      <Buyer />
    </TabPane>
    <TabPane
      tab={
        <span>
          <SelectOutlined />
          Seller
        </span>
      }
      key="2"
    >
      <Seller />
    </TabPane>
    <TabPane
      tab={
        <span>
          <HistoryOutlined />
          History
        </span>
      }
      key="3"
    >
      <Empty
        description={<span>No records</span>}
        style={{ padding: '2rem 0' }}
      />
    </TabPane>
  </AntTabs>
)

export default Tabs
