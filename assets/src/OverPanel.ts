// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import * as cc from 'cc';
import Game from "./Game";

const {ccclass, property} = cc._decorator;

@ccclass
export default class NewClass extends cc.Component {

    @property(cc.Label)
    m_labScore: cc.Label = null;

    private game: Game;
    // LIFE-CYCLE CALLBACKS:

    // onLoad () {}

    start () {

    }

    // update (dt) {}

    public init(game: Game) {
        this.game = game;
    }

    private onBtnRestart() {
        this.game.restartGame();
    }

    private onBtnReturnMenu() {
        this.game.returnMenu();
    }

    public show(score: number) {
        this.node.active = true;
        this.m_labScore.string = score + '';
    }

    public hide() {
        this.node.active = false;
    }
}
