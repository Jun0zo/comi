$( document ).ready(function() {
    var room_list = $('.room');

    $.each(room_list, function(index, room){
        $(room).on("click", function(){
            window.location.href = 'editor';
        })
    })

    $('input#autocomplete-group').autocomplete({
        data: {
          "군산대학교": 'static/img/ksimg.jpg',
          "고려대학교": 'static/img/koreaimg.jpg',
          "아주대학교": 'static/img/azuimg.png',
        },
      });

    $('.profile').on('click', function(){
        if($('.hidden_profile').hasClass('invisible'))
            //console.log('oo')
            $('.hidden_profile').removeClass('invisible');
        else
            $('.hidden_profile').addClass('invisible');
            //console.log('nn');
    });

    $('body').on('click', function(e){
        /* var c_name =  e.target.getAttribute('class'); */
        
        //var c_name = $(e.target).parents('div')[1].split(' ')[0];
        if($(e.target).parents('div').length >= 1){
            var c_name_1 = $(e.target).parents('div')[0].className;
            var c_name_2 = $(e.target).parents('div')[1].className;
            if(c_name_2 != 'hidden_profile' && c_name_1 != 'profile')
                if(!$('.hidden_profile').hasClass('invisible'))
                    $('.hidden_profile').addClass('invisible');
            
        }else
            $('.hidden_profile').addClass('invisible');
        /*
        if(c_name != 'hidden_profile'){
            if($('.hidden_profile').hasClass('invisible'))
                $('.hidden_profile').removeClass('invisible');
            else
                $('.hidden_profile').addClass('invisible');
        }*/
    })
});

