import React, { Component } from 'react';
import { Image, StyleSheet } from 'react-native';
import { Container, Header, Content, Form, Item, Input, Label, Left, Title, Body, Right, Button, Text, Spinner } from 'native-base';
import { StackActions, NavigationActions } from 'react-navigation';

import api from "../../services/api";

export default class Forgot extends Component {
    render() {

        return (
            <Container style={{
                flex: 1,
                justifyContent: "center",
                backgroundColor: "#ecf0f1",
            }}>
                <Header>
                    <Left />
                    <Body>
                        <Title>MESCE.com.br</Title>
                    </Body>
                    <Right />
                </Header>
                <Content>
                </Content>
            </Container>
        )
    }
}