import { Assets } from "../lib/Assets.js"
import { Css } from "../lib/Css.js"
import { Shoot } from "./Shoot.js"
import { Explosion } from "./Explosion.js";

export class Player{

    constructor(id){

        this.id = id
        this.css = ""
        this.element = null

        this.X = 0
        this.Y = 0

        

        this.direction = {
            up : false,
            down : false,
            left : false,
            right : false, 
        }

        this.screenSize = {
            width: 0 ,
            height : 0
        }

        this.playerSize = {
            width : 64, 
            height : 36
        }

        this.interval = null

        this.power = 50
        this.health = 100
        this.speed = 3
        this.isDead = false
        this.life = 0
        this.continue = 3
        this.score = 0

        this.countExplos = 0
        this.shootCount = 0

        this.layer = null

        this.shootArray = new Array()

        this.createHtmlElement()

    }

    configCss(){

        this.css = 
            Css.widthPx(this.playerSize.width) + 
            Css.heightPx(this.playerSize.height) + 
            Css.backgroundColor('none') + 
            Css.position('absolute') + 
            Css.top('50%') + 
            Css.left('5%') + 
            Css.margin('0') + 
            Css.backgroundImage(Assets.png('player_plane')) +
            Css.backgroundPositionX(0) +
            Css.backgroundPositionY(-14)
        return this.css

    }

    createHtmlElement(){

        let player = document.createElement('figure')
        player.setAttribute("id", this.id)
        player.style.cssText = this.configCss()
        this.element = player
        return this.element

    }

    keyDown(event, player){

        if(event.keyCode == 81) player.direction.left = true

        if(event.keyCode == 68) player.direction.right = true

        if(event.keyCode == 90) {
            player.direction.up = true
            this.element.style.backgroundPositionX = "192px"
        }

        if(event.keyCode == 83) {
            player.direction.down = true
            this.element.style.backgroundPositionX = "64px"
        }

    }

    keyPress(event){
        if(event.keyCode == 32 && !this.isDead) this.shoot()
    }

    //81:Q 68:D 90:Z 83:S 32:space

    keyUp(event, player){

        if(event.keyCode == 81) player.direction.left = false

        if(event.keyCode == 68) player.direction.right = false

        if(event.keyCode == 90){
            player.direction.up = false
            this.element.style.backgroundPositionX = "0"
            this.element.style.backgroundPositionY = "-14px"
        } 
        if(event.keyCode == 83){
            player.direction.down = false
            this.element.style.backgroundPositionX = "0"
            this.element.style.backgroundPositionY = "-14px"
        } 

    }


    moveTo(){

        //move
        if(this.direction.left) this.X -= this.speed
        if(this.direction.right) this.X += this.speed
        if(this.direction.up) this.Y -= this.speed
        if(this.direction.down) this.Y += this.speed

        //check if out screen
        if(this.X < 0) this.X = 0
        if(this.Y < 50) this.Y = 50
        if(this.X > this.screenSize.width-this.playerSize.width)  this.X = this.screenSize.width - this.playerSize.width
        if(this.Y > this.screenSize.height-this.playerSize.height) this.Y = this.screenSize.height - this.playerSize.height

        //set position
        this.element.style.left = this.X + "px"
        this.element.style.top = this.Y + "px"      
        
    }

    getPosition(){

        let style = window.getComputedStyle(this.element)
        this.X = parseInt(style.getPropertyValue('left'))
        this.Y = parseInt(style.getPropertyValue('top'))
        return [this.X, this.Y]

    }

    getSize(){

        this.screenSize.width = document.getElementById(this.id).parentNode.parentElement.clientWidth
        this.screenSize.height = document.getElementById(this.id).parentNode.parentElement.clientHeight
    
    }

    animate(){

        this.interval = setInterval(this.moveTo.bind(this), 16)
        this.getSize()
    }

    getRect(){

        return {x:this.X, y:this.Y, width: this.playerSize.width, height: this.playerSize.height}
    
    }

    shoot(){

        let shoot = new Shoot('shoot' + this.shootCount, this.X, this.Y)
        shoot.speed.x = 15
        shoot.power = this.power
        shoot.createHtmlElement()

        this.layer.addEntity(shoot.element)

        shoot.animate()

        this.shootArray.push(shoot)

        if(this.power >= 70){

            let shoot2 = new Shoot('shoot2' + this.shootCount, this.X, this.Y-5)
            shoot2.speed.x = 15
            shoot2.power = this.power
            shoot2.createHtmlElement()
            this.layer.addEntity(shoot2.element)
            shoot2.animate()
            this.shootArray.push(shoot2)

        }

        let audio = document.getElementById('shoot-sound')
        audio.pause()
        audio.currentTime = 0
        audio.play()

        this.shootCount ++
    }

    removeShoot(entity){
        
        if(entity != null){
            let shoot = document.getElementById(entity.id)
            if(shoot != null){
                shoot.remove()
                this.shootArray = this.shootArray.filter(data => data.id != entity.id)
    
            }
        }

    }

    damage(power){

        this.health -= power
        let explod = new Explosion(this.id + this.countExplos, this.X, this.Y)
        explod.createHtmlElement()
        this.layer.addEntity(explod.element)
        explod.animate()
        if(this.health === 0 || this.health < 0){
            this.health = 100
            this.life --
        } 
        if(this.life < 0){
            this.isDead = true
            this.health = 0
            this.life = 0
        }
    }

}