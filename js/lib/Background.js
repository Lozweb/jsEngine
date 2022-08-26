import { Ath } from "./layer-type/Ath.js"
import { InifinitBackground } from "./layer-type/InfinitBackground.js"
import { InfinitStars } from "./layer-type/InfinitStars.js"
import { StartScreen } from "./layer-type/StartScreen.js"
import { Layer } from "./Layer.js"

export class Background{
    
    /**
     * 
     * @param {*} width layer width
     * @param {*} height layer height
     */
    constructor(width, height){
        this.width = width
        this.height = height
        this.layers = new Array()
    }

    /**
     * 
     * @param {string} name Id div container
     * @param {string} type type Layer extends 
     * @param {DOMHtmlObject} container parent container
     * @param {string} backgroundImage facultatif imageName
     */

    addLayer(name, type, container, backgroundImage="", engine){

        let layer

                                                //add new div to parent div
        let div = document.createElement('div')
        div.setAttribute("id", name)
        container.appendChild(div)

                                                //select type layer extends
        if(type === "infinitBackground")
            layer = new InifinitBackground(name, backgroundImage)
        
        if(type === 'infinitStars')
            layer = new InfinitStars(name, container)
        
        if(type === 'none')
            layer = new Layer(name, container)

        if(type === 'menu')
            layer = new StartScreen(name, backgroundImage)

        if(type === 'ath')
            layer = new Ath(name, container, engine)
                                                            //get DOMHtmlElement created + config css
        layer.element = document.getElementById(name)
        layer.element.style.cssText += layer.configCss()

                                                //store on array
        this.layers.push(layer)
    }

}