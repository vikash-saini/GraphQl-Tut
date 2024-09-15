import { useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { GET_ALL_QUOTES } from "../gqlOperations/queries";
import { useNavigate } from 'react-router-dom';

function Home() {
    
  const { loading, error, data } = useQuery(GET_ALL_QUOTES);
  let navigate = useNavigate();

  const token = localStorage.getItem('token');

if (!token) {
  console.log("here");
  
  navigate("/login");
}

  // direct api call without Apollo client
  //   useEffect(() => {
  //     fetch("http://localhost:4000/", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         query: `query getQuotesByUserId($userId:ID!){
  //                 iquote(by:$userId){
  //                     quote
  //                     by
  //                 }
  //                 }`,
  //         variables: { userId: "66e5aca6d5c5e607cf371555" },
  //       }),
  //     })
  //       .then((res) => res.json())
  //       .then((data) => {
  //         console.log(data);
  //       });
  //   }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <div className="w-6/12 m-auto">
      <h2>Welcome</h2>
      <p>All Quotes By User</p>
      <div>
        <ul>
          {data &&
            data.quotes.map(({ quote, by }) => {
              return (
                <li>
                  <p>{quote}</p>
                  <p>by: ~ {by.firstName}</p>
                </li>
              );
            })}
        </ul>
      </div>
    </div>
  );
}

export default Home;
