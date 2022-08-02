import { Css } from "../Css.js"

export class Star{

    constructor(id, x, y, speed){

        this.id = id
        this.x = x
        this.y = y
        this.speed = speed
        this.element = null
        this.css = ""
        this.size = speed
        this.color = ""
    }

    createHtmlElement(){

        let star = document.createElement('figure')
        star.setAttribute("id", this.id)
        star.style.cssText = this.configCss()
        this.element = star
        return this.element
        
    }

    configCss(){

        this.css = 
            Css.widthPx(this.size) + 
            Css.heightPx(this.size) +
            Css.borderRadius(50) + 
            Css.backgroundColor(this.color) + 
            Css.position("absolute") + 
            Css.top(this.y + "px") + 
            Css.left(this.x + "px")

        return this.css

    }
}