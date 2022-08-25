import { Layer } from "../Layer.js"
import { Css } from "../Css.js"

export class InifinitBackground extends Layer{

    constructor(name, backgroundImage){
        super(name, backgroundImage)
        this.element = null
        this.computeStyle = null
        this.backgroundPositionX = 0
        this.backgroundPositionY = 0
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
        Css.margin("auto") + 
        Css.position("absolute")

        return this.css
    }

    moveTo(direction){

        if(direction === "left") this.backgroundPositionX--;
        if(direction === "right") this.backgroundPositionX++;
        if(direction === "top") this.backgroundPositionY--;
        if(direction === "bottom") this.backgroundPositionY++;
        this.setPosition()
    }

    setPosition(){
        this.element.style.backgroundPositionX = this.backgroundPositionX + "px"
        this.element.style.backgroundPositionY = this.backgroundPositionY + "px"
    }

    animate(direction){
        this.interval = setInterval(this.moveTo.bind(this), 16, direction)
    }

}