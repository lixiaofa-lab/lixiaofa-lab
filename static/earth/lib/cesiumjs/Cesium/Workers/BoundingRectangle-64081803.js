define(["exports","./when-cbf8cd21","./Check-35e1a91d","./Cartesian2-44433f55","./Transforms-2c07936e"],function(t,f,e,h,a){"use strict";function o(t,e,n,i){this.x=f.defaultValue(t,0),this.y=f.defaultValue(e,0),this.width=f.defaultValue(n,0),this.height=f.defaultValue(i,0)}o.packedLength=4,o.pack=function(t,e,n){return n=f.defaultValue(n,0),e[n++]=t.x,e[n++]=t.y,e[n++]=t.width,e[n]=t.height,e},o.unpack=function(t,e,n){return e=f.defaultValue(e,0),f.defined(n)||(n=new o),n.x=t[e++],n.y=t[e++],n.width=t[e++],n.height=t[e],n},o.fromPoints=function(t,e){if(f.defined(e)||(e=new o),!f.defined(t)||0===t.length)return e.x=0,e.y=0,e.width=0,e.height=0,e;for(var n=t.length,i=t[0].x,h=t[0].y,r=t[0].x,a=t[0].y,d=1;d<n;d++)var u=t[d],c=u.x,u=u.y,i=Math.min(c,i),r=Math.max(c,r),h=Math.min(u,h),a=Math.max(u,a);return e.x=i,e.y=h,e.width=r-i,e.height=a-h,e};var r=new a.GeographicProjection,d=new h.Cartographic,u=new h.Cartographic;o.fromRectangle=function(t,e,n){if(f.defined(n)||(n=new o),!f.defined(t))return n.x=0,n.y=0,n.width=0,n.height=0,n;var i=(e=f.defaultValue(e,r)).project(h.Rectangle.southwest(t,d)),t=e.project(h.Rectangle.northeast(t,u));return h.Cartesian2.subtract(t,i,t),n.x=i.x,n.y=i.y,n.width=t.x,n.height=t.y,n},o.clone=function(t,e){if(f.defined(t))return f.defined(e)?(e.x=t.x,e.y=t.y,e.width=t.width,e.height=t.height,e):new o(t.x,t.y,t.width,t.height)},o.union=function(t,e,n){f.defined(n)||(n=new o);var i=Math.min(t.x,e.x),h=Math.min(t.y,e.y),r=Math.max(t.x+t.width,e.x+e.width),e=Math.max(t.y+t.height,e.y+e.height);return n.x=i,n.y=h,n.width=r-i,n.height=e-h,n},o.expand=function(t,e,n){n=o.clone(t,n);var i=e.x-n.x,t=e.y-n.y;return i>n.width?n.width=i:i<0&&(n.width-=i,n.x=e.x),t>n.height?n.height=t:t<0&&(n.height-=t,n.y=e.y),n},o.intersect=function(t,e){var n=t.x,i=t.y,h=e.x,r=e.y;return n>h+e.width||n+t.width<h||i+t.height<r||i>r+e.height?a.Intersect.OUTSIDE:a.Intersect.INTERSECTING},o.equals=function(t,e){return t===e||f.defined(t)&&f.defined(e)&&t.x===e.x&&t.y===e.y&&t.width===e.width&&t.height===e.height},o.prototype.clone=function(t){return o.clone(this,t)},o.prototype.intersect=function(t){return o.intersect(this,t)},o.prototype.equals=function(t){return o.equals(this,t)},t.BoundingRectangle=o});
