import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import 'bootstrap/dist/css/bootstrap.css'

// Stric Mode removido temporariamente pois estava fazendo 2 chamadas simultaneas e derrubando o servidor
ReactDOM.createRoot(document.getElementById('root')).render(
    <App />
)