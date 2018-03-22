var cvs_id = "cvs";
var cvs    = document.getElementById(cvs_id);

var button_gen    = document.getElementById("generate");

button_gen.addEventListener("click", generateClickListener);
generate(CVS);

function generateClickListener(){
   	// STUFF.
    generate(cvs);
}

function generate(cvs){
	var ctx = cvs.getContext("2d");
}