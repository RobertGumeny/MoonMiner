// NOTE ESTABLISH GLOBAL VARIABLES 
// Money, resources, and modifiers

let money = 0

// NOTE RESOURCES
// All resources should have a name, count, value, unlocked boolean, and unlock price

let resource = {
  moonDust: {
    name: 'Dust',
    count: 0,
    value: 1,
    unlocked: true,
  },
  moonRocks: {
    name: 'Rocks',
    count: 0,
    value: 5,
    unlocked: false,
    unlockPrice: 250,
  },
  moonIron: {
    name: 'Iron',
    count: 0,
    value: 15,
    unlocked: false,
    unlockPrice: 1000,
  },
  moonGems: {
    name: 'Gems',
    count: 0,
    value: 75,
    unlocked: false,
    unlockPrice: 2500,
  }
}

// NOTE UPGRADE ITEMS - Increase amount of resources harvested per click
// Price will increase with each subsequent upgrade

let upgrades = {
    drills: {
      name: "Drills",
      price: 50,
      level: 1,
      modifier: 1
    },
    carts: {
      name: "Carts",
      price: 250,
      level: 0,
      modifier: 3
    },
    rovers: {
      name: "Rovers",
      price: 500,
      level: 0,
      modifier: 5
    },
    harvesters: {
      name: "Harvesters",
      price: 1500,
      level: 0,
      modifier: 10
    }
}

// NOTE HARVEST ON CLICK
// Basic function enabling user to harvest a resource (Dust, Rocks, Iron, Gems)

function mine(resource){
  for (const key in upgrades) {
    var newCount = (upgrades[key].level * upgrades[key].modifier)
      if (resource.unlocked = true){
      resource.count += newCount
    }else {
      console.log('This resource has not been unlocked yet!')
    }
  }
  drawCounters()
}

// NOTE AUTOMATE
// Automate collection of resources

function collectAutoUpgrades(){
  for (const key in upgrades) {
    var newCount = (upgrades[key].level * upgrades[key].modifier)
      if (resource.moonDust.unlocked == true){
      resource.moonDust.count += newCount
      }
      if (resource.moonRocks.unlocked == true){
        resource.moonRocks.count += newCount
      }
      if (resource.moonIron.unlocked == true){
      resource.moonIron.count += newCount
      }
      if (resource.moonGems.unlocked == true){
      resource.moonGems.count += newCount
      }
    }
    drawCounters()
}

function startInterval(resource){
  const collectionInterval = setInterval(collectAutoUpgrades, 3000)
}

function automate(resource){
  startInterval(resource)
}


// NOTE SELL RESOURCES
// Enable user to sell their resources for money
function sellResources(){
  for (const key in resource) {
    money += resource[key].count * resource[key].value
    resource[key].count = 0
  }
  drawCounters()
}

// NOTE DRAW COUNTS TO PAGE
// Draw count totals to each counter on page (resources and cash)
function drawCounters(){
  document.getElementById("moon-dust-counter").innerText = resource.moonDust.count.toString()
  document.getElementById("moon-rocks-counter").innerText = resource.moonRocks.count.toString()
  document.getElementById("moon-iron-counter").innerText = resource.moonIron.count.toString()
  document.getElementById("moon-gems-counter").innerText = resource.moonGems.count.toString()
  document.getElementById("money-counter").innerText = money.toString()
}
function drawUnlockPrice(){  
  document.getElementById("moon-rocks-cost").innerText = resource.moonRocks.unlockPrice.toString()
  document.getElementById("moon-iron-cost").innerText = resource.moonIron.unlockPrice.toString()
  document.getElementById("moon-gems-cost").innerText = resource.moonGems.unlockPrice.toString()
}

function drawLevelCounters(){
  document.getElementById("drill-level").innerText = upgrades.drills.level.toString()
  document.getElementById("cart-level").innerText = upgrades.carts.level.toString()
  document.getElementById("rover-level").innerText = upgrades.rovers.level.toString()
  document.getElementById("harvester-level").innerText = upgrades.harvesters.level.toString()
  document.getElementById("drill-cost").innerText = upgrades.drills.price.toString()
  document.getElementById("cart-cost").innerText = upgrades.carts.price.toString()
  document.getElementById("rover-cost").innerText = upgrades.rovers.price.toString()
  document.getElementById("harvester-cost").innerText = upgrades.harvesters.price.toString()
}

// NOTE UNLOCK RESOURCES
// Unlock higher quality resources so player can mine them, remove money equal to unlock price.

function unlockResource(resource){
  if (resource.unlocked == true){
    console.log("Already purchased!")
  }else 
  if (money >= resource.unlockPrice){
    resource.unlocked = true
    money -= resource.unlockPrice
    console.log(`${resource.name} Unlocked!`)
  }
  drawCounters()
}

// NOTE PURCHASE UPGRADES
// Purchase upgrades to increase resource gain

function purchaseUpgrade(upgrades) {
  if (money >= upgrades.price) {
    upgrades.count += 1
    money -= upgrades.price
    upgrades.price = (Math.floor(upgrades.price * 0.25)) + upgrades.price
    upgrades.level += 1
    console.log(`${upgrades.name} purchased. New price: ${upgrades.price}`)
    drawLevelCounters()
  }else
  {
    console.log("Not enough money.")
  }
}

drawCounters()
drawLevelCounters()
drawUnlockPrice()