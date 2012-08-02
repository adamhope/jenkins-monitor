/*jslint browser:true, sloppy: true, nomen: true */
/*globals $, _, DEFAULTS, CONFIG */

// TODO use the jquery tabs plugin

var dashboard = (function () {

    var tabBar            = $('ul.nav-tabs'),
        tabContentWrapper = $('.pill-content'),
        templates         = {
            tab       : '<li><a href="#<%= id %>"><%= name %></a></li>',
            tabContent: '<section id="<%= id %>"><header><h2><%= name %></h2></header><div class="content"></div></section>'
        },
        currentTab = 0,
        cfg;

    function setDefaults() {
        cfg = typeof CONFIG === "undefined" ? DEFAULTS : $.extend({}, DEFAULTS, CONFIG);
    }

    function setTitle() {
        $('title').text(cfg.project_title);
    }

    function getTabs() {
        return $('li', tabBar);
    }

    function getTabContents() {
        return $('section', tabContentWrapper);
    }

    function setActiveTab(index) {
        var tabs     = getTabs(),
            contents = getTabContents();
        $('.active').removeClass('active');
        $(tabs.get(index)).addClass('active');
        $(contents.get(index)).addClass('active');
    }

    function cycle() {
        var tabs = getTabs();
        if (tabs.length < 1) {
            return;
        }
        setActiveTab(currentTab);
        currentTab = (currentTab < tabs.length - 1) ? currentTab + 1 : 0;
    }

    function createTab(name) {
        var id = _.uniqueId('tab_');
        tabBar.append(_.template(templates.tab, {name: name, id: id}));
        tabContentWrapper.append(_.template(templates.tabContent, {name: name, id: id}));
        return $('.content', '#' + id);
    }

    // Init

    setDefaults();
    setTitle();
    setInterval(cycle, cfg.cycleTime * 1000);

    return {
        cfg      : cfg,
        createTab: createTab
    };

}());
