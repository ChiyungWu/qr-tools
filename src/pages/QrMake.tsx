import { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

export default function QrMake() {
  const [text, setText] = useState("Hello World");

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">QR 產生器</h2>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="輸入文字..."
        className="border p-2 rounded w-full"
      />
      <div className="flex justify-center">
        <QRCodeCanvas value={text} size={200} />
      </div>
    </div>
  );
}
