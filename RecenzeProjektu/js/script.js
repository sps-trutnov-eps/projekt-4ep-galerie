var rate = 0;

function potvrzeni(){
	var user=document.getElementById('uzivatel').value;
	var review=document.getElementById('recenze').value;
	if(rate != 0 && user !="" && review !=""){
		var html=
		"<h4>User: <label class='text-primary'>" + user + "</label></h4>"
		+"<h4>Rating: <label class='text-primary'>" + rate + "</label></h4>"
		+"<h4>Review</h4>"
		+"<p>"+review+"</p>"
		+"<hr style='border-top:1px solid #000;'/>";
		document.getElementById('vysledek').innerHTML+=html;
		
		document.getElementById('uzivatel').value="";
		document.getElementById('recenze').value="";
	}
}

function hodnoceni(cisloHvezdicky){
	rate=cisloHvezdicky.id[0];
	sessionStorage.star = rate;
	for(var i=0;i<5;i++){
		if(i<rate){
			document.getElementById((i+1)).style.color="yellow";
		}
		else{
			document.getElementById((i+1)).style.color="black";
		}
	}
}