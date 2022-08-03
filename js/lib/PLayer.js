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
        else if(event.keyCode == 68) player.direction.right = true
        else if(event.keyCode == 90) player.direction.up = true
        else if(event.keyCode == 83) player.direction.down = true
    }

    keyUp(event, player){
        if(event.keyCode == 81) player.direction.left = false
        else if(event.keyCode == 68) player.direction.right = false
        else if(event.keyCode == 90) player.direction.up = false
        else if(event.keyCode == 83) player.direction.down = false
    }


    moveTo(){
        if(this.direction.left) this.X -= this.speed
        if(this.direction.right) this.X += this.speed
        if(this.direction.up) this.Y -= this.speed
        if(this.direction.down) this.Y += this.speed

        this.element.style.left = this.X + "px"
        this.element.style.top = this.Y + "px"
    }

    getPosition(){

        let style = window.getComputedStyle(this.element)
        return [parseInt(style.getPropertyValue('left')), parseInt(style.getPropertyValue('top'))]

    }

    animate(){
        this.interval = setInterval(this.moveTo.bind(this), 33)
    }

}