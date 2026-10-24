"use client";

import { useEffect, useRef } from "react";

const VERT = `attribute vec2 a;uniform float T;uniform float A;uniform float D;uniform vec2 M;varying float vH;varying float vF;varying float vX;
void main(){
  float x=a.x*10.,z=a.y*6.-1.5,t=T*.55;
  float y=.42*sin(x*.45+t)+.22*sin(z*.9-t*.8+x*.25)+.12*sin((x+z)*1.35+t*1.4)+.06*sin(x*2.1-z*1.7+t*2.);
  vec2 mp=vec2((M.x-.5)*8.,(1.-M.y)*4.-1.);
  float dm=length(vec2(x,z)-mp); y+=.25*exp(-dm*dm*.25)*sin(dm*2.5-T*3.);
  vH=y; vec3 eye=vec3(0.,1.55,6.2); vec3 v=vec3(x,y,z)-eye;
  float ang=.25,ca=cos(ang),sa=sin(ang);
  vec3 c=vec3(v.x,v.y*ca-v.z*sa,v.y*sa+v.z*ca);
  float w=-c.z,f=2.1;
  vF=clamp(1.-(w-3.)/10.,0.,1.)*smoothstep(1.,.75,a.x)*smoothstep(-1.,-.15,a.x);
  gl_Position=vec4(c.x*f/A+.32*w,c.y*f+.05*w,0.,w);
  vX=(c.x*f/A+.32*w)/w;
  gl_PointSize=D*3.*(6./w);
}`;

const FRAG = `precision mediump float;varying float vH;varying float vF;varying float vX;
void main(){
  float d=length(gl_PointCoord-.5); float a=smoothstep(.5,.05,d);
  float k=clamp((vH+.5)/1.,0.,1.);
  vec3 c=mix(vec3(.071,.408,.91),vec3(.51,.75,1.),k); c=mix(c,vec3(1.),pow(k,4.)*.6);
  gl_FragColor=vec4(c,a*vF*(.55+.45*k)*smoothstep(-.3,.2,vX));
}`;

export default function HeroOcean({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", { antialias: false, alpha: true, premultipliedAlpha: false });
    if (!gl) return; // the CSS background stays as the fallback

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

    // grid of points (fewer on phones)
    const small = window.innerWidth < 700;
    const NX = small ? 150 : 260;
    const NZ = small ? 80 : 120;
    const pts = new Float32Array(NX * NZ * 2);
    let k = 0;
    for (let z = 0; z < NZ; z++) {
      for (let x = 0; x < NX; x++) {
        pts[k++] = (x / (NX - 1)) * 2 - 1;
        pts[k++] = z / (NZ - 1);
      }
    }
    const count = NX * NZ;

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, pts, gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "a");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE);

    const uT = gl.getUniformLocation(prog, "T");
    const uA = gl.getUniformLocation(prog, "A");
    const uD = gl.getUniformLocation(prog, "D");
    const uM = gl.getUniformLocation(prog, "M");

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 };
    const host = canvas.parentElement ?? canvas;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      mouse.tx = (e.clientX - r.left) / r.width;
      mouse.ty = 1 - (e.clientY - r.top) / r.height;
    };

    const resize = () => {
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
      gl.uniform1f(uT, (now - start) / 1000);
      gl.uniform1f(uA, canvas.width / canvas.height);
      gl.uniform1f(uD, dpr);
      gl.uniform2f(uM, mouse.x, mouse.y);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.POINTS, 0, count);
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
