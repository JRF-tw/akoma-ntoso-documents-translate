#!/usr/bin/env node
var convert = require('xml-js');
var fs = require('fs');

fs.readFile('../akn/TPE-民事-104-北簡-9523-1.akn', function(err, data) {
    result = convert.xml2js(data, {compact: false});
    result = parseAknJson(result);
    printJson(result);

    var compactResult = convert.xml2js(data, {compact: true});
    // var result1 = convert.xml2json(data, {compact: false});
    // console.log(result1);
});

var getArrayValue = function(array, key1, key2) {
  if (array.hasOwnProperty(key1) && array[key1].hasOwnProperty(key2)){
    return array[key1][key2];
  } else {
    return null;
  }
}

var getElementText = function(element){
  text = "";
  element['elements'].forEach(function(item){
    if (item['type'] == 'text' && item.hasOwnProperty('text')){
      text = text + item['text'].replace(/ +/, '').replace("\n", '');
    } else {
      text = text + getElementText(item);
      if (item['type'] == 'element' && item['name'] in ['p', 'b']) {
        text = text + "\n";
      }
    }
  })
  text = text.replace(/\n$/, '');
  return text;
}

var parseElement = function(element, data) {
  var data = {}
  if (element['type'] == 'element') {
    if (item['name'] == 'akomaNtoso') {
      data = parseAkomaNtosoElement(element);
    } else if (item['name'] == 'judgementElemet') {

    }
  }
  return data;
}

var parseAknJson = function(json) {
  var data;
  json['elements'].forEach(function(item){
    if (item['name'] == 'akomaNtoso') {
      data = parseAkomaNtosoElement(item);
    }
  })
  return data;
}

var parseAkomaNtosoElement = function(element, data) {
  var data = {}
  element['elements'].forEach(function(item){
    if (item['name'] == 'judgement') {
      data['judgement'] = parseJudgementElement(item);
    } else if (item['name'] == 'authorialNote') {
      data['authorialNote'] = parseAuthorialNoteElement(item);
    }
  })
  return data;
}

var parseJudgementElement = function(element) {
  var data = {}
  element['elements'].forEach(function(item){
    if (item['name'] == 'meta') {
      data['meta'] = parseMetaElement(item);
    }else if (item['name'] == 'header') {
      data['header'] = parseHeaderElement(item);
    }else if (item['name'] == 'judgementBody') {
      data['judgementBody'] = parseJudgementBodyElement(item);
    }else if (item['name'] == 'conclusions') {
      data['conclusions'] = parseConclusionsElement(item);
    }
  })
  return data;
}

var parseMetaElement = function(element) {
  var data = {}
  element['elements'].forEach(function(item){
    if (item['name'] == 'identification') {
      data['identification'] = parseIdentificationElement(item);
    }else if (item['name'] == 'publication') {
      data['publication'] = parsePublicationElement(item);
    }else if (item['name'] == 'classification') {
      data['classification'] = parseClassificationElement(item);
    }else if (item['name'] == 'lifecycle') {
      data['lifecycle'] = parseLifecycleElement(item);
    }else if (item['name'] == 'workflow') {
      data['workflow'] = parseWorkflowElement(item);
    }else if (item['name'] == 'analysis') {
      data['analysis'] = parseAnalysisElement(item);
    }else if (item['name'] == 'references') {
      data['references'] = parseReferencesElement(item);
    }else if (item['name'] == 'note') {
      data['note'] = parseNoteElement(item);
    }
  })
  return data;
}

var parseIdentificationElement = function(element) {
  var data = {}
  element['elements'].forEach(function(item){
    if (item['name'] == 'FRBRWork') {
      data['FRBRWork'] = parseFRBRWorkElement(item);
    } else if (item['name'] == 'FRBRExpression') {
      data['FRBRExpression'] = parseFRBRExpressionElement(item);
    } else if (item['name'] == 'FRBRManifestation') {
      data['FRBRManifestation'] = parseFRBRManifestationElement(item);
    }
  })
  return data;
}

