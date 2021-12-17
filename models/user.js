/*******************************************/
/***** Import des modules nécessaires *****/
/*****************************************/
const { DataTypes } = require('sequelize')
const DB = require('../db.config')

/*******************************/
/*** Définition du modèle Argonaute */

const User = DB.define('Argonaute', {
    id: {
        type: DataTypes.INTEGER(10),
        primaryKey: true,
        autoIncrement: true
    },
    name:{
        type: DataTypes.STRING(100),
        defaultValue: '',
        allowNull: false,
        unique: true
    }
})

module.exports = User