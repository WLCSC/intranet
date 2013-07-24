#!/usr/bin/env ruby

require 'sinatra'
require 'rubygems'

# the most basic of servers :D

helpers do
	def base_url
		@base_url ||= "#{request.env['rack.url_scheme']}://#{request.env['HTTP_HOST']}"
	end
end

configure do
	mime_type :js, "application/javascript"
end

get '/' do
	erb :index
end

get '/csv.js' do
	content_type :js
	erb 'csv.js'.to_sym
end

get '/notes_section.csv' do
	File.read(File.join('public', 'csv', 'notes_section.csv'))
end

get '/reference_material.csv' do
	File.read(File.join('public', 'csv', 'reference_material.csv'))
end

not_found do
	File.read(File.join('public', '404.html'))
end

error 500 do
	File.read(File.join('public', '500.html'))
end
