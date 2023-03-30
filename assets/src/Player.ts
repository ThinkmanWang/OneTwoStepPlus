// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import * as cc from 'cc';
const {ccclass, property} = cc._decorator;

@ccclass
export default class Player extends cc.Component {

    private stepDistance: number; // 一步跳跃距离
    private jumpHeight: number; // 跳跃高度
    private jumpDuration: number; // 跳跃持续时间
    private fallDuration: number; // 坠落持续时间
    private fallHeight: number; // 坠落高度
    public canJump: boolean; // 此时是否能跳跃
    public index: number; // 当前跳到第几格

    public init(stepDistance: number, jumpHeight: number, jumpDuration: number, fallDuration: number, fallHeight: number) {
        this.stepDistance = stepDistance;
        this.jumpHeight = jumpHeight;
        this.jumpDuration = jumpDuration;
        this.fallDuration = fallDuration;
        this.fallHeight = fallHeight;
        this.canJump = true;
        this.index = 0;
    }

    public jump(step: number) {
        if (step === 1) {
            cc.log('我跳了1步');
            console.log("jump 1 step");
        } else if (step === 2) {
            cc.log('我跳了2步');
            console.log("jump 2 step");
        }

        this.canJump = false;
        this.index += step;

        this.node.qtJumpPosition(cc.v3(this.node.position.x + step * this.stepDistance, -34, 0), this.jumpHeight, 1, this.jumpDuration, {
            onStart: ()=> {
                console.log('begin');
            },
            onComplete: ()=> {
                console.log('end');
                this.canJump = true;
            }
        }).start();

        // var anim = this.getComponent(cc.Animation);
        // anim.play("")

        
        // let jumpAction = cc.ccju(this.jumpDuration, cc.v2(step * this.stepDistance, 0), this.jumpHeight, 1);
        // let finishAction = cc.callFunc(() => {
        //     this.canJump = true;
        // });
        // this.node.runAction(cc.sequence(jumpAction, finishAction));
    }

    public die() {
        cc.log('我死了');

        this.canJump = false;
        this.node.qtJumpPosition(cc.v3(0, this.node.position.y-this.fallHeight, 0), -this.fallHeight, 1, this.fallDuration, {
            onStart: ()=> {
                console.log('begin');
            },
            onComplete: ()=> {
                console.log('end');
            }
        }).start();

        // let dieAction = cc.moveBy(this.fallDuration, cc.v2(0, -this.fallHeight));
        // this.node.runAction(dieAction);
    }

    start () {
        console.log("start player");
    }

    // update (dt) {}
}
