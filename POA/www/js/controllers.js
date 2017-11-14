

var app = angular.module('starter.controllers', [])

var db = null



app.controller('MenuCtrl', function($scope,$http,$ionicLoading,$cordovaDialogs,$rootScope) {



  //  window.localStorage.setItem("user_id", data.id);
  //  window.localStorage.setItem("auth_token", data.auth_token);
  //  window.localStorage.setItem("login", "on");
    var login = window.localStorage.getItem("login")
    var user_id = window.localStorage.getItem("user_id")
     $rootScope.menutitle = "DASHBOARD"



    if (login == undefined ){

        window.location.href = '#/loginuser';
        window.location.reload()


    }else{


    }










    $http.get('http://philortho.com/api/attendees/'+user_id)
        .success(function (response) {

            $scope.user_profile = response
            console.log(response)

            if(response.cpd == null || response.cpd == ""){

                $scope.user_cpd = "0"

            }else{

                $scope.user_cpd = response.cpd

            }



        })
        .error(function (data, status, headers, config) {
            //  Do some error handling here

        })













    $scope.gotoprofile = function () {
       // window.alert("kdkdkd")
        window.location.href = '#/userprofile';

    }





    $scope.logoutuser = function () {

        window.localStorage.removeItem("login")
        window.localStorage.removeItem("auth_token")
        window.localStorage.removeItem("user_id")
        window.location.href = '#/loginuser';
        window.location.reload()
    }





})

















app.controller('ForgotpassCtrl', function($scope) {






})














app.controller('LoginuserCtrl', function($scope,$http,$ionicLoading,$cordovaDialogs) {






    $scope.gotoregister = function () {

       // window.location.href = "#/forgotpassword"

    }



    $scope.gotomenu = function () {

        $ionicLoading.show({
            template: '<ion-spinner icon="lines" class="spinner-calm"></ion-spinner>',

        })

        var username = document.getElementById("input_username").value
        var password = document.getElementById("input_password").value

        if(username == "" || password == ""){

            $ionicLoading.hide()
            $cordovaDialogs.alert('Please Fill all the Fields', 'Warning!', 'OK')
                .then(function() {
                    // callback success

                });

        }else{


            //  window.alert(username + " " + password)
            $http.post('http://philortho.com/api/sign-in?user_login[username]='+username+'&user_login[password]='+password)
                .success(function(data) {
                    console.log(data)
                   // window.alert(data.id)
                    $ionicLoading.hide()
                    window.localStorage.setItem("user_id", data.id);
                    window.localStorage.setItem("auth_token", data.auth_token);
                    window.localStorage.setItem("login", "on");
                    window.location.href = '#/app/dashboard';
                    window.location.reload()
                })


                .error(function(data) {
                    console.log("error error "+data)
                    $ionicLoading.hide()
                    $cordovaDialogs.alert('Incorrect email or password', 'Warning!', 'OK')
                        .then(function() {
                            // callback success

                        });


                });

        }


        /*
        var user = {
            email: 'testuser@foo.com',
            password: 'testuser'
        } */







    }








    $scope.gotoforgot = function () {

        window.location.href = "#/forgotpassword"

    }




})


















app.controller('DashboardCtrl', function($scope,$http,$rootScope) {


    var user_id = window.localStorage.getItem("user_id")


    $scope.gotolinknote = function () {
        window.location.href = '#/app/notes';
    }

    $scope.gotolinkfiles = function () {
        window.location.href = "#/app/files"
    }

    $scope.gotolinkgalery = function () {
        window.location.href = "#/gallery"
    }

    $scope.gotolinkevensched = function () {
        window.location.href = "#/app/evenschedule"
    }

    $scope.gotolinkmysched = function () {
        window.location.href = "#/app/myschedule"
    }




    $http.get('http://philortho.com/api/announcements')
        .success(function (response) {

            $scope.announcements_dash = response.announcements
            console.log(response)



        })
        .error(function (data, status, headers, config) {
            //  Do some error handling here

        })






    $http.get('http://philortho.com/api/attendees/'+user_id)
        .success(function (response) {

            console.log(response.event_sessions)
            $rootScope.dash_event_sessions = response.event_sessions


        })
        .error(function (data, status, headers, config) {
            $ionicLoading.hide()

        })










})


















