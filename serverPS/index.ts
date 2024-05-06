import { sequelize } from "./src/db";
import server from "./src/server";
const PORT = 3001;

sequelize
  .sync({ force: true, logging: false })
  .then(() => {
    console.log("base de datos conectada! :D");
    server.listen(PORT, function () {
      console.log(`Server is listening on port ${PORT}!`);
    });
  })
  .catch((err) => console.error(err));