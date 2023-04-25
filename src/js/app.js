import "bootstrap"

document.getElementById("year").innerHTML = new Date().getFullYear();

const org = "spothings";
const url = `https://api.github.com/orgs/${org}/repos`;

fetch(url)
  .then(response => response.json())
  .then(data => {
    const contributors = new Set();
    data.forEach(repo => {
      const repoUrl = repo.contributors_url;
      fetch(repoUrl)
        .then(response => response.json())
        .then(data => {
          data.forEach(contributor => {
            contributors.add(contributor.login);
          });
        })
        .finally(() => {
          const list = document.getElementById("contributors");
          let text = "";
          contributors.forEach(contributor => {
            text += `${contributor}, `;
          });
          text = text.slice(0, -2);
          list.textContent = text;
        });
    });
  });