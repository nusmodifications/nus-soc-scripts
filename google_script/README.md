Google Scripts
===============
## singtel.js
**By [NavePnow](https://github.com/NavePnow)**
**powered by Google Script**

<img src="https://cdn.jsdelivr.net/gh/NavePnow/blog_photo@private/IMG_1888.jpg" height="40%" width="40%">

1. Features
   1. Show Rest time, fee, flow, SMS and Calls.
   2. Run the script remotely
2. Instructions
   1. Create a bot from [BotFather](https://telegram.me/BotFather) and replace `BOT_TOKEN` with token received from bot father
   2. Get your personal chat id from [get_id_bot](https://telegram.me/get_id_bot) and replace `CHAT_ID` with it
   3. Install http capture app like [HTTP Catcher](https://apps.apple.com/us/app/http-catcher/id1445874902) on your phone
   4. Install [hi!App](https://apps.apple.com/us/app/singtel-prepaid-hi-app/id1034712778) app from app store and log in by your phone number
   5. Open the http capture app and refresh the hi!App (reopen)
   6. Find request `https://hiapp.aws.singtel.com/api/v2/usage/dashboard`
   7. Write down `Authorization` and `Cookie` and replace them in the script
   8. Copy all content to the `Google Script Editor`
   9. Set a proper time to trigger it
3. ⚠️ Something you know know
    1. Feel free to [contact me](https://t.me/Leped_Bot) if you have any problem.

## calendar.js
**By [NavePnow](https://github.com/NavePnow)**
**powered by Google Script and Google Developers Console**

<img src="https://cdn.jsdelivr.net/gh/NavePnow/blog_photo@private/IMG_1925.jpg" height="40%" width="40%">

1. Features
   1. Set muliply calendars according to `Google Calendar Api`
   2. Run the script remotely
2. Instructions
   1. Create a bot from [BotFather](https://telegram.me/BotFather) and replace `BOT_TOKEN` with token received from bot father
   2. Get your personal chat id from [get_id_bot](https://telegram.me/get_id_bot) and replace `CHAT_ID` with it
   3. Register your application with the [Google Developers Console](https://console.developers.google.com)
   4. Activate the Google Calendar API in the [Google Developers Console](https://console.developers.google.com)
   5. Under Credentials, create a new Public API access key and replace the `API_KEY` with it
   6. Find personal Calendar ID under `[Google Calendar] -> [Setting and Sharing] -> [Calendar Setting]` and add it into `calendar_id` 
   8. Copy all content to the `Google Script Editor`
   9. Set a proper time to trigger it
3. ⚠️ Something you know know
    1. Feel free to [contact me](https://t.me/Leped_Bot) if you have any problem.