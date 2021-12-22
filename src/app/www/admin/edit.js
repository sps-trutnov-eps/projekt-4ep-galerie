window.onload = () => {
    options = {
        data: {},
        onAutocomplete: function(e) {
            var start = performance.now();
            var end;
            var input = document.getElementById('autocomplete-input');
            var text = input.value.split(' ')[0];
            input.value = "";

            var articles = fetch(`/admin/edit/${text}`).then(res=>res.json()).then((data)=>{
                if (typeof(data) === 'object') {
                    (document.getElementById('article').hidden)?document.getElementById('article').hidden = false:null;
                    document.getElementById('articleID').innerHTML = text;
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


    var titles = fetch('/admin/getArticleTitles').then(res => res.json()).then(data=>{
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

    document.getElementById('articleDelete').addEventListener('click', (e) => {
        var modalArticle = document.getElementById('modalArticle')
        modalArticle.innerHTML = `<strong>${document.getElementById('articleID').innerHTML}</strong>`;
    })
    
    document.getElementById('confirmArticleDelete').addEventListener('click', (e) => {
        var input = document.getElementById('inputArticleDelete').value.toUpperCase();
        var article = document.getElementById('modalArticle').innerHTML.slice(8,-9);
        
        if (input === article) {
            fetch('/admin/deleteArticle', {
                method: 'POST',
                headers: {'Content-Type':'application/json'},
                body:JSON.stringify({'ID': article})
            }).then(res=>res.json()).then(data=>{
                if (data.msg === "Clanek byl vymazan uspesne.") {
                    M.toast({html: '<span class="light-green-text lighten-2" style="font-weight:bold;">Článek byl úspěšně smazán!</span>'});
                }
                else if (data.msg === "Clanek nenalezen.") {
                    M.toast({html: 'Článek již neexistuje!'});
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
    
    document.getElementById('sendChangedArticle').addEventListener('click', (e) => {
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
        var data = [document.getElementById('articleID').innerHTML, items]
        fetch('/admin/editArticle', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(data)
        }).then(res=>res.json()).then(data=>{
            M.toast({html: `<span class="light-green-text lighten-2" style="font-weight:bold;">${data.msg}</span>`});
            var articleTitles = fetch('/admin/getArticleTitles').then(res => res.json()).then(data=>{
                var tmpData = {}
                for (var i = 0; i < data.length; i++) {
                    tmpData[`${Object.keys(data[i])} ${data[i][Object.keys(data[i])]}`] = null;
                }
                instances[0].updateData(tmpData)
            }).catch(e=>console.log(e))
        }).catch(e=>console.log(e));
    })
}
