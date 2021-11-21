
//ZAČÁTEK SCRIPTU PRO TAGY!!
function vybratFiltr(filtr) {
    var x, i;
    x = document.getElementsByClassName("filtrDiv");
    if (filtr == "vse") filtr = "";
    for (i = 0; i < x.length; i++) {
      odstranitClass(x[i], "show"); // Odendá show k elemntů, které nejsou vybrány.
      if (x[i].className.indexOf(filtr) > -1) pridatClass(x[i], "show"); // Hledá, jestli je tam classa s názvem, která byla zvolena kliknutím na tag a pokud ano, tak přidá té classe show.
    }    
  }

  // Odendá show k elemntů, které nejsou vybrány.
  function odstranitClass(element, name) {
    var i, tabulka1, tabulka2;
    tabulka1 = element.className.split(" "); // oddělí classy u elemntů tam kde je mezera
    tabulka2 = name.split(" "); // zapíše pouze show do tabulky2

    for (i = 0; i < tabulka2.length; i++) {
        tabulka1.indexOf(tabulka2[i]); //hledá kde v tabulce1 je všude show (které elemnty jsou na stránce již zobrazeny)
      while (tabulka1.indexOf(tabulka2[i]) > -1) { // pokud je tam show, tak pokračuje
        console.log(tabulka1.indexOf(tabulka2[i]));
        console.log(tabulka1.splice(tabulka1.indexOf(tabulka2[i]))); //Pokud jsou zobrazeny, tak rozděluje v tabulce1 show
      }
    }
    element.className = tabulka1.join(" "); //přidává mezeru mezi elementy 
  }

  // Přídá show k elemntům, které jsou vybrány.
  function pridatClass(element, name) {
    var i, tabulka1, tabulka2;

    tabulka1 = element.className.split(" "); //oddělí v class elementy mezi mezerou a zapíše je do tabulky1
    tabulka2 = name.split(" "); // 

    for (i = 0; i < tabulka2.length; i++) {
      if (tabulka1.indexOf(tabulka2[i]) == -1) {
          element.className += " " + tabulka2[i]; //Přidává k elementum do class show
        }
    }
  }
  
var tlacitkaCont = document.getElementById("containerSTlacitky");
var tlacitka = tlacitkaCont.getElementsByClassName("tlacitko");

for (var i = 0; i < btns.length; i++) {
    tlacitka[i].addEventListener("click", function(){
    var current = document.getElementsByClassName("active");
    current[0].className = current[0].className.replace(" active", "");
    this.className += " active";
  });
}
//KONEC SCRIPTU PRO TAGY!!