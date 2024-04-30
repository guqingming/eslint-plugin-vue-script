```json
{
  "plugins": ["vue-script"],
  "rules": {
    "vue-script/config-format": ["error", {
      "title": {
        "type": "Literal",
        "typeof": "/^[^\\s.]+$/",
        "required": true
      },
      "constant": {
        "type": "Literal",
        "typeof": "boolean",
        "required": false
      },
      "keepAlive": {
        "type": "Literal",
        "typeof": "boolean",
        "required": true
      },
      "authorize": {
        "type": "ArrayExpression",
        "typeof": "Literal",
        "required": false,
        "children": "string"
      },
      "component": {
        "type": "Literal",
        "typeof": "/^[a-z]+$/",
        "required": false
      },
      "parameter": {
        "type": "ArrayExpression",
        "typeof": "ObjectExpression",
        "required": false,
        "children": {
          "key": {
            "type": "Literal",
            "typeof": "/^[a-z][a-zA-Z]+$/",
            "required": true
          },
          "value": {
            "type": "Literal",
            "typeof": "/^[^\\s.]+$/",
            "required": true
          },
          "required": {
            "type": "Literal",
            "typeof": "boolean",
            "required": true
          }
        }
      },
      "permission": {
        "type": "ArrayExpression",
        "typeof": "ObjectExpression",
        "required": false,
        "children": {
          "key": {
            "type": "Literal",
            "typeof": "/^[a-z]+$/",
            "required": true
          },
          "title": {
            "type": "Literal",
            "typeof": "/^[^\\s.]+$/",
            "required": true
          },
          "api": {
            "type": "Literal",
            "typeof": "/^\/[a-zA-Z\/]+$/",
            "required": false
          }
        }
      }
    }, {
      "includes": ["views/**/*/index.vue"]
    }]
  }
}
```

```typescript
<script lang="ts">
export default {
  title: '页面标题',
  constant: true,
  keepAlive: true,
  component: 'poc',
  permission: [
    {
      title: '查询',
      key: 'query',
      api: '/get/list'
    }
  ]
}
</script>
```
