/**
 * Created by cheewu on 2017/8/6.
 */
class Background {
    constructor(game, name) {
        this.game = game
        this.alive = true
        this.above = new GameImage(game, name)
        this.middle = new GameImage(game, name)
        this.below = new GameImage(game, name)
        this.__setup()
    }

    __setup() {
        this.__connectImg()
    }

    __connectImg() {
        this.above.y = this.middle.y - this.middle.h + 1
        this.below.y = this.middle.y + this.middle.h - 1
    }

    update() {
        this.middle.y += this.game.config.backgroundSpeed
        if (this.middle.y >= this.middle.h) {
            this.middle.y = 0
        }
        this.__connectImg()
    }

    draw() {
        this.game.drawImage(this.above)
        this.game.drawImage(this.middle)
        this.game.drawImage(this.below)
    }
}
