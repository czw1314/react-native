import axios from 'react-native-axios';
import AsyncStorage from "@react-native-community/async-storage";

let base = 'https://powercombo.cn/powercombo-rest';
// let base = 'http://120.78.228.145/powercombo-rest';
const accessKey = ''

const qs = require('qs');

async function getAccessKey() {
    await AsyncStorage.getItem('accessKey').then((result) => {
        accessKey = result
    })
}

export const requestLogin = params => {
    return axios.post(`${base}/user/login`, qs.stringify(params), {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
    }).then(res => res.data);
};
//获取公司
async function getCompany(params) {
    return await AsyncStorage.getItem('accessKey').then((result) => {
        return axios.post(`${base}/monitor/esmonitors`, qs.stringify(params),
            {
                headers: {
                    'Authorization': 'Bearer ' + result.replace("\"", "").replace("\"", ""),
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
                }
            }).then(res => res.data);
    })
};
//首页数据
async function getIndex(params) {
    return await AsyncStorage.getItem('accessKey').then((result) => {
        return axios.post(`${base}/newapp/pandect`, (params),
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Cache-Control': 'no-cache',
                    'Postman-Token': '6d36b542-39b9-1a90-a97d-4e78f3e39e91',
                    'Authorization': 'Bearer ' + result.replace("\"", "").replace("\"", ""),
                }
            }).then(res => res.data)
    })
};
//实时监控
async function getRealtimeMonitor (params) {
    return await AsyncStorage.getItem('accessKey').then((result) => {
        return axios.post(`${base}/newapp/realtimeMonitor`, (params),
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Cache-Control': 'no-cache',
                    'Postman-Token': '6d36b542-39b9-1a90-a97d-4e78f3e39e91',
                    'Authorization': 'Bearer ' + result.replace("\"", "").replace("\"", ""),
                }
            }).then(res => res.data)
    })
};

export {getCompany,getIndex,getRealtimeMonitor}