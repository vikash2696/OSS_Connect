/**
 * Author: Vikash kumar
 */
/*
$("form#photo_form").submit(function() {

   var data = new FormData();
jQuery.each(jQuery('.postPhoto')[0].file, function(i, file) {
    data.append('file-'+i, file);
});
	console.log(data); return;
	var formData = {
		    post_data: data,
		};

	$.ajax({
		url: "/postData",
		data: formData,
		method: "POST",
		success: function(result){
			return true;
		}
	});
});*/

/*$(document).ready( function ()
{
	$('.photo_share').change(function()
	{
		var photo_share = $(this).find('option:selected').text();
		if(photo_share === 'Add Photo') {
			$(".photo_input").show();
			$(".title_input,.title_label,.saveBtn").hide();		
		} else{
			$(".photo_input").hide();	
			$(".title_input,.title_label,.saveBtn").show();
		}
		
	});
});*/