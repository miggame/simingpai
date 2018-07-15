module.exports = {
    _animation: null,
    _index: 0,
    playAnim(sprite, arr, index = 0, cb = undefined) {
        this._index = index;
        this._animation = sprite.node.getComponent(cc.Animation);
        let event = { 'arr': arr, 'sprite': sprite, 'cb': cb };
        this._animation.on('finished', this._onFinished.bind(this, event));
        if (arr.length < 0) {
            return;
        }
        if (index < arr.length) {
            this._animation.play(arr[this._index]);
        }
    },

    _onFinished(event) {
        let sprite = event.sprite;
        let arr = event.arr;
        let cb = event.cb;
        this._index++;
        console.log('arr:', arr.length);
        console.log('newIndex:', this._index);
        if (this._index >= arr.length) {
            console.log('return0');
            this._animation.off('finished', this._onFinished);
            this._index = 0;
            // return;
        } else {
            // this.playAnim(sprite, arr, newIndex, cb);
            this._animation.play(arr[this._index]);
            console.log('return1');
        }
    }
}