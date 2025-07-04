import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { FixedToolbarFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { en } from '@payloadcms/translations/languages/en'
import { ro } from '@payloadcms/translations/languages/ro'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const editorProps = {
  features: ({ defaultFeatures }) => [...defaultFeatures, FixedToolbarFeature()],
}

export default buildConfig({
  i18n: {
    // @ts-ignore
    supportedLanguages: { en, ro },
  },
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Users,
    Media,
    {
      slug: 'tags',
      labels: {
        singular: {
          en: 'Tag',
          ro: 'Etichetă',
        },
        plural: {
          en: 'Tags',
          ro: 'Etichete',
        },
      },
      admin: {
        // group: {
        //   en: 'Articles',
        //   ro: 'Articole',
        // },
        useAsTitle: 'tag',
      },
      fields: [
        {
          name: 'tag',
          type: 'text',
          required: true,
          unique: true,
          index: true,
          label: {
            en: 'Tag',
            ro: 'Etichetă',
          },
          hooks: {
            beforeValidate: [
              ({ value }) => {
                // Trim whitespace and convert to lowercase
                return value.trim().toLowerCase()
              },
            ],
          },
        },
      ],
    },
    {
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

        {
          name: 'tags',
          type: 'relationship',
          relationTo: 'tags',
          hasMany: true,
          label: {
            en: 'Tags',
            ro: 'Etichete',
          },
          admin: {
            sortOptions: 'tag',
          },
        },
        {
          name: 'media',
          type: 'upload',
          relationTo: 'media', // Name of the Media collection
          required: false,
          hasMany: true, // Allows multiple uploads
        },
      ],
    },
  ],
  editor: lexicalEditor(editorProps),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  async onInit(payload) {
    /*  const { totalDocs: postsCount } = await payload.count({ collection: 'posts' })

    if (!postsCount) {
      await payload.create({ collection: 'posts', data: { title: 'Post 1' } })
    } */
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  sharp,
  plugins: [],
})
