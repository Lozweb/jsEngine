import { Css } from "../lib/Css.js"

export class Shoot{

    constructor(id, x, y){

        this.id = id
        this.css = ""
        this.element = null

        this.X = x + 40 
        this.Y = y + 20

        this.size = {
            width: 10, 
            height: 3
        }

        this.speed = 15

        this.interval = null

    }

    configCss(){

        this.css =
            Css.margin(0) + 
            Css.widthPx(this.size.width) + 
            Css.heightPx(this.size.height) + 
            Css.backgroundColor('white') + 
            Css.position('absolute') + 
            Css.top(this.Y + 'px') + 
            Css.left(this.X + 'px')
        return this.css
    }

    createHtmlElement(){
        let shoot = document.createElement('figure')
        shoot.setAttribute("id", this.id)
        shoot.style.cssText = this.configCss()
        this.element = shoot
        return this.element
    }

    getRect(){
        return {x:this.X, y:this.Y, width:this.size.width, height:this.size.height}
    }

    move(){
        this.X += this.speed
        this.element.style.left = this.X + "px"
    }

    animate(){
        this.interval = setInterval(this.move.bind(this), 33)
    }

}