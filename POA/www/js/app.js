// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'ngCordova' , 'starter.controllers'])

.run(function($ionicPlatform, $cordovaSQLite) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
        cache : false,
    templateUrl: 'templates/menu.html'
  })

  .state('app.dashboard', {
    url: '/dashboard',
      cache : false,
    views: {
      'menuContent': {
        templateUrl: 'templates/dashboard.html'
      }
    }
  })


      .state('app.scancode', {
          url: '/scancode',
          cache : false,
          views: {
              'menuContent': {
                  templateUrl: 'templates/scancode.html'
              }
          }
      })




      .state('app.editprofile', {
          url: '/editprofile',
          views: {
              'menuContent': {
                  templateUrl: 'templates/editprofile.html'
              }
          }
      })




      .state('app.evenschedule', {
          url: '/evenschedule',
          cache : false,
          views: {
              'menuContent': {
                  templateUrl: 'templates/evenschedule.html'
              }
          }
      })




      .state('app.attendees', {
          url: '/attendees',
          cache : false,
          views: {
              'menuContent': {
                  templateUrl: 'templates/attendees.html'
              }
          }
      })






      .state('app.map', {
          url: '/map',
          views: {
              'menuContent': {
                  templateUrl: 'templates/map.html'
              }
          }
      })





      .state('app.myschedule', {
          url: '/myschedule',
          views: {
              'menuContent': {
                  templateUrl: 'templates/myschedule.html'
              }
          }
      })







      .state('app.speakers', {
          url: '/speakers',
          cache : false,
          views: {
              'menuContent': {
                  templateUrl: 'templates/speakers.html'
              }
          }
      })






      .state('app.exibitors', {
          url: '/exibitors',
          views: {
              'menuContent': {
                  templateUrl: 'templates/exibitors.html'
              }
          }
      })




      .state('app.sponsors', {
          url: '/sponsors',
          views: {
              'menuContent': {
                  templateUrl: 'templates/sponsors.html'
              }
          }
      })









      .state('app.notes', {
          url: '/notes',
          views: {
              'menuContent': {
                  templateUrl: 'templates/notes.html'
              }
          }
      })





      .state('app.files', {
          url: '/files',
          cache : false,
          views: {
              'menuContent': {
                  templateUrl: 'templates/files.html'
              }
          }
      })






      .state('app.privacypolicy', {
          url: '/privacypolicy',
          cache : false,
          views: {
              'menuContent': {
                  templateUrl: 'templates/privacypolicy.html'
              }
          }
      })





      .state('app.termsandconditions', {
          url: '/termsandconditions',
          cache : false,
          views: {
              'menuContent': {
                  templateUrl: 'templates/termsandconditions.html'
              }
          }
      })




      .state('app.openforum', {
          url: '/openforum',
          views: {
              'menuContent': {
                  templateUrl: 'templates/openforum.html'
              }
          }
      })






      .state('gallery', {
          url: '/gallery',

                  templateUrl: 'templates/gallery.html'
      })






      .state('loginuser', {
          url: '/loginuser',
          templateUrl: 'templates/loginuser.html',

      })





      .state('forgotpassword', {
          url: '/forgotpassword',
          templateUrl: 'templates/forgotpassword.html',

      })




      .state('lecture', {
          url: '/lecture',
          cache : false,
          templateUrl: 'templates/lecture.html',

      })



      .state('speakerinfo', {
          url: '/speakerinfo',
          cache : false,
          templateUrl: 'templates/speakerinfo.html',

      })


      .state('attendeesinfo', {
          url: '/attendeesinfo',
          cache : false,
          templateUrl: 'templates/attendeesinfo.html',

      })




      .state('exibitorsinfo', {
          url: '/exibitorsinfo',
          templateUrl: 'templates/exibitorsinfo.html',

      })




      .state('myschedule', {
          url: '/myschedule',
                  templateUrl: 'templates/myschedule.html'
      })



      .state('lecture_myschedule', {
          url: '/lecture_myschedule',
          templateUrl: 'templates/lecture_myschedule.html'
      })


      .state('userprofile', {
          url: '/userprofile',
          templateUrl: 'templates/userprofile.html'
      })



      .state('sponsorinfo', {
          url: '/sponsorinfo',
          templateUrl: 'templates/sponsorinfo.html'
      })


      .state('survey', {
          url: '/survey',
          cache: false,
          templateUrl: 'templates/survey.html'
      })







    // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/dashboard');
});
