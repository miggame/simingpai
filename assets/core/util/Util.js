module.exports = {
    loadJsonFile(filePath, cb, target){
        let url = cc.url.raw('resources/'+filePath+'.json');
        cc.loader.load(url, function(err, results){
            if(err){
                console.log('read json failed');
            } else {
                console.log('read json success');
                // cb(results);
                cb.call(target, results);
            }
        }.bind(this));
    },
}