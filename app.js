// NOTE Resources availble to collect
let dustCount = 0

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

// NOTE Modifiers for on-click upgrades

let drillsMod = clickUpgrades.drills.modifier
let cartsMod = clickUpgrades.carts.modifier
let roversMod = passiveUpgrades.rovers.modifier
let harvestersMod = passiveUpgrades.harvesters.modifier

// NOTE Button shortcuts

let saveBtn = document.getElementById("save-btn")
let resetBtn = document.getElementById("reset-btn")

// NOTE Mining bar progress shortcuts

let dustProgBar = document.getElementById("dust-prog-bar")

// NOTE Message center

let messageBox = document.getElementById("message-center")

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
    drawCounters()
  }else{
    console.log('Not enough money!')
  }
}
function purchaseCart(){
  if (dustCount >= cartsPrice){
    cartsLevel++
    dustCount = dustCount - cartsPrice
    cartsPrice = (Math.round(cartsPrice * (cartsMod / 100))) + cartsPrice
    drawCounters()
  }else{
    console.log('Not enough money!')
  }
}
function purchaseRover(){
  if (dustCount >= roversPrice){
    roversLevel++
    dustCount = dustCount - roversPrice
    roversPrice = (Math.round(roversPrice * (roversMod / 100))) + roversPrice
    drawCounters()
  }else{
    console.log('Not enough money!')
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
    harvestersPrice = (Math.round(harvestersPrice * (harvestersMod / 100))) + harvestersPrice
    drawCounters()
  }else{
    console.log('Not enough money!')
  }
}
setInterval(function harvesterEngage(){
  if (harvestersLevel > 0){
    dustCount += (harvestersLevel * harvestersMod)
    drawCounters()
  }
}, 3000)

drawCounters()
