/**
 * Created by cheewu on 2017/8/6.
 */
class Player extends GameImage{
    constructor(game, name) {
        super(game, name)
        this.__cool()
        this.__setup()
    }

    __setup() {
        this.x = 100
        this.y = 500
        this.life = 5
    }

    fire() {
        if (this.coolDown < 1) {
            this.__cool()
            const bullet = new Bullet(this.game, 'bullet')
            bullet.x = this.x + this.w / 2
            bullet.y = this.y
            bullet.type = 'player'
            this.scene.addElement(bullet)
        }
    }

    __cool() {
        this.coolDown = this.game.config.coolDown
    }

    update() {
        this.coolDown--
        if (this.life < 1) {
            this.die()
        }
    }

    hit() {
        this.life--
    }

    die() {
        this.alive = false
        const p = new ParticaleSystem(this.game)
        p.init(this.x, this.y)
        this.scene.addElement(p)
    }

    moveLeft() {
        this.x -= this.game.config.playerSpeed
    }

    moveRight() {
        this.x += this.game.config.playerSpeed
    }

    moveUp() {
        this.y -= this.game.config.playerSpeed
    }

    moveDown() {
        this.y += this.game.config.playerSpeed
    }

}
