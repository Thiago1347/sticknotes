/**
 * Modelo de dados das notas
 * Criação da coleção
 */

//importação de recursos de mongoose
const {model, Schema} =require('mongoose')

// criação da estrutura da coleção
const noteSchema = new Schema({
    texto: {
        type: String
    },
    cor: {

    }
},{versionKey: false }) 

// exportar o modelo de dados para o main 
module.exports = model('Notas', noteSchema)