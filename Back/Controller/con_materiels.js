const materiels = require("../Model/materiels");

exports.materielsDispo = async (req, res) => {
    try {
        const materieldispo = await materiels.find({ reserve_par: "Libre" });
        res.status(200).json(materieldispo);
    } catch (error) {
        res.status(500).json({ message: "Erreur du serveur", error: error.message });
    }
};

exports.allmateriels = async (req, res) => {
    try {
        const materieldispo = await materiels.find();
        res.status(200).json(materieldispo);
    } catch (error) {
        res.status(500).json({ message: "Erreur du serveur", error: error.message });
    }
};

exports.materielsDispoByType = async (req, res) => {
    try {
        const { type_m } = req.body;

        const materielsdispo = await materiels.find({ type_m: type_m, reserve_par: "Libre" });
        console.log(materielsdispo)


        res.status(200).json(materielsdispo);
    } catch (error) {
        res.status(500).json({ message: "Erreur du serveur", error: error.message });
    }
};

exports.materielsReserve = async (req, res) => {
    try {
        const { pseudo_u } = req.body;

        const reservedMateriel = await materiels.find({ reserve_par: pseudo_u });

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
            reserve_par: "Libre",
            salle: "Reserve"
        });


        // Sauvegarde dans la base de données
        await newMateriel.save();
        res.status(201).json({message: "Success"});
    } catch (error) {
        res.status(500).json({ message: "Erreur du serveur", error: error.message });
    }
};

exports.deleteMateriels = async (req, res) => {
    try {
        const { nom_m } = req.body;
 
        //const deletedMateriel = await Materiel.findByIdAndDelete(id);

        const deletedMateriel = await materiels.findOne({nom_m: nom_m});
        if (!deletedMateriel) {
            return res.status(404).json({ message: "Matériel non trouvé" });
        }
        
        await deletedMateriel.deleteOne();
        res.status(200).json({ message: "Matériel supprimé avec succès" });
    } catch (error) {
        res.status(500).json({ message: "Erreur du serveur", error: error.message });
    }
};

// Exemple avec id

/*exports.materielsDispo = async (req, res) => {
    try {
        const _id = req.body._id

        console.log(_id)

        //const materieldispo = await materiels.find({ Reserve_par: null });
        const materieldispo = await materiels.findById({_id});
        res.status(200).json(materieldispo);
    } catch (error) {
        res.status(500).json({ message: "Erreur du serveur", error: error.message });
    }
};*/