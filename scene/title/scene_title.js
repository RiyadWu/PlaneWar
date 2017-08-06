class Title extends BaseScene {
    constructor (game) {
        super(game)
        this.__setup()
    }

    __setup() {
        const game = this.game
        this.game.registerActions('k', () => {
            const s = new Scene(game)
            game.replaceScene(s)
        })
    }

    draw () {
        this.game.context.fillText('按 k 开始游戏!', 180, 200)
    }

    update () {

    }
}