export class Collision{

    constructor(engine){
        this.engine = engine
    }

    isCollide(rect1, rect2){
        return !(
            ((rect1.y + rect1.height) < rect2.y) || 
            (rect1.y > (rect2.y + rect2.height)) ||
            ((rect1.x + rect1.width) < rect2.x) ||
            (rect1.x > (rect2.x + rect2.width))
        )
    }

    checkHitsAndCollidEnemies(){

        for(let enemy of this.engine.EnemiesArray){

            //check player hit enemies
            for(let shoot of this.engine.player.shootArray){

                if(this.isCollide(
                    shoot.getRect(), 
                    enemy.getRect()
                ))
                {
                    this.engine.player.removeShoot(shoot)
                    enemy.life -= this.engine.player.power
                }

                if(shoot.X > this.engine.width)this.engine.player.removeShoot(shoot)

            }

            //check collid with enemies
            if(this.isCollide(
                this.engine.player.getRect(),
                enemy.getRect()
            ))
            {
                //boss or big enemy will not dead !
                enemy.life = 0
            }

            if(enemy.life <= 0) enemy.explosion('explos-' + enemy.id)

        }

    }

    cleanScreen(){

        //clear shoot
        for(let shoot of this.engine.player.shootArray){

            if(shoot.X > this.engine.width){

                this.engine.player.removeShoot(shoot)

            }
        
        }

        //clear enemyheckC
        for(let enemy of this.engine.EnemiesArray){

            if(enemy.X < 0 || enemy.life <= 0){

                document.getElementById(enemy.id).remove()
                this.engine.EnemiesArray = this.engine.EnemiesArray.filter(data => data.id != enemy.id)

            }

        }

    }

}