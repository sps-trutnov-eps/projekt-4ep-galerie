const path = require('path');

const projektyModel = require(path.join(__dirname, '..', 'models', 'projektyModel'));
const dbModel = require(path.join(__dirname, '..', 'models', 'adminModel'));

exports.main = (req, res) => 
{
    let data = {
        tagy: projektyModel.Ziskej_tagy(),
        projekty:dbModel.nacistVse()
    };
    console.log(data);
    res.render('main',{data});
}

exports.hodnoceni = (req, res) =>
{
    var susenky = rozdelitCookie(req);
    if(req.headers.cookie == undefined)
    {
        res.cookie(req.body.id, "zahlasovano" + req.body.id);      
            dbModel.aktualizovatHodnoceni(req.body.id, req.body.hodnoceni);
            return res.send({"msg":{"status":1}})
    }
    else
    {
        for (i in susenky){
            if(susenky[req.body.id] != "zahlasovano" + req.body.id)
            {
                res.cookie(req.body.id, "zahlasovano" + req.body.id);      
                dbModel.aktualizovatHodnoceni(req.body.id, req.body.hodnoceni);
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

exports.prehled = (request, response) => {
    response.render('projekty/prehled');
}

exports.vypsat = (request, response) => {
    dbModel.vypsatVse();
}

exports.detail = (req, res) => {
    let id = req.params.id;

    let data = projektyModel.nacistProjekt(id);

    res.render('projekty/detail', {
        data, id
    });
}

function rozdelitCookie (request) {
    var list = {},
        rc = request.headers.cookie;

    rc && rc.split(';').forEach(function( cookie ) {
        var parts = cookie.split('=');
        list[parts.shift().trim()] = decodeURI(parts.join('='));
    });

    return list;
}
