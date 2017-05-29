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

let user = JSON.parse(sessionStorage.getItem('user'));
let ARTICLES_INDEX_FROM = 0;
let ARTICLES_INDEX_TO = 10;

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

    function httpPost(url, obj) {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('POST', url);
            xhr.setRequestHeader('content-type', 'application/json');
            xhr.send(obj);
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

    function httpPut(url, obj) {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('PUT', url);
            xhr.setRequestHeader('content-type', 'application/json');
            xhr.send(obj);
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
        httpPost,
        httpPut,
    };
}());

const articlesService = (function () {
    let articles;
    let tags;

    function getArticles(skip, top, filterConfig) {
        let result = articles;
        const from = skip || 0;
        const number = top || 10;
        result = result.filter(element => !element.isHidden);
        if (filterConfig) {
            if (filterConfig.author && filterConfig.author !== '') {
                result = result.filter(element => element.author === filterConfig.author);
            }
            if (filterConfig.dateFrom) {
                result = result.filter(element => element.createdAt.getTime() >= filterConfig.dateFrom.getTime());
            }
            if (filterConfig.dateTo) {
                result = result.filter(element => element.createdAt.getTime() <= filterConfig.dateTo.getTime());
            }
            if (filterConfig.tags && filterConfig.tags.length !== 0) {
                result = result.filter(element => filterConfig.tags.every(tag => element.tags.indexOf(tag) >= 0));
            }
        }
        articles = result.slice(0, articles.length);
        return result.slice(from, from + number);
    }

    function getArticle(findId) {
        return articles.find(element => element.id === findId);
    }

    function validateArticle(article) {
        if (article.id &&
            (typeof (article.id) !== 'string' || article.id.length === 0) && articles.filter(element => element.id === article.id).length !== 0) {
            return false;
        } else if (article.title &&
            (typeof (article.title) !== 'string' || article.title.length > 100 || article.title.length === 0)) {
            return false;
        } else if (article.tags &&
            (!(article.tags instanceof Array) || article.tags.length === 0 || article.tags.length > 5)) {
            return false;
        } else if (article.summary &&
            (typeof (article.summary) !== 'string' || article.summary.length === 0 || article.summary.length > 200)) {
            return false;
        } else if (article.createdAt && !(article.createdAt instanceof Date)) {
            return false;
        } else if (article.author && (typeof (article.author) !== 'string' || article.author.length === 0)) {
            return false;
        } else if (article.content && (typeof (article.content) !== 'string' || article.content.length === 0)) {
            return false;
        }
        return !(article.tags && !article.tags.every(tag => tags.indexOf(tag) >= 0 && typeof (tag) === 'string'));
    }

    function removeArticle(removeId) {
        const removeIndex = articles.findIndex(element => element.id === removeId);
        resetArticles();
        if (removeIndex !== -1) {
            articles.splice(removeIndex, 1);
            localStorage.setItem('articles', JSON.stringify(articles));
            return true;
        }
        return false;
    }

    function numberOfArticles() {
        return articles.length;
    }

    function resetArticles() {
        ARTICLES_INDEX_FROM = 0;
        ARTICLES_INDEX_TO = 10;
        sessionStorage.removeItem('filters');
    }

    function setArticles(articlesInit) {
        articles = articlesInit;
    }

    function setTags(tagsInit) {
        tags = tagsInit;
    }

    function getTags() {
        return tags;
    }

    return {
        getArticles,
        getArticle,
        validateArticle,
        removeArticle,
        numberOfArticles,
        resetArticles,
        setArticles,
        setTags,
        getTags,
    };
}());

