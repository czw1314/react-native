import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,Image,Button} from 'react-native';
import {createAppContainer} from "react-navigation";
import {newCompany} from "../../js/redux/action";
import {connect} from "react-redux";
class Overview extends React.Component{
    constructor(props){
        super(props)
        this.state={
            company:1
        }
    }
    //标题配置
    static navigationOptions = ({ navigation }) => {
        console.log(navigation)
        return {
            headerRight: (
                <Button
                    onPress={() => navigation.navigate('Login')}
                    title="+1"
                    color="red"
                />
            ),
        };
    };
    render(){
        console.log(this.props)
        return (
            <View>
                <Text>Hme</Text>
            </View>
        )
    }
}

export default connect(state => (
    {company: state.company}), {newCompany})(Overview);