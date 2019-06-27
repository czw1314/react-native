import React, {Component} from 'react';
import {View,StyleSheet,Modal,TouchableHighlight} from 'react-native';
import md5 from 'js-md5';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input,Image,Button,Overlay,Text } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import {requestLogin} from "../../js/ajax/api";

class Login extends React.Component{
    constructor(props){
        super(props)
        this.state={
            borderColor:'#86939e',
            borderColor1:'#86939e',
            source:require('../images/phone.png'),
            source1:require('../images/password.png'),
            userName:'',
            password:'',
            errorMsg:'',
            errorMsg1:'',
            isVisible:false,
            errorLogin:''
        }
    }
    //获取焦点，激活输入框
    focus(input){
        if(input==='userName'){
            this.setState({borderColor:'rgb(1,160,254)',source:require('../images/phoneActive.png')})

        }
        else if(input==='password'){
            this.setState({borderColor1:'rgb(1,160,254)',source1:require('../images/passwordActive.png')})
        }
    }
    //失去焦点，退出输入框
    blur(input){
        if(input==='userName'){
            this.setState({borderColor:'#86939e',source:require('../images/phone.png')})
            if(this.state.userName){
                this.setState({errorMsg:''})
            }
            else{
                this.setState({errorMsg:'请输入账号'})
            }
        }
        else if(input==='password'){
            this.setState({borderColor1:'#86939e',source1:require('../images/password.png')})

            if(this.state.password){
                this.setState({errorMsg1:''})
            }
            else{
                this.setState({errorMsg1:'请输入密码'})
            }
        }
    }
    //储存数据
    storeData = async (key,value) => {
        try {
            await AsyncStorage.setItem(key, value);
        } catch (error) {
            // Error saving data
        }
    }
    //读取数据
    retrieveData = async (key) => {
        try {
            const value = await AsyncStorage.getItem(key);
            if (value !== null) {
                // We have data!!
                console.log(value);
            }
        } catch (error) {
            // Error retrieving data
        }
    }
    //密码加密
    enCode(e) {
        let b = md5.hex(e);
        let f = b.substring(3, b.length);
        let d = f.substring(0, 26);
        let c = "abc" + d + "def";
        let a = md5.hex(c);
        return a
    }
    //登陆
    login(){
        if(this.state.userName===''||this.state.password===''){
            this.setState({isVisible:true,errorLogin:'请先输入账号密码'})
        }
        else {
            let loginParams = {phone: this.state.userName, password: this.enCode(this.state.password)};
            requestLogin(loginParams).then(res => {
                    console.log(res)
                    if (res.code === 1) {
                        console.log('s')
                    }
                    else {
                        this.setState({isVisible: true, errorLogin: res.msg})
                    }
//                     this.visible = false;
//                     this.$store.state.phone = res.data.phone;
//                     this.$store.state.userID = res.data.userID;
//                     this.$store.state.appName = res.data.appName;
// //              this.$store.state.monitorID= res.data.phone;
//                     localStorage.setItem("appName", res.data.appName);
//                     localStorage.setItem("userID", res.data.userID);
//                     localStorage.setItem("phone", res.data.phone);
//                     localStorage.setItem("accessKey", res.data.accessKey);
// //              localStorage.setItem('user', res.data.userID);
// //              localStorage.setItem('flag', res.data.flag);
//
//                     setTimeout(function () {
//                         _this.$router.push({path: '/home'});
//                     }, 500)
//                 }
//                 else {
//                     this.$store.state.msg = res.msg
//                     this.$store.state.DialogHiden = true
//                 }
                }
            )
        }

    }
    change(input,value){
        if(input==='userName'){
            this.setState({borderColor:'rgb(1,160,254)',source:require('../images/phoneActive.png')})
            this.setState({userName:value})
            if(this.state.userName){
                this.setState({errorMsg:''})
            }
        }
        else if(input==='password'){
            this.setState({borderColor1:'#86939e',source1:require('../images/password.png')})
            if(this.state.password){
                this.setState({errorMsg1:''})
            }
        }
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
                    inputContainerStyle={{borderColor:this.state.borderColor}}
                    keyboardType={'number-pad'}
                    style={{borderBottomColor:'#fff'}}
                    onFocus={()=>this.focus('userName')}
                    onBlur={()=>this.blur('userName')}
                    onChangeText={(value)=>this.change('userName',value)}
                    maxLength={11}
                    errorMessage={this.state.errorMsg}
                    // autoFocus={true}
                    leftIcon={ <Image source={this.state.source} style={styles.icon}/>}
                />
                <Input
                    placeholder='密码'
                    inputContainerStyle={{borderColor:this.state.borderColor1}}
                    onFocus={()=>this.focus('password')}
                    onBlur={()=>this.blur('password')}
                    onChangeText={(value)=>this.change('password',value)}
                    // inputStyle={{borderColor:'#fff'}}
                    secureTextEntry={true}
                    // autoFocus={true}
                    leftIcon={ <Image source={this.state.source1} style={styles.icon}/>}
                />
                <Button
                    title="登陆"
                    containerStyle={styles.button}
                    buttonStyle={{borderRadius:20}}
                    onPress={() => this.login()}
                />
                <Overlay isVisible={this.state.isVisible} onBackdropPress={()=>this.setState({isVisible:false})} height={80} overlayStyle={{alignItems:'center',justifyContent:'center'}}>
                    <Text>{this.state.errorLogin}</Text>
                </Overlay>
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
        marginBottom:80,
        width:80,
        height:80
    },
    icon:{
        width:20,
        height:20
    },
    button:{
        marginTop:40,
        paddingRight:10,
        paddingLeft:10,

    }
})