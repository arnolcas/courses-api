require("dotenv").config();

import postgres from "./services/postgres/data-source";
import server from "./services/express/server";

(async function () {
    await postgres.initialize();
    server.listen(process.env.PORT, () => {
        console.log("Server is running");
    });
})();
