class Game {
    constructor(callback) {
        this.callback = callback
        this.scene = null
        this.actions = {}
        this.keysDowns = {}
        this.images = {}
        this.config = {
            pause: false,
            debug: false,
            fps: 30,
            images : {
                background: 'img/background.png',
                player: 'img/hero.png',
                bullet: 'img/bullet.png',
                enemy1: 'img/enemy1.png',
                enemy2: 'img/enemy2.png',
            },
            enemyNum: 5,
            enemySpeed: 3,
            bulletSpeed: 3,
            playerSpeed: 10,
            backgroundSpeed: 2,
        }
        this.__setup()
    }

    __setup() {
        const canvas = e(document, '#id-canvas')
        this.canvas = canvas
        this.context = canvas.getContext('2d')

        bindEvent(window, 'keydown', (event) => {
            this.keysDowns[event.key] = true
        })

        bindEvent(window, 'keyup', (event) => {
            this.keysDowns[event.key] = false
        })

        this.__loadAllImg()
    }

    clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }

    update() {
        if  (!this.config.pause) {
            this.scene.update()
        }
    }

    draw() {
        this.scene.draw()
    }

    drawImage(image) {
        this.context.drawImage(image.texture, image.x, image.y)
    }

    imageByName(name) {
        const img = this.images[name]
        return img
    }

    registerActions(key, action) {
        this.actions[key] = action
    }

    replaceScene(scene) {
        this.scene = scene
    }

    runWithScene(scene) {
        this.scene = scene
        setTimeout(() => {
            this.runLoop()
        }, 1000 / this.config.fps)
    }

    runLoop() {
        // events
        Object.keys(this.actions).forEach(k => {
            if (this.keysDowns[k]) {
                this.actions[k]()
            }
        })
        this.update()
        // clear
        this.clear()
        // draw
        this.draw()

        setTimeout(() => {
            this.runLoop()
        }, 1000 / this.config.fps)
    }

    run() {
        this.callback(this)
    }

    __loadAllImg() {
        let successNum = 0
        const images = this.config.images
        const names = Object.keys(images)
        names.forEach(k => {
            let path = images[k]
            const img = new Image()
            img.src = path
            img.onload = () => {
                this.images[k] = img
                successNum++
                if (successNum === names.length) {
                    this.run()
                }
            }
        })
    }
}