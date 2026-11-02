"use client";
import { useMarketing } from './marketing-provider';
const labels = {instagram:'Instagram',facebook:'Facebook',linkedin:'LinkedIn'};
export function SocialAction({platform,children}:{platform:keyof typeof labels;children:React.ReactNode}) {
  const {openPanel}=useMarketing();
  return <button className="icon-button social-button" type="button" aria-label={`${labels[platform]} — coming soon`} aria-haspopup="dialog" onClick={()=>openPanel({kind:'social',network:labels[platform]})}>{children}</button>;
}
