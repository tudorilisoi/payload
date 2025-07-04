import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
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
      slug: 'posts',
      labels: {
        singular: {
          en: 'Post',
          ro: 'Postare',
        },
        plural: {
          en: 'Posts',
          ro: 'Postări',
        },
      },
      admin: {
        group: {
          en: 'Posts',
          ro: 'Postări',
        },
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
          editor: lexicalEditor({}),
           label: {
            en: 'Content',
            ro: 'Conținut',
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
  editor: lexicalEditor(),
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
