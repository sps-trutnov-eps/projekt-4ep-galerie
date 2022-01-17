const projektyModel = require(require('path').join(__dirname, '..', 'models', 'projektyModel'));
const dbModel = require(require('path').join(__dirname, '..', 'models', 'adminModel'));

exports.main = (req, res) => 
{
    let data = {
        tagy: projektyModel.Ziskej_tagy(),
        projekty:dbModel.nacistVse()
    };
    console.log(data);
    res.render('main',{data});
}

exports.hodnoceni = (rq, res) =>
{
    var susenky = rozdelitCookie(rq);
    if(rq.headers.cookie == undefined)
    {
        res.cookie(rq.body.id, "zahlasovano" + rq.body.id);      
            dbModel.aktualizovatHodnoceni(rq.body.id, rq.body.hodnoceni);
            return res.send({"msg":{"status":1}})
    }
    else
    {
        for (i in susenky){
            if(susenky[rq.body.id] != "zahlasovano" + rq.body.id)
            {
                res.cookie(rq.body.id, "zahlasovano" + rq.body.id);      
                dbModel.aktualizovatHodnoceni(rq.body.id, rq.body.hodnoceni);
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
