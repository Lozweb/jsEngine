import { Layer } from "../Layer.js";
import { Css } from "../Css.js";

export class InfinitStars extends Layer{

    constructor(name){
        super(name)
        this.count = 1;
        this.element = null
    }

    configCss(){

        this.css = 
        Css.widthPercent("100") + 
        Css.heightPercent("100") + 
        Css.margin("auto") + 
        Css.position("absolute")

        return this.css
    }

    test(){
        
        
        this.count ++;
        if(this.count/10 === 1){
            this.element.style.backgroundColor = "#fff"
            this.count = 1;
        }
        else{
            this.element.style.backgroundColor = "transparent"
        }

    }

    animate(){
        this.interval = setInterval(this.test.bind(this), 33)
    }

}