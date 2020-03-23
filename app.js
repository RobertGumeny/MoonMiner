// NOTE Resources availble to collect
let dustCount = 0
let dustPerClick = 1
let dustPerSecond = 0

// NOTE Upgrades to increase amount of resources harvested

let clickUpgrades = {
  drills: {
    name: "Drills",
    price: 50,
    level: 0,
    modifier: 1
  },
  carts: {
    name: "Carts",
    price: 250,
    level: 0,
    modifier: 10
  }
}
let passiveUpgrades = {
  rovers: {
    name: "Rovers",
    price: 500,
    level: 0,
    modifier: 100
  },
  harvesters: {
    name: "Harvesters",
    price: 2500,
    level: 0,
    modifier: 250
  }
}

// NOTE Badge system to award player for certain milestones
let badges = {
  noviceMiner: {
    name: 'Novice Miner',
    shoutout: 'You have earned $5,000',
    moneyCheck: 5000,
    earned: false,
  },
  journeymanMiner: {
    name: 'Journeyman Miner',
    shoutout: 'You have earned $15,000',
    moneyCheck: 15000,
    earned: false,
  }
}

// NOTE Counter Elements for all resources

let dustCountElem = document.getElementById('dust-count')
let dustPerClickElem = document.getElementById('dust-per-click')
let dustPerSecondElem = document.getElementById('dust-per-second')



// NOTE Level count element for all upgrades

let drillsLevelElem = document.getElementById('drills-level')
let cartsLevelElem = document.getElementById('carts-level')
let roversLevelElem = document.getElementById('rovers-level')
let harvestersLevelElem = document.getElementById('harvesters-level')

// NOTE Level shortcut for all upgrades

let drillsLevel = clickUpgrades.drills.level
let cartsLevel = clickUpgrades.carts.level
let roversLevel = passiveUpgrades.rovers.level
let harvestersLevel = passiveUpgrades.harvesters.level


// NOTE Prices for all upgrades/unlocks

let drillsPrice = clickUpgrades.drills.price
let cartsPrice = clickUpgrades.carts.price
let roversPrice = passiveUpgrades.rovers.price
let harvestersPrice = passiveUpgrades.harvesters.price

// NOTE Price elements for all upgrades

let drillsPriceElem = document.getElementById('drills-price')
let cartsPriceElem = document.getElementById('carts-price')
let roversPriceElem = document.getElementById('rovers-price')
let harvestersPriceElem = document.getElementById('harvesters-price')

// NOTE Modifier shortcuts for on-click upgrades

let drillsMod = clickUpgrades.drills.modifier
let cartsMod = clickUpgrades.carts.modifier
let roversMod = passiveUpgrades.rovers.modifier
let harvestersMod = passiveUpgrades.harvesters.modifier

// NOTE Button shortcuts

let saveBtn = document.getElementById("save-btn")
let resetBtn = document.getElementById("reset-btn")

// NOTE Message center

let messageCenterElem = document.getElementById("message-center")

// NOTE Badge shortcuts

let noviceBadge = document.getElementById("novice-badge")
let journeyBadge = document.getElementById("journey-badge")


// NOTE HARVEST ON CLICK
// Basic function enabling user to harvest a resource (Dust, Rocks, Iron, Gems)

function harvest(){
  dustCount++
  checkUpgrades()
  drawCounters()
}

// NOTE UPGRADE CHECKS
// Functions to check all upgrades currently owned by player

function checkUpgrades(){
  drillsUpgrade()
  cartsUpgrade()
}
function drillsUpgrade(){
  if (drillsLevel > 0){
    dustCount +=(drillsLevel * drillsMod)
  }
 }
function cartsUpgrade(){
  if (cartsLevel > 0){
    dustCount +=(cartsLevel * cartsMod)
  }
}


// NOTE DRAW COUNTERS
function drawCounters(){
  dustCountElem.innerText = dustCount.toString()
  dustPerSecondElem.innerText = dustPerSecond.toString()
  dustPerClickElem.innerText = dustPerClick.toString()
  drillsLevelElem.innerText = drillsLevel.toString()
  drillsPriceElem.innerText = drillsPrice.toString()
  cartsLevelElem.innerText = cartsLevel.toString()
  cartsPriceElem.innerText = cartsPrice.toString()
  roversLevelElem.innerText = roversLevel.toString()
  roversPriceElem.innerText = roversPrice.toString ()
  harvestersLevelElem.innerText = harvestersLevel.toString()
  harvestersPriceElem.innerText = harvestersPrice.toString()
}

// NOTE PURCHASE UPGRADES

function purchaseDrill(){
  if (dustCount >= drillsPrice){
    drillsLevel++
    dustCount = dustCount - drillsPrice
    drillsPrice = (Math.round(drillsPrice * (drillsMod / 100))) + drillsPrice
    pushMessage(`Drill Upgrade Purchased`)
    dpcUpdate()
    drawCounters()
  }else{
    pushMessage(`Not enough money`)
  }
}
function purchaseCart(){
  if (dustCount >= cartsPrice){
    cartsLevel++
    dustCount = dustCount - cartsPrice
    cartsPrice = (Math.round(cartsPrice * (cartsMod / 100))) + cartsPrice
    pushMessage(`Carts upgrade purchased`)
    dpcUpdate()
    drawCounters()
  }else{
    pushMessage(`Not enough money`)
  }
}
function purchaseRover(){
  if (dustCount >= roversPrice){
    roversLevel++
    dustCount = dustCount - roversPrice
    roversPrice = (Math.round(roversPrice * (roversMod / 200))) + roversPrice
    pushMessage(`Rovers ugprade purchased`)
    dpsUpdate()
    drawCounters()
  }else{
    pushMessage(`Not enough money`)
  }
}
setInterval(function roverEngage(){
  if (roversLevel > 0){
    dustCount += (roversLevel * roversMod)
    drawCounters()
   }
  }, 3000)


function purchaseHarvester(){
  if (dustCount >= harvestersPrice){
    harvestersLevel++
    dustCount = dustCount - harvestersPrice
    harvestersPrice = (Math.round(harvestersPrice * (harvestersMod / 400))) + harvestersPrice
    pushMessage(`Harvesters upgrade purchased`)
    dpsUpdate()
    drawCounters()
  }else{
    pushMessage(`Not enough money`)
  }
}
setInterval(function harvesterEngage(){
  if (harvestersLevel > 0){
    dustCount += (harvestersLevel * harvestersMod)
    drawCounters()
  }
}, 3000)

// NOTE PUSH MESSAGES TO MESSAGE CENTER
// Function to push a message to message center and then timeout.

function pushMessage(message){
  messageCenterElem.innerText = message.toString()
}

// Clear messages

function clearMessage(){
  messageCenterElem.innerText = ""
}

// NOTE DISPLAY DUST PER SECOND/DUST PER CLICK
// Check and update passive dust collection when new automatic upgrade is purchased

function dpsUpdate(){
  let dpsCombo = (roversMod * roversLevel) + (harvestersMod * harvestersLevel)
  dustPerSecond = Math.floor(dpsCombo / 3)
}

function dpcUpdate(){
  let dpcCombo = (drillsMod * drillsLevel) + (cartsMod * cartsLevel)
  dustPerClick = dpcCombo + 1
}

// NOTE DEBUG CONSOLE
// Add dust for testing purposes

function addDust(){
  dustCount = dustCount + 2500
  drawCounters()
}

drawCounters()
