$( function(){
        var next_page, map = {
        	"0" : "../index.html",
        	"1" : "p1.html",
        	"2" : "p2.html",
        	"3" : "p3.html",
        	"4" : "p4.html"
        }

        $("[data-ref=home]").on("tap", function(){
            window.location = "../index.html";
        })

        $(".slide").on('swipeleft swiperight', function(e){
        	if(e.type == 'swiperight'){
        		if(page != 0){
        			next_page = map[(page-1).toString()];
        		}
        	} else{
        		if(page != Object.keys(map).length){
        			next_page = map[(page+1).toString()];

        			if(page == 0){
        				next_page = "pages/" + next_page;
        			}

        		} else{
        			next_page = map[(0).toString()];
        		}
        	}

        	if(next_page != undefined ){
        		window.location = next_page;
        	}

        })

        

        
    });