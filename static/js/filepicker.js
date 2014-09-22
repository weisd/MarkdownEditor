var filepicker = (function() {
    var a;
    var b = function(b) {
        a = b;
    };
    var c = "https://www.filepicker.io";
    if (window.filepicker && window.filepicker.hostname) c = window.filepicker.hostname;
    var d = c.replace("www", "dialog");
    var e = "v0";
    var f = {
        ALL: '*/*',
        IMAGES: 'image/*',
        JPG: 'image/jpeg',
        GIF: 'image/gif',
        PNG: 'image/png',
        PDF: 'application/pdf, application/x-pdf, application/acrobat, applications/vnd.pdf, text/pdf, text/x-pdf',
        AUDIO: 'audio/*',
        MP3: 'audio/mpeg',
        TEXT: 'text/*',
        HTML: 'text/html',
        XML: 'text/xml',
        VCARD: 'text/vcard',
        VIDEO: 'video/*',
        MPEG: 'video/mpeg',
        MP4: 'video/mp4'
    };
    var g = {
        BOX: 0,
        COMPUTER: 1,
        DROPBOX: 2,
        FACEBOOK: 3,
        GITHUB: 4,
        GMAIL: 5,
        IMAGE_SEARCH: 6,
        URL: 7,
        WEBCAM: 8,
        GOOGLE_DRIVE: 9,
        SEND_EMAIL: 10,
        INSTAGRAM: 11,
        FLICKR: 12,
        VIDEO: 13,
        EVERNOTE: 14,
        PICASA: 15,
        WEBDAV: 16,
        FTP: 17,
        ALFRESCO: 18
    };
    var h = false;
    var i;
    var j = 5;
    var k = 1 * 1024 * 1024;
    var l = function(a) {
        this.text = a;
        this.toString = function() {
            return "FilepickerException: " + this.text;
        };
    };
    var m = function(a) {
        return Object.prototype.toString.call(a) === '[object Array]';
    };
    var n = {
        OPEN: '/v0/dialog/open/',
        SAVEAS: '/v0/dialog/save/'
    };
    var o = /^(http|https)\:.*\/\//i;
    var p = "left=100,top=100,height=600,width=800,menubar=no,toolbar=no,location=no,personalbar=no,status=no,resizable=yes,scrollbars=yes,dependent=yes,dialog=yes";
    var q = "filepicker_dialog";
    var r = "filepicker_dialog_container";
    var s = "filepicker_shade";
    var t = "filepicker_iframe";
    var u = "filepicker_comm_iframe";
    var v = {};
    v.tempStorage = d + "/v0/api/path/storage/";
    v.commUrl = d + "/v0/dialog/comm_iframe/";
    v.open = d + n.OPEN;
    v.saveas = d + n.SAVEAS;
    var w = function(b, c, d) {
        return v.open + "?m=" + encodeURIComponent(b.join(",")) + "&key=" + a + "&id=" + c + "&referrer=" + window.location.hostname + "&iframe=" + (d.container != 'window') + "&version=" + e + (d.services ? "&s=" + d.services.join(",") : "") + (d.multiple ? "&multi=" + d.multiple: "") + (d.location !== undefined ? "&loc=" + d.location: "") + (d.metadata ? "&meta=" + d.metadata: "") + (d.maxSize ? "&maxSize=" + d.maxSize: "") + (d.persist ? "&p=" + d.persist: "") + (d.auth_tokens ? "&auth_tokens=" + d.auth_tokens: "") + (d.conversions ? "&conversions=" + d.conversions: "");
    };
    var x = function(b, c, d, f) {
        return v.saveas + "?url=" + b + "&m=" + encodeURIComponent(c) + "&key=" + a + "&id=" + d + "&referrer=" + window.location.hostname + "&iframe=" + (f.container != 'window') + "&version=" + e + (f.services ? "&s=" + f.services: "") + (f.defaultSaveasName ? "&defaultSaveasName=" + f.defaultSaveasName: "") + (f.location !== undefined ? "&loc=" + f.location: "");
    };
    var y = function() {
        if (window.frames[u] === undefined) {
            z();
            var a;
            a = document.createElement("iframe");
            a.name = u;
            a.src = v.commUrl;
            a.style.display = 'none';
            document.body.appendChild(a);
        }
    };
    var z = function() {
        if (z.set) return;
        else z.set = true;
        var a = function(a) {
            if (a.origin != c && a.origin != d) return;
            var b = JSON.parse(a.data);
            C.run(b);
        };
        if (window.addEventListener) window.addEventListener("message", a, false);
        else if (window.attachEvent) window.attachEvent("onmessage", a);
        else throw new l("Unsupported browser");
    };
    var A = function(a, b) {
        var c = function(c) {
            if (c.type !== "filepickerUrl") return;
            if (m(c.payload)) a(c.payload);
            else if (b) a([c.payload]);
            else a(c.payload.url, c.payload.data);
            H();
        };
        return c;
    };
    var B = function(a) {
        var b = function(b) {
            if (b.type !== "ThirdPartyCookies") return;
            i = !!b.payload;
            if (a && typeof a === "function") a( !! b.payload);
        };
        return b;
    };
    var C = {};
    C._storage = {
        'cookies': B()
    };
    C.attachHandler = function(a, b) {
        C._storage[a] = b;
        return b;
    };
    C.detachHandler = function(a) {
        return delete C._storage[a];
    };
    C.run = function(a) {
        var b = a.id;
        if (C._storage.hasOwnProperty(b)) {
            C._storage[b](a);
            return true;
        }
        return false;
    };
    var D = function(a) {
        var b = E();
        var c = F();
        var d = G();
        var e = document.createElement("iframe");
        e.name = q;
        e.id = q;
        var f = O();
        var g = Math.min(f[1] - 40, 500);
        e.style.width = '100%';
        e.style.height = g - 10 + 'px';
        e.style.border = "none";
        e.style.position = "relative";
        e.setAttribute('frameborder', 0);
        e.setAttribute('marginwidth', 0);
        e.setAttribute('marginheight', 0);
        e.src = a;
        document.body.appendChild(b);
        c.appendChild(d);
        c.appendChild(e);
        document.body.appendChild(c);
        return e;
    };
    var E = function() {
        var a = document.createElement("div");
        a.id = s;
        a.style.position = 'fixed';
        a.style.top = 0;
        a.style.bottom = 0;
        a.style.right = 0;
        a.style.left = 0;
        a.style.backgroundColor = '#000000';
        a.style.opacity = '0.5';
        a.style.filter = 'alpha(opacity=50)';
        a.style.zIndex = 10000;
        a.onclick = filepicker.closeModal;
        return a;
    };
    var F = function() {
        var a = document.createElement("div");
        a.id = r;
        a.style.position = 'fixed';
        a.style.background = '#ffffff url("https://www.filepicker.io/static/img/spinner.gif") no-repeat 50% 50%';
        a.style.top = '10px';
        a.style.bottom = 'auto';
        a.style.right = 'auto';
        var b = O();
        var c = Math.min(b[1] - 40, 500);
        var d = Math.min(b[0] - 40, 800);
        var e = (b[0] - d - 40) / 2;
        a.style.left = e + "px";
        a.style.height = c + 'px';
        a.style.width = d + 'px';
        a.style.overflow = 'auto';
        a.style.webkitOverflowScrolling = 'touch';
        a.style.border = '1px solid #999';
        a.style.webkitBorderRadius = '3px';
        a.style.borderRadius = '3px';
        a.style.margin = '0';
        a.style.webkitBoxShadow = '0 3px 7px rgba(0, 0, 0, 0.3)';
        a.style.boxShadow = '0 3px 7px rgba(0, 0, 0, 0.3)';
        a.style.zIndex = 10001;
        return a;
    };
    var G = function() {
        var a = document.createElement("a");
        a.appendChild(document.createTextNode('\u00D7'));
        a.onclick = filepicker.closeModal;
        a.style.position = "absolute";
        a.style.zIndex = 10;
        a.style.top = "10px";
        a.style.right = "15px";
        a.style.cursor = "default";
        a.style.padding = '0 5px 0 0px';
        a.style.fontSize = '1.5em';
        a.style.color = '#555555';
        a.style.textDecoration = 'none';
        return a;
    };
    var H = function() {
        var a = document.getElementById(s);
        if (a) document.body.removeChild(a);
        var b = document.getElementById(r);
        if (b) document.body.removeChild(b);
    };
    var I = function() {
        var a = new Date();
        return a.getTime().toString();
    };
    var J = function(a, b, c) {
        a = S.normalizeMimetypes(a);
        return L(n.OPEN, {
            'mimetype': a,
            'options': b,
            'callback': c
        });
    };
    var K = function(a, b, c, d) {
        return L(n.SAVEAS, {
            'file_url': a,
            'mimetype': b,
            'options': c,
            'callback': d
        });
    };
    var L = function(b, c) {
        var d;
        var e;
        var g;
        if (!a) throw new l("API Key not found");
        if (b != n.OPEN && b != n.SAVEAS) return null;
        if (b == n.SAVEAS) {
            g = c.file_url;
            if (!g || typeof g != "string") throw new l("The provided File URL ('" + g + "') is not valid");
            if (!g.match(o)) throw new l(g + " is not a valid url. Make sure it starts with http or https");
            g = encodeURIComponent(g);
        }
        var j = c.mimetype;
        var k = c.options;
        var r = c.callback;
        j = j || f.ALL;
        if (!m(j)) j = [j];
        if (k === undefined) k = {};
        else if (typeof k === "function") {
            r = k;
            k = {};
        }
        r = r || 
        function() {};
        if (k.services && !m(k.services)) k.services = [k.services];
        if (k.debug) {
            dummy_url = "https://www.filepicker.io/api/file/-nBq2onTSemLBxlcBWn1";
            data = {
                'filename': 'test.png',
                'type': 'image/png',
                'size': 58979
            };
            window.setTimeout(function() {
                if (k.multiple) r([{
                    'url': dummy_url,
                    'data': data
                },
                {
                    'url': dummy_url,
                    'data': data
                }]);
                else r(dummy_url, data);
            },
            100);
            return window;
        }
        if (k.container === undefined) if (k.modal === undefined) k.container = h ? 'window': 'modal';
        else k.container = k.modal ? 'modal': 'window';
        if (k.container == 'modal') if (S.isIOS() || S.isAndroid()) k.container = 'window';
        var s = k.container != 'window';
        var t = (O()[0] < 768);
        s = s && !t;
        if (i !== undefined) {
            s = s && i;
            y();
        } else if (s) {
            var u = function() {
                if (b == n.OPEN) J(j, k, r);
                else if (b == n.SAVEAS) K(g, j, k, r);
            };
            M(u);
            return null;
        }
        if (k.auth_tokens !== undefined) {
            var v = JSON.stringify(k.auth_tokens);
            k.auth_tokens = encodeURIComponent(v);
        }
        if (k.conversions !== undefined) {
            var z = JSON.stringify(k.conversions);
            k.conversions = encodeURIComponent(z);
        }
        var B = I();
        var E;
        if (b == n.OPEN) E = w(j, B, k);
        else if (b == n.SAVEAS) E = x(g, j, B, k);
        if (k.container == 'window') d = window.open(E, q, p);
        else if (k.container == 'modal') d = D(E);
        else {
            var F = document.getElementById(k.container);
            if (!F) throw new l("Container '" + k.container + "' not found. This should either be set to 'window','modal', or the ID of an iframe that is currently in the document.");
            F.src = E;
        }
        C.attachHandler(B, A(r, !!k.multiple));
        return d;
    };
    var M = function(a) {
        handler = B(a);
        C.attachHandler('cookies', handler);
        y();
    };
    var N = {
        _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
        encode: function(a) {
            var b = "";
            var c,
            d,
            e,
            f,
            g,
            h,
            i;
            var j = 0;
            a = N._utf8_encode(a);
            while (j < a.length) {
                c = a.charCodeAt(j);
                d = a.charCodeAt(j + 1);
                e = a.charCodeAt(j + 2);
                j += 3;
                f = c >> 2;
                g = ((c & 3) << 4) | (d >> 4);
                h = ((d & 15) << 2) | (e >> 6);
                i = e & 63;
                if (isNaN(d)) h = i = 64;
                else if (isNaN(e)) i = 64;
                b = b + this._keyStr.charAt(f) + this._keyStr.charAt(g) + this._keyStr.charAt(h) + this._keyStr.charAt(i);
            }
            return b;
        },
        decode: function(a) {
            var b = "";
            var c,
            d,
            e;
            var f,
            g,
            h,
            i;
            var j = 0;
            a = a.replace(/[^A-Za-z0-9\+\/\=]/g, "");
            while (j < a.length) {
                f = this._keyStr.indexOf(a.charAt(j));
                g = this._keyStr.indexOf(a.charAt(j + 1));
                h = this._keyStr.indexOf(a.charAt(j + 2));
                i = this._keyStr.indexOf(a.charAt(j + 3));
                j += 4;
                c = (f << 2) | (g >> 4);
                d = ((g & 15) << 4) | (h >> 2);
                e = ((h & 3) << 6) | i;
                b = b + String.fromCharCode(c);
                if (h != 64) b = b + String.fromCharCode(d);
                if (i != 64) b = b + String.fromCharCode(e);
            }
            b = N._utf8_decode(b);
            return b;
        },
        _utf8_encode: function(a) {
            a = a.replace(/\r\n/g, "\n");
            var b = "";
            for (var c = 0; c < a.length; c++) {
                var d = a.charCodeAt(c);
                if (d < 128) b += String.fromCharCode(d);
                else if ((d > 127) && (d < 2048)) {
                    b += String.fromCharCode((d >> 6) | 192);
                    b += String.fromCharCode((d & 63) | 128);
                } else {
                    b += String.fromCharCode((d >> 12) | 224);
                    b += String.fromCharCode(((d >> 6) & 63) | 128);
                    b += String.fromCharCode((d & 63) | 128);
                }
            }
            return b;
        },
        _utf8_decode: function(a) {
            var b = "";
            var c = 0;
            var d = c1 = c2 = 0;
            while (c < a.length) {
                d = a.charCodeAt(c);
                if (d < 128) {
                    b += String.fromCharCode(d);
                    c++;
                } else if ((d > 191) && (d < 224)) {
                    c2 = a.charCodeAt(c + 1);
                    b += String.fromCharCode(((d & 31) << 6) | (c2 & 63));
                    c += 2;
                } else {
                    c2 = a.charCodeAt(c + 1);
                    c3 = a.charCodeAt(c + 2);
                    b += String.fromCharCode(((d & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                    c += 3;
                }
            }
            return b;
        }
    };
    var O = function() {
        if (document.body && document.body.offsetWidth) {
            winW = document.body.offsetWidth;
            winH = document.body.offsetHeight;
        }
        if (document.compatMode == 'CSS1Compat' && document.documentElement && document.documentElement.offsetWidth) {
            winW = document.documentElement.offsetWidth;
            winH = document.documentElement.offsetHeight;
        }
        if (window.innerWidth && window.innerHeight) {
            winW = window.innerWidth;
            winH = window.innerHeight;
        }
        return [winW, winH];
    };
    var P = function(b, c, d, e) {
        if (typeof c === "function") {
            e = !!d;
            d = c;
            c = {};
        } else e = !!e;
        if (!c) c = {};
        if (!c.filename) c.filename = '';
        d = d || 
        function() {};
        if (!b) throw new l('Error: no contents given');
        var f;
        b = e ? b: N.encode(b);
        var g = S.ajax({
            method: 'POST',
            url: v.tempStorage + c.filename,
            data: {
                fileContents: b,
                apikey: a,
                _cachebust: new Date().valueOf()
            },
            json: true,
            success: function(a) {
                if (a.result == "ok") {
                    f = a.data;
                    d(f.url, f.data);
                } else d(null, a);
            },
            error: function(a) {
                d(null);
            }
        });
    };
    var Q = function(a, b, c) {
        if (typeof b === "function") {
            c = b;
            b = false;
        }
        b = !!b;
        S.ajax({
            method: 'GET',
            url: a,
            data: {
                'base64encode': b
            },
            headers: {
                'X-NO-STREAM': true
            },
            success: function(a) {
                c(a);
            }
        });
    };
    var R = function(b, c) {
        if (!a) throw new l("API Key not found");
        b += '/revoke';
        var d = S.ajax({
            method: 'POST',
            url: b,
            success: function(a) {
                c(true, "success");
            },
            error: function(a) {
                c(false, a);
            },
            data: {
                "key": a
            }
        });
    };
    var S = {};
    S.addOnLoad = function(a) {
        if (window.jQuery) window.jQuery(function() {
            a();
        });
        else {
            var b = "load";
            if (window.addEventListener) window.addEventListener(b, a, false);
            else if (window.attachEvent) window.attachEvent("on" + b, a);
            else if (window.onload) {
                var c = window.onload;
                window.onload = function() {
                    c();
                    a();
                };
            } else window.onload = a;
        }
    };
    S.typeOf = function(a) {
        if (a === null) return 'null';
        else if (Object.prototype.toString.apply(a) === '[object Array]') return 'array';
        return typeof a;
    };
    S.JSON = (function() {
        if (typeof JSON == 'undefined') this.JSON = {};
        var a = {
            '\b': '\\b',
            '\t': '\\t',
            '\n': '\\n',
            '\f': '\\f',
            '\r': '\\r',
            '"': '\\"',
            '\\': '\\\\'
        };
        var b = function(b) {
            return a[b] || '\\u' + ('0000' + b.charCodeAt(0).toString(16)).slice( - 4);
        };
        var c = function(a) {
            a = a.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').replace(/(?:^|:|,)(?:\s*\[)+/g, '');
            return (/^[\],:{}\s]*$/).test(a);
        };
        var d = JSON.stringify ? 
        function(a) {
            return JSON.stringify(a);
        }: function(a) {
            if (a && a.toJSON) a = a.toJSON();
            switch (S.typeOf(a)) {
            case 'string':
                return '"' + a.replace(/[\x00-\x1f\\"]/g, b) + '"';
            case 'array':
                return '[' + a.map(d).clean() + ']';
            case 'object':
            case 'hash':
                var c = [];
                Object.each(a, 
                function(a, b) {
                    var e = d(a);
                    if (e) c.push(d(b) + ':' + e);
                });
                return '{' + c + '}';
            case 'number':
            case 'boolean':
                return '' + a;
            case 'null':
                return 'null';
            default:
                return 'null';
            }
            return null;
        };
        var e = function(a, b) {
            if (!a || S.typeOf(a) != 'string') return null;
            if (JSON.parse) return JSON.parse(a);
            else {
                if (b) if (!c(a)) throw new Error('JSON could not decode the input; security is enabled and the value is not secure.');
                return eval('(' + a + ')');
            }
        };
        return {
            validate: c,
            encode: d,
            decode: e
        };
    })();
    S.isIOS = function() {
        if (navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/iPad/i)) return true;
        else return false;
    };
    S.isAndroid = function() {
        if (navigator.userAgent.match(/Android/i)) return true;
        else return false;
    };
    S.ajax = (function() {
        var a = function(b, c) {
            var d = [];
            for (var e in b) {
                var f = b[e];
                if (c) e = c + '[' + e + ']';
                var g;
                switch (S.typeOf(f)) {
                case 'object':
                    g = a(f, e);
                    break;
                case 'array':
                    var h = {};
                    f.each(function(a, b) {
                        h[b] = a;
                    });
                    g = a(h, e);
                    break;
                default:
                    g = e + '=' + encodeURIComponent(f);
                    break;
                }
                if (f !== null) d.push(g);
            }
            return d.join('&');
        };
        var b = function(b) {
            var d = b.url || null;
            var e = b.method ? b.method.toUpperCase() : "POST";
            var f = b.success || 
            function() {};
            var g = b.error || 
            function() {};
            var h = b.async === undefined ? true: b.async;
            var i = b.data || null;
            var j = b.processData === undefined ? true: b.processData;
            var k = b.headers || {};
            if (i && j) i = a(b.data);
            if (window.XDomainRequest) return c(b);
            var l;
            if (b.xhr) l = b.xhr;
            else try {
                l = new XMLHttpRequest();
            } catch(m) {
                try {
                    l = new ActiveXObject("Msxml2.XMLHTTP");
                } catch(m) {
                    try {
                        l = new ActiveXObject("Microsoft.XMLHTTP");
                    } catch(m) {
                        throw "Your browser does not support AJAX and so cannot excecute this method";
                    }
                }
            }
            var n = function() {
                if (l.readyState == 4) if (l.status >= 200 && l.status < 300) {
                    var a = l.responseText;
                    if (b.json) a = S.JSON.decode(a);
                    f(a, l);
                } else g(l.responseText, l);
                l.onreadystatechage = function() {};
            };
            l.onreadystatechange = n;
            if (i && e == 'GET') {
                d += (d.indexOf('?') != -1 ? '&': '?') + i;
                i = null;
            }
            l.open(e, d, h);
            if (b.json) l.setRequestHeader('Accept', 'application/json');
            else l.setRequestHeader('Accept', 'text/javascript, text/html, application/xml, text/xml, */*');
            if (i && j && (e == "POST" || e == "PUT")) l.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=utf-8');
            if (k) for (var o in k) l.setRequestHeader(o, k[o]);
            l.send(i);
            return l;
        };
        var c = function(b) {
            if (!window.XDomainRequest) return null;
            var c = b.url || null;
            var d = b.method ? b.method.toUpperCase() : "POST";
            var e = b.success || 
            function() {};
            var f = b.error || 
            function() {};
            var g = b.data || {};
            if (window.location.protocol == "http:") c = c.replace("https:", "http:");
            else if (window.location.protocol == "https:") c = c.replace("http:", "https:");
            if (b.async) throw new l("Asyncronous Cross-domain requests are not supported");
            if (d != "GET" && d != "POST") {
                g._method = d;
                d = "POST";
            }
            g = g ? a(g) : null;
            if (g && d == 'GET') {
                c += (c.indexOf('?') >= 0 ? '&': '?') + g;
                g = null;
            }
            var h = new window.XDomainRequest();
            h.onload = function() {
                var a = h.responseText;
                if (b.json) a = S.JSON.decode(a);
                e(a, h);
            };
            h.onerror = function() {
                var a = h.responseText || 'error';
                f(a, h);
            };
            h.open(d, c, true);
            h.send(g);
            return h;
        };
        return b;
    })();
    S.trim = function(a) {
        return a.replace(/^\s+|\s+$/g, "");
    };
    S.normalizeMimetypes = function(a) {
        if (S.typeOf(a) == "string") return S.normalizeMimetypeString(a);
        else if (S.typeOf(a) == "array") {
            var b = [];
            for (var c = 0; c < a.length; c++) {
                partial = S.normalizeMimetypes(a[c]);
                b = b.concat(partial);
            }
            return b;
        } else return ['*/*'];
    };
    S.normalizeMimetypeString = function(a) {
        out = a.split(',');
        for (var b = 0; b < out.length; b++) out[b] = S.trim(out[b]);
        return out;
    };
    S.mimetype_extension_map = {
        '.stl': 'application/sla',
        '.hbs': 'text/html',
        '.pdf': 'application/pdf',
        '.jpg': 'image/jpeg',
        '.jpeg': 'image/jpeg',
        '.jpe': 'image/jpeg',
        '.imp': 'application/x-impressionist'
    };
    S.mimetype_bad_array = ['application/octet-stream', 'application/download', 'application/force-download', 'octet/stream', 'application/unknown'];
    S.getMimetype = function(a) {
        if (a.type) {
            var b = a.type;
            b = b.toLowerCase();
            var c = false;
            for (var d = 0; d < S.mimetype_bad_array.length; d++) c = c || b == S.mimetype_bad_array[d];
            if (!c) return a.type;
        }
        var e = a.name || a.fileName;
        var f = e.match(/\.\w*$/);
        if (f) return S.mimetype_extension_map[f[0].toLowerCase()] || '';
        else if (a.type) return a.type;
        else return '';
    };
    S.matchesMimetype = function(a, b) {
        if (!a) return b == "*/*";
        a = S.trim(a);
        b = S.trim(b);
        test_parts = a.split("/");
        against_parts = b.split("/");
        if (against_parts[0] == "*") return true;
        if (against_parts[0] != test_parts[0]) return false;
        if (against_parts[1] == "*") return true;
        return against_parts[1] == test_parts[1];
    };
    S.addOnLoad(function(a) {
        M();
    });
    var T = function() {
        var a = document.querySelectorAll('input[type="filepicker"]');
        for (var b = 0; b < a.length; b++) V(a[b]);
    };
    var U = function(a) {
        var b = a.getAttribute('type');
        if (b == 'filepicker') V(a);
        else if (b == 'filepicker-dragdrop') Z(a);
        else X(a);
    };
    var V = function(a) {
        var c;
        var d;
        var e;
        var h;
        var i;
        var j;
        var k;
        var l;
        d = document.createElement("button");
        d.innerHTML = a.getAttribute('data-fp-button-text') || a.getAttribute('data-fp-text') || "Pick File";
        d.className = a.getAttribute('data-fp-button-class') || a.getAttribute('data-fp-class') || a.className;
        a.style.display = "none";
        h = (a.getAttribute("data-fp-mimetypes") || f.ALL).split(",");
        i = {};
        l = a.getAttribute("data-fp-option-container");
        if (l) i.container = l;
        else {
            modal = (a.getAttribute("data-fp-option-modal") || "true") != "false";
            i.container = modal ? 'modal': 'window';
        }
        i.multiple = (a.getAttribute("data-fp-option-multiple") || "false") != "false";
        i.persist = (a.getAttribute("data-fp-option-persist") || "false") != "false";
        if (a.getAttribute("data-fp-option-maxsize")) i.maxSize = a.getAttribute("data-fp-option-maxsize");
        k = a.getAttribute("data-fp-option-services");
        if (k) {
            k = k.split(",");
            for (c = 0; c < k.length; c++) k[c] = g[k[c].replace(" ", "")];
            i.services = k;
        }
        loc = a.getAttribute("data-fp-option-location");
        if (loc) i.location = loc;
        j = a.getAttribute("data-fp-apikey");
        if (j) b(j);
        d.onclick = (function(a, b, e) {
            return function() {
                d.blur();
                J(b, e, 
                function(b, d) {
                    var f;
                    if (e.multiple) {
                        var g = [];
                        for (c = 0; c < b.length; c++) g.push(b[c].url);
                        a.value = g.join();
                        ae(a, b);
                    } else {
                        a.value = b;
                        ae(a, [{
                            url: b,
                            data: d
                        }]);
                    }
                });
                return false;
            };
        })(a, h, i);
        a.parentNode.insertBefore(d, a);
    };
    var W = function() {
        var a = [];
        var b = document.querySelectorAll('button[data-fp-url]');
        var c;
        for (c = 0; c < b.length; c++) a.push(b[c]);
        b = document.querySelectorAll('a[data-fp-url]');
        for (c = 0; c < b.length; c++) a.push(b[c]);
        b = document.querySelectorAll('input[type="button"][data-fp-url]');
        for (c = 0; c < b.length; c++) a.push(b[c]);
        for (c = 0; c < a.length; c++) X(a[c]);
    };
    var X = function(a) {
        a.onclick = (function(a) {
            return function() {
                var c = a.getAttribute("data-fp-mimetype");
                var d = a.getAttribute("data-fp-url");
                if (!c || !d) return true;
                var e = {};
                var f = a.getAttribute("data-fp-option-container");
                if (f) e.container = f;
                else {
                    modal = (a.getAttribute("data-fp-option-modal") || "true") != "false";
                    e.container = modal ? 'modal': 'window';
                }
                var h = a.getAttribute("data-fp-option-services");
                if (h) {
                    h = h.split(",");
                    for (j = 0; j < h.length; j++) h[j] = g[h[j].replace(" ", "")];
                    e.services = h;
                }
                var i = a.getAttribute("data-fp-option-defaultSaveasName");
                if (i) e.defaultSaveasName = i;
                apikey = a.getAttribute("data-fp-apikey");
                if (apikey) b(apikey);
                K(d, c, e);
                return false;
            };
        })(a);
    };
    var Y = function() {
        var a = document.querySelectorAll('input[type="filepicker-dragdrop"]');
        for (var b = 0; b < a.length; b++) Z(a[b]);
    };
    var Z = function(a) {
        var c;
        var d;
        var e;
        var h;
        var i;
        var j;
        var k;
        var l;
        var m;
        d = document.createElement("div");
        d.className = a.getAttribute('data-fp-class') || a.className;
        d.style.padding = "1px";
        d.style.display = "inline-block";
        a.style.display = "none";
        a.parentNode.insertBefore(d, a);
        e = document.createElement("button");
        e.innerHTML = a.getAttribute('data-fp-button-text') || "Pick File";
        e.className = a.getAttribute('data-fp-button-class') || '';
        d.appendChild(e);
        var n = document.createElement("div");
        _(n);
        var o = d.offsetWidth - e.offsetWidth - 20;
        o = Math.min(o, 220);
        if (o > 0) n.style.width = o + "px";
        n.innerHTML = a.getAttribute('data-fp-drag-text') || "Or drop files here";
        n.className = a.getAttribute('data-fp-drag-class') || '';
        d.appendChild(n);
        i = (a.getAttribute("data-fp-mimetypes") || f.ALL).split(",");
        j = {};
        m = a.getAttribute("data-fp-option-container");
        if (m) j.container = m;
        else {
            modal = (a.getAttribute("data-fp-option-modal") || "true") != "false";
            j.container = modal ? 'modal': 'window';
        }
        j.multiple = (a.getAttribute("data-fp-option-multiple") || "false") != "false";
        j.persist = (a.getAttribute("data-fp-option-persist") || "false") != "false";
        j.mimetypes = i;
        if (a.getAttribute("data-fp-option-maxsize")) j.maxSize = a.getAttribute("data-fp-option-maxsize");
        l = a.getAttribute("data-fp-option-services");
        if (l) {
            l = l.split(",");
            for (c = 0; c < l.length; c++) l[c] = g[l[c].replace(" ", "")];
            j.services = l;
        }
        k = a.getAttribute("data-fp-apikey");
        if (k) b(k);
        var p = ( !! window.FileReader || navigator.userAgent.indexOf("Safari") >= 0) && ('draggable' in n);
        if (p) ab(n, j, a);
        else n.innerHTML = "&nbsp;";
        n.onclick = e.onclick = (function(a, b, d, e) {
            return function() {
                J(d, e, 
                function(d, f) {
                    var g;
                    if (e.multiple) {
                        var h = [];
                        var i = [];
                        for (c = 0; c < d.length; c++) {
                            h.push(d[c].url);
                            i.push(d[c].data.filename);
                        }
                        a.value = h.join();
                        $(a, b, i.join(', '));
                        ae(a, d);
                    } else {
                        a.value = d;
                        $(a, b, f.filename);
                        ae(a, [{
                            url: d,
                            data: f
                        }]);
                    }
                });
                return false;
            };
        })(a, n, i, j);
    };
    var $ = function(a, b, c) {
        b.innerHTML = c;
        b.style.width = Math.max(0, b.offsetWidth - 10) + "px";
        b.style.padding = "2px 4px";
        b.style.cursor = "default";
        var d = document.createElement("span");
        d.innerHTML = "X";
        d.style.borderRadius = "8px";
        d.style.fontSize = "14px";
        d.style.cssFloat = "right";
        d.style.padding = "0 3px";
        d.style.color = "#600";
        d.style.cursor = "pointer";
        var e = function(c) {
            if (!c) c = window.event;
            c.cancelBubble = true;
            if (c.stopPropagation) c.stopPropagation();
            _(b);
            var d = ( !! window.FileReader || navigator.userAgent.indexOf("Safari") >= 0) && ('draggable' in b);
            if (!d) b.innerHTML = '&nbsp;';
            else b.innerHTML = a.getAttribute('data-fp-drag-text') || "Or drop files here";
            a.value = '';
            ae(a);
            return false;
        };
        if (d.addEventListener) d.addEventListener("click", e, false);
        else if (d.attachEvent) d.attachEvent("onclick", e);
        b.appendChild(d);
    };
    var _ = function(a) {
        a.style.border = "1px dashed #AAA";
        a.style.display = "inline-block";
        a.style.margin = "0 0 0 4px";
        a.style.borderRadius = "3px";
        a.style.backgroundColor = "#F3F3F3";
        a.style.color = "#333";
        a.style.fontSize = "14px";
        a.style.lineHeight = "22px";
        a.style.padding = "2px 4px";
        a.style.verticalAlign = "middle";
        a.style.cursor = "pointer";
        a.style.overflow = "hidden";
    };
    var ab = function(a, b, c) {
        var d = a.innerHTML;
        var e;
        al(a, {
            multiple: b.multiple,
            persist: b.persist,
            maxSize: b.maxSize,
            mimetypes: b.mimetypes,
            dragEnter: function() {
                a.innerHTML = "Drop to upload";
                a.style.backgroundColor = "#E0E0E0";
                a.style.border = "1px solid #000";
            },
            dragLeave: function() {
                a.innerHTML = d;
                a.style.backgroundColor = "#F3F3F3";
                a.style.border = "1px dashed #AAA";
            },
            error: function(b, c) {
                if (b == "TooManyFiles") a.innerHTML = c;
                else if (b == "WrongType") a.innerHTML = c;
                else if (b == "NoFilesFound") a.innerHTML = c;
                else if (b == "UploadError") a.innerHTML = "Oops! Had trouble uploading.";
            },
            begin: function(b) {
                e = ad(a);
            },
            progress: function(a) {
                if (e) e.style.width = a + "%";
            },
            done: function(b) {
                var d = [];
                var e = [];
                for (var f = 0; f < b.length; f++) {
                    var g = b[f];
                    d.push(g.url);
                    e.push(g.data.filename);
                }
                c.value = d.join();
                $(c, a, e.join(', '));
                ae(c, b);
            }
        });
    };
    var ac = function(b, c, d, e, f) {
        f = f || {};
        var g = new XMLHttpRequest();
        g.upload.addEventListener("progress", e, false);
        var h = b.name || b.fileName;
        var i = v.tempStorage + h + "?apikey=" + a + "&_cachebust=" + new Date().valueOf();
        data = new FormData();
        data.append('fileUpload', b);
        S.ajax({
            xhr: g,
            method: 'POST',
            url: i,
            json: true,
            success: c,
            error: d,
            processData: false,
            data: data
        });
    };
    var ad = function(a) {
        var b = document.createElement("div");
        var c = a.offsetHeight - 2;
        b.style.height = c + "px";
        b.style.backgroundColor = "#0E90D2";
        b.style.width = "2%";
        b.style.borderRadius = "3px";
        a.style.padding = "0";
        a.style.width = (a.offsetWidth + 6) + "px";
        a.style.border = "1px solid #AAA";
        a.style.backgroundColor = "#F3F3F3";
        a.style.boxShadow = "inset 0 1px 2px rgba(0, 0, 0, 0.1)";
        a.innerHTML = "";
        a.appendChild(b);
        return b;
    };
    var ae = function(a, b) {
        var c;
        if (document.createEvent) {
            c = document.createEvent('Event');
            c.initEvent("change", true, false);
            c.files = b;
            a.dispatchEvent(c);
        } else if (document.createEventObject) {
            c = document.createEventObject('Event');
            c.eventPhase = 2;
            c.currentTarget = c.srcElement = c.target = a;
            c.files = b;
            a.fireEvent('onchange', c);
        } else if (a.onchange) a.onchange(b);
    };
    var af = function(b, c, d, e, f) {
        var g = {};
        g.startMultipart = DIALOG_URL + "/v0/api/upload/multipart/start/";
        g.sendMultipart = DIALOG_URL + "/v0/api/upload/multipart/upload/";
        g.finishMultipart = DIALOG_URL + "/v0/api/upload/multipart/end/";
        f = f || {};
        f.persist = !!f.persist;
        var h = 0;
        var i = k;
        var l = Math.ceil(b.size / i);
        var m = {
            'name': b.name || b.fileName,
            'size': b.size
        };
        S.ajax({
            method: "POST",
            url: g.startMultipart,
            json: true,
            data: {
                "apikey": a,
                "persist": f.persist,
                "name": b.name || b.fileName,
                "size": b.size
            },
            success: function(f) {
                if (f.result != "ok") {
                    d(f);
                    return;
                }
                var k = f.data.id;
                if (!k) if (window.console && window.console.error) window.console.error("Couldn't find multipart id");
                var n = function(b) {
                    h++;
                    e({
                        loaded: h,
                        total: l,
                        lengthComputable: true
                    });
                    if (h === l) S.ajax({
                        method: "POST",
                        url: g.finishMultipart,
                        data: {
                            'id': k,
                            'total': l,
                            'apikey': a
                        },
                        success: c,
                        json: true
                    });
                };
                var o = {};
                var p = function(a, b) {
                    return function(c) {
                        if (!o[a]) o[a] = 0;
                        o[a]++;
                        if (o[a] > j) d.call(this);
                        else q(a, b);
                    };
                };
                var q = function(b, c) {
                    var d = g.sendMultipart + "?id=" + k + "&index=" + b + "&apikey=" + a;
                    m = new FormData();
                    m.append('fileUpload', c);
                    S.ajax({
                        method: 'POST',
                        url: d,
                        json: true,
                        success: n,
                        error: p(b, c),
                        processData: false,
                        data: m
                    });
                };
                var r = function(a, b) {
                    q(a, b);
                };
                var s;
                if (b.slice) {
                    var t = /(mozilla)(?:.*? rv:([\w.]+))?/;
                    var u = t.exec(navigator.userAgent);
                    if (u && u[2] && parseInt(u[2], 10) < 13) for (s = 0; s < l; s++) r(s, b.slice(s * i, i));
                    else for (s = 0; s < l; s++) r(s, b.slice(s * i, (s + 1) * i));
                } else if (b.mozSlice) for (s = 0; s < l; s++) r(s, b.mozSlice(s * i, (s + 1) * i));
                else if (b.webkitSlice) for (s = 0; s < l; s++) r(s, b.webkitSlice(s * i, (s + 1) * i));
                else {
                    l = 1;
                    r(0, b);
                }
            }
        });
    };
    var ag = function(a, b, c, d, e, f) {
        e = e || j;
        b = b || 
        function() {};
        c = c || 
        function() {};
        d = d || 
        function() {};
        if (!a.value) throw new l("File input is empty");
        var g = !!window.FormData && !!window.XMLHttpRequest;
        if (g) ah(a, b, c, d, e, f);
        else aj(a, b, c, f);
    };
    var ah = function(a, b, c, d, e, f) {
        if (a.files.length == 1) ai(a.files[0], b, c, d, e);
        else {
            var g = 0;
            var h = a.files.length;
            var i = [];
            var j = false;
            var k = {};
            var l = function() {
                var a = 0;
                for (index in k) a += (k[index] || 0);
                d(a / h);
            };
            var m = function(a) {
                return function(b) {
                    k[a] = b;
                    l();
                };
            };
            var n = function(a) {
                if (j) return;
                i.push(a);
                g++;
                if (g == h) {
                    j = true;
                    b(i);
                }
            };
            var o = function(a) {
                j = true;
                c(a);
            };
            for (var p = 0; p < a.files.length; p++) ai(a.files[p], n, o, m(p), e, f);
        }
    };
    var ai = function(a, b, c, d, e, f) {
        var g = function(a) {
            if (a.lengthComputable) d(Math.round((a.loaded * 95) / a.total));
        };
        var h = 0;
        var i = function(b) {
            h++;
            if (h > e) c(b);
            else ac(a, j, i, g, f);
        };
        var j = function(a) {
            if (a.result == 'error') {
                i(a.error.msg);
                return;
            }
            d(100);
            b(a.data[0]);
        };
        ac(a, j, i, g, f);
    };
    var aj = function(b, c, d, e) {
        e = e || {};
        y();
        var f = "upload_iframe";
        var g;
        g = document.createElement("iframe");
        g.id = f;
        g.name = f;
        g.style.display = 'none';
        document.body.appendChild(g);
        C.attachHandler('upload', ak(c, d));
        var h = document.createElement("form");
        h.method = "POST";
        h.action = v.tempStorage + "?format=iframe&apikey=" + a + "&_cachebust=" + new Date().valueOf();
        h.encoding = h.enctype = "multipart/form-data";
        h.target = f;
        document.body.appendChild(h);
        var i = b.parentNode;
        var j = b.nextSibling;
        var k = b.name;
        b.name = "fileUpload";
        h.appendChild(b);
        window.setTimeout(function() {
            h.submit();
            i.insertBefore(b, j);
            b.name = k;
            b.focus();
        },
        1);
    };
    var ak = function(a, b) {
        var c = function(c) {
            if (c.type !== "Upload") return;
            var d = c.payload;
            if (d.result == 'ok') {
                if (a && typeof a === "function") a(d.data);
            } else if (b && typeof b === "function") b(d.msg);
            C.detachHandler("Upload");
        };
        return c;
    };
    var al = function(a, b) {
        if (!a) throw new l("No DOM element found to create drop pane");
        if (a.jquery) {
            if (a.length === 0) throw new l("No DOM element found to create drop pane");
            a = a[0];
        }
        var c = (navigator.vendor && navigator.vendor.indexOf('Apple') >= 0);
        var d = ( !! window.FileReader || c) && ('draggable' in document.createElement('span'));
        if (!d) {
            if (window.console && window.console.error) window.console.error("Your browser doesn't support drag-drop functionality");
            return false;
        }
        b = b || {};
        var e = b.dragEnter || 
        function() {};
        var f = b.dragLeave || 
        function() {};
        var g = b.begin || 
        function() {};
        var h = b.done || 
        function() {};
        var i = b.error || 
        function() {};
        var j = b.progress || 
        function() {};
        var k = b.mimetypes || '*/*';
        if (S.typeOf(k) == 'string') k = k.split(',');
        var m = {
            persist: !!b.persist
        };
        a.addEventListener("dragenter", 
        function(a) {
            e();
            a.stopPropagation();
            a.preventDefault();
            return false;
        },
        false);
        a.addEventListener("dragleave", 
        function(a) {
            f();
            a.stopPropagation();
            a.preventDefault();
            return false;
        },
        false);
        a.addEventListener("dragover", 
        function(a) {
            a.preventDefault();
            return false;
        },
        false);
        a.addEventListener("drop", 
        function(a) {
            a.stopPropagation();
            a.preventDefault();
            var b = a.dataTransfer.files;
            if (n(b)) {
                g(b);
                am(b, h, i, j, m);
            }
        });
        var n = function(a) {
            if (a.length > 0) {
                if (a.length > 1 && !b.multiple) {
                    i("TooManyFiles", "Only one file at a time");
                    return false;
                }
                var c;
                var d;
                for (var e = 0; e < a.length; e++) {
                    c = false;
                    d = a[e];
                    for (var f = 0; f < k.length; f++) {
                        var g = S.getMimetype(d);
                        c = c || S.matchesMimetype(g, k[f]);
                    }
                    if (!c) {
                        i("WrongType", (d.name || d.fileName) + " isn't the right type of file");
                        break;
                    }
                }
                if (c) return true;
            } else i("NoFilesFound", "No files uploaded");
            return false;
        };
        return true;
    };
    var am = function(a, b, c, d, e) {
        var f = {};
        var g = 0;
        var h = [];
        var i = function() {
            var b = 0;
            var c;
            for (c in f) b += f[c];
            percentage = b / a.length;
            d(percentage);
        };
        var j = function(a) {
            return function(b) {
                f[a] = b;
                i();
            };
        };
        var k = function(c) {
            return function(d) {
                d.data.filename = a[c].name || a[c].fileName || d.data.filename;
                d.data.size = a[c].size || d.data.size;
                d.data.type = a[c].type || d.data.type;
                h = h || [];
                h.push(d);
                g++;
                if (g >= a.length) b(h);
            };
        };
        for (var l = 0; l < a.length; l++) an(a[l], k(l), c, j(l), e);
    };
    var an = function(a, b, c, d, e) {
        var f = function(a) {
            if (a.lengthComputable) d(Math.round((a.loaded * 95) / a.total));
        };
        var g = a.name || a.fileName;
        var h = 0;
        var i = function(b) {
            h++;
            if (h > j) c('UploadError');
            else ac(a, l, i, f, e);
        };
        var l = function(a) {
            if (a.result == 'ok') {
                d(100);
                var c = a.data;
                if (!m(c) || c.length === 0) i("No files found");
                b(a.data[0]);
            } else i(a.error.msg);
        };
        var n = !!(a.mozSlice || a.webkitSlice || a.slice);
        if (a.size > k && n) af(a, l, i, f, e);
        else ac(a, l, i, f, e);
    };
    var ao = function(a, b, c) {
        if (a[b] === undefined) return c;
        return a[b];
    };
    if (document.querySelectorAll) {
        var ap = function() {
            T();
            W();
            Y();
        };
        S.addOnLoad(ap);
    }
    return {
        closeModal: H,
        uploadFile: ag,
        makeDropPane: al,
        getFile: J,
        saveAs: K,
        MIMETYPES: f,
        SERVICES: g,
        setKey: b,
        getUrlFromData: P,
        revokeFile: R,
        getContents: Q,
        constructOpenWidget: V,
        constructSaveWidget: X,
        constructDragWidget: Z,
        constructWidget: U,
        _oci: y
    };
})();