"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ZendMail } from "@/components/ZendMail";
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
  const [selected, setSelected] = useState<string[]>(
    deelnemers.map((a) => a.email)
  );
  const [content, setContent] = useState("");
  const [titel,setTitel]=useState<string>("")

  const AanpassingTekst = (nieuweTekst: string) => {
    setContent(nieuweTekst);
  };

  const SelecteerAlles = () => {
    const d = deelnemers.map((a) => a.email);
    setSelected(d);
  };

  const DeselecteerAlles = () => {
    setSelected([]);
  };

  const Verstuur = async () => {
    const result = await ZendMail({bestemmelingen:selected,onderwerp:titel,boodschap:content})
    console.log(result);

  };
  return (
    <>
      <div className="w-full h-screen flex flex-col grow mx-4">
        <div className="my-2">
          <h2 className="text-2xl">
            Selecteer Bestemmelingen{" "}
            <Button onClick={() => {SelecteerAlles()}}>Selecteer Alles</Button>{" "}
            <Button onClick={() => {DeselecteerAlles()}}>Deselecteer Alles</Button>
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 grow-0">
          {deelnemers.map((deel) =>
            selected.some((x) => x == deel.email) ? (
              <Button
                key={deel.email}
                className="bg-green-700 text-white"
                onClick={() => {
                  setSelected(selected.filter((x) => x !== deel.email));
                }}
              >
                {deel.voornaam} {deel.naam}
              </Button>
            ) : (
              <Button
                key={deel.id}
                className="bg-gray-700 text-white"
                onClick={() => {
                  setSelected([...selected, deel.email]);
                }}
              >
                {deel.voornaam} {deel.naam}
              </Button>
            )
          )}
        </div>
        <Separator className="bg-gray-600 my-2" />
        <div>
          <Input type="text" placeholder="Geef een titel" defaultValue={titel} onChange={(e)=>setTitel(e.target.value)} className="bg-white text-black"/>
        </div>
        <div className="h-96">
          <QuillNoSSRWrapper
            modules={modules}
            formats={formats}
            theme="snow"
            value={content}
            onChange={AanpassingTekst}
            className="w-full h-80 my-5 bg-white text-black grow"
          />
        </div>
        <div className="mt-2">
          <Button onClick={Verstuur}>Verstuur</Button>
        </div>
      </div>
    </>
  );
}
