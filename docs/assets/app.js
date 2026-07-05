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
	}, te = Object.prototype.hasOwnProperty;
	function ne(e, n, r) {
		var i = r.ref;
		return {
			$$typeof: t,
			type: e,
			key: n,
			ref: i === void 0 ? null : i,
			props: r
		};
	}
	function re(e, t) {
		return ne(e.type, t, e.props);
	}
	function ie(e) {
		return typeof e == "object" && !!e && e.$$typeof === t;
	}
	function ae(e) {
		var t = {
			"=": "=0",
			":": "=2"
		};
		return "$" + e.replace(/[=:]/g, function(e) {
			return t[e];
		});
	}
	var oe = /\/+/g;
	function se(e, t) {
		return typeof e == "object" && e && e.key != null ? ae("" + e.key) : t.toString(36);
	}
	function ce(e) {
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
	function le(e, r, i, a, o) {
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
				case d: return c = e._init, le(c(e._payload), r, i, a, o);
			}
		}
		if (c) return o = o(e), c = a === "" ? "." + se(e, 0) : a, S(o) ? (i = "", c != null && (i = c.replace(oe, "$&/") + "/"), le(o, r, i, "", function(e) {
			return e;
		})) : o != null && (ie(o) && (o = re(o, i + (o.key == null || e && e.key === o.key ? "" : ("" + o.key).replace(oe, "$&/") + "/") + c)), r.push(o)), 1;
		c = 0;
		var l = a === "" ? "." : a + ":";
		if (S(e)) for (var u = 0; u < e.length; u++) a = e[u], s = l + se(a, u), c += le(a, r, i, s, o);
		else if (u = m(e), typeof u == "function") for (e = u.call(e), u = 0; !(a = e.next()).done;) a = a.value, s = l + se(a, u++), c += le(a, r, i, s, o);
		else if (s === "object") {
			if (typeof e.then == "function") return le(ce(e), r, i, a, o);
			throw r = String(e), Error("Objects are not valid as a React child (found: " + (r === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : r) + "). If you meant to render a collection of children, use an array instead.");
		}
		return c;
	}
	function ue(e, t, n) {
		if (e == null) return e;
		var r = [], i = 0;
		return le(e, r, "", "", function(e) {
			return t.call(n, e, i++);
		}), r;
	}
	function de(e) {
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
	var w = typeof reportError == "function" ? reportError : function(e) {
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
	}, T = {
		map: ue,
		forEach: function(e, t, n) {
			ue(e, function() {
				t.apply(this, arguments);
			}, n);
		},
		count: function(e) {
			var t = 0;
			return ue(e, function() {
				t++;
			}), t;
		},
		toArray: function(e) {
			return ue(e, function(e) {
				return e;
			}) || [];
		},
		only: function(e) {
			if (!ie(e)) throw Error("React.Children.only expected to receive a single React element child.");
			return e;
		}
	};
	e.Activity = f, e.Children = T, e.Component = v, e.Fragment = r, e.Profiler = a, e.PureComponent = b, e.StrictMode = i, e.Suspense = l, e.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = C, e.__COMPILER_RUNTIME = {
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
		if (t != null) for (a in t.key !== void 0 && (i = "" + t.key), t) !te.call(t, a) || a === "key" || a === "__self" || a === "__source" || a === "ref" && t.ref === void 0 || (r[a] = t[a]);
		var a = arguments.length - 2;
		if (a === 1) r.children = n;
		else if (1 < a) {
			for (var o = Array(a), s = 0; s < a; s++) o[s] = arguments[s + 2];
			r.children = o;
		}
		return ne(e.type, i, r);
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
		if (t != null) for (r in t.key !== void 0 && (a = "" + t.key), t) te.call(t, r) && r !== "key" && r !== "__self" && r !== "__source" && (i[r] = t[r]);
		var o = arguments.length - 2;
		if (o === 1) i.children = n;
		else if (1 < o) {
			for (var s = Array(o), c = 0; c < o; c++) s[c] = arguments[c + 2];
			i.children = s;
		}
		if (e && e.defaultProps) for (r in o = e.defaultProps, o) i[r] === void 0 && (i[r] = o[r]);
		return ne(e, a, i);
	}, e.createRef = function() {
		return { current: null };
	}, e.forwardRef = function(e) {
		return {
			$$typeof: c,
			render: e
		};
	}, e.isValidElement = ie, e.lazy = function(e) {
		return {
			$$typeof: d,
			_payload: {
				_status: -1,
				_result: e
			},
			_init: de
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
			i !== null && i(n, r), typeof r == "object" && r && typeof r.then == "function" && r.then(ee, w);
		} catch (e) {
			w(e);
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
		if (h = !1, b(e), !m) if (n(c) !== null) m = !0, S || (S = !0, ie());
		else {
			var t = n(l);
			t !== null && se(x, t.startTime - e);
		}
	}
	var S = !1, ee = -1, C = 5, te = -1;
	function ne() {
		return g ? !0 : !(e.unstable_now() - te < C);
	}
	function re() {
		if (g = !1, S) {
			var t = e.unstable_now();
			te = t;
			var i = !0;
			try {
				a: {
					m = !1, h && (h = !1, v(ee), ee = -1), p = !0;
					var a = f;
					try {
						b: {
							for (b(t), d = n(c); d !== null && !(d.expirationTime > t && ne());) {
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
								u !== null && se(x, u.startTime - t), i = !1;
							}
						}
						break a;
					} finally {
						d = null, f = a, p = !1;
					}
					i = void 0;
				}
			} finally {
				i ? ie() : S = !1;
			}
		}
	}
	var ie;
	if (typeof y == "function") ie = function() {
		y(re);
	};
	else if (typeof MessageChannel < "u") {
		var ae = new MessageChannel(), oe = ae.port2;
		ae.port1.onmessage = re, ie = function() {
			oe.postMessage(null);
		};
	} else ie = function() {
		_(re, 0);
	};
	function se(t, n) {
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
		}, a > o ? (r.sortIndex = a, t(l, r), n(c) === null && r === n(l) && (h ? (v(ee), ee = -1) : h = !0, se(x, a - o))) : (r.sortIndex = s, t(c, r), m || p || (m = !0, S || (S = !0, ie()))), r;
	}, e.unstable_shouldYield = ne, e.unstable_wrapCallback = function(e) {
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
	var h = Object.assign, g = Symbol.for("react.element"), _ = Symbol.for("react.transitional.element"), v = Symbol.for("react.portal"), y = Symbol.for("react.fragment"), b = Symbol.for("react.strict_mode"), x = Symbol.for("react.profiler"), S = Symbol.for("react.consumer"), ee = Symbol.for("react.context"), C = Symbol.for("react.forward_ref"), te = Symbol.for("react.suspense"), ne = Symbol.for("react.suspense_list"), re = Symbol.for("react.memo"), ie = Symbol.for("react.lazy"), ae = Symbol.for("react.activity"), oe = Symbol.for("react.memo_cache_sentinel"), se = Symbol.iterator;
	function ce(e) {
		return typeof e != "object" || !e ? null : (e = se && e[se] || e["@@iterator"], typeof e == "function" ? e : null);
	}
	var le = Symbol.for("react.client.reference");
	function ue(e) {
		if (e == null) return null;
		if (typeof e == "function") return e.$$typeof === le ? null : e.displayName || e.name || null;
		if (typeof e == "string") return e;
		switch (e) {
			case y: return "Fragment";
			case x: return "Profiler";
			case b: return "StrictMode";
			case te: return "Suspense";
			case ne: return "SuspenseList";
			case ae: return "Activity";
		}
		if (typeof e == "object") switch (e.$$typeof) {
			case v: return "Portal";
			case ee: return e.displayName || "Context";
			case S: return (e._context.displayName || "Context") + ".Consumer";
			case C:
				var t = e.render;
				return e = e.displayName, e ||= (e = t.displayName || t.name || "", e === "" ? "ForwardRef" : "ForwardRef(" + e + ")"), e;
			case re: return t = e.displayName || null, t === null ? ue(e.type) || "Memo" : t;
			case ie:
				t = e._payload, e = e._init;
				try {
					return ue(e(t));
				} catch {}
		}
		return null;
	}
	var de = Array.isArray, w = n.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, T = r.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, fe = {
		pending: !1,
		data: null,
		method: null,
		action: null
	}, pe = [], me = -1;
	function he(e) {
		return { current: e };
	}
	function E(e) {
		0 > me || (e.current = pe[me], pe[me] = null, me--);
	}
	function D(e, t) {
		me++, pe[me] = e.current, e.current = t;
	}
	var ge = he(null), _e = he(null), O = he(null), k = he(null);
	function ve(e, t) {
		switch (D(O, t), D(_e, e), D(ge, null), t.nodeType) {
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
		E(ge), D(ge, e);
	}
	function A() {
		E(ge), E(_e), E(O);
	}
	function ye(e) {
		e.memoizedState !== null && D(k, e);
		var t = ge.current, n = Hd(t, e.type);
		t !== n && (D(_e, e), D(ge, n));
	}
	function be(e) {
		_e.current === e && (E(ge), E(_e)), k.current === e && (E(k), Qf._currentValue = fe);
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
	function We(e) {
		if (typeof Be == "function" && Ve(e), Ue && typeof Ue.setStrictMode == "function") try {
			Ue.setStrictMode(He, e);
		} catch {}
	}
	var j = Math.clz32 ? Math.clz32 : qe, Ge = Math.log, Ke = Math.LN2;
	function qe(e) {
		return e >>>= 0, e === 0 ? 32 : 31 - (Ge(e) / Ke | 0) | 0;
	}
	var Je = 256, Ye = 262144, Xe = 4194304;
	function Ze(e) {
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
	function Qe(e, t, n) {
		var r = e.pendingLanes;
		if (r === 0) return 0;
		var i = 0, a = e.suspendedLanes, o = e.pingedLanes;
		e = e.warmLanes;
		var s = r & 134217727;
		return s === 0 ? (s = r & ~a, s === 0 ? o === 0 ? n || (n = r & ~e, n !== 0 && (i = Ze(n))) : i = Ze(o) : i = Ze(s)) : (r = s & ~a, r === 0 ? (o &= s, o === 0 ? n || (n = s & ~e, n !== 0 && (i = Ze(n))) : i = Ze(o)) : i = Ze(r)), i === 0 ? 0 : t !== 0 && t !== i && (t & a) === 0 && (a = i & -i, n = t & -t, a >= n || a === 32 && n & 4194048) ? t : i;
	}
	function $e(e, t) {
		return (e.pendingLanes & ~(e.suspendedLanes & ~e.pingedLanes) & t) === 0;
	}
	function et(e, t) {
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
	function tt() {
		var e = Xe;
		return Xe <<= 1, !(Xe & 62914560) && (Xe = 4194304), e;
	}
	function nt(e) {
		for (var t = [], n = 0; 31 > n; n++) t.push(e);
		return t;
	}
	function rt(e, t) {
		e.pendingLanes |= t, t !== 268435456 && (e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0);
	}
	function it(e, t, n, r, i, a) {
		var o = e.pendingLanes;
		e.pendingLanes = n, e.suspendedLanes = 0, e.pingedLanes = 0, e.warmLanes = 0, e.expiredLanes &= n, e.entangledLanes &= n, e.errorRecoveryDisabledLanes &= n, e.shellSuspendCounter = 0;
		var s = e.entanglements, c = e.expirationTimes, l = e.hiddenUpdates;
		for (n = o & ~n; 0 < n;) {
			var u = 31 - j(n), d = 1 << u;
			s[u] = 0, c[u] = -1;
			var f = l[u];
			if (f !== null) for (l[u] = null, u = 0; u < f.length; u++) {
				var p = f[u];
				p !== null && (p.lane &= -536870913);
			}
			n &= ~d;
		}
		r !== 0 && at(e, r, 0), a !== 0 && i === 0 && e.tag !== 0 && (e.suspendedLanes |= a & ~(o & ~t));
	}
	function at(e, t, n) {
		e.pendingLanes |= t, e.suspendedLanes &= ~t;
		var r = 31 - j(t);
		e.entangledLanes |= t, e.entanglements[r] = e.entanglements[r] | 1073741824 | n & 261930;
	}
	function ot(e, t) {
		var n = e.entangledLanes |= t;
		for (e = e.entanglements; n;) {
			var r = 31 - j(n), i = 1 << r;
			i & t | e[r] & t && (e[r] |= t), n &= ~i;
		}
	}
	function M(e, t) {
		var n = t & -t;
		return n = n & 42 ? 1 : st(n), (n & (e.suspendedLanes | t)) === 0 ? n : 0;
	}
	function st(e) {
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
	function N(e) {
		return e &= -e, 2 < e ? 8 < e ? e & 134217727 ? 32 : 268435456 : 8 : 2;
	}
	function P() {
		var e = T.p;
		return e === 0 ? (e = window.event, e === void 0 ? 32 : mp(e.type)) : e;
	}
	function F(e, t) {
		var n = T.p;
		try {
			return T.p = e, t();
		} finally {
			T.p = n;
		}
	}
	var ct = Math.random().toString(36).slice(2), I = "__reactFiber$" + ct, lt = "__reactProps$" + ct, L = "__reactContainer$" + ct, ut = "__reactEvents$" + ct, dt = "__reactListeners$" + ct, ft = "__reactHandles$" + ct, pt = "__reactResources$" + ct, mt = "__reactMarker$" + ct;
	function ht(e) {
		delete e[I], delete e[lt], delete e[ut], delete e[dt], delete e[ft];
	}
	function gt(e) {
		var t = e[I];
		if (t) return t;
		for (var n = e.parentNode; n;) {
			if (t = n[L] || n[I]) {
				if (n = t.alternate, t.child !== null || n !== null && n.child !== null) for (e = df(e); e !== null;) {
					if (n = e[I]) return n;
					e = df(e);
				}
				return t;
			}
			e = n, n = e.parentNode;
		}
		return null;
	}
	function _t(e) {
		if (e = e[I] || e[L]) {
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
				if (de(r)) {
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
	function R(e, t, n) {
		if (t != null && typeof t != "object") throw Error(i(62));
		if (e = e.style, n != null) {
			for (var r in n) !n.hasOwnProperty(r) || t != null && t.hasOwnProperty(r) || (r.indexOf("--") === 0 ? e.setProperty(r, "") : r === "float" ? e.cssFloat = "" : e[r] = "");
			for (var a in t) r = t[a], t.hasOwnProperty(a) && n[a] !== r && Jt(e, a, r);
		} else for (var o in t) t.hasOwnProperty(o) && Jt(e, o, t[o]);
	}
	function Yt(e) {
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
	var Xt = new Map([
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
	]), Zt = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
	function Qt(e) {
		return Zt.test("" + e) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : e;
	}
	function $t() {}
	var en = null;
	function tn(e) {
		return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
	}
	var nn = null, rn = null;
	function an(e) {
		var t = _t(e);
		if (t && (e = t.stateNode)) {
			var n = e[lt] || null;
			a: switch (e = t.stateNode, t.type) {
				case "input":
					if (Bt(e, n.value, n.defaultValue, n.defaultValue, n.checked, n.defaultChecked, n.type, n.name), t = n.name, n.type === "radio" && t != null) {
						for (n = e; n.parentNode;) n = n.parentNode;
						for (n = n.querySelectorAll("input[name=\"" + zt("" + t) + "\"][type=\"radio\"]"), t = 0; t < n.length; t++) {
							var r = n[t];
							if (r !== e && r.form === e.form) {
								var a = r[lt] || null;
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
			if (on = !1, (nn !== null || rn !== null) && (bu(), nn && (t = nn, e = rn, rn = nn = null, an(t), e))) for (t = 0; t < e.length; t++) an(e[t]);
		}
	}
	function cn(e, t) {
		var n = e.stateNode;
		if (n === null) return null;
		var r = n[lt] || null;
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
		getModifierState: Ln,
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
	} })), z = yn(h({}, bn, { data: 0 })), Nn = {
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
	}, Pn = {
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
	}, Fn = {
		Alt: "altKey",
		Control: "ctrlKey",
		Meta: "metaKey",
		Shift: "shiftKey"
	};
	function In(e) {
		var t = this.nativeEvent;
		return t.getModifierState ? t.getModifierState(e) : (e = Fn[e]) ? !!t[e] : !1;
	}
	function Ln() {
		return In;
	}
	var Rn = yn(h({}, Sn, {
		key: function(e) {
			if (e.key) {
				var t = Nn[e.key] || e.key;
				if (t !== "Unidentified") return t;
			}
			return e.type === "keypress" ? (e = gn(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? Pn[e.keyCode] || "Unidentified" : "";
		},
		code: 0,
		location: 0,
		ctrlKey: 0,
		shiftKey: 0,
		altKey: 0,
		metaKey: 0,
		repeat: 0,
		locale: 0,
		getModifierState: Ln,
		charCode: function(e) {
			return e.type === "keypress" ? gn(e) : 0;
		},
		keyCode: function(e) {
			return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
		},
		which: function(e) {
			return e.type === "keypress" ? gn(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
		}
	})), zn = yn(h({}, Dn, {
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
	})), Bn = yn(h({}, Sn, {
		touches: 0,
		targetTouches: 0,
		changedTouches: 0,
		altKey: 0,
		metaKey: 0,
		ctrlKey: 0,
		shiftKey: 0,
		getModifierState: Ln
	})), Vn = yn(h({}, bn, {
		propertyName: 0,
		elapsedTime: 0,
		pseudoElement: 0
	})), Hn = yn(h({}, Dn, {
		deltaX: function(e) {
			return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
		},
		deltaY: function(e) {
			return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
		},
		deltaZ: 0,
		deltaMode: 0
	})), Un = yn(h({}, bn, {
		newState: 0,
		oldState: 0
	})), Wn = [
		9,
		13,
		27,
		32
	], Gn = ln && "CompositionEvent" in window, Kn = null;
	ln && "documentMode" in document && (Kn = document.documentMode);
	var qn = ln && "TextEvent" in window && !Kn, Jn = ln && (!Gn || Kn && 8 < Kn && 11 >= Kn), Yn = " ", Xn = !1;
	function Zn(e, t) {
		switch (e) {
			case "keyup": return Wn.indexOf(t.keyCode) !== -1;
			case "keydown": return t.keyCode !== 229;
			case "keypress":
			case "mousedown":
			case "focusout": return !0;
			default: return !1;
		}
	}
	function Qn(e) {
		return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
	}
	var $n = !1;
	function er(e, t) {
		switch (e) {
			case "compositionend": return Qn(t);
			case "keypress": return t.which === 32 ? (Xn = !0, Yn) : null;
			case "textInput": return e = t.data, e === Yn && Xn ? null : e;
			default: return null;
		}
	}
	function tr(e, t) {
		if ($n) return e === "compositionend" || !Gn && Zn(e, t) ? (e = hn(), mn = pn = fn = null, $n = !1, e) : null;
		switch (e) {
			case "paste": return null;
			case "keypress":
				if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
					if (t.char && 1 < t.char.length) return t.char;
					if (t.which) return String.fromCharCode(t.which);
				}
				return null;
			case "compositionend": return Jn && t.locale !== "ko" ? null : t.data;
			default: return null;
		}
	}
	var nr = {
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
	function rr(e) {
		var t = e && e.nodeName && e.nodeName.toLowerCase();
		return t === "input" ? !!nr[e.type] : t === "textarea";
	}
	function ir(e, t, n, r) {
		nn ? rn ? rn.push(r) : rn = [r] : nn = r, t = Ed(t, "onChange"), 0 < t.length && (n = new xn("onChange", "change", null, n, r), e.push({
			event: n,
			listeners: t
		}));
	}
	var ar = null, or = null;
	function sr(e) {
		yd(e, 0);
	}
	function cr(e) {
		if (It(vt(e))) return e;
	}
	function lr(e, t) {
		if (e === "change") return t;
	}
	var ur = !1;
	if (ln) {
		var dr;
		if (ln) {
			var fr = "oninput" in document;
			if (!fr) {
				var pr = document.createElement("div");
				pr.setAttribute("oninput", "return;"), fr = typeof pr.oninput == "function";
			}
			dr = fr;
		} else dr = !1;
		ur = dr && (!document.documentMode || 9 < document.documentMode);
	}
	function mr() {
		ar && (ar.detachEvent("onpropertychange", hr), or = ar = null);
	}
	function hr(e) {
		if (e.propertyName === "value" && cr(or)) {
			var t = [];
			ir(t, or, e, tn(e)), sn(sr, t);
		}
	}
	function gr(e, t, n) {
		e === "focusin" ? (mr(), ar = t, or = n, ar.attachEvent("onpropertychange", hr)) : e === "focusout" && mr();
	}
	function _r(e) {
		if (e === "selectionchange" || e === "keyup" || e === "keydown") return cr(or);
	}
	function vr(e, t) {
		if (e === "click") return cr(t);
	}
	function yr(e, t) {
		if (e === "input" || e === "change") return cr(t);
	}
	function br(e, t) {
		return e === t && (e !== 0 || 1 / e == 1 / t) || e !== e && t !== t;
	}
	var xr = typeof Object.is == "function" ? Object.is : br;
	function Sr(e, t) {
		if (xr(e, t)) return !0;
		if (typeof e != "object" || !e || typeof t != "object" || !t) return !1;
		var n = Object.keys(e), r = Object.keys(t);
		if (n.length !== r.length) return !1;
		for (r = 0; r < n.length; r++) {
			var i = n[r];
			if (!Oe.call(t, i) || !xr(e[i], t[i])) return !1;
		}
		return !0;
	}
	function Cr(e) {
		for (; e && e.firstChild;) e = e.firstChild;
		return e;
	}
	function wr(e, t) {
		var n = Cr(e);
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
			n = Cr(n);
		}
	}
	function Tr(e, t) {
		return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? Tr(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
	}
	function Er(e) {
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
	function Dr(e) {
		var t = e && e.nodeName && e.nodeName.toLowerCase();
		return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
	}
	var Or = ln && "documentMode" in document && 11 >= document.documentMode, kr = null, Ar = null, jr = null, Mr = !1;
	function Nr(e, t, n) {
		var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
		Mr || kr == null || kr !== Lt(r) || (r = kr, "selectionStart" in r && Dr(r) ? r = {
			start: r.selectionStart,
			end: r.selectionEnd
		} : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = {
			anchorNode: r.anchorNode,
			anchorOffset: r.anchorOffset,
			focusNode: r.focusNode,
			focusOffset: r.focusOffset
		}), jr && Sr(jr, r) || (jr = r, r = Ed(Ar, "onSelect"), 0 < r.length && (t = new xn("onSelect", "select", null, t, n), e.push({
			event: t,
			listeners: r
		}), t.target = kr)));
	}
	function Pr(e, t) {
		var n = {};
		return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
	}
	var Fr = {
		animationend: Pr("Animation", "AnimationEnd"),
		animationiteration: Pr("Animation", "AnimationIteration"),
		animationstart: Pr("Animation", "AnimationStart"),
		transitionrun: Pr("Transition", "TransitionRun"),
		transitionstart: Pr("Transition", "TransitionStart"),
		transitioncancel: Pr("Transition", "TransitionCancel"),
		transitionend: Pr("Transition", "TransitionEnd")
	}, Ir = {}, Lr = {};
	ln && (Lr = document.createElement("div").style, "AnimationEvent" in window || (delete Fr.animationend.animation, delete Fr.animationiteration.animation, delete Fr.animationstart.animation), "TransitionEvent" in window || delete Fr.transitionend.transition);
	function Rr(e) {
		if (Ir[e]) return Ir[e];
		if (!Fr[e]) return e;
		var t = Fr[e], n;
		for (n in t) if (t.hasOwnProperty(n) && n in Lr) return Ir[e] = t[n];
		return e;
	}
	var zr = Rr("animationend"), Br = Rr("animationiteration"), Vr = Rr("animationstart"), Hr = Rr("transitionrun"), Ur = Rr("transitionstart"), Wr = Rr("transitioncancel"), Gr = Rr("transitionend"), Kr = /* @__PURE__ */ new Map(), qr = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
	qr.push("scrollEnd");
	function Jr(e, t) {
		Kr.set(e, t), Ct(t, [e]);
	}
	var Yr = typeof reportError == "function" ? reportError : function(e) {
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
	}, Xr = [], Zr = 0, Qr = 0;
	function $r() {
		for (var e = Zr, t = Qr = Zr = 0; t < e;) {
			var n = Xr[t];
			Xr[t++] = null;
			var r = Xr[t];
			Xr[t++] = null;
			var i = Xr[t];
			Xr[t++] = null;
			var a = Xr[t];
			if (Xr[t++] = null, r !== null && i !== null) {
				var o = r.pending;
				o === null ? i.next = i : (i.next = o.next, o.next = i), r.pending = i;
			}
			a !== 0 && ri(n, i, a);
		}
	}
	function ei(e, t, n, r) {
		Xr[Zr++] = e, Xr[Zr++] = t, Xr[Zr++] = n, Xr[Zr++] = r, Qr |= r, e.lanes |= r, e = e.alternate, e !== null && (e.lanes |= r);
	}
	function ti(e, t, n, r) {
		return ei(e, t, n, r), ii(e);
	}
	function ni(e, t) {
		return ei(e, null, null, t), ii(e);
	}
	function ri(e, t, n) {
		e.lanes |= n;
		var r = e.alternate;
		r !== null && (r.lanes |= n);
		for (var i = !1, a = e.return; a !== null;) a.childLanes |= n, r = a.alternate, r !== null && (r.childLanes |= n), a.tag === 22 && (e = a.stateNode, e === null || e._visibility & 1 || (i = !0)), e = a, a = a.return;
		return e.tag === 3 ? (a = e.stateNode, i && t !== null && (i = 31 - j(n), e = a.hiddenUpdates, r = e[i], r === null ? e[i] = [t] : r.push(t), t.lane = n | 536870912), a) : null;
	}
	function ii(e) {
		if (50 < du) throw du = 0, fu = null, Error(i(185));
		for (var t = e.return; t !== null;) e = t, t = e.return;
		return e.tag === 3 ? e.stateNode : null;
	}
	var ai = {};
	function oi(e, t, n, r) {
		this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.refCleanup = this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
	}
	function si(e, t, n, r) {
		return new oi(e, t, n, r);
	}
	function ci(e) {
		return e = e.prototype, !(!e || !e.isReactComponent);
	}
	function li(e, t) {
		var n = e.alternate;
		return n === null ? (n = si(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 65011712, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : {
			lanes: t.lanes,
			firstContext: t.firstContext
		}, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n.refCleanup = e.refCleanup, n;
	}
	function ui(e, t) {
		e.flags &= 65011714;
		var n = e.alternate;
		return n === null ? (e.childLanes = 0, e.lanes = t, e.child = null, e.subtreeFlags = 0, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null) : (e.childLanes = n.childLanes, e.lanes = n.lanes, e.child = n.child, e.subtreeFlags = 0, e.deletions = null, e.memoizedProps = n.memoizedProps, e.memoizedState = n.memoizedState, e.updateQueue = n.updateQueue, e.type = n.type, t = n.dependencies, e.dependencies = t === null ? null : {
			lanes: t.lanes,
			firstContext: t.firstContext
		}), e;
	}
	function di(e, t, n, r, a, o) {
		var s = 0;
		if (r = e, typeof e == "function") ci(e) && (s = 1);
		else if (typeof e == "string") s = Uf(e, n, ge.current) ? 26 : e === "html" || e === "head" || e === "body" ? 27 : 5;
		else a: switch (e) {
			case ae: return e = si(31, n, t, a), e.elementType = ae, e.lanes = o, e;
			case y: return fi(n.children, a, o, t);
			case b:
				s = 8, a |= 24;
				break;
			case x: return e = si(12, n, t, a | 2), e.elementType = x, e.lanes = o, e;
			case te: return e = si(13, n, t, a), e.elementType = te, e.lanes = o, e;
			case ne: return e = si(19, n, t, a), e.elementType = ne, e.lanes = o, e;
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
					case re:
						s = 14;
						break a;
					case ie:
						s = 16, r = null;
						break a;
				}
				s = 29, n = Error(i(130, e === null ? "null" : typeof e, "")), r = null;
		}
		return t = si(s, n, t, a), t.elementType = e, t.type = r, t.lanes = o, t;
	}
	function fi(e, t, n, r) {
		return e = si(7, e, r, t), e.lanes = n, e;
	}
	function pi(e, t, n) {
		return e = si(6, e, null, t), e.lanes = n, e;
	}
	function mi(e) {
		var t = si(18, null, null, 0);
		return t.stateNode = e, t;
	}
	function hi(e, t, n) {
		return t = si(4, e.children === null ? [] : e.children, e.key, t), t.lanes = n, t.stateNode = {
			containerInfo: e.containerInfo,
			pendingChildren: null,
			implementation: e.implementation
		}, t;
	}
	var gi = /* @__PURE__ */ new WeakMap();
	function _i(e, t) {
		if (typeof e == "object" && e) {
			var n = gi.get(e);
			return n === void 0 ? (t = {
				value: e,
				source: t,
				stack: De(t)
			}, gi.set(e, t), t) : n;
		}
		return {
			value: e,
			source: t,
			stack: De(t)
		};
	}
	var vi = [], yi = 0, bi = null, xi = 0, Si = [], Ci = 0, wi = null, Ti = 1, Ei = "";
	function Di(e, t) {
		vi[yi++] = xi, vi[yi++] = bi, bi = e, xi = t;
	}
	function Oi(e, t, n) {
		Si[Ci++] = Ti, Si[Ci++] = Ei, Si[Ci++] = wi, wi = e;
		var r = Ti;
		e = Ei;
		var i = 32 - j(r) - 1;
		r &= ~(1 << i), n += 1;
		var a = 32 - j(t) + i;
		if (30 < a) {
			var o = i - i % 5;
			a = (r & (1 << o) - 1).toString(32), r >>= o, i -= o, Ti = 1 << 32 - j(t) + i | n << i | r, Ei = a + e;
		} else Ti = 1 << a | n << i | r, Ei = e;
	}
	function ki(e) {
		e.return !== null && (Di(e, 1), Oi(e, 1, 0));
	}
	function Ai(e) {
		for (; e === bi;) bi = vi[--yi], vi[yi] = null, xi = vi[--yi], vi[yi] = null;
		for (; e === wi;) wi = Si[--Ci], Si[Ci] = null, Ei = Si[--Ci], Si[Ci] = null, Ti = Si[--Ci], Si[Ci] = null;
	}
	function ji(e, t) {
		Si[Ci++] = Ti, Si[Ci++] = Ei, Si[Ci++] = wi, Ti = t.id, Ei = t.overflow, wi = e;
	}
	var Mi = null, B = null, V = !1, Ni = null, Pi = !1, Fi = Error(i(519));
	function Ii(e) {
		throw Hi(_i(Error(i(418, 1 < arguments.length && arguments[1] !== void 0 && arguments[1] ? "text" : "HTML", "")), e)), Fi;
	}
	function Li(e) {
		var t = e.stateNode, n = e.type, r = e.memoizedProps;
		switch (t[I] = e, t[lt] = r, n) {
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
		n = r.children, typeof n != "string" && typeof n != "number" && typeof n != "bigint" || t.textContent === "" + n || !0 === r.suppressHydrationWarning || Md(t.textContent, n) ? (r.popover != null && (Q("beforetoggle", t), Q("toggle", t)), r.onScroll != null && Q("scroll", t), r.onScrollEnd != null && Q("scrollend", t), r.onClick != null && (t.onclick = $t), t = !0) : t = !1, t || Ii(e, !0);
	}
	function Ri(e) {
		for (Mi = e.return; Mi;) switch (Mi.tag) {
			case 5:
			case 31:
			case 13:
				Pi = !1;
				return;
			case 27:
			case 3:
				Pi = !0;
				return;
			default: Mi = Mi.return;
		}
	}
	function zi(e) {
		if (e !== Mi) return !1;
		if (!V) return Ri(e), V = !0, !1;
		var t = e.tag, n;
		if ((n = t !== 3 && t !== 27) && ((n = t === 5) && (n = e.type, n = !(n !== "form" && n !== "button") || Ud(e.type, e.memoizedProps)), n = !n), n && B && Ii(e), Ri(e), t === 13) {
			if (e = e.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(i(317));
			B = uf(e);
		} else if (t === 31) {
			if (e = e.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(i(317));
			B = uf(e);
		} else t === 27 ? (t = B, Zd(e.type) ? (e = lf, lf = null, B = e) : B = t) : B = Mi ? cf(e.stateNode.nextSibling) : null;
		return !0;
	}
	function Bi() {
		B = Mi = null, V = !1;
	}
	function Vi() {
		var e = Ni;
		return e !== null && (Zl === null ? Zl = e : Zl.push.apply(Zl, e), Ni = null), e;
	}
	function Hi(e) {
		Ni === null ? Ni = [e] : Ni.push(e);
	}
	var Ui = he(null), Wi = null, Gi = null;
	function Ki(e, t, n) {
		D(Ui, t._currentValue), t._currentValue = n;
	}
	function qi(e) {
		e._currentValue = Ui.current, E(Ui);
	}
	function Ji(e, t, n) {
		for (; e !== null;) {
			var r = e.alternate;
			if ((e.childLanes & t) === t ? r !== null && (r.childLanes & t) !== t && (r.childLanes |= t) : (e.childLanes |= t, r !== null && (r.childLanes |= t)), e === n) break;
			e = e.return;
		}
	}
	function Yi(e, t, n, r) {
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
						o.lanes |= n, c = o.alternate, c !== null && (c.lanes |= n), Ji(o.return, n, e), r || (s = null);
						break a;
					}
					o = c.next;
				}
			} else if (a.tag === 18) {
				if (s = a.return, s === null) throw Error(i(341));
				s.lanes |= n, o = s.alternate, o !== null && (o.lanes |= n), Ji(s, n, e), s = null;
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
	function Xi(e, t, n, r) {
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
					xr(a.pendingProps.value, s.value) || (e === null ? e = [c] : e.push(c));
				}
			} else if (a === k.current) {
				if (s = a.alternate, s === null) throw Error(i(387));
				s.memoizedState.memoizedState !== a.memoizedState.memoizedState && (e === null ? e = [Qf] : e.push(Qf));
			}
			a = a.return;
		}
		e !== null && Yi(t, e, n, r), t.flags |= 262144;
	}
	function Zi(e) {
		for (e = e.firstContext; e !== null;) {
			if (!xr(e.context._currentValue, e.memoizedValue)) return !0;
			e = e.next;
		}
		return !1;
	}
	function Qi(e) {
		Wi = e, Gi = null, e = e.dependencies, e !== null && (e.firstContext = null);
	}
	function $i(e) {
		return ta(Wi, e);
	}
	function ea(e, t) {
		return Wi === null && Qi(e), ta(e, t);
	}
	function ta(e, t) {
		var n = t._currentValue;
		if (t = {
			context: t,
			memoizedValue: n,
			next: null
		}, Gi === null) {
			if (e === null) throw Error(i(308));
			Gi = t, e.dependencies = {
				lanes: 0,
				firstContext: t
			}, e.flags |= 524288;
		} else Gi = Gi.next = t;
		return n;
	}
	var na = typeof AbortController < "u" ? AbortController : function() {
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
	}, ra = t.unstable_scheduleCallback, ia = t.unstable_NormalPriority, aa = {
		$$typeof: ee,
		Consumer: null,
		Provider: null,
		_currentValue: null,
		_currentValue2: null,
		_threadCount: 0
	};
	function oa() {
		return {
			controller: new na(),
			data: /* @__PURE__ */ new Map(),
			refCount: 0
		};
	}
	function sa(e) {
		e.refCount--, e.refCount === 0 && ra(ia, function() {
			e.controller.abort();
		});
	}
	var ca = null, la = 0, ua = 0, da = null;
	function fa(e, t) {
		if (ca === null) {
			var n = ca = [];
			la = 0, ua = dd(), da = {
				status: "pending",
				value: void 0,
				then: function(e) {
					n.push(e);
				}
			};
		}
		return la++, t.then(pa, pa), t;
	}
	function pa() {
		if (--la === 0 && ca !== null) {
			da !== null && (da.status = "fulfilled");
			var e = ca;
			ca = null, ua = 0, da = null;
			for (var t = 0; t < e.length; t++) (0, e[t])();
		}
	}
	function ma(e, t) {
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
	var ha = w.S;
	w.S = function(e, t) {
		eu = Ne(), typeof t == "object" && t && typeof t.then == "function" && fa(e, t), ha !== null && ha(e, t);
	};
	var ga = he(null);
	function _a() {
		var e = ga.current;
		return e === null ? q.pooledCache : e;
	}
	function va(e, t) {
		t === null ? D(ga, ga.current) : D(ga, t.pool);
	}
	function ya() {
		var e = _a();
		return e === null ? null : {
			parent: aa._currentValue,
			pool: e
		};
	}
	var ba = Error(i(460)), xa = Error(i(474)), Sa = Error(i(542)), Ca = { then: function() {} };
	function wa(e) {
		return e = e.status, e === "fulfilled" || e === "rejected";
	}
	function Ta(e, t, n) {
		switch (n = e[n], n === void 0 ? e.push(t) : n !== t && (t.then($t, $t), t = n), t.status) {
			case "fulfilled": return t.value;
			case "rejected": throw e = t.reason, ka(e), e;
			default:
				if (typeof t.status == "string") t.then($t, $t);
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
					case "rejected": throw e = t.reason, ka(e), e;
				}
				throw Da = t, ba;
		}
	}
	function Ea(e) {
		try {
			var t = e._init;
			return t(e._payload);
		} catch (e) {
			throw typeof e == "object" && e && typeof e.then == "function" ? (Da = e, ba) : e;
		}
	}
	var Da = null;
	function Oa() {
		if (Da === null) throw Error(i(459));
		var e = Da;
		return Da = null, e;
	}
	function ka(e) {
		if (e === ba || e === Sa) throw Error(i(483));
	}
	var Aa = null, ja = 0;
	function Ma(e) {
		var t = ja;
		return ja += 1, Aa === null && (Aa = []), Ta(Aa, e, t);
	}
	function Na(e, t) {
		t = t.props.ref, e.ref = t === void 0 ? null : t;
	}
	function Pa(e, t) {
		throw t.$$typeof === g ? Error(i(525)) : (e = Object.prototype.toString.call(t), Error(i(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e)));
	}
	function Fa(e) {
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
			return e = li(e, t), e.index = 0, e.sibling = null, e;
		}
		function o(t, n, r) {
			return t.index = r, e ? (r = t.alternate, r === null ? (t.flags |= 67108866, n) : (r = r.index, r < n ? (t.flags |= 67108866, n) : r)) : (t.flags |= 1048576, n);
		}
		function s(t) {
			return e && t.alternate === null && (t.flags |= 67108866), t;
		}
		function c(e, t, n, r) {
			return t === null || t.tag !== 6 ? (t = pi(n, e.mode, r), t.return = e, t) : (t = a(t, n), t.return = e, t);
		}
		function l(e, t, n, r) {
			var i = n.type;
			return i === y ? d(e, t, n.props.children, r, n.key) : t !== null && (t.elementType === i || typeof i == "object" && i && i.$$typeof === ie && Ea(i) === t.type) ? (t = a(t, n.props), Na(t, n), t.return = e, t) : (t = di(n.type, n.key, n.props, null, e.mode, r), Na(t, n), t.return = e, t);
		}
		function u(e, t, n, r) {
			return t === null || t.tag !== 4 || t.stateNode.containerInfo !== n.containerInfo || t.stateNode.implementation !== n.implementation ? (t = hi(n, e.mode, r), t.return = e, t) : (t = a(t, n.children || []), t.return = e, t);
		}
		function d(e, t, n, r, i) {
			return t === null || t.tag !== 7 ? (t = fi(n, e.mode, r, i), t.return = e, t) : (t = a(t, n), t.return = e, t);
		}
		function f(e, t, n) {
			if (typeof t == "string" && t !== "" || typeof t == "number" || typeof t == "bigint") return t = pi("" + t, e.mode, n), t.return = e, t;
			if (typeof t == "object" && t) {
				switch (t.$$typeof) {
					case _: return n = di(t.type, t.key, t.props, null, e.mode, n), Na(n, t), n.return = e, n;
					case v: return t = hi(t, e.mode, n), t.return = e, t;
					case ie: return t = Ea(t), f(e, t, n);
				}
				if (de(t) || ce(t)) return t = fi(t, e.mode, n, null), t.return = e, t;
				if (typeof t.then == "function") return f(e, Ma(t), n);
				if (t.$$typeof === ee) return f(e, ea(e, t), n);
				Pa(e, t);
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
					case ie: return n = Ea(n), p(e, t, n, r);
				}
				if (de(n) || ce(n)) return i === null ? d(e, t, n, r, null) : null;
				if (typeof n.then == "function") return p(e, t, Ma(n), r);
				if (n.$$typeof === ee) return p(e, t, ea(e, n), r);
				Pa(e, n);
			}
			return null;
		}
		function m(e, t, n, r, i) {
			if (typeof r == "string" && r !== "" || typeof r == "number" || typeof r == "bigint") return e = e.get(n) || null, c(t, e, "" + r, i);
			if (typeof r == "object" && r) {
				switch (r.$$typeof) {
					case _: return e = e.get(r.key === null ? n : r.key) || null, l(t, e, r, i);
					case v: return e = e.get(r.key === null ? n : r.key) || null, u(t, e, r, i);
					case ie: return r = Ea(r), m(e, t, n, r, i);
				}
				if (de(r) || ce(r)) return e = e.get(n) || null, d(t, e, r, i, null);
				if (typeof r.then == "function") return m(e, t, n, Ma(r), i);
				if (r.$$typeof === ee) return m(e, t, n, ea(t, r), i);
				Pa(t, r);
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
			if (h === s.length) return n(i, d), V && Di(i, h), l;
			if (d === null) {
				for (; h < s.length; h++) d = f(i, s[h], c), d !== null && (a = o(d, a, h), u === null ? l = d : u.sibling = d, u = d);
				return V && Di(i, h), l;
			}
			for (d = r(d); h < s.length; h++) g = m(d, i, h, s[h], c), g !== null && (e && g.alternate !== null && d.delete(g.key === null ? h : g.key), a = o(g, a, h), u === null ? l = g : u.sibling = g, u = g);
			return e && d.forEach(function(e) {
				return t(i, e);
			}), V && Di(i, h), l;
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
			if (v.done) return n(a, h), V && Di(a, g), u;
			if (h === null) {
				for (; !v.done; g++, v = c.next()) v = f(a, v.value, l), v !== null && (s = o(v, s, g), d === null ? u = v : d.sibling = v, d = v);
				return V && Di(a, g), u;
			}
			for (h = r(h); !v.done; g++, v = c.next()) v = m(h, a, g, v.value, l), v !== null && (e && v.alternate !== null && h.delete(v.key === null ? g : v.key), s = o(v, s, g), d === null ? u = v : d.sibling = v, d = v);
			return e && h.forEach(function(e) {
				return t(a, e);
			}), V && Di(a, g), u;
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
									} else if (r.elementType === l || typeof l == "object" && l && l.$$typeof === ie && Ea(l) === r.type) {
										n(e, r.sibling), c = a(r, o.props), Na(c, o), c.return = e, e = c;
										break a;
									}
									n(e, r);
									break;
								} else t(e, r);
								r = r.sibling;
							}
							o.type === y ? (c = fi(o.props.children, e.mode, c, o.key), c.return = e, e = c) : (c = di(o.type, o.key, o.props, null, e.mode, c), Na(c, o), c.return = e, e = c);
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
							c = hi(o, e.mode, c), c.return = e, e = c;
						}
						return s(e);
					case ie: return o = Ea(o), b(e, r, o, c);
				}
				if (de(o)) return h(e, r, o, c);
				if (ce(o)) {
					if (l = ce(o), typeof l != "function") throw Error(i(150));
					return o = l.call(o), g(e, r, o, c);
				}
				if (typeof o.then == "function") return b(e, r, Ma(o), c);
				if (o.$$typeof === ee) return b(e, r, ea(e, o), c);
				Pa(e, o);
			}
			return typeof o == "string" && o !== "" || typeof o == "number" || typeof o == "bigint" ? (o = "" + o, r !== null && r.tag === 6 ? (n(e, r.sibling), c = a(r, o), c.return = e, e = c) : (n(e, r), c = pi(o, e.mode, c), c.return = e, e = c), s(e)) : n(e, r);
		}
		return function(e, t, n, r) {
			try {
				ja = 0;
				var i = b(e, t, n, r);
				return Aa = null, i;
			} catch (t) {
				if (t === ba || t === Sa) throw t;
				var a = si(29, t, null, e.mode);
				return a.lanes = r, a.return = e, a;
			}
		};
	}
	var Ia = Fa(!0), La = Fa(!1), Ra = !1;
	function za(e) {
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
	function Ba(e, t) {
		e = e.updateQueue, t.updateQueue === e && (t.updateQueue = {
			baseState: e.baseState,
			firstBaseUpdate: e.firstBaseUpdate,
			lastBaseUpdate: e.lastBaseUpdate,
			shared: e.shared,
			callbacks: null
		});
	}
	function Va(e) {
		return {
			lane: e,
			tag: 0,
			payload: null,
			callback: null,
			next: null
		};
	}
	function Ha(e, t, n) {
		var r = e.updateQueue;
		if (r === null) return null;
		if (r = r.shared, K & 2) {
			var i = r.pending;
			return i === null ? t.next = t : (t.next = i.next, i.next = t), r.pending = t, t = ii(e), ri(e, null, n), t;
		}
		return ei(e, r, t, n), ii(e);
	}
	function Ua(e, t, n) {
		if (t = t.updateQueue, t !== null && (t = t.shared, n & 4194048)) {
			var r = t.lanes;
			r &= e.pendingLanes, n |= r, t.lanes = n, ot(e, n);
		}
	}
	function Wa(e, t) {
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
	var Ga = !1;
	function Ka() {
		if (Ga) {
			var e = da;
			if (e !== null) throw e;
		}
	}
	function qa(e, t, n, r) {
		Ga = !1;
		var i = e.updateQueue;
		Ra = !1;
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
					f !== 0 && f === ua && (Ga = !0), u !== null && (u = u.next = {
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
							case 2: Ra = !0;
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
	function Ja(e, t) {
		if (typeof e != "function") throw Error(i(191, e));
		e.call(t);
	}
	function Ya(e, t) {
		var n = e.callbacks;
		if (n !== null) for (e.callbacks = null, e = 0; e < n.length; e++) Ja(n[e], t);
	}
	var Xa = he(null), Za = he(0);
	function Qa(e, t) {
		e = Ul, D(Za, e), D(Xa, t), Ul = e | t.baseLanes;
	}
	function $a() {
		D(Za, Ul), D(Xa, Xa.current);
	}
	function eo() {
		Ul = Za.current, E(Xa), E(Za);
	}
	var to = he(null), no = null;
	function ro(e) {
		var t = e.alternate;
		D(co, co.current & 1), D(to, e), no === null && (t === null || Xa.current !== null || t.memoizedState !== null) && (no = e);
	}
	function io(e) {
		D(co, co.current), D(to, e), no === null && (no = e);
	}
	function ao(e) {
		e.tag === 22 ? (D(co, co.current), D(to, e), no === null && (no = e)) : oo(e);
	}
	function oo() {
		D(co, co.current), D(to, to.current);
	}
	function so(e) {
		E(to), no === e && (no = null), E(co);
	}
	var co = he(0);
	function lo(e) {
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
	var uo = 0, H = null, U = null, fo = null, po = !1, mo = !1, ho = !1, go = 0, _o = 0, vo = null, yo = 0;
	function bo() {
		throw Error(i(321));
	}
	function xo(e, t) {
		if (t === null) return !1;
		for (var n = 0; n < t.length && n < e.length; n++) if (!xr(e[n], t[n])) return !1;
		return !0;
	}
	function So(e, t, n, r, i, a) {
		return uo = a, H = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, w.H = e === null || e.memoizedState === null ? zs : Bs, ho = !1, a = n(r, i), ho = !1, mo && (a = wo(t, n, r, i)), Co(e), a;
	}
	function Co(e) {
		w.H = Rs;
		var t = U !== null && U.next !== null;
		if (uo = 0, fo = U = H = null, po = !1, _o = 0, vo = null, t) throw Error(i(300));
		e === null || rc || (e = e.dependencies, e !== null && Zi(e) && (rc = !0));
	}
	function wo(e, t, n, r) {
		H = e;
		var a = 0;
		do {
			if (mo && (vo = null), _o = 0, mo = !1, 25 <= a) throw Error(i(301));
			if (a += 1, fo = U = null, e.updateQueue != null) {
				var o = e.updateQueue;
				o.lastEffect = null, o.events = null, o.stores = null, o.memoCache != null && (o.memoCache.index = 0);
			}
			w.H = Vs, o = t(n, r);
		} while (mo);
		return o;
	}
	function To() {
		var e = w.H, t = e.useState()[0];
		return t = typeof t.then == "function" ? Mo(t) : t, e = e.useState()[0], (U === null ? null : U.memoizedState) !== e && (H.flags |= 1024), t;
	}
	function Eo() {
		var e = go !== 0;
		return go = 0, e;
	}
	function Do(e, t, n) {
		t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~n;
	}
	function Oo(e) {
		if (po) {
			for (e = e.memoizedState; e !== null;) {
				var t = e.queue;
				t !== null && (t.pending = null), e = e.next;
			}
			po = !1;
		}
		uo = 0, fo = U = H = null, mo = !1, _o = go = 0, vo = null;
	}
	function ko() {
		var e = {
			memoizedState: null,
			baseState: null,
			baseQueue: null,
			queue: null,
			next: null
		};
		return fo === null ? H.memoizedState = fo = e : fo = fo.next = e, fo;
	}
	function Ao() {
		if (U === null) {
			var e = H.alternate;
			e = e === null ? null : e.memoizedState;
		} else e = U.next;
		var t = fo === null ? H.memoizedState : fo.next;
		if (t !== null) fo = t, U = e;
		else {
			if (e === null) throw H.alternate === null ? Error(i(467)) : Error(i(310));
			U = e, e = {
				memoizedState: U.memoizedState,
				baseState: U.baseState,
				baseQueue: U.baseQueue,
				queue: U.queue,
				next: null
			}, fo === null ? H.memoizedState = fo = e : fo = fo.next = e;
		}
		return fo;
	}
	function jo() {
		return {
			lastEffect: null,
			events: null,
			stores: null,
			memoCache: null
		};
	}
	function Mo(e) {
		var t = _o;
		return _o += 1, vo === null && (vo = []), e = Ta(vo, e, t), t = H, (fo === null ? t.memoizedState : fo.next) === null && (t = t.alternate, w.H = t === null || t.memoizedState === null ? zs : Bs), e;
	}
	function No(e) {
		if (typeof e == "object" && e) {
			if (typeof e.then == "function") return Mo(e);
			if (e.$$typeof === ee) return $i(e);
		}
		throw Error(i(438, String(e)));
	}
	function Po(e) {
		var t = null, n = H.updateQueue;
		if (n !== null && (t = n.memoCache), t == null) {
			var r = H.alternate;
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
		}, n === null && (n = jo(), H.updateQueue = n), n.memoCache = t, n = t.data[t.index], n === void 0) for (n = t.data[t.index] = Array(e), r = 0; r < e; r++) n[r] = oe;
		return t.index++, n;
	}
	function Fo(e, t) {
		return typeof t == "function" ? t(e) : t;
	}
	function Io(e) {
		return Lo(Ao(), U, e);
	}
	function Lo(e, t, n) {
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
				if (f === u.lane ? (uo & f) === f : (Y & f) === f) {
					var p = u.revertLane;
					if (p === 0) l !== null && (l = l.next = {
						lane: 0,
						revertLane: 0,
						gesture: null,
						action: u.action,
						hasEagerState: u.hasEagerState,
						eagerState: u.eagerState,
						next: null
					}), f === ua && (d = !0);
					else if ((uo & p) === p) {
						u = u.next, p === ua && (d = !0);
						continue;
					} else f = {
						lane: 0,
						revertLane: u.revertLane,
						gesture: null,
						action: u.action,
						hasEagerState: u.hasEagerState,
						eagerState: u.eagerState,
						next: null
					}, l === null ? (c = l = f, s = o) : l = l.next = f, H.lanes |= p, Gl |= p;
					f = u.action, ho && n(o, f), o = u.hasEagerState ? u.eagerState : n(o, f);
				} else p = {
					lane: f,
					revertLane: u.revertLane,
					gesture: u.gesture,
					action: u.action,
					hasEagerState: u.hasEagerState,
					eagerState: u.eagerState,
					next: null
				}, l === null ? (c = l = p, s = o) : l = l.next = p, H.lanes |= f, Gl |= f;
				u = u.next;
			} while (u !== null && u !== t);
			if (l === null ? s = o : l.next = c, !xr(o, e.memoizedState) && (rc = !0, d && (n = da, n !== null))) throw n;
			e.memoizedState = o, e.baseState = s, e.baseQueue = l, r.lastRenderedState = o;
		}
		return a === null && (r.lanes = 0), [e.memoizedState, r.dispatch];
	}
	function Ro(e) {
		var t = Ao(), n = t.queue;
		if (n === null) throw Error(i(311));
		n.lastRenderedReducer = e;
		var r = n.dispatch, a = n.pending, o = t.memoizedState;
		if (a !== null) {
			n.pending = null;
			var s = a = a.next;
			do
				o = e(o, s.action), s = s.next;
			while (s !== a);
			xr(o, t.memoizedState) || (rc = !0), t.memoizedState = o, t.baseQueue === null && (t.baseState = o), n.lastRenderedState = o;
		}
		return [o, r];
	}
	function zo(e, t, n) {
		var r = H, a = Ao(), o = V;
		if (o) {
			if (n === void 0) throw Error(i(407));
			n = n();
		} else n = t();
		var s = !xr((U || a).memoizedState, n);
		if (s && (a.memoizedState = n, rc = !0), a = a.queue, us(Ho.bind(null, r, a, e), [e]), a.getSnapshot !== t || s || fo !== null && fo.memoizedState.tag & 1) {
			if (r.flags |= 2048, as(9, { destroy: void 0 }, Vo.bind(null, r, a, n, t), null), q === null) throw Error(i(349));
			o || uo & 127 || Bo(r, t, n);
		}
		return n;
	}
	function Bo(e, t, n) {
		e.flags |= 16384, e = {
			getSnapshot: t,
			value: n
		}, t = H.updateQueue, t === null ? (t = jo(), H.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
	}
	function Vo(e, t, n, r) {
		t.value = n, t.getSnapshot = r, Uo(t) && Wo(e);
	}
	function Ho(e, t, n) {
		return n(function() {
			Uo(t) && Wo(e);
		});
	}
	function Uo(e) {
		var t = e.getSnapshot;
		e = e.value;
		try {
			var n = t();
			return !xr(e, n);
		} catch {
			return !0;
		}
	}
	function Wo(e) {
		var t = ni(e, 2);
		t !== null && hu(t, e, 2);
	}
	function Go(e) {
		var t = ko();
		if (typeof e == "function") {
			var n = e;
			if (e = n(), ho) {
				We(!0);
				try {
					n();
				} finally {
					We(!1);
				}
			}
		}
		return t.memoizedState = t.baseState = e, t.queue = {
			pending: null,
			lanes: 0,
			dispatch: null,
			lastRenderedReducer: Fo,
			lastRenderedState: e
		}, t;
	}
	function Ko(e, t, n, r) {
		return e.baseState = n, Lo(e, U, typeof r == "function" ? r : Fo);
	}
	function qo(e, t, n, r, a) {
		if (Fs(e)) throw Error(i(485));
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
			w.T === null ? o.isTransition = !1 : n(!0), r(o), n = t.pending, n === null ? (o.next = t.pending = o, Jo(t, o)) : (o.next = n.next, t.pending = n.next = o);
		}
	}
	function Jo(e, t) {
		var n = t.action, r = t.payload, i = e.state;
		if (t.isTransition) {
			var a = w.T, o = {};
			w.T = o;
			try {
				var s = n(i, r), c = w.S;
				c !== null && c(o, s), Yo(e, t, s);
			} catch (n) {
				Zo(e, t, n);
			} finally {
				a !== null && o.types !== null && (a.types = o.types), w.T = a;
			}
		} else try {
			a = n(i, r), Yo(e, t, a);
		} catch (n) {
			Zo(e, t, n);
		}
	}
	function Yo(e, t, n) {
		typeof n == "object" && n && typeof n.then == "function" ? n.then(function(n) {
			Xo(e, t, n);
		}, function(n) {
			return Zo(e, t, n);
		}) : Xo(e, t, n);
	}
	function Xo(e, t, n) {
		t.status = "fulfilled", t.value = n, Qo(t), e.state = n, t = e.pending, t !== null && (n = t.next, n === t ? e.pending = null : (n = n.next, t.next = n, Jo(e, n)));
	}
	function Zo(e, t, n) {
		var r = e.pending;
		if (e.pending = null, r !== null) {
			r = r.next;
			do
				t.status = "rejected", t.reason = n, Qo(t), t = t.next;
			while (t !== r);
		}
		e.action = null;
	}
	function Qo(e) {
		e = e.listeners;
		for (var t = 0; t < e.length; t++) (0, e[t])();
	}
	function $o(e, t) {
		return t;
	}
	function es(e, t) {
		if (V) {
			var n = q.formState;
			if (n !== null) {
				a: {
					var r = H;
					if (V) {
						if (B) {
							b: {
								for (var i = B, a = Pi; i.nodeType !== 8;) {
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
								B = cf(i.nextSibling), r = i.data === "F!";
								break a;
							}
						}
						Ii(r);
					}
					r = !1;
				}
				r && (t = n[0]);
			}
		}
		return n = ko(), n.memoizedState = n.baseState = t, r = {
			pending: null,
			lanes: 0,
			dispatch: null,
			lastRenderedReducer: $o,
			lastRenderedState: t
		}, n.queue = r, n = Ms.bind(null, H, r), r.dispatch = n, r = Go(!1), a = Ps.bind(null, H, !1, r.queue), r = ko(), i = {
			state: t,
			dispatch: null,
			action: e,
			pending: null
		}, r.queue = i, n = qo.bind(null, H, i, a, n), i.dispatch = n, r.memoizedState = e, [
			t,
			n,
			!1
		];
	}
	function ts(e) {
		return ns(Ao(), U, e);
	}
	function ns(e, t, n) {
		if (t = Lo(e, t, $o)[0], e = Io(Fo)[0], typeof t == "object" && t && typeof t.then == "function") try {
			var r = Mo(t);
		} catch (e) {
			throw e === ba ? Sa : e;
		}
		else r = t;
		t = Ao();
		var i = t.queue, a = i.dispatch;
		return n !== t.memoizedState && (H.flags |= 2048, as(9, { destroy: void 0 }, rs.bind(null, i, n), null)), [
			r,
			a,
			e
		];
	}
	function rs(e, t) {
		e.action = t;
	}
	function is(e) {
		var t = Ao(), n = U;
		if (n !== null) return ns(t, n, e);
		Ao(), t = t.memoizedState, n = Ao();
		var r = n.queue.dispatch;
		return n.memoizedState = e, [
			t,
			r,
			!1
		];
	}
	function as(e, t, n, r) {
		return e = {
			tag: e,
			create: n,
			deps: r,
			inst: t,
			next: null
		}, t = H.updateQueue, t === null && (t = jo(), H.updateQueue = t), n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e), e;
	}
	function os() {
		return Ao().memoizedState;
	}
	function ss(e, t, n, r) {
		var i = ko();
		H.flags |= e, i.memoizedState = as(1 | t, { destroy: void 0 }, n, r === void 0 ? null : r);
	}
	function cs(e, t, n, r) {
		var i = Ao();
		r = r === void 0 ? null : r;
		var a = i.memoizedState.inst;
		U !== null && r !== null && xo(r, U.memoizedState.deps) ? i.memoizedState = as(t, a, n, r) : (H.flags |= e, i.memoizedState = as(1 | t, a, n, r));
	}
	function ls(e, t) {
		ss(8390656, 8, e, t);
	}
	function us(e, t) {
		cs(2048, 8, e, t);
	}
	function ds(e) {
		H.flags |= 4;
		var t = H.updateQueue;
		if (t === null) t = jo(), H.updateQueue = t, t.events = [e];
		else {
			var n = t.events;
			n === null ? t.events = [e] : n.push(e);
		}
	}
	function fs(e) {
		var t = Ao().memoizedState;
		return ds({
			ref: t,
			nextImpl: e
		}), function() {
			if (K & 2) throw Error(i(440));
			return t.impl.apply(void 0, arguments);
		};
	}
	function ps(e, t) {
		return cs(4, 2, e, t);
	}
	function ms(e, t) {
		return cs(4, 4, e, t);
	}
	function hs(e, t) {
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
	function gs(e, t, n) {
		n = n == null ? null : n.concat([e]), cs(4, 4, hs.bind(null, t, e), n);
	}
	function _s() {}
	function vs(e, t) {
		var n = Ao();
		t = t === void 0 ? null : t;
		var r = n.memoizedState;
		return t !== null && xo(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e);
	}
	function ys(e, t) {
		var n = Ao();
		t = t === void 0 ? null : t;
		var r = n.memoizedState;
		if (t !== null && xo(t, r[1])) return r[0];
		if (r = e(), ho) {
			We(!0);
			try {
				e();
			} finally {
				We(!1);
			}
		}
		return n.memoizedState = [r, t], r;
	}
	function bs(e, t, n) {
		return n === void 0 || uo & 1073741824 && !(Y & 261930) ? e.memoizedState = t : (e.memoizedState = n, e = mu(), H.lanes |= e, Gl |= e, n);
	}
	function xs(e, t, n, r) {
		return xr(n, t) ? n : Xa.current === null ? !(uo & 42) || uo & 1073741824 && !(Y & 261930) ? (rc = !0, e.memoizedState = n) : (e = mu(), H.lanes |= e, Gl |= e, t) : (e = bs(e, n, r), xr(e, t) || (rc = !0), e);
	}
	function Ss(e, t, n, r, i) {
		var a = T.p;
		T.p = a !== 0 && 8 > a ? a : 8;
		var o = w.T, s = {};
		w.T = s, Ps(e, !1, t, n);
		try {
			var c = i(), l = w.S;
			l !== null && l(s, c), typeof c == "object" && c && typeof c.then == "function" ? Ns(e, t, ma(c, r), pu(e)) : Ns(e, t, r, pu(e));
		} catch (n) {
			Ns(e, t, {
				then: function() {},
				status: "rejected",
				reason: n
			}, pu());
		} finally {
			T.p = a, o !== null && s.types !== null && (o.types = s.types), w.T = o;
		}
	}
	function Cs() {}
	function ws(e, t, n, r) {
		if (e.tag !== 5) throw Error(i(476));
		var a = Ts(e).queue;
		Ss(e, a, t, fe, n === null ? Cs : function() {
			return Es(e), n(r);
		});
	}
	function Ts(e) {
		var t = e.memoizedState;
		if (t !== null) return t;
		t = {
			memoizedState: fe,
			baseState: fe,
			baseQueue: null,
			queue: {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: Fo,
				lastRenderedState: fe
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
				lastRenderedReducer: Fo,
				lastRenderedState: n
			},
			next: null
		}, e.memoizedState = t, e = e.alternate, e !== null && (e.memoizedState = t), t;
	}
	function Es(e) {
		var t = Ts(e);
		t.next === null && (t = e.alternate.memoizedState), Ns(e, t.next.queue, {}, pu());
	}
	function Ds() {
		return $i(Qf);
	}
	function Os() {
		return Ao().memoizedState;
	}
	function ks() {
		return Ao().memoizedState;
	}
	function As(e) {
		for (var t = e.return; t !== null;) {
			switch (t.tag) {
				case 24:
				case 3:
					var n = pu();
					e = Va(n);
					var r = Ha(t, e, n);
					r !== null && (hu(r, t, n), Ua(r, t, n)), t = { cache: oa() }, e.payload = t;
					return;
			}
			t = t.return;
		}
	}
	function js(e, t, n) {
		var r = pu();
		n = {
			lane: r,
			revertLane: 0,
			gesture: null,
			action: n,
			hasEagerState: !1,
			eagerState: null,
			next: null
		}, Fs(e) ? Is(t, n) : (n = ti(e, t, n, r), n !== null && (hu(n, e, r), Ls(n, t, r)));
	}
	function Ms(e, t, n) {
		Ns(e, t, n, pu());
	}
	function Ns(e, t, n, r) {
		var i = {
			lane: r,
			revertLane: 0,
			gesture: null,
			action: n,
			hasEagerState: !1,
			eagerState: null,
			next: null
		};
		if (Fs(e)) Is(t, i);
		else {
			var a = e.alternate;
			if (e.lanes === 0 && (a === null || a.lanes === 0) && (a = t.lastRenderedReducer, a !== null)) try {
				var o = t.lastRenderedState, s = a(o, n);
				if (i.hasEagerState = !0, i.eagerState = s, xr(s, o)) return ei(e, t, i, 0), q === null && $r(), !1;
			} catch {}
			if (n = ti(e, t, i, r), n !== null) return hu(n, e, r), Ls(n, t, r), !0;
		}
		return !1;
	}
	function Ps(e, t, n, r) {
		if (r = {
			lane: 2,
			revertLane: dd(),
			gesture: null,
			action: r,
			hasEagerState: !1,
			eagerState: null,
			next: null
		}, Fs(e)) {
			if (t) throw Error(i(479));
		} else t = ti(e, n, r, 2), t !== null && hu(t, e, 2);
	}
	function Fs(e) {
		var t = e.alternate;
		return e === H || t !== null && t === H;
	}
	function Is(e, t) {
		mo = po = !0;
		var n = e.pending;
		n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
	}
	function Ls(e, t, n) {
		if (n & 4194048) {
			var r = t.lanes;
			r &= e.pendingLanes, n |= r, t.lanes = n, ot(e, n);
		}
	}
	var Rs = {
		readContext: $i,
		use: No,
		useCallback: bo,
		useContext: bo,
		useEffect: bo,
		useImperativeHandle: bo,
		useLayoutEffect: bo,
		useInsertionEffect: bo,
		useMemo: bo,
		useReducer: bo,
		useRef: bo,
		useState: bo,
		useDebugValue: bo,
		useDeferredValue: bo,
		useTransition: bo,
		useSyncExternalStore: bo,
		useId: bo,
		useHostTransitionStatus: bo,
		useFormState: bo,
		useActionState: bo,
		useOptimistic: bo,
		useMemoCache: bo,
		useCacheRefresh: bo
	};
	Rs.useEffectEvent = bo;
	var zs = {
		readContext: $i,
		use: No,
		useCallback: function(e, t) {
			return ko().memoizedState = [e, t === void 0 ? null : t], e;
		},
		useContext: $i,
		useEffect: ls,
		useImperativeHandle: function(e, t, n) {
			n = n == null ? null : n.concat([e]), ss(4194308, 4, hs.bind(null, t, e), n);
		},
		useLayoutEffect: function(e, t) {
			return ss(4194308, 4, e, t);
		},
		useInsertionEffect: function(e, t) {
			ss(4, 2, e, t);
		},
		useMemo: function(e, t) {
			var n = ko();
			t = t === void 0 ? null : t;
			var r = e();
			if (ho) {
				We(!0);
				try {
					e();
				} finally {
					We(!1);
				}
			}
			return n.memoizedState = [r, t], r;
		},
		useReducer: function(e, t, n) {
			var r = ko();
			if (n !== void 0) {
				var i = n(t);
				if (ho) {
					We(!0);
					try {
						n(t);
					} finally {
						We(!1);
					}
				}
			} else i = t;
			return r.memoizedState = r.baseState = i, e = {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: e,
				lastRenderedState: i
			}, r.queue = e, e = e.dispatch = js.bind(null, H, e), [r.memoizedState, e];
		},
		useRef: function(e) {
			var t = ko();
			return e = { current: e }, t.memoizedState = e;
		},
		useState: function(e) {
			e = Go(e);
			var t = e.queue, n = Ms.bind(null, H, t);
			return t.dispatch = n, [e.memoizedState, n];
		},
		useDebugValue: _s,
		useDeferredValue: function(e, t) {
			return bs(ko(), e, t);
		},
		useTransition: function() {
			var e = Go(!1);
			return e = Ss.bind(null, H, e.queue, !0, !1), ko().memoizedState = e, [!1, e];
		},
		useSyncExternalStore: function(e, t, n) {
			var r = H, a = ko();
			if (V) {
				if (n === void 0) throw Error(i(407));
				n = n();
			} else {
				if (n = t(), q === null) throw Error(i(349));
				Y & 127 || Bo(r, t, n);
			}
			a.memoizedState = n;
			var o = {
				value: n,
				getSnapshot: t
			};
			return a.queue = o, ls(Ho.bind(null, r, o, e), [e]), r.flags |= 2048, as(9, { destroy: void 0 }, Vo.bind(null, r, o, n, t), null), n;
		},
		useId: function() {
			var e = ko(), t = q.identifierPrefix;
			if (V) {
				var n = Ei, r = Ti;
				n = (r & ~(1 << 32 - j(r) - 1)).toString(32) + n, t = "_" + t + "R_" + n, n = go++, 0 < n && (t += "H" + n.toString(32)), t += "_";
			} else n = yo++, t = "_" + t + "r_" + n.toString(32) + "_";
			return e.memoizedState = t;
		},
		useHostTransitionStatus: Ds,
		useFormState: es,
		useActionState: es,
		useOptimistic: function(e) {
			var t = ko();
			t.memoizedState = t.baseState = e;
			var n = {
				pending: null,
				lanes: 0,
				dispatch: null,
				lastRenderedReducer: null,
				lastRenderedState: null
			};
			return t.queue = n, t = Ps.bind(null, H, !0, n), n.dispatch = t, [e, t];
		},
		useMemoCache: Po,
		useCacheRefresh: function() {
			return ko().memoizedState = As.bind(null, H);
		},
		useEffectEvent: function(e) {
			var t = ko(), n = { impl: e };
			return t.memoizedState = n, function() {
				if (K & 2) throw Error(i(440));
				return n.impl.apply(void 0, arguments);
			};
		}
	}, Bs = {
		readContext: $i,
		use: No,
		useCallback: vs,
		useContext: $i,
		useEffect: us,
		useImperativeHandle: gs,
		useInsertionEffect: ps,
		useLayoutEffect: ms,
		useMemo: ys,
		useReducer: Io,
		useRef: os,
		useState: function() {
			return Io(Fo);
		},
		useDebugValue: _s,
		useDeferredValue: function(e, t) {
			return xs(Ao(), U.memoizedState, e, t);
		},
		useTransition: function() {
			var e = Io(Fo)[0], t = Ao().memoizedState;
			return [typeof e == "boolean" ? e : Mo(e), t];
		},
		useSyncExternalStore: zo,
		useId: Os,
		useHostTransitionStatus: Ds,
		useFormState: ts,
		useActionState: ts,
		useOptimistic: function(e, t) {
			return Ko(Ao(), U, e, t);
		},
		useMemoCache: Po,
		useCacheRefresh: ks
	};
	Bs.useEffectEvent = fs;
	var Vs = {
		readContext: $i,
		use: No,
		useCallback: vs,
		useContext: $i,
		useEffect: us,
		useImperativeHandle: gs,
		useInsertionEffect: ps,
		useLayoutEffect: ms,
		useMemo: ys,
		useReducer: Ro,
		useRef: os,
		useState: function() {
			return Ro(Fo);
		},
		useDebugValue: _s,
		useDeferredValue: function(e, t) {
			var n = Ao();
			return U === null ? bs(n, e, t) : xs(n, U.memoizedState, e, t);
		},
		useTransition: function() {
			var e = Ro(Fo)[0], t = Ao().memoizedState;
			return [typeof e == "boolean" ? e : Mo(e), t];
		},
		useSyncExternalStore: zo,
		useId: Os,
		useHostTransitionStatus: Ds,
		useFormState: is,
		useActionState: is,
		useOptimistic: function(e, t) {
			var n = Ao();
			return U === null ? (n.baseState = e, [e, n.queue.dispatch]) : Ko(n, U, e, t);
		},
		useMemoCache: Po,
		useCacheRefresh: ks
	};
	Vs.useEffectEvent = fs;
	function Hs(e, t, n, r) {
		t = e.memoizedState, n = n(r, t), n = n == null ? t : h({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
	}
	var Us = {
		enqueueSetState: function(e, t, n) {
			e = e._reactInternals;
			var r = pu(), i = Va(r);
			i.payload = t, n != null && (i.callback = n), t = Ha(e, i, r), t !== null && (hu(t, e, r), Ua(t, e, r));
		},
		enqueueReplaceState: function(e, t, n) {
			e = e._reactInternals;
			var r = pu(), i = Va(r);
			i.tag = 1, i.payload = t, n != null && (i.callback = n), t = Ha(e, i, r), t !== null && (hu(t, e, r), Ua(t, e, r));
		},
		enqueueForceUpdate: function(e, t) {
			e = e._reactInternals;
			var n = pu(), r = Va(n);
			r.tag = 2, t != null && (r.callback = t), t = Ha(e, r, n), t !== null && (hu(t, e, n), Ua(t, e, n));
		}
	};
	function Ws(e, t, n, r, i, a, o) {
		return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, a, o) : t.prototype && t.prototype.isPureReactComponent ? !Sr(n, r) || !Sr(i, a) : !0;
	}
	function Gs(e, t, n, r) {
		e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== e && Us.enqueueReplaceState(t, t.state, null);
	}
	function Ks(e, t) {
		var n = t;
		if ("ref" in t) for (var r in n = {}, t) r !== "ref" && (n[r] = t[r]);
		if (e = e.defaultProps) for (var i in n === t && (n = h({}, n)), e) n[i] === void 0 && (n[i] = e[i]);
		return n;
	}
	function qs(e) {
		Yr(e);
	}
	function Js(e) {
		console.error(e);
	}
	function Ys(e) {
		Yr(e);
	}
	function Xs(e, t) {
		try {
			var n = e.onUncaughtError;
			n(t.value, { componentStack: t.stack });
		} catch (e) {
			setTimeout(function() {
				throw e;
			});
		}
	}
	function Zs(e, t, n) {
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
	function Qs(e, t, n) {
		return n = Va(n), n.tag = 3, n.payload = { element: null }, n.callback = function() {
			Xs(e, t);
		}, n;
	}
	function $s(e) {
		return e = Va(e), e.tag = 3, e;
	}
	function ec(e, t, n, r) {
		var i = n.type.getDerivedStateFromError;
		if (typeof i == "function") {
			var a = r.value;
			e.payload = function() {
				return i(a);
			}, e.callback = function() {
				Zs(t, n, r);
			};
		}
		var o = n.stateNode;
		o !== null && typeof o.componentDidCatch == "function" && (e.callback = function() {
			Zs(t, n, r), typeof i != "function" && (ru === null ? ru = new Set([this]) : ru.add(this));
			var e = r.stack;
			this.componentDidCatch(r.value, { componentStack: e === null ? "" : e });
		});
	}
	function tc(e, t, n, r, a) {
		if (n.flags |= 32768, typeof r == "object" && r && typeof r.then == "function") {
			if (t = n.alternate, t !== null && Xi(t, n, a, !0), n = to.current, n !== null) {
				switch (n.tag) {
					case 31:
					case 13: return no === null ? Du() : n.alternate === null && Wl === 0 && (Wl = 3), n.flags &= -257, n.flags |= 65536, n.lanes = a, r === Ca ? n.flags |= 16384 : (t = n.updateQueue, t === null ? n.updateQueue = new Set([r]) : t.add(r), Gu(e, r, a)), !1;
					case 22: return n.flags |= 65536, r === Ca ? n.flags |= 16384 : (t = n.updateQueue, t === null ? (t = {
						transitions: null,
						markerInstances: null,
						retryQueue: new Set([r])
					}, n.updateQueue = t) : (n = t.retryQueue, n === null ? t.retryQueue = new Set([r]) : n.add(r)), Gu(e, r, a)), !1;
				}
				throw Error(i(435, n.tag));
			}
			return Gu(e, r, a), Du(), !1;
		}
		if (V) return t = to.current, t === null ? (r !== Fi && (t = Error(i(423), { cause: r }), Hi(_i(t, n))), e = e.current.alternate, e.flags |= 65536, a &= -a, e.lanes |= a, r = _i(r, n), a = Qs(e.stateNode, r, a), Wa(e, a), Wl !== 4 && (Wl = 2)) : (!(t.flags & 65536) && (t.flags |= 256), t.flags |= 65536, t.lanes = a, r !== Fi && (e = Error(i(422), { cause: r }), Hi(_i(e, n)))), !1;
		var o = Error(i(520), { cause: r });
		if (o = _i(o, n), Xl === null ? Xl = [o] : Xl.push(o), Wl !== 4 && (Wl = 2), t === null) return !0;
		r = _i(r, n), n = t;
		do {
			switch (n.tag) {
				case 3: return n.flags |= 65536, e = a & -a, n.lanes |= e, e = Qs(n.stateNode, r, e), Wa(n, e), !1;
				case 1: if (t = n.type, o = n.stateNode, !(n.flags & 128) && (typeof t.getDerivedStateFromError == "function" || o !== null && typeof o.componentDidCatch == "function" && (ru === null || !ru.has(o)))) return n.flags |= 65536, a &= -a, n.lanes |= a, a = $s(a), ec(a, e, n, r), Wa(n, a), !1;
			}
			n = n.return;
		} while (n !== null);
		return !1;
	}
	var nc = Error(i(461)), rc = !1;
	function ic(e, t, n, r) {
		t.child = e === null ? La(t, null, n, r) : Ia(t, e.child, n, r);
	}
	function ac(e, t, n, r, i) {
		n = n.render;
		var a = t.ref;
		if ("ref" in r) {
			var o = {};
			for (var s in r) s !== "ref" && (o[s] = r[s]);
		} else o = r;
		return Qi(t), r = So(e, t, n, o, a, i), s = Eo(), e !== null && !rc ? (Do(e, t, i), kc(e, t, i)) : (V && s && ki(t), t.flags |= 1, ic(e, t, r, i), t.child);
	}
	function oc(e, t, n, r, i) {
		if (e === null) {
			var a = n.type;
			return typeof a == "function" && !ci(a) && a.defaultProps === void 0 && n.compare === null ? (t.tag = 15, t.type = a, sc(e, t, a, r, i)) : (e = di(n.type, null, r, t, t.mode, i), e.ref = t.ref, e.return = t, t.child = e);
		}
		if (a = e.child, !Ac(e, i)) {
			var o = a.memoizedProps;
			if (n = n.compare, n = n === null ? Sr : n, n(o, r) && e.ref === t.ref) return kc(e, t, i);
		}
		return t.flags |= 1, e = li(a, r), e.ref = t.ref, e.return = t, t.child = e;
	}
	function sc(e, t, n, r, i) {
		if (e !== null) {
			var a = e.memoizedProps;
			if (Sr(a, r) && e.ref === t.ref) if (rc = !1, t.pendingProps = r = a, Ac(e, i)) e.flags & 131072 && (rc = !0);
			else return t.lanes = e.lanes, kc(e, t, i);
		}
		return hc(e, t, n, r, i);
	}
	function cc(e, t, n, r) {
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
				return uc(e, t, a, n, r);
			}
			if (n & 536870912) t.memoizedState = {
				baseLanes: 0,
				cachePool: null
			}, e !== null && va(t, a === null ? null : a.cachePool), a === null ? $a() : Qa(t, a), ao(t);
			else return r = t.lanes = 536870912, uc(e, t, a === null ? n : a.baseLanes | n, n, r);
		} else a === null ? (e !== null && va(t, null), $a(), oo(t)) : (va(t, a.cachePool), Qa(t, a), oo(t), t.memoizedState = null);
		return ic(e, t, i, n), t.child;
	}
	function lc(e, t) {
		return e !== null && e.tag === 22 || t.stateNode !== null || (t.stateNode = {
			_visibility: 1,
			_pendingMarkers: null,
			_retryCache: null,
			_transitions: null
		}), t.sibling;
	}
	function uc(e, t, n, r, i) {
		var a = _a();
		return a = a === null ? null : {
			parent: aa._currentValue,
			pool: a
		}, t.memoizedState = {
			baseLanes: n,
			cachePool: a
		}, e !== null && va(t, null), $a(), ao(t), e !== null && Xi(e, t, r, !0), t.childLanes = i, null;
	}
	function dc(e, t) {
		return t = wc({
			mode: t.mode,
			children: t.children
		}, e.mode), t.ref = e.ref, e.child = t, t.return = e, t;
	}
	function fc(e, t, n) {
		return Ia(t, e.child, null, n), e = dc(t, t.pendingProps), e.flags |= 2, so(t), t.memoizedState = null, e;
	}
	function pc(e, t, n) {
		var r = t.pendingProps, a = (t.flags & 128) != 0;
		if (t.flags &= -129, e === null) {
			if (V) {
				if (r.mode === "hidden") return e = dc(t, r), t.lanes = 536870912, lc(null, e);
				if (io(t), (e = B) ? (e = rf(e, Pi), e = e !== null && e.data === "&" ? e : null, e !== null && (t.memoizedState = {
					dehydrated: e,
					treeContext: wi === null ? null : {
						id: Ti,
						overflow: Ei
					},
					retryLane: 536870912,
					hydrationErrors: null
				}, n = mi(e), n.return = t, t.child = n, Mi = t, B = null)) : e = null, e === null) throw Ii(t);
				return t.lanes = 536870912, null;
			}
			return dc(t, r);
		}
		var o = e.memoizedState;
		if (o !== null) {
			var s = o.dehydrated;
			if (io(t), a) if (t.flags & 256) t.flags &= -257, t = fc(e, t, n);
			else if (t.memoizedState !== null) t.child = e.child, t.flags |= 128, t = null;
			else throw Error(i(558));
			else if (rc || Xi(e, t, n, !1), a = (n & e.childLanes) !== 0, rc || a) {
				if (r = q, r !== null && (s = M(r, n), s !== 0 && s !== o.retryLane)) throw o.retryLane = s, ni(e, s), hu(r, e, s), nc;
				Du(), t = fc(e, t, n);
			} else e = o.treeContext, B = cf(s.nextSibling), Mi = t, V = !0, Ni = null, Pi = !1, e !== null && ji(t, e), t = dc(t, r), t.flags |= 4096;
			return t;
		}
		return e = li(e.child, {
			mode: r.mode,
			children: r.children
		}), e.ref = t.ref, t.child = e, e.return = t, e;
	}
	function mc(e, t) {
		var n = t.ref;
		if (n === null) e !== null && e.ref !== null && (t.flags |= 4194816);
		else {
			if (typeof n != "function" && typeof n != "object") throw Error(i(284));
			(e === null || e.ref !== n) && (t.flags |= 4194816);
		}
	}
	function hc(e, t, n, r, i) {
		return Qi(t), n = So(e, t, n, r, void 0, i), r = Eo(), e !== null && !rc ? (Do(e, t, i), kc(e, t, i)) : (V && r && ki(t), t.flags |= 1, ic(e, t, n, i), t.child);
	}
	function gc(e, t, n, r, i, a) {
		return Qi(t), t.updateQueue = null, n = wo(t, r, n, i), Co(e), r = Eo(), e !== null && !rc ? (Do(e, t, a), kc(e, t, a)) : (V && r && ki(t), t.flags |= 1, ic(e, t, n, a), t.child);
	}
	function _c(e, t, n, r, i) {
		if (Qi(t), t.stateNode === null) {
			var a = ai, o = n.contextType;
			typeof o == "object" && o && (a = $i(o)), a = new n(r, a), t.memoizedState = a.state !== null && a.state !== void 0 ? a.state : null, a.updater = Us, t.stateNode = a, a._reactInternals = t, a = t.stateNode, a.props = r, a.state = t.memoizedState, a.refs = {}, za(t), o = n.contextType, a.context = typeof o == "object" && o ? $i(o) : ai, a.state = t.memoizedState, o = n.getDerivedStateFromProps, typeof o == "function" && (Hs(t, n, o, r), a.state = t.memoizedState), typeof n.getDerivedStateFromProps == "function" || typeof a.getSnapshotBeforeUpdate == "function" || typeof a.UNSAFE_componentWillMount != "function" && typeof a.componentWillMount != "function" || (o = a.state, typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount(), o !== a.state && Us.enqueueReplaceState(a, a.state, null), qa(t, r, a, i), Ka(), a.state = t.memoizedState), typeof a.componentDidMount == "function" && (t.flags |= 4194308), r = !0;
		} else if (e === null) {
			a = t.stateNode;
			var s = t.memoizedProps, c = Ks(n, s);
			a.props = c;
			var l = a.context, u = n.contextType;
			o = ai, typeof u == "object" && u && (o = $i(u));
			var d = n.getDerivedStateFromProps;
			u = typeof d == "function" || typeof a.getSnapshotBeforeUpdate == "function", s = t.pendingProps !== s, u || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (s || l !== o) && Gs(t, a, r, o), Ra = !1;
			var f = t.memoizedState;
			a.state = f, qa(t, r, a, i), Ka(), l = t.memoizedState, s || f !== l || Ra ? (typeof d == "function" && (Hs(t, n, d, r), l = t.memoizedState), (c = Ra || Ws(t, n, c, r, f, l, o)) ? (u || typeof a.UNSAFE_componentWillMount != "function" && typeof a.componentWillMount != "function" || (typeof a.componentWillMount == "function" && a.componentWillMount(), typeof a.UNSAFE_componentWillMount == "function" && a.UNSAFE_componentWillMount()), typeof a.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = r, t.memoizedState = l), a.props = r, a.state = l, a.context = o, r = c) : (typeof a.componentDidMount == "function" && (t.flags |= 4194308), r = !1);
		} else {
			a = t.stateNode, Ba(e, t), o = t.memoizedProps, u = Ks(n, o), a.props = u, d = t.pendingProps, f = a.context, l = n.contextType, c = ai, typeof l == "object" && l && (c = $i(l)), s = n.getDerivedStateFromProps, (l = typeof s == "function" || typeof a.getSnapshotBeforeUpdate == "function") || typeof a.UNSAFE_componentWillReceiveProps != "function" && typeof a.componentWillReceiveProps != "function" || (o !== d || f !== c) && Gs(t, a, r, c), Ra = !1, f = t.memoizedState, a.state = f, qa(t, r, a, i), Ka();
			var p = t.memoizedState;
			o !== d || f !== p || Ra || e !== null && e.dependencies !== null && Zi(e.dependencies) ? (typeof s == "function" && (Hs(t, n, s, r), p = t.memoizedState), (u = Ra || Ws(t, n, u, r, f, p, c) || e !== null && e.dependencies !== null && Zi(e.dependencies)) ? (l || typeof a.UNSAFE_componentWillUpdate != "function" && typeof a.componentWillUpdate != "function" || (typeof a.componentWillUpdate == "function" && a.componentWillUpdate(r, p, c), typeof a.UNSAFE_componentWillUpdate == "function" && a.UNSAFE_componentWillUpdate(r, p, c)), typeof a.componentDidUpdate == "function" && (t.flags |= 4), typeof a.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof a.componentDidUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = p), a.props = r, a.state = p, a.context = c, r = u) : (typeof a.componentDidUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 4), typeof a.getSnapshotBeforeUpdate != "function" || o === e.memoizedProps && f === e.memoizedState || (t.flags |= 1024), r = !1);
		}
		return a = r, mc(e, t), r = (t.flags & 128) != 0, a || r ? (a = t.stateNode, n = r && typeof n.getDerivedStateFromError != "function" ? null : a.render(), t.flags |= 1, e !== null && r ? (t.child = Ia(t, e.child, null, i), t.child = Ia(t, null, n, i)) : ic(e, t, n, i), t.memoizedState = a.state, e = t.child) : e = kc(e, t, i), e;
	}
	function vc(e, t, n, r) {
		return Bi(), t.flags |= 256, ic(e, t, n, r), t.child;
	}
	var yc = {
		dehydrated: null,
		treeContext: null,
		retryLane: 0,
		hydrationErrors: null
	};
	function bc(e) {
		return {
			baseLanes: e,
			cachePool: ya()
		};
	}
	function xc(e, t, n) {
		return e = e === null ? 0 : e.childLanes & ~n, t && (e |= Jl), e;
	}
	function Sc(e, t, n) {
		var r = t.pendingProps, a = !1, o = (t.flags & 128) != 0, s;
		if ((s = o) || (s = e !== null && e.memoizedState === null ? !1 : (co.current & 2) != 0), s && (a = !0, t.flags &= -129), s = (t.flags & 32) != 0, t.flags &= -33, e === null) {
			if (V) {
				if (a ? ro(t) : oo(t), (e = B) ? (e = rf(e, Pi), e = e !== null && e.data !== "&" ? e : null, e !== null && (t.memoizedState = {
					dehydrated: e,
					treeContext: wi === null ? null : {
						id: Ti,
						overflow: Ei
					},
					retryLane: 536870912,
					hydrationErrors: null
				}, n = mi(e), n.return = t, t.child = n, Mi = t, B = null)) : e = null, e === null) throw Ii(t);
				return of(e) ? t.lanes = 32 : t.lanes = 536870912, null;
			}
			var c = r.children;
			return r = r.fallback, a ? (oo(t), a = t.mode, c = wc({
				mode: "hidden",
				children: c
			}, a), r = fi(r, a, n, null), c.return = t, r.return = t, c.sibling = r, t.child = c, r = t.child, r.memoizedState = bc(n), r.childLanes = xc(e, s, n), t.memoizedState = yc, lc(null, r)) : (ro(t), Cc(t, c));
		}
		var l = e.memoizedState;
		if (l !== null && (c = l.dehydrated, c !== null)) {
			if (o) t.flags & 256 ? (ro(t), t.flags &= -257, t = Tc(e, t, n)) : t.memoizedState === null ? (oo(t), c = r.fallback, a = t.mode, r = wc({
				mode: "visible",
				children: r.children
			}, a), c = fi(c, a, n, null), c.flags |= 2, r.return = t, c.return = t, r.sibling = c, t.child = r, Ia(t, e.child, null, n), r = t.child, r.memoizedState = bc(n), r.childLanes = xc(e, s, n), t.memoizedState = yc, t = lc(null, r)) : (oo(t), t.child = e.child, t.flags |= 128, t = null);
			else if (ro(t), of(c)) {
				if (s = c.nextSibling && c.nextSibling.dataset, s) var u = s.dgst;
				s = u, r = Error(i(419)), r.stack = "", r.digest = s, Hi({
					value: r,
					source: null,
					stack: null
				}), t = Tc(e, t, n);
			} else if (rc || Xi(e, t, n, !1), s = (n & e.childLanes) !== 0, rc || s) {
				if (s = q, s !== null && (r = M(s, n), r !== 0 && r !== l.retryLane)) throw l.retryLane = r, ni(e, r), hu(s, e, r), nc;
				af(c) || Du(), t = Tc(e, t, n);
			} else af(c) ? (t.flags |= 192, t.child = e.child, t = null) : (e = l.treeContext, B = cf(c.nextSibling), Mi = t, V = !0, Ni = null, Pi = !1, e !== null && ji(t, e), t = Cc(t, r.children), t.flags |= 4096);
			return t;
		}
		return a ? (oo(t), c = r.fallback, a = t.mode, l = e.child, u = l.sibling, r = li(l, {
			mode: "hidden",
			children: r.children
		}), r.subtreeFlags = l.subtreeFlags & 65011712, u === null ? (c = fi(c, a, n, null), c.flags |= 2) : c = li(u, c), c.return = t, r.return = t, r.sibling = c, t.child = r, lc(null, r), r = t.child, c = e.child.memoizedState, c === null ? c = bc(n) : (a = c.cachePool, a === null ? a = ya() : (l = aa._currentValue, a = a.parent === l ? a : {
			parent: l,
			pool: l
		}), c = {
			baseLanes: c.baseLanes | n,
			cachePool: a
		}), r.memoizedState = c, r.childLanes = xc(e, s, n), t.memoizedState = yc, lc(e.child, r)) : (ro(t), n = e.child, e = n.sibling, n = li(n, {
			mode: "visible",
			children: r.children
		}), n.return = t, n.sibling = null, e !== null && (s = t.deletions, s === null ? (t.deletions = [e], t.flags |= 16) : s.push(e)), t.child = n, t.memoizedState = null, n);
	}
	function Cc(e, t) {
		return t = wc({
			mode: "visible",
			children: t
		}, e.mode), t.return = e, e.child = t;
	}
	function wc(e, t) {
		return e = si(22, e, null, t), e.lanes = 0, e;
	}
	function Tc(e, t, n) {
		return Ia(t, e.child, null, n), e = Cc(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
	}
	function Ec(e, t, n) {
		e.lanes |= t;
		var r = e.alternate;
		r !== null && (r.lanes |= t), Ji(e.return, t, n);
	}
	function Dc(e, t, n, r, i, a) {
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
	function Oc(e, t, n) {
		var r = t.pendingProps, i = r.revealOrder, a = r.tail;
		r = r.children;
		var o = co.current, s = (o & 2) != 0;
		if (s ? (o = o & 1 | 2, t.flags |= 128) : o &= 1, D(co, o), ic(e, t, r, n), r = V ? xi : 0, !s && e !== null && e.flags & 128) a: for (e = t.child; e !== null;) {
			if (e.tag === 13) e.memoizedState !== null && Ec(e, n, t);
			else if (e.tag === 19) Ec(e, n, t);
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
				for (n = t.child, i = null; n !== null;) e = n.alternate, e !== null && lo(e) === null && (i = n), n = n.sibling;
				n = i, n === null ? (i = t.child, t.child = null) : (i = n.sibling, n.sibling = null), Dc(t, !1, i, n, a, r);
				break;
			case "backwards":
			case "unstable_legacy-backwards":
				for (n = null, i = t.child, t.child = null; i !== null;) {
					if (e = i.alternate, e !== null && lo(e) === null) {
						t.child = i;
						break;
					}
					e = i.sibling, i.sibling = n, n = i, i = e;
				}
				Dc(t, !0, n, null, a, r);
				break;
			case "together":
				Dc(t, !1, null, null, void 0, r);
				break;
			default: t.memoizedState = null;
		}
		return t.child;
	}
	function kc(e, t, n) {
		if (e !== null && (t.dependencies = e.dependencies), Gl |= t.lanes, (n & t.childLanes) === 0) if (e !== null) {
			if (Xi(e, t, n, !1), (n & t.childLanes) === 0) return null;
		} else return null;
		if (e !== null && t.child !== e.child) throw Error(i(153));
		if (t.child !== null) {
			for (e = t.child, n = li(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null;) e = e.sibling, n = n.sibling = li(e, e.pendingProps), n.return = t;
			n.sibling = null;
		}
		return t.child;
	}
	function Ac(e, t) {
		return (e.lanes & t) === 0 ? (e = e.dependencies, !!(e !== null && Zi(e))) : !0;
	}
	function jc(e, t, n) {
		switch (t.tag) {
			case 3:
				ve(t, t.stateNode.containerInfo), Ki(t, aa, e.memoizedState.cache), Bi();
				break;
			case 27:
			case 5:
				ye(t);
				break;
			case 4:
				ve(t, t.stateNode.containerInfo);
				break;
			case 10:
				Ki(t, t.type, t.memoizedProps.value);
				break;
			case 31:
				if (t.memoizedState !== null) return t.flags |= 128, io(t), null;
				break;
			case 13:
				var r = t.memoizedState;
				if (r !== null) return r.dehydrated === null ? (n & t.child.childLanes) === 0 ? (ro(t), e = kc(e, t, n), e === null ? null : e.sibling) : Sc(e, t, n) : (ro(t), t.flags |= 128, null);
				ro(t);
				break;
			case 19:
				var i = (e.flags & 128) != 0;
				if (r = (n & t.childLanes) !== 0, r ||= (Xi(e, t, n, !1), (n & t.childLanes) !== 0), i) {
					if (r) return Oc(e, t, n);
					t.flags |= 128;
				}
				if (i = t.memoizedState, i !== null && (i.rendering = null, i.tail = null, i.lastEffect = null), D(co, co.current), r) break;
				return null;
			case 22: return t.lanes = 0, cc(e, t, n, t.pendingProps);
			case 24: Ki(t, aa, e.memoizedState.cache);
		}
		return kc(e, t, n);
	}
	function Mc(e, t, n) {
		if (e !== null) if (e.memoizedProps !== t.pendingProps) rc = !0;
		else {
			if (!Ac(e, n) && !(t.flags & 128)) return rc = !1, jc(e, t, n);
			rc = !!(e.flags & 131072);
		}
		else rc = !1, V && t.flags & 1048576 && Oi(t, xi, t.index);
		switch (t.lanes = 0, t.tag) {
			case 16:
				a: {
					var r = t.pendingProps;
					if (e = Ea(t.elementType), t.type = e, typeof e == "function") ci(e) ? (r = Ks(e, r), t.tag = 1, t = _c(null, t, e, r, n)) : (t.tag = 0, t = hc(null, t, e, r, n));
					else {
						if (e != null) {
							var a = e.$$typeof;
							if (a === C) {
								t.tag = 11, t = ac(null, t, e, r, n);
								break a;
							} else if (a === re) {
								t.tag = 14, t = oc(null, t, e, r, n);
								break a;
							}
						}
						throw t = ue(e) || e, Error(i(306, t, ""));
					}
				}
				return t;
			case 0: return hc(e, t, t.type, t.pendingProps, n);
			case 1: return r = t.type, a = Ks(r, t.pendingProps), _c(e, t, r, a, n);
			case 3:
				a: {
					if (ve(t, t.stateNode.containerInfo), e === null) throw Error(i(387));
					r = t.pendingProps;
					var o = t.memoizedState;
					a = o.element, Ba(e, t), qa(t, r, null, n);
					var s = t.memoizedState;
					if (r = s.cache, Ki(t, aa, r), r !== o.cache && Yi(t, [aa], n, !0), Ka(), r = s.element, o.isDehydrated) if (o = {
						element: r,
						isDehydrated: !1,
						cache: s.cache
					}, t.updateQueue.baseState = o, t.memoizedState = o, t.flags & 256) {
						t = vc(e, t, r, n);
						break a;
					} else if (r !== a) {
						a = _i(Error(i(424)), t), Hi(a), t = vc(e, t, r, n);
						break a;
					} else {
						switch (e = t.stateNode.containerInfo, e.nodeType) {
							case 9:
								e = e.body;
								break;
							default: e = e.nodeName === "HTML" ? e.ownerDocument.body : e;
						}
						for (B = cf(e.firstChild), Mi = t, V = !0, Ni = null, Pi = !0, n = La(t, null, r, n), t.child = n; n;) n.flags = n.flags & -3 | 4096, n = n.sibling;
					}
					else {
						if (Bi(), r === a) {
							t = kc(e, t, n);
							break a;
						}
						ic(e, t, r, n);
					}
					t = t.child;
				}
				return t;
			case 26: return mc(e, t), e === null ? (n = kf(t.type, null, t.pendingProps, null)) ? t.memoizedState = n : V || (n = t.type, e = t.pendingProps, r = Bd(O.current).createElement(n), r[I] = t, r[lt] = e, Pd(r, n, e), bt(r), t.stateNode = r) : t.memoizedState = kf(t.type, e.memoizedProps, t.pendingProps, e.memoizedState), null;
			case 27: return ye(t), e === null && V && (r = t.stateNode = ff(t.type, t.pendingProps, O.current), Mi = t, Pi = !0, a = B, Zd(t.type) ? (lf = a, B = cf(r.firstChild)) : B = a), ic(e, t, t.pendingProps.children, n), mc(e, t), e === null && (t.flags |= 4194304), t.child;
			case 5: return e === null && V && ((a = r = B) && (r = tf(r, t.type, t.pendingProps, Pi), r === null ? a = !1 : (t.stateNode = r, Mi = t, B = cf(r.firstChild), Pi = !1, a = !0)), a || Ii(t)), ye(t), a = t.type, o = t.pendingProps, s = e === null ? null : e.memoizedProps, r = o.children, Ud(a, o) ? r = null : s !== null && Ud(a, s) && (t.flags |= 32), t.memoizedState !== null && (a = So(e, t, To, null, null, n), Qf._currentValue = a), mc(e, t), ic(e, t, r, n), t.child;
			case 6: return e === null && V && ((e = n = B) && (n = nf(n, t.pendingProps, Pi), n === null ? e = !1 : (t.stateNode = n, Mi = t, B = null, e = !0)), e || Ii(t)), null;
			case 13: return Sc(e, t, n);
			case 4: return ve(t, t.stateNode.containerInfo), r = t.pendingProps, e === null ? t.child = Ia(t, null, r, n) : ic(e, t, r, n), t.child;
			case 11: return ac(e, t, t.type, t.pendingProps, n);
			case 7: return ic(e, t, t.pendingProps, n), t.child;
			case 8: return ic(e, t, t.pendingProps.children, n), t.child;
			case 12: return ic(e, t, t.pendingProps.children, n), t.child;
			case 10: return r = t.pendingProps, Ki(t, t.type, r.value), ic(e, t, r.children, n), t.child;
			case 9: return a = t.type._context, r = t.pendingProps.children, Qi(t), a = $i(a), r = r(a), t.flags |= 1, ic(e, t, r, n), t.child;
			case 14: return oc(e, t, t.type, t.pendingProps, n);
			case 15: return sc(e, t, t.type, t.pendingProps, n);
			case 19: return Oc(e, t, n);
			case 31: return pc(e, t, n);
			case 22: return cc(e, t, n, t.pendingProps);
			case 24: return Qi(t), r = $i(aa), e === null ? (a = _a(), a === null && (a = q, o = oa(), a.pooledCache = o, o.refCount++, o !== null && (a.pooledCacheLanes |= n), a = o), t.memoizedState = {
				parent: r,
				cache: a
			}, za(t), Ki(t, aa, a)) : ((e.lanes & n) !== 0 && (Ba(e, t), qa(t, null, null, n), Ka()), a = e.memoizedState, o = t.memoizedState, a.parent === r ? (r = o.cache, Ki(t, aa, r), r !== a.cache && Yi(t, [aa], n, !0)) : (a = {
				parent: r,
				cache: r
			}, t.memoizedState = a, t.lanes === 0 && (t.memoizedState = t.updateQueue.baseState = a), Ki(t, aa, r))), ic(e, t, t.pendingProps.children, n), t.child;
			case 29: throw t.pendingProps;
		}
		throw Error(i(156, t.tag));
	}
	function Nc(e) {
		e.flags |= 4;
	}
	function Pc(e, t, n, r, i) {
		if ((t = (e.mode & 32) != 0) && (t = !1), t) {
			if (e.flags |= 16777216, (i & 335544128) === i) if (e.stateNode.complete) e.flags |= 8192;
			else if (wu()) e.flags |= 8192;
			else throw Da = Ca, xa;
		} else e.flags &= -16777217;
	}
	function Fc(e, t) {
		if (t.type !== "stylesheet" || t.state.loading & 4) e.flags &= -16777217;
		else if (e.flags |= 16777216, !Wf(t)) if (wu()) e.flags |= 8192;
		else throw Da = Ca, xa;
	}
	function Ic(e, t) {
		t !== null && (e.flags |= 4), e.flags & 16384 && (t = e.tag === 22 ? 536870912 : tt(), e.lanes |= t, Yl |= t);
	}
	function Lc(e, t) {
		if (!V) switch (e.tailMode) {
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
	function W(e) {
		var t = e.alternate !== null && e.alternate.child === e.child, n = 0, r = 0;
		if (t) for (var i = e.child; i !== null;) n |= i.lanes | i.childLanes, r |= i.subtreeFlags & 65011712, r |= i.flags & 65011712, i.return = e, i = i.sibling;
		else for (i = e.child; i !== null;) n |= i.lanes | i.childLanes, r |= i.subtreeFlags, r |= i.flags, i.return = e, i = i.sibling;
		return e.subtreeFlags |= r, e.childLanes = n, t;
	}
	function Rc(e, t, n) {
		var r = t.pendingProps;
		switch (Ai(t), t.tag) {
			case 16:
			case 15:
			case 0:
			case 11:
			case 7:
			case 8:
			case 12:
			case 9:
			case 14: return W(t), null;
			case 1: return W(t), null;
			case 3: return n = t.stateNode, r = null, e !== null && (r = e.memoizedState.cache), t.memoizedState.cache !== r && (t.flags |= 2048), qi(aa), A(), n.pendingContext && (n.context = n.pendingContext, n.pendingContext = null), (e === null || e.child === null) && (zi(t) ? Nc(t) : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, Vi())), W(t), null;
			case 26:
				var a = t.type, o = t.memoizedState;
				return e === null ? (Nc(t), o === null ? (W(t), Pc(t, a, null, r, n)) : (W(t), Fc(t, o))) : o ? o === e.memoizedState ? (W(t), t.flags &= -16777217) : (Nc(t), W(t), Fc(t, o)) : (e = e.memoizedProps, e !== r && Nc(t), W(t), Pc(t, a, e, r, n)), null;
			case 27:
				if (be(t), n = O.current, a = t.type, e !== null && t.stateNode != null) e.memoizedProps !== r && Nc(t);
				else {
					if (!r) {
						if (t.stateNode === null) throw Error(i(166));
						return W(t), null;
					}
					e = ge.current, zi(t) ? Li(t, e) : (e = ff(a, r, n), t.stateNode = e, Nc(t));
				}
				return W(t), null;
			case 5:
				if (be(t), a = t.type, e !== null && t.stateNode != null) e.memoizedProps !== r && Nc(t);
				else {
					if (!r) {
						if (t.stateNode === null) throw Error(i(166));
						return W(t), null;
					}
					if (o = ge.current, zi(t)) Li(t, o);
					else {
						var s = Bd(O.current);
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
						o[I] = t, o[lt] = r;
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
						r && Nc(t);
					}
				}
				return W(t), Pc(t, t.type, e === null ? null : e.memoizedProps, t.pendingProps, n), null;
			case 6:
				if (e && t.stateNode != null) e.memoizedProps !== r && Nc(t);
				else {
					if (typeof r != "string" && t.stateNode === null) throw Error(i(166));
					if (e = O.current, zi(t)) {
						if (e = t.stateNode, n = t.memoizedProps, r = null, a = Mi, a !== null) switch (a.tag) {
							case 27:
							case 5: r = a.memoizedProps;
						}
						e[I] = t, e = !!(e.nodeValue === n || r !== null && !0 === r.suppressHydrationWarning || Md(e.nodeValue, n)), e || Ii(t, !0);
					} else e = Bd(e).createTextNode(r), e[I] = t, t.stateNode = e;
				}
				return W(t), null;
			case 31:
				if (n = t.memoizedState, e === null || e.memoizedState !== null) {
					if (r = zi(t), n !== null) {
						if (e === null) {
							if (!r) throw Error(i(318));
							if (e = t.memoizedState, e = e === null ? null : e.dehydrated, !e) throw Error(i(557));
							e[I] = t;
						} else Bi(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
						W(t), e = !1;
					} else n = Vi(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = n), e = !0;
					if (!e) return t.flags & 256 ? (so(t), t) : (so(t), null);
					if (t.flags & 128) throw Error(i(558));
				}
				return W(t), null;
			case 13:
				if (r = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
					if (a = zi(t), r !== null && r.dehydrated !== null) {
						if (e === null) {
							if (!a) throw Error(i(318));
							if (a = t.memoizedState, a = a === null ? null : a.dehydrated, !a) throw Error(i(317));
							a[I] = t;
						} else Bi(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
						W(t), a = !1;
					} else a = Vi(), e !== null && e.memoizedState !== null && (e.memoizedState.hydrationErrors = a), a = !0;
					if (!a) return t.flags & 256 ? (so(t), t) : (so(t), null);
				}
				return so(t), t.flags & 128 ? (t.lanes = n, t) : (n = r !== null, e = e !== null && e.memoizedState !== null, n && (r = t.child, a = null, r.alternate !== null && r.alternate.memoizedState !== null && r.alternate.memoizedState.cachePool !== null && (a = r.alternate.memoizedState.cachePool.pool), o = null, r.memoizedState !== null && r.memoizedState.cachePool !== null && (o = r.memoizedState.cachePool.pool), o !== a && (r.flags |= 2048)), n !== e && n && (t.child.flags |= 8192), Ic(t, t.updateQueue), W(t), null);
			case 4: return A(), e === null && Sd(t.stateNode.containerInfo), W(t), null;
			case 10: return qi(t.type), W(t), null;
			case 19:
				if (E(co), r = t.memoizedState, r === null) return W(t), null;
				if (a = (t.flags & 128) != 0, o = r.rendering, o === null) if (a) Lc(r, !1);
				else {
					if (Wl !== 0 || e !== null && e.flags & 128) for (e = t.child; e !== null;) {
						if (o = lo(e), o !== null) {
							for (t.flags |= 128, Lc(r, !1), e = o.updateQueue, t.updateQueue = e, Ic(t, e), t.subtreeFlags = 0, e = n, n = t.child; n !== null;) ui(n, e), n = n.sibling;
							return D(co, co.current & 1 | 2), V && Di(t, r.treeForkCount), t.child;
						}
						e = e.sibling;
					}
					r.tail !== null && Ne() > tu && (t.flags |= 128, a = !0, Lc(r, !1), t.lanes = 4194304);
				}
				else {
					if (!a) if (e = lo(o), e !== null) {
						if (t.flags |= 128, a = !0, e = e.updateQueue, t.updateQueue = e, Ic(t, e), Lc(r, !0), r.tail === null && r.tailMode === "hidden" && !o.alternate && !V) return W(t), null;
					} else 2 * Ne() - r.renderingStartTime > tu && n !== 536870912 && (t.flags |= 128, a = !0, Lc(r, !1), t.lanes = 4194304);
					r.isBackwards ? (o.sibling = t.child, t.child = o) : (e = r.last, e === null ? t.child = o : e.sibling = o, r.last = o);
				}
				return r.tail === null ? (W(t), null) : (e = r.tail, r.rendering = e, r.tail = e.sibling, r.renderingStartTime = Ne(), e.sibling = null, n = co.current, D(co, a ? n & 1 | 2 : n & 1), V && Di(t, r.treeForkCount), e);
			case 22:
			case 23: return so(t), eo(), r = t.memoizedState !== null, e === null ? r && (t.flags |= 8192) : e.memoizedState !== null !== r && (t.flags |= 8192), r ? n & 536870912 && !(t.flags & 128) && (W(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : W(t), n = t.updateQueue, n !== null && Ic(t, n.retryQueue), n = null, e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), r = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (r = t.memoizedState.cachePool.pool), r !== n && (t.flags |= 2048), e !== null && E(ga), null;
			case 24: return n = null, e !== null && (n = e.memoizedState.cache), t.memoizedState.cache !== n && (t.flags |= 2048), qi(aa), W(t), null;
			case 25: return null;
			case 30: return null;
		}
		throw Error(i(156, t.tag));
	}
	function zc(e, t) {
		switch (Ai(t), t.tag) {
			case 1: return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 3: return qi(aa), A(), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
			case 26:
			case 27:
			case 5: return be(t), null;
			case 31:
				if (t.memoizedState !== null) {
					if (so(t), t.alternate === null) throw Error(i(340));
					Bi();
				}
				return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 13:
				if (so(t), e = t.memoizedState, e !== null && e.dehydrated !== null) {
					if (t.alternate === null) throw Error(i(340));
					Bi();
				}
				return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 19: return E(co), null;
			case 4: return A(), null;
			case 10: return qi(t.type), null;
			case 22:
			case 23: return so(t), eo(), e !== null && E(ga), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
			case 24: return qi(aa), null;
			case 25: return null;
			default: return null;
		}
	}
	function Bc(e, t) {
		switch (Ai(t), t.tag) {
			case 3:
				qi(aa), A();
				break;
			case 26:
			case 27:
			case 5:
				be(t);
				break;
			case 4:
				A();
				break;
			case 31:
				t.memoizedState !== null && so(t);
				break;
			case 13:
				so(t);
				break;
			case 19:
				E(co);
				break;
			case 10:
				qi(t.type);
				break;
			case 22:
			case 23:
				so(t), eo(), e !== null && E(ga);
				break;
			case 24: qi(aa);
		}
	}
	function Vc(e, t) {
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
	function Hc(e, t, n) {
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
	function Uc(e) {
		var t = e.updateQueue;
		if (t !== null) {
			var n = e.stateNode;
			try {
				Ya(t, n);
			} catch (t) {
				Z(e, e.return, t);
			}
		}
	}
	function Wc(e, t, n) {
		n.props = Ks(e.type, e.memoizedProps), n.state = e.memoizedState;
		try {
			n.componentWillUnmount();
		} catch (n) {
			Z(e, t, n);
		}
	}
	function Gc(e, t) {
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
	function Kc(e, t) {
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
	function qc(e) {
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
	function Jc(e, t, n) {
		try {
			var r = e.stateNode;
			Fd(r, e.type, n, t), r[lt] = t;
		} catch (t) {
			Z(e, e.return, t);
		}
	}
	function Yc(e) {
		return e.tag === 5 || e.tag === 3 || e.tag === 26 || e.tag === 27 && Zd(e.type) || e.tag === 4;
	}
	function Xc(e) {
		a: for (;;) {
			for (; e.sibling === null;) {
				if (e.return === null || Yc(e.return)) return null;
				e = e.return;
			}
			for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18;) {
				if (e.tag === 27 && Zd(e.type) || e.flags & 2 || e.child === null || e.tag === 4) continue a;
				e.child.return = e, e = e.child;
			}
			if (!(e.flags & 2)) return e.stateNode;
		}
	}
	function Zc(e, t, n) {
		var r = e.tag;
		if (r === 5 || r === 6) e = e.stateNode, t ? (n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n).insertBefore(e, t) : (t = n.nodeType === 9 ? n.body : n.nodeName === "HTML" ? n.ownerDocument.body : n, t.appendChild(e), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = $t));
		else if (r !== 4 && (r === 27 && Zd(e.type) && (n = e.stateNode, t = null), e = e.child, e !== null)) for (Zc(e, t, n), e = e.sibling; e !== null;) Zc(e, t, n), e = e.sibling;
	}
	function Qc(e, t, n) {
		var r = e.tag;
		if (r === 5 || r === 6) e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
		else if (r !== 4 && (r === 27 && Zd(e.type) && (n = e.stateNode), e = e.child, e !== null)) for (Qc(e, t, n), e = e.sibling; e !== null;) Qc(e, t, n), e = e.sibling;
	}
	function $c(e) {
		var t = e.stateNode, n = e.memoizedProps;
		try {
			for (var r = e.type, i = t.attributes; i.length;) t.removeAttributeNode(i[0]);
			Pd(t, r, n), t[I] = e, t[lt] = n;
		} catch (t) {
			Z(e, e.return, t);
		}
	}
	var el = !1, tl = !1, nl = !1, rl = typeof WeakSet == "function" ? WeakSet : Set, il = null;
	function al(e, t) {
		if (e = e.containerInfo, Rd = sp, e = Er(e), Dr(e)) {
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
		}, sp = !1, il = t; il !== null;) if (t = il, e = t.child, t.subtreeFlags & 1028 && e !== null) e.return = t, il = e;
		else for (; il !== null;) {
			switch (t = il, o = t.alternate, e = t.flags, t.tag) {
				case 0:
					if (e & 4 && (e = t.updateQueue, e = e === null ? null : e.events, e !== null)) for (n = 0; n < e.length; n++) a = e[n], a.ref.impl = a.nextImpl;
					break;
				case 11:
				case 15: break;
				case 1:
					if (e & 1024 && o !== null) {
						e = void 0, n = t, a = o.memoizedProps, o = o.memoizedState, r = n.stateNode;
						try {
							var h = Ks(n.type, a);
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
				e.return = t.return, il = e;
				break;
			}
			il = t.return;
		}
	}
	function ol(e, t, n) {
		var r = n.flags;
		switch (n.tag) {
			case 0:
			case 11:
			case 15:
				bl(e, n), r & 4 && Vc(5, n);
				break;
			case 1:
				if (bl(e, n), r & 4) if (e = n.stateNode, t === null) try {
					e.componentDidMount();
				} catch (e) {
					Z(n, n.return, e);
				}
				else {
					var i = Ks(n.type, t.memoizedProps);
					t = t.memoizedState;
					try {
						e.componentDidUpdate(i, t, e.__reactInternalSnapshotBeforeUpdate);
					} catch (e) {
						Z(n, n.return, e);
					}
				}
				r & 64 && Uc(n), r & 512 && Gc(n, n.return);
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
						Ya(e, t);
					} catch (e) {
						Z(n, n.return, e);
					}
				}
				break;
			case 27: t === null && r & 4 && $c(n);
			case 26:
			case 5:
				bl(e, n), t === null && r & 4 && qc(n), r & 512 && Gc(n, n.return);
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
				if (r = n.memoizedState !== null || el, !r) {
					t = t !== null && t.memoizedState !== null || tl, i = el;
					var a = tl;
					el = r, (tl = t) && !a ? Sl(e, n, (n.subtreeFlags & 8772) != 0) : bl(e, n), el = i, tl = a;
				}
				break;
			case 30: break;
			default: bl(e, n);
		}
	}
	function sl(e) {
		var t = e.alternate;
		t !== null && (e.alternate = null, sl(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && ht(t)), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
	}
	var G = null, cl = !1;
	function ll(e, t, n) {
		for (n = n.child; n !== null;) ul(e, t, n), n = n.sibling;
	}
	function ul(e, t, n) {
		if (Ue && typeof Ue.onCommitFiberUnmount == "function") try {
			Ue.onCommitFiberUnmount(He, n);
		} catch {}
		switch (n.tag) {
			case 26:
				tl || Kc(n, t), ll(e, t, n), n.memoizedState ? n.memoizedState.count-- : n.stateNode && (n = n.stateNode, n.parentNode.removeChild(n));
				break;
			case 27:
				tl || Kc(n, t);
				var r = G, i = cl;
				Zd(n.type) && (G = n.stateNode, cl = !1), ll(e, t, n), pf(n.stateNode), G = r, cl = i;
				break;
			case 5: tl || Kc(n, t);
			case 6:
				if (r = G, i = cl, G = null, ll(e, t, n), G = r, cl = i, G !== null) if (cl) try {
					(G.nodeType === 9 ? G.body : G.nodeName === "HTML" ? G.ownerDocument.body : G).removeChild(n.stateNode);
				} catch (e) {
					Z(n, t, e);
				}
				else try {
					G.removeChild(n.stateNode);
				} catch (e) {
					Z(n, t, e);
				}
				break;
			case 18:
				G !== null && (cl ? (e = G, Qd(e.nodeType === 9 ? e.body : e.nodeName === "HTML" ? e.ownerDocument.body : e, n.stateNode), Np(e)) : Qd(G, n.stateNode));
				break;
			case 4:
				r = G, i = cl, G = n.stateNode.containerInfo, cl = !0, ll(e, t, n), G = r, cl = i;
				break;
			case 0:
			case 11:
			case 14:
			case 15:
				Hc(2, n, t), tl || Hc(4, n, t), ll(e, t, n);
				break;
			case 1:
				tl || (Kc(n, t), r = n.stateNode, typeof r.componentWillUnmount == "function" && Wc(n, t, r)), ll(e, t, n);
				break;
			case 21:
				ll(e, t, n);
				break;
			case 22:
				tl = (r = tl) || n.memoizedState !== null, ll(e, t, n), tl = r;
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
				return t === null && (t = e.stateNode = new rl()), t;
			case 22: return e = e.stateNode, t = e._retryCache, t === null && (t = e._retryCache = new rl()), t;
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
							G = c.stateNode, cl = !1;
							break a;
						}
						break;
					case 5:
						G = c.stateNode, cl = !1;
						break a;
					case 3:
					case 4:
						G = c.stateNode.containerInfo, cl = !0;
						break a;
				}
				c = c.return;
			}
			if (G === null) throw Error(i(160));
			ul(o, s, a), G = null, cl = !1, o = a.alternate, o !== null && (o.return = null), a.return = null;
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
				hl(t, e), vl(e), r & 4 && (Hc(3, e, e.return), Vc(3, e), Hc(5, e, e.return));
				break;
			case 1:
				hl(t, e), vl(e), r & 512 && (tl || n === null || Kc(n, n.return)), r & 64 && el && (e = e.updateQueue, e !== null && (r = e.callbacks, r !== null && (n = e.shared.hiddenCallbacks, e.shared.hiddenCallbacks = n === null ? r : n.concat(r))));
				break;
			case 26:
				var a = gl;
				if (hl(t, e), vl(e), r & 512 && (tl || n === null || Kc(n, n.return)), r & 4) {
					var o = n === null ? null : n.memoizedState;
					if (r = e.memoizedState, n === null) if (r === null) if (e.stateNode === null) {
						a: {
							r = e.type, n = e.memoizedProps, a = a.ownerDocument || a;
							b: switch (r) {
								case "title":
									o = a.getElementsByTagName("title")[0], (!o || o[mt] || o[I] || o.namespaceURI === "http://www.w3.org/2000/svg" || o.hasAttribute("itemprop")) && (o = a.createElement(r), a.head.insertBefore(o, a.querySelector("head > title"))), Pd(o, r, n), o[I] = e, bt(o), r = o;
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
							o[I] = e, bt(o), r = o;
						}
						e.stateNode = r;
					} else Hf(a, e.type, e.stateNode);
					else e.stateNode = If(a, r, e.memoizedProps);
					else o === r ? r === null && e.stateNode !== null && Jc(e, e.memoizedProps, n.memoizedProps) : (o === null ? n.stateNode !== null && (n = n.stateNode, n.parentNode.removeChild(n)) : o.count--, r === null ? Hf(a, e.type, e.stateNode) : If(a, r, e.memoizedProps));
				}
				break;
			case 27:
				hl(t, e), vl(e), r & 512 && (tl || n === null || Kc(n, n.return)), n !== null && r & 4 && Jc(e, e.memoizedProps, n.memoizedProps);
				break;
			case 5:
				if (hl(t, e), vl(e), r & 512 && (tl || n === null || Kc(n, n.return)), e.flags & 32) {
					a = e.stateNode;
					try {
						Kt(a, "");
					} catch (t) {
						Z(e, e.return, t);
					}
				}
				r & 4 && e.stateNode != null && (a = e.memoizedProps, Jc(e, a, n === null ? a : n.memoizedProps)), r & 1024 && (nl = !0);
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
				nl && (nl = !1, yl(e));
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
				hl(t, e), vl(e), e.child.flags & 8192 && e.memoizedState !== null != (n !== null && n.memoizedState !== null) && ($l = Ne()), r & 4 && (r = e.updateQueue, r !== null && (e.updateQueue = null, ml(e, r)));
				break;
			case 22:
				a = e.memoizedState !== null;
				var l = n !== null && n.memoizedState !== null, u = el, d = tl;
				if (el = u || a, tl = d || l, hl(t, e), tl = d, el = u, vl(e), r & 8192) a: for (t = e.stateNode, t._visibility = a ? t._visibility & -2 : t._visibility | 1, a && (n === null || l || el || tl || xl(e)), n = null, t = e;;) {
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
					if (Yc(r)) {
						n = r;
						break;
					}
					r = r.return;
				}
				if (n == null) throw Error(i(160));
				switch (n.tag) {
					case 27:
						var a = n.stateNode;
						Qc(e, Xc(e), a);
						break;
					case 5:
						var o = n.stateNode;
						n.flags & 32 && (Kt(o, ""), n.flags &= -33), Qc(e, Xc(e), o);
						break;
					case 3:
					case 4:
						var s = n.stateNode.containerInfo;
						Zc(e, Xc(e), s);
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
		if (t.subtreeFlags & 8772) for (t = t.child; t !== null;) ol(e, t.alternate, t), t = t.sibling;
	}
	function xl(e) {
		for (e = e.child; e !== null;) {
			var t = e;
			switch (t.tag) {
				case 0:
				case 11:
				case 14:
				case 15:
					Hc(4, t, t.return), xl(t);
					break;
				case 1:
					Kc(t, t.return);
					var n = t.stateNode;
					typeof n.componentWillUnmount == "function" && Wc(t, t.return, n), xl(t);
					break;
				case 27: pf(t.stateNode);
				case 26:
				case 5:
					Kc(t, t.return), xl(t);
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
					Sl(i, a, n), Vc(4, a);
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
							if (c !== null) for (i.shared.hiddenCallbacks = null, i = 0; i < c.length; i++) Ja(c[i], s);
						} catch (e) {
							Z(r, r.return, e);
						}
					}
					n && o & 64 && Uc(a), Gc(a, a.return);
					break;
				case 27: $c(a);
				case 26:
				case 5:
					Sl(i, a, n), n && r === null && o & 4 && qc(a), Gc(a, a.return);
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
					a.memoizedState === null && Sl(i, a, n), Gc(a, a.return);
					break;
				case 30: break;
				default: Sl(i, a, n);
			}
			t = t.sibling;
		}
	}
	function Cl(e, t) {
		var n = null;
		e !== null && e.memoizedState !== null && e.memoizedState.cachePool !== null && (n = e.memoizedState.cachePool.pool), e = null, t.memoizedState !== null && t.memoizedState.cachePool !== null && (e = t.memoizedState.cachePool.pool), e !== n && (e != null && e.refCount++, n != null && sa(n));
	}
	function wl(e, t) {
		e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && sa(e));
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
				Tl(e, t, n, r), i & 2048 && Vc(9, t);
				break;
			case 1:
				Tl(e, t, n, r);
				break;
			case 3:
				Tl(e, t, n, r), i & 2048 && (e = null, t.alternate !== null && (e = t.alternate.memoizedState.cache), t = t.memoizedState.cache, t !== e && (t.refCount++, e != null && sa(e)));
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
					Dl(a, o, s, c, i), Vc(8, o);
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
				il = r, Il(r, e);
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
				Nl(e), e.flags & 2048 && Hc(9, e, e.return);
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
				il = r, Il(r, e);
			}
			Ml(e);
		}
		for (e = e.child; e !== null;) {
			switch (t = e, t.tag) {
				case 0:
				case 11:
				case 15:
					Hc(8, t, t.return), Fl(t);
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
		for (; il !== null;) {
			var n = il;
			switch (n.tag) {
				case 0:
				case 11:
				case 15:
					Hc(8, n, t);
					break;
				case 23:
				case 22:
					if (n.memoizedState !== null && n.memoizedState.cachePool !== null) {
						var r = n.memoizedState.cachePool.pool;
						r != null && r.refCount++;
					}
					break;
				case 24: sa(n.memoizedState.cache);
			}
			if (r = n.child, r !== null) r.return = n, il = r;
			else a: for (n = e; il !== null;) {
				r = il;
				var i = r.sibling, a = r.return;
				if (sl(r), r === n) {
					il = null;
					break a;
				}
				if (i !== null) {
					i.return = a, il = i;
					break a;
				}
				il = a;
			}
		}
	}
	var Ll = {
		getCacheForType: function(e) {
			var t = $i(aa), n = t.data.get(e);
			return n === void 0 && (n = e(), t.data.set(e, n)), n;
		},
		cacheSignal: function() {
			return $i(aa).controller.signal;
		}
	}, Rl = typeof WeakMap == "function" ? WeakMap : Map, K = 0, q = null, J = null, Y = 0, X = 0, zl = null, Bl = !1, Vl = !1, Hl = !1, Ul = 0, Wl = 0, Gl = 0, Kl = 0, ql = 0, Jl = 0, Yl = 0, Xl = null, Zl = null, Ql = !1, $l = 0, eu = 0, tu = Infinity, nu = null, ru = null, iu = 0, au = null, ou = null, su = 0, cu = 0, lu = null, uu = null, du = 0, fu = null;
	function pu() {
		return K & 2 && Y !== 0 ? Y & -Y : w.T === null ? P() : dd();
	}
	function mu() {
		if (Jl === 0) if (!(Y & 536870912) || V) {
			var e = Ye;
			Ye <<= 1, !(Ye & 3932160) && (Ye = 262144), Jl = e;
		} else Jl = 536870912;
		return e = to.current, e !== null && (e.flags |= 32), Jl;
	}
	function hu(e, t, n) {
		(e === q && (X === 2 || X === 9) || e.cancelPendingCommit !== null) && (Su(e, 0), yu(e, Y, Jl, !1)), rt(e, n), (!(K & 2) || e !== q) && (e === q && (!(K & 2) && (Kl |= n), Wl === 4 && yu(e, Y, Jl, !1)), rd(e));
	}
	function gu(e, t, n) {
		if (K & 6) throw Error(i(327));
		var r = !n && (t & 127) == 0 && (t & e.expiredLanes) === 0 || $e(e, t), a = r ? Au(e, t) : Ou(e, t, !0), o = r;
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
					if ((t & 62914560) === t && (a = $l + 300 - Ne(), 10 < a)) {
						if (yu(r, t, Jl, !Bl), Qe(r, 0, !0) !== 0) break a;
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
				unsuspend: $t
			}, jl(t, a, d);
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
					if (!xr(a(), i)) return !1;
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
			var a = 31 - j(i), o = 1 << a;
			r[a] = -1, i &= ~o;
		}
		n !== 0 && at(e, n, t);
	}
	function bu() {
		return K & 6 ? !0 : (id(0, !1), !1);
	}
	function xu() {
		if (J !== null) {
			if (X === 0) var e = J.return;
			else e = J, Gi = Wi = null, Oo(e), Aa = null, ja = 0, e = J;
			for (; e !== null;) Bc(e.alternate, e), e = e.return;
			J = null;
		}
	}
	function Su(e, t) {
		var n = e.timeoutHandle;
		n !== -1 && (e.timeoutHandle = -1, qd(n)), n = e.cancelPendingCommit, n !== null && (e.cancelPendingCommit = null, n()), su = 0, xu(), q = e, J = n = li(e.current, null), Y = t, X = 0, zl = null, Bl = !1, Vl = $e(e, t), Hl = !1, Yl = Jl = ql = Kl = Gl = Wl = 0, Zl = Xl = null, Ql = !1, t & 8 && (t |= t & 32);
		var r = e.entangledLanes;
		if (r !== 0) for (e = e.entanglements, r &= t; 0 < r;) {
			var i = 31 - j(r), a = 1 << i;
			t |= e[i], r &= ~a;
		}
		return Ul = t, $r(), n;
	}
	function Cu(e, t) {
		H = null, w.H = Rs, t === ba || t === Sa ? (t = Oa(), X = 3) : t === xa ? (t = Oa(), X = 4) : X = t === nc ? 8 : typeof t == "object" && t && typeof t.then == "function" ? 6 : 1, zl = t, J === null && (Wl = 1, Xs(e, _i(t, e.current)));
	}
	function wu() {
		var e = to.current;
		return e === null ? !0 : (Y & 4194048) === Y ? no === null : (Y & 62914560) === Y || Y & 536870912 ? e === no : !1;
	}
	function Tu() {
		var e = w.H;
		return w.H = Rs, e === null ? Rs : e;
	}
	function Eu() {
		var e = w.A;
		return w.A = Ll, e;
	}
	function Du() {
		Wl = 4, Bl || (Y & 4194048) !== Y && to.current !== null || (Vl = !0), !(Gl & 134217727) && !(Kl & 134217727) || q === null || yu(q, Y, Jl, !1);
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
							to.current === null && (t = !0);
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
		return t && e.shellSuspendCounter++, Gi = Wi = null, K = r, w.H = i, w.A = a, J === null && (q = null, Y = 0, $r()), o;
	}
	function ku() {
		for (; J !== null;) Mu(J);
	}
	function Au(e, t) {
		var n = K;
		K |= 2;
		var r = Tu(), a = Eu();
		q !== e || Y !== t ? (nu = null, tu = Ne() + 500, Su(e, t)) : Vl = $e(e, t);
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
							if (wa(o)) {
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
							wa(o) ? (X = 0, zl = null, Nu(t)) : (X = 0, zl = null, Pu(e, t, o, 7));
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
		return Gi = Wi = null, w.H = r, w.A = a, K = n, J === null ? (q = null, Y = 0, $r(), Wl) : 0;
	}
	function ju() {
		for (; J !== null && !je();) Mu(J);
	}
	function Mu(e) {
		var t = Mc(e.alternate, e, Ul);
		e.memoizedProps = e.pendingProps, t === null ? Fu(e) : J = t;
	}
	function Nu(e) {
		var t = e, n = t.alternate;
		switch (t.tag) {
			case 15:
			case 0:
				t = gc(n, t, t.pendingProps, t.type, void 0, Y);
				break;
			case 11:
				t = gc(n, t, t.pendingProps, t.type.render, t.ref, Y);
				break;
			case 5: Oo(t);
			default: Bc(n, t), t = J = ui(t, Ul), t = Mc(n, t, Ul);
		}
		e.memoizedProps = e.pendingProps, t === null ? Fu(e) : J = t;
	}
	function Pu(e, t, n, r) {
		Gi = Wi = null, Oo(t), Aa = null, ja = 0;
		var i = t.return;
		try {
			if (tc(e, i, t, n, Y)) {
				Wl = 1, Xs(e, _i(n, e.current)), J = null;
				return;
			}
		} catch (t) {
			if (i !== null) throw J = i, t;
			Wl = 1, Xs(e, _i(n, e.current)), J = null;
			return;
		}
		t.flags & 32768 ? (V || r === 1 ? e = !0 : Vl || Y & 536870912 ? e = !1 : (Bl = e = !0, (r === 2 || r === 9 || r === 3 || r === 6) && (r = to.current, r !== null && r.tag === 13 && (r.flags |= 16384))), Iu(t, e)) : Fu(t);
	}
	function Fu(e) {
		var t = e;
		do {
			if (t.flags & 32768) {
				Iu(t, Bl);
				return;
			}
			e = t.return;
			var n = Rc(t.alternate, t, Ul);
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
			var n = zc(e.alternate, e);
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
			if (o = t.lanes | t.childLanes, o |= Qr, it(e, n, o, s, c, l), e === q && (J = q = null, Y = 0), ou = t, au = e, su = n, cu = o, lu = a, uu = r, t.subtreeFlags & 10256 || t.flags & 10256 ? (e.callbackNode = null, e.callbackPriority = 0, Xu(Le, function() {
				return Uu(), null;
			})) : (e.callbackNode = null, e.callbackPriority = 0), r = (t.flags & 13878) != 0, t.subtreeFlags & 13878 || r) {
				r = w.T, w.T = null, a = T.p, T.p = 2, s = K, K |= 4;
				try {
					al(e, t, n);
				} finally {
					K = s, T.p = a, w.T = r;
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
				n = w.T, w.T = null;
				var r = T.p;
				T.p = 2;
				var i = K;
				K |= 4;
				try {
					_l(t, e);
					var a = zd, o = Er(e.containerInfo), s = a.focusedElem, c = a.selectionRange;
					if (o !== s && s && s.ownerDocument && Tr(s.ownerDocument.documentElement, s)) {
						if (c !== null && Dr(s)) {
							var l = c.start, u = c.end;
							if (u === void 0 && (u = l), "selectionStart" in s) s.selectionStart = l, s.selectionEnd = Math.min(u, s.value.length);
							else {
								var d = s.ownerDocument || document, f = d && d.defaultView || window;
								if (f.getSelection) {
									var p = f.getSelection(), m = s.textContent.length, h = Math.min(c.start, m), g = c.end === void 0 ? h : Math.min(c.end, m);
									!p.extend && h > g && (o = g, g = h, h = o);
									var _ = wr(s, h), v = wr(s, g);
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
					K = i, T.p = r, w.T = n;
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
				n = w.T, w.T = null;
				var r = T.p;
				T.p = 2;
				var i = K;
				K |= 4;
				try {
					ol(e, t.alternate, t);
				} finally {
					K = i, T.p = r, w.T = n;
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
			if (i === 0 && (ru = null), N(n), t = t.stateNode, Ue && typeof Ue.onCommitFiberRoot == "function") try {
				Ue.onCommitFiberRoot(He, t, void 0, (t.current.flags & 128) == 128);
			} catch {}
			if (r !== null) {
				t = w.T, i = T.p, T.p = 2, w.T = null;
				try {
					for (var a = e.onRecoverableError, o = 0; o < r.length; o++) {
						var s = r[o];
						a(s.value, { componentStack: s.stack });
					}
				} finally {
					w.T = t, T.p = i;
				}
			}
			su & 3 && Hu(), rd(e), i = e.pendingLanes, n & 261930 && i & 42 ? e === fu ? du++ : (du = 0, fu = e) : du = 0, id(0, !1);
		}
	}
	function Vu(e, t) {
		(e.pooledCacheLanes &= t) === 0 && (t = e.pooledCache, t != null && (e.pooledCache = null, sa(t)));
	}
	function Hu() {
		return Ru(), zu(), Bu(), Uu();
	}
	function Uu() {
		if (iu !== 5) return !1;
		var e = au, t = cu;
		cu = 0;
		var n = N(su), r = w.T, a = T.p;
		try {
			T.p = 32 > n ? 32 : n, w.T = null, n = lu, lu = null;
			var o = au, s = su;
			if (iu = 0, ou = au = null, su = 0, K & 6) throw Error(i(331));
			var c = K;
			if (K |= 4, Pl(o.current), El(o, o.current, s, n), K = c, id(0, !1), Ue && typeof Ue.onPostCommitFiberRoot == "function") try {
				Ue.onPostCommitFiberRoot(He, o);
			} catch {}
			return !0;
		} finally {
			T.p = a, w.T = r, Vu(e, t);
		}
	}
	function Wu(e, t, n) {
		t = _i(n, t), t = Qs(e.stateNode, t, 2), e = Ha(e, t, 2), e !== null && (rt(e, 2), rd(e));
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
					e = _i(n, e), n = $s(2), r = Ha(t, n, 2), r !== null && (ec(n, r, t, e), rt(r, 2), rd(r));
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
		r !== null && r.delete(t), e.pingedLanes |= e.suspendedLanes & n, e.warmLanes &= ~n, q === e && (Y & n) === n && (Wl === 4 || Wl === 3 && (Y & 62914560) === Y && 300 > Ne() - $l ? !(K & 2) && Su(e, 0) : ql |= n, Yl === Y && (Yl = 0)), rd(e);
	}
	function qu(e, t) {
		t === 0 && (t = tt()), e = ni(e, t), e !== null && (rt(e, t), rd(e));
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
							a = (1 << 31 - j(42 | e) + 1) - 1, a &= i & ~(o & ~s), a = a & 201326741 ? a & 201326741 | 1 : a ? a | 2 : 0;
						}
						a !== 0 && (n = !0, ld(r, a));
					} else a = Y, a = Qe(r, r === q ? a : 0, r.cancelPendingCommit !== null || r.timeoutHandle !== -1), !(a & 3) || $e(r, a) || (n = !0, ld(r, a));
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
			var o = 31 - j(a), s = 1 << o, c = i[o];
			c === -1 ? ((s & n) === 0 || (s & r) !== 0) && (i[o] = et(s, t)) : c <= t && (e.expiredLanes |= s), a &= ~s;
		}
		if (t = q, n = Y, n = Qe(e, e === t ? n : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1), r = e.callbackNode, n === 0 || e === t && (X === 2 || X === 9) || e.cancelPendingCommit !== null) return r !== null && r !== null && Ae(r), e.callbackNode = null, e.callbackPriority = 0;
		if (!(n & 3) || $e(e, n)) {
			if (t = n & -n, t === e.callbackPriority) return t;
			switch (r !== null && Ae(r), N(n)) {
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
		var r = Y;
		return r = Qe(e, e === q ? r : 0, e.cancelPendingCommit !== null || e.timeoutHandle !== -1), r === 0 ? null : (gu(e, r, t), sd(e, Ne()), e.callbackNode != null && e.callbackNode === n ? cd.bind(null, e) : null);
	}
	function ld(e, t) {
		if (Hu()) return null;
		gu(e, t, !0);
	}
	function ud() {
		Yd(function() {
			K & 6 ? ke(Fe, ad) : od();
		});
	}
	function dd() {
		if (nd === 0) {
			var e = ua;
			e === 0 && (e = Je, Je <<= 1, !(Je & 261888) && (Je = 256)), nd = e;
		}
		return nd;
	}
	function fd(e) {
		return e == null || typeof e == "symbol" || typeof e == "boolean" ? null : typeof e == "function" ? e : Qt("" + e);
	}
	function pd(e, t) {
		var n = t.ownerDocument.createElement("input");
		return n.name = t.name, n.value = t.value, e.id && n.setAttribute("form", e.id), t.parentNode.insertBefore(n, t), e = new FormData(e), n.parentNode.removeChild(n), e;
	}
	function md(e, t, n, r, i) {
		if (t === "submit" && n && n.stateNode === i) {
			var a = fd((i[lt] || null).action), o = r.submitter;
			o && (t = (t = o[lt] || null) ? fd(t.formAction) : o.getAttribute("formAction"), t !== null && (a = t, o = null));
			var s = new xn("action", "action", null, r, i);
			e.push({
				event: s,
				listeners: [{
					instance: null,
					listener: function() {
						if (r.defaultPrevented) {
							if (nd !== 0) {
								var e = o ? pd(i, o) : new FormData(i);
								ws(n, {
									pending: !0,
									data: e,
									method: i.method,
									action: a
								}, null, e);
							}
						} else typeof a == "function" && (s.preventDefault(), e = o ? pd(i, o) : new FormData(i), ws(n, {
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
	for (var hd = 0; hd < qr.length; hd++) {
		var gd = qr[hd];
		Jr(gd.toLowerCase(), "on" + (gd[0].toUpperCase() + gd.slice(1)));
	}
	Jr(zr, "onAnimationEnd"), Jr(Br, "onAnimationIteration"), Jr(Vr, "onAnimationStart"), Jr("dblclick", "onDoubleClick"), Jr("focusin", "onFocus"), Jr("focusout", "onBlur"), Jr(Hr, "onTransitionRun"), Jr(Ur, "onTransitionStart"), Jr(Wr, "onTransitionCancel"), Jr(Gr, "onTransitionEnd"), wt("onMouseEnter", ["mouseout", "mouseover"]), wt("onMouseLeave", ["mouseout", "mouseover"]), wt("onPointerEnter", ["pointerout", "pointerover"]), wt("onPointerLeave", ["pointerout", "pointerover"]), Ct("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), Ct("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), Ct("onBeforeInput", [
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
						Yr(e);
					}
					i.currentTarget = null, a = c;
				}
				else for (o = 0; o < r.length; o++) {
					if (s = r[o], c = s.instance, l = s.currentTarget, s = s.listener, c !== a && i.isPropagationStopped()) break a;
					a = s, i.currentTarget = l;
					try {
						a(i);
					} catch (e) {
						Yr(e);
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
			var r = a, i = tn(n), s = [];
			a: {
				var c = Kr.get(e);
				if (c !== void 0) {
					var l = xn, u = e;
					switch (e) {
						case "keypress": if (gn(n) === 0) break a;
						case "keydown":
						case "keyup":
							l = Rn;
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
							l = Bn;
							break;
						case zr:
						case Br:
						case Vr:
							l = jn;
							break;
						case Gr:
							l = Vn;
							break;
						case "scroll":
						case "scrollend":
							l = Cn;
							break;
						case "wheel":
							l = Hn;
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
							l = zn;
							break;
						case "toggle":
						case "beforetoggle": l = Un;
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
					if (c = e === "mouseover" || e === "pointerover", l = e === "mouseout" || e === "pointerout", c && n !== en && (u = n.relatedTarget || n.fromElement) && (gt(u) || u[L])) break a;
					if ((l || c) && (c = i.window === i ? i : (c = i.ownerDocument) ? c.defaultView || c.parentWindow : window, l ? (u = n.relatedTarget || n.toElement, l = r, u = u ? gt(u) : null, u !== null && (f = o(u), d = u.tag, u !== f || d !== 5 && d !== 27 && d !== 6) && (u = null)) : (l = null, u = r), l !== u)) {
						if (d = On, g = "onMouseLeave", p = "onMouseEnter", m = "mouse", (e === "pointerout" || e === "pointerover") && (d = zn, g = "onPointerLeave", p = "onPointerEnter", m = "pointer"), f = l == null ? c : vt(l), h = u == null ? c : vt(u), c = new d(g, m + "leave", l, n, i), c.target = f, c.relatedTarget = h, g = null, gt(i) === r && (d = new d(p, m + "enter", u, n, i), d.target = h, d.relatedTarget = f, g = d), f = g, l && u) b: {
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
					if (c = r ? vt(r) : window, l = c.nodeName && c.nodeName.toLowerCase(), l === "select" || l === "input" && c.type === "file") var v = lr;
					else if (rr(c)) if (ur) v = yr;
					else {
						v = _r;
						var y = gr;
					}
					else l = c.nodeName, !l || l.toLowerCase() !== "input" || c.type !== "checkbox" && c.type !== "radio" ? r && Yt(r.elementType) && (v = lr) : v = vr;
					if (v &&= v(e, r)) {
						ir(s, v, n, i);
						break a;
					}
					y && y(e, c, r), e === "focusout" && r && c.type === "number" && r.memoizedProps.value != null && Ht(c, "number", c.value);
				}
				switch (y = r ? vt(r) : window, e) {
					case "focusin":
						(rr(y) || y.contentEditable === "true") && (kr = y, Ar = r, jr = null);
						break;
					case "focusout":
						jr = Ar = kr = null;
						break;
					case "mousedown":
						Mr = !0;
						break;
					case "contextmenu":
					case "mouseup":
					case "dragend":
						Mr = !1, Nr(s, n, i);
						break;
					case "selectionchange": if (Or) break;
					case "keydown":
					case "keyup": Nr(s, n, i);
				}
				var b;
				if (Gn) b: {
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
				else $n ? Zn(e, n) && (x = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (x = "onCompositionStart");
				x && (Jn && n.locale !== "ko" && ($n || x !== "onCompositionStart" ? x === "onCompositionEnd" && $n && (b = hn()) : (fn = i, pn = "value" in fn ? fn.value : fn.textContent, $n = !0)), y = Ed(r, x), 0 < y.length && (x = new z(x, e, null, n, i), s.push({
					event: x,
					listeners: y
				}), b ? x.data = b : (b = Qn(n), b !== null && (x.data = b)))), (b = qn ? er(e, n) : tr(e, n)) && (x = Ed(r, "onBeforeInput"), 0 < x.length && (y = new z("onBeforeInput", "beforeinput", null, n, i), s.push({
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
				R(e, r, o);
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
				r = Qt("" + r), e.setAttribute(n, r);
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
				r = Qt("" + r), e.setAttribute(n, r);
				break;
			case "onClick":
				r != null && (e.onclick = $t);
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
				n = Qt("" + r), e.setAttributeNS("http://www.w3.org/1999/xlink", "xlink:href", n);
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
			default: (!(2 < n.length) || n[0] !== "o" && n[0] !== "O" || n[1] !== "n" && n[1] !== "N") && (n = Xt.get(n) || n, kt(e, n, r));
		}
	}
	function Nd(e, t, n, r, a, o) {
		switch (n) {
			case "style":
				R(e, r, o);
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
				r != null && (e.onclick = $t);
				break;
			case "suppressContentEditableWarning":
			case "suppressHydrationWarning":
			case "innerHTML":
			case "ref": break;
			case "innerText":
			case "textContent": break;
			default: if (!St.hasOwnProperty(n)) a: {
				if (n[0] === "o" && n[1] === "n" && (a = n.endsWith("Capture"), t = n.slice(2, a ? n.length - 7 : void 0), o = e[lt] || null, o = o == null ? null : o[n], typeof o == "function" && e.removeEventListener(t, o, a), typeof r == "function")) {
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
			default: if (Yt(t)) {
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
			default: if (Yt(t)) {
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
	var _f = T.d;
	T.d = {
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
		t !== null && t.tag === 5 && t.type === "form" ? Es(t) : _f.r(e);
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
		var a = (a = O.current) ? gf(a) : null;
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
			if (!(a[mt] || a[I] || e === "link" && a.getAttribute("rel") === "stylesheet") && a.namespaceURI !== "http://www.w3.org/2000/svg") {
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
		$$typeof: ee,
		Provider: null,
		Consumer: null,
		_currentValue: fe,
		_currentValue2: fe,
		_threadCount: 0
	};
	function $f(e, t, n, r, i, a, o, s, c) {
		this.tag = 1, this.containerInfo = e, this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null, this.callbackPriority = 0, this.expirationTimes = nt(-1), this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = nt(0), this.hiddenUpdates = nt(null), this.identifierPrefix = r, this.onUncaughtError = i, this.onCaughtError = a, this.onRecoverableError = o, this.pooledCache = null, this.pooledCacheLanes = 0, this.formState = c, this.incompleteTransitions = /* @__PURE__ */ new Map();
	}
	function ep(e, t, n, r, i, a, o, s, c, l, u, d) {
		return e = new $f(e, t, n, o, c, l, u, d, s), t = 1, !0 === a && (t |= 24), a = si(3, null, null, t), e.current = a, a.stateNode = e, t = oa(), t.refCount++, e.pooledCache = t, t.refCount++, a.memoizedState = {
			element: r,
			isDehydrated: n,
			cache: t
		}, za(a), e;
	}
	function tp(e) {
		return e ? (e = ai, e) : ai;
	}
	function np(e, t, n, r, i, a) {
		i = tp(i), r.context === null ? r.context = i : r.pendingContext = i, r = Va(t), r.payload = { element: n }, a = a === void 0 ? null : a, a !== null && (r.callback = a), n = Ha(e, r, t), n !== null && (hu(n, e, t), Ua(n, e, t));
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
			var t = ni(e, 67108864);
			t !== null && hu(t, e, 67108864), ip(e, 67108864);
		}
	}
	function op(e) {
		if (e.tag === 13 || e.tag === 31) {
			var t = pu();
			t = st(t);
			var n = ni(e, t);
			n !== null && hu(n, e, t), ip(e, t);
		}
	}
	var sp = !0;
	function cp(e, t, n, r) {
		var i = w.T;
		w.T = null;
		var a = T.p;
		try {
			T.p = 2, up(e, t, n, r);
		} finally {
			T.p = a, w.T = i;
		}
	}
	function lp(e, t, n, r) {
		var i = w.T;
		w.T = null;
		var a = T.p;
		try {
			T.p = 8, up(e, t, n, r);
		} finally {
			T.p = a, w.T = i;
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
								var o = Ze(a.pendingLanes);
								if (o !== 0) {
									var s = a;
									for (s.pendingLanes |= 2, s.entangledLanes |= 2; o;) {
										var c = 1 << 31 - j(o);
										s.entanglements[1] |= c, o &= ~c;
									}
									rd(a), !(K & 6) && (tu = Ne() + 500, id(0, !1));
								}
							}
							break;
						case 31:
						case 13: s = ni(a, 2), s !== null && hu(s, a, 2), bu(), ip(a, 2);
					}
					if (a = dp(r), a === null && wd(e, t, r, fp, n), a === i) break;
					i = a;
				}
				i !== null && r.stopPropagation();
			} else wd(e, t, r, null, n);
		}
	}
	function dp(e) {
		return e = tn(e), pp(e);
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
						e.blockedOn = t, F(e.priority, function() {
							op(n);
						});
						return;
					}
				} else if (t === 31) {
					if (t = c(n), t !== null) {
						e.blockedOn = t, F(e.priority, function() {
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
				en = r, n.target.dispatchEvent(r), en = null;
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
				a !== null && (e.splice(t, 3), t -= 3, ws(a, {
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
			var i = n[r], a = n[r + 1], o = i[lt] || null;
			if (typeof a == "function") o || Mp(n);
			else if (o) {
				var s = null;
				if (a && a.hasAttribute("formAction")) {
					if (i = a, o = a[lt] || null) s = o.formAction;
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
			np(e.current, 2, null, e, null, null), bu(), t[L] = null;
		}
	};
	function Ip(e) {
		this._internalRoot = e;
	}
	Ip.prototype.unstable_scheduleHydration = function(e) {
		if (e) {
			var t = P();
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
	T.findDOMNode = function(e) {
		var t = e._reactInternals;
		if (t === void 0) throw typeof e.render == "function" ? Error(i(188)) : (e = Object.keys(e).join(","), Error(i(268, e)));
		return e = d(t), e = e === null ? null : p(e), e = e === null ? null : e.stateNode, e;
	};
	var Rp = {
		bundleType: 0,
		version: "19.2.6",
		rendererPackageName: "react-dom",
		currentDispatcherRef: w,
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
		var n = !1, r = "", o = qs, s = Js, c = Ys;
		return t != null && (!0 === t.unstable_strictMode && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onUncaughtError !== void 0 && (o = t.onUncaughtError), t.onCaughtError !== void 0 && (s = t.onCaughtError), t.onRecoverableError !== void 0 && (c = t.onRecoverableError)), t = ep(e, 1, !1, null, null, n, r, null, o, s, c, Pp), e[L] = t.current, Sd(e), new Fp(t);
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
], ee = /* @__PURE__ */ new Date("2026-06-14T00:00:00+08:00"), C = [
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
], te = [
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
function ne(e = {}) {
	return te.map((t) => ({
		...t,
		actual: e[t.id] ?? 0
	}));
}
var re = [
	{
		id: "2026-06",
		label: "2026年6月",
		salary: 15e3,
		payday: 10,
		stockIncome: 0,
		otherIncome: 0,
		budgets: te.map((e) => ({ ...e }))
	},
	{
		id: "2026-07",
		label: "2026年7月",
		salary: 15e3,
		payday: 10,
		stockIncome: 0,
		otherIncome: 0,
		budgets: ne()
	},
	{
		id: "2026-08",
		label: "2026年8月",
		salary: 15e3,
		payday: 10,
		stockIncome: 0,
		otherIncome: 0,
		budgets: ne()
	},
	{
		id: "2026-09",
		label: "2026年9月",
		salary: 15e3,
		payday: 10,
		stockIncome: 0,
		otherIncome: 0,
		budgets: ne()
	},
	{
		id: "2026-10",
		label: "2026年10月",
		salary: 15e3,
		payday: 10,
		stockIncome: 0,
		otherIncome: 0,
		budgets: ne()
	},
	{
		id: "2026-11",
		label: "2026年11月",
		salary: 15e3,
		payday: 10,
		stockIncome: 0,
		otherIncome: 0,
		budgets: ne()
	},
	{
		id: "2026-12",
		label: "2026年12月",
		salary: 15e3,
		payday: 10,
		stockIncome: 0,
		otherIncome: 0,
		budgets: ne()
	}
], ie = [
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
], ae = [
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
], oe = [
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
], se = [
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
], ce = [
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
], le = [
	"应急",
	"旅行",
	"搬家",
	"分期",
	"投资",
	"家庭",
	"其他"
], ue = [
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
], de = [
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
], w = [
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
], T = "2026-06", fe = "personal-finance-management-data-v2", pe = "personal-finance-management-snapshots-v1", me = "personal-finance-management-monthly-archives-v1", he = "personal-finance-management-cloud-sync-v1", E = "personal-finance-management-sync.json", D = 20, ge = 48, _e = [
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
function O(e) {
	return new Intl.NumberFormat("zh-CN", {
		style: "currency",
		currency: "CNY",
		maximumFractionDigits: 0
	}).format(Number.isFinite(e) ? e : 0);
}
function k(e, t = 0, n = 100) {
	return Math.min(n, Math.max(t, Number.isFinite(e) ? e : t));
}
function ve(e) {
	let t = Number(e);
	return Number.isFinite(t) ? t : 0;
}
function A(e) {
	return `${k(e * 100).toFixed(0)}%`;
}
function ye(e) {
	return Number.isFinite(e) ? `${(e * 100).toFixed(1)}%` : "0.0%";
}
function be(e) {
	return e.replace("2026年", "").replace("月", "月");
}
function xe(e, t) {
	let [n, r] = e.split("-"), i = Number(n), a = Number(r);
	if (!Number.isFinite(i) || !Number.isFinite(a)) return e;
	let o = new Date(Date.UTC(i, a - 1 + t, 1));
	return `${o.getUTCFullYear()}-${String(o.getUTCMonth() + 1).padStart(2, "0")}`;
}
function Se(e) {
	let [t, n] = e.split("-"), r = Number(t), i = Number(n);
	return !Number.isFinite(r) || !Number.isFinite(i) ? e : `${r}年${i}月`;
}
function Ce(e) {
	return e.salary + Math.max(e.stockIncome, 0) + e.otherIncome;
}
function we(e) {
	return e.budgets.reduce((e, t) => e + t.actual, 0);
}
function Te(e) {
	return e.budgets.reduce((e, t) => e + t.plan, 0);
}
function Ee(e) {
	let t = `${e.name} ${e.type} ${e.purpose}`.toLowerCase();
	return t.includes("余额宝") && t.includes("8514") || t.includes("a股") ? "aShare" : t.includes("中国银行") && t.includes("8292") || t.includes("美股") || t.includes("us stock") || t.includes("us-stock") ? "usShare" : null;
}
function De(e) {
	return Ee(e) !== null;
}
function Oe(e) {
	let t = `${e.name} ${e.type} ${e.purpose}`.toLowerCase();
	return !De(e) && (t.includes("旅游") || t.includes("旅行"));
}
function ke(e) {
	let t = `${e.name} ${e.type} ${e.purpose}`.toLowerCase();
	return !De(e) && (t.includes("学习") || t.includes("教育") || t.includes("成长"));
}
function Ae(e) {
	let t = `${e.name} ${e.type} ${e.purpose}`.toLowerCase().replace(/\s+/g, ""), n = e.id === "icbc2616" || t.includes("工行2616"), r = t.includes("微信") || t.includes("现金"), i = t.includes("银行卡") || t.includes("银行") || t.includes("工行"), a = t.includes("余额宝");
	return !n && !r && (i || a);
}
function je(e) {
	let t = e.name.toLowerCase();
	return t.includes("旅游") || t.includes("旅行") ? "travel" : t.includes("学习") || t.includes("教育") || t.includes("成长") ? "learning" : t.includes("父母") || t.includes("爸妈") || t.includes("孝敬") ? "parent" : t.includes("伴侣") || t.includes("情侣") || t.includes("共同") ? "partner" : t.includes("应急") || t.includes("紧急") ? "emergency" : "other";
}
function Me(e) {
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
		let e = je(n);
		e === "travel" ? (t.travelCurrent += n.current, t.travelMonthly += n.monthly, t.travelActualMonthly += n.actualMonthly, t.hasTravel = !0) : e === "learning" ? (t.learningCurrent += n.current, t.learningMonthly += n.monthly, t.learningActualMonthly += n.actualMonthly, t.hasLearning = !0) : e === "parent" ? (t.parentCurrent += n.current, t.parentMonthly += n.monthly, t.parentActualMonthly += n.actualMonthly, t.hasParent = !0) : e === "partner" ? (t.partnerCurrent += n.current, t.partnerMonthly += n.monthly, t.partnerActualMonthly += n.actualMonthly, t.hasPartner = !0) : e === "emergency" ? (t.emergencyCurrent += n.current, t.emergencyMonthly += n.monthly, t.emergencyActualMonthly += n.actualMonthly, t.hasEmergency = !0) : e === "other" && (t.otherCurrent += n.current, t.otherMonthly += n.monthly, t.otherActualMonthly += n.actualMonthly);
	}
	return t;
}
function Ne(e) {
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
	}).filter((e) => e !== null), n = t.length ? t : ce, r = n.some((e) => je(e) === "parent") ? n : (() => {
		let e = ce.find((e) => e.id === "parent-saving");
		return e ? [...n, e] : n;
	})();
	if (r.some((e) => je(e) === "partner")) return r;
	let i = ce.find((e) => e.id === "partner");
	return i ? [...r, i] : r;
}
function Pe(e) {
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
function Fe(e) {
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
function Ie(e) {
	return Array.isArray(e) ? e.map((e, t) => {
		if (!e || typeof e != "object") return null;
		let n = e, r = le.includes(n.kind) ? n.kind : "其他";
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
function Le(e) {
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
function Re(e) {
	return Array.isArray(e) ? e.map((e, t) => {
		if (!e || typeof e != "object") return null;
		let n = e, r = typeof n.monthId == "string" && n.monthId ? n.monthId : "";
		return r ? {
			id: typeof n.id == "string" && n.id ? n.id : `${r}-${t}`,
			monthId: r,
			label: typeof n.label == "string" && n.label ? n.label : Se(r),
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
			accounts: Le(n.accounts)
		} : null;
	}).filter((e) => e !== null).sort((e, t) => t.monthId.localeCompare(e.monthId) || t.savedAt.localeCompare(e.savedAt)).slice(0, ge) : [];
}
function ze(e) {
	if (!e || typeof e != "object") return {
		gistId: "",
		token: "",
		autoSync: !1
	};
	let t = e;
	return {
		gistId: typeof t.gistId == "string" ? t.gistId : "",
		token: typeof t.token == "string" ? t.token : "",
		autoSync: !!t.autoSync,
		lastPushedAt: typeof t.lastPushedAt == "string" ? t.lastPushedAt : void 0,
		lastPulledAt: typeof t.lastPulledAt == "string" ? t.lastPulledAt : void 0
	};
}
function Be(e) {
	return ae.map((t) => ({
		...t,
		amount: t.id === "house-debt" ? e.houseDebt ?? 0 : t.id === "car-debt" ? e.carDebt ?? 0 : e.otherDebt ?? 0
	}));
}
function Ve(e) {
	let t = /* @__PURE__ */ new Date(`${e}T00:00:00+08:00`);
	return Math.ceil((t.getTime() - ee.getTime()) / 864e5);
}
function He(e, t) {
	let [n, r] = e.split("-"), [i, a] = t.split("-"), o = Number(n), s = Number(r), c = Number(i), l = Number(a);
	return [
		o,
		s,
		c,
		l
	].every(Number.isFinite) ? Math.max(1, (c - o) * 12 + l - s + 1) : 1;
}
function Ue(e) {
	return new Date(e).toLocaleString("zh-CN", {
		year: "numeric",
		month: "2-digit",
		day: "2-digit",
		hour: "2-digit",
		minute: "2-digit"
	});
}
function We(e) {
	return e > 0 ? `+${O(e)}` : e < 0 ? `-${O(Math.abs(e))}` : O(0);
}
function j(e) {
	return e > 0 ? "positive" : e < 0 ? "negative" : "calculated-cell";
}
function Ge(e) {
	return [...e].sort((e, t) => e.monthId.localeCompare(t.monthId) || e.savedAt.localeCompare(t.savedAt));
}
function Ke(e, t) {
	return Ge(e).filter((e) => e.monthId < t).at(-1);
}
function qe(e) {
	let t = "";
	for (let n = 0; n < e.length; n += 1) t += String.fromCharCode(e[n]);
	return window.btoa(t);
}
function Je(e) {
	let t = window.atob(e), n = new Uint8Array(t.length);
	for (let e = 0; e < t.length; e += 1) n[e] = t.charCodeAt(e);
	return n;
}
async function Ye(e, t, n) {
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
async function Xe(e, t) {
	let n = window.crypto.getRandomValues(new Uint8Array(16)), r = window.crypto.getRandomValues(new Uint8Array(12)), i = 18e4, a = await Ye(t, n, i), o = new TextEncoder().encode(JSON.stringify(e)), s = await window.crypto.subtle.encrypt({
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
			salt: qe(n)
		},
		cipher: {
			name: "AES-GCM",
			iv: qe(r),
			data: qe(new Uint8Array(s))
		}
	};
}
async function Ze(e, t) {
	if (e.app !== "personal-finance-management" || e.version !== 1) throw Error("invalid cloud backup");
	let n = await Ye(t, Je(e.kdf.salt), e.kdf.iterations), r = await window.crypto.subtle.decrypt({
		name: "AES-GCM",
		iv: Je(e.cipher.iv)
	}, n, Je(e.cipher.data));
	return JSON.parse(new TextDecoder().decode(r));
}
async function Qe(e, t, n = {}) {
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
async function $e({ backup: e, gistId: t, passphrase: n, token: r }) {
	let i = await Xe(e, n), a = {
		description: "Personal Finance Management encrypted sync data",
		public: !1,
		files: { [E]: { content: JSON.stringify(i, null, 2) } }
	};
	return t.trim() ? Qe(`/gists/${t.trim()}`, r, {
		method: "PATCH",
		body: JSON.stringify({ files: a.files })
	}) : Qe("/gists", r, {
		method: "POST",
		body: JSON.stringify(a)
	});
}
async function et(e, t, n) {
	let r = await Qe(`/gists/${e.trim()}`, t), i = r.files?.[E] ?? Object.values(r.files ?? {})[0];
	if (!i?.content) throw Error("cloud sync file not found");
	return Ze(JSON.parse(i.content), n);
}
function tt({ label: e, value: t, onChange: n, step: r = 100, disabled: i = !1 }) {
	return /* @__PURE__ */ (0, x.jsxs)("label", {
		className: "field",
		children: [/* @__PURE__ */ (0, x.jsx)("span", { children: e }), /* @__PURE__ */ (0, x.jsx)("input", {
			disabled: i,
			inputMode: "decimal",
			min: "0",
			step: r,
			type: "number",
			value: Number.isFinite(t) ? t : 0,
			onChange: (e) => n(ve(e.target.value))
		})]
	});
}
function nt() {
	let [e, t] = (0, b.useState)([]), [n, r] = (0, b.useState)("月"), [i, a] = (0, b.useState)("2026-06"), [o, s] = (0, b.useState)(re), [c, l] = (0, b.useState)(C), [u, d] = (0, b.useState)(ie), [f, p] = (0, b.useState)(7.25), [m, h] = (0, b.useState)(.93), [g, _] = (0, b.useState)(2250), [v, y] = (0, b.useState)(1500), [ee, ne] = (0, b.useState)(0), [le, E] = (0, b.useState)(3e3), [ge, ve] = (0, b.useState)(500), [ye, De] = (0, b.useState)(2e3), [Le, j] = (0, b.useState)(3), [qe, Je] = (0, b.useState)(4500), [Ye, Xe] = (0, b.useState)(oe), [Ze, Qe] = (0, b.useState)(ae), [nt, P] = (0, b.useState)(se), [F, ct] = (0, b.useState)(ce), [I, lt] = (0, b.useState)(ue), [L, Ot] = (0, b.useState)(de), [Vt, Ht] = (0, b.useState)([]), [Ut, Wt] = (0, b.useState)([]), [Gt, Kt] = (0, b.useState)([]), [qt, Jt] = (0, b.useState)([]), [R, Yt] = (0, b.useState)({
		gistId: "",
		token: "",
		autoSync: !1
	}), [Xt, Zt] = (0, b.useState)(""), [Qt, $t] = (0, b.useState)("未连接云同步"), [en, tn] = (0, b.useState)(!1), [nn, rn] = (0, b.useState)(!1), [an, on] = (0, b.useState)("正在读取本地数据…"), [sn, cn] = (0, b.useState)("报告随数据自动更新"), [ln, un] = (0, b.useState)(!1), dn = (0, b.useRef)(null), fn = (0, b.useRef)(null);
	function pn() {
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
			hkSharePlan: ee,
			travelSaving: le,
			learningSaving: ge,
			emergencyFund: ye,
			emergencyMonths: Le,
			emergencyMonthlyNeed: qe,
			balanceAssets: Ye,
			liabilities: Ze,
			reminders: nt,
			goals: F,
			fundBuckets: I,
			futureCapabilities: L,
			cashflowHiddenBuiltinIds: Vt,
			cashflowCustomItems: Ut
		};
	}
	function mn() {
		return {
			version: 1,
			exportedAt: (/* @__PURE__ */ new Date()).toISOString(),
			data: pn(),
			snapshots: Gt,
			monthlyArchives: qt
		};
	}
	function hn(e) {
		Yt(e), window.localStorage.setItem(he, JSON.stringify(e));
	}
	function gn(e) {
		e.period && r(e.period), e.selectedMonth && a(e.selectedMonth), Array.isArray(e.monthlyRecords) && s(e.monthlyRecords), Array.isArray(e.accounts) && l(e.accounts), Array.isArray(e.holdings) && d(e.holdings), typeof e.fxUsd == "number" && p(e.fxUsd), typeof e.fxHkd == "number" && h(e.fxHkd), typeof e.aSharePlan == "number" && _(e.aSharePlan), typeof e.usSharePlan == "number" && y(e.usSharePlan), typeof e.hkSharePlan == "number" && ne(e.hkSharePlan), typeof e.travelSaving == "number" && E(e.travelSaving), typeof e.learningSaving == "number" && ve(e.learningSaving), typeof e.emergencyFund == "number" && De(e.emergencyFund), typeof e.emergencyMonths == "number" && j(e.emergencyMonths), typeof e.emergencyMonthlyNeed == "number" && Je(e.emergencyMonthlyNeed);
		let t = Fe(e.balanceAssets);
		t.length > 0 && Xe(t);
		let n = Pe(e.liabilities);
		if (n.length > 0 ? Qe(n) : (typeof e.houseDebt == "number" || typeof e.carDebt == "number" || typeof e.otherDebt == "number") && Qe(Be(e)), Array.isArray(e.reminders) && P(e.reminders), Array.isArray(e.goals) && ct(Ne(e.goals)), Array.isArray(e.fundBuckets)) {
			let t = Ie(e.fundBuckets);
			t.length > 0 && lt(t);
		}
		Array.isArray(e.futureCapabilities) && Ot(e.futureCapabilities), Array.isArray(e.cashflowHiddenBuiltinIds) && Ht(e.cashflowHiddenBuiltinIds.filter((e) => w.includes(e))), Array.isArray(e.cashflowCustomItems) && Wt(e.cashflowCustomItems);
	}
	(0, b.useEffect)(() => {
		let e = window.setTimeout(() => {
			try {
				let e = window.localStorage.getItem(fe), t = window.localStorage.getItem(pe), n = window.localStorage.getItem(me), r = window.localStorage.getItem(he);
				if (e && gn(JSON.parse(e)), t) {
					let e = JSON.parse(t);
					Array.isArray(e) && Kt(e.slice(0, D));
				}
				if (n && Jt(Re(JSON.parse(n))), r) {
					let e = ze(JSON.parse(r));
					Yt(e), $t(e.gistId ? "已读取云同步配置，请输入同步密码" : "未连接云同步");
				}
				on(e ? "已恢复上次保存的数据" : "已启用自动保存");
			} catch {
				window.localStorage.removeItem(fe), on("本地数据读取失败，已使用默认数据");
			} finally {
				un(!0);
			}
		}, 0);
		return () => window.clearTimeout(e);
	}, []), (0, b.useEffect)(() => {
		if (!ln) return;
		let e = window.setTimeout(() => {
			try {
				window.localStorage.setItem(fe, JSON.stringify(pn())), on(`已自动保存 · ${(/* @__PURE__ */ new Date()).toLocaleTimeString("zh-CN", {
					hour: "2-digit",
					minute: "2-digit"
				})}`), R.autoSync && R.gistId.trim() && R.token.trim() && Xt.trim() && !en && (dn.current && window.clearTimeout(dn.current), dn.current = window.setTimeout(() => {
					Tn(!0);
				}, 3500));
			} catch {
				on("自动保存失败，请导出备份");
			}
		}, 300);
		return () => {
			window.clearTimeout(e), dn.current && window.clearTimeout(dn.current);
		};
	}, [
		ln,
		n,
		i,
		o,
		c,
		u,
		f,
		m,
		g,
		v,
		ee,
		le,
		ge,
		ye,
		Le,
		qe,
		Ye,
		Ze,
		nt,
		F,
		I,
		L,
		Vt,
		Ut,
		R.autoSync,
		R.gistId,
		R.token,
		Xt,
		en
	]);
	function _n() {
		let e = [{
			id: `${Date.now()}`,
			createdAt: (/* @__PURE__ */ new Date()).toISOString(),
			data: pn()
		}, ...Gt].slice(0, D);
		Kt(e), window.localStorage.setItem(pe, JSON.stringify(e)), rn(!0), on("历史版本已保存");
	}
	function vn(e) {
		window.confirm(`确定恢复 ${Ue(e.createdAt)} 的版本吗？当前数据会被该版本覆盖。`) && (gn(e.data), on("历史版本已恢复并自动保存"));
	}
	function yn(e) {
		let t = Gt.filter((t) => t.id !== e);
		Kt(t), window.localStorage.setItem(pe, JSON.stringify(t));
	}
	function bn() {
		let e = mn(), t = new Blob([JSON.stringify(e, null, 2)], { type: "application/json" }), n = URL.createObjectURL(t), r = document.createElement("a");
		r.href = n, r.download = `personal-finance-backup-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.json`, r.click(), URL.revokeObjectURL(n), on("备份文件已导出");
	}
	async function xn(e) {
		try {
			let t = JSON.parse(await e.text());
			if (!t.data || !Array.isArray(t.data.accounts) || !Array.isArray(t.data.monthlyRecords)) throw Error("invalid backup");
			if (gn(t.data), Array.isArray(t.snapshots)) {
				let e = t.snapshots.slice(0, D);
				Kt(e), window.localStorage.setItem(pe, JSON.stringify(e));
			}
			if (Array.isArray(t.monthlyArchives)) {
				let e = Re(t.monthlyArchives);
				Jt(e), window.localStorage.setItem(me, JSON.stringify(e));
			}
			on("备份已导入并自动保存");
		} catch {
			window.alert("无法导入：请选择由本网页导出的 JSON 备份文件。");
		} finally {
			fn.current && (fn.current.value = "");
		}
	}
	function Sn(e) {
		hn({
			...R,
			...e
		});
	}
	function Cn() {
		hn({
			gistId: "",
			token: "",
			autoSync: !1
		}), Zt(""), $t("已断开云同步配置");
	}
	function wn(e) {
		gn(e.data);
		let t = Array.isArray(e.snapshots) ? e.snapshots.slice(0, D) : [], n = Re(e.monthlyArchives);
		Kt(t), Jt(n), window.localStorage.setItem(pe, JSON.stringify(t)), window.localStorage.setItem(me, JSON.stringify(n));
	}
	async function Tn(e = !1) {
		if (!R.token.trim()) {
			e || window.alert("请先填写 GitHub Token。");
			return;
		}
		if (!Xt.trim()) {
			e || window.alert("请先填写同步密码。这个密码用于加密云端数据。");
			return;
		}
		tn(!0), e || $t("正在加密并上传到 GitHub Gist…");
		try {
			let t = await $e({
				backup: mn(),
				gistId: R.gistId,
				passphrase: Xt,
				token: R.token
			}), n = (/* @__PURE__ */ new Date()).toISOString();
			hn({
				...R,
				gistId: t.id,
				lastPushedAt: n
			}), $t(`${e ? "已自动云同步" : "云端保存完成"} · ${Ue(n)}`);
		} catch (t) {
			$t("云端保存失败，请检查 Token、Gist ID 和网络。"), e || window.alert(t instanceof Error ? t.message : "云端保存失败");
		} finally {
			tn(!1);
		}
	}
	async function En() {
		if (!R.gistId.trim()) {
			window.alert("请先填写 Gist ID，或先上传一次创建云端存档。");
			return;
		}
		if (!R.token.trim()) {
			window.alert("请先填写 GitHub Token。");
			return;
		}
		if (!Xt.trim()) {
			window.alert("请先填写同步密码。");
			return;
		}
		if (window.confirm("确定从云端覆盖当前本机数据吗？建议覆盖前先导出备份。")) {
			tn(!0), $t("正在从 GitHub Gist 拉取并解密…");
			try {
				wn(await et(R.gistId, R.token, Xt));
				let e = (/* @__PURE__ */ new Date()).toISOString();
				hn({
					...R,
					lastPulledAt: e
				}), on("已从云端恢复并自动保存到本机"), $t(`云端数据已拉取 · ${Ue(e)}`);
			} catch (e) {
				$t("云端拉取失败，请检查同步密码、Token 和 Gist ID。"), window.alert(e instanceof Error ? e.message : "云端拉取失败");
			} finally {
				tn(!1);
			}
		}
	}
	let Dn = o.find((e) => e.id === i) ?? o[0], On = Dn.salary, kn = Dn.stockIncome, An = Dn.otherIncome, jn = Dn.budgets, Mn = On + Math.max(kn, 0) + An, z = (() => {
		let e = c.reduce((e, t) => e + t.balance, 0), t = c.filter(Ae), n = t.reduce((e, t) => e + t.balance, 0), r = c.filter((e) => Ee(e) === "aShare").reduce((e, t) => e + t.balance, 0), i = c.filter((e) => Ee(e) === "usShare").reduce((e, t) => e + t.balance, 0), a = r + i, o = c.filter(Oe).reduce((e, t) => e + t.balance, 0), s = c.filter(ke).reduce((e, t) => e + t.balance, 0), l = o + s, d = Me(F), p = o > 0 ? o : d.hasTravel ? d.travelCurrent : le, h = s > 0 ? s : d.hasLearning ? d.learningCurrent : ge, _ = d.hasEmergency ? d.emergencyCurrent : ye, y = d.parentCurrent, b = d.partnerCurrent, x = d.otherCurrent, S = b, C = p + h + x, te = Math.max(0, C - l), ne = e - a - l, re = c.filter((e) => e.liquid).reduce((e, t) => e + t.balance, 0), ie = jn.reduce((e, t) => e + t.actual, 0), ae = jn.reduce((e, t) => e + t.plan, 0), oe = ae - ie, se = jn.filter((e) => e.fixed).reduce((e, t) => e + t.plan, 0), ce = jn.filter((e) => e.required).reduce((e, t) => e + t.plan, 0), ue = u.reduce((e, t) => e + rt(t.value, t.currency, f, m), 0), de = u.reduce((e, t) => e + rt(t.cost, t.currency, f, m), 0), w = u.filter((e) => e.market === "A股").reduce((e, t) => e + rt(t.value, t.currency, f, m), 0), T = u.filter((e) => e.market === "美股").reduce((e, t) => e + rt(t.value, t.currency, f, m), 0), fe = u.filter((e) => e.market === "港股").reduce((e, t) => e + rt(t.value, t.currency, f, m), 0), pe = Ye.reduce((e, t) => e + t.amount, 0), me = Ze.reduce((e, t) => e + t.amount, 0), he = e + ue + te + y + _ + pe, E = Ut.filter((e) => e.direction === "outflow").reduce((e, t) => e + t.amount, 0), D = (e, t) => Vt.includes(e) ? 0 : t, _e = D("spendingPlan", ae), O = d.hasTravel ? d.travelActualMonthly : le, k = d.hasLearning ? d.learningActualMonthly : ge, ve = d.hasParent ? d.parentActualMonthly : 0, A = d.hasPartner ? d.partnerActualMonthly : 0, be = d.hasEmergency ? d.emergencyActualMonthly : 0, xe = d.hasTravel ? d.travelMonthly : le, Se = d.hasLearning ? d.learningMonthly : ge, Ce = d.hasParent ? d.parentMonthly : 0, we = d.hasPartner ? d.partnerMonthly : 0, Te = d.hasEmergency ? d.emergencyMonthly : 0, De = D("travelSaving", O), je = D("learningSaving", k), Ne = D("parentSaving", ve), Pe = D("partnerSaving", A), Fe = D("emergencyFund", be), Ie = D("aSharePlan", g) + D("usSharePlan", v) + D("hkSharePlan", ee), Re = De + je + Ne + Pe + Fe + Ie + E, ze = Mn - ie - Re, Be = Mn ? se / Mn : 0, Ve = Mn ? Re / Mn : 0, He = Math.max(0, qe), Ue = He * Le, We = He ? _ / He : 0, j = he ? me / he : 0, Ge = Math.round(Math.max(0, Math.min(25, 25 - Math.max(0, Be - .35) * 85)) + Math.min(25, We / Math.max(Le, 1) * 25) + (me === 0 ? 20 : Math.max(0, 20 - j * 50)) + Math.min(20, Ve / .45 * 20) + (ue >= de ? 10 : 6));
		return {
			accountTotal: e,
			totalSavingsAccountTotal: n,
			totalSavingsAccountCount: t.length,
			operatingAccountTotal: ne,
			aShareInvestmentReserve: r,
			usShareInvestmentReserve: i,
			investmentReserve: a,
			accountSpecialSavings: l,
			liquidAccountTotal: re,
			spendingActual: ie,
			spendingPlan: ae,
			budgetRemaining: oe,
			fixedSpending: se,
			requiredSpending: ce,
			investmentValue: ue,
			investmentCost: de,
			investmentPnL: ue - de,
			aShareValue: w,
			usShareValue: T,
			hkShareValue: fe,
			manualAssetTotal: pe,
			cashflowSpendingPlan: _e,
			travelAllocation: De,
			learningAllocation: je,
			parentAllocation: Ne,
			partnerAllocation: Pe,
			emergencyAllocation: Fe,
			investmentSavingAllocation: Ie,
			customOutflow: E,
			travelAllocationSource: O,
			learningAllocationSource: k,
			parentAllocationSource: ve,
			partnerAllocationSource: A,
			emergencyAllocationSource: be,
			travelExpectedSource: xe,
			learningExpectedSource: Se,
			parentExpectedSource: Ce,
			partnerExpectedSource: we,
			emergencyExpectedSource: Te,
			travelSavings: p,
			learningSavings: h,
			parentSavings: y,
			partnerSavings: b,
			familyFund: S,
			otherSavings: x,
			totalSavings: C,
			savingsOutsideAccounts: te,
			totalDebt: me,
			totalAssets: he,
			netWorth: he - me,
			assetOutflow: Re,
			monthlySurplus: ze,
			fixedRatio: Be,
			savingsRate: Ve,
			emergencyCoverage: We,
			currentEmergencyFund: _,
			debtRatio: j,
			score: Ge,
			emergencyMonthlyNeed: He,
			emergencyTarget: Ue
		};
	})();
	function Nn(e, t) {
		return {
			id: t,
			monthId: i,
			label: Dn.label,
			savedAt: e,
			income: Mn,
			spending: z.spendingActual,
			allocation: z.assetOutflow,
			surplus: z.monthlySurplus,
			accountTotal: z.accountTotal,
			totalAssets: z.totalAssets,
			netWorth: z.netWorth,
			totalDebt: z.totalDebt,
			emergencyFund: z.currentEmergencyFund,
			savings: z.totalSavingsAccountTotal,
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
	function Pn() {
		let e = (/* @__PURE__ */ new Date()).toISOString(), n = Re([Nn(e, `${i}-${e}`), ...qt.filter((e) => e.monthId !== i)]);
		Jt(n), window.localStorage.setItem(me, JSON.stringify(n)), t((e) => e.includes("monthlyArchive") ? e : [...e, "monthlyArchive"]), on(`${Dn.label} 月报已保存`);
	}
	function Fn(e) {
		let t = qt.filter((t) => t.id !== e);
		Jt(t), window.localStorage.setItem(me, JSON.stringify(t));
	}
	let In = Nn("current-preview", `current-${i}`), Ln = qt.find((e) => e.monthId === i), Rn = Ln ?? In, zn = Ke(qt, i), Bn = Ge(Re([In, ...qt.filter((e) => e.monthId !== i)])), Vn = (() => {
		let e = [], t = z.accountTotal, n = Ut.filter((e) => e.direction === "inflow").reduce((e, t) => e + t.amount, 0);
		for (let r = 0; r < 6; r += 1) {
			let a = xe(i, r), s = o.find((e) => e.id === a), c = s?.salary ?? On, l = s ? Te(s) : z.spendingPlan, u = (Vt.includes("salary") ? 0 : c) + n, d = (Vt.includes("spendingPlan") ? 0 : l) + z.assetOutflow;
			t += u - d, e.push({
				month: be(s?.label ?? Se(a)),
				inflow: u,
				outflow: d,
				balance: t
			});
		}
		return e;
	})(), Hn = (() => {
		let e = Ut.filter((e) => e.direction === "inflow").reduce((e, t) => e + t.amount, 0), t = (Vt.includes("salary") ? 0 : On) + e;
		return [
			...nt.map((e) => ({
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
				outflow: z.assetOutflow,
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
			balance: z.accountTotal,
			rows: []
		}).rows;
	})();
	function Un(e, t) {
		l((n) => n.map((n) => n.id === e ? {
			...n,
			...t
		} : n));
	}
	function Wn() {
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
	function Gn(e) {
		l((t) => t.length > 1 ? t.filter((t) => t.id !== e) : t);
	}
	function Kn(e, t) {
		l((n) => {
			let r = n.findIndex((t) => t.id === e), i = n.findIndex((e) => e.id === t);
			if (r < 0 || i < 0 || r === i) return n;
			let a = [...n], [o] = a.splice(r, 1);
			return a.splice(i, 0, o), a;
		});
	}
	function qn(e, t) {
		s((n) => n.map((n) => n.id === e ? {
			...n,
			...t
		} : n));
	}
	function Jn() {
		s((e) => {
			let t = [...e].sort((e, t) => e.id.localeCompare(t.id)), n = t[t.length - 1] ?? re[0], [r, i] = n.id.split("-"), o = new Date(Number(r), Number(i) - 1, 1), s = new Date(o.getFullYear(), o.getMonth() + 1, 1), c = `${s.getFullYear()}-${String(s.getMonth() + 1).padStart(2, "0")}`, l = `${s.getFullYear()}年${s.getMonth() + 1}月`, u = n.budgets.length > 0 ? n.budgets : te, d = {
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
	function Yn(e) {
		s((t) => {
			if (t.length <= 1) return t;
			let n = [...t].sort((e, t) => e.id.localeCompare(t.id)), r = n.findIndex((t) => t.id === e), o = n.filter((t) => t.id !== e);
			return e === i && a((o[Math.max(0, r - 1)] ?? o[0]).id), o;
		});
	}
	function Xn(e) {
		qn(i, { salary: e });
	}
	function Zn() {
		Wt((e) => [...e, {
			id: `cashflow-${Date.now()}`,
			name: `新增现金流 ${e.length + 1}`,
			amount: 0,
			direction: "outflow"
		}]);
	}
	function Qn(e, t) {
		Wt((n) => n.map((n) => n.id === e ? {
			...n,
			...t
		} : n));
	}
	function $n(e) {
		Wt((t) => t.filter((t) => t.id !== e));
	}
	function er(e) {
		Ht((t) => t.includes(e) ? t : [...t, e]);
	}
	function tr(e, t) {
		s((n) => n.map((n) => n.id === i ? {
			...n,
			budgets: n.budgets.map((n) => n.id === e ? {
				...n,
				...t
			} : n)
		} : n));
	}
	function nr() {
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
	function rr(e) {
		s((t) => t.map((t) => t.id === i && t.budgets.length > 1 ? {
			...t,
			budgets: t.budgets.filter((t) => t.id !== e)
		} : t));
	}
	function ir(e, t) {
		d((n) => n.map((n) => n.id === e ? {
			...n,
			...t
		} : n));
	}
	function ar() {
		d((e) => [...e, {
			id: `holding-${Date.now()}`,
			name: `新投资 ${e.length + 1}`,
			market: "A股",
			cost: 0,
			value: 0,
			currency: "CNY"
		}]);
	}
	function or(e) {
		d((t) => t.length > 1 ? t.filter((t) => t.id !== e) : t);
	}
	function sr(e, t) {
		Xe((n) => n.map((n) => n.id === e ? {
			...n,
			...t
		} : n));
	}
	function cr() {
		Xe((e) => [...e, {
			id: `balance-asset-${Date.now()}`,
			name: `新资产 ${e.length + 1}`,
			amount: 0,
			note: "资产负债表补录"
		}]);
	}
	function lr(e) {
		Xe((t) => t.length > 1 ? t.filter((t) => t.id !== e) : t);
	}
	function ur(e, t) {
		Qe((n) => n.map((n) => n.id === e ? {
			...n,
			...t
		} : n));
	}
	function dr() {
		Qe((e) => [...e, {
			id: `liability-${Date.now()}`,
			name: `新负债 ${e.length + 1}`,
			amount: 0
		}]);
	}
	function fr(e) {
		Qe((t) => t.length > 1 ? t.filter((t) => t.id !== e) : t);
	}
	function pr(e, t) {
		P((n) => n.map((n) => n.id === e ? {
			...n,
			...t
		} : n));
	}
	function mr() {
		P((e) => [...e, {
			id: `reminder-${Date.now()}`,
			name: `新提醒 ${e.length + 1}`,
			date: "2026-07-01",
			amount: 0,
			kind: "账单"
		}]);
	}
	function hr(e) {
		P((t) => t.length > 1 ? t.filter((t) => t.id !== e) : t);
	}
	function gr(e, t) {
		ct((n) => n.map((n) => n.id === e ? {
			...n,
			...t
		} : n));
	}
	function _r(e, t) {
		ct((n) => {
			let r = n.find((t) => je(t) === e);
			return r ? n.map((e) => e.id === r.id ? {
				...e,
				...t
			} : e) : n;
		});
	}
	function vr(e) {
		E(e), _r("travel", { actualMonthly: e });
	}
	function yr(e) {
		ve(e), _r("learning", { actualMonthly: e });
	}
	function br(e) {
		_r("parent", { actualMonthly: e });
	}
	function xr(e) {
		_r("partner", { actualMonthly: e });
	}
	function Sr(e) {
		_r("emergency", { actualMonthly: e });
	}
	function Cr(e) {
		De(e), _r("emergency", { current: e });
	}
	function wr() {
		ct((e) => [...e, {
			id: `goal-${Date.now()}`,
			name: `新目标 ${e.length + 1}`,
			target: 0,
			current: 0,
			monthly: 0,
			actualMonthly: 0
		}]);
	}
	function Tr(e) {
		ct((t) => t.length > 1 ? t.filter((t) => t.id !== e) : t);
	}
	function Er(e, t) {
		lt((n) => n.map((n) => n.id === e ? {
			...n,
			...t
		} : n));
	}
	function Dr() {
		lt((e) => [...e, {
			id: `fund-bucket-${Date.now()}`,
			name: `新大花费项目 ${e.length + 1}`,
			kind: "其他",
			target: 0,
			current: 0,
			dueDate: i.length >= 7 ? `${i}-28` : "2026-12-31",
			locked: !0,
			note: "待分配"
		}]);
	}
	function Or(e) {
		lt((t) => t.length > 1 ? t.filter((t) => t.id !== e) : t);
	}
	function kr(e, t) {
		Ot((n) => n.map((n) => n.id === e ? {
			...n,
			...t
		} : n));
	}
	function Ar(e) {
		t((t) => t.includes(e) ? t.filter((t) => t !== e) : [...t, e]);
	}
	function jr() {
		t(_e.map((e) => e.id));
	}
	let Mr = Ze.length ? `${Ze.slice(0, 3).map((e) => `${e.name.trim() || "未命名负债"} ${O(e.amount)}`).join(" / ")}${Ze.length > 3 ? " / 更多" : ""}` : "暂无负债", Nr = [
		`旅游 ${O(z.travelAllocation)}`,
		`学习 ${O(z.learningAllocation)}`,
		`父母储蓄 ${O(z.parentAllocation)}`,
		`伴侣基金 ${O(z.partnerAllocation)}`,
		`应急 ${O(z.emergencyAllocation)}`,
		`投资储蓄 ${O(z.investmentSavingAllocation)}`
	].join(" / "), Pr = [
		`旅游 ${O(z.travelSavings)}`,
		`学习 ${O(z.learningSavings)}`,
		z.otherSavings > 0 ? `其他 ${O(z.otherSavings)}` : ""
	].filter(Boolean).join(" / "), Fr = {
		label: "父母储蓄",
		value: z.parentSavings,
		detail: z.parentSavings > 0 || z.parentAllocation > 0 ? `当前 ${O(z.parentSavings)} / 本月投入 ${O(z.parentAllocation)}` : "目标管理父母储蓄，单独列示",
		color: S[5]
	}, Ir = {
		label: "家庭及伴侣储蓄",
		value: z.familyFund,
		detail: z.familyFund > 0 || z.partnerAllocation > 0 ? `伴侣基金 ${O(z.familyFund)} / 本月家庭投入 ${O(z.partnerAllocation)}` : "家庭共同资金单列，不计入个人总资产",
		color: S[3],
		className: "family-fund-item"
	}, Lr = {
		label: "总负债",
		value: z.totalDebt,
		detail: Mr,
		color: S[4],
		className: "debt-breakdown-item"
	}, Rr = [
		z.aShareInvestmentReserve > 0 ? `A股待投 ${O(z.aShareInvestmentReserve)}` : "",
		z.usShareInvestmentReserve > 0 ? `美股待投 ${O(z.usShareInvestmentReserve)}` : "",
		z.accountSpecialSavings > 0 ? `专项 ${O(z.accountSpecialSavings)}` : ""
	].filter(Boolean).join(" / "), zr = Ye.filter((e) => e.amount > 0).slice(0, 3).map((e) => `${e.name.trim() || "未命名资产"} ${O(e.amount)}`).join(" / ") || "来自资产负债表资产项", Br = [
		{
			label: "账户现金",
			value: z.operatingAccountTotal,
			detail: Rr ? `不含 ${Rr}` : "日常账户余额",
			color: S[0]
		},
		{
			label: "A股待投储蓄",
			value: z.aShareInvestmentReserve,
			detail: "余额宝-8514，尚未进A股",
			color: S[6]
		},
		{
			label: "美股待投储蓄",
			value: z.usShareInvestmentReserve,
			detail: "中国银行8292，尚未进美股",
			color: S[5]
		},
		{
			label: "已投资市值",
			value: z.investmentValue,
			detail: `A股 ${O(z.aShareValue)} / 美股 ${O(z.usShareValue)} / 港股 ${O(z.hkShareValue)}`,
			color: S[1]
		},
		{
			label: "个人专项储蓄",
			value: z.totalSavings,
			detail: Pr,
			color: S[3]
		},
		Fr,
		{
			label: "实物资产",
			value: z.manualAssetTotal,
			detail: zr,
			color: S[5]
		},
		{
			label: "应急金",
			value: z.currentEmergencyFund,
			detail: `覆盖 ${z.emergencyCoverage.toFixed(1)} 月 / 目标 ${Le} 月`,
			color: S[2]
		}
	], Vr = [
		...Br.slice(0, 7),
		Lr,
		...Br.slice(7),
		Ir
	], Hr = c.filter((e) => e.balance !== 0).map((e) => ({
		label: e.name.trim() || "未命名账户",
		value: O(e.balance),
		note: e.purpose.trim() || e.type.trim() || "账户"
	})), Ur = [
		{
			title: "本月实际收入",
			value: O(Mn),
			detail: `${Dn.label} / 工资 ${O(On)} / 炒股 ${O(Math.max(kn, 0))}`,
			tone: "blue"
		},
		{
			title: "本月实际支出",
			value: O(z.spendingActual),
			detail: `${Dn.label} / 预算 ${O(z.spendingPlan)} / 固定支出率 ${A(z.fixedRatio)}`,
			tone: z.fixedRatio > .5 ? "red" : z.fixedRatio >= .35 ? "amber" : "green"
		},
		{
			title: "本月实际资产分配",
			value: O(z.assetOutflow),
			detail: `${Nr}${z.customOutflow > 0 ? ` / 其他 ${O(z.customOutflow)}` : ""}`,
			tone: "violet"
		},
		{
			title: "当月余额",
			value: O(z.monthlySurplus),
			detail: `收入 ${O(Mn)} - 支出 ${O(z.spendingActual)} - 分配 ${O(z.assetOutflow)}`,
			tone: z.monthlySurplus < 0 ? "red" : z.monthlySurplus < Mn * .1 ? "amber" : "green"
		},
		{
			title: "当前现金流",
			value: O(z.accountTotal),
			detail: `${Hr.length} 个非零账户 / 合计 ${O(z.accountTotal)} / 可动用 ${O(z.liquidAccountTotal)}`,
			tone: z.liquidAccountTotal < z.emergencyMonthlyNeed * 2 ? "red" : "green",
			items: Hr
		},
		{
			title: "目前总储蓄",
			value: O(z.totalSavingsAccountTotal),
			detail: `${z.totalSavingsAccountCount} 个储蓄账户 / 不含工行2616、微信、现金 / A股待投 ${O(z.aShareInvestmentReserve)} / 美股待投 ${O(z.usShareInvestmentReserve)}`,
			tone: "green"
		},
		{
			title: "目前总应急",
			value: O(z.currentEmergencyFund),
			detail: `覆盖 ${z.emergencyCoverage.toFixed(1)} 个月 / 目标 ${Le} 个月`,
			tone: "amber"
		}
	], Wr = [
		{
			label: "工资",
			value: On,
			color: S[0]
		},
		{
			label: "炒股月结",
			value: Math.max(kn, 0),
			color: S[1]
		},
		{
			label: "其他收入",
			value: An,
			color: S[3]
		}
	], Gr = o.filter((e) => e.id >= T).sort((e, t) => e.id.localeCompare(t.id)), Kr = Gr.map((e, t) => ({
		label: be(e.label),
		value: Ce(e),
		color: e.id === i ? S[0] : S[t % S.length],
		detail: e.id === i ? "当前月" : "月度"
	})), qr = Gr.map((e, t) => ({
		label: be(e.label),
		value: we(e),
		color: e.id === i ? S[4] : S[t % S.length],
		detail: e.id === i ? "当前月" : "月度"
	})), Jr = Gr.map((e, t) => ({
		label: be(e.label),
		value: Math.max(Ce(e) - we(e), 0),
		color: e.id === i ? S[1] : S[t % S.length],
		detail: e.id === i ? "当前月" : "月度"
	})), Yr = c.map((e, t) => ({
		item: e,
		index: t
	})).sort((e, t) => t.item.balance - e.item.balance || e.index - t.index).map(({ item: e }, t) => ({
		label: e.name.trim() || "未命名账户",
		value: e.balance,
		color: S[t % S.length],
		detail: e.type.trim() || "未分类"
	})), Xr = jn.map((e, t) => ({
		item: e,
		index: t
	})).sort((e, t) => t.item.actual - e.item.actual || t.item.plan - e.item.plan || e.index - t.index).map(({ item: e }, t) => ({
		label: e.name.trim() || "未命名支出",
		value: e.actual,
		max: Math.max(e.plan, e.actual, 1),
		color: e.actual > e.plan ? S[4] : S[t % S.length],
		detail: `${O(e.actual)} / ${O(e.plan)}`
	})), Zr = jn.map((e, t) => ({
		label: e.name.trim() || "未命名支出",
		value: e.actual,
		plan: e.plan,
		color: S[t % S.length],
		detail: `${e.required ? "必须" : "可取消"} / ${e.fixed ? "固定" : "弹性"}`
	})).filter((e) => e.value > 0).sort((e, t) => t.value - e.value), Qr = Zr.length ? Zr.slice(0, 8).map((e) => ({
		label: e.label,
		value: e.value,
		color: e.color
	})) : [{
		label: "暂无实际支出",
		value: 0,
		max: 1,
		color: "#b8c4d4",
		detail: "本月未记录"
	}], $r = Zr.map((e) => ({
		label: e.label,
		value: e.value,
		color: e.color,
		detail: `${A(e.value / Math.max(z.spendingActual, 1))} / ${O(e.value)}`
	})), ei = [{
		label: "固定支出",
		value: z.fixedSpending,
		color: S[2]
	}, {
		label: "弹性支出",
		value: Math.max(z.spendingPlan - z.fixedSpending, 0),
		color: S[0]
	}], ti = [{
		label: "必须支出",
		value: z.requiredSpending,
		color: S[1]
	}, {
		label: "可取消支出",
		value: Math.max(z.spendingPlan - z.requiredSpending, 0),
		color: S[2]
	}], ni = Vn[0]?.inflow ?? 0, ri = z.cashflowSpendingPlan + z.assetOutflow, ii = ni - ri, ai = [
		...[
			{
				id: "builtin-salary",
				builtinId: "salary",
				name: "工资流入",
				amount: On,
				direction: "inflow",
				source: "计入预测",
				onAmountChange: Xn,
				onDelete: () => er("salary")
			},
			{
				id: "builtin-spending-plan",
				builtinId: "spendingPlan",
				name: "生活支出预算",
				amount: z.spendingPlan,
				direction: "outflow",
				source: `${Dn.label}预算表动态汇总`,
				readonlyAmount: !0,
				onDelete: () => er("spendingPlan")
			},
			{
				id: "calculated-budget-remaining",
				name: "本月预算剩余",
				amount: z.budgetRemaining,
				direction: z.budgetRemaining >= 0 ? "inflow" : "outflow",
				source: "预算 - 实际，可转储蓄，不计入预测",
				readonlyAmount: !0,
				summaryOnly: !0
			},
			{
				id: "builtin-travel-saving",
				builtinId: "travelSaving",
				name: "旅游储蓄",
				amount: z.travelAllocationSource,
				direction: "outflow",
				source: "来自目标实际投入",
				onAmountChange: vr,
				onDelete: () => er("travelSaving")
			},
			{
				id: "builtin-learning-saving",
				builtinId: "learningSaving",
				name: "学习储蓄",
				amount: z.learningAllocationSource,
				direction: "outflow",
				source: "来自目标实际投入",
				onAmountChange: yr,
				onDelete: () => er("learningSaving")
			},
			{
				id: "builtin-parent-saving",
				builtinId: "parentSaving",
				name: "父母储蓄",
				amount: z.parentAllocationSource,
				direction: "outflow",
				source: "来自目标实际投入",
				onAmountChange: br,
				onDelete: () => er("parentSaving")
			},
			{
				id: "builtin-partner-saving",
				builtinId: "partnerSaving",
				name: "伴侣基金",
				amount: z.partnerAllocationSource,
				direction: "outflow",
				source: "来自目标实际投入",
				onAmountChange: xr,
				onDelete: () => er("partnerSaving")
			},
			{
				id: "builtin-emergency-fund",
				builtinId: "emergencyFund",
				name: "应急金投入",
				amount: z.emergencyAllocationSource,
				direction: "outflow",
				source: "来自目标实际投入",
				onAmountChange: Sr,
				onDelete: () => er("emergencyFund")
			},
			{
				id: "builtin-ashare-plan",
				builtinId: "aSharePlan",
				name: "A股计划",
				amount: g,
				direction: "outflow",
				source: "现金流出",
				onAmountChange: _,
				onDelete: () => er("aSharePlan")
			},
			{
				id: "builtin-usshare-plan",
				builtinId: "usSharePlan",
				name: "美股计划",
				amount: v,
				direction: "outflow",
				source: "现金流出",
				onAmountChange: y,
				onDelete: () => er("usSharePlan")
			},
			{
				id: "builtin-hkshare-plan",
				builtinId: "hkSharePlan",
				name: "港股计划",
				amount: ee,
				direction: "outflow",
				source: "现金流出",
				onAmountChange: ne,
				onDelete: () => er("hkSharePlan")
			}
		].filter((e) => !e.builtinId || !Vt.includes(e.builtinId)),
		...Ut.map((e) => ({
			id: e.id,
			name: e.name,
			amount: e.amount,
			direction: e.direction,
			source: "自定义",
			onNameChange: (t) => Qn(e.id, { name: t }),
			onAmountChange: (t) => Qn(e.id, { amount: t }),
			onDirectionChange: (t) => Qn(e.id, { direction: t }),
			onDelete: () => $n(e.id)
		})),
		{
			id: "calculated-cashflow-expected-increase",
			name: "现金流预计增加",
			amount: ii,
			direction: ii >= 0 ? "inflow" : "outflow",
			source: "月流入 - 月流出，自动同步",
			readonlyAmount: !0,
			summaryOnly: !0
		}
	], oi = ai.filter((e) => e.direction === "outflow" && !e.summaryOnly).map((e, t) => ({
		item: e,
		index: t
	})).sort((e, t) => t.item.amount - e.item.amount || e.index - t.index).map(({ item: e }, t) => ({
		label: e.name,
		value: e.amount,
		color: S[(t + 4) % S.length],
		detail: e.source
	})), si = Br.map((e, t) => ({
		item: e,
		index: t
	})).sort((e, t) => t.item.value - e.item.value || e.index - t.index).map(({ item: e }) => ({
		label: e.label,
		value: e.value,
		color: e.color
	})), ci = [
		{
			label: "A股",
			value: z.aShareValue,
			color: S[0]
		},
		{
			label: "美股",
			value: z.usShareValue,
			color: S[1]
		},
		{
			label: "港股",
			value: z.hkShareValue,
			color: S[3]
		}
	], li = u.map((e) => {
		let t = rt(e.value, e.currency, f, m), n = rt(e.cost, e.currency, f, m);
		return {
			label: e.market,
			value: Math.abs(t - n),
			color: t >= n ? S[1] : S[4],
			detail: `${t >= n ? "浮盈" : "浮亏"} ${O(t - n)}`
		};
	}), ui = Vn.map((e) => ({
		label: e.month,
		value: e.balance
	})), di = Vn.map((e) => ({
		label: e.month,
		value: e.outflow,
		color: S[4]
	})), fi = [
		{
			label: "期初现金",
			value: z.accountTotal,
			kind: "start",
			color: S[0]
		},
		{
			label: "工资",
			value: On,
			kind: "positive",
			color: S[1]
		},
		{
			label: "生活支出",
			value: -z.spendingPlan,
			kind: "negative",
			color: S[4]
		},
		{
			label: "资产分配",
			value: -z.assetOutflow,
			kind: "negative",
			color: S[2]
		},
		{
			label: "月末现金",
			value: z.accountTotal + On - z.spendingPlan - z.assetOutflow,
			kind: "end",
			color: S[3]
		}
	], pi = Vn.map((e) => ({
		label: e.month,
		value: e.balance + z.investmentValue + z.totalSavings + z.parentSavings + z.currentEmergencyFund + z.manualAssetTotal - z.totalDebt
	})), mi = [
		{
			label: "总资产",
			value: z.totalAssets,
			color: S[0]
		},
		{
			label: "总负债",
			value: z.totalDebt,
			color: S[4]
		},
		{
			label: "净资产",
			value: Math.max(z.netWorth, 0),
			color: S[1]
		}
	], hi = Ye.map((e, t) => ({
		label: e.name.trim() || "未命名资产",
		value: e.amount,
		color: S[t % S.length],
		detail: e.note.trim() || O(e.amount)
	})), gi = Ze.map((e, t) => ({
		label: e.name.trim() || "未命名负债",
		value: e.amount,
		color: S[(t + 4) % S.length]
	})), _i = F.map((e, t) => ({
		label: e.name,
		value: e.current,
		max: e.target,
		color: S[t % S.length],
		detail: `预期 ${O(e.monthly)} / 实际 ${O(e.actualMonthly)}`
	})), vi = F.reduce((e, t) => e + t.current, 0), yi = F.reduce((e, t) => e + t.target, 0), bi = F.reduce((e, t) => e + t.monthly, 0), xi = F.reduce((e, t) => e + t.actualMonthly, 0), Si = Math.max(0, Gr.findIndex((e) => e.id === i)), Ci = Gr.map((e, t) => ({
		label: be(e.label),
		value: e.id === i ? xi : bi,
		color: e.id === i ? S[1] : S[t % S.length],
		detail: e.id === i ? "实际投入" : "预期准备"
	})), wi = Gr.map((e, t) => ({
		label: be(e.label),
		value: we(e) + (e.id === i ? xi : bi),
		color: e.id === i ? S[2] : S[t % S.length],
		detail: `支出 ${O(we(e))}`
	})), Ti = Gr.map((e, t) => ({
		label: be(e.label),
		value: Math.min(yi, vi + xi + bi * Math.max(0, t - Si - 1))
	})), Ei = I.map((e, t) => {
		let n = Math.max(0, e.target - e.current), r = He(i, e.dueDate);
		return {
			...e,
			index: t,
			gap: n,
			monthsLeft: r,
			monthlyNeed: n / r,
			status: n <= 0 ? "已覆盖" : r <= 2 ? "紧急补齐" : "持续准备"
		};
	}), Di = Ei.reduce((e, t) => e + t.current, 0), Oi = Ei.filter((e) => e.locked).reduce((e, t) => e + t.current, 0), ki = Ei.reduce((e, t) => e + t.target, 0), Ai = Ei.reduce((e, t) => e + t.gap, 0), ji = Ei.filter((e) => e.gap > 0 && e.monthsLeft <= 2).reduce((e, t) => e + t.gap, 0), Mi = Ei.reduce((e, t) => e + t.monthlyNeed, 0), B = z.liquidAccountTotal - z.investmentReserve - Oi, V = z.investmentSavingAllocation ? z.investmentReserve / z.investmentSavingAllocation : 0, Ni = Mn - z.spendingActual - z.parentAllocation - z.partnerAllocation - z.investmentSavingAllocation, Pi = [{
		label: "投资待投金",
		value: z.investmentReserve,
		color: S[6],
		detail: `约覆盖 ${V.toFixed(1)} 个月投资计划`
	}, ...Ei.filter((e) => e.current > 0).map((e, t) => ({
		label: e.name,
		value: e.current,
		color: S[(t + 1) % S.length],
		detail: `${e.kind} / ${e.locked ? "锁定" : "可调整"}`
	}))], Fi = Ei.filter((e) => e.gap > 0).sort((e, t) => e.dueDate.localeCompare(t.dueDate)).map((e, t) => ({
		label: e.name,
		value: e.gap,
		color: e.monthsLeft <= 2 ? S[4] : S[(t + 2) % S.length],
		detail: `${e.dueDate} / 每月需 ${O(e.monthlyNeed)}`
	})), Ii = Ei.filter((e) => e.gap > 0).map((e, t) => ({
		label: e.name,
		value: e.monthlyNeed,
		color: e.monthsLeft <= 2 ? S[4] : S[t % S.length],
		detail: `${e.monthsLeft} 个月内`
	})), Li = [
		{
			title: "现金流安全",
			tone: z.monthlySurplus < 0 ? "red" : Ni < Mi ? "amber" : "green",
			summary: `当月余额 ${O(z.monthlySurplus)}，家庭与投资后可用 ${O(Ni)}`,
			detail: `收入 ${O(Mn)}，生活支出 ${O(z.spendingActual)}，家庭责任 ${O(z.parentAllocation + z.partnerAllocation)}，投资计划 ${O(z.investmentSavingAllocation)}。`,
			action: z.monthlySurplus < 0 ? "先把当月余额转正，暂停非必要小旅行和新增非刚性支出。" : Ni < Mi ? "未来大花费项目每月需求高于可用现金，优先压缩可调整项目或生活支出。" : "现金流可以覆盖当前安排，继续保持每月复盘。"
		},
		{
			title: "大花费项目覆盖",
			tone: B < 0 ? "red" : ji > 0 ? "amber" : "green",
			summary: `大花费项目缺口 ${O(Ai)}，未分配现金 ${O(B)}`,
			detail: `手动项目已准备 ${O(Di)} / 目标 ${O(ki)}；投资待投金 ${O(z.investmentReserve)} 单独锁定。`,
			action: B < 0 ? "资金标签超过可动用现金，需要减少已锁定金额或重新分配账户用途。" : ji > 0 ? "两个月内到期的大花费项目仍有缺口，优先补齐搬家、分期和近期旅行。" : "大花费项目结构健康，按截止日期继续补齐缺口。"
		},
		{
			title: "投资纪律",
			tone: V >= 2 ? "green" : V >= 1 ? "amber" : "red",
			summary: `待投资金可覆盖 ${V.toFixed(1)} 个月计划`,
			detail: `A股待投 ${O(z.aShareInvestmentReserve)}，美股待投 ${O(z.usShareInvestmentReserve)}，每月投资计划 ${O(z.investmentSavingAllocation)}。`,
			action: V >= 2 ? "不需要额外加速投入；保持只用待投资金，不动应急、旅行和家庭责任资金。" : "待投资金覆盖不足，新增投入前先确认应急金和大花费项目不被挤占。"
		},
		{
			title: "应急与负债",
			tone: z.emergencyCoverage >= 3 && z.totalDebt <= Mn * .2 ? "green" : "amber",
			summary: `应急覆盖 ${z.emergencyCoverage.toFixed(1)} 个月，负债 ${O(z.totalDebt)}`,
			detail: `应急目标 ${O(z.emergencyTarget)}，当前 ${O(z.currentEmergencyFund)}；总负债率 ${A(z.debtRatio)}。`,
			action: z.emergencyCoverage < 1 ? "先把硬应急金做到 1 个月必要支出，再追求更高投资速度。" : "应急金继续向 3 个月推进，手机分期按期结束即可。"
		}
	], Ri = [
		`${Dn.label}财务分析报告`,
		"",
		`1. 净资产与现金：总资产 ${O(z.totalAssets)}，净资产 ${O(z.netWorth)}，可动用现金 ${O(z.liquidAccountTotal)}，大花费项目后未分配现金 ${O(B)}。`,
		`2. 收支：收入 ${O(Mn)}，生活支出 ${O(z.spendingActual)}，资产/责任分配 ${O(z.assetOutflow)}，当月余额 ${O(z.monthlySurplus)}。`,
		`3. 家庭责任：父母 ${O(z.parentAllocation)}，伴侣 ${O(z.partnerAllocation)}，合计占收入 ${A((z.parentAllocation + z.partnerAllocation) / Math.max(Mn, 1))}。`,
		`4. 大花费项目：目标 ${O(ki)}，已准备 ${O(Di)}，缺口 ${O(Ai)}，其中两个月内缺口 ${O(ji)}。`,
		`5. 投资：投资市值 ${O(z.investmentValue)}，待投资金 ${O(z.investmentReserve)}，计划覆盖 ${V.toFixed(1)} 个月，浮动盈亏 ${O(z.investmentPnL)}。`,
		`6. 应急与负债：应急覆盖 ${z.emergencyCoverage.toFixed(1)} 个月，总负债 ${O(z.totalDebt)}，负债率 ${A(z.debtRatio)}。`,
		"",
		"行动建议：",
		...Li.map((e, t) => `${t + 1}. ${e.title}：${e.action}`)
	].join("\n"), zi = nt.map((e, t) => ({
		label: e.name,
		value: e.amount,
		color: S[t % S.length],
		detail: `${Math.max(0, Ve(e.date))} 天后`
	})), Bi = nt.map((e, t) => ({
		label: e.kind,
		value: Math.max(0, Ve(e.date)),
		color: S[t % S.length],
		detail: e.date
	})), Vi = [
		{
			id: "salary",
			name: "工资",
			amount: On,
			flow: "收入",
			source: `${Dn.label}收入底表`
		},
		{
			id: "stock-income",
			name: "炒股月结",
			amount: Math.max(kn, 0),
			flow: "收入",
			source: `${Dn.label}收入底表`
		},
		{
			id: "other-income",
			name: "其他收入",
			amount: An,
			flow: "收入",
			source: `${Dn.label}收入底表`
		},
		{
			id: "spending-actual",
			name: "生活实际支出",
			amount: z.spendingActual,
			flow: "支出",
			source: "支出预算底表实际汇总"
		},
		{
			id: "spending-plan",
			name: "生活支出预算",
			amount: z.spendingPlan,
			flow: "预算",
			source: "支出预算底表预算汇总"
		},
		{
			id: "budget-remaining",
			name: "本月预算剩余",
			amount: z.budgetRemaining,
			flow: "可转储蓄",
			source: "生活支出预算 - 实际支出"
		},
		{
			id: "travel-saving",
			name: "旅游储蓄",
			amount: z.travelAllocationSource,
			flow: "资产分配",
			source: "目标管理本月实际投入"
		},
		{
			id: "learning-saving",
			name: "学习储蓄",
			amount: z.learningAllocationSource,
			flow: "资产分配",
			source: "目标管理本月实际投入"
		},
		{
			id: "parent-saving",
			name: "父母储蓄",
			amount: z.parentAllocationSource,
			flow: "资产分配",
			source: "目标管理本月实际投入"
		},
		{
			id: "partner-saving",
			name: "伴侣基金",
			amount: z.partnerAllocationSource,
			flow: "家庭分配",
			source: "目标管理本月实际投入，不计入个人总资产"
		},
		{
			id: "emergency-saving",
			name: "应急金投入",
			amount: z.emergencyAllocationSource,
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
			amount: ee,
			flow: "资产分配",
			source: "投资计划 / 现金流预测"
		},
		{
			id: "investment-reserve",
			name: "投资待投金",
			amount: z.investmentReserve,
			flow: "大花费项目",
			source: "账户用途自动识别：A股待投 + 美股待投"
		},
		{
			id: "fund-bucket-gap",
			name: "大花费项目缺口",
			amount: Ai,
			flow: "大花费项目",
			source: "大花费项目目标 - 已准备金额"
		},
		{
			id: "liquid-after-buckets",
			name: "大花费项目后未分配现金",
			amount: B,
			flow: "安全垫",
			source: "可动用现金 - 待投资金 - 已锁定大花费项目"
		},
		{
			id: "monthly-surplus",
			name: "当月余额",
			amount: z.monthlySurplus,
			flow: "结余",
			source: "收入 - 实际支出 - 实际资产分配"
		}
	], Hi = [
		{
			label: "收入",
			value: Mn,
			color: S[0]
		},
		{
			label: "支出",
			value: z.spendingActual,
			color: S[4]
		},
		{
			label: "资产分配",
			value: z.assetOutflow,
			color: S[1]
		},
		{
			label: "月结余",
			value: Math.max(z.monthlySurplus, 0),
			color: S[3]
		}
	], Ui = jn.map((e, t) => {
		let n = e.plan ? e.actual / e.plan : 0;
		return {
			label: e.name,
			value: n * 100,
			color: n > 1 ? S[4] : n > .8 ? S[2] : S[t % S.length],
			detail: `${Math.round(n * 100)}%`
		};
	}), Wi = u.map((e, t) => {
		let n = rt(e.value, e.currency, f, m), r = rt(e.cost, e.currency, f, m), i = z.investmentValue ? n / z.investmentValue * 100 : 0, a = r ? (n - r) / r * 100 : 0;
		return {
			label: e.market,
			x: k(i),
			y: k(a + 50),
			value: `${a.toFixed(1)}% / ${i.toFixed(0)}%`,
			color: S[t % S.length]
		};
	}), Gi = [
		{
			label: "现金流健康",
			value: k((z.monthlySurplus / Math.max(Mn, 1) + .2) * 180),
			color: S[0]
		},
		{
			label: "抗风险能力",
			value: k(z.emergencyCoverage / Math.max(Le, 1) * 100),
			color: S[1]
		},
		{
			label: "负债风险",
			value: k(100 - z.debtRatio * 100),
			color: S[4]
		},
		{
			label: "增长能力",
			value: k(z.savingsRate / .45 * 100),
			color: S[3]
		},
		{
			label: "投资表现",
			value: z.investmentValue >= z.investmentCost ? 82 : 58,
			color: S[2]
		}
	], Ki = [
		{
			label: "固定支出率",
			x: k(z.fixedRatio * 120),
			y: k(z.fixedRatio > .5 ? 86 : z.fixedRatio > .35 ? 62 : 32),
			value: A(z.fixedRatio),
			color: z.fixedRatio > .5 ? S[4] : z.fixedRatio > .35 ? S[2] : S[1]
		},
		{
			label: "应急金缺口",
			x: k(100 - z.emergencyCoverage / Math.max(Le, 1) * 100),
			y: k(80 - z.emergencyCoverage * 10),
			value: `${z.emergencyCoverage.toFixed(1)}月`,
			color: S[2]
		},
		{
			label: "现金流末余额",
			x: k((z.spendingPlan * 4 - (Vn[Vn.length - 1]?.balance ?? 0)) / Math.max(z.spendingPlan * 4, 1) * 100),
			y: k((z.spendingPlan * 3 - (Vn[Vn.length - 1]?.balance ?? 0)) / Math.max(z.spendingPlan * 3, 1) * 100),
			value: O(Vn[Vn.length - 1]?.balance ?? 0),
			color: S[0]
		},
		{
			label: "负债率",
			x: k(z.debtRatio * 100),
			y: k(z.debtRatio * 120),
			value: A(z.debtRatio),
			color: S[4]
		},
		{
			label: "投资波动",
			x: k(Math.abs(z.investmentPnL) / Math.max(z.investmentCost, 1) * 100),
			y: z.investmentPnL >= 0 ? 34 : 72,
			value: O(z.investmentPnL),
			color: z.investmentPnL >= 0 ? S[1] : S[4]
		}
	], qi = L.map((e, t) => ({
		label: e.name,
		value: e.score,
		color: S[t % S.length]
	})), Ji = Bn.map((e, t) => ({
		label: be(e.label),
		value: e.income,
		color: e.monthId === i ? S[0] : S[t % S.length],
		detail: e.monthId === i && !Ln ? "当前预览" : "已存档"
	})), Yi = Bn.map((e, t) => ({
		label: be(e.label),
		value: e.spending,
		color: e.monthId === i ? S[4] : S[(t + 4) % S.length],
		detail: e.monthId === i && !Ln ? "当前预览" : "已存档"
	})), Xi = Bn.map((e) => ({
		label: be(e.label),
		value: e.netWorth
	})), Zi = Bn.map((e) => ({
		label: be(e.label),
		value: e.accountTotal
	})), Qi = Bn.map((e) => ({
		label: be(e.label),
		value: e.surplus
	})), $i = Rn.income - (zn?.income ?? 0), ea = Rn.spending - (zn?.spending ?? 0), ta = Rn.accountTotal - (zn?.accountTotal ?? 0), na = Rn.netWorth - (zn?.netWorth ?? 0);
	async function ra() {
		try {
			await navigator.clipboard.writeText(Ri), cn("报告已复制到剪贴板");
		} catch {
			cn("复制失败，可以直接选中文本复制");
		}
	}
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
				_e.map((t) => /* @__PURE__ */ (0, x.jsx)("button", {
					className: e.includes(t.id) ? "active" : "",
					onClick: () => Ar(t.id),
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
						children: [/* @__PURE__ */ (0, x.jsx)("span", { className: ln ? "save-dot ready" : "save-dot" }), /* @__PURE__ */ (0, x.jsxs)("div", { children: [/* @__PURE__ */ (0, x.jsx)("strong", { children: an }), /* @__PURE__ */ (0, x.jsxs)("small", { children: ["这是本机浏览器保存；跨电脑实时同步请打开云同步。", Qt ? `云端：${Qt}` : ""] })] })]
					}), /* @__PURE__ */ (0, x.jsxs)("div", {
						className: "data-actions",
						children: [
							/* @__PURE__ */ (0, x.jsx)("button", {
								className: "primary-button",
								type: "button",
								onClick: Pn,
								children: "保存本月月报"
							}),
							/* @__PURE__ */ (0, x.jsx)("button", {
								className: "secondary-button",
								type: "button",
								onClick: _n,
								children: "保存完整版本"
							}),
							/* @__PURE__ */ (0, x.jsx)("button", {
								className: "secondary-button",
								type: "button",
								onClick: () => t((e) => e.includes("cloudSync") ? e : [...e, "cloudSync"]),
								children: "打开云同步"
							}),
							/* @__PURE__ */ (0, x.jsxs)("button", {
								className: "secondary-button",
								type: "button",
								onClick: () => rn((e) => !e),
								children: ["历史版本 ", Gt.length > 0 ? `(${Gt.length})` : ""]
							}),
							/* @__PURE__ */ (0, x.jsx)("button", {
								className: "secondary-button",
								type: "button",
								onClick: bn,
								children: "导出备份"
							}),
							/* @__PURE__ */ (0, x.jsx)("button", {
								className: "secondary-button",
								type: "button",
								onClick: () => fn.current?.click(),
								children: "导入备份"
							}),
							/* @__PURE__ */ (0, x.jsx)("input", {
								ref: fn,
								className: "visually-hidden",
								accept: "application/json,.json",
								type: "file",
								onChange: (e) => {
									let t = e.target.files?.[0];
									t && xn(t);
								}
							})
						]
					})]
				}),
				nn && /* @__PURE__ */ (0, x.jsxs)("section", {
					className: "history-panel",
					children: [/* @__PURE__ */ (0, x.jsxs)("div", {
						className: "history-heading",
						children: [/* @__PURE__ */ (0, x.jsxs)("div", { children: [/* @__PURE__ */ (0, x.jsx)("h2", { children: "历史版本" }), /* @__PURE__ */ (0, x.jsxs)("p", { children: [
							"最多保留最近 ",
							D,
							" 个手动快照。恢复前可以先保存当前版本。"
						] })] }), /* @__PURE__ */ (0, x.jsx)("button", {
							className: "secondary-button",
							type: "button",
							onClick: () => rn(!1),
							children: "关闭"
						})]
					}), Gt.length === 0 ? /* @__PURE__ */ (0, x.jsx)("div", {
						className: "history-empty",
						children: "还没有历史版本。点击“保存历史版本”即可创建第一个快照。"
					}) : /* @__PURE__ */ (0, x.jsx)("div", {
						className: "history-list",
						children: Gt.map((e) => /* @__PURE__ */ (0, x.jsxs)("article", {
							className: "history-item",
							children: [/* @__PURE__ */ (0, x.jsxs)("div", { children: [/* @__PURE__ */ (0, x.jsx)("strong", { children: Ue(e.createdAt) }), /* @__PURE__ */ (0, x.jsxs)("span", { children: [
								e.data.selectedMonth ?? i,
								" · ",
								e.data.accounts.length,
								" 个账户"
							] })] }), /* @__PURE__ */ (0, x.jsxs)("div", {
								className: "history-actions",
								children: [/* @__PURE__ */ (0, x.jsx)("button", {
									className: "secondary-button",
									type: "button",
									onClick: () => vn(e),
									children: "恢复"
								}), /* @__PURE__ */ (0, x.jsx)("button", {
									className: "danger-button",
									type: "button",
									onClick: () => yn(e.id),
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
									/* @__PURE__ */ (0, x.jsx)("strong", { children: O(z.totalAssets) }),
									/* @__PURE__ */ (0, x.jsxs)("small", { children: [
										"资产合计 ",
										O(z.totalAssets),
										" / 总负债 ",
										O(z.totalDebt),
										" / 净资产 ",
										O(z.netWorth),
										"；家庭及伴侣储蓄单列，不计入个人总资产。"
									] })
								]
							}), /* @__PURE__ */ (0, x.jsx)("div", {
								className: "total-assets-breakdown",
								"aria-label": "总资产和负债资金分布",
								children: Vr.map((e) => /* @__PURE__ */ (0, x.jsxs)("div", {
									className: `asset-breakdown-item ${e.className ?? ""}`.trim(),
									style: { "--asset-color": e.color },
									children: [
										/* @__PURE__ */ (0, x.jsx)("span", { children: e.label }),
										/* @__PURE__ */ (0, x.jsx)("strong", { children: O(e.value) }),
										/* @__PURE__ */ (0, x.jsx)("em", { children: e.detail })
									]
								}, e.label))
							})]
						}),
						/* @__PURE__ */ (0, x.jsx)("div", {
							className: "overview-grid",
							children: Ur.map((e) => /* @__PURE__ */ (0, x.jsxs)("article", {
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
									/* @__PURE__ */ (0, x.jsx)(N, {
										title: "资产结构",
										summary: `总资产 ${O(z.totalAssets)}`,
										children: /* @__PURE__ */ (0, x.jsx)(Dt, {
											data: si,
											centerLabel: "总资产",
											centerValue: O(z.totalAssets)
										})
									}),
									/* @__PURE__ */ (0, x.jsx)(N, {
										title: "未来现金流趋势",
										summary: "6 个月余额曲线",
										children: /* @__PURE__ */ (0, x.jsx)(jt, {
											data: ui,
											valueFormatter: O
										})
									}),
									/* @__PURE__ */ (0, x.jsx)(N, {
										title: "支出最高项",
										summary: `已花 ${O(z.spendingActual)}`,
										className: "spending-top-panel",
										children: /* @__PURE__ */ (0, x.jsx)(kt, {
											data: Qr,
											valueFormatter: O
										})
									}),
									/* @__PURE__ */ (0, x.jsx)(N, {
										title: "健康维度",
										summary: `综合 ${z.score} 分`,
										children: /* @__PURE__ */ (0, x.jsx)(kt, {
											data: Gi,
											valueFormatter: (e) => `${e.toFixed(0)}分`,
											percentMode: !0
										})
									}),
									/* @__PURE__ */ (0, x.jsx)(N, {
										title: "本月现金瀑布",
										summary: "期初到月末",
										children: /* @__PURE__ */ (0, x.jsx)(Ft, { data: fi })
									}),
									/* @__PURE__ */ (0, x.jsx)(N, {
										title: "未来现金流日历",
										summary: "关键流入流出",
										children: /* @__PURE__ */ (0, x.jsx)(Pt, { events: Hn })
									}),
									/* @__PURE__ */ (0, x.jsx)(N, {
										title: "风险矩阵",
										summary: "影响 × 紧迫",
										className: "wide risk-panel",
										children: /* @__PURE__ */ (0, x.jsx)(It, { data: Ki })
									}),
									/* @__PURE__ */ (0, x.jsx)(N, {
										title: "资金分配流向",
										summary: `分配 ${O(z.assetOutflow)}`,
										children: /* @__PURE__ */ (0, x.jsx)(Lt, {
											data: oi,
											source: "工资账户",
											valueFormatter: O
										})
									})
								]
							})]
						}),
						/* @__PURE__ */ (0, x.jsx)("div", {
							className: "module-grid",
							children: _e.map((t) => /* @__PURE__ */ (0, x.jsxs)("button", {
								className: `module-card ${e.includes(t.id) ? "selected" : ""}`,
								onClick: () => Ar(t.id),
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
								onClick: jr,
								children: "打开全部"
							}), /* @__PURE__ */ (0, x.jsx)("button", {
								onClick: () => t([]),
								children: "全部收起"
							})]
						})]
					}), e.map((e) => /* @__PURE__ */ (0, x.jsxs)("section", {
						className: "detail-panel",
						children: [
							e === "income" && /* @__PURE__ */ (0, x.jsx)(ot, {
								title: "收入",
								desc: "收入只看实际到账；炒股月结算单独记录，不进入现金流预测。",
								children: /* @__PURE__ */ (0, x.jsx)(at, {
									data: /* @__PURE__ */ (0, x.jsx)(ut, {
										records: o,
										selectedMonth: i,
										onSelect: a,
										addMonthRecord: Jn,
										deleteMonthRecord: Yn,
										updateMonthRecord: qn
									}),
									charts: /* @__PURE__ */ (0, x.jsxs)("div", {
										className: "chart-grid two",
										children: [
											/* @__PURE__ */ (0, x.jsx)(N, {
												title: "收入结构",
												summary: `${Dn.label} ${O(Mn)}`,
												children: /* @__PURE__ */ (0, x.jsx)(Dt, {
													data: Wr,
													centerLabel: "实际收入",
													centerValue: O(Mn)
												})
											}),
											/* @__PURE__ */ (0, x.jsx)(N, {
												title: "收入口径",
												summary: "股票月结不进预测",
												children: /* @__PURE__ */ (0, x.jsx)(Mt, {
													data: Wr,
													valueFormatter: O
												})
											}),
											/* @__PURE__ */ (0, x.jsx)(N, {
												title: "月度收入趋势",
												summary: "按月份分开记录",
												children: /* @__PURE__ */ (0, x.jsx)(At, {
													data: Kr,
													valueFormatter: O
												})
											})
										]
									})
								})
							}),
							e === "spending" && /* @__PURE__ */ (0, x.jsx)(ot, {
								title: "支出",
								desc: "支出与收入分开管理；预算、实际金额、必要性都能直接编辑。",
								children: /* @__PURE__ */ (0, x.jsx)(at, {
									data: /* @__PURE__ */ (0, x.jsxs)(x.Fragment, { children: [/* @__PURE__ */ (0, x.jsx)(st, {
										records: o,
										selectedMonth: i,
										onAddMonth: Jn,
										onChange: a,
										onDeleteSelectedMonth: () => Yn(i)
									}), /* @__PURE__ */ (0, x.jsx)(Bt, {
										budgets: jn,
										deleteBudget: rr,
										addBudget: nr,
										updateBudget: tr
									})] }),
									charts: /* @__PURE__ */ (0, x.jsxs)("div", {
										className: "chart-grid two",
										children: [
											/* @__PURE__ */ (0, x.jsx)(N, {
												title: "实际支出最高8项",
												summary: `已花 ${O(z.spendingActual)}`,
												className: "spending-top-panel",
												children: /* @__PURE__ */ (0, x.jsx)(kt, {
													data: Qr,
													valueFormatter: O
												})
											}),
											/* @__PURE__ */ (0, x.jsx)(N, {
												title: "全部实际支出占比",
												summary: "按实际金额",
												children: /* @__PURE__ */ (0, x.jsx)(Dt, {
													data: $r,
													centerLabel: "实际",
													centerValue: O(z.spendingActual)
												})
											}),
											/* @__PURE__ */ (0, x.jsx)(N, {
												title: "分类预算执行",
												summary: "实际 / 预算 / 按实际金额降序",
												children: /* @__PURE__ */ (0, x.jsx)(kt, {
													data: Xr,
													valueFormatter: O
												})
											}),
											/* @__PURE__ */ (0, x.jsx)(N, {
												title: "预算必要性结构",
												summary: "必须 vs 可取消",
												children: /* @__PURE__ */ (0, x.jsx)(Dt, {
													data: ti,
													centerLabel: "预算",
													centerValue: O(z.spendingPlan)
												})
											}),
											/* @__PURE__ */ (0, x.jsx)(N, {
												title: "月度支出趋势",
												summary: "每月实际支出",
												children: /* @__PURE__ */ (0, x.jsx)(At, {
													data: qr,
													valueFormatter: O
												})
											}),
											/* @__PURE__ */ (0, x.jsx)(N, {
												title: "月度结余趋势",
												summary: "收入 - 实际支出",
												children: /* @__PURE__ */ (0, x.jsx)(At, {
													data: Jr,
													valueFormatter: O
												})
											})
										]
									})
								})
							}),
							e === "cashflow" && /* @__PURE__ */ (0, x.jsx)(ot, {
								title: "现金流预测",
								desc: "未来 6 个月预测；资产分配作为现金流出，股票收入不计入预测。",
								children: /* @__PURE__ */ (0, x.jsx)(at, {
									data: /* @__PURE__ */ (0, x.jsxs)(x.Fragment, { children: [
										/* @__PURE__ */ (0, x.jsx)(st, {
											records: o,
											selectedMonth: i,
											onAddMonth: Jn,
											onChange: a,
											onDeleteSelectedMonth: () => Yn(i)
										}),
										/* @__PURE__ */ (0, x.jsx)(mt, {
											accountTotal: z.accountTotal,
											addCashflowCustomItem: Zn,
											monthlyInflow: ni,
											monthlyOutflow: ri,
											rows: ai
										}),
										/* @__PURE__ */ (0, x.jsx)(bt, {
											reminders: nt,
											addReminder: mr,
											deleteReminder: hr,
											updateReminder: pr
										})
									] }),
									charts: /* @__PURE__ */ (0, x.jsxs)("div", {
										className: "chart-grid two",
										children: [
											/* @__PURE__ */ (0, x.jsx)(N, {
												title: "余额趋势",
												summary: "未来 6 个月",
												children: /* @__PURE__ */ (0, x.jsx)(jt, {
													data: ui,
													valueFormatter: O
												})
											}),
											/* @__PURE__ */ (0, x.jsx)(N, {
												title: "月度流出压力",
												summary: `每月流出 ${O(ri)}`,
												children: /* @__PURE__ */ (0, x.jsx)(At, {
													data: di,
													valueFormatter: O
												})
											}),
											/* @__PURE__ */ (0, x.jsx)(N, {
												title: "现金瀑布",
												summary: "本月资金变化",
												children: /* @__PURE__ */ (0, x.jsx)(Ft, { data: fi })
											}),
											/* @__PURE__ */ (0, x.jsx)(N, {
												title: "现金流日历",
												summary: "账单与工资联动",
												children: /* @__PURE__ */ (0, x.jsx)(Pt, { events: Hn })
											})
										]
									})
								})
							}),
							e === "accounts" && /* @__PURE__ */ (0, x.jsx)(ot, {
								title: "账户管理",
								desc: "账户可以新增、删除、编辑和拖动排序，修改后会联动总资产、现金流和图表。",
								children: /* @__PURE__ */ (0, x.jsx)(at, {
									data: /* @__PURE__ */ (0, x.jsx)(x.Fragment, { children: /* @__PURE__ */ (0, x.jsx)(ht, {
										accounts: c,
										addAccount: Wn,
										deleteAccount: Gn,
										liquidAccountTotal: z.liquidAccountTotal,
										reorderAccount: Kn,
										total: z.accountTotal,
										updateAccount: Un
									}) }),
									charts: /* @__PURE__ */ (0, x.jsxs)("div", {
										className: "chart-grid two",
										children: [
											/* @__PURE__ */ (0, x.jsx)(N, {
												title: "账户余额分布",
												summary: `账户合计 ${O(z.accountTotal)} / 按余额降序`,
												children: /* @__PURE__ */ (0, x.jsx)(Dt, {
													data: Yr,
													centerLabel: "账户",
													centerValue: O(z.accountTotal)
												})
											}),
											/* @__PURE__ */ (0, x.jsx)(N, {
												title: "可动用现金",
												summary: `可立即动用 ${O(z.liquidAccountTotal)} / 按余额降序`,
												children: /* @__PURE__ */ (0, x.jsx)(kt, {
													data: Yr,
													valueFormatter: O
												})
											}),
											/* @__PURE__ */ (0, x.jsx)(N, {
												title: "账户用途映射",
												summary: "账户余额流向 / 按余额降序",
												children: /* @__PURE__ */ (0, x.jsx)(Lt, {
													data: Yr,
													source: "账户池",
													valueFormatter: O
												})
											})
										]
									})
								})
							}),
							e === "budget" && /* @__PURE__ */ (0, x.jsx)(ot, {
								title: "预算管理",
								desc: "预算模块保留周/月/季/年视图，固定支出率阈值为 35% 和 50%。",
								children: /* @__PURE__ */ (0, x.jsx)(at, {
									data: /* @__PURE__ */ (0, x.jsxs)(x.Fragment, { children: [
										/* @__PURE__ */ (0, x.jsx)(st, {
											records: o,
											selectedMonth: i,
											onChange: a
										}),
										/* @__PURE__ */ (0, x.jsxs)("div", {
											className: "stat-strip",
											children: [
												/* @__PURE__ */ (0, x.jsx)(M, {
													label: "当前视图",
													value: `${n} / ${be(Dn.label)}`
												}),
												/* @__PURE__ */ (0, x.jsx)(M, {
													label: "预算总额",
													value: O(z.spendingPlan)
												}),
												/* @__PURE__ */ (0, x.jsx)(M, {
													label: "固定支出率",
													value: A(z.fixedRatio)
												}),
												/* @__PURE__ */ (0, x.jsx)(M, {
													label: "预算剩余",
													value: O(z.spendingPlan - z.spendingActual)
												})
											]
										}),
										/* @__PURE__ */ (0, x.jsx)(Bt, {
											budgets: jn,
											deleteBudget: rr,
											addBudget: nr,
											updateBudget: tr
										})
									] }),
									charts: /* @__PURE__ */ (0, x.jsxs)("div", {
										className: "chart-grid two",
										children: [
											/* @__PURE__ */ (0, x.jsx)(N, {
												title: "固定 / 弹性支出",
												summary: it(z.fixedRatio),
												children: /* @__PURE__ */ (0, x.jsx)(Dt, {
													data: ei,
													centerLabel: "固定率",
													centerValue: A(z.fixedRatio)
												})
											}),
											/* @__PURE__ */ (0, x.jsx)(N, {
												title: "分类预算排行",
												summary: "看哪里最容易超 / 按实际金额降序",
												children: /* @__PURE__ */ (0, x.jsx)(kt, {
													data: Xr,
													valueFormatter: O
												})
											}),
											/* @__PURE__ */ (0, x.jsx)(N, {
												title: "预算使用热力",
												summary: "实际 / 预算",
												children: /* @__PURE__ */ (0, x.jsx)(Rt, { data: Ui })
											})
										]
									})
								})
							}),
							e === "investment" && /* @__PURE__ */ (0, x.jsx)(ot, {
								title: "投资管理",
								desc: "投资理财单独成栏，A股 / 美股 / 港股分开看；计划投入和市值都能改。",
								children: /* @__PURE__ */ (0, x.jsx)(at, {
									data: /* @__PURE__ */ (0, x.jsxs)(x.Fragment, { children: [/* @__PURE__ */ (0, x.jsxs)("div", {
										className: "form-grid",
										children: [
											/* @__PURE__ */ (0, x.jsx)(tt, {
												label: "美元兑人民币",
												value: f,
												onChange: p,
												step: .01
											}),
											/* @__PURE__ */ (0, x.jsx)(tt, {
												label: "港币兑人民币",
												value: m,
												onChange: h,
												step: .01
											}),
											/* @__PURE__ */ (0, x.jsx)(tt, {
												label: "A股月计划投入",
												value: g,
												onChange: _
											}),
											/* @__PURE__ */ (0, x.jsx)(tt, {
												label: "美股月计划投入",
												value: v,
												onChange: y
											}),
											/* @__PURE__ */ (0, x.jsx)(tt, {
												label: "港股月计划投入",
												value: ee,
												onChange: ne
											})
										]
									}), /* @__PURE__ */ (0, x.jsx)(gt, {
										holdings: u,
										addHolding: ar,
										deleteHolding: or,
										fxHkd: m,
										fxUsd: f,
										updateHolding: ir
									})] }),
									charts: /* @__PURE__ */ (0, x.jsxs)("div", {
										className: "chart-grid two",
										children: [
											/* @__PURE__ */ (0, x.jsx)(N, {
												title: "市场分布",
												summary: `投资市值 ${O(z.investmentValue)}`,
												children: /* @__PURE__ */ (0, x.jsx)(Dt, {
													data: ci,
													centerLabel: "投资",
													centerValue: O(z.investmentValue)
												})
											}),
											/* @__PURE__ */ (0, x.jsx)(N, {
												title: "盈亏绝对值",
												summary: `总盈亏 ${O(z.investmentPnL)}`,
												children: /* @__PURE__ */ (0, x.jsx)(kt, {
													data: li,
													valueFormatter: O
												})
											}),
											/* @__PURE__ */ (0, x.jsx)(N, {
												title: "收益率 / 仓位",
												summary: "横轴仓位，纵轴收益",
												children: /* @__PURE__ */ (0, x.jsx)(zt, {
													data: Wi,
													xLabel: "仓位",
													yLabel: "收益"
												})
											})
										]
									})
								})
							}),
							e === "balance" && /* @__PURE__ */ (0, x.jsx)(ot, {
								title: "资产负债表",
								desc: "资产项和负债项都支持新增、删除和直接编辑。",
								children: /* @__PURE__ */ (0, x.jsx)(at, {
									data: /* @__PURE__ */ (0, x.jsxs)(x.Fragment, { children: [
										/* @__PURE__ */ (0, x.jsx)(_t, {
											addBalanceAsset: cr,
											balanceAssets: Ye,
											deleteBalanceAsset: lr,
											totalAssets: z.totalAssets,
											updateBalanceAsset: sr
										}),
										/* @__PURE__ */ (0, x.jsx)(vt, {
											addLiability: dr,
											deleteLiability: fr,
											liabilities: Ze,
											updateLiability: ur
										}),
										/* @__PURE__ */ (0, x.jsxs)("div", {
											className: "stat-strip",
											children: [
												/* @__PURE__ */ (0, x.jsx)(M, {
													label: "总资产",
													value: O(z.totalAssets)
												}),
												/* @__PURE__ */ (0, x.jsx)(M, {
													label: "总负债",
													value: O(z.totalDebt)
												}),
												/* @__PURE__ */ (0, x.jsx)(M, {
													label: "净资产",
													value: O(z.netWorth)
												}),
												/* @__PURE__ */ (0, x.jsx)(M, {
													label: "负债率",
													value: A(z.debtRatio)
												})
											]
										})
									] }),
									charts: /* @__PURE__ */ (0, x.jsxs)("div", {
										className: "chart-grid two",
										children: [
											/* @__PURE__ */ (0, x.jsx)(N, {
												title: "资产负债对比",
												summary: `净资产 ${O(z.netWorth)}`,
												children: /* @__PURE__ */ (0, x.jsx)(kt, {
													data: mi,
													valueFormatter: O
												})
											}),
											/* @__PURE__ */ (0, x.jsx)(N, {
												title: "负债结构",
												summary: z.totalDebt ? `负债 ${O(z.totalDebt)}` : "当前无负债",
												children: /* @__PURE__ */ (0, x.jsx)(Dt, {
													data: gi,
													centerLabel: "负债",
													centerValue: O(z.totalDebt)
												})
											}),
											/* @__PURE__ */ (0, x.jsx)(N, {
												title: "资产项结构",
												summary: `补录资产 ${O(z.manualAssetTotal)}`,
												children: /* @__PURE__ */ (0, x.jsx)(Dt, {
													data: hi,
													centerLabel: "资产项",
													centerValue: O(z.manualAssetTotal)
												})
											}),
											/* @__PURE__ */ (0, x.jsx)(N, {
												title: "净资产趋势",
												summary: "按 6 个月现金预测推演",
												children: /* @__PURE__ */ (0, x.jsx)(jt, {
													data: pi,
													valueFormatter: O
												})
											})
										]
									})
								})
							}),
							e === "emergency" && /* @__PURE__ */ (0, x.jsx)(ot, {
								title: "应急金",
								desc: "当前金额与目标管理的应急储备自动同步。",
								children: /* @__PURE__ */ (0, x.jsx)(at, {
									data: /* @__PURE__ */ (0, x.jsxs)(x.Fragment, { children: [/* @__PURE__ */ (0, x.jsx)(yt, {
										emergencyFund: z.currentEmergencyFund,
										emergencyMonthlyNeed: qe,
										emergencyMonths: Le,
										setEmergencyFund: Cr,
										setEmergencyMonthlyNeed: Je,
										setEmergencyMonths: j
									}), /* @__PURE__ */ (0, x.jsxs)("div", {
										className: "stat-strip",
										children: [
											/* @__PURE__ */ (0, x.jsx)(M, {
												label: "覆盖月数",
												value: `${z.emergencyCoverage.toFixed(1)} 个月`
											}),
											/* @__PURE__ */ (0, x.jsx)(M, {
												label: "目标金额",
												value: O(z.emergencyTarget)
											}),
											/* @__PURE__ */ (0, x.jsx)(M, {
												label: "缺口",
												value: O(Math.max(0, z.emergencyTarget - z.currentEmergencyFund))
											}),
											/* @__PURE__ */ (0, x.jsx)(M, {
												label: "当前进度",
												value: A(z.emergencyCoverage / Math.max(Le, 1))
											})
										]
									})] }),
									charts: /* @__PURE__ */ (0, x.jsxs)("div", {
										className: "chart-grid two",
										children: [/* @__PURE__ */ (0, x.jsx)(N, {
											title: "应急金覆盖",
											summary: `${z.emergencyCoverage.toFixed(1)} / ${Le} 个月`,
											children: /* @__PURE__ */ (0, x.jsx)(Nt, {
												data: [{
													label: "应急金目标",
													value: z.currentEmergencyFund,
													max: z.emergencyTarget,
													color: S[1],
													detail: `缺口 ${O(Math.max(0, z.emergencyTarget - z.currentEmergencyFund))}`
												}],
												valueFormatter: O
											})
										}), /* @__PURE__ */ (0, x.jsx)(N, {
											title: "必要支出压力",
											summary: `应急基准 ${O(z.emergencyMonthlyNeed)}`,
											children: /* @__PURE__ */ (0, x.jsx)(kt, {
												data: [
													{
														label: "应急月均支出",
														value: z.emergencyMonthlyNeed,
														color: S[1]
													},
													{
														label: "预算必要支出",
														value: z.requiredSpending,
														color: S[2]
													},
													{
														label: "预算总额",
														value: z.spendingPlan,
														color: S[4]
													}
												],
												valueFormatter: O
											})
										})]
									})
								})
							}),
							e === "reminders" && /* @__PURE__ */ (0, x.jsx)(ot, {
								title: "账单与提醒",
								desc: "网页内提醒，默认提前 7 天；金额可先手动维护。",
								children: /* @__PURE__ */ (0, x.jsx)(at, {
									data: /* @__PURE__ */ (0, x.jsx)(bt, {
										reminders: nt,
										addReminder: mr,
										deleteReminder: hr,
										updateReminder: pr
									}),
									charts: /* @__PURE__ */ (0, x.jsxs)("div", {
										className: "chart-grid two",
										children: [
											/* @__PURE__ */ (0, x.jsx)(N, {
												title: "提醒金额",
												summary: "避免漏扣",
												children: /* @__PURE__ */ (0, x.jsx)(kt, {
													data: zi,
													valueFormatter: O
												})
											}),
											/* @__PURE__ */ (0, x.jsx)(N, {
												title: "距离到期",
												summary: "以 2026-06-14 为当前日",
												children: /* @__PURE__ */ (0, x.jsx)(At, {
													data: Bi,
													valueFormatter: (e) => `${e.toFixed(0)}天`
												})
											}),
											/* @__PURE__ */ (0, x.jsx)(N, {
												title: "提醒日历",
												summary: "未来关键扣款",
												children: /* @__PURE__ */ (0, x.jsx)(Pt, { events: Hn })
											})
										]
									})
								})
							}),
							e === "goals" && /* @__PURE__ */ (0, x.jsx)(ot, {
								title: "目标管理",
								desc: "旅游、学习、父母储蓄、伴侣基金和大额支出目标都可以维护目标金额；预期准备用于规划，实际投入用于本月计算。",
								children: /* @__PURE__ */ (0, x.jsx)(at, {
									data: /* @__PURE__ */ (0, x.jsxs)(x.Fragment, { children: [/* @__PURE__ */ (0, x.jsx)(st, {
										records: o,
										selectedMonth: i,
										onChange: a
									}), /* @__PURE__ */ (0, x.jsx)(xt, {
										goals: F,
										addGoal: wr,
										deleteGoal: Tr,
										updateGoal: gr
									})] }),
									charts: /* @__PURE__ */ (0, x.jsxs)("div", {
										className: "chart-grid two",
										children: [
											/* @__PURE__ */ (0, x.jsx)(N, {
												title: "目标进度",
												summary: "当前 / 目标",
												children: /* @__PURE__ */ (0, x.jsx)(Nt, {
													data: _i,
													valueFormatter: O
												})
											}),
											/* @__PURE__ */ (0, x.jsx)(N, {
												title: "每月预期准备结构",
												summary: `预期 ${O(bi)}`,
												children: /* @__PURE__ */ (0, x.jsx)(Dt, {
													data: F.map((e, t) => ({
														label: e.name,
														value: e.monthly,
														color: S[t % S.length]
													})),
													centerLabel: "每月",
													centerValue: O(bi)
												})
											}),
											/* @__PURE__ */ (0, x.jsx)(N, {
												title: "月度实际目标投入",
												summary: `实际投入 ${O(xi)}`,
												children: /* @__PURE__ */ (0, x.jsx)(At, {
													data: Ci,
													valueFormatter: O
												})
											}),
											/* @__PURE__ */ (0, x.jsx)(N, {
												title: "支出与投入压力",
												summary: "实际支出 + 实际投入",
												children: /* @__PURE__ */ (0, x.jsx)(At, {
													data: wi,
													valueFormatter: O
												})
											}),
											/* @__PURE__ */ (0, x.jsx)(N, {
												title: "累计准备变化",
												summary: `当前 ${O(vi)}`,
												children: /* @__PURE__ */ (0, x.jsx)(jt, {
													data: Ti,
													valueFormatter: O
												})
											})
										]
									})
								})
							}),
							e === "fundBuckets" && /* @__PURE__ */ (0, x.jsx)(ot, {
								title: "大花费项目",
								desc: "把旅行、搬家、手机分期、应急金和投资待投金拆开，避免同一笔钱被重复占用。",
								children: /* @__PURE__ */ (0, x.jsx)(at, {
									data: /* @__PURE__ */ (0, x.jsxs)(x.Fragment, { children: [/* @__PURE__ */ (0, x.jsxs)("div", {
										className: "stat-strip",
										children: [
											/* @__PURE__ */ (0, x.jsx)(M, {
												label: "可动用现金",
												value: O(z.liquidAccountTotal)
											}),
											/* @__PURE__ */ (0, x.jsx)(M, {
												label: "投资待投金",
												value: O(z.investmentReserve)
											}),
											/* @__PURE__ */ (0, x.jsx)(M, {
												label: "项目缺口",
												value: O(Ai)
											}),
											/* @__PURE__ */ (0, x.jsx)(M, {
												label: "未分配现金",
												value: O(B)
											})
										]
									}), /* @__PURE__ */ (0, x.jsx)(St, {
										buckets: Ei,
										addFundBucket: Dr,
										deleteFundBucket: Or,
										investmentReserve: z.investmentReserve,
										liquidAfterBuckets: B,
										monthlyNeed: Mi,
										updateFundBucket: Er
									})] }),
									charts: /* @__PURE__ */ (0, x.jsxs)("div", {
										className: "chart-grid two",
										children: [
											/* @__PURE__ */ (0, x.jsx)(N, {
												title: "已锁定资金",
												summary: `含待投资金 ${O(z.investmentReserve)}`,
												children: /* @__PURE__ */ (0, x.jsx)(Dt, {
													data: Pi,
													centerLabel: "已准备",
													centerValue: O(Di + z.investmentReserve)
												})
											}),
											/* @__PURE__ */ (0, x.jsx)(N, {
												title: "大花费项目缺口",
												summary: `总缺口 ${O(Ai)}`,
												children: /* @__PURE__ */ (0, x.jsx)(kt, {
													data: Fi,
													valueFormatter: O
												})
											}),
											/* @__PURE__ */ (0, x.jsx)(N, {
												title: "每月补齐压力",
												summary: `每月需 ${O(Mi)}`,
												children: /* @__PURE__ */ (0, x.jsx)(At, {
													data: Ii,
													valueFormatter: O
												})
											}),
											/* @__PURE__ */ (0, x.jsx)(N, {
												title: "大花费项目结论",
												summary: B < 0 ? "存在重复占用" : "现金标签可执行",
												children: /* @__PURE__ */ (0, x.jsxs)("div", {
													className: "fund-bucket-note",
													children: [/* @__PURE__ */ (0, x.jsx)("strong", { children: B < 0 ? "先处理现金占用冲突" : "当前标签可落地" }), /* @__PURE__ */ (0, x.jsx)("span", { children: "待投资金会自动从账户用途识别，不需要手动重复录入。旅行、搬家、分期和应急金只记录额外需要锁定的现金。" })]
												})
											})
										]
									})
								})
							}),
							e === "reports" && /* @__PURE__ */ (0, x.jsx)(ot, {
								title: "财务报表",
								desc: "每月自动生成完整分析报告，覆盖净资产、现金流、投资、大花费项目、家庭责任和风险。",
								children: /* @__PURE__ */ (0, x.jsx)(at, {
									data: /* @__PURE__ */ (0, x.jsxs)(x.Fragment, { children: [
										/* @__PURE__ */ (0, x.jsxs)("div", {
											className: "stat-strip",
											children: [
												/* @__PURE__ */ (0, x.jsx)(M, {
													label: "收入",
													value: O(Mn)
												}),
												/* @__PURE__ */ (0, x.jsx)(M, {
													label: "支出",
													value: O(z.spendingActual)
												}),
												/* @__PURE__ */ (0, x.jsx)(M, {
													label: "结余",
													value: O(z.monthlySurplus)
												}),
												/* @__PURE__ */ (0, x.jsx)(M, {
													label: "项目后现金",
													value: O(B)
												})
											]
										}),
										/* @__PURE__ */ (0, x.jsx)(Ct, {
											copyStatus: sn,
											reportText: Ri,
											sections: Li,
											onCopy: ra
										}),
										/* @__PURE__ */ (0, x.jsx)(wt, {
											allocation: z.assetOutflow,
											income: Mn,
											rows: Vi,
											spending: z.spendingActual,
											surplus: z.monthlySurplus
										})
									] }),
									charts: /* @__PURE__ */ (0, x.jsxs)("div", {
										className: "chart-grid two",
										children: [
											/* @__PURE__ */ (0, x.jsx)(N, {
												title: "本月资金流向",
												summary: `储蓄率 ${A(z.savingsRate)}`,
												children: /* @__PURE__ */ (0, x.jsx)(At, {
													data: Hi,
													valueFormatter: O
												})
											}),
											/* @__PURE__ */ (0, x.jsx)(N, {
												title: "月度收支对比",
												summary: "收入和支出分月查看",
												children: /* @__PURE__ */ (0, x.jsx)(At, {
													data: [...Kr, ...qr],
													valueFormatter: O
												})
											}),
											/* @__PURE__ */ (0, x.jsx)(N, {
												title: "现金流未来趋势",
												summary: `6个月末 ${O(Vn[Vn.length - 1]?.balance ?? 0)}`,
												children: /* @__PURE__ */ (0, x.jsx)(jt, {
													data: ui,
													valueFormatter: O
												})
											}),
											/* @__PURE__ */ (0, x.jsx)(N, {
												title: "资金瀑布复盘",
												summary: "收入、支出、分配",
												children: /* @__PURE__ */ (0, x.jsx)(Ft, { data: fi })
											}),
											/* @__PURE__ */ (0, x.jsx)(N, {
												title: "风险矩阵",
												summary: "下月关注点",
												children: /* @__PURE__ */ (0, x.jsx)(It, { data: Ki })
											})
										]
									})
								})
							}),
							e === "monthlyArchive" && /* @__PURE__ */ (0, x.jsx)(ot, {
								title: "月度存档",
								desc: "每月底保存一次月报，用来追踪收入、支出、账户余额和净资产的环比变化。",
								children: /* @__PURE__ */ (0, x.jsx)(at, {
									data: /* @__PURE__ */ (0, x.jsxs)(x.Fragment, { children: [
										/* @__PURE__ */ (0, x.jsx)(st, {
											records: o,
											selectedMonth: i,
											onAddMonth: Jn,
											onChange: a,
											onDeleteSelectedMonth: () => Yn(i)
										}),
										/* @__PURE__ */ (0, x.jsxs)("div", {
											className: "stat-strip",
											children: [
												/* @__PURE__ */ (0, x.jsx)(M, {
													label: "收入变化",
													value: zn ? We($i) : "待对比"
												}),
												/* @__PURE__ */ (0, x.jsx)(M, {
													label: "支出变化",
													value: zn ? We(ea) : "待对比"
												}),
												/* @__PURE__ */ (0, x.jsx)(M, {
													label: "账户变化",
													value: zn ? We(ta) : "待对比"
												}),
												/* @__PURE__ */ (0, x.jsx)(M, {
													label: "净资产变化",
													value: zn ? We(na) : "待对比"
												})
											]
										}),
										/* @__PURE__ */ (0, x.jsx)(ft, {
											archives: qt,
											currentArchive: In,
											deleteMonthlyArchive: Fn,
											saveMonthlyArchive: Pn,
											selectedMonth: i,
											onSelectMonth: a
										}),
										/* @__PURE__ */ (0, x.jsx)(pt, {
											currentArchive: Rn,
											previousArchive: zn
										})
									] }),
									charts: /* @__PURE__ */ (0, x.jsxs)("div", {
										className: "chart-grid two",
										children: [
											/* @__PURE__ */ (0, x.jsx)(N, {
												title: "存档收入趋势",
												summary: `${Bn.length} 个月 / 当前 ${O(Mn)}`,
												children: /* @__PURE__ */ (0, x.jsx)(At, {
													data: Ji,
													valueFormatter: O
												})
											}),
											/* @__PURE__ */ (0, x.jsx)(N, {
												title: "存档支出趋势",
												summary: `当前支出 ${O(z.spendingActual)}`,
												children: /* @__PURE__ */ (0, x.jsx)(At, {
													data: Yi,
													valueFormatter: O
												})
											}),
											/* @__PURE__ */ (0, x.jsx)(N, {
												title: "账户余额变化",
												summary: `当前账户 ${O(z.accountTotal)}`,
												children: /* @__PURE__ */ (0, x.jsx)(jt, {
													data: Zi,
													valueFormatter: O
												})
											}),
											/* @__PURE__ */ (0, x.jsx)(N, {
												title: "净资产变化",
												summary: `当前净资产 ${O(z.netWorth)}`,
												children: /* @__PURE__ */ (0, x.jsx)(jt, {
													data: Xi,
													valueFormatter: O
												})
											}),
											/* @__PURE__ */ (0, x.jsx)(N, {
												title: "当月余额变化",
												summary: "收入 - 支出 - 分配",
												children: /* @__PURE__ */ (0, x.jsx)(jt, {
													data: Qi,
													valueFormatter: O
												})
											})
										]
									})
								})
							}),
							e === "cloudSync" && /* @__PURE__ */ (0, x.jsx)(ot, {
								title: "云同步",
								desc: "本机自动保存只在当前浏览器生效；这里用于跨电脑加密同步。",
								children: /* @__PURE__ */ (0, x.jsx)(at, {
									data: /* @__PURE__ */ (0, x.jsx)(dt, {
										cloudPassphrase: Xt,
										cloudStatus: Qt,
										cloudSyncing: en,
										clearCloudSyncSettings: Cn,
										downloadCloudSync: En,
										settings: R,
										setCloudPassphrase: Zt,
										updateCloudSyncSettings: Sn,
										uploadCloudSync: () => void Tn(!1)
									}),
									charts: /* @__PURE__ */ (0, x.jsxs)("div", {
										className: "chart-grid two",
										children: [/* @__PURE__ */ (0, x.jsx)(N, {
											title: "同步状态",
											summary: R.gistId ? "已配置 Gist" : "未创建云端存档",
											children: /* @__PURE__ */ (0, x.jsxs)("div", {
												className: "cloud-status-board",
												children: [
													/* @__PURE__ */ (0, x.jsxs)("div", { children: [/* @__PURE__ */ (0, x.jsx)("span", { children: "云端 Gist" }), /* @__PURE__ */ (0, x.jsx)("strong", { children: R.gistId || "未创建" })] }),
													/* @__PURE__ */ (0, x.jsxs)("div", { children: [/* @__PURE__ */ (0, x.jsx)("span", { children: "自动同步" }), /* @__PURE__ */ (0, x.jsx)("strong", { children: R.autoSync ? "开启" : "关闭" })] }),
													/* @__PURE__ */ (0, x.jsxs)("div", { children: [/* @__PURE__ */ (0, x.jsx)("span", { children: "上次上传" }), /* @__PURE__ */ (0, x.jsx)("strong", { children: R.lastPushedAt ? Ue(R.lastPushedAt) : "暂无" })] }),
													/* @__PURE__ */ (0, x.jsxs)("div", { children: [/* @__PURE__ */ (0, x.jsx)("span", { children: "上次拉取" }), /* @__PURE__ */ (0, x.jsx)("strong", { children: R.lastPulledAt ? Ue(R.lastPulledAt) : "暂无" })] })
												]
											})
										}), /* @__PURE__ */ (0, x.jsx)(N, {
											title: "本机数据包",
											summary: `${o.length} 个月 / ${qt.length} 条月报`,
											children: /* @__PURE__ */ (0, x.jsx)(kt, {
												data: [
													{
														label: "收入月份",
														value: o.length,
														color: S[0]
													},
													{
														label: "月度存档",
														value: qt.length,
														color: S[1]
													},
													{
														label: "完整版本",
														value: Gt.length,
														color: S[3]
													},
													{
														label: "账户数量",
														value: c.length,
														color: S[2]
													}
												],
												valueFormatter: (e) => `${e.toFixed(0)} 条`
											})
										})]
									})
								})
							}),
							e === "health" && /* @__PURE__ */ (0, x.jsx)(ot, {
								title: "财务健康评分",
								desc: "100 分制，用现金流、应急金、负债、增长和趋势综合判断。",
								children: /* @__PURE__ */ (0, x.jsx)(at, {
									data: /* @__PURE__ */ (0, x.jsxs)(x.Fragment, { children: [
										/* @__PURE__ */ (0, x.jsxs)("div", {
											className: "health-score",
											style: { "--score": `${z.score}%` },
											children: [/* @__PURE__ */ (0, x.jsx)("strong", { children: z.score }), /* @__PURE__ */ (0, x.jsx)("span", { children: "财务健康分" })]
										}),
										/* @__PURE__ */ (0, x.jsx)(Tt, {
											emergencyMonthlyNeed: qe,
											emergencyMonths: Le,
											addLiability: dr,
											deleteLiability: fr,
											liabilities: Ze,
											setEmergencyMonthlyNeed: Je,
											setEmergencyMonths: j,
											updateLiability: ur
										}),
										/* @__PURE__ */ (0, x.jsxs)("div", {
											className: "stat-strip",
											children: [
												/* @__PURE__ */ (0, x.jsx)(M, {
													label: "固定支出率",
													value: A(z.fixedRatio)
												}),
												/* @__PURE__ */ (0, x.jsx)(M, {
													label: "应急覆盖",
													value: `${z.emergencyCoverage.toFixed(1)}个月`
												}),
												/* @__PURE__ */ (0, x.jsx)(M, {
													label: "负债率",
													value: A(z.debtRatio)
												}),
												/* @__PURE__ */ (0, x.jsx)(M, {
													label: "投资盈亏",
													value: O(z.investmentPnL)
												})
											]
										})
									] }),
									charts: /* @__PURE__ */ (0, x.jsxs)("div", {
										className: "chart-grid two",
										children: [
											/* @__PURE__ */ (0, x.jsx)(N, {
												title: "健康维度拆解",
												summary: "五项分数",
												children: /* @__PURE__ */ (0, x.jsx)(kt, {
													data: Gi,
													valueFormatter: (e) => `${e.toFixed(0)}分`,
													percentMode: !0
												})
											}),
											/* @__PURE__ */ (0, x.jsx)(N, {
												title: "资产抗风险结构",
												summary: "账户 / 应急 / 负债",
												children: /* @__PURE__ */ (0, x.jsx)(Dt, {
													data: si,
													centerLabel: "覆盖",
													centerValue: `${z.emergencyCoverage.toFixed(1)}月`
												})
											}),
											/* @__PURE__ */ (0, x.jsx)(N, {
												title: "风险矩阵",
												summary: "影响 × 紧迫",
												children: /* @__PURE__ */ (0, x.jsx)(It, { data: Ki })
											})
										]
									})
								})
							}),
							e === "future" && /* @__PURE__ */ (0, x.jsx)(ot, {
								title: "数据能力",
								desc: "债务、保险、数据质量、规则引擎先放结构，等后续数据补齐再激活。",
								children: /* @__PURE__ */ (0, x.jsx)(at, {
									data: /* @__PURE__ */ (0, x.jsx)(Et, {
										capabilities: L,
										updateCapability: kr
									}),
									charts: /* @__PURE__ */ (0, x.jsxs)("div", {
										className: "chart-grid two",
										children: [/* @__PURE__ */ (0, x.jsx)(N, {
											title: "能力成熟度",
											summary: "未来模块占位评分",
											children: /* @__PURE__ */ (0, x.jsx)(kt, {
												data: qi,
												valueFormatter: (e) => `${e.toFixed(0)}分`,
												percentMode: !0
											})
										}), /* @__PURE__ */ (0, x.jsx)(N, {
											title: "规则覆盖路线",
											summary: "自动分类 / 校验 / 提醒",
											children: /* @__PURE__ */ (0, x.jsx)(Mt, {
												data: qi,
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
function rt(e, t, n, r) {
	return t === "USD" ? e * n : t === "HKD" ? e * r : e;
}
function it(e) {
	return e < .35 ? "低于 35%，健康" : e <= .5 ? "35%-50%，注意" : "高于 50%，风险";
}
function at({ data: e, charts: t }) {
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
function ot({ title: e, desc: t, children: n }) {
	return /* @__PURE__ */ (0, x.jsxs)(x.Fragment, { children: [/* @__PURE__ */ (0, x.jsx)("div", {
		className: "section-title",
		children: /* @__PURE__ */ (0, x.jsxs)("div", { children: [/* @__PURE__ */ (0, x.jsx)("h2", { children: e }), /* @__PURE__ */ (0, x.jsx)("p", { children: t })] })
	}), /* @__PURE__ */ (0, x.jsx)("div", {
		className: "module-body",
		children: n
	})] });
}
function M({ label: e, value: t }) {
	return /* @__PURE__ */ (0, x.jsxs)("article", {
		className: "stat-card",
		children: [/* @__PURE__ */ (0, x.jsx)("span", { children: e }), /* @__PURE__ */ (0, x.jsx)("strong", { children: t })]
	});
}
function st({ records: e, selectedMonth: t, onAddMonth: n, onChange: r, onDeleteSelectedMonth: i }) {
	return /* @__PURE__ */ (0, x.jsxs)("div", {
		className: "month-selector-shell",
		children: [/* @__PURE__ */ (0, x.jsx)("div", {
			className: "month-selector",
			"aria-label": "月份切换",
			children: e.map((e) => /* @__PURE__ */ (0, x.jsxs)("button", {
				className: e.id === t ? "active" : "",
				type: "button",
				onClick: () => r(e.id),
				children: [/* @__PURE__ */ (0, x.jsx)("strong", { children: be(e.label) }), /* @__PURE__ */ (0, x.jsx)("span", { children: e.id === t ? "当前" : "切换" })]
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
function N({ title: e, summary: t, children: n, className: r = "" }) {
	return /* @__PURE__ */ (0, x.jsxs)("article", {
		className: `chart-panel ${r}`.trim(),
		children: [/* @__PURE__ */ (0, x.jsxs)("div", {
			className: "chart-head",
			children: [/* @__PURE__ */ (0, x.jsx)("strong", { children: e }), /* @__PURE__ */ (0, x.jsx)("span", { children: t })]
		}), n]
	});
}
function P({ value: e, onChange: t, min: n = 0, max: r, step: i = 100, ariaLabel: a }) {
	return /* @__PURE__ */ (0, x.jsx)("input", {
		"aria-label": a,
		className: "table-input",
		inputMode: "decimal",
		max: r,
		min: n,
		step: i,
		type: "number",
		value: Number.isFinite(e) ? e : 0,
		onChange: (e) => t(ve(e.target.value))
	});
}
function F({ value: e, onChange: t, ariaLabel: n, placeholder: r }) {
	return /* @__PURE__ */ (0, x.jsx)("input", {
		"aria-label": n,
		className: "table-input text",
		placeholder: r,
		type: "text",
		value: e,
		onChange: (e) => t(e.target.value)
	});
}
function ct({ value: e, onChange: t, ariaLabel: n }) {
	return /* @__PURE__ */ (0, x.jsx)("input", {
		"aria-label": n,
		className: "table-input",
		type: "date",
		value: e,
		onChange: (e) => t(e.target.value)
	});
}
function I({ value: e, options: t, onChange: n, ariaLabel: r }) {
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
function lt({ checked: e, onChange: t, ariaLabel: n }) {
	return /* @__PURE__ */ (0, x.jsx)("input", {
		"aria-label": n,
		checked: e,
		className: "table-check",
		type: "checkbox",
		onChange: (e) => t(e.target.checked)
	});
}
function L({ title: e, meta: t, action: n }) {
	return /* @__PURE__ */ (0, x.jsxs)("div", {
		className: "table-toolbar",
		children: [/* @__PURE__ */ (0, x.jsxs)("div", { children: [/* @__PURE__ */ (0, x.jsx)("strong", { children: e }), /* @__PURE__ */ (0, x.jsx)("span", { children: t })] }), n]
	});
}
function ut({ records: e, selectedMonth: t, onSelect: n, addMonthRecord: r, deleteMonthRecord: i, updateMonthRecord: a }) {
	let o = e.find((e) => e.id === t) ?? e[0];
	return /* @__PURE__ */ (0, x.jsxs)(x.Fragment, { children: [/* @__PURE__ */ (0, x.jsx)(L, {
		title: "月度收入底表",
		meta: `${e.length} 个月 / 当前 ${o.label} / 实际收入 ${O(Ce(o))}`,
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
					/* @__PURE__ */ (0, x.jsx)("td", { children: /* @__PURE__ */ (0, x.jsx)(P, {
						ariaLabel: `${r.label} 工资`,
						value: r.salary,
						onChange: (e) => a(r.id, { salary: e })
					}) }),
					/* @__PURE__ */ (0, x.jsx)("td", { children: /* @__PURE__ */ (0, x.jsx)(P, {
						ariaLabel: `${r.label} 到账日`,
						max: 31,
						min: 1,
						step: 1,
						value: r.payday,
						onChange: (e) => a(r.id, { payday: e })
					}) }),
					/* @__PURE__ */ (0, x.jsx)("td", { children: /* @__PURE__ */ (0, x.jsx)(P, {
						ariaLabel: `${r.label} 炒股月结`,
						value: r.stockIncome,
						onChange: (e) => a(r.id, { stockIncome: e })
					}) }),
					/* @__PURE__ */ (0, x.jsx)("td", { children: /* @__PURE__ */ (0, x.jsx)(P, {
						ariaLabel: `${r.label} 其他收入`,
						value: r.otherIncome,
						onChange: (e) => a(r.id, { otherIncome: e })
					}) }),
					/* @__PURE__ */ (0, x.jsx)("td", {
						className: "calculated-cell",
						children: O(Ce(r))
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
function dt({ settings: e, cloudPassphrase: t, cloudStatus: n, cloudSyncing: r, updateCloudSyncSettings: i, setCloudPassphrase: a, uploadCloudSync: o, downloadCloudSync: s, clearCloudSyncSettings: c }) {
	return /* @__PURE__ */ (0, x.jsxs)(x.Fragment, { children: [/* @__PURE__ */ (0, x.jsx)(L, {
		title: "云同步连接",
		meta: e.gistId ? `Gist ${e.gistId}` : "首次上传会自动创建私密 Gist",
		action: /* @__PURE__ */ (0, x.jsx)("span", {
			className: e.autoSync ? "pill good" : "pill",
			children: e.autoSync ? "自动云同步" : "手动同步"
		})
	}), /* @__PURE__ */ (0, x.jsxs)("div", {
		className: "cloud-sync-card",
		children: [
			/* @__PURE__ */ (0, x.jsxs)("div", {
				className: "form-grid cloud-sync-form",
				children: [
					/* @__PURE__ */ (0, x.jsxs)("label", {
						className: "field",
						children: [/* @__PURE__ */ (0, x.jsx)("span", { children: "Gist ID" }), /* @__PURE__ */ (0, x.jsx)("input", {
							autoComplete: "off",
							placeholder: "首次上传可留空",
							value: e.gistId,
							onChange: (e) => i({ gistId: e.target.value.trim() })
						})]
					}),
					/* @__PURE__ */ (0, x.jsxs)("label", {
						className: "field",
						children: [/* @__PURE__ */ (0, x.jsx)("span", { children: "GitHub Token" }), /* @__PURE__ */ (0, x.jsx)("input", {
							autoComplete: "off",
							placeholder: "需要 gist 权限",
							type: "password",
							value: e.token,
							onChange: (e) => i({ token: e.target.value.trim() })
						})]
					}),
					/* @__PURE__ */ (0, x.jsxs)("label", {
						className: "field",
						children: [/* @__PURE__ */ (0, x.jsx)("span", { children: "同步密码" }), /* @__PURE__ */ (0, x.jsx)("input", {
							autoComplete: "new-password",
							placeholder: "本机不保存",
							type: "password",
							value: t,
							onChange: (e) => a(e.target.value)
						})]
					}),
					/* @__PURE__ */ (0, x.jsxs)("label", {
						className: "field cloud-switch-field",
						children: [/* @__PURE__ */ (0, x.jsx)("span", { children: "自动云同步" }), /* @__PURE__ */ (0, x.jsxs)("span", {
							className: "cloud-switch-row",
							children: [/* @__PURE__ */ (0, x.jsx)("input", {
								checked: e.autoSync,
								type: "checkbox",
								onChange: (e) => i({ autoSync: e.target.checked })
							}), /* @__PURE__ */ (0, x.jsx)("em", { children: e.autoSync ? "已开启" : "已关闭" })]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, x.jsxs)("div", {
				className: "cloud-sync-actions",
				children: [
					/* @__PURE__ */ (0, x.jsx)("button", {
						className: "primary-button",
						disabled: r,
						type: "button",
						onClick: o,
						children: "上传云端"
					}),
					/* @__PURE__ */ (0, x.jsx)("button", {
						className: "secondary-button",
						disabled: r,
						type: "button",
						onClick: s,
						children: "从云端拉取"
					}),
					/* @__PURE__ */ (0, x.jsx)("button", {
						className: "danger-button",
						disabled: r && !e.gistId,
						type: "button",
						onClick: c,
						children: "断开本机配置"
					})
				]
			}),
			/* @__PURE__ */ (0, x.jsxs)("div", {
				className: "cloud-sync-status",
				children: [/* @__PURE__ */ (0, x.jsx)("strong", { children: r ? "同步中…" : n }), /* @__PURE__ */ (0, x.jsx)("span", { children: "云端内容使用同步密码加密；GitHub Token 只保存在当前浏览器。" })]
			})
		]
	})] });
}
function ft({ archives: e, currentArchive: t, selectedMonth: n, saveMonthlyArchive: r, deleteMonthlyArchive: i, onSelectMonth: a }) {
	let o = [...e].sort((e, t) => t.monthId.localeCompare(e.monthId) || t.savedAt.localeCompare(e.savedAt)), s = e.find((e) => e.monthId === n), c = Ke(e, n), l = c ? t.income - c.income : 0, u = c ? t.spending - c.spending : 0, d = c ? t.accountTotal - c.accountTotal : 0, f = c ? t.netWorth - c.netWorth : 0;
	return /* @__PURE__ */ (0, x.jsxs)(x.Fragment, { children: [
		/* @__PURE__ */ (0, x.jsx)(L, {
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
						/* @__PURE__ */ (0, x.jsx)("strong", { children: O(t.income) }),
						/* @__PURE__ */ (0, x.jsx)("em", {
							className: c ? j(l) : "",
							children: c ? We(l) : "等待上月月报"
						})
					]
				}),
				/* @__PURE__ */ (0, x.jsxs)("div", {
					className: "archive-current-metric",
					children: [
						/* @__PURE__ */ (0, x.jsx)("span", { children: "当前支出" }),
						/* @__PURE__ */ (0, x.jsx)("strong", { children: O(t.spending) }),
						/* @__PURE__ */ (0, x.jsx)("em", { children: c ? We(u) : "等待上月月报" })
					]
				}),
				/* @__PURE__ */ (0, x.jsxs)("div", {
					className: "archive-current-metric",
					children: [
						/* @__PURE__ */ (0, x.jsx)("span", { children: "账户余额" }),
						/* @__PURE__ */ (0, x.jsx)("strong", { children: O(t.accountTotal) }),
						/* @__PURE__ */ (0, x.jsx)("em", {
							className: c ? j(d) : "",
							children: c ? We(d) : "等待上月月报"
						})
					]
				}),
				/* @__PURE__ */ (0, x.jsxs)("div", {
					className: "archive-current-metric",
					children: [
						/* @__PURE__ */ (0, x.jsx)("span", { children: "净资产" }),
						/* @__PURE__ */ (0, x.jsx)("strong", { children: O(t.netWorth) }),
						/* @__PURE__ */ (0, x.jsx)("em", {
							className: c ? j(f) : "",
							children: c ? We(f) : "等待上月月报"
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
					let r = Ke(e, t.monthId), o = r ? t.income - r.income : 0, s = r ? t.spending - r.spending : 0, c = r ? t.accountTotal - r.accountTotal : 0, l = r ? t.netWorth - r.netWorth : 0;
					return /* @__PURE__ */ (0, x.jsxs)("tr", {
						className: t.monthId === n ? "selected-row" : "",
						children: [
							/* @__PURE__ */ (0, x.jsx)("td", { children: /* @__PURE__ */ (0, x.jsx)("button", {
								className: "row-select-button",
								type: "button",
								onClick: () => a(t.monthId),
								children: t.label
							}) }),
							/* @__PURE__ */ (0, x.jsx)("td", { children: Ue(t.savedAt) }),
							/* @__PURE__ */ (0, x.jsx)("td", {
								className: "calculated-cell",
								children: O(t.income)
							}),
							/* @__PURE__ */ (0, x.jsx)("td", {
								className: "calculated-cell",
								children: O(t.spending)
							}),
							/* @__PURE__ */ (0, x.jsx)("td", {
								className: "calculated-cell",
								children: O(t.allocation)
							}),
							/* @__PURE__ */ (0, x.jsx)("td", {
								className: j(t.surplus),
								children: O(t.surplus)
							}),
							/* @__PURE__ */ (0, x.jsx)("td", {
								className: "calculated-cell",
								children: O(t.accountTotal)
							}),
							/* @__PURE__ */ (0, x.jsx)("td", {
								className: "calculated-cell",
								children: O(t.netWorth)
							}),
							/* @__PURE__ */ (0, x.jsx)("td", { children: r ? /* @__PURE__ */ (0, x.jsxs)("div", {
								className: "archive-change-stack",
								children: [
									/* @__PURE__ */ (0, x.jsxs)("span", {
										className: j(o),
										children: ["收入 ", We(o)]
									}),
									/* @__PURE__ */ (0, x.jsxs)("span", { children: ["支出 ", We(s)] }),
									/* @__PURE__ */ (0, x.jsxs)("span", {
										className: j(c),
										children: ["账户 ", We(c)]
									}),
									/* @__PURE__ */ (0, x.jsxs)("span", {
										className: j(l),
										children: ["净资产 ", We(l)]
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
function pt({ currentArchive: e, previousArchive: t }) {
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
	return /* @__PURE__ */ (0, x.jsxs)(x.Fragment, { children: [/* @__PURE__ */ (0, x.jsx)(L, {
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
					children: O(e.previousBalance)
				}),
				/* @__PURE__ */ (0, x.jsx)("td", {
					className: "calculated-cell",
					children: O(e.currentBalance)
				}),
				/* @__PURE__ */ (0, x.jsx)("td", {
					className: j(e.delta),
					children: We(e.delta)
				}),
				/* @__PURE__ */ (0, x.jsx)("td", { children: /* @__PURE__ */ (0, x.jsx)("span", {
					className: e.status === "持平" ? "pill" : "pill good",
					children: e.status
				}) })
			] }, e.id))] })]
		})
	})] });
}
function mt({ accountTotal: e, addCashflowCustomItem: t, monthlyInflow: n, monthlyOutflow: r, rows: i }) {
	return /* @__PURE__ */ (0, x.jsxs)(x.Fragment, { children: [/* @__PURE__ */ (0, x.jsx)(L, {
		title: "现金流参数底表",
		meta: `月流入 ${O(n)} / 月流出 ${O(r)} / 期初现金 ${O(e)}`,
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
				/* @__PURE__ */ (0, x.jsx)("td", { children: e.onNameChange ? /* @__PURE__ */ (0, x.jsx)(F, {
					ariaLabel: `${e.name} 项目`,
					value: e.name,
					onChange: e.onNameChange
				}) : e.name }),
				/* @__PURE__ */ (0, x.jsx)("td", { children: e.readonlyAmount || !e.onAmountChange ? /* @__PURE__ */ (0, x.jsx)("span", {
					className: "calculated-cell",
					children: O(e.amount)
				}) : /* @__PURE__ */ (0, x.jsx)(P, {
					ariaLabel: `${e.name} 数值`,
					value: e.amount,
					onChange: e.onAmountChange
				}) }),
				/* @__PURE__ */ (0, x.jsx)("td", { children: e.onDirectionChange ? /* @__PURE__ */ (0, x.jsx)(I, {
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
function ht({ accounts: e, total: t, liquidAccountTotal: n, updateAccount: r, addAccount: i, deleteAccount: a, reorderAccount: o }) {
	let [s, c] = (0, b.useState)(null);
	return /* @__PURE__ */ (0, x.jsxs)(x.Fragment, { children: [/* @__PURE__ */ (0, x.jsx)(L, {
		title: "账户底表",
		meta: `${e.length} 个账户 / 合计 ${O(t)} / 可动用 ${O(n)}`,
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
					/* @__PURE__ */ (0, x.jsx)("td", { children: /* @__PURE__ */ (0, x.jsx)(F, {
						ariaLabel: `${t.name} 账户名称`,
						value: t.name,
						onChange: (e) => r(t.id, { name: e })
					}) }),
					/* @__PURE__ */ (0, x.jsx)("td", { children: /* @__PURE__ */ (0, x.jsx)(F, {
						ariaLabel: `${t.name} 类型`,
						value: t.type,
						onChange: (e) => r(t.id, { type: e })
					}) }),
					/* @__PURE__ */ (0, x.jsx)("td", { children: /* @__PURE__ */ (0, x.jsx)(P, {
						ariaLabel: `${t.name} 余额`,
						value: t.balance,
						onChange: (e) => r(t.id, { balance: e })
					}) }),
					/* @__PURE__ */ (0, x.jsx)("td", { children: /* @__PURE__ */ (0, x.jsx)(F, {
						ariaLabel: `${t.name} 用途`,
						value: t.purpose,
						onChange: (e) => r(t.id, { purpose: e })
					}) }),
					/* @__PURE__ */ (0, x.jsx)("td", { children: /* @__PURE__ */ (0, x.jsx)(lt, {
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
function gt({ holdings: e, fxUsd: t, fxHkd: n, updateHolding: r, addHolding: i, deleteHolding: a }) {
	let o = e.reduce((e, r) => e + rt(r.value, r.currency, t, n), 0);
	return /* @__PURE__ */ (0, x.jsxs)(x.Fragment, { children: [/* @__PURE__ */ (0, x.jsx)(L, {
		title: "投资持仓底表",
		meta: `持仓 ${e.length} 项 / 市值 ${O(o)}`,
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
				let o = rt(i.value, i.currency, t, n), s = rt(i.cost, i.currency, t, n);
				return /* @__PURE__ */ (0, x.jsxs)("tr", { children: [
					/* @__PURE__ */ (0, x.jsx)("td", { children: /* @__PURE__ */ (0, x.jsx)(F, {
						ariaLabel: `${i.name} 名称`,
						value: i.name,
						onChange: (e) => r(i.id, { name: e })
					}) }),
					/* @__PURE__ */ (0, x.jsx)("td", { children: /* @__PURE__ */ (0, x.jsx)(I, {
						ariaLabel: `${i.name} 市场`,
						options: [
							"A股",
							"美股",
							"港股"
						],
						value: i.market,
						onChange: (e) => r(i.id, { market: e })
					}) }),
					/* @__PURE__ */ (0, x.jsx)("td", { children: /* @__PURE__ */ (0, x.jsx)(I, {
						ariaLabel: `${i.name} 币种`,
						options: [
							"CNY",
							"USD",
							"HKD"
						],
						value: i.currency,
						onChange: (e) => r(i.id, { currency: e })
					}) }),
					/* @__PURE__ */ (0, x.jsx)("td", { children: /* @__PURE__ */ (0, x.jsx)(P, {
						ariaLabel: `${i.name} 成本`,
						value: i.cost,
						onChange: (e) => r(i.id, { cost: e })
					}) }),
					/* @__PURE__ */ (0, x.jsx)("td", { children: /* @__PURE__ */ (0, x.jsx)(P, {
						ariaLabel: `${i.name} 当前市值`,
						value: i.value,
						onChange: (e) => r(i.id, { value: e })
					}) }),
					/* @__PURE__ */ (0, x.jsx)("td", {
						className: "calculated-cell",
						children: O(o)
					}),
					/* @__PURE__ */ (0, x.jsx)("td", {
						className: o >= s ? "positive" : "negative",
						children: O(o - s)
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
function _t({ balanceAssets: e, totalAssets: t, updateBalanceAsset: n, addBalanceAsset: r, deleteBalanceAsset: i }) {
	let a = e.reduce((e, t) => e + t.amount, 0);
	return /* @__PURE__ */ (0, x.jsxs)(x.Fragment, { children: [/* @__PURE__ */ (0, x.jsx)(L, {
		title: "资产底表",
		meta: `${e.length} 项 / 补录资产 ${O(a)} / 总资产 ${O(t)}`,
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
				/* @__PURE__ */ (0, x.jsx)("td", { children: /* @__PURE__ */ (0, x.jsx)(F, {
					ariaLabel: `${r.name} 资产项`,
					value: r.name,
					onChange: (e) => n(r.id, { name: e })
				}) }),
				/* @__PURE__ */ (0, x.jsx)("td", { children: /* @__PURE__ */ (0, x.jsx)(P, {
					ariaLabel: `${r.name} 资产金额`,
					value: r.amount,
					onChange: (e) => n(r.id, { amount: e })
				}) }),
				/* @__PURE__ */ (0, x.jsx)("td", { children: /* @__PURE__ */ (0, x.jsx)(F, {
					ariaLabel: `${r.name} 资产说明`,
					value: r.note,
					onChange: (e) => n(r.id, { note: e })
				}) }),
				/* @__PURE__ */ (0, x.jsx)("td", {
					className: "calculated-cell",
					children: A(t ? r.amount / t : 0)
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
function vt({ liabilities: e, updateLiability: t, addLiability: n, deleteLiability: r }) {
	let i = e.reduce((e, t) => e + t.amount, 0);
	return /* @__PURE__ */ (0, x.jsxs)(x.Fragment, { children: [/* @__PURE__ */ (0, x.jsx)(L, {
		title: "负债底表",
		meta: `${e.length} 项 / 总负债 ${O(i)}`,
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
				/* @__PURE__ */ (0, x.jsx)("td", { children: /* @__PURE__ */ (0, x.jsx)(F, {
					ariaLabel: `${n.name} 负债项`,
					value: n.name,
					onChange: (e) => t(n.id, { name: e })
				}) }),
				/* @__PURE__ */ (0, x.jsx)("td", { children: /* @__PURE__ */ (0, x.jsx)(P, {
					ariaLabel: `${n.name} 金额`,
					value: n.amount,
					onChange: (e) => t(n.id, { amount: e })
				}) }),
				/* @__PURE__ */ (0, x.jsx)("td", {
					className: "calculated-cell",
					children: A(i ? n.amount / i : 0)
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
function yt({ emergencyFund: e, setEmergencyFund: t, emergencyMonths: n, setEmergencyMonths: r, emergencyMonthlyNeed: i, setEmergencyMonthlyNeed: a }) {
	let o = i * n;
	return /* @__PURE__ */ (0, x.jsxs)(x.Fragment, { children: [/* @__PURE__ */ (0, x.jsx)(L, {
		title: "应急金底表",
		meta: `目标 ${O(o)} / 当前 ${O(e)}`
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
					/* @__PURE__ */ (0, x.jsx)("td", { children: /* @__PURE__ */ (0, x.jsx)(P, {
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
					/* @__PURE__ */ (0, x.jsx)("td", { children: /* @__PURE__ */ (0, x.jsx)(P, {
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
					/* @__PURE__ */ (0, x.jsx)("td", { children: /* @__PURE__ */ (0, x.jsx)(P, {
						ariaLabel: "月均必要支出",
						value: i,
						onChange: a
					}) }),
					/* @__PURE__ */ (0, x.jsxs)("td", {
						className: "calculated-cell",
						children: ["缺口 ", O(Math.max(0, o - e))]
					})
				] })
			] })]
		})
	})] });
}
function bt({ reminders: e, updateReminder: t, addReminder: n, deleteReminder: r }) {
	let i = e.reduce((e, t) => e + t.amount, 0);
	return /* @__PURE__ */ (0, x.jsxs)(x.Fragment, { children: [/* @__PURE__ */ (0, x.jsx)(L, {
		title: "提醒底表",
		meta: `${e.length} 条 / 金额 ${O(i)}`,
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
				/* @__PURE__ */ (0, x.jsx)("td", { children: /* @__PURE__ */ (0, x.jsx)(F, {
					ariaLabel: `${n.name} 事项`,
					value: n.name,
					onChange: (e) => t(n.id, { name: e })
				}) }),
				/* @__PURE__ */ (0, x.jsx)("td", { children: /* @__PURE__ */ (0, x.jsx)(ct, {
					ariaLabel: `${n.name} 日期`,
					value: n.date,
					onChange: (e) => t(n.id, { date: e })
				}) }),
				/* @__PURE__ */ (0, x.jsx)("td", { children: /* @__PURE__ */ (0, x.jsx)(P, {
					ariaLabel: `${n.name} 金额`,
					value: n.amount,
					onChange: (e) => t(n.id, { amount: e })
				}) }),
				/* @__PURE__ */ (0, x.jsx)("td", { children: /* @__PURE__ */ (0, x.jsx)(F, {
					ariaLabel: `${n.name} 类型`,
					value: n.kind,
					onChange: (e) => t(n.id, { kind: e })
				}) }),
				/* @__PURE__ */ (0, x.jsxs)("td", {
					className: "calculated-cell",
					children: [Math.max(0, Ve(n.date)), " 天"]
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
function xt({ goals: e, updateGoal: t, addGoal: n, deleteGoal: r }) {
	let i = e.reduce((e, t) => e + t.target, 0), a = e.reduce((e, t) => e + t.current, 0), o = e.reduce((e, t) => e + t.actualMonthly, 0);
	return /* @__PURE__ */ (0, x.jsxs)(x.Fragment, { children: [/* @__PURE__ */ (0, x.jsx)(L, {
		title: "目标底表",
		meta: `当前 ${O(a)} / 目标 ${O(i)} / 本月实际投入 ${O(o)}`,
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
				/* @__PURE__ */ (0, x.jsx)("td", { children: /* @__PURE__ */ (0, x.jsx)(F, {
					ariaLabel: `${n.name} 名称`,
					value: n.name,
					onChange: (e) => t(n.id, { name: e })
				}) }),
				/* @__PURE__ */ (0, x.jsx)("td", { children: /* @__PURE__ */ (0, x.jsx)(P, {
					ariaLabel: `${n.name} 目标金额`,
					value: n.target,
					onChange: (e) => t(n.id, { target: e })
				}) }),
				/* @__PURE__ */ (0, x.jsx)("td", { children: /* @__PURE__ */ (0, x.jsx)(P, {
					ariaLabel: `${n.name} 当前金额`,
					value: n.current,
					onChange: (e) => t(n.id, { current: e })
				}) }),
				/* @__PURE__ */ (0, x.jsx)("td", { children: /* @__PURE__ */ (0, x.jsx)(P, {
					ariaLabel: `${n.name} 每月预期准备`,
					value: n.monthly,
					onChange: (e) => t(n.id, { monthly: e })
				}) }),
				/* @__PURE__ */ (0, x.jsx)("td", { children: /* @__PURE__ */ (0, x.jsx)(P, {
					ariaLabel: `${n.name} 本月实际投入`,
					value: n.actualMonthly,
					onChange: (e) => t(n.id, { actualMonthly: e })
				}) }),
				/* @__PURE__ */ (0, x.jsx)("td", {
					className: "calculated-cell",
					children: A(n.target ? n.current / n.target : 0)
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
function St({ buckets: e, updateFundBucket: t, addFundBucket: n, deleteFundBucket: r, investmentReserve: i, liquidAfterBuckets: a, monthlyNeed: o }) {
	let s = e.reduce((e, t) => e + t.target, 0), c = e.reduce((e, t) => e + t.current, 0);
	return /* @__PURE__ */ (0, x.jsxs)(x.Fragment, { children: [
		/* @__PURE__ */ (0, x.jsx)(L, {
			title: "大花费项目底表",
			meta: `目标 ${O(s)} / 已准备 ${O(c)} / 每月还需 ${O(o)} / 项目后现金 ${O(a)}`,
			action: /* @__PURE__ */ (0, x.jsx)("button", {
				className: "secondary-button",
				type: "button",
				onClick: n,
				children: "新增大花费项目"
			})
		}),
		/* @__PURE__ */ (0, x.jsxs)("div", {
			className: "auto-bucket-row",
			children: [/* @__PURE__ */ (0, x.jsxs)("strong", { children: ["自动锁定：投资待投金 ", O(i)] }), /* @__PURE__ */ (0, x.jsx)("span", { children: "A股待投和美股待投从账户用途自动识别，不在下表重复录入。" })]
		}),
		/* @__PURE__ */ (0, x.jsx)("div", {
			className: "table-wrap spreadsheet-wrap",
			children: /* @__PURE__ */ (0, x.jsxs)("table", {
				className: "spreadsheet-table fund-bucket-table",
				children: [/* @__PURE__ */ (0, x.jsx)("thead", { children: /* @__PURE__ */ (0, x.jsxs)("tr", { children: [
					/* @__PURE__ */ (0, x.jsx)("th", { children: "大花费项目" }),
					/* @__PURE__ */ (0, x.jsx)("th", { children: "类型" }),
					/* @__PURE__ */ (0, x.jsx)("th", { children: "截止日期" }),
					/* @__PURE__ */ (0, x.jsx)("th", { children: "目标" }),
					/* @__PURE__ */ (0, x.jsx)("th", { children: "已准备" }),
					/* @__PURE__ */ (0, x.jsx)("th", { children: "缺口" }),
					/* @__PURE__ */ (0, x.jsx)("th", { children: "每月需补" }),
					/* @__PURE__ */ (0, x.jsx)("th", { children: "锁定" }),
					/* @__PURE__ */ (0, x.jsx)("th", { children: "备注" }),
					/* @__PURE__ */ (0, x.jsx)("th", { children: "操作" })
				] }) }), /* @__PURE__ */ (0, x.jsx)("tbody", { children: e.map((n) => /* @__PURE__ */ (0, x.jsxs)("tr", { children: [
					/* @__PURE__ */ (0, x.jsx)("td", { children: /* @__PURE__ */ (0, x.jsx)(F, {
						ariaLabel: `${n.name} 名称`,
						value: n.name,
						onChange: (e) => t(n.id, { name: e })
					}) }),
					/* @__PURE__ */ (0, x.jsx)("td", { children: /* @__PURE__ */ (0, x.jsx)(I, {
						ariaLabel: `${n.name} 类型`,
						options: le,
						value: n.kind,
						onChange: (e) => t(n.id, { kind: e })
					}) }),
					/* @__PURE__ */ (0, x.jsx)("td", { children: /* @__PURE__ */ (0, x.jsx)(ct, {
						ariaLabel: `${n.name} 截止日期`,
						value: n.dueDate,
						onChange: (e) => t(n.id, { dueDate: e })
					}) }),
					/* @__PURE__ */ (0, x.jsx)("td", { children: /* @__PURE__ */ (0, x.jsx)(P, {
						ariaLabel: `${n.name} 目标`,
						value: n.target,
						onChange: (e) => t(n.id, { target: e })
					}) }),
					/* @__PURE__ */ (0, x.jsx)("td", { children: /* @__PURE__ */ (0, x.jsx)(P, {
						ariaLabel: `${n.name} 已准备`,
						value: n.current,
						onChange: (e) => t(n.id, { current: e })
					}) }),
					/* @__PURE__ */ (0, x.jsxs)("td", { children: [/* @__PURE__ */ (0, x.jsx)("span", {
						className: n.gap > 0 ? "negative" : "positive",
						children: O(n.gap)
					}), /* @__PURE__ */ (0, x.jsx)("span", {
						className: "table-subtext",
						children: n.status
					})] }),
					/* @__PURE__ */ (0, x.jsx)("td", {
						className: "calculated-cell",
						children: O(n.monthlyNeed)
					}),
					/* @__PURE__ */ (0, x.jsx)("td", { children: /* @__PURE__ */ (0, x.jsx)(lt, {
						ariaLabel: `${n.name} 锁定`,
						checked: n.locked,
						onChange: (e) => t(n.id, { locked: e })
					}) }),
					/* @__PURE__ */ (0, x.jsx)("td", { children: /* @__PURE__ */ (0, x.jsx)(F, {
						ariaLabel: `${n.name} 备注`,
						value: n.note,
						onChange: (e) => t(n.id, { note: e })
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
		})
	] });
}
function Ct({ sections: e, reportText: t, copyStatus: n, onCopy: r }) {
	return /* @__PURE__ */ (0, x.jsxs)("section", {
		className: "monthly-report-panel",
		children: [
			/* @__PURE__ */ (0, x.jsxs)("div", {
				className: "monthly-report-head",
				children: [/* @__PURE__ */ (0, x.jsxs)("div", { children: [/* @__PURE__ */ (0, x.jsx)("strong", { children: "本月财务分析报告" }), /* @__PURE__ */ (0, x.jsx)("span", { children: n })] }), /* @__PURE__ */ (0, x.jsx)("button", {
					className: "secondary-button",
					type: "button",
					onClick: r,
					children: "复制报告"
				})]
			}),
			/* @__PURE__ */ (0, x.jsx)("div", {
				className: "report-section-grid",
				children: e.map((e) => /* @__PURE__ */ (0, x.jsxs)("article", {
					className: `report-section ${e.tone}`,
					children: [
						/* @__PURE__ */ (0, x.jsx)("span", { children: e.title }),
						/* @__PURE__ */ (0, x.jsx)("strong", { children: e.summary }),
						/* @__PURE__ */ (0, x.jsx)("p", { children: e.detail }),
						/* @__PURE__ */ (0, x.jsx)("em", { children: e.action })
					]
				}, e.title))
			}),
			/* @__PURE__ */ (0, x.jsx)("pre", {
				className: "monthly-report-text",
				children: t
			})
		]
	});
}
function wt({ rows: e, income: t, spending: n, allocation: r, surplus: i }) {
	return /* @__PURE__ */ (0, x.jsxs)(x.Fragment, { children: [/* @__PURE__ */ (0, x.jsx)(L, {
		title: "报表自动同步表",
		meta: `收入 ${O(t)} / 支出 ${O(n)} / 分配 ${O(r)} / 余额 ${O(i)}`
	}), /* @__PURE__ */ (0, x.jsx)("div", {
		className: "table-wrap spreadsheet-wrap",
		children: /* @__PURE__ */ (0, x.jsxs)("table", {
			className: "spreadsheet-table",
			children: [/* @__PURE__ */ (0, x.jsx)("thead", { children: /* @__PURE__ */ (0, x.jsxs)("tr", { children: [
				/* @__PURE__ */ (0, x.jsx)("th", { children: "项目" }),
				/* @__PURE__ */ (0, x.jsx)("th", { children: "数值" }),
				/* @__PURE__ */ (0, x.jsx)("th", { children: "占收入" }),
				/* @__PURE__ */ (0, x.jsx)("th", { children: "流向" }),
				/* @__PURE__ */ (0, x.jsx)("th", { children: "来源" })
			] }) }), /* @__PURE__ */ (0, x.jsx)("tbody", { children: e.map((e) => {
				let n = t ? e.amount / t : 0, r = `calculated-cell ${e.amount < 0 ? "negative" : ""}`.trim();
				return /* @__PURE__ */ (0, x.jsxs)("tr", { children: [
					/* @__PURE__ */ (0, x.jsx)("td", { children: e.name }),
					/* @__PURE__ */ (0, x.jsx)("td", { children: /* @__PURE__ */ (0, x.jsx)("span", {
						className: r,
						children: O(e.amount)
					}) }),
					/* @__PURE__ */ (0, x.jsx)("td", { children: /* @__PURE__ */ (0, x.jsx)("span", {
						className: r,
						children: ye(n)
					}) }),
					/* @__PURE__ */ (0, x.jsx)("td", { children: e.flow }),
					/* @__PURE__ */ (0, x.jsx)("td", { children: e.source })
				] }, e.id);
			}) })]
		})
	})] });
}
function Tt({ emergencyMonths: e, setEmergencyMonths: t, emergencyMonthlyNeed: n, setEmergencyMonthlyNeed: r, liabilities: i, updateLiability: a, addLiability: o, deleteLiability: s }) {
	return /* @__PURE__ */ (0, x.jsxs)(x.Fragment, { children: [/* @__PURE__ */ (0, x.jsx)(L, {
		title: "健康评分输入底表",
		meta: `目标覆盖 ${e} 月 / 负债 ${O(i.reduce((e, t) => e + t.amount, 0))}`,
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
					/* @__PURE__ */ (0, x.jsx)("td", { children: /* @__PURE__ */ (0, x.jsx)(P, {
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
					/* @__PURE__ */ (0, x.jsx)("td", { children: /* @__PURE__ */ (0, x.jsx)(P, {
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
					/* @__PURE__ */ (0, x.jsx)("td", { children: /* @__PURE__ */ (0, x.jsx)(F, {
						ariaLabel: `健康 ${e.name} 负债项`,
						value: e.name,
						onChange: (t) => a(e.id, { name: t })
					}) }),
					/* @__PURE__ */ (0, x.jsx)("td", { children: /* @__PURE__ */ (0, x.jsx)(P, {
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
function Et({ capabilities: e, updateCapability: t }) {
	return /* @__PURE__ */ (0, x.jsxs)(x.Fragment, { children: [/* @__PURE__ */ (0, x.jsx)(L, {
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
				/* @__PURE__ */ (0, x.jsx)("td", { children: /* @__PURE__ */ (0, x.jsx)(F, {
					ariaLabel: `${e.name} 名称`,
					value: e.name,
					onChange: (n) => t(e.id, { name: n })
				}) }),
				/* @__PURE__ */ (0, x.jsx)("td", { children: /* @__PURE__ */ (0, x.jsx)(P, {
					ariaLabel: `${e.name} 成熟度`,
					max: 100,
					step: 1,
					value: e.score,
					onChange: (n) => t(e.id, { score: k(n) })
				}) }),
				/* @__PURE__ */ (0, x.jsx)("td", { children: /* @__PURE__ */ (0, x.jsx)("span", {
					className: e.score >= 70 ? "pill good" : e.score >= 40 ? "pill warn" : "pill",
					children: e.score >= 70 ? "可用" : e.score >= 40 ? "建设中" : "待补齐"
				}) })
			] }, e.id)) })]
		})
	})] });
}
function Dt({ data: e, centerLabel: t, centerValue: n }) {
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
			y: k(66 + c * 53, 18, 114)
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
		detail: e.detail?.includes("%") ? e.detail : `${A(e.value / Math.max(i, 1))} / ${O(e.value)}${e.detail ? ` / ${e.detail}` : ""}`
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
						/* @__PURE__ */ (0, x.jsx)("title", { children: `${e.label} ${A(e.value / Math.max(i, 1))}` }),
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
		}), /* @__PURE__ */ (0, x.jsx)(Ot, {
			data: u,
			valueFormatter: O
		})]
	});
}
function Ot({ data: e, valueFormatter: t }) {
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
function kt({ data: e, valueFormatter: t, percentMode: n = !1 }) {
	let r = Math.max(...e.map((e) => e.max ?? e.value), n ? 100 : 1);
	return /* @__PURE__ */ (0, x.jsx)("div", {
		className: "horizontal-bars",
		children: e.map((e, n) => {
			let i = e.max ?? r, a = k(e.value / Math.max(i, 1) * 100);
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
function At({ data: e, valueFormatter: t }) {
	let n = Math.max(...e.map((e) => e.value), 1);
	return /* @__PURE__ */ (0, x.jsx)("div", {
		className: "vertical-bars",
		children: e.map((e, r) => {
			let i = k(e.value / n * 100, 4, 100);
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
function jt({ data: e, valueFormatter: t }) {
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
function Mt({ data: e, valueFormatter: t }) {
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
		}), /* @__PURE__ */ (0, x.jsx)(Ot, {
			data: n.length ? n : [{
				label: "暂无数据",
				value: 0,
				color: "#b8c4d4"
			}],
			valueFormatter: t
		})]
	});
}
function Nt({ data: e, valueFormatter: t }) {
	return /* @__PURE__ */ (0, x.jsx)("div", {
		className: "progress-list",
		children: e.map((e, n) => {
			let r = k(e.value / Math.max(e.max ?? e.value, 1) * 100);
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
function Pt({ events: e }) {
	return /* @__PURE__ */ (0, x.jsx)("div", {
		className: "cashflow-calendar",
		children: e.map((e) => /* @__PURE__ */ (0, x.jsxs)("article", {
			className: "calendar-event",
			children: [
				/* @__PURE__ */ (0, x.jsx)("span", { children: e.date.slice(5) }),
				/* @__PURE__ */ (0, x.jsx)("strong", { children: e.item }),
				/* @__PURE__ */ (0, x.jsxs)("div", { children: [e.inflow > 0 && /* @__PURE__ */ (0, x.jsxs)("em", {
					className: "positive",
					children: ["+", O(e.inflow)]
				}), e.outflow > 0 && /* @__PURE__ */ (0, x.jsxs)("em", {
					className: "negative",
					children: ["-", O(e.outflow)]
				})] }),
				/* @__PURE__ */ (0, x.jsxs)("small", { children: ["余额 ", O(e.balance)] })
			]
		}, `${e.date}-${e.item}`))
	});
}
function Ft({ data: e }) {
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
			children: [/* @__PURE__ */ (0, x.jsxs)("span", { children: ["流入 ", O(e.filter((e) => e.value > 0 && e.kind !== "start" && e.kind !== "end").reduce((e, t) => e + t.value, 0))] }), /* @__PURE__ */ (0, x.jsxs)("span", { children: ["流出 ", O(Math.abs(e.filter((e) => e.value < 0).reduce((e, t) => e + t.value, 0)))] })]
		})]
	});
}
function It({ data: e }) {
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
					let t = 56 + k(e.x) / 100 * 248, n = 304 - k(e.y) / 100 * 248;
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
		}), /* @__PURE__ */ (0, x.jsx)(Ot, {
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
function Lt({ data: e, source: t, valueFormatter: n }) {
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
						width: `${k(e.value / r * 100, 4, 100)}%`,
						backgroundColor: e.color ?? S[t % S.length]
					} }),
					/* @__PURE__ */ (0, x.jsx)("strong", { children: e.label }),
					/* @__PURE__ */ (0, x.jsx)("em", { children: n(e.value) })
				]
			}, e.label))
		})]
	});
}
function Rt({ data: e }) {
	return /* @__PURE__ */ (0, x.jsx)("div", {
		className: "heatmap-grid",
		children: e.map((e, t) => /* @__PURE__ */ (0, x.jsxs)("div", {
			className: "heat-cell",
			style: {
				backgroundColor: e.color ?? S[t % S.length],
				opacity: .22 + k(e.value, 0, 120) / 160
			},
			children: [/* @__PURE__ */ (0, x.jsx)("strong", { children: e.label }), /* @__PURE__ */ (0, x.jsx)("span", { children: e.detail ?? `${e.value.toFixed(0)}%` })]
		}, e.label))
	});
}
function zt({ data: e, xLabel: t, yLabel: n }) {
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
					let t = 28 + k(e.x) / 100 * 164, n = 192 - k(e.y) / 100 * 164;
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
		}), /* @__PURE__ */ (0, x.jsx)(Ot, {
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
function Bt({ budgets: e, updateBudget: t, addBudget: n, deleteBudget: r }) {
	let i = e.reduce((e, t) => e + t.plan, 0), a = e.reduce((e, t) => e + t.actual, 0);
	return /* @__PURE__ */ (0, x.jsxs)(x.Fragment, { children: [/* @__PURE__ */ (0, x.jsx)(L, {
		title: "预算支出底表",
		meta: `预算 ${O(i)} / 实际 ${O(a)} / 剩余 ${O(i - a)}`,
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
				/* @__PURE__ */ (0, x.jsx)("td", { children: /* @__PURE__ */ (0, x.jsx)(F, {
					ariaLabel: `${n.name} 分类`,
					value: n.name,
					onChange: (e) => t(n.id, { name: e })
				}) }),
				/* @__PURE__ */ (0, x.jsx)("td", { children: /* @__PURE__ */ (0, x.jsx)(P, {
					ariaLabel: `${n.name} 预算`,
					value: n.plan,
					onChange: (e) => t(n.id, { plan: e })
				}) }),
				/* @__PURE__ */ (0, x.jsx)("td", { children: /* @__PURE__ */ (0, x.jsx)(P, {
					ariaLabel: `${n.name} 实际`,
					value: n.actual,
					onChange: (e) => t(n.id, { actual: e })
				}) }),
				/* @__PURE__ */ (0, x.jsx)("td", {
					className: "calculated-cell",
					children: O(n.plan - n.actual)
				}),
				/* @__PURE__ */ (0, x.jsx)("td", { children: /* @__PURE__ */ (0, x.jsx)(lt, {
					ariaLabel: `${n.name} 必须`,
					checked: n.required,
					onChange: (e) => t(n.id, { required: e })
				}) }),
				/* @__PURE__ */ (0, x.jsx)("td", { children: /* @__PURE__ */ (0, x.jsx)(lt, {
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
var Vt = document.getElementById("root");
Vt && (0, y.createRoot)(Vt).render(/* @__PURE__ */ (0, x.jsx)(b.StrictMode, { children: /* @__PURE__ */ (0, x.jsx)(nt, {}) }));
//#endregion
