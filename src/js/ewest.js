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

    $("#me-nav").attr("class", "menu-inner-box notselected");
    $("#code-nav").attr("class", "menu-inner-box notselected");
}
function goToMe() {
    clearAll();
    $(document).prop('title', 'Patrick West - about me');
    $("#me").show();
    $("#me-nav").attr("class", "menu-inner-box selected");
}

function goToCode() {
    clearAll();
    $(document).prop('title', 'Patrick West - my code');
    $("#code").show();
    $("#code-nav").attr("class", "menu-inner-box selected");
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
});

function imageHover() {
    $("img#my-image").prop("src",props.rootDir + "/images/me-5-17-2014.jpg");
}

function imageOut() {
    $("img#my-image").prop("src", props.rootDir + "/images/SouthParkPatrick.jpg");
}

function codeItemClicked(element) {
    console.log("item clicked " + element.id);
    if($("#" + element.id).text() == "+") {
        $("#" + element.id).empty().text("-").next().show();
    } else {
        $("#" + element.id).empty().text("+").next().hide();
    }
}