// ESTABLISH GLOBAL VARIABLES - Money, resources, and modifiers

let money = 0

// RESOURCES - All resources should have a name, count, value, unlocked boolean, and unlock price

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
    unlockPrice: 20,
  },
  moonIron: {
    name: 'Iron',
    count: 0,
    value: 20,
    unlocked: false,
    unlockPrice: 500,
  },
  moonGems: {
    name: 'Gems',
    count: 0,
    value: 100,
    unlocked: false,
    unlockPrice: 1500,
  }
}

// UPGRADE ITEMS - Some of these will increase the amount harvested per click, others will begin to passively harvest resources.
// Price will increase with each subsequent upgrade

let upgrades = {
  clickUpgrades: {
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
      modifier: 5
    }
  },
  passiveUpgrades: {
    rovers: {
      name: "Rovers",
      price: 500,
      level: 0,
      modifier: 10
    },
    harvesters: {
      name: "Harvesters",
      price: 1500,
      level: 0,
      modifier: 20
    }
  }
}

// NOTE 
// Basic function enabling user to harvest a resource (Dust, Rocks, Iron, Gems)
function mine(resource){
  for (const key in upgrades.clickUpgrades) {
    var newCount = (upgrades.clickUpgrades[key].level * upgrades.clickUpgrades[key].modifier)
      if (resource.unlocked == true){
      resource.count += newCount
    }else {
      console.log('This resource has not been unlocked yet!')
    }
  }
  drawCounters()
}

// NOTE 
// Enable user to sell their resources for money
function sellResources(){
  for (const key in resource) {
    money += resource[key].count * resource[key].value
    resource[key].count = 0
  }
  drawCounters()
}

// NOTE 
// Draw count totals to each counter on page (resources and cash)
function drawCounters(){
  document.getElementById("moon-dust-counter").innerText = resource.moonDust.count.toString()
  document.getElementById("moon-rocks-counter").innerText = resource.moonRocks.count.toString()
  document.getElementById("moon-iron-counter").innerText = resource.moonIron.count.toString()
  document.getElementById("moon-gems-counter").innerText = resource.moonGems.count.toString()
  document.getElementById("money-counter").innerText = money.toString()
  document.getElementById("drill-level").innerText = upgrades.clickUpgrades.drills.level.toString()
  document.getElementById("cart-level").innerText = upgrades.clickUpgrades.carts.level.toString()
  document.getElementById("rover-level").innerText = upgrades.passiveUpgrades.rovers.level.toString()
  document.getElementById("harvester-level").innerText = upgrades.passiveUpgrades.harvesters.level.toString()
}


// NOTE 
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

// NOTE
// Purchase on-click and passive upgrades 

function purchaseUpgrade(upgrades) {
  if (money >= upgrades.price) {
    upgrades.count += 1
    money -= upgrades.price
    upgrades.price = (Math.floor(upgrades.price * 0.25)) + upgrades.price
    upgrades.level += 1
    console.log(`${upgrades.name} purchased. New price: ${upgrades.price}`)
    drawCounters()
  }else
  {
    console.log("Not enough money.")
  }
}


drawCounters()