app.controller('ScancodeCtrl', function($scope,$cordovaBarcodeScanner,$http,$rootScope) {

    var qr_value = ""
    var qr_value2 = ""
    var user_id = window.localStorage.getItem("user_id")
    var sub_qr = ""
    var login_or_logout = ""
    $rootScope.menutitle = "SCAN CODE"



    document.addEventListener("deviceready", function () {

        $cordovaBarcodeScanner
            .scan()
            .then(function(result) {
                // Success! Barcode data is here
               /* vm.scanResults = "We got a barcoden" +
                    "Result: " + result.text + "n" +
                    "Format: " + result.format + "n" +
                    "Cancelled: " + result.cancelled;
                    ldldldld*/


                qr_value = result.text.replace("http://philorthoapp.herokuapp.com//event_sessions/", "")


                sub_qr  = qr_value.substring(1);
                sub_qr  = sub_qr.substring(1);

                if(sub_qr == "qrcode_login"){

                    qr_value2 = qr_value.replace("/qrcode_login", "")
                   // window.alert("qrcode_login")
                    login_or_logout = "1"
                    send_qr_log()
                    window.localStorage.setItem("session_id", qr_value2);

                }else{

                    qr_value2 = qr_value.replace("/qrcode_logout", "")
                  //  window.alert("qrcode_logout")
                    login_or_logout = "0"
                    send_qr_log()
                    window.localStorage.setItem("session_id", qr_value2);
                }




               // window.alert("Result: " + qr_value2)
               // send_qr_log()





            }, function(error) {
                // An error occurred
              //  vm.scanResults = 'Error: ' + error;
            });


    }, false);






    function send_qr_log() {

        var d = new Date();
        d = d.toLocaleTimeString().replace(/:\d+ /, ' ');
       // window.alert("send_qr_log")


        if(login_or_logout == "1"){

            $http.post('http://philortho.com/api/session_attendees?session_attendee[event_session_id]='+qr_value2+'&session_attendee[user_id]='+user_id+'&session_attendee[login]='+d)
                .success(function(data) {
                    console.log(data)


                  //  window.alert(data)

                })







                .error(function(data) {
                    console.log("error error "+data)
                  //  window.alert("error error "+data)


                });

            

        }else{
           // hostname/api/session_attendees/logout?session_attendee[event_session_id]=1&session_attendee[user_id]=3&session_attendee[logout]=5:00 PM
            $http.post('http://philortho.com/api/api/session_attendees/logout?session_attendee[event_session_id]='+qr_value2+'&session_attendee[user_id]='+user_id+'&session_attendee[logout]='+d)
                .success(function(data) {
                    console.log(data)


                 //   window.alert(data)

                })


                .error(function(data) {
                    console.log("error error "+data)
                  //  window.alert("error error "+data)


                });


        }





    }







})






















app.controller('EditprofileCtrl', function($scope,$http,$ionicLoading,$cordovaDialogs,$rootScope) {



    var user_id = window.localStorage.getItem("user_id")
    $rootScope.menutitle = "EDIT PROFILE"

    $http.get('http://philortho.com/api/attendees/'+user_id)
        .success(function (response) {

            $scope.user_profile = response
            console.log(response)



        })
        .error(function (data, status, headers, config) {
            //  Do some error handling here

        })




    $scope.saveeditprofile = function () {

        $ionicLoading.show({
            template: '<ion-spinner icon="lines" class="spinner-calm"></ion-spinner>',

        })

        var txt_first_name = document.getElementById("txt_first_name").value
        var txt_middle_name = document.getElementById("txt_middle_name").value
        var txt_last_name = document.getElementById("txt_last_name").value
        var txt_suffix = document.getElementById("txt_suffix").value
        var txt_email_address = document.getElementById("txt_email_address").value
        var txt_city = document.getElementById("txt_city").value
        var txt_title = document.getElementById("txt_title").value
        var txt_profession = document.getElementById("txt_profession").value
        var txt_chapter = document.getElementById("txt_chapter").value
        var txt_subspecialty = document.getElementById("txt_subspecialty").value
        var txt_comments = document.getElementById("txt_comments").value


        console.log(txt_first_name + " txt_first_name")
        console.log(txt_middle_name + " txt_middle_name")
        console.log(txt_last_name + " txt_last_name")
        console.log(txt_suffix + " txt_suffix")
        console.log(txt_email_address + " txt_email_address")
        console.log(txt_city + " txt_city")
        console.log(txt_title + " txt_title")
        console.log(txt_profession + " txt_profession")
        console.log(txt_chapter + " txt_chapter")
        console.log(txt_subspecialty + " txt_subspecialty")
        console.log(txt_comments + " txt_comments")




          $http.patch('http://philortho.com/api/attendees/'+user_id+'?&user[first_name]='+txt_first_name+'&user[middle_initial]='+txt_middle_name+'&user[last_name]='+txt_last_name+'&user[suffix]='+txt_suffix+'&user[email]='+txt_email_address+'&user[address]='+txt_city+'&user[title]='+txt_title+'&user[profession]='+txt_profession+'&user[chapter]='+txt_chapter+'&user[subspecialty]='+txt_subspecialty+'&user[description]='+txt_comments)
          //  $http.post('http://philortho.com/api/attendees/477?user[first_name]=Jerih')
                .success(function(data) {
            console.log(data)
            $ionicLoading.hide()


        })


        .error(function(data) {
            console.log("error error "+data)
            $ionicLoading.hide()



        });




    }













})





















