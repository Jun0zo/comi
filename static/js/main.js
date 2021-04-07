function replaceAll(str, searchStr, replaceStr) {
	return str.split(searchStr).join(replaceStr);
  }

	  var title_list = [];
	  var now_title = 0;
	  var pnt = 0;
	  isType = true;
	  isErase = false;
  $('document').ready(function(){
	  
	  $.each($('.title-list li'), function(index, title){
		  title_list.push(title.innerHTML);
	  });
  
	  var tyItv = setInterval(typing,100,0);
	  var erItv;
	  //var erItv = setInterval(erase,100,1);
  
	  function typing(title_index){
		  if(isType == true){
			  if($('.title')[0].innerHTML.length <= title_list[title_index].length){
				  $('.title')[0].append(title_list[title_index][pnt++]);
			  }
			  else {
				  isErase = true;
				  isType = false;
				  pnt=0;
				  clearInterval(tyItv);
				  setTimeout(function(){
					  tyItv = setInterval(erase,100,0);
				  }, 5000);
			  }
		  }
	  }
  
	  function erase(title_index){
		  
		  if(isErase == true){ 
			  if($('.title')[0].innerHTML.length > 1)
			  	$('.title')[0].innerHTML = $('.title')[0].innerHTML.slice(0,-1);
			  else {
				  now_title = (now_title + 1) % (title_list.length);
				  isErase = false;
				  isType = true;
				  clearInterval(erItv);
				  setTimeout(function(){
					    erItv = setInterval(typing,100,now_title);
					    ('.title')[0].innerHTML = $('.title')[0].innerHTML.slice(0,-1);
				  }, 500);
			  }
		  }
	  }
  
	  $('.profile').on('click', function(){
        if($('.hidden_profile').hasClass('invisible'))
            //console.log('oo')
            $('.hidden_profile').removeClass('invisible');
        else
            $('.hidden_profile').addClass('invisible');
            //console.log('nn');
    	});
  
  });