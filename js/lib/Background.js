import { InifinitBackground } from "./layer-type/InfinitBackground.js"
import { InfinitStars } from "./layer-type/InfinitStars.js"

export class Background{
    
    constructor(width, height){
        this.width = width
        this.height = height
        this.layers = new Array()
    }

    addLayer(name, type, container, backgroundImage=""){

        let layer

        if(type === "infinitBackground")
            layer = new InifinitBackground(name, backgroundImage)
        
        if(type === 'infinitStars')
            layer = new InfinitStars(name)
        
        let div = document.createElement('div')
        div.setAttribute("id", name)
        container.appendChild(div)

        layer.element = document.getElementById(name)
        layer.element.style.cssText += layer.configCss()

        this.layers.push(layer)
    }

}