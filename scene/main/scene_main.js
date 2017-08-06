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
        this.hitEnemy()
        this.elements = this.elements.filter(e => e.alive)
        this.addEnemy()
    }

    addEnemy() {
        const enemies = this.elements.filter(e => e instanceof Enemy)
        if (enemies.length < this.game.config.enemyNum) {
            const type = 'enemy' + randomNum(1,2)
            const e = new Enemy(this.game, type)
            e.scene = this
            this.addElement(e)
        }
    }

    hitEnemy() {
        const enemies = this.elements.filter(e => e instanceof Enemy)
        const bullets = this.elements.filter(e => e instanceof Bullet)

        bullets.forEach(b => {
            enemies.forEach(e => {
                if (collide(b, e) || collide(e, b)) {
                    b.die()
                    e.hit()
                }
            })
        })
    }
}
