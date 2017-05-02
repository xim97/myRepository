/* eslint-disable no-undef */
/* eslint-disable no-shadow */
/* eslint-disable no-use-before-define */
/* eslint-disable no-param-reassign */
/* eslint-disable max-len */
/* eslint-disable no-unused-vars */
/* eslint-disable no-alert */
/* eslint-disable func-names */
/* eslint-disable prefer-const */
/* eslint-disable no-console */
/* eslint-disable no-useless-concat */

let user = '1';
const httpRequests = (function () {
    function httpGet(url) {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();

            function loadHandler() {
                if (this.status >= 200 && this.status < 300) {
                    resolve(this.responseText);
                } else {
                    reject({
                        status: this.status,
                        statusText: xhr.statusText,
                    });
                }
                cleanUp();
            }

            function cleanUp() {
                xhr.removeEventListener('load', loadHandler);
            }

            xhr.addEventListener('load', loadHandler);
            xhr.open('GET', url);
            xhr.send();
        });
    }

    function httpDeleteArticle(id) {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            let article = articlesService.getArticle(id);
            if (confirm(`Удалить новость: ${article.title}?`)) {
                xhr.open('DELETE', '/article');
                xhr.setRequestHeader('content-type', 'application/json');
                xhr.send(JSON.stringify({
                    id,
                }));
                xhr.onload = function () {
                    if (this.status >= 200 && this.status < 300) {
                        resolve(this.responseText);
                    } else {
                        reject({
                            status: this.status,
                            statusText: xhr.statusText,
                        });
                    }
                };
            }
        });
    }

    function httpPostArticle(article) {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('POST', '/article');
            xhr.setRequestHeader('content-type', 'application/json');
            xhr.send(JSON.stringify(article));
            xhr.onload = function () {
                if (this.status >= 200 && this.status < 300) {
                    resolve(this.responseText);
                } else {
                    reject({
                        status: this.status,
                        statusText: xhr.statusText,
                    });
                }
            };
        });
    }

    function httpPostTag(tag) {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('POST', '/tag');
            xhr.setRequestHeader('content-type', 'application/json');
            xhr.send(JSON.stringify({
                tag,
            }));
            xhr.onload = function () {
                if (this.status >= 200 && this.status < 300) {
                    resolve(this.responseText);
                } else {
                    reject({
                        status: this.status,
                        statusText: xhr.statusText,
                    });
                }
            };
        });
    }

    function httpPutArticle(article) {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('PUT', '/article');
            xhr.setRequestHeader('content-type', 'application/json');
            xhr.send(JSON.stringify(article));
            xhr.onload = function () {
                if (this.status >= 200 && this.status < 300) {
                    resolve(this.responseText);
                } else {
                    reject({
                        status: this.status,
                        statusText: xhr.statusText,
                    });
                }
            };
        });
    }

    return {
        httpGet,
        httpDeleteArticle,
        httpPostArticle,
        httpPostTag,
        httpPutArticle,
    };
}());

