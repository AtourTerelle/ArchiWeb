const utilisateurs = require("../Model/utilisateurs");

exports.getUser = async (req, res) => {

    try {
        const users = await utilisateurs.find();
        res.status(200).json(users);
    } catch (e) {
        res.status(400).json({message: "Error"});
    }
}

exports.addutilisateurs = async (req, res) => {

    try {
        const user = await utilisateurs({ 
            pseudo_u: req.body.pseudo_u,
            mpd_u: req.body.mpd_u,
            role_u: req.body.role_u,
        });

        await user.save();

        res.status(200).json({message: "Success"});
    } catch (e) {
        res.status(400).json({message: "Error"});
    }
}

exports.modifutilisateurs = async (req, res) => {

    try {

        const userId = req.params.id_u;
        const {newPseudo, newMdp} = req.body;

        const user = await utilisateurs.findOne({ id_u: userId});

        if (user) {
            return res.status(404).json({message: "Utilisateur non trouvé"})
        }

        user.pseudo_u = newPseudo;
        user.mpd_u = newMdp;

        await user.save();

        res.status(200).json({message: "Success", user});
    } catch (e) {
        res.status(400).json({message: "Error"});
    }
}