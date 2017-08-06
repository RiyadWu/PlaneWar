/**
 * Created by cheewu on 2017/7/30.
 */


const fullScreen = () => {
    const canvas = document.querySelector('#id-canvas')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
}

const enableDebug = (game) => {
    game.config.debug = true
    bindEvent(window, 'keydown', function (event) {
        if (event.key === 'p') {
            log(1)
            game.config.pause = !game.config.pause
        }
    })

    const fpsRange = e(document, '#id-fps-range')
    bindEvent(fpsRange, 'input', function (e) {
        const target = e.target
        const fps = target.value
        game.config.fps = Number(fps)
    })
}

let score = 0

const __main = () => {

    fullScreen()

    new Game((g) => {

        const scene = new Title(g)

        g.runWithScene(scene)

    })
}

__main()

