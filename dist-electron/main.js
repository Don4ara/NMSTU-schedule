import { nativeTheme as jt, ipcMain as ge, app as Y, BrowserWindow as yi, nativeImage as Ot } from "electron";
import ye from "util";
import M, { Readable as Ft } from "stream";
import wi from "path";
import Za from "http";
import Qa from "https";
import ra from "url";
import Pt from "fs";
import Ei from "crypto";
import _i from "http2";
import Lt from "assert";
import Ri from "tty";
import Ut from "os";
import ce from "zlib";
import { EventEmitter as qt } from "events";
import { fileURLToPath as Nt } from "node:url";
import X from "node:path";
import Si from "node:fs/promises";
function ki(e, a) {
  return function() {
    return e.apply(a, arguments);
  };
}
const { toString: Bt } = Object.prototype, { getPrototypeOf: en } = Object, { iterator: ca, toStringTag: Ti } = Symbol, pa = /* @__PURE__ */ ((e) => (a) => {
  const n = Bt.call(a);
  return e[n] || (e[n] = n.slice(8, -1).toLowerCase());
})(/* @__PURE__ */ Object.create(null)), Z = (e) => (e = e.toLowerCase(), (a) => pa(a) === e), la = (e) => (a) => typeof a === e, { isArray: je } = Array, Te = la("undefined");
function Ne(e) {
  return e !== null && !Te(e) && e.constructor !== null && !Te(e.constructor) && H(e.constructor.isBuffer) && e.constructor.isBuffer(e);
}
const Ci = Z("ArrayBuffer");
function Dt(e) {
  let a;
  return typeof ArrayBuffer < "u" && ArrayBuffer.isView ? a = ArrayBuffer.isView(e) : a = e && e.buffer && Ci(e.buffer), a;
}
const It = la("string"), H = la("function"), Ai = la("number"), Be = (e) => e !== null && typeof e == "object", zt = (e) => e === !0 || e === !1, Xe = (e) => {
  if (pa(e) !== "object")
    return !1;
  const a = en(e);
  return (a === null || a === Object.prototype || Object.getPrototypeOf(a) === null) && !(Ti in e) && !(ca in e);
}, $t = (e) => {
  if (!Be(e) || Ne(e))
    return !1;
  try {
    return Object.keys(e).length === 0 && Object.getPrototypeOf(e) === Object.prototype;
  } catch {
    return !1;
  }
}, Mt = Z("Date"), Ht = Z("File"), Gt = Z("Blob"), Vt = Z("FileList"), Wt = (e) => Be(e) && H(e.pipe), Jt = (e) => {
  let a;
  return e && (typeof FormData == "function" && e instanceof FormData || H(e.append) && ((a = pa(e)) === "formdata" || // detect form-data instance
  a === "object" && H(e.toString) && e.toString() === "[object FormData]"));
}, Kt = Z("URLSearchParams"), [Yt, Xt, Zt, Qt] = ["ReadableStream", "Request", "Response", "Headers"].map(Z), eo = (e) => e.trim ? e.trim() : e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
function De(e, a, { allOwnKeys: n = !1 } = {}) {
  if (e === null || typeof e > "u")
    return;
  let i, t;
  if (typeof e != "object" && (e = [e]), je(e))
    for (i = 0, t = e.length; i < t; i++)
      a.call(null, e[i], i, e);
  else {
    if (Ne(e))
      return;
    const o = n ? Object.getOwnPropertyNames(e) : Object.keys(e), s = o.length;
    let c;
    for (i = 0; i < s; i++)
      c = o[i], a.call(null, e[c], c, e);
  }
}
function ji(e, a) {
  if (Ne(e))
    return null;
  a = a.toLowerCase();
  const n = Object.keys(e);
  let i = n.length, t;
  for (; i-- > 0; )
    if (t = n[i], a === t.toLowerCase())
      return t;
  return null;
}
const de = typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : typeof window < "u" ? window : global, Oi = (e) => !Te(e) && e !== de;
function Ma() {
  const { caseless: e, skipUndefined: a } = Oi(this) && this || {}, n = {}, i = (t, o) => {
    const s = e && ji(n, o) || o;
    Xe(n[s]) && Xe(t) ? n[s] = Ma(n[s], t) : Xe(t) ? n[s] = Ma({}, t) : je(t) ? n[s] = t.slice() : (!a || !Te(t)) && (n[s] = t);
  };
  for (let t = 0, o = arguments.length; t < o; t++)
    arguments[t] && De(arguments[t], i);
  return n;
}
const ao = (e, a, n, { allOwnKeys: i } = {}) => (De(a, (t, o) => {
  n && H(t) ? e[o] = ki(t, n) : e[o] = t;
}, { allOwnKeys: i }), e), no = (e) => (e.charCodeAt(0) === 65279 && (e = e.slice(1)), e), io = (e, a, n, i) => {
  e.prototype = Object.create(a.prototype, i), e.prototype.constructor = e, Object.defineProperty(e, "super", {
    value: a.prototype
  }), n && Object.assign(e.prototype, n);
}, to = (e, a, n, i) => {
  let t, o, s;
  const c = {};
  if (a = a || {}, e == null) return a;
  do {
    for (t = Object.getOwnPropertyNames(e), o = t.length; o-- > 0; )
      s = t[o], (!i || i(s, e, a)) && !c[s] && (a[s] = e[s], c[s] = !0);
    e = n !== !1 && en(e);
  } while (e && (!n || n(e, a)) && e !== Object.prototype);
  return a;
}, oo = (e, a, n) => {
  e = String(e), (n === void 0 || n > e.length) && (n = e.length), n -= a.length;
  const i = e.indexOf(a, n);
  return i !== -1 && i === n;
}, so = (e) => {
  if (!e) return null;
  if (je(e)) return e;
  let a = e.length;
  if (!Ai(a)) return null;
  const n = new Array(a);
  for (; a-- > 0; )
    n[a] = e[a];
  return n;
}, ro = /* @__PURE__ */ ((e) => (a) => e && a instanceof e)(typeof Uint8Array < "u" && en(Uint8Array)), co = (e, a) => {
  const i = (e && e[ca]).call(e);
  let t;
  for (; (t = i.next()) && !t.done; ) {
    const o = t.value;
    a.call(e, o[0], o[1]);
  }
}, po = (e, a) => {
  let n;
  const i = [];
  for (; (n = e.exec(a)) !== null; )
    i.push(n);
  return i;
}, lo = Z("HTMLFormElement"), uo = (e) => e.toLowerCase().replace(
  /[-_\s]([a-z\d])(\w*)/g,
  function(n, i, t) {
    return i.toUpperCase() + t;
  }
), _n = (({ hasOwnProperty: e }) => (a, n) => e.call(a, n))(Object.prototype), mo = Z("RegExp"), Fi = (e, a) => {
  const n = Object.getOwnPropertyDescriptors(e), i = {};
  De(n, (t, o) => {
    let s;
    (s = a(t, o, e)) !== !1 && (i[o] = s || t);
  }), Object.defineProperties(e, i);
}, fo = (e) => {
  Fi(e, (a, n) => {
    if (H(e) && ["arguments", "caller", "callee"].indexOf(n) !== -1)
      return !1;
    const i = e[n];
    if (H(i)) {
      if (a.enumerable = !1, "writable" in a) {
        a.writable = !1;
        return;
      }
      a.set || (a.set = () => {
        throw Error("Can not rewrite read-only method '" + n + "'");
      });
    }
  });
}, xo = (e, a) => {
  const n = {}, i = (t) => {
    t.forEach((o) => {
      n[o] = !0;
    });
  };
  return je(e) ? i(e) : i(String(e).split(a)), n;
}, vo = () => {
}, ho = (e, a) => e != null && Number.isFinite(e = +e) ? e : a;
function bo(e) {
  return !!(e && H(e.append) && e[Ti] === "FormData" && e[ca]);
}
const go = (e) => {
  const a = new Array(10), n = (i, t) => {
    if (Be(i)) {
      if (a.indexOf(i) >= 0)
        return;
      if (Ne(i))
        return i;
      if (!("toJSON" in i)) {
        a[t] = i;
        const o = je(i) ? [] : {};
        return De(i, (s, c) => {
          const d = n(s, t + 1);
          !Te(d) && (o[c] = d);
        }), a[t] = void 0, o;
      }
    }
    return i;
  };
  return n(e, 0);
}, yo = Z("AsyncFunction"), wo = (e) => e && (Be(e) || H(e)) && H(e.then) && H(e.catch), Pi = ((e, a) => e ? setImmediate : a ? ((n, i) => (de.addEventListener("message", ({ source: t, data: o }) => {
  t === de && o === n && i.length && i.shift()();
}, !1), (t) => {
  i.push(t), de.postMessage(n, "*");
}))(`axios@${Math.random()}`, []) : (n) => setTimeout(n))(
  typeof setImmediate == "function",
  H(de.postMessage)
), Eo = typeof queueMicrotask < "u" ? queueMicrotask.bind(de) : typeof process < "u" && process.nextTick || Pi, _o = (e) => e != null && H(e[ca]), u = {
  isArray: je,
  isArrayBuffer: Ci,
  isBuffer: Ne,
  isFormData: Jt,
  isArrayBufferView: Dt,
  isString: It,
  isNumber: Ai,
  isBoolean: zt,
  isObject: Be,
  isPlainObject: Xe,
  isEmptyObject: $t,
  isReadableStream: Yt,
  isRequest: Xt,
  isResponse: Zt,
  isHeaders: Qt,
  isUndefined: Te,
  isDate: Mt,
  isFile: Ht,
  isBlob: Gt,
  isRegExp: mo,
  isFunction: H,
  isStream: Wt,
  isURLSearchParams: Kt,
  isTypedArray: ro,
  isFileList: Vt,
  forEach: De,
  merge: Ma,
  extend: ao,
  trim: eo,
  stripBOM: no,
  inherits: io,
  toFlatObject: to,
  kindOf: pa,
  kindOfTest: Z,
  endsWith: oo,
  toArray: so,
  forEachEntry: co,
  matchAll: po,
  isHTMLForm: lo,
  hasOwnProperty: _n,
  hasOwnProp: _n,
  // an alias to avoid ESLint no-prototype-builtins detection
  reduceDescriptors: Fi,
  freezeMethods: fo,
  toObjectSet: xo,
  toCamelCase: uo,
  noop: vo,
  toFiniteNumber: ho,
  findKey: ji,
  global: de,
  isContextDefined: Oi,
  isSpecCompliantForm: bo,
  toJSONObject: go,
  isAsyncFn: yo,
  isThenable: wo,
  setImmediate: Pi,
  asap: Eo,
  isIterable: _o
};
function b(e, a, n, i, t) {
  Error.call(this), Error.captureStackTrace ? Error.captureStackTrace(this, this.constructor) : this.stack = new Error().stack, this.message = e, this.name = "AxiosError", a && (this.code = a), n && (this.config = n), i && (this.request = i), t && (this.response = t, this.status = t.status ? t.status : null);
}
u.inherits(b, Error, {
  toJSON: function() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: u.toJSONObject(this.config),
      code: this.code,
      status: this.status
    };
  }
});
const Li = b.prototype, Ui = {};
[
  "ERR_BAD_OPTION_VALUE",
  "ERR_BAD_OPTION",
  "ECONNABORTED",
  "ETIMEDOUT",
  "ERR_NETWORK",
  "ERR_FR_TOO_MANY_REDIRECTS",
  "ERR_DEPRECATED",
  "ERR_BAD_RESPONSE",
  "ERR_BAD_REQUEST",
  "ERR_CANCELED",
  "ERR_NOT_SUPPORT",
  "ERR_INVALID_URL"
  // eslint-disable-next-line func-names
].forEach((e) => {
  Ui[e] = { value: e };
});
Object.defineProperties(b, Ui);
Object.defineProperty(Li, "isAxiosError", { value: !0 });
b.from = (e, a, n, i, t, o) => {
  const s = Object.create(Li);
  u.toFlatObject(e, s, function(r) {
    return r !== Error.prototype;
  }, (m) => m !== "isAxiosError");
  const c = e && e.message ? e.message : "Error", d = a == null && e ? e.code : a;
  return b.call(s, c, d, n, i, t), e && s.cause == null && Object.defineProperty(s, "cause", { value: e, configurable: !0 }), s.name = e && e.name || "Error", o && Object.assign(s, o), s;
};
function an(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var qi = M.Stream, Ro = ye, So = Q;
function Q() {
  this.source = null, this.dataSize = 0, this.maxDataSize = 1024 * 1024, this.pauseStream = !0, this._maxDataSizeExceeded = !1, this._released = !1, this._bufferedEvents = [];
}
Ro.inherits(Q, qi);
Q.create = function(e, a) {
  var n = new this();
  a = a || {};
  for (var i in a)
    n[i] = a[i];
  n.source = e;
  var t = e.emit;
  return e.emit = function() {
    return n._handleEmit(arguments), t.apply(e, arguments);
  }, e.on("error", function() {
  }), n.pauseStream && e.pause(), n;
};
Object.defineProperty(Q.prototype, "readable", {
  configurable: !0,
  enumerable: !0,
  get: function() {
    return this.source.readable;
  }
});
Q.prototype.setEncoding = function() {
  return this.source.setEncoding.apply(this.source, arguments);
};
Q.prototype.resume = function() {
  this._released || this.release(), this.source.resume();
};
Q.prototype.pause = function() {
  this.source.pause();
};
Q.prototype.release = function() {
  this._released = !0, this._bufferedEvents.forEach((function(e) {
    this.emit.apply(this, e);
  }).bind(this)), this._bufferedEvents = [];
};
Q.prototype.pipe = function() {
  var e = qi.prototype.pipe.apply(this, arguments);
  return this.resume(), e;
};
Q.prototype._handleEmit = function(e) {
  if (this._released) {
    this.emit.apply(this, e);
    return;
  }
  e[0] === "data" && (this.dataSize += e[1].length, this._checkIfMaxDataSizeExceeded()), this._bufferedEvents.push(e);
};
Q.prototype._checkIfMaxDataSizeExceeded = function() {
  if (!this._maxDataSizeExceeded && !(this.dataSize <= this.maxDataSize)) {
    this._maxDataSizeExceeded = !0;
    var e = "DelayedStream#maxDataSize of " + this.maxDataSize + " bytes exceeded.";
    this.emit("error", new Error(e));
  }
};
var ko = ye, Ni = M.Stream, Rn = So, To = P;
function P() {
  this.writable = !1, this.readable = !0, this.dataSize = 0, this.maxDataSize = 2 * 1024 * 1024, this.pauseStreams = !0, this._released = !1, this._streams = [], this._currentStream = null, this._insideLoop = !1, this._pendingNext = !1;
}
ko.inherits(P, Ni);
P.create = function(e) {
  var a = new this();
  e = e || {};
  for (var n in e)
    a[n] = e[n];
  return a;
};
P.isStreamLike = function(e) {
  return typeof e != "function" && typeof e != "string" && typeof e != "boolean" && typeof e != "number" && !Buffer.isBuffer(e);
};
P.prototype.append = function(e) {
  var a = P.isStreamLike(e);
  if (a) {
    if (!(e instanceof Rn)) {
      var n = Rn.create(e, {
        maxDataSize: 1 / 0,
        pauseStream: this.pauseStreams
      });
      e.on("data", this._checkDataSize.bind(this)), e = n;
    }
    this._handleErrors(e), this.pauseStreams && e.pause();
  }
  return this._streams.push(e), this;
};
P.prototype.pipe = function(e, a) {
  return Ni.prototype.pipe.call(this, e, a), this.resume(), e;
};
P.prototype._getNext = function() {
  if (this._currentStream = null, this._insideLoop) {
    this._pendingNext = !0;
    return;
  }
  this._insideLoop = !0;
  try {
    do
      this._pendingNext = !1, this._realGetNext();
    while (this._pendingNext);
  } finally {
    this._insideLoop = !1;
  }
};
P.prototype._realGetNext = function() {
  var e = this._streams.shift();
  if (typeof e > "u") {
    this.end();
    return;
  }
  if (typeof e != "function") {
    this._pipeNext(e);
    return;
  }
  var a = e;
  a((function(n) {
    var i = P.isStreamLike(n);
    i && (n.on("data", this._checkDataSize.bind(this)), this._handleErrors(n)), this._pipeNext(n);
  }).bind(this));
};
P.prototype._pipeNext = function(e) {
  this._currentStream = e;
  var a = P.isStreamLike(e);
  if (a) {
    e.on("end", this._getNext.bind(this)), e.pipe(this, { end: !1 });
    return;
  }
  var n = e;
  this.write(n), this._getNext();
};
P.prototype._handleErrors = function(e) {
  var a = this;
  e.on("error", function(n) {
    a._emitError(n);
  });
};
P.prototype.write = function(e) {
  this.emit("data", e);
};
P.prototype.pause = function() {
  this.pauseStreams && (this.pauseStreams && this._currentStream && typeof this._currentStream.pause == "function" && this._currentStream.pause(), this.emit("pause"));
};
P.prototype.resume = function() {
  this._released || (this._released = !0, this.writable = !0, this._getNext()), this.pauseStreams && this._currentStream && typeof this._currentStream.resume == "function" && this._currentStream.resume(), this.emit("resume");
};
P.prototype.end = function() {
  this._reset(), this.emit("end");
};
P.prototype.destroy = function() {
  this._reset(), this.emit("close");
};
P.prototype._reset = function() {
  this.writable = !1, this._streams = [], this._currentStream = null;
};
P.prototype._checkDataSize = function() {
  if (this._updateDataSize(), !(this.dataSize <= this.maxDataSize)) {
    var e = "DelayedStream#maxDataSize of " + this.maxDataSize + " bytes exceeded.";
    this._emitError(new Error(e));
  }
};
P.prototype._updateDataSize = function() {
  this.dataSize = 0;
  var e = this;
  this._streams.forEach(function(a) {
    a.dataSize && (e.dataSize += a.dataSize);
  }), this._currentStream && this._currentStream.dataSize && (this.dataSize += this._currentStream.dataSize);
};
P.prototype._emitError = function(e) {
  this._reset(), this.emit("error", e);
};
var Bi = {};
const Co = {
  "application/1d-interleaved-parityfec": {
    source: "iana"
  },
  "application/3gpdash-qoe-report+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0
  },
  "application/3gpp-ims+xml": {
    source: "iana",
    compressible: !0
  },
  "application/3gpphal+json": {
    source: "iana",
    compressible: !0
  },
  "application/3gpphalforms+json": {
    source: "iana",
    compressible: !0
  },
  "application/a2l": {
    source: "iana"
  },
  "application/ace+cbor": {
    source: "iana"
  },
  "application/activemessage": {
    source: "iana"
  },
  "application/activity+json": {
    source: "iana",
    compressible: !0
  },
  "application/alto-costmap+json": {
    source: "iana",
    compressible: !0
  },
  "application/alto-costmapfilter+json": {
    source: "iana",
    compressible: !0
  },
  "application/alto-directory+json": {
    source: "iana",
    compressible: !0
  },
  "application/alto-endpointcost+json": {
    source: "iana",
    compressible: !0
  },
  "application/alto-endpointcostparams+json": {
    source: "iana",
    compressible: !0
  },
  "application/alto-endpointprop+json": {
    source: "iana",
    compressible: !0
  },
  "application/alto-endpointpropparams+json": {
    source: "iana",
    compressible: !0
  },
  "application/alto-error+json": {
    source: "iana",
    compressible: !0
  },
  "application/alto-networkmap+json": {
    source: "iana",
    compressible: !0
  },
  "application/alto-networkmapfilter+json": {
    source: "iana",
    compressible: !0
  },
  "application/alto-updatestreamcontrol+json": {
    source: "iana",
    compressible: !0
  },
  "application/alto-updatestreamparams+json": {
    source: "iana",
    compressible: !0
  },
  "application/aml": {
    source: "iana"
  },
  "application/andrew-inset": {
    source: "iana",
    extensions: [
      "ez"
    ]
  },
  "application/applefile": {
    source: "iana"
  },
  "application/applixware": {
    source: "apache",
    extensions: [
      "aw"
    ]
  },
  "application/at+jwt": {
    source: "iana"
  },
  "application/atf": {
    source: "iana"
  },
  "application/atfx": {
    source: "iana"
  },
  "application/atom+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "atom"
    ]
  },
  "application/atomcat+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "atomcat"
    ]
  },
  "application/atomdeleted+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "atomdeleted"
    ]
  },
  "application/atomicmail": {
    source: "iana"
  },
  "application/atomsvc+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "atomsvc"
    ]
  },
  "application/atsc-dwd+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "dwd"
    ]
  },
  "application/atsc-dynamic-event-message": {
    source: "iana"
  },
  "application/atsc-held+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "held"
    ]
  },
  "application/atsc-rdt+json": {
    source: "iana",
    compressible: !0
  },
  "application/atsc-rsat+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "rsat"
    ]
  },
  "application/atxml": {
    source: "iana"
  },
  "application/auth-policy+xml": {
    source: "iana",
    compressible: !0
  },
  "application/bacnet-xdd+zip": {
    source: "iana",
    compressible: !1
  },
  "application/batch-smtp": {
    source: "iana"
  },
  "application/bdoc": {
    compressible: !1,
    extensions: [
      "bdoc"
    ]
  },
  "application/beep+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0
  },
  "application/calendar+json": {
    source: "iana",
    compressible: !0
  },
  "application/calendar+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "xcs"
    ]
  },
  "application/call-completion": {
    source: "iana"
  },
  "application/cals-1840": {
    source: "iana"
  },
  "application/captive+json": {
    source: "iana",
    compressible: !0
  },
  "application/cbor": {
    source: "iana"
  },
  "application/cbor-seq": {
    source: "iana"
  },
  "application/cccex": {
    source: "iana"
  },
  "application/ccmp+xml": {
    source: "iana",
    compressible: !0
  },
  "application/ccxml+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "ccxml"
    ]
  },
  "application/cdfx+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "cdfx"
    ]
  },
  "application/cdmi-capability": {
    source: "iana",
    extensions: [
      "cdmia"
    ]
  },
  "application/cdmi-container": {
    source: "iana",
    extensions: [
      "cdmic"
    ]
  },
  "application/cdmi-domain": {
    source: "iana",
    extensions: [
      "cdmid"
    ]
  },
  "application/cdmi-object": {
    source: "iana",
    extensions: [
      "cdmio"
    ]
  },
  "application/cdmi-queue": {
    source: "iana",
    extensions: [
      "cdmiq"
    ]
  },
  "application/cdni": {
    source: "iana"
  },
  "application/cea": {
    source: "iana"
  },
  "application/cea-2018+xml": {
    source: "iana",
    compressible: !0
  },
  "application/cellml+xml": {
    source: "iana",
    compressible: !0
  },
  "application/cfw": {
    source: "iana"
  },
  "application/city+json": {
    source: "iana",
    compressible: !0
  },
  "application/clr": {
    source: "iana"
  },
  "application/clue+xml": {
    source: "iana",
    compressible: !0
  },
  "application/clue_info+xml": {
    source: "iana",
    compressible: !0
  },
  "application/cms": {
    source: "iana"
  },
  "application/cnrp+xml": {
    source: "iana",
    compressible: !0
  },
  "application/coap-group+json": {
    source: "iana",
    compressible: !0
  },
  "application/coap-payload": {
    source: "iana"
  },
  "application/commonground": {
    source: "iana"
  },
  "application/conference-info+xml": {
    source: "iana",
    compressible: !0
  },
  "application/cose": {
    source: "iana"
  },
  "application/cose-key": {
    source: "iana"
  },
  "application/cose-key-set": {
    source: "iana"
  },
  "application/cpl+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "cpl"
    ]
  },
  "application/csrattrs": {
    source: "iana"
  },
  "application/csta+xml": {
    source: "iana",
    compressible: !0
  },
  "application/cstadata+xml": {
    source: "iana",
    compressible: !0
  },
  "application/csvm+json": {
    source: "iana",
    compressible: !0
  },
  "application/cu-seeme": {
    source: "apache",
    extensions: [
      "cu"
    ]
  },
  "application/cwt": {
    source: "iana"
  },
  "application/cybercash": {
    source: "iana"
  },
  "application/dart": {
    compressible: !0
  },
  "application/dash+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "mpd"
    ]
  },
  "application/dash-patch+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "mpp"
    ]
  },
  "application/dashdelta": {
    source: "iana"
  },
  "application/davmount+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "davmount"
    ]
  },
  "application/dca-rft": {
    source: "iana"
  },
  "application/dcd": {
    source: "iana"
  },
  "application/dec-dx": {
    source: "iana"
  },
  "application/dialog-info+xml": {
    source: "iana",
    compressible: !0
  },
  "application/dicom": {
    source: "iana"
  },
  "application/dicom+json": {
    source: "iana",
    compressible: !0
  },
  "application/dicom+xml": {
    source: "iana",
    compressible: !0
  },
  "application/dii": {
    source: "iana"
  },
  "application/dit": {
    source: "iana"
  },
  "application/dns": {
    source: "iana"
  },
  "application/dns+json": {
    source: "iana",
    compressible: !0
  },
  "application/dns-message": {
    source: "iana"
  },
  "application/docbook+xml": {
    source: "apache",
    compressible: !0,
    extensions: [
      "dbk"
    ]
  },
  "application/dots+cbor": {
    source: "iana"
  },
  "application/dskpp+xml": {
    source: "iana",
    compressible: !0
  },
  "application/dssc+der": {
    source: "iana",
    extensions: [
      "dssc"
    ]
  },
  "application/dssc+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "xdssc"
    ]
  },
  "application/dvcs": {
    source: "iana"
  },
  "application/ecmascript": {
    source: "iana",
    compressible: !0,
    extensions: [
      "es",
      "ecma"
    ]
  },
  "application/edi-consent": {
    source: "iana"
  },
  "application/edi-x12": {
    source: "iana",
    compressible: !1
  },
  "application/edifact": {
    source: "iana",
    compressible: !1
  },
  "application/efi": {
    source: "iana"
  },
  "application/elm+json": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0
  },
  "application/elm+xml": {
    source: "iana",
    compressible: !0
  },
  "application/emergencycalldata.cap+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0
  },
  "application/emergencycalldata.comment+xml": {
    source: "iana",
    compressible: !0
  },
  "application/emergencycalldata.control+xml": {
    source: "iana",
    compressible: !0
  },
  "application/emergencycalldata.deviceinfo+xml": {
    source: "iana",
    compressible: !0
  },
  "application/emergencycalldata.ecall.msd": {
    source: "iana"
  },
  "application/emergencycalldata.providerinfo+xml": {
    source: "iana",
    compressible: !0
  },
  "application/emergencycalldata.serviceinfo+xml": {
    source: "iana",
    compressible: !0
  },
  "application/emergencycalldata.subscriberinfo+xml": {
    source: "iana",
    compressible: !0
  },
  "application/emergencycalldata.veds+xml": {
    source: "iana",
    compressible: !0
  },
  "application/emma+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "emma"
    ]
  },
  "application/emotionml+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "emotionml"
    ]
  },
  "application/encaprtp": {
    source: "iana"
  },
  "application/epp+xml": {
    source: "iana",
    compressible: !0
  },
  "application/epub+zip": {
    source: "iana",
    compressible: !1,
    extensions: [
      "epub"
    ]
  },
  "application/eshop": {
    source: "iana"
  },
  "application/exi": {
    source: "iana",
    extensions: [
      "exi"
    ]
  },
  "application/expect-ct-report+json": {
    source: "iana",
    compressible: !0
  },
  "application/express": {
    source: "iana",
    extensions: [
      "exp"
    ]
  },
  "application/fastinfoset": {
    source: "iana"
  },
  "application/fastsoap": {
    source: "iana"
  },
  "application/fdt+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "fdt"
    ]
  },
  "application/fhir+json": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0
  },
  "application/fhir+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0
  },
  "application/fido.trusted-apps+json": {
    compressible: !0
  },
  "application/fits": {
    source: "iana"
  },
  "application/flexfec": {
    source: "iana"
  },
  "application/font-sfnt": {
    source: "iana"
  },
  "application/font-tdpfr": {
    source: "iana",
    extensions: [
      "pfr"
    ]
  },
  "application/font-woff": {
    source: "iana",
    compressible: !1
  },
  "application/framework-attributes+xml": {
    source: "iana",
    compressible: !0
  },
  "application/geo+json": {
    source: "iana",
    compressible: !0,
    extensions: [
      "geojson"
    ]
  },
  "application/geo+json-seq": {
    source: "iana"
  },
  "application/geopackage+sqlite3": {
    source: "iana"
  },
  "application/geoxacml+xml": {
    source: "iana",
    compressible: !0
  },
  "application/gltf-buffer": {
    source: "iana"
  },
  "application/gml+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "gml"
    ]
  },
  "application/gpx+xml": {
    source: "apache",
    compressible: !0,
    extensions: [
      "gpx"
    ]
  },
  "application/gxf": {
    source: "apache",
    extensions: [
      "gxf"
    ]
  },
  "application/gzip": {
    source: "iana",
    compressible: !1,
    extensions: [
      "gz"
    ]
  },
  "application/h224": {
    source: "iana"
  },
  "application/held+xml": {
    source: "iana",
    compressible: !0
  },
  "application/hjson": {
    extensions: [
      "hjson"
    ]
  },
  "application/http": {
    source: "iana"
  },
  "application/hyperstudio": {
    source: "iana",
    extensions: [
      "stk"
    ]
  },
  "application/ibe-key-request+xml": {
    source: "iana",
    compressible: !0
  },
  "application/ibe-pkg-reply+xml": {
    source: "iana",
    compressible: !0
  },
  "application/ibe-pp-data": {
    source: "iana"
  },
  "application/iges": {
    source: "iana"
  },
  "application/im-iscomposing+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0
  },
  "application/index": {
    source: "iana"
  },
  "application/index.cmd": {
    source: "iana"
  },
  "application/index.obj": {
    source: "iana"
  },
  "application/index.response": {
    source: "iana"
  },
  "application/index.vnd": {
    source: "iana"
  },
  "application/inkml+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "ink",
      "inkml"
    ]
  },
  "application/iotp": {
    source: "iana"
  },
  "application/ipfix": {
    source: "iana",
    extensions: [
      "ipfix"
    ]
  },
  "application/ipp": {
    source: "iana"
  },
  "application/isup": {
    source: "iana"
  },
  "application/its+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "its"
    ]
  },
  "application/java-archive": {
    source: "apache",
    compressible: !1,
    extensions: [
      "jar",
      "war",
      "ear"
    ]
  },
  "application/java-serialized-object": {
    source: "apache",
    compressible: !1,
    extensions: [
      "ser"
    ]
  },
  "application/java-vm": {
    source: "apache",
    compressible: !1,
    extensions: [
      "class"
    ]
  },
  "application/javascript": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0,
    extensions: [
      "js",
      "mjs"
    ]
  },
  "application/jf2feed+json": {
    source: "iana",
    compressible: !0
  },
  "application/jose": {
    source: "iana"
  },
  "application/jose+json": {
    source: "iana",
    compressible: !0
  },
  "application/jrd+json": {
    source: "iana",
    compressible: !0
  },
  "application/jscalendar+json": {
    source: "iana",
    compressible: !0
  },
  "application/json": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0,
    extensions: [
      "json",
      "map"
    ]
  },
  "application/json-patch+json": {
    source: "iana",
    compressible: !0
  },
  "application/json-seq": {
    source: "iana"
  },
  "application/json5": {
    extensions: [
      "json5"
    ]
  },
  "application/jsonml+json": {
    source: "apache",
    compressible: !0,
    extensions: [
      "jsonml"
    ]
  },
  "application/jwk+json": {
    source: "iana",
    compressible: !0
  },
  "application/jwk-set+json": {
    source: "iana",
    compressible: !0
  },
  "application/jwt": {
    source: "iana"
  },
  "application/kpml-request+xml": {
    source: "iana",
    compressible: !0
  },
  "application/kpml-response+xml": {
    source: "iana",
    compressible: !0
  },
  "application/ld+json": {
    source: "iana",
    compressible: !0,
    extensions: [
      "jsonld"
    ]
  },
  "application/lgr+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "lgr"
    ]
  },
  "application/link-format": {
    source: "iana"
  },
  "application/load-control+xml": {
    source: "iana",
    compressible: !0
  },
  "application/lost+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "lostxml"
    ]
  },
  "application/lostsync+xml": {
    source: "iana",
    compressible: !0
  },
  "application/lpf+zip": {
    source: "iana",
    compressible: !1
  },
  "application/lxf": {
    source: "iana"
  },
  "application/mac-binhex40": {
    source: "iana",
    extensions: [
      "hqx"
    ]
  },
  "application/mac-compactpro": {
    source: "apache",
    extensions: [
      "cpt"
    ]
  },
  "application/macwriteii": {
    source: "iana"
  },
  "application/mads+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "mads"
    ]
  },
  "application/manifest+json": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0,
    extensions: [
      "webmanifest"
    ]
  },
  "application/marc": {
    source: "iana",
    extensions: [
      "mrc"
    ]
  },
  "application/marcxml+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "mrcx"
    ]
  },
  "application/mathematica": {
    source: "iana",
    extensions: [
      "ma",
      "nb",
      "mb"
    ]
  },
  "application/mathml+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "mathml"
    ]
  },
  "application/mathml-content+xml": {
    source: "iana",
    compressible: !0
  },
  "application/mathml-presentation+xml": {
    source: "iana",
    compressible: !0
  },
  "application/mbms-associated-procedure-description+xml": {
    source: "iana",
    compressible: !0
  },
  "application/mbms-deregister+xml": {
    source: "iana",
    compressible: !0
  },
  "application/mbms-envelope+xml": {
    source: "iana",
    compressible: !0
  },
  "application/mbms-msk+xml": {
    source: "iana",
    compressible: !0
  },
  "application/mbms-msk-response+xml": {
    source: "iana",
    compressible: !0
  },
  "application/mbms-protection-description+xml": {
    source: "iana",
    compressible: !0
  },
  "application/mbms-reception-report+xml": {
    source: "iana",
    compressible: !0
  },
  "application/mbms-register+xml": {
    source: "iana",
    compressible: !0
  },
  "application/mbms-register-response+xml": {
    source: "iana",
    compressible: !0
  },
  "application/mbms-schedule+xml": {
    source: "iana",
    compressible: !0
  },
  "application/mbms-user-service-description+xml": {
    source: "iana",
    compressible: !0
  },
  "application/mbox": {
    source: "iana",
    extensions: [
      "mbox"
    ]
  },
  "application/media-policy-dataset+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "mpf"
    ]
  },
  "application/media_control+xml": {
    source: "iana",
    compressible: !0
  },
  "application/mediaservercontrol+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "mscml"
    ]
  },
  "application/merge-patch+json": {
    source: "iana",
    compressible: !0
  },
  "application/metalink+xml": {
    source: "apache",
    compressible: !0,
    extensions: [
      "metalink"
    ]
  },
  "application/metalink4+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "meta4"
    ]
  },
  "application/mets+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "mets"
    ]
  },
  "application/mf4": {
    source: "iana"
  },
  "application/mikey": {
    source: "iana"
  },
  "application/mipc": {
    source: "iana"
  },
  "application/missing-blocks+cbor-seq": {
    source: "iana"
  },
  "application/mmt-aei+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "maei"
    ]
  },
  "application/mmt-usd+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "musd"
    ]
  },
  "application/mods+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "mods"
    ]
  },
  "application/moss-keys": {
    source: "iana"
  },
  "application/moss-signature": {
    source: "iana"
  },
  "application/mosskey-data": {
    source: "iana"
  },
  "application/mosskey-request": {
    source: "iana"
  },
  "application/mp21": {
    source: "iana",
    extensions: [
      "m21",
      "mp21"
    ]
  },
  "application/mp4": {
    source: "iana",
    extensions: [
      "mp4s",
      "m4p"
    ]
  },
  "application/mpeg4-generic": {
    source: "iana"
  },
  "application/mpeg4-iod": {
    source: "iana"
  },
  "application/mpeg4-iod-xmt": {
    source: "iana"
  },
  "application/mrb-consumer+xml": {
    source: "iana",
    compressible: !0
  },
  "application/mrb-publish+xml": {
    source: "iana",
    compressible: !0
  },
  "application/msc-ivr+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0
  },
  "application/msc-mixer+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0
  },
  "application/msword": {
    source: "iana",
    compressible: !1,
    extensions: [
      "doc",
      "dot"
    ]
  },
  "application/mud+json": {
    source: "iana",
    compressible: !0
  },
  "application/multipart-core": {
    source: "iana"
  },
  "application/mxf": {
    source: "iana",
    extensions: [
      "mxf"
    ]
  },
  "application/n-quads": {
    source: "iana",
    extensions: [
      "nq"
    ]
  },
  "application/n-triples": {
    source: "iana",
    extensions: [
      "nt"
    ]
  },
  "application/nasdata": {
    source: "iana"
  },
  "application/news-checkgroups": {
    source: "iana",
    charset: "US-ASCII"
  },
  "application/news-groupinfo": {
    source: "iana",
    charset: "US-ASCII"
  },
  "application/news-transmission": {
    source: "iana"
  },
  "application/nlsml+xml": {
    source: "iana",
    compressible: !0
  },
  "application/node": {
    source: "iana",
    extensions: [
      "cjs"
    ]
  },
  "application/nss": {
    source: "iana"
  },
  "application/oauth-authz-req+jwt": {
    source: "iana"
  },
  "application/oblivious-dns-message": {
    source: "iana"
  },
  "application/ocsp-request": {
    source: "iana"
  },
  "application/ocsp-response": {
    source: "iana"
  },
  "application/octet-stream": {
    source: "iana",
    compressible: !1,
    extensions: [
      "bin",
      "dms",
      "lrf",
      "mar",
      "so",
      "dist",
      "distz",
      "pkg",
      "bpk",
      "dump",
      "elc",
      "deploy",
      "exe",
      "dll",
      "deb",
      "dmg",
      "iso",
      "img",
      "msi",
      "msp",
      "msm",
      "buffer"
    ]
  },
  "application/oda": {
    source: "iana",
    extensions: [
      "oda"
    ]
  },
  "application/odm+xml": {
    source: "iana",
    compressible: !0
  },
  "application/odx": {
    source: "iana"
  },
  "application/oebps-package+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "opf"
    ]
  },
  "application/ogg": {
    source: "iana",
    compressible: !1,
    extensions: [
      "ogx"
    ]
  },
  "application/omdoc+xml": {
    source: "apache",
    compressible: !0,
    extensions: [
      "omdoc"
    ]
  },
  "application/onenote": {
    source: "apache",
    extensions: [
      "onetoc",
      "onetoc2",
      "onetmp",
      "onepkg"
    ]
  },
  "application/opc-nodeset+xml": {
    source: "iana",
    compressible: !0
  },
  "application/oscore": {
    source: "iana"
  },
  "application/oxps": {
    source: "iana",
    extensions: [
      "oxps"
    ]
  },
  "application/p21": {
    source: "iana"
  },
  "application/p21+zip": {
    source: "iana",
    compressible: !1
  },
  "application/p2p-overlay+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "relo"
    ]
  },
  "application/parityfec": {
    source: "iana"
  },
  "application/passport": {
    source: "iana"
  },
  "application/patch-ops-error+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "xer"
    ]
  },
  "application/pdf": {
    source: "iana",
    compressible: !1,
    extensions: [
      "pdf"
    ]
  },
  "application/pdx": {
    source: "iana"
  },
  "application/pem-certificate-chain": {
    source: "iana"
  },
  "application/pgp-encrypted": {
    source: "iana",
    compressible: !1,
    extensions: [
      "pgp"
    ]
  },
  "application/pgp-keys": {
    source: "iana",
    extensions: [
      "asc"
    ]
  },
  "application/pgp-signature": {
    source: "iana",
    extensions: [
      "asc",
      "sig"
    ]
  },
  "application/pics-rules": {
    source: "apache",
    extensions: [
      "prf"
    ]
  },
  "application/pidf+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0
  },
  "application/pidf-diff+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0
  },
  "application/pkcs10": {
    source: "iana",
    extensions: [
      "p10"
    ]
  },
  "application/pkcs12": {
    source: "iana"
  },
  "application/pkcs7-mime": {
    source: "iana",
    extensions: [
      "p7m",
      "p7c"
    ]
  },
  "application/pkcs7-signature": {
    source: "iana",
    extensions: [
      "p7s"
    ]
  },
  "application/pkcs8": {
    source: "iana",
    extensions: [
      "p8"
    ]
  },
  "application/pkcs8-encrypted": {
    source: "iana"
  },
  "application/pkix-attr-cert": {
    source: "iana",
    extensions: [
      "ac"
    ]
  },
  "application/pkix-cert": {
    source: "iana",
    extensions: [
      "cer"
    ]
  },
  "application/pkix-crl": {
    source: "iana",
    extensions: [
      "crl"
    ]
  },
  "application/pkix-pkipath": {
    source: "iana",
    extensions: [
      "pkipath"
    ]
  },
  "application/pkixcmp": {
    source: "iana",
    extensions: [
      "pki"
    ]
  },
  "application/pls+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "pls"
    ]
  },
  "application/poc-settings+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0
  },
  "application/postscript": {
    source: "iana",
    compressible: !0,
    extensions: [
      "ai",
      "eps",
      "ps"
    ]
  },
  "application/ppsp-tracker+json": {
    source: "iana",
    compressible: !0
  },
  "application/problem+json": {
    source: "iana",
    compressible: !0
  },
  "application/problem+xml": {
    source: "iana",
    compressible: !0
  },
  "application/provenance+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "provx"
    ]
  },
  "application/prs.alvestrand.titrax-sheet": {
    source: "iana"
  },
  "application/prs.cww": {
    source: "iana",
    extensions: [
      "cww"
    ]
  },
  "application/prs.cyn": {
    source: "iana",
    charset: "7-BIT"
  },
  "application/prs.hpub+zip": {
    source: "iana",
    compressible: !1
  },
  "application/prs.nprend": {
    source: "iana"
  },
  "application/prs.plucker": {
    source: "iana"
  },
  "application/prs.rdf-xml-crypt": {
    source: "iana"
  },
  "application/prs.xsf+xml": {
    source: "iana",
    compressible: !0
  },
  "application/pskc+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "pskcxml"
    ]
  },
  "application/pvd+json": {
    source: "iana",
    compressible: !0
  },
  "application/qsig": {
    source: "iana"
  },
  "application/raml+yaml": {
    compressible: !0,
    extensions: [
      "raml"
    ]
  },
  "application/raptorfec": {
    source: "iana"
  },
  "application/rdap+json": {
    source: "iana",
    compressible: !0
  },
  "application/rdf+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "rdf",
      "owl"
    ]
  },
  "application/reginfo+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "rif"
    ]
  },
  "application/relax-ng-compact-syntax": {
    source: "iana",
    extensions: [
      "rnc"
    ]
  },
  "application/remote-printing": {
    source: "iana"
  },
  "application/reputon+json": {
    source: "iana",
    compressible: !0
  },
  "application/resource-lists+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "rl"
    ]
  },
  "application/resource-lists-diff+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "rld"
    ]
  },
  "application/rfc+xml": {
    source: "iana",
    compressible: !0
  },
  "application/riscos": {
    source: "iana"
  },
  "application/rlmi+xml": {
    source: "iana",
    compressible: !0
  },
  "application/rls-services+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "rs"
    ]
  },
  "application/route-apd+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "rapd"
    ]
  },
  "application/route-s-tsid+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "sls"
    ]
  },
  "application/route-usd+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "rusd"
    ]
  },
  "application/rpki-ghostbusters": {
    source: "iana",
    extensions: [
      "gbr"
    ]
  },
  "application/rpki-manifest": {
    source: "iana",
    extensions: [
      "mft"
    ]
  },
  "application/rpki-publication": {
    source: "iana"
  },
  "application/rpki-roa": {
    source: "iana",
    extensions: [
      "roa"
    ]
  },
  "application/rpki-updown": {
    source: "iana"
  },
  "application/rsd+xml": {
    source: "apache",
    compressible: !0,
    extensions: [
      "rsd"
    ]
  },
  "application/rss+xml": {
    source: "apache",
    compressible: !0,
    extensions: [
      "rss"
    ]
  },
  "application/rtf": {
    source: "iana",
    compressible: !0,
    extensions: [
      "rtf"
    ]
  },
  "application/rtploopback": {
    source: "iana"
  },
  "application/rtx": {
    source: "iana"
  },
  "application/samlassertion+xml": {
    source: "iana",
    compressible: !0
  },
  "application/samlmetadata+xml": {
    source: "iana",
    compressible: !0
  },
  "application/sarif+json": {
    source: "iana",
    compressible: !0
  },
  "application/sarif-external-properties+json": {
    source: "iana",
    compressible: !0
  },
  "application/sbe": {
    source: "iana"
  },
  "application/sbml+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "sbml"
    ]
  },
  "application/scaip+xml": {
    source: "iana",
    compressible: !0
  },
  "application/scim+json": {
    source: "iana",
    compressible: !0
  },
  "application/scvp-cv-request": {
    source: "iana",
    extensions: [
      "scq"
    ]
  },
  "application/scvp-cv-response": {
    source: "iana",
    extensions: [
      "scs"
    ]
  },
  "application/scvp-vp-request": {
    source: "iana",
    extensions: [
      "spq"
    ]
  },
  "application/scvp-vp-response": {
    source: "iana",
    extensions: [
      "spp"
    ]
  },
  "application/sdp": {
    source: "iana",
    extensions: [
      "sdp"
    ]
  },
  "application/secevent+jwt": {
    source: "iana"
  },
  "application/senml+cbor": {
    source: "iana"
  },
  "application/senml+json": {
    source: "iana",
    compressible: !0
  },
  "application/senml+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "senmlx"
    ]
  },
  "application/senml-etch+cbor": {
    source: "iana"
  },
  "application/senml-etch+json": {
    source: "iana",
    compressible: !0
  },
  "application/senml-exi": {
    source: "iana"
  },
  "application/sensml+cbor": {
    source: "iana"
  },
  "application/sensml+json": {
    source: "iana",
    compressible: !0
  },
  "application/sensml+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "sensmlx"
    ]
  },
  "application/sensml-exi": {
    source: "iana"
  },
  "application/sep+xml": {
    source: "iana",
    compressible: !0
  },
  "application/sep-exi": {
    source: "iana"
  },
  "application/session-info": {
    source: "iana"
  },
  "application/set-payment": {
    source: "iana"
  },
  "application/set-payment-initiation": {
    source: "iana",
    extensions: [
      "setpay"
    ]
  },
  "application/set-registration": {
    source: "iana"
  },
  "application/set-registration-initiation": {
    source: "iana",
    extensions: [
      "setreg"
    ]
  },
  "application/sgml": {
    source: "iana"
  },
  "application/sgml-open-catalog": {
    source: "iana"
  },
  "application/shf+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "shf"
    ]
  },
  "application/sieve": {
    source: "iana",
    extensions: [
      "siv",
      "sieve"
    ]
  },
  "application/simple-filter+xml": {
    source: "iana",
    compressible: !0
  },
  "application/simple-message-summary": {
    source: "iana"
  },
  "application/simplesymbolcontainer": {
    source: "iana"
  },
  "application/sipc": {
    source: "iana"
  },
  "application/slate": {
    source: "iana"
  },
  "application/smil": {
    source: "iana"
  },
  "application/smil+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "smi",
      "smil"
    ]
  },
  "application/smpte336m": {
    source: "iana"
  },
  "application/soap+fastinfoset": {
    source: "iana"
  },
  "application/soap+xml": {
    source: "iana",
    compressible: !0
  },
  "application/sparql-query": {
    source: "iana",
    extensions: [
      "rq"
    ]
  },
  "application/sparql-results+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "srx"
    ]
  },
  "application/spdx+json": {
    source: "iana",
    compressible: !0
  },
  "application/spirits-event+xml": {
    source: "iana",
    compressible: !0
  },
  "application/sql": {
    source: "iana"
  },
  "application/srgs": {
    source: "iana",
    extensions: [
      "gram"
    ]
  },
  "application/srgs+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "grxml"
    ]
  },
  "application/sru+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "sru"
    ]
  },
  "application/ssdl+xml": {
    source: "apache",
    compressible: !0,
    extensions: [
      "ssdl"
    ]
  },
  "application/ssml+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "ssml"
    ]
  },
  "application/stix+json": {
    source: "iana",
    compressible: !0
  },
  "application/swid+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "swidtag"
    ]
  },
  "application/tamp-apex-update": {
    source: "iana"
  },
  "application/tamp-apex-update-confirm": {
    source: "iana"
  },
  "application/tamp-community-update": {
    source: "iana"
  },
  "application/tamp-community-update-confirm": {
    source: "iana"
  },
  "application/tamp-error": {
    source: "iana"
  },
  "application/tamp-sequence-adjust": {
    source: "iana"
  },
  "application/tamp-sequence-adjust-confirm": {
    source: "iana"
  },
  "application/tamp-status-query": {
    source: "iana"
  },
  "application/tamp-status-response": {
    source: "iana"
  },
  "application/tamp-update": {
    source: "iana"
  },
  "application/tamp-update-confirm": {
    source: "iana"
  },
  "application/tar": {
    compressible: !0
  },
  "application/taxii+json": {
    source: "iana",
    compressible: !0
  },
  "application/td+json": {
    source: "iana",
    compressible: !0
  },
  "application/tei+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "tei",
      "teicorpus"
    ]
  },
  "application/tetra_isi": {
    source: "iana"
  },
  "application/thraud+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "tfi"
    ]
  },
  "application/timestamp-query": {
    source: "iana"
  },
  "application/timestamp-reply": {
    source: "iana"
  },
  "application/timestamped-data": {
    source: "iana",
    extensions: [
      "tsd"
    ]
  },
  "application/tlsrpt+gzip": {
    source: "iana"
  },
  "application/tlsrpt+json": {
    source: "iana",
    compressible: !0
  },
  "application/tnauthlist": {
    source: "iana"
  },
  "application/token-introspection+jwt": {
    source: "iana"
  },
  "application/toml": {
    compressible: !0,
    extensions: [
      "toml"
    ]
  },
  "application/trickle-ice-sdpfrag": {
    source: "iana"
  },
  "application/trig": {
    source: "iana",
    extensions: [
      "trig"
    ]
  },
  "application/ttml+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "ttml"
    ]
  },
  "application/tve-trigger": {
    source: "iana"
  },
  "application/tzif": {
    source: "iana"
  },
  "application/tzif-leap": {
    source: "iana"
  },
  "application/ubjson": {
    compressible: !1,
    extensions: [
      "ubj"
    ]
  },
  "application/ulpfec": {
    source: "iana"
  },
  "application/urc-grpsheet+xml": {
    source: "iana",
    compressible: !0
  },
  "application/urc-ressheet+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "rsheet"
    ]
  },
  "application/urc-targetdesc+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "td"
    ]
  },
  "application/urc-uisocketdesc+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vcard+json": {
    source: "iana",
    compressible: !0
  },
  "application/vcard+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vemmi": {
    source: "iana"
  },
  "application/vividence.scriptfile": {
    source: "apache"
  },
  "application/vnd.1000minds.decision-model+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "1km"
    ]
  },
  "application/vnd.3gpp-prose+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp-prose-pc3ch+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp-v2x-local-service-information": {
    source: "iana"
  },
  "application/vnd.3gpp.5gnas": {
    source: "iana"
  },
  "application/vnd.3gpp.access-transfer-events+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.bsf+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.gmop+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.gtpc": {
    source: "iana"
  },
  "application/vnd.3gpp.interworking-data": {
    source: "iana"
  },
  "application/vnd.3gpp.lpp": {
    source: "iana"
  },
  "application/vnd.3gpp.mc-signalling-ear": {
    source: "iana"
  },
  "application/vnd.3gpp.mcdata-affiliation-command+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcdata-info+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcdata-payload": {
    source: "iana"
  },
  "application/vnd.3gpp.mcdata-service-config+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcdata-signalling": {
    source: "iana"
  },
  "application/vnd.3gpp.mcdata-ue-config+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcdata-user-profile+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcptt-affiliation-command+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcptt-floor-request+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcptt-info+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcptt-location-info+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcptt-mbms-usage-info+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcptt-service-config+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcptt-signed+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcptt-ue-config+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcptt-ue-init-config+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcptt-user-profile+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcvideo-affiliation-command+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcvideo-affiliation-info+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcvideo-info+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcvideo-location-info+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcvideo-mbms-usage-info+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcvideo-service-config+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcvideo-transmission-request+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcvideo-ue-config+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mcvideo-user-profile+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.mid-call+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.ngap": {
    source: "iana"
  },
  "application/vnd.3gpp.pfcp": {
    source: "iana"
  },
  "application/vnd.3gpp.pic-bw-large": {
    source: "iana",
    extensions: [
      "plb"
    ]
  },
  "application/vnd.3gpp.pic-bw-small": {
    source: "iana",
    extensions: [
      "psb"
    ]
  },
  "application/vnd.3gpp.pic-bw-var": {
    source: "iana",
    extensions: [
      "pvb"
    ]
  },
  "application/vnd.3gpp.s1ap": {
    source: "iana"
  },
  "application/vnd.3gpp.sms": {
    source: "iana"
  },
  "application/vnd.3gpp.sms+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.srvcc-ext+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.srvcc-info+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.state-and-event-info+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp.ussd+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp2.bcmcsinfo+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.3gpp2.sms": {
    source: "iana"
  },
  "application/vnd.3gpp2.tcap": {
    source: "iana",
    extensions: [
      "tcap"
    ]
  },
  "application/vnd.3lightssoftware.imagescal": {
    source: "iana"
  },
  "application/vnd.3m.post-it-notes": {
    source: "iana",
    extensions: [
      "pwn"
    ]
  },
  "application/vnd.accpac.simply.aso": {
    source: "iana",
    extensions: [
      "aso"
    ]
  },
  "application/vnd.accpac.simply.imp": {
    source: "iana",
    extensions: [
      "imp"
    ]
  },
  "application/vnd.acucobol": {
    source: "iana",
    extensions: [
      "acu"
    ]
  },
  "application/vnd.acucorp": {
    source: "iana",
    extensions: [
      "atc",
      "acutc"
    ]
  },
  "application/vnd.adobe.air-application-installer-package+zip": {
    source: "apache",
    compressible: !1,
    extensions: [
      "air"
    ]
  },
  "application/vnd.adobe.flash.movie": {
    source: "iana"
  },
  "application/vnd.adobe.formscentral.fcdt": {
    source: "iana",
    extensions: [
      "fcdt"
    ]
  },
  "application/vnd.adobe.fxp": {
    source: "iana",
    extensions: [
      "fxp",
      "fxpl"
    ]
  },
  "application/vnd.adobe.partial-upload": {
    source: "iana"
  },
  "application/vnd.adobe.xdp+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "xdp"
    ]
  },
  "application/vnd.adobe.xfdf": {
    source: "iana",
    extensions: [
      "xfdf"
    ]
  },
  "application/vnd.aether.imp": {
    source: "iana"
  },
  "application/vnd.afpc.afplinedata": {
    source: "iana"
  },
  "application/vnd.afpc.afplinedata-pagedef": {
    source: "iana"
  },
  "application/vnd.afpc.cmoca-cmresource": {
    source: "iana"
  },
  "application/vnd.afpc.foca-charset": {
    source: "iana"
  },
  "application/vnd.afpc.foca-codedfont": {
    source: "iana"
  },
  "application/vnd.afpc.foca-codepage": {
    source: "iana"
  },
  "application/vnd.afpc.modca": {
    source: "iana"
  },
  "application/vnd.afpc.modca-cmtable": {
    source: "iana"
  },
  "application/vnd.afpc.modca-formdef": {
    source: "iana"
  },
  "application/vnd.afpc.modca-mediummap": {
    source: "iana"
  },
  "application/vnd.afpc.modca-objectcontainer": {
    source: "iana"
  },
  "application/vnd.afpc.modca-overlay": {
    source: "iana"
  },
  "application/vnd.afpc.modca-pagesegment": {
    source: "iana"
  },
  "application/vnd.age": {
    source: "iana",
    extensions: [
      "age"
    ]
  },
  "application/vnd.ah-barcode": {
    source: "iana"
  },
  "application/vnd.ahead.space": {
    source: "iana",
    extensions: [
      "ahead"
    ]
  },
  "application/vnd.airzip.filesecure.azf": {
    source: "iana",
    extensions: [
      "azf"
    ]
  },
  "application/vnd.airzip.filesecure.azs": {
    source: "iana",
    extensions: [
      "azs"
    ]
  },
  "application/vnd.amadeus+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.amazon.ebook": {
    source: "apache",
    extensions: [
      "azw"
    ]
  },
  "application/vnd.amazon.mobi8-ebook": {
    source: "iana"
  },
  "application/vnd.americandynamics.acc": {
    source: "iana",
    extensions: [
      "acc"
    ]
  },
  "application/vnd.amiga.ami": {
    source: "iana",
    extensions: [
      "ami"
    ]
  },
  "application/vnd.amundsen.maze+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.android.ota": {
    source: "iana"
  },
  "application/vnd.android.package-archive": {
    source: "apache",
    compressible: !1,
    extensions: [
      "apk"
    ]
  },
  "application/vnd.anki": {
    source: "iana"
  },
  "application/vnd.anser-web-certificate-issue-initiation": {
    source: "iana",
    extensions: [
      "cii"
    ]
  },
  "application/vnd.anser-web-funds-transfer-initiation": {
    source: "apache",
    extensions: [
      "fti"
    ]
  },
  "application/vnd.antix.game-component": {
    source: "iana",
    extensions: [
      "atx"
    ]
  },
  "application/vnd.apache.arrow.file": {
    source: "iana"
  },
  "application/vnd.apache.arrow.stream": {
    source: "iana"
  },
  "application/vnd.apache.thrift.binary": {
    source: "iana"
  },
  "application/vnd.apache.thrift.compact": {
    source: "iana"
  },
  "application/vnd.apache.thrift.json": {
    source: "iana"
  },
  "application/vnd.api+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.aplextor.warrp+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.apothekende.reservation+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.apple.installer+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "mpkg"
    ]
  },
  "application/vnd.apple.keynote": {
    source: "iana",
    extensions: [
      "key"
    ]
  },
  "application/vnd.apple.mpegurl": {
    source: "iana",
    extensions: [
      "m3u8"
    ]
  },
  "application/vnd.apple.numbers": {
    source: "iana",
    extensions: [
      "numbers"
    ]
  },
  "application/vnd.apple.pages": {
    source: "iana",
    extensions: [
      "pages"
    ]
  },
  "application/vnd.apple.pkpass": {
    compressible: !1,
    extensions: [
      "pkpass"
    ]
  },
  "application/vnd.arastra.swi": {
    source: "iana"
  },
  "application/vnd.aristanetworks.swi": {
    source: "iana",
    extensions: [
      "swi"
    ]
  },
  "application/vnd.artisan+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.artsquare": {
    source: "iana"
  },
  "application/vnd.astraea-software.iota": {
    source: "iana",
    extensions: [
      "iota"
    ]
  },
  "application/vnd.audiograph": {
    source: "iana",
    extensions: [
      "aep"
    ]
  },
  "application/vnd.autopackage": {
    source: "iana"
  },
  "application/vnd.avalon+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.avistar+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.balsamiq.bmml+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "bmml"
    ]
  },
  "application/vnd.balsamiq.bmpr": {
    source: "iana"
  },
  "application/vnd.banana-accounting": {
    source: "iana"
  },
  "application/vnd.bbf.usp.error": {
    source: "iana"
  },
  "application/vnd.bbf.usp.msg": {
    source: "iana"
  },
  "application/vnd.bbf.usp.msg+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.bekitzur-stech+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.bint.med-content": {
    source: "iana"
  },
  "application/vnd.biopax.rdf+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.blink-idb-value-wrapper": {
    source: "iana"
  },
  "application/vnd.blueice.multipass": {
    source: "iana",
    extensions: [
      "mpm"
    ]
  },
  "application/vnd.bluetooth.ep.oob": {
    source: "iana"
  },
  "application/vnd.bluetooth.le.oob": {
    source: "iana"
  },
  "application/vnd.bmi": {
    source: "iana",
    extensions: [
      "bmi"
    ]
  },
  "application/vnd.bpf": {
    source: "iana"
  },
  "application/vnd.bpf3": {
    source: "iana"
  },
  "application/vnd.businessobjects": {
    source: "iana",
    extensions: [
      "rep"
    ]
  },
  "application/vnd.byu.uapi+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.cab-jscript": {
    source: "iana"
  },
  "application/vnd.canon-cpdl": {
    source: "iana"
  },
  "application/vnd.canon-lips": {
    source: "iana"
  },
  "application/vnd.capasystems-pg+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.cendio.thinlinc.clientconf": {
    source: "iana"
  },
  "application/vnd.century-systems.tcp_stream": {
    source: "iana"
  },
  "application/vnd.chemdraw+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "cdxml"
    ]
  },
  "application/vnd.chess-pgn": {
    source: "iana"
  },
  "application/vnd.chipnuts.karaoke-mmd": {
    source: "iana",
    extensions: [
      "mmd"
    ]
  },
  "application/vnd.ciedi": {
    source: "iana"
  },
  "application/vnd.cinderella": {
    source: "iana",
    extensions: [
      "cdy"
    ]
  },
  "application/vnd.cirpack.isdn-ext": {
    source: "iana"
  },
  "application/vnd.citationstyles.style+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "csl"
    ]
  },
  "application/vnd.claymore": {
    source: "iana",
    extensions: [
      "cla"
    ]
  },
  "application/vnd.cloanto.rp9": {
    source: "iana",
    extensions: [
      "rp9"
    ]
  },
  "application/vnd.clonk.c4group": {
    source: "iana",
    extensions: [
      "c4g",
      "c4d",
      "c4f",
      "c4p",
      "c4u"
    ]
  },
  "application/vnd.cluetrust.cartomobile-config": {
    source: "iana",
    extensions: [
      "c11amc"
    ]
  },
  "application/vnd.cluetrust.cartomobile-config-pkg": {
    source: "iana",
    extensions: [
      "c11amz"
    ]
  },
  "application/vnd.coffeescript": {
    source: "iana"
  },
  "application/vnd.collabio.xodocuments.document": {
    source: "iana"
  },
  "application/vnd.collabio.xodocuments.document-template": {
    source: "iana"
  },
  "application/vnd.collabio.xodocuments.presentation": {
    source: "iana"
  },
  "application/vnd.collabio.xodocuments.presentation-template": {
    source: "iana"
  },
  "application/vnd.collabio.xodocuments.spreadsheet": {
    source: "iana"
  },
  "application/vnd.collabio.xodocuments.spreadsheet-template": {
    source: "iana"
  },
  "application/vnd.collection+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.collection.doc+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.collection.next+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.comicbook+zip": {
    source: "iana",
    compressible: !1
  },
  "application/vnd.comicbook-rar": {
    source: "iana"
  },
  "application/vnd.commerce-battelle": {
    source: "iana"
  },
  "application/vnd.commonspace": {
    source: "iana",
    extensions: [
      "csp"
    ]
  },
  "application/vnd.contact.cmsg": {
    source: "iana",
    extensions: [
      "cdbcmsg"
    ]
  },
  "application/vnd.coreos.ignition+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.cosmocaller": {
    source: "iana",
    extensions: [
      "cmc"
    ]
  },
  "application/vnd.crick.clicker": {
    source: "iana",
    extensions: [
      "clkx"
    ]
  },
  "application/vnd.crick.clicker.keyboard": {
    source: "iana",
    extensions: [
      "clkk"
    ]
  },
  "application/vnd.crick.clicker.palette": {
    source: "iana",
    extensions: [
      "clkp"
    ]
  },
  "application/vnd.crick.clicker.template": {
    source: "iana",
    extensions: [
      "clkt"
    ]
  },
  "application/vnd.crick.clicker.wordbank": {
    source: "iana",
    extensions: [
      "clkw"
    ]
  },
  "application/vnd.criticaltools.wbs+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "wbs"
    ]
  },
  "application/vnd.cryptii.pipe+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.crypto-shade-file": {
    source: "iana"
  },
  "application/vnd.cryptomator.encrypted": {
    source: "iana"
  },
  "application/vnd.cryptomator.vault": {
    source: "iana"
  },
  "application/vnd.ctc-posml": {
    source: "iana",
    extensions: [
      "pml"
    ]
  },
  "application/vnd.ctct.ws+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.cups-pdf": {
    source: "iana"
  },
  "application/vnd.cups-postscript": {
    source: "iana"
  },
  "application/vnd.cups-ppd": {
    source: "iana",
    extensions: [
      "ppd"
    ]
  },
  "application/vnd.cups-raster": {
    source: "iana"
  },
  "application/vnd.cups-raw": {
    source: "iana"
  },
  "application/vnd.curl": {
    source: "iana"
  },
  "application/vnd.curl.car": {
    source: "apache",
    extensions: [
      "car"
    ]
  },
  "application/vnd.curl.pcurl": {
    source: "apache",
    extensions: [
      "pcurl"
    ]
  },
  "application/vnd.cyan.dean.root+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.cybank": {
    source: "iana"
  },
  "application/vnd.cyclonedx+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.cyclonedx+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.d2l.coursepackage1p0+zip": {
    source: "iana",
    compressible: !1
  },
  "application/vnd.d3m-dataset": {
    source: "iana"
  },
  "application/vnd.d3m-problem": {
    source: "iana"
  },
  "application/vnd.dart": {
    source: "iana",
    compressible: !0,
    extensions: [
      "dart"
    ]
  },
  "application/vnd.data-vision.rdz": {
    source: "iana",
    extensions: [
      "rdz"
    ]
  },
  "application/vnd.datapackage+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.dataresource+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.dbf": {
    source: "iana",
    extensions: [
      "dbf"
    ]
  },
  "application/vnd.debian.binary-package": {
    source: "iana"
  },
  "application/vnd.dece.data": {
    source: "iana",
    extensions: [
      "uvf",
      "uvvf",
      "uvd",
      "uvvd"
    ]
  },
  "application/vnd.dece.ttml+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "uvt",
      "uvvt"
    ]
  },
  "application/vnd.dece.unspecified": {
    source: "iana",
    extensions: [
      "uvx",
      "uvvx"
    ]
  },
  "application/vnd.dece.zip": {
    source: "iana",
    extensions: [
      "uvz",
      "uvvz"
    ]
  },
  "application/vnd.denovo.fcselayout-link": {
    source: "iana",
    extensions: [
      "fe_launch"
    ]
  },
  "application/vnd.desmume.movie": {
    source: "iana"
  },
  "application/vnd.dir-bi.plate-dl-nosuffix": {
    source: "iana"
  },
  "application/vnd.dm.delegation+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.dna": {
    source: "iana",
    extensions: [
      "dna"
    ]
  },
  "application/vnd.document+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.dolby.mlp": {
    source: "apache",
    extensions: [
      "mlp"
    ]
  },
  "application/vnd.dolby.mobile.1": {
    source: "iana"
  },
  "application/vnd.dolby.mobile.2": {
    source: "iana"
  },
  "application/vnd.doremir.scorecloud-binary-document": {
    source: "iana"
  },
  "application/vnd.dpgraph": {
    source: "iana",
    extensions: [
      "dpg"
    ]
  },
  "application/vnd.dreamfactory": {
    source: "iana",
    extensions: [
      "dfac"
    ]
  },
  "application/vnd.drive+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.ds-keypoint": {
    source: "apache",
    extensions: [
      "kpxx"
    ]
  },
  "application/vnd.dtg.local": {
    source: "iana"
  },
  "application/vnd.dtg.local.flash": {
    source: "iana"
  },
  "application/vnd.dtg.local.html": {
    source: "iana"
  },
  "application/vnd.dvb.ait": {
    source: "iana",
    extensions: [
      "ait"
    ]
  },
  "application/vnd.dvb.dvbisl+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.dvb.dvbj": {
    source: "iana"
  },
  "application/vnd.dvb.esgcontainer": {
    source: "iana"
  },
  "application/vnd.dvb.ipdcdftnotifaccess": {
    source: "iana"
  },
  "application/vnd.dvb.ipdcesgaccess": {
    source: "iana"
  },
  "application/vnd.dvb.ipdcesgaccess2": {
    source: "iana"
  },
  "application/vnd.dvb.ipdcesgpdd": {
    source: "iana"
  },
  "application/vnd.dvb.ipdcroaming": {
    source: "iana"
  },
  "application/vnd.dvb.iptv.alfec-base": {
    source: "iana"
  },
  "application/vnd.dvb.iptv.alfec-enhancement": {
    source: "iana"
  },
  "application/vnd.dvb.notif-aggregate-root+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.dvb.notif-container+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.dvb.notif-generic+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.dvb.notif-ia-msglist+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.dvb.notif-ia-registration-request+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.dvb.notif-ia-registration-response+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.dvb.notif-init+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.dvb.pfr": {
    source: "iana"
  },
  "application/vnd.dvb.service": {
    source: "iana",
    extensions: [
      "svc"
    ]
  },
  "application/vnd.dxr": {
    source: "iana"
  },
  "application/vnd.dynageo": {
    source: "iana",
    extensions: [
      "geo"
    ]
  },
  "application/vnd.dzr": {
    source: "iana"
  },
  "application/vnd.easykaraoke.cdgdownload": {
    source: "iana"
  },
  "application/vnd.ecdis-update": {
    source: "iana"
  },
  "application/vnd.ecip.rlp": {
    source: "iana"
  },
  "application/vnd.eclipse.ditto+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.ecowin.chart": {
    source: "iana",
    extensions: [
      "mag"
    ]
  },
  "application/vnd.ecowin.filerequest": {
    source: "iana"
  },
  "application/vnd.ecowin.fileupdate": {
    source: "iana"
  },
  "application/vnd.ecowin.series": {
    source: "iana"
  },
  "application/vnd.ecowin.seriesrequest": {
    source: "iana"
  },
  "application/vnd.ecowin.seriesupdate": {
    source: "iana"
  },
  "application/vnd.efi.img": {
    source: "iana"
  },
  "application/vnd.efi.iso": {
    source: "iana"
  },
  "application/vnd.emclient.accessrequest+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.enliven": {
    source: "iana",
    extensions: [
      "nml"
    ]
  },
  "application/vnd.enphase.envoy": {
    source: "iana"
  },
  "application/vnd.eprints.data+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.epson.esf": {
    source: "iana",
    extensions: [
      "esf"
    ]
  },
  "application/vnd.epson.msf": {
    source: "iana",
    extensions: [
      "msf"
    ]
  },
  "application/vnd.epson.quickanime": {
    source: "iana",
    extensions: [
      "qam"
    ]
  },
  "application/vnd.epson.salt": {
    source: "iana",
    extensions: [
      "slt"
    ]
  },
  "application/vnd.epson.ssf": {
    source: "iana",
    extensions: [
      "ssf"
    ]
  },
  "application/vnd.ericsson.quickcall": {
    source: "iana"
  },
  "application/vnd.espass-espass+zip": {
    source: "iana",
    compressible: !1
  },
  "application/vnd.eszigno3+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "es3",
      "et3"
    ]
  },
  "application/vnd.etsi.aoc+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.etsi.asic-e+zip": {
    source: "iana",
    compressible: !1
  },
  "application/vnd.etsi.asic-s+zip": {
    source: "iana",
    compressible: !1
  },
  "application/vnd.etsi.cug+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.etsi.iptvcommand+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.etsi.iptvdiscovery+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.etsi.iptvprofile+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.etsi.iptvsad-bc+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.etsi.iptvsad-cod+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.etsi.iptvsad-npvr+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.etsi.iptvservice+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.etsi.iptvsync+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.etsi.iptvueprofile+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.etsi.mcid+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.etsi.mheg5": {
    source: "iana"
  },
  "application/vnd.etsi.overload-control-policy-dataset+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.etsi.pstn+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.etsi.sci+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.etsi.simservs+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.etsi.timestamp-token": {
    source: "iana"
  },
  "application/vnd.etsi.tsl+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.etsi.tsl.der": {
    source: "iana"
  },
  "application/vnd.eu.kasparian.car+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.eudora.data": {
    source: "iana"
  },
  "application/vnd.evolv.ecig.profile": {
    source: "iana"
  },
  "application/vnd.evolv.ecig.settings": {
    source: "iana"
  },
  "application/vnd.evolv.ecig.theme": {
    source: "iana"
  },
  "application/vnd.exstream-empower+zip": {
    source: "iana",
    compressible: !1
  },
  "application/vnd.exstream-package": {
    source: "iana"
  },
  "application/vnd.ezpix-album": {
    source: "iana",
    extensions: [
      "ez2"
    ]
  },
  "application/vnd.ezpix-package": {
    source: "iana",
    extensions: [
      "ez3"
    ]
  },
  "application/vnd.f-secure.mobile": {
    source: "iana"
  },
  "application/vnd.familysearch.gedcom+zip": {
    source: "iana",
    compressible: !1
  },
  "application/vnd.fastcopy-disk-image": {
    source: "iana"
  },
  "application/vnd.fdf": {
    source: "iana",
    extensions: [
      "fdf"
    ]
  },
  "application/vnd.fdsn.mseed": {
    source: "iana",
    extensions: [
      "mseed"
    ]
  },
  "application/vnd.fdsn.seed": {
    source: "iana",
    extensions: [
      "seed",
      "dataless"
    ]
  },
  "application/vnd.ffsns": {
    source: "iana"
  },
  "application/vnd.ficlab.flb+zip": {
    source: "iana",
    compressible: !1
  },
  "application/vnd.filmit.zfc": {
    source: "iana"
  },
  "application/vnd.fints": {
    source: "iana"
  },
  "application/vnd.firemonkeys.cloudcell": {
    source: "iana"
  },
  "application/vnd.flographit": {
    source: "iana",
    extensions: [
      "gph"
    ]
  },
  "application/vnd.fluxtime.clip": {
    source: "iana",
    extensions: [
      "ftc"
    ]
  },
  "application/vnd.font-fontforge-sfd": {
    source: "iana"
  },
  "application/vnd.framemaker": {
    source: "iana",
    extensions: [
      "fm",
      "frame",
      "maker",
      "book"
    ]
  },
  "application/vnd.frogans.fnc": {
    source: "iana",
    extensions: [
      "fnc"
    ]
  },
  "application/vnd.frogans.ltf": {
    source: "iana",
    extensions: [
      "ltf"
    ]
  },
  "application/vnd.fsc.weblaunch": {
    source: "iana",
    extensions: [
      "fsc"
    ]
  },
  "application/vnd.fujifilm.fb.docuworks": {
    source: "iana"
  },
  "application/vnd.fujifilm.fb.docuworks.binder": {
    source: "iana"
  },
  "application/vnd.fujifilm.fb.docuworks.container": {
    source: "iana"
  },
  "application/vnd.fujifilm.fb.jfi+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.fujitsu.oasys": {
    source: "iana",
    extensions: [
      "oas"
    ]
  },
  "application/vnd.fujitsu.oasys2": {
    source: "iana",
    extensions: [
      "oa2"
    ]
  },
  "application/vnd.fujitsu.oasys3": {
    source: "iana",
    extensions: [
      "oa3"
    ]
  },
  "application/vnd.fujitsu.oasysgp": {
    source: "iana",
    extensions: [
      "fg5"
    ]
  },
  "application/vnd.fujitsu.oasysprs": {
    source: "iana",
    extensions: [
      "bh2"
    ]
  },
  "application/vnd.fujixerox.art-ex": {
    source: "iana"
  },
  "application/vnd.fujixerox.art4": {
    source: "iana"
  },
  "application/vnd.fujixerox.ddd": {
    source: "iana",
    extensions: [
      "ddd"
    ]
  },
  "application/vnd.fujixerox.docuworks": {
    source: "iana",
    extensions: [
      "xdw"
    ]
  },
  "application/vnd.fujixerox.docuworks.binder": {
    source: "iana",
    extensions: [
      "xbd"
    ]
  },
  "application/vnd.fujixerox.docuworks.container": {
    source: "iana"
  },
  "application/vnd.fujixerox.hbpl": {
    source: "iana"
  },
  "application/vnd.fut-misnet": {
    source: "iana"
  },
  "application/vnd.futoin+cbor": {
    source: "iana"
  },
  "application/vnd.futoin+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.fuzzysheet": {
    source: "iana",
    extensions: [
      "fzs"
    ]
  },
  "application/vnd.genomatix.tuxedo": {
    source: "iana",
    extensions: [
      "txd"
    ]
  },
  "application/vnd.gentics.grd+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.geo+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.geocube+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.geogebra.file": {
    source: "iana",
    extensions: [
      "ggb"
    ]
  },
  "application/vnd.geogebra.slides": {
    source: "iana"
  },
  "application/vnd.geogebra.tool": {
    source: "iana",
    extensions: [
      "ggt"
    ]
  },
  "application/vnd.geometry-explorer": {
    source: "iana",
    extensions: [
      "gex",
      "gre"
    ]
  },
  "application/vnd.geonext": {
    source: "iana",
    extensions: [
      "gxt"
    ]
  },
  "application/vnd.geoplan": {
    source: "iana",
    extensions: [
      "g2w"
    ]
  },
  "application/vnd.geospace": {
    source: "iana",
    extensions: [
      "g3w"
    ]
  },
  "application/vnd.gerber": {
    source: "iana"
  },
  "application/vnd.globalplatform.card-content-mgt": {
    source: "iana"
  },
  "application/vnd.globalplatform.card-content-mgt-response": {
    source: "iana"
  },
  "application/vnd.gmx": {
    source: "iana",
    extensions: [
      "gmx"
    ]
  },
  "application/vnd.google-apps.document": {
    compressible: !1,
    extensions: [
      "gdoc"
    ]
  },
  "application/vnd.google-apps.presentation": {
    compressible: !1,
    extensions: [
      "gslides"
    ]
  },
  "application/vnd.google-apps.spreadsheet": {
    compressible: !1,
    extensions: [
      "gsheet"
    ]
  },
  "application/vnd.google-earth.kml+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "kml"
    ]
  },
  "application/vnd.google-earth.kmz": {
    source: "iana",
    compressible: !1,
    extensions: [
      "kmz"
    ]
  },
  "application/vnd.gov.sk.e-form+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.gov.sk.e-form+zip": {
    source: "iana",
    compressible: !1
  },
  "application/vnd.gov.sk.xmldatacontainer+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.grafeq": {
    source: "iana",
    extensions: [
      "gqf",
      "gqs"
    ]
  },
  "application/vnd.gridmp": {
    source: "iana"
  },
  "application/vnd.groove-account": {
    source: "iana",
    extensions: [
      "gac"
    ]
  },
  "application/vnd.groove-help": {
    source: "iana",
    extensions: [
      "ghf"
    ]
  },
  "application/vnd.groove-identity-message": {
    source: "iana",
    extensions: [
      "gim"
    ]
  },
  "application/vnd.groove-injector": {
    source: "iana",
    extensions: [
      "grv"
    ]
  },
  "application/vnd.groove-tool-message": {
    source: "iana",
    extensions: [
      "gtm"
    ]
  },
  "application/vnd.groove-tool-template": {
    source: "iana",
    extensions: [
      "tpl"
    ]
  },
  "application/vnd.groove-vcard": {
    source: "iana",
    extensions: [
      "vcg"
    ]
  },
  "application/vnd.hal+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.hal+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "hal"
    ]
  },
  "application/vnd.handheld-entertainment+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "zmm"
    ]
  },
  "application/vnd.hbci": {
    source: "iana",
    extensions: [
      "hbci"
    ]
  },
  "application/vnd.hc+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.hcl-bireports": {
    source: "iana"
  },
  "application/vnd.hdt": {
    source: "iana"
  },
  "application/vnd.heroku+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.hhe.lesson-player": {
    source: "iana",
    extensions: [
      "les"
    ]
  },
  "application/vnd.hl7cda+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0
  },
  "application/vnd.hl7v2+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0
  },
  "application/vnd.hp-hpgl": {
    source: "iana",
    extensions: [
      "hpgl"
    ]
  },
  "application/vnd.hp-hpid": {
    source: "iana",
    extensions: [
      "hpid"
    ]
  },
  "application/vnd.hp-hps": {
    source: "iana",
    extensions: [
      "hps"
    ]
  },
  "application/vnd.hp-jlyt": {
    source: "iana",
    extensions: [
      "jlt"
    ]
  },
  "application/vnd.hp-pcl": {
    source: "iana",
    extensions: [
      "pcl"
    ]
  },
  "application/vnd.hp-pclxl": {
    source: "iana",
    extensions: [
      "pclxl"
    ]
  },
  "application/vnd.httphone": {
    source: "iana"
  },
  "application/vnd.hydrostatix.sof-data": {
    source: "iana",
    extensions: [
      "sfd-hdstx"
    ]
  },
  "application/vnd.hyper+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.hyper-item+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.hyperdrive+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.hzn-3d-crossword": {
    source: "iana"
  },
  "application/vnd.ibm.afplinedata": {
    source: "iana"
  },
  "application/vnd.ibm.electronic-media": {
    source: "iana"
  },
  "application/vnd.ibm.minipay": {
    source: "iana",
    extensions: [
      "mpy"
    ]
  },
  "application/vnd.ibm.modcap": {
    source: "iana",
    extensions: [
      "afp",
      "listafp",
      "list3820"
    ]
  },
  "application/vnd.ibm.rights-management": {
    source: "iana",
    extensions: [
      "irm"
    ]
  },
  "application/vnd.ibm.secure-container": {
    source: "iana",
    extensions: [
      "sc"
    ]
  },
  "application/vnd.iccprofile": {
    source: "iana",
    extensions: [
      "icc",
      "icm"
    ]
  },
  "application/vnd.ieee.1905": {
    source: "iana"
  },
  "application/vnd.igloader": {
    source: "iana",
    extensions: [
      "igl"
    ]
  },
  "application/vnd.imagemeter.folder+zip": {
    source: "iana",
    compressible: !1
  },
  "application/vnd.imagemeter.image+zip": {
    source: "iana",
    compressible: !1
  },
  "application/vnd.immervision-ivp": {
    source: "iana",
    extensions: [
      "ivp"
    ]
  },
  "application/vnd.immervision-ivu": {
    source: "iana",
    extensions: [
      "ivu"
    ]
  },
  "application/vnd.ims.imsccv1p1": {
    source: "iana"
  },
  "application/vnd.ims.imsccv1p2": {
    source: "iana"
  },
  "application/vnd.ims.imsccv1p3": {
    source: "iana"
  },
  "application/vnd.ims.lis.v2.result+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.ims.lti.v2.toolconsumerprofile+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.ims.lti.v2.toolproxy+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.ims.lti.v2.toolproxy.id+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.ims.lti.v2.toolsettings+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.ims.lti.v2.toolsettings.simple+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.informedcontrol.rms+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.informix-visionary": {
    source: "iana"
  },
  "application/vnd.infotech.project": {
    source: "iana"
  },
  "application/vnd.infotech.project+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.innopath.wamp.notification": {
    source: "iana"
  },
  "application/vnd.insors.igm": {
    source: "iana",
    extensions: [
      "igm"
    ]
  },
  "application/vnd.intercon.formnet": {
    source: "iana",
    extensions: [
      "xpw",
      "xpx"
    ]
  },
  "application/vnd.intergeo": {
    source: "iana",
    extensions: [
      "i2g"
    ]
  },
  "application/vnd.intertrust.digibox": {
    source: "iana"
  },
  "application/vnd.intertrust.nncp": {
    source: "iana"
  },
  "application/vnd.intu.qbo": {
    source: "iana",
    extensions: [
      "qbo"
    ]
  },
  "application/vnd.intu.qfx": {
    source: "iana",
    extensions: [
      "qfx"
    ]
  },
  "application/vnd.iptc.g2.catalogitem+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.iptc.g2.conceptitem+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.iptc.g2.knowledgeitem+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.iptc.g2.newsitem+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.iptc.g2.newsmessage+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.iptc.g2.packageitem+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.iptc.g2.planningitem+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.ipunplugged.rcprofile": {
    source: "iana",
    extensions: [
      "rcprofile"
    ]
  },
  "application/vnd.irepository.package+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "irp"
    ]
  },
  "application/vnd.is-xpr": {
    source: "iana",
    extensions: [
      "xpr"
    ]
  },
  "application/vnd.isac.fcs": {
    source: "iana",
    extensions: [
      "fcs"
    ]
  },
  "application/vnd.iso11783-10+zip": {
    source: "iana",
    compressible: !1
  },
  "application/vnd.jam": {
    source: "iana",
    extensions: [
      "jam"
    ]
  },
  "application/vnd.japannet-directory-service": {
    source: "iana"
  },
  "application/vnd.japannet-jpnstore-wakeup": {
    source: "iana"
  },
  "application/vnd.japannet-payment-wakeup": {
    source: "iana"
  },
  "application/vnd.japannet-registration": {
    source: "iana"
  },
  "application/vnd.japannet-registration-wakeup": {
    source: "iana"
  },
  "application/vnd.japannet-setstore-wakeup": {
    source: "iana"
  },
  "application/vnd.japannet-verification": {
    source: "iana"
  },
  "application/vnd.japannet-verification-wakeup": {
    source: "iana"
  },
  "application/vnd.jcp.javame.midlet-rms": {
    source: "iana",
    extensions: [
      "rms"
    ]
  },
  "application/vnd.jisp": {
    source: "iana",
    extensions: [
      "jisp"
    ]
  },
  "application/vnd.joost.joda-archive": {
    source: "iana",
    extensions: [
      "joda"
    ]
  },
  "application/vnd.jsk.isdn-ngn": {
    source: "iana"
  },
  "application/vnd.kahootz": {
    source: "iana",
    extensions: [
      "ktz",
      "ktr"
    ]
  },
  "application/vnd.kde.karbon": {
    source: "iana",
    extensions: [
      "karbon"
    ]
  },
  "application/vnd.kde.kchart": {
    source: "iana",
    extensions: [
      "chrt"
    ]
  },
  "application/vnd.kde.kformula": {
    source: "iana",
    extensions: [
      "kfo"
    ]
  },
  "application/vnd.kde.kivio": {
    source: "iana",
    extensions: [
      "flw"
    ]
  },
  "application/vnd.kde.kontour": {
    source: "iana",
    extensions: [
      "kon"
    ]
  },
  "application/vnd.kde.kpresenter": {
    source: "iana",
    extensions: [
      "kpr",
      "kpt"
    ]
  },
  "application/vnd.kde.kspread": {
    source: "iana",
    extensions: [
      "ksp"
    ]
  },
  "application/vnd.kde.kword": {
    source: "iana",
    extensions: [
      "kwd",
      "kwt"
    ]
  },
  "application/vnd.kenameaapp": {
    source: "iana",
    extensions: [
      "htke"
    ]
  },
  "application/vnd.kidspiration": {
    source: "iana",
    extensions: [
      "kia"
    ]
  },
  "application/vnd.kinar": {
    source: "iana",
    extensions: [
      "kne",
      "knp"
    ]
  },
  "application/vnd.koan": {
    source: "iana",
    extensions: [
      "skp",
      "skd",
      "skt",
      "skm"
    ]
  },
  "application/vnd.kodak-descriptor": {
    source: "iana",
    extensions: [
      "sse"
    ]
  },
  "application/vnd.las": {
    source: "iana"
  },
  "application/vnd.las.las+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.las.las+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "lasxml"
    ]
  },
  "application/vnd.laszip": {
    source: "iana"
  },
  "application/vnd.leap+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.liberty-request+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.llamagraphics.life-balance.desktop": {
    source: "iana",
    extensions: [
      "lbd"
    ]
  },
  "application/vnd.llamagraphics.life-balance.exchange+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "lbe"
    ]
  },
  "application/vnd.logipipe.circuit+zip": {
    source: "iana",
    compressible: !1
  },
  "application/vnd.loom": {
    source: "iana"
  },
  "application/vnd.lotus-1-2-3": {
    source: "iana",
    extensions: [
      "123"
    ]
  },
  "application/vnd.lotus-approach": {
    source: "iana",
    extensions: [
      "apr"
    ]
  },
  "application/vnd.lotus-freelance": {
    source: "iana",
    extensions: [
      "pre"
    ]
  },
  "application/vnd.lotus-notes": {
    source: "iana",
    extensions: [
      "nsf"
    ]
  },
  "application/vnd.lotus-organizer": {
    source: "iana",
    extensions: [
      "org"
    ]
  },
  "application/vnd.lotus-screencam": {
    source: "iana",
    extensions: [
      "scm"
    ]
  },
  "application/vnd.lotus-wordpro": {
    source: "iana",
    extensions: [
      "lwp"
    ]
  },
  "application/vnd.macports.portpkg": {
    source: "iana",
    extensions: [
      "portpkg"
    ]
  },
  "application/vnd.mapbox-vector-tile": {
    source: "iana",
    extensions: [
      "mvt"
    ]
  },
  "application/vnd.marlin.drm.actiontoken+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.marlin.drm.conftoken+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.marlin.drm.license+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.marlin.drm.mdcf": {
    source: "iana"
  },
  "application/vnd.mason+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.maxar.archive.3tz+zip": {
    source: "iana",
    compressible: !1
  },
  "application/vnd.maxmind.maxmind-db": {
    source: "iana"
  },
  "application/vnd.mcd": {
    source: "iana",
    extensions: [
      "mcd"
    ]
  },
  "application/vnd.medcalcdata": {
    source: "iana",
    extensions: [
      "mc1"
    ]
  },
  "application/vnd.mediastation.cdkey": {
    source: "iana",
    extensions: [
      "cdkey"
    ]
  },
  "application/vnd.meridian-slingshot": {
    source: "iana"
  },
  "application/vnd.mfer": {
    source: "iana",
    extensions: [
      "mwf"
    ]
  },
  "application/vnd.mfmp": {
    source: "iana",
    extensions: [
      "mfm"
    ]
  },
  "application/vnd.micro+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.micrografx.flo": {
    source: "iana",
    extensions: [
      "flo"
    ]
  },
  "application/vnd.micrografx.igx": {
    source: "iana",
    extensions: [
      "igx"
    ]
  },
  "application/vnd.microsoft.portable-executable": {
    source: "iana"
  },
  "application/vnd.microsoft.windows.thumbnail-cache": {
    source: "iana"
  },
  "application/vnd.miele+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.mif": {
    source: "iana",
    extensions: [
      "mif"
    ]
  },
  "application/vnd.minisoft-hp3000-save": {
    source: "iana"
  },
  "application/vnd.mitsubishi.misty-guard.trustweb": {
    source: "iana"
  },
  "application/vnd.mobius.daf": {
    source: "iana",
    extensions: [
      "daf"
    ]
  },
  "application/vnd.mobius.dis": {
    source: "iana",
    extensions: [
      "dis"
    ]
  },
  "application/vnd.mobius.mbk": {
    source: "iana",
    extensions: [
      "mbk"
    ]
  },
  "application/vnd.mobius.mqy": {
    source: "iana",
    extensions: [
      "mqy"
    ]
  },
  "application/vnd.mobius.msl": {
    source: "iana",
    extensions: [
      "msl"
    ]
  },
  "application/vnd.mobius.plc": {
    source: "iana",
    extensions: [
      "plc"
    ]
  },
  "application/vnd.mobius.txf": {
    source: "iana",
    extensions: [
      "txf"
    ]
  },
  "application/vnd.mophun.application": {
    source: "iana",
    extensions: [
      "mpn"
    ]
  },
  "application/vnd.mophun.certificate": {
    source: "iana",
    extensions: [
      "mpc"
    ]
  },
  "application/vnd.motorola.flexsuite": {
    source: "iana"
  },
  "application/vnd.motorola.flexsuite.adsi": {
    source: "iana"
  },
  "application/vnd.motorola.flexsuite.fis": {
    source: "iana"
  },
  "application/vnd.motorola.flexsuite.gotap": {
    source: "iana"
  },
  "application/vnd.motorola.flexsuite.kmr": {
    source: "iana"
  },
  "application/vnd.motorola.flexsuite.ttc": {
    source: "iana"
  },
  "application/vnd.motorola.flexsuite.wem": {
    source: "iana"
  },
  "application/vnd.motorola.iprm": {
    source: "iana"
  },
  "application/vnd.mozilla.xul+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "xul"
    ]
  },
  "application/vnd.ms-3mfdocument": {
    source: "iana"
  },
  "application/vnd.ms-artgalry": {
    source: "iana",
    extensions: [
      "cil"
    ]
  },
  "application/vnd.ms-asf": {
    source: "iana"
  },
  "application/vnd.ms-cab-compressed": {
    source: "iana",
    extensions: [
      "cab"
    ]
  },
  "application/vnd.ms-color.iccprofile": {
    source: "apache"
  },
  "application/vnd.ms-excel": {
    source: "iana",
    compressible: !1,
    extensions: [
      "xls",
      "xlm",
      "xla",
      "xlc",
      "xlt",
      "xlw"
    ]
  },
  "application/vnd.ms-excel.addin.macroenabled.12": {
    source: "iana",
    extensions: [
      "xlam"
    ]
  },
  "application/vnd.ms-excel.sheet.binary.macroenabled.12": {
    source: "iana",
    extensions: [
      "xlsb"
    ]
  },
  "application/vnd.ms-excel.sheet.macroenabled.12": {
    source: "iana",
    extensions: [
      "xlsm"
    ]
  },
  "application/vnd.ms-excel.template.macroenabled.12": {
    source: "iana",
    extensions: [
      "xltm"
    ]
  },
  "application/vnd.ms-fontobject": {
    source: "iana",
    compressible: !0,
    extensions: [
      "eot"
    ]
  },
  "application/vnd.ms-htmlhelp": {
    source: "iana",
    extensions: [
      "chm"
    ]
  },
  "application/vnd.ms-ims": {
    source: "iana",
    extensions: [
      "ims"
    ]
  },
  "application/vnd.ms-lrm": {
    source: "iana",
    extensions: [
      "lrm"
    ]
  },
  "application/vnd.ms-office.activex+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.ms-officetheme": {
    source: "iana",
    extensions: [
      "thmx"
    ]
  },
  "application/vnd.ms-opentype": {
    source: "apache",
    compressible: !0
  },
  "application/vnd.ms-outlook": {
    compressible: !1,
    extensions: [
      "msg"
    ]
  },
  "application/vnd.ms-package.obfuscated-opentype": {
    source: "apache"
  },
  "application/vnd.ms-pki.seccat": {
    source: "apache",
    extensions: [
      "cat"
    ]
  },
  "application/vnd.ms-pki.stl": {
    source: "apache",
    extensions: [
      "stl"
    ]
  },
  "application/vnd.ms-playready.initiator+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.ms-powerpoint": {
    source: "iana",
    compressible: !1,
    extensions: [
      "ppt",
      "pps",
      "pot"
    ]
  },
  "application/vnd.ms-powerpoint.addin.macroenabled.12": {
    source: "iana",
    extensions: [
      "ppam"
    ]
  },
  "application/vnd.ms-powerpoint.presentation.macroenabled.12": {
    source: "iana",
    extensions: [
      "pptm"
    ]
  },
  "application/vnd.ms-powerpoint.slide.macroenabled.12": {
    source: "iana",
    extensions: [
      "sldm"
    ]
  },
  "application/vnd.ms-powerpoint.slideshow.macroenabled.12": {
    source: "iana",
    extensions: [
      "ppsm"
    ]
  },
  "application/vnd.ms-powerpoint.template.macroenabled.12": {
    source: "iana",
    extensions: [
      "potm"
    ]
  },
  "application/vnd.ms-printdevicecapabilities+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.ms-printing.printticket+xml": {
    source: "apache",
    compressible: !0
  },
  "application/vnd.ms-printschematicket+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.ms-project": {
    source: "iana",
    extensions: [
      "mpp",
      "mpt"
    ]
  },
  "application/vnd.ms-tnef": {
    source: "iana"
  },
  "application/vnd.ms-windows.devicepairing": {
    source: "iana"
  },
  "application/vnd.ms-windows.nwprinting.oob": {
    source: "iana"
  },
  "application/vnd.ms-windows.printerpairing": {
    source: "iana"
  },
  "application/vnd.ms-windows.wsd.oob": {
    source: "iana"
  },
  "application/vnd.ms-wmdrm.lic-chlg-req": {
    source: "iana"
  },
  "application/vnd.ms-wmdrm.lic-resp": {
    source: "iana"
  },
  "application/vnd.ms-wmdrm.meter-chlg-req": {
    source: "iana"
  },
  "application/vnd.ms-wmdrm.meter-resp": {
    source: "iana"
  },
  "application/vnd.ms-word.document.macroenabled.12": {
    source: "iana",
    extensions: [
      "docm"
    ]
  },
  "application/vnd.ms-word.template.macroenabled.12": {
    source: "iana",
    extensions: [
      "dotm"
    ]
  },
  "application/vnd.ms-works": {
    source: "iana",
    extensions: [
      "wps",
      "wks",
      "wcm",
      "wdb"
    ]
  },
  "application/vnd.ms-wpl": {
    source: "iana",
    extensions: [
      "wpl"
    ]
  },
  "application/vnd.ms-xpsdocument": {
    source: "iana",
    compressible: !1,
    extensions: [
      "xps"
    ]
  },
  "application/vnd.msa-disk-image": {
    source: "iana"
  },
  "application/vnd.mseq": {
    source: "iana",
    extensions: [
      "mseq"
    ]
  },
  "application/vnd.msign": {
    source: "iana"
  },
  "application/vnd.multiad.creator": {
    source: "iana"
  },
  "application/vnd.multiad.creator.cif": {
    source: "iana"
  },
  "application/vnd.music-niff": {
    source: "iana"
  },
  "application/vnd.musician": {
    source: "iana",
    extensions: [
      "mus"
    ]
  },
  "application/vnd.muvee.style": {
    source: "iana",
    extensions: [
      "msty"
    ]
  },
  "application/vnd.mynfc": {
    source: "iana",
    extensions: [
      "taglet"
    ]
  },
  "application/vnd.nacamar.ybrid+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.ncd.control": {
    source: "iana"
  },
  "application/vnd.ncd.reference": {
    source: "iana"
  },
  "application/vnd.nearst.inv+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.nebumind.line": {
    source: "iana"
  },
  "application/vnd.nervana": {
    source: "iana"
  },
  "application/vnd.netfpx": {
    source: "iana"
  },
  "application/vnd.neurolanguage.nlu": {
    source: "iana",
    extensions: [
      "nlu"
    ]
  },
  "application/vnd.nimn": {
    source: "iana"
  },
  "application/vnd.nintendo.nitro.rom": {
    source: "iana"
  },
  "application/vnd.nintendo.snes.rom": {
    source: "iana"
  },
  "application/vnd.nitf": {
    source: "iana",
    extensions: [
      "ntf",
      "nitf"
    ]
  },
  "application/vnd.noblenet-directory": {
    source: "iana",
    extensions: [
      "nnd"
    ]
  },
  "application/vnd.noblenet-sealer": {
    source: "iana",
    extensions: [
      "nns"
    ]
  },
  "application/vnd.noblenet-web": {
    source: "iana",
    extensions: [
      "nnw"
    ]
  },
  "application/vnd.nokia.catalogs": {
    source: "iana"
  },
  "application/vnd.nokia.conml+wbxml": {
    source: "iana"
  },
  "application/vnd.nokia.conml+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.nokia.iptv.config+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.nokia.isds-radio-presets": {
    source: "iana"
  },
  "application/vnd.nokia.landmark+wbxml": {
    source: "iana"
  },
  "application/vnd.nokia.landmark+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.nokia.landmarkcollection+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.nokia.n-gage.ac+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "ac"
    ]
  },
  "application/vnd.nokia.n-gage.data": {
    source: "iana",
    extensions: [
      "ngdat"
    ]
  },
  "application/vnd.nokia.n-gage.symbian.install": {
    source: "iana",
    extensions: [
      "n-gage"
    ]
  },
  "application/vnd.nokia.ncd": {
    source: "iana"
  },
  "application/vnd.nokia.pcd+wbxml": {
    source: "iana"
  },
  "application/vnd.nokia.pcd+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.nokia.radio-preset": {
    source: "iana",
    extensions: [
      "rpst"
    ]
  },
  "application/vnd.nokia.radio-presets": {
    source: "iana",
    extensions: [
      "rpss"
    ]
  },
  "application/vnd.novadigm.edm": {
    source: "iana",
    extensions: [
      "edm"
    ]
  },
  "application/vnd.novadigm.edx": {
    source: "iana",
    extensions: [
      "edx"
    ]
  },
  "application/vnd.novadigm.ext": {
    source: "iana",
    extensions: [
      "ext"
    ]
  },
  "application/vnd.ntt-local.content-share": {
    source: "iana"
  },
  "application/vnd.ntt-local.file-transfer": {
    source: "iana"
  },
  "application/vnd.ntt-local.ogw_remote-access": {
    source: "iana"
  },
  "application/vnd.ntt-local.sip-ta_remote": {
    source: "iana"
  },
  "application/vnd.ntt-local.sip-ta_tcp_stream": {
    source: "iana"
  },
  "application/vnd.oasis.opendocument.chart": {
    source: "iana",
    extensions: [
      "odc"
    ]
  },
  "application/vnd.oasis.opendocument.chart-template": {
    source: "iana",
    extensions: [
      "otc"
    ]
  },
  "application/vnd.oasis.opendocument.database": {
    source: "iana",
    extensions: [
      "odb"
    ]
  },
  "application/vnd.oasis.opendocument.formula": {
    source: "iana",
    extensions: [
      "odf"
    ]
  },
  "application/vnd.oasis.opendocument.formula-template": {
    source: "iana",
    extensions: [
      "odft"
    ]
  },
  "application/vnd.oasis.opendocument.graphics": {
    source: "iana",
    compressible: !1,
    extensions: [
      "odg"
    ]
  },
  "application/vnd.oasis.opendocument.graphics-template": {
    source: "iana",
    extensions: [
      "otg"
    ]
  },
  "application/vnd.oasis.opendocument.image": {
    source: "iana",
    extensions: [
      "odi"
    ]
  },
  "application/vnd.oasis.opendocument.image-template": {
    source: "iana",
    extensions: [
      "oti"
    ]
  },
  "application/vnd.oasis.opendocument.presentation": {
    source: "iana",
    compressible: !1,
    extensions: [
      "odp"
    ]
  },
  "application/vnd.oasis.opendocument.presentation-template": {
    source: "iana",
    extensions: [
      "otp"
    ]
  },
  "application/vnd.oasis.opendocument.spreadsheet": {
    source: "iana",
    compressible: !1,
    extensions: [
      "ods"
    ]
  },
  "application/vnd.oasis.opendocument.spreadsheet-template": {
    source: "iana",
    extensions: [
      "ots"
    ]
  },
  "application/vnd.oasis.opendocument.text": {
    source: "iana",
    compressible: !1,
    extensions: [
      "odt"
    ]
  },
  "application/vnd.oasis.opendocument.text-master": {
    source: "iana",
    extensions: [
      "odm"
    ]
  },
  "application/vnd.oasis.opendocument.text-template": {
    source: "iana",
    extensions: [
      "ott"
    ]
  },
  "application/vnd.oasis.opendocument.text-web": {
    source: "iana",
    extensions: [
      "oth"
    ]
  },
  "application/vnd.obn": {
    source: "iana"
  },
  "application/vnd.ocf+cbor": {
    source: "iana"
  },
  "application/vnd.oci.image.manifest.v1+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oftn.l10n+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oipf.contentaccessdownload+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oipf.contentaccessstreaming+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oipf.cspg-hexbinary": {
    source: "iana"
  },
  "application/vnd.oipf.dae.svg+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oipf.dae.xhtml+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oipf.mippvcontrolmessage+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oipf.pae.gem": {
    source: "iana"
  },
  "application/vnd.oipf.spdiscovery+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oipf.spdlist+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oipf.ueprofile+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oipf.userprofile+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.olpc-sugar": {
    source: "iana",
    extensions: [
      "xo"
    ]
  },
  "application/vnd.oma-scws-config": {
    source: "iana"
  },
  "application/vnd.oma-scws-http-request": {
    source: "iana"
  },
  "application/vnd.oma-scws-http-response": {
    source: "iana"
  },
  "application/vnd.oma.bcast.associated-procedure-parameter+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.bcast.drm-trigger+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.bcast.imd+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.bcast.ltkm": {
    source: "iana"
  },
  "application/vnd.oma.bcast.notification+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.bcast.provisioningtrigger": {
    source: "iana"
  },
  "application/vnd.oma.bcast.sgboot": {
    source: "iana"
  },
  "application/vnd.oma.bcast.sgdd+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.bcast.sgdu": {
    source: "iana"
  },
  "application/vnd.oma.bcast.simple-symbol-container": {
    source: "iana"
  },
  "application/vnd.oma.bcast.smartcard-trigger+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.bcast.sprov+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.bcast.stkm": {
    source: "iana"
  },
  "application/vnd.oma.cab-address-book+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.cab-feature-handler+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.cab-pcc+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.cab-subs-invite+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.cab-user-prefs+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.dcd": {
    source: "iana"
  },
  "application/vnd.oma.dcdc": {
    source: "iana"
  },
  "application/vnd.oma.dd2+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "dd2"
    ]
  },
  "application/vnd.oma.drm.risd+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.group-usage-list+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.lwm2m+cbor": {
    source: "iana"
  },
  "application/vnd.oma.lwm2m+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.lwm2m+tlv": {
    source: "iana"
  },
  "application/vnd.oma.pal+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.poc.detailed-progress-report+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.poc.final-report+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.poc.groups+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.poc.invocation-descriptor+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.poc.optimized-progress-report+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.push": {
    source: "iana"
  },
  "application/vnd.oma.scidm.messages+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oma.xcap-directory+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.omads-email+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0
  },
  "application/vnd.omads-file+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0
  },
  "application/vnd.omads-folder+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0
  },
  "application/vnd.omaloc-supl-init": {
    source: "iana"
  },
  "application/vnd.onepager": {
    source: "iana"
  },
  "application/vnd.onepagertamp": {
    source: "iana"
  },
  "application/vnd.onepagertamx": {
    source: "iana"
  },
  "application/vnd.onepagertat": {
    source: "iana"
  },
  "application/vnd.onepagertatp": {
    source: "iana"
  },
  "application/vnd.onepagertatx": {
    source: "iana"
  },
  "application/vnd.openblox.game+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "obgx"
    ]
  },
  "application/vnd.openblox.game-binary": {
    source: "iana"
  },
  "application/vnd.openeye.oeb": {
    source: "iana"
  },
  "application/vnd.openofficeorg.extension": {
    source: "apache",
    extensions: [
      "oxt"
    ]
  },
  "application/vnd.openstreetmap.data+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "osm"
    ]
  },
  "application/vnd.opentimestamps.ots": {
    source: "iana"
  },
  "application/vnd.openxmlformats-officedocument.custom-properties+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.customxmlproperties+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.drawing+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.drawingml.chart+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.drawingml.chartshapes+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.drawingml.diagramcolors+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.drawingml.diagramdata+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.drawingml.diagramlayout+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.drawingml.diagramstyle+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.extended-properties+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.presentationml.commentauthors+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.presentationml.comments+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.presentationml.handoutmaster+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.presentationml.notesmaster+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.presentationml.notesslide+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.presentationml.presentation": {
    source: "iana",
    compressible: !1,
    extensions: [
      "pptx"
    ]
  },
  "application/vnd.openxmlformats-officedocument.presentationml.presentation.main+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.presentationml.presprops+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.presentationml.slide": {
    source: "iana",
    extensions: [
      "sldx"
    ]
  },
  "application/vnd.openxmlformats-officedocument.presentationml.slide+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.presentationml.slidelayout+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.presentationml.slidemaster+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.presentationml.slideshow": {
    source: "iana",
    extensions: [
      "ppsx"
    ]
  },
  "application/vnd.openxmlformats-officedocument.presentationml.slideshow.main+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.presentationml.slideupdateinfo+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.presentationml.tablestyles+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.presentationml.tags+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.presentationml.template": {
    source: "iana",
    extensions: [
      "potx"
    ]
  },
  "application/vnd.openxmlformats-officedocument.presentationml.template.main+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.presentationml.viewprops+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.calcchain+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.chartsheet+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.comments+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.connections+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.dialogsheet+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.externallink+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.pivotcachedefinition+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.pivotcacherecords+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.pivottable+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.querytable+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.revisionheaders+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.revisionlog+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sharedstrings+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": {
    source: "iana",
    compressible: !1,
    extensions: [
      "xlsx"
    ]
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheetmetadata+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.table+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.tablesinglecells+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.template": {
    source: "iana",
    extensions: [
      "xltx"
    ]
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.template.main+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.usernames+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.volatiledependencies+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.theme+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.themeoverride+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.vmldrawing": {
    source: "iana"
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.comments+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": {
    source: "iana",
    compressible: !1,
    extensions: [
      "docx"
    ]
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document.glossary+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.endnotes+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.fonttable+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.footer+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.footnotes+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.numbering+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.settings+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.template": {
    source: "iana",
    extensions: [
      "dotx"
    ]
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.template.main+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-officedocument.wordprocessingml.websettings+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-package.core-properties+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-package.digital-signature-xmlsignature+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.openxmlformats-package.relationships+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oracle.resource+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.orange.indata": {
    source: "iana"
  },
  "application/vnd.osa.netdeploy": {
    source: "iana"
  },
  "application/vnd.osgeo.mapguide.package": {
    source: "iana",
    extensions: [
      "mgp"
    ]
  },
  "application/vnd.osgi.bundle": {
    source: "iana"
  },
  "application/vnd.osgi.dp": {
    source: "iana",
    extensions: [
      "dp"
    ]
  },
  "application/vnd.osgi.subsystem": {
    source: "iana",
    extensions: [
      "esa"
    ]
  },
  "application/vnd.otps.ct-kip+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.oxli.countgraph": {
    source: "iana"
  },
  "application/vnd.pagerduty+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.palm": {
    source: "iana",
    extensions: [
      "pdb",
      "pqa",
      "oprc"
    ]
  },
  "application/vnd.panoply": {
    source: "iana"
  },
  "application/vnd.paos.xml": {
    source: "iana"
  },
  "application/vnd.patentdive": {
    source: "iana"
  },
  "application/vnd.patientecommsdoc": {
    source: "iana"
  },
  "application/vnd.pawaafile": {
    source: "iana",
    extensions: [
      "paw"
    ]
  },
  "application/vnd.pcos": {
    source: "iana"
  },
  "application/vnd.pg.format": {
    source: "iana",
    extensions: [
      "str"
    ]
  },
  "application/vnd.pg.osasli": {
    source: "iana",
    extensions: [
      "ei6"
    ]
  },
  "application/vnd.piaccess.application-licence": {
    source: "iana"
  },
  "application/vnd.picsel": {
    source: "iana",
    extensions: [
      "efif"
    ]
  },
  "application/vnd.pmi.widget": {
    source: "iana",
    extensions: [
      "wg"
    ]
  },
  "application/vnd.poc.group-advertisement+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.pocketlearn": {
    source: "iana",
    extensions: [
      "plf"
    ]
  },
  "application/vnd.powerbuilder6": {
    source: "iana",
    extensions: [
      "pbd"
    ]
  },
  "application/vnd.powerbuilder6-s": {
    source: "iana"
  },
  "application/vnd.powerbuilder7": {
    source: "iana"
  },
  "application/vnd.powerbuilder7-s": {
    source: "iana"
  },
  "application/vnd.powerbuilder75": {
    source: "iana"
  },
  "application/vnd.powerbuilder75-s": {
    source: "iana"
  },
  "application/vnd.preminet": {
    source: "iana"
  },
  "application/vnd.previewsystems.box": {
    source: "iana",
    extensions: [
      "box"
    ]
  },
  "application/vnd.proteus.magazine": {
    source: "iana",
    extensions: [
      "mgz"
    ]
  },
  "application/vnd.psfs": {
    source: "iana"
  },
  "application/vnd.publishare-delta-tree": {
    source: "iana",
    extensions: [
      "qps"
    ]
  },
  "application/vnd.pvi.ptid1": {
    source: "iana",
    extensions: [
      "ptid"
    ]
  },
  "application/vnd.pwg-multiplexed": {
    source: "iana"
  },
  "application/vnd.pwg-xhtml-print+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.qualcomm.brew-app-res": {
    source: "iana"
  },
  "application/vnd.quarantainenet": {
    source: "iana"
  },
  "application/vnd.quark.quarkxpress": {
    source: "iana",
    extensions: [
      "qxd",
      "qxt",
      "qwd",
      "qwt",
      "qxl",
      "qxb"
    ]
  },
  "application/vnd.quobject-quoxdocument": {
    source: "iana"
  },
  "application/vnd.radisys.moml+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.radisys.msml+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.radisys.msml-audit+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.radisys.msml-audit-conf+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.radisys.msml-audit-conn+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.radisys.msml-audit-dialog+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.radisys.msml-audit-stream+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.radisys.msml-conf+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.radisys.msml-dialog+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.radisys.msml-dialog-base+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.radisys.msml-dialog-fax-detect+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.radisys.msml-dialog-fax-sendrecv+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.radisys.msml-dialog-group+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.radisys.msml-dialog-speech+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.radisys.msml-dialog-transform+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.rainstor.data": {
    source: "iana"
  },
  "application/vnd.rapid": {
    source: "iana"
  },
  "application/vnd.rar": {
    source: "iana",
    extensions: [
      "rar"
    ]
  },
  "application/vnd.realvnc.bed": {
    source: "iana",
    extensions: [
      "bed"
    ]
  },
  "application/vnd.recordare.musicxml": {
    source: "iana",
    extensions: [
      "mxl"
    ]
  },
  "application/vnd.recordare.musicxml+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "musicxml"
    ]
  },
  "application/vnd.renlearn.rlprint": {
    source: "iana"
  },
  "application/vnd.resilient.logic": {
    source: "iana"
  },
  "application/vnd.restful+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.rig.cryptonote": {
    source: "iana",
    extensions: [
      "cryptonote"
    ]
  },
  "application/vnd.rim.cod": {
    source: "apache",
    extensions: [
      "cod"
    ]
  },
  "application/vnd.rn-realmedia": {
    source: "apache",
    extensions: [
      "rm"
    ]
  },
  "application/vnd.rn-realmedia-vbr": {
    source: "apache",
    extensions: [
      "rmvb"
    ]
  },
  "application/vnd.route66.link66+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "link66"
    ]
  },
  "application/vnd.rs-274x": {
    source: "iana"
  },
  "application/vnd.ruckus.download": {
    source: "iana"
  },
  "application/vnd.s3sms": {
    source: "iana"
  },
  "application/vnd.sailingtracker.track": {
    source: "iana",
    extensions: [
      "st"
    ]
  },
  "application/vnd.sar": {
    source: "iana"
  },
  "application/vnd.sbm.cid": {
    source: "iana"
  },
  "application/vnd.sbm.mid2": {
    source: "iana"
  },
  "application/vnd.scribus": {
    source: "iana"
  },
  "application/vnd.sealed.3df": {
    source: "iana"
  },
  "application/vnd.sealed.csf": {
    source: "iana"
  },
  "application/vnd.sealed.doc": {
    source: "iana"
  },
  "application/vnd.sealed.eml": {
    source: "iana"
  },
  "application/vnd.sealed.mht": {
    source: "iana"
  },
  "application/vnd.sealed.net": {
    source: "iana"
  },
  "application/vnd.sealed.ppt": {
    source: "iana"
  },
  "application/vnd.sealed.tiff": {
    source: "iana"
  },
  "application/vnd.sealed.xls": {
    source: "iana"
  },
  "application/vnd.sealedmedia.softseal.html": {
    source: "iana"
  },
  "application/vnd.sealedmedia.softseal.pdf": {
    source: "iana"
  },
  "application/vnd.seemail": {
    source: "iana",
    extensions: [
      "see"
    ]
  },
  "application/vnd.seis+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.sema": {
    source: "iana",
    extensions: [
      "sema"
    ]
  },
  "application/vnd.semd": {
    source: "iana",
    extensions: [
      "semd"
    ]
  },
  "application/vnd.semf": {
    source: "iana",
    extensions: [
      "semf"
    ]
  },
  "application/vnd.shade-save-file": {
    source: "iana"
  },
  "application/vnd.shana.informed.formdata": {
    source: "iana",
    extensions: [
      "ifm"
    ]
  },
  "application/vnd.shana.informed.formtemplate": {
    source: "iana",
    extensions: [
      "itp"
    ]
  },
  "application/vnd.shana.informed.interchange": {
    source: "iana",
    extensions: [
      "iif"
    ]
  },
  "application/vnd.shana.informed.package": {
    source: "iana",
    extensions: [
      "ipk"
    ]
  },
  "application/vnd.shootproof+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.shopkick+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.shp": {
    source: "iana"
  },
  "application/vnd.shx": {
    source: "iana"
  },
  "application/vnd.sigrok.session": {
    source: "iana"
  },
  "application/vnd.simtech-mindmapper": {
    source: "iana",
    extensions: [
      "twd",
      "twds"
    ]
  },
  "application/vnd.siren+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.smaf": {
    source: "iana",
    extensions: [
      "mmf"
    ]
  },
  "application/vnd.smart.notebook": {
    source: "iana"
  },
  "application/vnd.smart.teacher": {
    source: "iana",
    extensions: [
      "teacher"
    ]
  },
  "application/vnd.snesdev-page-table": {
    source: "iana"
  },
  "application/vnd.software602.filler.form+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "fo"
    ]
  },
  "application/vnd.software602.filler.form-xml-zip": {
    source: "iana"
  },
  "application/vnd.solent.sdkm+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "sdkm",
      "sdkd"
    ]
  },
  "application/vnd.spotfire.dxp": {
    source: "iana",
    extensions: [
      "dxp"
    ]
  },
  "application/vnd.spotfire.sfs": {
    source: "iana",
    extensions: [
      "sfs"
    ]
  },
  "application/vnd.sqlite3": {
    source: "iana"
  },
  "application/vnd.sss-cod": {
    source: "iana"
  },
  "application/vnd.sss-dtf": {
    source: "iana"
  },
  "application/vnd.sss-ntf": {
    source: "iana"
  },
  "application/vnd.stardivision.calc": {
    source: "apache",
    extensions: [
      "sdc"
    ]
  },
  "application/vnd.stardivision.draw": {
    source: "apache",
    extensions: [
      "sda"
    ]
  },
  "application/vnd.stardivision.impress": {
    source: "apache",
    extensions: [
      "sdd"
    ]
  },
  "application/vnd.stardivision.math": {
    source: "apache",
    extensions: [
      "smf"
    ]
  },
  "application/vnd.stardivision.writer": {
    source: "apache",
    extensions: [
      "sdw",
      "vor"
    ]
  },
  "application/vnd.stardivision.writer-global": {
    source: "apache",
    extensions: [
      "sgl"
    ]
  },
  "application/vnd.stepmania.package": {
    source: "iana",
    extensions: [
      "smzip"
    ]
  },
  "application/vnd.stepmania.stepchart": {
    source: "iana",
    extensions: [
      "sm"
    ]
  },
  "application/vnd.street-stream": {
    source: "iana"
  },
  "application/vnd.sun.wadl+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "wadl"
    ]
  },
  "application/vnd.sun.xml.calc": {
    source: "apache",
    extensions: [
      "sxc"
    ]
  },
  "application/vnd.sun.xml.calc.template": {
    source: "apache",
    extensions: [
      "stc"
    ]
  },
  "application/vnd.sun.xml.draw": {
    source: "apache",
    extensions: [
      "sxd"
    ]
  },
  "application/vnd.sun.xml.draw.template": {
    source: "apache",
    extensions: [
      "std"
    ]
  },
  "application/vnd.sun.xml.impress": {
    source: "apache",
    extensions: [
      "sxi"
    ]
  },
  "application/vnd.sun.xml.impress.template": {
    source: "apache",
    extensions: [
      "sti"
    ]
  },
  "application/vnd.sun.xml.math": {
    source: "apache",
    extensions: [
      "sxm"
    ]
  },
  "application/vnd.sun.xml.writer": {
    source: "apache",
    extensions: [
      "sxw"
    ]
  },
  "application/vnd.sun.xml.writer.global": {
    source: "apache",
    extensions: [
      "sxg"
    ]
  },
  "application/vnd.sun.xml.writer.template": {
    source: "apache",
    extensions: [
      "stw"
    ]
  },
  "application/vnd.sus-calendar": {
    source: "iana",
    extensions: [
      "sus",
      "susp"
    ]
  },
  "application/vnd.svd": {
    source: "iana",
    extensions: [
      "svd"
    ]
  },
  "application/vnd.swiftview-ics": {
    source: "iana"
  },
  "application/vnd.sycle+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.syft+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.symbian.install": {
    source: "apache",
    extensions: [
      "sis",
      "sisx"
    ]
  },
  "application/vnd.syncml+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0,
    extensions: [
      "xsm"
    ]
  },
  "application/vnd.syncml.dm+wbxml": {
    source: "iana",
    charset: "UTF-8",
    extensions: [
      "bdm"
    ]
  },
  "application/vnd.syncml.dm+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0,
    extensions: [
      "xdm"
    ]
  },
  "application/vnd.syncml.dm.notification": {
    source: "iana"
  },
  "application/vnd.syncml.dmddf+wbxml": {
    source: "iana"
  },
  "application/vnd.syncml.dmddf+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0,
    extensions: [
      "ddf"
    ]
  },
  "application/vnd.syncml.dmtnds+wbxml": {
    source: "iana"
  },
  "application/vnd.syncml.dmtnds+xml": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0
  },
  "application/vnd.syncml.ds.notification": {
    source: "iana"
  },
  "application/vnd.tableschema+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.tao.intent-module-archive": {
    source: "iana",
    extensions: [
      "tao"
    ]
  },
  "application/vnd.tcpdump.pcap": {
    source: "iana",
    extensions: [
      "pcap",
      "cap",
      "dmp"
    ]
  },
  "application/vnd.think-cell.ppttc+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.tmd.mediaflex.api+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.tml": {
    source: "iana"
  },
  "application/vnd.tmobile-livetv": {
    source: "iana",
    extensions: [
      "tmo"
    ]
  },
  "application/vnd.tri.onesource": {
    source: "iana"
  },
  "application/vnd.trid.tpt": {
    source: "iana",
    extensions: [
      "tpt"
    ]
  },
  "application/vnd.triscape.mxs": {
    source: "iana",
    extensions: [
      "mxs"
    ]
  },
  "application/vnd.trueapp": {
    source: "iana",
    extensions: [
      "tra"
    ]
  },
  "application/vnd.truedoc": {
    source: "iana"
  },
  "application/vnd.ubisoft.webplayer": {
    source: "iana"
  },
  "application/vnd.ufdl": {
    source: "iana",
    extensions: [
      "ufd",
      "ufdl"
    ]
  },
  "application/vnd.uiq.theme": {
    source: "iana",
    extensions: [
      "utz"
    ]
  },
  "application/vnd.umajin": {
    source: "iana",
    extensions: [
      "umj"
    ]
  },
  "application/vnd.unity": {
    source: "iana",
    extensions: [
      "unityweb"
    ]
  },
  "application/vnd.uoml+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "uoml"
    ]
  },
  "application/vnd.uplanet.alert": {
    source: "iana"
  },
  "application/vnd.uplanet.alert-wbxml": {
    source: "iana"
  },
  "application/vnd.uplanet.bearer-choice": {
    source: "iana"
  },
  "application/vnd.uplanet.bearer-choice-wbxml": {
    source: "iana"
  },
  "application/vnd.uplanet.cacheop": {
    source: "iana"
  },
  "application/vnd.uplanet.cacheop-wbxml": {
    source: "iana"
  },
  "application/vnd.uplanet.channel": {
    source: "iana"
  },
  "application/vnd.uplanet.channel-wbxml": {
    source: "iana"
  },
  "application/vnd.uplanet.list": {
    source: "iana"
  },
  "application/vnd.uplanet.list-wbxml": {
    source: "iana"
  },
  "application/vnd.uplanet.listcmd": {
    source: "iana"
  },
  "application/vnd.uplanet.listcmd-wbxml": {
    source: "iana"
  },
  "application/vnd.uplanet.signal": {
    source: "iana"
  },
  "application/vnd.uri-map": {
    source: "iana"
  },
  "application/vnd.valve.source.material": {
    source: "iana"
  },
  "application/vnd.vcx": {
    source: "iana",
    extensions: [
      "vcx"
    ]
  },
  "application/vnd.vd-study": {
    source: "iana"
  },
  "application/vnd.vectorworks": {
    source: "iana"
  },
  "application/vnd.vel+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.verimatrix.vcas": {
    source: "iana"
  },
  "application/vnd.veritone.aion+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.veryant.thin": {
    source: "iana"
  },
  "application/vnd.ves.encrypted": {
    source: "iana"
  },
  "application/vnd.vidsoft.vidconference": {
    source: "iana"
  },
  "application/vnd.visio": {
    source: "iana",
    extensions: [
      "vsd",
      "vst",
      "vss",
      "vsw"
    ]
  },
  "application/vnd.visionary": {
    source: "iana",
    extensions: [
      "vis"
    ]
  },
  "application/vnd.vividence.scriptfile": {
    source: "iana"
  },
  "application/vnd.vsf": {
    source: "iana",
    extensions: [
      "vsf"
    ]
  },
  "application/vnd.wap.sic": {
    source: "iana"
  },
  "application/vnd.wap.slc": {
    source: "iana"
  },
  "application/vnd.wap.wbxml": {
    source: "iana",
    charset: "UTF-8",
    extensions: [
      "wbxml"
    ]
  },
  "application/vnd.wap.wmlc": {
    source: "iana",
    extensions: [
      "wmlc"
    ]
  },
  "application/vnd.wap.wmlscriptc": {
    source: "iana",
    extensions: [
      "wmlsc"
    ]
  },
  "application/vnd.webturbo": {
    source: "iana",
    extensions: [
      "wtb"
    ]
  },
  "application/vnd.wfa.dpp": {
    source: "iana"
  },
  "application/vnd.wfa.p2p": {
    source: "iana"
  },
  "application/vnd.wfa.wsc": {
    source: "iana"
  },
  "application/vnd.windows.devicepairing": {
    source: "iana"
  },
  "application/vnd.wmc": {
    source: "iana"
  },
  "application/vnd.wmf.bootstrap": {
    source: "iana"
  },
  "application/vnd.wolfram.mathematica": {
    source: "iana"
  },
  "application/vnd.wolfram.mathematica.package": {
    source: "iana"
  },
  "application/vnd.wolfram.player": {
    source: "iana",
    extensions: [
      "nbp"
    ]
  },
  "application/vnd.wordperfect": {
    source: "iana",
    extensions: [
      "wpd"
    ]
  },
  "application/vnd.wqd": {
    source: "iana",
    extensions: [
      "wqd"
    ]
  },
  "application/vnd.wrq-hp3000-labelled": {
    source: "iana"
  },
  "application/vnd.wt.stf": {
    source: "iana",
    extensions: [
      "stf"
    ]
  },
  "application/vnd.wv.csp+wbxml": {
    source: "iana"
  },
  "application/vnd.wv.csp+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.wv.ssp+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.xacml+json": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.xara": {
    source: "iana",
    extensions: [
      "xar"
    ]
  },
  "application/vnd.xfdl": {
    source: "iana",
    extensions: [
      "xfdl"
    ]
  },
  "application/vnd.xfdl.webform": {
    source: "iana"
  },
  "application/vnd.xmi+xml": {
    source: "iana",
    compressible: !0
  },
  "application/vnd.xmpie.cpkg": {
    source: "iana"
  },
  "application/vnd.xmpie.dpkg": {
    source: "iana"
  },
  "application/vnd.xmpie.plan": {
    source: "iana"
  },
  "application/vnd.xmpie.ppkg": {
    source: "iana"
  },
  "application/vnd.xmpie.xlim": {
    source: "iana"
  },
  "application/vnd.yamaha.hv-dic": {
    source: "iana",
    extensions: [
      "hvd"
    ]
  },
  "application/vnd.yamaha.hv-script": {
    source: "iana",
    extensions: [
      "hvs"
    ]
  },
  "application/vnd.yamaha.hv-voice": {
    source: "iana",
    extensions: [
      "hvp"
    ]
  },
  "application/vnd.yamaha.openscoreformat": {
    source: "iana",
    extensions: [
      "osf"
    ]
  },
  "application/vnd.yamaha.openscoreformat.osfpvg+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "osfpvg"
    ]
  },
  "application/vnd.yamaha.remote-setup": {
    source: "iana"
  },
  "application/vnd.yamaha.smaf-audio": {
    source: "iana",
    extensions: [
      "saf"
    ]
  },
  "application/vnd.yamaha.smaf-phrase": {
    source: "iana",
    extensions: [
      "spf"
    ]
  },
  "application/vnd.yamaha.through-ngn": {
    source: "iana"
  },
  "application/vnd.yamaha.tunnel-udpencap": {
    source: "iana"
  },
  "application/vnd.yaoweme": {
    source: "iana"
  },
  "application/vnd.yellowriver-custom-menu": {
    source: "iana",
    extensions: [
      "cmp"
    ]
  },
  "application/vnd.youtube.yt": {
    source: "iana"
  },
  "application/vnd.zul": {
    source: "iana",
    extensions: [
      "zir",
      "zirz"
    ]
  },
  "application/vnd.zzazz.deck+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "zaz"
    ]
  },
  "application/voicexml+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "vxml"
    ]
  },
  "application/voucher-cms+json": {
    source: "iana",
    compressible: !0
  },
  "application/vq-rtcpxr": {
    source: "iana"
  },
  "application/wasm": {
    source: "iana",
    compressible: !0,
    extensions: [
      "wasm"
    ]
  },
  "application/watcherinfo+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "wif"
    ]
  },
  "application/webpush-options+json": {
    source: "iana",
    compressible: !0
  },
  "application/whoispp-query": {
    source: "iana"
  },
  "application/whoispp-response": {
    source: "iana"
  },
  "application/widget": {
    source: "iana",
    extensions: [
      "wgt"
    ]
  },
  "application/winhlp": {
    source: "apache",
    extensions: [
      "hlp"
    ]
  },
  "application/wita": {
    source: "iana"
  },
  "application/wordperfect5.1": {
    source: "iana"
  },
  "application/wsdl+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "wsdl"
    ]
  },
  "application/wspolicy+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "wspolicy"
    ]
  },
  "application/x-7z-compressed": {
    source: "apache",
    compressible: !1,
    extensions: [
      "7z"
    ]
  },
  "application/x-abiword": {
    source: "apache",
    extensions: [
      "abw"
    ]
  },
  "application/x-ace-compressed": {
    source: "apache",
    extensions: [
      "ace"
    ]
  },
  "application/x-amf": {
    source: "apache"
  },
  "application/x-apple-diskimage": {
    source: "apache",
    extensions: [
      "dmg"
    ]
  },
  "application/x-arj": {
    compressible: !1,
    extensions: [
      "arj"
    ]
  },
  "application/x-authorware-bin": {
    source: "apache",
    extensions: [
      "aab",
      "x32",
      "u32",
      "vox"
    ]
  },
  "application/x-authorware-map": {
    source: "apache",
    extensions: [
      "aam"
    ]
  },
  "application/x-authorware-seg": {
    source: "apache",
    extensions: [
      "aas"
    ]
  },
  "application/x-bcpio": {
    source: "apache",
    extensions: [
      "bcpio"
    ]
  },
  "application/x-bdoc": {
    compressible: !1,
    extensions: [
      "bdoc"
    ]
  },
  "application/x-bittorrent": {
    source: "apache",
    extensions: [
      "torrent"
    ]
  },
  "application/x-blorb": {
    source: "apache",
    extensions: [
      "blb",
      "blorb"
    ]
  },
  "application/x-bzip": {
    source: "apache",
    compressible: !1,
    extensions: [
      "bz"
    ]
  },
  "application/x-bzip2": {
    source: "apache",
    compressible: !1,
    extensions: [
      "bz2",
      "boz"
    ]
  },
  "application/x-cbr": {
    source: "apache",
    extensions: [
      "cbr",
      "cba",
      "cbt",
      "cbz",
      "cb7"
    ]
  },
  "application/x-cdlink": {
    source: "apache",
    extensions: [
      "vcd"
    ]
  },
  "application/x-cfs-compressed": {
    source: "apache",
    extensions: [
      "cfs"
    ]
  },
  "application/x-chat": {
    source: "apache",
    extensions: [
      "chat"
    ]
  },
  "application/x-chess-pgn": {
    source: "apache",
    extensions: [
      "pgn"
    ]
  },
  "application/x-chrome-extension": {
    extensions: [
      "crx"
    ]
  },
  "application/x-cocoa": {
    source: "nginx",
    extensions: [
      "cco"
    ]
  },
  "application/x-compress": {
    source: "apache"
  },
  "application/x-conference": {
    source: "apache",
    extensions: [
      "nsc"
    ]
  },
  "application/x-cpio": {
    source: "apache",
    extensions: [
      "cpio"
    ]
  },
  "application/x-csh": {
    source: "apache",
    extensions: [
      "csh"
    ]
  },
  "application/x-deb": {
    compressible: !1
  },
  "application/x-debian-package": {
    source: "apache",
    extensions: [
      "deb",
      "udeb"
    ]
  },
  "application/x-dgc-compressed": {
    source: "apache",
    extensions: [
      "dgc"
    ]
  },
  "application/x-director": {
    source: "apache",
    extensions: [
      "dir",
      "dcr",
      "dxr",
      "cst",
      "cct",
      "cxt",
      "w3d",
      "fgd",
      "swa"
    ]
  },
  "application/x-doom": {
    source: "apache",
    extensions: [
      "wad"
    ]
  },
  "application/x-dtbncx+xml": {
    source: "apache",
    compressible: !0,
    extensions: [
      "ncx"
    ]
  },
  "application/x-dtbook+xml": {
    source: "apache",
    compressible: !0,
    extensions: [
      "dtb"
    ]
  },
  "application/x-dtbresource+xml": {
    source: "apache",
    compressible: !0,
    extensions: [
      "res"
    ]
  },
  "application/x-dvi": {
    source: "apache",
    compressible: !1,
    extensions: [
      "dvi"
    ]
  },
  "application/x-envoy": {
    source: "apache",
    extensions: [
      "evy"
    ]
  },
  "application/x-eva": {
    source: "apache",
    extensions: [
      "eva"
    ]
  },
  "application/x-font-bdf": {
    source: "apache",
    extensions: [
      "bdf"
    ]
  },
  "application/x-font-dos": {
    source: "apache"
  },
  "application/x-font-framemaker": {
    source: "apache"
  },
  "application/x-font-ghostscript": {
    source: "apache",
    extensions: [
      "gsf"
    ]
  },
  "application/x-font-libgrx": {
    source: "apache"
  },
  "application/x-font-linux-psf": {
    source: "apache",
    extensions: [
      "psf"
    ]
  },
  "application/x-font-pcf": {
    source: "apache",
    extensions: [
      "pcf"
    ]
  },
  "application/x-font-snf": {
    source: "apache",
    extensions: [
      "snf"
    ]
  },
  "application/x-font-speedo": {
    source: "apache"
  },
  "application/x-font-sunos-news": {
    source: "apache"
  },
  "application/x-font-type1": {
    source: "apache",
    extensions: [
      "pfa",
      "pfb",
      "pfm",
      "afm"
    ]
  },
  "application/x-font-vfont": {
    source: "apache"
  },
  "application/x-freearc": {
    source: "apache",
    extensions: [
      "arc"
    ]
  },
  "application/x-futuresplash": {
    source: "apache",
    extensions: [
      "spl"
    ]
  },
  "application/x-gca-compressed": {
    source: "apache",
    extensions: [
      "gca"
    ]
  },
  "application/x-glulx": {
    source: "apache",
    extensions: [
      "ulx"
    ]
  },
  "application/x-gnumeric": {
    source: "apache",
    extensions: [
      "gnumeric"
    ]
  },
  "application/x-gramps-xml": {
    source: "apache",
    extensions: [
      "gramps"
    ]
  },
  "application/x-gtar": {
    source: "apache",
    extensions: [
      "gtar"
    ]
  },
  "application/x-gzip": {
    source: "apache"
  },
  "application/x-hdf": {
    source: "apache",
    extensions: [
      "hdf"
    ]
  },
  "application/x-httpd-php": {
    compressible: !0,
    extensions: [
      "php"
    ]
  },
  "application/x-install-instructions": {
    source: "apache",
    extensions: [
      "install"
    ]
  },
  "application/x-iso9660-image": {
    source: "apache",
    extensions: [
      "iso"
    ]
  },
  "application/x-iwork-keynote-sffkey": {
    extensions: [
      "key"
    ]
  },
  "application/x-iwork-numbers-sffnumbers": {
    extensions: [
      "numbers"
    ]
  },
  "application/x-iwork-pages-sffpages": {
    extensions: [
      "pages"
    ]
  },
  "application/x-java-archive-diff": {
    source: "nginx",
    extensions: [
      "jardiff"
    ]
  },
  "application/x-java-jnlp-file": {
    source: "apache",
    compressible: !1,
    extensions: [
      "jnlp"
    ]
  },
  "application/x-javascript": {
    compressible: !0
  },
  "application/x-keepass2": {
    extensions: [
      "kdbx"
    ]
  },
  "application/x-latex": {
    source: "apache",
    compressible: !1,
    extensions: [
      "latex"
    ]
  },
  "application/x-lua-bytecode": {
    extensions: [
      "luac"
    ]
  },
  "application/x-lzh-compressed": {
    source: "apache",
    extensions: [
      "lzh",
      "lha"
    ]
  },
  "application/x-makeself": {
    source: "nginx",
    extensions: [
      "run"
    ]
  },
  "application/x-mie": {
    source: "apache",
    extensions: [
      "mie"
    ]
  },
  "application/x-mobipocket-ebook": {
    source: "apache",
    extensions: [
      "prc",
      "mobi"
    ]
  },
  "application/x-mpegurl": {
    compressible: !1
  },
  "application/x-ms-application": {
    source: "apache",
    extensions: [
      "application"
    ]
  },
  "application/x-ms-shortcut": {
    source: "apache",
    extensions: [
      "lnk"
    ]
  },
  "application/x-ms-wmd": {
    source: "apache",
    extensions: [
      "wmd"
    ]
  },
  "application/x-ms-wmz": {
    source: "apache",
    extensions: [
      "wmz"
    ]
  },
  "application/x-ms-xbap": {
    source: "apache",
    extensions: [
      "xbap"
    ]
  },
  "application/x-msaccess": {
    source: "apache",
    extensions: [
      "mdb"
    ]
  },
  "application/x-msbinder": {
    source: "apache",
    extensions: [
      "obd"
    ]
  },
  "application/x-mscardfile": {
    source: "apache",
    extensions: [
      "crd"
    ]
  },
  "application/x-msclip": {
    source: "apache",
    extensions: [
      "clp"
    ]
  },
  "application/x-msdos-program": {
    extensions: [
      "exe"
    ]
  },
  "application/x-msdownload": {
    source: "apache",
    extensions: [
      "exe",
      "dll",
      "com",
      "bat",
      "msi"
    ]
  },
  "application/x-msmediaview": {
    source: "apache",
    extensions: [
      "mvb",
      "m13",
      "m14"
    ]
  },
  "application/x-msmetafile": {
    source: "apache",
    extensions: [
      "wmf",
      "wmz",
      "emf",
      "emz"
    ]
  },
  "application/x-msmoney": {
    source: "apache",
    extensions: [
      "mny"
    ]
  },
  "application/x-mspublisher": {
    source: "apache",
    extensions: [
      "pub"
    ]
  },
  "application/x-msschedule": {
    source: "apache",
    extensions: [
      "scd"
    ]
  },
  "application/x-msterminal": {
    source: "apache",
    extensions: [
      "trm"
    ]
  },
  "application/x-mswrite": {
    source: "apache",
    extensions: [
      "wri"
    ]
  },
  "application/x-netcdf": {
    source: "apache",
    extensions: [
      "nc",
      "cdf"
    ]
  },
  "application/x-ns-proxy-autoconfig": {
    compressible: !0,
    extensions: [
      "pac"
    ]
  },
  "application/x-nzb": {
    source: "apache",
    extensions: [
      "nzb"
    ]
  },
  "application/x-perl": {
    source: "nginx",
    extensions: [
      "pl",
      "pm"
    ]
  },
  "application/x-pilot": {
    source: "nginx",
    extensions: [
      "prc",
      "pdb"
    ]
  },
  "application/x-pkcs12": {
    source: "apache",
    compressible: !1,
    extensions: [
      "p12",
      "pfx"
    ]
  },
  "application/x-pkcs7-certificates": {
    source: "apache",
    extensions: [
      "p7b",
      "spc"
    ]
  },
  "application/x-pkcs7-certreqresp": {
    source: "apache",
    extensions: [
      "p7r"
    ]
  },
  "application/x-pki-message": {
    source: "iana"
  },
  "application/x-rar-compressed": {
    source: "apache",
    compressible: !1,
    extensions: [
      "rar"
    ]
  },
  "application/x-redhat-package-manager": {
    source: "nginx",
    extensions: [
      "rpm"
    ]
  },
  "application/x-research-info-systems": {
    source: "apache",
    extensions: [
      "ris"
    ]
  },
  "application/x-sea": {
    source: "nginx",
    extensions: [
      "sea"
    ]
  },
  "application/x-sh": {
    source: "apache",
    compressible: !0,
    extensions: [
      "sh"
    ]
  },
  "application/x-shar": {
    source: "apache",
    extensions: [
      "shar"
    ]
  },
  "application/x-shockwave-flash": {
    source: "apache",
    compressible: !1,
    extensions: [
      "swf"
    ]
  },
  "application/x-silverlight-app": {
    source: "apache",
    extensions: [
      "xap"
    ]
  },
  "application/x-sql": {
    source: "apache",
    extensions: [
      "sql"
    ]
  },
  "application/x-stuffit": {
    source: "apache",
    compressible: !1,
    extensions: [
      "sit"
    ]
  },
  "application/x-stuffitx": {
    source: "apache",
    extensions: [
      "sitx"
    ]
  },
  "application/x-subrip": {
    source: "apache",
    extensions: [
      "srt"
    ]
  },
  "application/x-sv4cpio": {
    source: "apache",
    extensions: [
      "sv4cpio"
    ]
  },
  "application/x-sv4crc": {
    source: "apache",
    extensions: [
      "sv4crc"
    ]
  },
  "application/x-t3vm-image": {
    source: "apache",
    extensions: [
      "t3"
    ]
  },
  "application/x-tads": {
    source: "apache",
    extensions: [
      "gam"
    ]
  },
  "application/x-tar": {
    source: "apache",
    compressible: !0,
    extensions: [
      "tar"
    ]
  },
  "application/x-tcl": {
    source: "apache",
    extensions: [
      "tcl",
      "tk"
    ]
  },
  "application/x-tex": {
    source: "apache",
    extensions: [
      "tex"
    ]
  },
  "application/x-tex-tfm": {
    source: "apache",
    extensions: [
      "tfm"
    ]
  },
  "application/x-texinfo": {
    source: "apache",
    extensions: [
      "texinfo",
      "texi"
    ]
  },
  "application/x-tgif": {
    source: "apache",
    extensions: [
      "obj"
    ]
  },
  "application/x-ustar": {
    source: "apache",
    extensions: [
      "ustar"
    ]
  },
  "application/x-virtualbox-hdd": {
    compressible: !0,
    extensions: [
      "hdd"
    ]
  },
  "application/x-virtualbox-ova": {
    compressible: !0,
    extensions: [
      "ova"
    ]
  },
  "application/x-virtualbox-ovf": {
    compressible: !0,
    extensions: [
      "ovf"
    ]
  },
  "application/x-virtualbox-vbox": {
    compressible: !0,
    extensions: [
      "vbox"
    ]
  },
  "application/x-virtualbox-vbox-extpack": {
    compressible: !1,
    extensions: [
      "vbox-extpack"
    ]
  },
  "application/x-virtualbox-vdi": {
    compressible: !0,
    extensions: [
      "vdi"
    ]
  },
  "application/x-virtualbox-vhd": {
    compressible: !0,
    extensions: [
      "vhd"
    ]
  },
  "application/x-virtualbox-vmdk": {
    compressible: !0,
    extensions: [
      "vmdk"
    ]
  },
  "application/x-wais-source": {
    source: "apache",
    extensions: [
      "src"
    ]
  },
  "application/x-web-app-manifest+json": {
    compressible: !0,
    extensions: [
      "webapp"
    ]
  },
  "application/x-www-form-urlencoded": {
    source: "iana",
    compressible: !0
  },
  "application/x-x509-ca-cert": {
    source: "iana",
    extensions: [
      "der",
      "crt",
      "pem"
    ]
  },
  "application/x-x509-ca-ra-cert": {
    source: "iana"
  },
  "application/x-x509-next-ca-cert": {
    source: "iana"
  },
  "application/x-xfig": {
    source: "apache",
    extensions: [
      "fig"
    ]
  },
  "application/x-xliff+xml": {
    source: "apache",
    compressible: !0,
    extensions: [
      "xlf"
    ]
  },
  "application/x-xpinstall": {
    source: "apache",
    compressible: !1,
    extensions: [
      "xpi"
    ]
  },
  "application/x-xz": {
    source: "apache",
    extensions: [
      "xz"
    ]
  },
  "application/x-zmachine": {
    source: "apache",
    extensions: [
      "z1",
      "z2",
      "z3",
      "z4",
      "z5",
      "z6",
      "z7",
      "z8"
    ]
  },
  "application/x400-bp": {
    source: "iana"
  },
  "application/xacml+xml": {
    source: "iana",
    compressible: !0
  },
  "application/xaml+xml": {
    source: "apache",
    compressible: !0,
    extensions: [
      "xaml"
    ]
  },
  "application/xcap-att+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "xav"
    ]
  },
  "application/xcap-caps+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "xca"
    ]
  },
  "application/xcap-diff+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "xdf"
    ]
  },
  "application/xcap-el+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "xel"
    ]
  },
  "application/xcap-error+xml": {
    source: "iana",
    compressible: !0
  },
  "application/xcap-ns+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "xns"
    ]
  },
  "application/xcon-conference-info+xml": {
    source: "iana",
    compressible: !0
  },
  "application/xcon-conference-info-diff+xml": {
    source: "iana",
    compressible: !0
  },
  "application/xenc+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "xenc"
    ]
  },
  "application/xhtml+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "xhtml",
      "xht"
    ]
  },
  "application/xhtml-voice+xml": {
    source: "apache",
    compressible: !0
  },
  "application/xliff+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "xlf"
    ]
  },
  "application/xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "xml",
      "xsl",
      "xsd",
      "rng"
    ]
  },
  "application/xml-dtd": {
    source: "iana",
    compressible: !0,
    extensions: [
      "dtd"
    ]
  },
  "application/xml-external-parsed-entity": {
    source: "iana"
  },
  "application/xml-patch+xml": {
    source: "iana",
    compressible: !0
  },
  "application/xmpp+xml": {
    source: "iana",
    compressible: !0
  },
  "application/xop+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "xop"
    ]
  },
  "application/xproc+xml": {
    source: "apache",
    compressible: !0,
    extensions: [
      "xpl"
    ]
  },
  "application/xslt+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "xsl",
      "xslt"
    ]
  },
  "application/xspf+xml": {
    source: "apache",
    compressible: !0,
    extensions: [
      "xspf"
    ]
  },
  "application/xv+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "mxml",
      "xhvml",
      "xvml",
      "xvm"
    ]
  },
  "application/yang": {
    source: "iana",
    extensions: [
      "yang"
    ]
  },
  "application/yang-data+json": {
    source: "iana",
    compressible: !0
  },
  "application/yang-data+xml": {
    source: "iana",
    compressible: !0
  },
  "application/yang-patch+json": {
    source: "iana",
    compressible: !0
  },
  "application/yang-patch+xml": {
    source: "iana",
    compressible: !0
  },
  "application/yin+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "yin"
    ]
  },
  "application/zip": {
    source: "iana",
    compressible: !1,
    extensions: [
      "zip"
    ]
  },
  "application/zlib": {
    source: "iana"
  },
  "application/zstd": {
    source: "iana"
  },
  "audio/1d-interleaved-parityfec": {
    source: "iana"
  },
  "audio/32kadpcm": {
    source: "iana"
  },
  "audio/3gpp": {
    source: "iana",
    compressible: !1,
    extensions: [
      "3gpp"
    ]
  },
  "audio/3gpp2": {
    source: "iana"
  },
  "audio/aac": {
    source: "iana"
  },
  "audio/ac3": {
    source: "iana"
  },
  "audio/adpcm": {
    source: "apache",
    extensions: [
      "adp"
    ]
  },
  "audio/amr": {
    source: "iana",
    extensions: [
      "amr"
    ]
  },
  "audio/amr-wb": {
    source: "iana"
  },
  "audio/amr-wb+": {
    source: "iana"
  },
  "audio/aptx": {
    source: "iana"
  },
  "audio/asc": {
    source: "iana"
  },
  "audio/atrac-advanced-lossless": {
    source: "iana"
  },
  "audio/atrac-x": {
    source: "iana"
  },
  "audio/atrac3": {
    source: "iana"
  },
  "audio/basic": {
    source: "iana",
    compressible: !1,
    extensions: [
      "au",
      "snd"
    ]
  },
  "audio/bv16": {
    source: "iana"
  },
  "audio/bv32": {
    source: "iana"
  },
  "audio/clearmode": {
    source: "iana"
  },
  "audio/cn": {
    source: "iana"
  },
  "audio/dat12": {
    source: "iana"
  },
  "audio/dls": {
    source: "iana"
  },
  "audio/dsr-es201108": {
    source: "iana"
  },
  "audio/dsr-es202050": {
    source: "iana"
  },
  "audio/dsr-es202211": {
    source: "iana"
  },
  "audio/dsr-es202212": {
    source: "iana"
  },
  "audio/dv": {
    source: "iana"
  },
  "audio/dvi4": {
    source: "iana"
  },
  "audio/eac3": {
    source: "iana"
  },
  "audio/encaprtp": {
    source: "iana"
  },
  "audio/evrc": {
    source: "iana"
  },
  "audio/evrc-qcp": {
    source: "iana"
  },
  "audio/evrc0": {
    source: "iana"
  },
  "audio/evrc1": {
    source: "iana"
  },
  "audio/evrcb": {
    source: "iana"
  },
  "audio/evrcb0": {
    source: "iana"
  },
  "audio/evrcb1": {
    source: "iana"
  },
  "audio/evrcnw": {
    source: "iana"
  },
  "audio/evrcnw0": {
    source: "iana"
  },
  "audio/evrcnw1": {
    source: "iana"
  },
  "audio/evrcwb": {
    source: "iana"
  },
  "audio/evrcwb0": {
    source: "iana"
  },
  "audio/evrcwb1": {
    source: "iana"
  },
  "audio/evs": {
    source: "iana"
  },
  "audio/flexfec": {
    source: "iana"
  },
  "audio/fwdred": {
    source: "iana"
  },
  "audio/g711-0": {
    source: "iana"
  },
  "audio/g719": {
    source: "iana"
  },
  "audio/g722": {
    source: "iana"
  },
  "audio/g7221": {
    source: "iana"
  },
  "audio/g723": {
    source: "iana"
  },
  "audio/g726-16": {
    source: "iana"
  },
  "audio/g726-24": {
    source: "iana"
  },
  "audio/g726-32": {
    source: "iana"
  },
  "audio/g726-40": {
    source: "iana"
  },
  "audio/g728": {
    source: "iana"
  },
  "audio/g729": {
    source: "iana"
  },
  "audio/g7291": {
    source: "iana"
  },
  "audio/g729d": {
    source: "iana"
  },
  "audio/g729e": {
    source: "iana"
  },
  "audio/gsm": {
    source: "iana"
  },
  "audio/gsm-efr": {
    source: "iana"
  },
  "audio/gsm-hr-08": {
    source: "iana"
  },
  "audio/ilbc": {
    source: "iana"
  },
  "audio/ip-mr_v2.5": {
    source: "iana"
  },
  "audio/isac": {
    source: "apache"
  },
  "audio/l16": {
    source: "iana"
  },
  "audio/l20": {
    source: "iana"
  },
  "audio/l24": {
    source: "iana",
    compressible: !1
  },
  "audio/l8": {
    source: "iana"
  },
  "audio/lpc": {
    source: "iana"
  },
  "audio/melp": {
    source: "iana"
  },
  "audio/melp1200": {
    source: "iana"
  },
  "audio/melp2400": {
    source: "iana"
  },
  "audio/melp600": {
    source: "iana"
  },
  "audio/mhas": {
    source: "iana"
  },
  "audio/midi": {
    source: "apache",
    extensions: [
      "mid",
      "midi",
      "kar",
      "rmi"
    ]
  },
  "audio/mobile-xmf": {
    source: "iana",
    extensions: [
      "mxmf"
    ]
  },
  "audio/mp3": {
    compressible: !1,
    extensions: [
      "mp3"
    ]
  },
  "audio/mp4": {
    source: "iana",
    compressible: !1,
    extensions: [
      "m4a",
      "mp4a"
    ]
  },
  "audio/mp4a-latm": {
    source: "iana"
  },
  "audio/mpa": {
    source: "iana"
  },
  "audio/mpa-robust": {
    source: "iana"
  },
  "audio/mpeg": {
    source: "iana",
    compressible: !1,
    extensions: [
      "mpga",
      "mp2",
      "mp2a",
      "mp3",
      "m2a",
      "m3a"
    ]
  },
  "audio/mpeg4-generic": {
    source: "iana"
  },
  "audio/musepack": {
    source: "apache"
  },
  "audio/ogg": {
    source: "iana",
    compressible: !1,
    extensions: [
      "oga",
      "ogg",
      "spx",
      "opus"
    ]
  },
  "audio/opus": {
    source: "iana"
  },
  "audio/parityfec": {
    source: "iana"
  },
  "audio/pcma": {
    source: "iana"
  },
  "audio/pcma-wb": {
    source: "iana"
  },
  "audio/pcmu": {
    source: "iana"
  },
  "audio/pcmu-wb": {
    source: "iana"
  },
  "audio/prs.sid": {
    source: "iana"
  },
  "audio/qcelp": {
    source: "iana"
  },
  "audio/raptorfec": {
    source: "iana"
  },
  "audio/red": {
    source: "iana"
  },
  "audio/rtp-enc-aescm128": {
    source: "iana"
  },
  "audio/rtp-midi": {
    source: "iana"
  },
  "audio/rtploopback": {
    source: "iana"
  },
  "audio/rtx": {
    source: "iana"
  },
  "audio/s3m": {
    source: "apache",
    extensions: [
      "s3m"
    ]
  },
  "audio/scip": {
    source: "iana"
  },
  "audio/silk": {
    source: "apache",
    extensions: [
      "sil"
    ]
  },
  "audio/smv": {
    source: "iana"
  },
  "audio/smv-qcp": {
    source: "iana"
  },
  "audio/smv0": {
    source: "iana"
  },
  "audio/sofa": {
    source: "iana"
  },
  "audio/sp-midi": {
    source: "iana"
  },
  "audio/speex": {
    source: "iana"
  },
  "audio/t140c": {
    source: "iana"
  },
  "audio/t38": {
    source: "iana"
  },
  "audio/telephone-event": {
    source: "iana"
  },
  "audio/tetra_acelp": {
    source: "iana"
  },
  "audio/tetra_acelp_bb": {
    source: "iana"
  },
  "audio/tone": {
    source: "iana"
  },
  "audio/tsvcis": {
    source: "iana"
  },
  "audio/uemclip": {
    source: "iana"
  },
  "audio/ulpfec": {
    source: "iana"
  },
  "audio/usac": {
    source: "iana"
  },
  "audio/vdvi": {
    source: "iana"
  },
  "audio/vmr-wb": {
    source: "iana"
  },
  "audio/vnd.3gpp.iufp": {
    source: "iana"
  },
  "audio/vnd.4sb": {
    source: "iana"
  },
  "audio/vnd.audiokoz": {
    source: "iana"
  },
  "audio/vnd.celp": {
    source: "iana"
  },
  "audio/vnd.cisco.nse": {
    source: "iana"
  },
  "audio/vnd.cmles.radio-events": {
    source: "iana"
  },
  "audio/vnd.cns.anp1": {
    source: "iana"
  },
  "audio/vnd.cns.inf1": {
    source: "iana"
  },
  "audio/vnd.dece.audio": {
    source: "iana",
    extensions: [
      "uva",
      "uvva"
    ]
  },
  "audio/vnd.digital-winds": {
    source: "iana",
    extensions: [
      "eol"
    ]
  },
  "audio/vnd.dlna.adts": {
    source: "iana"
  },
  "audio/vnd.dolby.heaac.1": {
    source: "iana"
  },
  "audio/vnd.dolby.heaac.2": {
    source: "iana"
  },
  "audio/vnd.dolby.mlp": {
    source: "iana"
  },
  "audio/vnd.dolby.mps": {
    source: "iana"
  },
  "audio/vnd.dolby.pl2": {
    source: "iana"
  },
  "audio/vnd.dolby.pl2x": {
    source: "iana"
  },
  "audio/vnd.dolby.pl2z": {
    source: "iana"
  },
  "audio/vnd.dolby.pulse.1": {
    source: "iana"
  },
  "audio/vnd.dra": {
    source: "iana",
    extensions: [
      "dra"
    ]
  },
  "audio/vnd.dts": {
    source: "iana",
    extensions: [
      "dts"
    ]
  },
  "audio/vnd.dts.hd": {
    source: "iana",
    extensions: [
      "dtshd"
    ]
  },
  "audio/vnd.dts.uhd": {
    source: "iana"
  },
  "audio/vnd.dvb.file": {
    source: "iana"
  },
  "audio/vnd.everad.plj": {
    source: "iana"
  },
  "audio/vnd.hns.audio": {
    source: "iana"
  },
  "audio/vnd.lucent.voice": {
    source: "iana",
    extensions: [
      "lvp"
    ]
  },
  "audio/vnd.ms-playready.media.pya": {
    source: "iana",
    extensions: [
      "pya"
    ]
  },
  "audio/vnd.nokia.mobile-xmf": {
    source: "iana"
  },
  "audio/vnd.nortel.vbk": {
    source: "iana"
  },
  "audio/vnd.nuera.ecelp4800": {
    source: "iana",
    extensions: [
      "ecelp4800"
    ]
  },
  "audio/vnd.nuera.ecelp7470": {
    source: "iana",
    extensions: [
      "ecelp7470"
    ]
  },
  "audio/vnd.nuera.ecelp9600": {
    source: "iana",
    extensions: [
      "ecelp9600"
    ]
  },
  "audio/vnd.octel.sbc": {
    source: "iana"
  },
  "audio/vnd.presonus.multitrack": {
    source: "iana"
  },
  "audio/vnd.qcelp": {
    source: "iana"
  },
  "audio/vnd.rhetorex.32kadpcm": {
    source: "iana"
  },
  "audio/vnd.rip": {
    source: "iana",
    extensions: [
      "rip"
    ]
  },
  "audio/vnd.rn-realaudio": {
    compressible: !1
  },
  "audio/vnd.sealedmedia.softseal.mpeg": {
    source: "iana"
  },
  "audio/vnd.vmx.cvsd": {
    source: "iana"
  },
  "audio/vnd.wave": {
    compressible: !1
  },
  "audio/vorbis": {
    source: "iana",
    compressible: !1
  },
  "audio/vorbis-config": {
    source: "iana"
  },
  "audio/wav": {
    compressible: !1,
    extensions: [
      "wav"
    ]
  },
  "audio/wave": {
    compressible: !1,
    extensions: [
      "wav"
    ]
  },
  "audio/webm": {
    source: "apache",
    compressible: !1,
    extensions: [
      "weba"
    ]
  },
  "audio/x-aac": {
    source: "apache",
    compressible: !1,
    extensions: [
      "aac"
    ]
  },
  "audio/x-aiff": {
    source: "apache",
    extensions: [
      "aif",
      "aiff",
      "aifc"
    ]
  },
  "audio/x-caf": {
    source: "apache",
    compressible: !1,
    extensions: [
      "caf"
    ]
  },
  "audio/x-flac": {
    source: "apache",
    extensions: [
      "flac"
    ]
  },
  "audio/x-m4a": {
    source: "nginx",
    extensions: [
      "m4a"
    ]
  },
  "audio/x-matroska": {
    source: "apache",
    extensions: [
      "mka"
    ]
  },
  "audio/x-mpegurl": {
    source: "apache",
    extensions: [
      "m3u"
    ]
  },
  "audio/x-ms-wax": {
    source: "apache",
    extensions: [
      "wax"
    ]
  },
  "audio/x-ms-wma": {
    source: "apache",
    extensions: [
      "wma"
    ]
  },
  "audio/x-pn-realaudio": {
    source: "apache",
    extensions: [
      "ram",
      "ra"
    ]
  },
  "audio/x-pn-realaudio-plugin": {
    source: "apache",
    extensions: [
      "rmp"
    ]
  },
  "audio/x-realaudio": {
    source: "nginx",
    extensions: [
      "ra"
    ]
  },
  "audio/x-tta": {
    source: "apache"
  },
  "audio/x-wav": {
    source: "apache",
    extensions: [
      "wav"
    ]
  },
  "audio/xm": {
    source: "apache",
    extensions: [
      "xm"
    ]
  },
  "chemical/x-cdx": {
    source: "apache",
    extensions: [
      "cdx"
    ]
  },
  "chemical/x-cif": {
    source: "apache",
    extensions: [
      "cif"
    ]
  },
  "chemical/x-cmdf": {
    source: "apache",
    extensions: [
      "cmdf"
    ]
  },
  "chemical/x-cml": {
    source: "apache",
    extensions: [
      "cml"
    ]
  },
  "chemical/x-csml": {
    source: "apache",
    extensions: [
      "csml"
    ]
  },
  "chemical/x-pdb": {
    source: "apache"
  },
  "chemical/x-xyz": {
    source: "apache",
    extensions: [
      "xyz"
    ]
  },
  "font/collection": {
    source: "iana",
    extensions: [
      "ttc"
    ]
  },
  "font/otf": {
    source: "iana",
    compressible: !0,
    extensions: [
      "otf"
    ]
  },
  "font/sfnt": {
    source: "iana"
  },
  "font/ttf": {
    source: "iana",
    compressible: !0,
    extensions: [
      "ttf"
    ]
  },
  "font/woff": {
    source: "iana",
    extensions: [
      "woff"
    ]
  },
  "font/woff2": {
    source: "iana",
    extensions: [
      "woff2"
    ]
  },
  "image/aces": {
    source: "iana",
    extensions: [
      "exr"
    ]
  },
  "image/apng": {
    compressible: !1,
    extensions: [
      "apng"
    ]
  },
  "image/avci": {
    source: "iana",
    extensions: [
      "avci"
    ]
  },
  "image/avcs": {
    source: "iana",
    extensions: [
      "avcs"
    ]
  },
  "image/avif": {
    source: "iana",
    compressible: !1,
    extensions: [
      "avif"
    ]
  },
  "image/bmp": {
    source: "iana",
    compressible: !0,
    extensions: [
      "bmp"
    ]
  },
  "image/cgm": {
    source: "iana",
    extensions: [
      "cgm"
    ]
  },
  "image/dicom-rle": {
    source: "iana",
    extensions: [
      "drle"
    ]
  },
  "image/emf": {
    source: "iana",
    extensions: [
      "emf"
    ]
  },
  "image/fits": {
    source: "iana",
    extensions: [
      "fits"
    ]
  },
  "image/g3fax": {
    source: "iana",
    extensions: [
      "g3"
    ]
  },
  "image/gif": {
    source: "iana",
    compressible: !1,
    extensions: [
      "gif"
    ]
  },
  "image/heic": {
    source: "iana",
    extensions: [
      "heic"
    ]
  },
  "image/heic-sequence": {
    source: "iana",
    extensions: [
      "heics"
    ]
  },
  "image/heif": {
    source: "iana",
    extensions: [
      "heif"
    ]
  },
  "image/heif-sequence": {
    source: "iana",
    extensions: [
      "heifs"
    ]
  },
  "image/hej2k": {
    source: "iana",
    extensions: [
      "hej2"
    ]
  },
  "image/hsj2": {
    source: "iana",
    extensions: [
      "hsj2"
    ]
  },
  "image/ief": {
    source: "iana",
    extensions: [
      "ief"
    ]
  },
  "image/jls": {
    source: "iana",
    extensions: [
      "jls"
    ]
  },
  "image/jp2": {
    source: "iana",
    compressible: !1,
    extensions: [
      "jp2",
      "jpg2"
    ]
  },
  "image/jpeg": {
    source: "iana",
    compressible: !1,
    extensions: [
      "jpeg",
      "jpg",
      "jpe"
    ]
  },
  "image/jph": {
    source: "iana",
    extensions: [
      "jph"
    ]
  },
  "image/jphc": {
    source: "iana",
    extensions: [
      "jhc"
    ]
  },
  "image/jpm": {
    source: "iana",
    compressible: !1,
    extensions: [
      "jpm"
    ]
  },
  "image/jpx": {
    source: "iana",
    compressible: !1,
    extensions: [
      "jpx",
      "jpf"
    ]
  },
  "image/jxr": {
    source: "iana",
    extensions: [
      "jxr"
    ]
  },
  "image/jxra": {
    source: "iana",
    extensions: [
      "jxra"
    ]
  },
  "image/jxrs": {
    source: "iana",
    extensions: [
      "jxrs"
    ]
  },
  "image/jxs": {
    source: "iana",
    extensions: [
      "jxs"
    ]
  },
  "image/jxsc": {
    source: "iana",
    extensions: [
      "jxsc"
    ]
  },
  "image/jxsi": {
    source: "iana",
    extensions: [
      "jxsi"
    ]
  },
  "image/jxss": {
    source: "iana",
    extensions: [
      "jxss"
    ]
  },
  "image/ktx": {
    source: "iana",
    extensions: [
      "ktx"
    ]
  },
  "image/ktx2": {
    source: "iana",
    extensions: [
      "ktx2"
    ]
  },
  "image/naplps": {
    source: "iana"
  },
  "image/pjpeg": {
    compressible: !1
  },
  "image/png": {
    source: "iana",
    compressible: !1,
    extensions: [
      "png"
    ]
  },
  "image/prs.btif": {
    source: "iana",
    extensions: [
      "btif"
    ]
  },
  "image/prs.pti": {
    source: "iana",
    extensions: [
      "pti"
    ]
  },
  "image/pwg-raster": {
    source: "iana"
  },
  "image/sgi": {
    source: "apache",
    extensions: [
      "sgi"
    ]
  },
  "image/svg+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "svg",
      "svgz"
    ]
  },
  "image/t38": {
    source: "iana",
    extensions: [
      "t38"
    ]
  },
  "image/tiff": {
    source: "iana",
    compressible: !1,
    extensions: [
      "tif",
      "tiff"
    ]
  },
  "image/tiff-fx": {
    source: "iana",
    extensions: [
      "tfx"
    ]
  },
  "image/vnd.adobe.photoshop": {
    source: "iana",
    compressible: !0,
    extensions: [
      "psd"
    ]
  },
  "image/vnd.airzip.accelerator.azv": {
    source: "iana",
    extensions: [
      "azv"
    ]
  },
  "image/vnd.cns.inf2": {
    source: "iana"
  },
  "image/vnd.dece.graphic": {
    source: "iana",
    extensions: [
      "uvi",
      "uvvi",
      "uvg",
      "uvvg"
    ]
  },
  "image/vnd.djvu": {
    source: "iana",
    extensions: [
      "djvu",
      "djv"
    ]
  },
  "image/vnd.dvb.subtitle": {
    source: "iana",
    extensions: [
      "sub"
    ]
  },
  "image/vnd.dwg": {
    source: "iana",
    extensions: [
      "dwg"
    ]
  },
  "image/vnd.dxf": {
    source: "iana",
    extensions: [
      "dxf"
    ]
  },
  "image/vnd.fastbidsheet": {
    source: "iana",
    extensions: [
      "fbs"
    ]
  },
  "image/vnd.fpx": {
    source: "iana",
    extensions: [
      "fpx"
    ]
  },
  "image/vnd.fst": {
    source: "iana",
    extensions: [
      "fst"
    ]
  },
  "image/vnd.fujixerox.edmics-mmr": {
    source: "iana",
    extensions: [
      "mmr"
    ]
  },
  "image/vnd.fujixerox.edmics-rlc": {
    source: "iana",
    extensions: [
      "rlc"
    ]
  },
  "image/vnd.globalgraphics.pgb": {
    source: "iana"
  },
  "image/vnd.microsoft.icon": {
    source: "iana",
    compressible: !0,
    extensions: [
      "ico"
    ]
  },
  "image/vnd.mix": {
    source: "iana"
  },
  "image/vnd.mozilla.apng": {
    source: "iana"
  },
  "image/vnd.ms-dds": {
    compressible: !0,
    extensions: [
      "dds"
    ]
  },
  "image/vnd.ms-modi": {
    source: "iana",
    extensions: [
      "mdi"
    ]
  },
  "image/vnd.ms-photo": {
    source: "apache",
    extensions: [
      "wdp"
    ]
  },
  "image/vnd.net-fpx": {
    source: "iana",
    extensions: [
      "npx"
    ]
  },
  "image/vnd.pco.b16": {
    source: "iana",
    extensions: [
      "b16"
    ]
  },
  "image/vnd.radiance": {
    source: "iana"
  },
  "image/vnd.sealed.png": {
    source: "iana"
  },
  "image/vnd.sealedmedia.softseal.gif": {
    source: "iana"
  },
  "image/vnd.sealedmedia.softseal.jpg": {
    source: "iana"
  },
  "image/vnd.svf": {
    source: "iana"
  },
  "image/vnd.tencent.tap": {
    source: "iana",
    extensions: [
      "tap"
    ]
  },
  "image/vnd.valve.source.texture": {
    source: "iana",
    extensions: [
      "vtf"
    ]
  },
  "image/vnd.wap.wbmp": {
    source: "iana",
    extensions: [
      "wbmp"
    ]
  },
  "image/vnd.xiff": {
    source: "iana",
    extensions: [
      "xif"
    ]
  },
  "image/vnd.zbrush.pcx": {
    source: "iana",
    extensions: [
      "pcx"
    ]
  },
  "image/webp": {
    source: "apache",
    extensions: [
      "webp"
    ]
  },
  "image/wmf": {
    source: "iana",
    extensions: [
      "wmf"
    ]
  },
  "image/x-3ds": {
    source: "apache",
    extensions: [
      "3ds"
    ]
  },
  "image/x-cmu-raster": {
    source: "apache",
    extensions: [
      "ras"
    ]
  },
  "image/x-cmx": {
    source: "apache",
    extensions: [
      "cmx"
    ]
  },
  "image/x-freehand": {
    source: "apache",
    extensions: [
      "fh",
      "fhc",
      "fh4",
      "fh5",
      "fh7"
    ]
  },
  "image/x-icon": {
    source: "apache",
    compressible: !0,
    extensions: [
      "ico"
    ]
  },
  "image/x-jng": {
    source: "nginx",
    extensions: [
      "jng"
    ]
  },
  "image/x-mrsid-image": {
    source: "apache",
    extensions: [
      "sid"
    ]
  },
  "image/x-ms-bmp": {
    source: "nginx",
    compressible: !0,
    extensions: [
      "bmp"
    ]
  },
  "image/x-pcx": {
    source: "apache",
    extensions: [
      "pcx"
    ]
  },
  "image/x-pict": {
    source: "apache",
    extensions: [
      "pic",
      "pct"
    ]
  },
  "image/x-portable-anymap": {
    source: "apache",
    extensions: [
      "pnm"
    ]
  },
  "image/x-portable-bitmap": {
    source: "apache",
    extensions: [
      "pbm"
    ]
  },
  "image/x-portable-graymap": {
    source: "apache",
    extensions: [
      "pgm"
    ]
  },
  "image/x-portable-pixmap": {
    source: "apache",
    extensions: [
      "ppm"
    ]
  },
  "image/x-rgb": {
    source: "apache",
    extensions: [
      "rgb"
    ]
  },
  "image/x-tga": {
    source: "apache",
    extensions: [
      "tga"
    ]
  },
  "image/x-xbitmap": {
    source: "apache",
    extensions: [
      "xbm"
    ]
  },
  "image/x-xcf": {
    compressible: !1
  },
  "image/x-xpixmap": {
    source: "apache",
    extensions: [
      "xpm"
    ]
  },
  "image/x-xwindowdump": {
    source: "apache",
    extensions: [
      "xwd"
    ]
  },
  "message/cpim": {
    source: "iana"
  },
  "message/delivery-status": {
    source: "iana"
  },
  "message/disposition-notification": {
    source: "iana",
    extensions: [
      "disposition-notification"
    ]
  },
  "message/external-body": {
    source: "iana"
  },
  "message/feedback-report": {
    source: "iana"
  },
  "message/global": {
    source: "iana",
    extensions: [
      "u8msg"
    ]
  },
  "message/global-delivery-status": {
    source: "iana",
    extensions: [
      "u8dsn"
    ]
  },
  "message/global-disposition-notification": {
    source: "iana",
    extensions: [
      "u8mdn"
    ]
  },
  "message/global-headers": {
    source: "iana",
    extensions: [
      "u8hdr"
    ]
  },
  "message/http": {
    source: "iana",
    compressible: !1
  },
  "message/imdn+xml": {
    source: "iana",
    compressible: !0
  },
  "message/news": {
    source: "iana"
  },
  "message/partial": {
    source: "iana",
    compressible: !1
  },
  "message/rfc822": {
    source: "iana",
    compressible: !0,
    extensions: [
      "eml",
      "mime"
    ]
  },
  "message/s-http": {
    source: "iana"
  },
  "message/sip": {
    source: "iana"
  },
  "message/sipfrag": {
    source: "iana"
  },
  "message/tracking-status": {
    source: "iana"
  },
  "message/vnd.si.simp": {
    source: "iana"
  },
  "message/vnd.wfa.wsc": {
    source: "iana",
    extensions: [
      "wsc"
    ]
  },
  "model/3mf": {
    source: "iana",
    extensions: [
      "3mf"
    ]
  },
  "model/e57": {
    source: "iana"
  },
  "model/gltf+json": {
    source: "iana",
    compressible: !0,
    extensions: [
      "gltf"
    ]
  },
  "model/gltf-binary": {
    source: "iana",
    compressible: !0,
    extensions: [
      "glb"
    ]
  },
  "model/iges": {
    source: "iana",
    compressible: !1,
    extensions: [
      "igs",
      "iges"
    ]
  },
  "model/mesh": {
    source: "iana",
    compressible: !1,
    extensions: [
      "msh",
      "mesh",
      "silo"
    ]
  },
  "model/mtl": {
    source: "iana",
    extensions: [
      "mtl"
    ]
  },
  "model/obj": {
    source: "iana",
    extensions: [
      "obj"
    ]
  },
  "model/step": {
    source: "iana"
  },
  "model/step+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "stpx"
    ]
  },
  "model/step+zip": {
    source: "iana",
    compressible: !1,
    extensions: [
      "stpz"
    ]
  },
  "model/step-xml+zip": {
    source: "iana",
    compressible: !1,
    extensions: [
      "stpxz"
    ]
  },
  "model/stl": {
    source: "iana",
    extensions: [
      "stl"
    ]
  },
  "model/vnd.collada+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "dae"
    ]
  },
  "model/vnd.dwf": {
    source: "iana",
    extensions: [
      "dwf"
    ]
  },
  "model/vnd.flatland.3dml": {
    source: "iana"
  },
  "model/vnd.gdl": {
    source: "iana",
    extensions: [
      "gdl"
    ]
  },
  "model/vnd.gs-gdl": {
    source: "apache"
  },
  "model/vnd.gs.gdl": {
    source: "iana"
  },
  "model/vnd.gtw": {
    source: "iana",
    extensions: [
      "gtw"
    ]
  },
  "model/vnd.moml+xml": {
    source: "iana",
    compressible: !0
  },
  "model/vnd.mts": {
    source: "iana",
    extensions: [
      "mts"
    ]
  },
  "model/vnd.opengex": {
    source: "iana",
    extensions: [
      "ogex"
    ]
  },
  "model/vnd.parasolid.transmit.binary": {
    source: "iana",
    extensions: [
      "x_b"
    ]
  },
  "model/vnd.parasolid.transmit.text": {
    source: "iana",
    extensions: [
      "x_t"
    ]
  },
  "model/vnd.pytha.pyox": {
    source: "iana"
  },
  "model/vnd.rosette.annotated-data-model": {
    source: "iana"
  },
  "model/vnd.sap.vds": {
    source: "iana",
    extensions: [
      "vds"
    ]
  },
  "model/vnd.usdz+zip": {
    source: "iana",
    compressible: !1,
    extensions: [
      "usdz"
    ]
  },
  "model/vnd.valve.source.compiled-map": {
    source: "iana",
    extensions: [
      "bsp"
    ]
  },
  "model/vnd.vtu": {
    source: "iana",
    extensions: [
      "vtu"
    ]
  },
  "model/vrml": {
    source: "iana",
    compressible: !1,
    extensions: [
      "wrl",
      "vrml"
    ]
  },
  "model/x3d+binary": {
    source: "apache",
    compressible: !1,
    extensions: [
      "x3db",
      "x3dbz"
    ]
  },
  "model/x3d+fastinfoset": {
    source: "iana",
    extensions: [
      "x3db"
    ]
  },
  "model/x3d+vrml": {
    source: "apache",
    compressible: !1,
    extensions: [
      "x3dv",
      "x3dvz"
    ]
  },
  "model/x3d+xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "x3d",
      "x3dz"
    ]
  },
  "model/x3d-vrml": {
    source: "iana",
    extensions: [
      "x3dv"
    ]
  },
  "multipart/alternative": {
    source: "iana",
    compressible: !1
  },
  "multipart/appledouble": {
    source: "iana"
  },
  "multipart/byteranges": {
    source: "iana"
  },
  "multipart/digest": {
    source: "iana"
  },
  "multipart/encrypted": {
    source: "iana",
    compressible: !1
  },
  "multipart/form-data": {
    source: "iana",
    compressible: !1
  },
  "multipart/header-set": {
    source: "iana"
  },
  "multipart/mixed": {
    source: "iana"
  },
  "multipart/multilingual": {
    source: "iana"
  },
  "multipart/parallel": {
    source: "iana"
  },
  "multipart/related": {
    source: "iana",
    compressible: !1
  },
  "multipart/report": {
    source: "iana"
  },
  "multipart/signed": {
    source: "iana",
    compressible: !1
  },
  "multipart/vnd.bint.med-plus": {
    source: "iana"
  },
  "multipart/voice-message": {
    source: "iana"
  },
  "multipart/x-mixed-replace": {
    source: "iana"
  },
  "text/1d-interleaved-parityfec": {
    source: "iana"
  },
  "text/cache-manifest": {
    source: "iana",
    compressible: !0,
    extensions: [
      "appcache",
      "manifest"
    ]
  },
  "text/calendar": {
    source: "iana",
    extensions: [
      "ics",
      "ifb"
    ]
  },
  "text/calender": {
    compressible: !0
  },
  "text/cmd": {
    compressible: !0
  },
  "text/coffeescript": {
    extensions: [
      "coffee",
      "litcoffee"
    ]
  },
  "text/cql": {
    source: "iana"
  },
  "text/cql-expression": {
    source: "iana"
  },
  "text/cql-identifier": {
    source: "iana"
  },
  "text/css": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0,
    extensions: [
      "css"
    ]
  },
  "text/csv": {
    source: "iana",
    compressible: !0,
    extensions: [
      "csv"
    ]
  },
  "text/csv-schema": {
    source: "iana"
  },
  "text/directory": {
    source: "iana"
  },
  "text/dns": {
    source: "iana"
  },
  "text/ecmascript": {
    source: "iana"
  },
  "text/encaprtp": {
    source: "iana"
  },
  "text/enriched": {
    source: "iana"
  },
  "text/fhirpath": {
    source: "iana"
  },
  "text/flexfec": {
    source: "iana"
  },
  "text/fwdred": {
    source: "iana"
  },
  "text/gff3": {
    source: "iana"
  },
  "text/grammar-ref-list": {
    source: "iana"
  },
  "text/html": {
    source: "iana",
    compressible: !0,
    extensions: [
      "html",
      "htm",
      "shtml"
    ]
  },
  "text/jade": {
    extensions: [
      "jade"
    ]
  },
  "text/javascript": {
    source: "iana",
    compressible: !0
  },
  "text/jcr-cnd": {
    source: "iana"
  },
  "text/jsx": {
    compressible: !0,
    extensions: [
      "jsx"
    ]
  },
  "text/less": {
    compressible: !0,
    extensions: [
      "less"
    ]
  },
  "text/markdown": {
    source: "iana",
    compressible: !0,
    extensions: [
      "markdown",
      "md"
    ]
  },
  "text/mathml": {
    source: "nginx",
    extensions: [
      "mml"
    ]
  },
  "text/mdx": {
    compressible: !0,
    extensions: [
      "mdx"
    ]
  },
  "text/mizar": {
    source: "iana"
  },
  "text/n3": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0,
    extensions: [
      "n3"
    ]
  },
  "text/parameters": {
    source: "iana",
    charset: "UTF-8"
  },
  "text/parityfec": {
    source: "iana"
  },
  "text/plain": {
    source: "iana",
    compressible: !0,
    extensions: [
      "txt",
      "text",
      "conf",
      "def",
      "list",
      "log",
      "in",
      "ini"
    ]
  },
  "text/provenance-notation": {
    source: "iana",
    charset: "UTF-8"
  },
  "text/prs.fallenstein.rst": {
    source: "iana"
  },
  "text/prs.lines.tag": {
    source: "iana",
    extensions: [
      "dsc"
    ]
  },
  "text/prs.prop.logic": {
    source: "iana"
  },
  "text/raptorfec": {
    source: "iana"
  },
  "text/red": {
    source: "iana"
  },
  "text/rfc822-headers": {
    source: "iana"
  },
  "text/richtext": {
    source: "iana",
    compressible: !0,
    extensions: [
      "rtx"
    ]
  },
  "text/rtf": {
    source: "iana",
    compressible: !0,
    extensions: [
      "rtf"
    ]
  },
  "text/rtp-enc-aescm128": {
    source: "iana"
  },
  "text/rtploopback": {
    source: "iana"
  },
  "text/rtx": {
    source: "iana"
  },
  "text/sgml": {
    source: "iana",
    extensions: [
      "sgml",
      "sgm"
    ]
  },
  "text/shaclc": {
    source: "iana"
  },
  "text/shex": {
    source: "iana",
    extensions: [
      "shex"
    ]
  },
  "text/slim": {
    extensions: [
      "slim",
      "slm"
    ]
  },
  "text/spdx": {
    source: "iana",
    extensions: [
      "spdx"
    ]
  },
  "text/strings": {
    source: "iana"
  },
  "text/stylus": {
    extensions: [
      "stylus",
      "styl"
    ]
  },
  "text/t140": {
    source: "iana"
  },
  "text/tab-separated-values": {
    source: "iana",
    compressible: !0,
    extensions: [
      "tsv"
    ]
  },
  "text/troff": {
    source: "iana",
    extensions: [
      "t",
      "tr",
      "roff",
      "man",
      "me",
      "ms"
    ]
  },
  "text/turtle": {
    source: "iana",
    charset: "UTF-8",
    extensions: [
      "ttl"
    ]
  },
  "text/ulpfec": {
    source: "iana"
  },
  "text/uri-list": {
    source: "iana",
    compressible: !0,
    extensions: [
      "uri",
      "uris",
      "urls"
    ]
  },
  "text/vcard": {
    source: "iana",
    compressible: !0,
    extensions: [
      "vcard"
    ]
  },
  "text/vnd.a": {
    source: "iana"
  },
  "text/vnd.abc": {
    source: "iana"
  },
  "text/vnd.ascii-art": {
    source: "iana"
  },
  "text/vnd.curl": {
    source: "iana",
    extensions: [
      "curl"
    ]
  },
  "text/vnd.curl.dcurl": {
    source: "apache",
    extensions: [
      "dcurl"
    ]
  },
  "text/vnd.curl.mcurl": {
    source: "apache",
    extensions: [
      "mcurl"
    ]
  },
  "text/vnd.curl.scurl": {
    source: "apache",
    extensions: [
      "scurl"
    ]
  },
  "text/vnd.debian.copyright": {
    source: "iana",
    charset: "UTF-8"
  },
  "text/vnd.dmclientscript": {
    source: "iana"
  },
  "text/vnd.dvb.subtitle": {
    source: "iana",
    extensions: [
      "sub"
    ]
  },
  "text/vnd.esmertec.theme-descriptor": {
    source: "iana",
    charset: "UTF-8"
  },
  "text/vnd.familysearch.gedcom": {
    source: "iana",
    extensions: [
      "ged"
    ]
  },
  "text/vnd.ficlab.flt": {
    source: "iana"
  },
  "text/vnd.fly": {
    source: "iana",
    extensions: [
      "fly"
    ]
  },
  "text/vnd.fmi.flexstor": {
    source: "iana",
    extensions: [
      "flx"
    ]
  },
  "text/vnd.gml": {
    source: "iana"
  },
  "text/vnd.graphviz": {
    source: "iana",
    extensions: [
      "gv"
    ]
  },
  "text/vnd.hans": {
    source: "iana"
  },
  "text/vnd.hgl": {
    source: "iana"
  },
  "text/vnd.in3d.3dml": {
    source: "iana",
    extensions: [
      "3dml"
    ]
  },
  "text/vnd.in3d.spot": {
    source: "iana",
    extensions: [
      "spot"
    ]
  },
  "text/vnd.iptc.newsml": {
    source: "iana"
  },
  "text/vnd.iptc.nitf": {
    source: "iana"
  },
  "text/vnd.latex-z": {
    source: "iana"
  },
  "text/vnd.motorola.reflex": {
    source: "iana"
  },
  "text/vnd.ms-mediapackage": {
    source: "iana"
  },
  "text/vnd.net2phone.commcenter.command": {
    source: "iana"
  },
  "text/vnd.radisys.msml-basic-layout": {
    source: "iana"
  },
  "text/vnd.senx.warpscript": {
    source: "iana"
  },
  "text/vnd.si.uricatalogue": {
    source: "iana"
  },
  "text/vnd.sosi": {
    source: "iana"
  },
  "text/vnd.sun.j2me.app-descriptor": {
    source: "iana",
    charset: "UTF-8",
    extensions: [
      "jad"
    ]
  },
  "text/vnd.trolltech.linguist": {
    source: "iana",
    charset: "UTF-8"
  },
  "text/vnd.wap.si": {
    source: "iana"
  },
  "text/vnd.wap.sl": {
    source: "iana"
  },
  "text/vnd.wap.wml": {
    source: "iana",
    extensions: [
      "wml"
    ]
  },
  "text/vnd.wap.wmlscript": {
    source: "iana",
    extensions: [
      "wmls"
    ]
  },
  "text/vtt": {
    source: "iana",
    charset: "UTF-8",
    compressible: !0,
    extensions: [
      "vtt"
    ]
  },
  "text/x-asm": {
    source: "apache",
    extensions: [
      "s",
      "asm"
    ]
  },
  "text/x-c": {
    source: "apache",
    extensions: [
      "c",
      "cc",
      "cxx",
      "cpp",
      "h",
      "hh",
      "dic"
    ]
  },
  "text/x-component": {
    source: "nginx",
    extensions: [
      "htc"
    ]
  },
  "text/x-fortran": {
    source: "apache",
    extensions: [
      "f",
      "for",
      "f77",
      "f90"
    ]
  },
  "text/x-gwt-rpc": {
    compressible: !0
  },
  "text/x-handlebars-template": {
    extensions: [
      "hbs"
    ]
  },
  "text/x-java-source": {
    source: "apache",
    extensions: [
      "java"
    ]
  },
  "text/x-jquery-tmpl": {
    compressible: !0
  },
  "text/x-lua": {
    extensions: [
      "lua"
    ]
  },
  "text/x-markdown": {
    compressible: !0,
    extensions: [
      "mkd"
    ]
  },
  "text/x-nfo": {
    source: "apache",
    extensions: [
      "nfo"
    ]
  },
  "text/x-opml": {
    source: "apache",
    extensions: [
      "opml"
    ]
  },
  "text/x-org": {
    compressible: !0,
    extensions: [
      "org"
    ]
  },
  "text/x-pascal": {
    source: "apache",
    extensions: [
      "p",
      "pas"
    ]
  },
  "text/x-processing": {
    compressible: !0,
    extensions: [
      "pde"
    ]
  },
  "text/x-sass": {
    extensions: [
      "sass"
    ]
  },
  "text/x-scss": {
    extensions: [
      "scss"
    ]
  },
  "text/x-setext": {
    source: "apache",
    extensions: [
      "etx"
    ]
  },
  "text/x-sfv": {
    source: "apache",
    extensions: [
      "sfv"
    ]
  },
  "text/x-suse-ymp": {
    compressible: !0,
    extensions: [
      "ymp"
    ]
  },
  "text/x-uuencode": {
    source: "apache",
    extensions: [
      "uu"
    ]
  },
  "text/x-vcalendar": {
    source: "apache",
    extensions: [
      "vcs"
    ]
  },
  "text/x-vcard": {
    source: "apache",
    extensions: [
      "vcf"
    ]
  },
  "text/xml": {
    source: "iana",
    compressible: !0,
    extensions: [
      "xml"
    ]
  },
  "text/xml-external-parsed-entity": {
    source: "iana"
  },
  "text/yaml": {
    compressible: !0,
    extensions: [
      "yaml",
      "yml"
    ]
  },
  "video/1d-interleaved-parityfec": {
    source: "iana"
  },
  "video/3gpp": {
    source: "iana",
    extensions: [
      "3gp",
      "3gpp"
    ]
  },
  "video/3gpp-tt": {
    source: "iana"
  },
  "video/3gpp2": {
    source: "iana",
    extensions: [
      "3g2"
    ]
  },
  "video/av1": {
    source: "iana"
  },
  "video/bmpeg": {
    source: "iana"
  },
  "video/bt656": {
    source: "iana"
  },
  "video/celb": {
    source: "iana"
  },
  "video/dv": {
    source: "iana"
  },
  "video/encaprtp": {
    source: "iana"
  },
  "video/ffv1": {
    source: "iana"
  },
  "video/flexfec": {
    source: "iana"
  },
  "video/h261": {
    source: "iana",
    extensions: [
      "h261"
    ]
  },
  "video/h263": {
    source: "iana",
    extensions: [
      "h263"
    ]
  },
  "video/h263-1998": {
    source: "iana"
  },
  "video/h263-2000": {
    source: "iana"
  },
  "video/h264": {
    source: "iana",
    extensions: [
      "h264"
    ]
  },
  "video/h264-rcdo": {
    source: "iana"
  },
  "video/h264-svc": {
    source: "iana"
  },
  "video/h265": {
    source: "iana"
  },
  "video/iso.segment": {
    source: "iana",
    extensions: [
      "m4s"
    ]
  },
  "video/jpeg": {
    source: "iana",
    extensions: [
      "jpgv"
    ]
  },
  "video/jpeg2000": {
    source: "iana"
  },
  "video/jpm": {
    source: "apache",
    extensions: [
      "jpm",
      "jpgm"
    ]
  },
  "video/jxsv": {
    source: "iana"
  },
  "video/mj2": {
    source: "iana",
    extensions: [
      "mj2",
      "mjp2"
    ]
  },
  "video/mp1s": {
    source: "iana"
  },
  "video/mp2p": {
    source: "iana"
  },
  "video/mp2t": {
    source: "iana",
    extensions: [
      "ts"
    ]
  },
  "video/mp4": {
    source: "iana",
    compressible: !1,
    extensions: [
      "mp4",
      "mp4v",
      "mpg4"
    ]
  },
  "video/mp4v-es": {
    source: "iana"
  },
  "video/mpeg": {
    source: "iana",
    compressible: !1,
    extensions: [
      "mpeg",
      "mpg",
      "mpe",
      "m1v",
      "m2v"
    ]
  },
  "video/mpeg4-generic": {
    source: "iana"
  },
  "video/mpv": {
    source: "iana"
  },
  "video/nv": {
    source: "iana"
  },
  "video/ogg": {
    source: "iana",
    compressible: !1,
    extensions: [
      "ogv"
    ]
  },
  "video/parityfec": {
    source: "iana"
  },
  "video/pointer": {
    source: "iana"
  },
  "video/quicktime": {
    source: "iana",
    compressible: !1,
    extensions: [
      "qt",
      "mov"
    ]
  },
  "video/raptorfec": {
    source: "iana"
  },
  "video/raw": {
    source: "iana"
  },
  "video/rtp-enc-aescm128": {
    source: "iana"
  },
  "video/rtploopback": {
    source: "iana"
  },
  "video/rtx": {
    source: "iana"
  },
  "video/scip": {
    source: "iana"
  },
  "video/smpte291": {
    source: "iana"
  },
  "video/smpte292m": {
    source: "iana"
  },
  "video/ulpfec": {
    source: "iana"
  },
  "video/vc1": {
    source: "iana"
  },
  "video/vc2": {
    source: "iana"
  },
  "video/vnd.cctv": {
    source: "iana"
  },
  "video/vnd.dece.hd": {
    source: "iana",
    extensions: [
      "uvh",
      "uvvh"
    ]
  },
  "video/vnd.dece.mobile": {
    source: "iana",
    extensions: [
      "uvm",
      "uvvm"
    ]
  },
  "video/vnd.dece.mp4": {
    source: "iana"
  },
  "video/vnd.dece.pd": {
    source: "iana",
    extensions: [
      "uvp",
      "uvvp"
    ]
  },
  "video/vnd.dece.sd": {
    source: "iana",
    extensions: [
      "uvs",
      "uvvs"
    ]
  },
  "video/vnd.dece.video": {
    source: "iana",
    extensions: [
      "uvv",
      "uvvv"
    ]
  },
  "video/vnd.directv.mpeg": {
    source: "iana"
  },
  "video/vnd.directv.mpeg-tts": {
    source: "iana"
  },
  "video/vnd.dlna.mpeg-tts": {
    source: "iana"
  },
  "video/vnd.dvb.file": {
    source: "iana",
    extensions: [
      "dvb"
    ]
  },
  "video/vnd.fvt": {
    source: "iana",
    extensions: [
      "fvt"
    ]
  },
  "video/vnd.hns.video": {
    source: "iana"
  },
  "video/vnd.iptvforum.1dparityfec-1010": {
    source: "iana"
  },
  "video/vnd.iptvforum.1dparityfec-2005": {
    source: "iana"
  },
  "video/vnd.iptvforum.2dparityfec-1010": {
    source: "iana"
  },
  "video/vnd.iptvforum.2dparityfec-2005": {
    source: "iana"
  },
  "video/vnd.iptvforum.ttsavc": {
    source: "iana"
  },
  "video/vnd.iptvforum.ttsmpeg2": {
    source: "iana"
  },
  "video/vnd.motorola.video": {
    source: "iana"
  },
  "video/vnd.motorola.videop": {
    source: "iana"
  },
  "video/vnd.mpegurl": {
    source: "iana",
    extensions: [
      "mxu",
      "m4u"
    ]
  },
  "video/vnd.ms-playready.media.pyv": {
    source: "iana",
    extensions: [
      "pyv"
    ]
  },
  "video/vnd.nokia.interleaved-multimedia": {
    source: "iana"
  },
  "video/vnd.nokia.mp4vr": {
    source: "iana"
  },
  "video/vnd.nokia.videovoip": {
    source: "iana"
  },
  "video/vnd.objectvideo": {
    source: "iana"
  },
  "video/vnd.radgamettools.bink": {
    source: "iana"
  },
  "video/vnd.radgamettools.smacker": {
    source: "iana"
  },
  "video/vnd.sealed.mpeg1": {
    source: "iana"
  },
  "video/vnd.sealed.mpeg4": {
    source: "iana"
  },
  "video/vnd.sealed.swf": {
    source: "iana"
  },
  "video/vnd.sealedmedia.softseal.mov": {
    source: "iana"
  },
  "video/vnd.uvvu.mp4": {
    source: "iana",
    extensions: [
      "uvu",
      "uvvu"
    ]
  },
  "video/vnd.vivo": {
    source: "iana",
    extensions: [
      "viv"
    ]
  },
  "video/vnd.youtube.yt": {
    source: "iana"
  },
  "video/vp8": {
    source: "iana"
  },
  "video/vp9": {
    source: "iana"
  },
  "video/webm": {
    source: "apache",
    compressible: !1,
    extensions: [
      "webm"
    ]
  },
  "video/x-f4v": {
    source: "apache",
    extensions: [
      "f4v"
    ]
  },
  "video/x-fli": {
    source: "apache",
    extensions: [
      "fli"
    ]
  },
  "video/x-flv": {
    source: "apache",
    compressible: !1,
    extensions: [
      "flv"
    ]
  },
  "video/x-m4v": {
    source: "apache",
    extensions: [
      "m4v"
    ]
  },
  "video/x-matroska": {
    source: "apache",
    compressible: !1,
    extensions: [
      "mkv",
      "mk3d",
      "mks"
    ]
  },
  "video/x-mng": {
    source: "apache",
    extensions: [
      "mng"
    ]
  },
  "video/x-ms-asf": {
    source: "apache",
    extensions: [
      "asf",
      "asx"
    ]
  },
  "video/x-ms-vob": {
    source: "apache",
    extensions: [
      "vob"
    ]
  },
  "video/x-ms-wm": {
    source: "apache",
    extensions: [
      "wm"
    ]
  },
  "video/x-ms-wmv": {
    source: "apache",
    compressible: !1,
    extensions: [
      "wmv"
    ]
  },
  "video/x-ms-wmx": {
    source: "apache",
    extensions: [
      "wmx"
    ]
  },
  "video/x-ms-wvx": {
    source: "apache",
    extensions: [
      "wvx"
    ]
  },
  "video/x-msvideo": {
    source: "apache",
    extensions: [
      "avi"
    ]
  },
  "video/x-sgi-movie": {
    source: "apache",
    extensions: [
      "movie"
    ]
  },
  "video/x-smv": {
    source: "apache",
    extensions: [
      "smv"
    ]
  },
  "x-conference/x-cooltalk": {
    source: "apache",
    extensions: [
      "ice"
    ]
  },
  "x-shader/x-fragment": {
    compressible: !0
  },
  "x-shader/x-vertex": {
    compressible: !0
  }
};
/*!
 * mime-db
 * Copyright(c) 2014 Jonathan Ong
 * Copyright(c) 2015-2022 Douglas Christopher Wilson
 * MIT Licensed
 */
var Ao = Co;
/*!
 * mime-types
 * Copyright(c) 2014 Jonathan Ong
 * Copyright(c) 2015 Douglas Christopher Wilson
 * MIT Licensed
 */
(function(e) {
  var a = Ao, n = wi.extname, i = /^\s*([^;\s]*)(?:;|\s|$)/, t = /^text\//i;
  e.charset = o, e.charsets = { lookup: o }, e.contentType = s, e.extension = c, e.extensions = /* @__PURE__ */ Object.create(null), e.lookup = d, e.types = /* @__PURE__ */ Object.create(null), m(e.extensions, e.types);
  function o(r) {
    if (!r || typeof r != "string")
      return !1;
    var p = i.exec(r), l = p && a[p[1].toLowerCase()];
    return l && l.charset ? l.charset : p && t.test(p[1]) ? "UTF-8" : !1;
  }
  function s(r) {
    if (!r || typeof r != "string")
      return !1;
    var p = r.indexOf("/") === -1 ? e.lookup(r) : r;
    if (!p)
      return !1;
    if (p.indexOf("charset") === -1) {
      var l = e.charset(p);
      l && (p += "; charset=" + l.toLowerCase());
    }
    return p;
  }
  function c(r) {
    if (!r || typeof r != "string")
      return !1;
    var p = i.exec(r), l = p && e.extensions[p[1].toLowerCase()];
    return !l || !l.length ? !1 : l[0];
  }
  function d(r) {
    if (!r || typeof r != "string")
      return !1;
    var p = n("x." + r).toLowerCase().substr(1);
    return p && e.types[p] || !1;
  }
  function m(r, p) {
    var l = ["nginx", "apache", void 0, "iana"];
    Object.keys(a).forEach(function(f) {
      var h = a[f], x = h.extensions;
      if (!(!x || !x.length)) {
        r[f] = x;
        for (var y = 0; y < x.length; y++) {
          var E = x[y];
          if (p[E]) {
            var _ = l.indexOf(a[p[E]].source), C = l.indexOf(h.source);
            if (p[E] !== "application/octet-stream" && (_ > C || _ === C && p[E].substr(0, 12) === "application/"))
              continue;
          }
          p[E] = f;
        }
      }
    });
  }
})(Bi);
var jo = Oo;
function Oo(e) {
  var a = typeof setImmediate == "function" ? setImmediate : typeof process == "object" && typeof process.nextTick == "function" ? process.nextTick : null;
  a ? a(e) : setTimeout(e, 0);
}
var Sn = jo, Di = Fo;
function Fo(e) {
  var a = !1;
  return Sn(function() {
    a = !0;
  }), function(i, t) {
    a ? e(i, t) : Sn(function() {
      e(i, t);
    });
  };
}
var Ii = Po;
function Po(e) {
  Object.keys(e.jobs).forEach(Lo.bind(e)), e.jobs = {};
}
function Lo(e) {
  typeof this.jobs[e] == "function" && this.jobs[e]();
}
var kn = Di, Uo = Ii, zi = qo;
function qo(e, a, n, i) {
  var t = n.keyedList ? n.keyedList[n.index] : n.index;
  n.jobs[t] = No(a, t, e[t], function(o, s) {
    t in n.jobs && (delete n.jobs[t], o ? Uo(n) : n.results[t] = s, i(o, n.results));
  });
}
function No(e, a, n, i) {
  var t;
  return e.length == 2 ? t = e(n, kn(i)) : t = e(n, a, kn(i)), t;
}
var $i = Bo;
function Bo(e, a) {
  var n = !Array.isArray(e), i = {
    index: 0,
    keyedList: n || a ? Object.keys(e) : null,
    jobs: {},
    results: n ? {} : [],
    size: n ? Object.keys(e).length : e.length
  };
  return a && i.keyedList.sort(n ? a : function(t, o) {
    return a(e[t], e[o]);
  }), i;
}
var Do = Ii, Io = Di, Mi = zo;
function zo(e) {
  Object.keys(this.jobs).length && (this.index = this.size, Do(this), Io(e)(null, this.results));
}
var $o = zi, Mo = $i, Ho = Mi, Go = Vo;
function Vo(e, a, n) {
  for (var i = Mo(e); i.index < (i.keyedList || e).length; )
    $o(e, a, i, function(t, o) {
      if (t) {
        n(t, o);
        return;
      }
      if (Object.keys(i.jobs).length === 0) {
        n(null, i.results);
        return;
      }
    }), i.index++;
  return Ho.bind(i, n);
}
var ua = { exports: {} }, Tn = zi, Wo = $i, Jo = Mi;
ua.exports = Ko;
ua.exports.ascending = Hi;
ua.exports.descending = Yo;
function Ko(e, a, n, i) {
  var t = Wo(e, n);
  return Tn(e, a, t, function o(s, c) {
    if (s) {
      i(s, c);
      return;
    }
    if (t.index++, t.index < (t.keyedList || e).length) {
      Tn(e, a, t, o);
      return;
    }
    i(null, t.results);
  }), Jo.bind(t, i);
}
function Hi(e, a) {
  return e < a ? -1 : e > a ? 1 : 0;
}
function Yo(e, a) {
  return -1 * Hi(e, a);
}
var Gi = ua.exports, Xo = Gi, Zo = Qo;
function Qo(e, a, n) {
  return Xo(e, a, null, n);
}
var es = {
  parallel: Go,
  serial: Zo,
  serialOrdered: Gi
}, Vi = Object, as = Error, ns = EvalError, is = RangeError, ts = ReferenceError, os = SyntaxError, va, Cn;
function nn() {
  return Cn || (Cn = 1, va = TypeError), va;
}
var ss = URIError, rs = Math.abs, cs = Math.floor, ps = Math.max, ls = Math.min, us = Math.pow, ds = Math.round, ms = Number.isNaN || function(a) {
  return a !== a;
}, fs = ms, xs = function(a) {
  return fs(a) || a === 0 ? a : a < 0 ? -1 : 1;
}, vs = Object.getOwnPropertyDescriptor, Ze = vs;
if (Ze)
  try {
    Ze([], "length");
  } catch {
    Ze = null;
  }
var Wi = Ze, Qe = Object.defineProperty || !1;
if (Qe)
  try {
    Qe({}, "a", { value: 1 });
  } catch {
    Qe = !1;
  }
var hs = Qe, ha, An;
function Ji() {
  return An || (An = 1, ha = function() {
    if (typeof Symbol != "function" || typeof Object.getOwnPropertySymbols != "function")
      return !1;
    if (typeof Symbol.iterator == "symbol")
      return !0;
    var a = {}, n = Symbol("test"), i = Object(n);
    if (typeof n == "string" || Object.prototype.toString.call(n) !== "[object Symbol]" || Object.prototype.toString.call(i) !== "[object Symbol]")
      return !1;
    var t = 42;
    a[n] = t;
    for (var o in a)
      return !1;
    if (typeof Object.keys == "function" && Object.keys(a).length !== 0 || typeof Object.getOwnPropertyNames == "function" && Object.getOwnPropertyNames(a).length !== 0)
      return !1;
    var s = Object.getOwnPropertySymbols(a);
    if (s.length !== 1 || s[0] !== n || !Object.prototype.propertyIsEnumerable.call(a, n))
      return !1;
    if (typeof Object.getOwnPropertyDescriptor == "function") {
      var c = (
        /** @type {PropertyDescriptor} */
        Object.getOwnPropertyDescriptor(a, n)
      );
      if (c.value !== t || c.enumerable !== !0)
        return !1;
    }
    return !0;
  }), ha;
}
var ba, jn;
function bs() {
  if (jn) return ba;
  jn = 1;
  var e = typeof Symbol < "u" && Symbol, a = Ji();
  return ba = function() {
    return typeof e != "function" || typeof Symbol != "function" || typeof e("foo") != "symbol" || typeof Symbol("bar") != "symbol" ? !1 : a();
  }, ba;
}
var ga, On;
function Ki() {
  return On || (On = 1, ga = typeof Reflect < "u" && Reflect.getPrototypeOf || null), ga;
}
var ya, Fn;
function Yi() {
  if (Fn) return ya;
  Fn = 1;
  var e = Vi;
  return ya = e.getPrototypeOf || null, ya;
}
var gs = "Function.prototype.bind called on incompatible ", ys = Object.prototype.toString, ws = Math.max, Es = "[object Function]", Pn = function(a, n) {
  for (var i = [], t = 0; t < a.length; t += 1)
    i[t] = a[t];
  for (var o = 0; o < n.length; o += 1)
    i[o + a.length] = n[o];
  return i;
}, _s = function(a, n) {
  for (var i = [], t = n, o = 0; t < a.length; t += 1, o += 1)
    i[o] = a[t];
  return i;
}, Rs = function(e, a) {
  for (var n = "", i = 0; i < e.length; i += 1)
    n += e[i], i + 1 < e.length && (n += a);
  return n;
}, Ss = function(a) {
  var n = this;
  if (typeof n != "function" || ys.apply(n) !== Es)
    throw new TypeError(gs + n);
  for (var i = _s(arguments, 1), t, o = function() {
    if (this instanceof t) {
      var r = n.apply(
        this,
        Pn(i, arguments)
      );
      return Object(r) === r ? r : this;
    }
    return n.apply(
      a,
      Pn(i, arguments)
    );
  }, s = ws(0, n.length - i.length), c = [], d = 0; d < s; d++)
    c[d] = "$" + d;
  if (t = Function("binder", "return function (" + Rs(c, ",") + "){ return binder.apply(this,arguments); }")(o), n.prototype) {
    var m = function() {
    };
    m.prototype = n.prototype, t.prototype = new m(), m.prototype = null;
  }
  return t;
}, ks = Ss, da = Function.prototype.bind || ks, wa, Ln;
function tn() {
  return Ln || (Ln = 1, wa = Function.prototype.call), wa;
}
var Ea, Un;
function Xi() {
  return Un || (Un = 1, Ea = Function.prototype.apply), Ea;
}
var _a, qn;
function Ts() {
  return qn || (qn = 1, _a = typeof Reflect < "u" && Reflect && Reflect.apply), _a;
}
var Ra, Nn;
function Cs() {
  if (Nn) return Ra;
  Nn = 1;
  var e = da, a = Xi(), n = tn(), i = Ts();
  return Ra = i || e.call(n, a), Ra;
}
var Sa, Bn;
function As() {
  if (Bn) return Sa;
  Bn = 1;
  var e = da, a = nn(), n = tn(), i = Cs();
  return Sa = function(o) {
    if (o.length < 1 || typeof o[0] != "function")
      throw new a("a function is required");
    return i(e, n, o);
  }, Sa;
}
var ka, Dn;
function js() {
  if (Dn) return ka;
  Dn = 1;
  var e = As(), a = Wi, n;
  try {
    n = /** @type {{ __proto__?: typeof Array.prototype }} */
    [].__proto__ === Array.prototype;
  } catch (s) {
    if (!s || typeof s != "object" || !("code" in s) || s.code !== "ERR_PROTO_ACCESS")
      throw s;
  }
  var i = !!n && a && a(
    Object.prototype,
    /** @type {keyof typeof Object.prototype} */
    "__proto__"
  ), t = Object, o = t.getPrototypeOf;
  return ka = i && typeof i.get == "function" ? e([i.get]) : typeof o == "function" ? (
    /** @type {import('./get')} */
    function(c) {
      return o(c == null ? c : t(c));
    }
  ) : !1, ka;
}
var Ta, In;
function Os() {
  if (In) return Ta;
  In = 1;
  var e = Ki(), a = Yi(), n = js();
  return Ta = e ? function(t) {
    return e(t);
  } : a ? function(t) {
    if (!t || typeof t != "object" && typeof t != "function")
      throw new TypeError("getProto: not an object");
    return a(t);
  } : n ? function(t) {
    return n(t);
  } : null, Ta;
}
var Fs = Function.prototype.call, Ps = Object.prototype.hasOwnProperty, Ls = da, on = Ls.call(Fs, Ps), R, Us = Vi, qs = as, Ns = ns, Bs = is, Ds = ts, Ce = os, ke = nn(), Is = ss, zs = rs, $s = cs, Ms = ps, Hs = ls, Gs = us, Vs = ds, Ws = xs, Zi = Function, Ca = function(e) {
  try {
    return Zi('"use strict"; return (' + e + ").constructor;")();
  } catch {
  }
}, Le = Wi, Js = hs, Aa = function() {
  throw new ke();
}, Ks = Le ? function() {
  try {
    return arguments.callee, Aa;
  } catch {
    try {
      return Le(arguments, "callee").get;
    } catch {
      return Aa;
    }
  }
}() : Aa, Ee = bs()(), N = Os(), Ys = Yi(), Xs = Ki(), Qi = Xi(), Ie = tn(), _e = {}, Zs = typeof Uint8Array > "u" || !N ? R : N(Uint8Array), fe = {
  __proto__: null,
  "%AggregateError%": typeof AggregateError > "u" ? R : AggregateError,
  "%Array%": Array,
  "%ArrayBuffer%": typeof ArrayBuffer > "u" ? R : ArrayBuffer,
  "%ArrayIteratorPrototype%": Ee && N ? N([][Symbol.iterator]()) : R,
  "%AsyncFromSyncIteratorPrototype%": R,
  "%AsyncFunction%": _e,
  "%AsyncGenerator%": _e,
  "%AsyncGeneratorFunction%": _e,
  "%AsyncIteratorPrototype%": _e,
  "%Atomics%": typeof Atomics > "u" ? R : Atomics,
  "%BigInt%": typeof BigInt > "u" ? R : BigInt,
  "%BigInt64Array%": typeof BigInt64Array > "u" ? R : BigInt64Array,
  "%BigUint64Array%": typeof BigUint64Array > "u" ? R : BigUint64Array,
  "%Boolean%": Boolean,
  "%DataView%": typeof DataView > "u" ? R : DataView,
  "%Date%": Date,
  "%decodeURI%": decodeURI,
  "%decodeURIComponent%": decodeURIComponent,
  "%encodeURI%": encodeURI,
  "%encodeURIComponent%": encodeURIComponent,
  "%Error%": qs,
  "%eval%": eval,
  // eslint-disable-line no-eval
  "%EvalError%": Ns,
  "%Float16Array%": typeof Float16Array > "u" ? R : Float16Array,
  "%Float32Array%": typeof Float32Array > "u" ? R : Float32Array,
  "%Float64Array%": typeof Float64Array > "u" ? R : Float64Array,
  "%FinalizationRegistry%": typeof FinalizationRegistry > "u" ? R : FinalizationRegistry,
  "%Function%": Zi,
  "%GeneratorFunction%": _e,
  "%Int8Array%": typeof Int8Array > "u" ? R : Int8Array,
  "%Int16Array%": typeof Int16Array > "u" ? R : Int16Array,
  "%Int32Array%": typeof Int32Array > "u" ? R : Int32Array,
  "%isFinite%": isFinite,
  "%isNaN%": isNaN,
  "%IteratorPrototype%": Ee && N ? N(N([][Symbol.iterator]())) : R,
  "%JSON%": typeof JSON == "object" ? JSON : R,
  "%Map%": typeof Map > "u" ? R : Map,
  "%MapIteratorPrototype%": typeof Map > "u" || !Ee || !N ? R : N((/* @__PURE__ */ new Map())[Symbol.iterator]()),
  "%Math%": Math,
  "%Number%": Number,
  "%Object%": Us,
  "%Object.getOwnPropertyDescriptor%": Le,
  "%parseFloat%": parseFloat,
  "%parseInt%": parseInt,
  "%Promise%": typeof Promise > "u" ? R : Promise,
  "%Proxy%": typeof Proxy > "u" ? R : Proxy,
  "%RangeError%": Bs,
  "%ReferenceError%": Ds,
  "%Reflect%": typeof Reflect > "u" ? R : Reflect,
  "%RegExp%": RegExp,
  "%Set%": typeof Set > "u" ? R : Set,
  "%SetIteratorPrototype%": typeof Set > "u" || !Ee || !N ? R : N((/* @__PURE__ */ new Set())[Symbol.iterator]()),
  "%SharedArrayBuffer%": typeof SharedArrayBuffer > "u" ? R : SharedArrayBuffer,
  "%String%": String,
  "%StringIteratorPrototype%": Ee && N ? N(""[Symbol.iterator]()) : R,
  "%Symbol%": Ee ? Symbol : R,
  "%SyntaxError%": Ce,
  "%ThrowTypeError%": Ks,
  "%TypedArray%": Zs,
  "%TypeError%": ke,
  "%Uint8Array%": typeof Uint8Array > "u" ? R : Uint8Array,
  "%Uint8ClampedArray%": typeof Uint8ClampedArray > "u" ? R : Uint8ClampedArray,
  "%Uint16Array%": typeof Uint16Array > "u" ? R : Uint16Array,
  "%Uint32Array%": typeof Uint32Array > "u" ? R : Uint32Array,
  "%URIError%": Is,
  "%WeakMap%": typeof WeakMap > "u" ? R : WeakMap,
  "%WeakRef%": typeof WeakRef > "u" ? R : WeakRef,
  "%WeakSet%": typeof WeakSet > "u" ? R : WeakSet,
  "%Function.prototype.call%": Ie,
  "%Function.prototype.apply%": Qi,
  "%Object.defineProperty%": Js,
  "%Object.getPrototypeOf%": Ys,
  "%Math.abs%": zs,
  "%Math.floor%": $s,
  "%Math.max%": Ms,
  "%Math.min%": Hs,
  "%Math.pow%": Gs,
  "%Math.round%": Vs,
  "%Math.sign%": Ws,
  "%Reflect.getPrototypeOf%": Xs
};
if (N)
  try {
    null.error;
  } catch (e) {
    var Qs = N(N(e));
    fe["%Error.prototype%"] = Qs;
  }
var er = function e(a) {
  var n;
  if (a === "%AsyncFunction%")
    n = Ca("async function () {}");
  else if (a === "%GeneratorFunction%")
    n = Ca("function* () {}");
  else if (a === "%AsyncGeneratorFunction%")
    n = Ca("async function* () {}");
  else if (a === "%AsyncGenerator%") {
    var i = e("%AsyncGeneratorFunction%");
    i && (n = i.prototype);
  } else if (a === "%AsyncIteratorPrototype%") {
    var t = e("%AsyncGenerator%");
    t && N && (n = N(t.prototype));
  }
  return fe[a] = n, n;
}, zn = {
  __proto__: null,
  "%ArrayBufferPrototype%": ["ArrayBuffer", "prototype"],
  "%ArrayPrototype%": ["Array", "prototype"],
  "%ArrayProto_entries%": ["Array", "prototype", "entries"],
  "%ArrayProto_forEach%": ["Array", "prototype", "forEach"],
  "%ArrayProto_keys%": ["Array", "prototype", "keys"],
  "%ArrayProto_values%": ["Array", "prototype", "values"],
  "%AsyncFunctionPrototype%": ["AsyncFunction", "prototype"],
  "%AsyncGenerator%": ["AsyncGeneratorFunction", "prototype"],
  "%AsyncGeneratorPrototype%": ["AsyncGeneratorFunction", "prototype", "prototype"],
  "%BooleanPrototype%": ["Boolean", "prototype"],
  "%DataViewPrototype%": ["DataView", "prototype"],
  "%DatePrototype%": ["Date", "prototype"],
  "%ErrorPrototype%": ["Error", "prototype"],
  "%EvalErrorPrototype%": ["EvalError", "prototype"],
  "%Float32ArrayPrototype%": ["Float32Array", "prototype"],
  "%Float64ArrayPrototype%": ["Float64Array", "prototype"],
  "%FunctionPrototype%": ["Function", "prototype"],
  "%Generator%": ["GeneratorFunction", "prototype"],
  "%GeneratorPrototype%": ["GeneratorFunction", "prototype", "prototype"],
  "%Int8ArrayPrototype%": ["Int8Array", "prototype"],
  "%Int16ArrayPrototype%": ["Int16Array", "prototype"],
  "%Int32ArrayPrototype%": ["Int32Array", "prototype"],
  "%JSONParse%": ["JSON", "parse"],
  "%JSONStringify%": ["JSON", "stringify"],
  "%MapPrototype%": ["Map", "prototype"],
  "%NumberPrototype%": ["Number", "prototype"],
  "%ObjectPrototype%": ["Object", "prototype"],
  "%ObjProto_toString%": ["Object", "prototype", "toString"],
  "%ObjProto_valueOf%": ["Object", "prototype", "valueOf"],
  "%PromisePrototype%": ["Promise", "prototype"],
  "%PromiseProto_then%": ["Promise", "prototype", "then"],
  "%Promise_all%": ["Promise", "all"],
  "%Promise_reject%": ["Promise", "reject"],
  "%Promise_resolve%": ["Promise", "resolve"],
  "%RangeErrorPrototype%": ["RangeError", "prototype"],
  "%ReferenceErrorPrototype%": ["ReferenceError", "prototype"],
  "%RegExpPrototype%": ["RegExp", "prototype"],
  "%SetPrototype%": ["Set", "prototype"],
  "%SharedArrayBufferPrototype%": ["SharedArrayBuffer", "prototype"],
  "%StringPrototype%": ["String", "prototype"],
  "%SymbolPrototype%": ["Symbol", "prototype"],
  "%SyntaxErrorPrototype%": ["SyntaxError", "prototype"],
  "%TypedArrayPrototype%": ["TypedArray", "prototype"],
  "%TypeErrorPrototype%": ["TypeError", "prototype"],
  "%Uint8ArrayPrototype%": ["Uint8Array", "prototype"],
  "%Uint8ClampedArrayPrototype%": ["Uint8ClampedArray", "prototype"],
  "%Uint16ArrayPrototype%": ["Uint16Array", "prototype"],
  "%Uint32ArrayPrototype%": ["Uint32Array", "prototype"],
  "%URIErrorPrototype%": ["URIError", "prototype"],
  "%WeakMapPrototype%": ["WeakMap", "prototype"],
  "%WeakSetPrototype%": ["WeakSet", "prototype"]
}, ze = da, na = on, ar = ze.call(Ie, Array.prototype.concat), nr = ze.call(Qi, Array.prototype.splice), $n = ze.call(Ie, String.prototype.replace), ia = ze.call(Ie, String.prototype.slice), ir = ze.call(Ie, RegExp.prototype.exec), tr = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g, or = /\\(\\)?/g, sr = function(a) {
  var n = ia(a, 0, 1), i = ia(a, -1);
  if (n === "%" && i !== "%")
    throw new Ce("invalid intrinsic syntax, expected closing `%`");
  if (i === "%" && n !== "%")
    throw new Ce("invalid intrinsic syntax, expected opening `%`");
  var t = [];
  return $n(a, tr, function(o, s, c, d) {
    t[t.length] = c ? $n(d, or, "$1") : s || o;
  }), t;
}, rr = function(a, n) {
  var i = a, t;
  if (na(zn, i) && (t = zn[i], i = "%" + t[0] + "%"), na(fe, i)) {
    var o = fe[i];
    if (o === _e && (o = er(i)), typeof o > "u" && !n)
      throw new ke("intrinsic " + a + " exists, but is not available. Please file an issue!");
    return {
      alias: t,
      name: i,
      value: o
    };
  }
  throw new Ce("intrinsic " + a + " does not exist!");
}, cr = function(a, n) {
  if (typeof a != "string" || a.length === 0)
    throw new ke("intrinsic name must be a non-empty string");
  if (arguments.length > 1 && typeof n != "boolean")
    throw new ke('"allowMissing" argument must be a boolean');
  if (ir(/^%?[^%]*%?$/, a) === null)
    throw new Ce("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
  var i = sr(a), t = i.length > 0 ? i[0] : "", o = rr("%" + t + "%", n), s = o.name, c = o.value, d = !1, m = o.alias;
  m && (t = m[0], nr(i, ar([0, 1], m)));
  for (var r = 1, p = !0; r < i.length; r += 1) {
    var l = i[r], v = ia(l, 0, 1), f = ia(l, -1);
    if ((v === '"' || v === "'" || v === "`" || f === '"' || f === "'" || f === "`") && v !== f)
      throw new Ce("property names with quotes must have matching quotes");
    if ((l === "constructor" || !p) && (d = !0), t += "." + l, s = "%" + t + "%", na(fe, s))
      c = fe[s];
    else if (c != null) {
      if (!(l in c)) {
        if (!n)
          throw new ke("base intrinsic for " + a + " exists, but the property is not available.");
        return;
      }
      if (Le && r + 1 >= i.length) {
        var h = Le(c, l);
        p = !!h, p && "get" in h && !("originalValue" in h.get) ? c = h.get : c = c[l];
      } else
        p = na(c, l), c = c[l];
      p && !d && (fe[s] = c);
    }
  }
  return c;
}, ja, Mn;
function pr() {
  if (Mn) return ja;
  Mn = 1;
  var e = Ji();
  return ja = function() {
    return e() && !!Symbol.toStringTag;
  }, ja;
}
var lr = cr, Hn = lr("%Object.defineProperty%", !0), ur = pr()(), dr = on, mr = nn(), Ve = ur ? Symbol.toStringTag : null, fr = function(a, n) {
  var i = arguments.length > 2 && !!arguments[2] && arguments[2].force, t = arguments.length > 2 && !!arguments[2] && arguments[2].nonConfigurable;
  if (typeof i < "u" && typeof i != "boolean" || typeof t < "u" && typeof t != "boolean")
    throw new mr("if provided, the `overrideIfSet` and `nonConfigurable` options must be booleans");
  Ve && (i || !dr(a, Ve)) && (Hn ? Hn(a, Ve, {
    configurable: !t,
    enumerable: !1,
    value: n,
    writable: !1
  }) : a[Ve] = n);
}, xr = function(e, a) {
  return Object.keys(a).forEach(function(n) {
    e[n] = e[n] || a[n];
  }), e;
}, sn = To, vr = ye, Oa = wi, hr = Za, br = Qa, gr = ra.parse, yr = Pt, wr = M.Stream, Er = Ei, Fa = Bi, _r = es, Rr = fr, pe = on, Ha = xr;
function S(e) {
  if (!(this instanceof S))
    return new S(e);
  this._overheadLength = 0, this._valueLength = 0, this._valuesToMeasure = [], sn.call(this), e = e || {};
  for (var a in e)
    this[a] = e[a];
}
vr.inherits(S, sn);
S.LINE_BREAK = `\r
`;
S.DEFAULT_CONTENT_TYPE = "application/octet-stream";
S.prototype.append = function(e, a, n) {
  n = n || {}, typeof n == "string" && (n = { filename: n });
  var i = sn.prototype.append.bind(this);
  if ((typeof a == "number" || a == null) && (a = String(a)), Array.isArray(a)) {
    this._error(new Error("Arrays are not supported."));
    return;
  }
  var t = this._multiPartHeader(e, a, n), o = this._multiPartFooter();
  i(t), i(a), i(o), this._trackLength(t, a, n);
};
S.prototype._trackLength = function(e, a, n) {
  var i = 0;
  n.knownLength != null ? i += Number(n.knownLength) : Buffer.isBuffer(a) ? i = a.length : typeof a == "string" && (i = Buffer.byteLength(a)), this._valueLength += i, this._overheadLength += Buffer.byteLength(e) + S.LINE_BREAK.length, !(!a || !a.path && !(a.readable && pe(a, "httpVersion")) && !(a instanceof wr)) && (n.knownLength || this._valuesToMeasure.push(a));
};
S.prototype._lengthRetriever = function(e, a) {
  pe(e, "fd") ? e.end != null && e.end != 1 / 0 && e.start != null ? a(null, e.end + 1 - (e.start ? e.start : 0)) : yr.stat(e.path, function(n, i) {
    if (n) {
      a(n);
      return;
    }
    var t = i.size - (e.start ? e.start : 0);
    a(null, t);
  }) : pe(e, "httpVersion") ? a(null, Number(e.headers["content-length"])) : pe(e, "httpModule") ? (e.on("response", function(n) {
    e.pause(), a(null, Number(n.headers["content-length"]));
  }), e.resume()) : a("Unknown stream");
};
S.prototype._multiPartHeader = function(e, a, n) {
  if (typeof n.header == "string")
    return n.header;
  var i = this._getContentDisposition(a, n), t = this._getContentType(a, n), o = "", s = {
    // add custom disposition as third element or keep it two elements if not
    "Content-Disposition": ["form-data", 'name="' + e + '"'].concat(i || []),
    // if no content type. allow it to be empty array
    "Content-Type": [].concat(t || [])
  };
  typeof n.header == "object" && Ha(s, n.header);
  var c;
  for (var d in s)
    if (pe(s, d)) {
      if (c = s[d], c == null)
        continue;
      Array.isArray(c) || (c = [c]), c.length && (o += d + ": " + c.join("; ") + S.LINE_BREAK);
    }
  return "--" + this.getBoundary() + S.LINE_BREAK + o + S.LINE_BREAK;
};
S.prototype._getContentDisposition = function(e, a) {
  var n;
  if (typeof a.filepath == "string" ? n = Oa.normalize(a.filepath).replace(/\\/g, "/") : a.filename || e && (e.name || e.path) ? n = Oa.basename(a.filename || e && (e.name || e.path)) : e && e.readable && pe(e, "httpVersion") && (n = Oa.basename(e.client._httpMessage.path || "")), n)
    return 'filename="' + n + '"';
};
S.prototype._getContentType = function(e, a) {
  var n = a.contentType;
  return !n && e && e.name && (n = Fa.lookup(e.name)), !n && e && e.path && (n = Fa.lookup(e.path)), !n && e && e.readable && pe(e, "httpVersion") && (n = e.headers["content-type"]), !n && (a.filepath || a.filename) && (n = Fa.lookup(a.filepath || a.filename)), !n && e && typeof e == "object" && (n = S.DEFAULT_CONTENT_TYPE), n;
};
S.prototype._multiPartFooter = function() {
  return (function(e) {
    var a = S.LINE_BREAK, n = this._streams.length === 0;
    n && (a += this._lastBoundary()), e(a);
  }).bind(this);
};
S.prototype._lastBoundary = function() {
  return "--" + this.getBoundary() + "--" + S.LINE_BREAK;
};
S.prototype.getHeaders = function(e) {
  var a, n = {
    "content-type": "multipart/form-data; boundary=" + this.getBoundary()
  };
  for (a in e)
    pe(e, a) && (n[a.toLowerCase()] = e[a]);
  return n;
};
S.prototype.setBoundary = function(e) {
  if (typeof e != "string")
    throw new TypeError("FormData boundary must be a string");
  this._boundary = e;
};
S.prototype.getBoundary = function() {
  return this._boundary || this._generateBoundary(), this._boundary;
};
S.prototype.getBuffer = function() {
  for (var e = new Buffer.alloc(0), a = this.getBoundary(), n = 0, i = this._streams.length; n < i; n++)
    typeof this._streams[n] != "function" && (Buffer.isBuffer(this._streams[n]) ? e = Buffer.concat([e, this._streams[n]]) : e = Buffer.concat([e, Buffer.from(this._streams[n])]), (typeof this._streams[n] != "string" || this._streams[n].substring(2, a.length + 2) !== a) && (e = Buffer.concat([e, Buffer.from(S.LINE_BREAK)])));
  return Buffer.concat([e, Buffer.from(this._lastBoundary())]);
};
S.prototype._generateBoundary = function() {
  this._boundary = "--------------------------" + Er.randomBytes(12).toString("hex");
};
S.prototype.getLengthSync = function() {
  var e = this._overheadLength + this._valueLength;
  return this._streams.length && (e += this._lastBoundary().length), this.hasKnownLength() || this._error(new Error("Cannot calculate proper length in synchronous way.")), e;
};
S.prototype.hasKnownLength = function() {
  var e = !0;
  return this._valuesToMeasure.length && (e = !1), e;
};
S.prototype.getLength = function(e) {
  var a = this._overheadLength + this._valueLength;
  if (this._streams.length && (a += this._lastBoundary().length), !this._valuesToMeasure.length) {
    process.nextTick(e.bind(this, null, a));
    return;
  }
  _r.parallel(this._valuesToMeasure, this._lengthRetriever, function(n, i) {
    if (n) {
      e(n);
      return;
    }
    i.forEach(function(t) {
      a += t;
    }), e(null, a);
  });
};
S.prototype.submit = function(e, a) {
  var n, i, t = { method: "post" };
  return typeof e == "string" ? (e = gr(e), i = Ha({
    port: e.port,
    path: e.pathname,
    host: e.hostname,
    protocol: e.protocol
  }, t)) : (i = Ha(e, t), i.port || (i.port = i.protocol === "https:" ? 443 : 80)), i.headers = this.getHeaders(e.headers), i.protocol === "https:" ? n = br.request(i) : n = hr.request(i), this.getLength((function(o, s) {
    if (o && o !== "Unknown stream") {
      this._error(o);
      return;
    }
    if (s && n.setHeader("Content-Length", s), this.pipe(n), a) {
      var c, d = function(m, r) {
        return n.removeListener("error", d), n.removeListener("response", c), a.call(this, m, r);
      };
      c = d.bind(this, null), n.on("error", d), n.on("response", c);
    }
  }).bind(this)), n;
};
S.prototype._error = function(e) {
  this.error || (this.error = e, this.pause(), this.emit("error", e));
};
S.prototype.toString = function() {
  return "[object FormData]";
};
Rr(S.prototype, "FormData");
var Sr = S;
const et = /* @__PURE__ */ an(Sr);
function Ga(e) {
  return u.isPlainObject(e) || u.isArray(e);
}
function at(e) {
  return u.endsWith(e, "[]") ? e.slice(0, -2) : e;
}
function Gn(e, a, n) {
  return e ? e.concat(a).map(function(t, o) {
    return t = at(t), !n && o ? "[" + t + "]" : t;
  }).join(n ? "." : "") : a;
}
function kr(e) {
  return u.isArray(e) && !e.some(Ga);
}
const Tr = u.toFlatObject(u, {}, null, function(a) {
  return /^is[A-Z]/.test(a);
});
function ma(e, a, n) {
  if (!u.isObject(e))
    throw new TypeError("target must be an object");
  a = a || new (et || FormData)(), n = u.toFlatObject(n, {
    metaTokens: !0,
    dots: !1,
    indexes: !1
  }, !1, function(h, x) {
    return !u.isUndefined(x[h]);
  });
  const i = n.metaTokens, t = n.visitor || r, o = n.dots, s = n.indexes, d = (n.Blob || typeof Blob < "u" && Blob) && u.isSpecCompliantForm(a);
  if (!u.isFunction(t))
    throw new TypeError("visitor must be a function");
  function m(f) {
    if (f === null) return "";
    if (u.isDate(f))
      return f.toISOString();
    if (u.isBoolean(f))
      return f.toString();
    if (!d && u.isBlob(f))
      throw new b("Blob is not supported. Use a Buffer instead.");
    return u.isArrayBuffer(f) || u.isTypedArray(f) ? d && typeof Blob == "function" ? new Blob([f]) : Buffer.from(f) : f;
  }
  function r(f, h, x) {
    let y = f;
    if (f && !x && typeof f == "object") {
      if (u.endsWith(h, "{}"))
        h = i ? h : h.slice(0, -2), f = JSON.stringify(f);
      else if (u.isArray(f) && kr(f) || (u.isFileList(f) || u.endsWith(h, "[]")) && (y = u.toArray(f)))
        return h = at(h), y.forEach(function(_, C) {
          !(u.isUndefined(_) || _ === null) && a.append(
            // eslint-disable-next-line no-nested-ternary
            s === !0 ? Gn([h], C, o) : s === null ? h : h + "[]",
            m(_)
          );
        }), !1;
    }
    return Ga(f) ? !0 : (a.append(Gn(x, h, o), m(f)), !1);
  }
  const p = [], l = Object.assign(Tr, {
    defaultVisitor: r,
    convertValue: m,
    isVisitable: Ga
  });
  function v(f, h) {
    if (!u.isUndefined(f)) {
      if (p.indexOf(f) !== -1)
        throw Error("Circular reference detected in " + h.join("."));
      p.push(f), u.forEach(f, function(y, E) {
        (!(u.isUndefined(y) || y === null) && t.call(
          a,
          y,
          u.isString(E) ? E.trim() : E,
          h,
          l
        )) === !0 && v(y, h ? h.concat(E) : [E]);
      }), p.pop();
    }
  }
  if (!u.isObject(e))
    throw new TypeError("data must be an object");
  return v(e), a;
}
function Vn(e) {
  const a = {
    "!": "%21",
    "'": "%27",
    "(": "%28",
    ")": "%29",
    "~": "%7E",
    "%20": "+",
    "%00": "\0"
  };
  return encodeURIComponent(e).replace(/[!'()~]|%20|%00/g, function(i) {
    return a[i];
  });
}
function nt(e, a) {
  this._pairs = [], e && ma(e, this, a);
}
const it = nt.prototype;
it.append = function(a, n) {
  this._pairs.push([a, n]);
};
it.toString = function(a) {
  const n = a ? function(i) {
    return a.call(this, i, Vn);
  } : Vn;
  return this._pairs.map(function(t) {
    return n(t[0]) + "=" + n(t[1]);
  }, "").join("&");
};
function Cr(e) {
  return encodeURIComponent(e).replace(/%3A/gi, ":").replace(/%24/g, "$").replace(/%2C/gi, ",").replace(/%20/g, "+");
}
function rn(e, a, n) {
  if (!a)
    return e;
  const i = n && n.encode || Cr;
  u.isFunction(n) && (n = {
    serialize: n
  });
  const t = n && n.serialize;
  let o;
  if (t ? o = t(a, n) : o = u.isURLSearchParams(a) ? a.toString() : new nt(a, n).toString(i), o) {
    const s = e.indexOf("#");
    s !== -1 && (e = e.slice(0, s)), e += (e.indexOf("?") === -1 ? "?" : "&") + o;
  }
  return e;
}
class Wn {
  constructor() {
    this.handlers = [];
  }
  /**
   * Add a new interceptor to the stack
   *
   * @param {Function} fulfilled The function to handle `then` for a `Promise`
   * @param {Function} rejected The function to handle `reject` for a `Promise`
   *
   * @return {Number} An ID used to remove interceptor later
   */
  use(a, n, i) {
    return this.handlers.push({
      fulfilled: a,
      rejected: n,
      synchronous: i ? i.synchronous : !1,
      runWhen: i ? i.runWhen : null
    }), this.handlers.length - 1;
  }
  /**
   * Remove an interceptor from the stack
   *
   * @param {Number} id The ID that was returned by `use`
   *
   * @returns {void}
   */
  eject(a) {
    this.handlers[a] && (this.handlers[a] = null);
  }
  /**
   * Clear all interceptors from the stack
   *
   * @returns {void}
   */
  clear() {
    this.handlers && (this.handlers = []);
  }
  /**
   * Iterate over all the registered interceptors
   *
   * This method is particularly useful for skipping over any
   * interceptors that may have become `null` calling `eject`.
   *
   * @param {Function} fn The function to call for each interceptor
   *
   * @returns {void}
   */
  forEach(a) {
    u.forEach(this.handlers, function(i) {
      i !== null && a(i);
    });
  }
}
const cn = {
  silentJSONParsing: !0,
  forcedJSONParsing: !0,
  clarifyTimeoutError: !1
}, Ar = ra.URLSearchParams, Pa = "abcdefghijklmnopqrstuvwxyz", Jn = "0123456789", tt = {
  DIGIT: Jn,
  ALPHA: Pa,
  ALPHA_DIGIT: Pa + Pa.toUpperCase() + Jn
}, jr = (e = 16, a = tt.ALPHA_DIGIT) => {
  let n = "";
  const { length: i } = a, t = new Uint32Array(e);
  Ei.randomFillSync(t);
  for (let o = 0; o < e; o++)
    n += a[t[o] % i];
  return n;
}, Or = {
  isNode: !0,
  classes: {
    URLSearchParams: Ar,
    FormData: et,
    Blob: typeof Blob < "u" && Blob || null
  },
  ALPHABET: tt,
  generateString: jr,
  protocols: ["http", "https", "file", "data"]
}, pn = typeof window < "u" && typeof document < "u", Va = typeof navigator == "object" && navigator || void 0, Fr = pn && (!Va || ["ReactNative", "NativeScript", "NS"].indexOf(Va.product) < 0), Pr = typeof WorkerGlobalScope < "u" && // eslint-disable-next-line no-undef
self instanceof WorkerGlobalScope && typeof self.importScripts == "function", Lr = pn && window.location.href || "http://localhost", Ur = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  hasBrowserEnv: pn,
  hasStandardBrowserEnv: Fr,
  hasStandardBrowserWebWorkerEnv: Pr,
  navigator: Va,
  origin: Lr
}, Symbol.toStringTag, { value: "Module" })), F = {
  ...Ur,
  ...Or
};
function qr(e, a) {
  return ma(e, new F.classes.URLSearchParams(), {
    visitor: function(n, i, t, o) {
      return F.isNode && u.isBuffer(n) ? (this.append(i, n.toString("base64")), !1) : o.defaultVisitor.apply(this, arguments);
    },
    ...a
  });
}
function Nr(e) {
  return u.matchAll(/\w+|\[(\w*)]/g, e).map((a) => a[0] === "[]" ? "" : a[1] || a[0]);
}
function Br(e) {
  const a = {}, n = Object.keys(e);
  let i;
  const t = n.length;
  let o;
  for (i = 0; i < t; i++)
    o = n[i], a[o] = e[o];
  return a;
}
function ot(e) {
  function a(n, i, t, o) {
    let s = n[o++];
    if (s === "__proto__") return !0;
    const c = Number.isFinite(+s), d = o >= n.length;
    return s = !s && u.isArray(t) ? t.length : s, d ? (u.hasOwnProp(t, s) ? t[s] = [t[s], i] : t[s] = i, !c) : ((!t[s] || !u.isObject(t[s])) && (t[s] = []), a(n, i, t[s], o) && u.isArray(t[s]) && (t[s] = Br(t[s])), !c);
  }
  if (u.isFormData(e) && u.isFunction(e.entries)) {
    const n = {};
    return u.forEachEntry(e, (i, t) => {
      a(Nr(i), t, n, 0);
    }), n;
  }
  return null;
}
function Dr(e, a, n) {
  if (u.isString(e))
    try {
      return (a || JSON.parse)(e), u.trim(e);
    } catch (i) {
      if (i.name !== "SyntaxError")
        throw i;
    }
  return (n || JSON.stringify)(e);
}
const $e = {
  transitional: cn,
  adapter: ["xhr", "http", "fetch"],
  transformRequest: [function(a, n) {
    const i = n.getContentType() || "", t = i.indexOf("application/json") > -1, o = u.isObject(a);
    if (o && u.isHTMLForm(a) && (a = new FormData(a)), u.isFormData(a))
      return t ? JSON.stringify(ot(a)) : a;
    if (u.isArrayBuffer(a) || u.isBuffer(a) || u.isStream(a) || u.isFile(a) || u.isBlob(a) || u.isReadableStream(a))
      return a;
    if (u.isArrayBufferView(a))
      return a.buffer;
    if (u.isURLSearchParams(a))
      return n.setContentType("application/x-www-form-urlencoded;charset=utf-8", !1), a.toString();
    let c;
    if (o) {
      if (i.indexOf("application/x-www-form-urlencoded") > -1)
        return qr(a, this.formSerializer).toString();
      if ((c = u.isFileList(a)) || i.indexOf("multipart/form-data") > -1) {
        const d = this.env && this.env.FormData;
        return ma(
          c ? { "files[]": a } : a,
          d && new d(),
          this.formSerializer
        );
      }
    }
    return o || t ? (n.setContentType("application/json", !1), Dr(a)) : a;
  }],
  transformResponse: [function(a) {
    const n = this.transitional || $e.transitional, i = n && n.forcedJSONParsing, t = this.responseType === "json";
    if (u.isResponse(a) || u.isReadableStream(a))
      return a;
    if (a && u.isString(a) && (i && !this.responseType || t)) {
      const s = !(n && n.silentJSONParsing) && t;
      try {
        return JSON.parse(a, this.parseReviver);
      } catch (c) {
        if (s)
          throw c.name === "SyntaxError" ? b.from(c, b.ERR_BAD_RESPONSE, this, null, this.response) : c;
      }
    }
    return a;
  }],
  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,
  xsrfCookieName: "XSRF-TOKEN",
  xsrfHeaderName: "X-XSRF-TOKEN",
  maxContentLength: -1,
  maxBodyLength: -1,
  env: {
    FormData: F.classes.FormData,
    Blob: F.classes.Blob
  },
  validateStatus: function(a) {
    return a >= 200 && a < 300;
  },
  headers: {
    common: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": void 0
    }
  }
};
u.forEach(["delete", "get", "head", "post", "put", "patch"], (e) => {
  $e.headers[e] = {};
});
const Ir = u.toObjectSet([
  "age",
  "authorization",
  "content-length",
  "content-type",
  "etag",
  "expires",
  "from",
  "host",
  "if-modified-since",
  "if-unmodified-since",
  "last-modified",
  "location",
  "max-forwards",
  "proxy-authorization",
  "referer",
  "retry-after",
  "user-agent"
]), zr = (e) => {
  const a = {};
  let n, i, t;
  return e && e.split(`
`).forEach(function(s) {
    t = s.indexOf(":"), n = s.substring(0, t).trim().toLowerCase(), i = s.substring(t + 1).trim(), !(!n || a[n] && Ir[n]) && (n === "set-cookie" ? a[n] ? a[n].push(i) : a[n] = [i] : a[n] = a[n] ? a[n] + ", " + i : i);
  }), a;
}, Kn = Symbol("internals");
function Oe(e) {
  return e && String(e).trim().toLowerCase();
}
function ea(e) {
  return e === !1 || e == null ? e : u.isArray(e) ? e.map(ea) : String(e);
}
function $r(e) {
  const a = /* @__PURE__ */ Object.create(null), n = /([^\s,;=]+)\s*(?:=\s*([^,;]+))?/g;
  let i;
  for (; i = n.exec(e); )
    a[i[1]] = i[2];
  return a;
}
const Mr = (e) => /^[-_a-zA-Z0-9^`|~,!#$%&'*+.]+$/.test(e.trim());
function La(e, a, n, i, t) {
  if (u.isFunction(i))
    return i.call(this, a, n);
  if (t && (a = n), !!u.isString(a)) {
    if (u.isString(i))
      return a.indexOf(i) !== -1;
    if (u.isRegExp(i))
      return i.test(a);
  }
}
function Hr(e) {
  return e.trim().toLowerCase().replace(/([a-z\d])(\w*)/g, (a, n, i) => n.toUpperCase() + i);
}
function Gr(e, a) {
  const n = u.toCamelCase(" " + a);
  ["get", "set", "has"].forEach((i) => {
    Object.defineProperty(e, i + n, {
      value: function(t, o, s) {
        return this[i].call(this, a, t, o, s);
      },
      configurable: !0
    });
  });
}
let D = class {
  constructor(a) {
    a && this.set(a);
  }
  set(a, n, i) {
    const t = this;
    function o(c, d, m) {
      const r = Oe(d);
      if (!r)
        throw new Error("header name must be a non-empty string");
      const p = u.findKey(t, r);
      (!p || t[p] === void 0 || m === !0 || m === void 0 && t[p] !== !1) && (t[p || d] = ea(c));
    }
    const s = (c, d) => u.forEach(c, (m, r) => o(m, r, d));
    if (u.isPlainObject(a) || a instanceof this.constructor)
      s(a, n);
    else if (u.isString(a) && (a = a.trim()) && !Mr(a))
      s(zr(a), n);
    else if (u.isObject(a) && u.isIterable(a)) {
      let c = {}, d, m;
      for (const r of a) {
        if (!u.isArray(r))
          throw TypeError("Object iterator must return a key-value pair");
        c[m = r[0]] = (d = c[m]) ? u.isArray(d) ? [...d, r[1]] : [d, r[1]] : r[1];
      }
      s(c, n);
    } else
      a != null && o(n, a, i);
    return this;
  }
  get(a, n) {
    if (a = Oe(a), a) {
      const i = u.findKey(this, a);
      if (i) {
        const t = this[i];
        if (!n)
          return t;
        if (n === !0)
          return $r(t);
        if (u.isFunction(n))
          return n.call(this, t, i);
        if (u.isRegExp(n))
          return n.exec(t);
        throw new TypeError("parser must be boolean|regexp|function");
      }
    }
  }
  has(a, n) {
    if (a = Oe(a), a) {
      const i = u.findKey(this, a);
      return !!(i && this[i] !== void 0 && (!n || La(this, this[i], i, n)));
    }
    return !1;
  }
  delete(a, n) {
    const i = this;
    let t = !1;
    function o(s) {
      if (s = Oe(s), s) {
        const c = u.findKey(i, s);
        c && (!n || La(i, i[c], c, n)) && (delete i[c], t = !0);
      }
    }
    return u.isArray(a) ? a.forEach(o) : o(a), t;
  }
  clear(a) {
    const n = Object.keys(this);
    let i = n.length, t = !1;
    for (; i--; ) {
      const o = n[i];
      (!a || La(this, this[o], o, a, !0)) && (delete this[o], t = !0);
    }
    return t;
  }
  normalize(a) {
    const n = this, i = {};
    return u.forEach(this, (t, o) => {
      const s = u.findKey(i, o);
      if (s) {
        n[s] = ea(t), delete n[o];
        return;
      }
      const c = a ? Hr(o) : String(o).trim();
      c !== o && delete n[o], n[c] = ea(t), i[c] = !0;
    }), this;
  }
  concat(...a) {
    return this.constructor.concat(this, ...a);
  }
  toJSON(a) {
    const n = /* @__PURE__ */ Object.create(null);
    return u.forEach(this, (i, t) => {
      i != null && i !== !1 && (n[t] = a && u.isArray(i) ? i.join(", ") : i);
    }), n;
  }
  [Symbol.iterator]() {
    return Object.entries(this.toJSON())[Symbol.iterator]();
  }
  toString() {
    return Object.entries(this.toJSON()).map(([a, n]) => a + ": " + n).join(`
`);
  }
  getSetCookie() {
    return this.get("set-cookie") || [];
  }
  get [Symbol.toStringTag]() {
    return "AxiosHeaders";
  }
  static from(a) {
    return a instanceof this ? a : new this(a);
  }
  static concat(a, ...n) {
    const i = new this(a);
    return n.forEach((t) => i.set(t)), i;
  }
  static accessor(a) {
    const i = (this[Kn] = this[Kn] = {
      accessors: {}
    }).accessors, t = this.prototype;
    function o(s) {
      const c = Oe(s);
      i[c] || (Gr(t, s), i[c] = !0);
    }
    return u.isArray(a) ? a.forEach(o) : o(a), this;
  }
};
D.accessor(["Content-Type", "Content-Length", "Accept", "Accept-Encoding", "User-Agent", "Authorization"]);
u.reduceDescriptors(D.prototype, ({ value: e }, a) => {
  let n = a[0].toUpperCase() + a.slice(1);
  return {
    get: () => e,
    set(i) {
      this[n] = i;
    }
  };
});
u.freezeMethods(D);
function Ua(e, a) {
  const n = this || $e, i = a || n, t = D.from(i.headers);
  let o = i.data;
  return u.forEach(e, function(c) {
    o = c.call(n, o, t.normalize(), a ? a.status : void 0);
  }), t.normalize(), o;
}
function st(e) {
  return !!(e && e.__CANCEL__);
}
function le(e, a, n) {
  b.call(this, e ?? "canceled", b.ERR_CANCELED, a, n), this.name = "CanceledError";
}
u.inherits(le, b, {
  __CANCEL__: !0
});
function Re(e, a, n) {
  const i = n.config.validateStatus;
  !n.status || !i || i(n.status) ? e(n) : a(new b(
    "Request failed with status code " + n.status,
    [b.ERR_BAD_REQUEST, b.ERR_BAD_RESPONSE][Math.floor(n.status / 100) - 4],
    n.config,
    n.request,
    n
  ));
}
function Vr(e) {
  return /^([a-z][a-z\d+\-.]*:)?\/\//i.test(e);
}
function Wr(e, a) {
  return a ? e.replace(/\/?\/$/, "") + "/" + a.replace(/^\/+/, "") : e;
}
function ln(e, a, n) {
  let i = !Vr(a);
  return e && (i || n == !1) ? Wr(e, a) : a;
}
var rt = {}, Jr = ra.parse, Kr = {
  ftp: 21,
  gopher: 70,
  http: 80,
  https: 443,
  ws: 80,
  wss: 443
}, Yr = String.prototype.endsWith || function(e) {
  return e.length <= this.length && this.indexOf(e, this.length - e.length) !== -1;
};
function Xr(e) {
  var a = typeof e == "string" ? Jr(e) : e || {}, n = a.protocol, i = a.host, t = a.port;
  if (typeof i != "string" || !i || typeof n != "string" || (n = n.split(":", 1)[0], i = i.replace(/:\d*$/, ""), t = parseInt(t) || Kr[n] || 0, !Zr(i, t)))
    return "";
  var o = Se("npm_config_" + n + "_proxy") || Se(n + "_proxy") || Se("npm_config_proxy") || Se("all_proxy");
  return o && o.indexOf("://") === -1 && (o = n + "://" + o), o;
}
function Zr(e, a) {
  var n = (Se("npm_config_no_proxy") || Se("no_proxy")).toLowerCase();
  return n ? n === "*" ? !1 : n.split(/[,\s]/).every(function(i) {
    if (!i)
      return !0;
    var t = i.match(/^(.+):(\d+)$/), o = t ? t[1] : i, s = t ? parseInt(t[2]) : 0;
    return s && s !== a ? !0 : /^[.*]/.test(o) ? (o.charAt(0) === "*" && (o = o.slice(1)), !Yr.call(e, o)) : e !== o;
  }) : !0;
}
function Se(e) {
  return process.env[e.toLowerCase()] || process.env[e.toUpperCase()] || "";
}
rt.getProxyForUrl = Xr;
var un = { exports: {} }, We = { exports: {} }, Je = { exports: {} }, qa, Yn;
function Qr() {
  if (Yn) return qa;
  Yn = 1;
  var e = 1e3, a = e * 60, n = a * 60, i = n * 24, t = i * 7, o = i * 365.25;
  qa = function(r, p) {
    p = p || {};
    var l = typeof r;
    if (l === "string" && r.length > 0)
      return s(r);
    if (l === "number" && isFinite(r))
      return p.long ? d(r) : c(r);
    throw new Error(
      "val is not a non-empty string or a valid number. val=" + JSON.stringify(r)
    );
  };
  function s(r) {
    if (r = String(r), !(r.length > 100)) {
      var p = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(
        r
      );
      if (p) {
        var l = parseFloat(p[1]), v = (p[2] || "ms").toLowerCase();
        switch (v) {
          case "years":
          case "year":
          case "yrs":
          case "yr":
          case "y":
            return l * o;
          case "weeks":
          case "week":
          case "w":
            return l * t;
          case "days":
          case "day":
          case "d":
            return l * i;
          case "hours":
          case "hour":
          case "hrs":
          case "hr":
          case "h":
            return l * n;
          case "minutes":
          case "minute":
          case "mins":
          case "min":
          case "m":
            return l * a;
          case "seconds":
          case "second":
          case "secs":
          case "sec":
          case "s":
            return l * e;
          case "milliseconds":
          case "millisecond":
          case "msecs":
          case "msec":
          case "ms":
            return l;
          default:
            return;
        }
      }
    }
  }
  function c(r) {
    var p = Math.abs(r);
    return p >= i ? Math.round(r / i) + "d" : p >= n ? Math.round(r / n) + "h" : p >= a ? Math.round(r / a) + "m" : p >= e ? Math.round(r / e) + "s" : r + "ms";
  }
  function d(r) {
    var p = Math.abs(r);
    return p >= i ? m(r, p, i, "day") : p >= n ? m(r, p, n, "hour") : p >= a ? m(r, p, a, "minute") : p >= e ? m(r, p, e, "second") : r + " ms";
  }
  function m(r, p, l, v) {
    var f = p >= l * 1.5;
    return Math.round(r / l) + " " + v + (f ? "s" : "");
  }
  return qa;
}
var Na, Xn;
function ct() {
  if (Xn) return Na;
  Xn = 1;
  function e(a) {
    i.debug = i, i.default = i, i.coerce = m, i.disable = c, i.enable = o, i.enabled = d, i.humanize = Qr(), i.destroy = r, Object.keys(a).forEach((p) => {
      i[p] = a[p];
    }), i.names = [], i.skips = [], i.formatters = {};
    function n(p) {
      let l = 0;
      for (let v = 0; v < p.length; v++)
        l = (l << 5) - l + p.charCodeAt(v), l |= 0;
      return i.colors[Math.abs(l) % i.colors.length];
    }
    i.selectColor = n;
    function i(p) {
      let l, v = null, f, h;
      function x(...y) {
        if (!x.enabled)
          return;
        const E = x, _ = Number(/* @__PURE__ */ new Date()), C = _ - (l || _);
        E.diff = C, E.prev = l, E.curr = _, l = _, y[0] = i.coerce(y[0]), typeof y[0] != "string" && y.unshift("%O");
        let U = 0;
        y[0] = y[0].replace(/%([a-zA-Z%])/g, (O, q) => {
          if (O === "%%")
            return "%";
          U++;
          const J = i.formatters[q];
          if (typeof J == "function") {
            const oe = y[U];
            O = J.call(E, oe), y.splice(U, 1), U--;
          }
          return O;
        }), i.formatArgs.call(E, y), (E.log || i.log).apply(E, y);
      }
      return x.namespace = p, x.useColors = i.useColors(), x.color = i.selectColor(p), x.extend = t, x.destroy = i.destroy, Object.defineProperty(x, "enabled", {
        enumerable: !0,
        configurable: !1,
        get: () => v !== null ? v : (f !== i.namespaces && (f = i.namespaces, h = i.enabled(p)), h),
        set: (y) => {
          v = y;
        }
      }), typeof i.init == "function" && i.init(x), x;
    }
    function t(p, l) {
      const v = i(this.namespace + (typeof l > "u" ? ":" : l) + p);
      return v.log = this.log, v;
    }
    function o(p) {
      i.save(p), i.namespaces = p, i.names = [], i.skips = [];
      const l = (typeof p == "string" ? p : "").trim().replace(/\s+/g, ",").split(",").filter(Boolean);
      for (const v of l)
        v[0] === "-" ? i.skips.push(v.slice(1)) : i.names.push(v);
    }
    function s(p, l) {
      let v = 0, f = 0, h = -1, x = 0;
      for (; v < p.length; )
        if (f < l.length && (l[f] === p[v] || l[f] === "*"))
          l[f] === "*" ? (h = f, x = v, f++) : (v++, f++);
        else if (h !== -1)
          f = h + 1, x++, v = x;
        else
          return !1;
      for (; f < l.length && l[f] === "*"; )
        f++;
      return f === l.length;
    }
    function c() {
      const p = [
        ...i.names,
        ...i.skips.map((l) => "-" + l)
      ].join(",");
      return i.enable(""), p;
    }
    function d(p) {
      for (const l of i.skips)
        if (s(p, l))
          return !1;
      for (const l of i.names)
        if (s(p, l))
          return !0;
      return !1;
    }
    function m(p) {
      return p instanceof Error ? p.stack || p.message : p;
    }
    function r() {
      console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
    }
    return i.enable(i.load()), i;
  }
  return Na = e, Na;
}
var Zn;
function ec() {
  return Zn || (Zn = 1, function(e, a) {
    a.formatArgs = i, a.save = t, a.load = o, a.useColors = n, a.storage = s(), a.destroy = /* @__PURE__ */ (() => {
      let d = !1;
      return () => {
        d || (d = !0, console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."));
      };
    })(), a.colors = [
      "#0000CC",
      "#0000FF",
      "#0033CC",
      "#0033FF",
      "#0066CC",
      "#0066FF",
      "#0099CC",
      "#0099FF",
      "#00CC00",
      "#00CC33",
      "#00CC66",
      "#00CC99",
      "#00CCCC",
      "#00CCFF",
      "#3300CC",
      "#3300FF",
      "#3333CC",
      "#3333FF",
      "#3366CC",
      "#3366FF",
      "#3399CC",
      "#3399FF",
      "#33CC00",
      "#33CC33",
      "#33CC66",
      "#33CC99",
      "#33CCCC",
      "#33CCFF",
      "#6600CC",
      "#6600FF",
      "#6633CC",
      "#6633FF",
      "#66CC00",
      "#66CC33",
      "#9900CC",
      "#9900FF",
      "#9933CC",
      "#9933FF",
      "#99CC00",
      "#99CC33",
      "#CC0000",
      "#CC0033",
      "#CC0066",
      "#CC0099",
      "#CC00CC",
      "#CC00FF",
      "#CC3300",
      "#CC3333",
      "#CC3366",
      "#CC3399",
      "#CC33CC",
      "#CC33FF",
      "#CC6600",
      "#CC6633",
      "#CC9900",
      "#CC9933",
      "#CCCC00",
      "#CCCC33",
      "#FF0000",
      "#FF0033",
      "#FF0066",
      "#FF0099",
      "#FF00CC",
      "#FF00FF",
      "#FF3300",
      "#FF3333",
      "#FF3366",
      "#FF3399",
      "#FF33CC",
      "#FF33FF",
      "#FF6600",
      "#FF6633",
      "#FF9900",
      "#FF9933",
      "#FFCC00",
      "#FFCC33"
    ];
    function n() {
      if (typeof window < "u" && window.process && (window.process.type === "renderer" || window.process.__nwjs))
        return !0;
      if (typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))
        return !1;
      let d;
      return typeof document < "u" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || // Is firebug? http://stackoverflow.com/a/398120/376773
      typeof window < "u" && window.console && (window.console.firebug || window.console.exception && window.console.table) || // Is firefox >= v31?
      // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
      typeof navigator < "u" && navigator.userAgent && (d = navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)) && parseInt(d[1], 10) >= 31 || // Double check webkit in userAgent just in case we are in a worker
      typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
    }
    function i(d) {
      if (d[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + d[0] + (this.useColors ? "%c " : " ") + "+" + e.exports.humanize(this.diff), !this.useColors)
        return;
      const m = "color: " + this.color;
      d.splice(1, 0, m, "color: inherit");
      let r = 0, p = 0;
      d[0].replace(/%[a-zA-Z%]/g, (l) => {
        l !== "%%" && (r++, l === "%c" && (p = r));
      }), d.splice(p, 0, m);
    }
    a.log = console.debug || console.log || (() => {
    });
    function t(d) {
      try {
        d ? a.storage.setItem("debug", d) : a.storage.removeItem("debug");
      } catch {
      }
    }
    function o() {
      let d;
      try {
        d = a.storage.getItem("debug") || a.storage.getItem("DEBUG");
      } catch {
      }
      return !d && typeof process < "u" && "env" in process && (d = process.env.DEBUG), d;
    }
    function s() {
      try {
        return localStorage;
      } catch {
      }
    }
    e.exports = ct()(a);
    const { formatters: c } = e.exports;
    c.j = function(d) {
      try {
        return JSON.stringify(d);
      } catch (m) {
        return "[UnexpectedJSONParseError]: " + m.message;
      }
    };
  }(Je, Je.exports)), Je.exports;
}
var Ke = { exports: {} }, Ba, Qn;
function ac() {
  return Qn || (Qn = 1, Ba = (e, a = process.argv) => {
    const n = e.startsWith("-") ? "" : e.length === 1 ? "-" : "--", i = a.indexOf(n + e), t = a.indexOf("--");
    return i !== -1 && (t === -1 || i < t);
  }), Ba;
}
var Da, ei;
function nc() {
  if (ei) return Da;
  ei = 1;
  const e = Ut, a = Ri, n = ac(), { env: i } = process;
  let t;
  n("no-color") || n("no-colors") || n("color=false") || n("color=never") ? t = 0 : (n("color") || n("colors") || n("color=true") || n("color=always")) && (t = 1), "FORCE_COLOR" in i && (i.FORCE_COLOR === "true" ? t = 1 : i.FORCE_COLOR === "false" ? t = 0 : t = i.FORCE_COLOR.length === 0 ? 1 : Math.min(parseInt(i.FORCE_COLOR, 10), 3));
  function o(d) {
    return d === 0 ? !1 : {
      level: d,
      hasBasic: !0,
      has256: d >= 2,
      has16m: d >= 3
    };
  }
  function s(d, m) {
    if (t === 0)
      return 0;
    if (n("color=16m") || n("color=full") || n("color=truecolor"))
      return 3;
    if (n("color=256"))
      return 2;
    if (d && !m && t === void 0)
      return 0;
    const r = t || 0;
    if (i.TERM === "dumb")
      return r;
    if (process.platform === "win32") {
      const p = e.release().split(".");
      return Number(p[0]) >= 10 && Number(p[2]) >= 10586 ? Number(p[2]) >= 14931 ? 3 : 2 : 1;
    }
    if ("CI" in i)
      return ["TRAVIS", "CIRCLECI", "APPVEYOR", "GITLAB_CI", "GITHUB_ACTIONS", "BUILDKITE"].some((p) => p in i) || i.CI_NAME === "codeship" ? 1 : r;
    if ("TEAMCITY_VERSION" in i)
      return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(i.TEAMCITY_VERSION) ? 1 : 0;
    if (i.COLORTERM === "truecolor")
      return 3;
    if ("TERM_PROGRAM" in i) {
      const p = parseInt((i.TERM_PROGRAM_VERSION || "").split(".")[0], 10);
      switch (i.TERM_PROGRAM) {
        case "iTerm.app":
          return p >= 3 ? 3 : 2;
        case "Apple_Terminal":
          return 2;
      }
    }
    return /-256(color)?$/i.test(i.TERM) ? 2 : /^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(i.TERM) || "COLORTERM" in i ? 1 : r;
  }
  function c(d) {
    const m = s(d, d && d.isTTY);
    return o(m);
  }
  return Da = {
    supportsColor: c,
    stdout: o(s(!0, a.isatty(1))),
    stderr: o(s(!0, a.isatty(2)))
  }, Da;
}
var ai;
function ic() {
  return ai || (ai = 1, function(e, a) {
    const n = Ri, i = ye;
    a.init = r, a.log = c, a.formatArgs = o, a.save = d, a.load = m, a.useColors = t, a.destroy = i.deprecate(
      () => {
      },
      "Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."
    ), a.colors = [6, 2, 3, 4, 5, 1];
    try {
      const l = nc();
      l && (l.stderr || l).level >= 2 && (a.colors = [
        20,
        21,
        26,
        27,
        32,
        33,
        38,
        39,
        40,
        41,
        42,
        43,
        44,
        45,
        56,
        57,
        62,
        63,
        68,
        69,
        74,
        75,
        76,
        77,
        78,
        79,
        80,
        81,
        92,
        93,
        98,
        99,
        112,
        113,
        128,
        129,
        134,
        135,
        148,
        149,
        160,
        161,
        162,
        163,
        164,
        165,
        166,
        167,
        168,
        169,
        170,
        171,
        172,
        173,
        178,
        179,
        184,
        185,
        196,
        197,
        198,
        199,
        200,
        201,
        202,
        203,
        204,
        205,
        206,
        207,
        208,
        209,
        214,
        215,
        220,
        221
      ]);
    } catch {
    }
    a.inspectOpts = Object.keys(process.env).filter((l) => /^debug_/i.test(l)).reduce((l, v) => {
      const f = v.substring(6).toLowerCase().replace(/_([a-z])/g, (x, y) => y.toUpperCase());
      let h = process.env[v];
      return /^(yes|on|true|enabled)$/i.test(h) ? h = !0 : /^(no|off|false|disabled)$/i.test(h) ? h = !1 : h === "null" ? h = null : h = Number(h), l[f] = h, l;
    }, {});
    function t() {
      return "colors" in a.inspectOpts ? !!a.inspectOpts.colors : n.isatty(process.stderr.fd);
    }
    function o(l) {
      const { namespace: v, useColors: f } = this;
      if (f) {
        const h = this.color, x = "\x1B[3" + (h < 8 ? h : "8;5;" + h), y = `  ${x};1m${v} \x1B[0m`;
        l[0] = y + l[0].split(`
`).join(`
` + y), l.push(x + "m+" + e.exports.humanize(this.diff) + "\x1B[0m");
      } else
        l[0] = s() + v + " " + l[0];
    }
    function s() {
      return a.inspectOpts.hideDate ? "" : (/* @__PURE__ */ new Date()).toISOString() + " ";
    }
    function c(...l) {
      return process.stderr.write(i.formatWithOptions(a.inspectOpts, ...l) + `
`);
    }
    function d(l) {
      l ? process.env.DEBUG = l : delete process.env.DEBUG;
    }
    function m() {
      return process.env.DEBUG;
    }
    function r(l) {
      l.inspectOpts = {};
      const v = Object.keys(a.inspectOpts);
      for (let f = 0; f < v.length; f++)
        l.inspectOpts[v[f]] = a.inspectOpts[v[f]];
    }
    e.exports = ct()(a);
    const { formatters: p } = e.exports;
    p.o = function(l) {
      return this.inspectOpts.colors = this.useColors, i.inspect(l, this.inspectOpts).split(`
`).map((v) => v.trim()).join(" ");
    }, p.O = function(l) {
      return this.inspectOpts.colors = this.useColors, i.inspect(l, this.inspectOpts);
    };
  }(Ke, Ke.exports)), Ke.exports;
}
var ni;
function tc() {
  return ni || (ni = 1, typeof process > "u" || process.type === "renderer" || process.browser === !0 || process.__nwjs ? We.exports = ec() : We.exports = ic()), We.exports;
}
var Fe, oc = function() {
  if (!Fe) {
    try {
      Fe = tc()("follow-redirects");
    } catch {
    }
    typeof Fe != "function" && (Fe = function() {
    });
  }
  Fe.apply(null, arguments);
}, Me = ra, Ue = Me.URL, sc = Za, rc = Qa, dn = M.Writable, mn = Lt, pt = oc;
(function() {
  var a = typeof process < "u", n = typeof window < "u" && typeof document < "u", i = he(Error.captureStackTrace);
  !a && (n || !i) && console.warn("The follow-redirects package should be excluded from browser builds.");
})();
var fn = !1;
try {
  mn(new Ue(""));
} catch (e) {
  fn = e.code === "ERR_INVALID_URL";
}
var cc = [
  "auth",
  "host",
  "hostname",
  "href",
  "path",
  "pathname",
  "port",
  "protocol",
  "query",
  "search",
  "hash"
], xn = ["abort", "aborted", "connect", "error", "socket", "timeout"], vn = /* @__PURE__ */ Object.create(null);
xn.forEach(function(e) {
  vn[e] = function(a, n, i) {
    this._redirectable.emit(e, a, n, i);
  };
});
var Wa = He(
  "ERR_INVALID_URL",
  "Invalid URL",
  TypeError
), Ja = He(
  "ERR_FR_REDIRECTION_FAILURE",
  "Redirected request failed"
), pc = He(
  "ERR_FR_TOO_MANY_REDIRECTS",
  "Maximum number of redirects exceeded",
  Ja
), lc = He(
  "ERR_FR_MAX_BODY_LENGTH_EXCEEDED",
  "Request body larger than maxBodyLength limit"
), uc = He(
  "ERR_STREAM_WRITE_AFTER_END",
  "write after end"
), dc = dn.prototype.destroy || ut;
function G(e, a) {
  dn.call(this), this._sanitizeOptions(e), this._options = e, this._ended = !1, this._ending = !1, this._redirectCount = 0, this._redirects = [], this._requestBodyLength = 0, this._requestBodyBuffers = [], a && this.on("response", a);
  var n = this;
  this._onNativeResponse = function(i) {
    try {
      n._processResponse(i);
    } catch (t) {
      n.emit("error", t instanceof Ja ? t : new Ja({ cause: t }));
    }
  }, this._performRequest();
}
G.prototype = Object.create(dn.prototype);
G.prototype.abort = function() {
  bn(this._currentRequest), this._currentRequest.abort(), this.emit("abort");
};
G.prototype.destroy = function(e) {
  return bn(this._currentRequest, e), dc.call(this, e), this;
};
G.prototype.write = function(e, a, n) {
  if (this._ending)
    throw new uc();
  if (!xe(e) && !xc(e))
    throw new TypeError("data should be a string, Buffer or Uint8Array");
  if (he(a) && (n = a, a = null), e.length === 0) {
    n && n();
    return;
  }
  this._requestBodyLength + e.length <= this._options.maxBodyLength ? (this._requestBodyLength += e.length, this._requestBodyBuffers.push({ data: e, encoding: a }), this._currentRequest.write(e, a, n)) : (this.emit("error", new lc()), this.abort());
};
G.prototype.end = function(e, a, n) {
  if (he(e) ? (n = e, e = a = null) : he(a) && (n = a, a = null), !e)
    this._ended = this._ending = !0, this._currentRequest.end(null, null, n);
  else {
    var i = this, t = this._currentRequest;
    this.write(e, a, function() {
      i._ended = !0, t.end(null, null, n);
    }), this._ending = !0;
  }
};
G.prototype.setHeader = function(e, a) {
  this._options.headers[e] = a, this._currentRequest.setHeader(e, a);
};
G.prototype.removeHeader = function(e) {
  delete this._options.headers[e], this._currentRequest.removeHeader(e);
};
G.prototype.setTimeout = function(e, a) {
  var n = this;
  function i(s) {
    s.setTimeout(e), s.removeListener("timeout", s.destroy), s.addListener("timeout", s.destroy);
  }
  function t(s) {
    n._timeout && clearTimeout(n._timeout), n._timeout = setTimeout(function() {
      n.emit("timeout"), o();
    }, e), i(s);
  }
  function o() {
    n._timeout && (clearTimeout(n._timeout), n._timeout = null), n.removeListener("abort", o), n.removeListener("error", o), n.removeListener("response", o), n.removeListener("close", o), a && n.removeListener("timeout", a), n.socket || n._currentRequest.removeListener("socket", t);
  }
  return a && this.on("timeout", a), this.socket ? t(this.socket) : this._currentRequest.once("socket", t), this.on("socket", i), this.on("abort", o), this.on("error", o), this.on("response", o), this.on("close", o), this;
};
[
  "flushHeaders",
  "getHeader",
  "setNoDelay",
  "setSocketKeepAlive"
].forEach(function(e) {
  G.prototype[e] = function(a, n) {
    return this._currentRequest[e](a, n);
  };
});
["aborted", "connection", "socket"].forEach(function(e) {
  Object.defineProperty(G.prototype, e, {
    get: function() {
      return this._currentRequest[e];
    }
  });
});
G.prototype._sanitizeOptions = function(e) {
  if (e.headers || (e.headers = {}), e.host && (e.hostname || (e.hostname = e.host), delete e.host), !e.pathname && e.path) {
    var a = e.path.indexOf("?");
    a < 0 ? e.pathname = e.path : (e.pathname = e.path.substring(0, a), e.search = e.path.substring(a));
  }
};
G.prototype._performRequest = function() {
  var e = this._options.protocol, a = this._options.nativeProtocols[e];
  if (!a)
    throw new TypeError("Unsupported protocol " + e);
  if (this._options.agents) {
    var n = e.slice(0, -1);
    this._options.agent = this._options.agents[n];
  }
  var i = this._currentRequest = a.request(this._options, this._onNativeResponse);
  i._redirectable = this;
  for (var t of xn)
    i.on(t, vn[t]);
  if (this._currentUrl = /^\//.test(this._options.path) ? Me.format(this._options) : (
    // When making a request to a proxy, […]
    // a client MUST send the target URI in absolute-form […].
    this._options.path
  ), this._isRedirect) {
    var o = 0, s = this, c = this._requestBodyBuffers;
    (function d(m) {
      if (i === s._currentRequest)
        if (m)
          s.emit("error", m);
        else if (o < c.length) {
          var r = c[o++];
          i.finished || i.write(r.data, r.encoding, d);
        } else s._ended && i.end();
    })();
  }
};
G.prototype._processResponse = function(e) {
  var a = e.statusCode;
  this._options.trackRedirects && this._redirects.push({
    url: this._currentUrl,
    headers: e.headers,
    statusCode: a
  });
  var n = e.headers.location;
  if (!n || this._options.followRedirects === !1 || a < 300 || a >= 400) {
    e.responseUrl = this._currentUrl, e.redirects = this._redirects, this.emit("response", e), this._requestBodyBuffers = [];
    return;
  }
  if (bn(this._currentRequest), e.destroy(), ++this._redirectCount > this._options.maxRedirects)
    throw new pc();
  var i, t = this._options.beforeRedirect;
  t && (i = Object.assign({
    // The Host header was set by nativeProtocol.request
    Host: e.req.getHeader("host")
  }, this._options.headers));
  var o = this._options.method;
  ((a === 301 || a === 302) && this._options.method === "POST" || // RFC7231§6.4.4: The 303 (See Other) status code indicates that
  // the server is redirecting the user agent to a different resource […]
  // A user agent can perform a retrieval request targeting that URI
  // (a GET or HEAD request if using HTTP) […]
  a === 303 && !/^(?:GET|HEAD)$/.test(this._options.method)) && (this._options.method = "GET", this._requestBodyBuffers = [], Ia(/^content-/i, this._options.headers));
  var s = Ia(/^host$/i, this._options.headers), c = hn(this._currentUrl), d = s || c.host, m = /^\w+:/.test(n) ? this._currentUrl : Me.format(Object.assign(c, { host: d })), r = mc(n, m);
  if (pt("redirecting to", r.href), this._isRedirect = !0, Ka(r, this._options), (r.protocol !== c.protocol && r.protocol !== "https:" || r.host !== d && !fc(r.host, d)) && Ia(/^(?:(?:proxy-)?authorization|cookie)$/i, this._options.headers), he(t)) {
    var p = {
      headers: e.headers,
      statusCode: a
    }, l = {
      url: m,
      method: o,
      headers: i
    };
    t(this._options, p, l), this._sanitizeOptions(this._options);
  }
  this._performRequest();
};
function lt(e) {
  var a = {
    maxRedirects: 21,
    maxBodyLength: 10485760
  }, n = {};
  return Object.keys(e).forEach(function(i) {
    var t = i + ":", o = n[t] = e[i], s = a[i] = Object.create(o);
    function c(m, r, p) {
      return vc(m) ? m = Ka(m) : xe(m) ? m = Ka(hn(m)) : (p = r, r = dt(m), m = { protocol: t }), he(r) && (p = r, r = null), r = Object.assign({
        maxRedirects: a.maxRedirects,
        maxBodyLength: a.maxBodyLength
      }, m, r), r.nativeProtocols = n, !xe(r.host) && !xe(r.hostname) && (r.hostname = "::1"), mn.equal(r.protocol, t, "protocol mismatch"), pt("options", r), new G(r, p);
    }
    function d(m, r, p) {
      var l = s.request(m, r, p);
      return l.end(), l;
    }
    Object.defineProperties(s, {
      request: { value: c, configurable: !0, enumerable: !0, writable: !0 },
      get: { value: d, configurable: !0, enumerable: !0, writable: !0 }
    });
  }), a;
}
function ut() {
}
function hn(e) {
  var a;
  if (fn)
    a = new Ue(e);
  else if (a = dt(Me.parse(e)), !xe(a.protocol))
    throw new Wa({ input: e });
  return a;
}
function mc(e, a) {
  return fn ? new Ue(e, a) : hn(Me.resolve(a, e));
}
function dt(e) {
  if (/^\[/.test(e.hostname) && !/^\[[:0-9a-f]+\]$/i.test(e.hostname))
    throw new Wa({ input: e.href || e });
  if (/^\[/.test(e.host) && !/^\[[:0-9a-f]+\](:\d+)?$/i.test(e.host))
    throw new Wa({ input: e.href || e });
  return e;
}
function Ka(e, a) {
  var n = a || {};
  for (var i of cc)
    n[i] = e[i];
  return n.hostname.startsWith("[") && (n.hostname = n.hostname.slice(1, -1)), n.port !== "" && (n.port = Number(n.port)), n.path = n.search ? n.pathname + n.search : n.pathname, n;
}
function Ia(e, a) {
  var n;
  for (var i in a)
    e.test(i) && (n = a[i], delete a[i]);
  return n === null || typeof n > "u" ? void 0 : String(n).trim();
}
function He(e, a, n) {
  function i(t) {
    he(Error.captureStackTrace) && Error.captureStackTrace(this, this.constructor), Object.assign(this, t || {}), this.code = e, this.message = this.cause ? a + ": " + this.cause.message : a;
  }
  return i.prototype = new (n || Error)(), Object.defineProperties(i.prototype, {
    constructor: {
      value: i,
      enumerable: !1
    },
    name: {
      value: "Error [" + e + "]",
      enumerable: !1
    }
  }), i;
}
function bn(e, a) {
  for (var n of xn)
    e.removeListener(n, vn[n]);
  e.on("error", ut), e.destroy(a);
}
function fc(e, a) {
  mn(xe(e) && xe(a));
  var n = e.length - a.length - 1;
  return n > 0 && e[n] === "." && e.endsWith(a);
}
function xe(e) {
  return typeof e == "string" || e instanceof String;
}
function he(e) {
  return typeof e == "function";
}
function xc(e) {
  return typeof e == "object" && "length" in e;
}
function vc(e) {
  return Ue && e instanceof Ue;
}
un.exports = lt({ http: sc, https: rc });
un.exports.wrap = lt;
var hc = un.exports;
const bc = /* @__PURE__ */ an(hc), ta = "1.13.2";
function mt(e) {
  const a = /^([-+\w]{1,25})(:?\/\/|:)/.exec(e);
  return a && a[1] || "";
}
const gc = /^(?:([^;]+);)?(?:[^;]+;)?(base64|),([\s\S]*)$/;
function yc(e, a, n) {
  const i = n && n.Blob || F.classes.Blob, t = mt(e);
  if (a === void 0 && i && (a = !0), t === "data") {
    e = t.length ? e.slice(t.length + 1) : e;
    const o = gc.exec(e);
    if (!o)
      throw new b("Invalid URL", b.ERR_INVALID_URL);
    const s = o[1], c = o[2], d = o[3], m = Buffer.from(decodeURIComponent(d), c ? "base64" : "utf8");
    if (a) {
      if (!i)
        throw new b("Blob is not supported", b.ERR_NOT_SUPPORT);
      return new i([m], { type: s });
    }
    return m;
  }
  throw new b("Unsupported protocol " + t, b.ERR_NOT_SUPPORT);
}
const za = Symbol("internals");
class ii extends M.Transform {
  constructor(a) {
    a = u.toFlatObject(a, {
      maxRate: 0,
      chunkSize: 64 * 1024,
      minChunkSize: 100,
      timeWindow: 500,
      ticksRate: 2,
      samplesCount: 15
    }, null, (i, t) => !u.isUndefined(t[i])), super({
      readableHighWaterMark: a.chunkSize
    });
    const n = this[za] = {
      timeWindow: a.timeWindow,
      chunkSize: a.chunkSize,
      maxRate: a.maxRate,
      minChunkSize: a.minChunkSize,
      bytesSeen: 0,
      isCaptured: !1,
      notifiedBytesLoaded: 0,
      ts: Date.now(),
      bytes: 0,
      onReadCallback: null
    };
    this.on("newListener", (i) => {
      i === "progress" && (n.isCaptured || (n.isCaptured = !0));
    });
  }
  _read(a) {
    const n = this[za];
    return n.onReadCallback && n.onReadCallback(), super._read(a);
  }
  _transform(a, n, i) {
    const t = this[za], o = t.maxRate, s = this.readableHighWaterMark, c = t.timeWindow, d = 1e3 / c, m = o / d, r = t.minChunkSize !== !1 ? Math.max(t.minChunkSize, m * 0.01) : 0, p = (v, f) => {
      const h = Buffer.byteLength(v);
      t.bytesSeen += h, t.bytes += h, t.isCaptured && this.emit("progress", t.bytesSeen), this.push(v) ? process.nextTick(f) : t.onReadCallback = () => {
        t.onReadCallback = null, process.nextTick(f);
      };
    }, l = (v, f) => {
      const h = Buffer.byteLength(v);
      let x = null, y = s, E, _ = 0;
      if (o) {
        const C = Date.now();
        (!t.ts || (_ = C - t.ts) >= c) && (t.ts = C, E = m - t.bytes, t.bytes = E < 0 ? -E : 0, _ = 0), E = m - t.bytes;
      }
      if (o) {
        if (E <= 0)
          return setTimeout(() => {
            f(null, v);
          }, c - _);
        E < y && (y = E);
      }
      y && h > y && h - y > r && (x = v.subarray(y), v = v.subarray(0, y)), p(v, x ? () => {
        process.nextTick(f, null, x);
      } : f);
    };
    l(a, function v(f, h) {
      if (f)
        return i(f);
      h ? l(h, v) : i(null);
    });
  }
}
const { asyncIterator: ti } = Symbol, ft = async function* (e) {
  e.stream ? yield* e.stream() : e.arrayBuffer ? yield await e.arrayBuffer() : e[ti] ? yield* e[ti]() : yield e;
}, wc = F.ALPHABET.ALPHA_DIGIT + "-_", qe = typeof TextEncoder == "function" ? new TextEncoder() : new ye.TextEncoder(), me = `\r
`, Ec = qe.encode(me), _c = 2;
class Rc {
  constructor(a, n) {
    const { escapeName: i } = this.constructor, t = u.isString(n);
    let o = `Content-Disposition: form-data; name="${i(a)}"${!t && n.name ? `; filename="${i(n.name)}"` : ""}${me}`;
    t ? n = qe.encode(String(n).replace(/\r?\n|\r\n?/g, me)) : o += `Content-Type: ${n.type || "application/octet-stream"}${me}`, this.headers = qe.encode(o + me), this.contentLength = t ? n.byteLength : n.size, this.size = this.headers.byteLength + this.contentLength + _c, this.name = a, this.value = n;
  }
  async *encode() {
    yield this.headers;
    const { value: a } = this;
    u.isTypedArray(a) ? yield a : yield* ft(a), yield Ec;
  }
  static escapeName(a) {
    return String(a).replace(/[\r\n"]/g, (n) => ({
      "\r": "%0D",
      "\n": "%0A",
      '"': "%22"
    })[n]);
  }
}
const Sc = (e, a, n) => {
  const {
    tag: i = "form-data-boundary",
    size: t = 25,
    boundary: o = i + "-" + F.generateString(t, wc)
  } = n || {};
  if (!u.isFormData(e))
    throw TypeError("FormData instance required");
  if (o.length < 1 || o.length > 70)
    throw Error("boundary must be 10-70 characters long");
  const s = qe.encode("--" + o + me), c = qe.encode("--" + o + "--" + me);
  let d = c.byteLength;
  const m = Array.from(e.entries()).map(([p, l]) => {
    const v = new Rc(p, l);
    return d += v.size, v;
  });
  d += s.byteLength * m.length, d = u.toFiniteNumber(d);
  const r = {
    "Content-Type": `multipart/form-data; boundary=${o}`
  };
  return Number.isFinite(d) && (r["Content-Length"] = d), a && a(r), Ft.from(async function* () {
    for (const p of m)
      yield s, yield* p.encode();
    yield c;
  }());
};
class kc extends M.Transform {
  __transform(a, n, i) {
    this.push(a), i();
  }
  _transform(a, n, i) {
    if (a.length !== 0 && (this._transform = this.__transform, a[0] !== 120)) {
      const t = Buffer.alloc(2);
      t[0] = 120, t[1] = 156, this.push(t, n);
    }
    this.__transform(a, n, i);
  }
}
const Tc = (e, a) => u.isAsyncFn(e) ? function(...n) {
  const i = n.pop();
  e.apply(this, n).then((t) => {
    try {
      a ? i(null, ...a(t)) : i(null, t);
    } catch (o) {
      i(o);
    }
  }, i);
} : e;
function Cc(e, a) {
  e = e || 10;
  const n = new Array(e), i = new Array(e);
  let t = 0, o = 0, s;
  return a = a !== void 0 ? a : 1e3, function(d) {
    const m = Date.now(), r = i[o];
    s || (s = m), n[t] = d, i[t] = m;
    let p = o, l = 0;
    for (; p !== t; )
      l += n[p++], p = p % e;
    if (t = (t + 1) % e, t === o && (o = (o + 1) % e), m - s < a)
      return;
    const v = r && m - r;
    return v ? Math.round(l * 1e3 / v) : void 0;
  };
}
function Ac(e, a) {
  let n = 0, i = 1e3 / a, t, o;
  const s = (m, r = Date.now()) => {
    n = r, t = null, o && (clearTimeout(o), o = null), e(...m);
  };
  return [(...m) => {
    const r = Date.now(), p = r - n;
    p >= i ? s(m, r) : (t = m, o || (o = setTimeout(() => {
      o = null, s(t);
    }, i - p)));
  }, () => t && s(t)];
}
const Ae = (e, a, n = 3) => {
  let i = 0;
  const t = Cc(50, 250);
  return Ac((o) => {
    const s = o.loaded, c = o.lengthComputable ? o.total : void 0, d = s - i, m = t(d), r = s <= c;
    i = s;
    const p = {
      loaded: s,
      total: c,
      progress: c ? s / c : void 0,
      bytes: d,
      rate: m || void 0,
      estimated: m && c && r ? (c - s) / m : void 0,
      event: o,
      lengthComputable: c != null,
      [a ? "download" : "upload"]: !0
    };
    e(p);
  }, n);
}, oa = (e, a) => {
  const n = e != null;
  return [(i) => a[0]({
    lengthComputable: n,
    total: e,
    loaded: i
  }), a[1]];
}, sa = (e) => (...a) => u.asap(() => e(...a));
function jc(e) {
  if (!e || typeof e != "string" || !e.startsWith("data:")) return 0;
  const a = e.indexOf(",");
  if (a < 0) return 0;
  const n = e.slice(5, a), i = e.slice(a + 1);
  if (/;base64/i.test(n)) {
    let o = i.length;
    const s = i.length;
    for (let l = 0; l < s; l++)
      if (i.charCodeAt(l) === 37 && l + 2 < s) {
        const v = i.charCodeAt(l + 1), f = i.charCodeAt(l + 2);
        (v >= 48 && v <= 57 || v >= 65 && v <= 70 || v >= 97 && v <= 102) && (f >= 48 && f <= 57 || f >= 65 && f <= 70 || f >= 97 && f <= 102) && (o -= 2, l += 2);
      }
    let c = 0, d = s - 1;
    const m = (l) => l >= 2 && i.charCodeAt(l - 2) === 37 && // '%'
    i.charCodeAt(l - 1) === 51 && // '3'
    (i.charCodeAt(l) === 68 || i.charCodeAt(l) === 100);
    d >= 0 && (i.charCodeAt(d) === 61 ? (c++, d--) : m(d) && (c++, d -= 3)), c === 1 && d >= 0 && (i.charCodeAt(d) === 61 || m(d)) && c++;
    const p = Math.floor(o / 4) * 3 - (c || 0);
    return p > 0 ? p : 0;
  }
  return Buffer.byteLength(i, "utf8");
}
const oi = {
  flush: ce.constants.Z_SYNC_FLUSH,
  finishFlush: ce.constants.Z_SYNC_FLUSH
}, Oc = {
  flush: ce.constants.BROTLI_OPERATION_FLUSH,
  finishFlush: ce.constants.BROTLI_OPERATION_FLUSH
}, si = u.isFunction(ce.createBrotliDecompress), { http: Fc, https: Pc } = bc, Lc = /https:?/, ri = F.protocols.map((e) => e + ":"), ci = (e, [a, n]) => (e.on("end", n).on("error", n), a);
class Uc {
  constructor() {
    this.sessions = /* @__PURE__ */ Object.create(null);
  }
  getSession(a, n) {
    n = Object.assign({
      sessionTimeout: 1e3
    }, n);
    let i = this.sessions[a];
    if (i) {
      let r = i.length;
      for (let p = 0; p < r; p++) {
        const [l, v] = i[p];
        if (!l.destroyed && !l.closed && ye.isDeepStrictEqual(v, n))
          return l;
      }
    }
    const t = _i.connect(a, n);
    let o;
    const s = () => {
      if (o)
        return;
      o = !0;
      let r = i, p = r.length, l = p;
      for (; l--; )
        if (r[l][0] === t) {
          p === 1 ? delete this.sessions[a] : r.splice(l, 1);
          return;
        }
    }, c = t.request, { sessionTimeout: d } = n;
    if (d != null) {
      let r, p = 0;
      t.request = function() {
        const l = c.apply(this, arguments);
        return p++, r && (clearTimeout(r), r = null), l.once("close", () => {
          --p || (r = setTimeout(() => {
            r = null, s();
          }, d));
        }), l;
      };
    }
    t.once("close", s);
    let m = [
      t,
      n
    ];
    return i ? i.push(m) : i = this.sessions[a] = [m], t;
  }
}
const qc = new Uc();
function Nc(e, a) {
  e.beforeRedirects.proxy && e.beforeRedirects.proxy(e), e.beforeRedirects.config && e.beforeRedirects.config(e, a);
}
function xt(e, a, n) {
  let i = a;
  if (!i && i !== !1) {
    const t = rt.getProxyForUrl(n);
    t && (i = new URL(t));
  }
  if (i) {
    if (i.username && (i.auth = (i.username || "") + ":" + (i.password || "")), i.auth) {
      (i.auth.username || i.auth.password) && (i.auth = (i.auth.username || "") + ":" + (i.auth.password || ""));
      const o = Buffer.from(i.auth, "utf8").toString("base64");
      e.headers["Proxy-Authorization"] = "Basic " + o;
    }
    e.headers.host = e.hostname + (e.port ? ":" + e.port : "");
    const t = i.hostname || i.host;
    e.hostname = t, e.host = t, e.port = i.port, e.path = n, i.protocol && (e.protocol = i.protocol.includes(":") ? i.protocol : `${i.protocol}:`);
  }
  e.beforeRedirects.proxy = function(o) {
    xt(o, a, o.href);
  };
}
const Bc = typeof process < "u" && u.kindOf(process) === "process", Dc = (e) => new Promise((a, n) => {
  let i, t;
  const o = (d, m) => {
    t || (t = !0, i && i(d, m));
  }, s = (d) => {
    o(d), a(d);
  }, c = (d) => {
    o(d, !0), n(d);
  };
  e(s, c, (d) => i = d).catch(c);
}), Ic = ({ address: e, family: a }) => {
  if (!u.isString(e))
    throw TypeError("address must be a string");
  return {
    address: e,
    family: a || (e.indexOf(".") < 0 ? 6 : 4)
  };
}, pi = (e, a) => Ic(u.isObject(e) ? e : { address: e, family: a }), zc = {
  request(e, a) {
    const n = e.protocol + "//" + e.hostname + ":" + (e.port || 80), { http2Options: i, headers: t } = e, o = qc.getSession(n, i), {
      HTTP2_HEADER_SCHEME: s,
      HTTP2_HEADER_METHOD: c,
      HTTP2_HEADER_PATH: d,
      HTTP2_HEADER_STATUS: m
    } = _i.constants, r = {
      [s]: e.protocol.replace(":", ""),
      [c]: e.method,
      [d]: e.path
    };
    u.forEach(t, (l, v) => {
      v.charAt(0) !== ":" && (r[v] = l);
    });
    const p = o.request(r);
    return p.once("response", (l) => {
      const v = p;
      l = Object.assign({}, l);
      const f = l[m];
      delete l[m], v.headers = l, v.statusCode = +f, a(v);
    }), p;
  }
}, $c = Bc && function(a) {
  return Dc(async function(i, t, o) {
    let { data: s, lookup: c, family: d, httpVersion: m = 1, http2Options: r } = a;
    const { responseType: p, responseEncoding: l } = a, v = a.method.toUpperCase();
    let f, h = !1, x;
    if (m = +m, Number.isNaN(m))
      throw TypeError(`Invalid protocol version: '${a.httpVersion}' is not a number`);
    if (m !== 1 && m !== 2)
      throw TypeError(`Unsupported protocol version '${m}'`);
    const y = m === 2;
    if (c) {
      const w = Tc(c, (g) => u.isArray(g) ? g : [g]);
      c = (g, T, W) => {
        w(g, T, (L, K, re) => {
          if (L)
            return W(L);
          const $ = u.isArray(K) ? K.map((Ge) => pi(Ge)) : [pi(K, re)];
          T.all ? W(L, $) : W(L, $[0].address, $[0].family);
        });
      };
    }
    const E = new qt();
    function _(w) {
      try {
        E.emit("abort", !w || w.type ? new le(null, a, x) : w);
      } catch (g) {
        console.warn("emit error", g);
      }
    }
    E.once("abort", t);
    const C = () => {
      a.cancelToken && a.cancelToken.unsubscribe(_), a.signal && a.signal.removeEventListener("abort", _), E.removeAllListeners();
    };
    (a.cancelToken || a.signal) && (a.cancelToken && a.cancelToken.subscribe(_), a.signal && (a.signal.aborted ? _() : a.signal.addEventListener("abort", _))), o((w, g) => {
      if (f = !0, g) {
        h = !0, C();
        return;
      }
      const { data: T } = w;
      if (T instanceof M.Readable || T instanceof M.Duplex) {
        const W = M.finished(T, () => {
          W(), C();
        });
      } else
        C();
    });
    const U = ln(a.baseURL, a.url, a.allowAbsoluteUrls), j = new URL(U, F.hasBrowserEnv ? F.origin : void 0), O = j.protocol || ri[0];
    if (O === "data:") {
      if (a.maxContentLength > -1) {
        const g = String(a.url || U || "");
        if (jc(g) > a.maxContentLength)
          return t(new b(
            "maxContentLength size of " + a.maxContentLength + " exceeded",
            b.ERR_BAD_RESPONSE,
            a
          ));
      }
      let w;
      if (v !== "GET")
        return Re(i, t, {
          status: 405,
          statusText: "method not allowed",
          headers: {},
          config: a
        });
      try {
        w = yc(a.url, p === "blob", {
          Blob: a.env && a.env.Blob
        });
      } catch (g) {
        throw b.from(g, b.ERR_BAD_REQUEST, a);
      }
      return p === "text" ? (w = w.toString(l), (!l || l === "utf8") && (w = u.stripBOM(w))) : p === "stream" && (w = M.Readable.from(w)), Re(i, t, {
        data: w,
        status: 200,
        statusText: "OK",
        headers: new D(),
        config: a
      });
    }
    if (ri.indexOf(O) === -1)
      return t(new b(
        "Unsupported protocol " + O,
        b.ERR_BAD_REQUEST,
        a
      ));
    const q = D.from(a.headers).normalize();
    q.set("User-Agent", "axios/" + ta, !1);
    const { onUploadProgress: J, onDownloadProgress: oe } = a, ue = a.maxRate;
    let ie, ee;
    if (u.isSpecCompliantForm(s)) {
      const w = q.getContentType(/boundary=([-_\w\d]{10,70})/i);
      s = Sc(s, (g) => {
        q.set(g);
      }, {
        tag: `axios-${ta}-boundary`,
        boundary: w && w[1] || void 0
      });
    } else if (u.isFormData(s) && u.isFunction(s.getHeaders)) {
      if (q.set(s.getHeaders()), !q.hasContentLength())
        try {
          const w = await ye.promisify(s.getLength).call(s);
          Number.isFinite(w) && w >= 0 && q.setContentLength(w);
        } catch {
        }
    } else if (u.isBlob(s) || u.isFile(s))
      s.size && q.setContentType(s.type || "application/octet-stream"), q.setContentLength(s.size || 0), s = M.Readable.from(ft(s));
    else if (s && !u.isStream(s)) {
      if (!Buffer.isBuffer(s)) if (u.isArrayBuffer(s))
        s = Buffer.from(new Uint8Array(s));
      else if (u.isString(s))
        s = Buffer.from(s, "utf-8");
      else
        return t(new b(
          "Data after transformation must be a string, an ArrayBuffer, a Buffer, or a Stream",
          b.ERR_BAD_REQUEST,
          a
        ));
      if (q.setContentLength(s.length, !1), a.maxBodyLength > -1 && s.length > a.maxBodyLength)
        return t(new b(
          "Request body larger than maxBodyLength limit",
          b.ERR_BAD_REQUEST,
          a
        ));
    }
    const te = u.toFiniteNumber(q.getContentLength());
    u.isArray(ue) ? (ie = ue[0], ee = ue[1]) : ie = ee = ue, s && (J || ie) && (u.isStream(s) || (s = M.Readable.from(s, { objectMode: !1 })), s = M.pipeline([s, new ii({
      maxRate: u.toFiniteNumber(ie)
    })], u.noop), J && s.on("progress", ci(
      s,
      oa(
        te,
        Ae(sa(J), !1, 3)
      )
    )));
    let se;
    if (a.auth) {
      const w = a.auth.username || "", g = a.auth.password || "";
      se = w + ":" + g;
    }
    if (!se && j.username) {
      const w = j.username, g = j.password;
      se = w + ":" + g;
    }
    se && q.delete("authorization");
    let V;
    try {
      V = rn(
        j.pathname + j.search,
        a.params,
        a.paramsSerializer
      ).replace(/^\?/, "");
    } catch (w) {
      const g = new Error(w.message);
      return g.config = a, g.url = a.url, g.exists = !0, t(g);
    }
    q.set(
      "Accept-Encoding",
      "gzip, compress, deflate" + (si ? ", br" : ""),
      !1
    );
    const B = {
      path: V,
      method: v,
      headers: q.toJSON(),
      agents: { http: a.httpAgent, https: a.httpsAgent },
      auth: se,
      protocol: O,
      family: d,
      beforeRedirect: Nc,
      beforeRedirects: {},
      http2Options: r
    };
    !u.isUndefined(c) && (B.lookup = c), a.socketPath ? B.socketPath = a.socketPath : (B.hostname = j.hostname.startsWith("[") ? j.hostname.slice(1, -1) : j.hostname, B.port = j.port, xt(B, a.proxy, O + "//" + j.hostname + (j.port ? ":" + j.port : "") + B.path));
    let z;
    const we = Lc.test(B.protocol);
    if (B.agent = we ? a.httpsAgent : a.httpAgent, y ? z = zc : a.transport ? z = a.transport : a.maxRedirects === 0 ? z = we ? Qa : Za : (a.maxRedirects && (B.maxRedirects = a.maxRedirects), a.beforeRedirect && (B.beforeRedirects.config = a.beforeRedirect), z = we ? Pc : Fc), a.maxBodyLength > -1 ? B.maxBodyLength = a.maxBodyLength : B.maxBodyLength = 1 / 0, a.insecureHTTPParser && (B.insecureHTTPParser = a.insecureHTTPParser), x = z.request(B, function(g) {
      if (x.destroyed) return;
      const T = [g], W = u.toFiniteNumber(g.headers["content-length"]);
      if (oe || ee) {
        const $ = new ii({
          maxRate: u.toFiniteNumber(ee)
        });
        oe && $.on("progress", ci(
          $,
          oa(
            W,
            Ae(sa(oe), !0, 3)
          )
        )), T.push($);
      }
      let L = g;
      const K = g.req || x;
      if (a.decompress !== !1 && g.headers["content-encoding"])
        switch ((v === "HEAD" || g.statusCode === 204) && delete g.headers["content-encoding"], (g.headers["content-encoding"] || "").toLowerCase()) {
          case "gzip":
          case "x-gzip":
          case "compress":
          case "x-compress":
            T.push(ce.createUnzip(oi)), delete g.headers["content-encoding"];
            break;
          case "deflate":
            T.push(new kc()), T.push(ce.createUnzip(oi)), delete g.headers["content-encoding"];
            break;
          case "br":
            si && (T.push(ce.createBrotliDecompress(Oc)), delete g.headers["content-encoding"]);
        }
      L = T.length > 1 ? M.pipeline(T, u.noop) : T[0];
      const re = {
        status: g.statusCode,
        statusText: g.statusMessage,
        headers: new D(g.headers),
        config: a,
        request: K
      };
      if (p === "stream")
        re.data = L, Re(i, t, re);
      else {
        const $ = [];
        let Ge = 0;
        L.on("data", function(I) {
          $.push(I), Ge += I.length, a.maxContentLength > -1 && Ge > a.maxContentLength && (h = !0, L.destroy(), _(new b(
            "maxContentLength size of " + a.maxContentLength + " exceeded",
            b.ERR_BAD_RESPONSE,
            a,
            K
          )));
        }), L.on("aborted", function() {
          if (h)
            return;
          const I = new b(
            "stream has been aborted",
            b.ERR_BAD_RESPONSE,
            a,
            K
          );
          L.destroy(I), t(I);
        }), L.on("error", function(I) {
          x.destroyed || t(b.from(I, null, a, K));
        }), L.on("end", function() {
          try {
            let I = $.length === 1 ? $[0] : Buffer.concat($);
            p !== "arraybuffer" && (I = I.toString(l), (!l || l === "utf8") && (I = u.stripBOM(I))), re.data = I;
          } catch (I) {
            return t(b.from(I, null, a, re.request, re));
          }
          Re(i, t, re);
        });
      }
      E.once("abort", ($) => {
        L.destroyed || (L.emit("error", $), L.destroy());
      });
    }), E.once("abort", (w) => {
      x.close ? x.close() : x.destroy(w);
    }), x.on("error", function(g) {
      t(b.from(g, null, a, x));
    }), x.on("socket", function(g) {
      g.setKeepAlive(!0, 1e3 * 60);
    }), a.timeout) {
      const w = parseInt(a.timeout, 10);
      if (Number.isNaN(w)) {
        _(new b(
          "error trying to parse `config.timeout` to int",
          b.ERR_BAD_OPTION_VALUE,
          a,
          x
        ));
        return;
      }
      x.setTimeout(w, function() {
        if (f) return;
        let T = a.timeout ? "timeout of " + a.timeout + "ms exceeded" : "timeout exceeded";
        const W = a.transitional || cn;
        a.timeoutErrorMessage && (T = a.timeoutErrorMessage), _(new b(
          T,
          W.clarifyTimeoutError ? b.ETIMEDOUT : b.ECONNABORTED,
          a,
          x
        ));
      });
    } else
      x.setTimeout(0);
    if (u.isStream(s)) {
      let w = !1, g = !1;
      s.on("end", () => {
        w = !0;
      }), s.once("error", (T) => {
        g = !0, x.destroy(T);
      }), s.on("close", () => {
        !w && !g && _(new le("Request stream has been aborted", a, x));
      }), s.pipe(x);
    } else
      s && x.write(s), x.end();
  });
}, Mc = F.hasStandardBrowserEnv ? /* @__PURE__ */ ((e, a) => (n) => (n = new URL(n, F.origin), e.protocol === n.protocol && e.host === n.host && (a || e.port === n.port)))(
  new URL(F.origin),
  F.navigator && /(msie|trident)/i.test(F.navigator.userAgent)
) : () => !0, Hc = F.hasStandardBrowserEnv ? (
  // Standard browser envs support document.cookie
  {
    write(e, a, n, i, t, o, s) {
      if (typeof document > "u") return;
      const c = [`${e}=${encodeURIComponent(a)}`];
      u.isNumber(n) && c.push(`expires=${new Date(n).toUTCString()}`), u.isString(i) && c.push(`path=${i}`), u.isString(t) && c.push(`domain=${t}`), o === !0 && c.push("secure"), u.isString(s) && c.push(`SameSite=${s}`), document.cookie = c.join("; ");
    },
    read(e) {
      if (typeof document > "u") return null;
      const a = document.cookie.match(new RegExp("(?:^|; )" + e + "=([^;]*)"));
      return a ? decodeURIComponent(a[1]) : null;
    },
    remove(e) {
      this.write(e, "", Date.now() - 864e5, "/");
    }
  }
) : (
  // Non-standard browser env (web workers, react-native) lack needed support.
  {
    write() {
    },
    read() {
      return null;
    },
    remove() {
    }
  }
), li = (e) => e instanceof D ? { ...e } : e;
function be(e, a) {
  a = a || {};
  const n = {};
  function i(m, r, p, l) {
    return u.isPlainObject(m) && u.isPlainObject(r) ? u.merge.call({ caseless: l }, m, r) : u.isPlainObject(r) ? u.merge({}, r) : u.isArray(r) ? r.slice() : r;
  }
  function t(m, r, p, l) {
    if (u.isUndefined(r)) {
      if (!u.isUndefined(m))
        return i(void 0, m, p, l);
    } else return i(m, r, p, l);
  }
  function o(m, r) {
    if (!u.isUndefined(r))
      return i(void 0, r);
  }
  function s(m, r) {
    if (u.isUndefined(r)) {
      if (!u.isUndefined(m))
        return i(void 0, m);
    } else return i(void 0, r);
  }
  function c(m, r, p) {
    if (p in a)
      return i(m, r);
    if (p in e)
      return i(void 0, m);
  }
  const d = {
    url: o,
    method: o,
    data: o,
    baseURL: s,
    transformRequest: s,
    transformResponse: s,
    paramsSerializer: s,
    timeout: s,
    timeoutMessage: s,
    withCredentials: s,
    withXSRFToken: s,
    adapter: s,
    responseType: s,
    xsrfCookieName: s,
    xsrfHeaderName: s,
    onUploadProgress: s,
    onDownloadProgress: s,
    decompress: s,
    maxContentLength: s,
    maxBodyLength: s,
    beforeRedirect: s,
    transport: s,
    httpAgent: s,
    httpsAgent: s,
    cancelToken: s,
    socketPath: s,
    responseEncoding: s,
    validateStatus: c,
    headers: (m, r, p) => t(li(m), li(r), p, !0)
  };
  return u.forEach(Object.keys({ ...e, ...a }), function(r) {
    const p = d[r] || t, l = p(e[r], a[r], r);
    u.isUndefined(l) && p !== c || (n[r] = l);
  }), n;
}
const vt = (e) => {
  const a = be({}, e);
  let { data: n, withXSRFToken: i, xsrfHeaderName: t, xsrfCookieName: o, headers: s, auth: c } = a;
  if (a.headers = s = D.from(s), a.url = rn(ln(a.baseURL, a.url, a.allowAbsoluteUrls), e.params, e.paramsSerializer), c && s.set(
    "Authorization",
    "Basic " + btoa((c.username || "") + ":" + (c.password ? unescape(encodeURIComponent(c.password)) : ""))
  ), u.isFormData(n)) {
    if (F.hasStandardBrowserEnv || F.hasStandardBrowserWebWorkerEnv)
      s.setContentType(void 0);
    else if (u.isFunction(n.getHeaders)) {
      const d = n.getHeaders(), m = ["content-type", "content-length"];
      Object.entries(d).forEach(([r, p]) => {
        m.includes(r.toLowerCase()) && s.set(r, p);
      });
    }
  }
  if (F.hasStandardBrowserEnv && (i && u.isFunction(i) && (i = i(a)), i || i !== !1 && Mc(a.url))) {
    const d = t && o && Hc.read(o);
    d && s.set(t, d);
  }
  return a;
}, Gc = typeof XMLHttpRequest < "u", Vc = Gc && function(e) {
  return new Promise(function(n, i) {
    const t = vt(e);
    let o = t.data;
    const s = D.from(t.headers).normalize();
    let { responseType: c, onUploadProgress: d, onDownloadProgress: m } = t, r, p, l, v, f;
    function h() {
      v && v(), f && f(), t.cancelToken && t.cancelToken.unsubscribe(r), t.signal && t.signal.removeEventListener("abort", r);
    }
    let x = new XMLHttpRequest();
    x.open(t.method.toUpperCase(), t.url, !0), x.timeout = t.timeout;
    function y() {
      if (!x)
        return;
      const _ = D.from(
        "getAllResponseHeaders" in x && x.getAllResponseHeaders()
      ), U = {
        data: !c || c === "text" || c === "json" ? x.responseText : x.response,
        status: x.status,
        statusText: x.statusText,
        headers: _,
        config: e,
        request: x
      };
      Re(function(O) {
        n(O), h();
      }, function(O) {
        i(O), h();
      }, U), x = null;
    }
    "onloadend" in x ? x.onloadend = y : x.onreadystatechange = function() {
      !x || x.readyState !== 4 || x.status === 0 && !(x.responseURL && x.responseURL.indexOf("file:") === 0) || setTimeout(y);
    }, x.onabort = function() {
      x && (i(new b("Request aborted", b.ECONNABORTED, e, x)), x = null);
    }, x.onerror = function(C) {
      const U = C && C.message ? C.message : "Network Error", j = new b(U, b.ERR_NETWORK, e, x);
      j.event = C || null, i(j), x = null;
    }, x.ontimeout = function() {
      let C = t.timeout ? "timeout of " + t.timeout + "ms exceeded" : "timeout exceeded";
      const U = t.transitional || cn;
      t.timeoutErrorMessage && (C = t.timeoutErrorMessage), i(new b(
        C,
        U.clarifyTimeoutError ? b.ETIMEDOUT : b.ECONNABORTED,
        e,
        x
      )), x = null;
    }, o === void 0 && s.setContentType(null), "setRequestHeader" in x && u.forEach(s.toJSON(), function(C, U) {
      x.setRequestHeader(U, C);
    }), u.isUndefined(t.withCredentials) || (x.withCredentials = !!t.withCredentials), c && c !== "json" && (x.responseType = t.responseType), m && ([l, f] = Ae(m, !0), x.addEventListener("progress", l)), d && x.upload && ([p, v] = Ae(d), x.upload.addEventListener("progress", p), x.upload.addEventListener("loadend", v)), (t.cancelToken || t.signal) && (r = (_) => {
      x && (i(!_ || _.type ? new le(null, e, x) : _), x.abort(), x = null);
    }, t.cancelToken && t.cancelToken.subscribe(r), t.signal && (t.signal.aborted ? r() : t.signal.addEventListener("abort", r)));
    const E = mt(t.url);
    if (E && F.protocols.indexOf(E) === -1) {
      i(new b("Unsupported protocol " + E + ":", b.ERR_BAD_REQUEST, e));
      return;
    }
    x.send(o || null);
  });
}, Wc = (e, a) => {
  const { length: n } = e = e ? e.filter(Boolean) : [];
  if (a || n) {
    let i = new AbortController(), t;
    const o = function(m) {
      if (!t) {
        t = !0, c();
        const r = m instanceof Error ? m : this.reason;
        i.abort(r instanceof b ? r : new le(r instanceof Error ? r.message : r));
      }
    };
    let s = a && setTimeout(() => {
      s = null, o(new b(`timeout ${a} of ms exceeded`, b.ETIMEDOUT));
    }, a);
    const c = () => {
      e && (s && clearTimeout(s), s = null, e.forEach((m) => {
        m.unsubscribe ? m.unsubscribe(o) : m.removeEventListener("abort", o);
      }), e = null);
    };
    e.forEach((m) => m.addEventListener("abort", o));
    const { signal: d } = i;
    return d.unsubscribe = () => u.asap(c), d;
  }
}, Jc = function* (e, a) {
  let n = e.byteLength;
  if (n < a) {
    yield e;
    return;
  }
  let i = 0, t;
  for (; i < n; )
    t = i + a, yield e.slice(i, t), i = t;
}, Kc = async function* (e, a) {
  for await (const n of Yc(e))
    yield* Jc(n, a);
}, Yc = async function* (e) {
  if (e[Symbol.asyncIterator]) {
    yield* e;
    return;
  }
  const a = e.getReader();
  try {
    for (; ; ) {
      const { done: n, value: i } = await a.read();
      if (n)
        break;
      yield i;
    }
  } finally {
    await a.cancel();
  }
}, ui = (e, a, n, i) => {
  const t = Kc(e, a);
  let o = 0, s, c = (d) => {
    s || (s = !0, i && i(d));
  };
  return new ReadableStream({
    async pull(d) {
      try {
        const { done: m, value: r } = await t.next();
        if (m) {
          c(), d.close();
          return;
        }
        let p = r.byteLength;
        if (n) {
          let l = o += p;
          n(l);
        }
        d.enqueue(new Uint8Array(r));
      } catch (m) {
        throw c(m), m;
      }
    },
    cancel(d) {
      return c(d), t.return();
    }
  }, {
    highWaterMark: 2
  });
}, di = 64 * 1024, { isFunction: Ye } = u, Xc = (({ Request: e, Response: a }) => ({
  Request: e,
  Response: a
}))(u.global), {
  ReadableStream: mi,
  TextEncoder: fi
} = u.global, xi = (e, ...a) => {
  try {
    return !!e(...a);
  } catch {
    return !1;
  }
}, Zc = (e) => {
  e = u.merge.call({
    skipUndefined: !0
  }, Xc, e);
  const { fetch: a, Request: n, Response: i } = e, t = a ? Ye(a) : typeof fetch == "function", o = Ye(n), s = Ye(i);
  if (!t)
    return !1;
  const c = t && Ye(mi), d = t && (typeof fi == "function" ? /* @__PURE__ */ ((f) => (h) => f.encode(h))(new fi()) : async (f) => new Uint8Array(await new n(f).arrayBuffer())), m = o && c && xi(() => {
    let f = !1;
    const h = new n(F.origin, {
      body: new mi(),
      method: "POST",
      get duplex() {
        return f = !0, "half";
      }
    }).headers.has("Content-Type");
    return f && !h;
  }), r = s && c && xi(() => u.isReadableStream(new i("").body)), p = {
    stream: r && ((f) => f.body)
  };
  t && ["text", "arrayBuffer", "blob", "formData", "stream"].forEach((f) => {
    !p[f] && (p[f] = (h, x) => {
      let y = h && h[f];
      if (y)
        return y.call(h);
      throw new b(`Response type '${f}' is not supported`, b.ERR_NOT_SUPPORT, x);
    });
  });
  const l = async (f) => {
    if (f == null)
      return 0;
    if (u.isBlob(f))
      return f.size;
    if (u.isSpecCompliantForm(f))
      return (await new n(F.origin, {
        method: "POST",
        body: f
      }).arrayBuffer()).byteLength;
    if (u.isArrayBufferView(f) || u.isArrayBuffer(f))
      return f.byteLength;
    if (u.isURLSearchParams(f) && (f = f + ""), u.isString(f))
      return (await d(f)).byteLength;
  }, v = async (f, h) => {
    const x = u.toFiniteNumber(f.getContentLength());
    return x ?? l(h);
  };
  return async (f) => {
    let {
      url: h,
      method: x,
      data: y,
      signal: E,
      cancelToken: _,
      timeout: C,
      onDownloadProgress: U,
      onUploadProgress: j,
      responseType: O,
      headers: q,
      withCredentials: J = "same-origin",
      fetchOptions: oe
    } = vt(f), ue = a || fetch;
    O = O ? (O + "").toLowerCase() : "text";
    let ie = Wc([E, _ && _.toAbortSignal()], C), ee = null;
    const te = ie && ie.unsubscribe && (() => {
      ie.unsubscribe();
    });
    let se;
    try {
      if (j && m && x !== "get" && x !== "head" && (se = await v(q, y)) !== 0) {
        let g = new n(h, {
          method: "POST",
          body: y,
          duplex: "half"
        }), T;
        if (u.isFormData(y) && (T = g.headers.get("content-type")) && q.setContentType(T), g.body) {
          const [W, L] = oa(
            se,
            Ae(sa(j))
          );
          y = ui(g.body, di, W, L);
        }
      }
      u.isString(J) || (J = J ? "include" : "omit");
      const V = o && "credentials" in n.prototype, B = {
        ...oe,
        signal: ie,
        method: x.toUpperCase(),
        headers: q.normalize().toJSON(),
        body: y,
        duplex: "half",
        credentials: V ? J : void 0
      };
      ee = o && new n(h, B);
      let z = await (o ? ue(ee, oe) : ue(h, B));
      const we = r && (O === "stream" || O === "response");
      if (r && (U || we && te)) {
        const g = {};
        ["status", "statusText", "headers"].forEach((K) => {
          g[K] = z[K];
        });
        const T = u.toFiniteNumber(z.headers.get("content-length")), [W, L] = U && oa(
          T,
          Ae(sa(U), !0)
        ) || [];
        z = new i(
          ui(z.body, di, W, () => {
            L && L(), te && te();
          }),
          g
        );
      }
      O = O || "text";
      let w = await p[u.findKey(p, O) || "text"](z, f);
      return !we && te && te(), await new Promise((g, T) => {
        Re(g, T, {
          data: w,
          headers: D.from(z.headers),
          status: z.status,
          statusText: z.statusText,
          config: f,
          request: ee
        });
      });
    } catch (V) {
      throw te && te(), V && V.name === "TypeError" && /Load failed|fetch/i.test(V.message) ? Object.assign(
        new b("Network Error", b.ERR_NETWORK, f, ee),
        {
          cause: V.cause || V
        }
      ) : b.from(V, V && V.code, f, ee);
    }
  };
}, Qc = /* @__PURE__ */ new Map(), ht = (e) => {
  let a = e && e.env || {};
  const { fetch: n, Request: i, Response: t } = a, o = [
    i,
    t,
    n
  ];
  let s = o.length, c = s, d, m, r = Qc;
  for (; c--; )
    d = o[c], m = r.get(d), m === void 0 && r.set(d, m = c ? /* @__PURE__ */ new Map() : Zc(a)), r = m;
  return m;
};
ht();
const gn = {
  http: $c,
  xhr: Vc,
  fetch: {
    get: ht
  }
};
u.forEach(gn, (e, a) => {
  if (e) {
    try {
      Object.defineProperty(e, "name", { value: a });
    } catch {
    }
    Object.defineProperty(e, "adapterName", { value: a });
  }
});
const vi = (e) => `- ${e}`, ep = (e) => u.isFunction(e) || e === null || e === !1;
function ap(e, a) {
  e = u.isArray(e) ? e : [e];
  const { length: n } = e;
  let i, t;
  const o = {};
  for (let s = 0; s < n; s++) {
    i = e[s];
    let c;
    if (t = i, !ep(i) && (t = gn[(c = String(i)).toLowerCase()], t === void 0))
      throw new b(`Unknown adapter '${c}'`);
    if (t && (u.isFunction(t) || (t = t.get(a))))
      break;
    o[c || "#" + s] = t;
  }
  if (!t) {
    const s = Object.entries(o).map(
      ([d, m]) => `adapter ${d} ` + (m === !1 ? "is not supported by the environment" : "is not available in the build")
    );
    let c = n ? s.length > 1 ? `since :
` + s.map(vi).join(`
`) : " " + vi(s[0]) : "as no adapter specified";
    throw new b(
      "There is no suitable adapter to dispatch the request " + c,
      "ERR_NOT_SUPPORT"
    );
  }
  return t;
}
const bt = {
  /**
   * Resolve an adapter from a list of adapter names or functions.
   * @type {Function}
   */
  getAdapter: ap,
  /**
   * Exposes all known adapters
   * @type {Object<string, Function|Object>}
   */
  adapters: gn
};
function $a(e) {
  if (e.cancelToken && e.cancelToken.throwIfRequested(), e.signal && e.signal.aborted)
    throw new le(null, e);
}
function hi(e) {
  return $a(e), e.headers = D.from(e.headers), e.data = Ua.call(
    e,
    e.transformRequest
  ), ["post", "put", "patch"].indexOf(e.method) !== -1 && e.headers.setContentType("application/x-www-form-urlencoded", !1), bt.getAdapter(e.adapter || $e.adapter, e)(e).then(function(i) {
    return $a(e), i.data = Ua.call(
      e,
      e.transformResponse,
      i
    ), i.headers = D.from(i.headers), i;
  }, function(i) {
    return st(i) || ($a(e), i && i.response && (i.response.data = Ua.call(
      e,
      e.transformResponse,
      i.response
    ), i.response.headers = D.from(i.response.headers))), Promise.reject(i);
  });
}
const fa = {};
["object", "boolean", "number", "function", "string", "symbol"].forEach((e, a) => {
  fa[e] = function(i) {
    return typeof i === e || "a" + (a < 1 ? "n " : " ") + e;
  };
});
const bi = {};
fa.transitional = function(a, n, i) {
  function t(o, s) {
    return "[Axios v" + ta + "] Transitional option '" + o + "'" + s + (i ? ". " + i : "");
  }
  return (o, s, c) => {
    if (a === !1)
      throw new b(
        t(s, " has been removed" + (n ? " in " + n : "")),
        b.ERR_DEPRECATED
      );
    return n && !bi[s] && (bi[s] = !0, console.warn(
      t(
        s,
        " has been deprecated since v" + n + " and will be removed in the near future"
      )
    )), a ? a(o, s, c) : !0;
  };
};
fa.spelling = function(a) {
  return (n, i) => (console.warn(`${i} is likely a misspelling of ${a}`), !0);
};
function np(e, a, n) {
  if (typeof e != "object")
    throw new b("options must be an object", b.ERR_BAD_OPTION_VALUE);
  const i = Object.keys(e);
  let t = i.length;
  for (; t-- > 0; ) {
    const o = i[t], s = a[o];
    if (s) {
      const c = e[o], d = c === void 0 || s(c, o, e);
      if (d !== !0)
        throw new b("option " + o + " must be " + d, b.ERR_BAD_OPTION_VALUE);
      continue;
    }
    if (n !== !0)
      throw new b("Unknown option " + o, b.ERR_BAD_OPTION);
  }
}
const aa = {
  assertOptions: np,
  validators: fa
}, ae = aa.validators;
let ve = class {
  constructor(a) {
    this.defaults = a || {}, this.interceptors = {
      request: new Wn(),
      response: new Wn()
    };
  }
  /**
   * Dispatch a request
   *
   * @param {String|Object} configOrUrl The config specific for this request (merged with this.defaults)
   * @param {?Object} config
   *
   * @returns {Promise} The Promise to be fulfilled
   */
  async request(a, n) {
    try {
      return await this._request(a, n);
    } catch (i) {
      if (i instanceof Error) {
        let t = {};
        Error.captureStackTrace ? Error.captureStackTrace(t) : t = new Error();
        const o = t.stack ? t.stack.replace(/^.+\n/, "") : "";
        try {
          i.stack ? o && !String(i.stack).endsWith(o.replace(/^.+\n.+\n/, "")) && (i.stack += `
` + o) : i.stack = o;
        } catch {
        }
      }
      throw i;
    }
  }
  _request(a, n) {
    typeof a == "string" ? (n = n || {}, n.url = a) : n = a || {}, n = be(this.defaults, n);
    const { transitional: i, paramsSerializer: t, headers: o } = n;
    i !== void 0 && aa.assertOptions(i, {
      silentJSONParsing: ae.transitional(ae.boolean),
      forcedJSONParsing: ae.transitional(ae.boolean),
      clarifyTimeoutError: ae.transitional(ae.boolean)
    }, !1), t != null && (u.isFunction(t) ? n.paramsSerializer = {
      serialize: t
    } : aa.assertOptions(t, {
      encode: ae.function,
      serialize: ae.function
    }, !0)), n.allowAbsoluteUrls !== void 0 || (this.defaults.allowAbsoluteUrls !== void 0 ? n.allowAbsoluteUrls = this.defaults.allowAbsoluteUrls : n.allowAbsoluteUrls = !0), aa.assertOptions(n, {
      baseUrl: ae.spelling("baseURL"),
      withXsrfToken: ae.spelling("withXSRFToken")
    }, !0), n.method = (n.method || this.defaults.method || "get").toLowerCase();
    let s = o && u.merge(
      o.common,
      o[n.method]
    );
    o && u.forEach(
      ["delete", "get", "head", "post", "put", "patch", "common"],
      (f) => {
        delete o[f];
      }
    ), n.headers = D.concat(s, o);
    const c = [];
    let d = !0;
    this.interceptors.request.forEach(function(h) {
      typeof h.runWhen == "function" && h.runWhen(n) === !1 || (d = d && h.synchronous, c.unshift(h.fulfilled, h.rejected));
    });
    const m = [];
    this.interceptors.response.forEach(function(h) {
      m.push(h.fulfilled, h.rejected);
    });
    let r, p = 0, l;
    if (!d) {
      const f = [hi.bind(this), void 0];
      for (f.unshift(...c), f.push(...m), l = f.length, r = Promise.resolve(n); p < l; )
        r = r.then(f[p++], f[p++]);
      return r;
    }
    l = c.length;
    let v = n;
    for (; p < l; ) {
      const f = c[p++], h = c[p++];
      try {
        v = f(v);
      } catch (x) {
        h.call(this, x);
        break;
      }
    }
    try {
      r = hi.call(this, v);
    } catch (f) {
      return Promise.reject(f);
    }
    for (p = 0, l = m.length; p < l; )
      r = r.then(m[p++], m[p++]);
    return r;
  }
  getUri(a) {
    a = be(this.defaults, a);
    const n = ln(a.baseURL, a.url, a.allowAbsoluteUrls);
    return rn(n, a.params, a.paramsSerializer);
  }
};
u.forEach(["delete", "get", "head", "options"], function(a) {
  ve.prototype[a] = function(n, i) {
    return this.request(be(i || {}, {
      method: a,
      url: n,
      data: (i || {}).data
    }));
  };
});
u.forEach(["post", "put", "patch"], function(a) {
  function n(i) {
    return function(o, s, c) {
      return this.request(be(c || {}, {
        method: a,
        headers: i ? {
          "Content-Type": "multipart/form-data"
        } : {},
        url: o,
        data: s
      }));
    };
  }
  ve.prototype[a] = n(), ve.prototype[a + "Form"] = n(!0);
});
let ip = class gt {
  constructor(a) {
    if (typeof a != "function")
      throw new TypeError("executor must be a function.");
    let n;
    this.promise = new Promise(function(o) {
      n = o;
    });
    const i = this;
    this.promise.then((t) => {
      if (!i._listeners) return;
      let o = i._listeners.length;
      for (; o-- > 0; )
        i._listeners[o](t);
      i._listeners = null;
    }), this.promise.then = (t) => {
      let o;
      const s = new Promise((c) => {
        i.subscribe(c), o = c;
      }).then(t);
      return s.cancel = function() {
        i.unsubscribe(o);
      }, s;
    }, a(function(o, s, c) {
      i.reason || (i.reason = new le(o, s, c), n(i.reason));
    });
  }
  /**
   * Throws a `CanceledError` if cancellation has been requested.
   */
  throwIfRequested() {
    if (this.reason)
      throw this.reason;
  }
  /**
   * Subscribe to the cancel signal
   */
  subscribe(a) {
    if (this.reason) {
      a(this.reason);
      return;
    }
    this._listeners ? this._listeners.push(a) : this._listeners = [a];
  }
  /**
   * Unsubscribe from the cancel signal
   */
  unsubscribe(a) {
    if (!this._listeners)
      return;
    const n = this._listeners.indexOf(a);
    n !== -1 && this._listeners.splice(n, 1);
  }
  toAbortSignal() {
    const a = new AbortController(), n = (i) => {
      a.abort(i);
    };
    return this.subscribe(n), a.signal.unsubscribe = () => this.unsubscribe(n), a.signal;
  }
  /**
   * Returns an object that contains a new `CancelToken` and a function that, when called,
   * cancels the `CancelToken`.
   */
  static source() {
    let a;
    return {
      token: new gt(function(t) {
        a = t;
      }),
      cancel: a
    };
  }
};
function tp(e) {
  return function(n) {
    return e.apply(null, n);
  };
}
function op(e) {
  return u.isObject(e) && e.isAxiosError === !0;
}
const Ya = {
  Continue: 100,
  SwitchingProtocols: 101,
  Processing: 102,
  EarlyHints: 103,
  Ok: 200,
  Created: 201,
  Accepted: 202,
  NonAuthoritativeInformation: 203,
  NoContent: 204,
  ResetContent: 205,
  PartialContent: 206,
  MultiStatus: 207,
  AlreadyReported: 208,
  ImUsed: 226,
  MultipleChoices: 300,
  MovedPermanently: 301,
  Found: 302,
  SeeOther: 303,
  NotModified: 304,
  UseProxy: 305,
  Unused: 306,
  TemporaryRedirect: 307,
  PermanentRedirect: 308,
  BadRequest: 400,
  Unauthorized: 401,
  PaymentRequired: 402,
  Forbidden: 403,
  NotFound: 404,
  MethodNotAllowed: 405,
  NotAcceptable: 406,
  ProxyAuthenticationRequired: 407,
  RequestTimeout: 408,
  Conflict: 409,
  Gone: 410,
  LengthRequired: 411,
  PreconditionFailed: 412,
  PayloadTooLarge: 413,
  UriTooLong: 414,
  UnsupportedMediaType: 415,
  RangeNotSatisfiable: 416,
  ExpectationFailed: 417,
  ImATeapot: 418,
  MisdirectedRequest: 421,
  UnprocessableEntity: 422,
  Locked: 423,
  FailedDependency: 424,
  TooEarly: 425,
  UpgradeRequired: 426,
  PreconditionRequired: 428,
  TooManyRequests: 429,
  RequestHeaderFieldsTooLarge: 431,
  UnavailableForLegalReasons: 451,
  InternalServerError: 500,
  NotImplemented: 501,
  BadGateway: 502,
  ServiceUnavailable: 503,
  GatewayTimeout: 504,
  HttpVersionNotSupported: 505,
  VariantAlsoNegotiates: 506,
  InsufficientStorage: 507,
  LoopDetected: 508,
  NotExtended: 510,
  NetworkAuthenticationRequired: 511,
  WebServerIsDown: 521,
  ConnectionTimedOut: 522,
  OriginIsUnreachable: 523,
  TimeoutOccurred: 524,
  SslHandshakeFailed: 525,
  InvalidSslCertificate: 526
};
Object.entries(Ya).forEach(([e, a]) => {
  Ya[a] = e;
});
function yt(e) {
  const a = new ve(e), n = ki(ve.prototype.request, a);
  return u.extend(n, ve.prototype, a, { allOwnKeys: !0 }), u.extend(n, a, null, { allOwnKeys: !0 }), n.create = function(t) {
    return yt(be(e, t));
  }, n;
}
const A = yt($e);
A.Axios = ve;
A.CanceledError = le;
A.CancelToken = ip;
A.isCancel = st;
A.VERSION = ta;
A.toFormData = ma;
A.AxiosError = b;
A.Cancel = A.CanceledError;
A.all = function(a) {
  return Promise.all(a);
};
A.spread = tp;
A.isAxiosError = op;
A.mergeConfig = be;
A.AxiosHeaders = D;
A.formToJSON = (e) => ot(u.isHTMLForm(e) ? new FormData(e) : e);
A.getAdapter = bt.getAdapter;
A.HttpStatusCode = Ya;
A.default = A;
const {
  Axios: $p,
  AxiosError: Mp,
  CanceledError: Hp,
  isCancel: Gp,
  CancelToken: Vp,
  VERSION: Wp,
  all: Jp,
  Cancel: Kp,
  isAxiosError: Yp,
  spread: Xp,
  toFormData: Zp,
  AxiosHeaders: Qp,
  HttpStatusCode: el,
  formToJSON: al,
  getAdapter: nl,
  mergeConfig: il
} = A, sp = /* @__PURE__ */ new Set([
  "ENOTFOUND",
  "ENETUNREACH",
  // SSL errors from https://github.com/nodejs/node/blob/fc8e3e2cdc521978351de257030db0076d79e0ab/src/crypto/crypto_common.cc#L301-L328
  "UNABLE_TO_GET_ISSUER_CERT",
  "UNABLE_TO_GET_CRL",
  "UNABLE_TO_DECRYPT_CERT_SIGNATURE",
  "UNABLE_TO_DECRYPT_CRL_SIGNATURE",
  "UNABLE_TO_DECODE_ISSUER_PUBLIC_KEY",
  "CERT_SIGNATURE_FAILURE",
  "CRL_SIGNATURE_FAILURE",
  "CERT_NOT_YET_VALID",
  "CERT_HAS_EXPIRED",
  "CRL_NOT_YET_VALID",
  "CRL_HAS_EXPIRED",
  "ERROR_IN_CERT_NOT_BEFORE_FIELD",
  "ERROR_IN_CERT_NOT_AFTER_FIELD",
  "ERROR_IN_CRL_LAST_UPDATE_FIELD",
  "ERROR_IN_CRL_NEXT_UPDATE_FIELD",
  "OUT_OF_MEM",
  "DEPTH_ZERO_SELF_SIGNED_CERT",
  "SELF_SIGNED_CERT_IN_CHAIN",
  "UNABLE_TO_GET_ISSUER_CERT_LOCALLY",
  "UNABLE_TO_VERIFY_LEAF_SIGNATURE",
  "CERT_CHAIN_TOO_LONG",
  "CERT_REVOKED",
  "INVALID_CA",
  "PATH_LENGTH_EXCEEDED",
  "INVALID_PURPOSE",
  "CERT_UNTRUSTED",
  "CERT_REJECTED",
  "HOSTNAME_MISMATCH"
]);
var rp = (e) => !sp.has(e && e.code);
const cp = /* @__PURE__ */ an(rp), yn = "axios-retry";
function wt(e) {
  const a = ["ERR_CANCELED", "ECONNABORTED"];
  return e.response || !e.code || a.includes(e.code) ? !1 : cp(e);
}
const Et = ["get", "head", "options"], pp = Et.concat(["put", "delete"]);
function wn(e) {
  return e.code !== "ECONNABORTED" && (!e.response || e.response.status === 429 || e.response.status >= 500 && e.response.status <= 599);
}
function lp(e) {
  var a;
  return (a = e.config) != null && a.method ? wn(e) && Et.indexOf(e.config.method) !== -1 : !1;
}
function _t(e) {
  var a;
  return (a = e.config) != null && a.method ? wn(e) && pp.indexOf(e.config.method) !== -1 : !1;
}
function Rt(e) {
  return wt(e) || _t(e);
}
function En(e = void 0) {
  var i;
  const a = (i = e == null ? void 0 : e.response) == null ? void 0 : i.headers["retry-after"];
  if (!a)
    return 0;
  let n = (Number(a) || 0) * 1e3;
  return n === 0 && (n = (new Date(a).valueOf() || 0) - Date.now()), Math.max(0, n);
}
function up(e = 0, a = void 0) {
  return Math.max(0, En(a));
}
function dp(e = 0, a = void 0, n = 100) {
  const i = 2 ** e * n, t = Math.max(i, En(a)), o = t * 0.2 * Math.random();
  return t + o;
}
function mp(e = 100) {
  return (a = 0, n = void 0) => {
    const i = a * e;
    return Math.max(i, En(n));
  };
}
const fp = {
  retries: 3,
  retryCondition: Rt,
  retryDelay: up,
  shouldResetTimeout: !1,
  onRetry: () => {
  },
  onMaxRetryTimesExceeded: () => {
  },
  validateResponse: null
};
function xp(e, a) {
  return { ...fp, ...a, ...e[yn] };
}
function gi(e, a, n = !1) {
  const i = xp(e, a || {});
  return i.retryCount = i.retryCount || 0, (!i.lastRequestTime || n) && (i.lastRequestTime = Date.now()), e[yn] = i, i;
}
function vp(e, a) {
  e.defaults.agent === a.agent && delete a.agent, e.defaults.httpAgent === a.httpAgent && delete a.httpAgent, e.defaults.httpsAgent === a.httpsAgent && delete a.httpsAgent;
}
async function hp(e, a) {
  const { retries: n, retryCondition: i } = e, t = (e.retryCount || 0) < n && i(a);
  if (typeof t == "object")
    try {
      return await t !== !1;
    } catch {
      return !1;
    }
  return t;
}
async function bp(e, a, n, i) {
  var d;
  a.retryCount += 1;
  const { retryDelay: t, shouldResetTimeout: o, onRetry: s } = a, c = t(a.retryCount, n);
  if (vp(e, i), !o && i.timeout && a.lastRequestTime) {
    const m = Date.now() - a.lastRequestTime, r = i.timeout - m - c;
    if (r <= 0)
      return Promise.reject(n);
    i.timeout = r;
  }
  return i.transformRequest = [(m) => m], await s(a.retryCount, n, i), (d = i.signal) != null && d.aborted ? Promise.resolve(e(i)) : new Promise((m) => {
    var l;
    const r = () => {
      clearTimeout(p), m(e(i));
    }, p = setTimeout(() => {
      var v;
      m(e(i)), (v = i.signal) != null && v.removeEventListener && i.signal.removeEventListener("abort", r);
    }, c);
    (l = i.signal) != null && l.addEventListener && i.signal.addEventListener("abort", r, { once: !0 });
  });
}
async function gp(e, a) {
  e.retryCount >= e.retries && await e.onMaxRetryTimesExceeded(a, e.retryCount);
}
const ne = (e, a) => {
  const n = e.interceptors.request.use((t) => {
    var o;
    return gi(t, a, !0), (o = t[yn]) != null && o.validateResponse && (t.validateStatus = () => !1), t;
  }), i = e.interceptors.response.use(null, async (t) => {
    var c;
    const { config: o } = t;
    if (!o)
      return Promise.reject(t);
    const s = gi(o, a);
    return t.response && ((c = s.validateResponse) != null && c.call(s, t.response)) ? t.response : await hp(s, t) ? bp(e, s, t, o) : (await gp(s, t), Promise.reject(t));
  });
  return { requestInterceptorId: n, responseInterceptorId: i };
};
ne.isNetworkError = wt;
ne.isSafeRequestError = lp;
ne.isIdempotentRequestError = _t;
ne.isNetworkOrIdempotentRequestError = Rt;
ne.exponentialDelay = dp;
ne.linearDelay = mp;
ne.isRetryableError = wn;
ne(A, {
  retries: 3,
  retryDelay: ne.exponentialDelay,
  retryCondition: (e) => ne.isNetworkOrIdempotentRequestError(e) || e.code === "ECONNABORTED"
});
jt.themeSource = "light";
const St = X.dirname(Nt(import.meta.url)), Xa = /* @__PURE__ */ new Map(), yp = 5 * 60 * 1e3;
function kt(e) {
  const a = Xa.get(e);
  return a && Date.now() - a.timestamp < yp ? a.data : (a && Xa.delete(e), null);
}
function Tt(e, a) {
  Xa.set(e, { data: a, timestamp: Date.now() });
}
ge.handle("search-timetable", async (e, a) => {
  const n = `search_${a}`, i = kt(n);
  if (i) return i;
  try {
    const t = await A.get("https://timetable.magtu.ru/api/v2/search", {
      params: { q: a },
      timeout: 1e4
    });
    return Tt(n, t.data), t.data;
  } catch (t) {
    return console.error("Main process search error:", t), [];
  }
});
ge.handle("get-schedule", async (e, a, n) => {
  const i = `schedule_${a}_${n}`, t = kt(i);
  if (t) return t;
  try {
    const o = a === "group" ? "groups" : "teachers", s = await A.get(`https://timetable.magtu.ru/api/v2/${o}/${n}/schedule`, {
      timeout: 15e3
    });
    return Tt(i, s.data), s.data;
  } catch (o) {
    throw console.error("Main process schedule fetch error:", o), o;
  }
});
ge.handle("check-api-status", async () => {
  try {
    return await A.get("https://timetable.magtu.ru/api/v2/search?q=test", { timeout: 5e3 }), !0;
  } catch {
    return !1;
  }
});
ge.handle("save-offline-schedule", async (e, a) => {
  try {
    const n = Y.getPath("userData"), i = X.join(n, "offline-schedule.json");
    return await Si.writeFile(i, JSON.stringify(a)), !0;
  } catch (n) {
    throw console.error("Failed to save offline schedule:", n), n;
  }
});
ge.handle("get-offline-schedule", async () => {
  try {
    const e = Y.getPath("userData"), a = X.join(e, "offline-schedule.json"), n = await Si.readFile(a, "utf-8");
    return JSON.parse(n);
  } catch {
    return null;
  }
});
ge.handle("toggle-fullscreen", async () => {
  if (k && !k.isDestroyed()) {
    const e = k.isFullScreen();
    return k.setFullScreen(!e), !e;
  }
  return !1;
});
ge.handle("is-fullscreen", async () => k && !k.isDestroyed() ? k.isFullScreen() : !1);
process.env.APP_ROOT = X.join(St, "..");
const Pe = process.env.VITE_DEV_SERVER_URL, tl = X.join(process.env.APP_ROOT, "dist-electron"), Ct = X.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = Pe ? X.join(process.env.APP_ROOT, "public") : Ct;
let k;
function At() {
  k = new yi({
    show: !1,
    // Don't show immediately
    icon: X.join(process.env.VITE_PUBLIC, "Icon_app.png"),
    width: 1450,
    height: 900,
    minWidth: 1450,
    minHeight: 900,
    titleBarStyle: "hiddenInset",
    trafficLightPosition: { x: 10, y: 10 },
    transparent: !0,
    backgroundColor: "#00000000",
    // Прозрачный фон, но темный при необходимости
    webPreferences: {
      sandbox: !0,
      contextIsolation: !0,
      nodeIntegration: !1,
      preload: X.join(St, "preload.mjs"),
      devTools: !!Pe
      // DevTools только в dev режиме
    }
  }), k.setMenu(null), Pe || k.webContents.on("devtools-opened", () => {
    k == null || k.webContents.closeDevTools();
  }), k.webContents.on("did-finish-load", () => {
    k && !k.isDestroyed() && k.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  }), k.once("ready-to-show", () => {
    k == null || k.show();
  }), Pe ? k.loadURL(Pe) : k.loadFile(X.join(Ct, "index.html"));
}
Y.on("before-quit", () => {
});
Y.on("window-all-closed", () => {
  process.platform !== "darwin" && (Y.quit(), k = null);
});
Y.on("activate", () => {
  yi.getAllWindows().length === 0 && At();
});
const wp = Y.requestSingleInstanceLock();
wp ? (Y.on("second-instance", () => {
  k && !k.isDestroyed() && (k.isMinimized() && k.restore(), k.focus());
}), Y.whenReady().then(() => {
  if (process.platform === "darwin")
    try {
      const e = X.join(process.env.VITE_PUBLIC, "Icon_app.png"), a = Ot.createFromPath(e);
      Y.dock.setIcon(a);
    } catch (e) {
      console.error("Failed to set dock icon:", e);
    }
  At();
})) : Y.quit();
export {
  tl as MAIN_DIST,
  Ct as RENDERER_DIST,
  Pe as VITE_DEV_SERVER_URL
};
