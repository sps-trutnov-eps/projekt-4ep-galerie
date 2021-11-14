window.onload = () => {
    var editButtons = document.getElementsByClassName('itemEditable');
    var boolButtons = document.getElementsByClassName('boolEditable');

    var editFunction = (e) => {
        var parent = e.target.parentElement.parentElement.children[1];
        switch(parent.contentEditable) {
            case "inherit": {
                parent.contentEditable = true;
                parent.focus();
                parent.style.backgroundColor = "rgba(255,0,0,0.2)";
                e.target.innerHTML = "SAVE";
                e.target.classList.remove("btn-secondary");
                e.target.classList.add('btn-success');
                break;
            }
            case "false": {
                parent.contentEditable = true;
                parent.focus();
                parent.style.backgroundColor = "rgba(255,0,0,0.2)";
                e.target.innerHTML = "SAVE";
                e.target.classList.remove("btn-secondary");
                e.target.classList.add('btn-success');
                break;
            }
            case "true": {
                parent.contentEditable = false;
                parent.style.backgroundColor = "inherit";
                e.target.innerHTML = "EDIT";
                e.target.classList.remove("btn-success");
                e.target.classList.add('btn-secondary');
                break;
            }
            default: {
                parent.contentEditable = false;
                parent.style.backgroundColor = "inherit";
                e.target.innerHTML = "EDIT";
                e.target.classList.remove("btn-success");
                e.target.classList.add('btn-secondary');
                break;
            }
        }
    }

    var boolFunction = (e) => {
        var parent = e.target.parentElement.parentElement.children[1];
        switch(parent.innerHTML) {
            case "false": {
                parent.innerHTML = "true";
                break;
            }
            case "true": {
                parent.innerHTML = "false";
                break;
            }
            default: {
                parent.innerHTML = "false";
                break;
            }
        }
    }

    for(var i = 0; i < editButtons.length; i++) {
        editButtons[i].addEventListener('click', editFunction, false);
    }

    for(var i = 0; i < boolButtons.length; i++) {
        boolButtons[i].addEventListener('click', boolFunction, false);
    }

    document.getElementById('articleID').addEventListener('change', (e) => {
        var input = e.target;
        if (input.value <= 0) { input.value = 0 }
    })

    document.getElementById('getData').addEventListener('click', () => {
        var articleID = document.getElementById('articleID').value;
        var startTime = performance.now();
        var endTime;
        fetch(`/admin/edit/${articleID}`).then((res) => res.json()).then((data) => {
            console.log(data);
            nastavitData(data);
            endTime = performance.now();
            document.getElementById('stats').innerHTML =  document.getElementById('stats').innerHTML = `Tato akce trvala <span style="font-weight: bold; color: red;">${endTime-startTime}</span> ms.`;
        }).catch((error) => {
            document.getElementById('stats').innerHTML =  document.getElementById('stats').innerHTML = `<span style="font-weight: bold; color: red;">CHYBA KONTAKTOVANI SERVERU.</span>`;
        })
    })

    var nastavitData = (data) => {
        document.getElementById('articleHeader').innerHTML = `ID_${document.getElementById('articleID').value}`;
        document.getElementById('article').innerHTML = `ID_${document.getElementById('articleID').value}`;

        document.getElementById('autor').innerHTML = JSON.stringify(data.autor);
        document.getElementById('datum').innerHTML = data.datum;
        document.getElementById('viditelny').innerHTML = data.viditelny;
        document.getElementById('nadpis').innerHTML = data.nadpis;
        document.getElementById('popis_short').innerHTML = data.popis_short;
        document.getElementById('popis_full').innerHTML = data.popis_full;
        document.getElementById('tagy').innerHTML = data.tagy;
    }

    function sendData(data) {
        fetch('/admin/editArticle', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        }).then((res) => res.json()).then((data) => {
            console.log(data);
        }).catch((error) => {
            document.getElementById('stats').innerHTML =  document.getElementById('stats').innerHTML = `<span style="font-weight: bold; color: red;">CHYBA POSILANI DAT NA SERVER.</span>`;
        })
    }

    document.getElementById('saveButton').addEventListener('click', () => {
        var items = {"autor":JSON.parse(document.getElementById('autor').innerHTML),
                     "datum":document.getElementById('datum').innerHTML,
                     "viditelny":document.getElementById('viditelny').innerHTML === 'true',
                     "nadpis":document.getElementById('nadpis').innerHTML,
                     "popis_short":document.getElementById('popis_short').innerHTML,
                     "popis_full":document.getElementById('popis_full').innerHTML,
                     "tagy":document.getElementById('tagy').innerHTML.split(',').map(Number)};
        console.log(items);
        var data = [`${document.getElementById('articleHeader').innerHTML}`, items];
        if (document.getElementById('articleHeader').innerHTML === "") return;
        sendData(data);
    });

    document.getElementById('dltButton').addEventListener('click', () => {
        var id = document.getElementById('articleHeader').innerHTML;
        var data = {"ID":id};
        fetch('/admin/deleteArticle', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(data)
        }).then((res)=>res.json()).then((data)=>{
            //změnit vizuálně
            alert(data.msg);
        }).catch((error) => {
            document.getElementById('stats').innerHTML = `<span style="color: red; font-weight:bold;">CHYBA MAZÁNÍ ČLÁNKU ZE SERVERU</span>`;
        })
        location.reload();
    });
}