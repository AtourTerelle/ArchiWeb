module.exports = function(app){

    const con_materiels = require('../Controller/con_materiels');
    
    app.get('/materielsDispo', con_materiels.materielsDispo);
    app.get('/materielsDispoByType/:type', con_materiels.materielsDispoByType);
    app.post('/addMateriels', con_materiels.AddMateriels);

    
}