/*
 * Exercise: Refactor the code!
 *
 * This script file contains a small front-end app that queries the
 * StackOverflow API. It works, but the code is not ideal; there is a lot of
 * work to do to clean it up.
 *
 * First take a few minutes to understand what the code is doing, then use what
 * you have learned in the preceding stage-1 exercises to refactor the app.
 *
 * Take your time, and think about what principles you are trying to apply while
 * you are refactoring.
 */
'use strict';

function addListener(selector, eventName, callback) {
    document.querySelector(selector).addEventListener(eventName, callback);
}

const firstFunc = ((tags, length) => '' + '<p>' + 'Query of ' + tags + ' returned ' + length + ' results' + '</p>');

const request = function(e, url, callback) {
    e.preventDefault();

    var form = e.target;
    var tags = form.querySelector('input[name=tags]').value;

    var xhr = new XMLHttpRequest();

    xhr.addEventListener('load', function() {
        if (xhr.status === 200) {
            var response = JSON.parse(xhr.responseText);

            firstFunc(tags, response.items.length)

            document.querySelector('#results-body').innerHTML = response.items.map(callback).join('<br>');

        } else {
            console.log('Status Code: ' + xhr.status);
        }
    });

    xhr.open('GET', url);
    xhr.send();
};

addListener('#form-unanswered', 'submit', function(e) {
    e.preventDefault();

    var form = e.target;
    var tags = form.querySelector('input[name=tags]').value;
    var url = 'https://api.stackexchange.com/2.2/questions/unanswered?order=desc&sort=activity&site=stackoverflow&tagged=' + tags;

    request(e, url, function(item) {
        return '' +
            '<div>' +
            '<p>Title: ' + item.title + '</p>' +
            '<p>Date: ' + new Date(item.creation_date) + '</p>' +
            '<p>Link: <a href="' + item.link + '">Click here</a></p>' +
            '<p>Owner: ' + item.owner.display_name + '</p>' +
            '</div>'
    })
});

addListener('#form-answerers', 'submit', function(e) {
    e.preventDefault();

    var form = e.target;
    var tag = form.querySelector('input[name=tags]').value;
    var url = 'http://api.stackexchange.com/2.2/tags/' + tag + '/top-answerers/all_time?site=stackoverflow'
    firstFunc(tags, response.items.length)

    request(e, url, function(item) {
        return '' +
            '<div>' +
            '<p>Title: ' + item.title + '</p>' +
            '<p>Date: ' + new Date(item.creation_date) + '</p>' +
            '<p>Link: <a href="' + item.link + '">Click here</a></p>' +
            '<p>Owner: ' + item.owner.display_name + '</p>' +
            '</div>'
    })
});