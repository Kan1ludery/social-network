export const cardDataRu = [{
    title: 'О сайте',
    description: 'Добро пожаловать! Эта социальная сеть отражает мой путь в веб-разработке. Это место, где я выражаю свои навыки и опыт, стремясь продемонстрировать свои способности через этот проект. \n' +
        'Мой веб-проект — это онлайн-платформа для обмена сообщениями, поиска новостей и общения с друзьями. Здесь можно сохранять любимые материалы, вести онлайн-диалоги c другими пользователями и настраивать профиль. Я создал этот сайт, чтобы люди могли легко общаться, находить интересные материалы и управлять своей страницей. \n' +
        'Я выбрал английский язык в разработке из-за его более широкого охвата и доступности для различных аудиторий. Поэтому в этом проекте будет преобладать исключительно английский язык.',
    technologies: [],
    imagePath: '/assets/img/homePage/about.gif',
    customStyles: {
        titleClass: 'aboutTitle',
        descriptionClass: 'aboutDescription',
        imageClass: 'aboutImage',
        contentClass: 'aboutContent'
    }
}, {
    title: 'Страница профиля',
    description: 'Эта страница предлагает базовый функционал для настройки вашего профиля. Здесь вы можете обновить свою фотографию, изменить описание и добавить ссылки на социальные сети. Я уверен, что эти функции помогут вам выразить свою уникальность на странице. И не смотря на отсутствие множества опций и вариативности, я рассматриваю это как отправную точку для дальнейшего развития сайта. ' +
        '\n Технологии, примененные на этой странице, включают Multer и FS для обработки файлов на сервере, а также использование JavaScript с использованием label на клиентской стороне для удобной загрузки изображений.',
    technologies: ['Multer', 'FS', 'JavaScript', 'LabelForm'],
    imagePath: '/assets/img/homePage/profile.gif',
    customStyles: {
        titleClass: 'profileTitle',
        descriptionClass: 'profileDescription',
        imageClass: 'profileImage',
        contentClass: 'profileContent'
    }
}, {
    title: 'Страница новостей',
    description: 'Сейчас над страницей News сейчас ведется активная разработка, чтобы обеспечить вас свежими и актуальными новостями. Скоро здесь появится что-то интересное!',
    technologies: [],
    imagePath: '/assets/img/homePage/workInProgress2.gif',
    customStyles: {
        "titleClass": "newsTitle",
        "descriptionClass": "newsDescription",
        "imageClass": "newsImage",
        "contentClass": "newsContent"
    }
}, {
    title: 'Страница сообщений',
    description: 'Страница Messages, где я впервые познакомился с сокетами, оказалась настоящим открытием. Здесь я активно использовал Redux, чтобы структурировать и управлять состоянием приложения. Основной упор был сделан на логику создания чатов, а также организацию онлайн переписки.\n' +
        'С помощью сокетов была реализована реальном времени передача сообщений, что позволило пользователям обмениваться мгновенными сообщениями без необходимости перезагрузки страницы. Помимо этого, я тщательно проработал логику запросов к серверу, адаптивность интерфейса и отображение онлайн статуса пользователей.\n' +
        'Работа над страницей Messages дала мне уникальный опыт в разработке реального времени и углубленное понимание принципов работы сокетов, а также использования Redux для эффективного управления состоянием приложения.',
    technologies: ['Express', 'Socket.io/ws', 'MongoDB', 'Cookies', 'JS'],
    imagePath: '/assets/img/homePage/message.gif',
    customStyles: {
        "titleClass": "messagesTitle",
        "descriptionClass": "messagesDescription",
        "imageClass": "messagesImage",
        "contentClass": "messagesContent"
    }
}, {
    title: 'Страница друзей',
    description: 'На странице Друзей вы увидите простой список ваших друзей. У вас будет возможность управлять ими, удалять и добавлять новых друзей. Также предусмотрена вкладка для поиска друзей по их имени или почте, чтобы удобно находить нужных пользователей и добавлять их в список друзей. Это простой, но эффективный способ управлять вашими контактами и поддерживать связь с теми, кто вам дорог.',
    technologies: ['REST', 'Socket.io', 'MongoDB'],
    imagePath: '/assets/img/homePage/friend.gif',
    customStyles: {
        cardClass: 'friendsCard',
        "titleClass": "friendsTitle",
        "descriptionClass": "friendsDescription",
        "imageClass": "friendsImage",
        "contentClass": "friendsContent"
    }
}, {
    title: 'Страница Сохраненное',
    description: 'Страница \'Saved Page\' находится в процессе активной разработки. Здесь вы сможете хранить и организовывать ваш любимый контент, делая его доступным для быстрого и удобного доступа в любое время. В этом разделе я работаю над функционалом, позволяющим сохранять ваши предпочтительные материалы, будь то статьи, изображения или другие интересные ресурсы, и создавать персонализированную библиотеку контента.',
    technologies: [],
    imagePath: '/assets/img/homePage/workInProgress1.gif',
    customStyles: {
        "titleClass": "savedTitle",
        "descriptionClass": "savedDescription",
        "imageClass": "savedImage",
        "contentClass": "savedContent"
    }
}, {
    title: 'Страница Настройки',
    description: 'И снова привет! Работа над страницей \'Settings Page\' в самом разгаре! Здесь я тружусь над созданием инструментов для вашего удобства. На этой странице вы сможете настраивать разные параметры вашего профиля и контролировать \'состояния на сайте\'. Представьте, вы сможете включать и выключать различные функции сайта, чтобы он лучше соответствовал вашим потребностям!',
    technologies: [],
    imagePath: '/assets/img/homePage/workInProgress3.gif',
    customStyles: {
        "titleClass": "settingsTitle",
        "descriptionClass": "settingsDescription",
        "imageClass": "settingsImage",
        "contentClass": "settingsContent"
    }
}, {
    title: 'Страница Выхода',
    description: 'На этой странице происходит важный процесс выхода пользователя из платформы. В рамках поддержания безопасности и обеспечения полного закрытия пользовательской сессии эта функциональность тщательно очищает различные пользовательские данные. Механизм выхода включает в себя удаление сохраненных токенов JWT, удаление содержимого локального хранилища и стирание соответствующих файлов cookie.\n' +
        'Тщательно удаляя эти артефакты аутентификации и сохраненную информацию, страница выхода обеспечивает тщательное завершение сеанса пользователя, защищая его конфиденциальность и предотвращая несанкционированный доступ к конфиденциальным данным. Этот тщательный процесс соответствует нашему стремлению обеспечить безопасный и надежный пользовательский опыт, ставя во главу угла конфиденциальность данных и безопасность пользователей".\n',
    technologies: ['Cookie', 'Storage', 'Auth'],
    imagePath: '/assets/img/homePage/logout.gif',
    customStyles: {
        "cardClass": "logoutCard",
        "titleClass": "logoutTitle",
        "descriptionClass": "logoutDescription",
        "imageClass": "logoutImage",
        "contentClass": "logoutContent"
    }
}, {
    title: 'Финальная страница',
    description: 'Спасибо, что посетили мою последнюю страницу!\n' +
        'Я ценю, что вы нашли время, чтобы изучить мою платформу и добраться до этого конечного пункта назначения. Ваш интерес и участие очень много значат для меня.\n' +
        'Я надеюсь, что ваше путешествие по моему сайту было приятным и познавательным. Не стесняйтесь продолжать знакомство или обращаться ко мне, если у вас возникнут вопросы или идеи!\n' +
        'Спасибо, что стали частью моего опыта. Хорошего дня и приятного времяпрепровождения!',
    technologies: [],
    imagePath: '/assets/img/homePage/final.gif',
    customStyles: {
        "titleClass": "finalTitle",
        "descriptionClass": "finalDescription",
        "imageClass": "finalImage",
        "contentClass": "finalContent"
    }
}

];