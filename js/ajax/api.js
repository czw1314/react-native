import axios from 'react-native-axios';

let base = 'https://powercombo.cn/powercombo-rest';
// let base = 'http://120.78.228.145/powercombo-rest';

const qs = require('qs');

export const requestLogin = params => {
    return axios.post(`${base}/user/login`, qs.stringify(params), {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
        },
    }).then(res => res.data);
};
export const getCompany = params => {
    return axios.post(`${base}/monitor/esmonitors`, qs.stringify(params),
        {
            headers: {
                'Authorization': 'Bearer ' + 'eyJhbGciOiJIUzUxMiJ9.eyJ1c2VySUQiOiIxNjg4IiwiZXhwIjoxNTYxNDkyNTcxLCJzdWIiOiJQb3dlckNvbWJvQXBwIn0.KJX7DuAOy8FOCOJjgSCh0JvtX12Tvgc5hPlOZ_NCAtKI5v-bHdROR-AwwTNOK1959sYManxO0cBrpNBQb8KLtQ',
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
            }
        }).then(res => res.data);
};