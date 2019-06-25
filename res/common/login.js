import React, {Component} from 'react';
import {View,StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input,Image } from 'react-native-elements';
class Login extends React.Component{
    render(){
        return(
            <View style={styles.container}>
                <Image source={require('../images/login_logo.png')} style={styles.login_logo}/>
                <Input
                    placeholder='INPUT WITH ICON'
                    leftIcon={{ type: 'font-awesome', name: 'chevron-left' }}
                />
            </View>

        )

    }

}
export default Login

const styles=StyleSheet.create({
    container: {
        flex:1
    },
    login_logo:{
        width:80,
        height:80
    }
})