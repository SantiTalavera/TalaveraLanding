import { useEffect, useRef } from 'react'

// Loaded separately so the landing can show the lightweight device preview first.
export default function DeviceScene({ item, view }) {
  const mount = useRef(null)
  useEffect(() => {
    const host = mount.current
    const stage = host.parentElement
    let disposed = false
    let cleanup = () => {}
    Promise.all([import('three'), import('three/addons/geometries/RoundedBoxGeometry.js')]).then(([THREE, { RoundedBoxGeometry }]) => {
      if (disposed) return
      let renderer
      try { renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' }) } catch { return }
      renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5))
      renderer.setClearColor(0, 0)
      renderer.toneMapping = THREE.ACESFilmicToneMapping
      renderer.toneMappingExposure = 1.25
      host.appendChild(renderer.domElement)
      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(30, 1, .1, 50)
      const group = new THREE.Group()
      scene.add(group)
      scene.add(new THREE.HemisphereLight(0xd9e9ff, 0x27343d, 2.5))
      for (const [color, intensity, position] of [[0xf5f5ee, 4, [-4, 6, 5]], [0xaecde7, 3, [5, 2, -3]], [0xffffff, 1.5, [0, -2, 5]]]) {
        const light = new THREE.DirectionalLight(color, intensity)
        light.position.set(...position)
        scene.add(light)
      }
      const geometries = new Set()
      const materials = new Set()
      const textures = new Set()
      const material = options => { const value = new THREE.MeshStandardMaterial(options); materials.add(value); return value }
      const metal = material({ color: '#677780', metalness: .75, roughness: .29 })
      const dark = material({ color: '#10171c', metalness: .35, roughness: .27 })
      const keys = material({ color: '#1b232a', metalness: .1, roughness: .55 })
      const glass = material({ color: '#050a0e', metalness: .25, roughness: .15 })
      const box = (parent, w, h, d, x, y, z, mat, radius = .04) => {
        const geometry = new RoundedBoxGeometry(w, h, d, 3, Math.min(radius, w / 3, h / 3, d / 3))
        geometries.add(geometry)
        const mesh = new THREE.Mesh(geometry, mat)
        mesh.position.set(x, y, z)
        parent.add(mesh)
        return mesh
      }
      const roundedShape = (w, h, r) => {
        const shape = new THREE.Shape()
        const x = -w / 2, y = -h / 2
        shape.moveTo(x + r, y)
        shape.lineTo(x + w - r, y); shape.quadraticCurveTo(x + w, y, x + w, y + r)
        shape.lineTo(x + w, y + h - r); shape.quadraticCurveTo(x + w, y + h, x + w - r, y + h)
        shape.lineTo(x + r, y + h); shape.quadraticCurveTo(x, y + h, x, y + h - r)
        shape.lineTo(x, y + r); shape.quadraticCurveTo(x, y, x + r, y)
        return shape
      }
      const phonePanel = (parent, w, h, depth, z, mat) => {
        const geometry = new THREE.ExtrudeGeometry(roundedShape(w, h, .17), { depth, bevelEnabled: false, curveSegments: 12 })
        geometries.add(geometry)
        const mesh = new THREE.Mesh(geometry, mat)
        mesh.position.set(0, .45, z - depth / 2)
        parent.add(mesh)
      }
      const screen = (parent, w, h, x, y, z, texture, radius = 0) => {
        const geometry = radius ? new THREE.ShapeGeometry(roundedShape(w, h, radius), 12) : new THREE.PlaneGeometry(w, h)
        if (radius) {
          const positions = geometry.attributes.position, uv = geometry.attributes.uv
          for (let i = 0; i < positions.count; i++) uv.setXY(i, positions.getX(i) / w + .5, positions.getY(i) / h + .5)
        }
        geometries.add(geometry)
        const mat = new THREE.MeshBasicMaterial({ map: texture, toneMapped: false })
        materials.add(mat)
        const mesh = new THREE.Mesh(geometry, mat)
        mesh.position.set(x, y, z)
        parent.add(mesh)
      }
      const textureFromCanvas = canvas => {
        const texture = new THREE.CanvasTexture(canvas)
        texture.colorSpace = THREE.SRGBColorSpace
        texture.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy())
        textures.add(texture)
        return texture
      }
      if (view !== 'mobile') {
        const laptop = new THREE.Group()
        group.add(laptop)
        box(laptop, 4.15, .12, 2.55, 0, -.76, .15, metal)
        box(laptop, 3.64, .025, 1.13, 0, -.685, -.23, dark)
        // Individual keys, recessed keyboard and trackpad give the open device depth.
        for (let row = 0; row < 5; row++) for (let col = 0; col < 13; col++) {
          box(laptop, .225, .026, .15, -1.57 + col * .26, -.66, -.64 + row * .2, keys, .012)
        }
        box(laptop, 1.25, .012, .58, 0, -.69, .91, metal, .025)
        const lid = new THREE.Group()
        lid.position.set(0, -.7, -.98)
        lid.rotation.x = -.12
        laptop.add(lid)
        box(lid, 4.1, 2.67, .11, 0, 1.34, 0, metal, .05)
        box(lid, 3.98, 2.54, .035, 0, 1.34, .065, dark, .014)
        box(lid, .035, .035, .012, 0, 2.57, .087, glass, .01)
        const canvas = document.createElement('canvas')
        canvas.width = 1600; canvas.height = 1000
        const context = canvas.getContext('2d')
        context.fillStyle = '#202020'; context.fillRect(0, 0, 1600, 1000)
        const texture = textureFromCanvas(canvas)
        screen(lid, 3.77, 2.36, 0, 1.32, .087, texture)
        const image = new Image()
        image.onload = () => {
          if (disposed) return
          const scale = Math.min(canvas.width / image.width, canvas.height / image.height)
          const w = image.width * scale, h = image.height * scale
          context.drawImage(image, (canvas.width - w) / 2, (canvas.height - h) / 2, w, h)
          texture.needsUpdate = true
          render()
        }
        image.src = item.image
        if (view === 'both') { laptop.scale.setScalar(.84); laptop.position.x = -.45 }
      }
      if (view !== 'desktop') {
        const phone = new THREE.Group()
        group.add(phone)
        phonePanel(phone, 1.46, 2.96, .16, 0, metal)
        phonePanel(phone, 1.39, 2.88, .035, .092, glass)
        box(phone, .035, .35, .07, -.742, .85, 0, metal, .01)
        box(phone, .035, .23, .07, .742, .85, 0, metal, .01)
        const canvas = document.createElement('canvas')
        canvas.width = 600; canvas.height = 1240
        const c = canvas.getContext('2d')
        c.fillStyle = '#20292e'; c.fillRect(0, 0, 600, 1240)
        c.fillStyle = '#eef1e9'; c.font = 'bold 27px Arial'; c.fillText('TALAVERA', 45, 112)
        c.fillStyle = '#d8c17b'; c.font = '20px Arial'; c.fillText(item.id === 'cclf' ? 'MASTERPLAN' : 'OPERACIÓN', 45, 205)
        c.fillStyle = '#eef1e9'; c.font = '34px Arial'
        const words = item.name.split(' ')
        let line = '', y = 270
        for (const word of words) { if (c.measureText(line + word).width > 500) { c.fillText(line, 45, y); line = ''; y += 45 } line += word + ' ' }
        c.fillText(line, 45, y)
        y += 80
        const labels = item.id === 'cclf' ? ['Disponibilidad', 'Reservas', 'Ventas'] : ['Inmuebles', 'Contratos', 'Pagos', 'Mantenimiento']
        labels.forEach(label => {
          c.fillStyle = '#29343a'; c.fillRect(40, y, 520, 110)
          c.strokeStyle = '#435159'; c.strokeRect(40, y, 520, 110)
          c.fillStyle = '#cbd4d8'; c.font = '27px Arial'; c.fillText(label, 65, y + 65); c.fillText('›', 520, y + 65)
          y += 138
        })
        c.fillStyle = '#9eafb7'; c.font = '16px Arial'; c.fillText('VISTA CONCEPTUAL', 45, 1130)
        screen(phone, 1.3, 2.69, 0, .45, .116, textureFromCanvas(canvas), .13)
        box(phone, .37, .065, .015, 0, 1.7, .13, glass, .02)
        box(phone, .4, .018, .012, 0, -.83, .13, metal, .005)
        phone.rotation.y = .12
        if (view === 'both') { phone.position.set(1.55, .16, 1.65); phone.scale.setScalar(.78) }
      }
      const reduced = matchMedia('(prefers-reduced-motion: reduce)')
      const pointer = { x: 0, y: 0 }
      let frame = 0, timer = 0, lastCheck = 0, visible = true
      function render() { if (!disposed) renderer.render(scene, camera) }
      const resize = () => {
        const { width, height } = host.getBoundingClientRect()
        if (!width || !height) return
        renderer.setSize(width, height)
        camera.aspect = width / height
        camera.position.set(0, 1.65, Math.max(view === 'mobile' ? 6.6 : 7.8, (view === 'mobile' ? 4.2 : 7.3) / camera.aspect))
        camera.lookAt(0, .45, 0)
        camera.updateProjectionMatrix()
        render()
      }
      const move = event => {
        const r = host.getBoundingClientRect()
        pointer.x = (event.clientX - r.left) / r.width - .5
        pointer.y = (event.clientY - r.top) / r.height - .5
      }
      const leave = () => { pointer.x = 0; pointer.y = 0 }
      const tick = time => {
        if (disposed) return
        if (time - lastCheck > 250) { visible = +getComputedStyle(host.closest('.products')).opacity > .01 && !document.hidden; lastCheck = time }
        if (visible) {
          const t = reduced.matches ? 0 : time * .001
          group.position.y = Math.sin(t * .75) * .055
          const targetY = -.22 + (reduced.matches ? 0 : Math.sin(t * .42) * .035 + pointer.x * .18)
          group.rotation.y += (targetY - group.rotation.y) * .07
          group.rotation.x += ((reduced.matches ? 0 : pointer.y * .07) - group.rotation.x) * .07
          render()
          stage.dataset.rendered = 'true'
        }
        if (visible && !reduced.matches) frame = requestAnimationFrame(tick)
        else timer = window.setTimeout(() => tick(performance.now()), 250)
      }
      group.rotation.y = -.22
      const observer = new ResizeObserver(resize)
      observer.observe(host)
      host.addEventListener('pointermove', move)
      host.addEventListener('pointerleave', leave)
      resize()
      tick(performance.now())
      cleanup = () => {
        cancelAnimationFrame(frame); clearTimeout(timer)
        observer.disconnect()
        host.removeEventListener('pointermove', move); host.removeEventListener('pointerleave', leave)
        geometries.forEach(value => value.dispose()); materials.forEach(value => value.dispose()); textures.forEach(value => value.dispose())
        renderer.dispose()
        renderer.domElement.remove()
        delete stage.dataset.rendered
      }
    }).catch(() => { /* The accessible HTML device remains available without WebGL. */ })
    return () => { disposed = true; cleanup() }
  }, [item, view])
  return <div className="device-scene" ref={mount} role="img" aria-label={`Vista tridimensional de ${item.name}`} />
}
