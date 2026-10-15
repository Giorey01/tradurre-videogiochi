import { onMounted, onBeforeUnmount, nextTick } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Coreografia per ogni sezione [data-sec]: i suoi [data-r] entrano in ordine di lettura,
// sfalsati di 75ms, salendo di 24px. Le liste [data-row] entrano riga per riga.
// [data-shutter] è il momento firma: l'immagine si apre dal basso.
// Con prefers-reduced-motion non si muove nulla e tutto è già visibile.
export function useMotion(rootRef) {
  let mm
  let safety

  function run() {
    const root = rootRef.value
    if (!root) return
    mm = gsap.matchMedia()
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      root.querySelectorAll('[data-sec]').forEach((sec) => {
        const parts = sec.querySelectorAll('[data-r]')
        if (parts.length) {
          gsap.from(parts, {
            y: 24,
            opacity: 0,
            duration: 0.8,
            ease: 'power3.out',
            stagger: 0.075,
            scrollTrigger: { trigger: sec, start: 'top 82%', once: true },
          })
        }
        const rows = sec.querySelectorAll('[data-row]')
        if (rows.length) {
          gsap.from(rows, {
            y: 18,
            opacity: 0,
            duration: 0.6,
            ease: 'power2.out',
            stagger: 0.05,
            scrollTrigger: { trigger: rows[0], start: 'top 88%', once: true },
          })
        }
      })

      root.querySelectorAll('[data-shutter]').forEach((el) => {
        const img = el.querySelector('img')
        const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 78%', once: true } })
        tl.to(el, { clipPath: 'inset(0 0 0% 0)', duration: 1.1, ease: 'power3.inOut' })
        if (img) tl.to(img, { scale: 1, duration: 1.5, ease: 'power2.out' }, 0)
      })

      root.querySelectorAll('[data-drift]').forEach((el) => {
        gsap.fromTo(el, { yPercent: -4 }, {
          yPercent: 4,
          ease: 'none',
          scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true },
        })
      })

      root.querySelectorAll('.lines [data-line]').forEach((el, i) => {
        gsap.from(el, { yPercent: 105, duration: 0.9, ease: 'power4.out', delay: 0.15 + i * 0.11 })
      })
    })

    // rete di sicurezza: se un trigger non scatta (tab in background, stampa), mostra tutto
    safety = setTimeout(() => {
      root.querySelectorAll('[data-r], [data-row]').forEach((el) => {
        if (getComputedStyle(el).opacity === '0' && el.getBoundingClientRect().top < innerHeight) {
          gsap.to(el, { opacity: 1, y: 0, duration: 0.4 })
        }
      })
    }, 2500)
    ScrollTrigger.refresh()
  }

  onMounted(() => nextTick(run))
  onBeforeUnmount(() => {
    clearTimeout(safety)
    mm && mm.revert()
  })
}
