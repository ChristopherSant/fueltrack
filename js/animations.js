

$('#txt-search').click(function(){
	var mainTitle = anime({
		  targets: '#main-title',
		  opacity: 0,
		  easing: 'easeOutQuart',
		  duration:550
		  
 	})
	searchBar = anime({
		  targets: '#filter-records, #search-bar',
		  translateY: '-98px',
		  easing: 'easeOutQuart',
		  duration:550

	});

	// setTimeout(function(){
	// 	  	$('#main-title').addClass('hide');  
	// 	  	searchBar = anime({
	// 			  targets: '#filter-records, #search-bar',
	// 			  translateY: '0',
	// 			  easing: 'easeOutQuart',
	// 		});
	// },500);


})


$(vbrand_label).click(function(){
	var brand_select = anime({
		  targets: '#search-bar, #filter-records',
		  opacity: 100,
		  translateY: 0,
		  easing: 'easeOutQuart',
		  duration:250,
		  delay: function(){
		  	$('#main-title, #second-title').addClass('hide');
		  }

 	})
});