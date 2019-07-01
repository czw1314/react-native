import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, Button, ImageBackground} from 'react-native';
import {createAppContainer} from "react-navigation";
import {newCompany} from "../../js/redux/action";
import {connect} from "react-redux";

class Overview extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            company: 1
        }
    }

    //标题配置
    static navigationOptions = ({navigation}) => {
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

    render() {
        return (
            <View>
                <View style={styles.top}>
                    <Text style={{fontSize: 18}}>总收益</Text>
                    <ImageBackground source={require('../images/profit.png')} style={styles.profit}>
                        <Text>SSS</Text>
                    </ImageBackground>
                    <Text style={{fontSize: 18}}>总转移电量</Text>
                    <ImageBackground source={require('../images/profit1.png')} style={styles.profit}>
                        <Text>SSS</Text>
                    </ImageBackground>
                </View>
                <View style={styles.center}>
                    <View style={styles.item}>
                        <Text></Text>
                        <Text>电池容量</Text>
                    </View>
                    <View style={styles.item}>
                        <Text></Text>
                        <Text>运行容量</Text>
                    </View>
                    <View style={styles.item}>
                        <Text></Text>
                        <Text>SOC</Text>
                    </View>
                    <View style={styles.item}>
                        <Text></Text>
                        <Text>当前电量</Text>
                    </View>
                </View>
            </View>
        )
    }
}

export default connect(state => (
    {company: state.company}), {newCompany})(Overview);

const styles = StyleSheet.create({
    top: {
        backgroundColor: 'rgb(66,176,251)',
        alignItems: 'center',
    },
    profit: {
        alignItems: 'center',
        height: 64,
        width: 264,
        marginTop: 10
    },
    center:{
        alignItems:'center',
        flexDirection: 'row',
        backgroundColor:'rgb(86,185,253)'
    },
    item:{
        width:'25%',
        alignItems:'center',
        borderStyle:'solid',
        borderRightWidth:1,
        borderColor:'#fff'

    }
})