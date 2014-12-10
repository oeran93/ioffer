class Coordinate
	
	def self.getLatLngRange(latitude, longitude, range)
		earth_radius=3960.0
		degrees_to_radians=Math::PI/180.0
		radians_to_degrees=180.0/Math::PI
		r= earth_radius*(Math.cos(latitude*degrees_to_radians))
		longRange=(range/r)*radians_to_degrees
		latRange=(range/earth_radius)*radians_to_degrees
		return {:latMin => latitude-latRange,:latMax => latitude+latRange,:lngMin => longitude-longRange,:lngMax =>longitude+longRange}
	end

end






