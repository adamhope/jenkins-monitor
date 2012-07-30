# Jenkins Monitor

This project aims to help you show status of build in blue(building), red(failure), green(success) box on jenkins.
By using jQuery JSONP and jenkins built-in API, setup is a piece of cake.

## Why

For a CI server to be effective it is important that the team is constantly aware of the build status, typically this is done using a build light. Jenkins-dashboard has a few advantages overy a typical build light. Assuming you have a spare monitor or TV you can display jenkins-dashboard on it is cheaper, can display the status of any number of builds and can also display additional information such as who claimed a broken build, or who's turn it is to buy cake!

![Prototype](http://farm7.static.flickr.com/6037/6328931162_042f2c1d09_z.jpg "Jenkins monitor on the big screen")

## How to Use

  Clone this repo to the computer you want to run the dashboard on

    git clone git://github.com/tuo/jenkins-monitor.git

  Create a new config file

    vi conf/config.js

  And add the following code replacing the values with your own

    var CONFIG = {
        project_title: "Project Dashboard",
        jenkinsUrl: 'http://ci.jruby.org/view/Ruboto',
        jobs_to_be_filtered: [],
        jobs_to_be_excluded: [],
        cycleTime: 4
    };

  Open the dashboard in your browser

    open index.html -a safari


## Adding new tabs

### Static content

You can easily add a tab with static content, these could be used to display information that doesn't change very often.

Open index.html and find

    <ul class="nav nav-tabs"></ul>

then add the following code

    <li><a href="#your-stuff">Your Stuff</a></li>

Then find the

    <div class="pill-content"></div>

and add

    <section id="your-stuff">
      <header><h2>Your Stuff</h2></header>
      <div class="content">
        <p>Lorem ipsum dolor sit amet...</p>
      </div>
    </section>

Make sure that the id of the section matches the href of your li

### Dynamic content

We've implimented a basic plugin system for adding tabs with dynamic content. For this example we'll make a simple "Hello World!" plugin.

1. Make a new file in js/plugins/hello_world.js with the following content:

        (function () {
            var el = dashboard.createTab('Hello World');
            function displayMessage() {
                el.html('Hello World')
            }
        }());

2. Include the new file at the bottom of index.html in the section marked "plugins"

      <script src="js/plugins/hello_world.js"></script>

It's a very basic example but the important points are:

1. Your plugin file must self execute
2. dashboard.createTab('Hello World'); creates a named tab and returns a jQuery object for the body of the new tab which you can update using JavaScript for example you could use jQuery to make JSONP requests to a server on a regular interval and insert the content when it receives a response.

## Contribute

This project is still a work in progress. Send us your pull requests or e-mail suggestions to: clarkhtse@gmail.com or adam@adamhope.com.
