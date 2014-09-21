//***********COMMON VARIABLES****************
var launchScannerUrl = 'launch_scann/';
var cropData = '';
var cropImageUrl = 'crop_image/';
var imageData = '';

// ***********COMMON VARIABLES****************
$(document).ready(function() {

			//-----------------------
	
			    var picture = $('#sample_picture');
			    picture.on('load', function(){
			      // Initialize plugin (with custom event)
			      picture.guillotine({eventOnChange: 'guillotinechange'});
			
			      // Display inital data
			      var data = picture.guillotine('getData');
			      for(var key in data) { $('#'+key).html(data[key]); }
			
			      // Bind button actions
			      $('#rotate_left').click(function(){ picture.guillotine('rotateLeft'); });
			      $('#rotate_right').click(function(){ picture.guillotine('rotateRight'); });
			      $('#fit').click(function(){ picture.guillotine('fit'); });
			      $('#zoom_in').click(function(){ picture.guillotine('zoomIn'); });
			      $('#zoom_out').click(function(){ picture.guillotine('zoomOut'); });
			
			      // Update data on change
			      picture.on('guillotinechange', function(ev, data, action) {
			        data.scale = parseFloat(data.scale.toFixed(4));
			        for(var k in data) { $('#'+k).html(data[k]); }
			      });
			    });
			//-----------------------
		        $('.dropdown-toggle').dropdown();
			// $('button').css('height', $('button').parent('td').height());
			// $('button').css('width', $('button').parent('td').width());

			/*
			 * $(".cropper").cropper({ aspectRatio: 1.618, preview:
			 * ".img-preview", done: function(data) { console.log(data); } });
			 */
		        
		       
		        
			var $modal = $("#bootstrap-modal"), $image = $modal
					.find(".bootstrap-modal-cropper img"), originalData = {};

			$modal.on("shown.bs.modal", function() {
				$image.cropper({
					multiple : true,
					data : originalData,
					preview : ".img-preview",
					done : function(data) {
						console.log(data);
						cropData = data;
					}
				});
			}).on("hidden.bs.modal", function() {
				originalData = $image.cropper("getData");
				// alert(data.x+"==="+data.y+"==="+data.height+"==="+data.width);
				//alert(originalData);
				$image.cropper("destroy");
			});

			$("#launch_scanner").click(function() {

				launchScanner();
			});
			
			$("#launch_modal2").click(function() {
				 
				$('#imageEdit-modal').modal('show');
				 
			});


			$('#zoom_in').click(function() {
				zoomIn($(this));
			});

			$('#zoom_out').click(function() {
				zoomOut($(this));
			});

			$('#rotate').click(function() {
				var rotateDeg = $('.editPoint').data('rotate') || 0;
				alert($('.editPoint').data('rotate'));
				var rotate = 'rotate(' + rotateDeg + 'deg)';
				$('.editPoint').css({
					'-webkit-transform' : rotate,
					'-moz-transform' : rotate,
					'-o-transform' : rotate,
					'-ms-transform' : rotate,
					'transform' : rotate
				});

			});

			$('#crop').click(
					function() {

						crop(imageData, cropData.height, cropData.width, cropData.x, cropData.y);
					});
			
			$('#new_scan').click(function() {
				newScan($(this));
			});
			
			$('#save').click(function(){
				
				var count   = $("#hidden_values a").length + 1;
				fieldSource = $('#croped-img').attr('src');
				if(fieldSource !== ""){
				inputValue  = "<a href=\"#\" class=\"\"> <img id=\"i"+count+"\" style=\" display: block;\" src="+fieldSource +"></img> </a>";
				
				pageString  = "<!DOCTYPE html> <html lang=\"en\"> <head> <meta charset=\"UTF-8\"> <title>Image Preview</title> </head>  <body>"; 
				pageString += inputValue; 
				pageString += "</body> </html>";
				
				thumbNail  = "<div class=\"col-xs-6 col-md-4\"> <a href=\"#\" class=\"thumbnail\">"; 
				thumbNail += "<img id=\"p"+count+"\" style=\" height:200px; width:200x; display: block;\" src="+ fieldSource+">";
				thumbNail += "</img> </a> </div>";
				
				input = $(inputValue);
				
				if (count <= 3){
					
					$('#p'+count).attr('src',fieldSource);
					$('#hidden_values').append(input);
					$('#croped-img').attr('src',"");
				} else {
					
					$(thumbNail).appendTo('#thumbnail_row');
					$('#hidden_values').append(input);
					$('#croped-img').attr('src',"");
				}
				
				$('#bootstrap-modal').modal('hide');
				
				} else {
					alert("IMAGE NOT CROPPED USE CLOSE OPTION TO EXIT WITHOUT CROP")
				}
				
				
				
			});
			
		});



