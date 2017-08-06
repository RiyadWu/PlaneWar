class Scene extends BaseScene{
    constructor(game) {
        super(game)
        this.bg = new Background(game, 'background')
        this.player = new Player(game, 'player')
        this.__setup()
    }

    __setup() {
        this.player.scene = this
        this.addElement(this.bg)
        this.addElement(this.player)
        this.addEnemy()

        const game = this.game
        const player = this.player
        game.registerActions('a', () => {
            player.moveLeft()
        })

        game.registerActions('d', () => {
            player.moveRight()
        })

        game.registerActions('w', () => {
            player.moveUp()
        })

        game.registerActions('s', () => {
            player.moveDown()
        })

        game.registerActions('j', () => {
            player.fire()
        })

        enableDebug(this.game)
    }

    draw() {
        super.draw()
        this.game.context.fillText('score: ' + score, 10, 10)
    }

    update() {
        super.update()
        this.elements = this.elements.filter(e => e.alive)
    }

    addEnemy() {
        const len = this.game.config.enemyNum
        const game = this.game
        for(let i = 0; i < len; i++) {
            const type = 'enemy' + randomNum(1,2)
            const e = new Enemy(game, type)
            this.addElement(e)
        }
    }
}
