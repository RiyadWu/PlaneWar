class Scene extends BaseScene{
    constructor(game) {
        super(game)
        this.elements = {}
        this.__setup()
    }

    __connectBg () {
        const e = this.elements
        e.skyDown.y = e.skyUp.y - e.skyUp.h + 1
    }

    __setup() {
        const game = this.game
        this.__addElement('skyUp')
        this.__addElement('skyDown')
        this.__addElement('player')

        const player = this.elements.player
        player.w = 20
        player.h = 40
        player.x = 140
        player.y = 500
        // game.registerActions('a', () => {
        //     player.moveLeft()
        // })
        //
        // game.registerActions('d', () => {
        //     player.moveRight()
        // })
        //
        // game.registerActions('f', () => {
        //     ball.fire()
        // })

        enableDebug(game)

        this.__connectBg()
    }

    __addElement(name) {
        this.elements[name] = new GameImage(this.game, name)
    }

    draw() {
        const e = this.elements
        Object.keys(e).forEach(k => {
            this.game.drawImage(e[k])
        })
        this.game.context.fillText('score: ' + score, 10, 10)
    }

    update() {
        const u = this.elements.skyUp
        if (u.y >= u.h) {
            u.y = 0
        }
        this.__connectBg()

        u.y += 1
    }
}
