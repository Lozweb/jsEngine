import { Screen } from "./lib/Screen.js"
import { Background } from "./lib/Background.js"
import { Assets } from "./lib/Assets.js"

export class Engine{

    constructor(id, minWidth, minHeight, width, height){
        this.screen = new Screen(id, minWidth, minHeight, width, height)
    }

    load(){
        
        this.screen.container.style.cssText += this.screen.configContainer("#000")
        this.background = new Background(this.screen.width, this.screen.height, this.screen)
        this.background.addLayer("nebuleuse", Assets.png("nebuleuse"), this.screen)
        
    }

    test(){

        this.background.layers[0].animate('left')

    }

}