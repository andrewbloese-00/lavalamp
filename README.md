# Lavalamp 🔮
Exactly what it sounds like, a lava lamp background component, with customizable colors, intensity, and blur. 


## Usage 

```typescript
//import the lavalamp class
import { Lavalamp } from './lavalamp'


//define a container
const root = document.querySelector("div#app")! as HTMLElement


//configuration 
const numParticles = 20; 
const options:LavaLampOptions = {
    intensity:5, //the contrast intensity
    blur: 50, //blur px 
    color_divider: 10, //lower value = more diverse colors
    color_offset: 200 //where on hsl color wheel to start (left)
} 

const myLamp = new Lavalamp(root,numParticles,options);

//play/pause the animation at any time
myLamp.play();
setTimeout(()=>{
    myLamp.pause();
},5000)
```









### Running the Example
To run the example, simply clone this repository and run the following commands: 
```bash
    npm install && npm run dev
```
This should open a window to the demo application. 


