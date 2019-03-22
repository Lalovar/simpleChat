# simpleChat
Made by [lalovar](https://github.com/Lalovar)


###### The project structure (important files):
    - server
        - server.js
        - package.json
    - webClient
        - public
            - index.html
        - src
            - App.js
            - ChatBox.jsx
            - index.js
        - package.json
        

###### Instalation guide
    - Enviroment
        - Node JS v10.13.0
        - npm v6.9.0

    - Usage
        - There's two folders, one for the server and one for the web client.
            - simpleChat/server
```
npm install
node server.js
```
            - simpleChat/webClient
```
npm install
npm start
```
            
            
###### Settings
    - In `simpleChat/server/server.js` change the port constant for your prefer localhost port:
```
const port = 8080
```
     - In `simpleChat/webClient/src/App.js` change the URL value to point your server:
```
URL = "yourURL.com";
    ```
    
