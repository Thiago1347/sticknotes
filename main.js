console.log("Electron - Processo principal")

// importação dos recursos do framework
// app (aplicação)
// BrowserWindow (criação da janela)
// nativeTheme (definir tema claro ou escuro)
// Menu (denifir um menu personalizado)
// shell (acessar links externos no navegador padrão)
const { app, BrowserWindow, nativeTheme, Menu, shell, ipcMain } = require('electron/main')


// Ativação do preload.js (importação do path)
const path = require('node:path')

//importação dos metodos conectar e desconectra (modulo de conexão)
const { conectar, desconectar } = require('./database.js')


//Janela principal
let win
const createWindow = () => {
  // definindo o tema claro ou escuroda janela claro ou escuro
  nativeTheme.themeSource = 'light'
  win = new BrowserWindow({
    width: 1010,
    height: 720,
    //frame: false,
    //resizable: false,
    //minimizable: false,
    //closable: false,
    //autoHideMenuBar: true,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // carregar o menu personalizado
  // Atenção! antes importar o recurso Menu
  Menu.setApplicationMenu(Menu.buildFromTemplate(template))
  // Carregar o documento html na janela
  win.loadFile('./src/views/index.html')
}

// janela sobre
function aboutWindow() {
  nativeTheme.themeSource = 'light'
  // obter a janela principal
  const mainWindow = BrowserWindow.getFocusedWindow()
  // validação ( se existir a janela principal)
  if (mainWindow) {

  }
  about = new BrowserWindow({
    width: 320,
    height: 280,
    autoHideMenuBar: true,
    resizable: false,
    minimizable: false,
    // estabelecer uma relação hieraequica entre janelas 
    parent: mainWindow,
    // criar uma janela modal (só retorna a principal quando encerrada)
    modal: true
  })
  about.loadFile('./src/views/sobre.html')

}

// inicialização da aplicação (assincronismo)
app.whenReady().then(() => {
  createWindow()

  // Melhor local para estabelecer a conexão com o banco de dados 
  // No mongoDB é mais eficiente manter uma única conexão aberta durante todo tempo de vida do aplicativo e encerrar a conexão quando o aplicativo dor finalizado 
  // ipcMain.on (receber Mensagem)
  // db-connect (rótulo de mensagem)
  ipcMain.on('db-connect', async (event) => {
// A linha abaixo estabelece a conexão com o banco de dados 
    await conectar()
  // Enviar ao renderizador uma mensagem para a imagem do icone do status do banco de dados (criar um delay de 0.5 ou 1s para sicronização com a nuvem)  
  setTimeout(() => {
    // enviar ao renderizador a mensagem "concetado"
    // db-status (IPC - comunicação entre processos - preload.js)
    event.reply('db-status',"conectado")
  },500) // 500ms = 0.5s
  })

  // só ativar a janela principal se nenhuma outra estiver ativa
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow()
    }
  })
})

// se o sistema não MAC encerrar a aplicação quando a janela for fechada
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

// IMPORTANTE !!!! Desconectar do banco de dados quando a aplicação for finalizada
app.on('before-quit', async () => {
  await desconectar()
})

//Reduzir a verbozidade de logs não criticas (devtools)
app.commandLine.appendSwitch('log-level', '3')

//template do menu
const template = [
  {
    label: 'Notas',
    submenu: [
      {
        label: 'Criar nota',
        accelerator: 'Ctrl+N',
      },
      {
        type: 'separator'
      },
      {
        label: 'Sair',
        accelerator: 'Alt+ F4',
        click: () => app.quit()
      }
    ]
  },
  {
    label: 'Ferramentas',
    submenu: [
      {
        label: 'Aplicar zoom',
        role: 'zoomIn'
      },
      {
        label: 'Reduzir zoom',
        role: 'zoomOut'
      },
      {
        label: 'Restaurar zoom padrão',
        role: 'resetZoom'
      },
      {
        type: 'separator'
      },
      {
        label: 'Recarregar',
        role: 'reload'
      },
      {
        label: 'DevTools',
        role: 'toggleDevTools'
      }
    ]
  },
  {
    label: 'Ajuda',
    submenu: [
      {
        label: 'Repositório',
        click: () => shell.openExternal('https://github.com/Thiago1347')
      },
      {
        label: 'Sobre',
        click: () => aboutWindow()
      }
    ]
  }
]
