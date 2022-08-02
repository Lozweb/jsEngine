import { Layer } from "../Layer.js";
import { Css } from "../Css.js";
import { StarsGenerator } from "./StarsGenerator.js";
import { Star } from "./Star.js";

export class InfinitStars extends Layer{

    constructor(name, container){

        super(name)
        this.arrStar = new Array()
        this.elements = new Array()
        this.container = container
        this.stars = new StarsGenerator(
            parseInt(container.offsetWidth),
            parseInt(container.offsetHeight), 
            'left'
        )
        this.load()
    }

    load(){

        while(this.stars.countId < 50){

            this.arrStar.push(this.stars.createRandomStar())

        }

        for(let i = 0; i < this.arrStar.length; i++){

            this.arrStar[i].element = this.arrStar[i].createHtmlElement()
            
            let bg = document.getElementById(this.name)

            bg.appendChild(this.arrStar[i].element)
            let star = document.getElementById(this.arrStar[i].id)
            this.elements.push(star)
        }

    }

    configCss(){

        this.css = 
        Css.widthPercent("100") + 
        Css.heightPercent("100") + 
        Css.margin("auto") + 
        Css.position("absolute")

        return this.css
    }

    moveTo(direction){

        for(let i = 0; i < this.elements.length; i++){

            this.elements[i].x += this.elements[i].speed
            //console.log(this.elements[i].x);

        }

    }
    

    animate(direction){
        this.interval = setInterval(this.moveTo.bind(this), 33, direction)
    }

}