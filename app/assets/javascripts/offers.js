latitude=''
longitude=''
tag_id=''
subtag_id=''

$(document).ready(function(){
	latitude = $("#latitude").val();
	longitude = $("#longitude").val();
	geolocation()
});

$(document).on('click','.tag_button', function(){
	tag_id = $(this).data('tag-id')
	subtag_id = $(this).data('subtag-id')
	get_offers()
});

function get_offers(){
	//alert("latitude:"+latitude+" longitude:"+longitude+" tag_id:"+tag_id+" subtag_id:"+subtag_id)
	$.ajax({
		type:'get',
		url:'offers/show/?latitude='+latitude+'&longitude='+longitude+'&tag_id='+tag_id+'&subtag_id='+subtag_id,
		success:function(data){
			$("#search_page").html(data)
		}
	});
}

function set_position(position){
	latitude = position.coords.latitude
	longitude = position.coords.longitude
	get_offers()
}

function display_map(){
	var info={
	    coords:{latitude: latitude ,longitude:longitude},
	    zoom:  zoom || 15,
	    mapId:'position_map',
	}
  	createMap(info)
}