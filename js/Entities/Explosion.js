import { Assets } from "../lib/Assets.js"
import { AudioManager } from "../lib/AudioManager.js"
import { Css } from "../lib/Css.js"

export class Explosion{
    constructor(id, x, y){

        this.id = id
        this.css = ""
        this.element = null
        this.X = x
        this.Y = y

        this.size = {
            width: 32,
            height: 32
        }

        this.interval = null

        this.count = 1;

        this.audioManager = new AudioManager()
        this.audioManager.addAudioElement('explos' + this.id, Assets.fx('explosion01'), 1, 'fx')
    }

    configCss(){

        this.css =
        Css.margin(0) + 
        Css.widthPx(this.size.width) + 
        Css.heightPx(this.size.height) + 
        Css.position('absolute') + 
        Css.top(this.Y + 'px') + 
        Css.left(this.X + 'px') + 
        Css.backgroundImage(Assets.png("explosion")) +
        Css.backgroundPositionX(0)
        
    return this.css

    }

    createHtmlElement(){

        let explod = document.createElement('figure')
        explod.setAttribute("id", this.id)
        explod.style.cssText = this.configCss()
        this.element = explod
        return this.element

    }

    getRect(){
        return {x:this.X, y:this.Y, width:this.size.width, height:this.size.height}
    }

    animBg(){

        this.element.style.backgroundPositionX = (this.count * this.size.width) + 'px'
        this.count ++   
        if(this.count >  5) {
            clearInterval(this.interval)
            document.getElementById(this.id).remove()
            this.audioManager.stopMusic('explos' + this.id)
            document.getElementById('explos' + this.id).remove()
        }
    }

    animate(){
        this.audioManager.playMusic('explos' + this.id)
        this.interval = setInterval(this.animBg.bind(this), 80)
    }

}