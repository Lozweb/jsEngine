import { Layer } from "./Layer.js"

export class Background{
    
    constructor(width, height){
        this.width = width
        this.height = height
    }

    addLayer(name, lvl, backgroundImage){

        this.layers.push(new Layer(name, lvl, backgroundImage))

    }


    
}