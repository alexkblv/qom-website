# Tecnologías de Lenguaje para Qom: sitio web

Sitio del proyecto: los corpus QomL’aqtaqa (texto) y QomSpeech (habla), el traductor
qom–español en línea, el equipo y cómo citar. Es una página estática (HTML, CSS y
JavaScript, sin herramientas de compilación) publicada con GitHub Pages.

## Qué hay en cada archivo

| Archivo | Qué tiene |
|---|---|
| `index.html` | La página y todos los textos en español |
| `textos.js` | Los mismos textos en inglés y en qom |
| `config.js` | Estadísticas (Plausible) y registros de Zenodo |
| `style.css` | El diseño |
| `script.js` | Idiomas, menú, correos, estadísticas y lista de pendientes |
| `assets/` | Logos, ícono de la pestaña e imagen para compartir el enlace |

Todo se puede editar desde la web de GitHub: abrir el archivo, tocar el lápiz, cambiar y
guardar (“Commit changes”). El sitio se actualiza en uno o dos minutos.

## Pendientes

Lo que todavía falta está marcado en la página con recuadros rojos, y arriba aparece un aviso
rojo con la lista completa y quién completa cada cosa. Cuando no quede ningún pendiente,
el aviso desaparece solo.

Para completar uno, buscar en `index.html` el bloque con `class="pendiente"` y reemplazarlo
por el contenido final. Por ejemplo, el botón «Descargar los datos»: cuando exista el
registro en Zenodo, poner su dirección en `href`, agregar `data-evento="download_dataset"`
y borrar `pendiente`, `pendiente-boton`, `data-pendiente` y `data-quien`.

Los pendientes que no tienen un lugar en la página están al final de `index.html`, en la
lista `pendientes-generales`. Se borran igual, cuando estén resueltos.

## Cambios frecuentes

### Cambiar un texto en español

Buscar el texto en `index.html` y cambiarlo. No borrar el atributo `data-t="..."`: es la
clave que une ese texto con sus traducciones.

### Traducir al inglés o al qom

1. Abrir el sitio con `?claves` al final de la dirección (por ejemplo
   `https://vcotik.github.io/qom-webiste/?claves`). Al lado de cada texto aparece su clave.
2. Buscar esa clave en `textos.js` y completar `en` o `qom`.

Si un texto en qom está vacío (`qom: ""`), la página muestra el español y un aviso amarillo.
Algunos textos llevan etiquetas como `<strong>`; hay que conservarlas. El selector de idioma
recuerda la elección de cada visitante, y también se puede enlazar a un idioma con
`?idioma=en` o `?idioma=qom`.

Las palabras y frases en qom dentro del texto van marcadas con `lang="tob"` (el código de
la lengua qom). Así se ven con su tipografía y los lectores de pantalla las reconocen.

### Agregar o cambiar una persona del equipo

Copiar un bloque `<li class="persona">` de la sección Equipo y cambiar nombre, lugar de
trabajo y rol. Si el rol se traduce, darle una clave nueva (`data-t="rol.nombre"`) y
agregarla en `textos.js`.

Los correos van codificados para que no los junten los robots que mandan spam. Para
codificar uno, abrir el sitio, abrir la consola del navegador (F12) y escribir:

```js
btoa("nombre@ejemplo.com".split("").reverse().join(""))
```

El resultado va en `data-c="..."`. Dentro del enlace se deja la dirección escrita con
`[arroba]`, que es lo que ve quien navega sin JavaScript.

### Estadísticas de visitas, clics y descargas

**Visitas y clics.** El sitio está preparado para [Plausible](https://plausible.io), que no
usa cookies (es un servicio pago). Para activarlo:

1. Crear el sitio en Plausible con el dominio definitivo.
2. Poner ese dominio en `config.js`, en `plausible.dominio`.
3. En Plausible, crear objetivos de tipo *custom event* con estos nombres:
   `open_translator`, `download_dataset`, `open_code` y `open_paper`.
4. Opcional: activar el panel público y pegar su enlace en `plausible.panelPublico`. Así
   aparece en la sección «Uso».

Los enlaces que cuentan clics tienen `data-evento="..."`. Mientras Plausible no esté
configurado, cada clic se anota en la consola del navegador, para probar que funcionan.

**Descargas y vistas de Zenodo.** Poner los números de los registros publicados en
`config.js`, en `zenodo.registros` (por ejemplo `[12345678, 12345679]`). La sección «Uso»
suma sus descargas y vistas cada vez que alguien abre la página.

### Dominio propio

En GitHub: *Settings → Pages → Custom domain*, y configurar el DNS del dominio como indica
GitHub. Después, actualizar en `index.html` las direcciones de `og:url` y `og:image`, que
son las que usan WhatsApp y las redes para mostrar la vista previa del enlace.

## Probar en la computadora

Desde la carpeta del sitio:

```bash
python3 -m http.server 8000
```

y abrir <http://localhost:8000>.

## Diseño

- **Colores:** los del motivo del proyecto (azul, verde y amarillo sobre fondo papel). El
  motivo está dibujado en SVG dentro de `index.html`, así que pesa poco y se ve nítido en
  cualquier pantalla.
- **Tipografías:** [Archivo](https://fonts.google.com/specimen/Archivo) (Omnibus-Type) para
  todo el sitio y [Alegreya](https://fonts.google.com/specimen/Alegreya) (Huerta
  Tipográfica) solo para las palabras en qom. Las dos son de fundidoras de Buenos Aires y
  tienen los caracteres de la escritura qom, como la ỹ.
- **Accesibilidad:** contraste AA en todos los textos, navegación con teclado, textos
  alternativos y respeto de la opción del sistema para reducir animaciones.
