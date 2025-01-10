
function take_type(path) {
    let len = path.length;
    let format = '.';
    for (var i = len; i>0; i--) {
        if(i == '.') {
            break;
        }
        format = i + format;
    }
    format = format.reverse();
    console.log(format);
}


function clean_data (path) {
    const available_datatype = ['.csv', '.tsv']; 
    let filetype = take_type(path);
    if (available_datatype.includes(filetype) != 0) {
        console.log('available datatype');
    } else {
        throw new UnavailableData();
    }
}
