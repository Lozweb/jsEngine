import { Layer } from "../Layer.js";
import { Css } from "../Css.js";
import { StarsGenerator } from "./StarsGenerator.js";

export class InfinitStars extends Layer{

    constructor(name, container){
        super(name)
        this.arrStar = new Array()
        this.container = container
        this.stars = new StarsGenerator(
            parseInt(container.offsetWidth),
            parseInt(container.offsetHeight), 
            'left'
        )
        this.load()
    }

    load(){
        while(this.stars.countId < 25){
            this.arrStar.push(this.stars.createRandomStar())
        }

        for(let i = 0; i < this.arrStar.length; i++){

            this.arrStar[i].element = this.arrStar[i].createHtmlElement()
            let bg = document.getElementById(this.name)
            bg.appendChild(this.arrStar[i].element)
        }
        this.stars.init = false
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

        if(this.arrStar.length > 0){

            for(let i = 0; i < this.arrStar.length; i++){

                if(direction === 'bottom')
                    this.arrStar[i].y += this.arrStar[i].speed
                if(direction === 'top')
                    this.arrStar[i].y -= this.arrStar[i].speed
                if(direction === 'left')
                    this.arrStar[i].x -= this.arrStar[i].speed
                if(direction === 'right')
                    this.arrStar[i].x += this.arrStar[i].speed
                    
                this.arrStar[i].setPosition()
    
                if(this.isOut(this.arrStar[i])){
                    this.remove(this.arrStar[i])
                    this.addNewStar()
                }
                    
            }
        }
    }

    remove(entity){
        if(entity != null){
            this.arrStar = this.arrStar.filter(data => data.id != entity.id)
            document.getElementById(entity.id).remove()
        }
    }

    addNewStar(){
        this.arrStar.push(this.stars.createRandomStar())
        this.arrStar[this.arrStar.length-1].element = this.arrStar[this.arrStar.length-1].createHtmlElement()
        let bg = document.getElementById(this.name)
        bg.appendChild(this.arrStar[this.arrStar.length-1].element)
    }

    isOut(entity){
        if(entity.x > this.width || entity.x < -50) return true;
        if(entity.y > this.heigth || entity.y < 0) return true
        else return false
    }
    

    animate(direction){
        this.interval = setInterval(this.moveTo.bind(this), 33, direction)
    }

}