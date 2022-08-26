import { Layer } from "../Layer.js";
import { Css } from "../Css.js"
import { Assets } from "../Assets.js";

export class StartScreen extends Layer{

    constructor(name, backgroundImage){
        super(name, backgroundImage)
        this.container = null
        this.logo = null
        this.text = null
        this.start = null
        this.button = null
    }

    configCss(){
        this.css = 
        Css.widthPercent(100) + 
        Css.heightPercent(100) + 
        Css.margin("auto") + 
        Css.position("absolute")

        return this.css
    }

    createHtmlElement(){

        this.container = document.createElement('div')
        this.container.setAttribute('id', 'content')
        this.container.style.cssText = this.configCss()

        this.logo = document.createElement('div')
        this.logo.setAttribute('id', 'logo')
        this.logo.style.cssText = 
            Css.backgroundImage(Assets.jpg('sillon')) + 
            Css.backgroundSize('100%') + 
            Css.widthPercent(50) + 
            Css.heightPercent(50) + 
            Css.backgroundRepeat('no-repeat') + 
            Css.margin('auto') + 
            Css.position('relative') + 
            Css.top('100px')
        
        this.text = document.createElement('div')
        this.text.setAttribute('id', 'text')
        this.text.style.cssText = 
            Css.margin(0) + 
            Css.widthPercent(100) + 
            Css.textAlign('center') + 
            Css.fontFamily('retro') + 
            Css.position('relative') + 
            Css.top('-10px')

        this.text.textContent = "Space shooter Sillon Lauzé"

        this.start = document.createElement('div')
        this.start.setAttribute('id', 'start')
        this.start.style.cssText = 
            Css.margin(0) + 
            Css.widthPercent(100) + 
            Css.textAlign('center') + 
            Css.fontFamily('retro') + 
            Css.position('relative') + 
            Css.top('100px')

        this.start.textContent = "Press Space to Start"

        this.button = document.createElement('button')
        this.button.setAttribute('id', 'button')
        this.button.setAttribute('onclick', 'play()')
        this.button.style.cssText = 
            Css.widthAuto() + 
            Css.left('44%') + 
            Css.top('200px') +
            Css.position('relative')

        this.button.textContent = 'Play Intro Music'
        
        this.container.append(this.logo)
        this.container.append(this.text)
        this.container.append(this.start)
        this.container.append(this.button)

        return this.container
    }

    addElement(){

        let layer = document.getElementById(this.name)
        layer.appendChild(this.createHtmlElement())

    }

    init(){

        this.addElement()

    }
}