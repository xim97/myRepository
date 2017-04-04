'use strict';
let user = '1';

let articlesModel = (function () {
        let articles;
        let tags;
        loadArticles();
        loadTags();

        function getArticles(skip, top, filterConfig) {
            if (!Number.isFinite(skip)) {
                skip = 0;
            }
            if (!Number.isFinite(top)) {
                top = 10;
            }
            return articles.filter(function (currentArticle) {
                let result = true;

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
                        result = result && filterConfig.tags.every(function (currentTag) {
                                return currentArticle.tags.indexOf(currentTag) >= 0;
                            });
                    }
                }
                return result;
            }).sort(function (a, b) {
                return b.createdAt.getTime() - a.createdAt.getTime();
            }).slice(skip, skip + top);
        }

        function getArticle(findId) {
            return articles.find(function (currentArticle) {
                return currentArticle.id === findId;
            });
        }

        function validateArticle(article) {
            if (article !== undefined) {
                if (article.title !== undefined && (article.title.length > 100 || article.title.length === 0)) {
                    return false;
                } else if (article.tags !== undefined && (article.tags.length === 0 || article.tags.length > 5)) {
                    return false;
                } else if (article.summary !== undefined && (article.summary.length === 0 || article.summary.length > 200)) {
                    return false;
                } else if (article.tags !== undefined && article.tags.length > 0 && !article.tags.every(function (currentTag) {
                        if (tags.indexOf(currentTag) >= 0 && currentTag.length < 20) {
                            return true;
                        } else {
                            return false;
                        }
                    })) {
                    return false;
                } else {
                    return true;
                }
            } else {
                return false;
            }
        }

        function editArticle(editId, newArticle) {
            let editIndex = articles.indexOf(getArticle(editId));
            if (!validateArticle(newArticle) || editIndex === -1) {
                return false;
            }
            articles[editIndex].title = newArticle.title;
            articles[editIndex].summary = newArticle.summary;
            articles[editIndex].tags = newArticle.tags;
            articles[editIndex].content = newArticle.content;
            localStorage.setItem('articles', JSON.stringify(articles));
            return true;
        }

        function addArticle(newArticle) {
            let previousSize = articles.length;
            if (!validateArticle(newArticle)) {
                return false;
            } else if (previousSize !== articles.push(newArticle)) {
                localStorage.setItem('articles', JSON.stringify(articles));
                return true;
            } else {
                return false;
            }
        }

        function removeArticle(removeId) {
            let removeIndex = articles.indexOf(getArticle(removeId));
            if (removeIndex !== -1) {
                articles.splice(removeIndex, 1);
                localStorage.setItem('articles', JSON.stringify(articles));
                return true;
            } else {
                return false;
            }
        }

        function addTag(newTag) {
            let previousSize = tags.length;
            if (newTag !== undefined) {
                if (previousSize === tags.push(newTag)) {
                    localStorage.setItem('tags', JSON.stringify(tags));
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        }

        function removeTag(removeTag) {
            let removeIndex = tags.indexOf(removeTag);
            if (removeIndex !== -1) {
                tags.splice(removeIndex, 1);
                localStorage.setItem('tags', JSON.stringify(tags));
                return true;
            } else {
                return false;
            }
        }

        function getArticlesLength() {
            return articles.length;
        }

        function getTagsLength() {
            return tags.length;
        }
        function hideArticle(id) {
            let xhr = new XMLHttpRequest();
            let article;
            xhr.open('DELETE', '/article');
            xhr.setRequestHeader('content-type', 'application/json');
            xhr.send(JSON.stringify({
                id: id
            }));
            article = getArticle(id);
            if (article !== undefined) {
                article.isHidden = true;
            }
        }

        function loadArticles() {
            let xhr = new XMLHttpRequest();
            function loadHandler() {
                articles = JSON.parse(this.responseText, function (key, value) {
                    if (key === 'createdAt') {
                        return new Date(value);
                    }
                    return value;
                });
                cleanUp();
            }
            function cleanUp() {
                xhr.removeEventListener('load', loadHandler);
            }
            xhr.addEventListener('load', loadHandler);
            xhr.open('GET', '/article', false);
            xhr.send();
        }

        function loadTags() {
            let xhr = new XMLHttpRequest();
            function loadHandler() {
                tags = JSON.parse(this.responseText);
                cleanUp();
            }
            function cleanUp() {
                xhr.removeEventListener('load', loadHandler);
            }
            xhr.addEventListener('load', loadHandler);
            xhr.open('GET', '/tags', false);
            xhr.send();
        }

        function sendNewArticle(article) {
            let xhr = new XMLHttpRequest();
            xhr.open('POST', '/article');
            xhr.setRequestHeader('content-type', 'application/json');
            xhr.send(JSON.stringify(article));
        }

        function sendChangedArticle(article) {
            let xhr = new XMLHttpRequest();
            xhr.open('PUT', '/article');
            xhr.setRequestHeader('content-type', 'application/json');
            xhr.send(JSON.stringify(article));
        }

        return {
            getArticlesLength: getArticlesLength,
            getTagsLength: getTagsLength,
            getArticles: getArticles,
            getArticle: getArticle,
            validateArticle: validateArticle,
            addArticle: addArticle,
            removeArticle: removeArticle,
            editArticle: editArticle,
            addTag: addTag,
            removeTag: removeTag
        };
    }()
);

