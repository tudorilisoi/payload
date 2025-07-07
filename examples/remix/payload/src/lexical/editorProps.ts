import { FixedToolbarFeature } from '@payloadcms/richtext-lexical'

export const editorProps = {
  features: ({ defaultFeatures }) => [...defaultFeatures, FixedToolbarFeature()],
}