var parseFRBRWorkElement = function(element) {
  var data = {}
  element['elements'].forEach(function(item){
    if (item['name'] == 'FRBRthis') {
      data['FRBRthis'] = parseFRBRthisElement(item);
    } else if (item['name'] == 'FRBRuri') {
      data['FRBRuri'] = parseFRBRuriElement(item);
    } else if (item['name'] == 'FRBRdate') {
      data['FRBRdate'] = parseFRBRdateElement(item);
    } else if (item['name'] == 'FRBRauthor') {
      data['FRBRauthor'] = parseFRBRauthorElement(item);
    } else if (item['name'] == 'FRBRcountry') {
      data['FRBRcountry'] = parseFRBRcountryElement(item);
    } else if (item['name'] == 'FRBRnumber') {
      data['FRBRnumber'] = parseFRBRnumberElement(item);
    }
  })
  return data;
}
var parseFRBRExpressionElement = function(element) {
  var data = {}
  element['elements'].forEach(function(item){
    if (item['name'] == 'FRBRthis') {
      data['FRBRthis'] = parseFRBRthisElement(item);
    } else if (item['name'] == 'FRBRuri') {
      data['FRBRuri'] = parseFRBRuriElement(item);
    } else if (item['name'] == 'FRBRdate') {
      data['FRBRdate'] = parseFRBRdateElement(item);
    } else if (item['name'] == 'FRBRauthor') {
      data['FRBRauthor'] = parseFRBRauthorElement(item);
    } else if (item['name'] == 'FRBRlanguage') {
      data['FRBRlanguage'] = parseFRBRlanguageElement(item);
    }
  })
  return data;

}
var parseFRBRManifestationElement = function(element) {
  var data = {}
  element['elements'].forEach(function(item){
    if (item['name'] == 'FRBRthis') {
      data['FRBRthis'] = parseFRBRthisElement(item);
    } else if (item['name'] == 'FRBRuri') {
      data['FRBRuri'] = parseFRBRuriElement(item);
    } else if (item['name'] == 'FRBRdate') {
      data['FRBRdate'] = parseFRBRdateElement(item);
    } else if (item['name'] == 'FRBRauthor') {
      data['FRBRauthor'] = parseFRBRauthorElement(item);
    } else if (item['name'] == 'FRBRformat') {
      data['FRBRformat'] = parseFRBRformatElement(item);
    }
  })
  return data;
}

var parseFRBRthisElement = function(element) {
  return getArrayValue(element, 'attributes', 'value')
}

var parseFRBRuriElement = function(element) {
  return getArrayValue(element, 'attributes', 'value')
}

var parseFRBRdateElement = function(element) {
  return getArrayValue(element, 'attributes', 'date')
}

var parseFRBRauthorElement = function(element) {
  return getArrayValue(element, 'attributes', 'href')
}

var parseFRBRcountryElement = function(element) {
  return getArrayValue(element, 'attributes', 'value')
}

var parseFRBRnumberElement = function(element) {
  return getArrayValue(element, 'attributes', 'value')
}

var parseFRBRlanguageElement = function(element) {
  return getArrayValue(element, 'attributes', 'language')
}

var parseFRBRformatElement = function(element) {
  return getArrayValue(element, 'attributes', 'value')
}

var parsePublicationElement = function(element) {
  data = {
    date: getArrayValue(element, 'attributes', 'date'),
    name: getArrayValue(element, 'attributes', 'name'),
    number: getArrayValue(element, 'attributes', 'number')
  };
  return data;
}

var parseClassificationElement = function(element) {
  var data = {}
  element['elements'].forEach(function(item){
    data['keywords'] = []
    if (item['name'] == 'keyword') {
      data['keywords'].push(parseKeywordElement(item));
    }
  })
  return data;
}
var parseKeywordElement = function(element) {
  return getArrayValue(element, 'attributes', 'value')
}

var parseLifecycleElement = function(element) {
  var data = [];
  element['elements'].forEach(function(item){
    if(item['name'] == 'eventRef'){
      data.push(parseEventRefElement(item));
    }
  })
  return data;
}
var parseEventRefElement = function(element) {
  var data = {
    date: getArrayValue(element, 'attributes', 'date'),
    type: getArrayValue(element, 'attributes', 'type')
  }
  return data;
}

