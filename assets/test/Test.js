let Observer = require('Observer');
let UIMgr = require('UIMgr');
cc.Class({
    extends: Observer,

    properties: {
        spPlayer: { displayName: 'spPlayerk', default: null, type: cc.Sprite },
        touchLayer: { displayName: 'touchLayer', default: null, type: cc.Node },
    },

    // LIFE-CYCLE CALLBACKS:
    _getMsgList() {
        return [];
    },

    _onMsg(msg, data) {

    },

    onLoad() {
        this._initMsg();
        this.touchLayer.on('touchstart', function (event) {
            // this.spPlayer.node.getComponent(cc.Animation).play('jump');
            UIMgr.playAnimArr(this.spPlayer, ['jump', 'roll', 'down'], () => {
                // this.spPlayer.node.scaleY = -this.spPlayer.node.scaleY;
            });
        }.bind(this));
    },

    start() {

    },

    // update (dt) {},
});
