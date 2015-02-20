$(document).ready(function(){
	if(userReviews.length> 3){
		$('#showReviews').show();
		$('.reviews').hide();
		$('#showReviews').click(function(){
			$('#showReviews').toggle('slow');
		})
	}
})