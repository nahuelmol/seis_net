const fs = require('fs')

function isObs(file) {
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

function ObsReader(file){
    if (!isObs(file)) {
        return "it's not a Observational file";
    }
    let version = get(file, 'VERSION')
    let mixed = get(file, 'MIXED')
    const header = { 
        version, 
        mixed
    }
    return header
}


function ReadFolderData(project){
    const must_type = ['obs', 'nav', 'clk', 'sp3','blq']
    let exists      = [0,0,0,0,0]
    let files = ['','','','','']

    format = ''
    dirpath = `data/${project}`
    fs.readdir(dirpath, (err, files) => {
        files.forEach(filename => {
            filename.reverse().forEach(c => {
                if (c == '.') {
                    type = format.reverse() 
                    if(must_type.includes(type)){
                        let i       = must_type.indexOf(type)
                        exsits[i]   = 1
                        files[i]    = filename
                    }
                    format = ''
                    break;
                } else {
                    format += c;
                }
            })
        })
    })
    let nonexistent = ''
    let incomplete = false
    exists.forEach(each => {
        if(each == 0){
            typeindex = exists.indexOf(each)
            nonexistent += must_type[typeindex]
            nonexistent += '\n'
            incomplete = true
        }
    })
    if (incomplete) {
        let msg = `The project does not have:\n` + nonexistent
    }
    let obsIndex = must_type.indexOf('obs')
    let navIndex = must_type.indexOf('nav')
    let clkIndex = must_type.indexOf('clk')
    let sp3Index = must_type.indexOf('sp3')
    let blqIndex = must_type.indexOf('blq')
    ObsReader(files[obsIndex])
    NavReader(files[navIndex])
    ClkReader(files[clkIndex])
    Sp3Reader(files[sp3Index])
    BlqReader(files[blqIndex])

    //this or a loop with a FileReader function and iterating over files
}

let RECEPTORS = [
    'TRIMBLE',
    'LEICA',
    'SEPTENTRIO',
    'NOVATEL',
    'TOPCON',
]

class GNSSReceptor {
    constructor(data){
        this.available  = this.checkIfAvailable(this.data.type);
        this.type       = data.type
        this.name       = data.name;
        this.builder    = data.builder;
        this.nchannels  = data.channels;
        let set = this.setFiles(data.type);
        
        if(set.res){
            this.files_set = set.cnt
        } else {
            this.files_set = 'not a set'
            print(set.msg)
        }
    }

    convertToRinex(){
        if(this.files_set){
            //if a set of files do exists then.. start the conversion
        }
    }

    checkIfAvailable(receptor_type) {
        if(RECEPTORS.includes(receptor_type)) {
            return true;
        } else {
            return false;
        }
    }
    setFiles(type){
        files_set = []
        if(type == 'trimble') {
            files_set = [
                't02',
                't01',
                'dat'
            ]
        } else if(type == 'leica'){
            files_set = [
                'm00',
                'm01', //etc
                'skf',
                'gkf',
                'jxl',
                'dc',
                'gsi',
                'mdb',
                'lb2'
            ]
        } else if(type == 'septentrio'){
            files_set = [
                'sbf',
                'ini',
                'log',
                'txt',
                'csv'
            ]
            //septentrio tool for converting to RINEX
            //sbf2rinex
        } else if(type == 'novatel') {
            files_set = [
                'ubx',
                'bin',
                'log',
                'cfg',
                'ini',
            ]
            //novatel utility for converting to RINEX
        } else if(type == 'topcon') {
            files_set = [
                'tps', 
                'tpb',
                'tgd', 
                'log' 
            ]
        } else {
            return {    
                res:false, cnt:null, 
                msg: 'receptor type not recognized' }
        }

        return { 
            res:true, cnt:files_set, msg:'type recognized'} 
    }
}



let index(receptor){
    //check if receptor is available
    //this receptor will be a GNNSReceptor
    let RECEPTOR = new GNSSReceptor(receptor.data);
}

