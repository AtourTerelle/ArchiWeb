const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const utilisateurs = require("../Model/utilisateurs");

const JWT_SECRET = 'La_clef_pas_cacher_la';

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

        const {pseudo_u, mdp_u, role_u} = req.body;

        const hashedPassword = await bcrypt.hash(mdp_u, 10);
        
        const user = new utilisateurs({ 
            pseudo_u,
            mdp_u: hashedPassword,
            role_u,
        })

        const existingUser = await utilisateurs.findOne({pseudo_u: user.pseudo_u});
        if (existingUser) {
            return res.status(400).json({ message: 'Utilisateur déjà existant' });
        }

        await user.save();

        res.status(200).json({message: "Success"});
    } catch (e) {
        res.status(400).json({message: "Error", });
    }
    
}

exports.modifutilisateurs = async (req, res) => {

    try {
        const {pseudo_u, mdp_u} = req.body;

        const newMdp = mdp_u

        if(newMdp.length==0){
            return res.status(404).json({message: "mdp vide"})
        }

        const user = await utilisateurs.findOne({ pseudo_u: pseudo_u});
        if (!user) {
            return res.status(404).json({message: "Utilisateur non trouvé"})
        }

        const hashedPassword = await bcrypt.hash(newMdp, 10);

        user.mdp_u = hashedPassword;

        await user.save();

        res.status(200).json({message: "Success", user});
    } catch (e) {
        res.status(400).json({message: "Error"});
    }
}

exports.deleteutilisateurs = async (req, res) => {
    try {
        const { pseudo_u } = req.body;
        const deletedUser = await utilisateurs.findOne({pseudo_u: pseudo_u});

        if (!deletedUser) {
            return res.status(404).json({ message: "Utilisateur non trouvé" });
        }

        await deletedUser.deleteOne();
        res.status(200).json({ message: "Utilisateur supprimé avec succès" });
    } catch (error) {
        res.status(500).json({ message: "Erreur du serveur", error: error.message });
    }
};

exports.connexion = async (req, res) => {

    try {
        console.log(req.body);
        const { pseudo_u, mdp_u } = req.body;
        
        // Trouver l'utilisateur par e-mail
        const utilisateur = await utilisateurs.findOne({pseudo_u: pseudo_u});
        const role = utilisateur.role_u

        if (!utilisateur) {
            return res.status(401).json({ message: 'Utilisateur inexistant' });
        }
    
        // Comparer le mot de passe
        const isMatch = await bcrypt.compare(mdp_u, utilisateur.mdp_u);
    
        if (!isMatch) {
            return res.status(401).json({ message: 'mot de passe incorect' });
        }
        
        console.log("test 3");

        // Créer un jeton JWT
        const token = jwt.sign(
            { id_u: utilisateur._id, pseudo_u: utilisateur.pseudo_u, role_u: utilisateur.role_u },
            //process.env.JWT_SECRET,
            JWT_SECRET,
            { expiresIn: '1h' }
        );
        
        //res.status(200).json({utilisateur, token});
        return res.status(200).send({token, role})
    } catch (e) {
        res.status(500).json({ message: 'Erreur du serveur', error: e.message });
    }
}
exports.UserInfoFromToken = (req, res) => {
    try {
        //const token = req.header('auth-token');

        const { token } = req.body

        console.log(token)

        if (!token) {
            return res.status(401).json({ message: "Accès refusé" });
        }

        const decoded = jwt.verify(token, JWT_SECRET);

        res.status(200).json(decoded);
    } catch (error) {
        res.status(400).json({ message: "Token invalide", error: error.message });
    }
};

