---
name: apple-motion
description: Diseña y aplica el comportamiento de movimiento de una interfaz web al estilo Apple — springs, física, interrumpibilidad, gestos con inercia, continuidad espacial y coherencia global — en vez de agregar "animaciones" sueltas. Úsalo cuando pidan "animaciones estilo Apple", "que se sienta fluido/físico/natural", "springs", "drag/swipe con momentum", "rubber-band", "interrumpible", unificar el movimiento de una web, o auditar y reemplazar easings/duraciones fijas por física. English: apply Apple-style motion behavior (springs, velocity handoff, interruptibility, spatial continuity) to a web UI as one coherent physical system. Para la teoría de fondo (WWDC) usa `apple-design`; para una animación puntual usa `animate`.
---

# Apple Motion — diseña el comportamiento, no las animaciones

> No diseñes "animaciones"; diseña el comportamiento de los elementos.
> Cada acción del usuario produce una respuesta **inmediata, predecible y natural**, regida por **una sola física** en toda la app.

Este skill es el procedimiento para **aplicar** eso a un código real. La teoría detallada (damping/response, proyección, materiales, tipografía) está en `apple-design`; aquí está el *cómo ejecutarlo* y las trampas que aparecen al hacerlo.

## Las 8 reglas (checklist de diseño)

1. **Comportamiento antes que duración.** Lo que el usuario toca va con springs. Un `duration: 0.8` fijo no puede reaccionar a nada.
2. **Respuesta inmediata.** El feedback ocurre en *pointer-down*, no al soltar. Durante un gesto, el UI sigue al dedo 1:1.
3. **Interrumpible siempre.** Nunca bloquear input durante una transición. Toda animación parte del valor **actual en pantalla**, no del destino, y hereda su velocidad al cambiar de dirección.
4. **Continuidad espacial.** Un elemento se *transforma* o *viaja*, no desaparece y reaparece. Entra y sale por el **mismo camino**, anclado a su origen (el botón que lo abrió).
5. **Gestos = movimiento ligado.** En drag/swipe/scroll el movimiento *es* el gesto. Al soltar: proyecta el momentum (`project(v)`), decide por la proyección y continúa a la **velocidad del dedo** hasta asentarse.
6. **Límites elásticos.** Más allá de un borde, resistencia progresiva (`rubberband`), nunca un corte seco.
7. **Sutil y coordinado.** Desplazamiento + escala + opacidad (+ blur *solo* en elementos pequeños), con jerarquía: se entiende de dónde viene y a dónde va. Sin rebotes exagerados, sin loops decorativos.
8. **Una sola física.** Mismos springs, mismas curvas, mismas reglas en JS y en CSS. Si dos cosas "se sienten distintas", es un bug.

## Procedimiento

### 1. Inventario (read-only)
Busca todo el movimiento existente antes de tocar nada:

```bash
grep -rnE "cubic-bezier|transition:|animation:|@keyframes|duration:|ease:|stiffness|damping|scrollIntoView|scroll-behavior|setTimeout" src
```

Clasifica cada hallazgo en una de tres cajas:

| Tipo | Ejemplos | Herramienta |
|---|---|---|
| **Responde a un gesto** (drag, swipe, pointer-follow, scroll) | menú arrastrable, tilt, magnetic, scroll suave | springs + MotionValues + velocidad |
| **Cambio de estado/entrada** (abrir, mostrar, revelar) | menú, secciones, listas, toasts | springs declarativos, `exit` espejo |
| **Micro-feedback** (hover, press, foco) | botones, cards, links | spring CSS (`linear()`) o `whileTap`; color/opacidad pueden seguir con `ease-out` |

Lo que no encaja en ninguna caja y no comunica nada (pulsos infinitos, flotados decorativos) **se elimina**. Lo que sí tiene significado (un punto de "disponible", una pista de scroll) se queda.

### 2. Define la física en UN archivo
Copia `templates/physics.ts` a `src/motion/physics.ts`. Describe cada spring como Apple: **damping ratio** + **response (s)**, y `spring(ζ, r)` lo convierte a `stiffness/damping/mass` (`ω=2π/r, k=ω², c=2ζω`) para Framer Motion, `useSpring` y la liberación de drags.

