var article = JSON.parse(localStorage.getItem('viewArticle'), function (key, value) {
    if (key == 'createdAt') return new Date(value);
    return value;
});
var articles = [];
articles.push(article);
var user = 'xim97';
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

    function renderArticles(articles) {
        return articles.map(function (article) {
            renderArticleTemplate(article);
            return renderArticle(article);
        });
    }

    function renderArticleTemplate(article) {
        ARTICLE_TEMPLATE.content.querySelector('.article').dataset.id = article.id;
        ARTICLE_TEMPLATE.content.querySelector('.title').textContent = article.title;
        ARTICLE_TEMPLATE.content.querySelector('.author').textContent = article.author;
        ARTICLE_TEMPLATE.content.querySelector('.date').textContent = dateToString(article.createdAt);
        ARTICLE_TEMPLATE.content.querySelector('.summary').textContent = article.content;
        TAG_LIST.innerHTML = '';
        article.tags.forEach(function (tag) {
            TAG_TEMPLATE.content.querySelector('.tag').textContent = tag;
            TAG_LIST.appendChild(TAG_TEMPLATE.content.querySelector('.tag').cloneNode(true));
        });
    }

    function renderArticle(article) {
        var ARTICLE_ACTIONS = ARTICLE_TEMPLATE.content.querySelector('.article-actions');
        var EDIT_BUTTON = document.querySelector('#template-edit-button');
        var DELETE_BUTTON = document.querySelector('#template-delete-button');
        ARTICLE_ACTIONS.innerHTML = '';
        if (user != null) {
            ARTICLE_ACTIONS.appendChild(EDIT_BUTTON.content.querySelector('.edit-button').cloneNode(true));
            ARTICLE_ACTIONS.appendChild(DELETE_BUTTON.content.querySelector('.delete-button').cloneNode(true));
        }
        return ARTICLE_TEMPLATE.content.querySelector('.article').cloneNode(true);
    }

    function renderHeaderAddButton() {
        if (user != null) {
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

    return {
        insertArticlesInDOM: insertArticlesInDOM,
        renderHeaderAddButton: renderHeaderAddButton,
        init: init
    };
}());

document.addEventListener('FeedLoader', startApp());

function startApp() {
    articlesRenderer.init();
    articlesRenderer.renderHeaderAddButton();
    renderArticles();
}

function renderArticles() {
    articlesRenderer.insertArticlesInDOM(articles);
}