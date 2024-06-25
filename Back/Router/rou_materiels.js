module.exports = function(app){

    const con_materiels = require('../Controller/con_materiels');
    
    app.get('/materielsDispo', con_materiels.materielsDispo);
    app.get('/materielsDispoByType', con_materiels.materielsDispoByType);
    app.post('/addMateriels', con_materiels.AddMateriels);
    app.delete('/deleteMateriels', con_materiels.deleteMateriels);
    app.get('/allMateriel', con_materiels.allmateriels);
    app.post('/materielReserve',con_materiels.materielsReserve);
    
}