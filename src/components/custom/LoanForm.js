import React, { useState } from 'react';
import { Button, Modal, Form, Input, Radio } from 'antd';
import { PlusOutlined, EyeOutlined } from '@ant-design/icons'
import styled from 'styled-components'
import { useRoot } from '../../contexts/RootContext'

const CardButton = styled(Button)`
  border-radius: 20px;
  display: block;
  margin: 1rem 0;
  width: 250px;
`




const CollectionCreateForm = ({ visible, onCreate, onCancel }) => {
 
  const [form] = Form.useForm();
  return (
    <Modal
      visible={visible}
      title="Input the information to get risk reduction"
      okText="Send"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{
          modifier: 'public',
        }}
      >
        <Form.Item
          name="BusinessName"
          label="Business Name"
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="PhoneNumber"
          label="Phone Number"
          rules={[
            {
              required: true,
              message: 'Please input the Phone Number!',
            },
          ]}>
        
          <Input />
        </Form.Item>
        <Form.Item
          name="EmailAddress"
          label="Email Address"
          rules={[
            {
              required: true,
              message: 'Please input the Email Address!',
            },
          ]}>
        
          <Input />
        </Form.Item>
        <Form.Item name="LoanAmount" label="Loan Amount"
        rules={[
            {
              required: true,
              message: 'Please input the Loan Amount!',
            },
          ]}>
          <Input />
        </Form.Item>
        <Form.Item name="PortDeparture" label="Port of Departure"
        rules={[
            {
              required: true,
              message: 'Please input the Port of Departure!',
            },
          ]}>
          <Input />
        </Form.Item>
        <Form.Item name="PortArrival" label="Port of Arrival"
        rules={[
            {
              required: true,
              message: 'Please input the Port of Arrival!',
            },
          ]}>
          <Input />
        </Form.Item>
        <Form.Item name="LoanDuration" label="Loan Duration"
        rules={[
            {
              required: true,
              message: 'Please input the Loan Duration!',
            },
          ]}>
          <Input />
        </Form.Item>
        <Form.Item name="ShipMMSI" label="Ship MMSI"
        rules={[
            {
              required: true,
              message: 'Please input the Ship MMSI!',
            },
          ]}>
          <Input />
        </Form.Item>
        
      </Form>
    </Modal>
  );
};

const CollectionsPage = () => {

  const { defaultAddress, batchcall_APIs } = useRoot()

  const [visible, setVisible] = useState(false);

  const onCreate = (values) => {
    console.log('Received values of form: ', values);
    batchcall_APIs(defaultAddress, values);
    setVisible(false);
  };

  return (
    <div>
      <CardButton
        type="primary"
        onClick={() => {
          setVisible(true);
        }}
      >
        <PlusOutlined />
        Calculate Risk Reduction
      </CardButton>
      <CollectionCreateForm
        visible={visible}
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false);
        }}
      />
    </div>
  );
};

export default CollectionsPage
