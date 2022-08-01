import { Layer } from "./Layer.js"
import { InifinitBackground } from "./layer-type/InfinitBackground.js"

export class Background{
    
    constructor(width, height){
        this.width = width
        this.height = height
        this.layers = new Array()
    }

    addLayer(name, type, backgroundImage, screen){

        let layer

        if(type === "infinitBackground"){
            layer = new InifinitBackground(name, backgroundImage)
            layer.start('left')
        }
            
        let html = layer.createHtmlElement()
        screen.container.innerHTML += html
        layer.element = document.getElementById(name)
        layer.element.style.cssText += layer.configCss()
        this.layers.push(layer)
    }

}