app.controller('EventscheduleCtrl', function($scope, $http, $ionicLoading, $rootScope) {


    $ionicLoading.show({
        template: '<ion-spinner icon="lines" class="spinner-calm"></ion-spinner>',

    })

    $rootScope.menutitle = "EVENT SCHEDULE"


    $http.get('http://philortho.com/event_sessions.json')
        .success(function (response) {

            console.log(response)
            $rootScope.session_data = response.event_sessions
            $rootScope.session_data_lecture = response.event_sessions.lectures
            $ionicLoading.hide()

            console.log(response.sessions[0].lectures)

        })
        .error(function (data, status, headers, config) {
            //  Do some error handling here

        })




    $scope.btn_session_1 = true
    $scope.btn_session_2 = false
    $scope.btn_session_3 = false
    $scope.btn_session_4 = false



    $scope.bnt_date_1 = function () {

        $scope.btn_session_1 = true
        $scope.btn_session_2 = false
        $scope.btn_session_3 = false
        $scope.btn_session_4 = false

    }



    $scope.bnt_date_2 = function () {

        $scope.btn_session_1 = false
        $scope.btn_session_2 = true
        $scope.btn_session_3 = false
        $scope.btn_session_4 = false
    }



    $scope.bnt_date_3 = function () {

        $scope.btn_session_1 = false
        $scope.btn_session_2 = false
        $scope.btn_session_3 = true
        $scope.btn_session_4 = false
    }



    $scope.bnt_date_4 = function () {

        $scope.btn_session_1 = false
        $scope.btn_session_2 = false
        $scope.btn_session_3 = false
        $scope.btn_session_4 = true
    }










    $scope.gotolecture = function (id, index) {



        for(var i = 0; i <= $rootScope.session_data.length; i++){

            if(id == $rootScope.session_data[i].id){

               // window.alert(id + "  " + $rootScope.session_data[i].id)
                $rootScope.session_id = id
                $rootScope.session_index = i
                $rootScope.session_data_lecture = $scope.session_data[i].lectures
                $rootScope.pageposition = "#/app/evenschedule"
                window.location.href = "#/lecture"

            }


        }


       // window.alert("dkkd" + id)
      //    $rootScope.session_id = id
      //    $rootScope.session_index = index
      //    $rootScope.session_data_lecture = $scope.session_data[index].lectures
      //    $rootScope.pageposition = "#/app/evenschedule"
      //    window.location.href = "#/lecture"



    }










    })






























app.controller('SpeakersCtrl', function($scope,$ionicScrollDelegate, $rootScope,$http) {



    $rootScope.menutitle = "SPEAKERS"




    $http.get('http://philortho.com/api/speakers')
        .success(function (response) {

            console.log(response)
            $rootScope.speakers_list = response.speakers


        })
        .error(function (data, status, headers, config) {
            //  Do some error handling here

        })











    $scope.clearSearch = function() {
        $scope.search = '';
    };







    $scope.gotospeakers = function (index) {


      //  window.alert(index)
        for(var i = 0; i<=$rootScope.speakers_list.length; i++){


            if(index == $rootScope.speakers_list[i].id){

                 window.location.href = '#/speakerinfo'
                 $rootScope.selected_speaker = i

            }else{


            }


        }



    }





    })





    .filter('searchContacts2', function(){
        return function (items, query) {
            var filtered = [];
            var letterMatch = new RegExp(query, 'i');
            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                if (query) {
                    if (letterMatch.test(item.speaker_name.substring(0, query.length))) {
                        filtered.push(item);
                    }
                } else {
                    filtered.push(item);
                }
            }
            return filtered;
        };
    });














app.controller('SpeakerinfosCtrl', function($scope) {




})
















app.controller('AttendeesCtrl', function($scope,$rootScope,$http) {




    $rootScope.menutitle = "ATTENDEES"





    $http.get('http://philortho.com/api/attendees')
        .success(function (response) {

            $rootScope.attendees_list = response
            console.log(response)



        })
        .error(function (data, status, headers, config) {
            //  Do some error handling here

        })











    $scope.clearSearch = function() {
        $scope.search = '';
    };



    $scope.gotoattendees = function (index, id) {

        window.location.href = '#/attendeesinfo'
        $rootScope.selected_attendees_id = id


       // window.alert(id)


    }





})











app.controller('AttendeesinfoCtrl', function($scope,$rootScope,$http) {


    $rootScope.attendees_photos = [
        { image: 'img/img_1.jpg'},
        { image: 'img/img_2.jpg'},
        { image: 'img/img_3.jpg'},
        { image: 'img/img_4.jpg'}

    ];



    $http.get('http://philortho.com/api/attendees/'+$rootScope.selected_attendees_id)
        .success(function (response) {

            $scope.attendees_list_selected = response
            console.log(response)



        })
        .error(function (data, status, headers, config) {
            //  Do some error handling here

        })





    $scope.gotofacebook = function () {

    }





    $scope.gotolinkedin = function () {

    }





})



















    .filter('searchContacts', function(){
        return function (items, query) {
            var filtered = [];
            var letterMatch = new RegExp(query, 'i');
            for (var i = 0; i < items.length; i++) {
                var item = items[i];
                if (query) {
                    if (letterMatch.test(item.name.substring(0, query.length))) {
                        filtered.push(item);
                    }
                } else {
                    filtered.push(item);
                }
            }
            return filtered;
        };




    })











