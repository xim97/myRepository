var articleModel = (function () {
    var articles = [
	{
	id: '1',
    title: 'ЕК одобрила выделение Венгрии средств на строительство блоков АЭС',
    summary: 'Еврокомиссия одобрила финансирование строительства двух новых блоков АЭС «Пакш» в Венгрии.',
    createdAt: new Date('2015-03-20T14:00:00'),
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
    createdAt: new Date('2015-03-20T15:00:00'),
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
    createdAt: new Date('2015-03-20T16:00:00'),
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
    createdAt: new Date('2015-03-20T17:00:00'),
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
    createdAt: new Date('2015-03-20T18:00:00'),
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
    createdAt: new Date('2015-03-20T19:00:00'),
    author: 'fff',
    tags: ['Россия', 'СМИ', 'Социальные сети', 'RT'],
    content: 'Лидером рейтинга топ-30 российских СМИ по цитируемости в медиа признали РИА Новости, второе место заняло агентство ТАСС,'+
    		' на третьем месте оказался сайт RT на русском. Замыкают пятёрку лидеров новостные порталы life.ru и «Лента.Ру» ' +
    		' При этом RT на русском стал лидером в рейтинге среди сайтов телеканалов. По цитируемости в соцсетях RT на русском занял второе место. ' +
    		' Исследование проведено аналитическим центром Brand Analytics в феврале 2017 года. ' +
    		' Отмечается, что для расчёта рейтинга были проанализированы 977 554 025 русскоязычных сообщений соцмедиа и 9,3 млн материалов СМИ.'  	
  	},
  	{
	id: '7',
    title: 'МИД Китая выступил против пусков ракет КНДР',
    summary: 'Официальный представитель МИД Китая Гэн Шуан заявил, что Пекин выступает против пусков ракет КНДР.',
    createdAt: new Date('2015-03-20T20:00:00'),
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
    createdAt: new Date('2015-03-20T21:00:00'),
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
    createdAt: new Date('2015-03-20T22:00:00'),
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
    createdAt: new Date('2015-03-20T23:00:00'),
    author: 'ccc',
    tags: ['Рубль', 'Финансы', 'Биржа', 'В России', 'Курс доллара'],
    content: 'Курс доллара в начале торгов рос на 8 копеек — до 58,31 рубля. Курс евро вырос на 7 копеек — до 61,81 рубля.'  	
  	},
  	{
	id: '11',
    title: 'Столичным водителям рекомендуют не спешить со сменой зимней резины',
    summary: 'Московским водителям рекомендуют не спешить с заменой зимней резины на летнюю, так как в ближайшую неделю в городе ожидаются осадки и ночные заморозки.',
    createdAt: new Date('2015-03-21T1:00:00'),
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
    summary: 'Террористическая группировка «Исламское государство»* записала видеообращение к властям Китая, в котором пригрозила стране кровопролитием.',
    createdAt: new Date('2015-03-21T14:00:00'),
    author: 'ddd',
    tags: ['ИГ', 'Китай', 'Терроризм'],
    content: 'В видеоролике, смонтированном боевиками, портрет председателя КНР Си Цзиньпина превращается в поток пламени,' +
    		' а Китаю угрожают пролитием «рек крови». Об этом сообщает РИА Новости. В 2015 году ИГ публиковало обращение на уйгурском языке' +
    		' с призывом к мусульманам Китая отправляться на войну в Сирию. Ранее СМИ сообщали, что лидер ИГ Абу Бакр аль-Багдади обратился' +
    		' к своим сторонникам с прощальной речью.'  	
  	}
    ];
    var tags = ['ЕС', 'Россия', 'Энергетика', 'Европа', 'Киев', 'ООН', 'Суд', 'Украина', 'Дмитрий Песков', 'КНДР', 'Кремль', 'Северная Корея', 'Азия',
			'Арсений Яценюк', 'В мире', 'Владимир Путин', 'Здоровье', 'Земля', 'Медицина', 'СМИ', 'Социальные сети', 'RT',
			'КНДР', 'Китай', 'Ракета', 'Госдеп США', 'Майкл Фелпс', 'Плавание', 'США', 'Спорт', 'Турция', 'Убийство',
			'Рубль', 'Финансы', 'Биржа', 'В России', 'Курс доллара', 'Москва', 'Транспорт', 'Погода', 'ИГ', 'Китай', 'Терроризм'];
    function getArticles(skip, top, filterConfig){		
	if (!Number.isFinite(skip)){
		skip = 0;
	}
	if (!Number.isFinite(top)){
		top = 10;
	}	
	return articles.filter(function(currentArticle){
		var result = true;		
		
		if (filterConfig !== undefined){
			if (filterConfig.author !== undefined){
				result = (currentArticle.author == filterConfig.author);
			}
			if (filterConfig.dateFrom !== undefined) {		
				result = result && currentArticle.createdAt.getTime() >= (filterConfig.dateFrom).getTime();		
						
			}
			if (filterConfig.dateTo !== undefined) {
				
				result = result && currentArticle.createdAt.getTime() <= (filterConfig.dateTo).getTime();	
			}
			if (filterConfig.tags !== undefined && filterConfig.tags.length != 0){
				result = result && filterConfig.tags.every(function(currentTag){
					return currentArticle.tags.indexOf(currentTag) >= 0;
				});
			}
		}
	return result;
	}).sort(function (a, b){
        return b.createdAt.getTime() - a.createdAt.getTime();
    }).slice(skip, skip + top);	
    }
    function getArticle(findId){
	return articles.filter(function (currentArticle) {
        return currentArticle.id == findId;
    })[0];
    }
    function validateArticle(article) {
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
        })){
        return false;
    } else {
        return true;
    }
    }
    function editArticle(editId, newArticle) {
    var editIndex = articles.indexOf(getArticle(editId));
    if(!validateArticle(newArticle) || editIndex == -1) {
        return false;
    }
    if (newArticle.title != undefined) {
        articles[editIndex].title = newArticle.title;
    }
    if (newArticle.summary != undefined) {
        articles[editIndex].summary = newArticle.summary;
    }
    if (newArticle.tags != undefined) {
        articles[editIndex].tags = newArticle.tags;
    }
    if (newArticle.content != undefined) {
        articles[editIndex].content = newArticle.content;
    }
    return true;
    }
    function addArticle(newArticle) {
    var previousSize = articles.length;
    if(!validateArticle(newArticle)) {
        return false;
    } else if(previousSize != articles.push(newArticle)) {
        return true;
    } else {
        return false;
    }
    }
    function removeArticle(removeId) {
    var removeIndex = articles.indexOf(getArticle(removeId));
    if (removeIndex != -1) {
        articles.splice(removeIndex, 1);
        return true;
    } else {
        return false;
    }
    }
    function addTag(newTag){
	var previousSize = tags.length;
	if (newTag !== undefined){
		if (previousSize == tags.push(newTag)){
			return false
		} else{
			return true;
		}
	} else {
		return false;
	}
    }
    function removeTag(removeTag){
	var removeIndex = tags.indexOf(removeTag);
	if (removeIndex != -1){
		tags.splice(removeIndex, 1);
		return true;
	} else{
		return false;
	}
    }
