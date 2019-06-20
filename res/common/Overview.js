import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,Image,Button} from 'react-native';
export default class Overview extends React.Component{
    //标题配置
    static navigationOptions = ({ navigation }) => {
        return {
            headerRight: (
                <Button
                    onPress={navigation.getParam('increaseCount')}
                    title="+1"
                    color="#fff"
                />
            ),
        };
    };
    render(){
        return (
            <View>
                <Text>Hme</Text>
            </View>
        )
    }
}