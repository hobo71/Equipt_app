class Api::SportingGoodsController < ApplicationController

	before_action :ensure_authenticated_user

	def index

		sporting_goods = SportingGood.all
		render json: sporting_goods, status: 200

	end

	def show

		sporting_good = SportingGood.find_by_slug params[:slug]

		if sporting_good
			render json: sporting_good, status: 200 
		else
			render json: { error: I18n.t('errors.not_found', item: params[:slug]) }, status: 404
		end

	end

	def create
		
		sporting_good = SportingGood.new(sporting_good_params)

		if sporting_good.save
			render json: sporting_good, send_create_message: true, status: 200
		else
			render json: sporting_good, send_create_message: false, status: 400
		end

	end

	private

	def sporting_good_params
		params.require(:sporting_good).permit(:category, :title, :brand, :model, :description, :age, :price_per_day, :price_per_week, :deposit, images: [:file])
	end

end