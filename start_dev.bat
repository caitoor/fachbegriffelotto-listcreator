@echo off

:: Change to the node server directory and start the server
pushd listcreator_nodeproxy
start cmd /k "npm install && node server.js"
popd

:: Change to the Vue app directory
pushd listcreator_vue
    start cmd /k "npm install && npm run serve"
    :: Open the development server in the browser
    start http://localhost:8080
popd
