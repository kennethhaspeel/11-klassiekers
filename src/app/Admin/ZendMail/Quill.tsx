"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Deelnemer } from "@prisma/client";
import dynamic from "next/dynamic";
import { useState } from "react";
import "react-quill-new/dist/quill.snow.css";

const QuillNoSSRWrapper = dynamic(() => import("react-quill-new"), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});
const modules = {
  toolbar: [
    [{ header: "1" }, { header: "2" }, { font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image", "video"],
    ["clean"],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
};
/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
const formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "indent",
  "link",
  "image",
  "video",
];

interface IQuill {
  deelnemers: Deelnemer[];
}
export default function Quill({ deelnemers }: IQuill) {
  const [selected, setSelected] = useState<string[]>([]);
  const [content, setContent] = useState("");

  const AanpassingTekst = (nieuweTekst: string) => {
    setContent(nieuweTekst);
  };

  const Verstuur = () => {
    console.log(selected);
    console.log(content)
  };
  return (
    <>
      <div className="w-full h-screen flex flex-col grow mx-4">
        <div>
          <h2 className="text-2xl">Selecteer Bestemmelingen</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 grow-0">
          {deelnemers.map((deel) =>
            selected.some((x) => x == deel.id) ? (
              <Button
                key={deel.id}
                className="bg-green-700 text-white"
                onClick={() => {
                  setSelected(selected.filter((x) => x !== deel.id));
                }}
              >
                {deel.voornaam} {deel.naam}
              </Button>
            ) : (
              <Button
                key={deel.id}
                className="bg-gray-700 text-white"
                onClick={() => {
                  setSelected([...selected, deel.id]);
                }}
              >
                {deel.voornaam} {deel.naam}
              </Button>
            )
          )}
        </div>
        <Separator className="bg-gray-600 my-2" />
        <div>Hier komt een input voor titel</div>
        <div className="h-96">
          <QuillNoSSRWrapper
            modules={modules}
            formats={formats}
            theme="snow"
            value={content}
            onChange={AanpassingTekst}
            className="w-full h-80 my-5 bg-white grow"
          />
        </div>
        <div className="mt-2">
          <Button onClick={Verstuur}>Verstuur</Button>
        </div>
      </div>
    </>
  );
}
