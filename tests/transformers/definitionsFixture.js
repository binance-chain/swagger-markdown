const fixture = {
  definitionsHeader: [
    '### Models', '---'
  ],
  tableHeader: [
    '| Name | Type | Description | Example | Flags |',
    '| ---- | ---- | ----------- | ------- | ----- |'
  ],
  data1: {
    Tag: {
      type: 'object',
      properties: {
        id: {
          type: 'integer',
          format: 'int64'
        },
        name: {
          type: 'string'
        }
      }
    }
  },
  result1: [
    '| id | long |  |  |  |',
    '| name | string |  |  |  |'
  ],
  data2: {
    Pet: {
      type: 'object',
      required: ['name', 'photoUrls'],
      properties: {
        category: {
          $ref: '#/definitions/Category'
        },
        name: {
          type: 'string',
          example: 'doggie',
          description: 'pet category in the store'
        },
        photoUrls: {
          type: 'array',
          items: {
            type: 'string'
          }
        },
        tags: {
          type: 'array',
          items: {
            $ref: '#/definitions/Category'
          }
        }
      }
    }
  },
  result2: [
    '| category | [Category](#category) |  |  |  |',
    '| name | string | pet category in the store | doggie | Required |',
    '| photoUrls | [ string ] |  |  | Required |',
    '| tags | [ [Category](#category) ] |  |  |  |'
  ],
  data3: {
    deviceid: {
      type: 'integer',
      format: 'int32',
      description: 'DeviceID',
      example: 'iPhone'
    }
  },
  result3: [
    '| deviceid | integer | DeviceID | iPhone |  |'
  ]
};
fixture.defHeader1 = '### Tag  ';
fixture.defHeader2 = '### Pet  ';
fixture.defHeader3 = '### deviceid  ';

module.exports = fixture;
