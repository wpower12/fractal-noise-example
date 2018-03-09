var Noise   = require("simplex-noise");

var cvs_id = "cvs";
var cvs    = document.getElementById(cvs_id);

var initial_size    = 7;
var initial_octaves = 5;
var initial_hue     = 195; // light blue

var button_gen    = document.getElementById("generate");
var field_size    = document.getElementById("cellsize");
var field_octaves = document.getElementById("octaves");
var field_hue     = document.getElementById("hue");
var field_seed    = document.getElementById("seed");
var box_random    = document.getElementById("random");

// Initial Generation, set up the button.
button_gen.addEventListener("click", generateClickListener);
generate(cvs, initial_size, initial_octaves, initial_hue, "", true);
box_random.checked = true;

function generateClickListener(){
    size    = field_size.value*1.0;
    octaves = field_octaves.value*1.0;
    hue     = field_hue.value*1.0;
    seed    = field_seed.value;
    rand    = box_random.checked;

    if(seed == "") {seed = " ";}; // the noise libs constructor is weird? hacky fix.
    
    generate(cvs, size, octaves, hue, seed, rand);
}

function generate(cvs, size, octaves, hue, seed, rand){
    var w = cvs.width;
    var h = cvs.height;
    var X = Math.floor(w / size);
    var Y = Math.floor(h / size);

    if(rand){
        var simplex = new Noise();
    } else {
        var simplex = new Noise(seed);
    }

    // Get the min/max to scale correctly. Dont know how to get around
    // the second pass.
    var min =  10000;
    var max = -10000;
    for (var i = 0; i < X; i++) {
        for (var j = 0; j < Y; j++) {
            val = noiseFractal2D(simplex, i/X, j/Y, octaves);
            if (val > max) {max = val;};
            if (val < min) {min = val;};
        }
    }

    var ctx = cvs.getContext("2d");
    for (var i = 0; i < X; i++) {
        for (var j = 0; j < Y; j++) {
            val = noiseFractal2D(simplex, i/X, j/Y, octaves);
            c   = get_color(hue, scale_val(val, min, max));
            x1 = i*size; x2 = x1+size;
            y1 = j*size; y2 = y1+size;
            ctx.fillStyle = c;
            ctx.fillRect(x1,y1,x2,y2);
        }
    }
}

function noiseFractal2D(noise_src, x, y, octaves){
    var x_n = x;
    var y_n = y;
    var ret = 0.0;
    var amp = 0.5;
    for (var i = 0; i < octaves; i++) {
        ret += amp*noise_src.noise2D(x_n, y_n);
        x_n = x_n*2; 
        y_n = y_n*2;
        amp = amp * 0.5
    }
    return ret;
}

function get_color( hue, percent ){
    var n = Math.floor(100*percent)-1;
    return "hsl("+hue+", 100%, "+n+"%)";
};

function scale_val( val, min, max ){
    // from (min,max) to (0/1)
    return (val-min)/(max - min);
};