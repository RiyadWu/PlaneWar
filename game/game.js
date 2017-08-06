// todo: 1.飞机大战素材 云/飞机 2.新建图片类 3.Scene中加载所有的元素并自动画出来
class Game {
    constructor(callback) {
        this.callback = callback
        this.scene = null
        this.actions = {}
        this.keysDowns = {}
        this.images = {}
        this.__setup()
    }

    __setup() {
        const canvas = e(document, '#id-canvas')
        this.canvas = canvas
        const context = canvas.getContext('2d')
        this.context = context

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
        this.scene.update()
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
        }, 1000 / g_data.fps)
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
        }, 1000 / g_data.fps)
    }

    run() {
        this.callback(this)
    }

    __loadAllImg() {
        let successNum = 0
        const images = g_data.images
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