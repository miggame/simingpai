let Observer = require('Observer');
let UIMgr = require('UIMgr');
let Util = require('Util');
let BlockTemmplates = require('BlockTemplates');
let GameData = require('GameData');
cc.Class({
    extends: Observer,

    properties: {
        spPlayer: { displayName: 'spPlayerk', default: null, type: cc.Sprite },
        touchLayer: { displayName: 'touchLayer', default: null, type: cc.Node },
        _stageData: null,
        // _speed: null,
        blockLayer: { displayName: 'blockLayer', default: null, type: cc.Node },
        pNode:cc.Node,
        physicsPre: { displayName: 'physicsPre', default: null, type: cc.Prefab },
        physicsLayer: { displayName: 'physicsLayer', default: null, type: cc.Node },
    },

    // LIFE-CYCLE CALLBACKS:
    _getMsgList() {
        return [];
    },

    _onMsg(msg, data) {

    },

    onLoad() {
        this._initMsg();

        cc.director.getPhysicsManager().enabled = true;
        cc.director.getPhysicsManager().debugDrawFlags = cc.PhysicsManager.DrawBits.e_aabbBit |
            cc.PhysicsManager.DrawBits.e_pairBit |
            cc.PhysicsManager.DrawBits.e_centerOfMassBit |
            cc.PhysicsManager.DrawBits.e_jointBit |
            cc.PhysicsManager.DrawBits.e_shapeBit
            ;
        cc.director.getPhysicsManager().gravity = GameData.gravity;

        // this.touchLayer.on('touchstart', function (event) {
        //     // this.spPlayer.node.getComponent(cc.Animation).play('jump');
        //     UIMgr.playAnimArr(this.spPlayer, ['jump', 'roll', 'down'], () => {
        //         // this.spPlayer.node.scaleY = -this.spPlayer.node.scaleY;
        //     });
        // }.bind(this));

        this.touchLayer.on('touchstart', this._changeGravity, this);

        Util.loadJsonFile('data/json/stageData/Stage2', this._initBlock, this);
        Util.loadJsonFile('data/json/stageShapeData/stageShape1', this._initPhysics, this);
        this.spPlayer.node.position = cc.p(50, 320);
        // this._speed = GameData.runSpeed['RunningMan'];
        console.log(this.pNode.getComponent(cc.PhysicsPolygonCollider));
        
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
    },

    _initPhysics(results){
        // console.log('result: ', results);
        let totalArr = [];
        for (const key in results) {
            if (results.hasOwnProperty(key)) {
                const element = results[key];
                console.log('element: ', element);
                let len = element.length/2;
                let arr = [];
                for(let i = 0;i<len;++i){
                    let x = element[2*i];
                    let y = element[2*i+1];
                    arr.push(cc.p(x, y));
                }
                // totalArr.push(arr);
                this._createPhysicsNode(arr);
            }
        }
    },

    _createPhysicsNode(arr){
        let physicsNode = cc.instantiate(this.physicsPre);
        this.physicsLayer.addChild(physicsNode);
        physicsNode.getComponent(cc.PhysicsPolygonCollider).points = arr;
    }
});
