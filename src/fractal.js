import BasicNoiseSurface from './lib/BasicNoiseSurface.js';
import Helper from './lib/Helper.js';

var cvs_id = "cvs";
var cvs    = document.getElementById(cvs_id);

var initial_size    = 7;
var initial_octaves = 5;
var initial_hue     = 195; // light blue
var initial_freq    = 1;
var initial_thresh  = 0;

// ** UI ******************************
var button_gen    = document.getElementById("generate");
var field_size    = document.getElementById("cellsize");
var field_octaves = document.getElementById("octaves");
var field_freq    = document.getElementById("freq");
var field_hue     = document.getElementById("hue");
var field_seed    = document.getElementById("seed");
var field_thresh  = document.getElementById("thresh");
var box_random    = document.getElementById("random");
box_random.checked = true;

var h = new Helper();
var b = new BasicNoiseSurface();

var w = b.generate(cvs, initial_size, 
                        initial_octaves, 
                        initial_freq, 
                        initial_thresh, 
                        initial_hue, "", true);
h.draw_hmap_to_canvas(cvs, w, initial_size, initial_hue, initial_thresh);

button_gen.addEventListener("click", generateClickListener);

function generateClickListener(){
    var size    = field_size.value*1.0;
    var octaves = field_octaves.value*1.0;
    var hue     = field_hue.value*1.0;
    var freq    = field_freq.value*1.0;
    var thresh  = field_thresh.value*1.0;
    var seed    = field_seed.value;
    var rand    = box_random.checked;

    if(seed == "") {seed = " ";}; // the noise libs constructor is weird?     
    var w = b.generate(cvs, size, octaves, freq, thresh, hue, seed, rand);
    h.draw_hmap_to_canvas(cvs, w, size, hue, thresh);
}