const articlesModel = (function () {
  let articles;
  let tags;
  loadArticlesTags();
  function loadArticlesTags() {
      Promise.all([httpRequests.httpGet('/article'), httpRequests.httpGet('/tags')]).then(values => {
          articles = JSON.parse(values[0], (key, value) => {
              if (key === 'createdAt') {
                  return new Date(value);
              }
              return value;
          });
          tags = JSON.parse(values[1]);
      });
  }


  function getArticles(skip, top, filterConfig) {
    if (!Number.isFinite(skip)) {
      skip = 0;
    }
    if (!Number.isFinite(top)) {
      top = 10;
    }
    return articles.filter((currentArticle) => {
      let result = true;
      if (currentArticle.isHidden === true) {
        result = false;
      }
      if (filterConfig !== undefined) {
        if (filterConfig.author !== undefined) {
          result = (currentArticle.author === filterConfig.author);
        }
        if (filterConfig.dateFrom !== undefined) {
          result = result && currentArticle.createdAt.getTime() >= (filterConfig.dateFrom).getTime();
        }
        if (filterConfig.dateTo !== undefined) {
          result = result && currentArticle.createdAt.getTime() <= (filterConfig.dateTo).getTime();
        }
        if (filterConfig.tags !== undefined && filterConfig.tags.length !== 0) {
          result = result && filterConfig.tags.every(currentTag => currentArticle.tags.indexOf(currentTag) >= 0);
        }
      }
      return result;
    }).sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()).slice(skip, skip + top);
  }

  function getArticle(findId) {
    return articles.find(currentArticle => currentArticle.id === findId);
  }

  function validateArticle(article) {
    if (article !== undefined) {
      if (article.title !== undefined && (article.title.length > 100 || article.title.length === 0)) {
        return false;
      } else if (article.tags !== undefined && (article.tags.length === 0 || article.tags.length > 5)) {
        return false;
      } else if (article.summary !== undefined && (article.summary.length === 0 || article.summary.length > 200)) {
        return false;
      } else if (article.tags !== undefined && article.tags.length > 0 && !article.tags.every((currentTag) => {
        if (tags.indexOf(currentTag) >= 0 && currentTag.length < 20) {
          return true;
        }
        return false;
      })) {
        return false;
      }
      return true;
    }
    return false;
  }

  function editArticle(editId, newArticle) {
    console.log(newArticle);
    console.log(editId);
    if (!validateArticle(newArticle) || editId === -1) {
      return false;
    }
    articles[editId].title = newArticle.title;
    articles[editId].summary = newArticle.summary;
    articles[editId].tags = newArticle.tags;
    articles[editId].content = newArticle.content;
    localStorage.setItem('articles', JSON.stringify(articles));
    return true;
  }

  function addArticle(newArticle) {
    const previousSize = articles.length;
    if (!validateArticle(newArticle)) {
      return false;
    } else if (previousSize !== articles.push(newArticle)) {
      localStorage.setItem('articles', JSON.stringify(articles));
      return true;
    }
    return false;
  }

  function removeArticle(removeId) {
    const removeIndex = articles.indexOf(getArticle(removeId));
    if (removeIndex !== -1) {
      articles.splice(removeIndex, 1);
      localStorage.setItem('articles', JSON.stringify(articles));
      return true;
    }
    return false;
  }

  function addTag(newTag) {
    const previousSize = tags.length;
    if (newTag !== undefined) {
      if (previousSize === tags.push(newTag)) {
        localStorage.setItem('tags', JSON.stringify(tags));
        return true;
      }
      return false;
    }
    return false;
  }

  function removeTag(removeTag) {
    const removeIndex = tags.indexOf(removeTag);
    if (removeIndex !== -1) {
      tags.splice(removeIndex, 1);
      localStorage.setItem('tags', JSON.stringify(tags));
      return true;
    }
    return false;
  }

  function getArticlesLength() {
    return articles.length;
  }

  function getTagsLength() {
    return tags.length;
  }

  function hideArticle(id) {
    const xhr = new XMLHttpRequest();
    let article;
    xhr.open('DELETE', '/article');
    xhr.setRequestHeader('content-type', 'application/json');
    xhr.send(JSON.stringify({
      id,
    }));
    article = getArticle(id);
    if (article !== undefined) {
      article.isHidden = true;
    }
  }

  function sendNewArticle(article) {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/article');
    xhr.setRequestHeader('content-type', 'application/json');
    xhr.send(JSON.stringify(article));
  }

  function sendChangedArticle(article) {
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', '/article');
    xhr.setRequestHeader('content-type', 'application/json');
    xhr.send(JSON.stringify(article));
  }

  return {
    getArticlesLength,
    getTagsLength,
    getArticles,
    getArticle,
    validateArticle,
    addArticle,
    removeArticle,
    editArticle,
    addTag,
    removeTag,
  };
}()
);

