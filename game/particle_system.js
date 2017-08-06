/**
 * Created by cheewu on 2017/8/6.
 */
class ParticaleSystem {
    constructor(game) {
        this.game = game
        this.alive = true
        this.__setUp()
    }

    __setUp() {

    }

    init(x, y) {
        this.x = x
        this.y = y
        this.particlesNum = 20
        this.particles = []
        for (let i = 0, len = this.particlesNum; i < len; i++) {
            const p = new Particle(this.game)
            const vx = randomNum(-5, 5) * Math.random()
            const vy = randomNum(-5, 5) * Math.random()
            p.init(this.x, this.y, vx, vy)
            this.particles.push(p)
        }
    }

    update() {
        this.particles.forEach(p => p.update())
        this.particles = this.particles.filter(p => p.life > 0)
        if (this.particles.length < 1) {
            this.alive = false
        }
    }

    draw() {
        this.particles.forEach(p => p.draw())
    }
}


class Particle extends GameImage {
    constructor(game) {
        super(game, 'particle')
        this.__setup()
    }

    __setup() {
        this.life = 50
    }

    init(x, y, vx, vy) {
        this.x = x
        this.y = y
        this.vx = vx
        this.vy = vy
    }

    update() {
        this.life--
        this.vx += (0 - this.vx) / 10
        this.vy += (0 - this.vy) / 10
        this.x += this.vx
        this.y += this.vy
    }

}