function newScan(getObj){
	
	
	
	$('.img-preview').css({'display':'block'});
	$('.cropped-preview').css({'display':'none'});
	var launchScanner = $.ajax({
		data : {},
		//url : launchScannerUrl,
		url : 'launch_scannn/',
		async : false,
		type : 'GET',
		beforeSend : function() {
		
		},
		success : function(newResponseData) {
			imageData = newResponseData;
			//alert(imageData);
			/*$('.editPoint').remove();
			$('.cropper-container img').remove();
			$( '<img class="cropPoint" src="data:image/jpeg;base64,'+newResponseData+'" ></img>').appendTo( ".cropper-container" );
			$( '<img class="editPoint" src="data:image/jpeg;base64,'+newResponseData+'" ></img>').appendTo( ".bootstrap-modal-cropper" );*/
			
			$('.editPoint').attr('src','data:image/jpeg;base64,' + newResponseData);
			d = new Date();
			$('.editPoint').attr('name',d.getSeconds());
			$('.img-preview').css({'display':'block'});
			$('.cropped-preview').css({'display':'none'});
		
		},
		error : function(e, xhr, opt) {
			alert("Error requesting " + opt.url + ": " + xhr.status + " "+ xhr.statusText);
		}
	    });
	}


function launchScanner() {

	var launchScanner = $.ajax({
		data : {},
		url : launchScannerUrl,
		async : false,
		type : 'GET',
		beforeSend : function() {
			overLay('ON');
		},
		success : function(responseData) {
			imageData = responseData;
			overLay('OFF');
			$('#ajax_loader').hide();
			
			$('.editPoint').attr('src','data:image/jpeg;base64,' + responseData);
			
			
			$('.img-preview').css({'display':'block'});
			$('.cropped-preview').css({'display':'none'});
			$('#bootstrap-modal').modal('show');
			responseData = "";
		},
		error : function(e, xhr, opt) {
			alert("Error requesting " + opt.url + ": " + xhr.status + " "+ xhr.statusText);
		}
	});

}

function overLay(flag) {
	if (flag == 'ON') {
		var overlay = document.createElement('div');
		overlay.setAttribute('id', 'OVER');
		overlay.innerHTML = "<div class='overlay'><img id='ajax_loader' src='data:image/gif;base64,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'> </img></div>";
		document.body.appendChild(overlay);
	} else {
		$("#OVER").remove();
	}
}

function ajaxErrorHandler(jqXHR, exception) {

	if (jqXHR.status === 0) {
		return ('Not connected.\nPlease verify your network connection.');
	} else if (jqXHR.status == 404) {
		return ('The requested page not found. [404]');
	} else if (jqXHR.status == 500) {
		return ('Internal Server Error [500].');
	} else if (exception === 'parsererror') {
		return ('Requested JSON parse failed.');
	} else if (exception === 'timeout') {
		return ('Time out error.');
	} else if (exception === 'abort') {
		return ('Ajax request aborted.');
	} else {
		return ('Uncaught Error.\n' + jqXHR.responseText);
	}
}

function crop(imageData, imageHeight, imageWidth, imagePosX, imagePosY) {

	var cropedImageData = '';
	var postCropData = {};
	postCropData['imageData'] = imageData;
	postCropData['imageHeight'] = imageWidth;
	postCropData['imageWidth'] = imageHeight;
	postCropData['imagePosX'] = imagePosX;
	postCropData['imagePosY'] = imagePosY;

	//alert(imageHeight + "==" + imageWidth + "==" + imagePosX + "==" + imagePosY);
	var postCropData = JSON.stringify(postCropData);
	
	var cropedImage = $.ajax({
		data : {
			para : postCropData
		},
		dataType : 'json',
		url : cropImageUrl,
		async : false,
		type : 'POST',
		success : function(resData) {
			
			$('.cropped-preview').css({'display':'block'});
			$('.img-preview').css({'display':'none'});
			$('#croped-img').attr('src',resData['croppedData']);
		},
		error : function() {
			alert('Ajax readyState: ' + xhr.readyState + '\nstatus: '
					+ xhr.status + ' ' + err);
		}
	});

	return cropedImageData;

}

function zoomIn(refObj) {

	$('.cropper-container').css("cursor", "pointer");
	$('.cropper-container').animate({
		width : "80%",
		left : "0px"
	}, 'slow');

}

function zoomOut(refObj) {

	$('.cropper-container').animate({
		width : "60%"
	}, 'slow');

}

function rotate(rotateDeg) {
	var deg = rotateDeg + 90;
	var rotate = 'rotate(' + deg + 'deg)';
	$('.editPoint').css({
		'-webkit-transform' : rotate,
		'-moz-transform' : rotate,
		'-o-transform' : rotate,
		'-ms-transform' : rotate,
		'transform' : rotate
	});

}