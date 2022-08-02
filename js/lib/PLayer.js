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

    keyDown(event){
        //set loop with function to watch keyboard
        console.log(event.keyCode);
        if(event.keyCode == 37) this.X -= this.speed
        else if(event.keyCode == 39) this.X += this.speed
        else if(event.keyCode == 38) this.Y -= this.speed
        else if(event.keyCode == 40) this.Y += this.speed
    }


    moveTo(){

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