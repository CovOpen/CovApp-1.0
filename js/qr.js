function answers_to_str(answers) {
    var ret = "";
    for(i=0;i<answers.length;i++) {
        if(answers[i] === 0) {
            ret += " ";
        }
        else {
            ret += answers[i] - 1;
        }
    }
    return ret;
}

function str_to_answers(str) {
    var ret = new Array(str.length);
    for(i=0; i<str.length;i++) {
        c = str[i];
        if(c === " ") {
            ret[i] = 0;
        }
        else
        {
            ret[i] = parseInt(c) + 1;
        }
    }
    return ret;
}

function encodeQR(id, password, answers_str) {
    //FIXME encryption
    var str_encrypted = "COV"+"001"+id+answers_str;
    return str_encrypted;
}

function encodeXMLQR(answers, questions) {
    var XML = new XMLWriter();
    XML.BeginNode("PATIENT");
    for(i=0;i<answers.length;i++) {
        var answer = answers[i];
        var question = questions[i];
        XML.Node("A", answer.toString());
    }
    XML.EndNode();
    qrxml_str = XML.ToString();
    return qrxml_str;
}


function decodeQR(qrstr,qrcode) {

    function fetch(length) {
        if (qrstr.length < length) {
            return null;
        }
        ret = qrstr.substring(0, length);
        qrstr = qrstr.substring(length, qrstr.length);
        return ret;
    };

    qrcode.head = fetch(3);
    if (qrcode.head !== "COV") return false;
    qrcode.version = fetch(3);
    if(qrcode.version !== "001") return false;
    qrcode.id = fetch(9);
    if(qrcode.id == null) return false;

    //FIXME decryption

    qrcode.answers = str_to_answers(qrstr);
    if(qrcode.answers.length == 0) return false;
    return true;
}