// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import * as cc from 'cc';
import Game from "./Game";
import bus from 'iny-bus';

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    m_labScore: cc.Label = null;

    // private game: Game;
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    // update (dt) {}

    public init() {
    }

    private onBtnRestart() {
        bus.emit("Game.RestartGame");
    }

    private onBtnReturnMenu() {
        bus.emit("Game.ReturnMenu");
    }

    public show(score: number) {
        this.node.active = true;
        this.m_labScore.string = score + '';
    }

    public hide() {
        this.node.active = false;
    }
}
