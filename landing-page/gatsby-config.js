module.exports = {
  plugins: [
    {
      resolve: `gatsby-theme-codebushi`,
      options: {
        tailwindConfig: `tailwind.config.js`,
      },
    },
    'gatsby-plugin-react-helmet',
    {
      resolve: 'gatsby-plugin-firebase',
      options: {
        features: {
          analytics: true,
        },
        credentials: {
          apiKey: 'AIzaSyCmaN82s0eq3Jrjvibc-Pp3Q5D5Ti55XeE',
          authDomain: 'testyx.firebaseapp.com',
          databaseURL: 'https://testyx.firebaseio.com',
          projectId: 'testyx',
          storageBucket: 'testyx.appspot.com',
          messagingSenderId: '320822733891',
          appId: '1:320822733891:web:812d32ab49b6bcab0478f6',
          measurementId: 'G-2RMTLTM69B',
        },
      },
    },
  ],
};
