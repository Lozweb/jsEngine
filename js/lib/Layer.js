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

}