define(["exports","./when-cbf8cd21","./Check-35e1a91d","./Math-e66fad2a","./Cartesian2-44433f55","./Transforms-2c07936e","./ComponentDatatype-7ee14e67","./GeometryAttribute-c0a0086e","./GeometryAttributes-90846c5f","./IndexDatatype-66caba23","./GeometryOffsetAttribute-84f7eff3","./VertexFormat-cc24f342","./CylinderGeometryLibrary-297cfdf0"],function(t,P,e,k,M,z,E,N,I,U,S,m,B){"use strict";var Y=new M.Cartesian2,Z=new M.Cartesian3,J=new M.Cartesian3,W=new M.Cartesian3,j=new M.Cartesian3;function u(t){var e=(t=P.defaultValue(t,P.defaultValue.EMPTY_OBJECT)).length,a=t.topRadius,r=t.bottomRadius,n=P.defaultValue(t.vertexFormat,m.VertexFormat.DEFAULT),o=P.defaultValue(t.slices,128);this._length=e,this._topRadius=a,this._bottomRadius=r,this._vertexFormat=m.VertexFormat.clone(n),this._slices=o,this._offsetAttribute=t.offsetAttribute,this._workerName="createCylinderGeometry"}u.packedLength=m.VertexFormat.packedLength+5,u.pack=function(t,e,a){return a=P.defaultValue(a,0),m.VertexFormat.pack(t._vertexFormat,e,a),a+=m.VertexFormat.packedLength,e[a++]=t._length,e[a++]=t._topRadius,e[a++]=t._bottomRadius,e[a++]=t._slices,e[a]=P.defaultValue(t._offsetAttribute,-1),e};var a,f=new m.VertexFormat,p={vertexFormat:f,length:void 0,topRadius:void 0,bottomRadius:void 0,slices:void 0,offsetAttribute:void 0};u.unpack=function(t,e,a){e=P.defaultValue(e,0);var r=m.VertexFormat.unpack(t,e,f);e+=m.VertexFormat.packedLength;var n=t[e++],o=t[e++],i=t[e++],s=t[e++],e=t[e];return P.defined(a)?(a._vertexFormat=m.VertexFormat.clone(r,a._vertexFormat),a._length=n,a._topRadius=o,a._bottomRadius=i,a._slices=s,a._offsetAttribute=-1===e?void 0:e,a):(p.length=n,p.topRadius=o,p.bottomRadius=i,p.slices=s,p.offsetAttribute=-1===e?void 0:e,new u(p))},u.createGeometry=function(t){var e=t._length,a=t._topRadius,r=t._bottomRadius,n=t._vertexFormat,o=t._slices;if(!(e<=0||a<0||r<0||0===a&&0===r)){var i=o+o,s=o+i,m=i+i,u=B.CylinderGeometryLibrary.computePositions(e,a,r,o,!0),f=n.st?new Float32Array(2*m):void 0,p=n.normal?new Float32Array(3*m):void 0,d=n.tangent?new Float32Array(3*m):void 0,y=n.bitangent?new Float32Array(3*m):void 0,l=n.normal||n.tangent||n.bitangent;if(l){var c=n.tangent||n.bitangent,b=0,v=0,A=0,g=Math.atan2(r-a,e),h=Z;h.z=Math.sin(g);for(var x=Math.cos(g),_=W,C=J,F=0;F<o;F++){var w=F/o*k.CesiumMath.TWO_PI,G=x*Math.cos(w),w=x*Math.sin(w);l&&(h.x=G,h.y=w,c&&(_=M.Cartesian3.normalize(M.Cartesian3.cross(M.Cartesian3.UNIT_Z,h,_),_)),n.normal&&(p[b++]=h.x,p[b++]=h.y,p[b++]=h.z,p[b++]=h.x,p[b++]=h.y,p[b++]=h.z),n.tangent&&(d[v++]=_.x,d[v++]=_.y,d[v++]=_.z,d[v++]=_.x,d[v++]=_.y,d[v++]=_.z),n.bitangent&&(C=M.Cartesian3.normalize(M.Cartesian3.cross(h,_,C),C),y[A++]=C.x,y[A++]=C.y,y[A++]=C.z,y[A++]=C.x,y[A++]=C.y,y[A++]=C.z))}for(F=0;F<o;F++)n.normal&&(p[b++]=0,p[b++]=0,p[b++]=-1),n.tangent&&(d[v++]=1,d[v++]=0,d[v++]=0),n.bitangent&&(y[A++]=0,y[A++]=-1,y[A++]=0);for(F=0;F<o;F++)n.normal&&(p[b++]=0,p[b++]=0,p[b++]=1),n.tangent&&(d[v++]=1,d[v++]=0,d[v++]=0),n.bitangent&&(y[A++]=0,y[A++]=1,y[A++]=0)}var g=12*o-12,D=U.IndexDatatype.createTypedArray(m,g),R=0,V=0;for(F=0;F<o-1;F++)D[R++]=V,D[R++]=V+2,D[R++]=V+3,D[R++]=V,D[R++]=V+3,D[R++]=V+1,V+=2;for(D[R++]=i-2,D[R++]=0,D[R++]=1,D[R++]=i-2,D[R++]=1,D[R++]=i-1,F=1;F<o-1;F++)D[R++]=i+F+1,D[R++]=i+F,D[R++]=i;for(F=1;F<o-1;F++)D[R++]=s,D[R++]=s+F,D[R++]=s+F+1;var T=0;if(n.st){var O=Math.max(a,r);for(F=0;F<m;F++){var L=M.Cartesian3.fromArray(u,3*F,j);f[T++]=(L.x+O)/(2*O),f[T++]=(L.y+O)/(2*O)}}g=new I.GeometryAttributes;n.position&&(g.position=new N.GeometryAttribute({componentDatatype:E.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:u})),n.normal&&(g.normal=new N.GeometryAttribute({componentDatatype:E.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:p})),n.tangent&&(g.tangent=new N.GeometryAttribute({componentDatatype:E.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:d})),n.bitangent&&(g.bitangent=new N.GeometryAttribute({componentDatatype:E.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:y})),n.st&&(g.st=new N.GeometryAttribute({componentDatatype:E.ComponentDatatype.FLOAT,componentsPerAttribute:2,values:f})),Y.x=.5*e,Y.y=Math.max(r,a);r=new z.BoundingSphere(M.Cartesian3.ZERO,M.Cartesian2.magnitude(Y));return P.defined(t._offsetAttribute)&&(e=u.length,a=new Uint8Array(e/3),e=t._offsetAttribute===S.GeometryOffsetAttribute.NONE?0:1,S.arrayFill(a,e),g.applyOffset=new N.GeometryAttribute({componentDatatype:E.ComponentDatatype.UNSIGNED_BYTE,componentsPerAttribute:1,values:a})),new N.Geometry({attributes:g,indices:D,primitiveType:N.PrimitiveType.TRIANGLES,boundingSphere:r,offsetAttribute:t._offsetAttribute})}},u.getUnitCylinder=function(){return P.defined(a)||(a=u.createGeometry(new u({topRadius:1,bottomRadius:1,length:1,vertexFormat:m.VertexFormat.POSITION_ONLY}))),a},t.CylinderGeometry=u});
