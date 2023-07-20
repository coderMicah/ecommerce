const product = {
    name: 'product',
    title: 'Product',
    type: 'document',
    fields: [
      {
        name: 'name',
        title: 'Name',
        type: 'string',
      },
      {
        name: 'price',
        title: 'Price',
        type: 'number',
      },
      {
        name: 'slug',
        title: 'Slug',
        type: 'slug',
        options: {
          source: 'name',
          maxLength: 96,
        },
      },
      {
        name: 'image',
        title: 'Image',
        type: 'image',
        options: {
          hotspot: true,
        },
        fields: [
          {
            name: 'alt',
            type: 'string',
            title: 'Alternative Text',
          }
        ]
      },
      {
        name: 'description',
        title: 'Description',
        type: 'string',
      },
      {
        name: 'brand',
        title: 'Brand',
        type: 'string',
      },
      {
        name: 'category',
        title: 'Category',
        type: 'string',
      },
      {
        name: 'rating',
        title: 'Rating',
        type: 'number',
      },
      {
        name: 'numReviews',
        title: 'NumReviews',
        type: 'number',
      },
      {
        name: 'countInStock',
        title: 'CountInStock',
        type: 'number',
      },
  
    //   {
    //     title: 'Reviews',
    //     name: 'reviews',
    //     type: 'array',
    //     of: [
    //       {
    //         title: 'Review',
    //         type: 'productReview',
    //       },
    //     ],
    //   },
    ],
    preview: {
      select: {
        title: 'name',
        media: 'image',
      },
    },
  }
  export default product;