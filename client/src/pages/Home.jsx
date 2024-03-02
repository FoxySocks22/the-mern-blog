import { useEffect, useState } from "react" 

export default function Home() {
  const [ content, setContent ] = useState({__html: ""});

  useEffect(() => {
    async function createMarkup() {
      let response;
      response = await fetch('/api/content/65e08988e8b595c293d3a498')
       const backendHtmlString = await response.json()
       console.log(backendHtmlString)
        return {__html: backendHtmlString};
     }
     createMarkup().then(result => setContent(result));
  }, []);
  return (
    <div dangerouslySetInnerHTML={content} />
  )
}
