import { gql } from "apollo-server";
const typeDefs = gql`
type Query{
    greet:String
    users:[User]
    user(id:ID!):User
    quotes:[Quote]
    iquote(by:ID!):[Quote]
}

type User{
    id:ID!
    firstName:String
    lastName:String
    email:String
    quotes:[Quote]
}
type Quote{
    quote:String
    by:ID
}
type Mutation{
    SignUpUser(newuser:UserInput):User
}
input UserInput{
    firstName:String!
    lastName:String!
    email:String!
    password:String!
}
`;

export default typeDefs;