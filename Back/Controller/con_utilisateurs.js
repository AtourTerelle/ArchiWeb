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
        //console.log(req)
        console.log(req.body)
        console.log(req.body.mdp_u)

        const {pseudo_u, mdp_u, role_u} = req.body;

        const user = new utilisateurs({ 
            pseudo_u,
            mdp_u,
            role_u,
        })

        await user.save();

        res.status(200).json({message: "Success"});
    } catch (e) {
        console.log(e)
        res.status(400).json({message: "Error", });
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