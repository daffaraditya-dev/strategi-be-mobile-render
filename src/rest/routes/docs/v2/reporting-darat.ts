/**
 * @openapi
 * tags:
 *   - name: v2 Reporting
 *     description: Endpoint untuk manajemen data pelaporan transportasi
 *
 * components:
 *   schemas:
 *     ReportingDaratRequest:
 *       type: object
 *       properties:
 *         tgl_data: { type: string, format: date, example: "1900-01-01" }
 *         jam_data: { type: string, example: "14:08" }
 *         id_terminal_asal: { type: integer, example: 1798 }
 *         id_terminal_tujuan: { type: integer, example: 1798 }
 *         nama_po: { type: string, example: "Nusantara" }
 *         no_pol: { type: string, example: "bb1212" }
 *         jenis_bus: { type: integer, example: 1 }
 *         jml_penumpang_naik: { type: integer, example: 0 }
 *         jml_penumpang_turun: { type: integer, example: 1 }
 *         is_nihil: { type: boolean, example: false }
 *         keterangan_nihil: { type: string, example: "" }
 *         orang_khusus: { type: integer, example: 1 }
 *         pasien: { type: integer, example: 1 }
 *         keluarga: { type: integer, example: 1 }
 *         lembaga: { type: integer, example: 1 }
 *         mudik_gratis: { type: integer, example: 0 }
 *         is_delete: { type: boolean, example: false }
 *         jenis: { type: integer, example: 2 }
 *
 *     ReportingDaratResponse:
 *       type: object
 *       properties:
 *         status: { type: boolean, example: true }
 *         data:
 *           type: object
 *           properties:
 *             tglData: { type: string, format: date-time, example: "1900-01-01" }
 *             jamData: { type: string, example: "14:08" }
 *             idTerminalAsal: { type: integer, example: 1798 }
 *             idTerminalTujuan: { type: integer, example: 1798 }
 *             namaPo: { type: string, example: "Nusantara" }
 *             noPol: { type: string, example: "bb1212" }
 *             jenisBus: { type: integer, example: 1 }
 *             mudikGratis: { type: integer, example: 0 }
 *             createdUser: { type: string, example: "018ebc07-b487-7b90-98d6-b463269f4c96" }
 *             jmlPenumpangNaik: { type: integer, example: 1 }
 *             jmlPenumpangTurun: { type: integer, example: 0 }
 *             isNihil: { type: integer, example: 0 }
 *             approvalStatus: { type: integer, example: 0 }
 *             orangKhusus: { type: integer, example: 1 }
 *             pasien: { type: integer, example: 1 }
 *             keluarga: { type: integer, example: 1 }
 *             lembaga: { type: integer, example: 1 }
 *             keteranganNihil: { type: string, example: "" }
 *             jenis: { type: integer, example: 1 }
 *             isDelete: { type: integer, example: 0 }
 *             createdDate: { type: string, nullable: true, example: "" }
 *             updatedUser: { type: string, nullable: true, example: "" }
 *             updatedDate: { type: string, nullable: true, example: "" }
 *             id: { type: string, example: "6078991" }
 *
 *     DaratReportItem:
 *       type: object
 *       properties:
 *         id: { type: string, example: "6567238" }
 *         tglData: { type: string, format: date, example: "2025-09-16" }
 *         jamData: { type: string, example: "07:05:00" }
 *         jenis: { type: integer, example: 2 }
 *         noPol: { type: string, example: "BM7864JU" }
 *         namaPo: { type: string, example: "SAN" }
 *         jenisBus: { type: integer, example: 1 }
 *         createdUser: { type: string, example: "f585b265-536d-477e-8ee7-9ff245d9cf4f" }
 *         createdDate: { type: string, format: date-time, example: "2025-10-05T05:40:44.356Z" }
 *         updatedUser: { type: string, nullable: true, example: "" }
 *         updatedDate: { type: string, nullable: true, example: "" }
 *         idTerminalAsal: { type: integer, example: 434 }
 *         idTerminalTujuan: { type: integer, example: 24 }
 *         lembaga: { type: integer, example: 0 }
 *         pasien: { type: integer, example: 0 }
 *         keluarga: { type: integer, example: 0 }
 *         orangKhusus: { type: integer, example: 0 }
 *         isDelete: { type: integer, example: 0 }
 *         isNihil: { type: integer, example: 0 }
 *         approvalStatus: { type: integer, nullable: true,example: 0 }
 *         keteranganNihil: { type: string, nullable: true, example: "" }
 *         jmlPenumpangNaik: { type: integer, example: 0 }
 *         jmlPenumpangTurun: { type: integer, example: 35 }
 *         mudikGratis: { type: integer, example: 0 }
 *         terminalAsal:
 *           type: object
 *           properties:
 *             namaTerminal: { type: string, example: "Bandar Raya Payung Sekaki" }
 *             alamat: { type: string, example: "Jl. Tambusari Ujung" }
 *         terminalTujuan:
 *           type: object
 *           properties:
 *             namaTerminal: { type: string, example: "Karya Jaya" }
 *             alamat: { type: string, example: "" }
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
 * /v2/reporting/darat:
 *   get:
 *     tags: [v2 Reporting]
 *     summary: Retrieve list of reporting data
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: terminalAsalId
 *         in: query
 *         schema: { type: string, nullable: true }
 *       - name: terminalTujuanId
 *         in: query
 *         schema: { type: string, nullable: true }
 *       - name: provinsi
 *         in: query
 *         schema: { type: string, nullable: true }
 *       - name: startDate
 *         in: query
 *         required: true
 *         schema: { type: string, format: date }
 *         example: "2025-09-16"
 *       - name: endDate
 *         in: query
 *         required: true
 *         schema: { type: string, format: date }
 *         example: "2025-09-16"
 *       - name: page
 *         in: query
 *         schema: { type: integer }
 *         example: 1
 *       - name: limit
 *         in: query
 *         schema: { type: integer }
 *         example: 10
 *       - name: search
 *         in: query
 *         schema: { type: string }
 *         example: ""
 *       - name: jenis
 *         in: query
 *         schema: { type: integer }
 *         example: 2
 *       - name: filterBySimpul
 *         in: query
 *         schema: { type: integer }
 *         example: 1
 *       - name: filterByApproval
 *         in: query
 *         schema: { type: integer }
 *         example: 0
 *     responses:
 *       "200":
 *         description: List reporting darat
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: { type: boolean, example: true }
 *                 data:
 *                   type: array
 *                   items: { $ref: '#/components/schemas/DaratReportItem' }
 *                 total: { type: integer, example: 6637 }
 *                 page: { type: string, example: "1" }
 *                 limit: { type: string, example: "1" }
 *                 totalPages: { type: integer, example: 6637 }
 *
 *   post:
 *     tags: [v2 Reporting]
 *     summary: Create reporting data
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/ReportingDaratRequest' }
 *     responses:
 *       "200":
 *         description: Data created
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/ReportingDaratResponse' }
 *
 * /v2/reporting/darat/export:
 *   get:
 *     tags: [v2 Reporting]
 *     summary: Retrieve list of reporting data
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: terminalAsalId
 *         in: query
 *         schema: { type: string, nullable: true }
 *       - name: terminalTujuanId
 *         in: query
 *         schema: { type: string, nullable: true }
 *       - name: provinsi
 *         in: query
 *         schema: { type: string, nullable: true }
 *       - name: startDate
 *         in: query
 *         required: true
 *         schema: { type: string, format: date }
 *         example: "2025-09-16"
 *       - name: endDate
 *         in: query
 *         required: true
 *         schema: { type: string, format: date }
 *         example: "2025-09-16"
 *       - name: page
 *         in: query
 *         schema: { type: integer }
 *         example: 1
 *       - name: limit
 *         in: query
 *         schema: { type: integer }
 *         example: 10
 *       - name: search
 *         in: query
 *         schema: { type: string }
 *         example: ""
 *       - name: jenis
 *         in: query
 *         schema: { type: integer }
 *         example: 2
 *       - name: filterBySimpul
 *         in: query
 *         schema: { type: integer }
 *         example: 1
 *     responses:
 *       "200":
 *          description: XLSX report file
 *          content:
 *             application/vnd.openxmlformats-officedocument.spreadsheetml.sheet:
 *               schema:
 *                 type: string
 *                 format: binary
 *
 * /v2/reporting/darat/{id}:
 *   get:
 *     tags: [v2 Reporting]
 *     summary: Get reporting data by ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *         example: "6078934"
 *     responses:
 *       "200":
 *         description: Reporting detail
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/ReportingDaratResponse' }
 *
 *   put:
 *     tags: [v2 Reporting]
 *     summary: Update reporting data
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
 *           schema: { $ref: '#/components/schemas/ReportingDaratRequest' }
 *     responses:
 *       "200":
 *         description: Updated reporting data
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/ReportingDaratResponse' }
 *
 *   delete:
 *     tags: [v2 Reporting]
 *     summary: Delete reporting data
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: string }
 *         example: "6078934"
 *     responses:
 *       "200":
 *         description: Delete success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status: { type: boolean, example: true }
 *                 message: { type: string, example: "Data reporting darat berhasil dihapus" }
 *
 * /v2/reporting/darat/nihil:
 *   post:
 *     tags: [v2 Reporting]
 *     summary: Create nihil reporting entry
 *     description: Endpoint untuk menambahkan laporan nihil berdasarkan terminal dan tanggal.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_terminal: { type: integer, example: 1798 }
 *               tgl_data: { type: string, format: date, example: "1800-01-01" }
 *               keterangan_nihil: { type: string, example: "" }
 *               jenis: { type: integer, example: 2 }
 *     responses:
 *       "200":
 *         description: Nihil report created
 *         content:
 *           application/json:
 *             schema: { $ref: '#/components/schemas/ReportingDaratResponse' }
 *
 * /v2/reporting/darat/approve/{id}:
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
 */
