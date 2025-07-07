import { CollectionConfig } from 'payload'
import { EmailCell } from './fields/EmailCell'
import { fullnamefield } from './fields/fullNamefield'

export const Bookings: CollectionConfig = {
  slug: 'bookings',
  admin: {
    useAsTitle: 'fullName',
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
    fullnamefield,
    {
      name: 'startDate',
      type: 'date',
      required: true,
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
    {
      name: 'customAction',
      type: 'ui',
      admin: {
        components: {
          Cell: EmailCell,
        },
      },
    },
  ],

}
