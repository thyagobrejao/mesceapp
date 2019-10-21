import React, { Component } from 'react';
import { Image, StyleSheet } from 'react-native';
import { Container, Header, Content, Form, Item, Input, Label, Left, Title, Body, Right, Button, Text } from 'native-base';
import { StackActions, NavigationActions } from 'react-navigation';

export default class Login extends Component {
  static navigationOptions = {
    header: null,
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
        const response = await api.post('/sessions', {
          email: this.state.email,
          password: this.state.password,
        });

        const resetAction = StackActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({ routeName: 'Main', params: { token: response.data.token } }),
          ],
        });
        this.props.navigation.dispatch(resetAction);
      } catch (_err) {
        this.setState({ error: 'Houve um problema com o login, verifique suas credenciais!' });
      }
    }
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
            style={{ marginTop: 30, marginBottom: 20, height: 300, width: null, flex: 1 }}
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
            <Button block style={styles.loginButton}>
              <Text>Entrar</Text>
            </Button>
          </Form>
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
});