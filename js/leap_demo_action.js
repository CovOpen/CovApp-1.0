function leap_action(contaminated, hand_detected, height, selected, selected_final) {

    document.getElementById("output1").innerHTML = "<pre> Kontaminiert: " + contaminated + "</pre>";
    if (hand_detected) {
        document.getElementById("output2").innerHTML = '<pre> Hand gefunden.</pre>';
        document.getElementById("output3").innerHTML = '<pre> Item: ' + height + '</pre>';
        document.getElementById("output4").innerHTML = '<pre> Item ausgewaehlt: ' + selected + '</pre>';
        document.getElementById("output5").innerHTML = '<pre> Item final ausgewaeht: ' + selected_final + '</pre>';
    } else {
        document.getElementById("output2").innerHTML = '<pre> Hand nicht gefunden. </pre>';
        document.getElementById("output3").innerHTML = '<pre> Item: ' + height + '</pre>';
        document.getElementById("output4").innerHTML = '<pre> Item ausgewaehlt: ' + selected + '</pre>';
        document.getElementById("output5").innerHTML = '<pre> Item final ausgewaeht: ' + selected_final + '</pre>';
    }


}