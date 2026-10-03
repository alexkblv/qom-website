/*
  Comportamiento del sitio: idiomas, menú, correos, copiar la cita, estadísticas
  y la lista de pendientes. Los textos están en index.html (español) y en
  textos.js (inglés y qom); la configuración, en config.js.
*/
(function () {
    "use strict";

    var CONFIG = window.CONFIG || {};
    var TEXTOS = window.TEXTOS || {};
    var raiz = document.documentElement;

    var CODIGO_LANG = { es: "es", en: "en", qom: "tob" };
    var FORMATO_NUMEROS = { es: "es-AR", en: "en-US", qom: "es-AR" };
    var idiomaActual = "es";

    function guardar(clave, valor) {
        try { localStorage.setItem(clave, valor); } catch (e) { /* sin almacenamiento */ }
    }

    function leer(clave) {
        try { return localStorage.getItem(clave); } catch (e) { return null; }
    }

    // Mensajes que arma el sitio (claves "dinamico.*" en textos.js).
    function mensaje(clave) {
        var t = TEXTOS[clave] || {};
        return t[idiomaActual] || t.es || "";
    }

    /* ------------------------------------------------------------------
       Idiomas: el español queda guardado tal como está en el HTML.
       ------------------------------------------------------------------ */

    var textosOriginales = new Map();
    var atributosOriginales = [];

    function prepararIdiomas() {
        document.querySelectorAll("[data-t]").forEach(function (el) {
            textosOriginales.set(el, el.innerHTML);
        });
        document.querySelectorAll("[data-t-attr]").forEach(function (el) {
            el.getAttribute("data-t-attr").split(";").forEach(function (par) {
                var corte = par.indexOf(":");
                if (corte < 1) return;
                var atributo = par.slice(0, corte).trim();
                atributosOriginales.push({
                    el: el,
                    atributo: atributo,
                    clave: par.slice(corte + 1).trim(),
                    es: el.getAttribute(atributo)
                });
            });
        });
    }

    function traduccion(clave, idioma) {
        if (idioma === "es") return "";
        var t = TEXTOS[clave];
        return (t && t[idioma]) || "";
    }

    function aplicarIdioma(idioma) {
        if (!CODIGO_LANG[idioma]) idioma = "es";
        idiomaActual = idioma;
        var faltan = 0;

        textosOriginales.forEach(function (es, el) {
            var valor = traduccion(el.getAttribute("data-t"), idioma);
            var enEspanol = !valor && idioma !== "es";
            if (enEspanol) faltan++;
            el.innerHTML = valor || es;
            // Si falta la traducción, el texto queda en español: lo marcamos para los lectores de pantalla.
            if (enEspanol) el.setAttribute("lang", "es");
            else el.removeAttribute("lang");
        });

        atributosOriginales.forEach(function (a) {
            a.el.setAttribute(a.atributo, traduccion(a.clave, idioma) || a.es);
        });

        raiz.lang = CODIGO_LANG[idioma];

        document.querySelectorAll(".idiomas [data-idioma]").forEach(function (boton) {
            boton.setAttribute("aria-pressed", String(boton.getAttribute("data-idioma") === idioma));
        });

        var aviso = document.getElementById("aviso-idioma");
        if (aviso) {
            aviso.hidden = !(idioma === "qom" && faltan > 0);
            aviso.textContent = aviso.hidden ? "" : mensaje("dinamico.aviso-qom");
            aviso.lang = traduccion("dinamico.aviso-qom", idioma) ? CODIGO_LANG[idioma] : "es";
        }

        guardar("idioma", idioma);
        pintarCifras();
    }

    function idiomaInicial() {
        var pedido = new URLSearchParams(location.search).get("idioma");
        if (pedido && CODIGO_LANG[pedido]) return pedido;
        var guardado = leer("idioma");
        return guardado && CODIGO_LANG[guardado] ? guardado : "es";
    }

    function iniciarSelectorIdioma() {
        document.querySelectorAll(".idiomas [data-idioma]").forEach(function (boton) {
            boton.addEventListener("click", function () {
                aplicarIdioma(boton.getAttribute("data-idioma"));
            });
        });
    }

    /* ------------------------------------------------------------------
       Menú en pantallas chicas.
       ------------------------------------------------------------------ */

    function iniciarMenu() {
        var boton = document.querySelector(".menu-boton");
        var menu = document.getElementById("menu");
        if (!boton || !menu) return;

        function abrir(si) {
            boton.setAttribute("aria-expanded", String(si));
            menu.classList.toggle("abierto", si);
        }

        boton.addEventListener("click", function () {
            abrir(boton.getAttribute("aria-expanded") !== "true");
        });
        menu.addEventListener("click", function (e) {
            if (e.target.closest("a")) abrir(false);
        });
        document.addEventListener("keydown", function (e) {
            if (e.key === "Escape" && boton.getAttribute("aria-expanded") === "true") {
                abrir(false);
                boton.focus();
            }
        });
        document.addEventListener("click", function (e) {
            if (!e.target.closest(".navegacion")) abrir(false);
        });
    }

    /* ------------------------------------------------------------------
       Correos: en el HTML están codificados para que no los junten los robots.
       ------------------------------------------------------------------ */

    function iniciarCorreos() {
        document.querySelectorAll("a.correo[data-c]").forEach(function (a) {
            try {
                var direccion = atob(a.getAttribute("data-c")).split("").reverse().join("");
                a.href = "mailto:" + direccion;
                a.textContent = direccion;
            } catch (e) { /* queda el texto con [arroba] */ }
        });
    }

    /* ------------------------------------------------------------------
       Copiar la cita en BibTeX.
       ------------------------------------------------------------------ */

    function seleccionar(el) {
        var rango = document.createRange();
        rango.selectNodeContents(el);
        var seleccion = window.getSelection();
        seleccion.removeAllRanges();
        seleccion.addRange(rango);
    }

    function iniciarCopiar() {
        document.querySelectorAll("[data-copiar]").forEach(function (boton) {
            var fuente = document.getElementById(boton.getAttribute("data-copiar"));
            var aviso = boton.closest(".bibtex").querySelector(".copiado");
            var temporizador;
            if (!fuente) return;

            boton.addEventListener("click", function () {
                var texto = fuente.textContent;
                var intento = navigator.clipboard && window.isSecureContext
                    ? navigator.clipboard.writeText(texto)
                    : Promise.reject(new Error("sin portapapeles"));

                intento.then(function () {
                    aviso.textContent = mensaje("dinamico.copiado");
                }).catch(function () {
                    seleccionar(fuente);
                    var copiado = false;
                    try { copiado = document.execCommand("copy"); } catch (e) { copiado = false; }
                    aviso.textContent = mensaje(copiado ? "dinamico.copiado" : "dinamico.copiar-error");
                }).then(function () {
                    clearTimeout(temporizador);
                    temporizador = setTimeout(function () { aviso.textContent = ""; }, 5000);
                });
            });
        });
    }

    /* ------------------------------------------------------------------
       Estadísticas: visitas y clics (Plausible) y cifras de Zenodo.
       ------------------------------------------------------------------ */

    var plausible = CONFIG.plausible || {};
    var registrosZenodo = (CONFIG.zenodo && CONFIG.zenodo.registros) || [];
    var cifras = { descargas: null, vistas: null };
    var estadoCifras = registrosZenodo.length ? "dinamico.cifras-cargando" : "dinamico.cifras-sin-registros";

    function iniciarEventos() {
        var activo = Boolean(plausible.dominio);

        if (activo) {
            var script = document.createElement("script");
            script.defer = true;
            script.src = plausible.script || "https://plausible.io/js/script.tagged-events.js";
            script.setAttribute("data-domain", plausible.dominio);
            document.head.appendChild(script);
        }

        document.querySelectorAll("[data-evento]").forEach(function (el) {
            var evento = el.getAttribute("data-evento");
            if (activo) {
                // Plausible registra los clics en elementos con esta clase.
                el.classList.add("plausible-event-name=" + evento);
            } else {
                el.addEventListener("click", function () {
                    console.info("[estadísticas] clic: " + evento + " (Plausible sin configurar: ver config.js)");
                });
            }
        });
    }

    function cifraDd(nombre) {
        return document.querySelector('[data-cifra="' + nombre + '"]');
    }

    function pintarNumero(dd, valor, formato) {
        if (!dd) return;
        if (valor === null) {
            dd.innerHTML = '<span class="cifra-vacia"></span>';
            dd.firstChild.textContent = mensaje("dinamico.sin-dato");
        } else {
            dd.textContent = formato.format(valor);
        }
    }

    function pintarCifras() {
        var formato = new Intl.NumberFormat(FORMATO_NUMEROS[idiomaActual] || "es-AR");
        var descargas = cifraDd("descargas");
        var vistas = cifraDd("vistas");
        var panel = cifraDd("panel");
        var estado = document.getElementById("cifras-estado");

        pintarNumero(descargas, cifras.descargas, formato);
        pintarNumero(vistas, cifras.vistas, formato);
        if (estado) estado.textContent = mensaje(estadoCifras);

        if (panel) {
            panel.textContent = "";
            if (plausible.panelPublico) {
                var enlace = document.createElement("a");
                enlace.href = plausible.panelPublico;
                enlace.textContent = mensaje("dinamico.panel");
                panel.appendChild(enlace);
            } else {
                var marca = document.createElement("span");
                marca.className = "pendiente pendiente-en-linea";
                marca.innerHTML = 'Plausible <span class="pendiente-etiqueta">pendiente</span>';
                panel.appendChild(marca);
            }
        }
    }

    function sumar(lista, campoTodas, campo) {
        return lista.reduce(function (total, registro) {
            var s = registro.stats || {};
            var valor = typeof s[campoTodas] === "number" ? s[campoTodas] : s[campo];
            return total + (typeof valor === "number" ? valor : 0);
        }, 0);
    }

    function cargarZenodo() {
        if (!registrosZenodo.length || !window.fetch) return;
        Promise.all(registrosZenodo.map(function (id) {
            return fetch("https://zenodo.org/api/records/" + encodeURIComponent(id), {
                headers: { Accept: "application/json" }
            }).then(function (respuesta) {
                if (!respuesta.ok) throw new Error("Zenodo respondió " + respuesta.status);
                return respuesta.json();
            });
        })).then(function (registros) {
            cifras.descargas = sumar(registros, "version_unique_downloads", "unique_downloads");
            cifras.vistas = sumar(registros, "version_unique_views", "unique_views");
            estadoCifras = "dinamico.cifras-ok";
            pintarCifras();
        }).catch(function () {
            estadoCifras = "dinamico.cifras-error";
            pintarCifras();
        });
    }

    /* ------------------------------------------------------------------
       Pendientes: arma la lista del aviso de borrador a partir de los
       recuadros rojos (.pendiente con data-pendiente). Si no queda ninguno,
       el aviso no aparece.
       ------------------------------------------------------------------ */

    function contarFaltantesQom() {
        var claves = new Set();
        document.querySelectorAll("[data-t]").forEach(function (el) { claves.add(el.getAttribute("data-t")); });
        atributosOriginales.forEach(function (a) { claves.add(a.clave); });
        var faltan = 0;
        claves.forEach(function (clave) { if (!traduccion(clave, "qom")) faltan++; });
        return faltan;
    }

    function itemPendiente(texto, quien, destino) {
        var li = document.createElement("li");
        var cuerpo = document.createElement("span");
        if (destino) {
            var enlace = document.createElement("a");
            enlace.href = "#" + destino;
            enlace.textContent = texto;
            enlace.addEventListener("click", function () {
                var objetivo = document.getElementById(destino);
                if (!objetivo) return;
                objetivo.classList.remove("resaltado");
                void objetivo.offsetWidth;
                objetivo.classList.add("resaltado");
            });
            cuerpo.appendChild(enlace);
        } else {
            cuerpo.textContent = texto;
        }
        if (quien) {
            var persona = document.createElement("span");
            persona.className = "quien";
            persona.textContent = " (" + quien + ")";
            cuerpo.appendChild(persona);
        }
        li.appendChild(cuerpo);
        return li;
    }

    function armarPendientes() {
        var contenedor = document.getElementById("borrador");
        if (!contenedor) return;

        var lista = document.createElement("ol");
        lista.className = "borrador-lista";
        var total = 0;

        document.querySelectorAll(".pendiente[data-pendiente]").forEach(function (el, i) {
            var enPagina = !el.closest(".pendientes-generales");
            if (enPagina && !el.id) el.id = "pendiente-" + (i + 1);
            lista.appendChild(itemPendiente(
                el.getAttribute("data-pendiente"),
                el.getAttribute("data-quien"),
                enPagina ? el.id : null
            ));
            total++;
        });

        var faltanQom = contarFaltantesQom();
        if (faltanQom) {
            lista.appendChild(itemPendiente(
                "Versión en qom: faltan " + faltanQom + " textos (se completan en textos.js)",
                "PC, TT, VC",
                null
            ));
            total++;
        }

        if (!total) return;

        var detalles = document.createElement("details");
        var resumen = document.createElement("summary");
        resumen.innerHTML = "<span>Borrador para revisión: <strong>" + total +
            " pendientes</strong>, marcados en rojo en la página.</span>";
        detalles.appendChild(resumen);
        detalles.appendChild(lista);
        contenedor.appendChild(detalles);
        contenedor.hidden = false;
    }

    /* ------------------------------------------------------------------
       Inicio
       ------------------------------------------------------------------ */

    function iniciar() {
        if (new URLSearchParams(location.search).has("claves")) raiz.classList.add("ver-claves");
        prepararIdiomas();
        armarPendientes();
        iniciarSelectorIdioma();
        iniciarMenu();
        iniciarCorreos();
        iniciarCopiar();
        iniciarEventos();
        aplicarIdioma(idiomaInicial());
        cargarZenodo();
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", iniciar);
    } else {
        iniciar();
    }
})();
