

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

})


$('#filter-records .v-label').click(function(){
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


$('.v-label').click(function(){
	$.when(v_brand).then(function(){
		var model_box = anime.timeline();

		model_box
		.add({targets: '#model-select',
				perspective: '2500px',
			    transformStyle: 'preserve-3d',
			    backgroundColor: 'red',
			    duration:10000})
		.add({
				targets: '#car-model',
				rotateX:50,
				duration:10000
			});
	});
	
});

	