import './style.css'
import { Lavalamp } from './lavalamp'

const root = document.querySelector("div#app")! as HTMLElement

//creates a new lava lamp background
const background = new Lavalamp(root,25,{
  intensity:5, //the contrast instensity
  blur: 50, //blur px 
  color_divider: 10, //lower value = more diverse colors
  color_offset: 200 //where on hsl color wheel to start (left)
})

//starts the animation
background.play()


const toggleButton = document.createElement("button")
toggleButton.id="toggleAnimation"
toggleButton.textContent = "Pause"

toggleButton.onclick = ()=>{
  if(background.isPlaying()){
    background.pause()
    toggleButton.textContent = "Play"
  } else { 
    toggleButton.textContent = "Pause"
    background.play()
  }  



}

root.appendChild(toggleButton)