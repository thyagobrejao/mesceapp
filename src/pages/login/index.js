import React, { Component } from 'react';
import { Image, StyleSheet } from 'react-native';
import { Container, Header, Content, Form, Item, Input, Label, Left, Title, Body, Right, Button, Text } from 'native-base';
import { StackActions, NavigationActions } from 'react-navigation';
// import AsyncStorage from '@react-native-community/async-storage';

// import { storeData, getData } from "../../services/storage"
import api from "../../services/api";

export default class Login extends Component {
  static navigationOptions = {
    title: "Login",
  };
  state = {
    email: '',
    password: '',
    error: '',
  };
  handleEmailChange = (email) => {
    this.setState({ email });
  };
  handlePasswordChange = (password) => {
    this.setState({ password });
  };
  handleSignInPress = async () => {
    if (this.state.email.length === 0 || this.state.password.length === 0) {
      this.setState({ error: 'Preencha usuário e senha para continuar!' }, () => false);
    } else {
      try {
        const response = await api.post('/login', {
          email: this.state.email,
          password: this.state.password,
        });

        const resetAction = StackActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({ routeName: 'Main' }),
          ],
        });
        // await AsyncStorage.setItem("user", JSON.stringify(response.data))
        // storeData("user", response.data)
        this.props.navigation.dispatch(resetAction);
      } catch (_err) {
        this.setState({ error: 'Houve um problema com o login, verifique suas credenciais!' });
        console.log(_err);
      }
    }
  };

  checaLogin = async () => {
    // const user = await AsyncStorage.getItem("user");
    if (user) {
      const resetAction = StackActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: 'Main' }),
        ],
      });
    }
  }

  componentDidMount() {
    this.checaLogin;
  };

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
            <Button block
              style={styles.loginButton}
              onPress={this.handleSignInPress}
            >
              <Text>Entrar</Text>
            </Button>
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