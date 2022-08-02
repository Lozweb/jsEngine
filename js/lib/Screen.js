import { Css } from "./Css.js"

export class Screen{

    constructor(id, width, height){
        this.id = id
        this.container = document.getElementById(this.id)
        this.width = width
        this.height = height
    }

    getSize(){
        return [
            this.container.offsetWidth, 
            this.container.offsetHeight
        ]
    }

    onResize(){
        this.container = document.getElementById(this.id)
    }

    configContainer(color){

        this.css = 
            Css.widthPx(this.width) + 
            Css.heightPx(this.height) +  
            Css.position('absolute') + 
            Css.backgroundColor(color) + 
            Css.overflow('hidden') + 
            Css.margin('auto') + 
            Css.top('50%') + 
            Css.left('50%') + 
            Css.webkitTransform('translateY(-50%) translateX(-50%)')

        return this.css
        
    }

}