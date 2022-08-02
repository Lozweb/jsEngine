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

        document.addEventListener('keydown', () => {
            this.keyDown(event, this)
        })

        document.addEventListener('keyup', () => {
            this.keyUp(event, this)
        })
    }

    configCss(){
        this.css = 
            Css.widthPx(30) + 
            Css.heightPx(20) + 
            Css.backgroundColor('#fff') + 
            Css.position('absolute') + 
            Css.top('50%') + 
            Css.left('5%')

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
        if(event.keyCode == 90) player.direction.up = true
        if(event.keyCode == 83) player.direction.down = true
            
        this.setPosition(player.direction)
    }

    keyUp(event, player){
        if(event.keyCode == 81) player.direction.left = false
        if(event.keyCode == 68) player.direction.right = false
        if(event.keyCode == 90) player.direction.up = false
        if(event.keyCode == 83) player.direction.down = false
    }

    setPosition(direction){

        if(direction.up){
            this.Y -= this.speed
        }
        if(direction.down){
            this.Y += this.speed
        }
        if(direction.left){
            this.X -= this.speed
        }
        if(direction.right){
            this.X += this.speed
        }
        this.moveTo(this.X, this.Y)
    }

    moveTo(x, y){

        this.element.style.left = this.X + "px"
        this.element.style.top = this.Y + "px"
        
    }

    getPosition(){

        let style = window.getComputedStyle(this.element)
        return [parseInt(style.getPropertyValue('left')), parseInt(style.getPropertyValue('top'))]

    }

}