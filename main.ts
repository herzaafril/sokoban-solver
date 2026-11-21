import f from'fs';
let s=t=>{let w=t.indexOf('\n'),T=t.replace(/\n/g,''),n=T.length,A=new Uint8Array(n),B=[],P=0;
[...T].map((c,i)=>{A[i]=c=='#';if(c=='$'||c=='*')B.push(i);if(c=='@'||c=='+')P=i});
let D=[-w,w,-1,1],V=new Int32Array(n),Y=new Int32Array(n).fill(-1),H=[],O=new Uint8Array(n),e=0,l,J,K;
let M=[[],[],[],[]];
for(let x of B)M[((x/w|0)>8)*2+(x%w>7)].push(x);
let F=p=>{for(let k=0;k<4;k++){let u=p+D[k];if(!A[u]&&!O[u]&&V[u]!=e){V[u]=e;Y[u]=p;H[u]='udlr'[k];if(u<l)l=u;F(u)}}};
let R=p=>{V[p]=++e;Y[p]=-1;l=p;F(p);return l};
let b=(g,p)=>{let Q=[[g,p,'']],X=new Set();
g.map(x=>O[x]=1);X.add(g+':'+R(p));g.map(x=>O[x]=0);
for(let h=0;h<Q.length&&Q.length<2e5;h++){let[c,pl,mv]=Q[h];
if(c.every(x=>T[x]>'%'&&T[x]<'@')){J=c;K=pl;return mv}
c.map(x=>O[x]=1);R(pl);let z=e,u=[];
c.forEach((q,i)=>{for(let k=0;k<4;k++){let d=D[k],v=q+d;
if(V[q-d]!=z||A[v]||O[v]||(v/w|0)==8)continue;
u.push([i,k])}});
for(let[i,k]of u){let q=c[i],d=D[k],v=q+d;
O[q]=0;O[v]=1;let n2=c.slice();n2[i]=v;n2.sort((a,b)=>a-b);let y=n2+':'+R(q);O[v]=0;O[q]=1;
if(X.has(y))continue;
R(pl);let w2='';for(let u2=q-d;u2>=0&&u2!=pl;u2=Y[u2])w2=H[u2]+w2;
X.add(y);Q.push([n2,q,mv+w2+'UDLR'[k]])}
c.map(x=>O[x]=0)}
return null};
let m='',p=P;
M.map(r=>r.map(x=>A[x]=1));
for(let r of M){r.map(x=>A[x]=0);let z=b(r,p);if(z==null)return'';J.map(x=>A[x]=1);m+=z;p=K}
return m};
for(let k=1;k<6;k++){let d='i00'+k,x='';try{x=s(f.readFileSync('/input/'+d+'/level.txt')+'')}catch{}f.mkdirSync('/output/'+d);f.writeFileSync('/output/'+d+'/solution.txt',x)}
