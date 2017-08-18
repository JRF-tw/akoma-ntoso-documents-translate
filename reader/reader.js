var convert = require('xml-js');
var axios = require('axios');

var getArrayValue = (array, key1, key2) => {
  if (array.hasOwnProperty(key1) && array[key1].hasOwnProperty(key2)){
    return array[key1][key2];
  } else {
    return null;
  }
}

var getElementText = (element) => {
  var text = "";
  element['elements'].forEach((item) => {
    // printJson(item);
    if (item['type'] === 'text' && item.hasOwnProperty('text')){
      text = text + item['text'].replace(/ +/, '').replace("\n", '');
    } else {
      text = text + getElementText(item);
      if (item['type'] === 'element' && ['p', 'b'].includes(item['name'])) {
        text = text + "\n";
      }
    }

  })
  text = text.replace(/\n$/, '');
  return text;
}

var parseElement = (element, data) => {
  var data = {}
  if (element['type'] === 'element') {
    if (item['name'] === 'akomaNtoso') {
      data = parseAkomaNtosoElement(element);
    } else if (item['name'] === 'judgementElemet') {

    }
  }
  return data;
}

var parseAknJson = (json) => {
  var data;
  json['elements'].forEach((item) => {
    if (item['name'] === 'akomaNtoso') {
      data = parseAkomaNtosoElement(item);
    }
  })
  return data;
}

var parseAkomaNtosoElement = (element, data) => {
  var data = {}
  element['elements'].forEach((item) => {
    if (item['name'] === 'judgement') {
      data['judgement'] = parseJudgementElement(item);
    } else if (item['name'] === 'authorialNote') {
      data['authorialNote'] = parseAuthorialNoteElement(item);
    }
  })
  return data;
}

var parseJudgementElement = (element) => {
  var data = {}
  element['elements'].forEach((item) => {
    if (item['name'] === 'meta') {
      data['meta'] = parseMetaElement(item);
    }else if (item['name'] === 'header') {
      data['header'] = parseHeaderElement(item);
    }else if (item['name'] === 'judgementBody') {
      data['judgementBody'] = parseJudgementBodyElement(item);
    }else if (item['name'] === 'conclusions') {
      data['conclusions'] = parseConclusionsElement(item);
    }
  })
  return data;
}

var parseMetaElement = (element) => {
  var data = {}
  element['elements'].forEach((item) => {
    if (item['name'] === 'identification') {
      data['identification'] = parseIdentificationElement(item);
    }else if (item['name'] === 'publication') {
      data['publication'] = parsePublicationElement(item);
    }else if (item['name'] === 'classification') {
      data['classification'] = parseClassificationElement(item);
    }else if (item['name'] === 'lifecycle') {
      data['lifecycle'] = parseLifecycleElement(item);
    }else if (item['name'] === 'workflow') {
      data['workflow'] = parseWorkflowElement(item);
    }else if (item['name'] === 'analysis') {
      data['analysis'] = parseAnalysisElement(item);
    }else if (item['name'] === 'references') {
      data['references'] = parseReferencesElement(item);
    }else if (item['name'] === 'note') {
      data['note'] = parseNoteElement(item);
    }
  })
  return data;
}

var parseIdentificationElement = (element) => {
  var data = {}
  element['elements'].forEach((item) => {
    if (item['name'] === 'FRBRWork') {
      data['FRBRWork'] = parseFRBRWorkElement(item);
    } else if (item['name'] === 'FRBRExpression') {
      data['FRBRExpression'] = parseFRBRExpressionElement(item);
    } else if (item['name'] === 'FRBRManifestation') {
      data['FRBRManifestation'] = parseFRBRManifestationElement(item);
    }
  })
  return data;
}