const articlesRenderer = (function () {
  let USER_NAME;
  let HEADER_ACTIONS;
  let ARTICLE_TEMPLATE;
  let ARTICLE_LIST;
  let TAG_TEMPLATE;
  let TAG_LIST;

  function init() {
    USER_NAME = document.querySelector('.user-name');
    HEADER_ACTIONS = document.querySelector('.header-actions');
    ARTICLE_TEMPLATE = document.querySelector('#template-article');
    ARTICLE_LIST = document.querySelector('.article-list');
    TAG_TEMPLATE = document.querySelector('#template-tag');
    TAG_LIST = ARTICLE_TEMPLATE.content.querySelector('.tag-list');
  }

  function insertArticlesInDOM(articles) {
    renderArticles(articles).forEach((article) => {
      ARTICLE_LIST.appendChild(article);
    });
  }

  function insertNewsInDOM(article) {
    ARTICLE_LIST.appendChild(renderNews(article));
  }

  function renderArticles(articles) {
    return articles.map((article) => {
      renderArticleTemplate(article);
      return renderArticle(article);
    });
  }

  function renderNews(article) {
    renderNewsTemplate(article);
    return renderArticle(article);
  }

  function renderArticleTemplate(article) {
    ARTICLE_TEMPLATE.content.querySelector('.article').dataset.id = article.id;
    ARTICLE_TEMPLATE.content.querySelector('.title').textContent = article.title;
    ARTICLE_TEMPLATE.content.querySelector('.author').textContent = article.author;
    ARTICLE_TEMPLATE.content.querySelector('.date').textContent = dateToString(article.createdAt);
    ARTICLE_TEMPLATE.content.querySelector('.text').textContent = article.summary;
    TAG_LIST.innerHTML = '';
    article.tags.forEach((tag) => {
      TAG_TEMPLATE.content.querySelector('.tag').textContent = tag;
      TAG_LIST.appendChild(TAG_TEMPLATE.content.querySelector('.tag').cloneNode(true));
    });
  }

  function renderNewsTemplate(article) {
    ARTICLE_TEMPLATE.content.querySelector('.article').dataset.id = article.id;
    ARTICLE_TEMPLATE.content.querySelector('.title').textContent = article.title;
    ARTICLE_TEMPLATE.content.querySelector('.author').textContent = article.author;
    ARTICLE_TEMPLATE.content.querySelector('.date').textContent = dateToString(article.createdAt);
    ARTICLE_TEMPLATE.content.querySelector('.text').textContent = article.content;
    TAG_LIST.innerHTML = '';
    article.tags.forEach((tag) => {
      TAG_TEMPLATE.content.querySelector('.tag').textContent = tag;
      TAG_LIST.appendChild(TAG_TEMPLATE.content.querySelector('.tag').cloneNode(true));
    });
  }

  function renderArticle(article) {
    const ARTICLE_ACTIONS = ARTICLE_TEMPLATE.content.querySelector('.article-actions');
    const VIEW_BUTTON = document.querySelector('#template-view-button');
    const EDIT_BUTTON = document.querySelector('#template-edit-button');
    const DELETE_BUTTON = document.querySelector('#template-delete-button');
    ARTICLE_ACTIONS.innerHTML = '';
    ARTICLE_ACTIONS.appendChild(VIEW_BUTTON.content.querySelector('.view-button').cloneNode(true));
    if (user !== null) {
      ARTICLE_ACTIONS.appendChild(EDIT_BUTTON.content.querySelector('.edit-button').cloneNode(true));
      ARTICLE_ACTIONS.appendChild(DELETE_BUTTON.content.querySelector('.delete-button').cloneNode(true));
    }
    return ARTICLE_TEMPLATE.content.querySelector('.article').cloneNode(true);
  }

  function renderHeaderAddButton() {
    const ADD_ARTICLE_TEMPLATE = document.querySelector('#template-add-article');
    const ADD_ARTICLE_HOLDER = document.querySelector('.add-article-holder');
    if (user !== null) {
      ADD_ARTICLE_HOLDER.appendChild(ADD_ARTICLE_TEMPLATE.content.querySelector('.add-article-button').cloneNode(true));
      USER_NAME.textContent = user;
      HEADER_ACTIONS.querySelector('.login-logout-button').textContent = 'Выйти';
    } else {
      USER_NAME.textContent = 'Гость';
      HEADER_ACTIONS.querySelector('.login-logout-button').textContent = 'Войти';
    }
  }

  function dateToString(date) {
    let resultString = `${date.getDate()}.`;
    if ((date.getMonth() + 1) < 10) {
      resultString = `${resultString}0${date.getMonth() + 1}`;
    } else {
      resultString += (date.getMonth() + 1);
    }
    resultString = `${resultString}.${date.getFullYear()} `;
    if (date.getHours() < 10) {
      resultString = `${resultString}0${date.getHours()}`;
    } else {
      resultString += date.getHours();
    }
    if (date.getMinutes() < 10) {
      resultString = `${resultString}:0${date.getMinutes()}`;
    } else {
      resultString = `${resultString}:${date.getMinutes()}`;
    }
    return resultString;
  }

  function removeArticlesFromDom() {
    ARTICLE_LIST.innerHTML = '';
  }

  return {
    dateToString,
    insertArticlesInDOM,
    removeArticlesFromDom,
    renderHeaderAddButton,
    init,
    insertNewsInDOM,
  };
}());

