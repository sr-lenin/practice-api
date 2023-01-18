// tare
// lgiar los nombres de los repositorios en github
// fetch('https://api.github.com/users/sr-lenin').then((response) => response.json() ).then((response) => console.log(response))

import fetch from "node-fetch";
 

const defaultUserName = 'sr-lenin'
const inputUsername = process.argv[2]


const getRepos = (username = defaultUserName) => {
  fetch(`https://api.github.com/users/${username}/repos`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      // Authorization: 'token'
    },
    // body: "fged", GET no puede tener body
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`request failed with status ${response.status}`);
      }
      return response.json();
    })
    .then((repos) =>
      repos.map((repo) => {
        return { name: repo.name };
      })
    )
    .then((modifiedRepos) => {
      console.log(`Github Repositories of ${username}`);
      console.table(modifiedRepos);
    });
};

getRepos(inputUsername);    