var parseFRBRWorkElement = (element) => {
  var data = {}
  element['elements'].forEach((item) => {
    if (item['name'] === 'FRBRthis') {
      data['FRBRthis'] = parseFRBRthisElement(item);
    } else if (item['name'] === 'FRBRuri') {
      data['FRBRuri'] = parseFRBRuriElement(item);
    } else if (item['name'] === 'FRBRdate') {
      data['FRBRdate'] = parseFRBRdateElement(item);
    } else if (item['name'] === 'FRBRauthor') {
      data['FRBRauthor'] = parseFRBRauthorElement(item);
    } else if (item['name'] === 'FRBRcountry') {
      data['FRBRcountry'] = parseFRBRcountryElement(item);
    } else if (item['name'] === 'FRBRnumber') {
      data['FRBRnumber'] = parseFRBRnumberElement(item);
    }
  })
  return data;
}
var parseFRBRExpressionElement = (element) => {
  var data = {}
  element['elements'].forEach((item) => {
    if (item['name'] === 'FRBRthis') {
      data['FRBRthis'] = parseFRBRthisElement(item);
    } else if (item['name'] === 'FRBRuri') {
      data['FRBRuri'] = parseFRBRuriElement(item);
    } else if (item['name'] === 'FRBRdate') {
      data['FRBRdate'] = parseFRBRdateElement(item);
    } else if (item['name'] === 'FRBRauthor') {
      data['FRBRauthor'] = parseFRBRauthorElement(item);
    } else if (item['name'] === 'FRBRlanguage') {
      data['FRBRlanguage'] = parseFRBRlanguageElement(item);
    }
  })
  return data;

}
var parseFRBRManifestationElement = (element) => {
  var data = {}
  element['elements'].forEach((item) => {
    if (item['name'] === 'FRBRthis') {
      data['FRBRthis'] = parseFRBRthisElement(item);
    } else if (item['name'] === 'FRBRuri') {
      data['FRBRuri'] = parseFRBRuriElement(item);
    } else if (item['name'] === 'FRBRdate') {
      data['FRBRdate'] = parseFRBRdateElement(item);
    } else if (item['name'] === 'FRBRauthor') {
      data['FRBRauthor'] = parseFRBRauthorElement(item);
    } else if (item['name'] === 'FRBRformat') {
      data['FRBRformat'] = parseFRBRformatElement(item);
    }
  })
  return data;
}

var parseFRBRthisElement = (element) => {
  return getArrayValue(element, 'attributes', 'value')
}

var parseFRBRuriElement = (element) => {
  return getArrayValue(element, 'attributes', 'value')
}

var parseFRBRdateElement = (element) => {
  return getArrayValue(element, 'attributes', 'date')
}

var parseFRBRauthorElement = (element) => {
  return getArrayValue(element, 'attributes', 'href')
}

var parseFRBRcountryElement = (element) => {
  return getArrayValue(element, 'attributes', 'value')
}

var parseFRBRnumberElement = (element) => {
  return getArrayValue(element, 'attributes', 'value')
}

var parseFRBRlanguageElement = (element) => {
  return getArrayValue(element, 'attributes', 'language')
}

var parseFRBRformatElement = (element) => {
  return getArrayValue(element, 'attributes', 'value')
}

var parsePublicationElement = (element) => {
  data = {
    date: getArrayValue(element, 'attributes', 'date'),
    name: getArrayValue(element, 'attributes', 'name'),
    number: getArrayValue(element, 'attributes', 'number')
  };
  return data;
}

var parseClassificationElement = (element) => {
  var data = {}
  element['elements'].forEach((item) => {
    data['keywords'] = []
    if (item['name'] === 'keyword') {
      data['keywords'].push(parseKeywordElement(item));
    }
  })
  return data;
}
var parseKeywordElement = (element) => {
  return getArrayValue(element, 'attributes', 'value')
}

var parseLifecycleElement = (element) => {
  var data = [];
  element['elements'].forEach((item) => {
    if(item['name'] === 'eventRef'){
      data.push(parseEventRefElement(item));
    }
  })
  return data;
}
var parseEventRefElement = (element) => {
  var data = {
    date: getArrayValue(element, 'attributes', 'date'),
    type: getArrayValue(element, 'attributes', 'type')
  }
  return data;
}

