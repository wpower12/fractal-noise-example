import FractalNoise from "./FractalNoise.js";
import Tectonics from './Tectonics.js';
var SimplexNoise = require('simplex-noise');

class BasicNoiseSurface {
    /* Simple Fractal Noise 'Image'
        Draws a representation of a fractal noise surface 
        on the provided canvas. 
    */ 
    generate(cvs, size, octaves, freq, thresh, hue, seed, rand){
        var w = cvs.width;
        var h = cvs.height;
        var X = Math.floor(w / size);
        var Y = Math.floor(h / size);

        if(rand){
            var simplex = new SimplexNoise();
        } else {
            var simplex = new SimplexNoise(seed);
        }

        var fn = new FractalNoise();
        var world_map = fn.fractal2DSurface(simplex, X, Y, freq, octaves, thresh);
        return world_map;
    }
}

export default BasicNoiseSurface;