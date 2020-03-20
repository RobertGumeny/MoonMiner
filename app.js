// ESTABLISH GLOBAL VARIABLES - Money, resources, and modifiers

let money = 0
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
  },
  moonIron: {
    name: 'Iron',
    count: 0,
    value: 20,
    unlocked: false,
  },
  moonGems: {
    name: 'Gems',
    count: 0,
    value: 100,
    unlocked: false,
  }
}

// NOTE 
// Basic function enabling user to harvest a resource (Dust, Rocks, Iron, Gems)
function mine(resource){
  if (resource.unlocked == true){
    resource.count += 1
    console.log(`${resource.name}:${resource.count}`)
  }else {
    console.log('This resource has not been unlocked yet!')
  }
  drawCounters()
}

// NOTE 
// Draw count totals to each counter on page (resources and cash)
// REVIEW Can all four of these ben condensed using querySelector()?
function drawCounters(){
  document.getElementById("moon-dust-counter").innerText = resource.moonDust.count.toString()
  document.getElementById("moon-rocks-counter").innerText = resource.moonRocks.count.toString()
  document.getElementById("moon-iron-counter").innerText = resource.moonIron.count.toString()
  document.getElementById("moon-gems-counter").innerText = resource.moonGems.count.toString()
  document.getElementById("money-counter").innerText = money.toString()
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
// Unlock higher quality resources so player can mine them.

function unlockResource(resource){
  
}

drawCounters()