var parseWorkflowElement = (element) => {
  var data = [];
  element['elements'].forEach((item) => {
    if(item['name'] === 'step'){
      data.push(parseStepElement(item));
    }
  })
  return data;
}
var parseStepElement = (element) => {
  var data = {
    date: getArrayValue(element, 'attributes', 'date'),
    outcome: getArrayValue(element, 'attributes', 'outcome')
  }
  return data;
}

var parseAnalysisElement = (element) => {
  var data = {};
  element['elements'].forEach((item) => {
    if(item['name'] === 'judicial') {
      data['judicial'] = parseJudicialElement(item);
    }
  })
  return data;
}
var parseJudicialElement = (element) => {
  var data = {};
  element['elements'].forEach((item) => {
    if(item['name'] === 'result') {
      data['result'] = parseResultElement(item);
    }
  })
  return data;
}
var parseResultElement = (element) => {
  return getArrayValue(element, 'attributes', 'type');
}

var parseReferencesElement = (element) => {
  var data = [];
  element['elements'].forEach((item) => {
    if(item['name'] === 'TLCReference'){
      data.push(parseTLCReferenceElement(item));
    }
  })
}

var parseTLCReferenceElement = (element) => {
  var data = {
    name: getArrayValue(element, 'attributes', 'showAs'),
    href: getArrayValue(element, 'attributes', 'href')
  }
  return data;
}

var parseNoteElement = (element) => {
  return getElementText(element);
}

var parseHeaderElement = (element) => {
  var data = {}
  element['elements'].forEach((item) => {
    if (item['name'] === 'p') {
      itemClass = getArrayValue(item, 'attributes', 'class');
      if (itemClass === 'docProponent') {
        data['docProponent'] = parseDocProponentElement(item);
      } else if (itemClass === 'judgementNumber') {
        data['judgementNumber'] = parseDocNumberElement(item);
      } else if (itemClass === 'parties') {
        data['parties'] = parsePartiesPElement(item);
      } else if (itemClass === 'summary') {
        data['summary'] = parseSummaryPElement(item);
      }
    }
  })
  return data;
}

var parseDocProponentElement = (element) => {
  docProponentElement = findDocProponentElement(element);
  var data;
  if (docProponentElement) {
    data = getElementText(docProponentElement);
  }
  return data;
}

var findDocProponentElement = (element) => {
  var result;
  element['elements'].forEach((item) => {
    if (item['name'] === 'b') {
      result = findDocProponentElement(item);
    } else if (item['name'] === 'docProponent') {
      result = item;
    }
  })
  return result;
}

var parseDocNumberElement = (element) => {
  return getElementText(element);
}

var findDocNumberElement = (elements) => {
  var result;
  elements.forEach((item) => {
    if (item['name'] === 'docNumber') {
      result = item;
    }else{
      item['elements'].forEach((item) => {
        if (item['name'] === 'docNumber') {
          result = item;
        }
      })
    }
  })
  return result;
}

var parsePartiesPElement = (element) => {
  var data = [];
  var party;
  element['elements'].forEach((item) => {
    if (item['name'] === 'b') {
      party = getElementText(item);
    } else if (item['name'] === 'party' && party) {
      data.push(parsePartyElement(item, party));
    } else if (item['name'] === 'lawyer' && party) {
      data.push(parseLawyerElement(item, party));
    }
  })
  return data;
}
var parseSummaryPElement = (element) => {
  var data = {
    text: getElementText(element).split("\n")
  };
  return data;
}

var parsePartyElement = (element, party) =>  {
  var data = {};
  data['name'] = getElementText(element);
  data['party'] = party;
  data['role'] = 'party';
  return data;
}
var parseLawyerElement = (element, party) =>  {
  var data = {};
  data['name'] = getElementText(element);
  data['party'] = party;
  data['role'] = 'lawyer';
  return data;
}
var parseJudgeElement = (element) => {
  var data = {};
  data['name'] = getElementText(element);
  data['role'] = 'judge';
  return data;
}

