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
        
        this.html = '<div id="' + this.name + '"></div>'
        return this.html

    }

}