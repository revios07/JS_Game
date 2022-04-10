const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight

class Player{
    constructor(){
        this.position={
            x:200,
            y:200
        }

        this.velocity ={
            x: 0,
            y: 0
        }

        this.width = 150
        this.height = 100
    }

    draw(){
        c.fillStyle = 'red'
        c.fillRect(this.position.x,this.position.y,this.width,this.height)
    }
}

const player = new Player()
player.draw()