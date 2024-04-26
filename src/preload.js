// preload.js
const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld(
  'api', {
    executeQuery: async (query) => {
      try {
        const results = await ipcRenderer.invoke('execute-query', query);
        return results;
      } catch (error) {
        console.error('ExecuteQuery ERROR:', error);
      }
    },
    sqlQuery: async (query) => {
      try {
        const result = await ipcRenderer.invoke('execute-sql', query);
        return result;
      } catch (error) {
        console.error('ExecuteSQL ERROR:', error);
      }
    }
  }
);
