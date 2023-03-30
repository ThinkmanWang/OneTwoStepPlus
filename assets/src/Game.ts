// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import * as cc from 'cc';
import Stage from "./Stage";
import OverPanel from "./OverPanel"
import bus from 'iny-bus'

const {ccclass, property} = cc._decorator;

@ccclass
export default class Game extends cc.Component {

    @property(Stage)
    private stage: Stage = null;
    @property(cc.Label)
    private scoreLabel: cc.Label = null;
    @property(OverPanel)
    private overPanel: OverPanel = null;

    private score: number = 0;
    private m_lstEventId: string[] = [] 

    protected start() {
        this.startGame();

        this.m_lstEventId.push(bus.on("Game.PlayerDie", () => {
            this.onGameOver();
        }));

        this.m_lstEventId.push(bus.on("Game.RestartGame", () => {
            this.onRestartGame();
        }));

        this.m_lstEventId.push(bus.on("Game.ReturnMenu", () => {
            this.onReturnMenu();
        }));

        this.m_lstEventId.push(bus.on("Game.AddScore", (nScore) => {
            this.addScore(nScore);
        }));
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

    public addScore(n: number) {
        this.score += n;
        if (this.scoreLabel != null) {
            this.scoreLabel.string = this.score + '';
        }
    }

    public startGame() {
        this.score = 0;
        this.scoreLabel.string = '0';
        this.stage.init(this);
        this.overPanel.init(this);
        this.overPanel.hide();
    }

    public onGameOver() {
        cc.log('on game over');
        if (this.overPanel != null) {
            this.overPanel.show(this.score);
        }
    }

    public onRestartGame() {
        cc.director.loadScene('Game');
    }

    public onReturnMenu() {
        cc.director.loadScene('Menu');
    }

    // public overGame() {
    //     cc.log('game over');
    //     this.overPanel.show(this.score);
    // }

    // public restartGame() {
    //     cc.director.loadScene('Game');
    // }

    // public returnMenu() {
    //     cc.director.loadScene('Menu');
    // }

    private onBtnOne() {
        this.stage.playerJump(1);
    }

    private onBtnTwo() {
        this.stage.playerJump(2);
    }
}
