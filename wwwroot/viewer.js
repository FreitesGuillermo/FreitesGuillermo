//import * as Autodesk from "@types/forge-viewer";

// async function getAccessToken(callback) {
//     try {
//         const resp = await fetch('/api/auth/token');
//         if (!resp.ok) {
//             throw new Error(await resp.text());
//         }
//          let  { access_token, expires_in } = await resp.json();
//         console.log(access_token);
//         callback(access_token, expires_in);

//     } catch (err) {
//         alert('Could not obtain access token. See the console for more details.');
//         console.error(err);
//     }
// }
async function getAccessToken(callback) {

     fetch('/api/auth/token')
     .then((response) => response.json())
     .then((json) => {
       console.log(json);

       callback(json.access_token,
         json.expires_in);


       });

     }

export function initViewer(container) {
    return new Promise(function (resolve, reject) {
        Autodesk.Viewing.Initializer({ getAccessToken }, function () {
            const config = {
                extensions: []
            };
            const viewer = new Autodesk.Viewing.GuiViewer3D(container, config);
            viewer.start();
            // console.log({getAccessToken});
            viewer.setTheme('dark-theme');
            resolve(viewer);
        });
    });
}

export function loadModel(viewer, urn) {
    return new Promise(function (resolve, reject) {
        function onDocumentLoadSuccess(doc) {
            resolve(viewer.loadDocumentNode(doc, doc.getRoot().getDefaultGeometry()));
        }
        function onDocumentLoadFailure(code, message, errors) {
            reject({ code, message, errors });

        }
        viewer.setLightPreset(0);
        // urn='dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6Y2FyZG9uaXYvUFRHXzIwMjIwNTI2Lm53ZA==';
        Autodesk.Viewing.Document.load('urn:' + urn, onDocumentLoadSuccess, onDocumentLoadFailure);
    });
}
