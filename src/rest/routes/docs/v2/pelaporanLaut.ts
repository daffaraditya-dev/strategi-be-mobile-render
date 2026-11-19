/**
 * @openapi
 * tags:
 *   - name: v2 Reporting
 *     description: Endpoint untuk manajemen data pelaporan transportasi
 *
 * components:
 *   schemas:
 *     Pelabuhan:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1691
 *         namaPelabuhan:
 *           type: string
 *           example: "Kariangau Balikpapan"
 *         idProvinsi:
 *           type: integer
 *           example: 64
 *         idKabupaten:
 *           type: integer
 *           example: 6471
 *
 *     Kapal:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 3200
 *         idPerusahaan:
 *           type: integer
 *           example: 1913
 *         idJenisKapal:
 *           type: string
 *           example: "4"
 *         namaKapal:
 *           type: string
 *           example: "Sadewa Ta 02"
 *         grt:
 *           type: integer
 *           format: float
 *           example: 0
 *         perusahaan:
 *           $ref: '#/components/schemas/perusahaan'
 *
 *     perusahaan:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 3200
 *         namaPerusahaan:
 *           type: string
 *           example: "Kaltara Shipping Line"
 *
 *
 *     Trayek:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 501
 *         kodeTrayek:
 *           type: string
 *           example: "TRK-1234"
 *         namaTrayek:
 *           type: string
 *           example: "Balikpapan - Tarakan"
 *         pelabuhanAsal:
 *           $ref: '#/components/schemas/Pelabuhan'
 *         pelabuhanTujuan:
 *           $ref: '#/components/schemas/Pelabuhan'
 *
 *     ReportingLautRequest:
 *       type: object
 *       properties:
 *         id_pelabuhan:
 *           type: integer
 *           example: 3878
 *         id_kapal:
 *           type: integer
 *           example: 3200
 *         id_plbh_asal:
 *           type: integer
 *           example: 3479
 *         nama_perusahaan:
 *           type: string
 *           example: "KUD.SADAR"
 *         kapasitas:
 *           type: integer
 *           example: 16
 *         dispensasi:
 *           type: integer
 *           example: 0
 *         kapasitas_dispensasi:
 *           type: integer
 *           example: 16
 *         pass_factor:
 *           type: string
 *           example: "0.00"
 *         selisih:
 *           type: integer
 *           example: 16
 *         gross_tonage:
 *           type: number
 *           format: float
 *           example: 3
 *         tgl_datang:
 *           type: string
 *           format: date
 *           example: "1900-09-11"
 *         jam_datang:
 *           type: string
 *           example: "16:03"
 *         jml_pnp_turun:
 *           type: integer
 *           example: 1
 *         jml_pnp_lanjutan:
 *           type: integer
 *           example: 1
 *         id_plbh_tujuan:
 *           type: integer
 *           example: 0
 *         tgl_berangkat:
 *           type: string
 *           format: date
 *           example: "1900-09-12"
 *           nullable: true
 *         jam_berangkat:
 *           type: string
 *           example: "16:03"
 *           nullable: true
 *         jml_pnp_berangkat:
 *           type: integer
 *           example: 0
 *         jml_diatas_kapal:
 *           type: integer
 *           example: 0
 *         tenaga_kerja_turun:
 *           type: integer
 *           example: 1
 *         awak_kapal_turun:
 *           type: integer
 *           example: 1
 *         pelayaran_terbatas_turun:
 *           type: integer
 *           example: 1
 *         pelayaran_perintis_turun:
 *           type: integer
 *           example: 1
 *         pelayaran_antar_pulau_turun:
 *           type: integer
 *           example: 1
 *         keperluan_mendesak_turun:
 *           type: integer
 *           example: 1
 *         tenaga_kerja_naik:
 *           type: integer
 *           example: 0
 *         awak_kapal_naik:
 *           type: integer
 *           example: 0
 *         pelayaran_terbatas_naik:
 *           type: integer
 *           example: 0
 *         pelayaran_perintis_naik:
 *           type: integer
 *           example: 0
 *         pelayaran_antar_pulau_naik:
 *           type: integer
 *           example: 0
 *         keperluan_mendesak_naik:
 *           type: integer
 *           example: 0
 *         tenaga_kerja_lanjutan:
 *           type: integer
 *           example: 0
 *         awak_kapal_lanjutan:
 *           type: integer
 *           example: 0
 *         pelayaran_terbatas_lanjutan:
 *           type: integer
 *           example: 0
 *         pelayaran_perintis_lanjutan:
 *           type: integer
 *           example: 0
 *         pelayaran_antar_pulau_lanjutan:
 *           type: integer
 *           example: 0
 *         keperluan_mendesak_lanjutan:
 *           type: integer
 *           example: 0
 *         roda_dua_turun:
 *           type: integer
 *           example: 1
 *         roda_empat_turun:
 *           type: integer
 *           example: 1
 *         bus_turun:
 *           type: integer
 *           example: 1
 *         truk_turun:
 *           type: integer
 *           example: 1
 *         jml_barang_turun:
 *           type: integer
 *           example: 1
 *         satuan_barang_turun:
 *           type: string
 *           example: "Kilo"
 *         roda_dua_naik:
 *           type: integer
 *           example: 0
 *         roda_empat_naik:
 *           type: integer
 *           example: 0
 *         bus_naik:
 *           type: integer
 *           example: 0
 *         truk_naik:
 *           type: integer
 *           example: 0
 *         jml_barang_naik:
 *           type: integer
 *           example: 0
 *         satuan_barang_naik:
 *           type: string
 *           example: "0"
 *         general_cargo_turun:
 *           type: integer
 *           example: 1
 *         curah_cair:
 *           type: integer
 *           example: 1
 *         curah_kering:
 *           type: integer
 *           example: 1
 *         container_turun:
 *           type: integer
 *           example: 1
 *         general_cargo_naik:
 *           type: integer
 *           example: 0
 *         curah_naik:
 *           type: integer
 *           example: 0
 *         curah_kering_naik:
 *           type: integer
 *           example: 0
 *         container_naik:
 *           type: integer
 *           example: 0
 *         pasien_turun:
 *           type: integer
 *           example: 0
 *         keluarga_turun:
 *           type: integer
 *           example: 0
 *         orang_khusus_turun:
 *           type: integer
 *           example: 0
 *         lembaga_turun:
 *           type: integer
 *           example: 0
 *         pasien_naik:
 *           type: integer
 *           example: 0
 *         keluarga_naik:
 *           type: integer
 *           example: 0
 *         orang_khusus_naik:
 *           type: integer
 *           example: 0
 *         lembaga_naik:
 *           type: integer
 *           example: 0
 *         is_berangkat:
 *           type: integer
 *           description: 1 jika berangkat, 0 jika tidak
 *           example: 0
 *         is_nihil:
 *           type: integer
 *           description: 1 jika nihil, 0 jika tidak
 *           example: 0
 *         keterangan_nihil:
 *           type: string
 *           example: ""
 *     LautSingleResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: boolean
 *           example: true
 *         data:
 *           $ref: '#/components/schemas/ReportingLautResponse'
 *
 *     ReportingLautResponse:
 *       type: object
 *       properties:
 *         id: { type: string, example: "28201" }
 *         idPelabuhan: { type: integer, example: 3878 }
 *         idKapal: { type: integer, example: 3200 }
 *         kapasitas: { type: integer, example: 16 }
 *         dispensasi: { type: integer, example: 0 }
 *         kapasitasDispensasi: { type: integer, example: 16 }
 *         passFactor: { type: string, example: "0.00" }
 *         selisih: { type: integer, example: 16 }
 *         grossTonage: { type: number, example: 3 }
 *         idPlbhAsal: { type: integer, example: 3479 }
 *         tglDatang: { type: string, format: date, example: "" }
 *         jamDatang: { type: string, example: "16:03" }
 *         jmlPnpTurun: { type: integer, example: 1 }
 *         jmlPnpLanjutan: { type: integer, example: 1 }
 *         idPlbhTujuan: { type: integer, nullable: true, example: 0 }
 *         tglBerangkat: { type: string, format: date, example: "" }
 *         jamBerangkat: { type: string, example: "16:03" }
 *         jmlPnpBerangkat: { type: integer, example: 0 }
 *         jmlDiatasKapal: { type: integer, example: 0 }
 *         tenagaKerjaTurun: { type: integer, example: 1 }
 *         awakKapalTurun: { type: integer, example: 1 }
 *         pelayaranTerbatasTurun: { type: integer, example: 1 }
 *         pelayaranPerintisTurun: { type: integer, example: 1 }
 *         pelayaranAntarPulauTurun: { type: integer, example: 1 }
 *         keperluanMendesakTurun: { type: integer, example: 1 }
 *         tenagaKerjaNaik: { type: integer, example: 0 }
 *         awakKapalNaik: { type: integer, example: 0 }
 *         pelayaranTerbatasNaik: { type: integer, example: 0 }
 *         pelayaranPerintisNaik: { type: integer, example: 0 }
 *         pelayaranAntarPulauNaik: { type: integer, example: 0 }
 *         keperluanMendesakNaik: { type: integer, example: 0 }
 *         tenagaKerjaLanjutan: { type: integer, example: 0 }
 *         awakKapalLanjutan: { type: integer, example: 0 }
 *         pelayaranTerbatasLanjutan: { type: integer, example: 0 }
 *         pelayaranPerintisLanjutan: { type: integer, example: 0 }
 *         pelayaranAntarPulauLanjutan: { type: integer, example: 0 }
 *         keperluanMendesakLanjutan: { type: integer, example: 0 }
 *         rodaDuaTurun: { type: integer, example: 1 }
 *         rodaEmpatTurun: { type: integer, example: 1 }
 *         busTurun: { type: integer, example: 1 }
 *         trukTurun: { type: integer, example: 1 }
 *         jmlBarangTurun: { type: integer, example: 1 }
 *         satuanBarangTurun: { type: string, example: "Kilo" }
 *         rodaDuaNaik: { type: integer, example: 0 }
 *         rodaEmpatNaik: { type: integer, example: 0 }
 *         busNaik: { type: integer, example: 0 }
 *         trukNaik: { type: integer, example: 0 }
 *         jmlBarangNaik: { type: integer, example: 0 }
 *         satuanBarangNaik: { type: string, example: "" }
 *         generalCargoTurun: { type: integer, example: 1 }
 *         curahCair: { type: integer, example: 1 }
 *         curahKering: { type: integer, example: 1 }
 *         containerTurun: { type: integer, example: 1 }
 *         generalCargoNaik: { type: integer, example: 0 }
 *         curahNaik: { type: integer, example: 0 }
 *         curahKeringNaik: { type: integer, example: 0 }
 *         containerNaik: { type: integer, example: 0 }
 *         pasienTurun: { type: integer, example: 0 }
 *         keluargaTurun: { type: integer, example: 0 }
 *         orangKhususTurun: { type: integer, example: 0 }
 *         lembagaTurun: { type: integer, example: 0 }
 *         pasienNaik: { type: integer, example: 0 }
 *         keluargaNaik: { type: integer, example: 0 }
 *         orangKhususNaik: { type: integer, example: 0 }
 *         lembagaNaik: { type: integer, example: 0 }
 *         isBerangkat: { type: integer, example: 0 }
 *         isNihil: { type: integer, example: 0 }
 *         keteranganNihil: { type: string, nullable: true, example: "" }
 *         createdIdTurun: { type: string, nullable: true, example: "" }
 *         createdDateTurun: { type: string, nullable: true, example: "" }
 *         updateId: { type: string, nullable: true, example: "" }
 *         updateDate: { type: string, nullable: true, example: "" }
 *         createdIdNaik: { type: string, nullable: true, example: "" }
 *         createdDateNaik: { type: string, nullable: true, example: "" }
 *         isDelete: { type: integer, example: 0 }
 *         sumber: { type: string, example: "STRATEGI" }
 *         namaPerusahaan: { type: string, example: "KUD.SADAR" }
 *
 *
 *     LautReportItem:
 *       type: object
 *       properties:
 *         id: { type: string, example: "336" }
 *         idPelabuhan: { type: integer, example: 277 }
 *         idKapal: { type: integer, example: 7862 }
 *         kapasitas: { type: integer, example: 0 }
 *         dispensasi: { type: integer, example: 0 }
 *         kapasitasDispensasi: { type: integer, example: 0 }
 *         passFactor: { type: string, example: "0.00" }
 *         selisih: { type: integer, example: 0 }
 *         grossTonage: { type: integer, example: 22 }
 *         idPlbhAsal: { type: integer, example: 277 }
 *         tglDatang: { type: string, format: date, example: "" }
 *         jamDatang: { type: string, example: "09:09" }
 *         jmlPnpTurun: { type: integer, example: 0 }
 *         jmlPnpLanjutan: { type: integer, example: 0 }
 *         idPlbhTujuan: { type: integer, nullable: true, example: 0 }
 *         tglBerangkat: { type: string, nullable: true, example: "" }
 *         jamBerangkat: { type: string, nullable: true, example: "09:00" }
 *         jmlPnpBerangkat: { type: integer, example: 0 }
 *         jmlDiatasKapal: { type: integer, example: 0 }
 *         tenagaKerjaTurun: { type: integer, example: 0 }
 *         awakKapalTurun: { type: integer, example: 0 }
 *         pelayaranTerbatasTurun: { type: integer, example: 0 }
 *         pelayaranPerintisTurun: { type: integer, example: 0 }
 *         pelayaranAntarPulauTurun: { type: integer, example: 0 }
 *         keperluanMendesakTurun: { type: integer, example: 0 }
 *         tenagaKerjaNaik: { type: integer, example: 0 }
 *         awakKapalNaik: { type: integer, example: 0 }
 *         pelayaranTerbatasNaik: { type: integer, example: 0 }
 *         pelayaranPerintisNaik: { type: integer, example: 0 }
 *         pelayaranAntarPulauNaik: { type: integer, example: 0 }
 *         keperluanMendesakNaik: { type: integer, example: 0 }
 *         tenagaKerjaLanjutan: { type: integer, example: 0 }
 *         awakKapalLanjutan: { type: integer, example: 0 }
 *         pelayaranTerbatasLanjutan: { type: integer, example: 0 }
 *         pelayaranPerintisLanjutan: { type: integer, example: 0 }
 *         pelayaranAntarPulauLanjutan: { type: integer, example: 0 }
 *         keperluanMendesakLanjutan: { type: integer, example: 0 }
 *         rodaDuaTurun: { type: integer, example: 0 }
 *         rodaEmpatTurun: { type: integer, example: 0 }
 *         busTurun: { type: integer, example: 0 }
 *         trukTurun: { type: integer, example: 0 }
 *         jmlBarangTurun: { type: integer, example: 0 }
 *         satuanBarangTurun: { type: string, example: "" }
 *         rodaDuaNaik: { type: integer, example: 0 }
 *         rodaEmpatNaik: { type: integer, example: 0 }
 *         busNaik: { type: integer, example: 0 }
 *         trukNaik: { type: integer, example: 0 }
 *         jmlBarangNaik: { type: integer, example: 0 }
 *         satuanBarangNaik: { type: string, nullable: true, example: "" }
 *         generalCargoTurun: { type: integer, example: 0 }
 *         curahCair: { type: integer, example: 0 }
 *         curahKering: { type: integer, example: 0 }
 *         containerTurun: { type: integer, example: 0 }
 *         generalCargoNaik: { type: integer, example: 0 }
 *         curahNaik: { type: integer, example: 0 }
 *         curahKeringNaik: { type: integer, example: 0 }
 *         containerNaik: { type: integer, example: 0 }
 *         pasienTurun: { type: integer, example: 0 }
 *         keluargaTurun: { type: integer, example: 0 }
 *         orangKhususTurun: { type: integer, example: 0 }
 *         lembagaTurun: { type: integer, example: 0 }
 *         pasienNaik: { type: integer, example: 0 }
 *         keluargaNaik: { type: integer, example: 0 }
 *         orangKhususNaik: { type: integer, example: 0 }
 *         lembagaNaik: { type: integer, example: 0 }
 *         isBerangkat: { type: integer, example: 0 }
 *         isNihil: { type: integer, example: 0 }
 *         keteranganNihil: { type: string, nullable: true, example: "" }
 *         createdIdTurun: { type: string, example: "95b129f1-7cf6-4821-8672-e6e91d45cd9e" }
 *         createdDateTurun: { type: string, nullable: true, example: "" }
 *         updateId: { type: string, nullable: true, example: "" }
 *         updateDate: { type: string, nullable: true, example: "" }
 *         createdIdNaik: { type: string, nullable: true, example: "" }
 *         createdDateNaik: { type: string, nullable: true, example: "" }
 *         isDelete: { type: integer, example: 0 }
 *         sumber: { type: string, example: "STRATEGI" }
 *         pelabuhan:
 *          { $ref: '#/components/schemas/Pelabuhan' }
 *         pelabuhanAsal:
 *           $ref: '#/components/schemas/Pelabuhan'
 *         pelabuhanTujuan:
 *           $ref: '#/components/schemas/Pelabuhan'
 *         kapal:
 *           $ref: '#/components/schemas/Kapal'
 *
 * /v2/reporting/laut:
 *   get:
 *     tags: [v2 Reporting]
 *     summary: Get reporting Laut data
 *     description: Fetches reporting data for maritime transport based on port, province, date range, and filters.
 *     parameters:
 *       - name: pelabuhanId
 *         in: query
 *         schema: { type: string, nullable: true }
 *       - name: kapalId
 *         in: query
 *         schema: { type: string, nullable: true }
 *       - name: pelabuhanAsalId
 *         in: query
 *         schema: { type: string, nullable: true }
 *       - name: pelabuhanTujuanId
 *         in: query
 *         schema: { type: string, nullable: true }
 *       - name: provinsi
 *         in: query
 *         schema: { type: string, nullable: true }
 *       - name: startDate
 *         in: query
 *         schema: { type: string, format: date, nullable: true }
 *       - name: endDate
 *         in: query
 *         schema: { type: string, format: date, nullable: true }
 *       - name: page
 *         in: query
 *         schema: { type: integer, example: 1 }
 *       - name: limit
 *         in: query
 *         schema: { type: integer, example: 10 }
 *       - name: search
 *         in: query
 *         schema: { type: string, nullable: true }
 *       - name: dateType
 *         in: query
 *         description: Jenis tanggal yang digunakan untuk filter (tanggal-berangkat, tanggal-datang, atau tanggal-input)
 *         schema:
 *           type: string
 *           enum: [tanggal-berangkat, tanggal-datang, tanggal-input]
 *           nullable: true
 *       - name: jenis
 *         in: query
 *         description: Jenis laporan (optional)
 *         schema:
 *           type: integer
 *           example: 1
 *       - name: filterBySimpul
 *         in: query
 *         description: Filter simpul (1 = aktif, optional)
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       200:
 *         description: Successful response with full reporting data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: { type: boolean, example: true }
 *                 data:
 *                   type: array
 *                   items: { $ref: '#/components/schemas/LautReportItem' }
 *                 total: { type: integer, example: 22032 }
 *                 page: { type: string, example: "1" }
 *                 limit: { type: string, example: "1" }
 *                 totalPages: { type: integer, example: 22032 }
 *
 *   post:
 *     tags: [v2 Reporting]
 *     summary: Create a new maritime transport report
 *     description: Adds a new maritime transport report record.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/ReportingLautRequest' }
 *     responses:
 *       200:
 *         description: Created successfully
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/ReportingLautResponse' }
 *
 * /v2/reporting/laut/export:
 *   get:
 *     tags: [v2 Reporting]
 *     summary: export xlsx report laut
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: pelabuhanId
 *         in: query
 *         schema: { type: string, nullable: true }
 *       - name: kapalId
 *         in: query
 *         schema: { type: string, nullable: true }
 *       - name: pelabuhanAsalId
 *         in: query
 *         schema: { type: string, nullable: true }
 *       - name: pelabuhanTujuanId
 *         in: query
 *         schema: { type: string, nullable: true }
 *       - name: provinsi
 *         in: query
 *         schema: { type: string, nullable: true }
 *       - name: startDate
 *         in: query
 *         schema: { type: string, format: date, nullable: true }
 *       - name: endDate
 *         in: query
 *         schema: { type: string, format: date, nullable: true }
 *       - name: page
 *         in: query
 *         schema: { type: integer, example: 1 }
 *       - name: limit
 *         in: query
 *         schema: { type: integer, example: 10 }
 *       - name: search
 *         in: query
 *         schema: { type: string, nullable: true }
 *       - name: dateType
 *         in: query
 *         description: Jenis tanggal yang digunakan untuk filter (tanggal-berangkat, tanggal-datang, atau tanggal-input)
 *         schema:
 *           type: string
 *           enum: [tanggal-berangkat, tanggal-datang, tanggal-input]
 *           nullable: true
 *       - name: jenis
 *         in: query
 *         description: Jenis laporan (optional)
 *         schema:
 *           type: integer
 *           example: 1
 *       - name: filterBySimpul
 *         in: query
 *         description: Filter simpul (1 = aktif, optional)
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       "200":
 *          description: XLSX report file
 *          content:
 *             application/vnd.openxmlformats-officedocument.spreadsheetml.sheet:
 *               schema:
 *                 type: string
 *                 format: binary
 *
 * /v2/reporting/laut/{id}:
 *   get:
 *     tags: [v2 Reporting]
 *     summary: Get reporting Laut data by ID
 *     description: Fetch a single maritime transport reporting record by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *         example: "28201"
 *     responses:
 *       200:
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: { type: boolean, example: true }
 *                 data:
 *                   $ref: '#/components/schemas/LautReportItem'
 *
 *   put:
 *     tags: [v2 Reporting]
 *     summary: Update a maritime transport report by ID
 *     description: Updates an existing maritime transport report record by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *         example: "28201"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/ReportingLautRequest' }
 *     responses:
 *       200:
 *         description: Updated successfully
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/ReportingLautResponse' }
 *
 *   delete:
 *     tags: [v2 Reporting]
 *     summary: Delete a maritime transport report by ID
 *     description: Deletes an existing maritime transport report record by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *         example: "28201"
 *     responses:
 *       200:
 *         description: Deleted successfully
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/ReportingLautResponse' }
 * /v2/reporting/laut/nihil:
 *   post:
 *     tags: [v2 Reporting]
 *     summary: Create or mark maritime report as Nihil (no activity)
 *     description: Create a Nihil record for maritime reporting when there is no operational data on a given date.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_pelabuhan:
 *                 type: integer
 *                 example: 3878
 *               tgl_data:
 *                 type: string
 *                 format: date
 *                 example: "1800-10-11"
 *               keterangan_nihil:
 *                 type: string
 *                 example: "apa ini"
 *     responses:
 *       200:
 *         description: Nihil report created successfully
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/LautSingleResponse' }
 *       400:
 *         description: Bad Request - invalid or missing fields
 *       401:
 *         description: Unauthorized - missing or invalid token
 *       500:
 *         description: Internal Server Error
 */
