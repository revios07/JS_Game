//---> Keyboard Pads Works Slow
//Deleted w,s event listeners On Game

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
        case 'w':
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
        case 's':
            {
                 //Move Down
                console.log("Down")
                player.velocity.y = -1
                keys.s.pressed = true
                keys.w.pressed = false
                break;
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
        case 'w':
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
        case 's':
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