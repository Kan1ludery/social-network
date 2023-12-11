export const cardDataEn = [{
    title: 'About the Site',
    description: 'Welcome! This social network reflects my journey in web development. It is a place where I express my skills and experience in an effort to showcase my abilities through this project.\n'
        + 'My web project is an online platform for messaging, searching for news and communicating with friends. Here you can save your favorite content, message online with other people and and set up a profile. I created this site so that people can easily communicate, find interesting materials and manage their profile.\n'
        + 'I chose English in development because of its wider reach and accessibility to different audiences. Therefore, this project will be exclusively dominated by the English language.',
    technologies: [],
    imagePath: '/assets/img/homePage/about.gif',
    customStyles: {
        titleClass: 'aboutTitle',
        descriptionClass: 'aboutDescription',
        imageClass: 'aboutImage',
        contentClass: 'aboutContent'
    }
}, {
    title: 'Profile Page',
    description: "This page offers basic functionality to customize your profile. Here you can update your photo, change your description and add social media links. I'm sure these features will help you express your uniqueness on the page. And despite the lack of many options and variability, I see this as a starting point for further development of the site.\n" +
    "The technologies used on this page include Multer and FS for processing files on the server, and the use of JavaScript using client-side labeling for easy image uploading.",
    technologies: ['Multer', 'FS', 'JavaScript', 'LabelForm'],
    imagePath: '/assets/img/homePage/profile.gif',
    customStyles: {
        titleClass: 'profileTitle',
        descriptionClass: 'profileDescription',
        imageClass: 'profileImage',
        contentClass: 'profileContent'
    }
}, {
    title: 'News Page',
    description: 'The News page is currently under active development to provide you with fresh and relevant news. Something interesting will appear here soon!',
    technologies: [],
    imagePath: '/assets/img/homePage/workInProgress2.gif',
    customStyles: {
        titleClass: 'newsTitle',
        descriptionClass: 'newsDescription',
        imageClass: 'newsImage',
        contentClass: 'newsContent'
    }
}, {
    title: 'Messages Page',
    description: 'The Messages page, where I was first introduced to sockets, was a real eye-opener. Here I made heavy use of Redux to structure and manage the state of the application. The main focus was on the logic of creating chat rooms, as well as organizing online correspondence.\n' +
        "Real-time messaging was implemented using sockets, allowing users to exchange instant messages without having to reload the page. In addition, I carefully worked out the server request logic, interface adaptability and online status display. \n" +
        'Working on the Messages page gave me a unique experience in real-time development and an in-depth understanding of socket principles, as well as the use of Redux for efficient application state management.',
    technologies: ['Express', 'Socket.io/ws', 'MongoDB', 'Cookies', 'JS'],
    imagePath: '/assets/img/homePage/message.gif',
    customStyles: {
        titleClass: 'messagesTitle',
        descriptionClass: 'messagesDescription',
        imageClass: 'messagesImage',
        contentClass: 'messagesContent'
    }
}, {
    title: 'Friends Page',
    description: 'On the Friends page you will see a simple list of your friends. You will be able to manage them, delete and add new friends. There is also a tab to search for friends by name or mail, so you can easily find your friends and add them to your friends list. It\'s a simple yet effective way to manage your contacts and keep in touch with those you care about.',
    technologies: ['REST', 'Socket.io', 'MongoDB'],
    imagePath: '/assets/img/homePage/friend.gif',
    customStyles: {
        cardClass: 'friendsCard',
        titleClass: 'friendsTitle',
        descriptionClass: 'friendsDescription',
        imageClass: 'friendsImage',
        contentClass: 'friendsContent'
    }
}, {
    title: 'Saved Page',
    description: 'The Saved Page is under active development. Here you will be able to store and organize your favorite content, making it available for quick and easy access at any time. In this section, I\'m working on functionality that allows you to save your preferred content, be it articles, images, or other interesting resources, and create a personalized content library.',
    technologies: [],
    imagePath: '/assets/img/homePage/workInProgress1.gif',
    customStyles: {
        titleClass: 'savedTitle',
        descriptionClass: 'savedDescription',
        imageClass: 'savedImage',
        contentClass: 'savedContent'
    }
}, {
    title: 'Settings Page',
    description: 'Hey there! Work on the \'Settings Page\' is in full swing! Here, I\'m crafting tools for your convenience. On this page, you\'ll be able to tweak various aspects of your profile and control the \'site states\'. Imagine being able to toggle different site features on and off to better suit your needs.',
    technologies: [],
    imagePath: '/assets/img/homePage/workInProgress3.gif',
    customStyles: {
        titleClass: 'settingsTitle',
        descriptionClass: 'settingsDescription',
        imageClass: 'settingsImage',
        contentClass: 'settingsContent'
    }
}, {
    title: 'Logout Page',
    description: 'This page handles the vital process of user logout from the platform. As part of maintaining security and ensuring a complete user session closure, this functionality meticulously clears various user data points. The logout mechanism encompasses the removal of stored JWT tokens, deletion of local storage contents, and wiping of pertinent cookies.\n' +
        'By meticulously erasing these authentication artifacts and stored information, the logout page ensures a thorough termination of the user\'s session, safeguarding their privacy and preventing unauthorized access to sensitive data. This meticulous process aligns with our commitment to providing a secure and trustworthy user experience, prioritizing data privacy and user security above all else."',
    technologies: ['Cookie', 'Storage', 'Auth'],
    imagePath: '/assets/img/homePage/logout.gif',
    customStyles: {
        cardClass: "logoutCard",
        titleClass: 'logoutTitle',
        descriptionClass: 'logoutDescription',
        imageClass: 'logoutImage',
        contentClass: 'logoutContent'
    }
}, {
    title: 'Final Page',
    description: 'Thanks for Visiting My Final Page!\n' +
        'I appreciate you taking the time to explore my platform and reach this final destination. Your interest and engagement mean a lot to me.\n' +
        'I hope you found your journey through my site enjoyable and informative. Feel free to continue exploring or reach out to me if you have any questions.\n' +
        'Thank you for being a part of my experience. Have a great day and enjoy your time here!',
    technologies: [],
    imagePath: '/assets/img/homePage/final.gif',
    customStyles: {
        titleClass: 'finalTitle',
        descriptionClass: 'finalDescription',
        imageClass: 'finalImage',
        contentClass: 'finalContent'
    }
}];

