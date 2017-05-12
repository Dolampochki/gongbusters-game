$(document).ready(function() {

	
	var names = ['Gracie Lopez','Nick Powers','Adja Mgs','Roy Gluckman','Minnie-Mouse Bonita','Coranetta Woods','Dj Green'];
	var videos = ['http://media.chosen.fm/chosen-videos/73/2a/685d3703a0b1410dc3bf2280eb5a15ec/Cover_Freestyle_f2e242a63827051e_d7ff1ef0f1aa11be_record_1.mov',
	                   'http://media.chosen.fm/chosen-videos/4e/14/a428bc20ca44f5d446cee54837b4fd6f/Cover_Upload_244143829010ed34_36bb57d2b5eed048_asset.mov',
	                   'http://media.chosen.fm/chosen-videos/a7/09/d9ff90f4000eacd3a6c9cb27f78994cf/Cover_Upload_dacb283d1182b49a_f03528f6f02eccd7_asset.mov',
	                   'http://media.chosen.fm/chosen-videos/58/26/dccb1c3a558c50d389c24d69a9856730/Original_Upload_c76e4b2fa54f8506_719a5c0dc14c2eb9_asset.mov',
	                   'http://media.chosen.fm/chosen-videos/0d/2d/c21f4ce780c5c9d774f79841b81fdc6d/Lipsync_28538c394c36e4d5_ea8ff5ad60562a93_record_1.mov',
	                   'http://media.chosen.fm/chosen-videos/ab/2e/211cbc6c7d410d6372ec40eda30e8baa/Cover_Freestyle_f1b77376e6da9ea8_126410f9331886e8_record_1.mov',
	                   'http://media.chosen.fm/chosen-videos/46/2c/26fd45817c0a0bb1e951d17fa7df947c/Cover_Freestyle_a9dd7e3c6ee87a48_cb35b729caf61eb5_record_1.mov'];
	var thumbnails = ['http://media.chosen.fm/chosen-fm-images/73/2a/685d3703a0b1410dc3bf2280eb5a15ec/Cover_Freestyle_f2e242a63827051e_d7ff1ef0f1aa11be_thumbnail.png',
	                       'http://media.chosen.fm/chosen-fm-images/4e/14/a428bc20ca44f5d446cee54837b4fd6f/Cover_Upload_244143829010ed34_36bb57d2b5eed048_thumbnail.png',
	                       'http://media.chosen.fm/chosen-fm-images/a7/09/d9ff90f4000eacd3a6c9cb27f78994cf/Cover_Upload_dacb283d1182b49a_f03528f6f02eccd7_thumbnail.png',
	                       'http://media.chosen.fm/chosen-fm-images/58/26/dccb1c3a558c50d389c24d69a9856730/Original_Upload_c76e4b2fa54f8506_719a5c0dc14c2eb9_thumbnail.png',
	                       'http://media.chosen.fm/chosen-fm-images/0d/2d/c21f4ce780c5c9d774f79841b81fdc6d/Lipsync_28538c394c36e4d5_ea8ff5ad60562a93_thumbnail.png',
	                       'http://media.chosen.fm/chosen-fm-images/ab/2e/211cbc6c7d410d6372ec40eda30e8baa/Cover_Freestyle_f1b77376e6da9ea8_126410f9331886e8_thumbnail.png',
	                       'http://media.chosen.fm/chosen-fm-images/46/2c/26fd45817c0a0bb1e951d17fa7df947c/Cover_Freestyle_a9dd7e3c6ee87a48_cb35b729caf61eb5_thumbnail.png'];
	var colors = ['#2380ad','#8d3589','#46943d','#d89548','#8f1358','#652d8f','#e65842'];
	
	var timer;
	var timerRewatch;
	var clipTime = 15000;
	var currentCard = 0;
	
	var winner = 3;
	
	$( ".card-screen.cards .game-card" ).each(function(index, element) {
	    // element == this
		$( element ).find(".screen-label").html( 'Performance <strong>' + (index + 1) + '</strong> from <strong>7</strong>');
		$( element ).find("source").attr( "src", videos[index] + '#t=0,15' );
		$( element ).find("source").attr('webkit-playsinline', '');
		$( element ).find(".screen-title").html( names[index] );
	  });
	
	$( ".card-screen.rewatch-screen .game-card" ).each(function(index, element) {
	    // element == this
		$( element ).find(".screen-label").html( 'Performance <strong>' + (index + 1) + '</strong> from <strong>7</strong>');
		$( element ).find("source").attr( "src", videos[index] + '#t=0,15' );
		$( element ).find("source").attr('webkit-playsinline', '');
		$( element ).find(".screen-title").html( names[index] );
	  });
	
	$( ".share-screen .choose-blocks .choose-block" ).each(function(index, element) {
	    // element == this
		$( element ).css( "background-color", colors[index] );
		$( element ).find(".fill").css( "border-color", colors[index] );
		$( element ).find(".user-profile-pic").css( "background-image", 'url(' + thumbnails[index] + ')');
		$( element ).find(".block-title span").html( names[index] );
	  });
	
	// opening
	$( ".opening-screen" ).addClass(" animated slideInUp");
	$( ".heart-bg" ).addClass(" animated zoomIn");
	
	$(".opening-screen-sound").volume = 0.2;
	$(".opening-screen-sound").trigger('play');
	$( ".opening-screen" ).delay(2000).queue(function(next){
	    $(this).removeClass(" animated slideInUp").addClass(" animated slideOutUp");
	    next();
	});
	
	$( ".heart-bg" ).delay(2000).queue(function(next){
	    $(this).removeClass(" animated zoomIn").addClass(" animated zoomOut");
	    next();
	});	
	
	$(".card-screen.cards").delay(2000).queue(function(next){
	    $(this).removeClass("hide").addClass(" show animated rotateInUpLeft");
	    $(".game-card-1 .card-video").trigger('play');
	    $(".game-card-1 .card-performance-timer").html("<img src='img/timer_white.gif?timestamp=" + new Date().getTime() + "' />");
	    next();
	});
	
	// cards
	

	
	timer = setTimeout(function() { cardPlay(currentCard) }, clipTime);
	
	function cardPlay(currentNumber){
		$(".card-screen.cards").addClass(" animated rotateOutDownRight");
		$(".game-card-" + (currentNumber + 1) + " .card-video").trigger('pause');
		$(".result-screen .choose-block").css("background-color",colors[currentNumber]);
		$(".result-screen .fill").css( "border-color", colors[currentNumber] );
		$(".result-screen .block-title span").html( names[currentNumber] );
		$(".result-screen .user-profile-pic").css( "background-image", 'url(' + thumbnails[currentNumber] + ')');
		
		if(currentNumber == winner){
			$(".result-screen .screen-title").html( "Gong Master" );
			$(".result-screen .game-large-icon img").attr( "src","img/game_icon_right_choice.png" );
			$(".result-screen .result-screen-correct").trigger('play');
			setTimeout(function(){
				$(".xp-screen").removeClass("hide").addClass(" show animated fadeInUp");
				$(".xp-video").trigger('play');
			}, 4200);
			
			setTimeout(function(){
				$(".xp-screen").removeClass(" animated fadeInUp").addClass(" animated fadeOutUp");
			}, 9000);
			
			setTimeout(function(){
				$(".share-screen").removeClass("hide").addClass(" show animated slideInUp");
				$(".opening-screen").addClass("hide");
				$(".card-screen").addClass("hide");
				$(".result-screen").addClass("hide");
				$(".xp-screen").addClass("hide");
			}, 9500);
		} else {
			$(".result-screen .screen-title").html( "Gong Busted" );
			$(".result-screen .game-large-icon img").attr( "src","img/game_icon_wrong_choice.png" );
			$(".result-screen .result-screen-wrong").trigger('play');
			setTimeout(function(){
				$(".share-screen").removeClass("hide").addClass(" show animated slideInUp");
				$(".opening-screen").addClass("hide");
				$(".card-screen").addClass("hide");
				$(".result-screen").addClass("hide");
				$(".xp-screen").addClass("hide");
			}, 4200);
		}
		
		$(".result-screen").removeClass("hide").addClass(" animated slideInDown");
		$( ".heart-bg" ).removeClass(" animated zoomOut").addClass(" animated zoomIn");
		setTimeout(function(){
			$(".result-screen").removeClass(" animated rotateInUpLeft").addClass(" animated slideOutUp");
			$( ".heart-bg" ).removeClass(" animated zoomIn").addClass(" animated zoomOut");			
		}, 4000);
		
	}
	
	$(".gong-button").click(function(){
		clearTimeout(timer);
		$(".game-card-" + (currentCard + 1)).addClass(" animated rotateOutDownRight");
		$(".game-card-" + (currentCard + 1) + " .card-video").trigger('pause');	
		$(".game-card-" + (currentCard + 2) + " .card-video").trigger('play');
	    $(".game-card-" + (currentCard + 2) + " .card-performance-timer").html("<img src='img/timer_white.gif?timestamp=" + new Date().getTime() + "' />");
		timer = null;
		timer = setTimeout(function() { cardPlay(currentCard) }, 15000);
		if (currentCard < 5) {
			currentCard ++;			
		} else {
			$(this).css("display", "none");
		}
	});
	
	
	
	// rewatch
	
	
	$(".share-screen .choose-block").each(function(index, element) {
		$(this).find(".review-clip").click(function(){			
			
			clearTimeout(timerRewatch);
			$(".share-screen").addClass(" animated rotateOutDownLeft");
			$(".rewatch-screen").delay(400).queue(function(next){
				$(this).removeClass("hide").removeClass("animated").removeClass("rotateOutDownRight").addClass("animated").addClass("rotateInUpRight");
				next();
			});
			$('.game-card-' + (index + 1)).removeClass(" hide");
			$(".game-card-" + (index + 1) + " .rewatch-video")[0].currentTime=0;
		    $(".game-card-" + (index + 1) + " .rewatch-video").trigger('play');
		    $(".game-card-" + (index + 1) + " .card-performance-timer").html("<img src='img/timer.gif?timestamp=" + new Date().getTime() + "' />");
		    
		    
		    timerRewatch = setTimeout(function(){
				$(".rewatch-screen").removeClass("animated").removeClass("rotateInUpRight").addClass("animated").addClass("rotateOutDownRight");
				$('.game-card').delay(300).queue(function(next){
				    $(this).addClass(" hide");
				    next();
				});
				$(".game-card-" + (index + 1) + " .rewatch-video").trigger('pause');
				$(".share-screen").delay(300).queue(function(next){
				    $(this).removeClass("animated").removeClass("rotateOutDownLeft").addClass("animated").addClass("rotateInUpLeft");
				    next();
				});
				timerRewatch = null;
				
			}, clipTime);
		    

			
		    
		});
	});	
	
	// back to share			
	
	
	$(".rewatch-screen .top-right-icon").click(function(){
		$(".rewatch-screen").removeClass("animated").removeClass("rotateInUpRight").addClass("animated").addClass("rotateOutDownRight");
		$('.game-card').delay(300).queue(function(next){
		    $(this).addClass(" hide");
		    next();
		});
		$(".rewatch-video").trigger('pause');
		$(".share-screen").delay(300).queue(function(next){
		    $(this).removeClass("animated").removeClass("rotateOutDownLeft").addClass("animated").addClass("rotateInUpLeft");
		    next();
		});
	});			
	
	// next round
	
	$(".share-screen .game-result-button").click(function(){
		location.reload();
	});
	
	
	
	

});

