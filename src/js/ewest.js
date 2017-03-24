/**
 * Created by westp on 2/19/17.
 */
function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
        var pair = vars[i].split("=");
        if(pair[0] == variable){return pair[1];}
    }
    return(false);
}

function clearAll() {
    $("#me").hide();
    $("#code").hide();
    $("#glossary").hide();

    $("#me-nav").attr("class", "menu-inner-box notselected");
    $("#code-nav").attr("class", "menu-inner-box notselected");
    $("#glossary-nav").attr("class", "menu-inner-box notselected");
}
function goToMe() {
    clearAll();
    $(document).prop('title', 'Patrick West - about me');
    $("#me").show();
    $("#me-nav").attr("class", "menu-inner-box selected");
    showAboutMe();
}

function goToCode() {
    clearAll();
    $(document).prop('title', 'Patrick West - my code');
    $("#code").show();
    $("#code-nav").attr("class", "menu-inner-box selected");
}

function goToGlossary() {
    clearAll();
    $(document).prop('title', 'Patrick West - my glossary');
    $("#glossary").show();
    $("#glossary-nav").attr("class", "menu-inner-box selected");
}

$(document).ready(function() {
    var showTab = getQueryVariable("show");
    switch(showTab) {
        case "me":
            goToMe();
            break;
        case "code":
            goToCode();
            break;
        default:
            goToMe();
            break;
    }
    deleteAllMe();
    getMe();
    getPublications();
    getPresentations();
});

function imageHover() {
    $("img#my-image").prop("src",props.rootDir + "/images/me-5-17-2014.jpg");
}

function imageOut() {
    $("img#my-image").prop("src", props.rootDir + "/images/SouthParkPatrick.jpg");
}

function codeItemClicked(element) {
    if($("#" + element.id).text() == "+") {
        $("#" + element.id).empty().text("-").next().show();
    } else {
        $("#" + element.id).empty().text("+").next().hide();
    }
}

function deleteAllMe() {
    $("#me-image").empty();
    $("#me-description").empty();
    sessionStorage.removeItem("about_me");
    $("#publications").empty();
    sessionStorage.removeItem("publications");
    $("#presentations").empty();
    sessionStorage.removeItem("presentations");
}

function clearAllMe() {
    $("#about-me").hide();
    $("#publications").hide();
    $("#presentations").hide();
    $("#resume").hide();
}

function getMe() {
    if (sessionStorage.getItem("about-me") !== true) {
        displayItem(imageQuery, "https://tw.rpi.edu/xslt/ewest/person-image.xsl", "me-image", null);
        displayItem(descriptionQuery, "https://tw.rpi.edu/xslt/ewest/person-bio.xsl", "me-description", null);
        sessionStorage.setItem("about-me", true);
    }
}

function showAboutMe() {
    clearAllMe();
    $("#about-me").show();
}

var pubStart = 0;
var pubIndex = 10;
var pubEnd = 10;
var pubCount = 0;
function getPublications() {
    if (sessionStorage.getItem("publications") !== true) {
        sessionStorage.setItem("publications", true);
        getItems(publicationListQuery, displayPublications);
    }
}

function displayPublications(pubList) {
    if(pubList) {
        pubCount = pubList.length;
        if(pubEnd > pubCount) {
            pubIndex = pubEnd - pubCount;
            pubEnd = pubCount;
        }
        var pubElement = $("#publications");
        for(i = 0; i < pubCount; i++) {
            var pub = pubList[i];
            if(pub.s && pub.s.value) {
                var html = '<div class="document-div" id="publication-' + i + '"></div>';
                pubElement.append(html);
            }
        }
        for(i = pubStart; i < pubEnd; i++) {
            displayPublication(pubList, i);
        }
    }
}

function afterDisplayPublication(pubList) {
    if(pubIndex % 10 == 0) {
        pubStart = pubEnd;
        if(pubStart != pubCount) {
            pubIndex = 10;
            pubEnd += 10;
            if(pubEnd > pubCount) {
                pubIndex = pubEnd - pubCount;
                pubEnd = pubCount;
            }
            for(i = pubStart; i < pubEnd; i++) {
                displayPublication(pubList, i);
            }
        }
    } else {
        pubIndex--;
    }
}

