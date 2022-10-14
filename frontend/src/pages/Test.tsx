import React, { Fragment, useState, useEffect } from 'react';
import axios from 'axios';

export const Test = () => {

  type User = {
    id?: number;
    name?: string;
  };

  const [user, setUser] = useState({} as User);

  useEffect(() => {
    const url = "http://10.11.10.4:3333/user/me";

    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          credentials: 'include',
          headers:{
            'Content-Type': 'application/json',
          }
      });
        const json = await response.json();
        console.log(json);
        setUser(json);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
}, []);

  function getId() {
    return user?.id;
  }

  return (
    <div style={{backgroundColor: 'white'}}>
      {getId()}
    </div>
  );
}