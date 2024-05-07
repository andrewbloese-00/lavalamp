export class Particle { 
    static radiusPx = 100
    #effect:ParticleEffect
    x:number
    vx:number
    y:number
    vy:number
    radius:number 
    constructor(effect:ParticleEffect, radius=Particle.radiusPx){
        this.#effect = effect;
        this.radius = radius
        this.x =  this.radius + Math.random() * this.#effect.width - (2*this.radius);
        this.y = this.radius + Math.random() * this.#effect.height - (2*this.radius);
        this.vx = Math.random() * 2 - 1
        this.vy = Math.random() * 2 -1
    }
    draw(ctx:CanvasRenderingContext2D,colorDivider:number,colorOffset:number){
        ctx.fillStyle  = `hsl(${this.x/colorDivider+colorOffset},${(this.y/window.innerHeight+20)*100 + 20}%,50%)`
        ctx.beginPath()
        ctx.arc(this.x,this.y,this.radius,0,Math.PI*2)
        ctx.fill()

    }
    update(){
        this.x += this.vx
        this.y += this.vy
        if(this.x > this.#effect.width - this.radius || this.x < this.radius){
            this.vx *= -1
        }
        if(this.y > this.#effect.height - this.radius || this.y < this.radius){
            this.vy *= -1
        }
    }
}


export class ParticleEffect { 
    static MAX_PARTICLES = 10_000;
    canvas: HTMLCanvasElement
    width:number
    height:number
    colorConfig:[number,number]
    max_particles:number
    particles:Particle[]
    constructor(canvas:HTMLCanvasElement,initial_particles=20,colorDivider=100,colorOffset=200,max_particles=ParticleEffect.MAX_PARTICLES){
        this.canvas = canvas;
        this.width = canvas.width;
        this.height = canvas.height;
        this.max_particles = max_particles
        this.particles = []
        this.colorConfig = [colorDivider,colorOffset]
        this.createParticles(initial_particles)
    }
    createParticles(n:number){
        const actualParticlesCreated = Math.min(n,this.max_particles-this.particles.length)
        for(let i = 0; i < actualParticlesCreated; i++ ){
            this.particles.push(new Particle(this, 10+ Math.random() * Particle.radiusPx))
        }
    }
    drawParticles(ctx:CanvasRenderingContext2D){
        for(let p = 0; p < this.particles.length; p++){
            this.particles[p].update()
            this.particles[p].draw(ctx,...this.colorConfig)
        }
    }


}


export class Scene { 
    contexts:CanvasRenderingContext2D[]
    numCanvasElements:number
    playing:boolean
    constructor(canvasElements:HTMLCanvasElement[]){
        this.playing = false
        this.contexts = []
        this.numCanvasElements = canvasElements.length
        for(let c=0;c<canvasElements.length;c++) {
            this.contexts[c]=canvasElements[c].getContext("2d")!
            canvasElements[c].width = window.innerWidth;
            canvasElements[c].height = window.innerHeight;
        }
        window.addEventListener("resize",()=>{
            for(let c=0;c<canvasElements.length;c++) {
                canvasElements[c].width = window.innerWidth;
                canvasElements[c].height = window.innerHeight;
            }
        })
    }

    animate(effect:ParticleEffect){
        if(this.playing){
            this.contexts[0].clearRect(0,0,effect.width,effect.height)
            effect.drawParticles(this.contexts[0])
            
            setTimeout(()=>{
                requestAnimationFrame(()=>this.animate(effect))
            }, 16)
        }
    }


}

