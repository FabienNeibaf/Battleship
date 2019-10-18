const coerce = element => {
  if (element === null) return document.createDocumentFragment();
  switch (typeof element) {
    case 'string':
    case 'number':
      return document.createTextNode(element);
    case 'boolean':
    case 'undefined':
      return document.createDocumentFragment();
    default:
      return element;
  }
};

export const Fragment = props => {
  const parent = document.createDocumentFragment();
  props.children.forEach(child => {
    if (Array.isArray(child)) {
      child.forEach(node => parent.appendChild(node));
    } else {
      parent.appendChild(child);
    }
  });
  return parent;
};

export const el = (type, config, ...children) => {
  const props = { ...config, children };
  if (typeof type === 'function') return type(props);
  let node;
  try {
    node = document.createElement(type);
  } catch (e) {
    return document.createTextNode(type);
  }
  if (config) {
    Object.keys(config).forEach(prop => {
      if (prop.startsWith('on')) {
        node.addEventListener(prop.slice(2).toLowerCase(), props[prop]);
      } else {
        node.setAttribute(prop, props[prop]);
      }
    });
  }
  if (children !== undefined) {
    children.forEach(child => {
      if (Array.isArray(child))
        child.forEach(node => node.appendChild(coerce(node)));
      else node.appendChild(coerce(child));
    });
  }
  return node;
};

export const extract = (names, form) => {
  const data = {};
  names.forEach(name => {
    const input = form.querySelector(`[name=${name}]`);
    data[name] = input ? input.value : null;
  });
  return data;
};

export const csvals = (obj1, obj2) => {
  if (Array.isArray(obj1)) {
    return obj1.every(item => obj2.includes(item));
  }
  return false;
};

export const mount = (node, host) => {
  host.innerHTML = '';
  if (Array.isArray(node)) node.forEach(child => host.appendChild(child));
  else host.appendChild(node);
};

export class Observable {
  constructor() {
    this.handlers = {};
    this.build();
  }

  on(action, handler) {
    if (this.handlers[action]) this.handlers[action].push(handler);
    else this.handlers[action] = [handler];
  }

  build() {
    const prototype = Object.getPrototypeOf(this);
    Object.getOwnPropertyNames(prototype).forEach(prop => {
      if (prop !== 'constructor' && typeof prototype[prop] === 'function') {
        Object.defineProperty(this, prop, {
          value: (...args) => {
            const val = prototype[prop].call(this, ...args);
            if (this.handlers[prop])
              this.handlers[prop].forEach(handler => handler(val));
            return val;
          },
        });
      }
    });
  }
}
