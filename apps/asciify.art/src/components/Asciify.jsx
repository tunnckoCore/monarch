// import domtoimage from "dom-to-image-more";
import { useState } from 'react';

export default function Asciify({ meta, prev, next }) {
  // const [dataUrl, setDataUrl] = useState("");
  const [custom, setCustom] = useState(0);

  delete meta.valid_listings;
  delete meta.valid_transfers;
  delete meta.collection_items;
  delete meta.collections;

  let charset = JSON.stringify(meta);
  while (charset.length < 18_000) {
    const curr = charset.length;
    charset += curr > 1000 ? charset.slice(0, 1000) : charset;
  }

  // const handleDownload = async () => {
  //   alert("Downloading, please wait...");
  //   const blob = await domtoimage.toPng(document.querySelector(".art"), {
  //     width: 800,
  //     height: 800,
  //     bgcolor: "#000",
  //     style: {
  //       padding: 0,
  //       margin: 0,
  //     },
  //   });

  //   const a = document.createElement("a");
  //   a.href = blob;
  //   a.download = `asciify-art-${meta.transaction_hash}.png`;
  //   a.target = "_blank";
  //   a.click();

  //   // window.saveAs(blob, `111asciify-art-${meta.transaction_hash}.png`);
  // };

  // const handleOnClick = async (e) => {
  //   // const uri = await domtoimage.toPng(e.target, {
  //   //   width: 800,
  //   //   height: 800,
  //   //   bgcolor: "#000",
  //   //   style: {
  //   //     padding: 0,
  //   //     margin: 0,
  //   //   },
  //   // });
  //   // setDataUrl(uri);
  // };

  const numberFormat = (num) => num.toString().replaceAll(/\B(?=(\d{3})+(?!\d))/g, ',');

  const isNotImage = !meta.mimetype.startsWith('image/') || meta.mimetype === 'image/svg+xml';

  return (
    <>
      <div className="my-5 flex w-full items-center justify-between">
        <a href={`/${prev}`} className="bg-gray-200 p-2">
          ← #{numberFormat(prev)}
        </a>
        <form method="GET" action={`/${custom}`}>
          <input
            autoFocus={true}
            type="text"
            id="customid"
            required
            min="0"
            placeholder="Ethscription ID"
            onInput={(e) => setCustom(e.target.value)}
            className="w-40 min-w-0 border bg-gray-900/70 px-2 py-1.5 text-gray-200 outline-none"
          />
          <button type="submit" className="border bg-gray-200 px-2 py-1.5">
            Go
          </button>
        </form>
        <div
          // href={dataUrl}
          // target="_blank"
          // download={`asciify-art-${meta.transaction_hash}.png`}
          className="cursor-pointer bg-gray-200 p-2"
          id="download-btn"
        >
          Download
        </div>
        <a href={`/${next}`} className="bg-gray-200 p-2">
          #{numberFormat(next)} →
        </a>
      </div>
      <div className="m-0 mb-8 flex items-center justify-center overflow-hidden border border-gray-100 p-2">
        {isNotImage && (
          <div className="w-[800px] text-center text-gray-100">Not an image, try another</div>
        )}
        {!isNotImage && (
          <div className="asciiart art" data-eid={meta.transaction_hash}>
            {charset}
          </div>
        )}
      </div>
    </>
  );
}
