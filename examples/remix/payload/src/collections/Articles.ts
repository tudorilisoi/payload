import { editorProps } from '@/lexical/editorProps'
import { tagsfield } from '@/tagsfield'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { CollectionConfig } from 'payload'

export const Articles: CollectionConfig = {
  slug: 'posts',
  labels: {
    singular: {
      en: 'Article',
      ro: 'Articol',
    },
    plural: {
      en: 'Articles',
      ro: 'Articole',
    },
  },
  admin: {
    // group: {
    //   en: 'Articles',
    //   ro: 'Articole',
    // },
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: {
        en: 'Title',
        ro: 'Titlu',
      },
    },
    {
      name: 'content',
      type: 'richText',
      required: true,
      editor: lexicalEditor(editorProps),
      label: {
        en: 'Content',
        ro: 'Conținut',
      },
    },

    tagsfield,
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media', // Name of the Media collection
      required: false,
      hasMany: true, // Allows multiple uploads
    },
  ],
}
