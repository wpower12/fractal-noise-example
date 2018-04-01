import FractalNoise from './FractalNoise.js';
var SimplexNoise = require('simplex-noise');

var DIRECTIONS = [[1,1], [1,0], [1,-1], [0,1], [0,-1], [-1,1], [-1,0], [-1,-1]];

class Tectonics {
	/* Generates a set of maps that represent steps in a simulation of plate
	   tectonics on a grid. 
	*/
	generate(cvs, size, octaves, freq, thresh, min_size, hue, seed, rand){
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
	    clearEdges(world_map);
	    var plates = getPlates(world_map);
	    plates = clearSmallPlates(world_map, plates, min_size);

	    // Assign random initial direction to each plate 
	    var dirs = [];
	    for (var i = 0; i < plates.length; i++) {
	    	var r_dir = DIRECTIONS[Math.floor(Math.random()*DIRECTIONS.length)];
	    	dirs.push(r_dir);
	    }

	    var time_steps = 20;
	    var map_list = simulate_movement(world_map, plates, dirs, time_steps);

	    return map_list;
	}
}

// ** Basic Procedures *****
function clearEdges(map){
	// Flood fill, starting with all edge cells in the stack.
	var seen = new Array();	// Track what cells have been traversed
	for (var i = 0; i < map.length; i++) {
		seen[i] = new Array();
		for (var j = 0; j < map[0].length; j++) {
			seen[i][j] = false;
		}
	}

	var stack = [];	  // cells to be checked - starts with all boundries
	for (var i = 0; i < map.length; i++) {
		stack.push([i, 0]);
		stack.push([i, map[0].length-1]);
	}
	for (var i = 1; i < map[0].length; i++) {
		stack.push([0, i]);
		stack.push([map.length-1, i]);
	}
	// list of deltas used to address neighbors
	var ns = [[0,1], [0,-1], [1,0], [-1,0]];
	// stack based flood fill.
	while( stack.length > 0  ){
		var c = stack.pop();
		var x = c[0];
		var y = c[1];

		seen[x][y] = true;

		if( map[x][y] > 0 ){
			map[x][y] = 0;
			// iterate over neighbors
			for (var i = 0; i < ns.length; i++) {
				var n  = ns[i];
				var nx = x+n[0];
				var ny = y+n[1];
				// ignore out of bounds and previously seen cells
				if( nx > 0 && 
						nx < map.length && 
						ny > 0 && 
						ny < map[0].length &&
						!seen[nx][ny]){
					stack.push([nx, ny])	
				}
			}
		}
	}
}

function getPlates(map){
	// Returns list of cells in each connected component.
	var seen = new Array();	// Track what cells have been traversed
	for (var i = 0; i < map.length; i++) {
		seen[i] = new Array();
		for (var j = 0; j < map[0].length; j++) {
			seen[i][j] = false;
		}
	}

	var plates = new Array();
	
	for (var i = 0; i < map.length; i++) {
		for (var j = 0; j < map[0].length; j++) {
			if( !seen[i][j] && map[i][j] > 0  ){	
				var plate_list = flood_fill(i, j);
				plates.push(plate_list);
			}
		}
	}

	function flood_fill(x, y){
		var plate_list = []; // all cells in the plate.
		var stack = [];	  // cells to be checked - starts with all boundries
		stack.push([x,y]);
		// list of deltas used to address neighbors
		var ns = [[0,1], [0,-1], [1,0], [-1,0]];
		while( stack.length > 0  ){
			var c = stack.pop();
			var x = c[0];
			var y = c[1];
			seen[x][y] = true;

			if( map[x][y] > 0 ){
				plate_list.push(c);
				// iterate over neighbors
				for (var i = 0; i < ns.length; i++) {
					var n  = ns[i];
					var nx = x+n[0];
					var ny = y+n[1];
					// ignore out of bounds and previously seen cells
					if( nx > 0 && 
							nx < map.length && 
							ny > 0 && 
							ny < map[0].length && 
							!seen[nx][ny]){
						stack.push([nx, ny])
					}
				}
			}
		}
		return plate_list;
	}

	return plates;
}

function clearSmallPlates(map, plates, min_size){
	var new_list = [];
	// Clear groups under the min size
	for (var i = 0; i < plates.length; i++) {
		var p = plates[i];
		if (p.length < min_size){
			for (var j = 0; j < p.length; j++) {
				var c = p[j];
				var x = c[0];
				var y = c[1];
				map[x][y] = 0;
			}
		} else {
			new_list.push(p);
		}
	}
	return new_list;
}

