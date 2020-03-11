$(function () {
    var questions;
    var append_str;
    $(document).ready(init);

    function init() {
        getQuestions();
    }

    function app_init() {
        append_str = "";
    }

    function app(str) {
        append_str = append_str + str;
    }
    function app_finish() {
        $("#dynamicdata").append(append_str);
    }

    var qrcode = { head: "", version: "", id: "", password: "", answers: []};
    var XML;

    function downloadFile(text, filename) {
        var element = document.createElement('a');
        element.setAttribute('href', 'data:application/xml;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', filename);

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
    }

    function displayPatient() {
        var qrstr = sessionStorage.getItem('qrstr');
        if(!decodeQR(qrstr, qrcode)) {
            showMessage("QR Code cannot be decoded.", "There was an error while decoding the QR code.");
            return;
        }
        XML = new XMLWriter();
        XML.BeginNode("PATIENT");

        app_init();
        app("<div class=\"table-responsive\">");
        app("<table class=\"table table-striped table-bordered\">");
        app("<thead>");
        app("<tr>");
        //app("<th scope=\"col\">XMLFIELD</th>");
        app("<th scope=\"col\">Frage</th>");
        app("<th scope=\"col\">Antwort</th>");
        app("</tr>");
        app("</thead>");
        app("<tbody>");


        for (var i = 0; i < questions.length; i++) {
            var question = questions[i];
            var answer = qrcode.answers[i];
            XML.Node(question['XMLFIELD'], answer.toString());

            if(answer !== 0) {

                app("<tr>");
                app("<td>" + question['text'] + "</td>");
                app("<td>" + question['option' + answer] + "</td> ");
                app("</tr>");
            }
        }
        app("</tbody>");
        app("</table>");
        app("</div>");
        app_finish();
        //XML.EndNode("Patient");



        XML.EndNode();
        xmlstr = XML.ToString();
        downloadFile(xmlstr, "patient.xml");
        //showMessage("XML", xmlstr )
    }

    function getQuestions() {
        var language = 1;
        $.ajax({
            type: "POST",
            url: "database.php",
            data: {
                action: "getquestions",
                language: language
            },
            success: function (ret) {
                try {
                    questions = JSON.parse(ret);
                    current_question = 0;
                    displayPatient();
                } catch (e) {
                    showMessage("No questions", "Questions could not be loaded." + e.message);
                }

                return false;
            }

        });

    }

});
