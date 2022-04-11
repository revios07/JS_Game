function animate(){
    requestAnimationFrame(animate)
    //Calls Every Animation Frame Here
    //console.log(a)
    //Inputs etc.
    //</summary>
}

//<summary>
//Example Class Player
//</summary>
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

//<summary>
//Example Class Bullet
//Can Use Bullets With Queue
//</summary>
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
