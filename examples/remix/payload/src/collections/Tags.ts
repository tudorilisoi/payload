import { CollectionConfig } from 'payload'

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

export const Tags: CollectionConfig = {
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
}
