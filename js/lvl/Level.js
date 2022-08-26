import { Background } from "../lib/Background.js"
import { Assets } from "../lib/Assets.js"

export class Level{

    constructor(name, engine){
        this.name = name
        this.engine = engine
        this.screen = this.engine.screen
        this.background = new Background(this.screen.id, this.screen.width, this.screen.height)
        this.isInit = true

        document.addEventListener('keydown', () => {
            this.engine.player.keyDown(event, this.engine.player)
        })
        document.addEventListener('keyup', () => {
            this.engine.player.keyUp(event, this.engine.player)
        })

        document.addEventListener('keypress', () => 
        {
            this.engine.keyPress(event)
        })
    }

    configLayer(){

        this.background.addLayer("entities", "none", this.screen.container)
        this.background.addLayer("ath", "ath", this.screen.container, '',this.engine)

    }

    configMenu(){

        this.background.addLayer("stars", "infinitStars", this.screen.container)
        this.background.addLayer("nebuleuse", "infinitBackground", this.screen.container, Assets.png("nebuleuse"))
        this.background.addLayer("menu", "menu", this.screen.container)
        
    }

    configGameOver(){
        this.background.addLayer("gameOver", "gameOver", this.screen.container, '', this.engine)
    }

    addEntity(entity, layerIndex){

        this.background.layers[layerIndex].addEntity(entity.element)
        entity.layer = this.background.layers[layerIndex]

    }

    animateLayer(direction, layerIndex){
        
        this.background.layers[layerIndex].animate(direction)
        this.engine.intervalArray.push(this.background.layers[layerIndex].interval)
    }

    initLayer(layerIndex){
        this.background.layers[layerIndex].init()
    }
}