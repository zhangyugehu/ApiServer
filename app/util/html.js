

function beatify(item, index) {
  index += 1;
  return `${ele('label', `${item.desp} ~<br />`, 'color: darkgray')} ${index < 6 ? h(index, item.text) : ele('p', item.text)}`
}

function html(head, body) {
  return `<!DOCTYPE html><html xmlns="http://www.w3.org/1999/xhtml">${head}${body}</html>`
}

function head(title) {
  return `<head><meta http-equiv="Content-Type" content="text/html;charset=utf-8"><title>${title}</title></head>`
}

function h(level, content) {
  return `<h${level}>${content}</h${level}>`
}

function ele(name, content, style = '') {
  return `<${name} style='${style}'>${content}</${name}>`
}

module.exports = {
  beatify, html, head, h, ele
}