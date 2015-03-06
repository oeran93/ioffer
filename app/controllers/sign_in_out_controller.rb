class SignInOutController < ApplicationController

	before_filter :require_not_log_in, except: [:sign_out]
	before_filter :clear_flash, only: [:sign_in_attempt]
	before_filter :require_parameters, only: [:sign_in_attempt, :forgot_password_attempt, :change_password_attempt]

	def sign_out
		session.clear
		redirect_to(:action => "sign_in")
	end

	def sign_in_attempt
		if business = Business.find_by_email(params[:email])
			if business.authenticate(params[:password])
				session[:business_id] = business.id
				redirect_to(controller: "business", action: "profile") and return
			end
		elsif user = User.find_by_email(params[:email])
			if user.authenticate(params[:password])
				session[:user_id]=user.id
				redirect_to(controller: "user", action: "profile") and return
			end
		end
		flash[:error] = "Wrong email or password"
		render("sign_in")
	end

	def forgot_password_attempt
		if (business=Business.find_by_email(params[:email]))
			business.update_attributes({forgot_password_token: @token = Digest::SHA1.hexdigest([Time.now, rand].join)})
			flash[:notice] = "Check your email for further instructions"
		else
			flash[:error] = "No Business with this email was found"
		end
		render("forgot_password")
	end

	def change_password
		@token = params[:token]
		unless (business = Business.find_by_forgot_password_token(@token))
			flash[:error] = "The link provided is invalid or has already expired"
		end
	end

	def change_password_attempt
		business = Business.find_by_forgot_password_token(@token) 
		if (business.update_attributes(forgot_password_token: "", new_password: params[:new_password], 
			new_password_confirmation: params[:new_password_confirmation]))
			flash[:notice] = "Password successfully updated"
			redirect_to("sign_in")
		end
		render("change_password")
	end

	private

	def require_not_log_in
		if view_context.is_business_signed_in || view_context.is_user_signed_in 
			redirect_to("/")
		end
	end

	def require_parameters
		params.delete(:action)
		params.delete(:controller)
		redirect_to(:action => "/") if params.blank?
	end

	def clear_flash
		flash.clear
	end

end