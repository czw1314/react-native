import React, {Component} from 'react';
import {View,StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input,Image } from 'react-native-elements';
class Login extends React.Component{
    constructor(props){
        super(props)
        this.state={
            borderColor:'#fff',
            borderColor1:'#86939e'
        }
    }
    focus(input){
        if(input==='userName'){
            this.refs.userName.setNativeProps({borderColor:'#fff'})
            this.setState({borderColor:'#fff'})
        }
        else if(input=='password'){
            this.setState({borderColor1:'rgb(1,160,254)'})
        }
        console.log(this.state.borderColor)
    }
    render(){
        return(
            <View style={styles.container}>
                <View style={{alignItems:'center'}}>
                <Image source={require('../images/login_logo.png')} style={styles.login_logo}/>
                 </View>
                <Input
                    ref={'userName'}
                    placeholder='请输入手机号'
                    inputContainerStyle={{borderColor:'#fff'}}
                    keyboardType={'number-pad'}
                    style={{borderBottomColor:'#fff'}}
                    onFocus={()=>this.focus('userName')}
                    maxLength={11}
                    // autoFocus={true}
                    leftIcon={ <Image source={require('../images/phone.png')} style={styles.icon}/>}
                />
                <Input
                    placeholder='密码'
                    inputContainerStyle={this.state.borderColor1}
                    onFocus={()=>this.focus('password')}
                    inputStyle={{borderColor:'#fff'}}
                    secureTextEntry={true}
                    // autoFocus={true}
                    leftIcon={ <Image source={require('../images/password.png')} style={styles.icon}/>}
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
        marginTop:80,
        width:80,
        height:80
    },
    icon:{
        width:20,
        height:20
    }
})