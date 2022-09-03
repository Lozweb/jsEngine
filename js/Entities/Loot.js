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
        this.direction = 'bottom'

        if(this.getRandom(0,1) === 0) this.direction = 'top'

        this.img = ''
        if(this.type === 'speed')this.img = Assets.png('loot01')
        if(this.type === 'power')this.img = Assets.png('loot02')
        
        this.rotate = 0
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
            Css.backgroundImage(this.img) + 
            Css.backgroundSize('30px')

        return this.css
    }

    createHtmlElement(){

        let loot = document.createElement('figure')
        loot.setAttribute('id', this.id)
        loot.setAttribute('class', 'loot')
        loot.style.cssText = this.configCss()
        this.element = loot
        return this.element

    }

    move(){

        this.position.x -= 0.7 
        if(this.direction === 'top') this.position.y -= 0.1
        else this.position.y += 0.1
        this.rotate += 2
        this.element.style.left = this.position.x + 'px'
        this.element.style.top = this.position.y + 'px'
        this.element.style.transform = "rotate("+this.rotate+"deg)"

    }

    animate(){

        this.interval = setInterval(this.move.bind(this), 33)
        this.engine.intervalArray.push(this.interval)

    }

    getRect(){
        return {x:this.position.x, y:this.position.y, width: this.size.width, height:this.size.height}
    }

    getRandom(min, max){
        return Math.floor(Math.random() * (max - min + 1) ) + min
    }
}