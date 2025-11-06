module.exports = {
    type: 'object',
    properties: {
      userId: {
        type: 'number'
      },
      productId: {
        type: 'number'
      },
      quantity: {
        type: 'number'
      }
    },
    required: [
      'userId',
      'productId',
      'quantity'
    ],
    additionalProperties: false
  };