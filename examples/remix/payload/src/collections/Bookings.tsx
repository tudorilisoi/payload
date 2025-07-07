import { CollectionConfig } from 'payload'
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
      name: 'phone',
      type: 'text',
      label: {
        en: 'Phone',
        ro: 'Telefon',
      },
    },
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
    /*     {
      name: 'customAction',
      type: 'ui',
      admin: {
        components: {
          Cell: EmailCell,
        },
      },
    }, */
    {
      name: 'status',
      type: 'select',
      label: {
        en: 'Status',
        ro: 'Stare',
      },
      options: [
        {
          label: {
            en: 'Unconfirmed',
            ro: 'Neconfirmat',
          },
          value: 'UNCONFIRMED',
        },
        {
          label: {
            en: 'Confirmed',
            ro: 'Confirmat',
          },
          value: 'CONFIRMED',
        },
      ],
    },
  ],
}
