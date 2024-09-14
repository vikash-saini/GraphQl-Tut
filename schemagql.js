import { gql } from "apollo-server";
const typeDefs = gql`
type Query{
    greet:String
    users:[User]
    user(_id:ID!):User
    quotes:[Quote]
    iquote(by:ID!):[Quote]
}

type User{
    _id:ID!
    firstName:String
    lastName:String
    email:String
    quotes:[Quote]
}
type Quote{
    quote:String
    by:ID
}
type Token{
    token:String
}
type Mutation{
    SignUpUser(newuser:UserInput):User,
    loginInUser(loginUser:loginInput):Token
}
input UserInput{
    firstName:String!
    lastName:String!
    email:String!
    password:String!
}
input loginInput{
    email:String!,
    password:String!
}
`;

export default typeDefs;