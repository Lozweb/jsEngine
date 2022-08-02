import { Star } from "./Star.js"

export class StarsGenerator{

    constructor(maxWidth, maxHeigth, direction){
        this.countId = 0
        this.maxWidth = maxWidth
        this.maxHeigth = maxHeigth
        this.direction = direction
        this.colors = [
            '#afc9ff',
            '#c7d8ff',
            '#fff4f3',
            '#ffe5cf',
            '#ffd9b2',
            '#ffc78e',
            '#ffa651'
        ]
    }

    createRandomStar(){

        if(this.direction === 'left' || this.direction === 'right'){

            if(this.init) var x = this.getRandom(0, this.maxWidth)
            if(this.direction === 'left' && !this.init) var x = this.maxWidth
            if(this.direction === 'right'&& !this.init) var x = 0
            var y = this.getRandom(0, this.maxHeigth)            
        }

        if(this.direction === 'top' || this.direction === 'bottom'){

            if(this.init) var y = this.getRandom(0, this.maxHeigth)
            if(this.direction === 'top' && !this.init) var y = this.maxHeigth
            if(this.direction === 'bottom' && !this.init) var y = 0
            var  x = this.getRandom(0, this.maxWidth)

        }

        var speed = this.getRandom(1, 6)

        var star = new Star(this.countId, x, y, speed)
        star.color = this.getRandomColor()
        
        this.countId++

        return star

    }

    getRandomColor(){
        return this.colors[this.getRandom(0,6)]
    }

    getRandom(min, max){
        return Math.floor(Math.random() * (max - min + 1) ) + min
    }

}