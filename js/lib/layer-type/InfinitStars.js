import { Layer } from "../Layer.js";
import { Css } from "../Css.js";

export class InfinitStars extends Layer{

    constructor(name){
        super(name)
    }

    configCss(){

        this.css = 
        Css.margin("auto")

        return this.css
    }

}