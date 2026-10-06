---
name: apple-motion
description: Aplica a una web un movimiento estilo Apple que SE NOTA — springs, física, interrumpibilidad, gestos con inercia, elementos compartidos y continuidad espacial, con una sola física coherente — midiendo antes/después en vez de solo cambiar curvas. Úsalo cuando pidan "animaciones estilo Apple", "que se sienta fluido/físico/natural/premium", "springs", "drag/swipe con momentum", "rubber-band", "card que se expande", "interrumpible", unificar o auditar el movimiento de una web. English: apply Apple-style motion behavior that is actually perceptible (springs, velocity handoff, shared-element transitions, interruptibility), proven with before/after motion traces. Teoría de fondo: `apple-design`; una animación puntual: `animate`.
---

# Apple Motion — diseña el comportamiento, y comprueba que se note

> No diseñes "animaciones"; diseña el comportamiento de los elementos.
> Cada acción produce una respuesta inmediata, predecible y natural, regida por **una sola física**.

## Lección que da forma a este skill

La primera versión de este trabajo cambió ~15 archivos y el usuario casi no notó diferencia. Medido: en entradas pasivas (fades/reveals) un `cubic-bezier(0.16,1,0.3,1)` y un spring crítico dibujan **casi la misma curva** (t90 300ms→400ms en una sección, mismo perfil). Sustituir curvas es higiene y consistencia, **no un cambio perceptible**.

La física se siente en cuatro situaciones: **(1) input continuo** (drag, puntero, scroll), **(2) velocidad** (flick, soltar), **(3) interrupción** (cambiar de idea a media animación), **(4) continuidad espacial** (algo se *convierte* en otra cosa). Todo el trabajo se mide contra eso.

## Reglas de diseño (el prompt, ordenado)

1. **Comportamiento antes que duración.** Lo que se toca va con springs.
2. **Respuesta inmediata:** feedback en pointer-down; durante un gesto, el UI sigue al dedo/ratón 1:1.
3. **Interrumpible siempre.** Se anima desde el valor *actual* en pantalla y se hereda su velocidad.
4. **Continuidad espacial.** Un elemento se transforma o viaja; entra y sale por el mismo camino, anclado a su origen.
5. **Gestos ligados.** Al soltar: proyecta el momentum (`project(v)`), decide por la proyección y continúa a la velocidad del gesto.
6. **Límites elásticos** (`rubberband`), nunca cortes secos.
7. **Sutil y coordinado:** desplazamiento + escala + opacidad (+ blur solo en elementos pequeños). Sin rebotes gratuitos ni loops decorativos.
8. **Una sola física** en JS y CSS.

## Procedimiento

### Fase 0 — Define qué se va a *sentir* (antes de tocar código)

1. **Mapea las interacciones reales** de la web: qué agarra, toca, hoverea, scrollea o navega el usuario. Anota cuáles ocurren en **escritorio** (ratón/teclado/rueda) y cuáles en **táctil**. *Ninguna interacción puede ser solo-táctil*; en escritorio, hover, drag con ratón y scroll son las superficies.
2. **Elige de 3 a 5 "momentos firma"** de `reference/signature-patterns.md` (A carrusel arrastrable, B card→detalle compartido, C scroll direccional, D profundidad hover/press, E expandir interrumpible, F parallax ligado, G píldora viajera). Requisito mínimo: **uno de manipulación directa o continuidad (A/B)** y **uno ligado al scroll o al puntero (C/D/F)**. Si la web es muy estática, no inventes más de los que el contenido pide.
3. **Escribe el delta esperado de cada uno** en una frase: *"Antes: la card abre un link externo. Después: la card se expande en el sitio y se puede cerrar arrastrando."* Si no puedes escribir esa frase con algo que un usuario notaría, ese cambio no es un momento firma.

### Fase 1 — Inventario y línea base

```bash
grep -rnE "cubic-bezier|transition:|animation:|@keyframes|duration:|ease:|stiffness|damping|scrollIntoView|scroll-behavior|setTimeout" src
```

