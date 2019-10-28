export const range = (i, j) => {
  const res = [];
  while (i <= j) {
    res.push(i);
    i += 1;
  }
  return res;
};

export const random = max => Math.floor(Math.random() * max);

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

export const el = (type, attrs, ...children) => {
  if (typeof type === 'function') {
    const props = { ...attrs, children };
    props.context = {};
    return type(props);
  }
  let node;
  try {
    node = document.createElement(type);
  } catch (e) {
    return document.createTextNode(type);
  }
  if (attrs) {
    Object.keys(attrs).forEach(key => {
      if (key.startsWith('on')) {
        node.addEventListener(key.slice(2).toLowerCase(), attrs[key]);
      } else if (key === 'className') {
        node.setAttribute('class', attrs[key]);
      } else if (key === 'ref') {
        const { context } = attrs;
        if (!context)
          throw new Error('The context must be provided when using ref');
        context[attrs[key]] = node;
      } else {
        node.setAttribute(key, attrs[key]);
      }
    });
  }
  children.forEach(child => {
    if (Array.isArray(child))
      child.forEach(gdChild => node.appendChild(coerce(gdChild)));
    else node.appendChild(coerce(child));
  });
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
  else host.appendChild(coerce(node));
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
