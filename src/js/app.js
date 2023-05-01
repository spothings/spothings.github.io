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

// Change Language
const defaultLanguage = 'en'; // set default language
let currentLanguage = defaultLanguage;

function switchLanguage(language) {
  // load new language file and update text content
  fetch(`/src/lang/${language}.json`)
    .then(response => response.json())
    .then(data => {
      const elements = document.querySelectorAll('[data-i18n]');
      elements.forEach(element => {
        const key = element.dataset.i18n;
        element.textContent = data[key];
      });
    })
    .catch(error => console.error(error));
}

document.getElementById('en').addEventListener('click', () => {
  if (currentLanguage !== 'en') {
    currentLanguage = 'en';
    switchLanguage(currentLanguage);
  }
});

document.getElementById('id').addEventListener('click', () => {
  if (currentLanguage !== 'id') {
    currentLanguage = 'id';
    switchLanguage(currentLanguage);
  }
});

// load default language
switchLanguage(defaultLanguage);
