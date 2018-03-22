class Helper {

    draw_hmap_to_canvas(cvs, map, size, hue, thresh){
        var ctx = cvs.getContext("2d");
        for (var i = 0; i < map.length; i++) {
            for (var j = 0; j < map[0].length; j++) {
                var val = map[i][j];
                var c   = this.get_color(hue, thresh, val);
                var x1 = i*size, x2 = x1+size;
                var y1 = j*size, y2 = y1+size;
                ctx.fillStyle = c;
                ctx.fillRect(x1,y1,x2,y2);
            }
        }
    }

    attach_map_animation(cvs, map_list, size, hue, thresh){
        var m = 0;
        function draw(){
            var map = map_list[m];
            this.draw_hmap_to_canvas(cvs, map, size, hue, thresh)
            m += 1;
            if(m >= map_list.length){m = 0;}
        };

        setInterval(draw.bind(this), 600);
    }

	get_color(hue, thresh, percent){
        var ret = "";
        if(percent > thresh){
            var n = Math.floor(100*percent)-1;
            ret = "hsl("+hue+", 55%, "+n+"%)";
        } else {
            ret = "hsl("+hue+", 55%, 0%)";
        }
        return ret;
    };

    scale_val(val, min, max){
        // from (min,max) to (0/1)
        return (val-min)/(max - min);
    }; 
}

export default Helper;