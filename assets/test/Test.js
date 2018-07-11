let Observer = require('Observer');
let UIMgr = require('UIMgr');
let Util = require('Util');
let BlockTemmplates = require('BlockTemplates');
cc.Class({
    extends: Observer,

    properties: {
        spPlayer: { displayName: 'spPlayerk', default: null, type: cc.Sprite },
        touchLayer: { displayName: 'touchLayer', default: null, type: cc.Node },
        _stageData: null,
        blockLayer: { displayName: 'blockLayer', default: null, type: cc.Node },
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
        // cc.director.getPhysicsManager().debugDrawFlags = cc.PhysicsManager.DrawBits.e_aabbBit |
        // cc.PhysicsManager.DrawBits.e_pairBit |
        // cc.PhysicsManager.DrawBits.e_centerOfMassBit |
        // cc.PhysicsManager.DrawBits.e_jointBit |
        // cc.PhysicsManager.DrawBits.e_shapeBit
        // ;
        cc.director.getPhysicsManager().gravity = cc.v2(0, -320);

        // this.touchLayer.on('touchstart', function (event) {
        //     // this.spPlayer.node.getComponent(cc.Animation).play('jump');
        //     UIMgr.playAnimArr(this.spPlayer, ['jump', 'roll', 'down'], () => {
        //         // this.spPlayer.node.scaleY = -this.spPlayer.node.scaleY;
        //     });
        // }.bind(this));
        // console.log(cc.find('Canvas/stageLayer/Block0'));
        // console.log(cc.find('Canvas/stageLayer/Block1'));
        // Util.readJsonData('data/json/stageData/Stage1', this._loadStage);
        // let self = this;
        Util.loadJsonFile('data/json/stageData/Stage1', this._initBlock, this);
        
 
    },

    start() {

    },

    // update (dt) {},
    _initBlock(results){
        this._stageData = results;
        console.log(this._stageData);
        this.blockLayer.destroyAllChildren();
        let arr = this._stageData.blockList;
        for (const item of arr) {
            let name = BlockTemmplates.getBlockNameById(item.templateID);
            let x = item.x;
            let y = item.y;
            let order = item.zOrder;
            cc.loader.loadRes('blockPre/'+name, function(err, prefab){
                if(err){
                    console.log('init block err: ', err);
                    return;
                }
                let blockNode = cc.instantiate(prefab);
                console.log('this.blockLayer: ', this.blockLayer);
                this.blockLayer.addChild(blockNode);
                blockNode.position = cc.p(x, y);
                blockNode.setLocalZOrder(order);
            }.bind(this));
        }
    }
});