document.addEventListener('FeedLoader', startApp());

function startApp() {
  articlesRenderer.init();
  articlesRenderer.renderHeaderAddButton();
  renderArticles();
  renderPaginator();
}

function renderPaginator() {
  const paginator = document.querySelector('#template-paginator');
  const paginatorHolder = document.querySelector('.paginator-holder');
  paginatorHolder.appendChild(paginator.content.querySelector('.paginator').cloneNode(true));
}
function removePaginator() {
  document.querySelector('.paginator-holder').innerHTML = '';
}
function renderMainPageButton() {
  const mainPageButton = document.querySelector('#template-main-page-button');
  const mainPageButtonHolder = document.querySelector('.main-page-button-holder');
  mainPageButtonHolder.appendChild(mainPageButton.content.querySelector('.main-page').cloneNode(true));
}
function removeMainPageButton() {
  document.querySelector('.main-page-button-holder').innerHTML = '';
}

function renderArticles(from, to) {
  articlesRenderer.removeArticlesFromDom();
  articlesRenderer.insertArticlesInDOM(articlesModel.getArticles());
}

function addArticle(article) {
  articlesModel.addArticle(article);
  renderArticles();
}

function removeArticle(id) {
  articlesModel.removeArticle(id);
  renderArticles();
}

function editArticle(id, article) {
  articlesModel.editArticle(id, article);
}

const viewButton = document.querySelectorAll('.view-button');
function handleViewButtonClick(event) {
  const newsId = event.target.parentElement.parentElement.dataset.id;
  const filter = document.querySelector('.filters');
  filter.style.display = 'none';
  removePaginator();
  renderMainPageButton();
  articlesRenderer.removeArticlesFromDom();
  articlesRenderer.insertNewsInDOM(articlesModel.getArticle(newsId));
}
[].forEach.call(viewButton, (btn) => {
  btn.addEventListener('click', handleViewButtonClick);
});