app.controller('UserprofileCtrl', function($scope,$rootScope,$http) {


    var user_id = window.localStorage.getItem("user_id")

  /*  $rootScope.attendees_photos = [
        { image: 'img/img_1.jpg'},
        { image: 'img/img_2.jpg'},
        { image: 'img/img_3.jpg'},
        { image: 'img/img_4.jpg'}

    ]; */






    $http.get('http://philortho.com/api/attendees/'+user_id)
        .success(function (response) {

            $scope.user_profile = response
            console.log(response)



        })
        .error(function (data, status, headers, config) {
            //  Do some error handling here

        })





    $scope.gotoedit = function () {

        window.location.href = "#/app/editprofile"
    }





    $scope.gotocpd = function () {


        if($scope.user_profile.cpd == 0 || $scope.user_profile.cpd == null || $scope.user_profile.cpd == ""){

           // window.alert("zero cpd")

        }else{

           // window.alert("have cpd download")
         //   window.open('http://philortho.com/attendees/print_certificate.pdf?attendee_id=','_blank');

        }



    }










})


































app.controller('MapCtrl', function($scope,$rootScope,$http) {


    $rootScope.menutitle = "MAP"




    $http.get('http://philortho.com/api/maprooms/')
        .success(function (responses) {

            console.log(responses)
            $rootScope.event_maps = responses.maprooms
            $scope.mapsimage = $rootScope.event_maps[0].document


        })
        .error(function (data, status, headers, config) {
            //  Do some error handling here

        })





    $scope.show_category_class = function (index) {

      //  window.alert(index)
        for(var i = 0; i<= $rootScope.event_maps.length; i++){

            if(index == $rootScope.event_maps[i].name){


                $scope.mapsimage = $rootScope.event_maps[i].document

            }

        }


    }






})
















app.controller('MyscheduleCtrl', function($scope,$rootScope, $http,$ionicLoading) {


    var user_id = window.localStorage.getItem("user_id")
    $rootScope.menutitle = "MY SCHEDULE"

  //  window.alert(user_id)

    $ionicLoading.show({
        template: '<ion-spinner icon="lines" class="spinner-calm"></ion-spinner>',

    })


    $http.get('http://philortho.com/api/attendees/'+user_id)
        .success(function (response) {

            console.log(response)
            $rootScope.session_data = response.event_sessions


            $http.get('http://philortho.com/event_sessions.json')
                .success(function (responsesss) {

                    console.log(responsesss)
                    $rootScope.session_data2 = responsesss.event_sessions
                    $ionicLoading.hide()

                    console.log($rootScope.session_data2)


                })
                .error(function (data, status, headers, config) {
                    //  Do some error handling here

                })




        })
        .error(function (data, status, headers, config) {
            $ionicLoading.hide()

        })













    $scope.gotolecture = function (id, index) {

      //  window.alert($rootScope.session_data2.length + " fff")
        console.log($rootScope.session_data[index].id +" ddddd "+$rootScope.session_data[index].title)

        $rootScope.session_id = id
        $rootScope.session_index = index


        for(var i = 0; i <= $rootScope.session_data2.length; i++){

            if($rootScope.session_id == $rootScope.session_data2[i].id){

                $rootScope.session_data_lecture = $rootScope.session_data2[i].lectures
                window.location.href = "#/lecture_myschedule"


            }else{


            }


        }





     /*   $rootScope.session_data_lecture = $scope.session_data[index].lectures
        window.location.href = "#/lecture_myschedule"*/



    }




})






















app.controller('ExibitorsCtrl', function($scope, $rootScope, $http) {



    $rootScope.menutitle = "EXIBITORS"


    $http.get('http://philortho.com/api/exhibitors')
        .success(function (response) {

            console.log(response)
            $rootScope.exibitors_list = response.exhibitors


        })
        .error(function (data, status, headers, config) {
            //  Do some error handling here

        })





    $scope.clearSearch = function() {
        $scope.search = '';
    };



    $scope.gotoexibitors = function (index) {

        window.location.href = '#/exibitorsinfo'
        $rootScope.selected_exibitors = index


    }





})











app.controller('ExibitorsinfoCtrl', function($scope,$rootScope) {






})













