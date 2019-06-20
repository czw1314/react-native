import React,{Component,PropTypes} from 'react';
import {View,Text,Image,StyleSheet} from 'react-native';
const NAV_BAR_HEIGHT_NDROID=50;
const NAV_BAR_HEIGHT_IOS=50;
const STATUS_BAR_HEIGHT=50;
export default class NavigationBar extends Component{
    //约束条件
    static propTypes={
        style:View.propTypes.style,//View的样式
        title:PropTypes.string,
        titleView:PropTypes.element,
        hide:PropTypes.bool,
        leftButton:PropTypes.element,
        rightButton:PropTypes.element,
    }
    constructor(props){
        super(props)
        this.state={
            title:'',
            hide:false
        }
    }
    render(){
        let titleView=this.props.titleView?this.props.titleView:<Text>{this.props.title}</Text>,
            content=<View>
                {this.props.leftButton}
                {titleView}
                {this.rightButton}
                </View>
        return{
            <View style={styles.container}>
                {content}
            </View>
        }
    }
    
}
const styles=StyleSheet.create({
    container:{
        backgroundColor:'gray'
    }
})