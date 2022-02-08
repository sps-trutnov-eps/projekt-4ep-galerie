const path = require('path');

const tagyModel = require(path.join(__dirname, '..', 'models', 'tagyModel'));
const projektyModel = require(path.join(__dirname, '..', 'models', 'projektyModel'));

exports.prehled = (req, res) => {
    let data = {
        tagy: tagyModel.ziskejTagy(),
        projekty: projektyModel.nacistVsechny()
    };
    res.render('projekty/prehled', {
        data,
    });
}

exports.hodnoceni = (req, res) => {
    let susenky = rozdelitCookie(req);

    if(req.headers.cookie == undefined)
    {
        res.cookie(req.body.id, "zahlasovano" + req.body.id);      
        projektyModel.aktualizovatHodnoceni(req.body.id, req.body.hodnoceni);
        return res.send({"msg":{"status":1}})
    }
    else
    {
        for (i in susenky){
            if(susenky[req.body.id] != "zahlasovano" + req.body.id)
            {
                res.cookie(req.body.id, "zahlasovano" + req.body.id);      
                projektyModel.aktualizovatHodnoceni(req.body.id, req.body.hodnoceni);
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

exports.detail = (req, res) => {
    let id = req.params.id;

    let data = projektyModel.nacistProjekt(id);

    if(data) {
        res.render('projekty/detail', {
            data, id
        });
    } else {
        res.redirect('/');
    }
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
