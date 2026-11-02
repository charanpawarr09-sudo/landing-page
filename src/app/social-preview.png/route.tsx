import { ImageResponse } from 'next/og';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { BrandMark } from '@/components/brand-mark';
export const dynamic = 'force-static';
const size = {width:1200,height:630};
export async function GET() {
  // The image renderer reads OpenType/TTF; browser WOFF2 files are unsupported.
  const font=new Uint8Array(await readFile(join(process.cwd(),'node_modules/next/dist/compiled/@vercel/og/Geist-Regular.ttf'))).buffer;
  return new ImageResponse(<div style={{display:'flex',flexDirection:'column',width:'100%',height:'100%',padding:'62px 72px',background:'#f5f6f8',color:'#111214',fontFamily:'Geist'}}>
    <div style={{display:'flex',alignItems:'center',gap:15,fontSize:31,fontWeight:600}}><BrandMark width={41} height={44}/><span>Repairnox.</span></div>
    <div style={{display:'flex',flexDirection:'column',marginTop:69,fontSize:83,letterSpacing:'-5px',lineHeight:1.04,fontWeight:600}}><span>Your repair shop.</span><span style={{color:'#717b89'}}>Working as one.</span></div>
    <div style={{display:'flex',alignItems:'center',marginTop:'auto',paddingTop:26,borderTop:'1px solid #dce1e7',fontSize:22,color:'#596476'}}>Repair tickets. Technicians. Parts. Checkout.</div>
  </div>,{...size,fonts:[{name:'Geist',data:font,style:'normal',weight:600}]});
}
