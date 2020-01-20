
/*
Your personal Calendar Bot
Description :
   1. Create a bot from [BotFather](https://telegram.me/BotFather) and replace `BOT_TOKEN` with token received from bot father
   2. Get your personal chat id from [get_id_bot](https://telegram.me/get_id_bot) and replace `CHAT_ID` with it
   3. Register your application with the [Google Developers Console](https://console.developers.google.com)
   4. Activate the Google Calendar API in the [Google Developers Console](https://console.developers.google.com)
   5. Under Credentials, create a new Public API access key and replace the `API_KEY` with it
   6. Find personal Calendar ID under `[Google Calendar] -> [Setting and Sharing] -> [Calendar Setting]` and add it into `calendar_id`
   8. Copy all content to the `Google Script Editor`
   9. Set a proper time to trigger it

Feedback: https://t.me/Leped_Bot

*/
var key = "API_KEY";
var calendar_id = [
    ["XXXXXXXXXXXXXXXXXXXXXXXXXX@group.calendar.google.com"],
    ["YYYYYYYYYYYYYYYYYYYYYYYYYY@group.calendar.google.com"]
]
var token = 'BOT_TOKEN';
var chat_id = "CHAT_ID";
var url = "https://api.telegram.org/bot" + token;
var notif = "\*Calendar*\n";
// [START calendar_telegram_originalData]
/**
 * Receice estring and set them as payload
 * @param {string} estring message which will be sent to tg bot
 */
function originalData(estring) {
    var payload = {
        "method": "sendMessage",
        "chat_id": chat_id,
        "text": estring,
        "parse_mode": "Markdown",
    };
    sendMsg(payload)
}
// [END calendar_telegram_originalData]

// [START calendar_telegram_sendMsg]
/**
 * send post request to send message to tg bot
 * @param {string} payload payload of http request
 */
function sendMsg(payload) {
    var options = {
        'method': 'post',
        'payload': payload
    };

    UrlFetchApp.fetch(url + "/", options)
}
// [END calendar_telegram_sendMsg]
// [START calendar_telegram_getDateStr]
/**
 * Generate speclized data format
 * @param {number} dayCount The number of days people want to proceed
 * @return {Date} The new date.
 */
function getDateStr(dayCount) {
    // eslint-disable-next-line eqeqeq
    if (null == dayCount) {
        dayCount = 0;
    }
    var dd = new Date();
    dd.setDate(dd.getDate() + dayCount);
    var y = dd.getFullYear();
    var m = prefixInteger(dd.getMonth() + 1, 2);
    var d = dd.getDate();
    return y + "-" + m + "-" + d;
}
// [END calendar_telegram_getDateStr]
// [START calendar_telegram_prefixInteger]
/**
 * required 2-digit
 * @param {number} num The number people want to proceed
 * @param {number} length The length of number
 * @return {number} The new number.
 */
function prefixInteger(num, length) {
    return (Array(length).join('0') + num).slice(-length);
}
// [END apps_script_calendar_prefixInteger]
// [START apps_script_calendar_launch]
/**
 * use loop to launch several service
 */
function launch() {
    for (var j in calendar_id) {
        var id = calendar_id[j][0];
        calendar(id)
    }
    notification();
}
// [END calendar_telegram_launch]
// [START calendar_telegram_calendar]
/**
 * fetch calendar data and proceed them
 * @param {number} id Google Calendar id
 */
function calendar(id) {
    var optionalArgs = {
        timeMin: (new Date()).toISOString(),
        showDeleted: false,
        singleEvents: true,
        maxResults: 20,
        orderBy: 'startTime'
    };
    var response = Calendar.Events.list(id, optionalArgs);
    if (!response) {
        originalData("Google Calendar: failed to fetch data!");
    } else {
        var today = (new Date()).toISOString();
        var events = JSON.parse(response).items;
        var date = new Date().toISOString();
        for (var i = 0; i < events.length; i++) {
            // eslint-disable-next-line eqeqeq
            if (events[i].status == "confirmed") {
                if (events[i].start.dateTime >= getDateStr(0)) {
                    if (events[i].start.dateTime <= getDateStr(1)) {
                        var tmp;
                        var summary = events[i].summary;
                        var description = events[i].description;
                        var location = events[i].location;
                        var start = events[i].start.dateTime.replace(":00+08:00", "");
                        start = start.replace("T", " ").replace("2020-", "");
                        var end = events[i].end.dateTime.replace(":00+08:00", "");
                        end = end.replace("T", " ").replace("2020-", "");
                        if (description && location) {
                            /*eslint "max-len": [2, {"code": 120}]*/
                            tmp = summary + '\n' + description + '@' + location + '\n' + start + ' - ' + end + '\n\n';
                        }
                        else if (description) {
                            tmp = summary + '\n' + description + '\n' + start + ' - ' + end + '\n\b';
                        }
                        else if (location) {
                            tmp = summary + '\n' + location + '\n' + start + ' - ' + end + '\n\n';
                        }
                        else tmp = summary + '\n' + start + ' - ' + end + '\n\n';
                        //Logger.log(tmp);
                        notif += tmp;
                    }
                }
            }
        }
    }
}
// [END calendar_telegram_calendar]
// [START calendar_telegram_notification]
/**
 * set notification format
 */
function notification() {
    // eslint-disable-next-line eqeqeq
    if (notif != "\*Calendar*\n") originalData(notif);
    else originalData("\*Calendar*\nNothing to plan today!")
}

// [END calendar_telegram_notification]