const articlesLogic = (function () {
    const USER_NAME = document.querySelector('.user');
    const HEADER_ACTIONS = document.querySelector('.header-actions');
    const DYNAMIC_BLOCK = document.querySelector('.dynamic-block');
    const ARTICLE_LIST_TEMPLATE = document.querySelector('#template-article-list');
    const ARTICLE_TEMPLATE = document.querySelector('#template-article');
    const TAG_TEMPLATE = document.querySelector('#template-tag');
    const TAG_LIST = ARTICLE_TEMPLATE.content.querySelector('.tag-list');
    const FILTERS_TEMPLATE = document.querySelector('#template-filters');
    const PAGINATOR_TEMPLATE = document.querySelector('#template-paginator');
    const NEXT_BUTTON_TEMPLATE = document.querySelector('#template-pagination-next-button');
    const PREV_BUTTON_TEMPLATE = document.querySelector('#template-pagination-prev-button');
    let ARTICLE_LIST;
    let PAGINATOR;
    let tags;
    let authors;

    function loadArticles(articles) {
        headerConfig();
        document.querySelector('.feed').textContent = 'Лента новостей';
        DYNAMIC_BLOCK.appendChild(ARTICLE_LIST_TEMPLATE.content.querySelector('.article-list').cloneNode(true));
        ARTICLE_LIST = document.querySelector('.article-list');
        createArticles(articles).forEach((article) => {
            ARTICLE_LIST.appendChild(article);
        });
        httpRequests.httpGet('/authors').then(value => {
            authors = JSON.parse(value);
            DYNAMIC_BLOCK.appendChild(appendFilters());
            DYNAMIC_BLOCK.appendChild(PAGINATOR_TEMPLATE.content.querySelector('.paginator').cloneNode(true));
            PAGINATOR = document.querySelector('.paginator');
            if (articlesService.numberOfArticles() > ARTICLES_INDEX_TO) {
                PAGINATOR.appendChild(NEXT_BUTTON_TEMPLATE.content.querySelector('.pagination-next-button').cloneNode(true));
            }
            if (ARTICLES_INDEX_FROM > 0) {
                PAGINATOR.appendChild(PREV_BUTTON_TEMPLATE.content.querySelector('.pagination-prev-button').cloneNode(true));
            }

            PAGINATOR.addEventListener('click', handlePaginatorClick);
            document.querySelectorAll('.view-button').forEach((button) => {
                button.addEventListener('click', handleArticleViewButtonClick);
            });
            document.querySelectorAll('.edit-button').forEach((button) => {
                button.addEventListener('click', handleArticleEditButtonClick);
            });
            document.querySelectorAll('.delete-button').forEach((button) => {
                button.addEventListener('click', handleArticleDeleteButtonClick);
            });
            document.querySelector('.add-tag-filter').addEventListener('click', handleTagAddFilterButtonClick);
            document.querySelector('.confirm-filter').addEventListener('click', handleConfirmFilterButtonClick);
            document.querySelector('.reset-filter').addEventListener('click', handleResetFilterButtonClick);
            document.querySelectorAll('.chosen-tag').forEach((tag) => {
                tag.addEventListener('click', handleChosenTagClick);
            });
        }).catch(error => {
            errorForm.loadError('Ошибка загрузки с сервера.');
        });
    }

    function createArticles(articles) {
        return articles.map(article => createArticle(article));
    }

    function createArticle(article) {
        const ARTICLE_ACTIONS = ARTICLE_TEMPLATE.content.querySelector('.article-actions');
        const VIEW_BUTTON_TEMPLATE = document.querySelector('#template-view-button');
        const EDIT_BUTTON_TEMPLATE = document.querySelector('#template-edit-button');
        const DELETE_BUTTON_TEMPLATE = document.querySelector('#template-delete-button');
        TAG_LIST.innerHTML = '';
        ARTICLE_ACTIONS.innerHTML = '';
        ARTICLE_TEMPLATE.content.querySelector('.article').dataset.id = article.id;
        ARTICLE_TEMPLATE.content.querySelector('.title').textContent = article.title;
        ARTICLE_TEMPLATE.content.querySelector('.author').textContent = article.author;
        ARTICLE_TEMPLATE.content.querySelector('.date').textContent = dateToString(article.createdAt);
        ARTICLE_TEMPLATE.content.querySelector('.summary').textContent = article.summary;
        ARTICLE_TEMPLATE.content.querySelector('.content-block').innerHTML = '';
        article.tags.forEach((tag) => {
            TAG_TEMPLATE.content.querySelector('.tag').textContent = tag;
            TAG_LIST.appendChild(TAG_TEMPLATE.content.querySelector('.tag-holder').cloneNode(true));
        });
        if (user) {
            ARTICLE_ACTIONS.appendChild(EDIT_BUTTON_TEMPLATE.content.querySelector('.edit-button').cloneNode(true));
        }
        ARTICLE_ACTIONS.appendChild(VIEW_BUTTON_TEMPLATE.content.querySelector('.view-button').cloneNode(true));
        if (user) {
            ARTICLE_ACTIONS.appendChild(DELETE_BUTTON_TEMPLATE.content.querySelector('.delete-button').cloneNode(true));
        }
        return ARTICLE_TEMPLATE.content.querySelector('.article').cloneNode(true);
    }

    function dateToString(date) {
        return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()} ${date.getHours()}:${
            date.getMinutes()}`;
    }

    function dateInputToString(date) {
        return `${date.getFullYear()}-${(date.getMonth() + 1 > 9) ? date.getMonth() + 1 : `0${date.getMonth() + 1}`
            }-${(date.getDate() > 9) ? date.getDate() : `0${date.getDate()}`}`;
    }

    function appendFilters() {
        const CHOSEN_TAG_TEMPLATE = document.querySelector('#template-chosen-tag');
        const CHOSEN_TAGS_LIST = FILTERS_TEMPLATE.content.querySelector('.chosen-tags-list');
        const AUTHORS_DATALIST = FILTERS_TEMPLATE.content.querySelector('#authors');
        const TAGS_DATALIST = FILTERS_TEMPLATE.content.querySelector('#tags');
        const OPTION_TEMPLATE = document.querySelector('#template-option');
        const filters = JSON.parse(sessionStorage.getItem('filters'), (key, value) => {
            if (key === 'dateFrom' || key === 'dateTo') {
                return new Date(value);
            }
            return value;
        });
        tags = articlesService.getTags();
        CHOSEN_TAGS_LIST.innerHTML = '';
        AUTHORS_DATALIST.innerHTML = '';
        TAGS_DATALIST.innerHTML = '';
        if (filters) {
            FILTERS_TEMPLATE.content.querySelector('.author-input').value = (filters.author) ? filters.author : '';
            FILTERS_TEMPLATE.content.querySelector('.date-from').value = (filters.dateFrom) ? dateInputToString(filters.dateFrom) : '';
            FILTERS_TEMPLATE.content.querySelector('.date-to').value = (filters.dateTo) ? dateInputToString(filters.dateTo) : '';
            FILTERS_TEMPLATE.content.querySelector('.tags-input').value = '';
            if (filters.tags) {
                filters.tags.forEach((tag) => {
                    CHOSEN_TAG_TEMPLATE.content.querySelector('.chosen-tag').textContent = tag;
                    CHOSEN_TAGS_LIST.appendChild(CHOSEN_TAG_TEMPLATE.content.querySelector('.tag-holder').cloneNode(true));
                });
            }
        } else {
            FILTERS_TEMPLATE.content.querySelector('.author-input').value = '';
            FILTERS_TEMPLATE.content.querySelector('.date-from').value = '';
            FILTERS_TEMPLATE.content.querySelector('.date-to').value = '';
            FILTERS_TEMPLATE.content.querySelector('.tags-input').value = '';
        }
        if (authors) {
            authors.forEach((author) => {
                OPTION_TEMPLATE.content.querySelector('.option').value = author;
                AUTHORS_DATALIST.appendChild(OPTION_TEMPLATE.content.querySelector('.option').cloneNode(true));
            });
        }
        if (tags) {
            tags.forEach((tag) => {
                OPTION_TEMPLATE.content.querySelector('.option').value = tag;
                TAGS_DATALIST.appendChild(OPTION_TEMPLATE.content.querySelector('.option').cloneNode(true));
            });
        }
        return FILTERS_TEMPLATE.content.querySelector('.filters').cloneNode(true);
    }

    function headerConfig() {
        const ADD_ARTICLE_TEMPLATE = document.querySelector('#template-add-article');
        const ADD_ARTICLE_HOLDER = HEADER_ACTIONS.querySelector('.add-article-holder');
        const LOGIN_LOGOUT_BUTTON = HEADER_ACTIONS.querySelector('.login-logout-button');

        if (!user) {
            USER_NAME.textContent = 'Гость';
            LOGIN_LOGOUT_BUTTON.textContent = 'Войти';
        } else {
            //ADD_ARTICLE_HOLDER.innerHTML = '';
            ADD_ARTICLE_HOLDER.appendChild(ADD_ARTICLE_TEMPLATE.content.querySelector('.add-article').cloneNode(true));
            USER_NAME.textContent = user;
            LOGIN_LOGOUT_BUTTON.textContent = 'Выйти';
            ADD_ARTICLE_HOLDER.addEventListener('click', handleAddArticleClick);
        }
    }

    function handleConfirmFilterButtonClick() {
        const filters = JSON.parse(sessionStorage.getItem('filters'), (key, value) => {
                if (key === 'dateFrom' || key === 'dateTo') {
                    return new Date(value);
                }
                return value;
            }) || {};
        let buf;
        filters.author = document.forms.filters.elements.authorInput.value;
        buf = document.forms.filters.elements.dateFrom.value;
        filters.dateFrom = (buf !== '') ? new Date(buf) : undefined;
        buf = document.forms.filters.elements.dateTo.value;
        filters.dateTo = (buf !== '') ? new Date(buf) : undefined;
        sessionStorage.setItem('filters', JSON.stringify(filters));
        ARTICLES_INDEX_FROM = 0;
        ARTICLES_INDEX_TO = 10;
        appendArticles(ARTICLES_INDEX_FROM, ARTICLES_INDEX_TO);
    }

    function handleTagAddFilterButtonClick() {
        const CHOSEN_TAGS_LIST = document.querySelector('.chosen-tags-list');
        const CHOSEN_TAG_TEMPLATE = document.querySelector('#template-chosen-tag');
        const filters = JSON.parse(sessionStorage.getItem('filters'), (key, value) => {
                if (key === 'dateFrom' || key === 'dateTo') {
                    return new Date(value);
                }
                return value;
            }) || {};
        let tag;
        filters.tags = filters.tags || [];
        tag = document.forms.filters.elements.tagsInput.value;
        if (filters.tags.length < 5 && tags.indexOf(tag) !== -1 && filters.tags.indexOf(tag) === -1) {
            filters.tags.push(tag);
            sessionStorage.setItem('filters', JSON.stringify(filters));
            document.forms.filters.elements.tagsInput.value = '';
            CHOSEN_TAGS_LIST.innerHTML = '';
            filters.tags.forEach((tagCur) => {
                CHOSEN_TAG_TEMPLATE.content.querySelector('.chosen-tag').textContent = tagCur;
                CHOSEN_TAGS_LIST.appendChild(CHOSEN_TAG_TEMPLATE.content.querySelector('.tag-holder').cloneNode(true));
            });
            document.querySelectorAll('.chosen-tag').forEach((tagCur) => {
                tag.addEventListener('click', handleChosenTagClick);
            });
        } else {
            alert('Невозможно добавить тег!');
        }
    }

    function handleChosenTagClick(event) {
        const CHOSEN_TAGS_LIST = document.querySelector('.chosen-tags-list');
        const CHOSEN_TAG_TEMPLATE = document.querySelector('#template-chosen-tag');
        const filters = JSON.parse(sessionStorage.getItem('filters'), (key, value) => {
            if (key === 'dateFrom' || key === 'dateTo') {
                return new Date(value);
            }
            return value;
        });
        filters.tags.splice(filters.tags.indexOf(event.target.textContent), 1);
        sessionStorage.setItem('filters', JSON.stringify(filters));
        CHOSEN_TAGS_LIST.innerHTML = '';
        if (filters.tags.length > 0) {
            filters.tags.forEach((tag) => {
                CHOSEN_TAG_TEMPLATE.content.querySelector('.chosen-tag').textContent = tag;
                CHOSEN_TAGS_LIST.appendChild(CHOSEN_TAG_TEMPLATE.content.querySelector('.tag-holder').cloneNode(true));
            });
            document.querySelectorAll('.chosen-tag').forEach((tag) => {
                tag.addEventListener('click', handleChosenTagClick);
            });
        }
    }

    function handleResetFilterButtonClick() {
        ARTICLES_INDEX_FROM = 0;
        ARTICLES_INDEX_TO = 10;
        sessionStorage.removeItem('filters');
        articlesService.resetArticles();
        appendArticles(ARTICLES_INDEX_FROM, ARTICLES_INDEX_TO);
    }

    return {
        appendArticles: loadArticles,
        headerConfig,
    };
}());

const articleView = (function () {
    const DYNAMIC_BLOCK = document.querySelector('.dynamic-block');
    const ARTICLE_TEMPLATE = document.querySelector('#template-article');
    const TAG_TEMPLATE = document.querySelector('#template-tag');
    const TAG_LIST = ARTICLE_TEMPLATE.content.querySelector('.tag-list');
    const RETURN_BUTTON_TEMPLATE = document.querySelector('#template-return-button');

    function loadArticle(id) {
        let article;
        DYNAMIC_BLOCK.innerHTML = '';
        document.querySelector('.feed').textContent = 'Просмотр новости';
        DYNAMIC_BLOCK.appendChild(RETURN_BUTTON_TEMPLATE.content.querySelector('.return-button-block').cloneNode(true));
        article = createArticle(id);
        article.className = 'article-view';
        DYNAMIC_BLOCK.appendChild(article);
        document.querySelector('.return-button-block').addEventListener('click', handleReturnButtonClick);
        if (user) {
            document.querySelector('.edit-button').addEventListener('click', handleArticleEditButtonClick);
            document.querySelector('.delete-button').addEventListener('click', handleArticleDeleteButtonClick);
        }
    }

    function createArticle(id) {
        const ARTICLE_ACTIONS = ARTICLE_TEMPLATE.content.querySelector('.article-actions');
        const ARTICLE_CONTENT_BLOCK = ARTICLE_TEMPLATE.content.querySelector('.content-block');
        const EDIT_BUTTON_TEMPLATE = document.querySelector('#template-edit-button');
        const DELETE_BUTTON_TEMPLATE = document.querySelector('#template-delete-button');
        const ARTICLE_CONTENT_TEMPLATE = document.querySelector('#template-content');
        const article = articlesService.getArticle(id);
        TAG_LIST.innerHTML = '';
        ARTICLE_ACTIONS.innerHTML = '';
        ARTICLE_CONTENT_BLOCK.innerHTML = '';
        ARTICLE_TEMPLATE.content.querySelector('.article').dataset.id = article.id;
        ARTICLE_TEMPLATE.content.querySelector('.title').textContent = article.title;
        ARTICLE_TEMPLATE.content.querySelector('.author').textContent = article.author;
        ARTICLE_TEMPLATE.content.querySelector('.date').textContent = dateToString(article.createdAt);
        ARTICLE_TEMPLATE.content.querySelector('.summary').textContent = '';
        ARTICLE_CONTENT_TEMPLATE.content.querySelector('.content').textContent = article.content;
        ARTICLE_CONTENT_BLOCK.appendChild(ARTICLE_CONTENT_TEMPLATE.content.querySelector('.content').cloneNode(true));
        article.tags.forEach((tag) => {
            TAG_TEMPLATE.content.querySelector('.tag').textContent = tag;
            TAG_LIST.appendChild(TAG_TEMPLATE.content.querySelector('.tag-holder').cloneNode(true));
        });
        if (user) {
            ARTICLE_ACTIONS.appendChild(EDIT_BUTTON_TEMPLATE.content.querySelector('.edit-button').cloneNode(true));
            ARTICLE_ACTIONS.appendChild(DELETE_BUTTON_TEMPLATE.content.querySelector('.delete-button').cloneNode(true));
        }
        return ARTICLE_TEMPLATE.content.querySelector('.article').cloneNode(true);
    }

    function dateToString(date) {
        return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()} ${date.getHours()}:${
            date.getMinutes()}`;
    }

    return {
        loadArticle,
    };
}());

