import React, { Component } from "react";
import { View, Image, TouchableOpacity } from 'react-native';
import Main from "./index";
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';

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

const MainScreen = createDrawerNavigator({
    //Drawer Optons and indexing
    Screen1: { //Title
        screen: MenuMain,
        navigationOptions: {
            drawerLabel: "Home"
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
export default createAppContainer(MainScreen);