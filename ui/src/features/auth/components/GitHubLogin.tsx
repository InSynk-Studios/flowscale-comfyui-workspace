import React, { useEffect } from "react";

const GithubLogin: React.FC = () => {
  const CLIENT_ID = "Ov23lilmolEdeVbVy0M3";

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const codeParam = urlParams.get("code");
    console.log(codeParam);

    // if (codeParam && localStorage.getItem("accessToken") === null) {
    //   async function getAccessToken() {
    //     await fetch("http://localhost:5000/gerAccessToken" + codeParam, {
    //       method: "GET",
    //     })
    //       .then((response) => {
    //         return response.json();
    //       })
    //       .then((data) => {
    //         console.log(data);
    //         if (data.access_token) {
    //           localStorage.setItem("accessToken", data.access_token);
    //         }
    //       });
    //   }
    //   getAccessToken();
    // }
  }, []);

  // async function getUserData() {
  //   await fetch("http://localhost:5000/getUserData", {
  //     method: "GET",
  //     headers: {
  //       Authorization: "Bearer " + localStorage.getItem("accessToken"),
  //     },
  //   })
  //     .then((response) => {
  //       return response.json();
  //     })
  //     .then((data) => {
  //       console.log(data);
  //     });
  // }

  const handleLogin = () => {
    // window.location.href = 'http://localhost:5174/auth/github';
    window.location.assign(
      "https://github.com/login/oauth/authorize?client_id=" + CLIENT_ID
    );
  };

  return (
    <div>
      {localStorage.getItem("accessToken") ? (
        <p>We have access_token</p>
      ) : (
        <button onClick={handleLogin}>Login with GitHub</button>
      )}
    </div>
  );
};

export default GithubLogin;