var parseWorkflowElement = function(element) {
  var data = [];
  element['elements'].forEach(function(item){
    if(item['name'] == 'step'){
      data.push(parseStepElement(item));
    }
  })
  return data;
}
var parseStepElement = function(element) {
  var data = {
    date: getArrayValue(element, 'attributes', 'date'),
    outcome: getArrayValue(element, 'attributes', 'outcome')
  }
  return data;
}

var parseAnalysisElement = function(element) {
  var data = {};
  element['elements'].forEach(function(item){
    if(item['name'] == 'judicial') {
      data['judicial'] = parseJudicialElement(item);
    }
  })
  return data;
}
var parseJudicialElement = function(element) {
  var data = {};
  element['elements'].forEach(function(item){
    if(item['name'] == 'result') {
      data['result'] = parseResultElement(item);
    }
  })
  return data;
}
var parseResultElement = function(element) {
  return getArrayValue(element, 'attributes', 'type');
}

var parseReferencesElement = function(element) {
  var data = [];
  element['elements'].forEach(function(item){
    if(item['name'] == 'TLCReference'){
      data.push(parseTLCReferenceElement(item));
    }
  })
}

var parseTLCReferenceElement = function(element) {
  var data = {
    name: getArrayValue(element, 'attributes', 'showAs'),
    href: getArrayValue(element, 'attributes', 'href')
  }
  return data;
}

var parseNoteElement = function(element) {

}

var parseHeaderElement = function(element) {
  var data = {}
  element['elements'].forEach(function(item){
    if (item['name'] == 'p') {
      itemClass = getArrayValue(item, 'attributes', 'class');
      console.log(itemClass);
      if (itemClass == 'docProponent') {
        data['docProponent'] = parseDocProponentElement(item);
      } else if (itemClass == 'judgementNumber') {
        data['judgementNumber'] = parseDocNumberElement(item);
      } else if (itemClass == 'parties') {
        data['parties'] = parsePartiesPElement(item);
      } else if (itemClass == 'summary') {
        data['summary'] = parseSummaryPElement(item);
      }
    }
  })
  return data;
}

var parseDocProponentElement = function(element) {
  docProponentElement = findDocProponentElement(element);
  var data;
  if (docProponentElement) {
    data = getElementText(docProponentElement);
  }
  return data;
}

var findDocProponentElement = function(element) {
  var result;
  element['elements'].forEach(function(item){
    if (item['name'] == 'b') {
      result = findDocProponentElement(item);
    } else if (item['name'] == 'docProponent') {
      result = item;
    }
  })
  return result;
}

var parseDocNumberElement = function(element) {
  return getElementText(element);
}

var findDocNumberElement = function(elements) {
  var result;
  elements.forEach(function(item){
    if (item['name'] == 'docNumber') {
      result = item;
    }else{
      item['elements'].forEach(function(item){
        if (item['name'] == 'docNumber') {
          result = item;
        }
      })
    }
  })
  return result;
}

var parseDocProponentPElement = function(element) {

}

var parseJudgementNumberPElement = function(element) {

}
var parsePartiesPElement = function(element) {
  var data = [];
  var party;
  element['elements'].forEach(function(item){
    if (item['name'] == 'b') {
      party = getElementText(item);
    } else if (item['name'] == 'party' && party) {
      data.push(parsePartyElement(item, party));
    } else if (item['name'] == 'lawyer' && party) {
      data.push(parseLawyerElement(item, party));
    }
  })
  return data;
}
var parseSummaryPElement = function(element) {
  var data = {
    text: getElementText(element).split("\n")
  };
  return data;
}

var parsePartyElement = function(element, party) {
  var data = {};
  data['name'] = getElementText(element);
  data['party'] = party;
  data['role'] = 'party';
  return data;
}
var parseLawyerElement = function(element, party) {
  var data = {};
  data['name'] = getElementText(element);
  data['party'] = party;
  data['role'] = 'lawyer';
  return data;
}
var parseJudgeElement = function(element) {
  var data = {};
  data['name'] = getElementText(element);
  data['role'] = 'judge';
  return data;
}

