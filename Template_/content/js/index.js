$( function(){
        var len = $("#slideshow > li").length,
        	i = 0, 
        	current, next, next_img;

        slideshow();

        function slideshow(){
    		/*setInterval(function(){
        		i == (len-1) ? 
        			$($("#slideshow > li, #slideshow-img > li").get(0)).addClass("current"):
        			$($("#slideshow > li, #slideshow-img > li").get(i+1)).addClass("current");

        		console.log(i);
        		return i;


        	}, 3000);
			*/


        	idx++;
    		idx == len ?
    			// if next index is out of range
	    		(next = $("#slideshow > li").get(0)[0], next_img = $("#slideshow-img > li").get(0)[0]):

	    		// if next index is inrange
	    		(next = $("#slideshow > li").get(idx)[0], next_img = $("#slideshow-img > li").get(idx)[0]);

    		$("#slideshow > li").css("background-color", "rgba(255, 255, 255, 0.8"),
    		$("#slideshow-img > li").css("opacity", "0")


        };

		

        /*// determine height of slideshow list based on lenth of list
        // subtracts border - change if border thickness is increased or decreased
        $("#slideshow > li").each(function(){
        	h = (700/len - 1.2).toString() + "px";
        	$(this).css("line-height", h);
        })*/

        
    });