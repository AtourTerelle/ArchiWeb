const materiels = require("../Model/materiels");

exports.materielsDispo = async (req, res) => {
    try {
        const materieldispo = await materiels.find({ Reserve_par: null });
        res.status(200).json(materieldispo);
    } catch (error) {
        res.status(500).json({ message: "Erreur du serveur", error: error.message });
    }
};

exports.materielsDispoByType = async (req, res) => {
    try {
        console.log(req.params)
        const { type } = req.params;
        const materielsdispo = await materiels.find({ Type: type, Reserve_par: null });
        res.status(200).json(materielsdispo);
    } catch (error) {
        res.status(500).json({ message: "Erreur du serveur", error: error.message });
    }
};

exports.materielsReserve = async (req, res) => {
    try {
        const { userId } = req.params;
        const reservedMateriel = await Materiel.find({ Reserve_par: userId });
        res.status(200).json(reservedMateriel);
    } catch (error) {
        res.status(500).json({ message: "Erreur du serveur", error: error.message });
    }
};

exports.AddMateriels = async (req, res) => {
    try {
        const { nom_m, type_m, salle } = req.body;

        const existingmat = await materiels.findOne({nom_m: nom_m});
        if (existingmat) {
            return res.status(400).json({ message: 'Materiel déjà existant' });
        }

        // Création d'une nouvelle instance de matériel
        const newMateriel = new materiels({
            nom_m,
            type_m,
            reserve_par: "",
            salle
        });


        // Sauvegarde dans la base de données
        await newMateriel.save();
        res.status(201).json({message: "Success"});
    } catch (error) {
        res.status(500).json({ message: "Erreur du serveur", error: error.message });
    }
};