const authorizationForm = (function () {
    const DYNAMIC_BLOCK = document.querySelector('.dynamic-block');
    const RETURN_BUTTON_TEMPLATE = document.querySelector('#template-return-button');
    const AUTHORIZATION_INPUT_TEMPLATE = document.querySelector('#template-authorization-input-block');
    const LOGIN_BUTTON_TEMPLATE = document.querySelector('#template-login-button');

    function loadForm() {
        DYNAMIC_BLOCK.innerHTML = '';
        document.querySelector('.feed').textContent = 'Авторизация';
        DYNAMIC_BLOCK.appendChild(RETURN_BUTTON_TEMPLATE.content.querySelector('.return-button-block').cloneNode(true));
        document.querySelector('.return-button-block').addEventListener('click', handleReturnButtonClick);
        DYNAMIC_BLOCK.appendChild(AUTHORIZATION_INPUT_TEMPLATE.content.querySelector('.authorization-input-block').cloneNode(true));
        DYNAMIC_BLOCK.appendChild(LOGIN_BUTTON_TEMPLATE.content.querySelector('.login-button-block').cloneNode(true));
        document.querySelector('.login-button-block').addEventListener('click', handleLoginButtonClick);
    }

    function handleLoginButtonClick() {
        httpRequests.httpPost('/login', JSON.stringify({
            username: document.forms[0].elements[0].value,
            password: document.forms[0].elements[1].value,
        })).then(value => {
            user = JSON.parse(value);
            if (user) {
                sessionStorage.setItem('user', value);
                appendArticles(ARTICLES_INDEX_FROM, ARTICLES_INDEX_TO);
            } else {
                alert('Неверный логин или пароль.');
            }
        }).catch(error => {
            errorForm.loadError('Ошибка загрузки с сервера.');
        });
    }

    return {
        loadForm,
    };
}());