let articlesRenderer = (function () {
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
        renderArticles(articles).forEach(function (article) {
            ARTICLE_LIST.appendChild(article);
        });
    }

    function insertNewsInDOM(article) {
        ARTICLE_LIST.appendChild(renderNews(article));
    }

    function renderArticles(articles) {
        return articles.map(function (article) {
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
        article.tags.forEach(function (tag) {
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
        article.tags.forEach(function (tag) {
            TAG_TEMPLATE.content.querySelector('.tag').textContent = tag;
            TAG_LIST.appendChild(TAG_TEMPLATE.content.querySelector('.tag').cloneNode(true));
        });
    }

    function renderArticle(article) {
        let ARTICLE_ACTIONS = ARTICLE_TEMPLATE.content.querySelector('.article-actions');
        let VIEW_BUTTON = document.querySelector('#template-view-button');
        let EDIT_BUTTON = document.querySelector('#template-edit-button');
        let DELETE_BUTTON = document.querySelector('#template-delete-button');
        ARTICLE_ACTIONS.innerHTML = '';
        ARTICLE_ACTIONS.appendChild(VIEW_BUTTON.content.querySelector('.view-button').cloneNode(true));
        if (user !== null) {
            ARTICLE_ACTIONS.appendChild(EDIT_BUTTON.content.querySelector('.edit-button').cloneNode(true));
            ARTICLE_ACTIONS.appendChild(DELETE_BUTTON.content.querySelector('.delete-button').cloneNode(true));
        }
        return ARTICLE_TEMPLATE.content.querySelector('.article').cloneNode(true);
    }

    function renderHeaderAddButton() {
        let ADD_ARTICLE_TEMPLATE = document.querySelector('#template-add-article');
        let ADD_ARTICLE_HOLDER = document.querySelector('.add-article-holder');
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
        let resultString = date.getDate() + '.';
        if ((date.getMonth() + 1) < 10) {
            resultString = resultString + '0' + (date.getMonth() + 1);
        } else {
            resultString = resultString + (date.getMonth() + 1);
        }
        resultString = resultString + '.' + date.getFullYear() + ' ';
        if (date.getHours() < 10) {
            resultString = resultString + '0' + date.getHours();
        } else {
            resultString = resultString + date.getHours();
        }
        if (date.getMinutes() < 10) {
            resultString = resultString + ':0' + date.getMinutes();
        } else {
            resultString = resultString + ':' + date.getMinutes();
        }
        return resultString;
    }

    function removeArticlesFromDom() {
        ARTICLE_LIST.innerHTML = '';
    }

    return {
        dateToString: dateToString,
        insertArticlesInDOM: insertArticlesInDOM,
        removeArticlesFromDom: removeArticlesFromDom,
        renderHeaderAddButton: renderHeaderAddButton,
        init: init,
        insertNewsInDOM: insertNewsInDOM
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
    let paginator = document.querySelector('#template-paginator');
    let paginatorHolder = document.querySelector('.paginator-holder');
    paginatorHolder.appendChild(paginator.content.querySelector('.paginator').cloneNode(true));
}
function removePaginator() {
    document.querySelector('.paginator-holder').innerHTML = '';
}
function renderMainPageButton() {
    let mainPageButton = document.querySelector('#template-main-page-button');
    let mainPageButtonHolder = document.querySelector('.main-page-button-holder');
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

let viewButton = document.querySelectorAll('.view-button');
function handleViewButtonClick(event) {
    let newsId = event.target.parentElement.parentElement.dataset.id;
    let filter = document.querySelector('.filters');
    filter.style.display = 'none';
    removePaginator();
    renderMainPageButton();
    articlesRenderer.removeArticlesFromDom();
    articlesRenderer.insertNewsInDOM(articlesModel.getArticle(newsId));
}
[].forEach.call(viewButton, function (btn) {
    btn.addEventListener('click', handleViewButtonClick);
});

let loginLogoutButton = document.querySelectorAll('.login-logout-button');
function handleLoginLogoutButton() {
    if (user !== null) {
        user = null;
        articlesRenderer.renderHeaderAddButton();
        renderArticles();
    } else {
        let filter = document.querySelector('.filters');
        filter.style.display = 'none';
        articlesRenderer.removeArticlesFromDom();
        removePaginator();
        let LOGIN_TEMPLATE = document.querySelector('#template-login');
        let LOGIN_HOLDER = document.querySelector('.login-holder');
        LOGIN_HOLDER.appendChild(LOGIN_TEMPLATE.content.querySelector('.login-page-fields').cloneNode(true));
        renderMainPageButton();
        let authButton = document.querySelectorAll('.login-button');
        [].forEach.call(authButton, function (btn) {
            btn.addEventListener('click', handleAuthButton);
        });
    }
}
[].forEach.call(loginLogoutButton, function (btn) {
    btn.addEventListener('click', handleLoginLogoutButton);
});


function handleAuthButton() {
    let loginInput = document.getElementsByName('login-input')[0];
    let passwordInput = document.getElementsByName('password-input')[0];
    if (validateUser(loginInput.value, passwordInput.value) === true) {
        user = loginInput.value;
        let filter = document.querySelector('.filters');
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


let filterButton = document.querySelectorAll('.confirm-filter');
function handleFilterButtonClick(event) {
    let tempArticles;
    switch (event.target.parentNode.className) {
        case 'author-filter': {
            let authorInput = document.getElementsByName('author-input')[0];
            tempArticles = articlesModel.getArticles(0, 10, {author: authorInput.value.toString()});
            break;
        }
        case 'date-filter': {
            let dateFromInput = document.getElementsByName('date-from')[0];
            let dateToInput = document.getElementsByName('date-to')[0];
            tempArticles = articlesModel.getArticles(0, 10, {
                dateFrom: new Date(dateFromInput.value),
                dateTo: new Date(dateToInput.value)
            });
            break;
        }
        case 'tags-filter': {
            let tagsInput = document.getElementsByName('tags-input')[0];
            let tempTags = tagsInput.value.split(',');
            tempTags.forEach(function (curTag) {
                curTag.trim();
            });
            tempArticles = articlesModel.getArticles(0, 10, articlesModel.getTagsLength(), {tags: [tempTags.toString()]});
            break;
        }
    }
    if (tempArticles.length > 0) {
        articlesRenderer.removeArticlesFromDom();
        articlesRenderer.insertArticlesInDOM(tempArticles);
    }
    else {
        alert('Нет ни одного автора с таким ником');
    }
}
[].forEach.call(filterButton, function (btn) {
    btn.addEventListener('click', handleFilterButtonClick);
});

let resetButton = document.querySelectorAll('.reset-button');
function handleResetButtonClick() {
    let authorInput = document.getElementsByName('author-input')[0];
    let tagsInput = document.getElementsByName('tags-input')[0];
    authorInput.value = '';
    tagsInput.value = '';
    articlesRenderer.removeArticlesFromDom();
    articlesRenderer.insertArticlesInDOM(articlesModel.getArticles());
}
[].forEach.call(resetButton, function (btn) {
    btn.addEventListener('click', handleResetButtonClick);
});


let acceptButton;
let editButton = document.querySelectorAll('.edit-button');
function handleEditButtonClick(event) {
    let EDIT_TEMPLATE = document.querySelector('#template-edit-article');
    let EDIT_HOLDER = document.querySelector('.article-edit-holder');
    articlesRenderer.removeArticlesFromDom();
    let filter = document.querySelector('.filters');
    renderMainPageButton();
    removePaginator();
    filter.style.display = 'none';
    let tempArticle = articlesModel.getArticle(event.target.parentElement.parentElement.dataset.id);
    EDIT_TEMPLATE.content.querySelector('.article').dataset.id = tempArticle.id;
    EDIT_TEMPLATE.content.querySelector('.input-title').value = tempArticle.title;
    EDIT_TEMPLATE.content.querySelector('.author').textContent = tempArticle.author;
    EDIT_TEMPLATE.content.querySelector('.date').textContent =
        articlesRenderer.dateToString(tempArticle.createdAt);
    EDIT_TEMPLATE.content.querySelector('.input-summary').value = tempArticle.summary;
    EDIT_TEMPLATE.content.querySelector('.input-content').value = tempArticle.content;
    if (tempArticle.tags[0] !== null) {
        EDIT_TEMPLATE.content.querySelector('.input-tag1').value = tempArticle.tags[0];
    }
    if (tempArticle.tags[1] !== null) {
        EDIT_TEMPLATE.content.querySelector('.input-tag2').value = tempArticle.tags[1];
    }
    if (tempArticle.tags[2] !== null) {
        EDIT_TEMPLATE.content.querySelector('.input-tag3').value = tempArticle.tags[2];
    }
    if (tempArticle.tags[3] !== null) {
        EDIT_TEMPLATE.content.querySelector('.input-tag4').value = tempArticle.tags[3];
    }
    if (tempArticle.tags[4] !== null) {
        EDIT_TEMPLATE.content.querySelector('.input-tag5').value = tempArticle.tags[4];
    }
    EDIT_TEMPLATE.content.querySelector('.accept-button').style.display = 'inline';
    EDIT_HOLDER.appendChild(EDIT_TEMPLATE.content.querySelector('.article').cloneNode(true));
    acceptButton = document.querySelector('.accept-button');
    acceptButton.addEventListener('click', handleAcceptButtonClick);
}
[].forEach.call(editButton, function (btn) {
    btn.addEventListener('click', handleEditButtonClick);
});

function handleAcceptButtonClick(event) {
    let articleId = event.target.parentElement.dataset.id;
    let EDIT_TEMPLATE = document.querySelector('#template-edit-article');
    let title = EDIT_TEMPLATE.content.querySelector('.input-title').value;
    let summary = EDIT_TEMPLATE.content.querySelector('.input-summary').value;
    let content = EDIT_TEMPLATE.content.querySelector('.input-content').value;
    let tag1, tag2, tag3, tag4, tag5;
    if (EDIT_TEMPLATE.content.querySelector('.input-tag1').value !== null) {
        tag1 = EDIT_TEMPLATE.content.querySelector('.input-tag1').value;
    }
    if (EDIT_TEMPLATE.content.querySelector('.input-tag2').value !== null) {
        tag2 = EDIT_TEMPLATE.content.querySelector('.input-tag2').value;
    }
    if (EDIT_TEMPLATE.content.querySelector('.input-tag3').value !== null) {
        tag3 = EDIT_TEMPLATE.content.querySelector('.input-tag3').value;
    }
    if (EDIT_TEMPLATE.content.querySelector('.input-tag4').value !== null) {
        tag4 = EDIT_TEMPLATE.content.querySelector('.input-tag4').value;
    }
    if (EDIT_TEMPLATE.content.querySelector('.input-tag5').value !== null) {
        tag5 = EDIT_TEMPLATE.content.querySelector('.input-tag5').value;
    }
    if (editArticle(articleId, {
            title: title,
            summary: summary,
            content: content,
            tags: {tag1, tag2, tag3, tag4, tag5}
        }) === false) {
        alert('Введённая статья не является валидной');
    }
    startApp();
}

let addButton = document.querySelectorAll('.add-article-button');
function handleAddButtonClick() {
    let EDIT_TEMPLATE = document.querySelector('#template-edit-article');
    let EDIT_HOLDER = document.querySelector('.article-edit-holder');
    articlesRenderer.removeArticlesFromDom();
    let filter = document.querySelector('.filters');
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
    let acceptAddButton = document.querySelector('.accept-add-button');
    acceptAddButton.addEventListener('click', handleAcceptAddButtonClick);
}
[].forEach.call(addButton, function (btn) {
    btn.addEventListener('click', handleAddButtonClick);
});

function handleAcceptAddButtonClick() {
    let EDIT_TEMPLATE = document.querySelector('#template-create-article');
    let title = EDIT_TEMPLATE.content.querySelector('.input-title').value;
    let summary = EDIT_TEMPLATE.content.querySelector('.input-summary').value;
    let content = EDIT_TEMPLATE.content.querySelector('.input-content').value;
    let tags = {};
    if (EDIT_TEMPLATE.content.querySelector('.input-tag1').value !== null) {
        tags[0] = EDIT_TEMPLATE.content.querySelector('.input-tag1').value;
    }
    if (EDIT_TEMPLATE.content.querySelector('.input-tag2').value !== null) {
        tags[1] = EDIT_TEMPLATE.content.querySelector('.input-tag2').value;
    }
    if (EDIT_TEMPLATE.content.querySelector('.input-tag3').value !== null) {
        tags[2] = EDIT_TEMPLATE.content.querySelector('.input-tag3').value;
    }
    if (EDIT_TEMPLATE.content.querySelector('.input-tag4').value !== null) {
        tags[3] = EDIT_TEMPLATE.content.querySelector('.input-tag4').value;
    }
    if (EDIT_TEMPLATE.content.querySelector('.input-tag5').value !== null) {
        tags[4] = EDIT_TEMPLATE.content.querySelector('.input-tag5').value;
    }
    if (articlesModel.validateArticle({
            title: title, author: user, createdAt: new Date(),
            summary: summary, content: content, tags: tags
        }) === true) {

    }
}

let mainPageButton = document.querySelectorAll('.main-page-button');
function handleMainPageButtonClick() {
    startApp();
}

[].forEach.call(mainPageButton, function (btn) {
    btn.addEventListener('click', handleMainPageButtonClick);
});
