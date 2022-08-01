import { CssSnipet } from "./CssSnipet.js"

export class Layer{

    constructor(name, backgroundImage){
        this.name = name
        this.backgroundImage = backgroundImage
        this.element = null
        this.computeStyle = null
        this.backgroundPositionX = 0
        this.backgroundPositionY = 0
    }

    configCss(){
        
        this.css = 
            CssSnipet.backgroundImage(this.backgroundImage) + 
            CssSnipet.backgroundSize("auto 100%") + 
            CssSnipet.backgroundPosition(0, 0) + 
            CssSnipet.backgroundRepeat("repeat") + 
            CssSnipet.widthPercent("100") + 
            CssSnipet.heightPercent("100") + 
            CssSnipet.margin("auto")
        return this.css
    
    }

    createHtmlElement(){
        
        this.html = '<figure id="' + this.name + '"></figure>'
        return this.html

    }

    animate(direction){

        if(this.computeStyle === null) this.configAnimate()

        if(direction === "left") this.backgroundPositionX--;
        if(direction === "right") this.backgroundPositionX++;
        if(direction === "top") this.backgroundPositionY--;
        if(direction === "bottom") this.backgroundPositionY++;
        
        this.element.style.backgroundPositionX = this.backgroundPositionX + "px"
        this.element.style.backgroundPositionY = this.backgroundPositionY + "px"
    }


    configAnimate(){
        this.computeStyle = window.getComputedStyle(this.element)
        this.backgroundPositionX = parseInt(this.computeStyle.style.getPropertyValue('background-position-x'))
        this.backgroundPositionY = parseInt(this.computeStyle.style.getPropertyValue('background-position-y'))
    }

}