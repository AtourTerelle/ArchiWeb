module.exports = function(app){

    const con_utilisateurs = require('../Controller/con_utilisateurs');
    
    app.get('/users', con_utilisateurs.getUser);
    app.post('/add_user', con_utilisateurs.addutilisateurs);
    app.put('/modif_user/:id', con_utilisateurs.modifutilisateurs);
    //app.post('/connexion', con_utilisateurs.connexion);
}
