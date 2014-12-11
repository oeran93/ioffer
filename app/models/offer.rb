class Offer < ActiveRecord::Base

	has_many :offer_dates
	belongs_to :business
	has_many :user_offer_opinions
	has_many :users, :through => :user_offer_opinions
	
	validates_presence_of :percentage
	validates_inclusion_of :percentage, {:in => 1..100, :message => "Invalid percentage"}
	validates_associated :offer_date

	scope :filter_by_percentage, lambda{|percentage| where(:percentage => percentage)}

	
end
