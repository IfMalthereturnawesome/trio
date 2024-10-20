// src/blocks/FAQBlock.ts
import { Block } from 'payload';
import { lexicalEditor } from '@payloadcms/richtext-lexical';

export const FAQBlock: Block = {
  slug: 'faq',
  labels: {
    singular: 'FAQ',
    plural: 'FAQs',
  },
  fields: [
    {
      name: 'items',
      label: 'FAQ Items',
      type: 'array',
      minRows: 1,
      labels: {
        singular: 'FAQ Item',
        plural: 'FAQ Items',
      },
      fields: [
        {
          name: 'question',
          type: 'text',
          required: true,
        },
        {
          name: 'answer',
          type: 'richText',
          required: true,
          editor: lexicalEditor({
            features: ({ rootFeatures }) => [...rootFeatures],
          }),
        },
      ],
    },
  ],
  interfaceName: 'FAQBlock',
};