app.controller('SponsorsCtrl', function($scope,$rootScope,$http) {


    $rootScope.menutitle = "SPONSORS"
    $scope.titanium = 0
    $scope.sepcial = 0



    $http.get('http://philortho.com/api/sponsors')
        .success(function (response) {

            console.log(response)
            $rootScope.sponsors_data = response.sponsors



            for(var i = 0; i<= $rootScope.sponsors_data.length; i++){


                if($rootScope.sponsors_data[i].sponsor_type == "TITANIUM"){


                    if($scope.titanium == 0){

                        $rootScope.titanium_sponsor1 = $rootScope.sponsors_data[i]
                        $scope.titanium = 1

                    }else{

                        if($rootScope.sponsors_data[i].sponsor_type == "TITANIUM"){

                            $rootScope.titanium_sponsor2 = $rootScope.sponsors_data[i]
                            console.log(i + " 2")
                        }else{

                        }

                    }


                }else{


                }






               if($rootScope.sponsors_data[i].sponsor_type == "SPECIAL"){


                    if($scope.sepcial == 0){

                        $rootScope.special_sponsor1 = $rootScope.sponsors_data[i]
                        $scope.sepcial = 1

                    }else{

                        if($rootScope.sponsors_data[i].sponsor_type == "SPECIAL"){

                            $rootScope.special_sponsor2 = $rootScope.sponsors_data[i]


                        }else{

                        }

                    }



               }else{


               }















                if($rootScope.sponsors_data[i].sponsor_type == "PLATINUM"){

                    $rootScope.platinum_sponsor = $rootScope.sponsors_data[i]

                }else{

                }




                if($rootScope.sponsors_data[i].sponsor_type == "GOLD"){

                    $rootScope.gold_sponsor = $rootScope.sponsors_data[i]

                }else{

                }



                if($rootScope.sponsors_data[i].sponsor_type == "REGULAR"){

                    $rootScope.regular_sponsor = $rootScope.sponsors_data[i]

                }else{

                }




                console.log(i)




            }








        })
        .error(function (data, status, headers, config) {
            $ionicLoading.hide()

        })









    $scope.gotosponsorinfo = function (index) {

      //  window.alert(index)
        $rootScope.sponsorinfoindex = index
        window.location.href = "#/sponsorinfo"


    }





})















app.controller('GalleryCtrl', function($scope, $rootScope,$cordovaCamera,$cordovaFileTransfer, $cordovaFile,$cordovaDevice) {


    $scope.gallery_photos = ['img/img_1.jpg', 'img/img_2.jpg', 'img/img_3.jpg', 'img/img_4.jpg'];
    var user_id = window.localStorage.getItem("user_id")

    $scope.btn_gotocamera = function () {

        //  window.alert("btn_gotocamera")
       /*   var options = {
              quality: 100,
              destinationType: Camera.DestinationType.DATA_URL,
              sourceType: Camera.PictureSourceType.CAMERA,
              allowEdit: false,
              encodingType: Camera.EncodingType.JPEG,
              targetWidth: 500,
              targetHeight: 500,
              popoverOptions: CameraPopoverOptions,
              saveToPhotoAlbum: false,
              correctOrientation: true
          };

          $cordovaCamera.getPicture(options).then(function(imageData) {
              // var image = document.getElementById('myImage');
              // image.src = "data:image/jpeg;base64," + imageData;
              console.log("data:image/jpeg;base64," + imageData)
              $scope.image_to_upload = "data:image/jpeg;base64," + imageData
              $scope.gallery_photos.push("data:image/jpeg;base64," + imageData)
              $scope.filename = imageData
              send_galery()

          }, function(err) {
              // An error occured. Show a message to the user
          }); */



        var options = {
            quality: 100,
            destinationType: Camera.DestinationType.FILE_URI,
            sourceType: Camera.PictureSourceType.CAMERA,
            allowEdit: false,
            encodingType: Camera.EncodingType.JPEG,
            targetWidth: 1000,
            targetHeight: 1000,
            popoverOptions: CameraPopoverOptions,
            saveToPhotoAlbum: false,
            correctOrientation: true
        };


        $cordovaCamera.getPicture(options).then(function (imagePath) {
                // Grab the file name of the photo in the temporary directory
                var currentName = imagePath.replace(/^.*[\\\/]/, '');

                //Create a new name for the photo
                var d = new Date(),
                    n = d.getTime(),
                    newFileName = user_id + "_" + n + ".jpg";

                window.alert(1)
                    var namePath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
                    // Move the file to permanent storage
                    $cordovaFile.moveFile(namePath, currentName, cordova.file.dataDirectory, newFileName).then(function (success) {
                        $scope.image = newFileName;
                        $scope.gallery_photos.push($scope.pathForImage(newFileName))
                        window.alert(2)
                        send_galery()

                    }, function (error) {
                       // $scope.showAlert('Error', error.exception);
                    });

            },
            function (err) {
                // Not always an error, maybe cancel was pressed...
            })


    };





    // Returns the local path inside the app for an image
    $scope.pathForImage = function (image) {
        if (image === null) {
            return '';
        } else {
            return cordova.file.dataDirectory + image;
        }
    };















    function send_galery() {


        var url = "http://philortho.com/api/galleries";
        console.log(" url url" + url)
        // File for Upload
        var targetPath = $scope.pathForImage($scope.image);

        // File name only

        var filename = $scope.image;

        window.alert(targetPath + " dddd " + $scope.image)

        var options = {
            fileKey: "file",
            fileName: filename,
            chunkedMode: false,
            mimeType: "multipart/form-data",
            params: { 'gallery[user_id]': user_id , 'gallery[caption]': "upload", 'gallery[document]': targetPath }
        };

        $cordovaFileTransfer.upload(url, targetPath, options)
            .then(function(result) {
                window.alert("err "+result)
                // Success!
            }, function(err) {
                window.alert(" err "+err)
                // Error
            }, function (progress) {
              //  window.alert(progress)
                // constant progress updates
            });




    }









})













