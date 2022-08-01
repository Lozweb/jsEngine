import { Css } from "./Css.js"

export class Screen{

    constructor(id, minWidth, minHeight, width, height){
        this.id = id
        this.container = document.getElementById(this.id)
        this.minWidth = minWidth
        this.minHeight = minHeight
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
            Css.minWidthPx(this.minWidth) + 
            Css.minHeightPx(this.minHeight) + 
            Css.widthPx(this.width) + 
            Css.heightPx(this.height) +  
            Css.position('absolute') + 
            Css.zIndex('-10') +
            Css.backgroundColor(color) + 
            Css.overflow('hidden') + 
            Css.margin('auto') + 
            Css.top('50%') + 
            Css.left('0') + 
            Css.right('0') + 
            Css.webkitTransform('translateY(-50%)')

        return this.css
        
    }

}