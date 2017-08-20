/**
 * Created by cheewu on 2017/8/6.
 */
class Enemy extends GameImage{
    constructor(game, name) {
        super(game, name)
        this.alive = true
        this.life = this.game.config[name + 'Life']
        this.__cool()
        this.__setup()
    }


    __setup() {
        this.x = randomNum(20, 380)
        this.y = randomNum(10, 50)
        this.score = this.life * 100
    }

    fire() {
        this.__cool()
        const bullet = new Bullet(this.game, 'bullet')
        bullet.x = this.x + this.w / 2
        bullet.y = this.y + this.h
        bullet.speed = this.game.config.enemyBulletSpeed - this.game.config.enemySpeed
        bullet.type = 'enemy'
        this.scene.addElement(bullet)
    }

    __cool() {
        this.coolDown = this.game.config.enemyCoolDown
    }

    update() {
        this.coolDown--
        if (this.coolDown < 1) {
            this.fire()
        }
        this.y += this.game.config.enemySpeed
        if (this.y > 700) {
            this.__setup()
        }
    }

    hit() {
        this.life--
        if (this.life < 1) {
            this.die()
        }
    }

    die() {
        this.alive = false
        this.game.config.score += this.score
        const p = new ParticaleSystem(this.game)
        p.init(this.x, this.y)
        this.scene.addElement(p)
    }

}
