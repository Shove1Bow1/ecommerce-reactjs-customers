import { Button, Checkbox, Col, DatePicker, Form, Input, Row, Select, Typography } from 'antd';
import React from 'react';

const { Title } = Typography;
const { Option } = Select;

const Bill = () => {
    return (
        <>
            <div style={{ paddingBottom: '30px' }}>
                <Title level={3} style={{ fontWeight: 'bolder' }}>Billing info</Title>
                <Row gutter={24}>
                    <Col span={16}>
                        <Form.Item style={{ color: '#A9A9A9' }}>Please enter your billing info</Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item style={{ color: '#A9A9A9', textAlign: 'right' }}>Step 1 of 5</Form.Item>
                    </Col>
                </Row>

                <Form>
                    <Input.Group>
                        <Row gutter={24}>
                            <Col span={12}>
                                <label style={{ fontWeight: 'bold' }}>First name</label>
                                <Form.Item name='first-name'>
                                    <Input placeholder={'First name'} />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <label style={{ fontWeight: 'bold' }}>Last name</label>
                                <Form.Item name='last-name'>
                                    <Input placeholder={'Last name'} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={24}>
                            <Col span={12}>
                                <label style={{ fontWeight: 'bold' }}>Email address</label>
                                <Form.Item name='email' rules={[{ type: 'email' }]}>
                                    <Input placeholder={'Email address'} />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <label style={{ fontWeight: 'bold' }}>Phone number</label>
                                <Form.Item name='phone' rules={[{ type: 'number' }]}>
                                    <Input placeholder={'Phone number'} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={24}>
                            <Col span={12}>
                                <label style={{ fontWeight: 'bold' }}>Address</label>
                                <Form.Item name='address'>
                                    <Input placeholder={'Address'} />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <label style={{ fontWeight: 'bold' }}>Town/City</label>
                                <Form.Item name='city'>
                                    <Input placeholder={'Town/City'} />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={24}>
                            <Col span={12}>
                                <label style={{ fontWeight: 'bold' }}>State/Country</label>
                                <Form.Item name='country'>
                                    <Select
                                        placeholder={'State/Country'}>
                                        <Option>

                                        </Option>
                                    </Select>
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <label style={{ fontWeight: 'bold' }}>Zip/Postal code</label>
                                <Form.Item name='zip'>
                                    <Input placeholder={'Zip/Postal code'} />
                                </Form.Item>
                            </Col>
                        </Row>
                    </Input.Group>
                </Form>
            </div>
            <div>
                <Title level={3} style={{ fontWeight: 'bolder' }}>Payment method</Title>
                <Row gutter={24}>
                    <Col span={16}>
                        <Form.Item style={{ color: '#A9A9A9' }}>Please enter your payment method</Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item style={{ color: '#A9A9A9', textAlign: 'right' }}>Step 2 of 3</Form.Item>
                    </Col>
                </Row>
                <Form>
                    <Form style={{ border: '1px solid #D1D1D1', borderRadius: '10px' }}>
                        <Form.Item>
                            <Checkbox style={{ fontWeight: 'bold', paddingLeft: '10px' }}>Credit card</Checkbox>
                        </Form.Item>
                        <Input.Group>
                            <Form.Item style={{ paddingLeft: '20px', paddingRight: '20px' }}>
                                <label style={{ fontWeight: 'bold' }}>Card number</label>
                                <Input placeholder='Card number' rules='number'></Input>
                            </Form.Item>
                            <Form.Item style={{ paddingLeft: '20px', paddingRight: '20px' }}>
                                <Row gutter={24}>
                                    <Col span={12}>
                                        <label style={{ fontWeight: 'bold' }}>Card holder</label>
                                        <Input placeholder='Card holder' rules='number'></Input>
                                    </Col>
                                    <Col span={6}>
                                        <label style={{ fontWeight: 'bold' }}>Expiration date</label>
                                        <DatePicker placeholder='DD/MM/YY'></DatePicker>
                                    </Col>
                                    <Col span={6}>
                                        <label style={{ fontWeight: 'bold' }}>CVC</label>
                                        <Input placeholder='CVC' rules='number'></Input>
                                    </Col>
                                </Row>
                            </Form.Item>
                        </Input.Group>
                    </Form>
                    <Form.Item style={{ border: '1px solid #D1D1D1', borderRadius: '10px', background: '#F9F9F9', marginTop: '10px' }}>
                        <Checkbox style={{ fontWeight: 'bold', paddingLeft: '10px' }}>PayPal</Checkbox>
                    </Form.Item>
                </Form>
            </div>
            <div>
                <Title level={3} style={{ fontWeight: 'bolder' }}>Payment method</Title>
                <Row gutter={24}>
                    <Col span={16}>
                        <Form.Item style={{ color: '#A9A9A9' }}>We are getting to the end. Just few click and your order is ready!</Form.Item>
                    </Col>
                    <Col span={8}>
                        <Form.Item style={{ color: '#A9A9A9', textAlign: 'right' }}>Step 3 of 3</Form.Item>
                    </Col>
                </Row>
                <Form>
                    <Form.Item style={{ border: '1px solid #D1D1D1', borderRadius: '10px', background: '#F9F9F9', marginTop: '10px' }}>
                        <Checkbox style={{ paddingLeft: '10px' }}>I agree with sending an Marketing and newsletter emails. No spam, promised!</Checkbox>
                    </Form.Item>
                    <Form.Item style={{ border: '1px solid #D1D1D1', borderRadius: '10px', background: '#F9F9F9', marginTop: '10px' }}>
                        <Checkbox style={{ paddingLeft: '10px' }}>I agree with our <u>terms and conditions</u>  and <u>privacy policy.</u></Checkbox>
                    </Form.Item>
                </Form>
            </div>
            <Button style={{ width: '218px', height: '56px', background: '#6A983C', border: '2px solid #46760A', borderRadius: '12px' }}>
                <label style={{ color: '#FFFFFF', fontWeight: 700, fontSize: '15px' }}>Complete order</label>
            </Button>
        </>

    )
}

export default Bill