var parseJudgementBodyElement = (element) => {
  var data = {};
  element['elements'].forEach((item) => {
    if (item['name'] === 'introduction') {
      data['introduction'] = parseIntroductionElement(item);
    } else if (item['name'] === 'background') {
      data['background'] = parseBackgroundElement(item);
    } else if (item['name'] === 'motivation') {
      data['motivation'] = parseMotivationElement(item);
    } else if (item['name'] === 'decision') {
      data['decision'] = parseDecisionElement(item);
    }
  })
  return data;
}
var parseIntroductionElement = (element) => {
  var data = {};
  if (element.hasOwnProperty('elements')) {
    element['elements'].forEach((item) => {
      if (item['name'] === 'blockList') {
        if (!data.hasOwnProperty('blockList')) {
          data['blockList'] = [];
        }
        data['blockList']= parseBlockListElement(item);
      }
    })
  }
  return data;
}
var parseBackgroundElement = (element) => {
  var data = {};
  if (element.hasOwnProperty('elements')) {
    element['elements'].forEach((item) => {
      if (item['name'] === 'blockList') {
        if (!data.hasOwnProperty('blockList')) {
          data['blockList'] = [];
        }
        data['blockList'] = parseBlockListElement(item);
      }
    })
  }
  return data;
}
var parseBlockListElement = (element) => {
  var data = [];
  element['elements'].forEach((item) => {
    if (item['name'] === 'intro') {
      data.push({name: 'intro', contents: parseIntroElement(item)});
    } else if (item['name'] === 'item') {
      data.push({name: 'item', contents: parseItemElement(item)});
    }
  })
  return data;
}

var parseIntroElement = (element) => {
  return getElementText(element).split("\n");
}

var parseItemElement = (element) => {
  var data = [];
  element['elements'].forEach((item) => {
    if (item['name'] === 'p') {
      data.push({text: getElementText(item)});
    } else if (item['name'] === 'blockList') {
      data.push({blockList: parseBlockListElement(item)});
    }
  })
  return data;
}

var addEmptyArray = (data, key) => {
  if (!data.hasOwnProperty(key)) {
    data[key] = [];
  }
  return data;
}

var parseMotivationElement = (element) => {
  var data = {};
  if (element.hasOwnProperty('elements')) {
    element['elements'].forEach((item) => {
      if (item['name'] === 'blockList') {
        itemId = getArrayValue(item, 'attributes', 'id')
        if (itemId === 'issues') {
          data['issuesBlockList'] = parseBlockListElement(item);
        } else if (itemId === 'reasoning') {
          data['reasoningBlockList'] = parseBlockListElement(item);
        } else {
          data['blockList'] = parseBlockListElement(item);
        }
      }
    })
  }
  return data;
}
var parseDecisionElement = (element) => {
  var data = {};
  if (element.hasOwnProperty('elements')) {
    element['elements'].forEach((item) => {
      if (item['name'] === 'blockList') {
        if (!data.hasOwnProperty('blockList')) {
          data['blockList'] = [];
        }
        data['blockList'].push(parseBlockListElement(item));
      }
    })
  }
  return data;
}
var parseConclusionsElement = (element) => {
  var data;
  element['elements'].forEach((item) => {
    if (item['name'] === 'p'){
      itemClass = getArrayValue(item, "attributes", "class");
      if (itemClass === 'signature') {
        data = parseSignaturePElement(item);
      }
    }
  })
  return data;
}

var parseSignaturePElement = (element) => {
  var data = [];
  element['elements'].forEach((item) => {
    if (item['name'] === 'judge') {
      data.push(parseJudgeElement(item));
    }
  })
  return data;
}

var parseAuthorialNoteElement = (element) => {
  return getElementText(element);
}

var printJson = (json) => {
  console.log(JSON.stringify(json, null, 2));
}

var array2html = (json) => {
  var result = "";
  console.log(json);
  json.forEach((item) => {
    result += "<p>" + item + "</p>";
  })
  return result;
}

