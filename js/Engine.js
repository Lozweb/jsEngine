import { Screen } from "./lib/Screen.js"
import { Background } from "./lib/Background.js"
import { Assets } from "./lib/Assets.js"

export class Engine{

    constructor(id, width, height){
        this.width = width
        this.height = height
        this.screen = new Screen(id, width, height)
        this.pos = 0;
    }

    load(){
        
        this.screen.container.style.cssText += this.screen.configContainer("#000")
        this.background = new Background(this.screen.width, this.screen.height, this.screen)
        
        this.background.addLayer("stars", "infinitStars", this.screen.container)
        this.background.addLayer("nebuleuse", "infinitBackground", this.screen.container, Assets.png("nebuleuse"))
    }

    run(){

        this.background.layers[1].animate("left")
        this.background.layers[0].animate("left")
        
    }
}