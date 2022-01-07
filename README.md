<h1 align="center">
  <br>
<img src="public/logo.svg" alt="Markdownify" width="100">
  <br>
 SA-Trends-Calendar
  <br>
</h1>

<h4 align="center">an open source web app 
          showing trends of the month in South Africa in the year calendar style( <a href="https://twitter.com/Musawenkosi_S_M/status/1471935567462027265">from a Twitter trend</a> ) and makes it easy to download an updated calendar image.</h4>

<br />

[![Screenshooter](https://github.com/TebzaTheMan/sa-trends-calendar/actions/workflows/main.yml/badge.svg?branch=main)](https://github.com/TebzaTheMan/sa-trends-calendar/actions/workflows/main.yml) [![Manual-ScreenShooter](https://github.com/TebzaTheMan/sa-trends-calendar/actions/workflows/manual%20screenshooter.yml/badge.svg)](https://github.com/TebzaTheMan/sa-trends-calendar/actions/workflows/manual%20screenshooter.yml)

![screenshot](https://firebasestorage.googleapis.com/v0/b/sa-trends-calendar.appspot.com/o/calendar-screenshots%2F2022.jpg?alt=media&token=f1cf12e3-4a61-4cbc-bf37-4d0f7df55818)

## Key Features

- View latest SA trends calendar
- Easily download calendar image
- Updated by authenticated users who are moderators (to prevent spam)

## Technology Stack

- NextJS - Frontend
- Chakra UI - UI components library
- Firebase authentication
- Firebase Firestore - authenticated users meta data
- Firebase Realtime database - storing the image urls
- Firebase storage - storing screenshots of the calendars
- Puppeeter - taking screenshots everytime a change to calendar is made

## How to use

To clone and run this application, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
$ git clone https://github.com/TebzaTheMan/sa-trends-calendar
# Go into the repository
$ cd sa-trends-calendar

# Install dependencies
$ npm install

# Run the app
$ npm start
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

## MIT
