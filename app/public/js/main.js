/**
 * Author: Vikash kumar
 */

/*$(document).on("click", '.saveBtn', function() {
//	 alert($(this).attr('id'));
//var id = "editor-"+$(this).attr('id');

	var data1 = CKEDITOR.instances.editor1.getData();
	var data2 = $('.postForm').serializeArray();
	var formData = {
		    post_data: data1,
		    group : data2['1'].value,
		    share: data2['2'].value
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

