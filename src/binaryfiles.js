const fs = require('fs')

async function readTheBinary(filepath, numBytes, offset){
    let file;
    try {
        file = await fs.open(filepath, 'r');
        buffer = Buffer.alloc(numBytes);
        const { bytesRead, buffer: readBuffer } = await file.read(buffer,
            0, numBytes, offset);
        console.log(typeof data)
    } catch(e) {
        console.log(e)
    } finally {
        if (file) {
            await file.close();
        }
    }
}

module.exports = {
    readTheBinary,
}
