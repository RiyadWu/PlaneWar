class SceneEnd extends BaseScene {
    constructor(game) {
        super(game)
        this.game.registerActions('r', () => {
            const s = new Title(game)
            game.replaceScene(s)
        })
    }

    draw () {
        this.game.context.fillText('Game Over! 按 r 重新开始游戏', 180, 200)
    }

}