Clasifica cada hallazgo: **gesto** (springs + MotionValues + velocidad), **estado/entrada** (springs declarativos, exit espejo), **micro-feedback** (spring CSS `linear()` o `whileTap`). Lo decorativo sin significado (pulsos infinitos, flotados) se elimina.

Captura la **línea base** antes de cambiar nada (una rama/worktree de `main` servida aparte) con `scripts/trace-motion.mjs`:

```bash
node scripts/trace-motion.mjs --url http://127.0.0.1:5174/ --selector "#projects > div" --trigger scroll:700 --label before
```

Imprime t10/t50/t90, asentamiento, overshoot y una curva ASCII del movimiento real del elemento.

### Fase 2 — Una física en un archivo

Copia `templates/physics.ts` a `src/motion/physics.ts`: springs descritos como Apple (damping ratio + response) y convertidos con `ω=2π/r, k=ω², c=2ζω`.

| Token | ζ | response | Uso |
|---|---|---|---|
| `press` | 1 | 0.2 | feedback al presionar |
| `snappy` | 1 | 0.3 | UI pequeña, indicadores, menús |
| `settle` | 1 | 0.4 | entrar / reposicionar (default) |
| `gentle` | 1 | 0.55 | superficies grandes |
| `momentum` | 0.8 | 0.4 | **solo** tras un gesto con velocidad |
| `follow` | 1 | 0.3 | seguir al puntero / scroll |
| `magnet` | 0.85 | 0.35 | atraídos por el puntero |
| `ambient` | 1 | 0.9 | fondo, más pesado que lo que se toca |

Default `ζ=1`; rebote (`ζ≈0.8`) solo si el gesto traía momentum. Gemelo CSS: `node scripts/gen-spring.mjs` → `linear(...)` (`--spring`, `--spring-bounce`, `--t-press 160ms`, `--t-snappy 300ms`, `--t-settle 470ms`, `--t-gentle 650ms`). Todo `transition` de **transform** usa `var(--spring)`.

### Fase 3 — Momentos firma primero, refactor después

1. **Implementa los momentos firma** (código en `reference/signature-patterns.md`). Son el entregable; hazlos bien antes de nada más.
2. **Luego** el barrido de consistencia (tokens, `whileTap`, variantes compartidas, Lenis con `lerp`). Esto es valioso pero es *invisible*: no lo presentes como el cambio.

Recetas base (verificadas):

- **Entradas:** variantes compartidas `reveal`/`item`/`focusIn` en un archivo, no props sueltas por componente. Blur solo en elementos pequeños.
- **Press:** `whileTap={{ scale: .985 }} transition={springs.press}` o `:active { transition-duration: var(--t-press) }`; más rápido bajando que subiendo.
- **Superficie que sale de un origen:** `transformOrigin` en el disparador; `hidden` y `exit` con los mismos valores; materializa con `backdropFilter: blur(0→24px)` + escala.
- **Drag con inercia (descartar):**

```tsx
const y = useMotionValue(0)
<motion.div drag="y" dragMomentum={false}
  dragConstraints={{ top: -1200, bottom: 0 }} dragElastic={{ top: 0, bottom: 0.15 }}
  style={{ y }} onDragEnd={(_, i) => {
    const projected = i.offset.y + project(i.velocity.y)
    if (projected < -Math.max(120, height * 0.2)) close({ velocity: i.velocity.y, distance: height })
    else animate(y, 0, { ...springs.momentum, velocity: i.velocity.y })
  }} />
```
- **Scroll:** Lenis con `lerp` (no `duration+easing`); scrolls programáticos por `lenis.scrollTo`, no `scrollIntoView`; CSS oficial `.lenis.lenis-smooth { scroll-behavior:auto !important }`.
- **Pointer-follow:** `useSpring(raw, springs.follow|magnet)`; el valor crudo se escribe 1:1 en cada movimiento.

### Fase 4 — Demuestra la diferencia (obligatorio)

