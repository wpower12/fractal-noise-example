class FractalNoise {
	fractal2D(noise_src, x, y, octaves){
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
	};

	fractal2DSurface(noise_src, x, y, freq, octaves, thresh){
		var map = new Array();
	    for (var i = 0; i < x; i++) {
	    	map[i] = new Array();
	    	for (var j = 0; j < y; j++) {
	    		var val = this.fractal2D(noise_src, (i/x)*freq, (j/y)*freq, octaves);
	    		val = this.scale(val, -0.98, 0.98);
	    		if(val > thresh){
	    			map[i][j] = val;
	    		} else {
	    			map[i][j] = 0;
	    		}
	    	}
	    }
	    console.log(map);
	    return map;
	};

	scale(val, min, max){
        // from (min,max) to (0/1)
        return (val-min)/(max - min);
    }; 
};

export default FractalNoise;