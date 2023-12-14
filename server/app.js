const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// allow cross-origin requests
app.use(cors());

// connect to MongoDB database
// make sure to replace my db string & credentials with your own
mongoose.connect(
  "mongodb+srv://indra:test123@gql-ninja.zt0zdfe.mongodb.net/?retryWrites=true&w=majority"
);
mongoose.connection.once("open", () => {
  console.log("connected to database");
});

app.use("/graphql", graphqlHTTP({ schema, graphiql: true }));

app.listen(4000, () => console.log("now listening for requests on port 4000"));
