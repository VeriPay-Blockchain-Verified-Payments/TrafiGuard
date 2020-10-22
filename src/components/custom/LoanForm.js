import React, { useState } from 'react';
import { Button, Modal, Form, Input, Radio } from 'antd';
import { PlusOutlined, EyeOutlined } from '@ant-design/icons'
import styled from 'styled-components'

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
      okText="Create"
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
          name="Business Name"
          label="Business Name"
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="Phone Number"
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
          name="Email Address"
          label="Email Address"
          rules={[
            {
              required: true,
              message: 'Please input the Email Address!',
            },
          ]}>
        
          <Input />
        </Form.Item>
        <Form.Item name="Loan Amount" label="Loan Amount"
        rules={[
            {
              required: true,
              message: 'Please input the Loan Amount!',
            },
          ]}>
          <Input />
        </Form.Item>
        <Form.Item name="Port of Departure" label="Port of Departure"
        rules={[
            {
              required: true,
              message: 'Please input the Port of Departure!',
            },
          ]}>
          <Input />
        </Form.Item>
        <Form.Item name="Port of Arrival" label="Port of Arrival"
        rules={[
            {
              required: true,
              message: 'Please input the Port of Arrival!',
            },
          ]}>
          <Input />
        </Form.Item>
        <Form.Item name="Loan Duration" label="Loan Duration"
        rules={[
            {
              required: true,
              message: 'Please input the Loan Duration!',
            },
          ]}>
          <Input />
        </Form.Item>
        <Form.Item name="Ship MMSI" label="Ship MMSI"
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
  const [visible, setVisible] = useState(false);

  const onCreate = (values) => {
    console.log('Received values of form: ', values);
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
