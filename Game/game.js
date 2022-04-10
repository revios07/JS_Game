const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
const cbullet = canvas.getContext('2d')

console.log(canvas)

const bulletSpeed = -1

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

    update(){
        if(this.image){
        this.draw()
        this.position.y += this.velocity.y
        }
    }
}

canvas.width = innerWidth
canvas.height = innerHeight

c.fillStyle = 'darkblue'
const player = new Player()

const keys = {
    w: {
        pressed : false
    },
    s: {
        pressed : false
    },
    space: {
        pressed : false
    }
}

function animate(){
    requestAnimationFrame(animate)
    c.fillRect(0, 0, canvas.width,canvas.height)
    player.update()

    if(keys.w.pressed && player.position.y >= 0){
        player.velocity.y = -1
    }
    else if(keys.s.pressed && player.position.y <= canvas.height - player.image.height){
        player.velocity.y = 1
    }
    else {
        player.velocity.y = 0
    }
    

    if(keys.space.pressed){
        console.log("Fire")
        //fireBullet()
    }
}

animate()

addEventListener('keydown', ({key}) => {
    console.log(key)
    switch(key){
        case  "ArrowUp":
            {
                //Move Up
                console.log("Up")
                player.velocity.y = 1
                keys.w.pressed = true;
                break;
            }
        case 'w':
            {
                //Move Up
                console.log("Up")
                player.velocity.y = 1
                keys.w.pressed = true;
                break;
            }
        case "ArrowDown":
            {
                //Move Down
                console.log("Down")
                player.velocity.y = -1
                keys.s.pressed = true;
                break;
            }
        case 's':
            {
                 //Move Down
                console.log("Down")
                player.velocity.y = -1
                keys.s.pressed = true;
                break;
            }   
        case "Space":
            {
                //Shoot
                console.log("Shoot")
                keys.space.pressed = true;
                break;
            }
        case "Shift":
            {
                //Shoot
                console.log("Shoot")
                keys.space.pressed = true;
                break;
            }
    }
})

addEventListener('keyup', ({key}) =>{
    console.log(key)
    switch(key){
        case  "ArrowUp":
            {
                //Move Up
                console.log("Up")
                keys.w.pressed = false;
                break;
            }
        case 'w':
            {
                //Move Up
                console.log("Up")
                keys.w.pressed = false;
                break;
            }
        case "ArrowDown":
            {
                //Move Down
                console.log("Down")
                keys.s.pressed = false;
                break;
            }
        case 's':
            {
                 //Move Down
                console.log("Down")
                keys.s.pressed = false;
                break;
            }   
        case "Space":
            {
                //Shoot
                console.log("Shoot")
                keys.space.pressed = false;
                break;
            }
        case "Shift":
            {
                //Shoot
                console.log("Shoot")
                keys.space.pressed = false;
                break;
            }
    }
})