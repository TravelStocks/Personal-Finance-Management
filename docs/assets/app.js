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
	function ee() {}
	var C = {
		H: null,
		A: null,
		T: null,
		S: null
	}, w = Object.prototype.hasOwnProperty;
	function T(e, n, r) {
		var i = r.ref;
		return {
			$$typeof: t,
			type: e,
			key: n,
			ref: i === void 0 ? null : i,
			props: r
		};
	}
	function te(e, t) {
		return T(e.type, t, e.props);
	}
	function E(e) {
		return typeof e == "object" && !!e && e.$$typeof === t;
	}
	function D(e) {
		var t = {
			"=": "=0",
			":": "=2"
		};
		return "$" + e.replace(/[=:]/g, function(e) {
			return t[e];
		});
	}
	var ne = /\/+/g;
	function re(e, t) {
		return typeof e == "object" && e && e.key != null ? D("" + e.key) : t.toString(36);
	}
	function ie(e) {
		switch (e.status) {
			case "fulfilled": return e.value;
			case "rejected": throw e.reason;
			default: switch (typeof e.status == "string" ? e.then(ee, ee) : (e.status = "pending", e.then(function(t) {
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
	function O(e, r, i, a, o) {
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
				case d: return c = e._init, O(c(e._payload), r, i, a, o);
			}
		}
		if (c) return o = o(e), c = a === "" ? "." + re(e, 0) : a, S(o) ? (i = "", c != null && (i = c.replace(ne, "$&/") + "/"), O(o, r, i, "", function(e) {
			return e;
		})) : o != null && (E(o) && (o = te(o, i + (o.key == null || e && e.key === o.key ? "" : ("" + o.key).replace(ne, "$&/") + "/") + c)), r.push(o)), 1;
		c = 0;
		var l = a === "" ? "." : a + ":";
		if (S(e)) for (var u = 0; u < e.length; u++) a = e[u], s = l + re(a, u), c += O(a, r, i, s, o);
		else if (u = m(e), typeof u == "function") for (e = u.call(e), u = 0; !(a = e.next()).done;) a = a.value, s = l + re(a, u++), c += O(a, r, i, s, o);
		else if (s === "object") {
			if (typeof e.then == "function") return O(ie(e), r, i, a, o);
			throw r = String(e), Error("Objects are not valid as a React child (found: " + (r === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : r) + "). If you meant to render a collection of children, use an array instead.");
		}
		return c;
	}
	function ae(e, t, n) {
		if (e == null) return e;
		var r = [], i = 0;
		return O(e, r, "", "", function(e) {
			return t.call(n, e, i++);
		}), r;
	}
	function oe(e) {
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
	var k = typeof reportError == "function" ? reportError : function(e) {
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
	}, A = {
		map: ae,
		forEach: function(e, t, n) {
			ae(e, function() {
				t.apply(this, arguments);
			}, n);
		},
		count: function(e) {
			var t = 0;
			return ae(e, function() {
				t++;
			}), t;
		},
		toArray: function(e) {
			return ae(e, function(e) {
				return e;
			}) || [];
		},
		only: function(e) {
			if (!E(e)) throw Error("React.Children.only expected to receive a single React element child.");
			return e;
		}
	};
	e.Activity = f, e.Children = A, e.Component = v, e.Fragment = r, e.Profiler = a, e.PureComponent = b, e.StrictMode = i, e.Suspense = l, e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = C, e.__COMPILER_RUNTIME = {
		__proto__: null,
		c: function(e) {
			return C.H.useMemoCache(e);
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
		if (t != null) for (a in t.key !== void 0 && (i = "" + t.key), t) !w.call(t, a) || a === "key" || a === "__self" || a === "__source" || a === "ref" && t.ref === void 0 || (r[a] = t[a]);
		var a = arguments.length - 2;
		if (a === 1) r.children = n;
		else if (1 < a) {
			for (var o = Array(a), s = 0; s < a; s++) o[s] = arguments[s + 2];
			r.children = o;
		}
		return T(e.type, i, r);
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
		if (t != null) for (r in t.key !== void 0 && (a = "" + t.key), t) w.call(t, r) && r !== "key" && r !== "__self" && r !== "__source" && (i[r] = t[r]);
		var o = arguments.length - 2;
		if (o === 1) i.children = n;
		else if (1 < o) {
			for (var s = Array(o), c = 0; c < o; c++) s[c] = arguments[c + 2];
			i.children = s;
		}
		if (e && e.defaultProps) for (r in o = e.defaultProps, o) i[r] === void 0 && (i[r] = o[r]);
		return T(e, a, i);
	}, e.createRef = function() {
		return { current: null };
	}, e.forwardRef = function(e) {
		return {
			$$typeof: c,
			render: e
		};
	}, e.isValidElement = E, e.lazy = function(e) {
		return {
			$$typeof: d,
			_payload: {
				_status: -1,
				_result: e
			},
			_init: oe
		};
	}, e.memo = function(e, t) {
		return {
			$$typeof: u,
			type: e,
			compare: t === void 0 ? null : t
		};
	}, e.startTransition = function(e) {
		var t = C.T, n = {};
		C.T = n;
		try {
			var r = e(), i = C.S;
			i !== null && i(n, r), typeof r == "object" && r && typeof r.then == "function" && r.then(ee, k);
		} catch (e) {
			k(e);
		} finally {
			t !== null && n.types !== null && (t.types = n.types), C.T = t;
		}
	}, e.unstable_useCacheRefresh = function() {
		return C.H.useCacheRefresh();
	}, e.use = function(e) {
		return C.H.use(e);
	}, e.useActionState = function(e, t, n) {
		return C.H.useActionState(e, t, n);
	}, e.useCallback = function(e, t) {
		return C.H.useCallback(e, t);
	}, e.useContext = function(e) {
		return C.H.useContext(e);
	}, e.useDebugValue = function() {}, e.useDeferredValue = function(e, t) {
		return C.H.useDeferredValue(e, t);
	}, e.useEffect = function(e, t) {
		return C.H.useEffect(e, t);
	}, e.useEffectEvent = function(e) {
		return C.H.useEffectEvent(e);
	}, e.useId = function() {
		return C.H.useId();
	}, e.useImperativeHandle = function(e, t, n) {
		return C.H.useImperativeHandle(e, t, n);
	}, e.useInsertionEffect = function(e, t) {
		return C.H.useInsertionEffect(e, t);
	}, e.useLayoutEffect = function(e, t) {
		return C.H.useLayoutEffect(e, t);
	}, e.useMemo = function(e, t) {
		return C.H.useMemo(e, t);
	}, e.useOptimistic = function(e, t) {
		return C.H.useOptimistic(e, t);
	}, e.useReducer = function(e, t, n) {
		return C.H.useReducer(e, t, n);
	}, e.useRef = function(e) {
		return C.H.useRef(e);
	}, e.useState = function(e) {
		return C.H.useState(e);
	}, e.useSyncExternalStore = function(e, t, n) {
		return C.H.useSyncExternalStore(e, t, n);
	}, e.useTransition = function() {
		return C.H.useTransition();
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
		if (h = !1, b(e), !m) if (n(c) !== null) m = !0, S || (S = !0, E());
		else {
			var t = n(l);
			t !== null && re(x, t.startTime - e);
		}
	}
	var S = !1, ee = -1, C = 5, w = -1;
	function T() {
		return g ? !0 : !(e.unstable_now() - w < C);
	}
	function te() {
		if (g = !1, S) {
			var t = e.unstable_now();
			w = t;
			var i = !0;
			try {
				a: {
					m = !1, h && (h = !1, v(ee), ee = -1), p = !0;
					var a = f;
					try {
						b: {
							for (b(t), d = n(c); d !== null && !(d.expirationTime > t && T());) {
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
								u !== null && re(x, u.startTime - t), i = !1;
							}
						}
						break a;
					} finally {
						d = null, f = a, p = !1;
					}
					i = void 0;
				}
			} finally {
				i ? E() : S = !1;
			}
		}
	}
	var E;
	if (typeof y == "function") E = function() {
		y(te);
	};
	else if (typeof MessageChannel < "u") {
		var D = new MessageChannel(), ne = D.port2;
		D.port1.onmessage = te, E = function() {
			ne.postMessage(null);
		};
	} else E = function() {
		_(te, 0);
	};
	function re(t, n) {
		ee = _(function() {
			t(e.unstable_now());
		}, n);
	}
	e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(e) {
		e.callback = null;
	}, e.unstable_forceFrameRate = function(e) {
		0 > e || 125 < e ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : C = 0 < e ? Math.floor(1e3 / e) : 5;
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
		}, a > o ? (r.sortIndex = a, t(l, r), n(c) === null && r === n(l) && (h ? (v(ee), ee = -1) : h = !0, re(x, a - o))) : (r.sortIndex = s, t(c, r), m || p || (m = !0, S || (S = !0, E()))), r;
	}, e.unstable_shouldYield = T, e.unstable_wrapCallback = function(e) {
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
	var h = Object.assign, g = Symbol.for("react.element"), _ = Symbol.for("react.transitional.element"), v = Symbol.for("react.portal"), y = Symbol.for("react.fragment"), b = Symbol.for("react.strict_mode"), x = Symbol.for("react.profiler"), S = Symbol.for("react.consumer"), ee = Symbol.for("react.context"), C = Symbol.for("react.forward_ref"), w = Symbol.for("react.suspense"), T = Symbol.for("react.suspense_list"), te = Symbol.for("react.memo"), E = Symbol.for("react.lazy"), D = Symbol.for("react.activity"), ne = Symbol.for("react.memo_cache_sentinel"), re = Symbol.iterator;
	function ie(e) {
		return typeof e != "object" || !e ? null : (e = re && e[re] || e["@@iterator"], typeof e == "function" ? e : null);
	}
	var O = Symbol.for("react.client.reference");
	function ae(e) {
		if (e == null) return null;
		if (typeof e == "function") return e.$$typeof === O ? null : e.displayName || e.name || null;
		if (typeof e == "string") return e;
		switch (e) {
			case y: return "Fragment";
			case x: return "Profiler";
			case b: return "StrictMode";
			case w: return "Suspense";
			case T: return "SuspenseList";
			case D: return "Activity";
		}
		if (typeof e == "object") switch (e.$$typeof) {
			case v: return "Portal";
			case ee: return e.displayName || "Context";
			case S: return (e._context.displayName || "Context") + ".Consumer";
			case C:
				var t = e.render;
				return e = e.displayName, e ||= (e = t.displayName || t.name || "", e === "" ? "ForwardRef" : "ForwardRef(" + e + ")"), e;
			case te: return t = e.displayName || null, t === null ? ae(e.type) || "Memo" : t;
			case E:
				t = e._payload, e = e._init;
				try {
					return ae(e(t));
				} catch {}
		}
		return null;
	}
	var oe = Array.isArray, k = n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, A = r.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, se = {
		pending: !1,
		data: null,
		method: null,
		action: null
	}, ce = [], le = -1;
	function ue(e) {
		return { current: e };
	}
	function j(e) {
		0 > le || (e.current = ce[le], ce[le] = null, le--);
	}
	function M(e, t) {
		le++, ce[le] = e.current, e.current = t;
	}
	var de = ue(null), fe = ue(null), pe = ue(null), me = ue(null);
	function he(e, t) {
		switch (M(pe, t), M(fe, e), M(de, null), t.nodeType) {
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
		j(de), M(de, e);
	}
	function ge() {
		j(de), j(fe), j(pe);
	}
	function _e(e) {
		e.memoizedState !== null && M(me, e);
		var t = de.current, n = Hd(t, e.type);
		t !== n && (M(fe, e), M(de, n));
	}
	function N(e) {
		fe.current === e && (j(de), j(fe)), me.current === e && (j(me), Qf._currentValue = se);
	}
	var ve, ye;
	function be(e) {
		if (ve === void 0) try {
			throw Error();
		} catch (e) {
			var t = e.stack.trim().match(/\n( *(at )?)/);
			ve = t && t[1] || "", ye = -1 < e.stack.indexOf("\n    at") ? " (<anonymous>)" : -1 < e.stack.indexOf("@") ? "@unknown:0:0" : "";
		}
		return "\n" + ve + e + ye;
	}
	var P = !1;
	function xe(e, t) {
		if (!e || P) return "";
		P = !0;
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
			P = !1, Error.prepareStackTrace = n;
		}
		return (n = e ? e.displayName || e.name : "") ? be(n) : "";
	}
	function Se(e, t) {
		switch (e.tag) {
			case 26:
			case 27:
			case 5: return be(e.type);
			case 16: return be("Lazy");
			case 13: return e.child !== t && t !== null ? be("Suspense Fallback") : be("Suspense");
			case 19: return be("SuspenseList");
			case 0:
			case 15: return xe(e.type, !1);
			case 11: return xe(e.type.render, !1);
			case 1: return xe(e.type, !0);
			case 31: return be("Activity");
			default: return "";
		}
	}
	function F(e) {
		try {
			var t = "", n = null;
			do
				t += Se(e, n), n = e, e = e.return;
			while (e);
			return t;
		} catch (e) {
			return "\nError generating stack: " + e.message + "\n" + e.stack;
		}
	}
	var Ce = Object.prototype.hasOwnProperty, we = t.unstable_scheduleCallback, Te = t.unstable_cancelCallback, Ee = t.unstable_shouldYield, De = t.unstable_requestPaint, I = t.unstable_now, Oe = t.unstable_getCurrentPriorityLevel, ke = t.unstable_ImmediatePriority, Ae = t.unstable_UserBlockingPriority, je = t.unstable_NormalPriority, Me = t.unstable_LowPriority, Ne = t.unstable_IdlePriority, Pe = t.log, Fe = t.unstable_setDisableYieldValue, Ie = null, Le = null;
	function Re(e) {
		if (typeof Pe == "function" && Fe(e), Le && typeof Le.setStrictMode == "function") try {
			Le.setStrictMode(Ie, e);
		} catch {}
	}
	var ze = Math.clz32 ? Math.clz32 : He, Be = Math.log, Ve = Math.LN2;
	function He(e) {
		return e >>>= 0, e === 0 ? 32 : 31 - (Be(e) / Ve | 0) | 0;
	}
	var Ue = 256, We = 262144, Ge = 4194304;
	function Ke(e) {
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
	function qe(e, t, n) {
		var r = e.pendingLanes;
		if (r === 0) return 0;
		var i = 0, a = e.suspendedLanes, o = e.pingedLanes;
		e = e.warmLanes;
		var s = r & 134217727;
		return s === 0 ? (s = r & ~a, s === 0 ? o === 0 ? n || (n = r & ~e, n !== 0 && (i = Ke(n))) : i = Ke(o) : i = Ke(s)) : (r = s & ~a, r === 0 ? (o &= s, o === 0 ? n || (n = s & ~e, n !== 0 && (i = Ke(n))) : i = Ke(o)) : i = Ke(r)), i === 0 ? 0 : t !== 0 && t !== i && (t & a) === 0 && (a = i & -i, n = t & -t, a >= n || a === 32 && n & 4194048) ? t : i;
	}
	function Je(e, t) {
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
		var e = Ge;
		return Ge <<= 1, !(Ge & 62914560) && (Ge = 4194304), e;
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
			var u = 31 - ze(n), d = 1 << u;
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
		var r = 31 - ze(t);
		e.entangledLanes |= t, e.entanglements[r] = e.entanglements[r] | 1073741824 | n & 261930;
	}
	function tt(e, t) {
		var n = e.entangledLanes |= t;
		for (e = e.entanglements; n;) {
			var r = 31 - ze(n), i = 1 << r;
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
		var e = A.p;
		return e === 0 ? (e = window.event, e === void 0 ? 32 : mp(e.type)) : e;
	}
	function ot(e, t) {
		var n = A.p;
		try {
			return A.p = e, t();
		} finally {
			A.p = n;
		}
	}
	var L = Math.random().toString(36).slice(2), R = "__reactFiber$" + L, st = "__reactProps$" + L, ct = "__reactContainer$" + L, lt = "__reactEvents$" + L, ut = "__reactListeners$" + L, dt = "__reactHandles$" + L, ft = "__reactResources$" + L, pt = "__reactMarker$" + L;
	function mt(e) {
		delete e[R], delete e[st], delete e[lt], delete e[ut], delete e[dt];
	}
	function z(e) {
		var t = e[R];
		if (t) return t;
		for (var n = e.parentNode; n;) {
			if (t = n[ct] || n[R]) {
				if (n = t.alternate, t.child !== null || n !== null && n.child !== null) for (e = df(e); e !== null;) {
					if (n = e[R]) return n;
					e = df(e);
				}
				return t;
			}
			e = n, n = e.parentNode;
		}
		return null;
	}
	function ht(e) {
		if (e = e[R] || e[ct]) {
			var t = e.tag;
			if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3) return e;
		}
		return null;
	}
	function gt(e) {
		var t = e.tag;
		if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
		throw Error(i(33));
	}
	function _t(e) {
		var t = e[ft];
		return t ||= e[ft] = {
			hoistableStyles: /* @__PURE__ */ new Map(),
			hoistableScripts: /* @__PURE__ */ new Map()
		}, t;
	}
	function B(e) {
		e[pt] = !0;
	}
	var vt = /* @__PURE__ */ new Set(), yt = {};
	function bt(e, t) {
		xt(e, t), xt(e + "Capture", t);
	}
	function xt(e, t) {
		for (yt[e] = t, e = 0; e < t.length; e++) vt.add(t[e]);
	}
	var St = RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"), Ct = {}, wt = {};
	function Tt(e) {
		return Ce.call(wt, e) ? !0 : Ce.call(Ct, e) ? !1 : St.test(e) ? wt[e] = !0 : (Ct[e] = !0, !1);
	}
	function Et(e, t, n) {
		if (Tt(t)) if (n === null) e.removeAttribute(t);
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
	function Dt(e, t, n) {
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
	function Ot(e, t, n, r) {
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
	function kt(e) {
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
	function At(e) {
		var t = e.type;
		return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
	}
	function jt(e, t, n) {
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
	function Mt(e) {
		if (!e._valueTracker) {
			var t = At(e) ? "checked" : "value";
			e._valueTracker = jt(e, t, "" + e[t]);
		}
	}
	function Nt(e) {
		if (!e) return !1;
		var t = e._valueTracker;
		if (!t) return !0;
		var n = t.getValue(), r = "";
		return e && (r = At(e) ? e.checked ? "true" : "false" : e.value), e = r, e === n ? !1 : (t.setValue(e), !0);
	}
	function Pt(e) {
		if (e ||= typeof document < "u" ? document : void 0, e === void 0) return null;
		try {
			return e.activeElement || e.body;
		} catch {
			return e.body;
		}
	}
	var Ft = /[\n"\\]/g;
	function It(e) {
		return e.replace(Ft, function(e) {
			return "\\" + e.charCodeAt(0).toString(16) + " ";
		});
	}
	function Lt(e, t, n, r, i, a, o, s) {
		e.name = "", o != null && typeof o != "function" && typeof o != "symbol" && typeof o != "boolean" ? e.type = o : e.removeAttribute("type"), t == null ? o !== "submit" && o !== "reset" || e.removeAttribute("value") : o === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + kt(t)) : e.value !== "" + kt(t) && (e.value = "" + kt(t)), t == null ? n == null ? r != null && e.removeAttribute("value") : zt(e, o, kt(n)) : zt(e, o, kt(t)), i == null && a != null && (e.defaultChecked = !!a), i != null && (e.checked = i && typeof i != "function" && typeof i != "symbol"), s != null && typeof s != "function" && typeof s != "symbol" && typeof s != "boolean" ? e.name = "" + kt(s) : e.removeAttribute("name");
	}
	function Rt(e, t, n, r, i, a, o, s) {
		if (a != null && typeof a != "function" && typeof a != "symbol" && typeof a != "boolean" && (e.type = a), t != null || n != null) {
			if (!(a !== "submit" && a !== "reset" || t != null)) {
				Mt(e);
				return;
			}
			n = n == null ? "" : "" + kt(n), t = t == null ? n : "" + kt(t), s || t === e.value || (e.value = t), e.defaultValue = t;
		}
		r ??= i, r = typeof r != "function" && typeof r != "symbol" && !!r, e.checked = s ? e.checked : !!r, e.defaultChecked = !!r, o != null && typeof o != "function" && typeof o != "symbol" && typeof o != "boolean" && (e.name = o), Mt(e);
	}
	function zt(e, t, n) {
		t === "number" && Pt(e.ownerDocument) === e || e.defaultValue === "" + n || (e.defaultValue = "" + n);
	}
	function Bt(e, t, n, r) {
		if (e = e.options, t) {
			t = {};
			for (var i = 0; i < n.length; i++) t["$" + n[i]] = !0;
			for (n = 0; n < e.length; n++) i = t.hasOwnProperty("$" + e[n].value), e[n].selected !== i && (e[n].selected = i), i && r && (e[n].defaultSelected = !0);
		} else {
			for (n = "" + kt(n), t = null, i = 0; i < e.length; i++) {
				if (e[i].value === n) {
					e[i].selected = !0, r && (e[i].defaultSelected = !0);
					return;
				}
				t !== null || e[i].disabled || (t = e[i]);
			}
			t !== null && (t.selected = !0);
		}
	}
	function Vt(e, t, n) {
		if (t != null && (t = "" + kt(t), t !== e.value && (e.value = t), n == null)) {
			e.defaultValue !== t && (e.defaultValue = t);
			return;
		}
		e.defaultValue = n == null ? "" : "" + kt(n);
	}
	function Ht(e, t, n, r) {
		if (t == null) {
			if (r != null) {
				if (n != null) throw Error(i(92));
				if (oe(r)) {
					if (1 < r.length) throw Error(i(93));
					r = r[0];
				}
				n = r;
			}
			n ??= "", t = n;
		}
		n = kt(t), e.defaultValue = n, r = e.textContent, r === n && r !== "" && r !== null && (e.value = r), Mt(e);
	}
	function Ut(e, t) {
		if (t) {
			var n = e.firstChild;
			if (n && n === e.lastChild && n.nodeType === 3) {
				n.nodeValue = t;
				return;
			}
		}
		e.textContent = t;
	}
	var Wt = new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));
	function Gt(e, t, n) {
		var r = t.indexOf("--") === 0;
		n == null || typeof n == "boolean" || n === "" ? r ? e.setProperty(t, "") : t === "float" ? e.cssFloat = "" : e[t] = "" : r ? e.setProperty(t, n) : typeof n != "number" || n === 0 || Wt.has(t) ? t === "float" ? e.cssFloat = n : e[t] = ("" + n).trim() : e[t] = n + "px";
	}
	function Kt(e, t, n) {
		if (t != null && typeof t != "object") throw Error(i(62));
		if (e = e.style, n != null) {
			for (var r in n) !n.hasOwnProperty(r) || t != null && t.hasOwnProperty(r) || (r.indexOf("--") === 0 ? e.setProperty(r, "") : r === "float" ? e.cssFloat = "" : e[r] = "");
			for (var a in t) r = t[a], t.hasOwnProperty(a) && n[a] !== r && Gt(e, a, r);
		} else for (var o in t) t.hasOwnProperty(o) && Gt(e, o, t[o]);
	}
	function qt(e) {
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
	var Jt = new Map([
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
	]), V = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
	function Yt(e) {
		return V.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
	}
	function Xt() {}
	var Zt = null;
	function Qt(e) {
		return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
	}
	var $t = null, en = null;
	function tn(e) {
		var t = ht(e);
		if (t && (e = t.stateNode)) {
			var n = e[st] || null;
			a: switch (e = t.stateNode, t.type) {
				case "input":
					if (Lt(e, n.value, n.defaultValue, n.defaultValue, n.checked, n.defaultChecked, n.type, n.name), t = n.name, n.type === "radio" && t != null) {
						for (n = e; n.parentNode;) n = n.parentNode;
						for (n = n.querySelectorAll("input[name=\"" + It("" + t) + "\"][type=\"radio\"]"), t = 0; t < n.length; t++) {
							var r = n[t];
							if (r !== e && r.form === e.form) {
								var a = r[st] || null;
								if (!a) throw Error(i(90));
								Lt(r, a.value, a.defaultValue, a.defaultValue, a.checked, a.defaultChecked, a.type, a.name);
							}
						}
						for (t = 0; t < n.length; t++) r = n[t], r.form === e.form && Nt(r);
					}
					break a;
				case "textarea":
					Vt(e, n.value, n.defaultValue);
					break a;
				case "select": t = n.value, t != null && Bt(e, !!n.multiple, t, !1);
			}
		}
	}
	var nn = !1;
	function rn(e, t, n) {
		if (nn) return e(t, n);
		nn = !0;
		try {
			return e(t);
		} finally {
			if (nn = !1, ($t !== null || en !== null) && (vu(), $t && (t = $t, e = en, en = $t = null, tn(t), e))) for (t = 0; t < e.length; t++) tn(e[t]);
		}
	}
	function an(e, t) {
		var n = e.stateNode;
		if (n === null) return null;
		var r = n[st] || null;
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
	var on = !(typeof window > "u" || window.document === void 0 || window.document.createElement === void 0), sn = !1;
	if (on) try {
		var cn = {};
		Object.defineProperty(cn, "passive", { get: function() {
			sn = !0;
		} }), window.addEventListener("test", cn, cn), window.removeEventListener("test", cn, cn);
	} catch {
		sn = !1;
	}
	var ln = null, un = null, dn = null;
	function fn() {
		if (dn) return dn;
		var e, t = un, n = t.length, r, i = "value" in ln ? ln.value : ln.textContent, a = i.length;
		for (e = 0; e < n && t[e] === i[e]; e++);
		var o = n - e;
		for (r = 1; r <= o && t[n - r] === i[a - r]; r++);
		return dn = i.slice(e, 1 < r ? 1 - r : void 0);
	}
	function pn(e) {
		var t = e.keyCode;
		return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
	}
	function mn() {
		return !0;
	}
	function hn() {
		return !1;
	}
	function gn(e) {
		function t(t, n, r, i, a) {
			for (var o in this._reactName = t, this._targetInst = r, this.type = n, this.nativeEvent = i, this.target = a, this.currentTarget = null, e) e.hasOwnProperty(o) && (t = e[o], this[o] = t ? t(i) : i[o]);
			return this.isDefaultPrevented = (i.defaultPrevented == null ? !1 === i.returnValue : i.defaultPrevented) ? mn : hn, this.isPropagationStopped = hn, this;
		}
		return h(t.prototype, {
			preventDefault: function() {
				this.defaultPrevented = !0;
				var e = this.nativeEvent;
				e && (e.preventDefault ? e.preventDefault() : typeof e.returnValue != "unknown" && (e.returnValue = !1), this.isDefaultPrevented = mn);
			},
			stopPropagation: function() {
				var e = this.nativeEvent;
				e && (e.stopPropagation ? e.stopPropagation() : typeof e.cancelBubble != "unknown" && (e.cancelBubble = !0), this.isPropagationStopped = mn);
			},
			persist: function() {},
			isPersistent: mn
		}), t;
	}
	var _n = {
		eventPhase: 0,
		bubbles: 0,
		cancelable: 0,
		timeStamp: function(e) {
			return e.timeStamp || Date.now();
		},
		defaultPrevented: 0,
		isTrusted: 0
	}, vn = gn(_n), H = h({}, _n, {
		view: 0,
		detail: 0
	}), yn = gn(H), bn, xn, Sn, Cn = h({}, H, {
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
		getModifierState: Pn,
		button: 0,
		buttons: 0,
		relatedTarget: function(e) {
			return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
		},
		movementX: function(e) {
			return "movementX" in e ? e.movementX : (e !== Sn && (Sn && e.type === "mousemove" ? (bn = e.screenX - Sn.screenX, xn = e.screenY - Sn.screenY) : xn = bn = 0, Sn = e), bn);
		},
		movementY: function(e) {
			return "movementY" in e ? e.movementY : xn;
		}
	}), wn = gn(Cn), Tn = gn(h({}, Cn, { dataTransfer: 0 })), En = gn(h({}, H, { relatedTarget: 0 })), Dn = gn(h({}, _n, {
		animationName: 0,
		elapsedTime: 0,
		pseudoElement: 0
	})), On = gn(h({}, _n, { clipboardData: function(e) {
		return "clipboardData" in e ? e.clipboardData : window.clipboardData;
	} })), kn = gn(h({}, _n, { data: 0 })), An = {
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
	}, jn = {
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
	}, Mn = {
		Alt: "altKey",
		Control: "ctrlKey",
		Meta: "metaKey",
		Shift: "shiftKey"
	};
	function Nn(e) {
		var t = this.nativeEvent;
		return t.getModifierState ? t.getModifierState(e) : (e = Mn[e]) ? !!t[e] : !1;
	}
	function Pn() {
		return Nn;
	}
	var Fn = gn(h({}, H, {
		key: function(e) {
			if (e.key) {
				var t = An[e.key] || e.key;
				if (t !== "Unidentified") return t;
			}
			return e.type === "keypress" ? (e = pn(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? jn[e.keyCode] || "Unidentified" : "";
		},
		code: 0,
		location: 0,
		ctrlKey: 0,
		shiftKey: 0,
		altKey: 0,
		metaKey: 0,
		repeat: 0,
		locale: 0,
		getModifierState: Pn,
		charCode: function(e) {
			return e.type === "keypress" ? pn(e) : 0;
		},
		keyCode: function(e) {
			return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
		},
		which: function(e) {
			return e.type === "keypress" ? pn(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
		}
	})), In = gn(h({}, Cn, {
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
	})), Ln = gn(h({}, H, {
		touches: 0,
		targetTouches: 0,
		changedTouches: 0,
		altKey: 0,
		metaKey: 0,
		ctrlKey: 0,
		shiftKey: 0,
		getModifierState: Pn
	})), Rn = gn(h({}, _n, {
		propertyName: 0,
		elapsedTime: 0,
		pseudoElement: 0
	})), zn = gn(h({}, Cn, {
		deltaX: function(e) {
			return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
		},
		deltaY: function(e) {
			return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
		},
		deltaZ: 0,
		deltaMode: 0
	})), Bn = gn(h({}, _n, {
		newState: 0,
		oldState: 0
	})), Vn = [
		9,
		13,
		27,
		32
	], Hn = on && "CompositionEvent" in window, Un = null;
	on && "documentMode" in document && (Un = document.documentMode);
	var Wn = on && "TextEvent" in window && !Un, Gn = on && (!Hn || Un && 8 < Un && 11 >= Un), Kn = " ", qn = !1;
	function Jn(e, t) {
		switch (e) {
			case "keyup": return Vn.indexOf(t.keyCode) !== -1;
			case "keydown": return t.keyCode !== 229;
			case "keypress":
			case "mousedown":
			case "focusout": return !0;
			default: return !1;
		}
	}
	function Yn(e) {
		return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
	}
	var Xn = !1;
	function Zn(e, t) {
		switch (e) {
			case "compositionend": return Yn(t);
			case "keypress": return t.which === 32 ? (qn = !0, Kn) : null;
			case "textInput": return e = t.data, e === Kn && qn ? null : e;
			default: return null;
		}
	}
	function Qn(e, t) {
		if (Xn) return e === "compositionend" || !Hn && Jn(e, t) ? (e = fn(), dn = un = ln = null, Xn = !1, e) : null;
		switch (e) {
			case "paste": return null;
			case "keypress":
				if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
					if (t.char && 1 < t.char.length) return t.char;
					if (t.which) return String.fromCharCode(t.which);
				}
				return null;
			case "compositionend": return Gn && t.locale !== "ko" ? null : t.data;
			default: return null;
		}
	}
	var $n = {
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
	function er(e) {
		var t = e && e.nodeName && e.nodeName.toLowerCase();
		return t === "input" ? !!$n[e.type] : t === "textarea";
	}
	function tr(e, t, n, r) {
		$t ? en ? en.push(r) : en = [r] : $t = r, t = Td(t, "onChange"), 0 < t.length && (n = new vn("onChange", "change", null, n, r), e.push({
			event: n,
			listeners: t
		}));
	}
	var nr = null, rr = null;
	function ir(e) {
		vd(e, 0);
	}
	function ar(e) {
		if (Nt(gt(e))) return e;
	}
	function or(e, t) {
		if (e === "change") return t;
	}
	var sr = !1;
	if (on) {
		var cr;
		if (on) {
			var U = "oninput" in document;
			if (!U) {
				var lr = document.createElement("div");
				lr.setAttribute("oninput", "return;"), U = typeof lr.oninput == "function";
			}
			cr = U;
		} else cr = !1;
		sr = cr && (!document.documentMode || 9 < document.documentMode);
	}
	function W() {
		nr && (nr.detachEvent("onpropertychange", G), rr = nr = null);
	}
	function G(e) {
		if (e.propertyName === "value" && ar(rr)) {
			var t = [];
			tr(t, rr, e, Qt(e)), rn(ir, t);
		}
	}
	function ur(e, t, n) {
		e === "focusin" ? (W(), nr = t, rr = n, nr.attachEvent("onpropertychange", G)) : e === "focusout" && W();
	}
	function dr(e) {
		if (e === "selectionchange" || e === "keyup" || e === "keydown") return ar(rr);
	}
	function fr(e, t) {
		if (e === "click") return ar(t);
	}
	function pr(e, t) {
		if (e === "input" || e === "change") return ar(t);
	}
	function K(e, t) {
		return e === t && (e !== 0 || 1 / e == 1 / t) || e !== e && t !== t;
	}
	var mr = typeof Object.is == "function" ? Object.is : K;
	function hr(e, t) {
		if (mr(e, t)) return !0;
		if (typeof e != "object" || !e || typeof t != "object" || !t) return !1;
		var n = Object.keys(e), r = Object.keys(t);
		if (n.length !== r.length) return !1;
		for (r = 0; r < n.length; r++) {
			var i = n[r];
			if (!Ce.call(t, i) || !mr(e[i], t[i])) return !1;
		}
		return !0;
	}
	function gr(e) {
		for (; e && e.firstChild;) e = e.firstChild;
		return e;
	}
	function _r(e, t) {
		var n = gr(e);
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
			n = gr(n);
		}
	}
	function vr(e, t) {
		return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? vr(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
	}
	function yr(e) {
		e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
		for (var t = Pt(e.document); t instanceof e.HTMLIFrameElement;) {
			try {
				var n = typeof t.contentWindow.location.href == "string";
			} catch {
				n = !1;
			}
			if (n) e = t.contentWindow;
			else break;
			t = Pt(e.document);
		}
		return t;
	}
	function br(e) {
		var t = e && e.nodeName && e.nodeName.toLowerCase();
		return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
	}
	var xr = on && "documentMode" in document && 11 >= document.documentMode, Sr = null, Cr = null, wr = null, Tr = !1;
	function Er(e, t, n) {
		var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
		Tr || Sr == null || Sr !== Pt(r) || (r = Sr, "selectionStart" in r && br(r) ? r = {
			start: r.selectionStart,
			end: r.selectionEnd
		} : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = {
			anchorNode: r.anchorNode,
			anchorOffset: r.anchorOffset,
			focusNode: r.focusNode,
			focusOffset: r.focusOffset
		}), wr && hr(wr, r) || (wr = r, r = Td(Cr, "onSelect"), 0 < r.length && (t = new vn("onSelect", "select", null, t, n), e.push({
			event: t,
			listeners: r
		}), t.target = Sr)));
	}
	function Dr(e, t) {
		var n = {};
		return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
	}
	var Or = {
		animationend: Dr("Animation", "AnimationEnd"),
		animationiteration: Dr("Animation", "AnimationIteration"),
		animationstart: Dr("Animation", "AnimationStart"),
		transitionrun: Dr("Transition", "TransitionRun"),
		transitionstart: Dr("Transition", "TransitionStart"),
		transitioncancel: Dr("Transition", "TransitionCancel"),
		transitionend: Dr("Transition", "TransitionEnd")
	}, kr = {}, Ar = {};
	on && (Ar = document.createElement("div").style, "AnimationEvent" in window || (delete Or.animationend.animation, delete Or.animationiteration.animation, delete Or.animationstart.animation), "TransitionEvent" in window || delete Or.transitionend.transition);
	function jr(e) {
		if (kr[e]) return kr[e];
		if (!Or[e]) return e;
		var t = Or[e], n;
		for (n in t) if (t.hasOwnProperty(n) && n in Ar) return kr[e] = t[n];
		return e;
	}
	var Mr = jr("animationend"), Nr = jr("animationiteration"), Pr = jr("animationstart"), Fr = jr("transitionrun"), Ir = jr("transitionstart"), Lr = jr("transitioncancel"), Rr = jr("transitionend"), zr = /* @__PURE__ */ new Map(), Br = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
	Br.push("scrollEnd");
	function Vr(e, t) {
		zr.set(e, t), bt(t, [e]);
	}
	var Hr = typeof reportError == "function" ? reportError : function(e) {
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
	}, Ur = [], Wr = 0, Gr = 0;
	function Kr() {
		for (var e = Wr, t = Gr = Wr = 0; t < e;) {
			var n = Ur[t];
			Ur[t++] = null;
			var r = Ur[t];
			Ur[t++] = null;
			var i = Ur[t];
			Ur[t++] = null;
			var a = Ur[t];
			if (Ur[t++] = null, r !== null && i !== null) {
				var o = r.pending;
				o === null ? i.next = i : (i.next = o.next, o.next = i), r.pending = i;
			}
			a !== 0 && Xr(n, i, a);
		}
	}
	function qr(e, t, n, r) {
		Ur[Wr++] = e, Ur[Wr++] = t, Ur[Wr++] = n, Ur[Wr++] = r, Gr |= r, e.lanes |= r, e = e.alternate, e !== null && (e.lanes |= r);
	}
	function Jr(e, t, n, r) {
		return qr(e, t, n, r), q(e);
	}
	function Yr(e, t) {
		return qr(e, null, null, t), q(e);
	}
	function Xr(e, t, n) {
		e.lanes |= n;
		var r = e.alternate;
		r !== null && (r.lanes |= n);
		for (var i = !1, a = e.return; a !== null;) a.childLanes |= n, r = a.alternate, r !== null && (r.childLanes |= n), a.tag === 22 && (e = a.stateNode, e === null || e._visibility & 1 || (i = !0)), e = a, a = a.return;
		return e.tag === 3 ? (a = e.stateNode, i && t !== null && (i = 31 - ze(n), e = a.hiddenUpdates, r = e[i], r === null ? e[i] = [t] : r.push(t), t.lane = n | 536870912), a) : null;
	}
	function q(e) {
		if (50 < lu) throw lu = 0, uu = null, Error(i(185));
		for (var t = e.return; t !== null;) e = t, t = e.return;
		return e.tag === 3 ? e.stateNode : null;
	}
	var Zr = {};
	function Qr(e, t, n, r) {
		this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
	}
	function $r(e, t, n, r) {
		return new Qr(e, t, n, r);
	}
	function ei(e) {
		return e = e.prototype, !(!e || !e.isReactComponent);
	}
	function ti(e, t) {
		var n = e.alternate;
		return n === null ? (n = $r(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 65011712, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : {
			lanes: t.lanes,
			firstContext: t.firstContext
		}, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n.refCleanup = e.refCleanup, n;
	}
	function ni(e, t) {
		e.flags &= 65011714;
		var n = e.alternate;
		return n === null ? (e.childLanes = 0, e.lanes = t, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = n.childLanes, e.lanes = n.lanes, e.child = n.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = n.memoizedProps, e.memoizedState = n.memoizedState, e.updateQueue = n.updateQueue, e.type = n.type, t = n.dependencies, e.dependencies = t === null ? null : {
			lanes: t.lanes,
			firstContext: t.firstContext
		}), e;
	}
	function ri(e, t, n, r, a, o) {
		var s = 0;
		if (r = e, typeof e == "function") ei(e) && (s = 1);
		else if (typeof e == "string") s = Uf(e, n, de.current) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
		else a: switch (e) {
			case D: return e = $r(31, n, t, a), e.elementType = D, e.lanes = o, e;
			case y: return ii(n.children, a, o, t);
			case b:
				s = 8, a |= 24;
				break;
			case x: return e = $r(12, n, t, a | 2), e.elementType = x, e.lanes = o, e;
			case w: return e = $r(13, n, t, a), e.elementType = w, e.lanes = o, e;
			case T: return e = $r(19, n, t, a), e.elementType = T, e.lanes = o, e;
			default:
				if (typeof e == "object" && e) switch (e.$$typeof) {
					case ee:
						s = 10;
						break a;
					case S:
						s = 9;
						break a;
					case C:
						s = 11;
						break a;
					case te:
						s = 14;
						break a;
					case E:
						s = 16, r = null;
						break a;
				}
				s = 29, n = Error(i(130, e === null ? "null" : typeof e, "")), r = null;
		}
		return t = $r(s, n, t, a), t.elementType = e, t.type = r, t.lanes = o, t;
	}
	function ii(e, t, n, r) {
		return e = $r(7, e, r, t), e.lanes = n, e;
	}
	function ai(e, t, n) {
		return e = $r(6, e, null, t), e.lanes = n, e;
	}
	function oi(e) {
		var t = $r(18, null, null, 0);
		return t.stateNode = e, t;
	}
	function si(e, t, n) {
		return t = $r(4, e.children === null ? [] : e.children, e.key, t), t.lanes = n, t.stateNode = {
			containerInfo: e.containerInfo,
			pendingChildren: null,
			implementation: e.implementation
		}, t;
	}
	var ci = /* @__PURE__ */ new WeakMap();
	function li(e, t) {
		if (typeof e == "object" && e) {
			var n = ci.get(e);
			return n === void 0 ? (t = {
				value: e,
				source: t,
				stack: F(t)
			}, ci.set(e, t), t) : n;
		}
		return {
			value: e,
			source: t,
			stack: F(t)
		};
	}
	var ui = [], di = 0, fi = null, pi = 0, mi = [], hi = 0, gi = null, _i = 1, vi = "";
	function yi(e, t) {
		ui[di++] = pi, ui[di++] = fi, fi = e, pi = t;
	}
	function bi(e, t, n) {
		mi[hi++] = _i, mi[hi++] = vi, mi[hi++] = gi, gi = e;
		var r = _i;
		e = vi;
		var i = 32 - ze(r) - 1;
		r &= ~(1 << i), n += 1;
		var a = 32 - ze(t) + i;
		if (30 < a) {
			var o = i - i % 5;
			a = (r & (1 << o) - 1).toString(32), r >>= o, i -= o, _i = 1 << 32 - ze(t) + i | n << i | r, vi = a + e;
		} else _i = 1 << a | n << i | r, vi = e;
	}
	function xi(e) {
		e.return !== null && (yi(e, 1), bi(e, 1, 0));
	}
	function Si(e) {
		for (; e === fi;) fi = ui[--di], ui[di] = null, pi = ui[--di], ui[di] = null;
		for (; e === gi;) gi = mi[--hi], mi[hi] = null, vi = mi[--hi], mi[hi] = null, _i = mi[--hi], mi[hi] = null;
	}
	function Ci(e, t) {
		mi[hi++] = _i, mi[hi++] = vi, mi[hi++] = gi, _i = t.id, vi = t.overflow, gi = e;
	}
	var wi = null, Ti = null, J = !1, Ei = null, Di = !1, Oi = Error(i(519));
	function ki(e) {
		throw Fi(li(Error(i(418, 1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML", "")), e)), Oi;
	}
	function Ai(e) {
		var t = e.stateNode, n = e.type, r = e.memoizedProps;
		switch (t[R] = e, t[st] = r, n) {
			case "dialog":
				$("cancel", t), $("close", t);
				break;
			case "iframe":
			case "object":
			case "embed":
				$("load", t);
				break;
			case "video":
			case "audio":
				for (n = 0; n < gd.length; n++) $(gd[n], t);
				break;
			case "source":
				$("error", t);
				break;
			case "img":
			case "image":
			case "link":
				$("error", t), $("load", t);
				break;
			case "details":
				$("toggle", t);
				break;
			case "input":
				$("invalid", t), Rt(t, r.value, r.defaultValue, r.checked, r.defaultChecked, r.type, r.name, !0);
				break;
			case "select":
				$("invalid", t);
				break;
			case "textarea": $("invalid", t), Ht(t, r.value, r.defaultValue, r.children);
		}
		n = r.children, typeof n != "string" && typeof n != "number" && typeof n != "bigint" || t.textContent === "" + n || !0 === r.suppressHydrationWarning || jd(t.textContent, n) ? (r.popover != null && ($("beforetoggle", t), $("toggle", t)), r.onScroll != null && $("scroll", t), r.onScrollEnd != null && $("scrollend", t), r.onClick != null && (t.onclick = Xt), t = !0) : t = !1, t || ki(e, !0);
	}
	function ji(e) {
		for (wi = e.return; wi;) switch (wi.tag) {
			case 5:
			case 31:
			case 13:
				Di = !1;
				return;
			case 27:
			case 3:
				Di = !0;
				return;
			default: wi = wi.return;
		}
	}
	function Mi(e) {
		if (e !== wi) return !1;
		if (!J) return ji(e), J = !0, !1;
		var t = e.tag, n;
		if ((n = t !== 3 && t !== 27) && ((n = t === 5) && (n = e.type, n = !(n !== "form" && n !== "button") || Ud(e.type, e.memoizedProps)), n = !n), n && Ti && ki(e), ji(e), t === 13) {
			if (e = e.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(i(317));
			Ti = uf(e);
		} else if (t === 31) {
			if (e = e.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(i(317));
			Ti = uf(e);
		} else t === 27 ? (t = Ti, Zd(e.type) ? (e = lf, lf = null, Ti = e) : Ti = t) : Ti = wi ? cf(e.stateNode.nextSibling) : null;
		return !0;
	}
	function Ni() {
		Ti = wi = null, J = !1;
	}
	function Pi() {
		var e = Ei;
		return e !== null && (Yl === null ? Yl = e : Yl.push.apply(Yl, e), Ei = null), e;
	}
	function Fi(e) {
		Ei === null ? Ei = [e] : Ei.push(e);
	}
	var Ii = ue(null), Li = null, Ri = null;
	function zi(e, t, n) {
		M(Ii, t._currentValue), t._currentValue = n;
	}
	function Bi(e) {
		e._currentValue = Ii.current, j(Ii);
	}
	function Vi(e, t, n) {
		for (; e !== null;) {
			var r = e.alternate;
			if ((e.childLanes & t) === t ? r !== null && (r.childLanes & t) !== t && (r.childLanes |= t) : (e.childLanes |= t, r !== null && (r.childLanes |= t)), e === n) break;
			e = e.return;
		}
	}
	function Hi(e, t, n, r) {
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
						o.lanes |= n, c = o.alternate, c !== null && (c.lanes |= n), Vi(o.return, n, e), r || (s = null);
						break a;
					}
					o = c.next;
				}
			} else if (a.tag === 18) {
				if (s = a.return, s === null) throw Error(i(341));
				s.lanes |= n, o = s.alternate, o !== null && (o.lanes |= n), Vi(s, n, e), s = null;
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
	function Ui(e, t, n, r) {
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
					mr(a.pendingProps.value, s.value) || (e === null ? e = [c] : e.push(c));
				}
			} else if (a === me.current) {
				if (s = a.alternate, s === null) throw Error(i(387));
				s.memoizedState.memoizedState !== a.memoizedState.memoizedState && (e === null ? e = [Qf] : e.push(Qf));
			}
			a = a.return;
		}
		e !== null && Hi(t, e, n, r), t.flags |= 262144;
	}
	function Wi(e) {
		for (e = e.firstContext; e !== null;) {
			if (!mr(e.context._currentValue, e.memoizedValue)) return !0;
			e = e.next;
		}
		return !1;
	}
	function Gi(e) {
		Li = e, Ri = null, e = e.dependencies, e !== null && (e.firstContext = null);
	}
	function Ki(e) {
		return Ji(Li, e);
	}
	function qi(e, t) {
		return Li === null && Gi(e), Ji(e, t);
	}
	function Ji(e, t) {
		var n = t._currentValue;
		if (t = {
			context: t,
			memoizedValue: n,
			next: null
		}, Ri === null) {
			if (e === null) throw Error(i(308));
			Ri = t, e.dependencies = {
				lanes: 0,
				firstContext: t
			}, e.flags |= 524288;
		} else Ri = Ri.next = t;
		return n;
	}
	var Yi = typeof AbortController < "u" ? AbortController : function() {
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
	}, Xi = t.unstable_scheduleCallback, Zi = t.unstable_NormalPriority, Qi = {
		$$typeof: ee,
		Consumer: null,
		Provider: null,
		_currentValue: null,
		_currentValue2: null,
		_threadCount: 0
	};
	function $i() {
		return {
			controller: new Yi(),
			data: /* @__PURE__ */ new Map(),
			refCount: 0
		};
	}
	function ea(e) {
		e.refCount--, e.refCount === 0 && Xi(Zi, function() {
			e.controller.abort();
		});
	}
	var ta = null, na = 0, ra = 0, ia = null;
	function aa(e, t) {
		if (ta === null) {
			var n = ta = [];
			na = 0, ra = ud(), ia = {
				status: "pending",
				value: void 0,
				then: function(e) {
					n.push(e);
				}
			};
		}
		return na++, t.then(oa, oa), t;
	}
	function oa() {
		if (--na === 0 && ta !== null) {
			ia !== null && (ia.status = "fulfilled");
			var e = ta;
			ta = null, ra = 0, ia = null;
			for (var t = 0; t < e.length; t++) (0, e[t])();
		}
	}
	function sa(e, t) {
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
	var ca = k.S;
	k.S = function(e, t) {
		Ql = I(), typeof t == "object" && t && typeof t.then == "function" && aa(e, t), ca !== null && ca(e, t);
	};
	var la = ue(null);
	function ua() {
		var e = la.current;
		return e === null ? Fl.pooledCache : e;
	}
	function da(e, t) {
		t === null ? M(la, la.current) : M(la, t.pool);
	}
	function fa() {
		var e = ua();
		return e === null ? null : {
			parent: Qi._currentValue,
			pool: e
		};
	}
	var pa = Error(i(460)), ma = Error(i(474)), ha = Error(i(542)), ga = { then: function() {} };
	function _a(e) {
		return e = e.status, e === "fulfilled" || e === "rejected";
	}
	function va(e, t, n) {
		switch (n = e[n], n === void 0 ? e.push(t) : n !== t && (t.then(Xt, Xt), t = n), t.status) {
			case "fulfilled": return t.value;
			case "rejected": throw e = t.reason, Sa(e), e;
			default:
				if (typeof t.status == "string") t.then(Xt, Xt);
				else {
					if (e = Fl, e !== null && 100 < e.shellSuspendCounter) throw Error(i(482));
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
					case "rejected": throw e = t.reason, Sa(e), e;
				}
				throw ba = t, pa;
		}
	}
	function ya(e) {
		try {
			var t = e._init;
			return t(e._payload);
		} catch (e) {
			throw typeof e == "object" && e && typeof e.then == "function" ? (ba = e, pa) : e;
		}
	}
	var ba = null;
	function xa() {
		if (ba === null) throw Error(i(459));
		var e = ba;
		return ba = null, e;
	}
	function Sa(e) {
		if (e === pa || e === ha) throw Error(i(483));
	}
	var Ca = null, wa = 0;
	function Ta(e) {
		var t = wa;
		return wa += 1, Ca === null && (Ca = []), va(Ca, e, t);
	}
	function Ea(e, t) {
		t = t.props.ref, e.ref = t === void 0 ? null : t;
	}
	function Da(e, t) {
		throw t.$$typeof === g ? Error(i(525)) : (e = Object.prototype.toString.call(t), Error(i(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e)));
	}
	function Oa(e) {
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
			return e = ti(e, t), e.index = 0, e.sibling = null, e;
		}
		function o(t, n, r) {
			return t.index = r, e ? (r = t.alternate, r === null ? (t.flags |= 67108866, n) : (r = r.index, r < n ? (t.flags |= 67108866, n) : r)) : (t.flags |= 1048576, n);
		}
		function s(t) {
			return e && t.alternate === null && (t.flags |= 67108866), t;
		}
		function c(e, t, n, r) {
			return t === null || t.tag !== 6 ? (t = ai(n, e.mode, r), t.return = e, t) : (t = a(t, n), t.return = e, t);
		}
		function l(e, t, n, r) {
			var i = n.type;
			return i === y ? d(e, t, n.props.children, r, n.key) : t !== null && (t.elementType === i || typeof i == "object" && i && i.$$typeof === E && ya(i) === t.type) ? (t = a(t, n.props), Ea(t, n), t.return = e, t) : (t = ri(n.type, n.key, n.props, null, e.mode, r), Ea(t, n), t.return = e, t);
		}
		function u(e, t, n, r) {
			return t === null || t.tag !== 4 || t.stateNode.containerInfo !== n.containerInfo || t.stateNode.implementation !== n.implementation ? (t = si(n, e.mode, r), t.return = e, t) : (t = a(t, n.children || []), t.return = e, t);
		}
		function d(e, t, n, r, i) {
			return t === null || t.tag !== 7 ? (t = ii(n, e.mode, r, i), t.return = e, t) : (t = a(t, n), t.return = e, t);
		}
		function f(e, t, n) {
			if (typeof t == "string" && t !== "" || typeof t == "number" || typeof t == "bigint") return t = ai("" + t, e.mode, n), t.return = e, t;
			if (typeof t == "object" && t) {
				switch (t.$$typeof) {
					case _: return n = ri(t.type, t.key, t.props, null, e.mode, n), Ea(n, t), n.return = e, n;
					case v: return t = si(t, e.mode, n), t.return = e, t;
					case E: return t = ya(t), f(e, t, n);
				}
				if (oe(t) || ie(t)) return t = ii(t, e.mode, n, null), t.return = e, t;
				if (typeof t.then == "function") return f(e, Ta(t), n);
				if (t.$$typeof === ee) return f(e, qi(e, t), n);
				Da(e, t);
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
					case E: return n = ya(n), p(e, t, n, r);
				}
				if (oe(n) || ie(n)) return i === null ? d(e, t, n, r, null) : null;
				if (typeof n.then == "function") return p(e, t, Ta(n), r);
				if (n.$$typeof === ee) return p(e, t, qi(e, n), r);
				Da(e, n);
			}
			return null;
		}
		function m(e, t, n, r, i) {
			if (typeof r == "string" && r !== "" || typeof r == "number" || typeof r == "bigint") return e = e.get(n) || null, c(t, e, "" + r, i);
			if (typeof r == "object" && r) {
				switch (r.$$typeof) {
					case _: return e = e.get(r.key === null ? n : r.key) || null, l(t, e, r, i);
					case v: return e = e.get(r.key === null ? n : r.key) || null, u(t, e, r, i);
					case E: return r = ya(r), m(e, t, n, r, i);
				}
				if (oe(r) || ie(r)) return e = e.get(n) || null, d(t, e, r, i, null);
				if (typeof r.then == "function") return m(e, t, n, Ta(r), i);
				if (r.$$typeof === ee) return m(e, t, n, qi(t, r), i);
				Da(t, r);
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
			if (h === s.length) return n(i, d), J && yi(i, h), l;
			if (d === null) {
				for (; h < s.length; h++) d = f(i, s[h], c), d !== null && (a = o(d, a, h), u === null ? l = d : u.sibling = d, u = d);
				return J && yi(i, h), l;
			}
			for (d = r(d); h < s.length; h++) g = m(d, i, h, s[h], c), g !== null && (e && g.alternate !== null && d.delete(g.key === null ? h : g.key), a = o(g, a, h), u === null ? l = g : u.sibling = g, u = g);
			return e && d.forEach(function(e) {
				return t(i, e);
			}), J && yi(i, h), l;
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
			if (v.done) return n(a, h), J && yi(a, g), u;
			if (h === null) {
				for (; !v.done; g++, v = c.next()) v = f(a, v.value, l), v !== null && (s = o(v, s, g), d === null ? u = v : d.sibling = v, d = v);
				return J && yi(a, g), u;
			}
			for (h = r(h); !v.done; g++, v = c.next()) v = m(h, a, g, v.value, l), v !== null && (e && v.alternate !== null && h.delete(v.key === null ? g : v.key), s = o(v, s, g), d === null ? u = v : d.sibling = v, d = v);
			return e && h.forEach(function(e) {
				return t(a, e);
			}), J && yi(a, g), u;
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
									} else if (r.elementType === l || typeof l == "object" && l && l.$$typeof === E && ya(l) === r.type) {
										n(e, r.sibling), c = a(r, o.props), Ea(c, o), c.return = e, e = c;
										break a;
									}
									n(e, r);
									break;
								} else t(e, r);
								r = r.sibling;
							}
							o.type === y ? (c = ii(o.props.children, e.mode, c, o.key), c.return = e, e = c) : (c = ri(o.type, o.key, o.props, null, e.mode, c), Ea(c, o), c.return = e, e = c);
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
							c = si(o, e.mode, c), c.return = e, e = c;
						}
						return s(e);
					case E: return o = ya(o), b(e, r, o, c);
				}
				if (oe(o)) return h(e, r, o, c);
				if (ie(o)) {
					if (l = ie(o), typeof l != "function") throw Error(i(150));
					return o = l.call(o), g(e, r, o, c);
				}
				if (typeof o.then == "function") return b(e, r, Ta(o), c);
				if (o.$$typeof === ee) return b(e, r, qi(e, o), c);
				Da(e, o);
			}
			return typeof o == "string" && o !== "" || typeof o == "number" || typeof o == "bigint" ? (o = "" + o, r !== null && r.tag === 6 ? (n(e, r.sibling), c = a(r, o), c.return = e, e = c) : (n(e, r), c = ai(o, e.mode, c), c.return = e, e = c), s(e)) : n(e, r);
		}
		return function(e, t, n, r) {
			try {
				wa = 0;
				var i = b(e, t, n, r);
				return Ca = null, i;
			} catch (t) {
				if (t === pa || t === ha) throw t;
				var a = $r(29, t, null, e.mode);
				return a.lanes = r, a.return = e, a;
			}
		};
	}
	var ka = Oa(!0), Aa = Oa(!1), ja = !1;
	function Ma(e) {
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
	function Na(e, t) {
		e = e.updateQueue, t.updateQueue === e && (t.updateQueue = {
			baseState: e.baseState,
			firstBaseUpdate: e.firstBaseUpdate,
			lastBaseUpdate: e.lastBaseUpdate,
			shared: e.shared,
			callbacks: null
		});
	}
	function Pa(e) {
		return {
			lane: e,
			tag: 0,
			payload: null,
			callback: null,
			next: null
		};
	}
	function Fa(e, t, n) {
		var r = e.updateQueue;
		if (r === null) return null;
		if (r = r.shared, X & 2) {
			var i = r.pending;
			return i === null ? t.next = t : (t.next = i.next, i.next = t), r.pending = t, t = q(e), Xr(e, null, n), t;
		}
		return qr(e, r, t, n), q(e);
	}
	function Ia(e, t, n) {
		if (t = t.updateQueue, t !== null && (t = t.shared, n & 4194048)) {
			var r = t.lanes;
			r &= e.pendingLanes, n |= r, t.lanes = n, tt(e, n);
		}
	}
	function La(e, t) {
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
	var Ra = !1;
	function za() {
		if (Ra) {
			var e = ia;
			if (e !== null) throw e;
		}
	}
	function Ba(e, t, n, r) {
		Ra = !1;
		var i = e.updateQueue;
		ja = !1;
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
				if (p ? (Q & f) === f : (r & f) === f) {
					f !== 0 && f === ra && (Ra = !0), u !== null && (u = u.next = {
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
							case 2: ja = !0;
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
			u === null && (c = d), i.baseState = c, i.firstBaseUpdate = l, i.lastBaseUpdate = u, a === null && (i.shared.lanes = 0), Ul |= o, e.lanes = o, e.memoizedState = d;
		}
	}
	function Va(e, t) {
		if (typeof e != "function") throw Error(i(191, e));
		e.call(t);
	}
	function Ha(e, t) {
		var n = e.callbacks;
		if (n !== null) for (e.callbacks = null, e = 0; e < n.length; e++) Va(n[e], t);
	}
	var Ua = ue(null), Wa = ue(0);
	function Ga(e, t) {
		e = Vl, M(Wa, e), M(Ua, t), Vl = e | t.baseLanes;
	}
	function Ka() {
		M(Wa, Vl), M(Ua, Ua.current);
	}
	function qa() {
		Vl = Wa.current, j(Ua), j(Wa);
	}
	var Ja = ue(null), Ya = null;
	function Xa(e) {
		var t = e.alternate;
		M(to, to.current & 1), M(Ja, e), Ya === null && (t === null || Ua.current !== null || t.memoizedState !== null) && (Ya = e);
	}
	function Za(e) {
		M(to, to.current), M(Ja, e), Ya === null && (Ya = e);
	}
	function Qa(e) {
		e.tag === 22 ? (M(to, to.current), M(Ja, e), Ya === null && (Ya = e)) : $a(e);
	}
	function $a() {
		M(to, to.current), M(Ja, Ja.current);
	}
	function eo(e) {
		j(Ja), Ya === e && (Ya = null), j(to);
	}
	var to = ue(0);
	function no(e) {
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
	var ro = 0, Y = null, io = null, ao = null, oo = !1, so = !1, co = !1, lo = 0, uo = 0, fo = null, po = 0;
	function mo() {
		throw Error(i(321));
	}
	function ho(e, t) {
		if (t === null) return !1;
		for (var n = 0; n < t.length && n < e.length; n++) if (!mr(e[n], t[n])) return !1;
		return !0;
	}
	function go(e, t, n, r, i, a) {
		return ro = a, Y = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, k.H = e === null || e.memoizedState === null ? Ns : Ps, co = !1, a = n(r, i), co = !1, so && (a = vo(t, n, r, i)), _o(e), a;
	}
	function _o(e) {
		k.H = Ms;
		var t = io !== null && io.next !== null;
		if (ro = 0, ao = io = Y = null, oo = !1, uo = 0, fo = null, t) throw Error(i(300));
		e === null || Zs || (e = e.dependencies, e !== null && Wi(e) && (Zs = !0));
	}
	function vo(e, t, n, r) {
		Y = e;
		var a = 0;
		do {
			if (so && (fo = null), uo = 0, so = !1, 25 <= a) throw Error(i(301));
			if (a += 1, ao = io = null, e.updateQueue != null) {
				var o = e.updateQueue;
				o.lastEffect = null, o.events = null, o.stores = null, o.memoCache != null && (o.memoCache.index = 0);
			}
			k.H = Fs, o = t(n, r);
		} while (so);
		return o;
	}
	function yo() {
		var e = k.H, t = e.useState()[0];
		return t = typeof t.then == "function" ? Eo(t) : t, e = e.useState()[0], (io === null ? null : io.memoizedState) !== e && (Y.flags |= 1024), t;
	}
	function bo() {
		var e = lo !== 0;
		return lo = 0, e;
	}
	function xo(e, t, n) {
		t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~n;
	}
	function So(e) {
		if (oo) {
			for (e = e.memoizedState; e !== null;) {
				var t = e.queue;
				t !== null && (t.pending = null), e = e.next;
			}
			oo = !1;
		}
		ro = 0, ao = io = Y = null, so = !1, uo = lo = 0, fo = null;
	}
	function Co() {
		var e = {
			memoizedState: null,
			baseState: null,
			baseQueue: null,
			queue: null,
			next: null
		};
		return ao === null ? Y.memoizedState = ao = e : ao = ao.next = e, ao;
	}
	function wo() {
		if (io === null) {
			var e = Y.alternate;
			e = e === null ? null : e.memoizedState;
		} else e = io.next;
		var t = ao === null ? Y.memoizedState : ao.next;
		if (t !== null) ao = t, io = e;
		else {
			if (e === null) throw Y.alternate === null ? Error(i(467)) : Error(i(310));
			io = e, e = {
				memoizedState: io.memoizedState,
				baseState: io.baseState,
				baseQueue: io.baseQueue,
				queue: io.queue,
				next: null
			}, ao === null ? Y.memoizedState = ao = e : ao = ao.next = e;
		}
		return ao;
	}
	function To() {
		return {
			lastEffect: null,
			events: null,
			stores: null,
			memoCache: null
		};
	}
	function Eo(e) {
		var t = uo;
		return uo += 1, fo === null && (fo = []), e = va(fo, e, t), t = Y, (ao === null ? t.memoizedState : ao.next) === null && (t = t.alternate, k.H = t === null || t.memoizedState === null ? Ns : Ps), e;
	}
	function Do(e) {
		if (typeof e == "object" && e) {
			if (typeof e.then == "function") return Eo(e);
			if (e.$$typeof === ee) return Ki(e);
		}
		throw Error(i(438, String(e)));
	}
	function Oo(e) {
		var t = null, n = Y.updateQueue;
		if (n !== null && (t = n.memoCache), t == null) {
			var r = Y.alternate;
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
		}, n === null && (n = To(), Y.updateQueue = n), n.memoCache = t, n = t.data[t.index], n === void 0) for (n = t.data[t.index] = Array(e), r = 0; r < e; r++) n[r] = ne;
		return t.index++, n;
	}
	function ko(e, t) {
		return typeof t == "function" ? t(e) : t;
	}
	function Ao(e) {
		return jo(wo(), io, e);
	}
	function jo(e, t, n) {
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
				if (f === u.lane ? (ro & f) === f : (Q & f) === f) {
					var p = u.revertLane;
					if (p === 0) l !== null && (l = l.next = {
						lane: 0,
						revertLane: 0,
						gesture: null,
						action: u.action,
						hasEagerState: u.hasEagerState,
						eagerState: u.eagerState,
						next: null
					}), f === ra && (d = !0);
					else if ((ro & p) === p) {
						u = u.next, p === ra && (d = !0);
						continue;
					} else f = {
						lane: 0,
						revertLane: u.revertLane,
						gesture: null,
						action: u.action,
						hasEagerState: u.hasEagerState,
						eagerState: u.eagerState,
						next: null
					}, l === null ? (c = l = f, s = o) : l = l.next = f, Y.lanes |= p, Ul |= p;
					f = u.action, co && n(o, f), o = u.hasEagerState ? u.eagerState : n(o, f);
				} else p = {
					lane: f,
					revertLane: u.revertLane,
					gesture: u.gesture,
					action: u.action,
					hasEagerState: u.hasEagerState,
					eagerState: u.eagerState,
					next: null
				}, l === null ? (c = l = p, s = o) : l = l.next = p, Y.lanes |= f, Ul |= f;
				u = u.next;
			} while (u !== null && u !== t);
			if (l === null ? s = o : l.next = c, !mr(o, e.memoizedState) && (Zs = !0, d && (n = ia, n !== null))) throw n;
			e.memoizedState = o, e.baseState = s, e.baseQueue = l, r.lastRenderedState = o;
		}
		return a === null && (r.lanes = 0), [e.memoizedState, r.dispatch];
	}
	function Mo(e) {
		var t = wo(), n = t.queue;
		if (n === null) throw Error(i(311));
		n.lastRenderedReducer = e;
		var r = n.dispatch, a = n.pending, o = t.memoizedState;
		if (a !== null) {
			n.pending = null;
			var s = a = a.next;
			do
				o = e(o, s.action), s = s.next;
			while (s !== a);
			mr(o, t.memoizedState) || (Zs = !0), t.memoizedState = o, t.baseQueue === null && (t.baseState = o), n.lastRenderedState = o;
		}
		return [o, r];
	}
	function No(e, t, n) {
		var r = Y, a = wo(), o = J;
		if (o) {
			if (n === void 0) throw Error(i(407));
			n = n();
		} else n = t();
		var s = !mr((io || a).memoizedState, n);
		if (s && (a.memoizedState = n, Zs = !0), a = a.queue, is(Io.bind(null, r, a, e), [e]), a.getSnapshot !== t || s || ao !== null && ao.memoizedState.tag & 1) {
			if (r.flags |= 2048, $o(9, { destroy: void 0 }, Fo.bind(null, r, a, n, t), null), Fl === null) throw Error(i(349));
			o || ro & 127 || Po(r, t, n);
		}
		return n;
	}
	function Po(e, t, n) {
		e.flags |= 16384, e = {
			getSnapshot: t,
			value: n
		}, t = Y.updateQueue, t === null ? (t = To(), Y.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
	}
	function Fo(e, t, n, r) {
		t.value = n, t.getSnapshot = r, Lo(t) && Ro(e);
	}
	function Io(e, t, n) {
		return n(function() {
			Lo(t) && Ro(e);
		});
	}
	function Lo(e) {
		var t = e.getSnapshot;
		e = e.value;
		try {
			var n = t();
			return !mr(e, n);
		} catch {
			return !0;
		}
	}
	function Ro(e) {
		var t = Yr(e, 2);
		t !== null && pu(t, e, 2);
	}
	function zo(e) {
		var t = Co();
		if (typeof e == "function") {
			var n = e;
			if (e = n(), co) {
				Re(!0);
				try {
					n();
				} finally {
					Re(!1);
				}
			}
		}
		return t.memoizedState = t.baseState = e, t.queue = {
			pending: null,
			lanes: 0,
			dispatch: null,
			lastRenderedReducer: ko,
			lastRenderedState: e
		}, t;
	}
	function Bo(e, t, n, r) {
		return e.baseState = n, jo(e, io, typeof r == "function" ? r : ko);
	}
	function Vo(e, t, n, r, a) {
		if (ks(e)) throw Error(i(485));
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
			k.T === null ? o.isTransition = !1 : n(!0), r(o), n = t.pending, n === null ? (o.next = t.pending = o, Ho(t, o)) : (o.next = n.next, t.pending = n.next = o);
		}
	}
	function Ho(e, t) {
		var n = t.action, r = t.payload, i = e.state;
		if (t.isTransition) {
			var a = k.T, o = {};
			k.T = o;
			try {
				var s = n(i, r), c = k.S;
				c !== null && c(o, s), Uo(e, t, s);
			} catch (n) {
				Go(e, t, n);
			} finally {
				a !== null && o.types !== null && (a.types = o.types), k.T = a;
			}
		} else try {
			a = n(i, r), Uo(e, t, a);
		} catch (n) {
			Go(e, t, n);
		}
	}
	function Uo(e, t, n) {
		typeof n == "object" && n && typeof n.then == "function" ? n.then(function(n) {
			Wo(e, t, n);
		}, function(n) {
			return Go(e, t, n);
		}) : Wo(e, t, n);
	}
	function Wo(e, t, n) {
		t.status = "fulfilled", t.value = n, Ko(t), e.state = n, t = e.pending, t !== null && (n = t.next, n === t ? e.pending = null : (n = n.next, t.next = n, Ho(e, n)));
	}
	function Go(e, t, n) {
		var r = e.pending;
		if (e.pending = null, r !== null) {
			r = r.next;
			do
				t.status = "rejected", t.reason = n, Ko(t), t = t.next;
			while (t !== r);
		}
		e.action = null;
	}
	function Ko(e) {
		e = e.listeners;
		for (var t = 0; t < e.length; t++) (0, e[t])();
	}
	function qo(e, t) {
		return t;
	}
	function Jo(e, t) {
		if (J) {
			var n = Fl.formState;
			if (n !== null) {
				a: {
					var r = Y;
					if (J) {
						if (Ti) {
							b: {
								for (var i = Ti, a = Di; i.nodeType !== 8;) {
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
								Ti = cf(i.nextSibling), r = i.data === "F!";
								break a;
							}
						}
						ki(r);
					}
					r = !1;
				}
				r && (t = n[0]);
			}
		}
		return n = Co(), n.memoizedState = n.baseState = t, r = {
			pending: null,
			lanes: 0,
			dispatch: null,
			lastRenderedReducer: qo,
			lastRenderedState: t
		}, n.queue = r, n = Es.bind(null, Y, r), r.dispatch = n, r = zo(!1), a = Os.bind(null, Y, !1, r.queue), r = Co(), i = {
			state: t,
			dispatch: null,
			action: e,
			pending: null
		}, r.queue = i, n = Vo.bind(null, Y, i, a, n), i.dispatch = n, r.memoizedState = e, [
			t,
			n,
			!1
		];
	}
	function Yo(e) {
		return Xo(wo(), io, e);
	}
	function Xo(e, t, n) {
		if (t = jo(e, t, qo)[0], e = Ao(ko)[0], typeof t == "object" && t && typeof t.then == "function") try {
			var r = Eo(t);
		} catch (e) {
			throw e === pa ? ha : e;
		}
		else r = t;
		t = wo();
		var i = t.queue, a = i.dispatch;
		return n !== t.memoizedState && (Y.flags |= 2048, $o(9, { destroy: void 0 }, Zo.bind(null, i, n), null)), [
			r,
			a,
			e
		];
	}
	function Zo(e, t) {
		e.action = t;
	}
	function Qo(e) {
		var t = wo(), n = io;
		if (n !== null) return Xo(t, n, e);
		wo(), t = t.memoizedState, n = wo();
		var r = n.queue.dispatch;
		return n.memoizedState = e, [
			t,
			r,
			!1
		];
	}
	function $o(e, t, n, r) {
		return e = {
			tag: e,
			create: n,
			deps: r,
			inst: t,
			next: null
		}, t = Y.updateQueue, t === null && (t = To(), Y.updateQueue = t), n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e), e;
	}
	function es() {
		return wo().memoizedState;
	}
	function ts(e, t, n, r) {
		var i = Co();
		Y.flags |= e, i.memoizedState = $o(1 | t, { destroy: void 0 }, n, r === void 0 ? null : r);
	}
	function ns(e, t, n, r) {
		var i = wo();
		r = r === void 0 ? null : r;
		var a = i.memoizedState.inst;
		io !== null && r !== null && ho(r, io.memoizedState.deps) ? i.memoizedState = $o(t, a, n, r) : (Y.flags |= e, i.memoizedState = $o(1 | t, a, n, r));
	}
	function rs(e, t) {
		ts(8390656, 8, e, t);
	}
	function is(e, t) {
		ns(2048, 8, e, t);
	}
	function as(e) {
		Y.flags |= 4;
		var t = Y.updateQueue;
		if (t === null) t = To(), Y.updateQueue = t, t.events = [e];
		else {
			var n = t.events;
			n === null ? t.events = [e] : n.push(e);
		}
	}
	function os(e) {
		var t = wo().memoizedState;
		return as({
			ref: t,
			nextImpl: e
		}), function() {
			if (X & 2) throw Error(i(440));
			return t.impl.apply(void 0, arguments);
		};
	}
	function ss(e, t) {
		return ns(4, 2, e, t);
	}
	function cs(e, t) {
		return ns(4, 4, e, t);
	}
	function ls(e, t) {
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
	function us(e, t, n) {
		n = n == null ? null : n.concat([e]), ns(4, 4, ls.bind(null, t, e), n);
	}
	function ds() {}
	function fs(e, t) {
		var n = wo();
		t = t === void 0 ? null : t;
		var r = n.memoizedState;
		return t !== null && ho(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e);
	}
	function ps(e, t) {
		var n = wo();
		t = t === void 0 ? null : t;
		var r = n.memoizedState;
		if (t !== null && ho(t, r[1])) return r[0];
		if (r = e(), co) {
			Re(!0);
			try {
				e();
			} finally {
				Re(!1);
			}
		}
		return n.memoizedState = [r, t], r;
	}
	function ms(e, t, n) {
		return n === void 0 || ro & 1073741824 && !(Q & 261930) ? e.memoizedState = t : (e.memoizedState = n, e = fu(), Y.lanes |= e, Ul |= e, n);
	}
	function hs(e, t, n, r) {
		return mr(n, t) ? n : Ua.current === null ? !(ro & 42) || ro & 1073741824 && !(Q & 261930) ? (Zs = !0, e.memoizedState = n) : (e = fu(), Y.lanes |= e, Ul |= e, t) : (e = ms(e, n, r), mr(e, t) || (Zs = !0), e);
	}
	function gs(e, t, n, r, i) {
		var a = A.p;
		A.p = a !== 0 && 8 > a ? a : 8;
		var o = k.T, s = {};
		k.T = s, Os(e, !1, t, n);
		try {
			var c = i(), l = k.S;
			l !== null && l(s, c), typeof c == "object" && c && typeof c.then == "function" ? Ds(e, t, sa(c, r), du(e)) : Ds(e, t, r, du(e));
		} catch (n) {
			Ds(e, t, {
				then: function() {},
				status: "rejected",
				reason: n
			}, du());
		} finally {
			A.p = a, o !== null && s.types !== null && (o.types = s.types), k.T = o;
		}
	}
	function _s() {}
	function vs(e, t, n, r) {
		if (e.tag !== 5) throw Error(i(476));
		var a = ys(e).queue;
		gs(e, a, t, se, n === null ? _s : function() {
			return bs(e), n(r);
		});
	}
	function ys(e) {
		var t = e.memoizedState;
		if (t !== null) return t;
		t = {
			memoizedState: se,
			baseState: se,
			baseQueue: null,
			queue: {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: ko,
				lastRenderedState: se
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
				lastRenderedReducer: ko,
				lastRenderedState: n
			},
			next: null
		}, e.memoizedState = t, e = e.alternate, e !== null && (e.memoizedState = t), t;
	}
	function bs(e) {
		var t = ys(e);
		t.next === null && (t = e.alternate.memoizedState), Ds(e, t.next.queue, {}, du());
	}
	function xs() {
		return Ki(Qf);
	}
	function Ss() {
		return wo().memoizedState;
	}
	function Cs() {
		return wo().memoizedState;
	}
	function ws(e) {
		for (var t = e.return; t !== null;) {
			switch (t.tag) {
				case 24:
				case 3:
					var n = du();
					e = Pa(n);
					var r = Fa(t, e, n);
					r !== null && (pu(r, t, n), Ia(r, t, n)), t = { cache: $i() }, e.payload = t;
					return;
			}
			t = t.return;
		}
	}
	function Ts(e, t, n) {
		var r = du();
		n = {
			lane: r,
			revertLane: 0,
			gesture: null,
			action: n,
			hasEagerState: !1,
			eagerState: null,
			next: null
		}, ks(e) ? As(t, n) : (n = Jr(e, t, n, r), n !== null && (pu(n, e, r), js(n, t, r)));
	}
	function Es(e, t, n) {
		Ds(e, t, n, du());
	}
	function Ds(e, t, n, r) {
		var i = {
			lane: r,
			revertLane: 0,
			gesture: null,
			action: n,
			hasEagerState: !1,
			eagerState: null,
			next: null
		};
		if (ks(e)) As(t, i);
		else {
			var a = e.alternate;
			if (e.lanes === 0 && (a === null || a.lanes === 0) && (a = t.lastRenderedReducer, a !== null)) try {
				var o = t.lastRenderedState, s = a(o, n);
				if (i.hasEagerState = !0, i.eagerState = s, mr(s, o)) return qr(e, t, i, 0), Fl === null && Kr(), !1;
			} catch {}
			if (n = Jr(e, t, i, r), n !== null) return pu(n, e, r), js(n, t, r), !0;
		}
		return !1;
	}
	function Os(e, t, n, r) {
		if (r = {
			lane: 2,
			revertLane: ud(),
			gesture: null,
			action: r,
			hasEagerState: !1,
			eagerState: null,
			next: null
		}, ks(e)) {
			if (t) throw Error(i(479));
		} else t = Jr(e, n, r, 2), t !== null && pu(t, e, 2);
	}
	function ks(e) {
		var t = e.alternate;
		return e === Y || t !== null && t === Y;
	}
	function As(e, t) {
		so = oo = !0;
		var n = e.pending;
		n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
	}
	function js(e, t, n) {
		if (n & 4194048) {
			var r = t.lanes;
			r &= e.pendingLanes, n |= r, t.lanes = n, tt(e, n);
		}
	}
	var Ms = {
		readContext: Ki,
		use: Do,
		useCallback: mo,
		useContext: mo,
		useEffect: mo,
		useImperativeHandle: mo,
		useLayoutEffect: mo,
		useInsertionEffect: mo,
		useMemo: mo,
		useReducer: mo,
		useRef: mo,
		useState: mo,
		useDebugValue: mo,
		useDeferredValue: mo,
		useTransition: mo,
		useSyncExternalStore: mo,
		useId: mo,
		useHostTransitionStatus: mo,
		useFormState: mo,
		useActionState: mo,
		useOptimistic: mo,
		useMemoCache: mo,
		useCacheRefresh: mo
	};
	Ms.useEffectEvent = mo;
	var Ns = {
		readContext: Ki,
		use: Do,
		useCallback: function(e, t) {
			return Co().memoizedState = [e, t === void 0 ? null : t], e;
		},
		useContext: Ki,
		useEffect: rs,
		useImperativeHandle: function(e, t, n) {
			n = n == null ? null : n.concat([e]), ts(4194308, 4, ls.bind(null, t, e), n);
		},
		useLayoutEffect: function(e, t) {
			return ts(4194308, 4, e, t);
		},
		useInsertionEffect: function(e, t) {
			ts(4, 2, e, t);
		},
		useMemo: function(e, t) {
			var n = Co();
			t = t === void 0 ? null : t;
			var r = e();
			if (co) {
				Re(!0);
				try {
					e();
				} finally {
					Re(!1);
				}
			}
			return n.memoizedState = [r, t], r;
		},
		useReducer: function(e, t, n) {
			var r = Co();
			if (n !== void 0) {
				var i = n(t);
				if (co) {
					Re(!0);
					try {
						n(t);
					} finally {
						Re(!1);
					}
				}
			} else i = t;
			return r.memoizedState = r.baseState = i, e = {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: e,
				lastRenderedState: i
			}, r.queue = e, e = e.dispatch = Ts.bind(null, Y, e), [r.memoizedState, e];
		},
		useRef: function(e) {
			var t = Co();
			return e = { current: e }, t.memoizedState = e;
		},
		useState: function(e) {
			e = zo(e);
			var t = e.queue, n = Es.bind(null, Y, t);
			return t.dispatch = n, [e.memoizedState, n];
		},
		useDebugValue: ds,
		useDeferredValue: function(e, t) {
			return ms(Co(), e, t);
		},
		useTransition: function() {
			var e = zo(!1);
			return e = gs.bind(null, Y, e.queue, !0, !1), Co().memoizedState = e, [!1, e];
		},
		useSyncExternalStore: function(e, t, n) {
			var r = Y, a = Co();
			if (J) {
				if (n === void 0) throw Error(i(407));
				n = n();
			} else {
				if (n = t(), Fl === null) throw Error(i(349));
				Q & 127 || Po(r, t, n);
			}
			a.memoizedState = n;
			var o = {
				value: n,
				getSnapshot: t
			};
			return a.queue = o, rs(Io.bind(null, r, o, e), [e]), r.flags |= 2048, $o(9, { destroy: void 0 }, Fo.bind(null, r, o, n, t), null), n;
		},
		useId: function() {
			var e = Co(), t = Fl.identifierPrefix;
			if (J) {
				var n = vi, r = _i;
				n = (r & ~(1 << 32 - ze(r) - 1)).toString(32) + n, t = "_" + t + "R_" + n, n = lo++, 0 < n && (t += "H" + n.toString(32)), t += "_";
			} else n = po++, t = "_" + t + "r_" + n.toString(32) + "_";
			return e.memoizedState = t;
		},
		useHostTransitionStatus: xs,
		useFormState: Jo,
		useActionState: Jo,
		useOptimistic: function(e) {
			var t = Co();
			t.memoizedState = t.baseState = e;
			var n = {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: null,
				lastRenderedState: null
			};
			return t.queue = n, t = Os.bind(null, Y, !0, n), n.dispatch = t, [e, t];
		},
		useMemoCache: Oo,
		useCacheRefresh: function() {
			return Co().memoizedState = ws.bind(null, Y);
		},
		useEffectEvent: function(e) {
			var t = Co(), n = { impl: e };
			return t.memoizedState = n, function() {
				if (X & 2) throw Error(i(440));
				return n.impl.apply(void 0, arguments);
			};
		}
	}, Ps = {
		readContext: Ki,
		use: Do,
		useCallback: fs,
		useContext: Ki,
		useEffect: is,
		useImperativeHandle: us,
		useInsertionEffect: ss,
		useLayoutEffect: cs,
		useMemo: ps,
		useReducer: Ao,
		useRef: es,
		useState: function() {
			return Ao(ko);
		},
		useDebugValue: ds,
		useDeferredValue: function(e, t) {
			return hs(wo(), io.memoizedState, e, t);
		},
		useTransition: function() {
			var e = Ao(ko)[0], t = wo().memoizedState;
			return [typeof e == "boolean" ? e : Eo(e), t];
		},
		useSyncExternalStore: No,
		useId: Ss,
		useHostTransitionStatus: xs,
		useFormState: Yo,
		useActionState: Yo,
		useOptimistic: function(e, t) {
			return Bo(wo(), io, e, t);
		},
		useMemoCache: Oo,
		useCacheRefresh: Cs
	};
	Ps.useEffectEvent = os;
	var Fs = {
		readContext: Ki,
		use: Do,
		useCallback: fs,
		useContext: Ki,
		useEffect: is,
		useImperativeHandle: us,
		useInsertionEffect: ss,
		useLayoutEffect: cs,
		useMemo: ps,
		useReducer: Mo,
		useRef: es,
		useState: function() {
			return Mo(ko);
		},
		useDebugValue: ds,
		useDeferredValue: function(e, t) {
			var n = wo();
			return io === null ? ms(n, e, t) : hs(n, io.memoizedState, e, t);
		},
		useTransition: function() {
			var e = Mo(ko)[0], t = wo().memoizedState;
			return [typeof e == "boolean" ? e : Eo(e), t];
		},
		useSyncExternalStore: No,
		useId: Ss,
		useHostTransitionStatus: xs,
		useFormState: Qo,
		useActionState: Qo,
		useOptimistic: function(e, t) {
			var n = wo();
			return io === null ? (n.baseState = e, [e, n.queue.dispatch]) : Bo(n, io, e, t);
		},
		useMemoCache: Oo,
		useCacheRefresh: Cs
	};
	Fs.useEffectEvent = os;
	function Is(e, t, n, r) {
		t = e.memoizedState, n = n(r, t), n = n == null ? t : h({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
	}
	var Ls = {
		enqueueSetState: function(e, t, n) {
			e = e._reactInternals;
			var r = du(), i = Pa(r);
			i.payload = t, n != null && (i.callback = n), t = Fa(e, i, r), t !== null && (pu(t, e, r), Ia(t, e, r));
		},
		enqueueReplaceState: function(e, t, n) {
			e = e._reactInternals;
			var r = du(), i = Pa(r);
			i.tag = 1, i.payload = t, n != null && (i.callback = n), t = Fa(e, i, r), t !== null && (pu(t, e, r), Ia(t, e, r));
		},
		enqueueForceUpdate: function(e, t) {
			e = e._reactInternals;
			var n = du(), r = Pa(n);
			r.tag = 2, t != null && (r.callback = t), t = Fa(e, r, n), t !== null && (pu(t, e, n), Ia(t, e, n));
		}
	};
	function Rs(e, t, n, r, i, a, o) {
		return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, a, o) : t.prototype && t.prototype.isPureReactComponent ? !hr(n, r) || !hr(i, a) : !0;
	}
	function zs(e, t, n, r) {
		e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== e && Ls.enqueueReplaceState(t, t.state, null);
	}
	function Bs(e, t) {
		var n = t;
		if ("ref" in t) for (var r in n = {}, t) r !== "ref" && (n[r] = t[r]);
		if (e = e.defaultProps) for (var i in n === t && (n = h({}, n)), e) n[i] === void 0 && (n[i] = e[i]);
		return n;
	}
	function Vs(e) {
		Hr(e);
	}
	function Hs(e) {
		console.error(e);
	}
	function Us(e) {
		Hr(e);
	}
	function Ws(e, t) {
		try {
			var n = e.onUncaughtError;
			n(t.value, { componentStack: t.stack });
		} catch (e) {
			setTimeout(function() {
				throw e;
			});
		}
	}
	function Gs(e, t, n) {
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
	function Ks(e, t, n) {
		return n = Pa(n), n.tag = 3, n.payload = { element: null }, n.callback = function() {
			Ws(e, t);
		}, n;
	}
	function qs(e) {
		return e = Pa(e), e.tag = 3, e;
	}
	function Js(e, t, n, r) {
		var i = n.type.getDerivedStateFromError;
		if (typeof i == "function") {
			var a = r.value;
			e.payload = function() {
				return i(a);
			}, e.callback = function() {
				Gs(t, n, r);
			};
		}
		var o = n.stateNode;
		o !== null && typeof o.componentDidCatch == "function" && (e.callback = function() {
			Gs(t, n, r), typeof i != "function" && (tu === null ? tu = new Set([this]) : tu.add(this));
			var e = r.stack;
			this.componentDidCatch(r.value, { componentStack: e === null ? "" : e });
		});
	}
	function Ys(e, t, n, r, a) {
		if (n.flags |= 32768, typeof r == "object" && r && typeof r.then == "function") {
			if (t = n.alternate, t !== null && Ui(t, n, a, !0), n = Ja.current, n !== null) {
				switch (n.tag) {
					case 31:
					case 13: return Ya === null ? Tu() : n.alternate === null && Hl === 0 && (Hl = 3), n.flags &= -257, n.flags |= 65536, n.lanes = a, r === ga ? n.flags |= 16384 : (t = n.updateQueue, t === null ? n.updateQueue = new Set([r]) : t.add(r), Wu(e, r, a)), !1;
					case 22: return n.flags |= 65536, r === ga ? n.flags |= 16384 : (t = n.updateQueue, t === null ? (t = {
						transitions: null,
						markerInstances: null,
						retryQueue: new Set([r])
					}, n.updateQueue = t) : (n = t.retryQueue, n === null ? t.retryQueue = new Set([r]) : n.add(r)), Wu(e, r, a)), !1;
				}
				throw Error(i(435, n.tag));
			}
			return Wu(e, r, a), Tu(), !1;
		}
		if (J) return t = Ja.current, t === null ? (r !== Oi && (t = Error(i(423), { cause: r }), Fi(li(t, n))), e = e.current.alternate, e.flags |= 65536, a &= -a, e.lanes |= a, r = li(r, n), a = Ks(e.stateNode, r, a), La(e, a), Hl !== 4 && (Hl = 2)) : (!(t.flags & 65536) && (t.flags |= 256), t.flags |= 65536, t.lanes = a, r !== Oi && (e = Error(i(422), { cause: r }), Fi(li(e, n)))), !1;
		var o = Error(i(520), { cause: r });
		if (o = li(o, n), Jl === null ? Jl = [o] : Jl.push(o), Hl !== 4 && (Hl = 2), t === null) return !0;
		r = li(r, n), n = t;
		do {
			switch (n.tag) {
				case 3: return n.flags |= 65536, e = a & -a, n.lanes |= e, e = Ks(n.stateNode, r, e), La(n, e), !1;
				case 1: if (t = n.type, o = n.stateNode, !(n.flags & 128) && (typeof t.getDerivedStateFromError == "function" || o !== null && typeof o.componentDidCatch == "function" && (tu === null || !tu.has(o)))) return n.flags |= 65536, a &= -a, n.lanes |= a, a = qs(a), Js(a, e, n, r), La(n, a), !1;
			}
			n = n.return;
		} while (n !== null);
		return !1;
	}
	var Xs = Error(i(461)), Zs = !1;
	function Qs(e, t, n, r) {
		t.child = e === null ? Aa(t, null, n, r) : ka(t, e.child, n, r);
	}
	function $s(e, t, n, r, i) {
		n = n.render;
		var a = t.ref;
		if ("ref" in r) {
			var o = {};
			for (var s in r) s !== "ref" && (o[s] = r[s]);
		} else o = r;
		return Gi(t), r = go(e, t, n, o, a, i), s = bo(), e !== null && !Zs ? (xo(e, t, i), Cc(e, t, i)) : (J && s && xi(t), t.flags |= 1, Qs(e, t, r, i), t.child);
	}
	function ec(e, t, n, r, i) {
		if (e === null) {
			var a = n.type;
			return typeof a == "function" && !ei(a) && a.defaultProps === void 0 && n.compare === null ? (t.tag = 15, t.type = a, tc(e, t, a, r, i)) : (e = ri(n.type, null, r, t, t.mode, i), e.ref = t.ref, e.return = t, t.child = e);
		}
		if (a = e.child, !wc(e, i)) {
			var o = a.memoizedProps;
			if (n = n.compare, n = n === null ? hr : n, n(o, r) && e.ref === t.ref) return Cc(e, t, i);
		}
		return t.flags |= 1, e = ti(a, r), e.ref = t.ref, e.return = t, t.child = e;
	}
	function tc(e, t, n, r, i) {
		if (e !== null) {
			var a = e.memoizedProps;
			if (hr(a, r) && e.ref === t.ref) if (Zs = !1, t.pendingProps = r = a, wc(e, i)) e.flags & 131072 && (Zs = !0);
			else return t.lanes = e.lanes, Cc(e, t, i);
		}
		return lc(e, t, n, r, i);
	}
	function nc(e, t, n, r) {
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
				return ic(e, t, a, n, r);
			}
			if (n & 536870912) t.memoizedState = {
				baseLanes: 0,
				cachePool: null
			}, e !== null && da(t, a === null ? null : a.cachePool), a === null ? Ka() : Ga(t, a), Qa(t);
			else return r = t.lanes = 536870912, ic(e, t, a === null ? n : a.baseLanes | n, n, r);
		} else a === null ? (e !== null && da(t, null), Ka(), $a(t)) : (da(t, a.cachePool), Ga(t, a), $a(t), t.memoizedState = null);
		return Qs(e, t, i, n), t.child;
	}
	function rc(e, t) {
		return e !== null && e.tag === 22 || t.stateNode !== null || (t.stateNode = {
			_visibility: 1,
			_pendingMarkers: null,
			_retryCache: null,
			_transitions: null
		}), t.sibling;
	}
	function ic(e, t, n, r, i) {
		var a = ua();
		return a = a === null ? null : {
			parent: Qi._currentValue,
			pool: a
		}, t.memoizedState = {
			baseLanes: n,
			cachePool: a
		}, e !== null && da(t, null), Ka(), Qa(t), e !== null && Ui(e, t, r, !0), t.childLanes = i, null;
	}
	function ac(e, t) {
		return t = vc({
			mode: t.mode,
			children: t.children
		}, e.mode), t.ref = e.ref, e.child = t, t.return = e, t;
	}
	function oc(e, t, n) {
		return ka(t, e.child, null, n), e = ac(t, t.pendingProps), e.flags |= 2, eo(t), t.memoizedState = null, e;
	}
	function sc(e, t, n) {
		var r = t.pendingProps, a = (t.flags & 128) != 0;
		if (t.flags &= -129, e === null) {
			if (J) {
				if (r.mode === "hidden") return e = ac(t, r), t.lanes = 536870912, rc(null, e);
				if (Za(t), (e = Ti) ? (e = rf(e, Di), e = e !== null && e.data === "&" ? e : null, e !== null && (t.memoizedState = {
					dehydrated: e,
					treeContext: gi === null ? null : {
						id: _i,
						overflow: vi
					},
					retryLane: 536870912,
					hydrationErrors: null
				}, n = oi(e), n.return = t, t.child = n, wi = t, Ti = null)) : e = null, e === null) throw ki(t);
				return t.lanes = 536870912, null;
			}
			return ac(t, r);
		}
		var o = e.memoizedState;
		if (o !== null) {
			var s = o.dehydrated;
			if (Za(t), a) if (t.flags & 256) t.flags &= -257, t = oc(e, t, n);
			else if (t.memoizedState !== null) t.child = e.child, t.flags |= 128, t = null;
			else throw Error(i(558));
			else if (Zs || Ui(e, t, n, !1), a = (n & e.childLanes) !== 0, Zs || a) {
				if (r = Fl, r !== null && (s = nt(r, n), s !== 0 && s !== o.retryLane)) throw o.retryLane = s, Yr(e, s), pu(r, e, s), Xs;
				Tu(), t = oc(e, t, n);
			} else e = o.treeContext, Ti = cf(s.nextSibling), wi = t, J = !0, Ei = null, Di = !1, e !== null && Ci(t, e), t = ac(t, r), t.flags |= 4096;
			return t;
		}
		return e = ti(e.child, {
			mode: r.mode,
			children: r.children
		}), e.ref = t.ref, t.child = e, e.return = t, e;
	}
	function cc(e, t) {
		var n = t.ref;
		if (n === null) e !== null && e.ref !== null && (t.flags |= 4194816);
		else {
			if (typeof n != "function" && typeof n != "object") throw Error(i(284));
			(e === null || e.ref !== n) && (t.flags |= 4194816);
		}
	}
	function lc(e, t, n, r, i) {
		return Gi(t), n = go(e, t, n, r, void 0, i), r = bo(), e !== null && !Zs ? (xo(e, t, i), Cc(e, t, i)) : (J && r && xi(t), t.flags |= 1, Qs(e, t, n, i), t.child);
	}
	function uc(e, t, n, r, i, a) {
		return Gi(t), t.updateQueue = null, n = vo(t, r, n, i), _o(e), r = bo(), e !== null && !Zs ? (xo(e, t, a), Cc(e, t, a)) : (J && r && xi(t), t.flags |= 1, Qs(e, t, n, a), t.child);
	}
	function dc(e, t, n, r, i) {
		if (Gi(t), t.stateNode === null) {
			var a = Zr, o = n.contextType;
			typeof o == "object" && o && (a = Ki(o)), a = new n(r, a), t.memoizedState = a.state !== null && a.state !== void 0 ? a.state : null, a.updater = Ls, t.stateNode = a, a._reactInternals = t, a = t.stateNode, a.props = r, a.state = t.memoizedState, a.refs = {}, Ma(t), o = n.contextType, a.context = typeof o == "object" && o ? Ki(o) : Zr, a.state = t.memoizedState, o = n.getDerivedStateFromProps, typeof o == "function" && (Is(t, n, o, r), a.state = t.memoizedState), typeof n.getDerivedStateFromProps == "function" || typeof a.getSnapshotBeforeUpdate == "function" || typeof a.UNSAFE_componentWillMount != "function" && typeof a.componentWillMount != "function" || (o = a.state, typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount(), o !== a.state && Ls.enqueueReplaceState(a, a.state, null), Ba(t, r, a, i), za(), a.state = t.memoizedState), typeof a.componentDidMount == "function" && (t.flags |= 4194308), r = !0;
		} else if (e === null) {
			a = t.stateNode;
			var s = t.memoizedProps, c = Bs(n, s);
			a.props = c;
			var l = a.context, u = n.contextType;
			o = Zr, typeof u == "object" && u && (o = Ki(u));
			var d = n.getDerivedStateFromProps;
			u = typeof d == "function" || typeof a.getSnapshotBeforeUpdate == "function", s = t.pendingProps !== s, u || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (s || l !== o) && zs(t, a, r, o), ja = !1;
			var f = t.memoizedState;
			a.state = f, Ba(t, r, a, i), za(), l = t.memoizedState, s || f !== l || ja ? (typeof d == "function" && (Is(t, n, d, r), l = t.memoizedState), (c = ja || Rs(t, n, c, r, f, l, o)) ? (u || typeof a.UNSAFE_componentWillMount != "function" && typeof a.componentWillMount != "function" || (typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount()), typeof a.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = r, t.memoizedState = l), a.props = r, a.state = l, a.context = o, r = c) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), r = !1);
		} else {
			a = t.stateNode, Na(e, t), o = t.memoizedProps, u = Bs(n, o), a.props = u, d = t.pendingProps, f = a.context, l = n.contextType, c = Zr, typeof l == "object" && l && (c = Ki(l)), s = n.getDerivedStateFromProps, (l = typeof s == "function" || typeof a.getSnapshotBeforeUpdate == "function") || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (o !== d || f !== c) && zs(t, a, r, c), ja = !1, f = t.memoizedState, a.state = f, Ba(t, r, a, i), za();
			var p = t.memoizedState;
			o !== d || f !== p || ja || e !== null && e.dependencies !== null && Wi(e.dependencies) ? (typeof s == "function" && (Is(t, n, s, r), p = t.memoizedState), (u = ja || Rs(t, n, u, r, f, p, c) || e !== null && e.dependencies !== null && Wi(e.dependencies)) ? (l || typeof a.UNSAFE_componentWillUpdate != "function" && typeof a.componentWillUpdate != "function" || (typeof a.componentWillUpdate == "function" && a.componentWillUpdate(r, p, c), typeof a.UNSAFE_componentWillUpdate == "function" && a.UNSAFE_componentWillUpdate(r, p, c)), typeof a.componentDidUpdate == "function" && (t.flags |= 4), typeof a.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof a.componentDidUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = p), a.props = r, a.state = p, a.context = c, r = u) : (typeof a.componentDidUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 1024), r = !1);
		}
		return a = r, cc(e, t), r = (t.flags & 128) != 0, a || r ? (a = t.stateNode, n = r && typeof n.getDerivedStateFromError != "function" ? null : a.render(), t.flags |= 1, e !== null && r ? (t.child = ka(t, e.child, null, i), t.child = ka(t, null, n, i)) : Qs(e, t, n, i), t.memoizedState = a.state, e = t.child) : e = Cc(e, t, i), e;
	}
	function fc(e, t, n, r) {
		return Ni(), t.flags |= 256, Qs(e, t, n, r), t.child;
	}
	var pc = {
		dehydrated: null,
		treeContext: null,
		retryLane: 0,
		hydrationErrors: null
	};
	function mc(e) {
		return {
			baseLanes: e,
			cachePool: fa()
		};
	}
	function hc(e, t, n) {
		return e = e === null ? 0 : e.childLanes & ~n, t && (e |= Kl), e;
	}
	function gc(e, t, n) {
		var r = t.pendingProps, a = !1, o = (t.flags & 128) != 0, s;
		if ((s = o) || (s = e !== null && e.memoizedState === null ? !1 : (to.current & 2) != 0), s && (a = !0, t.flags &= -129), s = (t.flags & 32) != 0, t.flags &= -33, e === null) {
			if (J) {
				if (a ? Xa(t) : $a(t), (e = Ti) ? (e = rf(e, Di), e = e !== null && e.data !== "&" ? e : null, e !== null && (t.memoizedState = {
					dehydrated: e,
					treeContext: gi === null ? null : {
						id: _i,
						overflow: vi
					},
					retryLane: 536870912,
					hydrationErrors: null
				}, n = oi(e), n.return = t, t.child = n, wi = t, Ti = null)) : e = null, e === null) throw ki(t);
				return of(e) ? t.lanes = 32 : t.lanes = 536870912, null;
			}
			var c = r.children;
			return r = r.fallback, a ? ($a(t), a = t.mode, c = vc({
				mode: "hidden",
				children: c
			}, a), r = ii(r, a, n, null), c.return = t, r.return = t, c.sibling = r, t.child = c, r = t.child, r.memoizedState = mc(n), r.childLanes = hc(e, s, n), t.memoizedState = pc, rc(null, r)) : (Xa(t), _c(t, c));
		}
		var l = e.memoizedState;
		if (l !== null && (c = l.dehydrated, c !== null)) {
			if (o) t.flags & 256 ? (Xa(t), t.flags &= -257, t = yc(e, t, n)) : t.memoizedState === null ? ($a(t), c = r.fallback, a = t.mode, r = vc({
				mode: "visible",
				children: r.children
			}, a), c = ii(c, a, n, null), c.flags |= 2, r.return = t, c.return = t, r.sibling = c, t.child = r, ka(t, e.child, null, n), r = t.child, r.memoizedState = mc(n), r.childLanes = hc(e, s, n), t.memoizedState = pc, t = rc(null, r)) : ($a(t), t.child = e.child, t.flags |= 128, t = null);
			else if (Xa(t), of(c)) {
				if (s = c.nextSibling && c.nextSibling.dataset, s) var u = s.dgst;
				s = u, r = Error(i(419)), r.stack = "", r.digest = s, Fi({
					value: r,
					source: null,
					stack: null
				}), t = yc(e, t, n);
			} else if (Zs || Ui(e, t, n, !1), s = (n & e.childLanes) !== 0, Zs || s) {
				if (s = Fl, s !== null && (r = nt(s, n), r !== 0 && r !== l.retryLane)) throw l.retryLane = r, Yr(e, r), pu(s, e, r), Xs;
				af(c) || Tu(), t = yc(e, t, n);
			} else af(c) ? (t.flags |= 192, t.child = e.child, t = null) : (e = l.treeContext, Ti = cf(c.nextSibling), wi = t, J = !0, Ei = null, Di = !1, e !== null && Ci(t, e), t = _c(t, r.children), t.flags |= 4096);
			return t;
		}
		return a ? ($a(t), c = r.fallback, a = t.mode, l = e.child, u = l.sibling, r = ti(l, {
			mode: "hidden",
			children: r.children
		}), r.subtreeFlags = l.subtreeFlags & 65011712, u === null ? (c = ii(c, a, n, null), c.flags |= 2) : c = ti(u, c), c.return = t, r.return = t, r.sibling = c, t.child = r, rc(null, r), r = t.child, c = e.child.memoizedState, c === null ? c = mc(n) : (a = c.cachePool, a === null ? a = fa() : (l = Qi._currentValue, a = a.parent === l ? a : {
			parent: l,
			pool: l
		}), c = {
			baseLanes: c.baseLanes | n,
			cachePool: a
		}), r.memoizedState = c, r.childLanes = hc(e, s, n), t.memoizedState = pc, rc(e.child, r)) : (Xa(t), n = e.child, e = n.sibling, n = ti(n, {
			mode: "visible",
			children: r.children
		}), n.return = t, n.sibling = null, e !== null && (s = t.deletions, s === null ? (t.deletions = [e], t.flags |= 16) : s.push(e)), t.child = n, t.memoizedState = null, n);
	}
	function _c(e, t) {
		return t = vc({
			mode: "visible",
			children: t
		}, e.mode), t.return = e, e.child = t;
	}
	function vc(e, t) {
		return e = $r(22, e, null, t), e.lanes = 0, e;
	}
	function yc(e, t, n) {
		return ka(t, e.child, null, n), e = _c(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
	}
	function bc(e, t, n) {
		e.lanes |= t;
		var r = e.alternate;
		r !== null && (r.lanes |= t), Vi(e.return, t, n);
	}
	function xc(e, t, n, r, i, a) {
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
	function Sc(e, t, n) {
		var r = t.pendingProps, i = r.revealOrder, a = r.tail;
		r = r.children;
		var o = to.current, s = (o & 2) != 0;
		if (s ? (o = o & 1 | 2, t.flags |= 128) : o &= 1, M(to, o), Qs(e, t, r, n), r = J ? pi : 0, !s && e !== null && e.flags & 128) a: for (e = t.child; e !== null;) {
			if (e.tag === 13) e.memoizedState !== null && bc(e, n, t);
			else if (e.tag === 19) bc(e, n, t);
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
				for (n = t.child, i = null; n !== null;) e = n.alternate, e !== null && no(e) === null && (i = n), n = n.sibling;
				n = i, n === null ? (i = t.child, t.child = null) : (i = n.sibling, n.sibling = null), xc(t, !1, i, n, a, r);
				break;
			case "backwards":
			case "unstable_legacy-backwards":
				for (n = null, i = t.child, t.child = null; i !== null;) {
					if (e = i.alternate, e !== null && no(e) === null) {
						t.child = i;
						break;
					}
					e = i.sibling, i.sibling = n, n = i, i = e;
				}
				xc(t, !0, n, null, a, r);
				break;
			case "together":
				xc(t, !1, null, null, void 0, r);
				break;
			default: t.memoizedState = null;
		}
		return t.child;
	}
	function Cc(e, t, n) {
		if (e !== null && (t.dependencies = e.dependencies), Ul |= t.lanes, (n & t.childLanes) === 0) if (e !== null) {
			if (Ui(e, t, n, !1), (n & t.childLanes) === 0) return null;
		} else return null;
		if (e !== null && t.child !== e.child) throw Error(i(153));
		if (t.child !== null) {
			for (e = t.child, n = ti(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null;) e = e.sibling, n = n.sibling = ti(e, e.pendingProps), n.return = t;
			n.sibling = null;
		}
		return t.child;
	}
	function wc(e, t) {
		return (e.lanes & t) === 0 ? (e = e.dependencies, !!(e !== null && Wi(e))) : !0;
	}
	function Tc(e, t, n) {
		switch (t.tag) {
			case 3:
				he(t, t.stateNode.containerInfo), zi(t, Qi, e.memoizedState.cache), Ni();
				break;
			case 27:
			case 5:
				_e(t);
				break;
			case 4:
				he(t, t.stateNode.containerInfo);
				break;
			case 10:
				zi(t, t.type, t.memoizedProps.value);
				break;
			case 31:
				if (t.memoizedState !== null) return t.flags |= 128, Za(t), null;
				break;
			case 13:
				var r = t.memoizedState;
				if (r !== null) return r.dehydrated === null ? (n & t.child.childLanes) === 0 ? (Xa(t), e = Cc(e, t, n), e === null ? null : e.sibling) : gc(e, t, n) : (Xa(t), t.flags |= 128, null);
				Xa(t);
				break;
			case 19:
				var i = (e.flags & 128) != 0;
				if (r = (n & t.childLanes) !== 0, r ||= (Ui(e, t, n, !1), (n & t.childLanes) !== 0), i) {
					if (r) return Sc(e, t, n);
					t.flags |= 128;
				}
				if (i = t.memoizedState, i !== null && (i.rendering = null, i.tail = null, i.lastEffect = null), M(to, to.current), r) break;
				return null;
			case 22: return t.lanes = 0, nc(e, t, n, t.pendingProps);
			case 24: zi(t, Qi, e.memoizedState.cache);
		}
		return Cc(e, t, n);
	}
	function Ec(e, t, n) {
		if (e !== null) if (e.memoizedProps !== t.pendingProps) Zs = !0;
		else {
			if (!wc(e, n) && !(t.flags & 128)) return Zs = !1, Tc(e, t, n);
			Zs = !!(e.flags & 131072);
		}
		else Zs = !1, J && t.flags & 1048576 && bi(t, pi, t.index);
		switch (t.lanes = 0, t.tag) {
			case 16:
				a: {
					var r = t.pendingProps;
					if (e = ya(t.elementType), t.type = e, typeof e == "function") ei(e) ? (r = Bs(e, r), t.tag = 1, t = dc(null, t, e, r, n)) : (t.tag = 0, t = lc(null, t, e, r, n));
					else {
						if (e != null) {
							var a = e.$$typeof;
							if (a === C) {
								t.tag = 11, t = $s(null, t, e, r, n);
								break a;
							} else if (a === te) {
								t.tag = 14, t = ec(null, t, e, r, n);
								break a;
							}
						}
						throw t = ae(e) || e, Error(i(306, t, ""));
					}
				}
				return t;
			case 0: return lc(e, t, t.type, t.pendingProps, n);
			case 1: return r = t.type, a = Bs(r, t.pendingProps), dc(e, t, r, a, n);
			case 3:
				a: {
					if (he(t, t.stateNode.containerInfo), e === null) throw Error(i(387));
					r = t.pendingProps;
					var o = t.memoizedState;
					a = o.element, Na(e, t), Ba(t, r, null, n);
					var s = t.memoizedState;
					if (r = s.cache, zi(t, Qi, r), r !== o.cache && Hi(t, [Qi], n, !0), za(), r = s.element, o.isDehydrated) if (o = {
						element: r,
						isDehydrated: !1,
						cache: s.cache
					}, t.updateQueue.baseState = o, t.memoizedState = o, t.flags & 256) {
						t = fc(e, t, r, n);
						break a;
					} else if (r !== a) {
						a = li(Error(i(424)), t), Fi(a), t = fc(e, t, r, n);
						break a;
					} else {
						switch (e = t.stateNode.containerInfo, e.nodeType) {
							case 9:
								e = e.body;
								break;
							default: e = e.nodeName === "HTML" ? e.ownerDocument.body : e;
						}
						for (Ti = cf(e.firstChild), wi = t, J = !0, Ei = null, Di = !0, n = Aa(t, null, r, n), t.child = n; n;) n.flags = n.flags & -3 | 4096, n = n.sibling;
					}
					else {
						if (Ni(), r === a) {
							t = Cc(e, t, n);
							break a;
						}
						Qs(e, t, r, n);
					}
					t = t.child;
				}
				return t;
			case 26: return cc(e, t), e === null ? (n = kf(t.type, null, t.pendingProps, null)) ? t.memoizedState = n : J || (n = t.type, e = t.pendingProps, r = Bd(pe.current).createElement(n), r[R] = t, r[st] = e, Pd(r, n, e), B(r), t.stateNode = r) : t.memoizedState = kf(t.type, e.memoizedProps, t.pendingProps, e.memoizedState), null;
			case 27: return _e(t), e === null && J && (r = t.stateNode = ff(t.type, t.pendingProps, pe.current), wi = t, Di = !0, a = Ti, Zd(t.type) ? (lf = a, Ti = cf(r.firstChild)) : Ti = a), Qs(e, t, t.pendingProps.children, n), cc(e, t), e === null && (t.flags |= 4194304), t.child;
			case 5: return e === null && J && ((a = r = Ti) && (r = tf(r, t.type, t.pendingProps, Di), r === null ? a = !1 : (t.stateNode = r, wi = t, Ti = cf(r.firstChild), Di = !1, a = !0)), a || ki(t)), _e(t), a = t.type, o = t.pendingProps, s = e === null ? null : e.memoizedProps, r = o.children, Ud(a, o) ? r = null : s !== null && Ud(a, s) && (t.flags |= 32), t.memoizedState !== null && (a = go(e, t, yo, null, null, n), Qf._currentValue = a), cc(e, t), Qs(e, t, r, n), t.child;
			case 6: return e === null && J && ((e = n = Ti) && (n = nf(n, t.pendingProps, Di), n === null ? e = !1 : (t.stateNode = n, wi = t, Ti = null, e = !0)), e || ki(t)), null;
			case 13: return gc(e, t, n);
			case 4: return he(t, t.stateNode.containerInfo), r = t.pendingProps, e === null ? t.child = ka(t, null, r, n) : Qs(e, t, r, n), t.child;
			case 11: return $s(e, t, t.type, t.pendingProps, n);
			case 7: return Qs(e, t, t.pendingProps, n), t.child;
			case 8: return Qs(e, t, t.pendingProps.children, n), t.child;
			case 12: return Qs(e, t, t.pendingProps.children, n), t.child;
			case 10: return r = t.pendingProps, zi(t, t.type, r.value), Qs(e, t, r.children, n), t.child;
			case 9: return a = t.type._context, r = t.pendingProps.children, Gi(t), a = Ki(a), r = r(a), t.flags |= 1, Qs(e, t, r, n), t.child;
			case 14: return ec(e, t, t.type, t.pendingProps, n);
			case 15: return tc(e, t, t.type, t.pendingProps, n);
			case 19: return Sc(e, t, n);
			case 31: return sc(e, t, n);
			case 22: return nc(e, t, n, t.pendingProps);
			case 24: return Gi(t), r = Ki(Qi), e === null ? (a = ua(), a === null && (a = Fl, o = $i(), a.pooledCache = o, o.refCount++, o !== null && (a.pooledCacheLanes |= n), a = o), t.memoizedState = {
				parent: r,
				cache: a
			}, Ma(t), zi(t, Qi, a)) : ((e.lanes & n) !== 0 && (Na(e, t), Ba(t, null, null, n), za()), a = e.memoizedState, o = t.memoizedState, a.parent === r ? (r = o.cache, zi(t, Qi, r), r !== a.cache && Hi(t, [Qi], n, !0)) : (a = {
				parent: r,
				cache: r
			}, t.memoizedState = a, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = a), zi(t, Qi, r))), Qs(e, t, t.pendingProps.children, n), t.child;
			case 29: throw t.pendingProps;
		}
		throw Error(i(156, t.tag));
	}
	function Dc(e) {
		e.flags |= 4;
	}
	function Oc(e, t, n, r, i) {
		if ((t = (e.mode & 32) != 0) && (t = !1), t) {
			if (e.flags |= 16777216, (i & 335544128) === i) if (e.stateNode.complete) e.flags |= 8192;
			else if (Su()) e.flags |= 8192;
			else throw ba = ga, ma;
		} else e.flags &= -16777217;
	}
	function kc(e, t) {
		if (t.type !== "stylesheet" || t.state.loading & 4) e.flags &= -16777217;
		else if (e.flags |= 16777216, !Wf(t)) if (Su()) e.flags |= 8192;
		else throw ba = ga, ma;
	}
	function Ac(e, t) {
		t !== null && (e.flags |= 4), e.flags & 16384 && (t = e.tag === 22 ? 536870912 : Xe(), e.lanes |= t, ql |= t);
	}
	function jc(e, t) {
		if (!J) switch (e.tailMode) {
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
	function Mc(e) {
		var t = e.alternate !== null && e.alternate.child === e.child, n = 0, r = 0;
		if (t) for (var i = e.child; i !== null;) n |= i.lanes | i.childLanes, r |= i.subtreeFlags & 65011712, r |= i.flags & 65011712, i.return = e, i = i.sibling;
		else for (i = e.child; i !== null;) n |= i.lanes | i.childLanes, r |= i.subtreeFlags, r |= i.flags, i.return = e, i = i.sibling;
		return e.subtreeFlags |= r, e.childLanes = n, t;
	}
	function Nc(e, t, n) {
		var r = t.pendingProps;
		switch (Si(t), t.tag) {
			case 16:
			case 15:
			case 0:
			case 11:
			case 7:
			case 8:
			case 12:
			case 9:
			case 14: return Mc(t), null;
			case 1: return Mc(t), null;
			case 3: return n = t.stateNode, r = null, e !== null && (r = e.memoizedState.cache), t.memoizedState.cache !== r && (t.flags |= 2048), Bi(Qi), ge(), n.pendingContext && (n.context = n.pendingContext, n.pendingContext = null), (e === null || e.child === null) && (Mi(t) ? Dc(t) : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, Pi())), Mc(t), null;
			case 26:
				var a = t.type, o = t.memoizedState;
				return e === null ? (Dc(t), o === null ? (Mc(t), Oc(t, a, null, r, n)) : (Mc(t), kc(t, o))) : o ? o === e.memoizedState ? (Mc(t), t.flags &= -16777217) : (Dc(t), Mc(t), kc(t, o)) : (e = e.memoizedProps, e !== r && Dc(t), Mc(t), Oc(t, a, e, r, n)), null;
			case 27:
				if (N(t), n = pe.current, a = t.type, e !== null && t.stateNode != null) e.memoizedProps !== r && Dc(t);
				else {
					if (!r) {
						if (t.stateNode === null) throw Error(i(166));
						return Mc(t), null;
					}
					e = de.current, Mi(t) ? Ai(t, e) : (e = ff(a, r, n), t.stateNode = e, Dc(t));
				}
				return Mc(t), null;
			case 5:
				if (N(t), a = t.type, e !== null && t.stateNode != null) e.memoizedProps !== r && Dc(t);
				else {
					if (!r) {
						if (t.stateNode === null) throw Error(i(166));
						return Mc(t), null;
					}
					if (o = de.current, Mi(t)) Ai(t, o);
					else {
						var s = Bd(pe.current);
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
						o[R] = t, o[st] = r;
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
						r && Dc(t);
					}
				}
				return Mc(t), Oc(t, t.type, e === null ? null : e.memoizedProps, t.pendingProps, n), null;
			case 6:
				if (e && t.stateNode != null) e.memoizedProps !== r && Dc(t);
				else {
					if (typeof r != "string" && t.stateNode === null) throw Error(i(166));
					if (e = pe.current, Mi(t)) {
						if (e = t.stateNode, n = t.memoizedProps, r = null, a = wi, a !== null) switch (a.tag) {
							case 27:
							case 5: r = a.memoizedProps;
						}
						e[R] = t, e = !!(e.nodeValue === n || r !== null && !0 === r.suppressHydrationWarning || jd(e.nodeValue, n)), e || ki(t, !0);
					} else e = Bd(e).createTextNode(r), e[R] = t, t.stateNode = e;
				}
				return Mc(t), null;
			case 31:
				if (n = t.memoizedState, e === null || e.memoizedState !== null) {
					if (r = Mi(t), n !== null) {
						if (e === null) {
							if (!r) throw Error(i(318));
							if (e = t.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(i(557));
							e[R] = t;
						} else Ni(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
						Mc(t), e = !1;
					} else n = Pi(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = n), e = !0;
					if (!e) return t.flags & 256 ? (eo(t), t) : (eo(t), null);
					if (t.flags & 128) throw Error(i(558));
				}
				return Mc(t), null;
			case 13:
				if (r = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
					if (a = Mi(t), r !== null && r.dehydrated !== null) {
						if (e === null) {
							if (!a) throw Error(i(318));
							if (a = t.memoizedState, a = a === null ? null : a.dehydrated, !a) throw Error(i(317));
							a[R] = t;
						} else Ni(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
						Mc(t), a = !1;
					} else a = Pi(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = a), a = !0;
					if (!a) return t.flags & 256 ? (eo(t), t) : (eo(t), null);
				}
				return eo(t), t.flags & 128 ? (t.lanes = n, t) : (n = r !== null, e = e !== null && e.memoizedState !== null, n && (r = t.child, a = null, r.alternate !== null && r.alternate.memoizedState !== null && r.alternate.memoizedState.cachePool !== null && (a = r.alternate.memoizedState.cachePool.pool), o = null, r.memoizedState !== null && r.memoizedState.cachePool !== null && (o = r.memoizedState.cachePool.pool), o !== a && (r.flags |= 2048)), n !== e && n && (t.child.flags |= 8192), Ac(t, t.updateQueue), Mc(t), null);
			case 4: return ge(), e === null && xd(t.stateNode.containerInfo), Mc(t), null;
			case 10: return Bi(t.type), Mc(t), null;
			case 19:
				if (j(to), r = t.memoizedState, r === null) return Mc(t), null;
				if (a = (t.flags & 128) != 0, o = r.rendering, o === null) if (a) jc(r, !1);
				else {
					if (Hl !== 0 || e !== null && e.flags & 128) for (e = t.child; e !== null;) {
						if (o = no(e), o !== null) {
							for (t.flags |= 128, jc(r, !1), e = o.updateQueue, t.updateQueue = e, Ac(t, e), t.subtreeFlags = 0, e = n, n = t.child; n !== null;) ni(n, e), n = n.sibling;
							return M(to, to.current & 1 | 2), J && yi(t, r.treeForkCount), t.child;
						}
						e = e.sibling;
					}
					r.tail !== null && I() > $l && (t.flags |= 128, a = !0, jc(r, !1), t.lanes = 4194304);
				}
				else {
					if (!a) if (e = no(o), e !== null) {
						if (t.flags |= 128, a = !0, e = e.updateQueue, t.updateQueue = e, Ac(t, e), jc(r, !0), r.tail === null && r.tailMode === "hidden" && !o.alternate && !J) return Mc(t), null;
					} else 2 * I() - r.renderingStartTime > $l && n !== 536870912 && (t.flags |= 128, a = !0, jc(r, !1), t.lanes = 4194304);
					r.isBackwards ? (o.sibling = t.child, t.child = o) : (e = r.last, e === null ? t.child = o : e.sibling = o, r.last = o);
				}
				return r.tail === null ? (Mc(t), null) : (e = r.tail, r.rendering = e, r.tail = e.sibling, r.renderingStartTime = I(), e.sibling = null, n = to.current, M(to, a ? n & 1 | 2 : n & 1), J && yi(t, r.treeForkCount), e);
			case 22:
			case 23: return eo(t), qa(), r = t.memoizedState !== null, e === null ? r && (t.flags |= 8192) : e.memoizedState !== null !== r && (t.flags |= 8192), r ? n & 536870912 && !(t.flags & 128) && (Mc(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : Mc(t), n = t.updateQueue, n !== null && Ac(t, n.retryQueue), n = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), r = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (r = t.memoizedState.cachePool.pool), r !== n && (t.flags |= 2048), e !== null && j(la), null;
			case 24: return n = null, e !== null && (n = e.memoizedState.cache), t.memoizedState.cache !== n && (t.flags |= 2048), Bi(Qi), Mc(t), null;
			case 25: return null;
			case 30: return null;
		}
		throw Error(i(156, t.tag));
	}
	function Pc(e, t) {
		switch (Si(t), t.tag) {
			case 1: return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 3: return Bi(Qi), ge(), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
			case 26:
			case 27:
			case 5: return N(t), null;
			case 31:
				if (t.memoizedState !== null) {
					if (eo(t), t.alternate === null) throw Error(i(340));
					Ni();
				}
				return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 13:
				if (eo(t), e = t.memoizedState, e !== null && e.dehydrated !== null) {
					if (t.alternate === null) throw Error(i(340));
					Ni();
				}
				return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 19: return j(to), null;
			case 4: return ge(), null;
			case 10: return Bi(t.type), null;
			case 22:
			case 23: return eo(t), qa(), e !== null && j(la), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 24: return Bi(Qi), null;
			case 25: return null;
			default: return null;
		}
	}
	function Fc(e, t) {
		switch (Si(t), t.tag) {
			case 3:
				Bi(Qi), ge();
				break;
			case 26:
			case 27:
			case 5:
				N(t);
				break;
			case 4:
				ge();
				break;
			case 31:
				t.memoizedState !== null && eo(t);
				break;
			case 13:
				eo(t);
				break;
			case 19:
				j(to);
				break;
			case 10:
				Bi(t.type);
				break;
			case 22:
			case 23:
				eo(t), qa(), e !== null && j(la);
				break;
			case 24: Bi(Qi);
		}
	}
	function Ic(e, t) {
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
			Uu(t, t.return, e);
		}
	}
	function Lc(e, t, n) {
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
								Uu(i, c, e);
							}
						}
					}
					r = r.next;
				} while (r !== a);
			}
		} catch (e) {
			Uu(t, t.return, e);
		}
	}
	function Rc(e) {
		var t = e.updateQueue;
		if (t !== null) {
			var n = e.stateNode;
			try {
				Ha(t, n);
			} catch (t) {
				Uu(e, e.return, t);
			}
		}
	}
	function zc(e, t, n) {
		n.props = Bs(e.type, e.memoizedProps), n.state = e.memoizedState;
		try {
			n.componentWillUnmount();
		} catch (n) {
			Uu(e, t, n);
		}
	}
	function Bc(e, t) {
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
			Uu(e, t, n);
		}
	}
	function Vc(e, t) {
		var n = e.ref, r = e.refCleanup;
		if (n !== null) if (typeof r == "function") try {
			r();
		} catch (n) {
			Uu(e, t, n);
		} finally {
			e.refCleanup = null, e = e.alternate, e != null && (e.refCleanup = null);
		}
		else if (typeof n == "function") try {
			n(null);
		} catch (n) {
			Uu(e, t, n);
		}
		else n.current = null;
	}
	function Hc(e) {
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
			Uu(e, e.return, t);
		}
	}
	function Uc(e, t, n) {
		try {
			var r = e.stateNode;
			Fd(r, e.type, n, t), r[st] = t;
		} catch (t) {
			Uu(e, e.return, t);
		}
	}
	function Wc(e) {
		return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && Zd(e.type) || e.tag === 4;
	}
	function Gc(e) {
		a: for (;;) {
			for (; e.sibling === null;) {
				if (e.return === null || Wc(e.return)) return null;
				e = e.return;
			}
			for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18;) {
				if (e.tag === 27 && Zd(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue a;
				e.child.return = e, e = e.child;
			}
			if (!(e.flags & 2)) return e.stateNode;
		}
	}
	function Kc(e, t, n) {
		var r = e.tag;
		if (r === 5 || r === 6) e = e.stateNode, t ? (n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n).insertBefore(e, t) : (t = n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n, t.appendChild(e), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = Xt));
		else if (r !== 4 && (r === 27 && Zd(e.type) && (n = e.stateNode, t = null), e = e.child, e !== null)) for (Kc(e, t, n), e = e.sibling; e !== null;) Kc(e, t, n), e = e.sibling;
	}
	function qc(e, t, n) {
		var r = e.tag;
		if (r === 5 || r === 6) e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
		else if (r !== 4 && (r === 27 && Zd(e.type) && (n = e.stateNode), e = e.child, e !== null)) for (qc(e, t, n), e = e.sibling; e !== null;) qc(e, t, n), e = e.sibling;
	}
	function Jc(e) {
		var t = e.stateNode, n = e.memoizedProps;
		try {
			for (var r = e.type, i = t.attributes; i.length;) t.removeAttributeNode(i[0]);
			Pd(t, r, n), t[R] = e, t[st] = n;
		} catch (t) {
			Uu(e, e.return, t);
		}
	}
	var Yc = !1, Xc = !1, Zc = !1, Qc = typeof WeakSet == "function" ? WeakSet : Set, $c = null;
	function el(e, t) {
		if (e = e.containerInfo, Rd = sp, e = yr(e), br(e)) {
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
		}, sp = !1, $c = t; $c !== null;) if (t = $c, e = t.child, t.subtreeFlags & 1028 && e !== null) e.return = t, $c = e;
		else for (; $c !== null;) {
			switch (t = $c, o = t.alternate, e = t.flags, t.tag) {
				case 0:
					if (e & 4 && (e = t.updateQueue, e = e === null ? null : e.events, e !== null)) for (n = 0; n < e.length; n++) a = e[n], a.ref.impl = a.nextImpl;
					break;
				case 11:
				case 15: break;
				case 1:
					if (e & 1024 && o !== null) {
						e = void 0, n = t, a = o.memoizedProps, o = o.memoizedState, r = n.stateNode;
						try {
							var h = Bs(n.type, a);
							e = r.getSnapshotBeforeUpdate(h, o), r.__reactInternalSnapshotBeforeUpdate = e;
						} catch (e) {
							Uu(n, n.return, e);
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
				e.return = t.return, $c = e;
				break;
			}
			$c = t.return;
		}
	}
	function tl(e, t, n) {
		var r = n.flags;
		switch (n.tag) {
			case 0:
			case 11:
			case 15:
				gl(e, n), r & 4 && Ic(5, n);
				break;
			case 1:
				if (gl(e, n), r & 4) if (e = n.stateNode, t === null) try {
					e.componentDidMount();
				} catch (e) {
					Uu(n, n.return, e);
				}
				else {
					var i = Bs(n.type, t.memoizedProps);
					t = t.memoizedState;
					try {
						e.componentDidUpdate(i, t, e.__reactInternalSnapshotBeforeUpdate);
					} catch (e) {
						Uu(n, n.return, e);
					}
				}
				r & 64 && Rc(n), r & 512 && Bc(n, n.return);
				break;
			case 3:
				if (gl(e, n), r & 64 && (e = n.updateQueue, e !== null)) {
					if (t = null, n.child !== null) switch (n.child.tag) {
						case 27:
						case 5:
							t = n.child.stateNode;
							break;
						case 1: t = n.child.stateNode;
					}
					try {
						Ha(e, t);
					} catch (e) {
						Uu(n, n.return, e);
					}
				}
				break;
			case 27: t === null && r & 4 && Jc(n);
			case 26:
			case 5:
				gl(e, n), t === null && r & 4 && Hc(n), r & 512 && Bc(n, n.return);
				break;
			case 12:
				gl(e, n);
				break;
			case 31:
				gl(e, n), r & 4 && sl(e, n);
				break;
			case 13:
				gl(e, n), r & 4 && cl(e, n), r & 64 && (e = n.memoizedState, e !== null && (e = e.dehydrated, e !== null && (n = qu.bind(null, n), sf(e, n))));
				break;
			case 22:
				if (r = n.memoizedState !== null || Yc, !r) {
					t = t !== null && t.memoizedState !== null || Xc, i = Yc;
					var a = Xc;
					Yc = r, (Xc = t) && !a ? vl(e, n, (n.subtreeFlags & 8772) != 0) : gl(e, n), Yc = i, Xc = a;
				}
				break;
			case 30: break;
			default: gl(e, n);
		}
	}
	function nl(e) {
		var t = e.alternate;
		t !== null && (e.alternate = null, nl(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && mt(t)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
	}
	var rl = null, il = !1;
	function al(e, t, n) {
		for (n = n.child; n !== null;) ol(e, t, n), n = n.sibling;
	}
	function ol(e, t, n) {
		if (Le && typeof Le.onCommitFiberUnmount == "function") try {
			Le.onCommitFiberUnmount(Ie, n);
		} catch {}
		switch (n.tag) {
			case 26:
				Xc || Vc(n, t), al(e, t, n), n.memoizedState ? n.memoizedState.count-- : n.stateNode && (n = n.stateNode, n.parentNode.removeChild(n));
				break;
			case 27:
				Xc || Vc(n, t);
				var r = rl, i = il;
				Zd(n.type) && (rl = n.stateNode, il = !1), al(e, t, n), pf(n.stateNode), rl = r, il = i;
				break;
			case 5: Xc || Vc(n, t);
			case 6:
				if (r = rl, i = il, rl = null, al(e, t, n), rl = r, il = i, rl !== null) if (il) try {
					(rl.nodeType === 9 ? rl.body : rl.nodeName === "HTML" ? rl.ownerDocument.body : rl).removeChild(n.stateNode);
				} catch (e) {
					Uu(n, t, e);
				}
				else try {
					rl.removeChild(n.stateNode);
				} catch (e) {
					Uu(n, t, e);
				}
				break;
			case 18:
				rl !== null && (il ? (e = rl, Qd(e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e, n.stateNode), Np(e)) : Qd(rl, n.stateNode));
				break;
			case 4:
				r = rl, i = il, rl = n.stateNode.containerInfo, il = !0, al(e, t, n), rl = r, il = i;
				break;
			case 0:
			case 11:
			case 14:
			case 15:
				Lc(2, n, t), Xc || Lc(4, n, t), al(e, t, n);
				break;
			case 1:
				Xc || (Vc(n, t), r = n.stateNode, typeof r.componentWillUnmount == "function" && zc(n, t, r)), al(e, t, n);
				break;
			case 21:
				al(e, t, n);
				break;
			case 22:
				Xc = (r = Xc) || n.memoizedState !== null, al(e, t, n), Xc = r;
				break;
			default: al(e, t, n);
		}
	}
	function sl(e, t) {
		if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null))) {
			e = e.dehydrated;
			try {
				Np(e);
			} catch (e) {
				Uu(t, t.return, e);
			}
		}
	}
	function cl(e, t) {
		if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null)))) try {
			Np(e);
		} catch (e) {
			Uu(t, t.return, e);
		}
	}
	function ll(e) {
		switch (e.tag) {
			case 31:
			case 13:
			case 19:
				var t = e.stateNode;
				return t === null && (t = e.stateNode = new Qc()), t;
			case 22: return e = e.stateNode, t = e._retryCache, t === null && (t = e._retryCache = new Qc()), t;
			default: throw Error(i(435, e.tag));
		}
	}
	function ul(e, t) {
		var n = ll(e);
		t.forEach(function(t) {
			if (!n.has(t)) {
				n.add(t);
				var r = Ju.bind(null, e, t);
				t.then(r, r);
			}
		});
	}
	function dl(e, t) {
		var n = t.deletions;
		if (n !== null) for (var r = 0; r < n.length; r++) {
			var a = n[r], o = e, s = t, c = s;
			a: for (; c !== null;) {
				switch (c.tag) {
					case 27:
						if (Zd(c.type)) {
							rl = c.stateNode, il = !1;
							break a;
						}
						break;
					case 5:
						rl = c.stateNode, il = !1;
						break a;
					case 3:
					case 4:
						rl = c.stateNode.containerInfo, il = !0;
						break a;
				}
				c = c.return;
			}
			if (rl === null) throw Error(i(160));
			ol(o, s, a), rl = null, il = !1, o = a.alternate, o !== null && (o.return = null), a.return = null;
		}
		if (t.subtreeFlags & 13886) for (t = t.child; t !== null;) pl(t, e), t = t.sibling;
	}
	var fl = null;
	function pl(e, t) {
		var n = e.alternate, r = e.flags;
		switch (e.tag) {
			case 0:
			case 11:
			case 14:
			case 15:
				dl(t, e), ml(e), r & 4 && (Lc(3, e, e.return), Ic(3, e), Lc(5, e, e.return));
				break;
			case 1:
				dl(t, e), ml(e), r & 512 && (Xc || n === null || Vc(n, n.return)), r & 64 && Yc && (e = e.updateQueue, e !== null && (r = e.callbacks, r !== null && (n = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = n === null ? r : n.concat(r))));
				break;
			case 26:
				var a = fl;
				if (dl(t, e), ml(e), r & 512 && (Xc || n === null || Vc(n, n.return)), r & 4) {
					var o = n === null ? null : n.memoizedState;
					if (r = e.memoizedState, n === null) if (r === null) if (e.stateNode === null) {
						a: {
							r = e.type, n = e.memoizedProps, a = a.ownerDocument || a;
							b: switch (r) {
								case "title":
									o = a.getElementsByTagName("title")[0], (!o || o[pt] || o[R] || o.namespaceURI === "http://www.w3.org/2000/svg" || o.hasAttribute("itemprop")) && (o = a.createElement(r), a.head.insertBefore(o, a.querySelector("head > title"))), Pd(o, r, n), o[R] = e, B(o), r = o;
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
							o[R] = e, B(o), r = o;
						}
						e.stateNode = r;
					} else Hf(a, e.type, e.stateNode);
					else e.stateNode = If(a, r, e.memoizedProps);
					else o === r ? r === null && e.stateNode !== null && Uc(e, e.memoizedProps, n.memoizedProps) : (o === null ? n.stateNode !== null && (n = n.stateNode, n.parentNode.removeChild(n)) : o.count--, r === null ? Hf(a, e.type, e.stateNode) : If(a, r, e.memoizedProps));
				}
				break;
			case 27:
				dl(t, e), ml(e), r & 512 && (Xc || n === null || Vc(n, n.return)), n !== null && r & 4 && Uc(e, e.memoizedProps, n.memoizedProps);
				break;
			case 5:
				if (dl(t, e), ml(e), r & 512 && (Xc || n === null || Vc(n, n.return)), e.flags & 32) {
					a = e.stateNode;
					try {
						Ut(a, "");
					} catch (t) {
						Uu(e, e.return, t);
					}
				}
				r & 4 && e.stateNode != null && (a = e.memoizedProps, Uc(e, a, n === null ? a : n.memoizedProps)), r & 1024 && (Zc = !0);
				break;
			case 6:
				if (dl(t, e), ml(e), r & 4) {
					if (e.stateNode === null) throw Error(i(162));
					r = e.memoizedProps, n = e.stateNode;
					try {
						n.nodeValue = r;
					} catch (t) {
						Uu(e, e.return, t);
					}
				}
				break;
			case 3:
				if (Bf = null, a = fl, fl = gf(t.containerInfo), dl(t, e), fl = a, ml(e), r & 4 && n !== null && n.memoizedState.isDehydrated) try {
					Np(t.containerInfo);
				} catch (t) {
					Uu(e, e.return, t);
				}
				Zc && (Zc = !1, hl(e));
				break;
			case 4:
				r = fl, fl = gf(e.stateNode.containerInfo), dl(t, e), ml(e), fl = r;
				break;
			case 12:
				dl(t, e), ml(e);
				break;
			case 31:
				dl(t, e), ml(e), r & 4 && (r = e.updateQueue, r !== null && (e.updateQueue = null, ul(e, r)));
				break;
			case 13:
				dl(t, e), ml(e), e.child.flags & 8192 && e.memoizedState !== null != (n !== null && n.memoizedState !== null) && (Zl = I()), r & 4 && (r = e.updateQueue, r !== null && (e.updateQueue = null, ul(e, r)));
				break;
			case 22:
				a = e.memoizedState !== null;
				var l = n !== null && n.memoizedState !== null, u = Yc, d = Xc;
				if (Yc = u || a, Xc = d || l, dl(t, e), Xc = d, Yc = u, ml(e), r & 8192) a: for (t = e.stateNode, t._visibility = a ? t._visibility & -2 : t._visibility | 1, a && (n === null || l || Yc || Xc || _l(e)), n = null, t = e;;) {
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
								Uu(l, l.return, e);
							}
						}
					} else if (t.tag === 6) {
						if (n === null) {
							l = t;
							try {
								l.stateNode.nodeValue = a ? "" : l.memoizedProps;
							} catch (e) {
								Uu(l, l.return, e);
							}
						}
					} else if (t.tag === 18) {
						if (n === null) {
							l = t;
							try {
								var m = l.stateNode;
								a ? $d(m, !0) : $d(l.stateNode, !1);
							} catch (e) {
								Uu(l, l.return, e);
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
				r & 4 && (r = e.updateQueue, r !== null && (n = r.retryQueue, n !== null && (r.retryQueue = null, ul(e, n))));
				break;
			case 19:
				dl(t, e), ml(e), r & 4 && (r = e.updateQueue, r !== null && (e.updateQueue = null, ul(e, r)));
				break;
			case 30: break;
			case 21: break;
			default: dl(t, e), ml(e);
		}
	}
	function ml(e) {
		var t = e.flags;
		if (t & 2) {
			try {
				for (var n, r = e.return; r !== null;) {
					if (Wc(r)) {
						n = r;
						break;
					}
					r = r.return;
				}
				if (n == null) throw Error(i(160));
				switch (n.tag) {
					case 27:
						var a = n.stateNode;
						qc(e, Gc(e), a);
						break;
					case 5:
						var o = n.stateNode;
						n.flags & 32 && (Ut(o, ""), n.flags &= -33), qc(e, Gc(e), o);
						break;
					case 3:
					case 4:
						var s = n.stateNode.containerInfo;
						Kc(e, Gc(e), s);
						break;
					default: throw Error(i(161));
				}
			} catch (t) {
				Uu(e, e.return, t);
			}
			e.flags &= -3;
		}
		t & 4096 && (e.flags &= -4097);
	}
	function hl(e) {
		if (e.subtreeFlags & 1024) for (e = e.child; e !== null;) {
			var t = e;
			hl(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), e = e.sibling;
		}
	}
	function gl(e, t) {
		if (t.subtreeFlags & 8772) for (t = t.child; t !== null;) tl(e, t.alternate, t), t = t.sibling;
	}
	function _l(e) {
		for (e = e.child; e !== null;) {
			var t = e;
			switch (t.tag) {
				case 0:
				case 11:
				case 14:
				case 15:
					Lc(4, t, t.return), _l(t);
					break;
				case 1:
					Vc(t, t.return);
					var n = t.stateNode;
					typeof n.componentWillUnmount == "function" && zc(t, t.return, n), _l(t);
					break;
				case 27: pf(t.stateNode);
				case 26:
				case 5:
					Vc(t, t.return), _l(t);
					break;
				case 22:
					t.memoizedState === null && _l(t);
					break;
				case 30:
					_l(t);
					break;
				default: _l(t);
			}
			e = e.sibling;
		}
	}
	function vl(e, t, n) {
		for (n &&= (t.subtreeFlags & 8772) != 0, t = t.child; t !== null;) {
			var r = t.alternate, i = e, a = t, o = a.flags;
			switch (a.tag) {
				case 0:
				case 11:
				case 15:
					vl(i, a, n), Ic(4, a);
					break;
				case 1:
					if (vl(i, a, n), r = a, i = r.stateNode, typeof i.componentDidMount == "function") try {
						i.componentDidMount();
					} catch (e) {
						Uu(r, r.return, e);
					}
					if (r = a, i = r.updateQueue, i !== null) {
						var s = r.stateNode;
						try {
							var c = i.shared.hiddenCallbacks;
							if (c !== null) for (i.shared.hiddenCallbacks = null, i = 0; i < c.length; i++) Va(c[i], s);
						} catch (e) {
							Uu(r, r.return, e);
						}
					}
					n && o & 64 && Rc(a), Bc(a, a.return);
					break;
				case 27: Jc(a);
				case 26:
				case 5:
					vl(i, a, n), n && r === null && o & 4 && Hc(a), Bc(a, a.return);
					break;
				case 12:
					vl(i, a, n);
					break;
				case 31:
					vl(i, a, n), n && o & 4 && sl(i, a);
					break;
				case 13:
					vl(i, a, n), n && o & 4 && cl(i, a);
					break;
				case 22:
					a.memoizedState === null && vl(i, a, n), Bc(a, a.return);
					break;
				case 30: break;
				default: vl(i, a, n);
			}
			t = t.sibling;
		}
	}
	function yl(e, t) {
		var n = null;
		e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), e = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), e !== n && (e != null && e.refCount++, n != null && ea(n));
	}
	function bl(e, t) {
		e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && ea(e));
	}
	function xl(e, t, n, r) {
		if (t.subtreeFlags & 10256) for (t = t.child; t !== null;) Sl(e, t, n, r), t = t.sibling;
	}
	function Sl(e, t, n, r) {
		var i = t.flags;
		switch (t.tag) {
			case 0:
			case 11:
			case 15:
				xl(e, t, n, r), i & 2048 && Ic(9, t);
				break;
			case 1:
				xl(e, t, n, r);
				break;
			case 3:
				xl(e, t, n, r), i & 2048 && (e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && ea(e)));
				break;
			case 12:
				if (i & 2048) {
					xl(e, t, n, r), e = t.stateNode;
					try {
						var a = t.memoizedProps, o = a.id, s = a.onPostCommit;
						typeof s == "function" && s(o, t.alternate === null ? "mount" : "update", e.passiveEffectDuration, -0);
					} catch (e) {
						Uu(t, t.return, e);
					}
				} else xl(e, t, n, r);
				break;
			case 31:
				xl(e, t, n, r);
				break;
			case 13:
				xl(e, t, n, r);
				break;
			case 23: break;
			case 22:
				a = t.stateNode, o = t.alternate, t.memoizedState === null ? a._visibility & 2 ? xl(e, t, n, r) : (a._visibility |= 2, Cl(e, t, n, r, (t.subtreeFlags & 10256) != 0 || !1)) : a._visibility & 2 ? xl(e, t, n, r) : wl(e, t), i & 2048 && yl(o, t);
				break;
			case 24:
				xl(e, t, n, r), i & 2048 && bl(t.alternate, t);
				break;
			default: xl(e, t, n, r);
		}
	}
	function Cl(e, t, n, r, i) {
		for (i &&= (t.subtreeFlags & 10256) != 0 || !1, t = t.child; t !== null;) {
			var a = e, o = t, s = n, c = r, l = o.flags;
			switch (o.tag) {
				case 0:
				case 11:
				case 15:
					Cl(a, o, s, c, i), Ic(8, o);
					break;
				case 23: break;
				case 22:
					var u = o.stateNode;
					o.memoizedState === null ? (u._visibility |= 2, Cl(a, o, s, c, i)) : u._visibility & 2 ? Cl(a, o, s, c, i) : wl(a, o), i && l & 2048 && yl(o.alternate, o);
					break;
				case 24:
					Cl(a, o, s, c, i), i && l & 2048 && bl(o.alternate, o);
					break;
				default: Cl(a, o, s, c, i);
			}
			t = t.sibling;
		}
	}
	function wl(e, t) {
		if (t.subtreeFlags & 10256) for (t = t.child; t !== null;) {
			var n = e, r = t, i = r.flags;
			switch (r.tag) {
				case 22:
					wl(n, r), i & 2048 && yl(r.alternate, r);
					break;
				case 24:
					wl(n, r), i & 2048 && bl(r.alternate, r);
					break;
				default: wl(n, r);
			}
			t = t.sibling;
		}
	}
	var Tl = 8192;
	function El(e, t, n) {
		if (e.subtreeFlags & Tl) for (e = e.child; e !== null;) Dl(e, t, n), e = e.sibling;
	}
	function Dl(e, t, n) {
		switch (e.tag) {
			case 26:
				El(e, t, n), e.flags & Tl && e.memoizedState !== null && Gf(n, fl, e.memoizedState, e.memoizedProps);
				break;
			case 5:
				El(e, t, n);
				break;
			case 3:
			case 4:
				var r = fl;
				fl = gf(e.stateNode.containerInfo), El(e, t, n), fl = r;
				break;
			case 22:
				e.memoizedState === null && (r = e.alternate, r !== null && r.memoizedState !== null ? (r = Tl, Tl = 16777216, El(e, t, n), Tl = r) : El(e, t, n));
				break;
			default: El(e, t, n);
		}
	}
	function Ol(e) {
		var t = e.alternate;
		if (t !== null && (e = t.child, e !== null)) {
			t.child = null;
			do
				t = e.sibling, e.sibling = null, e = t;
			while (e !== null);
		}
	}
	function kl(e) {
		var t = e.deletions;
		if (e.flags & 16) {
			if (t !== null) for (var n = 0; n < t.length; n++) {
				var r = t[n];
				$c = r, Ml(r, e);
			}
			Ol(e);
		}
		if (e.subtreeFlags & 10256) for (e = e.child; e !== null;) Al(e), e = e.sibling;
	}
	function Al(e) {
		switch (e.tag) {
			case 0:
			case 11:
			case 15:
				kl(e), e.flags & 2048 && Lc(9, e, e.return);
				break;
			case 3:
				kl(e);
				break;
			case 12:
				kl(e);
				break;
			case 22:
				var t = e.stateNode;
				e.memoizedState !== null && t._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (t._visibility &= -3, jl(e)) : kl(e);
				break;
			default: kl(e);
		}
	}
	function jl(e) {
		var t = e.deletions;
		if (e.flags & 16) {
			if (t !== null) for (var n = 0; n < t.length; n++) {
				var r = t[n];
				$c = r, Ml(r, e);
			}
			Ol(e);
		}
		for (e = e.child; e !== null;) {
			switch (t = e, t.tag) {
				case 0:
				case 11:
				case 15:
					Lc(8, t, t.return), jl(t);
					break;
				case 22:
					n = t.stateNode, n._visibility & 2 && (n._visibility &= -3, jl(t));
					break;
				default: jl(t);
			}
			e = e.sibling;
		}
	}
	function Ml(e, t) {
		for (; $c !== null;) {
			var n = $c;
			switch (n.tag) {
				case 0:
				case 11:
				case 15:
					Lc(8, n, t);
					break;
				case 23:
				case 22:
					if (n.memoizedState !== null && n.memoizedState.cachePool !== null) {
						var r = n.memoizedState.cachePool.pool;
						r != null && r.refCount++;
					}
					break;
				case 24: ea(n.memoizedState.cache);
			}
			if (r = n.child, r !== null) r.return = n, $c = r;
			else a: for (n = e; $c !== null;) {
				r = $c;
				var i = r.sibling, a = r.return;
				if (nl(r), r === n) {
					$c = null;
					break a;
				}
				if (i !== null) {
					i.return = a, $c = i;
					break a;
				}
				$c = a;
			}
		}
	}
	var Nl = {
		getCacheForType: function(e) {
			var t = Ki(Qi), n = t.data.get(e);
			return n === void 0 && (n = e(), t.data.set(e, n)), n;
		},
		cacheSignal: function() {
			return Ki(Qi).controller.signal;
		}
	}, Pl = typeof WeakMap == "function" ? WeakMap : Map, X = 0, Fl = null, Z = null, Q = 0, Il = 0, Ll = null, Rl = !1, zl = !1, Bl = !1, Vl = 0, Hl = 0, Ul = 0, Wl = 0, Gl = 0, Kl = 0, ql = 0, Jl = null, Yl = null, Xl = !1, Zl = 0, Ql = 0, $l = Infinity, eu = null, tu = null, nu = 0, ru = null, iu = null, au = 0, ou = 0, su = null, cu = null, lu = 0, uu = null;
	function du() {
		return X & 2 && Q !== 0 ? Q & -Q : k.T === null ? at() : ud();
	}
	function fu() {
		if (Kl === 0) if (!(Q & 536870912) || J) {
			var e = We;
			We <<= 1, !(We & 3932160) && (We = 262144), Kl = e;
		} else Kl = 536870912;
		return e = Ja.current, e !== null && (e.flags |= 32), Kl;
	}
	function pu(e, t, n) {
		(e === Fl && (Il === 2 || Il === 9) || e.cancelPendingCommit !== null) && (bu(e, 0), _u(e, Q, Kl, !1)), Qe(e, n), (!(X & 2) || e !== Fl) && (e === Fl && (!(X & 2) && (Wl |= n), Hl === 4 && _u(e, Q, Kl, !1)), nd(e));
	}
	function mu(e, t, n) {
		if (X & 6) throw Error(i(327));
		var r = !n && (t & 127) == 0 && (t & e.expiredLanes) === 0 || Je(e, t), a = r ? Ou(e, t) : Eu(e, t, !0), o = r;
		do {
			if (a === 0) {
				zl && !r && _u(e, t, 0, !1);
				break;
			} else {
				if (n = e.current.alternate, o && !gu(n)) {
					a = Eu(e, t, !1), o = !1;
					continue;
				}
				if (a === 2) {
					if (o = t, e.errorRecoveryDisabledLanes & o) var s = 0;
					else s = e.pendingLanes & -536870913, s = s === 0 ? s & 536870912 ? 536870912 : 0 : s;
					if (s !== 0) {
						t = s;
						a: {
							var c = e;
							a = Jl;
							var l = c.current.memoizedState.isDehydrated;
							if (l && (bu(c, s).flags |= 256), s = Eu(c, s, !1), s !== 2) {
								if (Bl && !l) {
									c.errorRecoveryDisabledLanes |= o, Wl |= o, a = 4;
									break a;
								}
								o = Yl, Yl = a, o !== null && (Yl === null ? Yl = o : Yl.push.apply(Yl, o));
							}
							a = s;
						}
						if (o = !1, a !== 2) continue;
					}
				}
				if (a === 1) {
					bu(e, 0), _u(e, t, 0, !0);
					break;
				}
				a: {
					switch (r = e, o = a, o) {
						case 0:
						case 1: throw Error(i(345));
						case 4: if ((t & 4194048) !== t) break;
						case 6:
							_u(r, t, Kl, !Rl);
							break a;
						case 2:
							Yl = null;
							break;
						case 3:
						case 5: break;
						default: throw Error(i(329));
					}
					if ((t & 62914560) === t && (a = Zl + 300 - I(), 10 < a)) {
						if (_u(r, t, Kl, !Rl), qe(r, 0, !0) !== 0) break a;
						au = t, r.timeoutHandle = Kd(hu.bind(null, r, n, Yl, eu, Xl, t, Kl, Wl, ql, Rl, o, "Throttled", -0, 0), a);
						break a;
					}
					hu(r, n, Yl, eu, Xl, t, Kl, Wl, ql, Rl, o, null, -0, 0);
				}
			}
			break;
		} while (1);
		nd(e);
	}
	function hu(e, t, n, r, i, a, o, s, c, l, u, d, f, p) {
		if (e.timeoutHandle = -1, d = t.subtreeFlags, d & 8192 || (d & 16785408) == 16785408) {
			d = {
				stylesheets: null,
				count: 0,
				imgCount: 0,
				imgBytes: 0,
				suspenseyImages: [],
				waitingForImages: !0,
				waitingForViewTransition: !1,
				unsuspend: Xt
			}, Dl(t, a, d);
			var m = (a & 62914560) === a ? Zl - I() : (a & 4194048) === a ? Ql - I() : 0;
			if (m = qf(d, m), m !== null) {
				au = a, e.cancelPendingCommit = m(Fu.bind(null, e, t, a, n, r, i, o, s, c, u, d, null, f, p)), _u(e, a, o, !l);
				return;
			}
		}
		Fu(e, t, a, n, r, i, o, s, c);
	}
	function gu(e) {
		for (var t = e;;) {
			var n = t.tag;
			if ((n === 0 || n === 11 || n === 15) && t.flags & 16384 && (n = t.updateQueue, n !== null && (n = n.stores, n !== null))) for (var r = 0; r < n.length; r++) {
				var i = n[r], a = i.getSnapshot;
				i = i.value;
				try {
					if (!mr(a(), i)) return !1;
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
	function _u(e, t, n, r) {
		t &= ~Gl, t &= ~Wl, e.suspendedLanes |= t, e.pingedLanes &= ~t, r && (e.warmLanes |= t), r = e.expirationTimes;
		for (var i = t; 0 < i;) {
			var a = 31 - ze(i), o = 1 << a;
			r[a] = -1, i &= ~o;
		}
		n !== 0 && et(e, n, t);
	}
	function vu() {
		return X & 6 ? !0 : (rd(0, !1), !1);
	}
	function yu() {
		if (Z !== null) {
			if (Il === 0) var e = Z.return;
			else e = Z, Ri = Li = null, So(e), Ca = null, wa = 0, e = Z;
			for (; e !== null;) Fc(e.alternate, e), e = e.return;
			Z = null;
		}
	}
	function bu(e, t) {
		var n = e.timeoutHandle;
		n !== -1 && (e.timeoutHandle = -1, qd(n)), n = e.cancelPendingCommit, n !== null && (e.cancelPendingCommit = null, n()), au = 0, yu(), Fl = e, Z = n = ti(e.current, null), Q = t, Il = 0, Ll = null, Rl = !1, zl = Je(e, t), Bl = !1, ql = Kl = Gl = Wl = Ul = Hl = 0, Yl = Jl = null, Xl = !1, t & 8 && (t |= t & 32);
		var r = e.entangledLanes;
		if (r !== 0) for (e = e.entanglements, r &= t; 0 < r;) {
			var i = 31 - ze(r), a = 1 << i;
			t |= e[i], r &= ~a;
		}
		return Vl = t, Kr(), n;
	}
	function xu(e, t) {
		Y = null, k.H = Ms, t === pa || t === ha ? (t = xa(), Il = 3) : t === ma ? (t = xa(), Il = 4) : Il = t === Xs ? 8 : typeof t == "object" && t && typeof t.then == "function" ? 6 : 1, Ll = t, Z === null && (Hl = 1, Ws(e, li(t, e.current)));
	}
	function Su() {
		var e = Ja.current;
		return e === null ? !0 : (Q & 4194048) === Q ? Ya === null : (Q & 62914560) === Q || Q & 536870912 ? e === Ya : !1;
	}
	function Cu() {
		var e = k.H;
		return k.H = Ms, e === null ? Ms : e;
	}
	function wu() {
		var e = k.A;
		return k.A = Nl, e;
	}
	function Tu() {
		Hl = 4, Rl || (Q & 4194048) !== Q && Ja.current !== null || (zl = !0), !(Ul & 134217727) && !(Wl & 134217727) || Fl === null || _u(Fl, Q, Kl, !1);
	}
	function Eu(e, t, n) {
		var r = X;
		X |= 2;
		var i = Cu(), a = wu();
		(Fl !== e || Q !== t) && (eu = null, bu(e, t)), t = !1;
		var o = Hl;
		a: do
			try {
				if (Il !== 0 && Z !== null) {
					var s = Z, c = Ll;
					switch (Il) {
						case 8:
							yu(), o = 6;
							break a;
						case 3:
						case 2:
						case 9:
						case 6:
							Ja.current === null && (t = !0);
							var l = Il;
							if (Il = 0, Ll = null, Mu(e, s, c, l), n && zl) {
								o = 0;
								break a;
							}
							break;
						default: l = Il, Il = 0, Ll = null, Mu(e, s, c, l);
					}
				}
				Du(), o = Hl;
				break;
			} catch (t) {
				xu(e, t);
			}
		while (1);
		return t && e.shellSuspendCounter++, Ri = Li = null, X = r, k.H = i, k.A = a, Z === null && (Fl = null, Q = 0, Kr()), o;
	}
	function Du() {
		for (; Z !== null;) Au(Z);
	}
	function Ou(e, t) {
		var n = X;
		X |= 2;
		var r = Cu(), a = wu();
		Fl !== e || Q !== t ? (eu = null, $l = I() + 500, bu(e, t)) : zl = Je(e, t);
		a: do
			try {
				if (Il !== 0 && Z !== null) {
					t = Z;
					var o = Ll;
					b: switch (Il) {
						case 1:
							Il = 0, Ll = null, Mu(e, t, o, 1);
							break;
						case 2:
						case 9:
							if (_a(o)) {
								Il = 0, Ll = null, ju(t);
								break;
							}
							t = function() {
								Il !== 2 && Il !== 9 || Fl !== e || (Il = 7), nd(e);
							}, o.then(t, t);
							break a;
						case 3:
							Il = 7;
							break a;
						case 4:
							Il = 5;
							break a;
						case 7:
							_a(o) ? (Il = 0, Ll = null, ju(t)) : (Il = 0, Ll = null, Mu(e, t, o, 7));
							break;
						case 5:
							var s = null;
							switch (Z.tag) {
								case 26: s = Z.memoizedState;
								case 5:
								case 27:
									var c = Z;
									if (s ? Wf(s) : c.stateNode.complete) {
										Il = 0, Ll = null;
										var l = c.sibling;
										if (l !== null) Z = l;
										else {
											var u = c.return;
											u === null ? Z = null : (Z = u, Nu(u));
										}
										break b;
									}
							}
							Il = 0, Ll = null, Mu(e, t, o, 5);
							break;
						case 6:
							Il = 0, Ll = null, Mu(e, t, o, 6);
							break;
						case 8:
							yu(), Hl = 6;
							break a;
						default: throw Error(i(462));
					}
				}
				ku();
				break;
			} catch (t) {
				xu(e, t);
			}
		while (1);
		return Ri = Li = null, k.H = r, k.A = a, X = n, Z === null ? (Fl = null, Q = 0, Kr(), Hl) : 0;
	}
	function ku() {
		for (; Z !== null && !Ee();) Au(Z);
	}
	function Au(e) {
		var t = Ec(e.alternate, e, Vl);
		e.memoizedProps = e.pendingProps, t === null ? Nu(e) : Z = t;
	}
	function ju(e) {
		var t = e, n = t.alternate;
		switch (t.tag) {
			case 15:
			case 0:
				t = uc(n, t, t.pendingProps, t.type, void 0, Q);
				break;
			case 11:
				t = uc(n, t, t.pendingProps, t.type.render, t.ref, Q);
				break;
			case 5: So(t);
			default: Fc(n, t), t = Z = ni(t, Vl), t = Ec(n, t, Vl);
		}
		e.memoizedProps = e.pendingProps, t === null ? Nu(e) : Z = t;
	}
	function Mu(e, t, n, r) {
		Ri = Li = null, So(t), Ca = null, wa = 0;
		var i = t.return;
		try {
			if (Ys(e, i, t, n, Q)) {
				Hl = 1, Ws(e, li(n, e.current)), Z = null;
				return;
			}
		} catch (t) {
			if (i !== null) throw Z = i, t;
			Hl = 1, Ws(e, li(n, e.current)), Z = null;
			return;
		}
		t.flags & 32768 ? (J || r === 1 ? e = !0 : zl || Q & 536870912 ? e = !1 : (Rl = e = !0, (r === 2 || r === 9 || r === 3 || r === 6) && (r = Ja.current, r !== null && r.tag === 13 && (r.flags |= 16384))), Pu(t, e)) : Nu(t);
	}
	function Nu(e) {
		var t = e;
		do {
			if (t.flags & 32768) {
				Pu(t, Rl);
				return;
			}
			e = t.return;
			var n = Nc(t.alternate, t, Vl);
			if (n !== null) {
				Z = n;
				return;
			}
			if (t = t.sibling, t !== null) {
				Z = t;
				return;
			}
			Z = t = e;
		} while (t !== null);
		Hl === 0 && (Hl = 5);
	}
	function Pu(e, t) {
		do {
			var n = Pc(e.alternate, e);
			if (n !== null) {
				n.flags &= 32767, Z = n;
				return;
			}
			if (n = e.return, n !== null && (n.flags |= 32768, n.subtreeFlags = 0, n.deletions = null), !t && (e = e.sibling, e !== null)) {
				Z = e;
				return;
			}
			Z = e = n;
		} while (e !== null);
		Hl = 6, Z = null;
	}
	function Fu(e, t, n, r, a, o, s, c, l) {
		e.cancelPendingCommit = null;
		do
			Bu();
		while (nu !== 0);
		if (X & 6) throw Error(i(327));
		if (t !== null) {
			if (t === e.current) throw Error(i(177));
			if (o = t.lanes | t.childLanes, o |= Gr, $e(e, n, o, s, c, l), e === Fl && (Z = Fl = null, Q = 0), iu = t, ru = e, au = n, ou = o, su = a, cu = r, t.subtreeFlags & 10256 || t.flags & 10256 ? (e.callbackNode = null, e.callbackPriority = 0, Yu(je, function() {
				return Vu(), null;
			})) : (e.callbackNode = null, e.callbackPriority = 0), r = (t.flags & 13878) != 0, t.subtreeFlags & 13878 || r) {
				r = k.T, k.T = null, a = A.p, A.p = 2, s = X, X |= 4;
				try {
					el(e, t, n);
				} finally {
					X = s, A.p = a, k.T = r;
				}
			}
			nu = 1, Iu(), Lu(), Ru();
		}
	}
	function Iu() {
		if (nu === 1) {
			nu = 0;
			var e = ru, t = iu, n = (t.flags & 13878) != 0;
			if (t.subtreeFlags & 13878 || n) {
				n = k.T, k.T = null;
				var r = A.p;
				A.p = 2;
				var i = X;
				X |= 4;
				try {
					pl(t, e);
					var a = zd, o = yr(e.containerInfo), s = a.focusedElem, c = a.selectionRange;
					if (o !== s && s && s.ownerDocument && vr(s.ownerDocument.documentElement, s)) {
						if (c !== null && br(s)) {
							var l = c.start, u = c.end;
							if (u === void 0 && (u = l), "selectionStart" in s) s.selectionStart = l, s.selectionEnd = Math.min(u, s.value.length);
							else {
								var d = s.ownerDocument || document, f = d && d.defaultView || window;
								if (f.getSelection) {
									var p = f.getSelection(), m = s.textContent.length, h = Math.min(c.start, m), g = c.end === void 0 ? h : Math.min(c.end, m);
									!p.extend && h > g && (o = g, g = h, h = o);
									var _ = _r(s, h), v = _r(s, g);
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
					X = i, A.p = r, k.T = n;
				}
			}
			e.current = t, nu = 2;
		}
	}
	function Lu() {
		if (nu === 2) {
			nu = 0;
			var e = ru, t = iu, n = (t.flags & 8772) != 0;
			if (t.subtreeFlags & 8772 || n) {
				n = k.T, k.T = null;
				var r = A.p;
				A.p = 2;
				var i = X;
				X |= 4;
				try {
					tl(e, t.alternate, t);
				} finally {
					X = i, A.p = r, k.T = n;
				}
			}
			nu = 3;
		}
	}
	function Ru() {
		if (nu === 4 || nu === 3) {
			nu = 0, De();
			var e = ru, t = iu, n = au, r = cu;
			t.subtreeFlags & 10256 || t.flags & 10256 ? nu = 5 : (nu = 0, iu = ru = null, zu(e, e.pendingLanes));
			var i = e.pendingLanes;
			if (i === 0 && (tu = null), it(n), t = t.stateNode, Le && typeof Le.onCommitFiberRoot == "function") try {
				Le.onCommitFiberRoot(Ie, t, void 0, (t.current.flags & 128) == 128);
			} catch {}
			if (r !== null) {
				t = k.T, i = A.p, A.p = 2, k.T = null;
				try {
					for (var a = e.onRecoverableError, o = 0; o < r.length; o++) {
						var s = r[o];
						a(s.value, { componentStack: s.stack });
					}
				} finally {
					k.T = t, A.p = i;
				}
			}
			au & 3 && Bu(), nd(e), i = e.pendingLanes, n & 261930 && i & 42 ? e === uu ? lu++ : (lu = 0, uu = e) : lu = 0, rd(0, !1);
		}
	}
	function zu(e, t) {
		(e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache, t != null && (e.pooledCache = null, ea(t)));
	}
	function Bu() {
		return Iu(), Lu(), Ru(), Vu();
	}
	function Vu() {
		if (nu !== 5) return !1;
		var e = ru, t = ou;
		ou = 0;
		var n = it(au), r = k.T, a = A.p;
		try {
			A.p = 32 > n ? 32 : n, k.T = null, n = su, su = null;
			var o = ru, s = au;
			if (nu = 0, iu = ru = null, au = 0, X & 6) throw Error(i(331));
			var c = X;
			if (X |= 4, Al(o.current), Sl(o, o.current, s, n), X = c, rd(0, !1), Le && typeof Le.onPostCommitFiberRoot == "function") try {
				Le.onPostCommitFiberRoot(Ie, o);
			} catch {}
			return !0;
		} finally {
			A.p = a, k.T = r, zu(e, t);
		}
	}
	function Hu(e, t, n) {
		t = li(n, t), t = Ks(e.stateNode, t, 2), e = Fa(e, t, 2), e !== null && (Qe(e, 2), nd(e));
	}
	function Uu(e, t, n) {
		if (e.tag === 3) Hu(e, e, n);
		else for (; t !== null;) {
			if (t.tag === 3) {
				Hu(t, e, n);
				break;
			} else if (t.tag === 1) {
				var r = t.stateNode;
				if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (tu === null || !tu.has(r))) {
					e = li(n, e), n = qs(2), r = Fa(t, n, 2), r !== null && (Js(n, r, t, e), Qe(r, 2), nd(r));
					break;
				}
			}
			t = t.return;
		}
	}
	function Wu(e, t, n) {
		var r = e.pingCache;
		if (r === null) {
			r = e.pingCache = new Pl();
			var i = /* @__PURE__ */ new Set();
			r.set(t, i);
		} else i = r.get(t), i === void 0 && (i = /* @__PURE__ */ new Set(), r.set(t, i));
		i.has(n) || (Bl = !0, i.add(n), e = Gu.bind(null, e, t, n), t.then(e, e));
	}
	function Gu(e, t, n) {
		var r = e.pingCache;
		r !== null && r.delete(t), e.pingedLanes |= e.suspendedLanes & n, e.warmLanes &= ~n, Fl === e && (Q & n) === n && (Hl === 4 || Hl === 3 && (Q & 62914560) === Q && 300 > I() - Zl ? !(X & 2) && bu(e, 0) : Gl |= n, ql === Q && (ql = 0)), nd(e);
	}
	function Ku(e, t) {
		t === 0 && (t = Xe()), e = Yr(e, t), e !== null && (Qe(e, t), nd(e));
	}
	function qu(e) {
		var t = e.memoizedState, n = 0;
		t !== null && (n = t.retryLane), Ku(e, n);
	}
	function Ju(e, t) {
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
		r !== null && r.delete(t), Ku(e, n);
	}
	function Yu(e, t) {
		return we(e, t);
	}
	var Xu = null, Zu = null, Qu = !1, $u = !1, ed = !1, td = 0;
	function nd(e) {
		e !== Zu && e.next === null && (Zu === null ? Xu = Zu = e : Zu = Zu.next = e), $u = !0, Qu || (Qu = !0, ld());
	}
	function rd(e, t) {
		if (!ed && $u) {
			ed = !0;
			do
				for (var n = !1, r = Xu; r !== null;) {
					if (!t) if (e !== 0) {
						var i = r.pendingLanes;
						if (i === 0) var a = 0;
						else {
							var o = r.suspendedLanes, s = r.pingedLanes;
							a = (1 << 31 - ze(42 | e) + 1) - 1, a &= i & ~(o & ~s), a = a & 201326741 ? a & 201326741 | 1 : a ? a | 2 : 0;
						}
						a !== 0 && (n = !0, cd(r, a));
					} else a = Q, a = qe(r, r === Fl ? a : 0, r.cancelPendingCommit !== null || r.timeoutHandle !== -1), !(a & 3) || Je(r, a) || (n = !0, cd(r, a));
					r = r.next;
				}
			while (n);
			ed = !1;
		}
	}
	function id() {
		ad();
	}
	function ad() {
		$u = Qu = !1;
		var e = 0;
		td !== 0 && Gd() && (e = td);
		for (var t = I(), n = null, r = Xu; r !== null;) {
			var i = r.next, a = od(r, t);
			a === 0 ? (r.next = null, n === null ? Xu = i : n.next = i, i === null && (Zu = n)) : (n = r, (e !== 0 || a & 3) && ($u = !0)), r = i;
		}
		nu !== 0 && nu !== 5 || rd(e, !1), td !== 0 && (td = 0);
	}
	function od(e, t) {
		for (var n = e.suspendedLanes, r = e.pingedLanes, i = e.expirationTimes, a = e.pendingLanes & -62914561; 0 < a;) {
			var o = 31 - ze(a), s = 1 << o, c = i[o];
			c === -1 ? ((s & n) === 0 || (s & r) !== 0) && (i[o] = Ye(s, t)) : c <= t && (e.expiredLanes |= s), a &= ~s;
		}
		if (t = Fl, n = Q, n = qe(e, e === t ? n : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1), r = e.callbackNode, n === 0 || e === t && (Il === 2 || Il === 9) || e.cancelPendingCommit !== null) return r !== null && r !== null && Te(r), e.callbackNode = null, e.callbackPriority = 0;
		if (!(n & 3) || Je(e, n)) {
			if (t = n & -n, t === e.callbackPriority) return t;
			switch (r !== null && Te(r), it(n)) {
				case 2:
				case 8:
					n = Ae;
					break;
				case 32:
					n = je;
					break;
				case 268435456:
					n = Ne;
					break;
				default: n = je;
			}
			return r = sd.bind(null, e), n = we(n, r), e.callbackPriority = t, e.callbackNode = n, t;
		}
		return r !== null && r !== null && Te(r), e.callbackPriority = 2, e.callbackNode = null, 2;
	}
	function sd(e, t) {
		if (nu !== 0 && nu !== 5) return e.callbackNode = null, e.callbackPriority = 0, null;
		var n = e.callbackNode;
		if (Bu() && e.callbackNode !== n) return null;
		var r = Q;
		return r = qe(e, e === Fl ? r : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1), r === 0 ? null : (mu(e, r, t), od(e, I()), e.callbackNode != null && e.callbackNode === n ? sd.bind(null, e) : null);
	}
	function cd(e, t) {
		if (Bu()) return null;
		mu(e, t, !0);
	}
	function ld() {
		Yd(function() {
			X & 6 ? we(ke, id) : ad();
		});
	}
	function ud() {
		if (td === 0) {
			var e = ra;
			e === 0 && (e = Ue, Ue <<= 1, !(Ue & 261888) && (Ue = 256)), td = e;
		}
		return td;
	}
	function dd(e) {
		return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : Yt("" + e);
	}
	function fd(e, t) {
		var n = t.ownerDocument.createElement("input");
		return n.name = t.name, n.value = t.value, e.id && n.setAttribute("form", e.id), t.parentNode.insertBefore(n, t), e = new FormData(e), n.parentNode.removeChild(n), e;
	}
	function pd(e, t, n, r, i) {
		if (t === "submit" && n && n.stateNode === i) {
			var a = dd((i[st] || null).action), o = r.submitter;
			o && (t = (t = o[st] || null) ? dd(t.formAction) : o.getAttribute("formAction"), t !== null && (a = t, o = null));
			var s = new vn("action", "action", null, r, i);
			e.push({
				event: s,
				listeners: [{
					instance: null,
					listener: function() {
						if (r.defaultPrevented) {
							if (td !== 0) {
								var e = o ? fd(i, o) : new FormData(i);
								vs(n, {
									pending: !0,
									data: e,
									method: i.method,
									action: a
								}, null, e);
							}
						} else typeof a == "function" && (s.preventDefault(), e = o ? fd(i, o) : new FormData(i), vs(n, {
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
	for (var md = 0; md < Br.length; md++) {
		var hd = Br[md];
		Vr(hd.toLowerCase(), "on" + (hd[0].toUpperCase() + hd.slice(1)));
	}
	Vr(Mr, "onAnimationEnd"), Vr(Nr, "onAnimationIteration"), Vr(Pr, "onAnimationStart"), Vr("dblclick", "onDoubleClick"), Vr("focusin", "onFocus"), Vr("focusout", "onBlur"), Vr(Fr, "onTransitionRun"), Vr(Ir, "onTransitionStart"), Vr(Lr, "onTransitionCancel"), Vr(Rr, "onTransitionEnd"), xt("onMouseEnter", ["mouseout", "mouseover"]), xt("onMouseLeave", ["mouseout", "mouseover"]), xt("onPointerEnter", ["pointerout", "pointerover"]), xt("onPointerLeave", ["pointerout", "pointerover"]), bt("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), bt("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), bt("onBeforeInput", [
		"compositionend",
		"keypress",
		"textInput",
		"paste"
	]), bt("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), bt("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), bt("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
	var gd = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), _d = new Set("beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(gd));
	function vd(e, t) {
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
						Hr(e);
					}
					i.currentTarget = null, a = c;
				}
				else for (o = 0; o < r.length; o++) {
					if (s = r[o], c = s.instance, l = s.currentTarget, s = s.listener, c !== a && i.isPropagationStopped()) break a;
					a = s, i.currentTarget = l;
					try {
						a(i);
					} catch (e) {
						Hr(e);
					}
					i.currentTarget = null, a = c;
				}
			}
		}
	}
	function $(e, t) {
		var n = t[lt];
		n === void 0 && (n = t[lt] = /* @__PURE__ */ new Set());
		var r = e + "__bubble";
		n.has(r) || (Sd(t, e, 2, !1), n.add(r));
	}
	function yd(e, t, n) {
		var r = 0;
		t && (r |= 4), Sd(n, e, r, t);
	}
	var bd = "_reactListening" + Math.random().toString(36).slice(2);
	function xd(e) {
		if (!e[bd]) {
			e[bd] = !0, vt.forEach(function(t) {
				t !== "selectionchange" && (_d.has(t) || yd(t, !1, e), yd(t, !0, e));
			});
			var t = e.nodeType === 9 ? e : e.ownerDocument;
			t === null || t[bd] || (t[bd] = !0, yd("selectionchange", !1, t));
		}
	}
	function Sd(e, t, n, r) {
		switch (mp(t)) {
			case 2:
				var i = cp;
				break;
			case 8:
				i = lp;
				break;
			default: i = up;
		}
		n = i.bind(null, t, n, e), i = void 0, !sn || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (i = !0), r ? i === void 0 ? e.addEventListener(t, n, !0) : e.addEventListener(t, n, {
			capture: !0,
			passive: i
		}) : i === void 0 ? e.addEventListener(t, n, !1) : e.addEventListener(t, n, { passive: i });
	}
	function Cd(e, t, n, r, i) {
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
					if (s = z(c), s === null) return;
					if (l = s.tag, l === 5 || l === 6 || l === 26 || l === 27) {
						r = a = s;
						continue a;
					}
					c = c.parentNode;
				}
			}
			r = r.return;
		}
		rn(function() {
			var r = a, i = Qt(n), s = [];
			a: {
				var c = zr.get(e);
				if (c !== void 0) {
					var l = vn, u = e;
					switch (e) {
						case "keypress": if (pn(n) === 0) break a;
						case "keydown":
						case "keyup":
							l = Fn;
							break;
						case "focusin":
							u = "focus", l = En;
							break;
						case "focusout":
							u = "blur", l = En;
							break;
						case "beforeblur":
						case "afterblur":
							l = En;
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
							l = wn;
							break;
						case "drag":
						case "dragend":
						case "dragenter":
						case "dragexit":
						case "dragleave":
						case "dragover":
						case "dragstart":
						case "drop":
							l = Tn;
							break;
						case "touchcancel":
						case "touchend":
						case "touchmove":
						case "touchstart":
							l = Ln;
							break;
						case Mr:
						case Nr:
						case Pr:
							l = Dn;
							break;
						case Rr:
							l = Rn;
							break;
						case "scroll":
						case "scrollend":
							l = yn;
							break;
						case "wheel":
							l = zn;
							break;
						case "copy":
						case "cut":
						case "paste":
							l = On;
							break;
						case "gotpointercapture":
						case "lostpointercapture":
						case "pointercancel":
						case "pointerdown":
						case "pointermove":
						case "pointerout":
						case "pointerover":
						case "pointerup":
							l = In;
							break;
						case "toggle":
						case "beforetoggle": l = Bn;
					}
					var d = (t & 4) != 0, f = !d && (e === "scroll" || e === "scrollend"), p = d ? c === null ? null : c + "Capture" : c;
					d = [];
					for (var m = r, h; m !== null;) {
						var g = m;
						if (h = g.stateNode, g = g.tag, g !== 5 && g !== 26 && g !== 27 || h === null || p === null || (g = an(m, p), g != null && d.push(wd(m, g, h))), f) break;
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
					if (c = e === "mouseover" || e === "pointerover", l = e === "mouseout" || e === "pointerout", c && n !== Zt && (u = n.relatedTarget || n.fromElement) && (z(u) || u[ct])) break a;
					if ((l || c) && (c = i.window === i ? i : (c = i.ownerDocument) ? c.defaultView || c.parentWindow : window, l ? (u = n.relatedTarget || n.toElement, l = r, u = u ? z(u) : null, u !== null && (f = o(u), d = u.tag, u !== f || d !== 5 && d !== 27 && d !== 6) && (u = null)) : (l = null, u = r), l !== u)) {
						if (d = wn, g = "onMouseLeave", p = "onMouseEnter", m = "mouse", (e === "pointerout" || e === "pointerover") && (d = In, g = "onPointerLeave", p = "onPointerEnter", m = "pointer"), f = l == null ? c : gt(l), h = u == null ? c : gt(u), c = new d(g, m + "leave", l, n, i), c.target = f, c.relatedTarget = h, g = null, z(i) === r && (d = new d(p, m + "enter", u, n, i), d.target = h, d.relatedTarget = f, g = d), f = g, l && u) b: {
							for (d = Ed, p = l, m = u, h = 0, g = p; g; g = d(g)) h++;
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
						l !== null && Dd(s, c, l, d, !1), u !== null && f !== null && Dd(s, f, u, d, !0);
					}
				}
				a: {
					if (c = r ? gt(r) : window, l = c.nodeName && c.nodeName.toLowerCase(), l === "select" || l === "input" && c.type === "file") var v = or;
					else if (er(c)) if (sr) v = pr;
					else {
						v = dr;
						var y = ur;
					}
					else l = c.nodeName, !l || l.toLowerCase() !== "input" || c.type !== "checkbox" && c.type !== "radio" ? r && qt(r.elementType) && (v = or) : v = fr;
					if (v &&= v(e, r)) {
						tr(s, v, n, i);
						break a;
					}
					y && y(e, c, r), e === "focusout" && r && c.type === "number" && r.memoizedProps.value != null && zt(c, "number", c.value);
				}
				switch (y = r ? gt(r) : window, e) {
					case "focusin":
						(er(y) || y.contentEditable === "true") && (Sr = y, Cr = r, wr = null);
						break;
					case "focusout":
						wr = Cr = Sr = null;
						break;
					case "mousedown":
						Tr = !0;
						break;
					case "contextmenu":
					case "mouseup":
					case "dragend":
						Tr = !1, Er(s, n, i);
						break;
					case "selectionchange": if (xr) break;
					case "keydown":
					case "keyup": Er(s, n, i);
				}
				var b;
				if (Hn) b: {
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
				else Xn ? Jn(e, n) && (x = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (x = "onCompositionStart");
				x && (Gn && n.locale !== "ko" && (Xn || x !== "onCompositionStart" ? x === "onCompositionEnd" && Xn && (b = fn()) : (ln = i, un = "value" in ln ? ln.value : ln.textContent, Xn = !0)), y = Td(r, x), 0 < y.length && (x = new kn(x, e, null, n, i), s.push({
					event: x,
					listeners: y
				}), b ? x.data = b : (b = Yn(n), b !== null && (x.data = b)))), (b = Wn ? Zn(e, n) : Qn(e, n)) && (x = Td(r, "onBeforeInput"), 0 < x.length && (y = new kn("onBeforeInput", "beforeinput", null, n, i), s.push({
					event: y,
					listeners: x
				}), y.data = b)), pd(s, e, r, n, i);
			}
			vd(s, t);
		});
	}
	function wd(e, t, n) {
		return {
			instance: e,
			listener: t,
			currentTarget: n
		};
	}
	function Td(e, t) {
		for (var n = t + "Capture", r = []; e !== null;) {
			var i = e, a = i.stateNode;
			if (i = i.tag, i !== 5 && i !== 26 && i !== 27 || a === null || (i = an(e, n), i != null && r.unshift(wd(e, i, a)), i = an(e, t), i != null && r.push(wd(e, i, a))), e.tag === 3) return r;
			e = e.return;
		}
		return [];
	}
	function Ed(e) {
		if (e === null) return null;
		do
			e = e.return;
		while (e && e.tag !== 5 && e.tag !== 27);
		return e || null;
	}
	function Dd(e, t, n, r, i) {
		for (var a = t._reactName, o = []; n !== null && n !== r;) {
			var s = n, c = s.alternate, l = s.stateNode;
			if (s = s.tag, c !== null && c === r) break;
			s !== 5 && s !== 26 && s !== 27 || l === null || (c = l, i ? (l = an(n, a), l != null && o.unshift(wd(n, l, c))) : i || (l = an(n, a), l != null && o.push(wd(n, l, c)))), n = n.return;
		}
		o.length !== 0 && e.push({
			event: t,
			listeners: o
		});
	}
	var Od = /\r\n?/g, kd = /\u0000|\uFFFD/g;
	function Ad(e) {
		return (typeof e == "string" ? e : "" + e).replace(Od, "\n").replace(kd, "");
	}
	function jd(e, t) {
		return t = Ad(t), Ad(e) === t;
	}
	function Md(e, t, n, r, a, o) {
		switch (n) {
			case "children":
				typeof r == "string" ? t === "body" || t === "textarea" && r === "" || Ut(e, r) : (typeof r == "number" || typeof r == "bigint") && t !== "body" && Ut(e, "" + r);
				break;
			case "className":
				Dt(e, "class", r);
				break;
			case "tabIndex":
				Dt(e, "tabindex", r);
				break;
			case "dir":
			case "role":
			case "viewBox":
			case "width":
			case "height":
				Dt(e, n, r);
				break;
			case "style":
				Kt(e, r, o);
				break;
			case "data": if (t !== "object") {
				Dt(e, "data", r);
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
				r = Yt("" + r), e.setAttribute(n, r);
				break;
			case "action":
			case "formAction":
				if (typeof r == "function") {
					e.setAttribute(n, "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')");
					break;
				} else typeof o == "function" && (n === "formAction" ? (t !== "input" && Md(e, t, "name", a.name, a, null), Md(e, t, "formEncType", a.formEncType, a, null), Md(e, t, "formMethod", a.formMethod, a, null), Md(e, t, "formTarget", a.formTarget, a, null)) : (Md(e, t, "encType", a.encType, a, null), Md(e, t, "method", a.method, a, null), Md(e, t, "target", a.target, a, null)));
				if (r == null || typeof r == "symbol" || typeof r == "boolean") {
					e.removeAttribute(n);
					break;
				}
				r = Yt("" + r), e.setAttribute(n, r);
				break;
			case "onClick":
				r != null && (e.onclick = Xt);
				break;
			case "onScroll":
				r != null && $("scroll", e);
				break;
			case "onScrollEnd":
				r != null && $("scrollend", e);
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
				n = Yt("" + r), e.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", n);
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
				$("beforetoggle", e), $("toggle", e), Et(e, "popover", r);
				break;
			case "xlinkActuate":
				Ot(e, "http://www.w3.org/1999/xlink", "xlink:actuate", r);
				break;
			case "xlinkArcrole":
				Ot(e, "http://www.w3.org/1999/xlink", "xlink:arcrole", r);
				break;
			case "xlinkRole":
				Ot(e, "http://www.w3.org/1999/xlink", "xlink:role", r);
				break;
			case "xlinkShow":
				Ot(e, "http://www.w3.org/1999/xlink", "xlink:show", r);
				break;
			case "xlinkTitle":
				Ot(e, "http://www.w3.org/1999/xlink", "xlink:title", r);
				break;
			case "xlinkType":
				Ot(e, "http://www.w3.org/1999/xlink", "xlink:type", r);
				break;
			case "xmlBase":
				Ot(e, "http://www.w3.org/XML/1998/namespace", "xml:base", r);
				break;
			case "xmlLang":
				Ot(e, "http://www.w3.org/XML/1998/namespace", "xml:lang", r);
				break;
			case "xmlSpace":
				Ot(e, "http://www.w3.org/XML/1998/namespace", "xml:space", r);
				break;
			case "is":
				Et(e, "is", r);
				break;
			case "innerText":
			case "textContent": break;
			default: (!(2 < n.length) || n[0] !== "o" && n[0] !== "O" || n[1] !== "n" && n[1] !== "N") && (n = Jt.get(n) || n, Et(e, n, r));
		}
	}
	function Nd(e, t, n, r, a, o) {
		switch (n) {
			case "style":
				Kt(e, r, o);
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
				typeof r == "string" ? Ut(e, r) : (typeof r == "number" || typeof r == "bigint") && Ut(e, "" + r);
				break;
			case "onScroll":
				r != null && $("scroll", e);
				break;
			case "onScrollEnd":
				r != null && $("scrollend", e);
				break;
			case "onClick":
				r != null && (e.onclick = Xt);
				break;
			case "suppressContentEditableWarning":
			case "suppressHydrationWarning":
			case "innerHTML":
			case "ref": break;
			case "innerText":
			case "textContent": break;
			default: if (!yt.hasOwnProperty(n)) a: {
				if (n[0] === "o" && n[1] === "n" && (a = n.endsWith("Capture"), t = n.slice(2, a ? n.length - 7 : void 0), o = e[st] || null, o = o == null ? null : o[n], typeof o == "function" && e.removeEventListener(t, o, a), typeof r == "function")) {
					typeof o != "function" && o !== null && (n in e ? e[n] = null : e.hasAttribute(n) && e.removeAttribute(n)), e.addEventListener(t, r, a);
					break a;
				}
				n in e ? e[n] = r : !0 === r ? e.setAttribute(n, "") : Et(e, n, r);
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
				$("error", e), $("load", e);
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
						default: Md(e, t, o, s, n, null);
					}
				}
				a && Md(e, t, "srcSet", n.srcSet, n, null), r && Md(e, t, "src", n.src, n, null);
				return;
			case "input":
				$("invalid", e);
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
						default: Md(e, t, r, d, n, null);
					}
				}
				Rt(e, o, c, l, u, s, a, !1);
				return;
			case "select":
				for (a in $("invalid", e), r = s = o = null, n) if (n.hasOwnProperty(a) && (c = n[a], c != null)) switch (a) {
					case "value":
						o = c;
						break;
					case "defaultValue":
						s = c;
						break;
					case "multiple": r = c;
					default: Md(e, t, a, c, n, null);
				}
				t = o, n = s, e.multiple = !!r, t == null ? n != null && Bt(e, !!r, n, !0) : Bt(e, !!r, t, !1);
				return;
			case "textarea":
				for (s in $("invalid", e), o = a = r = null, n) if (n.hasOwnProperty(s) && (c = n[s], c != null)) switch (s) {
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
					default: Md(e, t, s, c, n, null);
				}
				Ht(e, r, a, o);
				return;
			case "option":
				for (l in n) if (n.hasOwnProperty(l) && (r = n[l], r != null)) switch (l) {
					case "selected":
						e.selected = r && typeof r != "function" && typeof r != "symbol";
						break;
					default: Md(e, t, l, r, n, null);
				}
				return;
			case "dialog":
				$("beforetoggle", e), $("toggle", e), $("cancel", e), $("close", e);
				break;
			case "iframe":
			case "object":
				$("load", e);
				break;
			case "video":
			case "audio":
				for (r = 0; r < gd.length; r++) $(gd[r], e);
				break;
			case "image":
				$("error", e), $("load", e);
				break;
			case "details":
				$("toggle", e);
				break;
			case "embed":
			case "source":
			case "link": $("error", e), $("load", e);
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
					default: Md(e, t, u, r, n, null);
				}
				return;
			default: if (qt(t)) {
				for (d in n) n.hasOwnProperty(d) && (r = n[d], r !== void 0 && Nd(e, t, d, r, n, void 0));
				return;
			}
		}
		for (c in n) n.hasOwnProperty(c) && (r = n[c], r != null && Md(e, t, c, r, n, null));
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
						default: r.hasOwnProperty(m) || Md(e, t, m, null, r, f);
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
						default: m !== f && Md(e, t, p, m, r, f);
					}
				}
				Lt(e, s, c, l, u, d, o, a);
				return;
			case "select":
				for (o in m = s = c = p = null, n) if (l = n[o], n.hasOwnProperty(o) && l != null) switch (o) {
					case "value": break;
					case "multiple": m = l;
					default: r.hasOwnProperty(o) || Md(e, t, o, null, r, l);
				}
				for (a in r) if (o = r[a], l = n[a], r.hasOwnProperty(a) && (o != null || l != null)) switch (a) {
					case "value":
						p = o;
						break;
					case "defaultValue":
						c = o;
						break;
					case "multiple": s = o;
					default: o !== l && Md(e, t, a, o, r, l);
				}
				t = c, n = s, r = m, p == null ? !!r != !!n && (t == null ? Bt(e, !!n, n ? [] : "", !1) : Bt(e, !!n, t, !0)) : Bt(e, !!n, p, !1);
				return;
			case "textarea":
				for (c in m = p = null, n) if (a = n[c], n.hasOwnProperty(c) && a != null && !r.hasOwnProperty(c)) switch (c) {
					case "value": break;
					case "children": break;
					default: Md(e, t, c, null, r, a);
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
					default: a !== o && Md(e, t, s, a, r, o);
				}
				Vt(e, p, m);
				return;
			case "option":
				for (var h in n) if (p = n[h], n.hasOwnProperty(h) && p != null && !r.hasOwnProperty(h)) switch (h) {
					case "selected":
						e.selected = !1;
						break;
					default: Md(e, t, h, null, r, p);
				}
				for (l in r) if (p = r[l], m = n[l], r.hasOwnProperty(l) && p !== m && (p != null || m != null)) switch (l) {
					case "selected":
						e.selected = p && typeof p != "function" && typeof p != "symbol";
						break;
					default: Md(e, t, l, p, r, m);
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
				for (var g in n) p = n[g], n.hasOwnProperty(g) && p != null && !r.hasOwnProperty(g) && Md(e, t, g, null, r, p);
				for (u in r) if (p = r[u], m = n[u], r.hasOwnProperty(u) && p !== m && (p != null || m != null)) switch (u) {
					case "children":
					case "dangerouslySetInnerHTML":
						if (p != null) throw Error(i(137, t));
						break;
					default: Md(e, t, u, p, r, m);
				}
				return;
			default: if (qt(t)) {
				for (var _ in n) p = n[_], n.hasOwnProperty(_) && p !== void 0 && !r.hasOwnProperty(_) && Nd(e, t, _, void 0, r, p);
				for (d in r) p = r[d], m = n[d], !r.hasOwnProperty(d) || p === m || p === void 0 && m === void 0 || Nd(e, t, d, p, r, m);
				return;
			}
		}
		for (var v in n) p = n[v], n.hasOwnProperty(v) && p != null && !r.hasOwnProperty(v) && Md(e, t, v, null, r, p);
		for (f in r) p = r[f], m = n[f], !r.hasOwnProperty(f) || p === m || p == null && m == null || Md(e, t, f, p, r, m);
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
					a[pt] || s === "SCRIPT" || s === "STYLE" || s === "LINK" && a.rel.toLowerCase() === "stylesheet" || n.removeChild(a), a = o;
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
					ef(n), mt(n);
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
			else if (!e[pt]) switch (t) {
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
		mt(e);
	}
	var mf = /* @__PURE__ */ new Map(), hf = /* @__PURE__ */ new Set();
	function gf(e) {
		return typeof e.getRootNode == "function" ? e.getRootNode() : e.nodeType === 9 ? e : e.ownerDocument;
	}
	var _f = A.d;
	A.d = {
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
		var e = _f.f(), t = vu();
		return e || t;
	}
	function yf(e) {
		var t = ht(e);
		t !== null && t.tag === 5 && t.type === "form" ? bs(t) : _f.r(e);
	}
	var bf = typeof document > "u" ? null : document;
	function xf(e, t, n) {
		var r = bf;
		if (r && typeof t == "string" && t) {
			var i = It(t);
			i = "link[rel=\"" + e + "\"][href=\"" + i + "\"]", typeof n == "string" && (i += "[crossorigin=\"" + n + "\"]"), hf.has(i) || (hf.add(i), e = {
				rel: e,
				crossOrigin: n,
				href: t
			}, r.querySelector(i) === null && (t = r.createElement("link"), Pd(t, "link", e), B(t), r.head.appendChild(t)));
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
			var i = "link[rel=\"preload\"][as=\"" + It(t) + "\"]";
			t === "image" && n && n.imageSrcSet ? (i += "[imagesrcset=\"" + It(n.imageSrcSet) + "\"]", typeof n.imageSizes == "string" && (i += "[imagesizes=\"" + It(n.imageSizes) + "\"]")) : i += "[href=\"" + It(e) + "\"]";
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
			}, n), mf.set(a, e), r.querySelector(i) !== null || t === "style" && r.querySelector(jf(a)) || t === "script" && r.querySelector(Ff(a)) || (t = r.createElement("link"), Pd(t, "link", e), B(t), r.head.appendChild(t)));
		}
	}
	function Tf(e, t) {
		_f.m(e, t);
		var n = bf;
		if (n && e) {
			var r = t && typeof t.as == "string" ? t.as : "script", i = "link[rel=\"modulepreload\"][as=\"" + It(r) + "\"][href=\"" + It(e) + "\"]", a = i;
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
				r = n.createElement("link"), Pd(r, "link", e), B(r), n.head.appendChild(r);
			}
		}
	}
	function Ef(e, t, n) {
		_f.S(e, t, n);
		var r = bf;
		if (r && e) {
			var i = _t(r).hoistableStyles, a = Af(e);
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
					B(c), Pd(c, "link", e), c._p = new Promise(function(e, t) {
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
			var r = _t(n).hoistableScripts, i = Pf(e), a = r.get(i);
			a || (a = n.querySelector(Ff(i)), a || (e = h({
				src: e,
				async: !0
			}, t), (t = mf.get(i)) && zf(e, t), a = n.createElement("script"), B(a), Pd(a, "link", e), n.head.appendChild(a)), a = {
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
			var r = _t(n).hoistableScripts, i = Pf(e), a = r.get(i);
			a || (a = n.querySelector(Ff(i)), a || (e = h({
				src: e,
				async: !0,
				type: "module"
			}, t), (t = mf.get(i)) && zf(e, t), a = n.createElement("script"), B(a), Pd(a, "link", e), n.head.appendChild(a)), a = {
				type: "script",
				instance: a,
				count: 1,
				state: null
			}, r.set(i, a));
		}
	}
	function kf(e, t, n, r) {
		var a = (a = pe.current) ? gf(a) : null;
		if (!a) throw Error(i(446));
		switch (e) {
			case "meta":
			case "title": return null;
			case "style": return typeof n.precedence == "string" && typeof n.href == "string" ? (t = Af(n.href), n = _t(a).hoistableStyles, r = n.get(t), r || (r = {
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
					var o = _t(a).hoistableStyles, s = o.get(e);
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
			case "script": return t = n.async, n = n.src, typeof n == "string" && t && typeof t != "function" && typeof t != "symbol" ? (t = Pf(n), n = _t(a).hoistableScripts, r = n.get(t), r || (r = {
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
		return "href=\"" + It(e) + "\"";
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
		}), Pd(t, "link", n), B(t), e.head.appendChild(t));
	}
	function Pf(e) {
		return "[src=\"" + It(e) + "\"]";
	}
	function Ff(e) {
		return "script[async]" + e;
	}
	function If(e, t, n) {
		if (t.count++, t.instance === null) switch (t.type) {
			case "style":
				var r = e.querySelector("style[data-href~=\"" + It(n.href) + "\"]");
				if (r) return t.instance = r, B(r), r;
				var a = h({}, n, {
					"data-href": n.href,
					"data-precedence": n.precedence,
					href: null,
					precedence: null
				});
				return r = (e.ownerDocument || e).createElement("style"), B(r), Pd(r, "style", a), Lf(r, n.precedence, e), t.instance = r;
			case "stylesheet":
				a = Af(n.href);
				var o = e.querySelector(jf(a));
				if (o) return t.state.loading |= 4, t.instance = o, B(o), o;
				r = Mf(n), (a = mf.get(a)) && Rf(r, a), o = (e.ownerDocument || e).createElement("link"), B(o);
				var s = o;
				return s._p = new Promise(function(e, t) {
					s.onload = e, s.onerror = t;
				}), Pd(o, "link", r), t.state.loading |= 4, Lf(o, n.precedence, e), t.instance = o;
			case "script": return o = Pf(n.src), (a = e.querySelector(Ff(o))) ? (t.instance = a, B(a), a) : (r = n, (a = mf.get(o)) && (r = h({}, n), zf(r, a)), e = e.ownerDocument || e, a = e.createElement("script"), B(a), Pd(a, "link", r), e.head.appendChild(a), t.instance = a);
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
			if (!(a[pt] || a[R] || e === "link" && a.getAttribute("rel") === "stylesheet") && a.namespaceURI !== "http://www.w3.org/2000/svg") {
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
					t = a._p, typeof t == "object" && t && typeof t.then == "function" && (e.count++, e = Jf.bind(e), t.then(e, e)), n.state.loading |= 4, n.instance = a, B(a);
					return;
				}
				a = t.ownerDocument || t, r = Mf(r), (i = mf.get(i)) && Rf(r, i), a = a.createElement("link"), B(a);
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
		$$typeof: ee,
		Provider: null,
		Consumer: null,
		_currentValue: se,
		_currentValue2: se,
		_threadCount: 0
	};
	function $f(e, t, n, r, i, a, o, s, c) {
		this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = Ze(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Ze(0), this.hiddenUpdates = Ze(null), this.identifierPrefix = r, this.onUncaughtError = i, this.onCaughtError = a, this.onRecoverableError = o, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = c, this.incompleteTransitions = /* @__PURE__ */ new Map();
	}
	function ep(e, t, n, r, i, a, o, s, c, l, u, d) {
		return e = new $f(e, t, n, o, c, l, u, d, s), t = 1, !0 === a && (t |= 24), a = $r(3, null, null, t), e.current = a, a.stateNode = e, t = $i(), t.refCount++, e.pooledCache = t, t.refCount++, a.memoizedState = {
			element: r,
			isDehydrated: n,
			cache: t
		}, Ma(a), e;
	}
	function tp(e) {
		return e ? (e = Zr, e) : Zr;
	}
	function np(e, t, n, r, i, a) {
		i = tp(i), r.context === null ? r.context = i : r.pendingContext = i, r = Pa(t), r.payload = { element: n }, a = a === void 0 ? null : a, a !== null && (r.callback = a), n = Fa(e, r, t), n !== null && (pu(n, e, t), Ia(n, e, t));
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
			var t = Yr(e, 67108864);
			t !== null && pu(t, e, 67108864), ip(e, 67108864);
		}
	}
	function op(e) {
		if (e.tag === 13 || e.tag === 31) {
			var t = du();
			t = rt(t);
			var n = Yr(e, t);
			n !== null && pu(n, e, t), ip(e, t);
		}
	}
	var sp = !0;
	function cp(e, t, n, r) {
		var i = k.T;
		k.T = null;
		var a = A.p;
		try {
			A.p = 2, up(e, t, n, r);
		} finally {
			A.p = a, k.T = i;
		}
	}
	function lp(e, t, n, r) {
		var i = k.T;
		k.T = null;
		var a = A.p;
		try {
			A.p = 8, up(e, t, n, r);
		} finally {
			A.p = a, k.T = i;
		}
	}
	function up(e, t, n, r) {
		if (sp) {
			var i = dp(r);
			if (i === null) Cd(e, t, r, fp, n), Cp(e, r);
			else if (Tp(i, e, t, n, r)) r.stopPropagation();
			else if (Cp(e, r), t & 4 && -1 < Sp.indexOf(e)) {
				for (; i !== null;) {
					var a = ht(i);
					if (a !== null) switch (a.tag) {
						case 3:
							if (a = a.stateNode, a.current.memoizedState.isDehydrated) {
								var o = Ke(a.pendingLanes);
								if (o !== 0) {
									var s = a;
									for (s.pendingLanes |= 2, s.entangledLanes |= 2; o;) {
										var c = 1 << 31 - ze(o);
										s.entanglements[1] |= c, o &= ~c;
									}
									nd(a), !(X & 6) && ($l = I() + 500, rd(0, !1));
								}
							}
							break;
						case 31:
						case 13: s = Yr(a, 2), s !== null && pu(s, a, 2), vu(), ip(a, 2);
					}
					if (a = dp(r), a === null && Cd(e, t, r, fp, n), a === i) break;
					i = a;
				}
				i !== null && r.stopPropagation();
			} else Cd(e, t, r, null, n);
		}
	}
	function dp(e) {
		return e = Qt(e), pp(e);
	}
	var fp = null;
	function pp(e) {
		if (fp = null, e = z(e), e !== null) {
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
			case "message": switch (Oe()) {
				case ke: return 2;
				case Ae: return 8;
				case je:
				case Me: return 32;
				case Ne: return 268435456;
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
		}, t !== null && (t = ht(t), t !== null && ap(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, i !== null && t.indexOf(i) === -1 && t.push(i), e);
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
		var t = z(e.target);
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
				Zt = r, n.target.dispatchEvent(r), Zt = null;
			} else return t = ht(n), t !== null && ap(t), e.blockedOn = n, !1;
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
				var a = ht(n);
				a !== null && (e.splice(t, 3), t -= 3, vs(a, {
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
			var i = n[r], a = n[r + 1], o = i[st] || null;
			if (typeof a == "function") o || Mp(n);
			else if (o) {
				var s = null;
				if (a && a.hasAttribute("formAction")) {
					if (i = a, o = a[st] || null) s = o.formAction;
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
		np(n, du(), e, t, null, null);
	}, Ip.prototype.unmount = Fp.prototype.unmount = function() {
		var e = this._internalRoot;
		if (e !== null) {
			this._internalRoot = null;
			var t = e.containerInfo;
			np(e.current, 2, null, e, null, null), vu(), t[ct] = null;
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
	A.findDOMNode = function(e) {
		var t = e._reactInternals;
		if (t === void 0) throw typeof e.render == "function" ? Error(i(188)) : (e = Object.keys(e).join(","), Error(i(268, e)));
		return e = d(t), e = e === null ? null : p(e), e = e === null ? null : e.stateNode, e;
	};
	var Rp = {
		bundleType: 0,
		version: "19.2.6",
		rendererPackageName: "react-dom",
		currentDispatcherRef: k,
		reconcilerVersion: "19.2.6"
	};
	if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
		var zp = __REACT_DEVTOOLS_GLOBAL_HOOK__;
		if (!zp.isDisabled && zp.supportsFiber) try {
			Ie = zp.inject(Rp), Le = zp;
		} catch {}
	}
	e.createRoot = function(e, t) {
		if (!a(e)) throw Error(i(299));
		var n = !1, r = "", o = Vs, s = Hs, c = Us;
		return t != null && (!0 === t.unstable_strictMode && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onUncaughtError !== void 0 && (o = t.onUncaughtError), t.onCaughtError !== void 0 && (s = t.onCaughtError), t.onRecoverableError !== void 0 && (c = t.onRecoverableError)), t = ep(e, 1, !1, null, null, n, r, null, o, s, c, Pp), e[ct] = t.current, xd(e), new Fp(t);
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
})), _ = /* @__PURE__ */ c(u(), 1), v = g(), y = /* @__PURE__ */ o(((e) => {
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
})), b = (/* @__PURE__ */ o(((e, t) => {
	t.exports = y();
})))(), x = {
	income: 12500,
	rent: 2750,
	living: 2500,
	parents: 2e3,
	partner: 1e3,
	investment: 3750,
	travel: 2e3,
	learning: 500,
	emergency: 500,
	repayment: 0,
	debt: 2e4,
	deadlineMonths: 0,
	income: 13e3,
	living: 3500,
	investment: 2750,
	travel: 1e3
}, S = (e) => Math.round((e + 2 ** -52 * Math.abs(e)) * 100);
function ee(e) {
	let t = { ...x };
	if (!e || typeof e != "object") return t;
	for (let n of Object.keys(t)) {
		let r = e[n];
		typeof r == "number" && Number.isFinite(r) && r >= 0 && (t[n] = S(Math.min(r, 1e8)) / 100);
	}
	return t.deadlineMonths = Math.floor(t.deadlineMonths), t;
}
//#endregion
//#region app/annual-budget-model.ts
var C = {
	allocationVersion: 3,
	salary: 13e3,
	awayMonths: 3,
	paidDays: 90,
	allowanceUsd: 110,
	dailySpendUsd: 60,
	budgetFx: 6.7,
	emergencyCurrent: 2e3,
	emergencyTargetMonths: 6,
	emergencyMonthlyNeed: 4750,
	bufferMonths: 3,
	bonusAfterTax: null,
	mode: "normal",
	rows: [
		{
			id: "rent",
			name: "房租",
			kind: "consumption",
			normal: 2750,
			trip: 2750,
			note: "个人承担的房租"
		},
		{
			id: "parents",
			name: "家用",
			kind: "consumption",
			normal: 2e3,
			trip: 2e3,
			note: "给父母的家用，不计为个人资产"
		},
		{
			id: "investment",
			name: "投资基金",
			kind: "investment",
			normal: 2750,
			trip: 2750,
			note: "投入本金，不计投资收益或亏损"
		},
		{
			id: "emergency",
			name: "应急储备",
			kind: "emergency",
			normal: 500,
			trip: 500,
			note: "应急&学习金中的应急部分，不计学习消费"
		},
		{
			id: "learning",
			name: "学习基金",
			kind: "consumption",
			normal: 1e3,
			trip: 1e3,
			note: "订阅、书籍和其他会员"
		},
		{
			id: "travel",
			name: "旅游基金",
			kind: "consumption",
			normal: 1e3,
			trip: 1e3,
			note: "实际旅行从中支付，不重复拨款"
		},
		{
			id: "partner",
			name: "伴侣基金",
			kind: "consumption",
			normal: 1e3,
			trip: 1e3,
			note: "水电网、住房额外支出等"
		},
		{
			id: "small",
			name: "小额支付",
			kind: "consumption",
			normal: 1e3,
			trip: 0,
			note: "早餐、地铁通勤、日常小零食"
		},
		{
			id: "daily",
			name: "日常使用",
			kind: "consumption",
			normal: 1e3,
			trip: 1700,
			note: "午晚餐及其余生活消费，不重复包含上列项目"
		}
	]
}, w = (e) => Math.round((e + 2 ** -52 * Math.abs(e)) * 100) / 100, T = (e) => Math.round(w(e) * 100), te = [
	"salary",
	"awayMonths",
	"paidDays",
	"allowanceUsd",
	"dailySpendUsd",
	"budgetFx",
	"emergencyCurrent",
	"emergencyTargetMonths",
	"emergencyMonthlyNeed",
	"bufferMonths"
];
function E(e) {
	let t = {
		...C,
		rows: C.rows.map((e) => ({ ...e }))
	};
	if (!e || typeof e != "object") return t;
	let n = e;
	for (let e of te) {
		let r = n[e];
		typeof r == "number" && Number.isFinite(r) && r >= 0 && (t[e] = w(Math.min(r, 1e8)));
	}
	t.awayMonths = Math.min(12, Math.floor(t.awayMonths)), t.paidDays = Math.min(366, Math.floor(t.paidDays)), t.bufferMonths = Math.min(12, Math.floor(t.bufferMonths)), t.emergencyTargetMonths = Math.min(24, Math.floor(t.emergencyTargetMonths)), t.mode = n.mode === "trip" ? "trip" : "normal", typeof n.bonusAfterTax == "number" && Number.isFinite(n.bonusAfterTax) && n.bonusAfterTax >= 0 && (t.bonusAfterTax = w(Math.min(n.bonusAfterTax, 1e8))), Array.isArray(n.rows) && (t.rows = t.rows.map((e) => {
		let t = n.rows?.find((t) => t && t.id === e.id);
		for (let n of ["normal", "trip"]) {
			let r = t?.[n];
			typeof r == "number" && Number.isFinite(r) && r >= 0 && (e[n] = w(Math.min(r, 1e8)));
		}
		return e;
	}));
	let r = {
		food: [2880, 0],
		transport: [670, 0],
		sports: [400, 400],
		clothes: [300, 300],
		digital: [300, 300],
		medical: [300, 300],
		gifts: [100, 100],
		dates: [300, 300]
	};
	if (Array.isArray(n.rows) && !n.rows.some((e) => e?.id === "small" || e?.id === "daily") && n.rows.some((e) => e && Object.hasOwn(r, e.id))) {
		for (let [e, i] of ["normal", "trip"].entries()) {
			let a = Object.entries(r).reduce((t, [r, a]) => {
				let o = n.rows?.find((e) => e?.id === r)?.[i];
				return t + T(typeof o == "number" && Number.isFinite(o) && o >= 0 ? Math.min(o, 1e8) : a[e]);
			}, 0) / 100, o = i === "normal" ? Math.min(1e3, a) : 0;
			t.rows.find((e) => e.id === "small")[i] = o, t.rows.find((e) => e.id === "daily")[i] = w(a - o);
		}
		t.salary === 13e3 && t.rows.every((e) => {
			let t = C.rows.find((t) => t.id === e.id);
			return e.normal === (e.id === "daily" ? 4250 : e.id === "emergency" ? 500 : t.normal) && e.trip === (e.id === "emergency" ? 500 : t.trip);
		}) && (t.rows.find((e) => e.id === "daily").normal = 1e3);
	}
	if (n.allocationVersion !== 3) {
		t.emergencyMonthlyNeed = 4750;
		let e = t.rows.find((e) => e.id === "emergency");
		for (let t of ["normal", "trip"]) e[t] = 500;
	}
	return t;
}
function D(e, t, n, r) {
	return !Number.isFinite(r) || r < 0 || r > 1e8 || !e.rows.some((e) => e.id === t) ? e : E({
		...e,
		rows: e.rows.map((e) => e.id === t ? {
			...e,
			[n]: r
		} : e)
	});
}
function ne(e, t = e.bonusAfterTax ?? 0) {
	let n = ie(e), r = w(t), i = w(n.annualIncome + r), a = w(n.annualSaving + r), o = w(n.annualEmergency + n.annualSurplus + r), s = w(n.annualRetained + r);
	return {
		bonus: r,
		incomeWithBonus: i,
		fixedTarget: a,
		projectedCash: o,
		projectedAccumulation: s,
		accumulationRate: i > 0 ? s / i : null
	};
}
function re(e, t = []) {
	let n = ie(e)[e.mode], r = w(t.filter((e) => e.direction === "inflow").reduce((e, t) => e + t.amount, 0)), i = w(t.filter((e) => e.direction === "outflow").reduce((e, t) => e + t.amount, 0)), a = w(e.salary + r), o = w(n.totalOutflow + i);
	return {
		inflow: a,
		outflow: o,
		change: w(a - o),
		consumption: n.consumption,
		saving: n.saving,
		extraInflow: r,
		extraOutflow: i
	};
}
function ie(e) {
	let t = 12 - e.awayMonths, n = w(e.allowanceUsd - e.dailySpendUsd), r = w(e.salary * 12), i = w(e.paidDays * n * e.budgetFx), a = w(r + i), o = e.rows.map((n) => ({
		...n,
		annual: (T(n.normal) * t + T(n.trip) * e.awayMonths) / 100
	})), s = o.find((e) => e.id === "learning"), c = o.filter((e) => e.id !== "learning").map((e) => e.id === "emergency" ? {
		...e,
		id: "emergencyLearning",
		name: "应急&学习金",
		note: "应急储备与学习消费分别核算",
		normal: w(e.normal + (s?.normal ?? 0)),
		trip: w(e.trip + (s?.trip ?? 0)),
		annual: w(e.annual + (s?.annual ?? 0))
	} : e), l = (e) => o.filter((t) => t.kind === e).reduce((e, t) => e + T(t.annual), 0) / 100, u = l("consumption"), d = l("investment"), f = l("emergency"), p = w(d + f), m = w(u + p), h = w(a - m), g = w(a - u), _ = (t) => {
		let n = o.filter((e) => e.kind === "consumption").reduce((e, n) => e + T(n[t]), 0) / 100, r = o.filter((e) => e.kind !== "consumption").reduce((e, n) => e + T(n[t]), 0) / 100, a = t === "trip" && e.awayMonths > 0 ? w(i / e.awayMonths) : 0, s = w(e.salary + a), c = w(n + r);
		return {
			consumption: n,
			saving: r,
			tripNet: a,
			income: s,
			totalOutflow: c,
			surplus: w(s - c)
		};
	}, v = _("normal"), y = _("trip"), b = w(v.surplus * t), x = w(i + (e.salary - y.totalOutflow) * e.awayMonths), S = Math.max(0, -v.surplus), ee = w(S * e.bufferMonths), C = w(e.emergencyMonthlyNeed), te = w(C * e.emergencyTargetMonths), E = w(e.emergencyCurrent + f), D = w(n * e.budgetFx), ne = D > 0 ? Math.ceil(Math.max(0, w(m - r)) / D) : null;
	return {
		rows: o,
		allocationRows: c,
		normalMonths: t,
		annualSalary: r,
		annualTripNet: i,
		annualIncome: a,
		annualConsumption: u,
		annualInvestment: d,
		annualEmergency: f,
		annualSaving: p,
		annualOutflow: m,
		annualSurplus: h,
		annualRetained: g,
		averageIncome: w(a / 12),
		averageSurplus: w(h / 12),
		savingRate: a > 0 ? p / a : 0,
		netUsd: n,
		dailyNetCny: D,
		normal: v,
		trip: y,
		annualNormalSurplus: b,
		annualTripSurplus: x,
		normalDeficit: S,
		buffer: ee,
		basicNeed: C,
		emergencyTarget: te,
		emergencyYearEnd: E,
		emergencyGap: Math.max(0, w(te - E)),
		requiredTripDays: ne,
		assumptionsConflict: e.paidDays > e.awayMonths * 31
	};
}
//#endregion
//#region app/annual-budget-plan.tsx
var O = (e) => `¥${e.toLocaleString("zh-CN", { maximumFractionDigits: 2 })}`;
function ae({ plan: e, onChange: t }) {
	let n = ie(e), r = ne(e), i = e.bonusAfterTax !== null, a = [
		1e4,
		2e4,
		3e4
	].map((t) => ne(e, t)), o = (e) => e === null ? "—" : `${(e * 100).toFixed(1)}%`, s = n.rows.find((e) => e.kind === "investment"), c = n.rows.find((e) => e.kind === "emergency"), l = (e) => e?.normal === e?.trip ? `每月${O(e?.normal ?? 0)}` : `不出差月份${O(e?.normal ?? 0)}、出差月份${O(e?.trip ?? 0)}`;
	return /* @__PURE__ */ (0, b.jsxs)("section", {
		className: "annual-accumulation",
		"aria-labelledby": "annual-accumulation-title",
		children: [
			/* @__PURE__ */ (0, b.jsxs)("div", {
				className: "annual-subheading",
				children: [/* @__PURE__ */ (0, b.jsx)("h3", {
					id: "annual-accumulation-title",
					children: "更新后的年度积累"
				}), /* @__PURE__ */ (0, b.jsx)("p", { children: "沿用上方分配表；年终奖与额外绩效奖金合计记为税后奖金 B，按全部存下测算。" })]
			}),
			/* @__PURE__ */ (0, b.jsxs)("label", {
				className: "annual-bonus-input",
				children: [
					/* @__PURE__ */ (0, b.jsx)("span", { children: "全年税后额外奖金 B（可选测算）" }),
					/* @__PURE__ */ (0, b.jsx)("input", {
						type: "number",
						min: "0",
						step: "1000",
						value: e.bonusAfterTax ?? "",
						placeholder: "未确定时留空，以 B 表示",
						onChange: (n) => t(E({
							...e,
							bonusAfterTax: n.target.value === "" ? null : Number(n.target.value)
						}))
					}),
					/* @__PURE__ */ (0, b.jsx)("small", { children: "输入金额只用于测算；基础预算及已录入账户余额按原口径显示。" })
				]
			}),
			/* @__PURE__ */ (0, b.jsx)("div", {
				className: "annual-table-scroll",
				tabIndex: 0,
				role: "region",
				"aria-label": "年度积累明细横向滚动区域",
				children: /* @__PURE__ */ (0, b.jsxs)("table", {
					className: "annual-budget-table annual-accumulation-table",
					"aria-label": "更新后的年度积累",
					children: [
						/* @__PURE__ */ (0, b.jsx)("thead", { children: /* @__PURE__ */ (0, b.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, b.jsx)("th", {
								scope: "col",
								children: "积累项目"
							}),
							/* @__PURE__ */ (0, b.jsx)("th", {
								scope: "col",
								children: "全年金额"
							}),
							/* @__PURE__ */ (0, b.jsx)("th", {
								scope: "col",
								children: "计算口径"
							})
						] }) }),
						/* @__PURE__ */ (0, b.jsxs)("tbody", { children: [
							/* @__PURE__ */ (0, b.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, b.jsx)("th", {
									scope: "row",
									children: "固定投资"
								}),
								/* @__PURE__ */ (0, b.jsx)("td", { children: O(n.annualInvestment) }),
								/* @__PURE__ */ (0, b.jsxs)("td", { children: [l(s), "，属于投入本金"] })
							] }),
							/* @__PURE__ */ (0, b.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, b.jsx)("th", {
									scope: "row",
									children: "固定应急储蓄"
								}),
								/* @__PURE__ */ (0, b.jsx)("td", { children: O(n.annualEmergency) }),
								/* @__PURE__ */ (0, b.jsxs)("td", { children: [l(c), "，属于新增现金储备"] })
							] }),
							/* @__PURE__ */ (0, b.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, b.jsx)("th", {
									scope: "row",
									children: "基础预算剩余"
								}),
								/* @__PURE__ */ (0, b.jsx)("td", { children: O(n.annualSurplus) }),
								/* @__PURE__ */ (0, b.jsx)("td", { children: "年末确实未花掉，才算实际积蓄" })
							] }),
							/* @__PURE__ */ (0, b.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, b.jsx)("th", {
									scope: "row",
									children: "年终奖 + 额外绩效奖金"
								}),
								/* @__PURE__ */ (0, b.jsx)("td", { children: i ? O(r.bonus) : "记为 B（待确认）" }),
								/* @__PURE__ */ (0, b.jsx)("td", { children: "税后金额全部存下" })
							] }),
							/* @__PURE__ */ (0, b.jsxs)("tr", {
								className: "annual-subtotal",
								children: [
									/* @__PURE__ */ (0, b.jsx)("th", {
										scope: "row",
										children: "全年固定储蓄投资目标"
									}),
									/* @__PURE__ */ (0, b.jsx)("td", {
										"data-testid": "annual-fixed-accumulation",
										children: i ? O(r.fixedTarget) : `${O(n.annualSaving)} + B`
									}),
									/* @__PURE__ */ (0, b.jsx)("td", { children: "投资 + 应急储蓄 + B；不依赖基础预算剩余" })
								]
							})
						] }),
						/* @__PURE__ */ (0, b.jsx)("tfoot", { children: /* @__PURE__ */ (0, b.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, b.jsx)("th", {
								scope: "row",
								children: "按预算预计可积累总额"
							}),
							/* @__PURE__ */ (0, b.jsx)("td", {
								"data-testid": "annual-projected-accumulation",
								children: i ? O(r.projectedAccumulation) : `${O(n.annualRetained)} + B`
							}),
							/* @__PURE__ */ (0, b.jsx)("td", { children: "包含预计余量，不计投资涨跌" })
						] }) })
					]
				})
			}),
			/* @__PURE__ */ (0, b.jsx)("p", {
				className: "annual-budget-note",
				children: "这是全年新增投入与留存金额，不含已有应急金或账户余额。投资本金投入不等于资产一定增值，预计余量需等年末核实。"
			}),
			i && /* @__PURE__ */ (0, b.jsxs)("div", {
				className: "annual-bonus-result",
				"aria-live": "polite",
				children: [
					/* @__PURE__ */ (0, b.jsxs)("span", { children: [
						"按 B = ",
						O(r.bonus),
						" 测算"
					] }),
					/* @__PURE__ */ (0, b.jsx)("strong", { children: r.projectedCash >= 0 ? `预计新增现金积蓄 ${O(r.projectedCash)}` : `预计现金缺口 ${O(-r.projectedCash)}` }),
					/* @__PURE__ */ (0, b.jsxs)("span", { children: [
						"加上投资本金 ",
						O(n.annualInvestment),
						"，预计全年积累 ",
						O(r.projectedAccumulation),
						"，占全年可分配资金 ",
						o(r.accumulationRate),
						"。"
					] })
				]
			}),
			/* @__PURE__ */ (0, b.jsxs)("div", {
				className: "annual-subheading",
				children: [/* @__PURE__ */ (0, b.jsx)("h3", { children: "奖金会怎样改变全年储蓄水平？" }), /* @__PURE__ */ (0, b.jsx)("p", { children: "以下仅为不同奖金金额的情景测算，不预测实际奖金金额。" })]
			}),
			/* @__PURE__ */ (0, b.jsx)("div", {
				className: "annual-table-scroll",
				tabIndex: 0,
				role: "region",
				"aria-label": "奖金情景横向滚动区域",
				children: /* @__PURE__ */ (0, b.jsxs)("table", {
					className: "annual-budget-table annual-bonus-scenarios",
					"aria-label": "税后奖金对全年积累的情景测算",
					children: [/* @__PURE__ */ (0, b.jsx)("thead", { children: /* @__PURE__ */ (0, b.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, b.jsx)("th", {
							scope: "col",
							children: "全年税后额外奖金"
						}),
						/* @__PURE__ */ (0, b.jsx)("th", {
							scope: "col",
							children: "预计新增现金积蓄"
						}),
						/* @__PURE__ */ (0, b.jsx)("th", {
							scope: "col",
							children: "加上投资本金后的全年积累"
						}),
						/* @__PURE__ */ (0, b.jsx)("th", {
							scope: "col",
							children: "占全年可分配资金"
						})
					] }) }), /* @__PURE__ */ (0, b.jsx)("tbody", { children: a.map((e) => /* @__PURE__ */ (0, b.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, b.jsx)("th", {
							scope: "row",
							children: O(e.bonus)
						}),
						/* @__PURE__ */ (0, b.jsx)("td", { children: O(e.projectedCash) }),
						/* @__PURE__ */ (0, b.jsx)("td", { children: /* @__PURE__ */ (0, b.jsx)("strong", { children: O(e.projectedAccumulation) }) }),
						/* @__PURE__ */ (0, b.jsx)("td", { children: /* @__PURE__ */ (0, b.jsx)("strong", { children: o(e.accumulationRate) }) })
					] }, e.bonus)) })]
				})
			}),
			/* @__PURE__ */ (0, b.jsxs)("p", {
				className: "annual-budget-note",
				children: [
					"新增现金积蓄 = 应急新增",
					O(n.annualEmergency),
					" + 基础预算余量",
					O(n.annualSurplus),
					" + B；比例的分母 = 工资 + 出差净结余 + 该情景的税后奖金。所有金额随上方预算联动。"
				]
			})
		]
	});
}
function oe({ plan: e, onChange: t, titleId: n, saveAction: r, saveStatus: i }) {
	let a = ie(e), o = (n, r, i) => t(D(e, n, r, Number(i)));
	return /* @__PURE__ */ (0, b.jsxs)("section", {
		className: "annual-allocation",
		"aria-labelledby": n,
		children: [
			/* @__PURE__ */ (0, b.jsxs)("div", {
				className: "annual-subheading annual-table-heading",
				children: [/* @__PURE__ */ (0, b.jsxs)("div", { children: [/* @__PURE__ */ (0, b.jsx)("h3", {
					id: n,
					children: "完整月度与年度分配表"
				}), /* @__PURE__ */ (0, b.jsxs)("p", { children: [
					"全年预算 = 不出差月份金额 × ",
					a.normalMonths,
					" + 出差月份金额 × ",
					e.awayMonths,
					"。",
					/* @__PURE__ */ (0, b.jsx)("span", {
						className: "annual-mobile-hint",
						children: "左右滑动表格查看金额列。"
					})
				] })] }), r]
			}),
			/* @__PURE__ */ (0, b.jsx)("div", {
				className: "annual-table-scroll",
				tabIndex: 0,
				role: "region",
				"aria-label": "完整分配表横向滚动区域",
				children: /* @__PURE__ */ (0, b.jsxs)("table", {
					className: "annual-budget-table annual-allocation-table",
					"aria-labelledby": n,
					children: [
						/* @__PURE__ */ (0, b.jsx)("thead", { children: /* @__PURE__ */ (0, b.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, b.jsx)("th", {
								scope: "col",
								children: "项目"
							}),
							/* @__PURE__ */ (0, b.jsx)("th", {
								scope: "col",
								children: "不出差月份"
							}),
							/* @__PURE__ */ (0, b.jsx)("th", {
								scope: "col",
								children: "出差月份"
							}),
							/* @__PURE__ */ (0, b.jsx)("th", {
								scope: "col",
								children: "全年预算"
							})
						] }) }),
						/* @__PURE__ */ (0, b.jsx)("tbody", { children: a.allocationRows.map((t) => /* @__PURE__ */ (0, b.jsxs)("tr", {
							"data-budget-row": t.id,
							children: [
								/* @__PURE__ */ (0, b.jsxs)("th", {
									scope: "row",
									children: [t.name, [
										"small",
										"daily",
										"emergencyLearning"
									].includes(t.id) && /* @__PURE__ */ (0, b.jsx)("small", { children: t.note })]
								}),
								["normal", "trip"].map((n) => /* @__PURE__ */ (0, b.jsx)("td", {
									className: e.mode === n ? "selected-column" : "",
									children: t.id === "emergencyLearning" ? /* @__PURE__ */ (0, b.jsxs)(b.Fragment, { children: [/* @__PURE__ */ (0, b.jsx)("strong", { children: O(t[n]) }), ["emergency", "learning"].map((e) => {
										let t = a.rows.find((t) => t.id === e);
										return /* @__PURE__ */ (0, b.jsxs)("label", {
											className: "annual-combined-edit",
											children: [/* @__PURE__ */ (0, b.jsx)("span", { children: e === "emergency" ? "应急" : "学习" }), /* @__PURE__ */ (0, b.jsx)("input", {
												type: "number",
												min: "0",
												max: "100000000",
												step: "0.01",
												inputMode: "decimal",
												"aria-label": `${t.name}${n === "normal" ? "不出差月份" : "出差月份"}预算`,
												value: t[n],
												onChange: (t) => o(e, n, t.target.value)
											})]
										}, e);
									})] }) : /* @__PURE__ */ (0, b.jsx)("input", {
										type: "number",
										min: "0",
										max: "100000000",
										step: "0.01",
										inputMode: "decimal",
										"aria-label": `${t.name}${n === "normal" ? "不出差月份" : "出差月份"}预算`,
										value: t[n],
										onChange: (e) => o(t.id, n, e.target.value)
									})
								}, n)),
								/* @__PURE__ */ (0, b.jsx)("td", { children: O(t.annual) })
							]
						}, t.id)) }),
						/* @__PURE__ */ (0, b.jsx)("tfoot", { children: /* @__PURE__ */ (0, b.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, b.jsx)("th", {
								scope: "row",
								children: "全部资金分配"
							}),
							/* @__PURE__ */ (0, b.jsx)("td", { children: O(a.normal.totalOutflow) }),
							/* @__PURE__ */ (0, b.jsx)("td", { children: O(a.trip.totalOutflow) }),
							/* @__PURE__ */ (0, b.jsx)("td", { children: O(a.annualOutflow) })
						] }) })
					]
				})
			}),
			/* @__PURE__ */ (0, b.jsx)("p", {
				className: "annual-budget-note",
				role: "status",
				children: i
			}),
			/* @__PURE__ */ (0, b.jsxs)("p", {
				className: "annual-budget-note",
				children: [
					"小额支付普通月",
					O(a.rows.find((e) => e.id === "small")?.normal ?? 0),
					"、出差月",
					O(a.rows.find((e) => e.id === "small")?.trip ?? 0),
					"。日常使用承接其余生活消费；投资与应急基金合计全年",
					O(a.annualSaving),
					"，其余消费及消费预留合计",
					O(a.annualConsumption),
					"。账户间转账不算消费，基金支付不重复记账。"
				]
			})
		]
	});
}
function k({ plan: e, onChange: t, saveAction: n, saveStatus: r }) {
	let i = ie(e), a = i.annualSurplus >= 0 && !i.assumptionsConflict, o = (n, r) => t(E({
		...e,
		[n]: Number(r)
	})), s = (n) => t({
		...e,
		mode: n
	}), c = [
		{
			key: "salary",
			label: "每月到手工资",
			unit: "元 / 月",
			step: "100"
		},
		{
			key: "awayMonths",
			label: "全年出差月份",
			unit: "个月 / 12个月",
			step: "1"
		},
		{
			key: "paidDays",
			label: "全年实际领补贴天数",
			unit: "自然日",
			step: "1"
		},
		{
			key: "allowanceUsd",
			label: "每天出差补贴",
			unit: "美元 / 天",
			step: "1"
		},
		{
			key: "dailySpendUsd",
			label: "每天出差实际开销",
			unit: "美元 / 天",
			step: "1"
		},
		{
			key: "budgetFx",
			label: "预算汇率",
			unit: "人民币 / 美元",
			step: "0.01"
		},
		{
			key: "emergencyCurrent",
			label: "应急期初参考余额",
			unit: "元，非账户实时余额",
			step: "100"
		},
		{
			key: "emergencyTargetMonths",
			label: "应急覆盖目标",
			unit: "个月",
			step: "1"
		},
		{
			key: "emergencyMonthlyNeed",
			label: "月均必要支出",
			unit: "元 / 月，应急目标统一基数",
			step: "50"
		},
		{
			key: "bufferMonths",
			label: "连续普通月周转测算",
			unit: "个月",
			step: "1"
		}
	], l = [
		{
			label: "生活与消费预留",
			amount: i.annualConsumption,
			className: "consumption"
		},
		{
			label: "投资本金",
			amount: i.annualInvestment,
			className: "investment"
		},
		{
			label: "新增应急现金",
			amount: i.annualEmergency,
			className: "emergency"
		},
		{
			label: "额外现金余量",
			amount: Math.max(0, i.annualSurplus),
			className: "surplus"
		}
	];
	return /* @__PURE__ */ (0, b.jsxs)("details", {
		className: "annual-budget",
		"aria-labelledby": "annual-budget-toggle",
		children: [
			/* @__PURE__ */ (0, b.jsx)("summary", {
				className: "annual-budget-toggle",
				id: "annual-budget-toggle",
				children: "全年预算参考 · 12个月"
			}),
			/* @__PURE__ */ (0, b.jsxs)("header", {
				className: "annual-budget-heading",
				children: [/* @__PURE__ */ (0, b.jsxs)("div", { children: [
					/* @__PURE__ */ (0, b.jsx)("h2", {
						id: "annual-budget-title",
						children: "普通月收支与全年积累"
					}),
					/* @__PURE__ */ (0, b.jsxs)("p", { children: [
						i.normalMonths,
						"个普通月 + ",
						e.awayMonths,
						"个出差月；全年",
						e.paidDays,
						"个领补贴日，出差期间工资照常发放。"
					] }),
					/* @__PURE__ */ (0, b.jsxs)("div", {
						className: "annual-budget-jump-links",
						children: [/* @__PURE__ */ (0, b.jsx)("a", {
							className: "annual-table-link",
							href: "#annual-allocation-title",
							children: "查看完整分配表 ↓"
						}), /* @__PURE__ */ (0, b.jsx)("a", {
							className: "annual-table-link",
							href: "#annual-accumulation-title",
							children: "查看年度积累与奖金 ↓"
						})]
					})
				] }), /* @__PURE__ */ (0, b.jsx)("span", {
					className: `annual-budget-status ${a ? "positive" : "negative"}`,
					role: "status",
					children: i.assumptionsConflict ? "出差条件需校正" : a ? i.normalDeficit > 0 ? "全年可覆盖，需留周转金" : "普通月与全年预算可覆盖" : "全年存在资金缺口"
				})]
			}),
			/* @__PURE__ */ (0, b.jsxs)("div", {
				className: "annual-budget-metrics",
				"aria-live": "polite",
				children: [
					/* @__PURE__ */ (0, b.jsxs)("article", { children: [
						/* @__PURE__ */ (0, b.jsx)("span", { children: "全年可分配资金" }),
						/* @__PURE__ */ (0, b.jsx)("strong", {
							"data-testid": "annual-income",
							children: O(i.annualIncome)
						}),
						/* @__PURE__ */ (0, b.jsxs)("small", { children: [
							"工资 ",
							O(i.annualSalary),
							" + 出差净结余 ",
							O(i.annualTripNet)
						] })
					] }),
					/* @__PURE__ */ (0, b.jsxs)("article", { children: [
						/* @__PURE__ */ (0, b.jsx)("span", { children: "全年全部安排" }),
						/* @__PURE__ */ (0, b.jsx)("strong", {
							"data-testid": "annual-outflow",
							children: O(i.annualOutflow)
						}),
						/* @__PURE__ */ (0, b.jsx)("small", { children: "含生活消费、投资本金与应急储备" })
					] }),
					/* @__PURE__ */ (0, b.jsxs)("article", { children: [
						/* @__PURE__ */ (0, b.jsx)("span", { children: "全年投资与应急储备" }),
						/* @__PURE__ */ (0, b.jsx)("strong", {
							"data-testid": "annual-saving",
							children: O(i.annualSaving)
						}),
						/* @__PURE__ */ (0, b.jsxs)("small", { children: [
							"投资 ",
							O(i.annualInvestment),
							" + 应急 ",
							O(i.annualEmergency)
						] })
					] }),
					/* @__PURE__ */ (0, b.jsxs)("article", {
						className: i.annualSurplus < 0 ? "negative" : "positive",
						children: [
							/* @__PURE__ */ (0, b.jsx)("span", { children: "完成以上安排后的余量" }),
							/* @__PURE__ */ (0, b.jsx)("strong", {
								"data-testid": "annual-surplus",
								children: O(i.annualSurplus)
							}),
							/* @__PURE__ */ (0, b.jsxs)("small", { children: [
								"平均每月 ",
								O(i.averageSurplus),
								"，尚未计收益或额外还款"
							] })
						]
					})
				]
			}),
			/* @__PURE__ */ (0, b.jsx)("p", {
				className: "annual-budget-note",
				children: "以上为基础预算，年终奖与额外绩效奖金另见下方年度积累。"
			}),
			/* @__PURE__ */ (0, b.jsxs)("div", {
				className: "annual-budget-distribution",
				"aria-label": "全年资金分布",
				children: [/* @__PURE__ */ (0, b.jsx)("div", {
					className: "annual-budget-bar",
					"aria-hidden": "true",
					children: l.filter((e) => e.amount > 0).map((e) => /* @__PURE__ */ (0, b.jsx)("span", {
						className: e.className,
						style: { flexGrow: e.amount }
					}, e.label))
				}), /* @__PURE__ */ (0, b.jsx)("div", {
					className: "annual-budget-legend",
					children: l.map((e) => /* @__PURE__ */ (0, b.jsxs)("span", { children: [
						/* @__PURE__ */ (0, b.jsx)("i", { className: e.className }),
						e.label,
						/* @__PURE__ */ (0, b.jsx)("b", { children: O(e.amount) })
					] }, e.label))
				})]
			}),
			/* @__PURE__ */ (0, b.jsx)(oe, {
				plan: e,
				onChange: t,
				titleId: "annual-allocation-title",
				saveAction: n,
				saveStatus: r
			}),
			/* @__PURE__ */ (0, b.jsxs)("section", {
				className: "annual-months",
				"aria-label": "月份类型现金流对比",
				children: [
					/* @__PURE__ */ (0, b.jsxs)("div", {
						className: "annual-subheading",
						children: [/* @__PURE__ */ (0, b.jsx)("h3", { children: "同一套安排，两种月份现金流" }), /* @__PURE__ */ (0, b.jsx)("p", { children: "点击月份类型，下方总览卡片和预算图表同步切换。" })]
					}),
					/* @__PURE__ */ (0, b.jsxs)("div", {
						className: "annual-month-grid",
						children: [/* @__PURE__ */ (0, b.jsxs)("button", {
							type: "button",
							"aria-pressed": e.mode === "normal",
							"data-testid": "normal-month-mode",
							onClick: () => s("normal"),
							children: [
								/* @__PURE__ */ (0, b.jsxs)("span", { children: [
									"普通月份 · 全年",
									i.normalMonths,
									"个月"
								] }),
								/* @__PURE__ */ (0, b.jsx)("strong", {
									className: i.normal.surplus < 0 ? "negative" : "positive",
									"data-testid": "normal-month-surplus",
									children: O(i.normal.surplus)
								}),
								/* @__PURE__ */ (0, b.jsxs)("small", { children: [
									"工资 ",
									O(e.salary),
									" − 全部安排 ",
									O(i.normal.totalOutflow)
								] }),
								/* @__PURE__ */ (0, b.jsx)("em", { children: i.normal.surplus < 0 ? "每月需要预留出差结余来补足" : "普通月工资可覆盖当前安排" })
							]
						}), /* @__PURE__ */ (0, b.jsxs)("button", {
							type: "button",
							"aria-pressed": e.mode === "trip",
							"data-testid": "trip-month-mode",
							disabled: e.awayMonths === 0,
							onClick: () => s("trip"),
							children: [
								/* @__PURE__ */ (0, b.jsxs)("span", { children: [
									"出差月份 · 全年",
									e.awayMonths,
									"个月"
								] }),
								/* @__PURE__ */ (0, b.jsx)("strong", {
									className: i.trip.surplus < 0 ? "negative" : "positive",
									"data-testid": "trip-month-surplus",
									children: O(i.trip.surplus)
								}),
								/* @__PURE__ */ (0, b.jsxs)("small", { children: [
									"工资 + 平均出差净结余 ",
									O(i.trip.income),
									" − 安排 ",
									O(i.trip.totalOutflow)
								] }),
								/* @__PURE__ */ (0, b.jsx)("em", { children: "按全年净结余平均分摊；到账时间尚未确定" })
							]
						})]
					}),
					/* @__PURE__ */ (0, b.jsxs)("p", {
						className: "annual-budget-formula",
						children: [
							"出差每天净留：$",
							e.allowanceUsd,
							" − $",
							e.dailySpendUsd,
							" = $",
							i.netUsd,
							"；全年：",
							e.paidDays,
							"天 × $",
							i.netUsd,
							" × ",
							e.budgetFx.toFixed(2),
							" = ",
							O(i.annualTripNet),
							"。"
						]
					}),
					/* @__PURE__ */ (0, b.jsx)("div", {
						className: "annual-table-scroll annual-cashflow-summary",
						children: /* @__PURE__ */ (0, b.jsxs)("table", {
							className: "annual-budget-table",
							"aria-label": "按分配表重新计算的现金流",
							children: [
								/* @__PURE__ */ (0, b.jsx)("thead", { children: /* @__PURE__ */ (0, b.jsxs)("tr", { children: [
									/* @__PURE__ */ (0, b.jsx)("th", {
										scope: "col",
										children: "现金流核对"
									}),
									/* @__PURE__ */ (0, b.jsx)("th", {
										scope: "col",
										children: "不出差月份"
									}),
									/* @__PURE__ */ (0, b.jsx)("th", {
										scope: "col",
										children: "出差月份平均"
									}),
									/* @__PURE__ */ (0, b.jsx)("th", {
										scope: "col",
										children: "全年"
									})
								] }) }),
								/* @__PURE__ */ (0, b.jsxs)("tbody", { children: [
									/* @__PURE__ */ (0, b.jsxs)("tr", { children: [
										/* @__PURE__ */ (0, b.jsx)("th", {
											scope: "row",
											children: "到手工资"
										}),
										/* @__PURE__ */ (0, b.jsx)("td", { children: O(e.salary) }),
										/* @__PURE__ */ (0, b.jsx)("td", { children: O(e.salary) }),
										/* @__PURE__ */ (0, b.jsx)("td", { children: O(i.annualSalary) })
									] }),
									/* @__PURE__ */ (0, b.jsxs)("tr", { children: [
										/* @__PURE__ */ (0, b.jsx)("th", {
											scope: "row",
											children: "出差净结余"
										}),
										/* @__PURE__ */ (0, b.jsx)("td", { children: O(0) }),
										/* @__PURE__ */ (0, b.jsx)("td", { children: O(i.trip.tripNet) }),
										/* @__PURE__ */ (0, b.jsx)("td", { children: O(i.annualTripNet) })
									] }),
									/* @__PURE__ */ (0, b.jsxs)("tr", {
										className: "annual-subtotal",
										children: [
											/* @__PURE__ */ (0, b.jsx)("th", {
												scope: "row",
												children: "可分配资金合计"
											}),
											/* @__PURE__ */ (0, b.jsx)("td", { children: O(i.normal.income) }),
											/* @__PURE__ */ (0, b.jsx)("td", { children: O(i.trip.income) }),
											/* @__PURE__ */ (0, b.jsx)("td", { children: O(i.annualIncome) })
										]
									}),
									/* @__PURE__ */ (0, b.jsxs)("tr", { children: [
										/* @__PURE__ */ (0, b.jsx)("th", {
											scope: "row",
											children: "生活支出及未来消费预留"
										}),
										/* @__PURE__ */ (0, b.jsx)("td", { children: O(i.normal.consumption) }),
										/* @__PURE__ */ (0, b.jsx)("td", { children: O(i.trip.consumption) }),
										/* @__PURE__ */ (0, b.jsx)("td", { children: O(i.annualConsumption) })
									] }),
									/* @__PURE__ */ (0, b.jsxs)("tr", { children: [
										/* @__PURE__ */ (0, b.jsx)("th", {
											scope: "row",
											children: "投资基金 + 应急基金"
										}),
										/* @__PURE__ */ (0, b.jsx)("td", { children: O(i.normal.saving) }),
										/* @__PURE__ */ (0, b.jsx)("td", { children: O(i.trip.saving) }),
										/* @__PURE__ */ (0, b.jsx)("td", { children: O(i.annualSaving) })
									] }),
									/* @__PURE__ */ (0, b.jsxs)("tr", { children: [
										/* @__PURE__ */ (0, b.jsx)("th", {
											scope: "row",
											children: "全部资金分配"
										}),
										/* @__PURE__ */ (0, b.jsx)("td", { children: O(i.normal.totalOutflow) }),
										/* @__PURE__ */ (0, b.jsx)("td", { children: O(i.trip.totalOutflow) }),
										/* @__PURE__ */ (0, b.jsx)("td", { children: O(i.annualOutflow) })
									] })
								] }),
								/* @__PURE__ */ (0, b.jsx)("tfoot", { children: /* @__PURE__ */ (0, b.jsxs)("tr", { children: [
									/* @__PURE__ */ (0, b.jsx)("th", {
										scope: "row",
										children: "分配后的现金余量"
									}),
									/* @__PURE__ */ (0, b.jsx)("td", {
										className: i.normal.surplus < 0 ? "negative" : "positive",
										children: O(i.normal.surplus)
									}),
									/* @__PURE__ */ (0, b.jsx)("td", {
										className: i.trip.surplus < 0 ? "negative" : "positive",
										children: O(i.trip.surplus)
									}),
									/* @__PURE__ */ (0, b.jsx)("td", {
										className: i.annualSurplus < 0 ? "negative" : "positive",
										children: O(i.annualSurplus)
									})
								] }) })
							]
						})
					})
				]
			}),
			/* @__PURE__ */ (0, b.jsx)(ae, {
				plan: e,
				onChange: t
			}),
			/* @__PURE__ */ (0, b.jsxs)("section", {
				className: "annual-reference",
				"aria-label": "执行参考数据",
				children: [/* @__PURE__ */ (0, b.jsx)("div", {
					className: "annual-subheading",
					children: /* @__PURE__ */ (0, b.jsx)("h3", { children: "执行时，先看这几个数" })
				}), /* @__PURE__ */ (0, b.jsxs)("div", {
					className: "annual-reference-grid",
					children: [
						/* @__PURE__ */ (0, b.jsxs)("article", { children: [
							/* @__PURE__ */ (0, b.jsxs)("span", { children: [
								"连续",
								e.bufferMonths,
								"个普通月的周转金"
							] }),
							/* @__PURE__ */ (0, b.jsx)("strong", {
								"data-testid": "ordinary-month-buffer",
								children: O(i.buffer)
							}),
							/* @__PURE__ */ (0, b.jsxs)("small", { children: [
								"每月缺口",
								O(i.normalDeficit),
								" × ",
								e.bufferMonths,
								"个月；仅计算预算缺口，不代表无需保留付款周转现金。"
							] })
						] }),
						/* @__PURE__ */ (0, b.jsxs)("article", { children: [
							/* @__PURE__ */ (0, b.jsx)("span", { children: "全年普通月需要补足" }),
							/* @__PURE__ */ (0, b.jsx)("strong", { children: O(i.normalDeficit * i.normalMonths) }),
							/* @__PURE__ */ (0, b.jsxs)("small", { children: [
								"出差月份合计余量",
								O(i.annualTripSurplus),
								"；未计额外还款及预算外开销。"
							] })
						] }),
						/* @__PURE__ */ (0, b.jsxs)("article", { children: [
							/* @__PURE__ */ (0, b.jsx)("span", { children: "投资与应急占可分配资金" }),
							/* @__PURE__ */ (0, b.jsxs)("strong", { children: [(i.savingRate * 100).toFixed(1), "%"] }),
							/* @__PURE__ */ (0, b.jsxs)("small", { children: [
								"全年投入",
								O(i.annualSaving),
								"；旅游、伴侣基金不计入这项储蓄。"
							] })
						] }),
						/* @__PURE__ */ (0, b.jsxs)("article", { children: [
							/* @__PURE__ */ (0, b.jsx)("span", { children: "全年月均可分配资金" }),
							/* @__PURE__ */ (0, b.jsx)("strong", { children: O(i.averageIncome) }),
							/* @__PURE__ */ (0, b.jsxs)("small", { children: [
								"年度平均值；普通月份到账工资仍为",
								O(e.salary),
								"。"
							] })
						] }),
						/* @__PURE__ */ (0, b.jsxs)("article", { children: [
							/* @__PURE__ */ (0, b.jsx)("span", { children: "应急金全年后参考余额" }),
							/* @__PURE__ */ (0, b.jsx)("strong", {
								"data-testid": "emergency-year-end",
								children: O(i.emergencyYearEnd)
							}),
							/* @__PURE__ */ (0, b.jsxs)("small", { children: [
								"期初参考",
								O(e.emergencyCurrent),
								" + 全年新增",
								O(i.annualEmergency),
								"，假设不动用、不计收益。"
							] })
						] }),
						/* @__PURE__ */ (0, b.jsxs)("article", { children: [
							/* @__PURE__ */ (0, b.jsxs)("span", { children: [e.emergencyTargetMonths, "个月应急目标"] }),
							/* @__PURE__ */ (0, b.jsx)("strong", {
								"data-testid": "emergency-target-floor",
								children: O(i.emergencyTarget)
							}),
							/* @__PURE__ */ (0, b.jsxs)("small", { children: [
								"统一必要支出基数",
								O(i.basicNeed),
								" / 月 × ",
								e.emergencyTargetMonths,
								"个月。全年参考余额距目标仍差",
								O(i.emergencyGap),
								"。"
							] })
						] })
					]
				})]
			}),
			/* @__PURE__ */ (0, b.jsxs)("div", {
				className: `annual-budget-conclusion ${a ? "" : "annual-budget-warning"}`,
				children: [
					/* @__PURE__ */ (0, b.jsx)("strong", { children: i.assumptionsConflict ? "计算条件需校正，暂不判断年度是否覆盖。" : a ? `全年投入${O(i.annualSaving)}后，仍留${O(i.annualSurplus)}额外现金。` : `按当前条件，全年仍缺${O(Math.max(0, -i.annualSurplus))}。` }),
					/* @__PURE__ */ (0, b.jsx)("p", { children: "年度可覆盖不代表每月现金充足。出差结余到账后先保留周转金；实际出差月份及补贴到账日期未确定，因此这里展示月份类型预算，不推定逐月到账余额。" }),
					a && /* @__PURE__ */ (0, b.jsxs)("p", { children: [
						"如果额外余量也保留，全年可用于投资本金和新增现金储备的资金合计",
						O(i.annualRetained),
						"；这是投入与留存金额，不代表投资资产一定增值。"
					] }),
					e.awayMonths > 0 && i.requiredTripDays !== null && /* @__PURE__ */ (0, b.jsxs)("p", { children: [
						i.requiredTripDays > 0 ? `保持当前出差月份和各项预算时，全年至少需约${i.requiredTripDays}个领补贴日才能覆盖` : "按当前月份类型安排，基础工资即可覆盖全年预算",
						"；汇率",
						e.budgetFx.toFixed(2),
						"是预算参数。"
					] }),
					i.assumptionsConflict && /* @__PURE__ */ (0, b.jsx)("p", {
						role: "alert",
						children: "领补贴天数超过所填出差月份可容纳的自然日，请校正计算条件。"
					})
				]
			}),
			/* @__PURE__ */ (0, b.jsxs)("details", {
				className: "annual-budget-settings",
				children: [
					/* @__PURE__ */ (0, b.jsx)("summary", { children: "查看和修改计算条件" }),
					/* @__PURE__ */ (0, b.jsx)("div", {
						className: "annual-budget-inputs",
						children: c.map((t) => /* @__PURE__ */ (0, b.jsxs)("label", { children: [
							/* @__PURE__ */ (0, b.jsx)("span", { children: t.label }),
							/* @__PURE__ */ (0, b.jsx)("input", {
								"aria-label": t.label,
								type: "number",
								min: "0",
								step: t.step,
								value: e[t.key],
								onChange: (e) => o(t.key, e.target.value)
							}),
							/* @__PURE__ */ (0, b.jsx)("small", { children: t.unit })
						] }, t.key))
					}),
					/* @__PURE__ */ (0, b.jsx)("p", { children: "预算汇率仅用于测算。每天出差开销已从补贴中扣除，不再加进人民币支出。本地餐饮与交通按分配表预留；公司旧借款还款未计入此年度方案，实际欠款与账户余额仍在账本记录。" })
				]
			})
		]
	});
}
//#endregion
//#region app/liquidity-model.ts
var A = (e) => Math.round((e + 2 ** -52 * Math.abs(e)) * 100) / 100;
function se(e, t) {
	let n = A(e.filter((e) => e.liquid).reduce((e, t) => e + t.balance, 0)), r = e.filter((e) => e.liquid && e.reserve && e.balance > 0).map((e) => ({
		id: `account-${e.id}`,
		name: e.name,
		amount: e.balance,
		source: e.reserve
	})), i = A(r.reduce((e, t) => e + t.amount, 0)), a = /* @__PURE__ */ new Map(), o = 0;
	for (let n of t.filter((e) => e.locked && e.current > 0)) {
		let t = e.find((e) => e.id === n.fundingAccountId);
		t ? a.set(t.id, (a.get(t.id) ?? 0) + n.current) : (o++, r.push({
			id: `project-${n.id}`,
			name: n.name,
			amount: n.current,
			source: "未关联账户，另占通用现金"
		}));
	}
	let s = 0;
	for (let [t, n] of a) {
		let i = e.find((e) => e.id === t), a = Math.max(0, n - Math.max(0, i.balance));
		s += a;
		let o = i.liquid && !i.reserve ? n : a;
		o > 0 && r.push({
			id: `linked-${t}`,
			name: `${i.name} 关联项目`,
			amount: o,
			source: i.reserve || !i.liquid ? "超过关联账户余额的占用" : "项目锁定"
		});
	}
	let c = A(r.reduce((e, t) => e + t.amount, 0));
	return {
		liquidCash: n,
		accountReserved: i,
		projectReserved: A(c - i),
		reserved: c,
		available: A(n - c),
		overallocated: A(s),
		unlinkedCount: o,
		deductions: r
	};
}
//#endregion
//#region app/finance-review-model.ts
var ce = [
	{
		id: "rent",
		name: "房租",
		flow: "expense"
	},
	{
		id: "parents",
		name: "家用",
		flow: "expense"
	},
	{
		id: "investment",
		name: "投资基金",
		flow: "transfer"
	},
	{
		id: "emergency",
		name: "应急储备",
		flow: "transfer"
	},
	{
		id: "learning",
		name: "学习支出",
		flow: "expense"
	},
	{
		id: "travel",
		name: "旅游基金",
		flow: "expense"
	},
	{
		id: "partner",
		name: "伴侣基金",
		flow: "expense"
	},
	{
		id: "small",
		name: "小额支付",
		flow: "expense"
	},
	{
		id: "daily",
		name: "日常使用",
		flow: "expense"
	}
], le = {
	week: "周复盘",
	month: "月复盘",
	quarter: "季度复盘"
}, ue = {
	cash: "现金及存款",
	investments: "证券账户总资产",
	otherAssets: "其他个人资产",
	debt: "个人负债"
};
function j(e, t) {
	return Math.round(e.value * (e.currency === "USD" ? t.fxUsd : e.currency === "HKD" ? t.fxHkd : 1) * 100) / 100;
}
function M(e) {
	return e.holdings.reduce((t, n) => t + Math.round(j(n, e) * 100), 0) / 100;
}
function de(e, t) {
	let n = e.investments, r = t?.investments;
	return [...new Set([...(n?.holdings ?? []).map((e) => e.id), ...(r?.holdings ?? []).map((e) => e.id)])].map((e) => {
		let t = n?.holdings.find((t) => t.id === e), i = r?.holdings.find((t) => t.id === e), a = t && n ? j(t, n) : null, o = i && r ? j(i, r) : null;
		return {
			id: e,
			name: t?.name ?? i.name,
			current: a,
			previous: o,
			delta: a !== null && o !== null ? Math.round((a - o) * 100) / 100 : null,
			note: t?.note ?? ""
		};
	});
}
var fe = {
	projects: "大花费项目",
	bills: "账单与订阅",
	balance: "资产负债明细"
};
function pe(e) {
	return {
		projects: e.projects.map((e) => ({ ...e })),
		bills: e.bills.map((e) => ({ ...e })),
		assets: e.assets.map((e) => ({ ...e })),
		debts: e.debts.map((e) => ({ ...e })),
		holdings: e.holdings,
		checks: {
			projects: !1,
			bills: !1,
			balance: !1
		},
		notes: {}
	};
}
function me(e, t) {
	return [
		"projects",
		"bills",
		"assets",
		"debts",
		"holdings"
	].every((n) => JSON.stringify(e[n]) === JSON.stringify(t[n]));
}
function he(e, t) {
	if (!e) return pe(t);
	if (me(e, t)) return e;
	let n = pe(t), r = (n) => JSON.stringify(e[n]) === JSON.stringify(t[n]);
	return n.checks = {
		projects: r("projects") && e.checks.projects,
		bills: r("bills") && e.checks.bills,
		balance: r("assets") && r("debts") && r("holdings") && e.checks.balance
	}, n.notes = { ...e.notes }, n;
}
var ge = 864e5, _e = (e) => Math.round((e + 2 ** -52 * Math.abs(e)) * 100), N = (e) => e.reduce((e, t) => e + _e(t), 0) / 100;
function ve(e) {
	return e.some((e) => e.balance === null || !Number.isFinite(e.balance) || e.balance < 0) ? null : N(e.filter((e) => e.included).map((e) => e.balance));
}
function ye(e, t, n) {
	let r = t.map((e) => ({
		...e,
		included: e.includedInPersonal ?? n?.find((t) => t.id === e.id)?.included ?? !0,
		note: ""
	}));
	return {
		...e,
		accounts: r,
		balances: {
			...e.balances,
			cash: ve(r)
		}
	};
}
function be(e, t) {
	let n = e.accounts ?? [], r = t?.accounts ?? [];
	return [...new Set([...n.map((e) => e.id), ...r.map((e) => e.id)])].map((e) => {
		let t = n.find((t) => t.id === e), i = r.find((t) => t.id === e);
		return {
			id: e,
			name: t?.name ?? i.name,
			purpose: t?.purpose ?? i.purpose,
			current: t?.balance ?? null,
			previous: i?.balance ?? null,
			delta: t && i ? N([t.balance, -i.balance]) : null,
			included: t?.included ?? null,
			note: t?.note ?? "",
			status: t ? i ? t.included === i.included ? "同口径" : "计入范围变化" : "无上期账户基准" : "本期未记录"
		};
	});
}
var P = (e) => new Intl.NumberFormat("zh-CN", {
	style: "currency",
	currency: "CNY",
	maximumFractionDigits: 2
}).format(e), xe = (e) => e === null ? "无上期基准" : `${e > 0 ? "+" : ""}${P(e)}`, Se = (e) => e.toISOString().slice(0, 10);
function F(e) {
	if (typeof e != "string" || !/^\d{4}-\d{2}-\d{2}$/.test(e)) throw Error("日期须为 YYYY-MM-DD");
	let t = /* @__PURE__ */ new Date(`${e}T00:00:00Z`);
	if (!Number.isFinite(t.getTime()) || Se(t) !== e) throw Error(`无效日期：${e}`);
	return t;
}
function Ce(e = /* @__PURE__ */ new Date()) {
	return new Intl.DateTimeFormat("en-CA", {
		timeZone: "Asia/Shanghai",
		year: "numeric",
		month: "2-digit",
		day: "2-digit"
	}).format(e);
}
function we(e, t = Ce()) {
	try {
		return (F(e).getTime() - F(t).getTime()) / ge;
	} catch {
		return null;
	}
}
function Te(e, t = Ce()) {
	let n = we(e, t);
	return n === null ? "日期待补" : n < 0 ? `已过 ${-n} 天，待核实` : n === 0 ? "今天" : `${n} 天后`;
}
function Ee(e, t, n = 1) {
	let r = F(t), i, a;
	if (e === "week") i = /* @__PURE__ */ new Date(r.getTime() - (r.getUTCDay() + 6) % 7 * ge), a = new Date(i.getTime() + 6 * ge);
	else if (e === "month" && n === 10) {
		let e = r.getUTCMonth() - +(r.getUTCDate() < 10);
		i = new Date(Date.UTC(r.getUTCFullYear(), e, 10)), a = new Date(Date.UTC(r.getUTCFullYear(), e + 1, 9));
	} else {
		let t = e === "quarter" ? Math.floor(r.getUTCMonth() / 3) * 3 : r.getUTCMonth();
		i = new Date(Date.UTC(r.getUTCFullYear(), t, 1)), a = new Date(Date.UTC(r.getUTCFullYear(), t + (e === "quarter" ? 3 : 1), 0));
	}
	return {
		start: Se(i),
		end: t,
		limit: Se(a)
	};
}
function De(e = "week", t = Ce(), n = 1) {
	let { start: r } = Ee(e, t, n);
	return {
		type: e,
		start: r,
		end: t,
		...e === "month" && n === 10 ? { monthStartDay: n } : {},
		income: null,
		amounts: Object.fromEntries(ce.map((e) => [e.id, null])),
		notes: {},
		balances: {
			cash: null,
			investments: null,
			otherAssets: null,
			debt: null
		},
		summary: ""
	};
}
function I(e) {
	return e && typeof e == "object" && !Array.isArray(e) ? e : {};
}
function Oe(e) {
	let t = I(e), n = (e) => {
		if (typeof e != "number" || !Number.isFinite(e) || e < 0 || e > 0xe8d4a51000) throw Error("关键事项金额须为有效非负数");
		return _e(e) / 100;
	}, r = (e) => e === "" ? "" : (F(e), e), i = (e) => {
		if (!Array.isArray(e)) throw Error("关键事项明细须为列表");
		let t = /* @__PURE__ */ new Set();
		return e.map((e) => {
			let n = I(e);
			if (typeof n.id != "string" || !n.id.trim() || t.has(n.id) || typeof n.name != "string" || !n.name.trim()) throw Error("关键事项名称与唯一编号须完整");
			return t.add(n.id), {
				...n,
				id: n.id,
				name: n.name
			};
		});
	}, a = I(t.checks), o = I(t.notes);
	return {
		projects: i(t.projects).map((e) => ({
			id: e.id,
			name: e.name,
			target: n(e.target),
			current: n(e.current),
			dueDate: r(e.dueDate)
		})),
		bills: i(t.bills).map((e) => ({
			id: e.id,
			name: e.name,
			amount: n(e.amount),
			date: r(e.date),
			kind: typeof e.kind == "string" ? e.kind : ""
		})),
		assets: i(t.assets).map((e) => ({
			id: e.id,
			name: e.name,
			amount: n(e.amount)
		})),
		debts: i(t.debts).map((e) => ({
			id: e.id,
			name: e.name,
			amount: n(e.amount)
		})),
		holdings: n(t.holdings),
		checks: Object.fromEntries(Object.keys(fe).map((e) => [e, a[e] === !0])),
		notes: Object.fromEntries(Object.keys(fe).map((e) => [e, typeof o[e] == "string" ? o[e] : ""]))
	};
}
function ke(e) {
	let t = I(e);
	if (![
		"week",
		"month",
		"quarter"
	].includes(String(t.type))) throw Error("请选择周、月或季度");
	let n = t.type;
	F(t.start), F(t.end);
	let r = t.start, i = t.end;
	if (t.monthStartDay !== void 0 && (n !== "month" || ![1, 10].includes(Number(t.monthStartDay)) || typeof t.monthStartDay != "number")) throw Error("月度起算日须为1号或10号");
	let a = t.monthStartDay === 10 ? 10 : 1;
	if (Ee(n, i, a).start !== r || r > i) throw Error("日期须从本周周一、所选月度起算日或本季度首日开始，不能跨周期");
	let o = (e, t, n = !1) => {
		if (typeof e != "number" || !Number.isFinite(e) || Math.abs(e) > 0xe8d4a51000 || n && e < 0) throw Error(`请填写${t}；确实没有时填 0，空白不代表 0`);
		return _e(e) / 100;
	}, s = I(t.amounts), c = I(t.notes), l = I(t.balances), u;
	if (t.accounts !== void 0) {
		if (!Array.isArray(t.accounts)) throw Error("账户快照须为列表");
		let e = /* @__PURE__ */ new Set();
		if (u = t.accounts.map((t) => {
			let n = I(t);
			if (typeof n.id != "string" || !n.id.trim() || e.has(n.id) || typeof n.name != "string" || !n.name.trim() || typeof n.included != "boolean") throw Error("账户快照名称、唯一编号及计入范围须完整");
			return e.add(n.id), {
				id: n.id,
				name: n.name,
				type: typeof n.type == "string" ? n.type : "",
				purpose: typeof n.purpose == "string" ? n.purpose : "",
				included: n.included,
				balance: o(n.balance, `${n.name}期末余额`, !0),
				note: typeof n.note == "string" ? n.note : ""
			};
		}), o(l.cash, "现金及存款", !0) !== ve(u)) throw Error("现金及存款须与计入的账户余额合计一致");
	}
	let d;
	if (t.budget !== void 0) {
		let e = I(t.budget);
		if (n !== "month" || !["normal", "trip"].includes(String(e.mode))) throw Error("月度预算参考须注明普通月或出差月");
		let r = I(e.amounts);
		d = {
			mode: e.mode,
			amounts: Object.fromEntries(ce.map((e) => [e.id, o(r[e.id], `${e.name}月预算`, !0)]))
		};
	}
	let f = {
		id: `${n}:${r}`,
		type: n,
		start: r,
		end: i,
		...n === "month" && a === 10 ? { monthStartDay: a } : {},
		savedAt: typeof t.savedAt == "string" && Number.isFinite(Date.parse(t.savedAt)) ? t.savedAt : (/* @__PURE__ */ new Date()).toISOString(),
		income: o(t.income, "本期外部收入"),
		amounts: Object.fromEntries(ce.map((e) => [e.id, o(s[e.id], e.name)])),
		notes: Object.fromEntries(ce.map((e) => [e.id, typeof c[e.id] == "string" ? c[e.id] : ""])),
		balances: Object.fromEntries(Object.entries(ue).map(([e, t]) => [e, o(l[e], t, !0)])),
		summary: typeof t.summary == "string" ? t.summary : "",
		...d ? { budget: d } : {},
		...u ? { accounts: u } : {},
		...t.focus === void 0 ? {} : { focus: Oe(t.focus) }
	};
	if (t.investments !== void 0) {
		let e = I(t.investments), n = /* @__PURE__ */ new Set();
		if (!Array.isArray(e.holdings)) throw Error("投资明细须为列表");
		let r = o(e.fxUsd, "美元汇率", !0), i = o(e.fxHkd, "港币汇率", !0);
		if (r <= 0 || i <= 0) throw Error("汇率须大于0");
		if (f.investments = {
			fxUsd: r,
			fxHkd: i,
			holdings: e.holdings.map((e) => {
				let t = I(e);
				if (typeof t.id != "string" || !t.id || n.has(t.id) || typeof t.name != "string" || !t.name.trim() || ![
					"A股",
					"美股",
					"港股"
				].includes(String(t.market)) || ![
					"CNY",
					"USD",
					"HKD"
				].includes(String(t.currency))) throw Error("投资账户名称、编号、市场及币种须完整且不重复");
				return n.add(t.id), {
					id: t.id,
					name: t.name,
					market: t.market,
					currency: t.currency,
					cost: o(t.cost, "投资成本", !0),
					value: o(t.value, "投资期末金额", !0),
					note: typeof t.note == "string" ? t.note : ""
				};
			})
		}, M(f.investments) !== f.balances.investments) throw Error("证券账户总资产须等于逐账户明细折人民币合计");
	}
	if (t.goals !== void 0) {
		let e = /* @__PURE__ */ new Set();
		if (!Array.isArray(t.goals)) throw Error("目标余额须为列表");
		f.goals = t.goals.map((t) => {
			let n = I(t);
			if (typeof n.id != "string" || !n.id || e.has(n.id) || typeof n.name != "string") throw Error("目标编号须完整且不重复");
			return e.add(n.id), {
				id: n.id,
				name: n.name,
				current: o(n.current, "目标余额", !0)
			};
		});
	}
	function p(e) {
		if (!Array.isArray(e)) throw Error("日期收支快照须为列表");
		let t = /* @__PURE__ */ new Set();
		return e.map((e) => {
			let n = I(e);
			if (F(n.date), typeof n.id != "string" || !n.id || t.has(n.id) || String(n.date) < r || String(n.date) > i) throw Error("日期收支快照重复或不属于本期");
			if (t.add(n.id), (n.flow !== "income" || n.group !== "income") && (n.flow !== "expense" || !ce.some((e) => e.flow === "expense" && e.id === n.group))) throw Error("日期收支快照分类未确认");
			if (n.flow === "income" && !["salary", "otherIncome"].includes(String(n.categoryId))) throw Error("收入明细须区分工资与其他到账");
			if (typeof n.name != "string" || typeof n.categoryId != "string") throw Error("日期收支快照分类缺失");
			return {
				id: n.id,
				date: n.date,
				flow: n.flow,
				group: n.group,
				categoryId: n.categoryId,
				name: n.name,
				amount: o(n.amount, "明细金额"),
				note: typeof n.note == "string" ? n.note : ""
			};
		});
	}
	if (t.ledger !== void 0 && (f.ledger = p(t.ledger), N(f.ledger.filter((e) => e.group === "income").map((e) => e.amount)) !== f.income || ce.filter((e) => e.flow === "expense").some((e) => N(f.ledger.filter((t) => t.group === e.id).map((e) => e.amount)) !== f.amounts[e.id]))) throw Error("复盘收支与日期明细不一致，请重新带入或改为手填");
	if (t.incomeLedger !== void 0) {
		let e = p(t.incomeLedger);
		if (e.some((e) => e.flow !== "income") || N(e.map((e) => e.amount)) !== f.income) throw Error("本期收入与收入日期明细不一致");
		if (f.ledger && JSON.stringify(e) !== JSON.stringify(f.ledger.filter((e) => e.flow === "income"))) throw Error("两份收入快照不一致，请重新核对");
		f.ledger || (f.incomeLedger = e);
	}
	return f;
}
function Ae(e, t) {
	return [...e.filter((e) => e.id !== t.id), t].sort((e, t) => t.end.localeCompare(e.end) || e.id.localeCompare(t.id));
}
function je(e) {
	let t = I(e), n = Array.isArray(e) ? e : Array.isArray(t.records) ? t.records : t.type ? [t] : null;
	if (!n) throw Error("请选择周期复盘 JSON 文件");
	return n.reduce((e, t) => Ae(e, ke(t)), []);
}
function Me(e) {
	let t = N(ce.filter((e) => e.flow === "expense").map((t) => e.amounts[t.id])), n = N([
		e.balances.cash,
		e.balances.investments,
		e.balances.otherAssets
	]);
	return {
		income: e.income,
		spending: t,
		surplus: N([e.income, -t]),
		assets: n,
		netWorth: N([n, -e.balances.debt]),
		days: (F(e.end).getTime() - F(e.start).getTime()) / ge + 1
	};
}
function Ne(e) {
	return e.filter((e) => e.type === "week").sort((e, t) => t.end.localeCompare(e.end) || t.savedAt.localeCompare(e.savedAt))[0];
}
function Pe(e) {
	return (e.ledger ?? e.incomeLedger)?.filter((e) => e.flow === "income");
}
function Fe(e) {
	let t = /* @__PURE__ */ new Map();
	for (let n of e.filter((e) => e.type === "week")) {
		let e = t.get(n.start);
		(!e || n.savedAt > e.savedAt || n.savedAt === e.savedAt && n.end > e.end) && t.set(n.start, n);
	}
	let n = [...t.values()].sort((e, t) => e.start.localeCompare(t.start)), r = n.map((e, t) => {
		let r = Me(e), i = n[t - 1], a = i ? Me(i) : void 0, o = i && we(e.start, i.start) === 7, s = o && a?.days === r.days;
		return {
			record: e,
			...r,
			comparison: i ? o ? s ? "较上周" : "天数不同" : "中间缺周" : "首次基准",
			changes: s ? {
				income: N([r.income, -a.income]),
				spending: N([r.spending, -a.spending]),
				surplus: N([r.surplus, -a.surplus])
			} : null
		};
	}), i = n.at(-1);
	if (!i) return {
		rows: r,
		month: null
	};
	let a = Ee("month", i.end, 10), o = 0, s = 0, c = !1;
	for (let e of n.filter((e) => e.end >= a.start && e.start <= a.end)) {
		let t = e.start > a.start ? e.start : a.start, n = e.end < a.end ? e.end : a.end;
		if (e.start >= a.start && e.end <= a.end) o = N([o, e.income]), s += we(n, t) + 1;
		else {
			let r = Pe(e);
			r ? (o = N([o, ...r.filter((e) => e.date >= t && e.date <= n).map((e) => e.amount)]), s += we(n, t) + 1) : c = !0;
		}
	}
	return {
		rows: r,
		month: {
			...a,
			income: o,
			coveredDays: s,
			days: we(a.end, a.start) + 1,
			boundaryMissing: c
		}
	};
}
function Ie(e, t, n) {
	F(t), F(n);
	let r = [];
	for (let i = t; i <= n;) {
		let t = Ee("week", i).limit, a = t < n ? t : n, o = e.filter((e) => e.date >= i && e.date <= a), s = N(o.filter((e) => e.flow === "income" && e.categoryId === "salary").map((e) => e.amount)), c = N(o.filter((e) => e.flow === "income" && e.categoryId === "otherIncome").map((e) => e.amount)), l = N(o.filter((e) => e.flow === "expense").map((e) => e.amount)), u = N([
			s,
			c,
			-l
		]), d = (F(a).getTime() - F(i).getTime()) / ge + 1, f = r.at(-1);
		r.push({
			start: i,
			end: a,
			days: d,
			count: o.length,
			salary: s,
			other: c,
			spending: l,
			surplus: u,
			surplusDelta: f && f.count && o.length && f.days === d ? N([u, -f.surplus]) : null
		}), i = Se(new Date(F(a).getTime() + ge));
	}
	return r;
}
function Le(e, t, n) {
	let r = (e) => typeof e == "number" ? P(e) : String(e || "未填写");
	return [...e.flatMap((e) => {
		let i = t.find((t) => t.id === e.id);
		if (!i) return [`新增登记：${e.name}`];
		let a = n.filter(([t]) => e[t] !== i[t]).map(([t, n]) => `${n} ${r(i[t])} → ${r(e[t])}`);
		return e.name !== i.name && a.unshift(`名称 ${i.name} → ${e.name}`), a.length ? [`${e.name}：${a.join("，")}`] : [];
	}), ...t.filter((t) => !e.some((e) => e.id === t.id)).map((e) => `${e.name}：已移出本期清单，处理状态待确认`)];
}
function Re(e, t) {
	let n = Me(e), r = t ? Me(t) : null, i = e.focus, a = t?.focus, o = (e, t) => t === void 0 ? "无上期基准" : `较上期 ${xe(N([e, -t]))}`, s = (t) => t ? (F(t).getTime() - F(e.end).getTime()) / ge : null, c = (e) => N(e.map((e) => Math.max(0, N([e.target, -e.current])))), l = {
		projects: i?.checks.projects && a?.checks.projects ? Le(i.projects, a.projects, [
			["target", "目标"],
			["current", "实际"],
			["dueDate", "截止日期"]
		]) : [],
		bills: i?.checks.bills && a?.checks.bills ? Le(i.bills, a.bills, [
			["amount", "登记金额"],
			["date", "提醒日期"],
			["kind", "类型"]
		]) : [],
		balance: i?.checks.balance && a?.checks.balance ? [
			...Le(i.assets, a.assets, [["amount", "补录资产"]]),
			...Le(i.debts, a.debts, [["amount", "负债余额"]]),
			...i.holdings === a.holdings ? [] : [`持仓参考市值：${o(i.holdings, a.holdings)}（不直接视为投资收益）`]
		] : []
	}, u = (i?.projects ?? []).filter((e) => e.target > e.current && s(e.dueDate) !== null && s(e.dueDate) >= 0 && s(e.dueDate) <= 30).sort((e, t) => e.dueDate.localeCompare(t.dueDate)), d = (i?.projects ?? []).filter((e) => s(e.dueDate) !== null && s(e.dueDate) < 0), f = (i?.bills ?? []).filter((e) => s(e.date) !== null && s(e.date) >= 0 && s(e.date) <= 7).sort((e, t) => e.date.localeCompare(t.date)), p = (i?.bills ?? []).filter((e) => s(e.date) !== null && s(e.date) < 0), m = (e) => i ? i.checks[e] ? a?.checks[e] ? l[e].length ? `${l[e].length} 项变化` : "登记未变" : "首次基准" : "待核对" : "未提供", h = (e) => i ? i.checks[e] ? a?.checks[e] ? "" : "暂无已核对的上期明细，仅建立本期基准。" : "带入的登记数据尚未核对，不能据此确认本期变化。" : "本期没有这项快照，不按 0 或没有变化处理。", g = ce.filter((e) => e.flow === "expense").map((n) => ({
		name: n.name,
		delta: t ? N([e.amounts[n.id], -t.amounts[n.id]]) : 0
	})).filter((e) => e.delta !== 0).sort((e, t) => Math.abs(t.delta) - Math.abs(e.delta)), _ = i ? N(i.debts.map((e) => e.amount)) : null, v = (e) => e.filter(Boolean), y = [
		{
			id: "flows",
			title: "收入与支出",
			state: r ? r.days === n.days ? "本期对比" : `本期 ${n.days} 天 / 上期 ${r.days} 天` : "首次基准",
			summary: `收入 ${P(n.income)}（${o(n.income, r?.income)}）；消费 ${P(n.spending)}（${o(n.spending, r?.spending)}）；结余 ${P(n.surplus)}。`,
			details: v([
				...(Pe(e) ?? []).map((e) => `${e.date} ${e.categoryId === "salary" ? "工资到账" : "其他收入"} ${P(e.amount)}${e.note ? `：${e.note}` : ""}`),
				...g.slice(0, 2).map((e) => `${e.name} ${xe(e.delta)}`),
				r && r.days !== n.days ? `本期 ${n.days} 天 / 上期 ${r.days} 天；日均消费 ${P(n.spending / n.days)} / ${P(r.spending / r.days)}，总额不直接代表消费强度。` : ""
			])
		},
		{
			id: "projects",
			title: "大花费项目",
			state: m("projects"),
			summary: i?.checks.projects ? `${i.projects.length} 项，资金缺口 ${P(c(i.projects))}（${o(c(i.projects), a?.checks.projects ? c(a.projects) : void 0)}）；未来 30 天 ${u.length} 项待筹资。` : h("projects"),
			details: v([
				h("projects"),
				...l.projects,
				...u.slice(0, 2).map((e) => `${e.name} · ${e.dueDate} · 缺口 ${P(Math.max(0, N([e.target, -e.current])))}`),
				d.length ? `${d.length} 项日期已过：${d.slice(0, 2).map((e) => e.name).join("、")}；需核实是否完成、取消或延期，不直接认定欠款。` : "",
				i?.projects.some((e) => !e.dueDate) ? "有项目尚未填写截止日期，暂不能判断其资金准备期限。" : "",
				i?.notes.projects ?? ""
			])
		},
		{
			id: "bills",
			title: "账单与订阅",
			state: m("bills"),
			summary: i?.checks.bills ? `${i.bills.length} 项登记，未来 7 天 ${f.length} 项到期提醒，登记金额 ${P(N(f.map((e) => e.amount)))}。` : h("bills"),
			details: v([
				h("bills"),
				...l.bills,
				...f.slice(0, 2).map((e) => `${e.name} · ${e.date} · ${P(e.amount)} · ${e.kind}`),
				p.length ? `${p.length} 项提醒日期已过，支付、续费或取消状态待核实。` : "",
				i?.bills.some((e) => !e.date) ? "有账单尚未填写提醒日期，暂未计入近期到期提醒。" : "",
				"提醒金额不是已支付消费；未登记订阅不在本次清单内。",
				i?.notes.bills ?? ""
			])
		},
		{
			id: "balance",
			title: "资产与负债",
			state: r && (r.assets !== n.assets || t?.balances.debt !== e.balances.debt) ? "余额变化" : i?.checks.balance ? m("balance") : "明细待核对",
			summary: `个人资产 ${P(n.assets)}（${o(n.assets, r?.assets)}）；负债 ${P(e.balances.debt)}（${o(e.balances.debt, t?.balances.debt)}）；净资产 ${o(n.netWorth, r?.netWorth)}。`,
			details: v([
				h("balance"),
				...l.balance,
				i?.checks.balance && _ !== e.balances.debt ? `登记负债 ${P(_)} 与填写的个人负债 ${P(e.balances.debt)} 不一致，需核对遗漏或口径。` : "",
				i?.notes.balance ?? ""
			])
		}
	], b = [];
	return i?.checks.bills && f[0] && b.push(`核对 ${f[0].date} 的“${f[0].name}”提醒（${P(f[0].amount)}），确认是否需要付款、续费或处理到期事项。`), i?.checks.projects && u[0] && b.push(`“${u[0].name}”截至 ${u[0].dueDate} 尚有 ${P(Math.max(0, N([u[0].target, -u[0].current])))} 资金缺口，确定补足或调整计划。`), i?.checks.balance && _ !== e.balances.debt && b.push("先核对资产负债表与本期负债合计的差异，避免遗漏借款或重复记录。"), (i?.checks.projects && d.length || i?.checks.bills && p.length) && b.push("清理已过日期的项目与提醒，确认完成、支付或延期状态；不要直接当作欠款。"), {
		highlights: y,
		actions: b
	};
}
function ze(e, t) {
	let n = t.filter((t) => t.type === e.type && (e.type !== "month" || (t.monthStartDay ?? 1) === (e.monthStartDay ?? 1)) && t.end < e.start).sort((e, t) => t.end.localeCompare(e.end))[0], r = Me(e), i = n ? Me(n) : null, a = ce.map((t) => ({
		...t,
		amount: e.amounts[t.id],
		previous: n?.amounts[t.id] ?? null,
		delta: n ? N([e.amounts[t.id], -n.amounts[t.id]]) : null,
		note: e.notes[t.id] || (e.ledger ?? []).filter((e) => e.group === t.id && e.note.trim()).map((e) => `${e.date} ${e.name} ${P(e.amount)}：${e.note}`).join("；")
	})), o = n ? F(e.start).getTime() - F(n.end).getTime() === ge : !1, s = i ? N([r.netWorth, -i.netWorth]) : null, c = o && s !== null ? N([s, -r.surplus]) : null, l = ["投资基金填净投入，应急基金填净转入；二者不计消费。其他七项填实际净支出，不填充值或预算预留。"];
	e.ledger && l.push("收支来自保存时核对的日期明细快照，不含未标日期的月度余额；后续账本修改不自动改写本报告。");
	let u = be(e, n);
	e.accounts && l.push("账户余额按复盘时的快照比较；余额变化本身不等于消费，具体原因以本期变动说明和账单为准。账户计入范围变化须另行核对。"), l.push("预算中的应急&学习金合并展示；复盘仍区分应急净转入与学习实际消费，学习用途据备注判断。"), n ? (o || l.push("与上期之间有未覆盖日期；余额差值不等于本期变化，暂不做收支对账。"), r.days !== i.days && l.push(`本期${r.days}天，上期${i.days}天；比较总额时同时看日均支出。`)) : l.push("本期是首次基准，暂无上期变化；不会把缺失的上期当成 0。"), e.type === "month" && l.push(e.monthStartDay === 10 ? "月度账期为每月10日至下月9日；与自然月报告分别比较，10号只归新账期。" : "本报告沿用自然月口径，不与10号账期混合比较。"), e.end !== Ee(e.type, e.end, e.monthStartDay).limit && l.push("本周期尚未结束，报告是截至所选日期的阶段数据。");
	let d = Re(e, n);
	e.focus && l.push("关键事项为保存时的登记快照，不与账户或净资产重复相加；项目预留及提醒金额不记为本期消费。未核对的快照不作为已确认变化。");
	let f = [];
	r.surplus < 0 && f.push(`本期收支缺口${P(-r.surplus)}，结合发薪日与集中付款核对周转资金。`), c !== null && Math.abs(c) >= .01 && f.push(`净资产与收支之间有${xe(c)}待解释变化，核对投资涨跌、汇率、账户遗漏及口径，不能直接当作投资收益。`), f.push(...d.actions);
	let p = a.filter((e) => e.flow === "expense" && (e.delta ?? 0) > 0).sort((e, t) => t.delta - e.delta)[0];
	p && f.push(`优先复核${p.name}增加的${P(p.delta)}${p.note ? `，已记事项：${p.note}` : "，补充发生事项后再判断是否调整预算"}。`), f.length === 0 && f.push(n ? "按现有预算继续执行；下期先核对余额，再更新本期实际发生额。" : "核实本期余额和九类金额，作为下一次复盘基准。");
	let m = e.budget ? a.map((t) => ({
		...t,
		budget: e.budget.amounts[t.id],
		remaining: N([e.budget.amounts[t.id], -t.amount])
	})) : [], h = m.filter((t) => e.budget?.mode === "normal" && ["small", "daily"].includes(t.id) && t.remaining < 0);
	return h.length && f.unshift(`本月${h.map((e) => `${e.name}超过预算${P(-e.remaining)}`).join("、")}，核对实际明细，再调整下月额度或消费。`), e.budget && l.push("预算为保存时的完整月度周期额度，不按天摊分；阶段月报的剩余额度不代表最终结余。消费基金跨月使用时结合历史余额判断，不把预留重复计消费。"), e.budget?.mode === "trip" && l.push("出差预算已从补贴扣除海外开销；若实际收支按毛额录入，先拆分海外开销再核对预算，本表不据此自动判定日常超支。"), {
		previous: n,
		prior: i,
		totals: r,
		rows: a,
		highlights: d.highlights,
		accountRows: u,
		budgetRows: m,
		contiguous: o,
		netWorthDelta: s,
		unexplained: c,
		notices: l,
		actions: f.slice(0, 3)
	};
}
function Be(e, t) {
	let n = ze(e, t), { previous: r, prior: i, totals: a, rows: o } = n, s = (e) => e.replace(/\|/g, "／").replace(/[\r\n]+/g, " ");
	return [
		`# ${le[e.type]} · ${e.start} 至 ${e.end}`,
		r ? `对比：${r.start} 至 ${r.end}` : "本期建立首次基准。",
		"",
		`收入 ${P(a.income)} · 实际消费 ${P(a.spending)} · 收支结余 ${P(a.surplus)}`,
		`期末净资产 ${P(a.netWorth)} · 较上期余额 ${xe(n.netWorthDelta)}`,
		`日均消费 ${P(a.spending / a.days)}${i ? `；上期 ${P(i.spending / i.days)}` : ""}`,
		"",
		...e.ledger ? [
			"## 日期收支快照",
			"仅按本期日期汇总已核对的实际收支；月度未标日期金额、股票浮盈、自有账户划拨不计入。",
			"| 日期 | 收支 | 分类 | 金额 | 事项 / 用途 |",
			"|---|---|---|---:|---|",
			...e.ledger.map((e) => `| ${e.date} | ${e.flow === "income" ? "收入" : "支出"} | ${s(e.name)} | ${P(e.amount)} | ${s(e.note || "未填写")} |`),
			""
		] : [],
		...e.incomeLedger ? [
			"## 收入到账快照",
			"| 日期 | 类型 | 金额 | 事项 |",
			"|---|---|---:|---|",
			...e.incomeLedger.map((e) => `| ${e.date} | ${e.categoryId === "salary" ? "工资到账" : "其他收入"} | ${P(e.amount)} | ${s(e.note || "未填写")} |`),
			""
		] : [],
		"## 本期关键变化",
		...n.highlights.flatMap((e) => [
			`### ${e.title} · ${e.state}`,
			e.summary,
			...e.details.map((e) => `- ${s(e)}`),
			""
		]),
		"| 项目 | 本期发生额 | 上期发生额 | 变化 | 本期事项 |",
		"|---|---:|---:|---:|---|",
		...o.map((e) => `| ${e.name}${e.flow === "transfer" ? "（划拨）" : ""} | ${P(e.amount)} | ${e.previous === null ? "无基准" : P(e.previous)} | ${xe(e.delta)} | ${s(e.note || "未填写事项")} |`),
		"",
		...e.budget ? [
			`## 月预算核对 · ${e.budget.mode === "normal" ? "普通月" : "出差月"}`,
			"| 项目 | 整月预算 | 本期金额 | 预算减本期 |",
			"|---|---:|---:|---:|",
			...n.budgetRows.map((e) => `| ${e.name} | ${P(e.budget)} | ${P(e.amount)} | ${P(e.remaining)} |`),
			""
		] : [],
		"| 期末余额 | 本期 | 上期 | 变化 |",
		"|---|---:|---:|---:|",
		...Object.entries(ue).map(([t, n]) => {
			let i = t;
			return `| ${n} | ${P(e.balances[i])} | ${r ? P(r.balances[i]) : "无基准"} | ${xe(r ? N([e.balances[i], -r.balances[i]]) : null)} |`;
		}),
		"",
		...n.accountRows.length ? [
			"## 账户余额对比",
			"| 账户 | 本期期末 | 上期期末 | 余额变化 | 计入个人现金 | 本期说明 |",
			"|---|---:|---:|---:|---|---|",
			...n.accountRows.map((e) => `| ${s(e.name)} | ${e.current === null ? "未记录" : P(e.current)} | ${e.previous === null ? "无基准" : P(e.previous)} | ${xe(e.delta)} | ${e.included === null ? "未记录" : e.included ? "是" : "否"} | ${s([e.status, e.note].filter(Boolean).join("；"))} |`),
			""
		] : [],
		...e.investments ? [
			"## 逐账户投资变化（人民币）",
			"余额变化包含净投入、市值和汇率变化，不直接等于投资收益。",
			"| 账户 | 本期 | 上期 | 余额变化 | 说明 |",
			"|---|---:|---:|---:|---|",
			...de(e, r).map((e) => `| ${s(e.name)} | ${e.current === null ? "未记录" : P(e.current)} | ${e.previous === null ? "无基准" : P(e.previous)} | ${xe(e.delta)} | ${s(e.note)} |`),
			""
		] : [],
		...e.summary ? [`本期补充：${s(e.summary)}`, ""] : [],
		"## 学习用途",
		`本期学习净支出 ${P(e.amounts.learning)}；${s(o.find((e) => e.id === "learning")?.note || "未填写学习事项，暂不能判断学了什么。")}`,
		"",
		"## 下期动作",
		...n.actions.map((e) => `- ${e}`),
		"",
		"## 数据口径",
		...n.notices.map((e) => `- ${e}`),
		""
	].join("\n");
}
function Ve(e, t, n, r = 1) {
	let { start: i } = Ee(t, n, r);
	for (let a of t === "quarter" ? ["month", "week"] : ["week"]) {
		let o = e.filter((e) => e.type === a && (a !== "month" || (e.monthStartDay ?? 1) === 1) && e.start >= i && e.end <= n).sort((e, t) => e.start.localeCompare(t.start)), s = i, c = o.length > 0;
		for (let e of o) e.start !== s && (c = !1), s = Se(new Date(F(e.end).getTime() + ge));
		if (!(!c || s !== Se(new Date(F(n).getTime() + ge)))) return ke({
			...De(t, n, r),
			income: N(o.map((e) => e.income)),
			amounts: Object.fromEntries(ce.map((e) => [e.id, N(o.map((t) => t.amounts[e.id]))])),
			notes: Object.fromEntries(ce.map((e) => [e.id, o.filter((t) => t.notes[e.id]).map((t) => `${t.start}：${t.notes[e.id]}`).join("；")])),
			balances: o[o.length - 1].balances,
			accounts: o[o.length - 1].accounts,
			focus: o[o.length - 1].focus,
			investments: o[o.length - 1].investments,
			goals: o[o.length - 1].goals,
			...o.every((e) => e.ledger) ? { ledger: o.flatMap((e) => e.ledger) } : {},
			...!o.every((e) => e.ledger) && o.every((e) => Pe(e)) ? { incomeLedger: o.flatMap((e) => Pe(e)) } : {},
			summary: `由 ${o.length} 条无重叠、连续覆盖的${a === "week" ? "周" : "月"}记录汇总；期末余额及账户快照取最后一期，不累加。`
		});
	}
	throw Error("现有记录没有完整、连续覆盖该周期，或有跨月/跨季的周记录。请补填本周期实际汇总，不能按天摊分实际消费。");
}
//#endregion
//#region app/finance-review-focus.tsx
function He({ focus: e, live: t, onChange: n, onRefresh: r, onOpen: i, onUseBalances: a, saveAction: o }) {
	let s = (e) => e.reduce((e, t) => e + Math.round(t.amount * 100), 0) / 100, c = e ? {
		projects: `${e.projects.length} 项 · 缺口 ${P(e.projects.reduce((e, t) => e + Math.max(0, Math.round((t.target - t.current) * 100)), 0) / 100)}`,
		bills: `${e.bills.length} 项登记 · 包含已登记的订阅提醒`,
		balance: `补录资产 ${P(s(e.assets))} · 负债 ${P(s(e.debts))}`
	} : null, l = {
		projects: "fundBuckets",
		bills: "reminders",
		balance: "balance"
	}, u = (t, r, i, a) => {
		e && n({
			...e,
			[r]: e[r].map((e) => e.id === i ? {
				...e,
				...a
			} : e),
			checks: {
				...e.checks,
				[t]: !1
			}
		});
	}, d = (e) => e.trim() === "" ? NaN : Number(e), f = (e, t, n, r, i) => /* @__PURE__ */ (0, b.jsx)("input", {
		"aria-label": `${n.name}复盘${r}`,
		type: "number",
		min: "0",
		step: "0.01",
		required: !0,
		value: Number.isFinite(i) ? i : "",
		onChange: (i) => u(e, t, n.id, { [r === "目标" ? "target" : r === "实际" ? "current" : "amount"]: d(i.target.value) })
	});
	return /* @__PURE__ */ (0, b.jsxs)("section", {
		className: "review-focus-entry",
		"aria-label": "关键事项核对",
		children: [/* @__PURE__ */ (0, b.jsxs)("div", {
			className: "review-toolbar",
			children: [/* @__PURE__ */ (0, b.jsx)("h3", { children: "关键事项核对" }), /* @__PURE__ */ (0, b.jsx)("button", {
				type: "button",
				className: "secondary-button",
				onClick: r,
				children: "刷新关键事项"
			})]
		}), e ? /* @__PURE__ */ (0, b.jsxs)(b.Fragment, { children: [/* @__PURE__ */ (0, b.jsxs)("p", {
			className: "review-caption",
			children: [t ? "当前模块实时联动；有变化的项目会重新标记为待核对，已填说明保留。" : "历史／修订快照，不自动替换为当前模块数据。", "登记金额不计入本期消费。"]
		}), Object.keys(fe).map((t) => /* @__PURE__ */ (0, b.jsxs)("div", {
			className: "review-focus-check",
			"data-review-module": t,
			children: [/* @__PURE__ */ (0, b.jsxs)("details", { children: [
				/* @__PURE__ */ (0, b.jsxs)("summary", { children: [/* @__PURE__ */ (0, b.jsx)("strong", { children: fe[t] }), /* @__PURE__ */ (0, b.jsx)("span", { children: c[t] })] }),
				/* @__PURE__ */ (0, b.jsx)("div", {
					className: "table-wrap",
					children: /* @__PURE__ */ (0, b.jsxs)("table", {
						className: "review-table",
						children: [
							t === "projects" && /* @__PURE__ */ (0, b.jsxs)(b.Fragment, { children: [/* @__PURE__ */ (0, b.jsx)("thead", { children: /* @__PURE__ */ (0, b.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, b.jsx)("th", { children: "项目" }),
								/* @__PURE__ */ (0, b.jsx)("th", { children: "目标" }),
								/* @__PURE__ */ (0, b.jsx)("th", { children: "实际" }),
								/* @__PURE__ */ (0, b.jsx)("th", { children: "截止日期" })
							] }) }), /* @__PURE__ */ (0, b.jsx)("tbody", { children: e.projects.map((e) => /* @__PURE__ */ (0, b.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, b.jsx)("th", { children: e.name }),
								/* @__PURE__ */ (0, b.jsx)("td", { children: f(t, "projects", e, "目标", e.target) }),
								/* @__PURE__ */ (0, b.jsx)("td", { children: f(t, "projects", e, "实际", e.current) }),
								/* @__PURE__ */ (0, b.jsx)("td", { children: /* @__PURE__ */ (0, b.jsx)("input", {
									type: "date",
									"aria-label": `${e.name}复盘截止日期`,
									value: e.dueDate,
									onChange: (n) => u(t, "projects", e.id, { dueDate: n.target.value })
								}) })
							] }, e.id)) })] }),
							t === "bills" && /* @__PURE__ */ (0, b.jsxs)(b.Fragment, { children: [/* @__PURE__ */ (0, b.jsx)("thead", { children: /* @__PURE__ */ (0, b.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, b.jsx)("th", { children: "账单 / 订阅" }),
								/* @__PURE__ */ (0, b.jsx)("th", { children: "登记金额" }),
								/* @__PURE__ */ (0, b.jsx)("th", { children: "提醒日期" }),
								/* @__PURE__ */ (0, b.jsx)("th", { children: "类型" })
							] }) }), /* @__PURE__ */ (0, b.jsx)("tbody", { children: e.bills.map((e) => /* @__PURE__ */ (0, b.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, b.jsx)("th", { children: e.name }),
								/* @__PURE__ */ (0, b.jsx)("td", { children: f(t, "bills", e, "金额", e.amount) }),
								/* @__PURE__ */ (0, b.jsx)("td", { children: /* @__PURE__ */ (0, b.jsx)("input", {
									type: "date",
									"aria-label": `${e.name}复盘提醒日期`,
									value: e.date,
									onChange: (n) => u(t, "bills", e.id, { date: n.target.value })
								}) }),
								/* @__PURE__ */ (0, b.jsx)("td", { children: e.kind })
							] }, e.id)) })] }),
							t === "balance" && /* @__PURE__ */ (0, b.jsxs)(b.Fragment, { children: [/* @__PURE__ */ (0, b.jsx)("thead", { children: /* @__PURE__ */ (0, b.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, b.jsx)("th", { children: "明细" }),
								/* @__PURE__ */ (0, b.jsx)("th", { children: "金额" }),
								/* @__PURE__ */ (0, b.jsx)("th", { children: "口径" })
							] }) }), /* @__PURE__ */ (0, b.jsxs)("tbody", { children: [
								e.assets.map((e) => /* @__PURE__ */ (0, b.jsxs)("tr", { children: [
									/* @__PURE__ */ (0, b.jsx)("th", { children: e.name }),
									/* @__PURE__ */ (0, b.jsx)("td", { children: f(t, "assets", e, "金额", e.amount) }),
									/* @__PURE__ */ (0, b.jsx)("td", { children: "补录资产" })
								] }, `asset:${e.id}`)),
								e.debts.map((e) => /* @__PURE__ */ (0, b.jsxs)("tr", { children: [
									/* @__PURE__ */ (0, b.jsx)("th", { children: e.name }),
									/* @__PURE__ */ (0, b.jsx)("td", { children: f(t, "debts", e, "金额", e.amount) }),
									/* @__PURE__ */ (0, b.jsx)("td", { children: "负债余额" })
								] }, `debt:${e.id}`)),
								/* @__PURE__ */ (0, b.jsxs)("tr", { children: [
									/* @__PURE__ */ (0, b.jsx)("th", { children: "投资持仓" }),
									/* @__PURE__ */ (0, b.jsx)("td", { children: P(e.holdings) }),
									/* @__PURE__ */ (0, b.jsx)("td", { children: "参考市值，不含未登记的证券现金" })
								] })
							] })] })
						]
					})
				}),
				/* @__PURE__ */ (0, b.jsxs)("div", {
					className: "data-actions",
					children: [/* @__PURE__ */ (0, b.jsxs)("button", {
						type: "button",
						className: "secondary-button",
						onClick: () => i(l[t]),
						children: ["前往", fe[t]]
					}), t === "balance" && /* @__PURE__ */ (0, b.jsx)("button", {
						type: "button",
						className: "secondary-button",
						onClick: a,
						children: "带入补录资产与负债合计"
					})]
				}),
				/* @__PURE__ */ (0, b.jsxs)("label", {
					className: "field",
					children: [/* @__PURE__ */ (0, b.jsxs)("span", { children: [fe[t], "变化说明（可选）"] }), /* @__PURE__ */ (0, b.jsx)("input", {
						type: "text",
						value: e.notes[t] ?? "",
						onChange: (r) => n({
							...e,
							notes: {
								...e.notes,
								[t]: r.target.value
							}
						})
					})]
				}),
				/* @__PURE__ */ (0, b.jsx)("div", {
					className: "data-actions",
					children: o?.(t)
				})
			] }), /* @__PURE__ */ (0, b.jsxs)("label", {
				className: "review-focus-confirm",
				children: [/* @__PURE__ */ (0, b.jsx)("input", {
					type: "checkbox",
					"aria-label": `${fe[t]}已核对`,
					checked: e.checks[t],
					onChange: (r) => n({
						...e,
						checks: {
							...e.checks,
							[t]: r.target.checked
						}
					})
				}), e.checks[t] ? "已核对" : "待核对"]
			})]
		}, t))] }) : /* @__PURE__ */ (0, b.jsx)("p", {
			className: "review-caption",
			children: "本期尚无项目、账单及资产负债明细快照。"
		})]
	});
}
//#endregion
//#region app/review-investments.tsx
function Ue({ value: e, onChange: t, confirmed: n, onConfirm: r, onOpen: i, saveAction: a }) {
	let o = (e) => e.trim() === "" ? NaN : Number(e);
	return /* @__PURE__ */ (0, b.jsxs)("section", {
		className: "review-accounts",
		"aria-label": "逐账户投资核对",
		"data-review-module": "investments",
		children: [/* @__PURE__ */ (0, b.jsxs)("div", {
			className: "review-toolbar",
			children: [/* @__PURE__ */ (0, b.jsx)("h3", { children: "投资账户 · 期末明细" }), /* @__PURE__ */ (0, b.jsx)("button", {
				type: "button",
				className: "secondary-button",
				onClick: i,
				children: "前往投资管理"
			})]
		}), e ? /* @__PURE__ */ (0, b.jsxs)(b.Fragment, { children: [
			/* @__PURE__ */ (0, b.jsx)("div", {
				className: "review-fields",
				children: ["fxUsd", "fxHkd"].map((n) => /* @__PURE__ */ (0, b.jsxs)("label", {
					className: "field",
					children: [/* @__PURE__ */ (0, b.jsx)("span", { children: n === "fxUsd" ? "美元兑人民币" : "港币兑人民币" }), /* @__PURE__ */ (0, b.jsx)("input", {
						"aria-label": `复盘${n === "fxUsd" ? "美元" : "港币"}汇率`,
						type: "number",
						step: "0.01",
						min: "0.01",
						required: !0,
						value: Number.isFinite(e[n]) ? e[n] : "",
						onChange: (r) => t({
							...e,
							[n]: o(r.target.value)
						})
					})]
				}, n))
			}),
			/* @__PURE__ */ (0, b.jsx)("div", {
				className: "table-wrap",
				children: /* @__PURE__ */ (0, b.jsxs)("table", {
					className: "review-table",
					children: [/* @__PURE__ */ (0, b.jsx)("thead", { children: /* @__PURE__ */ (0, b.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, b.jsx)("th", { children: "账户 / 市场" }),
						/* @__PURE__ */ (0, b.jsx)("th", { children: "币种" }),
						/* @__PURE__ */ (0, b.jsx)("th", { children: "成本" }),
						/* @__PURE__ */ (0, b.jsx)("th", { children: "期末金额" }),
						/* @__PURE__ */ (0, b.jsx)("th", { children: "折人民币" }),
						/* @__PURE__ */ (0, b.jsx)("th", { children: "变化说明" })
					] }) }), /* @__PURE__ */ (0, b.jsx)("tbody", { children: e.holdings.map((n) => /* @__PURE__ */ (0, b.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, b.jsxs)("th", { children: [n.name, /* @__PURE__ */ (0, b.jsx)("small", { children: n.market })] }),
						/* @__PURE__ */ (0, b.jsx)("td", { children: n.currency }),
						["cost", "value"].map((r) => /* @__PURE__ */ (0, b.jsx)("td", { children: /* @__PURE__ */ (0, b.jsx)("input", {
							type: "number",
							required: !0,
							min: "0",
							step: "0.01",
							"aria-label": `${n.name}复盘${r === "cost" ? "成本" : "期末金额"}`,
							value: Number.isFinite(n[r]) ? n[r] : "",
							onChange: (i) => t({
								...e,
								holdings: e.holdings.map((e) => e.id === n.id ? {
									...e,
									[r]: o(i.target.value)
								} : e)
							})
						}) }, r)),
						/* @__PURE__ */ (0, b.jsx)("td", { children: Number.isFinite(j(n, e)) ? P(j(n, e)) : "待补" }),
						/* @__PURE__ */ (0, b.jsx)("td", { children: /* @__PURE__ */ (0, b.jsx)("input", {
							"aria-label": `${n.name}投资变化说明`,
							value: n.note ?? "",
							onChange: (r) => t({
								...e,
								holdings: e.holdings.map((e) => e.id === n.id ? {
									...e,
									note: r.target.value
								} : e)
							})
						}) })
					] }, n.id)) })]
				})
			}),
			/* @__PURE__ */ (0, b.jsxs)("p", { children: [
				"证券合计：",
				Number.isFinite(M(e)) ? P(M(e)) : "待补",
				" · 原币金额，证券现金如已含在账户总额中不再另计。"
			] }),
			/* @__PURE__ */ (0, b.jsxs)("label", {
				className: "review-ledger-confirm",
				children: [/* @__PURE__ */ (0, b.jsx)("input", {
					type: "checkbox",
					checked: n,
					onChange: (e) => r(e.target.checked)
				}), "已核对所有投资账户及汇率"]
			}),
			/* @__PURE__ */ (0, b.jsx)("div", {
				className: "data-actions",
				children: a
			})
		] }) : /* @__PURE__ */ (0, b.jsx)("p", { children: "旧报告未保存投资明细，需重新带入当前模块后核对。" })]
	});
}
function We({ current: e, previous: t }) {
	let n = de(e, t);
	return n.length ? /* @__PURE__ */ (0, b.jsxs)("details", {
		className: "review-method",
		open: !0,
		children: [
			/* @__PURE__ */ (0, b.jsx)("summary", { children: "逐账户投资变化 · 人民币" }),
			/* @__PURE__ */ (0, b.jsx)("div", {
				className: "table-wrap",
				children: /* @__PURE__ */ (0, b.jsxs)("table", {
					className: "review-table",
					children: [/* @__PURE__ */ (0, b.jsx)("thead", { children: /* @__PURE__ */ (0, b.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, b.jsx)("th", { children: "账户" }),
						/* @__PURE__ */ (0, b.jsx)("th", { children: "本期" }),
						/* @__PURE__ */ (0, b.jsx)("th", { children: "上期" }),
						/* @__PURE__ */ (0, b.jsx)("th", { children: "余额变化" }),
						/* @__PURE__ */ (0, b.jsx)("th", { children: "说明" })
					] }) }), /* @__PURE__ */ (0, b.jsx)("tbody", { children: n.map((e) => /* @__PURE__ */ (0, b.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, b.jsx)("th", { children: e.name }),
						/* @__PURE__ */ (0, b.jsx)("td", { children: e.current === null ? "未记录" : P(e.current) }),
						/* @__PURE__ */ (0, b.jsx)("td", { children: e.previous === null ? "无基准" : P(e.previous) }),
						/* @__PURE__ */ (0, b.jsx)("td", { children: e.delta === null ? "无基准" : P(e.delta) }),
						/* @__PURE__ */ (0, b.jsx)("td", { children: e.note || "未填写" })
					] }, e.id)) })]
				})
			}),
			/* @__PURE__ */ (0, b.jsx)("p", {
				className: "review-caption",
				children: "余额变化包含净投入及市值、汇率变化，不直接等于投资收益。"
			})
		]
	}) : null;
}
//#endregion
//#region app/use-finance-today.ts
function Ge() {
	let [e, t] = (0, _.useState)(() => Ce());
	return (0, _.useEffect)(() => {
		let e = () => t(Ce()), n = window.setInterval(e, 6e4);
		return window.addEventListener("focus", e), document.addEventListener("visibilitychange", e), () => {
			window.clearInterval(n), window.removeEventListener("focus", e), document.removeEventListener("visibilitychange", e);
		};
	}, []), e;
}
//#endregion
//#region app/dated-ledger-model.ts
var Ke = [
	"rent",
	"parents",
	"learning",
	"travel",
	"partner",
	"small",
	"daily"
], qe = (e) => Math.round(e * 100), Je = (e) => e.reduce((e, t) => e + qe(t), 0) / 100;
function Ye(e) {
	if (e === void 0) return [];
	if (!Array.isArray(e)) throw Error("日期收支明细须为列表");
	let t = /* @__PURE__ */ new Set();
	return e.map((e) => {
		let n = e;
		if (!n || typeof n.id != "string" || !n.id || t.has(n.id)) throw Error("日期收支编号重复或缺失");
		if (t.add(n.id), typeof n.date != "string" || !/^\d{4}-\d{2}-\d{2}$/.test(n.date) || !Number.isFinite(Date.parse(`${n.date}T00:00:00Z`)) || (/* @__PURE__ */ new Date(`${n.date}T00:00:00Z`)).toISOString().slice(0, 10) !== n.date) throw Error("请填写有效的收支日期");
		if (!["income", "expense"].includes(String(n.flow)) || typeof n.categoryId != "string" || !n.categoryId) throw Error("收支类型或分类缺失");
		if (n.flow === "income" && !["salary", "otherIncome"].includes(n.categoryId)) throw Error("收入仅记录工资或其他实际到账，不含股票浮盈");
		if (typeof n.amount != "number" || !Number.isFinite(n.amount) || Math.abs(n.amount) > 0xe8d4a51000 || qe(n.amount) === 0) throw Error("金额须为有效非零数，退款填负数");
		return {
			id: n.id,
			date: n.date,
			flow: n.flow,
			categoryId: n.categoryId,
			amount: qe(n.amount) / 100,
			note: typeof n.note == "string" ? n.note : ""
		};
	});
}
function Xe(e, t, n) {
	if (t === "income") return n === "salary" ? e.salary : e.otherIncome;
	let r = e.budgets.find((e) => e.id === n);
	if (!r) throw Error("支出分类已不存在，请重新选择");
	return r.actual;
}
function Ze(e, t, n, r) {
	return Je([Xe(e, n, r), ...t.filter((t) => t.date.startsWith(e.id + "-") && t.flow === n && t.categoryId === r).map((e) => -e.amount)]);
}
function Qe(e, t, n, r, i = "new", a) {
	let o = n ? Ye([n])[0] : null, s = r ? t.find((e) => e.id === r) : void 0;
	if (r && !s) throw Error("原明细已不存在，请刷新后重试");
	if (o && t.some((e) => e.id === o.id && e.id !== r)) throw Error("收支编号已存在");
	if (!o && !s) throw Error("请选择收支明细");
	for (let t of [o, s]) {
		if (!t) continue;
		let n = e.find((e) => e.id === t.date.slice(0, 7));
		if (!n) throw Error("请先添加该日期所属的月份");
		Xe(n, t.flow, t.categoryId);
	}
	if (o && !s && i === "allocate") {
		let n = Ze(e.find((e) => e.id === o.date.slice(0, 7)), t, o.flow, o.categoryId);
		if (Math.sign(n) !== Math.sign(o.amount) || Math.abs(qe(o.amount)) > Math.abs(qe(n))) throw Error("补录金额超出该分类未标日期金额；新发生的收支请选择新增实际");
	}
	let c = [...s ? [{
		...s,
		amount: -s.amount
	}] : [], ...o && (s || i === "new") ? [o] : []];
	return {
		records: e.map((e) => {
			let t = c.filter((t) => t.date.slice(0, 7) === e.id);
			return {
				...e,
				salary: Je([e.salary, ...t.filter((e) => e.flow === "income" && e.categoryId === "salary").map((e) => e.amount)]),
				otherIncome: Je([e.otherIncome, ...t.filter((e) => e.flow === "income" && e.categoryId === "otherIncome").map((e) => e.amount)]),
				budgets: e.budgets.map((n) => ({
					...n,
					actual: Je([n.actual, ...t.filter((e) => e.flow === "expense" && e.categoryId === n.id).map((e) => e.amount)]),
					...o?.flow === "expense" && o.date.slice(0, 7) === e.id && o.categoryId === n.id && a ? { group: a } : {}
				}))
			};
		}),
		entries: [...t.filter((e) => e.id !== r), ...o ? [o] : []].sort((e, t) => e.date.localeCompare(t.date) || e.id.localeCompare(t.id))
	};
}
function $e(e, t, n) {
	let r = new Set(n.filter((e) => e.flow === "income" && e.categoryId === "salary").map((e) => e.date.slice(0, 7)));
	return e.map((e) => r.has(e.id) ? {
		...e,
		salary: t.find((t) => t.id === e.id)?.salary ?? e.salary
	} : e);
}
function et(e, t, n, r) {
	let i = t.filter((e) => e.date >= n && e.date <= r).map((t) => {
		let n = e.find((e) => e.id === t.date.slice(0, 7))?.budgets.find((e) => e.id === t.categoryId), r = n?.group;
		return {
			...t,
			name: t.flow === "income" ? t.categoryId === "salary" ? "工资到账" : "其他到账" : n?.name ?? "分类缺失",
			group: t.flow === "income" ? "income" : Ke.includes(r) ? r : "unassigned"
		};
	});
	return {
		rows: i,
		undated: e.filter((e) => e.id >= n.slice(0, 7) && e.id <= r.slice(0, 7)).flatMap((e) => [
			{
				flow: "income",
				id: "salary",
				name: "工资"
			},
			{
				flow: "income",
				id: "otherIncome",
				name: "其他收入"
			},
			...e.budgets.map((e) => ({
				flow: "expense",
				id: e.id,
				name: e.name
			}))
		].map((n) => ({
			month: e.id,
			name: n.name,
			amount: Ze(e, t, n.flow, n.id)
		})).filter((e) => e.amount !== 0)),
		unassigned: i.filter((e) => e.group === "unassigned"),
		income: Je(i.filter((e) => e.group === "income").map((e) => e.amount)),
		spending: Je(i.filter((e) => e.flow === "expense").map((e) => e.amount))
	};
}
function tt(e, t) {
	if (t.some((e) => e.group === "unassigned")) throw Error("请先在支出模块确认明细的分类归属");
	let n = { ...e.amounts };
	for (let e of Ke) n[e] = Je(t.filter((t) => t.group === e).map((e) => e.amount));
	return {
		...e,
		income: Je(t.filter((e) => e.group === "income").map((e) => e.amount)),
		amounts: n,
		ledger: t.map((e) => ({ ...e })),
		incomeLedger: void 0
	};
}
function nt(e, t) {
	let n = t.filter((e) => e.flow === "income").map((e) => ({ ...e }));
	return {
		...e,
		income: Je(n.map((e) => e.amount)),
		incomeLedger: n
	};
}
//#endregion
//#region app/spending-detail-model.ts
var rt = [
	{
		id: "rent",
		name: "房租"
	},
	{
		id: "parents",
		name: "家用"
	},
	{
		id: "learning",
		name: "应急&学习金 · 学习"
	},
	{
		id: "travel",
		name: "旅游基金"
	},
	{
		id: "partner",
		name: "伴侣基金"
	},
	{
		id: "small",
		name: "小额支付"
	},
	{
		id: "daily",
		name: "日常使用"
	}
];
function it(e) {
	return rt.some((t) => t.id === e.group) ? e.group : "unassigned";
}
var at = (e) => e.reduce((e, t) => e + Math.round(t * 100), 0) / 100;
function ot(e) {
	let t = e.filter((e) => it(e) === "learning" && e.actual !== 0);
	return {
		rows: t,
		total: at(t.map((e) => e.actual)),
		unassigned: at(e.filter((e) => it(e) === "unassigned").map((e) => e.actual)),
		missingNotes: t.filter((e) => !e.note?.trim()).length
	};
}
var L = [
	{
		id: "lunch-dinner",
		name: "午餐与晚餐",
		group: "daily"
	},
	{
		id: "social-meals",
		name: "聚餐与外卖",
		group: "daily"
	},
	{
		id: "goods",
		name: "衣物与日用品",
		group: "daily"
	},
	{
		id: "phone-subscriptions",
		name: "通讯与非学习订阅",
		group: "daily"
	},
	{
		id: "sports",
		name: "运动与娱乐",
		group: "daily"
	},
	{
		id: "health",
		name: "医疗与个护",
		group: "daily"
	},
	{
		id: "gifts",
		name: "人情与其他日常",
		group: "daily"
	},
	{
		id: "courses",
		name: "学习课程与培训",
		group: "learning"
	},
	{
		id: "books",
		name: "学习书籍与资料",
		group: "learning"
	},
	{
		id: "tools",
		name: "学习工具与订阅",
		group: "learning"
	},
	{
		id: "small-wallet",
		name: "早餐地铁零食汇总",
		group: "small"
	}
];
function R(e) {
	let t = L.filter((t) => !e.some((e) => e.id === `detail-${t.id}` || e.name.trim() === t.name));
	return [...e, ...t.map((e) => ({
		...e,
		id: `detail-${e.id}`,
		plan: 0,
		actual: 0,
		required: !1,
		fixed: !1,
		note: ""
	}))];
}
function st(e) {
	return e.map((e) => ({
		...e,
		actual: 0,
		note: ""
	}));
}
//#endregion
//#region app/dated-ledger-editor.tsx
function ct({ flow: e, month: t, entries: n, onSave: r, onDelete: i, embedded: a = !1, range: o, onDirtyChange: s }) {
	let c = Ge(), l = e === "income" ? "收入" : "支出", u = e === "income" ? [{
		id: "salary",
		name: "工资到账"
	}, {
		id: "otherIncome",
		name: "其他到账"
	}] : t.budgets.filter((e) => !e.reviewPeriod);
	function d(e) {
		let n = t.budgets.find((t) => t.id === e);
		return n ? it(n) : "unassigned";
	}
	let [f, p] = (0, _.useState)(), [m, h] = (0, _.useState)(o ? o.end.startsWith(t.id) ? o.end : o.start.startsWith(t.id) ? o.start : `${t.id}-01` : c.startsWith(t.id) ? c : ""), [g, v] = (0, _.useState)(u[0]?.id ?? ""), [y, x] = (0, _.useState)(() => d(u[0]?.id ?? "")), [S, ee] = (0, _.useState)(""), [C, w] = (0, _.useState)(""), [T, te] = (0, _.useState)(() => u[0] && Ze(t, n, e, u[0].id) > 0 ? "allocate" : "new"), [E, D] = (0, _.useState)(""), [ne, re] = (0, _.useState)(), ie = n.filter((n) => n.flow === e && n.date.startsWith(t.id + "-") && (!o || n.date >= o.start && n.date <= o.end)), O = u.find((e) => e.id === g), ae = O ? Ze(t, n, e, g) : 0, oe = new Date(Date.UTC(Number(t.id.slice(0, 4)), Number(t.id.slice(5)), 0)).toISOString().slice(0, 10), k = o && o.start > `${t.id}-01` ? o.start : `${t.id}-01`, A = [
		oe,
		c,
		...o ? [o.end] : []
	].sort()[0], se = a ? "div" : "form";
	function ce() {
		p(void 0), ee(""), w(""), s?.(!1);
	}
	function le() {
		try {
			if (!m || m.slice(0, 7) !== t.id || m > c) throw Error("实际收支日期须在所选月份内且不晚于今天");
			if (o && (m < o.start || m > o.end)) throw Error("到账日期须在本次复盘范围内");
			if (S.trim() === "" || !Number.isFinite(Number(S)) || !Number.isInteger(Number((Number(S) * 100).toFixed(6)))) throw Error("请填写最多两位小数的有效金额");
			if (!O) throw Error("请选择分类");
			if (e === "expense" && y === "unassigned") throw Error("请选择分类归属，便于复盘汇总");
			r({
				id: f ?? crypto.randomUUID(),
				date: m,
				flow: e,
				categoryId: g,
				amount: Number(S),
				note: C
			}, f, T, e === "expense" ? y : void 0), D(f ? "明细已保存，月度实际已同步。" : T === "allocate" ? "日期已补录，月度实际总额未增加。" : "明细已保存，月度实际已增加。记得保存到云端以供其他电脑读取。"), ce();
		} catch (e) {
			D(e instanceof Error ? e.message : "保存失败");
		}
	}
	return /* @__PURE__ */ (0, b.jsxs)("section", {
		className: "dated-ledger",
		"aria-label": `${l}日期明细`,
		children: [
			/* @__PURE__ */ (0, b.jsxs)("div", {
				className: "review-toolbar",
				children: [/* @__PURE__ */ (0, b.jsxs)("h3", { children: [l, "日期明细"] }), /* @__PURE__ */ (0, b.jsxs)("span", { children: [
					t.id,
					" · ",
					ie.length,
					" 笔"
				] })]
			}),
			/* @__PURE__ */ (0, b.jsxs)(se, {
				onSubmit: a ? void 0 : (e) => {
					e.preventDefault(), le();
				},
				onKeyDown: a ? (e) => {
					e.key === "Enter" && e.target.tagName === "INPUT" && (e.preventDefault(), le());
				} : void 0,
				children: [/* @__PURE__ */ (0, b.jsxs)("div", {
					className: "dated-entry-fields",
					children: [
						/* @__PURE__ */ (0, b.jsxs)("label", {
							className: "field",
							children: [/* @__PURE__ */ (0, b.jsx)("span", { children: "日期" }), /* @__PURE__ */ (0, b.jsx)("input", {
								type: "date",
								required: !a,
								"aria-label": `${l}日期`,
								min: k,
								max: A,
								value: m,
								onInput: (e) => h(e.currentTarget.value)
							})]
						}),
						/* @__PURE__ */ (0, b.jsxs)("label", {
							className: "field",
							children: [/* @__PURE__ */ (0, b.jsx)("span", { children: "分类" }), /* @__PURE__ */ (0, b.jsx)("select", {
								"aria-label": `${l}分类`,
								value: g,
								onChange: (r) => {
									v(r.target.value), x(d(r.target.value)), te(Ze(t, n, e, r.target.value) > 0 ? "allocate" : "new");
								},
								children: u.map((e) => /* @__PURE__ */ (0, b.jsx)("option", {
									value: e.id,
									children: e.name
								}, e.id))
							})]
						}),
						e === "expense" && /* @__PURE__ */ (0, b.jsxs)("label", {
							className: "field",
							children: [/* @__PURE__ */ (0, b.jsx)("span", { children: "分类归属" }), /* @__PURE__ */ (0, b.jsxs)("select", {
								"aria-label": "日期支出分类归属",
								value: y,
								onChange: (e) => x(e.target.value),
								children: [/* @__PURE__ */ (0, b.jsx)("option", {
									value: "unassigned",
									children: "待确认"
								}), rt.map((e) => /* @__PURE__ */ (0, b.jsx)("option", {
									value: e.id,
									children: e.name
								}, e.id))]
							})]
						}),
						/* @__PURE__ */ (0, b.jsxs)("label", {
							className: "field",
							children: [/* @__PURE__ */ (0, b.jsx)("span", { children: "金额（退款为负）" }), /* @__PURE__ */ (0, b.jsx)("input", {
								type: "number",
								step: "0.01",
								required: !a,
								"aria-label": `${l}明细金额`,
								value: S,
								onChange: (e) => {
									ee(e.target.value), s?.(!!(e.target.value || C || f));
								}
							})]
						}),
						/* @__PURE__ */ (0, b.jsxs)("label", {
							className: "field",
							children: [/* @__PURE__ */ (0, b.jsx)("span", { children: "记账口径" }), /* @__PURE__ */ (0, b.jsx)("select", {
								"aria-label": `${l}记账口径`,
								value: f ? "new" : T,
								disabled: !!f,
								onChange: (e) => te(e.target.value),
								children: f ? /* @__PURE__ */ (0, b.jsx)("option", {
									value: "new",
									children: "修改已有实际"
								}) : /* @__PURE__ */ (0, b.jsxs)(b.Fragment, { children: [/* @__PURE__ */ (0, b.jsx)("option", {
									value: "allocate",
									children: "补录日期 · 总额不变"
								}), /* @__PURE__ */ (0, b.jsx)("option", {
									value: "new",
									children: "新增实际 · 计入总额"
								})] })
							})]
						}),
						/* @__PURE__ */ (0, b.jsxs)("label", {
							className: "field dated-note",
							children: [/* @__PURE__ */ (0, b.jsx)("span", { children: "事项 / 用途" }), /* @__PURE__ */ (0, b.jsx)("input", {
								type: "text",
								"aria-label": `${l}明细事项`,
								value: C,
								onChange: (e) => {
									w(e.target.value), s?.(!!(e.target.value || S || f));
								}
							})]
						})
					]
				}), /* @__PURE__ */ (0, b.jsxs)("div", {
					className: "review-toolbar",
					children: [/* @__PURE__ */ (0, b.jsxs)("span", {
						className: "review-caption",
						children: [
							"本月该分类未标日期：",
							P(ae),
							e === "income" ? " · 未确认到账的工资规划不进入复盘" : " · 不含自有账户互转、预留及还款本金"
						]
					}), /* @__PURE__ */ (0, b.jsxs)("div", {
						className: "data-actions",
						children: [/* @__PURE__ */ (0, b.jsx)("button", {
							className: "primary-button",
							type: a ? "button" : "submit",
							onClick: a ? le : void 0,
							children: f ? "保存修改" : a ? "保存收入" : "保存明细"
						}), (f || a && (S || C)) && /* @__PURE__ */ (0, b.jsx)("button", {
							type: "button",
							className: "secondary-button",
							onClick: ce,
							children: "取消修改"
						})]
					})]
				})]
			}),
			E && /* @__PURE__ */ (0, b.jsx)("p", {
				role: "status",
				className: "review-status",
				children: E
			}),
			/* @__PURE__ */ (0, b.jsxs)("details", {
				open: ie.length > 0,
				children: [/* @__PURE__ */ (0, b.jsxs)("summary", { children: [
					"已登记明细 · ",
					ie.length,
					" 笔"
				] }), ie.length > 0 ? /* @__PURE__ */ (0, b.jsx)("div", {
					className: "table-wrap",
					children: /* @__PURE__ */ (0, b.jsxs)("table", {
						className: "review-table",
						children: [/* @__PURE__ */ (0, b.jsx)("thead", { children: /* @__PURE__ */ (0, b.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, b.jsx)("th", { children: "日期" }),
							/* @__PURE__ */ (0, b.jsx)("th", { children: "分类" }),
							/* @__PURE__ */ (0, b.jsx)("th", { children: "金额" }),
							/* @__PURE__ */ (0, b.jsx)("th", { children: "事项 / 用途" }),
							/* @__PURE__ */ (0, b.jsx)("th", { children: "操作" })
						] }) }), /* @__PURE__ */ (0, b.jsx)("tbody", { children: ie.map((e) => /* @__PURE__ */ (0, b.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, b.jsx)("td", { children: e.date }),
							/* @__PURE__ */ (0, b.jsx)("td", { children: u.find((t) => t.id === e.categoryId)?.name ?? "分类缺失" }),
							/* @__PURE__ */ (0, b.jsx)("td", { children: P(e.amount) }),
							/* @__PURE__ */ (0, b.jsx)("td", { children: e.note || "未填写" }),
							/* @__PURE__ */ (0, b.jsx)("td", { children: /* @__PURE__ */ (0, b.jsx)("div", {
								className: "data-actions",
								children: ne === e.id ? /* @__PURE__ */ (0, b.jsxs)(b.Fragment, { children: [
									/* @__PURE__ */ (0, b.jsx)("span", { children: "同时扣减月度实际？" }),
									/* @__PURE__ */ (0, b.jsx)("button", {
										type: "button",
										className: "danger-button",
										onClick: () => {
											try {
												i(e.id), re(void 0), f === e.id && ce(), D("已删除，月度实际已同步扣减。");
											} catch (e) {
												D(String(e));
											}
										},
										children: "确认删除"
									}),
									/* @__PURE__ */ (0, b.jsx)("button", {
										type: "button",
										className: "secondary-button",
										onClick: () => re(void 0),
										children: "取消"
									})
								] }) : /* @__PURE__ */ (0, b.jsxs)(b.Fragment, { children: [/* @__PURE__ */ (0, b.jsx)("button", {
									type: "button",
									className: "secondary-button",
									onClick: () => {
										p(e.id), h(e.date), v(e.categoryId), ee(String(e.amount)), w(e.note), x(d(e.categoryId)), D(""), s?.(!0);
									},
									children: "修改"
								}), /* @__PURE__ */ (0, b.jsx)("button", {
									type: "button",
									className: "danger-button",
									onClick: () => re(e.id),
									children: "删除"
								})] })
							}) })
						] }, e.id)) })]
					})
				}) : /* @__PURE__ */ (0, b.jsxs)("p", {
					className: "review-caption",
					children: [
						"暂无带日期的",
						l,
						"。原月度金额保留，尚未计入任何周复盘。"
					]
				})]
			})
		]
	});
}
//#endregion
//#region app/review-ledger-sync.ts
var lt = {
	rent: "房租",
	parents: "家用",
	learning: "学习支出",
	travel: "旅游基金",
	partner: "伴侣基金",
	small: "小额支付",
	daily: "日常使用"
}, ut = (e) => Math.round(e * 100);
function dt(e, t, n) {
	if (n.type !== "week") throw Error("仅周复盘可回写账本，月度和季度报告不重复入账。");
	let r = t.filter((e) => e.date >= n.start && e.date <= n.end);
	if (r.filter((e) => e.flow === "income").reduce((e, t) => e + ut(t.amount), 0) !== ut(n.income)) throw Error("收入合计与到账明细不一致，请先在复盘中补齐工资和其他收入的日期。");
	let i = Object.fromEntries(Object.keys(lt).map((e) => [e, 0]));
	for (let t of r.filter((e) => e.flow === "expense")) {
		let n = e.find((e) => e.id === t.date.slice(0, 7))?.budgets.find((e) => e.id === t.categoryId);
		if (!n?.group || !(n.group in lt)) throw Error("本周日期支出有待归类项目，请先确认所属大类。");
		i[n.group] += ut(t.amount);
	}
	let a = Object.entries(lt).map(([e, t]) => ({
		group: e,
		name: t,
		amount: (ut(n.amounts[e]) - i[e]) / 100
	}));
	if (n.start.slice(0, 7) !== n.end.slice(0, 7) && a.some((e) => e.amount !== 0)) throw Error("本周跨自然月，未标日期的支出不能自动分摊。请先补齐日期明细，再同步保存。");
	if (!e.some((e) => e.id === n.end.slice(0, 7))) throw Error("请先在账本中添加复盘所属月份。");
	if (e.flatMap((e) => e.budgets).some((e) => e.reviewPeriod && e.reviewPeriod.id !== n.id && e.reviewPeriod.start <= n.end && e.reviewPeriod.end >= n.start)) throw Error("已有重叠期间的复盘汇总，请先核对，避免重复计账。");
	return e.map((e) => ({
		...e,
		budgets: [...e.budgets.filter((e) => e.reviewPeriod?.id !== n.id), ...e.id === n.end.slice(0, 7) ? a.filter((e) => e.amount !== 0).map((e) => ({
			id: `review-${n.id}-${e.group}`,
			name: `${e.name} · 周复盘汇总`,
			group: e.group,
			plan: 0,
			actual: e.amount,
			required: !1,
			fixed: !1,
			note: n.notes[e.group] || "与本周已标日期支出核对后的差额",
			reviewPeriod: {
				id: n.id,
				start: n.start,
				end: n.end
			}
		})) : []]
	}));
}
//#endregion
//#region app/goal-sync-model.ts
function ft(e) {
	let t = e.name.toLowerCase();
	return /旅游|旅行/.test(t) ? "travel" : /学习|教育|成长/.test(t) ? "learning" : /父母|爸妈|孝敬/.test(t) ? "parent" : /伴侣|情侣|共同/.test(t) ? "partner" : /应急|紧急/.test(t) ? "emergency" : "other";
}
function pt(e, t, n) {
	let r = ft(e), i = t.find((e) => ft(e) === r)?.id === e.id;
	if (r === "parent" && i) return {
		mode: "parents",
		accounts: [],
		label: "累计已给家用"
	};
	if (i && [
		"travel",
		"learning",
		"emergency"
	].includes(r)) {
		let e = n.filter((e) => {
			let t = `${e.name} ${e.type} ${e.purpose}`;
			return /投资|股票|A股|美股|港股|证券/i.test(t) ? !1 : /应急|紧急/.test(t) ? r === "emergency" : /旅游|旅行/.test(t) ? r === "travel" : /学习|教育|成长/.test(t) && r === "learning";
		});
		return e.length ? {
			mode: "accounts",
			accounts: e,
			label: e.map((e) => e.name).join("、")
		} : {
			mode: "manual",
			accounts: [],
			label: "未关联账户，保留原金额"
		};
	}
	return {
		mode: "manual",
		accounts: [],
		label: r === "partner" ? "手填当前金额" : "手填"
	};
}
function mt(e, t) {
	return e.map((n) => {
		let r = pt(n, e, t);
		if (r.mode !== "accounts") return n;
		let i = r.accounts.filter((e) => e.includedInPersonal !== !1).reduce((e, t) => e + Math.round(t.balance * 100), 0) / 100;
		if (!Number.isFinite(i) || i < 0) throw Error("目标关联账户余额无效，请先核对账户。");
		return {
			...n,
			current: i
		};
	});
}
function z(e, t, n) {
	return mt(e.map((r) => pt(r, e, n).mode === "manual" ? {
		...r,
		current: t.find((e) => e.id === r.id)?.current ?? r.current
	} : r), n);
}
function ht(e, t, n) {
	if (!/^week:\d{4}-\d{2}-\d{2}$/.test(t) || !Number.isFinite(n)) throw Error("家用复盘金额或周期无效。");
	let r = e.find((e) => ft(e) === "parent");
	if (!r) return e;
	let i = r.parentReviewAmounts?.[t] ?? 0, a = (Math.round(r.current * 100) + Math.round(n * 100) - Math.round(i * 100)) / 100;
	if (a < 0) throw Error("家用退款或修订超过已有累计金额，请核对父母累计金额。");
	return e.map((e) => e.id === r.id ? {
		...e,
		current: a,
		parentReviewAmounts: {
			...e.parentReviewAmounts,
			[t]: Math.round(n * 100) / 100
		}
	} : e);
}
function gt(e) {
	if (e !== void 0) {
		if (!e || typeof e != "object" || Array.isArray(e)) throw Error("父母家用累计记录无效。");
		return Object.fromEntries(Object.entries(e).map(([e, t]) => {
			if (!/^week:\d{4}-\d{2}-\d{2}$/.test(e) || typeof t != "number" || !Number.isFinite(t) || Math.abs(t) > 0xe8d4a51000) throw Error("父母家用累计记录无效。");
			return [e, Math.round(t * 100) / 100];
		}));
	}
}
//#endregion
//#region app/review-module-sync.ts
var _t = {
	income: "收入",
	spending: "支出",
	accounts: "账户余额",
	investments: "投资账户",
	projects: "大花费项目",
	bills: "账单与订阅",
	balance: "资产负债",
	goals: "目标余额"
}, B = (e) => e.reduce((e, t) => e + Math.round(t.amount * 100), 0) / 100;
function vt(e, t) {
	let n = e.focus ?? pe({
		projects: [],
		bills: [],
		assets: [],
		debts: [],
		holdings: 0
	}), r = {
		...e,
		...t,
		notes: {
			...e.notes,
			...t.notes
		},
		focus: t.focus ? {
			...n,
			...t.focus,
			checks: {
				...n.checks,
				...t.focus.checks
			},
			notes: {
				...n.notes,
				...t.focus.notes
			}
		} : e.focus
	};
	return r.balances = { ...e.balances }, t.accounts && (r.balances.cash = ve(t.accounts)), t.investments && (r.balances.investments = M(t.investments), r.focus &&= {
		...r.focus,
		holdings: r.balances.investments
	}), t.focus?.assets && (r.balances.otherAssets = B(t.focus.assets)), t.focus?.debts && (r.balances.debt = B(t.focus.debts)), r;
}
function yt(e, t) {
	let n = {
		...De(e.type, e.end, e.monthStartDay),
		start: e.start,
		income: 0,
		amounts: Object.fromEntries(Object.keys(e.amounts).map((e) => [e, 0])),
		balances: {
			cash: 0,
			investments: 0,
			otherAssets: 0,
			debt: 0
		}
	}, r;
	if (t === "income") r = {
		income: e.income,
		...e.incomeLedger ? { incomeLedger: e.incomeLedger } : {}
	};
	else if (t === "spending") r = {
		amounts: e.amounts,
		notes: e.notes
	};
	else if (t === "accounts") {
		if (!e.accounts) throw Error("请带入账户余额明细。");
		r = { accounts: e.accounts };
	} else if (t === "investments") {
		if (!e.investments) throw Error("请带入投资账户明细。");
		r = { investments: e.investments };
	} else if (t === "goals") {
		if (!e.goals) throw Error("请带入目标余额明细。");
		r = { goals: e.goals };
	} else {
		if (!e.focus) throw Error("请带入关键事项明细。");
		let n = pe({
			projects: [],
			bills: [],
			assets: [],
			debts: [],
			holdings: 0
		});
		t === "projects" && (n.projects = e.focus.projects), t === "bills" && (n.bills = e.focus.bills), t === "balance" && (n.assets = e.focus.assets, n.debts = e.focus.debts), n.checks[t] = !0, n.notes[t] = e.focus.notes[t], r = { focus: n };
	}
	let i = ke(vt(n, r));
	if (t === "income") return {
		income: i.income,
		...i.incomeLedger ? { incomeLedger: i.incomeLedger } : {}
	};
	if (t === "spending") return {
		amounts: i.amounts,
		notes: i.notes
	};
	if (t === "accounts") return { accounts: i.accounts };
	if (t === "investments") return { investments: i.investments };
	if (t === "goals") return { goals: i.goals };
	let a = i.focus;
	return { focus: {
		...t === "balance" ? {
			assets: a.assets,
			debts: a.debts
		} : t === "projects" ? { projects: a.projects } : { bills: a.bills },
		notes: { [t]: a.notes[t] },
		checks: { [t]: !0 }
	} };
}
function bt(e, t) {
	let n = e.datedEntries ?? [], r = {
		accounts: e.accounts,
		investments: [
			e.holdings,
			e.fxUsd,
			e.fxHkd
		],
		projects: e.fundBuckets,
		bills: e.reminders,
		balance: [e.balanceAssets, e.liabilities],
		goals: [e.goals, e.accounts],
		income: [e.monthlyRecords.map(({ id: e, salary: t, otherIncome: n }) => ({
			id: e,
			salary: t,
			otherIncome: n
		})), n.filter((e) => e.flow === "income")],
		spending: [e.monthlyRecords.map(({ id: e, budgets: t }) => ({
			id: e,
			budgets: t
		})), n.filter((e) => e.flow === "expense")]
	};
	return JSON.stringify(r[t]);
}
function xt(e, t, n) {
	let r = e;
	for (let i of Object.keys(_t)) {
		let a = [...t].reverse().find((t) => t.reviewId === `${e.type}:${e.start}` && t.published && (!t.module || t.module === i));
		a?.module === i && a.asOf === e.end && a.moduleDraft && bt(a.after, i) === n[i] && (r = vt(r, a.moduleDraft));
	}
	return r;
}
function St(e, t, n, r, i = (/* @__PURE__ */ new Date()).toISOString(), a = Ce()) {
	if (!Object.hasOwn(_t, n)) throw Error("未知复盘模块。");
	let o = [
		e.dashboardAsOf ?? "",
		...(e.financeReviews ?? []).filter((e) => e.type === "week").map((e) => e.end),
		...(e.reviewUpdates ?? []).filter((e) => e.published).map((e) => e.asOf)
	].sort().at(-1);
	if (t.type !== "week" || t.end < o || t.end > a || Ee("week", t.end).start !== t.start) throw Error("仅当前最新周复盘可更新模块；历史和未来期间请保存历史报告。");
	if (r !== bt(e, n)) throw Error(`${_t[n]}已在其他位置修改，请重新带入并核对后保存。`);
	let s = yt(n === "goals" && t.goals ? {
		...t,
		goals: z(e.goals, t.goals, e.accounts)
	} : t, n), c = (e, t) => {
		if (e.length !== t.length || e.some((e) => !t.some((t) => e.id === t.id))) throw Error(`${_t[n]}清单已变化，请重新带入当前模块。`);
	}, l = (e, t) => (c(e, t), e.map((e) => ({
		...e,
		...t.find((t) => t.id === e.id)
	}))), u = { ...e };
	if (n === "accounts") c(e.accounts, s.accounts), u.accounts = e.accounts.map((e) => {
		let t = s.accounts.find((t) => t.id === e.id);
		return {
			...e,
			balance: t.balance,
			includedInPersonal: t.included
		};
	});
	else if (n === "investments") u.holdings = l(e.holdings, s.investments.holdings), u.fxUsd = s.investments.fxUsd, u.fxHkd = s.investments.fxHkd;
	else if (n === "projects") u.fundBuckets = l(e.fundBuckets, s.focus.projects);
	else if (n === "bills") u.reminders = l(e.reminders, s.focus.bills);
	else if (n === "balance") u.balanceAssets = l(e.balanceAssets, s.focus.assets), u.liabilities = l(e.liabilities, s.focus.debts);
	else if (n === "goals") u.goals = z(e.goals, l(e.goals, s.goals), e.accounts);
	else {
		let r = (e.datedEntries ?? []).filter((e) => e.flow === "income" && e.date >= t.start && e.date <= t.end).reduce((e, t) => e + Math.round(t.amount * 100), 0) / 100;
		if (n === "income") {
			if (r !== s.income) throw Error("收入合计与到账明细不一致，请先保存带日期的工资和其他收入，或带入本期收入。");
		} else {
			let n = {
				...De("week", t.end),
				income: r,
				amounts: s.amounts,
				notes: s.notes,
				balances: {
					cash: 0,
					investments: 0,
					otherAssets: 0,
					debt: 0
				}
			};
			u.monthlyRecords = dt(e.monthlyRecords, e.datedEntries ?? [], ke(n)), u.goals = ht(e.goals, `week:${t.start}`, s.amounts.parents);
		}
		u.selectedMonth = t.end.slice(0, 7);
	}
	(n === "accounts" || n === "spending" || n === "goals") && (u.goals = mt(u.goals, u.accounts));
	let d = (e) => {
		let t = { ...e };
		return delete t.reviewUpdates, structuredClone(t);
	}, f = {
		id: `${i}:${(e.reviewUpdates ?? []).length}`,
		reviewId: `${t.type}:${t.start}`,
		asOf: t.end,
		savedAt: i,
		published: !0,
		module: n,
		moduleDraft: s,
		before: d(e),
		after: d(u)
	};
	return u = {
		...u,
		reviewUpdates: [...e.reviewUpdates ?? [], f]
	}, {
		data: u,
		patch: s
	};
}
//#endregion
//#region app/finance-review-panel.tsx
function Ct(e, t, n) {
	let r = URL.createObjectURL(new Blob([t], { type: n })), i = document.createElement("a");
	i.href = r, i.download = e, i.click(), window.setTimeout(() => URL.revokeObjectURL(r), 1e3);
}
var wt = (e) => e.trim() === "" ? null : Number(e), Tt = (e) => e === null ? "无基准" : `${e > 0 ? "+" : ""}${P(e)}`;
function Et({ records: e, plan: t, accounts: n, investments: r, goals: i, dashboardAsOf: a, sourceSignature: o, moduleSignatures: s, moduleUpdates: c, onSaveModule: l, focusSource: u, ledgerMonths: d, datedEntries: f, onSaveIncome: p, onDeleteIncome: m, onOpenModule: h, onChange: g }) {
	let v = Ge();
	function y(t, a = Ce(), o = 10) {
		let l = e.filter((e) => e.accounts && e.end <= a).sort((e, t) => t.end.localeCompare(e.end))[0], d = {
			...De(t, a, o),
			focus: pe(u),
			investments: structuredClone(r),
			goals: i.map((e) => ({ ...e }))
		};
		return d.balances = {
			...d.balances,
			investments: M(r),
			otherAssets: u.assets.reduce((e, t) => e + t.amount, 0),
			debt: u.debts.reduce((e, t) => e + t.amount, 0)
		}, xt(ye(d, n, l?.accounts), c, s);
	}
	let [x, S] = (0, _.useState)(() => y()), [ee, C] = (0, _.useState)(!0), [w, T] = (0, _.useState)(!1), [te, E] = (0, _.useState)(!1), [D, ne] = (0, _.useState)(""), [re, ie] = (0, _.useState)(!1), [O, ae] = (0, _.useState)(!1), [oe, k] = (0, _.useState)(""), [A, se] = (0, _.useState)(!1), [j, de] = (0, _.useState)(""), [fe, ge] = (0, _.useState)(0), [_e, N] = (0, _.useState)(!1), [be, xe] = (0, _.useState)(!0), [Se, F] = (0, _.useState)(!1), [we, Te] = (0, _.useState)(o), [I, Oe] = (0, _.useState)(s), [Me, Fe] = (0, _.useState)(e.length ? "report" : "entry"), [Le, Re] = (0, _.useState)(e[0]?.id ?? ""), [Ke, qe] = (0, _.useState)(""), [Je, Ye] = (0, _.useState)(t.mode), Xe = (0, _.useRef)(null), Ze = (0, _.useRef)(null), Qe = (0, _.useRef)(null), $e = (0, _.useRef)(null), [rt, it] = (0, _.useState)(null), [at, ot] = (0, _.useState)(null), L = e.find((e) => e.id === Le) ?? e[0], R = L ? ze(L, e) : null, st = c.findLastIndex((e) => e.reviewId === L?.id && !e.module), lt = c.some((e, t) => t > st && e.reviewId === L?.id && !!e.module), ut = [
		a ?? "",
		Ne(e)?.end ?? "",
		...c.filter((e) => e.published).map((e) => e.asOf)
	].sort().at(-1), dt = x.type === "week" && x.end <= v && x.end >= ut, ft = dt && be, mt = dt ? i.map((e) => pt(e, i, n).mode === "manual" ? x.goals?.find((t) => t.id === e.id) ?? e : e) : x.goals, z = ee && x.end === v, ht = et(d, f, x.start, x.end), gt = JSON.stringify(ht), B = !!x.ledger || w, yt = ht.rows.filter((e) => e.flow === "income"), bt = JSON.stringify(yt), St = B || re || !!x.incomeLedger, Et = d.filter((e) => e.id >= x.start.slice(0, 7) && e.id <= x.end.slice(0, 7)), Ot = Et.find((e) => e.id === j) ?? Et.at(-1), kt = Ee("month", x.end, 10), At = et(d, f, kt.start, kt.end), jt = Ie(At.rows, kt.start, kt.end);
	re && !w && oe !== bt && (k(bt), ae(!1), S((e) => nt(e, yt))), w && gt !== D && (ne(gt), E(!1), ht.unassigned.length || S((e) => tt(e, ht.rows))), z && (!x.focus || !me(x.focus, u)) && S((e) => ({
		...e,
		focus: he(e.focus, u)
	}));
	let Mt = A || x.income !== null || Object.values(x.amounts).some((e) => e !== null) || Object.values(x.balances).some((e) => e !== null) || !!x.summary || Object.values(x.notes).some(Boolean) || Object.values(x.focus?.checks ?? {}).some(Boolean) || Object.values(x.focus?.notes ?? {}).some(Boolean);
	(0, _.useEffect)(() => {
		at ? Ze.current?.showModal() : Ze.current?.close();
	}, [at]), (0, _.useEffect)(() => {
		rt ? Qe.current?.showModal() : Qe.current?.close();
	}, [rt]);
	function Nt(e, t) {
		let n = e instanceof Error ? e.message : "操作失败，请重试。";
		qe(n), $e.current = t ?? null, it({
			title: "未保存，请检查",
			message: n,
			hasField: !!t
		});
	}
	function Pt() {
		let e = $e.current;
		if ($e.current = null, Qe.current?.close(), it(null), e?.isConnected) {
			for (let t = e.parentElement; t; t = t.parentElement) t instanceof HTMLDetailsElement && (t.open = !0);
			e.scrollIntoView({ block: "center" }), e.focus({ preventScroll: !0 });
		}
	}
	function Ft(e) {
		try {
			e();
		} catch (e) {
			Nt(e);
		}
	}
	function It(e, t, n) {
		e ? ot({
			message: t,
			action: n
		}) : Ft(n);
	}
	function Lt() {
		ie(!1), ae(!1), se(!1), de(""), ge((e) => e + 1);
	}
	function Rt(e = x.type, t = x.end, n = e === x.type && e === "month" ? x.monthStartDay ?? 1 : 10) {
		It(Mt, "切换会清空当前未保存的输入，是否继续？", () => {
			S(y(e, t, n)), Te(o), F(!1), Oe(s), Lt(), T(!1), E(!1), C(t === v), N(!1), Fe("entry"), qe("");
		});
	}
	function zt() {
		try {
			if (A) throw Error("收入录入尚未保存，请先点击保存收入或取消修改。");
			if (re && !w && !O) throw Error("请先核对本期工资和其他收入。");
			if (w && (ht.unassigned.length || !te)) throw Error("请先确认日期收支分类完整，并核对本期全部收支。");
			if (ft && we !== o) throw Error("当前模块已变化，请重新带入当前模块并核对后保存。");
			let n = [...x.accounts && !_e ? ["账户余额"] : [], ...ft ? [
				!Se && "投资账户",
				!x.focus?.checks.projects && "大花费项目",
				!x.focus?.checks.bills && "账单与订阅",
				!x.focus?.checks.balance && "资产负债"
			].filter(Boolean) : []];
			if (n.length) throw Error(`以下模块尚未确认：${n.join("、")}。可分别点击该模块的“保存并更新”，或勾选核对后全部保存。`);
			let r = x.type === "month" ? x.budget ?? {
				mode: Je,
				amounts: Object.fromEntries(t.rows.map((e) => [e.id, e[Je]]))
			} : void 0, i = ke({
				...x,
				goals: mt,
				budget: r,
				savedAt: (/* @__PURE__ */ new Date()).toISOString()
			});
			It(e.some((e) => e.id === i.id), "该周期已有记录，是否用本次数据更新？", () => {
				let t = g(Ae(e, i), {
					record: i,
					publish: ft,
					sourceSignature: we
				});
				Re(i.id), Fe("report"), S(structuredClone(t.record ?? i)), ft && Te(t.sourceSignature), ft && t.moduleSignatures && Oe(t.moduleSignatures), Lt(), T(!1), E(!1), C(!1);
				let n = ft ? "本期收支、账户、投资及其他模块已更新，更新前后的历史已保存到本机。跨电脑使用前请确认云端保存成功。" : "历史报告已保存到本机，当前看板未覆盖。跨电脑使用前请确认云端保存成功。";
				qe(n), it({
					title: ft ? "保存并更新完毕" : "历史报告保存完毕",
					message: n
				});
			});
		} catch (e) {
			Nt(e);
		}
	}
	function Bt(e) {
		try {
			if (!dt) throw Error("仅最新周复盘可以更新模块；历史或未来期间请保存历史报告。");
			if (e === "income" && A) throw Error("收入明细尚未保存，请先点击保存收入。");
			let t = l({
				...x,
				goals: mt
			}, e, e === "income" ? s.income : I[e]);
			S((e) => vt(e, t.patch)), C(!1), Oe((n) => ({
				...n,
				[e]: t.moduleSignature,
				...t.goalsSignature && n.goals === s.goals ? { goals: t.goalsSignature } : {}
			})), we === o && Te(t.sourceSignature), e === "accounts" && N(!0), e === "investments" && F(!0), e === "income" && ae(!0);
			let n = `${_t[e]}已写回对应模块并保存到本机，更新前后历史已保留。其他未保存输入保持不变；跨电脑使用请确认云同步成功。`;
			qe(n), it({
				title: "保存并更新完毕",
				message: n
			});
		} catch (e) {
			Nt(e);
		}
	}
	function Vt(e) {
		let t = e.currentTarget.dataset.reviewSave, n = e.currentTarget.closest("[data-review-module]")?.querySelector("input:invalid:not([type=\"checkbox\"]),select:invalid,textarea:invalid");
		if (n) {
			Nt(/* @__PURE__ */ Error(`${n.getAttribute("aria-label") || n.labels?.[0]?.textContent || _t[t]}：${n.validationMessage}`), n);
			return;
		}
		Bt(t);
	}
	function Ht(e) {
		return x.type === "week" ? /* @__PURE__ */ (0, b.jsxs)("button", {
			type: "button",
			className: "primary-button",
			disabled: !dt,
			"data-review-save": e,
			onClick: Vt,
			children: ["保存并更新", _t[e]]
		}) : null;
	}
	async function Ut(t) {
		try {
			let n = je(JSON.parse(await t.text())), r = n.filter((t) => e.some((e) => e.id === t.id));
			It(r.length > 0, `有 ${r.length} 个相同周期，是否更新这些记录？`, () => {
				g(n.reduce(Ae, e)), Re(n[0]?.id ?? Le), Fe("report"), qe(`已导入 ${n.length} 条复盘；跨电脑使用前请保存完整版本到云端。`);
			});
		} catch (e) {
			qe(e instanceof Error ? e.message : "导入失败");
		} finally {
			Xe.current && (Xe.current.value = "");
		}
	}
	function Wt() {
		try {
			if (x.type === "week") return;
			let t = Ve(e, x.type, x.end, x.monthStartDay ?? 1);
			It(Mt, "汇总将替换当前输入，是否继续？", () => {
				S(t), Lt(), T(!1), E(!1), C(!1), N(!1), qe("已汇总连续覆盖的记录，请核对后保存。");
			});
		} catch (e) {
			qe(e instanceof Error ? e.message : "汇总失败");
		}
	}
	function Gt(e, t) {
		let n = (x.accounts ?? []).map((n) => n.id === e ? {
			...n,
			...t
		} : n);
		S({
			...x,
			accounts: n,
			balances: {
				...x.balances,
				cash: ve(n)
			}
		}), N(!1);
	}
	function Kt() {
		It(!!x.accounts, "重新带入会替换复盘中的账户余额与说明，是否继续？", () => {
			S(ye(x, n, x.accounts ?? y(x.type, x.end).accounts)), N(!1);
		});
	}
	function qt() {
		let e = y(x.type, x.end, x.monthStartDay ?? 1);
		e.accounts = e.accounts?.map((e) => ({
			...e,
			balance: null
		})), e.balances.cash = null, Ct("finance-review-template.json", JSON.stringify(e, null, 2), "application/json");
	}
	function Jt() {
		It(!z || Object.values(x.focus?.checks ?? {}).some(Boolean), "刷新会带入当前模块数据并重新核对，变化说明保留。历史复盘请确认这些数据属于该截至日。", () => {
			let e = pe(u);
			e.notes = { ...x.focus?.notes }, x.investments && (e.holdings = M(x.investments));
			let t = (e) => e.reduce((e, t) => e + Math.round(t.amount * 100), 0) / 100;
			C(!1), S({
				...x,
				focus: e,
				balances: {
					...x.balances,
					otherAssets: t(e.assets),
					debt: t(e.debts)
				}
			});
		});
	}
	function V() {
		It(!0, "将重新带入当前账户、投资、项目、账单、资产负债及目标余额，并重置核对。已填收支不变，是否继续？", () => {
			let e = y(x.type, x.end, x.monthStartDay ?? 1);
			S({
				...x,
				accounts: e.accounts,
				investments: e.investments,
				goals: e.goals,
				focus: e.focus,
				balances: e.balances
			}), Te(o), C(!1), N(!1), F(!1), Oe(s);
		});
	}
	function Yt(e) {
		let t = M(e);
		F(!1), C(!1), S({
			...x,
			investments: e,
			balances: {
				...x.balances,
				investments: t
			},
			focus: x.focus ? {
				...x.focus,
				holdings: t,
				checks: {
					...x.focus.checks,
					balance: !1
				}
			} : void 0
		});
	}
	function Xt() {
		if (!x.focus) return;
		let e = x.focus;
		It(x.balances.otherAssets !== null || x.balances.debt !== null, "将以快照中的补录资产、负债合计替换这两项本期余额，现金和证券账户总资产不变。", () => {
			let t = (e) => e.reduce((e, t) => e + Math.round(t.amount * 100), 0) / 100;
			S({
				...x,
				balances: {
					...x.balances,
					otherAssets: t(e.assets),
					debt: t(e.debts)
				}
			});
		});
	}
	function Zt() {
		if (d.some((e) => e.budgets.some((e) => e.reviewPeriod && e.actual !== 0 && e.reviewPeriod.start <= x.end && e.reviewPeriod.end >= x.start))) {
			qe("本期已有未标具体日期的周复盘汇总。请修订原复盘或补齐日期后核对，不能用仅有日期的明细覆盖这些金额。");
			return;
		}
		It(x.income !== null || ce.some((e) => e.flow === "expense" && x.amounts[e.id] !== null), "将替换本期收入和消费金额，投资与应急划拨、事项说明保持不变。是否继续？", () => {
			S(tt(x, ht.rows)), ie(!1), T(!0), ne(gt), E(!1), qe("已按日期带入收支，请核对本期完整性后保存。");
		});
	}
	function Qt() {
		It(x.income !== null, "以本期带日期的工资和其他到账替换收入合计，支出、划拨及说明不变。是否继续？", () => {
			S(nt(x, yt)), ie(!0), k(bt), ae(!1);
		});
	}
	function $t(e, t, n) {
		p(e, t, n), !B && (re || !x.incomeLedger && (x.income === null || x.income === 0)) && (ie(!0), k(""), ae(!1)), qe("收入已保存到账本。未联动的手填金额或历史快照保留；需更新时请带入本期收入。");
	}
	return /* @__PURE__ */ (0, b.jsxs)("div", {
		className: "finance-review",
		children: [
			/* @__PURE__ */ (0, b.jsxs)("dialog", {
				ref: Qe,
				className: "review-confirm",
				"aria-labelledby": "review-result-title",
				"aria-describedby": "review-result-message",
				onCancel: (e) => {
					e.preventDefault(), Pt();
				},
				children: [
					/* @__PURE__ */ (0, b.jsx)("h3", {
						id: "review-result-title",
						children: rt?.title
					}),
					/* @__PURE__ */ (0, b.jsx)("p", {
						id: "review-result-message",
						children: rt?.message
					}),
					/* @__PURE__ */ (0, b.jsx)("div", {
						className: "data-actions",
						children: /* @__PURE__ */ (0, b.jsx)("button", {
							type: "button",
							className: "primary-button",
							autoFocus: !0,
							onClick: Pt,
							children: rt?.hasField ? "前往检查" : "知道了"
						})
					})
				]
			}),
			/* @__PURE__ */ (0, b.jsxs)("dialog", {
				ref: Ze,
				className: "review-confirm",
				"aria-labelledby": "review-confirm-title",
				onCancel: (e) => {
					e.preventDefault(), ot(null);
				},
				children: [
					/* @__PURE__ */ (0, b.jsx)("h3", {
						id: "review-confirm-title",
						children: "确认更新"
					}),
					/* @__PURE__ */ (0, b.jsx)("p", { children: at?.message }),
					/* @__PURE__ */ (0, b.jsxs)("div", {
						className: "data-actions",
						children: [/* @__PURE__ */ (0, b.jsx)("button", {
							type: "button",
							className: "secondary-button",
							autoFocus: !0,
							onClick: () => ot(null),
							children: "取消"
						}), /* @__PURE__ */ (0, b.jsx)("button", {
							type: "button",
							className: "primary-button",
							onClick: () => {
								let e = at?.action;
								ot(null), e && Ft(e);
							},
							children: "确认"
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, b.jsxs)("div", {
				className: "review-toolbar",
				children: [/* @__PURE__ */ (0, b.jsxs)("div", {
					className: "period-tabs",
					"aria-label": "复盘视图",
					children: [/* @__PURE__ */ (0, b.jsx)("button", {
						type: "button",
						className: Me === "entry" ? "active" : "",
						"aria-pressed": Me === "entry",
						onClick: () => Fe("entry"),
						children: "更新数据"
					}), /* @__PURE__ */ (0, b.jsx)("button", {
						type: "button",
						className: Me === "report" ? "active" : "",
						"aria-pressed": Me === "report",
						onClick: () => Fe("report"),
						children: "前后对比"
					})]
				}), /* @__PURE__ */ (0, b.jsxs)("div", {
					className: "data-actions",
					children: [
						/* @__PURE__ */ (0, b.jsx)("button", {
							className: "secondary-button",
							type: "button",
							onClick: qt,
							children: "下载模板"
						}),
						/* @__PURE__ */ (0, b.jsx)("button", {
							className: "secondary-button",
							type: "button",
							onClick: () => Xe.current?.click(),
							children: "导入复盘"
						}),
						/* @__PURE__ */ (0, b.jsx)("button", {
							className: "secondary-button",
							type: "button",
							disabled: !e.length,
							onClick: () => Ct("finance-reviews.json", JSON.stringify({
								app: "personal-finance-review",
								version: 1,
								records: e
							}, null, 2), "application/json"),
							children: "导出记录"
						}),
						/* @__PURE__ */ (0, b.jsx)("input", {
							className: "visually-hidden",
							ref: Xe,
							type: "file",
							accept: ".json,application/json",
							"aria-label": "导入周期复盘文件",
							onChange: (e) => {
								let t = e.target.files?.[0];
								t && Ut(t);
							}
						})
					]
				})]
			}),
			Ke && /* @__PURE__ */ (0, b.jsx)("p", {
				className: "review-status",
				role: "status",
				children: Ke
			}),
			Me === "entry" && /* @__PURE__ */ (0, b.jsxs)("form", {
				noValidate: !0,
				onSubmit: (e) => {
					e.preventDefault();
					let t = e.currentTarget.querySelector("input:invalid,select:invalid,textarea:invalid");
					if (t) {
						let e = t.getAttribute("aria-label") || t.labels?.[0]?.textContent?.trim() || "复盘字段";
						Nt(/* @__PURE__ */ Error(`${e}：${t.type === "checkbox" ? "请勾选确认。" : t.validationMessage}`), t);
						return;
					}
					zt();
				},
				children: [
					/* @__PURE__ */ (0, b.jsxs)("div", {
						className: "review-toolbar",
						children: [/* @__PURE__ */ (0, b.jsxs)("span", { children: ["当前看板截至：", a || "尚未整期更新"] }), /* @__PURE__ */ (0, b.jsx)("button", {
							type: "button",
							className: "secondary-button",
							onClick: V,
							children: "重新带入当前模块"
						})]
					}),
					we !== o && /* @__PURE__ */ (0, b.jsx)("p", {
						role: "alert",
						children: "当前模块已变化，更新看板前须重新带入并核对。"
					}),
					/* @__PURE__ */ (0, b.jsxs)("div", {
						className: "review-fields",
						children: [
							/* @__PURE__ */ (0, b.jsxs)("label", {
								className: "field",
								children: [/* @__PURE__ */ (0, b.jsx)("span", { children: "复盘周期" }), /* @__PURE__ */ (0, b.jsx)("select", {
									value: x.type,
									onChange: (e) => Rt(e.target.value),
									children: Object.entries(le).map(([e, t]) => /* @__PURE__ */ (0, b.jsx)("option", {
										value: e,
										children: t
									}, e))
								})]
							}),
							/* @__PURE__ */ (0, b.jsxs)("label", {
								className: "field",
								children: [/* @__PURE__ */ (0, b.jsx)("span", { children: "数据截至" }), /* @__PURE__ */ (0, b.jsx)("input", {
									type: "date",
									required: !0,
									value: x.end,
									onInput: (e) => {
										e.currentTarget.validity.valid && e.currentTarget.value && e.currentTarget.value !== x.end && Rt(x.type, e.currentTarget.value);
									}
								})]
							}),
							/* @__PURE__ */ (0, b.jsxs)("label", {
								className: "field",
								children: [/* @__PURE__ */ (0, b.jsx)("span", { children: "本期外部收入" }), /* @__PURE__ */ (0, b.jsx)("input", {
									"aria-label": "本期外部收入",
									type: "number",
									step: "0.01",
									required: !0,
									readOnly: St,
									value: x.income ?? "",
									onChange: (e) => S({
										...x,
										income: wt(e.target.value)
									})
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, b.jsxs)("p", {
						className: "review-caption",
						children: [
							x.start,
							" 至 ",
							x.end,
							" · 人民币 · 填该日期范围内的发生额，不填跨期累计数。没有发生填 0，空白保留为待补。"
						]
					}),
					x.type === "month" && /* @__PURE__ */ (0, b.jsxs)("label", {
						className: "field",
						children: [/* @__PURE__ */ (0, b.jsx)("span", { children: "月度起算日" }), /* @__PURE__ */ (0, b.jsxs)("select", {
							"aria-label": "月度起算日",
							value: x.monthStartDay ?? 1,
							onChange: (e) => Rt(x.type, x.end, Number(e.target.value)),
							children: [/* @__PURE__ */ (0, b.jsx)("option", {
								value: "10",
								children: "每月10日至下月9日"
							}), /* @__PURE__ */ (0, b.jsx)("option", {
								value: "1",
								children: "自然月（保留旧口径）"
							})]
						})]
					}),
					/* @__PURE__ */ (0, b.jsxs)("section", {
						className: "review-income",
						"aria-label": "复盘收入录入",
						"data-review-module": "income",
						children: [
							/* @__PURE__ */ (0, b.jsxs)("div", {
								className: "review-toolbar",
								children: [/* @__PURE__ */ (0, b.jsx)("h3", { children: "本期收入 · 工资与其他到账" }), /* @__PURE__ */ (0, b.jsxs)("span", {
									className: "review-caption",
									children: [
										x.start,
										" 至 ",
										x.end
									]
								})]
							}),
							Et.length > 1 && /* @__PURE__ */ (0, b.jsxs)("label", {
								className: "field",
								children: [/* @__PURE__ */ (0, b.jsx)("span", { children: "到账月份" }), /* @__PURE__ */ (0, b.jsx)("select", {
									"aria-label": "复盘收入月份",
									value: Ot?.id ?? "",
									onChange: (e) => {
										let t = e.target.value;
										It(A, "切换月份会放弃尚未保存的收入输入，是否继续？", () => {
											de(t), se(!1);
										});
									},
									children: Et.map((e) => /* @__PURE__ */ (0, b.jsx)("option", {
										value: e.id,
										children: e.id
									}, e.id))
								})]
							}),
							Ot ? /* @__PURE__ */ (0, b.jsx)(ct, {
								embedded: !0,
								range: {
									start: x.start,
									end: x.end
								},
								flow: "income",
								month: Ot,
								entries: f,
								onSave: $t,
								onDelete: m,
								onDirtyChange: se
							}, `${x.start}:${x.end}:${Ot.id}:${fe}`) : /* @__PURE__ */ (0, b.jsxs)("p", { children: ["该日期尚无月份账本。", /* @__PURE__ */ (0, b.jsx)("button", {
								type: "button",
								className: "secondary-button",
								onClick: () => h("income"),
								children: "前往收入添加月份"
							})] }),
							/* @__PURE__ */ (0, b.jsxs)("div", {
								className: "review-toolbar",
								children: [/* @__PURE__ */ (0, b.jsxs)("span", {
									className: "review-caption",
									children: [
										"账本已登记：工资 ",
										P(yt.filter((e) => e.categoryId === "salary").reduce((e, t) => e + Math.round(t.amount * 100), 0) / 100),
										" · 其他收入 ",
										P(yt.filter((e) => e.categoryId === "otherIncome").reduce((e, t) => e + Math.round(t.amount * 100), 0) / 100)
									]
								}), /* @__PURE__ */ (0, b.jsxs)("div", {
									className: "data-actions",
									children: [/* @__PURE__ */ (0, b.jsx)("button", {
										type: "button",
										className: "secondary-button",
										disabled: B || re,
										onClick: Qt,
										children: "带入本期收入"
									}), !B && (re || x.incomeLedger) && /* @__PURE__ */ (0, b.jsx)("button", {
										type: "button",
										className: "secondary-button",
										onClick: () => {
											ie(!1), ae(!1), S({
												...x,
												incomeLedger: void 0
											});
										},
										children: "收入改为手填"
									})]
								})]
							}),
							re && !w && /* @__PURE__ */ (0, b.jsxs)("label", {
								className: "review-ledger-confirm",
								children: [/* @__PURE__ */ (0, b.jsx)("input", {
									type: "checkbox",
									required: !0,
									checked: O,
									onChange: (e) => ae(e.target.checked)
								}), "已核对本期工资和其他收入，未到账不算收入"]
							}),
							/* @__PURE__ */ (0, b.jsx)("div", {
								className: "data-actions",
								children: Ht("income")
							})
						]
					}),
					x.type !== "quarter" && /* @__PURE__ */ (0, b.jsxs)("section", {
						className: "review-cycle",
						"aria-label": "十号账期累计",
						children: [
							/* @__PURE__ */ (0, b.jsx)("h3", { children: "10号账期 · 每周收支" }),
							/* @__PURE__ */ (0, b.jsxs)("p", { children: [
								kt.start,
								" 至 ",
								kt.limit,
								" · 截至 ",
								kt.end
							] }),
							/* @__PURE__ */ (0, b.jsxs)("p", { children: [
								"已登记收入 ",
								P(At.income),
								" · 支出 ",
								P(At.spending),
								" · 结余 ",
								P(At.income - At.spending)
							] }),
							/* @__PURE__ */ (0, b.jsx)("div", {
								className: "table-wrap",
								children: /* @__PURE__ */ (0, b.jsxs)("table", {
									className: "review-table",
									children: [/* @__PURE__ */ (0, b.jsx)("thead", { children: /* @__PURE__ */ (0, b.jsxs)("tr", { children: [
										/* @__PURE__ */ (0, b.jsx)("th", { children: "周内日期" }),
										/* @__PURE__ */ (0, b.jsx)("th", { children: "工资" }),
										/* @__PURE__ */ (0, b.jsx)("th", { children: "其他收入" }),
										/* @__PURE__ */ (0, b.jsx)("th", { children: "支出" }),
										/* @__PURE__ */ (0, b.jsx)("th", { children: "结余" }),
										/* @__PURE__ */ (0, b.jsx)("th", { children: "结余较前段" })
									] }) }), /* @__PURE__ */ (0, b.jsx)("tbody", { children: jt.map((e) => /* @__PURE__ */ (0, b.jsxs)("tr", { children: [
										/* @__PURE__ */ (0, b.jsxs)("th", { children: [
											e.start.slice(5),
											" 至 ",
											e.end.slice(5),
											/* @__PURE__ */ (0, b.jsxs)("small", { children: [
												e.days,
												" 天 · ",
												e.count,
												" 笔"
											] })
										] }),
										/* @__PURE__ */ (0, b.jsx)("td", { children: e.count ? P(e.salary) : "未登记" }),
										/* @__PURE__ */ (0, b.jsx)("td", { children: e.count ? P(e.other) : "未登记" }),
										/* @__PURE__ */ (0, b.jsx)("td", { children: e.count ? P(e.spending) : "未登记" }),
										/* @__PURE__ */ (0, b.jsx)("td", { children: e.count ? P(e.surplus) : "未登记" }),
										/* @__PURE__ */ (0, b.jsx)("td", { children: e.surplusDelta === null ? "无同天数基准" : Tt(e.surplusDelta) })
									] }, e.start)) })]
								})
							}),
							/* @__PURE__ */ (0, b.jsxs)("p", {
								className: "review-caption",
								children: [
									"口径：日期账本，不含手填复盘发生额。未登记不代表没有发生；相关月份还有 ",
									At.undated.length,
									" 项未标日期金额。账期首尾按实际天数列示，不把跨账期周重复相加。",
									x.start < kt.start ? "本次复盘跨账期，本表仅列所示账期内的数据。" : ""
								]
							})
						]
					}),
					/* @__PURE__ */ (0, b.jsxs)("section", {
						className: "review-ledger",
						"aria-label": "本期日期收支",
						children: [
							/* @__PURE__ */ (0, b.jsxs)("div", {
								className: "review-toolbar",
								children: [/* @__PURE__ */ (0, b.jsx)("h3", { children: "本期日期收支" }), /* @__PURE__ */ (0, b.jsxs)("div", {
									className: "data-actions",
									children: [/* @__PURE__ */ (0, b.jsx)("button", {
										type: "button",
										className: "secondary-button",
										onClick: () => h("income"),
										children: "前往收入"
									}), /* @__PURE__ */ (0, b.jsx)("button", {
										type: "button",
										className: "secondary-button",
										onClick: () => h("spending"),
										children: "前往支出"
									})]
								})]
							}),
							/* @__PURE__ */ (0, b.jsxs)("p", { children: [
								"账本已标日期 ",
								ht.rows.length,
								" 笔 · 收入 ",
								P(ht.income),
								" · 净支出 ",
								P(ht.spending)
							] }),
							ht.unassigned.length > 0 && /* @__PURE__ */ (0, b.jsxs)("p", {
								role: "alert",
								className: "review-status",
								children: [ht.unassigned.length, " 笔支出分类归属待确认，暂不能带入。"]
							}),
							ht.undated.length > 0 && /* @__PURE__ */ (0, b.jsxs)("details", { children: [
								/* @__PURE__ */ (0, b.jsxs)("summary", { children: [
									"相关月份还有 ",
									ht.undated.length,
									" 项未标日期金额（不计入本期）"
								] }),
								/* @__PURE__ */ (0, b.jsx)("ul", { children: ht.undated.map((e, t) => /* @__PURE__ */ (0, b.jsxs)("li", { children: [
									e.month,
									" · ",
									e.name,
									"：",
									P(e.amount)
								] }, t)) }),
								/* @__PURE__ */ (0, b.jsx)("p", {
									className: "review-caption",
									children: "负数表示已标日期净额高于月度净额，需核对退款或月度金额；未确认到账的工资规划也不计入本期。"
								})
							] }),
							/* @__PURE__ */ (0, b.jsx)(Dt, { rows: ht.rows }),
							/* @__PURE__ */ (0, b.jsxs)("div", {
								className: "review-toolbar",
								children: [/* @__PURE__ */ (0, b.jsx)("span", {
									className: "review-caption",
									children: w ? "已联动当前账本" : x.ledger ? `已保存快照 · ${x.ledger.length} 笔，尚未替换为当前账本` : "本期金额尚未与日期明细联动"
								}), /* @__PURE__ */ (0, b.jsxs)("div", {
									className: "data-actions",
									children: [/* @__PURE__ */ (0, b.jsx)("button", {
										type: "button",
										className: "secondary-button",
										disabled: w || ht.unassigned.length > 0,
										onClick: Zt,
										children: "带入并联动本期收支"
									}), B && /* @__PURE__ */ (0, b.jsx)("button", {
										type: "button",
										className: "secondary-button",
										onClick: () => {
											T(!1), E(!1), S({
												...x,
												ledger: void 0
											});
										},
										children: "改为手填"
									})]
								})]
							}),
							w && /* @__PURE__ */ (0, b.jsxs)("label", {
								className: "review-ledger-confirm",
								children: [/* @__PURE__ */ (0, b.jsx)("input", {
									type: "checkbox",
									required: !0,
									checked: te,
									onChange: (e) => E(e.target.checked)
								}), "已核对本期全部收支，含未发生的分类；剩余未标日期金额不属于本期"]
							})
						]
					}),
					x.type === "month" && /* @__PURE__ */ (0, b.jsxs)("label", {
						className: "field",
						children: [/* @__PURE__ */ (0, b.jsx)("span", { children: "月预算口径" }), /* @__PURE__ */ (0, b.jsxs)("select", {
							value: x.budget?.mode ?? Je,
							onChange: (e) => {
								Ye(e.target.value), S({
									...x,
									budget: void 0
								});
							},
							children: [/* @__PURE__ */ (0, b.jsx)("option", {
								value: "normal",
								children: "普通月"
							}), /* @__PURE__ */ (0, b.jsx)("option", {
								value: "trip",
								children: "出差月"
							})]
						})]
					}),
					/* @__PURE__ */ (0, b.jsxs)("section", {
						"data-review-module": "spending",
						"aria-label": "复盘支出录入",
						children: [
							/* @__PURE__ */ (0, b.jsx)("div", {
								className: "table-wrap",
								children: /* @__PURE__ */ (0, b.jsxs)("table", {
									className: "review-table",
									children: [/* @__PURE__ */ (0, b.jsx)("thead", { children: /* @__PURE__ */ (0, b.jsxs)("tr", { children: [
										/* @__PURE__ */ (0, b.jsx)("th", { children: "项目" }),
										/* @__PURE__ */ (0, b.jsx)("th", { children: "本期金额" }),
										/* @__PURE__ */ (0, b.jsx)("th", { children: "发生事项／变化原因（可选）" })
									] }) }), /* @__PURE__ */ (0, b.jsx)("tbody", { children: ce.map((e) => /* @__PURE__ */ (0, b.jsxs)("tr", { children: [
										/* @__PURE__ */ (0, b.jsxs)("th", {
											scope: "row",
											children: [e.name, /* @__PURE__ */ (0, b.jsx)("small", { children: e.id === "investment" ? "净划入，取回填负数" : e.id === "emergency" ? "净转入，取用填负数" : "实际净支出，扣除退款" })]
										}),
										/* @__PURE__ */ (0, b.jsx)("td", { children: /* @__PURE__ */ (0, b.jsx)("input", {
											type: "number",
											step: "0.01",
											required: !0,
											readOnly: B && e.flow === "expense",
											"aria-label": `${e.name}本期金额`,
											value: x.amounts[e.id] ?? "",
											onChange: (t) => S({
												...x,
												amounts: {
													...x.amounts,
													[e.id]: wt(t.target.value)
												}
											})
										}) }),
										/* @__PURE__ */ (0, b.jsx)("td", { children: /* @__PURE__ */ (0, b.jsx)("input", {
											type: "text",
											"aria-label": `${e.name}本期事项`,
											placeholder: e.id === "learning" ? "课程、书籍、工具名称及用途" : void 0,
											value: x.notes[e.id] ?? "",
											onChange: (t) => S({
												...x,
												notes: {
													...x.notes,
													[e.id]: t.target.value
												}
											})
										}) })
									] }, e.id)) })]
								})
							}),
							/* @__PURE__ */ (0, b.jsx)("p", {
								className: "review-caption",
								children: "应急&学习金在预算中合并，在复盘中分开：应急填净转入，学习填实际支出与用途。微信充值、自有账户互转、基金预留不记消费；实际付款只记一次。"
							}),
							/* @__PURE__ */ (0, b.jsx)("div", {
								className: "data-actions",
								children: Ht("spending")
							})
						]
					}),
					/* @__PURE__ */ (0, b.jsx)(Ue, {
						value: x.investments,
						onChange: Yt,
						confirmed: Se,
						onConfirm: F,
						onOpen: () => h("investment"),
						saveAction: Ht("investments")
					}),
					/* @__PURE__ */ (0, b.jsx)(He, {
						focus: x.focus,
						live: z,
						onChange: (e) => {
							C(!1);
							let t = (e) => e.reduce((e, t) => e + Math.round(t.amount * 100), 0) / 100;
							S({
								...x,
								focus: e,
								balances: {
									...x.balances,
									otherAssets: t(e.assets),
									debt: t(e.debts)
								}
							});
						},
						onRefresh: Jt,
						onOpen: h,
						onUseBalances: Xt,
						saveAction: (e) => Ht(e)
					}),
					/* @__PURE__ */ (0, b.jsxs)("section", {
						"aria-labelledby": "review-accounts-title",
						className: "review-accounts",
						"data-review-module": "accounts",
						children: [/* @__PURE__ */ (0, b.jsxs)("div", {
							className: "review-toolbar",
							children: [/* @__PURE__ */ (0, b.jsx)("h3", {
								id: "review-accounts-title",
								children: "本期账户余额"
							}), /* @__PURE__ */ (0, b.jsx)("button", {
								className: "secondary-button",
								type: "button",
								disabled: !n.length,
								onClick: Kt,
								children: "带入账户管理余额"
							})]
						}), x.accounts ? /* @__PURE__ */ (0, b.jsxs)(b.Fragment, { children: [
							/* @__PURE__ */ (0, b.jsxs)("p", {
								className: "review-caption",
								children: [
									"截至 ",
									x.end,
									" · 带入值仅供核对，并非本期已确认余额。证券账户、他人资金或已另计的余额请取消计入现金。"
								]
							}),
							/* @__PURE__ */ (0, b.jsx)("div", {
								className: "table-wrap",
								children: /* @__PURE__ */ (0, b.jsxs)("table", {
									className: "review-table review-account-table",
									children: [
										/* @__PURE__ */ (0, b.jsx)("thead", { children: /* @__PURE__ */ (0, b.jsxs)("tr", { children: [
											/* @__PURE__ */ (0, b.jsx)("th", { children: "账户 / 用途" }),
											/* @__PURE__ */ (0, b.jsx)("th", { children: "本期期末余额" }),
											/* @__PURE__ */ (0, b.jsx)("th", { children: "计入个人现金" }),
											/* @__PURE__ */ (0, b.jsx)("th", { children: "本期变动说明" })
										] }) }),
										/* @__PURE__ */ (0, b.jsx)("tbody", { children: x.accounts.map((e) => /* @__PURE__ */ (0, b.jsxs)("tr", { children: [
											/* @__PURE__ */ (0, b.jsxs)("th", {
												scope: "row",
												children: [e.name, /* @__PURE__ */ (0, b.jsxs)("small", { children: [
													e.type,
													" · ",
													e.purpose
												] })]
											}),
											/* @__PURE__ */ (0, b.jsx)("td", { children: /* @__PURE__ */ (0, b.jsx)("input", {
												type: "number",
												min: "0",
												step: "0.01",
												required: !0,
												"aria-label": `${e.name}复盘期末余额`,
												value: e.balance ?? "",
												onChange: (t) => Gt(e.id, { balance: wt(t.target.value) })
											}) }),
											/* @__PURE__ */ (0, b.jsx)("td", { children: /* @__PURE__ */ (0, b.jsx)("input", {
												type: "checkbox",
												"aria-label": `${e.name}计入个人现金`,
												checked: e.included,
												onChange: (t) => Gt(e.id, { included: t.target.checked })
											}) }),
											/* @__PURE__ */ (0, b.jsx)("td", { children: /* @__PURE__ */ (0, b.jsx)("input", {
												type: "text",
												"aria-label": `${e.name}本期变动说明`,
												value: e.note,
												onChange: (t) => Gt(e.id, { note: t.target.value })
											}) })
										] }, e.id)) }),
										/* @__PURE__ */ (0, b.jsx)("tfoot", { children: /* @__PURE__ */ (0, b.jsxs)("tr", { children: [/* @__PURE__ */ (0, b.jsx)("th", { children: "个人现金合计" }), /* @__PURE__ */ (0, b.jsx)("td", {
											colSpan: 3,
											children: x.balances.cash === null ? "待补余额" : P(x.balances.cash)
										})] }) })
									]
								})
							}),
							/* @__PURE__ */ (0, b.jsxs)("div", {
								className: "review-account-options",
								children: [/* @__PURE__ */ (0, b.jsxs)("label", { children: [/* @__PURE__ */ (0, b.jsx)("input", {
									type: "checkbox",
									checked: _e,
									onChange: (e) => N(e.target.checked)
								}), "已核对本期期末账户余额"] }), Ht("accounts")]
							})
						] }) : /* @__PURE__ */ (0, b.jsx)("p", {
							className: "review-caption",
							children: "本期尚无账户明细，可带入核对；不带入时保留手填现金合计。"
						})]
					}),
					mt && /* @__PURE__ */ (0, b.jsxs)("details", {
						className: "review-method",
						"data-review-module": "goals",
						children: [
							/* @__PURE__ */ (0, b.jsx)("summary", { children: "目标余额 · 自动汇总" }),
							/* @__PURE__ */ (0, b.jsx)("div", {
								className: "table-wrap",
								children: /* @__PURE__ */ (0, b.jsxs)("table", {
									className: "review-table",
									children: [/* @__PURE__ */ (0, b.jsx)("thead", { children: /* @__PURE__ */ (0, b.jsxs)("tr", { children: [
										/* @__PURE__ */ (0, b.jsx)("th", { children: "目标" }),
										/* @__PURE__ */ (0, b.jsx)("th", { children: "金额" }),
										/* @__PURE__ */ (0, b.jsx)("th", { children: "来源" })
									] }) }), /* @__PURE__ */ (0, b.jsx)("tbody", { children: mt.map((e) => {
										let t = pt(e, i, n);
										return /* @__PURE__ */ (0, b.jsxs)("tr", { children: [
											/* @__PURE__ */ (0, b.jsx)("th", { children: e.name }),
											/* @__PURE__ */ (0, b.jsx)("td", { children: t.mode === "manual" ? /* @__PURE__ */ (0, b.jsx)("input", {
												"aria-label": `${e.name}复盘目标余额`,
												type: "number",
												min: "0",
												step: "0.01",
												required: !0,
												value: Number.isFinite(e.current) ? e.current : "",
												onChange: (t) => S({
													...x,
													goals: mt.map((n) => n.id === e.id ? {
														...n,
														current: t.target.value === "" ? NaN : Number(t.target.value)
													} : n)
												})
											}) : /* @__PURE__ */ (0, b.jsx)("span", {
												"aria-label": `${e.name}自动金额`,
												children: P(e.current)
											}) }),
											/* @__PURE__ */ (0, b.jsxs)("td", { children: [t.label, t.mode === "accounts" && /* @__PURE__ */ (0, b.jsx)("small", { children: "已保存账户余额" })] })
										] }, e.id);
									}) })]
								})
							}),
							/* @__PURE__ */ (0, b.jsx)("div", {
								className: "data-actions",
								children: Ht("goals")
							})
						]
					}),
					/* @__PURE__ */ (0, b.jsx)("h3", { children: "期末个人资产与负债" }),
					/* @__PURE__ */ (0, b.jsx)("div", {
						className: "review-fields balances",
						children: Object.entries(ue).map(([e, t]) => /* @__PURE__ */ (0, b.jsxs)("label", {
							className: "field",
							children: [/* @__PURE__ */ (0, b.jsxs)("span", { children: [t, " · 明细合计"] }), /* @__PURE__ */ (0, b.jsx)("input", {
								type: "number",
								min: "0",
								step: "0.01",
								required: !0,
								readOnly: e === "cash" ? !!x.accounts : e === "investments" ? !!x.investments : !!x.focus,
								"aria-label": t,
								value: Number.isFinite(x.balances[e]) ? x.balances[e] : "",
								onChange: (t) => S({
									...x,
									balances: {
										...x.balances,
										[e]: wt(t.target.value)
									}
								})
							})]
						}, e))
					}),
					/* @__PURE__ */ (0, b.jsx)("p", {
						className: "review-caption",
						children: "现金及存款含微信、应急与本人持有的专项现金；证券账户总资产含其中现金和持仓，两边不重复。已交给家人的钱不计个人资产。"
					}),
					/* @__PURE__ */ (0, b.jsxs)("label", {
						className: "field",
						children: [/* @__PURE__ */ (0, b.jsx)("span", { children: "本期补充事项（可选）" }), /* @__PURE__ */ (0, b.jsx)("textarea", {
							rows: 2,
							value: x.summary,
							onChange: (e) => S({
								...x,
								summary: e.target.value
							})
						})]
					}),
					/* @__PURE__ */ (0, b.jsxs)("div", {
						className: "review-toolbar",
						children: [
							x.type === "week" && /* @__PURE__ */ (0, b.jsxs)("label", {
								className: "field",
								children: [/* @__PURE__ */ (0, b.jsx)("span", { children: "保存范围" }), /* @__PURE__ */ (0, b.jsxs)("select", {
									"aria-label": "复盘保存范围",
									value: ft ? "dashboard" : "history",
									onChange: (e) => xe(e.target.value === "dashboard"),
									children: [/* @__PURE__ */ (0, b.jsx)("option", {
										value: "dashboard",
										disabled: !dt,
										children: "更新本期看板并保留历史"
									}), /* @__PURE__ */ (0, b.jsx)("option", {
										value: "history",
										children: "仅保存历史报告"
									})]
								})]
							}),
							!dt && x.type === "week" && /* @__PURE__ */ (0, b.jsx)("p", { children: "本期早于已有最新一期或属于未来日期，仅保存历史报告，不覆盖当前看板。" }),
							x.type === "week" && /* @__PURE__ */ (0, b.jsx)("p", {
								className: "review-caption",
								children: "账本已记录的金额须先补日期，避免再次记账。投资与应急划拨不计消费，期末余额直接替换，不再加减收支。预算和计划不变。"
							}),
							/* @__PURE__ */ (0, b.jsx)("button", {
								className: "primary-button",
								type: "submit",
								children: ft ? "全部保存并更新看板" : "保存历史报告并分析"
							}),
							x.type !== "week" && /* @__PURE__ */ (0, b.jsx)("button", {
								className: "secondary-button",
								type: "button",
								onClick: Wt,
								children: "从已有记录汇总"
							})
						]
					})
				]
			}),
			Me === "report" && (!L || !R ? /* @__PURE__ */ (0, b.jsx)("p", { children: "尚无复盘记录。" }) : /* @__PURE__ */ (0, b.jsxs)("section", {
				"aria-label": "周期对比报告",
				children: [
					lt && /* @__PURE__ */ (0, b.jsx)("p", {
						className: "review-status",
						role: "status",
						children: "本期有模块已单独更新；此报告仍是上次全部保存的版本。"
					}),
					/* @__PURE__ */ (0, b.jsxs)("div", {
						className: "review-toolbar",
						children: [/* @__PURE__ */ (0, b.jsxs)("label", {
							className: "field",
							children: [/* @__PURE__ */ (0, b.jsx)("span", { children: "报告期间" }), /* @__PURE__ */ (0, b.jsx)("select", {
								"aria-label": "报告期间",
								value: L.id,
								onChange: (e) => Re(e.target.value),
								children: e.map((e) => /* @__PURE__ */ (0, b.jsxs)("option", {
									value: e.id,
									children: [
										le[e.type],
										" · ",
										e.start,
										" 至 ",
										e.end
									]
								}, e.id))
							})]
						}), /* @__PURE__ */ (0, b.jsxs)("div", {
							className: "data-actions",
							children: [/* @__PURE__ */ (0, b.jsx)("button", {
								className: "secondary-button",
								type: "button",
								onClick: () => It(Mt, "修订会替换当前未保存的输入，是否继续？", () => {
									S({ ...L }), Lt(), C(!1), T(!1), E(!1), N(!1), F(!1), Te(""), Fe("entry"), qe("");
								}),
								children: "修订本期"
							}), /* @__PURE__ */ (0, b.jsx)("button", {
								className: "secondary-button",
								type: "button",
								onClick: () => Ct(`finance-${L.type}-${L.start}.md`, Be(L, e), "text/markdown;charset=utf-8"),
								children: "下载报告"
							})]
						})]
					}),
					/* @__PURE__ */ (0, b.jsx)("p", {
						className: "review-caption",
						children: R.previous ? `对比上期：${R.previous.start} 至 ${R.previous.end}` : "首次基准，暂无上期对比"
					}),
					L.type === "month" && /* @__PURE__ */ (0, b.jsx)("p", {
						className: "review-caption",
						children: L.monthStartDay === 10 ? "10号账期：每月10日至下月9日" : "自然月报告：沿用原口径"
					}),
					L.incomeLedger && /* @__PURE__ */ (0, b.jsxs)(b.Fragment, { children: [/* @__PURE__ */ (0, b.jsx)("p", {
						className: "review-caption",
						children: "收入来源：保存时的到账明细快照"
					}), /* @__PURE__ */ (0, b.jsx)(Dt, { rows: L.incomeLedger })] }),
					L.ledger && /* @__PURE__ */ (0, b.jsxs)(b.Fragment, { children: [/* @__PURE__ */ (0, b.jsxs)("p", {
						className: "review-caption",
						children: [
							"收支来源：保存时的日期明细快照 · ",
							L.ledger.length,
							" 笔"
						]
					}), /* @__PURE__ */ (0, b.jsx)(Dt, { rows: L.ledger })] }),
					/* @__PURE__ */ (0, b.jsxs)("div", {
						className: "review-metrics",
						children: [
							/* @__PURE__ */ (0, b.jsxs)("div", { children: [
								/* @__PURE__ */ (0, b.jsx)("span", { children: "本期收入" }),
								/* @__PURE__ */ (0, b.jsx)("strong", { children: P(R.totals.income) }),
								Pe(L) && /* @__PURE__ */ (0, b.jsxs)("small", { children: [
									"工资 ",
									P(Pe(L).filter((e) => e.categoryId === "salary").reduce((e, t) => e + Math.round(t.amount * 100), 0) / 100),
									" · 其他 ",
									P(Pe(L).filter((e) => e.categoryId === "otherIncome").reduce((e, t) => e + Math.round(t.amount * 100), 0) / 100)
								] })
							] }),
							/* @__PURE__ */ (0, b.jsxs)("div", { children: [/* @__PURE__ */ (0, b.jsx)("span", { children: "本期实际消费" }), /* @__PURE__ */ (0, b.jsx)("strong", { children: P(R.totals.spending) })] }),
							/* @__PURE__ */ (0, b.jsxs)("div", { children: [/* @__PURE__ */ (0, b.jsx)("span", { children: "本期收支结余" }), /* @__PURE__ */ (0, b.jsx)("strong", { children: P(R.totals.surplus) })] }),
							/* @__PURE__ */ (0, b.jsxs)("div", { children: [
								/* @__PURE__ */ (0, b.jsx)("span", { children: "期末净资产" }),
								/* @__PURE__ */ (0, b.jsx)("strong", { children: P(R.totals.netWorth) }),
								/* @__PURE__ */ (0, b.jsxs)("small", { children: ["较上期余额 ", Tt(R.netWorthDelta)] })
							] })
						]
					}),
					/* @__PURE__ */ (0, b.jsx)(We, {
						current: L,
						previous: R.previous
					}),
					/* @__PURE__ */ (0, b.jsxs)("section", {
						className: "review-highlights",
						"aria-label": "本期关键变化",
						children: [/* @__PURE__ */ (0, b.jsx)("h3", { children: "本期关键变化" }), R.highlights.map((e) => /* @__PURE__ */ (0, b.jsxs)("details", {
							className: "review-highlight",
							children: [/* @__PURE__ */ (0, b.jsxs)("summary", { children: [/* @__PURE__ */ (0, b.jsxs)("span", {
								className: "review-highlight-title",
								children: [e.title, /* @__PURE__ */ (0, b.jsx)("small", { children: e.state })]
							}), /* @__PURE__ */ (0, b.jsx)("span", { children: e.summary })] }), e.details.length ? /* @__PURE__ */ (0, b.jsx)("ul", { children: e.details.map((e, t) => /* @__PURE__ */ (0, b.jsx)("li", { children: e }, t)) }) : /* @__PURE__ */ (0, b.jsx)("p", {
								className: "review-caption",
								children: "暂无额外明细。"
							})]
						}, e.id))]
					}),
					/* @__PURE__ */ (0, b.jsx)("h3", { children: "下期动作" }),
					/* @__PURE__ */ (0, b.jsx)("ul", { children: R.actions.map((e) => /* @__PURE__ */ (0, b.jsx)("li", { children: e }, e)) }),
					/* @__PURE__ */ (0, b.jsxs)("details", {
						className: "review-method",
						children: [/* @__PURE__ */ (0, b.jsx)("summary", { children: "收支分类明细" }), /* @__PURE__ */ (0, b.jsx)("div", {
							className: "table-wrap",
							children: /* @__PURE__ */ (0, b.jsxs)("table", {
								className: "review-table",
								children: [/* @__PURE__ */ (0, b.jsx)("thead", { children: /* @__PURE__ */ (0, b.jsxs)("tr", { children: [
									/* @__PURE__ */ (0, b.jsx)("th", { children: "项目" }),
									/* @__PURE__ */ (0, b.jsx)("th", { children: "本期" }),
									/* @__PURE__ */ (0, b.jsx)("th", { children: "上期" }),
									/* @__PURE__ */ (0, b.jsx)("th", { children: "变化" }),
									/* @__PURE__ */ (0, b.jsx)("th", { children: "本期事项" })
								] }) }), /* @__PURE__ */ (0, b.jsx)("tbody", { children: R.rows.map((e) => /* @__PURE__ */ (0, b.jsxs)("tr", { children: [
									/* @__PURE__ */ (0, b.jsxs)("th", {
										scope: "row",
										children: [e.name, e.flow === "transfer" && /* @__PURE__ */ (0, b.jsx)("small", { children: "划拨，不计消费" })]
									}),
									/* @__PURE__ */ (0, b.jsx)("td", { children: P(e.amount) }),
									/* @__PURE__ */ (0, b.jsx)("td", { children: e.previous === null ? "无基准" : P(e.previous) }),
									/* @__PURE__ */ (0, b.jsx)("td", { children: Tt(e.delta) }),
									/* @__PURE__ */ (0, b.jsx)("td", { children: e.note || "未填写" })
								] }, e.id)) })]
							})
						})]
					}),
					R.accountRows.length > 0 && /* @__PURE__ */ (0, b.jsxs)("details", {
						className: "review-method",
						"aria-label": "账户余额对比",
						children: [/* @__PURE__ */ (0, b.jsx)("summary", { children: "账户余额对比" }), /* @__PURE__ */ (0, b.jsx)("div", {
							className: "table-wrap",
							children: /* @__PURE__ */ (0, b.jsxs)("table", {
								className: "review-table",
								children: [/* @__PURE__ */ (0, b.jsx)("thead", { children: /* @__PURE__ */ (0, b.jsxs)("tr", { children: [
									/* @__PURE__ */ (0, b.jsx)("th", { children: "账户" }),
									/* @__PURE__ */ (0, b.jsx)("th", { children: "本期期末" }),
									/* @__PURE__ */ (0, b.jsx)("th", { children: "上期期末" }),
									/* @__PURE__ */ (0, b.jsx)("th", { children: "变化" }),
									/* @__PURE__ */ (0, b.jsx)("th", { children: "计入现金" }),
									/* @__PURE__ */ (0, b.jsx)("th", { children: "本期说明" })
								] }) }), /* @__PURE__ */ (0, b.jsx)("tbody", { children: R.accountRows.map((e) => /* @__PURE__ */ (0, b.jsxs)("tr", { children: [
									/* @__PURE__ */ (0, b.jsxs)("th", {
										scope: "row",
										children: [e.name, /* @__PURE__ */ (0, b.jsx)("small", { children: e.purpose })]
									}),
									/* @__PURE__ */ (0, b.jsx)("td", { children: e.current === null ? "未记录" : P(e.current) }),
									/* @__PURE__ */ (0, b.jsx)("td", { children: e.previous === null ? "无基准" : P(e.previous) }),
									/* @__PURE__ */ (0, b.jsx)("td", { children: Tt(e.delta) }),
									/* @__PURE__ */ (0, b.jsx)("td", { children: e.included === null ? "未记录" : e.included ? "是" : "否" }),
									/* @__PURE__ */ (0, b.jsxs)("td", { children: [e.note || "未填写", /* @__PURE__ */ (0, b.jsx)("small", { children: e.status })] })
								] }, e.id)) })]
							})
						})]
					}),
					L.budget && /* @__PURE__ */ (0, b.jsxs)("details", {
						className: "review-method",
						open: !0,
						children: [/* @__PURE__ */ (0, b.jsxs)("summary", { children: ["月预算核对 · ", L.budget.mode === "normal" ? "普通月" : "出差月"] }), /* @__PURE__ */ (0, b.jsx)("div", {
							className: "table-wrap",
							children: /* @__PURE__ */ (0, b.jsxs)("table", {
								className: "review-table",
								children: [/* @__PURE__ */ (0, b.jsx)("thead", { children: /* @__PURE__ */ (0, b.jsxs)("tr", { children: [
									/* @__PURE__ */ (0, b.jsx)("th", { children: "项目" }),
									/* @__PURE__ */ (0, b.jsx)("th", { children: "整月预算" }),
									/* @__PURE__ */ (0, b.jsx)("th", { children: "本期金额" }),
									/* @__PURE__ */ (0, b.jsx)("th", { children: "预算减本期" })
								] }) }), /* @__PURE__ */ (0, b.jsx)("tbody", { children: R.budgetRows.map((e) => /* @__PURE__ */ (0, b.jsxs)("tr", { children: [
									/* @__PURE__ */ (0, b.jsx)("th", { children: e.name }),
									/* @__PURE__ */ (0, b.jsx)("td", { children: P(e.budget) }),
									/* @__PURE__ */ (0, b.jsx)("td", { children: P(e.amount) }),
									/* @__PURE__ */ (0, b.jsx)("td", { children: P(e.remaining) })
								] }, e.id)) })]
							})
						})]
					}),
					L.summary && /* @__PURE__ */ (0, b.jsxs)("p", {
						className: "review-caption",
						children: ["本期补充：", L.summary]
					}),
					/* @__PURE__ */ (0, b.jsxs)("details", {
						className: "review-method",
						children: [
							/* @__PURE__ */ (0, b.jsx)("summary", { children: "余额变化与数据口径" }),
							/* @__PURE__ */ (0, b.jsx)("div", {
								className: "table-wrap",
								children: /* @__PURE__ */ (0, b.jsxs)("table", {
									className: "review-table",
									children: [/* @__PURE__ */ (0, b.jsx)("thead", { children: /* @__PURE__ */ (0, b.jsxs)("tr", { children: [
										/* @__PURE__ */ (0, b.jsx)("th", { children: "期末余额" }),
										/* @__PURE__ */ (0, b.jsx)("th", { children: "本期" }),
										/* @__PURE__ */ (0, b.jsx)("th", { children: "上期" })
									] }) }), /* @__PURE__ */ (0, b.jsx)("tbody", { children: Object.entries(ue).map(([e, t]) => /* @__PURE__ */ (0, b.jsxs)("tr", { children: [
										/* @__PURE__ */ (0, b.jsx)("th", { children: t }),
										/* @__PURE__ */ (0, b.jsx)("td", { children: P(L.balances[e]) }),
										/* @__PURE__ */ (0, b.jsx)("td", { children: R.previous ? P(R.previous.balances[e]) : "无基准" })
									] }, e)) })]
								})
							}),
							/* @__PURE__ */ (0, b.jsxs)("p", { children: [
								"日均消费：本期 ",
								P(R.totals.spending / R.totals.days),
								R.prior ? `；上期 ${P(R.prior.spending / R.prior.days)}` : ""
							] }),
							/* @__PURE__ */ (0, b.jsx)("ul", { children: R.notices.map((e) => /* @__PURE__ */ (0, b.jsx)("li", { children: e }, e)) })
						]
					})
				]
			}))
		]
	});
}
function Dt({ rows: e }) {
	return /* @__PURE__ */ (0, b.jsxs)("details", {
		className: "review-method",
		children: [/* @__PURE__ */ (0, b.jsxs)("summary", { children: [
			"日期收支明细 · ",
			e.length,
			" 笔"
		] }), /* @__PURE__ */ (0, b.jsx)("div", {
			className: "table-wrap",
			children: /* @__PURE__ */ (0, b.jsxs)("table", {
				className: "review-table",
				children: [/* @__PURE__ */ (0, b.jsx)("thead", { children: /* @__PURE__ */ (0, b.jsxs)("tr", { children: [
					/* @__PURE__ */ (0, b.jsx)("th", { children: "日期" }),
					/* @__PURE__ */ (0, b.jsx)("th", { children: "收支 / 分类" }),
					/* @__PURE__ */ (0, b.jsx)("th", { children: "金额" }),
					/* @__PURE__ */ (0, b.jsx)("th", { children: "事项 / 用途" })
				] }) }), /* @__PURE__ */ (0, b.jsx)("tbody", { children: e.map((e) => /* @__PURE__ */ (0, b.jsxs)("tr", { children: [
					/* @__PURE__ */ (0, b.jsx)("td", { children: e.date }),
					/* @__PURE__ */ (0, b.jsxs)("td", { children: [
						e.flow === "income" ? "收入" : "支出",
						" · ",
						e.name
					] }),
					/* @__PURE__ */ (0, b.jsx)("td", { children: P(e.amount) }),
					/* @__PURE__ */ (0, b.jsx)("td", { children: e.note || "未填写" })
				] }, e.id)) })]
			})
		})]
	});
}
//#endregion
//#region app/weekly-ledger-view.tsx
function Ot({ records: e, flow: t }) {
	let n = e.filter((e) => e.type === "week").sort((e, t) => e.start.localeCompare(t.start));
	return /* @__PURE__ */ (0, b.jsxs)("details", {
		className: "review-method",
		open: !0,
		children: [/* @__PURE__ */ (0, b.jsxs)("summary", { children: [t === "income" ? "每周收入变化" : "每周支出变化", " · 已保存复盘"] }), n.length ? /* @__PURE__ */ (0, b.jsx)("div", {
			className: "table-wrap",
			children: /* @__PURE__ */ (0, b.jsxs)("table", {
				className: "review-table",
				children: [/* @__PURE__ */ (0, b.jsx)("thead", { children: /* @__PURE__ */ (0, b.jsxs)("tr", { children: [
					/* @__PURE__ */ (0, b.jsx)("th", { children: "期间" }),
					/* @__PURE__ */ (0, b.jsx)("th", { children: t === "income" ? "收入" : "实际消费" }),
					/* @__PURE__ */ (0, b.jsx)("th", { children: "较上期" }),
					/* @__PURE__ */ (0, b.jsx)("th", { children: "收支结余" }),
					/* @__PURE__ */ (0, b.jsx)("th", { children: "口径" })
				] }) }), /* @__PURE__ */ (0, b.jsx)("tbody", { children: n.map((e, r) => {
					let i = Me(e), a = n[r - 1], o = a ? Me(a) : null, s = t === "income" ? i.income : i.spending, c = o ? s - (t === "income" ? o.income : o.spending) : null;
					return /* @__PURE__ */ (0, b.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, b.jsxs)("th", { children: [
							e.start,
							" 至 ",
							e.end
						] }),
						/* @__PURE__ */ (0, b.jsx)("td", { children: P(s) }),
						/* @__PURE__ */ (0, b.jsx)("td", { children: c === null ? "首次基准" : P(c) }),
						/* @__PURE__ */ (0, b.jsx)("td", { children: P(i.surplus) }),
						/* @__PURE__ */ (0, b.jsxs)("td", { children: [
							i.days,
							" 天",
							o && o.days !== i.days ? ` / 上期 ${o.days} 天` : "",
							/* @__PURE__ */ (0, b.jsx)("small", { children: "保存时的实际发生额，不与账本再相加" })
						] })
					] }, e.id);
				}) })]
			})
		}) : /* @__PURE__ */ (0, b.jsx)("p", {
			className: "review-caption",
			children: "尚未保存周复盘。"
		})]
	});
}
//#endregion
//#region app/review-overview.tsx
function kt({ records: e, onOpen: t }) {
	let n = Ne(e), r = n ? ze(n, e) : null, i = Fe(e), a = (e) => e === null ? "首次基准" : `较上期 ${e > 0 ? "+" : ""}${P(e)}`, o = r && n ? [
		{
			title: "本周收入",
			value: r.totals.income,
			detail: a(r.prior ? r.totals.income - r.prior.income : null),
			tone: "blue"
		},
		{
			title: "本周实际消费",
			value: r.totals.spending,
			detail: a(r.prior ? r.totals.spending - r.prior.spending : null),
			tone: "green"
		},
		{
			title: "本周收支结余",
			value: r.totals.surplus,
			detail: "收入减消费；投资、应急划拨不计消费",
			tone: r.totals.surplus < 0 ? "red" : "green"
		},
		{
			title: "复盘期末净资产",
			value: r.totals.netWorth,
			detail: a(r.netWorthDelta),
			tone: "violet"
		}
	] : [];
	return /* @__PURE__ */ (0, b.jsxs)("section", {
		"aria-label": "最近周复盘",
		className: "review-overview",
		children: [
			/* @__PURE__ */ (0, b.jsxs)("div", {
				className: "section-title compact",
				children: [/* @__PURE__ */ (0, b.jsxs)("div", { children: [
					/* @__PURE__ */ (0, b.jsx)("h3", { children: "最近周复盘" }),
					/* @__PURE__ */ (0, b.jsx)("p", { children: n ? `${n.start} 至 ${n.end} · ${r.totals.days} 天 · 已保存快照` : "尚未保存周复盘" }),
					r?.prior && /* @__PURE__ */ (0, b.jsxs)("p", { children: [
						"上期：",
						r.previous.start,
						" 至 ",
						r.previous.end,
						" · ",
						r.prior.days,
						" 天",
						r.prior.days === r.totals.days ? "" : " · 天数不同，金额不直接代表增减趋势"
					] })
				] }), /* @__PURE__ */ (0, b.jsx)("button", {
					type: "button",
					onClick: t,
					children: "查看周复盘"
				})]
			}),
			i.month && /* @__PURE__ */ (0, b.jsxs)("div", {
				className: "review-month-income",
				"aria-label": "本月收入",
				children: [/* @__PURE__ */ (0, b.jsxs)("div", { children: [/* @__PURE__ */ (0, b.jsx)("span", { children: "本月收入 · 已记录" }), /* @__PURE__ */ (0, b.jsx)("strong", { children: P(i.month.income) })] }), /* @__PURE__ */ (0, b.jsxs)("div", { children: [
					/* @__PURE__ */ (0, b.jsxs)("span", { children: [
						i.month.start,
						" 至 ",
						i.month.limit,
						" · 截至 ",
						i.month.end
					] }),
					/* @__PURE__ */ (0, b.jsxs)("small", { children: [
						"10号账期 · 已保存周复盘汇总 · 已覆盖 ",
						i.month.coveredDays,
						"/",
						i.month.days,
						" 天"
					] }),
					i.month.coveredDays < i.month.days && /* @__PURE__ */ (0, b.jsx)("small", { children: "尚有未覆盖日期，当前金额不是完整月收入。" }),
					i.month.boundaryMissing && /* @__PURE__ */ (0, b.jsx)("small", { children: "跨账期周缺少收入日期，该周收入暂未计入本月。" })
				] })]
			}),
			/* @__PURE__ */ (0, b.jsx)("div", {
				className: "overview-grid",
				children: o.map((e) => /* @__PURE__ */ (0, b.jsxs)("article", {
					className: `overview-card ${e.tone}`,
					children: [
						/* @__PURE__ */ (0, b.jsx)("span", { children: e.title }),
						/* @__PURE__ */ (0, b.jsx)("strong", { children: P(e.value) }),
						/* @__PURE__ */ (0, b.jsx)("small", { children: e.detail })
					]
				}, e.title))
			}),
			i.rows.length > 0 && /* @__PURE__ */ (0, b.jsxs)("section", {
				"aria-label": "每周收支变化",
				className: "review-week-trend",
				children: [
					/* @__PURE__ */ (0, b.jsx)("h3", { children: "每周收支变化" }),
					/* @__PURE__ */ (0, b.jsx)("div", {
						className: "review-week-table",
						children: /* @__PURE__ */ (0, b.jsxs)("table", { children: [/* @__PURE__ */ (0, b.jsx)("thead", { children: /* @__PURE__ */ (0, b.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, b.jsx)("th", { children: "复盘日期" }),
							/* @__PURE__ */ (0, b.jsx)("th", { children: "每周收入" }),
							/* @__PURE__ */ (0, b.jsx)("th", { children: "每周实际消费" }),
							/* @__PURE__ */ (0, b.jsx)("th", { children: "每周收支结余" }),
							/* @__PURE__ */ (0, b.jsx)("th", { children: "比较口径" })
						] }) }), /* @__PURE__ */ (0, b.jsx)("tbody", { children: [...i.rows].reverse().map((e) => /* @__PURE__ */ (0, b.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, b.jsxs)("th", {
								scope: "row",
								children: [
									e.record.start,
									" 至 ",
									e.record.end,
									/* @__PURE__ */ (0, b.jsxs)("small", { children: [e.days, " 天"] })
								]
							}),
							[
								"income",
								"spending",
								"surplus"
							].map((t) => /* @__PURE__ */ (0, b.jsxs)("td", { children: [/* @__PURE__ */ (0, b.jsx)("strong", { children: P(e[t]) }), /* @__PURE__ */ (0, b.jsx)("small", { children: e.changes ? a(e.changes[t]).replace("较上期", "较上周") : "—" })] }, t)),
							/* @__PURE__ */ (0, b.jsx)("td", { children: e.comparison })
						] }, e.record.id)) })] })
					}),
					/* @__PURE__ */ (0, b.jsx)("p", { children: "仅统计已保存周复盘；同周修订替换旧值，不重复累计。消费不含投资和应急划拨。" })
				]
			})
		]
	});
}
//#endregion
//#region app/monthly-budget-usage.ts
function At(e, t, n) {
	let r = (e) => Math.round(e * 100), i = (e) => e.reduce((e, t) => e + r(t), 0) / 100, a = i(n.rows.filter((e) => e.kind === "investment").map((e) => e[n.mode])), o = i(n.rows.filter((e) => e.kind === "emergency").map((e) => e[n.mode])), s = i([a, o]), c = i(n.rows.map((e) => e[n.mode])), l = i([t, s]);
	return {
		consumption: t,
		investment: a,
		emergency: o,
		reserved: s,
		budget: c,
		spending: l,
		surplus: i([e, -l]),
		remaining: i([c, -l])
	};
}
//#endregion
//#region app/review-dashboard-sync.ts
var jt = (e) => e.reduce((e, t) => e + Math.round(t.amount * 100), 0) / 100;
function Mt(e, t, n) {
	if (e.length !== t.length || new Set(t.map((e) => e.id)).size !== t.length || e.some((e) => !t.some((t) => e.id === t.id))) throw Error(`${n}清单已变化，请重新带入当前模块并核对，不能遗漏或猜测账户。`);
}
function Nt(e, t) {
	return e.map((e) => ({
		...e,
		...t.find((t) => t.id === e.id)
	}));
}
function Pt(e) {
	return JSON.stringify([
		e.accounts,
		e.holdings,
		e.fxUsd,
		e.fxHkd,
		e.balanceAssets,
		e.liabilities,
		e.reminders,
		e.fundBuckets,
		e.goals
	]);
}
function Ft(e) {
	let t = e.accounts.filter((e) => e.includedInPersonal !== !1).reduce((e, t) => e + Math.round(t.balance * 100), 0) / 100, n = M({
		holdings: e.holdings,
		fxUsd: e.fxUsd,
		fxHkd: e.fxHkd
	}), r = jt(e.liabilities);
	return {
		cash: t,
		investments: n,
		debt: r,
		netWorth: Math.round((t + n + jt(e.balanceAssets) - r) * 100) / 100
	};
}
function It(e) {
	if (e === void 0) return [];
	if (!Array.isArray(e)) throw Error("整期更新历史格式无效，未导入。");
	let t = /* @__PURE__ */ new Set();
	return e.map((e) => {
		let n = structuredClone(e);
		if (!n || typeof n.id != "string" || t.has(n.id) || typeof n.reviewId != "string" || typeof n.asOf != "string" || !/^\d{4}-\d{2}-\d{2}$/.test(n.asOf) || !Number.isFinite(Date.parse(n.savedAt)) || typeof n.published != "boolean") throw Error("整期更新历史编号或日期无效，未导入。");
		if (t.add(n.id), n.module !== void 0) {
			if (!Object.hasOwn(_t, n.module) || !n.moduleDraft || !n.published) throw Error("模块更新历史无效，未导入。");
			let e = De("week", n.asOf);
			if (n.reviewId !== `week:${e.start}`) throw Error("模块更新历史周期无效，未导入。");
			n.moduleDraft = yt(vt(e, n.moduleDraft), n.module);
		}
		for (let e of [n.before, n.after]) {
			if (!e || typeof e != "object" || "reviewUpdates" in e || ![
				"accounts",
				"holdings",
				"balanceAssets",
				"liabilities",
				"monthlyRecords",
				"reminders",
				"fundBuckets",
				"goals"
			].every((t) => Array.isArray(e[t]))) throw Error("整期更新历史快照不完整，未导入。");
			try {
				if (Object.values(Ft(e)).some((e) => !Number.isFinite(e))) throw Error();
			} catch {
				throw Error("整期更新历史金额无效，未导入。");
			}
		}
		return structuredClone(n);
	});
}
function Lt(e, t, n, r = (/* @__PURE__ */ new Date()).toISOString(), i = Ce()) {
	let a = {
		...e,
		financeReviews: t
	}, o = n.record ? ke(n.record) : void 0;
	if (n.publish) {
		if (!o || o.type !== "week") throw Error("只有周复盘可以更新当前看板。");
		let r = [
			e.dashboardAsOf ?? "",
			...(e.financeReviews ?? []).filter((e) => e.type === "week").map((e) => e.end),
			...(e.reviewUpdates ?? []).filter((e) => e.published).map((e) => e.asOf)
		].sort().at(-1);
		if (o.end < r || o.end > i) throw Error("较早或未来一期不能覆盖当前看板，请选择仅保存历史报告。");
		if (n.sourceSignature !== Pt(e)) throw Error("当前模块在复盘期间已变化，请重新带入当前模块并核对后保存。");
		if (!o.accounts || !o.investments || !o.focus || !o.goals) throw Error("请补齐账户、逐账户投资、关键事项和目标余额明细。");
		let s = o.focus;
		if (Object.values(s.checks).some((e) => !e)) throw Error("请核对大花费项目、账单订阅及资产负债。");
		if (Mt(e.accounts, o.accounts, "现金账户"), Mt(e.holdings, o.investments.holdings, "投资账户"), Mt(e.balanceAssets, s.assets, "补录资产"), Mt(e.liabilities, s.debts, "负债"), Mt(e.reminders, s.bills, "账单"), Mt(e.fundBuckets, s.projects, "大花费项目"), Mt(e.goals, o.goals, "目标"), jt(s.assets) !== o.balances.otherAssets || jt(s.debts) !== o.balances.debt || s.holdings !== M(o.investments)) throw Error("资产负债合计与明细不一致，请重新核对。");
		a = {
			...a,
			monthlyRecords: dt(e.monthlyRecords, e.datedEntries ?? [], o),
			selectedMonth: o.end.slice(0, 7),
			accounts: e.accounts.map((e) => {
				let t = o.accounts.find((t) => t.id === e.id);
				return {
					...e,
					balance: t.balance,
					includedInPersonal: t.included
				};
			}),
			holdings: Nt(e.holdings, o.investments.holdings),
			fxUsd: o.investments.fxUsd,
			fxHkd: o.investments.fxHkd,
			balanceAssets: Nt(e.balanceAssets, s.assets),
			liabilities: Nt(e.liabilities, s.debts),
			reminders: Nt(e.reminders, s.bills),
			fundBuckets: Nt(e.fundBuckets, s.projects),
			goals: Nt(e.goals, o.goals),
			dashboardAsOf: o.end
		}, a.goals = ht(z(e.goals, o.goals, a.accounts), o.id, o.amounts.parents), o.goals = a.goals.map(({ id: e, name: t, current: n }) => ({
			id: e,
			name: t,
			current: n
		})), a.financeReviews = t.map((e) => e.id === o.id ? o : e);
	}
	let s = (e) => {
		let t = { ...e };
		return delete t.reviewUpdates, structuredClone(t);
	}, c = {
		id: `${r}:${(e.reviewUpdates ?? []).length}`,
		reviewId: o?.id ?? "import",
		asOf: o?.end ?? i,
		savedAt: r,
		published: n.publish,
		before: s(e),
		after: s(a)
	};
	return {
		...a,
		reviewUpdates: [...e.reviewUpdates ?? [], c]
	};
}
//#endregion
//#region app/review-update-history.tsx
function Rt({ updates: e, onExport: t }) {
	return /* @__PURE__ */ (0, b.jsxs)("details", {
		className: "review-method",
		children: [
			/* @__PURE__ */ (0, b.jsxs)("summary", { children: [
				"更新历史与趋势 · ",
				e.length,
				" 次"
			] }),
			/* @__PURE__ */ (0, b.jsx)("div", {
				className: "table-wrap",
				children: /* @__PURE__ */ (0, b.jsxs)("table", {
					className: "review-table",
					children: [/* @__PURE__ */ (0, b.jsx)("thead", { children: /* @__PURE__ */ (0, b.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, b.jsx)("th", { children: "数据截至 / 保存时间" }),
						/* @__PURE__ */ (0, b.jsx)("th", { children: "范围" }),
						/* @__PURE__ */ (0, b.jsx)("th", { children: "现金" }),
						/* @__PURE__ */ (0, b.jsx)("th", { children: "投资" }),
						/* @__PURE__ */ (0, b.jsx)("th", { children: "负债" }),
						/* @__PURE__ */ (0, b.jsx)("th", { children: "净资产" }),
						/* @__PURE__ */ (0, b.jsx)("th", { children: "完整版本" })
					] }) }), /* @__PURE__ */ (0, b.jsx)("tbody", { children: [...e].reverse().map((e) => {
						let n = Ft(e.after);
						return /* @__PURE__ */ (0, b.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, b.jsxs)("th", { children: [e.asOf, /* @__PURE__ */ (0, b.jsx)("small", { children: new Date(e.savedAt).toLocaleString("zh-CN") })] }),
							/* @__PURE__ */ (0, b.jsx)("td", { children: e.module ? `${_t[e.module]}更新` : e.published ? "全部更新" : "仅存报告" }),
							/* @__PURE__ */ (0, b.jsx)("td", { children: P(n.cash) }),
							/* @__PURE__ */ (0, b.jsx)("td", { children: P(n.investments) }),
							/* @__PURE__ */ (0, b.jsx)("td", { children: P(n.debt) }),
							/* @__PURE__ */ (0, b.jsx)("td", { children: P(n.netWorth) }),
							/* @__PURE__ */ (0, b.jsx)("td", { children: /* @__PURE__ */ (0, b.jsxs)("div", {
								className: "data-actions",
								children: [/* @__PURE__ */ (0, b.jsx)("button", {
									type: "button",
									className: "secondary-button",
									onClick: () => t(e, "before"),
									children: "导出更新前"
								}), /* @__PURE__ */ (0, b.jsx)("button", {
									type: "button",
									className: "secondary-button",
									onClick: () => t(e, "after"),
									children: "导出更新后"
								})]
							}) })
						] }, e.id);
					}) })]
				})
			}),
			/* @__PURE__ */ (0, b.jsx)("p", {
				className: "review-caption",
				children: "每次保存保留更新前后完整数据，含同周修订。仅存报告不会改变表内看板余额；不同日期的整期更新用于趋势比较。"
			})
		]
	});
}
//#endregion
//#region app/finance-save-model.ts
var zt = "其他页面已更新数据，本页暂停保存；刷新前请先导出本页备份";
function Bt(e) {
	let t = { ...e };
	return delete t._localSave, t;
}
function Vt(e) {
	return e._localSave?.cloudPending === !0;
}
function Ht(e, t, n, r = !1, i = (/* @__PURE__ */ new Date()).toISOString(), a) {
	let o = e.getItem(t), s = null;
	try {
		s = o ? JSON.parse(o) : null;
	} catch {}
	if (a !== void 0 && JSON.stringify(s ? Bt(s) : null) !== a) throw Error(zt);
	let c = Bt(n), l = !s || JSON.stringify(Bt(s)) !== JSON.stringify(c), u = {
		updatedAt: l ? i : s?._localSave?.updatedAt ?? i,
		cloudPending: !r && (l || !!(s && Vt(s)))
	};
	return e.setItem(t, JSON.stringify({
		...c,
		_localSave: u
	})), u;
}
function Ut(e, t, n) {
	let r = e.getItem(t);
	if (!r) return !1;
	let i = JSON.parse(r);
	return JSON.stringify(Bt(i)) === JSON.stringify(Bt(n)) ? (Ht(e, t, i, !0), !0) : !1;
}
function Wt(e) {
	return JSON.stringify({
		data: Bt(e.data),
		snapshots: e.snapshots,
		monthlyArchives: e.monthlyArchives
	});
}
//#endregion
//#region app/salary-model.ts
var Gt = 13e3, Kt = "2026-10";
function qt(e, t, n) {
	return e.map((e) => e.id >= n ? {
		...e,
		salary: t
	} : e);
}
function Jt(e, t, n) {
	return n === 1 ? {
		salary: t,
		records: e
	} : {
		salary: Gt,
		records: qt(e, Gt, Kt)
	};
}
//#endregion
//#region app/page.tsx
var V = [
	"#1f5fbf",
	"#07835f",
	"#b7791f",
	"#6852bd",
	"#c53030",
	"#2b6cb0",
	"#0f766e",
	"#805ad5"
], Yt = [
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
], Xt = [
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
function Zt(e = {}) {
	return Xt.map((t) => ({
		...t,
		actual: e[t.id] ?? 0
	}));
}
var Qt = [
	{
		id: "2026-06",
		label: "2026年6月",
		salary: Gt,
		payday: 10,
		stockIncome: 0,
		otherIncome: 0,
		budgets: Xt.map((e) => ({ ...e }))
	},
	{
		id: "2026-07",
		label: "2026年7月",
		salary: Gt,
		payday: 10,
		stockIncome: 0,
		otherIncome: 0,
		budgets: Zt()
	},
	{
		id: "2026-08",
		label: "2026年8月",
		salary: Gt,
		payday: 10,
		stockIncome: 0,
		otherIncome: 0,
		budgets: Zt()
	},
	{
		id: "2026-09",
		label: "2026年9月",
		salary: Gt,
		payday: 10,
		stockIncome: 0,
		otherIncome: 0,
		budgets: Zt()
	},
	{
		id: "2026-10",
		label: "2026年10月",
		salary: Gt,
		payday: 10,
		stockIncome: 0,
		otherIncome: 0,
		budgets: Zt()
	},
	{
		id: "2026-11",
		label: "2026年11月",
		salary: Gt,
		payday: 10,
		stockIncome: 0,
		otherIncome: 0,
		budgets: Zt()
	},
	{
		id: "2026-12",
		label: "2026年12月",
		salary: Gt,
		payday: 10,
		stockIncome: 0,
		otherIncome: 0,
		budgets: Zt()
	}
], $t = [
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
], en = [
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
], tn = [
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
], nn = [
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
], rn = [
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
], an = [
	"应急",
	"旅行",
	"搬家",
	"分期",
	"投资",
	"家庭",
	"其他"
], on = [
	{
		id: "hard-emergency",
		name: "硬应急金",
		kind: "应急",
		target: 4500,
		current: 0,
		dueDate: "2026-07-31",
		locked: !0,
		note: "最低 1 个月必要支出，禁止挪作投资"
	},
	{
		id: "moving-2026-08",
		name: "8月搬家",
		kind: "搬家",
		target: 1e3,
		current: 0,
		dueDate: "2026-08-15",
		locked: !0,
		note: "8月中旬预计支出"
	},
	{
		id: "travel-2026-10",
		name: "10月大旅行",
		kind: "旅行",
		target: 8e3,
		current: 0,
		dueDate: "2026-10-01",
		locked: !0,
		note: "总共两次大旅行之一"
	},
	{
		id: "travel-2026-12",
		name: "12月大旅行",
		kind: "旅行",
		target: 8e3,
		current: 0,
		dueDate: "2026-12-01",
		locked: !0,
		note: "总共两次大旅行之一"
	},
	{
		id: "phone-installment",
		name: "手机三期分期",
		kind: "分期",
		target: 2490,
		current: 0,
		dueDate: "2026-10-31",
		locked: !0,
		note: "8-10月，每期约 830"
	},
	{
		id: "small-trips",
		name: "小旅行上限",
		kind: "旅行",
		target: 3e3,
		current: 0,
		dueDate: "2026-12-31",
		locked: !1,
		note: "最多两次，每次约 1500；现金紧张时取消"
	}
], sn = [
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
], cn = [
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
], ln = "2026-06", un = "personal-finance-management-data-v2", dn = "personal-finance-management-snapshots-v1", fn = "personal-finance-management-monthly-archives-v1", pn = "personal-finance-management-cloud-sync-v1", mn = "personal-finance-management-cloud-passphrase-v1", hn = "personal-finance-management-sync.json", gn = 20, _n = 48, vn = [
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
		desc: "当前预算与可自由动用现金"
	},
	{
		id: "accounts",
		title: "账户管理",
		desc: "银行卡、支付宝、微信、现金余额可编辑"
	},
	{
		id: "budget",
		title: "预算管理",
		desc: "完整月度与年度分配、月份现金流"
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
		title: "应急&学习金",
		desc: "应急储备覆盖与每月学习用途分开核算"
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
		id: "fundBuckets",
		title: "大花费项目",
		desc: "旅行、搬家、分期、应急金和待投资金隔离"
	},
	{
		id: "reports",
		title: "财务报表",
		desc: "收入、支出、结余、投资表现"
	},
	{
		id: "periodReview",
		title: "周期复盘",
		desc: "九类数据更新、周月季度对比和下期动作"
	},
	{
		id: "monthlyArchive",
		title: "月度存档",
		desc: "保存每月收入、支出、账户余额和净资产变化"
	},
	{
		id: "cloudSync",
		title: "云同步",
		desc: "用加密 GitHub Gist 跨电脑保存和恢复数据"
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
function H(e) {
	return new Intl.NumberFormat("zh-CN", {
		style: "currency",
		currency: "CNY",
		maximumFractionDigits: 0
	}).format(Number.isFinite(e) ? e : 0);
}
function yn(e, t = 0, n = 100) {
	return Math.min(n, Math.max(t, Number.isFinite(e) ? e : t));
}
function bn(e) {
	let t = Number(e);
	return Number.isFinite(t) ? t : 0;
}
function xn(e) {
	return `${yn(e * 100).toFixed(0)}%`;
}
function Sn(e) {
	return Number.isFinite(e) ? `${(e * 100).toFixed(1)}%` : "0.0%";
}
function Cn(e) {
	return e.replace("2026年", "").replace("月", "月");
}
function wn(e, t) {
	let [n, r] = e.split("-"), i = Number(n), a = Number(r);
	if (!Number.isFinite(i) || !Number.isFinite(a)) return e;
	let o = new Date(Date.UTC(i, a - 1 + t, 1));
	return `${o.getUTCFullYear()}-${String(o.getUTCMonth() + 1).padStart(2, "0")}`;
}
function Tn(e) {
	let [t, n] = e.split("-"), r = Number(t), i = Number(n);
	return !Number.isFinite(r) || !Number.isFinite(i) ? e : `${r}年${i}月`;
}
function En(e) {
	return e.salary + Math.max(e.stockIncome, 0) + e.otherIncome;
}
function Dn(e) {
	return e.budgets.reduce((e, t) => e + t.actual, 0);
}
function On(e) {
	let t = `${e.name} ${e.type} ${e.purpose}`.toLowerCase();
	return t.includes("余额宝") && t.includes("8514") || t.includes("a股") ? "aShare" : t.includes("中国银行") && t.includes("8292") || t.includes("美股") || t.includes("us stock") || t.includes("us-stock") ? "usShare" : null;
}
function kn(e) {
	return On(e) !== null;
}
function An(e) {
	let t = `${e.name} ${e.type} ${e.purpose}`.toLowerCase();
	return !kn(e) && (t.includes("旅游") || t.includes("旅行"));
}
function jn(e) {
	let t = `${e.name} ${e.type} ${e.purpose}`.toLowerCase();
	return !kn(e) && (t.includes("学习") || t.includes("教育") || t.includes("成长"));
}
function Mn(e) {
	if (kn(e)) return "投资待投金";
	let t = `${e.name} ${e.type} ${e.purpose}`;
	return /应急|紧急/.test(t) ? "应急储备" : An(e) ? "旅游专项" : jn(e) ? "学习专项" : /伴侣|情侣|共同|父母|家用|家庭/.test(t) ? "家庭专项" : null;
}
function Nn(e) {
	let t = `${e.name} ${e.type} ${e.purpose}`.toLowerCase().replace(/\s+/g, ""), n = e.id === "icbc2616" || t.includes("工行2616"), r = t.includes("微信") || t.includes("现金"), i = t.includes("银行卡") || t.includes("银行") || t.includes("工行"), a = t.includes("余额宝");
	return !n && !r && (i || a);
}
function Pn(e) {
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
		let e = ft(n);
		e === "travel" ? (t.travelCurrent += n.current, t.travelMonthly += n.monthly, t.travelActualMonthly += n.actualMonthly, t.hasTravel = !0) : e === "learning" ? (t.learningCurrent += n.current, t.learningMonthly += n.monthly, t.learningActualMonthly += n.actualMonthly, t.hasLearning = !0) : e === "parent" ? (t.parentCurrent += n.current, t.parentMonthly += n.monthly, t.parentActualMonthly += n.actualMonthly, t.hasParent = !0) : e === "partner" ? (t.partnerCurrent += n.current, t.partnerMonthly += n.monthly, t.partnerActualMonthly += n.actualMonthly, t.hasPartner = !0) : e === "emergency" ? (t.emergencyCurrent += n.current, t.emergencyMonthly += n.monthly, t.emergencyActualMonthly += n.actualMonthly, t.hasEmergency = !0) : e === "other" && (t.otherCurrent += n.current, t.otherMonthly += n.monthly, t.otherActualMonthly += n.actualMonthly);
	}
	return t;
}
function Fn(e, t) {
	let n = e.find((e) => ft(e) === "emergency")?.id, r = t.rows.find((e) => e.id === "emergency")?.[t.mode] ?? 0;
	return e.map((e) => ft(e) === "emergency" ? {
		...e,
		monthly: e.id === n ? r : 0
	} : e);
}
function In(e) {
	let t = (Array.isArray(e) ? e : []).map((e, t) => {
		if (!e || typeof e != "object") return null;
		let n = e, r = typeof n.monthly == "number" ? n.monthly : 0;
		return {
			id: typeof n.id == "string" && n.id.trim() ? n.id : `goal-${t}`,
			name: typeof n.name == "string" && n.name.trim() ? n.name : `目标 ${t + 1}`,
			target: typeof n.target == "number" ? n.target : 0,
			current: typeof n.current == "number" ? n.current : 0,
			monthly: r,
			actualMonthly: typeof n.actualMonthly == "number" ? n.actualMonthly : r,
			...n.parentReviewAmounts === void 0 ? {} : { parentReviewAmounts: gt(n.parentReviewAmounts) }
		};
	}).filter((e) => e !== null), n = t.length ? t : rn, r = n.some((e) => ft(e) === "parent") ? n : (() => {
		let e = rn.find((e) => e.id === "parent-saving");
		return e ? [...n, e] : n;
	})();
	if (r.some((e) => ft(e) === "partner")) return r;
	let i = rn.find((e) => e.id === "partner");
	return i ? [...r, i] : r;
}
function Ln(e) {
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
function Rn(e) {
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
function zn(e) {
	return Array.isArray(e) ? e.map((e, t) => {
		if (!e || typeof e != "object") return null;
		let n = e, r = an.includes(n.kind) ? n.kind : "其他";
		return {
			id: typeof n.id == "string" && n.id ? n.id : `fund-bucket-${t + 1}`,
			name: typeof n.name == "string" && n.name.trim() ? n.name : `大花费项目 ${t + 1}`,
			kind: r,
			target: typeof n.target == "number" ? n.target : 0,
			current: typeof n.current == "number" ? n.current : 0,
			dueDate: typeof n.dueDate == "string" && n.dueDate ? n.dueDate : "2026-12-31",
			locked: typeof n.locked == "boolean" ? n.locked : !0,
			note: typeof n.note == "string" ? n.note : "",
			fundingAccountId: typeof n.fundingAccountId == "string" ? n.fundingAccountId : ""
		};
	}).filter((e) => e !== null) : [];
}
function Bn(e) {
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
function Vn(e) {
	return Array.isArray(e) ? e.map((e, t) => {
		if (!e || typeof e != "object") return null;
		let n = e, r = typeof n.monthId == "string" && n.monthId ? n.monthId : "";
		return r ? {
			id: typeof n.id == "string" && n.id ? n.id : `${r}-${t}`,
			monthId: r,
			label: typeof n.label == "string" && n.label ? n.label : Tn(r),
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
			accounts: Bn(n.accounts)
		} : null;
	}).filter((e) => e !== null).sort((e, t) => t.monthId.localeCompare(e.monthId) || t.savedAt.localeCompare(e.savedAt)).slice(0, _n) : [];
}
function Hn(e) {
	if (!e || typeof e != "object") return {
		gistId: "",
		token: "",
		autoSync: !1,
		rememberPassphrase: !1
	};
	let t = e;
	return {
		gistId: typeof t.gistId == "string" ? t.gistId : "",
		token: typeof t.token == "string" ? t.token : "",
		autoSync: !!t.autoSync,
		rememberPassphrase: !!t.rememberPassphrase,
		lastPushedAt: typeof t.lastPushedAt == "string" ? t.lastPushedAt : void 0,
		lastPulledAt: typeof t.lastPulledAt == "string" ? t.lastPulledAt : void 0
	};
}
function Un(e) {
	return en.map((t) => ({
		...t,
		amount: t.id === "house-debt" ? e.houseDebt ?? 0 : t.id === "car-debt" ? e.carDebt ?? 0 : e.otherDebt ?? 0
	}));
}
function Wn(e, t) {
	let [n, r] = e.split("-"), [i, a] = t.split("-"), o = Number(n), s = Number(r), c = Number(i), l = Number(a);
	return [
		o,
		s,
		c,
		l
	].every(Number.isFinite) ? Math.max(1, (c - o) * 12 + l - s + 1) : 1;
}
function Gn(e) {
	return new Date(e).toLocaleString("zh-CN", {
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
		hour: "2-digit",
		minute: "2-digit"
	});
}
function Kn(e) {
	return e > 0 ? `+${H(e)}` : e < 0 ? `-${H(Math.abs(e))}` : H(0);
}
function qn(e) {
	return e > 0 ? "positive" : e < 0 ? "negative" : "calculated-cell";
}
function Jn(e) {
	return [...e].sort((e, t) => e.monthId.localeCompare(t.monthId) || e.savedAt.localeCompare(t.savedAt));
}
function Yn(e, t) {
	return Jn(e).filter((e) => e.monthId < t).at(-1);
}
function Xn(e) {
	let t = "";
	for (let n = 0; n < e.length; n += 1) t += String.fromCharCode(e[n]);
	return window.btoa(t);
}
function Zn(e) {
	let t = window.atob(e), n = new Uint8Array(t.length);
	for (let e = 0; e < t.length; e += 1) n[e] = t.charCodeAt(e);
	return n;
}
async function Qn(e, t, n) {
	let r = new TextEncoder().encode(e), i = await window.crypto.subtle.importKey("raw", r, "PBKDF2", !1, ["deriveKey"]);
	return window.crypto.subtle.deriveKey({
		name: "PBKDF2",
		hash: "SHA-256",
		salt: t,
		iterations: n
	}, i, {
		name: "AES-GCM",
		length: 256
	}, !1, ["encrypt", "decrypt"]);
}
async function $n(e, t) {
	let n = window.crypto.getRandomValues(new Uint8Array(16)), r = window.crypto.getRandomValues(new Uint8Array(12)), i = 18e4, a = await Qn(t, n, i), o = new TextEncoder().encode(JSON.stringify(e)), s = await window.crypto.subtle.encrypt({
		name: "AES-GCM",
		iv: r
	}, a, o);
	return {
		version: 1,
		app: "personal-finance-management",
		encryptedAt: (/* @__PURE__ */ new Date()).toISOString(),
		kdf: {
			name: "PBKDF2",
			hash: "SHA-256",
			iterations: i,
			salt: Xn(n)
		},
		cipher: {
			name: "AES-GCM",
			iv: Xn(r),
			data: Xn(new Uint8Array(s))
		}
	};
}
async function er(e, t) {
	if (e.app !== "personal-finance-management" || e.version !== 1) throw Error("invalid cloud backup");
	let n = await Qn(t, Zn(e.kdf.salt), e.kdf.iterations), r = await window.crypto.subtle.decrypt({
		name: "AES-GCM",
		iv: Zn(e.cipher.iv)
	}, n, Zn(e.cipher.data));
	return JSON.parse(new TextDecoder().decode(r));
}
async function tr(e, t, n = {}) {
	let r = await window.fetch(`https://api.github.com${e}`, {
		...n,
		headers: {
			Accept: "application/vnd.github+json",
			Authorization: `Bearer ${t}`,
			"Content-Type": "application/json",
			"X-GitHub-Api-Version": "2022-11-28",
			...n.headers
		}
	});
	if (!r.ok) {
		let e = await r.text();
		throw Error(e || `GitHub request failed: ${r.status}`);
	}
	return await r.json();
}
async function nr({ backup: e, gistId: t, passphrase: n, token: r }) {
	let i = await $n(e, n), a = {
		description: "Personal Finance Management encrypted sync data",
		public: !1,
		files: { [hn]: { content: JSON.stringify(i, null, 2) } }
	};
	return t.trim() ? tr(`/gists/${t.trim()}`, r, {
		method: "PATCH",
		body: JSON.stringify({ files: a.files })
	}) : tr("/gists", r, {
		method: "POST",
		body: JSON.stringify(a)
	});
}
async function rr(e, t, n) {
	let r = await tr(`/gists/${e.trim()}`, t), i = r.files?.[hn] ?? Object.values(r.files ?? {})[0];
	if (!i?.content) throw Error("cloud sync file not found");
	return er(JSON.parse(i.content), n);
}
function ir({ label: e, value: t, onChange: n, step: r = 100, disabled: i = !1 }) {
	return /* @__PURE__ */ (0, b.jsxs)("label", {
		className: "field",
		children: [/* @__PURE__ */ (0, b.jsx)("span", { children: e }), /* @__PURE__ */ (0, b.jsx)("input", {
			disabled: i,
			inputMode: "decimal",
			min: "0",
			step: r,
			type: "number",
			value: Number.isFinite(t) ? t : 0,
			onChange: (e) => n(bn(e.target.value))
		})]
	});
}
function ar() {
	let e = Ge(), [t, n] = (0, _.useState)(C), [r, i] = (0, _.useState)([]), [a, o] = (0, _.useState)([]), [s, c] = (0, _.useState)(), [l, u] = (0, _.useState)([]), [d, f] = (0, _.useState)(x), [p, m] = (0, _.useState)(!1), [h, g] = (0, _.useState)([]), [v, y] = (0, _.useState)(null), [S, w] = (0, _.useState)("月"), [T, te] = (0, _.useState)("2026-06"), [D, ne] = (0, _.useState)(Qt), [O, ae] = (0, _.useState)(Yt), [A, ce] = (0, _.useState)($t), [le, ue] = (0, _.useState)(7.25), [j, de] = (0, _.useState)(.93), [fe, pe] = (0, _.useState)(2250), [me, he] = (0, _.useState)(1500), [ge, _e] = (0, _.useState)(0), [N, ve] = (0, _.useState)(3e3), [ye, be] = (0, _.useState)(500), [xe, Se] = (0, _.useState)(2e3), F = t.emergencyTargetMonths, Ee = t.emergencyMonthlyNeed, De = (e) => n((t) => E({
		...t,
		emergencyTargetMonths: e
	})), I = (e) => n((t) => E({
		...t,
		emergencyMonthlyNeed: e
	})), [Oe, ke] = (0, _.useState)(tn), [Ae, Me] = (0, _.useState)(en), [Ne, Pe] = (0, _.useState)(nn), [Fe, Ie] = (0, _.useState)(rn), Le = mt(Fn(Fe, t), O), [Re, ze] = (0, _.useState)(on), [Be, Ve] = (0, _.useState)(sn), [He, Ue] = (0, _.useState)([]), [We, Ke] = (0, _.useState)([]), [qe, Je] = (0, _.useState)([]), [Xe, Ze] = (0, _.useState)([]), [et, tt] = (0, _.useState)({
		gistId: "",
		token: "",
		autoSync: !1,
		rememberPassphrase: !1
	}), [nt, rt] = (0, _.useState)(""), [it, at] = (0, _.useState)("未连接云同步"), [L, lt] = (0, _.useState)(!1), [ut, dt] = (0, _.useState)(!1), [pt, z] = (0, _.useState)("正在读取本地数据…"), [ht, gt] = (0, _.useState)("报告随数据自动更新"), [B, vt] = (0, _.useState)(!1), yt = (0, _.useRef)(null), xt = (0, _.useRef)(!1), Ct = (0, _.useRef)(!1), wt = (0, _.useRef)(""), Tt = (0, _.useRef)(void 0), Dt = (0, _.useRef)(null);
	function jt() {
		return {
			salarySettingsVersion: 1,
			annualBudgetPlan: t,
			financeReviews: r,
			reviewUpdates: a,
			dashboardAsOf: s,
			datedEntries: l,
			monthlyCashPlan: d,
			period: S,
			selectedMonth: T,
			monthlyRecords: D,
			accounts: O,
			holdings: A,
			fxUsd: le,
			fxHkd: j,
			aSharePlan: fe,
			usSharePlan: me,
			hkSharePlan: ge,
			travelSaving: N,
			learningSaving: ye,
			emergencyFund: xe,
			emergencyMonths: F,
			emergencyMonthlyNeed: Ee,
			balanceAssets: Oe,
			liabilities: Ae,
			reminders: Ne,
			goals: mt(Fn(Fe, t), O),
			fundBuckets: Re,
			futureCapabilities: Be,
			cashflowHiddenBuiltinIds: He,
			cashflowCustomItems: We
		};
	}
	function Mt(e = jt(), t = !1) {
		let n = Ht(window.localStorage, un, e, t, void 0, Tt.current);
		return Tt.current = JSON.stringify(Bt(e)), n;
	}
	function Nt(e = {}) {
		return {
			version: 1,
			exportedAt: (/* @__PURE__ */ new Date()).toISOString(),
			data: e.data ?? jt(),
			snapshots: e.snapshots ?? qe,
			monthlyArchives: e.monthlyArchives ?? Xe
		};
	}
	function Ft(e, t = nt) {
		tt(e), window.localStorage.setItem(pn, JSON.stringify(e)), e.rememberPassphrase ? t.trim() && window.localStorage.setItem(mn, t) : window.localStorage.removeItem(mn);
	}
	function Gt(e) {
		let t = It(e.reviewUpdates), r = e.financeReviews === void 0 ? void 0 : je(e.financeReviews), a = Ye(e.datedEntries), s = E(e.annualBudgetPlan), l = Jt(Array.isArray(e.monthlyRecords) ? e.monthlyRecords : Qt, s.salary, e.salarySettingsVersion);
		o(t), c(e.dashboardAsOf), n({
			...s,
			salary: l.salary
		}), r && i(r), f({
			...ee(e.monthlyCashPlan),
			income: l.salary
		}), e.period && w(e.period), e.selectedMonth && te(e.selectedMonth), ne($e(l.records, e.monthlyRecords ?? Qt, a)), u(a), Array.isArray(e.accounts) && ae(e.accounts), Array.isArray(e.holdings) && ce(e.holdings), typeof e.fxUsd == "number" && ue(e.fxUsd), typeof e.fxHkd == "number" && de(e.fxHkd), typeof e.aSharePlan == "number" && pe(e.aSharePlan), typeof e.usSharePlan == "number" && he(e.usSharePlan), typeof e.hkSharePlan == "number" && _e(e.hkSharePlan), typeof e.travelSaving == "number" && ve(e.travelSaving), typeof e.learningSaving == "number" && be(e.learningSaving), typeof e.emergencyFund == "number" && Se(e.emergencyFund);
		let d = Rn(e.balanceAssets);
		Array.isArray(e.balanceAssets) && ke(d);
		let p = Ln(e.liabilities);
		Array.isArray(e.liabilities) ? Me(p) : (typeof e.houseDebt == "number" || typeof e.carDebt == "number" || typeof e.otherDebt == "number") && Me(Un(e)), Array.isArray(e.reminders) && Pe(e.reminders), Array.isArray(e.goals) && Ie(In(e.goals)), Array.isArray(e.fundBuckets) && ze(zn(e.fundBuckets)), Array.isArray(e.futureCapabilities) && Ve(e.futureCapabilities), Array.isArray(e.cashflowHiddenBuiltinIds) && Ue(e.cashflowHiddenBuiltinIds.filter((e) => cn.includes(e))), Array.isArray(e.cashflowCustomItems) && Ke(e.cashflowCustomItems);
	}
	(0, _.useEffect)(() => {
		let e = !1, t = window.setTimeout(() => {
			(async () => {
				let t = !1, n = !1, r = Hn(null), i = "";
				try {
					let e = window.localStorage.getItem(un), a = window.localStorage.getItem(dn), o = window.localStorage.getItem(fn), s = window.localStorage.getItem(pn);
					if (i = window.localStorage.getItem(mn) ?? "", e) {
						let r = JSON.parse(e);
						Tt.current = JSON.stringify(Bt(r)), Gt(r), t = !0, n = Vt(r);
					}
					if (a) {
						let e = JSON.parse(a);
						Array.isArray(e) && Je(e.slice(0, gn));
					}
					o && Ze(Vn(JSON.parse(o))), s && (r = Hn(JSON.parse(s)), tt(r), r.rememberPassphrase && i && rt(i), at(r.gistId ? "已读取云同步配置，准备连接云端" : "未连接云同步"));
				} catch {
					z("本地数据读取失败，原数据已保留；已暂停自动保存，请先恢复有效备份后刷新。");
					return;
				}
				let a = r.gistId.trim() && r.token.trim() && r.rememberPassphrase && !!i.trim();
				if (Ct.current = n && !!r.gistId.trim(), a && n) Ct.current = !0, z("已恢复本机修改，尚未同步云端"), at("本机有未同步修改，已保留；请保存到云端，或核对后手动拉取。");
				else if (a) {
					xt.current = !0, lt(!0), at("正在打开时自动拉取云端数据…");
					try {
						let t = await rr(r.gistId, r.token, i);
						if (e) return;
						Qn(t);
						let n = (/* @__PURE__ */ new Date()).toISOString();
						Ft({
							...r,
							lastPulledAt: n
						}, i), z("已从云端自动恢复最新数据"), at(`云端数据已自动拉取 · ${Gn(n)}`);
					} catch {
						Ct.current = !0, e || (z(t ? "已恢复本机数据，云端自动拉取失败" : "已启用自动保存，云端自动拉取失败"), at("打开时自动拉取失败，请检查同步密码、Token 和 Gist ID。"));
					} finally {
						xt.current = !1, e || lt(!1);
					}
				} else z(t ? "已恢复上次保存的数据" : "已启用自动保存"), t || Mt(jt(), !0);
				e || vt(!0);
			})();
		}, 0);
		return () => {
			e = !0, window.clearTimeout(t);
		};
	}, []);
	let Kt = (0, _.useEffectEvent)(() => {
		if (!B || Ct.current || xt.current || !et.autoSync || !et.gistId.trim() || !et.token.trim() || !nt.trim()) return;
		let e = Nt();
		Wt(e) !== wt.current && $n(!0, e);
	}), Zt = (0, _.useEffectEvent)(() => {
		if (B) try {
			Mt(), z(`本机已自动保存 · ${(/* @__PURE__ */ new Date()).toLocaleTimeString("zh-CN", {
				hour: "2-digit",
				minute: "2-digit",
				second: "2-digit"
			})}`);
		} catch (e) {
			z(e instanceof Error && e.message === "其他页面已更新数据，本页暂停保存；刷新前请先导出本页备份" ? zt : "本机保存失败，请立即导出备份");
		}
	});
	(0, _.useEffect)(() => {
		if (!B) return;
		let e = window.setInterval(() => {
			Zt(), Kt();
		}, 3e4), t = () => Zt(), n = () => {
			document.visibilityState === "hidden" && Zt();
		};
		return window.addEventListener("pagehide", t), document.addEventListener("visibilitychange", n), () => {
			window.clearInterval(e), window.removeEventListener("pagehide", t), document.removeEventListener("visibilitychange", n);
		};
	}, [B]), (0, _.useEffect)(() => {
		if (!B) return;
		let e = window.setTimeout(() => {
			Zt(), yt.current && window.clearTimeout(yt.current), yt.current = window.setTimeout(() => Kt(), 3500);
		}, 300);
		return () => {
			window.clearTimeout(e), yt.current && window.clearTimeout(yt.current);
		};
	}, [
		B,
		t,
		r,
		a,
		s,
		l,
		d,
		S,
		T,
		D,
		O,
		A,
		le,
		j,
		fe,
		me,
		ge,
		N,
		ye,
		xe,
		F,
		Ee,
		Oe,
		Ae,
		Ne,
		Fe,
		Re,
		Be,
		He,
		We,
		et.autoSync,
		et.gistId,
		et.token,
		nt
	]);
	async function an() {
		if (!(!B || xt.current)) try {
			let e = Nt();
			Mt(e.data), z(`本机已保存 · ${Gn((/* @__PURE__ */ new Date()).toISOString())}`), et.token.trim() && nt.trim() ? z(await $n(!1, e) ? "当前数据已保存到本机和云端" : "本机已保存，云端未更新") : at("未连接云同步，仅保存到本机");
		} catch (e) {
			z(e instanceof Error && e.message === "其他页面已更新数据，本页暂停保存；刷新前请先导出本页备份" ? zt : "保存失败，请立即导出备份；本次修改尚未确认保存");
		}
	}
	async function hn() {
		let e = {
			id: `${Date.now()}`,
			createdAt: (/* @__PURE__ */ new Date()).toISOString(),
			data: jt()
		}, t = [e, ...qe].slice(0, gn);
		Je(t), window.localStorage.setItem(dn, JSON.stringify(t)), Mt(e.data), dt(!0), z("历史版本已保存，正在同步云端…"), z(await $n(!1, Nt({
			data: e.data,
			snapshots: t
		})) ? "完整版本已保存并上传云端" : "完整版本已保存到本机，云端未更新");
	}
	function _n(e) {
		window.confirm(`确定恢复 ${Gn(e.createdAt)} 的版本吗？当前数据会被该版本覆盖。`) && (Gt(e.data), Mt(e.data), z("历史版本已恢复并自动保存"));
	}
	function bn(e) {
		let t = qe.filter((t) => t.id !== e);
		Je(t), window.localStorage.setItem(dn, JSON.stringify(t));
	}
	function Sn() {
		let e = Nt(), t = new Blob([JSON.stringify(e, null, 2)], { type: "application/json" }), n = URL.createObjectURL(t), r = document.createElement("a");
		r.href = n, r.download = `personal-finance-backup-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.json`, r.click(), URL.revokeObjectURL(n), z("备份文件已导出");
	}
	function kn(e, t) {
		let n = {
			...e[t],
			reviewUpdates: a
		}, r = URL.createObjectURL(new Blob([JSON.stringify(Nt({ data: n }), null, 2)], { type: "application/json" })), i = document.createElement("a");
		i.href = r, i.download = `finance-${e.asOf}-${t}-${e.id.replace(/[^a-zA-Z0-9-]/g, "_")}.json`, i.click(), window.setTimeout(() => URL.revokeObjectURL(r), 1e3);
	}
	async function Bn(e) {
		try {
			let t = JSON.parse(await e.text());
			if (!t.data || !Array.isArray(t.data.accounts) || !Array.isArray(t.data.monthlyRecords)) throw Error("invalid backup");
			if (Gt(t.data), Mt(t.data), Array.isArray(t.snapshots)) {
				let e = t.snapshots.slice(0, gn);
				Je(e), window.localStorage.setItem(dn, JSON.stringify(e));
			}
			if (Array.isArray(t.monthlyArchives)) {
				let e = Vn(t.monthlyArchives);
				Ze(e), window.localStorage.setItem(fn, JSON.stringify(e));
			}
			z("备份已导入并自动保存");
		} catch {
			window.alert("无法导入：请选择由本网页导出的 JSON 备份文件。");
		} finally {
			Dt.current && (Dt.current.value = "");
		}
	}
	function qn(e) {
		Ft({
			...et,
			...e
		});
	}
	function Xn(e) {
		rt(e), et.rememberPassphrase && (e.trim() ? window.localStorage.setItem(mn, e) : window.localStorage.removeItem(mn));
	}
	function Zn() {
		Ft({
			gistId: "",
			token: "",
			autoSync: !1,
			rememberPassphrase: !1
		}), rt(""), at("已断开云同步配置");
	}
	function Qn(e) {
		Gt(e.data);
		let t = Array.isArray(e.snapshots) ? e.snapshots.slice(0, gn) : [], n = Vn(e.monthlyArchives);
		Je(t), Ze(n), Mt(e.data, !0), window.localStorage.setItem(dn, JSON.stringify(t)), window.localStorage.setItem(fn, JSON.stringify(n)), wt.current = Wt(e), Ct.current = !1;
	}
	async function $n(e = !1, t = Nt()) {
		if (!B || xt.current) return !1;
		if (!et.token.trim()) return e || (g((e) => e.includes("cloudSync") ? e : [...e, "cloudSync"]), window.alert("请先填写 GitHub Token。")), !1;
		if (!nt.trim()) return e || (g((e) => e.includes("cloudSync") ? e : [...e, "cloudSync"]), window.alert("请先填写同步密码。这个密码用于加密云端数据。")), !1;
		xt.current = !0, lt(!0), e || at("正在加密并上传到 GitHub Gist…");
		try {
			Mt(t.data);
			let n = await nr({
				backup: t,
				gistId: et.gistId,
				passphrase: nt,
				token: et.token
			}), r = (/* @__PURE__ */ new Date()).toISOString();
			Ft({
				...et,
				gistId: n.id,
				lastPushedAt: r
			}), wt.current = Wt(t), Ct.current = !1;
			let i = Ut(window.localStorage, un, t.data);
			return at(i ? `${e ? "已自动云同步" : "云端保存完成"} · ${Gn(r)}` : "上一版已上传，最新本机修改待同步"), i;
		} catch (t) {
			return at("云端保存失败，请检查 Token、Gist ID 和网络。"), e || window.alert(t instanceof Error ? t.message : "云端保存失败"), !1;
		} finally {
			xt.current = !1, lt(!1);
		}
	}
	async function er() {
		if (!xt.current) {
			if (!et.gistId.trim()) {
				window.alert("请先填写 Gist ID，或先上传一次创建云端存档。");
				return;
			}
			if (!et.token.trim()) {
				window.alert("请先填写 GitHub Token。");
				return;
			}
			if (!nt.trim()) {
				window.alert("请先填写同步密码。");
				return;
			}
			if (window.confirm("确定从云端覆盖当前本机数据吗？建议覆盖前先导出备份。")) {
				xt.current = !0, lt(!0), at("正在从 GitHub Gist 拉取并解密…");
				try {
					Qn(await rr(et.gistId, et.token, nt));
					let e = (/* @__PURE__ */ new Date()).toISOString();
					Ft({
						...et,
						lastPulledAt: e
					}), z("已从云端恢复并自动保存到本机"), at(`云端数据已拉取 · ${Gn(e)}`);
				} catch (e) {
					at("云端拉取失败，请检查同步密码、Token 和 Gist ID。"), window.alert(e instanceof Error ? e.message : "云端拉取失败");
				} finally {
					xt.current = !1, lt(!1);
				}
			}
		}
	}
	let tr = D.find((e) => e.id === T) ?? D[0], ar = tr.salary, G = tr.stockIncome, ur = tr.otherIncome, dr = tr.budgets, fr = ar + Math.max(G, 0) + ur, pr = ie(t), K = pr[t.mode], Nr = t.mode === "normal" ? "普通月" : "出差月", Kr = re(t, We), qr = O.filter((e) => e.includedInPersonal !== !1), Jr = !!s || a.some((e) => e.published && e.module === "accounts"), Yr = se(qr.map((e) => ({
		...e,
		reserve: Mn(e)
	})), Re), Xr = qr.filter((e) => Mn(e) === "应急储备"), q = (() => {
		let e = qr.reduce((e, t) => e + t.balance, 0), n = qr.filter(Nn), r = n.reduce((e, t) => e + t.balance, 0), i = qr.filter((e) => On(e) === "aShare").reduce((e, t) => e + t.balance, 0), a = qr.filter((e) => On(e) === "usShare").reduce((e, t) => e + t.balance, 0), o = i + a, s = qr.filter(An).reduce((e, t) => e + t.balance, 0), c = qr.filter(jn).reduce((e, t) => e + t.balance, 0), l = s + c, u = Pn(Le), d = qr.some(An) || Jr ? s : u.hasTravel ? u.travelCurrent : N, f = qr.some(jn) || Jr ? c : u.hasLearning ? u.learningCurrent : ye, p = Xr.length ? Xr.reduce((e, t) => e + t.balance, 0) : Jr ? 0 : u.hasEmergency ? u.emergencyCurrent : xe, m = u.parentCurrent, h = u.partnerCurrent, g = Jr ? 0 : u.otherCurrent, _ = h, v = d + f + g, y = Jr ? 0 : Math.max(0, v - l), b = e - o - l - (Xr.length ? p : 0), x = qr.filter((e) => e.liquid).reduce((e, t) => e + t.balance, 0), S = dr.reduce((e, t) => e + t.actual, 0), ee = At(fr, S, t), C = dr.reduce((e, t) => e + t.plan, 0), w = ee.remaining, T = dr.filter((e) => e.fixed).reduce((e, t) => e + t.plan, 0), te = dr.filter((e) => e.required).reduce((e, t) => e + t.plan, 0), E = M({
			holdings: A,
			fxUsd: le,
			fxHkd: j
		}), D = A.reduce((e, t) => e + or(t.cost, t.currency, le, j), 0), ne = A.filter((e) => e.market === "A股").reduce((e, t) => e + or(t.value, t.currency, le, j), 0), re = A.filter((e) => e.market === "美股").reduce((e, t) => e + or(t.value, t.currency, le, j), 0), ie = A.filter((e) => e.market === "港股").reduce((e, t) => e + or(t.value, t.currency, le, j), 0), O = Oe.reduce((e, t) => e + t.amount, 0), ae = Ae.reduce((e, t) => e + t.amount, 0), oe = e + E + y + (Xr.length ? 0 : p) + O, k = We.filter((e) => e.direction === "outflow").reduce((e, t) => e + t.amount, 0), se = (e, t) => He.includes(e) ? 0 : t, ce = se("spendingPlan", C), ue = u.hasTravel ? u.travelActualMonthly : N, de = u.hasLearning ? u.learningActualMonthly : ye, pe = u.hasParent ? u.parentActualMonthly : 0, he = u.hasPartner ? u.partnerActualMonthly : 0, _e = u.hasEmergency ? u.emergencyActualMonthly : 0, ve = u.hasTravel ? u.travelMonthly : N, be = u.hasLearning ? u.learningMonthly : ye, P = u.hasParent ? u.parentMonthly : 0, Se = u.hasPartner ? u.partnerMonthly : 0, Ce = t.rows.find((e) => e.id === "emergency")?.[t.mode] ?? 0, we = se("travelSaving", ue), Te = se("learningSaving", de), De = se("parentSaving", pe), I = se("partnerSaving", he), ke = se("emergencyFund", _e), je = se("aSharePlan", fe) + se("usSharePlan", me) + se("hkSharePlan", ge), Me = we + Te + De + I + ke + je + k, Ne = ee.surplus, Pe = fr ? T / fr : 0, Fe = fr ? Me / fr : 0, Ie = Math.max(0, Ee), Re = Ie * F, ze = Ie ? p / Ie : 0, Be = oe ? ae / oe : 0, Ve = Math.round(Math.max(0, Math.min(25, 25 - Math.max(0, Pe - .35) * 85)) + Math.min(25, ze / Math.max(F, 1) * 25) + (ae === 0 ? 20 : Math.max(0, 20 - Be * 50)) + Math.min(20, Fe / .45 * 20) + (E >= D ? 10 : 6));
		return {
			accountTotal: e,
			totalSavingsAccountTotal: r,
			totalSavingsAccountCount: n.length,
			operatingAccountTotal: b,
			aShareInvestmentReserve: i,
			usShareInvestmentReserve: a,
			investmentReserve: o,
			accountSpecialSavings: l,
			liquidAccountTotal: x,
			spendingActual: S,
			budgetUsage: ee,
			spendingPlan: C,
			budgetRemaining: w,
			fixedSpending: T,
			requiredSpending: te,
			investmentValue: E,
			investmentCost: D,
			investmentPnL: E - D,
			aShareValue: ne,
			usShareValue: re,
			hkShareValue: ie,
			manualAssetTotal: O,
			cashflowSpendingPlan: ce,
			travelAllocation: we,
			learningAllocation: Te,
			parentAllocation: De,
			partnerAllocation: I,
			emergencyAllocation: ke,
			investmentSavingAllocation: je,
			customOutflow: k,
			travelAllocationSource: ue,
			learningAllocationSource: de,
			parentAllocationSource: pe,
			partnerAllocationSource: he,
			emergencyAllocationSource: _e,
			travelExpectedSource: ve,
			learningExpectedSource: be,
			parentExpectedSource: P,
			partnerExpectedSource: Se,
			emergencyExpectedSource: Ce,
			travelSavings: d,
			learningSavings: f,
			parentSavings: m,
			partnerSavings: h,
			familyFund: _,
			otherSavings: g,
			totalSavings: v,
			savingsOutsideAccounts: y,
			totalDebt: ae,
			totalAssets: oe,
			netWorth: oe - ae,
			assetOutflow: Me,
			monthlySurplus: Ne,
			fixedRatio: Pe,
			savingsRate: Fe,
			emergencyCoverage: ze,
			currentEmergencyFund: p,
			debtRatio: Be,
			score: Ve,
			emergencyMonthlyNeed: Ie,
			emergencyTarget: Re
		};
	})();
	function Zr(e, t) {
		return {
			id: t,
			monthId: T,
			label: tr.label,
			savedAt: e,
			income: fr,
			spending: q.spendingActual,
			allocation: q.budgetUsage.reserved,
			surplus: q.monthlySurplus,
			accountTotal: q.accountTotal,
			totalAssets: q.totalAssets,
			netWorth: q.netWorth,
			totalDebt: q.totalDebt,
			emergencyFund: q.currentEmergencyFund,
			savings: q.totalSavingsAccountTotal,
			accounts: O.map((e) => ({
				id: e.id,
				name: e.name,
				type: e.type,
				balance: e.balance,
				purpose: e.purpose,
				liquid: e.liquid
			}))
		};
	}
	async function Qr() {
		let e = (/* @__PURE__ */ new Date()).toISOString(), t = Vn([Zr(e, `${T}-${e}`), ...Xe.filter((e) => e.monthId !== T)]);
		Ze(t), window.localStorage.setItem(fn, JSON.stringify(t)), g((e) => e.includes("monthlyArchive") ? e : [...e, "monthlyArchive"]), Mt(), z(`${tr.label} 月报已保存，正在同步云端…`), z(await $n(!1, Nt({ monthlyArchives: t })) ? `${tr.label} 月报已保存并上传云端` : `${tr.label} 月报已保存到本机，云端未更新`);
	}
	function $r(e) {
		let t = Xe.filter((t) => t.id !== e);
		Ze(t), window.localStorage.setItem(fn, JSON.stringify(t));
	}
	let ei = Zr("current-preview", `current-${T}`), ti = Xe.find((e) => e.monthId === T), ni = ti ?? ei, ri = Yn(Xe, T), ii = Jn(Vn([ei, ...Xe.filter((e) => e.monthId !== T)])), ai = (() => {
		let e = [], t = Yr.available;
		for (let n = 0; n < 6; n += 1) {
			let r = wn(Ce().slice(0, 7), n + 1), { inflow: i, outflow: a } = Kr;
			t += i - a, e.push({
				month: Cn(Tn(r)),
				inflow: i,
				outflow: a,
				balance: t
			});
		}
		return e;
	})(), oi = (() => {
		let e = Ce().slice(0, 7);
		return [...Ne.map((e) => ({
			date: e.date,
			item: e.name,
			inflow: e.kind === "定存" ? e.amount : 0,
			outflow: e.kind === "定存" ? 0 : e.amount,
			kind: e.kind
		})), {
			date: `${e}-${String(Math.min(Math.max(D.find((t) => t.id === e)?.payday ?? 10, 1), new Date(Number(e.slice(0, 4)), Number(e.slice(5)), 0).getDate())).padStart(2, "0")}`,
			item: "工资计划",
			inflow: t.salary,
			outflow: 0,
			kind: "收入"
		}].filter((e) => e.date >= Ce()).sort((e, t) => e.date.localeCompare(t.date));
	})();
	function si(e, t) {
		ae((n) => n.map((n) => n.id === e ? {
			...n,
			...t
		} : n));
	}
	function ci() {
		let e = O.length + 1;
		ae((t) => [...t, {
			id: `account-${Date.now()}`,
			name: `新账户 ${e}`,
			type: "银行卡",
			balance: 0,
			purpose: "待填写用途",
			liquid: !0
		}]);
	}
	function li(e) {
		ae((t) => t.length > 1 ? t.filter((t) => t.id !== e) : t);
	}
	function ui(e, t) {
		ae((n) => {
			let r = n.findIndex((t) => t.id === e), i = n.findIndex((e) => e.id === t);
			if (r < 0 || i < 0 || r === i) return n;
			let a = [...n], [o] = a.splice(r, 1);
			return a.splice(i, 0, o), a;
		});
	}
	function di(e, t) {
		ne((n) => n.map((n) => n.id === e ? {
			...n,
			...t
		} : n));
	}
	function fi() {
		ne((e) => {
			let n = [...e].sort((e, t) => e.id.localeCompare(t.id)), r = n[n.length - 1] ?? Qt[0], [i, a] = r.id.split("-"), o = new Date(Number(i), Number(a) - 1, 1), s = new Date(o.getFullYear(), o.getMonth() + 1, 1), c = `${s.getFullYear()}-${String(s.getMonth() + 1).padStart(2, "0")}`, l = `${s.getFullYear()}年${s.getMonth() + 1}月`, u = r.budgets.length > 0 ? r.budgets : Xt, d = {
				id: c,
				label: l,
				salary: t.salary,
				payday: r.payday,
				stockIncome: 0,
				otherIncome: 0,
				budgets: st(u)
			};
			return te(c), [...e, d].sort((e, t) => e.id.localeCompare(t.id));
		});
	}
	function pi(e) {
		if (l.some((t) => t.date.startsWith(e + "-"))) {
			window.alert("该月份有日期收支明细，请先处理明细，避免丢失已登记的收支。");
			return;
		}
		ne((t) => {
			if (t.length <= 1) return t;
			let n = [...t].sort((e, t) => e.id.localeCompare(t.id)), r = n.findIndex((t) => t.id === e), i = n.filter((t) => t.id !== e);
			return e === T && te((i[Math.max(0, r - 1)] ?? i[0]).id), i;
		});
	}
	function mi(e) {
		e.salary !== t.salary && (ne((t) => $e(qt(t, e.salary, Ce().slice(0, 7)), t, l)), f((t) => ({
			...t,
			income: e.salary
		}))), n(e);
	}
	function hi() {
		Ke((e) => [...e, {
			id: `cashflow-${Date.now()}`,
			name: `新增现金流 ${e.length + 1}`,
			amount: 0,
			direction: "outflow"
		}]);
	}
	function gi(e, t) {
		Ke((n) => n.map((n) => n.id === e ? {
			...n,
			...t
		} : n));
	}
	function _i(e) {
		Ke((t) => t.filter((t) => t.id !== e));
	}
	function vi(e, t) {
		ne((n) => n.map((n) => n.id === T ? {
			...n,
			budgets: n.budgets.map((n) => n.id === e ? {
				...n,
				...t
			} : n)
		} : n));
	}
	function yi() {
		ne((e) => e.map((e) => e.id === T ? {
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
	function bi(e) {
		if (l.some((t) => t.flow === "expense" && t.categoryId === e && t.date.startsWith(T + "-"))) {
			window.alert("该分类有日期收支明细，请先修改明细分类或删除对应明细。");
			return;
		}
		ne((t) => t.map((t) => t.id === T && t.budgets.length > 1 ? {
			...t,
			budgets: t.budgets.filter((t) => t.id !== e)
		} : t));
	}
	function xi() {
		ne((e) => e.map((e) => e.id === T ? {
			...e,
			budgets: R(e.budgets)
		} : e));
	}
	function Si(e, t, n, r) {
		let i = Qe(D, l, e, t, n, r === "unassigned" ? void 0 : r);
		Mt({
			...jt(),
			monthlyRecords: i.records,
			datedEntries: i.entries
		}), ne(i.records), u(i.entries);
	}
	function Ci(e) {
		let t = Qe(D, l, null, e);
		Mt({
			...jt(),
			monthlyRecords: t.records,
			datedEntries: t.entries
		}), ne(t.records), u(t.entries);
	}
	function wi(e, t) {
		ce((n) => n.map((n) => n.id === e ? {
			...n,
			...t
		} : n));
	}
	function Ti() {
		ce((e) => [...e, {
			id: `holding-${Date.now()}`,
			name: `新投资 ${e.length + 1}`,
			market: "A股",
			cost: 0,
			value: 0,
			currency: "CNY"
		}]);
	}
	function J(e) {
		ce((t) => t.length > 1 ? t.filter((t) => t.id !== e) : t);
	}
	function Ei(e, t) {
		ke((n) => n.map((n) => n.id === e ? {
			...n,
			...t
		} : n));
	}
	function Di() {
		ke((e) => [...e, {
			id: `balance-asset-${Date.now()}`,
			name: `新资产 ${e.length + 1}`,
			amount: 0,
			note: "资产负债表补录"
		}]);
	}
	function Oi(e) {
		ke((t) => t.length > 1 ? t.filter((t) => t.id !== e) : t);
	}
	function ki(e, t) {
		Me((n) => n.map((n) => n.id === e ? {
			...n,
			...t
		} : n));
	}
	function Ai() {
		Me((e) => [...e, {
			id: `liability-${Date.now()}`,
			name: `新负债 ${e.length + 1}`,
			amount: 0
		}]);
	}
	function ji(e) {
		Me((t) => t.length > 1 ? t.filter((t) => t.id !== e) : t);
	}
	function Mi(e, t) {
		Pe((n) => n.map((n) => n.id === e ? {
			...n,
			...t
		} : n));
	}
	function Ni() {
		Pe((e) => [...e, {
			id: `reminder-${Date.now()}`,
			name: `新提醒 ${e.length + 1}`,
			date: "2026-07-01",
			amount: 0,
			kind: "账单"
		}]);
	}
	function Pi(e) {
		Pe((t) => t.length > 1 ? t.filter((t) => t.id !== e) : t);
	}
	function Fi(e, n) {
		n.monthly !== void 0 && Fe.some((t) => t.id === e && ft(t) === "emergency") && mi({
			...t,
			rows: t.rows.map((e) => e.id === "emergency" ? {
				...e,
				normal: n.monthly,
				trip: n.monthly
			} : e)
		}), Ie((t) => t.map((t) => t.id === e ? {
			...t,
			...n
		} : t));
	}
	function Ii(e, t) {
		Ie((n) => {
			let r = n.find((t) => ft(t) === e);
			return r ? n.map((e) => e.id === r.id ? {
				...e,
				...t
			} : e) : n;
		});
	}
	function Li(e) {
		if (Xr.length === 1) {
			si(Xr[0].id, { balance: e });
			return;
		}
		Xr.length > 1 || (Se(e), Ii("emergency", { current: e }));
	}
	function Ri() {
		Ie((e) => [...e, {
			id: `goal-${Date.now()}`,
			name: `新目标 ${e.length + 1}`,
			target: 0,
			current: 0,
			monthly: 0,
			actualMonthly: 0
		}]);
	}
	function zi(e) {
		Ie((t) => t.length > 1 ? t.filter((t) => t.id !== e) : t);
	}
	function Bi(e, t) {
		ze((n) => n.map((n) => n.id === e ? {
			...n,
			...t
		} : n));
	}
	function Vi() {
		ze((e) => [...e, {
			id: `fund-bucket-${Date.now()}`,
			name: `新大花费项目 ${e.length + 1}`,
			kind: "其他",
			target: 0,
			current: 0,
			dueDate: T.length >= 7 ? `${T}-28` : "2026-12-31",
			locked: !0,
			note: "待分配"
		}]);
	}
	function Hi(e) {
		ze((t) => t.length > 1 ? t.filter((t) => t.id !== e) : t);
	}
	function Ui(e, t) {
		Ve((n) => n.map((n) => n.id === e ? {
			...n,
			...t
		} : n));
	}
	function Wi(e) {
		m(!0), g((t) => t.includes(e) ? t.filter((t) => t !== e) : [...t, e]);
	}
	function Gi(e) {
		m(!0), e !== "overview" && g((t) => t.includes(e) ? t : [...t, e]), y({ id: e });
	}
	(0, _.useEffect)(() => {
		if (!v) return;
		let e = window.requestAnimationFrame(() => {
			let e = document.getElementById(`finance-${v.id}`);
			if (!e) return;
			let t = Array.from(document.querySelectorAll(".topbar, .selected-title")).reduce((e, t) => window.getComputedStyle(t).position === "sticky" ? Math.max(e, t.getBoundingClientRect().height) : e, 0);
			e.style.scrollMarginTop = `${t + 16}px`, e.focus({ preventScroll: !0 }), e.scrollIntoView({
				block: "start",
				behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth"
			});
		});
		return () => window.cancelAnimationFrame(e);
	}, [v]);
	function Ki() {
		g(vn.map((e) => e.id));
	}
	let qi = Ae.length ? `${Ae.slice(0, 3).map((e) => `${e.name.trim() || "未命名负债"} ${H(e.amount)}`).join(" / ")}${Ae.length > 3 ? " / 更多" : ""}` : "暂无负债", Ji = [
		`旅游 ${H(q.travelSavings)}`,
		`学习 ${H(q.learningSavings)}`,
		q.otherSavings > 0 ? `其他 ${H(q.otherSavings)}` : ""
	].filter(Boolean).join(" / "), Yi = {
		label: "父母储蓄",
		value: q.parentSavings,
		detail: q.parentSavings > 0 || q.parentAllocation > 0 ? `当前 ${H(q.parentSavings)} / 本月投入 ${H(q.parentAllocation)}` : "目标管理父母储蓄，单独列示",
		color: V[5]
	}, Xi = {
		label: "家庭及伴侣储蓄",
		value: q.familyFund,
		detail: q.familyFund > 0 || q.partnerAllocation > 0 ? `伴侣基金 ${H(q.familyFund)} / 本月家庭投入 ${H(q.partnerAllocation)}` : "家庭共同资金单列，不计入个人总资产",
		color: V[3],
		className: "family-fund-item"
	}, Zi = {
		label: "总负债",
		value: q.totalDebt,
		detail: qi,
		color: V[4],
		className: "debt-breakdown-item"
	}, Qi = [
		q.aShareInvestmentReserve > 0 ? `A股待投 ${H(q.aShareInvestmentReserve)}` : "",
		q.usShareInvestmentReserve > 0 ? `美股待投 ${H(q.usShareInvestmentReserve)}` : "",
		q.accountSpecialSavings > 0 ? `专项 ${H(q.accountSpecialSavings)}` : ""
	].filter(Boolean).join(" / "), $i = Oe.filter((e) => e.amount > 0).slice(0, 3).map((e) => `${e.name.trim() || "未命名资产"} ${H(e.amount)}`).join(" / ") || "来自资产负债表资产项", ea = [
		{
			label: "账户现金",
			value: q.operatingAccountTotal,
			detail: Qi ? `不含 ${Qi}` : "日常账户余额",
			color: V[0]
		},
		{
			label: "A股待投储蓄",
			value: q.aShareInvestmentReserve,
			detail: "余额宝-8514，尚未进A股",
			color: V[6]
		},
		{
			label: "美股待投储蓄",
			value: q.usShareInvestmentReserve,
			detail: "中国银行8292，尚未进美股",
			color: V[5]
		},
		{
			label: "已投资市值",
			value: q.investmentValue,
			detail: `A股 ${H(q.aShareValue)} / 美股 ${H(q.usShareValue)} / 港股 ${H(q.hkShareValue)}`,
			color: V[1]
		},
		{
			label: "个人专项储蓄",
			value: q.totalSavings,
			detail: Ji,
			color: V[3]
		},
		Yi,
		{
			label: "实物资产",
			value: q.manualAssetTotal,
			detail: $i,
			color: V[5]
		},
		{
			label: "应急金",
			value: q.currentEmergencyFund,
			detail: `覆盖 ${q.emergencyCoverage.toFixed(1)} 月 / 目标 ${F} 月`,
			color: V[2]
		}
	], ta = [
		...ea.slice(0, 7),
		Zi,
		...ea.slice(7),
		Xi
	], na = qr.filter((e) => e.balance !== 0).map((e) => ({
		label: e.name.trim() || "未命名账户",
		value: H(e.balance),
		note: e.purpose.trim() || e.type.trim() || "账户"
	})), ra = [
		{
			id: "monthly-overview-income",
			title: "所选月已录收入",
			value: H(fr),
			detail: `${tr.label}（自然月账本） / 工资 ${H(ar)} / 其他及股票收益 ${H(ur + Math.max(G, 0))}`,
			tone: "blue"
		},
		{
			id: "monthly-overview-living",
			title: "所选月支出（含基金预留）",
			value: H(q.budgetUsage.spending),
			detail: `${tr.label} / 实际消费 ${H(q.spendingActual)} + 投资预留 ${H(q.budgetUsage.investment)} + 应急预留 ${H(q.budgetUsage.emergency)}`,
			tone: "green"
		},
		{
			id: "monthly-overview-surplus",
			title: "所选月收支结余",
			value: H(q.monthlySurplus),
			detail: "收入 - 实际消费 - 投资及应急预留；基金每月扣一次，不减少净资产",
			tone: "violet"
		},
		{
			id: "monthly-overview-remaining",
			title: "所选月可花预算剩余",
			value: H(q.budgetUsage.remaining),
			detail: `${Nr}总预算 ${H(q.budgetUsage.budget)} - 含预留支出 ${H(q.budgetUsage.spending)}`,
			tone: q.budgetUsage.remaining < 0 ? "red" : "amber"
		},
		{
			title: "当前账户余额",
			value: H(q.accountTotal),
			detail: `${na.length} 个非零账户 / 可提取 ${H(Yr.liquidCash)} / 扣除专项后可自由动用 ${H(Yr.available)}`,
			tone: Yr.available < 0 ? "red" : "green",
			items: na
		},
		{
			title: "目前总储蓄",
			value: H(q.totalSavingsAccountTotal),
			detail: `${q.totalSavingsAccountCount} 个储蓄账户 / 不含工行2616、微信、现金 / A股待投 ${H(q.aShareInvestmentReserve)} / 美股待投 ${H(q.usShareInvestmentReserve)}`,
			tone: "green"
		},
		{
			title: "目前总应急",
			value: H(q.currentEmergencyFund),
			detail: `覆盖 ${q.emergencyCoverage.toFixed(1)} 个月 / 目标 ${F} 个月`,
			tone: "amber"
		}
	], ia = [
		{
			label: "工资",
			value: ar,
			color: V[0]
		},
		{
			label: "炒股月结",
			value: Math.max(G, 0),
			color: V[1]
		},
		{
			label: "其他收入",
			value: ur,
			color: V[3]
		}
	], aa = D.filter((e) => e.id >= ln).sort((e, t) => e.id.localeCompare(t.id)), oa = aa.map((e, t) => ({
		label: Cn(e.label),
		value: En(e),
		color: e.id === T ? V[0] : V[t % V.length],
		detail: e.id === T ? "当前月" : "月度"
	})), sa = aa.map((e, n) => ({
		label: Cn(e.label),
		value: At(En(e), Dn(e), t).spending,
		color: e.id === T ? V[4] : V[n % V.length],
		detail: "按当前基金预留方案测算"
	})), ca = aa.map((e, n) => ({
		label: Cn(e.label),
		value: At(En(e), Dn(e), t).surplus,
		color: e.id === T ? V[1] : V[n % V.length],
		detail: "已扣当前方案基金预留"
	})), la = qr.map((e, t) => ({
		item: e,
		index: t
	})).sort((e, t) => t.item.balance - e.item.balance || e.index - t.index).map(({ item: e }, t) => ({
		label: e.name.trim() || "未命名账户",
		value: e.balance,
		color: V[t % V.length],
		detail: e.type.trim() || "未分类"
	})), ua = dr.map((e, t) => ({
		item: e,
		index: t
	})).sort((e, t) => t.item.actual - e.item.actual || t.item.plan - e.item.plan || e.index - t.index).map(({ item: e }, t) => ({
		label: e.name.trim() || "未命名支出",
		value: e.actual,
		max: Math.max(e.plan, e.actual, 1),
		color: e.actual > e.plan ? V[4] : V[t % V.length],
		detail: `${H(e.actual)} / ${H(e.plan)}`
	})), da = dr.map((e, t) => ({
		label: e.name.trim() || "未命名支出",
		value: e.actual,
		plan: e.plan,
		color: V[t % V.length],
		detail: `${e.required ? "必须" : "可取消"} / ${e.fixed ? "固定" : "弹性"}`
	})).filter((e) => e.value > 0).sort((e, t) => t.value - e.value), fa = da.length ? da.slice(0, 8).map((e) => ({
		label: e.label,
		value: e.value,
		color: e.color
	})) : [{
		label: "暂无实际支出",
		value: 0,
		max: 1,
		color: "#b8c4d4",
		detail: "本月未记录"
	}], pa = da.map((e) => ({
		label: e.label,
		value: e.value,
		color: e.color,
		detail: `${xn(e.value / Math.max(q.spendingActual, 1))} / ${H(e.value)}`
	})), ma = [{
		label: "必须支出",
		value: q.requiredSpending,
		color: V[1]
	}, {
		label: "可取消支出",
		value: Math.max(q.spendingPlan - q.requiredSpending, 0),
		color: V[2]
	}], ha = Kr.inflow, ga = Kr.outflow, _a = ha - ga, va = [
		{
			id: "builtin-salary",
			name: "工资流入",
			amount: t.salary,
			direction: "inflow",
			source: "与年度工资规划同步；历史实际收入单独保留",
			onAmountChange: (e) => mi({
				...t,
				salary: e
			})
		},
		...t.rows.map((e) => ({
			id: `plan-${e.id}`,
			name: e.name,
			amount: e[t.mode],
			direction: "outflow",
			source: `${Nr}统一预算${e.kind === "consumption" ? "" : "，划拨后仍属个人资产"}`,
			onAmountChange: (n) => mi({
				...t,
				rows: t.rows.map((r) => r.id === e.id ? {
					...r,
					[t.mode]: n
				} : r)
			})
		})),
		...We.map((e) => ({
			id: e.id,
			name: e.name,
			amount: e.amount,
			direction: e.direction,
			source: "预算外追加（不得重复预算内费用）",
			onNameChange: (t) => gi(e.id, { name: t }),
			onAmountChange: (t) => gi(e.id, { amount: t }),
			onDirectionChange: (t) => gi(e.id, { direction: t }),
			onDelete: () => _i(e.id)
		})),
		{
			id: "calculated-cashflow-expected-increase",
			name: "现金流预计增加",
			amount: _a,
			direction: _a >= 0 ? "inflow" : "outflow",
			source: "月流入 - 月流出，自动同步",
			readonlyAmount: !0,
			summaryOnly: !0
		}
	];
	va.filter((e) => e.direction === "outflow" && !e.summaryOnly).map((e, t) => ({
		item: e,
		index: t
	})).sort((e, t) => t.item.amount - e.item.amount || e.index - t.index).map(({ item: e }, t) => ({
		label: e.name,
		value: e.amount,
		color: V[(t + 4) % V.length],
		detail: e.source
	}));
	let ya = ea.map((e, t) => ({
		item: e,
		index: t
	})).sort((e, t) => t.item.value - e.item.value || e.index - t.index).map(({ item: e }) => ({
		label: e.label,
		value: e.value,
		color: e.color
	})), ba = [
		{
			label: "A股",
			value: q.aShareValue,
			color: V[0]
		},
		{
			label: "美股",
			value: q.usShareValue,
			color: V[1]
		},
		{
			label: "港股",
			value: q.hkShareValue,
			color: V[3]
		}
	], xa = A.map((e) => {
		let t = or(e.value, e.currency, le, j), n = or(e.cost, e.currency, le, j);
		return {
			label: e.market,
			value: Math.abs(t - n),
			color: t >= n ? V[1] : V[4],
			detail: `${t >= n ? "浮盈" : "浮亏"} ${H(t - n)}`
		};
	}), Sa = ai.map((e) => ({
		label: e.month,
		value: e.balance
	})), Ca = ai.map((e) => ({
		label: e.month,
		value: e.outflow,
		color: V[4]
	})), wa = [
		{
			label: "可动用起点",
			value: Yr.available,
			kind: "start",
			color: V[0]
		},
		{
			label: "预测收入",
			value: ha,
			kind: "positive",
			color: V[1]
		},
		{
			label: "消费与预留",
			value: -Kr.consumption,
			kind: "negative",
			color: V[4]
		},
		{
			label: "投资与应急",
			value: -Kr.saving,
			kind: "negative",
			color: V[2]
		},
		{
			label: "预算外追加",
			value: -Kr.extraOutflow,
			kind: "negative",
			color: V[4]
		},
		{
			label: "一期后余量",
			value: Yr.available + _a,
			kind: "end",
			color: V[3]
		}
	], Ta = [
		{
			label: "工资",
			value: t.salary,
			kind: "positive",
			color: V[0]
		},
		{
			label: "出差净结余",
			value: K.tripNet,
			kind: K.tripNet < 0 ? "negative" : "positive",
			color: V[1]
		},
		{
			label: "生活消费",
			value: -K.consumption,
			kind: "negative",
			color: V[4]
		},
		{
			label: "投资应急",
			value: -K.saving,
			kind: "negative",
			color: V[2]
		},
		{
			label: "现金余量",
			value: K.surplus,
			kind: "end",
			color: K.surplus < 0 ? V[4] : V[1]
		}
	], Ea = pr.allocationRows.map((e) => ({
		label: e.name,
		value: e[t.mode]
	})).filter((e) => e.value > 0).map((e, t) => ({
		...e,
		color: V[t % V.length]
	})), Da = [
		{
			label: "生活与消费预留",
			value: pr.annualConsumption,
			color: V[0]
		},
		{
			label: "投资本金",
			value: pr.annualInvestment,
			color: V[1]
		},
		{
			label: "新增应急现金",
			value: pr.annualEmergency,
			color: V[2]
		},
		{
			label: "额外现金余量",
			value: Math.max(0, pr.annualSurplus),
			color: V[3]
		}
	], Oa = ai.map((e, t) => ({
		label: e.month,
		value: q.netWorth + (t + 1) * (Kr.inflow - Kr.consumption - Kr.extraOutflow)
	})), ka = [
		{
			label: "总资产",
			value: q.totalAssets,
			color: V[0]
		},
		{
			label: "总负债",
			value: q.totalDebt,
			color: V[4]
		},
		{
			label: "净资产",
			value: Math.max(q.netWorth, 0),
			color: V[1]
		}
	], Aa = Oe.map((e, t) => ({
		label: e.name.trim() || "未命名资产",
		value: e.amount,
		color: V[t % V.length],
		detail: e.note.trim() || H(e.amount)
	})), ja = Ae.map((e, t) => ({
		label: e.name.trim() || "未命名负债",
		value: e.amount,
		color: V[(t + 4) % V.length]
	})), Ma = Fe.map((e, t) => ({
		label: e.name,
		value: e.current,
		max: e.target,
		color: V[t % V.length],
		detail: `预期 ${H(e.monthly)} / 实际 ${H(e.actualMonthly)}`
	})), Na = Fe.reduce((e, t) => e + t.current, 0), Pa = Fe.reduce((e, t) => e + t.target, 0), Fa = Le.reduce((e, t) => e + t.monthly, 0), Ia = Fe.reduce((e, t) => e + t.actualMonthly, 0), La = Math.max(0, aa.findIndex((e) => e.id === T)), Ra = aa.map((e, t) => ({
		label: Cn(e.label),
		value: e.id === T ? Ia : Fa,
		color: e.id === T ? V[1] : V[t % V.length],
		detail: e.id === T ? "实际投入" : "预期准备"
	})), za = aa.map((e, t) => ({
		label: Cn(e.label),
		value: Dn(e) + (e.id === T ? Ia : Fa),
		color: e.id === T ? V[2] : V[t % V.length],
		detail: `支出 ${H(Dn(e))}`
	})), Ba = aa.map((e, t) => ({
		label: Cn(e.label),
		value: Math.min(Pa, Na + Ia + Fa * Math.max(0, t - La - 1))
	})), Va = Re.map((e, t) => {
		let n = Math.max(0, e.target - e.current), r = e.dueDate < Ce(), i = Wn(Ce().slice(0, 7), e.dueDate);
		return {
			...e,
			index: t,
			gap: n,
			monthsLeft: i,
			monthlyNeed: r ? 0 : n / i,
			status: n <= 0 ? "已覆盖" : r ? "日期已过，状态待核实" : i <= 2 ? "紧急补齐" : "持续准备"
		};
	}), Ha = Va.reduce((e, t) => e + t.current, 0), Ua = Va.reduce((e, t) => e + t.target, 0), Wa = Va.reduce((e, t) => e + t.gap, 0), Ga = Va.filter((e) => e.gap > 0 && e.dueDate >= Ce() && e.monthsLeft <= 2).reduce((e, t) => e + t.gap, 0), Ka = Va.reduce((e, t) => e + t.monthlyNeed, 0), qa = Yr.available, Ja = t.rows.find((e) => e.id === "investment")?.[t.mode] ?? 0, Ya = Ja ? q.investmentReserve / Ja : 0, Xa = q.monthlySurplus, Za = Yr.deductions.map((e, t) => ({
		label: e.name,
		value: e.amount,
		color: V[t % V.length],
		detail: e.source
	})), Qa = Va.filter((e) => e.gap > 0).sort((e, t) => e.dueDate.localeCompare(t.dueDate)).map((e, t) => ({
		label: e.name,
		value: e.gap,
		color: e.monthsLeft <= 2 ? V[4] : V[(t + 2) % V.length],
		detail: `${e.dueDate} / 每月需 ${H(e.monthlyNeed)}`
	})), $a = Va.filter((e) => e.gap > 0).map((e, t) => ({
		label: e.name,
		value: e.monthlyNeed,
		color: e.monthsLeft <= 2 ? V[4] : V[t % V.length],
		detail: `${e.monthsLeft} 个月内`
	})), eo = [
		{
			title: "现金流安全",
			tone: q.monthlySurplus < 0 ? "red" : Xa < Ka ? "amber" : "green",
			summary: `扣除消费与基金预留后可用 ${H(q.monthlySurplus)}`,
			detail: `收入 ${H(fr)}，实际消费 ${H(q.spendingActual)}，投资预留 ${H(q.budgetUsage.investment)}，应急预留 ${H(q.budgetUsage.emergency)}；已记入消费的家用不再扣一次。`,
			action: q.monthlySurplus < 0 ? "先把当月余额转正，暂停非必要小旅行和新增非刚性支出。" : Xa < Ka ? "未来大花费项目每月需求高于可用现金，优先压缩可调整项目或生活支出。" : "现金流可以覆盖当前安排，继续保持每月复盘。"
		},
		{
			title: "大花费项目覆盖",
			tone: qa < 0 ? "red" : Ga > 0 ? "amber" : "green",
			summary: `大花费项目缺口 ${H(Wa)}，未分配现金 ${H(qa)}`,
			detail: `手动项目实际 ${H(Ha)} / 目标 ${H(Ua)}；投资待投金 ${H(q.investmentReserve)} 单独锁定。`,
			action: qa < 0 ? "资金标签超过可动用现金，需要减少已锁定金额或重新分配账户用途。" : Ga > 0 ? "两个月内到期的大花费项目仍有缺口，优先补齐搬家、分期和近期旅行。" : "大花费项目结构健康，按截止日期继续补齐缺口。"
		},
		{
			title: "投资纪律",
			tone: Ya >= 2 ? "green" : Ya >= 1 ? "amber" : "red",
			summary: `待投资金可覆盖 ${Ya.toFixed(1)} 个月计划`,
			detail: `A股待投 ${H(q.aShareInvestmentReserve)}，美股待投 ${H(q.usShareInvestmentReserve)}，当前每月投资预算 ${H(Ja)}。`,
			action: Ya >= 2 ? "不需要额外加速投入；保持只用待投资金，不动应急、旅行和家庭责任资金。" : "待投资金覆盖不足，新增投入前先确认应急金和大花费项目不被挤占。"
		},
		{
			title: "应急与负债",
			tone: q.emergencyCoverage >= 3 && q.totalDebt <= fr * .2 ? "green" : "amber",
			summary: `应急覆盖 ${q.emergencyCoverage.toFixed(1)} 个月，负债 ${H(q.totalDebt)}`,
			detail: `应急目标 ${H(q.emergencyTarget)}，当前 ${H(q.currentEmergencyFund)}；总负债率 ${xn(q.debtRatio)}。`,
			action: q.emergencyCoverage < 1 ? "先把硬应急金做到 1 个月必要支出，再追求更高投资速度。" : `应急金继续向 ${F} 个月、${H(q.emergencyTarget)} 的统一目标推进；分期余额按实际核对。`
		}
	], to = ot(dr), no = [
		`${tr.label}财务分析报告`,
		"",
		`1. 净资产与现金：总资产 ${H(q.totalAssets)}，净资产 ${H(q.netWorth)}，可提取现金 ${H(Yr.liquidCash)}，扣除专项后可自由动用 ${H(qa)}。`,
		`2. 收支：收入 ${H(fr)}，实际消费 ${H(q.spendingActual)}，投资及应急预留 ${H(q.budgetUsage.reserved)}，含预留支出 ${H(q.budgetUsage.spending)}，当月可用结余 ${H(q.monthlySurplus)}。预留仍属个人资产，每月扣一次。`,
		`3. 家庭责任：父母 ${H(q.parentAllocation)}，伴侣 ${H(q.partnerAllocation)}，合计占收入 ${xn((q.parentAllocation + q.partnerAllocation) / Math.max(fr, 1))}。`,
		`4. 大花费项目：目标 ${H(Ua)}，实际 ${H(Ha)}，缺口 ${H(Wa)}，其中两个月内缺口 ${H(Ga)}。`,
		`5. 投资：投资市值 ${H(q.investmentValue)}，待投资金 ${H(q.investmentReserve)}，计划覆盖 ${Ya.toFixed(1)} 个月，浮动盈亏 ${H(q.investmentPnL)}。`,
		`6. 应急与负债：应急覆盖 ${q.emergencyCoverage.toFixed(1)} 个月，总负债 ${H(q.totalDebt)}，负债率 ${xn(q.debtRatio)}。`,
		`7. 学习用途：已归类学习净支出 ${P(to.total)}；${to.rows.length ? to.rows.map((e) => `${e.name} ${P(e.actual)}（${e.note?.trim() || "用途待补"}）`).join("；") : "暂无已归类明细，不能据此判断没有学习支出"}。${to.unassigned === 0 ? "" : `另有 ${P(to.unassigned)} 支出待归类。`}`,
		"",
		"行动建议：",
		...eo.map((e, t) => `${t + 1}. ${e.title}：${e.action}`)
	].join("\n"), ro = Ne.map((t, n) => ({
		label: t.name,
		value: t.amount,
		color: V[n % V.length],
		detail: Te(t.date, e)
	})), Y = Ne.flatMap((t, n) => {
		let r = we(t.date, e);
		return r === null || r < 0 ? [] : [{
			label: t.name,
			value: r,
			color: V[n % V.length],
			detail: `${t.date} / ${Te(t.date, e)}`
		}];
	}), io = [
		{
			id: "salary",
			name: "工资",
			amount: ar,
			flow: "收入",
			source: `${tr.label}收入底表`
		},
		{
			id: "stock-income",
			name: "炒股月结",
			amount: Math.max(G, 0),
			flow: "收入",
			source: `${tr.label}收入底表`
		},
		{
			id: "other-income",
			name: "其他收入",
			amount: ur,
			flow: "收入",
			source: `${tr.label}收入底表`
		},
		{
			id: "spending-actual",
			name: "生活实际支出",
			amount: q.spendingActual,
			flow: "支出",
			source: "支出预算底表实际汇总"
		},
		{
			id: "investment-earmark",
			name: "投资基金预留",
			amount: q.budgetUsage.investment,
			flow: "支出",
			source: "当前预算方案，每月预留一次；非消费"
		},
		{
			id: "emergency-earmark",
			name: "应急基金预留",
			amount: q.budgetUsage.emergency,
			flow: "支出",
			source: "当前预算方案，每月预留一次；非消费"
		},
		{
			id: "spending-total",
			name: "支出合计（含预留）",
			amount: q.budgetUsage.spending,
			flow: "合计",
			source: "实际消费 + 投资预留 + 应急预留，不再叠加划拨"
		},
		{
			id: "spending-plan",
			name: "总预算（含基金）",
			amount: q.budgetUsage.budget,
			flow: "预算",
			source: "当前年度方案月度分配"
		},
		{
			id: "budget-remaining",
			name: "可花预算剩余",
			amount: q.budgetRemaining,
			flow: "可转储蓄",
			source: "总预算 - 含预留支出"
		},
		{
			id: "travel-saving",
			name: "旅游储蓄",
			amount: q.travelAllocationSource,
			flow: "资产分配",
			source: "目标管理本月实际投入"
		},
		{
			id: "learning-saving",
			name: "学习储蓄",
			amount: q.learningAllocationSource,
			flow: "资产分配",
			source: "目标管理本月实际投入"
		},
		{
			id: "parent-saving",
			name: "父母储蓄",
			amount: q.parentAllocationSource,
			flow: "资产分配",
			source: "目标管理本月实际投入"
		},
		{
			id: "partner-saving",
			name: "伴侣基金",
			amount: q.partnerAllocationSource,
			flow: "家庭分配",
			source: "目标管理本月实际投入，不计入个人总资产"
		},
		{
			id: "emergency-saving",
			name: "应急金投入",
			amount: q.emergencyAllocationSource,
			flow: "资产分配",
			source: "目标管理本月实际投入"
		},
		{
			id: "ashare-plan",
			name: "A股账本分配",
			amount: fe,
			flow: "资产分配",
			source: "账本投资分配，非当前预测预算"
		},
		{
			id: "usshare-plan",
			name: "美股账本分配",
			amount: me,
			flow: "资产分配",
			source: "账本投资分配，非当前预测预算"
		},
		{
			id: "hkshare-plan",
			name: "港股账本分配",
			amount: ge,
			flow: "资产分配",
			source: "账本投资分配，非当前预测预算"
		},
		{
			id: "investment-reserve",
			name: "投资待投金",
			amount: q.investmentReserve,
			flow: "大花费项目",
			source: "账户用途自动识别：A股待投 + 美股待投"
		},
		{
			id: "fund-bucket-gap",
			name: "大花费项目缺口",
			amount: Wa,
			flow: "大花费项目",
			source: "大花费项目目标 - 实际金额"
		},
		{
			id: "liquid-after-buckets",
			name: "可自由动用现金",
			amount: qa,
			flow: "安全垫",
			source: "可提取账户 - 专项账户占用 - 项目追加锁定（关联后去重）"
		},
		{
			id: "monthly-surplus",
			name: "当月可用结余",
			amount: q.monthlySurplus,
			flow: "结余",
			source: "收入 - 实际消费 - 投资及应急预留；其他分配明细不再扣减"
		}
	], ao = [
		{
			label: "收入",
			value: fr,
			color: V[0]
		},
		{
			label: "实际消费",
			value: q.spendingActual,
			color: V[4]
		},
		{
			label: "投资及应急预留",
			value: q.budgetUsage.reserved,
			color: V[1]
		},
		{
			label: "月结余",
			value: q.monthlySurplus,
			color: V[3]
		}
	], oo = A.map((e, t) => {
		let n = or(e.value, e.currency, le, j), r = or(e.cost, e.currency, le, j), i = q.investmentValue ? n / q.investmentValue * 100 : 0, a = r ? (n - r) / r * 100 : 0;
		return {
			label: e.market,
			x: yn(i),
			y: yn(a + 50),
			value: `${a.toFixed(1)}% / ${i.toFixed(0)}%`,
			color: V[t % V.length]
		};
	}), so = [
		{
			label: "现金流健康",
			value: yn((q.monthlySurplus / Math.max(fr, 1) + .2) * 180),
			color: V[0]
		},
		{
			label: "抗风险能力",
			value: yn(q.emergencyCoverage / Math.max(F, 1) * 100),
			color: V[1]
		},
		{
			label: "负债风险",
			value: yn(100 - q.debtRatio * 100),
			color: V[4]
		},
		{
			label: "增长能力",
			value: yn(q.savingsRate / .45 * 100),
			color: V[3]
		},
		{
			label: "投资表现",
			value: q.investmentValue >= q.investmentCost ? 82 : 58,
			color: V[2]
		}
	], co = [
		{
			label: "固定支出率",
			x: yn(q.fixedRatio * 120),
			y: yn(q.fixedRatio > .5 ? 86 : q.fixedRatio > .35 ? 62 : 32),
			value: xn(q.fixedRatio),
			color: q.fixedRatio > .5 ? V[4] : q.fixedRatio > .35 ? V[2] : V[1]
		},
		{
			label: "应急金缺口",
			x: yn(100 - q.emergencyCoverage / Math.max(F, 1) * 100),
			y: yn(80 - q.emergencyCoverage * 10),
			value: `${q.emergencyCoverage.toFixed(1)}月`,
			color: V[2]
		},
		{
			label: "现金流末余额",
			x: yn((q.spendingPlan * 4 - (ai[ai.length - 1]?.balance ?? 0)) / Math.max(q.spendingPlan * 4, 1) * 100),
			y: yn((q.spendingPlan * 3 - (ai[ai.length - 1]?.balance ?? 0)) / Math.max(q.spendingPlan * 3, 1) * 100),
			value: H(ai[ai.length - 1]?.balance ?? 0),
			color: V[0]
		},
		{
			label: "负债率",
			x: yn(q.debtRatio * 100),
			y: yn(q.debtRatio * 120),
			value: xn(q.debtRatio),
			color: V[4]
		},
		{
			label: "投资波动",
			x: yn(Math.abs(q.investmentPnL) / Math.max(q.investmentCost, 1) * 100),
			y: q.investmentPnL >= 0 ? 34 : 72,
			value: H(q.investmentPnL),
			color: q.investmentPnL >= 0 ? V[1] : V[4]
		}
	], lo = Be.map((e, t) => ({
		label: e.name,
		value: e.score,
		color: V[t % V.length]
	})), uo = ii.map((e, t) => ({
		label: Cn(e.label),
		value: e.income,
		color: e.monthId === T ? V[0] : V[t % V.length],
		detail: e.monthId === T && !ti ? "当前预览" : "已存档"
	})), fo = ii.map((e, t) => ({
		label: Cn(e.label),
		value: e.spending,
		color: e.monthId === T ? V[4] : V[(t + 4) % V.length],
		detail: e.monthId === T && !ti ? "当前预览" : "已存档"
	})), po = ii.map((e) => ({
		label: Cn(e.label),
		value: e.netWorth
	})), mo = ii.map((e) => ({
		label: Cn(e.label),
		value: e.accountTotal
	})), ho = ii.map((e) => ({
		label: Cn(e.label),
		value: e.surplus
	})), go = ni.income - (ri?.income ?? 0), _o = ni.spending - (ri?.spending ?? 0), vo = ni.accountTotal - (ri?.accountTotal ?? 0), yo = ni.netWorth - (ri?.netWorth ?? 0);
	async function bo() {
		try {
			await navigator.clipboard.writeText(no), gt("报告已复制到剪贴板");
		} catch {
			gt("复制失败，可以直接选中文本复制");
		}
	}
	return /* @__PURE__ */ (0, b.jsxs)("main", {
		className: "finance-page",
		children: [/* @__PURE__ */ (0, b.jsxs)("nav", {
			className: "side-nav",
			"aria-label": "财务模块导航",
			children: [
				/* @__PURE__ */ (0, b.jsxs)("div", {
					className: "brand",
					children: [/* @__PURE__ */ (0, b.jsx)("span", {
						className: "brand-mark",
						children: "PF"
					}), /* @__PURE__ */ (0, b.jsxs)("div", { children: [/* @__PURE__ */ (0, b.jsx)("strong", { children: "个人财务系统" }), /* @__PURE__ */ (0, b.jsx)("small", { children: "年度预算 / 财务账本" })] })]
				}),
				/* @__PURE__ */ (0, b.jsx)("button", {
					className: !v || v.id === "overview" ? "active" : "",
					"aria-current": !v || v.id === "overview" ? "location" : void 0,
					type: "button",
					onClick: () => Gi("overview"),
					children: "总览"
				}),
				vn.map((e) => /* @__PURE__ */ (0, b.jsx)("button", {
					className: v?.id === e.id ? "active" : "",
					"aria-current": v?.id === e.id ? "location" : void 0,
					type: "button",
					onClick: () => Gi(e.id),
					children: e.title
				}, e.id))
			]
		}), /* @__PURE__ */ (0, b.jsxs)("section", {
			className: "workspace",
			children: [
				/* @__PURE__ */ (0, b.jsxs)("header", {
					className: "topbar",
					children: [/* @__PURE__ */ (0, b.jsxs)("div", { children: [/* @__PURE__ */ (0, b.jsx)("h1", { children: "长期个人财务管理系统" }), /* @__PURE__ */ (0, b.jsx)("p", { children: "先核对全年安排与月份周转，再查看账本、账户与资产。" })] }), /* @__PURE__ */ (0, b.jsx)("div", {
						className: "period-tabs",
						"aria-label": "时间视图",
						children: [
							"周",
							"月",
							"季",
							"年"
						].map((e) => /* @__PURE__ */ (0, b.jsx)("button", {
							className: S === e ? "active" : "",
							onClick: () => w(e),
							children: e
						}, e))
					})]
				}),
				/* @__PURE__ */ (0, b.jsxs)("section", {
					className: "data-safety-bar",
					"aria-label": "数据保存与备份",
					children: [/* @__PURE__ */ (0, b.jsxs)("div", {
						className: "save-indicator",
						children: [/* @__PURE__ */ (0, b.jsx)("span", { className: B ? "save-dot ready" : "save-dot" }), /* @__PURE__ */ (0, b.jsxs)("div", { children: [/* @__PURE__ */ (0, b.jsx)("strong", { children: pt }), /* @__PURE__ */ (0, b.jsxs)("small", { children: ["本机自动保存 · 每 30 秒检查 · ", it] })] })]
					}), /* @__PURE__ */ (0, b.jsxs)("div", {
						className: "data-actions",
						children: [
							/* @__PURE__ */ (0, b.jsx)("button", {
								className: "primary-button",
								disabled: !B || L,
								type: "button",
								onClick: () => void an(),
								children: "保存当前数据"
							}),
							/* @__PURE__ */ (0, b.jsx)("button", {
								className: "secondary-button",
								disabled: !B || L,
								type: "button",
								onClick: () => void Qr(),
								children: "保存本月月报"
							}),
							/* @__PURE__ */ (0, b.jsx)("button", {
								className: "secondary-button",
								disabled: !B || L,
								type: "button",
								onClick: () => void hn(),
								children: "保存完整版本"
							}),
							/* @__PURE__ */ (0, b.jsx)("button", {
								className: "secondary-button",
								type: "button",
								onClick: () => g((e) => e.includes("cloudSync") ? e : [...e, "cloudSync"]),
								children: "打开云同步"
							}),
							/* @__PURE__ */ (0, b.jsxs)("button", {
								className: "secondary-button",
								type: "button",
								onClick: () => dt((e) => !e),
								children: ["历史版本 ", qe.length > 0 ? `(${qe.length})` : ""]
							}),
							/* @__PURE__ */ (0, b.jsx)("button", {
								className: "secondary-button",
								type: "button",
								onClick: Sn,
								children: "导出备份"
							}),
							/* @__PURE__ */ (0, b.jsx)("button", {
								className: "secondary-button",
								type: "button",
								onClick: () => Dt.current?.click(),
								children: "导入备份"
							}),
							/* @__PURE__ */ (0, b.jsx)("input", {
								ref: Dt,
								className: "visually-hidden",
								accept: "application/json,.json",
								type: "file",
								onChange: (e) => {
									let t = e.target.files?.[0];
									t && Bn(t);
								}
							})
						]
					})]
				}),
				ut && /* @__PURE__ */ (0, b.jsxs)("section", {
					className: "history-panel",
					children: [/* @__PURE__ */ (0, b.jsxs)("div", {
						className: "history-heading",
						children: [/* @__PURE__ */ (0, b.jsxs)("div", { children: [/* @__PURE__ */ (0, b.jsx)("h2", { children: "历史版本" }), /* @__PURE__ */ (0, b.jsxs)("p", { children: [
							"最多保留最近 ",
							gn,
							" 个手动快照。恢复前可以先保存当前版本。"
						] })] }), /* @__PURE__ */ (0, b.jsx)("button", {
							className: "secondary-button",
							type: "button",
							onClick: () => dt(!1),
							children: "关闭"
						})]
					}), qe.length === 0 ? /* @__PURE__ */ (0, b.jsx)("div", {
						className: "history-empty",
						children: "还没有历史版本。点击“保存历史版本”即可创建第一个快照。"
					}) : /* @__PURE__ */ (0, b.jsx)("div", {
						className: "history-list",
						children: qe.map((e) => /* @__PURE__ */ (0, b.jsxs)("article", {
							className: "history-item",
							children: [/* @__PURE__ */ (0, b.jsxs)("div", { children: [/* @__PURE__ */ (0, b.jsx)("strong", { children: Gn(e.createdAt) }), /* @__PURE__ */ (0, b.jsxs)("span", { children: [
								e.data.selectedMonth ?? T,
								" · ",
								e.data.accounts.length,
								" 个账户"
							] })] }), /* @__PURE__ */ (0, b.jsxs)("div", {
								className: "history-actions",
								children: [/* @__PURE__ */ (0, b.jsx)("button", {
									className: "secondary-button",
									type: "button",
									onClick: () => _n(e),
									children: "恢复"
								}), /* @__PURE__ */ (0, b.jsx)("button", {
									className: "danger-button",
									type: "button",
									onClick: () => bn(e.id),
									children: "删除"
								})]
							})]
						}, e.id))
					})]
				}),
				/* @__PURE__ */ (0, b.jsx)(k, {
					plan: t,
					onChange: mi,
					saveAction: /* @__PURE__ */ (0, b.jsx)("button", {
						type: "button",
						disabled: !B || L,
						onClick: () => void an(),
						children: "保存分配预算"
					}),
					saveStatus: `${pt} · ${it}`
				}),
				/* @__PURE__ */ (0, b.jsxs)("details", {
					className: "finance-ledger",
					open: p,
					onToggle: (e) => m(e.currentTarget.open),
					children: [
						/* @__PURE__ */ (0, b.jsxs)("summary", { children: ["查看账本、资产与历史记录 ", /* @__PURE__ */ (0, b.jsx)("span", { children: "按已保存的月份查看实际数据" })] }),
						/* @__PURE__ */ (0, b.jsx)("p", {
							className: "ledger-context",
							children: "预算汇总与上方年度方案和所选月份类型同步。账户余额、资产和历史收支按已录入数据计算；核算当前净资产前，请更新公司借款及各账户余额。"
						}),
						/* @__PURE__ */ (0, b.jsxs)("section", {
							className: "overview",
							id: "finance-overview",
							tabIndex: -1,
							"aria-labelledby": "finance-overview-title",
							children: [
								/* @__PURE__ */ (0, b.jsxs)("div", {
									className: "section-title",
									children: [/* @__PURE__ */ (0, b.jsxs)("div", { children: [/* @__PURE__ */ (0, b.jsx)("h2", {
										id: "finance-overview-title",
										children: "账户与收支总览"
									}), /* @__PURE__ */ (0, b.jsxs)("p", { children: [
										tr.label,
										"账本 · ",
										s ? `最近整期更新截至 ${s}` : "尚未整期更新",
										" · 账户与持仓为当前模块余额。"
									] })] }), /* @__PURE__ */ (0, b.jsx)("span", {
										className: "pill good",
										children: "公开页已脱敏"
									})]
								}),
								/* @__PURE__ */ (0, b.jsx)(kt, {
									records: r,
									onOpen: () => Gi("periodReview")
								}),
								/* @__PURE__ */ (0, b.jsxs)("article", {
									className: "total-assets-hero",
									children: [/* @__PURE__ */ (0, b.jsxs)("div", {
										className: "total-assets-main",
										children: [
											/* @__PURE__ */ (0, b.jsx)("span", { children: "当前总资产与负债" }),
											/* @__PURE__ */ (0, b.jsx)("strong", { children: H(q.totalAssets) }),
											/* @__PURE__ */ (0, b.jsxs)("small", { children: [
												"资产合计 ",
												H(q.totalAssets),
												" / 总负债 ",
												H(q.totalDebt),
												" / 净资产 ",
												H(q.netWorth),
												"；家庭及伴侣储蓄单列，不计入个人总资产。"
											] })
										]
									}), /* @__PURE__ */ (0, b.jsx)("div", {
										className: "total-assets-breakdown",
										"aria-label": "总资产和负债资金分布",
										children: ta.map((e) => /* @__PURE__ */ (0, b.jsxs)("div", {
											className: `asset-breakdown-item ${e.className ?? ""}`.trim(),
											style: { "--asset-color": e.color },
											children: [
												/* @__PURE__ */ (0, b.jsx)("span", { children: e.label }),
												/* @__PURE__ */ (0, b.jsx)("strong", { children: H(e.value) }),
												/* @__PURE__ */ (0, b.jsx)("em", { children: e.detail })
											]
										}, e.label))
									})]
								}),
								/* @__PURE__ */ (0, b.jsx)("div", {
									className: "overview-grid",
									children: ra.map((e) => /* @__PURE__ */ (0, b.jsxs)("article", {
										"data-testid": e.id,
										className: `overview-card ${e.tone} ${e.items ? "with-line-items" : ""}`.trim(),
										children: [
											/* @__PURE__ */ (0, b.jsx)("span", { children: e.title }),
											/* @__PURE__ */ (0, b.jsx)("strong", { children: e.value }),
											e.items ? /* @__PURE__ */ (0, b.jsxs)("div", {
												className: "overview-detail-list",
												children: [/* @__PURE__ */ (0, b.jsx)("small", { children: e.detail }), /* @__PURE__ */ (0, b.jsx)("div", {
													className: "overview-line-items",
													"aria-label": `${e.title}明细`,
													children: e.items.map((e) => /* @__PURE__ */ (0, b.jsxs)("div", {
														className: "overview-line-item",
														children: [
															/* @__PURE__ */ (0, b.jsx)("span", { children: e.label }),
															/* @__PURE__ */ (0, b.jsx)("em", { children: e.value }),
															/* @__PURE__ */ (0, b.jsx)("small", { children: e.note })
														]
													}, e.label))
												})]
											}) : /* @__PURE__ */ (0, b.jsx)("small", { children: e.detail })
										]
									}, e.title))
								}),
								/* @__PURE__ */ (0, b.jsxs)("section", {
									className: "analytics-section",
									children: [/* @__PURE__ */ (0, b.jsx)("div", {
										className: "section-title compact",
										children: /* @__PURE__ */ (0, b.jsxs)("div", { children: [/* @__PURE__ */ (0, b.jsx)("h2", { children: "图表分析区" }), /* @__PURE__ */ (0, b.jsx)("p", { children: "年度资金分布、现金瀑布和资金流向使用同一份年度方案；账本图表注明所选月份。" })] })
									}), /* @__PURE__ */ (0, b.jsxs)("div", {
										className: "chart-grid four",
										children: [
											/* @__PURE__ */ (0, b.jsx)(W, {
												title: "资产结构",
												summary: `总资产 ${H(q.totalAssets)}`,
												children: /* @__PURE__ */ (0, b.jsx)(Mr, {
													data: ya,
													centerLabel: "总资产",
													centerValue: H(q.totalAssets)
												})
											}),
											/* @__PURE__ */ (0, b.jsx)(W, {
												title: "年度资金分布",
												summary: `全年全部安排 ${H(pr.annualOutflow)}`,
												children: /* @__PURE__ */ (0, b.jsx)(Mr, {
													data: Da,
													centerLabel: pr.annualSurplus >= 0 ? "可分配资金" : "年度安排",
													centerValue: H(pr.annualSurplus >= 0 ? pr.annualIncome : pr.annualOutflow)
												})
											}),
											/* @__PURE__ */ (0, b.jsx)(W, {
												title: "账本支出最高项",
												summary: `${tr.label} / 已花 ${H(q.spendingActual)}`,
												className: "spending-top-panel",
												children: /* @__PURE__ */ (0, b.jsx)(Pr, {
													data: fa,
													valueFormatter: H
												})
											}),
											/* @__PURE__ */ (0, b.jsx)(W, {
												title: "账本健康维度",
												summary: `${tr.label} / 综合 ${q.score} 分`,
												children: /* @__PURE__ */ (0, b.jsx)(Pr, {
													data: so,
													valueFormatter: (e) => `${e.toFixed(0)}分`,
													percentMode: !0
												})
											}),
											/* @__PURE__ */ (0, b.jsx)(W, {
												title: `${Nr}预算现金瀑布`,
												summary: `全部安排 ${H(K.totalOutflow)}`,
												children: /* @__PURE__ */ (0, b.jsx)(Br, { data: Ta })
											}),
											/* @__PURE__ */ (0, b.jsx)(W, {
												title: "账本现金流日历",
												summary: `${tr.label}账本及提醒记录`,
												children: /* @__PURE__ */ (0, b.jsx)(zr, { events: oi })
											}),
											/* @__PURE__ */ (0, b.jsx)(W, {
												title: "账本风险矩阵",
												summary: `${tr.label}账本模型`,
												className: "wide risk-panel",
												children: /* @__PURE__ */ (0, b.jsx)(Vr, { data: co })
											}),
											/* @__PURE__ */ (0, b.jsx)(W, {
												title: `${Nr}预算流向`,
												summary: `全部安排 ${H(K.totalOutflow)}`,
												children: /* @__PURE__ */ (0, b.jsx)(Hr, {
													data: Ea,
													source: "工资账户",
													valueFormatter: H
												})
											})
										]
									})]
								}),
								/* @__PURE__ */ (0, b.jsx)("div", {
									className: "module-grid",
									children: vn.map((e) => /* @__PURE__ */ (0, b.jsxs)("button", {
										className: `module-card ${h.includes(e.id) ? "selected" : ""}`,
										onClick: () => Wi(e.id),
										children: [
											/* @__PURE__ */ (0, b.jsx)("strong", { children: e.title }),
											/* @__PURE__ */ (0, b.jsx)("span", { children: e.desc }),
											/* @__PURE__ */ (0, b.jsx)("em", { children: h.includes(e.id) ? "已打开，点击关闭" : "打开详情" })
										]
									}, e.id))
								})
							]
						}),
						h.length > 0 && /* @__PURE__ */ (0, b.jsxs)("section", {
							className: "selected-modules",
							children: [/* @__PURE__ */ (0, b.jsxs)("div", {
								className: "section-title selected-title",
								children: [/* @__PURE__ */ (0, b.jsxs)("div", { children: [/* @__PURE__ */ (0, b.jsx)("h2", { children: "已打开模块" }), /* @__PURE__ */ (0, b.jsx)("p", { children: "可以同时观看多个模块；每个模块左侧是数据，右侧是图表。" })] }), /* @__PURE__ */ (0, b.jsxs)("div", {
									className: "panel-actions",
									children: [/* @__PURE__ */ (0, b.jsx)("button", {
										onClick: Ki,
										children: "打开全部"
									}), /* @__PURE__ */ (0, b.jsx)("button", {
										onClick: () => g([]),
										children: "全部收起"
									})]
								})]
							}), h.map((u) => /* @__PURE__ */ (0, b.jsxs)("section", {
								className: "detail-panel",
								id: `finance-${u}`,
								tabIndex: -1,
								"aria-label": vn.find((e) => e.id === u)?.title,
								children: [
									u === "income" && /* @__PURE__ */ (0, b.jsxs)(cr, {
										title: "收入",
										desc: "收入只看实际到账；炒股月结算单独记录，不进入现金流预测。",
										children: [/* @__PURE__ */ (0, b.jsx)(ir, {
											label: "每月工资规划（元）",
											value: t.salary,
											onChange: (e) => mi({
												...t,
												salary: e
											})
										}), /* @__PURE__ */ (0, b.jsx)(sr, {
											data: /* @__PURE__ */ (0, b.jsxs)(b.Fragment, { children: [
												/* @__PURE__ */ (0, b.jsx)(Ot, {
													records: r,
													flow: "income"
												}),
												/* @__PURE__ */ (0, b.jsx)(ct, {
													flow: "income",
													month: tr,
													entries: l,
													onSave: Si,
													onDelete: Ci
												}, `income-${tr.id}`),
												/* @__PURE__ */ (0, b.jsx)(mr, {
													records: D,
													selectedMonth: T,
													onSelect: te,
													addMonthRecord: fi,
													deleteMonthRecord: pi,
													updateMonthRecord: di
												})
											] }),
											charts: /* @__PURE__ */ (0, b.jsxs)("div", {
												className: "chart-grid two",
												children: [
													/* @__PURE__ */ (0, b.jsx)(W, {
														title: "收入结构",
														summary: `${tr.label} ${H(fr)}`,
														children: /* @__PURE__ */ (0, b.jsx)(Mr, {
															data: ia,
															centerLabel: "实际收入",
															centerValue: H(fr)
														})
													}),
													/* @__PURE__ */ (0, b.jsx)(W, {
														title: "收入口径",
														summary: "股票月结不进预测",
														children: /* @__PURE__ */ (0, b.jsx)(Lr, {
															data: ia,
															valueFormatter: H
														})
													}),
													/* @__PURE__ */ (0, b.jsx)(W, {
														title: "月度收入趋势",
														summary: "按月份分开记录",
														children: /* @__PURE__ */ (0, b.jsx)(Fr, {
															data: oa,
															valueFormatter: H
														})
													})
												]
											})
										})]
									}),
									u === "spending" && /* @__PURE__ */ (0, b.jsx)(cr, {
										title: "支出",
										desc: "细项支出按大类归属；学习单列用途，日常使用可按咔皮记账报告核对。",
										children: /* @__PURE__ */ (0, b.jsx)(sr, {
											data: /* @__PURE__ */ (0, b.jsxs)(b.Fragment, { children: [
												/* @__PURE__ */ (0, b.jsx)(lr, {
													records: D,
													selectedMonth: T,
													onAddMonth: fi,
													onChange: te,
													onDeleteSelectedMonth: () => pi(T)
												}),
												/* @__PURE__ */ (0, b.jsx)(Ot, {
													records: r,
													flow: "expense"
												}),
												/* @__PURE__ */ (0, b.jsxs)("div", {
													className: "stat-strip",
													"aria-label": "月度支出与基金预留",
													children: [
														/* @__PURE__ */ (0, b.jsx)(U, {
															label: "实际消费",
															value: H(q.spendingActual)
														}),
														/* @__PURE__ */ (0, b.jsx)(U, {
															label: "投资基金预留",
															value: H(q.budgetUsage.investment)
														}),
														/* @__PURE__ */ (0, b.jsx)(U, {
															label: "应急基金预留",
															value: H(q.budgetUsage.emergency)
														}),
														/* @__PURE__ */ (0, b.jsx)(U, {
															label: "支出合计（含预留）",
															value: H(q.budgetUsage.spending)
														}),
														/* @__PURE__ */ (0, b.jsx)(U, {
															label: "可花预算剩余",
															value: H(q.budgetUsage.remaining)
														})
													]
												}),
												/* @__PURE__ */ (0, b.jsx)("p", { children: "基金按当前预算方案每月自动预留一次，转入账户不再另记消费；以下账本保留实际消费明细。" }),
												/* @__PURE__ */ (0, b.jsx)(ct, {
													flow: "expense",
													month: tr,
													entries: l,
													onSave: Si,
													onDelete: Ci
												}, `spending-${tr.id}`),
												/* @__PURE__ */ (0, b.jsx)(Wr, {
													budgets: dr,
													deleteBudget: bi,
													addBudget: yi,
													addDetailedBudgets: xi,
													updateBudget: vi
												}),
												/* @__PURE__ */ (0, b.jsx)(Gr, {
													budgets: dr,
													monthLabel: tr.label,
													allowance: t.rows.find((e) => e.id === "learning")?.[t.mode] ?? 0
												})
											] }),
											charts: /* @__PURE__ */ (0, b.jsxs)("div", {
												className: "chart-grid two",
												children: [
													/* @__PURE__ */ (0, b.jsx)(W, {
														title: "实际支出最高8项",
														summary: `已花 ${H(q.spendingActual)}`,
														className: "spending-top-panel",
														children: /* @__PURE__ */ (0, b.jsx)(Pr, {
															data: fa,
															valueFormatter: H
														})
													}),
													/* @__PURE__ */ (0, b.jsx)(W, {
														title: "全部实际支出占比",
														summary: "按实际金额",
														children: /* @__PURE__ */ (0, b.jsx)(Mr, {
															data: pa,
															centerLabel: "实际",
															centerValue: H(q.spendingActual)
														})
													}),
													/* @__PURE__ */ (0, b.jsx)(W, {
														title: "分类预算执行",
														summary: "实际 / 预算 / 按实际金额降序",
														children: /* @__PURE__ */ (0, b.jsx)(Pr, {
															data: ua,
															valueFormatter: H
														})
													}),
													/* @__PURE__ */ (0, b.jsx)(W, {
														title: "预算必要性结构",
														summary: "必须 vs 可取消",
														children: /* @__PURE__ */ (0, b.jsx)(Mr, {
															data: ma,
															centerLabel: "预算",
															centerValue: H(q.spendingPlan)
														})
													}),
													/* @__PURE__ */ (0, b.jsx)(W, {
														title: "月度支出趋势",
														summary: "实际消费 + 当前方案基金预留；历史存档不变",
														children: /* @__PURE__ */ (0, b.jsx)(Fr, {
															data: sa,
															valueFormatter: H
														})
													}),
													/* @__PURE__ */ (0, b.jsx)(W, {
														title: "月度结余趋势",
														summary: "收入 - 实际消费 - 当前方案基金预留",
														children: /* @__PURE__ */ (0, b.jsx)(Fr, {
															data: ca,
															valueFormatter: H
														})
													})
												]
											})
										})
									}),
									u === "cashflow" && /* @__PURE__ */ (0, b.jsx)(cr, {
										title: "当前现金流预测",
										desc: "当前余额扣除专项占用，再测算六个完整月预算周期；不是本月剩余天数的到账预测。出差补贴未确认到账，不预支；历史账本不参与当前预算。",
										children: /* @__PURE__ */ (0, b.jsx)(sr, {
											data: /* @__PURE__ */ (0, b.jsxs)(b.Fragment, { children: [
												/* @__PURE__ */ (0, b.jsx)(Dr, { liquidity: Yr }),
												/* @__PURE__ */ (0, b.jsxs)("label", {
													className: "field",
													children: [/* @__PURE__ */ (0, b.jsx)("span", { children: "预测月份类型" }), /* @__PURE__ */ (0, b.jsxs)("select", {
														"aria-label": "预测月份类型",
														value: t.mode,
														onChange: (e) => mi({
															...t,
															mode: e.target.value
														}),
														children: [/* @__PURE__ */ (0, b.jsx)("option", {
															value: "normal",
															children: "普通月"
														}), /* @__PURE__ */ (0, b.jsx)("option", {
															value: "trip",
															disabled: t.awayMonths === 0,
															children: "出差月（不预支补贴）"
														})]
													})]
												}),
												/* @__PURE__ */ (0, b.jsx)(vr, {
													accountTotal: Yr.available,
													addCashflowCustomItem: hi,
													monthlyInflow: ha,
													monthlyOutflow: ga,
													rows: va
												}),
												/* @__PURE__ */ (0, b.jsx)(wr, {
													baseDate: e,
													reminders: Ne,
													addReminder: Ni,
													deleteReminder: Pi,
													updateReminder: Mi
												})
											] }),
											charts: /* @__PURE__ */ (0, b.jsxs)("div", {
												className: "chart-grid two",
												children: [
													/* @__PURE__ */ (0, b.jsx)(W, {
														title: "可动用余量情景",
														summary: `${Nr} × 6 个完整周期`,
														children: /* @__PURE__ */ (0, b.jsx)(Ir, {
															data: Sa,
															valueFormatter: H
														})
													}),
													/* @__PURE__ */ (0, b.jsx)(W, {
														title: "月度流出压力",
														summary: `每月流出 ${H(ga)}`,
														children: /* @__PURE__ */ (0, b.jsx)(Fr, {
															data: Ca,
															valueFormatter: H
														})
													}),
													/* @__PURE__ */ (0, b.jsx)(W, {
														title: "现金瀑布",
														summary: "一个完整预算周期",
														children: /* @__PURE__ */ (0, b.jsx)(Br, { data: wa })
													}),
													/* @__PURE__ */ (0, b.jsx)(W, {
														title: "现金流日历",
														summary: "事项提醒，不重复扣预算",
														children: /* @__PURE__ */ (0, b.jsx)(zr, { events: oi })
													})
												]
											})
										})
									}),
									u === "accounts" && /* @__PURE__ */ (0, b.jsx)(cr, {
										title: "账户管理",
										desc: "账户可以新增、删除、编辑和拖动排序，修改后会联动总资产、现金流和图表。",
										children: /* @__PURE__ */ (0, b.jsx)(sr, {
											data: /* @__PURE__ */ (0, b.jsx)(b.Fragment, { children: /* @__PURE__ */ (0, b.jsx)(yr, {
												accounts: O,
												addAccount: ci,
												deleteAccount: li,
												liquidAccountTotal: q.liquidAccountTotal,
												reorderAccount: ui,
												total: q.accountTotal,
												updateAccount: si
											}) }),
											charts: /* @__PURE__ */ (0, b.jsxs)("div", {
												className: "chart-grid two",
												children: [
													/* @__PURE__ */ (0, b.jsx)(W, {
														title: "账户余额分布",
														summary: `账户合计 ${H(q.accountTotal)} / 按余额降序`,
														children: /* @__PURE__ */ (0, b.jsx)(Mr, {
															data: la,
															centerLabel: "账户",
															centerValue: H(q.accountTotal)
														})
													}),
													/* @__PURE__ */ (0, b.jsx)(W, {
														title: "可提取账户余额",
														summary: `含专项 ${H(Yr.liquidCash)} / 自由动用 ${H(Yr.available)}`,
														children: /* @__PURE__ */ (0, b.jsx)(Pr, {
															data: la,
															valueFormatter: H
														})
													}),
													/* @__PURE__ */ (0, b.jsx)(W, {
														title: "账户用途映射",
														summary: "账户余额流向 / 按余额降序",
														children: /* @__PURE__ */ (0, b.jsx)(Hr, {
															data: la,
															source: "账户池",
															valueFormatter: H
														})
													})
												]
											})
										})
									}),
									u === "budget" && /* @__PURE__ */ (0, b.jsx)(cr, {
										title: "预算管理",
										desc: "与首页完整分配表同步，按不出差月份、出差月份及全年预算计算。",
										children: /* @__PURE__ */ (0, b.jsx)(sr, {
											data: /* @__PURE__ */ (0, b.jsxs)(b.Fragment, { children: [
												/* @__PURE__ */ (0, b.jsxs)("div", {
													className: "button-row",
													children: [/* @__PURE__ */ (0, b.jsx)("button", {
														type: "button",
														className: "ghost-button",
														"aria-pressed": t.mode === "normal",
														onClick: () => n({
															...t,
															mode: "normal"
														}),
														children: "不出差月份"
													}), /* @__PURE__ */ (0, b.jsx)("button", {
														type: "button",
														className: "ghost-button",
														"aria-pressed": t.mode === "trip",
														disabled: t.awayMonths === 0,
														onClick: () => n({
															...t,
															mode: "trip"
														}),
														children: "出差月份"
													})]
												}),
												/* @__PURE__ */ (0, b.jsxs)("div", {
													className: "stat-strip",
													children: [
														/* @__PURE__ */ (0, b.jsx)(U, {
															label: `${Nr}可分配资金`,
															value: H(K.income)
														}),
														/* @__PURE__ */ (0, b.jsx)(U, {
															label: `${Nr}全部分配`,
															value: H(K.totalOutflow)
														}),
														/* @__PURE__ */ (0, b.jsx)(U, {
															label: `${Nr}现金余量`,
															value: H(K.surplus)
														}),
														/* @__PURE__ */ (0, b.jsx)(U, {
															label: "全年全部分配",
															value: H(pr.annualOutflow)
														})
													]
												}),
												/* @__PURE__ */ (0, b.jsx)(oe, {
													plan: t,
													onChange: mi,
													titleId: "module-annual-allocation-title",
													saveAction: /* @__PURE__ */ (0, b.jsx)("button", {
														type: "button",
														disabled: !B || L,
														onClick: () => void an(),
														children: "保存分配预算"
													}),
													saveStatus: `${pt} · ${it}`
												}),
												/* @__PURE__ */ (0, b.jsxs)("details", { children: [
													/* @__PURE__ */ (0, b.jsx)("summary", { children: "查看历史月份预算与实际支出" }),
													/* @__PURE__ */ (0, b.jsx)("p", {
														className: "ledger-context",
														children: "以下是已保存月份的账本数据，年度分配表用于当前计划；历史预算金额可在这里单独维护。"
													}),
													/* @__PURE__ */ (0, b.jsx)(lr, {
														records: D,
														selectedMonth: T,
														onChange: te
													}),
													/* @__PURE__ */ (0, b.jsx)(Wr, {
														budgets: dr,
														deleteBudget: bi,
														addBudget: yi,
														addDetailedBudgets: xi,
														updateBudget: vi
													})
												] })
											] }),
											charts: /* @__PURE__ */ (0, b.jsxs)("div", {
												className: "chart-grid two",
												children: [
													/* @__PURE__ */ (0, b.jsx)(W, {
														title: "年度资金分布",
														summary: `可分配 ${H(pr.annualIncome)} / 全部分配 ${H(pr.annualOutflow)}`,
														children: /* @__PURE__ */ (0, b.jsx)(Mr, {
															data: Da,
															centerLabel: pr.annualSurplus >= 0 ? "可分配资金" : "年度安排",
															centerValue: H(pr.annualSurplus >= 0 ? pr.annualIncome : pr.annualOutflow)
														})
													}),
													/* @__PURE__ */ (0, b.jsx)(W, {
														title: `${Nr}分类分配`,
														summary: `合计 ${H(K.totalOutflow)}`,
														children: /* @__PURE__ */ (0, b.jsx)(Pr, {
															data: Ea,
															valueFormatter: H
														})
													}),
													/* @__PURE__ */ (0, b.jsx)(W, {
														title: `${Nr}现金流核对`,
														summary: `余量 ${H(K.surplus)}`,
														children: /* @__PURE__ */ (0, b.jsx)(Br, { data: Ta })
													})
												]
											})
										})
									}),
									u === "investment" && /* @__PURE__ */ (0, b.jsx)(cr, {
										title: "投资管理",
										desc: "投资理财单独成栏，A股 / 美股 / 港股分开看；计划投入和市值都能改。",
										children: /* @__PURE__ */ (0, b.jsx)(sr, {
											data: /* @__PURE__ */ (0, b.jsxs)(b.Fragment, { children: [/* @__PURE__ */ (0, b.jsxs)("div", {
												className: "form-grid",
												children: [
													/* @__PURE__ */ (0, b.jsx)(ir, {
														label: "美元兑人民币",
														value: le,
														onChange: ue,
														step: .01
													}),
													/* @__PURE__ */ (0, b.jsx)(ir, {
														label: "港币兑人民币",
														value: j,
														onChange: de,
														step: .01
													}),
													/* @__PURE__ */ (0, b.jsx)(ir, {
														label: "A股月计划投入",
														value: fe,
														onChange: pe
													}),
													/* @__PURE__ */ (0, b.jsx)(ir, {
														label: "美股月计划投入",
														value: me,
														onChange: he
													}),
													/* @__PURE__ */ (0, b.jsx)(ir, {
														label: "港股月计划投入",
														value: ge,
														onChange: _e
													})
												]
											}), /* @__PURE__ */ (0, b.jsx)(br, {
												holdings: A,
												addHolding: Ti,
												deleteHolding: J,
												fxHkd: j,
												fxUsd: le,
												updateHolding: wi
											})] }),
											charts: /* @__PURE__ */ (0, b.jsxs)("div", {
												className: "chart-grid two",
												children: [
													/* @__PURE__ */ (0, b.jsx)(W, {
														title: "市场分布",
														summary: `投资市值 ${H(q.investmentValue)}`,
														children: /* @__PURE__ */ (0, b.jsx)(Mr, {
															data: ba,
															centerLabel: "投资",
															centerValue: H(q.investmentValue)
														})
													}),
													/* @__PURE__ */ (0, b.jsx)(W, {
														title: "盈亏绝对值",
														summary: `总盈亏 ${H(q.investmentPnL)}`,
														children: /* @__PURE__ */ (0, b.jsx)(Pr, {
															data: xa,
															valueFormatter: H
														})
													}),
													/* @__PURE__ */ (0, b.jsx)(W, {
														title: "收益率 / 仓位",
														summary: "横轴仓位，纵轴收益",
														children: /* @__PURE__ */ (0, b.jsx)(Ur, {
															data: oo,
															xLabel: "仓位",
															yLabel: "收益"
														})
													})
												]
											})
										})
									}),
									u === "balance" && /* @__PURE__ */ (0, b.jsx)(cr, {
										title: "资产负债表",
										desc: "资产项和负债项都支持新增、删除和直接编辑。",
										children: /* @__PURE__ */ (0, b.jsx)(sr, {
											data: /* @__PURE__ */ (0, b.jsxs)(b.Fragment, { children: [
												/* @__PURE__ */ (0, b.jsx)(xr, {
													addBalanceAsset: Di,
													balanceAssets: Oe,
													deleteBalanceAsset: Oi,
													totalAssets: q.totalAssets,
													updateBalanceAsset: Ei
												}),
												/* @__PURE__ */ (0, b.jsx)(Sr, {
													addLiability: Ai,
													deleteLiability: ji,
													liabilities: Ae,
													updateLiability: ki
												}),
												/* @__PURE__ */ (0, b.jsxs)("div", {
													className: "stat-strip",
													children: [
														/* @__PURE__ */ (0, b.jsx)(U, {
															label: "总资产",
															value: H(q.totalAssets)
														}),
														/* @__PURE__ */ (0, b.jsx)(U, {
															label: "总负债",
															value: H(q.totalDebt)
														}),
														/* @__PURE__ */ (0, b.jsx)(U, {
															label: "净资产",
															value: H(q.netWorth)
														}),
														/* @__PURE__ */ (0, b.jsx)(U, {
															label: "负债率",
															value: xn(q.debtRatio)
														})
													]
												})
											] }),
											charts: /* @__PURE__ */ (0, b.jsxs)("div", {
												className: "chart-grid two",
												children: [
													/* @__PURE__ */ (0, b.jsx)(W, {
														title: "资产负债对比",
														summary: `净资产 ${H(q.netWorth)}`,
														children: /* @__PURE__ */ (0, b.jsx)(Pr, {
															data: ka,
															valueFormatter: H
														})
													}),
													/* @__PURE__ */ (0, b.jsx)(W, {
														title: "负债结构",
														summary: q.totalDebt ? `负债 ${H(q.totalDebt)}` : "当前无负债",
														children: /* @__PURE__ */ (0, b.jsx)(Mr, {
															data: ja,
															centerLabel: "负债",
															centerValue: H(q.totalDebt)
														})
													}),
													/* @__PURE__ */ (0, b.jsx)(W, {
														title: "资产项结构",
														summary: `补录资产 ${H(q.manualAssetTotal)}`,
														children: /* @__PURE__ */ (0, b.jsx)(Mr, {
															data: Aa,
															centerLabel: "资产项",
															centerValue: H(q.manualAssetTotal)
														})
													}),
													/* @__PURE__ */ (0, b.jsx)(W, {
														title: "净资产趋势",
														summary: "按 6 个月现金预测推演",
														children: /* @__PURE__ */ (0, b.jsx)(Ir, {
															data: Oa,
															valueFormatter: H
														})
													})
												]
											})
										})
									}),
									u === "emergency" && /* @__PURE__ */ (0, b.jsxs)(cr, {
										title: "应急&学习金",
										desc: "预算合并显示，应急储备与学习实际支出分开核算；学习额度不计为应急余额。",
										children: [/* @__PURE__ */ (0, b.jsxs)("div", {
											className: "stat-strip",
											children: [/* @__PURE__ */ (0, b.jsx)(U, {
												label: "每月应急划拨预算",
												value: H(t.rows.find((e) => e.id === "emergency")?.[t.mode] ?? 0)
											}), /* @__PURE__ */ (0, b.jsx)(U, {
												label: "每月学习消费预算",
												value: H(t.rows.find((e) => e.id === "learning")?.[t.mode] ?? 0)
											})]
										}), /* @__PURE__ */ (0, b.jsx)(sr, {
											data: /* @__PURE__ */ (0, b.jsxs)(b.Fragment, { children: [
												/* @__PURE__ */ (0, b.jsx)(Cr, {
													saveAction: /* @__PURE__ */ (0, b.jsx)("button", {
														className: "primary-button",
														disabled: !B || L,
														type: "button",
														onClick: () => void an(),
														children: "保存应急设置"
													}),
													emergencyFund: q.currentEmergencyFund,
													accountCount: Xr.length,
													emergencyMonthlyNeed: Ee,
													emergencyMonths: F,
													setEmergencyFund: Li,
													setEmergencyMonthlyNeed: I,
													setEmergencyMonths: De
												}),
												/* @__PURE__ */ (0, b.jsxs)("p", {
													className: "review-caption",
													role: "status",
													children: [
														pt,
														" · ",
														it
													]
												}),
												/* @__PURE__ */ (0, b.jsxs)("div", {
													className: "stat-strip",
													children: [
														/* @__PURE__ */ (0, b.jsx)(U, {
															label: "覆盖月数",
															value: `${q.emergencyCoverage.toFixed(1)} 个月`
														}),
														/* @__PURE__ */ (0, b.jsx)(U, {
															label: "目标金额",
															value: H(q.emergencyTarget)
														}),
														/* @__PURE__ */ (0, b.jsx)(U, {
															label: "缺口",
															value: H(Math.max(0, q.emergencyTarget - q.currentEmergencyFund))
														}),
														/* @__PURE__ */ (0, b.jsx)(U, {
															label: "当前进度",
															value: xn(q.emergencyCoverage / Math.max(F, 1))
														})
													]
												}),
												/* @__PURE__ */ (0, b.jsxs)("label", {
													className: "field",
													children: [/* @__PURE__ */ (0, b.jsx)("span", { children: "学习统计月份" }), /* @__PURE__ */ (0, b.jsx)("select", {
														"aria-label": "学习统计月份",
														value: T,
														onChange: (e) => te(e.target.value),
														children: D.map((e) => /* @__PURE__ */ (0, b.jsx)("option", {
															value: e.id,
															children: e.label
														}, e.id))
													})]
												}),
												/* @__PURE__ */ (0, b.jsx)(Gr, {
													budgets: dr,
													monthLabel: tr.label,
													allowance: t.rows.find((e) => e.id === "learning")?.[t.mode] ?? 0
												})
											] }),
											charts: /* @__PURE__ */ (0, b.jsxs)("div", {
												className: "chart-grid two",
												children: [/* @__PURE__ */ (0, b.jsx)(W, {
													title: "应急金覆盖",
													summary: `${q.emergencyCoverage.toFixed(1)} / ${F} 个月`,
													children: /* @__PURE__ */ (0, b.jsx)(Rr, {
														data: [{
															label: "应急金目标",
															value: q.currentEmergencyFund,
															max: q.emergencyTarget,
															color: V[1],
															detail: `缺口 ${H(Math.max(0, q.emergencyTarget - q.currentEmergencyFund))}`
														}],
														valueFormatter: H
													})
												}), /* @__PURE__ */ (0, b.jsx)(W, {
													title: "必要支出压力",
													summary: `应急基准 ${H(q.emergencyMonthlyNeed)}`,
													children: /* @__PURE__ */ (0, b.jsx)(Pr, {
														data: [
															{
																label: "应急月均支出",
																value: q.emergencyMonthlyNeed,
																color: V[1]
															},
															{
																label: "当前消费预留",
																value: K.consumption,
																color: V[2]
															},
															{
																label: "当前全部安排",
																value: K.totalOutflow,
																color: V[4]
															}
														],
														valueFormatter: H
													})
												})]
											})
										})]
									}),
									u === "reminders" && /* @__PURE__ */ (0, b.jsx)(cr, {
										title: "账单与提醒",
										desc: "网页内提醒，默认提前 7 天；金额可先手动维护。",
										children: /* @__PURE__ */ (0, b.jsx)(sr, {
											data: /* @__PURE__ */ (0, b.jsx)(wr, {
												baseDate: e,
												reminders: Ne,
												addReminder: Ni,
												deleteReminder: Pi,
												updateReminder: Mi
											}),
											charts: /* @__PURE__ */ (0, b.jsxs)("div", {
												className: "chart-grid two",
												children: [
													/* @__PURE__ */ (0, b.jsx)(W, {
														title: "提醒金额",
														summary: "避免漏扣",
														children: /* @__PURE__ */ (0, b.jsx)(Pr, {
															data: ro,
															valueFormatter: H
														})
													}),
													/* @__PURE__ */ (0, b.jsx)(W, {
														title: "距离到期",
														summary: `北京时间 ${e} / 仅今日及未来事项`,
														children: /* @__PURE__ */ (0, b.jsx)(Fr, {
															data: Y,
															valueFormatter: (e) => `${e.toFixed(0)}天`
														})
													}),
													/* @__PURE__ */ (0, b.jsx)(W, {
														title: "提醒日历",
														summary: "未来关键扣款",
														children: /* @__PURE__ */ (0, b.jsx)(zr, { events: oi })
													})
												]
											})
										})
									}),
									u === "goals" && /* @__PURE__ */ (0, b.jsx)(cr, {
										title: "目标管理",
										desc: "旅游、学习、父母储蓄、伴侣基金和大额支出目标都可以维护目标金额；预期准备用于规划，实际投入用于本月计算。",
										children: /* @__PURE__ */ (0, b.jsx)(sr, {
											data: /* @__PURE__ */ (0, b.jsxs)(b.Fragment, { children: [/* @__PURE__ */ (0, b.jsx)(lr, {
												records: D,
												selectedMonth: T,
												onChange: te
											}), /* @__PURE__ */ (0, b.jsx)(Tr, {
												goals: Le,
												accounts: O,
												addGoal: Ri,
												deleteGoal: zi,
												updateGoal: Fi
											})] }),
											charts: /* @__PURE__ */ (0, b.jsxs)("div", {
												className: "chart-grid two",
												children: [
													/* @__PURE__ */ (0, b.jsx)(W, {
														title: "目标进度",
														summary: "当前 / 目标",
														children: /* @__PURE__ */ (0, b.jsx)(Rr, {
															data: Ma,
															valueFormatter: H
														})
													}),
													/* @__PURE__ */ (0, b.jsx)(W, {
														title: "每月预期准备结构",
														summary: `预期 ${H(Fa)}`,
														children: /* @__PURE__ */ (0, b.jsx)(Mr, {
															data: Le.map((e, t) => ({
																label: e.name,
																value: e.monthly,
																color: V[t % V.length]
															})),
															centerLabel: "每月",
															centerValue: H(Fa)
														})
													}),
													/* @__PURE__ */ (0, b.jsx)(W, {
														title: "月度实际目标投入",
														summary: `实际投入 ${H(Ia)}`,
														children: /* @__PURE__ */ (0, b.jsx)(Fr, {
															data: Ra,
															valueFormatter: H
														})
													}),
													/* @__PURE__ */ (0, b.jsx)(W, {
														title: "支出与投入压力",
														summary: "实际支出 + 实际投入",
														children: /* @__PURE__ */ (0, b.jsx)(Fr, {
															data: za,
															valueFormatter: H
														})
													}),
													/* @__PURE__ */ (0, b.jsx)(W, {
														title: "累计准备变化",
														summary: `当前 ${H(Na)}`,
														children: /* @__PURE__ */ (0, b.jsx)(Ir, {
															data: Ba,
															valueFormatter: H
														})
													})
												]
											})
										})
									}),
									u === "fundBuckets" && /* @__PURE__ */ (0, b.jsx)(cr, {
										title: "大花费项目",
										desc: "把旅行、搬家、手机分期、应急金和投资待投金拆开，避免同一笔钱被重复占用。",
										children: /* @__PURE__ */ (0, b.jsx)(sr, {
											data: /* @__PURE__ */ (0, b.jsxs)(b.Fragment, { children: [/* @__PURE__ */ (0, b.jsx)(Dr, { liquidity: Yr }), /* @__PURE__ */ (0, b.jsx)(Er, {
												accounts: O,
												buckets: Va,
												addFundBucket: Vi,
												deleteFundBucket: Hi,
												investmentReserve: q.investmentReserve,
												liquidAfterBuckets: qa,
												monthlyNeed: Ka,
												updateFundBucket: Bi
											})] }),
											charts: /* @__PURE__ */ (0, b.jsxs)("div", {
												className: "chart-grid two",
												children: [
													/* @__PURE__ */ (0, b.jsx)(W, {
														title: "已锁定资金",
														summary: "可提取现金中的占用，已去重",
														children: /* @__PURE__ */ (0, b.jsx)(Mr, {
															data: Za,
															centerLabel: "已锁定",
															centerValue: H(Yr.reserved)
														})
													}),
													/* @__PURE__ */ (0, b.jsx)(W, {
														title: "大花费项目缺口",
														summary: `总缺口 ${H(Wa)}`,
														children: /* @__PURE__ */ (0, b.jsx)(Pr, {
															data: Qa,
															valueFormatter: H
														})
													}),
													/* @__PURE__ */ (0, b.jsx)(W, {
														title: "每月补齐压力",
														summary: `每月需 ${H(Ka)}`,
														children: /* @__PURE__ */ (0, b.jsx)(Fr, {
															data: $a,
															valueFormatter: H
														})
													}),
													/* @__PURE__ */ (0, b.jsx)(W, {
														title: "大花费项目结论",
														summary: qa < 0 || Yr.overallocated > 0 || Yr.unlinkedCount > 0 ? "占用待核对" : "占用已核算",
														children: /* @__PURE__ */ (0, b.jsxs)("div", {
															className: "fund-bucket-note",
															children: [/* @__PURE__ */ (0, b.jsx)("strong", { children: qa < 0 || Yr.overallocated > 0 ? "存在资金占用缺口" : Yr.unlinkedCount > 0 ? "存在未关联账户的项目" : "当前余额可覆盖已锁定金额" }), /* @__PURE__ */ (0, b.jsx)("span", { children: "未准备的项目缺口不冒充已锁定资金。待付账单是否包含在预算内，仍需核对。" })]
														})
													})
												]
											})
										})
									}),
									u === "periodReview" && /* @__PURE__ */ (0, b.jsxs)(cr, {
										title: "周期复盘",
										desc: "本期实际收支与期末余额；整期更新、历史版本及逐账户变化。",
										children: [/* @__PURE__ */ (0, b.jsx)(Et, {
											records: r,
											plan: t,
											accounts: O,
											investments: {
												holdings: A,
												fxUsd: le,
												fxHkd: j
											},
											goals: Le.map(({ id: e, name: t, current: n }) => ({
												id: e,
												name: t,
												current: n
											})),
											dashboardAsOf: s,
											sourceSignature: Pt(jt()),
											moduleUpdates: a,
											moduleSignatures: Object.fromEntries(Object.keys(_t).map((e) => [e, bt(jt(), e)])),
											onSaveModule: (e, t, n) => {
												let { data: r, patch: i } = St(jt(), e, t, n);
												return Mt(r), o(r.reviewUpdates ?? []), ae(r.accounts), ce(r.holdings), ue(r.fxUsd), de(r.fxHkd), ke(r.balanceAssets), Me(r.liabilities), Pe(r.reminders), ze(r.fundBuckets), Ie(r.goals), ne(r.monthlyRecords), r.selectedMonth && te(r.selectedMonth), z(`${_t[t]}已更新并保存到本机`), {
													patch: i,
													moduleSignature: bt(r, t),
													sourceSignature: Pt(r),
													goalsSignature: bt(r, "goals")
												};
											},
											ledgerMonths: D,
											datedEntries: l,
											onSaveIncome: Si,
											onDeleteIncome: Ci,
											focusSource: {
												projects: Re.map(({ id: e, name: t, target: n, current: r, dueDate: i }) => ({
													id: e,
													name: t,
													target: n,
													current: r,
													dueDate: i
												})),
												bills: Ne.map(({ id: e, name: t, amount: n, date: r, kind: i }) => ({
													id: e,
													name: t,
													amount: n,
													date: r,
													kind: i
												})),
												assets: Oe.map(({ id: e, name: t, amount: n }) => ({
													id: e,
													name: t,
													amount: n
												})),
												debts: Ae.map(({ id: e, name: t, amount: n }) => ({
													id: e,
													name: t,
													amount: n
												})),
												holdings: q.investmentValue
											},
											onOpenModule: Gi,
											onChange: (e, t) => {
												let n = Lt(jt(), e, t ?? { publish: !1 });
												return Mt(n), i(n.financeReviews ?? []), o(n.reviewUpdates ?? []), c(n.dashboardAsOf), t?.publish && (ne(n.monthlyRecords), te(n.selectedMonth), ae(n.accounts), ce(n.holdings), ue(n.fxUsd), de(n.fxHkd), ke(n.balanceAssets), Me(n.liabilities), Pe(n.reminders), ze(n.fundBuckets), Ie(n.goals)), z("本期数据与更新前后历史已保存到本机"), {
													sourceSignature: Pt(n),
													record: t ? n.financeReviews?.find((e) => e.id === t.record.id) : void 0,
													moduleSignatures: Object.fromEntries(Object.keys(_t).map((e) => [e, bt(n, e)]))
												};
											}
										}), /* @__PURE__ */ (0, b.jsx)(Rt, {
											updates: a,
											onExport: kn
										})]
									}),
									u === "reports" && /* @__PURE__ */ (0, b.jsx)(cr, {
										title: "财务报表",
										desc: "每月自动生成完整分析报告，覆盖净资产、现金流、投资、大花费项目、家庭责任和风险。",
										children: /* @__PURE__ */ (0, b.jsx)(sr, {
											data: /* @__PURE__ */ (0, b.jsxs)(b.Fragment, { children: [
												/* @__PURE__ */ (0, b.jsxs)("div", {
													className: "stat-strip",
													children: [
														/* @__PURE__ */ (0, b.jsx)(U, {
															label: "收入",
															value: H(fr)
														}),
														/* @__PURE__ */ (0, b.jsx)(U, {
															label: "支出（含基金预留）",
															value: H(q.budgetUsage.spending)
														}),
														/* @__PURE__ */ (0, b.jsx)(U, {
															label: "结余",
															value: H(q.monthlySurplus)
														}),
														/* @__PURE__ */ (0, b.jsx)(U, {
															label: "项目后现金",
															value: H(qa)
														})
													]
												}),
												/* @__PURE__ */ (0, b.jsx)(Or, {
													copyStatus: ht,
													reportText: no,
													sections: eo,
													onCopy: bo
												}),
												/* @__PURE__ */ (0, b.jsx)(kr, {
													allocation: q.budgetUsage.reserved,
													income: fr,
													rows: io,
													spending: q.budgetUsage.spending,
													surplus: q.monthlySurplus
												})
											] }),
											charts: /* @__PURE__ */ (0, b.jsxs)("div", {
												className: "chart-grid two",
												children: [
													/* @__PURE__ */ (0, b.jsx)(W, {
														title: "本月资金流向",
														summary: `储蓄率 ${xn(q.savingsRate)}`,
														children: /* @__PURE__ */ (0, b.jsx)(Fr, {
															data: ao,
															valueFormatter: H
														})
													}),
													/* @__PURE__ */ (0, b.jsx)(W, {
														title: "月度收支对比",
														summary: "收入和支出分月查看",
														children: /* @__PURE__ */ (0, b.jsx)(Fr, {
															data: [...oa, ...sa],
															valueFormatter: H
														})
													}),
													/* @__PURE__ */ (0, b.jsx)(W, {
														title: "现金流未来趋势",
														summary: `6个月末 ${H(ai[ai.length - 1]?.balance ?? 0)}`,
														children: /* @__PURE__ */ (0, b.jsx)(Ir, {
															data: Sa,
															valueFormatter: H
														})
													}),
													/* @__PURE__ */ (0, b.jsx)(W, {
														title: "资金瀑布复盘",
														summary: "收入、支出、分配",
														children: /* @__PURE__ */ (0, b.jsx)(Br, { data: wa })
													}),
													/* @__PURE__ */ (0, b.jsx)(W, {
														title: "风险矩阵",
														summary: "下月关注点",
														children: /* @__PURE__ */ (0, b.jsx)(Vr, { data: co })
													})
												]
											})
										})
									}),
									u === "monthlyArchive" && /* @__PURE__ */ (0, b.jsx)(cr, {
										title: "月度存档",
										desc: "每月底保存一次月报，用来追踪收入、支出、账户余额和净资产的环比变化。",
										children: /* @__PURE__ */ (0, b.jsx)(sr, {
											data: /* @__PURE__ */ (0, b.jsxs)(b.Fragment, { children: [
												/* @__PURE__ */ (0, b.jsx)(lr, {
													records: D,
													selectedMonth: T,
													onAddMonth: fi,
													onChange: te,
													onDeleteSelectedMonth: () => pi(T)
												}),
												/* @__PURE__ */ (0, b.jsxs)("div", {
													className: "stat-strip",
													children: [
														/* @__PURE__ */ (0, b.jsx)(U, {
															label: "收入变化",
															value: ri ? Kn(go) : "待对比"
														}),
														/* @__PURE__ */ (0, b.jsx)(U, {
															label: "支出变化",
															value: ri ? Kn(_o) : "待对比"
														}),
														/* @__PURE__ */ (0, b.jsx)(U, {
															label: "账户变化",
															value: ri ? Kn(vo) : "待对比"
														}),
														/* @__PURE__ */ (0, b.jsx)(U, {
															label: "净资产变化",
															value: ri ? Kn(yo) : "待对比"
														})
													]
												}),
												/* @__PURE__ */ (0, b.jsx)(gr, {
													archives: Xe,
													currentArchive: ei,
													deleteMonthlyArchive: $r,
													saveMonthlyArchive: Qr,
													selectedMonth: T,
													onSelectMonth: te
												}),
												/* @__PURE__ */ (0, b.jsx)(_r, {
													currentArchive: ni,
													previousArchive: ri
												})
											] }),
											charts: /* @__PURE__ */ (0, b.jsxs)("div", {
												className: "chart-grid two",
												children: [
													/* @__PURE__ */ (0, b.jsx)(W, {
														title: "存档收入趋势",
														summary: `${ii.length} 个月 / 当前 ${H(fr)}`,
														children: /* @__PURE__ */ (0, b.jsx)(Fr, {
															data: uo,
															valueFormatter: H
														})
													}),
													/* @__PURE__ */ (0, b.jsx)(W, {
														title: "存档支出趋势",
														summary: `当前支出 ${H(q.spendingActual)}`,
														children: /* @__PURE__ */ (0, b.jsx)(Fr, {
															data: fo,
															valueFormatter: H
														})
													}),
													/* @__PURE__ */ (0, b.jsx)(W, {
														title: "账户余额变化",
														summary: `当前账户 ${H(q.accountTotal)}`,
														children: /* @__PURE__ */ (0, b.jsx)(Ir, {
															data: mo,
															valueFormatter: H
														})
													}),
													/* @__PURE__ */ (0, b.jsx)(W, {
														title: "净资产变化",
														summary: `当前净资产 ${H(q.netWorth)}`,
														children: /* @__PURE__ */ (0, b.jsx)(Ir, {
															data: po,
															valueFormatter: H
														})
													}),
													/* @__PURE__ */ (0, b.jsx)(W, {
														title: "当月余额变化",
														summary: "收入 - 支出 - 分配",
														children: /* @__PURE__ */ (0, b.jsx)(Ir, {
															data: ho,
															valueFormatter: H
														})
													})
												]
											})
										})
									}),
									u === "cloudSync" && /* @__PURE__ */ (0, b.jsx)(cr, {
										title: "云同步",
										desc: "点击保存会把加密数据写入 GitHub Gist；另一台电脑可从这里恢复同一份数据。",
										children: /* @__PURE__ */ (0, b.jsx)(sr, {
											data: /* @__PURE__ */ (0, b.jsx)(hr, {
												cloudPassphrase: nt,
												cloudStatus: it,
												cloudSyncing: L,
												clearCloudSyncSettings: Zn,
												downloadCloudSync: er,
												settings: et,
												setCloudPassphrase: Xn,
												updateCloudSyncSettings: qn,
												uploadCloudSync: () => void $n(!1)
											}),
											charts: /* @__PURE__ */ (0, b.jsxs)("div", {
												className: "chart-grid two",
												children: [/* @__PURE__ */ (0, b.jsx)(W, {
													title: "同步状态",
													summary: et.gistId ? "已配置 Gist" : "未创建云端存档",
													children: /* @__PURE__ */ (0, b.jsxs)("div", {
														className: "cloud-status-board",
														children: [
															/* @__PURE__ */ (0, b.jsxs)("div", { children: [/* @__PURE__ */ (0, b.jsx)("span", { children: "云端 Gist" }), /* @__PURE__ */ (0, b.jsx)("strong", { children: et.gistId || "未创建" })] }),
															/* @__PURE__ */ (0, b.jsxs)("div", { children: [/* @__PURE__ */ (0, b.jsx)("span", { children: "自动同步" }), /* @__PURE__ */ (0, b.jsx)("strong", { children: et.autoSync ? "开启" : "关闭" })] }),
															/* @__PURE__ */ (0, b.jsxs)("div", { children: [/* @__PURE__ */ (0, b.jsx)("span", { children: "打开自动恢复" }), /* @__PURE__ */ (0, b.jsx)("strong", { children: et.rememberPassphrase ? "开启" : "关闭" })] }),
															/* @__PURE__ */ (0, b.jsxs)("div", { children: [/* @__PURE__ */ (0, b.jsx)("span", { children: "上次上传" }), /* @__PURE__ */ (0, b.jsx)("strong", { children: et.lastPushedAt ? Gn(et.lastPushedAt) : "暂无" })] }),
															/* @__PURE__ */ (0, b.jsxs)("div", { children: [/* @__PURE__ */ (0, b.jsx)("span", { children: "上次拉取" }), /* @__PURE__ */ (0, b.jsx)("strong", { children: et.lastPulledAt ? Gn(et.lastPulledAt) : "暂无" })] })
														]
													})
												}), /* @__PURE__ */ (0, b.jsx)(W, {
													title: "本机数据包",
													summary: `${D.length} 个月 / ${Xe.length} 条月报`,
													children: /* @__PURE__ */ (0, b.jsx)(Pr, {
														data: [
															{
																label: "收入月份",
																value: D.length,
																color: V[0]
															},
															{
																label: "月度存档",
																value: Xe.length,
																color: V[1]
															},
															{
																label: "完整版本",
																value: qe.length,
																color: V[3]
															},
															{
																label: "账户数量",
																value: O.length,
																color: V[2]
															}
														],
														valueFormatter: (e) => `${e.toFixed(0)} 条`
													})
												})]
											})
										})
									}),
									u === "health" && /* @__PURE__ */ (0, b.jsx)(cr, {
										title: "财务健康评分",
										desc: "100 分制，用现金流、应急金、负债、增长和趋势综合判断。",
										children: /* @__PURE__ */ (0, b.jsx)(sr, {
											data: /* @__PURE__ */ (0, b.jsxs)(b.Fragment, { children: [
												/* @__PURE__ */ (0, b.jsxs)("div", {
													className: "health-score",
													style: { "--score": `${q.score}%` },
													children: [/* @__PURE__ */ (0, b.jsx)("strong", { children: q.score }), /* @__PURE__ */ (0, b.jsx)("span", { children: "财务健康分" })]
												}),
												/* @__PURE__ */ (0, b.jsx)(Ar, {
													emergencyMonthlyNeed: Ee,
													emergencyMonths: F,
													addLiability: Ai,
													deleteLiability: ji,
													liabilities: Ae,
													setEmergencyMonthlyNeed: I,
													setEmergencyMonths: De,
													updateLiability: ki
												}),
												/* @__PURE__ */ (0, b.jsxs)("div", {
													className: "stat-strip",
													children: [
														/* @__PURE__ */ (0, b.jsx)(U, {
															label: "固定支出率",
															value: xn(q.fixedRatio)
														}),
														/* @__PURE__ */ (0, b.jsx)(U, {
															label: "应急覆盖",
															value: `${q.emergencyCoverage.toFixed(1)}个月`
														}),
														/* @__PURE__ */ (0, b.jsx)(U, {
															label: "负债率",
															value: xn(q.debtRatio)
														}),
														/* @__PURE__ */ (0, b.jsx)(U, {
															label: "投资盈亏",
															value: H(q.investmentPnL)
														})
													]
												})
											] }),
											charts: /* @__PURE__ */ (0, b.jsxs)("div", {
												className: "chart-grid two",
												children: [
													/* @__PURE__ */ (0, b.jsx)(W, {
														title: "健康维度拆解",
														summary: "五项分数",
														children: /* @__PURE__ */ (0, b.jsx)(Pr, {
															data: so,
															valueFormatter: (e) => `${e.toFixed(0)}分`,
															percentMode: !0
														})
													}),
													/* @__PURE__ */ (0, b.jsx)(W, {
														title: "资产抗风险结构",
														summary: "账户 / 应急 / 负债",
														children: /* @__PURE__ */ (0, b.jsx)(Mr, {
															data: ya,
															centerLabel: "覆盖",
															centerValue: `${q.emergencyCoverage.toFixed(1)}月`
														})
													}),
													/* @__PURE__ */ (0, b.jsx)(W, {
														title: "风险矩阵",
														summary: "影响 × 紧迫",
														children: /* @__PURE__ */ (0, b.jsx)(Vr, { data: co })
													})
												]
											})
										})
									}),
									u === "future" && /* @__PURE__ */ (0, b.jsx)(cr, {
										title: "数据能力",
										desc: "债务、保险、数据质量、规则引擎先放结构，等后续数据补齐再激活。",
										children: /* @__PURE__ */ (0, b.jsx)(sr, {
											data: /* @__PURE__ */ (0, b.jsx)(jr, {
												capabilities: Be,
												updateCapability: Ui
											}),
											charts: /* @__PURE__ */ (0, b.jsxs)("div", {
												className: "chart-grid two",
												children: [/* @__PURE__ */ (0, b.jsx)(W, {
													title: "能力成熟度",
													summary: "未来模块占位评分",
													children: /* @__PURE__ */ (0, b.jsx)(Pr, {
														data: lo,
														valueFormatter: (e) => `${e.toFixed(0)}分`,
														percentMode: !0
													})
												}), /* @__PURE__ */ (0, b.jsx)(W, {
													title: "规则覆盖路线",
													summary: "自动分类 / 校验 / 提醒",
													children: /* @__PURE__ */ (0, b.jsx)(Lr, {
														data: lo,
														valueFormatter: (e) => `${e.toFixed(0)}分`
													})
												})]
											})
										})
									})
								]
							}, u))]
						})
					]
				})
			]
		})]
	});
}
function or(e, t, n, r) {
	return t === "USD" ? e * n : t === "HKD" ? e * r : e;
}
function sr({ data: e, charts: t }) {
	return /* @__PURE__ */ (0, b.jsxs)("div", {
		className: "data-chart-layout",
		children: [/* @__PURE__ */ (0, b.jsxs)("section", {
			className: "data-pane",
			children: [/* @__PURE__ */ (0, b.jsx)("div", {
				className: "pane-label",
				children: "数据区"
			}), e]
		}), /* @__PURE__ */ (0, b.jsxs)("section", {
			className: "chart-pane",
			children: [/* @__PURE__ */ (0, b.jsx)("div", {
				className: "pane-label",
				children: "图表区"
			}), t]
		})]
	});
}
function cr({ title: e, desc: t, children: n }) {
	return /* @__PURE__ */ (0, b.jsxs)(b.Fragment, { children: [/* @__PURE__ */ (0, b.jsx)("div", {
		className: "section-title",
		children: /* @__PURE__ */ (0, b.jsxs)("div", { children: [/* @__PURE__ */ (0, b.jsx)("h2", { children: e }), /* @__PURE__ */ (0, b.jsx)("p", { children: t })] })
	}), /* @__PURE__ */ (0, b.jsx)("div", {
		className: "module-body",
		children: n
	})] });
}
function U({ label: e, value: t }) {
	return /* @__PURE__ */ (0, b.jsxs)("article", {
		className: "stat-card",
		children: [/* @__PURE__ */ (0, b.jsx)("span", { children: e }), /* @__PURE__ */ (0, b.jsx)("strong", { children: t })]
	});
}
function lr({ records: e, selectedMonth: t, onAddMonth: n, onChange: r, onDeleteSelectedMonth: i }) {
	return /* @__PURE__ */ (0, b.jsxs)("div", {
		className: "month-selector-shell",
		children: [/* @__PURE__ */ (0, b.jsx)("div", {
			className: "month-selector",
			"aria-label": "月份切换",
			children: e.map((e) => /* @__PURE__ */ (0, b.jsxs)("button", {
				className: e.id === t ? "active" : "",
				type: "button",
				onClick: () => r(e.id),
				children: [/* @__PURE__ */ (0, b.jsx)("strong", { children: Cn(e.label) }), /* @__PURE__ */ (0, b.jsx)("span", { children: e.id === t ? "当前" : "切换" })]
			}, e.id))
		}), (n || i) && /* @__PURE__ */ (0, b.jsxs)("div", {
			className: "month-selector-actions",
			children: [n && /* @__PURE__ */ (0, b.jsx)("button", {
				className: "secondary-button",
				type: "button",
				onClick: n,
				children: "新增月份"
			}), i && /* @__PURE__ */ (0, b.jsx)("button", {
				className: "danger-button",
				disabled: e.length <= 1,
				type: "button",
				onClick: i,
				children: "删除当前月"
			})]
		})]
	});
}
function W({ title: e, summary: t, children: n, className: r = "" }) {
	return /* @__PURE__ */ (0, b.jsxs)("article", {
		className: `chart-panel ${r}`.trim(),
		children: [/* @__PURE__ */ (0, b.jsxs)("div", {
			className: "chart-head",
			children: [/* @__PURE__ */ (0, b.jsx)("strong", { children: e }), /* @__PURE__ */ (0, b.jsx)("span", { children: t })]
		}), n]
	});
}
function G({ value: e, onChange: t, min: n = 0, max: r, step: i = 100, ariaLabel: a }) {
	return /* @__PURE__ */ (0, b.jsx)("input", {
		"aria-label": a,
		className: "table-input",
		inputMode: "decimal",
		max: r,
		min: n,
		step: i,
		type: "number",
		value: Number.isFinite(e) ? e : 0,
		onChange: (e) => t(bn(e.target.value))
	});
}
function ur({ value: e, onChange: t, ariaLabel: n, placeholder: r }) {
	return /* @__PURE__ */ (0, b.jsx)("input", {
		"aria-label": n,
		className: "table-input text",
		placeholder: r,
		type: "text",
		value: e,
		onChange: (e) => t(e.target.value)
	});
}
function dr({ value: e, onChange: t, ariaLabel: n }) {
	return /* @__PURE__ */ (0, b.jsx)("input", {
		"aria-label": n,
		className: "table-input",
		type: "date",
		value: e,
		onInput: (n) => {
			n.currentTarget.validity.valid && n.currentTarget.value !== e && t(n.currentTarget.value);
		},
		onChange: (e) => t(e.target.value)
	});
}
function fr({ value: e, options: t, onChange: n, ariaLabel: r }) {
	return /* @__PURE__ */ (0, b.jsx)("select", {
		className: "table-input",
		"aria-label": r,
		value: e,
		onChange: (e) => n(e.target.value),
		children: t.map((e) => /* @__PURE__ */ (0, b.jsx)("option", {
			value: e,
			children: e
		}, e))
	});
}
function pr({ checked: e, onChange: t, ariaLabel: n }) {
	return /* @__PURE__ */ (0, b.jsx)("input", {
		"aria-label": n,
		checked: e,
		className: "table-check",
		type: "checkbox",
		onChange: (e) => t(e.target.checked)
	});
}
function K({ title: e, meta: t, action: n }) {
	return /* @__PURE__ */ (0, b.jsxs)("div", {
		className: "table-toolbar",
		children: [/* @__PURE__ */ (0, b.jsxs)("div", { children: [/* @__PURE__ */ (0, b.jsx)("strong", { children: e }), /* @__PURE__ */ (0, b.jsx)("span", { children: t })] }), n]
	});
}
function mr({ records: e, selectedMonth: t, onSelect: n, addMonthRecord: r, deleteMonthRecord: i, updateMonthRecord: a }) {
	let o = e.find((e) => e.id === t) ?? e[0];
	return /* @__PURE__ */ (0, b.jsxs)(b.Fragment, { children: [/* @__PURE__ */ (0, b.jsx)(K, {
		title: "月度收入底表",
		meta: `${e.length} 个月 / 当前 ${o.label} / 实际收入 ${H(En(o))}`,
		action: /* @__PURE__ */ (0, b.jsx)("button", {
			className: "secondary-button",
			type: "button",
			onClick: r,
			children: "新增月份"
		})
	}), /* @__PURE__ */ (0, b.jsx)("div", {
		className: "table-wrap spreadsheet-wrap",
		children: /* @__PURE__ */ (0, b.jsxs)("table", {
			className: "spreadsheet-table",
			children: [/* @__PURE__ */ (0, b.jsx)("thead", { children: /* @__PURE__ */ (0, b.jsxs)("tr", { children: [
				/* @__PURE__ */ (0, b.jsx)("th", { children: "月份" }),
				/* @__PURE__ */ (0, b.jsx)("th", { children: "工资到账记录" }),
				/* @__PURE__ */ (0, b.jsx)("th", { children: "到账日" }),
				/* @__PURE__ */ (0, b.jsx)("th", { children: "炒股月结" }),
				/* @__PURE__ */ (0, b.jsx)("th", { children: "其他收入" }),
				/* @__PURE__ */ (0, b.jsx)("th", { children: "实际收入" }),
				/* @__PURE__ */ (0, b.jsx)("th", { children: "状态" }),
				/* @__PURE__ */ (0, b.jsx)("th", { children: "操作" })
			] }) }), /* @__PURE__ */ (0, b.jsx)("tbody", { children: e.map((r) => /* @__PURE__ */ (0, b.jsxs)("tr", {
				className: r.id === t ? "selected-row" : "",
				children: [
					/* @__PURE__ */ (0, b.jsx)("td", { children: /* @__PURE__ */ (0, b.jsx)("button", {
						className: "row-select-button",
						type: "button",
						onClick: () => n(r.id),
						children: r.label
					}) }),
					/* @__PURE__ */ (0, b.jsx)("td", { children: /* @__PURE__ */ (0, b.jsx)(G, {
						ariaLabel: `${r.label} 工资`,
						value: r.salary,
						onChange: (e) => a(r.id, { salary: e })
					}) }),
					/* @__PURE__ */ (0, b.jsx)("td", { children: /* @__PURE__ */ (0, b.jsx)(G, {
						ariaLabel: `${r.label} 到账日`,
						max: 31,
						min: 1,
						step: 1,
						value: r.payday,
						onChange: (e) => a(r.id, { payday: e })
					}) }),
					/* @__PURE__ */ (0, b.jsx)("td", { children: /* @__PURE__ */ (0, b.jsx)(G, {
						ariaLabel: `${r.label} 炒股月结`,
						value: r.stockIncome,
						onChange: (e) => a(r.id, { stockIncome: e })
					}) }),
					/* @__PURE__ */ (0, b.jsx)("td", { children: /* @__PURE__ */ (0, b.jsx)(G, {
						ariaLabel: `${r.label} 其他收入`,
						value: r.otherIncome,
						onChange: (e) => a(r.id, { otherIncome: e })
					}) }),
					/* @__PURE__ */ (0, b.jsx)("td", {
						className: "calculated-cell",
						children: H(En(r))
					}),
					/* @__PURE__ */ (0, b.jsx)("td", { children: /* @__PURE__ */ (0, b.jsx)("span", {
						className: r.id === t ? "pill good" : "pill",
						children: r.id === t ? "当前" : "可选"
					}) }),
					/* @__PURE__ */ (0, b.jsx)("td", { children: /* @__PURE__ */ (0, b.jsx)("button", {
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
function hr({ settings: e, cloudPassphrase: t, cloudStatus: n, cloudSyncing: r, updateCloudSyncSettings: i, setCloudPassphrase: a, uploadCloudSync: o, downloadCloudSync: s, clearCloudSyncSettings: c }) {
	return /* @__PURE__ */ (0, b.jsxs)(b.Fragment, { children: [/* @__PURE__ */ (0, b.jsx)(K, {
		title: "云同步连接",
		meta: e.gistId ? `Gist ${e.gistId}` : "首次上传会自动创建私密 Gist",
		action: /* @__PURE__ */ (0, b.jsx)("span", {
			className: e.autoSync ? "pill good" : "pill",
			children: e.autoSync ? "自动云同步" : "手动同步"
		})
	}), /* @__PURE__ */ (0, b.jsxs)("div", {
		className: "cloud-sync-card",
		children: [
			/* @__PURE__ */ (0, b.jsxs)("div", {
				className: "form-grid cloud-sync-form",
				children: [
					/* @__PURE__ */ (0, b.jsxs)("label", {
						className: "field",
						children: [/* @__PURE__ */ (0, b.jsx)("span", { children: "Gist ID" }), /* @__PURE__ */ (0, b.jsx)("input", {
							autoComplete: "off",
							placeholder: "首次上传可留空",
							value: e.gistId,
							onChange: (e) => i({ gistId: e.target.value.trim() })
						})]
					}),
					/* @__PURE__ */ (0, b.jsxs)("label", {
						className: "field",
						children: [/* @__PURE__ */ (0, b.jsx)("span", { children: "GitHub Token" }), /* @__PURE__ */ (0, b.jsx)("input", {
							autoComplete: "off",
							placeholder: "需要 gist 权限",
							type: "password",
							value: e.token,
							onChange: (e) => i({ token: e.target.value.trim() })
						})]
					}),
					/* @__PURE__ */ (0, b.jsxs)("label", {
						className: "field",
						children: [/* @__PURE__ */ (0, b.jsx)("span", { children: "同步密码" }), /* @__PURE__ */ (0, b.jsx)("input", {
							autoComplete: "new-password",
							placeholder: e.rememberPassphrase ? "已选择本机保存" : "默认不保存",
							type: "password",
							value: t,
							onChange: (e) => a(e.target.value)
						})]
					}),
					/* @__PURE__ */ (0, b.jsxs)("label", {
						className: "field cloud-switch-field",
						children: [/* @__PURE__ */ (0, b.jsx)("span", { children: "自动云同步" }), /* @__PURE__ */ (0, b.jsxs)("span", {
							className: "cloud-switch-row",
							children: [/* @__PURE__ */ (0, b.jsx)("input", {
								checked: e.autoSync,
								type: "checkbox",
								onChange: (e) => i({ autoSync: e.target.checked })
							}), /* @__PURE__ */ (0, b.jsx)("em", { children: e.autoSync ? "已开启" : "已关闭" })]
						})]
					}),
					/* @__PURE__ */ (0, b.jsxs)("label", {
						className: "field cloud-switch-field",
						children: [/* @__PURE__ */ (0, b.jsx)("span", { children: "打开时自动恢复" }), /* @__PURE__ */ (0, b.jsxs)("span", {
							className: "cloud-switch-row",
							children: [/* @__PURE__ */ (0, b.jsx)("input", {
								checked: e.rememberPassphrase,
								type: "checkbox",
								onChange: (e) => i({ rememberPassphrase: e.target.checked })
							}), /* @__PURE__ */ (0, b.jsx)("em", { children: e.rememberPassphrase ? "本机记住密码" : "需手动输入密码" })]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, b.jsxs)("div", {
				className: "cloud-sync-actions",
				children: [
					/* @__PURE__ */ (0, b.jsx)("button", {
						className: "primary-button",
						disabled: r,
						type: "button",
						onClick: o,
						children: "保存到云端"
					}),
					/* @__PURE__ */ (0, b.jsx)("button", {
						className: "secondary-button",
						disabled: r,
						type: "button",
						onClick: s,
						children: "恢复云端数据"
					}),
					/* @__PURE__ */ (0, b.jsx)("button", {
						className: "danger-button",
						disabled: r && !e.gistId,
						type: "button",
						onClick: c,
						children: "断开本机配置"
					})
				]
			}),
			/* @__PURE__ */ (0, b.jsxs)("div", {
				className: "cloud-sync-status",
				children: [/* @__PURE__ */ (0, b.jsx)("strong", { children: r ? "同步中…" : n }), /* @__PURE__ */ (0, b.jsx)("span", { children: "云端内容使用同步密码加密；Token 和可选保存的同步密码只保存在当前浏览器。" })]
			})
		]
	})] });
}
function gr({ archives: e, currentArchive: t, selectedMonth: n, saveMonthlyArchive: r, deleteMonthlyArchive: i, onSelectMonth: a }) {
	let o = [...e].sort((e, t) => t.monthId.localeCompare(e.monthId) || t.savedAt.localeCompare(e.savedAt)), s = e.find((e) => e.monthId === n), c = Yn(e, n), l = c ? t.income - c.income : 0, u = c ? t.spending - c.spending : 0, d = c ? t.accountTotal - c.accountTotal : 0, f = c ? t.netWorth - c.netWorth : 0;
	return /* @__PURE__ */ (0, b.jsxs)(b.Fragment, { children: [
		/* @__PURE__ */ (0, b.jsx)(K, {
			title: "月度存档底表",
			meta: `${e.length} 条月报 / 当前 ${t.label}${s ? " 已保存" : " 未保存"}`,
			action: /* @__PURE__ */ (0, b.jsx)("button", {
				className: "primary-button",
				type: "button",
				onClick: () => void r(),
				children: "保存当前月报"
			})
		}),
		/* @__PURE__ */ (0, b.jsxs)("div", {
			className: "archive-current-grid",
			"aria-label": "当前月报预览",
			children: [
				/* @__PURE__ */ (0, b.jsxs)("div", {
					className: "archive-current-metric",
					children: [
						/* @__PURE__ */ (0, b.jsx)("span", { children: "当前收入" }),
						/* @__PURE__ */ (0, b.jsx)("strong", { children: H(t.income) }),
						/* @__PURE__ */ (0, b.jsx)("em", {
							className: c ? qn(l) : "",
							children: c ? Kn(l) : "等待上月月报"
						})
					]
				}),
				/* @__PURE__ */ (0, b.jsxs)("div", {
					className: "archive-current-metric",
					children: [
						/* @__PURE__ */ (0, b.jsx)("span", { children: "当前支出" }),
						/* @__PURE__ */ (0, b.jsx)("strong", { children: H(t.spending) }),
						/* @__PURE__ */ (0, b.jsx)("em", { children: c ? Kn(u) : "等待上月月报" })
					]
				}),
				/* @__PURE__ */ (0, b.jsxs)("div", {
					className: "archive-current-metric",
					children: [
						/* @__PURE__ */ (0, b.jsx)("span", { children: "账户余额" }),
						/* @__PURE__ */ (0, b.jsx)("strong", { children: H(t.accountTotal) }),
						/* @__PURE__ */ (0, b.jsx)("em", {
							className: c ? qn(d) : "",
							children: c ? Kn(d) : "等待上月月报"
						})
					]
				}),
				/* @__PURE__ */ (0, b.jsxs)("div", {
					className: "archive-current-metric",
					children: [
						/* @__PURE__ */ (0, b.jsx)("span", { children: "净资产" }),
						/* @__PURE__ */ (0, b.jsx)("strong", { children: H(t.netWorth) }),
						/* @__PURE__ */ (0, b.jsx)("em", {
							className: c ? qn(f) : "",
							children: c ? Kn(f) : "等待上月月报"
						})
					]
				})
			]
		}),
		/* @__PURE__ */ (0, b.jsx)("div", {
			className: "table-wrap spreadsheet-wrap",
			children: /* @__PURE__ */ (0, b.jsxs)("table", {
				className: "spreadsheet-table monthly-archive-table",
				children: [/* @__PURE__ */ (0, b.jsx)("thead", { children: /* @__PURE__ */ (0, b.jsxs)("tr", { children: [
					/* @__PURE__ */ (0, b.jsx)("th", { children: "月份" }),
					/* @__PURE__ */ (0, b.jsx)("th", { children: "保存时间" }),
					/* @__PURE__ */ (0, b.jsx)("th", { children: "收入" }),
					/* @__PURE__ */ (0, b.jsx)("th", { children: "支出" }),
					/* @__PURE__ */ (0, b.jsx)("th", { children: "资产分配" }),
					/* @__PURE__ */ (0, b.jsx)("th", { children: "当月余额" }),
					/* @__PURE__ */ (0, b.jsx)("th", { children: "账户余额" }),
					/* @__PURE__ */ (0, b.jsx)("th", { children: "净资产" }),
					/* @__PURE__ */ (0, b.jsx)("th", { children: "环比变化" }),
					/* @__PURE__ */ (0, b.jsx)("th", { children: "操作" })
				] }) }), /* @__PURE__ */ (0, b.jsxs)("tbody", { children: [o.length === 0 && /* @__PURE__ */ (0, b.jsx)("tr", { children: /* @__PURE__ */ (0, b.jsx)("td", {
					className: "calculated-cell",
					colSpan: 10,
					children: "还没有月度存档。确认当月数据后点击“保存当前月报”。"
				}) }), o.map((t) => {
					let r = Yn(e, t.monthId), o = r ? t.income - r.income : 0, s = r ? t.spending - r.spending : 0, c = r ? t.accountTotal - r.accountTotal : 0, l = r ? t.netWorth - r.netWorth : 0;
					return /* @__PURE__ */ (0, b.jsxs)("tr", {
						className: t.monthId === n ? "selected-row" : "",
						children: [
							/* @__PURE__ */ (0, b.jsx)("td", { children: /* @__PURE__ */ (0, b.jsx)("button", {
								className: "row-select-button",
								type: "button",
								onClick: () => a(t.monthId),
								children: t.label
							}) }),
							/* @__PURE__ */ (0, b.jsx)("td", { children: Gn(t.savedAt) }),
							/* @__PURE__ */ (0, b.jsx)("td", {
								className: "calculated-cell",
								children: H(t.income)
							}),
							/* @__PURE__ */ (0, b.jsx)("td", {
								className: "calculated-cell",
								children: H(t.spending)
							}),
							/* @__PURE__ */ (0, b.jsx)("td", {
								className: "calculated-cell",
								children: H(t.allocation)
							}),
							/* @__PURE__ */ (0, b.jsx)("td", {
								className: qn(t.surplus),
								children: H(t.surplus)
							}),
							/* @__PURE__ */ (0, b.jsx)("td", {
								className: "calculated-cell",
								children: H(t.accountTotal)
							}),
							/* @__PURE__ */ (0, b.jsx)("td", {
								className: "calculated-cell",
								children: H(t.netWorth)
							}),
							/* @__PURE__ */ (0, b.jsx)("td", { children: r ? /* @__PURE__ */ (0, b.jsxs)("div", {
								className: "archive-change-stack",
								children: [
									/* @__PURE__ */ (0, b.jsxs)("span", {
										className: qn(o),
										children: ["收入 ", Kn(o)]
									}),
									/* @__PURE__ */ (0, b.jsxs)("span", { children: ["支出 ", Kn(s)] }),
									/* @__PURE__ */ (0, b.jsxs)("span", {
										className: qn(c),
										children: ["账户 ", Kn(c)]
									}),
									/* @__PURE__ */ (0, b.jsxs)("span", {
										className: qn(l),
										children: ["净资产 ", Kn(l)]
									})
								]
							}) : /* @__PURE__ */ (0, b.jsx)("span", {
								className: "pill",
								children: "首月基准"
							}) }),
							/* @__PURE__ */ (0, b.jsx)("td", { children: /* @__PURE__ */ (0, b.jsx)("button", {
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
function _r({ currentArchive: e, previousArchive: t }) {
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
	return /* @__PURE__ */ (0, b.jsxs)(b.Fragment, { children: [/* @__PURE__ */ (0, b.jsx)(K, {
		title: "账户余额变化",
		meta: t ? `${t.label} → ${e.label}` : "保存至少两个不同月份后显示账户环比"
	}), /* @__PURE__ */ (0, b.jsx)("div", {
		className: "table-wrap spreadsheet-wrap",
		children: /* @__PURE__ */ (0, b.jsxs)("table", {
			className: "spreadsheet-table account-change-table",
			children: [/* @__PURE__ */ (0, b.jsx)("thead", { children: /* @__PURE__ */ (0, b.jsxs)("tr", { children: [
				/* @__PURE__ */ (0, b.jsx)("th", { children: "账户" }),
				/* @__PURE__ */ (0, b.jsx)("th", { children: "用途" }),
				/* @__PURE__ */ (0, b.jsx)("th", { children: "上次月报" }),
				/* @__PURE__ */ (0, b.jsx)("th", { children: "当前月报" }),
				/* @__PURE__ */ (0, b.jsx)("th", { children: "变化" }),
				/* @__PURE__ */ (0, b.jsx)("th", { children: "状态" })
			] }) }), /* @__PURE__ */ (0, b.jsxs)("tbody", { children: [!t && /* @__PURE__ */ (0, b.jsx)("tr", { children: /* @__PURE__ */ (0, b.jsx)("td", {
				className: "calculated-cell",
				colSpan: 6,
				children: "暂无上一个月份的月报。保存两个不同月份后，这里会显示每个账户的增减。"
			}) }), t && i.map((e) => /* @__PURE__ */ (0, b.jsxs)("tr", { children: [
				/* @__PURE__ */ (0, b.jsxs)("td", { children: [/* @__PURE__ */ (0, b.jsx)("strong", { children: e.name }), /* @__PURE__ */ (0, b.jsx)("span", {
					className: "table-subtext",
					children: e.type
				})] }),
				/* @__PURE__ */ (0, b.jsx)("td", { children: e.purpose || "未填写" }),
				/* @__PURE__ */ (0, b.jsx)("td", {
					className: "calculated-cell",
					children: H(e.previousBalance)
				}),
				/* @__PURE__ */ (0, b.jsx)("td", {
					className: "calculated-cell",
					children: H(e.currentBalance)
				}),
				/* @__PURE__ */ (0, b.jsx)("td", {
					className: qn(e.delta),
					children: Kn(e.delta)
				}),
				/* @__PURE__ */ (0, b.jsx)("td", { children: /* @__PURE__ */ (0, b.jsx)("span", {
					className: e.status === "持平" ? "pill" : "pill good",
					children: e.status
				}) })
			] }, e.id))] })]
		})
	})] });
}
function vr({ accountTotal: e, addCashflowCustomItem: t, monthlyInflow: n, monthlyOutflow: r, rows: i }) {
	return /* @__PURE__ */ (0, b.jsxs)(b.Fragment, { children: [/* @__PURE__ */ (0, b.jsx)(K, {
		title: "现金流参数底表",
		meta: `月流入 ${H(n)} / 月流出 ${H(r)} / 期初现金 ${H(e)}`,
		action: /* @__PURE__ */ (0, b.jsx)("button", {
			className: "secondary-button",
			type: "button",
			onClick: t,
			children: "新增现金流"
		})
	}), /* @__PURE__ */ (0, b.jsx)("div", {
		className: "table-wrap spreadsheet-wrap",
		children: /* @__PURE__ */ (0, b.jsxs)("table", {
			className: "spreadsheet-table",
			children: [/* @__PURE__ */ (0, b.jsx)("thead", { children: /* @__PURE__ */ (0, b.jsxs)("tr", { children: [
				/* @__PURE__ */ (0, b.jsx)("th", { children: "项目" }),
				/* @__PURE__ */ (0, b.jsx)("th", { children: "数值" }),
				/* @__PURE__ */ (0, b.jsx)("th", { children: "口径" }),
				/* @__PURE__ */ (0, b.jsx)("th", { children: "操作" })
			] }) }), /* @__PURE__ */ (0, b.jsxs)("tbody", { children: [i.length === 0 && /* @__PURE__ */ (0, b.jsx)("tr", { children: /* @__PURE__ */ (0, b.jsx)("td", {
				className: "calculated-cell",
				colSpan: 4,
				children: "暂无现金流行，点击新增现金流开始录入。"
			}) }), i.map((e) => /* @__PURE__ */ (0, b.jsxs)("tr", { children: [
				/* @__PURE__ */ (0, b.jsx)("td", { children: e.onNameChange ? /* @__PURE__ */ (0, b.jsx)(ur, {
					ariaLabel: `${e.name} 项目`,
					value: e.name,
					onChange: e.onNameChange
				}) : e.name }),
				/* @__PURE__ */ (0, b.jsx)("td", { children: e.readonlyAmount || !e.onAmountChange ? /* @__PURE__ */ (0, b.jsx)("span", {
					className: "calculated-cell",
					children: H(e.amount)
				}) : /* @__PURE__ */ (0, b.jsx)(G, {
					ariaLabel: `${e.name} 数值`,
					value: e.amount,
					onChange: e.onAmountChange
				}) }),
				/* @__PURE__ */ (0, b.jsx)("td", { children: e.onDirectionChange ? /* @__PURE__ */ (0, b.jsx)(fr, {
					ariaLabel: `${e.name} 口径`,
					options: ["现金流出", "计入预测"],
					value: e.direction === "inflow" ? "计入预测" : "现金流出",
					onChange: (t) => e.onDirectionChange?.(t === "计入预测" ? "inflow" : "outflow")
				}) : e.source }),
				/* @__PURE__ */ (0, b.jsx)("td", { children: e.onDelete ? /* @__PURE__ */ (0, b.jsx)("button", {
					className: "danger-button compact",
					type: "button",
					onClick: e.onDelete,
					children: "删除"
				}) : /* @__PURE__ */ (0, b.jsx)("span", {
					className: "calculated-cell",
					children: "自动同步"
				}) })
			] }, e.id))] })]
		})
	})] });
}
function yr({ accounts: e, total: t, liquidAccountTotal: n, updateAccount: r, addAccount: i, deleteAccount: a, reorderAccount: o }) {
	let [s, c] = (0, _.useState)(null);
	return /* @__PURE__ */ (0, b.jsxs)(b.Fragment, { children: [/* @__PURE__ */ (0, b.jsx)(K, {
		title: "账户底表",
		meta: `${e.length} 个账户 / 合计 ${H(t)} / 可提取（含专项）${H(n)}`,
		action: /* @__PURE__ */ (0, b.jsx)("button", {
			className: "secondary-button",
			type: "button",
			onClick: i,
			children: "新增账户"
		})
	}), /* @__PURE__ */ (0, b.jsx)("div", {
		className: "table-wrap spreadsheet-wrap",
		children: /* @__PURE__ */ (0, b.jsxs)("table", {
			className: "spreadsheet-table",
			children: [/* @__PURE__ */ (0, b.jsx)("thead", { children: /* @__PURE__ */ (0, b.jsxs)("tr", { children: [
				/* @__PURE__ */ (0, b.jsx)("th", {
					className: "drag-column",
					children: "排序"
				}),
				/* @__PURE__ */ (0, b.jsx)("th", { children: "账户名称" }),
				/* @__PURE__ */ (0, b.jsx)("th", { children: "类型" }),
				/* @__PURE__ */ (0, b.jsx)("th", { children: "余额" }),
				/* @__PURE__ */ (0, b.jsx)("th", { children: "用途" }),
				/* @__PURE__ */ (0, b.jsx)("th", { children: "可提取" }),
				/* @__PURE__ */ (0, b.jsx)("th", { children: "计入个人现金" }),
				/* @__PURE__ */ (0, b.jsx)("th", { children: "操作" })
			] }) }), /* @__PURE__ */ (0, b.jsx)("tbody", { children: e.map((t, n) => /* @__PURE__ */ (0, b.jsxs)("tr", {
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
					/* @__PURE__ */ (0, b.jsx)("td", {
						className: "drag-column",
						children: /* @__PURE__ */ (0, b.jsx)("span", {
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
					/* @__PURE__ */ (0, b.jsx)("td", { children: /* @__PURE__ */ (0, b.jsx)(ur, {
						ariaLabel: `${t.name} 账户名称`,
						value: t.name,
						onChange: (e) => r(t.id, { name: e })
					}) }),
					/* @__PURE__ */ (0, b.jsx)("td", { children: /* @__PURE__ */ (0, b.jsx)(ur, {
						ariaLabel: `${t.name} 类型`,
						value: t.type,
						onChange: (e) => r(t.id, { type: e })
					}) }),
					/* @__PURE__ */ (0, b.jsx)("td", { children: /* @__PURE__ */ (0, b.jsx)(G, {
						ariaLabel: `${t.name} 余额`,
						value: t.balance,
						onChange: (e) => r(t.id, { balance: e })
					}) }),
					/* @__PURE__ */ (0, b.jsx)("td", { children: /* @__PURE__ */ (0, b.jsx)(ur, {
						ariaLabel: `${t.name} 用途`,
						value: t.purpose,
						onChange: (e) => r(t.id, { purpose: e })
					}) }),
					/* @__PURE__ */ (0, b.jsx)("td", { children: /* @__PURE__ */ (0, b.jsx)(pr, {
						ariaLabel: `${t.name} 可提取`,
						checked: t.liquid,
						onChange: (e) => r(t.id, { liquid: e })
					}) }),
					/* @__PURE__ */ (0, b.jsx)("td", { children: /* @__PURE__ */ (0, b.jsx)(pr, {
						ariaLabel: `${t.name} 计入个人现金`,
						checked: t.includedInPersonal !== !1,
						onChange: (e) => r(t.id, { includedInPersonal: e })
					}) }),
					/* @__PURE__ */ (0, b.jsx)("td", { children: /* @__PURE__ */ (0, b.jsx)("button", {
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
function br({ holdings: e, fxUsd: t, fxHkd: n, updateHolding: r, addHolding: i, deleteHolding: a }) {
	let o = e.reduce((e, r) => e + or(r.value, r.currency, t, n), 0);
	return /* @__PURE__ */ (0, b.jsxs)(b.Fragment, { children: [/* @__PURE__ */ (0, b.jsx)(K, {
		title: "投资持仓底表",
		meta: `持仓 ${e.length} 项 / 市值 ${H(o)}`,
		action: /* @__PURE__ */ (0, b.jsx)("button", {
			className: "secondary-button",
			type: "button",
			onClick: i,
			children: "新增持仓"
		})
	}), /* @__PURE__ */ (0, b.jsx)("div", {
		className: "table-wrap spreadsheet-wrap",
		children: /* @__PURE__ */ (0, b.jsxs)("table", {
			className: "spreadsheet-table",
			children: [/* @__PURE__ */ (0, b.jsx)("thead", { children: /* @__PURE__ */ (0, b.jsxs)("tr", { children: [
				/* @__PURE__ */ (0, b.jsx)("th", { children: "名称" }),
				/* @__PURE__ */ (0, b.jsx)("th", { children: "市场" }),
				/* @__PURE__ */ (0, b.jsx)("th", { children: "币种" }),
				/* @__PURE__ */ (0, b.jsx)("th", { children: "成本" }),
				/* @__PURE__ */ (0, b.jsx)("th", { children: "当前市值" }),
				/* @__PURE__ */ (0, b.jsx)("th", { children: "折人民币" }),
				/* @__PURE__ */ (0, b.jsx)("th", { children: "盈亏" }),
				/* @__PURE__ */ (0, b.jsx)("th", { children: "操作" })
			] }) }), /* @__PURE__ */ (0, b.jsx)("tbody", { children: e.map((i) => {
				let o = or(i.value, i.currency, t, n), s = or(i.cost, i.currency, t, n);
				return /* @__PURE__ */ (0, b.jsxs)("tr", { children: [
					/* @__PURE__ */ (0, b.jsx)("td", { children: /* @__PURE__ */ (0, b.jsx)(ur, {
						ariaLabel: `${i.name} 名称`,
						value: i.name,
						onChange: (e) => r(i.id, { name: e })
					}) }),
					/* @__PURE__ */ (0, b.jsx)("td", { children: /* @__PURE__ */ (0, b.jsx)(fr, {
						ariaLabel: `${i.name} 市场`,
						options: [
							"A股",
							"美股",
							"港股"
						],
						value: i.market,
						onChange: (e) => r(i.id, { market: e })
					}) }),
					/* @__PURE__ */ (0, b.jsx)("td", { children: /* @__PURE__ */ (0, b.jsx)(fr, {
						ariaLabel: `${i.name} 币种`,
						options: [
							"CNY",
							"USD",
							"HKD"
						],
						value: i.currency,
						onChange: (e) => r(i.id, { currency: e })
					}) }),
					/* @__PURE__ */ (0, b.jsx)("td", { children: /* @__PURE__ */ (0, b.jsx)(G, {
						ariaLabel: `${i.name} 成本`,
						value: i.cost,
						onChange: (e) => r(i.id, { cost: e })
					}) }),
					/* @__PURE__ */ (0, b.jsx)("td", { children: /* @__PURE__ */ (0, b.jsx)(G, {
						ariaLabel: `${i.name} 当前市值`,
						value: i.value,
						onChange: (e) => r(i.id, { value: e })
					}) }),
					/* @__PURE__ */ (0, b.jsx)("td", {
						className: "calculated-cell",
						children: H(o)
					}),
					/* @__PURE__ */ (0, b.jsx)("td", {
						className: o >= s ? "positive" : "negative",
						children: H(o - s)
					}),
					/* @__PURE__ */ (0, b.jsx)("td", { children: /* @__PURE__ */ (0, b.jsx)("button", {
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
function xr({ balanceAssets: e, totalAssets: t, updateBalanceAsset: n, addBalanceAsset: r, deleteBalanceAsset: i }) {
	let a = e.reduce((e, t) => e + t.amount, 0);
	return /* @__PURE__ */ (0, b.jsxs)(b.Fragment, { children: [/* @__PURE__ */ (0, b.jsx)(K, {
		title: "资产底表",
		meta: `${e.length} 项 / 补录资产 ${H(a)} / 总资产 ${H(t)}`,
		action: /* @__PURE__ */ (0, b.jsx)("button", {
			className: "secondary-button",
			type: "button",
			onClick: r,
			children: "新增资产"
		})
	}), /* @__PURE__ */ (0, b.jsx)("div", {
		className: "table-wrap spreadsheet-wrap",
		children: /* @__PURE__ */ (0, b.jsxs)("table", {
			className: "spreadsheet-table",
			children: [/* @__PURE__ */ (0, b.jsx)("thead", { children: /* @__PURE__ */ (0, b.jsxs)("tr", { children: [
				/* @__PURE__ */ (0, b.jsx)("th", { children: "资产项" }),
				/* @__PURE__ */ (0, b.jsx)("th", { children: "金额" }),
				/* @__PURE__ */ (0, b.jsx)("th", { children: "说明" }),
				/* @__PURE__ */ (0, b.jsx)("th", { children: "占总资产" }),
				/* @__PURE__ */ (0, b.jsx)("th", { children: "操作" })
			] }) }), /* @__PURE__ */ (0, b.jsx)("tbody", { children: e.map((r) => /* @__PURE__ */ (0, b.jsxs)("tr", { children: [
				/* @__PURE__ */ (0, b.jsx)("td", { children: /* @__PURE__ */ (0, b.jsx)(ur, {
					ariaLabel: `${r.name} 资产项`,
					value: r.name,
					onChange: (e) => n(r.id, { name: e })
				}) }),
				/* @__PURE__ */ (0, b.jsx)("td", { children: /* @__PURE__ */ (0, b.jsx)(G, {
					ariaLabel: `${r.name} 资产金额`,
					value: r.amount,
					onChange: (e) => n(r.id, { amount: e })
				}) }),
				/* @__PURE__ */ (0, b.jsx)("td", { children: /* @__PURE__ */ (0, b.jsx)(ur, {
					ariaLabel: `${r.name} 资产说明`,
					value: r.note,
					onChange: (e) => n(r.id, { note: e })
				}) }),
				/* @__PURE__ */ (0, b.jsx)("td", {
					className: "calculated-cell",
					children: xn(t ? r.amount / t : 0)
				}),
				/* @__PURE__ */ (0, b.jsx)("td", { children: /* @__PURE__ */ (0, b.jsx)("button", {
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
function Sr({ liabilities: e, updateLiability: t, addLiability: n, deleteLiability: r }) {
	let i = e.reduce((e, t) => e + t.amount, 0);
	return /* @__PURE__ */ (0, b.jsxs)(b.Fragment, { children: [/* @__PURE__ */ (0, b.jsx)(K, {
		title: "负债底表",
		meta: `${e.length} 项 / 总负债 ${H(i)}`,
		action: /* @__PURE__ */ (0, b.jsx)("button", {
			className: "secondary-button",
			type: "button",
			onClick: n,
			children: "新增负债"
		})
	}), /* @__PURE__ */ (0, b.jsx)("div", {
		className: "table-wrap spreadsheet-wrap",
		children: /* @__PURE__ */ (0, b.jsxs)("table", {
			className: "spreadsheet-table",
			children: [/* @__PURE__ */ (0, b.jsx)("thead", { children: /* @__PURE__ */ (0, b.jsxs)("tr", { children: [
				/* @__PURE__ */ (0, b.jsx)("th", { children: "负债项" }),
				/* @__PURE__ */ (0, b.jsx)("th", { children: "金额" }),
				/* @__PURE__ */ (0, b.jsx)("th", { children: "占比" }),
				/* @__PURE__ */ (0, b.jsx)("th", { children: "操作" })
			] }) }), /* @__PURE__ */ (0, b.jsx)("tbody", { children: e.map((n) => /* @__PURE__ */ (0, b.jsxs)("tr", { children: [
				/* @__PURE__ */ (0, b.jsx)("td", { children: /* @__PURE__ */ (0, b.jsx)(ur, {
					ariaLabel: `${n.name} 负债项`,
					value: n.name,
					onChange: (e) => t(n.id, { name: e })
				}) }),
				/* @__PURE__ */ (0, b.jsx)("td", { children: /* @__PURE__ */ (0, b.jsx)(G, {
					ariaLabel: `${n.name} 金额`,
					value: n.amount,
					onChange: (e) => t(n.id, { amount: e })
				}) }),
				/* @__PURE__ */ (0, b.jsx)("td", {
					className: "calculated-cell",
					children: xn(i ? n.amount / i : 0)
				}),
				/* @__PURE__ */ (0, b.jsx)("td", { children: /* @__PURE__ */ (0, b.jsx)("button", {
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
function Cr({ saveAction: e, accountCount: t, emergencyFund: n, setEmergencyFund: r, emergencyMonths: i, setEmergencyMonths: a, emergencyMonthlyNeed: o, setEmergencyMonthlyNeed: s }) {
	let c = o * i;
	return /* @__PURE__ */ (0, b.jsxs)(b.Fragment, { children: [/* @__PURE__ */ (0, b.jsx)(K, {
		title: "应急金底表",
		meta: `目标 ${H(c)} / 当前 ${H(n)} / ${t ? `${t} 个应急账户实时余额` : "手动参考余额，未关联账户"}`,
		action: e
	}), /* @__PURE__ */ (0, b.jsx)("div", {
		className: "table-wrap spreadsheet-wrap",
		children: /* @__PURE__ */ (0, b.jsxs)("table", {
			className: "spreadsheet-table",
			children: [/* @__PURE__ */ (0, b.jsx)("thead", { children: /* @__PURE__ */ (0, b.jsxs)("tr", { children: [
				/* @__PURE__ */ (0, b.jsx)("th", { children: "项目" }),
				/* @__PURE__ */ (0, b.jsx)("th", { children: "数值" }),
				/* @__PURE__ */ (0, b.jsx)("th", { children: "结果" })
			] }) }), /* @__PURE__ */ (0, b.jsxs)("tbody", { children: [
				/* @__PURE__ */ (0, b.jsxs)("tr", { children: [
					/* @__PURE__ */ (0, b.jsx)("td", { children: "当前应急金" }),
					/* @__PURE__ */ (0, b.jsx)("td", { children: t > 1 ? /* @__PURE__ */ (0, b.jsxs)("span", {
						className: "calculated-cell",
						children: [H(n), "（账户管理汇总）"]
					}) : /* @__PURE__ */ (0, b.jsx)(G, {
						ariaLabel: "当前应急金",
						value: n,
						onChange: r
					}) }),
					/* @__PURE__ */ (0, b.jsxs)("td", {
						className: "calculated-cell",
						children: [
							"覆盖 ",
							o ? (n / o).toFixed(1) : "0.0",
							" 月"
						]
					})
				] }),
				/* @__PURE__ */ (0, b.jsxs)("tr", { children: [
					/* @__PURE__ */ (0, b.jsx)("td", { children: "目标覆盖月数" }),
					/* @__PURE__ */ (0, b.jsx)("td", { children: /* @__PURE__ */ (0, b.jsx)(G, {
						ariaLabel: "目标覆盖月数",
						step: 1,
						value: i,
						onChange: a
					}) }),
					/* @__PURE__ */ (0, b.jsxs)("td", {
						className: "calculated-cell",
						children: [i, " 个月"]
					})
				] }),
				/* @__PURE__ */ (0, b.jsxs)("tr", { children: [
					/* @__PURE__ */ (0, b.jsx)("td", { children: "月均必要支出" }),
					/* @__PURE__ */ (0, b.jsx)("td", { children: /* @__PURE__ */ (0, b.jsx)(G, {
						ariaLabel: "月均必要支出",
						value: o,
						onChange: s
					}) }),
					/* @__PURE__ */ (0, b.jsxs)("td", {
						className: "calculated-cell",
						children: ["缺口 ", H(Math.max(0, c - n))]
					})
				] })
			] })]
		})
	})] });
}
function wr({ baseDate: e, reminders: t, updateReminder: n, addReminder: r, deleteReminder: i }) {
	let a = t.reduce((e, t) => e + t.amount, 0);
	return /* @__PURE__ */ (0, b.jsxs)(b.Fragment, { children: [/* @__PURE__ */ (0, b.jsx)(K, {
		title: "提醒底表",
		meta: `${t.length} 条 / 金额 ${P(a)} / 北京时间 ${e}`,
		action: /* @__PURE__ */ (0, b.jsx)("button", {
			className: "secondary-button",
			type: "button",
			onClick: r,
			children: "新增提醒"
		})
	}), /* @__PURE__ */ (0, b.jsx)("div", {
		className: "table-wrap spreadsheet-wrap",
		children: /* @__PURE__ */ (0, b.jsxs)("table", {
			className: "spreadsheet-table",
			children: [/* @__PURE__ */ (0, b.jsx)("thead", { children: /* @__PURE__ */ (0, b.jsxs)("tr", { children: [
				/* @__PURE__ */ (0, b.jsx)("th", { children: "事项" }),
				/* @__PURE__ */ (0, b.jsx)("th", { children: "日期" }),
				/* @__PURE__ */ (0, b.jsx)("th", { children: "金额" }),
				/* @__PURE__ */ (0, b.jsx)("th", { children: "类型" }),
				/* @__PURE__ */ (0, b.jsx)("th", { children: "距离" }),
				/* @__PURE__ */ (0, b.jsx)("th", { children: "操作" })
			] }) }), /* @__PURE__ */ (0, b.jsx)("tbody", { children: t.map((r) => /* @__PURE__ */ (0, b.jsxs)("tr", { children: [
				/* @__PURE__ */ (0, b.jsx)("td", { children: /* @__PURE__ */ (0, b.jsx)(ur, {
					ariaLabel: `${r.name} 事项`,
					value: r.name,
					onChange: (e) => n(r.id, { name: e })
				}) }),
				/* @__PURE__ */ (0, b.jsx)("td", { children: /* @__PURE__ */ (0, b.jsx)(dr, {
					ariaLabel: `${r.name} 日期`,
					value: r.date,
					onChange: (e) => n(r.id, { date: e })
				}) }),
				/* @__PURE__ */ (0, b.jsx)("td", { children: /* @__PURE__ */ (0, b.jsx)(G, {
					ariaLabel: `${r.name} 金额`,
					value: r.amount,
					onChange: (e) => n(r.id, { amount: e })
				}) }),
				/* @__PURE__ */ (0, b.jsx)("td", { children: /* @__PURE__ */ (0, b.jsx)(ur, {
					ariaLabel: `${r.name} 类型`,
					value: r.kind,
					onChange: (e) => n(r.id, { kind: e })
				}) }),
				/* @__PURE__ */ (0, b.jsx)("td", {
					className: "calculated-cell",
					children: Te(r.date, e)
				}),
				/* @__PURE__ */ (0, b.jsx)("td", { children: /* @__PURE__ */ (0, b.jsx)("button", {
					className: "danger-button compact",
					disabled: t.length <= 1,
					type: "button",
					onClick: () => i(r.id),
					children: "删除"
				}) })
			] }, r.id)) })]
		})
	})] });
}
function Tr({ goals: e, accounts: t, updateGoal: n, addGoal: r, deleteGoal: i }) {
	let a = e.reduce((e, t) => e + t.target, 0), o = e.reduce((e, t) => e + t.current, 0), s = e.reduce((e, t) => e + t.actualMonthly, 0);
	return /* @__PURE__ */ (0, b.jsxs)(b.Fragment, { children: [/* @__PURE__ */ (0, b.jsx)(K, {
		title: "目标底表",
		meta: `当前 ${H(o)} / 目标 ${H(a)} / 本月实际投入 ${H(s)}`,
		action: /* @__PURE__ */ (0, b.jsx)("button", {
			className: "secondary-button",
			type: "button",
			onClick: r,
			children: "新增目标"
		})
	}), /* @__PURE__ */ (0, b.jsx)("div", {
		className: "table-wrap spreadsheet-wrap",
		children: /* @__PURE__ */ (0, b.jsxs)("table", {
			className: "spreadsheet-table",
			children: [/* @__PURE__ */ (0, b.jsx)("thead", { children: /* @__PURE__ */ (0, b.jsxs)("tr", { children: [
				/* @__PURE__ */ (0, b.jsx)("th", { children: "目标" }),
				/* @__PURE__ */ (0, b.jsx)("th", { children: "目标金额" }),
				/* @__PURE__ */ (0, b.jsx)("th", { children: "当前金额" }),
				/* @__PURE__ */ (0, b.jsx)("th", { children: "每月预期准备" }),
				/* @__PURE__ */ (0, b.jsx)("th", { children: "本月实际投入" }),
				/* @__PURE__ */ (0, b.jsx)("th", { children: "进度" }),
				/* @__PURE__ */ (0, b.jsx)("th", { children: "操作" })
			] }) }), /* @__PURE__ */ (0, b.jsx)("tbody", { children: e.map((r) => /* @__PURE__ */ (0, b.jsxs)("tr", { children: [
				/* @__PURE__ */ (0, b.jsx)("td", { children: /* @__PURE__ */ (0, b.jsx)(ur, {
					ariaLabel: `${r.name} 名称`,
					value: r.name,
					onChange: (e) => n(r.id, { name: e })
				}) }),
				/* @__PURE__ */ (0, b.jsx)("td", { children: /* @__PURE__ */ (0, b.jsx)(G, {
					ariaLabel: `${r.name} 目标金额`,
					value: r.target,
					onChange: (e) => n(r.id, { target: e })
				}) }),
				/* @__PURE__ */ (0, b.jsx)("td", { children: pt(r, e, t).mode === "accounts" ? /* @__PURE__ */ (0, b.jsxs)("span", {
					className: "calculated-cell",
					children: [H(r.current), /* @__PURE__ */ (0, b.jsx)("small", { children: pt(r, e, t).label })]
				}) : /* @__PURE__ */ (0, b.jsx)(G, {
					ariaLabel: `${r.name} 当前金额`,
					value: r.current,
					onChange: (e) => n(r.id, { current: e })
				}) }),
				/* @__PURE__ */ (0, b.jsx)("td", { children: /* @__PURE__ */ (0, b.jsx)(G, {
					ariaLabel: `${r.name} 每月预期准备`,
					value: r.monthly,
					onChange: (e) => n(r.id, { monthly: e })
				}) }),
				/* @__PURE__ */ (0, b.jsx)("td", { children: /* @__PURE__ */ (0, b.jsx)(G, {
					ariaLabel: `${r.name} 本月实际投入`,
					value: r.actualMonthly,
					onChange: (e) => n(r.id, { actualMonthly: e })
				}) }),
				/* @__PURE__ */ (0, b.jsx)("td", {
					className: "calculated-cell",
					children: xn(r.target ? r.current / r.target : 0)
				}),
				/* @__PURE__ */ (0, b.jsx)("td", { children: /* @__PURE__ */ (0, b.jsx)("button", {
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
function Er({ accounts: e, buckets: t, updateFundBucket: n, addFundBucket: r, deleteFundBucket: i, investmentReserve: a, liquidAfterBuckets: o, monthlyNeed: s }) {
	let c = t.reduce((e, t) => e + t.target, 0), l = t.reduce((e, t) => e + t.current, 0);
	return /* @__PURE__ */ (0, b.jsxs)(b.Fragment, { children: [
		/* @__PURE__ */ (0, b.jsx)(K, {
			title: "大花费项目底表",
			meta: `目标 ${H(c)} / 实际 ${H(l)} / 每月还需 ${H(s)} / 项目后现金 ${H(o)}`,
			action: /* @__PURE__ */ (0, b.jsx)("button", {
				className: "secondary-button",
				type: "button",
				onClick: r,
				children: "新增大花费项目"
			})
		}),
		/* @__PURE__ */ (0, b.jsxs)("div", {
			className: "auto-bucket-row",
			children: [/* @__PURE__ */ (0, b.jsxs)("strong", { children: ["自动锁定：投资待投金 ", H(a)] }), /* @__PURE__ */ (0, b.jsx)("span", { children: "应急、旅游、学习、家庭专户也计占用；关联同一账户的项目不重复扣款。未关联项目按额外占用计。" })]
		}),
		/* @__PURE__ */ (0, b.jsx)("div", {
			className: "table-wrap spreadsheet-wrap",
			children: /* @__PURE__ */ (0, b.jsxs)("table", {
				className: "spreadsheet-table fund-bucket-table",
				children: [/* @__PURE__ */ (0, b.jsx)("thead", { children: /* @__PURE__ */ (0, b.jsxs)("tr", { children: [
					/* @__PURE__ */ (0, b.jsx)("th", { children: "大花费项目" }),
					/* @__PURE__ */ (0, b.jsx)("th", { children: "类型" }),
					/* @__PURE__ */ (0, b.jsx)("th", { children: "截止日期" }),
					/* @__PURE__ */ (0, b.jsx)("th", { children: "目标" }),
					/* @__PURE__ */ (0, b.jsx)("th", { children: "实际" }),
					/* @__PURE__ */ (0, b.jsx)("th", { children: "资金所在账户" }),
					/* @__PURE__ */ (0, b.jsx)("th", { children: "缺口" }),
					/* @__PURE__ */ (0, b.jsx)("th", { children: "每月需补" }),
					/* @__PURE__ */ (0, b.jsx)("th", { children: "锁定" }),
					/* @__PURE__ */ (0, b.jsx)("th", { children: "备注" }),
					/* @__PURE__ */ (0, b.jsx)("th", { children: "操作" })
				] }) }), /* @__PURE__ */ (0, b.jsx)("tbody", { children: t.map((r) => /* @__PURE__ */ (0, b.jsxs)("tr", { children: [
					/* @__PURE__ */ (0, b.jsx)("td", { children: /* @__PURE__ */ (0, b.jsx)(ur, {
						ariaLabel: `${r.name} 名称`,
						value: r.name,
						onChange: (e) => n(r.id, { name: e })
					}) }),
					/* @__PURE__ */ (0, b.jsx)("td", { children: /* @__PURE__ */ (0, b.jsx)(fr, {
						ariaLabel: `${r.name} 类型`,
						options: an,
						value: r.kind,
						onChange: (e) => n(r.id, { kind: e })
					}) }),
					/* @__PURE__ */ (0, b.jsx)("td", { children: /* @__PURE__ */ (0, b.jsx)(dr, {
						ariaLabel: `${r.name} 截止日期`,
						value: r.dueDate,
						onChange: (e) => n(r.id, { dueDate: e })
					}) }),
					/* @__PURE__ */ (0, b.jsx)("td", { children: /* @__PURE__ */ (0, b.jsx)(G, {
						ariaLabel: `${r.name} 目标`,
						value: r.target,
						onChange: (e) => n(r.id, { target: e })
					}) }),
					/* @__PURE__ */ (0, b.jsx)("td", { children: /* @__PURE__ */ (0, b.jsx)(G, {
						ariaLabel: `${r.name} 实际`,
						value: r.current,
						onChange: (e) => n(r.id, { current: e })
					}) }),
					/* @__PURE__ */ (0, b.jsx)("td", { children: /* @__PURE__ */ (0, b.jsxs)("select", {
						"aria-label": `${r.name} 资金所在账户`,
						value: r.fundingAccountId ?? "",
						onChange: (e) => n(r.id, { fundingAccountId: e.target.value }),
						children: [
							/* @__PURE__ */ (0, b.jsx)("option", {
								value: "",
								children: "未关联（另占通用现金）"
							}),
							r.fundingAccountId && !e.some((e) => e.id === r.fundingAccountId) && /* @__PURE__ */ (0, b.jsx)("option", {
								value: r.fundingAccountId,
								children: "原账户已删除，待核对"
							}),
							e.map((e) => /* @__PURE__ */ (0, b.jsxs)("option", {
								value: e.id,
								children: [
									e.name,
									Mn(e) ? "（专项）" : "",
									e.liquid ? "" : "（不可提取）"
								]
							}, e.id))
						]
					}) }),
					/* @__PURE__ */ (0, b.jsxs)("td", { children: [/* @__PURE__ */ (0, b.jsx)("span", {
						className: r.gap > 0 ? "negative" : "positive",
						children: H(r.gap)
					}), /* @__PURE__ */ (0, b.jsx)("span", {
						className: "table-subtext",
						children: r.status
					})] }),
					/* @__PURE__ */ (0, b.jsx)("td", {
						className: "calculated-cell",
						children: H(r.monthlyNeed)
					}),
					/* @__PURE__ */ (0, b.jsx)("td", { children: /* @__PURE__ */ (0, b.jsx)(pr, {
						ariaLabel: `${r.name} 锁定`,
						checked: r.locked,
						onChange: (e) => n(r.id, { locked: e })
					}) }),
					/* @__PURE__ */ (0, b.jsx)("td", { children: /* @__PURE__ */ (0, b.jsx)(ur, {
						ariaLabel: `${r.name} 备注`,
						value: r.note,
						onChange: (e) => n(r.id, { note: e })
					}) }),
					/* @__PURE__ */ (0, b.jsx)("td", { children: /* @__PURE__ */ (0, b.jsx)("button", {
						className: "danger-button compact",
						disabled: t.length <= 1,
						type: "button",
						onClick: () => i(r.id),
						children: "删除"
					}) })
				] }, r.id)) })]
			})
		})
	] });
}
function Dr({ liquidity: e }) {
	return /* @__PURE__ */ (0, b.jsxs)("section", {
		className: "liquidity-summary",
		"aria-label": "可动用现金核对",
		children: [
			/* @__PURE__ */ (0, b.jsxs)("div", {
				className: "stat-strip",
				children: [
					/* @__PURE__ */ (0, b.jsx)(U, {
						label: "可提取账户余额",
						value: H(e.liquidCash)
					}),
					/* @__PURE__ */ (0, b.jsx)(U, {
						label: "专项账户占用",
						value: H(e.accountReserved)
					}),
					/* @__PURE__ */ (0, b.jsx)(U, {
						label: "项目追加锁定",
						value: H(e.projectReserved)
					}),
					/* @__PURE__ */ (0, b.jsx)(U, {
						label: "可自由动用",
						value: H(e.available)
					})
				]
			}),
			/* @__PURE__ */ (0, b.jsxs)("details", {
				className: "liquidity-details",
				children: [/* @__PURE__ */ (0, b.jsx)("summary", { children: "资金占用明细" }), /* @__PURE__ */ (0, b.jsx)("div", {
					className: "table-wrap",
					children: /* @__PURE__ */ (0, b.jsxs)("table", {
						className: "spreadsheet-table",
						children: [/* @__PURE__ */ (0, b.jsx)("thead", { children: /* @__PURE__ */ (0, b.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, b.jsx)("th", { children: "账户或项目" }),
							/* @__PURE__ */ (0, b.jsx)("th", { children: "占用" }),
							/* @__PURE__ */ (0, b.jsx)("th", { children: "口径" })
						] }) }), /* @__PURE__ */ (0, b.jsxs)("tbody", { children: [e.deductions.map((e) => /* @__PURE__ */ (0, b.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, b.jsx)("td", { children: e.name }),
							/* @__PURE__ */ (0, b.jsx)("td", { children: H(e.amount) }),
							/* @__PURE__ */ (0, b.jsx)("td", { children: e.source })
						] }, e.id)), !e.deductions.length && /* @__PURE__ */ (0, b.jsx)("tr", { children: /* @__PURE__ */ (0, b.jsx)("td", {
							colSpan: 3,
							children: "暂无已识别专项占用"
						}) })] })]
					})
				})]
			}),
			e.unlinkedCount > 0 && /* @__PURE__ */ (0, b.jsxs)("p", {
				className: "table-subtext",
				children: [e.unlinkedCount, " 个项目的实际金额尚未关联账户，暂按额外占用扣减；若钱已在专项账户中，当前可动用金额可能偏低。"]
			}),
			e.overallocated > 0 && /* @__PURE__ */ (0, b.jsxs)("p", {
				className: "negative",
				role: "alert",
				children: [
					"关联项目超过账户余额 ",
					H(e.overallocated),
					"，请核对实际金额。"
				]
			}),
			e.available < 0 && /* @__PURE__ */ (0, b.jsxs)("p", {
				className: "negative",
				role: "alert",
				children: [
					"资金占用超出可提取余额 ",
					H(-e.available),
					"。"
				]
			})
		]
	});
}
function Or({ sections: e, reportText: t, copyStatus: n, onCopy: r }) {
	return /* @__PURE__ */ (0, b.jsxs)("section", {
		className: "monthly-report-panel",
		children: [
			/* @__PURE__ */ (0, b.jsxs)("div", {
				className: "monthly-report-head",
				children: [/* @__PURE__ */ (0, b.jsxs)("div", { children: [/* @__PURE__ */ (0, b.jsx)("strong", { children: "本月财务分析报告" }), /* @__PURE__ */ (0, b.jsx)("span", { children: n })] }), /* @__PURE__ */ (0, b.jsx)("button", {
					className: "secondary-button",
					type: "button",
					onClick: r,
					children: "复制报告"
				})]
			}),
			/* @__PURE__ */ (0, b.jsx)("div", {
				className: "report-section-grid",
				children: e.map((e) => /* @__PURE__ */ (0, b.jsxs)("article", {
					className: `report-section ${e.tone}`,
					children: [
						/* @__PURE__ */ (0, b.jsx)("span", { children: e.title }),
						/* @__PURE__ */ (0, b.jsx)("strong", { children: e.summary }),
						/* @__PURE__ */ (0, b.jsx)("p", { children: e.detail }),
						/* @__PURE__ */ (0, b.jsx)("em", { children: e.action })
					]
				}, e.title))
			}),
			/* @__PURE__ */ (0, b.jsx)("pre", {
				className: "monthly-report-text",
				children: t
			})
		]
	});
}
function kr({ rows: e, income: t, spending: n, allocation: r, surplus: i }) {
	return /* @__PURE__ */ (0, b.jsxs)(b.Fragment, { children: [/* @__PURE__ */ (0, b.jsx)(K, {
		title: "报表自动同步表",
		meta: `收入 ${H(t)} / 含预留支出 ${H(n)}（其中基金预留 ${H(r)}）/ 可用结余 ${H(i)}`
	}), /* @__PURE__ */ (0, b.jsx)("div", {
		className: "table-wrap spreadsheet-wrap",
		children: /* @__PURE__ */ (0, b.jsxs)("table", {
			className: "spreadsheet-table",
			children: [/* @__PURE__ */ (0, b.jsx)("thead", { children: /* @__PURE__ */ (0, b.jsxs)("tr", { children: [
				/* @__PURE__ */ (0, b.jsx)("th", { children: "项目" }),
				/* @__PURE__ */ (0, b.jsx)("th", { children: "数值" }),
				/* @__PURE__ */ (0, b.jsx)("th", { children: "占收入" }),
				/* @__PURE__ */ (0, b.jsx)("th", { children: "流向" }),
				/* @__PURE__ */ (0, b.jsx)("th", { children: "来源" })
			] }) }), /* @__PURE__ */ (0, b.jsx)("tbody", { children: e.map((e) => {
				let n = t ? e.amount / t : 0, r = `calculated-cell ${e.amount < 0 ? "negative" : ""}`.trim();
				return /* @__PURE__ */ (0, b.jsxs)("tr", { children: [
					/* @__PURE__ */ (0, b.jsx)("td", { children: e.name }),
					/* @__PURE__ */ (0, b.jsx)("td", { children: /* @__PURE__ */ (0, b.jsx)("span", {
						className: r,
						children: H(e.amount)
					}) }),
					/* @__PURE__ */ (0, b.jsx)("td", { children: /* @__PURE__ */ (0, b.jsx)("span", {
						className: r,
						children: Sn(n)
					}) }),
					/* @__PURE__ */ (0, b.jsx)("td", { children: e.flow }),
					/* @__PURE__ */ (0, b.jsx)("td", { children: e.source })
				] }, e.id);
			}) })]
		})
	})] });
}
function Ar({ emergencyMonths: e, setEmergencyMonths: t, emergencyMonthlyNeed: n, setEmergencyMonthlyNeed: r, liabilities: i, updateLiability: a, addLiability: o, deleteLiability: s }) {
	return /* @__PURE__ */ (0, b.jsxs)(b.Fragment, { children: [/* @__PURE__ */ (0, b.jsx)(K, {
		title: "健康评分输入底表",
		meta: `目标覆盖 ${e} 月 / 负债 ${H(i.reduce((e, t) => e + t.amount, 0))}`,
		action: /* @__PURE__ */ (0, b.jsx)("button", {
			className: "secondary-button",
			type: "button",
			onClick: o,
			children: "新增负债"
		})
	}), /* @__PURE__ */ (0, b.jsx)("div", {
		className: "table-wrap spreadsheet-wrap",
		children: /* @__PURE__ */ (0, b.jsxs)("table", {
			className: "spreadsheet-table",
			children: [/* @__PURE__ */ (0, b.jsx)("thead", { children: /* @__PURE__ */ (0, b.jsxs)("tr", { children: [
				/* @__PURE__ */ (0, b.jsx)("th", { children: "项目" }),
				/* @__PURE__ */ (0, b.jsx)("th", { children: "数值" }),
				/* @__PURE__ */ (0, b.jsx)("th", { children: "影响" }),
				/* @__PURE__ */ (0, b.jsx)("th", { children: "操作" })
			] }) }), /* @__PURE__ */ (0, b.jsxs)("tbody", { children: [
				/* @__PURE__ */ (0, b.jsxs)("tr", { children: [
					/* @__PURE__ */ (0, b.jsx)("td", { children: "目标覆盖月数" }),
					/* @__PURE__ */ (0, b.jsx)("td", { children: /* @__PURE__ */ (0, b.jsx)(G, {
						ariaLabel: "健康目标覆盖月数",
						step: 1,
						value: e,
						onChange: t
					}) }),
					/* @__PURE__ */ (0, b.jsx)("td", { children: "抗风险能力" }),
					/* @__PURE__ */ (0, b.jsx)("td", {
						className: "calculated-cell",
						children: "固定项"
					})
				] }),
				/* @__PURE__ */ (0, b.jsxs)("tr", { children: [
					/* @__PURE__ */ (0, b.jsx)("td", { children: "月均必要支出" }),
					/* @__PURE__ */ (0, b.jsx)("td", { children: /* @__PURE__ */ (0, b.jsx)(G, {
						ariaLabel: "健康月均必要支出",
						value: n,
						onChange: r
					}) }),
					/* @__PURE__ */ (0, b.jsx)("td", { children: "应急覆盖" }),
					/* @__PURE__ */ (0, b.jsx)("td", {
						className: "calculated-cell",
						children: "固定项"
					})
				] }),
				i.map((e) => /* @__PURE__ */ (0, b.jsxs)("tr", { children: [
					/* @__PURE__ */ (0, b.jsx)("td", { children: /* @__PURE__ */ (0, b.jsx)(ur, {
						ariaLabel: `健康 ${e.name} 负债项`,
						value: e.name,
						onChange: (t) => a(e.id, { name: t })
					}) }),
					/* @__PURE__ */ (0, b.jsx)("td", { children: /* @__PURE__ */ (0, b.jsx)(G, {
						ariaLabel: `健康 ${e.name} 金额`,
						value: e.amount,
						onChange: (t) => a(e.id, { amount: t })
					}) }),
					/* @__PURE__ */ (0, b.jsx)("td", { children: "负债率" }),
					/* @__PURE__ */ (0, b.jsx)("td", { children: /* @__PURE__ */ (0, b.jsx)("button", {
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
function jr({ capabilities: e, updateCapability: t }) {
	return /* @__PURE__ */ (0, b.jsxs)(b.Fragment, { children: [/* @__PURE__ */ (0, b.jsx)(K, {
		title: "数据能力底表",
		meta: `平均成熟度 ${(e.reduce((e, t) => e + t.score, 0) / Math.max(e.length, 1)).toFixed(0)} 分`
	}), /* @__PURE__ */ (0, b.jsx)("div", {
		className: "table-wrap spreadsheet-wrap",
		children: /* @__PURE__ */ (0, b.jsxs)("table", {
			className: "spreadsheet-table",
			children: [/* @__PURE__ */ (0, b.jsx)("thead", { children: /* @__PURE__ */ (0, b.jsxs)("tr", { children: [
				/* @__PURE__ */ (0, b.jsx)("th", { children: "能力" }),
				/* @__PURE__ */ (0, b.jsx)("th", { children: "成熟度" }),
				/* @__PURE__ */ (0, b.jsx)("th", { children: "状态" })
			] }) }), /* @__PURE__ */ (0, b.jsx)("tbody", { children: e.map((e) => /* @__PURE__ */ (0, b.jsxs)("tr", { children: [
				/* @__PURE__ */ (0, b.jsx)("td", { children: /* @__PURE__ */ (0, b.jsx)(ur, {
					ariaLabel: `${e.name} 名称`,
					value: e.name,
					onChange: (n) => t(e.id, { name: n })
				}) }),
				/* @__PURE__ */ (0, b.jsx)("td", { children: /* @__PURE__ */ (0, b.jsx)(G, {
					ariaLabel: `${e.name} 成熟度`,
					max: 100,
					step: 1,
					value: e.score,
					onChange: (n) => t(e.id, { score: yn(n) })
				}) }),
				/* @__PURE__ */ (0, b.jsx)("td", { children: /* @__PURE__ */ (0, b.jsx)("span", {
					className: e.score >= 70 ? "pill good" : e.score >= 40 ? "pill warn" : "pill",
					children: e.score >= 70 ? "可用" : e.score >= 40 ? "建设中" : "待补齐"
				}) })
			] }, e.id)) })]
		})
	})] });
}
function Mr({ data: e, centerLabel: t, centerValue: n }) {
	let r = e.filter((e) => e.value > 0), i = r.reduce((e, t) => e + t.value, 0), a = r.map((e) => i ? e.value / i * 100 : 0), o = a.map((e, t) => a.slice(0, t).reduce((e, t) => e + t, 0)), s = r.map((e, t) => {
		let n = a[t] ?? 0, r = o[t] ?? 0, i = ((r + n / 2) / 100 * 360 - 90) * (Math.PI / 180), s = Math.cos(i), c = Math.sin(i), l = s >= 0 ? "right" : "left";
		return {
			...e,
			color: e.color ?? V[t % V.length],
			share: n,
			start: r,
			anchorX: 110 + s * 36.5,
			anchorY: 66 + c * 36.5,
			elbowX: 110 + s * 45,
			elbowY: 66 + c * 45,
			labelX: l === "right" ? 174 : 46,
			lineEndX: l === "right" ? 164 : 56,
			side: l,
			y: yn(66 + c * 53, 18, 114)
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
		detail: e.detail?.includes("%") ? e.detail : `${xn(e.value / Math.max(i, 1))} / ${H(e.value)}${e.detail ? ` / ${e.detail}` : ""}`
	})) : [{
		label: "暂无数据",
		value: 1,
		color: "#b8c4d4",
		detail: "0%"
	}];
	return /* @__PURE__ */ (0, b.jsxs)("div", {
		className: "donut-layout",
		children: [/* @__PURE__ */ (0, b.jsxs)("svg", {
			className: "donut-chart",
			viewBox: "0 0 220 132",
			role: "img",
			"aria-label": `${t} ${n}`,
			children: [
				/* @__PURE__ */ (0, b.jsx)("circle", {
					cx: 110,
					cy: 66,
					r: 31,
					fill: "none",
					stroke: "#e5edf5",
					strokeWidth: 11
				}),
				i > 0 && s.map((e) => /* @__PURE__ */ (0, b.jsx)("circle", {
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
				l.map((e) => /* @__PURE__ */ (0, b.jsxs)("g", {
					className: "donut-annotation",
					children: [
						/* @__PURE__ */ (0, b.jsx)("polyline", { points: `${e.anchorX},${e.anchorY} ${e.elbowX},${e.elbowY} ${e.lineEndX},${e.y}` }),
						/* @__PURE__ */ (0, b.jsx)("title", { children: `${e.label} ${xn(e.value / Math.max(i, 1))}` }),
						/* @__PURE__ */ (0, b.jsxs)("text", {
							textAnchor: e.side === "right" ? "start" : "end",
							x: e.labelX,
							y: e.y + 2,
							children: [/* @__PURE__ */ (0, b.jsx)("tspan", {
								className: "donut-annotation-label",
								x: e.labelX,
								y: e.y - 2,
								children: e.label
							}), /* @__PURE__ */ (0, b.jsx)("tspan", {
								className: "donut-annotation-percent",
								x: e.labelX,
								y: e.y + 7,
								children: `${Math.round(e.share)}%`
							})]
						})
					]
				}, `${e.label}-${e.share}`)),
				/* @__PURE__ */ (0, b.jsx)("text", {
					className: "donut-value",
					x: 110,
					y: 62,
					children: n
				}),
				/* @__PURE__ */ (0, b.jsx)("text", {
					className: "donut-label",
					x: 110,
					y: 76,
					children: t
				})
			]
		}), /* @__PURE__ */ (0, b.jsx)(Nr, {
			data: u,
			valueFormatter: H
		})]
	});
}
function Nr({ data: e, valueFormatter: t }) {
	return /* @__PURE__ */ (0, b.jsx)("div", {
		className: "legend",
		children: e.map((e, n) => /* @__PURE__ */ (0, b.jsxs)("div", {
			className: "legend-item",
			children: [/* @__PURE__ */ (0, b.jsx)("span", {
				className: "legend-dot",
				style: { backgroundColor: e.color ?? V[n % V.length] }
			}), /* @__PURE__ */ (0, b.jsxs)("div", {
				className: "legend-copy",
				children: [/* @__PURE__ */ (0, b.jsx)("strong", { children: e.label }), /* @__PURE__ */ (0, b.jsx)("em", { children: e.detail ?? t(e.value) })]
			})]
		}, e.label))
	});
}
function Pr({ data: e, valueFormatter: t, percentMode: n = !1 }) {
	let r = Math.max(...e.map((e) => e.max ?? e.value), n ? 100 : 1);
	return /* @__PURE__ */ (0, b.jsx)("div", {
		className: "horizontal-bars",
		children: e.map((e, n) => {
			let i = e.max ?? r, a = yn(e.value / Math.max(i, 1) * 100);
			return /* @__PURE__ */ (0, b.jsxs)("div", {
				className: "bar-row",
				children: [/* @__PURE__ */ (0, b.jsxs)("div", {
					className: "bar-meta",
					children: [/* @__PURE__ */ (0, b.jsx)("span", { children: e.label }), /* @__PURE__ */ (0, b.jsx)("strong", { children: e.detail ?? t(e.value) })]
				}), /* @__PURE__ */ (0, b.jsx)("div", {
					className: "bar-track",
					"aria-label": `${e.label} ${t(e.value)}`,
					children: /* @__PURE__ */ (0, b.jsx)("span", {
						className: "bar-fill",
						style: {
							width: `${a}%`,
							backgroundColor: e.color ?? V[n % V.length]
						}
					})
				})]
			}, e.label);
		})
	});
}
function Fr({ data: e, valueFormatter: t }) {
	let n = Math.max(...e.map((e) => e.value), 1);
	return /* @__PURE__ */ (0, b.jsx)("div", {
		className: "vertical-bars",
		children: e.map((e, r) => {
			let i = yn(e.value / n * 100, 4, 100);
			return /* @__PURE__ */ (0, b.jsxs)("div", {
				className: "vbar",
				children: [
					/* @__PURE__ */ (0, b.jsx)("div", {
						className: "vbar-frame",
						"aria-label": `${e.label} ${t(e.value)}`,
						children: /* @__PURE__ */ (0, b.jsx)("span", {
							className: "vbar-fill",
							style: {
								height: `${i}%`,
								backgroundColor: e.color ?? V[r % V.length]
							}
						})
					}),
					/* @__PURE__ */ (0, b.jsx)("strong", { children: e.label }),
					/* @__PURE__ */ (0, b.jsx)("em", { children: e.detail ?? t(e.value) })
				]
			}, e.label);
		})
	});
}
function Ir({ data: e, valueFormatter: t }) {
	let n = e.map((e) => e.value), r = Math.min(...n, 0), i = Math.max(...n, 1), a = Math.max(i - r, 1), o = e.map((t, n) => ({
		x: 34 + n / Math.max(e.length - 1, 1) * 312,
		y: 182 - (t.value - r) / a * 152,
		...t
	})), s = o.map((e) => `${e.x},${e.y}`).join(" "), c = `M ${o[0]?.x ?? 34} 182 L ${s} L ${o[o.length - 1]?.x ?? 346} 182 Z`;
	return /* @__PURE__ */ (0, b.jsxs)("div", {
		className: "line-chart-wrap",
		children: [/* @__PURE__ */ (0, b.jsxs)("svg", {
			className: "line-chart",
			viewBox: "0 0 380 212",
			role: "img",
			"aria-label": "趋势折线图",
			children: [
				/* @__PURE__ */ (0, b.jsx)("path", {
					d: c,
					fill: "rgba(31, 95, 191, 0.12)"
				}),
				/* @__PURE__ */ (0, b.jsx)("polyline", {
					fill: "none",
					points: s,
					stroke: "#1f5fbf",
					strokeLinecap: "round",
					strokeLinejoin: "round",
					strokeWidth: "3"
				}),
				o.map((e) => /* @__PURE__ */ (0, b.jsxs)("g", { children: [/* @__PURE__ */ (0, b.jsx)("circle", {
					cx: e.x,
					cy: e.y,
					fill: "#ffffff",
					r: "4",
					stroke: "#1f5fbf",
					strokeWidth: "2"
				}), /* @__PURE__ */ (0, b.jsx)("text", {
					className: "line-label",
					x: e.x,
					y: 207,
					children: e.label
				})] }, e.label))
			]
		}), /* @__PURE__ */ (0, b.jsxs)("div", {
			className: "chart-caption",
			children: [/* @__PURE__ */ (0, b.jsxs)("span", { children: ["最低 ", t(n.length ? Math.min(...n) : 0)] }), /* @__PURE__ */ (0, b.jsxs)("span", { children: ["最高 ", t(n.length ? Math.max(...n) : 0)] })]
		})]
	});
}
function Lr({ data: e, valueFormatter: t }) {
	let n = e.filter((e) => e.value > 0), r = n.reduce((e, t) => e + t.value, 0);
	return /* @__PURE__ */ (0, b.jsxs)("div", {
		className: "stacked-wrap",
		children: [/* @__PURE__ */ (0, b.jsx)("div", {
			className: "stacked-bar",
			"aria-label": `合计 ${t(r)}`,
			children: n.length ? n.map((e, n) => /* @__PURE__ */ (0, b.jsx)("span", {
				style: {
					width: `${e.value / Math.max(r, 1) * 100}%`,
					backgroundColor: e.color ?? V[n % V.length]
				},
				title: `${e.label} ${t(e.value)}`
			}, e.label)) : /* @__PURE__ */ (0, b.jsx)("span", { style: {
				width: "100%",
				backgroundColor: "#d8e2ee"
			} })
		}), /* @__PURE__ */ (0, b.jsx)(Nr, {
			data: n.length ? n : [{
				label: "暂无数据",
				value: 0,
				color: "#b8c4d4"
			}],
			valueFormatter: t
		})]
	});
}
function Rr({ data: e, valueFormatter: t }) {
	return /* @__PURE__ */ (0, b.jsx)("div", {
		className: "progress-list",
		children: e.map((e, n) => {
			let r = yn(e.value / Math.max(e.max ?? e.value, 1) * 100);
			return /* @__PURE__ */ (0, b.jsxs)("div", {
				className: "progress-row",
				children: [
					/* @__PURE__ */ (0, b.jsxs)("div", {
						className: "bar-meta",
						children: [/* @__PURE__ */ (0, b.jsx)("span", { children: e.label }), /* @__PURE__ */ (0, b.jsxs)("strong", { children: [t(e.value), e.max ? ` / ${t(e.max)}` : ""] })]
					}),
					/* @__PURE__ */ (0, b.jsx)("div", {
						className: "progress-track",
						children: /* @__PURE__ */ (0, b.jsx)("span", {
							className: "progress-fill",
							style: {
								width: `${r}%`,
								backgroundColor: e.color ?? V[n % V.length]
							}
						})
					}),
					e.detail && /* @__PURE__ */ (0, b.jsx)("em", { children: e.detail })
				]
			}, e.label);
		})
	});
}
function zr({ events: e }) {
	return /* @__PURE__ */ (0, b.jsx)("div", {
		className: "cashflow-calendar",
		children: e.map((e) => /* @__PURE__ */ (0, b.jsxs)("article", {
			className: "calendar-event",
			children: [
				/* @__PURE__ */ (0, b.jsx)("span", { children: e.date.slice(5) }),
				/* @__PURE__ */ (0, b.jsx)("strong", { children: e.item }),
				/* @__PURE__ */ (0, b.jsxs)("div", { children: [e.inflow > 0 && /* @__PURE__ */ (0, b.jsxs)("em", {
					className: "positive",
					children: ["+", H(e.inflow)]
				}), e.outflow > 0 && /* @__PURE__ */ (0, b.jsxs)("em", {
					className: "negative",
					children: ["-", H(e.outflow)]
				})] }),
				/* @__PURE__ */ (0, b.jsx)("small", { children: "事项金额，非额外预算" })
			]
		}, `${e.date}-${e.item}`))
	});
}
function Br({ data: e }) {
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
	return /* @__PURE__ */ (0, b.jsxs)("div", {
		className: "waterfall-wrap",
		children: [/* @__PURE__ */ (0, b.jsxs)("svg", {
			className: "waterfall-chart",
			viewBox: "0 0 420 230",
			role: "img",
			"aria-label": "现金瀑布图",
			children: [/* @__PURE__ */ (0, b.jsx)("line", {
				className: "axis-line",
				x1: 32,
				x2: 388,
				y1: o(0),
				y2: o(0)
			}), t.map((e, n) => {
				let r = 32 + n * (356 / Math.max(t.length - 1, 1)) - s / 2, i = Math.min(o(e.before), o(e.after)), a = Math.max(4, Math.abs(o(e.before) - o(e.after)));
				return /* @__PURE__ */ (0, b.jsxs)("g", { children: [/* @__PURE__ */ (0, b.jsx)("rect", {
					fill: e.color ?? (e.value >= 0 ? V[1] : V[4]),
					height: a,
					rx: "4",
					width: s,
					x: r,
					y: i
				}), /* @__PURE__ */ (0, b.jsx)("text", {
					className: "waterfall-label",
					x: r + s / 2,
					y: 224,
					children: e.label
				})] }, e.label);
			})]
		}), /* @__PURE__ */ (0, b.jsxs)("div", {
			className: "chart-caption",
			children: [/* @__PURE__ */ (0, b.jsxs)("span", { children: ["流入 ", H(e.filter((e) => e.value > 0 && e.kind !== "start" && e.kind !== "end").reduce((e, t) => e + t.value, 0))] }), /* @__PURE__ */ (0, b.jsxs)("span", { children: ["流出 ", H(Math.abs(e.filter((e) => e.value < 0 && e.kind !== "start" && e.kind !== "end").reduce((e, t) => e + t.value, 0)))] })]
		})]
	});
}
function Vr({ data: e }) {
	return /* @__PURE__ */ (0, b.jsxs)("div", {
		className: "matrix-layout",
		children: [/* @__PURE__ */ (0, b.jsxs)("svg", {
			className: "risk-matrix",
			viewBox: "0 0 360 360",
			role: "img",
			"aria-label": "风险矩阵",
			children: [
				/* @__PURE__ */ (0, b.jsx)("rect", {
					className: "matrix-zone low",
					height: 248 / 2,
					width: 248 / 2,
					x: 56,
					y: 180
				}),
				/* @__PURE__ */ (0, b.jsx)("rect", {
					className: "matrix-zone mid",
					height: 248 / 2,
					width: 248 / 2,
					x: 180,
					y: 180
				}),
				/* @__PURE__ */ (0, b.jsx)("rect", {
					className: "matrix-zone mid",
					height: 248 / 2,
					width: 248 / 2,
					x: 56,
					y: 56
				}),
				/* @__PURE__ */ (0, b.jsx)("rect", {
					className: "matrix-zone high",
					height: 248 / 2,
					width: 248 / 2,
					x: 180,
					y: 56
				}),
				/* @__PURE__ */ (0, b.jsx)("line", {
					className: "axis-line",
					x1: 56,
					x2: 304,
					y1: 304,
					y2: 304
				}),
				/* @__PURE__ */ (0, b.jsx)("line", {
					className: "axis-line",
					x1: 56,
					x2: 56,
					y1: 56,
					y2: 304
				}),
				/* @__PURE__ */ (0, b.jsx)("text", {
					className: "matrix-axis",
					x: 360 / 2,
					y: 355,
					children: "影响"
				}),
				/* @__PURE__ */ (0, b.jsx)("text", {
					className: "matrix-axis vertical",
					x: "12",
					y: 360 / 2,
					children: "紧迫"
				}),
				e.map((e) => {
					let t = 56 + yn(e.x) / 100 * 248, n = 304 - yn(e.y) / 100 * 248;
					return /* @__PURE__ */ (0, b.jsxs)("g", { children: [/* @__PURE__ */ (0, b.jsx)("circle", {
						cx: t,
						cy: n,
						fill: e.color ?? V[0],
						r: "8"
					}), /* @__PURE__ */ (0, b.jsx)("text", {
						className: "matrix-point-label",
						x: t,
						y: n - 13,
						children: e.label
					})] }, e.label);
				})
			]
		}), /* @__PURE__ */ (0, b.jsx)(Nr, {
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
function Hr({ data: e, source: t, valueFormatter: n }) {
	let r = Math.max(...e.map((e) => e.value), 1);
	return /* @__PURE__ */ (0, b.jsxs)("div", {
		className: "flow-map",
		children: [/* @__PURE__ */ (0, b.jsx)("div", {
			className: "flow-source",
			children: t
		}), /* @__PURE__ */ (0, b.jsx)("div", {
			className: "flow-lines",
			children: e.map((e, t) => /* @__PURE__ */ (0, b.jsxs)("div", {
				className: "flow-row",
				children: [
					/* @__PURE__ */ (0, b.jsx)("span", { style: {
						width: `${yn(e.value / r * 100, 4, 100)}%`,
						backgroundColor: e.color ?? V[t % V.length]
					} }),
					/* @__PURE__ */ (0, b.jsx)("strong", { children: e.label }),
					/* @__PURE__ */ (0, b.jsx)("em", { children: n(e.value) })
				]
			}, e.label))
		})]
	});
}
function Ur({ data: e, xLabel: t, yLabel: n }) {
	return /* @__PURE__ */ (0, b.jsxs)("div", {
		className: "matrix-layout",
		children: [/* @__PURE__ */ (0, b.jsxs)("svg", {
			className: "risk-matrix",
			viewBox: "0 0 220 220",
			role: "img",
			"aria-label": `${t} 和 ${n} 散点图`,
			children: [
				/* @__PURE__ */ (0, b.jsx)("rect", {
					className: "matrix-zone low",
					height: 164,
					width: 164,
					x: 28,
					y: 28
				}),
				/* @__PURE__ */ (0, b.jsx)("line", {
					className: "axis-line",
					x1: 28,
					x2: 192,
					y1: 192,
					y2: 192
				}),
				/* @__PURE__ */ (0, b.jsx)("line", {
					className: "axis-line",
					x1: 28,
					x2: 28,
					y1: 28,
					y2: 192
				}),
				/* @__PURE__ */ (0, b.jsx)("text", {
					className: "matrix-axis",
					x: 220 / 2,
					y: 215,
					children: t
				}),
				/* @__PURE__ */ (0, b.jsx)("text", {
					className: "matrix-axis vertical",
					x: "12",
					y: 220 / 2,
					children: n
				}),
				e.map((e) => {
					let t = 28 + yn(e.x) / 100 * 164, n = 192 - yn(e.y) / 100 * 164;
					return /* @__PURE__ */ (0, b.jsxs)("g", { children: [/* @__PURE__ */ (0, b.jsx)("circle", {
						cx: t,
						cy: n,
						fill: e.color ?? V[0],
						r: "7"
					}), /* @__PURE__ */ (0, b.jsx)("text", {
						className: "matrix-point-label",
						x: t,
						y: n - 10,
						children: e.label
					})] }, e.label);
				})
			]
		}), /* @__PURE__ */ (0, b.jsx)(Nr, {
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
function Wr({ budgets: e, updateBudget: t, addBudget: n, deleteBudget: r, addDetailedBudgets: i }) {
	let [a, o] = (0, _.useState)(!1), s = e.reduce((e, t) => e + t.plan, 0), c = e.reduce((e, t) => e + t.actual, 0);
	return /* @__PURE__ */ (0, b.jsxs)(b.Fragment, { children: [
		/* @__PURE__ */ (0, b.jsx)(K, {
			title: "支出细项底表",
			meta: a ? `细项参考 ${P(s)} / 已记实际 ${P(c)} / 参考差额 ${P(s - c)}` : `已记实际 ${P(c)} / ${e.length} 个细项`,
			action: /* @__PURE__ */ (0, b.jsxs)("div", {
				className: "data-actions",
				children: [/* @__PURE__ */ (0, b.jsx)("button", {
					className: "secondary-button",
					type: "button",
					onClick: i,
					children: "补充常用细项"
				}), /* @__PURE__ */ (0, b.jsx)("button", {
					className: "secondary-button",
					type: "button",
					onClick: n,
					children: "新增分类"
				})]
			})
		}),
		/* @__PURE__ */ (0, b.jsxs)("label", {
			className: "spending-reference-toggle",
			children: [/* @__PURE__ */ (0, b.jsx)("input", {
				type: "checkbox",
				checked: a,
				onChange: (e) => o(e.target.checked)
			}), "细项参考额度"]
		}),
		/* @__PURE__ */ (0, b.jsx)("p", {
			className: "spending-detail-note",
			children: "日常使用账户单笔超过 10 元以咔皮记录核对；小额支付另做汇总。旧汇总与新细项不重复录入，未覆盖的小额支出不自动视为 0。学习填写课程、书籍、工具或会员名称。"
		}),
		/* @__PURE__ */ (0, b.jsx)("p", {
			className: "spending-detail-note",
			children: "投资和应急基金已在上方按月预留，计入月度支出占用与结余；下方仅记实际消费，转入基金不重复记账。周复盘汇总由对应复盘修订。"
		}),
		[
			...rt.slice(0, 2),
			{
				id: "investment",
				name: "投资基金"
			},
			...rt.slice(2),
			{
				id: "unassigned",
				name: "待归类（保留原始记录）"
			}
		].map((n) => /* @__PURE__ */ (0, b.jsxs)("details", {
			className: "review-method",
			children: [
				/* @__PURE__ */ (0, b.jsxs)("summary", { children: [
					n.name,
					" · ",
					n.id === "investment" ? "已按月预留" : `${P(e.filter((e) => it(e) === n.id).reduce((e, t) => e + Math.round(t.actual * 100), 0) / 100)} · ${e.filter((e) => it(e) === n.id).length} 项`
				] }),
				n.id === "investment" && /* @__PURE__ */ (0, b.jsx)("p", {
					className: "spending-detail-note",
					children: "月度投资预留已计入上方支出合计，实际净投入在周期复盘核对，不重复扣减。"
				}),
				/* @__PURE__ */ (0, b.jsx)("div", {
					className: "table-wrap spreadsheet-wrap",
					children: /* @__PURE__ */ (0, b.jsxs)("table", {
						className: `spreadsheet-table spending-detail-table${a ? " with-reference" : ""}`,
						children: [/* @__PURE__ */ (0, b.jsx)("thead", { children: /* @__PURE__ */ (0, b.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, b.jsx)("th", { children: "支出细项" }),
							/* @__PURE__ */ (0, b.jsx)("th", { children: "所属大类" }),
							a && /* @__PURE__ */ (0, b.jsx)("th", { children: "细项参考" }),
							/* @__PURE__ */ (0, b.jsx)("th", { children: "实际" }),
							a && /* @__PURE__ */ (0, b.jsx)("th", { children: "参考差额" }),
							/* @__PURE__ */ (0, b.jsx)("th", { children: "具体用途 / 咔皮备注" }),
							/* @__PURE__ */ (0, b.jsx)("th", { children: "必须" }),
							/* @__PURE__ */ (0, b.jsx)("th", { children: "固定" }),
							/* @__PURE__ */ (0, b.jsx)("th", { children: "操作" })
						] }) }), /* @__PURE__ */ (0, b.jsx)("tbody", { children: e.filter((e) => it(e) === n.id).map((n) => /* @__PURE__ */ (0, b.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, b.jsx)("td", { children: n.reviewPeriod ? /* @__PURE__ */ (0, b.jsxs)("span", { children: [n.name, /* @__PURE__ */ (0, b.jsxs)("small", { children: [
								n.reviewPeriod.start,
								" 至 ",
								n.reviewPeriod.end
							] })] }) : /* @__PURE__ */ (0, b.jsx)(ur, {
								ariaLabel: `${n.name} 分类`,
								value: n.name,
								onChange: (e) => t(n.id, { name: e })
							}) }),
							/* @__PURE__ */ (0, b.jsx)("td", { children: /* @__PURE__ */ (0, b.jsxs)("select", {
								className: "table-input",
								disabled: !!n.reviewPeriod,
								"aria-label": `${n.name} 所属大类`,
								value: it(n),
								onChange: (e) => t(n.id, { group: e.target.value }),
								children: [/* @__PURE__ */ (0, b.jsx)("option", {
									value: "unassigned",
									children: "待归类"
								}), rt.map((e) => /* @__PURE__ */ (0, b.jsx)("option", {
									value: e.id,
									children: e.name
								}, e.id))]
							}) }),
							a && /* @__PURE__ */ (0, b.jsx)("td", { children: /* @__PURE__ */ (0, b.jsx)(G, {
								ariaLabel: `${n.name} 预算`,
								value: n.plan,
								onChange: (e) => t(n.id, { plan: e })
							}) }),
							/* @__PURE__ */ (0, b.jsx)("td", { children: n.reviewPeriod ? P(n.actual) : /* @__PURE__ */ (0, b.jsx)(G, {
								ariaLabel: `${n.name} 实际`,
								step: .01,
								min: -1e8,
								value: n.actual,
								onChange: (e) => t(n.id, { actual: e })
							}) }),
							a && /* @__PURE__ */ (0, b.jsx)("td", {
								className: "calculated-cell",
								children: P(n.plan - n.actual)
							}),
							/* @__PURE__ */ (0, b.jsx)("td", {
								className: "spending-purpose",
								children: /* @__PURE__ */ (0, b.jsx)(ur, {
									ariaLabel: `${n.name} 具体用途`,
									value: n.note ?? "",
									onChange: (e) => t(n.id, { note: e })
								})
							}),
							/* @__PURE__ */ (0, b.jsx)("td", { children: /* @__PURE__ */ (0, b.jsx)(pr, {
								ariaLabel: `${n.name} 必须`,
								checked: n.required,
								onChange: (e) => t(n.id, { required: e })
							}) }),
							/* @__PURE__ */ (0, b.jsx)("td", { children: /* @__PURE__ */ (0, b.jsx)(pr, {
								ariaLabel: `${n.name} 固定`,
								checked: n.fixed,
								onChange: (e) => t(n.id, { fixed: e })
							}) }),
							/* @__PURE__ */ (0, b.jsx)("td", { children: /* @__PURE__ */ (0, b.jsx)("button", {
								className: "danger-button compact",
								disabled: e.length <= 1 || !!n.reviewPeriod,
								type: "button",
								onClick: () => r(n.id),
								children: "删除"
							}) })
						] }, n.id)) })]
					})
				})
			]
		}, n.id))
	] });
}
function Gr({ budgets: e, monthLabel: t, allowance: n }) {
	let r = ot(e);
	return /* @__PURE__ */ (0, b.jsxs)("section", {
		className: "learning-usage",
		"aria-label": `${t}学习用途`,
		children: [
			/* @__PURE__ */ (0, b.jsxs)("h3", { children: [t, " · 学习用途"] }),
			/* @__PURE__ */ (0, b.jsxs)("p", { children: [
				"当前方案学习额度 ",
				P(n),
				" / 已归类净支出 ",
				P(r.total),
				" / 额度减已记支出 ",
				P(n - r.total)
			] }),
			r.rows.length ? /* @__PURE__ */ (0, b.jsx)("div", {
				className: "table-wrap",
				children: /* @__PURE__ */ (0, b.jsxs)("table", { children: [/* @__PURE__ */ (0, b.jsx)("thead", { children: /* @__PURE__ */ (0, b.jsxs)("tr", { children: [
					/* @__PURE__ */ (0, b.jsx)("th", { children: "学习项目" }),
					/* @__PURE__ */ (0, b.jsx)("th", { children: "净支出" }),
					/* @__PURE__ */ (0, b.jsx)("th", { children: "具体学了什么" })
				] }) }), /* @__PURE__ */ (0, b.jsx)("tbody", { children: r.rows.map((e) => /* @__PURE__ */ (0, b.jsxs)("tr", { children: [
					/* @__PURE__ */ (0, b.jsx)("th", {
						scope: "row",
						children: e.name
					}),
					/* @__PURE__ */ (0, b.jsx)("td", { children: P(e.actual) }),
					/* @__PURE__ */ (0, b.jsx)("td", { children: e.note?.trim() || "用途待补" })
				] }, e.id)) })] })
			}) : /* @__PURE__ */ (0, b.jsx)("p", { children: "暂无已归类的学习支出；未录入不代表本月没有花费。" }),
			r.unassigned !== 0 && /* @__PURE__ */ (0, b.jsxs)("p", {
				className: "spending-detail-note",
				children: [
					"另有 ",
					P(r.unassigned),
					" 支出尚未归类，未纳入上述学习统计。"
				]
			})
		]
	});
}
//#endregion
//#region app/static-entry.tsx
var Kr = document.getElementById("root");
Kr && (0, v.createRoot)(Kr).render(/* @__PURE__ */ (0, b.jsx)(_.StrictMode, { children: /* @__PURE__ */ (0, b.jsx)(ar, {}) }));
//#endregion
