/*******************************************/
/***** Import des modules nécessaires *****/
/*****************************************/
const express = require('express')

const User = require('../models/user')

/***************************************/
/*** Récupération du router express ***/
/*************************************/
let router = express.Router()

router.get('', (req, res) => {
    User.findAll()
        .then(users => res.json({ data: users }))
        .catch(err => res.status(500).json({ message: 'Erreur Base de données.', error: err }))
})


router.put('', (req, res) => {
    const { name } = req.body

    // Validation des données reçues
    if (!name) {
        return res.status(400).json({ message: 'Donnée Manquante' })
    }

    User.findOne({ where: { name: name }, raw: true })
        .then(user => {
            // Vérification si l'utilisateur existe déjà
            if (user !== null) {
                return res.status(409).json({ message: `L'argonaute ${name} existe déjà !` })
            }
            // Création de l'utilisateur
            User.create(req.body)
                .then(user => res.json({ message: 'Argonaute ajouté !', data: user }))
                .catch(err => res.status(500).json({ message: 'Erreur Base de données', error: err }))
        })
        .catch(err => res.status(500).json({ message: 'Erreur base de données.', error: err }))
})

module.exports = router

