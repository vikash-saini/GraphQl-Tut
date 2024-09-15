import { useQuery } from "@apollo/client";
import React from "react";
import { GET_USER } from "../gqlOperations/queries";

function Profile() {
  const { loading, error, data } = useQuery(GET_USER);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  return (
    <div className="w-6/12 m-auto">
      <div className="text-center flex justify-center">
        <img src="https://robohash.org/vikash.png" width="200px"></img>
      </div>
      <div>
        {data && data.myProfile && (
          <>
            <p>firstName :{data.myProfile.firstName}</p>
            <p>lastName :{data.myProfile.lastName}</p>
            <p>email :{data.myProfile.email}</p>
          </>
        )}
      </div>
    </div>
  );
}

export default Profile;
