#!/usr/bin/env ruby

Dir.glob("**/*/.git").each do |directory|
  directory = File.dirname(File.absolute_path(directory))
  puts "Updating #{directory}"
  `cd #{directory}; git remote update --prune`
  branch = `cd #{directory}; git branch`.split("\n").find { |x| x =~ /\*/ }.gsub(/\* /, '')
  if branch && branch !~ /\(no branch\)/
    `cd #{directory}; git checkout #{branch}; git pull; git submodule init; git submodule update`
  end
end
