const Logger = require("../Logger");
const CodeErrorRouter = (err, req, res, next) => {
    Logger.LogError(`Request ${req.method} ${req.originalUrl} caused error: ${err.message}`);
    Logger.LogError(`Stacktrace: ${err.stack}`);
    res.status(500).send(JSON.stringify({
        "code": 500,
        "message": "internal code error."
    }));
    next(err);
}

module.exports = CodeErrorRouter;