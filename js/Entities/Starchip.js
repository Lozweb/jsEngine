import { Css } from "../lib/Css.js";

export class Starchip{

    constructor(id){

        this.id = id
        this.css = ""
        this.element = null

        this.X = 0
        this.Y = 0

        this.speed = 10

        this.size = {
            width: 30, 
            height: 20
        }

    }

    configCss(){
        this.css = 
            Css.widthPx(this.size.width) + 
            Css.heightPx(this.size.height) + 
            Css.backgroundColor('red') +
            Css.position('absolute') + 
            Css.margin('0') +
            Css.top('420px') + 
            Css.left('150px')
        return this.css
    }

    createHtmlElement(){
        let starchip = document.createElement('figure')
        starchip.setAttribute('id', this.id)
        starchip.style.cssText = this.configCss()
        this.element = starchip
        return this.element
    }

    getRect(){
        return {x:this.X, y:this.Y, width: this.size.width, height: this.size.height}
    }

    getPosition(){

        let style = window.getComputedStyle(this.element)
        this.X = parseInt(style.getPropertyValue('left'))
        this.Y = parseInt(style.getPropertyValue('top'))
        return [this.X, this.Y]

    }

}