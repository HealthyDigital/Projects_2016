var home_slide = document.getElementById('home');
var fvp_slide = document.getElementById('fvp');
var vacc_slide = document.getElementById('vaccination');
var facts_slide = document.getElementById('facts');
var res_slide = document.getElementById('resources');
var pneumo_slide = document.getElementById('pneumovax23');


function homeShow() {
  $(".slide").hide(1000);
  $("#home").show(1000)};

function fvpShow() {
  $(".slide").hide(1000);
  $("#fvp").show(1000)};

function vaccShow() {
  $(".slide").hide(1000);
  $("#vaccination").show(1000)};

function factsShow() {
  $(".slide").hide(1000);
  $("#facts").show(1000)};

function resShow() {
  $(".slide").hide(1000);
  $("#resources").show(1000)};

function pneumoShow() {
  $(".slide").hide(1000);
  $("#pneumovax23").show(1000)};

home_slide.addEventListener('swipeleft', fvpShow);
fvp_slide.addEventListener('swiperight', homeShow);
fvp_slide.addEventListener('swipeleft', vaccShow);
vacc_slide.addEventListener('swiperight', fvpShow); /*??*/
vacc_slide.addEventListener('swipeleft', factsShow);
facts_slide.addEventListener('swiperight', vaccShow);
facts_slide.addEventListener('swipeleft', resShow);
res_slide.addEventListener('swiperight', factsShow);
res_slide.addEventListener('swipeleft', pneumoShow);
pneumo_slide.addEventListener('swiperight', resShow);
pneumo_slide.addEventListener('swipeleft', homeShow);