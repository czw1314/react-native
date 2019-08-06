import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, Button, ImageBackground} from 'react-native';
import {PixelRatio} from 'react-native';
import {createAppContainer} from "react-navigation";
import {newCompany, getCompanyList, newMonitor} from "../../js/redux/action";
import {getRealtimeMonitor} from "../../js/ajax/api";
import {connect} from "react-redux";
import DeviceStorage from "../../js/DeviceStorage/DeviceStorage";
import {scaleSizeH, scaleSizeW, setSpText} from '../js/screenUntil';
import Echarts from 'native-echarts';

class Apps extends Component {
    render() {
        const option = {
            title: {
                text: 'ECharts demo'
            },
            tooltip: {},
            legend: {
                data:['销量']
            },
            xAxis: {
                data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
            },
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20]
            }]
        };
        return (
            <Echarts option={option} height={300} />
        );
    }
}

class Monitor extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            company: 1,
            userID: '',
            data: {
                activeDemand: 232,
                activePower: 218,
                dataTime: "01-19 10:37",
                loadMonitor: {},
                maxDemand: 592,
                maxDemandTime: "07-23 16:39",
                planDemand: 0,
                status: []
            }
        }
    }

    //标题配置
    static navigationOptions = ({navigation}) => {
        return {
            headerRight: (
                <View style={{
                    paddingRight: 20, flex: 1,
                    justifyContent: 'center',
                }}>
                    <Text onPress={() => navigation.navigate('selectCompany')} style={{fontSize: setSpText(28)}}>
                        {(navigation.state.params ? navigation.state.params.company : '')}
                        <Image source={require('../images/company.png')}
                               style={{height: scaleSizeH(27), width: scaleSizeW(20), resizeMode: 'contain'}}
                               resizeMethod={'scale'}/>
                    </Text>

                </View>
            ),
            headerStyle: {
                backgroundColor: 'rgb(66,176,251)',
                borderBottomWidth: 0,
                elevation: 0,
            },
        }
    };

    updateNavigation() {
        this.props.navigation.setParams({
            company: this.props.company.companyName
        });
    }

    componentDidMount() {
        //监听路由变化
        this.props.navigation.addListener(
            'didFocus',
            (obj) => {
                this.updateNavigation()
                //获取首页数据
                let params = {monitorID: this.props.company.monitorID};
                getRealtimeMonitor(params).then((res) => {
                    console.log(res)
                    if (res.code === 1) {
                        this.setState({data: res.data})
                        console.log(this.state.data)
                    }
                    else {
                        if (res.code = 5000) {
                        }
                    }

                }).catch(err => {
                    console.log(err)
                });
            })


    }

    render() {
        return (
            <View>
                <View style={styles.top}>
                    <View style={styles.item}>
                        <Image source={require('../images/jk_a1.png')} style={{   height: scaleSizeH(74), width: scaleSizeW(66)}}/>
                        <View style={{paddingLeft:6, color:'#fff',}}>
                        <Text style={{fontSize:setSpText(28), color:'#fff',}}>当前负荷</Text>
                        <Text style={{fontSize:setSpText(30),fontWeight:('bold', '700'),marginTop:4, color:'#fff',}}>{this.state.data.activePower}kW</Text>
                        </View>
                    </View>
                    <View  style={styles.item}>
                        <Image source={require('../images/jk_a2.png')} style={{   height: scaleSizeH(74), width: scaleSizeW(66)}}/>
                        <View style={{paddingLeft:6}}>
                        <Text style={{fontSize:setSpText(28), color:'#fff',}}>实时需量</Text>
                        <Text style={{fontSize:setSpText(30),fontWeight:('bold', '700'),marginTop:4, color:'#fff',}}>{this.state.data.activeDemand}kW</Text>
                        </View>
                    </View>
                    <View  style={styles.item}>
                        <Image source={require('../images/jk_a3.png')} style={{   height: scaleSizeH(74), width: scaleSizeW(66)}}/>
                        <View style={{paddingLeft:6,}}>
                        <Text style={{fontSize:setSpText(28), color:'#fff',}}>计划需量</Text>
                        <Text style={{fontSize:setSpText(30),fontWeight:('bold', '700'),marginTop:4, color:'#fff',}}>{this.state.data.planDemand}kW</Text>
                        </View>
                    </View>
                    <View  style={styles.item}>
                        <Image source={require('../images/jk_a4.png')} style={{   height: scaleSizeH(74), width: scaleSizeW(66)}}/>
                        <View style={{paddingLeft:6,}}>
                        <Text style={{fontSize:setSpText(28), color:'#fff',}}>最大需量</Text>
                        <Text style={{fontSize:setSpText(30),fontWeight:('bold', '700'),marginTop:4, color:'#fff',}}>{this.state.data.maxDemand}kW</Text>
                        <Text style={{fontSize:setSpText(28), color:'#fff',}}>{this.state.data.maxDemandTime}</Text>
                        </View>
                    </View>
                </View>
                <View style={{backgroundColor: 'rgb(86,185,253)'}}>
                    <View style={styles.center}>
                        <View style={{ flexDirection: 'row',width:scaleSizeW(166),alignItems:'center'}}>
                            <Image source={require('../images/history.jpg')} style={{   height: scaleSizeH(60), width: scaleSizeW(46)}}/>
                            <Text style={{marginLeft:8,color:'#fff',fontSize:setSpText(28)}}>充放记录</Text>
                        </View>
                        <View style={{flex:1}}></View>
                        <Image source={require('../images/arrow.jpg')} style={{   height: scaleSizeH(34), width: scaleSizeW(16)}}/>
                    </View>
                    <View style={{borderBottomWidth:0.5,borderBottomColor:'#fff',marginLeft:10,marginRight:10,height:0,backgroundColor: 'rgb(86,185,253)'}}></View>
                    <View style={styles.center}>
                        <View style={{ flexDirection: 'row',width:scaleSizeW(166),alignItems:'center'}}>
                            <Image source={require('../images/stystem.jpg')} style={{   height: scaleSizeH(52), width: scaleSizeW(48)}}/>
                            <Text style={{marginLeft:8,color:'#fff',fontSize:setSpText(28)}}>系统状态</Text>
                        </View>
                        <View style={{flex:1}}></View>
                        <Image source={require('../images/arrow.jpg')} style={{   height: scaleSizeH(34), width: scaleSizeW(16)}}/>
                    </View>
                </View>
                <View><Text>今日负荷曲线</Text></View>
                <Apps/>
            </View>
        )
    }
}

export default connect(state => (
    {company: state.company, companyList: state.companyList}), {newCompany, getCompanyList, newMonitor})(Monitor);

const styles = StyleSheet.create({
    top: {
        backgroundColor: 'rgb(66,176,251)',
        alignItems: 'center',
        flexDirection: 'row',
        flexWrap:'wrap'
    },
    profit: {
        alignItems: 'center',
        justifyContent: 'center',
        width: 264,
        marginTop: 10
    },
    center: {
        alignItems: 'center',
        flexDirection: 'row',
        padding:10,
        backgroundColor: 'rgb(86,185,253)'
    },
    item: {
        width: '50%',
        paddingTop: 6,
        paddingLeft:20,
        color:'#fff',
        flexDirection: 'row',
        paddingBottom: 6,
        alignItems: 'center',
    },
    bottom: {
        width: '100%',
        height: 300
    }
})