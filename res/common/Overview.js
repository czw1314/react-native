import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, Button,ImageBackground} from 'react-native';
import { PixelRatio } from 'react-native';
import {createAppContainer} from "react-navigation";
import {newCompany,getCompanyList,newMonitor} from "../../js/redux/action";
import {getCompany,getIndex} from "../../js/ajax/api";
import {connect} from "react-redux";
import DeviceStorage from "../../js/DeviceStorage/DeviceStorage";
import {scaleSizeH, scaleSizeW, setSpText} from '../js/screenUntil';
import * as Animatable from 'react-native-animatable';
import Svg,{
    Circle,
    Ellipse,
    G,
    TSpan,
    TextPath,
    Path,
    Polygon,
    Polyline,
    Line,
    Rect,
    Use,
    Symbol,
    Defs,
    LinearGradient,
    RadialGradient,
    Stop,
    ClipPath,
    Pattern,
    Mask,
} from 'react-native-svg';


class Overview extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            company: 1,
            userID:'',
            // strokeDashOffset: new Animated.Value(0),
            data:{
                batteryCapa: 150,
                companyActivePower: 570,
                currentKwh: 0,
                dischargeActivePower: 0,
                esActivePower: 1,
                esChargeActivePower: 1,
                gridActivePower: 570.36,
                monitorActivePower: 571,
                runningCapa: 80,
                soc: 0,
                totalChargeKwh: 82.5,
                totalGain: 41971,
            }
        }
    }
    //标题配置
    static navigationOptions = ({navigation}) => {
        return {
                    headerRight: (
                        <View style={{paddingRight:20, flex:1,
                            justifyContent: 'center',
                        }}>
                            <Text onPress={() => navigation.navigate('selectCompany')} style={{fontSize:setSpText(28)}}>
                                {(navigation.state.params?navigation.state.params.company:'')}
                                <Image source={require('../images/company.png')}  style={{height:scaleSizeH(27),width:scaleSizeW(20),resizeMode:'contain'}} resizeMethod={'scale'}/>
                            </Text>

                        </View>
                    ),
            headerStyle: {
                backgroundColor: 'rgb(66,176,251)',
                borderBottomWidth: 0,
                elevation: 0,
            },
        }};
    updateNavigation() {
        this.props.navigation.setParams({
            company: this.props.company.companyName
        });
    }
    componentDidMount() {
        //监听路由变化
        this.props.navigation.addListener(
            'didFocus',
            (obj)=>{
                this.updateNavigation()
                //获取首页数据
                    let params = {monitorID: this.props.company.monitorID};
                    getIndex(params).then((res)=>{
                        console.log(res)
                        if(res.code===1){
                            this.setState({data:res.data})
                            console.log(this.state.data)
                        }
                        else{
                            if(res.code=5000){
                            }
                        }

                    }).catch(err=>{console.log(err)});
            })



    }
    // runAnimation() {
    //     this.state.strokeDashOffset.setValue(0);
    //     Animated.timing(this.state.strokeDashOffset, {
    //         toValue: 400,
    //         duration: 500,
    //     }).start(() => this.runAnimation());
    // }
    //获取公司
    componentWillMount(){
        DeviceStorage.get('userID').then((result)=>{
            let params = {userID: result};
            getCompany(params).then((res)=>{
                if(res.code===1){
                    this.props.getCompanyList(res.data)
                    this.props.newCompany(res.data[0].monitorNameAbbreviation)
                    this.props.newMonitor(res.data[0].monitorID)
                }
                else{
                    if(res.code=5000){
                    }
                }

            })
        })
    }

    render() {
        let AnimatePath = Animatable.createAnimatableComponent(Path);
        return (
            <View>
                <View style={styles.top}>
                    <Text style={{fontSize: setSpText(36),paddingBottom:scaleSizeH(10)}}>总收益</Text>
                    <ImageBackground source={require('../images/profit.png')} style={{height:scaleSizeH(128),width:scaleSizeW(524),resizeMode:'contain',alignItems: 'center',paddingTop:scaleSizeH(16)}}>
                        <Text style={{ fontSize:setSpText(52)}}>¥{this.state.data.totalGain}</Text>
                    </ImageBackground>
                    <Text style={{fontSize:setSpText(36),paddingTop:scaleSizeH(30),paddingBottom:scaleSizeH(10)}}>总转移电量</Text>
                    <ImageBackground source={require('../images/profit1.png')} style={{height:scaleSizeH(126),width:scaleSizeW(524),resizeMode:'contain',alignItems: 'center',paddingTop:scaleSizeH(16)}}>
                        <Text style={{ fontSize:setSpText(52)}}>{this.state.data.totalChargeKwh}MWh</Text>
                    </ImageBackground>
                </View>
                <View style={styles.center}>
                    <View style={[styles.item,{fontSize: setSpText(30)}]}>
                        <Text style={{fontSize: setSpText(30)}}>{this.state.data.batteryCapa}kWh</Text>
                        <Text  style={{fontSize: setSpText(30)}}>电池容量</Text>
                    </View>
                    <View style={[styles.item,{fontSize: setSpText(30)}]}>
                        <Text  style={{fontSize: setSpText(30)}}>{this.state.data.runningCapa}kW</Text>
                        <Text  style={{fontSize: setSpText(30)}}>运行容量</Text>
                    </View>
                    <View style={[styles.item,{fontSize: setSpText(30)}]}>
                        <Text  style={{fontSize: setSpText(30)}}>{this.state.data.soc}%</Text>
                        <Text  style={{fontSize: setSpText(30)}}>SOC</Text>
                    </View>
                    <View style={[styles.item,{fontSize: setSpText(30)}]}>
                        <Text  style={{fontSize: setSpText(30)}}>{this.state.currentKwh}kWh</Text>
                        <Text  style={{fontSize: setSpText(30)}}>当前电量</Text>
                    </View>
                </View>
                <View>
                    <ImageBackground source={require('../images/Overview.jpg')} style={[styles.bottom,{height:scaleSizeH(422),width:scaleSizeW(750),position:'relative'}]}>
                        <Text style={{position: 'absolute', top: scaleSizeH(160), left: scaleSizeH(200), color: '#007aff', fontSize: setSpText(26)}}>{this.state.data.monitorActivePower}kW</Text>
                        <Text style={{position: 'absolute', top: scaleSizeH(160), left: scaleSizeH(420), color: '#007aff', fontSize: setSpText(26)}}>{this.state.data.companyActivePower}kW</Text>
                        <Text style={{position: 'absolute', top: scaleSizeH(340), left: scaleSizeH(420), color: '#007aff', fontSize: setSpText(26)}}>{this.state.data.esActivePower}kW</Text>
                        <View style={{position:'absolute',top:scaleSizeH(180),left: scaleSizeH(180),alignItems:'center'}}>
                            <Svg height="20" width="100">
                                <G fill="none">
                                    <AnimatePath
                                        d="M-200 10 l680 0"
                                        animation={{ from: {
                                                translateX: 0,
                                            },
                                            to: {
                                                translateX: this.state.data.monitorActivePower>0?180:0,
                                            },}}
                                        stroke="#0078FF"
                                        duration='6000'
                                        strokeWidth="1"
                                        strokeDasharray="5,5"
                                        useNativeDriver
                                        easing="linear"
                                        iterationCount='infinite'
                                        // strokeDashoffset={this.state.strokeDashOffset}
                                    />
                                </G>
                            </Svg>
                        </View>
                        <View style={{position:'absolute',top:scaleSizeH(180),left: scaleSizeH(380),alignItems:'center'}}>
                            <Svg height="20" width="90">
                                <G fill="none">
                                    <AnimatePath
                                        d="M-200 10 l680 0"
                                        animation={{ from: {
                                                translateX: 0,
                                            },
                                            to: {
                                                translateX: this.state.data.companyActivePower>0?180:0,
                                            },}}
                                        stroke="#0078FF"
                                        duration='6000'
                                        strokeWidth="1"
                                        strokeDasharray="5,5"
                                        useNativeDriver
                                        easing="linear"
                                        iterationCount='infinite'
                                        // strokeDashoffset={this.state.strokeDashOffset}
                                    />
                                </G>
                            </Svg>
                        </View>
                        <View style={{position:'absolute',top:scaleSizeH(200),left: scaleSizeH(360)}}>
                            <Svg height="90" width="20">
                                <G fill="none">
                                    <AnimatePath
                                        d="M10 -200 l0 800"
                                        animation={{ from: {
                                                translateY: 0,
                                            },
                                            to: {
                                                translateY:this.state.data.esActivePower>=0?(this.state.data.esActivePower>0?180:0):-180}}}

                                        stroke="#0078FF"
                                        duration="6000"
                                        strokeWidth="1"
                                        strokeDasharray="5,5"
                                        useNativeDriver
                                        easing="linear"
                                        iterationCount='infinite'
                                        // strokeDashoffset={this.state.strokeDashOffset}
                                    />
                                </G>
                            </Svg>
                        </View>
                        <View style={{position:'absolute',top:scaleSizeH(360),left: scaleSizeH(380),alignItems:'center'}}>
                            <Svg height="20" width="90">
                                <G fill="none">
                                    <AnimatePath
                                        d="M-200 10 l680 0"
                                        animation={{ from: {
                                                translateX: 0,
                                            },
                                            to: {
                                                translateX:this.state.data.esActivePower>=0?(this.state.data.esActivePower>0?180:0):-180
                                            },}}
                                        stroke="#0078FF"
                                        duration='6000'
                                        strokeWidth="1"
                                        strokeDasharray="5,5"
                                        useNativeDriver
                                        easing="linear"
                                        iterationCount='infinite'
                                        // strokeDashoffset={this.state.strokeDashOffset}
                                    />
                                </G>
                            </Svg>
                        </View>

                        {/*<Text class="xian1"><i class="moveRight"></i></Text>*/}
                    </ImageBackground>
                </View>
            </View>
        )
    }
}

export default connect(state => (
    {company: state.company,companyList:state.companyList}), {newCompany,getCompanyList,newMonitor})(Overview);

const styles = StyleSheet.create({
    top: {
        backgroundColor: 'rgb(66,176,251)',
        alignItems: 'center',
    },
    profit: {
        alignItems: 'center',
        justifyContent: 'center',
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
        paddingTop:6,
        paddingBottom:6,
        alignItems:'center',
        borderStyle:'solid',
        borderRightWidth:1,
        borderColor:'#fff'
    },
    bottom:{
        width:'100%',
        height:300
    }
})