return {
        getArticles: getArticles,
        getArticle: getArticle,
        validateArticle: validateArticle,
        addArticle: addArticle,
        removeArticle: removeArticle,
        editArticle: editArticle
    };
}());
var validArticle1 = {
    id: '21',
    title: 'asssssssssfdsfsdfsd',
    summary: 'dsfsdfsdfsdfds',
    createdAt: new Date(),
    author: 'dfdsfs',
    tags: ['Россия', 'США', 'СМИ'],
    content: 'sdfsdfsdfsdf'
};
var validArticle2 = {
    title: 'asdfasdfa',
    summary: 'hdfghghg',
    createdAt: new Date(),
    author: 'tdrbvsf',
    tags: ['Россия', 'США', 'СМИ'],
    content: 'dtdffgdfg'
};
var invalidArticle1 = {
	id: '20',
	title: 'asdf',
	summary: 'asdfasdfasdf',
	createdAt: new Date(),
	tags:['asdf']	 
};
var invalidArticle2 = {
	id: '23',
	title: '2',
	summary: ''
};
console.log('getArticle(validData)');
console.log(getArticle('2'));
console.log('getArticle(invalidData)');
console.log(getArticle('323'));

console.log('validateArticle(validData)');
console.log(validateArticle(getArticle('2')));
console.log('validateArticle(invalidData)');
console.log(validateArticle(invalidArticle1));

console.log('articles length before adding validArticle:' + articles.length);
console.log('addArticle(validArticle) = ' + addArticle(validArticle1));
console.log('articles length after adding validArticle:' + articles.length);
console.log('addArticle(invalidArticle) = ' + addArticle(invalidArticle2));
console.log('articles length after adding invalidArticle:' + articles.length);

console.log('article with id = 2 before editing');
console.log(getArticle('2'));
console.log('editArticle(validData) = ' + editArticle('2', validArticle2));
console.log('article with id = 2 after valid editing');
console.log(getArticle('2'));
console.log('editArticle(invalidId) = ' + editArticle('323', validArticle2));
console.log('article with id = 2 after invalid editing');
console.log(getArticle('2'));
console.log('editArticle(invalidArticle) = ' + editArticle('2', invalidArticle2));
console.log('article with id = 2 after invalid editing');
console.log(getArticle('2'));

console.log('articles length before removing validArticle:' + articles.length);
console.log('removeArticle(validArticle) = ' + removeArticle(validArticle1.id));
console.log('articles length after removing validArticle:' + articles.length);
console.log('removeArticle(invalidArticle) = ' + removeArticle('3333'));
console.log('articles length after removing invalidArticle:' + articles.length);

console.log('getArticles(0, 10)');
getArticles(0, 10).forEach(function (currentArticle) {
    console.log(currentArticle);
});
console.log('getArticles(10, 1)');
getArticles(10, 1).forEach(function (currentArticle) {
    console.log(currentArticle);
});
console.log('getArticles(0, 10, {author: \'aaa\'})');
getArticles(0, 10, {author: 'aaa'}).forEach(function(currentArticle) {
	console.log(currentArticle);
});
console.log('getArticles(0, 10, {author: \'aaa\', tags: [\'Россия\']})');
getArticles(0, 10, {author: 'aaa', tags: ['Россия']}).forEach(function(currentArticle) {
	console.log(currentArticle);
});
console.log('getArticles(0, 10, {author: \'aaa\', tags: [\'Россия\'], dateFrom: new Date(\'2015-03-20\')}, dateTo: new Date(\'2015-03-21\'))');
getArticles(0, 10, {author: 'aaa', tags: ['Россия'], dateFrom: new Date(2015, 2, 20), dateTo: new Date(2015, 2, 21)}).forEach(function(currentArticle) {
	console.log(currentArticle);
});
console.log('getArticles(0, 10, {author: \'fas3ad\'})');
getArticles(0, 10, {author: 'fas3ad'}).forEach(function(currentArticle) {
	console.log(currentArticle);
});