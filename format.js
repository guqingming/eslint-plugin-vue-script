'use strict'

module.exports = {
  meta: {
    type: 'problem'
  },
  create(context) {
    return {
      Program() {
        const options = context.options[0]
        const sourceCode = context.getSourceCode()
        const ExportDefaultDeclaration = sourceCode.ast?.body?.find(item => item.type === 'ExportDefaultDeclaration')
        const properties = ExportDefaultDeclaration?.declaration?.properties
        if (properties) {
          // required
          for (const key in options) {
            if (options[key].required) {
              if (!properties.some(property => property.key.name === key)) {
                context.report({
                  node: ExportDefaultDeclaration,
                  message: `${key} is required`
                })
              }
            }
          }
          // type
          for (const property of properties) {
            const key = property.key.name
            const type = property.value.type
            const value = property.value.value
            const elements = property.value.elements
            const option = options[key]
            if (option) {
              if (option.type !== type) {
                context.report({
                  node: property,
                  message: `${key} type must be ${option.type}`
                })
              }
              const tpf = option.typeof
              if (typeof value !== 'undefined') {
                if (value === ''){
                  context.report({
                    node: property,
                    message: `${key} must be have a value`
                  })
                }
              }
              if (value) {
                if (tpf.startsWith('/') && tpf.endsWith('/')) {
                  const reg = new RegExp(tpf.slice(1, -1))
                  if (!reg.test(value)) {
                    context.report({
                      node: property,
                      message: `${key} type must be ${tpf}`
                    })
                  }
                } else {
                  if (typeof value !== tpf) {
                    context.report({
                      node: property,
                      message: `${key} type must be ${tpf}`
                    })
                  }
                }
              } else if (elements) {
                if (elements.length) {
                  elements.forEach(element => {
                    if (element.type !== tpf) {
                      context.report({
                        node: element,
                        message: `${key} type must be ${tpf}`
                      })
                    }
                  })
                }
              }
            }
            // elements
            if (elements) {
              const _options = option.children
              if (!elements.length) {
                context.report({
                  node: property,
                  message: `${key} must be have a value`
                })
              }
              for (const element of elements) {
                const properties = element.properties
                if (properties) {
                  // requred
                  for (const key in _options) {
                    if (_options[key].required) {
                      if (!properties.some(propertie => propertie.key.name === key)) {
                        context.report({
                          node: property,
                          message: `${key} is required`
                        })
                      }
                    }
                  }
                  // type
                  for (const propertie of properties) {
                    const key = propertie.key?.name
                    const type = propertie.value.type
                    const value = propertie.value.value
                    const _option = option.children[key]
                    if (typeof value !== 'undefined') {
                      if (value === ''){
                        context.report({
                          node: propertie,
                          message: `${key} must be have a value`
                        })
                      }
                    }
                    if (_option) {
                      if (_option.type !== type) {
                        context.report({
                          node: propertie,
                          message: `${key} type must be ${_option.type}`
                        })
                      }
                      const tpf = _option.typeof
                      if (value) {
                        if (tpf.startsWith('/') && tpf.endsWith('/')) {
                          const reg = new RegExp(tpf.slice(1, -1))
                          if (!reg.test(value)) {
                            context.report({
                              node: propertie,
                              message: `${key} type must be ${tpf}`
                            })
                          }
                        } else {
                          if (typeof value !== tpf) {
                            context.report({
                              node: propertie,
                              message: `${key} type must be ${tpf}`
                            })
                          }
                        }
                      }
                    }
                  }
                } else if (element.value) {
                  const type = element.type
                  const value = element.value
                  if (typeof value !== _options) {
                    context.report({
                      node: element,
                      message: `${key} type must be ${_options}`
                    })
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
