/**
 * preload.js - Usando no framework electron para aumentar a segurança e o desempenho
 */

// importação dos recursos do framework electron
// ipcRenderer permite estabelecer uma comunicação entre processos (IPC) main.js <-> renderer.js
// contextBridge: permissões de comunicão entre processos usando a api do eletron
const {ipcRenderer, contextBridge } = require('electron')

//Enviar uma mensagem para estabelecer uma conexão com o banco de dados quando iniciar a aplicação
//send (enviar)
//db-conect (rotúlo para indentificar a mensagem)
ipcRenderer.send('db-connect')

//Permissões para estabelecer a comunicação entre processos
contextBridge.exposeInMainWorld('api', {
    dbstatus: (mensage) => ipcRenderer.on('db-status', mensage),
    aboutExit: () => ipcRenderer.send('about-exit'),
    createNote: (stickyNote) => ipcRenderer.send('create-note',stickyNote)
})

