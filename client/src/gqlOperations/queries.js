import { gql } from "apollo-server-core";

export const GET_ALL_QUOTES =gql`query getAllquotes{
  quotes{
    quote
    by{
      _id
      firstName
    }
  }
}`

export const GET_USER=gql`
    query getUser{
  	myProfile{
      firstName
      lastName
      email
    }
}`