#!/usr/bin/env /usr/local/bin/node

// <bitbar.title>Clockify Month Total Hours</bitbar.title>
// <bitbar.version>v0.1</bitbar.version>
// <bitbar.author>Digiacomo Gianmarco</bitbar.author>
// <bitbar.author.github>GianDigia</bitbar.author.github>
// <bitbar.desc>A MacOs Menu Bar (BitBar) plugin that displays your current month worked hours</bitbar.desc>

const workspace_id = ; //set your WORKSPACE_ID
const user_id = ; //set your USER_ID
const api_key = ; //set your API_KEY
const month_start = `2019-${get_month_number(1)}-01T00:00:00.000Z`
const month_end = `2019-${get_month_number(2)}-01T00:00:00.000Z`

//<--- DO NOT EDIT THE CODE BELOW THIS LINE. --->
const version = "v0.1";
var util = require('util')
var exec = require('child_process').exec;
const bitbar = require('bitbar');
const fetch = require("node-fetch")

const clockify_logo = "iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABfmlDQ1BIRCA3MDktQQAAKJGVjrFKI1EUhr8bo1EMGCSohSwXFLGYSHSLGLUZIxjFQqJCkm4yGePCJLlMrqgPYGejhWizy+orLLvNFpZioYUgCMFnEARBRMZi0DQusn/1nQ/OOT+EtKWUGwaqNe3l5mdlvlCUkSbdROllin7LbihzeXmJjyPg8QYBcJ2wlHLXF55uZ3a3fvzqWDz+MqWNf+y9pbvsNGwQnYBdbthVEC5g2MrTII6AxJZWGsQ5EPfyhSKIJhCvBHwPxEv5QhFCYSDureYyEBoAYqWAR4FYJeBJIGZvWGUIZQEj6ABAV3ZOppLphPlJ7/9O1d18+yGAqFNbWwFiwCBZ5pCkSJImgamdbQ2Qqasd71tlQ0tTKdeRmXpVbWrHM+RCzR4z5ERyPAmQLxRlcPohhwBE31XL1X9Cegja9lqudAh//sLARcsNf4eeafh9qSzPei8uHsOfzY31rxMBR2eh/c73H0YgcgAv+77/fOL7L6fQ1oQz9xUmqGnhJTh2ngAAAAlwSFlzAAAN1wAADdcBQiibeAAABslpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTQ1IDc5LjE2MzQ5OSwgMjAxOC8wOC8xMy0xNjo0MDoyMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczpkYz0iaHR0cDovL3B1cmwub3JnL2RjL2VsZW1lbnRzLzEuMS8iIHhtbG5zOnBob3Rvc2hvcD0iaHR0cDovL25zLmFkb2JlLmNvbS9waG90b3Nob3AvMS4wLyIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0RXZ0PSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VFdmVudCMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKE1hY2ludG9zaCkiIHhtcDpDcmVhdGVEYXRlPSIyMDE5LTAyLTI3VDE1OjU3OjI1KzAxOjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAxOS0wMi0yN1QxNTo1OTo0MyswMTowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAxOS0wMi0yN1QxNTo1OTo0MyswMTowMCIgZGM6Zm9ybWF0PSJpbWFnZS9wbmciIHBob3Rvc2hvcDpDb2xvck1vZGU9IjMiIHBob3Rvc2hvcDpJQ0NQcm9maWxlPSJIRCA3MDktQSIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDozMWExNDFmNS0xYjViLTRjZjItYTRjNS0yNjNjNDRjYTZhMmMiIHhtcE1NOkRvY3VtZW50SUQ9ImFkb2JlOmRvY2lkOnBob3Rvc2hvcDpjMmI3Zjg2Ny1lYjlmLWMyNDQtOTZmMi1hZjg2YWNhNTFlZjciIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo4NjE2OWUzOS1lZWI5LTQyZmMtODA4OC04MzA1YzcxYjUzYWUiPiA8eG1wTU06SGlzdG9yeT4gPHJkZjpTZXE+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJjcmVhdGVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjg2MTY5ZTM5LWVlYjktNDJmYy04MDg4LTgzMDVjNzFiNTNhZSIgc3RFdnQ6d2hlbj0iMjAxOS0wMi0yN1QxNTo1NzoyNSswMTowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTkgKE1hY2ludG9zaCkiLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjAwNzc1MGFkLWZlZWQtNDVmYS1hMmQ1LTAyMTkzYTI3NjFjNSIgc3RFdnQ6d2hlbj0iMjAxOS0wMi0yN1Qx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"

getTimes((saved_time, current_time = 0, description = "") => {
  bitbar_output = [{
      text: formatOutput(saved_time, current_time),
      color: 'white',
      dropdown: false,
      image: clockify_logo
    }];

if(description !== "") {
  bitbar_output.push(bitbar.separator, {
    text: "Task in corso",
  }, {
    text: description,
    color: 'white'
  })
}

bitbar_output.push(bitbar.separator, {
  text: "Apri Clockify",
  color: 'white',
  href: "https://clockify.me/tracker"
});

  bitbar(bitbar_output);
})

function formatOutput(saved_time, current_time) {

  seconds = saved_time + current_time

  let hours = 0
  let minutes = 0

  while((seconds - 3600) > 0){
    hours++
    seconds = seconds - 3600
  }

  while((seconds - 60) > 0){
    minutes++
    seconds = seconds - 60
  }

  formatted_time = `${hours}:` + `${minutes}:`.padStart(3, '0') + `${seconds}`.padStart(2, '0')
  if (current_time != 0){
    formatted_time += ` (${formatOutput(current_time, 0)})`
  }
  return formatted_time
}

function getTimes(callback){
  let sum = getSavedEntries(callback);
}

function getSavedEntries(callback) {
  const body = {"start": `${month_start}`, "end": `${month_end}`};

  fetch(`https://api.clockify.me/api/workspaces/${workspace_id}/timeEntries/user/${user_id}/entriesInRange`, {
    method: 'post',
    body:    JSON.stringify(body),
    headers: { 'Content-Type': 'application/json',
    'X-Api-Key': api_key },
  })
  .then(res => res.json())
  .then(received => {
    let t = received.map((f) => f.timeInterval.duration)
    let sum = t.reduce(function(a, b) {return a + convertTimeToSeconds(b)}, 0);
    getCurrentEntry(sum, callback)
  });
}

function getCurrentEntry(saved_time, callback) {

  fetch(`https://api.clockify.me/api/workspaces/${workspace_id}/timeEntries/inProgress`, {
    method: 'get',
    headers: { 'Content-Type': 'application/json',
    'X-Api-Key': api_key },
  })
  .then((res) => res.json())
  .then((received) => {
      description = received.description
      progress_time_ms = new Date() - new Date(received.timeInterval.start)
      progress_time = parseInt(progress_time_ms/1000)
      callback(saved_time, progress_time, description)
  }, () => callback(saved_time))
}

function convertTimeToSeconds(time) {
  let h_regex = /([0-9]*H)/g;
  let m_regex = /([0-9]*M)/g;
  let s_regex = /([0-9]*S)/g;

  let hours = parseInt((time.match(h_regex) || ["0H"])[0].slice(0, -1));
  let minutes = parseInt((time.match(m_regex) || ["0M"])[0].slice(0, -1));
  let seconds = parseInt((time.match(s_regex) || ["0S"])[0].slice(0, -1));

  total_seconds = hours*60*60 + minutes*60 + seconds

  return total_seconds
}

function get_month_number(offset) {
  return `${(new Date).getMonth() + offset}`.padStart(2, '0')
}
