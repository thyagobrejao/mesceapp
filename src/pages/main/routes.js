import React, { Component } from "react";
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Main from "./index";
import Logout from "../login/logout";
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';
import { Icon } from "native-base";

class NavigationDrawerStructure extends Component {
    //Structure for the navigatin Drawer
    toggleDrawer = () => {
        //Props to open/close the drawer
        this.props.navigationProps.toggleDrawer();
    };
    render() {
        return (
            <View style={{ flexDirection: 'row' }}>
                <TouchableOpacity onPress={this.toggleDrawer.bind(this)}>
                    {/*Donute Button Image */}
                    <Image
                        source={require('../../images/drawer.png')}
                        style={{ width: 25, height: 25, marginLeft: 5 }}
                    />
                </TouchableOpacity>
            </View>
        );
    }
}

const MenuMain = createStackNavigator({
    //All the screen from the Screen1 will be indexed here
    First: {
        screen: Main,
        navigationOptions: ({ navigation }) => ({
            title: 'MESCE.com.br',
            headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
            headerStyle: {
                backgroundColor: '#2980b9',
            },
            headerTintColor: '#fff',
        }),
    },
});

const MenuLogout = createStackNavigator({
    //All the screen from the Screen1 will be indexed here
    First: {
        screen: Logout,
        navigationOptions: ({ navigation }) => ({
            title: 'MESCE.com.br',
            headerLeft: <NavigationDrawerStructure navigationProps={navigation} />,
            headerStyle: {
                backgroundColor: '#2980b9',
            },
            headerTintColor: '#fff',
        }),
    },
});

const MainScreen = createDrawerNavigator({
    //Drawer Optons and indexing
    Screen1: { //Title
        screen: MenuMain,
        navigationOptions: {
            drawerLabel: "Home",
            drawerIcon: ({ tintColor }) => (
                <Image
                    source={require('../../images/home-solid.png')}
                    style={[styles.icon, { tintColor: tintColor }]}
                />
            ),
        }
    },
    Screen2: { //Title
        screen: MenuLogout,
        navigationOptions: {
            drawerLabel: "Logout",
            drawerIcon: ({ tintColor }) => (
                <Image
                    source={require('../../images/sign-out-alt-solid.png')}
                    style={[styles.icon, { tintColor: tintColor }]}
                />
            ),
        }
    },
    // Screen2: {//Title
    //   screen: Screen2_StackNavigator,
    //   navigationOptions: {
    //     drawerLabel: "Demo Screen 2"
    //   }
    // },
    // Screen3: {//Title
    //   screen: Screen3_StackNavigator,
    //   navigationOptions: {
    //     drawerLabel: "Demo Screen 3"
    //   }
    // },
});

const styles = StyleSheet.create({
    icon: {
        width: 24,
        height: 24,
    },
});

export default createAppContainer(MainScreen);