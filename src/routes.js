 export const routes = {
  '/': {
    title: "SSR Application",
  },
  '/counter': {
    title: "Counter::SSR Application",
  },
  '404': {
    title: "Not Found::SSR Application",
  }
};

export default function(url) {
  let r = routes[url];
  return r ? r : routes['404'];
}