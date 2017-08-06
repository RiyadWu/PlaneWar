const Block = (game) => {
    const image = game.imageByName('block')

    const o = {
        alive: true,
    }

    Object.assign(o, image)

    o.kill = () => {
        o.alive = false
    }

    o.collide = (b) => {
        return collide(o, b) || collide(b, o)
    }

    return o
}