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
const bulletSpeed = 5
const bulletDamage = 1

let timerForShootBullet = 50
const shootForEachFps = 60

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

            const image = new Image()
            image.src = './img/bullet.png'
    
            image.onload = () => {
                const bulletScale = 0.25
    
                this.image = image
                this.width = image.width * bulletScale
                this.height = image.height * bulletScale
                this.position = {
                    x: this.position.x,
                    y: this.position.y
                }
            }
        }

        draw(){

            if(this.image)
                c.drawImage(this.image,this.position.x,this.position.y,this.width,this.height)

            /*c.beginPath()
            c.arc(this.position.x,this.position.y,this.radius,0,Math.PI * 2)

            c.fillStyle = 'red'
            c.fill()
            c.closePath()*/
        }

        update(){
            if(this.image){
            this.draw()
            this.position.x += this.velocity.x
            this.position.y += this.velocity.y
            }
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
            const scaleSpaceShip = 0.4

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

    shootEnemy(enemyBullets){
        enemyBullets.push(new BulletEnemy({
            position: {
                x: this.position.x + this.width / 2,
                y: this.position.y
            },velocity:{
                x:-5,
                y:0
            }
        }))
    }
}

class BulletEnemy{
    constructor({position,velocity}){
        this.position = position,
        this.velocity = velocity

        this.width = 15
        this.height = 5
        //this.radius = 3
    }

    draw(){
        c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y, this.width,this.height)
    }

    update(){
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
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
            y: 3.2
        }

        this.enemies = []

        var columns = (Math.floor(Math.random() * 8) + 1) 
        var rows = (Math.floor(Math.random() * 3) + 2)
        
        //Columns is Lenght Number Of Enemies
        if(columns <= 3){
            columns = 4 + Math.floor(Math.random() * 10)
        }
        if(rows < 3){
            rows = 1 + Math.floor(Math.random() * 1.5) 
        }

        if(columns >= 8) {
            this.velocity.y /= 2.5
        }
        else if(columns >= 5){
            this.velocity.y /= 1.8
        }

        console.log(columns)
        this.height = columns * 120

        //Create Enemies Here
        for(let i = 0; i < columns; ++i){
            for(let j = 0; j < rows; ++j){
            
            var position = {
                x:canvas.width - 88 - (j * 80), 
                y:20 + i * 55
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

        this.velocity.x = 0

        //<summay>
        //Change Enemy Velocity *-1 When At End Of Canvas
        //</summary>
        if(this.position.y + this.height / 2 >= canvas.height) {
            this.velocity.y *= -1
            this.velocity.x += -60
        }
        else if(this.position.y <= 0) {
            this.velocity.y *= -1
            this.velocity.x += -60
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
const enemyBullets = []
const grids = []


function startGame(){
    isGamePlaying = true
}
function fireBulletPlayer(){
    if(timerForShootBullet > 0)
        return
    
    bullets.push(new Bullet({
        position: {
            x:player.position.x + 100,
            y:player.position.y + player.height / 2 - 16.5
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

const enemyShootTimeBetweenShoots = 200
let enemyShootTimer = enemyShootTimeBetweenShoots


function enemySpawnTimerFunc(){ 
    --enemySpawnTimer

    if(enemySpawnTimer <= 0){
        grids.push(new Grid())
        enemySpawnTimer = 2250
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
        return;
    }

    //BackGround Here
    c.fillStyle = 'darkblue'
    c.fillRect(0, 0, canvas.width,canvas.height)

    enemyBullets.forEach((bullet,index) =>{
        bullet.update()
        
        if(bullet.position.x + this.width < 0){
            enemyBullets.splice(index,1)
        }
    })
    
    grids.forEach((grid,gridIndex) => {
        grid.update()

        if(enemyShootTimer <= 0 && grid.enemies.length >1){
            //Enemy Shoots Here
            console.log(grid.enemies)

            grid.enemies[Math.floor(Math.random() * Object.keys(grid.enemies).length)].shootEnemy(enemyBullets)
            enemyShootTimer = enemyShootTimeBetweenShoots
        }
        grid.enemies.forEach((enemy,i) =>{
            enemy.update({velocity : grid.velocity})
            
            bullets.forEach((bullet,j) => {
                //Collision Check
                if(bullet.position.y + bullet.radius <= enemy.position.y + enemy.height
                     && bullet.position.y + bullet.radius >= enemy.position.y
                        && bullet.position.x + bullet.radius >= enemy.position.x 
                            && bullet.position.x <= enemy.position.x + enemy.width){
                            //Remove From List
                        setTimeout(() => {
                            
                            if(true){
                                bullets.splice(j,1)
                                grid.enemies.splice(i,1)
                            }
                        }, 0);

                        return;
                    }
            })
        })
    });

    --enemyShootTimer

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

    enemySpawnTimerFunc()

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
