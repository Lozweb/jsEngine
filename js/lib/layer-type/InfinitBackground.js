import { Layer } from "../Layer.js"
import { Css } from "../Css.js"

export class InifinitBackground extends Layer{

    constructor(name, backgroundImage){
        super(name, backgroundImage)
        this.element = null
        this.computeStyle = null
        this.backgroundPositionX = 0
        this.backgroundPositionY = 0
        this.html = ""
        this.css = ""
        this.interval = null
    }

    configCss(){

        this.css = 
        Css.backgroundImage(this.backgroundImage) +
        Css.backgroundSize("auto 100%") + 
        Css.backgroundPosition(this.backgroundPositionX, this.backgroundPositionY) + 
        Css.backgroundRepeat("repeat") + 
        Css.widthPercent("100") + 
        Css.heightPercent("100") + 
        Css.margin("auto")

        return this.css
    }

    moveTo(direction){

        if(direction === "left") this.backgroundPositionX--;
        if(direction === "right") this.backgroundPositionX++;
        if(direction === "top") this.backgroundPositionY--;
        if(direction === "bottom") this.backgroundPositionY++;
        
        if(direction === "left" || direction === "right") 
            this.element.style.backgroundPositionX = this.backgroundPositionX + "px"
        if(direction === "top" || direction === "bottom") 
            this.element.style.backgroundPositionY = this.backgroundPositionY + "px"
    
    }

    animate(direction){
        this.interval = setInterval(this.moveTo.bind(this), 33, direction)
    }

}