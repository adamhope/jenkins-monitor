Jenkins Monitor
=============

This project aims to help you show status of build in blue(building), red(failure), green(success) box on jenkins.
By using jQuery JSONP and jenkins built-in API, setup is a piece of cake.

Why
-------

For a CI server to be effective it is important that the team is constantly aware of the build status (it could be in big TV). A Red box means that build is failed, someonebody in the team may need to take a look at it;Green means "yep, success";Blue means that build currently is building; Grey means that build is aborted or disabled.

![Prototype](http://farm7.static.flickr.com/6037/6328931162_042f2c1d09_z.jpg "Optional title")

How to Use
-----------

    git clone git://github.com/tuo/jenkins-monitor.git


  Then copy or rename conf/config.js.sample to conf/config.js:

    copy conf/config.js.sample conf/config.js

  or

    mv conf/config.js.sample conf/config.js

	And open conf/config.js to change your jenkins ci address and jobs name you want to show on dashboard like following:

		var ci_url = "http://ci.jruby.org/view/Ruboto";
		var jobs_to_be_filtered = ["apitest", "ergonomics"];


  Then run from command line:

		open dashboard.html -a safari


Contribute
------------
This project is still a work in progress.
Suggestions? Email to: clarkhtse@gmail.com or adam@adamhope.com