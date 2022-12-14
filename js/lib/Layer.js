import { Css } from "./Css.js"

export class Layer{

    constructor(name, backgroundImage=""){
    
        this.name = name
        this.backgroundImage = backgroundImage
        this.css = ""
        this.element = null
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

    addEntity(entity){
        if(this.element != null){
            this.element.appendChild(entity)
        }
        else{
            this.element = document.getElementById(this.name)
            this.addEntity(entity)
        }
    }

}