import { tagsfield } from '@/collections/fields/tagsfield'
import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
    tagsfield,
  ],
   upload: {
    staticDir: 'media',
    mimeTypes: ['image/*'],
  },
}
