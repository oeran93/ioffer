latitude=''
longitude=''
tag_id=''
subtag_id=''

$(document).ready(function(){
	latitude = $("#latitude").val();
	longitude = $("#longitude").val();
	get_offers()
	geolocation()
});

$(document).on('click','.search_button', function(){
	tag_id = $(this).data('tag-id')
	subtag_id = $(this).data('subtag-id')
	get_offers()
});

$(document).on('click','.subtag_button', function(){
	$('html,body').animate({scrollTop: $("#grid").offset().top - 64},'slow');
	$('.subtag_button').removeClass('active')
	$(this).toggleClass('active')
});

$(document).on('click','.tag_button', function(){
	var id = $(this).data("tag-id")
	$("#tag_bar").fadeOut(200)
	$("#subtag"+id).delay(200).fadeIn(200)
});

$(document).on('click','.tag_close', function(){
	$(".subtag_bar").fadeOut(200)
	$("#tag_bar").delay(200).fadeIn(200)
});

$(document).on('click','.get_offer_btn', function(){
	var button = $(this)
	$.ajax({
		type:'get',
		url:'user/get_offer/?offer_id='+$(this).data('offer-id'),
		success:function(){
			button.html('Delete Offer')
			button.removeClass("offer_btn get_offer_btn")
			button.addClass("offer_btn delete_offer_btn")
		},
	});
});

$(document).on('click','.delete_offer_btn', function(){
	var button = $(this)
	$.ajax({
		type:'get',
		url:'user/delete_offer/?offer_id='+$(this).data('offer-id'),
		success:function(){
			button.html('Get Offer')
			button.removeClass("offer_btn delete_offer_btn")
			button.addClass("offer_btn get_offer_btn")
		},
	});
});

$(document).on('click','#map_tab', function(){
	$('#position_map_modal').fadeIn(300)
	map = add_map('position_map')
	add_map_event(map)
});

$(document).on('click','#map_close', function(){
	$('#position_map_modal').fadeOut(300)
});

function get_offers(){
	//alert("latitude:"+latitude+" longitude:"+longitude+" tag_id:"+tag_id+" subtag_id:"+subtag_id)
	$.ajax({
		type:'get',
		url:'offers/show/?latitude='+latitude+'&longitude='+longitude+'&tag_id='+tag_id+'&subtag_id='+subtag_id,
		success:function(data){
			$("#grid").html(data)
		}
	});
}

function set_position(position){
	$("#spinner").hide()
	latitude = position.coords.latitude
	longitude = position.coords.longitude
	get_offers()
}

function add_map(map_name){
	var info={
	    coords:{latitude: latitude ,longitude:longitude},
	    zoom:  15,
	    mapId: map_name
	}
  	return create_map(info)
}

function add_map_event(map){
	google.maps.event.addListener(map, 'dblclick', function(event) {
    	latitude = event.latLng.lat()
    	longitude = event.latLng.lng()
    	get_offers()
  	});
}