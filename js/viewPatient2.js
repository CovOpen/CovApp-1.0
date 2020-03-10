'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

$(function () {
    var answers;

    $(document).ready(init);

    function init() {
        google.charts.load('current', { 'packages': ['corechart', 'timeline', 'table'] });
        google.charts.setOnLoadCallback(getAnswers);
        //getAnswers();
    }

    var SummaryData = function () {
        function SummaryData(date, answervalue) {
            _classCallCheck(this, SummaryData);

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

        _createClass(SummaryData, [{
            key: 'getDate',
            value: function getDate() {
                return this.date;
            }
        }, {
            key: 'getAnswerValue',
            value: function getAnswerValue() {
                return this.answervalue;
            }
        }]);

        return SummaryData;
    }();

    var Summary = function () {
        function Summary(text, option1, option2, option3, option4, option5, type, yellow, red) {
            _classCallCheck(this, Summary);

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

        _createClass(Summary, [{
            key: 'getText',
            value: function getText() {
                return this.text;
            }
        }, {
            key: 'getType',
            value: function getType() {
                return this.type;
            }
        }, {
            key: 'getOption1',
            value: function getOption1() {
                return this.option1;
            }
        }, {
            key: 'getOption2',
            value: function getOption2() {
                return this.option2;
            }
        }, {
            key: 'getOption3',
            value: function getOption3() {
                return this.option3;
            }
        }, {
            key: 'getOption4',
            value: function getOption4() {
                return this.option4;
            }
        }, {
            key: 'getOption5',
            value: function getOption5() {
                return this.option5;
            }
        }, {
            key: 'getYellow',
            value: function getYellow() {
                return this.yellow;
            }
        }, {
            key: 'getRed',
            value: function getRed() {
                return this.red;
            }
        }, {
            key: 'appendData',
            value: function appendData(date, answervalue) {
                var s = new SummaryData(date, answervalue);
                this.data.push(s);
            }
        }, {
            key: 'getData',
            value: function getData() {
                return this.data;
            }
        }]);

        return Summary;
    }();

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
        if (next_date < date) next_date = date; // workaround, if clock is wrong
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
        value = Math[type](+(value[0] + 'e' + (value[1] ? +value[1] - exp : -exp)));
        // Shift back
        value = value.toString().split('e');
        return +(value[0] + 'e' + (value[1] ? +value[1] + exp : exp));
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
        data2.addColumn('string', "Patient Answer");
        data2.addColumn('date', "Start Date");

        data.addColumn('string', "Patient Answer");
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
            var startDate = arr[i].getDate();
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

        chart.draw(data, options);

        var table = new google.visualization.Table(document.getElementById(tablename));
        table.draw(data2, { showRowNumber: true, width: '100%', height: '100%' });
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
                gridlines: { count: 10 }
            },
            vAxis: {
                gridlines: { color: 'none' },
                minValue: 50
            }
        };

        var chart = new google.visualization.LineChart(document.getElementById(chartname));
        chart.draw(data, options);
        var table = new google.visualization.Table(document.getElementById(tablename));
        table.draw(data, { showRowNumber: true, width: '100%', height: '100%' });
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
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = map[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var _step$value = _slicedToArray(_step.value, 2),
                    key = _step$value[0],
                    summary = _step$value[1];

                app("<h2>" + summary.getText() + "<br></h2>");
                var arr = summary.getData();
                app("<div id=\"" + tablename(key) + "\"></div>");
                app("<div id=\"" + chartname(key) + "\" style=\"width: 550px; height: 400px;\"></div>");
                drawChart(chartname(key), tablename(key), summary);
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }
    }

    function getAnswers() {
        var qrpassword = sessionStorage.getItem('qrpassword');
        var idpatient = sessionStorage.getItem('idpatient');
        var loginUsername = sessionStorage.getItem('loginUsername');
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
            success: function success(ret) {
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