
function dataAnalysis(chunk){
    const dataType = typeof chunk;
    if (Buffer.isBuffer(chunk)) {
        gpsLocater(chunk)
    } else {
        console.log(`working with ${dataType}`)
    }
}


function gpsLocater(data){
    if(data[0] !== 0xD3){
        console.log('Not an RTCM message');
    } else {
        console.log('Right');
    }
    let len = data.length
    const length = ((data[1] & 0x03) << 8) | data[2];
    //console.log('Payload length: ', length)
    const payload = data.slice(3, 3 + length)
    //console.log(payload)
    const payload_type = (payload[0] << 4) || (payload[1] >> 4)
    //console.log('payload type: ', payload_type)
    checking(data)
}

function checking(data) {
    let hexdata = data.toString('hex')
    let starts  = hexdata.slice(0,2)
    if(data[0] == 0xD3){
        console.log('fucking shit')
    } else if ((data[0] === 0xB5) && (data[1] === 0x62)){
        console.log('u-blox UBS message')
    } else if (data[0] ===  0xE2){
        console.log('BINEX format detected');
    } else {
        console.log('unrecognized')
    }
}

module.exports = {
    dataAnalysis,
}
