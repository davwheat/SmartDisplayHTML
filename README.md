# SmartDisplay

## Introduction

SmartDisplay is an open source, customisable HTML page which displays useful and contextual data in your browser. The intent of this is to use a Raspberry Pi-esque device and a torn-apart monitor behind a one-way mirror or in a custom frame to display this page.

## Setup

1. Download the latest release
2. Setup `script.js` with the required settings (details below)

## Google Calendar API setup

Please follow the instructions **under Step 1 only**: https://developers.google.com/calendar/quickstart/js#prerequisites

## Config

| Setting                        | Description                                                                                                                                                                                                       | Accepted values                                                                                                              |
| ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- |
| `googleCalendarApiKey`         | Google Calendar API Key                                                                                                                                                                                           | A valid Google Calendar API Key                                                                                              |
| `googleCalendarIds`            | List of Google Calendar IDs to read events from                                                                                                                                                                   | A valid array of strings containing correct Google Calendar IDs. (Note that the default one per account it just your email.) |
| `daysToFetch`                  | Number of days to look into the future for calendar events                                                                                                                                                        | An integer greater than 0                                                                                                    |
| `maxResults`                   | The maximum number of events to fetch **per calendar**. `-1` means no maximum. Note that applying a maximum can cause many issues with calendars with many appointments. In this case, reduce `daysToFetch` first | An integer of range `1-Infinity` or `-1`                                                                                     |
| `calendarRealEstatePercentage` | The percentage height the calendar should occupy                                                                                                                                                                  | An integer of range `0-100`                                                                                                  |
| `daySeparators`                | Use lighter and thicker bars between different days in the calendar section                                                                                                                                       | `true` or `false`                                                                                                            |
| `showTime`                     | Show the time or not                                                                                                                                                                                              | `true` or `false`                                                                                                            |
| `showDate`                     | Show the date or not                                                                                                                                                                                              | `true` or `false`                                                                                                            |
| `locale`                       | The locale to use for the date and times                                                                                                                                                                          | A [valid language tag](https://github.com/ladjs/i18n-locales) (e.g. `en-GB`, `en-US`) or `default` (for the browser default) |
