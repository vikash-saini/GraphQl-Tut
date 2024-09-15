import { gql } from "apollo-server-core";

export const ADD_USER=gql`
    mutation addUser($UserNew:UserInput!){
  	user:SignUpUser(newuser:$UserNew){
    _id
    firstName
    lastName
  }
}
`;

export const LOGIN_USER = gql`
    mutation loginUser($user:loginInput!){
  	user:loginInUser(loginUser:$user){
    token
  }
}
`;

export const CREATE_QUOTE=gql`
    mutation addQuote($quote:String){
  	createQuote(quote:$quote)
}
`