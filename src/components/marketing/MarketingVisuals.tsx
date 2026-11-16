"use client";

import { useId, useState } from "react";
import Image from "next/image";
import {
  BatteryFull,
  Banknote,
  Laptop,
  LockKeyhole,
  ReceiptText,
  Smartphone,
  Star,
  Tablet,
  Timer,
  Wrench,
} from "lucide-react";
import type { MarketingTicket } from "@/lib/marketing-data";

export function BrandMark() {
  return (
    <svg
      width="31"
      height="31"
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
    >
      <rect width="32" height="32" rx="10" fill="currentColor" />
      <path
        d="M9 22V10h6.6c4.4 0 6.2 4.8 2.8 7.1L23 22h-5.2l-4-5.2H13V22H9Z"
        fill="white"
      />
      <path
        d="m20.5 6.5 5 5M25.5 6.5l-5 5"
        stroke="white"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function IconSculpture({ kind }: { kind: string }) {
  const Icon =
    kind === "laptop"
      ? Laptop
      : kind === "tablet"
        ? Tablet
        : kind === "battery"
          ? BatteryFull
          : kind === "tools"
            ? Wrench
            : kind === "ticket"
              ? ReceiptText
              : kind === "cash"
                ? Banknote
                : kind === "speed"
                  ? Timer
                  : kind === "vault"
                    ? LockKeyhole
                    : kind === "review"
                      ? Star
                      : Smartphone;
  return (
    <span className={`rn-sculpture rn-sculpture-${kind}`} aria-hidden="true">
      <Icon strokeWidth={1.7} />
      {kind === "speed" ? <small>30</small> : null}
    </span>
  );
}

export function HeroAsset({
  file,
  kind,
}: {
  file: string | null;
  kind: string;
}) {
  const [failed, setFailed] = useState(false);
  return (
    <>
      <IconSculpture kind={kind} />
      {file && !failed ? (
        <Image
          src={`/marketing/icons/${file}.png`}
          alt=""
          width={96}
          height={96}
          onError={() => setFailed(true)}
          className="rn-icon-asset"
        />
      ) : null}
    </>
  );
}

export function DeviceArtwork({
  kind,
  issue = "screen",
}: {
  kind: MarketingTicket["kind"];
  issue?: string;
}) {
  const id = useId().replaceAll(":", "");
  return (
    <svg
      viewBox="0 0 320 245"
      className={`rn-device-art rn-device-art-${kind}`}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`${id}metal`} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#ededed" />
          <stop offset=".45" stopColor="#82858b" />
          <stop offset="1" stopColor="#d9dadb" />
        </linearGradient>
        <linearGradient id={`${id}glass`} x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="#4b5862" />
          <stop offset=".55" stopColor="#20262d" />
          <stop offset="1" stopColor="#101317" />
        </linearGradient>
        <pattern
          id={`${id}grid`}
          width="20"
          height="20"
          patternUnits="userSpaceOnUse"
        >
          <path d="M20 0H0V20" fill="none" stroke="#fff" opacity=".07" />
        </pattern>
        <filter id={`${id}shadow`} x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="4" dy="14" stdDeviation="10" floodOpacity=".22" />
        </filter>
      </defs>
      <rect x="15" y="20" width="290" height="210" rx="18" fill="#414c4d" />
      <rect
        x="15"
        y="20"
        width="290"
        height="210"
        rx="18"
        fill={`url(#${id}grid)`}
      />
      <path
        d="M32 32h68v27H32zm194 0h63v27h-63z"
        fill="none"
        stroke="#788280"
        strokeWidth="2"
      />
      {kind === "laptop" ? (
        <g transform="rotate(-9 160 130)" filter={`url(#${id}shadow)`}>
          <rect
            x="47"
            y="56"
            width="226"
            height="143"
            rx="10"
            fill={`url(#${id}metal)`}
          />
          <rect x="56" y="65" width="208" height="123" rx="6" fill="#1d2227" />
          {[0, 1, 2].map((n) => (
            <rect
              key={n}
              x={66 + n * 63}
              y="91"
              width="56"
              height="73"
              rx="5"
              fill="#363b40"
              stroke="#58605c"
            />
          ))}
          <path d="M74 80h172M74 172h172" stroke="#747b74" />
          <path d="m244 71 10 11m-10 0 10-11" stroke="#a1a6a3" />
        </g>
      ) : kind === "board" ? (
        <g transform="rotate(-14 160 125)" filter={`url(#${id}shadow)`}>
          <path
            d="M97 56h117v25h20v71h-29v44H92v-68H78V85h19z"
            fill="#376553"
            stroke="#a89b66"
            strokeWidth="3"
          />
          {[0, 1, 2].map((n) => (
            <g key={n}>
              <rect
                x={102 + n * 33}
                y="82"
                width="24"
                height="31"
                fill="#1f2928"
                stroke="#cfbd88"
              />
              <path
                d={`M${104 + n * 33} 123v46h14v-27`}
                stroke="#c0a673"
                fill="none"
              />
            </g>
          ))}
          <circle cx="191" cy="171" r="13" fill="#a4a799" />
        </g>
      ) : kind === "accessory" ? (
        <g transform="rotate(-12 160 120)" filter={`url(#${id}shadow)`}>
          <rect x="72" y="47" width="99" height="157" rx="7" fill="#e6e6df" />
          <rect x="82" y="76" width="79" height="107" rx="10" fill="#a8b8ba" />
          <text x="85" y="65" fill="#333" fontSize="12" fontWeight="700">
            9H GLASS
          </text>
          <rect x="190" y="99" width="62" height="65" rx="13" fill="#f3f0e9" />
          <path d="M205 99V79m27 20V79" stroke="#a8a8a7" strokeWidth="8" />
          <text x="200" y="140" fill="#51514f" fontSize="13">
            30W
          </text>
        </g>
      ) : (
        <g transform="rotate(-15 157 120)" filter={`url(#${id}shadow)`}>
          <rect
            x="105"
            y="31"
            width="108"
            height="191"
            rx="22"
            fill={`url(#${id}metal)`}
          />
          <rect
            x="109"
            y="35"
            width="100"
            height="183"
            rx="19"
            fill="#11171b"
          />
          <rect
            x="114"
            y="40"
            width="90"
            height="173"
            rx="15"
            fill={`url(#${id}glass)`}
          />
          <rect x="142" y="46" width="35" height="10" rx="5" fill="#111" />
          {issue.includes("Battery") ? (
            <>
              <rect
                x="128"
                y="78"
                width="63"
                height="102"
                rx="5"
                fill="#222b29"
                stroke="#7d8b80"
              />
              <path d="M144 184v14m29-14v14" stroke="#e5e5da" strokeWidth="7" />
              <text x="140" y="137" fontSize="25" fill="#91b69e">
                +
              </text>
            </>
          ) : (
            <path
              d="m126 66 27 39-13 26 34-8-7 33 27 36M153 105l28-17 17 4m-58 39-22 21m49 4-35 20"
              fill="none"
              stroke="#b1bdc0"
              strokeWidth="1.25"
              opacity=".7"
            />
          )}
        </g>
      )}
      <g transform="rotate(19 275 170)">
        <rect x="267" y="106" width="8" height="96" rx="4" fill="#b0b9b8" />
        <path d="M271 202v18" stroke="#d5dcda" strokeWidth="3" />
        <path d="M268 123h6m-6 6h6m-6 6h6m-6 6h6" stroke="#515b59" />
      </g>
      <circle cx="52" cy="194" r="13" fill="#717f78" />
      <circle cx="52" cy="194" r="7" fill="#2c3935" />
    </svg>
  );
}

export function StatusBadge({ status }: { status: MarketingTicket["status"] }) {
  return (
    <span
      className={`rn-status rn-status-${status === "Ready for Pickup" ? "ready" : status === "Diagnosing" ? "diagnosing" : "progress"}`}
    >
      <i />
      {status}
    </span>
  );
}

export function ClaimTag({ ticket }: { ticket: MarketingTicket }) {
  return (
    <div className="rn-claim-tag">
      <div className="rn-claim-heading">
        <BrandMark />
        <strong>RepairNox</strong>
        <span>Claim tag</span>
      </div>
      <div className="rn-claim-body">
        <div>
          <small>Work order</small>
          <strong>#{ticket.id}</strong>
          <b>{ticket.device}</b>
          <span>{ticket.issue}</span>
          <small>Keep this tag for collection.</small>
        </div>
        <Image
          src="/marketing/demo-claim-qr.svg"
          width={82}
          height={82}
          alt="QR code linking to the public RepairNox demo"
          unoptimized
        />
      </div>
      <div className="rn-claim-bottom">
        Demo ticket · No customer credentials printed
      </div>
    </div>
  );
}
