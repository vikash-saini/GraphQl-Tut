import { ApolloServer,gql } from "apollo-server";
import { ApolloServerPluginLandingPageGraphQLPlayground } from "apollo-server-core";
import { connectDB } from "./config.js";
import './model/usermodel.js';
import './model/quotemodel.js'

connectDB();

import typeDefs from "./schemaGql.js";
import resolvers from "./resolvers.js";
import jwt from "jsonwebtoken";
import { JSON_SECRET } from "./config.js";

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context:({req})=>{
        // console.log("req",req);
        const {authorization} = req.headers;
        if (authorization) {
            const {user} = jwt.verify(authorization,JSON_SECRET);
            if (!user) {
                throw new Error('UnAuthorised User');
            }
            return user;
        }
    },
    plugins:[ApolloServerPluginLandingPageGraphQLPlayground]
    
})

server.listen().then(({url})=>{
    console.log("server running at: ",url);
});