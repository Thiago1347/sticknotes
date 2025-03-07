/**
 * Modulo de conexão com o banco de dados
 * Uso do framework mongoose
 */

// Importção do mongoose
const mongoose = require('mongoose')

// configuração do banco de dados
// ip/link do servidor,autenticação,nome do banco 
// ao final da url definir o nome do banco de dados 
// exemplo: /dbclientes 
const url = 'mongodb+srv://admin:123Senac@cluster2.w2es8.mongodb.net/'

// validação (evitar a abertura de várias conexões)
let conectado = false

// método para conectar com o banco de dados 
const conectar = async () => {
    // se nao estiver conectado
    if(!conectado){
        // conectar com o banco de dados
        try {
            await mongoose.connect(url) //conectar
            conectado = true
            console.log("MongoDB Conectado")
        } catch (error) {
            console.error(error)
        }
    }
}

// método para desconectar com o banco de dados 
const desconectar = async () => {
    // se estiver conectado
    if(conectado) {
        //desconectar
        try {
            await mongoose.disconnect(url) //desconectar
            conectado = false
            console.log("MongoDB desconectado")
        } catch (error) {
            console.log(error)
        }
    }
}

//exportar para o main os metodos de conectar e desconectar
module.exports = {conectar,  desconectar}