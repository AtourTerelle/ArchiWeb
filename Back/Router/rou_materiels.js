module.exports = function(app){

    const con_materiels = require('../Controller/con_materiels');
    
    app.get('/materielsDispo', con_materiels.materielsDispo);
    
}