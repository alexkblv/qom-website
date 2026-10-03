/*
  Textos en inglés y en qom.

  El texto en español está en index.html, en cada elemento que tiene data-t="clave".
  Acá va la versión en inglés (en) y en qom (qom) de esa misma clave.

  - Para ver qué clave tiene cada texto, abrir el sitio con ?claves al final de la
    dirección, por ejemplo: https://.../?claves
  - Si un texto en qom está vacío (""), la página muestra el español en su lugar.
  - Algunos textos llevan etiquetas como <strong>; hay que mantenerlas.

  Las claves que empiezan con "dinamico." son mensajes que arma el sitio
  (por ejemplo, «Copiado»). Esas sí llevan también la versión en español (es).
*/
window.TEXTOS = {
    "pagina.titulo": {
        en: "Language Technologies for Qom: QomL’aqtaqa, QomSpeech and translator",
        qom: ""
    },
    "saltar": { en: "Skip to content", qom: "" },
    "marca": { en: "Language Technologies for Qom", qom: "" },

    "nav.etiqueta": { en: "Sections", qom: "" },
    "nav.menu": { en: "Menu", qom: "" },
    "nav.comunidad": { en: "Community", qom: "" },
    "nav.recursos": { en: "Resources", qom: "" },
    "nav.traductor": { en: "Translator", qom: "" },
    "nav.equipo": { en: "Team", qom: "" },
    "nav.citar": { en: "Cite", qom: "" },
    "idiomas.etiqueta": { en: "Language", qom: "" },

    "portada.y": { en: "and", qom: "" },
    "portada.titulo": { en: "The Qom language in the digital world", qom: "" },
    "portada.bajada": { en: "Resources and tools for working with text and speech", qom: "" },
    "accion.traductor": { en: "Try the translator", qom: "" },
    "accion.datos": { en: "Download the data", qom: "" },
    "accion.codigo": { en: "Code", qom: "" },
    "accion.articulo": { en: "Paper", qom: "" },

    "proyecto.titulo": { en: "The project", qom: "" },
    "proyecto.texto": {
        en: "We present digital resources and tools created for the Qom language, designed to work with both written texts and voice recordings. These resources complement each other and aim to strengthen the presence of Indigenous languages in the digital world, supporting the development of more inclusive language technologies.",
        qom: ""
    },
    "proyecto.mas-lengua": { en: "More about the Qom language", qom: "" },
    "proyecto.mas-tecnologia": { en: "How does technology help languages?", qom: "" },
    "comunidad.titulo": { en: "With the Qom community of Derqui", qom: "" },

    "recursos.titulo": { en: "Resources", qom: "" },
    "texto.tipo": { en: "Text corpus", qom: "" },
    "texto.descripcion": {
        en: "A parallel corpus: a collection of texts that express the same content in two languages, Qom and Spanish. It can help build machine translation systems and other language technologies, and it can support linguistic research, teaching and the documentation of both languages.",
        qom: ""
    },
    "texto.cifras": {
        en: "<strong>33,392</strong> Qom–Spanish segment pairs from <strong>7</strong> sources, published at AmericasNLP 2026.",
        qom: ""
    },
    "texto.fuentes": { en: "Corpus sources", qom: "" },
    "texto.datos": { en: "Data on Zenodo", qom: "" },
    "texto.articulo": { en: "Paper on the ACL Anthology", qom: "" },
    "texto.codigo": { en: "Code on GitHub", qom: "" },

    "voz.tipo": { en: "Speech corpus", qom: "" },
    "voz.estado": { en: "In preparation", qom: "" },
    "voz.descripcion": {
        en: "A speech corpus: a collection of voice recordings in Qom, each with its written transcription. It can be used to build technologies that recognize spoken Qom and turn it into text automatically (automatic speech recognition), and to study different aspects of spoken language. For example, this kind of technology could one day let someone speak in Qom and see their words written on a computer or a phone.",
        qom: ""
    },

    "codigo.titulo": { en: "Code", qom: "" },
    "codigo.texto": { en: "The code that builds the corpus, trains the models and evaluates them is open source.", qom: "" },
    "modelos.titulo": { en: "Translation models", qom: "" },
    "modelos.texto": { en: "The models are on Hugging Face and are private for now. You can try them with the online translator.", qom: "" },

    "publicaciones.titulo": { en: "Publications", qom: "" },
    "publicaciones.en": { en: "In", qom: "" },
    "publicaciones.ver": { en: "Read the paper", qom: "" },

    "traductor.titulo": { en: "Online translator", qom: "" },
    "traductor.texto": {
        en: "Try our interactive tool and see how technology translates texts automatically between Qom and Spanish, using this project’s models.",
        qom: ""
    },
    "traductor.boton": { en: "Open the translator", qom: "" },
    "traductor.aviso-prueba": { en: "This is a test version: translations may contain errors.", qom: "" },
    "traductor.aviso-espera": {
        en: "If nobody has used it for a while, the first translation can take a minute or two. After that it takes a few seconds.",
        qom: ""
    },
    "ejemplos.titulo": { en: "Examples", qom: "" },

    "uso.titulo": { en: "Use", qom: "" },
    "uso.texto": {
        en: "We count visits to this site and clicks on the main resources, without cookies or personal data. Zenodo publishes the downloads of each dataset.",
        qom: ""
    },
    "uso.descargas": { en: "Downloads on Zenodo", qom: "" },
    "uso.vistas": { en: "Views on Zenodo", qom: "" },
    "uso.visitas": { en: "Visits to this site", qom: "" },

    "equipo.titulo": { en: "Team", qom: "" },
    "equipo.miembros": { en: "Full members", qom: "" },
    "equipo.colaboradores": { en: "Collaborators", qom: "" },
    "equipo.hablantes": { en: "Speakers and translators", qom: "" },
    "equipo.instituciones": { en: "Institutions", qom: "" },
    "rol.aleksei": { en: "Corpus building and translator", qom: "" },
    "rol.macarena": { en: "Corpus building and translator evaluation", qom: "" },
    "rol.pablo": { en: "Corpus building and tool development", qom: "" },
    "rol.victoria": { en: "Anthropological advice", qom: "" },
    "inst.icc": { en: "Institute of Computer Science Research (UBA-CONICET)", qom: "" },
    "inst.il": { en: "Institute of Linguistics, Faculty of Philosophy and Letters (UBA)", qom: "" },
    "inst.conicet": { en: "National Scientific and Technical Research Council", qom: "" },

    "citar.titulo": { en: "How to cite", qom: "" },
    "citar.texto": { en: "If you use these resources in your work, please cite the paper.", qom: "" },
    "citar.doi-articulo": { en: "Paper DOI", qom: "" },
    "citar.doi-datos": { en: "Data DOI", qom: "" },
    "citar.copiar": { en: "Copy", qom: "" },

    "agradecimientos.titulo": { en: "Acknowledgements", qom: "" },
    "agradecimientos.trabajo": {
        en: "This work was supported by Lacuna Fund, the Institute of Linguistics (UBA), the ICC (CONICET-UBA) and the Department of Computer Science (UBA).",
        qom: ""
    },
    "agradecimientos.datos": {
        en: "The datasets were created with support from Lacuna Fund, Google.org, the Institute of Linguistics (UBA) and the ICC (CONICET-UBA).",
        qom: ""
    },

    "pie.contacto": { en: "Contact", qom: "" },
    "pie.sitio": { en: "This site", qom: "" },
    "pie.sitio-enlace": { en: "Code and how to update it", qom: "" },
    "pie.licencia": { en: "License", qom: "" },
    "pie.licencia-pendiente": { en: "To be decided", qom: "" },
    "pie.descargo": {
        en: "The views expressed on this site do not necessarily represent those of Lacuna Fund, its Steering Committee, its funders or Meridian Institute.",
        qom: ""
    },

    /* Mensajes que arma el sitio. Llevan también el español. */
    "dinamico.copiado": { es: "Copiado.", en: "Copied.", qom: "" },
    "dinamico.copiar-error": {
        es: "No se pudo copiar. El texto quedó seleccionado: copialo con Ctrl+C o Cmd+C.",
        en: "Couldn’t copy. The text is selected: copy it with Ctrl+C or Cmd+C.",
        qom: ""
    },
    "dinamico.cifras-sin-registros": {
        es: "Las cifras de Zenodo aparecen cuando los conjuntos de datos estén publicados.",
        en: "Zenodo figures appear once the datasets are published.",
        qom: ""
    },
    "dinamico.cifras-cargando": { es: "Cargando las cifras de Zenodo…", en: "Loading Zenodo figures…", qom: "" },
    "dinamico.cifras-ok": {
        es: "Cifras de Zenodo, de todas las versiones, al momento de abrir la página.",
        en: "Zenodo figures, across all versions, as of when the page was opened.",
        qom: ""
    },
    "dinamico.cifras-error": {
        es: "No pudimos cargar las cifras de Zenodo. Probá de nuevo más tarde.",
        en: "We couldn’t load the Zenodo figures. Please try again later.",
        qom: ""
    },
    "dinamico.panel": { es: "Ver el panel", en: "See the dashboard", qom: "" },
    "dinamico.sin-dato": { es: "Todavía sin datos", en: "No data yet", qom: "" },
    "dinamico.aviso-qom": {
        es: "Esta página todavía no está traducida al qom. Mientras tanto, los textos que faltan se muestran en español.",
        en: "This page is not translated into Qom yet. Meanwhile, missing texts are shown in Spanish.",
        qom: ""
    }
};
