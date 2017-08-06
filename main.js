/**
 * Created by cheewu on 2017/7/30.
 */

window.g_data = {
    pause: false,
    debug: false,
    fps: 30,
    blocks: [],
    images : {
        skyUp: 'img/background.png',
        skyDown: 'img/background.png',
        player: 'img/hero.png',
        bullet: 'img/bullet.png',
    },
    inBall: false,
    isMouseDown: false,
}

const pInRect = (x, y, ball) => {
    if (ball.x <= x && x <= ball.x + ball.w) {
        if (ball.y <= y && y <= ball.y + ball.h) {
           return true
        }
    }
    return false
}
const enableDebug = (game, ball) => {
    g_data.debug = true
    bindEvent(window, 'keydown', function (event) {
        if (event.key === 'p') {
            g_data.pause = !g_data.pause
        } else if('12345678'.includes(event.key)) {
            loadLevel(game, Number(event.key))
        }
    })

    const fpsRange = e(document, '#id-fps-range')
    bindEvent(fpsRange, 'change', function (e) {
        const target = e.target
        const fps = target.value
        g_data.fps = Number(fps)
    })

    const canvas = game.canvas
    bindEvent(canvas, 'mousedown', (event) => {
        g_data.isMouseDown = true
        const x = event.layerX
        const y = event.layerY
        g_data.inBall = pInRect(x, y, ball)
    })

    bindEvent(canvas, 'mousemove', (event) => {
        const x = event.layerX
        const y = event.layerY
        if (g_data.inBall && g_data.isMouseDown) {
            ball.x = x
            ball.y = y
        }
    })

    bindEvent(canvas, 'mouseup', (event) => {
        g_data.isMouseDown = false
    })

}

const loadLevel = (game, level) => {
    g_data.blocks = []
    const positions = levels[level - 1]
    positions.forEach(p => {
        const block = Block(game)
        block.x = p[0]
        block.y = p[1]
        block.health = p[2] || 1
        g_data.blocks.push(block)
    })
}

let score = 0

const __main = () => {

    new Game((g) => {

        const scene = new Title(g)

        g.runWithScene(scene)

    })
}

__main()