const editForm = (function () {
    const DYNAMIC_BLOCK = document.querySelector('.dynamic-block');
    const EDIT_FORM_TEMPLATE = document.querySelector('#template-edit-form');
    const RETURN_BUTTON_TEMPLATE = document.querySelector('#template-return-button');
    let article = {};
    let articlesLength;
    let tags;

    function loadEditForm(id) {
        DYNAMIC_BLOCK.innerHTML = '';
        DYNAMIC_BLOCK.appendChild(RETURN_BUTTON_TEMPLATE.content.querySelector('.return-button-block').cloneNode(true));
        Promise.all([httpRequests.httpGet('/length'), httpRequests.httpGet('/tags')]).then(value => {
            tags = JSON.parse(value[1]);
            if (id) {
                document.querySelector('.feed').textContent = 'Редактирование новости';
                DYNAMIC_BLOCK.appendChild(loadExistentArticle(id));
            } else {
                document.querySelector('.feed').textContent = 'Добавление новости';
                articlesLength = JSON.parse(value[0]);
                DYNAMIC_BLOCK.appendChild(loadNewArticle());
            }
            document.querySelector('.return-button-block').addEventListener('click', handleReturnButtonClick);
            document.querySelector('.add-article-button-block').addEventListener('click', handleAddChangeArticleConfirmClick);
            document.querySelector('.existent-tags-list').addEventListener('click', handleExistentTagClick);
            document.querySelector('.add-tag-button').addEventListener('click', handleAddTagButtonClick);
        }).catch(error => {
            errorForm.loadError('Ошибка загрузки с сервера.');
        });
    }

    function loadExistentArticle(id) {
        article = articlesService.getArticle(id);
        EDIT_FORM_TEMPLATE.content.querySelector('.id-edit').textContent = article.id;
        EDIT_FORM_TEMPLATE.content.querySelector('.author-edit').textContent = article.author;
        EDIT_FORM_TEMPLATE.content.querySelector('.date-edit').textContent = dateToString(article.createdAt);
        EDIT_FORM_TEMPLATE.content.querySelector('#title-input').textContent = article.title;
        EDIT_FORM_TEMPLATE.content.querySelector('#tag-input').textContent = '';
        EDIT_FORM_TEMPLATE.content.querySelector('#summary-input').textContent = article.summary;
        EDIT_FORM_TEMPLATE.content.querySelector('#content-input').textContent = article.content;
        EDIT_FORM_TEMPLATE.content.querySelector('.add-article-button').textContent = 'Принять изменения';
        loadExistentTags(EDIT_FORM_TEMPLATE.content);
        return EDIT_FORM_TEMPLATE.content.querySelector('.edit-form').cloneNode(true);
    }

    function loadNewArticle() {
        article.tags = [];
        EDIT_FORM_TEMPLATE.content.querySelector('.id-edit').textContent = articlesLength + 1;
        EDIT_FORM_TEMPLATE.content.querySelector('.author-edit').textContent = user;
        EDIT_FORM_TEMPLATE.content.querySelector('.date-edit').textContent = dateToString(new Date());
        EDIT_FORM_TEMPLATE.content.querySelector('#title-input').textContent = '';
        EDIT_FORM_TEMPLATE.content.querySelector('#tag-input').textContent = '';
        EDIT_FORM_TEMPLATE.content.querySelector('#summary-input').textContent = '';
        EDIT_FORM_TEMPLATE.content.querySelector('#content-input').textContent = '';
        EDIT_FORM_TEMPLATE.content.querySelector('.add-article-button').textContent = 'Добавить новость в ленту';
        loadExistentTags(EDIT_FORM_TEMPLATE.content);
        return EDIT_FORM_TEMPLATE.content.querySelector('.edit-form').cloneNode(true);
    }

    function loadExistentTags(existentTagsList) {
        const EXISTENT_TAGS_LIST = existentTagsList.querySelector('.existent-tags-list');
        const EXISTENT_TAG_TEMPLATE = document.querySelector('#template-existent-tag');
        const CHOSEN_TAG_TEMPLATE = document.querySelector('#template-chosen-tag');
        EXISTENT_TAGS_LIST.innerHTML = '';
        tags.forEach((tag) => {
            if (article.tags.indexOf(tag) !== -1) {
                CHOSEN_TAG_TEMPLATE.content.querySelector('.chosen-tag').textContent = tag;
                EXISTENT_TAGS_LIST.appendChild(CHOSEN_TAG_TEMPLATE.content.querySelector('.tag-holder').cloneNode(true));
            } else {
                EXISTENT_TAG_TEMPLATE.content.querySelector('.tag').textContent = tag;
                EXISTENT_TAGS_LIST.appendChild(EXISTENT_TAG_TEMPLATE.content.querySelector('.tag-holder').cloneNode(true));
            }
        });
    }

    function handleAddChangeArticleConfirmClick() {
        article.id = document.querySelector('.id-edit').textContent;
        article.author = document.querySelector('.author-edit').textContent;
        article.createdAt = article.createdAt || new Date();
        article.title = document.querySelector('#title-input').value;
        article.summary = document.querySelector('#summary-input').value;
        article.content = document.querySelector('#content-input').value;
        if (articlesService.validateArticle(article)) {
            if (articlesService.getArticle(article.id)) {
                httpRequests.httpPut('/article', JSON.stringify(article)).then(() => {
                    articlesService.resetArticles();
                    appendArticles(ARTICLES_INDEX_FROM, ARTICLES_INDEX_TO);
                }).catch(error => {
                    errorForm.loadError('Ошибка загрузки с сервера.');
                });
            } else {
                httpRequests.httpPost('/article', JSON.stringify(article)).then(() => {
                    articlesService.resetArticles();
                    appendArticles(ARTICLES_INDEX_FROM, ARTICLES_INDEX_TO);
                }).catch(error => {
                    errorForm.loadError('Ошибка загрузки с сервера.');
                });
            }
        } else {
            alert('Некорректная новость!');
        }
    }

    function handleExistentTagClick(event) {
        if (event.target.classList.contains('tag')) {
            if (article.tags.length < 5) {
                article.tags.push(event.target.textContent);
                event.target.classList.remove('tag');
                event.target.classList.add('chosen-tag');
            } else {
                alert('Невозможно добавить тег!');
            }
        } else if (event.target.classList.contains('chosen-tag')) {
            article.tags.splice(article.tags.indexOf(event.target.textContent), 1);
            event.target.classList.remove('chosen-tag');
            event.target.classList.add('tag');
        }
    }

    function handleAddTagButtonClick() {
        let newTag;
        if (document.querySelector('#tag-input').value.trim() !== '' && tags.indexOf(document.querySelector('#tag-input').value) === -1) {
            newTag = document.querySelector('#tag-input').value;
            document.querySelector('#tag-input').value = '';
            Promise.all([httpRequests.httpPost('/tag', JSON.stringify({ newTag })), httpRequests.httpGet('/tags')]).then(value => {
                tags = JSON.parse(value[1]);
                articlesService.setTags(tags);
                loadExistentTags(document);
            }).catch(error => {
                errorForm.loadError('Ошибка загрузки с сервера.');
            });
        } else if (tags.indexOf(document.querySelector('#tag-input').value) !== -1) {
            alert('Данный тег уже существует.');
        }
    }

    function dateToString(date) {
        return `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()} ${date.getHours()}:${
            date.getMinutes()}`;
    }

    return {
        loadEditForm,
    };
}());

