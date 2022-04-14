const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')


canvas.width = innerWidth / 1.05
canvas.height = innerHeight / 1.05

const playerSpeed = 1.5
const bulletSpeed = 2.5
const bulletDamage = 1

let timerForShootBullet = 50
const shootForEachFps = 100

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

        const image = new Image()
        image.src = './img/spaceship.png'

        image.onload = () => {
            const scaleSpaceShip = 1

            this.image = image
            this.width = image.width * scaleSpaceShip
            this.height = image.height * scaleSpaceShip
            this.position = {
                x: 0,
                y: canvas.height / 2 - (player.height / 2)
            }
        }
    }

    draw(){
        /*c.fillStyle = 'blue'
        c.fillRect(this.position.x,this.position.y,this.width,this.height)*/
        c.drawImage(this.image,this.position.x,this.position.y,this.width,this.height)
    }   

    update(){
        if(this.image){
        this.draw()
        this.position.y += this.velocity.y
        }
    }
}

class Bullet{
        constructor({position,velocity}){
            this.position = position
            this.velocity = velocity        
            
            this.radius = 5
        }

        draw(){
            c.beginPath()
            c.arc(this.position.x,this.position.y,this.radius,0,Math.PI * 2)

            c.fillStyle = 'red'
            c.fill()
            c.closePath()
        }

        update(){
            this.draw()
            this.position.x += this.velocity.x
            this.position.y += this.velocity.y
        }
}

class Enemy{
    constructor(){
        //Spawn Pos Right Of Canvas
        this.position = {
            x: canvas.width,
            y: canvas.height * Math.random()
        }

        this.velocity = {
            x:-1,
            y:0
        }

        const image = new Image()
        image.src = './img/enemyspaceship.png'

        image.onload = () => {
            const scaleSpaceShip = 1

            this.image = image
            this.width = image.width * scaleSpaceShip
            this.height = image.height * scaleSpaceShip
            this.position = {
                x: canvas.width,
                y: (canvas.height - this.height) * Math.random()
                //Limit Y For Not Out Of Screen
            }
        }
    }

    draw(){
        /*c.fillStyle = 'blue'
        c.fillRect(this.position.x,this.position.y,this.width,this.height)*/
        c.drawImage(this.image,this.position.x,this.position.y,this.width,this.height)
    }   

    update(){
        if(this.image){
        this.draw()
        this.position.y += this.velocity.y,
        this.position.x += this.velocity.x
        }
    }

}

c.fillStyle = 'darkblue'
c.fill()

const player = new Player()
const bullets = []
const enemies = []

const enemy = new Enemy()
enemies.push(enemy)

function fireBullet(){
    if(timerForShootBullet > 0)
        return
    
    bullets.push(new Bullet({
        position: {
            x:player.position.x + 120,
            y:player.position.y + player.height / 2
        },
        velocity: {
            x:bulletSpeed,
            y:0
        }
    }))

    timerForShootBullet = shootForEachFps
}
function canShootTimer(){
    --timerForShootBullet
    if(timerForShootBullet < 0)
        return
}


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

    //BackGround Here
    c.fillStyle = 'darkblue'
    c.fillRect(0, 0, canvas.width,canvas.height)

    bullets.forEach(bullet => {
        bullet.update()
    });

    enemies.forEach(enemy => {
        enemy.update()
    });

    if(keys.w.pressed && player.position.y >= 0){
        player.velocity.y = -playerSpeed
    }
    else if(keys.s.pressed && player.position.y <= canvas.height - player.image.height){
        player.velocity.y = playerSpeed
    }
    else {
        player.velocity.y = 0
    }
    player.update()
    enemy.update()
    
    if(keys.space.pressed){
        console.log("Fire")
        fireBullet()
        //fireBullet()
    }

    canShootTimer()
}

animate()

//<summary>
//Inputs
//</summary>
addEventListener('keydown', ({key}) => {
    console.log(key)
    switch(key){
        case  "ArrowUp":
            {
                //Move Up
                console.log("Up")
                player.velocity.y = 1
                keys.w.pressed = true
                keys.s.pressed = false
                break
            }
        case "ArrowDown":
            {
                //Move Down
                console.log("Down")
                player.velocity.y = -1
                keys.s.pressed = true
                keys.w.pressed = false
                break
            }
        case "Space":
            {
                //Shoot
                console.log("Shoot")
                keys.space.pressed = true
                break;
            }
        case "Shift":
            {
                //Shoot
                console.log("Shoot")
                keys.space.pressed = true
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
                keys.w.pressed = false
                break
            }
        case "ArrowDown":
            {
                //Move Down
                console.log("Down")
                keys.s.pressed = false
                break
            }
        case "Space":
            {
                //Shoot
                console.log("Shoot")
                keys.space.pressed = false
                break
            }
        case "Shift":
            {
                //Shoot
                console.log("Shoot")
                keys.space.pressed = false
                break
            }
    }
})
//<summary>
//EndInputs
//<summary>
