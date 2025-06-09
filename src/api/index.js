const BASE = "/api";              // 프록시 prefix

export const getProducts = async (type, params = {}) => {
   const qs = new URLSearchParams(params).toString();
   const url = `${BASE}/${type}${qs ? `?${qs}` : ""}`;   // ✅ /api/shoes
   const res = await fetch(url);
   if (!res.ok)
     throw new Error(`Fetch error: ${res.status}`);      // 오류 메시지 개선
   return res.json();
 };