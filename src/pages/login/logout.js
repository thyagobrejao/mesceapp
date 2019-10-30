import React, { Component } from 'react';
import { storeData } from "../../services/storage"
import { StackActions, NavigationActions } from 'react-navigation';
import { View, Text } from 'native-base';

export default class Logout extends Component {

    resetAction = () => StackActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: 'Login' }),
        ],
      });

    logout = async () => {
        storeData("user", null)
        .then(data => {
            this.props.navigation.dispatch(this.resetAction());
        })
      }

    componentDidMount() {
        this.logout();
      };
      render() {

        return (
            <View>
                <Text>Saindo...</Text>
            </View>
        )
      }
}