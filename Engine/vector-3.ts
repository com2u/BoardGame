export interface Vector3 {
  x: number,
  y: number,
  z: number
}


export function add(a: Vector3, b: Vector3): Vector3 {
  return {
    x: a.x + b.x,
    y: a.y + b.y,
    z: a.z + b.z
  }
}

export function subtract(a: Vector3, b: Vector3): Vector3 {
  return {
    x: a.x - b.x,
    y: a.y - b.y,
    z: a.z - b.z
  }
}

export function isZero(a: Vector3) {
  return !a.x && !a.y && !a.z
}