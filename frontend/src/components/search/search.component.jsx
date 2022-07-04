import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Search = () => {
  const [keyword, setKeyword] = useState("");
  const navigate = useNavigate();

  const submitHandler = (event) => {
    event.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
    } else {
      navigate(`/`);
    }
  };

  return (
    <Form onSubmit={submitHandler} className="d-flex">
      <Form.Control
        type="text"
        name="q"
        onChange={(event) => setKeyword(event.target.value)}
        placeholder="Find your product..."
        className="mr-sm-2 ml-sm-5"
      ></Form.Control>
      <Button type="submit" className="p-2">
        search
      </Button>
    </Form>
  );
};

export default Search;
