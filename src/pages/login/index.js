import React, { Component } from 'react';
import { Image, StyleSheet } from 'react-native';
import { Container, Header, Content, Form, Item, Input, Label, Left, Title, Body, Right, Button, Text, Spinner } from 'native-base';
import { StackActions, NavigationActions } from 'react-navigation';
import { storeData, getData } from "../../services/storage"
import api from "../../services/api";

import OneSignal from 'react-native-onesignal';

var _ = require('lodash');

export default class Login extends Component {
  static navigationOptions = {
    title: "Login",
  };
  state = {
    email: '',
    password: '',
    error: '',
    loadingLogin: false,
  };

  constructor(properties) {
    super(properties);
    OneSignal.init("a5827a73-6ce4-4c27-8b92-cb09c99caf2c");
    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('ids', this.onIds);
  }

  componentWillUnmount() {
    OneSignal.removeEventListener('received', this.onReceived);
    OneSignal.removeEventListener('opened', this.onOpened);
    OneSignal.removeEventListener('ids', this.onIds);
  }

  onReceived(notification) {
    console.log("Notification received: ", notification);
  }

  onOpened(openResult) {
    console.log('Message: ', openResult.notification.payload.body);
    console.log('Data: ', openResult.notification.payload.additionalData);
    console.log('isActive: ', openResult.notification.isAppInFocus);
    console.log('openResult: ', openResult);
  }

  onIds(device) {
    console.log('Device info: ', device);
  }

  handleEmailChange = (email) => {
    this.setState({ email });
  };
  handlePasswordChange = (password) => {
    this.setState({ password });
  };

  resetAction = () => StackActions.reset({
    index: 0,
    actions: [
      NavigationActions.navigate({ routeName: 'Main' }),
    ],
  });

  handleSignInPress = async () => {
    if (this.state.email.length === 0 || this.state.password.length === 0) {
      this.setState({ error: 'Preencha usuário e senha para continuar!' }, () => false);
    } else {
      try {
        this.setState({
          loadingLogin: true,
        });
        await api.post('/login', {
          email: this.state.email,
          password: this.state.password,
        }).then((data) => {
          storeData("user", data.data)
          OneSignal.setExternalUserId("push-" + data.data.id);
          this.props.navigation.dispatch(this.resetAction());
        });
      } catch (_err) {
        this.setState({ error: 'Houve um problema com o login, verifique suas credenciais!' });
        this.setState({
          loadingLogin: false,
        });
        console.log(_err.message);
        console.log(_err.code);
        console.log(_err.stack);
      }
    }
  };

  checaLogin = async () => {
    getData("user").then((data) => {
      if (!_.isEmpty(data)) {
        this.props.navigation.dispatch(this.resetAction());
      }
    });
  }

  componentDidMount() {
    this.checaLogin();
  };

  receivedPush() {
    console.log("PUSH RECEBIDO");
  }


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
          <Image
            style={{ marginBottom: 20, height: 300, width: null, flex: 1 }}
            source={require('../../images/distribuindo-comunhao-transparente2.png')}
          />
          <Form>
            <Item floatingLabel>
              <Label>Endereço de e-mail</Label>
              <Input
                style={styles.loginInput}
                value={this.state.email}
                onChangeText={this.handleEmailChange}
                autoCapitalize="none"
                autoCorrect={false}
              />
            </Item>
            <Item floatingLabel last>
              <Label>Senha</Label>
              <Input
                style={styles.loginInput}
                value={this.state.password}
                onChangeText={this.handlePasswordChange}
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry
              />
            </Item>
            {this.state.error.length !== 0 && <Text style={styles.ErrorMessage}>{this.state.error}</Text>}
            {this.state.loadingLogin ? <Spinner style={styles.Spinner} /> :
              <Button block
                style={styles.loginButton}
                onPress={this.handleSignInPress}
              >
                <Text>Entrar</Text>
              </Button>
            }
          </Form>
          <Button transparent light style={styles.loginButton}>
            <Text>Recuperar Senha</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  loginInput: {
    borderRadius: 5,
    width: "90%",
    marginRight: 20,
  },

  loginButton: {
    marginTop: 30,
    width: "90%",
    marginLeft: 20,
  },

  ErrorMessage: {
    textAlign: "center",
    color: "#ce2029",
    fontSize: 16,
    marginTop: 30,
    marginHorizontal: 20,
  },
});