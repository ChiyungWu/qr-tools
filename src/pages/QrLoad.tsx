import { useState } from "react";
import QrScanner from "qr-scanner";

export default function QrLoad() {
  const [result, setResult] = useState<string>("");

  const handleFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.length) return;

    const file = event.target.files[0];
    const result = await QrScanner.scanImage(file);
    setResult(result);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">QR 圖片解析</h2>
      <input type="file" accept="image/*" onChange={handleFile} />
      {result && (
        <p className="mt-2">
          <strong>解析結果：</strong> {result}
        </p>
      )}
    </div>
  );
}
