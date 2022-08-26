import { Assets } from "../lib/Assets.js";
import { Css } from "../lib/Css.js";

export class Loot{

    constructor(id, type, x, y, engine){

        this.engine = engine
        this.id = id
        this.type = type

        this.size = {
            width: 30, 
            height: 30
        }

        this.position = {
            x: x, 
            y: y
        }

        this.css = ""

        this.element = null

        this.interval = null

        this.power = 10

        //design for speed & power
        //shield ?
        //rotate figure?
        //speed.Y ++ ?
    }

    configCss(){

        this.css = 
            Css.widthPx(30) +
            Css.heightPx(30) + 
            Css.backgroundColor('none') + 
            Css.position('absolute') + 
            Css.margin('0') + 
            Css.top(this.position.y + 'px') +
            Css.left(this.position.x + 'px') + 
            Css.backgroundImage(Assets.png('loot01')) + 
            Css.backgroundSize('cover')

        return this.css
    }

    createHtmlElement(){

        let loot = document.createElement('figure')
        loot.setAttribute('id', this.id)
        loot.style.cssText = this.configCss()
        this.element = loot
        return this.element

    }

    move(){

        this.position.x -= 1
        this.element.style.left = this.position.x + 'px'

    }

    animate(){

        this.interval = setInterval(this.move.bind(this), 16)
        this.engine.intervalArray.push(this.interval)

    }

    getRect(){
        return {x:this.position.x, y:this.position.y, width: this.size.width, height:this.size.height}
    }
}