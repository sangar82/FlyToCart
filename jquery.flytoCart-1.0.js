/*
 * flytoCart v1.0
 * http://jquery.com/
 *
 * Copyright 2011, Iván Sánchez (Girona)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license.
 *
 * Date: Mon Nov 14 12:10:21 2011
 */

$.fn.flytoCart = function(callback, options){  	

	//create the variable stop to avoid a double click with two movements of the same image
	var fstop = false;
	
	// Default settings
	$.fn.flytoCart.defaults = {  
	    destination 	: 	".destination",
	    velocity		 	:	1200	
	};  
	
	// Override default settings
	var opts = $.extend({}, $.fn.flytoCart.defaults, options);  

	$(this).click(function() {
			
			if (!fstop){
					
					// Calculate image position
					var fproductX 				= 		$(this).children().offset().left;
					var fproductY 				= 		$(this).children().offset().top;
					
					// Calculate basket // shopping cart  position
					var fbasketX 					= 		$(opts.destination).offset().left;
					var fbasketY 					= 		$(opts.destination).offset().top;
					
					// Calculate the image´s movement
					var fgotoX 					= 		fbasketX - fproductX;
					var fgotoY 					= 		fbasketY - fproductY;
					
					// Calculate the witdh and height of the new image that we will move
					var fnewImageWidth 		= 		$(this).children().width() / 3;
					var fnewImageHeight		= 		$(this).children().height() / 3;
					
					var fparent 					= 		this;
					fstop 							=		true;
					
					//begin the transition
					$(this).children()
					.clone()
					.prependTo(fparent)
					.css({'position' : 'absolute'})
					.animate({opacity: 0.4}, 100 )
					.animate({opacity: 0.1, marginLeft: fgotoX, marginTop: fgotoY, width: fnewImageWidth, height: fnewImageHeight}, opts.velocity, function() {
						
						// Remove the image that moved
						$(this).remove();	
						
						// Call the callback
					    if (typeof callback == 'function') { 
					        callback.call(this); // brings the scope to the callback
					    }

						// reset of the variable stop to allow a new movement
						fstop = false;
					});	
			}
			
	    return false;   
   }); 
   
};