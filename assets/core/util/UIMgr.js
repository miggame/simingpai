module.exports = {

    playAnim(sprite, arr, index, cb) {
        
        let animation = sprite.node.getComponent(cc.Animation);
        // animation.stop();
        animation.off('finished');
        animation.play(arr[index]);
        let event = {
            'sprite': sprite,
            'arr': arr,
            'index': index,
            'cb': cb
        };
        animation.on('finished', this._onFinished.bind(this, event), this);
    },

    _onFinished(event){
     
        let sprite = event.sprite;
        let arr = event.arr;
        let index = event.index;
        let cb = event.cb;
        index++;
        
        if(index>=arr.length){
            cb();
        } else {
            this.playAnim(sprite, arr, index, cb);
        }

    }


}