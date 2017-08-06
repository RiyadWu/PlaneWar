/**
 * Created by cheewu on 2017/8/6.
 */
class Bullet extends GameImage{
    constructor(game, name) {
        super(game, name)
        this.speed = game.config.bulletSpeed
        this.alive = true
        this.__setup()
    }

    __setup() {
        this.x = 0
        this.y = 0
    }

    update() {
        this.y -= this.speed
        if (this.y < -10) {
            this.alive = false
        }
    }

}
