import { FixedToolbarFeature } from '@payloadcms/richtext-lexical'

export const editorProps = {
  features: ({ defaultFeatures }) => [
    ...defaultFeatures,
    FixedToolbarFeature(),
    {
      key: 'inlineImages', // Unique key for this feature
      feature: {
        name: 'upload', // Actual feature name
        properties: {
          enabledCollections: ['media'],
          display: {
            size: 'small',
            width: '30%',
            height: 'auto',
          },
          image: {
            inline: true,
          },
        },
      },
    },
  ],
}
