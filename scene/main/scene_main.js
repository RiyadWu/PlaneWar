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
        this.game.context.fillText('score: ' + this.game.config.score, 10, 10)
    }

    update() {
        super.update()
        this.hit()
        this.addEnemy()
        if (!this.player.alive) {
            const game = this.game
            const s = new SceneEnd(game)
            setTimeout(() => {
                game.replaceScene(s)
            }, 1000)
        }
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

    __bulletHit(playerBullets, enemyBullets) {
        playerBullets.forEach(pb => {
            enemyBullets.forEach(eb => {
                if (collide(pb, eb) || collide(eb, pb)) {
                    pb.die()
                    eb.die()
                }
            })
        })
        this.elements = this.elements.filter(e => e.alive)
    }

    __enemyHit(enemies, playerBullets) {

        playerBullets.forEach(b => {
            enemies.forEach(e => {
                if (collide(b, e) || collide(e, b)) {
                    b.die()
                    e.hit()
                }
            })
        })
        this.elements = this.elements.filter(e => e.alive)
    }

    __playerHit(player, enemyBullets) {
        enemyBullets.forEach(b => {
            if (collide(b, player) || collide(player, b)) {
                b.die()
                player.hit()
            }
        })
        this.elements = this.elements.filter(e => e.alive)
    }

    __crash(player, enemies) {
        enemies.forEach(e => {
            if (collide(e, player) || collide(player, e)) {
                e.die()
                player.die()
            }
        })
    }

    hit() {
        const playerBullets = this.elements.filter(e => e instanceof Bullet && e.type === 'player')
        const enemyBullets = this.elements.filter(e => e instanceof Bullet && e.type === 'enemy')
        const enemies = this.elements.filter(e => e instanceof Enemy)
        const player = this.player

        this.__bulletHit(playerBullets, enemyBullets)
        this.__enemyHit(enemies, playerBullets)
        this.__playerHit(player, enemyBullets)
        this.__crash(player, enemies)
    }

}