app.controller('NotesCtrl', function($scope,$rootScope,$ionicLoading,$http,$cordovaEmailComposer) {


    $rootScope.menutitle = "NOTES"
    var user_id = window.localStorage.getItem("user_id")


    $ionicLoading.show({
        template: '<ion-spinner icon="lines" class="spinner-calm"></ion-spinner>',

    })

    $http.get('http://philortho.com/api/session_notes?user_id='+user_id)
        .success(function(response) {
            console.log(response)
            $scope.note_session = response.session_notes
            $ionicLoading.hide()


            //http://philortho.com/event_sessions.json
            $http.get('http://philortho.com/event_sessions.json')
                .success(function(response) {
                    console.log(response)
                    $scope.session_title = response.event_sessions




                })

                .error(function(data) {
                    console.log("error error "+data)



                });


        })

        .error(function(data) {
            console.log("error error "+data)



        });




    $scope.emailnotes = function (index) {

        $cordovaEmailComposer.isAvailable().then(function() {
            // is available
        }, function () {
            // not available
        });

        var email = {
            subject: $scope.note_session[index].session_title,
            body: $scope.note_session[index].my_note,
            isHtml: true
        };

        $cordovaEmailComposer.open(email).then(null, function () {
            // user cancelled email
        });

    }







})



















app.controller('FilesCtrl', function($scope,$rootScope,$http) {

    $rootScope.menutitle = "FILES"

    var user_id = window.localStorage.getItem("user_id")


    $http.get('http://philortho.com/api/attendees/'+user_id)
        .success(function (response) {

            console.log(response)
            $rootScope.file_data = response.event_sessions


        })
        .error(function (data, status, headers, config) {
            $ionicLoading.hide()

        })









    })





















app.controller('PrivacypolicyCtrl', function($scope, $http,$rootScope) {


    $rootScope.menutitle = "PRIVACY POLICY"


    $http.get('http://philortho.com//api/events')
        .success(function (response) {

            console.log(response)
            $scope.privacypolicy = response.events



        })
        .error(function (data, status, headers, config) {
            $ionicLoading.hide()

        })










})






















app.controller('TermsandconditionsCtrl', function($scope,$rootScope,$http) {


    $rootScope.menutitle = "TERMS AND CONDITIONS"


    $http.get('http://philortho.com//api/events')
        .success(function (response) {

            console.log(response)
            $scope.termsandcondition = response.events



        })
        .error(function (data, status, headers, config) {
            $ionicLoading.hide()

        })




    })






app.controller('OpenforumCtrl', function($scope,$http,$ionicLoading,$cordovaDialogs,$rootScope) {


    var user_id = window.localStorage.getItem("user_id")
    var session_id = window.localStorage.getItem("session_id")
     $rootScope.menutitle = "OPEN FORUM"



    $scope.submit_openforum = function () {

        $ionicLoading.show({
            template: '<ion-spinner icon="lines" class="spinner-calm"></ion-spinner>',

        })


        var text_open_forum = document.getElementById("text_open_forum").value
        //window.alert(text_open_forum)

        $http.post('http://philortho.com/api/open_forums?open_forum[event_session_id]='+session_id+'&open_forum[user_id]='+user_id+'&open_forum[message]='+text_open_forum)
            .success(function(data) {
                console.log(data)
                $ionicLoading.hide()
                document.getElementById("text_open_forum").value = ""


            })


            .error(function(data) {
                console.log("error error "+data)
                $ionicLoading.hide()



            });

    }







    })











