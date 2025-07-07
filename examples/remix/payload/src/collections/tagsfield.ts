import { Field } from 'payload'

const tagsfield: Field = {
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
}
export {tagsfield}
