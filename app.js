new Vue({
    el: '#app',
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false,
        turns:[],
        actions: ['attack', 'specialAttack', 'heal', 'monsterAttacks']
    },
    methods: {
        startGame() {
            this.gameIsRunning = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.turns = [];
        },
        attack() {

            var damage = this.calculateDamage(3, 10)
            this.monsterHealth -= damage;
            this.actionAddToArray(this.actions[0], damage);
            
            if(this.checkWin()){
                return;
            }

            this.monsterAttacks();
        },
        specialAttack() {

            var damage = this.calculateDamage(10, 20)
            this.monsterHealth -= damage;
            this.actionAddToArray(this.actions[1], damage);
            
            if(this.checkWin()){
                return;
            }
            this.monsterAttacks();
        },
        heal() {

            let healValue = 10;

            if(this.playerHealth<=90){
                this.playerHealth +=10;
                this.monsterAttacks();
            }else {
                this.playerHealth = 100;
            }

            this.actionAddToArray(this.actions[2], healValue);

            this.monsterAttacks();
        },
        giveUp() {
            this.gameIsRunning = false;
        },
        monsterAttacks(){
            let damage = this.calculateDamage(5, 12)
            this.playerHealth -= damage;

            this.actionAddToArray(this.actions[3], damage);

            this.checkWin();
        },
        calculateDamage(min, max) {
            return Math.max(Math.floor(Math.random() * max + 1), min);
        },
        checkWin() {
            if(this.monsterHealth <= 0) {
                if(confirm('You won! New Game?')){
                    this.startGame();
                }else{
                    this.gameIsRunning = false;
                }
                return true;
            }else if(this.playerHealth <= 0){
                if(confirm('You lost! New Game?')){
                    this.startGame();
                }else{
                    this.gameIsRunning = false;
                }
                return true;
            }
            return false;
        },
        actionAddToArray(action, damage) {
            let a = true, b;
            switch(action) {
                case this.actions[0]:
                b = `Player hits Monster for ${damage}`;
                break;

                case this.actions[1]:
                b = `Player hits Monster for ${damage}`;
                break;

                case this.actions[2]:
                b = `Player heals for ${damage}` ;
                break;

                case this.actions[3]:
                a = false;
                b = `Monster hits Player for ${damage}`;
                break;
            }

            console.log(a, b);

            this.turns.unshift({
                isPlayer: a,
                text: b
            }); 

            this.turns[2]='';
            this.turns[3]='';
        }
    }
});