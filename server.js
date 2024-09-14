import { ApolloServer,gql } from "apollo-server";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { connectDB } from "./config.js";
import './model/usermodel.js';
import './model/quotemodel.js'
connectDB();


import typeDefs from "./schemaGql.js";
import resolvers from "./resolvers.js";

const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins:[ApolloServerPluginLandingPageGraphQLPlayground]
    
})

server.listen().then(({url})=>{
    console.log("server running at: ",url);
});