const path = require('path');
const jsondb = require('simple-json-db');

const db = new jsondb(path.join(__dirname, '..', '..', '..', 'data', 'tagy.json'));

exports.ziskejTagy = () => {
    return db.JSON();
}

exports.rozdel_tagy = (tagy) =>
{
    let tagy_db = db.JSON();
    console.log("test");
    let vysledek = {};
    for (let i = 0; i < tagy.length; i++) 
    {
        //Loop pres vsechny klice v DB
        Object.keys(tagy_db).forEach(function(key) 
        {
            if(vysledek[key] == undefined)
                vysledek[key] = [];
            //Loop pres vsechny hodnoty tagu v DB
            for (let k = 0; k < tagy_db[key].length; k++) 
            {
                if(tagy_db[key][k]==tagy[i])
                {
                    vysledek[key].push(tagy[i]);
                }
            }
      });
    }
    return vysledek;
}