function displayPublication(pubList, index) {
    const pub = pubList[index];
    const localQuery = publicationQuery.replace(new RegExp("PUBLICATION", 'g'), pub.s.value);
    displayItem(localQuery, "https://tw.rpi.edu/xslt/ewest/publication-citation.xsl", "publication-" + index, afterDisplayPublication, pubList);
}

function showPublications() {
    clearAllMe();
    $("#publications").show();
}

var presStart = 0;
var presIndex = 10;
var presEnd = 10;
var presCount = 0;
function getPresentations() {
    if (sessionStorage.getItem("presentations") !== true) {
        sessionStorage.setItem("presentations", true);
        getItems(presentationListQuery, displayPresentations);
    }
}

function displayPresentations(presList) {
    if(presList) {
        presCount = presList.length;
        if(presEnd > presCount) {
            presIndex = presEnd - presCount;
            presEnd = presCount;
        }
        var presElement = $("#presentations");
        for(i = 0; i < presCount; i++) {
            var pres = presList[i];
            if(pres.s && pres.s.value) {
                var html = '<div class="document-div" id="presentation-' + i + '"></div>';
                presElement.append(html);
            }
        }
        for(i = presStart; i < presEnd; i++) {
            displayPresentation(presList, i);
        }
    }
}

function afterDisplayPresentation(presList) {
    if(presIndex % 10 == 0) {
        presStart = presEnd;
        if(presStart != presCount) {
            presIndex = 10;
            presEnd += 10;
            if(presEnd > presCount) {
                presIndex = presEnd - presCount;
                presEnd = presCount;
            }
            for(i = presStart; i < presEnd; i++) {
                displayPresentation(presList, i);
            }
        }
    } else {
        pubIndex--;
    }
}

function displayPresentation(presList, index) {
    const pres = presList[index];
    const presQuery = presentationQuery.replace(new RegExp("PRESENTATION", 'g'), pres.s.value);
    displayItem(presQuery, "https://tw.rpi.edu/xslt/ewest/presentation-citation.xsl", "presentation-" + index, afterDisplayPresentation, presList);
}

function showPresentations() {
    clearAllMe();
    $("#presentations").show();
}

function showResume() {
    clearAllMe();
    $("#resume").show();
}

function displayItem(query, xslt, id, callback, callbackData) {
    var endpoint = "http://tw.rpi.edu/endpoint/books?query=" + encodeURIComponent(query);
    $.ajax(endpoint, {
        type: "get",
        dataType: "xml",
        success: function(data, status) {
            translateXml(data, xslt, id, callback, callbackData);
        },
        error: function(xhr, textStatus, errorThrown) {
            console.error("query failed " + JSON.stringify(xhr));
        }
    });
};

function translateXml(xml, xslt, id, callback, callbackData) {
    $.ajax(xslt, {
        type: "get",
        dataType: "text",
        success: function(data, status) {
            var xsl = $.parseXML(data);
            translateWithXSLT(xsl, xml, id, callback, callbackData);
        },
        error: function(xhr, textStatus, errorThrown) {
            console.error("getting xslt failed " + JSON.stringify(xhr));
        }
    });
}

function translateWithXSLT(xsl, xml, id, callback, callbackData) {
    var xsltProcessor = new XSLTProcessor();
    xsltProcessor.importStylesheet(xsl);
    var description = xsltProcessor.transformToFragment(xml, document);
    $("#" + id).append(description);
    if(callback) callback(callbackData);
}

function getItems(query, callback) {
    var endpoint = "http://tw.rpi.edu/endpoint/books?query=" + encodeURIComponent(query) + "&output=json";
    $.ajax(endpoint, {
        type: "get",
        dataType: "json",
        success: function(data, status) {
            if(data.results && data.results.bindings) callback(data.results.bindings);
            callback(null);
        },
        error: function(xhr, textStatus, errorThrown) {
            console.error("query failed ", xhr);
        }
    });
};

