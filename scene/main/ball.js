class Ball {
    constructor(game) {
        this.game = game
        this.x = 100
        this.y = 200
        this.speedX = 5
        this.speedY = 5
        this.fired = false
        this.__setup()
    }

    __setup() {
        const img = this.game.imageByName('ball')
        this.image = img.image
        this.w = img.w
        this.h = img.h
    }

    fire() {
        this.fired = true
    }

    move() {
        if (this.fired) {
            if (this.x < 0 || this.x > 400) {
                this.speedX *= -1
            }

            if (this.y < 0) {
                this.speedY *= -1
            }

            this.x += this.speedX
            this.y += this.speedY
        }
    }

    reflect() {
        this.speedY *= -1
    }
}
