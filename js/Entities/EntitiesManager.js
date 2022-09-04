import { Css } from "../lib/Css.js"
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

    loadLevel(file){

        fetch(file)
        .then(rep => {return rep.json()})
        .then(jsonData => this.initLevel(jsonData))
    }

    initLevel(data){
        
        for(let enemy of data["enemies"]){

            let loot = false
            if(enemy.loot === '1')loot = true
            
            if(enemy.ia === 'boss'){
                //check boss
                let boss = new Starchip(
                    this.engine, 
                    'en' + this.count, 
                    enemy.X, 
                    enemy.Y, 
                    enemy.time, 
                    enemy.ia, 
                    loot, 
                    enemy.lootType, 
                    enemy.lootPower, 
                    230, 
                    336,
                    '9B'
                )
                boss.life = 10000
                boss.points = 100000
                this.entities.push(boss)
            }
            else{
                this.entities.push(
                    new Starchip(
                        this.engine,
                        'en' + this.count, 
                        enemy.X, 
                        enemy.Y, 
                        enemy.time, 
                        enemy.ia, 
                        loot, 
                        enemy.lootType, 
                        enemy.lootPower
                    )
                )
            }
            this.count ++
        }

    }

    start(){

        this.timer = setInterval(this.checkAddEnemy.bind(this), 100)
        this.engine.intervalArray.push(this.timer)

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

        this.engine.levelManager.level1.addEntity(enemy, this.layer)
        enemy.getPosition()
        enemy.animate()
        this.engine.levelManager.EnemiesArray.push(enemy)

    }
    
    reset(){
        this.tick = 0
        this.count = 0
    }
}