// import { SECRET_PINATA_JWT } from '$env/static/private'

const createInMemoryFile = (fileName: string, jsonString: string) => {
  
    const blob = new Blob([jsonString], { type: 'text/plain' });
  
    return {
      name: fileName,
      type: blob.type,
      size: blob.size,
      lastModified: Date.now(), 
      slice: function() {
        return blob.slice(...arguments);
      }
    };
}

// export const pinPostToPinata = async (json: Record<string, any>) => {
//     if(!SECRET_PINATA_JWT) {
//         console.error('No pinata secret found')
//         return 
//     }
//     const fileName = json.title 
//     const jsonString = JSON.stringify(json)

//     try {
//         const formData = new FormData();
//         formData.append("file", new Blob([jsonString], { type: 'text/plain' }), fileName);

//         console.log('Uploading to pinata', formData)

//         const res = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
//             method: 'POST',
//             body: formData,
//             headers: {
//                 'Authorization': `Bearer ${SECRET_PINATA_JWT}`,
//             }
//         })
//         const data = await res.json()
//         console.log(data)
//         return data
//     } catch (error) {
//         console.error(error)
//     }
//     return null
// }