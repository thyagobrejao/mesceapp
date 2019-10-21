import React, { Component } from 'react';
import { Image } from 'react-native';
import { Container, Header, Content, Form, Item, Input, Label, Left, Title, Subtitle, Body, Right } from 'native-base';
export default class Login extends Component {
  render() {
    return (
      <Container>
        <Header>
          <Left />
          <Body>
            <Title>Title</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          {/* <Image
            style={{ width: '50%', height: '50%' }}
            source={require('../../images/distribuindo-comunhao-transparente2.png')} 
          /> */}
          <Form>
            <Item floatingLabel>
              <Label>Username</Label>
              <Input />
            </Item>
            <Item floatingLabel last>
              <Label>Password</Label>
              <Input />
            </Item>
          </Form>
        </Content>
      </Container>
    );
  }
}
