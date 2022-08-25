import { Layer } from "../Layer.js";
import { Css } from "../Css.js"

export class Ath extends Layer{
    constructor(name, backgroundImage){
        super(name, backgroundImage)
        this.element = null
        this.computeStyle = null
        this.html = ""
        this.css = ""
        this.interval = null
    }

    configCss(){
        this.css = 
        Css.widthPercent(100) + 
        Css.heightPercent(100) + 
        Css.margin("auto") + 
        Css.position("absolute")

        return this.css
    }

    

}