import { Starchip } from "./Starchip.js"

export class EntitiesManager{

    constructor(engine, layerIndex){

        this.engine = engine
        this.layer = layerIndex

        this.entities = new Array()
                
        this.timer = null

        this.tick = 0

        this.count = 0

    }

    loadLevel(data){
        
        for(let enemy of data["enemies"]){
            this.entities.push(
                new Starchip(
                    'en' + this.count, 
                    enemy.X, 
                    enemy.Y, 
                    enemy.time, 
                    enemy.ia
                )
            )

            this.count ++
        }

    }

    start(){

        //100ms
        this.timer = setInterval(this.checkAddEnemy.bind(this), 100)

    }

    checkAddEnemy(){

        this.tick += 100

        for(let enemy of this.entities){

            if(this.tick/100 === enemy.time){

                this.newEnemy(enemy)
    
            }
        }

    }

    newEnemy(enemy){

        this.engine.level1.addEntity(enemy, this.layer)
        enemy.getPosition()
        enemy.animate()
        this.engine.EnemiesArray.push(enemy)

    }
    
}