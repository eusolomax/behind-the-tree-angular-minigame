import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  userName: string = "Solomax"
  coinQuantity: number = 0
  lifeQuantity: number = 100
  staminaQuantity: number = 100

  actionWalking: string = "Caminhando..."
  actionWalkingMoney: string = "Caminhando... (Você encontrou dinheiro!)"
  actionWalkingL10: string = "Caminhando... (Pisou em uma farpa) -10 de vida"
  actionWalkingL10v2: string = "Caminhando... (Uma cobra te picou) -10 de vida"
  actionWalkingG10: string = "Cminhando... (Olha, uma borboleta!) +10 de vida"
  actionWalkingG30: string = "Caminhando... (Incrivel, remedios!) +30 de vida"

  actionSleep: string = "Dormindo..."
  actionSleepL10: string = "Dormindo... (Abelhas me ferroaram) -10 de vida"
  actionSleepG60: string = "Dormindo... (Tive uma boa noite) +60 de stamina"

  lastAction!: string
  currentAction!: string

  sleepButtonLocked: boolean = false

  playRound(){
    this.playRoundStamina()
    this.walkPlay()
    this.beforeRoundChecks()
  }

  sleepRound(){
    this.sleepPlay()
    if (this.staminaQuantity >= 100) {
      this.staminaQuantity = 100
    }
  }

  sleepPlay(){
    let random = Math.floor(Math.random() * 100)
    console.log(random)
    this.lastAction = this.currentAction

    if (random <= 65) {
      this.currentAction = this.actionSleep
      this.staminaQuantity = this.staminaQuantity + 40
    }

    if (random >= 66 && random <= 80) {
      this.currentAction = this.actionSleepG60
      this.staminaQuantity = this.staminaQuantity + 60
    }

    if (random >= 81 && random <= 100) {
      this.currentAction = this.actionSleepL10
      this.lifeQuantity = this.lifeQuantity - 10
      this.staminaQuantity = this.staminaQuantity + 40
    }
  }

  walkPlay(){
    let random = Math.floor(Math.random() * 20)
    this.walkingCheck()
    if (this.currentAction == this.actionWalkingMoney) {this.coinQuantity = this.coinQuantity + random}

    if (this.currentAction == this.actionWalkingG10) {
      this.lifeQuantity = this.lifeQuantity + 10
      if (this.lifeQuantity > 100){
        this.lifeQuantity = 100
      }
    }
    if (this.currentAction == this.actionWalkingG30) {
      this.lifeQuantity = this.lifeQuantity + 30
      if (this.lifeQuantity > 100){
        this.lifeQuantity = 100
      }
    }
    if (this.currentAction == this.actionWalkingL10) {
      this.lifeQuantity = this.lifeQuantity - 10
    }
    if (this.currentAction == this.actionWalkingL10v2) {
      this.lifeQuantity = this.lifeQuantity - 30
    }
  }

  walkingCheck(){
    let random = Math.floor(Math.random() * 100)
    console.log(random)
    this.lastAction = this.currentAction

    if (random <= 70) {this.currentAction = this.actionWalking}
    if (random >= 71 && random <= 75) {this.currentAction = this.actionWalkingMoney}
    if (random >= 76 && random <= 80) {this.currentAction = this.actionWalkingG10}
    if (random >= 80 && random <= 85) {this.currentAction = this.actionWalkingG30}
    if (random >= 86 && random <= 90) {this.currentAction = this.actionWalkingL10}
    if (random >= 91 && random <= 100) {this.currentAction = this.actionWalkingL10v2}
  }

  sleepingCheck(){
    let random = Math.floor(Math.random() * 90)
  }

  playRoundStamina(){
    this.staminaQuantity = this.staminaQuantity - 5
  }

  beforeRoundChecks(){
    if (this.staminaQuantity <= 0 || this.lifeQuantity <= 0) {
      this.endGame()
      return
    }
  }

  endGame(){
    alert("Ah, você morreu! Tente novamente!")
    this.startGame()
  }

  startGame(){
    alert("Jogo começando.")
    this.startGameDefault()
  }

  startGameDefault(){
    this.coinQuantity = 0
    this.lifeQuantity = 100
    this.staminaQuantity = 100
    this.lastAction = ""
    this.currentAction = ""
  }
}
