@echo off

:: Change to the node server directory and start the server
pushd listcreator_nodeproxy
start cmd /k "node server.js"
popd

:: Change to the Vue app directory
pushd listcreator_vue
    :: Assuming 'npm run build' has already been executed
    start cmd /k "serve -s dist -l 8080"
    :: Open the production server in the browser
    start http://localhost:8080
popd
