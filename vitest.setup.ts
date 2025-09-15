import '@testing-library/jest-dom/vitest'
import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'

afterEach(() => cleanup())

// --- Mock IntersectionObserver for jsdom ---
if (typeof global.IntersectionObserver === 'undefined') {
  class IO {
    constructor() {}
    observe() {}
    unobserve() {}
    disconnect() {}
    takeRecords() { return [] }
  }
  // @ts-ignore
  global.IntersectionObserver = IO
}
