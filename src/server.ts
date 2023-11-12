import mongoose from "mongoose";

let dbURI = "";
let uri = "";
let isLive = false;
let dbNameLocal = 'FINANCIAL_HEALTH_SCORE';
let dbNameLive = 'FINANCIAL_HEALTH_SCORE';
let dbUserNameLive = 'FINANCIAL_HEALTH_SCORE';
let dbPasswordLive = 'FINANCIAL_HEALTH_SCORE';

console.log("process.env.NODE_ENV", process.env.NODE_ENV);

const node_env = process.env.NODE_ENV || "development";

if (node_env === "development") {

  console.log("Running at Development State");

  //  console.log("\n ########### \n");
  console.log(
    "\x1b[42m%s\x1b[0m",
    "Application was Running at localDB. Any Change Can Be Done"
  );
  console.log("\n ########### \n");

  // Local Config
  dbURI = `mongodb://localhost:27017/${dbNameLocal}`;
  uri = "localhost://27017";

} else {

  isLive = true;

  // dbURI = `mongodb://user_mobipath:Mobipath#123@153.92.4.251:27010/${dbNameLive}`;
  dbURI = `mongodb+srv://${dbUserNameLive}:${dbPasswordLive}@cluster0.7vieyi4.mongodb.net/${dbNameLive}?retryWrites=true&w=majority`;
  // dbURI = `mongodb+srv://${dbUserNameLive}:mmhk$30313@cluster0.h3rvg.mongodb.net/${dbNameLive}?retryWrites=true&w=majority`;
  uri = "Prod-Connection-Mongodb-Cluod --- > mmhk.everexpert@gmail.com --- > https://bd-online-voting.herokuapp.com/api";

}

//database connection
async function bootstrap() {
  try {
    await mongoose.connect(dbURI);
    // color code by red

    console.log('\x1b[35m', `🛢 MongoDB connected successfully`);

    require("./app.ts");
  } catch (err) {
    console.log('\x1b[31m', `Failed to connect database`, err);
  }
}

bootstrap();
