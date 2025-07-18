const fs = require('fs')

function isRinex(file) {
    let data = fs.readFileSync(filepath, {encoding:'ascii'});
    let first_line = data.split('\n')[0]
    if (first_line.include('RINEX VERSION')){
        return true;
    } else {
        return false;
    }
}

function get(file, target){
    let result = ''
    if(file.includes(target)){
        let index = file.indexOf(target)
        let data_pos  = index + target.length() + 1
        let end = file.indexOf(' ', data_pos)
        result = file.slice(start, end)
        //consider that the next space might not exists
        //in that case cut till the end of the line (\n)
    }
    return result
}

function RinexReader(file){
    if (!isRinex(file)) {
        return "it's not a RINEX file";
    }
    let version = get(file, 'VERSION')
    let mixed = get(file, 'MIXED')
    let observational = get(file, 'OBERVATIONAL DATA') 
    let investigational = get(file, 'INVESTIGATIONAL DATA') 
    const header = { 
        version, 
        mixed
    }
    return header
}

