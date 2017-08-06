/**
 * Created by cheewu on 2017/8/6.
 */
class Enemy extends GameImage{
    constructor(game, name) {
        super(game, name)
        this.alive = true
        this.life = this.game.config[name + 'Life']
        this.__setup()
    }


    __setup() {
        this.x = randomNum(20, 380)
        this.y = randomNum(10, 50)
    }

    update() {
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
        const p = new ParticaleSystem(this.game)
        p.init(this.x, this.y)
        this.scene.addElement(p)
    }

}
