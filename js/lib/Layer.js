import { Css } from "./Css.js"

export class Layer{

    constructor(name, backgroundImage=""){
    
        this.name = name
        this.backgroundImage = backgroundImage
        this.html = ""
        this.css = ""
    }

    configCss(){
        
        return this.css
    
    }

    createHtmlElement(){
        
        this.html = '<figure id="' + this.name + '"></figure>'
        return this.html

    }

}