import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

import { sqliteAdapter } from '@payloadcms/db-sqlite'
import { en } from '@payloadcms/translations/languages/en'
import { ro } from '@payloadcms/translations/languages/ro'
import { Articles } from './collections/Articles'
import { Bookings } from './collections/Bookings'
import { Media } from './collections/Media'
import { Tags } from './collections/Tags'
import { Users } from './collections/Users'
import { editorProps } from './lexical/editorProps'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  i18n: {
    // @ts-ignore
    supportedLanguages: { en, ro },
    translations: {
      ro: {
        general: {
          createNew: 'Creează',
          creatingNewLabel: 'Creează {{label}}',
          createNewLabel: 'Creează {{label}}',
          perPage: '{{limit}} per pagină',
          of: 'din',
          noResults:
            'Nu am găsit {{label}}. Nu există nicio înregistreare sau niciuna nu corespunde filtrelor selectate',
          noLabel: '<Fără {{label}}>',
          none: 'Fără',
        },
        fields: {
          itemsAndMore: '{{items}} şi încă {{count}}',
        },
      },
    },
  },
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Articles, Media, Tags, Bookings],
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
  /*   db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }), */

  db: sqliteAdapter({
    client: {
      url: process.env.DATABASE_URI!,
      // authToken: process.env.DATABASE_AUTH_TOKEN,
    },
  }),
  sharp,
  plugins: [],
})