1. **Traza después** con el mismo comando que en la línea base y compara. Regla de delta perceptible:
   - En movimientos **pasivos** (fade/reveal), si t90 varía < ~25% y la silueta ASCII es la misma → **invisible**; no lo cuentes como mejora, solo como consistencia.
   - Un momento firma debe mostrar algo que la línea base **no podía**: seguir un puntero, heredar velocidad, revertir a mitad, transformarse en otro elemento. Pruébalo con interacción real (Playwright: `mouse.down/move/up`, `hover`, doble clic rápido) y mide: posición vs input, continuidad tras soltar, ausencia de saltos al interrumpir.
2. **Haz visible la diferencia al usuario:** graba un clip antes/después con Playwright (`browser.newContext({ recordVideo: { dir, size } })`, mismas acciones en `main` y en la rama) o pasa capturas de frames intermedios (p. ej. a 80/160/320 ms). Los números no sustituyen verlo.
3. Corre `lint` + `build` y `prefers-reduced-motion` (todo visible, `transform: none`).

Verificaciones que deben cumplirse (ejemplos en `scripts/verify-motion.example.mjs`):

| Prueba | Esperado |
|---|---|
| Arrastrar N px | el elemento se desplaza N px (1:1) |
| Pasar el límite | se mueve mucho menos (rubber-band) |
| Soltar sin comprometer | vuelve con spring a la posición |
| Flick | continúa en la misma dirección tras soltar |
| Interrumpir a mitad (doble tap/clic) | sin salto: parte de la posición actual |
| Rueda durante scroll programático | toma el control |
| Teclado (Esc/flechas) | cada gesto tiene equivalente |
| Consola | sin errores |

## Trampas reales

- **`exit` no puede depender de estado:** un hijo de `AnimatePresence` conserva las props de su último render. Usa variante `exit` como función + `custom` en `AnimatePresence` **y** en el hijo.
- **Distancias en px, no %**, al animar `exit` desde valores en px.
- **`filter` en contenedores grandes** (aun con `blur(0px)`) deja un stacking context y rompe `backdrop-filter` de los hijos.
- **`transition-duration` en lista se empareja por posición** de propiedad (`transform, box-shadow, opacity` → 3 valores en ese orden).
- **Un `transition:` inline en JSX gana a `:active`** de la hoja de estilos; muévelo a CSS si el press debe ser más rápido.
- **`@keyframes` + `animation-delay`** no se interrumpen ni heredan velocidad; usa variantes con spring.
- **`once:false` + `hidden`/`visible`:** úsalo igual en todas las secciones.
- **Un drag dispara el click del link al soltar:** `onClickCapture` que lo cancele si hubo movimiento; `draggable={false}` en imágenes.
- **`layoutId` + `border-radius`/`box-shadow` en clases:** se deforman al escalar; ponlos en `style`.

## Accesibilidad

`MotionConfig reducedMotion="user"`; `prefers-reduced-transparency` quita `backdrop-filter`; el smooth-scroll se desactiva con reduced motion. Todo gesto tiene vía de tap/teclado; los diálogos conservan foco, `Esc` y `aria-modal`.

## Anti-patrones

- Presentar un barrido de curvas como "la mejora" cuando no se nota.
- `cubic-bezier` + duración fija en algo que el usuario toca.
- Animar el destino en vez del valor actual; bloquear input mientras anima.
- Aparecer/desaparecer sin origen; entrar por un lado y salir por otro.
- Rebotes sin momentum previo; springs distintos "porque sí".
- Bucles decorativos; cortes secos en los límites.
- Gestos solo táctiles, o sin equivalente de teclado.

## Entregable

Al terminar, reporta con honestidad: (1) los **momentos firma** y su *antes → después* en una frase, (2) la **tabla de trazas** antes/después con cuáles son perceptibles y cuáles solo consistencia, (3) tokens de física y dónde viven, (4) qué se eliminó, (5) cómo ver la diferencia (clip/capturas) y qué falta probar en hardware real.
