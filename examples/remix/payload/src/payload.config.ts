import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { FixedToolbarFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig, CollectionAfterDeleteHook, CollectionSlug } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { en } from '@payloadcms/translations/languages/en'
import { ro } from '@payloadcms/translations/languages/ro'
import { tagsfield } from './tagsfield'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const editorProps = {
  features: ({ defaultFeatures }) => [...defaultFeatures, FixedToolbarFeature()],
}

export const removeTagFromRelations: CollectionAfterDeleteHook = async ({ doc, req }) => {
  const deletedTagId = doc.id

  const collectionsToUpdate: CollectionSlug[] = ['posts', 'media'] // your target collections
  const tagField = 'tags' // adjust if your field is named differently

  for (const collection of collectionsToUpdate) {
    // Find docs that contain the deleted tag
    const relatedDocs = await req.payload.find({
      collection,
      where: {
        [tagField]: {
          contains: deletedTagId,
        },
      },
      limit: 100, // adjust if expecting more
    })

    for (const relatedDoc of relatedDocs.docs) {
      // Remove the tag from the array
      const updatedTags = (relatedDoc[tagField] || []).filter((id: string) => id !== deletedTagId)

      // Update the document
      await req.payload.update({
        collection,
        id: relatedDoc.id,
        data: {
          [tagField]: updatedTags,
        },
      })
    }
  }

  return doc
}

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
      hooks: {
        afterDelete: [removeTagFromRelations],
      },
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

        tagsfield,
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
