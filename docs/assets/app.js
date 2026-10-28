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
	var ee = Array.isArray;
	function S() {}
	var C = {
		H: null,
		A: null,
		T: null,
		S: null
	}, w = Object.prototype.hasOwnProperty;
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
	function T(e, t) {
		return te(e.type, t, e.props);
	}
	function E(e) {
		return typeof e == "object" && !!e && e.$$typeof === t;
	}
	function ne(e) {
		var t = {
			"=": "=0",
			":": "=2"
		};
		return "$" + e.replace(/[=:]/g, function(e) {
			return t[e];
		});
	}
	var re = /\/+/g;
	function D(e, t) {
		return typeof e == "object" && e && e.key != null ? ne("" + e.key) : t.toString(36);
	}
	function ie(e) {
		switch (e.status) {
			case "fulfilled": return e.value;
			case "rejected": throw e.reason;
			default: switch (typeof e.status == "string" ? e.then(S, S) : (e.status = "pending", e.then(function(t) {
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
	function ae(e, r, i, a, o) {
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
				case d: return c = e._init, ae(c(e._payload), r, i, a, o);
			}
		}
		if (c) return o = o(e), c = a === "" ? "." + D(e, 0) : a, ee(o) ? (i = "", c != null && (i = c.replace(re, "$&/") + "/"), ae(o, r, i, "", function(e) {
			return e;
		})) : o != null && (E(o) && (o = T(o, i + (o.key == null || e && e.key === o.key ? "" : ("" + o.key).replace(re, "$&/") + "/") + c)), r.push(o)), 1;
		c = 0;
		var l = a === "" ? "." : a + ":";
		if (ee(e)) for (var u = 0; u < e.length; u++) a = e[u], s = l + D(a, u), c += ae(a, r, i, s, o);
		else if (u = m(e), typeof u == "function") for (e = u.call(e), u = 0; !(a = e.next()).done;) a = a.value, s = l + D(a, u++), c += ae(a, r, i, s, o);
		else if (s === "object") {
			if (typeof e.then == "function") return ae(ie(e), r, i, a, o);
			throw r = String(e), Error("Objects are not valid as a React child (found: " + (r === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : r) + "). If you meant to render a collection of children, use an array instead.");
		}
		return c;
	}
	function oe(e, t, n) {
		if (e == null) return e;
		var r = [], i = 0;
		return ae(e, r, "", "", function(e) {
			return t.call(n, e, i++);
		}), r;
	}
	function se(e) {
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
	var O = typeof reportError == "function" ? reportError : function(e) {
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
	}, k = {
		map: oe,
		forEach: function(e, t, n) {
			oe(e, function() {
				t.apply(this, arguments);
			}, n);
		},
		count: function(e) {
			var t = 0;
			return oe(e, function() {
				t++;
			}), t;
		},
		toArray: function(e) {
			return oe(e, function(e) {
				return e;
			}) || [];
		},
		only: function(e) {
			if (!E(e)) throw Error("React.Children.only expected to receive a single React element child.");
			return e;
		}
	};
	e.Activity = f, e.Children = k, e.Component = v, e.Fragment = r, e.Profiler = a, e.PureComponent = b, e.StrictMode = i, e.Suspense = l, e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = C, e.__COMPILER_RUNTIME = {
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
		if (t != null) for (r in t.key !== void 0 && (a = "" + t.key), t) w.call(t, r) && r !== "key" && r !== "__self" && r !== "__source" && (i[r] = t[r]);
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
	}, e.isValidElement = E, e.lazy = function(e) {
		return {
			$$typeof: d,
			_payload: {
				_status: -1,
				_result: e
			},
			_init: se
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
			i !== null && i(n, r), typeof r == "object" && r && typeof r.then == "function" && r.then(S, O);
		} catch (e) {
			O(e);
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
		if (h = !1, b(e), !m) if (n(c) !== null) m = !0, ee || (ee = !0, E());
		else {
			var t = n(l);
			t !== null && D(x, t.startTime - e);
		}
	}
	var ee = !1, S = -1, C = 5, w = -1;
	function te() {
		return g ? !0 : !(e.unstable_now() - w < C);
	}
	function T() {
		if (g = !1, ee) {
			var t = e.unstable_now();
			w = t;
			var i = !0;
			try {
				a: {
					m = !1, h && (h = !1, v(S), S = -1), p = !0;
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
								u !== null && D(x, u.startTime - t), i = !1;
							}
						}
						break a;
					} finally {
						d = null, f = a, p = !1;
					}
					i = void 0;
				}
			} finally {
				i ? E() : ee = !1;
			}
		}
	}
	var E;
	if (typeof y == "function") E = function() {
		y(T);
	};
	else if (typeof MessageChannel < "u") {
		var ne = new MessageChannel(), re = ne.port2;
		ne.port1.onmessage = T, E = function() {
			re.postMessage(null);
		};
	} else E = function() {
		_(T, 0);
	};
	function D(t, n) {
		S = _(function() {
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
		}, a > o ? (r.sortIndex = a, t(l, r), n(c) === null && r === n(l) && (h ? (v(S), S = -1) : h = !0, D(x, a - o))) : (r.sortIndex = s, t(c, r), m || p || (m = !0, ee || (ee = !0, E()))), r;
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
	var h = Object.assign, g = Symbol.for("react.element"), _ = Symbol.for("react.transitional.element"), v = Symbol.for("react.portal"), y = Symbol.for("react.fragment"), b = Symbol.for("react.strict_mode"), x = Symbol.for("react.profiler"), ee = Symbol.for("react.consumer"), S = Symbol.for("react.context"), C = Symbol.for("react.forward_ref"), w = Symbol.for("react.suspense"), te = Symbol.for("react.suspense_list"), T = Symbol.for("react.memo"), E = Symbol.for("react.lazy"), ne = Symbol.for("react.activity"), re = Symbol.for("react.memo_cache_sentinel"), D = Symbol.iterator;
	function ie(e) {
		return typeof e != "object" || !e ? null : (e = D && e[D] || e["@@iterator"], typeof e == "function" ? e : null);
	}
	var ae = Symbol.for("react.client.reference");
	function oe(e) {
		if (e == null) return null;
		if (typeof e == "function") return e.$$typeof === ae ? null : e.displayName || e.name || null;
		if (typeof e == "string") return e;
		switch (e) {
			case y: return "Fragment";
			case x: return "Profiler";
			case b: return "StrictMode";
			case w: return "Suspense";
			case te: return "SuspenseList";
			case ne: return "Activity";
		}
		if (typeof e == "object") switch (e.$$typeof) {
			case v: return "Portal";
			case S: return e.displayName || "Context";
			case ee: return (e._context.displayName || "Context") + ".Consumer";
			case C:
				var t = e.render;
				return e = e.displayName, e ||= (e = t.displayName || t.name || "", e === "" ? "ForwardRef" : "ForwardRef(" + e + ")"), e;
			case T: return t = e.displayName || null, t === null ? oe(e.type) || "Memo" : t;
			case E:
				t = e._payload, e = e._init;
				try {
					return oe(e(t));
				} catch {}
		}
		return null;
	}
	var se = Array.isArray, O = n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, k = r.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, ce = {
		pending: !1,
		data: null,
		method: null,
		action: null
	}, le = [], ue = -1;
	function de(e) {
		return { current: e };
	}
	function A(e) {
		0 > ue || (e.current = le[ue], le[ue] = null, ue--);
	}
	function j(e, t) {
		ue++, le[ue] = e.current, e.current = t;
	}
	var fe = de(null), pe = de(null), me = de(null), M = de(null);
	function he(e, t) {
		switch (j(me, t), j(pe, e), j(fe, null), t.nodeType) {
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
		A(fe), j(fe, e);
	}
	function ge() {
		A(fe), A(pe), A(me);
	}
	function _e(e) {
		e.memoizedState !== null && j(M, e);
		var t = fe.current, n = Hd(t, e.type);
		t !== n && (j(pe, e), j(fe, n));
	}
	function ve(e) {
		pe.current === e && (A(fe), A(pe)), M.current === e && (A(M), Qf._currentValue = ce);
	}
	var ye, be;
	function xe(e) {
		if (ye === void 0) try {
			throw Error();
		} catch (e) {
			var t = e.stack.trim().match(/\n( *(at )?)/);
			ye = t && t[1] || "", be = -1 < e.stack.indexOf("\n    at") ? " (<anonymous>)" : -1 < e.stack.indexOf("@") ? "@unknown:0:0" : "";
		}
		return "\n" + ye + e + be;
	}
	var Se = !1;
	function Ce(e, t) {
		if (!e || Se) return "";
		Se = !0;
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
			Se = !1, Error.prepareStackTrace = n;
		}
		return (n = e ? e.displayName || e.name : "") ? xe(n) : "";
	}
	function we(e, t) {
		switch (e.tag) {
			case 26:
			case 27:
			case 5: return xe(e.type);
			case 16: return xe("Lazy");
			case 13: return e.child !== t && t !== null ? xe("Suspense Fallback") : xe("Suspense");
			case 19: return xe("SuspenseList");
			case 0:
			case 15: return Ce(e.type, !1);
			case 11: return Ce(e.type.render, !1);
			case 1: return Ce(e.type, !0);
			case 31: return xe("Activity");
			default: return "";
		}
	}
	function Te(e) {
		try {
			var t = "", n = null;
			do
				t += we(e, n), n = e, e = e.return;
			while (e);
			return t;
		} catch (e) {
			return "\nError generating stack: " + e.message + "\n" + e.stack;
		}
	}
	var Ee = Object.prototype.hasOwnProperty, De = t.unstable_scheduleCallback, Oe = t.unstable_cancelCallback, ke = t.unstable_shouldYield, Ae = t.unstable_requestPaint, je = t.unstable_now, Me = t.unstable_getCurrentPriorityLevel, Ne = t.unstable_ImmediatePriority, Pe = t.unstable_UserBlockingPriority, Fe = t.unstable_NormalPriority, Ie = t.unstable_LowPriority, Le = t.unstable_IdlePriority, Re = t.log, ze = t.unstable_setDisableYieldValue, Be = null, Ve = null;
	function He(e) {
		if (typeof Re == "function" && ze(e), Ve && typeof Ve.setStrictMode == "function") try {
			Ve.setStrictMode(Be, e);
		} catch {}
	}
	var Ue = Math.clz32 ? Math.clz32 : Ge, We = Math.log, N = Math.LN2;
	function Ge(e) {
		return e >>>= 0, e === 0 ? 32 : 31 - (We(e) / N | 0) | 0;
	}
	var Ke = 256, P = 262144, qe = 4194304;
	function Je(e) {
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
	function Ye(e, t, n) {
		var r = e.pendingLanes;
		if (r === 0) return 0;
		var i = 0, a = e.suspendedLanes, o = e.pingedLanes;
		e = e.warmLanes;
		var s = r & 134217727;
		return s === 0 ? (s = r & ~a, s === 0 ? o === 0 ? n || (n = r & ~e, n !== 0 && (i = Je(n))) : i = Je(o) : i = Je(s)) : (r = s & ~a, r === 0 ? (o &= s, o === 0 ? n || (n = s & ~e, n !== 0 && (i = Je(n))) : i = Je(o)) : i = Je(r)), i === 0 ? 0 : t !== 0 && t !== i && (t & a) === 0 && (a = i & -i, n = t & -t, a >= n || a === 32 && n & 4194048) ? t : i;
	}
	function Xe(e, t) {
		return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
	}
	function Ze(e, t) {
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
	function Qe() {
		var e = qe;
		return qe <<= 1, !(qe & 62914560) && (qe = 4194304), e;
	}
	function $e(e) {
		for (var t = [], n = 0; 31 > n; n++) t.push(e);
		return t;
	}
	function et(e, t) {
		e.pendingLanes |= t, t !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
	}
	function tt(e, t, n, r, i, a) {
		var o = e.pendingLanes;
		e.pendingLanes = n, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= n, e.entangledLanes &= n, e.errorRecoveryDisabledLanes &= n, e.shellSuspendCounter = 0;
		var s = e.entanglements, c = e.expirationTimes, l = e.hiddenUpdates;
		for (n = o & ~n; 0 < n;) {
			var u = 31 - Ue(n), d = 1 << u;
			s[u] = 0, c[u] = -1;
			var f = l[u];
			if (f !== null) for (l[u] = null, u = 0; u < f.length; u++) {
				var p = f[u];
				p !== null && (p.lane &= -536870913);
			}
			n &= ~d;
		}
		r !== 0 && nt(e, r, 0), a !== 0 && i === 0 && e.tag !== 0 && (e.suspendedLanes |= a & ~(o & ~t));
	}
	function nt(e, t, n) {
		e.pendingLanes |= t, e.suspendedLanes &= ~t;
		var r = 31 - Ue(t);
		e.entangledLanes |= t, e.entanglements[r] = e.entanglements[r] | 1073741824 | n & 261930;
	}
	function rt(e, t) {
		var n = e.entangledLanes |= t;
		for (e = e.entanglements; n;) {
			var r = 31 - Ue(n), i = 1 << r;
			i & t | e[r] & t && (e[r] |= t), n &= ~i;
		}
	}
	function it(e, t) {
		var n = t & -t;
		return n = n & 42 ? 1 : at(n), (n & (e.suspendedLanes | t)) === 0 ? n : 0;
	}
	function at(e) {
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
	function ot(e) {
		return e &= -e, 2 < e ? 8 < e ? e & 134217727 ? 32 : 268435456 : 8 : 2;
	}
	function st() {
		var e = k.p;
		return e === 0 ? (e = window.event, e === void 0 ? 32 : mp(e.type)) : e;
	}
	function ct(e, t) {
		var n = k.p;
		try {
			return k.p = e, t();
		} finally {
			k.p = n;
		}
	}
	var lt = Math.random().toString(36).slice(2), ut = "__reactFiber$" + lt, dt = "__reactProps$" + lt, ft = "__reactContainer$" + lt, pt = "__reactEvents$" + lt, mt = "__reactListeners$" + lt, ht = "__reactHandles$" + lt, gt = "__reactResources$" + lt, F = "__reactMarker$" + lt;
	function I(e) {
		delete e[ut], delete e[dt], delete e[pt], delete e[mt], delete e[ht];
	}
	function _t(e) {
		var t = e[ut];
		if (t) return t;
		for (var n = e.parentNode; n;) {
			if (t = n[ft] || n[ut]) {
				if (n = t.alternate, t.child !== null || n !== null && n.child !== null) for (e = df(e); e !== null;) {
					if (n = e[ut]) return n;
					e = df(e);
				}
				return t;
			}
			e = n, n = e.parentNode;
		}
		return null;
	}
	function vt(e) {
		if (e = e[ut] || e[ft]) {
			var t = e.tag;
			if (t === 5 || t === 6 || t === 13 || t === 31 || t === 26 || t === 27 || t === 3) return e;
		}
		return null;
	}
	function yt(e) {
		var t = e.tag;
		if (t === 5 || t === 26 || t === 27 || t === 6) return e.stateNode;
		throw Error(i(33));
	}
	function bt(e) {
		var t = e[gt];
		return t ||= e[gt] = {
			hoistableStyles: /* @__PURE__ */ new Map(),
			hoistableScripts: /* @__PURE__ */ new Map()
		}, t;
	}
	function xt(e) {
		e[F] = !0;
	}
	var St = /* @__PURE__ */ new Set(), Ct = {};
	function wt(e, t) {
		Tt(e, t), Tt(e + "Capture", t);
	}
	function Tt(e, t) {
		for (Ct[e] = t, e = 0; e < t.length; e++) St.add(t[e]);
	}
	var Et = RegExp("^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"), Dt = {}, Ot = {};
	function kt(e) {
		return Ee.call(Ot, e) ? !0 : Ee.call(Dt, e) ? !1 : Et.test(e) ? Ot[e] = !0 : (Dt[e] = !0, !1);
	}
	function At(e, t, n) {
		if (kt(t)) if (n === null) e.removeAttribute(t);
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
	function jt(e, t, n) {
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
	function Mt(e, t, n, r) {
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
	function Nt(e) {
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
	function Pt(e) {
		var t = e.type;
		return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
	}
	function Ft(e, t, n) {
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
	function It(e) {
		if (!e._valueTracker) {
			var t = Pt(e) ? "checked" : "value";
			e._valueTracker = Ft(e, t, "" + e[t]);
		}
	}
	function Lt(e) {
		if (!e) return !1;
		var t = e._valueTracker;
		if (!t) return !0;
		var n = t.getValue(), r = "";
		return e && (r = Pt(e) ? e.checked ? "true" : "false" : e.value), e = r, e === n ? !1 : (t.setValue(e), !0);
	}
	function Rt(e) {
		if (e ||= typeof document < "u" ? document : void 0, e === void 0) return null;
		try {
			return e.activeElement || e.body;
		} catch {
			return e.body;
		}
	}
	var zt = /[\n"\\]/g;
	function Bt(e) {
		return e.replace(zt, function(e) {
			return "\\" + e.charCodeAt(0).toString(16) + " ";
		});
	}
	function Vt(e, t, n, r, i, a, o, s) {
		e.name = "", o != null && typeof o != "function" && typeof o != "symbol" && typeof o != "boolean" ? e.type = o : e.removeAttribute("type"), t == null ? o !== "submit" && o !== "reset" || e.removeAttribute("value") : o === "number" ? (t === 0 && e.value === "" || e.value != t) && (e.value = "" + Nt(t)) : e.value !== "" + Nt(t) && (e.value = "" + Nt(t)), t == null ? n == null ? r != null && e.removeAttribute("value") : Ut(e, o, Nt(n)) : Ut(e, o, Nt(t)), i == null && a != null && (e.defaultChecked = !!a), i != null && (e.checked = i && typeof i != "function" && typeof i != "symbol"), s != null && typeof s != "function" && typeof s != "symbol" && typeof s != "boolean" ? e.name = "" + Nt(s) : e.removeAttribute("name");
	}
	function Ht(e, t, n, r, i, a, o, s) {
		if (a != null && typeof a != "function" && typeof a != "symbol" && typeof a != "boolean" && (e.type = a), t != null || n != null) {
			if (!(a !== "submit" && a !== "reset" || t != null)) {
				It(e);
				return;
			}
			n = n == null ? "" : "" + Nt(n), t = t == null ? n : "" + Nt(t), s || t === e.value || (e.value = t), e.defaultValue = t;
		}
		r ??= i, r = typeof r != "function" && typeof r != "symbol" && !!r, e.checked = s ? e.checked : !!r, e.defaultChecked = !!r, o != null && typeof o != "function" && typeof o != "symbol" && typeof o != "boolean" && (e.name = o), It(e);
	}
	function Ut(e, t, n) {
		t === "number" && Rt(e.ownerDocument) === e || e.defaultValue === "" + n || (e.defaultValue = "" + n);
	}
	function Wt(e, t, n, r) {
		if (e = e.options, t) {
			t = {};
			for (var i = 0; i < n.length; i++) t["$" + n[i]] = !0;
			for (n = 0; n < e.length; n++) i = t.hasOwnProperty("$" + e[n].value), e[n].selected !== i && (e[n].selected = i), i && r && (e[n].defaultSelected = !0);
		} else {
			for (n = "" + Nt(n), t = null, i = 0; i < e.length; i++) {
				if (e[i].value === n) {
					e[i].selected = !0, r && (e[i].defaultSelected = !0);
					return;
				}
				t !== null || e[i].disabled || (t = e[i]);
			}
			t !== null && (t.selected = !0);
		}
	}
	function Gt(e, t, n) {
		if (t != null && (t = "" + Nt(t), t !== e.value && (e.value = t), n == null)) {
			e.defaultValue !== t && (e.defaultValue = t);
			return;
		}
		e.defaultValue = n == null ? "" : "" + Nt(n);
	}
	function Kt(e, t, n, r) {
		if (t == null) {
			if (r != null) {
				if (n != null) throw Error(i(92));
				if (se(r)) {
					if (1 < r.length) throw Error(i(93));
					r = r[0];
				}
				n = r;
			}
			n ??= "", t = n;
		}
		n = Nt(t), e.defaultValue = n, r = e.textContent, r === n && r !== "" && r !== null && (e.value = r), It(e);
	}
	function qt(e, t) {
		if (t) {
			var n = e.firstChild;
			if (n && n === e.lastChild && n.nodeType === 3) {
				n.nodeValue = t;
				return;
			}
		}
		e.textContent = t;
	}
	var Jt = new Set("animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(" "));
	function Yt(e, t, n) {
		var r = t.indexOf("--") === 0;
		n == null || typeof n == "boolean" || n === "" ? r ? e.setProperty(t, "") : t === "float" ? e.cssFloat = "" : e[t] = "" : r ? e.setProperty(t, n) : typeof n != "number" || n === 0 || Jt.has(t) ? t === "float" ? e.cssFloat = n : e[t] = ("" + n).trim() : e[t] = n + "px";
	}
	function Xt(e, t, n) {
		if (t != null && typeof t != "object") throw Error(i(62));
		if (e = e.style, n != null) {
			for (var r in n) !n.hasOwnProperty(r) || t != null && t.hasOwnProperty(r) || (r.indexOf("--") === 0 ? e.setProperty(r, "") : r === "float" ? e.cssFloat = "" : e[r] = "");
			for (var a in t) r = t[a], t.hasOwnProperty(a) && n[a] !== r && Yt(e, a, r);
		} else for (var o in t) t.hasOwnProperty(o) && Yt(e, o, t[o]);
	}
	function Zt(e) {
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
	var Qt = new Map([
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
	]), $t = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
	function en(e) {
		return $t.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
	}
	function tn() {}
	var nn = null;
	function rn(e) {
		return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
	}
	var an = null, on = null;
	function sn(e) {
		var t = vt(e);
		if (t && (e = t.stateNode)) {
			var n = e[dt] || null;
			a: switch (e = t.stateNode, t.type) {
				case "input":
					if (Vt(e, n.value, n.defaultValue, n.defaultValue, n.checked, n.defaultChecked, n.type, n.name), t = n.name, n.type === "radio" && t != null) {
						for (n = e; n.parentNode;) n = n.parentNode;
						for (n = n.querySelectorAll("input[name=\"" + Bt("" + t) + "\"][type=\"radio\"]"), t = 0; t < n.length; t++) {
							var r = n[t];
							if (r !== e && r.form === e.form) {
								var a = r[dt] || null;
								if (!a) throw Error(i(90));
								Vt(r, a.value, a.defaultValue, a.defaultValue, a.checked, a.defaultChecked, a.type, a.name);
							}
						}
						for (t = 0; t < n.length; t++) r = n[t], r.form === e.form && Lt(r);
					}
					break a;
				case "textarea":
					Gt(e, n.value, n.defaultValue);
					break a;
				case "select": t = n.value, t != null && Wt(e, !!n.multiple, t, !1);
			}
		}
	}
	var L = !1;
	function cn(e, t, n) {
		if (L) return e(t, n);
		L = !0;
		try {
			return e(t);
		} finally {
			if (L = !1, (an !== null || on !== null) && (bu(), an && (t = an, e = on, on = an = null, sn(t), e))) for (t = 0; t < e.length; t++) sn(e[t]);
		}
	}
	function R(e, t) {
		var n = e.stateNode;
		if (n === null) return null;
		var r = n[dt] || null;
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
	var z = !(typeof window > "u" || window.document === void 0 || window.document.createElement === void 0), B = !1;
	if (z) try {
		var ln = {};
		Object.defineProperty(ln, "passive", { get: function() {
			B = !0;
		} }), window.addEventListener("test", ln, ln), window.removeEventListener("test", ln, ln);
	} catch {
		B = !1;
	}
	var un = null, dn = null, fn = null;
	function pn() {
		if (fn) return fn;
		var e, t = dn, n = t.length, r, i = "value" in un ? un.value : un.textContent, a = i.length;
		for (e = 0; e < n && t[e] === i[e]; e++);
		var o = n - e;
		for (r = 1; r <= o && t[n - r] === i[a - r]; r++);
		return fn = i.slice(e, 1 < r ? 1 - r : void 0);
	}
	function mn(e) {
		var t = e.keyCode;
		return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
	}
	function hn() {
		return !0;
	}
	function gn() {
		return !1;
	}
	function _n(e) {
		function t(t, n, r, i, a) {
			for (var o in this._reactName = t, this._targetInst = r, this.type = n, this.nativeEvent = i, this.target = a, this.currentTarget = null, e) e.hasOwnProperty(o) && (t = e[o], this[o] = t ? t(i) : i[o]);
			return this.isDefaultPrevented = (i.defaultPrevented == null ? !1 === i.returnValue : i.defaultPrevented) ? hn : gn, this.isPropagationStopped = gn, this;
		}
		return h(t.prototype, {
			preventDefault: function() {
				this.defaultPrevented = !0;
				var e = this.nativeEvent;
				e && (e.preventDefault ? e.preventDefault() : typeof e.returnValue != "unknown" && (e.returnValue = !1), this.isDefaultPrevented = hn);
			},
			stopPropagation: function() {
				var e = this.nativeEvent;
				e && (e.stopPropagation ? e.stopPropagation() : typeof e.cancelBubble != "unknown" && (e.cancelBubble = !0), this.isPropagationStopped = hn);
			},
			persist: function() {},
			isPersistent: hn
		}), t;
	}
	var vn = {
		eventPhase: 0,
		bubbles: 0,
		cancelable: 0,
		timeStamp: function(e) {
			return e.timeStamp || Date.now();
		},
		defaultPrevented: 0,
		isTrusted: 0
	}, yn = _n(vn), bn = h({}, vn, {
		view: 0,
		detail: 0
	}), xn = _n(bn), Sn, Cn, wn, Tn = h({}, bn, {
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
		getModifierState: In,
		button: 0,
		buttons: 0,
		relatedTarget: function(e) {
			return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
		},
		movementX: function(e) {
			return "movementX" in e ? e.movementX : (e !== wn && (wn && e.type === "mousemove" ? (Sn = e.screenX - wn.screenX, Cn = e.screenY - wn.screenY) : Cn = Sn = 0, wn = e), Sn);
		},
		movementY: function(e) {
			return "movementY" in e ? e.movementY : Cn;
		}
	}), En = _n(Tn), Dn = _n(h({}, Tn, { dataTransfer: 0 })), On = _n(h({}, bn, { relatedTarget: 0 })), kn = _n(h({}, vn, {
		animationName: 0,
		elapsedTime: 0,
		pseudoElement: 0
	})), An = _n(h({}, vn, { clipboardData: function(e) {
		return "clipboardData" in e ? e.clipboardData : window.clipboardData;
	} })), jn = _n(h({}, vn, { data: 0 })), Mn = {
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
	}, Nn = {
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
	}, Pn = {
		Alt: "altKey",
		Control: "ctrlKey",
		Meta: "metaKey",
		Shift: "shiftKey"
	};
	function Fn(e) {
		var t = this.nativeEvent;
		return t.getModifierState ? t.getModifierState(e) : (e = Pn[e]) ? !!t[e] : !1;
	}
	function In() {
		return Fn;
	}
	var Ln = _n(h({}, bn, {
		key: function(e) {
			if (e.key) {
				var t = Mn[e.key] || e.key;
				if (t !== "Unidentified") return t;
			}
			return e.type === "keypress" ? (e = mn(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? Nn[e.keyCode] || "Unidentified" : "";
		},
		code: 0,
		location: 0,
		ctrlKey: 0,
		shiftKey: 0,
		altKey: 0,
		metaKey: 0,
		repeat: 0,
		locale: 0,
		getModifierState: In,
		charCode: function(e) {
			return e.type === "keypress" ? mn(e) : 0;
		},
		keyCode: function(e) {
			return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
		},
		which: function(e) {
			return e.type === "keypress" ? mn(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
		}
	})), Rn = _n(h({}, Tn, {
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
	})), zn = _n(h({}, bn, {
		touches: 0,
		targetTouches: 0,
		changedTouches: 0,
		altKey: 0,
		metaKey: 0,
		ctrlKey: 0,
		shiftKey: 0,
		getModifierState: In
	})), Bn = _n(h({}, vn, {
		propertyName: 0,
		elapsedTime: 0,
		pseudoElement: 0
	})), Vn = _n(h({}, Tn, {
		deltaX: function(e) {
			return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
		},
		deltaY: function(e) {
			return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
		},
		deltaZ: 0,
		deltaMode: 0
	})), Hn = _n(h({}, vn, {
		newState: 0,
		oldState: 0
	})), Un = [
		9,
		13,
		27,
		32
	], Wn = z && "CompositionEvent" in window, Gn = null;
	z && "documentMode" in document && (Gn = document.documentMode);
	var Kn = z && "TextEvent" in window && !Gn, qn = z && (!Wn || Gn && 8 < Gn && 11 >= Gn), Jn = " ", Yn = !1;
	function Xn(e, t) {
		switch (e) {
			case "keyup": return Un.indexOf(t.keyCode) !== -1;
			case "keydown": return t.keyCode !== 229;
			case "keypress":
			case "mousedown":
			case "focusout": return !0;
			default: return !1;
		}
	}
	function Zn(e) {
		return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
	}
	var Qn = !1;
	function $n(e, t) {
		switch (e) {
			case "compositionend": return Zn(t);
			case "keypress": return t.which === 32 ? (Yn = !0, Jn) : null;
			case "textInput": return e = t.data, e === Jn && Yn ? null : e;
			default: return null;
		}
	}
	function er(e, t) {
		if (Qn) return e === "compositionend" || !Wn && Xn(e, t) ? (e = pn(), fn = dn = un = null, Qn = !1, e) : null;
		switch (e) {
			case "paste": return null;
			case "keypress":
				if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
					if (t.char && 1 < t.char.length) return t.char;
					if (t.which) return String.fromCharCode(t.which);
				}
				return null;
			case "compositionend": return qn && t.locale !== "ko" ? null : t.data;
			default: return null;
		}
	}
	var tr = {
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
	function nr(e) {
		var t = e && e.nodeName && e.nodeName.toLowerCase();
		return t === "input" ? !!tr[e.type] : t === "textarea";
	}
	function rr(e, t, n, r) {
		an ? on ? on.push(r) : on = [r] : an = r, t = Ed(t, "onChange"), 0 < t.length && (n = new yn("onChange", "change", null, n, r), e.push({
			event: n,
			listeners: t
		}));
	}
	var ir = null, ar = null;
	function or(e) {
		yd(e, 0);
	}
	function sr(e) {
		if (Lt(yt(e))) return e;
	}
	function V(e, t) {
		if (e === "change") return t;
	}
	var cr = !1;
	if (z) {
		var lr;
		if (z) {
			var ur = "oninput" in document;
			if (!ur) {
				var dr = document.createElement("div");
				dr.setAttribute("oninput", "return;"), ur = typeof dr.oninput == "function";
			}
			lr = ur;
		} else lr = !1;
		cr = lr && (!document.documentMode || 9 < document.documentMode);
	}
	function fr() {
		ir && (ir.detachEvent("onpropertychange", pr), ar = ir = null);
	}
	function pr(e) {
		if (e.propertyName === "value" && sr(ar)) {
			var t = [];
			rr(t, ar, e, rn(e)), cn(or, t);
		}
	}
	function mr(e, t, n) {
		e === "focusin" ? (fr(), ir = t, ar = n, ir.attachEvent("onpropertychange", pr)) : e === "focusout" && fr();
	}
	function hr(e) {
		if (e === "selectionchange" || e === "keyup" || e === "keydown") return sr(ar);
	}
	function gr(e, t) {
		if (e === "click") return sr(t);
	}
	function _r(e, t) {
		if (e === "input" || e === "change") return sr(t);
	}
	function vr(e, t) {
		return e === t && (e !== 0 || 1 / e == 1 / t) || e !== e && t !== t;
	}
	var yr = typeof Object.is == "function" ? Object.is : vr;
	function br(e, t) {
		if (yr(e, t)) return !0;
		if (typeof e != "object" || !e || typeof t != "object" || !t) return !1;
		var n = Object.keys(e), r = Object.keys(t);
		if (n.length !== r.length) return !1;
		for (r = 0; r < n.length; r++) {
			var i = n[r];
			if (!Ee.call(t, i) || !yr(e[i], t[i])) return !1;
		}
		return !0;
	}
	function xr(e) {
		for (; e && e.firstChild;) e = e.firstChild;
		return e;
	}
	function Sr(e, t) {
		var n = xr(e);
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
			n = xr(n);
		}
	}
	function Cr(e, t) {
		return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? Cr(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
	}
	function wr(e) {
		e = e != null && e.ownerDocument != null && e.ownerDocument.defaultView != null ? e.ownerDocument.defaultView : window;
		for (var t = Rt(e.document); t instanceof e.HTMLIFrameElement;) {
			try {
				var n = typeof t.contentWindow.location.href == "string";
			} catch {
				n = !1;
			}
			if (n) e = t.contentWindow;
			else break;
			t = Rt(e.document);
		}
		return t;
	}
	function Tr(e) {
		var t = e && e.nodeName && e.nodeName.toLowerCase();
		return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
	}
	var Er = z && "documentMode" in document && 11 >= document.documentMode, Dr = null, Or = null, kr = null, Ar = !1;
	function jr(e, t, n) {
		var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
		Ar || Dr == null || Dr !== Rt(r) || (r = Dr, "selectionStart" in r && Tr(r) ? r = {
			start: r.selectionStart,
			end: r.selectionEnd
		} : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = {
			anchorNode: r.anchorNode,
			anchorOffset: r.anchorOffset,
			focusNode: r.focusNode,
			focusOffset: r.focusOffset
		}), kr && br(kr, r) || (kr = r, r = Ed(Or, "onSelect"), 0 < r.length && (t = new yn("onSelect", "select", null, t, n), e.push({
			event: t,
			listeners: r
		}), t.target = Dr)));
	}
	function Mr(e, t) {
		var n = {};
		return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
	}
	var Nr = {
		animationend: Mr("Animation", "AnimationEnd"),
		animationiteration: Mr("Animation", "AnimationIteration"),
		animationstart: Mr("Animation", "AnimationStart"),
		transitionrun: Mr("Transition", "TransitionRun"),
		transitionstart: Mr("Transition", "TransitionStart"),
		transitioncancel: Mr("Transition", "TransitionCancel"),
		transitionend: Mr("Transition", "TransitionEnd")
	}, Pr = {}, Fr = {};
	z && (Fr = document.createElement("div").style, "AnimationEvent" in window || (delete Nr.animationend.animation, delete Nr.animationiteration.animation, delete Nr.animationstart.animation), "TransitionEvent" in window || delete Nr.transitionend.transition);
	function Ir(e) {
		if (Pr[e]) return Pr[e];
		if (!Nr[e]) return e;
		var t = Nr[e], n;
		for (n in t) if (t.hasOwnProperty(n) && n in Fr) return Pr[e] = t[n];
		return e;
	}
	var Lr = Ir("animationend"), Rr = Ir("animationiteration"), zr = Ir("animationstart"), Br = Ir("transitionrun"), Vr = Ir("transitionstart"), Hr = Ir("transitioncancel"), Ur = Ir("transitionend"), Wr = /* @__PURE__ */ new Map(), Gr = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
	Gr.push("scrollEnd");
	function Kr(e, t) {
		Wr.set(e, t), wt(t, [e]);
	}
	var qr = typeof reportError == "function" ? reportError : function(e) {
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
	}, Jr = [], Yr = 0, Xr = 0;
	function Zr() {
		for (var e = Yr, t = Xr = Yr = 0; t < e;) {
			var n = Jr[t];
			Jr[t++] = null;
			var r = Jr[t];
			Jr[t++] = null;
			var i = Jr[t];
			Jr[t++] = null;
			var a = Jr[t];
			if (Jr[t++] = null, r !== null && i !== null) {
				var o = r.pending;
				o === null ? i.next = i : (i.next = o.next, o.next = i), r.pending = i;
			}
			a !== 0 && ti(n, i, a);
		}
	}
	function Qr(e, t, n, r) {
		Jr[Yr++] = e, Jr[Yr++] = t, Jr[Yr++] = n, Jr[Yr++] = r, Xr |= r, e.lanes |= r, e = e.alternate, e !== null && (e.lanes |= r);
	}
	function $r(e, t, n, r) {
		return Qr(e, t, n, r), ni(e);
	}
	function ei(e, t) {
		return Qr(e, null, null, t), ni(e);
	}
	function ti(e, t, n) {
		e.lanes |= n;
		var r = e.alternate;
		r !== null && (r.lanes |= n);
		for (var i = !1, a = e.return; a !== null;) a.childLanes |= n, r = a.alternate, r !== null && (r.childLanes |= n), a.tag === 22 && (e = a.stateNode, e === null || e._visibility & 1 || (i = !0)), e = a, a = a.return;
		return e.tag === 3 ? (a = e.stateNode, i && t !== null && (i = 31 - Ue(n), e = a.hiddenUpdates, r = e[i], r === null ? e[i] = [t] : r.push(t), t.lane = n | 536870912), a) : null;
	}
	function ni(e) {
		if (50 < du) throw du = 0, fu = null, Error(i(185));
		for (var t = e.return; t !== null;) e = t, t = e.return;
		return e.tag === 3 ? e.stateNode : null;
	}
	var ri = {};
	function ii(e, t, n, r) {
		this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
	}
	function ai(e, t, n, r) {
		return new ii(e, t, n, r);
	}
	function oi(e) {
		return e = e.prototype, !(!e || !e.isReactComponent);
	}
	function si(e, t) {
		var n = e.alternate;
		return n === null ? (n = ai(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 65011712, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : {
			lanes: t.lanes,
			firstContext: t.firstContext
		}, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n.refCleanup = e.refCleanup, n;
	}
	function ci(e, t) {
		e.flags &= 65011714;
		var n = e.alternate;
		return n === null ? (e.childLanes = 0, e.lanes = t, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = n.childLanes, e.lanes = n.lanes, e.child = n.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = n.memoizedProps, e.memoizedState = n.memoizedState, e.updateQueue = n.updateQueue, e.type = n.type, t = n.dependencies, e.dependencies = t === null ? null : {
			lanes: t.lanes,
			firstContext: t.firstContext
		}), e;
	}
	function li(e, t, n, r, a, o) {
		var s = 0;
		if (r = e, typeof e == "function") oi(e) && (s = 1);
		else if (typeof e == "string") s = Uf(e, n, fe.current) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
		else a: switch (e) {
			case ne: return e = ai(31, n, t, a), e.elementType = ne, e.lanes = o, e;
			case y: return ui(n.children, a, o, t);
			case b:
				s = 8, a |= 24;
				break;
			case x: return e = ai(12, n, t, a | 2), e.elementType = x, e.lanes = o, e;
			case w: return e = ai(13, n, t, a), e.elementType = w, e.lanes = o, e;
			case te: return e = ai(19, n, t, a), e.elementType = te, e.lanes = o, e;
			default:
				if (typeof e == "object" && e) switch (e.$$typeof) {
					case S:
						s = 10;
						break a;
					case ee:
						s = 9;
						break a;
					case C:
						s = 11;
						break a;
					case T:
						s = 14;
						break a;
					case E:
						s = 16, r = null;
						break a;
				}
				s = 29, n = Error(i(130, e === null ? "null" : typeof e, "")), r = null;
		}
		return t = ai(s, n, t, a), t.elementType = e, t.type = r, t.lanes = o, t;
	}
	function ui(e, t, n, r) {
		return e = ai(7, e, r, t), e.lanes = n, e;
	}
	function di(e, t, n) {
		return e = ai(6, e, null, t), e.lanes = n, e;
	}
	function fi(e) {
		var t = ai(18, null, null, 0);
		return t.stateNode = e, t;
	}
	function pi(e, t, n) {
		return t = ai(4, e.children === null ? [] : e.children, e.key, t), t.lanes = n, t.stateNode = {
			containerInfo: e.containerInfo,
			pendingChildren: null,
			implementation: e.implementation
		}, t;
	}
	var mi = /* @__PURE__ */ new WeakMap();
	function hi(e, t) {
		if (typeof e == "object" && e) {
			var n = mi.get(e);
			return n === void 0 ? (t = {
				value: e,
				source: t,
				stack: Te(t)
			}, mi.set(e, t), t) : n;
		}
		return {
			value: e,
			source: t,
			stack: Te(t)
		};
	}
	var gi = [], _i = 0, vi = null, yi = 0, bi = [], xi = 0, Si = null, Ci = 1, wi = "";
	function Ti(e, t) {
		gi[_i++] = yi, gi[_i++] = vi, vi = e, yi = t;
	}
	function Ei(e, t, n) {
		bi[xi++] = Ci, bi[xi++] = wi, bi[xi++] = Si, Si = e;
		var r = Ci;
		e = wi;
		var i = 32 - Ue(r) - 1;
		r &= ~(1 << i), n += 1;
		var a = 32 - Ue(t) + i;
		if (30 < a) {
			var o = i - i % 5;
			a = (r & (1 << o) - 1).toString(32), r >>= o, i -= o, Ci = 1 << 32 - Ue(t) + i | n << i | r, wi = a + e;
		} else Ci = 1 << a | n << i | r, wi = e;
	}
	function Di(e) {
		e.return !== null && (Ti(e, 1), Ei(e, 1, 0));
	}
	function Oi(e) {
		for (; e === vi;) vi = gi[--_i], gi[_i] = null, yi = gi[--_i], gi[_i] = null;
		for (; e === Si;) Si = bi[--xi], bi[xi] = null, wi = bi[--xi], bi[xi] = null, Ci = bi[--xi], bi[xi] = null;
	}
	function ki(e, t) {
		bi[xi++] = Ci, bi[xi++] = wi, bi[xi++] = Si, Ci = t.id, wi = t.overflow, Si = e;
	}
	var Ai = null, H = null, U = !1, ji = null, Mi = !1, Ni = Error(i(519));
	function Pi(e) {
		throw Bi(hi(Error(i(418, 1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML", "")), e)), Ni;
	}
	function Fi(e) {
		var t = e.stateNode, n = e.type, r = e.memoizedProps;
		switch (t[ut] = e, t[dt] = r, n) {
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
				Q("invalid", t), Ht(t, r.value, r.defaultValue, r.checked, r.defaultChecked, r.type, r.name, !0);
				break;
			case "select":
				Q("invalid", t);
				break;
			case "textarea": Q("invalid", t), Kt(t, r.value, r.defaultValue, r.children);
		}
		n = r.children, typeof n != "string" && typeof n != "number" && typeof n != "bigint" || t.textContent === "" + n || !0 === r.suppressHydrationWarning || Md(t.textContent, n) ? (r.popover != null && (Q("beforetoggle", t), Q("toggle", t)), r.onScroll != null && Q("scroll", t), r.onScrollEnd != null && Q("scrollend", t), r.onClick != null && (t.onclick = tn), t = !0) : t = !1, t || Pi(e, !0);
	}
	function Ii(e) {
		for (Ai = e.return; Ai;) switch (Ai.tag) {
			case 5:
			case 31:
			case 13:
				Mi = !1;
				return;
			case 27:
			case 3:
				Mi = !0;
				return;
			default: Ai = Ai.return;
		}
	}
	function Li(e) {
		if (e !== Ai) return !1;
		if (!U) return Ii(e), U = !0, !1;
		var t = e.tag, n;
		if ((n = t !== 3 && t !== 27) && ((n = t === 5) && (n = e.type, n = !(n !== "form" && n !== "button") || Ud(e.type, e.memoizedProps)), n = !n), n && H && Pi(e), Ii(e), t === 13) {
			if (e = e.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(i(317));
			H = uf(e);
		} else if (t === 31) {
			if (e = e.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(i(317));
			H = uf(e);
		} else t === 27 ? (t = H, Zd(e.type) ? (e = lf, lf = null, H = e) : H = t) : H = Ai ? cf(e.stateNode.nextSibling) : null;
		return !0;
	}
	function Ri() {
		H = Ai = null, U = !1;
	}
	function zi() {
		var e = ji;
		return e !== null && (Zl === null ? Zl = e : Zl.push.apply(Zl, e), ji = null), e;
	}
	function Bi(e) {
		ji === null ? ji = [e] : ji.push(e);
	}
	var Vi = de(null), Hi = null, Ui = null;
	function Wi(e, t, n) {
		j(Vi, t._currentValue), t._currentValue = n;
	}
	function Gi(e) {
		e._currentValue = Vi.current, A(Vi);
	}
	function Ki(e, t, n) {
		for (; e !== null;) {
			var r = e.alternate;
			if ((e.childLanes & t) === t ? r !== null && (r.childLanes & t) !== t && (r.childLanes |= t) : (e.childLanes |= t, r !== null && (r.childLanes |= t)), e === n) break;
			e = e.return;
		}
	}
	function qi(e, t, n, r) {
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
						o.lanes |= n, c = o.alternate, c !== null && (c.lanes |= n), Ki(o.return, n, e), r || (s = null);
						break a;
					}
					o = c.next;
				}
			} else if (a.tag === 18) {
				if (s = a.return, s === null) throw Error(i(341));
				s.lanes |= n, o = s.alternate, o !== null && (o.lanes |= n), Ki(s, n, e), s = null;
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
	function Ji(e, t, n, r) {
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
					yr(a.pendingProps.value, s.value) || (e === null ? e = [c] : e.push(c));
				}
			} else if (a === M.current) {
				if (s = a.alternate, s === null) throw Error(i(387));
				s.memoizedState.memoizedState !== a.memoizedState.memoizedState && (e === null ? e = [Qf] : e.push(Qf));
			}
			a = a.return;
		}
		e !== null && qi(t, e, n, r), t.flags |= 262144;
	}
	function Yi(e) {
		for (e = e.firstContext; e !== null;) {
			if (!yr(e.context._currentValue, e.memoizedValue)) return !0;
			e = e.next;
		}
		return !1;
	}
	function Xi(e) {
		Hi = e, Ui = null, e = e.dependencies, e !== null && (e.firstContext = null);
	}
	function Zi(e) {
		return $i(Hi, e);
	}
	function Qi(e, t) {
		return Hi === null && Xi(e), $i(e, t);
	}
	function $i(e, t) {
		var n = t._currentValue;
		if (t = {
			context: t,
			memoizedValue: n,
			next: null
		}, Ui === null) {
			if (e === null) throw Error(i(308));
			Ui = t, e.dependencies = {
				lanes: 0,
				firstContext: t
			}, e.flags |= 524288;
		} else Ui = Ui.next = t;
		return n;
	}
	var ea = typeof AbortController < "u" ? AbortController : function() {
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
	}, ta = t.unstable_scheduleCallback, na = t.unstable_NormalPriority, ra = {
		$$typeof: S,
		Consumer: null,
		Provider: null,
		_currentValue: null,
		_currentValue2: null,
		_threadCount: 0
	};
	function ia() {
		return {
			controller: new ea(),
			data: /* @__PURE__ */ new Map(),
			refCount: 0
		};
	}
	function aa(e) {
		e.refCount--, e.refCount === 0 && ta(na, function() {
			e.controller.abort();
		});
	}
	var oa = null, sa = 0, ca = 0, la = null;
	function ua(e, t) {
		if (oa === null) {
			var n = oa = [];
			sa = 0, ca = dd(), la = {
				status: "pending",
				value: void 0,
				then: function(e) {
					n.push(e);
				}
			};
		}
		return sa++, t.then(da, da), t;
	}
	function da() {
		if (--sa === 0 && oa !== null) {
			la !== null && (la.status = "fulfilled");
			var e = oa;
			oa = null, ca = 0, la = null;
			for (var t = 0; t < e.length; t++) (0, e[t])();
		}
	}
	function fa(e, t) {
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
	var pa = O.S;
	O.S = function(e, t) {
		eu = je(), typeof t == "object" && t && typeof t.then == "function" && ua(e, t), pa !== null && pa(e, t);
	};
	var ma = de(null);
	function ha() {
		var e = ma.current;
		return e === null ? q.pooledCache : e;
	}
	function ga(e, t) {
		t === null ? j(ma, ma.current) : j(ma, t.pool);
	}
	function _a() {
		var e = ha();
		return e === null ? null : {
			parent: ra._currentValue,
			pool: e
		};
	}
	var va = Error(i(460)), ya = Error(i(474)), ba = Error(i(542)), xa = { then: function() {} };
	function Sa(e) {
		return e = e.status, e === "fulfilled" || e === "rejected";
	}
	function Ca(e, t, n) {
		switch (n = e[n], n === void 0 ? e.push(t) : n !== t && (t.then(tn, tn), t = n), t.status) {
			case "fulfilled": return t.value;
			case "rejected": throw e = t.reason, Da(e), e;
			default:
				if (typeof t.status == "string") t.then(tn, tn);
				else {
					if (e = q, e !== null && 100 < e.shellSuspendCounter) throw Error(i(482));
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
					case "rejected": throw e = t.reason, Da(e), e;
				}
				throw Ta = t, va;
		}
	}
	function wa(e) {
		try {
			var t = e._init;
			return t(e._payload);
		} catch (e) {
			throw typeof e == "object" && e && typeof e.then == "function" ? (Ta = e, va) : e;
		}
	}
	var Ta = null;
	function Ea() {
		if (Ta === null) throw Error(i(459));
		var e = Ta;
		return Ta = null, e;
	}
	function Da(e) {
		if (e === va || e === ba) throw Error(i(483));
	}
	var Oa = null, ka = 0;
	function Aa(e) {
		var t = ka;
		return ka += 1, Oa === null && (Oa = []), Ca(Oa, e, t);
	}
	function ja(e, t) {
		t = t.props.ref, e.ref = t === void 0 ? null : t;
	}
	function Ma(e, t) {
		throw t.$$typeof === g ? Error(i(525)) : (e = Object.prototype.toString.call(t), Error(i(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e)));
	}
	function Na(e) {
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
			return e = si(e, t), e.index = 0, e.sibling = null, e;
		}
		function o(t, n, r) {
			return t.index = r, e ? (r = t.alternate, r === null ? (t.flags |= 67108866, n) : (r = r.index, r < n ? (t.flags |= 67108866, n) : r)) : (t.flags |= 1048576, n);
		}
		function s(t) {
			return e && t.alternate === null && (t.flags |= 67108866), t;
		}
		function c(e, t, n, r) {
			return t === null || t.tag !== 6 ? (t = di(n, e.mode, r), t.return = e, t) : (t = a(t, n), t.return = e, t);
		}
		function l(e, t, n, r) {
			var i = n.type;
			return i === y ? d(e, t, n.props.children, r, n.key) : t !== null && (t.elementType === i || typeof i == "object" && i && i.$$typeof === E && wa(i) === t.type) ? (t = a(t, n.props), ja(t, n), t.return = e, t) : (t = li(n.type, n.key, n.props, null, e.mode, r), ja(t, n), t.return = e, t);
		}
		function u(e, t, n, r) {
			return t === null || t.tag !== 4 || t.stateNode.containerInfo !== n.containerInfo || t.stateNode.implementation !== n.implementation ? (t = pi(n, e.mode, r), t.return = e, t) : (t = a(t, n.children || []), t.return = e, t);
		}
		function d(e, t, n, r, i) {
			return t === null || t.tag !== 7 ? (t = ui(n, e.mode, r, i), t.return = e, t) : (t = a(t, n), t.return = e, t);
		}
		function f(e, t, n) {
			if (typeof t == "string" && t !== "" || typeof t == "number" || typeof t == "bigint") return t = di("" + t, e.mode, n), t.return = e, t;
			if (typeof t == "object" && t) {
				switch (t.$$typeof) {
					case _: return n = li(t.type, t.key, t.props, null, e.mode, n), ja(n, t), n.return = e, n;
					case v: return t = pi(t, e.mode, n), t.return = e, t;
					case E: return t = wa(t), f(e, t, n);
				}
				if (se(t) || ie(t)) return t = ui(t, e.mode, n, null), t.return = e, t;
				if (typeof t.then == "function") return f(e, Aa(t), n);
				if (t.$$typeof === S) return f(e, Qi(e, t), n);
				Ma(e, t);
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
					case E: return n = wa(n), p(e, t, n, r);
				}
				if (se(n) || ie(n)) return i === null ? d(e, t, n, r, null) : null;
				if (typeof n.then == "function") return p(e, t, Aa(n), r);
				if (n.$$typeof === S) return p(e, t, Qi(e, n), r);
				Ma(e, n);
			}
			return null;
		}
		function m(e, t, n, r, i) {
			if (typeof r == "string" && r !== "" || typeof r == "number" || typeof r == "bigint") return e = e.get(n) || null, c(t, e, "" + r, i);
			if (typeof r == "object" && r) {
				switch (r.$$typeof) {
					case _: return e = e.get(r.key === null ? n : r.key) || null, l(t, e, r, i);
					case v: return e = e.get(r.key === null ? n : r.key) || null, u(t, e, r, i);
					case E: return r = wa(r), m(e, t, n, r, i);
				}
				if (se(r) || ie(r)) return e = e.get(n) || null, d(t, e, r, i, null);
				if (typeof r.then == "function") return m(e, t, n, Aa(r), i);
				if (r.$$typeof === S) return m(e, t, n, Qi(t, r), i);
				Ma(t, r);
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
			if (h === s.length) return n(i, d), U && Ti(i, h), l;
			if (d === null) {
				for (; h < s.length; h++) d = f(i, s[h], c), d !== null && (a = o(d, a, h), u === null ? l = d : u.sibling = d, u = d);
				return U && Ti(i, h), l;
			}
			for (d = r(d); h < s.length; h++) g = m(d, i, h, s[h], c), g !== null && (e && g.alternate !== null && d.delete(g.key === null ? h : g.key), a = o(g, a, h), u === null ? l = g : u.sibling = g, u = g);
			return e && d.forEach(function(e) {
				return t(i, e);
			}), U && Ti(i, h), l;
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
			if (v.done) return n(a, h), U && Ti(a, g), u;
			if (h === null) {
				for (; !v.done; g++, v = c.next()) v = f(a, v.value, l), v !== null && (s = o(v, s, g), d === null ? u = v : d.sibling = v, d = v);
				return U && Ti(a, g), u;
			}
			for (h = r(h); !v.done; g++, v = c.next()) v = m(h, a, g, v.value, l), v !== null && (e && v.alternate !== null && h.delete(v.key === null ? g : v.key), s = o(v, s, g), d === null ? u = v : d.sibling = v, d = v);
			return e && h.forEach(function(e) {
				return t(a, e);
			}), U && Ti(a, g), u;
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
									} else if (r.elementType === l || typeof l == "object" && l && l.$$typeof === E && wa(l) === r.type) {
										n(e, r.sibling), c = a(r, o.props), ja(c, o), c.return = e, e = c;
										break a;
									}
									n(e, r);
									break;
								} else t(e, r);
								r = r.sibling;
							}
							o.type === y ? (c = ui(o.props.children, e.mode, c, o.key), c.return = e, e = c) : (c = li(o.type, o.key, o.props, null, e.mode, c), ja(c, o), c.return = e, e = c);
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
							c = pi(o, e.mode, c), c.return = e, e = c;
						}
						return s(e);
					case E: return o = wa(o), b(e, r, o, c);
				}
				if (se(o)) return h(e, r, o, c);
				if (ie(o)) {
					if (l = ie(o), typeof l != "function") throw Error(i(150));
					return o = l.call(o), g(e, r, o, c);
				}
				if (typeof o.then == "function") return b(e, r, Aa(o), c);
				if (o.$$typeof === S) return b(e, r, Qi(e, o), c);
				Ma(e, o);
			}
			return typeof o == "string" && o !== "" || typeof o == "number" || typeof o == "bigint" ? (o = "" + o, r !== null && r.tag === 6 ? (n(e, r.sibling), c = a(r, o), c.return = e, e = c) : (n(e, r), c = di(o, e.mode, c), c.return = e, e = c), s(e)) : n(e, r);
		}
		return function(e, t, n, r) {
			try {
				ka = 0;
				var i = b(e, t, n, r);
				return Oa = null, i;
			} catch (t) {
				if (t === va || t === ba) throw t;
				var a = ai(29, t, null, e.mode);
				return a.lanes = r, a.return = e, a;
			}
		};
	}
	var Pa = Na(!0), Fa = Na(!1), Ia = !1;
	function La(e) {
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
	function Ra(e, t) {
		e = e.updateQueue, t.updateQueue === e && (t.updateQueue = {
			baseState: e.baseState,
			firstBaseUpdate: e.firstBaseUpdate,
			lastBaseUpdate: e.lastBaseUpdate,
			shared: e.shared,
			callbacks: null
		});
	}
	function za(e) {
		return {
			lane: e,
			tag: 0,
			payload: null,
			callback: null,
			next: null
		};
	}
	function Ba(e, t, n) {
		var r = e.updateQueue;
		if (r === null) return null;
		if (r = r.shared, K & 2) {
			var i = r.pending;
			return i === null ? t.next = t : (t.next = i.next, i.next = t), r.pending = t, t = ni(e), ti(e, null, n), t;
		}
		return Qr(e, r, t, n), ni(e);
	}
	function Va(e, t, n) {
		if (t = t.updateQueue, t !== null && (t = t.shared, n & 4194048)) {
			var r = t.lanes;
			r &= e.pendingLanes, n |= r, t.lanes = n, rt(e, n);
		}
	}
	function Ha(e, t) {
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
	var Ua = !1;
	function Wa() {
		if (Ua) {
			var e = la;
			if (e !== null) throw e;
		}
	}
	function Ga(e, t, n, r) {
		Ua = !1;
		var i = e.updateQueue;
		Ia = !1;
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
				if (p ? (Y & f) === f : (r & f) === f) {
					f !== 0 && f === ca && (Ua = !0), u !== null && (u = u.next = {
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
							case 2: Ia = !0;
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
	function Ka(e, t) {
		if (typeof e != "function") throw Error(i(191, e));
		e.call(t);
	}
	function qa(e, t) {
		var n = e.callbacks;
		if (n !== null) for (e.callbacks = null, e = 0; e < n.length; e++) Ka(n[e], t);
	}
	var Ja = de(null), Ya = de(0);
	function Xa(e, t) {
		e = Ul, j(Ya, e), j(Ja, t), Ul = e | t.baseLanes;
	}
	function Za() {
		j(Ya, Ul), j(Ja, Ja.current);
	}
	function Qa() {
		Ul = Ya.current, A(Ja), A(Ya);
	}
	var $a = de(null), eo = null;
	function to(e) {
		var t = e.alternate;
		j(oo, oo.current & 1), j($a, e), eo === null && (t === null || Ja.current !== null || t.memoizedState !== null) && (eo = e);
	}
	function no(e) {
		j(oo, oo.current), j($a, e), eo === null && (eo = e);
	}
	function ro(e) {
		e.tag === 22 ? (j(oo, oo.current), j($a, e), eo === null && (eo = e)) : io(e);
	}
	function io() {
		j(oo, oo.current), j($a, $a.current);
	}
	function ao(e) {
		A($a), eo === e && (eo = null), A(oo);
	}
	var oo = de(0);
	function so(e) {
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
	var co = 0, W = null, G = null, lo = null, uo = !1, fo = !1, po = !1, mo = 0, ho = 0, go = null, _o = 0;
	function vo() {
		throw Error(i(321));
	}
	function yo(e, t) {
		if (t === null) return !1;
		for (var n = 0; n < t.length && n < e.length; n++) if (!yr(e[n], t[n])) return !1;
		return !0;
	}
	function bo(e, t, n, r, i, a) {
		return co = a, W = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, O.H = e === null || e.memoizedState === null ? Ls : Rs, po = !1, a = n(r, i), po = !1, fo && (a = So(t, n, r, i)), xo(e), a;
	}
	function xo(e) {
		O.H = Is;
		var t = G !== null && G.next !== null;
		if (co = 0, lo = G = W = null, uo = !1, ho = 0, go = null, t) throw Error(i(300));
		e === null || tc || (e = e.dependencies, e !== null && Yi(e) && (tc = !0));
	}
	function So(e, t, n, r) {
		W = e;
		var a = 0;
		do {
			if (fo && (go = null), ho = 0, fo = !1, 25 <= a) throw Error(i(301));
			if (a += 1, lo = G = null, e.updateQueue != null) {
				var o = e.updateQueue;
				o.lastEffect = null, o.events = null, o.stores = null, o.memoCache != null && (o.memoCache.index = 0);
			}
			O.H = zs, o = t(n, r);
		} while (fo);
		return o;
	}
	function Co() {
		var e = O.H, t = e.useState()[0];
		return t = typeof t.then == "function" ? Ao(t) : t, e = e.useState()[0], (G === null ? null : G.memoizedState) !== e && (W.flags |= 1024), t;
	}
	function wo() {
		var e = mo !== 0;
		return mo = 0, e;
	}
	function To(e, t, n) {
		t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~n;
	}
	function Eo(e) {
		if (uo) {
			for (e = e.memoizedState; e !== null;) {
				var t = e.queue;
				t !== null && (t.pending = null), e = e.next;
			}
			uo = !1;
		}
		co = 0, lo = G = W = null, fo = !1, ho = mo = 0, go = null;
	}
	function Do() {
		var e = {
			memoizedState: null,
			baseState: null,
			baseQueue: null,
			queue: null,
			next: null
		};
		return lo === null ? W.memoizedState = lo = e : lo = lo.next = e, lo;
	}
	function Oo() {
		if (G === null) {
			var e = W.alternate;
			e = e === null ? null : e.memoizedState;
		} else e = G.next;
		var t = lo === null ? W.memoizedState : lo.next;
		if (t !== null) lo = t, G = e;
		else {
			if (e === null) throw W.alternate === null ? Error(i(467)) : Error(i(310));
			G = e, e = {
				memoizedState: G.memoizedState,
				baseState: G.baseState,
				baseQueue: G.baseQueue,
				queue: G.queue,
				next: null
			}, lo === null ? W.memoizedState = lo = e : lo = lo.next = e;
		}
		return lo;
	}
	function ko() {
		return {
			lastEffect: null,
			events: null,
			stores: null,
			memoCache: null
		};
	}
	function Ao(e) {
		var t = ho;
		return ho += 1, go === null && (go = []), e = Ca(go, e, t), t = W, (lo === null ? t.memoizedState : lo.next) === null && (t = t.alternate, O.H = t === null || t.memoizedState === null ? Ls : Rs), e;
	}
	function jo(e) {
		if (typeof e == "object" && e) {
			if (typeof e.then == "function") return Ao(e);
			if (e.$$typeof === S) return Zi(e);
		}
		throw Error(i(438, String(e)));
	}
	function Mo(e) {
		var t = null, n = W.updateQueue;
		if (n !== null && (t = n.memoCache), t == null) {
			var r = W.alternate;
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
		}, n === null && (n = ko(), W.updateQueue = n), n.memoCache = t, n = t.data[t.index], n === void 0) for (n = t.data[t.index] = Array(e), r = 0; r < e; r++) n[r] = re;
		return t.index++, n;
	}
	function No(e, t) {
		return typeof t == "function" ? t(e) : t;
	}
	function Po(e) {
		return Fo(Oo(), G, e);
	}
	function Fo(e, t, n) {
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
				if (f === u.lane ? (co & f) === f : (Y & f) === f) {
					var p = u.revertLane;
					if (p === 0) l !== null && (l = l.next = {
						lane: 0,
						revertLane: 0,
						gesture: null,
						action: u.action,
						hasEagerState: u.hasEagerState,
						eagerState: u.eagerState,
						next: null
					}), f === ca && (d = !0);
					else if ((co & p) === p) {
						u = u.next, p === ca && (d = !0);
						continue;
					} else f = {
						lane: 0,
						revertLane: u.revertLane,
						gesture: null,
						action: u.action,
						hasEagerState: u.hasEagerState,
						eagerState: u.eagerState,
						next: null
					}, l === null ? (c = l = f, s = o) : l = l.next = f, W.lanes |= p, Gl |= p;
					f = u.action, po && n(o, f), o = u.hasEagerState ? u.eagerState : n(o, f);
				} else p = {
					lane: f,
					revertLane: u.revertLane,
					gesture: u.gesture,
					action: u.action,
					hasEagerState: u.hasEagerState,
					eagerState: u.eagerState,
					next: null
				}, l === null ? (c = l = p, s = o) : l = l.next = p, W.lanes |= f, Gl |= f;
				u = u.next;
			} while (u !== null && u !== t);
			if (l === null ? s = o : l.next = c, !yr(o, e.memoizedState) && (tc = !0, d && (n = la, n !== null))) throw n;
			e.memoizedState = o, e.baseState = s, e.baseQueue = l, r.lastRenderedState = o;
		}
		return a === null && (r.lanes = 0), [e.memoizedState, r.dispatch];
	}
	function Io(e) {
		var t = Oo(), n = t.queue;
		if (n === null) throw Error(i(311));
		n.lastRenderedReducer = e;
		var r = n.dispatch, a = n.pending, o = t.memoizedState;
		if (a !== null) {
			n.pending = null;
			var s = a = a.next;
			do
				o = e(o, s.action), s = s.next;
			while (s !== a);
			yr(o, t.memoizedState) || (tc = !0), t.memoizedState = o, t.baseQueue === null && (t.baseState = o), n.lastRenderedState = o;
		}
		return [o, r];
	}
	function Lo(e, t, n) {
		var r = W, a = Oo(), o = U;
		if (o) {
			if (n === void 0) throw Error(i(407));
			n = n();
		} else n = t();
		var s = !yr((G || a).memoizedState, n);
		if (s && (a.memoizedState = n, tc = !0), a = a.queue, cs(Bo.bind(null, r, a, e), [e]), a.getSnapshot !== t || s || lo !== null && lo.memoizedState.tag & 1) {
			if (r.flags |= 2048, rs(9, { destroy: void 0 }, zo.bind(null, r, a, n, t), null), q === null) throw Error(i(349));
			o || co & 127 || Ro(r, t, n);
		}
		return n;
	}
	function Ro(e, t, n) {
		e.flags |= 16384, e = {
			getSnapshot: t,
			value: n
		}, t = W.updateQueue, t === null ? (t = ko(), W.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
	}
	function zo(e, t, n, r) {
		t.value = n, t.getSnapshot = r, Vo(t) && Ho(e);
	}
	function Bo(e, t, n) {
		return n(function() {
			Vo(t) && Ho(e);
		});
	}
	function Vo(e) {
		var t = e.getSnapshot;
		e = e.value;
		try {
			var n = t();
			return !yr(e, n);
		} catch {
			return !0;
		}
	}
	function Ho(e) {
		var t = ei(e, 2);
		t !== null && hu(t, e, 2);
	}
	function Uo(e) {
		var t = Do();
		if (typeof e == "function") {
			var n = e;
			if (e = n(), po) {
				He(!0);
				try {
					n();
				} finally {
					He(!1);
				}
			}
		}
		return t.memoizedState = t.baseState = e, t.queue = {
			pending: null,
			lanes: 0,
			dispatch: null,
			lastRenderedReducer: No,
			lastRenderedState: e
		}, t;
	}
	function Wo(e, t, n, r) {
		return e.baseState = n, Fo(e, G, typeof r == "function" ? r : No);
	}
	function Go(e, t, n, r, a) {
		if (Ns(e)) throw Error(i(485));
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
			O.T === null ? o.isTransition = !1 : n(!0), r(o), n = t.pending, n === null ? (o.next = t.pending = o, Ko(t, o)) : (o.next = n.next, t.pending = n.next = o);
		}
	}
	function Ko(e, t) {
		var n = t.action, r = t.payload, i = e.state;
		if (t.isTransition) {
			var a = O.T, o = {};
			O.T = o;
			try {
				var s = n(i, r), c = O.S;
				c !== null && c(o, s), qo(e, t, s);
			} catch (n) {
				Yo(e, t, n);
			} finally {
				a !== null && o.types !== null && (a.types = o.types), O.T = a;
			}
		} else try {
			a = n(i, r), qo(e, t, a);
		} catch (n) {
			Yo(e, t, n);
		}
	}
	function qo(e, t, n) {
		typeof n == "object" && n && typeof n.then == "function" ? n.then(function(n) {
			Jo(e, t, n);
		}, function(n) {
			return Yo(e, t, n);
		}) : Jo(e, t, n);
	}
	function Jo(e, t, n) {
		t.status = "fulfilled", t.value = n, Xo(t), e.state = n, t = e.pending, t !== null && (n = t.next, n === t ? e.pending = null : (n = n.next, t.next = n, Ko(e, n)));
	}
	function Yo(e, t, n) {
		var r = e.pending;
		if (e.pending = null, r !== null) {
			r = r.next;
			do
				t.status = "rejected", t.reason = n, Xo(t), t = t.next;
			while (t !== r);
		}
		e.action = null;
	}
	function Xo(e) {
		e = e.listeners;
		for (var t = 0; t < e.length; t++) (0, e[t])();
	}
	function Zo(e, t) {
		return t;
	}
	function Qo(e, t) {
		if (U) {
			var n = q.formState;
			if (n !== null) {
				a: {
					var r = W;
					if (U) {
						if (H) {
							b: {
								for (var i = H, a = Mi; i.nodeType !== 8;) {
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
								H = cf(i.nextSibling), r = i.data === "F!";
								break a;
							}
						}
						Pi(r);
					}
					r = !1;
				}
				r && (t = n[0]);
			}
		}
		return n = Do(), n.memoizedState = n.baseState = t, r = {
			pending: null,
			lanes: 0,
			dispatch: null,
			lastRenderedReducer: Zo,
			lastRenderedState: t
		}, n.queue = r, n = As.bind(null, W, r), r.dispatch = n, r = Uo(!1), a = Ms.bind(null, W, !1, r.queue), r = Do(), i = {
			state: t,
			dispatch: null,
			action: e,
			pending: null
		}, r.queue = i, n = Go.bind(null, W, i, a, n), i.dispatch = n, r.memoizedState = e, [
			t,
			n,
			!1
		];
	}
	function $o(e) {
		return es(Oo(), G, e);
	}
	function es(e, t, n) {
		if (t = Fo(e, t, Zo)[0], e = Po(No)[0], typeof t == "object" && t && typeof t.then == "function") try {
			var r = Ao(t);
		} catch (e) {
			throw e === va ? ba : e;
		}
		else r = t;
		t = Oo();
		var i = t.queue, a = i.dispatch;
		return n !== t.memoizedState && (W.flags |= 2048, rs(9, { destroy: void 0 }, ts.bind(null, i, n), null)), [
			r,
			a,
			e
		];
	}
	function ts(e, t) {
		e.action = t;
	}
	function ns(e) {
		var t = Oo(), n = G;
		if (n !== null) return es(t, n, e);
		Oo(), t = t.memoizedState, n = Oo();
		var r = n.queue.dispatch;
		return n.memoizedState = e, [
			t,
			r,
			!1
		];
	}
	function rs(e, t, n, r) {
		return e = {
			tag: e,
			create: n,
			deps: r,
			inst: t,
			next: null
		}, t = W.updateQueue, t === null && (t = ko(), W.updateQueue = t), n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e), e;
	}
	function is() {
		return Oo().memoizedState;
	}
	function as(e, t, n, r) {
		var i = Do();
		W.flags |= e, i.memoizedState = rs(1 | t, { destroy: void 0 }, n, r === void 0 ? null : r);
	}
	function os(e, t, n, r) {
		var i = Oo();
		r = r === void 0 ? null : r;
		var a = i.memoizedState.inst;
		G !== null && r !== null && yo(r, G.memoizedState.deps) ? i.memoizedState = rs(t, a, n, r) : (W.flags |= e, i.memoizedState = rs(1 | t, a, n, r));
	}
	function ss(e, t) {
		as(8390656, 8, e, t);
	}
	function cs(e, t) {
		os(2048, 8, e, t);
	}
	function ls(e) {
		W.flags |= 4;
		var t = W.updateQueue;
		if (t === null) t = ko(), W.updateQueue = t, t.events = [e];
		else {
			var n = t.events;
			n === null ? t.events = [e] : n.push(e);
		}
	}
	function us(e) {
		var t = Oo().memoizedState;
		return ls({
			ref: t,
			nextImpl: e
		}), function() {
			if (K & 2) throw Error(i(440));
			return t.impl.apply(void 0, arguments);
		};
	}
	function ds(e, t) {
		return os(4, 2, e, t);
	}
	function fs(e, t) {
		return os(4, 4, e, t);
	}
	function ps(e, t) {
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
	function ms(e, t, n) {
		n = n == null ? null : n.concat([e]), os(4, 4, ps.bind(null, t, e), n);
	}
	function hs() {}
	function gs(e, t) {
		var n = Oo();
		t = t === void 0 ? null : t;
		var r = n.memoizedState;
		return t !== null && yo(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e);
	}
	function _s(e, t) {
		var n = Oo();
		t = t === void 0 ? null : t;
		var r = n.memoizedState;
		if (t !== null && yo(t, r[1])) return r[0];
		if (r = e(), po) {
			He(!0);
			try {
				e();
			} finally {
				He(!1);
			}
		}
		return n.memoizedState = [r, t], r;
	}
	function vs(e, t, n) {
		return n === void 0 || co & 1073741824 && !(Y & 261930) ? e.memoizedState = t : (e.memoizedState = n, e = mu(), W.lanes |= e, Gl |= e, n);
	}
	function ys(e, t, n, r) {
		return yr(n, t) ? n : Ja.current === null ? !(co & 42) || co & 1073741824 && !(Y & 261930) ? (tc = !0, e.memoizedState = n) : (e = mu(), W.lanes |= e, Gl |= e, t) : (e = vs(e, n, r), yr(e, t) || (tc = !0), e);
	}
	function bs(e, t, n, r, i) {
		var a = k.p;
		k.p = a !== 0 && 8 > a ? a : 8;
		var o = O.T, s = {};
		O.T = s, Ms(e, !1, t, n);
		try {
			var c = i(), l = O.S;
			l !== null && l(s, c), typeof c == "object" && c && typeof c.then == "function" ? js(e, t, fa(c, r), pu(e)) : js(e, t, r, pu(e));
		} catch (n) {
			js(e, t, {
				then: function() {},
				status: "rejected",
				reason: n
			}, pu());
		} finally {
			k.p = a, o !== null && s.types !== null && (o.types = s.types), O.T = o;
		}
	}
	function xs() {}
	function Ss(e, t, n, r) {
		if (e.tag !== 5) throw Error(i(476));
		var a = Cs(e).queue;
		bs(e, a, t, ce, n === null ? xs : function() {
			return ws(e), n(r);
		});
	}
	function Cs(e) {
		var t = e.memoizedState;
		if (t !== null) return t;
		t = {
			memoizedState: ce,
			baseState: ce,
			baseQueue: null,
			queue: {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: No,
				lastRenderedState: ce
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
				lastRenderedReducer: No,
				lastRenderedState: n
			},
			next: null
		}, e.memoizedState = t, e = e.alternate, e !== null && (e.memoizedState = t), t;
	}
	function ws(e) {
		var t = Cs(e);
		t.next === null && (t = e.alternate.memoizedState), js(e, t.next.queue, {}, pu());
	}
	function Ts() {
		return Zi(Qf);
	}
	function Es() {
		return Oo().memoizedState;
	}
	function Ds() {
		return Oo().memoizedState;
	}
	function Os(e) {
		for (var t = e.return; t !== null;) {
			switch (t.tag) {
				case 24:
				case 3:
					var n = pu();
					e = za(n);
					var r = Ba(t, e, n);
					r !== null && (hu(r, t, n), Va(r, t, n)), t = { cache: ia() }, e.payload = t;
					return;
			}
			t = t.return;
		}
	}
	function ks(e, t, n) {
		var r = pu();
		n = {
			lane: r,
			revertLane: 0,
			gesture: null,
			action: n,
			hasEagerState: !1,
			eagerState: null,
			next: null
		}, Ns(e) ? Ps(t, n) : (n = $r(e, t, n, r), n !== null && (hu(n, e, r), Fs(n, t, r)));
	}
	function As(e, t, n) {
		js(e, t, n, pu());
	}
	function js(e, t, n, r) {
		var i = {
			lane: r,
			revertLane: 0,
			gesture: null,
			action: n,
			hasEagerState: !1,
			eagerState: null,
			next: null
		};
		if (Ns(e)) Ps(t, i);
		else {
			var a = e.alternate;
			if (e.lanes === 0 && (a === null || a.lanes === 0) && (a = t.lastRenderedReducer, a !== null)) try {
				var o = t.lastRenderedState, s = a(o, n);
				if (i.hasEagerState = !0, i.eagerState = s, yr(s, o)) return Qr(e, t, i, 0), q === null && Zr(), !1;
			} catch {}
			if (n = $r(e, t, i, r), n !== null) return hu(n, e, r), Fs(n, t, r), !0;
		}
		return !1;
	}
	function Ms(e, t, n, r) {
		if (r = {
			lane: 2,
			revertLane: dd(),
			gesture: null,
			action: r,
			hasEagerState: !1,
			eagerState: null,
			next: null
		}, Ns(e)) {
			if (t) throw Error(i(479));
		} else t = $r(e, n, r, 2), t !== null && hu(t, e, 2);
	}
	function Ns(e) {
		var t = e.alternate;
		return e === W || t !== null && t === W;
	}
	function Ps(e, t) {
		fo = uo = !0;
		var n = e.pending;
		n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
	}
	function Fs(e, t, n) {
		if (n & 4194048) {
			var r = t.lanes;
			r &= e.pendingLanes, n |= r, t.lanes = n, rt(e, n);
		}
	}
	var Is = {
		readContext: Zi,
		use: jo,
		useCallback: vo,
		useContext: vo,
		useEffect: vo,
		useImperativeHandle: vo,
		useLayoutEffect: vo,
		useInsertionEffect: vo,
		useMemo: vo,
		useReducer: vo,
		useRef: vo,
		useState: vo,
		useDebugValue: vo,
		useDeferredValue: vo,
		useTransition: vo,
		useSyncExternalStore: vo,
		useId: vo,
		useHostTransitionStatus: vo,
		useFormState: vo,
		useActionState: vo,
		useOptimistic: vo,
		useMemoCache: vo,
		useCacheRefresh: vo
	};
	Is.useEffectEvent = vo;
	var Ls = {
		readContext: Zi,
		use: jo,
		useCallback: function(e, t) {
			return Do().memoizedState = [e, t === void 0 ? null : t], e;
		},
		useContext: Zi,
		useEffect: ss,
		useImperativeHandle: function(e, t, n) {
			n = n == null ? null : n.concat([e]), as(4194308, 4, ps.bind(null, t, e), n);
		},
		useLayoutEffect: function(e, t) {
			return as(4194308, 4, e, t);
		},
		useInsertionEffect: function(e, t) {
			as(4, 2, e, t);
		},
		useMemo: function(e, t) {
			var n = Do();
			t = t === void 0 ? null : t;
			var r = e();
			if (po) {
				He(!0);
				try {
					e();
				} finally {
					He(!1);
				}
			}
			return n.memoizedState = [r, t], r;
		},
		useReducer: function(e, t, n) {
			var r = Do();
			if (n !== void 0) {
				var i = n(t);
				if (po) {
					He(!0);
					try {
						n(t);
					} finally {
						He(!1);
					}
				}
			} else i = t;
			return r.memoizedState = r.baseState = i, e = {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: e,
				lastRenderedState: i
			}, r.queue = e, e = e.dispatch = ks.bind(null, W, e), [r.memoizedState, e];
		},
		useRef: function(e) {
			var t = Do();
			return e = { current: e }, t.memoizedState = e;
		},
		useState: function(e) {
			e = Uo(e);
			var t = e.queue, n = As.bind(null, W, t);
			return t.dispatch = n, [e.memoizedState, n];
		},
		useDebugValue: hs,
		useDeferredValue: function(e, t) {
			return vs(Do(), e, t);
		},
		useTransition: function() {
			var e = Uo(!1);
			return e = bs.bind(null, W, e.queue, !0, !1), Do().memoizedState = e, [!1, e];
		},
		useSyncExternalStore: function(e, t, n) {
			var r = W, a = Do();
			if (U) {
				if (n === void 0) throw Error(i(407));
				n = n();
			} else {
				if (n = t(), q === null) throw Error(i(349));
				Y & 127 || Ro(r, t, n);
			}
			a.memoizedState = n;
			var o = {
				value: n,
				getSnapshot: t
			};
			return a.queue = o, ss(Bo.bind(null, r, o, e), [e]), r.flags |= 2048, rs(9, { destroy: void 0 }, zo.bind(null, r, o, n, t), null), n;
		},
		useId: function() {
			var e = Do(), t = q.identifierPrefix;
			if (U) {
				var n = wi, r = Ci;
				n = (r & ~(1 << 32 - Ue(r) - 1)).toString(32) + n, t = "_" + t + "R_" + n, n = mo++, 0 < n && (t += "H" + n.toString(32)), t += "_";
			} else n = _o++, t = "_" + t + "r_" + n.toString(32) + "_";
			return e.memoizedState = t;
		},
		useHostTransitionStatus: Ts,
		useFormState: Qo,
		useActionState: Qo,
		useOptimistic: function(e) {
			var t = Do();
			t.memoizedState = t.baseState = e;
			var n = {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: null,
				lastRenderedState: null
			};
			return t.queue = n, t = Ms.bind(null, W, !0, n), n.dispatch = t, [e, t];
		},
		useMemoCache: Mo,
		useCacheRefresh: function() {
			return Do().memoizedState = Os.bind(null, W);
		},
		useEffectEvent: function(e) {
			var t = Do(), n = { impl: e };
			return t.memoizedState = n, function() {
				if (K & 2) throw Error(i(440));
				return n.impl.apply(void 0, arguments);
			};
		}
	}, Rs = {
		readContext: Zi,
		use: jo,
		useCallback: gs,
		useContext: Zi,
		useEffect: cs,
		useImperativeHandle: ms,
		useInsertionEffect: ds,
		useLayoutEffect: fs,
		useMemo: _s,
		useReducer: Po,
		useRef: is,
		useState: function() {
			return Po(No);
		},
		useDebugValue: hs,
		useDeferredValue: function(e, t) {
			return ys(Oo(), G.memoizedState, e, t);
		},
		useTransition: function() {
			var e = Po(No)[0], t = Oo().memoizedState;
			return [typeof e == "boolean" ? e : Ao(e), t];
		},
		useSyncExternalStore: Lo,
		useId: Es,
		useHostTransitionStatus: Ts,
		useFormState: $o,
		useActionState: $o,
		useOptimistic: function(e, t) {
			return Wo(Oo(), G, e, t);
		},
		useMemoCache: Mo,
		useCacheRefresh: Ds
	};
	Rs.useEffectEvent = us;
	var zs = {
		readContext: Zi,
		use: jo,
		useCallback: gs,
		useContext: Zi,
		useEffect: cs,
		useImperativeHandle: ms,
		useInsertionEffect: ds,
		useLayoutEffect: fs,
		useMemo: _s,
		useReducer: Io,
		useRef: is,
		useState: function() {
			return Io(No);
		},
		useDebugValue: hs,
		useDeferredValue: function(e, t) {
			var n = Oo();
			return G === null ? vs(n, e, t) : ys(n, G.memoizedState, e, t);
		},
		useTransition: function() {
			var e = Io(No)[0], t = Oo().memoizedState;
			return [typeof e == "boolean" ? e : Ao(e), t];
		},
		useSyncExternalStore: Lo,
		useId: Es,
		useHostTransitionStatus: Ts,
		useFormState: ns,
		useActionState: ns,
		useOptimistic: function(e, t) {
			var n = Oo();
			return G === null ? (n.baseState = e, [e, n.queue.dispatch]) : Wo(n, G, e, t);
		},
		useMemoCache: Mo,
		useCacheRefresh: Ds
	};
	zs.useEffectEvent = us;
	function Bs(e, t, n, r) {
		t = e.memoizedState, n = n(r, t), n = n == null ? t : h({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
	}
	var Vs = {
		enqueueSetState: function(e, t, n) {
			e = e._reactInternals;
			var r = pu(), i = za(r);
			i.payload = t, n != null && (i.callback = n), t = Ba(e, i, r), t !== null && (hu(t, e, r), Va(t, e, r));
		},
		enqueueReplaceState: function(e, t, n) {
			e = e._reactInternals;
			var r = pu(), i = za(r);
			i.tag = 1, i.payload = t, n != null && (i.callback = n), t = Ba(e, i, r), t !== null && (hu(t, e, r), Va(t, e, r));
		},
		enqueueForceUpdate: function(e, t) {
			e = e._reactInternals;
			var n = pu(), r = za(n);
			r.tag = 2, t != null && (r.callback = t), t = Ba(e, r, n), t !== null && (hu(t, e, n), Va(t, e, n));
		}
	};
	function Hs(e, t, n, r, i, a, o) {
		return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, a, o) : t.prototype && t.prototype.isPureReactComponent ? !br(n, r) || !br(i, a) : !0;
	}
	function Us(e, t, n, r) {
		e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== e && Vs.enqueueReplaceState(t, t.state, null);
	}
	function Ws(e, t) {
		var n = t;
		if ("ref" in t) for (var r in n = {}, t) r !== "ref" && (n[r] = t[r]);
		if (e = e.defaultProps) for (var i in n === t && (n = h({}, n)), e) n[i] === void 0 && (n[i] = e[i]);
		return n;
	}
	function Gs(e) {
		qr(e);
	}
	function Ks(e) {
		console.error(e);
	}
	function qs(e) {
		qr(e);
	}
	function Js(e, t) {
		try {
			var n = e.onUncaughtError;
			n(t.value, { componentStack: t.stack });
		} catch (e) {
			setTimeout(function() {
				throw e;
			});
		}
	}
	function Ys(e, t, n) {
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
	function Xs(e, t, n) {
		return n = za(n), n.tag = 3, n.payload = { element: null }, n.callback = function() {
			Js(e, t);
		}, n;
	}
	function Zs(e) {
		return e = za(e), e.tag = 3, e;
	}
	function Qs(e, t, n, r) {
		var i = n.type.getDerivedStateFromError;
		if (typeof i == "function") {
			var a = r.value;
			e.payload = function() {
				return i(a);
			}, e.callback = function() {
				Ys(t, n, r);
			};
		}
		var o = n.stateNode;
		o !== null && typeof o.componentDidCatch == "function" && (e.callback = function() {
			Ys(t, n, r), typeof i != "function" && (ru === null ? ru = new Set([this]) : ru.add(this));
			var e = r.stack;
			this.componentDidCatch(r.value, { componentStack: e === null ? "" : e });
		});
	}
	function $s(e, t, n, r, a) {
		if (n.flags |= 32768, typeof r == "object" && r && typeof r.then == "function") {
			if (t = n.alternate, t !== null && Ji(t, n, a, !0), n = $a.current, n !== null) {
				switch (n.tag) {
					case 31:
					case 13: return eo === null ? Du() : n.alternate === null && Wl === 0 && (Wl = 3), n.flags &= -257, n.flags |= 65536, n.lanes = a, r === xa ? n.flags |= 16384 : (t = n.updateQueue, t === null ? n.updateQueue = new Set([r]) : t.add(r), Gu(e, r, a)), !1;
					case 22: return n.flags |= 65536, r === xa ? n.flags |= 16384 : (t = n.updateQueue, t === null ? (t = {
						transitions: null,
						markerInstances: null,
						retryQueue: new Set([r])
					}, n.updateQueue = t) : (n = t.retryQueue, n === null ? t.retryQueue = new Set([r]) : n.add(r)), Gu(e, r, a)), !1;
				}
				throw Error(i(435, n.tag));
			}
			return Gu(e, r, a), Du(), !1;
		}
		if (U) return t = $a.current, t === null ? (r !== Ni && (t = Error(i(423), { cause: r }), Bi(hi(t, n))), e = e.current.alternate, e.flags |= 65536, a &= -a, e.lanes |= a, r = hi(r, n), a = Xs(e.stateNode, r, a), Ha(e, a), Wl !== 4 && (Wl = 2)) : (!(t.flags & 65536) && (t.flags |= 256), t.flags |= 65536, t.lanes = a, r !== Ni && (e = Error(i(422), { cause: r }), Bi(hi(e, n)))), !1;
		var o = Error(i(520), { cause: r });
		if (o = hi(o, n), Xl === null ? Xl = [o] : Xl.push(o), Wl !== 4 && (Wl = 2), t === null) return !0;
		r = hi(r, n), n = t;
		do {
			switch (n.tag) {
				case 3: return n.flags |= 65536, e = a & -a, n.lanes |= e, e = Xs(n.stateNode, r, e), Ha(n, e), !1;
				case 1: if (t = n.type, o = n.stateNode, !(n.flags & 128) && (typeof t.getDerivedStateFromError == "function" || o !== null && typeof o.componentDidCatch == "function" && (ru === null || !ru.has(o)))) return n.flags |= 65536, a &= -a, n.lanes |= a, a = Zs(a), Qs(a, e, n, r), Ha(n, a), !1;
			}
			n = n.return;
		} while (n !== null);
		return !1;
	}
	var ec = Error(i(461)), tc = !1;
	function nc(e, t, n, r) {
		t.child = e === null ? Fa(t, null, n, r) : Pa(t, e.child, n, r);
	}
	function rc(e, t, n, r, i) {
		n = n.render;
		var a = t.ref;
		if ("ref" in r) {
			var o = {};
			for (var s in r) s !== "ref" && (o[s] = r[s]);
		} else o = r;
		return Xi(t), r = bo(e, t, n, o, a, i), s = wo(), e !== null && !tc ? (To(e, t, i), Dc(e, t, i)) : (U && s && Di(t), t.flags |= 1, nc(e, t, r, i), t.child);
	}
	function ic(e, t, n, r, i) {
		if (e === null) {
			var a = n.type;
			return typeof a == "function" && !oi(a) && a.defaultProps === void 0 && n.compare === null ? (t.tag = 15, t.type = a, ac(e, t, a, r, i)) : (e = li(n.type, null, r, t, t.mode, i), e.ref = t.ref, e.return = t, t.child = e);
		}
		if (a = e.child, !Oc(e, i)) {
			var o = a.memoizedProps;
			if (n = n.compare, n = n === null ? br : n, n(o, r) && e.ref === t.ref) return Dc(e, t, i);
		}
		return t.flags |= 1, e = si(a, r), e.ref = t.ref, e.return = t, t.child = e;
	}
	function ac(e, t, n, r, i) {
		if (e !== null) {
			var a = e.memoizedProps;
			if (br(a, r) && e.ref === t.ref) if (tc = !1, t.pendingProps = r = a, Oc(e, i)) e.flags & 131072 && (tc = !0);
			else return t.lanes = e.lanes, Dc(e, t, i);
		}
		return pc(e, t, n, r, i);
	}
	function oc(e, t, n, r) {
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
				return cc(e, t, a, n, r);
			}
			if (n & 536870912) t.memoizedState = {
				baseLanes: 0,
				cachePool: null
			}, e !== null && ga(t, a === null ? null : a.cachePool), a === null ? Za() : Xa(t, a), ro(t);
			else return r = t.lanes = 536870912, cc(e, t, a === null ? n : a.baseLanes | n, n, r);
		} else a === null ? (e !== null && ga(t, null), Za(), io(t)) : (ga(t, a.cachePool), Xa(t, a), io(t), t.memoizedState = null);
		return nc(e, t, i, n), t.child;
	}
	function sc(e, t) {
		return e !== null && e.tag === 22 || t.stateNode !== null || (t.stateNode = {
			_visibility: 1,
			_pendingMarkers: null,
			_retryCache: null,
			_transitions: null
		}), t.sibling;
	}
	function cc(e, t, n, r, i) {
		var a = ha();
		return a = a === null ? null : {
			parent: ra._currentValue,
			pool: a
		}, t.memoizedState = {
			baseLanes: n,
			cachePool: a
		}, e !== null && ga(t, null), Za(), ro(t), e !== null && Ji(e, t, r, !0), t.childLanes = i, null;
	}
	function lc(e, t) {
		return t = Sc({
			mode: t.mode,
			children: t.children
		}, e.mode), t.ref = e.ref, e.child = t, t.return = e, t;
	}
	function uc(e, t, n) {
		return Pa(t, e.child, null, n), e = lc(t, t.pendingProps), e.flags |= 2, ao(t), t.memoizedState = null, e;
	}
	function dc(e, t, n) {
		var r = t.pendingProps, a = (t.flags & 128) != 0;
		if (t.flags &= -129, e === null) {
			if (U) {
				if (r.mode === "hidden") return e = lc(t, r), t.lanes = 536870912, sc(null, e);
				if (no(t), (e = H) ? (e = rf(e, Mi), e = e !== null && e.data === "&" ? e : null, e !== null && (t.memoizedState = {
					dehydrated: e,
					treeContext: Si === null ? null : {
						id: Ci,
						overflow: wi
					},
					retryLane: 536870912,
					hydrationErrors: null
				}, n = fi(e), n.return = t, t.child = n, Ai = t, H = null)) : e = null, e === null) throw Pi(t);
				return t.lanes = 536870912, null;
			}
			return lc(t, r);
		}
		var o = e.memoizedState;
		if (o !== null) {
			var s = o.dehydrated;
			if (no(t), a) if (t.flags & 256) t.flags &= -257, t = uc(e, t, n);
			else if (t.memoizedState !== null) t.child = e.child, t.flags |= 128, t = null;
			else throw Error(i(558));
			else if (tc || Ji(e, t, n, !1), a = (n & e.childLanes) !== 0, tc || a) {
				if (r = q, r !== null && (s = it(r, n), s !== 0 && s !== o.retryLane)) throw o.retryLane = s, ei(e, s), hu(r, e, s), ec;
				Du(), t = uc(e, t, n);
			} else e = o.treeContext, H = cf(s.nextSibling), Ai = t, U = !0, ji = null, Mi = !1, e !== null && ki(t, e), t = lc(t, r), t.flags |= 4096;
			return t;
		}
		return e = si(e.child, {
			mode: r.mode,
			children: r.children
		}), e.ref = t.ref, t.child = e, e.return = t, e;
	}
	function fc(e, t) {
		var n = t.ref;
		if (n === null) e !== null && e.ref !== null && (t.flags |= 4194816);
		else {
			if (typeof n != "function" && typeof n != "object") throw Error(i(284));
			(e === null || e.ref !== n) && (t.flags |= 4194816);
		}
	}
	function pc(e, t, n, r, i) {
		return Xi(t), n = bo(e, t, n, r, void 0, i), r = wo(), e !== null && !tc ? (To(e, t, i), Dc(e, t, i)) : (U && r && Di(t), t.flags |= 1, nc(e, t, n, i), t.child);
	}
	function mc(e, t, n, r, i, a) {
		return Xi(t), t.updateQueue = null, n = So(t, r, n, i), xo(e), r = wo(), e !== null && !tc ? (To(e, t, a), Dc(e, t, a)) : (U && r && Di(t), t.flags |= 1, nc(e, t, n, a), t.child);
	}
	function hc(e, t, n, r, i) {
		if (Xi(t), t.stateNode === null) {
			var a = ri, o = n.contextType;
			typeof o == "object" && o && (a = Zi(o)), a = new n(r, a), t.memoizedState = a.state !== null && a.state !== void 0 ? a.state : null, a.updater = Vs, t.stateNode = a, a._reactInternals = t, a = t.stateNode, a.props = r, a.state = t.memoizedState, a.refs = {}, La(t), o = n.contextType, a.context = typeof o == "object" && o ? Zi(o) : ri, a.state = t.memoizedState, o = n.getDerivedStateFromProps, typeof o == "function" && (Bs(t, n, o, r), a.state = t.memoizedState), typeof n.getDerivedStateFromProps == "function" || typeof a.getSnapshotBeforeUpdate == "function" || typeof a.UNSAFE_componentWillMount != "function" && typeof a.componentWillMount != "function" || (o = a.state, typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount(), o !== a.state && Vs.enqueueReplaceState(a, a.state, null), Ga(t, r, a, i), Wa(), a.state = t.memoizedState), typeof a.componentDidMount == "function" && (t.flags |= 4194308), r = !0;
		} else if (e === null) {
			a = t.stateNode;
			var s = t.memoizedProps, c = Ws(n, s);
			a.props = c;
			var l = a.context, u = n.contextType;
			o = ri, typeof u == "object" && u && (o = Zi(u));
			var d = n.getDerivedStateFromProps;
			u = typeof d == "function" || typeof a.getSnapshotBeforeUpdate == "function", s = t.pendingProps !== s, u || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (s || l !== o) && Us(t, a, r, o), Ia = !1;
			var f = t.memoizedState;
			a.state = f, Ga(t, r, a, i), Wa(), l = t.memoizedState, s || f !== l || Ia ? (typeof d == "function" && (Bs(t, n, d, r), l = t.memoizedState), (c = Ia || Hs(t, n, c, r, f, l, o)) ? (u || typeof a.UNSAFE_componentWillMount != "function" && typeof a.componentWillMount != "function" || (typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount()), typeof a.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = r, t.memoizedState = l), a.props = r, a.state = l, a.context = o, r = c) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), r = !1);
		} else {
			a = t.stateNode, Ra(e, t), o = t.memoizedProps, u = Ws(n, o), a.props = u, d = t.pendingProps, f = a.context, l = n.contextType, c = ri, typeof l == "object" && l && (c = Zi(l)), s = n.getDerivedStateFromProps, (l = typeof s == "function" || typeof a.getSnapshotBeforeUpdate == "function") || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (o !== d || f !== c) && Us(t, a, r, c), Ia = !1, f = t.memoizedState, a.state = f, Ga(t, r, a, i), Wa();
			var p = t.memoizedState;
			o !== d || f !== p || Ia || e !== null && e.dependencies !== null && Yi(e.dependencies) ? (typeof s == "function" && (Bs(t, n, s, r), p = t.memoizedState), (u = Ia || Hs(t, n, u, r, f, p, c) || e !== null && e.dependencies !== null && Yi(e.dependencies)) ? (l || typeof a.UNSAFE_componentWillUpdate != "function" && typeof a.componentWillUpdate != "function" || (typeof a.componentWillUpdate == "function" && a.componentWillUpdate(r, p, c), typeof a.UNSAFE_componentWillUpdate == "function" && a.UNSAFE_componentWillUpdate(r, p, c)), typeof a.componentDidUpdate == "function" && (t.flags |= 4), typeof a.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof a.componentDidUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = p), a.props = r, a.state = p, a.context = c, r = u) : (typeof a.componentDidUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 1024), r = !1);
		}
		return a = r, fc(e, t), r = (t.flags & 128) != 0, a || r ? (a = t.stateNode, n = r && typeof n.getDerivedStateFromError != "function" ? null : a.render(), t.flags |= 1, e !== null && r ? (t.child = Pa(t, e.child, null, i), t.child = Pa(t, null, n, i)) : nc(e, t, n, i), t.memoizedState = a.state, e = t.child) : e = Dc(e, t, i), e;
	}
	function gc(e, t, n, r) {
		return Ri(), t.flags |= 256, nc(e, t, n, r), t.child;
	}
	var _c = {
		dehydrated: null,
		treeContext: null,
		retryLane: 0,
		hydrationErrors: null
	};
	function vc(e) {
		return {
			baseLanes: e,
			cachePool: _a()
		};
	}
	function yc(e, t, n) {
		return e = e === null ? 0 : e.childLanes & ~n, t && (e |= Jl), e;
	}
	function bc(e, t, n) {
		var r = t.pendingProps, a = !1, o = (t.flags & 128) != 0, s;
		if ((s = o) || (s = e !== null && e.memoizedState === null ? !1 : (oo.current & 2) != 0), s && (a = !0, t.flags &= -129), s = (t.flags & 32) != 0, t.flags &= -33, e === null) {
			if (U) {
				if (a ? to(t) : io(t), (e = H) ? (e = rf(e, Mi), e = e !== null && e.data !== "&" ? e : null, e !== null && (t.memoizedState = {
					dehydrated: e,
					treeContext: Si === null ? null : {
						id: Ci,
						overflow: wi
					},
					retryLane: 536870912,
					hydrationErrors: null
				}, n = fi(e), n.return = t, t.child = n, Ai = t, H = null)) : e = null, e === null) throw Pi(t);
				return of(e) ? t.lanes = 32 : t.lanes = 536870912, null;
			}
			var c = r.children;
			return r = r.fallback, a ? (io(t), a = t.mode, c = Sc({
				mode: "hidden",
				children: c
			}, a), r = ui(r, a, n, null), c.return = t, r.return = t, c.sibling = r, t.child = c, r = t.child, r.memoizedState = vc(n), r.childLanes = yc(e, s, n), t.memoizedState = _c, sc(null, r)) : (to(t), xc(t, c));
		}
		var l = e.memoizedState;
		if (l !== null && (c = l.dehydrated, c !== null)) {
			if (o) t.flags & 256 ? (to(t), t.flags &= -257, t = Cc(e, t, n)) : t.memoizedState === null ? (io(t), c = r.fallback, a = t.mode, r = Sc({
				mode: "visible",
				children: r.children
			}, a), c = ui(c, a, n, null), c.flags |= 2, r.return = t, c.return = t, r.sibling = c, t.child = r, Pa(t, e.child, null, n), r = t.child, r.memoizedState = vc(n), r.childLanes = yc(e, s, n), t.memoizedState = _c, t = sc(null, r)) : (io(t), t.child = e.child, t.flags |= 128, t = null);
			else if (to(t), of(c)) {
				if (s = c.nextSibling && c.nextSibling.dataset, s) var u = s.dgst;
				s = u, r = Error(i(419)), r.stack = "", r.digest = s, Bi({
					value: r,
					source: null,
					stack: null
				}), t = Cc(e, t, n);
			} else if (tc || Ji(e, t, n, !1), s = (n & e.childLanes) !== 0, tc || s) {
				if (s = q, s !== null && (r = it(s, n), r !== 0 && r !== l.retryLane)) throw l.retryLane = r, ei(e, r), hu(s, e, r), ec;
				af(c) || Du(), t = Cc(e, t, n);
			} else af(c) ? (t.flags |= 192, t.child = e.child, t = null) : (e = l.treeContext, H = cf(c.nextSibling), Ai = t, U = !0, ji = null, Mi = !1, e !== null && ki(t, e), t = xc(t, r.children), t.flags |= 4096);
			return t;
		}
		return a ? (io(t), c = r.fallback, a = t.mode, l = e.child, u = l.sibling, r = si(l, {
			mode: "hidden",
			children: r.children
		}), r.subtreeFlags = l.subtreeFlags & 65011712, u === null ? (c = ui(c, a, n, null), c.flags |= 2) : c = si(u, c), c.return = t, r.return = t, r.sibling = c, t.child = r, sc(null, r), r = t.child, c = e.child.memoizedState, c === null ? c = vc(n) : (a = c.cachePool, a === null ? a = _a() : (l = ra._currentValue, a = a.parent === l ? a : {
			parent: l,
			pool: l
		}), c = {
			baseLanes: c.baseLanes | n,
			cachePool: a
		}), r.memoizedState = c, r.childLanes = yc(e, s, n), t.memoizedState = _c, sc(e.child, r)) : (to(t), n = e.child, e = n.sibling, n = si(n, {
			mode: "visible",
			children: r.children
		}), n.return = t, n.sibling = null, e !== null && (s = t.deletions, s === null ? (t.deletions = [e], t.flags |= 16) : s.push(e)), t.child = n, t.memoizedState = null, n);
	}
	function xc(e, t) {
		return t = Sc({
			mode: "visible",
			children: t
		}, e.mode), t.return = e, e.child = t;
	}
	function Sc(e, t) {
		return e = ai(22, e, null, t), e.lanes = 0, e;
	}
	function Cc(e, t, n) {
		return Pa(t, e.child, null, n), e = xc(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
	}
	function wc(e, t, n) {
		e.lanes |= t;
		var r = e.alternate;
		r !== null && (r.lanes |= t), Ki(e.return, t, n);
	}
	function Tc(e, t, n, r, i, a) {
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
	function Ec(e, t, n) {
		var r = t.pendingProps, i = r.revealOrder, a = r.tail;
		r = r.children;
		var o = oo.current, s = (o & 2) != 0;
		if (s ? (o = o & 1 | 2, t.flags |= 128) : o &= 1, j(oo, o), nc(e, t, r, n), r = U ? yi : 0, !s && e !== null && e.flags & 128) a: for (e = t.child; e !== null;) {
			if (e.tag === 13) e.memoizedState !== null && wc(e, n, t);
			else if (e.tag === 19) wc(e, n, t);
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
				for (n = t.child, i = null; n !== null;) e = n.alternate, e !== null && so(e) === null && (i = n), n = n.sibling;
				n = i, n === null ? (i = t.child, t.child = null) : (i = n.sibling, n.sibling = null), Tc(t, !1, i, n, a, r);
				break;
			case "backwards":
			case "unstable_legacy-backwards":
				for (n = null, i = t.child, t.child = null; i !== null;) {
					if (e = i.alternate, e !== null && so(e) === null) {
						t.child = i;
						break;
					}
					e = i.sibling, i.sibling = n, n = i, i = e;
				}
				Tc(t, !0, n, null, a, r);
				break;
			case "together":
				Tc(t, !1, null, null, void 0, r);
				break;
			default: t.memoizedState = null;
		}
		return t.child;
	}
	function Dc(e, t, n) {
		if (e !== null && (t.dependencies = e.dependencies), Gl |= t.lanes, (n & t.childLanes) === 0) if (e !== null) {
			if (Ji(e, t, n, !1), (n & t.childLanes) === 0) return null;
		} else return null;
		if (e !== null && t.child !== e.child) throw Error(i(153));
		if (t.child !== null) {
			for (e = t.child, n = si(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null;) e = e.sibling, n = n.sibling = si(e, e.pendingProps), n.return = t;
			n.sibling = null;
		}
		return t.child;
	}
	function Oc(e, t) {
		return (e.lanes & t) === 0 ? (e = e.dependencies, !!(e !== null && Yi(e))) : !0;
	}
	function kc(e, t, n) {
		switch (t.tag) {
			case 3:
				he(t, t.stateNode.containerInfo), Wi(t, ra, e.memoizedState.cache), Ri();
				break;
			case 27:
			case 5:
				_e(t);
				break;
			case 4:
				he(t, t.stateNode.containerInfo);
				break;
			case 10:
				Wi(t, t.type, t.memoizedProps.value);
				break;
			case 31:
				if (t.memoizedState !== null) return t.flags |= 128, no(t), null;
				break;
			case 13:
				var r = t.memoizedState;
				if (r !== null) return r.dehydrated === null ? (n & t.child.childLanes) === 0 ? (to(t), e = Dc(e, t, n), e === null ? null : e.sibling) : bc(e, t, n) : (to(t), t.flags |= 128, null);
				to(t);
				break;
			case 19:
				var i = (e.flags & 128) != 0;
				if (r = (n & t.childLanes) !== 0, r ||= (Ji(e, t, n, !1), (n & t.childLanes) !== 0), i) {
					if (r) return Ec(e, t, n);
					t.flags |= 128;
				}
				if (i = t.memoizedState, i !== null && (i.rendering = null, i.tail = null, i.lastEffect = null), j(oo, oo.current), r) break;
				return null;
			case 22: return t.lanes = 0, oc(e, t, n, t.pendingProps);
			case 24: Wi(t, ra, e.memoizedState.cache);
		}
		return Dc(e, t, n);
	}
	function Ac(e, t, n) {
		if (e !== null) if (e.memoizedProps !== t.pendingProps) tc = !0;
		else {
			if (!Oc(e, n) && !(t.flags & 128)) return tc = !1, kc(e, t, n);
			tc = !!(e.flags & 131072);
		}
		else tc = !1, U && t.flags & 1048576 && Ei(t, yi, t.index);
		switch (t.lanes = 0, t.tag) {
			case 16:
				a: {
					var r = t.pendingProps;
					if (e = wa(t.elementType), t.type = e, typeof e == "function") oi(e) ? (r = Ws(e, r), t.tag = 1, t = hc(null, t, e, r, n)) : (t.tag = 0, t = pc(null, t, e, r, n));
					else {
						if (e != null) {
							var a = e.$$typeof;
							if (a === C) {
								t.tag = 11, t = rc(null, t, e, r, n);
								break a;
							} else if (a === T) {
								t.tag = 14, t = ic(null, t, e, r, n);
								break a;
							}
						}
						throw t = oe(e) || e, Error(i(306, t, ""));
					}
				}
				return t;
			case 0: return pc(e, t, t.type, t.pendingProps, n);
			case 1: return r = t.type, a = Ws(r, t.pendingProps), hc(e, t, r, a, n);
			case 3:
				a: {
					if (he(t, t.stateNode.containerInfo), e === null) throw Error(i(387));
					r = t.pendingProps;
					var o = t.memoizedState;
					a = o.element, Ra(e, t), Ga(t, r, null, n);
					var s = t.memoizedState;
					if (r = s.cache, Wi(t, ra, r), r !== o.cache && qi(t, [ra], n, !0), Wa(), r = s.element, o.isDehydrated) if (o = {
						element: r,
						isDehydrated: !1,
						cache: s.cache
					}, t.updateQueue.baseState = o, t.memoizedState = o, t.flags & 256) {
						t = gc(e, t, r, n);
						break a;
					} else if (r !== a) {
						a = hi(Error(i(424)), t), Bi(a), t = gc(e, t, r, n);
						break a;
					} else {
						switch (e = t.stateNode.containerInfo, e.nodeType) {
							case 9:
								e = e.body;
								break;
							default: e = e.nodeName === "HTML" ? e.ownerDocument.body : e;
						}
						for (H = cf(e.firstChild), Ai = t, U = !0, ji = null, Mi = !0, n = Fa(t, null, r, n), t.child = n; n;) n.flags = n.flags & -3 | 4096, n = n.sibling;
					}
					else {
						if (Ri(), r === a) {
							t = Dc(e, t, n);
							break a;
						}
						nc(e, t, r, n);
					}
					t = t.child;
				}
				return t;
			case 26: return fc(e, t), e === null ? (n = kf(t.type, null, t.pendingProps, null)) ? t.memoizedState = n : U || (n = t.type, e = t.pendingProps, r = Bd(me.current).createElement(n), r[ut] = t, r[dt] = e, Pd(r, n, e), xt(r), t.stateNode = r) : t.memoizedState = kf(t.type, e.memoizedProps, t.pendingProps, e.memoizedState), null;
			case 27: return _e(t), e === null && U && (r = t.stateNode = ff(t.type, t.pendingProps, me.current), Ai = t, Mi = !0, a = H, Zd(t.type) ? (lf = a, H = cf(r.firstChild)) : H = a), nc(e, t, t.pendingProps.children, n), fc(e, t), e === null && (t.flags |= 4194304), t.child;
			case 5: return e === null && U && ((a = r = H) && (r = tf(r, t.type, t.pendingProps, Mi), r === null ? a = !1 : (t.stateNode = r, Ai = t, H = cf(r.firstChild), Mi = !1, a = !0)), a || Pi(t)), _e(t), a = t.type, o = t.pendingProps, s = e === null ? null : e.memoizedProps, r = o.children, Ud(a, o) ? r = null : s !== null && Ud(a, s) && (t.flags |= 32), t.memoizedState !== null && (a = bo(e, t, Co, null, null, n), Qf._currentValue = a), fc(e, t), nc(e, t, r, n), t.child;
			case 6: return e === null && U && ((e = n = H) && (n = nf(n, t.pendingProps, Mi), n === null ? e = !1 : (t.stateNode = n, Ai = t, H = null, e = !0)), e || Pi(t)), null;
			case 13: return bc(e, t, n);
			case 4: return he(t, t.stateNode.containerInfo), r = t.pendingProps, e === null ? t.child = Pa(t, null, r, n) : nc(e, t, r, n), t.child;
			case 11: return rc(e, t, t.type, t.pendingProps, n);
			case 7: return nc(e, t, t.pendingProps, n), t.child;
			case 8: return nc(e, t, t.pendingProps.children, n), t.child;
			case 12: return nc(e, t, t.pendingProps.children, n), t.child;
			case 10: return r = t.pendingProps, Wi(t, t.type, r.value), nc(e, t, r.children, n), t.child;
			case 9: return a = t.type._context, r = t.pendingProps.children, Xi(t), a = Zi(a), r = r(a), t.flags |= 1, nc(e, t, r, n), t.child;
			case 14: return ic(e, t, t.type, t.pendingProps, n);
			case 15: return ac(e, t, t.type, t.pendingProps, n);
			case 19: return Ec(e, t, n);
			case 31: return dc(e, t, n);
			case 22: return oc(e, t, n, t.pendingProps);
			case 24: return Xi(t), r = Zi(ra), e === null ? (a = ha(), a === null && (a = q, o = ia(), a.pooledCache = o, o.refCount++, o !== null && (a.pooledCacheLanes |= n), a = o), t.memoizedState = {
				parent: r,
				cache: a
			}, La(t), Wi(t, ra, a)) : ((e.lanes & n) !== 0 && (Ra(e, t), Ga(t, null, null, n), Wa()), a = e.memoizedState, o = t.memoizedState, a.parent === r ? (r = o.cache, Wi(t, ra, r), r !== a.cache && qi(t, [ra], n, !0)) : (a = {
				parent: r,
				cache: r
			}, t.memoizedState = a, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = a), Wi(t, ra, r))), nc(e, t, t.pendingProps.children, n), t.child;
			case 29: throw t.pendingProps;
		}
		throw Error(i(156, t.tag));
	}
	function jc(e) {
		e.flags |= 4;
	}
	function Mc(e, t, n, r, i) {
		if ((t = (e.mode & 32) != 0) && (t = !1), t) {
			if (e.flags |= 16777216, (i & 335544128) === i) if (e.stateNode.complete) e.flags |= 8192;
			else if (wu()) e.flags |= 8192;
			else throw Ta = xa, ya;
		} else e.flags &= -16777217;
	}
	function Nc(e, t) {
		if (t.type !== "stylesheet" || t.state.loading & 4) e.flags &= -16777217;
		else if (e.flags |= 16777216, !Wf(t)) if (wu()) e.flags |= 8192;
		else throw Ta = xa, ya;
	}
	function Pc(e, t) {
		t !== null && (e.flags |= 4), e.flags & 16384 && (t = e.tag === 22 ? 536870912 : Qe(), e.lanes |= t, Yl |= t);
	}
	function Fc(e, t) {
		if (!U) switch (e.tailMode) {
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
	function Ic(e) {
		var t = e.alternate !== null && e.alternate.child === e.child, n = 0, r = 0;
		if (t) for (var i = e.child; i !== null;) n |= i.lanes | i.childLanes, r |= i.subtreeFlags & 65011712, r |= i.flags & 65011712, i.return = e, i = i.sibling;
		else for (i = e.child; i !== null;) n |= i.lanes | i.childLanes, r |= i.subtreeFlags, r |= i.flags, i.return = e, i = i.sibling;
		return e.subtreeFlags |= r, e.childLanes = n, t;
	}
	function Lc(e, t, n) {
		var r = t.pendingProps;
		switch (Oi(t), t.tag) {
			case 16:
			case 15:
			case 0:
			case 11:
			case 7:
			case 8:
			case 12:
			case 9:
			case 14: return Ic(t), null;
			case 1: return Ic(t), null;
			case 3: return n = t.stateNode, r = null, e !== null && (r = e.memoizedState.cache), t.memoizedState.cache !== r && (t.flags |= 2048), Gi(ra), ge(), n.pendingContext && (n.context = n.pendingContext, n.pendingContext = null), (e === null || e.child === null) && (Li(t) ? jc(t) : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, zi())), Ic(t), null;
			case 26:
				var a = t.type, o = t.memoizedState;
				return e === null ? (jc(t), o === null ? (Ic(t), Mc(t, a, null, r, n)) : (Ic(t), Nc(t, o))) : o ? o === e.memoizedState ? (Ic(t), t.flags &= -16777217) : (jc(t), Ic(t), Nc(t, o)) : (e = e.memoizedProps, e !== r && jc(t), Ic(t), Mc(t, a, e, r, n)), null;
			case 27:
				if (ve(t), n = me.current, a = t.type, e !== null && t.stateNode != null) e.memoizedProps !== r && jc(t);
				else {
					if (!r) {
						if (t.stateNode === null) throw Error(i(166));
						return Ic(t), null;
					}
					e = fe.current, Li(t) ? Fi(t, e) : (e = ff(a, r, n), t.stateNode = e, jc(t));
				}
				return Ic(t), null;
			case 5:
				if (ve(t), a = t.type, e !== null && t.stateNode != null) e.memoizedProps !== r && jc(t);
				else {
					if (!r) {
						if (t.stateNode === null) throw Error(i(166));
						return Ic(t), null;
					}
					if (o = fe.current, Li(t)) Fi(t, o);
					else {
						var s = Bd(me.current);
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
						o[ut] = t, o[dt] = r;
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
						r && jc(t);
					}
				}
				return Ic(t), Mc(t, t.type, e === null ? null : e.memoizedProps, t.pendingProps, n), null;
			case 6:
				if (e && t.stateNode != null) e.memoizedProps !== r && jc(t);
				else {
					if (typeof r != "string" && t.stateNode === null) throw Error(i(166));
					if (e = me.current, Li(t)) {
						if (e = t.stateNode, n = t.memoizedProps, r = null, a = Ai, a !== null) switch (a.tag) {
							case 27:
							case 5: r = a.memoizedProps;
						}
						e[ut] = t, e = !!(e.nodeValue === n || r !== null && !0 === r.suppressHydrationWarning || Md(e.nodeValue, n)), e || Pi(t, !0);
					} else e = Bd(e).createTextNode(r), e[ut] = t, t.stateNode = e;
				}
				return Ic(t), null;
			case 31:
				if (n = t.memoizedState, e === null || e.memoizedState !== null) {
					if (r = Li(t), n !== null) {
						if (e === null) {
							if (!r) throw Error(i(318));
							if (e = t.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(i(557));
							e[ut] = t;
						} else Ri(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
						Ic(t), e = !1;
					} else n = zi(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = n), e = !0;
					if (!e) return t.flags & 256 ? (ao(t), t) : (ao(t), null);
					if (t.flags & 128) throw Error(i(558));
				}
				return Ic(t), null;
			case 13:
				if (r = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
					if (a = Li(t), r !== null && r.dehydrated !== null) {
						if (e === null) {
							if (!a) throw Error(i(318));
							if (a = t.memoizedState, a = a === null ? null : a.dehydrated, !a) throw Error(i(317));
							a[ut] = t;
						} else Ri(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
						Ic(t), a = !1;
					} else a = zi(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = a), a = !0;
					if (!a) return t.flags & 256 ? (ao(t), t) : (ao(t), null);
				}
				return ao(t), t.flags & 128 ? (t.lanes = n, t) : (n = r !== null, e = e !== null && e.memoizedState !== null, n && (r = t.child, a = null, r.alternate !== null && r.alternate.memoizedState !== null && r.alternate.memoizedState.cachePool !== null && (a = r.alternate.memoizedState.cachePool.pool), o = null, r.memoizedState !== null && r.memoizedState.cachePool !== null && (o = r.memoizedState.cachePool.pool), o !== a && (r.flags |= 2048)), n !== e && n && (t.child.flags |= 8192), Pc(t, t.updateQueue), Ic(t), null);
			case 4: return ge(), e === null && Sd(t.stateNode.containerInfo), Ic(t), null;
			case 10: return Gi(t.type), Ic(t), null;
			case 19:
				if (A(oo), r = t.memoizedState, r === null) return Ic(t), null;
				if (a = (t.flags & 128) != 0, o = r.rendering, o === null) if (a) Fc(r, !1);
				else {
					if (Wl !== 0 || e !== null && e.flags & 128) for (e = t.child; e !== null;) {
						if (o = so(e), o !== null) {
							for (t.flags |= 128, Fc(r, !1), e = o.updateQueue, t.updateQueue = e, Pc(t, e), t.subtreeFlags = 0, e = n, n = t.child; n !== null;) ci(n, e), n = n.sibling;
							return j(oo, oo.current & 1 | 2), U && Ti(t, r.treeForkCount), t.child;
						}
						e = e.sibling;
					}
					r.tail !== null && je() > tu && (t.flags |= 128, a = !0, Fc(r, !1), t.lanes = 4194304);
				}
				else {
					if (!a) if (e = so(o), e !== null) {
						if (t.flags |= 128, a = !0, e = e.updateQueue, t.updateQueue = e, Pc(t, e), Fc(r, !0), r.tail === null && r.tailMode === "hidden" && !o.alternate && !U) return Ic(t), null;
					} else 2 * je() - r.renderingStartTime > tu && n !== 536870912 && (t.flags |= 128, a = !0, Fc(r, !1), t.lanes = 4194304);
					r.isBackwards ? (o.sibling = t.child, t.child = o) : (e = r.last, e === null ? t.child = o : e.sibling = o, r.last = o);
				}
				return r.tail === null ? (Ic(t), null) : (e = r.tail, r.rendering = e, r.tail = e.sibling, r.renderingStartTime = je(), e.sibling = null, n = oo.current, j(oo, a ? n & 1 | 2 : n & 1), U && Ti(t, r.treeForkCount), e);
			case 22:
			case 23: return ao(t), Qa(), r = t.memoizedState !== null, e === null ? r && (t.flags |= 8192) : e.memoizedState !== null !== r && (t.flags |= 8192), r ? n & 536870912 && !(t.flags & 128) && (Ic(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : Ic(t), n = t.updateQueue, n !== null && Pc(t, n.retryQueue), n = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), r = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (r = t.memoizedState.cachePool.pool), r !== n && (t.flags |= 2048), e !== null && A(ma), null;
			case 24: return n = null, e !== null && (n = e.memoizedState.cache), t.memoizedState.cache !== n && (t.flags |= 2048), Gi(ra), Ic(t), null;
			case 25: return null;
			case 30: return null;
		}
		throw Error(i(156, t.tag));
	}
	function Rc(e, t) {
		switch (Oi(t), t.tag) {
			case 1: return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 3: return Gi(ra), ge(), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
			case 26:
			case 27:
			case 5: return ve(t), null;
			case 31:
				if (t.memoizedState !== null) {
					if (ao(t), t.alternate === null) throw Error(i(340));
					Ri();
				}
				return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 13:
				if (ao(t), e = t.memoizedState, e !== null && e.dehydrated !== null) {
					if (t.alternate === null) throw Error(i(340));
					Ri();
				}
				return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 19: return A(oo), null;
			case 4: return ge(), null;
			case 10: return Gi(t.type), null;
			case 22:
			case 23: return ao(t), Qa(), e !== null && A(ma), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 24: return Gi(ra), null;
			case 25: return null;
			default: return null;
		}
	}
	function zc(e, t) {
		switch (Oi(t), t.tag) {
			case 3:
				Gi(ra), ge();
				break;
			case 26:
			case 27:
			case 5:
				ve(t);
				break;
			case 4:
				ge();
				break;
			case 31:
				t.memoizedState !== null && ao(t);
				break;
			case 13:
				ao(t);
				break;
			case 19:
				A(oo);
				break;
			case 10:
				Gi(t.type);
				break;
			case 22:
			case 23:
				ao(t), Qa(), e !== null && A(ma);
				break;
			case 24: Gi(ra);
		}
	}
	function Bc(e, t) {
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
	function Vc(e, t, n) {
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
	function Hc(e) {
		var t = e.updateQueue;
		if (t !== null) {
			var n = e.stateNode;
			try {
				qa(t, n);
			} catch (t) {
				Z(e, e.return, t);
			}
		}
	}
	function Uc(e, t, n) {
		n.props = Ws(e.type, e.memoizedProps), n.state = e.memoizedState;
		try {
			n.componentWillUnmount();
		} catch (n) {
			Z(e, t, n);
		}
	}
	function Wc(e, t) {
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
	function Gc(e, t) {
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
	function Kc(e) {
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
	function qc(e, t, n) {
		try {
			var r = e.stateNode;
			Fd(r, e.type, n, t), r[dt] = t;
		} catch (t) {
			Z(e, e.return, t);
		}
	}
	function Jc(e) {
		return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && Zd(e.type) || e.tag === 4;
	}
	function Yc(e) {
		a: for (;;) {
			for (; e.sibling === null;) {
				if (e.return === null || Jc(e.return)) return null;
				e = e.return;
			}
			for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18;) {
				if (e.tag === 27 && Zd(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue a;
				e.child.return = e, e = e.child;
			}
			if (!(e.flags & 2)) return e.stateNode;
		}
	}
	function Xc(e, t, n) {
		var r = e.tag;
		if (r === 5 || r === 6) e = e.stateNode, t ? (n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n).insertBefore(e, t) : (t = n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n, t.appendChild(e), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = tn));
		else if (r !== 4 && (r === 27 && Zd(e.type) && (n = e.stateNode, t = null), e = e.child, e !== null)) for (Xc(e, t, n), e = e.sibling; e !== null;) Xc(e, t, n), e = e.sibling;
	}
	function Zc(e, t, n) {
		var r = e.tag;
		if (r === 5 || r === 6) e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
		else if (r !== 4 && (r === 27 && Zd(e.type) && (n = e.stateNode), e = e.child, e !== null)) for (Zc(e, t, n), e = e.sibling; e !== null;) Zc(e, t, n), e = e.sibling;
	}
	function Qc(e) {
		var t = e.stateNode, n = e.memoizedProps;
		try {
			for (var r = e.type, i = t.attributes; i.length;) t.removeAttributeNode(i[0]);
			Pd(t, r, n), t[ut] = e, t[dt] = n;
		} catch (t) {
			Z(e, e.return, t);
		}
	}
	var $c = !1, el = !1, tl = !1, nl = typeof WeakSet == "function" ? WeakSet : Set, rl = null;
	function il(e, t) {
		if (e = e.containerInfo, Rd = sp, e = wr(e), Tr(e)) {
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
		}, sp = !1, rl = t; rl !== null;) if (t = rl, e = t.child, t.subtreeFlags & 1028 && e !== null) e.return = t, rl = e;
		else for (; rl !== null;) {
			switch (t = rl, o = t.alternate, e = t.flags, t.tag) {
				case 0:
					if (e & 4 && (e = t.updateQueue, e = e === null ? null : e.events, e !== null)) for (n = 0; n < e.length; n++) a = e[n], a.ref.impl = a.nextImpl;
					break;
				case 11:
				case 15: break;
				case 1:
					if (e & 1024 && o !== null) {
						e = void 0, n = t, a = o.memoizedProps, o = o.memoizedState, r = n.stateNode;
						try {
							var h = Ws(n.type, a);
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
				e.return = t.return, rl = e;
				break;
			}
			rl = t.return;
		}
	}
	function al(e, t, n) {
		var r = n.flags;
		switch (n.tag) {
			case 0:
			case 11:
			case 15:
				bl(e, n), r & 4 && Bc(5, n);
				break;
			case 1:
				if (bl(e, n), r & 4) if (e = n.stateNode, t === null) try {
					e.componentDidMount();
				} catch (e) {
					Z(n, n.return, e);
				}
				else {
					var i = Ws(n.type, t.memoizedProps);
					t = t.memoizedState;
					try {
						e.componentDidUpdate(i, t, e.__reactInternalSnapshotBeforeUpdate);
					} catch (e) {
						Z(n, n.return, e);
					}
				}
				r & 64 && Hc(n), r & 512 && Wc(n, n.return);
				break;
			case 3:
				if (bl(e, n), r & 64 && (e = n.updateQueue, e !== null)) {
					if (t = null, n.child !== null) switch (n.child.tag) {
						case 27:
						case 5:
							t = n.child.stateNode;
							break;
						case 1: t = n.child.stateNode;
					}
					try {
						qa(e, t);
					} catch (e) {
						Z(n, n.return, e);
					}
				}
				break;
			case 27: t === null && r & 4 && Qc(n);
			case 26:
			case 5:
				bl(e, n), t === null && r & 4 && Kc(n), r & 512 && Wc(n, n.return);
				break;
			case 12:
				bl(e, n);
				break;
			case 31:
				bl(e, n), r & 4 && dl(e, n);
				break;
			case 13:
				bl(e, n), r & 4 && fl(e, n), r & 64 && (e = n.memoizedState, e !== null && (e = e.dehydrated, e !== null && (n = Ju.bind(null, n), sf(e, n))));
				break;
			case 22:
				if (r = n.memoizedState !== null || $c, !r) {
					t = t !== null && t.memoizedState !== null || el, i = $c;
					var a = el;
					$c = r, (el = t) && !a ? Sl(e, n, (n.subtreeFlags & 8772) != 0) : bl(e, n), $c = i, el = a;
				}
				break;
			case 30: break;
			default: bl(e, n);
		}
	}
	function ol(e) {
		var t = e.alternate;
		t !== null && (e.alternate = null, ol(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && I(t)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
	}
	var sl = null, cl = !1;
	function ll(e, t, n) {
		for (n = n.child; n !== null;) ul(e, t, n), n = n.sibling;
	}
	function ul(e, t, n) {
		if (Ve && typeof Ve.onCommitFiberUnmount == "function") try {
			Ve.onCommitFiberUnmount(Be, n);
		} catch {}
		switch (n.tag) {
			case 26:
				el || Gc(n, t), ll(e, t, n), n.memoizedState ? n.memoizedState.count-- : n.stateNode && (n = n.stateNode, n.parentNode.removeChild(n));
				break;
			case 27:
				el || Gc(n, t);
				var r = sl, i = cl;
				Zd(n.type) && (sl = n.stateNode, cl = !1), ll(e, t, n), pf(n.stateNode), sl = r, cl = i;
				break;
			case 5: el || Gc(n, t);
			case 6:
				if (r = sl, i = cl, sl = null, ll(e, t, n), sl = r, cl = i, sl !== null) if (cl) try {
					(sl.nodeType === 9 ? sl.body : sl.nodeName === "HTML" ? sl.ownerDocument.body : sl).removeChild(n.stateNode);
				} catch (e) {
					Z(n, t, e);
				}
				else try {
					sl.removeChild(n.stateNode);
				} catch (e) {
					Z(n, t, e);
				}
				break;
			case 18:
				sl !== null && (cl ? (e = sl, Qd(e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e, n.stateNode), Np(e)) : Qd(sl, n.stateNode));
				break;
			case 4:
				r = sl, i = cl, sl = n.stateNode.containerInfo, cl = !0, ll(e, t, n), sl = r, cl = i;
				break;
			case 0:
			case 11:
			case 14:
			case 15:
				Vc(2, n, t), el || Vc(4, n, t), ll(e, t, n);
				break;
			case 1:
				el || (Gc(n, t), r = n.stateNode, typeof r.componentWillUnmount == "function" && Uc(n, t, r)), ll(e, t, n);
				break;
			case 21:
				ll(e, t, n);
				break;
			case 22:
				el = (r = el) || n.memoizedState !== null, ll(e, t, n), el = r;
				break;
			default: ll(e, t, n);
		}
	}
	function dl(e, t) {
		if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null))) {
			e = e.dehydrated;
			try {
				Np(e);
			} catch (e) {
				Z(t, t.return, e);
			}
		}
	}
	function fl(e, t) {
		if (t.memoizedState === null && (e = t.alternate, e !== null && (e = e.memoizedState, e !== null && (e = e.dehydrated, e !== null)))) try {
			Np(e);
		} catch (e) {
			Z(t, t.return, e);
		}
	}
	function pl(e) {
		switch (e.tag) {
			case 31:
			case 13:
			case 19:
				var t = e.stateNode;
				return t === null && (t = e.stateNode = new nl()), t;
			case 22: return e = e.stateNode, t = e._retryCache, t === null && (t = e._retryCache = new nl()), t;
			default: throw Error(i(435, e.tag));
		}
	}
	function ml(e, t) {
		var n = pl(e);
		t.forEach(function(t) {
			if (!n.has(t)) {
				n.add(t);
				var r = Yu.bind(null, e, t);
				t.then(r, r);
			}
		});
	}
	function hl(e, t) {
		var n = t.deletions;
		if (n !== null) for (var r = 0; r < n.length; r++) {
			var a = n[r], o = e, s = t, c = s;
			a: for (; c !== null;) {
				switch (c.tag) {
					case 27:
						if (Zd(c.type)) {
							sl = c.stateNode, cl = !1;
							break a;
						}
						break;
					case 5:
						sl = c.stateNode, cl = !1;
						break a;
					case 3:
					case 4:
						sl = c.stateNode.containerInfo, cl = !0;
						break a;
				}
				c = c.return;
			}
			if (sl === null) throw Error(i(160));
			ul(o, s, a), sl = null, cl = !1, o = a.alternate, o !== null && (o.return = null), a.return = null;
		}
		if (t.subtreeFlags & 13886) for (t = t.child; t !== null;) _l(t, e), t = t.sibling;
	}
	var gl = null;
	function _l(e, t) {
		var n = e.alternate, r = e.flags;
		switch (e.tag) {
			case 0:
			case 11:
			case 14:
			case 15:
				hl(t, e), vl(e), r & 4 && (Vc(3, e, e.return), Bc(3, e), Vc(5, e, e.return));
				break;
			case 1:
				hl(t, e), vl(e), r & 512 && (el || n === null || Gc(n, n.return)), r & 64 && $c && (e = e.updateQueue, e !== null && (r = e.callbacks, r !== null && (n = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = n === null ? r : n.concat(r))));
				break;
			case 26:
				var a = gl;
				if (hl(t, e), vl(e), r & 512 && (el || n === null || Gc(n, n.return)), r & 4) {
					var o = n === null ? null : n.memoizedState;
					if (r = e.memoizedState, n === null) if (r === null) if (e.stateNode === null) {
						a: {
							r = e.type, n = e.memoizedProps, a = a.ownerDocument || a;
							b: switch (r) {
								case "title":
									o = a.getElementsByTagName("title")[0], (!o || o[F] || o[ut] || o.namespaceURI === "http://www.w3.org/2000/svg" || o.hasAttribute("itemprop")) && (o = a.createElement(r), a.head.insertBefore(o, a.querySelector("head > title"))), Pd(o, r, n), o[ut] = e, xt(o), r = o;
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
							o[ut] = e, xt(o), r = o;
						}
						e.stateNode = r;
					} else Hf(a, e.type, e.stateNode);
					else e.stateNode = If(a, r, e.memoizedProps);
					else o === r ? r === null && e.stateNode !== null && qc(e, e.memoizedProps, n.memoizedProps) : (o === null ? n.stateNode !== null && (n = n.stateNode, n.parentNode.removeChild(n)) : o.count--, r === null ? Hf(a, e.type, e.stateNode) : If(a, r, e.memoizedProps));
				}
				break;
			case 27:
				hl(t, e), vl(e), r & 512 && (el || n === null || Gc(n, n.return)), n !== null && r & 4 && qc(e, e.memoizedProps, n.memoizedProps);
				break;
			case 5:
				if (hl(t, e), vl(e), r & 512 && (el || n === null || Gc(n, n.return)), e.flags & 32) {
					a = e.stateNode;
					try {
						qt(a, "");
					} catch (t) {
						Z(e, e.return, t);
					}
				}
				r & 4 && e.stateNode != null && (a = e.memoizedProps, qc(e, a, n === null ? a : n.memoizedProps)), r & 1024 && (tl = !0);
				break;
			case 6:
				if (hl(t, e), vl(e), r & 4) {
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
				if (Bf = null, a = gl, gl = gf(t.containerInfo), hl(t, e), gl = a, vl(e), r & 4 && n !== null && n.memoizedState.isDehydrated) try {
					Np(t.containerInfo);
				} catch (t) {
					Z(e, e.return, t);
				}
				tl && (tl = !1, yl(e));
				break;
			case 4:
				r = gl, gl = gf(e.stateNode.containerInfo), hl(t, e), vl(e), gl = r;
				break;
			case 12:
				hl(t, e), vl(e);
				break;
			case 31:
				hl(t, e), vl(e), r & 4 && (r = e.updateQueue, r !== null && (e.updateQueue = null, ml(e, r)));
				break;
			case 13:
				hl(t, e), vl(e), e.child.flags & 8192 && e.memoizedState !== null != (n !== null && n.memoizedState !== null) && ($l = je()), r & 4 && (r = e.updateQueue, r !== null && (e.updateQueue = null, ml(e, r)));
				break;
			case 22:
				a = e.memoizedState !== null;
				var l = n !== null && n.memoizedState !== null, u = $c, d = el;
				if ($c = u || a, el = d || l, hl(t, e), el = d, $c = u, vl(e), r & 8192) a: for (t = e.stateNode, t._visibility = a ? t._visibility & -2 : t._visibility | 1, a && (n === null || l || $c || el || xl(e)), n = null, t = e;;) {
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
				r & 4 && (r = e.updateQueue, r !== null && (n = r.retryQueue, n !== null && (r.retryQueue = null, ml(e, n))));
				break;
			case 19:
				hl(t, e), vl(e), r & 4 && (r = e.updateQueue, r !== null && (e.updateQueue = null, ml(e, r)));
				break;
			case 30: break;
			case 21: break;
			default: hl(t, e), vl(e);
		}
	}
	function vl(e) {
		var t = e.flags;
		if (t & 2) {
			try {
				for (var n, r = e.return; r !== null;) {
					if (Jc(r)) {
						n = r;
						break;
					}
					r = r.return;
				}
				if (n == null) throw Error(i(160));
				switch (n.tag) {
					case 27:
						var a = n.stateNode;
						Zc(e, Yc(e), a);
						break;
					case 5:
						var o = n.stateNode;
						n.flags & 32 && (qt(o, ""), n.flags &= -33), Zc(e, Yc(e), o);
						break;
					case 3:
					case 4:
						var s = n.stateNode.containerInfo;
						Xc(e, Yc(e), s);
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
	function yl(e) {
		if (e.subtreeFlags & 1024) for (e = e.child; e !== null;) {
			var t = e;
			yl(t), t.tag === 5 && t.flags & 1024 && t.stateNode.reset(), e = e.sibling;
		}
	}
	function bl(e, t) {
		if (t.subtreeFlags & 8772) for (t = t.child; t !== null;) al(e, t.alternate, t), t = t.sibling;
	}
	function xl(e) {
		for (e = e.child; e !== null;) {
			var t = e;
			switch (t.tag) {
				case 0:
				case 11:
				case 14:
				case 15:
					Vc(4, t, t.return), xl(t);
					break;
				case 1:
					Gc(t, t.return);
					var n = t.stateNode;
					typeof n.componentWillUnmount == "function" && Uc(t, t.return, n), xl(t);
					break;
				case 27: pf(t.stateNode);
				case 26:
				case 5:
					Gc(t, t.return), xl(t);
					break;
				case 22:
					t.memoizedState === null && xl(t);
					break;
				case 30:
					xl(t);
					break;
				default: xl(t);
			}
			e = e.sibling;
		}
	}
	function Sl(e, t, n) {
		for (n &&= (t.subtreeFlags & 8772) != 0, t = t.child; t !== null;) {
			var r = t.alternate, i = e, a = t, o = a.flags;
			switch (a.tag) {
				case 0:
				case 11:
				case 15:
					Sl(i, a, n), Bc(4, a);
					break;
				case 1:
					if (Sl(i, a, n), r = a, i = r.stateNode, typeof i.componentDidMount == "function") try {
						i.componentDidMount();
					} catch (e) {
						Z(r, r.return, e);
					}
					if (r = a, i = r.updateQueue, i !== null) {
						var s = r.stateNode;
						try {
							var c = i.shared.hiddenCallbacks;
							if (c !== null) for (i.shared.hiddenCallbacks = null, i = 0; i < c.length; i++) Ka(c[i], s);
						} catch (e) {
							Z(r, r.return, e);
						}
					}
					n && o & 64 && Hc(a), Wc(a, a.return);
					break;
				case 27: Qc(a);
				case 26:
				case 5:
					Sl(i, a, n), n && r === null && o & 4 && Kc(a), Wc(a, a.return);
					break;
				case 12:
					Sl(i, a, n);
					break;
				case 31:
					Sl(i, a, n), n && o & 4 && dl(i, a);
					break;
				case 13:
					Sl(i, a, n), n && o & 4 && fl(i, a);
					break;
				case 22:
					a.memoizedState === null && Sl(i, a, n), Wc(a, a.return);
					break;
				case 30: break;
				default: Sl(i, a, n);
			}
			t = t.sibling;
		}
	}
	function Cl(e, t) {
		var n = null;
		e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), e = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), e !== n && (e != null && e.refCount++, n != null && aa(n));
	}
	function wl(e, t) {
		e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && aa(e));
	}
	function Tl(e, t, n, r) {
		if (t.subtreeFlags & 10256) for (t = t.child; t !== null;) El(e, t, n, r), t = t.sibling;
	}
	function El(e, t, n, r) {
		var i = t.flags;
		switch (t.tag) {
			case 0:
			case 11:
			case 15:
				Tl(e, t, n, r), i & 2048 && Bc(9, t);
				break;
			case 1:
				Tl(e, t, n, r);
				break;
			case 3:
				Tl(e, t, n, r), i & 2048 && (e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && aa(e)));
				break;
			case 12:
				if (i & 2048) {
					Tl(e, t, n, r), e = t.stateNode;
					try {
						var a = t.memoizedProps, o = a.id, s = a.onPostCommit;
						typeof s == "function" && s(o, t.alternate === null ? "mount" : "update", e.passiveEffectDuration, -0);
					} catch (e) {
						Z(t, t.return, e);
					}
				} else Tl(e, t, n, r);
				break;
			case 31:
				Tl(e, t, n, r);
				break;
			case 13:
				Tl(e, t, n, r);
				break;
			case 23: break;
			case 22:
				a = t.stateNode, o = t.alternate, t.memoizedState === null ? a._visibility & 2 ? Tl(e, t, n, r) : (a._visibility |= 2, Dl(e, t, n, r, (t.subtreeFlags & 10256) != 0 || !1)) : a._visibility & 2 ? Tl(e, t, n, r) : Ol(e, t), i & 2048 && Cl(o, t);
				break;
			case 24:
				Tl(e, t, n, r), i & 2048 && wl(t.alternate, t);
				break;
			default: Tl(e, t, n, r);
		}
	}
	function Dl(e, t, n, r, i) {
		for (i &&= (t.subtreeFlags & 10256) != 0 || !1, t = t.child; t !== null;) {
			var a = e, o = t, s = n, c = r, l = o.flags;
			switch (o.tag) {
				case 0:
				case 11:
				case 15:
					Dl(a, o, s, c, i), Bc(8, o);
					break;
				case 23: break;
				case 22:
					var u = o.stateNode;
					o.memoizedState === null ? (u._visibility |= 2, Dl(a, o, s, c, i)) : u._visibility & 2 ? Dl(a, o, s, c, i) : Ol(a, o), i && l & 2048 && Cl(o.alternate, o);
					break;
				case 24:
					Dl(a, o, s, c, i), i && l & 2048 && wl(o.alternate, o);
					break;
				default: Dl(a, o, s, c, i);
			}
			t = t.sibling;
		}
	}
	function Ol(e, t) {
		if (t.subtreeFlags & 10256) for (t = t.child; t !== null;) {
			var n = e, r = t, i = r.flags;
			switch (r.tag) {
				case 22:
					Ol(n, r), i & 2048 && Cl(r.alternate, r);
					break;
				case 24:
					Ol(n, r), i & 2048 && wl(r.alternate, r);
					break;
				default: Ol(n, r);
			}
			t = t.sibling;
		}
	}
	var kl = 8192;
	function Al(e, t, n) {
		if (e.subtreeFlags & kl) for (e = e.child; e !== null;) jl(e, t, n), e = e.sibling;
	}
	function jl(e, t, n) {
		switch (e.tag) {
			case 26:
				Al(e, t, n), e.flags & kl && e.memoizedState !== null && Gf(n, gl, e.memoizedState, e.memoizedProps);
				break;
			case 5:
				Al(e, t, n);
				break;
			case 3:
			case 4:
				var r = gl;
				gl = gf(e.stateNode.containerInfo), Al(e, t, n), gl = r;
				break;
			case 22:
				e.memoizedState === null && (r = e.alternate, r !== null && r.memoizedState !== null ? (r = kl, kl = 16777216, Al(e, t, n), kl = r) : Al(e, t, n));
				break;
			default: Al(e, t, n);
		}
	}
	function Ml(e) {
		var t = e.alternate;
		if (t !== null && (e = t.child, e !== null)) {
			t.child = null;
			do
				t = e.sibling, e.sibling = null, e = t;
			while (e !== null);
		}
	}
	function Nl(e) {
		var t = e.deletions;
		if (e.flags & 16) {
			if (t !== null) for (var n = 0; n < t.length; n++) {
				var r = t[n];
				rl = r, Il(r, e);
			}
			Ml(e);
		}
		if (e.subtreeFlags & 10256) for (e = e.child; e !== null;) Pl(e), e = e.sibling;
	}
	function Pl(e) {
		switch (e.tag) {
			case 0:
			case 11:
			case 15:
				Nl(e), e.flags & 2048 && Vc(9, e, e.return);
				break;
			case 3:
				Nl(e);
				break;
			case 12:
				Nl(e);
				break;
			case 22:
				var t = e.stateNode;
				e.memoizedState !== null && t._visibility & 2 && (e.return === null || e.return.tag !== 13) ? (t._visibility &= -3, Fl(e)) : Nl(e);
				break;
			default: Nl(e);
		}
	}
	function Fl(e) {
		var t = e.deletions;
		if (e.flags & 16) {
			if (t !== null) for (var n = 0; n < t.length; n++) {
				var r = t[n];
				rl = r, Il(r, e);
			}
			Ml(e);
		}
		for (e = e.child; e !== null;) {
			switch (t = e, t.tag) {
				case 0:
				case 11:
				case 15:
					Vc(8, t, t.return), Fl(t);
					break;
				case 22:
					n = t.stateNode, n._visibility & 2 && (n._visibility &= -3, Fl(t));
					break;
				default: Fl(t);
			}
			e = e.sibling;
		}
	}
	function Il(e, t) {
		for (; rl !== null;) {
			var n = rl;
			switch (n.tag) {
				case 0:
				case 11:
				case 15:
					Vc(8, n, t);
					break;
				case 23:
				case 22:
					if (n.memoizedState !== null && n.memoizedState.cachePool !== null) {
						var r = n.memoizedState.cachePool.pool;
						r != null && r.refCount++;
					}
					break;
				case 24: aa(n.memoizedState.cache);
			}
			if (r = n.child, r !== null) r.return = n, rl = r;
			else a: for (n = e; rl !== null;) {
				r = rl;
				var i = r.sibling, a = r.return;
				if (ol(r), r === n) {
					rl = null;
					break a;
				}
				if (i !== null) {
					i.return = a, rl = i;
					break a;
				}
				rl = a;
			}
		}
	}
	var Ll = {
		getCacheForType: function(e) {
			var t = Zi(ra), n = t.data.get(e);
			return n === void 0 && (n = e(), t.data.set(e, n)), n;
		},
		cacheSignal: function() {
			return Zi(ra).controller.signal;
		}
	}, Rl = typeof WeakMap == "function" ? WeakMap : Map, K = 0, q = null, J = null, Y = 0, X = 0, zl = null, Bl = !1, Vl = !1, Hl = !1, Ul = 0, Wl = 0, Gl = 0, Kl = 0, ql = 0, Jl = 0, Yl = 0, Xl = null, Zl = null, Ql = !1, $l = 0, eu = 0, tu = Infinity, nu = null, ru = null, iu = 0, au = null, ou = null, su = 0, cu = 0, lu = null, uu = null, du = 0, fu = null;
	function pu() {
		return K & 2 && Y !== 0 ? Y & -Y : O.T === null ? st() : dd();
	}
	function mu() {
		if (Jl === 0) if (!(Y & 536870912) || U) {
			var e = P;
			P <<= 1, !(P & 3932160) && (P = 262144), Jl = e;
		} else Jl = 536870912;
		return e = $a.current, e !== null && (e.flags |= 32), Jl;
	}
	function hu(e, t, n) {
		(e === q && (X === 2 || X === 9) || e.cancelPendingCommit !== null) && (Su(e, 0), yu(e, Y, Jl, !1)), et(e, n), (!(K & 2) || e !== q) && (e === q && (!(K & 2) && (Kl |= n), Wl === 4 && yu(e, Y, Jl, !1)), rd(e));
	}
	function gu(e, t, n) {
		if (K & 6) throw Error(i(327));
		var r = !n && (t & 127) == 0 && (t & e.expiredLanes) === 0 || Xe(e, t), a = r ? Au(e, t) : Ou(e, t, !0), o = r;
		do {
			if (a === 0) {
				Vl && !r && yu(e, t, 0, !1);
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
								if (Hl && !l) {
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
							yu(r, t, Jl, !Bl);
							break a;
						case 2:
							Zl = null;
							break;
						case 3:
						case 5: break;
						default: throw Error(i(329));
					}
					if ((t & 62914560) === t && (a = $l + 300 - je(), 10 < a)) {
						if (yu(r, t, Jl, !Bl), Ye(r, 0, !0) !== 0) break a;
						su = t, r.timeoutHandle = Kd(_u.bind(null, r, n, Zl, nu, Ql, t, Jl, Kl, Yl, Bl, o, "Throttled", -0, 0), a);
						break a;
					}
					_u(r, n, Zl, nu, Ql, t, Jl, Kl, Yl, Bl, o, null, -0, 0);
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
				unsuspend: tn
			}, jl(t, a, d);
			var m = (a & 62914560) === a ? $l - je() : (a & 4194048) === a ? eu - je() : 0;
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
					if (!yr(a(), i)) return !1;
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
			var a = 31 - Ue(i), o = 1 << a;
			r[a] = -1, i &= ~o;
		}
		n !== 0 && nt(e, n, t);
	}
	function bu() {
		return K & 6 ? !0 : (id(0, !1), !1);
	}
	function xu() {
		if (J !== null) {
			if (X === 0) var e = J.return;
			else e = J, Ui = Hi = null, Eo(e), Oa = null, ka = 0, e = J;
			for (; e !== null;) zc(e.alternate, e), e = e.return;
			J = null;
		}
	}
	function Su(e, t) {
		var n = e.timeoutHandle;
		n !== -1 && (e.timeoutHandle = -1, qd(n)), n = e.cancelPendingCommit, n !== null && (e.cancelPendingCommit = null, n()), su = 0, xu(), q = e, J = n = si(e.current, null), Y = t, X = 0, zl = null, Bl = !1, Vl = Xe(e, t), Hl = !1, Yl = Jl = ql = Kl = Gl = Wl = 0, Zl = Xl = null, Ql = !1, t & 8 && (t |= t & 32);
		var r = e.entangledLanes;
		if (r !== 0) for (e = e.entanglements, r &= t; 0 < r;) {
			var i = 31 - Ue(r), a = 1 << i;
			t |= e[i], r &= ~a;
		}
		return Ul = t, Zr(), n;
	}
	function Cu(e, t) {
		W = null, O.H = Is, t === va || t === ba ? (t = Ea(), X = 3) : t === ya ? (t = Ea(), X = 4) : X = t === ec ? 8 : typeof t == "object" && t && typeof t.then == "function" ? 6 : 1, zl = t, J === null && (Wl = 1, Js(e, hi(t, e.current)));
	}
	function wu() {
		var e = $a.current;
		return e === null ? !0 : (Y & 4194048) === Y ? eo === null : (Y & 62914560) === Y || Y & 536870912 ? e === eo : !1;
	}
	function Tu() {
		var e = O.H;
		return O.H = Is, e === null ? Is : e;
	}
	function Eu() {
		var e = O.A;
		return O.A = Ll, e;
	}
	function Du() {
		Wl = 4, Bl || (Y & 4194048) !== Y && $a.current !== null || (Vl = !0), !(Gl & 134217727) && !(Kl & 134217727) || q === null || yu(q, Y, Jl, !1);
	}
	function Ou(e, t, n) {
		var r = K;
		K |= 2;
		var i = Tu(), a = Eu();
		(q !== e || Y !== t) && (nu = null, Su(e, t)), t = !1;
		var o = Wl;
		a: do
			try {
				if (X !== 0 && J !== null) {
					var s = J, c = zl;
					switch (X) {
						case 8:
							xu(), o = 6;
							break a;
						case 3:
						case 2:
						case 9:
						case 6:
							$a.current === null && (t = !0);
							var l = X;
							if (X = 0, zl = null, Pu(e, s, c, l), n && Vl) {
								o = 0;
								break a;
							}
							break;
						default: l = X, X = 0, zl = null, Pu(e, s, c, l);
					}
				}
				ku(), o = Wl;
				break;
			} catch (t) {
				Cu(e, t);
			}
		while (1);
		return t && e.shellSuspendCounter++, Ui = Hi = null, K = r, O.H = i, O.A = a, J === null && (q = null, Y = 0, Zr()), o;
	}
	function ku() {
		for (; J !== null;) Mu(J);
	}
	function Au(e, t) {
		var n = K;
		K |= 2;
		var r = Tu(), a = Eu();
		q !== e || Y !== t ? (nu = null, tu = je() + 500, Su(e, t)) : Vl = Xe(e, t);
		a: do
			try {
				if (X !== 0 && J !== null) {
					t = J;
					var o = zl;
					b: switch (X) {
						case 1:
							X = 0, zl = null, Pu(e, t, o, 1);
							break;
						case 2:
						case 9:
							if (Sa(o)) {
								X = 0, zl = null, Nu(t);
								break;
							}
							t = function() {
								X !== 2 && X !== 9 || q !== e || (X = 7), rd(e);
							}, o.then(t, t);
							break a;
						case 3:
							X = 7;
							break a;
						case 4:
							X = 5;
							break a;
						case 7:
							Sa(o) ? (X = 0, zl = null, Nu(t)) : (X = 0, zl = null, Pu(e, t, o, 7));
							break;
						case 5:
							var s = null;
							switch (J.tag) {
								case 26: s = J.memoizedState;
								case 5:
								case 27:
									var c = J;
									if (s ? Wf(s) : c.stateNode.complete) {
										X = 0, zl = null;
										var l = c.sibling;
										if (l !== null) J = l;
										else {
											var u = c.return;
											u === null ? J = null : (J = u, Fu(u));
										}
										break b;
									}
							}
							X = 0, zl = null, Pu(e, t, o, 5);
							break;
						case 6:
							X = 0, zl = null, Pu(e, t, o, 6);
							break;
						case 8:
							xu(), Wl = 6;
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
		return Ui = Hi = null, O.H = r, O.A = a, K = n, J === null ? (q = null, Y = 0, Zr(), Wl) : 0;
	}
	function ju() {
		for (; J !== null && !ke();) Mu(J);
	}
	function Mu(e) {
		var t = Ac(e.alternate, e, Ul);
		e.memoizedProps = e.pendingProps, t === null ? Fu(e) : J = t;
	}
	function Nu(e) {
		var t = e, n = t.alternate;
		switch (t.tag) {
			case 15:
			case 0:
				t = mc(n, t, t.pendingProps, t.type, void 0, Y);
				break;
			case 11:
				t = mc(n, t, t.pendingProps, t.type.render, t.ref, Y);
				break;
			case 5: Eo(t);
			default: zc(n, t), t = J = ci(t, Ul), t = Ac(n, t, Ul);
		}
		e.memoizedProps = e.pendingProps, t === null ? Fu(e) : J = t;
	}
	function Pu(e, t, n, r) {
		Ui = Hi = null, Eo(t), Oa = null, ka = 0;
		var i = t.return;
		try {
			if ($s(e, i, t, n, Y)) {
				Wl = 1, Js(e, hi(n, e.current)), J = null;
				return;
			}
		} catch (t) {
			if (i !== null) throw J = i, t;
			Wl = 1, Js(e, hi(n, e.current)), J = null;
			return;
		}
		t.flags & 32768 ? (U || r === 1 ? e = !0 : Vl || Y & 536870912 ? e = !1 : (Bl = e = !0, (r === 2 || r === 9 || r === 3 || r === 6) && (r = $a.current, r !== null && r.tag === 13 && (r.flags |= 16384))), Iu(t, e)) : Fu(t);
	}
	function Fu(e) {
		var t = e;
		do {
			if (t.flags & 32768) {
				Iu(t, Bl);
				return;
			}
			e = t.return;
			var n = Lc(t.alternate, t, Ul);
			if (n !== null) {
				J = n;
				return;
			}
			if (t = t.sibling, t !== null) {
				J = t;
				return;
			}
			J = t = e;
		} while (t !== null);
		Wl === 0 && (Wl = 5);
	}
	function Iu(e, t) {
		do {
			var n = Rc(e.alternate, e);
			if (n !== null) {
				n.flags &= 32767, J = n;
				return;
			}
			if (n = e.return, n !== null && (n.flags |= 32768, n.subtreeFlags = 0, n.deletions = null), !t && (e = e.sibling, e !== null)) {
				J = e;
				return;
			}
			J = e = n;
		} while (e !== null);
		Wl = 6, J = null;
	}
	function Lu(e, t, n, r, a, o, s, c, l) {
		e.cancelPendingCommit = null;
		do
			Hu();
		while (iu !== 0);
		if (K & 6) throw Error(i(327));
		if (t !== null) {
			if (t === e.current) throw Error(i(177));
			if (o = t.lanes | t.childLanes, o |= Xr, tt(e, n, o, s, c, l), e === q && (J = q = null, Y = 0), ou = t, au = e, su = n, cu = o, lu = a, uu = r, t.subtreeFlags & 10256 || t.flags & 10256 ? (e.callbackNode = null, e.callbackPriority = 0, Xu(Fe, function() {
				return Uu(), null;
			})) : (e.callbackNode = null, e.callbackPriority = 0), r = (t.flags & 13878) != 0, t.subtreeFlags & 13878 || r) {
				r = O.T, O.T = null, a = k.p, k.p = 2, s = K, K |= 4;
				try {
					il(e, t, n);
				} finally {
					K = s, k.p = a, O.T = r;
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
				n = O.T, O.T = null;
				var r = k.p;
				k.p = 2;
				var i = K;
				K |= 4;
				try {
					_l(t, e);
					var a = zd, o = wr(e.containerInfo), s = a.focusedElem, c = a.selectionRange;
					if (o !== s && s && s.ownerDocument && Cr(s.ownerDocument.documentElement, s)) {
						if (c !== null && Tr(s)) {
							var l = c.start, u = c.end;
							if (u === void 0 && (u = l), "selectionStart" in s) s.selectionStart = l, s.selectionEnd = Math.min(u, s.value.length);
							else {
								var d = s.ownerDocument || document, f = d && d.defaultView || window;
								if (f.getSelection) {
									var p = f.getSelection(), m = s.textContent.length, h = Math.min(c.start, m), g = c.end === void 0 ? h : Math.min(c.end, m);
									!p.extend && h > g && (o = g, g = h, h = o);
									var _ = Sr(s, h), v = Sr(s, g);
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
					K = i, k.p = r, O.T = n;
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
				n = O.T, O.T = null;
				var r = k.p;
				k.p = 2;
				var i = K;
				K |= 4;
				try {
					al(e, t.alternate, t);
				} finally {
					K = i, k.p = r, O.T = n;
				}
			}
			iu = 3;
		}
	}
	function Bu() {
		if (iu === 4 || iu === 3) {
			iu = 0, Ae();
			var e = au, t = ou, n = su, r = uu;
			t.subtreeFlags & 10256 || t.flags & 10256 ? iu = 5 : (iu = 0, ou = au = null, Vu(e, e.pendingLanes));
			var i = e.pendingLanes;
			if (i === 0 && (ru = null), ot(n), t = t.stateNode, Ve && typeof Ve.onCommitFiberRoot == "function") try {
				Ve.onCommitFiberRoot(Be, t, void 0, (t.current.flags & 128) == 128);
			} catch {}
			if (r !== null) {
				t = O.T, i = k.p, k.p = 2, O.T = null;
				try {
					for (var a = e.onRecoverableError, o = 0; o < r.length; o++) {
						var s = r[o];
						a(s.value, { componentStack: s.stack });
					}
				} finally {
					O.T = t, k.p = i;
				}
			}
			su & 3 && Hu(), rd(e), i = e.pendingLanes, n & 261930 && i & 42 ? e === fu ? du++ : (du = 0, fu = e) : du = 0, id(0, !1);
		}
	}
	function Vu(e, t) {
		(e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache, t != null && (e.pooledCache = null, aa(t)));
	}
	function Hu() {
		return Ru(), zu(), Bu(), Uu();
	}
	function Uu() {
		if (iu !== 5) return !1;
		var e = au, t = cu;
		cu = 0;
		var n = ot(su), r = O.T, a = k.p;
		try {
			k.p = 32 > n ? 32 : n, O.T = null, n = lu, lu = null;
			var o = au, s = su;
			if (iu = 0, ou = au = null, su = 0, K & 6) throw Error(i(331));
			var c = K;
			if (K |= 4, Pl(o.current), El(o, o.current, s, n), K = c, id(0, !1), Ve && typeof Ve.onPostCommitFiberRoot == "function") try {
				Ve.onPostCommitFiberRoot(Be, o);
			} catch {}
			return !0;
		} finally {
			k.p = a, O.T = r, Vu(e, t);
		}
	}
	function Wu(e, t, n) {
		t = hi(n, t), t = Xs(e.stateNode, t, 2), e = Ba(e, t, 2), e !== null && (et(e, 2), rd(e));
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
					e = hi(n, e), n = Zs(2), r = Ba(t, n, 2), r !== null && (Qs(n, r, t, e), et(r, 2), rd(r));
					break;
				}
			}
			t = t.return;
		}
	}
	function Gu(e, t, n) {
		var r = e.pingCache;
		if (r === null) {
			r = e.pingCache = new Rl();
			var i = /* @__PURE__ */ new Set();
			r.set(t, i);
		} else i = r.get(t), i === void 0 && (i = /* @__PURE__ */ new Set(), r.set(t, i));
		i.has(n) || (Hl = !0, i.add(n), e = Ku.bind(null, e, t, n), t.then(e, e));
	}
	function Ku(e, t, n) {
		var r = e.pingCache;
		r !== null && r.delete(t), e.pingedLanes |= e.suspendedLanes & n, e.warmLanes &= ~n, q === e && (Y & n) === n && (Wl === 4 || Wl === 3 && (Y & 62914560) === Y && 300 > je() - $l ? !(K & 2) && Su(e, 0) : ql |= n, Yl === Y && (Yl = 0)), rd(e);
	}
	function qu(e, t) {
		t === 0 && (t = Qe()), e = ei(e, t), e !== null && (et(e, t), rd(e));
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
		return De(e, t);
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
							a = (1 << 31 - Ue(42 | e) + 1) - 1, a &= i & ~(o & ~s), a = a & 201326741 ? a & 201326741 | 1 : a ? a | 2 : 0;
						}
						a !== 0 && (n = !0, ld(r, a));
					} else a = Y, a = Ye(r, r === q ? a : 0, r.cancelPendingCommit !== null || r.timeoutHandle !== -1), !(a & 3) || Xe(r, a) || (n = !0, ld(r, a));
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
		for (var t = je(), n = null, r = Zu; r !== null;) {
			var i = r.next, a = sd(r, t);
			a === 0 ? (r.next = null, n === null ? Zu = i : n.next = i, i === null && (Qu = n)) : (n = r, (e !== 0 || a & 3) && (ed = !0)), r = i;
		}
		iu !== 0 && iu !== 5 || id(e, !1), nd !== 0 && (nd = 0);
	}
	function sd(e, t) {
		for (var n = e.suspendedLanes, r = e.pingedLanes, i = e.expirationTimes, a = e.pendingLanes & -62914561; 0 < a;) {
			var o = 31 - Ue(a), s = 1 << o, c = i[o];
			c === -1 ? ((s & n) === 0 || (s & r) !== 0) && (i[o] = Ze(s, t)) : c <= t && (e.expiredLanes |= s), a &= ~s;
		}
		if (t = q, n = Y, n = Ye(e, e === t ? n : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1), r = e.callbackNode, n === 0 || e === t && (X === 2 || X === 9) || e.cancelPendingCommit !== null) return r !== null && r !== null && Oe(r), e.callbackNode = null, e.callbackPriority = 0;
		if (!(n & 3) || Xe(e, n)) {
			if (t = n & -n, t === e.callbackPriority) return t;
			switch (r !== null && Oe(r), ot(n)) {
				case 2:
				case 8:
					n = Pe;
					break;
				case 32:
					n = Fe;
					break;
				case 268435456:
					n = Le;
					break;
				default: n = Fe;
			}
			return r = cd.bind(null, e), n = De(n, r), e.callbackPriority = t, e.callbackNode = n, t;
		}
		return r !== null && r !== null && Oe(r), e.callbackPriority = 2, e.callbackNode = null, 2;
	}
	function cd(e, t) {
		if (iu !== 0 && iu !== 5) return e.callbackNode = null, e.callbackPriority = 0, null;
		var n = e.callbackNode;
		if (Hu() && e.callbackNode !== n) return null;
		var r = Y;
		return r = Ye(e, e === q ? r : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1), r === 0 ? null : (gu(e, r, t), sd(e, je()), e.callbackNode != null && e.callbackNode === n ? cd.bind(null, e) : null);
	}
	function ld(e, t) {
		if (Hu()) return null;
		gu(e, t, !0);
	}
	function ud() {
		Yd(function() {
			K & 6 ? De(Ne, ad) : od();
		});
	}
	function dd() {
		if (nd === 0) {
			var e = ca;
			e === 0 && (e = Ke, Ke <<= 1, !(Ke & 261888) && (Ke = 256)), nd = e;
		}
		return nd;
	}
	function fd(e) {
		return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : en("" + e);
	}
	function pd(e, t) {
		var n = t.ownerDocument.createElement("input");
		return n.name = t.name, n.value = t.value, e.id && n.setAttribute("form", e.id), t.parentNode.insertBefore(n, t), e = new FormData(e), n.parentNode.removeChild(n), e;
	}
	function md(e, t, n, r, i) {
		if (t === "submit" && n && n.stateNode === i) {
			var a = fd((i[dt] || null).action), o = r.submitter;
			o && (t = (t = o[dt] || null) ? fd(t.formAction) : o.getAttribute("formAction"), t !== null && (a = t, o = null));
			var s = new yn("action", "action", null, r, i);
			e.push({
				event: s,
				listeners: [{
					instance: null,
					listener: function() {
						if (r.defaultPrevented) {
							if (nd !== 0) {
								var e = o ? pd(i, o) : new FormData(i);
								Ss(n, {
									pending: !0,
									data: e,
									method: i.method,
									action: a
								}, null, e);
							}
						} else typeof a == "function" && (s.preventDefault(), e = o ? pd(i, o) : new FormData(i), Ss(n, {
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
	for (var hd = 0; hd < Gr.length; hd++) {
		var gd = Gr[hd];
		Kr(gd.toLowerCase(), "on" + (gd[0].toUpperCase() + gd.slice(1)));
	}
	Kr(Lr, "onAnimationEnd"), Kr(Rr, "onAnimationIteration"), Kr(zr, "onAnimationStart"), Kr("dblclick", "onDoubleClick"), Kr("focusin", "onFocus"), Kr("focusout", "onBlur"), Kr(Br, "onTransitionRun"), Kr(Vr, "onTransitionStart"), Kr(Hr, "onTransitionCancel"), Kr(Ur, "onTransitionEnd"), Tt("onMouseEnter", ["mouseout", "mouseover"]), Tt("onMouseLeave", ["mouseout", "mouseover"]), Tt("onPointerEnter", ["pointerout", "pointerover"]), Tt("onPointerLeave", ["pointerout", "pointerover"]), wt("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), wt("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), wt("onBeforeInput", [
		"compositionend",
		"keypress",
		"textInput",
		"paste"
	]), wt("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), wt("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), wt("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
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
						qr(e);
					}
					i.currentTarget = null, a = c;
				}
				else for (o = 0; o < r.length; o++) {
					if (s = r[o], c = s.instance, l = s.currentTarget, s = s.listener, c !== a && i.isPropagationStopped()) break a;
					a = s, i.currentTarget = l;
					try {
						a(i);
					} catch (e) {
						qr(e);
					}
					i.currentTarget = null, a = c;
				}
			}
		}
	}
	function Q(e, t) {
		var n = t[pt];
		n === void 0 && (n = t[pt] = /* @__PURE__ */ new Set());
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
			e[xd] = !0, St.forEach(function(t) {
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
		n = i.bind(null, t, n, e), i = void 0, !B || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (i = !0), r ? i === void 0 ? e.addEventListener(t, n, !0) : e.addEventListener(t, n, {
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
					if (s = _t(c), s === null) return;
					if (l = s.tag, l === 5 || l === 6 || l === 26 || l === 27) {
						r = a = s;
						continue a;
					}
					c = c.parentNode;
				}
			}
			r = r.return;
		}
		cn(function() {
			var r = a, i = rn(n), s = [];
			a: {
				var c = Wr.get(e);
				if (c !== void 0) {
					var l = yn, u = e;
					switch (e) {
						case "keypress": if (mn(n) === 0) break a;
						case "keydown":
						case "keyup":
							l = Ln;
							break;
						case "focusin":
							u = "focus", l = On;
							break;
						case "focusout":
							u = "blur", l = On;
							break;
						case "beforeblur":
						case "afterblur":
							l = On;
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
							l = En;
							break;
						case "drag":
						case "dragend":
						case "dragenter":
						case "dragexit":
						case "dragleave":
						case "dragover":
						case "dragstart":
						case "drop":
							l = Dn;
							break;
						case "touchcancel":
						case "touchend":
						case "touchmove":
						case "touchstart":
							l = zn;
							break;
						case Lr:
						case Rr:
						case zr:
							l = kn;
							break;
						case Ur:
							l = Bn;
							break;
						case "scroll":
						case "scrollend":
							l = xn;
							break;
						case "wheel":
							l = Vn;
							break;
						case "copy":
						case "cut":
						case "paste":
							l = An;
							break;
						case "gotpointercapture":
						case "lostpointercapture":
						case "pointercancel":
						case "pointerdown":
						case "pointermove":
						case "pointerout":
						case "pointerover":
						case "pointerup":
							l = Rn;
							break;
						case "toggle":
						case "beforetoggle": l = Hn;
					}
					var d = (t & 4) != 0, f = !d && (e === "scroll" || e === "scrollend"), p = d ? c === null ? null : c + "Capture" : c;
					d = [];
					for (var m = r, h; m !== null;) {
						var g = m;
						if (h = g.stateNode, g = g.tag, g !== 5 && g !== 26 && g !== 27 || h === null || p === null || (g = R(m, p), g != null && d.push(Td(m, g, h))), f) break;
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
					if (c = e === "mouseover" || e === "pointerover", l = e === "mouseout" || e === "pointerout", c && n !== nn && (u = n.relatedTarget || n.fromElement) && (_t(u) || u[ft])) break a;
					if ((l || c) && (c = i.window === i ? i : (c = i.ownerDocument) ? c.defaultView || c.parentWindow : window, l ? (u = n.relatedTarget || n.toElement, l = r, u = u ? _t(u) : null, u !== null && (f = o(u), d = u.tag, u !== f || d !== 5 && d !== 27 && d !== 6) && (u = null)) : (l = null, u = r), l !== u)) {
						if (d = En, g = "onMouseLeave", p = "onMouseEnter", m = "mouse", (e === "pointerout" || e === "pointerover") && (d = Rn, g = "onPointerLeave", p = "onPointerEnter", m = "pointer"), f = l == null ? c : yt(l), h = u == null ? c : yt(u), c = new d(g, m + "leave", l, n, i), c.target = f, c.relatedTarget = h, g = null, _t(i) === r && (d = new d(p, m + "enter", u, n, i), d.target = h, d.relatedTarget = f, g = d), f = g, l && u) b: {
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
					if (c = r ? yt(r) : window, l = c.nodeName && c.nodeName.toLowerCase(), l === "select" || l === "input" && c.type === "file") var v = V;
					else if (nr(c)) if (cr) v = _r;
					else {
						v = hr;
						var y = mr;
					}
					else l = c.nodeName, !l || l.toLowerCase() !== "input" || c.type !== "checkbox" && c.type !== "radio" ? r && Zt(r.elementType) && (v = V) : v = gr;
					if (v &&= v(e, r)) {
						rr(s, v, n, i);
						break a;
					}
					y && y(e, c, r), e === "focusout" && r && c.type === "number" && r.memoizedProps.value != null && Ut(c, "number", c.value);
				}
				switch (y = r ? yt(r) : window, e) {
					case "focusin":
						(nr(y) || y.contentEditable === "true") && (Dr = y, Or = r, kr = null);
						break;
					case "focusout":
						kr = Or = Dr = null;
						break;
					case "mousedown":
						Ar = !0;
						break;
					case "contextmenu":
					case "mouseup":
					case "dragend":
						Ar = !1, jr(s, n, i);
						break;
					case "selectionchange": if (Er) break;
					case "keydown":
					case "keyup": jr(s, n, i);
				}
				var b;
				if (Wn) b: {
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
				else Qn ? Xn(e, n) && (x = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (x = "onCompositionStart");
				x && (qn && n.locale !== "ko" && (Qn || x !== "onCompositionStart" ? x === "onCompositionEnd" && Qn && (b = pn()) : (un = i, dn = "value" in un ? un.value : un.textContent, Qn = !0)), y = Ed(r, x), 0 < y.length && (x = new jn(x, e, null, n, i), s.push({
					event: x,
					listeners: y
				}), b ? x.data = b : (b = Zn(n), b !== null && (x.data = b)))), (b = Kn ? $n(e, n) : er(e, n)) && (x = Ed(r, "onBeforeInput"), 0 < x.length && (y = new jn("onBeforeInput", "beforeinput", null, n, i), s.push({
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
			if (i = i.tag, i !== 5 && i !== 26 && i !== 27 || a === null || (i = R(e, n), i != null && r.unshift(Td(e, i, a)), i = R(e, t), i != null && r.push(Td(e, i, a))), e.tag === 3) return r;
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
			s !== 5 && s !== 26 && s !== 27 || l === null || (c = l, i ? (l = R(n, a), l != null && o.unshift(Td(n, l, c))) : i || (l = R(n, a), l != null && o.push(Td(n, l, c)))), n = n.return;
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
				typeof r == "string" ? t === "body" || t === "textarea" && r === "" || qt(e, r) : (typeof r == "number" || typeof r == "bigint") && t !== "body" && qt(e, "" + r);
				break;
			case "className":
				jt(e, "class", r);
				break;
			case "tabIndex":
				jt(e, "tabindex", r);
				break;
			case "dir":
			case "role":
			case "viewBox":
			case "width":
			case "height":
				jt(e, n, r);
				break;
			case "style":
				Xt(e, r, o);
				break;
			case "data": if (t !== "object") {
				jt(e, "data", r);
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
				r = en("" + r), e.setAttribute(n, r);
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
				r = en("" + r), e.setAttribute(n, r);
				break;
			case "onClick":
				r != null && (e.onclick = tn);
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
				n = en("" + r), e.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", n);
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
				Q("beforetoggle", e), Q("toggle", e), At(e, "popover", r);
				break;
			case "xlinkActuate":
				Mt(e, "http://www.w3.org/1999/xlink", "xlink:actuate", r);
				break;
			case "xlinkArcrole":
				Mt(e, "http://www.w3.org/1999/xlink", "xlink:arcrole", r);
				break;
			case "xlinkRole":
				Mt(e, "http://www.w3.org/1999/xlink", "xlink:role", r);
				break;
			case "xlinkShow":
				Mt(e, "http://www.w3.org/1999/xlink", "xlink:show", r);
				break;
			case "xlinkTitle":
				Mt(e, "http://www.w3.org/1999/xlink", "xlink:title", r);
				break;
			case "xlinkType":
				Mt(e, "http://www.w3.org/1999/xlink", "xlink:type", r);
				break;
			case "xmlBase":
				Mt(e, "http://www.w3.org/XML/1998/namespace", "xml:base", r);
				break;
			case "xmlLang":
				Mt(e, "http://www.w3.org/XML/1998/namespace", "xml:lang", r);
				break;
			case "xmlSpace":
				Mt(e, "http://www.w3.org/XML/1998/namespace", "xml:space", r);
				break;
			case "is":
				At(e, "is", r);
				break;
			case "innerText":
			case "textContent": break;
			default: (!(2 < n.length) || n[0] !== "o" && n[0] !== "O" || n[1] !== "n" && n[1] !== "N") && (n = Qt.get(n) || n, At(e, n, r));
		}
	}
	function Nd(e, t, n, r, a, o) {
		switch (n) {
			case "style":
				Xt(e, r, o);
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
				typeof r == "string" ? qt(e, r) : (typeof r == "number" || typeof r == "bigint") && qt(e, "" + r);
				break;
			case "onScroll":
				r != null && Q("scroll", e);
				break;
			case "onScrollEnd":
				r != null && Q("scrollend", e);
				break;
			case "onClick":
				r != null && (e.onclick = tn);
				break;
			case "suppressContentEditableWarning":
			case "suppressHydrationWarning":
			case "innerHTML":
			case "ref": break;
			case "innerText":
			case "textContent": break;
			default: if (!Ct.hasOwnProperty(n)) a: {
				if (n[0] === "o" && n[1] === "n" && (a = n.endsWith("Capture"), t = n.slice(2, a ? n.length - 7 : void 0), o = e[dt] || null, o = o == null ? null : o[n], typeof o == "function" && e.removeEventListener(t, o, a), typeof r == "function")) {
					typeof o != "function" && o !== null && (n in e ? e[n] = null : e.hasAttribute(n) && e.removeAttribute(n)), e.addEventListener(t, r, a);
					break a;
				}
				n in e ? e[n] = r : !0 === r ? e.setAttribute(n, "") : At(e, n, r);
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
				Ht(e, o, c, l, u, s, a, !1);
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
				t = o, n = s, e.multiple = !!r, t == null ? n != null && Wt(e, !!r, n, !0) : Wt(e, !!r, t, !1);
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
				Kt(e, r, a, o);
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
			default: if (Zt(t)) {
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
				Vt(e, s, c, l, u, d, o, a);
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
				t = c, n = s, r = m, p == null ? !!r != !!n && (t == null ? Wt(e, !!n, n ? [] : "", !1) : Wt(e, !!n, t, !0)) : Wt(e, !!n, p, !1);
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
				Gt(e, p, m);
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
			default: if (Zt(t)) {
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
					a[F] || s === "SCRIPT" || s === "STYLE" || s === "LINK" && a.rel.toLowerCase() === "stylesheet" || n.removeChild(a), a = o;
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
					ef(n), I(n);
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
			else if (!e[F]) switch (t) {
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
		I(e);
	}
	var mf = /* @__PURE__ */ new Map(), hf = /* @__PURE__ */ new Set();
	function gf(e) {
		return typeof e.getRootNode == "function" ? e.getRootNode() : e.nodeType === 9 ? e : e.ownerDocument;
	}
	var _f = k.d;
	k.d = {
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
		var t = vt(e);
		t !== null && t.tag === 5 && t.type === "form" ? ws(t) : _f.r(e);
	}
	var bf = typeof document > "u" ? null : document;
	function xf(e, t, n) {
		var r = bf;
		if (r && typeof t == "string" && t) {
			var i = Bt(t);
			i = "link[rel=\"" + e + "\"][href=\"" + i + "\"]", typeof n == "string" && (i += "[crossorigin=\"" + n + "\"]"), hf.has(i) || (hf.add(i), e = {
				rel: e,
				crossOrigin: n,
				href: t
			}, r.querySelector(i) === null && (t = r.createElement("link"), Pd(t, "link", e), xt(t), r.head.appendChild(t)));
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
			var i = "link[rel=\"preload\"][as=\"" + Bt(t) + "\"]";
			t === "image" && n && n.imageSrcSet ? (i += "[imagesrcset=\"" + Bt(n.imageSrcSet) + "\"]", typeof n.imageSizes == "string" && (i += "[imagesizes=\"" + Bt(n.imageSizes) + "\"]")) : i += "[href=\"" + Bt(e) + "\"]";
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
			}, n), mf.set(a, e), r.querySelector(i) !== null || t === "style" && r.querySelector(jf(a)) || t === "script" && r.querySelector(Ff(a)) || (t = r.createElement("link"), Pd(t, "link", e), xt(t), r.head.appendChild(t)));
		}
	}
	function Tf(e, t) {
		_f.m(e, t);
		var n = bf;
		if (n && e) {
			var r = t && typeof t.as == "string" ? t.as : "script", i = "link[rel=\"modulepreload\"][as=\"" + Bt(r) + "\"][href=\"" + Bt(e) + "\"]", a = i;
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
				r = n.createElement("link"), Pd(r, "link", e), xt(r), n.head.appendChild(r);
			}
		}
	}
	function Ef(e, t, n) {
		_f.S(e, t, n);
		var r = bf;
		if (r && e) {
			var i = bt(r).hoistableStyles, a = Af(e);
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
					xt(c), Pd(c, "link", e), c._p = new Promise(function(e, t) {
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
			var r = bt(n).hoistableScripts, i = Pf(e), a = r.get(i);
			a || (a = n.querySelector(Ff(i)), a || (e = h({
				src: e,
				async: !0
			}, t), (t = mf.get(i)) && zf(e, t), a = n.createElement("script"), xt(a), Pd(a, "link", e), n.head.appendChild(a)), a = {
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
			var r = bt(n).hoistableScripts, i = Pf(e), a = r.get(i);
			a || (a = n.querySelector(Ff(i)), a || (e = h({
				src: e,
				async: !0,
				type: "module"
			}, t), (t = mf.get(i)) && zf(e, t), a = n.createElement("script"), xt(a), Pd(a, "link", e), n.head.appendChild(a)), a = {
				type: "script",
				instance: a,
				count: 1,
				state: null
			}, r.set(i, a));
		}
	}
	function kf(e, t, n, r) {
		var a = (a = me.current) ? gf(a) : null;
		if (!a) throw Error(i(446));
		switch (e) {
			case "meta":
			case "title": return null;
			case "style": return typeof n.precedence == "string" && typeof n.href == "string" ? (t = Af(n.href), n = bt(a).hoistableStyles, r = n.get(t), r || (r = {
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
					var o = bt(a).hoistableStyles, s = o.get(e);
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
			case "script": return t = n.async, n = n.src, typeof n == "string" && t && typeof t != "function" && typeof t != "symbol" ? (t = Pf(n), n = bt(a).hoistableScripts, r = n.get(t), r || (r = {
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
		return "href=\"" + Bt(e) + "\"";
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
		}), Pd(t, "link", n), xt(t), e.head.appendChild(t));
	}
	function Pf(e) {
		return "[src=\"" + Bt(e) + "\"]";
	}
	function Ff(e) {
		return "script[async]" + e;
	}
	function If(e, t, n) {
		if (t.count++, t.instance === null) switch (t.type) {
			case "style":
				var r = e.querySelector("style[data-href~=\"" + Bt(n.href) + "\"]");
				if (r) return t.instance = r, xt(r), r;
				var a = h({}, n, {
					"data-href": n.href,
					"data-precedence": n.precedence,
					href: null,
					precedence: null
				});
				return r = (e.ownerDocument || e).createElement("style"), xt(r), Pd(r, "style", a), Lf(r, n.precedence, e), t.instance = r;
			case "stylesheet":
				a = Af(n.href);
				var o = e.querySelector(jf(a));
				if (o) return t.state.loading |= 4, t.instance = o, xt(o), o;
				r = Mf(n), (a = mf.get(a)) && Rf(r, a), o = (e.ownerDocument || e).createElement("link"), xt(o);
				var s = o;
				return s._p = new Promise(function(e, t) {
					s.onload = e, s.onerror = t;
				}), Pd(o, "link", r), t.state.loading |= 4, Lf(o, n.precedence, e), t.instance = o;
			case "script": return o = Pf(n.src), (a = e.querySelector(Ff(o))) ? (t.instance = a, xt(a), a) : (r = n, (a = mf.get(o)) && (r = h({}, n), zf(r, a)), e = e.ownerDocument || e, a = e.createElement("script"), xt(a), Pd(a, "link", r), e.head.appendChild(a), t.instance = a);
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
			if (!(a[F] || a[ut] || e === "link" && a.getAttribute("rel") === "stylesheet") && a.namespaceURI !== "http://www.w3.org/2000/svg") {
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
					t = a._p, typeof t == "object" && t && typeof t.then == "function" && (e.count++, e = Jf.bind(e), t.then(e, e)), n.state.loading |= 4, n.instance = a, xt(a);
					return;
				}
				a = t.ownerDocument || t, r = Mf(r), (i = mf.get(i)) && Rf(r, i), a = a.createElement("link"), xt(a);
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
		$$typeof: S,
		Provider: null,
		Consumer: null,
		_currentValue: ce,
		_currentValue2: ce,
		_threadCount: 0
	};
	function $f(e, t, n, r, i, a, o, s, c) {
		this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = $e(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = $e(0), this.hiddenUpdates = $e(null), this.identifierPrefix = r, this.onUncaughtError = i, this.onCaughtError = a, this.onRecoverableError = o, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = c, this.incompleteTransitions = /* @__PURE__ */ new Map();
	}
	function ep(e, t, n, r, i, a, o, s, c, l, u, d) {
		return e = new $f(e, t, n, o, c, l, u, d, s), t = 1, !0 === a && (t |= 24), a = ai(3, null, null, t), e.current = a, a.stateNode = e, t = ia(), t.refCount++, e.pooledCache = t, t.refCount++, a.memoizedState = {
			element: r,
			isDehydrated: n,
			cache: t
		}, La(a), e;
	}
	function tp(e) {
		return e ? (e = ri, e) : ri;
	}
	function np(e, t, n, r, i, a) {
		i = tp(i), r.context === null ? r.context = i : r.pendingContext = i, r = za(t), r.payload = { element: n }, a = a === void 0 ? null : a, a !== null && (r.callback = a), n = Ba(e, r, t), n !== null && (hu(n, e, t), Va(n, e, t));
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
			var t = ei(e, 67108864);
			t !== null && hu(t, e, 67108864), ip(e, 67108864);
		}
	}
	function op(e) {
		if (e.tag === 13 || e.tag === 31) {
			var t = pu();
			t = at(t);
			var n = ei(e, t);
			n !== null && hu(n, e, t), ip(e, t);
		}
	}
	var sp = !0;
	function cp(e, t, n, r) {
		var i = O.T;
		O.T = null;
		var a = k.p;
		try {
			k.p = 2, up(e, t, n, r);
		} finally {
			k.p = a, O.T = i;
		}
	}
	function lp(e, t, n, r) {
		var i = O.T;
		O.T = null;
		var a = k.p;
		try {
			k.p = 8, up(e, t, n, r);
		} finally {
			k.p = a, O.T = i;
		}
	}
	function up(e, t, n, r) {
		if (sp) {
			var i = dp(r);
			if (i === null) wd(e, t, r, fp, n), Cp(e, r);
			else if (Tp(i, e, t, n, r)) r.stopPropagation();
			else if (Cp(e, r), t & 4 && -1 < Sp.indexOf(e)) {
				for (; i !== null;) {
					var a = vt(i);
					if (a !== null) switch (a.tag) {
						case 3:
							if (a = a.stateNode, a.current.memoizedState.isDehydrated) {
								var o = Je(a.pendingLanes);
								if (o !== 0) {
									var s = a;
									for (s.pendingLanes |= 2, s.entangledLanes |= 2; o;) {
										var c = 1 << 31 - Ue(o);
										s.entanglements[1] |= c, o &= ~c;
									}
									rd(a), !(K & 6) && (tu = je() + 500, id(0, !1));
								}
							}
							break;
						case 31:
						case 13: s = ei(a, 2), s !== null && hu(s, a, 2), bu(), ip(a, 2);
					}
					if (a = dp(r), a === null && wd(e, t, r, fp, n), a === i) break;
					i = a;
				}
				i !== null && r.stopPropagation();
			} else wd(e, t, r, null, n);
		}
	}
	function dp(e) {
		return e = rn(e), pp(e);
	}
	var fp = null;
	function pp(e) {
		if (fp = null, e = _t(e), e !== null) {
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
			case "message": switch (Me()) {
				case Ne: return 2;
				case Pe: return 8;
				case Fe:
				case Ie: return 32;
				case Le: return 268435456;
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
		}, t !== null && (t = vt(t), t !== null && ap(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, i !== null && t.indexOf(i) === -1 && t.push(i), e);
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
		var t = _t(e.target);
		if (t !== null) {
			var n = o(t);
			if (n !== null) {
				if (t = n.tag, t === 13) {
					if (t = s(n), t !== null) {
						e.blockedOn = t, ct(e.priority, function() {
							op(n);
						});
						return;
					}
				} else if (t === 31) {
					if (t = c(n), t !== null) {
						e.blockedOn = t, ct(e.priority, function() {
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
				nn = r, n.target.dispatchEvent(r), nn = null;
			} else return t = vt(n), t !== null && ap(t), e.blockedOn = n, !1;
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
				var a = vt(n);
				a !== null && (e.splice(t, 3), t -= 3, Ss(a, {
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
			var i = n[r], a = n[r + 1], o = i[dt] || null;
			if (typeof a == "function") o || Mp(n);
			else if (o) {
				var s = null;
				if (a && a.hasAttribute("formAction")) {
					if (i = a, o = a[dt] || null) s = o.formAction;
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
			np(e.current, 2, null, e, null, null), bu(), t[ft] = null;
		}
	};
	function Ip(e) {
		this._internalRoot = e;
	}
	Ip.prototype.unstable_scheduleHydration = function(e) {
		if (e) {
			var t = st();
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
	k.findDOMNode = function(e) {
		var t = e._reactInternals;
		if (t === void 0) throw typeof e.render == "function" ? Error(i(188)) : (e = Object.keys(e).join(","), Error(i(268, e)));
		return e = d(t), e = e === null ? null : p(e), e = e === null ? null : e.stateNode, e;
	};
	var Rp = {
		bundleType: 0,
		version: "19.2.6",
		rendererPackageName: "react-dom",
		currentDispatcherRef: O,
		reconcilerVersion: "19.2.6"
	};
	if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
		var zp = __REACT_DEVTOOLS_GLOBAL_HOOK__;
		if (!zp.isDisabled && zp.supportsFiber) try {
			Be = zp.inject(Rp), Ve = zp;
		} catch {}
	}
	e.createRoot = function(e, t) {
		if (!a(e)) throw Error(i(299));
		var n = !1, r = "", o = Gs, s = Ks, c = qs;
		return t != null && (!0 === t.unstable_strictMode && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onUncaughtError !== void 0 && (o = t.onUncaughtError), t.onCaughtError !== void 0 && (s = t.onCaughtError), t.onRecoverableError !== void 0 && (c = t.onRecoverableError)), t = ep(e, 1, !1, null, null, n, r, null, o, s, c, Pp), e[ft] = t.current, Sd(e), new Fp(t);
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
}, ee = (e) => Math.round((e + 2 ** -52 * Math.abs(e)) * 100);
function S(e) {
	let t = { ...x };
	if (!e || typeof e != "object") return t;
	for (let n of Object.keys(t)) {
		let r = e[n];
		typeof r == "number" && Number.isFinite(r) && r >= 0 && (t[n] = ee(Math.min(r, 1e8)) / 100);
	}
	return t.deadlineMonths = Math.floor(t.deadlineMonths), t;
}
//#endregion
//#region app/annual-budget-model.ts
var C = {
	allocationVersion: 2,
	salary: 13e3,
	awayMonths: 3,
	paidDays: 90,
	allowanceUsd: 110,
	dailySpendUsd: 60,
	budgetFx: 6.7,
	emergencyCurrent: 2e3,
	emergencyTargetMonths: 6,
	basicMeals: 1800,
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
			normal: 1e3,
			trip: 1e3,
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
}, w = (e) => Math.round((e + 2 ** -52 * Math.abs(e)) * 100) / 100, te = (e) => Math.round(w(e) * 100), T = [
	"salary",
	"awayMonths",
	"paidDays",
	"allowanceUsd",
	"dailySpendUsd",
	"budgetFx",
	"emergencyCurrent",
	"emergencyTargetMonths",
	"basicMeals",
	"bufferMonths"
];
function E(e) {
	let t = {
		...C,
		rows: C.rows.map((e) => ({ ...e }))
	};
	if (!e || typeof e != "object") return t;
	let n = e;
	for (let e of T) {
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
				return t + te(typeof o == "number" && Number.isFinite(o) && o >= 0 ? Math.min(o, 1e8) : a[e]);
			}, 0) / 100, o = i === "normal" ? Math.min(1e3, a) : 0;
			t.rows.find((e) => e.id === "small")[i] = o, t.rows.find((e) => e.id === "daily")[i] = w(a - o);
		}
		t.salary === 13e3 && t.rows.every((e) => {
			let t = C.rows.find((t) => t.id === e.id);
			return e.normal === (e.id === "daily" ? 4250 : e.id === "emergency" ? 500 : t.normal) && e.trip === (e.id === "emergency" ? 500 : t.trip);
		}) && (t.rows.find((e) => e.id === "daily").normal = 1e3);
	}
	if (n.allocationVersion !== 2) {
		let e = t.rows.find((e) => e.id === "emergency");
		for (let t of ["normal", "trip"]) e[t] === 500 && (e[t] = 1e3);
	}
	return t;
}
function ne(e, t = e.bonusAfterTax ?? 0) {
	let n = re(e), r = w(t), i = w(n.annualIncome + r), a = w(n.annualSaving + r), o = w(n.annualEmergency + n.annualSurplus + r), s = w(n.annualRetained + r);
	return {
		bonus: r,
		incomeWithBonus: i,
		fixedTarget: a,
		projectedCash: o,
		projectedAccumulation: s,
		accumulationRate: i > 0 ? s / i : null
	};
}
function re(e) {
	let t = 12 - e.awayMonths, n = w(e.allowanceUsd - e.dailySpendUsd), r = w(e.salary * 12), i = w(e.paidDays * n * e.budgetFx), a = w(r + i), o = e.rows.map((n) => ({
		...n,
		annual: (te(n.normal) * t + te(n.trip) * e.awayMonths) / 100
	})), s = o.find((e) => e.id === "learning"), c = o.filter((e) => e.id !== "learning").map((e) => e.id === "emergency" ? {
		...e,
		id: "emergencyLearning",
		name: "应急&学习金",
		note: "应急储备与学习消费分别核算",
		normal: w(e.normal + (s?.normal ?? 0)),
		trip: w(e.trip + (s?.trip ?? 0)),
		annual: w(e.annual + (s?.annual ?? 0))
	} : e), l = (e) => o.filter((t) => t.kind === e).reduce((e, t) => e + te(t.annual), 0) / 100, u = l("consumption"), d = l("investment"), f = l("emergency"), p = w(d + f), m = w(u + p), h = w(a - m), g = w(a - u), _ = (t) => {
		let n = o.filter((e) => e.kind === "consumption").reduce((e, n) => e + te(n[t]), 0) / 100, r = o.filter((e) => e.kind !== "consumption").reduce((e, n) => e + te(n[t]), 0) / 100, a = t === "trip" && e.awayMonths > 0 ? w(i / e.awayMonths) : 0, s = w(e.salary + a), c = w(n + r);
		return {
			consumption: n,
			saving: r,
			tripNet: a,
			income: s,
			totalOutflow: c,
			surplus: w(s - c)
		};
	}, v = _("normal"), y = _("trip"), b = w(v.surplus * t), x = w(i + (e.salary - y.totalOutflow) * e.awayMonths), ee = Math.max(0, -v.surplus), S = w(ee * e.bufferMonths), C = w((o.find((e) => e.id === "rent")?.normal ?? 0) + (o.find((e) => e.id === "parents")?.normal ?? 0) + e.basicMeals), T = w(C * e.emergencyTargetMonths), E = w(e.emergencyCurrent + f), ne = w(n * e.budgetFx), re = ne > 0 ? Math.ceil(Math.max(0, w(m - r)) / ne) : null;
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
		dailyNetCny: ne,
		normal: v,
		trip: y,
		annualNormalSurplus: b,
		annualTripSurplus: x,
		normalDeficit: ee,
		buffer: S,
		basicNeed: C,
		emergencyTarget: T,
		emergencyYearEnd: E,
		emergencyGap: Math.max(0, w(T - E)),
		requiredTripDays: re,
		assumptionsConflict: e.paidDays > e.awayMonths * 31
	};
}
//#endregion
//#region app/annual-budget-plan.tsx
var D = (e) => `¥${e.toLocaleString("zh-CN", { maximumFractionDigits: 2 })}`;
function ie({ plan: e, onChange: t }) {
	let n = re(e), r = ne(e), i = e.bonusAfterTax !== null, a = [
		1e4,
		2e4,
		3e4
	].map((t) => ne(e, t)), o = (e) => e === null ? "—" : `${(e * 100).toFixed(1)}%`, s = n.rows.find((e) => e.kind === "investment"), c = n.rows.find((e) => e.kind === "emergency"), l = (e) => e?.normal === e?.trip ? `每月${D(e?.normal ?? 0)}` : `不出差月份${D(e?.normal ?? 0)}、出差月份${D(e?.trip ?? 0)}`;
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
								/* @__PURE__ */ (0, b.jsx)("td", { children: D(n.annualInvestment) }),
								/* @__PURE__ */ (0, b.jsxs)("td", { children: [l(s), "，属于投入本金"] })
							] }),
							/* @__PURE__ */ (0, b.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, b.jsx)("th", {
									scope: "row",
									children: "固定应急储蓄"
								}),
								/* @__PURE__ */ (0, b.jsx)("td", { children: D(n.annualEmergency) }),
								/* @__PURE__ */ (0, b.jsxs)("td", { children: [l(c), "，属于新增现金储备"] })
							] }),
							/* @__PURE__ */ (0, b.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, b.jsx)("th", {
									scope: "row",
									children: "基础预算剩余"
								}),
								/* @__PURE__ */ (0, b.jsx)("td", { children: D(n.annualSurplus) }),
								/* @__PURE__ */ (0, b.jsx)("td", { children: "年末确实未花掉，才算实际积蓄" })
							] }),
							/* @__PURE__ */ (0, b.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, b.jsx)("th", {
									scope: "row",
									children: "年终奖 + 额外绩效奖金"
								}),
								/* @__PURE__ */ (0, b.jsx)("td", { children: i ? D(r.bonus) : "记为 B（待确认）" }),
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
										children: i ? D(r.fixedTarget) : `${D(n.annualSaving)} + B`
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
								children: i ? D(r.projectedAccumulation) : `${D(n.annualRetained)} + B`
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
						D(r.bonus),
						" 测算"
					] }),
					/* @__PURE__ */ (0, b.jsx)("strong", { children: r.projectedCash >= 0 ? `预计新增现金积蓄 ${D(r.projectedCash)}` : `预计现金缺口 ${D(-r.projectedCash)}` }),
					/* @__PURE__ */ (0, b.jsxs)("span", { children: [
						"加上投资本金 ",
						D(n.annualInvestment),
						"，预计全年积累 ",
						D(r.projectedAccumulation),
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
							children: D(e.bonus)
						}),
						/* @__PURE__ */ (0, b.jsx)("td", { children: D(e.projectedCash) }),
						/* @__PURE__ */ (0, b.jsx)("td", { children: /* @__PURE__ */ (0, b.jsx)("strong", { children: D(e.projectedAccumulation) }) }),
						/* @__PURE__ */ (0, b.jsx)("td", { children: /* @__PURE__ */ (0, b.jsx)("strong", { children: o(e.accumulationRate) }) })
					] }, e.bonus)) })]
				})
			}),
			/* @__PURE__ */ (0, b.jsxs)("p", {
				className: "annual-budget-note",
				children: [
					"新增现金积蓄 = 应急新增",
					D(n.annualEmergency),
					" + 基础预算余量",
					D(n.annualSurplus),
					" + B；比例的分母 = 工资 + 出差净结余 + 该情景的税后奖金。所有金额随上方预算联动。"
				]
			})
		]
	});
}
function ae({ plan: e, onChange: t, titleId: n }) {
	let [r, i] = (0, _.useState)(!1), a = re(e), o = (n, r, i) => t(E({
		...e,
		rows: e.rows.map((e) => e.id === n ? {
			...e,
			[r]: Number(i)
		} : e)
	}));
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
				] })] }), /* @__PURE__ */ (0, b.jsx)("button", {
					type: "button",
					"aria-pressed": r,
					onClick: () => i((e) => !e),
					children: r ? "完成编辑" : "编辑分配金额"
				})]
			}),
			/* @__PURE__ */ (0, b.jsx)("div", {
				className: "annual-table-scroll",
				tabIndex: 0,
				role: "region",
				"aria-label": "完整分配表横向滚动区域",
				children: /* @__PURE__ */ (0, b.jsxs)("table", {
					className: "annual-budget-table",
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
									children: t.id === "emergencyLearning" ? /* @__PURE__ */ (0, b.jsxs)(b.Fragment, { children: [/* @__PURE__ */ (0, b.jsx)("strong", { children: D(t[n]) }), ["emergency", "learning"].map((e) => {
										let t = a.rows.find((t) => t.id === e);
										return r ? /* @__PURE__ */ (0, b.jsxs)("label", {
											className: "annual-combined-edit",
											children: [/* @__PURE__ */ (0, b.jsx)("span", { children: e === "emergency" ? "应急" : "学习" }), /* @__PURE__ */ (0, b.jsx)("input", {
												type: "number",
												min: "0",
												step: "50",
												"aria-label": `${t.name}${n === "normal" ? "不出差月份" : "出差月份"}预算`,
												value: t[n],
												onChange: (t) => o(e, n, t.target.value)
											})]
										}, e) : /* @__PURE__ */ (0, b.jsxs)("small", {
											className: "annual-combined-part",
											children: [
												e === "emergency" ? "应急" : "学习",
												" ",
												D(t[n])
											]
										}, e);
									})] }) : r ? /* @__PURE__ */ (0, b.jsx)("input", {
										type: "number",
										min: "0",
										step: "50",
										"aria-label": `${t.name}${n === "normal" ? "不出差月份" : "出差月份"}预算`,
										value: t[n],
										onChange: (e) => o(t.id, n, e.target.value)
									}) : D(t[n])
								}, n)),
								/* @__PURE__ */ (0, b.jsx)("td", { children: D(t.annual) })
							]
						}, t.id)) }),
						/* @__PURE__ */ (0, b.jsx)("tfoot", { children: /* @__PURE__ */ (0, b.jsxs)("tr", { children: [
							/* @__PURE__ */ (0, b.jsx)("th", {
								scope: "row",
								children: "全部资金分配"
							}),
							/* @__PURE__ */ (0, b.jsx)("td", { children: D(a.normal.totalOutflow) }),
							/* @__PURE__ */ (0, b.jsx)("td", { children: D(a.trip.totalOutflow) }),
							/* @__PURE__ */ (0, b.jsx)("td", { children: D(a.annualOutflow) })
						] }) })
					]
				})
			}),
			/* @__PURE__ */ (0, b.jsxs)("p", {
				className: "annual-budget-note",
				children: [
					"小额支付普通月",
					D(a.rows.find((e) => e.id === "small")?.normal ?? 0),
					"、出差月",
					D(a.rows.find((e) => e.id === "small")?.trip ?? 0),
					"。日常使用承接其余生活消费；投资与应急基金合计全年",
					D(a.annualSaving),
					"，其余消费及消费预留合计",
					D(a.annualConsumption),
					"。账户间转账不算消费，基金支付不重复记账。"
				]
			})
		]
	});
}
function oe({ plan: e, onChange: t }) {
	let n = re(e), r = n.annualSurplus >= 0 && !n.assumptionsConflict, i = (n, r) => t(E({
		...e,
		[n]: Number(r)
	})), a = (n) => t({
		...e,
		mode: n
	}), o = [
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
			key: "basicMeals",
			label: "应急测算基本餐饮",
			unit: "元 / 月，目标下限口径",
			step: "100"
		},
		{
			key: "bufferMonths",
			label: "连续普通月周转测算",
			unit: "个月",
			step: "1"
		}
	], s = [
		{
			label: "生活与消费预留",
			amount: n.annualConsumption,
			className: "consumption"
		},
		{
			label: "投资本金",
			amount: n.annualInvestment,
			className: "investment"
		},
		{
			label: "新增应急现金",
			amount: n.annualEmergency,
			className: "emergency"
		},
		{
			label: "额外现金余量",
			amount: Math.max(0, n.annualSurplus),
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
						n.normalMonths,
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
					className: `annual-budget-status ${r ? "positive" : "negative"}`,
					role: "status",
					children: n.assumptionsConflict ? "出差条件需校正" : r ? n.normalDeficit > 0 ? "全年可覆盖，需留周转金" : "普通月与全年预算可覆盖" : "全年存在资金缺口"
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
							children: D(n.annualIncome)
						}),
						/* @__PURE__ */ (0, b.jsxs)("small", { children: [
							"工资 ",
							D(n.annualSalary),
							" + 出差净结余 ",
							D(n.annualTripNet)
						] })
					] }),
					/* @__PURE__ */ (0, b.jsxs)("article", { children: [
						/* @__PURE__ */ (0, b.jsx)("span", { children: "全年全部安排" }),
						/* @__PURE__ */ (0, b.jsx)("strong", {
							"data-testid": "annual-outflow",
							children: D(n.annualOutflow)
						}),
						/* @__PURE__ */ (0, b.jsx)("small", { children: "含生活消费、投资本金与应急储备" })
					] }),
					/* @__PURE__ */ (0, b.jsxs)("article", { children: [
						/* @__PURE__ */ (0, b.jsx)("span", { children: "全年投资与应急储备" }),
						/* @__PURE__ */ (0, b.jsx)("strong", {
							"data-testid": "annual-saving",
							children: D(n.annualSaving)
						}),
						/* @__PURE__ */ (0, b.jsxs)("small", { children: [
							"投资 ",
							D(n.annualInvestment),
							" + 应急 ",
							D(n.annualEmergency)
						] })
					] }),
					/* @__PURE__ */ (0, b.jsxs)("article", {
						className: n.annualSurplus < 0 ? "negative" : "positive",
						children: [
							/* @__PURE__ */ (0, b.jsx)("span", { children: "完成以上安排后的余量" }),
							/* @__PURE__ */ (0, b.jsx)("strong", {
								"data-testid": "annual-surplus",
								children: D(n.annualSurplus)
							}),
							/* @__PURE__ */ (0, b.jsxs)("small", { children: [
								"平均每月 ",
								D(n.averageSurplus),
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
					children: s.filter((e) => e.amount > 0).map((e) => /* @__PURE__ */ (0, b.jsx)("span", {
						className: e.className,
						style: { flexGrow: e.amount }
					}, e.label))
				}), /* @__PURE__ */ (0, b.jsx)("div", {
					className: "annual-budget-legend",
					children: s.map((e) => /* @__PURE__ */ (0, b.jsxs)("span", { children: [
						/* @__PURE__ */ (0, b.jsx)("i", { className: e.className }),
						e.label,
						/* @__PURE__ */ (0, b.jsx)("b", { children: D(e.amount) })
					] }, e.label))
				})]
			}),
			/* @__PURE__ */ (0, b.jsx)(ae, {
				plan: e,
				onChange: t,
				titleId: "annual-allocation-title"
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
							onClick: () => a("normal"),
							children: [
								/* @__PURE__ */ (0, b.jsxs)("span", { children: [
									"普通月份 · 全年",
									n.normalMonths,
									"个月"
								] }),
								/* @__PURE__ */ (0, b.jsx)("strong", {
									className: n.normal.surplus < 0 ? "negative" : "positive",
									"data-testid": "normal-month-surplus",
									children: D(n.normal.surplus)
								}),
								/* @__PURE__ */ (0, b.jsxs)("small", { children: [
									"工资 ",
									D(e.salary),
									" − 全部安排 ",
									D(n.normal.totalOutflow)
								] }),
								/* @__PURE__ */ (0, b.jsx)("em", { children: n.normal.surplus < 0 ? "每月需要预留出差结余来补足" : "普通月工资可覆盖当前安排" })
							]
						}), /* @__PURE__ */ (0, b.jsxs)("button", {
							type: "button",
							"aria-pressed": e.mode === "trip",
							"data-testid": "trip-month-mode",
							disabled: e.awayMonths === 0,
							onClick: () => a("trip"),
							children: [
								/* @__PURE__ */ (0, b.jsxs)("span", { children: [
									"出差月份 · 全年",
									e.awayMonths,
									"个月"
								] }),
								/* @__PURE__ */ (0, b.jsx)("strong", {
									className: n.trip.surplus < 0 ? "negative" : "positive",
									"data-testid": "trip-month-surplus",
									children: D(n.trip.surplus)
								}),
								/* @__PURE__ */ (0, b.jsxs)("small", { children: [
									"工资 + 平均出差净结余 ",
									D(n.trip.income),
									" − 安排 ",
									D(n.trip.totalOutflow)
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
							n.netUsd,
							"；全年：",
							e.paidDays,
							"天 × $",
							n.netUsd,
							" × ",
							e.budgetFx.toFixed(2),
							" = ",
							D(n.annualTripNet),
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
										/* @__PURE__ */ (0, b.jsx)("td", { children: D(e.salary) }),
										/* @__PURE__ */ (0, b.jsx)("td", { children: D(e.salary) }),
										/* @__PURE__ */ (0, b.jsx)("td", { children: D(n.annualSalary) })
									] }),
									/* @__PURE__ */ (0, b.jsxs)("tr", { children: [
										/* @__PURE__ */ (0, b.jsx)("th", {
											scope: "row",
											children: "出差净结余"
										}),
										/* @__PURE__ */ (0, b.jsx)("td", { children: D(0) }),
										/* @__PURE__ */ (0, b.jsx)("td", { children: D(n.trip.tripNet) }),
										/* @__PURE__ */ (0, b.jsx)("td", { children: D(n.annualTripNet) })
									] }),
									/* @__PURE__ */ (0, b.jsxs)("tr", {
										className: "annual-subtotal",
										children: [
											/* @__PURE__ */ (0, b.jsx)("th", {
												scope: "row",
												children: "可分配资金合计"
											}),
											/* @__PURE__ */ (0, b.jsx)("td", { children: D(n.normal.income) }),
											/* @__PURE__ */ (0, b.jsx)("td", { children: D(n.trip.income) }),
											/* @__PURE__ */ (0, b.jsx)("td", { children: D(n.annualIncome) })
										]
									}),
									/* @__PURE__ */ (0, b.jsxs)("tr", { children: [
										/* @__PURE__ */ (0, b.jsx)("th", {
											scope: "row",
											children: "生活支出及未来消费预留"
										}),
										/* @__PURE__ */ (0, b.jsx)("td", { children: D(n.normal.consumption) }),
										/* @__PURE__ */ (0, b.jsx)("td", { children: D(n.trip.consumption) }),
										/* @__PURE__ */ (0, b.jsx)("td", { children: D(n.annualConsumption) })
									] }),
									/* @__PURE__ */ (0, b.jsxs)("tr", { children: [
										/* @__PURE__ */ (0, b.jsx)("th", {
											scope: "row",
											children: "投资基金 + 应急基金"
										}),
										/* @__PURE__ */ (0, b.jsx)("td", { children: D(n.normal.saving) }),
										/* @__PURE__ */ (0, b.jsx)("td", { children: D(n.trip.saving) }),
										/* @__PURE__ */ (0, b.jsx)("td", { children: D(n.annualSaving) })
									] }),
									/* @__PURE__ */ (0, b.jsxs)("tr", { children: [
										/* @__PURE__ */ (0, b.jsx)("th", {
											scope: "row",
											children: "全部资金分配"
										}),
										/* @__PURE__ */ (0, b.jsx)("td", { children: D(n.normal.totalOutflow) }),
										/* @__PURE__ */ (0, b.jsx)("td", { children: D(n.trip.totalOutflow) }),
										/* @__PURE__ */ (0, b.jsx)("td", { children: D(n.annualOutflow) })
									] })
								] }),
								/* @__PURE__ */ (0, b.jsx)("tfoot", { children: /* @__PURE__ */ (0, b.jsxs)("tr", { children: [
									/* @__PURE__ */ (0, b.jsx)("th", {
										scope: "row",
										children: "分配后的现金余量"
									}),
									/* @__PURE__ */ (0, b.jsx)("td", {
										className: n.normal.surplus < 0 ? "negative" : "positive",
										children: D(n.normal.surplus)
									}),
									/* @__PURE__ */ (0, b.jsx)("td", {
										className: n.trip.surplus < 0 ? "negative" : "positive",
										children: D(n.trip.surplus)
									}),
									/* @__PURE__ */ (0, b.jsx)("td", {
										className: n.annualSurplus < 0 ? "negative" : "positive",
										children: D(n.annualSurplus)
									})
								] }) })
							]
						})
					})
				]
			}),
			/* @__PURE__ */ (0, b.jsx)(ie, {
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
								children: D(n.buffer)
							}),
							/* @__PURE__ */ (0, b.jsxs)("small", { children: [
								"每月缺口",
								D(n.normalDeficit),
								" × ",
								e.bufferMonths,
								"个月；仅计算预算缺口，不代表无需保留付款周转现金。"
							] })
						] }),
						/* @__PURE__ */ (0, b.jsxs)("article", { children: [
							/* @__PURE__ */ (0, b.jsx)("span", { children: "全年普通月需要补足" }),
							/* @__PURE__ */ (0, b.jsx)("strong", { children: D(n.normalDeficit * n.normalMonths) }),
							/* @__PURE__ */ (0, b.jsxs)("small", { children: [
								"出差月份合计余量",
								D(n.annualTripSurplus),
								"；未计额外还款及预算外开销。"
							] })
						] }),
						/* @__PURE__ */ (0, b.jsxs)("article", { children: [
							/* @__PURE__ */ (0, b.jsx)("span", { children: "投资与应急占可分配资金" }),
							/* @__PURE__ */ (0, b.jsxs)("strong", { children: [(n.savingRate * 100).toFixed(1), "%"] }),
							/* @__PURE__ */ (0, b.jsxs)("small", { children: [
								"全年投入",
								D(n.annualSaving),
								"；旅游、伴侣基金不计入这项储蓄。"
							] })
						] }),
						/* @__PURE__ */ (0, b.jsxs)("article", { children: [
							/* @__PURE__ */ (0, b.jsx)("span", { children: "全年月均可分配资金" }),
							/* @__PURE__ */ (0, b.jsx)("strong", { children: D(n.averageIncome) }),
							/* @__PURE__ */ (0, b.jsxs)("small", { children: [
								"年度平均值；普通月份到账工资仍为",
								D(e.salary),
								"。"
							] })
						] }),
						/* @__PURE__ */ (0, b.jsxs)("article", { children: [
							/* @__PURE__ */ (0, b.jsx)("span", { children: "应急金全年后参考余额" }),
							/* @__PURE__ */ (0, b.jsx)("strong", {
								"data-testid": "emergency-year-end",
								children: D(n.emergencyYearEnd)
							}),
							/* @__PURE__ */ (0, b.jsxs)("small", { children: [
								"期初参考",
								D(e.emergencyCurrent),
								" + 全年新增",
								D(n.annualEmergency),
								"，假设不动用、不计收益。"
							] })
						] }),
						/* @__PURE__ */ (0, b.jsxs)("article", { children: [
							/* @__PURE__ */ (0, b.jsxs)("span", { children: [e.emergencyTargetMonths, "个月应急目标保守下限"] }),
							/* @__PURE__ */ (0, b.jsx)("strong", {
								"data-testid": "emergency-target-floor",
								children: D(n.emergencyTarget)
							}),
							/* @__PURE__ */ (0, b.jsxs)("small", { children: [
								"房租 + 父母家用 + 基本餐饮，共",
								D(n.basicNeed),
								" / 月；未含必要通讯、交通、医疗。全年后仍差",
								D(n.emergencyGap),
								"。"
							] })
						] })
					]
				})]
			}),
			/* @__PURE__ */ (0, b.jsxs)("div", {
				className: `annual-budget-conclusion ${r ? "" : "annual-budget-warning"}`,
				children: [
					/* @__PURE__ */ (0, b.jsx)("strong", { children: n.assumptionsConflict ? "计算条件需校正，暂不判断年度是否覆盖。" : r ? `全年投入${D(n.annualSaving)}后，仍留${D(n.annualSurplus)}额外现金。` : `按当前条件，全年仍缺${D(Math.max(0, -n.annualSurplus))}。` }),
					/* @__PURE__ */ (0, b.jsx)("p", { children: "年度可覆盖不代表每月现金充足。出差结余到账后先保留周转金；实际出差月份及补贴到账日期未确定，因此这里展示月份类型预算，不推定逐月到账余额。" }),
					r && /* @__PURE__ */ (0, b.jsxs)("p", { children: [
						"如果额外余量也保留，全年可用于投资本金和新增现金储备的资金合计",
						D(n.annualRetained),
						"；这是投入与留存金额，不代表投资资产一定增值。"
					] }),
					e.awayMonths > 0 && n.requiredTripDays !== null && /* @__PURE__ */ (0, b.jsxs)("p", { children: [
						n.requiredTripDays > 0 ? `保持当前出差月份和各项预算时，全年至少需约${n.requiredTripDays}个领补贴日才能覆盖` : "按当前月份类型安排，基础工资即可覆盖全年预算",
						"；汇率",
						e.budgetFx.toFixed(2),
						"是预算参数。"
					] }),
					n.assumptionsConflict && /* @__PURE__ */ (0, b.jsx)("p", {
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
						children: o.map((t) => /* @__PURE__ */ (0, b.jsxs)("label", { children: [
							/* @__PURE__ */ (0, b.jsx)("span", { children: t.label }),
							/* @__PURE__ */ (0, b.jsx)("input", {
								"aria-label": t.label,
								type: "number",
								min: "0",
								step: t.step,
								value: e[t.key],
								onChange: (e) => i(t.key, e.target.value)
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
//#region app/finance-review-model.ts
var se = [
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
], O = {
	week: "周复盘",
	month: "月复盘",
	quarter: "季度复盘"
}, k = {
	cash: "现金及存款",
	investments: "证券账户总资产",
	otherAssets: "其他个人资产",
	debt: "个人负债"
}, ce = {
	projects: "大花费项目",
	bills: "账单与订阅",
	balance: "资产负债明细"
};
function le(e) {
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
function ue(e, t) {
	return [
		"projects",
		"bills",
		"assets",
		"debts",
		"holdings"
	].every((n) => JSON.stringify(e[n]) === JSON.stringify(t[n]));
}
var de = 864e5, A = (e) => Math.round((e + 2 ** -52 * Math.abs(e)) * 100), j = (e) => e.reduce((e, t) => e + A(t), 0) / 100;
function fe(e) {
	return e.some((e) => e.balance === null || !Number.isFinite(e.balance) || e.balance < 0) ? null : j(e.filter((e) => e.included).map((e) => e.balance));
}
function pe(e, t, n) {
	let r = t.map((e) => ({
		...e,
		included: n?.find((t) => t.id === e.id)?.included ?? !0,
		note: ""
	}));
	return {
		...e,
		accounts: r,
		balances: {
			...e.balances,
			cash: fe(r)
		}
	};
}
function me(e, t) {
	let n = e.accounts ?? [], r = t?.accounts ?? [];
	return [...new Set([...n.map((e) => e.id), ...r.map((e) => e.id)])].map((e) => {
		let t = n.find((t) => t.id === e), i = r.find((t) => t.id === e);
		return {
			id: e,
			name: t?.name ?? i.name,
			purpose: t?.purpose ?? i.purpose,
			current: t?.balance ?? null,
			previous: i?.balance ?? null,
			delta: t && i ? j([t.balance, -i.balance]) : null,
			included: t?.included ?? null,
			note: t?.note ?? "",
			status: t ? i ? t.included === i.included ? "同口径" : "计入范围变化" : "无上期账户基准" : "本期未记录"
		};
	});
}
var M = (e) => new Intl.NumberFormat("zh-CN", {
	style: "currency",
	currency: "CNY",
	maximumFractionDigits: 2
}).format(e), he = (e) => e === null ? "无上期基准" : `${e > 0 ? "+" : ""}${M(e)}`, ge = (e) => e.toISOString().slice(0, 10);
function _e(e) {
	if (typeof e != "string" || !/^\d{4}-\d{2}-\d{2}$/.test(e)) throw Error("日期须为 YYYY-MM-DD");
	let t = /* @__PURE__ */ new Date(`${e}T00:00:00Z`);
	if (!Number.isFinite(t.getTime()) || ge(t) !== e) throw Error(`无效日期：${e}`);
	return t;
}
function ve() {
	return new Intl.DateTimeFormat("en-CA", {
		timeZone: "Asia/Shanghai",
		year: "numeric",
		month: "2-digit",
		day: "2-digit"
	}).format(/* @__PURE__ */ new Date());
}
function ye(e, t) {
	let n = _e(t), r, i;
	if (e === "week") r = /* @__PURE__ */ new Date(n.getTime() - (n.getUTCDay() + 6) % 7 * de), i = new Date(r.getTime() + 6 * de);
	else {
		let t = e === "quarter" ? Math.floor(n.getUTCMonth() / 3) * 3 : n.getUTCMonth();
		r = new Date(Date.UTC(n.getUTCFullYear(), t, 1)), i = new Date(Date.UTC(n.getUTCFullYear(), t + (e === "quarter" ? 3 : 1), 0));
	}
	return {
		start: ge(r),
		end: t,
		limit: ge(i)
	};
}
function be(e = "week", t = ve()) {
	let { start: n } = ye(e, t);
	return {
		type: e,
		start: n,
		end: t,
		income: null,
		amounts: Object.fromEntries(se.map((e) => [e.id, null])),
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
function xe(e) {
	return e && typeof e == "object" && !Array.isArray(e) ? e : {};
}
function Se(e) {
	let t = xe(e), n = (e) => {
		if (typeof e != "number" || !Number.isFinite(e) || e < 0 || e > 0xe8d4a51000) throw Error("关键事项金额须为有效非负数");
		return A(e) / 100;
	}, r = (e) => e === "" ? "" : (_e(e), e), i = (e) => {
		if (!Array.isArray(e)) throw Error("关键事项明细须为列表");
		let t = /* @__PURE__ */ new Set();
		return e.map((e) => {
			let n = xe(e);
			if (typeof n.id != "string" || !n.id.trim() || t.has(n.id) || typeof n.name != "string" || !n.name.trim()) throw Error("关键事项名称与唯一编号须完整");
			return t.add(n.id), {
				...n,
				id: n.id,
				name: n.name
			};
		});
	}, a = xe(t.checks), o = xe(t.notes);
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
		checks: Object.fromEntries(Object.keys(ce).map((e) => [e, a[e] === !0])),
		notes: Object.fromEntries(Object.keys(ce).map((e) => [e, typeof o[e] == "string" ? o[e] : ""]))
	};
}
function Ce(e) {
	let t = xe(e);
	if (![
		"week",
		"month",
		"quarter"
	].includes(String(t.type))) throw Error("请选择周、月或季度");
	let n = t.type;
	_e(t.start), _e(t.end);
	let r = t.start, i = t.end;
	if (ye(n, i).start !== r || r > i) throw Error("日期须从本周周一、本月1日或本季度首日开始，不能跨周期");
	let a = (e, t, n = !1) => {
		if (typeof e != "number" || !Number.isFinite(e) || Math.abs(e) > 0xe8d4a51000 || n && e < 0) throw Error(`请填写${t}；确实没有时填 0，空白不代表 0`);
		return A(e) / 100;
	}, o = xe(t.amounts), s = xe(t.notes), c = xe(t.balances), l;
	if (t.accounts !== void 0) {
		if (!Array.isArray(t.accounts)) throw Error("账户快照须为列表");
		let e = /* @__PURE__ */ new Set();
		if (l = t.accounts.map((t) => {
			let n = xe(t);
			if (typeof n.id != "string" || !n.id.trim() || e.has(n.id) || typeof n.name != "string" || !n.name.trim() || typeof n.included != "boolean") throw Error("账户快照名称、唯一编号及计入范围须完整");
			return e.add(n.id), {
				id: n.id,
				name: n.name,
				type: typeof n.type == "string" ? n.type : "",
				purpose: typeof n.purpose == "string" ? n.purpose : "",
				included: n.included,
				balance: a(n.balance, `${n.name}期末余额`, !0),
				note: typeof n.note == "string" ? n.note : ""
			};
		}), a(c.cash, "现金及存款", !0) !== fe(l)) throw Error("现金及存款须与计入的账户余额合计一致");
	}
	let u;
	if (t.budget !== void 0) {
		let e = xe(t.budget);
		if (n !== "month" || !["normal", "trip"].includes(String(e.mode))) throw Error("月度预算参考须注明普通月或出差月");
		let r = xe(e.amounts);
		u = {
			mode: e.mode,
			amounts: Object.fromEntries(se.map((e) => [e.id, a(r[e.id], `${e.name}月预算`, !0)]))
		};
	}
	return {
		id: `${n}:${r}`,
		type: n,
		start: r,
		end: i,
		savedAt: typeof t.savedAt == "string" && Number.isFinite(Date.parse(t.savedAt)) ? t.savedAt : (/* @__PURE__ */ new Date()).toISOString(),
		income: a(t.income, "本期外部收入"),
		amounts: Object.fromEntries(se.map((e) => [e.id, a(o[e.id], e.name)])),
		notes: Object.fromEntries(se.map((e) => [e.id, typeof s[e.id] == "string" ? s[e.id] : ""])),
		balances: Object.fromEntries(Object.entries(k).map(([e, t]) => [e, a(c[e], t, !0)])),
		summary: typeof t.summary == "string" ? t.summary : "",
		...u ? { budget: u } : {},
		...l ? { accounts: l } : {},
		...t.focus === void 0 ? {} : { focus: Se(t.focus) }
	};
}
function we(e, t) {
	return [...e.filter((e) => e.id !== t.id), t].sort((e, t) => t.end.localeCompare(e.end) || e.id.localeCompare(t.id));
}
function Te(e) {
	let t = xe(e), n = Array.isArray(e) ? e : Array.isArray(t.records) ? t.records : t.type ? [t] : null;
	if (!n) throw Error("请选择周期复盘 JSON 文件");
	return n.reduce((e, t) => we(e, Ce(t)), []);
}
function Ee(e) {
	let t = j(se.filter((e) => e.flow === "expense").map((t) => e.amounts[t.id])), n = j([
		e.balances.cash,
		e.balances.investments,
		e.balances.otherAssets
	]);
	return {
		income: e.income,
		spending: t,
		surplus: j([e.income, -t]),
		assets: n,
		netWorth: j([n, -e.balances.debt]),
		days: (_e(e.end).getTime() - _e(e.start).getTime()) / de + 1
	};
}
function De(e, t, n) {
	let r = (e) => typeof e == "number" ? M(e) : String(e || "未填写");
	return [...e.flatMap((e) => {
		let i = t.find((t) => t.id === e.id);
		if (!i) return [`新增登记：${e.name}`];
		let a = n.filter(([t]) => e[t] !== i[t]).map(([t, n]) => `${n} ${r(i[t])} → ${r(e[t])}`);
		return e.name !== i.name && a.unshift(`名称 ${i.name} → ${e.name}`), a.length ? [`${e.name}：${a.join("，")}`] : [];
	}), ...t.filter((t) => !e.some((e) => e.id === t.id)).map((e) => `${e.name}：已移出本期清单，处理状态待确认`)];
}
function Oe(e, t) {
	let n = Ee(e), r = t ? Ee(t) : null, i = e.focus, a = t?.focus, o = (e, t) => t === void 0 ? "无上期基准" : `较上期 ${he(j([e, -t]))}`, s = (t) => t ? (_e(t).getTime() - _e(e.end).getTime()) / de : null, c = (e) => j(e.map((e) => Math.max(0, j([e.target, -e.current])))), l = {
		projects: i?.checks.projects && a?.checks.projects ? De(i.projects, a.projects, [
			["target", "目标"],
			["current", "已准备"],
			["dueDate", "截止日期"]
		]) : [],
		bills: i?.checks.bills && a?.checks.bills ? De(i.bills, a.bills, [
			["amount", "登记金额"],
			["date", "提醒日期"],
			["kind", "类型"]
		]) : [],
		balance: i?.checks.balance && a?.checks.balance ? [
			...De(i.assets, a.assets, [["amount", "补录资产"]]),
			...De(i.debts, a.debts, [["amount", "负债余额"]]),
			...i.holdings === a.holdings ? [] : [`持仓参考市值：${o(i.holdings, a.holdings)}（不直接视为投资收益）`]
		] : []
	}, u = (i?.projects ?? []).filter((e) => e.target > e.current && s(e.dueDate) !== null && s(e.dueDate) >= 0 && s(e.dueDate) <= 30).sort((e, t) => e.dueDate.localeCompare(t.dueDate)), d = (i?.projects ?? []).filter((e) => s(e.dueDate) !== null && s(e.dueDate) < 0), f = (i?.bills ?? []).filter((e) => s(e.date) !== null && s(e.date) >= 0 && s(e.date) <= 7).sort((e, t) => e.date.localeCompare(t.date)), p = (i?.bills ?? []).filter((e) => s(e.date) !== null && s(e.date) < 0), m = (e) => i ? i.checks[e] ? a?.checks[e] ? l[e].length ? `${l[e].length} 项变化` : "登记未变" : "首次基准" : "待核对" : "未提供", h = (e) => i ? i.checks[e] ? a?.checks[e] ? "" : "暂无已核对的上期明细，仅建立本期基准。" : "带入的登记数据尚未核对，不能据此确认本期变化。" : "本期没有这项快照，不按 0 或没有变化处理。", g = se.filter((e) => e.flow === "expense").map((n) => ({
		name: n.name,
		delta: t ? j([e.amounts[n.id], -t.amounts[n.id]]) : 0
	})).filter((e) => e.delta !== 0).sort((e, t) => Math.abs(t.delta) - Math.abs(e.delta)), _ = i ? j(i.debts.map((e) => e.amount)) : null, v = (e) => e.filter(Boolean), y = [
		{
			id: "flows",
			title: "收入与支出",
			state: r ? r.days === n.days ? "本期对比" : `本期 ${n.days} 天 / 上期 ${r.days} 天` : "首次基准",
			summary: `收入 ${M(n.income)}（${o(n.income, r?.income)}）；消费 ${M(n.spending)}（${o(n.spending, r?.spending)}）；结余 ${M(n.surplus)}。`,
			details: v([...g.slice(0, 2).map((e) => `${e.name} ${he(e.delta)}`), r && r.days !== n.days ? `本期 ${n.days} 天 / 上期 ${r.days} 天；日均消费 ${M(n.spending / n.days)} / ${M(r.spending / r.days)}，总额不直接代表消费强度。` : ""])
		},
		{
			id: "projects",
			title: "大花费项目",
			state: m("projects"),
			summary: i?.checks.projects ? `${i.projects.length} 项，资金缺口 ${M(c(i.projects))}（${o(c(i.projects), a?.checks.projects ? c(a.projects) : void 0)}）；未来 30 天 ${u.length} 项待筹资。` : h("projects"),
			details: v([
				h("projects"),
				...l.projects,
				...u.slice(0, 2).map((e) => `${e.name} · ${e.dueDate} · 缺口 ${M(Math.max(0, j([e.target, -e.current])))}`),
				d.length ? `${d.length} 项日期已过：${d.slice(0, 2).map((e) => e.name).join("、")}；需核实是否完成、取消或延期，不直接认定欠款。` : "",
				i?.projects.some((e) => !e.dueDate) ? "有项目尚未填写截止日期，暂不能判断其资金准备期限。" : "",
				i?.notes.projects ?? ""
			])
		},
		{
			id: "bills",
			title: "账单与订阅",
			state: m("bills"),
			summary: i?.checks.bills ? `${i.bills.length} 项登记，未来 7 天 ${f.length} 项到期提醒，登记金额 ${M(j(f.map((e) => e.amount)))}。` : h("bills"),
			details: v([
				h("bills"),
				...l.bills,
				...f.slice(0, 2).map((e) => `${e.name} · ${e.date} · ${M(e.amount)} · ${e.kind}`),
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
			summary: `个人资产 ${M(n.assets)}（${o(n.assets, r?.assets)}）；负债 ${M(e.balances.debt)}（${o(e.balances.debt, t?.balances.debt)}）；净资产 ${o(n.netWorth, r?.netWorth)}。`,
			details: v([
				h("balance"),
				...l.balance,
				i?.checks.balance && _ !== e.balances.debt ? `登记负债 ${M(_)} 与填写的个人负债 ${M(e.balances.debt)} 不一致，需核对遗漏或口径。` : "",
				i?.notes.balance ?? ""
			])
		}
	], b = [];
	return i?.checks.bills && f[0] && b.push(`核对 ${f[0].date} 的“${f[0].name}”提醒（${M(f[0].amount)}），确认是否需要付款、续费或处理到期事项。`), i?.checks.projects && u[0] && b.push(`“${u[0].name}”截至 ${u[0].dueDate} 尚有 ${M(Math.max(0, j([u[0].target, -u[0].current])))} 资金缺口，确定补足或调整计划。`), i?.checks.balance && _ !== e.balances.debt && b.push("先核对资产负债表与本期负债合计的差异，避免遗漏借款或重复记录。"), (i?.checks.projects && d.length || i?.checks.bills && p.length) && b.push("清理已过日期的项目与提醒，确认完成、支付或延期状态；不要直接当作欠款。"), {
		highlights: y,
		actions: b
	};
}
function ke(e, t) {
	let n = t.filter((t) => t.type === e.type && t.end < e.start).sort((e, t) => t.end.localeCompare(e.end))[0], r = Ee(e), i = n ? Ee(n) : null, a = se.map((t) => ({
		...t,
		amount: e.amounts[t.id],
		previous: n?.amounts[t.id] ?? null,
		delta: n ? j([e.amounts[t.id], -n.amounts[t.id]]) : null,
		note: e.notes[t.id] || ""
	})), o = n ? _e(e.start).getTime() - _e(n.end).getTime() === de : !1, s = i ? j([r.netWorth, -i.netWorth]) : null, c = o && s !== null ? j([s, -r.surplus]) : null, l = ["投资基金填净投入，应急基金填净转入；二者不计消费。其他七项填实际净支出，不填充值或预算预留。"], u = me(e, n);
	e.accounts && l.push("账户余额按复盘时的快照比较；余额变化本身不等于消费，具体原因以本期变动说明和账单为准。账户计入范围变化须另行核对。"), l.push("预算中的应急&学习金合并展示；复盘仍区分应急净转入与学习实际消费，学习用途据备注判断。"), n ? (o || l.push("与上期之间有未覆盖日期；余额差值不等于本期变化，暂不做收支对账。"), r.days !== i.days && l.push(`本期${r.days}天，上期${i.days}天；比较总额时同时看日均支出。`)) : l.push("本期是首次基准，暂无上期变化；不会把缺失的上期当成 0。"), e.end !== ye(e.type, e.end).limit && l.push("本周期尚未结束，报告是截至所选日期的阶段数据。");
	let d = Oe(e, n);
	e.focus && l.push("关键事项为保存时的登记快照，不与账户或净资产重复相加；项目预留及提醒金额不记为本期消费。未核对的快照不作为已确认变化。");
	let f = [];
	r.surplus < 0 && f.push(`本期收支缺口${M(-r.surplus)}，结合发薪日与集中付款核对周转资金。`), c !== null && Math.abs(c) >= .01 && f.push(`净资产与收支之间有${he(c)}待解释变化，核对投资涨跌、汇率、账户遗漏及口径，不能直接当作投资收益。`), f.push(...d.actions);
	let p = a.filter((e) => e.flow === "expense" && (e.delta ?? 0) > 0).sort((e, t) => t.delta - e.delta)[0];
	p && f.push(`优先复核${p.name}增加的${M(p.delta)}${p.note ? `，已记事项：${p.note}` : "，补充发生事项后再判断是否调整预算"}。`), f.length === 0 && f.push(n ? "按现有预算继续执行；下期先核对余额，再更新本期实际发生额。" : "核实本期余额和九类金额，作为下一次复盘基准。");
	let m = e.budget ? a.map((t) => ({
		...t,
		budget: e.budget.amounts[t.id],
		remaining: j([e.budget.amounts[t.id], -t.amount])
	})) : [], h = m.filter((t) => e.budget?.mode === "normal" && ["small", "daily"].includes(t.id) && t.remaining < 0);
	return h.length && f.unshift(`本月${h.map((e) => `${e.name}超过预算${M(-e.remaining)}`).join("、")}，核对实际明细，再调整下月额度或消费。`), e.budget && l.push("预算为保存时的整月额度，不按天摊分；阶段月报的剩余额度不代表最终结余。消费基金跨月使用时结合历史余额判断，不把预留重复计消费。"), e.budget?.mode === "trip" && l.push("出差预算已从补贴扣除海外开销；若实际收支按毛额录入，先拆分海外开销再核对预算，本表不据此自动判定日常超支。"), {
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
function Ae(e, t) {
	let n = ke(e, t), { previous: r, prior: i, totals: a, rows: o } = n, s = (e) => e.replace(/\|/g, "／").replace(/[\r\n]+/g, " ");
	return [
		`# ${O[e.type]} · ${e.start} 至 ${e.end}`,
		r ? `对比：${r.start} 至 ${r.end}` : "本期建立首次基准。",
		"",
		`收入 ${M(a.income)} · 实际消费 ${M(a.spending)} · 收支结余 ${M(a.surplus)}`,
		`期末净资产 ${M(a.netWorth)} · 较上期余额 ${he(n.netWorthDelta)}`,
		`日均消费 ${M(a.spending / a.days)}${i ? `；上期 ${M(i.spending / i.days)}` : ""}`,
		"",
		"## 本期关键变化",
		...n.highlights.flatMap((e) => [
			`### ${e.title} · ${e.state}`,
			e.summary,
			...e.details.map((e) => `- ${s(e)}`),
			""
		]),
		"| 项目 | 本期发生额 | 上期发生额 | 变化 | 本期事项 |",
		"|---|---:|---:|---:|---|",
		...o.map((e) => `| ${e.name}${e.flow === "transfer" ? "（划拨）" : ""} | ${M(e.amount)} | ${e.previous === null ? "无基准" : M(e.previous)} | ${he(e.delta)} | ${s(e.note || "未填写事项")} |`),
		"",
		...e.budget ? [
			`## 月预算核对 · ${e.budget.mode === "normal" ? "普通月" : "出差月"}`,
			"| 项目 | 整月预算 | 本期金额 | 预算减本期 |",
			"|---|---:|---:|---:|",
			...n.budgetRows.map((e) => `| ${e.name} | ${M(e.budget)} | ${M(e.amount)} | ${M(e.remaining)} |`),
			""
		] : [],
		"| 期末余额 | 本期 | 上期 | 变化 |",
		"|---|---:|---:|---:|",
		...Object.entries(k).map(([t, n]) => {
			let i = t;
			return `| ${n} | ${M(e.balances[i])} | ${r ? M(r.balances[i]) : "无基准"} | ${he(r ? j([e.balances[i], -r.balances[i]]) : null)} |`;
		}),
		"",
		...n.accountRows.length ? [
			"## 账户余额对比",
			"| 账户 | 本期期末 | 上期期末 | 余额变化 | 计入个人现金 | 本期说明 |",
			"|---|---:|---:|---:|---|---|",
			...n.accountRows.map((e) => `| ${s(e.name)} | ${e.current === null ? "未记录" : M(e.current)} | ${e.previous === null ? "无基准" : M(e.previous)} | ${he(e.delta)} | ${e.included === null ? "未记录" : e.included ? "是" : "否"} | ${s([e.status, e.note].filter(Boolean).join("；"))} |`),
			""
		] : [],
		...e.summary ? [`本期补充：${s(e.summary)}`, ""] : [],
		"## 学习用途",
		`本期学习净支出 ${M(e.amounts.learning)}；${s(e.notes.learning || "未填写学习事项，暂不能判断学了什么。")}`,
		"",
		"## 下期动作",
		...n.actions.map((e) => `- ${e}`),
		"",
		"## 数据口径",
		...n.notices.map((e) => `- ${e}`),
		""
	].join("\n");
}
function je(e, t, n) {
	let { start: r } = ye(t, n);
	for (let i of t === "quarter" ? ["month", "week"] : ["week"]) {
		let a = e.filter((e) => e.type === i && e.start >= r && e.end <= n).sort((e, t) => e.start.localeCompare(t.start)), o = r, s = a.length > 0;
		for (let e of a) e.start !== o && (s = !1), o = ge(new Date(_e(e.end).getTime() + de));
		if (!(!s || o !== ge(new Date(_e(n).getTime() + de)))) return Ce({
			...be(t, n),
			income: j(a.map((e) => e.income)),
			amounts: Object.fromEntries(se.map((e) => [e.id, j(a.map((t) => t.amounts[e.id]))])),
			notes: Object.fromEntries(se.map((e) => [e.id, a.filter((t) => t.notes[e.id]).map((t) => `${t.start}：${t.notes[e.id]}`).join("；")])),
			balances: a[a.length - 1].balances,
			accounts: a[a.length - 1].accounts,
			focus: a[a.length - 1].focus,
			summary: `由 ${a.length} 条无重叠、连续覆盖的${i === "week" ? "周" : "月"}记录汇总；期末余额及账户快照取最后一期，不累加。`
		});
	}
	throw Error("现有记录没有完整、连续覆盖该周期，或有跨月/跨季的周记录。请补填本周期实际汇总，不能按天摊分实际消费。");
}
//#endregion
//#region app/finance-review-focus.tsx
function Me({ focus: e, onChange: t, onRefresh: n, onOpen: r, onUseBalances: i }) {
	let a = (e) => e.reduce((e, t) => e + Math.round(t.amount * 100), 0) / 100, o = e ? {
		projects: `${e.projects.length} 项 · 缺口 ${M(e.projects.reduce((e, t) => e + Math.max(0, Math.round((t.target - t.current) * 100)), 0) / 100)}`,
		bills: `${e.bills.length} 项登记 · 包含已登记的订阅提醒`,
		balance: `补录资产 ${M(a(e.assets))} · 负债 ${M(a(e.debts))}`
	} : null, s = {
		projects: "fundBuckets",
		bills: "reminders",
		balance: "balance"
	};
	return /* @__PURE__ */ (0, b.jsxs)("section", {
		className: "review-focus-entry",
		"aria-label": "关键事项核对",
		children: [/* @__PURE__ */ (0, b.jsxs)("div", {
			className: "review-toolbar",
			children: [/* @__PURE__ */ (0, b.jsx)("h3", { children: "关键事项核对" }), /* @__PURE__ */ (0, b.jsx)("button", {
				type: "button",
				className: "secondary-button",
				onClick: n,
				children: "刷新关键事项"
			})]
		}), e ? /* @__PURE__ */ (0, b.jsxs)(b.Fragment, { children: [/* @__PURE__ */ (0, b.jsx)("p", {
			className: "review-caption",
			children: "来源：已保存模块。核对的是截至复盘日的登记状态，未勾选的事项保留为待核对，不计入本期消费。"
		}), Object.keys(ce).map((n) => /* @__PURE__ */ (0, b.jsxs)("div", {
			className: "review-focus-check",
			children: [/* @__PURE__ */ (0, b.jsxs)("details", { children: [
				/* @__PURE__ */ (0, b.jsxs)("summary", { children: [/* @__PURE__ */ (0, b.jsx)("strong", { children: ce[n] }), /* @__PURE__ */ (0, b.jsx)("span", { children: o[n] })] }),
				/* @__PURE__ */ (0, b.jsx)("div", {
					className: "table-wrap",
					children: /* @__PURE__ */ (0, b.jsxs)("table", {
						className: "review-table",
						children: [
							n === "projects" && /* @__PURE__ */ (0, b.jsxs)(b.Fragment, { children: [/* @__PURE__ */ (0, b.jsx)("thead", { children: /* @__PURE__ */ (0, b.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, b.jsx)("th", { children: "项目" }),
								/* @__PURE__ */ (0, b.jsx)("th", { children: "目标" }),
								/* @__PURE__ */ (0, b.jsx)("th", { children: "已准备" }),
								/* @__PURE__ */ (0, b.jsx)("th", { children: "截止日期" })
							] }) }), /* @__PURE__ */ (0, b.jsx)("tbody", { children: e.projects.map((e) => /* @__PURE__ */ (0, b.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, b.jsx)("th", { children: e.name }),
								/* @__PURE__ */ (0, b.jsx)("td", { children: M(e.target) }),
								/* @__PURE__ */ (0, b.jsx)("td", { children: M(e.current) }),
								/* @__PURE__ */ (0, b.jsx)("td", { children: e.dueDate || "未填" })
							] }, e.id)) })] }),
							n === "bills" && /* @__PURE__ */ (0, b.jsxs)(b.Fragment, { children: [/* @__PURE__ */ (0, b.jsx)("thead", { children: /* @__PURE__ */ (0, b.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, b.jsx)("th", { children: "账单 / 订阅" }),
								/* @__PURE__ */ (0, b.jsx)("th", { children: "登记金额" }),
								/* @__PURE__ */ (0, b.jsx)("th", { children: "提醒日期" }),
								/* @__PURE__ */ (0, b.jsx)("th", { children: "类型" })
							] }) }), /* @__PURE__ */ (0, b.jsx)("tbody", { children: e.bills.map((e) => /* @__PURE__ */ (0, b.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, b.jsx)("th", { children: e.name }),
								/* @__PURE__ */ (0, b.jsx)("td", { children: M(e.amount) }),
								/* @__PURE__ */ (0, b.jsx)("td", { children: e.date || "未填" }),
								/* @__PURE__ */ (0, b.jsx)("td", { children: e.kind })
							] }, e.id)) })] }),
							n === "balance" && /* @__PURE__ */ (0, b.jsxs)(b.Fragment, { children: [/* @__PURE__ */ (0, b.jsx)("thead", { children: /* @__PURE__ */ (0, b.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, b.jsx)("th", { children: "明细" }),
								/* @__PURE__ */ (0, b.jsx)("th", { children: "金额" }),
								/* @__PURE__ */ (0, b.jsx)("th", { children: "口径" })
							] }) }), /* @__PURE__ */ (0, b.jsxs)("tbody", { children: [
								e.assets.map((e) => /* @__PURE__ */ (0, b.jsxs)("tr", { children: [
									/* @__PURE__ */ (0, b.jsx)("th", { children: e.name }),
									/* @__PURE__ */ (0, b.jsx)("td", { children: M(e.amount) }),
									/* @__PURE__ */ (0, b.jsx)("td", { children: "补录资产" })
								] }, `asset:${e.id}`)),
								e.debts.map((e) => /* @__PURE__ */ (0, b.jsxs)("tr", { children: [
									/* @__PURE__ */ (0, b.jsx)("th", { children: e.name }),
									/* @__PURE__ */ (0, b.jsx)("td", { children: M(e.amount) }),
									/* @__PURE__ */ (0, b.jsx)("td", { children: "负债余额" })
								] }, `debt:${e.id}`)),
								/* @__PURE__ */ (0, b.jsxs)("tr", { children: [
									/* @__PURE__ */ (0, b.jsx)("th", { children: "投资持仓" }),
									/* @__PURE__ */ (0, b.jsx)("td", { children: M(e.holdings) }),
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
						onClick: () => r(s[n]),
						children: ["前往", ce[n]]
					}), n === "balance" && /* @__PURE__ */ (0, b.jsx)("button", {
						type: "button",
						className: "secondary-button",
						onClick: i,
						children: "带入补录资产与负债合计"
					})]
				}),
				/* @__PURE__ */ (0, b.jsxs)("label", {
					className: "field",
					children: [/* @__PURE__ */ (0, b.jsxs)("span", { children: [ce[n], "变化说明（可选）"] }), /* @__PURE__ */ (0, b.jsx)("input", {
						type: "text",
						value: e.notes[n] ?? "",
						onChange: (r) => t({
							...e,
							notes: {
								...e.notes,
								[n]: r.target.value
							}
						})
					})]
				})
			] }), /* @__PURE__ */ (0, b.jsxs)("label", {
				className: "review-focus-confirm",
				children: [/* @__PURE__ */ (0, b.jsx)("input", {
					type: "checkbox",
					"aria-label": `${ce[n]}已核对`,
					checked: e.checks[n],
					onChange: (r) => t({
						...e,
						checks: {
							...e.checks,
							[n]: r.target.checked
						}
					})
				}), e.checks[n] ? "已核对" : "待核对"]
			})]
		}, n))] }) : /* @__PURE__ */ (0, b.jsx)("p", {
			className: "review-caption",
			children: "本期尚无项目、账单及资产负债明细快照。"
		})]
	});
}
//#endregion
//#region app/finance-review-panel.tsx
function Ne(e, t, n) {
	let r = URL.createObjectURL(new Blob([t], { type: n })), i = document.createElement("a");
	i.href = r, i.download = e, i.click(), window.setTimeout(() => URL.revokeObjectURL(r), 1e3);
}
var Pe = (e) => e.trim() === "" ? null : Number(e), Fe = (e) => e === null ? "无基准" : `${e > 0 ? "+" : ""}${M(e)}`;
function Ie({ records: e, plan: t, accounts: n, focusSource: r, onOpenModule: i, onChange: a }) {
	function o(t, i = ve()) {
		let a = e.filter((e) => e.accounts && e.end <= i).sort((e, t) => t.end.localeCompare(e.end))[0], o = {
			...be(t, i),
			focus: le(r)
		};
		return n.length ? pe(o, n, a?.accounts) : o;
	}
	let [s, c] = (0, _.useState)(() => o()), [l, u] = (0, _.useState)(!1), [d, f] = (0, _.useState)(!0), [p, m] = (0, _.useState)(e.length ? "report" : "entry"), [h, g] = (0, _.useState)(e[0]?.id ?? ""), [v, y] = (0, _.useState)(""), [x, ee] = (0, _.useState)(t.mode), S = (0, _.useRef)(null), C = (0, _.useRef)(null), [w, te] = (0, _.useState)(null), T = e.find((e) => e.id === h) ?? e[0], E = T ? ke(T, e) : null, ne = s.end === ve(), re = !!(ne && s.focus && !ue(s.focus, r)), D = s.income !== null || Object.values(s.amounts).some((e) => e !== null) || Object.values(s.balances).some((e) => e !== null) || !!s.summary || Object.values(s.notes).some(Boolean) || Object.values(s.focus?.checks ?? {}).some(Boolean) || Object.values(s.focus?.notes ?? {}).some(Boolean);
	(0, _.useEffect)(() => {
		w ? C.current?.showModal() : C.current?.close();
	}, [w]);
	function ie(e) {
		try {
			e();
		} catch (e) {
			y(e instanceof Error ? e.message : "操作失败");
		}
	}
	function ae(e, t, n) {
		e ? te({
			message: t,
			action: n
		}) : ie(n);
	}
	function oe(e = s.type, t = s.end) {
		ae(D, "切换会清空当前未保存的输入，是否继续？", () => {
			c(o(e, t)), u(!1), m("entry"), y("");
		});
	}
	function ce() {
		try {
			if (re) throw Error("来源模块已有更新，请先刷新关键事项并重新核对。");
			if (s.accounts && !l) throw Error("请先核对本期期末账户余额并勾选确认。");
			let n = s.type === "month" ? s.budget ?? {
				mode: x,
				amounts: Object.fromEntries(t.rows.map((e) => [e.id, e[x]]))
			} : void 0, r = Ce({
				...s,
				budget: n,
				savedAt: (/* @__PURE__ */ new Date()).toISOString()
			});
			ae(e.some((e) => e.id === r.id), "该周期已有记录，是否用本次数据更新？", () => {
				a(we(e, r), ne && d ? r.accounts : void 0), g(r.id), m("report"), c(be(s.type, s.end)), u(!1), y(`复盘已记录${ne && d && r.accounts ? "，余额已同步到账户管理" : "，当前账户余额未改动"}；跨电脑使用前请保存完整版本到云端。`);
			});
		} catch (e) {
			y(e instanceof Error ? e.message : "保存失败");
		}
	}
	async function de(t) {
		try {
			let n = Te(JSON.parse(await t.text())), r = n.filter((t) => e.some((e) => e.id === t.id));
			ae(r.length > 0, `有 ${r.length} 个相同周期，是否更新这些记录？`, () => {
				a(n.reduce(we, e)), g(n[0]?.id ?? h), m("report"), y(`已导入 ${n.length} 条复盘；跨电脑使用前请保存完整版本到云端。`);
			});
		} catch (e) {
			y(e instanceof Error ? e.message : "导入失败");
		} finally {
			S.current && (S.current.value = "");
		}
	}
	function A() {
		try {
			if (s.type === "week") return;
			let t = je(e, s.type, s.end);
			ae(D, "汇总将替换当前输入，是否继续？", () => {
				c(t), u(!1), y("已汇总连续覆盖的记录，请核对后保存。");
			});
		} catch (e) {
			y(e instanceof Error ? e.message : "汇总失败");
		}
	}
	function j(e, t) {
		let n = (s.accounts ?? []).map((n) => n.id === e ? {
			...n,
			...t
		} : n);
		c({
			...s,
			accounts: n,
			balances: {
				...s.balances,
				cash: fe(n)
			}
		}), u(!1);
	}
	function me() {
		ae(!!s.accounts, "重新带入会替换复盘中的账户余额与说明，是否继续？", () => {
			c(pe(s, n, s.accounts ?? o(s.type, s.end).accounts)), u(!1);
		});
	}
	function he() {
		let e = o(s.type, s.end);
		e.accounts = e.accounts?.map((e) => ({
			...e,
			balance: null
		})), e.balances.cash = null, Ne("finance-review-template.json", JSON.stringify(e, null, 2), "application/json");
	}
	function ge() {
		ae(Object.values(s.focus?.checks ?? {}).some(Boolean), "刷新会带入当前模块数据并重新核对，变化说明保留。历史复盘请确认这些数据属于该截至日。", () => {
			let e = le(r);
			e.notes = { ...s.focus?.notes }, c({
				...s,
				focus: e
			});
		});
	}
	function _e() {
		if (!s.focus) return;
		let e = s.focus;
		ae(s.balances.otherAssets !== null || s.balances.debt !== null, "将以快照中的补录资产、负债合计替换这两项本期余额，现金和证券账户总资产不变。", () => {
			let t = (e) => e.reduce((e, t) => e + Math.round(t.amount * 100), 0) / 100;
			c({
				...s,
				balances: {
					...s.balances,
					otherAssets: t(e.assets),
					debt: t(e.debts)
				}
			});
		});
	}
	return /* @__PURE__ */ (0, b.jsxs)("div", {
		className: "finance-review",
		children: [
			/* @__PURE__ */ (0, b.jsxs)("dialog", {
				ref: C,
				className: "review-confirm",
				"aria-labelledby": "review-confirm-title",
				onCancel: (e) => {
					e.preventDefault(), te(null);
				},
				children: [
					/* @__PURE__ */ (0, b.jsx)("h3", {
						id: "review-confirm-title",
						children: "确认更新"
					}),
					/* @__PURE__ */ (0, b.jsx)("p", { children: w?.message }),
					/* @__PURE__ */ (0, b.jsxs)("div", {
						className: "data-actions",
						children: [/* @__PURE__ */ (0, b.jsx)("button", {
							type: "button",
							className: "secondary-button",
							autoFocus: !0,
							onClick: () => te(null),
							children: "取消"
						}), /* @__PURE__ */ (0, b.jsx)("button", {
							type: "button",
							className: "primary-button",
							onClick: () => {
								let e = w?.action;
								te(null), e && ie(e);
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
						className: p === "entry" ? "active" : "",
						"aria-pressed": p === "entry",
						onClick: () => m("entry"),
						children: "更新数据"
					}), /* @__PURE__ */ (0, b.jsx)("button", {
						type: "button",
						className: p === "report" ? "active" : "",
						"aria-pressed": p === "report",
						onClick: () => m("report"),
						children: "前后对比"
					})]
				}), /* @__PURE__ */ (0, b.jsxs)("div", {
					className: "data-actions",
					children: [
						/* @__PURE__ */ (0, b.jsx)("button", {
							className: "secondary-button",
							type: "button",
							onClick: he,
							children: "下载模板"
						}),
						/* @__PURE__ */ (0, b.jsx)("button", {
							className: "secondary-button",
							type: "button",
							onClick: () => S.current?.click(),
							children: "导入复盘"
						}),
						/* @__PURE__ */ (0, b.jsx)("button", {
							className: "secondary-button",
							type: "button",
							disabled: !e.length,
							onClick: () => Ne("finance-reviews.json", JSON.stringify({
								app: "personal-finance-review",
								version: 1,
								records: e
							}, null, 2), "application/json"),
							children: "导出记录"
						}),
						/* @__PURE__ */ (0, b.jsx)("input", {
							className: "visually-hidden",
							ref: S,
							type: "file",
							accept: ".json,application/json",
							"aria-label": "导入周期复盘文件",
							onChange: (e) => {
								let t = e.target.files?.[0];
								t && de(t);
							}
						})
					]
				})]
			}),
			v && /* @__PURE__ */ (0, b.jsx)("p", {
				className: "review-status",
				role: "status",
				children: v
			}),
			p === "entry" && /* @__PURE__ */ (0, b.jsxs)("form", {
				onSubmit: (e) => {
					e.preventDefault(), ce();
				},
				children: [
					/* @__PURE__ */ (0, b.jsxs)("div", {
						className: "review-fields",
						children: [
							/* @__PURE__ */ (0, b.jsxs)("label", {
								className: "field",
								children: [/* @__PURE__ */ (0, b.jsx)("span", { children: "复盘周期" }), /* @__PURE__ */ (0, b.jsx)("select", {
									value: s.type,
									onChange: (e) => oe(e.target.value),
									children: Object.entries(O).map(([e, t]) => /* @__PURE__ */ (0, b.jsx)("option", {
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
									value: s.end,
									onInput: (e) => {
										e.currentTarget.validity.valid && e.currentTarget.value && e.currentTarget.value !== s.end && oe(s.type, e.currentTarget.value);
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
									value: s.income ?? "",
									onChange: (e) => c({
										...s,
										income: Pe(e.target.value)
									})
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, b.jsxs)("p", {
						className: "review-caption",
						children: [
							s.start,
							" 至 ",
							s.end,
							" · 人民币 · 填该日期范围内的发生额，不填跨期累计数。没有发生填 0，空白保留为待补。"
						]
					}),
					s.type === "month" && /* @__PURE__ */ (0, b.jsxs)("label", {
						className: "field",
						children: [/* @__PURE__ */ (0, b.jsx)("span", { children: "月预算口径" }), /* @__PURE__ */ (0, b.jsxs)("select", {
							value: s.budget?.mode ?? x,
							onChange: (e) => {
								ee(e.target.value), c({
									...s,
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
					/* @__PURE__ */ (0, b.jsx)("div", {
						className: "table-wrap",
						children: /* @__PURE__ */ (0, b.jsxs)("table", {
							className: "review-table",
							children: [/* @__PURE__ */ (0, b.jsx)("thead", { children: /* @__PURE__ */ (0, b.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, b.jsx)("th", { children: "项目" }),
								/* @__PURE__ */ (0, b.jsx)("th", { children: "本期金额" }),
								/* @__PURE__ */ (0, b.jsx)("th", { children: "发生事项／变化原因（可选）" })
							] }) }), /* @__PURE__ */ (0, b.jsx)("tbody", { children: se.map((e) => /* @__PURE__ */ (0, b.jsxs)("tr", { children: [
								/* @__PURE__ */ (0, b.jsxs)("th", {
									scope: "row",
									children: [e.name, /* @__PURE__ */ (0, b.jsx)("small", { children: e.id === "investment" ? "净划入，取回填负数" : e.id === "emergency" ? "净转入，取用填负数" : "实际净支出，扣除退款" })]
								}),
								/* @__PURE__ */ (0, b.jsx)("td", { children: /* @__PURE__ */ (0, b.jsx)("input", {
									type: "number",
									step: "0.01",
									required: !0,
									"aria-label": `${e.name}本期金额`,
									value: s.amounts[e.id] ?? "",
									onChange: (t) => c({
										...s,
										amounts: {
											...s.amounts,
											[e.id]: Pe(t.target.value)
										}
									})
								}) }),
								/* @__PURE__ */ (0, b.jsx)("td", { children: /* @__PURE__ */ (0, b.jsx)("input", {
									type: "text",
									"aria-label": `${e.name}本期事项`,
									placeholder: e.id === "learning" ? "课程、书籍、工具名称及用途" : void 0,
									value: s.notes[e.id] ?? "",
									onChange: (t) => c({
										...s,
										notes: {
											...s.notes,
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
					re && /* @__PURE__ */ (0, b.jsx)("p", {
						className: "review-status",
						role: "status",
						children: "来源模块已有更新，当前关键事项尚未刷新。"
					}),
					/* @__PURE__ */ (0, b.jsx)(Me, {
						focus: s.focus,
						onChange: (e) => c({
							...s,
							focus: e
						}),
						onRefresh: ge,
						onOpen: i,
						onUseBalances: _e
					}),
					/* @__PURE__ */ (0, b.jsxs)("section", {
						"aria-labelledby": "review-accounts-title",
						className: "review-accounts",
						children: [/* @__PURE__ */ (0, b.jsxs)("div", {
							className: "review-toolbar",
							children: [/* @__PURE__ */ (0, b.jsx)("h3", {
								id: "review-accounts-title",
								children: "本期账户余额"
							}), /* @__PURE__ */ (0, b.jsx)("button", {
								className: "secondary-button",
								type: "button",
								disabled: !n.length,
								onClick: me,
								children: "带入账户管理余额"
							})]
						}), s.accounts ? /* @__PURE__ */ (0, b.jsxs)(b.Fragment, { children: [
							/* @__PURE__ */ (0, b.jsxs)("p", {
								className: "review-caption",
								children: [
									"截至 ",
									s.end,
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
										/* @__PURE__ */ (0, b.jsx)("tbody", { children: s.accounts.map((e) => /* @__PURE__ */ (0, b.jsxs)("tr", { children: [
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
												onChange: (t) => j(e.id, { balance: Pe(t.target.value) })
											}) }),
											/* @__PURE__ */ (0, b.jsx)("td", { children: /* @__PURE__ */ (0, b.jsx)("input", {
												type: "checkbox",
												"aria-label": `${e.name}计入个人现金`,
												checked: e.included,
												onChange: (t) => j(e.id, { included: t.target.checked })
											}) }),
											/* @__PURE__ */ (0, b.jsx)("td", { children: /* @__PURE__ */ (0, b.jsx)("input", {
												type: "text",
												"aria-label": `${e.name}本期变动说明`,
												value: e.note,
												onChange: (t) => j(e.id, { note: t.target.value })
											}) })
										] }, e.id)) }),
										/* @__PURE__ */ (0, b.jsx)("tfoot", { children: /* @__PURE__ */ (0, b.jsxs)("tr", { children: [/* @__PURE__ */ (0, b.jsx)("th", { children: "个人现金合计" }), /* @__PURE__ */ (0, b.jsx)("td", {
											colSpan: 3,
											children: s.balances.cash === null ? "待补余额" : M(s.balances.cash)
										})] }) })
									]
								})
							}),
							/* @__PURE__ */ (0, b.jsxs)("div", {
								className: "review-account-options",
								children: [/* @__PURE__ */ (0, b.jsxs)("label", { children: [/* @__PURE__ */ (0, b.jsx)("input", {
									type: "checkbox",
									required: !0,
									checked: l,
									onChange: (e) => u(e.target.checked)
								}), "已核对本期期末账户余额"] }), /* @__PURE__ */ (0, b.jsxs)("label", { children: [/* @__PURE__ */ (0, b.jsx)("input", {
									type: "checkbox",
									checked: ne && d,
									disabled: !ne,
									onChange: (e) => f(e.target.checked)
								}), "保存时同步余额到账户管理（仅当天）"] })]
							}),
							!ne && /* @__PURE__ */ (0, b.jsx)("p", {
								className: "review-caption",
								children: "历史日期仅保存复盘快照，不覆盖当前账户管理余额。"
							})
						] }) : /* @__PURE__ */ (0, b.jsx)("p", {
							className: "review-caption",
							children: "本期尚无账户明细，可带入核对；不带入时保留手填现金合计。"
						})]
					}),
					/* @__PURE__ */ (0, b.jsx)("h3", { children: "期末个人资产与负债" }),
					/* @__PURE__ */ (0, b.jsx)("div", {
						className: "review-fields balances",
						children: Object.entries(k).map(([e, t]) => /* @__PURE__ */ (0, b.jsxs)("label", {
							className: "field",
							children: [/* @__PURE__ */ (0, b.jsxs)("span", { children: [t, e === "cash" && s.accounts ? " · 账户合计" : ""] }), /* @__PURE__ */ (0, b.jsx)("input", {
								type: "number",
								min: "0",
								step: "0.01",
								required: !0,
								readOnly: e === "cash" && !!s.accounts,
								"aria-label": t,
								value: s.balances[e] ?? "",
								onChange: (t) => c({
									...s,
									balances: {
										...s.balances,
										[e]: Pe(t.target.value)
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
							value: s.summary,
							onChange: (e) => c({
								...s,
								summary: e.target.value
							})
						})]
					}),
					/* @__PURE__ */ (0, b.jsxs)("div", {
						className: "review-toolbar",
						children: [/* @__PURE__ */ (0, b.jsx)("button", {
							className: "primary-button",
							type: "submit",
							children: "保存并分析"
						}), s.type !== "week" && /* @__PURE__ */ (0, b.jsx)("button", {
							className: "secondary-button",
							type: "button",
							onClick: A,
							children: "从已有记录汇总"
						})]
					})
				]
			}),
			p === "report" && (!T || !E ? /* @__PURE__ */ (0, b.jsx)("p", { children: "尚无复盘记录。" }) : /* @__PURE__ */ (0, b.jsxs)("section", {
				"aria-label": "周期对比报告",
				children: [
					/* @__PURE__ */ (0, b.jsxs)("div", {
						className: "review-toolbar",
						children: [/* @__PURE__ */ (0, b.jsxs)("label", {
							className: "field",
							children: [/* @__PURE__ */ (0, b.jsx)("span", { children: "报告期间" }), /* @__PURE__ */ (0, b.jsx)("select", {
								"aria-label": "报告期间",
								value: T.id,
								onChange: (e) => g(e.target.value),
								children: e.map((e) => /* @__PURE__ */ (0, b.jsxs)("option", {
									value: e.id,
									children: [
										O[e.type],
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
								onClick: () => ae(D, "修订会替换当前未保存的输入，是否继续？", () => {
									c({ ...T }), u(!1), m("entry"), y("");
								}),
								children: "修订本期"
							}), /* @__PURE__ */ (0, b.jsx)("button", {
								className: "secondary-button",
								type: "button",
								onClick: () => Ne(`finance-${T.type}-${T.start}.md`, Ae(T, e), "text/markdown;charset=utf-8"),
								children: "下载报告"
							})]
						})]
					}),
					/* @__PURE__ */ (0, b.jsx)("p", {
						className: "review-caption",
						children: E.previous ? `对比上期：${E.previous.start} 至 ${E.previous.end}` : "首次基准，暂无上期对比"
					}),
					/* @__PURE__ */ (0, b.jsxs)("div", {
						className: "review-metrics",
						children: [
							/* @__PURE__ */ (0, b.jsxs)("div", { children: [/* @__PURE__ */ (0, b.jsx)("span", { children: "本期收入" }), /* @__PURE__ */ (0, b.jsx)("strong", { children: M(E.totals.income) })] }),
							/* @__PURE__ */ (0, b.jsxs)("div", { children: [/* @__PURE__ */ (0, b.jsx)("span", { children: "本期实际消费" }), /* @__PURE__ */ (0, b.jsx)("strong", { children: M(E.totals.spending) })] }),
							/* @__PURE__ */ (0, b.jsxs)("div", { children: [/* @__PURE__ */ (0, b.jsx)("span", { children: "本期收支结余" }), /* @__PURE__ */ (0, b.jsx)("strong", { children: M(E.totals.surplus) })] }),
							/* @__PURE__ */ (0, b.jsxs)("div", { children: [
								/* @__PURE__ */ (0, b.jsx)("span", { children: "期末净资产" }),
								/* @__PURE__ */ (0, b.jsx)("strong", { children: M(E.totals.netWorth) }),
								/* @__PURE__ */ (0, b.jsxs)("small", { children: ["较上期余额 ", Fe(E.netWorthDelta)] })
							] })
						]
					}),
					/* @__PURE__ */ (0, b.jsxs)("section", {
						className: "review-highlights",
						"aria-label": "本期关键变化",
						children: [/* @__PURE__ */ (0, b.jsx)("h3", { children: "本期关键变化" }), E.highlights.map((e) => /* @__PURE__ */ (0, b.jsxs)("details", {
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
					/* @__PURE__ */ (0, b.jsx)("ul", { children: E.actions.map((e) => /* @__PURE__ */ (0, b.jsx)("li", { children: e }, e)) }),
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
								] }) }), /* @__PURE__ */ (0, b.jsx)("tbody", { children: E.rows.map((e) => /* @__PURE__ */ (0, b.jsxs)("tr", { children: [
									/* @__PURE__ */ (0, b.jsxs)("th", {
										scope: "row",
										children: [e.name, e.flow === "transfer" && /* @__PURE__ */ (0, b.jsx)("small", { children: "划拨，不计消费" })]
									}),
									/* @__PURE__ */ (0, b.jsx)("td", { children: M(e.amount) }),
									/* @__PURE__ */ (0, b.jsx)("td", { children: e.previous === null ? "无基准" : M(e.previous) }),
									/* @__PURE__ */ (0, b.jsx)("td", { children: Fe(e.delta) }),
									/* @__PURE__ */ (0, b.jsx)("td", { children: e.note || "未填写" })
								] }, e.id)) })]
							})
						})]
					}),
					E.accountRows.length > 0 && /* @__PURE__ */ (0, b.jsxs)("details", {
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
								] }) }), /* @__PURE__ */ (0, b.jsx)("tbody", { children: E.accountRows.map((e) => /* @__PURE__ */ (0, b.jsxs)("tr", { children: [
									/* @__PURE__ */ (0, b.jsxs)("th", {
										scope: "row",
										children: [e.name, /* @__PURE__ */ (0, b.jsx)("small", { children: e.purpose })]
									}),
									/* @__PURE__ */ (0, b.jsx)("td", { children: e.current === null ? "未记录" : M(e.current) }),
									/* @__PURE__ */ (0, b.jsx)("td", { children: e.previous === null ? "无基准" : M(e.previous) }),
									/* @__PURE__ */ (0, b.jsx)("td", { children: Fe(e.delta) }),
									/* @__PURE__ */ (0, b.jsx)("td", { children: e.included === null ? "未记录" : e.included ? "是" : "否" }),
									/* @__PURE__ */ (0, b.jsxs)("td", { children: [e.note || "未填写", /* @__PURE__ */ (0, b.jsx)("small", { children: e.status })] })
								] }, e.id)) })]
							})
						})]
					}),
					T.budget && /* @__PURE__ */ (0, b.jsxs)("details", {
						className: "review-method",
						open: !0,
						children: [/* @__PURE__ */ (0, b.jsxs)("summary", { children: ["月预算核对 · ", T.budget.mode === "normal" ? "普通月" : "出差月"] }), /* @__PURE__ */ (0, b.jsx)("div", {
							className: "table-wrap",
							children: /* @__PURE__ */ (0, b.jsxs)("table", {
								className: "review-table",
								children: [/* @__PURE__ */ (0, b.jsx)("thead", { children: /* @__PURE__ */ (0, b.jsxs)("tr", { children: [
									/* @__PURE__ */ (0, b.jsx)("th", { children: "项目" }),
									/* @__PURE__ */ (0, b.jsx)("th", { children: "整月预算" }),
									/* @__PURE__ */ (0, b.jsx)("th", { children: "本期金额" }),
									/* @__PURE__ */ (0, b.jsx)("th", { children: "预算减本期" })
								] }) }), /* @__PURE__ */ (0, b.jsx)("tbody", { children: E.budgetRows.map((e) => /* @__PURE__ */ (0, b.jsxs)("tr", { children: [
									/* @__PURE__ */ (0, b.jsx)("th", { children: e.name }),
									/* @__PURE__ */ (0, b.jsx)("td", { children: M(e.budget) }),
									/* @__PURE__ */ (0, b.jsx)("td", { children: M(e.amount) }),
									/* @__PURE__ */ (0, b.jsx)("td", { children: M(e.remaining) })
								] }, e.id)) })]
							})
						})]
					}),
					T.summary && /* @__PURE__ */ (0, b.jsxs)("p", {
						className: "review-caption",
						children: ["本期补充：", T.summary]
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
									] }) }), /* @__PURE__ */ (0, b.jsx)("tbody", { children: Object.entries(k).map(([e, t]) => /* @__PURE__ */ (0, b.jsxs)("tr", { children: [
										/* @__PURE__ */ (0, b.jsx)("th", { children: t }),
										/* @__PURE__ */ (0, b.jsx)("td", { children: M(T.balances[e]) }),
										/* @__PURE__ */ (0, b.jsx)("td", { children: E.previous ? M(E.previous.balances[e]) : "无基准" })
									] }, e)) })]
								})
							}),
							/* @__PURE__ */ (0, b.jsxs)("p", { children: [
								"日均消费：本期 ",
								M(E.totals.spending / E.totals.days),
								E.prior ? `；上期 ${M(E.prior.spending / E.prior.days)}` : ""
							] }),
							/* @__PURE__ */ (0, b.jsx)("ul", { children: E.notices.map((e) => /* @__PURE__ */ (0, b.jsx)("li", { children: e }, e)) })
						]
					})
				]
			}))
		]
	});
}
//#endregion
//#region app/salary-model.ts
var Le = 13e3, Re = "2026-10";
function ze(e, t, n) {
	return e.map((e) => e.id >= n ? {
		...e,
		salary: t
	} : e);
}
function Be(e, t, n) {
	return n === 1 ? {
		salary: t,
		records: e
	} : {
		salary: Le,
		records: ze(e, Le, Re)
	};
}
//#endregion
//#region app/spending-detail-model.ts
var Ve = [
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
function He(e) {
	return Ve.some((t) => t.id === e.group) ? e.group : "unassigned";
}
var Ue = (e) => e.reduce((e, t) => e + Math.round(t * 100), 0) / 100;
function We(e) {
	let t = e.filter((e) => He(e) === "learning" && e.actual !== 0);
	return {
		rows: t,
		total: Ue(t.map((e) => e.actual)),
		unassigned: Ue(e.filter((e) => He(e) === "unassigned").map((e) => e.actual)),
		missingNotes: t.filter((e) => !e.note?.trim()).length
	};
}
var N = [
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
function Ge(e) {
	let t = N.filter((t) => !e.some((e) => e.id === `detail-${t.id}` || e.name.trim() === t.name));
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
function Ke(e) {
	return e.map((e) => ({
		...e,
		actual: 0,
		note: ""
	}));
}
//#endregion
//#region app/page.tsx
var P = [
	"#1f5fbf",
	"#07835f",
	"#b7791f",
	"#6852bd",
	"#c53030",
	"#2b6cb0",
	"#0f766e",
	"#805ad5"
], qe = /* @__PURE__ */ new Date("2026-06-14T00:00:00+08:00"), Je = [
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
], Ye = [
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
function Xe(e = {}) {
	return Ye.map((t) => ({
		...t,
		actual: e[t.id] ?? 0
	}));
}
var Ze = [
	{
		id: "2026-06",
		label: "2026年6月",
		salary: Le,
		payday: 10,
		stockIncome: 0,
		otherIncome: 0,
		budgets: Ye.map((e) => ({ ...e }))
	},
	{
		id: "2026-07",
		label: "2026年7月",
		salary: Le,
		payday: 10,
		stockIncome: 0,
		otherIncome: 0,
		budgets: Xe()
	},
	{
		id: "2026-08",
		label: "2026年8月",
		salary: Le,
		payday: 10,
		stockIncome: 0,
		otherIncome: 0,
		budgets: Xe()
	},
	{
		id: "2026-09",
		label: "2026年9月",
		salary: Le,
		payday: 10,
		stockIncome: 0,
		otherIncome: 0,
		budgets: Xe()
	},
	{
		id: "2026-10",
		label: "2026年10月",
		salary: Le,
		payday: 10,
		stockIncome: 0,
		otherIncome: 0,
		budgets: Xe()
	},
	{
		id: "2026-11",
		label: "2026年11月",
		salary: Le,
		payday: 10,
		stockIncome: 0,
		otherIncome: 0,
		budgets: Xe()
	},
	{
		id: "2026-12",
		label: "2026年12月",
		salary: Le,
		payday: 10,
		stockIncome: 0,
		otherIncome: 0,
		budgets: Xe()
	}
], Qe = [
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
], $e = [
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
], et = [
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
], tt = [
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
], nt = [
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
], rt = [
	"应急",
	"旅行",
	"搬家",
	"分期",
	"投资",
	"家庭",
	"其他"
], it = [
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
], at = [
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
], ot = [
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
], st = "2026-06", ct = "personal-finance-management-data-v2", lt = "personal-finance-management-snapshots-v1", ut = "personal-finance-management-monthly-archives-v1", dt = "personal-finance-management-cloud-sync-v1", ft = "personal-finance-management-cloud-passphrase-v1", pt = "personal-finance-management-sync.json", mt = 20, ht = 48, gt = [
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
		desc: "按已保存账本推演6个月资金变化"
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
function F(e) {
	return new Intl.NumberFormat("zh-CN", {
		style: "currency",
		currency: "CNY",
		maximumFractionDigits: 0
	}).format(Number.isFinite(e) ? e : 0);
}
function I(e, t = 0, n = 100) {
	return Math.min(n, Math.max(t, Number.isFinite(e) ? e : t));
}
function _t(e) {
	let t = Number(e);
	return Number.isFinite(t) ? t : 0;
}
function vt(e) {
	return `${I(e * 100).toFixed(0)}%`;
}
function yt(e) {
	return Number.isFinite(e) ? `${(e * 100).toFixed(1)}%` : "0.0%";
}
function bt(e) {
	return e.replace("2026年", "").replace("月", "月");
}
function xt(e, t) {
	let [n, r] = e.split("-"), i = Number(n), a = Number(r);
	if (!Number.isFinite(i) || !Number.isFinite(a)) return e;
	let o = new Date(Date.UTC(i, a - 1 + t, 1));
	return `${o.getUTCFullYear()}-${String(o.getUTCMonth() + 1).padStart(2, "0")}`;
}
function St(e) {
	let [t, n] = e.split("-"), r = Number(t), i = Number(n);
	return !Number.isFinite(r) || !Number.isFinite(i) ? e : `${r}年${i}月`;
}
function Ct(e) {
	return e.salary + Math.max(e.stockIncome, 0) + e.otherIncome;
}
function wt(e) {
	return e.budgets.reduce((e, t) => e + t.actual, 0);
}
function Tt(e) {
	return e.budgets.reduce((e, t) => e + t.plan, 0);
}
function Et(e) {
	let t = `${e.name} ${e.type} ${e.purpose}`.toLowerCase();
	return t.includes("余额宝") && t.includes("8514") || t.includes("a股") ? "aShare" : t.includes("中国银行") && t.includes("8292") || t.includes("美股") || t.includes("us stock") || t.includes("us-stock") ? "usShare" : null;
}
function Dt(e) {
	return Et(e) !== null;
}
function Ot(e) {
	let t = `${e.name} ${e.type} ${e.purpose}`.toLowerCase();
	return !Dt(e) && (t.includes("旅游") || t.includes("旅行"));
}
function kt(e) {
	let t = `${e.name} ${e.type} ${e.purpose}`.toLowerCase();
	return !Dt(e) && (t.includes("学习") || t.includes("教育") || t.includes("成长"));
}
function At(e) {
	let t = `${e.name} ${e.type} ${e.purpose}`.toLowerCase().replace(/\s+/g, ""), n = e.id === "icbc2616" || t.includes("工行2616"), r = t.includes("微信") || t.includes("现金"), i = t.includes("银行卡") || t.includes("银行") || t.includes("工行"), a = t.includes("余额宝");
	return !n && !r && (i || a);
}
function jt(e) {
	let t = e.name.toLowerCase();
	return t.includes("旅游") || t.includes("旅行") ? "travel" : t.includes("学习") || t.includes("教育") || t.includes("成长") ? "learning" : t.includes("父母") || t.includes("爸妈") || t.includes("孝敬") ? "parent" : t.includes("伴侣") || t.includes("情侣") || t.includes("共同") ? "partner" : t.includes("应急") || t.includes("紧急") ? "emergency" : "other";
}
function Mt(e) {
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
		let e = jt(n);
		e === "travel" ? (t.travelCurrent += n.current, t.travelMonthly += n.monthly, t.travelActualMonthly += n.actualMonthly, t.hasTravel = !0) : e === "learning" ? (t.learningCurrent += n.current, t.learningMonthly += n.monthly, t.learningActualMonthly += n.actualMonthly, t.hasLearning = !0) : e === "parent" ? (t.parentCurrent += n.current, t.parentMonthly += n.monthly, t.parentActualMonthly += n.actualMonthly, t.hasParent = !0) : e === "partner" ? (t.partnerCurrent += n.current, t.partnerMonthly += n.monthly, t.partnerActualMonthly += n.actualMonthly, t.hasPartner = !0) : e === "emergency" ? (t.emergencyCurrent += n.current, t.emergencyMonthly += n.monthly, t.emergencyActualMonthly += n.actualMonthly, t.hasEmergency = !0) : e === "other" && (t.otherCurrent += n.current, t.otherMonthly += n.monthly, t.otherActualMonthly += n.actualMonthly);
	}
	return t;
}
function Nt(e) {
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
	}).filter((e) => e !== null), n = t.length ? t : nt, r = n.some((e) => jt(e) === "parent") ? n : (() => {
		let e = nt.find((e) => e.id === "parent-saving");
		return e ? [...n, e] : n;
	})();
	if (r.some((e) => jt(e) === "partner")) return r;
	let i = nt.find((e) => e.id === "partner");
	return i ? [...r, i] : r;
}
function Pt(e) {
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
function Ft(e) {
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
function It(e) {
	return Array.isArray(e) ? e.map((e, t) => {
		if (!e || typeof e != "object") return null;
		let n = e, r = rt.includes(n.kind) ? n.kind : "其他";
		return {
			id: typeof n.id == "string" && n.id ? n.id : `fund-bucket-${t + 1}`,
			name: typeof n.name == "string" && n.name.trim() ? n.name : `大花费项目 ${t + 1}`,
			kind: r,
			target: typeof n.target == "number" ? n.target : 0,
			current: typeof n.current == "number" ? n.current : 0,
			dueDate: typeof n.dueDate == "string" && n.dueDate ? n.dueDate : "2026-12-31",
			locked: typeof n.locked == "boolean" ? n.locked : !0,
			note: typeof n.note == "string" ? n.note : ""
		};
	}).filter((e) => e !== null) : [];
}
function Lt(e) {
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
function Rt(e) {
	return Array.isArray(e) ? e.map((e, t) => {
		if (!e || typeof e != "object") return null;
		let n = e, r = typeof n.monthId == "string" && n.monthId ? n.monthId : "";
		return r ? {
			id: typeof n.id == "string" && n.id ? n.id : `${r}-${t}`,
			monthId: r,
			label: typeof n.label == "string" && n.label ? n.label : St(r),
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
			accounts: Lt(n.accounts)
		} : null;
	}).filter((e) => e !== null).sort((e, t) => t.monthId.localeCompare(e.monthId) || t.savedAt.localeCompare(e.savedAt)).slice(0, ht) : [];
}
function zt(e) {
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
function Bt(e) {
	return $e.map((t) => ({
		...t,
		amount: t.id === "house-debt" ? e.houseDebt ?? 0 : t.id === "car-debt" ? e.carDebt ?? 0 : e.otherDebt ?? 0
	}));
}
function Vt(e) {
	let t = /* @__PURE__ */ new Date(`${e}T00:00:00+08:00`);
	return Math.ceil((t.getTime() - qe.getTime()) / 864e5);
}
function Ht(e, t) {
	let [n, r] = e.split("-"), [i, a] = t.split("-"), o = Number(n), s = Number(r), c = Number(i), l = Number(a);
	return [
		o,
		s,
		c,
		l
	].every(Number.isFinite) ? Math.max(1, (c - o) * 12 + l - s + 1) : 1;
}
function Ut(e) {
	return new Date(e).toLocaleString("zh-CN", {
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
		hour: "2-digit",
		minute: "2-digit"
	});
}
function Wt(e) {
	return e > 0 ? `+${F(e)}` : e < 0 ? `-${F(Math.abs(e))}` : F(0);
}
function Gt(e) {
	return e > 0 ? "positive" : e < 0 ? "negative" : "calculated-cell";
}
function Kt(e) {
	return [...e].sort((e, t) => e.monthId.localeCompare(t.monthId) || e.savedAt.localeCompare(t.savedAt));
}
function qt(e, t) {
	return Kt(e).filter((e) => e.monthId < t).at(-1);
}
function Jt(e) {
	let t = "";
	for (let n = 0; n < e.length; n += 1) t += String.fromCharCode(e[n]);
	return window.btoa(t);
}
function Yt(e) {
	let t = window.atob(e), n = new Uint8Array(t.length);
	for (let e = 0; e < t.length; e += 1) n[e] = t.charCodeAt(e);
	return n;
}
async function Xt(e, t, n) {
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
async function Zt(e, t) {
	let n = window.crypto.getRandomValues(new Uint8Array(16)), r = window.crypto.getRandomValues(new Uint8Array(12)), i = 18e4, a = await Xt(t, n, i), o = new TextEncoder().encode(JSON.stringify(e)), s = await window.crypto.subtle.encrypt({
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
			salt: Jt(n)
		},
		cipher: {
			name: "AES-GCM",
			iv: Jt(r),
			data: Jt(new Uint8Array(s))
		}
	};
}
async function Qt(e, t) {
	if (e.app !== "personal-finance-management" || e.version !== 1) throw Error("invalid cloud backup");
	let n = await Xt(t, Yt(e.kdf.salt), e.kdf.iterations), r = await window.crypto.subtle.decrypt({
		name: "AES-GCM",
		iv: Yt(e.cipher.iv)
	}, n, Yt(e.cipher.data));
	return JSON.parse(new TextDecoder().decode(r));
}
async function $t(e, t, n = {}) {
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
async function en({ backup: e, gistId: t, passphrase: n, token: r }) {
	let i = await Zt(e, n), a = {
		description: "Personal Finance Management encrypted sync data",
		public: !1,
		files: { [pt]: { content: JSON.stringify(i, null, 2) } }
	};
	return t.trim() ? $t(`/gists/${t.trim()}`, r, {
		method: "PATCH",
		body: JSON.stringify({ files: a.files })
	}) : $t("/gists", r, {
		method: "POST",
		body: JSON.stringify(a)
	});
}
async function tn(e, t, n) {
	let r = await $t(`/gists/${e.trim()}`, t), i = r.files?.[pt] ?? Object.values(r.files ?? {})[0];
	if (!i?.content) throw Error("cloud sync file not found");
	return Qt(JSON.parse(i.content), n);
}
function nn({ label: e, value: t, onChange: n, step: r = 100, disabled: i = !1 }) {
	return /* @__PURE__ */ (0, b.jsxs)("label", {
		className: "field",
		children: [/* @__PURE__ */ (0, b.jsx)("span", { children: e }), /* @__PURE__ */ (0, b.jsx)("input", {
			disabled: i,
			inputMode: "decimal",
			min: "0",
			step: r,
			type: "number",
			value: Number.isFinite(t) ? t : 0,
			onChange: (e) => n(_t(e.target.value))
		})]
	});
}
function rn() {
	let [e, t] = (0, _.useState)(C), [n, r] = (0, _.useState)([]), [i, a] = (0, _.useState)(x), [o, s] = (0, _.useState)(!1), [c, l] = (0, _.useState)([]), [u, d] = (0, _.useState)(null), [f, p] = (0, _.useState)("月"), [m, h] = (0, _.useState)("2026-06"), [g, v] = (0, _.useState)(Ze), [y, ee] = (0, _.useState)(Je), [w, te] = (0, _.useState)(Qe), [T, ne] = (0, _.useState)(7.25), [D, ie] = (0, _.useState)(.93), [se, O] = (0, _.useState)(2250), [k, ce] = (0, _.useState)(1500), [le, ue] = (0, _.useState)(0), [de, A] = (0, _.useState)(3e3), [j, fe] = (0, _.useState)(500), [pe, me] = (0, _.useState)(2e3), [he, ge] = (0, _.useState)(3), [_e, ye] = (0, _.useState)(4500), [be, xe] = (0, _.useState)(et), [Se, Ce] = (0, _.useState)($e), [we, Ee] = (0, _.useState)(tt), [De, Oe] = (0, _.useState)(nt), [ke, Ae] = (0, _.useState)(it), [je, Me] = (0, _.useState)(at), [Ne, Pe] = (0, _.useState)([]), [Fe, Le] = (0, _.useState)([]), [Re, Ve] = (0, _.useState)([]), [He, Ue] = (0, _.useState)([]), [N, qe] = (0, _.useState)({
		gistId: "",
		token: "",
		autoSync: !1,
		rememberPassphrase: !1
	}), [Xe, rt] = (0, _.useState)(""), [pt, ht] = (0, _.useState)("未连接云同步"), [_t, yt] = (0, _.useState)(!1), [Dt, Lt] = (0, _.useState)(!1), [Gt, Jt] = (0, _.useState)("正在读取本地数据…"), [Yt, Xt] = (0, _.useState)("报告随数据自动更新"), [Zt, Qt] = (0, _.useState)(!1), $t = (0, _.useRef)(null), rn = (0, _.useRef)(null);
	function z() {
		return {
			salarySettingsVersion: 1,
			annualBudgetPlan: e,
			financeReviews: n,
			monthlyCashPlan: i,
			period: f,
			selectedMonth: m,
			monthlyRecords: g,
			accounts: y,
			holdings: w,
			fxUsd: T,
			fxHkd: D,
			aSharePlan: se,
			usSharePlan: k,
			hkSharePlan: le,
			travelSaving: de,
			learningSaving: j,
			emergencyFund: pe,
			emergencyMonths: he,
			emergencyMonthlyNeed: _e,
			balanceAssets: be,
			liabilities: Se,
			reminders: we,
			goals: De,
			fundBuckets: ke,
			futureCapabilities: je,
			cashflowHiddenBuiltinIds: Ne,
			cashflowCustomItems: Fe
		};
	}
	function B(e = z()) {
		window.localStorage.setItem(ct, JSON.stringify(e));
	}
	function ln(e = {}) {
		return {
			version: 1,
			exportedAt: (/* @__PURE__ */ new Date()).toISOString(),
			data: e.data ?? z(),
			snapshots: e.snapshots ?? Re,
			monthlyArchives: e.monthlyArchives ?? He
		};
	}
	function un(e, t = Xe) {
		qe(e), window.localStorage.setItem(dt, JSON.stringify(e)), e.rememberPassphrase ? t.trim() && window.localStorage.setItem(ft, t) : window.localStorage.removeItem(ft);
	}
	function dn(e) {
		let n = e.financeReviews === void 0 ? void 0 : Te(e.financeReviews), i = E(e.annualBudgetPlan), o = Be(Array.isArray(e.monthlyRecords) ? e.monthlyRecords : Ze, i.salary, e.salarySettingsVersion);
		t({
			...i,
			salary: o.salary
		}), n && r(n), a({
			...S(e.monthlyCashPlan),
			income: o.salary
		}), e.period && p(e.period), e.selectedMonth && h(e.selectedMonth), v(o.records), Array.isArray(e.accounts) && ee(e.accounts), Array.isArray(e.holdings) && te(e.holdings), typeof e.fxUsd == "number" && ne(e.fxUsd), typeof e.fxHkd == "number" && ie(e.fxHkd), typeof e.aSharePlan == "number" && O(e.aSharePlan), typeof e.usSharePlan == "number" && ce(e.usSharePlan), typeof e.hkSharePlan == "number" && ue(e.hkSharePlan), typeof e.travelSaving == "number" && A(e.travelSaving), typeof e.learningSaving == "number" && fe(e.learningSaving), typeof e.emergencyFund == "number" && me(e.emergencyFund), typeof e.emergencyMonths == "number" && ge(e.emergencyMonths), typeof e.emergencyMonthlyNeed == "number" && ye(e.emergencyMonthlyNeed);
		let s = Ft(e.balanceAssets);
		s.length > 0 && xe(s);
		let c = Pt(e.liabilities);
		if (c.length > 0 ? Ce(c) : (typeof e.houseDebt == "number" || typeof e.carDebt == "number" || typeof e.otherDebt == "number") && Ce(Bt(e)), Array.isArray(e.reminders) && Ee(e.reminders), Array.isArray(e.goals) && Oe(Nt(e.goals)), Array.isArray(e.fundBuckets)) {
			let t = It(e.fundBuckets);
			t.length > 0 && Ae(t);
		}
		Array.isArray(e.futureCapabilities) && Me(e.futureCapabilities), Array.isArray(e.cashflowHiddenBuiltinIds) && Pe(e.cashflowHiddenBuiltinIds.filter((e) => ot.includes(e))), Array.isArray(e.cashflowCustomItems) && Le(e.cashflowCustomItems);
	}
	(0, _.useEffect)(() => {
		let e = !1, t = window.setTimeout(() => {
			(async () => {
				let t = !1, n = zt(null), r = "";
				try {
					let e = window.localStorage.getItem(ct), i = window.localStorage.getItem(lt), a = window.localStorage.getItem(ut), o = window.localStorage.getItem(dt);
					if (r = window.localStorage.getItem(ft) ?? "", e && (dn(JSON.parse(e)), t = !0), i) {
						let e = JSON.parse(i);
						Array.isArray(e) && Ve(e.slice(0, mt));
					}
					a && Ue(Rt(JSON.parse(a))), o && (n = zt(JSON.parse(o)), qe(n), n.rememberPassphrase && r && rt(r), ht(n.gistId ? "已读取云同步配置，准备连接云端" : "未连接云同步"));
				} catch {
					Jt("本地数据读取失败，原数据已保留；已暂停自动保存，请先恢复有效备份后刷新。");
					return;
				}
				if (n.gistId.trim() && n.token.trim() && n.rememberPassphrase && r.trim()) {
					yt(!0), ht("正在打开时自动拉取云端数据…");
					try {
						let t = await tn(n.gistId, n.token, r);
						if (e) return;
						Xn(t);
						let i = (/* @__PURE__ */ new Date()).toISOString();
						un({
							...n,
							lastPulledAt: i
						}, r), Jt("已从云端自动恢复最新数据"), ht(`云端数据已自动拉取 · ${Ut(i)}`);
					} catch {
						e || (Jt(t ? "已恢复本机数据，云端自动拉取失败" : "已启用自动保存，云端自动拉取失败"), ht("打开时自动拉取失败，请检查同步密码、Token 和 Gist ID。"));
					} finally {
						e || yt(!1);
					}
				} else Jt(t ? "已恢复上次保存的数据" : "已启用自动保存");
				e || Qt(!0);
			})();
		}, 0);
		return () => {
			e = !0, window.clearTimeout(t);
		};
	}, []), (0, _.useEffect)(() => {
		if (!Zt) return;
		let e = window.setTimeout(() => {
			try {
				B(), Jt(`已自动保存 · ${(/* @__PURE__ */ new Date()).toLocaleTimeString("zh-CN", {
					hour: "2-digit",
					minute: "2-digit"
				})}`), N.autoSync && N.gistId.trim() && N.token.trim() && Xe.trim() && !_t && ($t.current && window.clearTimeout($t.current), $t.current = window.setTimeout(() => {
					Zn(!0);
				}, 3500));
			} catch {
				Jt("自动保存失败，请导出备份");
			}
		}, 300);
		return () => {
			window.clearTimeout(e), $t.current && window.clearTimeout($t.current);
		};
	}, [
		Zt,
		e,
		n,
		i,
		f,
		m,
		g,
		y,
		w,
		T,
		D,
		se,
		k,
		le,
		de,
		j,
		pe,
		he,
		_e,
		be,
		Se,
		we,
		De,
		ke,
		je,
		Ne,
		Fe,
		N.autoSync,
		N.gistId,
		N.token,
		Xe,
		_t
	]);
	async function fn() {
		let e = {
			id: `${Date.now()}`,
			createdAt: (/* @__PURE__ */ new Date()).toISOString(),
			data: z()
		}, t = [e, ...Re].slice(0, mt);
		Ve(t), window.localStorage.setItem(lt, JSON.stringify(t)), B(e.data), Lt(!0), Jt("历史版本已保存，正在同步云端…"), Jt(await Zn(!1, ln({
			data: e.data,
			snapshots: t
		})) ? "完整版本已保存并上传云端" : "完整版本已保存到本机，云端未更新");
	}
	function jn(e) {
		window.confirm(`确定恢复 ${Ut(e.createdAt)} 的版本吗？当前数据会被该版本覆盖。`) && (dn(e.data), B(e.data), Jt("历史版本已恢复并自动保存"));
	}
	function Wn(e) {
		let t = Re.filter((t) => t.id !== e);
		Ve(t), window.localStorage.setItem(lt, JSON.stringify(t));
	}
	function Gn() {
		let e = ln(), t = new Blob([JSON.stringify(e, null, 2)], { type: "application/json" }), n = URL.createObjectURL(t), r = document.createElement("a");
		r.href = n, r.download = `personal-finance-backup-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.json`, r.click(), URL.revokeObjectURL(n), Jt("备份文件已导出");
	}
	async function Kn(e) {
		try {
			let t = JSON.parse(await e.text());
			if (!t.data || !Array.isArray(t.data.accounts) || !Array.isArray(t.data.monthlyRecords)) throw Error("invalid backup");
			if (dn(t.data), B(t.data), Array.isArray(t.snapshots)) {
				let e = t.snapshots.slice(0, mt);
				Ve(e), window.localStorage.setItem(lt, JSON.stringify(e));
			}
			if (Array.isArray(t.monthlyArchives)) {
				let e = Rt(t.monthlyArchives);
				Ue(e), window.localStorage.setItem(ut, JSON.stringify(e));
			}
			Jt("备份已导入并自动保存");
		} catch {
			window.alert("无法导入：请选择由本网页导出的 JSON 备份文件。");
		} finally {
			rn.current && (rn.current.value = "");
		}
	}
	function qn(e) {
		un({
			...N,
			...e
		});
	}
	function Jn(e) {
		rt(e), N.rememberPassphrase && (e.trim() ? window.localStorage.setItem(ft, e) : window.localStorage.removeItem(ft));
	}
	function Yn() {
		un({
			gistId: "",
			token: "",
			autoSync: !1,
			rememberPassphrase: !1
		}), rt(""), ht("已断开云同步配置");
	}
	function Xn(e) {
		dn(e.data);
		let t = Array.isArray(e.snapshots) ? e.snapshots.slice(0, mt) : [], n = Rt(e.monthlyArchives);
		Ve(t), Ue(n), B(e.data), window.localStorage.setItem(lt, JSON.stringify(t)), window.localStorage.setItem(ut, JSON.stringify(n));
	}
	async function Zn(e = !1, t = ln()) {
		if (!N.token.trim()) return e || (l((e) => e.includes("cloudSync") ? e : [...e, "cloudSync"]), window.alert("请先填写 GitHub Token。")), !1;
		if (!Xe.trim()) return e || (l((e) => e.includes("cloudSync") ? e : [...e, "cloudSync"]), window.alert("请先填写同步密码。这个密码用于加密云端数据。")), !1;
		yt(!0), e || ht("正在加密并上传到 GitHub Gist…");
		try {
			let n = await en({
				backup: t,
				gistId: N.gistId,
				passphrase: Xe,
				token: N.token
			}), r = (/* @__PURE__ */ new Date()).toISOString();
			return un({
				...N,
				gistId: n.id,
				lastPushedAt: r
			}), ht(`${e ? "已自动云同步" : "云端保存完成"} · ${Ut(r)}`), !0;
		} catch (t) {
			return ht("云端保存失败，请检查 Token、Gist ID 和网络。"), e || window.alert(t instanceof Error ? t.message : "云端保存失败"), !1;
		} finally {
			yt(!1);
		}
	}
	async function Qn() {
		if (!N.gistId.trim()) {
			window.alert("请先填写 Gist ID，或先上传一次创建云端存档。");
			return;
		}
		if (!N.token.trim()) {
			window.alert("请先填写 GitHub Token。");
			return;
		}
		if (!Xe.trim()) {
			window.alert("请先填写同步密码。");
			return;
		}
		if (window.confirm("确定从云端覆盖当前本机数据吗？建议覆盖前先导出备份。")) {
			yt(!0), ht("正在从 GitHub Gist 拉取并解密…");
			try {
				Xn(await tn(N.gistId, N.token, Xe));
				let e = (/* @__PURE__ */ new Date()).toISOString();
				un({
					...N,
					lastPulledAt: e
				}), Jt("已从云端恢复并自动保存到本机"), ht(`云端数据已拉取 · ${Ut(e)}`);
			} catch (e) {
				ht("云端拉取失败，请检查同步密码、Token 和 Gist ID。"), window.alert(e instanceof Error ? e.message : "云端拉取失败");
			} finally {
				yt(!1);
			}
		}
	}
	let $n = g.find((e) => e.id === m) ?? g[0], er = $n.salary, tr = $n.stockIncome, nr = $n.otherIncome, rr = $n.budgets, ir = er + Math.max(tr, 0) + nr, ar = re(e), or = ar[e.mode], sr = e.mode === "normal" ? "普通月" : "出差月", V = (() => {
		let e = y.reduce((e, t) => e + t.balance, 0), t = y.filter(At), n = t.reduce((e, t) => e + t.balance, 0), r = y.filter((e) => Et(e) === "aShare").reduce((e, t) => e + t.balance, 0), i = y.filter((e) => Et(e) === "usShare").reduce((e, t) => e + t.balance, 0), a = r + i, o = y.filter(Ot).reduce((e, t) => e + t.balance, 0), s = y.filter(kt).reduce((e, t) => e + t.balance, 0), c = o + s, l = Mt(De), u = o > 0 ? o : l.hasTravel ? l.travelCurrent : de, d = s > 0 ? s : l.hasLearning ? l.learningCurrent : j, f = l.hasEmergency ? l.emergencyCurrent : pe, p = l.parentCurrent, m = l.partnerCurrent, h = l.otherCurrent, g = m, _ = u + d + h, v = Math.max(0, _ - c), b = e - a - c, x = y.filter((e) => e.liquid).reduce((e, t) => e + t.balance, 0), ee = rr.reduce((e, t) => e + t.actual, 0), S = rr.reduce((e, t) => e + t.plan, 0), C = S - ee, te = rr.filter((e) => e.fixed).reduce((e, t) => e + t.plan, 0), E = rr.filter((e) => e.required).reduce((e, t) => e + t.plan, 0), ne = w.reduce((e, t) => e + an(t.value, t.currency, T, D), 0), re = w.reduce((e, t) => e + an(t.cost, t.currency, T, D), 0), ie = w.filter((e) => e.market === "A股").reduce((e, t) => e + an(t.value, t.currency, T, D), 0), ae = w.filter((e) => e.market === "美股").reduce((e, t) => e + an(t.value, t.currency, T, D), 0), oe = w.filter((e) => e.market === "港股").reduce((e, t) => e + an(t.value, t.currency, T, D), 0), O = be.reduce((e, t) => e + t.amount, 0), ce = Se.reduce((e, t) => e + t.amount, 0), ue = e + ne + v + p + f + O, A = Fe.filter((e) => e.direction === "outflow").reduce((e, t) => e + t.amount, 0), fe = (e, t) => Ne.includes(e) ? 0 : t, me = fe("spendingPlan", S), M = l.hasTravel ? l.travelActualMonthly : de, ge = l.hasLearning ? l.learningActualMonthly : j, ve = l.hasParent ? l.parentActualMonthly : 0, ye = l.hasPartner ? l.partnerActualMonthly : 0, xe = l.hasEmergency ? l.emergencyActualMonthly : 0, Ce = l.hasTravel ? l.travelMonthly : de, we = l.hasLearning ? l.learningMonthly : j, Te = l.hasParent ? l.parentMonthly : 0, Ee = l.hasPartner ? l.partnerMonthly : 0, Oe = l.hasEmergency ? l.emergencyMonthly : 0, ke = fe("travelSaving", M), Ae = fe("learningSaving", ge), je = fe("parentSaving", ve), Me = fe("partnerSaving", ye), Pe = fe("emergencyFund", xe), Ie = fe("aSharePlan", se) + fe("usSharePlan", k) + fe("hkSharePlan", le), Le = ke + Ae + je + Me + Pe + Ie + A, Re = ir - ee - Le, ze = ir ? te / ir : 0, Be = ir ? Le / ir : 0, Ve = Math.max(0, _e), He = Ve * he, Ue = Ve ? f / Ve : 0, We = ue ? ce / ue : 0, N = Math.round(Math.max(0, Math.min(25, 25 - Math.max(0, ze - .35) * 85)) + Math.min(25, Ue / Math.max(he, 1) * 25) + (ce === 0 ? 20 : Math.max(0, 20 - We * 50)) + Math.min(20, Be / .45 * 20) + (ne >= re ? 10 : 6));
		return {
			accountTotal: e,
			totalSavingsAccountTotal: n,
			totalSavingsAccountCount: t.length,
			operatingAccountTotal: b,
			aShareInvestmentReserve: r,
			usShareInvestmentReserve: i,
			investmentReserve: a,
			accountSpecialSavings: c,
			liquidAccountTotal: x,
			spendingActual: ee,
			spendingPlan: S,
			budgetRemaining: C,
			fixedSpending: te,
			requiredSpending: E,
			investmentValue: ne,
			investmentCost: re,
			investmentPnL: ne - re,
			aShareValue: ie,
			usShareValue: ae,
			hkShareValue: oe,
			manualAssetTotal: O,
			cashflowSpendingPlan: me,
			travelAllocation: ke,
			learningAllocation: Ae,
			parentAllocation: je,
			partnerAllocation: Me,
			emergencyAllocation: Pe,
			investmentSavingAllocation: Ie,
			customOutflow: A,
			travelAllocationSource: M,
			learningAllocationSource: ge,
			parentAllocationSource: ve,
			partnerAllocationSource: ye,
			emergencyAllocationSource: xe,
			travelExpectedSource: Ce,
			learningExpectedSource: we,
			parentExpectedSource: Te,
			partnerExpectedSource: Ee,
			emergencyExpectedSource: Oe,
			travelSavings: u,
			learningSavings: d,
			parentSavings: p,
			partnerSavings: m,
			familyFund: g,
			otherSavings: h,
			totalSavings: _,
			savingsOutsideAccounts: v,
			totalDebt: ce,
			totalAssets: ue,
			netWorth: ue - ce,
			assetOutflow: Le,
			monthlySurplus: Re,
			fixedRatio: ze,
			savingsRate: Be,
			emergencyCoverage: Ue,
			currentEmergencyFund: f,
			debtRatio: We,
			score: N,
			emergencyMonthlyNeed: Ve,
			emergencyTarget: He
		};
	})();
	function cr(e, t) {
		return {
			id: t,
			monthId: m,
			label: $n.label,
			savedAt: e,
			income: ir,
			spending: V.spendingActual,
			allocation: V.assetOutflow,
			surplus: V.monthlySurplus,
			accountTotal: V.accountTotal,
			totalAssets: V.totalAssets,
			netWorth: V.netWorth,
			totalDebt: V.totalDebt,
			emergencyFund: V.currentEmergencyFund,
			savings: V.totalSavingsAccountTotal,
			accounts: y.map((e) => ({
				id: e.id,
				name: e.name,
				type: e.type,
				balance: e.balance,
				purpose: e.purpose,
				liquid: e.liquid
			}))
		};
	}
	async function lr() {
		let e = (/* @__PURE__ */ new Date()).toISOString(), t = Rt([cr(e, `${m}-${e}`), ...He.filter((e) => e.monthId !== m)]);
		Ue(t), window.localStorage.setItem(ut, JSON.stringify(t)), l((e) => e.includes("monthlyArchive") ? e : [...e, "monthlyArchive"]), B(), Jt(`${$n.label} 月报已保存，正在同步云端…`), Jt(await Zn(!1, ln({ monthlyArchives: t })) ? `${$n.label} 月报已保存并上传云端` : `${$n.label} 月报已保存到本机，云端未更新`);
	}
	function ur(e) {
		let t = He.filter((t) => t.id !== e);
		Ue(t), window.localStorage.setItem(ut, JSON.stringify(t));
	}
	let dr = cr("current-preview", `current-${m}`), fr = He.find((e) => e.monthId === m), pr = fr ?? dr, mr = qt(He, m), hr = Kt(Rt([dr, ...He.filter((e) => e.monthId !== m)])), gr = (() => {
		let t = [], n = V.accountTotal, r = Fe.filter((e) => e.direction === "inflow").reduce((e, t) => e + t.amount, 0);
		for (let i = 0; i < 6; i += 1) {
			let a = xt(m, i), o = g.find((e) => e.id === a), s = e.salary, c = o ? Tt(o) : V.spendingPlan, l = (Ne.includes("salary") ? 0 : s) + r, u = (Ne.includes("spendingPlan") ? 0 : c) + V.assetOutflow;
			n += l - u, t.push({
				month: bt(o?.label ?? St(a)),
				inflow: l,
				outflow: u,
				balance: n
			});
		}
		return t;
	})(), _r = (() => {
		let t = Fe.filter((e) => e.direction === "inflow").reduce((e, t) => e + t.amount, 0), n = (Ne.includes("salary") ? 0 : e.salary) + t;
		return [
			...we.map((e) => ({
				date: e.date,
				item: e.name,
				inflow: e.kind === "定存" ? e.amount : 0,
				outflow: e.kind === "定存" ? 0 : e.amount,
				kind: e.kind
			})),
			{
				date: `${m}-${String(Math.min(Math.max($n.payday, 1), new Date(Number(m.slice(0, 4)), Number(m.slice(5)), 0).getDate())).padStart(2, "0")}`,
				item: "现金流入",
				inflow: n,
				outflow: 0,
				kind: "收入"
			},
			{
				date: `${m}-15`,
				item: "月度资产分配",
				inflow: 0,
				outflow: V.assetOutflow,
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
			balance: V.accountTotal,
			rows: []
		}).rows;
	})();
	function vr(e, t) {
		ee((n) => n.map((n) => n.id === e ? {
			...n,
			...t
		} : n));
	}
	function yr() {
		let e = y.length + 1;
		ee((t) => [...t, {
			id: `account-${Date.now()}`,
			name: `新账户 ${e}`,
			type: "银行卡",
			balance: 0,
			purpose: "待填写用途",
			liquid: !0
		}]);
	}
	function br(e) {
		ee((t) => t.length > 1 ? t.filter((t) => t.id !== e) : t);
	}
	function xr(e, t) {
		ee((n) => {
			let r = n.findIndex((t) => t.id === e), i = n.findIndex((e) => e.id === t);
			if (r < 0 || i < 0 || r === i) return n;
			let a = [...n], [o] = a.splice(r, 1);
			return a.splice(i, 0, o), a;
		});
	}
	function Sr(e, t) {
		v((n) => n.map((n) => n.id === e ? {
			...n,
			...t
		} : n));
	}
	function Cr() {
		v((t) => {
			let n = [...t].sort((e, t) => e.id.localeCompare(t.id)), r = n[n.length - 1] ?? Ze[0], [i, a] = r.id.split("-"), o = new Date(Number(i), Number(a) - 1, 1), s = new Date(o.getFullYear(), o.getMonth() + 1, 1), c = `${s.getFullYear()}-${String(s.getMonth() + 1).padStart(2, "0")}`, l = `${s.getFullYear()}年${s.getMonth() + 1}月`, u = r.budgets.length > 0 ? r.budgets : Ye, d = {
				id: c,
				label: l,
				salary: e.salary,
				payday: r.payday,
				stockIncome: 0,
				otherIncome: 0,
				budgets: Ke(u)
			};
			return h(c), [...t, d].sort((e, t) => e.id.localeCompare(t.id));
		});
	}
	function wr(e) {
		v((t) => {
			if (t.length <= 1) return t;
			let n = [...t].sort((e, t) => e.id.localeCompare(t.id)), r = n.findIndex((t) => t.id === e), i = n.filter((t) => t.id !== e);
			return e === m && h((i[Math.max(0, r - 1)] ?? i[0]).id), i;
		});
	}
	function Tr(n) {
		n.salary !== e.salary && (v((e) => ze(e, n.salary, ve().slice(0, 7))), a((e) => ({
			...e,
			income: n.salary
		}))), t(n);
	}
	function Er() {
		Le((e) => [...e, {
			id: `cashflow-${Date.now()}`,
			name: `新增现金流 ${e.length + 1}`,
			amount: 0,
			direction: "outflow"
		}]);
	}
	function Dr(e, t) {
		Le((n) => n.map((n) => n.id === e ? {
			...n,
			...t
		} : n));
	}
	function Or(e) {
		Le((t) => t.filter((t) => t.id !== e));
	}
	function kr(e) {
		Pe((t) => t.includes(e) ? t : [...t, e]);
	}
	function Ar(e, t) {
		v((n) => n.map((n) => n.id === m ? {
			...n,
			budgets: n.budgets.map((n) => n.id === e ? {
				...n,
				...t
			} : n)
		} : n));
	}
	function jr() {
		v((e) => e.map((e) => e.id === m ? {
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
	function Mr(e) {
		v((t) => t.map((t) => t.id === m && t.budgets.length > 1 ? {
			...t,
			budgets: t.budgets.filter((t) => t.id !== e)
		} : t));
	}
	function Nr() {
		v((e) => e.map((e) => e.id === m ? {
			...e,
			budgets: Ge(e.budgets)
		} : e));
	}
	function Pr(e, t) {
		te((n) => n.map((n) => n.id === e ? {
			...n,
			...t
		} : n));
	}
	function Fr() {
		te((e) => [...e, {
			id: `holding-${Date.now()}`,
			name: `新投资 ${e.length + 1}`,
			market: "A股",
			cost: 0,
			value: 0,
			currency: "CNY"
		}]);
	}
	function Ir(e) {
		te((t) => t.length > 1 ? t.filter((t) => t.id !== e) : t);
	}
	function Lr(e, t) {
		xe((n) => n.map((n) => n.id === e ? {
			...n,
			...t
		} : n));
	}
	function Rr() {
		xe((e) => [...e, {
			id: `balance-asset-${Date.now()}`,
			name: `新资产 ${e.length + 1}`,
			amount: 0,
			note: "资产负债表补录"
		}]);
	}
	function zr(e) {
		xe((t) => t.length > 1 ? t.filter((t) => t.id !== e) : t);
	}
	function Br(e, t) {
		Ce((n) => n.map((n) => n.id === e ? {
			...n,
			...t
		} : n));
	}
	function Vr() {
		Ce((e) => [...e, {
			id: `liability-${Date.now()}`,
			name: `新负债 ${e.length + 1}`,
			amount: 0
		}]);
	}
	function Hr(e) {
		Ce((t) => t.length > 1 ? t.filter((t) => t.id !== e) : t);
	}
	function Ur(e, t) {
		Ee((n) => n.map((n) => n.id === e ? {
			...n,
			...t
		} : n));
	}
	function Wr() {
		Ee((e) => [...e, {
			id: `reminder-${Date.now()}`,
			name: `新提醒 ${e.length + 1}`,
			date: "2026-07-01",
			amount: 0,
			kind: "账单"
		}]);
	}
	function Gr(e) {
		Ee((t) => t.length > 1 ? t.filter((t) => t.id !== e) : t);
	}
	function Kr(e, t) {
		Oe((n) => n.map((n) => n.id === e ? {
			...n,
			...t
		} : n));
	}
	function qr(e, t) {
		Oe((n) => {
			let r = n.find((t) => jt(t) === e);
			return r ? n.map((e) => e.id === r.id ? {
				...e,
				...t
			} : e) : n;
		});
	}
	function Jr(e) {
		A(e), qr("travel", { actualMonthly: e });
	}
	function Yr(e) {
		fe(e), qr("learning", { actualMonthly: e });
	}
	function Xr(e) {
		qr("parent", { actualMonthly: e });
	}
	function Zr(e) {
		qr("partner", { actualMonthly: e });
	}
	function Qr(e) {
		qr("emergency", { actualMonthly: e });
	}
	function $r(e) {
		me(e), qr("emergency", { current: e });
	}
	function ei() {
		Oe((e) => [...e, {
			id: `goal-${Date.now()}`,
			name: `新目标 ${e.length + 1}`,
			target: 0,
			current: 0,
			monthly: 0,
			actualMonthly: 0
		}]);
	}
	function ti(e) {
		Oe((t) => t.length > 1 ? t.filter((t) => t.id !== e) : t);
	}
	function ni(e, t) {
		Ae((n) => n.map((n) => n.id === e ? {
			...n,
			...t
		} : n));
	}
	function ri() {
		Ae((e) => [...e, {
			id: `fund-bucket-${Date.now()}`,
			name: `新大花费项目 ${e.length + 1}`,
			kind: "其他",
			target: 0,
			current: 0,
			dueDate: m.length >= 7 ? `${m}-28` : "2026-12-31",
			locked: !0,
			note: "待分配"
		}]);
	}
	function ii(e) {
		Ae((t) => t.length > 1 ? t.filter((t) => t.id !== e) : t);
	}
	function ai(e, t) {
		Me((n) => n.map((n) => n.id === e ? {
			...n,
			...t
		} : n));
	}
	function oi(e) {
		s(!0), l((t) => t.includes(e) ? t.filter((t) => t !== e) : [...t, e]);
	}
	function si(e) {
		s(!0), e !== "overview" && l((t) => t.includes(e) ? t : [...t, e]), d({ id: e });
	}
	(0, _.useEffect)(() => {
		if (!u) return;
		let e = window.requestAnimationFrame(() => {
			let e = document.getElementById(`finance-${u.id}`);
			if (!e) return;
			let t = Array.from(document.querySelectorAll(".topbar, .selected-title")).reduce((e, t) => window.getComputedStyle(t).position === "sticky" ? Math.max(e, t.getBoundingClientRect().height) : e, 0);
			e.style.scrollMarginTop = `${t + 16}px`, e.focus({ preventScroll: !0 }), e.scrollIntoView({
				block: "start",
				behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth"
			});
		});
		return () => window.cancelAnimationFrame(e);
	}, [u]);
	function ci() {
		l(gt.map((e) => e.id));
	}
	let li = Se.length ? `${Se.slice(0, 3).map((e) => `${e.name.trim() || "未命名负债"} ${F(e.amount)}`).join(" / ")}${Se.length > 3 ? " / 更多" : ""}` : "暂无负债", ui = [...ar.rows.filter((e) => e.kind !== "consumption").map((t) => `${t.name} ${F(t[e.mode])}`)].join(" / "), di = [
		`旅游 ${F(V.travelSavings)}`,
		`学习 ${F(V.learningSavings)}`,
		V.otherSavings > 0 ? `其他 ${F(V.otherSavings)}` : ""
	].filter(Boolean).join(" / "), fi = {
		label: "父母储蓄",
		value: V.parentSavings,
		detail: V.parentSavings > 0 || V.parentAllocation > 0 ? `当前 ${F(V.parentSavings)} / 本月投入 ${F(V.parentAllocation)}` : "目标管理父母储蓄，单独列示",
		color: P[5]
	}, pi = {
		label: "家庭及伴侣储蓄",
		value: V.familyFund,
		detail: V.familyFund > 0 || V.partnerAllocation > 0 ? `伴侣基金 ${F(V.familyFund)} / 本月家庭投入 ${F(V.partnerAllocation)}` : "家庭共同资金单列，不计入个人总资产",
		color: P[3],
		className: "family-fund-item"
	}, mi = {
		label: "总负债",
		value: V.totalDebt,
		detail: li,
		color: P[4],
		className: "debt-breakdown-item"
	}, hi = [
		V.aShareInvestmentReserve > 0 ? `A股待投 ${F(V.aShareInvestmentReserve)}` : "",
		V.usShareInvestmentReserve > 0 ? `美股待投 ${F(V.usShareInvestmentReserve)}` : "",
		V.accountSpecialSavings > 0 ? `专项 ${F(V.accountSpecialSavings)}` : ""
	].filter(Boolean).join(" / "), gi = be.filter((e) => e.amount > 0).slice(0, 3).map((e) => `${e.name.trim() || "未命名资产"} ${F(e.amount)}`).join(" / ") || "来自资产负债表资产项", _i = [
		{
			label: "账户现金",
			value: V.operatingAccountTotal,
			detail: hi ? `不含 ${hi}` : "日常账户余额",
			color: P[0]
		},
		{
			label: "A股待投储蓄",
			value: V.aShareInvestmentReserve,
			detail: "余额宝-8514，尚未进A股",
			color: P[6]
		},
		{
			label: "美股待投储蓄",
			value: V.usShareInvestmentReserve,
			detail: "中国银行8292，尚未进美股",
			color: P[5]
		},
		{
			label: "已投资市值",
			value: V.investmentValue,
			detail: `A股 ${F(V.aShareValue)} / 美股 ${F(V.usShareValue)} / 港股 ${F(V.hkShareValue)}`,
			color: P[1]
		},
		{
			label: "个人专项储蓄",
			value: V.totalSavings,
			detail: di,
			color: P[3]
		},
		fi,
		{
			label: "实物资产",
			value: V.manualAssetTotal,
			detail: gi,
			color: P[5]
		},
		{
			label: "应急金",
			value: V.currentEmergencyFund,
			detail: `覆盖 ${V.emergencyCoverage.toFixed(1)} 月 / 目标 ${he} 月`,
			color: P[2]
		}
	], vi = [
		..._i.slice(0, 7),
		mi,
		..._i.slice(7),
		pi
	], yi = y.filter((e) => e.balance !== 0).map((e) => ({
		label: e.name.trim() || "未命名账户",
		value: F(e.balance),
		note: e.purpose.trim() || e.type.trim() || "账户"
	})), bi = [
		{
			id: "monthly-overview-income",
			title: `${sr}可分配资金`,
			value: F(or.income),
			detail: `工资 ${F(e.salary)} + 出差净结余 ${F(or.tripNet)} / ${e.mode === "trip" ? "出差结余按全年平均分摊" : "不预支出差结余"}`,
			tone: "blue"
		},
		{
			id: "monthly-overview-living",
			title: `${sr}生活与消费预留`,
			value: F(or.consumption),
			detail: "含房租、家用、学习、旅游与伴侣预留 / 完整明细见上方预算表",
			tone: "green"
		},
		{
			id: "monthly-overview-allocation",
			title: `${sr}投资与应急储备`,
			value: F(or.saving),
			detail: ui,
			tone: "violet"
		},
		{
			id: "monthly-overview-surplus",
			title: `${sr}预算现金余量`,
			value: F(or.surplus),
			detail: `可分配 ${F(or.income)} - 生活消费 ${F(or.consumption)} - 投资应急 ${F(or.saving)}`,
			tone: or.surplus < 0 ? "red" : or.surplus < or.income * .1 ? "amber" : "green"
		},
		{
			title: "当前账户余额",
			value: F(V.accountTotal),
			detail: `${yi.length} 个非零账户 / 合计 ${F(V.accountTotal)} / 可动用 ${F(V.liquidAccountTotal)}`,
			tone: V.liquidAccountTotal < V.emergencyMonthlyNeed * 2 ? "red" : "green",
			items: yi
		},
		{
			title: "目前总储蓄",
			value: F(V.totalSavingsAccountTotal),
			detail: `${V.totalSavingsAccountCount} 个储蓄账户 / 不含工行2616、微信、现金 / A股待投 ${F(V.aShareInvestmentReserve)} / 美股待投 ${F(V.usShareInvestmentReserve)}`,
			tone: "green"
		},
		{
			title: "目前总应急",
			value: F(V.currentEmergencyFund),
			detail: `覆盖 ${V.emergencyCoverage.toFixed(1)} 个月 / 目标 ${he} 个月`,
			tone: "amber"
		}
	], xi = [
		{
			label: "工资",
			value: er,
			color: P[0]
		},
		{
			label: "炒股月结",
			value: Math.max(tr, 0),
			color: P[1]
		},
		{
			label: "其他收入",
			value: nr,
			color: P[3]
		}
	], Si = g.filter((e) => e.id >= st).sort((e, t) => e.id.localeCompare(t.id)), Ci = Si.map((e, t) => ({
		label: bt(e.label),
		value: Ct(e),
		color: e.id === m ? P[0] : P[t % P.length],
		detail: e.id === m ? "当前月" : "月度"
	})), wi = Si.map((e, t) => ({
		label: bt(e.label),
		value: wt(e),
		color: e.id === m ? P[4] : P[t % P.length],
		detail: e.id === m ? "当前月" : "月度"
	})), Ti = Si.map((e, t) => ({
		label: bt(e.label),
		value: Math.max(Ct(e) - wt(e), 0),
		color: e.id === m ? P[1] : P[t % P.length],
		detail: e.id === m ? "当前月" : "月度"
	})), Ei = y.map((e, t) => ({
		item: e,
		index: t
	})).sort((e, t) => t.item.balance - e.item.balance || e.index - t.index).map(({ item: e }, t) => ({
		label: e.name.trim() || "未命名账户",
		value: e.balance,
		color: P[t % P.length],
		detail: e.type.trim() || "未分类"
	})), Di = rr.map((e, t) => ({
		item: e,
		index: t
	})).sort((e, t) => t.item.actual - e.item.actual || t.item.plan - e.item.plan || e.index - t.index).map(({ item: e }, t) => ({
		label: e.name.trim() || "未命名支出",
		value: e.actual,
		max: Math.max(e.plan, e.actual, 1),
		color: e.actual > e.plan ? P[4] : P[t % P.length],
		detail: `${F(e.actual)} / ${F(e.plan)}`
	})), Oi = rr.map((e, t) => ({
		label: e.name.trim() || "未命名支出",
		value: e.actual,
		plan: e.plan,
		color: P[t % P.length],
		detail: `${e.required ? "必须" : "可取消"} / ${e.fixed ? "固定" : "弹性"}`
	})).filter((e) => e.value > 0).sort((e, t) => t.value - e.value), ki = Oi.length ? Oi.slice(0, 8).map((e) => ({
		label: e.label,
		value: e.value,
		color: e.color
	})) : [{
		label: "暂无实际支出",
		value: 0,
		max: 1,
		color: "#b8c4d4",
		detail: "本月未记录"
	}], Ai = Oi.map((e) => ({
		label: e.label,
		value: e.value,
		color: e.color,
		detail: `${vt(e.value / Math.max(V.spendingActual, 1))} / ${F(e.value)}`
	})), H = [{
		label: "必须支出",
		value: V.requiredSpending,
		color: P[1]
	}, {
		label: "可取消支出",
		value: Math.max(V.spendingPlan - V.requiredSpending, 0),
		color: P[2]
	}], U = gr[0]?.inflow ?? 0, ji = V.cashflowSpendingPlan + V.assetOutflow, Mi = U - ji, Ni = [
		...[
			{
				id: "builtin-salary",
				builtinId: "salary",
				name: "工资流入",
				amount: e.salary,
				direction: "inflow",
				source: "与年度工资规划同步；历史实际收入单独保留",
				onAmountChange: (t) => Tr({
					...e,
					salary: t
				}),
				onDelete: () => kr("salary")
			},
			{
				id: "builtin-spending-plan",
				builtinId: "spendingPlan",
				name: "生活支出预算",
				amount: V.spendingPlan,
				direction: "outflow",
				source: `${$n.label}预算表动态汇总`,
				readonlyAmount: !0,
				onDelete: () => kr("spendingPlan")
			},
			{
				id: "calculated-budget-remaining",
				name: "本月预算剩余",
				amount: V.budgetRemaining,
				direction: V.budgetRemaining >= 0 ? "inflow" : "outflow",
				source: "预算 - 实际，可转储蓄，不计入预测",
				readonlyAmount: !0,
				summaryOnly: !0
			},
			{
				id: "builtin-travel-saving",
				builtinId: "travelSaving",
				name: "旅游储蓄",
				amount: V.travelAllocationSource,
				direction: "outflow",
				source: "来自目标实际投入",
				onAmountChange: Jr,
				onDelete: () => kr("travelSaving")
			},
			{
				id: "builtin-learning-saving",
				builtinId: "learningSaving",
				name: "学习储蓄",
				amount: V.learningAllocationSource,
				direction: "outflow",
				source: "来自目标实际投入",
				onAmountChange: Yr,
				onDelete: () => kr("learningSaving")
			},
			{
				id: "builtin-parent-saving",
				builtinId: "parentSaving",
				name: "父母储蓄",
				amount: V.parentAllocationSource,
				direction: "outflow",
				source: "来自目标实际投入",
				onAmountChange: Xr,
				onDelete: () => kr("parentSaving")
			},
			{
				id: "builtin-partner-saving",
				builtinId: "partnerSaving",
				name: "伴侣基金",
				amount: V.partnerAllocationSource,
				direction: "outflow",
				source: "来自目标实际投入",
				onAmountChange: Zr,
				onDelete: () => kr("partnerSaving")
			},
			{
				id: "builtin-emergency-fund",
				builtinId: "emergencyFund",
				name: "应急金投入",
				amount: V.emergencyAllocationSource,
				direction: "outflow",
				source: "来自目标实际投入",
				onAmountChange: Qr,
				onDelete: () => kr("emergencyFund")
			},
			{
				id: "builtin-ashare-plan",
				builtinId: "aSharePlan",
				name: "A股计划",
				amount: se,
				direction: "outflow",
				source: "现金流出",
				onAmountChange: O,
				onDelete: () => kr("aSharePlan")
			},
			{
				id: "builtin-usshare-plan",
				builtinId: "usSharePlan",
				name: "美股计划",
				amount: k,
				direction: "outflow",
				source: "现金流出",
				onAmountChange: ce,
				onDelete: () => kr("usSharePlan")
			},
			{
				id: "builtin-hkshare-plan",
				builtinId: "hkSharePlan",
				name: "港股计划",
				amount: le,
				direction: "outflow",
				source: "现金流出",
				onAmountChange: ue,
				onDelete: () => kr("hkSharePlan")
			}
		].filter((e) => !e.builtinId || !Ne.includes(e.builtinId)),
		...Fe.map((e) => ({
			id: e.id,
			name: e.name,
			amount: e.amount,
			direction: e.direction,
			source: "自定义",
			onNameChange: (t) => Dr(e.id, { name: t }),
			onAmountChange: (t) => Dr(e.id, { amount: t }),
			onDirectionChange: (t) => Dr(e.id, { direction: t }),
			onDelete: () => Or(e.id)
		})),
		{
			id: "calculated-cashflow-expected-increase",
			name: "现金流预计增加",
			amount: Mi,
			direction: Mi >= 0 ? "inflow" : "outflow",
			source: "月流入 - 月流出，自动同步",
			readonlyAmount: !0,
			summaryOnly: !0
		}
	];
	Ni.filter((e) => e.direction === "outflow" && !e.summaryOnly).map((e, t) => ({
		item: e,
		index: t
	})).sort((e, t) => t.item.amount - e.item.amount || e.index - t.index).map(({ item: e }, t) => ({
		label: e.name,
		value: e.amount,
		color: P[(t + 4) % P.length],
		detail: e.source
	}));
	let Pi = _i.map((e, t) => ({
		item: e,
		index: t
	})).sort((e, t) => t.item.value - e.item.value || e.index - t.index).map(({ item: e }) => ({
		label: e.label,
		value: e.value,
		color: e.color
	})), Fi = [
		{
			label: "A股",
			value: V.aShareValue,
			color: P[0]
		},
		{
			label: "美股",
			value: V.usShareValue,
			color: P[1]
		},
		{
			label: "港股",
			value: V.hkShareValue,
			color: P[3]
		}
	], Ii = w.map((e) => {
		let t = an(e.value, e.currency, T, D), n = an(e.cost, e.currency, T, D);
		return {
			label: e.market,
			value: Math.abs(t - n),
			color: t >= n ? P[1] : P[4],
			detail: `${t >= n ? "浮盈" : "浮亏"} ${F(t - n)}`
		};
	}), Li = gr.map((e) => ({
		label: e.month,
		value: e.balance
	})), Ri = gr.map((e) => ({
		label: e.month,
		value: e.outflow,
		color: P[4]
	})), zi = [
		{
			label: "期初现金",
			value: V.accountTotal,
			kind: "start",
			color: P[0]
		},
		{
			label: "预测收入",
			value: U,
			kind: "positive",
			color: P[1]
		},
		{
			label: "生活支出",
			value: -V.cashflowSpendingPlan,
			kind: "negative",
			color: P[4]
		},
		{
			label: "资产分配",
			value: -V.assetOutflow,
			kind: "negative",
			color: P[2]
		},
		{
			label: "月末现金",
			value: V.accountTotal + Mi,
			kind: "end",
			color: P[3]
		}
	], Bi = [
		{
			label: "工资",
			value: e.salary,
			kind: "positive",
			color: P[0]
		},
		{
			label: "出差净结余",
			value: or.tripNet,
			kind: or.tripNet < 0 ? "negative" : "positive",
			color: P[1]
		},
		{
			label: "生活消费",
			value: -or.consumption,
			kind: "negative",
			color: P[4]
		},
		{
			label: "投资应急",
			value: -or.saving,
			kind: "negative",
			color: P[2]
		},
		{
			label: "现金余量",
			value: or.surplus,
			kind: "end",
			color: or.surplus < 0 ? P[4] : P[1]
		}
	], Vi = ar.allocationRows.map((t) => ({
		label: t.name,
		value: t[e.mode]
	})).filter((e) => e.value > 0).map((e, t) => ({
		...e,
		color: P[t % P.length]
	})), Hi = [
		{
			label: "生活与消费预留",
			value: ar.annualConsumption,
			color: P[0]
		},
		{
			label: "投资本金",
			value: ar.annualInvestment,
			color: P[1]
		},
		{
			label: "新增应急现金",
			value: ar.annualEmergency,
			color: P[2]
		},
		{
			label: "额外现金余量",
			value: Math.max(0, ar.annualSurplus),
			color: P[3]
		}
	], Ui = gr.map((e) => ({
		label: e.month,
		value: e.balance + V.investmentValue + V.totalSavings + V.parentSavings + V.currentEmergencyFund + V.manualAssetTotal - V.totalDebt
	})), Wi = [
		{
			label: "总资产",
			value: V.totalAssets,
			color: P[0]
		},
		{
			label: "总负债",
			value: V.totalDebt,
			color: P[4]
		},
		{
			label: "净资产",
			value: Math.max(V.netWorth, 0),
			color: P[1]
		}
	], Gi = be.map((e, t) => ({
		label: e.name.trim() || "未命名资产",
		value: e.amount,
		color: P[t % P.length],
		detail: e.note.trim() || F(e.amount)
	})), Ki = Se.map((e, t) => ({
		label: e.name.trim() || "未命名负债",
		value: e.amount,
		color: P[(t + 4) % P.length]
	})), qi = De.map((e, t) => ({
		label: e.name,
		value: e.current,
		max: e.target,
		color: P[t % P.length],
		detail: `预期 ${F(e.monthly)} / 实际 ${F(e.actualMonthly)}`
	})), Ji = De.reduce((e, t) => e + t.current, 0), Yi = De.reduce((e, t) => e + t.target, 0), Xi = De.reduce((e, t) => e + t.monthly, 0), Zi = De.reduce((e, t) => e + t.actualMonthly, 0), Qi = Math.max(0, Si.findIndex((e) => e.id === m)), $i = Si.map((e, t) => ({
		label: bt(e.label),
		value: e.id === m ? Zi : Xi,
		color: e.id === m ? P[1] : P[t % P.length],
		detail: e.id === m ? "实际投入" : "预期准备"
	})), ea = Si.map((e, t) => ({
		label: bt(e.label),
		value: wt(e) + (e.id === m ? Zi : Xi),
		color: e.id === m ? P[2] : P[t % P.length],
		detail: `支出 ${F(wt(e))}`
	})), ta = Si.map((e, t) => ({
		label: bt(e.label),
		value: Math.min(Yi, Ji + Zi + Xi * Math.max(0, t - Qi - 1))
	})), na = ke.map((e, t) => {
		let n = Math.max(0, e.target - e.current), r = Ht(m, e.dueDate);
		return {
			...e,
			index: t,
			gap: n,
			monthsLeft: r,
			monthlyNeed: n / r,
			status: n <= 0 ? "已覆盖" : r <= 2 ? "紧急补齐" : "持续准备"
		};
	}), ra = na.reduce((e, t) => e + t.current, 0), ia = na.filter((e) => e.locked).reduce((e, t) => e + t.current, 0), aa = na.reduce((e, t) => e + t.target, 0), oa = na.reduce((e, t) => e + t.gap, 0), sa = na.filter((e) => e.gap > 0 && e.monthsLeft <= 2).reduce((e, t) => e + t.gap, 0), ca = na.reduce((e, t) => e + t.monthlyNeed, 0), la = V.liquidAccountTotal - V.investmentReserve - ia, ua = V.investmentSavingAllocation ? V.investmentReserve / V.investmentSavingAllocation : 0, da = ir - V.spendingActual - V.parentAllocation - V.partnerAllocation - V.investmentSavingAllocation, fa = [{
		label: "投资待投金",
		value: V.investmentReserve,
		color: P[6],
		detail: `约覆盖 ${ua.toFixed(1)} 个月投资计划`
	}, ...na.filter((e) => e.current > 0).map((e, t) => ({
		label: e.name,
		value: e.current,
		color: P[(t + 1) % P.length],
		detail: `${e.kind} / ${e.locked ? "锁定" : "可调整"}`
	}))], pa = na.filter((e) => e.gap > 0).sort((e, t) => e.dueDate.localeCompare(t.dueDate)).map((e, t) => ({
		label: e.name,
		value: e.gap,
		color: e.monthsLeft <= 2 ? P[4] : P[(t + 2) % P.length],
		detail: `${e.dueDate} / 每月需 ${F(e.monthlyNeed)}`
	})), ma = na.filter((e) => e.gap > 0).map((e, t) => ({
		label: e.name,
		value: e.monthlyNeed,
		color: e.monthsLeft <= 2 ? P[4] : P[t % P.length],
		detail: `${e.monthsLeft} 个月内`
	})), ha = [
		{
			title: "现金流安全",
			tone: V.monthlySurplus < 0 ? "red" : da < ca ? "amber" : "green",
			summary: `当月余额 ${F(V.monthlySurplus)}，家庭与投资后可用 ${F(da)}`,
			detail: `收入 ${F(ir)}，生活支出 ${F(V.spendingActual)}，家庭责任 ${F(V.parentAllocation + V.partnerAllocation)}，投资计划 ${F(V.investmentSavingAllocation)}。`,
			action: V.monthlySurplus < 0 ? "先把当月余额转正，暂停非必要小旅行和新增非刚性支出。" : da < ca ? "未来大花费项目每月需求高于可用现金，优先压缩可调整项目或生活支出。" : "现金流可以覆盖当前安排，继续保持每月复盘。"
		},
		{
			title: "大花费项目覆盖",
			tone: la < 0 ? "red" : sa > 0 ? "amber" : "green",
			summary: `大花费项目缺口 ${F(oa)}，未分配现金 ${F(la)}`,
			detail: `手动项目已准备 ${F(ra)} / 目标 ${F(aa)}；投资待投金 ${F(V.investmentReserve)} 单独锁定。`,
			action: la < 0 ? "资金标签超过可动用现金，需要减少已锁定金额或重新分配账户用途。" : sa > 0 ? "两个月内到期的大花费项目仍有缺口，优先补齐搬家、分期和近期旅行。" : "大花费项目结构健康，按截止日期继续补齐缺口。"
		},
		{
			title: "投资纪律",
			tone: ua >= 2 ? "green" : ua >= 1 ? "amber" : "red",
			summary: `待投资金可覆盖 ${ua.toFixed(1)} 个月计划`,
			detail: `A股待投 ${F(V.aShareInvestmentReserve)}，美股待投 ${F(V.usShareInvestmentReserve)}，每月投资计划 ${F(V.investmentSavingAllocation)}。`,
			action: ua >= 2 ? "不需要额外加速投入；保持只用待投资金，不动应急、旅行和家庭责任资金。" : "待投资金覆盖不足，新增投入前先确认应急金和大花费项目不被挤占。"
		},
		{
			title: "应急与负债",
			tone: V.emergencyCoverage >= 3 && V.totalDebt <= ir * .2 ? "green" : "amber",
			summary: `应急覆盖 ${V.emergencyCoverage.toFixed(1)} 个月，负债 ${F(V.totalDebt)}`,
			detail: `应急目标 ${F(V.emergencyTarget)}，当前 ${F(V.currentEmergencyFund)}；总负债率 ${vt(V.debtRatio)}。`,
			action: V.emergencyCoverage < 1 ? "先把硬应急金做到 1 个月必要支出，再追求更高投资速度。" : "应急金继续向 3 个月推进，手机分期按期结束即可。"
		}
	], ga = We(rr), _a = [
		`${$n.label}财务分析报告`,
		"",
		`1. 净资产与现金：总资产 ${F(V.totalAssets)}，净资产 ${F(V.netWorth)}，可动用现金 ${F(V.liquidAccountTotal)}，大花费项目后未分配现金 ${F(la)}。`,
		`2. 收支：收入 ${F(ir)}，生活支出 ${F(V.spendingActual)}，资产/责任分配 ${F(V.assetOutflow)}，当月余额 ${F(V.monthlySurplus)}。`,
		`3. 家庭责任：父母 ${F(V.parentAllocation)}，伴侣 ${F(V.partnerAllocation)}，合计占收入 ${vt((V.parentAllocation + V.partnerAllocation) / Math.max(ir, 1))}。`,
		`4. 大花费项目：目标 ${F(aa)}，已准备 ${F(ra)}，缺口 ${F(oa)}，其中两个月内缺口 ${F(sa)}。`,
		`5. 投资：投资市值 ${F(V.investmentValue)}，待投资金 ${F(V.investmentReserve)}，计划覆盖 ${ua.toFixed(1)} 个月，浮动盈亏 ${F(V.investmentPnL)}。`,
		`6. 应急与负债：应急覆盖 ${V.emergencyCoverage.toFixed(1)} 个月，总负债 ${F(V.totalDebt)}，负债率 ${vt(V.debtRatio)}。`,
		`7. 学习用途：已归类学习净支出 ${M(ga.total)}；${ga.rows.length ? ga.rows.map((e) => `${e.name} ${M(e.actual)}（${e.note?.trim() || "用途待补"}）`).join("；") : "暂无已归类明细，不能据此判断没有学习支出"}。${ga.unassigned === 0 ? "" : `另有 ${M(ga.unassigned)} 支出待归类。`}`,
		"",
		"行动建议：",
		...ha.map((e, t) => `${t + 1}. ${e.title}：${e.action}`)
	].join("\n"), va = we.map((e, t) => ({
		label: e.name,
		value: e.amount,
		color: P[t % P.length],
		detail: `${Math.max(0, Vt(e.date))} 天后`
	})), ya = we.map((e, t) => ({
		label: e.kind,
		value: Math.max(0, Vt(e.date)),
		color: P[t % P.length],
		detail: e.date
	})), ba = [
		{
			id: "salary",
			name: "工资",
			amount: er,
			flow: "收入",
			source: `${$n.label}收入底表`
		},
		{
			id: "stock-income",
			name: "炒股月结",
			amount: Math.max(tr, 0),
			flow: "收入",
			source: `${$n.label}收入底表`
		},
		{
			id: "other-income",
			name: "其他收入",
			amount: nr,
			flow: "收入",
			source: `${$n.label}收入底表`
		},
		{
			id: "spending-actual",
			name: "生活实际支出",
			amount: V.spendingActual,
			flow: "支出",
			source: "支出预算底表实际汇总"
		},
		{
			id: "spending-plan",
			name: "生活支出预算",
			amount: V.spendingPlan,
			flow: "预算",
			source: "支出预算底表预算汇总"
		},
		{
			id: "budget-remaining",
			name: "本月预算剩余",
			amount: V.budgetRemaining,
			flow: "可转储蓄",
			source: "生活支出预算 - 实际支出"
		},
		{
			id: "travel-saving",
			name: "旅游储蓄",
			amount: V.travelAllocationSource,
			flow: "资产分配",
			source: "目标管理本月实际投入"
		},
		{
			id: "learning-saving",
			name: "学习储蓄",
			amount: V.learningAllocationSource,
			flow: "资产分配",
			source: "目标管理本月实际投入"
		},
		{
			id: "parent-saving",
			name: "父母储蓄",
			amount: V.parentAllocationSource,
			flow: "资产分配",
			source: "目标管理本月实际投入"
		},
		{
			id: "partner-saving",
			name: "伴侣基金",
			amount: V.partnerAllocationSource,
			flow: "家庭分配",
			source: "目标管理本月实际投入，不计入个人总资产"
		},
		{
			id: "emergency-saving",
			name: "应急金投入",
			amount: V.emergencyAllocationSource,
			flow: "资产分配",
			source: "目标管理本月实际投入"
		},
		{
			id: "ashare-plan",
			name: "A股计划",
			amount: se,
			flow: "资产分配",
			source: "投资计划 / 现金流预测"
		},
		{
			id: "usshare-plan",
			name: "美股计划",
			amount: k,
			flow: "资产分配",
			source: "投资计划 / 现金流预测"
		},
		{
			id: "hkshare-plan",
			name: "港股计划",
			amount: le,
			flow: "资产分配",
			source: "投资计划 / 现金流预测"
		},
		{
			id: "investment-reserve",
			name: "投资待投金",
			amount: V.investmentReserve,
			flow: "大花费项目",
			source: "账户用途自动识别：A股待投 + 美股待投"
		},
		{
			id: "fund-bucket-gap",
			name: "大花费项目缺口",
			amount: oa,
			flow: "大花费项目",
			source: "大花费项目目标 - 已准备金额"
		},
		{
			id: "liquid-after-buckets",
			name: "大花费项目后未分配现金",
			amount: la,
			flow: "安全垫",
			source: "可动用现金 - 待投资金 - 已锁定大花费项目"
		},
		{
			id: "monthly-surplus",
			name: "当月余额",
			amount: V.monthlySurplus,
			flow: "结余",
			source: "收入 - 实际支出 - 实际资产分配"
		}
	], xa = [
		{
			label: "收入",
			value: ir,
			color: P[0]
		},
		{
			label: "支出",
			value: V.spendingActual,
			color: P[4]
		},
		{
			label: "资产分配",
			value: V.assetOutflow,
			color: P[1]
		},
		{
			label: "月结余",
			value: Math.max(V.monthlySurplus, 0),
			color: P[3]
		}
	], Sa = w.map((e, t) => {
		let n = an(e.value, e.currency, T, D), r = an(e.cost, e.currency, T, D), i = V.investmentValue ? n / V.investmentValue * 100 : 0, a = r ? (n - r) / r * 100 : 0;
		return {
			label: e.market,
			x: I(i),
			y: I(a + 50),
			value: `${a.toFixed(1)}% / ${i.toFixed(0)}%`,
			color: P[t % P.length]
		};
	}), Ca = [
		{
			label: "现金流健康",
			value: I((V.monthlySurplus / Math.max(ir, 1) + .2) * 180),
			color: P[0]
		},
		{
			label: "抗风险能力",
			value: I(V.emergencyCoverage / Math.max(he, 1) * 100),
			color: P[1]
		},
		{
			label: "负债风险",
			value: I(100 - V.debtRatio * 100),
			color: P[4]
		},
		{
			label: "增长能力",
			value: I(V.savingsRate / .45 * 100),
			color: P[3]
		},
		{
			label: "投资表现",
			value: V.investmentValue >= V.investmentCost ? 82 : 58,
			color: P[2]
		}
	], wa = [
		{
			label: "固定支出率",
			x: I(V.fixedRatio * 120),
			y: I(V.fixedRatio > .5 ? 86 : V.fixedRatio > .35 ? 62 : 32),
			value: vt(V.fixedRatio),
			color: V.fixedRatio > .5 ? P[4] : V.fixedRatio > .35 ? P[2] : P[1]
		},
		{
			label: "应急金缺口",
			x: I(100 - V.emergencyCoverage / Math.max(he, 1) * 100),
			y: I(80 - V.emergencyCoverage * 10),
			value: `${V.emergencyCoverage.toFixed(1)}月`,
			color: P[2]
		},
		{
			label: "现金流末余额",
			x: I((V.spendingPlan * 4 - (gr[gr.length - 1]?.balance ?? 0)) / Math.max(V.spendingPlan * 4, 1) * 100),
			y: I((V.spendingPlan * 3 - (gr[gr.length - 1]?.balance ?? 0)) / Math.max(V.spendingPlan * 3, 1) * 100),
			value: F(gr[gr.length - 1]?.balance ?? 0),
			color: P[0]
		},
		{
			label: "负债率",
			x: I(V.debtRatio * 100),
			y: I(V.debtRatio * 120),
			value: vt(V.debtRatio),
			color: P[4]
		},
		{
			label: "投资波动",
			x: I(Math.abs(V.investmentPnL) / Math.max(V.investmentCost, 1) * 100),
			y: V.investmentPnL >= 0 ? 34 : 72,
			value: F(V.investmentPnL),
			color: V.investmentPnL >= 0 ? P[1] : P[4]
		}
	], Ta = je.map((e, t) => ({
		label: e.name,
		value: e.score,
		color: P[t % P.length]
	})), Ea = hr.map((e, t) => ({
		label: bt(e.label),
		value: e.income,
		color: e.monthId === m ? P[0] : P[t % P.length],
		detail: e.monthId === m && !fr ? "当前预览" : "已存档"
	})), Da = hr.map((e, t) => ({
		label: bt(e.label),
		value: e.spending,
		color: e.monthId === m ? P[4] : P[(t + 4) % P.length],
		detail: e.monthId === m && !fr ? "当前预览" : "已存档"
	})), Oa = hr.map((e) => ({
		label: bt(e.label),
		value: e.netWorth
	})), ka = hr.map((e) => ({
		label: bt(e.label),
		value: e.accountTotal
	})), Aa = hr.map((e) => ({
		label: bt(e.label),
		value: e.surplus
	})), ja = pr.income - (mr?.income ?? 0), Ma = pr.spending - (mr?.spending ?? 0), Na = pr.accountTotal - (mr?.accountTotal ?? 0), Pa = pr.netWorth - (mr?.netWorth ?? 0);
	async function Fa() {
		try {
			await navigator.clipboard.writeText(_a), Xt("报告已复制到剪贴板");
		} catch {
			Xt("复制失败，可以直接选中文本复制");
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
					className: !u || u.id === "overview" ? "active" : "",
					"aria-current": !u || u.id === "overview" ? "location" : void 0,
					type: "button",
					onClick: () => si("overview"),
					children: "总览"
				}),
				gt.map((e) => /* @__PURE__ */ (0, b.jsx)("button", {
					className: u?.id === e.id ? "active" : "",
					"aria-current": u?.id === e.id ? "location" : void 0,
					type: "button",
					onClick: () => si(e.id),
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
							className: f === e ? "active" : "",
							onClick: () => p(e),
							children: e
						}, e))
					})]
				}),
				/* @__PURE__ */ (0, b.jsxs)("section", {
					className: "data-safety-bar",
					"aria-label": "数据保存与备份",
					children: [/* @__PURE__ */ (0, b.jsxs)("div", {
						className: "save-indicator",
						children: [/* @__PURE__ */ (0, b.jsx)("span", { className: Zt ? "save-dot ready" : "save-dot" }), /* @__PURE__ */ (0, b.jsxs)("div", { children: [/* @__PURE__ */ (0, b.jsx)("strong", { children: Gt }), /* @__PURE__ */ (0, b.jsxs)("small", { children: ["本机会自动保存；跨电脑请用“保存完整版本”或云同步里的“保存到云端”。", pt ? `云端：${pt}` : ""] })] })]
					}), /* @__PURE__ */ (0, b.jsxs)("div", {
						className: "data-actions",
						children: [
							/* @__PURE__ */ (0, b.jsx)("button", {
								className: "primary-button",
								disabled: _t,
								type: "button",
								onClick: () => void lr(),
								children: "保存本月月报"
							}),
							/* @__PURE__ */ (0, b.jsx)("button", {
								className: "secondary-button",
								disabled: _t,
								type: "button",
								onClick: () => void fn(),
								children: "保存完整版本"
							}),
							/* @__PURE__ */ (0, b.jsx)("button", {
								className: "secondary-button",
								type: "button",
								onClick: () => l((e) => e.includes("cloudSync") ? e : [...e, "cloudSync"]),
								children: "打开云同步"
							}),
							/* @__PURE__ */ (0, b.jsxs)("button", {
								className: "secondary-button",
								type: "button",
								onClick: () => Lt((e) => !e),
								children: ["历史版本 ", Re.length > 0 ? `(${Re.length})` : ""]
							}),
							/* @__PURE__ */ (0, b.jsx)("button", {
								className: "secondary-button",
								type: "button",
								onClick: Gn,
								children: "导出备份"
							}),
							/* @__PURE__ */ (0, b.jsx)("button", {
								className: "secondary-button",
								type: "button",
								onClick: () => rn.current?.click(),
								children: "导入备份"
							}),
							/* @__PURE__ */ (0, b.jsx)("input", {
								ref: rn,
								className: "visually-hidden",
								accept: "application/json,.json",
								type: "file",
								onChange: (e) => {
									let t = e.target.files?.[0];
									t && Kn(t);
								}
							})
						]
					})]
				}),
				Dt && /* @__PURE__ */ (0, b.jsxs)("section", {
					className: "history-panel",
					children: [/* @__PURE__ */ (0, b.jsxs)("div", {
						className: "history-heading",
						children: [/* @__PURE__ */ (0, b.jsxs)("div", { children: [/* @__PURE__ */ (0, b.jsx)("h2", { children: "历史版本" }), /* @__PURE__ */ (0, b.jsxs)("p", { children: [
							"最多保留最近 ",
							mt,
							" 个手动快照。恢复前可以先保存当前版本。"
						] })] }), /* @__PURE__ */ (0, b.jsx)("button", {
							className: "secondary-button",
							type: "button",
							onClick: () => Lt(!1),
							children: "关闭"
						})]
					}), Re.length === 0 ? /* @__PURE__ */ (0, b.jsx)("div", {
						className: "history-empty",
						children: "还没有历史版本。点击“保存历史版本”即可创建第一个快照。"
					}) : /* @__PURE__ */ (0, b.jsx)("div", {
						className: "history-list",
						children: Re.map((e) => /* @__PURE__ */ (0, b.jsxs)("article", {
							className: "history-item",
							children: [/* @__PURE__ */ (0, b.jsxs)("div", { children: [/* @__PURE__ */ (0, b.jsx)("strong", { children: Ut(e.createdAt) }), /* @__PURE__ */ (0, b.jsxs)("span", { children: [
								e.data.selectedMonth ?? m,
								" · ",
								e.data.accounts.length,
								" 个账户"
							] })] }), /* @__PURE__ */ (0, b.jsxs)("div", {
								className: "history-actions",
								children: [/* @__PURE__ */ (0, b.jsx)("button", {
									className: "secondary-button",
									type: "button",
									onClick: () => jn(e),
									children: "恢复"
								}), /* @__PURE__ */ (0, b.jsx)("button", {
									className: "danger-button",
									type: "button",
									onClick: () => Wn(e.id),
									children: "删除"
								})]
							})]
						}, e.id))
					})]
				}),
				/* @__PURE__ */ (0, b.jsx)(oe, {
					plan: e,
					onChange: Tr
				}),
				/* @__PURE__ */ (0, b.jsxs)("details", {
					className: "finance-ledger",
					open: o,
					onToggle: (e) => s(e.currentTarget.open),
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
										children: "账户与预算总览"
									}), /* @__PURE__ */ (0, b.jsxs)("p", { children: [
										"前四项是",
										sr,
										"预算；账户与资产按实际余额统计，历史收支可在对应模块查看。"
									] })] }), /* @__PURE__ */ (0, b.jsx)("span", {
										className: "pill good",
										children: "公开页已脱敏"
									})]
								}),
								/* @__PURE__ */ (0, b.jsxs)("article", {
									className: "total-assets-hero",
									children: [/* @__PURE__ */ (0, b.jsxs)("div", {
										className: "total-assets-main",
										children: [
											/* @__PURE__ */ (0, b.jsx)("span", { children: "当前总资产与负债" }),
											/* @__PURE__ */ (0, b.jsx)("strong", { children: F(V.totalAssets) }),
											/* @__PURE__ */ (0, b.jsxs)("small", { children: [
												"资产合计 ",
												F(V.totalAssets),
												" / 总负债 ",
												F(V.totalDebt),
												" / 净资产 ",
												F(V.netWorth),
												"；家庭及伴侣储蓄单列，不计入个人总资产。"
											] })
										]
									}), /* @__PURE__ */ (0, b.jsx)("div", {
										className: "total-assets-breakdown",
										"aria-label": "总资产和负债资金分布",
										children: vi.map((e) => /* @__PURE__ */ (0, b.jsxs)("div", {
											className: `asset-breakdown-item ${e.className ?? ""}`.trim(),
											style: { "--asset-color": e.color },
											children: [
												/* @__PURE__ */ (0, b.jsx)("span", { children: e.label }),
												/* @__PURE__ */ (0, b.jsx)("strong", { children: F(e.value) }),
												/* @__PURE__ */ (0, b.jsx)("em", { children: e.detail })
											]
										}, e.label))
									})]
								}),
								/* @__PURE__ */ (0, b.jsx)("div", {
									className: "overview-grid",
									children: bi.map((e) => /* @__PURE__ */ (0, b.jsxs)("article", {
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
											/* @__PURE__ */ (0, b.jsx)(R, {
												title: "资产结构",
												summary: `总资产 ${F(V.totalAssets)}`,
												children: /* @__PURE__ */ (0, b.jsx)(An, {
													data: Pi,
													centerLabel: "总资产",
													centerValue: F(V.totalAssets)
												})
											}),
											/* @__PURE__ */ (0, b.jsx)(R, {
												title: "年度资金分布",
												summary: `全年全部安排 ${F(ar.annualOutflow)}`,
												children: /* @__PURE__ */ (0, b.jsx)(An, {
													data: Hi,
													centerLabel: ar.annualSurplus >= 0 ? "可分配资金" : "年度安排",
													centerValue: F(ar.annualSurplus >= 0 ? ar.annualIncome : ar.annualOutflow)
												})
											}),
											/* @__PURE__ */ (0, b.jsx)(R, {
												title: "账本支出最高项",
												summary: `${$n.label} / 已花 ${F(V.spendingActual)}`,
												className: "spending-top-panel",
												children: /* @__PURE__ */ (0, b.jsx)(Mn, {
													data: ki,
													valueFormatter: F
												})
											}),
											/* @__PURE__ */ (0, b.jsx)(R, {
												title: "账本健康维度",
												summary: `${$n.label} / 综合 ${V.score} 分`,
												children: /* @__PURE__ */ (0, b.jsx)(Mn, {
													data: Ca,
													valueFormatter: (e) => `${e.toFixed(0)}分`,
													percentMode: !0
												})
											}),
											/* @__PURE__ */ (0, b.jsx)(R, {
												title: `${sr}预算现金瀑布`,
												summary: `全部安排 ${F(or.totalOutflow)}`,
												children: /* @__PURE__ */ (0, b.jsx)(Rn, { data: Bi })
											}),
											/* @__PURE__ */ (0, b.jsx)(R, {
												title: "账本现金流日历",
												summary: `${$n.label}账本及提醒记录`,
												children: /* @__PURE__ */ (0, b.jsx)(Ln, { events: _r })
											}),
											/* @__PURE__ */ (0, b.jsx)(R, {
												title: "账本风险矩阵",
												summary: `${$n.label}账本模型`,
												className: "wide risk-panel",
												children: /* @__PURE__ */ (0, b.jsx)(zn, { data: wa })
											}),
											/* @__PURE__ */ (0, b.jsx)(R, {
												title: `${sr}预算流向`,
												summary: `全部安排 ${F(or.totalOutflow)}`,
												children: /* @__PURE__ */ (0, b.jsx)(Bn, {
													data: Vi,
													source: "工资账户",
													valueFormatter: F
												})
											})
										]
									})]
								}),
								/* @__PURE__ */ (0, b.jsx)("div", {
									className: "module-grid",
									children: gt.map((e) => /* @__PURE__ */ (0, b.jsxs)("button", {
										className: `module-card ${c.includes(e.id) ? "selected" : ""}`,
										onClick: () => oi(e.id),
										children: [
											/* @__PURE__ */ (0, b.jsx)("strong", { children: e.title }),
											/* @__PURE__ */ (0, b.jsx)("span", { children: e.desc }),
											/* @__PURE__ */ (0, b.jsx)("em", { children: c.includes(e.id) ? "已打开，点击关闭" : "打开详情" })
										]
									}, e.id))
								})
							]
						}),
						c.length > 0 && /* @__PURE__ */ (0, b.jsxs)("section", {
							className: "selected-modules",
							children: [/* @__PURE__ */ (0, b.jsxs)("div", {
								className: "section-title selected-title",
								children: [/* @__PURE__ */ (0, b.jsxs)("div", { children: [/* @__PURE__ */ (0, b.jsx)("h2", { children: "已打开模块" }), /* @__PURE__ */ (0, b.jsx)("p", { children: "可以同时观看多个模块；每个模块左侧是数据，右侧是图表。" })] }), /* @__PURE__ */ (0, b.jsxs)("div", {
									className: "panel-actions",
									children: [/* @__PURE__ */ (0, b.jsx)("button", {
										onClick: ci,
										children: "打开全部"
									}), /* @__PURE__ */ (0, b.jsx)("button", {
										onClick: () => l([]),
										children: "全部收起"
									})]
								})]
							}), c.map((i) => /* @__PURE__ */ (0, b.jsxs)("section", {
								className: "detail-panel",
								id: `finance-${i}`,
								tabIndex: -1,
								"aria-label": gt.find((e) => e.id === i)?.title,
								children: [
									i === "income" && /* @__PURE__ */ (0, b.jsxs)(sn, {
										title: "收入",
										desc: "收入只看实际到账；炒股月结算单独记录，不进入现金流预测。",
										children: [/* @__PURE__ */ (0, b.jsx)(nn, {
											label: "每月工资规划（元）",
											value: e.salary,
											onChange: (t) => Tr({
												...e,
												salary: t
											})
										}), /* @__PURE__ */ (0, b.jsx)(on, {
											data: /* @__PURE__ */ (0, b.jsx)(pn, {
												records: g,
												selectedMonth: m,
												onSelect: h,
												addMonthRecord: Cr,
												deleteMonthRecord: wr,
												updateMonthRecord: Sr
											}),
											charts: /* @__PURE__ */ (0, b.jsxs)("div", {
												className: "chart-grid two",
												children: [
													/* @__PURE__ */ (0, b.jsx)(R, {
														title: "收入结构",
														summary: `${$n.label} ${F(ir)}`,
														children: /* @__PURE__ */ (0, b.jsx)(An, {
															data: xi,
															centerLabel: "实际收入",
															centerValue: F(ir)
														})
													}),
													/* @__PURE__ */ (0, b.jsx)(R, {
														title: "收入口径",
														summary: "股票月结不进预测",
														children: /* @__PURE__ */ (0, b.jsx)(Fn, {
															data: xi,
															valueFormatter: F
														})
													}),
													/* @__PURE__ */ (0, b.jsx)(R, {
														title: "月度收入趋势",
														summary: "按月份分开记录",
														children: /* @__PURE__ */ (0, b.jsx)(Nn, {
															data: Ci,
															valueFormatter: F
														})
													})
												]
											})
										})]
									}),
									i === "spending" && /* @__PURE__ */ (0, b.jsx)(sn, {
										title: "支出",
										desc: "细项支出按大类归属；学习单列用途，日常使用可按咔皮记账报告核对。",
										children: /* @__PURE__ */ (0, b.jsx)(on, {
											data: /* @__PURE__ */ (0, b.jsxs)(b.Fragment, { children: [
												/* @__PURE__ */ (0, b.jsx)(cn, {
													records: g,
													selectedMonth: m,
													onAddMonth: Cr,
													onChange: h,
													onDeleteSelectedMonth: () => wr(m)
												}),
												/* @__PURE__ */ (0, b.jsx)(Hn, {
													budgets: rr,
													deleteBudget: Mr,
													addBudget: jr,
													addDetailedBudgets: Nr,
													updateBudget: Ar
												}),
												/* @__PURE__ */ (0, b.jsx)(Un, {
													budgets: rr,
													monthLabel: $n.label,
													allowance: e.rows.find((e) => e.id === "learning")?.[e.mode] ?? 0
												})
											] }),
											charts: /* @__PURE__ */ (0, b.jsxs)("div", {
												className: "chart-grid two",
												children: [
													/* @__PURE__ */ (0, b.jsx)(R, {
														title: "实际支出最高8项",
														summary: `已花 ${F(V.spendingActual)}`,
														className: "spending-top-panel",
														children: /* @__PURE__ */ (0, b.jsx)(Mn, {
															data: ki,
															valueFormatter: F
														})
													}),
													/* @__PURE__ */ (0, b.jsx)(R, {
														title: "全部实际支出占比",
														summary: "按实际金额",
														children: /* @__PURE__ */ (0, b.jsx)(An, {
															data: Ai,
															centerLabel: "实际",
															centerValue: F(V.spendingActual)
														})
													}),
													/* @__PURE__ */ (0, b.jsx)(R, {
														title: "分类预算执行",
														summary: "实际 / 预算 / 按实际金额降序",
														children: /* @__PURE__ */ (0, b.jsx)(Mn, {
															data: Di,
															valueFormatter: F
														})
													}),
													/* @__PURE__ */ (0, b.jsx)(R, {
														title: "预算必要性结构",
														summary: "必须 vs 可取消",
														children: /* @__PURE__ */ (0, b.jsx)(An, {
															data: H,
															centerLabel: "预算",
															centerValue: F(V.spendingPlan)
														})
													}),
													/* @__PURE__ */ (0, b.jsx)(R, {
														title: "月度支出趋势",
														summary: "每月实际支出",
														children: /* @__PURE__ */ (0, b.jsx)(Nn, {
															data: wi,
															valueFormatter: F
														})
													}),
													/* @__PURE__ */ (0, b.jsx)(R, {
														title: "月度结余趋势",
														summary: "收入 - 实际支出",
														children: /* @__PURE__ */ (0, b.jsx)(Nn, {
															data: Ti,
															valueFormatter: F
														})
													})
												]
											})
										})
									}),
									i === "cashflow" && /* @__PURE__ */ (0, b.jsx)(sn, {
										title: "账本现金流预测",
										desc: "工资采用统一规划值，支出按所选月份账本推演6个月；出差月份与补贴到账尚未确定。历史实际收入不改写预测工资。",
										children: /* @__PURE__ */ (0, b.jsx)(on, {
											data: /* @__PURE__ */ (0, b.jsxs)(b.Fragment, { children: [
												/* @__PURE__ */ (0, b.jsx)(cn, {
													records: g,
													selectedMonth: m,
													onAddMonth: Cr,
													onChange: h,
													onDeleteSelectedMonth: () => wr(m)
												}),
												/* @__PURE__ */ (0, b.jsx)(_n, {
													accountTotal: V.accountTotal,
													addCashflowCustomItem: Er,
													monthlyInflow: U,
													monthlyOutflow: ji,
													rows: Ni
												}),
												/* @__PURE__ */ (0, b.jsx)(Cn, {
													reminders: we,
													addReminder: Wr,
													deleteReminder: Gr,
													updateReminder: Ur
												})
											] }),
											charts: /* @__PURE__ */ (0, b.jsxs)("div", {
												className: "chart-grid two",
												children: [
													/* @__PURE__ */ (0, b.jsx)(R, {
														title: "余额趋势",
														summary: "未来 6 个月",
														children: /* @__PURE__ */ (0, b.jsx)(Pn, {
															data: Li,
															valueFormatter: F
														})
													}),
													/* @__PURE__ */ (0, b.jsx)(R, {
														title: "月度流出压力",
														summary: `每月流出 ${F(ji)}`,
														children: /* @__PURE__ */ (0, b.jsx)(Nn, {
															data: Ri,
															valueFormatter: F
														})
													}),
													/* @__PURE__ */ (0, b.jsx)(R, {
														title: "现金瀑布",
														summary: "本月资金变化",
														children: /* @__PURE__ */ (0, b.jsx)(Rn, { data: zi })
													}),
													/* @__PURE__ */ (0, b.jsx)(R, {
														title: "现金流日历",
														summary: "账单与工资联动",
														children: /* @__PURE__ */ (0, b.jsx)(Ln, { events: _r })
													})
												]
											})
										})
									}),
									i === "accounts" && /* @__PURE__ */ (0, b.jsx)(sn, {
										title: "账户管理",
										desc: "账户可以新增、删除、编辑和拖动排序，修改后会联动总资产、现金流和图表。",
										children: /* @__PURE__ */ (0, b.jsx)(on, {
											data: /* @__PURE__ */ (0, b.jsx)(b.Fragment, { children: /* @__PURE__ */ (0, b.jsx)(vn, {
												accounts: y,
												addAccount: yr,
												deleteAccount: br,
												liquidAccountTotal: V.liquidAccountTotal,
												reorderAccount: xr,
												total: V.accountTotal,
												updateAccount: vr
											}) }),
											charts: /* @__PURE__ */ (0, b.jsxs)("div", {
												className: "chart-grid two",
												children: [
													/* @__PURE__ */ (0, b.jsx)(R, {
														title: "账户余额分布",
														summary: `账户合计 ${F(V.accountTotal)} / 按余额降序`,
														children: /* @__PURE__ */ (0, b.jsx)(An, {
															data: Ei,
															centerLabel: "账户",
															centerValue: F(V.accountTotal)
														})
													}),
													/* @__PURE__ */ (0, b.jsx)(R, {
														title: "可动用现金",
														summary: `可立即动用 ${F(V.liquidAccountTotal)} / 按余额降序`,
														children: /* @__PURE__ */ (0, b.jsx)(Mn, {
															data: Ei,
															valueFormatter: F
														})
													}),
													/* @__PURE__ */ (0, b.jsx)(R, {
														title: "账户用途映射",
														summary: "账户余额流向 / 按余额降序",
														children: /* @__PURE__ */ (0, b.jsx)(Bn, {
															data: Ei,
															source: "账户池",
															valueFormatter: F
														})
													})
												]
											})
										})
									}),
									i === "budget" && /* @__PURE__ */ (0, b.jsx)(sn, {
										title: "预算管理",
										desc: "与首页完整分配表同步，按不出差月份、出差月份及全年预算计算。",
										children: /* @__PURE__ */ (0, b.jsx)(on, {
											data: /* @__PURE__ */ (0, b.jsxs)(b.Fragment, { children: [
												/* @__PURE__ */ (0, b.jsxs)("div", {
													className: "button-row",
													children: [/* @__PURE__ */ (0, b.jsx)("button", {
														type: "button",
														className: "ghost-button",
														"aria-pressed": e.mode === "normal",
														onClick: () => t({
															...e,
															mode: "normal"
														}),
														children: "不出差月份"
													}), /* @__PURE__ */ (0, b.jsx)("button", {
														type: "button",
														className: "ghost-button",
														"aria-pressed": e.mode === "trip",
														disabled: e.awayMonths === 0,
														onClick: () => t({
															...e,
															mode: "trip"
														}),
														children: "出差月份"
													})]
												}),
												/* @__PURE__ */ (0, b.jsxs)("div", {
													className: "stat-strip",
													children: [
														/* @__PURE__ */ (0, b.jsx)(L, {
															label: `${sr}可分配资金`,
															value: F(or.income)
														}),
														/* @__PURE__ */ (0, b.jsx)(L, {
															label: `${sr}全部分配`,
															value: F(or.totalOutflow)
														}),
														/* @__PURE__ */ (0, b.jsx)(L, {
															label: `${sr}现金余量`,
															value: F(or.surplus)
														}),
														/* @__PURE__ */ (0, b.jsx)(L, {
															label: "全年全部分配",
															value: F(ar.annualOutflow)
														})
													]
												}),
												/* @__PURE__ */ (0, b.jsx)(ae, {
													plan: e,
													onChange: Tr,
													titleId: "module-annual-allocation-title"
												}),
												/* @__PURE__ */ (0, b.jsxs)("details", { children: [
													/* @__PURE__ */ (0, b.jsx)("summary", { children: "查看历史月份预算与实际支出" }),
													/* @__PURE__ */ (0, b.jsx)("p", {
														className: "ledger-context",
														children: "以下是已保存月份的账本数据，年度分配表用于当前计划；历史预算金额可在这里单独维护。"
													}),
													/* @__PURE__ */ (0, b.jsx)(cn, {
														records: g,
														selectedMonth: m,
														onChange: h
													}),
													/* @__PURE__ */ (0, b.jsx)(Hn, {
														budgets: rr,
														deleteBudget: Mr,
														addBudget: jr,
														addDetailedBudgets: Nr,
														updateBudget: Ar
													})
												] })
											] }),
											charts: /* @__PURE__ */ (0, b.jsxs)("div", {
												className: "chart-grid two",
												children: [
													/* @__PURE__ */ (0, b.jsx)(R, {
														title: "年度资金分布",
														summary: `可分配 ${F(ar.annualIncome)} / 全部分配 ${F(ar.annualOutflow)}`,
														children: /* @__PURE__ */ (0, b.jsx)(An, {
															data: Hi,
															centerLabel: ar.annualSurplus >= 0 ? "可分配资金" : "年度安排",
															centerValue: F(ar.annualSurplus >= 0 ? ar.annualIncome : ar.annualOutflow)
														})
													}),
													/* @__PURE__ */ (0, b.jsx)(R, {
														title: `${sr}分类分配`,
														summary: `合计 ${F(or.totalOutflow)}`,
														children: /* @__PURE__ */ (0, b.jsx)(Mn, {
															data: Vi,
															valueFormatter: F
														})
													}),
													/* @__PURE__ */ (0, b.jsx)(R, {
														title: `${sr}现金流核对`,
														summary: `余量 ${F(or.surplus)}`,
														children: /* @__PURE__ */ (0, b.jsx)(Rn, { data: Bi })
													})
												]
											})
										})
									}),
									i === "investment" && /* @__PURE__ */ (0, b.jsx)(sn, {
										title: "投资管理",
										desc: "投资理财单独成栏，A股 / 美股 / 港股分开看；计划投入和市值都能改。",
										children: /* @__PURE__ */ (0, b.jsx)(on, {
											data: /* @__PURE__ */ (0, b.jsxs)(b.Fragment, { children: [/* @__PURE__ */ (0, b.jsxs)("div", {
												className: "form-grid",
												children: [
													/* @__PURE__ */ (0, b.jsx)(nn, {
														label: "美元兑人民币",
														value: T,
														onChange: ne,
														step: .01
													}),
													/* @__PURE__ */ (0, b.jsx)(nn, {
														label: "港币兑人民币",
														value: D,
														onChange: ie,
														step: .01
													}),
													/* @__PURE__ */ (0, b.jsx)(nn, {
														label: "A股月计划投入",
														value: se,
														onChange: O
													}),
													/* @__PURE__ */ (0, b.jsx)(nn, {
														label: "美股月计划投入",
														value: k,
														onChange: ce
													}),
													/* @__PURE__ */ (0, b.jsx)(nn, {
														label: "港股月计划投入",
														value: le,
														onChange: ue
													})
												]
											}), /* @__PURE__ */ (0, b.jsx)(yn, {
												holdings: w,
												addHolding: Fr,
												deleteHolding: Ir,
												fxHkd: D,
												fxUsd: T,
												updateHolding: Pr
											})] }),
											charts: /* @__PURE__ */ (0, b.jsxs)("div", {
												className: "chart-grid two",
												children: [
													/* @__PURE__ */ (0, b.jsx)(R, {
														title: "市场分布",
														summary: `投资市值 ${F(V.investmentValue)}`,
														children: /* @__PURE__ */ (0, b.jsx)(An, {
															data: Fi,
															centerLabel: "投资",
															centerValue: F(V.investmentValue)
														})
													}),
													/* @__PURE__ */ (0, b.jsx)(R, {
														title: "盈亏绝对值",
														summary: `总盈亏 ${F(V.investmentPnL)}`,
														children: /* @__PURE__ */ (0, b.jsx)(Mn, {
															data: Ii,
															valueFormatter: F
														})
													}),
													/* @__PURE__ */ (0, b.jsx)(R, {
														title: "收益率 / 仓位",
														summary: "横轴仓位，纵轴收益",
														children: /* @__PURE__ */ (0, b.jsx)(Vn, {
															data: Sa,
															xLabel: "仓位",
															yLabel: "收益"
														})
													})
												]
											})
										})
									}),
									i === "balance" && /* @__PURE__ */ (0, b.jsx)(sn, {
										title: "资产负债表",
										desc: "资产项和负债项都支持新增、删除和直接编辑。",
										children: /* @__PURE__ */ (0, b.jsx)(on, {
											data: /* @__PURE__ */ (0, b.jsxs)(b.Fragment, { children: [
												/* @__PURE__ */ (0, b.jsx)(bn, {
													addBalanceAsset: Rr,
													balanceAssets: be,
													deleteBalanceAsset: zr,
													totalAssets: V.totalAssets,
													updateBalanceAsset: Lr
												}),
												/* @__PURE__ */ (0, b.jsx)(xn, {
													addLiability: Vr,
													deleteLiability: Hr,
													liabilities: Se,
													updateLiability: Br
												}),
												/* @__PURE__ */ (0, b.jsxs)("div", {
													className: "stat-strip",
													children: [
														/* @__PURE__ */ (0, b.jsx)(L, {
															label: "总资产",
															value: F(V.totalAssets)
														}),
														/* @__PURE__ */ (0, b.jsx)(L, {
															label: "总负债",
															value: F(V.totalDebt)
														}),
														/* @__PURE__ */ (0, b.jsx)(L, {
															label: "净资产",
															value: F(V.netWorth)
														}),
														/* @__PURE__ */ (0, b.jsx)(L, {
															label: "负债率",
															value: vt(V.debtRatio)
														})
													]
												})
											] }),
											charts: /* @__PURE__ */ (0, b.jsxs)("div", {
												className: "chart-grid two",
												children: [
													/* @__PURE__ */ (0, b.jsx)(R, {
														title: "资产负债对比",
														summary: `净资产 ${F(V.netWorth)}`,
														children: /* @__PURE__ */ (0, b.jsx)(Mn, {
															data: Wi,
															valueFormatter: F
														})
													}),
													/* @__PURE__ */ (0, b.jsx)(R, {
														title: "负债结构",
														summary: V.totalDebt ? `负债 ${F(V.totalDebt)}` : "当前无负债",
														children: /* @__PURE__ */ (0, b.jsx)(An, {
															data: Ki,
															centerLabel: "负债",
															centerValue: F(V.totalDebt)
														})
													}),
													/* @__PURE__ */ (0, b.jsx)(R, {
														title: "资产项结构",
														summary: `补录资产 ${F(V.manualAssetTotal)}`,
														children: /* @__PURE__ */ (0, b.jsx)(An, {
															data: Gi,
															centerLabel: "资产项",
															centerValue: F(V.manualAssetTotal)
														})
													}),
													/* @__PURE__ */ (0, b.jsx)(R, {
														title: "净资产趋势",
														summary: "按 6 个月现金预测推演",
														children: /* @__PURE__ */ (0, b.jsx)(Pn, {
															data: Ui,
															valueFormatter: F
														})
													})
												]
											})
										})
									}),
									i === "emergency" && /* @__PURE__ */ (0, b.jsxs)(sn, {
										title: "应急&学习金",
										desc: "预算合并显示，应急储备与学习实际支出分开核算；学习额度不计为应急余额。",
										children: [/* @__PURE__ */ (0, b.jsxs)("div", {
											className: "stat-strip",
											children: [/* @__PURE__ */ (0, b.jsx)(L, {
												label: "每月应急划拨预算",
												value: F(e.rows.find((e) => e.id === "emergency")?.[e.mode] ?? 0)
											}), /* @__PURE__ */ (0, b.jsx)(L, {
												label: "每月学习消费预算",
												value: F(e.rows.find((e) => e.id === "learning")?.[e.mode] ?? 0)
											})]
										}), /* @__PURE__ */ (0, b.jsx)(on, {
											data: /* @__PURE__ */ (0, b.jsxs)(b.Fragment, { children: [
												/* @__PURE__ */ (0, b.jsx)(Sn, {
													emergencyFund: V.currentEmergencyFund,
													emergencyMonthlyNeed: _e,
													emergencyMonths: he,
													setEmergencyFund: $r,
													setEmergencyMonthlyNeed: ye,
													setEmergencyMonths: ge
												}),
												/* @__PURE__ */ (0, b.jsxs)("div", {
													className: "stat-strip",
													children: [
														/* @__PURE__ */ (0, b.jsx)(L, {
															label: "覆盖月数",
															value: `${V.emergencyCoverage.toFixed(1)} 个月`
														}),
														/* @__PURE__ */ (0, b.jsx)(L, {
															label: "目标金额",
															value: F(V.emergencyTarget)
														}),
														/* @__PURE__ */ (0, b.jsx)(L, {
															label: "缺口",
															value: F(Math.max(0, V.emergencyTarget - V.currentEmergencyFund))
														}),
														/* @__PURE__ */ (0, b.jsx)(L, {
															label: "当前进度",
															value: vt(V.emergencyCoverage / Math.max(he, 1))
														})
													]
												}),
												/* @__PURE__ */ (0, b.jsxs)("label", {
													className: "field",
													children: [/* @__PURE__ */ (0, b.jsx)("span", { children: "学习统计月份" }), /* @__PURE__ */ (0, b.jsx)("select", {
														"aria-label": "学习统计月份",
														value: m,
														onChange: (e) => h(e.target.value),
														children: g.map((e) => /* @__PURE__ */ (0, b.jsx)("option", {
															value: e.id,
															children: e.label
														}, e.id))
													})]
												}),
												/* @__PURE__ */ (0, b.jsx)(Un, {
													budgets: rr,
													monthLabel: $n.label,
													allowance: e.rows.find((e) => e.id === "learning")?.[e.mode] ?? 0
												})
											] }),
											charts: /* @__PURE__ */ (0, b.jsxs)("div", {
												className: "chart-grid two",
												children: [/* @__PURE__ */ (0, b.jsx)(R, {
													title: "应急金覆盖",
													summary: `${V.emergencyCoverage.toFixed(1)} / ${he} 个月`,
													children: /* @__PURE__ */ (0, b.jsx)(In, {
														data: [{
															label: "应急金目标",
															value: V.currentEmergencyFund,
															max: V.emergencyTarget,
															color: P[1],
															detail: `缺口 ${F(Math.max(0, V.emergencyTarget - V.currentEmergencyFund))}`
														}],
														valueFormatter: F
													})
												}), /* @__PURE__ */ (0, b.jsx)(R, {
													title: "必要支出压力",
													summary: `应急基准 ${F(V.emergencyMonthlyNeed)}`,
													children: /* @__PURE__ */ (0, b.jsx)(Mn, {
														data: [
															{
																label: "应急月均支出",
																value: V.emergencyMonthlyNeed,
																color: P[1]
															},
															{
																label: "预算必要支出",
																value: V.requiredSpending,
																color: P[2]
															},
															{
																label: "预算总额",
																value: V.spendingPlan,
																color: P[4]
															}
														],
														valueFormatter: F
													})
												})]
											})
										})]
									}),
									i === "reminders" && /* @__PURE__ */ (0, b.jsx)(sn, {
										title: "账单与提醒",
										desc: "网页内提醒，默认提前 7 天；金额可先手动维护。",
										children: /* @__PURE__ */ (0, b.jsx)(on, {
											data: /* @__PURE__ */ (0, b.jsx)(Cn, {
												reminders: we,
												addReminder: Wr,
												deleteReminder: Gr,
												updateReminder: Ur
											}),
											charts: /* @__PURE__ */ (0, b.jsxs)("div", {
												className: "chart-grid two",
												children: [
													/* @__PURE__ */ (0, b.jsx)(R, {
														title: "提醒金额",
														summary: "避免漏扣",
														children: /* @__PURE__ */ (0, b.jsx)(Mn, {
															data: va,
															valueFormatter: F
														})
													}),
													/* @__PURE__ */ (0, b.jsx)(R, {
														title: "距离到期",
														summary: "以 2026-06-14 为当前日",
														children: /* @__PURE__ */ (0, b.jsx)(Nn, {
															data: ya,
															valueFormatter: (e) => `${e.toFixed(0)}天`
														})
													}),
													/* @__PURE__ */ (0, b.jsx)(R, {
														title: "提醒日历",
														summary: "未来关键扣款",
														children: /* @__PURE__ */ (0, b.jsx)(Ln, { events: _r })
													})
												]
											})
										})
									}),
									i === "goals" && /* @__PURE__ */ (0, b.jsx)(sn, {
										title: "目标管理",
										desc: "旅游、学习、父母储蓄、伴侣基金和大额支出目标都可以维护目标金额；预期准备用于规划，实际投入用于本月计算。",
										children: /* @__PURE__ */ (0, b.jsx)(on, {
											data: /* @__PURE__ */ (0, b.jsxs)(b.Fragment, { children: [/* @__PURE__ */ (0, b.jsx)(cn, {
												records: g,
												selectedMonth: m,
												onChange: h
											}), /* @__PURE__ */ (0, b.jsx)(wn, {
												goals: De,
												addGoal: ei,
												deleteGoal: ti,
												updateGoal: Kr
											})] }),
											charts: /* @__PURE__ */ (0, b.jsxs)("div", {
												className: "chart-grid two",
												children: [
													/* @__PURE__ */ (0, b.jsx)(R, {
														title: "目标进度",
														summary: "当前 / 目标",
														children: /* @__PURE__ */ (0, b.jsx)(In, {
															data: qi,
															valueFormatter: F
														})
													}),
													/* @__PURE__ */ (0, b.jsx)(R, {
														title: "每月预期准备结构",
														summary: `预期 ${F(Xi)}`,
														children: /* @__PURE__ */ (0, b.jsx)(An, {
															data: De.map((e, t) => ({
																label: e.name,
																value: e.monthly,
																color: P[t % P.length]
															})),
															centerLabel: "每月",
															centerValue: F(Xi)
														})
													}),
													/* @__PURE__ */ (0, b.jsx)(R, {
														title: "月度实际目标投入",
														summary: `实际投入 ${F(Zi)}`,
														children: /* @__PURE__ */ (0, b.jsx)(Nn, {
															data: $i,
															valueFormatter: F
														})
													}),
													/* @__PURE__ */ (0, b.jsx)(R, {
														title: "支出与投入压力",
														summary: "实际支出 + 实际投入",
														children: /* @__PURE__ */ (0, b.jsx)(Nn, {
															data: ea,
															valueFormatter: F
														})
													}),
													/* @__PURE__ */ (0, b.jsx)(R, {
														title: "累计准备变化",
														summary: `当前 ${F(Ji)}`,
														children: /* @__PURE__ */ (0, b.jsx)(Pn, {
															data: ta,
															valueFormatter: F
														})
													})
												]
											})
										})
									}),
									i === "fundBuckets" && /* @__PURE__ */ (0, b.jsx)(sn, {
										title: "大花费项目",
										desc: "把旅行、搬家、手机分期、应急金和投资待投金拆开，避免同一笔钱被重复占用。",
										children: /* @__PURE__ */ (0, b.jsx)(on, {
											data: /* @__PURE__ */ (0, b.jsxs)(b.Fragment, { children: [/* @__PURE__ */ (0, b.jsxs)("div", {
												className: "stat-strip",
												children: [
													/* @__PURE__ */ (0, b.jsx)(L, {
														label: "可动用现金",
														value: F(V.liquidAccountTotal)
													}),
													/* @__PURE__ */ (0, b.jsx)(L, {
														label: "投资待投金",
														value: F(V.investmentReserve)
													}),
													/* @__PURE__ */ (0, b.jsx)(L, {
														label: "项目缺口",
														value: F(oa)
													}),
													/* @__PURE__ */ (0, b.jsx)(L, {
														label: "未分配现金",
														value: F(la)
													})
												]
											}), /* @__PURE__ */ (0, b.jsx)(Tn, {
												buckets: na,
												addFundBucket: ri,
												deleteFundBucket: ii,
												investmentReserve: V.investmentReserve,
												liquidAfterBuckets: la,
												monthlyNeed: ca,
												updateFundBucket: ni
											})] }),
											charts: /* @__PURE__ */ (0, b.jsxs)("div", {
												className: "chart-grid two",
												children: [
													/* @__PURE__ */ (0, b.jsx)(R, {
														title: "已锁定资金",
														summary: `含待投资金 ${F(V.investmentReserve)}`,
														children: /* @__PURE__ */ (0, b.jsx)(An, {
															data: fa,
															centerLabel: "已准备",
															centerValue: F(ra + V.investmentReserve)
														})
													}),
													/* @__PURE__ */ (0, b.jsx)(R, {
														title: "大花费项目缺口",
														summary: `总缺口 ${F(oa)}`,
														children: /* @__PURE__ */ (0, b.jsx)(Mn, {
															data: pa,
															valueFormatter: F
														})
													}),
													/* @__PURE__ */ (0, b.jsx)(R, {
														title: "每月补齐压力",
														summary: `每月需 ${F(ca)}`,
														children: /* @__PURE__ */ (0, b.jsx)(Nn, {
															data: ma,
															valueFormatter: F
														})
													}),
													/* @__PURE__ */ (0, b.jsx)(R, {
														title: "大花费项目结论",
														summary: la < 0 ? "存在重复占用" : "现金标签可执行",
														children: /* @__PURE__ */ (0, b.jsxs)("div", {
															className: "fund-bucket-note",
															children: [/* @__PURE__ */ (0, b.jsx)("strong", { children: la < 0 ? "先处理现金占用冲突" : "当前标签可落地" }), /* @__PURE__ */ (0, b.jsx)("span", { children: "待投资金会自动从账户用途识别，不需要手动重复录入。旅行、搬家、分期和应急金只记录额外需要锁定的现金。" })]
														})
													})
												]
											})
										})
									}),
									i === "periodReview" && /* @__PURE__ */ (0, b.jsx)(sn, {
										title: "周期复盘",
										desc: "本期实际发生额与上期同类周期比较；记录与账本明细分别保存。",
										children: /* @__PURE__ */ (0, b.jsx)(Ie, {
											records: n,
											plan: e,
											accounts: y,
											focusSource: {
												projects: ke.map(({ id: e, name: t, target: n, current: r, dueDate: i }) => ({
													id: e,
													name: t,
													target: n,
													current: r,
													dueDate: i
												})),
												bills: we.map(({ id: e, name: t, amount: n, date: r, kind: i }) => ({
													id: e,
													name: t,
													amount: n,
													date: r,
													kind: i
												})),
												assets: be.map(({ id: e, name: t, amount: n }) => ({
													id: e,
													name: t,
													amount: n
												})),
												debts: Se.map(({ id: e, name: t, amount: n }) => ({
													id: e,
													name: t,
													amount: n
												})),
												holdings: V.investmentValue
											},
											onOpenModule: si,
											onChange: (e, t) => {
												let n = t ? y.map((e) => {
													let n = t.find((t) => t.id === e.id);
													return n ? {
														...e,
														balance: n.balance
													} : e;
												}) : y;
												B({
													...z(),
													financeReviews: e,
													accounts: n
												}), r(e), t && ee(n);
											}
										})
									}),
									i === "reports" && /* @__PURE__ */ (0, b.jsx)(sn, {
										title: "财务报表",
										desc: "每月自动生成完整分析报告，覆盖净资产、现金流、投资、大花费项目、家庭责任和风险。",
										children: /* @__PURE__ */ (0, b.jsx)(on, {
											data: /* @__PURE__ */ (0, b.jsxs)(b.Fragment, { children: [
												/* @__PURE__ */ (0, b.jsxs)("div", {
													className: "stat-strip",
													children: [
														/* @__PURE__ */ (0, b.jsx)(L, {
															label: "收入",
															value: F(ir)
														}),
														/* @__PURE__ */ (0, b.jsx)(L, {
															label: "支出",
															value: F(V.spendingActual)
														}),
														/* @__PURE__ */ (0, b.jsx)(L, {
															label: "结余",
															value: F(V.monthlySurplus)
														}),
														/* @__PURE__ */ (0, b.jsx)(L, {
															label: "项目后现金",
															value: F(la)
														})
													]
												}),
												/* @__PURE__ */ (0, b.jsx)(En, {
													copyStatus: Yt,
													reportText: _a,
													sections: ha,
													onCopy: Fa
												}),
												/* @__PURE__ */ (0, b.jsx)(Dn, {
													allocation: V.assetOutflow,
													income: ir,
													rows: ba,
													spending: V.spendingActual,
													surplus: V.monthlySurplus
												})
											] }),
											charts: /* @__PURE__ */ (0, b.jsxs)("div", {
												className: "chart-grid two",
												children: [
													/* @__PURE__ */ (0, b.jsx)(R, {
														title: "本月资金流向",
														summary: `储蓄率 ${vt(V.savingsRate)}`,
														children: /* @__PURE__ */ (0, b.jsx)(Nn, {
															data: xa,
															valueFormatter: F
														})
													}),
													/* @__PURE__ */ (0, b.jsx)(R, {
														title: "月度收支对比",
														summary: "收入和支出分月查看",
														children: /* @__PURE__ */ (0, b.jsx)(Nn, {
															data: [...Ci, ...wi],
															valueFormatter: F
														})
													}),
													/* @__PURE__ */ (0, b.jsx)(R, {
														title: "现金流未来趋势",
														summary: `6个月末 ${F(gr[gr.length - 1]?.balance ?? 0)}`,
														children: /* @__PURE__ */ (0, b.jsx)(Pn, {
															data: Li,
															valueFormatter: F
														})
													}),
													/* @__PURE__ */ (0, b.jsx)(R, {
														title: "资金瀑布复盘",
														summary: "收入、支出、分配",
														children: /* @__PURE__ */ (0, b.jsx)(Rn, { data: zi })
													}),
													/* @__PURE__ */ (0, b.jsx)(R, {
														title: "风险矩阵",
														summary: "下月关注点",
														children: /* @__PURE__ */ (0, b.jsx)(zn, { data: wa })
													})
												]
											})
										})
									}),
									i === "monthlyArchive" && /* @__PURE__ */ (0, b.jsx)(sn, {
										title: "月度存档",
										desc: "每月底保存一次月报，用来追踪收入、支出、账户余额和净资产的环比变化。",
										children: /* @__PURE__ */ (0, b.jsx)(on, {
											data: /* @__PURE__ */ (0, b.jsxs)(b.Fragment, { children: [
												/* @__PURE__ */ (0, b.jsx)(cn, {
													records: g,
													selectedMonth: m,
													onAddMonth: Cr,
													onChange: h,
													onDeleteSelectedMonth: () => wr(m)
												}),
												/* @__PURE__ */ (0, b.jsxs)("div", {
													className: "stat-strip",
													children: [
														/* @__PURE__ */ (0, b.jsx)(L, {
															label: "收入变化",
															value: mr ? Wt(ja) : "待对比"
														}),
														/* @__PURE__ */ (0, b.jsx)(L, {
															label: "支出变化",
															value: mr ? Wt(Ma) : "待对比"
														}),
														/* @__PURE__ */ (0, b.jsx)(L, {
															label: "账户变化",
															value: mr ? Wt(Na) : "待对比"
														}),
														/* @__PURE__ */ (0, b.jsx)(L, {
															label: "净资产变化",
															value: mr ? Wt(Pa) : "待对比"
														})
													]
												}),
												/* @__PURE__ */ (0, b.jsx)(hn, {
													archives: He,
													currentArchive: dr,
													deleteMonthlyArchive: ur,
													saveMonthlyArchive: lr,
													selectedMonth: m,
													onSelectMonth: h
												}),
												/* @__PURE__ */ (0, b.jsx)(gn, {
													currentArchive: pr,
													previousArchive: mr
												})
											] }),
											charts: /* @__PURE__ */ (0, b.jsxs)("div", {
												className: "chart-grid two",
												children: [
													/* @__PURE__ */ (0, b.jsx)(R, {
														title: "存档收入趋势",
														summary: `${hr.length} 个月 / 当前 ${F(ir)}`,
														children: /* @__PURE__ */ (0, b.jsx)(Nn, {
															data: Ea,
															valueFormatter: F
														})
													}),
													/* @__PURE__ */ (0, b.jsx)(R, {
														title: "存档支出趋势",
														summary: `当前支出 ${F(V.spendingActual)}`,
														children: /* @__PURE__ */ (0, b.jsx)(Nn, {
															data: Da,
															valueFormatter: F
														})
													}),
													/* @__PURE__ */ (0, b.jsx)(R, {
														title: "账户余额变化",
														summary: `当前账户 ${F(V.accountTotal)}`,
														children: /* @__PURE__ */ (0, b.jsx)(Pn, {
															data: ka,
															valueFormatter: F
														})
													}),
													/* @__PURE__ */ (0, b.jsx)(R, {
														title: "净资产变化",
														summary: `当前净资产 ${F(V.netWorth)}`,
														children: /* @__PURE__ */ (0, b.jsx)(Pn, {
															data: Oa,
															valueFormatter: F
														})
													}),
													/* @__PURE__ */ (0, b.jsx)(R, {
														title: "当月余额变化",
														summary: "收入 - 支出 - 分配",
														children: /* @__PURE__ */ (0, b.jsx)(Pn, {
															data: Aa,
															valueFormatter: F
														})
													})
												]
											})
										})
									}),
									i === "cloudSync" && /* @__PURE__ */ (0, b.jsx)(sn, {
										title: "云同步",
										desc: "点击保存会把加密数据写入 GitHub Gist；另一台电脑可从这里恢复同一份数据。",
										children: /* @__PURE__ */ (0, b.jsx)(on, {
											data: /* @__PURE__ */ (0, b.jsx)(mn, {
												cloudPassphrase: Xe,
												cloudStatus: pt,
												cloudSyncing: _t,
												clearCloudSyncSettings: Yn,
												downloadCloudSync: Qn,
												settings: N,
												setCloudPassphrase: Jn,
												updateCloudSyncSettings: qn,
												uploadCloudSync: () => void Zn(!1)
											}),
											charts: /* @__PURE__ */ (0, b.jsxs)("div", {
												className: "chart-grid two",
												children: [/* @__PURE__ */ (0, b.jsx)(R, {
													title: "同步状态",
													summary: N.gistId ? "已配置 Gist" : "未创建云端存档",
													children: /* @__PURE__ */ (0, b.jsxs)("div", {
														className: "cloud-status-board",
														children: [
															/* @__PURE__ */ (0, b.jsxs)("div", { children: [/* @__PURE__ */ (0, b.jsx)("span", { children: "云端 Gist" }), /* @__PURE__ */ (0, b.jsx)("strong", { children: N.gistId || "未创建" })] }),
															/* @__PURE__ */ (0, b.jsxs)("div", { children: [/* @__PURE__ */ (0, b.jsx)("span", { children: "自动同步" }), /* @__PURE__ */ (0, b.jsx)("strong", { children: N.autoSync ? "开启" : "关闭" })] }),
															/* @__PURE__ */ (0, b.jsxs)("div", { children: [/* @__PURE__ */ (0, b.jsx)("span", { children: "打开自动恢复" }), /* @__PURE__ */ (0, b.jsx)("strong", { children: N.rememberPassphrase ? "开启" : "关闭" })] }),
															/* @__PURE__ */ (0, b.jsxs)("div", { children: [/* @__PURE__ */ (0, b.jsx)("span", { children: "上次上传" }), /* @__PURE__ */ (0, b.jsx)("strong", { children: N.lastPushedAt ? Ut(N.lastPushedAt) : "暂无" })] }),
															/* @__PURE__ */ (0, b.jsxs)("div", { children: [/* @__PURE__ */ (0, b.jsx)("span", { children: "上次拉取" }), /* @__PURE__ */ (0, b.jsx)("strong", { children: N.lastPulledAt ? Ut(N.lastPulledAt) : "暂无" })] })
														]
													})
												}), /* @__PURE__ */ (0, b.jsx)(R, {
													title: "本机数据包",
													summary: `${g.length} 个月 / ${He.length} 条月报`,
													children: /* @__PURE__ */ (0, b.jsx)(Mn, {
														data: [
															{
																label: "收入月份",
																value: g.length,
																color: P[0]
															},
															{
																label: "月度存档",
																value: He.length,
																color: P[1]
															},
															{
																label: "完整版本",
																value: Re.length,
																color: P[3]
															},
															{
																label: "账户数量",
																value: y.length,
																color: P[2]
															}
														],
														valueFormatter: (e) => `${e.toFixed(0)} 条`
													})
												})]
											})
										})
									}),
									i === "health" && /* @__PURE__ */ (0, b.jsx)(sn, {
										title: "财务健康评分",
										desc: "100 分制，用现金流、应急金、负债、增长和趋势综合判断。",
										children: /* @__PURE__ */ (0, b.jsx)(on, {
											data: /* @__PURE__ */ (0, b.jsxs)(b.Fragment, { children: [
												/* @__PURE__ */ (0, b.jsxs)("div", {
													className: "health-score",
													style: { "--score": `${V.score}%` },
													children: [/* @__PURE__ */ (0, b.jsx)("strong", { children: V.score }), /* @__PURE__ */ (0, b.jsx)("span", { children: "财务健康分" })]
												}),
												/* @__PURE__ */ (0, b.jsx)(On, {
													emergencyMonthlyNeed: _e,
													emergencyMonths: he,
													addLiability: Vr,
													deleteLiability: Hr,
													liabilities: Se,
													setEmergencyMonthlyNeed: ye,
													setEmergencyMonths: ge,
													updateLiability: Br
												}),
												/* @__PURE__ */ (0, b.jsxs)("div", {
													className: "stat-strip",
													children: [
														/* @__PURE__ */ (0, b.jsx)(L, {
															label: "固定支出率",
															value: vt(V.fixedRatio)
														}),
														/* @__PURE__ */ (0, b.jsx)(L, {
															label: "应急覆盖",
															value: `${V.emergencyCoverage.toFixed(1)}个月`
														}),
														/* @__PURE__ */ (0, b.jsx)(L, {
															label: "负债率",
															value: vt(V.debtRatio)
														}),
														/* @__PURE__ */ (0, b.jsx)(L, {
															label: "投资盈亏",
															value: F(V.investmentPnL)
														})
													]
												})
											] }),
											charts: /* @__PURE__ */ (0, b.jsxs)("div", {
												className: "chart-grid two",
												children: [
													/* @__PURE__ */ (0, b.jsx)(R, {
														title: "健康维度拆解",
														summary: "五项分数",
														children: /* @__PURE__ */ (0, b.jsx)(Mn, {
															data: Ca,
															valueFormatter: (e) => `${e.toFixed(0)}分`,
															percentMode: !0
														})
													}),
													/* @__PURE__ */ (0, b.jsx)(R, {
														title: "资产抗风险结构",
														summary: "账户 / 应急 / 负债",
														children: /* @__PURE__ */ (0, b.jsx)(An, {
															data: Pi,
															centerLabel: "覆盖",
															centerValue: `${V.emergencyCoverage.toFixed(1)}月`
														})
													}),
													/* @__PURE__ */ (0, b.jsx)(R, {
														title: "风险矩阵",
														summary: "影响 × 紧迫",
														children: /* @__PURE__ */ (0, b.jsx)(zn, { data: wa })
													})
												]
											})
										})
									}),
									i === "future" && /* @__PURE__ */ (0, b.jsx)(sn, {
										title: "数据能力",
										desc: "债务、保险、数据质量、规则引擎先放结构，等后续数据补齐再激活。",
										children: /* @__PURE__ */ (0, b.jsx)(on, {
											data: /* @__PURE__ */ (0, b.jsx)(kn, {
												capabilities: je,
												updateCapability: ai
											}),
											charts: /* @__PURE__ */ (0, b.jsxs)("div", {
												className: "chart-grid two",
												children: [/* @__PURE__ */ (0, b.jsx)(R, {
													title: "能力成熟度",
													summary: "未来模块占位评分",
													children: /* @__PURE__ */ (0, b.jsx)(Mn, {
														data: Ta,
														valueFormatter: (e) => `${e.toFixed(0)}分`,
														percentMode: !0
													})
												}), /* @__PURE__ */ (0, b.jsx)(R, {
													title: "规则覆盖路线",
													summary: "自动分类 / 校验 / 提醒",
													children: /* @__PURE__ */ (0, b.jsx)(Fn, {
														data: Ta,
														valueFormatter: (e) => `${e.toFixed(0)}分`
													})
												})]
											})
										})
									})
								]
							}, i))]
						})
					]
				})
			]
		})]
	});
}
function an(e, t, n, r) {
	return t === "USD" ? e * n : t === "HKD" ? e * r : e;
}
function on({ data: e, charts: t }) {
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
function sn({ title: e, desc: t, children: n }) {
	return /* @__PURE__ */ (0, b.jsxs)(b.Fragment, { children: [/* @__PURE__ */ (0, b.jsx)("div", {
		className: "section-title",
		children: /* @__PURE__ */ (0, b.jsxs)("div", { children: [/* @__PURE__ */ (0, b.jsx)("h2", { children: e }), /* @__PURE__ */ (0, b.jsx)("p", { children: t })] })
	}), /* @__PURE__ */ (0, b.jsx)("div", {
		className: "module-body",
		children: n
	})] });
}
function L({ label: e, value: t }) {
	return /* @__PURE__ */ (0, b.jsxs)("article", {
		className: "stat-card",
		children: [/* @__PURE__ */ (0, b.jsx)("span", { children: e }), /* @__PURE__ */ (0, b.jsx)("strong", { children: t })]
	});
}
function cn({ records: e, selectedMonth: t, onAddMonth: n, onChange: r, onDeleteSelectedMonth: i }) {
	return /* @__PURE__ */ (0, b.jsxs)("div", {
		className: "month-selector-shell",
		children: [/* @__PURE__ */ (0, b.jsx)("div", {
			className: "month-selector",
			"aria-label": "月份切换",
			children: e.map((e) => /* @__PURE__ */ (0, b.jsxs)("button", {
				className: e.id === t ? "active" : "",
				type: "button",
				onClick: () => r(e.id),
				children: [/* @__PURE__ */ (0, b.jsx)("strong", { children: bt(e.label) }), /* @__PURE__ */ (0, b.jsx)("span", { children: e.id === t ? "当前" : "切换" })]
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
function R({ title: e, summary: t, children: n, className: r = "" }) {
	return /* @__PURE__ */ (0, b.jsxs)("article", {
		className: `chart-panel ${r}`.trim(),
		children: [/* @__PURE__ */ (0, b.jsxs)("div", {
			className: "chart-head",
			children: [/* @__PURE__ */ (0, b.jsx)("strong", { children: e }), /* @__PURE__ */ (0, b.jsx)("span", { children: t })]
		}), n]
	});
}
function z({ value: e, onChange: t, min: n = 0, max: r, step: i = 100, ariaLabel: a }) {
	return /* @__PURE__ */ (0, b.jsx)("input", {
		"aria-label": a,
		className: "table-input",
		inputMode: "decimal",
		max: r,
		min: n,
		step: i,
		type: "number",
		value: Number.isFinite(e) ? e : 0,
		onChange: (e) => t(_t(e.target.value))
	});
}
function B({ value: e, onChange: t, ariaLabel: n, placeholder: r }) {
	return /* @__PURE__ */ (0, b.jsx)("input", {
		"aria-label": n,
		className: "table-input text",
		placeholder: r,
		type: "text",
		value: e,
		onChange: (e) => t(e.target.value)
	});
}
function ln({ value: e, onChange: t, ariaLabel: n }) {
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
function un({ value: e, options: t, onChange: n, ariaLabel: r }) {
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
function dn({ checked: e, onChange: t, ariaLabel: n }) {
	return /* @__PURE__ */ (0, b.jsx)("input", {
		"aria-label": n,
		checked: e,
		className: "table-check",
		type: "checkbox",
		onChange: (e) => t(e.target.checked)
	});
}
function fn({ title: e, meta: t, action: n }) {
	return /* @__PURE__ */ (0, b.jsxs)("div", {
		className: "table-toolbar",
		children: [/* @__PURE__ */ (0, b.jsxs)("div", { children: [/* @__PURE__ */ (0, b.jsx)("strong", { children: e }), /* @__PURE__ */ (0, b.jsx)("span", { children: t })] }), n]
	});
}
function pn({ records: e, selectedMonth: t, onSelect: n, addMonthRecord: r, deleteMonthRecord: i, updateMonthRecord: a }) {
	let o = e.find((e) => e.id === t) ?? e[0];
	return /* @__PURE__ */ (0, b.jsxs)(b.Fragment, { children: [/* @__PURE__ */ (0, b.jsx)(fn, {
		title: "月度收入底表",
		meta: `${e.length} 个月 / 当前 ${o.label} / 实际收入 ${F(Ct(o))}`,
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
					/* @__PURE__ */ (0, b.jsx)("td", { children: /* @__PURE__ */ (0, b.jsx)(z, {
						ariaLabel: `${r.label} 工资`,
						value: r.salary,
						onChange: (e) => a(r.id, { salary: e })
					}) }),
					/* @__PURE__ */ (0, b.jsx)("td", { children: /* @__PURE__ */ (0, b.jsx)(z, {
						ariaLabel: `${r.label} 到账日`,
						max: 31,
						min: 1,
						step: 1,
						value: r.payday,
						onChange: (e) => a(r.id, { payday: e })
					}) }),
					/* @__PURE__ */ (0, b.jsx)("td", { children: /* @__PURE__ */ (0, b.jsx)(z, {
						ariaLabel: `${r.label} 炒股月结`,
						value: r.stockIncome,
						onChange: (e) => a(r.id, { stockIncome: e })
					}) }),
					/* @__PURE__ */ (0, b.jsx)("td", { children: /* @__PURE__ */ (0, b.jsx)(z, {
						ariaLabel: `${r.label} 其他收入`,
						value: r.otherIncome,
						onChange: (e) => a(r.id, { otherIncome: e })
					}) }),
					/* @__PURE__ */ (0, b.jsx)("td", {
						className: "calculated-cell",
						children: F(Ct(r))
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
function mn({ settings: e, cloudPassphrase: t, cloudStatus: n, cloudSyncing: r, updateCloudSyncSettings: i, setCloudPassphrase: a, uploadCloudSync: o, downloadCloudSync: s, clearCloudSyncSettings: c }) {
	return /* @__PURE__ */ (0, b.jsxs)(b.Fragment, { children: [/* @__PURE__ */ (0, b.jsx)(fn, {
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
function hn({ archives: e, currentArchive: t, selectedMonth: n, saveMonthlyArchive: r, deleteMonthlyArchive: i, onSelectMonth: a }) {
	let o = [...e].sort((e, t) => t.monthId.localeCompare(e.monthId) || t.savedAt.localeCompare(e.savedAt)), s = e.find((e) => e.monthId === n), c = qt(e, n), l = c ? t.income - c.income : 0, u = c ? t.spending - c.spending : 0, d = c ? t.accountTotal - c.accountTotal : 0, f = c ? t.netWorth - c.netWorth : 0;
	return /* @__PURE__ */ (0, b.jsxs)(b.Fragment, { children: [
		/* @__PURE__ */ (0, b.jsx)(fn, {
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
						/* @__PURE__ */ (0, b.jsx)("strong", { children: F(t.income) }),
						/* @__PURE__ */ (0, b.jsx)("em", {
							className: c ? Gt(l) : "",
							children: c ? Wt(l) : "等待上月月报"
						})
					]
				}),
				/* @__PURE__ */ (0, b.jsxs)("div", {
					className: "archive-current-metric",
					children: [
						/* @__PURE__ */ (0, b.jsx)("span", { children: "当前支出" }),
						/* @__PURE__ */ (0, b.jsx)("strong", { children: F(t.spending) }),
						/* @__PURE__ */ (0, b.jsx)("em", { children: c ? Wt(u) : "等待上月月报" })
					]
				}),
				/* @__PURE__ */ (0, b.jsxs)("div", {
					className: "archive-current-metric",
					children: [
						/* @__PURE__ */ (0, b.jsx)("span", { children: "账户余额" }),
						/* @__PURE__ */ (0, b.jsx)("strong", { children: F(t.accountTotal) }),
						/* @__PURE__ */ (0, b.jsx)("em", {
							className: c ? Gt(d) : "",
							children: c ? Wt(d) : "等待上月月报"
						})
					]
				}),
				/* @__PURE__ */ (0, b.jsxs)("div", {
					className: "archive-current-metric",
					children: [
						/* @__PURE__ */ (0, b.jsx)("span", { children: "净资产" }),
						/* @__PURE__ */ (0, b.jsx)("strong", { children: F(t.netWorth) }),
						/* @__PURE__ */ (0, b.jsx)("em", {
							className: c ? Gt(f) : "",
							children: c ? Wt(f) : "等待上月月报"
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
					let r = qt(e, t.monthId), o = r ? t.income - r.income : 0, s = r ? t.spending - r.spending : 0, c = r ? t.accountTotal - r.accountTotal : 0, l = r ? t.netWorth - r.netWorth : 0;
					return /* @__PURE__ */ (0, b.jsxs)("tr", {
						className: t.monthId === n ? "selected-row" : "",
						children: [
							/* @__PURE__ */ (0, b.jsx)("td", { children: /* @__PURE__ */ (0, b.jsx)("button", {
								className: "row-select-button",
								type: "button",
								onClick: () => a(t.monthId),
								children: t.label
							}) }),
							/* @__PURE__ */ (0, b.jsx)("td", { children: Ut(t.savedAt) }),
							/* @__PURE__ */ (0, b.jsx)("td", {
								className: "calculated-cell",
								children: F(t.income)
							}),
							/* @__PURE__ */ (0, b.jsx)("td", {
								className: "calculated-cell",
								children: F(t.spending)
							}),
							/* @__PURE__ */ (0, b.jsx)("td", {
								className: "calculated-cell",
								children: F(t.allocation)
							}),
							/* @__PURE__ */ (0, b.jsx)("td", {
								className: Gt(t.surplus),
								children: F(t.surplus)
							}),
							/* @__PURE__ */ (0, b.jsx)("td", {
								className: "calculated-cell",
								children: F(t.accountTotal)
							}),
							/* @__PURE__ */ (0, b.jsx)("td", {
								className: "calculated-cell",
								children: F(t.netWorth)
							}),
							/* @__PURE__ */ (0, b.jsx)("td", { children: r ? /* @__PURE__ */ (0, b.jsxs)("div", {
								className: "archive-change-stack",
								children: [
									/* @__PURE__ */ (0, b.jsxs)("span", {
										className: Gt(o),
										children: ["收入 ", Wt(o)]
									}),
									/* @__PURE__ */ (0, b.jsxs)("span", { children: ["支出 ", Wt(s)] }),
									/* @__PURE__ */ (0, b.jsxs)("span", {
										className: Gt(c),
										children: ["账户 ", Wt(c)]
									}),
									/* @__PURE__ */ (0, b.jsxs)("span", {
										className: Gt(l),
										children: ["净资产 ", Wt(l)]
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
function gn({ currentArchive: e, previousArchive: t }) {
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
	return /* @__PURE__ */ (0, b.jsxs)(b.Fragment, { children: [/* @__PURE__ */ (0, b.jsx)(fn, {
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
					children: F(e.previousBalance)
				}),
				/* @__PURE__ */ (0, b.jsx)("td", {
					className: "calculated-cell",
					children: F(e.currentBalance)
				}),
				/* @__PURE__ */ (0, b.jsx)("td", {
					className: Gt(e.delta),
					children: Wt(e.delta)
				}),
				/* @__PURE__ */ (0, b.jsx)("td", { children: /* @__PURE__ */ (0, b.jsx)("span", {
					className: e.status === "持平" ? "pill" : "pill good",
					children: e.status
				}) })
			] }, e.id))] })]
		})
	})] });
}
function _n({ accountTotal: e, addCashflowCustomItem: t, monthlyInflow: n, monthlyOutflow: r, rows: i }) {
	return /* @__PURE__ */ (0, b.jsxs)(b.Fragment, { children: [/* @__PURE__ */ (0, b.jsx)(fn, {
		title: "现金流参数底表",
		meta: `月流入 ${F(n)} / 月流出 ${F(r)} / 期初现金 ${F(e)}`,
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
				/* @__PURE__ */ (0, b.jsx)("td", { children: e.onNameChange ? /* @__PURE__ */ (0, b.jsx)(B, {
					ariaLabel: `${e.name} 项目`,
					value: e.name,
					onChange: e.onNameChange
				}) : e.name }),
				/* @__PURE__ */ (0, b.jsx)("td", { children: e.readonlyAmount || !e.onAmountChange ? /* @__PURE__ */ (0, b.jsx)("span", {
					className: "calculated-cell",
					children: F(e.amount)
				}) : /* @__PURE__ */ (0, b.jsx)(z, {
					ariaLabel: `${e.name} 数值`,
					value: e.amount,
					onChange: e.onAmountChange
				}) }),
				/* @__PURE__ */ (0, b.jsx)("td", { children: e.onDirectionChange ? /* @__PURE__ */ (0, b.jsx)(un, {
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
function vn({ accounts: e, total: t, liquidAccountTotal: n, updateAccount: r, addAccount: i, deleteAccount: a, reorderAccount: o }) {
	let [s, c] = (0, _.useState)(null);
	return /* @__PURE__ */ (0, b.jsxs)(b.Fragment, { children: [/* @__PURE__ */ (0, b.jsx)(fn, {
		title: "账户底表",
		meta: `${e.length} 个账户 / 合计 ${F(t)} / 可动用 ${F(n)}`,
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
				/* @__PURE__ */ (0, b.jsx)("th", { children: "可动用" }),
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
					/* @__PURE__ */ (0, b.jsx)("td", { children: /* @__PURE__ */ (0, b.jsx)(B, {
						ariaLabel: `${t.name} 账户名称`,
						value: t.name,
						onChange: (e) => r(t.id, { name: e })
					}) }),
					/* @__PURE__ */ (0, b.jsx)("td", { children: /* @__PURE__ */ (0, b.jsx)(B, {
						ariaLabel: `${t.name} 类型`,
						value: t.type,
						onChange: (e) => r(t.id, { type: e })
					}) }),
					/* @__PURE__ */ (0, b.jsx)("td", { children: /* @__PURE__ */ (0, b.jsx)(z, {
						ariaLabel: `${t.name} 余额`,
						value: t.balance,
						onChange: (e) => r(t.id, { balance: e })
					}) }),
					/* @__PURE__ */ (0, b.jsx)("td", { children: /* @__PURE__ */ (0, b.jsx)(B, {
						ariaLabel: `${t.name} 用途`,
						value: t.purpose,
						onChange: (e) => r(t.id, { purpose: e })
					}) }),
					/* @__PURE__ */ (0, b.jsx)("td", { children: /* @__PURE__ */ (0, b.jsx)(dn, {
						ariaLabel: `${t.name} 可动用`,
						checked: t.liquid,
						onChange: (e) => r(t.id, { liquid: e })
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
function yn({ holdings: e, fxUsd: t, fxHkd: n, updateHolding: r, addHolding: i, deleteHolding: a }) {
	let o = e.reduce((e, r) => e + an(r.value, r.currency, t, n), 0);
	return /* @__PURE__ */ (0, b.jsxs)(b.Fragment, { children: [/* @__PURE__ */ (0, b.jsx)(fn, {
		title: "投资持仓底表",
		meta: `持仓 ${e.length} 项 / 市值 ${F(o)}`,
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
				let o = an(i.value, i.currency, t, n), s = an(i.cost, i.currency, t, n);
				return /* @__PURE__ */ (0, b.jsxs)("tr", { children: [
					/* @__PURE__ */ (0, b.jsx)("td", { children: /* @__PURE__ */ (0, b.jsx)(B, {
						ariaLabel: `${i.name} 名称`,
						value: i.name,
						onChange: (e) => r(i.id, { name: e })
					}) }),
					/* @__PURE__ */ (0, b.jsx)("td", { children: /* @__PURE__ */ (0, b.jsx)(un, {
						ariaLabel: `${i.name} 市场`,
						options: [
							"A股",
							"美股",
							"港股"
						],
						value: i.market,
						onChange: (e) => r(i.id, { market: e })
					}) }),
					/* @__PURE__ */ (0, b.jsx)("td", { children: /* @__PURE__ */ (0, b.jsx)(un, {
						ariaLabel: `${i.name} 币种`,
						options: [
							"CNY",
							"USD",
							"HKD"
						],
						value: i.currency,
						onChange: (e) => r(i.id, { currency: e })
					}) }),
					/* @__PURE__ */ (0, b.jsx)("td", { children: /* @__PURE__ */ (0, b.jsx)(z, {
						ariaLabel: `${i.name} 成本`,
						value: i.cost,
						onChange: (e) => r(i.id, { cost: e })
					}) }),
					/* @__PURE__ */ (0, b.jsx)("td", { children: /* @__PURE__ */ (0, b.jsx)(z, {
						ariaLabel: `${i.name} 当前市值`,
						value: i.value,
						onChange: (e) => r(i.id, { value: e })
					}) }),
					/* @__PURE__ */ (0, b.jsx)("td", {
						className: "calculated-cell",
						children: F(o)
					}),
					/* @__PURE__ */ (0, b.jsx)("td", {
						className: o >= s ? "positive" : "negative",
						children: F(o - s)
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
function bn({ balanceAssets: e, totalAssets: t, updateBalanceAsset: n, addBalanceAsset: r, deleteBalanceAsset: i }) {
	let a = e.reduce((e, t) => e + t.amount, 0);
	return /* @__PURE__ */ (0, b.jsxs)(b.Fragment, { children: [/* @__PURE__ */ (0, b.jsx)(fn, {
		title: "资产底表",
		meta: `${e.length} 项 / 补录资产 ${F(a)} / 总资产 ${F(t)}`,
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
				/* @__PURE__ */ (0, b.jsx)("td", { children: /* @__PURE__ */ (0, b.jsx)(B, {
					ariaLabel: `${r.name} 资产项`,
					value: r.name,
					onChange: (e) => n(r.id, { name: e })
				}) }),
				/* @__PURE__ */ (0, b.jsx)("td", { children: /* @__PURE__ */ (0, b.jsx)(z, {
					ariaLabel: `${r.name} 资产金额`,
					value: r.amount,
					onChange: (e) => n(r.id, { amount: e })
				}) }),
				/* @__PURE__ */ (0, b.jsx)("td", { children: /* @__PURE__ */ (0, b.jsx)(B, {
					ariaLabel: `${r.name} 资产说明`,
					value: r.note,
					onChange: (e) => n(r.id, { note: e })
				}) }),
				/* @__PURE__ */ (0, b.jsx)("td", {
					className: "calculated-cell",
					children: vt(t ? r.amount / t : 0)
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
function xn({ liabilities: e, updateLiability: t, addLiability: n, deleteLiability: r }) {
	let i = e.reduce((e, t) => e + t.amount, 0);
	return /* @__PURE__ */ (0, b.jsxs)(b.Fragment, { children: [/* @__PURE__ */ (0, b.jsx)(fn, {
		title: "负债底表",
		meta: `${e.length} 项 / 总负债 ${F(i)}`,
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
				/* @__PURE__ */ (0, b.jsx)("td", { children: /* @__PURE__ */ (0, b.jsx)(B, {
					ariaLabel: `${n.name} 负债项`,
					value: n.name,
					onChange: (e) => t(n.id, { name: e })
				}) }),
				/* @__PURE__ */ (0, b.jsx)("td", { children: /* @__PURE__ */ (0, b.jsx)(z, {
					ariaLabel: `${n.name} 金额`,
					value: n.amount,
					onChange: (e) => t(n.id, { amount: e })
				}) }),
				/* @__PURE__ */ (0, b.jsx)("td", {
					className: "calculated-cell",
					children: vt(i ? n.amount / i : 0)
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
function Sn({ emergencyFund: e, setEmergencyFund: t, emergencyMonths: n, setEmergencyMonths: r, emergencyMonthlyNeed: i, setEmergencyMonthlyNeed: a }) {
	let o = i * n;
	return /* @__PURE__ */ (0, b.jsxs)(b.Fragment, { children: [/* @__PURE__ */ (0, b.jsx)(fn, {
		title: "应急金底表",
		meta: `目标 ${F(o)} / 当前 ${F(e)}`
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
					/* @__PURE__ */ (0, b.jsx)("td", { children: /* @__PURE__ */ (0, b.jsx)(z, {
						ariaLabel: "当前应急金",
						value: e,
						onChange: t
					}) }),
					/* @__PURE__ */ (0, b.jsxs)("td", {
						className: "calculated-cell",
						children: [
							"覆盖 ",
							i ? (e / i).toFixed(1) : "0.0",
							" 月"
						]
					})
				] }),
				/* @__PURE__ */ (0, b.jsxs)("tr", { children: [
					/* @__PURE__ */ (0, b.jsx)("td", { children: "目标覆盖月数" }),
					/* @__PURE__ */ (0, b.jsx)("td", { children: /* @__PURE__ */ (0, b.jsx)(z, {
						ariaLabel: "目标覆盖月数",
						step: 1,
						value: n,
						onChange: r
					}) }),
					/* @__PURE__ */ (0, b.jsxs)("td", {
						className: "calculated-cell",
						children: [n, " 个月"]
					})
				] }),
				/* @__PURE__ */ (0, b.jsxs)("tr", { children: [
					/* @__PURE__ */ (0, b.jsx)("td", { children: "月均必要支出" }),
					/* @__PURE__ */ (0, b.jsx)("td", { children: /* @__PURE__ */ (0, b.jsx)(z, {
						ariaLabel: "月均必要支出",
						value: i,
						onChange: a
					}) }),
					/* @__PURE__ */ (0, b.jsxs)("td", {
						className: "calculated-cell",
						children: ["缺口 ", F(Math.max(0, o - e))]
					})
				] })
			] })]
		})
	})] });
}
function Cn({ reminders: e, updateReminder: t, addReminder: n, deleteReminder: r }) {
	let i = e.reduce((e, t) => e + t.amount, 0);
	return /* @__PURE__ */ (0, b.jsxs)(b.Fragment, { children: [/* @__PURE__ */ (0, b.jsx)(fn, {
		title: "提醒底表",
		meta: `${e.length} 条 / 金额 ${F(i)}`,
		action: /* @__PURE__ */ (0, b.jsx)("button", {
			className: "secondary-button",
			type: "button",
			onClick: n,
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
			] }) }), /* @__PURE__ */ (0, b.jsx)("tbody", { children: e.map((n) => /* @__PURE__ */ (0, b.jsxs)("tr", { children: [
				/* @__PURE__ */ (0, b.jsx)("td", { children: /* @__PURE__ */ (0, b.jsx)(B, {
					ariaLabel: `${n.name} 事项`,
					value: n.name,
					onChange: (e) => t(n.id, { name: e })
				}) }),
				/* @__PURE__ */ (0, b.jsx)("td", { children: /* @__PURE__ */ (0, b.jsx)(ln, {
					ariaLabel: `${n.name} 日期`,
					value: n.date,
					onChange: (e) => t(n.id, { date: e })
				}) }),
				/* @__PURE__ */ (0, b.jsx)("td", { children: /* @__PURE__ */ (0, b.jsx)(z, {
					ariaLabel: `${n.name} 金额`,
					value: n.amount,
					onChange: (e) => t(n.id, { amount: e })
				}) }),
				/* @__PURE__ */ (0, b.jsx)("td", { children: /* @__PURE__ */ (0, b.jsx)(B, {
					ariaLabel: `${n.name} 类型`,
					value: n.kind,
					onChange: (e) => t(n.id, { kind: e })
				}) }),
				/* @__PURE__ */ (0, b.jsxs)("td", {
					className: "calculated-cell",
					children: [Math.max(0, Vt(n.date)), " 天"]
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
function wn({ goals: e, updateGoal: t, addGoal: n, deleteGoal: r }) {
	let i = e.reduce((e, t) => e + t.target, 0), a = e.reduce((e, t) => e + t.current, 0), o = e.reduce((e, t) => e + t.actualMonthly, 0);
	return /* @__PURE__ */ (0, b.jsxs)(b.Fragment, { children: [/* @__PURE__ */ (0, b.jsx)(fn, {
		title: "目标底表",
		meta: `当前 ${F(a)} / 目标 ${F(i)} / 本月实际投入 ${F(o)}`,
		action: /* @__PURE__ */ (0, b.jsx)("button", {
			className: "secondary-button",
			type: "button",
			onClick: n,
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
			] }) }), /* @__PURE__ */ (0, b.jsx)("tbody", { children: e.map((n) => /* @__PURE__ */ (0, b.jsxs)("tr", { children: [
				/* @__PURE__ */ (0, b.jsx)("td", { children: /* @__PURE__ */ (0, b.jsx)(B, {
					ariaLabel: `${n.name} 名称`,
					value: n.name,
					onChange: (e) => t(n.id, { name: e })
				}) }),
				/* @__PURE__ */ (0, b.jsx)("td", { children: /* @__PURE__ */ (0, b.jsx)(z, {
					ariaLabel: `${n.name} 目标金额`,
					value: n.target,
					onChange: (e) => t(n.id, { target: e })
				}) }),
				/* @__PURE__ */ (0, b.jsx)("td", { children: /* @__PURE__ */ (0, b.jsx)(z, {
					ariaLabel: `${n.name} 当前金额`,
					value: n.current,
					onChange: (e) => t(n.id, { current: e })
				}) }),
				/* @__PURE__ */ (0, b.jsx)("td", { children: /* @__PURE__ */ (0, b.jsx)(z, {
					ariaLabel: `${n.name} 每月预期准备`,
					value: n.monthly,
					onChange: (e) => t(n.id, { monthly: e })
				}) }),
				/* @__PURE__ */ (0, b.jsx)("td", { children: /* @__PURE__ */ (0, b.jsx)(z, {
					ariaLabel: `${n.name} 本月实际投入`,
					value: n.actualMonthly,
					onChange: (e) => t(n.id, { actualMonthly: e })
				}) }),
				/* @__PURE__ */ (0, b.jsx)("td", {
					className: "calculated-cell",
					children: vt(n.target ? n.current / n.target : 0)
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
function Tn({ buckets: e, updateFundBucket: t, addFundBucket: n, deleteFundBucket: r, investmentReserve: i, liquidAfterBuckets: a, monthlyNeed: o }) {
	let s = e.reduce((e, t) => e + t.target, 0), c = e.reduce((e, t) => e + t.current, 0);
	return /* @__PURE__ */ (0, b.jsxs)(b.Fragment, { children: [
		/* @__PURE__ */ (0, b.jsx)(fn, {
			title: "大花费项目底表",
			meta: `目标 ${F(s)} / 已准备 ${F(c)} / 每月还需 ${F(o)} / 项目后现金 ${F(a)}`,
			action: /* @__PURE__ */ (0, b.jsx)("button", {
				className: "secondary-button",
				type: "button",
				onClick: n,
				children: "新增大花费项目"
			})
		}),
		/* @__PURE__ */ (0, b.jsxs)("div", {
			className: "auto-bucket-row",
			children: [/* @__PURE__ */ (0, b.jsxs)("strong", { children: ["自动锁定：投资待投金 ", F(i)] }), /* @__PURE__ */ (0, b.jsx)("span", { children: "A股待投和美股待投从账户用途自动识别，不在下表重复录入。" })]
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
					/* @__PURE__ */ (0, b.jsx)("th", { children: "已准备" }),
					/* @__PURE__ */ (0, b.jsx)("th", { children: "缺口" }),
					/* @__PURE__ */ (0, b.jsx)("th", { children: "每月需补" }),
					/* @__PURE__ */ (0, b.jsx)("th", { children: "锁定" }),
					/* @__PURE__ */ (0, b.jsx)("th", { children: "备注" }),
					/* @__PURE__ */ (0, b.jsx)("th", { children: "操作" })
				] }) }), /* @__PURE__ */ (0, b.jsx)("tbody", { children: e.map((n) => /* @__PURE__ */ (0, b.jsxs)("tr", { children: [
					/* @__PURE__ */ (0, b.jsx)("td", { children: /* @__PURE__ */ (0, b.jsx)(B, {
						ariaLabel: `${n.name} 名称`,
						value: n.name,
						onChange: (e) => t(n.id, { name: e })
					}) }),
					/* @__PURE__ */ (0, b.jsx)("td", { children: /* @__PURE__ */ (0, b.jsx)(un, {
						ariaLabel: `${n.name} 类型`,
						options: rt,
						value: n.kind,
						onChange: (e) => t(n.id, { kind: e })
					}) }),
					/* @__PURE__ */ (0, b.jsx)("td", { children: /* @__PURE__ */ (0, b.jsx)(ln, {
						ariaLabel: `${n.name} 截止日期`,
						value: n.dueDate,
						onChange: (e) => t(n.id, { dueDate: e })
					}) }),
					/* @__PURE__ */ (0, b.jsx)("td", { children: /* @__PURE__ */ (0, b.jsx)(z, {
						ariaLabel: `${n.name} 目标`,
						value: n.target,
						onChange: (e) => t(n.id, { target: e })
					}) }),
					/* @__PURE__ */ (0, b.jsx)("td", { children: /* @__PURE__ */ (0, b.jsx)(z, {
						ariaLabel: `${n.name} 已准备`,
						value: n.current,
						onChange: (e) => t(n.id, { current: e })
					}) }),
					/* @__PURE__ */ (0, b.jsxs)("td", { children: [/* @__PURE__ */ (0, b.jsx)("span", {
						className: n.gap > 0 ? "negative" : "positive",
						children: F(n.gap)
					}), /* @__PURE__ */ (0, b.jsx)("span", {
						className: "table-subtext",
						children: n.status
					})] }),
					/* @__PURE__ */ (0, b.jsx)("td", {
						className: "calculated-cell",
						children: F(n.monthlyNeed)
					}),
					/* @__PURE__ */ (0, b.jsx)("td", { children: /* @__PURE__ */ (0, b.jsx)(dn, {
						ariaLabel: `${n.name} 锁定`,
						checked: n.locked,
						onChange: (e) => t(n.id, { locked: e })
					}) }),
					/* @__PURE__ */ (0, b.jsx)("td", { children: /* @__PURE__ */ (0, b.jsx)(B, {
						ariaLabel: `${n.name} 备注`,
						value: n.note,
						onChange: (e) => t(n.id, { note: e })
					}) }),
					/* @__PURE__ */ (0, b.jsx)("td", { children: /* @__PURE__ */ (0, b.jsx)("button", {
						className: "danger-button compact",
						disabled: e.length <= 1,
						type: "button",
						onClick: () => r(n.id),
						children: "删除"
					}) })
				] }, n.id)) })]
			})
		})
	] });
}
function En({ sections: e, reportText: t, copyStatus: n, onCopy: r }) {
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
function Dn({ rows: e, income: t, spending: n, allocation: r, surplus: i }) {
	return /* @__PURE__ */ (0, b.jsxs)(b.Fragment, { children: [/* @__PURE__ */ (0, b.jsx)(fn, {
		title: "报表自动同步表",
		meta: `收入 ${F(t)} / 支出 ${F(n)} / 分配 ${F(r)} / 余额 ${F(i)}`
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
						children: F(e.amount)
					}) }),
					/* @__PURE__ */ (0, b.jsx)("td", { children: /* @__PURE__ */ (0, b.jsx)("span", {
						className: r,
						children: yt(n)
					}) }),
					/* @__PURE__ */ (0, b.jsx)("td", { children: e.flow }),
					/* @__PURE__ */ (0, b.jsx)("td", { children: e.source })
				] }, e.id);
			}) })]
		})
	})] });
}
function On({ emergencyMonths: e, setEmergencyMonths: t, emergencyMonthlyNeed: n, setEmergencyMonthlyNeed: r, liabilities: i, updateLiability: a, addLiability: o, deleteLiability: s }) {
	return /* @__PURE__ */ (0, b.jsxs)(b.Fragment, { children: [/* @__PURE__ */ (0, b.jsx)(fn, {
		title: "健康评分输入底表",
		meta: `目标覆盖 ${e} 月 / 负债 ${F(i.reduce((e, t) => e + t.amount, 0))}`,
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
					/* @__PURE__ */ (0, b.jsx)("td", { children: /* @__PURE__ */ (0, b.jsx)(z, {
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
					/* @__PURE__ */ (0, b.jsx)("td", { children: /* @__PURE__ */ (0, b.jsx)(z, {
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
					/* @__PURE__ */ (0, b.jsx)("td", { children: /* @__PURE__ */ (0, b.jsx)(B, {
						ariaLabel: `健康 ${e.name} 负债项`,
						value: e.name,
						onChange: (t) => a(e.id, { name: t })
					}) }),
					/* @__PURE__ */ (0, b.jsx)("td", { children: /* @__PURE__ */ (0, b.jsx)(z, {
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
function kn({ capabilities: e, updateCapability: t }) {
	return /* @__PURE__ */ (0, b.jsxs)(b.Fragment, { children: [/* @__PURE__ */ (0, b.jsx)(fn, {
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
				/* @__PURE__ */ (0, b.jsx)("td", { children: /* @__PURE__ */ (0, b.jsx)(B, {
					ariaLabel: `${e.name} 名称`,
					value: e.name,
					onChange: (n) => t(e.id, { name: n })
				}) }),
				/* @__PURE__ */ (0, b.jsx)("td", { children: /* @__PURE__ */ (0, b.jsx)(z, {
					ariaLabel: `${e.name} 成熟度`,
					max: 100,
					step: 1,
					value: e.score,
					onChange: (n) => t(e.id, { score: I(n) })
				}) }),
				/* @__PURE__ */ (0, b.jsx)("td", { children: /* @__PURE__ */ (0, b.jsx)("span", {
					className: e.score >= 70 ? "pill good" : e.score >= 40 ? "pill warn" : "pill",
					children: e.score >= 70 ? "可用" : e.score >= 40 ? "建设中" : "待补齐"
				}) })
			] }, e.id)) })]
		})
	})] });
}
function An({ data: e, centerLabel: t, centerValue: n }) {
	let r = e.filter((e) => e.value > 0), i = r.reduce((e, t) => e + t.value, 0), a = r.map((e) => i ? e.value / i * 100 : 0), o = a.map((e, t) => a.slice(0, t).reduce((e, t) => e + t, 0)), s = r.map((e, t) => {
		let n = a[t] ?? 0, r = o[t] ?? 0, i = ((r + n / 2) / 100 * 360 - 90) * (Math.PI / 180), s = Math.cos(i), c = Math.sin(i), l = s >= 0 ? "right" : "left";
		return {
			...e,
			color: e.color ?? P[t % P.length],
			share: n,
			start: r,
			anchorX: 110 + s * 36.5,
			anchorY: 66 + c * 36.5,
			elbowX: 110 + s * 45,
			elbowY: 66 + c * 45,
			labelX: l === "right" ? 174 : 46,
			lineEndX: l === "right" ? 164 : 56,
			side: l,
			y: I(66 + c * 53, 18, 114)
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
		detail: e.detail?.includes("%") ? e.detail : `${vt(e.value / Math.max(i, 1))} / ${F(e.value)}${e.detail ? ` / ${e.detail}` : ""}`
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
						/* @__PURE__ */ (0, b.jsx)("title", { children: `${e.label} ${vt(e.value / Math.max(i, 1))}` }),
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
		}), /* @__PURE__ */ (0, b.jsx)(jn, {
			data: u,
			valueFormatter: F
		})]
	});
}
function jn({ data: e, valueFormatter: t }) {
	return /* @__PURE__ */ (0, b.jsx)("div", {
		className: "legend",
		children: e.map((e, n) => /* @__PURE__ */ (0, b.jsxs)("div", {
			className: "legend-item",
			children: [/* @__PURE__ */ (0, b.jsx)("span", {
				className: "legend-dot",
				style: { backgroundColor: e.color ?? P[n % P.length] }
			}), /* @__PURE__ */ (0, b.jsxs)("div", {
				className: "legend-copy",
				children: [/* @__PURE__ */ (0, b.jsx)("strong", { children: e.label }), /* @__PURE__ */ (0, b.jsx)("em", { children: e.detail ?? t(e.value) })]
			})]
		}, e.label))
	});
}
function Mn({ data: e, valueFormatter: t, percentMode: n = !1 }) {
	let r = Math.max(...e.map((e) => e.max ?? e.value), n ? 100 : 1);
	return /* @__PURE__ */ (0, b.jsx)("div", {
		className: "horizontal-bars",
		children: e.map((e, n) => {
			let i = e.max ?? r, a = I(e.value / Math.max(i, 1) * 100);
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
							backgroundColor: e.color ?? P[n % P.length]
						}
					})
				})]
			}, e.label);
		})
	});
}
function Nn({ data: e, valueFormatter: t }) {
	let n = Math.max(...e.map((e) => e.value), 1);
	return /* @__PURE__ */ (0, b.jsx)("div", {
		className: "vertical-bars",
		children: e.map((e, r) => {
			let i = I(e.value / n * 100, 4, 100);
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
								backgroundColor: e.color ?? P[r % P.length]
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
function Pn({ data: e, valueFormatter: t }) {
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
function Fn({ data: e, valueFormatter: t }) {
	let n = e.filter((e) => e.value > 0), r = n.reduce((e, t) => e + t.value, 0);
	return /* @__PURE__ */ (0, b.jsxs)("div", {
		className: "stacked-wrap",
		children: [/* @__PURE__ */ (0, b.jsx)("div", {
			className: "stacked-bar",
			"aria-label": `合计 ${t(r)}`,
			children: n.length ? n.map((e, n) => /* @__PURE__ */ (0, b.jsx)("span", {
				style: {
					width: `${e.value / Math.max(r, 1) * 100}%`,
					backgroundColor: e.color ?? P[n % P.length]
				},
				title: `${e.label} ${t(e.value)}`
			}, e.label)) : /* @__PURE__ */ (0, b.jsx)("span", { style: {
				width: "100%",
				backgroundColor: "#d8e2ee"
			} })
		}), /* @__PURE__ */ (0, b.jsx)(jn, {
			data: n.length ? n : [{
				label: "暂无数据",
				value: 0,
				color: "#b8c4d4"
			}],
			valueFormatter: t
		})]
	});
}
function In({ data: e, valueFormatter: t }) {
	return /* @__PURE__ */ (0, b.jsx)("div", {
		className: "progress-list",
		children: e.map((e, n) => {
			let r = I(e.value / Math.max(e.max ?? e.value, 1) * 100);
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
								backgroundColor: e.color ?? P[n % P.length]
							}
						})
					}),
					e.detail && /* @__PURE__ */ (0, b.jsx)("em", { children: e.detail })
				]
			}, e.label);
		})
	});
}
function Ln({ events: e }) {
	return /* @__PURE__ */ (0, b.jsx)("div", {
		className: "cashflow-calendar",
		children: e.map((e) => /* @__PURE__ */ (0, b.jsxs)("article", {
			className: "calendar-event",
			children: [
				/* @__PURE__ */ (0, b.jsx)("span", { children: e.date.slice(5) }),
				/* @__PURE__ */ (0, b.jsx)("strong", { children: e.item }),
				/* @__PURE__ */ (0, b.jsxs)("div", { children: [e.inflow > 0 && /* @__PURE__ */ (0, b.jsxs)("em", {
					className: "positive",
					children: ["+", F(e.inflow)]
				}), e.outflow > 0 && /* @__PURE__ */ (0, b.jsxs)("em", {
					className: "negative",
					children: ["-", F(e.outflow)]
				})] }),
				/* @__PURE__ */ (0, b.jsxs)("small", { children: ["余额 ", F(e.balance)] })
			]
		}, `${e.date}-${e.item}`))
	});
}
function Rn({ data: e }) {
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
					fill: e.color ?? (e.value >= 0 ? P[1] : P[4]),
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
			children: [/* @__PURE__ */ (0, b.jsxs)("span", { children: ["流入 ", F(e.filter((e) => e.value > 0 && e.kind !== "start" && e.kind !== "end").reduce((e, t) => e + t.value, 0))] }), /* @__PURE__ */ (0, b.jsxs)("span", { children: ["流出 ", F(Math.abs(e.filter((e) => e.value < 0 && e.kind !== "start" && e.kind !== "end").reduce((e, t) => e + t.value, 0)))] })]
		})]
	});
}
function zn({ data: e }) {
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
					let t = 56 + I(e.x) / 100 * 248, n = 304 - I(e.y) / 100 * 248;
					return /* @__PURE__ */ (0, b.jsxs)("g", { children: [/* @__PURE__ */ (0, b.jsx)("circle", {
						cx: t,
						cy: n,
						fill: e.color ?? P[0],
						r: "8"
					}), /* @__PURE__ */ (0, b.jsx)("text", {
						className: "matrix-point-label",
						x: t,
						y: n - 13,
						children: e.label
					})] }, e.label);
				})
			]
		}), /* @__PURE__ */ (0, b.jsx)(jn, {
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
function Bn({ data: e, source: t, valueFormatter: n }) {
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
						width: `${I(e.value / r * 100, 4, 100)}%`,
						backgroundColor: e.color ?? P[t % P.length]
					} }),
					/* @__PURE__ */ (0, b.jsx)("strong", { children: e.label }),
					/* @__PURE__ */ (0, b.jsx)("em", { children: n(e.value) })
				]
			}, e.label))
		})]
	});
}
function Vn({ data: e, xLabel: t, yLabel: n }) {
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
					let t = 28 + I(e.x) / 100 * 164, n = 192 - I(e.y) / 100 * 164;
					return /* @__PURE__ */ (0, b.jsxs)("g", { children: [/* @__PURE__ */ (0, b.jsx)("circle", {
						cx: t,
						cy: n,
						fill: e.color ?? P[0],
						r: "7"
					}), /* @__PURE__ */ (0, b.jsx)("text", {
						className: "matrix-point-label",
						x: t,
						y: n - 10,
						children: e.label
					})] }, e.label);
				})
			]
		}), /* @__PURE__ */ (0, b.jsx)(jn, {
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
function Hn({ budgets: e, updateBudget: t, addBudget: n, deleteBudget: r, addDetailedBudgets: i }) {
	let [a, o] = (0, _.useState)(!1), s = e.reduce((e, t) => e + t.plan, 0), c = e.reduce((e, t) => e + t.actual, 0);
	return /* @__PURE__ */ (0, b.jsxs)(b.Fragment, { children: [
		/* @__PURE__ */ (0, b.jsx)(fn, {
			title: "支出细项底表",
			meta: a ? `细项参考 ${M(s)} / 已记实际 ${M(c)} / 参考差额 ${M(s - c)}` : `已记实际 ${M(c)} / ${e.length} 个细项`,
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
				] }) }), /* @__PURE__ */ (0, b.jsx)("tbody", { children: e.map((n) => /* @__PURE__ */ (0, b.jsxs)("tr", { children: [
					/* @__PURE__ */ (0, b.jsx)("td", { children: /* @__PURE__ */ (0, b.jsx)(B, {
						ariaLabel: `${n.name} 分类`,
						value: n.name,
						onChange: (e) => t(n.id, { name: e })
					}) }),
					/* @__PURE__ */ (0, b.jsx)("td", { children: /* @__PURE__ */ (0, b.jsxs)("select", {
						className: "table-input",
						"aria-label": `${n.name} 所属大类`,
						value: He(n),
						onChange: (e) => t(n.id, { group: e.target.value }),
						children: [/* @__PURE__ */ (0, b.jsx)("option", {
							value: "unassigned",
							children: "待归类"
						}), Ve.map((e) => /* @__PURE__ */ (0, b.jsx)("option", {
							value: e.id,
							children: e.name
						}, e.id))]
					}) }),
					a && /* @__PURE__ */ (0, b.jsx)("td", { children: /* @__PURE__ */ (0, b.jsx)(z, {
						ariaLabel: `${n.name} 预算`,
						value: n.plan,
						onChange: (e) => t(n.id, { plan: e })
					}) }),
					/* @__PURE__ */ (0, b.jsx)("td", { children: /* @__PURE__ */ (0, b.jsx)(z, {
						ariaLabel: `${n.name} 实际`,
						step: .01,
						min: -1e8,
						value: n.actual,
						onChange: (e) => t(n.id, { actual: e })
					}) }),
					a && /* @__PURE__ */ (0, b.jsx)("td", {
						className: "calculated-cell",
						children: M(n.plan - n.actual)
					}),
					/* @__PURE__ */ (0, b.jsx)("td", {
						className: "spending-purpose",
						children: /* @__PURE__ */ (0, b.jsx)(B, {
							ariaLabel: `${n.name} 具体用途`,
							value: n.note ?? "",
							onChange: (e) => t(n.id, { note: e })
						})
					}),
					/* @__PURE__ */ (0, b.jsx)("td", { children: /* @__PURE__ */ (0, b.jsx)(dn, {
						ariaLabel: `${n.name} 必须`,
						checked: n.required,
						onChange: (e) => t(n.id, { required: e })
					}) }),
					/* @__PURE__ */ (0, b.jsx)("td", { children: /* @__PURE__ */ (0, b.jsx)(dn, {
						ariaLabel: `${n.name} 固定`,
						checked: n.fixed,
						onChange: (e) => t(n.id, { fixed: e })
					}) }),
					/* @__PURE__ */ (0, b.jsx)("td", { children: /* @__PURE__ */ (0, b.jsx)("button", {
						className: "danger-button compact",
						disabled: e.length <= 1,
						type: "button",
						onClick: () => r(n.id),
						children: "删除"
					}) })
				] }, n.id)) })]
			})
		})
	] });
}
function Un({ budgets: e, monthLabel: t, allowance: n }) {
	let r = We(e);
	return /* @__PURE__ */ (0, b.jsxs)("section", {
		className: "learning-usage",
		"aria-label": `${t}学习用途`,
		children: [
			/* @__PURE__ */ (0, b.jsxs)("h3", { children: [t, " · 学习用途"] }),
			/* @__PURE__ */ (0, b.jsxs)("p", { children: [
				"当前方案学习额度 ",
				M(n),
				" / 已归类净支出 ",
				M(r.total),
				" / 额度减已记支出 ",
				M(n - r.total)
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
					/* @__PURE__ */ (0, b.jsx)("td", { children: M(e.actual) }),
					/* @__PURE__ */ (0, b.jsx)("td", { children: e.note?.trim() || "用途待补" })
				] }, e.id)) })] })
			}) : /* @__PURE__ */ (0, b.jsx)("p", { children: "暂无已归类的学习支出；未录入不代表本月没有花费。" }),
			r.unassigned !== 0 && /* @__PURE__ */ (0, b.jsxs)("p", {
				className: "spending-detail-note",
				children: [
					"另有 ",
					M(r.unassigned),
					" 支出尚未归类，未纳入上述学习统计。"
				]
			})
		]
	});
}
//#endregion
//#region app/static-entry.tsx
var Wn = document.getElementById("root");
Wn && (0, v.createRoot)(Wn).render(/* @__PURE__ */ (0, b.jsx)(_.StrictMode, { children: /* @__PURE__ */ (0, b.jsx)(rn, {}) }));
//#endregion
