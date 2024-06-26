const mongoose = require('mongoose');

const materielSchema = new mongoose.Schema({
    nom_m: { type: String, required: true },
    type_m: { type: String, required: true },
    reserve_par: { type: String, required: true},
    salle: { type: String, required: true }
});

module.exports = mongoose.model('materiels', materielSchema);