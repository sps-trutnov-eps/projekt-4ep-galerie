const path = require('path');

const model = require(path.join(__dirname, '..', 'models', 'projektyModel'));

exports.main = (req, res) => {
    let data = {
        tagy: model.ziskejTagy(),
        projekty: model.nacistVsechny()
    };
    res.render('projekty/main', {
        data,
    });
}

exports.hodnoceni = (req, res) => {
    let susenky = rozdelitCookie(req);

    if(req.headers.cookie == undefined)
    {
        res.cookie(req.body.id, "zahlasovano" + req.body.id);      
        model.aktualizovatHodnoceni(req.body.id, req.body.hodnoceni);
        return res.send({"msg":{"status":1}})
    }
    else
    {
        for (i in susenky){
            if(susenky[req.body.id] != "zahlasovano" + req.body.id)
            {
                res.cookie(req.body.id, "zahlasovano" + req.body.id);      
                model.aktualizovatHodnoceni(req.body.id, req.body.hodnoceni);
                return res.send({"msg":{"status":1}})
            }
            else
            {
                return res.send({"msg":{"status":2}})
            }
        }
    }
    res.send('Vsechno OK!'); 
}

exports.prehled = (req, res) => {
    response.render('projekty/prehled');
}

exports.detail = (req, res) => {
    let id = req.params.id;

    let data = model.nacistProjekt(id);

    res.render('projekty/detail', {
        data, id
    });
}

let rozdelitCookie = (request) => {
    let rc = request.headers.cookie;
    let list = {};

    rc && rc.split(';').forEach(cookie => {
        let parts = cookie.split('=');
        list[parts.shift().trim()] = decodeURI(parts.join('='));
    });

    return list;
}
