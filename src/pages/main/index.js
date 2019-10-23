import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Container, Content, Card, CardItem, Body, Text, H1 } from 'native-base';
import { getData } from "../../services/storage"

export default class Main extends Component {
    // static navigationOptions = {
    //     header: null,
    // };

    state = {
        user: {},
        proximasEscalas: [],
    };

    componentDidMount() {
        const user = getData("user")
            .then((data) => {
                this.setState({
                    user: data,
                })
            });
    }
    render() {
        return (
            <Container>
                <Content>
                    <H1 style={styles.H1}>{this.state.user.name}</H1>
                    <Card style={styles.Card}>
                        <CardItem header style={styles.CardHeader}>
                            <Text style={styles.textoBranco}>Próximas Escalas</Text>
                        </CardItem>
                        <CardItem>
                            <Body>
                                <Text>09/11/2019 - 19:00</Text>
                                <Text>13/11/2019 - 19:00</Text>
                                <Text>17/11/2019 - 17:00</Text>
                            </Body>
                        </CardItem>
                    </Card>
                    <Card style={styles.Card}>
                        <CardItem header style={styles.CardHeader}>
                            <Text style={styles.textoBranco}>Próximas Escalas Extras</Text>
                        </CardItem>
                        <CardItem>
                            <Body>
                                <Text>09/11/2019 - 19:00</Text>
                                <Text>13/11/2019 - 19:00</Text>
                                <Text>17/11/2019 - 17:00</Text>
                            </Body>
                        </CardItem>
                    </Card>
                </Content>
            </Container>
        );
    }
};


const styles = StyleSheet.create({
    H1: {
        textAlign: 'center',
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: '#3498db',
        color: '#fff',
    },
    Card: {
        marginLeft: 10,
        marginRight: 10,
        marginTop: 10,
    },
    CardHeader: {
        textAlign: 'center',
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: '#3498db',
    },
    textoBranco: {
        color: '#fff',
    }
});