app.controller('LectureCtrl', function($scope,$rootScope,$cordovaSQLite,$http,$cordovaDialogs,$ionicPopup,$cordovaCalendar,$ionicLoading) {



    var user_id = window.localStorage.getItem("user_id")
    var auth_token = window.localStorage.getItem("auth_token")


    $scope.form_add_to_schedule = true
    $scope.form_remove_to_schedule = false
    $scope.form_note = false

    $scope.list_to_add = true
    $scope.list_add = false


    //$rootScope.session_data_lecture

    $scope.back = function () {

        window.location.href = $rootScope.pageposition

    }



    $scope.btn_gotomyschedule = function () {

        window.location.href = "#/app/myschedule"

    }





    $scope.opensurvey = function (index) {



        $scope.survey_per_lecture = $rootScope.session_data_lecture[index].survey
        $scope.survey_per_lecture2 = $scope.survey_per_lecture.question
        $rootScope.survey_per_lecture3 = $scope.survey_per_lecture2[0].question

        $rootScope.survey_id = $scope.survey_per_lecture.id
        $rootScope.lecture_survey = $rootScope.session_data_lecture[index].id
        $rootScope.survey_question_id = $scope.survey_per_lecture2[0].id
      //  window.alert($rootScope.survey_id + " " + $rootScope.lecture_survey + " " + $rootScope.survey_question_id)
        $rootScope.survey_loc = "#/lecture"
        window.location.href = "#/survey"

      //  window.alert($scope.survey_per_lecture3)

    }




    $scope.getabstract = function (index) {

        $scope.lecture_abstract_url = $rootScope.session_data_lecture[index].abstract_url
       // window.alert($scope.lecture_abstract_url)
        window.open('http://philortho.com'+$scope.lecture_abstract_url, '_system');



    }



    $scope.getothers = function (index) {

        $scope.lecture_presentation_url = $rootScope.session_data_lecture[index].presentation_url
       // window.alert($scope.lecture_presentation_url)
        window.open('http://philortho.com'+$scope.lecture_presentation_url, '_system');

    }







    $scope.submit_openforum = function () {

        var text_open_forum = document.getElementById("text_open_forum").value

        $ionicLoading.show({
            template: '<ion-spinner icon="lines" class="spinner-calm"></ion-spinner>',

        })

        if(text_open_forum == "" || text_open_forum == null){

        }else{

            $http.post('http://philortho.com/api/session_notes?session_note[user_id]='+user_id+'&session_note[event_session_id]='+$rootScope.session_id+'&session_note[my_note]='+text_open_forum)
                .success(function(data) {
                    console.log(data)
                    document.getElementById("text_open_forum").value = ""
                    $ionicLoading.hide()

                })

                .error(function(data) {
                    console.log("error error "+data)



                });


        }



    }







    $scope.addtomyschedule = function (index) {

      //  window.alert($rootScope.session_id)




       $http.post('http://philortho.com/api/session_attendees?session_attendee[event_session_id]='+$rootScope.session_id+'&session_attendee[user_id]='+user_id)
            .success(function(data) {
                console.log(data)

                if(data.user_id == user_id){

                    $cordovaDialogs.alert('Succesful added in your schedule', 'OK')
                        .then(function() {
                            // callback success
                            show_added_sched()

                        });


                }else{

                }


            })


            .error(function(data) {
                console.log("error error "+data)



            });







       function show_added_sched() {
           $scope.form_add_to_schedule = false
           $scope.form_remove_to_schedule = true
           $scope.form_note = true
           $scope.list_to_add = false
           $scope.list_add = true






           if($rootScope.session_data[$rootScope.session_index].date == "11/15/2017") {

               $cordovaCalendar.createEventInteractively({
                   title: $rootScope.session_data[$rootScope.session_index].title,
                   startDate: new Date(2017, 10, 15, 0, 0, 0),
                   endDate: new Date(2017, 10, 15, 0, 0, 0, 0)
               }).then(function (result) {
                   // success
               }, function (err) {
                   // error
               });

           }else if($rootScope.session_data[$rootScope.session_index].date == "11/16/2017"){

               $cordovaCalendar.createEventInteractively({
                   title: $rootScope.session_data[$rootScope.session_index].title,
                   startDate: new Date(2017, 10, 16, 0, 0, 0),
                   endDate: new Date(2017, 10, 16, 0, 0, 0, 0)
               }).then(function (result) {
                   // success
               }, function (err) {
                   // error
               });

           }else if($rootScope.session_data[$rootScope.session_index].date == "11/17/2017"){

               $cordovaCalendar.createEventInteractively({
                   title: $rootScope.session_data[$rootScope.session_index].title,
                   startDate: new Date(2017, 10, 17, 0, 0, 0),
                   endDate: new Date(2017, 10, 17, 0, 0, 0, 0)
               }).then(function (result) {
                   // success
               }, function (err) {
                   // error
               });

           }else{

               $cordovaCalendar.createEventInteractively({
                   title: $rootScope.session_data[$rootScope.session_index].title,
                   startDate: new Date(2017, 10, 8, 0, 0, 0),
                   endDate: new Date(2017, 10, 8, 0, 0, 0, 0)
               }).then(function (result) {
                   // success
               }, function (err) {
                   // error
               });


           }






       }




    }




    
    
    
    
    $scope.submit_abstract = function () {

    }
    
    
    


})




























