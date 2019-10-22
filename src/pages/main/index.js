import React, { Component } from 'react';
import { Container, Header, Content, Form, Item, Input, Label, Left, Title, Body, Right, Button, Text } from 'native-base';
// import { storeData, getData } from "../../services/storage"
import AsyncStorage from '@react-native-community/async-storage';

// import styles from './styles';

export default class Main extends Component {
    static navigationOptions = {
        title: "MESCE.com.br",
    };

    state = {
        user: {},
    };

    componentDidMount() {
        AsyncStorage.getItem("user", (errs,result) => {
            if (!errs) {
                if (result !== null) {
                    this.setState({user: result});
                } else {
                    console.log("merda")
                }
             } else {
                 console.log("cacete")
             }
        })
        console.log(this.state.user)
        this.forceUpdate()
        console.log(this.state.user)
    }
    render() {
        return (
            <Container style={{
                flex: 1,
                justifyContent: "center",
                backgroundColor: "#ecf0f1",
            }}>
                <Text>Oi {this.state.user.name}</Text>
            </Container>
        );
    }
};
