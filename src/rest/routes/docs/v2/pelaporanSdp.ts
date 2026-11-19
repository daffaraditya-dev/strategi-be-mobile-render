/**
 * @openapi
 * tags:
 *   - name: v2 Reporting
 *     description: Endpoint untuk manajemen data pelaporan transportasi laut (SDP)
 *
 * components:
 *   schemas:
 *     SDPRequest:
 *       type: object
 *       required:
 *         - tgl_berangkat
 *         - jam_berangkat
 *         - id_pelabuhan
 *         - id_trayek
 *       properties:
 *         tgl_berangkat:
 *           type: string
 *           format: date
 *           example: "1900-01-01"
 *         jam_berangkat:
 *           type: string
 *           example: "15:10"
 *         tgl_datang:
 *           type: string
 *           format: date
 *           example: "1900-02-01"
 *         jam_datang:
 *           type: string
 *           example: "15:10"
 *         id_pelabuhan:
 *           type: integer
 *           example: 3878
 *         id_trayek:
 *           type: integer
 *           example: 10734
 *         jml_pnp_dewasa:
 *           type: integer
 *           example: 1
 *         jml_pnp_anak:
 *           type: integer
 *           example: 1
 *         jml_total_pnp:
 *           type: integer
 *           example: 2
 *         goli:
 *           type: integer
 *           example: 1
 *         pnpgoli:
 *           type: integer
 *           example: 1
 *         golii:
 *           type: integer
 *           example: 1
 *         pnpgolii:
 *           type: integer
 *           example: 1
 *         goliii:
 *           type: integer
 *           example: 1
 *         pnpgoliii:
 *           type: integer
 *           example: 1
 *         goliva:
 *           type: integer
 *           example: 1
 *         pnpgoliva:
 *           type: integer
 *           example: 1
 *         golivb:
 *           type: integer
 *           example: 1
 *         pnpgolivb:
 *           type: integer
 *           example: 1
 *         golva:
 *           type: integer
 *           example: 1
 *         pnpgolva:
 *           type: integer
 *           example: 1
 *         golvb:
 *           type: integer
 *           example: 1
 *         pnpgolvb:
 *           type: integer
 *           example: 1
 *         golvia:
 *           type: integer
 *           example: 1
 *         pnpgolvia:
 *           type: integer
 *           example: 1
 *         golvib:
 *           type: integer
 *           example: 1
 *         pnpgolvib:
 *           type: integer
 *           example: 1
 *         golvii:
 *           type: integer
 *           example: 1
 *         pnpgolvii:
 *           type: integer
 *           example: 1
 *         golviii:
 *           type: integer
 *           example: 1
 *         pnpgolviii:
 *           type: integer
 *           example: 1
 *         golix:
 *           type: integer
 *           example: 1
 *         pnpgolix:
 *           type: integer
 *           example: 1
 *         jml_kendaraan:
 *           type: integer
 *           example: 12
 *         jml_pnp_kendaraan:
 *           type: integer
 *           example: 12
 *         total_penumpang:
 *           type: integer
 *           example: 0
 *         is_nihil:
 *           type: boolean
 *           example: false
 *         keterangan_nihil:
 *           type: string
 *           example: ""
 *         created_user:
 *           type: string
 *           example: "018ebc07-b487-7b90-98d6-b463269f4c96"
 *         created_date:
 *           type: string
 *           format: date-time
 *           example: "2025-10-08T03:53:24.260Z"
 *         lembaga:
 *           type: integer
 *           example: 1
 *         pasien:
 *           type: integer
 *           example: 1
 *         keluarga:
 *           type: integer
 *           example: 1
 *         orang_khusus:
 *           type: integer
 *           example: 1
 *         nama_pelabuhan:
 *           type: string
 *           example: ""
 *         id_kapal:
 *           type: integer
 *           example: 9652
 *         nama_kapal:
 *           type: string
 *           example: "KMP. NUSA JAYA ABADI"
 *         nama_perusahaan:
 *           type: string
 *           example: "SAMOEDRA JAYA GIRI NUSA"
 *         lintasan_awal:
 *           type: string
 *           example: "Padang Bai"
 *         lintasan_akhir:
 *           type: string
 *           example: "Nusa Penida"
 *         jenis_kapal:
 *           type: string
 *           example: ""
 *         ukuran_kapal:
 *           type: string
 *           example: "629"
 *         is_delete:
 *           type: boolean
 *           example: false
 *
 *
 *     SDPResponse2:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "84637"
 *         tglBerangkat:
 *           type: string
 *           format: date-time
 *           example: "1900-01-01T00:00:00.000Z"
 *         jamBerangkat:
 *           type: string
 *           example: "15:10"
 *         tglDatang:
 *           type: string
 *           nullable: true
 *           example: ""
 *         jamDatang:
 *           type: string
 *           nullable: true
 *           example: ""
 *         idPelabuhan:
 *           type: integer
 *           example: 3878
 *         idTrayek:
 *           type: integer
 *           example: 10734
 *         jmlPnpDewasa:
 *           type: integer
 *           example: 1
 *         jmlPnpAnak:
 *           type: integer
 *           example: 1
 *         jmlTotalPnp:
 *           type: integer
 *           example: 2
 *         jmlKendaraan:
 *           type: integer
 *           example: 12
 *         jmlPnpKendaraan:
 *           type: integer
 *           example: 12
 *         totalPenumpang:
 *           type: integer
 *           example: 0
 *         isNihil:
 *           type: integer
 *           example: 0
 *         approvalStatus:
 *           type: integer
 *           example: 0
 *         keteranganNihil:
 *           type: string
 *           example: ""
 *         createdUser:
 *           type: string
 *           example: "018ebc07-b487-7b90-98d6-b463269f4c96"
 *         createdDate:
 *           type: string
 *           format: date-time
 *           example: "2025-10-23T09:20:14.244Z"
 *         lembaga:
 *           type: integer
 *           example: 1
 *         pasien:
 *           type: integer
 *           example: 1
 *         keluarga:
 *           type: integer
 *           example: 1
 *         orangKhusus:
 *           type: integer
 *           example: 1
 *         namaPelabuhan:
 *           type: string
 *           example: ""
 *         idKapal:
 *           type: integer
 *           example: 9652
 *         namaKapal:
 *           type: string
 *           example: "KMP. NUSA JAYA ABADI"
 *         namaPerusahaan:
 *           type: string
 *           example: "SAMOEDRA JAYA GIRI NUSA"
 *         lintasanAwal:
 *           type: string
 *           example: "Padang Bai"
 *         lintasanAkhir:
 *           type: string
 *           example: "Nusa Penida"
 *         jenisKapal:
 *           type: string
 *           example: ""
 *         ukuranKapal:
 *           type: string
 *           example: "629"
 *         isDelete:
 *           type: integer
 *           example: 0
 *         goli:
 *           type: integer
 *           example: 0
 *         pnpgoli:
 *           type: integer
 *           example: 0
 *         golii:
 *           type: integer
 *           example: 0
 *         pnpgolii:
 *           type: integer
 *           example: 0
 *         goliii:
 *           type: integer
 *           example: 0
 *         pnpgoliii:
 *           type: integer
 *           example: 0
 *         goliva:
 *           type: integer
 *           example: 0
 *         pnpgoliva:
 *           type: integer
 *           example: 0
 *         golivb:
 *           type: integer
 *           example: 0
 *         pnpgolivb:
 *           type: integer
 *           example: 0
 *         golva:
 *           type: integer
 *           example: 0
 *         pnpgolva:
 *           type: integer
 *           example: 0
 *         golvb:
 *           type: integer
 *           example: 0
 *         pnpgolvb:
 *           type: integer
 *           example: 0
 *         golvia:
 *           type: integer
 *           example: 0
 *         pnpgolvia:
 *           type: integer
 *           example: 0
 *         golvib:
 *           type: integer
 *           example: 0
 *         pnpgolvib:
 *           type: integer
 *           example: 0
 *         golvii:
 *           type: integer
 *           example: 0
 *         pnpgolvii:
 *           type: integer
 *           example: 0
 *         golviii:
 *           type: integer
 *           example: 0
 *         pnpgolviii:
 *           type: integer
 *           example: 0
 *         golix:
 *           type: integer
 *           example: 0
 *         pnpgolix:
 *           type: integer
 *           example: 0
 *         updatedUser:
 *           type: string
 *           nullable: true
 *           example: ""
 *         updatedDate:
 *           type: string
 *           nullable: true
 *           example: ""
 *         sumber:
 *           type: string
 *           example: "strategi"
 *
 *
 *     SDPResponse:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           example: "76686"
 *         tglBerangkat:
 *           type: string
 *           format: date-time
 *           example: "2025-09-16T17:00:00.000Z"
 *         jamBerangkat:
 *           type: string
 *           example: "17:50:00"
 *         tglDatang:
 *           type: string
 *           nullable: true
 *           example: ""
 *         jamDatang:
 *           type: string
 *           nullable: true
 *           example: ""
 *         idPelabuhan:
 *           type: integer
 *           example: 1691
 *         idTrayek:
 *           type: integer
 *           example: 209
 *         jmlPnpDewasa:
 *           type: integer
 *           example: 0
 *         jmlPnpAnak:
 *           type: integer
 *           example: 0
 *         jmlTotalPnp:
 *           type: integer
 *           example: 0
 *         goli:
 *           type: integer
 *           example: 0
 *         pnpgoli:
 *           type: integer
 *           example: 0
 *         golii:
 *           type: integer
 *           example: 2
 *         pnpgolii:
 *           type: integer
 *           example: 4
 *         goliii:
 *           type: integer
 *           example: 0
 *         pnpgoliii:
 *           type: integer
 *           example: 0
 *         goliva:
 *           type: integer
 *           example: 2
 *         pnpgoliva:
 *           type: integer
 *           example: 10
 *         golivb:
 *           type: integer
 *           example: 1
 *         pnpgolivb:
 *           type: integer
 *           example: 1
 *         golva:
 *           type: integer
 *           example: 0
 *         pnpgolva:
 *           type: integer
 *           example: 0
 *         golvb:
 *           type: integer
 *           example: 1
 *         pnpgolvb:
 *           type: integer
 *           example: 1
 *         golvia:
 *           type: integer
 *           example: 0
 *         pnpgolvia:
 *           type: integer
 *           example: 0
 *         golvib:
 *           type: integer
 *           example: 1
 *         pnpgolvib:
 *           type: integer
 *           example: 1
 *         golvii:
 *           type: integer
 *           example: 0
 *         pnpgolvii:
 *           type: integer
 *           example: 0
 *         golviii:
 *           type: integer
 *           example: 0
 *         pnpgolviii:
 *           type: integer
 *           example: 0
 *         golix:
 *           type: integer
 *           example: 0
 *         pnpgolix:
 *           type: integer
 *           example: 0
 *         jmlKendaraan:
 *           type: integer
 *           example: 7
 *         jmlPnpKendaraan:
 *           type: integer
 *           example: 17
 *         totalPenumpang:
 *           type: integer
 *           example: 0
 *         isNihil:
 *           type: integer
 *           example: 0
 *         approvalStatus:
 *           type: integer
 *           example: 0
 *         keteranganNihil:
 *           type: string
 *           nullable: true
 *           example: "0"
 *         createdUser:
 *           type: string
 *           example: "356a22a3-b6a2-402d-9018-51e7f97ff7f9"
 *         createdDate:
 *           type: string
 *           format: date-time
 *           example: "2025-09-16T16:23:18.305Z"
 *         updatedUser:
 *           type: string
 *           nullable: true
 *           example: ""
 *         updatedDate:
 *           type: string
 *           nullable: true
 *           example: ""
 *         lembaga:
 *           type: integer
 *           example: 0
 *         pasien:
 *           type: integer
 *           example: 0
 *         keluarga:
 *           type: integer
 *           example: 0
 *         orangKhusus:
 *           type: integer
 *           example: 0
 *         isDelete:
 *           type: integer
 *           example: 0
 *         sumber:
 *           type: string
 *           example: "strategi"
 *         pelabuhan:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *               example: 1691
 *             isAsdp:
 *               type: string
 *               example: "1"
 *             namaPelabuhan:
 *               type: string
 *               example: "Kariangau Balikpapan"
 *             idProvinsi:
 *               type: integer
 *               example: 64
 *             idKabupaten:
 *               type: integer
 *               example: 6471
 *             provinsi:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 64
 *                 namaProvinsi:
 *                   type: string
 *                   example: "Kalimantan Timur"
 *                 isPantau:
 *                   type: string
 *                   example: "0"
 *                 kodeBps:
 *                   type: string
 *                   example: "64"
 *                 kodeMendagri:
 *                   type: string
 *                   example: "64"
 *         ferizy:
 *          type: object
 *          nullable: true
 *          properties:
 *            id:
 *              type: integer
 *              example: 1691
 *            idPelabuhan:
 *              type: integer
 *              example: 1691
 *            jamBerangkat:
 *              type: string
 *              example: "23:45:00"
 *            jmlPnpAnak:
 *              type: integer
 *              example: 12
 *            jmlPnpDewasa:
 *              type: integer
 *              example: 45
 *            jmlPnpKendaraan:
 *              type: integer
 *              example: 17
 *            lintasanAwal:
 *              type: string
 *              example: "Penajam"
 *            lintasanAkhir:
 *              type: string
 *              example: "Kariangau Balikpapan"
 *            namaKapal:
 *              type: string
 *              example: "DHARMA BADJRA"
 *            sumber:
 *              type: string
 *              example: "strategi"
 *            tglBerangkat:
 *              type: string
 *              format: date-time
 *              example: "2025-09-17T00:00:00"
 *         trayek:
 *           type: object
 *           properties:
 *             id:
 *               type: integer
 *               example: 209
 *             idKapal:
 *               type: integer
 *               example: 217
 *             idPelabuhanAsal:
 *               type: integer
 *               example: 1690
 *             idPelabuhanTujuan:
 *               type: integer
 *               example: 1691
 *             pelabuhanAsal:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1690
 *                 isAsdp:
 *                   type: string
 *                   example: "1"
 *                 namaPelabuhan:
 *                   type: string
 *                   example: "Penajam"
 *                 idProvinsi:
 *                   type: integer
 *                   example: 64
 *                 idKabupaten:
 *                   type: integer
 *                   example: 6409
 *             pelabuhanTujuan:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1691
 *                 isAsdp:
 *                   type: string
 *                   example: "1"
 *                 namaPelabuhan:
 *                   type: string
 *                   example: "Kariangau Balikpapan"
 *                 idProvinsi:
 *                   type: integer
 *                   example: 64
 *                 idKabupaten:
 *                   type: integer
 *                   example: 6471
 *             kapal:
 *               type: object
 *               properties:
 *                 idKapal:
 *                   type: integer
 *                   example: 217
 *                 idJenisKapal:
 *                   type: integer
 *                   example: 4
 *                 idPerusahaan:
 *                   type: integer
 *                   example: 213
 *                 namaKapal:
 *                   type: string
 *                   example: "SWARNA NALINI"
 *                 grt:
 *                   type: integer
 *                   example: 323
 *                 perusahaan:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 213
 *                     namaPerusahaan:
 *                       type: string
 *                       example: "JEMBATAN NUSANTARA, PT"
 *         tglBerangkatLocal:
 *           type: string
 *           example: "2025-09-17 00:00:00"
 *         tglDatangLocal:
 *           type: string
 *           nullable: true
 *           example: "2025-09-12 00:00:00"
 *
 *     SDPListResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: boolean
 *           example: true
 *         data:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/SDPResponse'
 *         total:
 *           type: integer
 *           example: 82
 *         page:
 *           type: string
 *           example: "1"
 *         limit:
 *           type: string
 *           example: "1"
 *         totalPages:
 *           type: integer
 *           example: 82
 *
 *     SDPSingleResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: boolean
 *           example: true
 *         data:
 *           $ref: '#/components/schemas/SDPResponse'
 *     SDPSingleResponse2:
 *       type: object
 *       properties:
 *         status:
 *           type: boolean
 *           example: true
 *         data:
 *           $ref: '#/components/schemas/SDPResponse2'
 *
 *     approveReportRequest:
 *         type: object
 *         properties:
 *             statusApproval: {type: number, example: 1}
 *             approvalNote: {type: string, nullable: true}
 *     approvalResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: "status approval berhasil diperbarui"
 *
 * /v2/reporting/sdp:
 *   get:
 *     tags: [v2 Reporting]
 *     summary: Get reporting SDP data
 *     description: Fetches reporting SDP data based on port, province, date range, and filters.
 *     parameters:
 *       - name: pelabuhanId
 *         in: query
 *         description: ID pelabuhan (optional)
 *         schema:
 *           type: string
 *       - name: provinsi
 *         in: query
 *         description: ID provinsi (optional)
 *         schema:
 *           type: string
 *       - name: startDate
 *         in: query
 *         required: true
 *         description: Start date
 *         schema:
 *           type: string
 *           format: date
 *           example: "2025-09-17"
 *       - name: endDate
 *         in: query
 *         required: true
 *         description: End date
 *         schema:
 *           type: string
 *           format: date
 *           example: "2025-09-17"
 *       - name: page
 *         in: query
 *         description: Page number (optional)
 *         schema:
 *           type: integer
 *       - name: limit
 *         in: query
 *         description: Limit per page (optional)
 *         schema:
 *           type: integer
 *       - name: search
 *         in: query
 *         description: Search keyword (optional)
 *         schema:
 *           type: string
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
 *       - name: filterByApproval
 *         in: query
 *         description: Filter approval status
 *         schema:
 *           type: integer
 *           example: 0
 *     responses:
 *       200:
 *         description: Successful response with reporting data
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SDPListResponse'
 *       400:
 *         description: Bad Request - Missing or invalid parameters
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: '"startDate" is required'
 *       401:
 *         description: Unauthorized - invalid or expired token
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: Internal server error
 *
 *   post:
 *     tags: [v2 Reporting]
 *     summary: Create new SDP reporting data
 *     description: Submit a new SDP report entry.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SDPRequest'
 *     responses:
 *       200:
 *         description: Successfully created new SDP report
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SDPSingleResponse2'
 *
 * /v2/reporting/sdp/export:
 *   get:
 *     tags: [v2 Reporting]
 *     summary: export xlsx report sdp
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: pelabuhanId
 *         in: query
 *         description: ID pelabuhan (optional)
 *         schema:
 *           type: string
 *       - name: provinsi
 *         in: query
 *         description: ID provinsi (optional)
 *         schema:
 *           type: string
 *       - name: startDate
 *         in: query
 *         required: true
 *         description: Start date
 *         schema:
 *           type: string
 *           format: date
 *           example: "2025-09-17"
 *       - name: endDate
 *         in: query
 *         required: true
 *         description: End date
 *         schema:
 *           type: string
 *           format: date
 *           example: "2025-09-17"
 *       - name: page
 *         in: query
 *         description: Page number (optional)
 *         schema:
 *           type: integer
 *       - name: limit
 *         in: query
 *         description: Limit per page (optional)
 *         schema:
 *           type: integer
 *       - name: search
 *         in: query
 *         description: Search keyword (optional)
 *         schema:
 *           type: string
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
 * /v2/reporting/sdp/{id}:
 *   get:
 *     tags: [v2 Reporting]
 *     summary: Get reporting SDP data by ID
 *     description: Fetch a single reporting SDP record by its ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Reporting SDP ID
 *         schema:
 *           type: string
 *           example: "227"
 *     responses:
 *       200:
 *         description: Successful response with reporting data by ID
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SDPSingleResponse'
 *       404:
 *         description: Not Found - No record with the given ID
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: "Data not found"
 *       401:
 *         description: Unauthorized - invalid or expired token
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             example:
 *               status: false
 *               message: Internal server error
 *
 *   put:
 *     tags: [v2 Reporting]
 *     summary: Update existing SDP reporting data
 *     description: Update an existing SDP report entry by its ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Reporting SDP ID
 *         schema:
 *           type: string
 *           example: "75421"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SDPRequest'
 *     responses:
 *       200:
 *         description: Successfully updated SDP report
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SDPSingleResponse2'
 *
 *   delete:
 *     tags: [v2 Reporting]
 *     summary: Delete reporting SDP data
 *     description: Delete an existing SDP report entry by its ID.
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Reporting SDP ID
 *         schema:
 *           type: string
 *           example: "75421"
 *     responses:
 *       200:
 *         description: Successfully deleted SDP report
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SDPSingleResponse2'
 * /v2/reporting/sdp/nihil:
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
 *         description: Successfully created new SDP report
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SDPSingleResponse'
 *       400:
 *         description: Bad Request - invalid or missing fields
 *       401:
 *         description: Unauthorized - missing or invalid token
 *       500:
 *         description: Internal Server Error
 *
 * /v2/reporting/sdp/approve/{id}:
 *   put:
 *     tags: [v2 Reporting]
 *     summary: approve report data
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *         example: "6079034"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/approveReportRequest' }
 *     responses:
 *       "200":
 *          description: approved/rejected report data
 *          content:
 *             application/json:
 *               schema:
 *                $ref: '#/components/schemas/approvalResponse'
 *
 *
 */
