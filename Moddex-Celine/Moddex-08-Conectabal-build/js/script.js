$( function(){
//prevent iPad rubber band effect
    $(document).on('touchmove', function(e){ e.preventDefault(); });

    navToSlide('.navigation >li:first-child', 'Moddex-03-Assistrail');
    navToSlide('.navigation >li:nth-child(2)', 'Moddex-05-Bikesafe');
    navToSlide('.navigation >li:nth-child(3)', 'Moddex-07-Conectabal');
    navToSlide('.navigation >li:nth-child(4)', 'Moddex-09-Nexus');
    navToSlide('.navigation >li:nth-child(5)', 'Moddex-10-Tuffrail');
    navToSlide('.navigation >li:nth-child(6)', 'Moddex-12-Tuffstop');
    navToSlide('.navigation >li:nth-child(7)', 'Moddex-14-Intac');
    navToSlide('.navigation >li:nth-child(8)', 'Moddex-16-Tredmaxx');
    navToSlide('.logo', 'Moddex-Brochure');

    $('article').on('doubleTap', function(){
        document.location= "veeva:gotoSlide(Moddex-02-Menu.zip)";
    })
})

$('.left-info, .right-info, div.references').on('tap', function(){
    $(this).hasClass('active') ? 
        $(this).removeClass('active'):
        $(this).addClass('active');
})


//go to slide
function navToSlide(btn, asset, id){
    "use strict";
    $(btn).on('tap', function(){
        id = id ? ', '+id+'' : '';
        document.location = 'veeva:gotoSlide('+asset+'.zip'+id+')';
    });
}

function selection(item, children){
    $(item).on('tap', function(){
        var sibling = $(this).siblings();

        // applicable for base + rail types
        // check if there are any selected siblings
        // remove their selected class and that of their children
        children == null ?
            null:
            (
                $(sibling).hasClass('selected') ?
                (
                    $(sibling).removeClass('selected'),
                    unselect_children(children)
                ): null
            )

        // unselect a selected item - remove their selected class and that of their children
        // select an unselected item and show their children
        $(this).hasClass('selected') ?
            (
                $(this).removeClass('selected'),
                unselect_children(children)
            ) :
            (
                $(this).addClass('selected'),
                show_children($(this).attr('value'))
            )

        get_model(item)

    })
}


// unselect and hide children (rails/add-ons) of previously selected item
function unselect_children(children){
    $(children).each(function(){
        $(this).removeClass('selected');
        $(this).is(':visible') ? $(this).hide() : null;
    })
}

//show children (rails/add-ons) of currently selected item
function show_children(val){
    var a = lookup[val];

    a === undefined? 
        null :
        (
            a = a.split(','),
            $.each(a, function(i, v){
                $('li[value=' + v + ']').show();
            })
        )
}

function get_model(){
    var v = []

    $('.selected').each(function(){
       v.push($(this).attr('value'));
    })

    v.sort();
    console.log(v.join());
    var m = model[v.join()];
    $('#r, #r0, #r1, #r2, #r3').attr('value', null).hide()
    m === undefined? 
        (
            $('#m-id').html(''),
            $('#m-des').html('No model selected')
        ) :
        ( 
            $('#m-id').html(m[0]),
            $('#m-des').html(m[1]),
            $.each(v, function(index, value){
                var i_string = index.toString();
                $('#r' + i_string).attr('value', value).show()
            }),
            $('#r').show()
        )
    
    
}