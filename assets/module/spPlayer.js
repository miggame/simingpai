let Observer = require('Observer');
let ObserverMgr = require('ObserverMgr');

cc.Class({
    extends: Observer,

    properties: {
        _collider: false
    },

    // LIFE-CYCLE CALLBACKS:
    _getMsgList() {
        return [];
    },

    _onMsg(msg, data) {

    },
    onLoad() {
        this._initMsg();
        this._collider = false;
    },

    start() {

    },

    // update (dt) {},

    // 只在两个碰撞体开始接触时被调用一次
    onBeginContact(contact, selfCollider, otherCollider) {
    
        this._collider = true;
        let normal = contact.getWorldManifold().normal;

        let data = normal.y;
        if (data === 1 || data === -1) {
            ObserverMgr.dispatchMsg(GameLocalMsg.Msg.Run, data);
        }
    },

    // 只在两个碰撞体结束接触时被调用一次
    onEndContact(contact, selfCollider, otherCollider) {
        this._collider = false;
        console.log('结束');
    },

    // 每次将要处理碰撞体接触逻辑时被调用
    onPreSolve(contact, selfCollider, otherCollider) {

    },

    // 每次处理完碰撞体接触逻辑时被调用
    onPostSolve(contact, selfCollider, otherCollider) {

    }

});
