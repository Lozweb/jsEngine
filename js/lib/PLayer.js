import { Css } from "./Css.js"

export class Player{

    constructor(id){

        this.id = id
        this.css = ""
        this.element = null

        this.X = 0
        this.Y = 0

        this.speed = 10;

        this.direction = {
            up : false,
            down : false,
            left : false,
            right : false
        }

        this.screenSize = {
            width: 0 ,
            height : 0
        }

        this.playerSize = {
            width : 30, 
            height : 20
        }

        this.interval = null

        document.addEventListener('keydown', () => {
            this.keyDown(event, this)
        })
        document.addEventListener('keyup', () => {
            this.keyUp(event, this)
        })

    }

    configCss(){
        this.css = 
            Css.widthPx(this.playerSize.width) + 
            Css.heightPx(this.playerSize.height) + 
            Css.backgroundColor('#fff') + 
            Css.position('absolute') + 
            Css.top('50%') + 
            Css.left('5%') + 
            Css.margin('0')

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
        else if(event.keyCode == 90) player.direction.up = true
        else if(event.keyCode == 83) player.direction.down = true
    }
    //81:Q 68:D 90:Z 83:S
    keyUp(event, player){
        if(event.keyCode == 81) player.direction.left = false
        else if(event.keyCode == 68) player.direction.right = false
        else if(event.keyCode == 90) player.direction.up = false
        else if(event.keyCode == 83) player.direction.down = false
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
        return [parseInt(style.getPropertyValue('left')), parseInt(style.getPropertyValue('top'))]

    }

    getSize(){
        this.screenSize.width = document.getElementById(this.id).parentNode.parentElement.clientWidth
        this.screenSize.height = document.getElementById(this.id).parentNode.parentElement.clientHeight
    }

    animate(){
        this.interval = setInterval(this.moveTo.bind(this), 33)
        this.getSize()
    }

}