const loginLogoutButton = document.querySelectorAll('.login-logout-button');
function handleLoginLogoutButton() {
  if (user !== null) {
    user = null;
    articlesRenderer.renderHeaderAddButton();
    renderArticles();
  } else {
    const filter = document.querySelector('.filters');
    filter.style.display = 'none';
    articlesRenderer.removeArticlesFromDom();
    removePaginator();
    const LOGIN_TEMPLATE = document.querySelector('#template-login');
    const LOGIN_HOLDER = document.querySelector('.login-holder');
    LOGIN_HOLDER.appendChild(LOGIN_TEMPLATE.content.querySelector('.login-page-fields').cloneNode(true));
    renderMainPageButton();
    const authButton = document.querySelectorAll('.login-button');
    [].forEach.call(authButton, (btn) => {
      btn.addEventListener('click', handleAuthButton);
    });
  }
}
[].forEach.call(loginLogoutButton, (btn) => {
  btn.addEventListener('click', handleLoginLogoutButton);
});


function handleAuthButton() {
  const loginInput = document.getElementsByName('login-input')[0];
  const passwordInput = document.getElementsByName('password-input')[0];
  if (validateUser(loginInput.value, passwordInput.value) === true) {
    user = loginInput.value;
    const filter = document.querySelector('.filters');
    document.querySelector('.login-holder').removeChild(document.querySelector('.login-page-fields'));
    startApp();
    filter.style.display = 'inline';
    renderMainPageButton();
  } else {
    alert('Неверно введён логин или пароль');
  }
}
function validateUser(login, password) {
  return (login === '1' || (login === 'admin' && password === 'admin'));
}


const filterButton = document.querySelectorAll('.confirm-filter');
function handleFilterButtonClick(event) {
  let tempArticles;
  switch (event.target.parentNode.className) {
    case 'author-filter': {
      const authorInput = document.getElementsByName('author-input')[0];
      tempArticles = articlesModel.getArticles(0, 10, { author: authorInput.value.toString() });
      break;
    }
    case 'date-filter': {
      const dateFromInput = document.getElementsByName('date-from')[0];
      const dateToInput = document.getElementsByName('date-to')[0];
      tempArticles = articlesModel.getArticles(0, 10, {
        dateFrom: new Date(dateFromInput.value),
        dateTo: new Date(dateToInput.value),
      });
      break;
    }
    case 'tags-filter': {
      const tagsInput = document.getElementsByName('tags-input')[0];
      const tempTags = tagsInput.value.split(',');
      tempTags.forEach((curTag) => {
        curTag.trim();
      });
      tempArticles = articlesModel.getArticles(0, 10, articlesModel.getTagsLength(), { tags: [tempTags.toString()] });
      break;
    }
    default: {
      break;
    }
  }
  if (tempArticles.length > 0) {
    articlesRenderer.removeArticlesFromDom();
    articlesRenderer.insertArticlesInDOM(tempArticles);
  } else {
    alert('Нет ни одного автора с таким ником');
  }
}
[].forEach.call(filterButton, (btn) => {
  btn.addEventListener('click', handleFilterButtonClick);
});

const resetButton = document.querySelectorAll('.reset-button');
function handleResetButtonClick() {
  const authorInput = document.getElementsByName('author-input')[0];
  const tagsInput = document.getElementsByName('tags-input')[0];
  authorInput.value = '';
  tagsInput.value = '';
  articlesRenderer.removeArticlesFromDom();
  articlesRenderer.insertArticlesInDOM(articlesModel.getArticles());
}
[].forEach.call(resetButton, (btn) => {
  btn.addEventListener('click', handleResetButtonClick);
});


