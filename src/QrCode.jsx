import { useEffect, useRef, useState } from "react";

export default function QrCode() {
    const qrRef = useRef(null);
    const [qrObj, setQrObj] = useState(null);
    const url = "https://shayam-mandir-git-main-deepak-sainis-projects-a032d74f.vercel.app/";

    useEffect(() => {
        // only run in browser
        if (typeof window === "undefined") return;

        // dynamic import to avoid build/SSR issues
        let mounted = true;
        import("qrious")
            .then((mod) => {
                if (!mounted) return;
                const QRious = mod.default || mod;
                const qr = new QRious({
                    element: qrRef.current,
                    value: url,
                    size: 220,
                });
                setQrObj(qr);
            })
            .catch((err) => {
                console.error("Failed to load qrious:", err);
            });

        return () => {
            mounted = false;
        };
    }, []);

    const downloadQR = () => {
        if (!qrObj) return;
        const link = document.createElement("a");
        link.download = "my_qrcode.png";
        link.href = qrObj.toDataURL();
        link.click();
    };

    return (
        <div style={{ textAlign: "center", marginTop: 50, fontFamily: "Arial" }}>
            <h2 style={{ marginBottom: 20 }}>QR Code</h2>
            <div style={{ marginBottom: 20 }}>
                <canvas ref={qrRef}></canvas>
            </div>
            <button
                onClick={downloadQR}
                style={{
                    padding: "10px 25px",
                    background: "green",
                    color: "white",
                    border: "none",
                    borderRadius: 5,
                    cursor: "pointer",
                }}
            >
                Download QR
            </button>
        </div>
    );
}
