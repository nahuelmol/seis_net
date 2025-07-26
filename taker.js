
const http = require('http')

const { dataAnalysis } = require('./taker_data_analysis.js')

const HOST = 'www.RTK2go.com'
const PORT = '2101'
const MOUNTPOINT = 'SSRA02IGS0' //(IGS01)
const USERNAME = 'molinahuel'
const PASSWORD = 'Contra_nahuel33'

const auth = Buffer.from(`${USERNAME}:${PASSWORD}`).toString('base64')
const options = {
    hostname: HOST,
    port: PORT,
    path:`/${MOUNTPOINT}`,
    method:'GET',
    headers: {
        'Ntrip-Version': 'Ntrip/2.0',
        'User-Agent': 'NTRIP NodeClient/1.0',
        'Authorization': `Basic ${auth}`,
        'Connection': 'close'
    }
};

const req = http.request(options, (res) => {
    if(res.statusCode === 200) {
        res.on('data', chunk => {
            dataAnalysis(chunk)
        })
    } else {
        console.log('err');
    }
})

req.on('error', err => {
    console.log('err: ', err.message);
})
req.end();

