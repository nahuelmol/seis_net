//the thing is that the file is not tab separated, it has multiple spaces
const path = 'data/tohoku_2011/max_acc_list.txt'
fetch(path)
    .then(res => res.text()
    )
    .then(content => {
        clean_data = delete_header(content);
        makin_dataset(clean_data);
        console.log(content);
    })
    .catch(err => console.log(err));


function delete_header(raw_data) {
    return data;
}
function makin_dataset(data) {
    let places = [];
    let buffer = '';
    let count_spaces = 0;
    let len = data.length;
    let row = '';
    for (let i=0; i<len; i++) {
        buffer = buffer + i;
        if (i == ' ') {
            row = row + buffer;
            if(count_spaces == 1) {
                buffer = buffer + '\t';
            } else {
                count_spaces++;
            }
        } else {
            count_spaces = 0;
        }
    }
}
