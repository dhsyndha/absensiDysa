const hariMap: Record<string, number> = {
  Minggu: 0,
  Senin: 1,
  Selasa: 2,
  Rabu: 3,
  Kamis: 4,
  Jumat: 5,
  Sabtu: 6,
};

export function generateTanggalPertemuan(
  hari: string,
  index: number
) {
  const mulaiSemester = new Date("2026-07-27");

  const target = hariMap[hari];

  const tanggal = new Date(mulaiSemester);

  while (tanggal.getDay() !== target) {
    tanggal.setDate(tanggal.getDate() + 1);
  }

  tanggal.setDate(tanggal.getDate() + index * 7);

  return tanggal.toISOString().split("T")[0];
}