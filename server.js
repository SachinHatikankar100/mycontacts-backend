const express = require("express");
const connectDb = require("./config/dbConnection");
const errorHandler = require("./middleware/errorHandler");
const dotenv = require("dotenv").config();
connectDb();
const app = express();
const PORT = process.env.PORT || 5000;

//middleware
app.use(express.json()); // This middleware has to be at the top because when we get error when we keep it below the routes middleware
app.use("/api/contacts", require("./routes/contactRoutes"));
//app.use(express.json()); //Reads the data received from the client because it has a parser inbuilt. Commented it bacause
//it gave error like Cannot destructure property 'name' of 'req.body' as it is undefined.
app.use("/api/users", require("./routes/userRoutes")); //this is used for the user authentication logic
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`The server is running at PORT: ${PORT}`);
});
