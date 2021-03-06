let Observer = require('Observer');
let UIMgr = require('UIMgr');
let Util = require('Util');
let BlockTemmplates = require('BlockTemplates');
let GameData = require('GameData');
// let FSMMgr = require('FSMMgr');
cc.Class({
    extends: Observer,

    properties: {
        spPlayer: { displayName: 'spPlayerk', default: null, type: cc.Sprite },
        touchLayer: { displayName: 'touchLayer', default: null, type: cc.Node },
        _stageData: null,

        blockLayer: { displayName: 'blockLayer', default: null, type: cc.Node },

        physicsPre: { displayName: 'physicsPre', default: null, type: cc.Prefab },
        physicsLayer: { displayName: 'physicsLayer', default: null, type: cc.Node },
        _fsmMgr: null
    },

    // LIFE-CYCLE CALLBACKS:
    _getMsgList() {
        return [
            GameLocalMsg.Msg.Run,
        ];
    },

    _onMsg(msg, data) {
        if (msg === GameLocalMsg.Msg.Run) {
            console.log('run');
            if (data === 1) {

            } else if (data === -1) {

            }
        }
    },

    onLoad() {
        this._initMsg();
        this._state = GameData.state.CenterToDown;
        cc.director.getPhysicsManager().enabled = true;
        cc.director.getPhysicsManager().debugDrawFlags = cc.PhysicsManager.DrawBits.e_aabbBit |
            cc.PhysicsManager.DrawBits.e_pairBit |
            cc.PhysicsManager.DrawBits.e_centerOfMassBit |
            cc.PhysicsManager.DrawBits.e_jointBit |
            cc.PhysicsManager.DrawBits.e_shapeBit
            ;
        cc.director.getPhysicsManager().gravity = GameData.gravity;

        this.touchLayer.on('touchend', this._changeGravity, this);

        Util.loadJsonFile('data/json/stageData/Stage1', this._initBlock, this);
        Util.loadJsonFile('data/json/stageShapeData/stageShape1', this._initPhysics, this);
        this.spPlayer.node.position = cc.p(50, 320);

        // this._body = this.spPlayer.node.getComponent(cc.RigidBody);
        // this._body._registerNodeEvents();
        // this.spPlayer.node.on('rotation-changed', function () {
        //     this._body.syncPosition(false)
        // }.bind(this));
    },

    start() {

    },

    update(dt) {
        let body = this.spPlayer.node.getComponent(cc.RigidBody);
        let speed = body.linearVelocity;
        speed.x = GameData.runSpeed['RunningMan'] * dt;
        body.linearVelocity = speed;

    },

    _initBlock(results) {
        this._stageData = results;
        console.log(this._stageData);
        this.blockLayer.destroyAllChildren();
        let arr = this._stageData.blockList;
        for (const item of arr) {
            let name = BlockTemmplates.getBlockNameById(item.templateID);
            let x = item.x;
            let y = item.y;
            let order = item.zOrder;
            cc.loader.loadRes('blockPre/' + name, function (err, prefab) {
                if (err) {
                    console.log('init block err: ', err);
                    return;
                }
                let blockNode = cc.instantiate(prefab);
                this.blockLayer.addChild(blockNode);
                blockNode.position = cc.p(x, y);
                blockNode.setLocalZOrder(order);
            }.bind(this));
        }
    },

    _changeGravity() {
        console.log('changeGravity');
        GameData.gravity.y = -GameData.gravity.y;
        cc.director.getPhysicsManager().gravity = GameData.gravity;

        // UIMgr.playAnim(this.spPlayer, 'roll');
        UIMgr.playAnim(this.spPlayer, ['jump', 'roll'], 0, function (event) {
            // console.log('done');
        });

    },

    _initPhysics(results) {
        let data = results.physics;
        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                const element = data[key];
                let len = element.length / 2;
                let arr = [];
                for (let i = 0; i < len; ++i) {
                    let x = element[2 * i];
                    let y = element[2 * i + 1];
                    arr.push(cc.p(x, y));
                }
                this._createPhysicsNode(arr);
            }
        }
    },

    _createPhysicsNode(arr) {

        let physicsNode = new cc.Node();
        this.physicsLayer.addChild(physicsNode);
        physicsNode.addComponent(cc.RigidBody);
        physicsNode.addComponent(cc.PhysicsPolygonCollider);
        physicsNode.getComponent(cc.RigidBody).type = 0;
        physicsNode.getComponent(cc.PhysicsPolygonCollider).points = arr;
        physicsNode.getComponent(cc.PhysicsPolygonCollider).apply();
    },
});
