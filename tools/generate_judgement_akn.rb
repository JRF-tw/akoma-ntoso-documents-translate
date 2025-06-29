#!/usr/bin/env ruby
# This program generate a template that include judgement metadata template
# Usage: generate_judgement_akn.rb ${URL}
#

require 'open-uri'
require 'uri'
require 'nokogiri'
require 'json'
require 'mechanize'
require 'cgi'

$courts_data = JSON.parse(File.read(File.join(File.dirname(__FILE__), 'courts.json')))

# http://djirs.judicial.gov.tw/fjud/index_1_S.aspx?p=JHGjmdElzId1mhndOsscMsv0bjE0tUQyuFnOJBSr6wA%3d

Dir.chdir(File.dirname(__FILE__))

# $config = JSON.parse(File.read('./config.json'))

def get_division_name(sys)
  if sys == 'V'
    '民事'
  elsif sys == 'C' or sys == 'M'
    '刑事'
  elsif sys == 'A'
    '行政'
  elsif sys == 'P'
    '公懲'
  elsif sys == 'I'
    '少年'
  elsif sys == 'S'
    '訴願'
  else
    '不明'
  end
end

def get_court(court_code)
  court_info = $courts_data.find { |court| court['code'] == court_code.to_s }
  return court_info ? court_info['name'] : "未知法院(#{court_code})"
end

def get_page(url)
  agent = Mechanize.new
  page = agent.get(url)
  page.encoding = 'utf-8'
  return page
end

def scan_judges(content)
  content.scan(/法\s+官\s+([\p{Word}\w\s\S]+?)\n/).map { |i| i[0].gsub(' ', '')  }
end

def get_judgement(url)
  page = get_page(url)
  frame_path = page.frame_with(name: 'main').href
  frame_url = "http://djirs.judicial.gov.tw/fjud/#{frame_path}"
  frame_page = get_page(frame_url)
  content = frame_page.search('pre')[0].text.gsub('　', '  ').gsub(' ', ' ').gsub("\r", '')
  url_code = frame_page.search('#Form1')[0].attr('action').split('?p=')[1]
  params = CGI::parse(frame_page.search('table > tr > td > div > table > tr > td > div > span > a')[2].attr('href').split('?')[1])
  reason = frame_page.search('table > tr > td > div > table > tr > td')[5].text.gsub('  ', '').gsub('【裁判案由】', '')
  year, word, number, publish, no = params['jrecno'][0].split(',')
  publish_date = Date.parse("#{publish[0..3]}-#{publish[4..5]}-#{publish[6..7]}")
  division = get_division_name(params['v_sys'][0])
  court_code = params['v_court'][0]
  court = get_court(court_code)
  judges = scan_judges(content)
  data = {
    identification: "#{court_code}-#{division}-#{year}-#{word}-#{number}-#{no}",
    court: {
      name: court,
      code: court_code
    },
    division: division,
    publish_date: publish_date,
    reason: reason,
    url_code: url_code,
    url: url,
    year: year,
    word: word,
    number: number,
    no: no,
    judges: judges,
    content: content
  }
  return data
end

def generate_header(content)
  main = nil

  if content.match(/\s*主\s+文\s*\n([\p{Word}\s\S]+)\s*事\s+實\s*\n/)
    main = content.scan(/\s*主\s+文\s*\n([\p{Word}\s\S]+)\s*事\s+實\s*\n/)[0][0].strip
  elsif content.match(/\n\s*主\s+文\s*\n([\p{Word}\s\S]+)\n\s*事\s*實及理\s*由\s*\n/)
    main = content.scan(/\n\s*主\s+文\s*\n([\p{Word}\s\S]+)\n\s*事\s*實及理\s*由\s*\n/)[0][0].strip
  elsif content.match(/\n\s*主\s+文\s*\n([\p{Word}\s\S]+)\n\s*犯罪事實\s*及\s*理由.*\n/)
    main = content.scan(/\n\s*主\s+文\s*\n([\p{Word}\s\S]+)\n\s*犯罪事實\s*及\s*理由.*\n/)[0][0].strip
  elsif content.match(/\n\s*主\s+文\s*\n([\p{Word}\s\S]+)\n\s*犯罪事實.*\n/)
    main = content.scan(/\n\s*主\s+文\s*\n([\p{Word}\s\S]+)\n\s*犯罪事實.*\n/)[0][0].strip
  elsif content.match(/\n\s*主\s+文\s*\n([\p{Word}\s\S]+)\n\s*事實及理由要領\s*\n/)
    main = content.scan(/\n\s*主\s+文\s*\n([\p{Word}\s\S]+)\n\s*事實及理由要領\s*\n/)[0][0].strip
  elsif content.match(/\n\s*主\s+文\s*\n([\p{Word}\s\S]+)\n\s*理\s+由\s*\n/)
    main = content.scan(/\n\s*主\s+文\s*\n([\p{Word}\s\S]+)\n\s*理\s+由\s*\n/)[0][0].strip
  end
  first_line = content.split("\n").first.gsub(/ +/, '||').split('||')
  court = first_line.first
  number = first_line.last
  <<-EOF.gsub(/^\s+/, '')
  <p>
    <b>
      <docProponent>#{court}</docProponent>
        </b>
      </p>
      <p class="judgementNumber">
        <docNumber id="judgmentNumber">#{number}</docNumber>
      </p>
      <p class="parties">
      </p>
      <p class="summary">
        <b>主文：</b>
        <p>#{main}</p>
      </p>
    </p>
  EOF
