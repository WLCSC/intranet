#!/usr/bin/env ruby

require 'sinatra'
require 'rubygems'

# the most basic of servers :D

get '/' do
	File.read(File.join('public', 'index.html'))
end

not_found do
	File.read(File.join('public', '404.html'))
end

error 500 do
	File.read(File.join('public', '500.html'))
end
