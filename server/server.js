const express = require('express');
const path = require('path');
const db = require('./config/connection');
// const routes = require('./routes'); won't need?

// import ApolloServer class
const { ApolloServer } = require('apollo-server-express');

// import graphQL schema
const { typeDefs, resolvers } = require ('./schemas');
// import authMiddleware
const { authMiddleware } = require('./utils/auth');
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware
});

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// if we're in production, serve client/build as static assets
if (process.env.NODE_ENV === 'production') { 
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('/', (req, res) => { // fix heroku deployment GET path ="/" error
  res.sendFile(path.join(__dirname, '../client/'));
})

// app.use(routes); won't need?

// Create a new instance of an Apollo server with the GraphQL schema
const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  server.applyMiddleware({ app });
  
  db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port: ${PORT}`); 
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  });
})};

startApolloServer(typeDefs, resolvers);