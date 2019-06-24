import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,Image,Button} from 'react-native';
import Overview from './Overview';
// import NavigationBar from './NavigationBar'
import Ionicons from 'react-native-vector-icons/Ionicons'
import {connect} from 'react-redux'
import { createAppContainer,createBottomTabNavigator,createStackNavigator} from 'react-navigation';

class Monitor extends React.Component{
    render(){
        return (
            <View>
                <Text>Home</Text>
            </View>
        )
    }
}
class EnergyEfficiency extends React.Component{
    render(){
        return (
            <View>
                <Text>Home</Text>
            </View>
        )
    }
}
class My extends React.Component{
    static navigationOptions = {
        title: 'Details',
    };
    render(){
        return (
            <View>
                <Text>Home</Text>
            </View>
        )
    }
}
//顶部标题
const RootStack = createStackNavigator(
    {
        Overview: {
            screen: Overview,
            navigationOptions:{
                headerRight: (
                    <Button
                        title="+1"
                        color="red"
                    />
                ),
            }
        },
        // Monitor: {
        //     screen: Monitor
        // },
        // EnergyEfficiency: {
        //     screen: EnergyEfficiency
        // },
        // My: {
        //     screen: My
        // },
    },
    {
        initialRouteName: 'Overview',
        defaultNavigationOptions: {
            headerStyle: {
                backgroundColor: '#f4511e',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                fontWeight: 'bold',
            },
        },
    }
);
//底部导航
const BottomNavigator = createBottomTabNavigator(
    {
        Overview: {
            screen: RootStack,
            navigationOptions: {
                title: "总览",
                tabBarIcon:({ focused, horizontal, tintColor })=>{
                    if(focused){
                        return <Image source={require('../images/nav_1_on.png')} style={{height:22,width:22}}/>
                    }
                    else{
                        return <Image source={require('../images/nav_1_off.png')} style={{height:22,width:22}}/>
                    }
                }
            }
        },
        Monitor: {
            screen: Monitor,
            navigationOptions: {
                title: "监控",
                tabBarIcon:({ focused, horizontal, tintColor })=>{
                    if(focused){
                        return <Image source={require('../images/nav_2_on.png')} style={{height:22,width:22}}/>
                    }
                    else{
                        return <Image source={require('../images/nav_2_off.png')} style={{height:22,width:22}}/>
                    }
                }
            }
        },
        EnergyEfficiency: {
            screen: EnergyEfficiency,
            navigationOptions: {
                title: "能效",
                tabBarIcon:({ focused, horizontal, tintColor })=>{
                    if(focused){
                        return <Image source={require('../images/nav_3_on.png')} style={{height:22,width:22}}/>
                    }
                    else{
                        return <Image source={require('../images/nav_3_off.png')} style={{height:22,width:22}}/>
                    }
                }
            }
        },
        My: {
            screen: My,
            navigationOptions: {
                title: "我的",
                tabBarIcon:({focused,horizontal,tintColor})=>{
                    if(focused){
                        return <Image source={require('../images/nav_4_on.png')} style={{height:22,width:22}}/>
                    }
                    else{
                        return <Image source={require('../images/nav_4_off.png')} style={{height:22,width:22}}/>
                    }
                }
            }
        }
    },
    {
        tabBarOptions:{
            activeTintColor:'rgb(66,176,252)'
        },
        navigationOptions:{
            headerTitle:'s'
        }
    }
)

export default connect(state => (
    {company: state.company}), {newCompany})(createAppContainer(BottomNavigator));


//导航栏样式
const styles = StyleSheet.create({
    container: {
        flex: 1,
        fontSize:22,
        backgroundColor: '#F5FCFF',
    },
    home: {
        flex: 1,
        fontSize:22,
        backgroundColor: 'red',
    },
    profile: {
        flex: 1,
        backgroundColor: 'yellow',
    },
    img:{
        width:22,
        height:22
    }
});
