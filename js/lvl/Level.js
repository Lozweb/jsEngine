import { Background } from "../lib/Background.js"
import { Assets } from "../lib/Assets.js"
import { Starchip } from "../Entities/Starchip.js"

export class Level{

    constructor(name, engine){
        this.name = name
        this.engine = engine
        this.screen = this.engine.screen
        this.background = new Background(this.screen.id, this.screen.width, this.screen.height)
        this.interval = null
    }

    configLayer(){

        //json for config layer and level name
        this.background.addLayer("stars", "infinitStars", this.screen.container)
        this.background.addLayer("nebuleuse", "infinitBackground", this.screen.container, Assets.png("nebuleuse"))
        this.background.addLayer("entities", "none", this.screen.container)
    }

    addEntity(element, layerIndex){
        this.background.layers[layerIndex].addEntity(element)
    }

    getEnemy(id, x, y){
        return new Starchip(id, x, y)
    }

    getLayer(layerIndex){
        return this.background.layers[layerIndex]
    }

    animateLayer(direction, layerIndex){
        this.background.layers[layerIndex].animate(direction)
    }

    chronologie(){
        //setinterval to factory enemy and put on layer
    }
}