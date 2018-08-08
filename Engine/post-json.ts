export function postJSON(value: any, url: string) {
  return new Promise((resolve, reject) => {
    const http = new XMLHttpRequest();
    const body = JSON.stringify(value);
  
    http.open('POST', url, true);
    http.setRequestHeader('Content-type', 'application/json');
  
    http.onreadystatechange = () => {
        if(http.readyState == 4 && http.status == 200) {
            resolve(http.responseText);
        } else {
          reject(http)
        }
    }
    http.send(body);
  })
}