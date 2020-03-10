

if ((typeof(WebSocket) == 'undefined') &&
    (typeof(MozWebSocket) != 'undefined')) {
    WebSocket = MozWebSocket;
}

function leap_init(actionCallback_, maxitems_) {
    var ws;
    var focusListener;
    var blurListener;
    var contaminated = false;
    var maxitems = maxitems_;
    var old_position = null;
    var leap_selected_time = null;
    var leap_height = 0;
    var actionCallback = actionCallback_;
    var leap_selected_final_triggered = false;

    ws = new WebSocket("ws://localhost:6437/v7.json");
    ws.onopen = function (event) {
        ws.send(JSON.stringify({focused: true})); // claim focus

        focusListener = window.addEventListener('focus', function (e) {
            ws.send(JSON.stringify({focused: true})); // claim focus
        });

        blurListener = window.addEventListener('blur', function (e) {
            ws.send(JSON.stringify({focused: false})); // relinquish focus
        });
    };

//FIXME Obsolete Code
    function leap_move_vertical(position, angle, strength, selected) {
        const motion_step = 40;
        if (selected === true) return 0;
        if (position === null) {
            old_position = null;
            return 0;
        }
        if (old_position == null) {
            old_position = position;
            return 0;
        }
        if (old_position - position > motion_step) {
            old_position = position;
            return -1;
        }

        if (-old_position + position > motion_step) {
            old_position = position;
            return 1;
        }
        return 0;

    }

    function leap_selected(position, angle, strength, too_low) {
        if(too_low) return false;
        if (position == null) {
            return false;
        }
        if (angle > 1.5 && strength > 0.7) {
            return true;
        }
        leap_selected_final_triggered = false;
        return false;
    }



    function leap_selected_final(position, angle, strength, time, too_low) {
        if(leap_selected_final_triggered) return false;
        if (!leap_selected(position, angle, strength, too_low)) {
            leap_selected_time = null;
            return false;
        }
        if (leap_selected_time == null) {
            leap_selected_time = time;
        }
        if (time - leap_selected_time > 2000000)
        {
            leap_selected_final_triggered = true;
            return true;
        }
        return false;
    }


    function leap_get_height(palmposition, max, selected) {
        if(selected) return leap_height;
        var ret = palmposition - 400;
        ret = ret*-1;
        ret = ret / 40;
        if(ret > max) ret = max;
        if(ret < 0) ret = 0;
        leap_height = Math.round(ret);
        return leap_height;

        // FIXME Obsolete Code //
        //if(leap_selected_final_triggered) leap_height = 0;
        if (leap_height === 0 && vertical_movement > 0) return leap_height;
        if (leap_height === max && vertical_movement < 0) return leap_height;
        leap_height -= vertical_movement;
        return leap_height;
    }


    function checkcontaminated(palmposition) {
        if (palmposition == null) return;
        if (palmposition < 50) contaminated = true;
    }

    function leap_too_low(palmposition) {
        if (palmposition == null) return;
        if (palmposition < 50) return true;
        return false;
    }

    ws.onmessage = function (event) {
        var palmposition = null;
        var grabangle = null;
        var grabstrength = null;
        var hand_detected = null;
        var selected = null;
        var selected_final = null;
        var move_vertical = null;
        var height = null;
        var too_low = null;

        var obj = JSON.parse(event.data);

        var time = obj['timestamp'];
        if (obj.hasOwnProperty("hands")) {

            if (obj['hands'].length != 0) {
                palmposition = obj['hands'][0]['palmPosition'][1];
                grabangle = obj['hands'][0]['grabAngle'];
                grabstrength = obj['hands'][0]['grabStrength'];
                if(!leap_selected_final_triggered) hand_detected = true;
            } else {
                hand_detected = false;
                leap_selected_final_triggered = false;
            }
            checkcontaminated(palmposition);
            too_low = leap_too_low(palmposition);
            selected = leap_selected(palmposition, grabangle, grabstrength, too_low);
            selected_final = leap_selected_final(palmposition, grabangle, grabstrength, time, too_low);
            //move_vertical = leap_move_vertical(palmposition, grabangle, grabstrength, selected);
            height = leap_get_height(palmposition, maxitems, selected);
        }
        actionCallback(contaminated, too_low, hand_detected, height, selected, selected_final,palmposition)
    };


    ws.onclose = function (event) {
        ws = null;
        window.removeEventListener("focus", focusListener);
        window.removeEventListener("blur", blurListener);
    };


    ws.onerror = function (event) {
//      alert("Received error");
    };
};
