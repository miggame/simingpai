module.exports = {

    playAnim(sprite, arr, index = 0, cb = undefined) {
        let animation = sprite.node.getComponent(cc.Animation);
        animation.on('finished', function (event) {
            index++;
            if (index >= arr.length) {
                if (cb !== null || cb !== undefined) {
                    console.log('hh');
                    cb();//TODO 触发多次？
                    return;
                }
                return;
            }
            this.playAnim(sprite, arr, index, cb);
        }.bind(this), this);
        animation.play(arr[index]);
    }
}