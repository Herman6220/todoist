import dotenv from "dotenv";
import connectDb from "./db";
import app from "./app";

const PORT = process.env.PORT || 8080;

dotenv.config({
  path: './env'
})


connectDb()
.then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`)
  })
})
.catch((err) => {
  console.log("Mongo DB connection Failed: ", err);
})