var parseJudgementBodyElement = function(element) {
  var data = {};
  element['elements'].forEach(function(item){
    if (item['name'] == 'introduction') {
      data['introduction'] = parseIntroductionElement(item);
    } else if (item['name'] == 'background') {
      data['background'] = parseBackgroundElement(item);
    } else if (item['name'] == 'motivation') {
      data['motivation'] = parseMotivationElement(item);
    } else if (item['name'] == 'decision') {
      data['decision'] = parseDecisionElement(item);
    }
  })
  return data;
}
var parseIntroductionElement = function(element) {
  var data = {};
  if (element.hasOwnProperty('elements')) {
    element['elements'].forEach(function(item){
      if (item['name'] == 'blockList') {
        if (!data.hasOwnProperty('blockList')) {
          data['blockList'] = [];
        }
        data['blockList'].push(parseBlockListElement(item));
      }
    })
  }
  return data;
}
var parseBackgroundElement = function(element) {
  var data = {};
  if (element.hasOwnProperty('elements')) {
    element['elements'].forEach(function(item){
      if (item['name'] == 'blockList') {
        if (!data.hasOwnProperty('blockList')) {
          data['blockList'] = [];
        }
        data['blockList'].push(parseBlockListElement(item));
      }
    })
  }
  return data;
}
var parseBlockListElement = function(element) {
  var data = [];
  element['elements'].forEach(function(item){
    if (item['name'] == 'intro') {
      data.push({name: 'intro', contents: parseIntroElement(item)});
    } else if (item['name'] == 'item') {
      data.push({name: 'item', contents: parseItemElement(item)});
    }
  })
  return data;
}
var parseIssuesBlockListElement = function(element) {

}

var parseIntroElement = function(element) {
  return getElementText(element).split("\n");
}

var parseItemElement = function(element) {
  var data = [];
  element['elements'].forEach(function(item){
    if (item['name'] == 'p') {
      data.push({text: getElementText(item)});
    } else if (item['name'] == 'blockList') {
      data.push({blockList: parseBlockListElement(item)});
    }
  })
  return data;
}
var parsePElement = function(element) {

}
var parseNumElement = function(element) {

}

var addEmptyArray = function(data, key){
  if (!data.hasOwnProperty(key)) {
    data[key] = [];
  }
  return data;
}

var parseMotivationElement = function(element) {
  var data = {};
  if (element.hasOwnProperty('elements')) {
    element['elements'].forEach(function(item){
      if (item['name'] == 'blockList') {
        itemId = getArrayValue(item, 'attributes', 'id')
        if (itemId == 'issues') {
          data['issuesBlockList'] = parseBlockListElement(item);
        } else if (itemId == 'reasoning') {
          data['reasoningBlockList'] = parseBlockListElement(item);
        } else {
          data['blockList'] = parseBlockListElement(item);
        }
      }
    })
  }
  return data;
}
var parseDecisionElement = function(element) {
  var data = {};
  if (element.hasOwnProperty('elements')) {
    element['elements'].forEach(function(item){
      if (item['name'] == 'blockList') {
        if (!data.hasOwnProperty('blockList')) {
          data['blockList'] = [];
        }
        data['blockList'].push(parseBlockListElement(item));
      }
    })
  }
  return data;
}
var parseConclusionsElement = function(element) {
  var data;
  element['elements'].forEach(function(item){
    if (item['name'] == 'p'){
      itemClass = getArrayValue(item, "attributes", "class");
      if (itemClass == 'signature') {
        data = parseSignaturePElement(item);
      }
    }
  })
  return data;
}

var parseSignaturePElement = function(element) {
  var data = [];
  element['elements'].forEach(function(item){
    if (item['name'] == 'judge') {
      data.push(parseJudgeElement(item));
    }
  })
  return data;
}

var parseAuthorialNoteElement = function(element) {
  return getElementText(element);
}

var printJson = function(json){
  console.log(JSON.stringify(json, null, 2));
}



// var result = parseAknJson(result);

// printJson(result);





