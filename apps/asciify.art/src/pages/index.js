export async function GET({ redirect, request }) {
  const url = new URL(request.url);

  return redirect(`/498580${url.search}`);
}

// ---
// Astro.redirect("/498580");
// ---

// <!-- <html lang="en">
//   <head>
//     <meta charset="utf-8" />
//     <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
//     <meta name="viewport" content="width=device-width" />
//     <meta name="generator" content={Astro.generator} />
//     <title>Asciify.Art</title>
//     <style is:global define:vars={{ contentUri: `url("${meta.content_uri}")` }}>
//       * {
//         box-sizing: border-box;
//         margin: 0;
//         padding: 0;
//       }
//       .asciiart {
//         background-clip: text;
//         background-position: center center;
//         background-repeat: no-repeat;
//         background-size: cover;
//         -webkit-text-fill-color: transparent;
//         text-fill-color: transparent;
//         word-break: break-all;
//         color: #fff;
//         font-family: monospace;
//         font-size: 10px;
//         text-align: justify;
//       }

//       .art {
//         width: 800px;
//         height: 800px;
//         background-image: var(--contentUri);
//       }

//       .asciiart::selection {
//         background: transparent;
//         color: transparent;
//       }
//     </style>
//   </head>
//   <body class="bg-black text-black">
//     <Asciify meta={meta} client:load />
//   </body>
// </html> -->
