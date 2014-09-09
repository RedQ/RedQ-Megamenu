/*	
 * jQuery mmenu v4.5.1
 * @requires jQuery 1.7.0 or later
 *
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 * www.frebsite.nl
 *
 * Licensed under the MIT license:
 * http://en.wikipedia.org/wiki/MIT_License
 */
! function(e) {
    function n(n, s, t) {
        if (t) return "object" != typeof n && (n = {}), n;
        n = e.extend(!0, {}, e[a].defaults, n);
        for (var i = ["position", "zposition", "modal", "moveBackground"], o = 0, l = i.length; l > o; o++) "undefined" != typeof n[i[o]] && (e[a].deprecated('The option "' + i[o] + '"', "offCanvas." + i[o]), n.offCanvas = n.offCanvas || {}, n.offCanvas[i[o]] = n[i[o]]);
        return n
    }

    function s(n) {
        n = e.extend(!0, {}, e[a].configuration, n);
        for (var s = ["panel", "list", "selected", "label", "spacer"], t = 0, i = s.length; i > t; t++) "undefined" != typeof n[s[t] + "Class"] && (e[a].deprecated('The configuration option "' + s[t] + 'Class"', "classNames." + s[t]), n.classNames[s[t]] = n[s[t] + "Class"]);
        if ("undefined" != typeof n.counterClass && (e[a].deprecated('The configuration option "counterClass"', "classNames.counters.counter"), n.classNames.counters = n.classNames.counters || {}, n.classNames.counters.counter = n.counterClass), "undefined" != typeof n.collapsedClass && (e[a].deprecated('The configuration option "collapsedClass"', "classNames.labels.collapsed"), n.classNames.labels = n.classNames.labels || {}, n.classNames.labels.collapsed = n.collapsedClass), "undefined" != typeof n.header)
            for (var s = ["panelHeader", "panelNext", "panelPrev"], t = 0, i = s.length; i > t; t++) "undefined" != typeof n.header[s[t] + "Class"] && (e[a].deprecated('The configuration option "header.' + s[t] + 'Class"', "classNames.header." + s[t]), n.classNames.header = n.classNames.header || {}, n.classNames.header[s[t]] = n.header[s[t] + "Class"]);
        for (var s = ["pageNodetype", "pageSelector", "menuWrapperSelector", "menuInjectMethod"], t = 0, i = s.length; i > t; t++) "undefined" != typeof n[s[t]] && (e[a].deprecated('The configuration option "' + s[t] + '"', "offCanvas." + s[t]), n.offCanvas = n.offCanvas || {}, n.offCanvas[s[t]] = n[s[t]]);
        return n
    }

    function t() {
        r = !0, c.$wndw = e(window), c.$html = e("html"), c.$body = e("body"), e.each([o, l, d], function(e, n) {
            n.add = function(e) {
                e = e.split(" ");
                for (var s in e) n[e[s]] = n.mm(e[s])
            }
        }), o.mm = function(e) {
            return "mm-" + e
        }, o.add("wrapper menu inline panel nopanel list nolist subtitle selected label spacer current highest hidden opened subopened subopen fullsubopen subclose"), o.umm = function(e) {
            return "mm-" == e.slice(0, 3) && (e = e.slice(3)), e
        }, l.mm = function(e) {
            return "mm-" + e
        }, l.add("parent"), d.mm = function(e) {
            return e + ".mm"
        }, d.add("toggle open close setSelected transitionend webkitTransitionEnd mousedown mouseup touchstart touchmove touchend scroll resize click keydown keyup"), e[a]._c = o, e[a]._d = l, e[a]._e = d, e[a].glbl = c
    }
    var a = "mmenu",
        i = "4.5.1";
    if (!e[a]) {
        var o = {},
            l = {},
            d = {},
            r = !1,
            c = {
                $wndw: null,
                $html: null,
                $body: null
            };
        e[a] = function(e, s, t) {
            return this.$menu = e, this.opts = s, this.conf = t, this.vars = {}, this.opts = n(this.opts, this.conf, this.$menu), this._initMenu(), this._init(this.$menu.children(this.conf.panelNodetype)), this
        }, e[a].version = i, e[a].addons = [], e[a].uniqueId = 0, e[a].defaults = {
            classes: "",
            slidingSubmenus: !0,
            onClick: {
                setSelected: !0
            }
        }, e[a].configuration = {
            panelNodetype: "ul, ol, div",
            transitionDuration: 400,
            openingInterval: 25,
            classNames: {
                panel: "Panel",
                selected: "Selected",
                label: "Label",
                spacer: "Spacer"
            }
        }, e[a].prototype = {
            _init: function(n) {
                n = n.not("." + o.nopanel), n = this._initPanels(n), n = this._initLinks(n), n = this._bindCustomEvents(n);
                for (var s = 0; s < e[a].addons.length; s++) "function" == typeof this["_init_" + e[a].addons[s]] && this["_init_" + e[a].addons[s]](n);
                this._update()
            },
            _initMenu: function() {
                this.opts.offCanvas && this.conf.clone && (this.$menu = this.$menu.clone(!0), this.$menu.add(this.$menu.find("*")).filter("[id]").each(function() {
                    e(this).attr("id", o.mm(e(this).attr("id")))
                })), this.$menu.contents().each(function() {
                    3 == e(this)[0].nodeType && e(this).remove()
                }), this.$menu.parent().addClass(o.wrapper);
                var n = [o.menu];
                n.push(o.mm(this.opts.slidingSubmenus ? "horizontal" : "vertical")), this.opts.classes && n.push(this.opts.classes), this.$menu.addClass(n.join(" "))
            },
            _initPanels: function(n) {
                var s = this;
                this.__findAddBack(n, "ul, ol").not("." + o.nolist).addClass(o.list);
                var t = this.__findAddBack(n, "." + o.list).find("> li");
                this.__refactorClass(t, this.conf.classNames.selected, "selected"), this.__refactorClass(t, this.conf.classNames.label, "label"), this.__refactorClass(t, this.conf.classNames.spacer, "spacer"), t.off(d.setSelected).on(d.setSelected, function(n, s) {
                    n.stopPropagation(), t.removeClass(o.selected), "boolean" != typeof s && (s = !0), s && e(this).addClass(o.selected)
                }), this.__refactorClass(this.__findAddBack(n, "." + this.conf.classNames.panel), this.conf.classNames.panel, "panel"), n.add(this.__findAddBack(n, "." + o.list).children().children().filter(this.conf.panelNodetype).not("." + o.nopanel)).addClass(o.panel);
                var a = this.__findAddBack(n, "." + o.panel),
                    i = e("." + o.panel, this.$menu);
                a.each(function() {
                    var n = e(this),
                        t = n.attr("id") || s.__getUniqueId();
                    n.attr("id", t)
                }), a.each(function() {
                    var n = e(this),
                        t = n.is("ul, ol") ? n : n.find("ul ,ol").first(),
                        a = n.parent(),
                        i = a.find("> a, > span"),
                        d = a.closest("." + o.panel);
                    if (a.parent().is("." + o.list)) {
                        n.data(l.parent, a);
                        var r = e('<a class="' + o.subopen + '" href="#' + n.attr("id") + '" />').insertBefore(i);
                        i.is("a") || r.addClass(o.fullsubopen), s.opts.slidingSubmenus && t.prepend('<li class="' + o.subtitle + '"><a class="' + o.subclose + '" href="#' + d.attr("id") + '">' + i.text() + "</a></li>")
                    }
                });
                var r = this.opts.slidingSubmenus ? d.open : d.toggle;
                if (i.each(function() {
                    var n = e(this),
                        s = n.attr("id");
                    e('a[href="#' + s + '"]', i).off(d.click).on(d.click, function(e) {
                        e.preventDefault(), n.trigger(r)
                    })
                }), this.opts.slidingSubmenus) {
                    var c = this.__findAddBack(n, "." + o.list).find("> li." + o.selected);
                    c.parents("li").removeClass(o.selected).end().add(c.parents("li")).each(function() {
                        var n = e(this),
                            s = n.find("> ." + o.panel);
                        s.length && (n.parents("." + o.panel).addClass(o.subopened), s.addClass(o.opened))
                    }).closest("." + o.panel).addClass(o.opened).parents("." + o.panel).addClass(o.subopened)
                } else {
                    var c = e("li." + o.selected, i);
                    c.parents("li").removeClass(o.selected).end().add(c.parents("li")).addClass(o.opened)
                }
                var u = i.filter("." + o.opened);
                return u.length || (u = a.first()), u.addClass(o.opened).last().addClass(o.current), this.opts.slidingSubmenus && a.not(u.last()).addClass(o.hidden).end().appendTo(this.$menu), a
            },
            _initLinks: function(n) {
                var s = this;
                return this.__findAddBack(n, "." + o.list).find("> li > a").not("." + o.subopen).not("." + o.subclose).not('[rel="external"]').not('[target="_blank"]').off(d.click).on(d.click, function(n) {
                    var t = e(this),
                        a = t.attr("href") || "";
                    s.__valueOrFn(s.opts.onClick.setSelected, t) && t.parent().trigger(d.setSelected);
                    var i = s.__valueOrFn(s.opts.onClick.preventDefault, t, "#" == a.slice(0, 1));
                    i && n.preventDefault(), s.__valueOrFn(s.opts.onClick.blockUI, t, !i) && c.$html.addClass(o.blocking), s.__valueOrFn(s.opts.onClick.close, t, i) && s.$menu.triggerHandler(d.close)
                }), n
            },
            _bindCustomEvents: function(n) {
                var s = this;
                return n.off(d.toggle + " " + d.open + " " + d.close).on(d.toggle + " " + d.open + " " + d.close, function(e) {
                    e.stopPropagation()
                }), this.opts.slidingSubmenus ? n.on(d.open, function() {
                    return s._openSubmenuHorizontal(e(this))
                }) : n.on(d.toggle, function() {
                    var n = e(this);
                    return n.triggerHandler(n.parent().hasClass(o.opened) ? d.close : d.open)
                }).on(d.open, function() {
                    return e(this).parent().addClass(o.opened), "open"
                }).on(d.close, function() {
                    return e(this).parent().removeClass(o.opened), "close"
                }), n
            },
            _openSubmenuHorizontal: function(n) {
                if (n.hasClass(o.current)) return !1;
                var s = e("." + o.panel, this.$menu),
                    t = s.filter("." + o.current);
                return s.removeClass(o.highest).removeClass(o.current).not(n).not(t).addClass(o.hidden), n.hasClass(o.opened) ? t.addClass(o.highest).removeClass(o.opened).removeClass(o.subopened) : (n.addClass(o.highest), t.addClass(o.subopened)), n.removeClass(o.hidden).addClass(o.current), setTimeout(function() {
                    n.removeClass(o.subopened).addClass(o.opened)
                }, this.conf.openingInterval), "open"
            },
            _update: function(e) {
                if (this.updates || (this.updates = []), "function" == typeof e) this.updates.push(e);
                else
                    for (var n = 0, s = this.updates.length; s > n; n++) this.updates[n].call(this, e)
            },
            __valueOrFn: function(e, n, s) {
                return "function" == typeof e ? e.call(n[0]) : "undefined" == typeof e && "undefined" != typeof s ? s : e
            },
            __refactorClass: function(e, n, s) {
                e.filter("." + n).removeClass(n).addClass(o[s])
            },
            __findAddBack: function(e, n) {
                return e.find(n).add(e.filter(n))
            },
            __transitionend: function(e, n, s) {
                var t = !1,
                    a = function() {
                        t || n.call(e[0]), t = !0
                    };
                e.one(d.transitionend, a), e.one(d.webkitTransitionEnd, a), setTimeout(a, 1.1 * s)
            },
            __getUniqueId: function() {
                return o.mm(e[a].uniqueId++)
            }
        }, e.fn[a] = function(i, o) {
            return r || t(), i = n(i, o), o = s(o), this.each(function() {
                var n = e(this);
                n.data(a) || n.data(a, new e[a](n, i, o))
            })
        }, e[a].support = {
            touch: "ontouchstart" in window.document
        }, e[a].debug = function() {}, e[a].deprecated = function(e, n) {
            "undefined" != typeof console && "undefined" != typeof console.warn && console.warn("MMENU: " + e + " is deprecated, use " + n + " instead.")
        }
    }
}(jQuery);
/*	
 * jQuery mmenu offCanvas addon
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 */
! function(e) {
    function o(o) {
        return ("top" == o.position || "bottom" == o.position) && ("back" == o.zposition || "next" == o.zposition) && (e[s].deprecated('Using position "' + o.position + '" in combination with zposition "' + o.zposition + '"', 'zposition "front"'), o.zposition = "front"), o
    }

    function t(e) {
        return "string" != typeof e.pageSelector && (e.pageSelector = "> " + e.pageNodetype), e
    }

    function n() {
        c = !0, p = e[s]._c, a = e[s]._d, r = e[s]._e, p.add("offcanvas modal background opening blocker page"), a.add("style"), r.add("opening opened closing closed setPage"), l = e[s].glbl, l.$allMenus = (l.$allMenus || e()).add(this.$menu), l.$wndw.on(r.keydown, function(e) {
            return l.$html.hasClass(p.opened) && 9 == e.keyCode ? (e.preventDefault(), !1) : void 0
        });
        var o = 0;
        l.$wndw.on(r.resize, function(e, t) {
            if (t || l.$html.hasClass(p.opened)) {
                var n = l.$wndw.height();
                (t || n != o) && (o = n, l.$page.css("minHeight", n))
            }
        })
    }
    var s = "mmenu",
        i = "offCanvas";
    e[s].prototype["_init_" + i] = function() {
        if (this.opts[i] && !this.vars[i + "_added"]) {
            this.vars[i + "_added"] = !0, c || n(), this.opts[i] = o(this.opts[i]), this.conf[i] = t(this.conf[i]);
            var e = this.opts[i],
                s = this.conf[i],
                a = [p.offcanvas];
            "boolean" != typeof this.vars.opened && (this.vars.opened = !1), "left" != e.position && a.push(p.mm(e.position)), "back" != e.zposition && a.push(p.mm(e.zposition)), this.$menu.addClass(a.join(" ")).parent().removeClass(p.wrapper), this[i + "_initPage"](l.$page), this[i + "_initBlocker"](), this[i + "_initOpenClose"](), this[i + "_bindCustomEvents"](), this.$menu[s.menuInjectMethod + "To"](s.menuWrapperSelector)
        }
    }, e[s].addons.push(i), e[s].defaults[i] = {
        position: "left",
        zposition: "back",
        modal: !1,
        moveBackground: !0
    }, e[s].configuration[i] = {
        pageNodetype: "div",
        pageSelector: null,
        menuWrapperSelector: "body",
        menuInjectMethod: "prepend"
    }, e[s].prototype.open = function() {
        if (this.vars.opened) return !1;
        var e = this;
        return this._openSetup(), setTimeout(function() {
            e._openFinish()
        }, this.conf.openingInterval), "open"
    }, e[s].prototype._openSetup = function() {
        l.$allMenus.not(this.$menu).trigger(r.close), l.$page.data(a.style, l.$page.attr("style") || ""), l.$wndw.trigger(r.resize, [!0]);
        var e = [p.opened];
        this.opts[i].modal && e.push(p.modal), this.opts[i].moveBackground && e.push(p.background), "left" != this.opts[i].position && e.push(p.mm(this.opts[i].position)), "back" != this.opts[i].zposition && e.push(p.mm(this.opts[i].zposition)), this.opts.classes && e.push(this.opts.classes), l.$html.addClass(e.join(" ")), this.vars.opened = !0, this.$menu.addClass(p.current + " " + p.opened)
    }, e[s].prototype._openFinish = function() {
        var e = this;
        this.__transitionend(l.$page, function() {
            e.$menu.trigger(r.opened)
        }, this.conf.transitionDuration), l.$html.addClass(p.opening), this.$menu.trigger(r.opening)
    }, e[s].prototype.close = function() {
        if (!this.vars.opened) return !1;
        var e = this;
        return this.__transitionend(l.$page, function() {
            e.$menu.removeClass(p.current).removeClass(p.opened), l.$html.removeClass(p.opened).removeClass(p.modal).removeClass(p.background).removeClass(p.mm(e.opts[i].position)).removeClass(p.mm(e.opts[i].zposition)), e.opts.classes && l.$html.removeClass(e.opts.classes), l.$page.attr("style", l.$page.data(a.style)), e.vars.opened = !1, e.$menu.trigger(r.closed)
        }, this.conf.transitionDuration), l.$html.removeClass(p.opening), this.$menu.trigger(r.closing), "close"
    }, e[s].prototype[i + "_initBlocker"] = function() {
        var o = this;
        l.$blck || (l.$blck = e('<div id="' + p.blocker + '" />').appendTo(l.$body)), l.$blck.off(r.touchstart).on(r.touchstart, function(e) {
            e.preventDefault(), e.stopPropagation(), l.$blck.trigger(r.mousedown)
        }).on(r.mousedown, function(e) {
            e.preventDefault(), l.$html.hasClass(p.modal) || o.close()
        })
    }, e[s].prototype[i + "_initPage"] = function(o) {
        o || (o = e(this.conf[i].pageSelector, l.$body), o.length > 1 && (e[s].debug("Multiple nodes found for the page-node, all nodes are wrapped in one <" + this.conf[i].pageNodetype + ">."), o = o.wrapAll("<" + this.conf[i].pageNodetype + " />").parent())), o.addClass(p.page), l.$page = o
    }, e[s].prototype[i + "_initOpenClose"] = function() {
        var o = this,
            t = this.$menu.attr("id");
        t && t.length && (this.conf.clone && (t = p.umm(t)), e('a[href="#' + t + '"]').off(r.click).on(r.click, function(e) {
            e.preventDefault(), o.open()
        }));
        var t = l.$page.attr("id");
        t && t.length && e('a[href="#' + t + '"]').on(r.click, function(e) {
            e.preventDefault(), o.close()
        })
    }, e[s].prototype[i + "_bindCustomEvents"] = function() {
        var e = this,
            o = r.open + " " + r.opening + " " + r.opened + " " + r.close + " " + r.closing + " " + r.closed + " " + r.setPage;
        this.$menu.off(o).on(o, function(e) {
            e.stopPropagation()
        }), this.$menu.on(r.open, function() {
            e.open()
        }).on(r.close, function() {
            e.close()
        }).on(r.setPage, function(o, t) {
            e[i + "_initPage"](t), e[i + "_initOpenClose"]()
        })
    };
    var p, a, r, l, c = !1
}(jQuery);
/*	
 * jQuery mmenu buttonbars addon
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 */
! function(t) {
    function n(t) {
        return t
    }

    function a(t) {
        return t
    }

    function i() {
        d = !0, o = t[r]._c, e = t[r]._d, u = t[r]._e, o.add("buttonbar"), c = t[r].glbl
    }
    var r = "mmenu",
        s = "buttonbars";
    t[r].prototype["_init_" + s] = function(r) {
        d || i();
        var e = this.vars[s + "_added"];
        this.vars[s + "_added"] = !0, e || (this.opts[s] = n(this.opts[s]), this.conf[s] = a(this.conf[s])), this.opts[s], this.conf[s], this.__refactorClass(t("div", r), this.conf.classNames[s].buttonbar, "buttonbar"), t("div." + o.buttonbar, r).each(function() {
            var n = t(this),
                a = n.children().not("input"),
                i = n.children().filter("input");
            n.addClass(o.buttonbar + "-" + a.length), i.each(function() {
                var n = t(this),
                    i = a.filter('label[for="' + n.attr("id") + '"]');
                i.length && n.insertBefore(i)
            })
        })
    }, t[r].addons.push(s), t[r].defaults[s] = {}, t[r].configuration.classNames[s] = {
        buttonbar: "Buttonbar"
    };
    var o, e, u, c, d = !1
}(jQuery);
/*	
 * jQuery mmenu counters addon
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 */
! function(t) {
    function e(e) {
        return "boolean" == typeof e && (e = {
            add: e,
            update: e
        }), "object" != typeof e && (e = {}), e = t.extend(!0, {}, t[o].defaults[s], e)
    }

    function n(t) {
        return t
    }

    function a() {
        i = !0, d = t[o]._c, r = t[o]._d, u = t[o]._e, d.add("counter search noresultsmsg"), r.add("updatecounter"), c = t[o].glbl
    }
    var o = "mmenu",
        s = "counters";
    t[o].prototype["_init_" + s] = function(o) {
        i || a();
        var u = this.vars[s + "_added"];
        this.vars[s + "_added"] = !0, u || (this.opts[s] = e(this.opts[s]), this.conf[s] = n(this.conf[s]));
        var c = this,
            h = this.opts[s];
        this.conf[s], this.__refactorClass(t("em", o), this.conf.classNames[s].counter, "counter"), h.add && o.each(function() {
            var e = t(this).data(r.parent);
            e && (e.find("> em." + d.counter).length || e.prepend(t('<em class="' + d.counter + '" />')))
        }), h.update && o.each(function() {
            var e = t(this),
                n = e.data(r.parent);
            if (n) {
                var a = n.find("> em." + d.counter);
                a.length && (e.is("." + d.list) || (e = e.find("> ." + d.list)), e.length && !e.data(r.updatecounter) && (e.data(r.updatecounter, !0), c._update(function() {
                    var t = e.children().not("." + d.label).not("." + d.subtitle).not("." + d.hidden).not("." + d.search).not("." + d.noresultsmsg);
                    a.html(t.length)
                })))
            }
        })
    }, t[o].addons.push(s), t[o].defaults[s] = {
        add: !1,
        update: !1
    }, t[o].configuration.classNames[s] = {
        counter: "Counter"
    };
    var d, r, u, c, i = !1
}(jQuery);
/*	
 * jQuery mmenu dragOpen addon
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 */
! function(e) {
    function t(e, t, n) {
        return t > e && (e = t), e > n && (e = n), e
    }

    function n(t) {
        return "boolean" == typeof t && (t = {
            open: t
        }), "object" != typeof t && (t = {}), t = e.extend(!0, {}, e[s].defaults[i], t)
    }

    function o(e) {
        return e
    }

    function a() {
        c = !0, r = e[s]._c, p = e[s]._d, f = e[s]._e, r.add("dragging"), d = e[s].glbl
    }
    var s = "mmenu",
        i = "dragOpen";
    e[s].prototype["_init_" + i] = function() {
        if ("function" == typeof Hammer && this.opts.offCanvas && !this.vars[i + "_added"]) {
            this.vars[i + "_added"] = !0, c || a(), this.opts[i] = n(this.opts[i]), this.conf[i] = o(this.conf[i]);
            var p = this,
                h = this.opts[i],
                m = this.conf[i];
            if (h.open) {
                if (Hammer.VERSION < 2) return e[s].deprecated("Older version of the Hammer library", "version 2 or newer"), !1;
                var u, g, l, v, _ = {},
                    w = 0,
                    b = !1,
                    y = !1,
                    $ = 0,
                    x = 0;
                switch (this.opts.offCanvas.position) {
                    case "left":
                    case "right":
                        _.events = "panleft panright", _.typeLower = "x", _.typeUpper = "X", y = "width";
                        break;
                    case "top":
                    case "bottom":
                        _.events = "panup pandown", _.typeLower = "y", _.typeUpper = "Y", y = "height"
                }
                switch (this.opts.offCanvas.position) {
                    case "left":
                    case "top":
                        _.negative = !1;
                        break;
                    case "right":
                    case "bottom":
                        _.negative = !0
                }
                switch (this.opts.offCanvas.position) {
                    case "left":
                        _.open_dir = "right", _.close_dir = "left";
                        break;
                    case "right":
                        _.open_dir = "left", _.close_dir = "right";
                        break;
                    case "top":
                        _.open_dir = "down", _.close_dir = "up";
                        break;
                    case "bottom":
                        _.open_dir = "up", _.close_dir = "down"
                }
                var C = this.__valueOrFn(h.pageNode, this.$menu, d.$page);
                "string" == typeof C && (C = e(C));
                var k = d.$page;
                switch (this.opts.offCanvas.zposition) {
                    case "front":
                        k = this.$menu;
                        break;
                    case "next":
                        k = k.add(this.$menu)
                }
                var S = new Hammer(C[0]);
                S.on("panstart", function(e) {
                    switch (v = e.center[_.typeLower], p.opts.offCanvas.position) {
                        case "right":
                        case "bottom":
                            v >= d.$wndw[y]() - h.maxStartPos && (w = 1);
                            break;
                        default:
                            v <= h.maxStartPos && (w = 1)
                    }
                    b = _.open_dir
                }).on(_.events + " panend", function(e) {
                    w > 0 && e.preventDefault()
                }).on(_.events, function(e) {
                    if (u = e["delta" + _.typeUpper], _.negative && (u = -u), u != $ && (b = u >= $ ? _.open_dir : _.close_dir), $ = u, $ > h.threshold && 1 == w) {
                        if (d.$html.hasClass(r.opened)) return;
                        w = 2, p._openSetup(), p.$menu.trigger(f.opening), d.$html.addClass(r.dragging), x = t(d.$wndw[y]() * m[y].perc, m[y].min, m[y].max)
                    }
                    2 == w && (g = t($, 10, x) - ("front" == p.opts.offCanvas.zposition ? x : 0), _.negative && (g = -g), l = "translate" + _.typeUpper + "(" + g + "px )", k.css({
                        "-webkit-transform": "-webkit-" + l,
                        transform: l
                    }))
                }).on("panend", function() {
                    2 == w && (d.$html.removeClass(r.dragging), k.css("transform", ""), p[b == _.open_dir ? "_openFinish" : "close"]()), w = 0
                })
            }
        }
    }, e[s].addons.push(i), e[s].defaults[i] = {
        open: !1,
        maxStartPos: 100,
        threshold: 50
    }, e[s].configuration[i] = {
        width: {
            perc: .8,
            min: 140,
            max: 440
        },
        height: {
            perc: .8,
            min: 140,
            max: 880
        }
    };
    var r, p, f, d, c = !1
}(jQuery);
/*	
 * jQuery mmenu fixedElements addon
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 */
! function(t) {
    function s(t) {
        return t
    }

    function o(t) {
        return t
    }

    function n() {
        c = !0, e = t[i]._c, f = t[i]._d, r = t[i]._e, e.add("fixed-top fixed-bottom"), d = t[i].glbl
    }
    var i = "mmenu",
        a = "fixedElements";
    t[i].prototype["_init_" + a] = function() {
        if (this.opts.offCanvas) {
            c || n();
            var i = this.vars[a + "_added"];
            if (this.vars[a + "_added"] = !0, i || (this.opts[a] = s(this.opts[a]), this.conf[a] = o(this.conf[a])), this.opts[a], this.conf[a], this.__refactorClass(t("div, span, a", d.$page), this.conf.classNames[a].fixedTop, "fixed-top"), this.__refactorClass(t("div, span, a", d.$page), this.conf.classNames[a].fixedBottom, "fixed-bottom"), !i) {
                var f, p;
                this.$menu.on(r.opening, function() {
                    var s = t(window).scrollTop(),
                        o = d.$page.height() - s - d.$wndw.height();
                    f = t("." + e["fixed-top"]), p = t("." + e["fixed-bottom"]), f.css({
                        "-webkit-transform": "translateY( " + s + "px )",
                        transform: "translateY( " + s + "px )"
                    }), p.css({
                        "-webkit-transform": "translateY( -" + o + "px )",
                        transform: "translateY( -" + o + "px )"
                    })
                }).on(r.closed, function() {
                    f.add(p).css({
                        "-webkit-transform": "none",
                        transform: "none"
                    })
                })
            }
        }
    }, t[i].addons.push(a), t[i].defaults[a] = {}, t[i].configuration.classNames[a] = {
        fixedTop: "FixedTop",
        fixedBottom: "FixedBottom"
    };
    var e, f, r, d, c = !1
}(jQuery);
/*	
 * jQuery mmenu footer addon
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 */
! function(t) {
    function o(o) {
        return "boolean" == typeof o && (o = {
            add: o,
            update: o
        }), "object" != typeof o && (o = {}), o = t.extend(!0, {}, t[a].defaults[s], o)
    }

    function n(t) {
        return t
    }

    function e() {
        h = !0, i = t[a]._c, d = t[a]._d, r = t[a]._e, i.add("footer hasfooter"), f = t[a].glbl
    }
    var a = "mmenu",
        s = "footer";
    t[a].prototype["_init_" + s] = function(a) {
        h || e();
        var d = this.vars[s + "_added"];
        this.vars[s + "_added"] = !0, d || (this.opts[s] = o(this.opts[s]), this.conf[s] = n(this.conf[s]));
        var f = this,
            u = this.opts[s];
        if (this.conf[s], !d && u.add) {
            var c = u.content ? u.content : u.title;
            t('<div class="' + i.footer + '" />').appendTo(this.$menu).append(c)
        }
        var p = t("div." + i.footer, this.$menu);
        p.length && (this.$menu.addClass(i.hasfooter), u.update && a.each(function() {
            var o = t(this),
                n = t("." + f.conf.classNames[s].panelFooter, o),
                e = n.html();
            e || (e = u.title);
            var a = function() {
                p[e ? "show" : "hide"](), p.html(e)
            };
            o.on(r.open, a), o.hasClass(i.current) && a()
        }), "function" == typeof this._init_buttonbars && this._init_buttonbars(p))
    }, t[a].addons.push(s), t[a].defaults[s] = {
        add: !1,
        content: !1,
        title: "",
        update: !1
    }, t[a].configuration.classNames[s] = {
        panelFooter: "Footer"
    };
    var i, d, r, f, h = !1
}(jQuery);
/*	
 * jQuery mmenu header addon
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 */
! function(e) {
    function t(t) {
        return "boolean" == typeof t && (t = {
            add: t,
            update: t
        }), "object" != typeof t && (t = {}), t = e.extend(!0, {}, e[s].defaults[r], t)
    }

    function a(e) {
        return e
    }

    function n() {
        l = !0, i = e[s]._c, o = e[s]._d, h = e[s]._e, i.add("header hasheader prev next title"), d = e[s].glbl
    }
    var s = "mmenu",
        r = "header";
    e[s].prototype["_init_" + r] = function(s) {
        l || n();
        var o = this.vars[r + "_added"];
        this.vars[r + "_added"] = !0, o || (this.opts[r] = t(this.opts[r]), this.conf[r] = a(this.conf[r]));
        var c = this,
            f = this.opts[r];
        if (this.conf[r], !o && f.add) {
            var p = f.content ? f.content : '<a class="' + i.prev + '" href="#"></a><span class="' + i.title + '"></span><a class="' + i.next + '" href="#"></a>';
            e('<div class="' + i.header + '" />').prependTo(this.$menu).append(p)
        }
        var u = e("div." + i.header, this.$menu);
        if (u.length) {
            if (this.$menu.addClass(i.hasheader), f.update) {
                var v = u.find("." + i.title),
                    m = u.find("." + i.prev),
                    _ = u.find("." + i.next),
                    g = !1;
                d.$page && (g = "#" + d.$page.attr("id")), o || m.add(_).off(h.click).on(h.click, function(t) {
                    t.preventDefault(), t.stopPropagation();
                    var a = e(this).attr("href");
                    "#" !== a && (g && a == g ? c.$menu.trigger(h.close) : e(a, c.$menu).trigger(h.open))
                }), s.each(function() {
                    var t = e(this),
                        a = e("." + c.conf.classNames[r].panelHeader, t),
                        n = e("." + c.conf.classNames[r].panelPrev, t),
                        s = e("." + c.conf.classNames[r].panelNext, t),
                        o = a.html(),
                        d = n.attr("href"),
                        l = s.attr("href");
                    o || (o = e("." + i.subclose, t).html()), o || (o = f.title), d || (d = e("." + i.subclose, t).attr("href"));
                    var p = n.html(),
                        u = s.html(),
                        g = function() {
                            v[o ? "show" : "hide"](), v.html(o), m[d ? "attr" : "removeAttr"]("href", d), m[d || p ? "show" : "hide"](), m.html(p), _[l ? "attr" : "removeAttr"]("href", l), _[l || u ? "show" : "hide"](), _.html(u)
                        };
                    t.on(h.open, g), t.hasClass(i.current) && g()
                })
            }
            "function" == typeof this._init_buttonbars && this._init_buttonbars(u)
        }
    }, e[s].addons.push(r), e[s].defaults[r] = {
        add: !1,
        content: !1,
        title: "Menu",
        update: !1
    }, e[s].configuration.classNames[r] = {
        panelHeader: "Header",
        panelNext: "Next",
        panelPrev: "Prev"
    };
    var i, o, h, d, l = !1
}(jQuery);
/*	
 * jQuery mmenu labels addon
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 */
! function(l) {
    function a(a) {
        return "boolean" == typeof a && (a = {
            collapse: a
        }), "object" != typeof a && (a = {}), a = l.extend(!0, {}, l[o].defaults[t], a)
    }

    function e(l) {
        return l
    }

    function s() {
        i = !0, n = l[o]._c, d = l[o]._d, c = l[o]._e, n.add("collapsed"), d.add("updatelabel"), p = l[o].glbl
    }
    var o = "mmenu",
        t = "labels";
    l[o].prototype["_init_" + t] = function(o) {
        i || s();
        var p = this.vars[t + "_added"];
        this.vars[t + "_added"] = !0, p || (this.opts[t] = a(this.opts[t]), this.conf[t] = e(this.conf[t]));
        var u = this.opts[t];
        this.conf[t], u.collapse && (this.__refactorClass(l("li", this.$menu), this.conf.classNames[t].collapsed, "collapsed"), l("." + n.label, o).each(function() {
            var a = l(this),
                e = a.nextUntil("." + n.label, "all" == u.collapse ? null : "." + n.collapsed);
            "all" == u.collapse && (a.addClass(n.opened), e.removeClass(n.collapsed)), e.length && (a.data(d.updatelabel) || (a.data(d.updatelabel, !0), a.wrapInner("<span />"), a.prepend('<a href="#" class="' + n.subopen + " " + n.fullsubopen + '" />')), a.find("a." + n.subopen).off(c.click).on(c.click, function(l) {
                l.preventDefault(), a.toggleClass(n.opened), e[a.hasClass(n.opened) ? "removeClass" : "addClass"](n.collapsed)
            }))
        }))
    }, l[o].addons.push(t), l[o].defaults[t] = {
        collapse: !1
    }, l[o].configuration.classNames[t] = {
        collapsed: "Collapsed"
    };
    var n, d, c, p, i = !1
}(jQuery);
/*	
 * jQuery mmenu searchfield addon
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 */
! function(e) {
    function s(e) {
        switch (e) {
            case 9:
            case 16:
            case 17:
            case 18:
            case 37:
            case 38:
            case 39:
            case 40:
                return !0
        }
        return !1
    }

    function n(s) {
        return "boolean" == typeof s && (s = {
            add: s,
            search: s
        }), "object" != typeof s && (s = {}), s = e.extend(!0, {}, e[r].defaults[o], s), "boolean" != typeof s.showLinksOnly && (s.showLinksOnly = "menu" == s.addTo), s
    }

    function t(e) {
        return e
    }

    function a() {
        c = !0, i = e[r]._c, l = e[r]._d, d = e[r]._e, i.add("search hassearch noresultsmsg noresults nosubresults"), d.add("search reset change"), h = e[r].glbl
    }
    var r = "mmenu",
        o = "searchfield";
    e[r].prototype["_init_" + o] = function(r) {
        c || a();
        var h = this.vars[o + "_added"];
        this.vars[o + "_added"] = !0, h || (this.opts[o] = n(this.opts[o]), this.conf[o] = t(this.conf[o]));
        var u = this,
            f = this.opts[o];
        if (this.conf[o], f.add) {
            switch (f.addTo) {
                case "menu":
                    var p = this.$menu;
                    break;
                case "panels":
                    var p = r;
                    break;
                default:
                    var p = e(f.addTo, this.$menu).filter("." + i.panel)
            }
            p.length && p.each(function() {
                var s = e(this),
                    n = s.is("." + i.list) ? "li" : "div";
                if (!s.children(n + "." + i.search).length) {
                    if (s.is("." + i.menu)) var t = u.$menu,
                        a = "prependTo";
                    else var t = s.children().first(),
                        a = t.is("." + i.subtitle) ? "insertAfter" : "insertBefore";
                    e("<" + n + ' class="' + i.search + '" />').append('<input placeholder="' + f.placeholder + '" type="text" autocomplete="off" />')[a](t)
                }
                f.noResults && (s.is("." + i.menu) && (s = s.children("." + i.panel).first()), n = s.is("." + i.list) ? "li" : "div", s.children(n + "." + i.noresultsmsg).length || e("<" + n + ' class="' + i.noresultsmsg + '" />').html(f.noResults).appendTo(s))
            })
        }
        if (this.$menu.children("div." + i.search).length && this.$menu.addClass(i.hassearch), f.search) {
            var v = e("." + i.search, this.$menu);
            v.length && v.each(function() {
                var n = e(this);
                if ("menu" == f.addTo) var t = e("." + i.panel, u.$menu),
                    a = u.$menu;
                else var t = n.closest("." + i.panel),
                    a = t;
                var r = n.children("input"),
                    o = u.__findAddBack(t, "." + i.list).children("li"),
                    h = o.filter("." + i.label),
                    c = o.not("." + i.subtitle).not("." + i.label).not("." + i.search).not("." + i.noresultsmsg),
                    p = "> a";
                f.showLinksOnly || (p += ", > span"), r.off(d.keyup + " " + d.change).on(d.keyup, function(e) {
                    s(e.keyCode) || n.trigger(d.search)
                }).on(d.change, function() {
                    n.trigger(d.search)
                }), n.off(d.reset + " " + d.search).on(d.reset + " " + d.search, function(e) {
                    e.stopPropagation()
                }).on(d.reset, function() {
                    n.trigger(d.search, [""])
                }).on(d.search, function(s, n) {
                    "string" == typeof n ? r.val(n) : n = r.val(), n = n.toLowerCase(), t.scrollTop(0), c.add(h).addClass(i.hidden), c.each(function() {
                        var s = e(this);
                        e(p, s).text().toLowerCase().indexOf(n) > -1 && s.add(s.prevAll("." + i.label).first()).removeClass(i.hidden)
                    }), e(t.get().reverse()).each(function(s) {
                        var n = e(this),
                            t = n.data(l.parent);
                        if (t) {
                            var a = n.add(n.find("> ." + i.list)).find("> li").not("." + i.subtitle).not("." + i.search).not("." + i.noresultsmsg).not("." + i.label).not("." + i.hidden);
                            a.length ? t.removeClass(i.hidden).removeClass(i.nosubresults).prevAll("." + i.label).first().removeClass(i.hidden) : "menu" == f.addTo && (n.hasClass(i.opened) && setTimeout(function() {
                                t.trigger(d.open)
                            }, 1.5 * (s + 1) * u.conf.openingInterval), t.addClass(i.nosubresults))
                        }
                    }), a[c.not("." + i.hidden).length ? "removeClass" : "addClass"](i.noresults), u._update()
                })
            })
        }
    }, e[r].addons.push(o), e[r].defaults[o] = {
        add: !1,
        addTo: "menu",
        search: !1,
        placeholder: "Search",
        noResults: "No results found."
    };
    var i, l, d, h, c = !1
}(jQuery);
/*	
 * jQuery mmenu toggles addon
 * mmenu.frebsite.nl
 *
 * Copyright (c) Fred Heusschen
 */
