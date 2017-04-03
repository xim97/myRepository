'use strict';
let user = '1';
var articles = [
    {
        id: '1',
        title: 'ЕК одобрила выделение Венгрии средств на строительство блоков АЭС',
        summary: 'Еврокомиссия одобрила финансирование строительства двух новых блоков АЭС «Пакш» в Венгрии.',
        createdAt: new Date('2015-03-20T14:12:30'),
        author: 'aaa',
        tags: ['ЕС', 'Россия', 'Энергетика', 'Европа'],
        content: 'Еврокомиссия одобрила финансирование строительства двух новых блоков АЭС «Пакш» в Венгрии.' +
        'Реализация проекта, в котором принимает участие Россия, была приостановлена на три года из-за требований ЕС предоставить гарантии' +
        'сохранения конкуренции в секторе энергетики. Об этом сообщает Associated Press.' +
        ' Как отмечается, после того как Будапешт выполнил данное требование, комиссия приняла решение одобрить предоставление инвестиций. ' +
        ' Премьер-министр Венгрии Виктор Орбан заявил, что он надеется на то, что строительство начнётся в самое ближайшее время. ' +
        ' В ноябре 2016 года Еврокомиссия одобрила проект строительства АЭС «Пакш» в Венгрии с участием России. ' +
        ' В конце 2014 года Россия и Венгрия подписали документы на постройку пятого и шестого блоков венгерской АЭС «Пакш» с реакторами по российской технологии ВВЭР-1200.' +
        ' Уточняется, что на проект Россия выделит кредит в размере €10 млрд.'
    },
    {
        id: '2',
        title: 'Международный суд ООН начал слушания по иску Украины к России',
        summary: 'Международный суд ООН начал слушания по иску Украины к России. Отмечается, что слушания продлятся четыре дня.',
        createdAt: new Date('2015-03-20T15:11:20'),
        author: 'bbb',
        tags: ['Киев', 'ООН', 'Россия', 'Суд', 'Украина'],
        content: 'Украина представит аргументы 6 и 8 марта, Россия — 7 и 9 марта.' +
        ' Ранее президент Украины Пётр Порошенко заявил, что Киев намерен представить в суде ООН в Гааге доказательства преступлений,' +
        ' якобы совершённых Россией. По его словам, это исторический момент.' +
        ' Украинские власти утверждают, что Москва нарушила две конвенции — о борьбе с финансированием терроризма и о ликвидации' +
        ' всех форм расовой дискриминации. В Москве считают, что Киев ищет повод для обращения против России в международные судебные инстанции.'
    },
    {
        id: '3',
        title: 'В Кремле заявили об обеспокоенности ракетным пуском КНДР',
        summary: 'Пресс-секретарь президента России Дмитрий Песков заявил, что в Кремле обеспокоены ракетным пуском со стороны КНДР.',
        createdAt: new Date('2015-03-20T16:10:09'),
        author: 'ccc',
        tags: ['Дмитрий Песков', 'КНДР', 'Кремль', 'Северная Корея', 'Азия'],
        content: '«Что касается пусков из КНДР, безусловно, мы серьёзно обеспокоены. Это те действия, которые ведут к дальнейшему росту напряжённости в регионе»,' +
        '— сказал Песков. По его словам, Москва призывает все стороны к сдержанности и готова вести обмен мнениями с заинтересованными странами. ' +
        ' Ранее сообщалось, что 6 марта КНДР провела пуски четырёх ракет, предположительно нового типа, три из которых упали в исключительной экономической' +
        'зоне Японии. Данные действия властей Северной Кореи уже осудили в Токио, Вашингтоне и Пекине. '
    },
    {
        id: '4',
        title: 'Ведущий BBC в беседе с Яценюком усомнился в успехе его деятельности на посту премьера',
        summary: 'Бывший премьер-министр Украины Арсений Яценюк заявил, что ему в качестве главы кабмина удалось помочь стране, в том числе в области борьбы с коррупцией.',
        createdAt: new Date('2015-03-20T17:29:08'),
        author: 'ddd',
        tags: ['Арсений Яценюк', 'В мире', 'Владимир Путин', 'Украина'],
        content: '«Мы многого достигли», — сказал Яценюк в эфире программы HARDtalk на BBC со Стивеном Сакуром.' +
        ' Ведущий программы поинтересовался, действительно ли политик в это верит, на что Яценюк ответил утвердительно. ' +
        ' «Потому что украинский народ — нет», — пояснил Сакур. ' +
        ' Журналист напомнил бывшему премьеру, что рейтинги его правительства были крайне низкими. Яценюк объяснил этот факт ведущейся против него кампанией.' +
        ' Ранее сообщалось, что Яценюк рассмешил ведущего BBC заявлением о Путине. '
    },
    {
        id: '5',
        title: 'Специалисты назвали даты сильнейших магнитных бурь в марте',
        summary: 'Специалисты сообщили, что в начале весны ожидается сильная магнитная буря, передаёт ФБА «Экономика сегодня».',
        createdAt: new Date('2015-03-20T18:28:07'),
        author: 'eee',
        tags: ['Россия', 'Здоровье', 'Земля', 'Медицина'],
        content: 'Сильнейшие магнитные бури пройдут 16,17 и 23 марта. ' +
        ' Отмечается, что волнения на Солнце могут привести к сильным магнитным колебаниям,которые повредят электромагнитную сферу Земли, ' +
        'в связи с чем у некоторых людей может ухудшиться самочувствие. ' +
        'Особое внимание на своё здоровье стоит обратить людям, которые страдают сердечно-сосудистыми заболеваниями и гипертонией.'
    },
    {
        id: '6',
        title: 'RT на русском попал в тройку лидеров топ-30 рейтинга цитируемости СМИ',
        summary: 'Сайт RT на русском занял третье место в интегральном рейтинге цитируемости российских СМИ за февраль 2017 года. Результаты исследования опубликованы Brand Analytics.',
        createdAt: new Date('2015-03-20T19:27:06'),
        author: 'fff',
        tags: ['Россия', 'СМИ', 'Социальные сети', 'RT'],
        content: 'Лидером рейтинга топ-30 российских СМИ по цитируемости в медиа признали РИА Новости, второе место заняло агентство ТАСС,' +
        ' на третьем месте оказался сайт RT на русском. Замыкают пятёрку лидеров новостные порталы life.ru и «Лента.Ру» ' +
        ' При этом RT на русском стал лидером в рейтинге среди сайтов телеканалов. По цитируемости в соцсетях RT на русском занял второе место. ' +
        ' Исследование проведено аналитическим центром Brand Analytics в феврале 2017 года. ' +
        ' Отмечается, что для расчёта рейтинга были проанализированы 977 554 025 русскоязычных сообщений соцмедиа и 9,3 млн материалов СМИ.'
    },
    {
        id: '7',
        title: 'МИД Китая выступил против пусков ракет КНДР',
        summary: 'Официальный представитель МИД Китая Гэн Шуан заявил, что Пекин выступает против пусков ракет КНДР.',
        createdAt: new Date('2015-03-20T20:26:05'),
        author: 'ggg',
        tags: ['Азия', 'КНДР', 'Китай', 'Ракета', 'Госдеп США'],
        content: '«Что касается пусков со стороны КНДР, мы видели информацию. <…> Китай выступает против пусков со стороны КНДР,' +
        ' совершённых в нарушение резолюции Совета безопасности ООН», — цитирует РИА Новости Гэн Шуана. ' +
        ' Ранее сообщалось, что 6 марта КНДР провела пуски четырёх ракет, предположительно, нового типа, три из которых упали в исключительной' +
        ' экономической зоне Японии. В Госдепе заявили о недопустимости провокаций со стороны КНДР.'
    },
    {
        id: '8',
        title: 'Сербский пловец поинтересовался у Фелпса, почему его не заботили проблемы допинга раньше',
        summary: 'Бывший сербский пловец Милорад Чавич прокомментировал последние заявления 23-кратного олимпийского чемпиона американца Майкла Фелпса по поводу допинга.',
        createdAt: new Date('2015-03-20T21:25:04'),
        author: 'aaa',
        tags: ['Майкл Фелпс', 'Плавание', 'США', 'Спорт'],
        content: '«Дорогой Майкл! Допинг всегда был проблемой, и лучше ситуация не становится. Всех проверяют, кого-то чаще, чем других.' +
        ' Я помню, что Лэнса Армстронга однажды проверили три раза за один день. У него ничего не нашли. Бывает, что появляются новые виды допинга,' +
        ' которые мы пока не можем выявить», — написал Чавич в Twitter. Серб также поинтересовался, почему Фелпс стал ярым реформатором' +
        ' только после того, как закончил карьеру. «Почему раньше ты не поддерживал идею биопаспортов? Я этого не понимаю. Не хочу сказать,' +
        ' что ты всех обманывал. Безусловно, ты упорно тренировался и заслуженно прогрессировал, но то, как быстро ты восстанавливался, лежит' +
        ' в области научной фантастики. Хотелось бы мне знать, как ты это делал. Тем не менее надеюсь, ты преуспеешь в нынешней борьбе' +
        ' с допингом», — закончил послание Чавич. Ранее хакерская группировка Fancy Bears предоставила RT документы, из которых стало известно,' +
        ' что именно Фелпс принимал во время соревнований.'
    },
    {
        id: '9',
        title: 'В Анкаре арестована связанная с убийцей посла Карлова россиянка',
        summary: 'В Анкаре арестована гражданка России, которая была связана с убийцей российского посла в Турции Андрея Карлова Мевлютом Мертом Алтынташем.',
        createdAt: new Date('2015-03-20T22:24:04'),
        author: 'aaa',
        tags: ['Россия', 'СМИ', 'Турция', 'Убийство'],
        content: 'Отмечается, что арестованной оказалась 33-летняя россиянка по имени Екатерина. Следствие подозревает, что она поддерживала телефонные' +
        ' контакты с Алтынташем до конца ноября, а также общалась с ним через мессенджер WhatsApp. ' +
        ' По данным газеты, россиянка занималась проституцией в пятизвёздочных отелях в Анкаре. ' +
        ' Посол России в Турции Андрей Карлов был убит 19 декабря в Анкаре во время выступления на выставке в Центре современного искусства. ' +
        ' Его убийца, 22-летний бывший полицейский Мевлют Мерт Алтынташ, был ликвидирован полицией на месте.'
    },
    {
        id: '10',
        title: 'Рубль снижается к доллару и евро',
        summary: 'Курс рубля в начале дня снижается по отношению к доллару и евро. Об этом свидетельствуют данные биржи.',
        createdAt: new Date('2015-03-20T23:23:03'),
        author: 'ccc',
        tags: ['Рубль', 'Финансы', 'Биржа', 'В России', 'Курс доллара'],
        content: 'Курс доллара в начале торгов рос на 8 копеек — до 58,31 рубля. Курс евро вырос на 7 копеек — до 61,81 рубля.'
    },
    {
        id: '11',
        title: 'Столичным водителям рекомендуют не спешить со сменой зимней резины',
        summary: 'Московским водителям рекомендуют не спешить с заменой зимней резины на летнюю, так как в ближайшую неделю в городе ожидаются осадки и ночные заморозки.',
        createdAt: new Date('2015-03-21T12:32:02'),
        author: 'kkk',
        tags: ['Москва', 'Транспорт', 'Погода'],
        content: 'Об этом заявил руководитель Центра организации дорожного движения правительства Москвы (ЦОДД) Вадим Юрьев.' +
        ' «Смена сезонов — едва ли не самый опасный период для участников дорожного движения. Применение зимней резины в холодные месяцы года' +
        ' — это важный фактор безопасности», — цитирует Юрьева официальный портал мэра и правительства Москвы. ' +
        ' Он также призвал не торопиться с открытием мотосезона, так как погода в Москве постоянно меняется и на дорогах,' +
        ' особенно утром, может возникать гололедица.'
    },
    {
        id: '12',
        title: 'ИГ выступило с угрозой в адрес Китая',
        summary: 'Террористическая группировка «Исламское государство» записала видеообращение к властям Китая, в котором пригрозила стране кровопролитием.',
        createdAt: new Date('2015-03-21T14:41:01'),
        author: 'ddd',
        tags: ['ИГ', 'Китай', 'Терроризм'],
        content: 'В видеоролике, смонтированном боевиками, портрет председателя КНР Си Цзиньпина превращается в поток пламени,' +
        ' а Китаю угрожают пролитием «рек крови». Об этом сообщает РИА Новости. В 2015 году ИГ публиковало обращение на уйгурском языке' +
        ' с призывом к мусульманам Китая отправляться на войну в Сирию. Ранее СМИ сообщали, что лидер ИГ Абу Бакр аль-Багдади обратился' +
        ' к своим сторонникам с прощальной речью.'
    }
];
localStorage.setItem('articles', JSON.stringify(articles));
var tags = ['ЕС', 'Россия', 'Энергетика', 'Европа', 'Киев', 'ООН', 'Суд', 'Украина', 'Дмитрий Песков', 'КНДР', 'Кремль', 'Северная Корея', 'Азия',
    'Арсений Яценюк', 'В мире', 'Владимир Путин', 'Здоровье', 'Земля', 'Медицина', 'СМИ', 'Социальные сети', 'RT',
    'КНДР', 'Китай', 'Ракета', 'Госдеп США', 'Майкл Фелпс', 'Плавание', 'США', 'Спорт', 'Турция', 'Убийство',
    'Рубль', 'Финансы', 'Биржа', 'В России', 'Курс доллара', 'Москва', 'Транспорт', 'Погода', 'ИГ', 'Китай', 'Терроризм'];
localStorage.setItem('tags', JSON.stringify(tags));
let articlesModel = (function () {
        let articles = [];
        articles = JSON.parse(localStorage.getItem('articles'), function (key, value) {
            if (key === 'createdAt') return new Date(value);
            return value;
        });
        let tags = JSON.parse(localStorage.getItem('tags'));
        console.log(articles);
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
        console.log(article);
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
        alert("Неверно введён логин или пароль");
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
