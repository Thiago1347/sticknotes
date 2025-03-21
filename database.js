/**
 * Modulo de conexão com o banco de dados
 * Uso do framework mongoose
 */

// Importção do mongoose
// Não esquecer de instalar o modulo (npm i mongoose)
const mongoose = require('mongoose')

// configuração do banco de dados
// ip/link do servidor,autenticação,nome do banco 
// ao final da url definir o nome do banco de dados 
// exemplo: /dbclientes 
const url = 'mongodb+srv://admin:123Senac@cluster2.w2es8.mongodb.net/dbnotes'

// validação (evitar a abertura de várias conexões)
let conectado = false

// método para conectar com o banco de dados 
const conectar = async () => {
    // se nao estiver conectado
    if(!conectado){
        // conectar com o banco de dados
        try {
            await mongoose.connect(url) //conectar
            conectado = true // setar a variavel
            console.log("MongoDB Conectado")
            return true 
        } catch (error) {
            console.error(error)
            return false
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
            conectado = false // setar a varíavel
            console.log("MongoDB desconectado")
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }
}

//exportar para o main os metodos de conectar e desconectar
module.exports = {conectar,  desconectar}