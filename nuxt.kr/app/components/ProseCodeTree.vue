<script setup lang="ts">
import { Fragment, defineComponent, h, ref, useAttrs, useSlots, watch, type PropType, type VNode } from 'vue'
import { ProseCodeIcon, UIcon } from '#components'

defineOptions({ inheritAttrs: false })

type FlatItem = {
  label: string
  icon?: string
  component?: VNode
}

type TreeNode = {
  label: string
  path: string
  icon?: string
  component?: VNode
  children?: TreeNode[]
}

const props = defineProps({
  items: {
    type: Array as PropType<FlatItem[]>,
    required: false
  },
  modelValue: {
    type: String,
    required: false
  },
  defaultValue: {
    type: String,
    required: false
  },
  expandAll: {
    type: Boolean,
    required: false
  },
  class: {
    type: null,
    required: false
  },
  ui: {
    type: Object as PropType<Record<string, string>>,
    required: false
  }
})

const emit = defineEmits<{
  'update:modelValue': [value: string | undefined]
}>()

const attrs = useAttrs()
const slots = useSlots()
const appConfig = useAppConfig()

const defaultUi = {
  root: 'relative lg:h-[450px] my-5 grid lg:grid-cols-3 border border-muted rounded-md',
  list: 'isolate relative p-2 border-b lg:border-b-0 lg:border-e border-muted overflow-y-auto',
  item: '',
  listWithChildren: 'ms-4.5 border-s border-default',
  itemWithChildren: 'ps-1.5 -ms-px',
  link: 'relative group w-full px-2.5 py-1.5 flex items-center gap-1.5 text-sm rounded-md focus:outline-none focus-visible:outline-none',
  linkActive: 'text-highlighted bg-elevated',
  linkInactive: 'hover:text-highlighted hover:bg-elevated/50 transition-colors',
  linkLeadingIcon: 'size-4 shrink-0',
  linkLabel: 'truncate',
  linkTrailing: 'ms-auto inline-flex gap-1.5 items-center',
  linkTrailingIcon: 'size-5 transform transition-transform duration-200 shrink-0',
  content: 'overflow-hidden lg:col-span-2 flex flex-col [&>div]:my-0 [&>div]:flex-1 [&>div]:flex [&>div]:flex-col [&>div>div]:border-0 [&>div>pre]:border-b-0 [&>div>pre]:border-s-0 [&>div>pre]:border-e-0 [&>div>pre]:rounded-l-none [&>div>pre]:flex-1 [&>div]:overflow-y-auto'
} as const

const ui = {
  ...defaultUi,
  ...props.ui
}

const folderIcon = appConfig.ui.icons.folder
const folderOpenIcon = appConfig.ui.icons.folderOpen
const chevronIcon = appConfig.ui.icons.chevronDown

const selectedPath = ref(props.modelValue ?? props.defaultValue)
const expandedPaths = ref(getExpandedPaths(props.modelValue ?? props.defaultValue))

watch(
  () => props.modelValue,
  (value) => {
    if (value === undefined || value === selectedPath.value) {
      return
    }

    selectedPath.value = value
    ensureExpanded(value)
  }
)

watch(
  () => props.defaultValue,
  (value) => {
    if (props.modelValue !== undefined || selectedPath.value) {
      return
    }

    selectedPath.value = value
    ensureExpanded(value)
  }
)

function normalizeSlot(node: VNode | VNode[] | null | undefined, index = 0): FlatItem[] {
  if (!node) {
    return []
  }

  if (Array.isArray(node)) {
    return node.flatMap((child, childIndex) => normalizeSlot(child, childIndex))
  }

  if (typeof node.type === 'symbol') {
    return normalizeSlot(Array.isArray(node.children) ? node.children as VNode[] : [], index)
  }

  return [{
    label: (node.props?.filename || node.props?.label || `${index}`) as string,
    icon: node.props?.icon as string | undefined,
    component: node
  }]
}

function buildTree(flatItems: FlatItem[]): TreeNode[] {
  const map = new Map<string, TreeNode>()
  const root: TreeNode[] = []

  for (const item of flatItems) {
    const parts = item.label.split('/')
    let currentPath = ''

    parts.forEach((part, index) => {
      currentPath = currentPath ? `${currentPath}/${part}` : part

      if (!map.has(currentPath)) {
        const isLeaf = index === parts.length - 1
        const node: TreeNode = {
          label: part,
          path: currentPath,
          ...(isLeaf ? { icon: item.icon, component: item.component } : { children: [] })
        }

        map.set(currentPath, node)

        if (index === 0) {
          root.push(node)
        } else {
          const parentPath = parts.slice(0, index).join('/')
          map.get(parentPath)?.children?.push(node)
        }
      }
    })
  }

  return sortTree(root)
}

