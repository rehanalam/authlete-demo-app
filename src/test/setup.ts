import "@testing-library/jest-dom/vitest";

class MockResizeObserver {
  observe() {
    // noop
  }
  unobserve() {
    // noop
  }
  disconnect() {
    // noop
  }
}

const globalWithResizeObserver = globalThis as typeof globalThis & {
  ResizeObserver?: typeof MockResizeObserver;
};

if (typeof globalWithResizeObserver.ResizeObserver === "undefined") {
  globalWithResizeObserver.ResizeObserver = MockResizeObserver;
}