const errorForm = (function () {
    const DYNAMIC_BLOCK = document.querySelector('.dynamic-block');
    const RETURN_BUTTON_TEMPLATE = document.querySelector('#template-return-button');
    const ERROR_TEMPLATE = document.querySelector('#template-error');

    function loadError(error) {
        DYNAMIC_BLOCK.innerHTML = '';
        document.querySelector('.feed').textContent = 'Ошибка';
        DYNAMIC_BLOCK.appendChild(RETURN_BUTTON_TEMPLATE.content.querySelector('.return-button-block').cloneNode(true));
        document.querySelector('.return-button-block').addEventListener('click', handleReturnButtonClick);
        ERROR_TEMPLATE.content.querySelector('.error').textContent = 'Ошибка: ' + error;
        DYNAMIC_BLOCK.appendChild(ERROR_TEMPLATE.content.querySelector('.error-block').cloneNode(true));
    }

    return {
        loadError,
    };
}());

function appendArticles(from, to) {
    articlesLogic.headerConfig();
    document.querySelector('.dynamic-block').innerHTML = '';
    Promise.all([httpRequests.httpGet('/article'), httpRequests.httpGet('/tags')]).then(values => {
        articlesService.setArticles(JSON.parse(values[0], (key, value) => {
            if (key === 'createdAt') {
                return new Date(value);
            }
            return value;
        }));
        articlesService.setTags(JSON.parse(values[1]));
        articlesLogic.appendArticles(articlesService.getArticles(from, to, JSON.parse(sessionStorage.getItem('filters'), (key, value) => {
            if (key === 'dateFrom' || key === 'dateTo') {
                return new Date(value);
            }
            return value;
        })));
    }).catch(error => {
        errorForm.loadError('Ошибка загрузки с сервера.');
    });
}

