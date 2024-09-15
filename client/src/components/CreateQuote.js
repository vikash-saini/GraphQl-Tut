import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CREATE_QUOTE } from "../gqlOperations/mutations";
import { GET_ALL_QUOTES } from "../gqlOperations/queries";

function CreateQuote() {
  const [writeQuote, { loading, error, data }] = useMutation(CREATE_QUOTE,{
    refetchQueries:['getAllquotes']
    
  });
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const hanldeLoginSubmit = (e) => {
    e.preventDefault();
    writeQuote({
      variables: {
        quote: formData.quote,
      },
    });
  };
  return (
    <div className="w-4/12 m-auto pt-4">
      {data && data.createQuote && (
        <div className="text-center green card-panel">
          {data.createQuote}
        </div>
      )}
      <h2 className="text-center font-bold">Write A Quote</h2>
      <form onSubmit={hanldeLoginSubmit}>
        <input
          type="text"
          placeholder="Write Your Quote"
          name="quote"
          onChange={handleChange}
        />
        <button
          className="btn waves-effect waves-light"
          type="submit"
          name="action"
        >
          Submit
        </button>
        <Link to="/signup">
          <p>Do not have an account?</p>
        </Link>
      </form>
    </div>
  );
}

export default CreateQuote;
