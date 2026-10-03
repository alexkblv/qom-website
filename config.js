/*
  Configuración del sitio.

  Es el único archivo que hay que tocar para:
  - activar las estadísticas de visitas y clics (Plausible), y
  - mostrar las descargas y vistas de los conjuntos de datos en Zenodo.

  Mientras los campos estén vacíos el sitio funciona igual: no se carga nada
  de afuera y los clics se anotan en la consola del navegador para probarlos.
*/
window.CONFIG = {
    plausible: {
        // Dominio del sitio tal como figura en Plausible, por ejemplo "lenguaqom.com.ar".
        dominio: "",

        // Script de Plausible que registra los clics marcados con data-evento.
        // Si Plausible indica otro script al crear el sitio, pegarlo acá.
        script: "https://plausible.io/js/script.tagged-events.js",

        // Enlace al panel público de Plausible (opcional). Si está, aparece en la sección «Uso».
        panelPublico: ""
    },

    zenodo: {
        // Números de los registros publicados en Zenodo. Sus descargas y vistas se suman
        // en la sección «Uso». El número está en la dirección del registro:
        // https://zenodo.org/records/12345678  ->  12345678
        registros: []
    }
};
