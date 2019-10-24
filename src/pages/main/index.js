import React, { Component } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { Container, Content, Card, CardItem, Body, Text, H1 } from 'native-base';
import moment from 'moment';
import { getData } from "../../services/storage"
import api from "../../services/api";

export default class Main extends Component {

    state = {
        user: {},
        dados: {},
    };

    atualizaDados = async () => {
        try {
            const response = await api.get('escalas', {
                params: {
                    api_token: this.state.user.api_token,
                }
            });
            this.setState({
                dados: response.data,
            })
            // storeData("user", response.data)
        } catch (_err) {
            // this.setState({ error: 'Houve um problema com o login, verifique suas credenciais!' });
            console.log(_err.response);
        }
    };

    componentDidMount() {
        getData("user")
            .then((data) => {
                this.setState({
                    user: data
                })
                this.atualizaDados();
            });
    }

    renderEscalas = ({ item }) => (
        <Text>{moment(item.data).format("DD/MM/YYYY")} - {item.missas.horario}</Text>
    )

    renderEscalasExtras = ({ item }) => (
        <Text>{moment(item.data).format("DD/MM/YYYY")} - {item.tipo} - {item.descricao}</Text>
    )

    vazio = () => (
        <Text>Nenhum ítem foi encontrado.</Text>
    )

    render() {
        return (
            <Container>
                <Content>
                    <H1 style={styles.H1}>{this.state.user.name}</H1>
                    <Card style={styles.Card}>
                        <CardItem header style={styles.CardHeader}>
                            <Text style={styles.textoBranco}>Avisos</Text>
                        </CardItem>
                        <CardItem>
                            <Body>
                                <Text>Novena dia 31</Text>
                            </Body>
                        </CardItem>
                    </Card>
                    <Card style={styles.Card}>
                        <CardItem header style={styles.CardHeader}>
                            <Text style={styles.textoBranco}>Próximas Escalas</Text>
                        </CardItem>
                        <CardItem>
                            <Body>
                                <FlatList
                                    data={this.state.dados.escalas}
                                    keyExtractor={item => item.id}
                                    renderItem={this.renderEscalas}
                                    ListEmptyComponent={this.vazio}
                                />
                            </Body>
                        </CardItem>
                    </Card>
                    <Card style={styles.Card}>
                        <CardItem header style={styles.CardHeader}>
                            <Text style={styles.textoBranco}>Próximas Escalas Extras</Text>
                        </CardItem>
                        <CardItem>
                            <Body>
                                <FlatList
                                    data={this.state.dados.escalasExtras}
                                    keyExtractor={item => item.id}
                                    renderItem={this.renderEscalasExtras}
                                    ListEmptyComponent={this.vazio}
                                />
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
