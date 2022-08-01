import { InifinitBackground } from "./layer-type/InfinitBackground.js"
import { InfinitStars } from "./layer-type/InfinitStars.js"

export class Background{
    
    constructor(width, height){
        this.width = width
        this.height = height
        this.layers = new Array()
        this.elements = new Array()
    }

    addLayer(name, type, screen, backgroundImage=""){

        let layer

        if(type === "infinitBackground"){
            layer = new InifinitBackground(name, backgroundImage)
        }

        if(type === 'infinitStars'){
            layer = new InfinitStars(name)
        }
            
        let html = layer.createHtmlElement()

        screen.container.innerHTML += html

        layer.element = document.getElementById(name)
        
        layer.element.style.cssText += layer.configCss()

        this.layers.push(layer)
    }

}