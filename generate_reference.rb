#!/usr/bin/env ruby


def generate_reference(name, number)
  number = number ? number.split(',') : []
  if number.length == 0
    return %Q(<TLCReference href="/tw/judgement/#{name}/@chi/main" showAs="#{name}" />)
  elsif number.length == 1
    return %Q(<TLCReference href="/tw/act/#{name}/@chi/main~art_#{number[0]}" showAs="#{name}第#{number[0]}條" />)
  elsif number.length == 2
    return %Q(<TLCReference href="/tw/act/#{name}/@chi/main~art_#{number[0]}__para_#{number[1]}" showAs="#{name}第#{number[0]}條第#{number[1]}項" />)
  elsif number.length == 3
    return %Q(<TLCReference href="/tw/act/#{name}/@chi/main~art_#{number[0]}__para_#{number[1]}__subpara_#{number[2]}" showAs="#{name}第#{number[0]}條第#{number[1]}項第#{number[2]}款" />)
  end
end

IO.foreach(ARGV[0]) do |line|
  if line.length > 1
    name, number = line.split(' ')
    reference = generate_reference(name, number)
    puts reference
  end
end