app.controller('LecturemyscheduleCtrl', function($scope,$rootScope,$cordovaSQLite,$http,$cordovaDialogs,$ionicPopup,$ionicLoading,$http) {



    var user_id = window.localStorage.getItem("user_id")
    var auth_token = window.localStorage.getItem("auth_token")








    $scope.opensurvey = function (index) {


        $scope.survey_per_lecture = $rootScope.session_data_lecture[index].survey
        $scope.survey_per_lecture2 = $scope.survey_per_lecture.question
        $rootScope.survey_per_lecture3 = $scope.survey_per_lecture2[0].question

        $rootScope.survey_id = $scope.survey_per_lecture.id
        $rootScope.lecture_survey = $rootScope.session_data_lecture[index].id
        $rootScope.survey_question_id = $scope.survey_per_lecture2[0].id
        //  window.alert($rootScope.survey_id + " " + $rootScope.lecture_survey + " " + $rootScope.survey_question_id)
        $rootScope.survey_loc = "#/lecture_myschedule"
        window.location.href = "#/survey"

        //  window.alert($scope.survey_per_lecture3)

    }





    $scope.getabstract = function (index) {

        $scope.lecture_abstract_url = $rootScope.session_data_lecture[index].abstract_url
        // window.alert($scope.lecture_abstract_url)
        window.open('http://philortho.com'+$scope.lecture_abstract_url, '_system');



    }



    $scope.getothers = function (index) {

        $scope.lecture_presentation_url = $rootScope.session_data_lecture[index].presentation_url
        // window.alert($scope.lecture_presentation_url)
        window.open('http://philortho.com'+$scope.lecture_presentation_url, '_system');

    }






    $scope.btn_gotomyschedule = function () {

        window.location.href = "#/app/myschedule"

    }





    $scope.submit_openforum = function () {

        var text_open_forum = document.getElementById("text_open_forum").value

        $ionicLoading.show({
            template: '<ion-spinner icon="lines" class="spinner-calm"></ion-spinner>',

        })

        if(text_open_forum == "" || text_open_forum == null){

        }else{

            $http.post('http://philortho.com/api/session_notes?session_note[user_id]='+user_id+'&session_note[event_session_id]='+$rootScope.session_id+'&session_note[my_note]='+text_open_forum)
                .success(function(data) {
                    console.log(data)
                    document.getElementById("text_open_forum").value = ""
                    $ionicLoading.hide()

                })

                .error(function(data) {
                    console.log("error error "+data)



                });


        }



    }











})





















app.controller('SponsorinfoCtrl', function($scope,$rootScope,$cordovaSQLite,$http,$cordovaDialogs,$ionicPopup) {


    $rootScope.sponsorinfo_list = [
        { image: 'img/img_sponsor_shang.jpg', desc: "Inspired by the legendary land featured in James Hilton’s novel Lost Horizon published in 1933, the name Shangri-La encapsulates the serenity and service for which Shangri-La is renowned worldwide.", web: 'Shangri-la.com', facebook: 'facebook.com/Shangri-la', email: "info@shangri-la.com" },
        { image: 'img/img_sponsor_fizer.jpg', desc: "Inspired by the legendary land featured in James Hilton’s novel Lost Horizon published in 1933, the name Shangri-La encapsulates the serenity and service for which Shangri-La is renowned worldwide.", web: 'http://www.pfizer.com', facebook: 'facebook.com/pfizer', email: "info@pfizer.com" },
        { image: 'img/img_sponsor_doh.jpg', desc: "The Department of Health (DOH) is the principal health agency in the Philippines. It is responsible for ensuring access to basic public health service to all Filipinos through the provision of quality health care and regulation of provider of health goods and services", web: 'http://www.doh.gov.ph', facebook: 'facebook.com/doh', email: "info@doh.gov.ph" },
        { image: 'img/img_sponsor_unilab.jpg', desc: "Unilab has continuously provided Filipinos with trusted and quality healthcare products and services for the past 70 years. Being a Filipino company. It prides itself for knowing what is best for the Filipinos’ healthcare needs.", web: 'http://www.unilab.com.ph', facebook: 'facebook.com/unilab', email: "info@unilab" }



    ];





})














app.controller('SurveyCtrl', function($scope,$rootScope,$cordovaSQLite,$http,$cordovaDialogs,$ionicPopup) {




    var user_id = window.localStorage.getItem("user_id")
  //  $rootScope.survey_id = $scope.survey_per_lecture.id
  //  $rootScope.lecture_survey = $rootScope.session_data_lecture[index].id
  //  $rootScope.survey_question_id = $scope.survey_per_lecture2[0].id

    $scope.back = function () {
        window.location.href = $rootScope.survey_loc

    }


    $scope.survey_answer = 0

    $scope.getvalueradio = function (value) {

       // window.alert(value)
        $scope.survey_answer = value


    }


    
    
    
    
    $scope.savesurvey = function () {

        $http.post('http://philortho.com/api/answers?answer[user_id]='+user_id+'&answer[lecture_id]='+$rootScope.lecture_survey+'&answer[survey_id]='+$rootScope.survey_id+'&answer[ans_int]='+parseInt($scope.survey_answer)+'&answer[question_id]='+$rootScope.survey_question_id)
            .success(function(data) {
                console.log(data)
                window.location.href = $rootScope.survey_loc

            })

            .error(function(data) {




            });





    }









})






