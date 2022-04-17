const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')


canvas.width = innerWidth / 1.05
canvas.height = innerHeight / 1.05

//<summary>
//Open This With Html Button
//On Game Stops Close This
//</summary>
let isGamePlaying = false

const playerSpeed = 1.5
const bulletSpeed = 2.5
const bulletDamage = 1

let timerForShootBullet = 50
const shootForEachFps = 100

class Player{
    constructor(){
        //Pos Middle Of Canvas Left
        this.position = {
            x: 0,
            y: 0
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
                x: 18,
                y: canvas.height / 2 - (player.height / 2)
            }
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
    constructor(position){
        //Spawn Pos Right Of Canvas
        this.position = {
            x: position.x,
            y: position.y
        }

        this.velocity = {
            x:0,
            y:0
        }

        const image = new Image()
        image.src = './img/enemyspaceship.png'

        image.onload = () => {
            const scaleSpaceShip = 0.6

            this.image = image
            this.width = image.width * scaleSpaceShip
            this.height = image.height * scaleSpaceShip
            this.position = {
                x: this.position.x,
                y: this.position.y
                //Limit Y For Not Out Of Screen
            }
        }
    }

    draw(){
        /*c.fillStyle = 'blue'
        c.fillRect(this.position.x,this.position.y,this.width,this.height)*/
        c.drawImage(this.image,this.position.x,this.position.y,this.width,this.height)
    }   

    update({velocity}){
        if(this.image){
        this.draw()
        this.position.x += velocity.x
        this.position.y += velocity.y
        }
    }
}

class Grid{
    constructor(){
        this.position = {
            x: 0,
            y: 0
        }

        this.velocity = {
            x: 0,
            y: 1
        }

        this.enemies = []

        const columns = (Math.floor(Math.random() * 6)) + 3
        const rows = (Math.floor(Math.random() * 5)) + 3

        this.height = columns * (210)

        console.log(rows)

        //Create Enemies Here
        for(let i = 0; i < columns; ++i){
            for(let j = 0; j < rows; ++j){
            
            var position = {
                x:canvas.width - 88 - (j * 80), 
                y:20 + i * 100
            }

            this.enemies.push(new Enemy(position))
            }
        }
    }

    draw(){

    }

    update(){
        this.position.x += this.velocity.x,
        this.position.y += this.velocity.y

        //<summay>
        //Change Enemy Velocity *-1 When At End Of Canvas
        //</summary>
        if(this.position.y + this.height / 2 >= canvas.height) {
            this.velocity.y *= -1
        }
        else if(this.position.y <= 0) {
            this.velocity.y *= -1
        }
        /*console.log("height : " + this.height)
        console.log("Grid Height : " + this.position.y + this.height)
        console.log("Canvas Height : " + canvas.height) */
    }
}

c.fillStyle = 'darkblue'
c.fill()

const player = new Player()
const bullets = []
const grids = []
grids.push(new Grid())


function startGame(){
    isGamePlaying = true
    spawnEnemy()
}
function fireBulletPlayer(){
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

let enemySpawnType = 0

let enemySpawnTimer = 0
let canSpawnEnemy = true


function spawnEnemy(){
    /*if(!canSpawnEnemy){
        enemySpawnTimerFunc()
        return
    }
    canSpawnEnemy = false

    enemySpawnTimer = 250

    enemies.push(new Enemy())*/
}

function enemySpawnTimerFunc(){
    if(canSpawnEnemy)
    {
        enemySpawnTimer = 0
        return
    }
    
    --enemySpawnTimer

    if(enemySpawnTimer <= 0){
        canSpawnEnemy = true
    }
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

//Reqursion With Animation Frame
function animate(){
    requestAnimationFrame(animate)

    if(!isGamePlaying)
    {
        c.fillStyle = 'blue'
        c.fillRect(0,0,canvas.width,canvas.height)
        player.draw()
        return
    }

    //BackGround Here
    c.fillStyle = 'darkblue'
    c.fillRect(0, 0, canvas.width,canvas.height)

    //Other Objects Movement
    bullets.forEach((bullet,index) => {
        if(bullet.position.x + bullet.radius >= canvas.width){
            setTimeout(() => {
                bullets.splice(index,1)
            }, 0.1);
        }
        else {
            
            bullet.update()
        }

        //console.log(bullets)
    });

    grids.forEach(grid => {
        grid.update()
        grid.enemies.forEach(enemy =>{
            enemy.update({velocity : grid.velocity})
        })
    });

    //Player Movement
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
    
    //Fire
    if(keys.space.pressed){
        console.log("Fire")
        fireBulletPlayer()
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
