import React, { Component } from 'react';
import { StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { Container, Content, Card, CardItem, Body, Text, H1, Spinner } from 'native-base';
import moment from 'moment';
import { getData } from "../../services/storage"
import api from "../../services/api";

export default class Main extends Component {

    state = {
        user: {},
        loadingAvisos: false,
        loadingDados: false,
        dados: {
            escalas: [],
            escalasExtras: [],
        },
        avisos: [],
    };

    atualizaDados = async () => {
        try {
            this.setState({
                loadingDados: true,
            });
            await api.get('escalas', {
                params: {
                    api_token: this.state.user.api_token,
                }
            }).then((data) => {
                this.setState({
                    dados: data.data,
                })
                this.setState({
                    loadingDados: false,
                });
            });
            // storeData("user", response.data)
        } catch (_err) {
            // this.setState({ error: 'Houve um problema com o login, verifique suas credenciais!' });
            console.log(_err.response);
        }
        try {
            this.setState({
                loadingAvisos: true,
            });
            await api.get('avisos', {
                params: {
                    api_token: this.state.user.api_token,
                }
            }).then((data) => {
                this.setState({
                    avisos: data.data,
                });
                this.setState({
                    loadingAvisos: false,
                });
            });
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

    renderAvisos = ({ item }) => (
        <Card>
            <CardItem header style={styles.CardHeader2}>
                <Text>{moment(item.created_at).format("DD/MM/YYYY h:mm")}</Text>
            </CardItem>
            <CardItem>
                <Body>
                    <Text>{item.descricao}</Text>
                </Body>
            </CardItem>
        </Card>
    )

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
                <SafeAreaView style={styles.container}>
                    <Content>
                        <H1 style={styles.H1}>{this.state.user.name}</H1>
                        <Card style={styles.Card}>
                            <CardItem header style={styles.CardHeader}>
                                <Text style={styles.textoBranco}>Avisos</Text>
                            </CardItem>
                            <CardItem>
                                <Body>
                                    {this.state.loadingAvisos ? <Spinner style={styles.Spinner} /> :
                                        <FlatList
                                            style={styles.Card2}
                                            data={this.state.avisos}
                                            keyExtractor={item => "aviso-" + item.id}
                                            renderItem={this.renderAvisos}
                                            ListEmptyComponent={this.vazio}
                                        />
                                    }
                                </Body>
                            </CardItem>
                        </Card>
                        <Card style={styles.Card}>
                            <CardItem header style={styles.CardHeader}>
                                <Text style={styles.textoBranco}>Próximas Escalas</Text>
                            </CardItem>
                            <CardItem>
                                <Body>
                                    {this.state.loadingDados ? <Spinner style={styles.Spinner} /> :
                                        <FlatList
                                            data={this.state.dados.escalas}
                                            keyExtractor={item => "escalas-" + item.id}
                                            renderItem={this.renderEscalas}
                                            ListEmptyComponent={this.vazio}
                                        />
                                    }
                                </Body>
                            </CardItem>
                        </Card>
                        <Card style={styles.Card}>
                            <CardItem header style={styles.CardHeader}>
                                <Text style={styles.textoBranco}>Próximas Escalas Extras</Text>
                            </CardItem>
                            <CardItem>
                                <Body>
                                    {this.state.loadingDados ? <Spinner style={styles.Spinner} /> :
                                        <FlatList
                                            data={this.state.dados.escalasExtras}
                                            keyExtractor={item => "escalasExtra-" + item.data + item.tipo}
                                            renderItem={this.renderEscalasExtras}
                                            ListEmptyComponent={this.vazio}
                                        />
                                    }
                                </Body>
                            </CardItem>
                        </Card>
                    </Content>
                </SafeAreaView>
            </Container>
        );
    }
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
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
    },
    Card2: {
        width: '100%',
    },
    CardHeader2: {
        textAlign: 'center',
        paddingTop: 10,
        paddingBottom: 10,
        backgroundColor: '#ecf0f1',
    },
    Spinner: {
        flex: 1,
        alignSelf: 'center',
    },
});
