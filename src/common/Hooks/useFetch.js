import useAsync from "./useAsync";

const DEFAULT_OPTIONS = {
  headers: {
    "Content-Type": "application/json"
  }
};

export default function useFetch(url, options = {}, dependencies = []) {
  return useAsync(() => {
    if (Object.keys(options).length === 0) {
      return fetch(url).then((res) => {
        if (res.ok) return res.json();
        return res.json().then((json) => Promise.reject(json));
      });
    }
    return fetch(url, { ...DEFAULT_OPTIONS, ...options }).then((res) => {
      if (res.ok) return res.json();
      return res.json().then((json) => Promise.reject(json));
    });
  }, dependencies);
}
