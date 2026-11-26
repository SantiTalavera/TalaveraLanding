import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import mapData from './la-plata-osm.json'

export default function HeroVisual() {
  const container = useRef(null)
  useEffect(() => {
    const element = container.current
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let renderer
    try { renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true }) } catch { return undefined }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5))
    renderer.setClearColor(0, 0)
    renderer.shadowMap.enabled = false
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.15
    element.appendChild(renderer.domElement)
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(48, 1, 0.1, 100)
    camera.position.set(6, 8, 13)
    camera.lookAt(0, 3.35, 0)
    scene.add(new THREE.HemisphereLight(0xdce5ec, 0x30343b, 1.5))
    const light = new THREE.DirectionalLight(0xe6eef4, 2)
    light.position.set(-8, 14, 6)
    scene.add(light)
    const city = new THREE.Group()
    scene.add(city)
    const land = new THREE.MeshStandardMaterial({ roughness: 0.95 })
    const street = new THREE.MeshStandardMaterial({ roughness: 1 })
    const building = new THREE.MeshStandardMaterial({ roughness: 0.85 })
    const detail = new THREE.MeshStandardMaterial({ roughness: 0.85 })
    const park = new THREE.MeshStandardMaterial({ roughness: 1 })
    const foliage = new THREE.MeshStandardMaterial({ roughness: 1 })
    const brick = new THREE.MeshStandardMaterial({ roughness: 0.9 })
    const glazing = new THREE.MeshStandardMaterial({ color: '#34434d', roughness: 0.48, metalness: 0.3, side: THREE.DoubleSide })
    const accent = new THREE.MeshStandardMaterial({ roughness: 0.8 })
    const materials = [land, street, building, detail, park, foliage, brick, glazing, accent]
    const geometries = []
    const box = (w, h, d, x, y, z, material, angle = 0) => {
      const geometry = new THREE.BoxGeometry(w, h, d)
      geometries.push(geometry)
      const mesh = new THREE.Mesh(geometry, material)
      mesh.position.set(x, y, z)
      mesh.rotation.y = angle
      city.add(mesh)
      return mesh
    }
    // Mapped streets and building footprints retain the city's urban layout.
    box(60, 0.12, 60, 0, -0.1, 0, land)
    const shape = (coordinates) => {
      const polygon = new THREE.Shape()
      coordinates.forEach(([x, z], i) => i ? polygon.lineTo(x, -z) : polygon.moveTo(x, -z))
      polygon.closePath()
      return polygon
    }
    const surface = (coordinates, material) => {
      const geometry = new THREE.ShapeGeometry(shape(coordinates))
      geometries.push(geometry)
      const mesh = new THREE.Mesh(geometry, material)
      mesh.rotation.x = -Math.PI / 2
      mesh.position.y = 0.02
      city.add(mesh)
    }
    mapData.parks.forEach((coordinates) => surface(coordinates, park))
    mapData.nearbyPlazas.forEach(({ coordinates }) => surface(coordinates, park))
    mapData.buildings.forEach(([coordinates, height]) => {
      const geometry = new THREE.ExtrudeGeometry(shape(coordinates), { depth: height, bevelEnabled: false })
      geometries.push(geometry)
      const isCathedral = Math.hypot(coordinates[0][0] + 1.6936, coordinates[0][1] - 1.6848) < 0.01
      const mesh = new THREE.Mesh(geometry, isCathedral ? brick : building)
      mesh.rotation.x = -Math.PI / 2
      mesh.position.y = 0.025
      city.add(mesh)
    })
    const width = { primary: 0.25, secondary: 0.21, tertiary: 0.18, residential: 0.13, unclassified: 0.13, living_street: 0.1, pedestrian: 0.08, footway: 0.022 }
    // Limit roads to the physical model: OSM ways can extend beyond the query area.
    const clipSegment = ([ax, az], [bx, bz], limit = 8.45) => {
      const dx = bx - ax
      const dz = bz - az
      let start = 0
      let end = 1
      for (const [p, q] of [[-dx, ax + limit], [dx, limit - ax], [-dz, az + limit], [dz, limit - az]]) {
        if (Math.abs(p) < 1e-10) { if (q < 0) return null; continue }
        const t = q / p
        if (p < 0) start = Math.max(start, t)
        else end = Math.min(end, t)
        if (start > end) return null
      }
      return [[ax + start * dx, az + start * dz], [ax + end * dx, az + end * dz]]
    }
    const roadSegments = []
    mapData.roads.forEach(([points, type]) => {
      for (let i = 1; i < points.length; i++) {
        const segment = clipSegment(points[i - 1], points[i])
        if (!segment) continue
        const [[x1, z1], [x2, z2]] = segment
        // The park interior is drawn as a simplified landscape below.
        if (type === 'footway' && Math.hypot((x1 + x2) / 2, (z1 + z2) / 2) < 3.4) continue
        const dx = x2 - x1
        const dz = z2 - z1
        const length = Math.hypot(dx, dz)
        if (length < 0.001) continue
        const roadWidth = type === 'footway' ? 0.04 : (width[type] || 0.1)
        box(length + roadWidth * 0.8, 0.012, roadWidth, (x1 + x2) / 2, type === 'footway' ? 0.034 : 0.01, (z1 + z2) / 2, type === 'footway' ? detail : street, -Math.atan2(dz, dx))
        if (type !== 'footway' && type !== 'pedestrian') roadSegments.push([segment[0], segment[1], roadWidth / 2 + 0.15])
      }
    })
    // Fill unmapped lots with illustrative buildings, keeping real roads and parks clear.
    const inside = (x, z, polygon) => {
      let result = false
      for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        const [xi, zi] = polygon[i]
        const [xj, zj] = polygon[j]
        if ((zi > z) !== (zj > z) && x < (xj - xi) * (z - zi) / (zj - zi) + xi) result = !result
      }
      return result
    }
    const nearRoad = (x, z) => roadSegments.some(([[ax, az], [bx, bz], clearance]) => {
      const dx = bx - ax
      const dz = bz - az
      const length = dx * dx + dz * dz
      const t = length ? Math.max(0, Math.min(1, ((x - ax) * dx + (z - az) * dz) / length)) : 0
      return Math.hypot(x - ax - dx * t, z - az - dz * t) < clearance
    })
    const realBounds = mapData.buildings.map(([points]) => {
      const xs = points.map((p) => p[0])
      const zs = points.map((p) => p[1])
      return [Math.min(...xs) - 0.14, Math.max(...xs) + 0.14, Math.min(...zs) - 0.14, Math.max(...zs) + 0.14, points]
    })
    const nearRealBuilding = (x, z) => realBounds.some(([minX, maxX, minZ, maxZ, points]) => {
      if (x < minX || x > maxX || z < minZ || z > maxZ) return false
      if (inside(x, z, points)) return true
      for (let i = 1; i < points.length; i++) {
        const [ax, az] = points[i - 1]
        const [bx, bz] = points[i]
        const dx = bx - ax
        const dz = bz - az
        const length = dx * dx + dz * dz
        const t = length ? Math.max(0, Math.min(1, ((x - ax) * dx + (z - az) * dz) / length)) : 0
        if (Math.hypot(x - ax - dx * t, z - az - dz * t) < 0.14) return true
      }
      return false
    })
    const nearPark = (x, z, polygon) => {
      if (inside(x, z, polygon)) return true
      for (let i = 1; i < polygon.length; i++) {
        const [ax, az] = polygon[i - 1]
        const [bx, bz] = polygon[i]
        const dx = bx - ax
        const dz = bz - az
        const length = dx * dx + dz * dz
        const t = length ? Math.max(0, Math.min(1, ((x - ax) * dx + (z - az) * dz) / length)) : 0
        if (Math.hypot(x - ax - dx * t, z - az - dz * t) < 0.19) return true
      }
      return false
    }
    const random = (a, b) => {
      const value = Math.sin(a * 127.1 + b * 311.7) * 43758.5453
      return value - Math.floor(value)
    }
    // Plaza Moreno and the nearby public squares remain part of the city.
    const nearbyBounds = mapData.nearbyPlazas.map(({ coordinates }) => {
      const xs = coordinates.map(([x]) => x)
      const zs = coordinates.map(([, z]) => z)
      return [Math.min(...xs) - 0.12, Math.max(...xs) + 0.12, Math.min(...zs) - 0.12, Math.max(...zs) + 0.12]
    })
    const inNearbyPlaza = (x, z) => nearbyBounds.some(([minX, maxX, minZ, maxZ], index) =>
      x >= minX && x <= maxX && z >= minZ && z <= maxZ && nearPark(x, z, mapData.nearbyPlazas[index].coordinates))
    const plazaGroup = new THREE.Group()
    plazaGroup.rotation.y = -Math.PI / 4
    city.add(plazaGroup)
    const plazaPart = (w, h, d, x, y, z, material) => {
      const geometry = new THREE.BoxGeometry(w, h, d)
      geometries.push(geometry)
      const mesh = new THREE.Mesh(geometry, material)
      mesh.position.set(x, y, z)
      plazaGroup.add(mesh)
    }
    plazaPart(3.15, 0.012, 0.3, 0, 0.038, 0, detail)
    plazaPart(0.42, 0.012, 3.15, 0, 0.038, 0, detail)
    for (const side of [-1, 1]) plazaPart(0.16, 0.016, 1.37, 0, 0.052, side * 0.86, park)
    const fountainGeometry = new THREE.CylinderGeometry(0.12, 0.12, 0.018, 24)
    const basinGeometry = new THREE.CylinderGeometry(0.07, 0.07, 0.02, 24)
    geometries.push(fountainGeometry, basinGeometry)
    for (const u of [-0.78, 0.78]) for (const v of [-0.78, 0.78]) {
      plazaPart(0.9, 0.012, 0.07, u, 0.038, v, detail)
      plazaPart(0.07, 0.012, 0.9, u, 0.038, v, detail)
      const walkway = new THREE.Mesh(fountainGeometry, detail)
      walkway.position.set(u, 0.052, v)
      plazaGroup.add(walkway)
      const basin = new THREE.Mesh(basinGeometry, land)
      basin.position.set(u, 0.066, v)
      plazaGroup.add(basin)
    }
    const treeGeometry = new THREE.SphereGeometry(1, 7, 5)
    geometries.push(treeGeometry)
    const treePositions = []
    for (let i = -8; i <= 8; i++) for (let j = -8; j <= 8; j++) {
      const x = i * 0.24 + (random(i, j) - 0.5) * 0.07
      const z = j * 0.24 + (random(j, i + 20) - 0.5) * 0.07
      const u = (x + z) * Math.SQRT1_2
      const v = (z - x) * Math.SQRT1_2
      if (!inside(x, z, mapData.parks[0]) || Math.abs(u) < 0.25 || Math.abs(v) < 0.2 || Math.max(Math.abs(u), Math.abs(v)) < 1.08 || random(i + 20, j) < 0.2) continue
      treePositions.push([x, z, 0.065 + random(i + 4, j + 7) * 0.035])
    }
    mapData.nearbyPlazas.forEach(({ coordinates }, index) => {
      const [minX, maxX, minZ, maxZ] = nearbyBounds[index]
      const cx = (minX + maxX) / 2
      const cz = (minZ + maxZ) / 2
      const length = Math.hypot(maxX - minX, maxZ - minZ) / 2
      for (const rotation of [-Math.PI / 4, Math.PI / 4]) {
        for (let t = -length; t < length; t += 0.08) {
          const x = cx + Math.cos(rotation) * t
          const z = cz - Math.sin(rotation) * t
          if (inside(x, z, coordinates)) box(0.09, 0.012, 0.055, x, 0.035, z, detail, rotation)
        }
      }
      for (let x = minX + 0.14; x < maxX - 0.1; x += 0.24) for (let z = minZ + 0.14; z < maxZ - 0.1; z += 0.24) {
        if (inside(x, z, coordinates) && random(x, z) > 0.35) treePositions.push([x, z, 0.07 + random(z, x) * 0.035])
      }
    })
    const trees = new THREE.InstancedMesh(treeGeometry, foliage, treePositions.length)
    const treeTransform = new THREE.Object3D()
    treePositions.forEach(([x, z, size], i) => {
      treeTransform.position.set(x, 0.05 + size * 0.8, z)
      treeTransform.scale.set(size, size * 1.1, size)
      treeTransform.updateMatrix()
      trees.setMatrixAt(i, treeTransform.matrix)
    })
    trees.instanceMatrix.needsUpdate = true
    city.add(trees)
    const heightScale = (x, z) => {
      const distance = Math.hypot(x, z)
      return 1 - Math.min(1, Math.max(0, (distance - 3) / 17)) * 0.72
    }
    const generated = []
    // Rotate the sampling grid to follow the local street orientation.
    const angle = Math.PI / 4
    for (let i = -39; i <= 39; i++) {
      for (let j = -39; j <= 39; j++) {
        const u = i * 0.31
        const v = j * 0.31
        const x = u * Math.cos(angle) - v * Math.sin(angle)
        const z = u * Math.sin(angle) + v * Math.cos(angle)
        if (Math.abs(x) > 8.25 || Math.abs(z) > 8.25 || nearRoad(x, z)) continue
        if ((Math.abs(x + 1.6) < 0.8 && Math.abs(z - 2) < 0.8)
          || (Math.abs(x - 1.73) < 0.9 && Math.abs(z + 1.88) < 0.9)) continue
        if (mapData.parks.some((polygon) => nearPark(x, z, polygon)) || inNearbyPlaza(x, z)) continue
        if (nearRealBuilding(x, z)) continue
        if (random(i, j) < 0.05) continue
        const tall = random(i + 17, j + 3)
        const height = (tall > 0.86 ? 0.5 + tall * 0.6 : 0.1 + tall * 0.28) * heightScale(x, z)
        generated.push([x, z, 0.17 + random(i, j + 9) * 0.1, height, 0.17 + random(i + 8, j) * 0.1])
      }
    }
    const lotGeometry = new THREE.BoxGeometry(1, 1, 1)
    geometries.push(lotGeometry)
    const lots = new THREE.InstancedMesh(lotGeometry, building, generated.length)
    const matrix = new THREE.Object3D()
    generated.forEach(([x, z, w, h, d], i) => {
      matrix.position.set(x, h / 2 + 0.025, z)
      matrix.rotation.set(0, -angle, 0)
      matrix.scale.set(w, h, d)
      matrix.updateMatrix()
      lots.setMatrixAt(i, matrix.matrix)
      const colors = ['#a9b0b5', '#8e979d', '#b5bdc1', '#7d878d', '#c3c9cb', '#98a1a6', '#aab4bb', '#858f98']
      lots.setColorAt(i, new THREE.Color(colors[Math.floor(random(x + 14, z) * colors.length)]))
    })
    lots.instanceMatrix.needsUpdate = true
    city.add(lots)

    // Extend the skyline beyond the mapped center without changing its real street data.
    const outskirts = []
    for (let i = -65; i <= 65; i++) {
      for (let j = -65; j <= 65; j++) {
        const u = i * 0.39
        const v = j * 0.39
        const x = u * Math.cos(angle) - v * Math.sin(angle)
        const z = u * Math.sin(angle) + v * Math.cos(angle)
        if (Math.abs(x) < 8.3 && Math.abs(z) < 8.3) continue
        if (Math.abs(x) > 27 || Math.abs(z) > 27 || inNearbyPlaza(x, z)) continue
        // Regular gaps suggest streets in the illustrative surrounding city.
        if (Math.abs(i % 7) === 0 || Math.abs(j % 7) === 0 || random(i, j) < 0.14) continue
        const r = random(i + 31, j + 7)
        const variation = random(i + 63, j - 19)
        const h = (r > 0.77 ? 0.65 + variation * 1.15 : 0.15 + variation * 0.65) * heightScale(x, z)
        outskirts.push([x, z, 0.18 + random(i, j + 21) * 0.1, h, 0.18 + random(i + 16, j) * 0.1])
      }
    }
    const distantLots = new THREE.InstancedMesh(lotGeometry, building, outskirts.length)
    outskirts.forEach(([x, z, w, h, d], i) => {
      matrix.position.set(x, h / 2 + 0.025, z)
      matrix.rotation.set(0, -angle, 0)
      matrix.scale.set(w, h, d)
      matrix.updateMatrix()
      distantLots.setMatrixAt(i, matrix.matrix)
      const colors = ['#a9b0b5', '#8e979d', '#b5bdc1', '#7d878d', '#c3c9cb', '#98a1a6', '#aab4bb', '#858f98']
      distantLots.setColorAt(i, new THREE.Color(colors[Math.floor(random(x + 14, z) * colors.length)]))
    })
    distantLots.instanceMatrix.needsUpdate = true
    city.add(distantLots)

    // Setbacks and recessed crowns create a more contemporary skyline.
    const crowns = [...generated, ...outskirts].filter(([x, z, , h]) => h > 0.32 && random(x + 21, z - 7) > 0.35)
    const crownMesh = new THREE.InstancedMesh(lotGeometry, building, crowns.length)
    const roofMesh = new THREE.InstancedMesh(lotGeometry, glazing, crowns.length)
    crowns.forEach(([x, z, w, h, d], i) => {
      const variant = random(x + 5, z + 11)
      const crownHeight = Math.min(0.24, h * (0.16 + variant * 0.16))
      const offset = (variant - 0.5) * w * 0.25
      matrix.position.set(x + offset * Math.cos(angle), h + crownHeight / 2 + 0.025, z + offset * Math.sin(angle))
      matrix.rotation.set(0, -angle, 0)
      matrix.scale.set(w * (0.55 + variant * 0.2), crownHeight, d * 0.7)
      matrix.updateMatrix()
      crownMesh.setMatrixAt(i, matrix.matrix)
      matrix.position.y = h + crownHeight + 0.028
      matrix.scale.set(w * 0.5, 0.012, d * 0.53)
      matrix.updateMatrix()
      roofMesh.setMatrixAt(i, matrix.matrix)
    })
    crownMesh.instanceMatrix.needsUpdate = true
    roofMesh.instanceMatrix.needsUpdate = true
    city.add(crownMesh, roofMesh)

    // Illuminated windows give the urban skyline a futuristic nighttime character.
    const windows = []
    const rackLights = []
    const mappedRacks = mapData.buildings.flatMap(([points, h]) => {
      if (Math.hypot(points[0][0] + 1.6936, points[0][1] - 1.6848) < 0.01) return []
      const xs = points.map(([x]) => x)
      const zs = points.map(([, z]) => z)
      const minX = Math.min(...xs), maxX = Math.max(...xs)
      const minZ = Math.min(...zs), maxZ = Math.max(...zs)
      return [[(minX + maxX) / 2, (minZ + maxZ) / 2, Math.min(1.2, (maxX - minX) * 0.7), h, Math.min(1.2, (maxZ - minZ) * 0.7)]]
    })
    ;[...generated, ...outskirts, ...mappedRacks].forEach(([x, z, w, h, d]) => {
      if (w < 0.03 || d < 0.03) return
      const floors = Math.max(1, Math.min(10, Math.floor(h / 0.11)))
      for (let floor = 0; floor < floors; floor++) {
        const localZ = d / 2 + 0.003
        const y = 0.07 + floor * 0.11
        const localXSide = w / 2 + 0.003
        for (const side of [-1, 1]) {
          const localX = side * w * 0.23
          const sideZ = side * d * 0.23
          const front = [x + localX * Math.cos(angle) - localZ * Math.sin(angle), y, z + localX * Math.sin(angle) + localZ * Math.cos(angle)]
          const flank = [x + localXSide * Math.cos(angle) - sideZ * Math.sin(angle), y, z + localXSide * Math.sin(angle) + sideZ * Math.cos(angle)]
          windows.push([...front, w * 0.18, -angle], [...flank, d * 0.18, -angle + Math.PI / 2])
          if (random(x + floor + side, z) > 0.86) rackLights.push([...front, -angle], [...flank, -angle + Math.PI / 2])
        }
      }
    })
    const windowGeometry = new THREE.PlaneGeometry(1, 0.055)
    geometries.push(windowGeometry)
    const windowMesh = new THREE.InstancedMesh(windowGeometry, glazing, windows.length)
    windows.forEach(([x, y, z, w, rotation], i) => {
      matrix.position.set(x, y, z)
      matrix.rotation.set(0, rotation, 0)
      matrix.scale.set(w * 0.9, 1, 1)
      matrix.updateMatrix()
      windowMesh.setMatrixAt(i, matrix.matrix)
    })
    windowMesh.instanceMatrix.needsUpdate = true
    city.add(windowMesh)
    const ledGeometry = new THREE.PlaneGeometry(0.026, 0.04)
    geometries.push(ledGeometry)
    const ledMaterial = new THREE.MeshBasicMaterial({ color: '#ffe08a', side: THREE.DoubleSide, toneMapped: false })
    materials.push(ledMaterial)
    const leds = new THREE.InstancedMesh(ledGeometry, ledMaterial, rackLights.length)
    rackLights.forEach(([x, y, z, rotation], i) => {
      matrix.position.set(x, y, z)
      matrix.rotation.set(0, rotation, 0)
      matrix.scale.set(1, 1, 1)
      matrix.updateMatrix()
      leds.setMatrixAt(i, matrix.matrix)
    })
    leds.instanceMatrix.needsUpdate = true
    city.add(leds)

    // Recognizable urban landmarks, kept within the futuristic palette.
    const cathedral = new THREE.Group()
    cathedral.position.set(-2.03, 0.025, 2.32)
    cathedral.rotation.y = -angle
    city.add(cathedral)
    const part = (group, w, h, d, x, y, z, material = building) => {
      const geometry = new THREE.BoxGeometry(w, h, d)
      geometries.push(geometry)
      const mesh = new THREE.Mesh(geometry, material)
      mesh.position.set(x, y, z)
      group.add(mesh)
    }
    const spireGeometry = new THREE.ConeGeometry(0.105, 0.38, 4)
    geometries.push(spireGeometry)
    const spire = (group, x, y, z) => {
      const mesh = new THREE.Mesh(spireGeometry, brick)
      mesh.position.set(x, y, z)
      mesh.rotation.y = Math.PI / 4
      group.add(mesh)
    }
    part(cathedral, 0.58, 0.25, 1.05, 0, 0.3, 0.08, brick)
    const roofShape = new THREE.Shape()
    roofShape.moveTo(-0.31, 0)
    roofShape.lineTo(0, 0.22)
    roofShape.lineTo(0.31, 0)
    roofShape.closePath()
    const roofGeometry = new THREE.ExtrudeGeometry(roofShape, { depth: 1.05, bevelEnabled: false })
    geometries.push(roofGeometry)
    const roof = new THREE.Mesh(roofGeometry, detail)
    roof.position.set(0, 0.43, -0.45)
    cathedral.add(roof)
    part(cathedral, 0.86, 0.18, 0.3, 0, 0.28, 0.18, brick)
    for (const side of [-1, 1]) {
      part(cathedral, 0.25, 0.8, 0.23, side * 0.27, 0.42, -0.48, brick)
      part(cathedral, 0.2, 0.27, 0.19, side * 0.27, 0.94, -0.48, brick)
      part(cathedral, 0.13, 0.23, 0.13, side * 0.27, 1.18, -0.48, brick)
      spire(cathedral, side * 0.27, 1.48, -0.48)
      part(cathedral, 0.018, 0.1, 0.018, side * 0.27, 1.72, -0.48, detail)
      part(cathedral, 0.075, 0.018, 0.018, side * 0.27, 1.74, -0.48, detail)
      for (const z of [-0.2, 0.05, 0.3, 0.55]) {
        part(cathedral, 0.07, 0.33, 0.07, side * 0.36, 0.22, z, brick)
      }
    }
    part(cathedral, 0.3, 0.52, 0.12, 0, 0.28, -0.5, brick)
    const cityHall = new THREE.Group()
    cityHall.position.set(1.73, 0.025, -1.88)
    cityHall.rotation.y = -angle
    city.add(cityHall)
    part(cityHall, 1.36, 0.28, 0.42, 0, 0.14, 0)
    part(cityHall, 0.42, 0.34, 0.62, 0, 0.17, 0.05)
    part(cityHall, 1.42, 0.035, 0.47, 0, 0.3, 0, detail)
    for (const side of [-1, 1]) {
      part(cityHall, 0.22, 0.4, 0.48, side * 0.61, 0.2, 0)
      part(cityHall, 0.24, 0.035, 0.49, side * 0.61, 0.41, 0, detail)
    }
    part(cityHall, 0.24, 0.68, 0.24, 0, 0.43, 0.18)
    part(cityHall, 0.28, 0.035, 0.28, 0, 0.78, 0.18, detail)
    part(cityHall, 0.18, 0.16, 0.18, 0, 0.87, 0.18)
    const hallRoofGeometry = new THREE.ConeGeometry(0.18, 0.22, 4)
    geometries.push(hallRoofGeometry)
    const hallRoof = new THREE.Mesh(hallRoofGeometry, detail)
    hallRoof.position.set(0, 1.06, 0.18)
    hallRoof.rotation.y = Math.PI / 4
    cityHall.add(hallRoof)

    // Brief light pulses move along mapped roads to evoke data travelling through a network.
    const mappedRoutes = mapData.roads.flatMap(([points, type, name]) => {
      if (type === 'footway' || type === 'pedestrian') return []
      const segments = []
      let total = 0
      for (let i = 1; i < points.length; i++) {
        const clipped = clipSegment(points[i - 1], points[i])
        if (!clipped) continue
        const [[ax, az], [bx, bz]] = clipped
        const length = Math.hypot(bx - ax, bz - az)
        if (length < 0.01) continue
        segments.push({ ax, az, bx, bz, length, start: total })
        total += length
      }
      return total > 0.3 ? [{ segments, total, name }] : []
    })
    // A street may be split into multiple OSM ways. Connect matching endpoints
    // and allocate only one pulse to the longest connected part of each name.
    const namedRoutes = new Map()
    const pulseRoutes = []
    mappedRoutes.forEach((route) => {
      if (!route.name) { pulseRoutes.push(route); return }
      const key = route.name.trim().toLocaleLowerCase('es')
      if (!namedRoutes.has(key)) namedRoutes.set(key, [])
      namedRoutes.get(key).push(route)
    })
    const reverseSegments = (segments) => [...segments].reverse().map(({ ax, az, bx, bz, length }) => ({
      ax: bx, az: bz, bx: ax, bz: az, length,
    }))
    namedRoutes.forEach((routes) => {
      const remaining = [...routes].sort((a, b) => b.total - a.total)
      const chain = remaining.shift().segments.map(({ ax, az, bx, bz, length }) => ({ ax, az, bx, bz, length }))
      let connected = true
      while (connected && remaining.length) {
        connected = false
        const first = chain[0]
        const last = chain[chain.length - 1]
        for (let index = 0; index < remaining.length; index++) {
          const candidate = remaining[index].segments
          const begin = candidate[0]
          const end = candidate[candidate.length - 1]
          const near = (x1, z1, x2, z2) => Math.hypot(x1 - x2, z1 - z2) < 0.05
          if (near(last.bx, last.bz, begin.ax, begin.az)) chain.push(...candidate)
          else if (near(last.bx, last.bz, end.bx, end.bz)) chain.push(...reverseSegments(candidate))
          else if (near(first.ax, first.az, end.bx, end.bz)) chain.unshift(...candidate)
          else if (near(first.ax, first.az, begin.ax, begin.az)) chain.unshift(...reverseSegments(candidate))
          else continue
          remaining.splice(index, 1)
          connected = true
          break
        }
      }
      let total = 0
      const segments = chain.map((segment) => {
        const part = { ...segment, start: total }
        total += segment.length
        return part
      })
      pulseRoutes.push({ segments, total })
    })
    const pulseGeometry = new THREE.PlaneGeometry(1, 1)
    pulseGeometry.rotateX(-Math.PI / 2)
    geometries.push(pulseGeometry)
    const trailMaterial = new THREE.ShaderMaterial({
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      side: THREE.DoubleSide,
      toneMapped: false,
      vertexShader: `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * instanceMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        void main() {
          float across = abs(vUv.y - 0.5) * 2.0;
          float fade = pow(vUv.x, 1.0) * (1.0 - smoothstep(0.88, 1.0, vUv.x));
          float glow = exp(-across * across * 5.0);
          float core = exp(-across * across * 45.0) * pow(vUv.x, 5.0);
          vec3 color = mix(vec3(1.0, 0.77, 0.23), vec3(1.0, 0.95, 0.74), core);
          gl_FragColor = vec4(color, min(1.0, fade * (glow * 0.58 + core * 0.9)));
        }
      `,
    })
    materials.push(trailMaterial)
    const pulseCount = pulseRoutes.length
    const trails = new THREE.InstancedMesh(pulseGeometry, trailMaterial, pulseCount)
    trails.frustumCulled = false
    city.add(trails)
    const pulseTransform = new THREE.Object3D()
    const updatePulses = (time) => {
      for (let i = 0; i < pulseCount; i++) {
        const route = pulseRoutes[i]
        const travel = (i * 0.618 * route.total + time * (0.0045 + (i % 5) * 0.0007)) % route.total
        const segment = route.segments.find((part) => travel < part.start + part.length) || route.segments[route.segments.length - 1]
        const { ax, az, bx, bz, length, start } = segment
        const dx = bx - ax
        const dz = bz - az
        const phase = (travel - start) / length
        const trailLength = Math.min(length * 0.95, 0.8)
        const offset = trailLength * 0.38 / length
        pulseTransform.position.set(ax + dx * (phase - offset), 0.04, az + dz * (phase - offset))
        pulseTransform.rotation.set(0, -Math.atan2(dz, dx), 0)
        pulseTransform.scale.set(trailLength, 1, 0.26)
        pulseTransform.updateMatrix()
        trails.setMatrixAt(i, pulseTransform.matrix)
      }
      trails.instanceMatrix.needsUpdate = true
    }
    const render = () => renderer.render(scene, camera)
    const updatePalette = () => {
      land.color.set('#343a3e')
      street.color.set('#1b2227')
      building.color.set('#c0c8cc')
      detail.color.set('#65747a')
      park.color.set('#35494b')
      foliage.color.set('#60767a')
      brick.color.set('#b4bfc4')
      accent.color.set(getComputedStyle(element).getPropertyValue('--accent-primary').trim() || '#f2c94c')
      render()
    }
    const themeObserver = new MutationObserver(updatePalette)
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme', 'class', 'style'] })
    const resize = () => {
      const { clientWidth: width, clientHeight: height } = element
      if (!width || !height) return
      renderer.setSize(width, height, false)
      const aspect = width / height
      camera.aspect = aspect
      camera.fov = aspect < 0.8 ? 58 : 48
      camera.updateProjectionMatrix()
      render()
    }
    const observer = new ResizeObserver(resize)
    observer.observe(element)
    let frame
    let target = 0
    const onPointerMove = (event) => {
      if (event.pointerType === 'mouse' && !reducedMotion.matches) target = (event.clientX / window.innerWidth - 0.5) * 0.1
    }
    const onPointerLeave = () => { target = 0 }
    window.addEventListener('pointermove', onPointerMove)
    window.addEventListener('pointerleave', onPointerLeave)
    const animate = (time) => {
      if (!reducedMotion.matches) {
        city.rotation.y += (target + Math.sin(time * 0.00015) * 0.02 - city.rotation.y) * 0.025
        updatePulses(time)
        render()
      }
      frame = requestAnimationFrame(animate)
    }
    updatePulses(0)
    updatePalette()
    resize()
    frame = requestAnimationFrame(animate)
    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      themeObserver.disconnect()
      window.removeEventListener('pointermove', onPointerMove)
      window.removeEventListener('pointerleave', onPointerLeave)
      geometries.forEach((geometry) => geometry.dispose())
      materials.forEach((material) => material.dispose())
      renderer.dispose()
      renderer.domElement.remove()
    }
  }, [])
  return <div ref={container} className="hero__visual" aria-hidden="true" />
}
