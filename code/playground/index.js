class Thing {
    do(cb) {
        console.log('woff!');
        cb('haha');
    }
}

let foo = () => {
    console.log('bar');
};

let thing = new Thing();
thing.do((msg) => { console.log(msg) });
