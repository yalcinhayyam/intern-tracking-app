"use client";
import { useEffect, useState } from "react";


function EmbedDocument (){
  const [origin, setOrigin] = useState<string | undefined>(undefined);

    useEffect(() => {
        setOrigin(location.origin);
        console.log({ locationOrigin: location.origin });
      }, []);
       
    return (
        origin && (
          <iframe
            src={`https://docs.google.com/gview?url=${origin}/word.docx&embedded=true`}
            style={{ width: "600px", height: "500px" }}
            frameBorder="0"
          ></iframe>
        )
      );
}