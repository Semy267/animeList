export const deslugify = (slug: string): string => {
    if (!slug) return ""; // 🛡️ Tambahan untuk mencegah error
    return slug
    .split("-")                 // Pisah berdasarkan "-"
    .map(word => 
      word.charAt(0).toUpperCase() + word.slice(1) // Kapitalisasi awal
    )
    .join(" ");                 // Gabung kembali dengan spasi
};