// ** Main Simulation *****
function simulate_movement(map, plates, plate_dirs, time_steps){
	var world_list = [];
	var world  = copy2d(map);
	var groups = [];   // collection of collided groups of plates
	var free_plates  = Array(plates.length).fill(true);
	for (var t = 0; t < time_steps; t++){		
		// update free plates
		for (var f = 0; f < free_plates.length; f++) {
			if(free_plates[f]){
				var collided = false;
				var plate = plates[f];
				var dir   = plate_dirs[f];
				for (var c = 0; c < plate.length; c++) {
					var cell = plate[c];
					var nx   = modadd(cell[0], dir[0], map.length);
					var ny   = modadd(cell[1], dir[1], map[0].length);
					
					// check all other free plates
					var colliding_plate = check_free_plates(plates, 
															free_plates,
															f, 
															nx, ny);
					if(colliding_plate > -1){
						// combine and create new group, remove them from list
						// then break the for loop.
						var n_group = combine_plates(plates, 
													plate_dirs, 
													f, 
													colliding_plate);
						groups.push(n_group);

						// Both plates are no longer 'free'.
						free_plates[f] = false;
						free_plates[colliding_plate] = false;
						collided = true;
						break;	
					}
					// check the groups
 					var colliding_group = check_groups(groups, -1, nx, ny);	
 					if(colliding_group > -1){
 						// there's a collision, add plate to group, remove from list, break.
 						add_plate_to_group(plates, f, groups[colliding_group]);
 						free_plates[f] = true;
						collided = true; 
						break;
 					}
				}
				if(!collided){ 
					move_plate(world, plate, dir);
				}
			}
		}
		// update colliding groups
		for (var g = 0; g < groups.length; g++) {
			var group = groups[g];
			if(group == []){
				// Can happen because we're slicing the array when we add a group
				break;
			}
			// assume that group is [[plates...], dir, base_idx, mass?] for now.
			var g_plates = group[0];
			var g_dir    = group[1];
			for (var p = 0; p < g_plates.length; p++) {
				var plate = g_plates[p];
				for (var c = 0; c < plate.length; c++) {
					var cell = plate[c];
					var nx   = modadd(cell[0], dir[0], map.length);
					var ny   = modadd(cell[1], dir[1], map[0].length);
					
					// check all other free plates
					var colliding_plate = check_free_plates(plates, 
															free_plates,
															-1, 
															nx, ny);
					if(colliding_plate > -1){
						// combine and create new group.
						add_plate_to_group(plates, colliding_plate, group); 
						free_plates[colliding_plate] = false;
						collided = true;
						break;	
					}
					// check the groups
 					var colliding_group = check_groups(groups, g, nx, ny);	
 					if(colliding_group > -1){
 						// TODO - i think theres atleast 2.5 bugs here.
 						combine_groups(groups, colliding_group, g);
 						// TODO - track stale groups? blarg. I worry this is the source of non moving groups.
						groups.splice(colliding_group, 1);
						collided = true; 
						break;
 					}
				}
				if(collided){
					break;
				}
			}
			resolve_tectonics(world, group);
			move_group(world, group);
		}
		var w = copy2d(world);
		world_list.push(w);
	}
	return world_list;
}

// ** MovementSimulation Helper Methods
function check_free_plates(plates, free_plates, i_idx, nx, ny){
	// check all of the plates for collisions with x/y
	// ignore the plate at index i_idx. if i_idx is -1, look at all of them. ''ignore' index
	for (var p = 0; p < free_plates.length; p++) {;
		if(p != i_idx && free_plates[p]){
			var plate = plates[p];
			for (var c = 0; c < plate.length; c++) {
				var cell = plate[c];
				if (cell[0] == nx && cell[1] == ny) {
					return p;
				}
			}
		}
	}
	return -1;
}

function check_groups(groups, g_idx, nx, ny){
	for (var g = 0; g < groups.length; g++) {
		if(g != g_idx){
			var group = groups[g];
			var plates = group[0]; // plate list is first element.
			for (var p = 0; p < plates.length; p++) {
				var plate = plates[p];
				for (var c = 0; c < plate.length; c++) {
					var cell = plate[c];
					if (cell[0] == nx && cell[1] == ny) {
						return g;
					}
				}
			}	
		}
	}
	return -1;
}

// I think this is eating the cells from atleast one of the
// groups. also leads to some weird gaps. 
function combine_plates(plates, plate_dirs, p_idx, c_idx){
	console.log("combining plates");
	var ps = [plates[p_idx], plates[c_idx]];
	return [ps, plate_dirs[p_idx]]; // new group 
}

// TODO - this is broken. One group stays still and the other
//        keeps on truckin'.
function combine_groups(groups, g_a, g_b){
	console.log("combining groups");
	var group_a = groups[g_a];
	var group_b = groups[g_b];
	for (var i = 0; i < group_b[0].length; i++) {
		group_a[0].push(group_b[0][i]);
	}
	group_b = [];
}

function add_plate_to_group(plates, c_idx, group){
	console.log("adding plate to group");
	group[0].push(plates[c_idx]);
}

function move_plate(map, plate, dir){
	var map_copy = copy2d(map);
	for (var c = 0; c < plate.length; c++) {
		var cell = plate[c];
		map[cell[0]][cell[1]] = 0.0;
	}
	for (var c = 0; c < plate.length; c++) { 
		var cell = plate[c];
		var nx   = modadd(cell[0], dir[0], map.length);
		var ny   = modadd(cell[1], dir[1], map[0].length);
		map[nx][ny] = map_copy[cell[0]][cell[1]];
		plate[c] = [nx, ny];
	}
}

function move_group(map, group){
	var plates = group[0];
	var dir = group[1];    
	for (var p = 0; p < plates.length; p++) {
		var plate = plates[p];
		move_plate(map, plate, dir);
	}
}

// Tectonics Method
function resolve_tectonics(map, group){
	// need more information in the group. 
	// need a 'stress map'. each location is 
	// the stress of that cell. naieve: just 
	// carry an array of the whole map.
	// have a value where it needs to be.
}

// ** Helper methods *****
function copy2d(arr){
	var ret = new Array();
	for (var i = 0; i < arr.length; i++) {
		ret[i] = new Array();
		for (var j = 0; j < arr[0].length; j++) {
			ret[i][j] = arr[i][j];
		}
	}
	return ret;
}

function modadd(a, b, m){
	// because javascript gives you remainder, not modulus
	var c = a + b;
	if(c < 0){
		return m+c;
	}
	if(c >= m){
		return c-m;
	}
	return a+b;
}
 
export default Tectonics;