import { describe, expect, it } from 'vitest'
import { parseMarkdown } from '@nuxtjs/mdc/runtime'
import remarkCustomHeadingId from '../../helpers/remark-custom-heading-id.mjs'

async function parse(content: string) {
  return parseMarkdown(content, {
    remark: {
      plugins: {
        customHeadingId: {
          instance: remarkCustomHeadingId
        }
      }
    }
  })
}

describe('remark-custom-heading-id', () => {
  it('uses custom ids for plain text headings', async () => {
    const parsed = await parse('## 단위 테스트 %{#unit-testing}%')
    const heading = parsed.body.children[0]

    expect(heading?.props?.id).toBe('unit-testing')
    expect(parsed.toc?.links).toEqual([
      {
        id: 'unit-testing',
        depth: 2,
        text: '단위 테스트'
      }
    ])
  })

  it('preserves inline markup while trimming custom ids', async () => {
    const parsed = await parse('### `useFetch` %{#usefetch}%')
    const heading = parsed.body.children[0]

    expect(heading?.props?.id).toBe('usefetch')
    expect(heading?.children).toHaveLength(1)
    expect(parsed.toc?.links).toEqual([
      {
        id: 'usefetch',
        depth: 3,
        text: 'useFetch'
      }
    ])
  })

  it('keeps default slug generation when no custom id is provided', async () => {
    const parsed = await parse('## Unit Testing')
    const heading = parsed.body.children[0]

    expect(heading?.props?.id).toBe('unit-testing')
    expect(parsed.toc?.links).toEqual([
      {
        id: 'unit-testing',
        depth: 2,
        text: 'Unit Testing'
      }
    ])
  })
})
