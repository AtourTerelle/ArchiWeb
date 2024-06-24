module.exports = function(app){

    const con_demandes = require('../Controller/con_demandes');
    
    app.post('/addDemandes', con_demandes.createDemande);
    
}