import { useEffect, useRef } from "react";
import QRCode from "qrcode";

export default function QrCode() {
    const canvasRef = useRef(null);

    const url = "https://shayam-mandir.vercel.app/"; // <-- FINAL URL

    useEffect(() => {
        QRCode.toCanvas(canvasRef.current, url, {
            width: 220,
            margin: 2,
        });
    }, []);

    const downloadQR = () => {
        const canvas = canvasRef.current;
        const url = canvas.toDataURL("image/png");

        const link = document.createElement("a");
        link.href = url;
        link.download = "qr-code.png";
        link.click();
    };

    return (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
            <h2>QR Code</h2>
            <canvas ref={canvasRef}></canvas>

            <br />
            <button
                onClick={downloadQR}
                style={{
                    marginTop: "20px",
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
