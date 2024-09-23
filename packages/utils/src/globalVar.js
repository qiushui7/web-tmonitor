
export const Tmonitor = getTmonitor();

export function getTmonitor(){
  window.__Tmonitor__ = window.__Tmonitor__||{
    hasError: false,
    vue: null,
    react: null,
    recordScreenId: null
  };
  return window.__Tmonitor__;
}
