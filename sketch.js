let planets = []
let sun
let nubPlanets = 5
let G = 5

function setup() {
  createCanvas(400, 400);
  sun = new Body(50, createVector (0,0), createVector (0,0));
  for (let i = 0; i < nubPlanets; i++){
    let mass = (5,15)
    let radius = random(sun.d, min(windowWidth/2, windowHeight/2))
    let angle = random(0, TWO_PI)
    let planetLoc = createVector(radius*cos(angle), radius*sin(angle))
    
    let planetVel = planetLoc.copy()
    if(random(1) < 0.1) planetVel.rotate(-HALF_PI)
    else planetVel.rotate (HALF_PI)
    planetVel.normalize()
    planetVel.mult(sqrt((G*sun.mass)/(radius)))
    planets.push(new Body(mass, planetLoc, planetVel))
  }
}

function draw() {
  background(180);
  translate(width/2, height/2)
  for(let i = nubPlanets - 1; i >= 0; i--){
    sun.attract(planets[i])
    planets[i].move()
    planets[i].show()
  }
  sun.show()
}
function Body(mass, loc, vel){
  this.mass = mass
  this.loc = loc
  this.vel = vel
  this.d = this.mass*2
  this.theta = 0
  this.path = []
  this.pathLen = Infinity
  
  this.show = function(){
    stroke(0,50)
    for(let i = 0; i < this.path.length-2; i++){
      line(this.path[i].x, this.path[i].y, this.path[i+1].x, this.path[i+1].y)
    }
    fill(253,200,93);
    noStroke();
    ellipse(this.loc.x, this.loc.y, this.d, this.d)
  }
  this.move = function(){
    this.loc.x += this.vel.x
    this.loc.y += this.vel.y
    this.path.push(createVector(this.loc.x, this.loc.y))
    if(this.path.length > 200)this.path.splice(0,1)
  }
  this.applyForce = function(f){
    this.vel.x += f.x/this.mass
    this.vel.y += f.y/this.mass
  }
  this.attract = function(child){
    let r = dist(this.loc.x, this.loc.y, child.loc.x, child.loc.y)
    let f = (this.loc.copy()).sub(child.loc)
    f.setMag((G*this.mass*child.mass)/(r*r))
    child.applyForce(f)
  }
}
