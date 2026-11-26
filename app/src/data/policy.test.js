import { test } from 'node:test'
import assert from 'node:assert/strict'
import { selectClients, selectPortfolio, hasStoryStage, isSafeDestination } from './policy.js'

test('published external destinations require valid HTTPS URLs without credentials', () => {
  for (const url of ['javascript:alert(1)', '#demo/test', 'https://user:pass@example.com', 'http://example.com', 'not-a-url', null]) assert.equal(isSafeDestination(url), false)
  assert.equal(isSafeDestination('https://example.com/project'), true)
})

test('production requires explicit authorization and excludes demo destinations', () => {
  const clients = [{ logo: 'logo', url: '#demo/example', authorized: true }, { logo: 'logo', url: 'https://example.com' }, { logo: 'logo', url: 'https://example.com', authorized: true }]
  assert.deepEqual(selectClients(clients, false), [clients[2]])
  const items = [{ visibility: 'demo', authorized: true }, { visibility: 'public' }, { visibility: 'public', authorized: true }]
  assert.deepEqual(selectPortfolio(items, false), [items[2]])
  assert.deepEqual(selectPortfolio(items, true), [items[0], items[2]])
})

test('story uses normal flow when either optional section is missing', () => {
  for (const [clients, portfolio, expected] of [[[], [], false], [[1], [], false], [[], [1], false], [[1], [1], true]]) {
    assert.equal(hasStoryStage(clients, portfolio), expected)
  }
})
