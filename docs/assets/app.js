//#region \0rolldown/runtime.js
var e = Object.create, t = Object.defineProperty, n = Object.getOwnPropertyDescriptor, r = Object.getOwnPropertyNames, i = Object.getPrototypeOf, a = Object.prototype.hasOwnProperty, o = (e, t) => () => (t || (e((t = { exports: {} }).exports, t), e = null), t.exports), s = (e, i, o, s) => {
	if (i && typeof i == "object" || typeof i == "function") for (var c = r(i), l = 0, u = c.length, d; l < u; l++) d = c[l], !a.call(e, d) && d !== o && t(e, d, {
		get: ((e) => i[e]).bind(null, d),
		enumerable: !(s = n(i, d)) || s.enumerable
	});
	return e;
}, c = (n, r, a) => (a = n == null ? {} : e(i(n)), s(r || !n || !n.__esModule ? t(a, "default", {
	value: n,
	enumerable: !0
}) : a, n)), l = /* @__PURE__ */ o(((e) => {
	var t = Symbol.for("react.transitional.element"), n = Symbol.for("react.portal"), r = Symbol.for("react.fragment"), i = Symbol.for("react.strict_mode"), a = Symbol.for("react.profiler"), o = Symbol.for("react.consumer"), s = Symbol.for("react.context"), c = Symbol.for("react.forward_ref"), l = Symbol.for("react.suspense"), u = Symbol.for("react.memo"), d = Symbol.for("react.lazy"), f = Symbol.for("react.activity"), p = Symbol.iterator;
	function m(e) {
		return typeof e != "object" || !e ? null : (e = p && e[p] || e["@@iterator"], typeof e == "function" ? e : null);
	}
	var h = {
		isMounted: function() {
			return !1;
		},
		enqueueForceUpdate: function() {},
		enqueueReplaceState: function() {},
		enqueueSetState: function() {}
	}, g = Object.assign, _ = {};
	function v(e, t, n) {
		this.props = e, this.context = t, this.refs = _, this.updater = n || h;
	}
	v.prototype.isReactComponent = {}, v.prototype.setState = function(e, t) {
		if (typeof e != "object" && typeof e != "function" && e != null) throw Error("takes an object of state variables to update or a function which returns an object of state variables.");
		this.updater.enqueueSetState(this, e, t, "setState");
	}, v.prototype.forceUpdate = function(e) {
		this.updater.enqueueForceUpdate(this, e, "forceUpdate");
	};
	function y() {}
	y.prototype = v.prototype;
	function b(e, t, n) {
		this.props = e, this.context = t, this.refs = _, this.updater = n || h;
	}
	var x = b.prototype = new y();
	x.constructor = b, g(x, v.prototype), x.isPureReactComponent = !0;
	var S = Array.isArray;
	function C() {}
	var w = {
		H: null,
		A: null,
		T: null,
		S: null
	}, ee = Object.prototype.hasOwnProperty;
	function te(e, n, r) {
		var i = r.ref;
		return {
			$$typeof: t,
			type: e,
			key: n,
			ref: i === void 0 ? null : i,
			props: r
		};
	}
	function ne(e, t) {
		return te(e.type, t, e.props);
	}
	function re(e) {
		return typeof e == "object" && !!e && e.$$typeof === t;
	}
	function ie(e) {
		var t = {
			"=": "=0",
			":": "=2"
		};
		return "$" + e.replace(/[=:]/g, function(e) {
			return t[e];
		});
	}
	var ae = /\/+/g;
	function oe(e, t) {
		return typeof e == "object" && e && e.key != null ? ie("" + e.key) : t.toString(36);
	}
	function se(e) {
		switch (e.status) {
			case "fulfilled": return e.value;
			case "rejected": throw e.reason;
			default: switch (typeof e.status == "string" ? e.then(C, C) : (e.status = "pending", e.then(function(t) {
				e.status === "pending" && (e.status = "fulfilled", e.value = t);
			}, function(t) {
				e.status === "pending" && (e.status = "rejected", e.reason = t);
			})), e.status) {
				case "fulfilled": return e.value;
				case "rejected": throw e.reason;
			}
		}
		throw e;
	}
	function ce(e, r, i, a, o) {
		var s = typeof e;
		(s === "undefined" || s === "boolean") && (e = null);
		var c = !1;
		if (e === null) c = !0;
		else switch (s) {
			case "bigint":
			case "string":
			case "number":
				c = !0;
				break;
			case "object": switch (e.$$typeof) {
				case t:
				case n:
					c = !0;
					break;
				case d: return c = e._init, ce(c(e._payload), r, i, a, o);
			}
		}
		if (c) return o = o(e), c = a === "" ? "." + oe(e, 0) : a, S(o) ? (i = "", c != null && (i = c.replace(ae, "$&/") + "/"), ce(o, r, i, "", function(e) {
			return e;
		})) : o != null && (re(o) && (o = ne(o, i + (o.key == null || e && e.key === o.key ? "" : ("" + o.key).replace(ae, "$&/") + "/") + c)), r.push(o)), 1;
		c = 0;
		var l = a === "" ? "." : a + ":";
		if (S(e)) for (var u = 0; u < e.length; u++) a = e[u], s = l + oe(a, u), c += ce(a, r, i, s, o);
		else if (u = m(e), typeof u == "function") for (e = u.call(e), u = 0; !(a = e.next()).done;) a = a.value, s = l + oe(a, u++), c += ce(a, r, i, s, o);
		else if (s === "object") {
			if (typeof e.then == "function") return ce(se(e), r, i, a, o);
			throw r = String(e), Error("Objects are not valid as a React child (found: " + (r === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : r) + "). If you meant to render a collection of children, use an array instead.");
		}
		return c;
	}
	function le(e, t, n) {
		if (e == null) return e;
		var r = [], i = 0;
		return ce(e, r, "", "", function(e) {
			return t.call(n, e, i++);
		}), r;
	}
	function ue(e) {
		if (e._status === -1) {
			var t = e._result;
			t = t(), t.then(function(t) {
				(e._status === 0 || e._status === -1) && (e._status = 1, e._result = t);
			}, function(t) {
				(e._status === 0 || e._status === -1) && (e._status = 2, e._result = t);
			}), e._status === -1 && (e._status = 0, e._result = t);
		}
		if (e._status === 1) return e._result.default;
		throw e._result;
	}
	var T = typeof reportError == "function" ? reportError : function(e) {
		if (typeof window == "object" && typeof window.ErrorEvent == "function") {
			var t = new window.ErrorEvent("error", {
				bubbles: !0,
				cancelable: !0,
				message: typeof e == "object" && e && typeof e.message == "string" ? String(e.message) : String(e),
				error: e
			});
			if (!window.dispatchEvent(t)) return;
		} else if (typeof process == "object" && typeof process.emit == "function") {
			process.emit("uncaughtException", e);
			return;
		}
		console.error(e);
	}, E = {
		map: le,
		forEach: function(e, t, n) {
			le(e, function() {
				t.apply(this, arguments);
			}, n);
		},
		count: function(e) {
			var t = 0;
			return le(e, function() {
				t++;
			}), t;
		},
		toArray: function(e) {
			return le(e, function(e) {
				return e;
			}) || [];
		},
		only: function(e) {
			if (!re(e)) throw Error("React.Children.only expected to receive a single React element child.");
			return e;
		}
	};
	e.Activity = f, e.Children = E, e.Component = v, e.Fragment = r, e.Profiler = a, e.PureComponent = b, e.StrictMode = i, e.Suspense = l, e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = w, e.__COMPILER_RUNTIME = {
		__proto__: null,
		c: function(e) {
			return w.H.useMemoCache(e);
		}
	}, e.cache = function(e) {
		return function() {
			return e.apply(null, arguments);
		};
	}, e.cacheSignal = function() {
		return null;
	}, e.cloneElement = function(e, t, n) {
		if (e == null) throw Error("The argument must be a React element, but you passed " + e + ".");
		var r = g({}, e.props), i = e.key;
		if (t != null) for (a in t.key !== void 0 && (i = "" + t.key), t) !ee.call(t, a) || a === "key" || a === "__self" || a === "__source" || a === "ref" && t.ref === void 0 || (r[a] = t[a]);
		var a = arguments.length - 2;
		if (a === 1) r.children = n;
		else if (1 < a) {
			for (var o = Array(a), s = 0; s < a; s++) o[s] = arguments[s + 2];
			r.children = o;
		}
		return te(e.type, i, r);
	}, e.createContext = function(e) {
		return e = {
			$$typeof: s,
			_currentValue: e,
			_currentValue2: e,
			_threadCount: 0,
			Provider: null,
			Consumer: null
		}, e.Provider = e, e.Consumer = {
			$$typeof: o,
			_context: e
		}, e;
	}, e.createElement = function(e, t, n) {
		var r, i = {}, a = null;
		if (t != null) for (r in t.key !== void 0 && (a = "" + t.key), t) ee.call(t, r) && r !== "key" && r !== "__self" && r !== "__source" && (i[r] = t[r]);
		var o = arguments.length - 2;
		if (o === 1) i.children = n;
		else if (1 < o) {
			for (var s = Array(o), c = 0; c < o; c++) s[c] = arguments[c + 2];
			i.children = s;
		}
		if (e && e.defaultProps) for (r in o = e.defaultProps, o) i[r] === void 0 && (i[r] = o[r]);
		return te(e, a, i);
	}, e.createRef = function() {
		return { current: null };
	}, e.forwardRef = function(e) {
		return {
			$$typeof: c,
			render: e
		};
	}, e.isValidElement = re, e.lazy = function(e) {
		return {
			$$typeof: d,
			_payload: {
				_status: -1,
				_result: e
			},
			_init: ue
		};
	}, e.memo = function(e, t) {
		return {
			$$typeof: u,
			type: e,
			compare: t === void 0 ? null : t
		};
	}, e.startTransition = function(e) {
		var t = w.T, n = {};
		w.T = n;
		try {
			var r = e(), i = w.S;
			i !== null && i(n, r), typeof r == "object" && r && typeof r.then == "function" && r.then(C, T);
		} catch (e) {
			T(e);
		} finally {
			t !== null && n.types !== null && (t.types = n.types), w.T = t;
		}
	}, e.unstable_useCacheRefresh = function() {
		return w.H.useCacheRefresh();
	}, e.use = function(e) {
		return w.H.use(e);
	}, e.useActionState = function(e, t, n) {
		return w.H.useActionState(e, t, n);
	}, e.useCallback = function(e, t) {
		return w.H.useCallback(e, t);
	}, e.useContext = function(e) {
		return w.H.useContext(e);
	}, e.useDebugValue = function() {}, e.useDeferredValue = function(e, t) {
		return w.H.useDeferredValue(e, t);
	}, e.useEffect = function(e, t) {
		return w.H.useEffect(e, t);
	}, e.useEffectEvent = function(e) {
		return w.H.useEffectEvent(e);
	}, e.useId = function() {
		return w.H.useId();
	}, e.useImperativeHandle = function(e, t, n) {
		return w.H.useImperativeHandle(e, t, n);
	}, e.useInsertionEffect = function(e, t) {
		return w.H.useInsertionEffect(e, t);
	}, e.useLayoutEffect = function(e, t) {
		return w.H.useLayoutEffect(e, t);
	}, e.useMemo = function(e, t) {
		return w.H.useMemo(e, t);
	}, e.useOptimistic = function(e, t) {
		return w.H.useOptimistic(e, t);
	}, e.useReducer = function(e, t, n) {
		return w.H.useReducer(e, t, n);
	}, e.useRef = function(e) {
		return w.H.useRef(e);
	}, e.useState = function(e) {
		return w.H.useState(e);
	}, e.useSyncExternalStore = function(e, t, n) {
		return w.H.useSyncExternalStore(e, t, n);
	}, e.useTransition = function() {
		return w.H.useTransition();
	}, e.version = "19.2.6";
})), u = /* @__PURE__ */ o(((e, t) => {
	t.exports = l();
})), d = /* @__PURE__ */ o(((e) => {
	function t(e, t) {
		var n = e.length;
		e.push(t);
		a: for (; 0 < n;) {
			var r = n - 1 >>> 1, a = e[r];
			if (0 < i(a, t)) e[r] = t, e[n] = a, n = r;
			else break a;
		}
	}
	function n(e) {
		return e.length === 0 ? null : e[0];
	}
	function r(e) {
		if (e.length === 0) return null;
		var t = e[0], n = e.pop();
		if (n !== t) {
			e[0] = n;
			a: for (var r = 0, a = e.length, o = a >>> 1; r < o;) {
				var s = 2 * (r + 1) - 1, c = e[s], l = s + 1, u = e[l];
				if (0 > i(c, n)) l < a && 0 > i(u, c) ? (e[r] = u, e[l] = n, r = l) : (e[r] = c, e[s] = n, r = s);
				else if (l < a && 0 > i(u, n)) e[r] = u, e[l] = n, r = l;
				else break a;
			}
		}
		return t;
	}
	function i(e, t) {
		var n = e.sortIndex - t.sortIndex;
		return n === 0 ? e.id - t.id : n;
	}
	if (e.unstable_now = void 0, typeof performance == "object" && typeof performance.now == "function") {
		var a = performance;
		e.unstable_now = function() {
			return a.now();
		};
	} else {
		var o = Date, s = o.now();
		e.unstable_now = function() {
			return o.now() - s;
		};
	}
	var c = [], l = [], u = 1, d = null, f = 3, p = !1, m = !1, h = !1, g = !1, _ = typeof setTimeout == "function" ? setTimeout : null, v = typeof clearTimeout == "function" ? clearTimeout : null, y = typeof setImmediate < "u" ? setImmediate : null;
	function b(e) {
		for (var i = n(l); i !== null;) {
			if (i.callback === null) r(l);
			else if (i.startTime <= e) r(l), i.sortIndex = i.expirationTime, t(c, i);
			else break;
			i = n(l);
		}
	}
	function x(e) {
		if (h = !1, b(e), !m) if (n(c) !== null) m = !0, S || (S = !0, re());
		else {
			var t = n(l);
			t !== null && oe(x, t.startTime - e);
		}
	}
	var S = !1, C = -1, w = 5, ee = -1;
	function te() {
		return g ? !0 : !(e.unstable_now() - ee < w);
	}
	function ne() {
		if (g = !1, S) {
			var t = e.unstable_now();
			ee = t;
			var i = !0;
			try {
				a: {
					m = !1, h && (h = !1, v(C), C = -1), p = !0;
					var a = f;
					try {
						b: {
							for (b(t), d = n(c); d !== null && !(d.expirationTime > t && te());) {
								var o = d.callback;
								if (typeof o == "function") {
									d.callback = null, f = d.priorityLevel;
									var s = o(d.expirationTime <= t);
									if (t = e.unstable_now(), typeof s == "function") {
										d.callback = s, b(t), i = !0;
										break b;
									}
									d === n(c) && r(c), b(t);
								} else r(c);
								d = n(c);
							}
							if (d !== null) i = !0;
							else {
								var u = n(l);
								u !== null && oe(x, u.startTime - t), i = !1;
							}
						}
						break a;
					} finally {
						d = null, f = a, p = !1;
					}
					i = void 0;
				}
			} finally {
				i ? re() : S = !1;
			}
		}
	}
	var re;
	if (typeof y == "function") re = function() {
		y(ne);
	};
	else if (typeof MessageChannel < "u") {
		var ie = new MessageChannel(), ae = ie.port2;
		ie.port1.onmessage = ne, re = function() {
			ae.postMessage(null);
		};
	} else re = function() {
		_(ne, 0);
	};
	function oe(t, n) {
		C = _(function() {
			t(e.unstable_now());
		}, n);
	}
	e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(e) {
		e.callback = null;
	}, e.unstable_forceFrameRate = function(e) {
		0 > e || 125 < e ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : w = 0 < e ? Math.floor(1e3 / e) : 5;
	}, e.unstable_getCurrentPriorityLevel = function() {
		return f;
	}, e.unstable_next = function(e) {
		switch (f) {
			case 1:
			case 2:
			case 3:
				var t = 3;
				break;
			default: t = f;
		}
		var n = f;
		f = t;
		try {
			return e();
		} finally {
			f = n;
		}
	}, e.unstable_requestPaint = function() {
		g = !0;
	}, e.unstable_runWithPriority = function(e, t) {
		switch (e) {
			case 1:
			case 2:
			case 3:
			case 4:
			case 5: break;
			default: e = 3;
		}
		var n = f;
		f = e;
		try {
			return t();
		} finally {
			f = n;
		}
	}, e.unstable_scheduleCallback = function(r, i, a) {
		var o = e.unstable_now();
		switch (typeof a == "object" && a ? (a = a.delay, a = typeof a == "number" && 0 < a ? o + a : o) : a = o, r) {
			case 1:
				var s = -1;
				break;
			case 2:
				s = 250;
				break;
			case 5:
				s = 1073741823;
				break;
			case 4:
				s = 1e4;
				break;
			default: s = 5e3;
		}
		return s = a + s, r = {
			id: u++,
			callback: i,
			priorityLevel: r,
			startTime: a,
			expirationTime: s,
			sortIndex: -1
		}, a > o ? (r.sortIndex = a, t(l, r), n(c) === null && r === n(l) && (h ? (v(C), C = -1) : h = !0, oe(x, a - o))) : (r.sortIndex = s, t(c, r), m || p || (m = !0, S || (S = !0, re()))), r;
	}, e.unstable_shouldYield = te, e.unstable_wrapCallback = function(e) {
		var t = f;
		return function() {
			var n = f;
			f = t;
			try {
				return e.apply(this, arguments);
			} finally {
				f = n;
			}
		};
	};
})), f = /* @__PURE__ */ o(((e, t) => {
	t.exports = d();
})), p = /* @__PURE__ */ o(((e) => {
	var t = u();
	function n(e) {
		var t = "https://react.dev/errors/" + e;
		if (1 < arguments.length) {
			t += "?args[]=" + encodeURIComponent(arguments[1]);
			for (var n = 2; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
		}
		return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
	}
	function r() {}
	var i = {
		d: {
			f: r,
			r: function() {
				throw Error(n(522));
			},
			D: r,
			C: r,
			L: r,
			m: r,
			X: r,
			S: r,
			M: r
		},
		p: 0,
		findDOMNode: null
	}, a = Symbol.for("react.portal");
	function o(e, t, n) {
		var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
		return {
			$$typeof: a,
			key: r == null ? null : "" + r,
			children: e,
			containerInfo: t,
			implementation: n
		};
	}
	var s = t.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE;
	function c(e, t) {
		if (e === "font") return "";
		if (typeof t == "string") return t === "use-credentials" ? t : "";
	}
	e.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = i, e.createPortal = function(e, t) {
		var r = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
		if (!t || t.nodeType !== 1 && t.nodeType !== 9 && t.nodeType !== 11) throw Error(n(299));
		return o(e, t, null, r);
	}, e.flushSync = function(e) {
		var t = s.T, n = i.p;
		try {
			if (s.T = null, i.p = 2, e) return e();
		} finally {
			s.T = t, i.p = n, i.d.f();
		}
	}, e.preconnect = function(e, t) {
		typeof e == "string" && (t ? (t = t.crossOrigin, t = typeof t == "string" ? t === "use-credentials" ? t : "" : void 0) : t = null, i.d.C(e, t));
	}, e.prefetchDNS = function(e) {
		typeof e == "string" && i.d.D(e);
	}, e.preinit = function(e, t) {
		if (typeof e == "string" && t && typeof t.as == "string") {
			var n = t.as, r = c(n, t.crossOrigin), a = typeof t.integrity == "string" ? t.integrity : void 0, o = typeof t.fetchPriority == "string" ? t.fetchPriority : void 0;
			n === "style" ? i.d.S(e, typeof t.precedence == "string" ? t.precedence : void 0, {
				crossOrigin: r,
				integrity: a,
				fetchPriority: o
			}) : n === "script" && i.d.X(e, {
				crossOrigin: r,
				integrity: a,
				fetchPriority: o,
				nonce: typeof t.nonce == "string" ? t.nonce : void 0
			});
		}
	}, e.preinitModule = function(e, t) {
		if (typeof e == "string") if (typeof t == "object" && t) {
			if (t.as == null || t.as === "script") {
				var n = c(t.as, t.crossOrigin);
				i.d.M(e, {
					crossOrigin: n,
					integrity: typeof t.integrity == "string" ? t.integrity : void 0,
					nonce: typeof t.nonce == "string" ? t.nonce : void 0
				});
			}
		} else t ?? i.d.M(e);
	}, e.preload = function(e, t) {
		if (typeof e == "string" && typeof t == "object" && t && typeof t.as == "string") {
			var n = t.as, r = c(n, t.crossOrigin);
			i.d.L(e, n, {
				crossOrigin: r,
				integrity: typeof t.integrity == "string" ? t.integrity : void 0,
				nonce: typeof t.nonce == "string" ? t.nonce : void 0,
				type: typeof t.type == "string" ? t.type : void 0,
				fetchPriority: typeof t.fetchPriority == "string" ? t.fetchPriority : void 0,
				referrerPolicy: typeof t.referrerPolicy == "string" ? t.referrerPolicy : void 0,
				imageSrcSet: typeof t.imageSrcSet == "string" ? t.imageSrcSet : void 0,
				imageSizes: typeof t.imageSizes == "string" ? t.imageSizes : void 0,
				media: typeof t.media == "string" ? t.media : void 0
			});
		}
	}, e.preloadModule = function(e, t) {
		if (typeof e == "string") if (t) {
			var n = c(t.as, t.crossOrigin);
			i.d.m(e, {
				as: typeof t.as == "string" && t.as !== "script" ? t.as : void 0,
				crossOrigin: n,
				integrity: typeof t.integrity == "string" ? t.integrity : void 0
			});
		} else i.d.m(e);
	}, e.requestFormReset = function(e) {
		i.d.r(e);
	}, e.unstable_batchedUpdates = function(e, t) {
		return e(t);
	}, e.useFormState = function(e, t, n) {
		return s.H.useFormState(e, t, n);
	}, e.useFormStatus = function() {
		return s.H.useHostTransitionStatus();
	}, e.version = "19.2.6";
})), m = /* @__PURE__ */ o(((e, t) => {
	function n() {
		if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) try {
			__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
		} catch (e) {
			console.error(e);
		}
	}
	n(), t.exports = p();
})), h = /* @__PURE__ */ o(((e) => {
	var t = f(), n = u(), r = m();
	function i(e) {
		var t = "https://react.dev/errors/" + e;
		if (1 < arguments.length) {
			t += "?args[]=" + encodeURIComponent(arguments[1]);
			for (var n = 2; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
		}
		return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
	}
	function a(e) {
		return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
	}
	function o(e) {
		var t = e, n = e;
		if (e.alternate) for (; t.return;) t = t.return;
		else {
			e = t;
			do
				t = e, t.flags & 4098 && (n = t.return), e = t.return;
			while (e);
		}
		return t.tag === 3 ? n : null;
	}
	function s(e) {
		if (e.tag === 13) {
			var t = e.memoizedState;
			if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
		}
		return null;
	}
	function c(e) {
		if (e.tag === 31) {
			var t = e.memoizedState;
			if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
		}
		return null;
	}
	function l(e) {
		if (o(e) !== e) throw Error(i(188));
	}
	function d(e) {
		var t = e.alternate;
		if (!t) {
			if (t = o(e), t === null) throw Error(i(188));
			return t === e ? e : null;
		}
		for (var n = e, r = t;;) {
			var a = n.return;
			if (a === null) break;
			var s = a.alternate;
			if (s === null) {
				if (r = a.return, r !== null) {
					n = r;
					continue;
				}
				break;
			}
			if (a.child === s.child) {
				for (s = a.child; s;) {
					if (s === n) return l(a), e;
					if (s === r) return l(a), t;
					s = s.sibling;
				}
				throw Error(i(188));
			}
			if (n.return !== r.return) n = a, r = s;
			else {
				for (var c = !1, u = a.child; u;) {
					if (u === n) {
						c = !0, n = a, r = s;
						break;
					}
					if (u === r) {
						c = !0, r = a, n = s;
						break;
					}
					u = u.sibling;
				}
				if (!c) {
					for (u = s.child; u;) {
						if (u === n) {
							c = !0, n = s, r = a;
							break;
						}
						if (u === r) {
							c = !0, r = s, n = a;
							break;
						}
						u = u.sibling;
					}
					if (!c) throw Error(i(189));
				}
			}
			if (n.alternate !== r) throw Error(i(190));
		}
		if (n.tag !== 3) throw Error(i(188));
		return n.stateNode.current === n ? e : t;
	}
	function p(e) {
		var t = e.tag;
		if (t === 5 || t === 26 || t === 27 || t === 6) return e;
		for (e = e.child; e !== null;) {
			if (t = p(e), t !== null) return t;
			e = e.sibling;
		}
		return null;
	}
	var h = Object.assign, g = Symbol.for("react.element"), _ = Symbol.for("react.transitional.element"), v = Symbol.for("react.portal"), y = Symbol.for("react.fragment"), b = Symbol.for("react.strict_mode"), x = Symbol.for("react.profiler"), S = Symbol.for("react.consumer"), C = Symbol.for("react.context"), w = Symbol.for("react.forward_ref"), ee = Symbol.for("react.suspense"), te = Symbol.for("react.suspense_list"), ne = Symbol.for("react.memo"), re = Symbol.for("react.lazy"), ie = Symbol.for("react.activity"), ae = Symbol.for("react.memo_cache_sentinel"), oe = Symbol.iterator;
	function se(e) {
		return typeof e != "object" || !e ? null : (e = oe && e[oe] || e["@@iterator"], typeof e == "function" ? e : null);
	}
	var ce = Symbol.for("react.client.reference");
	function le(e) {
		if (e == null) return null;
		if (typeof e == "function") return e.$$typeof === ce ? null : e.displayName || e.name || null;
		if (typeof e == "string") return e;
		switch (e) {
			case y: return "Fragment";
			case x: return "Profiler";
			case b: return "StrictMode";
			case ee: return "Suspense";
			case te: return "SuspenseList";
			case ie: return "Activity";
		}
		if (typeof e == "object") switch (e.$$typeof) {
			case v: return "Portal";
			case C: return e.displayName || "Context";
			case S: return (e._context.displayName || "Context") + ".Consumer";
			case w:
				var t = e.render;
				return e = e.displayName, e ||= (e = t.displayName || t.name || "", e === "" ? "ForwardRef" : "ForwardRef(" + e + ")"), e;
			case ne: return t = e.displayName || null, t === null ? le(e.type) || "Memo" : t;
			case re:
				t = e._payload, e = e._init;
				try {
					return le(e(t));
				} catch {}
		}
		return null;
	}
	var ue = Array.isArray, T = n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, E = r.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, de = {
		pending: !1,
		data: null,
		method: null,
		action: null
	}, fe = [], pe = -1;
	function me(e) {
		return { current: e };
	}
	function D(e) {
		0 > pe || (e.current = fe[pe], fe[pe] = null, pe--);
	}
	function O(e, t) {
		pe++, fe[pe] = e.current, e.current = t;
	}
	var he = me(null), k = me(null), A = me(null), ge = me(null);
	function _e(e, t) {
		switch (O(A, t), O(k, e), O(he, null), t.nodeType) {
			case 9:
			case 11:
				e = (e = t.documentElement) && (e = e.namespaceURI) ? Vd(e) : 0;
				break;
			default: if (e = t.tagName, t = t.namespaceURI) t = Vd(t), e = Hd(t, e);
			else switch (e) {
				case "svg":
					e = 1;
					break;
				case "math":
					e = 2;
					break;
				default: e = 0;
			}
		}
		D(he), O(he, e);
	}
	function ve() {
		D(he), D(k), D(A);
	}
	function ye(e) {
		e.memoizedState !== null && O(ge, e);
		var t = he.current, n = Hd(t, e.type);
		t !== n && (O(k, e), O(he, n));
	}
	function be(e) {
		k.current === e && (D(he), D(k)), ge.current === e && (D(ge), Qf._currentValue = de);
	}
	var xe, Se;
	function Ce(e) {
		if (xe === void 0) try {
			throw Error();
		} catch (e) {
			var t = e.stack.trim().match(/\n( *(at )?)/);
			xe = t && t[1] || "", Se = -1 < e.stack.indexOf("\n    at") ? " (<anonymous>)" : -1 < e.stack.indexOf("@") ? "@unknown:0:0" : "";
		}
		return "\n" + xe + e + Se;
	}
	var we = !1;
	function Te(e, t) {
		if (!e || we) return "";
		we = !0;
		var n = Error.prepareStackTrace;
		Error.prepareStackTrace = void 0;
		try {
			var r = { DetermineComponentFrameRoot: function() {
				try {
					if (t) {
						var n = function() {
							throw Error();
						};
						if (Object.defineProperty(n.prototype, "props", { set: function() {
							throw Error();
						} }), typeof Reflect == "object" && Reflect.construct) {
							try {
								Reflect.construct(n, []);
							} catch (e) {
								var r = e;
							}
							Reflect.construct(e, [], n);
						} else {
							try {
								n.call();
							} catch (e) {
								r = e;
							}
							e.call(n.prototype);
						}
					} else {
						try {
							throw Error();
						} catch (e) {
							r = e;
						}
						(n = e()) && typeof n.catch == "function" && n.catch(function() {});
					}
				} catch (e) {
					if (e && r && typeof e.stack == "string") return [e.stack, r.stack];
				}
				return [null, null];
			} };
			r.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
			var i = Object.getOwnPropertyDescriptor(r.DetermineComponentFrameRoot, "name");
			i && i.configurable && Object.defineProperty(r.DetermineComponentFrameRoot, "name", { value: "DetermineComponentFrameRoot" });
			var a = r.DetermineComponentFrameRoot(), o = a[0], s = a[1];
			if (o && s) {
				var c = o.split("\n"), l = s.split("\n");
				for (i = r = 0; r < c.length && !c[r].includes("DetermineComponentFrameRoot");) r++;
				for (; i < l.length && !l[i].includes("DetermineComponentFrameRoot");) i++;
				if (r === c.length || i === l.length) for (r = c.length - 1, i = l.length - 1; 1 <= r && 0 <= i && c[r] !== l[i];) i--;
				for (; 1 <= r && 0 <= i; r--, i--) if (c[r] !== l[i]) {
					if (r !== 1 || i !== 1) do
						if (r--, i--, 0 > i || c[r] !== l[i]) {
							var u = "\n" + c[r].replace(" at new ", " at ");
							return e.displayName && u.includes("<anonymous>") && (u = u.replace("<anonymous>", e.displayName)), u;
						}
					while (1 <= r && 0 <= i);
					break;
				}
			}
		} finally {
			we = !1, Error.prepareStackTrace = n;
		}
		return (n = e ? e.displayName || e.name : "") ? Ce(n) : "";
	}
	function Ee(e, t) {
		switch (e.tag) {
			case 26:
			case 27:
			case 5: return Ce(e.type);
			case 16: return Ce("Lazy");
			case 13: return e.child !== t && t !== null ? Ce("Suspense Fallback") : Ce("Suspense");
			case 19: return Ce("SuspenseList");
			case 0:
			case 15: return Te(e.type, !1);
			case 11: return Te(e.type.render, !1);
			case 1: return Te(e.type, !0);
			case 31: return Ce("Activity");
			default: return "";
		}
	}
	function De(e) {
		try {
			var t = "", n = null;
			do
				t += Ee(e, n), n = e, e = e.return;
			while (e);
			return t;
		} catch (e) {
			return "\nError generating stack: " + e.message + "\n" + e.stack;
		}
	}
	var Oe = Object.prototype.hasOwnProperty, ke = t.unstable_scheduleCallback, Ae = t.unstable_cancelCallback, je = t.unstable_shouldYield, Me = t.unstable_requestPaint, Ne = t.unstable_now, Pe = t.unstable_getCurrentPriorityLevel, Fe = t.unstable_ImmediatePriority, Ie = t.unstable_UserBlockingPriority, Le = t.unstable_NormalPriority, Re = t.unstable_LowPriority, ze = t.unstable_IdlePriority, Be = t.log, Ve = t.unstable_setDisableYieldValue, He = null, Ue = null;
	function j(e) {
		if (typeof Be == "function" && Ve(e), Ue && typeof Ue.setStrictMode == "function") try {
			Ue.setStrictMode(He, e);
		} catch {}
	}
	var M = Math.clz32 ? Math.clz32 : P, N = Math.log, We = Math.LN2;
	function P(e) {
		return e >>>= 0, e === 0 ? 32 : 31 - (N(e) / We | 0) | 0;
	}
	var F = 256, Ge = 262144, Ke = 4194304;
	function qe(e) {
		var t = e & 42;
		if (t !== 0) return t;
		switch (e & -e) {
			case 1: return 1;
			case 2: return 2;
			case 4: return 4;
			case 8: return 8;
			case 16: return 16;
			case 32: return 32;
			case 64: return 64;
			case 128: return 128;
			case 256:
			case 512:
			case 1024:
			case 2048:
			case 4096:
			case 8192:
			case 16384:
			case 32768:
			case 65536:
			case 131072: return e & 261888;
			case 262144:
			case 524288:
			case 1048576:
			case 2097152: return e & 3932160;
			case 4194304:
			case 8388608:
			case 16777216:
			case 33554432: return e & 62914560;
			case 67108864: return 67108864;
			case 134217728: return 134217728;
			case 268435456: return 268435456;
			case 536870912: return 536870912;
			case 1073741824: return 0;
			default: return e;
		}
	}
	function Je(e, t, n) {
		var r = e.pendingLanes;
		if (r === 0) return 0;
		var i = 0, a = e.suspendedLanes, o = e.pingedLanes;
		e = e.warmLanes;
		var s = r & 134217727;
		return s === 0 ? (s = r & ~a, s === 0 ? o === 0 ? n || (n = r & ~e, n !== 0 && (i = qe(n))) : i = qe(o) : i = qe(s)) : (r = s & ~a, r === 0 ? (o &= s, o === 0 ? n || (n = s & ~e, n !== 0 && (i = qe(n))) : i = qe(o)) : i = qe(r)), i === 0 ? 0 : t !== 0 && t !== i && (t & a) === 0 && (a = i & -i, n = t & -t, a >= n || a === 32 && n & 4194048) ? t : i;
	}
	function I(e, t) {
		return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
	}
	function Ye(e, t) {
		switch (e) {
			case 1:
			case 2:
			case 4:
			case 8:
			case 64: return t + 250;
			case 16:
			case 32:
			case 128:
			case 256:
			case 512:
			case 1024:
			case 2048:
			case 4096:
			case 8192:
			case 16384:
			case 32768:
			case 65536:
			case 131072:
			case 262144:
			case 524288:
			case 1048576:
			case 2097152: return t + 5e3;
			case 4194304:
			case 8388608:
			case 16777216:
			case 33554432: return -1;
			case 67108864:
			case 134217728:
			case 268435456:
			case 536870912:
			case 1073741824: return -1;
			default: return -1;
		}
	}
	function Xe() {
		var e = Ke;
		return Ke <<= 1, !(Ke & 62914560) && (Ke = 4194304), e;
	}
	function Ze(e) {
		for (var t = [], n = 0; 31 > n; n++) t.push(e);
		return t;
	}
	function Qe(e, t) {
		e.pendingLanes |= t, t !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
	}
	function $e(e, t, n, r, i, a) {
		var o = e.pendingLanes;
		e.pendingLanes = n, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= n, e.entangledLanes &= n, e.errorRecoveryDisabledLanes &= n, e.shellSuspendCounter = 0;
		var s = e.entanglements, c = e.expirationTimes, l = e.hiddenUpdates;
		for (n = o & ~n; 0 < n;) {
			var u = 31 - M(n), d = 1 << u;
			s[u] = 0, c[u] = -1;
			var f = l[u];
			if (f !== null) for (l[u] = null, u = 0; u < f.length; u++) {
				var p = f[u];
				p !== null && (p.lane &= -536870913);
			}
			n &= ~d;
		}
		r !== 0 && et(e, r, 0), a !== 0 && i === 0 && e.tag !== 0 && (e.suspendedLanes |= a & ~(o & ~t));
	}
	function et(e, t, n) {
		e.pendingLanes |= t, e.suspendedLanes &= ~t;
		var r = 31 - M(t);
		e.entangledLanes |= t, e.entanglements[r] = e.entanglements[r] | 1073741824 | n & 261930;
	}
	function tt(e, t) {
		var n = e.entangledLanes |= t;
		for (e = e.entanglements; n;) {
			var r = 31 - M(n), i = 1 << r;
			i & t | e[r] & t && (e[r] |= t), n &= ~i;
		}
	}
	function nt(e, t) {
		var n = t & -t;
		return n = n & 42 ? 1 : rt(n), (n & (e.suspendedLanes | t)) === 0 ? n : 0;
	}
	function rt(e) {
		switch (e) {
			case 2:
				e = 1;
				break;
			case 8:
				e = 4;
				break;
			case 32:
				e = 16;
				break;
			case 256:
			case 512:
			case 1024:
			case 2048:
			case 4096:
			case 8192:
			case 16384:
			case 32768:
			case 65536:
			case 131072:
			case 262144:
			case 524288:
			case 1048576:
			case 2097152:
			case 4194304:
			case 8388608:
			case 16777216:
			case 33554432:
				e = 128;
				break;
			case 268435456:
				e = 134217728;
				break;
			default: e = 0;
		}
		return e;
	}
	function it(e) {
		return e &= -e, 2 < e ? 8 < e ? e & 134217727 ? 32 : 268435456 : 8 : 2;
	}
	function at() {
		var e = E.p;
		return e === 0 ? (e = window.event, e === void 0 ? 32 : mp(e.type)) : e;
	}
	function ot(e, t) {
		var n = E.p;
		try {
			return E.p = e, t();
		} finally {
			E.p = n;
		}
	}
	var st = Math.random().toString(36).slice(2), ct = "__reactFiber$" + st, L = "__reactProps$" + st, lt = "__reactContainer$" + st, ut = "__reactEvents$" + st, dt = "__reactListeners$" + st, ft = "__reactHandles$" + st, pt = "__reactResources$" + st, mt = "__reactMarker$" + st;
	function ht(e) {
		delete e[ct], delete e[L], delete e[ut], delete e[dt], delete e[ft];
	}
	function gt(e) {
		var t = e[ct];
		if (t) return t;
		for (var n = e.parentNode; n;) {
			if (t = n[lt] || n[ct]) {
				if (n = t.alternate, t.child !== null || n !== null && n.child !== null) for (e = df(e); e !== null;) {
					if (n = e[ct]) return n;
					e = df(e);
				}
				return t;
			}
			e = n, n = e.parentNode;
		}
		return null;
	}
	function _t(e) {
		if (e = e[ct] || e[lt]) {
			var t = e.tag;
			if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3) return e;
		}
		return null;
	}
	function vt(e) {
		var t = e.tag;
		if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
		throw Error(i(33));
	}
	function yt(e) {
		var t = e[pt];
		return t ||= e[pt] = {
			hoistableStyles: /* @__PURE__ */ new Map(),
			hoistableScripts: /* @__PURE__ */ new Map()
		}, t;
	}
	function bt(e) {
		e[mt] = !0;
	}
	var xt = /* @__PURE__ */ new Set(), St = {};
	function Ct(e, t) {
		wt(e, t), wt(e + "Capture", t);
	}
	function wt(e, t) {
		for (St[e] = t, e = 0; e < t.length; e++) xt.add(t[e]);
	}
	var Tt = RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"), Et = {}, Dt = {};
	function Ot(e) {
		return Oe.call(Dt, e) ? !0 : Oe.call(Et, e) ? !1 : Tt.test(e) ? Dt[e] = !0 : (Et[e] = !0, !1);
	}
	function kt(e, t, n) {
		if (Ot(t)) if (n === null) e.removeAttribute(t);
		else {
			switch (typeof n) {
				case "undefined":
				case "function":
				case "symbol":
					e.removeAttribute(t);
					return;
				case "boolean":
					var r = t.toLowerCase().slice(0, 5);
					if (r !== "data-" && r !== "aria-") {
						e.removeAttribute(t);
						return;
					}
			}
			e.setAttribute(t, "" + n);
		}
	}
	function At(e, t, n) {
		if (n === null) e.removeAttribute(t);
		else {
			switch (typeof n) {
				case "undefined":
				case "function":
				case "symbol":
				case "boolean":
					e.removeAttribute(t);
					return;
			}
			e.setAttribute(t, "" + n);
		}
	}
	function jt(e, t, n, r) {
		if (r === null) e.removeAttribute(n);
		else {
			switch (typeof r) {
				case "undefined":
				case "function":
				case "symbol":
				case "boolean":
					e.removeAttribute(n);
					return;
			}
			e.setAttributeNS(t, n, "" + r);
		}
	}
	function Mt(e) {
		switch (typeof e) {
			case "bigint":
			case "boolean":
			case "number":
			case "string":
			case "undefined": return e;
			case "object": return e;
			default: return "";
		}
	}
	function Nt(e) {
		var t = e.type;
		return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
	}
	function Pt(e, t, n) {
		var r = Object.getOwnPropertyDescriptor(e.constructor.prototype, t);
		if (!e.hasOwnProperty(t) && r !== void 0 && typeof r.get == "function" && typeof r.set == "function") {
			var i = r.get, a = r.set;
			return Object.defineProperty(e, t, {
				configurable: !0,
				get: function() {
					return i.call(this);
				},
				set: function(e) {
					n = "" + e, a.call(this, e);
				}
			}), Object.defineProperty(e, t, { enumerable: r.enumerable }), {
				getValue: function() {
					return n;
				},
				setValue: function(e) {
					n = "" + e;
				},
				stopTracking: function() {
					e._valueTracker = null, delete e[t];
				}
			};
		}
	}
	function Ft(e) {
		if (!e._valueTracker) {
			var t = Nt(e) ? "checked" : "value";
			e._valueTracker = Pt(e, t, "" + e[t]);
		}
	}
	function It(e) {
		if (!e) return !1;
		var t = e._valueTracker;
		if (!t) return !0;
		var n = t.getValue(), r = "";
		return e && (r = Nt(e) ? e.checked ? "true" : "false" : e.value), e = r, e === n ? !1 : (t.setValue(e), !0);
	}
	function Lt(e) {
		if (e ||= typeof document < "u" ? document : void 0, e === void 0) return null;
		try {
			return e.activeElement || e.body;
		} catch {
			return e.body;
		}
	}
	var Rt = /[\n"\\]/g;
	function zt(e) {
		return e.replace(Rt, function(e) {
			return "\\" + e.charCodeAt(0).toString(16) + " ";
		});
	}
	function Bt(e, t, n, r, i, a, o, s) {
		e.name = "", o != null && typeof o != "function" && typeof o != "symbol" && typeof o != "boolean" ? e.type = o : e.removeAttribute("type"), t == null ? o !== "submit" && o !== "reset" || e.removeAttribute("value") : o === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + Mt(t)) : e.value !== "" + Mt(t) && (e.value = "" + Mt(t)), t == null ? n == null ? r != null && e.removeAttribute("value") : Ht(e, o, Mt(n)) : Ht(e, o, Mt(t)), i == null && a != null && (e.defaultChecked = !!a), i != null && (e.checked = i && typeof i != "function" && typeof i != "symbol"), s != null && typeof s != "function" && typeof s != "symbol" && typeof s != "boolean" ? e.name = "" + Mt(s) : e.removeAttribute("name");
	}
	function Vt(e, t, n, r, i, a, o, s) {
		if (a != null && typeof a != "function" && typeof a != "symbol" && typeof a != "boolean" && (e.type = a), t != null || n != null) {
			if (!(a !== "submit" && a !== "reset" || t != null)) {
				Ft(e);
				return;
			}
			n = n == null ? "" : "" + Mt(n), t = t == null ? n : "" + Mt(t), s || t === e.value || (e.value = t), e.defaultValue = t;
		}
		r ??= i, r = typeof r != "function" && typeof r != "symbol" && !!r, e.checked = s ? e.checked : !!r, e.defaultChecked = !!r, o != null && typeof o != "function" && typeof o != "symbol" && typeof o != "boolean" && (e.name = o), Ft(e);
	}
	function Ht(e, t, n) {
		t === "number" && Lt(e.ownerDocument) === e || e.defaultValue === "" + n || (e.defaultValue = "" + n);
	}
	function Ut(e, t, n, r) {
		if (e = e.options, t) {
			t = {};
			for (var i = 0; i < n.length; i++) t["$" + n[i]] = !0;
			for (n = 0; n < e.length; n++) i = t.hasOwnProperty("$" + e[n].value), e[n].selected !== i && (e[n].selected = i), i && r && (e[n].defaultSelected = !0);
		} else {
			for (n = "" + Mt(n), t = null, i = 0; i < e.length; i++) {
				if (e[i].value === n) {
					e[i].selected = !0, r && (e[i].defaultSelected = !0);
					return;
				}
				t !== null || e[i].disabled || (t = e[i]);
			}
			t !== null && (t.selected = !0);
		}
	}
	function Wt(e, t, n) {
		if (t != null && (t = "" + Mt(t), t !== e.value && (e.value = t), n == null)) {
			e.defaultValue !== t && (e.defaultValue = t);
			return;
		}
		e.defaultValue = n == null ? "" : "" + Mt(n);
	}
	function Gt(e, t, n, r) {
		if (t == null) {
			if (r != null) {
				if (n != null) throw Error(i(92));
				if (ue(r)) {
					if (1 < r.length) throw Error(i(93));
					r = r[0];
				}
				n = r;
			}
			n ??= "", t = n;
		}
		n = Mt(t), e.defaultValue = n, r = e.textContent, r === n && r !== "" && r !== null && (e.value = r), Ft(e);
	}
	function Kt(e, t) {
		if (t) {
			var n = e.firstChild;
			if (n && n === e.lastChild && n.nodeType === 3) {
				n.nodeValue = t;
				return;
			}
		}
		e.textContent = t;
	}
	var qt = new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));
	function Jt(e, t, n) {
		var r = t.indexOf("--") === 0;
		n == null || typeof n == "boolean" || n === "" ? r ? e.setProperty(t, "") : t === "float" ? e.cssFloat = "" : e[t] = "" : r ? e.setProperty(t, n) : typeof n != "number" || n === 0 || qt.has(t) ? t === "float" ? e.cssFloat = n : e[t] = ("" + n).trim() : e[t] = n + "px";
	}
	function Yt(e, t, n) {
		if (t != null && typeof t != "object") throw Error(i(62));
		if (e = e.style, n != null) {
			for (var r in n) !n.hasOwnProperty(r) || t != null && t.hasOwnProperty(r) || (r.indexOf("--") === 0 ? e.setProperty(r, "") : r === "float" ? e.cssFloat = "" : e[r] = "");
			for (var a in t) r = t[a], t.hasOwnProperty(a) && n[a] !== r && Jt(e, a, r);
		} else for (var o in t) t.hasOwnProperty(o) && Jt(e, o, t[o]);
	}
	function Xt(e) {
		if (e.indexOf("-") === -1) return !1;
		switch (e) {
			case "annotation-xml":
			case "color-profile":
			case "font-face":
			case "font-face-src":
			case "font-face-uri":
			case "font-face-format":
			case "font-face-name":
			case "missing-glyph": return !1;
			default: return !0;
		}
	}
	var Zt = new Map([
		["acceptCharset", "accept-charset"],
		["htmlFor", "for"],
		["httpEquiv", "http-equiv"],
		["crossOrigin", "crossorigin"],
		["accentHeight", "accent-height"],
		["alignmentBaseline", "alignment-baseline"],
		["arabicForm", "arabic-form"],
		["baselineShift", "baseline-shift"],
		["capHeight", "cap-height"],
		["clipPath", "clip-path"],
		["clipRule", "clip-rule"],
		["colorInterpolation", "color-interpolation"],
		["colorInterpolationFilters", "color-interpolation-filters"],
		["colorProfile", "color-profile"],
		["colorRendering", "color-rendering"],
		["dominantBaseline", "dominant-baseline"],
		["enableBackground", "enable-background"],
		["fillOpacity", "fill-opacity"],
		["fillRule", "fill-rule"],
		["floodColor", "flood-color"],
		["floodOpacity", "flood-opacity"],
		["fontFamily", "font-family"],
		["fontSize", "font-size"],
		["fontSizeAdjust", "font-size-adjust"],
		["fontStretch", "font-stretch"],
		["fontStyle", "font-style"],
		["fontVariant", "font-variant"],
		["fontWeight", "font-weight"],
		["glyphName", "glyph-name"],
		["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
		["glyphOrientationVertical", "glyph-orientation-vertical"],
		["horizAdvX", "horiz-adv-x"],
		["horizOriginX", "horiz-origin-x"],
		["imageRendering", "image-rendering"],
		["letterSpacing", "letter-spacing"],
		["lightingColor", "lighting-color"],
		["markerEnd", "marker-end"],
		["markerMid", "marker-mid"],
		["markerStart", "marker-start"],
		["overlinePosition", "overline-position"],
		["overlineThickness", "overline-thickness"],
		["paintOrder", "paint-order"],
		["panose-1", "panose-1"],
		["pointerEvents", "pointer-events"],
		["renderingIntent", "rendering-intent"],
		["shapeRendering", "shape-rendering"],
		["stopColor", "stop-color"],
		["stopOpacity", "stop-opacity"],
		["strikethroughPosition", "strikethrough-position"],
		["strikethroughThickness", "strikethrough-thickness"],
		["strokeDasharray", "stroke-dasharray"],
		["strokeDashoffset", "stroke-dashoffset"],
		["strokeLinecap", "stroke-linecap"],
		["strokeLinejoin", "stroke-linejoin"],
		["strokeMiterlimit", "stroke-miterlimit"],
		["strokeOpacity", "stroke-opacity"],
		["strokeWidth", "stroke-width"],
		["textAnchor", "text-anchor"],
		["textDecoration", "text-decoration"],
		["textRendering", "text-rendering"],
		["transformOrigin", "transform-origin"],
		["underlinePosition", "underline-position"],
		["underlineThickness", "underline-thickness"],
		["unicodeBidi", "unicode-bidi"],
		["unicodeRange", "unicode-range"],
		["unitsPerEm", "units-per-em"],
		["vAlphabetic", "v-alphabetic"],
		["vHanging", "v-hanging"],
		["vIdeographic", "v-ideographic"],
		["vMathematical", "v-mathematical"],
		["vectorEffect", "vector-effect"],
		["vertAdvY", "vert-adv-y"],
		["vertOriginX", "vert-origin-x"],
		["vertOriginY", "vert-origin-y"],
		["wordSpacing", "word-spacing"],
		["writingMode", "writing-mode"],
		["xmlnsXlink", "xmlns:xlink"],
		["xHeight", "x-height"]
	]), Qt = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
	function $t(e) {
		return Qt.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
	}
	function en() {}
	var tn = null;
	function nn(e) {
		return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
	}
	var R = null, rn = null;
	function an(e) {
		var t = _t(e);
		if (t && (e = t.stateNode)) {
			var n = e[L] || null;
			a: switch (e = t.stateNode, t.type) {
				case "input":
					if (Bt(e, n.value, n.defaultValue, n.defaultValue, n.checked, n.defaultChecked, n.type, n.name), t = n.name, n.type === "radio" && t != null) {
						for (n = e; n.parentNode;) n = n.parentNode;
						for (n = n.querySelectorAll("input[name=\"" + zt("" + t) + "\"][type=\"radio\"]"), t = 0; t < n.length; t++) {
							var r = n[t];
							if (r !== e && r.form === e.form) {
								var a = r[L] || null;
								if (!a) throw Error(i(90));
								Bt(r, a.value, a.defaultValue, a.defaultValue, a.checked, a.defaultChecked, a.type, a.name);
							}
						}
						for (t = 0; t < n.length; t++) r = n[t], r.form === e.form && It(r);
					}
					break a;
				case "textarea":
					Wt(e, n.value, n.defaultValue);
					break a;
				case "select": t = n.value, t != null && Ut(e, !!n.multiple, t, !1);
			}
		}
	}
	var on = !1;
	function sn(e, t, n) {
		if (on) return e(t, n);
		on = !0;
		try {
			return e(t);
		} finally {
			if (on = !1, (R !== null || rn !== null) && (bu(), R && (t = R, e = rn, rn = R = null, an(t), e))) for (t = 0; t < e.length; t++) an(e[t]);
		}
	}
	function cn(e, t) {
		var n = e.stateNode;
		if (n === null) return null;
		var r = n[L] || null;
		if (r === null) return null;
		n = r[t];
		a: switch (t) {
			case "onClick":
			case "onClickCapture":
			case "onDoubleClick":
			case "onDoubleClickCapture":
			case "onMouseDown":
			case "onMouseDownCapture":
			case "onMouseMove":
			case "onMouseMoveCapture":
			case "onMouseUp":
			case "onMouseUpCapture":
			case "onMouseEnter":
				(r = !r.disabled) || (e = e.type, r = !(e === "button" || e === "input" || e === "select" || e === "textarea")), e = !r;
				break a;
			default: e = !1;
		}
		if (e) return null;
		if (n && typeof n != "function") throw Error(i(231, t, typeof n));
		return n;
	}
	var ln = !(typeof window > "u" || window.document === void 0 || window.document.createElement === void 0), un = !1;
	if (ln) try {
		var dn = {};
		Object.defineProperty(dn, "passive", { get: function() {
			un = !0;
		} }), window.addEventListener("test", dn, dn), window.removeEventListener("test", dn, dn);
	} catch {
		un = !1;
	}
	var fn = null, pn = null, mn = null;
	function hn() {
		if (mn) return mn;
		var e, t = pn, n = t.length, r, i = "value" in fn ? fn.value : fn.textContent, a = i.length;
		for (e = 0; e < n && t[e] === i[e]; e++);
		var o = n - e;
		for (r = 1; r <= o && t[n - r] === i[a - r]; r++);
		return mn = i.slice(e, 1 < r ? 1 - r : void 0);
	}
	function gn(e) {
		var t = e.keyCode;
		return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
	}
	function _n() {
		return !0;
	}
	function vn() {
		return !1;
	}
	function yn(e) {
		function t(t, n, r, i, a) {
			for (var o in this._reactName = t, this._targetInst = r, this.type = n, this.nativeEvent = i, this.target = a, this.currentTarget = null, e) e.hasOwnProperty(o) && (t = e[o], this[o] = t ? t(i) : i[o]);
			return this.isDefaultPrevented = (i.defaultPrevented == null ? !1 === i.returnValue : i.defaultPrevented) ? _n : vn, this.isPropagationStopped = vn, this;
		}
		return h(t.prototype, {
			preventDefault: function() {
				this.defaultPrevented = !0;
				var e = this.nativeEvent;
				e && (e.preventDefault ? e.preventDefault() : typeof e.returnValue != "unknown" && (e.returnValue = !1), this.isDefaultPrevented = _n);
			},
			stopPropagation: function() {
				var e = this.nativeEvent;
				e && (e.stopPropagation ? e.stopPropagation() : typeof e.cancelBubble != "unknown" && (e.cancelBubble = !0), this.isPropagationStopped = _n);
			},
			persist: function() {},
			isPersistent: _n
		}), t;
	}
	var bn = {
		eventPhase: 0,
		bubbles: 0,
		cancelable: 0,
		timeStamp: function(e) {
			return e.timeStamp || Date.now();
		},
		defaultPrevented: 0,
		isTrusted: 0
	}, xn = yn(bn), Sn = h({}, bn, {
		view: 0,
		detail: 0
	}), Cn = yn(Sn), wn, Tn, En, Dn = h({}, Sn, {
		screenX: 0,
		screenY: 0,
		clientX: 0,
		clientY: 0,
		pageX: 0,
		pageY: 0,
		ctrlKey: 0,
		shiftKey: 0,
		altKey: 0,
		metaKey: 0,
		getModifierState: Rn,
		button: 0,
		buttons: 0,
		relatedTarget: function(e) {
			return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
		},
		movementX: function(e) {
			return "movementX" in e ? e.movementX : (e !== En && (En && e.type === "mousemove" ? (wn = e.screenX - En.screenX, Tn = e.screenY - En.screenY) : Tn = wn = 0, En = e), wn);
		},
		movementY: function(e) {
			return "movementY" in e ? e.movementY : Tn;
		}
	}), On = yn(Dn), kn = yn(h({}, Dn, { dataTransfer: 0 })), An = yn(h({}, Sn, { relatedTarget: 0 })), jn = yn(h({}, bn, {
		animationName: 0,
		elapsedTime: 0,
		pseudoElement: 0
	})), Mn = yn(h({}, bn, { clipboardData: function(e) {
		return "clipboardData" in e ? e.clipboardData : window.clipboardData;
	} })), Nn = yn(h({}, bn, { data: 0 })), Pn = {
		Esc: "Escape",
		Spacebar: " ",
		Left: "ArrowLeft",
		Up: "ArrowUp",
		Right: "ArrowRight",
		Down: "ArrowDown",
		Del: "Delete",
		Win: "OS",
		Menu: "ContextMenu",
		Apps: "ContextMenu",
		Scroll: "ScrollLock",
		MozPrintableKey: "Unidentified"
	}, Fn = {
		8: "Backspace",
		9: "Tab",
		12: "Clear",
		13: "Enter",
		16: "Shift",
		17: "Control",
		18: "Alt",
		19: "Pause",
		20: "CapsLock",
		27: "Escape",
		32: " ",
		33: "PageUp",
		34: "PageDown",
		35: "End",
		36: "Home",
		37: "ArrowLeft",
		38: "ArrowUp",
		39: "ArrowRight",
		40: "ArrowDown",
		45: "Insert",
		46: "Delete",
		112: "F1",
		113: "F2",
		114: "F3",
		115: "F4",
		116: "F5",
		117: "F6",
		118: "F7",
		119: "F8",
		120: "F9",
		121: "F10",
		122: "F11",
		123: "F12",
		144: "NumLock",
		145: "ScrollLock",
		224: "Meta"
	}, In = {
		Alt: "altKey",
		Control: "ctrlKey",
		Meta: "metaKey",
		Shift: "shiftKey"
	};
	function Ln(e) {
		var t = this.nativeEvent;
		return t.getModifierState ? t.getModifierState(e) : (e = In[e]) ? !!t[e] : !1;
	}
	function Rn() {
		return Ln;
	}
	var zn = yn(h({}, Sn, {
		key: function(e) {
			if (e.key) {
				var t = Pn[e.key] || e.key;
				if (t !== "Unidentified") return t;
			}
			return e.type === "keypress" ? (e = gn(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? Fn[e.keyCode] || "Unidentified" : "";
		},
		code: 0,
		location: 0,
		ctrlKey: 0,
		shiftKey: 0,
		altKey: 0,
		metaKey: 0,
		repeat: 0,
		locale: 0,
		getModifierState: Rn,
		charCode: function(e) {
			return e.type === "keypress" ? gn(e) : 0;
		},
		keyCode: function(e) {
			return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
		},
		which: function(e) {
			return e.type === "keypress" ? gn(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
		}
	})), Bn = yn(h({}, Dn, {
		pointerId: 0,
		width: 0,
		height: 0,
		pressure: 0,
		tangentialPressure: 0,
		tiltX: 0,
		tiltY: 0,
		twist: 0,
		pointerType: 0,
		isPrimary: 0
	})), Vn = yn(h({}, Sn, {
		touches: 0,
		targetTouches: 0,
		changedTouches: 0,
		altKey: 0,
		metaKey: 0,
		ctrlKey: 0,
		shiftKey: 0,
		getModifierState: Rn
	})), Hn = yn(h({}, bn, {
		propertyName: 0,
		elapsedTime: 0,
		pseudoElement: 0
	})), Un = yn(h({}, Dn, {
		deltaX: function(e) {
			return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
		},
		deltaY: function(e) {
			return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
		},
		deltaZ: 0,
		deltaMode: 0
	})), Wn = yn(h({}, bn, {
		newState: 0,
		oldState: 0
	})), Gn = [
		9,
		13,
		27,
		32
	], Kn = ln && "CompositionEvent" in window, qn = null;
	ln && "documentMode" in document && (qn = document.documentMode);
	var Jn = ln && "TextEvent" in window && !qn, Yn = ln && (!Kn || qn && 8 < qn && 11 >= qn), Xn = " ", Zn = !1;
	function Qn(e, t) {
		switch (e) {
			case "keyup": return Gn.indexOf(t.keyCode) !== -1;
			case "keydown": return t.keyCode !== 229;
			case "keypress":
			case "mousedown":
			case "focusout": return !0;
			default: return !1;
		}
	}
	function $n(e) {
		return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
	}
	var er = !1;
	function tr(e, t) {
		switch (e) {
			case "compositionend": return $n(t);
			case "keypress": return t.which === 32 ? (Zn = !0, Xn) : null;
			case "textInput": return e = t.data, e === Xn && Zn ? null : e;
			default: return null;
		}
	}
	function nr(e, t) {
		if (er) return e === "compositionend" || !Kn && Qn(e, t) ? (e = hn(), mn = pn = fn = null, er = !1, e) : null;
		switch (e) {
			case "paste": return null;
			case "keypress":
				if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
					if (t.char && 1 < t.char.length) return t.char;
					if (t.which) return String.fromCharCode(t.which);
				}
				return null;
			case "compositionend": return Yn && t.locale !== "ko" ? null : t.data;
			default: return null;
		}
	}
	var rr = {
		color: !0,
		date: !0,
		datetime: !0,
		"datetime-local": !0,
		email: !0,
		month: !0,
		number: !0,
		password: !0,
		range: !0,
		search: !0,
		tel: !0,
		text: !0,
		time: !0,
		url: !0,
		week: !0
	};
	function ir(e) {
		var t = e && e.nodeName && e.nodeName.toLowerCase();
		return t === "input" ? !!rr[e.type] : t === "textarea";
	}
	function ar(e, t, n, r) {
		R ? rn ? rn.push(r) : rn = [r] : R = r, t = Ed(t, "onChange"), 0 < t.length && (n = new xn("onChange", "change", null, n, r), e.push({
			event: n,
			listeners: t
		}));
	}
	var or = null, sr = null;
	function cr(e) {
		yd(e, 0);
	}
	function lr(e) {
		if (It(vt(e))) return e;
	}
	function ur(e, t) {
		if (e === "change") return t;
	}
	var dr = !1;
	if (ln) {
		var fr;
		if (ln) {
			var pr = "oninput" in document;
			if (!pr) {
				var mr = document.createElement("div");
				mr.setAttribute("oninput", "return;"), pr = typeof mr.oninput == "function";
			}
			fr = pr;
		} else fr = !1;
		dr = fr && (!document.documentMode || 9 < document.documentMode);
	}
	function hr() {
		or && (or.detachEvent("onpropertychange", gr), sr = or = null);
	}
	function gr(e) {
		if (e.propertyName === "value" && lr(sr)) {
			var t = [];
			ar(t, sr, e, nn(e)), sn(cr, t);
		}
	}
	function _r(e, t, n) {
		e === "focusin" ? (hr(), or = t, sr = n, or.attachEvent("onpropertychange", gr)) : e === "focusout" && hr();
	}
	function vr(e) {
		if (e === "selectionchange" || e === "keyup" || e === "keydown") return lr(sr);
	}
	function yr(e, t) {
		if (e === "click") return lr(t);
	}
	function br(e, t) {
		if (e === "input" || e === "change") return lr(t);
	}
	function xr(e, t) {
		return e === t && (e !== 0 || 1 / e == 1 / t) || e !== e && t !== t;
	}
	var Sr = typeof Object.is == "function" ? Object.is : xr;
	function Cr(e, t) {
		if (Sr(e, t)) return !0;
		if (typeof e != "object" || !e || typeof t != "object" || !t) return !1;
		var n = Object.keys(e), r = Object.keys(t);
		if (n.length !== r.length) return !1;
		for (r = 0; r < n.length; r++) {
			var i = n[r];
			if (!Oe.call(t, i) || !Sr(e[i], t[i])) return !1;
		}
		return !0;
	}
	function wr(e) {
		for (; e && e.firstChild;) e = e.firstChild;
		return e;
	}
	function Tr(e, t) {
		var n = wr(e);
		e = 0;
		for (var r; n;) {
			if (n.nodeType === 3) {
				if (r = e + n.textContent.length, e <= t && r >= t) return {
					node: n,
					offset: t - e
				};
				e = r;
			}
			a: {
				for (; n;) {
					if (n.nextSibling) {
						n = n.nextSibling;
						break a;
					}
					n = n.parentNode;
				}
				n = void 0;
			}
			n = wr(n);
		}
	}
	function Er(e, t) {
		return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? Er(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
	}
	function Dr(e) {
		e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
		for (var t = Lt(e.document); t instanceof e.HTMLIFrameElement;) {
			try {
				var n = typeof t.contentWindow.location.href == "string";
			} catch {
				n = !1;
			}
			if (n) e = t.contentWindow;
			else break;
			t = Lt(e.document);
		}
		return t;
	}
	function Or(e) {
		var t = e && e.nodeName && e.nodeName.toLowerCase();
		return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
	}
	var kr = ln && "documentMode" in document && 11 >= document.documentMode, Ar = null, jr = null, Mr = null, Nr = !1;
	function Pr(e, t, n) {
		var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
		Nr || Ar == null || Ar !== Lt(r) || (r = Ar, "selectionStart" in r && Or(r) ? r = {
			start: r.selectionStart,
			end: r.selectionEnd
		} : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = {
			anchorNode: r.anchorNode,
			anchorOffset: r.anchorOffset,
			focusNode: r.focusNode,
			focusOffset: r.focusOffset
		}), Mr && Cr(Mr, r) || (Mr = r, r = Ed(jr, "onSelect"), 0 < r.length && (t = new xn("onSelect", "select", null, t, n), e.push({
			event: t,
			listeners: r
		}), t.target = Ar)));
	}
	function Fr(e, t) {
		var n = {};
		return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
	}
	var Ir = {
		animationend: Fr("Animation", "AnimationEnd"),
		animationiteration: Fr("Animation", "AnimationIteration"),
		animationstart: Fr("Animation", "AnimationStart"),
		transitionrun: Fr("Transition", "TransitionRun"),
		transitionstart: Fr("Transition", "TransitionStart"),
		transitioncancel: Fr("Transition", "TransitionCancel"),
		transitionend: Fr("Transition", "TransitionEnd")
	}, Lr = {}, Rr = {};
	ln && (Rr = document.createElement("div").style, "AnimationEvent" in window || (delete Ir.animationend.animation, delete Ir.animationiteration.animation, delete Ir.animationstart.animation), "TransitionEvent" in window || delete Ir.transitionend.transition);
	function zr(e) {
		if (Lr[e]) return Lr[e];
		if (!Ir[e]) return e;
		var t = Ir[e], n;
		for (n in t) if (t.hasOwnProperty(n) && n in Rr) return Lr[e] = t[n];
		return e;
	}
	var Br = zr("animationend"), Vr = zr("animationiteration"), Hr = zr("animationstart"), Ur = zr("transitionrun"), Wr = zr("transitionstart"), Gr = zr("transitioncancel"), Kr = zr("transitionend"), qr = /* @__PURE__ */ new Map(), Jr = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
	Jr.push("scrollEnd");
	function Yr(e, t) {
		qr.set(e, t), Ct(t, [e]);
	}
	var Xr = typeof reportError == "function" ? reportError : function(e) {
		if (typeof window == "object" && typeof window.ErrorEvent == "function") {
			var t = new window.ErrorEvent("error", {
				bubbles: !0,
				cancelable: !0,
				message: typeof e == "object" && e && typeof e.message == "string" ? String(e.message) : String(e),
				error: e
			});
			if (!window.dispatchEvent(t)) return;
		} else if (typeof process == "object" && typeof process.emit == "function") {
			process.emit("uncaughtException", e);
			return;
		}
		console.error(e);
	}, Zr = [], Qr = 0, $r = 0;
	function ei() {
		for (var e = Qr, t = $r = Qr = 0; t < e;) {
			var n = Zr[t];
			Zr[t++] = null;
			var r = Zr[t];
			Zr[t++] = null;
			var i = Zr[t];
			Zr[t++] = null;
			var a = Zr[t];
			if (Zr[t++] = null, r !== null && i !== null) {
				var o = r.pending;
				o === null ? i.next = i : (i.next = o.next, o.next = i), r.pending = i;
			}
			a !== 0 && ii(n, i, a);
		}
	}
	function ti(e, t, n, r) {
		Zr[Qr++] = e, Zr[Qr++] = t, Zr[Qr++] = n, Zr[Qr++] = r, $r |= r, e.lanes |= r, e = e.alternate, e !== null && (e.lanes |= r);
	}
	function ni(e, t, n, r) {
		return ti(e, t, n, r), ai(e);
	}
	function ri(e, t) {
		return ti(e, null, null, t), ai(e);
	}
	function ii(e, t, n) {
		e.lanes |= n;
		var r = e.alternate;
		r !== null && (r.lanes |= n);
		for (var i = !1, a = e.return; a !== null;) a.childLanes |= n, r = a.alternate, r !== null && (r.childLanes |= n), a.tag === 22 && (e = a.stateNode, e === null || e._visibility & 1 || (i = !0)), e = a, a = a.return;
		return e.tag === 3 ? (a = e.stateNode, i && t !== null && (i = 31 - M(n), e = a.hiddenUpdates, r = e[i], r === null ? e[i] = [t] : r.push(t), t.lane = n | 536870912), a) : null;
	}
	function ai(e) {
		if (50 < du) throw du = 0, fu = null, Error(i(185));
		for (var t = e.return; t !== null;) e = t, t = e.return;
		return e.tag === 3 ? e.stateNode : null;
	}
	var oi = {};
	function si(e, t, n, r) {
		this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
	}
	function ci(e, t, n, r) {
		return new si(e, t, n, r);
	}
	function li(e) {
		return e = e.prototype, !(!e || !e.isReactComponent);
	}
	function ui(e, t) {
		var n = e.alternate;
		return n === null ? (n = ci(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 65011712, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : {
			lanes: t.lanes,
			firstContext: t.firstContext
		}, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n.refCleanup = e.refCleanup, n;
	}
	function di(e, t) {
		e.flags &= 65011714;
		var n = e.alternate;
		return n === null ? (e.childLanes = 0, e.lanes = t, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = n.childLanes, e.lanes = n.lanes, e.child = n.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = n.memoizedProps, e.memoizedState = n.memoizedState, e.updateQueue = n.updateQueue, e.type = n.type, t = n.dependencies, e.dependencies = t === null ? null : {
			lanes: t.lanes,
			firstContext: t.firstContext
		}), e;
	}
	function fi(e, t, n, r, a, o) {
		var s = 0;
		if (r = e, typeof e == "function") li(e) && (s = 1);
		else if (typeof e == "string") s = Uf(e, n, he.current) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
		else a: switch (e) {
			case ie: return e = ci(31, n, t, a), e.elementType = ie, e.lanes = o, e;
			case y: return pi(n.children, a, o, t);
			case b:
				s = 8, a |= 24;
				break;
			case x: return e = ci(12, n, t, a | 2), e.elementType = x, e.lanes = o, e;
			case ee: return e = ci(13, n, t, a), e.elementType = ee, e.lanes = o, e;
			case te: return e = ci(19, n, t, a), e.elementType = te, e.lanes = o, e;
			default:
				if (typeof e == "object" && e) switch (e.$$typeof) {
					case C:
						s = 10;
						break a;
					case S:
						s = 9;
						break a;
					case w:
						s = 11;
						break a;
					case ne:
						s = 14;
						break a;
					case re:
						s = 16, r = null;
						break a;
				}
				s = 29, n = Error(i(130, e === null ? "null" : typeof e, "")), r = null;
		}
		return t = ci(s, n, t, a), t.elementType = e, t.type = r, t.lanes = o, t;
	}
	function pi(e, t, n, r) {
		return e = ci(7, e, r, t), e.lanes = n, e;
	}
	function mi(e, t, n) {
		return e = ci(6, e, null, t), e.lanes = n, e;
	}
	function hi(e) {
		var t = ci(18, null, null, 0);
		return t.stateNode = e, t;
	}
	function gi(e, t, n) {
		return t = ci(4, e.children === null ? [] : e.children, e.key, t), t.lanes = n, t.stateNode = {
			containerInfo: e.containerInfo,
			pendingChildren: null,
			implementation: e.implementation
		}, t;
	}
	var _i = /* @__PURE__ */ new WeakMap();
	function vi(e, t) {
		if (typeof e == "object" && e) {
			var n = _i.get(e);
			return n === void 0 ? (t = {
				value: e,
				source: t,
				stack: De(t)
			}, _i.set(e, t), t) : n;
		}
		return {
			value: e,
			source: t,
			stack: De(t)
		};
	}
	var yi = [], bi = 0, xi = null, Si = 0, Ci = [], wi = 0, Ti = null, Ei = 1, Di = "";
	function Oi(e, t) {
		yi[bi++] = Si, yi[bi++] = xi, xi = e, Si = t;
	}
	function ki(e, t, n) {
		Ci[wi++] = Ei, Ci[wi++] = Di, Ci[wi++] = Ti, Ti = e;
		var r = Ei;
		e = Di;
		var i = 32 - M(r) - 1;
		r &= ~(1 << i), n += 1;
		var a = 32 - M(t) + i;
		if (30 < a) {
			var o = i - i % 5;
			a = (r & (1 << o) - 1).toString(32), r >>= o, i -= o, Ei = 1 << 32 - M(t) + i | n << i | r, Di = a + e;
		} else Ei = 1 << a | n << i | r, Di = e;
	}
	function Ai(e) {
		e.return !== null && (Oi(e, 1), ki(e, 1, 0));
	}
	function ji(e) {
		for (; e === xi;) xi = yi[--bi], yi[bi] = null, Si = yi[--bi], yi[bi] = null;
		for (; e === Ti;) Ti = Ci[--wi], Ci[wi] = null, Di = Ci[--wi], Ci[wi] = null, Ei = Ci[--wi], Ci[wi] = null;
	}
	function Mi(e, t) {
		Ci[wi++] = Ei, Ci[wi++] = Di, Ci[wi++] = Ti, Ei = t.id, Di = t.overflow, Ti = e;
	}
	var Ni = null, z = null, B = !1, Pi = null, Fi = !1, Ii = Error(i(519));
	function Li(e) {
		throw Ui(vi(Error(i(418, 1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML", "")), e)), Ii;
	}
	function Ri(e) {
		var t = e.stateNode, n = e.type, r = e.memoizedProps;
		switch (t[ct] = e, t[L] = r, n) {
			case "dialog":
				Q("cancel", t), Q("close", t);
				break;
			case "iframe":
			case "object":
			case "embed":
				Q("load", t);
				break;
			case "video":
			case "audio":
				for (n = 0; n < _d.length; n++) Q(_d[n], t);
				break;
			case "source":
				Q("error", t);
				break;
			case "img":
			case "image":
			case "link":
				Q("error", t), Q("load", t);
				break;
			case "details":
				Q("toggle", t);
				break;
			case "input":
				Q("invalid", t), Vt(t, r.value, r.defaultValue, r.checked, r.defaultChecked, r.type, r.name, !0);
				break;
			case "select":
				Q("invalid", t);
				break;
			case "textarea": Q("invalid", t), Gt(t, r.value, r.defaultValue, r.children);
		}
		n = r.children, typeof n != "string" && typeof n != "number" && typeof n != "bigint" || t.textContent === "" + n || !0 === r.suppressHydrationWarning || Md(t.textContent, n) ? (r.popover != null && (Q("beforetoggle", t), Q("toggle", t)), r.onScroll != null && Q("scroll", t), r.onScrollEnd != null && Q("scrollend", t), r.onClick != null && (t.onclick = en), t = !0) : t = !1, t || Li(e, !0);
	}
	function zi(e) {
		for (Ni = e.return; Ni;) switch (Ni.tag) {
			case 5:
			case 31:
			case 13:
				Fi = !1;
				return;
			case 27:
			case 3:
				Fi = !0;
				return;
			default: Ni = Ni.return;
		}
	}
	function Bi(e) {
		if (e !== Ni) return !1;
		if (!B) return zi(e), B = !0, !1;
		var t = e.tag, n;
		if ((n = t !== 3 && t !== 27) && ((n = t === 5) && (n = e.type, n = !(n !== "form" && n !== "button") || Ud(e.type, e.memoizedProps)), n = !n), n && z && Li(e), zi(e), t === 13) {
			if (e = e.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(i(317));
			z = uf(e);
		} else if (t === 31) {
			if (e = e.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(i(317));
			z = uf(e);
		} else t === 27 ? (t = z, Zd(e.type) ? (e = lf, lf = null, z = e) : z = t) : z = Ni ? cf(e.stateNode.nextSibling) : null;
		return !0;
	}
	function Vi() {
		z = Ni = null, B = !1;
	}
	function Hi() {
		var e = Pi;
		return e !== null && (Zl === null ? Zl = e : Zl.push.apply(Zl, e), Pi = null), e;
	}
	function Ui(e) {
		Pi === null ? Pi = [e] : Pi.push(e);
	}
	var Wi = me(null), Gi = null, Ki = null;
	function qi(e, t, n) {
		O(Wi, t._currentValue), t._currentValue = n;
	}
	function Ji(e) {
		e._currentValue = Wi.current, D(Wi);
	}
	function Yi(e, t, n) {
		for (; e !== null;) {
			var r = e.alternate;
			if ((e.childLanes & t) === t ? r !== null && (r.childLanes & t) !== t && (r.childLanes |= t) : (e.childLanes |= t, r !== null && (r.childLanes |= t)), e === n) break;
			e = e.return;
		}
	}
	function Xi(e, t, n, r) {
		var a = e.child;
		for (a !== null && (a.return = e); a !== null;) {
			var o = a.dependencies;
			if (o !== null) {
				var s = a.child;
				o = o.firstContext;
				a: for (; o !== null;) {
					var c = o;
					o = a;
					for (var l = 0; l < t.length; l++) if (c.context === t[l]) {
						o.lanes |= n, c = o.alternate, c !== null && (c.lanes |= n), Yi(o.return, n, e), r || (s = null);
						break a;
					}
					o = c.next;
				}
			} else if (a.tag === 18) {
				if (s = a.return, s === null) throw Error(i(341));
				s.lanes |= n, o = s.alternate, o !== null && (o.lanes |= n), Yi(s, n, e), s = null;
			} else s = a.child;
			if (s !== null) s.return = a;
			else for (s = a; s !== null;) {
				if (s === e) {
					s = null;
					break;
				}
				if (a = s.sibling, a !== null) {
					a.return = s.return, s = a;
					break;
				}
				s = s.return;
			}
			a = s;
		}
	}
	function Zi(e, t, n, r) {
		e = null;
		for (var a = t, o = !1; a !== null;) {
			if (!o) {
				if (a.flags & 524288) o = !0;
				else if (a.flags & 262144) break;
			}
			if (a.tag === 10) {
				var s = a.alternate;
				if (s === null) throw Error(i(387));
				if (s = s.memoizedProps, s !== null) {
					var c = a.type;
					Sr(a.pendingProps.value, s.value) || (e === null ? e = [c] : e.push(c));
				}
			} else if (a === ge.current) {
				if (s = a.alternate, s === null) throw Error(i(387));
				s.memoizedState.memoizedState !== a.memoizedState.memoizedState && (e === null ? e = [Qf] : e.push(Qf));
			}
			a = a.return;
		}
		e !== null && Xi(t, e, n, r), t.flags |= 262144;
	}
	function Qi(e) {
		for (e = e.firstContext; e !== null;) {
			if (!Sr(e.context._currentValue, e.memoizedValue)) return !0;
			e = e.next;
		}
		return !1;
	}
	function $i(e) {
		Gi = e, Ki = null, e = e.dependencies, e !== null && (e.firstContext = null);
	}
	function ea(e) {
		return na(Gi, e);
	}
	function ta(e, t) {
		return Gi === null && $i(e), na(e, t);
	}
	function na(e, t) {
		var n = t._currentValue;
		if (t = {
			context: t,
			memoizedValue: n,
			next: null
		}, Ki === null) {
			if (e === null) throw Error(i(308));
			Ki = t, e.dependencies = {
				lanes: 0,
				firstContext: t
			}, e.flags |= 524288;
		} else Ki = Ki.next = t;
		return n;
	}
	var ra = typeof AbortController < "u" ? AbortController : function() {
		var e = [], t = this.signal = {
			aborted: !1,
			addEventListener: function(t, n) {
				e.push(n);
			}
		};
		this.abort = function() {
			t.aborted = !0, e.forEach(function(e) {
				return e();
			});
		};
	}, ia = t.unstable_scheduleCallback, aa = t.unstable_NormalPriority, oa = {
		$$typeof: C,
		Consumer: null,
		Provider: null,
		_currentValue: null,
		_currentValue2: null,
		_threadCount: 0
	};
	function sa() {
		return {
			controller: new ra(),
			data: /* @__PURE__ */ new Map(),
			refCount: 0
		};
	}
	function ca(e) {
		e.refCount--, e.refCount === 0 && ia(aa, function() {
			e.controller.abort();
		});
	}
	var la = null, ua = 0, da = 0, fa = null;
	function pa(e, t) {
		if (la === null) {
			var n = la = [];
			ua = 0, da = dd(), fa = {
				status: "pending",
				value: void 0,
				then: function(e) {
					n.push(e);
				}
			};
		}
		return ua++, t.then(ma, ma), t;
	}
	function ma() {
		if (--ua === 0 && la !== null) {
			fa !== null && (fa.status = "fulfilled");
			var e = la;
			la = null, da = 0, fa = null;
			for (var t = 0; t < e.length; t++) (0, e[t])();
		}
	}
	function ha(e, t) {
		var n = [], r = {
			status: "pending",
			value: null,
			reason: null,
			then: function(e) {
				n.push(e);
			}
		};
		return e.then(function() {
			r.status = "fulfilled", r.value = t;
			for (var e = 0; e < n.length; e++) (0, n[e])(t);
		}, function(e) {
			for (r.status = "rejected", r.reason = e, e = 0; e < n.length; e++) (0, n[e])(void 0);
		}), r;
	}
	var ga = T.S;
	T.S = function(e, t) {
		eu = Ne(), typeof t == "object" && t && typeof t.then == "function" && pa(e, t), ga !== null && ga(e, t);
	};
	var _a = me(null);
	function va() {
		var e = _a.current;
		return e === null ? K.pooledCache : e;
	}
	function ya(e, t) {
		t === null ? O(_a, _a.current) : O(_a, t.pool);
	}
	function ba() {
		var e = va();
		return e === null ? null : {
			parent: oa._currentValue,
			pool: e
		};
	}
	var xa = Error(i(460)), Sa = Error(i(474)), Ca = Error(i(542)), wa = { then: function() {} };
	function Ta(e) {
		return e = e.status, e === "fulfilled" || e === "rejected";
	}
	function Ea(e, t, n) {
		switch (n = e[n], n === void 0 ? e.push(t) : n !== t && (t.then(en, en), t = n), t.status) {
			case "fulfilled": return t.value;
			case "rejected": throw e = t.reason, Aa(e), e;
			default:
				if (typeof t.status == "string") t.then(en, en);
				else {
					if (e = K, e !== null && 100 < e.shellSuspendCounter) throw Error(i(482));
					e = t, e.status = "pending", e.then(function(e) {
						if (t.status === "pending") {
							var n = t;
							n.status = "fulfilled", n.value = e;
						}
					}, function(e) {
						if (t.status === "pending") {
							var n = t;
							n.status = "rejected", n.reason = e;
						}
					});
				}
				switch (t.status) {
					case "fulfilled": return t.value;
					case "rejected": throw e = t.reason, Aa(e), e;
				}
				throw Oa = t, xa;
		}
	}
	function Da(e) {
		try {
			var t = e._init;
			return t(e._payload);
		} catch (e) {
			throw typeof e == "object" && e && typeof e.then == "function" ? (Oa = e, xa) : e;
		}
	}
	var Oa = null;
	function ka() {
		if (Oa === null) throw Error(i(459));
		var e = Oa;
		return Oa = null, e;
	}
	function Aa(e) {
		if (e === xa || e === Ca) throw Error(i(483));
	}
	var ja = null, Ma = 0;
	function Na(e) {
		var t = Ma;
		return Ma += 1, ja === null && (ja = []), Ea(ja, e, t);
	}
	function Pa(e, t) {
		t = t.props.ref, e.ref = t === void 0 ? null : t;
	}
	function Fa(e, t) {
		throw t.$$typeof === g ? Error(i(525)) : (e = Object.prototype.toString.call(t), Error(i(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e)));
	}
	function Ia(e) {
		function t(t, n) {
			if (e) {
				var r = t.deletions;
				r === null ? (t.deletions = [n], t.flags |= 16) : r.push(n);
			}
		}
		function n(n, r) {
			if (!e) return null;
			for (; r !== null;) t(n, r), r = r.sibling;
			return null;
		}
		function r(e) {
			for (var t = /* @__PURE__ */ new Map(); e !== null;) e.key === null ? t.set(e.index, e) : t.set(e.key, e), e = e.sibling;
			return t;
		}
		function a(e, t) {
			return e = ui(e, t), e.index = 0, e.sibling = null, e;
		}
		function o(t, n, r) {
			return t.index = r, e ? (r = t.alternate, r === null ? (t.flags |= 67108866, n) : (r = r.index, r < n ? (t.flags |= 67108866, n) : r)) : (t.flags |= 1048576, n);
		}
		function s(t) {
			return e && t.alternate === null && (t.flags |= 67108866), t;
		}
		function c(e, t, n, r) {
			return t === null || t.tag !== 6 ? (t = mi(n, e.mode, r), t.return = e, t) : (t = a(t, n), t.return = e, t);
		}
		function l(e, t, n, r) {
			var i = n.type;
			return i === y ? d(e, t, n.props.children, r, n.key) : t !== null && (t.elementType === i || typeof i == "object" && i && i.$$typeof === re && Da(i) === t.type) ? (t = a(t, n.props), Pa(t, n), t.return = e, t) : (t = fi(n.type, n.key, n.props, null, e.mode, r), Pa(t, n), t.return = e, t);
		}
		function u(e, t, n, r) {
			return t === null || t.tag !== 4 || t.stateNode.containerInfo !== n.containerInfo || t.stateNode.implementation !== n.implementation ? (t = gi(n, e.mode, r), t.return = e, t) : (t = a(t, n.children || []), t.return = e, t);
		}
		function d(e, t, n, r, i) {
			return t === null || t.tag !== 7 ? (t = pi(n, e.mode, r, i), t.return = e, t) : (t = a(t, n), t.return = e, t);
		}
		function f(e, t, n) {
			if (typeof t == "string" && t !== "" || typeof t == "number" || typeof t == "bigint") return t = mi("" + t, e.mode, n), t.return = e, t;
			if (typeof t == "object" && t) {
				switch (t.$$typeof) {
					case _: return n = fi(t.type, t.key, t.props, null, e.mode, n), Pa(n, t), n.return = e, n;
					case v: return t = gi(t, e.mode, n), t.return = e, t;
					case re: return t = Da(t), f(e, t, n);
				}
				if (ue(t) || se(t)) return t = pi(t, e.mode, n, null), t.return = e, t;
				if (typeof t.then == "function") return f(e, Na(t), n);
				if (t.$$typeof === C) return f(e, ta(e, t), n);
				Fa(e, t);
			}
			return null;
		}
		function p(e, t, n, r) {
			var i = t === null ? null : t.key;
			if (typeof n == "string" && n !== "" || typeof n == "number" || typeof n == "bigint") return i === null ? c(e, t, "" + n, r) : null;
			if (typeof n == "object" && n) {
				switch (n.$$typeof) {
					case _: return n.key === i ? l(e, t, n, r) : null;
					case v: return n.key === i ? u(e, t, n, r) : null;
					case re: return n = Da(n), p(e, t, n, r);
				}
				if (ue(n) || se(n)) return i === null ? d(e, t, n, r, null) : null;
				if (typeof n.then == "function") return p(e, t, Na(n), r);
				if (n.$$typeof === C) return p(e, t, ta(e, n), r);
				Fa(e, n);
			}
			return null;
		}
		function m(e, t, n, r, i) {
			if (typeof r == "string" && r !== "" || typeof r == "number" || typeof r == "bigint") return e = e.get(n) || null, c(t, e, "" + r, i);
			if (typeof r == "object" && r) {
				switch (r.$$typeof) {
					case _: return e = e.get(r.key === null ? n : r.key) || null, l(t, e, r, i);
					case v: return e = e.get(r.key === null ? n : r.key) || null, u(t, e, r, i);
					case re: return r = Da(r), m(e, t, n, r, i);
				}
				if (ue(r) || se(r)) return e = e.get(n) || null, d(t, e, r, i, null);
				if (typeof r.then == "function") return m(e, t, n, Na(r), i);
				if (r.$$typeof === C) return m(e, t, n, ta(t, r), i);
				Fa(t, r);
			}
			return null;
		}
		function h(i, a, s, c) {
			for (var l = null, u = null, d = a, h = a = 0, g = null; d !== null && h < s.length; h++) {
				d.index > h ? (g = d, d = null) : g = d.sibling;
				var _ = p(i, d, s[h], c);
				if (_ === null) {
					d === null && (d = g);
					break;
				}
				e && d && _.alternate === null && t(i, d), a = o(_, a, h), u === null ? l = _ : u.sibling = _, u = _, d = g;
			}
			if (h === s.length) return n(i, d), B && Oi(i, h), l;
			if (d === null) {
				for (; h < s.length; h++) d = f(i, s[h], c), d !== null && (a = o(d, a, h), u === null ? l = d : u.sibling = d, u = d);
				return B && Oi(i, h), l;
			}
			for (d = r(d); h < s.length; h++) g = m(d, i, h, s[h], c), g !== null && (e && g.alternate !== null && d.delete(g.key === null ? h : g.key), a = o(g, a, h), u === null ? l = g : u.sibling = g, u = g);
			return e && d.forEach(function(e) {
				return t(i, e);
			}), B && Oi(i, h), l;
		}
		function g(a, s, c, l) {
			if (c == null) throw Error(i(151));
			for (var u = null, d = null, h = s, g = s = 0, _ = null, v = c.next(); h !== null && !v.done; g++, v = c.next()) {
				h.index > g ? (_ = h, h = null) : _ = h.sibling;
				var y = p(a, h, v.value, l);
				if (y === null) {
					h === null && (h = _);
					break;
				}
				e && h && y.alternate === null && t(a, h), s = o(y, s, g), d === null ? u = y : d.sibling = y, d = y, h = _;
			}
			if (v.done) return n(a, h), B && Oi(a, g), u;
			if (h === null) {
				for (; !v.done; g++, v = c.next()) v = f(a, v.value, l), v !== null && (s = o(v, s, g), d === null ? u = v : d.sibling = v, d = v);
				return B && Oi(a, g), u;
			}
			for (h = r(h); !v.done; g++, v = c.next()) v = m(h, a, g, v.value, l), v !== null && (e && v.alternate !== null && h.delete(v.key === null ? g : v.key), s = o(v, s, g), d === null ? u = v : d.sibling = v, d = v);
			return e && h.forEach(function(e) {
				return t(a, e);
			}), B && Oi(a, g), u;
		}
		function b(e, r, o, c) {
			if (typeof o == "object" && o && o.type === y && o.key === null && (o = o.props.children), typeof o == "object" && o) {
				switch (o.$$typeof) {
					case _:
						a: {
							for (var l = o.key; r !== null;) {
								if (r.key === l) {
									if (l = o.type, l === y) {
										if (r.tag === 7) {
											n(e, r.sibling), c = a(r, o.props.children), c.return = e, e = c;
											break a;
										}
									} else if (r.elementType === l || typeof l == "object" && l && l.$$typeof === re && Da(l) === r.type) {
										n(e, r.sibling), c = a(r, o.props), Pa(c, o), c.return = e, e = c;
										break a;
									}
									n(e, r);
									break;
								} else t(e, r);
								r = r.sibling;
							}
							o.type === y ? (c = pi(o.props.children, e.mode, c, o.key), c.return = e, e = c) : (c = fi(o.type, o.key, o.props, null, e.mode, c), Pa(c, o), c.return = e, e = c);
						}
						return s(e);
					case v:
						a: {
							for (l = o.key; r !== null;) {
								if (r.key === l) if (r.tag === 4 && r.stateNode.containerInfo === o.containerInfo && r.stateNode.implementation === o.implementation) {
									n(e, r.sibling), c = a(r, o.children || []), c.return = e, e = c;
									break a;
								} else {
									n(e, r);
									break;
								}
								else t(e, r);
								r = r.sibling;
							}
							c = gi(o, e.mode, c), c.return = e, e = c;
						}
						return s(e);
					case re: return o = Da(o), b(e, r, o, c);
				}
				if (ue(o)) return h(e, r, o, c);
				if (se(o)) {
					if (l = se(o), typeof l != "function") throw Error(i(150));
					return o = l.call(o), g(e, r, o, c);
				}
				if (typeof o.then == "function") return b(e, r, Na(o), c);
				if (o.$$typeof === C) return b(e, r, ta(e, o), c);
				Fa(e, o);
			}
			return typeof o == "string" && o !== "" || typeof o == "number" || typeof o == "bigint" ? (o = "" + o, r !== null && r.tag === 6 ? (n(e, r.sibling), c = a(r, o), c.return = e, e = c) : (n(e, r), c = mi(o, e.mode, c), c.return = e, e = c), s(e)) : n(e, r);
		}
		return function(e, t, n, r) {
			try {
				Ma = 0;
				var i = b(e, t, n, r);
				return ja = null, i;
			} catch (t) {
				if (t === xa || t === Ca) throw t;
				var a = ci(29, t, null, e.mode);
				return a.lanes = r, a.return = e, a;
			}
		};
	}
	var La = Ia(!0), Ra = Ia(!1), za = !1;
	function Ba(e) {
		e.updateQueue = {
			baseState: e.memoizedState,
			firstBaseUpdate: null,
			lastBaseUpdate: null,
			shared: {
				pending: null,
				lanes: 0,
				hiddenCallbacks: null
			},
			callbacks: null
		};
	}
	function Va(e, t) {
		e = e.updateQueue, t.updateQueue === e && (t.updateQueue = {
			baseState: e.baseState,
			firstBaseUpdate: e.firstBaseUpdate,
			lastBaseUpdate: e.lastBaseUpdate,
			shared: e.shared,
			callbacks: null
		});
	}
	function Ha(e) {
		return {
			lane: e,
			tag: 0,
			payload: null,
			callback: null,
			next: null
		};
	}
	function Ua(e, t, n) {
		var r = e.updateQueue;
		if (r === null) return null;
		if (r = r.shared, G & 2) {
			var i = r.pending;
			return i === null ? t.next = t : (t.next = i.next, i.next = t), r.pending = t, t = ai(e), ii(e, null, n), t;
		}
		return ti(e, r, t, n), ai(e);
	}
	function Wa(e, t, n) {
		if (t = t.updateQueue, t !== null && (t = t.shared, n & 4194048)) {
			var r = t.lanes;
			r &= e.pendingLanes, n |= r, t.lanes = n, tt(e, n);
		}
	}
	function Ga(e, t) {
		var n = e.updateQueue, r = e.alternate;
		if (r !== null && (r = r.updateQueue, n === r)) {
			var i = null, a = null;
			if (n = n.firstBaseUpdate, n !== null) {
				do {
					var o = {
						lane: n.lane,
						tag: n.tag,
						payload: n.payload,
						callback: null,
						next: null
					};
					a === null ? i = a = o : a = a.next = o, n = n.next;
				} while (n !== null);
				a === null ? i = a = t : a = a.next = t;
			} else i = a = t;
			n = {
				baseState: r.baseState,
				firstBaseUpdate: i,
				lastBaseUpdate: a,
				shared: r.shared,
				callbacks: r.callbacks
			}, e.updateQueue = n;
			return;
		}
		e = n.lastBaseUpdate, e === null ? n.firstBaseUpdate = t : e.next = t, n.lastBaseUpdate = t;
	}
	var Ka = !1;
	function qa() {
		if (Ka) {
			var e = fa;
			if (e !== null) throw e;
		}
	}
	function Ja(e, t, n, r) {
		Ka = !1;
		var i = e.updateQueue;
		za = !1;
		var a = i.firstBaseUpdate, o = i.lastBaseUpdate, s = i.shared.pending;
		if (s !== null) {
			i.shared.pending = null;
			var c = s, l = c.next;
			c.next = null, o === null ? a = l : o.next = l, o = c;
			var u = e.alternate;
			u !== null && (u = u.updateQueue, s = u.lastBaseUpdate, s !== o && (s === null ? u.firstBaseUpdate = l : s.next = l, u.lastBaseUpdate = c));
		}
		if (a !== null) {
			var d = i.baseState;
			o = 0, u = l = c = null, s = a;
			do {
				var f = s.lane & -536870913, p = f !== s.lane;
				if (p ? (J & f) === f : (r & f) === f) {
					f !== 0 && f === da && (Ka = !0), u !== null && (u = u.next = {
						lane: 0,
						tag: s.tag,
						payload: s.payload,
						callback: null,
						next: null
					});
					a: {
						var m = e, g = s;
						f = t;
						var _ = n;
						switch (g.tag) {
							case 1:
								if (m = g.payload, typeof m == "function") {
									d = m.call(_, d, f);
									break a;
								}
								d = m;
								break a;
							case 3: m.flags = m.flags & -65537 | 128;
							case 0:
								if (m = g.payload, f = typeof m == "function" ? m.call(_, d, f) : m, f == null) break a;
								d = h({}, d, f);
								break a;
							case 2: za = !0;
						}
					}
					f = s.callback, f !== null && (e.flags |= 64, p && (e.flags |= 8192), p = i.callbacks, p === null ? i.callbacks = [f] : p.push(f));
				} else p = {
					lane: f,
					tag: s.tag,
					payload: s.payload,
					callback: s.callback,
					next: null
				}, u === null ? (l = u = p, c = d) : u = u.next = p, o |= f;
				if (s = s.next, s === null) {
					if (s = i.shared.pending, s === null) break;
					p = s, s = p.next, p.next = null, i.lastBaseUpdate = p, i.shared.pending = null;
				}
			} while (1);
			u === null && (c = d), i.baseState = c, i.firstBaseUpdate = l, i.lastBaseUpdate = u, a === null && (i.shared.lanes = 0), Gl |= o, e.lanes = o, e.memoizedState = d;
		}
	}
	function Ya(e, t) {
		if (typeof e != "function") throw Error(i(191, e));
		e.call(t);
	}
	function Xa(e, t) {
		var n = e.callbacks;
		if (n !== null) for (e.callbacks = null, e = 0; e < n.length; e++) Ya(n[e], t);
	}
	var Za = me(null), Qa = me(0);
	function $a(e, t) {
		e = Wl, O(Qa, e), O(Za, t), Wl = e | t.baseLanes;
	}
	function eo() {
		O(Qa, Wl), O(Za, Za.current);
	}
	function to() {
		Wl = Qa.current, D(Za), D(Qa);
	}
	var no = me(null), ro = null;
	function io(e) {
		var t = e.alternate;
		O(lo, lo.current & 1), O(no, e), ro === null && (t === null || Za.current !== null || t.memoizedState !== null) && (ro = e);
	}
	function ao(e) {
		O(lo, lo.current), O(no, e), ro === null && (ro = e);
	}
	function oo(e) {
		e.tag === 22 ? (O(lo, lo.current), O(no, e), ro === null && (ro = e)) : so(e);
	}
	function so() {
		O(lo, lo.current), O(no, no.current);
	}
	function co(e) {
		D(no), ro === e && (ro = null), D(lo);
	}
	var lo = me(0);
	function uo(e) {
		for (var t = e; t !== null;) {
			if (t.tag === 13) {
				var n = t.memoizedState;
				if (n !== null && (n = n.dehydrated, n === null || af(n) || of(n))) return t;
			} else if (t.tag === 19 && (t.memoizedProps.revealOrder === "forwards" || t.memoizedProps.revealOrder === "backwards" || t.memoizedProps.revealOrder === "unstable_legacy-backwards" || t.memoizedProps.revealOrder === "together")) {
				if (t.flags & 128) return t;
			} else if (t.child !== null) {
				t.child.return = t, t = t.child;
				continue;
			}
			if (t === e) break;
			for (; t.sibling === null;) {
				if (t.return === null || t.return === e) return null;
				t = t.return;
			}
			t.sibling.return = t.return, t = t.sibling;
		}
		return null;
	}
	var fo = 0, V = null, H = null, po = null, mo = !1, ho = !1, go = !1, _o = 0, vo = 0, yo = null, bo = 0;
	function xo() {
		throw Error(i(321));
	}
	function So(e, t) {
		if (t === null) return !1;
		for (var n = 0; n < t.length && n < e.length; n++) if (!Sr(e[n], t[n])) return !1;
		return !0;
	}
	function Co(e, t, n, r, i, a) {
		return fo = a, V = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, T.H = e === null || e.memoizedState === null ? Bs : Vs, go = !1, a = n(r, i), go = !1, ho && (a = To(t, n, r, i)), wo(e), a;
	}
	function wo(e) {
		T.H = zs;
		var t = H !== null && H.next !== null;
		if (fo = 0, po = H = V = null, mo = !1, vo = 0, yo = null, t) throw Error(i(300));
		e === null || ic || (e = e.dependencies, e !== null && Qi(e) && (ic = !0));
	}
	function To(e, t, n, r) {
		V = e;
		var a = 0;
		do {
			if (ho && (yo = null), vo = 0, ho = !1, 25 <= a) throw Error(i(301));
			if (a += 1, po = H = null, e.updateQueue != null) {
				var o = e.updateQueue;
				o.lastEffect = null, o.events = null, o.stores = null, o.memoCache != null && (o.memoCache.index = 0);
			}
			T.H = Hs, o = t(n, r);
		} while (ho);
		return o;
	}
	function Eo() {
		var e = T.H, t = e.useState()[0];
		return t = typeof t.then == "function" ? No(t) : t, e = e.useState()[0], (H === null ? null : H.memoizedState) !== e && (V.flags |= 1024), t;
	}
	function Do() {
		var e = _o !== 0;
		return _o = 0, e;
	}
	function Oo(e, t, n) {
		t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~n;
	}
	function ko(e) {
		if (mo) {
			for (e = e.memoizedState; e !== null;) {
				var t = e.queue;
				t !== null && (t.pending = null), e = e.next;
			}
			mo = !1;
		}
		fo = 0, po = H = V = null, ho = !1, vo = _o = 0, yo = null;
	}
	function Ao() {
		var e = {
			memoizedState: null,
			baseState: null,
			baseQueue: null,
			queue: null,
			next: null
		};
		return po === null ? V.memoizedState = po = e : po = po.next = e, po;
	}
	function jo() {
		if (H === null) {
			var e = V.alternate;
			e = e === null ? null : e.memoizedState;
		} else e = H.next;
		var t = po === null ? V.memoizedState : po.next;
		if (t !== null) po = t, H = e;
		else {
			if (e === null) throw V.alternate === null ? Error(i(467)) : Error(i(310));
			H = e, e = {
				memoizedState: H.memoizedState,
				baseState: H.baseState,
				baseQueue: H.baseQueue,
				queue: H.queue,
				next: null
			}, po === null ? V.memoizedState = po = e : po = po.next = e;
		}
		return po;
	}
	function Mo() {
		return {
			lastEffect: null,
			events: null,
			stores: null,
			memoCache: null
		};
	}
	function No(e) {
		var t = vo;
		return vo += 1, yo === null && (yo = []), e = Ea(yo, e, t), t = V, (po === null ? t.memoizedState : po.next) === null && (t = t.alternate, T.H = t === null || t.memoizedState === null ? Bs : Vs), e;
	}
	function Po(e) {
		if (typeof e == "object" && e) {
			if (typeof e.then == "function") return No(e);
			if (e.$$typeof === C) return ea(e);
		}
		throw Error(i(438, String(e)));
	}
	function Fo(e) {
		var t = null, n = V.updateQueue;
		if (n !== null && (t = n.memoCache), t == null) {
			var r = V.alternate;
			r !== null && (r = r.updateQueue, r !== null && (r = r.memoCache, r != null && (t = {
				data: r.data.map(function(e) {
					return e.slice();
				}),
				index: 0
			})));
		}
		if (t ??= {
			data: [],
			index: 0
		}, n === null && (n = Mo(), V.updateQueue = n), n.memoCache = t, n = t.data[t.index], n === void 0) for (n = t.data[t.index] = Array(e), r = 0; r < e; r++) n[r] = ae;
		return t.index++, n;
	}
	function Io(e, t) {
		return typeof t == "function" ? t(e) : t;
	}
	function Lo(e) {
		return Ro(jo(), H, e);
	}
	function Ro(e, t, n) {
		var r = e.queue;
		if (r === null) throw Error(i(311));
		r.lastRenderedReducer = n;
		var a = e.baseQueue, o = r.pending;
		if (o !== null) {
			if (a !== null) {
				var s = a.next;
				a.next = o.next, o.next = s;
			}
			t.baseQueue = a = o, r.pending = null;
		}
		if (o = e.baseState, a === null) e.memoizedState = o;
		else {
			t = a.next;
			var c = s = null, l = null, u = t, d = !1;
			do {
				var f = u.lane & -536870913;
				if (f === u.lane ? (fo & f) === f : (J & f) === f) {
					var p = u.revertLane;
					if (p === 0) l !== null && (l = l.next = {
						lane: 0,
						revertLane: 0,
						gesture: null,
						action: u.action,
						hasEagerState: u.hasEagerState,
						eagerState: u.eagerState,
						next: null
					}), f === da && (d = !0);
					else if ((fo & p) === p) {
						u = u.next, p === da && (d = !0);
						continue;
					} else f = {
						lane: 0,
						revertLane: u.revertLane,
						gesture: null,
						action: u.action,
						hasEagerState: u.hasEagerState,
						eagerState: u.eagerState,
						next: null
					}, l === null ? (c = l = f, s = o) : l = l.next = f, V.lanes |= p, Gl |= p;
					f = u.action, go && n(o, f), o = u.hasEagerState ? u.eagerState : n(o, f);
				} else p = {
					lane: f,
					revertLane: u.revertLane,
					gesture: u.gesture,
					action: u.action,
					hasEagerState: u.hasEagerState,
					eagerState: u.eagerState,
					next: null
				}, l === null ? (c = l = p, s = o) : l = l.next = p, V.lanes |= f, Gl |= f;
				u = u.next;
			} while (u !== null && u !== t);
			if (l === null ? s = o : l.next = c, !Sr(o, e.memoizedState) && (ic = !0, d && (n = fa, n !== null))) throw n;
			e.memoizedState = o, e.baseState = s, e.baseQueue = l, r.lastRenderedState = o;
		}
		return a === null && (r.lanes = 0), [e.memoizedState, r.dispatch];
	}
	function zo(e) {
		var t = jo(), n = t.queue;
		if (n === null) throw Error(i(311));
		n.lastRenderedReducer = e;
		var r = n.dispatch, a = n.pending, o = t.memoizedState;
		if (a !== null) {
			n.pending = null;
			var s = a = a.next;
			do
				o = e(o, s.action), s = s.next;
			while (s !== a);
			Sr(o, t.memoizedState) || (ic = !0), t.memoizedState = o, t.baseQueue === null && (t.baseState = o), n.lastRenderedState = o;
		}
		return [o, r];
	}
	function Bo(e, t, n) {
		var r = V, a = jo(), o = B;
		if (o) {
			if (n === void 0) throw Error(i(407));
			n = n();
		} else n = t();
		var s = !Sr((H || a).memoizedState, n);
		if (s && (a.memoizedState = n, ic = !0), a = a.queue, ds(Uo.bind(null, r, a, e), [e]), a.getSnapshot !== t || s || po !== null && po.memoizedState.tag & 1) {
			if (r.flags |= 2048, os(9, { destroy: void 0 }, Ho.bind(null, r, a, n, t), null), K === null) throw Error(i(349));
			o || fo & 127 || Vo(r, t, n);
		}
		return n;
	}
	function Vo(e, t, n) {
		e.flags |= 16384, e = {
			getSnapshot: t,
			value: n
		}, t = V.updateQueue, t === null ? (t = Mo(), V.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
	}
	function Ho(e, t, n, r) {
		t.value = n, t.getSnapshot = r, Wo(t) && Go(e);
	}
	function Uo(e, t, n) {
		return n(function() {
			Wo(t) && Go(e);
		});
	}
	function Wo(e) {
		var t = e.getSnapshot;
		e = e.value;
		try {
			var n = t();
			return !Sr(e, n);
		} catch {
			return !0;
		}
	}
	function Go(e) {
		var t = ri(e, 2);
		t !== null && hu(t, e, 2);
	}
	function Ko(e) {
		var t = Ao();
		if (typeof e == "function") {
			var n = e;
			if (e = n(), go) {
				j(!0);
				try {
					n();
				} finally {
					j(!1);
				}
			}
		}
		return t.memoizedState = t.baseState = e, t.queue = {
			pending: null,
			lanes: 0,
			dispatch: null,
			lastRenderedReducer: Io,
			lastRenderedState: e
		}, t;
	}
	function qo(e, t, n, r) {
		return e.baseState = n, Ro(e, H, typeof r == "function" ? r : Io);
	}
	function Jo(e, t, n, r, a) {
		if (Is(e)) throw Error(i(485));
		if (e = t.action, e !== null) {
			var o = {
				payload: a,
				action: e,
				next: null,
				isTransition: !0,
				status: "pending",
				value: null,
				reason: null,
				listeners: [],
				then: function(e) {
					o.listeners.push(e);
				}
			};
			T.T === null ? o.isTransition = !1 : n(!0), r(o), n = t.pending, n === null ? (o.next = t.pending = o, Yo(t, o)) : (o.next = n.next, t.pending = n.next = o);
		}
	}
	function Yo(e, t) {
		var n = t.action, r = t.payload, i = e.state;
		if (t.isTransition) {
			var a = T.T, o = {};
			T.T = o;
			try {
				var s = n(i, r), c = T.S;
				c !== null && c(o, s), Xo(e, t, s);
			} catch (n) {
				Qo(e, t, n);
			} finally {
				a !== null && o.types !== null && (a.types = o.types), T.T = a;
			}
		} else try {
			a = n(i, r), Xo(e, t, a);
		} catch (n) {
			Qo(e, t, n);
		}
	}
	function Xo(e, t, n) {
		typeof n == "object" && n && typeof n.then == "function" ? n.then(function(n) {
			Zo(e, t, n);
		}, function(n) {
			return Qo(e, t, n);
		}) : Zo(e, t, n);
	}
	function Zo(e, t, n) {
		t.status = "fulfilled", t.value = n, $o(t), e.state = n, t = e.pending, t !== null && (n = t.next, n === t ? e.pending = null : (n = n.next, t.next = n, Yo(e, n)));
	}
	function Qo(e, t, n) {
		var r = e.pending;
		if (e.pending = null, r !== null) {
			r = r.next;
			do
				t.status = "rejected", t.reason = n, $o(t), t = t.next;
			while (t !== r);
		}
		e.action = null;
	}
	function $o(e) {
		e = e.listeners;
		for (var t = 0; t < e.length; t++) (0, e[t])();
	}
	function es(e, t) {
		return t;
	}
	function ts(e, t) {
		if (B) {
			var n = K.formState;
			if (n !== null) {
				a: {
					var r = V;
					if (B) {
						if (z) {
							b: {
								for (var i = z, a = Fi; i.nodeType !== 8;) {
									if (!a) {
										i = null;
										break b;
									}
									if (i = cf(i.nextSibling), i === null) {
										i = null;
										break b;
									}
								}
								a = i.data, i = a === "F!" || a === "F" ? i : null;
							}
							if (i) {
								z = cf(i.nextSibling), r = i.data === "F!";
								break a;
							}
						}
						Li(r);
					}
					r = !1;
				}
				r && (t = n[0]);
			}
		}
		return n = Ao(), n.memoizedState = n.baseState = t, r = {
			pending: null,
			lanes: 0,
			dispatch: null,
			lastRenderedReducer: es,
			lastRenderedState: t
		}, n.queue = r, n = Ns.bind(null, V, r), r.dispatch = n, r = Ko(!1), a = Fs.bind(null, V, !1, r.queue), r = Ao(), i = {
			state: t,
			dispatch: null,
			action: e,
			pending: null
		}, r.queue = i, n = Jo.bind(null, V, i, a, n), i.dispatch = n, r.memoizedState = e, [
			t,
			n,
			!1
		];
	}
	function ns(e) {
		return rs(jo(), H, e);
	}
	function rs(e, t, n) {
		if (t = Ro(e, t, es)[0], e = Lo(Io)[0], typeof t == "object" && t && typeof t.then == "function") try {
			var r = No(t);
		} catch (e) {
			throw e === xa ? Ca : e;
		}
		else r = t;
		t = jo();
		var i = t.queue, a = i.dispatch;
		return n !== t.memoizedState && (V.flags |= 2048, os(9, { destroy: void 0 }, is.bind(null, i, n), null)), [
			r,
			a,
			e
		];
	}
	function is(e, t) {
		e.action = t;
	}
	function as(e) {
		var t = jo(), n = H;
		if (n !== null) return rs(t, n, e);
		jo(), t = t.memoizedState, n = jo();
		var r = n.queue.dispatch;
		return n.memoizedState = e, [
			t,
			r,
			!1
		];
	}
	function os(e, t, n, r) {
		return e = {
			tag: e,
			create: n,
			deps: r,
			inst: t,
			next: null
		}, t = V.updateQueue, t === null && (t = Mo(), V.updateQueue = t), n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e), e;
	}
	function ss() {
		return jo().memoizedState;
	}
	function cs(e, t, n, r) {
		var i = Ao();
		V.flags |= e, i.memoizedState = os(1 | t, { destroy: void 0 }, n, r === void 0 ? null : r);
	}
	function ls(e, t, n, r) {
		var i = jo();
		r = r === void 0 ? null : r;
		var a = i.memoizedState.inst;
		H !== null && r !== null && So(r, H.memoizedState.deps) ? i.memoizedState = os(t, a, n, r) : (V.flags |= e, i.memoizedState = os(1 | t, a, n, r));
	}
	function us(e, t) {
		cs(8390656, 8, e, t);
	}
	function ds(e, t) {
		ls(2048, 8, e, t);
	}
	function fs(e) {
		V.flags |= 4;
		var t = V.updateQueue;
		if (t === null) t = Mo(), V.updateQueue = t, t.events = [e];
		else {
			var n = t.events;
			n === null ? t.events = [e] : n.push(e);
		}
	}
	function ps(e) {
		var t = jo().memoizedState;
		return fs({
			ref: t,
			nextImpl: e
		}), function() {
			if (G & 2) throw Error(i(440));
			return t.impl.apply(void 0, arguments);
		};
	}
	function ms(e, t) {
		return ls(4, 2, e, t);
	}
	function hs(e, t) {
		return ls(4, 4, e, t);
	}
	function gs(e, t) {
		if (typeof t == "function") {
			e = e();
			var n = t(e);
			return function() {
				typeof n == "function" ? n() : t(null);
			};
		}
		if (t != null) return e = e(), t.current = e, function() {
			t.current = null;
		};
	}
	function _s(e, t, n) {
		n = n == null ? null : n.concat([e]), ls(4, 4, gs.bind(null, t, e), n);
	}
	function vs() {}
	function ys(e, t) {
		var n = jo();
		t = t === void 0 ? null : t;
		var r = n.memoizedState;
		return t !== null && So(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e);
	}
	function bs(e, t) {
		var n = jo();
		t = t === void 0 ? null : t;
		var r = n.memoizedState;
		if (t !== null && So(t, r[1])) return r[0];
		if (r = e(), go) {
			j(!0);
			try {
				e();
			} finally {
				j(!1);
			}
		}
		return n.memoizedState = [r, t], r;
	}
	function xs(e, t, n) {
		return n === void 0 || fo & 1073741824 && !(J & 261930) ? e.memoizedState = t : (e.memoizedState = n, e = mu(), V.lanes |= e, Gl |= e, n);
	}
	function Ss(e, t, n, r) {
		return Sr(n, t) ? n : Za.current === null ? !(fo & 42) || fo & 1073741824 && !(J & 261930) ? (ic = !0, e.memoizedState = n) : (e = mu(), V.lanes |= e, Gl |= e, t) : (e = xs(e, n, r), Sr(e, t) || (ic = !0), e);
	}
	function Cs(e, t, n, r, i) {
		var a = E.p;
		E.p = a !== 0 && 8 > a ? a : 8;
		var o = T.T, s = {};
		T.T = s, Fs(e, !1, t, n);
		try {
			var c = i(), l = T.S;
			l !== null && l(s, c), typeof c == "object" && c && typeof c.then == "function" ? Ps(e, t, ha(c, r), pu(e)) : Ps(e, t, r, pu(e));
		} catch (n) {
			Ps(e, t, {
				then: function() {},
				status: "rejected",
				reason: n
			}, pu());
		} finally {
			E.p = a, o !== null && s.types !== null && (o.types = s.types), T.T = o;
		}
	}
	function ws() {}
	function Ts(e, t, n, r) {
		if (e.tag !== 5) throw Error(i(476));
		var a = Es(e).queue;
		Cs(e, a, t, de, n === null ? ws : function() {
			return Ds(e), n(r);
		});
	}
	function Es(e) {
		var t = e.memoizedState;
		if (t !== null) return t;
		t = {
			memoizedState: de,
			baseState: de,
			baseQueue: null,
			queue: {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: Io,
				lastRenderedState: de
			},
			next: null
		};
		var n = {};
		return t.next = {
			memoizedState: n,
			baseState: n,
			baseQueue: null,
			queue: {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: Io,
				lastRenderedState: n
			},
			next: null
		}, e.memoizedState = t, e = e.alternate, e !== null && (e.memoizedState = t), t;
	}
	function Ds(e) {
		var t = Es(e);
		t.next === null && (t = e.alternate.memoizedState), Ps(e, t.next.queue, {}, pu());
	}
	function Os() {
		return ea(Qf);
	}
	function ks() {
		return jo().memoizedState;
	}
	function As() {
		return jo().memoizedState;
	}
	function js(e) {
		for (var t = e.return; t !== null;) {
			switch (t.tag) {
				case 24:
				case 3:
					var n = pu();
					e = Ha(n);
					var r = Ua(t, e, n);
					r !== null && (hu(r, t, n), Wa(r, t, n)), t = { cache: sa() }, e.payload = t;
					return;
			}
			t = t.return;
		}
	}
	function Ms(e, t, n) {
		var r = pu();
		n = {
			lane: r,
			revertLane: 0,
			gesture: null,
			action: n,
			hasEagerState: !1,
			eagerState: null,
			next: null
		}, Is(e) ? Ls(t, n) : (n = ni(e, t, n, r), n !== null && (hu(n, e, r), Rs(n, t, r)));
	}
	function Ns(e, t, n) {
		Ps(e, t, n, pu());
	}
	function Ps(e, t, n, r) {
		var i = {
			lane: r,
			revertLane: 0,
			gesture: null,
			action: n,
			hasEagerState: !1,
			eagerState: null,
			next: null
		};
		if (Is(e)) Ls(t, i);
		else {
			var a = e.alternate;
			if (e.lanes === 0 && (a === null || a.lanes === 0) && (a = t.lastRenderedReducer, a !== null)) try {
				var o = t.lastRenderedState, s = a(o, n);
				if (i.hasEagerState = !0, i.eagerState = s, Sr(s, o)) return ti(e, t, i, 0), K === null && ei(), !1;
			} catch {}
			if (n = ni(e, t, i, r), n !== null) return hu(n, e, r), Rs(n, t, r), !0;
		}
		return !1;
	}
	function Fs(e, t, n, r) {
		if (r = {
			lane: 2,
			revertLane: dd(),
			gesture: null,
			action: r,
			hasEagerState: !1,
			eagerState: null,
			next: null
		}, Is(e)) {
			if (t) throw Error(i(479));
		} else t = ni(e, n, r, 2), t !== null && hu(t, e, 2);
	}
	function Is(e) {
		var t = e.alternate;
		return e === V || t !== null && t === V;
	}
	function Ls(e, t) {
		ho = mo = !0;
		var n = e.pending;
		n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
	}
	function Rs(e, t, n) {
		if (n & 4194048) {
			var r = t.lanes;
			r &= e.pendingLanes, n |= r, t.lanes = n, tt(e, n);
		}
	}
	var zs = {
		readContext: ea,
		use: Po,
		useCallback: xo,
		useContext: xo,
		useEffect: xo,
		useImperativeHandle: xo,
		useLayoutEffect: xo,
		useInsertionEffect: xo,
		useMemo: xo,
		useReducer: xo,
		useRef: xo,
		useState: xo,
		useDebugValue: xo,
		useDeferredValue: xo,
		useTransition: xo,
		useSyncExternalStore: xo,
		useId: xo,
		useHostTransitionStatus: xo,
		useFormState: xo,
		useActionState: xo,
		useOptimistic: xo,
		useMemoCache: xo,
		useCacheRefresh: xo
	};
	zs.useEffectEvent = xo;
	var Bs = {
		readContext: ea,
		use: Po,
		useCallback: function(e, t) {
			return Ao().memoizedState = [e, t === void 0 ? null : t], e;
		},
		useContext: ea,
		useEffect: us,
		useImperativeHandle: function(e, t, n) {
			n = n == null ? null : n.concat([e]), cs(4194308, 4, gs.bind(null, t, e), n);
		},
		useLayoutEffect: function(e, t) {
			return cs(4194308, 4, e, t);
		},
		useInsertionEffect: function(e, t) {
			cs(4, 2, e, t);
		},
		useMemo: function(e, t) {
			var n = Ao();
			t = t === void 0 ? null : t;
			var r = e();
			if (go) {
				j(!0);
				try {
					e();
				} finally {
					j(!1);
				}
			}
			return n.memoizedState = [r, t], r;
		},
		useReducer: function(e, t, n) {
			var r = Ao();
			if (n !== void 0) {
				var i = n(t);
				if (go) {
					j(!0);
					try {
						n(t);
					} finally {
						j(!1);
					}
				}
			} else i = t;
			return r.memoizedState = r.baseState = i, e = {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: e,
				lastRenderedState: i
			}, r.queue = e, e = e.dispatch = Ms.bind(null, V, e), [r.memoizedState, e];
		},
		useRef: function(e) {
			var t = Ao();
			return e = { current: e }, t.memoizedState = e;
		},
		useState: function(e) {
			e = Ko(e);
			var t = e.queue, n = Ns.bind(null, V, t);
			return t.dispatch = n, [e.memoizedState, n];
		},
		useDebugValue: vs,
		useDeferredValue: function(e, t) {
			return xs(Ao(), e, t);
		},
		useTransition: function() {
			var e = Ko(!1);
			return e = Cs.bind(null, V, e.queue, !0, !1), Ao().memoizedState = e, [!1, e];
		},
		useSyncExternalStore: function(e, t, n) {
			var r = V, a = Ao();
			if (B) {
				if (n === void 0) throw Error(i(407));
				n = n();
			} else {
				if (n = t(), K === null) throw Error(i(349));
				J & 127 || Vo(r, t, n);
			}
			a.memoizedState = n;
			var o = {
				value: n,
				getSnapshot: t
			};
			return a.queue = o, us(Uo.bind(null, r, o, e), [e]), r.flags |= 2048, os(9, { destroy: void 0 }, Ho.bind(null, r, o, n, t), null), n;
		},
		useId: function() {
			var e = Ao(), t = K.identifierPrefix;
			if (B) {
				var n = Di, r = Ei;
				n = (r & ~(1 << 32 - M(r) - 1)).toString(32) + n, t = "_" + t + "R_" + n, n = _o++, 0 < n && (t += "H" + n.toString(32)), t += "_";
			} else n = bo++, t = "_" + t + "r_" + n.toString(32) + "_";
			return e.memoizedState = t;
		},
		useHostTransitionStatus: Os,
		useFormState: ts,
		useActionState: ts,
		useOptimistic: function(e) {
			var t = Ao();
			t.memoizedState = t.baseState = e;
			var n = {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: null,
				lastRenderedState: null
			};
			return t.queue = n, t = Fs.bind(null, V, !0, n), n.dispatch = t, [e, t];
		},
		useMemoCache: Fo,
		useCacheRefresh: function() {
			return Ao().memoizedState = js.bind(null, V);
		},
		useEffectEvent: function(e) {
			var t = Ao(), n = { impl: e };
			return t.memoizedState = n, function() {
				if (G & 2) throw Error(i(440));
				return n.impl.apply(void 0, arguments);
			};
		}
	}, Vs = {
		readContext: ea,
		use: Po,
		useCallback: ys,
		useContext: ea,
		useEffect: ds,
		useImperativeHandle: _s,
		useInsertionEffect: ms,
		useLayoutEffect: hs,
		useMemo: bs,
		useReducer: Lo,
		useRef: ss,
		useState: function() {
			return Lo(Io);
		},
		useDebugValue: vs,
		useDeferredValue: function(e, t) {
			return Ss(jo(), H.memoizedState, e, t);
		},
		useTransition: function() {
			var e = Lo(Io)[0], t = jo().memoizedState;
			return [typeof e == "boolean" ? e : No(e), t];
		},
		useSyncExternalStore: Bo,
		useId: ks,
		useHostTransitionStatus: Os,
		useFormState: ns,
		useActionState: ns,
		useOptimistic: function(e, t) {
			return qo(jo(), H, e, t);
		},
		useMemoCache: Fo,
		useCacheRefresh: As
	};
	Vs.useEffectEvent = ps;
	var Hs = {
		readContext: ea,
		use: Po,
		useCallback: ys,
		useContext: ea,
		useEffect: ds,
		useImperativeHandle: _s,
		useInsertionEffect: ms,
		useLayoutEffect: hs,
		useMemo: bs,
		useReducer: zo,
		useRef: ss,
		useState: function() {
			return zo(Io);
		},
		useDebugValue: vs,
		useDeferredValue: function(e, t) {
			var n = jo();
			return H === null ? xs(n, e, t) : Ss(n, H.memoizedState, e, t);
		},
		useTransition: function() {
			var e = zo(Io)[0], t = jo().memoizedState;
			return [typeof e == "boolean" ? e : No(e), t];
		},
		useSyncExternalStore: Bo,
		useId: ks,
		useHostTransitionStatus: Os,
		useFormState: as,
		useActionState: as,
		useOptimistic: function(e, t) {
			var n = jo();
			return H === null ? (n.baseState = e, [e, n.queue.dispatch]) : qo(n, H, e, t);
		},
		useMemoCache: Fo,
		useCacheRefresh: As
	};
	Hs.useEffectEvent = ps;
	function Us(e, t, n, r) {
		t = e.memoizedState, n = n(r, t), n = n == null ? t : h({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
	}
	var Ws = {
		enqueueSetState: function(e, t, n) {
			e = e._reactInternals;
			var r = pu(), i = Ha(r);
			i.payload = t, n != null && (i.callback = n), t = Ua(e, i, r), t !== null && (hu(t, e, r), Wa(t, e, r));
		},
		enqueueReplaceState: function(e, t, n) {
			e = e._reactInternals;
			var r = pu(), i = Ha(r);
			i.tag = 1, i.payload = t, n != null && (i.callback = n), t = Ua(e, i, r), t !== null && (hu(t, e, r), Wa(t, e, r));
		},
		enqueueForceUpdate: function(e, t) {
			e = e._reactInternals;
			var n = pu(), r = Ha(n);
			r.tag = 2, t != null && (r.callback = t), t = Ua(e, r, n), t !== null && (hu(t, e, n), Wa(t, e, n));
		}
	};
	function Gs(e, t, n, r, i, a, o) {
		return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, a, o) : t.prototype && t.prototype.isPureReactComponent ? !Cr(n, r) || !Cr(i, a) : !0;
	}
	function Ks(e, t, n, r) {
		e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== e && Ws.enqueueReplaceState(t, t.state, null);
	}
	function qs(e, t) {
		var n = t;
		if ("ref" in t) for (var r in n = {}, t) r !== "ref" && (n[r] = t[r]);
		if (e = e.defaultProps) for (var i in n === t && (n = h({}, n)), e) n[i] === void 0 && (n[i] = e[i]);
		return n;
	}
	function Js(e) {
		Xr(e);
	}
	function Ys(e) {
		console.error(e);
	}
	function Xs(e) {
		Xr(e);
	}
	function Zs(e, t) {
		try {
			var n = e.onUncaughtError;
			n(t.value, { componentStack: t.stack });
		} catch (e) {
			setTimeout(function() {
				throw e;
			});
		}
	}
	function Qs(e, t, n) {
		try {
			var r = e.onCaughtError;
			r(n.value, {
				componentStack: n.stack,
				errorBoundary: t.tag === 1 ? t.stateNode : null
			});
		} catch (e) {
			setTimeout(function() {
				throw e;
			});
		}
	}
	function $s(e, t, n) {
		return n = Ha(n), n.tag = 3, n.payload = { element: null }, n.callback = function() {
			Zs(e, t);
		}, n;
	}
	function ec(e) {
		return e = Ha(e), e.tag = 3, e;
	}
	function tc(e, t, n, r) {
		var i = n.type.getDerivedStateFromError;
		if (typeof i == "function") {
			var a = r.value;
			e.payload = function() {
				return i(a);
			}, e.callback = function() {
				Qs(t, n, r);
			};
		}
		var o = n.stateNode;
		o !== null && typeof o.componentDidCatch == "function" && (e.callback = function() {
			Qs(t, n, r), typeof i != "function" && (ru === null ? ru = new Set([this]) : ru.add(this));
			var e = r.stack;
			this.componentDidCatch(r.value, { componentStack: e === null ? "" : e });
		});
	}
	function nc(e, t, n, r, a) {
		if (n.flags |= 32768, typeof r == "object" && r && typeof r.then == "function") {
			if (t = n.alternate, t !== null && Zi(t, n, a, !0), n = no.current, n !== null) {
				switch (n.tag) {
					case 31:
					case 13: return ro === null ? Du() : n.alternate === null && X === 0 && (X = 3), n.flags &= -257, n.flags |= 65536, n.lanes = a, r === wa ? n.flags |= 16384 : (t = n.updateQueue, t === null ? n.updateQueue = new Set([r]) : t.add(r), Gu(e, r, a)), !1;
					case 22: return n.flags |= 65536, r === wa ? n.flags |= 16384 : (t = n.updateQueue, t === null ? (t = {
						transitions: null,
						markerInstances: null,
						retryQueue: new Set([r])
					}, n.updateQueue = t) : (n = t.retryQueue, n === null ? t.retryQueue = new Set([r]) : n.add(r)), Gu(e, r, a)), !1;
				}
				throw Error(i(435, n.tag));
			}
			return Gu(e, r, a), Du(), !1;
		}
		if (B) return t = no.current, t === null ? (r !== Ii && (t = Error(i(423), { cause: r }), Ui(vi(t, n))), e = e.current.alternate, e.flags |= 65536, a &= -a, e.lanes |= a, r = vi(r, n), a = $s(e.stateNode, r, a), Ga(e, a), X !== 4 && (X = 2)) : (!(t.flags & 65536) && (t.flags |= 256), t.flags |= 65536, t.lanes = a, r !== Ii && (e = Error(i(422), { cause: r }), Ui(vi(e, n)))), !1;
		var o = Error(i(520), { cause: r });
		if (o = vi(o, n), Xl === null ? Xl = [o] : Xl.push(o), X !== 4 && (X = 2), t === null) return !0;
		r = vi(r, n), n = t;
		do {
			switch (n.tag) {
				case 3: return n.flags |= 65536, e = a & -a, n.lanes |= e, e = $s(n.stateNode, r, e), Ga(n, e), !1;
				case 1: if (t = n.type, o = n.stateNode, !(n.flags & 128) && (typeof t.getDerivedStateFromError == "function" || o !== null && typeof o.componentDidCatch == "function" && (ru === null || !ru.has(o)))) return n.flags |= 65536, a &= -a, n.lanes |= a, a = ec(a), tc(a, e, n, r), Ga(n, a), !1;
			}
			n = n.return;
		} while (n !== null);
		return !1;
	}
	var rc = Error(i(461)), ic = !1;
	function ac(e, t, n, r) {
		t.child = e === null ? Ra(t, null, n, r) : La(t, e.child, n, r);
	}
	function oc(e, t, n, r, i) {
		n = n.render;
		var a = t.ref;
		if ("ref" in r) {
			var o = {};
			for (var s in r) s !== "ref" && (o[s] = r[s]);
		} else o = r;
		return $i(t), r = Co(e, t, n, o, a, i), s = Do(), e !== null && !ic ? (Oo(e, t, i), Ac(e, t, i)) : (B && s && Ai(t), t.flags |= 1, ac(e, t, r, i), t.child);
	}
	function sc(e, t, n, r, i) {
		if (e === null) {
			var a = n.type;
			return typeof a == "function" && !li(a) && a.defaultProps === void 0 && n.compare === null ? (t.tag = 15, t.type = a, cc(e, t, a, r, i)) : (e = fi(n.type, null, r, t, t.mode, i), e.ref = t.ref, e.return = t, t.child = e);
		}
		if (a = e.child, !jc(e, i)) {
			var o = a.memoizedProps;
			if (n = n.compare, n = n === null ? Cr : n, n(o, r) && e.ref === t.ref) return Ac(e, t, i);
		}
		return t.flags |= 1, e = ui(a, r), e.ref = t.ref, e.return = t, t.child = e;
	}
	function cc(e, t, n, r, i) {
		if (e !== null) {
			var a = e.memoizedProps;
			if (Cr(a, r) && e.ref === t.ref) if (ic = !1, t.pendingProps = r = a, jc(e, i)) e.flags & 131072 && (ic = !0);
			else return t.lanes = e.lanes, Ac(e, t, i);
		}
		return gc(e, t, n, r, i);
	}
	function lc(e, t, n, r) {
		var i = r.children, a = e === null ? null : e.memoizedState;
		if (e === null && t.stateNode === null && (t.stateNode = {
			_visibility: 1,
			_pendingMarkers: null,
			_retryCache: null,
			_transitions: null
		}), r.mode === "hidden") {
			if (t.flags & 128) {
				if (a = a === null ? n : a.baseLanes | n, e !== null) {
					for (r = t.child = e.child, i = 0; r !== null;) i = i | r.lanes | r.childLanes, r = r.sibling;
					r = i & ~a;
				} else r = 0, t.child = null;
				return dc(e, t, a, n, r);
			}
			if (n & 536870912) t.memoizedState = {
				baseLanes: 0,
				cachePool: null
			}, e !== null && ya(t, a === null ? null : a.cachePool), a === null ? eo() : $a(t, a), oo(t);
			else return r = t.lanes = 536870912, dc(e, t, a === null ? n : a.baseLanes | n, n, r);
		} else a === null ? (e !== null && ya(t, null), eo(), so(t)) : (ya(t, a.cachePool), $a(t, a), so(t), t.memoizedState = null);
		return ac(e, t, i, n), t.child;
	}
	function uc(e, t) {
		return e !== null && e.tag === 22 || t.stateNode !== null || (t.stateNode = {
			_visibility: 1,
			_pendingMarkers: null,
			_retryCache: null,
			_transitions: null
		}), t.sibling;
	}
	function dc(e, t, n, r, i) {
		var a = va();
		return a = a === null ? null : {
			parent: oa._currentValue,
			pool: a
		}, t.memoizedState = {
			baseLanes: n,
			cachePool: a
		}, e !== null && ya(t, null), eo(), oo(t), e !== null && Zi(e, t, r, !0), t.childLanes = i, null;
	}
	function fc(e, t) {
		return t = Tc({
			mode: t.mode,
			children: t.children
		}, e.mode), t.ref = e.ref, e.child = t, t.return = e, t;
	}
	function pc(e, t, n) {
		return La(t, e.child, null, n), e = fc(t, t.pendingProps), e.flags |= 2, co(t), t.memoizedState = null, e;
	}
	function mc(e, t, n) {
		var r = t.pendingProps, a = (t.flags & 128) != 0;
		if (t.flags &= -129, e === null) {
			if (B) {
				if (r.mode === "hidden") return e = fc(t, r), t.lanes = 536870912, uc(null, e);
				if (ao(t), (e = z) ? (e = rf(e, Fi), e = e !== null && e.data === "&" ? e : null, e !== null && (t.memoizedState = {
					dehydrated: e,
					treeContext: Ti === null ? null : {
						id: Ei,
						overflow: Di
					},
					retryLane: 536870912,
					hydrationErrors: null
				}, n = hi(e), n.return = t, t.child = n, Ni = t, z = null)) : e = null, e === null) throw Li(t);
				return t.lanes = 536870912, null;
			}
			return fc(t, r);
		}
		var o = e.memoizedState;
		if (o !== null) {
			var s = o.dehydrated;
			if (ao(t), a) if (t.flags & 256) t.flags &= -257, t = pc(e, t, n);
			else if (t.memoizedState !== null) t.child = e.child, t.flags |= 128, t = null;
			else throw Error(i(558));
			else if (ic || Zi(e, t, n, !1), a = (n & e.childLanes) !== 0, ic || a) {
				if (r = K, r !== null && (s = nt(r, n), s !== 0 && s !== o.retryLane)) throw o.retryLane = s, ri(e, s), hu(r, e, s), rc;
				Du(), t = pc(e, t, n);
			} else e = o.treeContext, z = cf(s.nextSibling), Ni = t, B = !0, Pi = null, Fi = !1, e !== null && Mi(t, e), t = fc(t, r), t.flags |= 4096;
			return t;
		}
		return e = ui(e.child, {
			mode: r.mode,
			children: r.children
		}), e.ref = t.ref, t.child = e, e.return = t, e;
	}
	function hc(e, t) {
		var n = t.ref;
		if (n === null) e !== null && e.ref !== null && (t.flags |= 4194816);
		else {
			if (typeof n != "function" && typeof n != "object") throw Error(i(284));
			(e === null || e.ref !== n) && (t.flags |= 4194816);
		}
	}
	function gc(e, t, n, r, i) {
		return $i(t), n = Co(e, t, n, r, void 0, i), r = Do(), e !== null && !ic ? (Oo(e, t, i), Ac(e, t, i)) : (B && r && Ai(t), t.flags |= 1, ac(e, t, n, i), t.child);
	}
	function _c(e, t, n, r, i, a) {
		return $i(t), t.updateQueue = null, n = To(t, r, n, i), wo(e), r = Do(), e !== null && !ic ? (Oo(e, t, a), Ac(e, t, a)) : (B && r && Ai(t), t.flags |= 1, ac(e, t, n, a), t.child);
	}
	function vc(e, t, n, r, i) {
		if ($i(t), t.stateNode === null) {
			var a = oi, o = n.contextType;
			typeof o == "object" && o && (a = ea(o)), a = new n(r, a), t.memoizedState = a.state !== null && a.state !== void 0 ? a.state : null, a.updater = Ws, t.stateNode = a, a._reactInternals = t, a = t.stateNode, a.props = r, a.state = t.memoizedState, a.refs = {}, Ba(t), o = n.contextType, a.context = typeof o == "object" && o ? ea(o) : oi, a.state = t.memoizedState, o = n.getDerivedStateFromProps, typeof o == "function" && (Us(t, n, o, r), a.state = t.memoizedState), typeof n.getDerivedStateFromProps == "function" || typeof a.getSnapshotBeforeUpdate == "function" || typeof a.UNSAFE_componentWillMount != "function" && typeof a.componentWillMount != "function" || (o = a.state, typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount(), o !== a.state && Ws.enqueueReplaceState(a, a.state, null), Ja(t, r, a, i), qa(), a.state = t.memoizedState), typeof a.componentDidMount == "function" && (t.flags |= 4194308), r = !0;
		} else if (e === null) {
			a = t.stateNode;
			var s = t.memoizedProps, c = qs(n, s);
			a.props = c;
			var l = a.context, u = n.contextType;
			o = oi, typeof u == "object" && u && (o = ea(u));
			var d = n.getDerivedStateFromProps;
			u = typeof d == "function" || typeof a.getSnapshotBeforeUpdate == "function", s = t.pendingProps !== s, u || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (s || l !== o) && Ks(t, a, r, o), za = !1;
			var f = t.memoizedState;
			a.state = f, Ja(t, r, a, i), qa(), l = t.memoizedState, s || f !== l || za ? (typeof d == "function" && (Us(t, n, d, r), l = t.memoizedState), (c = za || Gs(t, n, c, r, f, l, o)) ? (u || typeof a.UNSAFE_componentWillMount != "function" && typeof a.componentWillMount != "function" || (typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount()), typeof a.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = r, t.memoizedState = l), a.props = r, a.state = l, a.context = o, r = c) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), r = !1);
		} else {
			a = t.stateNode, Va(e, t), o = t.memoizedProps, u = qs(n, o), a.props = u, d = t.pendingProps, f = a.context, l = n.contextType, c = oi, typeof l == "object" && l && (c = ea(l)), s = n.getDerivedStateFromProps, (l = typeof s == "function" || typeof a.getSnapshotBeforeUpdate == "function") || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (o !== d || f !== c) && Ks(t, a, r, c), za = !1, f = t.memoizedState, a.state = f, Ja(t, r, a, i), qa();
			var p = t.memoizedState;
			o !== d || f !== p || za || e !== null && e.dependencies !== null && Qi(e.dependencies) ? (typeof s == "function" && (Us(t, n, s, r), p = t.memoizedState), (u = za || Gs(t, n, u, r, f, p, c) || e !== null && e.dependencies !== null && Qi(e.dependencies)) ? (l || typeof a.UNSAFE_componentWillUpdate != "function" && typeof a.componentWillUpdate != "function" || (typeof a.componentWillUpdate == "function" && a.componentWillUpdate(r, p, c), typeof a.UNSAFE_componentWillUpdate == "function" && a.UNSAFE_componentWillUpdate(r, p, c)), typeof a.componentDidUpdate == "function" && (t.flags |= 4), typeof a.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof a.componentDidUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = p), a.props = r, a.state = p, a.context = c, r = u) : (typeof a.componentDidUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 1024), r = !1);
		}
		return a = r, hc(e, t), r = (t.flags & 128) != 0, a || r ? (a = t.stateNode, n = r && typeof n.getDerivedStateFromError != "function" ? null : a.render(), t.flags |= 1, e !== null && r ? (t.child = La(t, e.child, null, i), t.child = La(t, null, n, i)) : ac(e, t, n, i), t.memoizedState = a.state, e = t.child) : e = Ac(e, t, i), e;
	}
	function yc(e, t, n, r) {
		return Vi(), t.flags |= 256, ac(e, t, n, r), t.child;
	}
	var bc = {
		dehydrated: null,
		treeContext: null,
		retryLane: 0,
		hydrationErrors: null
	};
	function xc(e) {
		return {
			baseLanes: e,
			cachePool: ba()
		};
	}
	function Sc(e, t, n) {
		return e = e === null ? 0 : e.childLanes & ~n, t && (e |= Jl), e;
	}
	function Cc(e, t, n) {
		var r = t.pendingProps, a = !1, o = (t.flags & 128) != 0, s;
		if ((s = o) || (s = e !== null && e.memoizedState === null ? !1 : (lo.current & 2) != 0), s && (a = !0, t.flags &= -129), s = (t.flags & 32) != 0, t.flags &= -33, e === null) {
			if (B) {
				if (a ? io(t) : so(t), (e = z) ? (e = rf(e, Fi), e = e !== null && e.data !== "&" ? e : null, e !== null && (t.memoizedState = {
					dehydrated: e,
					treeContext: Ti === null ? null : {
						id: Ei,
						overflow: Di
					},
					retryLane: 536870912,
					hydrationErrors: null
				}, n = hi(e), n.return = t, t.child = n, Ni = t, z = null)) : e = null, e === null) throw Li(t);
				return of(e) ? t.lanes = 32 : t.lanes = 536870912, null;
			}
			var c = r.children;
			return r = r.fallback, a ? (so(t), a = t.mode, c = Tc({
				mode: "hidden",
				children: c
			}, a), r = pi(r, a, n, null), c.return = t, r.return = t, c.sibling = r, t.child = c, r = t.child, r.memoizedState = xc(n), r.childLanes = Sc(e, s, n), t.memoizedState = bc, uc(null, r)) : (io(t), wc(t, c));
		}
		var l = e.memoizedState;
		if (l !== null && (c = l.dehydrated, c !== null)) {
			if (o) t.flags & 256 ? (io(t), t.flags &= -257, t = Ec(e, t, n)) : t.memoizedState === null ? (so(t), c = r.fallback, a = t.mode, r = Tc({
				mode: "visible",
				children: r.children
			}, a), c = pi(c, a, n, null), c.flags |= 2, r.return = t, c.return = t, r.sibling = c, t.child = r, La(t, e.child, null, n), r = t.child, r.memoizedState = xc(n), r.childLanes = Sc(e, s, n), t.memoizedState = bc, t = uc(null, r)) : (so(t), t.child = e.child, t.flags |= 128, t = null);
			else if (io(t), of(c)) {
				if (s = c.nextSibling && c.nextSibling.dataset, s) var u = s.dgst;
				s = u, r = Error(i(419)), r.stack = "", r.digest = s, Ui({
					value: r,
					source: null,
					stack: null
				}), t = Ec(e, t, n);
			} else if (ic || Zi(e, t, n, !1), s = (n & e.childLanes) !== 0, ic || s) {
				if (s = K, s !== null && (r = nt(s, n), r !== 0 && r !== l.retryLane)) throw l.retryLane = r, ri(e, r), hu(s, e, r), rc;
				af(c) || Du(), t = Ec(e, t, n);
			} else af(c) ? (t.flags |= 192, t.child = e.child, t = null) : (e = l.treeContext, z = cf(c.nextSibling), Ni = t, B = !0, Pi = null, Fi = !1, e !== null && Mi(t, e), t = wc(t, r.children), t.flags |= 4096);
			return t;
		}
		return a ? (so(t), c = r.fallback, a = t.mode, l = e.child, u = l.sibling, r = ui(l, {
			mode: "hidden",
			children: r.children
		}), r.subtreeFlags = l.subtreeFlags & 65011712, u === null ? (c = pi(c, a, n, null), c.flags |= 2) : c = ui(u, c), c.return = t, r.return = t, r.sibling = c, t.child = r, uc(null, r), r = t.child, c = e.child.memoizedState, c === null ? c = xc(n) : (a = c.cachePool, a === null ? a = ba() : (l = oa._currentValue, a = a.parent === l ? a : {
			parent: l,
			pool: l
		}), c = {
			baseLanes: c.baseLanes | n,
			cachePool: a
		}), r.memoizedState = c, r.childLanes = Sc(e, s, n), t.memoizedState = bc, uc(e.child, r)) : (io(t), n = e.child, e = n.sibling, n = ui(n, {
			mode: "visible",
			children: r.children
		}), n.return = t, n.sibling = null, e !== null && (s = t.deletions, s === null ? (t.deletions = [e], t.flags |= 16) : s.push(e)), t.child = n, t.memoizedState = null, n);
	}
	function wc(e, t) {
		return t = Tc({
			mode: "visible",
			children: t
		}, e.mode), t.return = e, e.child = t;
	}
	function Tc(e, t) {
		return e = ci(22, e, null, t), e.lanes = 0, e;
	}
	function Ec(e, t, n) {
		return La(t, e.child, null, n), e = wc(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
	}
	function Dc(e, t, n) {
		e.lanes |= t;
		var r = e.alternate;
		r !== null && (r.lanes |= t), Yi(e.return, t, n);
	}
	function Oc(e, t, n, r, i, a) {
		var o = e.memoizedState;
		o === null ? e.memoizedState = {
			isBackwards: t,
			rendering: null,
			renderingStartTime: 0,
			last: r,
			tail: n,
			tailMode: i,
			treeForkCount: a
		} : (o.isBackwards = t, o.rendering = null, o.renderingStartTime = 0, o.last = r, o.tail = n, o.tailMode = i, o.treeForkCount = a);
	}
	function kc(e, t, n) {
		var r = t.pendingProps, i = r.revealOrder, a = r.tail;
		r = r.children;
		var o = lo.current, s = (o & 2) != 0;
		if (s ? (o = o & 1 | 2, t.flags |= 128) : o &= 1, O(lo, o), ac(e, t, r, n), r = B ? Si : 0, !s && e !== null && e.flags & 128) a: for (e = t.child; e !== null;) {
			if (e.tag === 13) e.memoizedState !== null && Dc(e, n, t);
			else if (e.tag === 19) Dc(e, n, t);
			else if (e.child !== null) {
				e.child.return = e, e = e.child;
				continue;
			}
			if (e === t) break a;
			for (; e.sibling === null;) {
				if (e.return === null || e.return === t) break a;
				e = e.return;
			}
			e.sibling.return = e.return, e = e.sibling;
		}
		switch (i) {
			case "forwards":
				for (n = t.child, i = null; n !== null;) e = n.alternate, e !== null && uo(e) === null && (i = n), n = n.sibling;
				n = i, n === null ? (i = t.child, t.child = null) : (i = n.sibling, n.sibling = null), Oc(t, !1, i, n, a, r);
				break;
			case "backwards":
			case "unstable_legacy-backwards":
				for (n = null, i = t.child, t.child = null; i !== null;) {
					if (e = i.alternate, e !== null && uo(e) === null) {
						t.child = i;
						break;
					}
					e = i.sibling, i.sibling = n, n = i, i = e;
				}
				Oc(t, !0, n, null, a, r);
				break;
			case "together":
				Oc(t, !1, null, null, void 0, r);
				break;
			default: t.memoizedState = null;
		}
		return t.child;
	}
	function Ac(e, t, n) {
		if (e !== null && (t.dependencies = e.dependencies), Gl |= t.lanes, (n & t.childLanes) === 0) if (e !== null) {
			if (Zi(e, t, n, !1), (n & t.childLanes) === 0) return null;
		} else return null;
		if (e !== null && t.child !== e.child) throw Error(i(153));
		if (t.child !== null) {
			for (e = t.child, n = ui(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null;) e = e.sibling, n = n.sibling = ui(e, e.pendingProps), n.return = t;
			n.sibling = null;
		}
		return t.child;
	}
	function jc(e, t) {
		return (e.lanes & t) === 0 ? (e = e.dependencies, !!(e !== null && Qi(e))) : !0;
	}
	function Mc(e, t, n) {
		switch (t.tag) {
			case 3:
				_e(t, t.stateNode.containerInfo), qi(t, oa, e.memoizedState.cache), Vi();
				break;
			case 27:
			case 5:
				ye(t);
				break;
			case 4:
				_e(t, t.stateNode.containerInfo);
				break;
			case 10:
				qi(t, t.type, t.memoizedProps.value);
				break;
			case 31:
				if (t.memoizedState !== null) return t.flags |= 128, ao(t), null;
				break;
			case 13:
				var r = t.memoizedState;
				if (r !== null) return r.dehydrated === null ? (n & t.child.childLanes) === 0 ? (io(t), e = Ac(e, t, n), e === null ? null : e.sibling) : Cc(e, t, n) : (io(t), t.flags |= 128, null);
				io(t);
				break;
			case 19:
				var i = (e.flags & 128) != 0;
				if (r = (n & t.childLanes) !== 0, r ||= (Zi(e, t, n, !1), (n & t.childLanes) !== 0), i) {
					if (r) return kc(e, t, n);
					t.flags |= 128;
				}
				if (i = t.memoizedState, i !== null && (i.rendering = null, i.tail = null, i.lastEffect = null), O(lo, lo.current), r) break;
				return null;
			case 22: return t.lanes = 0, lc(e, t, n, t.pendingProps);
			case 24: qi(t, oa, e.memoizedState.cache);
		}
		return Ac(e, t, n);
	}
	function Nc(e, t, n) {
		if (e !== null) if (e.memoizedProps !== t.pendingProps) ic = !0;
		else {
			if (!jc(e, n) && !(t.flags & 128)) return ic = !1, Mc(e, t, n);
			ic = !!(e.flags & 131072);
		}
		else ic = !1, B && t.flags & 1048576 && ki(t, Si, t.index);
		switch (t.lanes = 0, t.tag) {
			case 16:
				a: {
					var r = t.pendingProps;
					if (e = Da(t.elementType), t.type = e, typeof e == "function") li(e) ? (r = qs(e, r), t.tag = 1, t = vc(null, t, e, r, n)) : (t.tag = 0, t = gc(null, t, e, r, n));
					else {
						if (e != null) {
							var a = e.$$typeof;
							if (a === w) {
								t.tag = 11, t = oc(null, t, e, r, n);
								break a;
							} else if (a === ne) {
								t.tag = 14, t = sc(null, t, e, r, n);
								break a;
							}
						}
						throw t = le(e) || e, Error(i(306, t, ""));
					}
				}
				return t;
			case 0: return gc(e, t, t.type, t.pendingProps, n);
			case 1: return r = t.type, a = qs(r, t.pendingProps), vc(e, t, r, a, n);
			case 3:
				a: {
					if (_e(t, t.stateNode.containerInfo), e === null) throw Error(i(387));
					r = t.pendingProps;
					var o = t.memoizedState;
					a = o.element, Va(e, t), Ja(t, r, null, n);
					var s = t.memoizedState;
					if (r = s.cache, qi(t, oa, r), r !== o.cache && Xi(t, [oa], n, !0), qa(), r = s.element, o.isDehydrated) if (o = {
						element: r,
						isDehydrated: !1,
						cache: s.cache
					}, t.updateQueue.baseState = o, t.memoizedState = o, t.flags & 256) {
						t = yc(e, t, r, n);
						break a;
					} else if (r !== a) {
						a = vi(Error(i(424)), t), Ui(a), t = yc(e, t, r, n);
						break a;
					} else {
						switch (e = t.stateNode.containerInfo, e.nodeType) {
							case 9:
								e = e.body;
								break;
							default: e = e.nodeName === "HTML" ? e.ownerDocument.body : e;
						}
						for (z = cf(e.firstChild), Ni = t, B = !0, Pi = null, Fi = !0, n = Ra(t, null, r, n), t.child = n; n;) n.flags = n.flags & -3 | 4096, n = n.sibling;
					}
					else {
						if (Vi(), r === a) {
							t = Ac(e, t, n);
							break a;
						}
						ac(e, t, r, n);
					}
					t = t.child;
				}
				return t;
			case 26: return hc(e, t), e === null ? (n = kf(t.type, null, t.pendingProps, null)) ? t.memoizedState = n : B || (n = t.type, e = t.pendingProps, r = Bd(A.current).createElement(n), r[ct] = t, r[L] = e, Pd(r, n, e), bt(r), t.stateNode = r) : t.memoizedState = kf(t.type, e.memoizedProps, t.pendingProps, e.memoizedState), null;
			case 27: return ye(t), e === null && B && (r = t.stateNode = ff(t.type, t.pendingProps, A.current), Ni = t, Fi = !0, a = z, Zd(t.type) ? (lf = a, z = cf(r.firstChild)) : z = a), ac(e, t, t.pendingProps.children, n), hc(e, t), e === null && (t.flags |= 4194304), t.child;
			case 5: return e === null && B && ((a = r = z) && (r = tf(r, t.type, t.pendingProps, Fi), r === null ? a = !1 : (t.stateNode = r, Ni = t, z = cf(r.firstChild), Fi = !1, a = !0)), a || Li(t)), ye(t), a = t.type, o = t.pendingProps, s = e === null ? null : e.memoizedProps, r = o.children, Ud(a, o) ? r = null : s !== null && Ud(a, s) && (t.flags |= 32), t.memoizedState !== null && (a = Co(e, t, Eo, null, null, n), Qf._currentValue = a), hc(e, t), ac(e, t, r, n), t.child;
			case 6: return e === null && B && ((e = n = z) && (n = nf(n, t.pendingProps, Fi), n === null ? e = !1 : (t.stateNode = n, Ni = t, z = null, e = !0)), e || Li(t)), null;
			case 13: return Cc(e, t, n);
			case 4: return _e(t, t.stateNode.containerInfo), r = t.pendingProps, e === null ? t.child = La(t, null, r, n) : ac(e, t, r, n), t.child;
			case 11: return oc(e, t, t.type, t.pendingProps, n);
			case 7: return ac(e, t, t.pendingProps, n), t.child;
			case 8: return ac(e, t, t.pendingProps.children, n), t.child;
			case 12: return ac(e, t, t.pendingProps.children, n), t.child;
			case 10: return r = t.pendingProps, qi(t, t.type, r.value), ac(e, t, r.children, n), t.child;
			case 9: return a = t.type._context, r = t.pendingProps.children, $i(t), a = ea(a), r = r(a), t.flags |= 1, ac(e, t, r, n), t.child;
			case 14: return sc(e, t, t.type, t.pendingProps, n);
			case 15: return cc(e, t, t.type, t.pendingProps, n);
			case 19: return kc(e, t, n);
			case 31: return mc(e, t, n);
			case 22: return lc(e, t, n, t.pendingProps);
			case 24: return $i(t), r = ea(oa), e === null ? (a = va(), a === null && (a = K, o = sa(), a.pooledCache = o, o.refCount++, o !== null && (a.pooledCacheLanes |= n), a = o), t.memoizedState = {
				parent: r,
				cache: a
			}, Ba(t), qi(t, oa, a)) : ((e.lanes & n) !== 0 && (Va(e, t), Ja(t, null, null, n), qa()), a = e.memoizedState, o = t.memoizedState, a.parent === r ? (r = o.cache, qi(t, oa, r), r !== a.cache && Xi(t, [oa], n, !0)) : (a = {
				parent: r,
				cache: r
			}, t.memoizedState = a, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = a), qi(t, oa, r))), ac(e, t, t.pendingProps.children, n), t.child;
			case 29: throw t.pendingProps;
		}
		throw Error(i(156, t.tag));
	}
	function Pc(e) {
		e.flags |= 4;
	}
	function Fc(e, t, n, r, i) {
		if ((t = (e.mode & 32) != 0) && (t = !1), t) {
			if (e.flags |= 16777216, (i & 335544128) === i) if (e.stateNode.complete) e.flags |= 8192;
			else if (wu()) e.flags |= 8192;
			else throw Oa = wa, Sa;
		} else e.flags &= -16777217;
	}
	function Ic(e, t) {
		if (t.type !== "stylesheet" || t.state.loading & 4) e.flags &= -16777217;
		else if (e.flags |= 16777216, !Wf(t)) if (wu()) e.flags |= 8192;
		else throw Oa = wa, Sa;
	}
	function Lc(e, t) {
		t !== null && (e.flags |= 4), e.flags & 16384 && (t = e.tag === 22 ? 536870912 : Xe(), e.lanes |= t, Yl |= t);
	}
	function Rc(e, t) {
		if (!B) switch (e.tailMode) {
			case "hidden":
				t = e.tail;
				for (var n = null; t !== null;) t.alternate !== null && (n = t), t = t.sibling;
				n === null ? e.tail = null : n.sibling = null;
				break;
			case "collapsed":
				n = e.tail;
				for (var r = null; n !== null;) n.alternate !== null && (r = n), n = n.sibling;
				r === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : r.sibling = null;
		}
	}
	function U(e) {
		var t = e.alternate !== null && e.alternate.child === e.child, n = 0, r = 0;
		if (t) for (var i = e.child; i !== null;) n |= i.lanes | i.childLanes, r |= i.subtreeFlags & 65011712, r |= i.flags & 65011712, i.return = e, i = i.sibling;
		else for (i = e.child; i !== null;) n |= i.lanes | i.childLanes, r |= i.subtreeFlags, r |= i.flags, i.return = e, i = i.sibling;
		return e.subtreeFlags |= r, e.childLanes = n, t;
	}
	function zc(e, t, n) {
		var r = t.pendingProps;
		switch (ji(t), t.tag) {
			case 16:
			case 15:
			case 0:
			case 11:
			case 7:
			case 8:
			case 12:
			case 9:
			case 14: return U(t), null;
			case 1: return U(t), null;
			case 3: return n = t.stateNode, r = null, e !== null && (r = e.memoizedState.cache), t.memoizedState.cache !== r && (t.flags |= 2048), Ji(oa), ve(), n.pendingContext && (n.context = n.pendingContext, n.pendingContext = null), (e === null || e.child === null) && (Bi(t) ? Pc(t) : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, Hi())), U(t), null;
			case 26:
				var a = t.type, o = t.memoizedState;
				return e === null ? (Pc(t), o === null ? (U(t), Fc(t, a, null, r, n)) : (U(t), Ic(t, o))) : o ? o === e.memoizedState ? (U(t), t.flags &= -16777217) : (Pc(t), U(t), Ic(t, o)) : (e = e.memoizedProps, e !== r && Pc(t), U(t), Fc(t, a, e, r, n)), null;
			case 27:
				if (be(t), n = A.current, a = t.type, e !== null && t.stateNode != null) e.memoizedProps !== r && Pc(t);
				else {
					if (!r) {
						if (t.stateNode === null) throw Error(i(166));
						return U(t), null;
					}
					e = he.current, Bi(t) ? Ri(t, e) : (e = ff(a, r, n), t.stateNode = e, Pc(t));
				}
				return U(t), null;
			case 5:
				if (be(t), a = t.type, e !== null && t.stateNode != null) e.memoizedProps !== r && Pc(t);
				else {
					if (!r) {
						if (t.stateNode === null) throw Error(i(166));
						return U(t), null;
					}
					if (o = he.current, Bi(t)) Ri(t, o);
					else {
						var s = Bd(A.current);
						switch (o) {
							case 1:
								o = s.createElementNS("http://www.w3.org/2000/svg", a);
								break;
							case 2:
								o = s.createElementNS("http://www.w3.org/1998/Math/MathML", a);
								break;
							default: switch (a) {
								case "svg":
									o = s.createElementNS("http://www.w3.org/2000/svg", a);
									break;
								case "math":
									o = s.createElementNS("http://www.w3.org/1998/Math/MathML", a);
									break;
								case "script":
									o = s.createElement("div"), o.innerHTML = "<script><\/script>", o = o.removeChild(o.firstChild);
									break;
								case "select":
									o = typeof r.is == "string" ? s.createElement("select", { is: r.is }) : s.createElement("select"), r.multiple ? o.multiple = !0 : r.size && (o.size = r.size);
									break;
								default: o = typeof r.is == "string" ? s.createElement(a, { is: r.is }) : s.createElement(a);
							}
						}
						o[ct] = t, o[L] = r;
						a: for (s = t.child; s !== null;) {
							if (s.tag === 5 || s.tag === 6) o.appendChild(s.stateNode);
							else if (s.tag !== 4 && s.tag !== 27 && s.child !== null) {
								s.child.return = s, s = s.child;
								continue;
							}
							if (s === t) break a;
							for (; s.sibling === null;) {
								if (s.return === null || s.return === t) break a;
								s = s.return;
							}
							s.sibling.return = s.return, s = s.sibling;
						}
						t.stateNode = o;
						a: switch (Pd(o, a, r), a) {
							case "button":
							case "input":
							case "select":
							case "textarea":
								r = !!r.autoFocus;
								break a;
							case "img":
								r = !0;
								break a;
							default: r = !1;
						}
						r && Pc(t);
					}
				}
				return U(t), Fc(t, t.type, e === null ? null : e.memoizedProps, t.pendingProps, n), null;
			case 6:
				if (e && t.stateNode != null) e.memoizedProps !== r && Pc(t);
				else {
					if (typeof r != "string" && t.stateNode === null) throw Error(i(166));
					if (e = A.current, Bi(t)) {
						if (e = t.stateNode, n = t.memoizedProps, r = null, a = Ni, a !== null) switch (a.tag) {
							case 27:
							case 5: r = a.memoizedProps;
						}
						e[ct] = t, e = !!(e.nodeValue === n || r !== null && !0 === r.suppressHydrationWarning || Md(e.nodeValue, n)), e || Li(t, !0);
					} else e = Bd(e).createTextNode(r), e[ct] = t, t.stateNode = e;
				}
				return U(t), null;
			case 31:
				if (n = t.memoizedState, e === null || e.memoizedState !== null) {
					if (r = Bi(t), n !== null) {
						if (e === null) {
							if (!r) throw Error(i(318));
							if (e = t.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(i(557));
							e[ct] = t;
						} else Vi(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
						U(t), e = !1;
					} else n = Hi(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = n), e = !0;
					if (!e) return t.flags & 256 ? (co(t), t) : (co(t), null);
					if (t.flags & 128) throw Error(i(558));
				}
				return U(t), null;
			case 13:
				if (r = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
					if (a = Bi(t), r !== null && r.dehydrated !== null) {
						if (e === null) {
							if (!a) throw Error(i(318));
							if (a = t.memoizedState, a = a === null ? null : a.dehydrated, !a) throw Error(i(317));
							a[ct] = t;
						} else Vi(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
						U(t), a = !1;
					} else a = Hi(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = a), a = !0;
					if (!a) return t.flags & 256 ? (co(t), t) : (co(t), null);
				}
				return co(t), t.flags & 128 ? (t.lanes = n, t) : (n = r !== null, e = e !== null && e.memoizedState !== null, n && (r = t.child, a = null, r.alternate !== null && r.alternate.memoizedState !== null && r.alternate.memoizedState.cachePool !== null && (a = r.alternate.memoizedState.cachePool.pool), o = null, r.memoizedState !== null && r.memoizedState.cachePool !== null && (o = r.memoizedState.cachePool.pool), o !== a && (r.flags |= 2048)), n !== e && n && (t.child.flags |= 8192), Lc(t, t.updateQueue), U(t), null);
			case 4: return ve(), e === null && Sd(t.stateNode.containerInfo), U(t), null;
			case 10: return Ji(t.type), U(t), null;
			case 19:
				if (D(lo), r = t.memoizedState, r === null) return U(t), null;
				if (a = (t.flags & 128) != 0, o = r.rendering, o === null) if (a) Rc(r, !1);
				else {
					if (X !== 0 || e !== null && e.flags & 128) for (e = t.child; e !== null;) {
						if (o = uo(e), o !== null) {
							for (t.flags |= 128, Rc(r, !1), e = o.updateQueue, t.updateQueue = e, Lc(t, e), t.subtreeFlags = 0, e = n, n = t.child; n !== null;) di(n, e), n = n.sibling;
							return O(lo, lo.current & 1 | 2), B && Oi(t, r.treeForkCount), t.child;
						}
						e = e.sibling;
					}
					r.tail !== null && Ne() > tu && (t.flags |= 128, a = !0, Rc(r, !1), t.lanes = 4194304);
				}
				else {
					if (!a) if (e = uo(o), e !== null) {
						if (t.flags |= 128, a = !0, e = e.updateQueue, t.updateQueue = e, Lc(t, e), Rc(r, !0), r.tail === null && r.tailMode === "hidden" && !o.alternate && !B) return U(t), null;
					} else 2 * Ne() - r.renderingStartTime > tu && n !== 536870912 && (t.flags |= 128, a = !0, Rc(r, !1), t.lanes = 4194304);
					r.isBackwards ? (o.sibling = t.child, t.child = o) : (e = r.last, e === null ? t.child = o : e.sibling = o, r.last = o);
				}
				return r.tail === null ? (U(t), null) : (e = r.tail, r.rendering = e, r.tail = e.sibling, r.renderingStartTime = Ne(), e.sibling = null, n = lo.current, O(lo, a ? n & 1 | 2 : n & 1), B && Oi(t, r.treeForkCount), e);
			case 22:
			case 23: return co(t), to(), r = t.memoizedState !== null, e === null ? r && (t.flags |= 8192) : e.memoizedState !== null !== r && (t.flags |= 8192), r ? n & 536870912 && !(t.flags & 128) && (U(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : U(t), n = t.updateQueue, n !== null && Lc(t, n.retryQueue), n = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), r = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (r = t.memoizedState.cachePool.pool), r !== n && (t.flags |= 2048), e !== null && D(_a), null;
			case 24: return n = null, e !== null && (n = e.memoizedState.cache), t.memoizedState.cache !== n && (t.flags |= 2048), Ji(oa), U(t), null;
			case 25: return null;
			case 30: return null;
		}
		throw Error(i(156, t.tag));
	}
	function Bc(e, t) {
		switch (ji(t), t.tag) {
			case 1: return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 3: return Ji(oa), ve(), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
			case 26:
			case 27:
			case 5: return be(t), null;
			case 31:
				if (t.memoizedState !== null) {
					if (co(t), t.alternate === null) throw Error(i(340));
					Vi();
				}
				return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 13:
				if (co(t), e = t.memoizedState, e !== null && e.dehydrated !== null) {
					if (t.alternate === null) throw Error(i(340));
					Vi();
				}
				return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 19: return D(lo), null;
			case 4: return ve(), null;
			case 10: return Ji(t.type), null;
			case 22:
			case 23: return co(t), to(), e !== null && D(_a), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 24: return Ji(oa), null;
			case 25: return null;
			default: return null;
		}
	}
	function Vc(e, t) {
		switch (ji(t), t.tag) {
			case 3:
				Ji(oa), ve();
				break;
			case 26:
			case 27:
			case 5:
				be(t);
				break;
			case 4:
				ve();
				break;
			case 31:
				t.memoizedState !== null && co(t);
				break;
			case 13:
				co(t);
				break;
			case 19:
				D(lo);
				break;
			case 10:
				Ji(t.type);
				break;
			case 22:
			case 23:
				co(t), to(), e !== null && D(_a);
				break;
			case 24: Ji(oa);
		}
	}
	function Hc(e, t) {
		try {
			var n = t.updateQueue, r = n === null ? null : n.lastEffect;
			if (r !== null) {
				var i = r.next;
				n = i;
				do {
					if ((n.tag & e) === e) {
						r = void 0;
						var a = n.create, o = n.inst;
						r = a(), o.destroy = r;
					}
					n = n.next;
				} while (n !== i);
			}
		} catch (e) {
			Z(t, t.return, e);
		}
	}
	function Uc(e, t, n) {
		try {
			var r = t.updateQueue, i = r === null ? null : r.lastEffect;
			if (i !== null) {
				var a = i.next;
				r = a;
				do {
					if ((r.tag & e) === e) {
						var o = r.inst, s = o.destroy;
						if (s !== void 0) {
							o.destroy = void 0, i = t;
							var c = n, l = s;
							try {
								l();
							} catch (e) {
								Z(i, c, e);
							}
						}
					}
					r = r.next;
				} while (r !== a);
			}
		} catch (e) {
			Z(t, t.return, e);
		}
	}
	function Wc(e) {
		var t = e.updateQueue;
		if (t !== null) {
			var n = e.stateNode;
			try {
				Xa(t, n);
			} catch (t) {
				Z(e, e.return, t);
			}
		}
	}
	function Gc(e, t, n) {
		n.props = qs(e.type, e.memoizedProps), n.state = e.memoizedState;
		try {
			n.componentWillUnmount();
		} catch (n) {
			Z(e, t, n);
		}
	}
	function Kc(e, t) {
		try {
			var n = e.ref;
			if (n !== null) {
				switch (e.tag) {
					case 26:
					case 27:
					case 5:
						var r = e.stateNode;
						break;
					case 30:
						r = e.stateNode;
						break;
					default: r = e.stateNode;
				}
				typeof n == "function" ? e.refCleanup = n(r) : n.current = r;
			}
		} catch (n) {
			Z(e, t, n);
		}
	}
	function qc(e, t) {
		var n = e.ref, r = e.refCleanup;
		if (n !== null) if (typeof r == "function") try {
			r();
		} catch (n) {
			Z(e, t, n);
		} finally {
			e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null);
		}
		else if (typeof n == "function") try {
			n(null);
		} catch (n) {
			Z(e, t, n);
		}
		else n.current = null;
	}
	function Jc(e) {
		var t = e.type, n = e.memoizedProps, r = e.stateNode;
		try {
			a: switch (t) {
				case "button":
				case "input":
				case "select":
				case "textarea":
					n.autoFocus && r.focus();
					break a;
				case "img": n.src ? r.src = n.src : n.srcSet && (r.srcset = n.srcSet);
			}
		} catch (t) {
			Z(e, e.return, t);
		}
	}
	function Yc(e, t, n) {
		try {
			var r = e.stateNode;
			Fd(r, e.type, n, t), r[L] = t;
		} catch (t) {
			Z(e, e.return, t);
		}
	}
	function Xc(e) {
		return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && Zd(e.type) || e.tag === 4;
	}
	function Zc(e) {
		a: for (;;) {
			for (; e.sibling === null;) {
				if (e.return === null || Xc(e.return)) return null;
				e = e.return;
			}
			for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18;) {
				if (e.tag === 27 && Zd(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue a;
				e.child.return = e, e = e.child;
			}
			if (!(e.flags & 2)) return e.stateNode;
		}
	}
	function Qc(e, t, n) {
		var r = e.tag;
		if (r === 5 || r === 6) e = e.stateNode, t ? (n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n).insertBefore(e, t) : (t = n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n, t.appendChild(e), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = en));
		else if (r !== 4 && (r === 27 && Zd(e.type) && (n = e.stateNode, t = null), e = e.child, e !== null)) for (Qc(e, t, n), e = e.sibling; e !== null;) Qc(e, t, n), e = e.sibling;
	}
	function $c(e, t, n) {
		var r = e.tag;
		if (r === 5 || r === 6) e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
		else if (r !== 4 && (r === 27 && Zd(e.type) && (n = e.stateNode), e = e.child, e !== null)) for ($c(e, t, n), e = e.sibling; e !== null;) $c(e, t, n), e = e.sibling;
	}
	function el(e) {
		var t = e.stateNode, n = e.memoizedProps;
		try {
			for (var r = e.type, i = t.attributes; i.length;) t.removeAttributeNode(i[0]);
			Pd(t, r, n), t[ct] = e, t[L] = n;
		} catch (t) {
			Z(e, e.return, t);
		}
	}
	var tl = !1, nl = !1, rl = !1, il = typeof WeakSet == "function" ? WeakSet : Set, al = null;
	function ol(e, t) {
		if (e = e.containerInfo, Rd = sp, e = Dr(e), Or(e)) {
			if ("selectionStart" in e) var n = {
				start: e.selectionStart,
				end: e.selectionEnd
			};
			else a: {
				n = (n = e.ownerDocument) && n.defaultView || window;
				var r = n.getSelection && n.getSelection();
				if (r && r.rangeCount !== 0) {
					n = r.anchorNode;
					var a = r.anchorOffset, o = r.focusNode;
					r = r.focusOffset;
					try {
						n.nodeType, o.nodeType;
					} catch {
						n = null;
						break a;
					}
					var s = 0, c = -1, l = -1, u = 0, d = 0, f = e, p = null;
					b: for (;;) {
						for (var m; f !== n || a !== 0 && f.nodeType !== 3 || (c = s + a), f !== o || r !== 0 && f.nodeType !== 3 || (l = s + r), f.nodeType === 3 && (s += f.nodeValue.length), (m = f.firstChild) !== null;) p = f, f = m;
						for (;;) {
							if (f === e) break b;
							if (p === n && ++u === a && (c = s), p === o && ++d === r && (l = s), (m = f.nextSibling) !== null) break;
							f = p, p = f.parentNode;
						}
						f = m;
					}
					n = c === -1 || l === -1 ? null : {
						start: c,
						end: l
					};
				} else n = null;
			}
			n ||= {
				start: 0,
				end: 0
			};
		} else n = null;
		for (zd = {
			focusedElem: e,
			selectionRange: n
		}, sp = !1, al = t; al !== null;) if (t = al, e = t.child, t.subtreeFlags & 1028 && e !== null) e.return = t, al = e;
		else for (; al !== null;) {
			switch (t = al, o = t.alternate, e = t.flags, t.tag) {
				case 0:
					if (e & 4 && (e = t.updateQueue, e = e === null ? null : e.events, e !== null)) for (n = 0; n < e.length; n++) a = e[n], a.ref.impl = a.nextImpl;
					break;
				case 11:
				case 15: break;
				case 1:
					if (e & 1024 && o !== null) {
						e = void 0, n = t, a = o.memoizedProps, o = o.memoizedState, r = n.stateNode;
						try {
							var h = qs(n.type, a);
							e = r.getSnapshotBeforeUpdate(h, o), r.__reactInternalSnapshotBeforeUpdate = e;
						} catch (e) {
							Z(n, n.return, e);
						}
					}
					break;
				case 3:
					if (e & 1024) {
						if (e = t.stateNode.containerInfo, n = e.nodeType, n === 9) ef(e);
						else if (n === 1) switch (e.nodeName) {
							case "HEAD":
							case "HTML":
							case "BODY":
								ef(e);
								break;
							default: e.textContent = "";
						}
					}
					break;
				case 5:
				case 26:
				case 27:
				case 6:
				case 4:
				case 17: break;
				default: if (e & 1024) throw Error(i(163));
			}
			if (e = t.sibling, e !== null) {
				e.return = t.return, al = e;
				break;
			}
			al = t.return;
		}
	}
	function sl(e, t, n) {
		var r = n.flags;
		switch (n.tag) {
			case 0:
			case 11:
			case 15:
				xl(e, n), r & 4 && Hc(5, n);
				break;
			case 1:
				if (xl(e, n), r & 4) if (e = n.stateNode, t === null) try {
					e.componentDidMount();
				} catch (e) {
					Z(n, n.return, e);
				}
				else {
					var i = qs(n.type, t.memoizedProps);
					t = t.memoizedState;
					try {
						e.componentDidUpdate(i, t, e.__reactInternalSnapshotBeforeUpdate);
					} catch (e) {
						Z(n, n.return, e);
					}
				}
				r & 64 && Wc(n), r & 512 && Kc(n, n.return);
				break;
			case 3:
				if (xl(e, n), r & 64 && (e = n.updateQueue, e !== null)) {
					if (t = null, n.child !== null) switch (n.child.tag) {
						case 27:
						case 5:
							t = n.child.stateNode;
							break;
						case 1: t = n.child.stateNode;
					}
					try {
						Xa(e, t);
					} catch (e) {
						Z(n, n.return, e);
					}
				}
				break;
			case 27: t === null && r & 4 && el(n);
			case 26:
			case 5:
				xl(e, n), t === null && r & 4 && Jc(n), r & 512 && Kc(n, n.return);
				break;
			case 12:
				xl(e, n);
				break;
			case 31:
				xl(e, n), r & 4 && fl(e, n);
				break;
			case 13:
				xl(e, n), r & 4 && pl(e, n), r & 64 && (e = n.memoizedState, e !== null && (e = e.dehydrated, e !== null && (n = Ju.bind(null, n), sf(e, n))));
				break;
			case 22:
				if (r = n.memoizedState !== null || tl, !r) {
					t = t !== null && t.memoizedState !== null || nl, i = tl;
					var a = nl;
					tl = r, (nl = t) && !a ? Cl(e, n, (n.subtreeFlags & 8772) != 0) : xl(e, n), tl = i, nl = a;
				}
				break;
			case 30: break;
			default: xl(e, n);
		}
	}
	function cl(e) {
		var t = e.alternate;
		t !== null && (e.alternate = null, cl(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && ht(t)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
	}
	var W = null, ll = !1;
	function ul(e, t, n) {
		for (n = n.child; n !== null;) dl(e, t, n), n = n.sibling;
	}
	function dl(e, t, n) {
		if (Ue && typeof Ue.onCommitFiberUnmount == "function") try {
			Ue.onCommitFiberUnmount(He, n);
		} catch {}
		switch (n.tag) {
			case 26:
				nl || qc(n, t), ul(e, t, n), n.memoizedState ? n.memoizedState.count-- : n.stateNode && (n = n.stateNode, n.parentNode.removeChild(n));
				break;
			case 27:
				nl || qc(n, t);
				var r = W, i = ll;
				Zd(n.type) && (W = n.stateNode, ll = !1), ul(e, t, n), pf(n.stateNode), W = r, ll = i;
				break;
			case 5: nl || qc(n, t);
			case 6:
				if (r = W, i = ll, W = null, ul(e, t, n), W = r, ll = i, W !== null) if (ll) try {
					(W.nodeType === 9 ? W.body : W.nodeName === "HTML" ? W.ownerDocument.body : W).removeChild(n.stateNode);
				} catch (e) {
					Z(n, t, e);
				}
				else try {
					W.removeChild(n.stateNode);
				} catch (e) {
					Z(n, t, e);
				}
				break;
			case 18:
				W !== null && (ll ? (e = W, Qd(e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e, n.stateNode), Np(e)) : Qd(W, n.stateNode));
				break;
			case 4:
				r = W, i = ll, W = n.stateNode.containerInfo, ll = !0, ul(e, t, n), W = r, ll = i;
				break;
			case 0:
			case 11:
			case 14:
			case 15:
				Uc(2, n, t), nl || Uc(4, n, t), ul(e, t, n);
				break;
			case 1:
				nl || (qc(n, t), r = n.stateNode, typeof r.componentWillUnmount == "function" && Gc(n, t, r)), ul(e, t, n);
				break;
			case 21:
				ul(e, t, n);
				break;
			case 22:
				nl = (r = nl) || n.memoizedState !== null, ul(e, t, n), nl = r;
				break;
			default: ul(e, t, n);
		}
	}
	function fl(e, t) {
		if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null))) {
			e = e.dehydrated;
			try {
				Np(e);
			} catch (e) {
				Z(t, t.return, e);
			}
		}
	}
	function pl(e, t) {
		if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null)))) try {
			Np(e);
		} catch (e) {
			Z(t, t.return, e);
		}
	}
	function ml(e) {
		switch (e.tag) {
			case 31:
			case 13:
			case 19:
				var t = e.stateNode;
				return t === null && (t = e.stateNode = new il()), t;
			case 22: return e = e.stateNode, t = e._retryCache, t === null && (t = e._retryCache = new il()), t;
			default: throw Error(i(435, e.tag));
		}
	}
	function hl(e, t) {
		var n = ml(e);
		t.forEach(function(t) {
			if (!n.has(t)) {
				n.add(t);
				var r = Yu.bind(null, e, t);
				t.then(r, r);
			}
		});
	}
	function gl(e, t) {
		var n = t.deletions;
		if (n !== null) for (var r = 0; r < n.length; r++) {
			var a = n[r], o = e, s = t, c = s;
			a: for (; c !== null;) {
				switch (c.tag) {
					case 27:
						if (Zd(c.type)) {
							W = c.stateNode, ll = !1;
							break a;
						}
						break;
					case 5:
						W = c.stateNode, ll = !1;
						break a;
					case 3:
					case 4:
						W = c.stateNode.containerInfo, ll = !0;
						break a;
				}
				c = c.return;
			}
			if (W === null) throw Error(i(160));
			dl(o, s, a), W = null, ll = !1, o = a.alternate, o !== null && (o.return = null), a.return = null;
		}
		if (t.subtreeFlags & 13886) for (t = t.child; t !== null;) vl(t, e), t = t.sibling;
	}
	var _l = null;
	function vl(e, t) {
		var n = e.alternate, r = e.flags;
		switch (e.tag) {
			case 0:
			case 11:
			case 14:
			case 15:
				gl(t, e), yl(e), r & 4 && (Uc(3, e, e.return), Hc(3, e), Uc(5, e, e.return));
				break;
			case 1:
				gl(t, e), yl(e), r & 512 && (nl || n === null || qc(n, n.return)), r & 64 && tl && (e = e.updateQueue, e !== null && (r = e.callbacks, r !== null && (n = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = n === null ? r : n.concat(r))));
				break;
			case 26:
				var a = _l;
				if (gl(t, e), yl(e), r & 512 && (nl || n === null || qc(n, n.return)), r & 4) {
					var o = n === null ? null : n.memoizedState;
					if (r = e.memoizedState, n === null) if (r === null) if (e.stateNode === null) {
						a: {
							r = e.type, n = e.memoizedProps, a = a.ownerDocument || a;
							b: switch (r) {
								case "title":
									o = a.getElementsByTagName("title")[0], (!o || o[mt] || o[ct] || o.namespaceURI === "http://www.w3.org/2000/svg" || o.hasAttribute("itemprop")) && (o = a.createElement(r), a.head.insertBefore(o, a.querySelector("head > title"))), Pd(o, r, n), o[ct] = e, bt(o), r = o;
									break a;
								case "link":
									var s = Vf("link", "href", a).get(r + (n.href || ""));
									if (s) {
										for (var c = 0; c < s.length; c++) if (o = s[c], o.getAttribute("href") === (n.href == null || n.href === "" ? null : n.href) && o.getAttribute("rel") === (n.rel == null ? null : n.rel) && o.getAttribute("title") === (n.title == null ? null : n.title) && o.getAttribute("crossorigin") === (n.crossOrigin == null ? null : n.crossOrigin)) {
											s.splice(c, 1);
											break b;
										}
									}
									o = a.createElement(r), Pd(o, r, n), a.head.appendChild(o);
									break;
								case "meta":
									if (s = Vf("meta", "content", a).get(r + (n.content || ""))) {
										for (c = 0; c < s.length; c++) if (o = s[c], o.getAttribute("content") === (n.content == null ? null : "" + n.content) && o.getAttribute("name") === (n.name == null ? null : n.name) && o.getAttribute("property") === (n.property == null ? null : n.property) && o.getAttribute("http-equiv") === (n.httpEquiv == null ? null : n.httpEquiv) && o.getAttribute("charset") === (n.charSet == null ? null : n.charSet)) {
											s.splice(c, 1);
											break b;
										}
									}
									o = a.createElement(r), Pd(o, r, n), a.head.appendChild(o);
									break;
								default: throw Error(i(468, r));
							}
							o[ct] = e, bt(o), r = o;
						}
						e.stateNode = r;
					} else Hf(a, e.type, e.stateNode);
					else e.stateNode = If(a, r, e.memoizedProps);
					else o === r ? r === null && e.stateNode !== null && Yc(e, e.memoizedProps, n.memoizedProps) : (o === null ? n.stateNode !== null && (n = n.stateNode, n.parentNode.removeChild(n)) : o.count--, r === null ? Hf(a, e.type, e.stateNode) : If(a, r, e.memoizedProps));
				}
				break;
			case 27:
				gl(t, e), yl(e), r & 512 && (nl || n === null || qc(n, n.return)), n !== null && r & 4 && Yc(e, e.memoizedProps, n.memoizedProps);
				break;
			case 5:
				if (gl(t, e), yl(e), r & 512 && (nl || n === null || qc(n, n.return)), e.flags & 32) {
					a = e.stateNode;
					try {
						Kt(a, "");
					} catch (t) {
						Z(e, e.return, t);
					}
				}
				r & 4 && e.stateNode != null && (a = e.memoizedProps, Yc(e, a, n === null ? a : n.memoizedProps)), r & 1024 && (rl = !0);
				break;
			case 6:
				if (gl(t, e), yl(e), r & 4) {
					if (e.stateNode === null) throw Error(i(162));
					r = e.memoizedProps, n = e.stateNode;
					try {
						n.nodeValue = r;
					} catch (t) {
						Z(e, e.return, t);
					}
				}
				break;
			case 3:
				if (Bf = null, a = _l, _l = gf(t.containerInfo), gl(t, e), _l = a, yl(e), r & 4 && n !== null && n.memoizedState.isDehydrated) try {
					Np(t.containerInfo);
				} catch (t) {
					Z(e, e.return, t);
				}
				rl && (rl = !1, bl(e));
				break;
			case 4:
				r = _l, _l = gf(e.stateNode.containerInfo), gl(t, e), yl(e), _l = r;
				break;
			case 12:
				gl(t, e), yl(e);
				break;
			case 31:
				gl(t, e), yl(e), r & 4 && (r = e.updateQueue, r !== null && (e.updateQueue = null, hl(e, r)));
				break;
			case 13:
				gl(t, e), yl(e), e.child.flags & 8192 && e.memoizedState !== null != (n !== null && n.memoizedState !== null) && ($l = Ne()), r & 4 && (r = e.updateQueue, r !== null && (e.updateQueue = null, hl(e, r)));
				break;
			case 22:
				a = e.memoizedState !== null;
				var l = n !== null && n.memoizedState !== null, u = tl, d = nl;
				if (tl = u || a, nl = d || l, gl(t, e), nl = d, tl = u, yl(e), r & 8192) a: for (t = e.stateNode, t._visibility = a ? t._visibility & -2 : t._visibility | 1, a && (n === null || l || tl || nl || Sl(e)), n = null, t = e;;) {
					if (t.tag === 5 || t.tag === 26) {
						if (n === null) {
							l = n = t;
							try {
								if (o = l.stateNode, a) s = o.style, typeof s.setProperty == "function" ? s.setProperty("display", "none", "important") : s.display = "none";
								else {
									c = l.stateNode;
									var f = l.memoizedProps.style, p = f != null && f.hasOwnProperty("display") ? f.display : null;
									c.style.display = p == null || typeof p == "boolean" ? "" : ("" + p).trim();
								}
							} catch (e) {
								Z(l, l.return, e);
							}
						}
					} else if (t.tag === 6) {
						if (n === null) {
							l = t;
							try {
								l.stateNode.nodeValue = a ? "" : l.memoizedProps;
							} catch (e) {
								Z(l, l.return, e);
							}
						}
					} else if (t.tag === 18) {
						if (n === null) {
							l = t;
							try {
								var m = l.stateNode;
								a ? $d(m, !0) : $d(l.stateNode, !1);
							} catch (e) {
								Z(l, l.return, e);
							}
						}
					} else if ((t.tag !== 22 && t.tag !== 23 || t.memoizedState === null || t === e) && t.child !== null) {
						t.child.return = t, t = t.child;
						continue;
					}
					if (t === e) break a;
					for (; t.sibling === null;) {
						if (t.return === null || t.return === e) break a;
						n === t && (n = null), t = t.return;
					}
					n === t && (n = null), t.sibling.return = t.return, t = t.sibling;
				}
				r & 4 && (r = e.updateQueue, r !== null && (n = r.retryQueue, n !== null && (r.retryQueue = null, hl(e, n))));
				break;
			case 19:
				gl(t, e), yl(e), r & 4 && (r = e.updateQueue, r !== null && (e.updateQueue = null, hl(e, r)));
				break;
			case 30: break;
			case 21: break;
			default: gl(t, e), yl(e);
		}
	}
	function yl(e) {
		var t = e.flags;
		if (t & 2) {
			try {
				for (var n, r = e.return; r !== null;) {
					if (Xc(r)) {
						n = r;
						break;
					}
					r = r.return;
				}
				if (n == null) throw Error(i(160));
				switch (n.tag) {
					case 27:
						var a = n.stateNode;
						$c(e, Zc(e), a);
						break;
					case 5:
						var o = n.stateNode;
						n.flags & 32 && (Kt(o, ""), n.flags &= -33), $c(e, Zc(e), o);
						break;
					case 3:
					case 4:
						var s = n.stateNode.containerInfo;
						Qc(e, Zc(e), s);
						break;
					default: throw Error(i(161));
				}
			} catch (t) {
				Z(e, e.return, t);
			}
			e.flags &= -3;
		}
		t & 4096 && (e.flags &= -4097);
	}
	function bl(e) {
		if (e.subtreeFlags & 1024) for (e = e.child; e !== null;) {
			var t = e;
			bl(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), e = e.sibling;
		}
	}
	function xl(e, t) {
		if (t.subtreeFlags & 8772) for (t = t.child; t !== null;) sl(e, t.alternate, t), t = t.sibling;
	}
	function Sl(e) {
		for (e = e.child; e !== null;) {
			var t = e;
			switch (t.tag) {
				case 0:
				case 11:
				case 14:
				case 15:
					Uc(4, t, t.return), Sl(t);
					break;
				case 1:
					qc(t, t.return);
					var n = t.stateNode;
					typeof n.componentWillUnmount == "function" && Gc(t, t.return, n), Sl(t);
					break;
				case 27: pf(t.stateNode);
				case 26:
				case 5:
					qc(t, t.return), Sl(t);
					break;
				case 22:
					t.memoizedState === null && Sl(t);
					break;
				case 30:
					Sl(t);
					break;
				default: Sl(t);
			}
			e = e.sibling;
		}
	}
	function Cl(e, t, n) {
		for (n &&= (t.subtreeFlags & 8772) != 0, t = t.child; t !== null;) {
			var r = t.alternate, i = e, a = t, o = a.flags;
			switch (a.tag) {
				case 0:
				case 11:
				case 15:
					Cl(i, a, n), Hc(4, a);
					break;
				case 1:
					if (Cl(i, a, n), r = a, i = r.stateNode, typeof i.componentDidMount == "function") try {
						i.componentDidMount();
					} catch (e) {
						Z(r, r.return, e);
					}
					if (r = a, i = r.updateQueue, i !== null) {
						var s = r.stateNode;
						try {
							var c = i.shared.hiddenCallbacks;
							if (c !== null) for (i.shared.hiddenCallbacks = null, i = 0; i < c.length; i++) Ya(c[i], s);
						} catch (e) {
							Z(r, r.return, e);
						}
					}
					n && o & 64 && Wc(a), Kc(a, a.return);
					break;
				case 27: el(a);
				case 26:
				case 5:
					Cl(i, a, n), n && r === null && o & 4 && Jc(a), Kc(a, a.return);
					break;
				case 12:
					Cl(i, a, n);
					break;
				case 31:
					Cl(i, a, n), n && o & 4 && fl(i, a);
					break;
				case 13:
					Cl(i, a, n), n && o & 4 && pl(i, a);
					break;
				case 22:
					a.memoizedState === null && Cl(i, a, n), Kc(a, a.return);
					break;
				case 30: break;
				default: Cl(i, a, n);
			}
			t = t.sibling;
		}
	}
	function wl(e, t) {
		var n = null;
		e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), e = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), e !== n && (e != null && e.refCount++, n != null && ca(n));
	}
	function Tl(e, t) {
		e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && ca(e));
	}
	function El(e, t, n, r) {
		if (t.subtreeFlags & 10256) for (t = t.child; t !== null;) Dl(e, t, n, r), t = t.sibling;
	}
	function Dl(e, t, n, r) {
		var i = t.flags;
		switch (t.tag) {
			case 0:
			case 11:
			case 15:
				El(e, t, n, r), i & 2048 && Hc(9, t);
				break;
			case 1:
				El(e, t, n, r);
				break;
			case 3:
				El(e, t, n, r), i & 2048 && (e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && ca(e)));
				break;
			case 12:
				if (i & 2048) {
					El(e, t, n, r), e = t.stateNode;
					try {
						var a = t.memoizedProps, o = a.id, s = a.onPostCommit;
						typeof s == "function" && s(o, t.alternate === null ? "mount" : "update", e.passiveEffectDuration, -0);
					} catch (e) {
						Z(t, t.return, e);
					}
				} else El(e, t, n, r);
				break;
			case 31:
				El(e, t, n, r);
				break;
			case 13:
				El(e, t, n, r);
				break;
			case 23: break;
			case 22:
				a = t.stateNode, o = t.alternate, t.memoizedState === null ? a._visibility & 2 ? El(e, t, n, r) : (a._visibility |= 2, Ol(e, t, n, r, (t.subtreeFlags & 10256) != 0 || !1)) : a._visibility & 2 ? El(e, t, n, r) : kl(e, t), i & 2048 && wl(o, t);
				break;
			case 24:
				El(e, t, n, r), i & 2048 && Tl(t.alternate, t);
				break;
			default: El(e, t, n, r);
		}
	}
	function Ol(e, t, n, r, i) {
		for (i &&= (t.subtreeFlags & 10256) != 0 || !1, t = t.child; t !== null;) {
			var a = e, o = t, s = n, c = r, l = o.flags;
			switch (o.tag) {
				case 0:
				case 11:
				case 15:
					Ol(a, o, s, c, i), Hc(8, o);
					break;
				case 23: break;
				case 22:
					var u = o.stateNode;
					o.memoizedState === null ? (u._visibility |= 2, Ol(a, o, s, c, i)) : u._visibility & 2 ? Ol(a, o, s, c, i) : kl(a, o), i && l & 2048 && wl(o.alternate, o);
					break;
				case 24:
					Ol(a, o, s, c, i), i && l & 2048 && Tl(o.alternate, o);
					break;
				default: Ol(a, o, s, c, i);
			}
			t = t.sibling;
		}
	}
	function kl(e, t) {
		if (t.subtreeFlags & 10256) for (t = t.child; t !== null;) {
			var n = e, r = t, i = r.flags;
			switch (r.tag) {
				case 22:
					kl(n, r), i & 2048 && wl(r.alternate, r);
					break;
				case 24:
					kl(n, r), i & 2048 && Tl(r.alternate, r);
					break;
				default: kl(n, r);
			}
			t = t.sibling;
		}
	}
	var Al = 8192;
	function jl(e, t, n) {
		if (e.subtreeFlags & Al) for (e = e.child; e !== null;) Ml(e, t, n), e = e.sibling;
	}
	function Ml(e, t, n) {
		switch (e.tag) {
			case 26:
				jl(e, t, n), e.flags & Al && e.memoizedState !== null && Gf(n, _l, e.memoizedState, e.memoizedProps);
				break;
			case 5:
				jl(e, t, n);
				break;
			case 3:
			case 4:
				var r = _l;
				_l = gf(e.stateNode.containerInfo), jl(e, t, n), _l = r;
				break;
			case 22:
				e.memoizedState === null && (r = e.alternate, r !== null && r.memoizedState !== null ? (r = Al, Al = 16777216, jl(e, t, n), Al = r) : jl(e, t, n));
				break;
			default: jl(e, t, n);
		}
	}
	function Nl(e) {
		var t = e.alternate;
		if (t !== null && (e = t.child, e !== null)) {
			t.child = null;
			do
				t = e.sibling, e.sibling = null, e = t;
			while (e !== null);
		}
	}
	function Pl(e) {
		var t = e.deletions;
		if (e.flags & 16) {
			if (t !== null) for (var n = 0; n < t.length; n++) {
				var r = t[n];
				al = r, Ll(r, e);
			}
			Nl(e);
		}
		if (e.subtreeFlags & 10256) for (e = e.child; e !== null;) Fl(e), e = e.sibling;
	}
	function Fl(e) {
		switch (e.tag) {
			case 0:
			case 11:
			case 15:
				Pl(e), e.flags & 2048 && Uc(9, e, e.return);
				break;
			case 3:
				Pl(e);
				break;
			case 12:
				Pl(e);
				break;
			case 22:
				var t = e.stateNode;
				e.memoizedState !== null && t._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (t._visibility &= -3, Il(e)) : Pl(e);
				break;
			default: Pl(e);
		}
	}
	function Il(e) {
		var t = e.deletions;
		if (e.flags & 16) {
			if (t !== null) for (var n = 0; n < t.length; n++) {
				var r = t[n];
				al = r, Ll(r, e);
			}
			Nl(e);
		}
		for (e = e.child; e !== null;) {
			switch (t = e, t.tag) {
				case 0:
				case 11:
				case 15:
					Uc(8, t, t.return), Il(t);
					break;
				case 22:
					n = t.stateNode, n._visibility & 2 && (n._visibility &= -3, Il(t));
					break;
				default: Il(t);
			}
			e = e.sibling;
		}
	}
	function Ll(e, t) {
		for (; al !== null;) {
			var n = al;
			switch (n.tag) {
				case 0:
				case 11:
				case 15:
					Uc(8, n, t);
					break;
				case 23:
				case 22:
					if (n.memoizedState !== null && n.memoizedState.cachePool !== null) {
						var r = n.memoizedState.cachePool.pool;
						r != null && r.refCount++;
					}
					break;
				case 24: ca(n.memoizedState.cache);
			}
			if (r = n.child, r !== null) r.return = n, al = r;
			else a: for (n = e; al !== null;) {
				r = al;
				var i = r.sibling, a = r.return;
				if (cl(r), r === n) {
					al = null;
					break a;
				}
				if (i !== null) {
					i.return = a, al = i;
					break a;
				}
				al = a;
			}
		}
	}
	var Rl = {
		getCacheForType: function(e) {
			var t = ea(oa), n = t.data.get(e);
			return n === void 0 && (n = e(), t.data.set(e, n)), n;
		},
		cacheSignal: function() {
			return ea(oa).controller.signal;
		}
	}, zl = typeof WeakMap == "function" ? WeakMap : Map, G = 0, K = null, q = null, J = 0, Y = 0, Bl = null, Vl = !1, Hl = !1, Ul = !1, Wl = 0, X = 0, Gl = 0, Kl = 0, ql = 0, Jl = 0, Yl = 0, Xl = null, Zl = null, Ql = !1, $l = 0, eu = 0, tu = Infinity, nu = null, ru = null, iu = 0, au = null, ou = null, su = 0, cu = 0, lu = null, uu = null, du = 0, fu = null;
	function pu() {
		return G & 2 && J !== 0 ? J & -J : T.T === null ? at() : dd();
	}
	function mu() {
		if (Jl === 0) if (!(J & 536870912) || B) {
			var e = Ge;
			Ge <<= 1, !(Ge & 3932160) && (Ge = 262144), Jl = e;
		} else Jl = 536870912;
		return e = no.current, e !== null && (e.flags |= 32), Jl;
	}
	function hu(e, t, n) {
		(e === K && (Y === 2 || Y === 9) || e.cancelPendingCommit !== null) && (Su(e, 0), yu(e, J, Jl, !1)), Qe(e, n), (!(G & 2) || e !== K) && (e === K && (!(G & 2) && (Kl |= n), X === 4 && yu(e, J, Jl, !1)), rd(e));
	}
	function gu(e, t, n) {
		if (G & 6) throw Error(i(327));
		var r = !n && (t & 127) == 0 && (t & e.expiredLanes) === 0 || I(e, t), a = r ? Au(e, t) : Ou(e, t, !0), o = r;
		do {
			if (a === 0) {
				Hl && !r && yu(e, t, 0, !1);
				break;
			} else {
				if (n = e.current.alternate, o && !vu(n)) {
					a = Ou(e, t, !1), o = !1;
					continue;
				}
				if (a === 2) {
					if (o = t, e.errorRecoveryDisabledLanes & o) var s = 0;
					else s = e.pendingLanes & -536870913, s = s === 0 ? s & 536870912 ? 536870912 : 0 : s;
					if (s !== 0) {
						t = s;
						a: {
							var c = e;
							a = Xl;
							var l = c.current.memoizedState.isDehydrated;
							if (l && (Su(c, s).flags |= 256), s = Ou(c, s, !1), s !== 2) {
								if (Ul && !l) {
									c.errorRecoveryDisabledLanes |= o, Kl |= o, a = 4;
									break a;
								}
								o = Zl, Zl = a, o !== null && (Zl === null ? Zl = o : Zl.push.apply(Zl, o));
							}
							a = s;
						}
						if (o = !1, a !== 2) continue;
					}
				}
				if (a === 1) {
					Su(e, 0), yu(e, t, 0, !0);
					break;
				}
				a: {
					switch (r = e, o = a, o) {
						case 0:
						case 1: throw Error(i(345));
						case 4: if ((t & 4194048) !== t) break;
						case 6:
							yu(r, t, Jl, !Vl);
							break a;
						case 2:
							Zl = null;
							break;
						case 3:
						case 5: break;
						default: throw Error(i(329));
					}
					if ((t & 62914560) === t && (a = $l + 300 - Ne(), 10 < a)) {
						if (yu(r, t, Jl, !Vl), Je(r, 0, !0) !== 0) break a;
						su = t, r.timeoutHandle = Kd(_u.bind(null, r, n, Zl, nu, Ql, t, Jl, Kl, Yl, Vl, o, "Throttled", -0, 0), a);
						break a;
					}
					_u(r, n, Zl, nu, Ql, t, Jl, Kl, Yl, Vl, o, null, -0, 0);
				}
			}
			break;
		} while (1);
		rd(e);
	}
	function _u(e, t, n, r, i, a, o, s, c, l, u, d, f, p) {
		if (e.timeoutHandle = -1, d = t.subtreeFlags, d & 8192 || (d & 16785408) == 16785408) {
			d = {
				stylesheets: null,
				count: 0,
				imgCount: 0,
				imgBytes: 0,
				suspenseyImages: [],
				waitingForImages: !0,
				waitingForViewTransition: !1,
				unsuspend: en
			}, Ml(t, a, d);
			var m = (a & 62914560) === a ? $l - Ne() : (a & 4194048) === a ? eu - Ne() : 0;
			if (m = qf(d, m), m !== null) {
				su = a, e.cancelPendingCommit = m(Lu.bind(null, e, t, a, n, r, i, o, s, c, u, d, null, f, p)), yu(e, a, o, !l);
				return;
			}
		}
		Lu(e, t, a, n, r, i, o, s, c);
	}
	function vu(e) {
		for (var t = e;;) {
			var n = t.tag;
			if ((n === 0 || n === 11 || n === 15) && t.flags & 16384 && (n = t.updateQueue, n !== null && (n = n.stores, n !== null))) for (var r = 0; r < n.length; r++) {
				var i = n[r], a = i.getSnapshot;
				i = i.value;
				try {
					if (!Sr(a(), i)) return !1;
				} catch {
					return !1;
				}
			}
			if (n = t.child, t.subtreeFlags & 16384 && n !== null) n.return = t, t = n;
			else {
				if (t === e) break;
				for (; t.sibling === null;) {
					if (t.return === null || t.return === e) return !0;
					t = t.return;
				}
				t.sibling.return = t.return, t = t.sibling;
			}
		}
		return !0;
	}
	function yu(e, t, n, r) {
		t &= ~ql, t &= ~Kl, e.suspendedLanes |= t, e.pingedLanes &= ~t, r && (e.warmLanes |= t), r = e.expirationTimes;
		for (var i = t; 0 < i;) {
			var a = 31 - M(i), o = 1 << a;
			r[a] = -1, i &= ~o;
		}
		n !== 0 && et(e, n, t);
	}
	function bu() {
		return G & 6 ? !0 : (id(0, !1), !1);
	}
	function xu() {
		if (q !== null) {
			if (Y === 0) var e = q.return;
			else e = q, Ki = Gi = null, ko(e), ja = null, Ma = 0, e = q;
			for (; e !== null;) Vc(e.alternate, e), e = e.return;
			q = null;
		}
	}
	function Su(e, t) {
		var n = e.timeoutHandle;
		n !== -1 && (e.timeoutHandle = -1, qd(n)), n = e.cancelPendingCommit, n !== null && (e.cancelPendingCommit = null, n()), su = 0, xu(), K = e, q = n = ui(e.current, null), J = t, Y = 0, Bl = null, Vl = !1, Hl = I(e, t), Ul = !1, Yl = Jl = ql = Kl = Gl = X = 0, Zl = Xl = null, Ql = !1, t & 8 && (t |= t & 32);
		var r = e.entangledLanes;
		if (r !== 0) for (e = e.entanglements, r &= t; 0 < r;) {
			var i = 31 - M(r), a = 1 << i;
			t |= e[i], r &= ~a;
		}
		return Wl = t, ei(), n;
	}
	function Cu(e, t) {
		V = null, T.H = zs, t === xa || t === Ca ? (t = ka(), Y = 3) : t === Sa ? (t = ka(), Y = 4) : Y = t === rc ? 8 : typeof t == "object" && t && typeof t.then == "function" ? 6 : 1, Bl = t, q === null && (X = 1, Zs(e, vi(t, e.current)));
	}
	function wu() {
		var e = no.current;
		return e === null ? !0 : (J & 4194048) === J ? ro === null : (J & 62914560) === J || J & 536870912 ? e === ro : !1;
	}
	function Tu() {
		var e = T.H;
		return T.H = zs, e === null ? zs : e;
	}
	function Eu() {
		var e = T.A;
		return T.A = Rl, e;
	}
	function Du() {
		X = 4, Vl || (J & 4194048) !== J && no.current !== null || (Hl = !0), !(Gl & 134217727) && !(Kl & 134217727) || K === null || yu(K, J, Jl, !1);
	}
	function Ou(e, t, n) {
		var r = G;
		G |= 2;
		var i = Tu(), a = Eu();
		(K !== e || J !== t) && (nu = null, Su(e, t)), t = !1;
		var o = X;
		a: do
			try {
				if (Y !== 0 && q !== null) {
					var s = q, c = Bl;
					switch (Y) {
						case 8:
							xu(), o = 6;
							break a;
						case 3:
						case 2:
						case 9:
						case 6:
							no.current === null && (t = !0);
							var l = Y;
							if (Y = 0, Bl = null, Pu(e, s, c, l), n && Hl) {
								o = 0;
								break a;
							}
							break;
						default: l = Y, Y = 0, Bl = null, Pu(e, s, c, l);
					}
				}
				ku(), o = X;
				break;
			} catch (t) {
				Cu(e, t);
			}
		while (1);
		return t && e.shellSuspendCounter++, Ki = Gi = null, G = r, T.H = i, T.A = a, q === null && (K = null, J = 0, ei()), o;
	}
	function ku() {
		for (; q !== null;) Mu(q);
	}
	function Au(e, t) {
		var n = G;
		G |= 2;
		var r = Tu(), a = Eu();
		K !== e || J !== t ? (nu = null, tu = Ne() + 500, Su(e, t)) : Hl = I(e, t);
		a: do
			try {
				if (Y !== 0 && q !== null) {
					t = q;
					var o = Bl;
					b: switch (Y) {
						case 1:
							Y = 0, Bl = null, Pu(e, t, o, 1);
							break;
						case 2:
						case 9:
							if (Ta(o)) {
								Y = 0, Bl = null, Nu(t);
								break;
							}
							t = function() {
								Y !== 2 && Y !== 9 || K !== e || (Y = 7), rd(e);
							}, o.then(t, t);
							break a;
						case 3:
							Y = 7;
							break a;
						case 4:
							Y = 5;
							break a;
						case 7:
							Ta(o) ? (Y = 0, Bl = null, Nu(t)) : (Y = 0, Bl = null, Pu(e, t, o, 7));
							break;
						case 5:
							var s = null;
							switch (q.tag) {
								case 26: s = q.memoizedState;
								case 5:
								case 27:
									var c = q;
									if (s ? Wf(s) : c.stateNode.complete) {
										Y = 0, Bl = null;
										var l = c.sibling;
										if (l !== null) q = l;
										else {
											var u = c.return;
											u === null ? q = null : (q = u, Fu(u));
										}
										break b;
									}
							}
							Y = 0, Bl = null, Pu(e, t, o, 5);
							break;
						case 6:
							Y = 0, Bl = null, Pu(e, t, o, 6);
							break;
						case 8:
							xu(), X = 6;
							break a;
						default: throw Error(i(462));
					}
				}
				ju();
				break;
			} catch (t) {
				Cu(e, t);
			}
		while (1);
		return Ki = Gi = null, T.H = r, T.A = a, G = n, q === null ? (K = null, J = 0, ei(), X) : 0;
	}
	function ju() {
		for (; q !== null && !je();) Mu(q);
	}
	function Mu(e) {
		var t = Nc(e.alternate, e, Wl);
		e.memoizedProps = e.pendingProps, t === null ? Fu(e) : q = t;
	}
	function Nu(e) {
		var t = e, n = t.alternate;
		switch (t.tag) {
			case 15:
			case 0:
				t = _c(n, t, t.pendingProps, t.type, void 0, J);
				break;
			case 11:
				t = _c(n, t, t.pendingProps, t.type.render, t.ref, J);
				break;
			case 5: ko(t);
			default: Vc(n, t), t = q = di(t, Wl), t = Nc(n, t, Wl);
		}
		e.memoizedProps = e.pendingProps, t === null ? Fu(e) : q = t;
	}
	function Pu(e, t, n, r) {
		Ki = Gi = null, ko(t), ja = null, Ma = 0;
		var i = t.return;
		try {
			if (nc(e, i, t, n, J)) {
				X = 1, Zs(e, vi(n, e.current)), q = null;
				return;
			}
		} catch (t) {
			if (i !== null) throw q = i, t;
			X = 1, Zs(e, vi(n, e.current)), q = null;
			return;
		}
		t.flags & 32768 ? (B || r === 1 ? e = !0 : Hl || J & 536870912 ? e = !1 : (Vl = e = !0, (r === 2 || r === 9 || r === 3 || r === 6) && (r = no.current, r !== null && r.tag === 13 && (r.flags |= 16384))), Iu(t, e)) : Fu(t);
	}
	function Fu(e) {
		var t = e;
		do {
			if (t.flags & 32768) {
				Iu(t, Vl);
				return;
			}
			e = t.return;
			var n = zc(t.alternate, t, Wl);
			if (n !== null) {
				q = n;
				return;
			}
			if (t = t.sibling, t !== null) {
				q = t;
				return;
			}
			q = t = e;
		} while (t !== null);
		X === 0 && (X = 5);
	}
	function Iu(e, t) {
		do {
			var n = Bc(e.alternate, e);
			if (n !== null) {
				n.flags &= 32767, q = n;
				return;
			}
			if (n = e.return, n !== null && (n.flags |= 32768, n.subtreeFlags = 0, n.deletions = null), !t && (e = e.sibling, e !== null)) {
				q = e;
				return;
			}
			q = e = n;
		} while (e !== null);
		X = 6, q = null;
	}
	function Lu(e, t, n, r, a, o, s, c, l) {
		e.cancelPendingCommit = null;
		do
			Hu();
		while (iu !== 0);
		if (G & 6) throw Error(i(327));
		if (t !== null) {
			if (t === e.current) throw Error(i(177));
			if (o = t.lanes | t.childLanes, o |= $r, $e(e, n, o, s, c, l), e === K && (q = K = null, J = 0), ou = t, au = e, su = n, cu = o, lu = a, uu = r, t.subtreeFlags & 10256 || t.flags & 10256 ? (e.callbackNode = null, e.callbackPriority = 0, Xu(Le, function() {
				return Uu(), null;
			})) : (e.callbackNode = null, e.callbackPriority = 0), r = (t.flags & 13878) != 0, t.subtreeFlags & 13878 || r) {
				r = T.T, T.T = null, a = E.p, E.p = 2, s = G, G |= 4;
				try {
					ol(e, t, n);
				} finally {
					G = s, E.p = a, T.T = r;
				}
			}
			iu = 1, Ru(), zu(), Bu();
		}
	}
	function Ru() {
		if (iu === 1) {
			iu = 0;
			var e = au, t = ou, n = (t.flags & 13878) != 0;
			if (t.subtreeFlags & 13878 || n) {
				n = T.T, T.T = null;
				var r = E.p;
				E.p = 2;
				var i = G;
				G |= 4;
				try {
					vl(t, e);
					var a = zd, o = Dr(e.containerInfo), s = a.focusedElem, c = a.selectionRange;
					if (o !== s && s && s.ownerDocument && Er(s.ownerDocument.documentElement, s)) {
						if (c !== null && Or(s)) {
							var l = c.start, u = c.end;
							if (u === void 0 && (u = l), "selectionStart" in s) s.selectionStart = l, s.selectionEnd = Math.min(u, s.value.length);
							else {
								var d = s.ownerDocument || document, f = d && d.defaultView || window;
								if (f.getSelection) {
									var p = f.getSelection(), m = s.textContent.length, h = Math.min(c.start, m), g = c.end === void 0 ? h : Math.min(c.end, m);
									!p.extend && h > g && (o = g, g = h, h = o);
									var _ = Tr(s, h), v = Tr(s, g);
									if (_ && v && (p.rangeCount !== 1 || p.anchorNode !== _.node || p.anchorOffset !== _.offset || p.focusNode !== v.node || p.focusOffset !== v.offset)) {
										var y = d.createRange();
										y.setStart(_.node, _.offset), p.removeAllRanges(), h > g ? (p.addRange(y), p.extend(v.node, v.offset)) : (y.setEnd(v.node, v.offset), p.addRange(y));
									}
								}
							}
						}
						for (d = [], p = s; p = p.parentNode;) p.nodeType === 1 && d.push({
							element: p,
							left: p.scrollLeft,
							top: p.scrollTop
						});
						for (typeof s.focus == "function" && s.focus(), s = 0; s < d.length; s++) {
							var b = d[s];
							b.element.scrollLeft = b.left, b.element.scrollTop = b.top;
						}
					}
					sp = !!Rd, zd = Rd = null;
				} finally {
					G = i, E.p = r, T.T = n;
				}
			}
			e.current = t, iu = 2;
		}
	}
	function zu() {
		if (iu === 2) {
			iu = 0;
			var e = au, t = ou, n = (t.flags & 8772) != 0;
			if (t.subtreeFlags & 8772 || n) {
				n = T.T, T.T = null;
				var r = E.p;
				E.p = 2;
				var i = G;
				G |= 4;
				try {
					sl(e, t.alternate, t);
				} finally {
					G = i, E.p = r, T.T = n;
				}
			}
			iu = 3;
		}
	}
	function Bu() {
		if (iu === 4 || iu === 3) {
			iu = 0, Me();
			var e = au, t = ou, n = su, r = uu;
			t.subtreeFlags & 10256 || t.flags & 10256 ? iu = 5 : (iu = 0, ou = au = null, Vu(e, e.pendingLanes));
			var i = e.pendingLanes;
			if (i === 0 && (ru = null), it(n), t = t.stateNode, Ue && typeof Ue.onCommitFiberRoot == "function") try {
				Ue.onCommitFiberRoot(He, t, void 0, (t.current.flags & 128) == 128);
			} catch {}
			if (r !== null) {
				t = T.T, i = E.p, E.p = 2, T.T = null;
				try {
					for (var a = e.onRecoverableError, o = 0; o < r.length; o++) {
						var s = r[o];
						a(s.value, { componentStack: s.stack });
					}
				} finally {
					T.T = t, E.p = i;
				}
			}
			su & 3 && Hu(), rd(e), i = e.pendingLanes, n & 261930 && i & 42 ? e === fu ? du++ : (du = 0, fu = e) : du = 0, id(0, !1);
		}
	}
	function Vu(e, t) {
		(e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache, t != null && (e.pooledCache = null, ca(t)));
	}
	function Hu() {
		return Ru(), zu(), Bu(), Uu();
	}
	function Uu() {
		if (iu !== 5) return !1;
		var e = au, t = cu;
		cu = 0;
		var n = it(su), r = T.T, a = E.p;
		try {
			E.p = 32 > n ? 32 : n, T.T = null, n = lu, lu = null;
			var o = au, s = su;
			if (iu = 0, ou = au = null, su = 0, G & 6) throw Error(i(331));
			var c = G;
			if (G |= 4, Fl(o.current), Dl(o, o.current, s, n), G = c, id(0, !1), Ue && typeof Ue.onPostCommitFiberRoot == "function") try {
				Ue.onPostCommitFiberRoot(He, o);
			} catch {}
			return !0;
		} finally {
			E.p = a, T.T = r, Vu(e, t);
		}
	}
	function Wu(e, t, n) {
		t = vi(n, t), t = $s(e.stateNode, t, 2), e = Ua(e, t, 2), e !== null && (Qe(e, 2), rd(e));
	}
	function Z(e, t, n) {
		if (e.tag === 3) Wu(e, e, n);
		else for (; t !== null;) {
			if (t.tag === 3) {
				Wu(t, e, n);
				break;
			} else if (t.tag === 1) {
				var r = t.stateNode;
				if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (ru === null || !ru.has(r))) {
					e = vi(n, e), n = ec(2), r = Ua(t, n, 2), r !== null && (tc(n, r, t, e), Qe(r, 2), rd(r));
					break;
				}
			}
			t = t.return;
		}
	}
	function Gu(e, t, n) {
		var r = e.pingCache;
		if (r === null) {
			r = e.pingCache = new zl();
			var i = /* @__PURE__ */ new Set();
			r.set(t, i);
		} else i = r.get(t), i === void 0 && (i = /* @__PURE__ */ new Set(), r.set(t, i));
		i.has(n) || (Ul = !0, i.add(n), e = Ku.bind(null, e, t, n), t.then(e, e));
	}
	function Ku(e, t, n) {
		var r = e.pingCache;
		r !== null && r.delete(t), e.pingedLanes |= e.suspendedLanes & n, e.warmLanes &= ~n, K === e && (J & n) === n && (X === 4 || X === 3 && (J & 62914560) === J && 300 > Ne() - $l ? !(G & 2) && Su(e, 0) : ql |= n, Yl === J && (Yl = 0)), rd(e);
	}
	function qu(e, t) {
		t === 0 && (t = Xe()), e = ri(e, t), e !== null && (Qe(e, t), rd(e));
	}
	function Ju(e) {
		var t = e.memoizedState, n = 0;
		t !== null && (n = t.retryLane), qu(e, n);
	}
	function Yu(e, t) {
		var n = 0;
		switch (e.tag) {
			case 31:
			case 13:
				var r = e.stateNode, a = e.memoizedState;
				a !== null && (n = a.retryLane);
				break;
			case 19:
				r = e.stateNode;
				break;
			case 22:
				r = e.stateNode._retryCache;
				break;
			default: throw Error(i(314));
		}
		r !== null && r.delete(t), qu(e, n);
	}
	function Xu(e, t) {
		return ke(e, t);
	}
	var Zu = null, Qu = null, $u = !1, ed = !1, td = !1, nd = 0;
	function rd(e) {
		e !== Qu && e.next === null && (Qu === null ? Zu = Qu = e : Qu = Qu.next = e), ed = !0, $u || ($u = !0, ud());
	}
	function id(e, t) {
		if (!td && ed) {
			td = !0;
			do
				for (var n = !1, r = Zu; r !== null;) {
					if (!t) if (e !== 0) {
						var i = r.pendingLanes;
						if (i === 0) var a = 0;
						else {
							var o = r.suspendedLanes, s = r.pingedLanes;
							a = (1 << 31 - M(42 | e) + 1) - 1, a &= i & ~(o & ~s), a = a & 201326741 ? a & 201326741 | 1 : a ? a | 2 : 0;
						}
						a !== 0 && (n = !0, ld(r, a));
					} else a = J, a = Je(r, r === K ? a : 0, r.cancelPendingCommit !== null || r.timeoutHandle !== -1), !(a & 3) || I(r, a) || (n = !0, ld(r, a));
					r = r.next;
				}
			while (n);
			td = !1;
		}
	}
	function ad() {
		od();
	}
	function od() {
		ed = $u = !1;
		var e = 0;
		nd !== 0 && Gd() && (e = nd);
		for (var t = Ne(), n = null, r = Zu; r !== null;) {
			var i = r.next, a = sd(r, t);
			a === 0 ? (r.next = null, n === null ? Zu = i : n.next = i, i === null && (Qu = n)) : (n = r, (e !== 0 || a & 3) && (ed = !0)), r = i;
		}
		iu !== 0 && iu !== 5 || id(e, !1), nd !== 0 && (nd = 0);
	}
	function sd(e, t) {
		for (var n = e.suspendedLanes, r = e.pingedLanes, i = e.expirationTimes, a = e.pendingLanes & -62914561; 0 < a;) {
			var o = 31 - M(a), s = 1 << o, c = i[o];
			c === -1 ? ((s & n) === 0 || (s & r) !== 0) && (i[o] = Ye(s, t)) : c <= t && (e.expiredLanes |= s), a &= ~s;
		}
		if (t = K, n = J, n = Je(e, e === t ? n : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1), r = e.callbackNode, n === 0 || e === t && (Y === 2 || Y === 9) || e.cancelPendingCommit !== null) return r !== null && r !== null && Ae(r), e.callbackNode = null, e.callbackPriority = 0;
		if (!(n & 3) || I(e, n)) {
			if (t = n & -n, t === e.callbackPriority) return t;
			switch (r !== null && Ae(r), it(n)) {
				case 2:
				case 8:
					n = Ie;
					break;
				case 32:
					n = Le;
					break;
				case 268435456:
					n = ze;
					break;
				default: n = Le;
			}
			return r = cd.bind(null, e), n = ke(n, r), e.callbackPriority = t, e.callbackNode = n, t;
		}
		return r !== null && r !== null && Ae(r), e.callbackPriority = 2, e.callbackNode = null, 2;
	}
	function cd(e, t) {
		if (iu !== 0 && iu !== 5) return e.callbackNode = null, e.callbackPriority = 0, null;
		var n = e.callbackNode;
		if (Hu() && e.callbackNode !== n) return null;
		var r = J;
		return r = Je(e, e === K ? r : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1), r === 0 ? null : (gu(e, r, t), sd(e, Ne()), e.callbackNode != null && e.callbackNode === n ? cd.bind(null, e) : null);
	}
	function ld(e, t) {
		if (Hu()) return null;
		gu(e, t, !0);
	}
	function ud() {
		Yd(function() {
			G & 6 ? ke(Fe, ad) : od();
		});
	}
	function dd() {
		if (nd === 0) {
			var e = da;
			e === 0 && (e = F, F <<= 1, !(F & 261888) && (F = 256)), nd = e;
		}
		return nd;
	}
	function fd(e) {
		return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : $t("" + e);
	}
	function pd(e, t) {
		var n = t.ownerDocument.createElement("input");
		return n.name = t.name, n.value = t.value, e.id && n.setAttribute("form", e.id), t.parentNode.insertBefore(n, t), e = new FormData(e), n.parentNode.removeChild(n), e;
	}
	function md(e, t, n, r, i) {
		if (t === "submit" && n && n.stateNode === i) {
			var a = fd((i[L] || null).action), o = r.submitter;
			o && (t = (t = o[L] || null) ? fd(t.formAction) : o.getAttribute("formAction"), t !== null && (a = t, o = null));
			var s = new xn("action", "action", null, r, i);
			e.push({
				event: s,
				listeners: [{
					instance: null,
					listener: function() {
						if (r.defaultPrevented) {
							if (nd !== 0) {
								var e = o ? pd(i, o) : new FormData(i);
								Ts(n, {
									pending: !0,
									data: e,
									method: i.method,
									action: a
								}, null, e);
							}
						} else typeof a == "function" && (s.preventDefault(), e = o ? pd(i, o) : new FormData(i), Ts(n, {
							pending: !0,
							data: e,
							method: i.method,
							action: a
						}, a, e));
					},
					currentTarget: i
				}]
			});
		}
	}
	for (var hd = 0; hd < Jr.length; hd++) {
		var gd = Jr[hd];
		Yr(gd.toLowerCase(), "on" + (gd[0].toUpperCase() + gd.slice(1)));
	}
	Yr(Br, "onAnimationEnd"), Yr(Vr, "onAnimationIteration"), Yr(Hr, "onAnimationStart"), Yr("dblclick", "onDoubleClick"), Yr("focusin", "onFocus"), Yr("focusout", "onBlur"), Yr(Ur, "onTransitionRun"), Yr(Wr, "onTransitionStart"), Yr(Gr, "onTransitionCancel"), Yr(Kr, "onTransitionEnd"), wt("onMouseEnter", ["mouseout", "mouseover"]), wt("onMouseLeave", ["mouseout", "mouseover"]), wt("onPointerEnter", ["pointerout", "pointerover"]), wt("onPointerLeave", ["pointerout", "pointerover"]), Ct("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), Ct("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), Ct("onBeforeInput", [
		"compositionend",
		"keypress",
		"textInput",
		"paste"
	]), Ct("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), Ct("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), Ct("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
	var _d = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), vd = new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(_d));
	function yd(e, t) {
		t = (t & 4) != 0;
		for (var n = 0; n < e.length; n++) {
			var r = e[n], i = r.event;
			r = r.listeners;
			a: {
				var a = void 0;
				if (t) for (var o = r.length - 1; 0 <= o; o--) {
					var s = r[o], c = s.instance, l = s.currentTarget;
					if (s = s.listener, c !== a && i.isPropagationStopped()) break a;
					a = s, i.currentTarget = l;
					try {
						a(i);
					} catch (e) {
						Xr(e);
					}
					i.currentTarget = null, a = c;
				}
				else for (o = 0; o < r.length; o++) {
					if (s = r[o], c = s.instance, l = s.currentTarget, s = s.listener, c !== a && i.isPropagationStopped()) break a;
					a = s, i.currentTarget = l;
					try {
						a(i);
					} catch (e) {
						Xr(e);
					}
					i.currentTarget = null, a = c;
				}
			}
		}
	}
	function Q(e, t) {
		var n = t[ut];
		n === void 0 && (n = t[ut] = /* @__PURE__ */ new Set());
		var r = e + "__bubble";
		n.has(r) || (Cd(t, e, 2, !1), n.add(r));
	}
	function bd(e, t, n) {
		var r = 0;
		t && (r |= 4), Cd(n, e, r, t);
	}
	var xd = "_reactListening" + Math.random().toString(36).slice(2);
	function Sd(e) {
		if (!e[xd]) {
			e[xd] = !0, xt.forEach(function(t) {
				t !== "selectionchange" && (vd.has(t) || bd(t, !1, e), bd(t, !0, e));
			});
			var t = e.nodeType === 9 ? e : e.ownerDocument;
			t === null || t[xd] || (t[xd] = !0, bd("selectionchange", !1, t));
		}
	}
	function Cd(e, t, n, r) {
		switch (mp(t)) {
			case 2:
				var i = cp;
				break;
			case 8:
				i = lp;
				break;
			default: i = up;
		}
		n = i.bind(null, t, n, e), i = void 0, !un || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (i = !0), r ? i === void 0 ? e.addEventListener(t, n, !0) : e.addEventListener(t, n, {
			capture: !0,
			passive: i
		}) : i === void 0 ? e.addEventListener(t, n, !1) : e.addEventListener(t, n, { passive: i });
	}
	function wd(e, t, n, r, i) {
		var a = r;
		if (!(t & 1) && !(t & 2) && r !== null) a: for (;;) {
			if (r === null) return;
			var s = r.tag;
			if (s === 3 || s === 4) {
				var c = r.stateNode.containerInfo;
				if (c === i) break;
				if (s === 4) for (s = r.return; s !== null;) {
					var l = s.tag;
					if ((l === 3 || l === 4) && s.stateNode.containerInfo === i) return;
					s = s.return;
				}
				for (; c !== null;) {
					if (s = gt(c), s === null) return;
					if (l = s.tag, l === 5 || l === 6 || l === 26 || l === 27) {
						r = a = s;
						continue a;
					}
					c = c.parentNode;
				}
			}
			r = r.return;
		}
		sn(function() {
			var r = a, i = nn(n), s = [];
			a: {
				var c = qr.get(e);
				if (c !== void 0) {
					var l = xn, u = e;
					switch (e) {
						case "keypress": if (gn(n) === 0) break a;
						case "keydown":
						case "keyup":
							l = zn;
							break;
						case "focusin":
							u = "focus", l = An;
							break;
						case "focusout":
							u = "blur", l = An;
							break;
						case "beforeblur":
						case "afterblur":
							l = An;
							break;
						case "click": if (n.button === 2) break a;
						case "auxclick":
						case "dblclick":
						case "mousedown":
						case "mousemove":
						case "mouseup":
						case "mouseout":
						case "mouseover":
						case "contextmenu":
							l = On;
							break;
						case "drag":
						case "dragend":
						case "dragenter":
						case "dragexit":
						case "dragleave":
						case "dragover":
						case "dragstart":
						case "drop":
							l = kn;
							break;
						case "touchcancel":
						case "touchend":
						case "touchmove":
						case "touchstart":
							l = Vn;
							break;
						case Br:
						case Vr:
						case Hr:
							l = jn;
							break;
						case Kr:
							l = Hn;
							break;
						case "scroll":
						case "scrollend":
							l = Cn;
							break;
						case "wheel":
							l = Un;
							break;
						case "copy":
						case "cut":
						case "paste":
							l = Mn;
							break;
						case "gotpointercapture":
						case "lostpointercapture":
						case "pointercancel":
						case "pointerdown":
						case "pointermove":
						case "pointerout":
						case "pointerover":
						case "pointerup":
							l = Bn;
							break;
						case "toggle":
						case "beforetoggle": l = Wn;
					}
					var d = (t & 4) != 0, f = !d && (e === "scroll" || e === "scrollend"), p = d ? c === null ? null : c + "Capture" : c;
					d = [];
					for (var m = r, h; m !== null;) {
						var g = m;
						if (h = g.stateNode, g = g.tag, g !== 5 && g !== 26 && g !== 27 || h === null || p === null || (g = cn(m, p), g != null && d.push(Td(m, g, h))), f) break;
						m = m.return;
					}
					0 < d.length && (c = new l(c, u, null, n, i), s.push({
						event: c,
						listeners: d
					}));
				}
			}
			if (!(t & 7)) {
				a: {
					if (c = e === "mouseover" || e === "pointerover", l = e === "mouseout" || e === "pointerout", c && n !== tn && (u = n.relatedTarget || n.fromElement) && (gt(u) || u[lt])) break a;
					if ((l || c) && (c = i.window === i ? i : (c = i.ownerDocument) ? c.defaultView || c.parentWindow : window, l ? (u = n.relatedTarget || n.toElement, l = r, u = u ? gt(u) : null, u !== null && (f = o(u), d = u.tag, u !== f || d !== 5 && d !== 27 && d !== 6) && (u = null)) : (l = null, u = r), l !== u)) {
						if (d = On, g = "onMouseLeave", p = "onMouseEnter", m = "mouse", (e === "pointerout" || e === "pointerover") && (d = Bn, g = "onPointerLeave", p = "onPointerEnter", m = "pointer"), f = l == null ? c : vt(l), h = u == null ? c : vt(u), c = new d(g, m + "leave", l, n, i), c.target = f, c.relatedTarget = h, g = null, gt(i) === r && (d = new d(p, m + "enter", u, n, i), d.target = h, d.relatedTarget = f, g = d), f = g, l && u) b: {
							for (d = Dd, p = l, m = u, h = 0, g = p; g; g = d(g)) h++;
							g = 0;
							for (var _ = m; _; _ = d(_)) g++;
							for (; 0 < h - g;) p = d(p), h--;
							for (; 0 < g - h;) m = d(m), g--;
							for (; h--;) {
								if (p === m || m !== null && p === m.alternate) {
									d = p;
									break b;
								}
								p = d(p), m = d(m);
							}
							d = null;
						}
						else d = null;
						l !== null && Od(s, c, l, d, !1), u !== null && f !== null && Od(s, f, u, d, !0);
					}
				}
				a: {
					if (c = r ? vt(r) : window, l = c.nodeName && c.nodeName.toLowerCase(), l === "select" || l === "input" && c.type === "file") var v = ur;
					else if (ir(c)) if (dr) v = br;
					else {
						v = vr;
						var y = _r;
					}
					else l = c.nodeName, !l || l.toLowerCase() !== "input" || c.type !== "checkbox" && c.type !== "radio" ? r && Xt(r.elementType) && (v = ur) : v = yr;
					if (v &&= v(e, r)) {
						ar(s, v, n, i);
						break a;
					}
					y && y(e, c, r), e === "focusout" && r && c.type === "number" && r.memoizedProps.value != null && Ht(c, "number", c.value);
				}
				switch (y = r ? vt(r) : window, e) {
					case "focusin":
						(ir(y) || y.contentEditable === "true") && (Ar = y, jr = r, Mr = null);
						break;
					case "focusout":
						Mr = jr = Ar = null;
						break;
					case "mousedown":
						Nr = !0;
						break;
					case "contextmenu":
					case "mouseup":
					case "dragend":
						Nr = !1, Pr(s, n, i);
						break;
					case "selectionchange": if (kr) break;
					case "keydown":
					case "keyup": Pr(s, n, i);
				}
				var b;
				if (Kn) b: {
					switch (e) {
						case "compositionstart":
							var x = "onCompositionStart";
							break b;
						case "compositionend":
							x = "onCompositionEnd";
							break b;
						case "compositionupdate":
							x = "onCompositionUpdate";
							break b;
					}
					x = void 0;
				}
				else er ? Qn(e, n) && (x = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (x = "onCompositionStart");
				x && (Yn && n.locale !== "ko" && (er || x !== "onCompositionStart" ? x === "onCompositionEnd" && er && (b = hn()) : (fn = i, pn = "value" in fn ? fn.value : fn.textContent, er = !0)), y = Ed(r, x), 0 < y.length && (x = new Nn(x, e, null, n, i), s.push({
					event: x,
					listeners: y
				}), b ? x.data = b : (b = $n(n), b !== null && (x.data = b)))), (b = Jn ? tr(e, n) : nr(e, n)) && (x = Ed(r, "onBeforeInput"), 0 < x.length && (y = new Nn("onBeforeInput", "beforeinput", null, n, i), s.push({
					event: y,
					listeners: x
				}), y.data = b)), md(s, e, r, n, i);
			}
			yd(s, t);
		});
	}
	function Td(e, t, n) {
		return {
			instance: e,
			listener: t,
			currentTarget: n
		};
	}
	function Ed(e, t) {
		for (var n = t + "Capture", r = []; e !== null;) {
			var i = e, a = i.stateNode;
			if (i = i.tag, i !== 5 && i !== 26 && i !== 27 || a === null || (i = cn(e, n), i != null && r.unshift(Td(e, i, a)), i = cn(e, t), i != null && r.push(Td(e, i, a))), e.tag === 3) return r;
			e = e.return;
		}
		return [];
	}
	function Dd(e) {
		if (e === null) return null;
		do
			e = e.return;
		while (e && e.tag !== 5 && e.tag !== 27);
		return e || null;
	}
	function Od(e, t, n, r, i) {
		for (var a = t._reactName, o = []; n !== null && n !== r;) {
			var s = n, c = s.alternate, l = s.stateNode;
			if (s = s.tag, c !== null && c === r) break;
			s !== 5 && s !== 26 && s !== 27 || l === null || (c = l, i ? (l = cn(n, a), l != null && o.unshift(Td(n, l, c))) : i || (l = cn(n, a), l != null && o.push(Td(n, l, c)))), n = n.return;
		}
		o.length !== 0 && e.push({
			event: t,
			listeners: o
		});
	}
	var kd = /\r\n?/g, Ad = /\u0000|\uFFFD/g;
	function jd(e) {
		return (typeof e == "string" ? e : "" + e).replace(kd, "\n").replace(Ad, "");
	}
	function Md(e, t) {
		return t = jd(t), jd(e) === t;
	}
	function $(e, t, n, r, a, o) {
		switch (n) {
			case "children":
				typeof r == "string" ? t === "body" || t === "textarea" && r === "" || Kt(e, r) : (typeof r == "number" || typeof r == "bigint") && t !== "body" && Kt(e, "" + r);
				break;
			case "className":
				At(e, "class", r);
				break;
			case "tabIndex":
				At(e, "tabindex", r);
				break;
			case "dir":
			case "role":
			case "viewBox":
			case "width":
			case "height":
				At(e, n, r);
				break;
			case "style":
				Yt(e, r, o);
				break;
			case "data": if (t !== "object") {
				At(e, "data", r);
				break;
			}
			case "src":
			case "href":
				if (r === "" && (t !== "a" || n !== "href")) {
					e.removeAttribute(n);
					break;
				}
				if (r == null || typeof r == "function" || typeof r == "symbol" || typeof r == "boolean") {
					e.removeAttribute(n);
					break;
				}
				r = $t("" + r), e.setAttribute(n, r);
				break;
			case "action":
			case "formAction":
				if (typeof r == "function") {
					e.setAttribute(n, "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");
					break;
				} else typeof o == "function" && (n === "formAction" ? (t !== "input" && $(e, t, "name", a.name, a, null), $(e, t, "formEncType", a.formEncType, a, null), $(e, t, "formMethod", a.formMethod, a, null), $(e, t, "formTarget", a.formTarget, a, null)) : ($(e, t, "encType", a.encType, a, null), $(e, t, "method", a.method, a, null), $(e, t, "target", a.target, a, null)));
				if (r == null || typeof r == "symbol" || typeof r == "boolean") {
					e.removeAttribute(n);
					break;
				}
				r = $t("" + r), e.setAttribute(n, r);
				break;
			case "onClick":
				r != null && (e.onclick = en);
				break;
			case "onScroll":
				r != null && Q("scroll", e);
				break;
			case "onScrollEnd":
				r != null && Q("scrollend", e);
				break;
			case "dangerouslySetInnerHTML":
				if (r != null) {
					if (typeof r != "object" || !("__html" in r)) throw Error(i(61));
					if (n = r.__html, n != null) {
						if (a.children != null) throw Error(i(60));
						e.innerHTML = n;
					}
				}
				break;
			case "multiple":
				e.multiple = r && typeof r != "function" && typeof r != "symbol";
				break;
			case "muted":
				e.muted = r && typeof r != "function" && typeof r != "symbol";
				break;
			case "suppressContentEditableWarning":
			case "suppressHydrationWarning":
			case "defaultValue":
			case "defaultChecked":
			case "innerHTML":
			case "ref": break;
			case "autoFocus": break;
			case "xlinkHref":
				if (r == null || typeof r == "function" || typeof r == "boolean" || typeof r == "symbol") {
					e.removeAttribute("xlink:href");
					break;
				}
				n = $t("" + r), e.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", n);
				break;
			case "contentEditable":
			case "spellCheck":
			case "draggable":
			case "value":
			case "autoReverse":
			case "externalResourcesRequired":
			case "focusable":
			case "preserveAlpha":
				r != null && typeof r != "function" && typeof r != "symbol" ? e.setAttribute(n, "" + r) : e.removeAttribute(n);
				break;
			case "inert":
			case "allowFullScreen":
			case "async":
			case "autoPlay":
			case "controls":
			case "default":
			case "defer":
			case "disabled":
			case "disablePictureInPicture":
			case "disableRemotePlayback":
			case "formNoValidate":
			case "hidden":
			case "loop":
			case "noModule":
			case "noValidate":
			case "open":
			case "playsInline":
			case "readOnly":
			case "required":
			case "reversed":
			case "scoped":
			case "seamless":
			case "itemScope":
				r && typeof r != "function" && typeof r != "symbol" ? e.setAttribute(n, "") : e.removeAttribute(n);
				break;
			case "capture":
			case "download":
				!0 === r ? e.setAttribute(n, "") : !1 !== r && r != null && typeof r != "function" && typeof r != "symbol" ? e.setAttribute(n, r) : e.removeAttribute(n);
				break;
			case "cols":
			case "rows":
			case "size":
			case "span":
				r != null && typeof r != "function" && typeof r != "symbol" && !isNaN(r) && 1 <= r ? e.setAttribute(n, r) : e.removeAttribute(n);
				break;
			case "rowSpan":
			case "start":
				r == null || typeof r == "function" || typeof r == "symbol" || isNaN(r) ? e.removeAttribute(n) : e.setAttribute(n, r);
				break;
			case "popover":
				Q("beforetoggle", e), Q("toggle", e), kt(e, "popover", r);
				break;
			case "xlinkActuate":
				jt(e, "http://www.w3.org/1999/xlink", "xlink:actuate", r);
				break;
			case "xlinkArcrole":
				jt(e, "http://www.w3.org/1999/xlink", "xlink:arcrole", r);
				break;
			case "xlinkRole":
				jt(e, "http://www.w3.org/1999/xlink", "xlink:role", r);
				break;
			case "xlinkShow":
				jt(e, "http://www.w3.org/1999/xlink", "xlink:show", r);
				break;
			case "xlinkTitle":
				jt(e, "http://www.w3.org/1999/xlink", "xlink:title", r);
				break;
			case "xlinkType":
				jt(e, "http://www.w3.org/1999/xlink", "xlink:type", r);
				break;
			case "xmlBase":
				jt(e, "http://www.w3.org/XML/1998/namespace", "xml:base", r);
				break;
			case "xmlLang":
				jt(e, "http://www.w3.org/XML/1998/namespace", "xml:lang", r);
				break;
			case "xmlSpace":
				jt(e, "http://www.w3.org/XML/1998/namespace", "xml:space", r);
				break;
			case "is":
				kt(e, "is", r);
				break;
			case "innerText":
			case "textContent": break;
			default: (!(2 < n.length) || n[0] !== "o" && n[0] !== "O" || n[1] !== "n" && n[1] !== "N") && (n = Zt.get(n) || n, kt(e, n, r));
		}
	}
	function Nd(e, t, n, r, a, o) {
		switch (n) {
			case "style":
				Yt(e, r, o);
				break;
			case "dangerouslySetInnerHTML":
				if (r != null) {
					if (typeof r != "object" || !("__html" in r)) throw Error(i(61));
					if (n = r.__html, n != null) {
						if (a.children != null) throw Error(i(60));
						e.innerHTML = n;
					}
				}
				break;
			case "children":
				typeof r == "string" ? Kt(e, r) : (typeof r == "number" || typeof r == "bigint") && Kt(e, "" + r);
				break;
			case "onScroll":
				r != null && Q("scroll", e);
				break;
			case "onScrollEnd":
				r != null && Q("scrollend", e);
				break;
			case "onClick":
				r != null && (e.onclick = en);
				break;
			case "suppressContentEditableWarning":
			case "suppressHydrationWarning":
			case "innerHTML":
			case "ref": break;
			case "innerText":
			case "textContent": break;
			default: if (!St.hasOwnProperty(n)) a: {
				if (n[0] === "o" && n[1] === "n" && (a = n.endsWith("Capture"), t = n.slice(2, a ? n.length - 7 : void 0), o = e[L] || null, o = o == null ? null : o[n], typeof o == "function" && e.removeEventListener(t, o, a), typeof r == "function")) {
					typeof o != "function" && o !== null && (n in e ? e[n] = null : e.hasAttribute(n) && e.removeAttribute(n)), e.addEventListener(t, r, a);
					break a;
				}
				n in e ? e[n] = r : !0 === r ? e.setAttribute(n, "") : kt(e, n, r);
			}
		}
	}
	function Pd(e, t, n) {
		switch (t) {
			case "div":
			case "span":
			case "svg":
			case "path":
			case "a":
			case "g":
			case "p":
			case "li": break;
			case "img":
				Q("error", e), Q("load", e);
				var r = !1, a = !1, o;
				for (o in n) if (n.hasOwnProperty(o)) {
					var s = n[o];
					if (s != null) switch (o) {
						case "src":
							r = !0;
							break;
						case "srcSet":
							a = !0;
							break;
						case "children":
						case "dangerouslySetInnerHTML": throw Error(i(137, t));
						default: $(e, t, o, s, n, null);
					}
				}
				a && $(e, t, "srcSet", n.srcSet, n, null), r && $(e, t, "src", n.src, n, null);
				return;
			case "input":
				Q("invalid", e);
				var c = o = s = a = null, l = null, u = null;
				for (r in n) if (n.hasOwnProperty(r)) {
					var d = n[r];
					if (d != null) switch (r) {
						case "name":
							a = d;
							break;
						case "type":
							s = d;
							break;
						case "checked":
							l = d;
							break;
						case "defaultChecked":
							u = d;
							break;
						case "value":
							o = d;
							break;
						case "defaultValue":
							c = d;
							break;
						case "children":
						case "dangerouslySetInnerHTML":
							if (d != null) throw Error(i(137, t));
							break;
						default: $(e, t, r, d, n, null);
					}
				}
				Vt(e, o, c, l, u, s, a, !1);
				return;
			case "select":
				for (a in Q("invalid", e), r = s = o = null, n) if (n.hasOwnProperty(a) && (c = n[a], c != null)) switch (a) {
					case "value":
						o = c;
						break;
					case "defaultValue":
						s = c;
						break;
					case "multiple": r = c;
					default: $(e, t, a, c, n, null);
				}
				t = o, n = s, e.multiple = !!r, t == null ? n != null && Ut(e, !!r, n, !0) : Ut(e, !!r, t, !1);
				return;
			case "textarea":
				for (s in Q("invalid", e), o = a = r = null, n) if (n.hasOwnProperty(s) && (c = n[s], c != null)) switch (s) {
					case "value":
						r = c;
						break;
					case "defaultValue":
						a = c;
						break;
					case "children":
						o = c;
						break;
					case "dangerouslySetInnerHTML":
						if (c != null) throw Error(i(91));
						break;
					default: $(e, t, s, c, n, null);
				}
				Gt(e, r, a, o);
				return;
			case "option":
				for (l in n) if (n.hasOwnProperty(l) && (r = n[l], r != null)) switch (l) {
					case "selected":
						e.selected = r && typeof r != "function" && typeof r != "symbol";
						break;
					default: $(e, t, l, r, n, null);
				}
				return;
			case "dialog":
				Q("beforetoggle", e), Q("toggle", e), Q("cancel", e), Q("close", e);
				break;
			case "iframe":
			case "object":
				Q("load", e);
				break;
			case "video":
			case "audio":
				for (r = 0; r < _d.length; r++) Q(_d[r], e);
				break;
			case "image":
				Q("error", e), Q("load", e);
				break;
			case "details":
				Q("toggle", e);
				break;
			case "embed":
			case "source":
			case "link": Q("error", e), Q("load", e);
			case "area":
			case "base":
			case "br":
			case "col":
			case "hr":
			case "keygen":
			case "meta":
			case "param":
			case "track":
			case "wbr":
			case "menuitem":
				for (u in n) if (n.hasOwnProperty(u) && (r = n[u], r != null)) switch (u) {
					case "children":
					case "dangerouslySetInnerHTML": throw Error(i(137, t));
					default: $(e, t, u, r, n, null);
				}
				return;
			default: if (Xt(t)) {
				for (d in n) n.hasOwnProperty(d) && (r = n[d], r !== void 0 && Nd(e, t, d, r, n, void 0));
				return;
			}
		}
		for (c in n) n.hasOwnProperty(c) && (r = n[c], r != null && $(e, t, c, r, n, null));
	}
	function Fd(e, t, n, r) {
		switch (t) {
			case "div":
			case "span":
			case "svg":
			case "path":
			case "a":
			case "g":
			case "p":
			case "li": break;
			case "input":
				var a = null, o = null, s = null, c = null, l = null, u = null, d = null;
				for (m in n) {
					var f = n[m];
					if (n.hasOwnProperty(m) && f != null) switch (m) {
						case "checked": break;
						case "value": break;
						case "defaultValue": l = f;
						default: r.hasOwnProperty(m) || $(e, t, m, null, r, f);
					}
				}
				for (var p in r) {
					var m = r[p];
					if (f = n[p], r.hasOwnProperty(p) && (m != null || f != null)) switch (p) {
						case "type":
							o = m;
							break;
						case "name":
							a = m;
							break;
						case "checked":
							u = m;
							break;
						case "defaultChecked":
							d = m;
							break;
						case "value":
							s = m;
							break;
						case "defaultValue":
							c = m;
							break;
						case "children":
						case "dangerouslySetInnerHTML":
							if (m != null) throw Error(i(137, t));
							break;
						default: m !== f && $(e, t, p, m, r, f);
					}
				}
				Bt(e, s, c, l, u, d, o, a);
				return;
			case "select":
				for (o in m = s = c = p = null, n) if (l = n[o], n.hasOwnProperty(o) && l != null) switch (o) {
					case "value": break;
					case "multiple": m = l;
					default: r.hasOwnProperty(o) || $(e, t, o, null, r, l);
				}
				for (a in r) if (o = r[a], l = n[a], r.hasOwnProperty(a) && (o != null || l != null)) switch (a) {
					case "value":
						p = o;
						break;
					case "defaultValue":
						c = o;
						break;
					case "multiple": s = o;
					default: o !== l && $(e, t, a, o, r, l);
				}
				t = c, n = s, r = m, p == null ? !!r != !!n && (t == null ? Ut(e, !!n, n ? [] : "", !1) : Ut(e, !!n, t, !0)) : Ut(e, !!n, p, !1);
				return;
			case "textarea":
				for (c in m = p = null, n) if (a = n[c], n.hasOwnProperty(c) && a != null && !r.hasOwnProperty(c)) switch (c) {
					case "value": break;
					case "children": break;
					default: $(e, t, c, null, r, a);
				}
				for (s in r) if (a = r[s], o = n[s], r.hasOwnProperty(s) && (a != null || o != null)) switch (s) {
					case "value":
						p = a;
						break;
					case "defaultValue":
						m = a;
						break;
					case "children": break;
					case "dangerouslySetInnerHTML":
						if (a != null) throw Error(i(91));
						break;
					default: a !== o && $(e, t, s, a, r, o);
				}
				Wt(e, p, m);
				return;
			case "option":
				for (var h in n) if (p = n[h], n.hasOwnProperty(h) && p != null && !r.hasOwnProperty(h)) switch (h) {
					case "selected":
						e.selected = !1;
						break;
					default: $(e, t, h, null, r, p);
				}
				for (l in r) if (p = r[l], m = n[l], r.hasOwnProperty(l) && p !== m && (p != null || m != null)) switch (l) {
					case "selected":
						e.selected = p && typeof p != "function" && typeof p != "symbol";
						break;
					default: $(e, t, l, p, r, m);
				}
				return;
			case "img":
			case "link":
			case "area":
			case "base":
			case "br":
			case "col":
			case "embed":
			case "hr":
			case "keygen":
			case "meta":
			case "param":
			case "source":
			case "track":
			case "wbr":
			case "menuitem":
				for (var g in n) p = n[g], n.hasOwnProperty(g) && p != null && !r.hasOwnProperty(g) && $(e, t, g, null, r, p);
				for (u in r) if (p = r[u], m = n[u], r.hasOwnProperty(u) && p !== m && (p != null || m != null)) switch (u) {
					case "children":
					case "dangerouslySetInnerHTML":
						if (p != null) throw Error(i(137, t));
						break;
					default: $(e, t, u, p, r, m);
				}
				return;
			default: if (Xt(t)) {
				for (var _ in n) p = n[_], n.hasOwnProperty(_) && p !== void 0 && !r.hasOwnProperty(_) && Nd(e, t, _, void 0, r, p);
				for (d in r) p = r[d], m = n[d], !r.hasOwnProperty(d) || p === m || p === void 0 && m === void 0 || Nd(e, t, d, p, r, m);
				return;
			}
		}
		for (var v in n) p = n[v], n.hasOwnProperty(v) && p != null && !r.hasOwnProperty(v) && $(e, t, v, null, r, p);
		for (f in r) p = r[f], m = n[f], !r.hasOwnProperty(f) || p === m || p == null && m == null || $(e, t, f, p, r, m);
	}
	function Id(e) {
		switch (e) {
			case "css":
			case "script":
			case "font":
			case "img":
			case "image":
			case "input":
			case "link": return !0;
			default: return !1;
		}
	}
	function Ld() {
		if (typeof performance.getEntriesByType == "function") {
			for (var e = 0, t = 0, n = performance.getEntriesByType("resource"), r = 0; r < n.length; r++) {
				var i = n[r], a = i.transferSize, o = i.initiatorType, s = i.duration;
				if (a && s && Id(o)) {
					for (o = 0, s = i.responseEnd, r += 1; r < n.length; r++) {
						var c = n[r], l = c.startTime;
						if (l > s) break;
						var u = c.transferSize, d = c.initiatorType;
						u && Id(d) && (c = c.responseEnd, o += u * (c < s ? 1 : (s - l) / (c - l)));
					}
					if (--r, t += 8 * (a + o) / (i.duration / 1e3), e++, 10 < e) break;
				}
			}
			if (0 < e) return t / e / 1e6;
		}
		return navigator.connection && (e = navigator.connection.downlink, typeof e == "number") ? e : 5;
	}
	var Rd = null, zd = null;
	function Bd(e) {
		return e.nodeType === 9 ? e : e.ownerDocument;
	}
	function Vd(e) {
		switch (e) {
			case "http://www.w3.org/2000/svg": return 1;
			case "http://www.w3.org/1998/Math/MathML": return 2;
			default: return 0;
		}
	}
	function Hd(e, t) {
		if (e === 0) switch (t) {
			case "svg": return 1;
			case "math": return 2;
			default: return 0;
		}
		return e === 1 && t === "foreignObject" ? 0 : e;
	}
	function Ud(e, t) {
		return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.children == "bigint" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
	}
	var Wd = null;
	function Gd() {
		var e = window.event;
		return e && e.type === "popstate" ? e === Wd ? !1 : (Wd = e, !0) : (Wd = null, !1);
	}
	var Kd = typeof setTimeout == "function" ? setTimeout : void 0, qd = typeof clearTimeout == "function" ? clearTimeout : void 0, Jd = typeof Promise == "function" ? Promise : void 0, Yd = typeof queueMicrotask == "function" ? queueMicrotask : Jd === void 0 ? Kd : function(e) {
		return Jd.resolve(null).then(e).catch(Xd);
	};
	function Xd(e) {
		setTimeout(function() {
			throw e;
		});
	}
	function Zd(e) {
		return e === "head";
	}
	function Qd(e, t) {
		var n = t, r = 0;
		do {
			var i = n.nextSibling;
			if (e.removeChild(n), i && i.nodeType === 8) if (n = i.data, n === "/$" || n === "/&") {
				if (r === 0) {
					e.removeChild(i), Np(t);
					return;
				}
				r--;
			} else if (n === "$" || n === "$?" || n === "$~" || n === "$!" || n === "&") r++;
			else if (n === "html") pf(e.ownerDocument.documentElement);
			else if (n === "head") {
				n = e.ownerDocument.head, pf(n);
				for (var a = n.firstChild; a;) {
					var o = a.nextSibling, s = a.nodeName;
					a[mt] || s === "SCRIPT" || s === "STYLE" || s === "LINK" && a.rel.toLowerCase() === "stylesheet" || n.removeChild(a), a = o;
				}
			} else n === "body" && pf(e.ownerDocument.body);
			n = i;
		} while (n);
		Np(t);
	}
	function $d(e, t) {
		var n = e;
		e = 0;
		do {
			var r = n.nextSibling;
			if (n.nodeType === 1 ? t ? (n._stashedDisplay = n.style.display, n.style.display = "none") : (n.style.display = n._stashedDisplay || "", n.getAttribute("style") === "" && n.removeAttribute("style")) : n.nodeType === 3 && (t ? (n._stashedText = n.nodeValue, n.nodeValue = "") : n.nodeValue = n._stashedText || ""), r && r.nodeType === 8) if (n = r.data, n === "/$") {
				if (e === 0) break;
				e--;
			} else n !== "$" && n !== "$?" && n !== "$~" && n !== "$!" || e++;
			n = r;
		} while (n);
	}
	function ef(e) {
		var t = e.firstChild;
		for (t && t.nodeType === 10 && (t = t.nextSibling); t;) {
			var n = t;
			switch (t = t.nextSibling, n.nodeName) {
				case "HTML":
				case "HEAD":
				case "BODY":
					ef(n), ht(n);
					continue;
				case "SCRIPT":
				case "STYLE": continue;
				case "LINK": if (n.rel.toLowerCase() === "stylesheet") continue;
			}
			e.removeChild(n);
		}
	}
	function tf(e, t, n, r) {
		for (; e.nodeType === 1;) {
			var i = n;
			if (e.nodeName.toLowerCase() !== t.toLowerCase()) {
				if (!r && (e.nodeName !== "INPUT" || e.type !== "hidden")) break;
			} else if (!r) if (t === "input" && e.type === "hidden") {
				var a = i.name == null ? null : "" + i.name;
				if (i.type === "hidden" && e.getAttribute("name") === a) return e;
			} else return e;
			else if (!e[mt]) switch (t) {
				case "meta":
					if (!e.hasAttribute("itemprop")) break;
					return e;
				case "link":
					if (a = e.getAttribute("rel"), a === "stylesheet" && e.hasAttribute("data-precedence") || a !== i.rel || e.getAttribute("href") !== (i.href == null || i.href === "" ? null : i.href) || e.getAttribute("crossorigin") !== (i.crossOrigin == null ? null : i.crossOrigin) || e.getAttribute("title") !== (i.title == null ? null : i.title)) break;
					return e;
				case "style":
					if (e.hasAttribute("data-precedence")) break;
					return e;
				case "script":
					if (a = e.getAttribute("src"), (a !== (i.src == null ? null : i.src) || e.getAttribute("type") !== (i.type == null ? null : i.type) || e.getAttribute("crossorigin") !== (i.crossOrigin == null ? null : i.crossOrigin)) && a && e.hasAttribute("async") && !e.hasAttribute("itemprop")) break;
					return e;
				default: return e;
			}
			if (e = cf(e.nextSibling), e === null) break;
		}
		return null;
	}
	function nf(e, t, n) {
		if (t === "") return null;
		for (; e.nodeType !== 3;) if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !n || (e = cf(e.nextSibling), e === null)) return null;
		return e;
	}
	function rf(e, t) {
		for (; e.nodeType !== 8;) if ((e.nodeType !== 1 || e.nodeName !== "INPUT" || e.type !== "hidden") && !t || (e = cf(e.nextSibling), e === null)) return null;
		return e;
	}
	function af(e) {
		return e.data === "$?" || e.data === "$~";
	}
	function of(e) {
		return e.data === "$!" || e.data === "$?" && e.ownerDocument.readyState !== "loading";
	}
	function sf(e, t) {
		var n = e.ownerDocument;
		if (e.data === "$~") e._reactRetry = t;
		else if (e.data !== "$?" || n.readyState !== "loading") t();
		else {
			var r = function() {
				t(), n.removeEventListener("DOMContentLoaded", r);
			};
			n.addEventListener("DOMContentLoaded", r), e._reactRetry = r;
		}
	}
	function cf(e) {
		for (; e != null; e = e.nextSibling) {
			var t = e.nodeType;
			if (t === 1 || t === 3) break;
			if (t === 8) {
				if (t = e.data, t === "$" || t === "$!" || t === "$?" || t === "$~" || t === "&" || t === "F!" || t === "F") break;
				if (t === "/$" || t === "/&") return null;
			}
		}
		return e;
	}
	var lf = null;
	function uf(e) {
		e = e.nextSibling;
		for (var t = 0; e;) {
			if (e.nodeType === 8) {
				var n = e.data;
				if (n === "/$" || n === "/&") {
					if (t === 0) return cf(e.nextSibling);
					t--;
				} else n !== "$" && n !== "$!" && n !== "$?" && n !== "$~" && n !== "&" || t++;
			}
			e = e.nextSibling;
		}
		return null;
	}
	function df(e) {
		e = e.previousSibling;
		for (var t = 0; e;) {
			if (e.nodeType === 8) {
				var n = e.data;
				if (n === "$" || n === "$!" || n === "$?" || n === "$~" || n === "&") {
					if (t === 0) return e;
					t--;
				} else n !== "/$" && n !== "/&" || t++;
			}
			e = e.previousSibling;
		}
		return null;
	}
	function ff(e, t, n) {
		switch (t = Bd(n), e) {
			case "html":
				if (e = t.documentElement, !e) throw Error(i(452));
				return e;
			case "head":
				if (e = t.head, !e) throw Error(i(453));
				return e;
			case "body":
				if (e = t.body, !e) throw Error(i(454));
				return e;
			default: throw Error(i(451));
		}
	}
	function pf(e) {
		for (var t = e.attributes; t.length;) e.removeAttributeNode(t[0]);
		ht(e);
	}
	var mf = /* @__PURE__ */ new Map(), hf = /* @__PURE__ */ new Set();
	function gf(e) {
		return typeof e.getRootNode == "function" ? e.getRootNode() : e.nodeType === 9 ? e : e.ownerDocument;
	}
	var _f = E.d;
	E.d = {
		f: vf,
		r: yf,
		D: Sf,
		C: Cf,
		L: wf,
		m: Tf,
		X: Df,
		S: Ef,
		M: Of
	};
	function vf() {
		var e = _f.f(), t = bu();
		return e || t;
	}
	function yf(e) {
		var t = _t(e);
		t !== null && t.tag === 5 && t.type === "form" ? Ds(t) : _f.r(e);
	}
	var bf = typeof document > "u" ? null : document;
	function xf(e, t, n) {
		var r = bf;
		if (r && typeof t == "string" && t) {
			var i = zt(t);
			i = "link[rel=\"" + e + "\"][href=\"" + i + "\"]", typeof n == "string" && (i += "[crossorigin=\"" + n + "\"]"), hf.has(i) || (hf.add(i), e = {
				rel: e,
				crossOrigin: n,
				href: t
			}, r.querySelector(i) === null && (t = r.createElement("link"), Pd(t, "link", e), bt(t), r.head.appendChild(t)));
		}
	}
	function Sf(e) {
		_f.D(e), xf("dns-prefetch", e, null);
	}
	function Cf(e, t) {
		_f.C(e, t), xf("preconnect", e, t);
	}
	function wf(e, t, n) {
		_f.L(e, t, n);
		var r = bf;
		if (r && e && t) {
			var i = "link[rel=\"preload\"][as=\"" + zt(t) + "\"]";
			t === "image" && n && n.imageSrcSet ? (i += "[imagesrcset=\"" + zt(n.imageSrcSet) + "\"]", typeof n.imageSizes == "string" && (i += "[imagesizes=\"" + zt(n.imageSizes) + "\"]")) : i += "[href=\"" + zt(e) + "\"]";
			var a = i;
			switch (t) {
				case "style":
					a = Af(e);
					break;
				case "script": a = Pf(e);
			}
			mf.has(a) || (e = h({
				rel: "preload",
				href: t === "image" && n && n.imageSrcSet ? void 0 : e,
				as: t
			}, n), mf.set(a, e), r.querySelector(i) !== null || t === "style" && r.querySelector(jf(a)) || t === "script" && r.querySelector(Ff(a)) || (t = r.createElement("link"), Pd(t, "link", e), bt(t), r.head.appendChild(t)));
		}
	}
	function Tf(e, t) {
		_f.m(e, t);
		var n = bf;
		if (n && e) {
			var r = t && typeof t.as == "string" ? t.as : "script", i = "link[rel=\"modulepreload\"][as=\"" + zt(r) + "\"][href=\"" + zt(e) + "\"]", a = i;
			switch (r) {
				case "audioworklet":
				case "paintworklet":
				case "serviceworker":
				case "sharedworker":
				case "worker":
				case "script": a = Pf(e);
			}
			if (!mf.has(a) && (e = h({
				rel: "modulepreload",
				href: e
			}, t), mf.set(a, e), n.querySelector(i) === null)) {
				switch (r) {
					case "audioworklet":
					case "paintworklet":
					case "serviceworker":
					case "sharedworker":
					case "worker":
					case "script": if (n.querySelector(Ff(a))) return;
				}
				r = n.createElement("link"), Pd(r, "link", e), bt(r), n.head.appendChild(r);
			}
		}
	}
	function Ef(e, t, n) {
		_f.S(e, t, n);
		var r = bf;
		if (r && e) {
			var i = yt(r).hoistableStyles, a = Af(e);
			t ||= "default";
			var o = i.get(a);
			if (!o) {
				var s = {
					loading: 0,
					preload: null
				};
				if (o = r.querySelector(jf(a))) s.loading = 5;
				else {
					e = h({
						rel: "stylesheet",
						href: e,
						"data-precedence": t
					}, n), (n = mf.get(a)) && Rf(e, n);
					var c = o = r.createElement("link");
					bt(c), Pd(c, "link", e), c._p = new Promise(function(e, t) {
						c.onload = e, c.onerror = t;
					}), c.addEventListener("load", function() {
						s.loading |= 1;
					}), c.addEventListener("error", function() {
						s.loading |= 2;
					}), s.loading |= 4, Lf(o, t, r);
				}
				o = {
					type: "stylesheet",
					instance: o,
					count: 1,
					state: s
				}, i.set(a, o);
			}
		}
	}
	function Df(e, t) {
		_f.X(e, t);
		var n = bf;
		if (n && e) {
			var r = yt(n).hoistableScripts, i = Pf(e), a = r.get(i);
			a || (a = n.querySelector(Ff(i)), a || (e = h({
				src: e,
				async: !0
			}, t), (t = mf.get(i)) && zf(e, t), a = n.createElement("script"), bt(a), Pd(a, "link", e), n.head.appendChild(a)), a = {
				type: "script",
				instance: a,
				count: 1,
				state: null
			}, r.set(i, a));
		}
	}
	function Of(e, t) {
		_f.M(e, t);
		var n = bf;
		if (n && e) {
			var r = yt(n).hoistableScripts, i = Pf(e), a = r.get(i);
			a || (a = n.querySelector(Ff(i)), a || (e = h({
				src: e,
				async: !0,
				type: "module"
			}, t), (t = mf.get(i)) && zf(e, t), a = n.createElement("script"), bt(a), Pd(a, "link", e), n.head.appendChild(a)), a = {
				type: "script",
				instance: a,
				count: 1,
				state: null
			}, r.set(i, a));
		}
	}
	function kf(e, t, n, r) {
		var a = (a = A.current) ? gf(a) : null;
		if (!a) throw Error(i(446));
		switch (e) {
			case "meta":
			case "title": return null;
			case "style": return typeof n.precedence == "string" && typeof n.href == "string" ? (t = Af(n.href), n = yt(a).hoistableStyles, r = n.get(t), r || (r = {
				type: "style",
				instance: null,
				count: 0,
				state: null
			}, n.set(t, r)), r) : {
				type: "void",
				instance: null,
				count: 0,
				state: null
			};
			case "link":
				if (n.rel === "stylesheet" && typeof n.href == "string" && typeof n.precedence == "string") {
					e = Af(n.href);
					var o = yt(a).hoistableStyles, s = o.get(e);
					if (s || (a = a.ownerDocument || a, s = {
						type: "stylesheet",
						instance: null,
						count: 0,
						state: {
							loading: 0,
							preload: null
						}
					}, o.set(e, s), (o = a.querySelector(jf(e))) && !o._p && (s.instance = o, s.state.loading = 5), mf.has(e) || (n = {
						rel: "preload",
						as: "style",
						href: n.href,
						crossOrigin: n.crossOrigin,
						integrity: n.integrity,
						media: n.media,
						hrefLang: n.hrefLang,
						referrerPolicy: n.referrerPolicy
					}, mf.set(e, n), o || Nf(a, e, n, s.state))), t && r === null) throw Error(i(528, ""));
					return s;
				}
				if (t && r !== null) throw Error(i(529, ""));
				return null;
			case "script": return t = n.async, n = n.src, typeof n == "string" && t && typeof t != "function" && typeof t != "symbol" ? (t = Pf(n), n = yt(a).hoistableScripts, r = n.get(t), r || (r = {
				type: "script",
				instance: null,
				count: 0,
				state: null
			}, n.set(t, r)), r) : {
				type: "void",
				instance: null,
				count: 0,
				state: null
			};
			default: throw Error(i(444, e));
		}
	}
	function Af(e) {
		return "href=\"" + zt(e) + "\"";
	}
	function jf(e) {
		return "link[rel=\"stylesheet\"][" + e + "]";
	}
	function Mf(e) {
		return h({}, e, {
			"data-precedence": e.precedence,
			precedence: null
		});
	}
	function Nf(e, t, n, r) {
		e.querySelector("link[rel=\"preload\"][as=\"style\"][" + t + "]") ? r.loading = 1 : (t = e.createElement("link"), r.preload = t, t.addEventListener("load", function() {
			return r.loading |= 1;
		}), t.addEventListener("error", function() {
			return r.loading |= 2;
		}), Pd(t, "link", n), bt(t), e.head.appendChild(t));
	}
	function Pf(e) {
		return "[src=\"" + zt(e) + "\"]";
	}
	function Ff(e) {
		return "script[async]" + e;
	}
	function If(e, t, n) {
		if (t.count++, t.instance === null) switch (t.type) {
			case "style":
				var r = e.querySelector("style[data-href~=\"" + zt(n.href) + "\"]");
				if (r) return t.instance = r, bt(r), r;
				var a = h({}, n, {
					"data-href": n.href,
					"data-precedence": n.precedence,
					href: null,
					precedence: null
				});
				return r = (e.ownerDocument || e).createElement("style"), bt(r), Pd(r, "style", a), Lf(r, n.precedence, e), t.instance = r;
			case "stylesheet":
				a = Af(n.href);
				var o = e.querySelector(jf(a));
				if (o) return t.state.loading |= 4, t.instance = o, bt(o), o;
				r = Mf(n), (a = mf.get(a)) && Rf(r, a), o = (e.ownerDocument || e).createElement("link"), bt(o);
				var s = o;
				return s._p = new Promise(function(e, t) {
					s.onload = e, s.onerror = t;
				}), Pd(o, "link", r), t.state.loading |= 4, Lf(o, n.precedence, e), t.instance = o;
			case "script": return o = Pf(n.src), (a = e.querySelector(Ff(o))) ? (t.instance = a, bt(a), a) : (r = n, (a = mf.get(o)) && (r = h({}, n), zf(r, a)), e = e.ownerDocument || e, a = e.createElement("script"), bt(a), Pd(a, "link", r), e.head.appendChild(a), t.instance = a);
			case "void": return null;
			default: throw Error(i(443, t.type));
		}
		else t.type === "stylesheet" && !(t.state.loading & 4) && (r = t.instance, t.state.loading |= 4, Lf(r, n.precedence, e));
		return t.instance;
	}
	function Lf(e, t, n) {
		for (var r = n.querySelectorAll("link[rel=\"stylesheet\"][data-precedence],style[data-precedence]"), i = r.length ? r[r.length - 1] : null, a = i, o = 0; o < r.length; o++) {
			var s = r[o];
			if (s.dataset.precedence === t) a = s;
			else if (a !== i) break;
		}
		a ? a.parentNode.insertBefore(e, a.nextSibling) : (t = n.nodeType === 9 ? n.head : n, t.insertBefore(e, t.firstChild));
	}
	function Rf(e, t) {
		e.crossOrigin ??= t.crossOrigin, e.referrerPolicy ??= t.referrerPolicy, e.title ??= t.title;
	}
	function zf(e, t) {
		e.crossOrigin ??= t.crossOrigin, e.referrerPolicy ??= t.referrerPolicy, e.integrity ??= t.integrity;
	}
	var Bf = null;
	function Vf(e, t, n) {
		if (Bf === null) {
			var r = /* @__PURE__ */ new Map(), i = Bf = /* @__PURE__ */ new Map();
			i.set(n, r);
		} else i = Bf, r = i.get(n), r || (r = /* @__PURE__ */ new Map(), i.set(n, r));
		if (r.has(e)) return r;
		for (r.set(e, null), n = n.getElementsByTagName(e), i = 0; i < n.length; i++) {
			var a = n[i];
			if (!(a[mt] || a[ct] || e === "link" && a.getAttribute("rel") === "stylesheet") && a.namespaceURI !== "http://www.w3.org/2000/svg") {
				var o = a.getAttribute(t) || "";
				o = e + o;
				var s = r.get(o);
				s ? s.push(a) : r.set(o, [a]);
			}
		}
		return r;
	}
	function Hf(e, t, n) {
		e = e.ownerDocument || e, e.head.insertBefore(n, t === "title" ? e.querySelector("head > title") : null);
	}
	function Uf(e, t, n) {
		if (n === 1 || t.itemProp != null) return !1;
		switch (e) {
			case "meta":
			case "title": return !0;
			case "style":
				if (typeof t.precedence != "string" || typeof t.href != "string" || t.href === "") break;
				return !0;
			case "link":
				if (typeof t.rel != "string" || typeof t.href != "string" || t.href === "" || t.onLoad || t.onError) break;
				switch (t.rel) {
					case "stylesheet": return e = t.disabled, typeof t.precedence == "string" && e == null;
					default: return !0;
				}
			case "script": if (t.async && typeof t.async != "function" && typeof t.async != "symbol" && !t.onLoad && !t.onError && t.src && typeof t.src == "string") return !0;
		}
		return !1;
	}
	function Wf(e) {
		return !(e.type === "stylesheet" && !(e.state.loading & 3));
	}
	function Gf(e, t, n, r) {
		if (n.type === "stylesheet" && (typeof r.media != "string" || !1 !== matchMedia(r.media).matches) && !(n.state.loading & 4)) {
			if (n.instance === null) {
				var i = Af(r.href), a = t.querySelector(jf(i));
				if (a) {
					t = a._p, typeof t == "object" && t && typeof t.then == "function" && (e.count++, e = Jf.bind(e), t.then(e, e)), n.state.loading |= 4, n.instance = a, bt(a);
					return;
				}
				a = t.ownerDocument || t, r = Mf(r), (i = mf.get(i)) && Rf(r, i), a = a.createElement("link"), bt(a);
				var o = a;
				o._p = new Promise(function(e, t) {
					o.onload = e, o.onerror = t;
				}), Pd(a, "link", r), n.instance = a;
			}
			e.stylesheets === null && (e.stylesheets = /* @__PURE__ */ new Map()), e.stylesheets.set(n, t), (t = n.state.preload) && !(n.state.loading & 3) && (e.count++, n = Jf.bind(e), t.addEventListener("load", n), t.addEventListener("error", n));
		}
	}
	var Kf = 0;
	function qf(e, t) {
		return e.stylesheets && e.count === 0 && Xf(e, e.stylesheets), 0 < e.count || 0 < e.imgCount ? function(n) {
			var r = setTimeout(function() {
				if (e.stylesheets && Xf(e, e.stylesheets), e.unsuspend) {
					var t = e.unsuspend;
					e.unsuspend = null, t();
				}
			}, 6e4 + t);
			0 < e.imgBytes && Kf === 0 && (Kf = 62500 * Ld());
			var i = setTimeout(function() {
				if (e.waitingForImages = !1, e.count === 0 && (e.stylesheets && Xf(e, e.stylesheets), e.unsuspend)) {
					var t = e.unsuspend;
					e.unsuspend = null, t();
				}
			}, (e.imgBytes > Kf ? 50 : 800) + t);
			return e.unsuspend = n, function() {
				e.unsuspend = null, clearTimeout(r), clearTimeout(i);
			};
		} : null;
	}
	function Jf() {
		if (this.count--, this.count === 0 && (this.imgCount === 0 || !this.waitingForImages)) {
			if (this.stylesheets) Xf(this, this.stylesheets);
			else if (this.unsuspend) {
				var e = this.unsuspend;
				this.unsuspend = null, e();
			}
		}
	}
	var Yf = null;
	function Xf(e, t) {
		e.stylesheets = null, e.unsuspend !== null && (e.count++, Yf = /* @__PURE__ */ new Map(), t.forEach(Zf, e), Yf = null, Jf.call(e));
	}
	function Zf(e, t) {
		if (!(t.state.loading & 4)) {
			var n = Yf.get(e);
			if (n) var r = n.get(null);
			else {
				n = /* @__PURE__ */ new Map(), Yf.set(e, n);
				for (var i = e.querySelectorAll("link[data-precedence],style[data-precedence]"), a = 0; a < i.length; a++) {
					var o = i[a];
					(o.nodeName === "LINK" || o.getAttribute("media") !== "not all") && (n.set(o.dataset.precedence, o), r = o);
				}
				r && n.set(null, r);
			}
			i = t.instance, o = i.getAttribute("data-precedence"), a = n.get(o) || r, a === r && n.set(null, i), n.set(o, i), this.count++, r = Jf.bind(this), i.addEventListener("load", r), i.addEventListener("error", r), a ? a.parentNode.insertBefore(i, a.nextSibling) : (e = e.nodeType === 9 ? e.head : e, e.insertBefore(i, e.firstChild)), t.state.loading |= 4;
		}
	}
	var Qf = {
		$$typeof: C,
		Provider: null,
		Consumer: null,
		_currentValue: de,
		_currentValue2: de,
		_threadCount: 0
	};
	function $f(e, t, n, r, i, a, o, s, c) {
		this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = Ze(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Ze(0), this.hiddenUpdates = Ze(null), this.identifierPrefix = r, this.onUncaughtError = i, this.onCaughtError = a, this.onRecoverableError = o, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = c, this.incompleteTransitions = /* @__PURE__ */ new Map();
	}
	function ep(e, t, n, r, i, a, o, s, c, l, u, d) {
		return e = new $f(e, t, n, o, c, l, u, d, s), t = 1, !0 === a && (t |= 24), a = ci(3, null, null, t), e.current = a, a.stateNode = e, t = sa(), t.refCount++, e.pooledCache = t, t.refCount++, a.memoizedState = {
			element: r,
			isDehydrated: n,
			cache: t
		}, Ba(a), e;
	}
	function tp(e) {
		return e ? (e = oi, e) : oi;
	}
	function np(e, t, n, r, i, a) {
		i = tp(i), r.context === null ? r.context = i : r.pendingContext = i, r = Ha(t), r.payload = { element: n }, a = a === void 0 ? null : a, a !== null && (r.callback = a), n = Ua(e, r, t), n !== null && (hu(n, e, t), Wa(n, e, t));
	}
	function rp(e, t) {
		if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
			var n = e.retryLane;
			e.retryLane = n !== 0 && n < t ? n : t;
		}
	}
	function ip(e, t) {
		rp(e, t), (e = e.alternate) && rp(e, t);
	}
	function ap(e) {
		if (e.tag === 13 || e.tag === 31) {
			var t = ri(e, 67108864);
			t !== null && hu(t, e, 67108864), ip(e, 67108864);
		}
	}
	function op(e) {
		if (e.tag === 13 || e.tag === 31) {
			var t = pu();
			t = rt(t);
			var n = ri(e, t);
			n !== null && hu(n, e, t), ip(e, t);
		}
	}
	var sp = !0;
	function cp(e, t, n, r) {
		var i = T.T;
		T.T = null;
		var a = E.p;
		try {
			E.p = 2, up(e, t, n, r);
		} finally {
			E.p = a, T.T = i;
		}
	}
	function lp(e, t, n, r) {
		var i = T.T;
		T.T = null;
		var a = E.p;
		try {
			E.p = 8, up(e, t, n, r);
		} finally {
			E.p = a, T.T = i;
		}
	}
	function up(e, t, n, r) {
		if (sp) {
			var i = dp(r);
			if (i === null) wd(e, t, r, fp, n), Cp(e, r);
			else if (Tp(i, e, t, n, r)) r.stopPropagation();
			else if (Cp(e, r), t & 4 && -1 < Sp.indexOf(e)) {
				for (; i !== null;) {
					var a = _t(i);
					if (a !== null) switch (a.tag) {
						case 3:
							if (a = a.stateNode, a.current.memoizedState.isDehydrated) {
								var o = qe(a.pendingLanes);
								if (o !== 0) {
									var s = a;
									for (s.pendingLanes |= 2, s.entangledLanes |= 2; o;) {
										var c = 1 << 31 - M(o);
										s.entanglements[1] |= c, o &= ~c;
									}
									rd(a), !(G & 6) && (tu = Ne() + 500, id(0, !1));
								}
							}
							break;
						case 31:
						case 13: s = ri(a, 2), s !== null && hu(s, a, 2), bu(), ip(a, 2);
					}
					if (a = dp(r), a === null && wd(e, t, r, fp, n), a === i) break;
					i = a;
				}
				i !== null && r.stopPropagation();
			} else wd(e, t, r, null, n);
		}
	}
	function dp(e) {
		return e = nn(e), pp(e);
	}
	var fp = null;
	function pp(e) {
		if (fp = null, e = gt(e), e !== null) {
			var t = o(e);
			if (t === null) e = null;
			else {
				var n = t.tag;
				if (n === 13) {
					if (e = s(t), e !== null) return e;
					e = null;
				} else if (n === 31) {
					if (e = c(t), e !== null) return e;
					e = null;
				} else if (n === 3) {
					if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
					e = null;
				} else t !== e && (e = null);
			}
		}
		return fp = e, null;
	}
	function mp(e) {
		switch (e) {
			case "beforetoggle":
			case "cancel":
			case "click":
			case "close":
			case "contextmenu":
			case "copy":
			case "cut":
			case "auxclick":
			case "dblclick":
			case "dragend":
			case "dragstart":
			case "drop":
			case "focusin":
			case "focusout":
			case "input":
			case "invalid":
			case "keydown":
			case "keypress":
			case "keyup":
			case "mousedown":
			case "mouseup":
			case "paste":
			case "pause":
			case "play":
			case "pointercancel":
			case "pointerdown":
			case "pointerup":
			case "ratechange":
			case "reset":
			case "resize":
			case "seeked":
			case "submit":
			case "toggle":
			case "touchcancel":
			case "touchend":
			case "touchstart":
			case "volumechange":
			case "change":
			case "selectionchange":
			case "textInput":
			case "compositionstart":
			case "compositionend":
			case "compositionupdate":
			case "beforeblur":
			case "afterblur":
			case "beforeinput":
			case "blur":
			case "fullscreenchange":
			case "focus":
			case "hashchange":
			case "popstate":
			case "select":
			case "selectstart": return 2;
			case "drag":
			case "dragenter":
			case "dragexit":
			case "dragleave":
			case "dragover":
			case "mousemove":
			case "mouseout":
			case "mouseover":
			case "pointermove":
			case "pointerout":
			case "pointerover":
			case "scroll":
			case "touchmove":
			case "wheel":
			case "mouseenter":
			case "mouseleave":
			case "pointerenter":
			case "pointerleave": return 8;
			case "message": switch (Pe()) {
				case Fe: return 2;
				case Ie: return 8;
				case Le:
				case Re: return 32;
				case ze: return 268435456;
				default: return 32;
			}
			default: return 32;
		}
	}
	var hp = !1, gp = null, _p = null, vp = null, yp = /* @__PURE__ */ new Map(), bp = /* @__PURE__ */ new Map(), xp = [], Sp = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(" ");
	function Cp(e, t) {
		switch (e) {
			case "focusin":
			case "focusout":
				gp = null;
				break;
			case "dragenter":
			case "dragleave":
				_p = null;
				break;
			case "mouseover":
			case "mouseout":
				vp = null;
				break;
			case "pointerover":
			case "pointerout":
				yp.delete(t.pointerId);
				break;
			case "gotpointercapture":
			case "lostpointercapture": bp.delete(t.pointerId);
		}
	}
	function wp(e, t, n, r, i, a) {
		return e === null || e.nativeEvent !== a ? (e = {
			blockedOn: t,
			domEventName: n,
			eventSystemFlags: r,
			nativeEvent: a,
			targetContainers: [i]
		}, t !== null && (t = _t(t), t !== null && ap(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, i !== null && t.indexOf(i) === -1 && t.push(i), e);
	}
	function Tp(e, t, n, r, i) {
		switch (t) {
			case "focusin": return gp = wp(gp, e, t, n, r, i), !0;
			case "dragenter": return _p = wp(_p, e, t, n, r, i), !0;
			case "mouseover": return vp = wp(vp, e, t, n, r, i), !0;
			case "pointerover":
				var a = i.pointerId;
				return yp.set(a, wp(yp.get(a) || null, e, t, n, r, i)), !0;
			case "gotpointercapture": return a = i.pointerId, bp.set(a, wp(bp.get(a) || null, e, t, n, r, i)), !0;
		}
		return !1;
	}
	function Ep(e) {
		var t = gt(e.target);
		if (t !== null) {
			var n = o(t);
			if (n !== null) {
				if (t = n.tag, t === 13) {
					if (t = s(n), t !== null) {
						e.blockedOn = t, ot(e.priority, function() {
							op(n);
						});
						return;
					}
				} else if (t === 31) {
					if (t = c(n), t !== null) {
						e.blockedOn = t, ot(e.priority, function() {
							op(n);
						});
						return;
					}
				} else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
					e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
					return;
				}
			}
		}
		e.blockedOn = null;
	}
	function Dp(e) {
		if (e.blockedOn !== null) return !1;
		for (var t = e.targetContainers; 0 < t.length;) {
			var n = dp(e.nativeEvent);
			if (n === null) {
				n = e.nativeEvent;
				var r = new n.constructor(n.type, n);
				tn = r, n.target.dispatchEvent(r), tn = null;
			} else return t = _t(n), t !== null && ap(t), e.blockedOn = n, !1;
			t.shift();
		}
		return !0;
	}
	function Op(e, t, n) {
		Dp(e) && n.delete(t);
	}
	function kp() {
		hp = !1, gp !== null && Dp(gp) && (gp = null), _p !== null && Dp(_p) && (_p = null), vp !== null && Dp(vp) && (vp = null), yp.forEach(Op), bp.forEach(Op);
	}
	function Ap(e, n) {
		e.blockedOn === n && (e.blockedOn = null, hp || (hp = !0, t.unstable_scheduleCallback(t.unstable_NormalPriority, kp)));
	}
	var jp = null;
	function Mp(e) {
		jp !== e && (jp = e, t.unstable_scheduleCallback(t.unstable_NormalPriority, function() {
			jp === e && (jp = null);
			for (var t = 0; t < e.length; t += 3) {
				var n = e[t], r = e[t + 1], i = e[t + 2];
				if (typeof r != "function") {
					if (pp(r || n) === null) continue;
					break;
				}
				var a = _t(n);
				a !== null && (e.splice(t, 3), t -= 3, Ts(a, {
					pending: !0,
					data: i,
					method: n.method,
					action: r
				}, r, i));
			}
		}));
	}
	function Np(e) {
		function t(t) {
			return Ap(t, e);
		}
		gp !== null && Ap(gp, e), _p !== null && Ap(_p, e), vp !== null && Ap(vp, e), yp.forEach(t), bp.forEach(t);
		for (var n = 0; n < xp.length; n++) {
			var r = xp[n];
			r.blockedOn === e && (r.blockedOn = null);
		}
		for (; 0 < xp.length && (n = xp[0], n.blockedOn === null);) Ep(n), n.blockedOn === null && xp.shift();
		if (n = (e.ownerDocument || e).$$reactFormReplay, n != null) for (r = 0; r < n.length; r += 3) {
			var i = n[r], a = n[r + 1], o = i[L] || null;
			if (typeof a == "function") o || Mp(n);
			else if (o) {
				var s = null;
				if (a && a.hasAttribute("formAction")) {
					if (i = a, o = a[L] || null) s = o.formAction;
					else if (pp(i) !== null) continue;
				} else s = o.action;
				typeof s == "function" ? n[r + 1] = s : (n.splice(r, 3), r -= 3), Mp(n);
			}
		}
	}
	function Pp() {
		function e(e) {
			e.canIntercept && e.info === "react-transition" && e.intercept({
				handler: function() {
					return new Promise(function(e) {
						return i = e;
					});
				},
				focusReset: "manual",
				scroll: "manual"
			});
		}
		function t() {
			i !== null && (i(), i = null), r || setTimeout(n, 20);
		}
		function n() {
			if (!r && !navigation.transition) {
				var e = navigation.currentEntry;
				e && e.url != null && navigation.navigate(e.url, {
					state: e.getState(),
					info: "react-transition",
					history: "replace"
				});
			}
		}
		if (typeof navigation == "object") {
			var r = !1, i = null;
			return navigation.addEventListener("navigate", e), navigation.addEventListener("navigatesuccess", t), navigation.addEventListener("navigateerror", t), setTimeout(n, 100), function() {
				r = !0, navigation.removeEventListener("navigate", e), navigation.removeEventListener("navigatesuccess", t), navigation.removeEventListener("navigateerror", t), i !== null && (i(), i = null);
			};
		}
	}
	function Fp(e) {
		this._internalRoot = e;
	}
	Ip.prototype.render = Fp.prototype.render = function(e) {
		var t = this._internalRoot;
		if (t === null) throw Error(i(409));
		var n = t.current;
		np(n, pu(), e, t, null, null);
	}, Ip.prototype.unmount = Fp.prototype.unmount = function() {
		var e = this._internalRoot;
		if (e !== null) {
			this._internalRoot = null;
			var t = e.containerInfo;
			np(e.current, 2, null, e, null, null), bu(), t[lt] = null;
		}
	};
	function Ip(e) {
		this._internalRoot = e;
	}
	Ip.prototype.unstable_scheduleHydration = function(e) {
		if (e) {
			var t = at();
			e = {
				blockedOn: null,
				target: e,
				priority: t
			};
			for (var n = 0; n < xp.length && t !== 0 && t < xp[n].priority; n++);
			xp.splice(n, 0, e), n === 0 && Ep(e);
		}
	};
	var Lp = n.version;
	if (Lp !== "19.2.6") throw Error(i(527, Lp, "19.2.6"));
	E.findDOMNode = function(e) {
		var t = e._reactInternals;
		if (t === void 0) throw typeof e.render == "function" ? Error(i(188)) : (e = Object.keys(e).join(","), Error(i(268, e)));
		return e = d(t), e = e === null ? null : p(e), e = e === null ? null : e.stateNode, e;
	};
	var Rp = {
		bundleType: 0,
		version: "19.2.6",
		rendererPackageName: "react-dom",
		currentDispatcherRef: T,
		reconcilerVersion: "19.2.6"
	};
	if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
		var zp = __REACT_DEVTOOLS_GLOBAL_HOOK__;
		if (!zp.isDisabled && zp.supportsFiber) try {
			He = zp.inject(Rp), Ue = zp;
		} catch {}
	}
	e.createRoot = function(e, t) {
		if (!a(e)) throw Error(i(299));
		var n = !1, r = "", o = Js, s = Ys, c = Xs;
		return t != null && (!0 === t.unstable_strictMode && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onUncaughtError !== void 0 && (o = t.onUncaughtError), t.onCaughtError !== void 0 && (s = t.onCaughtError), t.onRecoverableError !== void 0 && (c = t.onRecoverableError)), t = ep(e, 1, !1, null, null, n, r, null, o, s, c, Pp), e[lt] = t.current, Sd(e), new Fp(t);
	};
})), g = /* @__PURE__ */ o(((e, t) => {
	function n() {
		if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) try {
			__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(n);
		} catch (e) {
			console.error(e);
		}
	}
	n(), t.exports = h();
})), _ = /* @__PURE__ */ o(((e) => {
	var t = Symbol.for("react.transitional.element"), n = Symbol.for("react.fragment");
	function r(e, n, r) {
		var i = null;
		if (r !== void 0 && (i = "" + r), n.key !== void 0 && (i = "" + n.key), "key" in n) for (var a in r = {}, n) a !== "key" && (r[a] = n[a]);
		else r = n;
		return n = r.ref, {
			$$typeof: t,
			type: e,
			key: i,
			ref: n === void 0 ? null : n,
			props: r
		};
	}
	e.Fragment = n, e.jsx = r, e.jsxs = r;
})), v = /* @__PURE__ */ o(((e, t) => {
	t.exports = _();
})), y = g(), b = /* @__PURE__ */ c(u(), 1), x = v(), S = [
	"#1f5fbf",
	"#07835f",
	"#b7791f",
	"#6852bd",
	"#c53030",
	"#2b6cb0",
	"#0f766e",
	"#805ad5"
], C = /* @__PURE__ */ new Date("2026-06-14T00:00:00+08:00"), w = [
	{
		id: "icbc2616",
		name: "工行 2616",
		type: "银行卡",
		balance: 1479.79,
		purpose: "工资主账户",
		liquid: !0
	},
	{
		id: "yu-ebao-3034",
		name: "余额宝 - 3034",
		type: "支付宝",
		balance: 6709.62,
		purpose: "旅游/余额宝",
		liquid: !0
	},
	{
		id: "yu-ebao-8514",
		name: "余额宝 - 8514",
		type: "支付宝",
		balance: 5e3,
		purpose: "去A股",
		liquid: !0
	},
	{
		id: "wechat-3034",
		name: "微信 - 3034",
		type: "微信",
		balance: 0,
		purpose: "日常零钱",
		liquid: !0
	},
	{
		id: "cash",
		name: "现金",
		type: "现金",
		balance: 0,
		purpose: "备用",
		liquid: !0
	},
	{
		id: "wechat-8514",
		name: "微信 - 8514",
		type: "微信",
		balance: 0,
		purpose: "待填写用途",
		liquid: !0
	},
	{
		id: "icbc7768",
		name: "工行7768",
		type: "银行卡",
		balance: 0,
		purpose: "储蓄",
		liquid: !0
	},
	{
		id: "icbc8615",
		name: "工行8615",
		type: "银行卡",
		balance: 0,
		purpose: "储蓄",
		liquid: !0
	},
	{
		id: "boc8292",
		name: "中国银行8292",
		type: "银行卡",
		balance: 4389.26,
		purpose: "去美股",
		liquid: !0
	},
	{
		id: "cmb",
		name: "招商银行",
		type: "银行卡",
		balance: 0,
		purpose: "储蓄",
		liquid: !0
	}
], ee = [
	{
		id: "rent",
		name: "房租",
		plan: 1800,
		actual: 1800,
		required: !0,
		fixed: !0
	},
	{
		id: "food",
		name: "吃饭",
		plan: 900,
		actual: 620,
		required: !0,
		fixed: !1
	},
	{
		id: "transport",
		name: "交通",
		plan: 300,
		actual: 180,
		required: !0,
		fixed: !1
	},
	{
		id: "phone",
		name: "话费",
		plan: 120,
		actual: 120,
		required: !0,
		fixed: !0
	},
	{
		id: "sub",
		name: "订阅",
		plan: 160,
		actual: 98,
		required: !1,
		fixed: !0
	},
	{
		id: "daily",
		name: "日用品",
		plan: 350,
		actual: 210,
		required: !0,
		fixed: !1
	},
	{
		id: "snack",
		name: "零食",
		plan: 180,
		actual: 110,
		required: !1,
		fixed: !1
	},
	{
		id: "fun",
		name: "娱乐",
		plan: 290,
		actual: 150,
		required: !1,
		fixed: !1
	},
	{
		id: "parents",
		name: "孝敬父母",
		plan: 400,
		actual: 400,
		required: !0,
		fixed: !0
	}
];
function te(e = {}) {
	return ee.map((t) => ({
		...t,
		actual: e[t.id] ?? 0
	}));
}
var ne = [
	{
		id: "2026-06",
		label: "2026年6月",
		salary: 15e3,
		payday: 10,
		stockIncome: 0,
		otherIncome: 0,
		budgets: ee.map((e) => ({ ...e }))
	},
	{
		id: "2026-07",
		label: "2026年7月",
		salary: 15e3,
		payday: 10,
		stockIncome: 0,
		otherIncome: 0,
		budgets: te()
	},
	{
		id: "2026-08",
		label: "2026年8月",
		salary: 15e3,
		payday: 10,
		stockIncome: 0,
		otherIncome: 0,
		budgets: te()
	},
	{
		id: "2026-09",
		label: "2026年9月",
		salary: 15e3,
		payday: 10,
		stockIncome: 0,
		otherIncome: 0,
		budgets: te()
	},
	{
		id: "2026-10",
		label: "2026年10月",
		salary: 15e3,
		payday: 10,
		stockIncome: 0,
		otherIncome: 0,
		budgets: te()
	},
	{
		id: "2026-11",
		label: "2026年11月",
		salary: 15e3,
		payday: 10,
		stockIncome: 0,
		otherIncome: 0,
		budgets: te()
	},
	{
		id: "2026-12",
		label: "2026年12月",
		salary: 15e3,
		payday: 10,
		stockIncome: 0,
		otherIncome: 0,
		budgets: te()
	}
], re = [
	{
		id: "ashare",
		name: "A股组合",
		market: "A股",
		cost: 16500,
		value: 18500,
		currency: "CNY"
	},
	{
		id: "us",
		name: "美股组合",
		market: "美股",
		cost: 1200,
		value: 1280,
		currency: "USD"
	},
	{
		id: "hk",
		name: "港股组合",
		market: "港股",
		cost: 0,
		value: 0,
		currency: "HKD"
	}
], ie = [
	{
		id: "house-debt",
		name: "房子负债",
		amount: 0
	},
	{
		id: "car-debt",
		name: "车子负债",
		amount: 0
	},
	{
		id: "other-debt",
		name: "其他负债",
		amount: 0
	}
], ae = [
	{
		id: "house-asset",
		name: "房产资产",
		amount: 0,
		note: "房产估值"
	},
	{
		id: "car-asset",
		name: "车子资产",
		amount: 0,
		note: "车辆残值"
	},
	{
		id: "other-asset",
		name: "其他资产",
		amount: 0,
		note: "未归类资产"
	}
], oe = [
	{
		id: "rent-reminder",
		name: "房租提醒",
		date: "2026-06-30",
		amount: 1800,
		kind: "房租"
	},
	{
		id: "sub-reminder",
		name: "订阅服务检查",
		date: "2026-06-18",
		amount: 98,
		kind: "订阅"
	},
	{
		id: "deposit-reminder",
		name: "定期存款到期提醒",
		date: "2026-07-12",
		amount: 2e3,
		kind: "定存"
	}
], se = [
	{
		id: "travel",
		name: "旅游基金",
		target: 18e3,
		current: 3e3,
		monthly: 3e3,
		actualMonthly: 3e3
	},
	{
		id: "learning",
		name: "学习成长",
		target: 12e3,
		current: 0,
		monthly: 0,
		actualMonthly: 0
	},
	{
		id: "parent-saving",
		name: "父母储蓄",
		target: 0,
		current: 0,
		monthly: 0,
		actualMonthly: 0
	},
	{
		id: "partner",
		name: "伴侣基金",
		target: 0,
		current: 0,
		monthly: 0,
		actualMonthly: 0
	},
	{
		id: "emergency-goal",
		name: "应急储备",
		target: 13500,
		current: 2e3,
		monthly: 2e3,
		actualMonthly: 0
	}
], ce = [
	{
		id: "debt-strategy",
		name: "债务策略",
		score: 70
	},
	{
		id: "insurance",
		name: "保险管理",
		score: 20
	},
	{
		id: "data-quality",
		name: "数据质量",
		score: 55
	},
	{
		id: "rules-engine",
		name: "规则引擎",
		score: 35
	}
], le = [
	"salary",
	"spendingPlan",
	"travelSaving",
	"learningSaving",
	"parentSaving",
	"partnerSaving",
	"emergencyFund",
	"aSharePlan",
	"usSharePlan",
	"hkSharePlan"
], ue = "2026-06", T = "personal-finance-management-data-v2", E = "personal-finance-management-snapshots-v1", de = "personal-finance-management-monthly-archives-v1", fe = 20, pe = 48, me = [
	{
		id: "income",
		title: "收入",
		desc: "税后工资、实际到账、炒股月结算记录"
	},
	{
		id: "spending",
		title: "支出",
		desc: "实际花费、必要支出、可取消支出"
	},
	{
		id: "cashflow",
		title: "现金流预测",
		desc: "未来 6 个月流入流出和预计余额"
	},
	{
		id: "accounts",
		title: "账户管理",
		desc: "银行卡、支付宝、微信、现金余额可编辑"
	},
	{
		id: "budget",
		title: "预算管理",
		desc: "分类预算和固定支出率"
	},
	{
		id: "investment",
		title: "投资管理",
		desc: "A股、美股、港股市值和投入计划"
	},
	{
		id: "balance",
		title: "资产负债表",
		desc: "总资产、负债项可增删编辑"
	},
	{
		id: "emergency",
		title: "应急金",
		desc: "目标月数、当前金额、覆盖月数"
	},
	{
		id: "reminders",
		title: "账单与提醒",
		desc: "提前 7 天提醒账单和到期事项"
	},
	{
		id: "goals",
		title: "目标管理",
		desc: "旅游、学习、父母储蓄、伴侣基金和大额支出目标"
	},
	{
		id: "reports",
		title: "财务报表",
		desc: "收入、支出、结余、投资表现"
	},
	{
		id: "monthlyArchive",
		title: "月度存档",
		desc: "保存每月收入、支出、账户余额和净资产变化"
	},
	{
		id: "health",
		title: "健康评分",
		desc: "100 分制财务健康状态"
	},
	{
		id: "future",
		title: "数据能力",
		desc: "保险、债务策略、规则引擎、数据质量"
	}
];
function D(e) {
	return new Intl.NumberFormat("zh-CN", {
		style: "currency",
		currency: "CNY",
		maximumFractionDigits: 0
	}).format(Number.isFinite(e) ? e : 0);
}
function O(e, t = 0, n = 100) {
	return Math.min(n, Math.max(t, Number.isFinite(e) ? e : t));
}
function he(e) {
	let t = Number(e);
	return Number.isFinite(t) ? t : 0;
}
function k(e) {
	return `${O(e * 100).toFixed(0)}%`;
}
function A(e) {
	return e.replace("2026年", "").replace("月", "月");
}
function ge(e, t) {
	let [n, r] = e.split("-"), i = Number(n), a = Number(r);
	if (!Number.isFinite(i) || !Number.isFinite(a)) return e;
	let o = new Date(Date.UTC(i, a - 1 + t, 1));
	return `${o.getUTCFullYear()}-${String(o.getUTCMonth() + 1).padStart(2, "0")}`;
}
function _e(e) {
	let [t, n] = e.split("-"), r = Number(t), i = Number(n);
	return !Number.isFinite(r) || !Number.isFinite(i) ? e : `${r}年${i}月`;
}
function ve(e) {
	return e.salary + Math.max(e.stockIncome, 0) + e.otherIncome;
}
function ye(e) {
	return e.budgets.reduce((e, t) => e + t.actual, 0);
}
function be(e) {
	return e.budgets.reduce((e, t) => e + t.plan, 0);
}
function xe(e) {
	let t = `${e.name} ${e.type} ${e.purpose}`.toLowerCase();
	return t.includes("余额宝") && t.includes("8514") || t.includes("a股") ? "aShare" : t.includes("中国银行") && t.includes("8292") || t.includes("美股") || t.includes("us stock") || t.includes("us-stock") ? "usShare" : null;
}
function Se(e) {
	return xe(e) !== null;
}
function Ce(e) {
	let t = `${e.name} ${e.type} ${e.purpose}`.toLowerCase();
	return !Se(e) && (t.includes("旅游") || t.includes("旅行"));
}
function we(e) {
	let t = `${e.name} ${e.type} ${e.purpose}`.toLowerCase();
	return !Se(e) && (t.includes("学习") || t.includes("教育") || t.includes("成长"));
}
function Te(e) {
	let t = `${e.name} ${e.type} ${e.purpose}`.toLowerCase().replace(/\s+/g, ""), n = e.id === "icbc2616" || t.includes("工行2616"), r = t.includes("微信") || t.includes("现金"), i = t.includes("银行卡") || t.includes("银行") || t.includes("工行"), a = t.includes("余额宝");
	return !n && !r && (i || a);
}
function Ee(e) {
	let t = e.name.toLowerCase();
	return t.includes("旅游") || t.includes("旅行") ? "travel" : t.includes("学习") || t.includes("教育") || t.includes("成长") ? "learning" : t.includes("父母") || t.includes("爸妈") || t.includes("孝敬") ? "parent" : t.includes("伴侣") || t.includes("情侣") || t.includes("共同") ? "partner" : t.includes("应急") || t.includes("紧急") ? "emergency" : "other";
}
function De(e) {
	let t = {
		travelCurrent: 0,
		travelMonthly: 0,
		travelActualMonthly: 0,
		learningCurrent: 0,
		learningMonthly: 0,
		learningActualMonthly: 0,
		parentCurrent: 0,
		parentMonthly: 0,
		parentActualMonthly: 0,
		partnerCurrent: 0,
		partnerMonthly: 0,
		partnerActualMonthly: 0,
		emergencyCurrent: 0,
		emergencyMonthly: 0,
		emergencyActualMonthly: 0,
		otherCurrent: 0,
		otherMonthly: 0,
		otherActualMonthly: 0,
		hasTravel: !1,
		hasLearning: !1,
		hasParent: !1,
		hasPartner: !1,
		hasEmergency: !1
	};
	for (let n of e) {
		let e = Ee(n);
		e === "travel" ? (t.travelCurrent += n.current, t.travelMonthly += n.monthly, t.travelActualMonthly += n.actualMonthly, t.hasTravel = !0) : e === "learning" ? (t.learningCurrent += n.current, t.learningMonthly += n.monthly, t.learningActualMonthly += n.actualMonthly, t.hasLearning = !0) : e === "parent" ? (t.parentCurrent += n.current, t.parentMonthly += n.monthly, t.parentActualMonthly += n.actualMonthly, t.hasParent = !0) : e === "partner" ? (t.partnerCurrent += n.current, t.partnerMonthly += n.monthly, t.partnerActualMonthly += n.actualMonthly, t.hasPartner = !0) : e === "emergency" ? (t.emergencyCurrent += n.current, t.emergencyMonthly += n.monthly, t.emergencyActualMonthly += n.actualMonthly, t.hasEmergency = !0) : e === "other" && (t.otherCurrent += n.current, t.otherMonthly += n.monthly, t.otherActualMonthly += n.actualMonthly);
	}
	return t;
}
function Oe(e) {
	let t = (Array.isArray(e) ? e : []).map((e, t) => {
		if (!e || typeof e != "object") return null;
		let n = e, r = typeof n.monthly == "number" ? n.monthly : 0;
		return {
			id: typeof n.id == "string" && n.id.trim() ? n.id : `goal-${t}`,
			name: typeof n.name == "string" && n.name.trim() ? n.name : `目标 ${t + 1}`,
			target: typeof n.target == "number" ? n.target : 0,
			current: typeof n.current == "number" ? n.current : 0,
			monthly: r,
			actualMonthly: typeof n.actualMonthly == "number" ? n.actualMonthly : r
		};
	}).filter((e) => e !== null), n = t.length ? t : se, r = n.some((e) => Ee(e) === "parent") ? n : (() => {
		let e = se.find((e) => e.id === "parent-saving");
		return e ? [...n, e] : n;
	})();
	if (r.some((e) => Ee(e) === "partner")) return r;
	let i = se.find((e) => e.id === "partner");
	return i ? [...r, i] : r;
}
function ke(e) {
	return Array.isArray(e) ? e.map((e, t) => {
		if (!e || typeof e != "object") return null;
		let n = e;
		return {
			id: typeof n.id == "string" && n.id ? n.id : `liability-${t + 1}`,
			name: typeof n.name == "string" && n.name.trim() ? n.name : `负债项 ${t + 1}`,
			amount: typeof n.amount == "number" ? n.amount : 0
		};
	}).filter((e) => e !== null) : [];
}
function Ae(e) {
	return Array.isArray(e) ? e.map((e, t) => {
		if (!e || typeof e != "object") return null;
		let n = e;
		return {
			id: typeof n.id == "string" && n.id ? n.id : `balance-asset-${t + 1}`,
			name: typeof n.name == "string" && n.name.trim() ? n.name : `资产项 ${t + 1}`,
			amount: typeof n.amount == "number" ? n.amount : 0,
			note: typeof n.note == "string" ? n.note : ""
		};
	}).filter((e) => e !== null) : [];
}
function je(e) {
	return Array.isArray(e) ? e.map((e, t) => {
		if (!e || typeof e != "object") return null;
		let n = e;
		return {
			id: typeof n.id == "string" && n.id ? n.id : `archive-account-${t + 1}`,
			name: typeof n.name == "string" && n.name.trim() ? n.name : `账户 ${t + 1}`,
			type: typeof n.type == "string" ? n.type : "",
			balance: typeof n.balance == "number" ? n.balance : 0,
			purpose: typeof n.purpose == "string" ? n.purpose : "",
			liquid: typeof n.liquid == "boolean" ? n.liquid : !0
		};
	}).filter((e) => e !== null) : [];
}
function Me(e) {
	return Array.isArray(e) ? e.map((e, t) => {
		if (!e || typeof e != "object") return null;
		let n = e, r = typeof n.monthId == "string" && n.monthId ? n.monthId : "";
		return r ? {
			id: typeof n.id == "string" && n.id ? n.id : `${r}-${t}`,
			monthId: r,
			label: typeof n.label == "string" && n.label ? n.label : _e(r),
			savedAt: typeof n.savedAt == "string" && n.savedAt ? n.savedAt : (/* @__PURE__ */ new Date()).toISOString(),
			income: typeof n.income == "number" ? n.income : 0,
			spending: typeof n.spending == "number" ? n.spending : 0,
			allocation: typeof n.allocation == "number" ? n.allocation : 0,
			surplus: typeof n.surplus == "number" ? n.surplus : 0,
			accountTotal: typeof n.accountTotal == "number" ? n.accountTotal : 0,
			totalAssets: typeof n.totalAssets == "number" ? n.totalAssets : 0,
			netWorth: typeof n.netWorth == "number" ? n.netWorth : 0,
			totalDebt: typeof n.totalDebt == "number" ? n.totalDebt : 0,
			emergencyFund: typeof n.emergencyFund == "number" ? n.emergencyFund : 0,
			savings: typeof n.savings == "number" ? n.savings : 0,
			accounts: je(n.accounts)
		} : null;
	}).filter((e) => e !== null).sort((e, t) => t.monthId.localeCompare(e.monthId) || t.savedAt.localeCompare(e.savedAt)).slice(0, pe) : [];
}
function Ne(e) {
	return ie.map((t) => ({
		...t,
		amount: t.id === "house-debt" ? e.houseDebt ?? 0 : t.id === "car-debt" ? e.carDebt ?? 0 : e.otherDebt ?? 0
	}));
}
function Pe(e) {
	let t = /* @__PURE__ */ new Date(`${e}T00:00:00+08:00`);
	return Math.ceil((t.getTime() - C.getTime()) / 864e5);
}
function Fe(e) {
	return new Date(e).toLocaleString("zh-CN", {
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
		hour: "2-digit",
		minute: "2-digit"
	});
}
function Ie(e) {
	return e > 0 ? `+${D(e)}` : e < 0 ? `-${D(Math.abs(e))}` : D(0);
}
function Le(e) {
	return e > 0 ? "positive" : e < 0 ? "negative" : "calculated-cell";
}
function Re(e) {
	return [...e].sort((e, t) => e.monthId.localeCompare(t.monthId) || e.savedAt.localeCompare(t.savedAt));
}
function ze(e, t) {
	return Re(e).filter((e) => e.monthId < t).at(-1);
}
function Be({ label: e, value: t, onChange: n, step: r = 100, disabled: i = !1 }) {
	return /* @__PURE__ */ (0, x.jsxs)("label", {
		className: "field",
		children: [/* @__PURE__ */ (0, x.jsx)("span", { children: e }), /* @__PURE__ */ (0, x.jsx)("input", {
			disabled: i,
			inputMode: "decimal",
			min: "0",
			step: r,
			type: "number",
			value: Number.isFinite(t) ? t : 0,
			onChange: (e) => n(he(e.target.value))
		})]
	});
}
function Ve() {
	let [e, t] = (0, b.useState)([]), [n, r] = (0, b.useState)("月"), [i, a] = (0, b.useState)("2026-06"), [o, s] = (0, b.useState)(ne), [c, l] = (0, b.useState)(w), [u, d] = (0, b.useState)(re), [f, p] = (0, b.useState)(7.25), [m, h] = (0, b.useState)(.93), [g, _] = (0, b.useState)(2250), [v, y] = (0, b.useState)(1500), [C, te] = (0, b.useState)(0), [pe, he] = (0, b.useState)(3e3), [Se, je] = (0, b.useState)(500), [Le, Ve] = (0, b.useState)(2e3), [F, Ge] = (0, b.useState)(3), [Ke, qe] = (0, b.useState)(4500), [Je, I] = (0, b.useState)(ae), [lt, St] = (0, b.useState)(ie), [Ct, wt] = (0, b.useState)(oe), [Tt, Et] = (0, b.useState)(se), [Dt, Ot] = (0, b.useState)(ce), [kt, At] = (0, b.useState)([]), [jt, Mt] = (0, b.useState)([]), [Nt, Pt] = (0, b.useState)([]), [Ft, It] = (0, b.useState)([]), [Lt, Rt] = (0, b.useState)(!1), [zt, Bt] = (0, b.useState)("正在读取本地数据…"), [Vt, Ht] = (0, b.useState)(!1), Ut = (0, b.useRef)(null);
	function Wt() {
		return {
			period: n,
			selectedMonth: i,
			monthlyRecords: o,
			accounts: c,
			holdings: u,
			fxUsd: f,
			fxHkd: m,
			aSharePlan: g,
			usSharePlan: v,
			hkSharePlan: C,
			travelSaving: pe,
			learningSaving: Se,
			emergencyFund: Le,
			emergencyMonths: F,
			emergencyMonthlyNeed: Ke,
			balanceAssets: Je,
			liabilities: lt,
			reminders: Ct,
			goals: Tt,
			futureCapabilities: Dt,
			cashflowHiddenBuiltinIds: kt,
			cashflowCustomItems: jt
		};
	}
	function Gt(e) {
		e.period && r(e.period), e.selectedMonth && a(e.selectedMonth), Array.isArray(e.monthlyRecords) && s(e.monthlyRecords), Array.isArray(e.accounts) && l(e.accounts), Array.isArray(e.holdings) && d(e.holdings), typeof e.fxUsd == "number" && p(e.fxUsd), typeof e.fxHkd == "number" && h(e.fxHkd), typeof e.aSharePlan == "number" && _(e.aSharePlan), typeof e.usSharePlan == "number" && y(e.usSharePlan), typeof e.hkSharePlan == "number" && te(e.hkSharePlan), typeof e.travelSaving == "number" && he(e.travelSaving), typeof e.learningSaving == "number" && je(e.learningSaving), typeof e.emergencyFund == "number" && Ve(e.emergencyFund), typeof e.emergencyMonths == "number" && Ge(e.emergencyMonths), typeof e.emergencyMonthlyNeed == "number" && qe(e.emergencyMonthlyNeed);
		let t = Ae(e.balanceAssets);
		t.length > 0 && I(t);
		let n = ke(e.liabilities);
		n.length > 0 ? St(n) : (typeof e.houseDebt == "number" || typeof e.carDebt == "number" || typeof e.otherDebt == "number") && St(Ne(e)), Array.isArray(e.reminders) && wt(e.reminders), Array.isArray(e.goals) && Et(Oe(e.goals)), Array.isArray(e.futureCapabilities) && Ot(e.futureCapabilities), Array.isArray(e.cashflowHiddenBuiltinIds) && At(e.cashflowHiddenBuiltinIds.filter((e) => le.includes(e))), Array.isArray(e.cashflowCustomItems) && Mt(e.cashflowCustomItems);
	}
	(0, b.useEffect)(() => {
		let e = window.setTimeout(() => {
			try {
				let e = window.localStorage.getItem(T), t = window.localStorage.getItem(E), n = window.localStorage.getItem(de);
				if (e && Gt(JSON.parse(e)), t) {
					let e = JSON.parse(t);
					Array.isArray(e) && Pt(e.slice(0, fe));
				}
				n && It(Me(JSON.parse(n))), Bt(e ? "已恢复上次保存的数据" : "已启用自动保存");
			} catch {
				window.localStorage.removeItem(T), Bt("本地数据读取失败，已使用默认数据");
			} finally {
				Ht(!0);
			}
		}, 0);
		return () => window.clearTimeout(e);
	}, []), (0, b.useEffect)(() => {
		if (!Vt) return;
		let e = window.setTimeout(() => {
			try {
				window.localStorage.setItem(T, JSON.stringify(Wt())), Bt(`已自动保存 · ${(/* @__PURE__ */ new Date()).toLocaleTimeString("zh-CN", {
					hour: "2-digit",
					minute: "2-digit"
				})}`);
			} catch {
				Bt("自动保存失败，请导出备份");
			}
		}, 300);
		return () => window.clearTimeout(e);
	}, [
		Vt,
		n,
		i,
		o,
		c,
		u,
		f,
		m,
		g,
		v,
		C,
		pe,
		Se,
		Le,
		F,
		Ke,
		Je,
		lt,
		Ct,
		Tt,
		Dt,
		kt,
		jt
	]);
	function Kt() {
		let e = [{
			id: `${Date.now()}`,
			createdAt: (/* @__PURE__ */ new Date()).toISOString(),
			data: Wt()
		}, ...Nt].slice(0, fe);
		Pt(e), window.localStorage.setItem(E, JSON.stringify(e)), Rt(!0), Bt("历史版本已保存");
	}
	function qt(e) {
		window.confirm(`确定恢复 ${Fe(e.createdAt)} 的版本吗？当前数据会被该版本覆盖。`) && (Gt(e.data), Bt("历史版本已恢复并自动保存"));
	}
	function Jt(e) {
		let t = Nt.filter((t) => t.id !== e);
		Pt(t), window.localStorage.setItem(E, JSON.stringify(t));
	}
	function Yt() {
		let e = {
			version: 1,
			exportedAt: (/* @__PURE__ */ new Date()).toISOString(),
			data: Wt(),
			snapshots: Nt,
			monthlyArchives: Ft
		}, t = new Blob([JSON.stringify(e, null, 2)], { type: "application/json" }), n = URL.createObjectURL(t), r = document.createElement("a");
		r.href = n, r.download = `personal-finance-backup-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.json`, r.click(), URL.revokeObjectURL(n), Bt("备份文件已导出");
	}
	async function Xt(e) {
		try {
			let t = JSON.parse(await e.text());
			if (!t.data || !Array.isArray(t.data.accounts) || !Array.isArray(t.data.monthlyRecords)) throw Error("invalid backup");
			if (Gt(t.data), Array.isArray(t.snapshots)) {
				let e = t.snapshots.slice(0, fe);
				Pt(e), window.localStorage.setItem(E, JSON.stringify(e));
			}
			if (Array.isArray(t.monthlyArchives)) {
				let e = Me(t.monthlyArchives);
				It(e), window.localStorage.setItem(de, JSON.stringify(e));
			}
			Bt("备份已导入并自动保存");
		} catch {
			window.alert("无法导入：请选择由本网页导出的 JSON 备份文件。");
		} finally {
			Ut.current && (Ut.current.value = "");
		}
	}
	let Zt = o.find((e) => e.id === i) ?? o[0], Qt = Zt.salary, $t = Zt.stockIncome, en = Zt.otherIncome, tn = Zt.budgets, nn = Qt + Math.max($t, 0) + en, R = (() => {
		let e = c.reduce((e, t) => e + t.balance, 0), t = c.filter(Te), n = t.reduce((e, t) => e + t.balance, 0), r = c.filter((e) => xe(e) === "aShare").reduce((e, t) => e + t.balance, 0), i = c.filter((e) => xe(e) === "usShare").reduce((e, t) => e + t.balance, 0), a = r + i, o = c.filter(Ce).reduce((e, t) => e + t.balance, 0), s = c.filter(we).reduce((e, t) => e + t.balance, 0), l = o + s, d = De(Tt), p = o > 0 ? o : d.hasTravel ? d.travelCurrent : pe, h = s > 0 ? s : d.hasLearning ? d.learningCurrent : Se, _ = d.hasEmergency ? d.emergencyCurrent : Le, y = d.parentCurrent, b = d.partnerCurrent, x = d.otherCurrent, S = b, w = p + h + x, ee = Math.max(0, w - l), te = e - a - l, ne = c.filter((e) => e.liquid).reduce((e, t) => e + t.balance, 0), re = tn.reduce((e, t) => e + t.actual, 0), ie = tn.reduce((e, t) => e + t.plan, 0), ae = ie - re, oe = tn.filter((e) => e.fixed).reduce((e, t) => e + t.plan, 0), se = tn.filter((e) => e.required).reduce((e, t) => e + t.plan, 0), ce = u.reduce((e, t) => e + He(t.value, t.currency, f, m), 0), le = u.reduce((e, t) => e + He(t.cost, t.currency, f, m), 0), ue = u.filter((e) => e.market === "A股").reduce((e, t) => e + He(t.value, t.currency, f, m), 0), T = u.filter((e) => e.market === "美股").reduce((e, t) => e + He(t.value, t.currency, f, m), 0), E = u.filter((e) => e.market === "港股").reduce((e, t) => e + He(t.value, t.currency, f, m), 0), de = Je.reduce((e, t) => e + t.amount, 0), fe = lt.reduce((e, t) => e + t.amount, 0), me = e + ce + ee + y + _ + de, D = jt.filter((e) => e.direction === "outflow").reduce((e, t) => e + t.amount, 0), O = (e, t) => kt.includes(e) ? 0 : t, he = O("spendingPlan", ie), k = d.hasTravel ? d.travelActualMonthly : pe, A = d.hasLearning ? d.learningActualMonthly : Se, ge = d.hasParent ? d.parentActualMonthly : 0, _e = d.hasPartner ? d.partnerActualMonthly : 0, ve = d.hasEmergency ? d.emergencyActualMonthly : 0, ye = d.hasTravel ? d.travelMonthly : pe, be = d.hasLearning ? d.learningMonthly : Se, Ee = d.hasParent ? d.parentMonthly : 0, Oe = d.hasPartner ? d.partnerMonthly : 0, ke = d.hasEmergency ? d.emergencyMonthly : 0, Ae = O("travelSaving", k), je = O("learningSaving", A), Me = O("parentSaving", ge), Ne = O("partnerSaving", _e), Pe = O("emergencyFund", ve), Fe = O("aSharePlan", g) + O("usSharePlan", v) + O("hkSharePlan", C), Ie = Ae + je + Me + Ne + Pe + Fe + D, Re = nn - re - Ie, ze = nn ? oe / nn : 0, Be = nn ? Ie / nn : 0, Ve = Math.max(0, Ke), Ue = Ve * F, j = Ve ? _ / Ve : 0, M = me ? fe / me : 0, N = Math.round(Math.max(0, Math.min(25, 25 - Math.max(0, ze - .35) * 85)) + Math.min(25, j / Math.max(F, 1) * 25) + (fe === 0 ? 20 : Math.max(0, 20 - M * 50)) + Math.min(20, Be / .45 * 20) + (ce >= le ? 10 : 6));
		return {
			accountTotal: e,
			totalSavingsAccountTotal: n,
			totalSavingsAccountCount: t.length,
			operatingAccountTotal: te,
			aShareInvestmentReserve: r,
			usShareInvestmentReserve: i,
			investmentReserve: a,
			accountSpecialSavings: l,
			liquidAccountTotal: ne,
			spendingActual: re,
			spendingPlan: ie,
			budgetRemaining: ae,
			fixedSpending: oe,
			requiredSpending: se,
			investmentValue: ce,
			investmentCost: le,
			investmentPnL: ce - le,
			aShareValue: ue,
			usShareValue: T,
			hkShareValue: E,
			manualAssetTotal: de,
			cashflowSpendingPlan: he,
			travelAllocation: Ae,
			learningAllocation: je,
			parentAllocation: Me,
			partnerAllocation: Ne,
			emergencyAllocation: Pe,
			investmentSavingAllocation: Fe,
			customOutflow: D,
			travelAllocationSource: k,
			learningAllocationSource: A,
			parentAllocationSource: ge,
			partnerAllocationSource: _e,
			emergencyAllocationSource: ve,
			travelExpectedSource: ye,
			learningExpectedSource: be,
			parentExpectedSource: Ee,
			partnerExpectedSource: Oe,
			emergencyExpectedSource: ke,
			travelSavings: p,
			learningSavings: h,
			parentSavings: y,
			partnerSavings: b,
			familyFund: S,
			otherSavings: x,
			totalSavings: w,
			savingsOutsideAccounts: ee,
			totalDebt: fe,
			totalAssets: me,
			netWorth: me - fe,
			assetOutflow: Ie,
			monthlySurplus: Re,
			fixedRatio: ze,
			savingsRate: Be,
			emergencyCoverage: j,
			currentEmergencyFund: _,
			debtRatio: M,
			score: N,
			emergencyMonthlyNeed: Ve,
			emergencyTarget: Ue
		};
	})();
	function rn(e, t) {
		return {
			id: t,
			monthId: i,
			label: Zt.label,
			savedAt: e,
			income: nn,
			spending: R.spendingActual,
			allocation: R.assetOutflow,
			surplus: R.monthlySurplus,
			accountTotal: R.accountTotal,
			totalAssets: R.totalAssets,
			netWorth: R.netWorth,
			totalDebt: R.totalDebt,
			emergencyFund: R.currentEmergencyFund,
			savings: R.totalSavingsAccountTotal,
			accounts: c.map((e) => ({
				id: e.id,
				name: e.name,
				type: e.type,
				balance: e.balance,
				purpose: e.purpose,
				liquid: e.liquid
			}))
		};
	}
	function an() {
		let e = (/* @__PURE__ */ new Date()).toISOString(), n = Me([rn(e, `${i}-${e}`), ...Ft.filter((e) => e.monthId !== i)]);
		It(n), window.localStorage.setItem(de, JSON.stringify(n)), t((e) => e.includes("monthlyArchive") ? e : [...e, "monthlyArchive"]), Bt(`${Zt.label} 月报已保存`);
	}
	function on(e) {
		let t = Ft.filter((t) => t.id !== e);
		It(t), window.localStorage.setItem(de, JSON.stringify(t));
	}
	let sn = rn("current-preview", `current-${i}`), cn = Ft.find((e) => e.monthId === i), ln = cn ?? sn, un = ze(Ft, i), dn = Re(Me([sn, ...Ft.filter((e) => e.monthId !== i)])), fn = (() => {
		let e = [], t = R.accountTotal, n = jt.filter((e) => e.direction === "inflow").reduce((e, t) => e + t.amount, 0);
		for (let r = 0; r < 6; r += 1) {
			let a = ge(i, r), s = o.find((e) => e.id === a), c = s?.salary ?? Qt, l = s ? be(s) : R.spendingPlan, u = (kt.includes("salary") ? 0 : c) + n, d = (kt.includes("spendingPlan") ? 0 : l) + R.assetOutflow;
			t += u - d, e.push({
				month: A(s?.label ?? _e(a)),
				inflow: u,
				outflow: d,
				balance: t
			});
		}
		return e;
	})(), pn = (() => {
		let e = jt.filter((e) => e.direction === "inflow").reduce((e, t) => e + t.amount, 0), t = (kt.includes("salary") ? 0 : Qt) + e;
		return [
			...Ct.map((e) => ({
				date: e.date,
				item: e.name,
				inflow: e.kind === "定存" ? e.amount : 0,
				outflow: e.kind === "定存" ? 0 : e.amount,
				kind: e.kind
			})),
			{
				date: "2026-07-10",
				item: "现金流入",
				inflow: t,
				outflow: 0,
				kind: "收入"
			},
			{
				date: "2026-07-15",
				item: "月度资产分配",
				inflow: 0,
				outflow: R.assetOutflow,
				kind: "分配"
			}
		].sort((e, t) => e.date.localeCompare(t.date)).reduce((e, t) => {
			let n = e.balance + t.inflow - t.outflow;
			return {
				balance: n,
				rows: [...e.rows, {
					...t,
					balance: n
				}]
			};
		}, {
			balance: R.accountTotal,
			rows: []
		}).rows;
	})();
	function mn(e, t) {
		l((n) => n.map((n) => n.id === e ? {
			...n,
			...t
		} : n));
	}
	function hn() {
		let e = c.length + 1;
		l((t) => [...t, {
			id: `account-${Date.now()}`,
			name: `新账户 ${e}`,
			type: "银行卡",
			balance: 0,
			purpose: "待填写用途",
			liquid: !0
		}]);
	}
	function gn(e) {
		l((t) => t.length > 1 ? t.filter((t) => t.id !== e) : t);
	}
	function _n(e, t) {
		l((n) => {
			let r = n.findIndex((t) => t.id === e), i = n.findIndex((e) => e.id === t);
			if (r < 0 || i < 0 || r === i) return n;
			let a = [...n], [o] = a.splice(r, 1);
			return a.splice(i, 0, o), a;
		});
	}
	function vn(e, t) {
		s((n) => n.map((n) => n.id === e ? {
			...n,
			...t
		} : n));
	}
	function yn() {
		s((e) => {
			let t = [...e].sort((e, t) => e.id.localeCompare(t.id)), n = t[t.length - 1] ?? ne[0], [r, i] = n.id.split("-"), o = new Date(Number(r), Number(i) - 1, 1), s = new Date(o.getFullYear(), o.getMonth() + 1, 1), c = `${s.getFullYear()}-${String(s.getMonth() + 1).padStart(2, "0")}`, l = `${s.getFullYear()}年${s.getMonth() + 1}月`, u = n.budgets.length > 0 ? n.budgets : ee, d = {
				id: c,
				label: l,
				salary: n.salary,
				payday: n.payday,
				stockIncome: 0,
				otherIncome: 0,
				budgets: u.map((e) => ({
					...e,
					actual: 0
				}))
			};
			return a(c), [...e, d].sort((e, t) => e.id.localeCompare(t.id));
		});
	}
	function bn(e) {
		s((t) => {
			if (t.length <= 1) return t;
			let n = [...t].sort((e, t) => e.id.localeCompare(t.id)), r = n.findIndex((t) => t.id === e), o = n.filter((t) => t.id !== e);
			return e === i && a((o[Math.max(0, r - 1)] ?? o[0]).id), o;
		});
	}
	function xn(e) {
		vn(i, { salary: e });
	}
	function Sn() {
		Mt((e) => [...e, {
			id: `cashflow-${Date.now()}`,
			name: `新增现金流 ${e.length + 1}`,
			amount: 0,
			direction: "outflow"
		}]);
	}
	function Cn(e, t) {
		Mt((n) => n.map((n) => n.id === e ? {
			...n,
			...t
		} : n));
	}
	function wn(e) {
		Mt((t) => t.filter((t) => t.id !== e));
	}
	function Tn(e) {
		At((t) => t.includes(e) ? t : [...t, e]);
	}
	function En(e, t) {
		s((n) => n.map((n) => n.id === i ? {
			...n,
			budgets: n.budgets.map((n) => n.id === e ? {
				...n,
				...t
			} : n)
		} : n));
	}
	function Dn() {
		s((e) => e.map((e) => e.id === i ? {
			...e,
			budgets: [...e.budgets, {
				id: `budget-${Date.now()}`,
				name: `新分类 ${e.budgets.length + 1}`,
				plan: 0,
				actual: 0,
				required: !1,
				fixed: !1
			}]
		} : e));
	}
	function On(e) {
		s((t) => t.map((t) => t.id === i && t.budgets.length > 1 ? {
			...t,
			budgets: t.budgets.filter((t) => t.id !== e)
		} : t));
	}
	function kn(e, t) {
		d((n) => n.map((n) => n.id === e ? {
			...n,
			...t
		} : n));
	}
	function An() {
		d((e) => [...e, {
			id: `holding-${Date.now()}`,
			name: `新投资 ${e.length + 1}`,
			market: "A股",
			cost: 0,
			value: 0,
			currency: "CNY"
		}]);
	}
	function jn(e) {
		d((t) => t.length > 1 ? t.filter((t) => t.id !== e) : t);
	}
	function Mn(e, t) {
		I((n) => n.map((n) => n.id === e ? {
			...n,
			...t
		} : n));
	}
	function Nn() {
		I((e) => [...e, {
			id: `balance-asset-${Date.now()}`,
			name: `新资产 ${e.length + 1}`,
			amount: 0,
			note: "资产负债表补录"
		}]);
	}
	function Pn(e) {
		I((t) => t.length > 1 ? t.filter((t) => t.id !== e) : t);
	}
	function Fn(e, t) {
		St((n) => n.map((n) => n.id === e ? {
			...n,
			...t
		} : n));
	}
	function In() {
		St((e) => [...e, {
			id: `liability-${Date.now()}`,
			name: `新负债 ${e.length + 1}`,
			amount: 0
		}]);
	}
	function Ln(e) {
		St((t) => t.length > 1 ? t.filter((t) => t.id !== e) : t);
	}
	function Rn(e, t) {
		wt((n) => n.map((n) => n.id === e ? {
			...n,
			...t
		} : n));
	}
	function zn() {
		wt((e) => [...e, {
			id: `reminder-${Date.now()}`,
			name: `新提醒 ${e.length + 1}`,
			date: "2026-07-01",
			amount: 0,
			kind: "账单"
		}]);
	}
	function Bn(e) {
		wt((t) => t.length > 1 ? t.filter((t) => t.id !== e) : t);
	}
	function Vn(e, t) {
		Et((n) => n.map((n) => n.id === e ? {
			...n,
			...t
		} : n));
	}
	function Hn(e, t) {
		Et((n) => {
			let r = n.find((t) => Ee(t) === e);
			return r ? n.map((e) => e.id === r.id ? {
				...e,
				...t
			} : e) : n;
		});
	}
	function Un(e) {
		he(e), Hn("travel", { actualMonthly: e });
	}
	function Wn(e) {
		je(e), Hn("learning", { actualMonthly: e });
	}
	function Gn(e) {
		Hn("parent", { actualMonthly: e });
	}
	function Kn(e) {
		Hn("partner", { actualMonthly: e });
	}
	function qn(e) {
		Hn("emergency", { actualMonthly: e });
	}
	function Jn(e) {
		Ve(e), Hn("emergency", { current: e });
	}
	function Yn() {
		Et((e) => [...e, {
			id: `goal-${Date.now()}`,
			name: `新目标 ${e.length + 1}`,
			target: 0,
			current: 0,
			monthly: 0,
			actualMonthly: 0
		}]);
	}
	function Xn(e) {
		Et((t) => t.length > 1 ? t.filter((t) => t.id !== e) : t);
	}
	function Zn(e, t) {
		Ot((n) => n.map((n) => n.id === e ? {
			...n,
			...t
		} : n));
	}
	function Qn(e) {
		t((t) => t.includes(e) ? t.filter((t) => t !== e) : [...t, e]);
	}
	function $n() {
		t(me.map((e) => e.id));
	}
	let er = lt.length ? `${lt.slice(0, 3).map((e) => `${e.name.trim() || "未命名负债"} ${D(e.amount)}`).join(" / ")}${lt.length > 3 ? " / 更多" : ""}` : "暂无负债", tr = [
		`旅游 ${D(R.travelAllocation)}`,
		`学习 ${D(R.learningAllocation)}`,
		`父母储蓄 ${D(R.parentAllocation)}`,
		`伴侣基金 ${D(R.partnerAllocation)}`,
		`应急 ${D(R.emergencyAllocation)}`,
		`投资储蓄 ${D(R.investmentSavingAllocation)}`
	].join(" / "), nr = [
		`旅游 ${D(R.travelSavings)}`,
		`学习 ${D(R.learningSavings)}`,
		R.otherSavings > 0 ? `其他 ${D(R.otherSavings)}` : ""
	].filter(Boolean).join(" / "), rr = {
		label: "父母储蓄",
		value: R.parentSavings,
		detail: R.parentSavings > 0 || R.parentAllocation > 0 ? `当前 ${D(R.parentSavings)} / 本月投入 ${D(R.parentAllocation)}` : "目标管理父母储蓄，单独列示",
		color: S[5]
	}, ir = {
		label: "家庭及伴侣储蓄",
		value: R.familyFund,
		detail: R.familyFund > 0 || R.partnerAllocation > 0 ? `伴侣基金 ${D(R.familyFund)} / 本月家庭投入 ${D(R.partnerAllocation)}` : "家庭共同资金单列，不计入个人总资产",
		color: S[3],
		className: "family-fund-item"
	}, ar = {
		label: "总负债",
		value: R.totalDebt,
		detail: er,
		color: S[4],
		className: "debt-breakdown-item"
	}, or = [
		R.aShareInvestmentReserve > 0 ? `A股待投 ${D(R.aShareInvestmentReserve)}` : "",
		R.usShareInvestmentReserve > 0 ? `美股待投 ${D(R.usShareInvestmentReserve)}` : "",
		R.accountSpecialSavings > 0 ? `专项 ${D(R.accountSpecialSavings)}` : ""
	].filter(Boolean).join(" / "), sr = Je.filter((e) => e.amount > 0).slice(0, 3).map((e) => `${e.name.trim() || "未命名资产"} ${D(e.amount)}`).join(" / ") || "来自资产负债表资产项", cr = [
		{
			label: "账户现金",
			value: R.operatingAccountTotal,
			detail: or ? `不含 ${or}` : "日常账户余额",
			color: S[0]
		},
		{
			label: "A股待投储蓄",
			value: R.aShareInvestmentReserve,
			detail: "余额宝-8514，尚未进A股",
			color: S[6]
		},
		{
			label: "美股待投储蓄",
			value: R.usShareInvestmentReserve,
			detail: "中国银行8292，尚未进美股",
			color: S[5]
		},
		{
			label: "已投资市值",
			value: R.investmentValue,
			detail: `A股 ${D(R.aShareValue)} / 美股 ${D(R.usShareValue)} / 港股 ${D(R.hkShareValue)}`,
			color: S[1]
		},
		{
			label: "个人专项储蓄",
			value: R.totalSavings,
			detail: nr,
			color: S[3]
		},
		rr,
		{
			label: "实物资产",
			value: R.manualAssetTotal,
			detail: sr,
			color: S[5]
		},
		{
			label: "应急金",
			value: R.currentEmergencyFund,
			detail: `覆盖 ${R.emergencyCoverage.toFixed(1)} 月 / 目标 ${F} 月`,
			color: S[2]
		}
	], lr = [
		...cr.slice(0, 7),
		ar,
		...cr.slice(7),
		ir
	], ur = c.filter((e) => e.balance !== 0).map((e) => ({
		label: e.name.trim() || "未命名账户",
		value: D(e.balance),
		note: e.purpose.trim() || e.type.trim() || "账户"
	})), dr = [
		{
			title: "本月实际收入",
			value: D(nn),
			detail: `${Zt.label} / 工资 ${D(Qt)} / 炒股 ${D(Math.max($t, 0))}`,
			tone: "blue"
		},
		{
			title: "本月实际支出",
			value: D(R.spendingActual),
			detail: `${Zt.label} / 预算 ${D(R.spendingPlan)} / 固定支出率 ${k(R.fixedRatio)}`,
			tone: R.fixedRatio > .5 ? "red" : R.fixedRatio >= .35 ? "amber" : "green"
		},
		{
			title: "本月实际资产分配",
			value: D(R.assetOutflow),
			detail: `${tr}${R.customOutflow > 0 ? ` / 其他 ${D(R.customOutflow)}` : ""}`,
			tone: "violet"
		},
		{
			title: "当月余额",
			value: D(R.monthlySurplus),
			detail: `收入 ${D(nn)} - 支出 ${D(R.spendingActual)} - 分配 ${D(R.assetOutflow)}`,
			tone: R.monthlySurplus < 0 ? "red" : R.monthlySurplus < nn * .1 ? "amber" : "green"
		},
		{
			title: "当前现金流",
			value: D(R.accountTotal),
			detail: `${ur.length} 个非零账户 / 合计 ${D(R.accountTotal)} / 可动用 ${D(R.liquidAccountTotal)}`,
			tone: R.liquidAccountTotal < R.emergencyMonthlyNeed * 2 ? "red" : "green",
			items: ur
		},
		{
			title: "目前总储蓄",
			value: D(R.totalSavingsAccountTotal),
			detail: `${R.totalSavingsAccountCount} 个储蓄账户 / 不含工行2616、微信、现金 / A股待投 ${D(R.aShareInvestmentReserve)} / 美股待投 ${D(R.usShareInvestmentReserve)}`,
			tone: "green"
		},
		{
			title: "目前总应急",
			value: D(R.currentEmergencyFund),
			detail: `覆盖 ${R.emergencyCoverage.toFixed(1)} 个月 / 目标 ${F} 个月`,
			tone: "amber"
		}
	], fr = [
		{
			label: "工资",
			value: Qt,
			color: S[0]
		},
		{
			label: "炒股月结",
			value: Math.max($t, 0),
			color: S[1]
		},
		{
			label: "其他收入",
			value: en,
			color: S[3]
		}
	], pr = o.filter((e) => e.id >= ue).sort((e, t) => e.id.localeCompare(t.id)), mr = pr.map((e, t) => ({
		label: A(e.label),
		value: ve(e),
		color: e.id === i ? S[0] : S[t % S.length],
		detail: e.id === i ? "当前月" : "月度"
	})), hr = pr.map((e, t) => ({
		label: A(e.label),
		value: ye(e),
		color: e.id === i ? S[4] : S[t % S.length],
		detail: e.id === i ? "当前月" : "月度"
	})), gr = pr.map((e, t) => ({
		label: A(e.label),
		value: Math.max(ve(e) - ye(e), 0),
		color: e.id === i ? S[1] : S[t % S.length],
		detail: e.id === i ? "当前月" : "月度"
	})), _r = c.map((e, t) => ({
		item: e,
		index: t
	})).sort((e, t) => t.item.balance - e.item.balance || e.index - t.index).map(({ item: e }, t) => ({
		label: e.name.trim() || "未命名账户",
		value: e.balance,
		color: S[t % S.length],
		detail: e.type.trim() || "未分类"
	})), vr = tn.map((e, t) => ({
		item: e,
		index: t
	})).sort((e, t) => t.item.actual - e.item.actual || t.item.plan - e.item.plan || e.index - t.index).map(({ item: e }, t) => ({
		label: e.name.trim() || "未命名支出",
		value: e.actual,
		max: Math.max(e.plan, e.actual, 1),
		color: e.actual > e.plan ? S[4] : S[t % S.length],
		detail: `${D(e.actual)} / ${D(e.plan)}`
	})), yr = tn.map((e, t) => ({
		label: e.name.trim() || "未命名支出",
		value: e.actual,
		plan: e.plan,
		color: S[t % S.length],
		detail: `${e.required ? "必须" : "可取消"} / ${e.fixed ? "固定" : "弹性"}`
	})).filter((e) => e.value > 0).sort((e, t) => t.value - e.value), br = yr.length ? yr.slice(0, 8).map((e) => ({
		label: e.label,
		value: e.value,
		color: e.color
	})) : [{
		label: "暂无实际支出",
		value: 0,
		max: 1,
		color: "#b8c4d4",
		detail: "本月未记录"
	}], xr = yr.map((e) => ({
		label: e.label,
		value: e.value,
		color: e.color,
		detail: `${k(e.value / Math.max(R.spendingActual, 1))} / ${D(e.value)}`
	})), Sr = [{
		label: "固定支出",
		value: R.fixedSpending,
		color: S[2]
	}, {
		label: "弹性支出",
		value: Math.max(R.spendingPlan - R.fixedSpending, 0),
		color: S[0]
	}], Cr = [{
		label: "必须支出",
		value: R.requiredSpending,
		color: S[1]
	}, {
		label: "可取消支出",
		value: Math.max(R.spendingPlan - R.requiredSpending, 0),
		color: S[2]
	}], wr = fn[0]?.inflow ?? 0, Tr = R.cashflowSpendingPlan + R.assetOutflow, Er = wr - Tr, Dr = [
		...[
			{
				id: "builtin-salary",
				builtinId: "salary",
				name: "工资流入",
				amount: Qt,
				direction: "inflow",
				source: "计入预测",
				onAmountChange: xn,
				onDelete: () => Tn("salary")
			},
			{
				id: "builtin-spending-plan",
				builtinId: "spendingPlan",
				name: "生活支出预算",
				amount: R.spendingPlan,
				direction: "outflow",
				source: `${Zt.label}预算表动态汇总`,
				readonlyAmount: !0,
				onDelete: () => Tn("spendingPlan")
			},
			{
				id: "calculated-budget-remaining",
				name: "本月预算剩余",
				amount: R.budgetRemaining,
				direction: R.budgetRemaining >= 0 ? "inflow" : "outflow",
				source: "预算 - 实际，可转储蓄，不计入预测",
				readonlyAmount: !0,
				summaryOnly: !0
			},
			{
				id: "builtin-travel-saving",
				builtinId: "travelSaving",
				name: "旅游储蓄",
				amount: R.travelAllocationSource,
				direction: "outflow",
				source: "来自目标实际投入",
				onAmountChange: Un,
				onDelete: () => Tn("travelSaving")
			},
			{
				id: "builtin-learning-saving",
				builtinId: "learningSaving",
				name: "学习储蓄",
				amount: R.learningAllocationSource,
				direction: "outflow",
				source: "来自目标实际投入",
				onAmountChange: Wn,
				onDelete: () => Tn("learningSaving")
			},
			{
				id: "builtin-parent-saving",
				builtinId: "parentSaving",
				name: "父母储蓄",
				amount: R.parentAllocationSource,
				direction: "outflow",
				source: "来自目标实际投入",
				onAmountChange: Gn,
				onDelete: () => Tn("parentSaving")
			},
			{
				id: "builtin-partner-saving",
				builtinId: "partnerSaving",
				name: "伴侣基金",
				amount: R.partnerAllocationSource,
				direction: "outflow",
				source: "来自目标实际投入",
				onAmountChange: Kn,
				onDelete: () => Tn("partnerSaving")
			},
			{
				id: "builtin-emergency-fund",
				builtinId: "emergencyFund",
				name: "应急金投入",
				amount: R.emergencyAllocationSource,
				direction: "outflow",
				source: "来自目标实际投入",
				onAmountChange: qn,
				onDelete: () => Tn("emergencyFund")
			},
			{
				id: "builtin-ashare-plan",
				builtinId: "aSharePlan",
				name: "A股计划",
				amount: g,
				direction: "outflow",
				source: "现金流出",
				onAmountChange: _,
				onDelete: () => Tn("aSharePlan")
			},
			{
				id: "builtin-usshare-plan",
				builtinId: "usSharePlan",
				name: "美股计划",
				amount: v,
				direction: "outflow",
				source: "现金流出",
				onAmountChange: y,
				onDelete: () => Tn("usSharePlan")
			},
			{
				id: "builtin-hkshare-plan",
				builtinId: "hkSharePlan",
				name: "港股计划",
				amount: C,
				direction: "outflow",
				source: "现金流出",
				onAmountChange: te,
				onDelete: () => Tn("hkSharePlan")
			}
		].filter((e) => !e.builtinId || !kt.includes(e.builtinId)),
		...jt.map((e) => ({
			id: e.id,
			name: e.name,
			amount: e.amount,
			direction: e.direction,
			source: "自定义",
			onNameChange: (t) => Cn(e.id, { name: t }),
			onAmountChange: (t) => Cn(e.id, { amount: t }),
			onDirectionChange: (t) => Cn(e.id, { direction: t }),
			onDelete: () => wn(e.id)
		})),
		{
			id: "calculated-cashflow-expected-increase",
			name: "现金流预计增加",
			amount: Er,
			direction: Er >= 0 ? "inflow" : "outflow",
			source: "月流入 - 月流出，自动同步",
			readonlyAmount: !0,
			summaryOnly: !0
		}
	], Or = Dr.filter((e) => e.direction === "outflow" && !e.summaryOnly).map((e, t) => ({
		item: e,
		index: t
	})).sort((e, t) => t.item.amount - e.item.amount || e.index - t.index).map(({ item: e }, t) => ({
		label: e.name,
		value: e.amount,
		color: S[(t + 4) % S.length],
		detail: e.source
	})), kr = cr.map((e, t) => ({
		item: e,
		index: t
	})).sort((e, t) => t.item.value - e.item.value || e.index - t.index).map(({ item: e }) => ({
		label: e.label,
		value: e.value,
		color: e.color
	})), Ar = [
		{
			label: "A股",
			value: R.aShareValue,
			color: S[0]
		},
		{
			label: "美股",
			value: R.usShareValue,
			color: S[1]
		},
		{
			label: "港股",
			value: R.hkShareValue,
			color: S[3]
		}
	], jr = u.map((e) => {
		let t = He(e.value, e.currency, f, m), n = He(e.cost, e.currency, f, m);
		return {
			label: e.market,
			value: Math.abs(t - n),
			color: t >= n ? S[1] : S[4],
			detail: `${t >= n ? "浮盈" : "浮亏"} ${D(t - n)}`
		};
	}), Mr = fn.map((e) => ({
		label: e.month,
		value: e.balance
	})), Nr = fn.map((e) => ({
		label: e.month,
		value: e.outflow,
		color: S[4]
	})), Pr = [
		{
			label: "期初现金",
			value: R.accountTotal,
			kind: "start",
			color: S[0]
		},
		{
			label: "工资",
			value: Qt,
			kind: "positive",
			color: S[1]
		},
		{
			label: "生活支出",
			value: -R.spendingPlan,
			kind: "negative",
			color: S[4]
		},
		{
			label: "资产分配",
			value: -R.assetOutflow,
			kind: "negative",
			color: S[2]
		},
		{
			label: "月末现金",
			value: R.accountTotal + Qt - R.spendingPlan - R.assetOutflow,
			kind: "end",
			color: S[3]
		}
	], Fr = fn.map((e) => ({
		label: e.month,
		value: e.balance + R.investmentValue + R.totalSavings + R.parentSavings + R.currentEmergencyFund + R.manualAssetTotal - R.totalDebt
	})), Ir = [
		{
			label: "总资产",
			value: R.totalAssets,
			color: S[0]
		},
		{
			label: "总负债",
			value: R.totalDebt,
			color: S[4]
		},
		{
			label: "净资产",
			value: Math.max(R.netWorth, 0),
			color: S[1]
		}
	], Lr = Je.map((e, t) => ({
		label: e.name.trim() || "未命名资产",
		value: e.amount,
		color: S[t % S.length],
		detail: e.note.trim() || D(e.amount)
	})), Rr = lt.map((e, t) => ({
		label: e.name.trim() || "未命名负债",
		value: e.amount,
		color: S[(t + 4) % S.length]
	})), zr = Tt.map((e, t) => ({
		label: e.name,
		value: e.current,
		max: e.target,
		color: S[t % S.length],
		detail: `预期 ${D(e.monthly)} / 实际 ${D(e.actualMonthly)}`
	})), Br = Tt.reduce((e, t) => e + t.current, 0), Vr = Tt.reduce((e, t) => e + t.target, 0), Hr = Tt.reduce((e, t) => e + t.monthly, 0), Ur = Tt.reduce((e, t) => e + t.actualMonthly, 0), Wr = Math.max(0, pr.findIndex((e) => e.id === i)), Gr = pr.map((e, t) => ({
		label: A(e.label),
		value: e.id === i ? Ur : Hr,
		color: e.id === i ? S[1] : S[t % S.length],
		detail: e.id === i ? "实际投入" : "预期准备"
	})), Kr = pr.map((e, t) => ({
		label: A(e.label),
		value: ye(e) + (e.id === i ? Ur : Hr),
		color: e.id === i ? S[2] : S[t % S.length],
		detail: `支出 ${D(ye(e))}`
	})), qr = pr.map((e, t) => ({
		label: A(e.label),
		value: Math.min(Vr, Br + Ur + Hr * Math.max(0, t - Wr - 1))
	})), Jr = Ct.map((e, t) => ({
		label: e.name,
		value: e.amount,
		color: S[t % S.length],
		detail: `${Math.max(0, Pe(e.date))} 天后`
	})), Yr = Ct.map((e, t) => ({
		label: e.kind,
		value: Math.max(0, Pe(e.date)),
		color: S[t % S.length],
		detail: e.date
	})), Xr = [
		{
			id: "salary",
			name: "工资",
			amount: Qt,
			flow: "收入",
			source: `${Zt.label}收入底表`
		},
		{
			id: "stock-income",
			name: "炒股月结",
			amount: Math.max($t, 0),
			flow: "收入",
			source: `${Zt.label}收入底表`
		},
		{
			id: "other-income",
			name: "其他收入",
			amount: en,
			flow: "收入",
			source: `${Zt.label}收入底表`
		},
		{
			id: "spending-actual",
			name: "生活实际支出",
			amount: R.spendingActual,
			flow: "支出",
			source: "支出预算底表实际汇总"
		},
		{
			id: "spending-plan",
			name: "生活支出预算",
			amount: R.spendingPlan,
			flow: "预算",
			source: "支出预算底表预算汇总"
		},
		{
			id: "budget-remaining",
			name: "本月预算剩余",
			amount: R.budgetRemaining,
			flow: "可转储蓄",
			source: "生活支出预算 - 实际支出"
		},
		{
			id: "travel-saving",
			name: "旅游储蓄",
			amount: R.travelAllocationSource,
			flow: "资产分配",
			source: "目标管理本月实际投入"
		},
		{
			id: "learning-saving",
			name: "学习储蓄",
			amount: R.learningAllocationSource,
			flow: "资产分配",
			source: "目标管理本月实际投入"
		},
		{
			id: "parent-saving",
			name: "父母储蓄",
			amount: R.parentAllocationSource,
			flow: "资产分配",
			source: "目标管理本月实际投入"
		},
		{
			id: "partner-saving",
			name: "伴侣基金",
			amount: R.partnerAllocationSource,
			flow: "家庭分配",
			source: "目标管理本月实际投入，不计入个人总资产"
		},
		{
			id: "emergency-saving",
			name: "应急金投入",
			amount: R.emergencyAllocationSource,
			flow: "资产分配",
			source: "目标管理本月实际投入"
		},
		{
			id: "ashare-plan",
			name: "A股计划",
			amount: g,
			flow: "资产分配",
			source: "投资计划 / 现金流预测"
		},
		{
			id: "usshare-plan",
			name: "美股计划",
			amount: v,
			flow: "资产分配",
			source: "投资计划 / 现金流预测"
		},
		{
			id: "hkshare-plan",
			name: "港股计划",
			amount: C,
			flow: "资产分配",
			source: "投资计划 / 现金流预测"
		},
		{
			id: "monthly-surplus",
			name: "当月余额",
			amount: R.monthlySurplus,
			flow: "结余",
			source: "收入 - 实际支出 - 实际资产分配"
		}
	], Zr = [
		{
			label: "收入",
			value: nn,
			color: S[0]
		},
		{
			label: "支出",
			value: R.spendingActual,
			color: S[4]
		},
		{
			label: "资产分配",
			value: R.assetOutflow,
			color: S[1]
		},
		{
			label: "月结余",
			value: Math.max(R.monthlySurplus, 0),
			color: S[3]
		}
	], Qr = tn.map((e, t) => {
		let n = e.plan ? e.actual / e.plan : 0;
		return {
			label: e.name,
			value: n * 100,
			color: n > 1 ? S[4] : n > .8 ? S[2] : S[t % S.length],
			detail: `${Math.round(n * 100)}%`
		};
	}), $r = u.map((e, t) => {
		let n = He(e.value, e.currency, f, m), r = He(e.cost, e.currency, f, m), i = R.investmentValue ? n / R.investmentValue * 100 : 0, a = r ? (n - r) / r * 100 : 0;
		return {
			label: e.market,
			x: O(i),
			y: O(a + 50),
			value: `${a.toFixed(1)}% / ${i.toFixed(0)}%`,
			color: S[t % S.length]
		};
	}), ei = [
		{
			label: "现金流健康",
			value: O((R.monthlySurplus / Math.max(nn, 1) + .2) * 180),
			color: S[0]
		},
		{
			label: "抗风险能力",
			value: O(R.emergencyCoverage / Math.max(F, 1) * 100),
			color: S[1]
		},
		{
			label: "负债风险",
			value: O(100 - R.debtRatio * 100),
			color: S[4]
		},
		{
			label: "增长能力",
			value: O(R.savingsRate / .45 * 100),
			color: S[3]
		},
		{
			label: "投资表现",
			value: R.investmentValue >= R.investmentCost ? 82 : 58,
			color: S[2]
		}
	], ti = [
		{
			label: "固定支出率",
			x: O(R.fixedRatio * 120),
			y: O(R.fixedRatio > .5 ? 86 : R.fixedRatio > .35 ? 62 : 32),
			value: k(R.fixedRatio),
			color: R.fixedRatio > .5 ? S[4] : R.fixedRatio > .35 ? S[2] : S[1]
		},
		{
			label: "应急金缺口",
			x: O(100 - R.emergencyCoverage / Math.max(F, 1) * 100),
			y: O(80 - R.emergencyCoverage * 10),
			value: `${R.emergencyCoverage.toFixed(1)}月`,
			color: S[2]
		},
		{
			label: "现金流末余额",
			x: O((R.spendingPlan * 4 - (fn[fn.length - 1]?.balance ?? 0)) / Math.max(R.spendingPlan * 4, 1) * 100),
			y: O((R.spendingPlan * 3 - (fn[fn.length - 1]?.balance ?? 0)) / Math.max(R.spendingPlan * 3, 1) * 100),
			value: D(fn[fn.length - 1]?.balance ?? 0),
			color: S[0]
		},
		{
			label: "负债率",
			x: O(R.debtRatio * 100),
			y: O(R.debtRatio * 120),
			value: k(R.debtRatio),
			color: S[4]
		},
		{
			label: "投资波动",
			x: O(Math.abs(R.investmentPnL) / Math.max(R.investmentCost, 1) * 100),
			y: R.investmentPnL >= 0 ? 34 : 72,
			value: D(R.investmentPnL),
			color: R.investmentPnL >= 0 ? S[1] : S[4]
		}
	], ni = Dt.map((e, t) => ({
		label: e.name,
		value: e.score,
		color: S[t % S.length]
	})), ri = dn.map((e, t) => ({
		label: A(e.label),
		value: e.income,
		color: e.monthId === i ? S[0] : S[t % S.length],
		detail: e.monthId === i && !cn ? "当前预览" : "已存档"
	})), ii = dn.map((e, t) => ({
		label: A(e.label),
		value: e.spending,
		color: e.monthId === i ? S[4] : S[(t + 4) % S.length],
		detail: e.monthId === i && !cn ? "当前预览" : "已存档"
	})), ai = dn.map((e) => ({
		label: A(e.label),
		value: e.netWorth
	})), oi = dn.map((e) => ({
		label: A(e.label),
		value: e.accountTotal
	})), si = dn.map((e) => ({
		label: A(e.label),
		value: e.surplus
	})), ci = ln.income - (un?.income ?? 0), li = ln.spending - (un?.spending ?? 0), ui = ln.accountTotal - (un?.accountTotal ?? 0), di = ln.netWorth - (un?.netWorth ?? 0);
	return /* @__PURE__ */ (0, x.jsxs)("main", {
		className: "finance-page",
		children: [/* @__PURE__ */ (0, x.jsxs)("aside", {
			className: "side-nav",
			children: [
				/* @__PURE__ */ (0, x.jsxs)("div", {
					className: "brand",
					children: [/* @__PURE__ */ (0, x.jsx)("span", {
						className: "brand-mark",
						children: "PF"
					}), /* @__PURE__ */ (0, x.jsxs)("div", { children: [/* @__PURE__ */ (0, x.jsx)("strong", { children: "个人财务系统" }), /* @__PURE__ */ (0, x.jsx)("small", { children: "Sites 版 / 公开脱敏" })] })]
				}),
				/* @__PURE__ */ (0, x.jsx)("button", {
					className: e.length === 0 ? "active" : "",
					onClick: () => t([]),
					children: "总览 / 清空"
				}),
				me.map((t) => /* @__PURE__ */ (0, x.jsx)("button", {
					className: e.includes(t.id) ? "active" : "",
					onClick: () => Qn(t.id),
					children: t.title
				}, t.id))
			]
		}), /* @__PURE__ */ (0, x.jsxs)("section", {
			className: "workspace",
			children: [
				/* @__PURE__ */ (0, x.jsxs)("header", {
					className: "topbar",
					children: [/* @__PURE__ */ (0, x.jsxs)("div", { children: [/* @__PURE__ */ (0, x.jsx)("h1", { children: "长期个人财务管理系统" }), /* @__PURE__ */ (0, x.jsx)("p", { children: "数据录入和图表分析分离；先看总览，再多选模块并排复盘。" })] }), /* @__PURE__ */ (0, x.jsx)("div", {
						className: "period-tabs",
						"aria-label": "时间视图",
						children: [
							"周",
							"月",
							"季",
							"年"
						].map((e) => /* @__PURE__ */ (0, x.jsx)("button", {
							className: n === e ? "active" : "",
							onClick: () => r(e),
							children: e
						}, e))
					})]
				}),
				/* @__PURE__ */ (0, x.jsxs)("section", {
					className: "data-safety-bar",
					"aria-label": "数据保存与备份",
					children: [/* @__PURE__ */ (0, x.jsxs)("div", {
						className: "save-indicator",
						children: [/* @__PURE__ */ (0, x.jsx)("span", { className: Vt ? "save-dot ready" : "save-dot" }), /* @__PURE__ */ (0, x.jsxs)("div", { children: [/* @__PURE__ */ (0, x.jsx)("strong", { children: zt }), /* @__PURE__ */ (0, x.jsx)("small", { children: "数据实时保存在当前浏览器；每月底保存月报后，可查看收支和账户环比变化。" })] })]
					}), /* @__PURE__ */ (0, x.jsxs)("div", {
						className: "data-actions",
						children: [
							/* @__PURE__ */ (0, x.jsx)("button", {
								className: "primary-button",
								type: "button",
								onClick: an,
								children: "保存本月月报"
							}),
							/* @__PURE__ */ (0, x.jsx)("button", {
								className: "secondary-button",
								type: "button",
								onClick: Kt,
								children: "保存完整版本"
							}),
							/* @__PURE__ */ (0, x.jsxs)("button", {
								className: "secondary-button",
								type: "button",
								onClick: () => Rt((e) => !e),
								children: ["历史版本 ", Nt.length > 0 ? `(${Nt.length})` : ""]
							}),
							/* @__PURE__ */ (0, x.jsx)("button", {
								className: "secondary-button",
								type: "button",
								onClick: Yt,
								children: "导出备份"
							}),
							/* @__PURE__ */ (0, x.jsx)("button", {
								className: "secondary-button",
								type: "button",
								onClick: () => Ut.current?.click(),
								children: "导入备份"
							}),
							/* @__PURE__ */ (0, x.jsx)("input", {
								ref: Ut,
								className: "visually-hidden",
								accept: "application/json,.json",
								type: "file",
								onChange: (e) => {
									let t = e.target.files?.[0];
									t && Xt(t);
								}
							})
						]
					})]
				}),
				Lt && /* @__PURE__ */ (0, x.jsxs)("section", {
					className: "history-panel",
					children: [/* @__PURE__ */ (0, x.jsxs)("div", {
						className: "history-heading",
						children: [/* @__PURE__ */ (0, x.jsxs)("div", { children: [/* @__PURE__ */ (0, x.jsx)("h2", { children: "历史版本" }), /* @__PURE__ */ (0, x.jsxs)("p", { children: [
							"最多保留最近 ",
							fe,
							" 个手动快照。恢复前可以先保存当前版本。"
						] })] }), /* @__PURE__ */ (0, x.jsx)("button", {
							className: "secondary-button",
							type: "button",
							onClick: () => Rt(!1),
							children: "关闭"
						})]
					}), Nt.length === 0 ? /* @__PURE__ */ (0, x.jsx)("div", {
						className: "history-empty",
						children: "还没有历史版本。点击“保存历史版本”即可创建第一个快照。"
					}) : /* @__PURE__ */ (0, x.jsx)("div", {
						className: "history-list",
						children: Nt.map((e) => /* @__PURE__ */ (0, x.jsxs)("article", {
							className: "history-item",
							children: [/* @__PURE__ */ (0, x.jsxs)("div", { children: [/* @__PURE__ */ (0, x.jsx)("strong", { children: Fe(e.createdAt) }), /* @__PURE__ */ (0, x.jsxs)("span", { children: [
								e.data.selectedMonth ?? i,
								" · ",
								e.data.accounts.length,
								" 个账户"
							] })] }), /* @__PURE__ */ (0, x.jsxs)("div", {
								className: "history-actions",
								children: [/* @__PURE__ */ (0, x.jsx)("button", {
									className: "secondary-button",
									type: "button",
									onClick: () => qt(e),
									children: "恢复"
								}), /* @__PURE__ */ (0, x.jsx)("button", {
									className: "danger-button",
									type: "button",
									onClick: () => Jt(e.id),
									children: "删除"
								})]
							})]
						}, e.id))
					})]
				}),
				/* @__PURE__ */ (0, x.jsxs)("section", {
					className: "overview",
					children: [
						/* @__PURE__ */ (0, x.jsxs)("div", {
							className: "section-title",
							children: [/* @__PURE__ */ (0, x.jsxs)("div", { children: [/* @__PURE__ */ (0, x.jsx)("h2", { children: "总览 Dashboard" }), /* @__PURE__ */ (0, x.jsx)("p", { children: "关键指标给结论；下面的图表区用同一份数据做结构、趋势和风险判断。" })] }), /* @__PURE__ */ (0, x.jsx)("span", {
								className: "pill good",
								children: "公开页已脱敏"
							})]
						}),
						/* @__PURE__ */ (0, x.jsxs)("article", {
							className: "total-assets-hero",
							children: [/* @__PURE__ */ (0, x.jsxs)("div", {
								className: "total-assets-main",
								children: [
									/* @__PURE__ */ (0, x.jsx)("span", { children: "当前总资产与负债" }),
									/* @__PURE__ */ (0, x.jsx)("strong", { children: D(R.totalAssets) }),
									/* @__PURE__ */ (0, x.jsxs)("small", { children: [
										"资产合计 ",
										D(R.totalAssets),
										" / 总负债 ",
										D(R.totalDebt),
										" / 净资产 ",
										D(R.netWorth),
										"；家庭及伴侣储蓄单列，不计入个人总资产。"
									] })
								]
							}), /* @__PURE__ */ (0, x.jsx)("div", {
								className: "total-assets-breakdown",
								"aria-label": "总资产和负债资金分布",
								children: lr.map((e) => /* @__PURE__ */ (0, x.jsxs)("div", {
									className: `asset-breakdown-item ${e.className ?? ""}`.trim(),
									style: { "--asset-color": e.color },
									children: [
										/* @__PURE__ */ (0, x.jsx)("span", { children: e.label }),
										/* @__PURE__ */ (0, x.jsx)("strong", { children: D(e.value) }),
										/* @__PURE__ */ (0, x.jsx)("em", { children: e.detail })
									]
								}, e.label))
							})]
						}),
						/* @__PURE__ */ (0, x.jsx)("div", {
							className: "overview-grid",
							children: dr.map((e) => /* @__PURE__ */ (0, x.jsxs)("article", {
								className: `overview-card ${e.tone} ${e.items ? "with-line-items" : ""}`.trim(),
								children: [
									/* @__PURE__ */ (0, x.jsx)("span", { children: e.title }),
									/* @__PURE__ */ (0, x.jsx)("strong", { children: e.value }),
									e.items ? /* @__PURE__ */ (0, x.jsxs)("div", {
										className: "overview-detail-list",
										children: [/* @__PURE__ */ (0, x.jsx)("small", { children: e.detail }), /* @__PURE__ */ (0, x.jsx)("div", {
											className: "overview-line-items",
											"aria-label": `${e.title}明细`,
											children: e.items.map((e) => /* @__PURE__ */ (0, x.jsxs)("div", {
												className: "overview-line-item",
												children: [
													/* @__PURE__ */ (0, x.jsx)("span", { children: e.label }),
													/* @__PURE__ */ (0, x.jsx)("em", { children: e.value }),
													/* @__PURE__ */ (0, x.jsx)("small", { children: e.note })
												]
											}, e.label))
										})]
									}) : /* @__PURE__ */ (0, x.jsx)("small", { children: e.detail })
								]
							}, e.title))
						}),
						/* @__PURE__ */ (0, x.jsxs)("section", {
							className: "analytics-section",
							children: [/* @__PURE__ */ (0, x.jsx)("div", {
								className: "section-title compact",
								children: /* @__PURE__ */ (0, x.jsxs)("div", { children: [/* @__PURE__ */ (0, x.jsx)("h2", { children: "图表分析区" }), /* @__PURE__ */ (0, x.jsx)("p", { children: "资产、支出、现金流、健康评分分开看，避免所有数字挤在同一屏。" })] })
							}), /* @__PURE__ */ (0, x.jsxs)("div", {
								className: "chart-grid four",
								children: [
									/* @__PURE__ */ (0, x.jsx)(P, {
										title: "资产结构",
										summary: `总资产 ${D(R.totalAssets)}`,
										children: /* @__PURE__ */ (0, x.jsx)(L, {
											data: kr,
											centerLabel: "总资产",
											centerValue: D(R.totalAssets)
										})
									}),
									/* @__PURE__ */ (0, x.jsx)(P, {
										title: "未来现金流趋势",
										summary: "6 个月余额曲线",
										children: /* @__PURE__ */ (0, x.jsx)(ft, {
											data: Mr,
											valueFormatter: D
										})
									}),
									/* @__PURE__ */ (0, x.jsx)(P, {
										title: "支出最高项",
										summary: `已花 ${D(R.spendingActual)}`,
										className: "spending-top-panel",
										children: /* @__PURE__ */ (0, x.jsx)(ut, {
											data: br,
											valueFormatter: D
										})
									}),
									/* @__PURE__ */ (0, x.jsx)(P, {
										title: "健康维度",
										summary: `综合 ${R.score} 分`,
										children: /* @__PURE__ */ (0, x.jsx)(ut, {
											data: ei,
											valueFormatter: (e) => `${e.toFixed(0)}分`,
											percentMode: !0
										})
									}),
									/* @__PURE__ */ (0, x.jsx)(P, {
										title: "本月现金瀑布",
										summary: "期初到月末",
										children: /* @__PURE__ */ (0, x.jsx)(gt, { data: Pr })
									}),
									/* @__PURE__ */ (0, x.jsx)(P, {
										title: "未来现金流日历",
										summary: "关键流入流出",
										children: /* @__PURE__ */ (0, x.jsx)(ht, { events: pn })
									}),
									/* @__PURE__ */ (0, x.jsx)(P, {
										title: "风险矩阵",
										summary: "影响 × 紧迫",
										className: "wide risk-panel",
										children: /* @__PURE__ */ (0, x.jsx)(_t, { data: ti })
									}),
									/* @__PURE__ */ (0, x.jsx)(P, {
										title: "资金分配流向",
										summary: `分配 ${D(R.assetOutflow)}`,
										children: /* @__PURE__ */ (0, x.jsx)(vt, {
											data: Or,
											source: "工资账户",
											valueFormatter: D
										})
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, x.jsx)("div", {
							className: "module-grid",
							children: me.map((t) => /* @__PURE__ */ (0, x.jsxs)("button", {
								className: `module-card ${e.includes(t.id) ? "selected" : ""}`,
								onClick: () => Qn(t.id),
								children: [
									/* @__PURE__ */ (0, x.jsx)("strong", { children: t.title }),
									/* @__PURE__ */ (0, x.jsx)("span", { children: t.desc }),
									/* @__PURE__ */ (0, x.jsx)("em", { children: e.includes(t.id) ? "已打开，点击关闭" : "打开详情" })
								]
							}, t.id))
						})
					]
				}),
				e.length > 0 && /* @__PURE__ */ (0, x.jsxs)("section", {
					className: "selected-modules",
					children: [/* @__PURE__ */ (0, x.jsxs)("div", {
						className: "section-title selected-title",
						children: [/* @__PURE__ */ (0, x.jsxs)("div", { children: [/* @__PURE__ */ (0, x.jsx)("h2", { children: "已打开模块" }), /* @__PURE__ */ (0, x.jsx)("p", { children: "可以同时观看多个模块；每个模块左侧是数据，右侧是图表。" })] }), /* @__PURE__ */ (0, x.jsxs)("div", {
							className: "panel-actions",
							children: [/* @__PURE__ */ (0, x.jsx)("button", {
								onClick: $n,
								children: "打开全部"
							}), /* @__PURE__ */ (0, x.jsx)("button", {
								onClick: () => t([]),
								children: "全部收起"
							})]
						})]
					}), e.map((e) => /* @__PURE__ */ (0, x.jsxs)("section", {
						className: "detail-panel",
						children: [
							e === "income" && /* @__PURE__ */ (0, x.jsx)(M, {
								title: "收入",
								desc: "收入只看实际到账；炒股月结算单独记录，不进入现金流预测。",
								children: /* @__PURE__ */ (0, x.jsx)(j, {
									data: /* @__PURE__ */ (0, x.jsx)(Ye, {
										records: o,
										selectedMonth: i,
										onSelect: a,
										addMonthRecord: yn,
										deleteMonthRecord: bn,
										updateMonthRecord: vn
									}),
									charts: /* @__PURE__ */ (0, x.jsxs)("div", {
										className: "chart-grid two",
										children: [
											/* @__PURE__ */ (0, x.jsx)(P, {
												title: "收入结构",
												summary: `${Zt.label} ${D(nn)}`,
												children: /* @__PURE__ */ (0, x.jsx)(L, {
													data: fr,
													centerLabel: "实际收入",
													centerValue: D(nn)
												})
											}),
											/* @__PURE__ */ (0, x.jsx)(P, {
												title: "收入口径",
												summary: "股票月结不进预测",
												children: /* @__PURE__ */ (0, x.jsx)(pt, {
													data: fr,
													valueFormatter: D
												})
											}),
											/* @__PURE__ */ (0, x.jsx)(P, {
												title: "月度收入趋势",
												summary: "按月份分开记录",
												children: /* @__PURE__ */ (0, x.jsx)(dt, {
													data: mr,
													valueFormatter: D
												})
											})
										]
									})
								})
							}),
							e === "spending" && /* @__PURE__ */ (0, x.jsx)(M, {
								title: "支出",
								desc: "支出与收入分开管理；预算、实际金额、必要性都能直接编辑。",
								children: /* @__PURE__ */ (0, x.jsx)(j, {
									data: /* @__PURE__ */ (0, x.jsxs)(x.Fragment, { children: [/* @__PURE__ */ (0, x.jsx)(We, {
										records: o,
										selectedMonth: i,
										onAddMonth: yn,
										onChange: a,
										onDeleteSelectedMonth: () => bn(i)
									}), /* @__PURE__ */ (0, x.jsx)(xt, {
										budgets: tn,
										deleteBudget: On,
										addBudget: Dn,
										updateBudget: En
									})] }),
									charts: /* @__PURE__ */ (0, x.jsxs)("div", {
										className: "chart-grid two",
										children: [
											/* @__PURE__ */ (0, x.jsx)(P, {
												title: "实际支出最高8项",
												summary: `已花 ${D(R.spendingActual)}`,
												className: "spending-top-panel",
												children: /* @__PURE__ */ (0, x.jsx)(ut, {
													data: br,
													valueFormatter: D
												})
											}),
											/* @__PURE__ */ (0, x.jsx)(P, {
												title: "全部实际支出占比",
												summary: "按实际金额",
												children: /* @__PURE__ */ (0, x.jsx)(L, {
													data: xr,
													centerLabel: "实际",
													centerValue: D(R.spendingActual)
												})
											}),
											/* @__PURE__ */ (0, x.jsx)(P, {
												title: "分类预算执行",
												summary: "实际 / 预算 / 按实际金额降序",
												children: /* @__PURE__ */ (0, x.jsx)(ut, {
													data: vr,
													valueFormatter: D
												})
											}),
											/* @__PURE__ */ (0, x.jsx)(P, {
												title: "预算必要性结构",
												summary: "必须 vs 可取消",
												children: /* @__PURE__ */ (0, x.jsx)(L, {
													data: Cr,
													centerLabel: "预算",
													centerValue: D(R.spendingPlan)
												})
											}),
											/* @__PURE__ */ (0, x.jsx)(P, {
												title: "月度支出趋势",
												summary: "每月实际支出",
												children: /* @__PURE__ */ (0, x.jsx)(dt, {
													data: hr,
													valueFormatter: D
												})
											}),
											/* @__PURE__ */ (0, x.jsx)(P, {
												title: "月度结余趋势",
												summary: "收入 - 实际支出",
												children: /* @__PURE__ */ (0, x.jsx)(dt, {
													data: gr,
													valueFormatter: D
												})
											})
										]
									})
								})
							}),
							e === "cashflow" && /* @__PURE__ */ (0, x.jsx)(M, {
								title: "现金流预测",
								desc: "未来 6 个月预测；资产分配作为现金流出，股票收入不计入预测。",
								children: /* @__PURE__ */ (0, x.jsx)(j, {
									data: /* @__PURE__ */ (0, x.jsxs)(x.Fragment, { children: [
										/* @__PURE__ */ (0, x.jsx)(We, {
											records: o,
											selectedMonth: i,
											onAddMonth: yn,
											onChange: a,
											onDeleteSelectedMonth: () => bn(i)
										}),
										/* @__PURE__ */ (0, x.jsx)(Qe, {
											accountTotal: R.accountTotal,
											addCashflowCustomItem: Sn,
											monthlyInflow: wr,
											monthlyOutflow: Tr,
											rows: Dr
										}),
										/* @__PURE__ */ (0, x.jsx)(it, {
											reminders: Ct,
											addReminder: zn,
											deleteReminder: Bn,
											updateReminder: Rn
										})
									] }),
									charts: /* @__PURE__ */ (0, x.jsxs)("div", {
										className: "chart-grid two",
										children: [
											/* @__PURE__ */ (0, x.jsx)(P, {
												title: "余额趋势",
												summary: "未来 6 个月",
												children: /* @__PURE__ */ (0, x.jsx)(ft, {
													data: Mr,
													valueFormatter: D
												})
											}),
											/* @__PURE__ */ (0, x.jsx)(P, {
												title: "月度流出压力",
												summary: `每月流出 ${D(Tr)}`,
												children: /* @__PURE__ */ (0, x.jsx)(dt, {
													data: Nr,
													valueFormatter: D
												})
											}),
											/* @__PURE__ */ (0, x.jsx)(P, {
												title: "现金瀑布",
												summary: "本月资金变化",
												children: /* @__PURE__ */ (0, x.jsx)(gt, { data: Pr })
											}),
											/* @__PURE__ */ (0, x.jsx)(P, {
												title: "现金流日历",
												summary: "账单与工资联动",
												children: /* @__PURE__ */ (0, x.jsx)(ht, { events: pn })
											})
										]
									})
								})
							}),
							e === "accounts" && /* @__PURE__ */ (0, x.jsx)(M, {
								title: "账户管理",
								desc: "账户可以新增、删除、编辑和拖动排序，修改后会联动总资产、现金流和图表。",
								children: /* @__PURE__ */ (0, x.jsx)(j, {
									data: /* @__PURE__ */ (0, x.jsx)(x.Fragment, { children: /* @__PURE__ */ (0, x.jsx)($e, {
										accounts: c,
										addAccount: hn,
										deleteAccount: gn,
										liquidAccountTotal: R.liquidAccountTotal,
										reorderAccount: _n,
										total: R.accountTotal,
										updateAccount: mn
									}) }),
									charts: /* @__PURE__ */ (0, x.jsxs)("div", {
										className: "chart-grid two",
										children: [
											/* @__PURE__ */ (0, x.jsx)(P, {
												title: "账户余额分布",
												summary: `账户合计 ${D(R.accountTotal)} / 按余额降序`,
												children: /* @__PURE__ */ (0, x.jsx)(L, {
													data: _r,
													centerLabel: "账户",
													centerValue: D(R.accountTotal)
												})
											}),
											/* @__PURE__ */ (0, x.jsx)(P, {
												title: "可动用现金",
												summary: `可立即动用 ${D(R.liquidAccountTotal)} / 按余额降序`,
												children: /* @__PURE__ */ (0, x.jsx)(ut, {
													data: _r,
													valueFormatter: D
												})
											}),
											/* @__PURE__ */ (0, x.jsx)(P, {
												title: "账户用途映射",
												summary: "账户余额流向 / 按余额降序",
												children: /* @__PURE__ */ (0, x.jsx)(vt, {
													data: _r,
													source: "账户池",
													valueFormatter: D
												})
											})
										]
									})
								})
							}),
							e === "budget" && /* @__PURE__ */ (0, x.jsx)(M, {
								title: "预算管理",
								desc: "预算模块保留周/月/季/年视图，固定支出率阈值为 35% 和 50%。",
								children: /* @__PURE__ */ (0, x.jsx)(j, {
									data: /* @__PURE__ */ (0, x.jsxs)(x.Fragment, { children: [
										/* @__PURE__ */ (0, x.jsx)(We, {
											records: o,
											selectedMonth: i,
											onChange: a
										}),
										/* @__PURE__ */ (0, x.jsxs)("div", {
											className: "stat-strip",
											children: [
												/* @__PURE__ */ (0, x.jsx)(N, {
													label: "当前视图",
													value: `${n} / ${A(Zt.label)}`
												}),
												/* @__PURE__ */ (0, x.jsx)(N, {
													label: "预算总额",
													value: D(R.spendingPlan)
												}),
												/* @__PURE__ */ (0, x.jsx)(N, {
													label: "固定支出率",
													value: k(R.fixedRatio)
												}),
												/* @__PURE__ */ (0, x.jsx)(N, {
													label: "预算剩余",
													value: D(R.spendingPlan - R.spendingActual)
												})
											]
										}),
										/* @__PURE__ */ (0, x.jsx)(xt, {
											budgets: tn,
											deleteBudget: On,
											addBudget: Dn,
											updateBudget: En
										})
									] }),
									charts: /* @__PURE__ */ (0, x.jsxs)("div", {
										className: "chart-grid two",
										children: [
											/* @__PURE__ */ (0, x.jsx)(P, {
												title: "固定 / 弹性支出",
												summary: Ue(R.fixedRatio),
												children: /* @__PURE__ */ (0, x.jsx)(L, {
													data: Sr,
													centerLabel: "固定率",
													centerValue: k(R.fixedRatio)
												})
											}),
											/* @__PURE__ */ (0, x.jsx)(P, {
												title: "分类预算排行",
												summary: "看哪里最容易超 / 按实际金额降序",
												children: /* @__PURE__ */ (0, x.jsx)(ut, {
													data: vr,
													valueFormatter: D
												})
											}),
											/* @__PURE__ */ (0, x.jsx)(P, {
												title: "预算使用热力",
												summary: "实际 / 预算",
												children: /* @__PURE__ */ (0, x.jsx)(yt, { data: Qr })
											})
										]
									})
								})
							}),
							e === "investment" && /* @__PURE__ */ (0, x.jsx)(M, {
								title: "投资管理",
								desc: "投资理财单独成栏，A股 / 美股 / 港股分开看；计划投入和市值都能改。",
								children: /* @__PURE__ */ (0, x.jsx)(j, {
									data: /* @__PURE__ */ (0, x.jsxs)(x.Fragment, { children: [/* @__PURE__ */ (0, x.jsxs)("div", {
										className: "form-grid",
										children: [
											/* @__PURE__ */ (0, x.jsx)(Be, {
												label: "美元兑人民币",
												value: f,
												onChange: p,
												step: .01
											}),
											/* @__PURE__ */ (0, x.jsx)(Be, {
												label: "港币兑人民币",
												value: m,
												onChange: h,
												step: .01
											}),
											/* @__PURE__ */ (0, x.jsx)(Be, {
												label: "A股月计划投入",
												value: g,
												onChange: _
											}),
											/* @__PURE__ */ (0, x.jsx)(Be, {
												label: "美股月计划投入",
												value: v,
												onChange: y
											}),
											/* @__PURE__ */ (0, x.jsx)(Be, {
												label: "港股月计划投入",
												value: C,
												onChange: te
											})
										]
									}), /* @__PURE__ */ (0, x.jsx)(et, {
										holdings: u,
										addHolding: An,
										deleteHolding: jn,
										fxHkd: m,
										fxUsd: f,
										updateHolding: kn
									})] }),
									charts: /* @__PURE__ */ (0, x.jsxs)("div", {
										className: "chart-grid two",
										children: [
											/* @__PURE__ */ (0, x.jsx)(P, {
												title: "市场分布",
												summary: `投资市值 ${D(R.investmentValue)}`,
												children: /* @__PURE__ */ (0, x.jsx)(L, {
													data: Ar,
													centerLabel: "投资",
													centerValue: D(R.investmentValue)
												})
											}),
											/* @__PURE__ */ (0, x.jsx)(P, {
												title: "盈亏绝对值",
												summary: `总盈亏 ${D(R.investmentPnL)}`,
												children: /* @__PURE__ */ (0, x.jsx)(ut, {
													data: jr,
													valueFormatter: D
												})
											}),
											/* @__PURE__ */ (0, x.jsx)(P, {
												title: "收益率 / 仓位",
												summary: "横轴仓位，纵轴收益",
												children: /* @__PURE__ */ (0, x.jsx)(bt, {
													data: $r,
													xLabel: "仓位",
													yLabel: "收益"
												})
											})
										]
									})
								})
							}),
							e === "balance" && /* @__PURE__ */ (0, x.jsx)(M, {
								title: "资产负债表",
								desc: "资产项和负债项都支持新增、删除和直接编辑。",
								children: /* @__PURE__ */ (0, x.jsx)(j, {
									data: /* @__PURE__ */ (0, x.jsxs)(x.Fragment, { children: [
										/* @__PURE__ */ (0, x.jsx)(tt, {
											addBalanceAsset: Nn,
											balanceAssets: Je,
											deleteBalanceAsset: Pn,
											totalAssets: R.totalAssets,
											updateBalanceAsset: Mn
										}),
										/* @__PURE__ */ (0, x.jsx)(nt, {
											addLiability: In,
											deleteLiability: Ln,
											liabilities: lt,
											updateLiability: Fn
										}),
										/* @__PURE__ */ (0, x.jsxs)("div", {
											className: "stat-strip",
											children: [
												/* @__PURE__ */ (0, x.jsx)(N, {
													label: "总资产",
													value: D(R.totalAssets)
												}),
												/* @__PURE__ */ (0, x.jsx)(N, {
													label: "总负债",
													value: D(R.totalDebt)
												}),
												/* @__PURE__ */ (0, x.jsx)(N, {
													label: "净资产",
													value: D(R.netWorth)
												}),
												/* @__PURE__ */ (0, x.jsx)(N, {
													label: "负债率",
													value: k(R.debtRatio)
												})
											]
										})
									] }),
									charts: /* @__PURE__ */ (0, x.jsxs)("div", {
										className: "chart-grid two",
										children: [
											/* @__PURE__ */ (0, x.jsx)(P, {
												title: "资产负债对比",
												summary: `净资产 ${D(R.netWorth)}`,
												children: /* @__PURE__ */ (0, x.jsx)(ut, {
													data: Ir,
													valueFormatter: D
												})
											}),
											/* @__PURE__ */ (0, x.jsx)(P, {
												title: "负债结构",
												summary: R.totalDebt ? `负债 ${D(R.totalDebt)}` : "当前无负债",
												children: /* @__PURE__ */ (0, x.jsx)(L, {
													data: Rr,
													centerLabel: "负债",
													centerValue: D(R.totalDebt)
												})
											}),
											/* @__PURE__ */ (0, x.jsx)(P, {
												title: "资产项结构",
												summary: `补录资产 ${D(R.manualAssetTotal)}`,
												children: /* @__PURE__ */ (0, x.jsx)(L, {
													data: Lr,
													centerLabel: "资产项",
													centerValue: D(R.manualAssetTotal)
												})
											}),
											/* @__PURE__ */ (0, x.jsx)(P, {
												title: "净资产趋势",
												summary: "按 6 个月现金预测推演",
												children: /* @__PURE__ */ (0, x.jsx)(ft, {
													data: Fr,
													valueFormatter: D
												})
											})
										]
									})
								})
							}),
							e === "emergency" && /* @__PURE__ */ (0, x.jsx)(M, {
								title: "应急金",
								desc: "当前金额与目标管理的应急储备自动同步。",
								children: /* @__PURE__ */ (0, x.jsx)(j, {
									data: /* @__PURE__ */ (0, x.jsxs)(x.Fragment, { children: [/* @__PURE__ */ (0, x.jsx)(rt, {
										emergencyFund: R.currentEmergencyFund,
										emergencyMonthlyNeed: Ke,
										emergencyMonths: F,
										setEmergencyFund: Jn,
										setEmergencyMonthlyNeed: qe,
										setEmergencyMonths: Ge
									}), /* @__PURE__ */ (0, x.jsxs)("div", {
										className: "stat-strip",
										children: [
											/* @__PURE__ */ (0, x.jsx)(N, {
												label: "覆盖月数",
												value: `${R.emergencyCoverage.toFixed(1)} 个月`
											}),
											/* @__PURE__ */ (0, x.jsx)(N, {
												label: "目标金额",
												value: D(R.emergencyTarget)
											}),
											/* @__PURE__ */ (0, x.jsx)(N, {
												label: "缺口",
												value: D(Math.max(0, R.emergencyTarget - R.currentEmergencyFund))
											}),
											/* @__PURE__ */ (0, x.jsx)(N, {
												label: "当前进度",
												value: k(R.emergencyCoverage / Math.max(F, 1))
											})
										]
									})] }),
									charts: /* @__PURE__ */ (0, x.jsxs)("div", {
										className: "chart-grid two",
										children: [/* @__PURE__ */ (0, x.jsx)(P, {
											title: "应急金覆盖",
											summary: `${R.emergencyCoverage.toFixed(1)} / ${F} 个月`,
											children: /* @__PURE__ */ (0, x.jsx)(mt, {
												data: [{
													label: "应急金目标",
													value: R.currentEmergencyFund,
													max: R.emergencyTarget,
													color: S[1],
													detail: `缺口 ${D(Math.max(0, R.emergencyTarget - R.currentEmergencyFund))}`
												}],
												valueFormatter: D
											})
										}), /* @__PURE__ */ (0, x.jsx)(P, {
											title: "必要支出压力",
											summary: `应急基准 ${D(R.emergencyMonthlyNeed)}`,
											children: /* @__PURE__ */ (0, x.jsx)(ut, {
												data: [
													{
														label: "应急月均支出",
														value: R.emergencyMonthlyNeed,
														color: S[1]
													},
													{
														label: "预算必要支出",
														value: R.requiredSpending,
														color: S[2]
													},
													{
														label: "预算总额",
														value: R.spendingPlan,
														color: S[4]
													}
												],
												valueFormatter: D
											})
										})]
									})
								})
							}),
							e === "reminders" && /* @__PURE__ */ (0, x.jsx)(M, {
								title: "账单与提醒",
								desc: "网页内提醒，默认提前 7 天；金额可先手动维护。",
								children: /* @__PURE__ */ (0, x.jsx)(j, {
									data: /* @__PURE__ */ (0, x.jsx)(it, {
										reminders: Ct,
										addReminder: zn,
										deleteReminder: Bn,
										updateReminder: Rn
									}),
									charts: /* @__PURE__ */ (0, x.jsxs)("div", {
										className: "chart-grid two",
										children: [
											/* @__PURE__ */ (0, x.jsx)(P, {
												title: "提醒金额",
												summary: "避免漏扣",
												children: /* @__PURE__ */ (0, x.jsx)(ut, {
													data: Jr,
													valueFormatter: D
												})
											}),
											/* @__PURE__ */ (0, x.jsx)(P, {
												title: "距离到期",
												summary: "以 2026-06-14 为当前日",
												children: /* @__PURE__ */ (0, x.jsx)(dt, {
													data: Yr,
													valueFormatter: (e) => `${e.toFixed(0)}天`
												})
											}),
											/* @__PURE__ */ (0, x.jsx)(P, {
												title: "提醒日历",
												summary: "未来关键扣款",
												children: /* @__PURE__ */ (0, x.jsx)(ht, { events: pn })
											})
										]
									})
								})
							}),
							e === "goals" && /* @__PURE__ */ (0, x.jsx)(M, {
								title: "目标管理",
								desc: "旅游、学习、父母储蓄、伴侣基金和大额支出目标都可以维护目标金额；预期准备用于规划，实际投入用于本月计算。",
								children: /* @__PURE__ */ (0, x.jsx)(j, {
									data: /* @__PURE__ */ (0, x.jsxs)(x.Fragment, { children: [/* @__PURE__ */ (0, x.jsx)(We, {
										records: o,
										selectedMonth: i,
										onChange: a
									}), /* @__PURE__ */ (0, x.jsx)(at, {
										goals: Tt,
										addGoal: Yn,
										deleteGoal: Xn,
										updateGoal: Vn
									})] }),
									charts: /* @__PURE__ */ (0, x.jsxs)("div", {
										className: "chart-grid two",
										children: [
											/* @__PURE__ */ (0, x.jsx)(P, {
												title: "目标进度",
												summary: "当前 / 目标",
												children: /* @__PURE__ */ (0, x.jsx)(mt, {
													data: zr,
													valueFormatter: D
												})
											}),
											/* @__PURE__ */ (0, x.jsx)(P, {
												title: "每月预期准备结构",
												summary: `预期 ${D(Hr)}`,
												children: /* @__PURE__ */ (0, x.jsx)(L, {
													data: Tt.map((e, t) => ({
														label: e.name,
														value: e.monthly,
														color: S[t % S.length]
													})),
													centerLabel: "每月",
													centerValue: D(Hr)
												})
											}),
											/* @__PURE__ */ (0, x.jsx)(P, {
												title: "月度实际目标投入",
												summary: `实际投入 ${D(Ur)}`,
												children: /* @__PURE__ */ (0, x.jsx)(dt, {
													data: Gr,
													valueFormatter: D
												})
											}),
											/* @__PURE__ */ (0, x.jsx)(P, {
												title: "支出与投入压力",
												summary: "实际支出 + 实际投入",
												children: /* @__PURE__ */ (0, x.jsx)(dt, {
													data: Kr,
													valueFormatter: D
												})
											}),
											/* @__PURE__ */ (0, x.jsx)(P, {
												title: "累计准备变化",
												summary: `当前 ${D(Br)}`,
												children: /* @__PURE__ */ (0, x.jsx)(ft, {
													data: qr,
													valueFormatter: D
												})
											})
										]
									})
								})
							}),
							e === "reports" && /* @__PURE__ */ (0, x.jsx)(M, {
								title: "财务报表",
								desc: "月度复盘先给关键结论，后续可以接历史数据做趋势。",
								children: /* @__PURE__ */ (0, x.jsx)(j, {
									data: /* @__PURE__ */ (0, x.jsxs)(x.Fragment, { children: [
										/* @__PURE__ */ (0, x.jsxs)("div", {
											className: "stat-strip",
											children: [
												/* @__PURE__ */ (0, x.jsx)(N, {
													label: "收入",
													value: D(nn)
												}),
												/* @__PURE__ */ (0, x.jsx)(N, {
													label: "支出",
													value: D(R.spendingActual)
												}),
												/* @__PURE__ */ (0, x.jsx)(N, {
													label: "结余",
													value: D(R.monthlySurplus)
												}),
												/* @__PURE__ */ (0, x.jsx)(N, {
													label: "储蓄率",
													value: k(R.savingsRate)
												})
											]
										}),
										/* @__PURE__ */ (0, x.jsx)(ot, {
											allocation: R.assetOutflow,
											income: nn,
											rows: Xr,
											spending: R.spendingActual,
											surplus: R.monthlySurplus
										}),
										/* @__PURE__ */ (0, x.jsxs)("p", {
											className: "review-copy",
											children: [
												Zt.label,
												" 实际收入 ",
												D(nn),
												"，已记录支出 ",
												D(R.spendingActual),
												"， 资产分配 ",
												D(R.assetOutflow),
												"。投资浮动盈亏 ",
												D(R.investmentPnL),
												"。 下月重点关注现金流预测、固定支出率和 7 天内提醒。"
											]
										})
									] }),
									charts: /* @__PURE__ */ (0, x.jsxs)("div", {
										className: "chart-grid two",
										children: [
											/* @__PURE__ */ (0, x.jsx)(P, {
												title: "本月资金流向",
												summary: `储蓄率 ${k(R.savingsRate)}`,
												children: /* @__PURE__ */ (0, x.jsx)(dt, {
													data: Zr,
													valueFormatter: D
												})
											}),
											/* @__PURE__ */ (0, x.jsx)(P, {
												title: "月度收支对比",
												summary: "收入和支出分月查看",
												children: /* @__PURE__ */ (0, x.jsx)(dt, {
													data: [...mr, ...hr],
													valueFormatter: D
												})
											}),
											/* @__PURE__ */ (0, x.jsx)(P, {
												title: "现金流未来趋势",
												summary: `6个月末 ${D(fn[fn.length - 1]?.balance ?? 0)}`,
												children: /* @__PURE__ */ (0, x.jsx)(ft, {
													data: Mr,
													valueFormatter: D
												})
											}),
											/* @__PURE__ */ (0, x.jsx)(P, {
												title: "资金瀑布复盘",
												summary: "收入、支出、分配",
												children: /* @__PURE__ */ (0, x.jsx)(gt, { data: Pr })
											}),
											/* @__PURE__ */ (0, x.jsx)(P, {
												title: "风险矩阵",
												summary: "下月关注点",
												children: /* @__PURE__ */ (0, x.jsx)(_t, { data: ti })
											})
										]
									})
								})
							}),
							e === "monthlyArchive" && /* @__PURE__ */ (0, x.jsx)(M, {
								title: "月度存档",
								desc: "每月底保存一次月报，用来追踪收入、支出、账户余额和净资产的环比变化。",
								children: /* @__PURE__ */ (0, x.jsx)(j, {
									data: /* @__PURE__ */ (0, x.jsxs)(x.Fragment, { children: [
										/* @__PURE__ */ (0, x.jsx)(We, {
											records: o,
											selectedMonth: i,
											onAddMonth: yn,
											onChange: a,
											onDeleteSelectedMonth: () => bn(i)
										}),
										/* @__PURE__ */ (0, x.jsxs)("div", {
											className: "stat-strip",
											children: [
												/* @__PURE__ */ (0, x.jsx)(N, {
													label: "收入变化",
													value: un ? Ie(ci) : "待对比"
												}),
												/* @__PURE__ */ (0, x.jsx)(N, {
													label: "支出变化",
													value: un ? Ie(li) : "待对比"
												}),
												/* @__PURE__ */ (0, x.jsx)(N, {
													label: "账户变化",
													value: un ? Ie(ui) : "待对比"
												}),
												/* @__PURE__ */ (0, x.jsx)(N, {
													label: "净资产变化",
													value: un ? Ie(di) : "待对比"
												})
											]
										}),
										/* @__PURE__ */ (0, x.jsx)(Xe, {
											archives: Ft,
											currentArchive: sn,
											deleteMonthlyArchive: on,
											saveMonthlyArchive: an,
											selectedMonth: i,
											onSelectMonth: a
										}),
										/* @__PURE__ */ (0, x.jsx)(Ze, {
											currentArchive: ln,
											previousArchive: un
										})
									] }),
									charts: /* @__PURE__ */ (0, x.jsxs)("div", {
										className: "chart-grid two",
										children: [
											/* @__PURE__ */ (0, x.jsx)(P, {
												title: "存档收入趋势",
												summary: `${dn.length} 个月 / 当前 ${D(nn)}`,
												children: /* @__PURE__ */ (0, x.jsx)(dt, {
													data: ri,
													valueFormatter: D
												})
											}),
											/* @__PURE__ */ (0, x.jsx)(P, {
												title: "存档支出趋势",
												summary: `当前支出 ${D(R.spendingActual)}`,
												children: /* @__PURE__ */ (0, x.jsx)(dt, {
													data: ii,
													valueFormatter: D
												})
											}),
											/* @__PURE__ */ (0, x.jsx)(P, {
												title: "账户余额变化",
												summary: `当前账户 ${D(R.accountTotal)}`,
												children: /* @__PURE__ */ (0, x.jsx)(ft, {
													data: oi,
													valueFormatter: D
												})
											}),
											/* @__PURE__ */ (0, x.jsx)(P, {
												title: "净资产变化",
												summary: `当前净资产 ${D(R.netWorth)}`,
												children: /* @__PURE__ */ (0, x.jsx)(ft, {
													data: ai,
													valueFormatter: D
												})
											}),
											/* @__PURE__ */ (0, x.jsx)(P, {
												title: "当月余额变化",
												summary: "收入 - 支出 - 分配",
												children: /* @__PURE__ */ (0, x.jsx)(ft, {
													data: si,
													valueFormatter: D
												})
											})
										]
									})
								})
							}),
							e === "health" && /* @__PURE__ */ (0, x.jsx)(M, {
								title: "财务健康评分",
								desc: "100 分制，用现金流、应急金、负债、增长和趋势综合判断。",
								children: /* @__PURE__ */ (0, x.jsx)(j, {
									data: /* @__PURE__ */ (0, x.jsxs)(x.Fragment, { children: [
										/* @__PURE__ */ (0, x.jsxs)("div", {
											className: "health-score",
											style: { "--score": `${R.score}%` },
											children: [/* @__PURE__ */ (0, x.jsx)("strong", { children: R.score }), /* @__PURE__ */ (0, x.jsx)("span", { children: "财务健康分" })]
										}),
										/* @__PURE__ */ (0, x.jsx)(st, {
											emergencyMonthlyNeed: Ke,
											emergencyMonths: F,
											addLiability: In,
											deleteLiability: Ln,
											liabilities: lt,
											setEmergencyMonthlyNeed: qe,
											setEmergencyMonths: Ge,
											updateLiability: Fn
										}),
										/* @__PURE__ */ (0, x.jsxs)("div", {
											className: "stat-strip",
											children: [
												/* @__PURE__ */ (0, x.jsx)(N, {
													label: "固定支出率",
													value: k(R.fixedRatio)
												}),
												/* @__PURE__ */ (0, x.jsx)(N, {
													label: "应急覆盖",
													value: `${R.emergencyCoverage.toFixed(1)}个月`
												}),
												/* @__PURE__ */ (0, x.jsx)(N, {
													label: "负债率",
													value: k(R.debtRatio)
												}),
												/* @__PURE__ */ (0, x.jsx)(N, {
													label: "投资盈亏",
													value: D(R.investmentPnL)
												})
											]
										})
									] }),
									charts: /* @__PURE__ */ (0, x.jsxs)("div", {
										className: "chart-grid two",
										children: [
											/* @__PURE__ */ (0, x.jsx)(P, {
												title: "健康维度拆解",
												summary: "五项分数",
												children: /* @__PURE__ */ (0, x.jsx)(ut, {
													data: ei,
													valueFormatter: (e) => `${e.toFixed(0)}分`,
													percentMode: !0
												})
											}),
											/* @__PURE__ */ (0, x.jsx)(P, {
												title: "资产抗风险结构",
												summary: "账户 / 应急 / 负债",
												children: /* @__PURE__ */ (0, x.jsx)(L, {
													data: kr,
													centerLabel: "覆盖",
													centerValue: `${R.emergencyCoverage.toFixed(1)}月`
												})
											}),
											/* @__PURE__ */ (0, x.jsx)(P, {
												title: "风险矩阵",
												summary: "影响 × 紧迫",
												children: /* @__PURE__ */ (0, x.jsx)(_t, { data: ti })
											})
										]
									})
								})
							}),
							e === "future" && /* @__PURE__ */ (0, x.jsx)(M, {
								title: "数据能力",
								desc: "债务、保险、数据质量、规则引擎先放结构，等后续数据补齐再激活。",
								children: /* @__PURE__ */ (0, x.jsx)(j, {
									data: /* @__PURE__ */ (0, x.jsx)(ct, {
										capabilities: Dt,
										updateCapability: Zn
									}),
									charts: /* @__PURE__ */ (0, x.jsxs)("div", {
										className: "chart-grid two",
										children: [/* @__PURE__ */ (0, x.jsx)(P, {
											title: "能力成熟度",
											summary: "未来模块占位评分",
											children: /* @__PURE__ */ (0, x.jsx)(ut, {
												data: ni,
												valueFormatter: (e) => `${e.toFixed(0)}分`,
												percentMode: !0
											})
										}), /* @__PURE__ */ (0, x.jsx)(P, {
											title: "规则覆盖路线",
											summary: "自动分类 / 校验 / 提醒",
											children: /* @__PURE__ */ (0, x.jsx)(pt, {
												data: ni,
												valueFormatter: (e) => `${e.toFixed(0)}分`
											})
										})]
									})
								})
							})
						]
					}, e))]
				})
			]
		})]
	});
}
function He(e, t, n, r) {
	return t === "USD" ? e * n : t === "HKD" ? e * r : e;
}
function Ue(e) {
	return e < .35 ? "低于 35%，健康" : e <= .5 ? "35%-50%，注意" : "高于 50%，风险";
}
function j({ data: e, charts: t }) {
	return /* @__PURE__ */ (0, x.jsxs)("div", {
		className: "data-chart-layout",
		children: [/* @__PURE__ */ (0, x.jsxs)("section", {
			className: "data-pane",
			children: [/* @__PURE__ */ (0, x.jsx)("div", {
				className: "pane-label",
				children: "数据区"
			}), e]
		}), /* @__PURE__ */ (0, x.jsxs)("section", {
			className: "chart-pane",
			children: [/* @__PURE__ */ (0, x.jsx)("div", {
				className: "pane-label",
				children: "图表区"
			}), t]
		})]
	});
}
function M({ title: e, desc: t, children: n }) {
	return /* @__PURE__ */ (0, x.jsxs)(x.Fragment, { children: [/* @__PURE__ */ (0, x.jsx)("div", {
		className: "section-title",
		children: /* @__PURE__ */ (0, x.jsxs)("div", { children: [/* @__PURE__ */ (0, x.jsx)("h2", { children: e }), /* @__PURE__ */ (0, x.jsx)("p", { children: t })] })
	}), /* @__PURE__ */ (0, x.jsx)("div", {
		className: "module-body",
		children: n
	})] });
}
function N({ label: e, value: t }) {
	return /* @__PURE__ */ (0, x.jsxs)("article", {
		className: "stat-card",
		children: [/* @__PURE__ */ (0, x.jsx)("span", { children: e }), /* @__PURE__ */ (0, x.jsx)("strong", { children: t })]
	});
}
function We({ records: e, selectedMonth: t, onAddMonth: n, onChange: r, onDeleteSelectedMonth: i }) {
	return /* @__PURE__ */ (0, x.jsxs)("div", {
		className: "month-selector-shell",
		children: [/* @__PURE__ */ (0, x.jsx)("div", {
			className: "month-selector",
			"aria-label": "月份切换",
			children: e.map((e) => /* @__PURE__ */ (0, x.jsxs)("button", {
				className: e.id === t ? "active" : "",
				type: "button",
				onClick: () => r(e.id),
				children: [/* @__PURE__ */ (0, x.jsx)("strong", { children: A(e.label) }), /* @__PURE__ */ (0, x.jsx)("span", { children: e.id === t ? "当前" : "切换" })]
			}, e.id))
		}), (n || i) && /* @__PURE__ */ (0, x.jsxs)("div", {
			className: "month-selector-actions",
			children: [n && /* @__PURE__ */ (0, x.jsx)("button", {
				className: "secondary-button",
				type: "button",
				onClick: n,
				children: "新增月份"
			}), i && /* @__PURE__ */ (0, x.jsx)("button", {
				className: "danger-button",
				disabled: e.length <= 1,
				type: "button",
				onClick: i,
				children: "删除当前月"
			})]
		})]
	});
}
function P({ title: e, summary: t, children: n, className: r = "" }) {
	return /* @__PURE__ */ (0, x.jsxs)("article", {
		className: `chart-panel ${r}`.trim(),
		children: [/* @__PURE__ */ (0, x.jsxs)("div", {
			className: "chart-head",
			children: [/* @__PURE__ */ (0, x.jsx)("strong", { children: e }), /* @__PURE__ */ (0, x.jsx)("span", { children: t })]
		}), n]
	});
}
function F({ value: e, onChange: t, min: n = 0, max: r, step: i = 100, ariaLabel: a }) {
	return /* @__PURE__ */ (0, x.jsx)("input", {
		"aria-label": a,
		className: "table-input",
		inputMode: "decimal",
		max: r,
		min: n,
		step: i,
		type: "number",
		value: Number.isFinite(e) ? e : 0,
		onChange: (e) => t(he(e.target.value))
	});
}
function Ge({ value: e, onChange: t, ariaLabel: n, placeholder: r }) {
	return /* @__PURE__ */ (0, x.jsx)("input", {
		"aria-label": n,
		className: "table-input text",
		placeholder: r,
		type: "text",
		value: e,
		onChange: (e) => t(e.target.value)
	});
}
function Ke({ value: e, onChange: t, ariaLabel: n }) {
	return /* @__PURE__ */ (0, x.jsx)("input", {
		"aria-label": n,
		className: "table-input",
		type: "date",
		value: e,
		onChange: (e) => t(e.target.value)
	});
}
function qe({ value: e, options: t, onChange: n, ariaLabel: r }) {
	return /* @__PURE__ */ (0, x.jsx)("select", {
		className: "table-input",
		"aria-label": r,
		value: e,
		onChange: (e) => n(e.target.value),
		children: t.map((e) => /* @__PURE__ */ (0, x.jsx)("option", {
			value: e,
			children: e
		}, e))
	});
}
function Je({ checked: e, onChange: t, ariaLabel: n }) {
	return /* @__PURE__ */ (0, x.jsx)("input", {
		"aria-label": n,
		checked: e,
		className: "table-check",
		type: "checkbox",
		onChange: (e) => t(e.target.checked)
	});
}
function I({ title: e, meta: t, action: n }) {
	return /* @__PURE__ */ (0, x.jsxs)("div", {
		className: "table-toolbar",
		children: [/* @__PURE__ */ (0, x.jsxs)("div", { children: [/* @__PURE__ */ (0, x.jsx)("strong", { children: e }), /* @__PURE__ */ (0, x.jsx)("span", { children: t })] }), n]
	});
}
function Ye({ records: e, selectedMonth: t, onSelect: n, addMonthRecord: r, deleteMonthRecord: i, updateMonthRecord: a }) {
	let o = e.find((e) => e.id === t) ?? e[0];
	return /* @__PURE__ */ (0, x.jsxs)(x.Fragment, { children: [/* @__PURE__ */ (0, x.jsx)(I, {
		title: "月度收入底表",
		meta: `${e.length} 个月 / 当前 ${o.label} / 实际收入 ${D(ve(o))}`,
		action: /* @__PURE__ */ (0, x.jsx)("button", {
			className: "secondary-button",
			type: "button",
			onClick: r,
			children: "新增月份"
		})
	}), /* @__PURE__ */ (0, x.jsx)("div", {
		className: "table-wrap spreadsheet-wrap",
		children: /* @__PURE__ */ (0, x.jsxs)("table", {
			className: "spreadsheet-table",
			children: [/* @__PURE__ */ (0, x.jsx)("thead", { children: /* @__PURE__ */ (0, x.jsxs)("tr", { children: [
				/* @__PURE__ */ (0, x.jsx)("th", { children: "月份" }),
				/* @__PURE__ */ (0, x.jsx)("th", { children: "工资" }),
				/* @__PURE__ */ (0, x.jsx)("th", { children: "到账日" }),
				/* @__PURE__ */ (0, x.jsx)("th", { children: "炒股月结" }),
				/* @__PURE__ */ (0, x.jsx)("th", { children: "其他收入" }),
				/* @__PURE__ */ (0, x.jsx)("th", { children: "实际收入" }),
				/* @__PURE__ */ (0, x.jsx)("th", { children: "状态" }),
				/* @__PURE__ */ (0, x.jsx)("th", { children: "操作" })
			] }) }), /* @__PURE__ */ (0, x.jsx)("tbody", { children: e.map((r) => /* @__PURE__ */ (0, x.jsxs)("tr", {
				className: r.id === t ? "selected-row" : "",
				children: [
					/* @__PURE__ */ (0, x.jsx)("td", { children: /* @__PURE__ */ (0, x.jsx)("button", {
						className: "row-select-button",
						type: "button",
						onClick: () => n(r.id),
						children: r.label
					}) }),
					/* @__PURE__ */ (0, x.jsx)("td", { children: /* @__PURE__ */ (0, x.jsx)(F, {
						ariaLabel: `${r.label} 工资`,
						value: r.salary,
						onChange: (e) => a(r.id, { salary: e })
					}) }),
					/* @__PURE__ */ (0, x.jsx)("td", { children: /* @__PURE__ */ (0, x.jsx)(F, {
						ariaLabel: `${r.label} 到账日`,
						max: 31,
						min: 1,
						step: 1,
						value: r.payday,
						onChange: (e) => a(r.id, { payday: e })
					}) }),
					/* @__PURE__ */ (0, x.jsx)("td", { children: /* @__PURE__ */ (0, x.jsx)(F, {
						ariaLabel: `${r.label} 炒股月结`,
						value: r.stockIncome,
						onChange: (e) => a(r.id, { stockIncome: e })
					}) }),
					/* @__PURE__ */ (0, x.jsx)("td", { children: /* @__PURE__ */ (0, x.jsx)(F, {
						ariaLabel: `${r.label} 其他收入`,
						value: r.otherIncome,
						onChange: (e) => a(r.id, { otherIncome: e })
					}) }),
					/* @__PURE__ */ (0, x.jsx)("td", {
						className: "calculated-cell",
						children: D(ve(r))
					}),
					/* @__PURE__ */ (0, x.jsx)("td", { children: /* @__PURE__ */ (0, x.jsx)("span", {
						className: r.id === t ? "pill good" : "pill",
						children: r.id === t ? "当前" : "可选"
					}) }),
					/* @__PURE__ */ (0, x.jsx)("td", { children: /* @__PURE__ */ (0, x.jsx)("button", {
						className: "danger-button compact",
						disabled: e.length <= 1,
						type: "button",
						onClick: () => i(r.id),
						children: "删除"
					}) })
				]
			}, r.id)) })]
		})
	})] });
}
function Xe({ archives: e, currentArchive: t, selectedMonth: n, saveMonthlyArchive: r, deleteMonthlyArchive: i, onSelectMonth: a }) {
	let o = [...e].sort((e, t) => t.monthId.localeCompare(e.monthId) || t.savedAt.localeCompare(e.savedAt)), s = e.find((e) => e.monthId === n), c = ze(e, n), l = c ? t.income - c.income : 0, u = c ? t.spending - c.spending : 0, d = c ? t.accountTotal - c.accountTotal : 0, f = c ? t.netWorth - c.netWorth : 0;
	return /* @__PURE__ */ (0, x.jsxs)(x.Fragment, { children: [
		/* @__PURE__ */ (0, x.jsx)(I, {
			title: "月度存档底表",
			meta: `${e.length} 条月报 / 当前 ${t.label}${s ? " 已保存" : " 未保存"}`,
			action: /* @__PURE__ */ (0, x.jsx)("button", {
				className: "primary-button",
				type: "button",
				onClick: r,
				children: "保存当前月报"
			})
		}),
		/* @__PURE__ */ (0, x.jsxs)("div", {
			className: "archive-current-grid",
			"aria-label": "当前月报预览",
			children: [
				/* @__PURE__ */ (0, x.jsxs)("div", {
					className: "archive-current-metric",
					children: [
						/* @__PURE__ */ (0, x.jsx)("span", { children: "当前收入" }),
						/* @__PURE__ */ (0, x.jsx)("strong", { children: D(t.income) }),
						/* @__PURE__ */ (0, x.jsx)("em", {
							className: c ? Le(l) : "",
							children: c ? Ie(l) : "等待上月月报"
						})
					]
				}),
				/* @__PURE__ */ (0, x.jsxs)("div", {
					className: "archive-current-metric",
					children: [
						/* @__PURE__ */ (0, x.jsx)("span", { children: "当前支出" }),
						/* @__PURE__ */ (0, x.jsx)("strong", { children: D(t.spending) }),
						/* @__PURE__ */ (0, x.jsx)("em", { children: c ? Ie(u) : "等待上月月报" })
					]
				}),
				/* @__PURE__ */ (0, x.jsxs)("div", {
					className: "archive-current-metric",
					children: [
						/* @__PURE__ */ (0, x.jsx)("span", { children: "账户余额" }),
						/* @__PURE__ */ (0, x.jsx)("strong", { children: D(t.accountTotal) }),
						/* @__PURE__ */ (0, x.jsx)("em", {
							className: c ? Le(d) : "",
							children: c ? Ie(d) : "等待上月月报"
						})
					]
				}),
				/* @__PURE__ */ (0, x.jsxs)("div", {
					className: "archive-current-metric",
					children: [
						/* @__PURE__ */ (0, x.jsx)("span", { children: "净资产" }),
						/* @__PURE__ */ (0, x.jsx)("strong", { children: D(t.netWorth) }),
						/* @__PURE__ */ (0, x.jsx)("em", {
							className: c ? Le(f) : "",
							children: c ? Ie(f) : "等待上月月报"
						})
					]
				})
			]
		}),
		/* @__PURE__ */ (0, x.jsx)("div", {
			className: "table-wrap spreadsheet-wrap",
			children: /* @__PURE__ */ (0, x.jsxs)("table", {
				className: "spreadsheet-table monthly-archive-table",
				children: [/* @__PURE__ */ (0, x.jsx)("thead", { children: /* @__PURE__ */ (0, x.jsxs)("tr", { children: [
					/* @__PURE__ */ (0, x.jsx)("th", { children: "月份" }),
					/* @__PURE__ */ (0, x.jsx)("th", { children: "保存时间" }),
					/* @__PURE__ */ (0, x.jsx)("th", { children: "收入" }),
					/* @__PURE__ */ (0, x.jsx)("th", { children: "支出" }),
					/* @__PURE__ */ (0, x.jsx)("th", { children: "资产分配" }),
					/* @__PURE__ */ (0, x.jsx)("th", { children: "当月余额" }),
					/* @__PURE__ */ (0, x.jsx)("th", { children: "账户余额" }),
					/* @__PURE__ */ (0, x.jsx)("th", { children: "净资产" }),
					/* @__PURE__ */ (0, x.jsx)("th", { children: "环比变化" }),
					/* @__PURE__ */ (0, x.jsx)("th", { children: "操作" })
				] }) }), /* @__PURE__ */ (0, x.jsxs)("tbody", { children: [o.length === 0 && /* @__PURE__ */ (0, x.jsx)("tr", { children: /* @__PURE__ */ (0, x.jsx)("td", {
					className: "calculated-cell",
					colSpan: 10,
					children: "还没有月度存档。确认当月数据后点击“保存当前月报”。"
				}) }), o.map((t) => {
					let r = ze(e, t.monthId), o = r ? t.income - r.income : 0, s = r ? t.spending - r.spending : 0, c = r ? t.accountTotal - r.accountTotal : 0, l = r ? t.netWorth - r.netWorth : 0;
					return /* @__PURE__ */ (0, x.jsxs)("tr", {
						className: t.monthId === n ? "selected-row" : "",
						children: [
							/* @__PURE__ */ (0, x.jsx)("td", { children: /* @__PURE__ */ (0, x.jsx)("button", {
								className: "row-select-button",
								type: "button",
								onClick: () => a(t.monthId),
								children: t.label
							}) }),
							/* @__PURE__ */ (0, x.jsx)("td", { children: Fe(t.savedAt) }),
							/* @__PURE__ */ (0, x.jsx)("td", {
								className: "calculated-cell",
								children: D(t.income)
							}),
							/* @__PURE__ */ (0, x.jsx)("td", {
								className: "calculated-cell",
								children: D(t.spending)
							}),
							/* @__PURE__ */ (0, x.jsx)("td", {
								className: "calculated-cell",
								children: D(t.allocation)
							}),
							/* @__PURE__ */ (0, x.jsx)("td", {
								className: Le(t.surplus),
								children: D(t.surplus)
							}),
							/* @__PURE__ */ (0, x.jsx)("td", {
								className: "calculated-cell",
								children: D(t.accountTotal)
							}),
							/* @__PURE__ */ (0, x.jsx)("td", {
								className: "calculated-cell",
								children: D(t.netWorth)
							}),
							/* @__PURE__ */ (0, x.jsx)("td", { children: r ? /* @__PURE__ */ (0, x.jsxs)("div", {
								className: "archive-change-stack",
								children: [
									/* @__PURE__ */ (0, x.jsxs)("span", {
										className: Le(o),
										children: ["收入 ", Ie(o)]
									}),
									/* @__PURE__ */ (0, x.jsxs)("span", { children: ["支出 ", Ie(s)] }),
									/* @__PURE__ */ (0, x.jsxs)("span", {
										className: Le(c),
										children: ["账户 ", Ie(c)]
									}),
									/* @__PURE__ */ (0, x.jsxs)("span", {
										className: Le(l),
										children: ["净资产 ", Ie(l)]
									})
								]
							}) : /* @__PURE__ */ (0, x.jsx)("span", {
								className: "pill",
								children: "首月基准"
							}) }),
							/* @__PURE__ */ (0, x.jsx)("td", { children: /* @__PURE__ */ (0, x.jsx)("button", {
								className: "danger-button compact",
								type: "button",
								onClick: () => i(t.id),
								children: "删除"
							}) })
						]
					}, t.id);
				})] })]
			})
		})
	] });
}
function Ze({ currentArchive: e, previousArchive: t }) {
	let n = new Map(e.accounts.map((e) => [e.id, e])), r = new Map((t?.accounts ?? []).map((e) => [e.id, e])), i = Array.from(new Set([...n.keys(), ...r.keys()])).map((e) => {
		let t = n.get(e), i = r.get(e), a = t?.balance ?? 0, o = i?.balance ?? 0;
		return {
			id: e,
			name: t?.name ?? i?.name ?? "未命名账户",
			type: t?.type ?? i?.type ?? "账户",
			purpose: t?.purpose ?? i?.purpose ?? "",
			currentBalance: a,
			previousBalance: o,
			delta: a - o,
			status: t && !i ? "新增" : !t && i ? "已移除" : a === o ? "持平" : "变化"
		};
	}).sort((e, t) => Math.abs(t.delta) - Math.abs(e.delta) || t.currentBalance - e.currentBalance);
	return /* @__PURE__ */ (0, x.jsxs)(x.Fragment, { children: [/* @__PURE__ */ (0, x.jsx)(I, {
		title: "账户余额变化",
		meta: t ? `${t.label} → ${e.label}` : "保存至少两个不同月份后显示账户环比"
	}), /* @__PURE__ */ (0, x.jsx)("div", {
		className: "table-wrap spreadsheet-wrap",
		children: /* @__PURE__ */ (0, x.jsxs)("table", {
			className: "spreadsheet-table account-change-table",
			children: [/* @__PURE__ */ (0, x.jsx)("thead", { children: /* @__PURE__ */ (0, x.jsxs)("tr", { children: [
				/* @__PURE__ */ (0, x.jsx)("th", { children: "账户" }),
				/* @__PURE__ */ (0, x.jsx)("th", { children: "用途" }),
				/* @__PURE__ */ (0, x.jsx)("th", { children: "上次月报" }),
				/* @__PURE__ */ (0, x.jsx)("th", { children: "当前月报" }),
				/* @__PURE__ */ (0, x.jsx)("th", { children: "变化" }),
				/* @__PURE__ */ (0, x.jsx)("th", { children: "状态" })
			] }) }), /* @__PURE__ */ (0, x.jsxs)("tbody", { children: [!t && /* @__PURE__ */ (0, x.jsx)("tr", { children: /* @__PURE__ */ (0, x.jsx)("td", {
				className: "calculated-cell",
				colSpan: 6,
				children: "暂无上一个月份的月报。保存两个不同月份后，这里会显示每个账户的增减。"
			}) }), t && i.map((e) => /* @__PURE__ */ (0, x.jsxs)("tr", { children: [
				/* @__PURE__ */ (0, x.jsxs)("td", { children: [/* @__PURE__ */ (0, x.jsx)("strong", { children: e.name }), /* @__PURE__ */ (0, x.jsx)("span", {
					className: "table-subtext",
					children: e.type
				})] }),
				/* @__PURE__ */ (0, x.jsx)("td", { children: e.purpose || "未填写" }),
				/* @__PURE__ */ (0, x.jsx)("td", {
					className: "calculated-cell",
					children: D(e.previousBalance)
				}),
				/* @__PURE__ */ (0, x.jsx)("td", {
					className: "calculated-cell",
					children: D(e.currentBalance)
				}),
				/* @__PURE__ */ (0, x.jsx)("td", {
					className: Le(e.delta),
					children: Ie(e.delta)
				}),
				/* @__PURE__ */ (0, x.jsx)("td", { children: /* @__PURE__ */ (0, x.jsx)("span", {
					className: e.status === "持平" ? "pill" : "pill good",
					children: e.status
				}) })
			] }, e.id))] })]
		})
	})] });
}
function Qe({ accountTotal: e, addCashflowCustomItem: t, monthlyInflow: n, monthlyOutflow: r, rows: i }) {
	return /* @__PURE__ */ (0, x.jsxs)(x.Fragment, { children: [/* @__PURE__ */ (0, x.jsx)(I, {
		title: "现金流参数底表",
		meta: `月流入 ${D(n)} / 月流出 ${D(r)} / 期初现金 ${D(e)}`,
		action: /* @__PURE__ */ (0, x.jsx)("button", {
			className: "secondary-button",
			type: "button",
			onClick: t,
			children: "新增现金流"
		})
	}), /* @__PURE__ */ (0, x.jsx)("div", {
		className: "table-wrap spreadsheet-wrap",
		children: /* @__PURE__ */ (0, x.jsxs)("table", {
			className: "spreadsheet-table",
			children: [/* @__PURE__ */ (0, x.jsx)("thead", { children: /* @__PURE__ */ (0, x.jsxs)("tr", { children: [
				/* @__PURE__ */ (0, x.jsx)("th", { children: "项目" }),
				/* @__PURE__ */ (0, x.jsx)("th", { children: "数值" }),
				/* @__PURE__ */ (0, x.jsx)("th", { children: "口径" }),
				/* @__PURE__ */ (0, x.jsx)("th", { children: "操作" })
			] }) }), /* @__PURE__ */ (0, x.jsxs)("tbody", { children: [i.length === 0 && /* @__PURE__ */ (0, x.jsx)("tr", { children: /* @__PURE__ */ (0, x.jsx)("td", {
				className: "calculated-cell",
				colSpan: 4,
				children: "暂无现金流行，点击新增现金流开始录入。"
			}) }), i.map((e) => /* @__PURE__ */ (0, x.jsxs)("tr", { children: [
				/* @__PURE__ */ (0, x.jsx)("td", { children: e.onNameChange ? /* @__PURE__ */ (0, x.jsx)(Ge, {
					ariaLabel: `${e.name} 项目`,
					value: e.name,
					onChange: e.onNameChange
				}) : e.name }),
				/* @__PURE__ */ (0, x.jsx)("td", { children: e.readonlyAmount || !e.onAmountChange ? /* @__PURE__ */ (0, x.jsx)("span", {
					className: "calculated-cell",
					children: D(e.amount)
				}) : /* @__PURE__ */ (0, x.jsx)(F, {
					ariaLabel: `${e.name} 数值`,
					value: e.amount,
					onChange: e.onAmountChange
				}) }),
				/* @__PURE__ */ (0, x.jsx)("td", { children: e.onDirectionChange ? /* @__PURE__ */ (0, x.jsx)(qe, {
					ariaLabel: `${e.name} 口径`,
					options: ["现金流出", "计入预测"],
					value: e.direction === "inflow" ? "计入预测" : "现金流出",
					onChange: (t) => e.onDirectionChange?.(t === "计入预测" ? "inflow" : "outflow")
				}) : e.source }),
				/* @__PURE__ */ (0, x.jsx)("td", { children: e.onDelete ? /* @__PURE__ */ (0, x.jsx)("button", {
					className: "danger-button compact",
					type: "button",
					onClick: e.onDelete,
					children: "删除"
				}) : /* @__PURE__ */ (0, x.jsx)("span", {
					className: "calculated-cell",
					children: "自动同步"
				}) })
			] }, e.id))] })]
		})
	})] });
}
function $e({ accounts: e, total: t, liquidAccountTotal: n, updateAccount: r, addAccount: i, deleteAccount: a, reorderAccount: o }) {
	let [s, c] = (0, b.useState)(null);
	return /* @__PURE__ */ (0, x.jsxs)(x.Fragment, { children: [/* @__PURE__ */ (0, x.jsx)(I, {
		title: "账户底表",
		meta: `${e.length} 个账户 / 合计 ${D(t)} / 可动用 ${D(n)}`,
		action: /* @__PURE__ */ (0, x.jsx)("button", {
			className: "secondary-button",
			type: "button",
			onClick: i,
			children: "新增账户"
		})
	}), /* @__PURE__ */ (0, x.jsx)("div", {
		className: "table-wrap spreadsheet-wrap",
		children: /* @__PURE__ */ (0, x.jsxs)("table", {
			className: "spreadsheet-table",
			children: [/* @__PURE__ */ (0, x.jsx)("thead", { children: /* @__PURE__ */ (0, x.jsxs)("tr", { children: [
				/* @__PURE__ */ (0, x.jsx)("th", {
					className: "drag-column",
					children: "排序"
				}),
				/* @__PURE__ */ (0, x.jsx)("th", { children: "账户名称" }),
				/* @__PURE__ */ (0, x.jsx)("th", { children: "类型" }),
				/* @__PURE__ */ (0, x.jsx)("th", { children: "余额" }),
				/* @__PURE__ */ (0, x.jsx)("th", { children: "用途" }),
				/* @__PURE__ */ (0, x.jsx)("th", { children: "可动用" }),
				/* @__PURE__ */ (0, x.jsx)("th", { children: "操作" })
			] }) }), /* @__PURE__ */ (0, x.jsx)("tbody", { children: e.map((t, n) => /* @__PURE__ */ (0, x.jsxs)("tr", {
				className: s === t.id ? "dragging" : "",
				onDragOver: (e) => e.preventDefault(),
				onDrop: (e) => {
					e.preventDefault(), s && o(s, t.id), c(null);
				},
				onMouseEnter: () => {
					s && s !== t.id && o(s, t.id);
				},
				onMouseUp: () => c(null),
				children: [
					/* @__PURE__ */ (0, x.jsx)("td", {
						className: "drag-column",
						children: /* @__PURE__ */ (0, x.jsx)("span", {
							"aria-label": `${t.name} 拖动排序`,
							className: "drag-handle",
							draggable: !0,
							role: "button",
							tabIndex: 0,
							title: "拖动排序",
							onDragEnd: () => c(null),
							onDragStart: (e) => {
								c(t.id), e.dataTransfer.effectAllowed = "move", e.dataTransfer.setData("text/plain", t.id);
							},
							onKeyDown: (r) => {
								r.key === "ArrowUp" && n > 0 && (r.preventDefault(), o(t.id, e[n - 1].id)), r.key === "ArrowDown" && n < e.length - 1 && (r.preventDefault(), o(t.id, e[n + 1].id));
							},
							onMouseDown: () => c(t.id),
							children: "⋮⋮"
						})
					}),
					/* @__PURE__ */ (0, x.jsx)("td", { children: /* @__PURE__ */ (0, x.jsx)(Ge, {
						ariaLabel: `${t.name} 账户名称`,
						value: t.name,
						onChange: (e) => r(t.id, { name: e })
					}) }),
					/* @__PURE__ */ (0, x.jsx)("td", { children: /* @__PURE__ */ (0, x.jsx)(Ge, {
						ariaLabel: `${t.name} 类型`,
						value: t.type,
						onChange: (e) => r(t.id, { type: e })
					}) }),
					/* @__PURE__ */ (0, x.jsx)("td", { children: /* @__PURE__ */ (0, x.jsx)(F, {
						ariaLabel: `${t.name} 余额`,
						value: t.balance,
						onChange: (e) => r(t.id, { balance: e })
					}) }),
					/* @__PURE__ */ (0, x.jsx)("td", { children: /* @__PURE__ */ (0, x.jsx)(Ge, {
						ariaLabel: `${t.name} 用途`,
						value: t.purpose,
						onChange: (e) => r(t.id, { purpose: e })
					}) }),
					/* @__PURE__ */ (0, x.jsx)("td", { children: /* @__PURE__ */ (0, x.jsx)(Je, {
						ariaLabel: `${t.name} 可动用`,
						checked: t.liquid,
						onChange: (e) => r(t.id, { liquid: e })
					}) }),
					/* @__PURE__ */ (0, x.jsx)("td", { children: /* @__PURE__ */ (0, x.jsx)("button", {
						className: "danger-button compact",
						disabled: e.length <= 1,
						type: "button",
						onClick: () => a(t.id),
						children: "删除"
					}) })
				]
			}, t.id)) })]
		})
	})] });
}
function et({ holdings: e, fxUsd: t, fxHkd: n, updateHolding: r, addHolding: i, deleteHolding: a }) {
	let o = e.reduce((e, r) => e + He(r.value, r.currency, t, n), 0);
	return /* @__PURE__ */ (0, x.jsxs)(x.Fragment, { children: [/* @__PURE__ */ (0, x.jsx)(I, {
		title: "投资持仓底表",
		meta: `持仓 ${e.length} 项 / 市值 ${D(o)}`,
		action: /* @__PURE__ */ (0, x.jsx)("button", {
			className: "secondary-button",
			type: "button",
			onClick: i,
			children: "新增持仓"
		})
	}), /* @__PURE__ */ (0, x.jsx)("div", {
		className: "table-wrap spreadsheet-wrap",
		children: /* @__PURE__ */ (0, x.jsxs)("table", {
			className: "spreadsheet-table",
			children: [/* @__PURE__ */ (0, x.jsx)("thead", { children: /* @__PURE__ */ (0, x.jsxs)("tr", { children: [
				/* @__PURE__ */ (0, x.jsx)("th", { children: "名称" }),
				/* @__PURE__ */ (0, x.jsx)("th", { children: "市场" }),
				/* @__PURE__ */ (0, x.jsx)("th", { children: "币种" }),
				/* @__PURE__ */ (0, x.jsx)("th", { children: "成本" }),
				/* @__PURE__ */ (0, x.jsx)("th", { children: "当前市值" }),
				/* @__PURE__ */ (0, x.jsx)("th", { children: "折人民币" }),
				/* @__PURE__ */ (0, x.jsx)("th", { children: "盈亏" }),
				/* @__PURE__ */ (0, x.jsx)("th", { children: "操作" })
			] }) }), /* @__PURE__ */ (0, x.jsx)("tbody", { children: e.map((i) => {
				let o = He(i.value, i.currency, t, n), s = He(i.cost, i.currency, t, n);
				return /* @__PURE__ */ (0, x.jsxs)("tr", { children: [
					/* @__PURE__ */ (0, x.jsx)("td", { children: /* @__PURE__ */ (0, x.jsx)(Ge, {
						ariaLabel: `${i.name} 名称`,
						value: i.name,
						onChange: (e) => r(i.id, { name: e })
					}) }),
					/* @__PURE__ */ (0, x.jsx)("td", { children: /* @__PURE__ */ (0, x.jsx)(qe, {
						ariaLabel: `${i.name} 市场`,
						options: [
							"A股",
							"美股",
							"港股"
						],
						value: i.market,
						onChange: (e) => r(i.id, { market: e })
					}) }),
					/* @__PURE__ */ (0, x.jsx)("td", { children: /* @__PURE__ */ (0, x.jsx)(qe, {
						ariaLabel: `${i.name} 币种`,
						options: [
							"CNY",
							"USD",
							"HKD"
						],
						value: i.currency,
						onChange: (e) => r(i.id, { currency: e })
					}) }),
					/* @__PURE__ */ (0, x.jsx)("td", { children: /* @__PURE__ */ (0, x.jsx)(F, {
						ariaLabel: `${i.name} 成本`,
						value: i.cost,
						onChange: (e) => r(i.id, { cost: e })
					}) }),
					/* @__PURE__ */ (0, x.jsx)("td", { children: /* @__PURE__ */ (0, x.jsx)(F, {
						ariaLabel: `${i.name} 当前市值`,
						value: i.value,
						onChange: (e) => r(i.id, { value: e })
					}) }),
					/* @__PURE__ */ (0, x.jsx)("td", {
						className: "calculated-cell",
						children: D(o)
					}),
					/* @__PURE__ */ (0, x.jsx)("td", {
						className: o >= s ? "positive" : "negative",
						children: D(o - s)
					}),
					/* @__PURE__ */ (0, x.jsx)("td", { children: /* @__PURE__ */ (0, x.jsx)("button", {
						className: "danger-button compact",
						disabled: e.length <= 1,
						type: "button",
						onClick: () => a(i.id),
						children: "删除"
					}) })
				] }, i.id);
			}) })]
		})
	})] });
}
function tt({ balanceAssets: e, totalAssets: t, updateBalanceAsset: n, addBalanceAsset: r, deleteBalanceAsset: i }) {
	let a = e.reduce((e, t) => e + t.amount, 0);
	return /* @__PURE__ */ (0, x.jsxs)(x.Fragment, { children: [/* @__PURE__ */ (0, x.jsx)(I, {
		title: "资产底表",
		meta: `${e.length} 项 / 补录资产 ${D(a)} / 总资产 ${D(t)}`,
		action: /* @__PURE__ */ (0, x.jsx)("button", {
			className: "secondary-button",
			type: "button",
			onClick: r,
			children: "新增资产"
		})
	}), /* @__PURE__ */ (0, x.jsx)("div", {
		className: "table-wrap spreadsheet-wrap",
		children: /* @__PURE__ */ (0, x.jsxs)("table", {
			className: "spreadsheet-table",
			children: [/* @__PURE__ */ (0, x.jsx)("thead", { children: /* @__PURE__ */ (0, x.jsxs)("tr", { children: [
				/* @__PURE__ */ (0, x.jsx)("th", { children: "资产项" }),
				/* @__PURE__ */ (0, x.jsx)("th", { children: "金额" }),
				/* @__PURE__ */ (0, x.jsx)("th", { children: "说明" }),
				/* @__PURE__ */ (0, x.jsx)("th", { children: "占总资产" }),
				/* @__PURE__ */ (0, x.jsx)("th", { children: "操作" })
			] }) }), /* @__PURE__ */ (0, x.jsx)("tbody", { children: e.map((r) => /* @__PURE__ */ (0, x.jsxs)("tr", { children: [
				/* @__PURE__ */ (0, x.jsx)("td", { children: /* @__PURE__ */ (0, x.jsx)(Ge, {
					ariaLabel: `${r.name} 资产项`,
					value: r.name,
					onChange: (e) => n(r.id, { name: e })
				}) }),
				/* @__PURE__ */ (0, x.jsx)("td", { children: /* @__PURE__ */ (0, x.jsx)(F, {
					ariaLabel: `${r.name} 资产金额`,
					value: r.amount,
					onChange: (e) => n(r.id, { amount: e })
				}) }),
				/* @__PURE__ */ (0, x.jsx)("td", { children: /* @__PURE__ */ (0, x.jsx)(Ge, {
					ariaLabel: `${r.name} 资产说明`,
					value: r.note,
					onChange: (e) => n(r.id, { note: e })
				}) }),
				/* @__PURE__ */ (0, x.jsx)("td", {
					className: "calculated-cell",
					children: k(t ? r.amount / t : 0)
				}),
				/* @__PURE__ */ (0, x.jsx)("td", { children: /* @__PURE__ */ (0, x.jsx)("button", {
					className: "danger-button compact",
					disabled: e.length <= 1,
					type: "button",
					onClick: () => i(r.id),
					children: "删除"
				}) })
			] }, r.id)) })]
		})
	})] });
}
function nt({ liabilities: e, updateLiability: t, addLiability: n, deleteLiability: r }) {
	let i = e.reduce((e, t) => e + t.amount, 0);
	return /* @__PURE__ */ (0, x.jsxs)(x.Fragment, { children: [/* @__PURE__ */ (0, x.jsx)(I, {
		title: "负债底表",
		meta: `${e.length} 项 / 总负债 ${D(i)}`,
		action: /* @__PURE__ */ (0, x.jsx)("button", {
			className: "secondary-button",
			type: "button",
			onClick: n,
			children: "新增负债"
		})
	}), /* @__PURE__ */ (0, x.jsx)("div", {
		className: "table-wrap spreadsheet-wrap",
		children: /* @__PURE__ */ (0, x.jsxs)("table", {
			className: "spreadsheet-table",
			children: [/* @__PURE__ */ (0, x.jsx)("thead", { children: /* @__PURE__ */ (0, x.jsxs)("tr", { children: [
				/* @__PURE__ */ (0, x.jsx)("th", { children: "负债项" }),
				/* @__PURE__ */ (0, x.jsx)("th", { children: "金额" }),
				/* @__PURE__ */ (0, x.jsx)("th", { children: "占比" }),
				/* @__PURE__ */ (0, x.jsx)("th", { children: "操作" })
			] }) }), /* @__PURE__ */ (0, x.jsx)("tbody", { children: e.map((n) => /* @__PURE__ */ (0, x.jsxs)("tr", { children: [
				/* @__PURE__ */ (0, x.jsx)("td", { children: /* @__PURE__ */ (0, x.jsx)(Ge, {
					ariaLabel: `${n.name} 负债项`,
					value: n.name,
					onChange: (e) => t(n.id, { name: e })
				}) }),
				/* @__PURE__ */ (0, x.jsx)("td", { children: /* @__PURE__ */ (0, x.jsx)(F, {
					ariaLabel: `${n.name} 金额`,
					value: n.amount,
					onChange: (e) => t(n.id, { amount: e })
				}) }),
				/* @__PURE__ */ (0, x.jsx)("td", {
					className: "calculated-cell",
					children: k(i ? n.amount / i : 0)
				}),
				/* @__PURE__ */ (0, x.jsx)("td", { children: /* @__PURE__ */ (0, x.jsx)("button", {
					className: "danger-button compact",
					disabled: e.length <= 1,
					type: "button",
					onClick: () => r(n.id),
					children: "删除"
				}) })
			] }, n.id)) })]
		})
	})] });
}
function rt({ emergencyFund: e, setEmergencyFund: t, emergencyMonths: n, setEmergencyMonths: r, emergencyMonthlyNeed: i, setEmergencyMonthlyNeed: a }) {
	let o = i * n;
	return /* @__PURE__ */ (0, x.jsxs)(x.Fragment, { children: [/* @__PURE__ */ (0, x.jsx)(I, {
		title: "应急金底表",
		meta: `目标 ${D(o)} / 当前 ${D(e)}`
	}), /* @__PURE__ */ (0, x.jsx)("div", {
		className: "table-wrap spreadsheet-wrap",
		children: /* @__PURE__ */ (0, x.jsxs)("table", {
			className: "spreadsheet-table",
			children: [/* @__PURE__ */ (0, x.jsx)("thead", { children: /* @__PURE__ */ (0, x.jsxs)("tr", { children: [
				/* @__PURE__ */ (0, x.jsx)("th", { children: "项目" }),
				/* @__PURE__ */ (0, x.jsx)("th", { children: "数值" }),
				/* @__PURE__ */ (0, x.jsx)("th", { children: "结果" })
			] }) }), /* @__PURE__ */ (0, x.jsxs)("tbody", { children: [
				/* @__PURE__ */ (0, x.jsxs)("tr", { children: [
					/* @__PURE__ */ (0, x.jsx)("td", { children: "当前应急金" }),
					/* @__PURE__ */ (0, x.jsx)("td", { children: /* @__PURE__ */ (0, x.jsx)(F, {
						ariaLabel: "当前应急金",
						value: e,
						onChange: t
					}) }),
					/* @__PURE__ */ (0, x.jsxs)("td", {
						className: "calculated-cell",
						children: [
							"覆盖 ",
							i ? (e / i).toFixed(1) : "0.0",
							" 月"
						]
					})
				] }),
				/* @__PURE__ */ (0, x.jsxs)("tr", { children: [
					/* @__PURE__ */ (0, x.jsx)("td", { children: "目标覆盖月数" }),
					/* @__PURE__ */ (0, x.jsx)("td", { children: /* @__PURE__ */ (0, x.jsx)(F, {
						ariaLabel: "目标覆盖月数",
						step: 1,
						value: n,
						onChange: r
					}) }),
					/* @__PURE__ */ (0, x.jsxs)("td", {
						className: "calculated-cell",
						children: [n, " 个月"]
					})
				] }),
				/* @__PURE__ */ (0, x.jsxs)("tr", { children: [
					/* @__PURE__ */ (0, x.jsx)("td", { children: "月均必要支出" }),
					/* @__PURE__ */ (0, x.jsx)("td", { children: /* @__PURE__ */ (0, x.jsx)(F, {
						ariaLabel: "月均必要支出",
						value: i,
						onChange: a
					}) }),
					/* @__PURE__ */ (0, x.jsxs)("td", {
						className: "calculated-cell",
						children: ["缺口 ", D(Math.max(0, o - e))]
					})
				] })
			] })]
		})
	})] });
}
function it({ reminders: e, updateReminder: t, addReminder: n, deleteReminder: r }) {
	let i = e.reduce((e, t) => e + t.amount, 0);
	return /* @__PURE__ */ (0, x.jsxs)(x.Fragment, { children: [/* @__PURE__ */ (0, x.jsx)(I, {
		title: "提醒底表",
		meta: `${e.length} 条 / 金额 ${D(i)}`,
		action: /* @__PURE__ */ (0, x.jsx)("button", {
			className: "secondary-button",
			type: "button",
			onClick: n,
			children: "新增提醒"
		})
	}), /* @__PURE__ */ (0, x.jsx)("div", {
		className: "table-wrap spreadsheet-wrap",
		children: /* @__PURE__ */ (0, x.jsxs)("table", {
			className: "spreadsheet-table",
			children: [/* @__PURE__ */ (0, x.jsx)("thead", { children: /* @__PURE__ */ (0, x.jsxs)("tr", { children: [
				/* @__PURE__ */ (0, x.jsx)("th", { children: "事项" }),
				/* @__PURE__ */ (0, x.jsx)("th", { children: "日期" }),
				/* @__PURE__ */ (0, x.jsx)("th", { children: "金额" }),
				/* @__PURE__ */ (0, x.jsx)("th", { children: "类型" }),
				/* @__PURE__ */ (0, x.jsx)("th", { children: "距离" }),
				/* @__PURE__ */ (0, x.jsx)("th", { children: "操作" })
			] }) }), /* @__PURE__ */ (0, x.jsx)("tbody", { children: e.map((n) => /* @__PURE__ */ (0, x.jsxs)("tr", { children: [
				/* @__PURE__ */ (0, x.jsx)("td", { children: /* @__PURE__ */ (0, x.jsx)(Ge, {
					ariaLabel: `${n.name} 事项`,
					value: n.name,
					onChange: (e) => t(n.id, { name: e })
				}) }),
				/* @__PURE__ */ (0, x.jsx)("td", { children: /* @__PURE__ */ (0, x.jsx)(Ke, {
					ariaLabel: `${n.name} 日期`,
					value: n.date,
					onChange: (e) => t(n.id, { date: e })
				}) }),
				/* @__PURE__ */ (0, x.jsx)("td", { children: /* @__PURE__ */ (0, x.jsx)(F, {
					ariaLabel: `${n.name} 金额`,
					value: n.amount,
					onChange: (e) => t(n.id, { amount: e })
				}) }),
				/* @__PURE__ */ (0, x.jsx)("td", { children: /* @__PURE__ */ (0, x.jsx)(Ge, {
					ariaLabel: `${n.name} 类型`,
					value: n.kind,
					onChange: (e) => t(n.id, { kind: e })
				}) }),
				/* @__PURE__ */ (0, x.jsxs)("td", {
					className: "calculated-cell",
					children: [Math.max(0, Pe(n.date)), " 天"]
				}),
				/* @__PURE__ */ (0, x.jsx)("td", { children: /* @__PURE__ */ (0, x.jsx)("button", {
					className: "danger-button compact",
					disabled: e.length <= 1,
					type: "button",
					onClick: () => r(n.id),
					children: "删除"
				}) })
			] }, n.id)) })]
		})
	})] });
}
function at({ goals: e, updateGoal: t, addGoal: n, deleteGoal: r }) {
	let i = e.reduce((e, t) => e + t.target, 0), a = e.reduce((e, t) => e + t.current, 0), o = e.reduce((e, t) => e + t.actualMonthly, 0);
	return /* @__PURE__ */ (0, x.jsxs)(x.Fragment, { children: [/* @__PURE__ */ (0, x.jsx)(I, {
		title: "目标底表",
		meta: `当前 ${D(a)} / 目标 ${D(i)} / 本月实际投入 ${D(o)}`,
		action: /* @__PURE__ */ (0, x.jsx)("button", {
			className: "secondary-button",
			type: "button",
			onClick: n,
			children: "新增目标"
		})
	}), /* @__PURE__ */ (0, x.jsx)("div", {
		className: "table-wrap spreadsheet-wrap",
		children: /* @__PURE__ */ (0, x.jsxs)("table", {
			className: "spreadsheet-table",
			children: [/* @__PURE__ */ (0, x.jsx)("thead", { children: /* @__PURE__ */ (0, x.jsxs)("tr", { children: [
				/* @__PURE__ */ (0, x.jsx)("th", { children: "目标" }),
				/* @__PURE__ */ (0, x.jsx)("th", { children: "目标金额" }),
				/* @__PURE__ */ (0, x.jsx)("th", { children: "当前金额" }),
				/* @__PURE__ */ (0, x.jsx)("th", { children: "每月预期准备" }),
				/* @__PURE__ */ (0, x.jsx)("th", { children: "本月实际投入" }),
				/* @__PURE__ */ (0, x.jsx)("th", { children: "进度" }),
				/* @__PURE__ */ (0, x.jsx)("th", { children: "操作" })
			] }) }), /* @__PURE__ */ (0, x.jsx)("tbody", { children: e.map((n) => /* @__PURE__ */ (0, x.jsxs)("tr", { children: [
				/* @__PURE__ */ (0, x.jsx)("td", { children: /* @__PURE__ */ (0, x.jsx)(Ge, {
					ariaLabel: `${n.name} 名称`,
					value: n.name,
					onChange: (e) => t(n.id, { name: e })
				}) }),
				/* @__PURE__ */ (0, x.jsx)("td", { children: /* @__PURE__ */ (0, x.jsx)(F, {
					ariaLabel: `${n.name} 目标金额`,
					value: n.target,
					onChange: (e) => t(n.id, { target: e })
				}) }),
				/* @__PURE__ */ (0, x.jsx)("td", { children: /* @__PURE__ */ (0, x.jsx)(F, {
					ariaLabel: `${n.name} 当前金额`,
					value: n.current,
					onChange: (e) => t(n.id, { current: e })
				}) }),
				/* @__PURE__ */ (0, x.jsx)("td", { children: /* @__PURE__ */ (0, x.jsx)(F, {
					ariaLabel: `${n.name} 每月预期准备`,
					value: n.monthly,
					onChange: (e) => t(n.id, { monthly: e })
				}) }),
				/* @__PURE__ */ (0, x.jsx)("td", { children: /* @__PURE__ */ (0, x.jsx)(F, {
					ariaLabel: `${n.name} 本月实际投入`,
					value: n.actualMonthly,
					onChange: (e) => t(n.id, { actualMonthly: e })
				}) }),
				/* @__PURE__ */ (0, x.jsx)("td", {
					className: "calculated-cell",
					children: k(n.target ? n.current / n.target : 0)
				}),
				/* @__PURE__ */ (0, x.jsx)("td", { children: /* @__PURE__ */ (0, x.jsx)("button", {
					className: "danger-button compact",
					disabled: e.length <= 1,
					type: "button",
					onClick: () => r(n.id),
					children: "删除"
				}) })
			] }, n.id)) })]
		})
	})] });
}
function ot({ rows: e, income: t, spending: n, allocation: r, surplus: i }) {
	return /* @__PURE__ */ (0, x.jsxs)(x.Fragment, { children: [/* @__PURE__ */ (0, x.jsx)(I, {
		title: "报表自动同步表",
		meta: `收入 ${D(t)} / 支出 ${D(n)} / 分配 ${D(r)} / 余额 ${D(i)}`
	}), /* @__PURE__ */ (0, x.jsx)("div", {
		className: "table-wrap spreadsheet-wrap",
		children: /* @__PURE__ */ (0, x.jsxs)("table", {
			className: "spreadsheet-table",
			children: [/* @__PURE__ */ (0, x.jsx)("thead", { children: /* @__PURE__ */ (0, x.jsxs)("tr", { children: [
				/* @__PURE__ */ (0, x.jsx)("th", { children: "项目" }),
				/* @__PURE__ */ (0, x.jsx)("th", { children: "数值" }),
				/* @__PURE__ */ (0, x.jsx)("th", { children: "流向" }),
				/* @__PURE__ */ (0, x.jsx)("th", { children: "来源" })
			] }) }), /* @__PURE__ */ (0, x.jsx)("tbody", { children: e.map((e) => /* @__PURE__ */ (0, x.jsxs)("tr", { children: [
				/* @__PURE__ */ (0, x.jsx)("td", { children: e.name }),
				/* @__PURE__ */ (0, x.jsx)("td", { children: /* @__PURE__ */ (0, x.jsx)("span", {
					className: `calculated-cell ${e.amount < 0 ? "negative" : ""}`.trim(),
					children: D(e.amount)
				}) }),
				/* @__PURE__ */ (0, x.jsx)("td", { children: e.flow }),
				/* @__PURE__ */ (0, x.jsx)("td", { children: e.source })
			] }, e.id)) })]
		})
	})] });
}
function st({ emergencyMonths: e, setEmergencyMonths: t, emergencyMonthlyNeed: n, setEmergencyMonthlyNeed: r, liabilities: i, updateLiability: a, addLiability: o, deleteLiability: s }) {
	return /* @__PURE__ */ (0, x.jsxs)(x.Fragment, { children: [/* @__PURE__ */ (0, x.jsx)(I, {
		title: "健康评分输入底表",
		meta: `目标覆盖 ${e} 月 / 负债 ${D(i.reduce((e, t) => e + t.amount, 0))}`,
		action: /* @__PURE__ */ (0, x.jsx)("button", {
			className: "secondary-button",
			type: "button",
			onClick: o,
			children: "新增负债"
		})
	}), /* @__PURE__ */ (0, x.jsx)("div", {
		className: "table-wrap spreadsheet-wrap",
		children: /* @__PURE__ */ (0, x.jsxs)("table", {
			className: "spreadsheet-table",
			children: [/* @__PURE__ */ (0, x.jsx)("thead", { children: /* @__PURE__ */ (0, x.jsxs)("tr", { children: [
				/* @__PURE__ */ (0, x.jsx)("th", { children: "项目" }),
				/* @__PURE__ */ (0, x.jsx)("th", { children: "数值" }),
				/* @__PURE__ */ (0, x.jsx)("th", { children: "影响" }),
				/* @__PURE__ */ (0, x.jsx)("th", { children: "操作" })
			] }) }), /* @__PURE__ */ (0, x.jsxs)("tbody", { children: [
				/* @__PURE__ */ (0, x.jsxs)("tr", { children: [
					/* @__PURE__ */ (0, x.jsx)("td", { children: "目标覆盖月数" }),
					/* @__PURE__ */ (0, x.jsx)("td", { children: /* @__PURE__ */ (0, x.jsx)(F, {
						ariaLabel: "健康目标覆盖月数",
						step: 1,
						value: e,
						onChange: t
					}) }),
					/* @__PURE__ */ (0, x.jsx)("td", { children: "抗风险能力" }),
					/* @__PURE__ */ (0, x.jsx)("td", {
						className: "calculated-cell",
						children: "固定项"
					})
				] }),
				/* @__PURE__ */ (0, x.jsxs)("tr", { children: [
					/* @__PURE__ */ (0, x.jsx)("td", { children: "月均必要支出" }),
					/* @__PURE__ */ (0, x.jsx)("td", { children: /* @__PURE__ */ (0, x.jsx)(F, {
						ariaLabel: "健康月均必要支出",
						value: n,
						onChange: r
					}) }),
					/* @__PURE__ */ (0, x.jsx)("td", { children: "应急覆盖" }),
					/* @__PURE__ */ (0, x.jsx)("td", {
						className: "calculated-cell",
						children: "固定项"
					})
				] }),
				i.map((e) => /* @__PURE__ */ (0, x.jsxs)("tr", { children: [
					/* @__PURE__ */ (0, x.jsx)("td", { children: /* @__PURE__ */ (0, x.jsx)(Ge, {
						ariaLabel: `健康 ${e.name} 负债项`,
						value: e.name,
						onChange: (t) => a(e.id, { name: t })
					}) }),
					/* @__PURE__ */ (0, x.jsx)("td", { children: /* @__PURE__ */ (0, x.jsx)(F, {
						ariaLabel: `健康 ${e.name} 金额`,
						value: e.amount,
						onChange: (t) => a(e.id, { amount: t })
					}) }),
					/* @__PURE__ */ (0, x.jsx)("td", { children: "负债率" }),
					/* @__PURE__ */ (0, x.jsx)("td", { children: /* @__PURE__ */ (0, x.jsx)("button", {
						className: "danger-button compact",
						disabled: i.length <= 1,
						type: "button",
						onClick: () => s(e.id),
						children: "删除"
					}) })
				] }, e.id))
			] })]
		})
	})] });
}
function ct({ capabilities: e, updateCapability: t }) {
	return /* @__PURE__ */ (0, x.jsxs)(x.Fragment, { children: [/* @__PURE__ */ (0, x.jsx)(I, {
		title: "数据能力底表",
		meta: `平均成熟度 ${(e.reduce((e, t) => e + t.score, 0) / Math.max(e.length, 1)).toFixed(0)} 分`
	}), /* @__PURE__ */ (0, x.jsx)("div", {
		className: "table-wrap spreadsheet-wrap",
		children: /* @__PURE__ */ (0, x.jsxs)("table", {
			className: "spreadsheet-table",
			children: [/* @__PURE__ */ (0, x.jsx)("thead", { children: /* @__PURE__ */ (0, x.jsxs)("tr", { children: [
				/* @__PURE__ */ (0, x.jsx)("th", { children: "能力" }),
				/* @__PURE__ */ (0, x.jsx)("th", { children: "成熟度" }),
				/* @__PURE__ */ (0, x.jsx)("th", { children: "状态" })
			] }) }), /* @__PURE__ */ (0, x.jsx)("tbody", { children: e.map((e) => /* @__PURE__ */ (0, x.jsxs)("tr", { children: [
				/* @__PURE__ */ (0, x.jsx)("td", { children: /* @__PURE__ */ (0, x.jsx)(Ge, {
					ariaLabel: `${e.name} 名称`,
					value: e.name,
					onChange: (n) => t(e.id, { name: n })
				}) }),
				/* @__PURE__ */ (0, x.jsx)("td", { children: /* @__PURE__ */ (0, x.jsx)(F, {
					ariaLabel: `${e.name} 成熟度`,
					max: 100,
					step: 1,
					value: e.score,
					onChange: (n) => t(e.id, { score: O(n) })
				}) }),
				/* @__PURE__ */ (0, x.jsx)("td", { children: /* @__PURE__ */ (0, x.jsx)("span", {
					className: e.score >= 70 ? "pill good" : e.score >= 40 ? "pill warn" : "pill",
					children: e.score >= 70 ? "可用" : e.score >= 40 ? "建设中" : "待补齐"
				}) })
			] }, e.id)) })]
		})
	})] });
}
function L({ data: e, centerLabel: t, centerValue: n }) {
	let r = e.filter((e) => e.value > 0), i = r.reduce((e, t) => e + t.value, 0), a = r.map((e) => i ? e.value / i * 100 : 0), o = a.map((e, t) => a.slice(0, t).reduce((e, t) => e + t, 0)), s = r.map((e, t) => {
		let n = a[t] ?? 0, r = o[t] ?? 0, i = ((r + n / 2) / 100 * 360 - 90) * (Math.PI / 180), s = Math.cos(i), c = Math.sin(i), l = s >= 0 ? "right" : "left";
		return {
			...e,
			color: e.color ?? S[t % S.length],
			share: n,
			start: r,
			anchorX: 110 + s * 36.5,
			anchorY: 66 + c * 36.5,
			elbowX: 110 + s * 45,
			elbowY: 66 + c * 45,
			labelX: l === "right" ? 174 : 46,
			lineEndX: l === "right" ? 164 : 56,
			side: l,
			y: O(66 + c * 53, 18, 114)
		};
	}), c = (e) => {
		let t = [...e].sort((e, t) => e.y - t.y), n = 18, r = t.map((e) => {
			let t = Math.max(e.y, n);
			return n = t + 17, {
				...e,
				y: t
			};
		}), i = (r.at(-1)?.y ?? 114) - 114;
		for (let e = r.length - 1; e >= 0 && i > 0; --e) {
			let t = e === 0 ? 18 : r[e - 1].y + 17, n = Math.min(i, r[e].y - t);
			r[e].y -= n, i -= n;
		}
		return r;
	}, l = [...c(s.filter((e) => e.share >= 5 && e.side === "left")), ...c(s.filter((e) => e.share >= 5 && e.side === "right"))], u = r.length ? s.map((e) => ({
		...e,
		detail: e.detail?.includes("%") ? e.detail : `${k(e.value / Math.max(i, 1))} / ${D(e.value)}${e.detail ? ` / ${e.detail}` : ""}`
	})) : [{
		label: "暂无数据",
		value: 1,
		color: "#b8c4d4",
		detail: "0%"
	}];
	return /* @__PURE__ */ (0, x.jsxs)("div", {
		className: "donut-layout",
		children: [/* @__PURE__ */ (0, x.jsxs)("svg", {
			className: "donut-chart",
			viewBox: "0 0 220 132",
			role: "img",
			"aria-label": `${t} ${n}`,
			children: [
				/* @__PURE__ */ (0, x.jsx)("circle", {
					cx: 110,
					cy: 66,
					r: 31,
					fill: "none",
					stroke: "#e5edf5",
					strokeWidth: 11
				}),
				i > 0 && s.map((e) => /* @__PURE__ */ (0, x.jsx)("circle", {
					cx: 110,
					cy: 66,
					fill: "none",
					pathLength: 100,
					r: 31,
					stroke: e.color,
					strokeDasharray: `${e.share} ${100 - e.share}`,
					strokeDashoffset: -e.start,
					strokeLinecap: "butt",
					strokeWidth: 11,
					transform: "rotate(-90 110 66)"
				}, e.label)),
				l.map((e) => /* @__PURE__ */ (0, x.jsxs)("g", {
					className: "donut-annotation",
					children: [
						/* @__PURE__ */ (0, x.jsx)("polyline", { points: `${e.anchorX},${e.anchorY} ${e.elbowX},${e.elbowY} ${e.lineEndX},${e.y}` }),
						/* @__PURE__ */ (0, x.jsx)("title", { children: `${e.label} ${k(e.value / Math.max(i, 1))}` }),
						/* @__PURE__ */ (0, x.jsxs)("text", {
							textAnchor: e.side === "right" ? "start" : "end",
							x: e.labelX,
							y: e.y + 2,
							children: [/* @__PURE__ */ (0, x.jsx)("tspan", {
								className: "donut-annotation-label",
								x: e.labelX,
								y: e.y - 2,
								children: e.label
							}), /* @__PURE__ */ (0, x.jsx)("tspan", {
								className: "donut-annotation-percent",
								x: e.labelX,
								y: e.y + 7,
								children: `${Math.round(e.share)}%`
							})]
						})
					]
				}, `${e.label}-${e.share}`)),
				/* @__PURE__ */ (0, x.jsx)("text", {
					className: "donut-value",
					x: 110,
					y: 62,
					children: n
				}),
				/* @__PURE__ */ (0, x.jsx)("text", {
					className: "donut-label",
					x: 110,
					y: 76,
					children: t
				})
			]
		}), /* @__PURE__ */ (0, x.jsx)(lt, {
			data: u,
			valueFormatter: D
		})]
	});
}
function lt({ data: e, valueFormatter: t }) {
	return /* @__PURE__ */ (0, x.jsx)("div", {
		className: "legend",
		children: e.map((e, n) => /* @__PURE__ */ (0, x.jsxs)("div", {
			className: "legend-item",
			children: [/* @__PURE__ */ (0, x.jsx)("span", {
				className: "legend-dot",
				style: { backgroundColor: e.color ?? S[n % S.length] }
			}), /* @__PURE__ */ (0, x.jsxs)("div", {
				className: "legend-copy",
				children: [/* @__PURE__ */ (0, x.jsx)("strong", { children: e.label }), /* @__PURE__ */ (0, x.jsx)("em", { children: e.detail ?? t(e.value) })]
			})]
		}, e.label))
	});
}
function ut({ data: e, valueFormatter: t, percentMode: n = !1 }) {
	let r = Math.max(...e.map((e) => e.max ?? e.value), n ? 100 : 1);
	return /* @__PURE__ */ (0, x.jsx)("div", {
		className: "horizontal-bars",
		children: e.map((e, n) => {
			let i = e.max ?? r, a = O(e.value / Math.max(i, 1) * 100);
			return /* @__PURE__ */ (0, x.jsxs)("div", {
				className: "bar-row",
				children: [/* @__PURE__ */ (0, x.jsxs)("div", {
					className: "bar-meta",
					children: [/* @__PURE__ */ (0, x.jsx)("span", { children: e.label }), /* @__PURE__ */ (0, x.jsx)("strong", { children: e.detail ?? t(e.value) })]
				}), /* @__PURE__ */ (0, x.jsx)("div", {
					className: "bar-track",
					"aria-label": `${e.label} ${t(e.value)}`,
					children: /* @__PURE__ */ (0, x.jsx)("span", {
						className: "bar-fill",
						style: {
							width: `${a}%`,
							backgroundColor: e.color ?? S[n % S.length]
						}
					})
				})]
			}, e.label);
		})
	});
}
function dt({ data: e, valueFormatter: t }) {
	let n = Math.max(...e.map((e) => e.value), 1);
	return /* @__PURE__ */ (0, x.jsx)("div", {
		className: "vertical-bars",
		children: e.map((e, r) => {
			let i = O(e.value / n * 100, 4, 100);
			return /* @__PURE__ */ (0, x.jsxs)("div", {
				className: "vbar",
				children: [
					/* @__PURE__ */ (0, x.jsx)("div", {
						className: "vbar-frame",
						"aria-label": `${e.label} ${t(e.value)}`,
						children: /* @__PURE__ */ (0, x.jsx)("span", {
							className: "vbar-fill",
							style: {
								height: `${i}%`,
								backgroundColor: e.color ?? S[r % S.length]
							}
						})
					}),
					/* @__PURE__ */ (0, x.jsx)("strong", { children: e.label }),
					/* @__PURE__ */ (0, x.jsx)("em", { children: e.detail ?? t(e.value) })
				]
			}, e.label);
		})
	});
}
function ft({ data: e, valueFormatter: t }) {
	let n = e.map((e) => e.value), r = Math.min(...n, 0), i = Math.max(...n, 1), a = Math.max(i - r, 1), o = e.map((t, n) => ({
		x: 34 + n / Math.max(e.length - 1, 1) * 312,
		y: 182 - (t.value - r) / a * 152,
		...t
	})), s = o.map((e) => `${e.x},${e.y}`).join(" "), c = `M ${o[0]?.x ?? 34} 182 L ${s} L ${o[o.length - 1]?.x ?? 346} 182 Z`;
	return /* @__PURE__ */ (0, x.jsxs)("div", {
		className: "line-chart-wrap",
		children: [/* @__PURE__ */ (0, x.jsxs)("svg", {
			className: "line-chart",
			viewBox: "0 0 380 212",
			role: "img",
			"aria-label": "趋势折线图",
			children: [
				/* @__PURE__ */ (0, x.jsx)("path", {
					d: c,
					fill: "rgba(31, 95, 191, 0.12)"
				}),
				/* @__PURE__ */ (0, x.jsx)("polyline", {
					fill: "none",
					points: s,
					stroke: "#1f5fbf",
					strokeLinecap: "round",
					strokeLinejoin: "round",
					strokeWidth: "3"
				}),
				o.map((e) => /* @__PURE__ */ (0, x.jsxs)("g", { children: [/* @__PURE__ */ (0, x.jsx)("circle", {
					cx: e.x,
					cy: e.y,
					fill: "#ffffff",
					r: "4",
					stroke: "#1f5fbf",
					strokeWidth: "2"
				}), /* @__PURE__ */ (0, x.jsx)("text", {
					className: "line-label",
					x: e.x,
					y: 207,
					children: e.label
				})] }, e.label))
			]
		}), /* @__PURE__ */ (0, x.jsxs)("div", {
			className: "chart-caption",
			children: [/* @__PURE__ */ (0, x.jsxs)("span", { children: ["最低 ", t(r)] }), /* @__PURE__ */ (0, x.jsxs)("span", { children: ["最高 ", t(i)] })]
		})]
	});
}
function pt({ data: e, valueFormatter: t }) {
	let n = e.filter((e) => e.value > 0), r = n.reduce((e, t) => e + t.value, 0);
	return /* @__PURE__ */ (0, x.jsxs)("div", {
		className: "stacked-wrap",
		children: [/* @__PURE__ */ (0, x.jsx)("div", {
			className: "stacked-bar",
			"aria-label": `合计 ${t(r)}`,
			children: n.length ? n.map((e, n) => /* @__PURE__ */ (0, x.jsx)("span", {
				style: {
					width: `${e.value / Math.max(r, 1) * 100}%`,
					backgroundColor: e.color ?? S[n % S.length]
				},
				title: `${e.label} ${t(e.value)}`
			}, e.label)) : /* @__PURE__ */ (0, x.jsx)("span", { style: {
				width: "100%",
				backgroundColor: "#d8e2ee"
			} })
		}), /* @__PURE__ */ (0, x.jsx)(lt, {
			data: n.length ? n : [{
				label: "暂无数据",
				value: 0,
				color: "#b8c4d4"
			}],
			valueFormatter: t
		})]
	});
}
function mt({ data: e, valueFormatter: t }) {
	return /* @__PURE__ */ (0, x.jsx)("div", {
		className: "progress-list",
		children: e.map((e, n) => {
			let r = O(e.value / Math.max(e.max ?? e.value, 1) * 100);
			return /* @__PURE__ */ (0, x.jsxs)("div", {
				className: "progress-row",
				children: [
					/* @__PURE__ */ (0, x.jsxs)("div", {
						className: "bar-meta",
						children: [/* @__PURE__ */ (0, x.jsx)("span", { children: e.label }), /* @__PURE__ */ (0, x.jsxs)("strong", { children: [t(e.value), e.max ? ` / ${t(e.max)}` : ""] })]
					}),
					/* @__PURE__ */ (0, x.jsx)("div", {
						className: "progress-track",
						children: /* @__PURE__ */ (0, x.jsx)("span", {
							className: "progress-fill",
							style: {
								width: `${r}%`,
								backgroundColor: e.color ?? S[n % S.length]
							}
						})
					}),
					e.detail && /* @__PURE__ */ (0, x.jsx)("em", { children: e.detail })
				]
			}, e.label);
		})
	});
}
function ht({ events: e }) {
	return /* @__PURE__ */ (0, x.jsx)("div", {
		className: "cashflow-calendar",
		children: e.map((e) => /* @__PURE__ */ (0, x.jsxs)("article", {
			className: "calendar-event",
			children: [
				/* @__PURE__ */ (0, x.jsx)("span", { children: e.date.slice(5) }),
				/* @__PURE__ */ (0, x.jsx)("strong", { children: e.item }),
				/* @__PURE__ */ (0, x.jsxs)("div", { children: [e.inflow > 0 && /* @__PURE__ */ (0, x.jsxs)("em", {
					className: "positive",
					children: ["+", D(e.inflow)]
				}), e.outflow > 0 && /* @__PURE__ */ (0, x.jsxs)("em", {
					className: "negative",
					children: ["-", D(e.outflow)]
				})] }),
				/* @__PURE__ */ (0, x.jsxs)("small", { children: ["余额 ", D(e.balance)] })
			]
		}, `${e.date}-${e.item}`))
	});
}
function gt({ data: e }) {
	let t = e.reduce((e, t) => {
		let n = e.at(-1)?.after ?? 0, r = t.kind === "start" || t.kind === "end" ? 0 : n, i = t.kind === "start" || t.kind === "end" ? t.value : n + t.value;
		return [...e, {
			...t,
			before: r,
			after: i
		}];
	}, []), n = t.flatMap((e) => [
		e.before,
		e.after,
		0
	]), r = Math.min(...n), i = Math.max(...n, 1), a = Math.max(i - r, 1), o = (e) => 198 - (e - r) / a * 166, s = 356 / Math.max(t.length, 1) * .58;
	return /* @__PURE__ */ (0, x.jsxs)("div", {
		className: "waterfall-wrap",
		children: [/* @__PURE__ */ (0, x.jsxs)("svg", {
			className: "waterfall-chart",
			viewBox: "0 0 420 230",
			role: "img",
			"aria-label": "现金瀑布图",
			children: [/* @__PURE__ */ (0, x.jsx)("line", {
				className: "axis-line",
				x1: 32,
				x2: 388,
				y1: o(0),
				y2: o(0)
			}), t.map((e, n) => {
				let r = 32 + n * (356 / Math.max(t.length - 1, 1)) - s / 2, i = Math.min(o(e.before), o(e.after)), a = Math.max(4, Math.abs(o(e.before) - o(e.after)));
				return /* @__PURE__ */ (0, x.jsxs)("g", { children: [/* @__PURE__ */ (0, x.jsx)("rect", {
					fill: e.color ?? (e.value >= 0 ? S[1] : S[4]),
					height: a,
					rx: "4",
					width: s,
					x: r,
					y: i
				}), /* @__PURE__ */ (0, x.jsx)("text", {
					className: "waterfall-label",
					x: r + s / 2,
					y: 224,
					children: e.label
				})] }, e.label);
			})]
		}), /* @__PURE__ */ (0, x.jsxs)("div", {
			className: "chart-caption",
			children: [/* @__PURE__ */ (0, x.jsxs)("span", { children: ["流入 ", D(e.filter((e) => e.value > 0 && e.kind !== "start" && e.kind !== "end").reduce((e, t) => e + t.value, 0))] }), /* @__PURE__ */ (0, x.jsxs)("span", { children: ["流出 ", D(Math.abs(e.filter((e) => e.value < 0).reduce((e, t) => e + t.value, 0)))] })]
		})]
	});
}
function _t({ data: e }) {
	return /* @__PURE__ */ (0, x.jsxs)("div", {
		className: "matrix-layout",
		children: [/* @__PURE__ */ (0, x.jsxs)("svg", {
			className: "risk-matrix",
			viewBox: "0 0 360 360",
			role: "img",
			"aria-label": "风险矩阵",
			children: [
				/* @__PURE__ */ (0, x.jsx)("rect", {
					className: "matrix-zone low",
					height: 248 / 2,
					width: 248 / 2,
					x: 56,
					y: 180
				}),
				/* @__PURE__ */ (0, x.jsx)("rect", {
					className: "matrix-zone mid",
					height: 248 / 2,
					width: 248 / 2,
					x: 180,
					y: 180
				}),
				/* @__PURE__ */ (0, x.jsx)("rect", {
					className: "matrix-zone mid",
					height: 248 / 2,
					width: 248 / 2,
					x: 56,
					y: 56
				}),
				/* @__PURE__ */ (0, x.jsx)("rect", {
					className: "matrix-zone high",
					height: 248 / 2,
					width: 248 / 2,
					x: 180,
					y: 56
				}),
				/* @__PURE__ */ (0, x.jsx)("line", {
					className: "axis-line",
					x1: 56,
					x2: 304,
					y1: 304,
					y2: 304
				}),
				/* @__PURE__ */ (0, x.jsx)("line", {
					className: "axis-line",
					x1: 56,
					x2: 56,
					y1: 56,
					y2: 304
				}),
				/* @__PURE__ */ (0, x.jsx)("text", {
					className: "matrix-axis",
					x: 360 / 2,
					y: 355,
					children: "影响"
				}),
				/* @__PURE__ */ (0, x.jsx)("text", {
					className: "matrix-axis vertical",
					x: "12",
					y: 360 / 2,
					children: "紧迫"
				}),
				e.map((e) => {
					let t = 56 + O(e.x) / 100 * 248, n = 304 - O(e.y) / 100 * 248;
					return /* @__PURE__ */ (0, x.jsxs)("g", { children: [/* @__PURE__ */ (0, x.jsx)("circle", {
						cx: t,
						cy: n,
						fill: e.color ?? S[0],
						r: "8"
					}), /* @__PURE__ */ (0, x.jsx)("text", {
						className: "matrix-point-label",
						x: t,
						y: n - 13,
						children: e.label
					})] }, e.label);
				})
			]
		}), /* @__PURE__ */ (0, x.jsx)(lt, {
			data: e.map((e) => ({
				label: e.label,
				value: 0,
				detail: e.value,
				color: e.color
			})),
			valueFormatter: () => ""
		})]
	});
}
function vt({ data: e, source: t, valueFormatter: n }) {
	let r = Math.max(...e.map((e) => e.value), 1);
	return /* @__PURE__ */ (0, x.jsxs)("div", {
		className: "flow-map",
		children: [/* @__PURE__ */ (0, x.jsx)("div", {
			className: "flow-source",
			children: t
		}), /* @__PURE__ */ (0, x.jsx)("div", {
			className: "flow-lines",
			children: e.map((e, t) => /* @__PURE__ */ (0, x.jsxs)("div", {
				className: "flow-row",
				children: [
					/* @__PURE__ */ (0, x.jsx)("span", { style: {
						width: `${O(e.value / r * 100, 4, 100)}%`,
						backgroundColor: e.color ?? S[t % S.length]
					} }),
					/* @__PURE__ */ (0, x.jsx)("strong", { children: e.label }),
					/* @__PURE__ */ (0, x.jsx)("em", { children: n(e.value) })
				]
			}, e.label))
		})]
	});
}
function yt({ data: e }) {
	return /* @__PURE__ */ (0, x.jsx)("div", {
		className: "heatmap-grid",
		children: e.map((e, t) => /* @__PURE__ */ (0, x.jsxs)("div", {
			className: "heat-cell",
			style: {
				backgroundColor: e.color ?? S[t % S.length],
				opacity: .22 + O(e.value, 0, 120) / 160
			},
			children: [/* @__PURE__ */ (0, x.jsx)("strong", { children: e.label }), /* @__PURE__ */ (0, x.jsx)("span", { children: e.detail ?? `${e.value.toFixed(0)}%` })]
		}, e.label))
	});
}
function bt({ data: e, xLabel: t, yLabel: n }) {
	return /* @__PURE__ */ (0, x.jsxs)("div", {
		className: "matrix-layout",
		children: [/* @__PURE__ */ (0, x.jsxs)("svg", {
			className: "risk-matrix",
			viewBox: "0 0 220 220",
			role: "img",
			"aria-label": `${t} 和 ${n} 散点图`,
			children: [
				/* @__PURE__ */ (0, x.jsx)("rect", {
					className: "matrix-zone low",
					height: 164,
					width: 164,
					x: 28,
					y: 28
				}),
				/* @__PURE__ */ (0, x.jsx)("line", {
					className: "axis-line",
					x1: 28,
					x2: 192,
					y1: 192,
					y2: 192
				}),
				/* @__PURE__ */ (0, x.jsx)("line", {
					className: "axis-line",
					x1: 28,
					x2: 28,
					y1: 28,
					y2: 192
				}),
				/* @__PURE__ */ (0, x.jsx)("text", {
					className: "matrix-axis",
					x: 220 / 2,
					y: 215,
					children: t
				}),
				/* @__PURE__ */ (0, x.jsx)("text", {
					className: "matrix-axis vertical",
					x: "12",
					y: 220 / 2,
					children: n
				}),
				e.map((e) => {
					let t = 28 + O(e.x) / 100 * 164, n = 192 - O(e.y) / 100 * 164;
					return /* @__PURE__ */ (0, x.jsxs)("g", { children: [/* @__PURE__ */ (0, x.jsx)("circle", {
						cx: t,
						cy: n,
						fill: e.color ?? S[0],
						r: "7"
					}), /* @__PURE__ */ (0, x.jsx)("text", {
						className: "matrix-point-label",
						x: t,
						y: n - 10,
						children: e.label
					})] }, e.label);
				})
			]
		}), /* @__PURE__ */ (0, x.jsx)(lt, {
			data: e.map((e) => ({
				label: e.label,
				value: 0,
				detail: e.value,
				color: e.color
			})),
			valueFormatter: () => ""
		})]
	});
}
function xt({ budgets: e, updateBudget: t, addBudget: n, deleteBudget: r }) {
	let i = e.reduce((e, t) => e + t.plan, 0), a = e.reduce((e, t) => e + t.actual, 0);
	return /* @__PURE__ */ (0, x.jsxs)(x.Fragment, { children: [/* @__PURE__ */ (0, x.jsx)(I, {
		title: "预算支出底表",
		meta: `预算 ${D(i)} / 实际 ${D(a)} / 剩余 ${D(i - a)}`,
		action: /* @__PURE__ */ (0, x.jsx)("button", {
			className: "secondary-button",
			type: "button",
			onClick: n,
			children: "新增分类"
		})
	}), /* @__PURE__ */ (0, x.jsx)("div", {
		className: "table-wrap spreadsheet-wrap",
		children: /* @__PURE__ */ (0, x.jsxs)("table", {
			className: "spreadsheet-table",
			children: [/* @__PURE__ */ (0, x.jsx)("thead", { children: /* @__PURE__ */ (0, x.jsxs)("tr", { children: [
				/* @__PURE__ */ (0, x.jsx)("th", { children: "分类" }),
				/* @__PURE__ */ (0, x.jsx)("th", { children: "预算" }),
				/* @__PURE__ */ (0, x.jsx)("th", { children: "实际" }),
				/* @__PURE__ */ (0, x.jsx)("th", { children: "剩余" }),
				/* @__PURE__ */ (0, x.jsx)("th", { children: "必须" }),
				/* @__PURE__ */ (0, x.jsx)("th", { children: "固定" }),
				/* @__PURE__ */ (0, x.jsx)("th", { children: "操作" })
			] }) }), /* @__PURE__ */ (0, x.jsx)("tbody", { children: e.map((n) => /* @__PURE__ */ (0, x.jsxs)("tr", { children: [
				/* @__PURE__ */ (0, x.jsx)("td", { children: /* @__PURE__ */ (0, x.jsx)(Ge, {
					ariaLabel: `${n.name} 分类`,
					value: n.name,
					onChange: (e) => t(n.id, { name: e })
				}) }),
				/* @__PURE__ */ (0, x.jsx)("td", { children: /* @__PURE__ */ (0, x.jsx)(F, {
					ariaLabel: `${n.name} 预算`,
					value: n.plan,
					onChange: (e) => t(n.id, { plan: e })
				}) }),
				/* @__PURE__ */ (0, x.jsx)("td", { children: /* @__PURE__ */ (0, x.jsx)(F, {
					ariaLabel: `${n.name} 实际`,
					value: n.actual,
					onChange: (e) => t(n.id, { actual: e })
				}) }),
				/* @__PURE__ */ (0, x.jsx)("td", {
					className: "calculated-cell",
					children: D(n.plan - n.actual)
				}),
				/* @__PURE__ */ (0, x.jsx)("td", { children: /* @__PURE__ */ (0, x.jsx)(Je, {
					ariaLabel: `${n.name} 必须`,
					checked: n.required,
					onChange: (e) => t(n.id, { required: e })
				}) }),
				/* @__PURE__ */ (0, x.jsx)("td", { children: /* @__PURE__ */ (0, x.jsx)(Je, {
					ariaLabel: `${n.name} 固定`,
					checked: n.fixed,
					onChange: (e) => t(n.id, { fixed: e })
				}) }),
				/* @__PURE__ */ (0, x.jsx)("td", { children: /* @__PURE__ */ (0, x.jsx)("button", {
					className: "danger-button compact",
					disabled: e.length <= 1,
					type: "button",
					onClick: () => r(n.id),
					children: "删除"
				}) })
			] }, n.id)) })]
		})
	})] });
}
//#endregion
//#region app/static-entry.tsx
var St = document.getElementById("root");
St && (0, y.createRoot)(St).render(/* @__PURE__ */ (0, x.jsx)(b.StrictMode, { children: /* @__PURE__ */ (0, x.jsx)(Ve, {}) }));
//#endregion
