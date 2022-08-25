import { Css } from "./Css.js"

export class Screen{

    /**
     * 
     * @param {string} id <div> id
     * @param {number} width div width
     * @param {number} height div height
     */
    constructor(id, width, height){
        this.id = id
        this.container = document.getElementById(this.id)
        this.width = width
        this.height = height
    }

    /**
     * getSize() & onResize() : en prévision d'un screen resizable
     */

    getSize(){
        return [
            this.container.offsetWidth, 
            this.container.offsetHeight
        ]
    }

    onResize(){
        this.container = document.getElementById(this.id)
    }

    /**
     * Config du css en ligne de la <div> id=game
     * @param {string} color background color
     */

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
            Css.webkitTransform('translateY(-50%) translateX(-50%)') + 
            Css.border('1px solid #021e0b')

        return this.css
        
    }

    

}