export function setObjectValueByPath(obj, path: string, inputValue: any) {
    let a = path.split('.').length > 0 ? path.split('.') : [path];
    let o = obj
    while (a.length - 1) {
      let n = a.shift()
      if (!(n in o)) o[n] = {}
      o = o[n]
    }
    o[a[0]] = inputValue;
  }

export function getObjectValueByPath(obj, path: string) {
    path = path.replace(/\[(\w+)\]/g, '.$1')
    path = path.replace(/^\./, '')
    var a = path.split('.')
    var o = obj
    while (a.length) {
        var n = a.shift()
        if (!(n in o)) return
        o = o[n]
    }
    return o
}