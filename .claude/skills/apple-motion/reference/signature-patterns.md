# Patrones firma (los que SÍ se sienten)

Cambiar un `cubic-bezier` por un spring en un fade de entrada **no se nota**: un expo-out y un spring crítico dibujan casi la misma curva. La física se siente cuando hay *input continuo, velocidad, interrupción o continuidad espacial*. Estos patrones son donde eso ocurre. Elige 3–5 según la web; cubre al menos uno de A/B (manipulación directa o continuidad) y uno de C/F (scroll).

Todos usan `springs`/`project`/`rubberband` de `templates/physics.ts` (Framer Motion v12). Pruébalos con `scripts/trace-motion.mjs` y con interacción real; el código es la receta, ajusta medidas y selectores.

> Regla de dispositivos: ninguno puede ser solo-táctil. Con `drag` de Framer funcionan igual con ratón; añade equivalente de teclado (flechas / Esc / Enter) para cada gesto.

---

## A. Carrusel/lista arrastrable con snap y momentum (manipulación directa)

Se siente: lo agarras, sigue tu mano 1:1, un flick lo lanza al *siguiente* punto de snap según su velocidad, y en los extremos resiste (rubber-band).

```tsx
const x = useMotionValue(0)
const trackRef = useRef<HTMLDivElement>(null)
const [moved, setMoved] = useState(false)

const snapTo = (velocity: number) => {
  const track = trackRef.current!
  const step = track.children[0].getBoundingClientRect().width + GAP // ancho de card + gap
  const min = -(track.scrollWidth - track.parentElement!.clientWidth) // límite izquierdo
  const projected = x.get() + project(velocity)                       // a dónde iría el flick
  const target = Math.max(min, Math.min(0, Math.round(projected / step) * step))
  animate(x, target, { ...springs.momentum, velocity })               // hereda la velocidad del dedo
}

<motion.div ref={trackRef} style={{ x, display: 'flex', gap: GAP, cursor: 'grab' }}
  drag="x" dragMomentum={false} dragElastic={0.12}
  dragConstraints={{ left: min, right: 0 }}          // fuera de rango: rubber-band
  onDragStart={() => setMoved(true)}
  onDragEnd={(_, i) => { snapTo(i.velocity.x); setTimeout(() => setMoved(false), 0) }}
  whileDrag={{ cursor: 'grabbing' }}
>
  {items.map(it => <a key={it.id} draggable={false}
      onClickCapture={e => moved && e.preventDefault()}  /* un arrastre no es un click */ />)}
</motion.div>
```

Trampas: `draggable={false}` en imágenes/links; `user-select: none`; sin `onClickCapture` el drag dispara el link al soltar; recalcula `min` en `resize`; añade ←/→ para cambiar de snap con `animate(x, …, springs.settle)`.

## B. Elemento compartido: card → detalle (continuidad espacial)

Se siente: la card **se convierte** en el panel; no se abre un modal aparte. Es el gesto que más "dice Apple".

```tsx
<LayoutGroup>
  {items.map(it => (
    <motion.article key={it.id} layoutId={`card-${it.id}`} onClick={() => setOpen(it.id)}
      style={{ borderRadius: 12 }} transition={springs.settle}>   {/* radius en style, no en clase */}
      <motion.img layoutId={`img-${it.id}`} />
      <motion.h3 layoutId={`title-${it.id}`}>{it.title}</motion.h3>
    </motion.article>
  ))}
  <AnimatePresence>
    {open && <>
      <motion.div className="scrim" onClick={close}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
      <motion.div className="detail" layoutId={`card-${open}`} style={{ borderRadius: 24 }}
        transition={springs.settle} role="dialog" aria-modal="true">
        <motion.img layoutId={`img-${open}`} />
        <motion.h3 layoutId={`title-${open}`}>{title}</motion.h3>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: .12 } }}
          exit={{ opacity: 0, transition: { duration: .1 } }}>{body}</motion.div>  {/* contenido nuevo entra tras el movimiento */}
      </motion.div>
    </>}
  </AnimatePresence>
</LayoutGroup>
```

Trampas: `borderRadius`/`boxShadow` en `style` (si no, Framer los deforma al escalar); el contenido nuevo aparece *después* de que la forma llega; bloquea el scroll del fondo (`lenis.stop()`/`overflow:hidden`) y devuélvelo al cerrar; Esc cierra, foco al abrir y restituido al cerrar; deja la card original con `visibility` controlada para que no "salte" al volver. Es interrumpible: cerrar a media apertura revierte desde la posición actual.

## C. Scroll con dirección/velocidad (el chrome responde al scroll)

```tsx
const { scrollY } = useScroll()
const [hidden, setHidden] = useState(false)
useMotionValueEvent(scrollY, 'change', y => {
  const prev = scrollY.getPrevious() ?? 0
  setHidden(y > prev && y > 120)            // baja → se esconde; sube → vuelve
})
<motion.nav animate={{ y: hidden ? -72 : 0 }} transition={springs.snappy} />
```

Variante con velocidad (sutil, ±2°, solo en elementos grandes y lentos): `const v = useSpring(useVelocity(scrollY), springs.follow)`; `const skew = useTransform(v, [-2000, 2000], [-2, 2], { clamp: true })`. Si se nota "mareo", baja el rango.

## D. Profundidad en hover/press (micro, pero constante)

Se siente: la card se *levanta* hacia el puntero y se hunde al presionar; es lo que más se toca.

```tsx
<motion.a whileHover={{ y: -4 }} whileTap={{ scale: 0.985, y: 0 }} transition={springs.snappy} className="card" />
```
Sombra sin animar `box-shadow` (no es compositor): pseudo-elemento `.card::after` con la sombra grande y `opacity: 0 → 1` en `:hover` con `transition: opacity var(--t-snappy) var(--spring)`. Solo `@media (hover: hover) and (pointer: fine)`; en táctil, solo el press.

## E. Expandir/colapsar interrumpible (acordeón, FAQ, detalles)

```tsx
<AnimatePresence initial={false}>
  {open && <motion.div key="body"
    initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
    exit={{ height: 0, opacity: 0 }} transition={springs.settle} style={{ overflow: 'hidden' }} />}
</AnimatePresence>
```
Clic doble rápido debe revertir desde la altura actual sin saltar (Framer lo hace con springs; con CSS `height` no). Contenido interno en `opacity` + leve `y`, no animar su layout.

## F. Progreso/parallax ligado al scroll con inercia

```tsx
const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
const p = useSpring(scrollYProgress, springs.follow)   // suaviza sin retrasar de más
const y = useTransform(p, [0, 1], [40, -40])
```
El valor sigue al scroll (ligado), el spring solo le quita el escalonado. Úsalo para 1–2 elementos de jerarquía (imagen hero, barra de progreso), no para todo.

## G. Selector con "píldora" que viaja (tabs/segmentado/nav)

```tsx
{active === t.id && <motion.span layoutId="pill" className="pill" transition={springs.snappy} />}
```
La píldora **viaja** entre opciones en vez de apagarse y encenderse; si el usuario cambia rápido, redirige sin saltos.

---

## Criterio de elección

| Si la web tiene… | Prioriza |
|---|---|
| Lista/grilla de proyectos o productos | B (card → detalle), A (carrusel), D |
| Navegación fija / secciones largas | C, G, F |
| Contenido plegable | E |
| Muy estática (portafolio simple) | D + C + 1 gesto firma (A o B); no inventes más |
