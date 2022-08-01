import { CssSnipet } from "./CssSnipet.js"

export class Layer{

    constructor(name, lvl, backgroundImage){
        this.name = name
        this.lvl = lvl
        this.backgroundImage = backgroundImage
    }

    configLayer(){
        this.css = 
            CssSnipet.backgroundImage(this.backgroundImage) + 
            CssSnipet.backgroundSize("auto 100%") + 
            CssSnipet.backgroundPosition(0, 0) + 
            CssSnipet.backgroundRepeat("repeat") + 
            CssSnipet.widthPercent("100%") + 
            CssSnipet.heightPercent("100%")
    }

}