Tokens base (ajústalos, pero mantén pocos):

| Token | ζ | response | Uso |
|---|---|---|---|
| `press` | 1 | 0.2 | feedback al presionar |
| `snappy` | 1 | 0.3 | UI pequeña: indicadores, items de menú |
| `settle` | 1 | 0.4 | entrar / reposicionar (default) |
| `gentle` | 1 | 0.55 | superficies grandes, reveals de sección |
| `momentum` | 0.8 | 0.4 | **solo** tras un gesto con velocidad (flick/soltar) |
| `follow` | 1 | 0.3 | seguir al puntero (tilt) |
| `magnet` | 0.85 | 0.35 | elementos atraídos por el puntero |
| `ambient` | 1 | 0.9 | fondo, más lento y pesado que lo que se toca |

Default: `ζ = 1` (sin rebote). Rebote (`ζ≈0.8`) únicamente cuando el gesto traía momentum.

Gemelo CSS: `node scripts/gen-spring.mjs` imprime `linear(...)` muestreado de la misma fórmula. Los springs críticamente amortiguados comparten curva y solo cambia el tiempo → 2 curvas (`--spring`, `--spring-bounce`) + duraciones (`--t-press 160ms`, `--t-snappy 300ms`, `--t-settle 470ms`, `--t-gentle 650ms`). Todo `transition` de **transform** usa `var(--spring)`; color/opacidad pueden seguir con un ease-out corto.

### 3. Aplica por tipo

**Entradas / reveals** — variantes compartidas, no props sueltas por componente:

```ts
export const reveal = {
  hidden:  { opacity: 0, y: 24, scale: 0.985 },
  visible: { opacity: 1, y: 0, scale: 1, transition: springs.gentle },
}
// small text/elements only: { opacity: 0, y: 18, filter: 'blur(8px)' } -> blur(0px)
```

**Press** — `whileTap={{ scale: 0.985 }} transition={springs.press}` (JS) o `:active { transform: scale(.97); transition-duration: var(--t-press) }` (CSS). Más rápido de bajar que de subir.

**Superficie que sale de un origen (menú/sheet/popover)** — `transformOrigin` en el disparador; `hidden` y `exit` con los mismos valores (camino espejo); materialízala con `backdropFilter: blur(0→24px)` + escala, no con un fade plano.

**Drag con inercia** (patrón verificado):

```tsx
const y = useMotionValue(0)
<motion.div drag="y" dragMomentum={false}
  dragConstraints={{ top: -1200, bottom: 0 }}
  dragElastic={{ top: 0, bottom: 0.15 }}   // rubber-band solo hacia el lado sin salida
  style={{ y }} onDragEnd={(_, info) => {
    const projected = info.offset.y + project(info.velocity.y)
    if (projected < -Math.max(120, height * 0.2)) close({ velocity: info.velocity.y, distance: height })
    else animate(y, 0, { ...springs.momentum, velocity: info.velocity.y }) // vuelve heredando velocidad
  }} />
```

Decide con la **proyección** del flick, no con la posición de soltado. Solo existe el camino por el que el elemento llegó (entra desde arriba → se descarta hacia arriba).

**Scroll** — si hay Lenis: `lerp` (decaimiento exponencial, interrumpible), **no** `duration + easing`. Los scrolls programáticos (nav) deben pasar por `lenis.scrollTo(..., { lerp })`, no por `scrollIntoView({behavior:'smooth'})`, que pelea con la rueda. Añade el CSS oficial `.lenis.lenis-smooth { scroll-behavior: auto !important }`.

**Pointer-follow (tilt/magnet)** — `useSpring(rawMotionValue, springs.follow|magnet)`; el valor crudo se escribe en cada `mousemove` (1:1) y el spring lo suaviza. Soltar (`mouseleave`) pone el crudo en 0 y el spring hace el regreso.

## Trampas reales (aprendidas aplicándolo)

