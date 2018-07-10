module.exports = {
    _animIndex: 0,
    _animation: null,
    _animArrLen: 0,
    _animArr: [],
    _cb: Function,
    playAnimArr(sprite, animArr, cb) {
        this._animArr = animArr;
        this._animArrLen = animArr.length;
        this._cb = cb;
        if (this._animArrLen === 0) {
            return;
        }
        // for (let i = 0; i < len; ++i) {
        //     let animation = sprite.node.getComponent(cc.Animation);
        //     let animState = animation.getAnimationState(animArr[i]);
        //     animState.on('finished', this.onFinish.bind(this, i), this);
        // }

        this._animation = sprite.node.getComponent(cc.Animation);
        this._animation.on('finished', this.onFinish, this);
        this._animation.play(this._animArr[this._animIndex]);

    },

    onFinish(event) {
        // console.log(event);
        this._animIndex++;
        if (this._animIndex >= this._animArrLen) {
            this._animation.off('finished', this.onFinish, this);
            this._animIndex = 0;
            this._cb();
            return;
        }
        this._animation.play(this._animArr[this._animIndex]);
    }


}