var block2html = (json) => {
  var result = "";
  if (json.hasOwnProperty('blockList')) {
    result = blockList2html(json, 'blockList')
  } else if (json.hasOwnProperty('reasoningBlockList')) {
    result = blockList2html(json, 'reasoningBlockList')
  } else if  (json.hasOwnProperty('issuesBlockList')) {
    result = blockList2html(json, 'issuesBlockList')
  }
  return result;
}

var parties2html = (json) => {
  var result = '<p class="parties">';
  json.forEach((item) => {
    result += partyItem2html(item);
  })
  result += '</p>';
  return result;
}

var partyItem2html = (json) => {
  var result = "<p>" + json['party'] + "&nbsp;" + json['name'];
  if (json['role'] === 'lawyer') {
    result += "&nbsp;律師";
  }
  result += "</p>";
  return result;
}

var blockList2html = (json, key = 'blockList') => {
  var result;
  if (json.hasOwnProperty(key)) {
    var result = "<ul>";
    json[key].forEach((item) => {
      if(item['name'] === 'item') {
        result += item2html(item);
      } else if (item['name'] === 'intro') {
        result += intro2html(item);
      }
    })
    result += "</ul>";
  }
  return result;
}

var intro2html = (json) => {
  return json['intro'];
}

var item2html = (json) => {
  var result = "<li>";
  json['contents'].forEach((item) => {
    if(item.hasOwnProperty('text')){
      result += text2html(item);
    } else if (item.hasOwnProperty('blockList')){
      result += blockList2html(item);
    }
  })
  result += "</li>";
  return result;
}

var text2html = (json) => {
  return json['text'];
}

var conclusion2html = (json) => {
  var result = "";
  json.forEach((item) => {
    if (item['role'] === 'judge') {
      result += "<p>法官&nbsp;" + item['name'] + "</p>";
    }
  })
}

var updateContent = (json) => {
  var title = document.getElementById('title');
  title.innerText = json['judgement']['header']['docProponent'] + json['judgement']['header']['judgementNumber'];
  var docProponent = document.getElementById('docProponent');
  docProponent.innerText = json['judgement']['header']['docProponent'];
  var judgementNumber = document.getElementById('judgementNumber');
  judgementNumber.innerText = json['judgement']['header']['judgementNumber'];
  var parties = document.getElementById('parties');
  parties.innerHTML = parties2html(json['judgement']['header']['parties']);
  var summary = document.getElementById('summary');
  summary.innerHTML = array2html(json['judgement']['header']['summary']['text']);
  var introduction = document.getElementById('introduction');
  introduction.innerHTML = blockList2html(json['judgement']['judgementBody']['introduction']);
  var background = document.getElementById('background');
  background.innerHTML = blockList2html(json['judgement']['judgementBody']['background']);
  var issues = document.getElementById('issues');
  issues.innerHTML = blockList2html(json['judgement']['judgementBody']['motivation'], 'issuesBlockList');
  var reasoning = document.getElementById('reasoning');
  reasoning.innerHTML = blockList2html(json['judgement']['judgementBody']['motivation'], 'reasoningBlockList');
  var decision = document.getElementById('decision');
  decision.innerHTML = blockList2html(json['judgement']['judgementBody']['decision']);
  var conclusions = document.getElementById('conclusions');
  conclusions.innerHTML = conclusions2html(json['judgement']['conclusions']);
}

var updateAkn = function() {
  var formUrl = document.getElementById("form-url");
  var url = formUrl.value;
  console.log(url);
  axios.get(url).then((data) => {
    result = convert.xml2js(data['data'], {compact: false});
    result = parseAknJson(result);
    updateContent(result);
    printJson(result);
  }).catch((error) => {
    console.log(error);
  });
}

document.getElementById("update-btn").addEventListener("click", updateAkn);
console.log('reader');

// var result = parseAknJson(result);

// printJson(result);

// blockList2html(a)
// item2html(b)


