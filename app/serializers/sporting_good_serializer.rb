class SportingGoodSerializer < ActiveModel::Serializer

	attributes 	:category, 
				:title, 
				:brand, 
				:model, 
				:description, 
				:age, 
				:price_per_day, 
				:price_per_week, 
				:deposit,
				:errors,
				:slug
				
	has_many :images

	belongs_to :user

end