let acceptButton;
const editButton = document.querySelectorAll('.edit-button');
function handleEditButtonClick(event) {
  const EDIT_TEMPLATE = document.querySelector('#template-edit-article');
  const EDIT_HOLDER = document.querySelector('.article-edit-holder');
  articlesRenderer.removeArticlesFromDom();
  const filter = document.querySelector('.filters');
  renderMainPageButton();
  removePaginator();
  filter.style.display = 'none';
  const tempArticle = articlesModel.getArticle(event.target.parentElement.parentElement.dataset.id);
  EDIT_TEMPLATE.content.querySelector('.article').dataset.id = tempArticle.id;
  EDIT_TEMPLATE.content.querySelector('.input-title').value = tempArticle.title;
  EDIT_TEMPLATE.content.querySelector('.author').textContent = tempArticle.author;
  EDIT_TEMPLATE.content.querySelector('.date').textContent =
        articlesRenderer.dateToString(tempArticle.createdAt);
  EDIT_TEMPLATE.content.querySelector('.input-summary').value = tempArticle.summary;
  EDIT_TEMPLATE.content.querySelector('.input-content').value = tempArticle.content;
  if (tempArticle.tags[0] !== undefined) {
    EDIT_TEMPLATE.content.querySelector('.input-tag1').value = tempArticle.tags[0];
  }
  if (tempArticle.tags[1] !== undefined) {
    EDIT_TEMPLATE.content.querySelector('.input-tag2').value = tempArticle.tags[1];
  }
  if (tempArticle.tags[2] !== undefined) {
    EDIT_TEMPLATE.content.querySelector('.input-tag3').value = tempArticle.tags[2];
  }
  if (tempArticle.tags[3] !== undefined) {
    EDIT_TEMPLATE.content.querySelector('.input-tag4').value = tempArticle.tags[3];
  }
  if (tempArticle.tags[4] !== undefined) {
    EDIT_TEMPLATE.content.querySelector('.input-tag5').value = tempArticle.tags[4];
  }
  EDIT_TEMPLATE.content.querySelector('.accept-button').style.display = 'inline';
  EDIT_HOLDER.appendChild(EDIT_TEMPLATE.content.querySelector('.article').cloneNode(true));
  acceptButton = document.querySelector('.accept-button');
  acceptButton.addEventListener('click', handleAcceptButtonClick);
}
[].forEach.call(editButton, (btn) => {
  btn.addEventListener('click', handleEditButtonClick);
});

function handleAcceptButtonClick(event) {
  let tag1;
  let tag2;
  let tag3;
  let tag4;
  let tag5;
  let tags = [];
  const articleId = event.target.parentElement.dataset.id;
  const EDIT_TEMPLATE = document.querySelector('#template-edit-article');
  const title = document.querySelector('.input-title').value;
  const summary = document.querySelector('.input-summary').value;
  const content = document.querySelector('.input-content').value;
  if (document.querySelector('.input-tag1').value !== null) {
    tag1 = document.querySelector('.input-tag1').value;
    tags.push(tag1);
  }
  if (document.querySelector('.input-tag2').value !== null) {
    tag2 = document.querySelector('.input-tag2').value;
    tags.push(tag2);
  }
  if (document.querySelector('.input-tag3').value !== null) {
    tag3 = document.querySelector('.input-tag3').value;
    tags.push(tag3);
  }
  if (document.querySelector('.input-tag4').value !== null) {
    tag4 = document.querySelector('.input-tag4').value;
    tags.push(tag4);
  }
  if (document.querySelector('.input-tag5').value !== null) {
    tag5 = document.querySelector('.input-tag5').value;
    tags.push(tag5);
  }
  console.log(title, summary);
  if (editArticle(articleId, {
    title,
    summary,
    content,
    tags,
  }) === false) {
    alert('Введённая статья не является валидной');
  }
  document.querySelector('.article-edit-holder').removeChild(document.querySelector('.article'));
  document.querySelector('.main-page-button-holder').removeChild(document.querySelector('.main-page'));
  renderArticles();
  document.querySelector('.filters').style.display = 'inline';
  renderPaginator();
}

const addButton = document.querySelectorAll('.add-article-button');