function handleReturnButtonClick() {
    appendArticles(ARTICLES_INDEX_FROM, ARTICLES_INDEX_TO);
}

function handleLoginLogoutClick(event) {
    if (event.target.textContent === 'Выйти') {
        sessionStorage.removeItem('user');
        user = JSON.parse(sessionStorage.getItem('user'));
        appendArticles(ARTICLES_INDEX_FROM, ARTICLES_INDEX_TO);
    } else {
        authorizationForm.loadForm();
    }
}

function handleAddArticleClick() {
    editForm.loadEditForm();
}

function handlePaginatorClick(event) {
    if (event.target.textContent.includes('Далее')) {
        ARTICLES_INDEX_FROM += 10;
        ARTICLES_INDEX_TO += 10;
    }
    if (event.target.textContent.includes('Назад')) {
        ARTICLES_INDEX_FROM -= 10;
        ARTICLES_INDEX_TO -= 10;
    }
    appendArticles(ARTICLES_INDEX_FROM, ARTICLES_INDEX_TO);
}

function handleArticleViewButtonClick(event) {
    articleView.loadArticle(event.target.parentNode.parentNode.dataset.id);
}

function handleArticleEditButtonClick(event) {
    editForm.loadEditForm(event.target.parentNode.parentNode.dataset.id);
}

function handleArticleDeleteButtonClick(event) {
    httpRequests.httpDeleteArticle(event.target.parentNode.parentNode.dataset.id)
        .then(appendArticles(ARTICLES_INDEX_FROM, ARTICLES_INDEX_TO))
        .catch(error => {
            errorForm.loadError('Ошибка загрузки с сервера.');
        });
}

document.addEventListener('FeedLoader', appendArticles(ARTICLES_INDEX_FROM, ARTICLES_INDEX_TO));

document.querySelector('.login-logout-button').addEventListener('click', handleLoginLogoutClick);