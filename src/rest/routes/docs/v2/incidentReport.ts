/**
 * @openapi
 * '/v2/incident-report':
 *   post:
 *     tags:
 *       - v2 Incident Report
 *     summary: Get Incident Report (v2)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               startDate:
 *                 type: string
 *                 format: date
 *                 example: "2025-09-01"
 *               endDate:
 *                 type: string
 *                 format: date
 *                 example: "2025-09-30"
 *               page:
 *                 type: integer
 *                 minimum: 1
 *                 example: 1
 *               perPage:
 *                 type: integer
 *                 minimum: 1
 *                 example: 10
 *               status:
 *                 type: array
 *                 items:
 *                   type: string
 *                   enum:
 *                     - OPEN
 *                     - ON_PROGRESS
 *                     - REJECT
 *                     - CLOSED
 *                     - VERIF_1
 *                     - VERIF_2
 *                     - VERIF_3
 *                     - TINDAK_LANJUT
 *                 example: ["VERIF_1", "VERIF_2"]
 *               moda:
 *                 type: string
 *                 enum:
 *                   - jalan
 *                   - penyebrangan
 *                   - laut
 *                   - udara
 *                   - perkeretaapian
 *                 example: "jalan"
 *               search:
 *                 type: string
 *                 example: ""
 *     responses:
 *       200:
 *         description: Successfully retrieved incident reports
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "1032338d-a85d-4ab2-87cc-aba272f710f9"
 *                       nama:
 *                         type: string
 *                         example: "Laporan Kejadian 1 -Test"
 *                       status:
 *                         type: string
 *                         example: "TINDAK_LANJUT"
 *                       upt_terkait:
 *                         type: array
 *                         items:
 *                           type: string
 *                         example: ["Direktorat Angkutan Udara"]
 *                       nama_pelapor:
 *                         type: string
 *                         example: "opt udara"
 *                       lokasi:
 *                         type: string
 *                         example: "Jakarta"
 *                       waktu_kejadian:
 *                         type: string
 *                         example: "08-08-2025 09:13 WIB"
 *                       create_date:
 *                         type: string
 *                         example: "16-09-2025 09:24 WIB"
 *                       jenis_kejadian:
 *                         type: string
 *                         example: "Gangguan kelancaran transportasi akibat cuaca dan bencana alam"
 *                       laporan_tindaklanjut_list:
 *                         type: array
 *                         items:
 *                           type: string
 *                         example: ["VERIFIED", "VERIFIED", "VERIFIED"]
 *                       eselon_terkait:
 *                         type: array
 *                         items:
 *                           type: string
 *                         example: ["ESELON1-UDARA"]
 *                       reason_reject:
 *                         type: string
 *                         nullable: true
 *                         example: "Alasan penolakan laporan"
 *                 count:
 *                   type: integer
 *                   example: 50
 *                 page:
 *                   type: integer
 *                   example: 1
 *                 pageSize:
 *                   type: integer
 *                   example: 10
 *                 totalPages:
 *                   type: integer
 *                   example: 5
 *       400:
 *         description: Bad Request - Missing or invalid parameters
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: '"startDate" is required'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 *
 * '/v2/incident-report/{id}':
 *   get:
 *     tags:
 *       - v2 Incident Report
 *     summary: Get Incident Report by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The unique identifier of the incident report
 *         schema:
 *           type: string
 *           example: "28ea0b77-0063-46d0-9225-8395660dde1e"
 *     responses:
 *       200:
 *         description: Successfully retrieved the incident report
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       format: uuid
 *                       example: "1032338d-a85d-4ab2-87cc-aba272f710f9"
 *                     nama:
 *                       type: string
 *                       example: "Laporan Kejadian 1 -Test"
 *                     email:
 *                       type: string
 *                       format: email
 *                       example: "opt_udara@yopmail.com"
 *                     lokasi:
 *                       type: string
 *                       example: "Jakarta"
 *                     longitude:
 *                       type: number
 *                       format: float
 *                       example: 106.8103256225586
 *                     latitude:
 *                       type: number
 *                       format: float
 *                       example: -6.1869707107543945
 *                     status:
 *                       type: string
 *                       example: "TINDAK_LANJUT"
 *                     dampak:
 *                       type: string
 *                       example: "<p>Dampak kejadian</p>"
 *                     kategori:
 *                       type: string
 *                       example: "Kejadian Menonjol"
 *                     no_hp:
 *                       type: string
 *                       example: "086167722891"
 *                     waktu_kejadian:
 *                       type: string
 *                       example: "08-08-2025 09:13 WIB"
 *                     kronologi_kejadian:
 *                       type: string
 *                       example: "<p>Kronologi kejadian</p>"
 *                     data_pendukung:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example:
 *                         - "upload-7062165100297109397.pdf"
 *                         - "upload-13951801796654013244.pdf"
 *                     eselon_terkait:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: ["ESELON1-UDARA"]
 *                     upt_terkait:
 *                       type: array
 *                       items:
 *                         type: string
 *                       example: ["Direktorat Angkutan Udara"]
 *                     catatan_tindak_lanjut_awal:
 *                       type: string
 *                       nullable: true
 *                       example: null
 *                     jenis_kejadian:
 *                       type: string
 *                       example: "Gangguan transportasi akibat cuaca"
 *                     id_pelapor:
 *                       type: string
 *                       format: uuid
 *                       example: "e105ed59-9bd7-4bf9-9dca-1bf318d6469f"
 *                     nama_pelapor:
 *                       type: string
 *                       example: "opt udara"
 *                     id_verifikator_1:
 *                       type: string
 *                       format: uuid
 *                       example: "e105ed59-9bd7-4bf9-9dca-1bf318d6469f"
 *                     tanggal_verifikasi_1:
 *                       type: string
 *                       example: "16-09-2025 09:24 WIB"
 *                     id_verifikator_2:
 *                       type: string
 *                       format: uuid
 *                       example: "d5c9ab4a-daa1-406a-b511-5df6fb5be680"
 *                     tanggal_verifikasi_2:
 *                       type: string
 *                       example: "16-09-2025 09:27 WIB"
 *                     catatan_verifikator_2:
 *                       type: string
 *                       example: "<p>Lanjutkan ke ketua harian</p>"
 *                     id_verifikator_3:
 *                       type: string
 *                       format: uuid
 *                       example: "2077d74a-ba64-436c-b3bf-48696ebaf7a1"
 *                     tanggal_verifikasi_3:
 *                       type: string
 *                       example: "16-09-2025 09:27 WIB"
 *                     catatan_verifikator_3:
 *                       type: string
 *                       example: "<p>Disetujui</p>"
 *                     tanggal_tutup_laporan:
 *                       type: string
 *                       nullable: true
 *                       example: null
 *                     catatan_tutup_laporan:
 *                       type: string
 *                       nullable: true
 *                       example: null
 *                     create_date:
 *                       type: string
 *                       example: "16-09-2025 09:24 WIB"
 *                     tindak_lanjut:
 *                       type: string
 *                       example: "<p>Catatan Tindak Lanjut 1</p>"
 *                     status_kejadian:
 *                       type: string
 *                       example: "NOT_VALID"
 *       404:
 *         description: Incident report not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Laporan kejadian not found"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Internal server error"
 * /v2/incident-report/approve/{id}:
 *   put:
 *     tags: [v2 Incident Report]
 *     summary: Approve or Reject Incident Report
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the incident report
 *         example: "97f3ba48-779e-4743-978a-e0de742a18b6"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - statusApproval
 *             properties:
 *               statusApproval:
 *                 type: string
 *                 enum:
 *                   - VERIF_3
 *                   - TINDAK_LANJUT
 *                   - CLOSED
 *                   - REJECT
 *                 description: Status approval for the incident report
 *                 example: "VERIF_3"
 *               approvalNote:
 *                 type: string
 *                 description: Notes for approval or rejection
 *                 example: "Catatan persetujuan atau penolakan"
 *               tanggalVerifikasi:
 *                 type: string
 *                 example: "2026-01-17T15:27:00+07"
 *               dataPendukung:
 *                 type: array
 *                 description: Supporting documents
 *                 items:
 *                   type: string
 *                 example: ["upload-7062165100297109397.pdf", "upload-13951801796654013244.pdf"]
 *     responses:
 *       200:
 *         description: Incident report status successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "status laporan kejadian berhasil diperbarui."
 *       400:
 *         description: Bad request - Invalid input
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Invalid status approval"
 *       404:
 *         description: Incident report not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Incident report not found"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Failed to update incident report status"
 *
 * '/v2/incident-report/tindak-lanjut/{idLaporanKejadian}':
 *   get:
 *     tags:
 *       - v2 Incident Report
 *     summary: Get Tindak Lanjut by Laporan Kejadian ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: idLaporanKejadian
 *         in: path
 *         required: true
 *         description: The unique identifier of the incident report
 *         schema:
 *           type: string
 *           example: "bcd2fc74-db32-48a6-ade1-312d91d52583"
 *     responses:
 *       200:
 *         description: Successfully retrieved the tindak lanjut records
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "1d19fed9-d75d-4446-a8b6-5ef471f0acf3"
 *                       id_laporan_kejadian:
 *                         type: string
 *                         example: "bcd2fc74-db32-48a6-ade1-312d91d52583"
 *                       id_user:
 *                         type: string
 *                         example: "e105ed59-9bd7-4bf9-9dca-1bf318d6469f"
 *                       nama_user:
 *                         type: string
 *                         example: "opt udara"
 *                       tindak_lanjut:
 *                         type: string
 *                         example: "<p>-</p>"
 *                       data_pendukung_tindaklanjut:
 *                         type: array
 *                         items:
 *                           type: string
 *                         example:
 *                           - "upload-7062165100297109397.pdf"
 *                           - "upload-13951801796654013244.pdf"
 *                       create_date:
 *                         type: string
 *                         example: "28-09-2025 09:32 WIB"
 *                       waktu_tindak_lanjut:
 *                         type: string
 *                         example: "28-09-2025 07:35 WIB"
 *                       id_verifikator_2:
 *                         type: string
 *                         example: "e105ed59-9bd7-4bf9-9dca-1bf318d6469f"
 *                       nama_verifikator_2:
 *                         type: string
 *                         example: "opt udara"
 *                       tanggal_verifikasi_2:
 *                         type: string
 *                         example: "28-09-2025 09:32 WIB"
 *                       id_verifikator_3:
 *                         type: string
 *                         example: "e105ed59-9bd7-4bf9-9dca-1bf318d6469f"
 *                       nama_verifikator_3:
 *                         type: string
 *                         example: "opt udara"
 *                       tanggal_verifikasi_3:
 *                         type: string
 *                         example: "28-09-2025 09:32 WIB"
 *                       status_verifikasi:
 *                         type: number
 *                         example: 4
 *                       status_enum:
 *                         type: string
 *                         example: "CLOSED"
 *                       id_reject_tindaklanjut:
 *                         type: string
 *                         nullable: true
 *                         example: null
 *                       nama_reject_tindaklanjut:
 *                         type: string
 *                         nullable: true
 *                         example: null
 *                       tanggal_reject_tindaklanjut:
 *                         type: string
 *                         nullable: true
 *                         example: null
 *       404:
 *         description: Tindak lanjut records not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Laporan kejadian not found"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Failed to fetch laporan kejadian"
 *
 * /v2/incident-report/approve-tindak-lanjut/{id}:
 *   put:
 *     tags: [v2 Incident Report]
 *     summary: Approve or Reject Incident Report Tindak Lanjut
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the incident report tindak lanjut
 *         example: "cfaa6823-0f32-4310-ae67-a42fbb21ec52"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - statusApproval
 *             properties:
 *               statusApproval:
 *                 type: string
 *                 enum:
 *                   - PENDING_VERIFIKASI_3
 *                   - VERIFIED
 *                   - REJECTED
 *                 description: Status approval for the incident report Tindak Lanjut
 *                 example: "PENDING_VERIFIKASI_3"
 *               tanggalVerifikasi:
 *                 type: string
 *                 example: "2026-01-17T15:27:00+07"
 *     responses:
 *       200:
 *         description: Incident report status successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "status laporan kejadian berhasil diperbarui."
 *       400:
 *         description: Bad request - Invalid input
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Invalid status approval"
 *       404:
 *         description: Incident report not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Incident report not found"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Failed to update incident report status"
 * /v2/incident-report/create:
 *   post:
 *     tags: [v2 Incident Report]
 *     summary: create Incident Report
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - statusApproval
 *             properties:
 *               nama_laporan:
 *                  type: string
 *                  example: "nama laporan"
 *               kronologi_kejadian:
 *                  type: string
 *                  example: "kronologi"
 *               dampak:
 *                  type: string
 *                  example: "dampak"
 *               jenis_kejadian:
 *                  type: string
 *                  example: "jenis kejadian"
 *               waktu_kejadian:
 *                  type: string
 *                  example: "2025-10-22"
 *               waktu_kejadian_zone:
 *                  type: number
 *                  example: 7
 *               data_pendukung:
 *                  type: array
 *                  items:
 *                    type: string
 *                  example:
 *                    - "upload-7062165100297109397.pdf"
 *                    - "upload-13951801796654013244.pdf"
 *               lokasi:
 *                  type: string
 *                  example: "jogja"
 *               longitude:
 *                  type: number
 *                  example: 106.89032836082124
 *               latitude:
 *                  type: number
 *                  example: -6.190694263405478
 *               upt_terkait:
 *                  type: array
 *                  items:
 *                      type: string
 *                  example:
 *                      - "darat"
 *                      - "laut"
 *               eselon_terkait:
 *                  type: array
 *                  items:
 *                      type: string
 *                  example:
 *                      - "darat"
 *                      - "laut"
 *               catatan_tindak_lanjut_awal:
 *                  type: string
 *                  example: "tindak lanjut"
 *
 *     responses:
 *       200:
 *         description: Incident report created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "status laporan kejadian berhasil diperbarui."
 *       400:
 *         description: Bad request - Invalid input
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Invalid"
 *       404:
 *         description: Incident report not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "not found"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "internal server error"
 * /v2/incident-report/tindak-lanjut/create:
 *   post:
 *     tags: [v2 Incident Report]
 *     summary: create tindak lanjut
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_laporan_kejadian:
 *                  type: string
 *                  example: "2fc22a9e-2673-40e4-92b7-7e3a76247e51"
 *               tindak_lanjut:
 *                  type: string
 *                  example: "tindak lanjut"
 *               waktu_tindak_lanjut:
 *                  type: string
 *                  example: "2025-12-31"
 *               data_pendukung_tindak_lanjut:
 *                  type: array
 *                  items:
 *                    type: string
 *                  example:
 *                    - "upload-7062165100297109397.pdf"
 *                    - "upload-13951801796654013244.pdf"
 *
 *     responses:
 *       200:
 *         description: Incident report status successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: "tindak lanjut created"
 *       400:
 *         description: Bad request - Invalid input
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "Invalid"
 *       404:
 *         description: Incident report not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "not found"
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: false
 *                 message:
 *                   type: string
 *                   example: "internal server error"
 */
