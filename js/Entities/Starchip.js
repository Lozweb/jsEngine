import { Assets } from "../lib/Assets.js";
import { Css } from "../lib/Css.js";
import { Explosion } from "./Explosion.js";

export class Starchip{

    constructor(id, x=0, y=0){

        this.id = id
        this.css = ""
        this.element = null

        this.X = x
        this.Y = y

        this.speed = 5

        this.size = {
            width: 23, 
            height: 27
        }

        this.interval = null

        this.motion = {
            ampli: 200,
            speed: 0.02, 
            deph: 350,
            tick: 0, 
            pi: 3.14
        }

        this.layer = null
        
        this.life = 100

        this.createHtmlElement()
    }

    configCss(){
        this.css = 
            Css.widthPx(this.size.width) + 
            Css.heightPx(this.size.height) + 
            Css.backgroundColor('none') +
            Css.position('absolute') + 
            Css.margin('0') +
            Css.top(this.Y + 'px') + 
            Css.left(this.X + 'px') + 
            Css.backgroundImage(Assets.png('ennemy1')) 
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

    explosion(id){
        let explod = new Explosion(id, this.X, this.Y)
        explod.createHtmlElement()
        this.layer.addEntity(explod.element)
        explod.animate()
        this.element.style.background = "none"
    }

    straight(){ 

        this.X -= this.speed
        this.element.style.left = this.X + "px"

    }

    sinus(){

        this.speed = 5
        this.X -= this.speed

        this.motion.tick ++
        this.Y = (this.motion.ampli * Math.sin(this.motion.tick*this.motion.speed*this.motion.pi)) + this.motion.deph

        this.element.style.left = this.X + "px"
        this.element.style.top = this.Y + "px"

    }

    animate(comportement){
        if(comportement === "straight") this.interval = setInterval(this.straight.bind(this), 33)
        if(comportement === "sinus") this.interval = setInterval(this.sinus.bind(this), 33)
    }
}