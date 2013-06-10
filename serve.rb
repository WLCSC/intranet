#!/usr/bin/env ruby

require 'sinatra'
require 'rubygems'

# the most basic of servers :D

get '/' do
	File.read(File.join('public', 'index.html'))
end
