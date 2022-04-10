const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
console.log(canvas)

canvas.width = innerWidth
canvas.height = innerHeight

class Player{
    constructor(){
        //Pos Middle Of Canvas Left
        this.position = {
            x: canvas.width / 100,
            y: canvas.height / 2 - 60  
        }

        this.velocity = {
            x:0,
            y:0
        }
        //this.Image = new Image()

        const image = new Image()
        image.src = './img/spaceship.png'

        image.onload = () => {
            this.image = image
            this.width = image.width
            this.height = image.height
        }
    }

    draw(){
        /*c.fillStyle = 'blue'
        c.fillRect(this.position.x,this.position.y,this.width,this.height)*/
        if(this.image)
            c.drawImage(this.image,this.position.x,this.position.y,this.width,this.height)
    }   
}

c.fillStyle = 'darkblue'
const player = new Player()
player.draw()

function animate(){
    requestAnimationFrame(animate)
    c.fillRect(0, 0, canvas.width,canvas.height)
    player.draw()
}

animate()

addEventListener('keydown', ({key}) => {
    console.log(key)
    switch(key){
        case  "ArrowUp":
            {
                //Move Up
                console.log("Up")
                break;
            }
        case 'w':
            {
                //Move Up
                console.log("Up")
                break;
            }
        case "ArrowDown":
            {
                //Move Down
                console.log("Down")
                break;
            }
        case 's':
            {
                 //Move Down
                console.log("Down")
                break;
            }   
        case "Space":
            {
                //Shoot
                console.log("Shoot")
                break;
            }
        case "Shift":
            {
                //Shoot
                console.log("Shoot")
                break;
            }
    }
})