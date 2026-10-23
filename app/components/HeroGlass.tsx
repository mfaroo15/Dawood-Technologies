"use client";

import { useEffect, useRef } from "react";

const VERT = "attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}";

const FRAG = `precision highp float;uniform vec2 R;uniform float T;uniform vec2 M;
mat2 rot(float a){float c=cos(a),s=sin(a);return mat2(c,-s,s,c);}
float sdRB(vec3 p,vec3 b,float r){vec3 q=abs(p)-b+r;return length(max(q,0.))+min(max(q.x,max(q.y,q.z)),0.)-r;}
float sdTorus(vec3 p,vec2 t){vec2 q=vec2(length(p.xz)-t.x,p.y);return length(q)-t.y;}
float smin(float a,float b,float k){float h=clamp(.5+.5*(b-a)/k,0.,1.);return mix(b,a,h)-k*h*(1.-h);}
float map(vec3 p){
  float t=T*.22;
  p.xz*=rot(t+(M.x-.5)*.8); p.yz*=rot(.45+sin(t*.7)*.25+(M.y-.5)*.5);
  vec3 q=p; float tw=sin(t*.9)*.9; q.xz*=rot(q.y*tw);
  float box=sdRB(q,vec3(.6),.2);
  vec3 o=p; o.xy*=rot(.9); o.yz*=rot(t*1.3);
  float ring=sdTorus(o,vec2(1.12,.05));
  return smin(box,ring,.12);
}
vec3 nrm(vec3 p){vec2 e=vec2(.0015,0.);return normalize(vec3(map(p+e.xyy)-map(p-e.xyy),map(p+e.yxy)-map(p-e.yxy),map(p+e.yyx)-map(p-e.yyx)));}
vec3 env(vec3 d){
  vec3 c=vec3(.05,.075,.13);
  c+=vec3(.071,.408,.91)*pow(max(0.,d.x*.55+d.y*.35+.3),2.)*2.;
  c+=vec3(.51,.75,1.)*smoothstep(.75,.97,d.y)*2.4;
  c+=vec3(.29,.65,1.)*smoothstep(.85,.98,-d.x*.8+d.y*.2)*2.2;
  float strips=smoothstep(.82,.86,abs(sin(d.x*3.2+d.z*1.6)))*smoothstep(-.1,.5,d.y);
  c+=vec3(.6,.8,1.)*strips*1.1;
  c+=vec3(1.)*pow(max(0.,dot(d,normalize(vec3(-.5,.75,.45)))),90.)*4.;
  return c;
}
float march(vec3 ro,vec3 rd,float s){float t=0.;for(int i=0;i<90;i++){float d=map(ro+rd*t)*s;if(d<.0012)return t;t+=d;if(t>9.)break;}return -1.;}
void main(){
  vec2 uv=gl_FragCoord.xy/R;
  float side=R.x>R.y*1.2?.69:.5;
  vec2 p=(gl_FragCoord.xy-vec2(side,.5)*R)/R.y;
  vec3 ro=vec3(0.,0.,5.),rd=normalize(vec3(p,-1.75));
  vec3 bg=vec3(.043,.059,.09)+vec3(.071,.408,.91)*.32*exp(-dot(p,p)*2.2)+vec3(.29,.65,1.)*.06*exp(-dot(p-vec2(.4,-.3),p-vec2(.4,-.3))*3.);
  vec3 col=bg;
  float t=march(ro,rd,1.);
  if(t>0.){
    vec3 pos=ro+rd*t,n=nrm(pos);
    float fr=pow(1.+dot(rd,n),3.5)*.92+.06;
    vec3 refl=env(reflect(rd,n));
    vec3 refr=vec3(0.);
    for(int k=0;k<3;k++){
      float eta=1./(1.42+float(k)*.03);
      vec3 r1=refract(rd,n,eta);
      vec3 pi=pos-n*.004;
      float ti=march(pi,r1,-1.);
      vec3 ex=pi+r1*max(ti,0.);
      vec3 n2=-nrm(ex);
      vec3 r2=refract(r1,n2,1./eta);
      if(dot(r2,r2)<.01)r2=reflect(r1,n2);
      vec3 e=env(r2)*exp(-max(ti,0.)*vec3(.9,.45,.2));
      refr[k]=e[k];
    }
    col=mix(refr*vec3(.75,.9,1.1),refl,fr);
    col+=vec3(.45,.72,1.)*pow(1.-abs(dot(rd,n)),4.)*.6;
  }
  float ground=smoothstep(.05,-.65,p.y);
  col+=vec3(.071,.408,.91)*.06*ground;
  col*=1.-.3*length((uv-vec2(side,.5))*vec2(1.,1.25));
  col=col/(1.+col*.35);
  col=pow(col,vec3(.95));
  gl_FragColor=vec4(col+(fract(sin(dot(gl_FragCoord.xy,vec2(12.9898,78.233)))*43758.5453)-.5)*.025,1.);
}`;

export default function HeroGlass({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", { antialias: false, premultipliedAlpha: false });
    if (!gl) return; // CSS background stays as the fallback

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s) || "shader error");
      return s;
    };

    let prog: WebGLProgram;
    try {
      prog = gl.createProgram()!;
      gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
      gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
      gl.linkProgram(prog);
      if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(prog) || "link error");
    } catch (err) {
      console.error(err);
      return;
    }
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "p");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uR = gl.getUniformLocation(prog, "R");
    const uT = gl.getUniformLocation(prog, "T");
    const uM = gl.getUniformLocation(prog, "M");

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };
    const host = canvas.parentElement ?? canvas;

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.tx = (e.clientX - r.left) / r.width;
      mouse.ty = 1 - (e.clientY - r.top) / r.height;
    };

    const resize = () => {
      // render below native resolution: the glass stays smooth and the GPU stays cool
      const scale = window.innerWidth < 700 ? 0.55 : 0.85;
      const dpr = Math.min(window.devicePixelRatio || 1, 2) * scale;
      const r = canvas.getBoundingClientRect();
      canvas.width = Math.max(1, Math.round(r.width * dpr));
      canvas.height = Math.max(1, Math.round(r.height * dpr));
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    const start = performance.now();
    let first = true;
    const draw = (now: number) => {
      mouse.x += (mouse.tx - mouse.x) * 0.05;
      mouse.y += (mouse.ty - mouse.y) * 0.05;
      gl.uniform2f(uR, canvas.width, canvas.height);
      gl.uniform1f(uT, (now - start) / 1000);
      gl.uniform2f(uM, mouse.x, mouse.y);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      if (first) {
        first = false;
        canvas.style.opacity = "1";
      }
    };

    let visible = true;
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(canvas);

    let raf = 0;
    const loop = (now: number) => {
      if (visible && !document.hidden) draw(now);
      raf = requestAnimationFrame(loop);
    };

    const onResize = () => {
      resize();
      if (reduce) draw(start + 20000);
    };

    resize();
    host.addEventListener("pointermove", onMove as EventListener);
    window.addEventListener("resize", onResize);
    if (reduce) draw(start + 20000);
    else raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      host.removeEventListener("pointermove", onMove as EventListener);
      window.removeEventListener("resize", onResize);
      gl.getExtension("WEBGL_lose_context")?.loseContext();
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className={className}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block", opacity: 0, transition: "opacity 0.8s ease" }}
    />
  );
}
