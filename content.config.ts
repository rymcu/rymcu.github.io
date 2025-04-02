import { defineCollection, z } from '@nuxt/content'

const variantEnum = z.enum(['solid', 'outline', 'subtle', 'soft', 'ghost', 'link'])
const colorEnum = z.enum(['primary', 'secondary', 'neutral', 'error', 'warning', 'success', 'info'])
const sizeEnum = z.enum(['xs', 'sm', 'md', 'lg', 'xl'])
const orientationEnum = z.enum(['vertical', 'horizontal'])

const baseSchema = {
  title: z.string().nonempty(),
  description: z.string().nonempty()
}

const linkSchema = z.object({
  label: z.string().nonempty(),
  to: z.string().nonempty(),
  icon: z.string().optional(),
  size: sizeEnum,
  trailing: z.boolean().optional(),
  target: z.string().optional(),
  color: colorEnum,
  variant: variantEnum
})

const imageSchema = z.object({
  src: z.string().nonempty(),
  alt: z.string().optional(),
  loading: z.string().optional(),
  srcset: z.string().optional()
})

const featureItemSchema = z.object({
  ...baseSchema,
  icon: z.string().nonempty(),
  class: z.string().optional(),
  image: z.object({
    light: z.string().nonempty(),
    dark: z.string().nonempty()
  }).optional(),
  ui: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    leadingIcon: z.string().optional(),
    leading: z.string().optional()
  })
})

const sectionSchema = z.object({
  headline: z.string().optional(),
  ...baseSchema,
  features: z.array(featureItemSchema)
})

const userSchema = z.object({
  name: z.string().nonempty(),
  description: z.string().nonempty(),
  to: z.string().nonempty(),
  avatar: imageSchema
})

const sectionWithLinksSchema = sectionSchema.extend({
  links: z.array(linkSchema)
})

const testimonialUserSchema = userSchema.extend({
  target: z.string().nonempty()
})

export const collections = {
  landing: defineCollection({
    source: 'index.yml',
    type: 'data',
    schema: z.object({
      title: z.string().nonempty(),
      description: z.string().nonempty(),
      hero: sectionSchema.extend({
        headline: z.object({
          label: z.string().nonempty(),
          to: z.string().nonempty(),
          icon: z.string().nonempty()
        }),
        links: z.array(linkSchema)
      }),
      sections: z.array(
        sectionSchema.extend({
          id: z.string().nonempty(),
          orientation: orientationEnum.optional(),
          features: z.array(featureItemSchema),
          links: z.array(linkSchema),
          reverse: z.boolean().optional()
        })
      ),
      features: sectionSchema.extend({
        items: z.array(featureItemSchema)
      }),
      testimonials: sectionSchema.extend({
        items: z.array(
          z.object({
            quote: z.string().nonempty(),
            user: z.object({
              name: z.string().nonempty(),
              description: z.string().nonempty(),
              to: z.string().nonempty(),
              target: z.string().nonempty(),
              avatar: imageSchema
            })
          })
        )
      }),
      cta: sectionSchema.extend({
        links: z.array(linkSchema)
      })
    })
  }),
  NebulaPiF103Landing: defineCollection({
    source: 'nebula-pi-f103/index.yml',
    type: 'data',
    schema: z.object({
      ...baseSchema,
      hero: sectionWithLinksSchema,
      sections: z.array(
        sectionSchema.extend({
          items: z.array(featureItemSchema),
          links: z.array(linkSchema),
          reverse: z.boolean().optional(),
          images: z.object({
            mobile: z.string().optional(),
            desktop: z.string().optional()
          })
        })
      ),
      features: sectionSchema.extend({
        items: z.array(featureItemSchema)
      }),
      steps: sectionSchema.extend({
        items: z.array(featureItemSchema)
      }),
      pricing: sectionSchema.extend({
        plans: z.array(z.object({
          ...baseSchema,
          price: z.string().nonempty(),
          billing_period: z.string().nonempty(),
          billing_cycle: z.string().nonempty(),
          button: linkSchema,
          features: z.array(z.string().nonempty()),
          highlight: z.boolean().optional()
        }))
      }),
      testimonials: sectionSchema.extend({
        items: z.array(z.object({
          quote: z.string().nonempty(),
          user: testimonialUserSchema
        }))
      }),
      cta: sectionWithLinksSchema
    })
  }),
  NebulaPiF103Docs: defineCollection({
    type: 'page',
    source: 'nebula-pi-f103/docs/**/*',
    schema: z.object({
      title: z.string().nonempty(),
      description: z.string().nonempty(),
      links: z.array(z.object({
        label: z.string(),
        icon: z.string(),
        to: z.string(),
        target: z.string().optional()
      })).optional()
    })
  })
}
