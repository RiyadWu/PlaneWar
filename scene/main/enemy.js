/**
 * Created by cheewu on 2017/8/6.
 */
class Enemy extends GameImage{
    constructor(game, name) {
        super(game, name)
        this.alive = true
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

}
