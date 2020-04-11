new Vue({
    el: "#app",
    data: {
        started : false,
        won: false,
        monster : {
            name: "monster",
            health : 100,
            attack : 5,
            special : 10
        },
        player : {
            name: "player",
            health : 10,
            attack : 3,
            special : 7,
            heal : 7
        },
        logs : [
        ]

    },
    methods:{
        Attack : function(mode, attacker, enemy){
            console.log(enemy[mode]);
            
            if(attacker.health > 0){
                enemy.health = enemy.health - attacker[mode];
                if(enemy.health <= 0){
                    enemy.health = 0;
                }
                this.logs.unshift(this.addToLog(mode, attacker, enemy));

                if(attacker == this.player){
                    this.Attack("attack", enemy, attacker);
                }
            }
        },
        heal : function(){
            if(this.player.health <= 100){              
                this.player.health = this.player.health + this.player.heal
                if(this.player.health >= 100){
                    this.player.health = 100
                }
                this.logs.unshift(this.addToLog("heal", this.player, this.monster));
                this.Attack("attack", this.monster, this.player);
            }
        },
        resetAll : function(){
            this.started = true;
            this.player.health = 100;
            this.monster.health = 100;
            this.logs = [];
        },
        addToLog : function(mode, attacker, enemy){
            if(mode === "heal"){
                // return [attacker.name, attacker[mode]]
                return attacker.name + " heals for " + attacker[mode]; 
            }else{
                // return [attacker.name, enemy.name, attacker[mode]]
                return attacker.name + " hits " + enemy.name + " for " + attacker[mode];
            }            
        }
    }
})