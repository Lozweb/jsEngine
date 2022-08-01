import { CssSnipet } from "./CssSnipet.js"

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
            CssSnipet.minWidthPx(this.minWidth) + 
            CssSnipet.minHeightPx(this.minHeight) + 
            CssSnipet.widthPx(this.width) + 
            CssSnipet.heightPx(this.height) +  
            CssSnipet.position('absolute') + 
            CssSnipet.zIndex('-10') +
            CssSnipet.backgroundColor(color) + 
            CssSnipet.overflow('hidden') + 
            CssSnipet.margin('auto') + 
            CssSnipet.top('50%') + 
            CssSnipet.left('0') + 
            CssSnipet.right('0') + 
            CssSnipet.webkitTransform('translateY(-50%)')

        return this.css
    }

}