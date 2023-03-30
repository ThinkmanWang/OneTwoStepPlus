// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import * as cc from 'cc';
import JSBI from "jsbi"
import bus from 'iny-bus'

const {ccclass, property} = cc._decorator;

@ccclass
export default class Menu extends cc.Component {

    private m_lstEventId: string[] = [] 

    start () {
       this.m_lstEventId.push(bus.on("Game.Start", this.onStartClick));
    }

    onDestroy() {
        console.log("remove event");

        while (true) {
            var szEventId: string = this.m_lstEventId.pop();
            if (undefined == szEventId) {
                break;
            }

            bus.remove("Game.Start", szEventId);
        }
    }

    public onStartClick() {
        console.log("Game Start............");
    }

    private onBtnStart() {
        // console.log(JSBI.BigInt("1111111111111111111111111111111111111111111"));
        // let a = JSBI.BigInt("11111111111111111111111111111111");
        // let b = JSBI.multiply(JSBI.BigInt(2),a);
        // console.log(b);
        bus.emit("Game.Start");

        cc.director.loadScene("Game");
    }

}
