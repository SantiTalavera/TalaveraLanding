import { useEffect, useRef } from 'react'
import * as THREE from 'three'

export default function HeroVisual() {
  const container = useRef(null)

  useEffect(() => {
    const element = container.current
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let renderer
    try { renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true }) } catch { return undefined }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setClearColor(0x000000, 0)
    element.appendChild(renderer.domElement)
    const scene = new THREE.Scene()
    const camera = new THREE.OrthographicCamera(-3, 3, 1.7, -1.7, 0.1, 100)
    camera.position.set(6, 5, 8)
    camera.lookAt(0, 0, 0)
    scene.add(new THREE.HemisphereLight(0xffffff, 0x909090, 2.4))
    const light = new THREE.DirectionalLight(0xffffff, 2.2)
    light.position.set(3, 6, 5)
    scene.add(light)
    const structure = new THREE.Group()
    scene.add(structure)
    const pale = new THREE.MeshStandardMaterial({ color: 0xdedede, roughness: 0.7, metalness: 0.12 })
    const dark = new THREE.MeshStandardMaterial({ color: 0x777777, roughness: 0.55, metalness: 0.25 })
    const glass = new THREE.MeshStandardMaterial({ color: 0xb8b8b8, transparent: true, opacity: 0.48, roughness: 0.3, metalness: 0.1, depthWrite: false })
    const accent = new THREE.MeshStandardMaterial({ color: 0xf2c94c, roughness: 0.65, metalness: 0.1 })
    const box = (size, position, material) => {
      const mesh = new THREE.Mesh(new THREE.BoxGeometry(...size), material)
      mesh.position.set(...position)
      structure.add(mesh)
    }
    // Marcos desplazados y conexiones sugieren relaciones entre partes del sistema.
    const frameBox = (center, size) => {
      const [x, y, z] = center
      const [w, h, d] = size
      const t = 0.035
      for (const sy of [-1, 1]) for (const sz of [-1, 1])
        box([w, t, t], [x, y + sy * h / 2, z + sz * d / 2], dark)
      for (const sx of [-1, 1]) for (const sz of [-1, 1])
        box([t, h, t], [x + sx * w / 2, y, z + sz * d / 2], dark)
      for (const sx of [-1, 1]) for (const sy of [-1, 1])
        box([t, t, d], [x + sx * w / 2, y + sy * h / 2, z], dark)
    }
    frameBox([-0.75, 0.05, 0], [1.25, 1.15, 1.0])
    frameBox([0.65, 0.32, -0.12], [1.25, 0.9, 0.9])
    frameBox([0.15, -0.55, 0.48], [0.95, 0.65, 0.7])
    box([0.85, 0.035, 0.7], [-0.85, -0.18, 0.03], pale)
    box([0.035, 0.68, 0.65], [0.68, 0.32, -0.1], glass)
    box([0.62, 0.5, 0.035], [0.16, -0.51, 0.47], glass)
    box([1.05, 0.025, 0.025], [0, 0.2, -0.52], pale)
    box([0.025, 0.9, 0.025], [-0.12, -0.12, 0.45], pale)
    box([0.34, 0.34, 0.34], [-0.74, 0.23, 0.05], glass)
    box([0.16, 0.16, 0.16], [1.27, 0.77, 0.33], accent)
    const updatePalette = () => {
      const tokens = getComputedStyle(element)
      pale.color.set(tokens.getPropertyValue('--text-secondary').trim())
      dark.color.set(tokens.getPropertyValue('--text-primary').trim())
      glass.color.set(tokens.getPropertyValue('--border-subtle').trim())
      accent.color.set(tokens.getPropertyValue('--accent-primary').trim())
      renderer.render(scene, camera)
    }
    const themeObserver = new MutationObserver(updatePalette)
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme', 'style', 'class'] })
    updatePalette()
    let frame
    let targetX = 0
    let targetY = 0
    const pointerMove = (event) => {
      const rect = element.getBoundingClientRect()
      targetY = ((event.clientX - rect.left) / rect.width - 0.5) * 0.28
      targetX = ((event.clientY - rect.top) / rect.height - 0.5) * 0.18
    }
    const pointerLeave = () => { targetX = 0; targetY = 0 }
    element.addEventListener('pointermove', pointerMove)
    element.addEventListener('pointerleave', pointerLeave)
    const resize = () => {
      const width = element.clientWidth
      const height = element.clientHeight
      renderer.setSize(width, height, false)
      camera.top = 1.45
      camera.bottom = -1.45
      camera.left = -1.45 * width / height
      camera.right = 1.45 * width / height
      camera.updateProjectionMatrix()
      renderer.render(scene, camera)
    }
    const observer = new ResizeObserver(resize)
    observer.observe(element)
    resize()
    const animate = (time) => {
      if (!motion.matches) {
        structure.rotation.y += (targetY - structure.rotation.y) * 0.035
        structure.rotation.x += (targetX - structure.rotation.x) * 0.035
        structure.position.y = Math.sin(time * 0.0008) * 0.06
        renderer.render(scene, camera)
      }
      frame = requestAnimationFrame(animate)
    }
    frame = requestAnimationFrame(animate)
    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      themeObserver.disconnect()
      element.removeEventListener('pointermove', pointerMove)
      element.removeEventListener('pointerleave', pointerLeave)
      structure.children.forEach((mesh) => mesh.geometry.dispose())
      ;[pale, dark, glass, accent].forEach((material) => material.dispose())
      renderer.dispose()
      renderer.domElement.remove()
    }
  }, [])
  return <div ref={container} className="hero__visual" aria-hidden="true" />
}
