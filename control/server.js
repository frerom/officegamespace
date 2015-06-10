var liveServer = require("live-server");

var params = {
    port: 8181, // Set the server port. Defaults to 8080.
    root: "./dist", // Set root directory that's being server. Defaults to cwd.
};

liveServer.start(params);