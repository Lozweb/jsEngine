import { Layer } from "./Layer.js"

export class Background{
    
    constructor(width, height){
        this.width = width
        this.height = height
        this.layers = new Array()
    }

    addLayer(name, backgroundImage, screen){

        let layer = new Layer(name, backgroundImage)
        let html = layer.createHtmlElement()
        screen.container.innerHTML += html
        layer.element = document.getElementById(name)
        layer.element.style.cssText += layer.configCss()
        this.layers.push(layer)

    }

}