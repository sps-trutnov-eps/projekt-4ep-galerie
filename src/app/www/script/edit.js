window.onload = () => {
    options = {
        data: {},
        onAutocomplete: function(e) {
            var start = performance.now();
            var end;
            var input = document.getElementById('autocomplete-input');
            var text = input.value.split(' ')[0];
            input.value = "";

            var projects = fetch(`/admin/edit/${text}`).then(res=>res.json()).then((data)=>{
                if (typeof(data) === 'object') {
                    (document.getElementById('project').hidden)?document.getElementById('project').hidden = false:null;
                    document.getElementById('projectID').innerHTML = text;
                    document.getElementById('autor').innerHTML = data.autor;
                    document.getElementById('datum').innerHTML = data.datum;
                    document.getElementById('nadpis').innerHTML = data.nadpis;
                    document.getElementById('popis_short').innerHTML = data.popis_short;
                    document.getElementById('popis_full').innerHTML = data.popis_full;
                    document.getElementById('tagy').innerHTML = data.tagy;
                    document.getElementById('idclanku').innerHTML = data.id;
                    document.getElementById('like').innerHTML = data.like;
                    document.getElementById('dislike').innerHTML = data.dislike;
                    document.getElementById('obrazky').innerHTML = data.obrazky;
                    end = performance.now();
                    document.getElementById('stats').innerHTML = `Tato akce trvala <span style="font-weight: bold;" class="red-text bold">${end-start} ms</span>`
                }
            }).catch(e=>{
                M.toast({html: `<span class="red-text lighten-2" style="font-weight:bold;">${e}</span><button class="btn-flat toast-action" onclick="location.reload()">REFRESH</button>`});
            })
        }
    }

    var elems = document.querySelectorAll('.autocomplete');
    var instances = M.Autocomplete.init(elems, options);

    var modal = document.querySelectorAll('.modal');
    var modalInstance = M.Modal.init(modal);

    var nav = document.querySelectorAll('.dropdown-trigger');
    var navInstance = M.Dropdown.init(nav);


    var titles = fetch('/admin/getProjectTitles').then(res => res.json()).then(data=>{
        data.pop() // POKUD TOHLE Z NĚJAKÉHO ZPŮSOBU ODSTRANÍ NEŽÁDOUCÍ ČLÁNEK, TAK PROSÍM PODĚKUJTE OSOBĚ, KTERÁ PŘIDALA "next_id" DO SCHEMATU ČLÁNKŮ, DĚKUJI
        for (var i = 0; i < data.length; i++) {
            options.data[`${Object.keys(data[i])} ${data[i][Object.keys(data[i])]}`] = null;
        }
    }).catch(e=>console.log(e))

    var editButtons = document.getElementsByClassName('iEditable');
    for (var i = 0; i < editButtons.length; i++) {
        editButtons[i].addEventListener('click', (e) => {
            var parent = e.target.parentElement.parentElement;
            document.getElementById('editingItem').innerHTML = parent.children[0].innerHTML;
            var inputText = document.getElementById('editingText');
            inputText.value = parent.children[1].innerHTML;
            document.getElementById('editingApply').CALLBACK_VALUE = parent;
            setTimeout(()=> {
                inputText.focus()
            },0)
        })
    }

    var changeButtons = document.getElementsByClassName('iChangable');
    for (var i = 0; i < changeButtons.length; i++) {
        changeButtons[i].addEventListener('click', (e) => {
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
        })
    }

    document.getElementById('projectDelete').addEventListener('click', (e) => {
        var modalProject = document.getElementById('modalProject')
        modalProject.innerHTML = `<strong>${document.getElementById('projectID').innerHTML}</strong>`;
    })
    
    document.getElementById('confirmProjectDelete').addEventListener('click', (e) => {
        var input = document.getElementById('inputProjectDelete').value.toUpperCase();
        var project = document.getElementById('modalProject').innerHTML.slice(8,-9);
        
        if (input === project) {
            fetch('/admin/deleteProject', {
                method: 'POST',
                headers: {'Content-Type':'application/json'},
                body:JSON.stringify({'ID': project})
            }).then(res=>res.json()).then(data=>{
                if (data.msg === "Projekt byl vymazán úspěšně.") {
                    M.toast({html: '<span class="light-green-text lighten-2" style="font-weight:bold;">Projekt byl úspěšně smazán!</span>'});
                }
                else if (data.msg === "Projekt nenalezen.") {
                    M.toast({html: 'Projekt již neexistuje!'});
                }
                else {
                    M.toast({html: 'Neznámá chyba!'});
                }
                setTimeout(()=>{location.reload()},2500)
            }).catch(e=>console.log(e))
        }
    })
    
    document.getElementById('editingApply').addEventListener('click', (e) => {
        var input = document.getElementById('editingText').value;
        e.target.CALLBACK_VALUE.children[1].innerHTML = input
    })
    
    document.getElementById('sendChangedProject').addEventListener('click', (e) => {
        var items = {
            'autor':document.getElementById('autor').innerHTML,
            'datum':document.getElementById('datum').innerHTML,
            'nadpis':document.getElementById('nadpis').innerHTML,
            "popis_short":document.getElementById('popis_short').innerHTML,
            "popis_full":document.getElementById('popis_full').innerHTML,
            "tagy":document.getElementById('tagy').innerHTML.split(','),
            "like":parseInt(document.getElementById('like').innerHTML),
            "dislike":parseInt(document.getElementById('dislike').innerHTML),
            "obrazky":document.getElementById('obrazky').innerHTML.split(',')
        }
        var data = [document.getElementById('projectID').innerHTML, items]
        fetch('/admin/editProject', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        }).then(res=>res.json()).then(data=>{
            M.toast({html: `<span class="light-green-text lighten-2" style="font-weight:bold;">${data.msg}</span>`});
            var projectTitles = fetch('/admin/getProjectTitles').then(res => res.json()).then(data=>{
                var tmpData = {}
                for (var i = 0; i < data.length; i++) {
                    tmpData[`${Object.keys(data[i])} ${data[i][Object.keys(data[i])]}`] = null;
                }
                instances[0].updateData(tmpData)
            }).catch(e=>console.log(e))
        }).catch(e=>console.log(e));
    })

    document.getElementById('logoutbtn').addEventListener('click', (e) => {
        fetch('/admin/logout', {method:"POST"}).then(res=>res.json()).then(data=>{
            if (data.msg.status == 100) {
                location.replace('/')
            }
        }).catch(e=>console.log(e))
    })
}
