module.exports = function(app){
    //const express = require('express');

    //const router = express.Router();
    
    const con_utilisateurs = require('../Controller/con_utilisateurs');
    
    app.get('/users', con_utilisateurs.getUser);
    app.post('/add_user', con_utilisateurs.addutilisateurs);
    app.put('/modif_user/:id', con_utilisateurs.modifutilisateurs);
}
