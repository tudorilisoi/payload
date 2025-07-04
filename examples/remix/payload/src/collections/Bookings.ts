import { CollectionConfig } from 'payload'

export const Bookings: CollectionConfig = {
  slug: 'bookings',
  admin: {
    // useAsTitle: 'tag',
  },
  labels: {
    singular: {
      en: 'Booking',
      ro: 'Rezervare',
    },
    plural: {
      en: 'Bookings',
      ro: 'Rezervări',
    },
  },
  fields: [
    {
      name: 'startDate',
      type: 'date',
      required: true,
      unique: true,
      index: true,
      label: {
        en: 'Start date',
        ro: 'Data și ora',
      },
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
  ],
}
