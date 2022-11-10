import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  userData = {
    userName: "Solomax",
    coinQuantity: 0,
    lifeQuantity: 100,
    staminaQuantity: 100
  }

  actions = {
    actionWalking: "Caminhando...",
    actionWalkingMoney: "Caminhando... (Você encontrou dinheiro!)",
    actionWalkingL10: "Caminhando... (Pisou em uma farpa) -10 de vida",
    actionWalkingL10v2: "Caminhando... (Uma cobra te picou) -10 de vida",
    actionWalkingG10: "Caminhando... (Olha, uma borboleta!) +10 de vida",
    actionWalkingG30: "Caminhando... (Incrivel, remedios!) +30 de vida",
    actionSleep: "Dormindo...",
    actionSleepL05: "Dormindo... (Fui roubado!) -5 de dinheiro",
    actionSleepG60: "Dormindo... (Tive uma boa noite) +60 de stamina"
  }

  actionsFlashLight = {
    actionGreenPulseLife: false ,
    actionGreenPulseStamina: false,
    actionGreenPulseMoney: false,
    
    actionRedPulseLife: false,
    actionRedPulseStamina: false,
    actionRedPulseMoney: false
  }
  
  lastAction!: string
  currentAction!: string
  sleepButtonLocked: boolean = false

  ngOnInit(){
    this.startGameDefault()
    this.getDataUser()
  }

  playRound(){
    this.playRoundStamina()
    this.walkPlay()
    this.beforeRoundChecks()
    this.saveDataUser()
  }

  sleepRound(){
    this.sleepPlay()
    if (this.userData.staminaQuantity >= 100) {
      this.userData.staminaQuantity = 100
    }
  }

  sleepPlay(){
    let random = Math.floor(Math.random() * 100)
    console.log(random)
    this.lastAction = this.currentAction
    this.saveDataUser()

    if (random <= 65) {
      this.currentAction = this.actions.actionSleep
      this.userData.staminaQuantity = this.userData.staminaQuantity + 40
      this.activePulsation("green_stamina")
    }

    if (random >= 66 && random <= 80) {
      this.currentAction = this.actions.actionSleepG60
      this.userData.staminaQuantity = this.userData.staminaQuantity + 60
      this.activePulsation("green_stamina")
    }

    if (random >= 81 && random <= 100) {
      this.currentAction = this.actions.actionSleepL05
      this.userData.coinQuantity = this.userData.coinQuantity - 5
      this.activePulsation("red_money")
      this.userData.staminaQuantity = this.userData.staminaQuantity + 40
      this.activePulsation("green_stamina")

    }

    this.userData.lifeQuantity = this.userData.lifeQuantity + 20
    this.activePulsation("green_life")

    if (this.userData.lifeQuantity >= 100) {
      this.userData.lifeQuantity = 100
    }
    
    if (this.userData.coinQuantity < 0) {
      this.userData.coinQuantity = 0
    }
  }

  walkPlay(){
    let random = Math.floor(Math.random() * 20)
    this.walkingCheck()

    if (this.currentAction == this.actions.actionWalkingMoney) {
      this.userData.coinQuantity = this.userData.coinQuantity + random
      this.activePulsation("green_money")
    }
    if (this.currentAction == this.actions.actionWalkingG10) {
      this.userData.lifeQuantity = this.userData.lifeQuantity + 10
      this.activePulsation("green_life")
      if (this.userData.lifeQuantity > 100){
        this.userData.lifeQuantity = 100
      }
    }
    if (this.currentAction == this.actions.actionWalkingG30) {
      this.userData.lifeQuantity = this.userData.lifeQuantity + 30
      this.activePulsation("green_life")
      if (this.userData.lifeQuantity > 100){
        this.userData.lifeQuantity = 100
      }
    }
    if (this.currentAction == this.actions.actionWalkingL10) {
      this.activePulsation("red_life")
      this.userData.lifeQuantity = this.userData.lifeQuantity - 10
    }
    if (this.currentAction == this.actions.actionWalkingL10v2) {
      this.userData.lifeQuantity = this.userData.lifeQuantity - 30
      this.activePulsation("red_life")
    }
  }

  walkingCheck(){
    let random = Math.floor(Math.random() * 100)
    console.log(random)
    this.lastAction = this.currentAction

    if (random <= 70) {this.currentAction = this.actions.actionWalking}

    if (random >= 71 && random <= 75) {
      this.currentAction = this.actions.actionWalkingMoney
  
    }

    if (random >= 76 && random <= 80) {
      this.currentAction = this.actions.actionWalkingG10
  

    }

    if (random >= 80 && random <= 85) {
      this.currentAction = this.actions.actionWalkingG30
  

    }

    if (random >= 86 && random <= 90) {
      this.currentAction = this.actions.actionWalkingL10

    }

    if (random >= 91 && random <= 100) {
      this.currentAction = this.actions.actionWalkingL10v2

    }
  }

  playRoundStamina(){
    this.userData.staminaQuantity = this.userData.staminaQuantity - 5
    this.activePulsation("red_stamina")
  }

  beforeRoundChecks(){
    if (this.userData.staminaQuantity <= 0 || this.userData.lifeQuantity <= 0) {
      this.endGame()
      return
    }
  }

  endGame(){
    this.activePulsation("red_life")
    this.activePulsation("red_money")
    this.activePulsation("red_stamina")
    alert("Ah, você morreu! Tente novamente!")
    this.startGame()
  }

  startGame(){
    alert("Jogo começando.")
    this.startGameDefault()
  }

  startGameDefault(){
    this.userData.coinQuantity = 0
    this.userData.lifeQuantity = 100
    this.userData.staminaQuantity = 100
    this.lastAction = ""
    this.currentAction = ""

    this.activePulsation("green_life")
    this.activePulsation("green_money")
    this.activePulsation("green_stamina")
  }

  activePulsation(value: any){
    const that: any = this

    switch (value) {
      case "green_life":
        TriggerEffect("actionGreenPulseLife")
        break
      case "green_money":
        TriggerEffect("actionGreenPulseMoney")
        break
      case "green_stamina":
        TriggerEffect("actionGreenPulseStamina")
        break
      
      case "red_life":
        TriggerEffect("actionRedPulseLife")
        break
      case "red_money":
        TriggerEffect("actionRedPulseMoney")
        break
      case "red_stamina":
        TriggerEffect("actionRedPulseStamina")
        break
    }

    function TriggerEffect(value: string){
      that.actionsFlashLight[value] = true
      setTimeout(() => {
        that.actionsFlashLight[value] = false
      }, 450)
      
    }
  }

  saveDataUser(){
    let databefore: any = this.userData
    let data = JSON.stringify(databefore)
    localStorage.setItem("userdata", data)
  }

  getDataUser(){
    let databefore: any = localStorage.getItem("userdata")
    let data = JSON.parse(databefore)
    if (localStorage.getItem("userdata") == null) {
      this.startGameDefault()
    } else {
      this.userData = data
    }
  }
}