function handleAddButtonClick() {
  const EDIT_TEMPLATE = document.querySelector('#template-edit-article');
  const EDIT_HOLDER = document.querySelector('.article-edit-holder');
  articlesRenderer.removeArticlesFromDom();
  const filter = document.querySelector('.filters');
  renderMainPageButton();
  removePaginator();
  filter.style.display = 'none';
  EDIT_TEMPLATE.content.querySelector('.article').dataset.id = '';
  EDIT_TEMPLATE.content.querySelector('.input-title').value = '';
  EDIT_TEMPLATE.content.querySelector('.author').textContent = '';
  EDIT_TEMPLATE.content.querySelector('.date').textContent = '';
  EDIT_TEMPLATE.content.querySelector('.input-summary').value = '';
  EDIT_TEMPLATE.content.querySelector('.input-content').value = '';
  EDIT_TEMPLATE.content.querySelector('.input-tag1').value = '';
  EDIT_TEMPLATE.content.querySelector('.input-tag2').value = '';
  EDIT_TEMPLATE.content.querySelector('.input-tag3').value = '';
  EDIT_TEMPLATE.content.querySelector('.input-tag4').value = '';
  EDIT_TEMPLATE.content.querySelector('.input-tag5').value = '';
    /* EDIT_TEMPLATE.content.querySelector('.accept-button').style.display = 'inline';*/
  EDIT_HOLDER.appendChild(EDIT_TEMPLATE.content.querySelector('.article').cloneNode(true));
  const acceptAddButton = document.querySelector('.accept-add-button');
  acceptAddButton.addEventListener('click', handleAcceptAddButtonClick);
}
[].forEach.call(addButton, (btn) => {
  btn.addEventListener('click', handleAddButtonClick);
});

function handleAcceptAddButtonClick() {
  const EDIT_TEMPLATE = document.querySelector('#template-create-article');
  const title = EDIT_TEMPLATE.content.querySelector('.input-title').value;
  const summary = EDIT_TEMPLATE.content.querySelector('.input-summary').value;
  const content = EDIT_TEMPLATE.content.querySelector('.input-content').value;
  const tags = [];
  if (EDIT_TEMPLATE.content.querySelector('.input-tag1').value !== null) {
    tags[0] = EDIT_TEMPLATE.content.querySelector('.input-tag1').value;
  }
  if (EDIT_TEMPLATE.content.querySelector('.input-tag2').value !== null) {
    tags[1] = EDIT_TEMPLATE.content.querySelector('.input-tag2').value;
  }
  if (EDIT_TEMPLATE.content.querySelector('.input-tag3').value !== null) {
    tags[2] = EDIT_TEMPLATE.content.querySelector('.input-tag3').value;
  }
  if (EDIT_TEMPLATE.content.querySelector('.input-tag4').value !== undefined) {
    tags[3] = EDIT_TEMPLATE.content.querySelector('.input-tag4').value;
  }
  if (EDIT_TEMPLATE.content.querySelector('.input-tag5').value !== undefined) {
    tags[4] = EDIT_TEMPLATE.content.querySelector('.input-tag5').value;
  }
  if (articlesModel.validateArticle({
    title,
    author: user,
    createdAt: new Date(),
    summary,
    content,
    tags,
  }) === true) {
        addArticle({ title, author: user, createdAt: new Date(), summary, content, tags });
  }
}

const mainPageButton = document.querySelectorAll('.main-page-button');
function handleMainPageButtonClick() {
  renderArticles();
}

[].forEach.call(mainPageButton, (btn) => {
  btn.addEventListener('click', handleMainPageButtonClick);
});

const deleteButton = document.querySelectorAll('.delete-button');
function handleDeleteButtonClick(event) {
  const articleId = event.target.parentElement.parentElement.dataset.id;
  console.log(articleId);
  let confirmDelete = confirm(`${'Удалить статью:' + ' '}${articlesModel.getArticle(articleId).title} ?`);
  if (confirmDelete === true) {
    const xhr = new XMLHttpRequest();
    xhr.open('DELETE', '/article');
    xhr.setRequestHeader('content-type', 'application/json');
    xhr.send(JSON.stringify({
      articleId,
    }));
    articlesModel.loadNews();
    renderArticles();
  }
}
[].forEach.call(deleteButton, (btn) => {
  btn.addEventListener('click', handleDeleteButtonClick);
});
