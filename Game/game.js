const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
console.log(canvas)

canvas.width = innerWidth
canvas.height = innerHeight

class Player{
    constructor(){
        this.position = {
            x:200,
            y:200
        }

        this.velocity = {
            x:0,
            y:0
        }

        //this.Image = new Image()

        const image = new Image()
        image.src = './img/spaceship.png'

        this.image = image
        this.width = 100
        this.height = 100
    }

    draw(){
        /*c.fillStyle = 'blue'
        c.fillRect(this.position.x,this.position.y,this.width,this.height)*/

        c.drawImage(this.image,this.position.x,this.position.y)
    }   
}

const player = new Player()
player.draw()

function animate(){
    requestAnimationFrame(animate)
    player.draw()
}

animate()