'use strict';
var user = '1';
var articlesModel = (function () {
        var articles = [];
        articles = JSON.parse(localStorage.getItem('articles'), function (key, value) {
            if (key == 'createdAt') return new Date(value);
            return value;
        });
        var tags = JSON.parse(localStorage.getItem('tags'));

        function getArticles(skip, top, filterConfig) {
            if (!Number.isFinite(skip)) {
                skip = 0;
            }
            if (!Number.isFinite(top)) {
                top = 10;
            }
            return articles.filter(function (currentArticle) {
                var result = true;

                if (filterConfig !== undefined) {
                    if (filterConfig.author !== undefined) {
                        result = (currentArticle.author == filterConfig.author);
                    }
                    if (filterConfig.dateFrom !== undefined) {
                        result = result && currentArticle.createdAt.getTime() >= (filterConfig.dateFrom).getTime();

                    }
                    if (filterConfig.dateTo !== undefined) {

                        result = result && currentArticle.createdAt.getTime() <= (filterConfig.dateTo).getTime();
                    }
                    if (filterConfig.tags !== undefined && filterConfig.tags.length != 0) {
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
                return currentArticle.id == findId;
            });
        }

        function validateArticle(article) {
            if (article !== undefined) {
                if (article.title !== undefined && (article.title.length > 100 || article.title.length == 0)) {
                    return false;
                } else if (article.tags !== undefined && (article.tags.length == 0 || article.tags.length > 5)) {
                    return false;
                } else if (article.summary !== undefined && (article.summary.length == 0 || article.summary.length > 200)) {
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
            var editIndex = articles.indexOf(getArticle(editId));
            if (!validateArticle(newArticle) || editIndex == -1) {
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
            var previousSize = articles.length;
            if (!validateArticle(newArticle)) {
                return false;
            } else if (previousSize != articles.push(newArticle)) {
                localStorage.setItem('articles', JSON.stringify(articles));
                return true;
            } else {
                return false;
            }
        }

        function removeArticle(removeId) {
            var removeIndex = articles.indexOf(getArticle(removeId));
            if (removeIndex != -1) {
                articles.splice(removeIndex, 1);
                localStorage.setItem('articles', JSON.stringify(articles));
                return true;
            } else {
                return false;
            }
        }

        function addTag(newTag) {
            var previousSize = tags.length;
            if (newTag !== undefined) {
                if (previousSize == tags.push(newTag)) {
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
            var removeIndex = tags.indexOf(removeTag);
            if (removeIndex != -1) {
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

var articlesRenderer = (function () {
    var USER_NAME;
    var HEADER_ACTIONS;
    var ARTICLE_TEMPLATE;
    var ARTICLE_LIST;
    var TAG_TEMPLATE;
    var TAG_LIST;

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
        var ARTICLE_ACTIONS = ARTICLE_TEMPLATE.content.querySelector('.article-actions');
        var VIEW_BUTTON = document.querySelector('#template-view-button');
        var EDIT_BUTTON = document.querySelector('#template-edit-button');
        var DELETE_BUTTON = document.querySelector('#template-delete-button');
        ARTICLE_ACTIONS.innerHTML = '';
        ARTICLE_ACTIONS.appendChild(VIEW_BUTTON.content.querySelector('.view-button').cloneNode(true));
        if (user != null) {
            ARTICLE_ACTIONS.appendChild(EDIT_BUTTON.content.querySelector('.edit-button').cloneNode(true));
            ARTICLE_ACTIONS.appendChild(DELETE_BUTTON.content.querySelector('.delete-button').cloneNode(true));
        }
        return ARTICLE_TEMPLATE.content.querySelector('.article').cloneNode(true);
    }

    function renderHeaderAddButton() {
        var ADD_ARTICLE_TEMPLATE = document.querySelector('#template-add-article');
        var ADD_ARTICLE_HOLDER = document.querySelector('.add-article-holder');
        if (user != null) {
            ADD_ARTICLE_HOLDER.appendChild(ADD_ARTICLE_TEMPLATE.content.querySelector('.add-article-button').cloneNode(true));
            USER_NAME.textContent = user;
            HEADER_ACTIONS.querySelector('.login-logout-button').textContent = 'Выйти';
        } else {
            USER_NAME.textContent = 'Гость';
            HEADER_ACTIONS.querySelector('.login-logout-button').textContent = 'Войти';
        }
    }

    function dateToString(date) {
        var resultString = date.getDate() + '.';
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
}

function renderArticles(from, to) {
    articlesRenderer.removeArticlesFromDom();
    articlesRenderer.insertArticlesInDOM(articlesModel.getArticles(from, to));
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
    renderArticles();
}

var viewButton = document.querySelectorAll('.view-button');
function handleViewButtonClick(event) {
    var newsId = event.target.parentElement.parentElement.dataset.id;
    var filter = document.querySelector('.filters');
    var paginator = document.querySelector('.paginator');
    var mainPageButton = document.querySelector('.main-page-button');
    filter.style.display = 'none';
    paginator.style.display = 'none';
    mainPageButton.style.display = 'inline';
    articlesRenderer.removeArticlesFromDom();
    articlesRenderer.insertNewsInDOM(articlesModel.getArticle(newsId));
}
[].forEach.call(viewButton, function (btn) {
    btn.addEventListener('click', handleViewButtonClick);
});

var loginLogoutButton = document.querySelectorAll('.login-logout-button');
function handleLoginLogoutButton() {
    if (user != null) {
        user = null;
        articlesRenderer.renderHeaderAddButton();
        renderArticles();
    } else {
        var paginator = document.querySelector('.paginator');
        var filter = document.querySelector('.filters');
        paginator.style.display = 'none';
        filter.style.display = 'none';
        articlesRenderer.removeArticlesFromDom();
        var LOGIN_TEMPLATE = document.querySelector('#template-login');
        var LOGIN_HOLDER = document.querySelector('.login-holder');
        LOGIN_HOLDER.appendChild(LOGIN_TEMPLATE.content.querySelector('.login-page-fields').cloneNode(true));
        document.querySelector('.main-page-button').style.display = 'inline';
        var authButton = document.querySelectorAll('.login-button');
        [].forEach.call(authButton, function (btn) {
            btn.addEventListener('click', handleAuthButton);
        });
    }
}
[].forEach.call(loginLogoutButton, function (btn) {
    btn.addEventListener('click', handleLoginLogoutButton);
});


function handleAuthButton() {
    var loginInput = document.getElementsByName('login-input')[0];
    var passwordInput = document.getElementsByName('password-input')[0];
    if (validateUser(loginInput.value, passwordInput.value) == true){
        user = loginInput.value;
        var paginator = document.querySelector('.paginator');
        var filter = document.querySelector('.filters');
        document.querySelector('.login-holder').removeChild(document.querySelector('.login-page-fields'));
        startApp();
        filter.style.display = 'inline';
        paginator.style.display = 'inline';
    } else {
        alert("Неверно введён логин или пароль");
    }
}
function validateUser(login, password) {
    return login == '1';
}


var filterButton = document.querySelectorAll('.confirm-filter');
function handleFilterButtonClick(event) {
    var tempArticles;
    switch (event.target.parentNode.className){
        case 'author-filter':{
            var authorInput = document.getElementsByName('author-input')[0];
            tempArticles = articlesModel.getArticles(0, 10, {author:authorInput.value.toString()});
        }
        case 'date-filter':{
            /*var dateFromInput = document.getElementsByName('date-from')[0];
            var dateToInput = document.getElementsByName('date-to')[0];
            console.log(new Date(dateToInput.value));
            tempArticles = articlesModel.getArticles(0, 10, {dateFrom:new Date(dateFromInput.value),
                dateTo:new Date(dateToInput.value)});*/
            break;
        }
        case 'tags-filter':{
            var tagsInput = document.getElementsByName('tags-input')[0];
            var tempTags = tagsInput.value.split(',');
            tempTags.forEach(function (curTag) {
               curTag.trim();
            });
            tempArticles = articlesModel.getArticles(0, 10, articlesModel.getTagsLength(), {tags:[tempTags.toString()]});
            break;
        }
    }
    if (tempArticles.length > 0)
    {
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

var resetButton = document.querySelectorAll('.reset-button');
function handleResetButtonClick() {
    var authorInput = document.getElementsByName('author-input')[0];
    var tagsInput = document.getElementsByName('tags-input')[0];
    authorInput.value = '';
    tagsInput.value = '';
    articlesRenderer.removeArticlesFromDom();
    articlesRenderer.insertArticlesInDOM(articlesModel.getArticles());
}
[].forEach.call(resetButton, function (btn) {
    btn.addEventListener('click', handleResetButtonClick);
});

var addButton = document.querySelectorAll('.add-article-button');
function handleAddButtonClick() {

}
[].forEach.call(addButton, function (btn) {
    btn.addEventListener('click', handleAddButtonClick);
});

var editButton = document.querySelectorAll('.edit-button');
function handleEditButtonClick(event) {
    var EDIT_TEMPLATE = document.querySelector('#template-edit-article');
    var EDIT_HOLDER = document.querySelector('.article-edit-holder');
    articlesRenderer.removeArticlesFromDom();

    var mainPageButton = document.querySelector('.main-page-button');
    var paginator = document.querySelector('.paginator');
    var filter = document.querySelector('.filters');
    mainPageButton.style.display = 'inline';
    paginator.style.display = 'none';
    filter.style.display = 'none';
    console.log(event.target.parentElement.parentElement.dataset.id);
    var tempArticle = articlesModel.getArticle(event.target.parentElement.parentElement.dataset.id);
    EDIT_TEMPLATE.content.querySelector('.article').dataset.id = tempArticle.id;
    /*.content.querySelector('.title').textContent = tempArticle.title;*/
    EDIT_TEMPLATE.content.querySelector('.author').textContent = tempArticle.author;
    EDIT_TEMPLATE.content.querySelector('.date').textContent =
        articlesRenderer.dateToString(tempArticle.createdAt);
    EDIT_TEMPLATE.content.querySelector('.text').textContent = tempArticle.summary;
    var TAG_TEMPLATE = document.querySelector('#template-tag');
    var TAG_LIST = EDIT_TEMPLATE.content.querySelector('.tag-list');
    TAG_LIST.innerHTML = '';
    tempArticle.tags.forEach(function (tag) {
        TAG_TEMPLATE.content.querySelector('.tag').textContent = tag;
        TAG_LIST.appendChild(TAG_TEMPLATE.content.querySelector('.tag').cloneNode(true));
    });
    EDIT_HOLDER.appendChild(EDIT_TEMPLATE.content.querySelector('.article').cloneNode(true));
}
[].forEach.call(editButton, function (btn) {
    btn.addEventListener('click', handleEditButtonClick);
});