end

def generate_conclusions(judges)
  result = '<conclusions><p class="signature">'
        #     <judge id="jud07" refersTo="#alfa">C. J. Alfa</judge>, <eol/>
        #     <span class="signature">CHIEF JUSTICE.</span>
        #     <eol/>
        #     <judge id="jud08" refersTo="#beta">D. C. J. Beta</judge>, <eol/>
        #     <span class="signature">DEPUTY CHIEF JUSTICE.</span>
        #     <eol/>
        #     <judge id="jud09" refersTo="#gamma" as="#CoEditor">F.N.M. Gamma</judge>, <eol/>
        #     <span class="signature">SUPREME COURT JUDGE.</span>
        #   </p>
        # </conclusions>
  num = 0
  judges.each do |judge|
    num += 1
    result += %Q[<span class="signature">法官</span>]
    result += %Q[<judge id="jud0#{num}" refersTo="##{judge}">#{judge}</judge><eol/>]
  end
  result += '</p></conclusions>'
  return result
end

def apply_template(data)
  <<-EOF.gsub(/^\s+/, '')
    <?xml version="1.0" encoding="UTF-8"?>
    <akomaNtoso xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.akomantoso.org/2.0 ./akomantoso20.xsd" xmlns="http://www.akomantoso.org/2.0">
      <judgement>
        <meta>
          <identification source="#somebody">
            <FRBRWork>
              <FRBRthis value="/tw/judgement/#{data[:publish_date].strftime('%Y-%m-%d')}/#{data[:identification]}/main"/>
              <FRBRuri value="/tw/judgement/#{data[:publish_date].strftime('%Y-%m-%d')}/#{data[:identification]}"/>
              <FRBRdate date="#{data[:identification]}" name="宣判"/>
              <FRBRauthor href="##{data[:judges][-1]}" as="#Author"/>
              <FRBRcountry value="tw"/>
              <FRBRnumber value="#{data[:identification]}"/>
            </FRBRWork>
            <FRBRExpression>
              <FRBRthis value="/tw/judgement/#{data[:publish_date].strftime('%Y-%m-%d')}/#{data[:identification]}/chi@/main" />
              <FRBRuri value="/tw/judgement/#{data[:publish_date].strftime('%Y-%m-%d')}/#{data[:identification]}/chi@" />
              <FRBRdate date="#{data[:publish_date].strftime('%Y-%m-%d')}" name="宣判" />
              <FRBRauthor href="#somebody" as="#Editor"/>
              <FRBRlanguage language="chi"/>
            </FRBRExpression>
            <FRBRManifestation>
              <FRBRthis value="/tw/judgement/#{data[:publish_date].strftime('%Y-%m-%d')}/#{data[:identification]}/chi@/main.xml"/>
              <FRBRuri value="/tw/judgement/#{data[:publish_date].strftime('%Y-%m-%d')}/#{data[:identification]}/chi@.akn"/>
              <FRBRdate date="#{Date.today.strftime('%Y-%m-%d')}" name="XMLConversion"/>
              <FRBRauthor href="#somebody" as="#Editor"/>
              <FRBRformat value="xml"/>
            </FRBRManifestation>
          </identification>
          <publication date="#{data[:publish_date].strftime('%Y-%m-%d')}" name="Sentenced" showAs="宣判" number="#{data[:identification]}"/>
          <classification source="#somebody">
            <keyword id="#{data[:reason]}" value="#{data[:reason]}" showAs="#{data[:reason]}"/>
          </classification>
          <lifecycle source="#somebody">
            <eventRef date="#{data[:publish_date].strftime('%Y-%m-%d')}" id="e1" source="#ro1" type="published"/>
          </lifecycle>
          <workflow source="#somebody">
            <step date="" id="a1" outcome="#言詞辯論終結"/>
            <step date="#{data[:publish_date].strftime('%Y-%m-%d')}" id="a2" outcome="#宣判"/>
          </workflow>
          <analysis source="#somebody">
            <judicial>
            </judicial>
          </analysis>
          <references source="#somebody">
          </references>
          <note>
            <p>原始網址： #{data[:url]}</p>
          </note>
        </meta>
        <header>
          #{generate_header(data[:content])}
        </header>
        <judgementBody>
          <!-- introduction about the judiciary history of the law case-->
          <introduction>
          </introduction>
          <!-- the facts-->
          <background>
          </background>
          <!-- the law-->
          <motivation>
          </motivation>
          <decision>
          </decision>
          <temp>
          #{data[:content]}
          </temp>
        </judgementBody>
        #{generate_conclusions(data[:judges])}
      </judgement>
      <authorialNote>
      </authorialNote>
    </akomaNtoso>
  EOF
end

def main
  # url = "http://djirs.judicial.gov.tw/fjud/index_1_S.aspx?p=JHGjmdElzId1mhndOsscMsv0bjE0tUQyuFnOJBSr6wA%3d"
  url = ARGV[0]
  data = get_judgement(url)
  # puts data.to_json
  result = apply_template(data)
  puts result
  File.open("./#{data[:identification]}.akn", 'w') { |file| file.write(result) }
end

main()

