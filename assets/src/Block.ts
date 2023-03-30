// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import * as cc from 'cc';
const {ccclass, property} = cc._decorator;

@ccclass
export default class block extends cc.Component {

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {
        // console.log("start block");
        // cc.log("start block");
    }

    public init(fallDuration: number, fallHeight: number, destroyTime: number, destroyCb: Function) {
        this.scheduleOnce(() => {
            // let fallAction = cc.moveBy(fallDuration, cc.v2(0, -fallHeight)); // 下沉动作
            // this.node.runAction(fallAction);

            this.node.qtPositionY(-fallHeight, fallDuration, {
                onStart: ()=> {
                    // console.log('begin');
                },
                onComplete: ()=> {
                    // console.log('end');
                }
            }).start();

            destroyCb();
        }, destroyTime);
    }
}
