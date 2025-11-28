import { useEffect, useRef, useState } from "react";
import QRious from "qrious";

export default function QrCode() {
    const qrRef = useRef(null);
    const [qrObj, setQrObj] = useState(null);

    const url =
        "https://shayam-mandir-git-main-deepak-sainis-projects-a032d74f.vercel.app/";

    useEffect(() => {
        const qr = new QRious({
            element: qrRef.current,
            value: url,
            size: 220,
        });
        setQrObj(qr);
    }, []);

    const downloadQR = () => {
        const link = document.createElement("a");
        link.download = "my_qrcode.png";
        link.href = qrObj.toDataURL();
        link.click();
    };

    return (
        <div
            style={{
                textAlign: "center",
                marginTop: "50px",
                fontFamily: "Arial",
            }}
        >
            <h2 style={{ marginBottom: "20px" }}>QR Code</h2>

            {/* QR Code Canvas */}
            <div style={{ marginBottom: "20px" }}>
                <canvas ref={qrRef}></canvas>
            </div>

            {/* Download Button */}
            <button
                onClick={downloadQR}
                style={{
                    padding: "10px 25px",
                    background: "green",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer",
                }}
            >
                Download QR Code
            </button>
        </div>
    );
}
