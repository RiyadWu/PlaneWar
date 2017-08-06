class Title extends BaseScene {
    constructor (game) {
        super(game)
        this.__setup()
    }

    __setup() {
        const game = this.game
        const particleSystem = new ParticaleSystem(game)
        this.addElement(particleSystem)
        this.game.registerActions('k', () => {
            const s = new Scene(game)
            game.replaceScene(s)
        })
    }

    draw () {
        super.draw()
        this.game.context.fillText('按 k 开始游戏!', 180, 200)
    }
}