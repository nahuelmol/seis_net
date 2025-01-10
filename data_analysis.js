const path = 'data/tohoku_2011/max_acc_list.txt'
fetch(path)
    .then(res => res.text()
    )
    .then(content => {
        console.log(content);
    })
    .catch(err => console.log(err));