function sortTree(nodes: TreeNode[]): TreeNode[] {
  return nodes
    .sort((a, b) => {
      const aIsFolder = Boolean(a.children?.length)
      const bIsFolder = Boolean(b.children?.length)

      if (aIsFolder === bIsFolder) {
        return a.label.localeCompare(b.label)
      }

      return bIsFolder ? 1 : -1
    })
    .map(node => ({
      ...node,
      children: node.children ? sortTree(node.children) : undefined
    }))
}

function getExpandedPaths(path?: string) {
  if (!path) {
    return []
  }

  const parts = path.split('/')
  return parts.slice(0, -1).map((_, index) => parts.slice(0, index + 1).join('/'))
}

function getAllExpandedPaths(flatItems: FlatItem[]) {
  const paths = new Set<string>()

  for (const item of flatItems) {
    for (const path of getExpandedPaths(item.label)) {
      paths.add(path)
    }
  }

  return [...paths]
}

function ensureExpanded(path?: string) {
  if (!path) {
    return
  }

  for (const expandedPath of getExpandedPaths(path)) {
    if (!expandedPaths.value.includes(expandedPath)) {
      expandedPaths.value.push(expandedPath)
    }
  }
}

function toggleExpanded(path: string) {
  if (expandedPaths.value.includes(path)) {
    expandedPaths.value = expandedPaths.value.filter(item => item !== path)
    return
  }

  expandedPaths.value = [...expandedPaths.value, path]
}

function updateSelectedPath(path?: string) {
  selectedPath.value = path
  ensureExpanded(path)
  emit('update:modelValue', path)
}

function getRenderState() {
  const flatItems = props.items ?? normalizeSlot(slots.default?.())
  const fallbackPath = props.defaultValue ?? flatItems[0]?.label
  const currentPath = props.modelValue ?? selectedPath.value ?? fallbackPath
  const tree = buildTree(flatItems)
  const selectedItem = flatItems.find(item => item.label === currentPath) ?? flatItems[0]

  return {
    expandedPaths: props.expandAll ? getAllExpandedPaths(flatItems) : expandedPaths.value,
    currentPath: selectedItem?.label,
    selectedItem,
    tree
  }
}

const CodeTreeNodes = defineComponent({
  name: 'CodeTreeNodes',
  props: {
    nodes: {
      type: Array as PropType<TreeNode[]>,
      required: true
    },
    level: {
      type: Number,
      required: true
    },
    selectedPath: {
      type: String,
      required: false
    },
    expandedPaths: {
      type: Array as PropType<string[]>,
      required: true
    }
  },
  emits: ['select', 'toggle'],
  setup(componentProps, { emit }) {
    return () => h(
      Fragment,
      componentProps.nodes.map((node) => {
        const isFolder = Boolean(node.children?.length)
        const isExpanded = componentProps.expandedPaths.includes(node.path)
        const isActive = componentProps.selectedPath === node.path

        return h('li', {
          key: node.path,
          role: 'presentation',
          class: isFolder ? ui.itemWithChildren : ui.item
        }, [
          h('button', {
            type: 'button',
            class: [
              ui.link,
              isActive ? ui.linkActive : ui.linkInactive
            ],
            onClick: () => {
              if (isFolder) {
                emit('toggle', node.path)
                return
              }

              emit('select', node.path)
            }
          }, [
            isFolder
              ? h(UIcon, {
                  name: isExpanded ? folderOpenIcon : folderIcon,
                  class: ui.linkLeadingIcon
                })
              : h(ProseCodeIcon, {
                  filename: node.label,
                  class: ui.linkLeadingIcon
                }),
            h('span', { class: ui.linkLabel }, node.label),
            isFolder
              ? h('span', { class: ui.linkTrailing }, [
                  h(UIcon, {
                    name: chevronIcon,
                    class: [
                      ui.linkTrailingIcon,
                      isExpanded ? 'rotate-180' : ''
                    ]
                  })
                ])
              : null
          ]),
          isFolder && isExpanded
            ? h('ul', {
                role: 'group',
                class: ui.listWithChildren
              }, [
                h(CodeTreeNodes, {
                  nodes: node.children ?? [],
                  level: componentProps.level + 1,
                  selectedPath: componentProps.selectedPath,
                  expandedPaths: componentProps.expandedPaths,
                  onSelect: (path: string) => emit('select', path),
                  onToggle: (path: string) => emit('toggle', path)
                })
              ])
            : null
        ])
      })
    )
  }
})
</script>

<template>
  <div
    v-bind="attrs"
    :class="[ui.root, attrs.class, props.class]"
  >
    <template v-for="state in [getRenderState()]" :key="state.currentPath">
      <ul :class="ui.list">
        <CodeTreeNodes
          :nodes="state.tree"
          :level="1"
          :selected-path="state.currentPath"
          :expanded-paths="state.expandedPaths"
          @select="updateSelectedPath"
          @toggle="toggleExpanded"
        />
      </ul>

      <div :class="ui.content">
        <component :is="state.selectedItem?.component" v-if="state.selectedItem?.component" />
      </div>
    </template>
  </div>
</template>