- **`exit` no puede depender de estado.** Un hijo en `AnimatePresence` conserva las props de su *último render*. Si el exit cambia según cómo se cerró (tap vs swipe), usa **una variante `exit` función** + `custom` en `AnimatePresence` **y** en el hijo; `custom` sí se actualiza al salir.
- **Mezcla de `exit` en px y %:** pasa la distancia en px (mide `offsetHeight`); evita animar `%` desde un valor en px.
- **`filter` en contenedores grandes** (aunque termine en `blur(0px)`) deja un stacking context y rompe `backdrop-filter` de los hijos. Blur solo en texto/elementos pequeños; en secciones usa opacidad + y + escala.
- **`transition-duration` en lista se empareja por posición de propiedad.** Si `transition: transform, box-shadow, opacity`, el `:active` debe dar 3 valores en ese orden, o el press hereda el tiempo equivocado.
- **Un `transition:` inline en JSX gana a `:active` de la hoja de estilos.** Mueve esas transiciones a CSS/clases si quieres un press más rápido que el release.
- **`.fade-in-up` con `@keyframes` + `animation-delay`** no se puede interrumpir ni heredar velocidad: reemplázalo por variantes con spring.
- **`once:false` + estados `hidden`/`visible`** hace que los reveals se repitan: úsalo igual en todas las secciones, no mezcles `{}` y `hidden` según el componente.
- **Springs sobre `opacity`** no deben sobrepasar: con `ζ=1` no hay overshoot; con `ζ<1` limita opacity a 0–1 (Framer ya lo clampa en `opacity`).

## Reduced motion / accesibilidad

- `MotionConfig reducedMotion="user"` (Framer quita transforms y deja opacidad). Para CSS, el reset global de `prefers-reduced-motion` ya reduce las duraciones.
- `prefers-reduced-transparency: reduce` → quita `backdrop-filter` y usa fondos sólidos.
- Smooth-scroll (Lenis) se desactiva con reduced motion. Menú arrastrable debe seguir funcionando por tap/Esc (el drag es un atajo, no la única vía).
- Un menú modal conserva foco/`Esc`/`aria-modal` intactos al añadir gestos.

## Verifica con números, no a ojo

Corre el sitio en un navegador real (Playwright + CDP touch) y mide; ver `scripts/verify-motion.example.mjs` (ajusta rutas/selectores). Debe cumplirse:

| Prueba | Resultado esperado |
|---|---|
| Arrastrar 60px | el elemento se desplaza **60px** (1:1) |
| Dedo 140px más allá del borde | el elemento se mueve **mucho menos** (rubber-band) |
| Soltar sin comprometer | vuelve a 0 con spring |
| Flick rápido | sigue en la misma dirección tras soltar y se descarta |
| Tap abrir → tap cerrar a mitad de vuelo | sin salto: parte de la posición actual |
| Rueda durante un scroll programático | toma el control, no queda "atrapado" al destino |
| `prefers-reduced-motion` | todo visible (`opacity: 1`, `transform: none`) |
| Consola | sin errores |

Además revisa en cámara lenta/capturas intermedias (p. ej. a los 250 ms de la carga) que la entrada sea coordinada y no un fade genérico.

## Anti-patrones (rechazar)

- Un `cubic-bezier` + duración fija para algo que el usuario toca.
- Animar el *destino* en vez del valor actual (salta al interrumpir).
- Aparecer/desaparecer sin origen; entrar por un lado y salir por otro.
- Rebotes en cosas que no traían momentum; springs distintos "porque sí".
- Animaciones decorativas en bucle sin significado.
- Feedback solo al soltar; input bloqueado mientras anima.
- Cortes secos en los límites.
- Fiarse de `swipeleft`-style (solo estado final) en lugar de tracking continuo.

## Entregable al terminar

Resume al usuario: (1) tokens de física definidos y dónde viven, (2) qué se convirtió por tipo (gesto / estado / micro), (3) qué se eliminó por no comunicar nada, (4) los números de verificación de la tabla de arriba, (5) trade-offs honestos (p. ej. peso extra de JS, o lo que no se pudo medir sin dispositivo real). Prueba también en hardware táctil real: el emulador no reproduce la sensación del dedo.
