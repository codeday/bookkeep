export function getQueryVariable(query: string, k: string): string | undefined {
  const vars = query.split('&');
  for (var i = 0; i < vars.length; i++) {
      const pair = vars[i].split('=');
      if (decodeURIComponent(pair[0]) == k) {
          return decodeURIComponent(pair[1]);
      }
  }
}