! function(t) {
    function e(t) {
        return t
    }

    function s(t) {
        return t
    }

    function c() {
        r = !0, n = t[i]._c, o = t[i]._d, l = t[i]._e, n.add("toggle check"), h = t[i].glbl
    }
    var i = "mmenu",
        a = "toggles";
    t[i].prototype["_init_" + a] = function(i) {
        r || c();
        var o = this.vars[a + "_added"];
        this.vars[a + "_added"] = !0, o || (this.opts[a] = e(this.opts[a]), this.conf[a] = s(this.conf[a]));
        var l = this;
        this.opts[a], this.conf[a], this.__refactorClass(t("input", i), this.conf.classNames[a].toggle, "toggle"), this.__refactorClass(t("input", i), this.conf.classNames[a].check, "check"), t("input." + n.toggle, i).add("input." + n.check, i).each(function() {
            var e = t(this),
                s = e.closest("li"),
                c = e.hasClass(n.toggle) ? "toggle" : "check",
                i = e.attr("id") || l.__getUniqueId();
            s.children('label[for="' + i + '"]').length || (e.attr("id", i), s.prepend(e), t('<label for="' + i + '" class="' + n[c] + '"></label>').insertBefore(s.children().last()))
        })
    }, t[i].addons.push(a), t[i].defaults[a] = {}, t[i].configuration.classNames[a] = {
        toggle: "Toggle",
        check: "Check"
    };
    var n, o, l, h, r = !1
}(jQuery);
