/* global React */

// Variant A — Centered editorial: massive serif headline above device
const HeroCentered = () => (
  <div style={{
    position: "absolute", inset: 0,
    background: "#0A0F1C",
    color: "#F5F2ED",
    fontFamily: "var(--sans)",
    overflow: "hidden",
    display: "flex",
    flexDirection: "column",
  }}>
    <div style={{
      position:"absolute", inset:0,
      background: "radial-gradient(ellipse 70% 50% at 50% 60%, rgba(30, 91, 255, 0.22), transparent 70%), repeating-linear-gradient(135deg, rgba(255,255,255,0.025) 0 2px, transparent 2px 12px), linear-gradient(180deg, #0A0F1C 0%, #0B2545 100%)"
    }}/>
    <div style={{position:"relative",zIndex:2,padding:"32px 48px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
      <div style={{display:"flex",alignItems:"center",gap:10,fontFamily:"var(--serif)",fontSize:24}}>
        <span style={{width:24,height:24,borderRadius:"50%",background:"radial-gradient(circle at 30% 30%, #4A7BFF, #0B2545 70%)"}}/>
        Flowsonic
      </div>
      <div style={{display:"flex",gap:32,fontSize:13,opacity:0.78}}>
        <span>Challenge</span><span>Technology</span><span>Benefits</span><span>Team</span>
      </div>
      <div style={{padding:"10px 18px",background:"#1E5BFF",borderRadius:999,fontSize:13}}>Request a call →</div>
    </div>

    <div style={{position:"relative",zIndex:2,flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",padding:"40px 48px",textAlign:"center"}}>
      <div style={{fontFamily:"var(--mono)",fontSize:11,letterSpacing:"0.18em",textTransform:"uppercase",color:"rgba(245,242,237,0.6)",marginBottom:32}}>
        ● FLW-01 / FILTRATION UNIT · MK. 02
      </div>
      <h1 style={{
        fontFamily:"var(--serif)",fontSize:"clamp(72px, 11vw, 180px)",
        lineHeight:0.92,letterSpacing:"-0.02em",fontWeight:400,
        margin:"0 0 40px",maxWidth:"15ch"
      }}>
        Catch what filters <span style={{fontStyle:"italic",color:"#4A7BFF"}}>miss.</span>
      </h1>
      <div style={{width:"min(700px, 55%)", marginBottom:48}}>
        <Device stroke="rgba(245,242,237,0.85)" glow={true}/>
      </div>
      <p style={{fontSize:15,maxWidth:480,color:"rgba(245,242,237,0.7)",lineHeight:1.55}}>
        An ultrasonic interception system for industrial water — built for the 1–5&nbsp;mm microplastics today's screens let through.
      </p>
    </div>
  </div>
);

// Variant B — Split: headline left, device right (engineering blueprint feel)
const HeroSplit = () => (
  <div style={{
    position:"absolute", inset:0,
    background: "#F5F2ED",
    color: "#0A0F1C",
    fontFamily:"var(--sans)",
    overflow:"hidden",
    display:"flex",
    flexDirection:"column",
  }}>
    <div style={{padding:"32px 48px",display:"flex",justifyContent:"space-between",alignItems:"center",borderBottom:"1px solid rgba(10,15,28,0.12)"}}>
      <div style={{display:"flex",alignItems:"center",gap:10,fontFamily:"var(--serif)",fontSize:24}}>
        <span style={{width:24,height:24,borderRadius:"50%",background:"radial-gradient(circle at 30% 30%, #4A7BFF, #0B2545 70%)"}}/>
        Flowsonic
      </div>
      <div style={{display:"flex",gap:32,fontSize:13,opacity:0.78}}>
        <span>Challenge</span><span>Technology</span><span>Benefits</span><span>Team</span>
      </div>
      <div style={{padding:"10px 18px",background:"#0A0F1C",color:"#F5F2ED",borderRadius:999,fontSize:13}}>Request a call →</div>
    </div>

    <div style={{flex:1,display:"grid",gridTemplateColumns:"1fr 1fr",gap:0}}>
      <div style={{padding:"60px 48px",display:"flex",flexDirection:"column",justifyContent:"space-between",borderRight:"1px solid rgba(10,15,28,0.12)"}}>
        <div>
          <div style={{fontFamily:"var(--mono)",fontSize:11,letterSpacing:"0.18em",textTransform:"uppercase",color:"#6B7280",marginBottom:24}}>
            ● Industrial Water · 1–5 mm
          </div>
          <h1 style={{
            fontFamily:"var(--serif)",fontSize:"clamp(56px, 7.5vw, 130px)",
            lineHeight:0.92,letterSpacing:"-0.02em",fontWeight:400,margin:0
          }}>
            Catch what filters <span style={{fontStyle:"italic",color:"#1E5BFF"}}>miss.</span>
          </h1>
        </div>
        <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:24,paddingTop:24,borderTop:"1px solid rgba(10,15,28,0.12)"}}>
          <div>
            <div style={{fontFamily:"var(--mono)",fontSize:10,letterSpacing:"0.14em",color:"#6B7280",marginBottom:8}}>CAPTURE</div>
            <div style={{fontFamily:"var(--serif)",fontSize:32}}>92<span style={{fontSize:18,color:"#1E5BFF",fontStyle:"italic"}}>%</span></div>
          </div>
          <div>
            <div style={{fontFamily:"var(--mono)",fontSize:10,letterSpacing:"0.14em",color:"#6B7280",marginBottom:8}}>MAINTENANCE</div>
            <div style={{fontFamily:"var(--serif)",fontSize:32}}>−50<span style={{fontSize:18,color:"#1E5BFF",fontStyle:"italic"}}>%</span></div>
          </div>
          <div>
            <div style={{fontFamily:"var(--mono)",fontSize:10,letterSpacing:"0.14em",color:"#6B7280",marginBottom:8}}>FLOW</div>
            <div style={{fontFamily:"var(--serif)",fontSize:32}}>120<span style={{fontSize:14,color:"#6B7280",marginLeft:4}}>m³/h</span></div>
          </div>
        </div>
      </div>
      <div style={{
        position:"relative",
        background:"#0A0F1C",
        display:"flex",alignItems:"center",justifyContent:"center",
        overflow:"hidden",
      }}>
        <div style={{
          position:"absolute",inset:0,
          background:"repeating-linear-gradient(0deg, rgba(255,255,255,0.04) 0 1px, transparent 1px 40px), repeating-linear-gradient(90deg, rgba(255,255,255,0.04) 0 1px, transparent 1px 40px)"
        }}/>
        <div style={{position:"absolute",top:20,left:20,fontFamily:"var(--mono)",fontSize:10,color:"rgba(245,242,237,0.5)",letterSpacing:"0.14em"}}>FIG. 01 / FLW-01</div>
        <div style={{position:"absolute",bottom:20,right:20,fontFamily:"var(--mono)",fontSize:10,color:"rgba(245,242,237,0.5)",letterSpacing:"0.14em"}}>SCALE 1:8</div>
        <div style={{width:"85%",position:"relative",zIndex:1}}>
          <Device stroke="rgba(245,242,237,0.85)" glow={true}/>
        </div>
      </div>
    </div>
  </div>
);

// Variant C — Bone background, inverted: light hero with device shot dominating
const HeroLight = () => (
  <div style={{
    position:"absolute", inset:0,
    background:"#F5F2ED",
    color:"#0A0F1C",
    fontFamily:"var(--sans)",
    overflow:"hidden",
    display:"flex",
    flexDirection:"column",
  }}>
    <div style={{padding:"32px 48px",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
      <div style={{display:"flex",alignItems:"center",gap:10,fontFamily:"var(--serif)",fontSize:24}}>
        <span style={{width:24,height:24,borderRadius:"50%",background:"radial-gradient(circle at 30% 30%, #4A7BFF, #0B2545 70%)"}}/>
        Flowsonic
      </div>
      <div style={{display:"flex",gap:32,fontSize:13,opacity:0.78}}>
        <span>Challenge</span><span>Technology</span><span>Benefits</span><span>Team</span>
      </div>
      <div style={{padding:"10px 18px",background:"#0A0F1C",color:"#F5F2ED",borderRadius:999,fontSize:13}}>Request a call →</div>
    </div>

    <div style={{position:"relative",flex:1,display:"flex",flexDirection:"column",justifyContent:"flex-end",padding:"40px 48px"}}>
      <div style={{
        position:"absolute",
        top:"50%",left:"50%",transform:"translate(-50%,-50%)",
        width:"min(1100px, 80%)",
        zIndex:1,
      }}>
        <Device stroke="#0A0F1C" glow={false}/>
      </div>

      <div style={{position:"absolute",top:120,left:48,fontFamily:"var(--mono)",fontSize:11,letterSpacing:"0.18em",textTransform:"uppercase",color:"#6B7280"}}>
        ● FLW-01 — Mk. 02 / 2026
      </div>
      <div style={{position:"absolute",top:120,right:48,fontFamily:"var(--mono)",fontSize:11,letterSpacing:"0.18em",textTransform:"uppercase",color:"#6B7280",textAlign:"right"}}>
        Active band<br/><span style={{fontFamily:"var(--serif)",fontSize:22,letterSpacing:0,textTransform:"none",color:"#0A0F1C"}}>1–5 mm</span>
      </div>

      <div style={{position:"relative",zIndex:2,display:"grid",gridTemplateColumns:"1fr auto",gap:60,alignItems:"end"}}>
        <h1 style={{
          fontFamily:"var(--serif)",fontSize:"clamp(72px, 10vw, 160px)",
          lineHeight:0.92,letterSpacing:"-0.02em",fontWeight:400,margin:0,maxWidth:"10ch"
        }}>
          Catch what filters <span style={{fontStyle:"italic",color:"#1E5BFF"}}>miss.</span>
        </h1>
        <div style={{maxWidth:300,textAlign:"right"}}>
          <p style={{fontSize:14,color:"#1A2138",lineHeight:1.55,marginBottom:20}}>
            An ultrasonic interception system for industrial water — built for the 1–5&nbsp;mm microplastics today's screens let through.
          </p>
          <div style={{display:"inline-flex",alignItems:"center",gap:10,padding:"12px 22px",background:"transparent",color:"#0A0F1C",border:"1px solid #0A0F1C",borderRadius:999,fontSize:13}}>
            How it works ↓
          </div>
        </div>
      </div>
    </div>
  </div>
);

window.HeroCentered = HeroCentered;
window.HeroSplit = HeroSplit;
window.HeroLight = HeroLight;
