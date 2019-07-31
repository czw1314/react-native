import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, Image, Button, ImageBackground,FlatList,TouchableOpacity} from 'react-native';
import {createAppContainer} from "react-navigation";
import {newCompany,getCompanyList,newMonitor} from "../../js/redux/action";
import {getCompany} from "../../js/ajax/api";
import {connect} from "react-redux";
import DeviceStorage from "../../js/DeviceStorage/DeviceStorage";
//列表分割线
class ItemDivideComponent extends Component {
    render() {
        return (
            <View style={{height: 1, backgroundColor: 'skyblue'}}/>
        );
    }
};

class Overview extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            company: 1,
            companyList:[{monitorID:'s'}]
        }
    }
    //标题配置
    static navigationOptions = ({navigation}) => {
        return {
            headerTitle:'储能选择',
            headerStyle: {
                backgroundColor: '#42b0fc',
            },
            headerTitleStyle: {
                flex:1,
                textAlign: 'center'
            },
            headerRight: (
                <View/>
            ),
        };
    };
    //为每个item加入key值
   companyID(item){
       return item.monitorID
    }
    //点击确认选择的公司
    onItemClick(item) {
       this.props.newMonitor(item.monitorID)
        this.props.newCompany(item.monitorNameAbbreviation)
    }
    //获取公司
    // componentWillMount(){
    //     DeviceStorage.get('userID').then((result)=>{
    //         let params = {userID: result};
    //         getCompany(params).then((res)=>{
    //             console.log(res)
    //             if(res.code===1){
    //                 this.props.getCompanyList(res.data)
    //             }
    //             else{
    //                 if(res.code=5000){
    //
    //                 }
    //             }
    //
    //         })
    //     })
    // }

    render() {
        return (
            <View>
                <FlatList
                    keyExtractor={this.companyID}
                    ItemSeparatorComponent={ItemDivideComponent}
                    data={this.props.companyList[0]}
                    renderItem={({item}) =>
                        <TouchableOpacity>
                        <Text style={styles.item} onPress={() => {this.onItemClick(item),this.props.navigation.navigate('Overview')}}>{item.monitorNameAbbreviation}</Text>
                        </TouchableOpacity>}

                />
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
    item:{
        fontSize:20,
        paddingTop:10,
        paddingLeft:20,
        paddingBottom:10
,        // height:300
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
    bottom:{
        width:'100%',
        height:300
    }
})