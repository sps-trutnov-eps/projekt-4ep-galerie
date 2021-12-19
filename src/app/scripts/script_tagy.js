/*let zaskrtle_tagy=[];

document.querySelectorAll(".containerSTlacitky").forEach(element => 
  console.log(element),
  document.querySelectorAll("input[type=checkbox]").forEach(checkboxy => checkboxy.addEventListener("change", (event)=> 
  {
    console.log(checkboxy);
    if(checkboxy.checked==true)
      zaskrtle_tagy.push(checkboxy.value);
    else
    {
      zaskrtle_tagy.pop(checkboxy.value);
    }
    console.log(zaskrtle_tagy);
  }))
);*/

function Test()
{ 
  fetch('/filtrovani_tagu', 
  {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ description: "Some text here" })
  });
}




