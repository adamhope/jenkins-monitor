/*jslint browser:true, sloppy: true, plusplus: true */
/*globals $, dashboardConfig */

// TODO check if the claimer of a build is actually shown
// TODO see if the sound stuff still works

(function () {

    var dashboardConfig = dashboard.cfg,
        dashboardLastUpdatedTime = new Date(),
        sounds     = [],
        soundQueue = {
            add: function (sound_url) {
                sounds.push(sound_url);
            },
            play: function () {
                if (sounds.length > 0) {
                    var soundPlayer = $('#sound')[0];
                    if (soundPlayer.paused) {
                        soundPlayer.src = sounds.shift();
                        soundPlayer.play();
                    }
                }
            }
        },
        el;

    function timestamp() {
        $('.timestamp', el.parent()).text('Last updated: ' + new Date().toString('dd, MMMM ,yyyy'));
    }

    // NOTE does this really mark a claimed build?
    function markClaimedBuild(elements) {
        elements.each(function () {
            var worker = $(this).attr('class'),
                y      = parseInt($(this).offset().top + $(this).height() / 2, 10),
                x      = parseInt($(this).offset().left + $(this).width() / 2, 10),
                id     = x + '-' + y,
                html   = '<div class="job_disabled_or_aborted" id="' + id + '">' + worker + '</div>',
                new_element;
            el.append(html);
            new_element = $('#' + id);
            new_element.css('top', parseInt(y - new_element.height() / 2, 10)).css('left', parseInt(x - new_element.width() / 2, 10));
            new_element.addClass('rotate');
            $(this).addClass('workon');
        });
    }

    function jobShouldBeDisplayed(jobName) {
        var includedJobs = dashboardConfig.jobs_to_be_filtered,
            excludedJobs = dashboardConfig.jobs_to_be_excluded;
        return (includedJobs.length === 0 || $.inArray(jobName, includedJobs) !== -1) && ($.inArray(jobName, excludedJobs) === -1);
    }

    function composeHtmlFragement(jobs) {
        var html = '';
        $.each(jobs, function () {
            if (jobShouldBeDisplayed(this.name)) {
                html += ('<article class="jenkins ' + this.color + '"><header>' + this.name + '</header></article>');
            }
        });
        el.html(html);
    }

    function updateBuildStatus(data) {
        composeHtmlFragement(data.jobs);
        timestamp();
        markClaimedBuild($('.disabled, .aborted'));
    }

    function soundForCI(data, lastData) {
        if (lastData !== null) {
            $(data.jobs).each(function (index) {
                if (lastData.jobs[index] !== undefined) {
                    if (lastData.jobs[index].color === 'blue_anime' && this.color === 'red') {
                        soundQueue.add('http://translate.google.com/translate_tts?q=build+' + this.name + '+failed&tl=en');
                    }
                    if (lastData.jobs[index].color === 'blue' && this.color === 'blue') {
                        soundQueue.add('sounds/build_fail_super_mario.mp3');
                    }
                }
            });
        }
        return data;
    }

    function displayError(XHR, textStatus, errorThrown) {
        el.html('<div class="alert alert-error"><h4 class="alert-heading">Uh oh!</h4>There was an error connecting to Jenkins, please check that the URL is correct and you have access to the network. Retrying...</div>');
    }

    function init() {

        el = dashboard.createTab(dashboardConfig.project_title);

        $('header', el.parent()).append('<p class="timestamp" />');

        var counter  = 0,
            lastData = null,
            auto_refresh = setInterval(function () {
                counter++;
                $.jsonp({
                    url     : dashboardConfig.jenkinsUrl + '/api/json' + '?format=json&jsonp=?',
                    dataType: 'jsonp',
                    timeout : 10000,
                    success : function (data, status) {
                        lastData = soundForCI(data, lastData);
                        updateBuildStatus(data);
                    },
                    error: displayError
                });
                soundQueue.play();
            }, 4000);
    }

    // Init
    init();

}());
