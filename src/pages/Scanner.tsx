import {
  BrowserMultiFormatReader,
  type IScannerControls,
} from "@zxing/browser";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import { env } from "../env";

const SCAN_TIMEOUT_MS = 10_000;

type CameraOption = {
  deviceId: string;
  label: string;
};

type ScanResponse = {
  reservation?: {
    id: string;
    barcode: string;
    status: "PENDING" | "CONFIRMED";
    email: string;
    contactFullName: string;
    eventSessionId: string | null;
  };
  error?: string;
};

export default function ScannerPage() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const readerRef = useRef<BrowserMultiFormatReader | null>(null);
  const controlsRef = useRef<IScannerControls | null>(null);
  const autoStartRef = useRef(true);
  const submittingRef = useRef(false);
  const lastScanRef = useRef<{ value: string; at: number } | null>(null);
  const scanQueueRef = useRef<string[]>([]);
  const processingQueueRef = useRef(false);

  const [cameras, setCameras] = useState<CameraOption[]>([]);
  const [selectedCamera, setSelectedCamera] = useState<string>("");
  const [isScanning, setIsScanning] = useState(false);
  const [scanError, setScanError] = useState<string | null>(null);
  const [scanResult, setScanResult] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [queueLength, setQueueLength] = useState(0);
  const [confirmedStatus, setConfirmedStatus] = useState<
    "CONFIRMED" | "PENDING" | null
  >(null);

  const hasCamera = useMemo(() => cameras.length > 0, [cameras.length]);

  const stopScanner = useCallback(() => {
    controlsRef.current?.stop();
    controlsRef.current = null;
    setIsScanning(false);
  }, []);

  const submitScan = useCallback(async (barcode: string) => {
    submittingRef.current = true;
    setIsSubmitting(true);
    setConfirmedStatus(null);
    setScanResult(barcode);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), SCAN_TIMEOUT_MS);

    try {
      const res = await fetch(`${env.API_URL}/scanner/scan`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ barcode }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (res.ok) {
        const json = (await res.json()) as ScanResponse;
        if (json.reservation) {
          setConfirmedStatus(json.reservation.status);
          toast.success("Tiket berhasil dikonfirmasi.");
        } else {
          toast.error("Respon scanner tidak valid.");
        }
        return;
      }

      if (res.status === 404) {
        toast.error("Barcode tidak ditemukan.");
        return;
      }

      const json = (await res.json().catch(() => null)) as ScanResponse | null;
      if (json?.error === "VALIDATION_ERROR") {
        toast.error("Barcode tidak valid.");
        return;
      }

      toast.error("Gagal mengonfirmasi tiket.");
    } catch (error) {
      clearTimeout(timeoutId);
      if (error instanceof Error && error.name === "AbortError") {
        toast.error("Koneksi timeout. Coba scan ulang.");
      } else {
        const message =
          error instanceof Error ? error.message : "Gagal mengonfirmasi tiket.";
        toast.error(message);
      }
    } finally {
      submittingRef.current = false;
      setIsSubmitting(false);
    }
  }, []);

  const processQueue = useCallback(async () => {
    if (processingQueueRef.current || submittingRef.current) return;
    processingQueueRef.current = true;

    while (scanQueueRef.current.length > 0) {
      const nextBarcode = scanQueueRef.current.shift()!;
      setQueueLength(scanQueueRef.current.length);
      await submitScan(nextBarcode);
    }

    processingQueueRef.current = false;
    setQueueLength(0);
  }, [submitScan]);

  const enqueueScan = useCallback(
    (barcode: string) => {
      // Dedup: skip if already in queue
      if (scanQueueRef.current.includes(barcode)) return;

      // Dedup: skip if same barcode scanned recently
      const now = Date.now();
      const last = lastScanRef.current;
      if (last?.value === barcode && now - last.at < 2500) return;

      lastScanRef.current = { value: barcode, at: now };
      scanQueueRef.current.push(barcode);
      setQueueLength(scanQueueRef.current.length);
      void processQueue();
    },
    [processQueue],
  );

  const startScanner = useCallback(async () => {
    if (!readerRef.current || !videoRef.current) return;
    stopScanner();
    setScanError(null);
    setScanResult("");
    setIsScanning(true);

    try {
      controlsRef.current = await readerRef.current.decodeFromVideoDevice(
        selectedCamera || undefined,
        videoRef.current,
        (result, error) => {
          if (result) {
            const text = result.getText();
            enqueueScan(text);
            return;
          }
          if (error && error.name !== "NotFoundException") {
            setScanError(error.message || "Gagal memindai.");
          }
        },
      );
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Gagal memulai scanner.";
      setScanError(message);
      console.log(scanError);
      setIsScanning(false);
    }
  }, [selectedCamera, stopScanner, enqueueScan]);

  useEffect(() => {
    readerRef.current = new BrowserMultiFormatReader();

    return () => {
      controlsRef.current?.stop();
    };
  }, []);

  useEffect(() => {
    const loadCameras = async () => {
      if (!readerRef.current) return;
      try {
        setScanError(null);
        const devices = await BrowserMultiFormatReader.listVideoInputDevices();
        const mapped = devices.map((device, idx) => ({
          deviceId: device.deviceId,
          label: device.label || `Kamera ${idx + 1}`,
        }));
        setCameras(mapped);
        if (!selectedCamera && mapped[0]) {
          setSelectedCamera(mapped[0].deviceId);
        }
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : "Tidak bisa mengakses kamera.";
        setScanError(message);
        setCameras([]);
      }
    };

    void loadCameras();
  }, [selectedCamera]);

  useEffect(() => {
    if (!selectedCamera || !hasCamera) return;

    // Auto-start on initial load
    if (autoStartRef.current) {
      autoStartRef.current = false;
      void startScanner();
      return;
    }

    // Restart scanner when camera changes while scanning
    if (isScanning) {
      void startScanner();
    }
  }, [hasCamera, selectedCamera, startScanner, isScanning]);

  return (
    <section className="flex min-h-screen w-full flex-col items-center bg-[#F6F5F1] px-4 pt-12 pb-10 text-[#1F1F1F]">
      <div className="mt-6 w-full max-w-md">
        <div className="mt-8 text-center">
          <h1 className="font-body text-3xl font-semibold">Scan QR</h1>
          <p className="mt-2 text-sm text-[#5A5A5A]">
            Scan QR tiket di dalam frame untuk mengonfirmasi kehadiran.
          </p>
          <a href="/dashboard">
            <h2 className="font-body mt-3 text-xl font-semibold text-blue-500 underline">
              Kembali ke Dashboard
            </h2>
          </a>
        </div>

        <div className="relative mt-8 overflow-hidden rounded-[36px] border border-[#E3E1DA] bg-white p-6 shadow-[0_30px_70px_rgba(31,31,31,0.08)]">
          <div className="relative h-[360px] w-full overflow-hidden rounded-[28px] border border-[#E9E6DE] bg-[#111111]">
            <video
              ref={videoRef}
              className="absolute inset-0 h-full w-full object-cover opacity-90"
              muted
              playsInline
            />
            <div className="pointer-events-none absolute inset-8 rounded-[22px] border border-white/25" />
            <div className="pointer-events-none absolute inset-8">
              <span className="absolute top-0 left-0 h-6 w-6 border-t-4 border-l-4 border-white/85" />
              <span className="absolute top-0 right-0 h-6 w-6 border-t-4 border-r-4 border-white/85" />
              <span className="absolute bottom-0 left-0 h-6 w-6 border-b-4 border-l-4 border-white/85" />
              <span className="absolute right-0 bottom-0 h-6 w-6 border-r-4 border-b-4 border-white/85" />
            </div>
            <div className="scanner-line" />
          </div>
          {/* 
          <div className="mt-5 space-y-3 text-sm text-[#5A5A5A]">
            {!hasCamera ? (
              <p>Kamera tidak ditemukan. Pastikan izin kamera aktif.</p>
            ) : null}
            {scanError ? <p className="text-[#B76E50]">{scanError}</p> : null}
          </div> */}
        </div>

        <div className="mt-6 rounded-[28px] border border-[#E3E1DA] bg-white p-5 shadow-[0_25px_50px_rgba(31,31,31,0.08)]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-[#7A7A7A]">Status Scan</p>
              <p className="mt-1 text-lg font-semibold text-[#1F1F1F]">
                {confirmedStatus === "CONFIRMED" ? "Sudah Hadir" : "Terdaftar"}
              </p>
            </div>
            <button
              className="rounded-full border border-[#D8D5CD] bg-[#F4F2EC] px-4 py-2 text-xs font-semibold text-[#2A2A2A] transition hover:bg-[#ECE9E2] disabled:opacity-60"
              onClick={() => (isScanning ? stopScanner() : void startScanner())}
              disabled={!hasCamera || isSubmitting}
            >
              {isScanning ? "Berhenti" : "Mulai"}
            </button>
          </div>
          <div className="mt-4 space-y-2 text-sm text-[#5A5A5A]">
            <div className="flex items-center justify-between">
              <span>Barcode</span>
              <span className="font-semibold text-[#1F1F1F]">
                {scanResult || "-"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>Mode</span>
              <span className="font-semibold text-[#1F1F1F]">
                {isSubmitting
                  ? queueLength > 0
                    ? `Mengirim... (${queueLength} antrian)`
                    : "Mengirim..."
                  : "Otomatis"}
              </span>
            </div>
            {queueLength > 0 && !isSubmitting && (
              <div className="flex items-center justify-between">
                <span>Antrian</span>
                <span className="font-semibold text-amber-600">
                  {queueLength} scan tertunda
                </span>
              </div>
            )}
          </div>

          <div className="mt-4">
            <label className="text-xs text-[#7A7A7A]">Pilih Kamera</label>
            <select
              className="mt-2 w-full rounded-2xl border border-[#D8D5CD] bg-[#F9F7F2] px-3 py-2 text-sm text-[#2A2A2A]"
              value={selectedCamera}
              onChange={(event) => setSelectedCamera(event.target.value)}
              disabled={!hasCamera}
            >
              {cameras.map((camera) => (
                <option key={camera.deviceId} value={camera.deviceId}>
                  {camera.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </section>
  );
}
