import { Scene, ParticleEffect } from './Particles'

type LavaLampOptions = { 
    intensity: number,
    blur: number
    color_divider:number
    color_offset:number
}


//createas a "lava lamp" background with specified number of particles and options
export class Lavalamp { 
    canvas:HTMLCanvasElement
    root:HTMLElement
    #scene:Scene
    #effect:ParticleEffect
    constructor(container:HTMLElement,num_particles:number,options:LavaLampOptions){
        this.canvas = document.createElement('canvas');
        this.canvas.style.filter = `blur(${options.blur||10}px) contrast(${options.intensity||5})`
        this.root = container;
        this.root.appendChild(this.canvas)
        this.sizeToWindow()
        window.addEventListener("resize", ()=>{this.sizeToWindow()})
        this.#effect = new ParticleEffect(this.canvas,num_particles,options.color_divider,options.color_offset)
        this.#scene = new Scene([this.canvas])
    }
    sizeToWindow(){
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    isPlaying():boolean{
        return this.#scene.playing
    }
    play(){
        this.#scene.playing = true;
        this.#scene.animate(this.#effect)
    }

    pause(){
        this.#scene.playing = false;
    }
}