import { Assets } from "../lib/Assets.js"
import { Css } from "../lib/Css.js"
import { Shoot } from "./Shoot.js"

export class Player{

    constructor(id){

        this.id = id
        this.css = ""
        this.element = null

        this.X = 0
        this.Y = 0

        this.speed = 5;

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

        document.addEventListener('keydown', () => {
            this.keyDown(event, this)
        })
        document.addEventListener('keyup', () => {
            this.keyUp(event, this)
        })

        this.shootCount = 0

        this.layer = null

        this.shootArray = new Array()

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

        else if(event.keyCode == 68) player.direction.right = true

        else if(event.keyCode == 90) {
            player.direction.up = true
            this.element.style.backgroundPositionX = "192px"
        }

        else if(event.keyCode == 83) {
            player.direction.down = true
            this.element.style.backgroundPositionX = "64px"
        }

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

        if(event.keyCode == 32) this.shoot()
    }


    moveTo(){

        //move
        if(this.direction.left) this.X -= this.speed
        if(this.direction.right) this.X += this.speed
        if(this.direction.up) this.Y -= this.speed
        if(this.direction.down) this.Y += this.speed

        //check if out screen
        if(this.X < 0) this.X = 0
        if(this.Y < 0) this.Y = 0
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
        this.interval = setInterval(this.moveTo.bind(this), 33)
        this.getSize()
    }

    getRect(){
        //value + & - calcule bouding box plus fidèle au rendu du vaisseau
        return {x:this.X, y:this.Y, width: this.playerSize.width, height: this.playerSize.height}
    }

    shoot(){
        let shoot = new Shoot(this.shootCount, this.X, this.Y)
        shoot.createHtmlElement()
        this.shootCount ++
        this.layer.addEntity(shoot.element)
        shoot.animate()
        this.shootArray.push(shoot)
    }

    removeShoot(entity){

        if(entity != null){
            document.getElementById(entity.id).remove()
            this.shootArray = this.shootArray.filter(data => data.id != entity.id)
        }

    }

}