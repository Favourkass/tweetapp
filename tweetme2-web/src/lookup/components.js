
export function LoadTweets(callback) {
    const xhr = new XMLHttpRequest()
    const method = 'GET'
    const url = 'http://localhost:8000/api/tweets/'
    const responseType = 'json'
    xhr.responseType = responseType
    xhr.open(method, url, true)
    xhr.onload = function() {
        callback(xhr.response, xhr.status)
    } 
    xhr.onerror = function(e) {
      console.log(e)
        callback({"message":"the rquest was an error"}, 400)
    }
  
    xhr.send()
  }