// Learn TypeScript:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/typescript.html
// Learn Attribute:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - https://docs.cocos.com/creator/2.4/manual/en/scripting/life-cycle-callbacks.html

import * as cc from 'cc';
import Game from './Game';
import Player from './Player';
import Block from './Block';
import bus from 'iny-bus'

const {ccclass, property} = cc._decorator;

@ccclass
export default class Stage extends cc.Component {

    @property(cc.CCInteger)
    private stepDistance: number = 200;

    @property(cc.CCInteger)
    private jumpHeight: number = 100;

    @property(cc.CCFloat)
    private jumpDuration: number = 0.3;

    @property(Player)
    private player: Player = null;

    @property(cc.Prefab)
    private blockPrefab: cc.Prefab = null; // 编辑器属性引用

    private lastBlock = true; // 记录上一次是否添加了Block
    private lastBlockX = 0; // 记录上一次添加Block的x坐标
    private blockList: Array<Block>; // 记录添加的Block列表

    @property(cc.CCInteger)
    private fallHeight: number = 500;
    @property(cc.CCFloat)
    private fallDuration: number = 0.3;
    @property(cc.CCFloat)
    private initStayDuration: number = 2; // 初始停留时间
    @property(cc.CCFloat)
    private minStayDuration: number = 0.3; // 最小停留时间，不能再快了的那个点，不然玩家就反应不过来了
    @property(cc.CCFloat)
    private speed: number = 0.1;

    private stayDuration: number; // 停留时间

    private game: Game = null;

    public init(game: Game) {
        this.game = game;
        this.stayDuration = this.initStayDuration;
        this.player.init(this.stepDistance, this.jumpHeight, this.jumpDuration, this.fallDuration, this.fallHeight);
        this.blockList = [];
        this.addBlock(cc.v3(0, -200));
        for (let i = 0; i < 5; i++) {
            this.randomAddBlock();
        }
    }

    public addSpeed() {
        this.stayDuration -= this.speed;
        if (this.stayDuration <= this.minStayDuration) {
            this.stayDuration = this.minStayDuration;
        }
        cc.log(this.stayDuration);
    }

    public playerJump(step: number) {
        if (this.player.canJump) {
            this.player.jump(step);
            this.moveStage(step);
            let isDead = !this.hasBlock(this.player.index);
            if (isDead) {
                cc.log('die');
                this.scheduleOnce(() => { // 这时还在空中，要等到落到地面在执行死亡动画
                    this.player.die();
                    bus.emit("Game.PlayerDie");
                    // this.game.overGame();
                }, this.jumpDuration);
            } else {
                let blockIndex = this.player.index;
                this.blockList[blockIndex].init(this.fallDuration, this.fallHeight, this.stayDuration, () => { 
                    if (this.player.index === blockIndex) { // 如果Block下落时玩家还在上面游戏结束
                        this.player.die();
                        bus.emit("Game.PlayerDie");
                        // this.game.overGame();
                    }
                });
                this.game.addScore(step === 1 ? 1 : 3);
            }
            if (this.player.index % 10 === 0) {
                this.addSpeed();
            }
        }
    }

    private moveStage(step: number) {
        // let moveAction = cc.moveBy(this.jumpDuration, cc.v2(-this.stepDistance * step, 0));
        // this.node.runAction(moveAction);

        this.node.qtPositionX(this.node.position.x - this.stepDistance * step, this.jumpDuration, {
            onStart: ()=> {
                // console.log('begin');
            },
            onComplete: ()=> {
                // console.log('end');
            }
        }).start();

        for (let i = 0; i < step; i++) {
            this.randomAddBlock();
        }
    }

    private randomAddBlock() {
        if (!this.lastBlock || Math.random() > 0.5) {
            this.addBlock(cc.v3(this.lastBlockX + this.stepDistance, -200));
        } else {
            this.addBlank();
        }
        this.lastBlockX = this.lastBlockX + this.stepDistance;
    }

    private addBlock(position: cc.Vec3) {
        let blockNode = cc.instantiate(this.blockPrefab);
        console.log(blockNode);

        this.node.addChild(blockNode);
        blockNode.position = position;
        this.blockList.push(blockNode.getComponent(Block));
        this.lastBlock = true;
    }

    private addBlank() {
        this.blockList.push(null);
        this.lastBlock = false;
    }

    private hasBlock(index: number): boolean {
        return this.blockList[index] !== null;
    }
}
