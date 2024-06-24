const mongoose = require('mongoose');

const materielSchema = new mongoose.Schema({
    //id_m: { type: Number, required: true, unique: true },
    nom_m: { type: String, required: true },
    type_m: { type: String, required: true },
    reserve_par: { type: Number },
    salle: { type: String, required: true }
});

module.exports = mongoose.model('materiels', materielSchema);