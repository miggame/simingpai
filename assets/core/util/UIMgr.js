module.exports = {

    playAnim(sprite, arr, index = 0, cb = undefined) {
        let animation = sprite.node.getComponent(cc.Animation);
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
        sprite.node.getComponent(cc.Animation).off('finished');
        index++;
        if(index>=arr.length){
            if(cb!==null || cb!==undefined){
                cb();
                return;
            } else {
                return;
            }
        } else {
            this.playAnim(sprite, arr, index, cb);
        }
    }


}