import { useEffect, useRef, useState } from "react";
import QrScanner from "qr-scanner";

export default function QrScan() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [result, setResult] = useState<string>("");

  useEffect(() => {
    if (!videoRef.current) return;

    const scanner = new QrScanner(
      videoRef.current,
      (result) => {
        setResult(result.data);
      },
      { preferredCamera: "environment" }
    );

    scanner.start();

    return () => {
      scanner.stop();
    };
  }, []);

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold">即時 QR 掃描</h2>
      <video ref={videoRef} style={{ width: "100%" }} />
      {result && (
        <p className="mt-2">
          <strong>掃描結果：</strong> {result}
        </p>
      )}
    </div>
  );
}
