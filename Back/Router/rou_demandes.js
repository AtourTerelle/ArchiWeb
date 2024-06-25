module.exports = function(app){

    const con_demandes = require('../Controller/con_demandes');
    
    app.post('/addDemandes', con_demandes.createDemande);
    app.get('/allDemandeEnAttente',con_demandes.getDemandesEnAttente);
    app.put('/reponseDemande', con_demandes.reponseDemande);
    app.post('/demandeByUser', con_demandes.DemandesByUser);
    
}