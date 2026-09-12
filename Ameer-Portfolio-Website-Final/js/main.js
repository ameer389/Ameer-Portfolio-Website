const menuButton = document.querySelector('.menu-button')
const nav = document.querySelector('nav')
const navLinks = [...document.querySelectorAll('nav a[data-section]')]

menuButton?.addEventListener('click', () => {
  const open = nav.classList.toggle('nav-open')
  menuButton.setAttribute('aria-expanded', String(open))
})

navLinks.forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('nav-open')
  menuButton?.setAttribute('aria-expanded', 'false')
}))

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible')
      revealObserver.unobserve(entry.target)
    }
  })
}, { threshold: 0.12 })

document.querySelectorAll('.reveal:not(.is-visible)').forEach(el => revealObserver.observe(el))

const sections = [...document.querySelectorAll('main section[id]')]
const sectionObserver = new IntersectionObserver(entries => {
  const visible = entries
    .filter(entry => entry.isIntersecting)
    .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
  if (!visible) return
  const id = visible.target.id
  navLinks.forEach(link => link.classList.toggle('active', link.dataset.section === id))
}, { rootMargin: '-25% 0px -60% 0px', threshold: [0.05, 0.2, 0.5] })

sections.forEach(section => sectionObserver.observe(section))
