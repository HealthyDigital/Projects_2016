$(document).ready(function(){
	var height = String(648 - $('.references').height()) + 'px';
	$('.references').css('top',height)
            
	$('.ref').on('tap', function(){
		$('.references').css('display') == 'none' ? $('.references').fadeIn(300) : $('.references').fadeOut(300)
	});
});
