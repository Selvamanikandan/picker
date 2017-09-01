
$(document).ready(function(){
	var backupVal;
	var maxLimit = {
			'Date'	: 31,
			'Month'	: 12,
			'FullYear'	: 2100,
			'Hours'	: 23,
			'Minutes': 59,
			'Seconds': 59
		}
	var minLimit = {
			'Date'	: 01,
			'Month'	: 01,
			'FullYear'	: 2000,
			'Hours'	: 00,
			'Minutes': 00,
			'Seconds': 00
		}
	var prependZero = function() {
		backupVal = '';
		$(this).val() <= 0 ? $(this).val('') : ''
		if ($(this).val() === '') return;
		if ($(this).attr('placeholder').length !== $(this).val().length){ 
			//$(this).attr('type', 'text');
			var Zeros = '';
			for(var j=0; j<($(this).attr('placeholder').length - $(this).val().length); j++){
				Zeros = '0' + Zeros;
			}
			$(this).val(Zeros + $(this).val());
		}
	};
	
	var enableUsecurrent = function(){
		$('#datePicker').find('input').each(function(){
			$('#'+$(this).attr('id')).val(new Date()['get'+$(this).attr('id')]())
			if($(this).val().length == 1){
				$(this).val('0'+$(this).val())
			}
		})
	}
	console.log($('#datePicker').attr('format').split(':'))
	if($('#datePicker').attr('useCurrent') == 'true'){
		enableUsecurrent()
	}
	var removeZero = function() {
		//console.log(parseInt($('#Month').val()),parseInt($('#Date').val()),$('#FullYear').val())
		backupVal = '';
		/*if(parseInt($('#Date').val()) > 31){
			//console.log('if Date')
			if(!$('#Date').hasClass('errorCls')){
				//console.log('if Date if')
				$('#Date').addClass('errorCls')					
				$('#Date').focus()
			}			
		}else*/ 
		if(parseInt($('#Month').val()) == 2 && parseInt($('#Date').val()) > 28){
			console.log('if Month')
			if((parseInt($('#Date').val()) < 30)&&((parseInt($('#FullYear').val()) % 4 == 0) && (parseInt($('#FullYear').val()) % 100 != 0)) || (parseInt($('#FullYear').val()) % 400 == 0)){
				console.log('if FullYear')
				$('#Date').removeClass('errorCls')
			}else{
				if(!$('#Date').hasClass('errorCls')){
					console.log('if Month else if')
					$('#Date').addClass('errorCls')					
					$('#Date').focus()
				}
			}
		}else if((parseInt($('#Month').val()) % 2 == 0) && parseInt($('#Date').val()) > 30){					
			if(!$('#Date').hasClass('errorCls')){
				console.log('if Month if')
				$('#Date').addClass('errorCls')					
				$('#Date').focus()
			}
		}else{
			//console.log('else')
			if(parseInt($(this).val())){
				$('#Date').removeClass('errorCls')
			}
		}
		//$(this).attr('type', 'number');
	};
  
	var limitVal = function(e) {
		//console.log('came',$(e.currentTarget).val())
		if($(e.currentTarget).val() == 0){
			$('.errspan.fa.fa-angle-down').css({'color':'#444','font-weight':'normal'});
			$('.errspan.fa.fa-angle-up').css({'color':'#444','font-weight':'normal'});
		}
		if($(e.currentTarget).val() > 0){
			backupVal = $(e.currentTarget).val();
			//$(this).val($(this).val() > maxLimit[$(this).attr('id')] ? maxLimit[$(this).attr('id')] : $(this).val())
			if($(e.currentTarget).val() > maxLimit[$(e.currentTarget).attr('id')]){
				$(e.currentTarget).val('')
			}
			if(($(e.currentTarget).attr('placeholder').length) <= $(e.currentTarget).val().length) {
				$(e.currentTarget).val($(e.currentTarget).val().slice(0,$(e.currentTarget).attr('placeholder').length))
			}	
		}
		
		if($(e.currentTarget).val().length == $(e.currentTarget).attr('placeholder').length){
			if($(e.currentTarget).val() > minLimit[$(e.currentTarget).attr('id')] && !$('#Date').hasClass('errorCls')){		
				$(e.currentTarget).nextAll('input').first().focus()			
			}else if($(e.currentTarget).val() <= minLimit[$(e.currentTarget).attr('id')]){
				$(e.currentTarget).val('')
			}	
		}
		
		
		
		
	}
	var restrictVal = function(eve) {
		var regex = /^[0-9]$/		
		if(regex.test(eve.key) || eve.keyCode == 16 || eve.keyCode == 36 || eve.keyCode == 46 || eve.keyCode == 8 || eve.keyCode == 9 || eve.keyCode == 35 || eve.keyCode == 37 || eve.keyCode == 39 || eve.keyCode == 38 || eve.keyCode == 40){			
			//console.log('came', eve, $(this).val())
			if(eve.keyCode == 38){
				//$(this).next().val($(this).next().val() ? parseInt($(this).next().val()) : 1)
				var j = parseInt($('#Month').val()) == 2 ? maxLimit[$(this).attr('id')] - 2 : parseInt($('#Month').val()) % 2 == 1 ? maxLimit[$(this).attr('id')] : parseInt($('#Month').val()) % 2 == 0 ? maxLimit[$(this).attr('id')] - 1 : maxLimit[$(this).attr('id')] 
				if(parseInt($(this).val()) < maxLimit[$(this).attr('id')]){
					$(this).val(parseInt($(this).val()) + 1)
					$(this).next().next().find('.fa-angle-up').css({'color':'#000','font-weight':'bold'})
					$(this).next().next().find('.fa-angle-down').css({'color':'#444','font-weight':'normal'})
					return false
				}
				else if(parseInt($(this).val()) >= maxLimit[$(this).attr('id')]){
					//console.log('came')
					//$(this).next().val($(this).next().val() ? (parseInt($(this).next().val()) + 1) : 1)
					//$(this).val(minLimit[$(this).attr('id')])
					//$(this).next().css({'color':'#000','font-weight':'bold'});
					//$(this).next().next().css({'color':'#444','font-weight':'normal'});
					//console.log('came',$(this).next(),$(this).next().val())
				}
				else{
					$(this).val($(this).val() ? parseInt($(this).val()) : minLimit[$(this).attr('id')])
				}
			}
			else if(eve.keyCode == 40){
				//var minim = $(eve.currentTarget).attr('id') == 'FullYear' ? 2000 : 1
				if(parseInt($(this).val()) > minLimit[$(this).attr('id')]){
					$(this).val(parseInt($(this).val()) - 1)
					$(this).next().next().find('.fa-angle-down').css({'color':'#000','font-weight':'bold'});
					$(this).next().next().find('.fa-angle-up').css({'color':'#444','font-weight':'normal'})
					
					// $(this).next().next().css({'color':'#000','font-weight':'bold'});
					// $(this).next().css({'color':'#444','font-weight':'normal'});
					return false
				}
				else if(parseInt($(this).val()) >= maxLimit[$(this).attr('id')]){
					//$(this).next().val($(this).next().val() ? (parseInt($(this).next().val()) + 1) : 1)
					//$(this).val(maxLimit[$(this).attr('id')])
					//$(this).next().css({'color':'#000','font-weight':'bold'});
					//$(this).next().next().css({'color':'#444','font-weight':'normal'});
					//console.log('came',$(this).next(),$(this).next().val())
				}
				else{
					$(this).val($(this).val() ? parseInt($(this).val()) : maxLimit[$(this).attr('id')])
				}
			}
			else{
				//console.log('eve',eve,eve.key)
				return true
			}
		}
		else{
			return false
		}
	}
      
	$('.customDate').on('blur', prependZero)
	$('.customDate').on('focus', removeZero)
	$('.customDate').on('input', limitVal)  
	$('.customDate').on('keydown', restrictVal)  
	
$(".input-dob" ).focus(function() {
	$(this).next().css('display', 'none');
	$(this).next().next().css('display','inline')
});

$(".input-dob" ).focusout(function() {
	$(this).next().css('display', 'inline-block');
	$(this).next().next().css('display','none')
});

$('#Seconds').focus(function(){
	$('#Seconds').next().css('display','inline');
});

$('#Seconds').focusout(function(){
	$('#Seconds').next().css('display','none');
});
});
