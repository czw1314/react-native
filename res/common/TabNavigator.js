import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,Image,Button} from 'react-native';
import TabNavigator from 'react-native-tab-navigator';
import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation';
class HomeScreen extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>HomE Screen</Text>
                <Button
                    title="Go to Details"
                    onPress={() => {
                        this.props.navigation.dispatch(StackActions.reset({
                            index: 0,
                            actions: [
                                NavigationActions.navigate({ routeName: 'Details' })
                            ],
                        }))
                    }}
                />
            </View>
        );
    }
}

class DetailsScreen extends React.Component {
    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Text>Details Screen</Text>
                <Button
                    title="Go to Details"
                    onPress={() => {
                        this.props.navigation.dispatch(StackActions.reset({
                            index: 0,
                            actions: [
                                NavigationActions.navigate({ routeName: 'Home' })
                            ],
                        }))
                    }}
                />
            </View>
        );
    }
}

const AppNavigator = createStackNavigator({
    Home: {
        screen: HomeScreen,
    },
    Details: {
        screen: DetailsScreen,
    },
}, {
    initialRouteName: 'Home',
});

const AppContainer=createAppContainer(AppNavigator);
//底部导航栏
type Props = {};
export default class TabNav extends Component<Props> {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab:'home',
        }
        };
        render() {
        return (
            <View style={styles.container}>

                    <TabNavigator>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'home'}
                        title="Home"
                        renderIcon={() => <Image style={styles.img} source={require('../images/nav_1_off.png')}/>}
                        renderSelectedIcon={() => <Image style={styles.img} source={require('../images/nav_1_on.png')}/>}
                        // badgeText="1"信息提示
                        onPress={() => this.setState({selectedTab: 'home'})}>
                        <View style={styles.home}>
                            <AppContainer></AppContainer>
                        </View>
                    </TabNavigator.Item>
                    <TabNavigator.Item
                        selected={this.state.selectedTab === 'profile'}
                        title="Profile"
                        renderIcon={() => <Image style={styles.img} source={require('../images/nav_2_off.png')}/>}
                        renderSelectedIcon={() => <Image style={styles.img} source={require('../images/nav_2_off.png')}/>}
                        onPress={() => this.setState({selectedTab: 'profile'})}>
                        <View style={styles.profile}></View>
                    </TabNavigator.Item>
                </TabNavigator>
            </View>
        );
    }
};

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
