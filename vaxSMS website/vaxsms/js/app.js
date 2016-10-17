
var app = angular.module('vaxSMS', ['ngRoute']);

    app.config( function($routeProvider, $locationProvider){
        $routeProvider
        .when('/', {
            controller: 'homeCtrl',
            templateUrl: 'partials/home.html'
        })
        .when('/wheel',{
            controller: 'wheelCtrl',
            templateUrl: 'partials/wheel.html'
        })
        .when('/info',{
            controller: 'infoCtrl',
            templateUrl:'partials/info.html'
        })
        .otherwise({ redirectTo: '/' });
        $locationProvider.html5Mode(true);
    })
    .controller('homeCtrl', function($scope){

    })
    .controller('wheelCtrl', function($scope){
        //set/get date
        var picker,
            pickerDate = '',
            pickerRotation = 0,
            rotationCount = 0,
            months = [{ name:'January', days: 31 },
                      { name:'February', days: 28 },
                      { name:'March', days: 31 },
                      { name:'April', days: 30 },
                      { name:'May', days: 31 },
                      { name:'June', days: 30 },
                      { name:'July', days: 31 },
                      { name:'August', days: 31 },
                      { name:'September', days: 30 },
                      { name:'October', days: 31 },
                      { name:'November', days: 30 },
                      { name:'December', days: 31 }
                    ],
            $datepicker = $('#datepicker').pickadate({
                formatSubmit: 'dd mmmm yyyy',
                selectMonths: true,
                selectYears: true
            });
        //set picker date
        picker = $datepicker.pickadate('picker');
        
        //get rotation value & calculate date
        var snapInterval = 0.1,
            wheel = $('#wheel');
        TweenMax.set(wheel, { rotation: 359.9 });
        
        Draggable.create(wheel, {
            type:'rotation', 
            throwProps: true,
            liveSnap: function(endValue){
                /*endValue = (Math.round(endValue / snapInterval) * snapInterval) % 360;
                endValue = endValue < 0 ? endValue + 360 : endValue;
                getRotationValue(endValue);*/
                return endValue;
            },
            onDrag: function(){
                var rotation = this.rotation,
                    y = new Date().getFullYear(),
                    //isLeapYear = (y % 100 === 0) ? (y % 400 === 0) : (y % 4 === 0),
                    days = (this.rotation * (/*isLeapYear ? 366 :*/ 365)) / 360,
                    mth = 0,
                    mthDate = 0;
                switch(true){
                    case (rotation > 301.5 && rotation < 330):
                        mthDate = (334.5 - days).toFixed(0);
                        mth = 1;
                        break;
                    case (rotation > 271 && rotation < 302):
                        mthDate = (307 - days).toFixed(0);
                        mthDate = mthDate > 31 ? 31 : mthDate;
                        mth = 2;
                        break;
                    case (rotation > 241.5 && rotation < 272):
                        mthDate = (276 - days).toFixed(0);
                        mthDate = mthDate > 30 ? 30 : mthDate;
                        mth = 3;
                        break;
                    case (rotation > 211 && rotation < 242):
                        mthDate = (246 - days).toFixed(0);
                        mthDate = mthDate > 31 ? 31 : mthDate;
                        mth = 4;
                        break;
                    case (rotation > 181.5 && rotation < 212):
                        mthDate = (215 - days).toFixed(0);
                        mth = 5;
                        break;
                    case (rotation > 151 && rotation < 182):
                        mthDate = (185 - days).toFixed(0);
                        mth = 6;
                        break;
                    case (rotation > 120.5 && rotation < 152):
                        mthDate = (154 - days).toFixed(0);
                        mth = 7;
                        break;
                    case (rotation > 91 && rotation < 121):
                        mthDate = (123 - days).toFixed(0);
                        mth = 8;
                        break;
                    case (rotation > 60.5 && rotation < 92):
                        mthDate = (93 - days).toFixed(0);
                        mth = 9;
                        break;
                    case (rotation > 30.5 && rotation < 61):
                        mthDate = (62 - days).toFixed(0);
                        mth = 10;
                        break;
                    case (rotation > 0.4 && rotation < 31):
                        mthDate = (32 - days).toFixed(0);
                        mth = 11;
                        console.log(rotation)
                        break;
                    default:
                          days = days === 0 ? 364 : days - 1;
                          mthDate = (365 - days).toFixed(0);
                          mth = 0;
                        break;
                }
              //console.log(rotation +' <> '+ days+' <=> '+mthDate+' - '+mth+' : ');
               // console.log(rotation);
                picker.set('select', new Date(y, mth, mthDate));
            } 
        });
        //get date and rotate wheel
        picker.on({
            close: function(){
                pickerDate = (picker.get('select', 'd-m')).split("-");
                var pickerDay = parseInt(pickerDate[0]),
                    pickerMonth = parseInt(pickerDate[1]);
                switch(pickerMonth){
                    case 1:
                        pickerDay = pickerDay === 1 ? 1.105 : pickerDay;
                        pickerRotation = 361 - pickerDay;
                        break;
                     case 2:
                        pickerDay = pickerDay > 28 ? 28 : pickerDay;
                        pickerRotation = 330 - pickerDay;
                        break;
                     case 3:
                        pickerRotation = 302.6 - pickerDay;
                        break;
                     case 4:
                        pickerRotation = 272 - pickerDay;
                        break;
                     case 5:
                        pickerRotation = 242.46 - pickerDay;
                        break;
                     case 6:
                        pickerRotation = 212.1 - pickerDay;
                        break;
                     case 7:
                        pickerRotation = 182.52 - pickerDay;
                        break;
                     case 8:
                        pickerRotation = 152 - pickerDay;
                        break;
                     case 9:
                        pickerRotation = 121.6 - pickerDay;
                        break;
                     case 10:
                        pickerRotation = 92 - pickerDay;
                        break;
                     case 11:
                        pickerRotation = 61.2 - pickerDay;
                        break;
                     default:
                        pickerRotation = 31.6 - pickerDay;
                        break;
                }
               // console.log(pickerRotation+' :::: '+pickerDate);
                rotateWheel(pickerRotation);
            },
            render: function(){
                //get birthday for date intervals
                var bdate = moment(new Date(picker.get()));
                //return added dates
                function addDays(x){
                    var d = moment(bdate).add(x, 'days').format('DD MMM YYYY');
                    return Date.parse(d) ? d : '-';
                }
                ////
                 function addMonths(i, x){
                    var str = i ? 'months': 'weeks',
                         d = moment(bdate).add(x, str).format('DD MMM YYYY'),
                         m = moment(new Date(d)).format('M'),
                         dd = moment(bdate).format('DD'),
                         bdd = moment(new Date(d)).daysInMonth();
                     //if day of month < birthday's date
                     if((parseInt(dd) === 29 || parseInt(dd) === 30 || parseInt(dd) === 31) && bdd < dd){ 
                          d = moment(new Date(d)).add(1, 'days').format('DD MMM YYYY');
                     }
                     //return date
                    return Date.parse(d) ? d : '---';
                }
                 //display interval dates   
                $('.dose1').text(addDays(2)+" - "+addDays(5));
                $('.dose2').text(addDays(10)+" - "+addDays(12));
                $('.dose3').text(addDays(15)+" - "+addDays(20));
                //display immunisation dates
                $('.age1').text(addMonths(false, 6));
                $('.age2').text(addMonths(true, 4));
                $('.age3').text(addMonths(true, 6));
                
            }
        })
        //rotate wheel
        var draggableWheel = Draggable.get('#wheel');
        function rotateWheel(r){
            //console.log('Rotate || '+r);
            TweenMax.to(wheel, 1, { rotation: r, ease:Circ.easeInOut });
            draggableWheel.update();
        }
       //reset wheel
        $('.reset').on('click', function(){
            picker.clear();
            rotateWheel(359.9);
        })
        //show message
        var modal = $('.modal');
        $('.btn-info').on('click', function(){
            modal.show();
            setTimeout(function(){
               modal.addClass('dimmer')
               .find('.ui').fadeIn(500);
            }, 150);
            
            modal.find('.close').on('click', function(){
                $(this).parent().hide().parents('.modal').removeClass('dimmer').hide();
            });
        })
        
    })
    .controller('infoCtrl', function($scope){
            //Initialize Swiper
    var swiper = new Swiper('.swiper-container', {
        scrollbar: '.swiper-scrollbar',
        direction: 'vertical',
        slidesPerView: 'auto',
        mousewheelControl: true,
        freeMode: true
    });
    })
