require("dotenv").config();   //config .env file
const express = require("express");
const Logger = require("./Logger");
const crypto = require("crypto");
const http = require("http");

// init express config
const expressPort = process.env.BACKENDPORT || 3000;
const hostname = process.env.DOMAIN || "localhost";
const frontPort = process.env.FRONTPORT || 80;
if(hostname == "localhost"){
    process.env.LOCALDEV = true;
}

// init jwt token
const JwtToken = crypto.randomBytes(64).toString('hex');
process.env.JETTOKEN = JwtToken;
Logger.LogInfo("JwtToken: " + JwtToken);

// init express app
const app = express();
app.use(require("./middleware/SecurityHeader"));
app.use(require("./middleware/Logger"));
app.use(require("body-parser").urlencoded({ extended: true }));
app.use(express.json());

const server = http.createServer(app).listen(expressPort,()=>{
    if(process.env.LOCALDEV){
        Logger.LogInfo(`Starting server_DEV on port ${expressPort}`);
    }else{
        Logger.LogInfo(`Starting server_PROD on port ${expressPort}`);
    }
});
