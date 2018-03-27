import Tectonics from './lib/Tectonics.js';
import Helper    from './lib/Helper.js';

var initial_size    = 15;
var initial_octaves = 3;
var initial_hue     = 115; // light blue
var initial_freq    = 2.6;
var initial_thresh  = 0.6;
var initial_platesize = 50;

var button_gen      = document.getElementById("generate");
var field_size      = document.getElementById("cellsize");
var field_octaves   = document.getElementById("octaves");
var field_freq      = document.getElementById("freq");
var field_platesize = document.getElementById("platesize");
var field_hue       = document.getElementById("hue");
var field_seed      = document.getElementById("seed");
var field_thresh    = document.getElementById("thresh");
var box_random      = document.getElementById("random");
var cvs             = document.getElementById("cvs");
box_random.checked  = true;

var t = new Tectonics();
var map_list = t.generate(cvs, initial_size, 
                               initial_octaves, 
                               initial_freq, 
                               initial_thresh, 
                               initial_platesize,
                               initial_hue, "", true);

var h = new Helper();
h.attach_map_animation(cvs, map_list, initial_size, initial_hue, initial_thresh);

button_gen.addEventListener("click", generateClickListener);
function generateClickListener(){
	var size      = field_size.value*1.0;
  var octaves   = field_octaves.value*1.0;
  var hue       = field_hsaue.value*1.0;
  var freq      = field_freq.value*1.0;
  var thresh    = field_thresh.value*1.0;
  var platesize = field_platesize.value*1.0;
  var seed      = field_seed.value;
  var rand      = box_random.checked;

  if(seed == "") {seed = " ";}; // the noise libs constructor is weird?     
  map_list =  t.generate(cvs, size, octaves, freq, thresh, platesize, hue, seed, rand);
  h.attach_map_animation(cvs, map_list, size, hue, thresh);
}


