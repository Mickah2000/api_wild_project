/*******************************************/
/***** Import des modules nécessaires *****/
/*****************************************/
const express = require('express')

const cors = require('cors')

/******************************************************/
/** Chargement de la connexion à la base de données **/
/****************************************************/
let DB = require('./db.config')

const user_router = require('./routes/users')

/********************************/
/*** Initialisation de l'API ***/
/******************************/
const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

/*********************************/
/*** Mise en place du routage ***/
/*******************************/
app.get('/', (req, res) => res.send(`API OK !`))

app.use('/argonautes', user_router)

app.get('*', (req, res) => res.status(501).send('???'))

/***********************************************/
/***** Lancement du serveur avec test DB  *****/
/*********************************************/
DB.authenticate()
    .then(() => console.log('Base de données connecté !'))
    .then(() => {
        app.listen(process.env.SERVER_PORT, () => {
            console.log(`Ce serveur fonctionne sur le port ${process.env.SERVER_PORT} !`)
        })
    })
    .catch (err => console.error('Erreur base de données.', err))