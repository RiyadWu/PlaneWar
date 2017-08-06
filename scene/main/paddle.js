class Paddle {
    constructor(game) {
        this.game = game
        this.__setup()
    }

    __setup() {
        const o = this.game.imageByName('paddle')
        this.image = o.image
        this.w = o.w
        this.h = o.h
        this.x = 100
        this.y = 220
        this.speed = 15
    }

    move(x) {
        if (x < 0) {
            x = 0
        }

        if (x + this.w > 400) {
            x = 400 - this.w
        }
        this.x = x
    }


    moveLeft() {
        this.move(this.x - this.speed)
    }

    moveRight() {
        this.move(this.x + this.speed)
    }

    collide(ball) {
        const a = this
        const b = ball
        if (aInb(a.x, b.x, b.x + b.w) || aInb(b.x, a.x, a.x + a.w)) {
            if (aInb(a.y, b.y, b.y + b.h) || aInb(b.y, a.y, a.y + a.h)) {
                return true
            }
        }
        return false
    }

}

const aInb = (x, x1, x2) => {
    return x >= x1 && x <= x2
}