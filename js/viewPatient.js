$(function () {
    var answers;



    $(document).ready(init);

    function init() {
        google.charts.load('current', {'packages': ['corechart', 'timeline', 'table']});
        google.charts.setOnLoadCallback(getAnswers);
        //getAnswers();
    }

    class SummaryData {
        constructor(date, answervalue) {
            var parts = date.split('-');
            var time = parts[2].substring(2);
            var parts2 = time.split(':');
            var hour = Number(parts2[0]);
            var min = Number(parts2[1]);
            var sec = Number(parts2[2]);
            var day = Number(parts[2].substring(0, 2));
            var month = Number(parts[1]) - 1;
            var year = Number(parts[0]);
            this.date = new Date(year, month, day, hour, min, sec);
            this.answervalue = answervalue;
        }

        getDate() {
            return this.date;
        }

        getAnswerValue() {
            return this.answervalue;
        }
    }

    class Summary {
        constructor(text, option1, option2, option3, option4, option5, type, yellow, red) {
            this.text = text;
            this.option1 = option1;
            this.option2 = option2;
            this.option3 = option3;
            this.option4 = option4;
            this.option5 = option5;
            this.type = type;
            var arr = [];
            this.data = arr;
        }

        getText() {
            return this.text;
        }

        getType() {
            return this.type;
        }

        getOption1() {
            return this.option1;
        }

        getOption2() {
            return this.option2;
        }

        getOption3() {
            return this.option3;
        }

        getOption4() {
            return this.option4;
        }

        getOption5() {
            return this.option5;
        }

        getYellow() {
            return this.yellow;
        }

        getRed() {
            return this.red;
        }

        appendData(date, answervalue) {
            var s = new SummaryData(date, answervalue);
            this.data.push(s);
        }

        getData() {
            return this.data;
        }
    }

    function app(str) {
        $("#dynamicdata").append(str);
    }

    function chartname(key) {
        return "chart" + key;
    }

    function tablename(key) {
        return "table" + key;
    }

    function findNextDate(date, arr) {
        var next_date = null;
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].getDate() > date) {
                if (next_date == null) next_date = arr[i].getDate();
                if (next_date > arr[i].getDate()) next_date = arr[i].getDate();
            }
        }
        //if (next_date == null) next_date = new Date (Date.now());
        if (next_date == null) next_date = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);
        if(next_date < date) next_date = date; // workaround, if clock is wrong
        return next_date;
    }

    function findEarliestDate(arr) {
        var date = null;
        for (var i = 0; i < arr.length; i++) {
            if (date == null | arr[i].getDate() < date) {
                date = arr[i].getDate();
            }
        }
        if (date == null) date = new Date(Date.now());
        return date;
    }

    function decimalAdjust(type, value, exp) {
        // If the exp is undefined or zero...
        if (typeof exp === 'undefined' || +exp === 0) {
            return Math[type](value);
        }
        value = +value;
        exp = +exp;
        // If the value is not a number or the exp is not an integer...
        if (isNaN(value) || !(typeof exp === 'number' && exp % 1 === 0)) {
            return NaN;
        }
        // Shift
        value = value.toString().split('e');
        value = Math[type](+(value[0] + 'e' + (value[1] ? (+value[1] - exp) : -exp)));
        // Shift back
        value = value.toString().split('e');
        return +(value[0] + 'e' + (value[1] ? (+value[1] + exp) : exp));
    }

    function answerValueToPatientAnswer(answervalue, summary) {
        switch (summary.getType()) {
            case "0":
                var i = parseInt(answervalue);
                switch (i) {
                    case 1:
                        return summary.getOption1();
                        break;
                    case 2:
                        return summary.getOption2();
                        break;
                    case 3:
                        return summary.getOption3();
                        break;
                    case 4:
                        return summary.getOption4();
                        break;
                    case 5:
                        return summary.getOption5();
                        break;
                }
                break;
            case "1":
                return decimalAdjust('round', answervalue, -1);
                break;
        }
    }

    function drawChart(chartname, tablename, summary) {
        switch (summary.getType()) {
            case "0":
                drawChartTyp0(chartname, tablename, summary);
                break;
            case "1":
                drawChartTyp1(chartname, tablename, summary);
                break;
        }
    }

    function drawChartTyp0(chartname, tablename, summary) {
        var arr = summary.getData();
        var data = new google.visualization.DataTable();
        var data2 = new google.visualization.DataTable();
        data2.addColumn('string', "Answer");
        data2.addColumn('date', "Start Date");

        data.addColumn('string', "Answer");
        data.addColumn('date', "Start Date");
        data.addColumn('date', "End Date");

        /* work around to get time lines for all options */

        ed = findEarliestDate(arr);

        if (summary.getOption1()) data.addRows([[answerValueToPatientAnswer(1, summary), ed, ed]]);
        if (summary.getOption2()) data.addRows([[answerValueToPatientAnswer(2, summary), ed, ed]]);
        if (summary.getOption3()) data.addRows([[answerValueToPatientAnswer(3, summary), ed, ed]]);
        if (summary.getOption4()) data.addRows([[answerValueToPatientAnswer(4, summary), ed, ed]]);
        if (summary.getOption5()) data.addRows([[answerValueToPatientAnswer(5, summary), ed, ed]]);

        /* ---------------------------------------------*/

        for (var i = 0; i < arr.length; i++) {
            var timelinelegend = answerValueToPatientAnswer(arr[i].getAnswerValue(), summary);
            var startDate =  arr[i].getDate();
            var endDate = findNextDate(arr[i].getDate(), arr);
            data.addRows([[timelinelegend, startDate, endDate]]);
        }

        for (var i = 0; i < arr.length; i++) {
            data2.addRows([[answerValueToPatientAnswer(arr[i].getAnswerValue(), summary), arr[i].getDate()]]);
        }


        var options = {
            width: 550,
            height: 400,
            timeline: {
                groupByRowLabel: true
            }
        };

        var chart = new google.visualization.Timeline(document.getElementById(chartname));

  //      chart.draw(data, options);

        var table = new google.visualization.Table(document.getElementById(tablename));
        table.draw(data2, {showRowNumber: true, width: '100%', height: '100%'});
    }

    function drawChartTyp1(chartname, tablename, summary) {
        var arr = summary.getData();
        var data = new google.visualization.DataTable();
        data.addColumn('date', 'Time of Day');
        data.addColumn('number', summary.getOption1());

        for (var i = 0; i < arr.length; i++) {
            data.addRows([[arr[i].getDate(), parseInt(arr[i].getAnswerValue())]]);
        }

        var options = {
            title: summary.getText(),
            width: 550,
            height: 400,
            hAxis: {
                format: 'dd/MM/yy',
                gridlines: {count: 10}
            },
            vAxis: {
                gridlines: {color: 'none'},
                minValue: 50
            }
        };

        var chart = new google.visualization.LineChart(document.getElementById(chartname));
//        chart.draw(data, options);
        var table = new google.visualization.Table(document.getElementById(tablename));
        table.draw(data, {showRowNumber: true, width: '100%', height: '100%'});
    }


    function displayAnswers() {
        var map = new Map();
        for (var i = 0; i < answers.length; i++) {
            answer = answers[i];
            var key = answer['idquestion'];
            if (!map.has(key)) {
                var summary = new Summary(answer['text'], answer['option1'], answer['option2'], answer['option3'], answer['option4'], answer['option5'], answer['type'], answer['yellow'], answer['red']);
                summary.appendData(answer['dateofanswer'], answer['answervalue']);
                map.set(key, summary);
            } else {
                map.get(key).appendData(answer['dateofanswer'], answer['answervalue']);
            }

        }
        var str = "";
        for (var [key, summary] of map) {
            app("<h2>" + summary.getText() + "<br></h2>");
            var arr = summary.getData();
            app("<div id=\"" + tablename(key) + "\"></div>");
            app("<div id=\"" + chartname(key) + "\" style=\"width: 550px; height: 400px;\"></div>");
            drawChart(chartname(key), tablename(key), summary);
        }
    }

    function getAnswers() {
        var qrpassword = sessionStorage.getItem('qrpassword');
        var idpatient = sessionStorage.getItem('idpatient');
        var loginUsername= sessionStorage.getItem('loginUsername');
        var loginPassword = sessionStorage.getItem('loginPassword');

        $.ajax({
            type: "POST",
            url: "database.php",
            data: {
                action: "getanswers",
                qrpassword: qrpassword,
                idpatient: idpatient,
                loginUsername: loginUsername,
                loginPassword: loginPassword
            },
            success: function (ret) {
                try {
                answers = JSON.parse(ret);
                displayAnswers();
                } catch (e) {
                 showMessage("No answers", "Answers could not be loaded.\r\n" + ret);
                 }

                return false;
            }

        });

    }

});
