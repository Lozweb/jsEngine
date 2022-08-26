

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

        for(let enemy of this.engine.levelManager.EnemiesArray){

            //check player hit enemies
            for(let shoot of this.engine.player.shootArray){

                if(this.isCollide(
                    shoot.getRect(), 
                    enemy.getRect()
                ))
                {
                    this.engine.player.removeShoot(shoot)
                    enemy.life -= shoot.power
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
                this.engine.player.damage(40)
            }

            if(enemy.life <= 0) {
                enemy.explosion('explos-' + enemy.id)
            }

        }

        for(let shootEn of this.engine.levelManager.EnemiesShootArray){
            if(this.isCollide(
                shootEn.getRect(), 
                this.engine.player.getRect()
            ))
            {
                this.engine.player.damage(shootEn.power)
                document.getElementById(shootEn.id).remove()
                this.engine.levelManager.EnemiesShootArray = this.engine.levelManager.EnemiesShootArray.filter(data => data.id != shootEn.id)
            }
        }

        for(let loot of this.engine.levelManager.lootArray){
            if(this.isCollide(
                loot.getRect(), 
                this.engine.player.getRect()
            ))
            {
                this.engine.levelManager.audioManager.playMusic('loot')

                if(loot.type === 'power') this.engine.player.power += loot.power
                if(loot.type === 'speed') this.engine.player.speed += loot.power

                document.getElementById(loot.id).remove()
                this.engine.levelManager.lootArray = this.engine.levelManager.lootArray.filter(data => data.id != loot.id)
            }
        }

    }

    cleanScreen(){

        //clear shoot
        for(let shoot of this.engine.player.shootArray){

            if(shoot.X > this.engine.width){

                this.engine.player.removeShoot(shoot)

            }
        
        }

        //clear shoot enemy
        for(let shootEn of this.engine.levelManager.EnemiesShootArray){

            if(shootEn.X > this.engine.width || shootEn.X < 0 ||shootEn.Y > this.engine.height || shootEn.Y < 0){
                document.getElementById(shootEn.id).remove()
                this.engine.levelManager.EnemiesShootArray = this.engine.levelManager.EnemiesShootArray.filter(data => data.id != shootEn.id)
            }

        }

        //clear enemy
        for(let enemy of this.engine.levelManager.EnemiesArray){

            if(enemy.X < 0 || enemy.life <= 0){

                document.getElementById(enemy.id).remove()
                this.engine.levelManager.EnemiesArray = this.engine.levelManager.EnemiesArray.filter(data => data.id != enemy.id)

            }

        }

        //clear loot

    }

}