/**
 * @openapi
 * components:
 *   schemas:
 *     LaporanPoskoShift:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         name:
 *           type: string
 *           example: "Shift Pagi"
 *         startTime:
 *           type: string
 *           format: time
 *           example: "08:00:00"
 *         endTime:
 *           type: string
 *           format: time
 *           example: "16:00:00"
 * /master/provinsi:
 *   get:
 *     tags:
 *     - Master Data
 *     summary: Get the list of provinces
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: listProvinsiId
 *         schema:
 *           type: string
 *           example: "2,3,4"
 *           description: Comma-separated list of province IDs to filter province.
 *     description: Retrieves a list of provinces data from the database.
 *     responses:
 *       200:
 *         description: Successfully fetched provinces
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: number
 *                       namaProvinsi:
 *                         type: string
 *                       isPantau:
 *                         type: string
 *                       kodeBpjs:
 *                         type: string
 *                       kodeMendagri:
 *                         type: string
 *       500:
 *         description: Internal server error
 *
 * /master/kabupaten:
 *   get:
 *     tags:
 *     - Master Data
 *     summary: Get the list of regencies
 *     security:
 *       - bearerAuth: []
 *     description: Retrieves a list of regencies data from the database.
 *     parameters:
 *       - in: query
 *         name: idProvinsi
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Successfully fetched regencies
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       idProvinsi:
 *                         type: number
 *                       namaKabupaten:
 *                         type: string
 *                       jmlKec:
 *                         type: number
 *                       jmlDesa:
 *                         type: number
 *                       sumberData:
 *                         type: string
 *                       statusData:
 *                         type: number
 *                       ketData:
 *                         type: string
 *                       shapeLeng:
 *                         type: string
 *                       shapeArea:
 *                         type: string
 *                       kodeBpjs:
 *                         type: string
 *                       kodeMendagri:
 *                         type: string
 *       500:
 *         description: Internal server error
 *
 * /master/user-approval:
 *   get:
 *     tags:
 *     - Master Data
 *     summary: Get the list of user approval
 *     security:
 *       - bearerAuth: []
 *     description: Retrieves a list of user approval data from the database.
 *     responses:
 *       200:
 *         description: Successfully fetched user approvals
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       username:
 *                         type: string
 *                       fullname:
 *                         type: string
 *                       kantor:
 *                         type: string
 *                       role:
 *                         type: string
 *       500:
 *         description: Internal server error
 *
 * /master/terminal:
 *   get:
 *     tags:
 *     - Master Data
 *     summary: Get the list of terminals
 *     security:
 *       - bearerAuth: []
 *     description: Retrieves a list of terminal data with optional search and pagination.
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: number
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: number
 *           default: 10
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *           default: ""
 *       - in: query
 *         name: provinsi
 *         schema:
 *           type: string
 *           default: ""
 *       - in: query
 *         name: filterBySimpul
 *         schema:
 *           type: string
 *           default: "0"
 *     responses:
 *       200:
 *         description: Successfully fetched terminals
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: number
 *                       idLlaj:
 *                         type: number
 *                       namaTerminal:
 *                         type: string
 *                       kodePrasarana:
 *                         type: string
 *                       tipe:
 *                         type: string
 *                       luas:
 *                         type: string
 *                       alamat:
 *                         type: string
 *                       kodepos:
 *                         type: string
 *                       telp:
 *                         type: string
 *                       fax:
 *                         type: string
 *                       idKabupaten:
 *                         type: string
 *                       idProvinsi:
 *                         type: number
 *                       kx:
 *                         type: string
 *                       ky:
 *                         type: string
 *                       kxy:
 *                         type: string
 *                       koordinat:
 *                         type: string
 *                       xDec:
 *                         type: string
 *                       yDec:
 *                         type: string
 *                       kapasitasPnp:
 *                         type: number
 *                       statusReport:
 *                         type: number
 *                       createdUser:
 *                         type: string
 *                         nullable: true
 *                       createdDate:
 *                         type: string
 *                         nullable: true
 *                       updatedUser:
 *                         type: string
 *                         nullable: true
 *                       updatedDate:
 *                         type: string
 *                         nullable: true
 *                       tipeOld:
 *                         type: string
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: number
 *                     page:
 *                       type: string
 *                     limit:
 *                       type: string
 *                     totalPages:
 *                       type: number
 *       500:
 *         description: Internal server error
 *
 * /master/po-terminal:
 *   get:
 *     tags:
 *     - Master Data
 *     summary: Get the list of PO terminals
 *     security:
 *       - bearerAuth: []
 *     description: Retrieves a list of PO terminals with optional search and pagination.
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: number
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: number
 *           default: 10
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *           default: ""
 *       - in: query
 *         name: provinsi
 *         schema:
 *           type: string
 *           default: ""
 *       - in: query
 *         name: filterBySimpul
 *         schema:
 *           type: string
 *           default: "0"
 *     responses:
 *       200:
 *         description: Successfully fetched PO terminals
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       namaPo:
 *                         type: string
 *                         example: "AL - HIJRAH"
 *                       total:
 *                         type: string
 *                         example: "47"
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: number
 *                       example: 10
 *                     page:
 *                       type: string
 *                       example: "1"
 *                     limit:
 *                       type: string
 *                       example: "10"
 *                     totalPages:
 *                       type: number
 *                       example: 1
 *       500:
 *         description: Internal server error
 *
 * /master/trayek:
 *   get:
 *     tags:
 *     - Master Data
 *     summary: Get the list of Trayek ASDP
 *     security:
 *       - bearerAuth: []
 *     description: Retrieves a list of trayek data with optional search and pagination.
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: number
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: number
 *           default: 10
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *           default: ""
 *       - in: query
 *         name: filterBySimpul
 *         schema:
 *           type: string
 *           default: "0"
 *       - in: query
 *         name: idPelabuhanAsal
 *         schema:
 *           type: number
 *     responses:
 *       200:
 *         description: Successfully fetched terminals
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: number
 *                         example: 1
 *                       namaKapal:
 *                         type: string
 *                         example: "NUSA MULIA"
 *                       pelabuhanAsal:
 *                         type: string
 *                         example: "Merak"
 *                       pelabuhanTujuan:
 *                         type: string
 *                         example: "Bakauheni"
 *                       order:
 *                         type: number
 *                         example: 1
 *                       idKapal:
 *                         type: number
 *                         example: 18
 *                       idPelabuhanAsal:
 *                         type: number
 *                         example: 463
 *                       idPelabuhanTujuan:
 *                         type: number
 *                         example: 627
 *                       updatedDate:
 *                         type: string
 *                         nullable: true
 *                         example: "2020-05-07T05:14:38.000Z"
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: number
 *                       example: 4006
 *                     page:
 *                       type: string
 *                       example: "1"
 *                     limit:
 *                       type: string
 *                       example: "10"
 *                     totalPages:
 *                       type: number
 *                       example: 401
 *       500:
 *         description: Internal server error
 *
 * /master/pelabuhan:
 *   get:
 *     tags:
 *       - Master Data
 *     summary: Get the list of Pelabuhan
 *     security:
 *       - bearerAuth: []
 *     description: Retrieves a list of pelabuhan data with optional search and pagination.
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: number
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: number
 *           default: 10
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *           default: ""
 *       - in: query
 *         name: pelabuhanId
 *         schema:
 *           type: string
 *           default: ""
 *       - in: query
 *         name: provinsiId
 *         schema:
 *           type: string
 *           default: ""
 *       - in: query
 *         name: filterBySimpul
 *         schema:
 *           type: string
 *           default: "0"
 *       - in: query
 *         name: isDeleted
 *         schema:
 *           type: boolean
 *           default: false
 *       - in: query
 *         name: isAsdp
 *         schema:
 *           type: boolean
 *           default: false
 *     responses:
 *       200:
 *         description: Successfully fetched terminals
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: number
 *                         example: 1
 *                       isAsdp:
 *                         type: string
 *                         example: "0"
 *                       kodePelabuhan:
 *                         type: string
 *                         example: "12.4.1.1.362"
 *                       namaPelabuhan:
 *                         type: string
 *                         example: "Belawan"
 *                       kodeReferensiPelabuhan:
 *                         type: string
 *                         example: "BLW"
 *                       kodeReferensiPelabuhanIpn:
 *                         type: string
 *                         nullable: true
 *                         example: "IDBLW"
 *                       isIpn:
 *                         type: number
 *                         nullable: true
 *                         example: 1
 *                       operator:
 *                         type: string
 *                         nullable: true
 *                         example: ""
 *                       idParent:
 *                         type: string
 *                         example: "0"
 *                       klasifikasi:
 *                         type: number
 *                         example: 1
 *                       klasifikasiAsdp:
 *                         type: string
 *                         example: "2"
 *                       kelas:
 *                         type: number
 *                         example: 1
 *                       kapasitas:
 *                         type: number
 *                         example: 0
 *                       alamat:
 *                         type: string
 *                         example: "Jl. Ujung Baru Terminal Penumpang LT. II Pelabuhan Belawan 20411 Belawan Kota : Medan Propinsi : Sumatera Utara."
 *                       jenis:
 *                         type: string
 *                         example: "Pel. Pantau"
 *                       idProvinsi:
 *                         type: number
 *                         example: 12
 *                       idKabupaten:
 *                         type: number
 *                         example: 1275
 *                       kontak:
 *                         type: string
 *                         example: "agung"
 *                       hp:
 *                         type: string
 *                         example: "0"
 *                       telp:
 *                         type: string
 *                         example: "061-6941424"
 *                       fax:
 *                         type: string
 *                         example: "0"
 *                       email:
 *                         type: string
 *                         example: "syahbandar_belawan@yahoo.com"
 *                       lat:
 *                         type: string
 *                         example: "3.787786"
 *                       lan:
 *                         type: string
 *                         example: "98.704083"
 *                       namaPlbhOld:
 *                         type: string
 *                         example: "BELAWAN"
 *                       statusReport:
 *                         type: string
 *                         example: "1"
 *                       isIntegrasiAsdp:
 *                         type: number
 *                         example: 0
 *                       kapasitasPnp:
 *                         type: number
 *                         example: 0
 *                       kxy:
 *                         type: string
 *                         example: "-"
 *                       timezone:
 *                         type: string
 *                         example: "Asia/Jakarta"
 *                       isException:
 *                         type: string
 *                         example: "0"
 *                       createdUser:
 *                         type: number
 *                         example: 287
 *                       createdDate:
 *                         type: string
 *                         nullable: true
 *                         format: date-time
 *                         example: ""
 *                       updatedUser:
 *                         type: string
 *                         example: "438"
 *                       updatedDate:
 *                         type: string
 *                         nullable: true
 *                         format: date-time
 *                         example: ""
 *                       deletedBy:
 *                         type: string
 *                         nullable: true
 *                         example: ""
 *                       deletedDate:
 *                         type: string
 *                         nullable: true
 *                         format: date-time
 *                         example: ""
 *                       provinsi:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: number
 *                             example: 12
 *                           namaProvinsi:
 *                             type: string
 *                             example: "Sumatera Utara"
 *                           isPantau:
 *                             type: string
 *                             example: "0"
 *                           kodeBps:
 *                             type: string
 *                             example: "12"
 *                           kodeMendagri:
 *                             type: string
 *                             example: "12"
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: number
 *                       example: 4006
 *                     page:
 *                       type: string
 *                       example: "1"
 *                     limit:
 *                       type: string
 *                       example: "10"
 *                     totalPages:
 *                       type: number
 *                       example: 401
 *       500:
 *         description: Internal server error
 *
 * /master/kapal-laut:
 *   get:
 *     tags:
 *       - Master Data
 *     summary: Get the list of Kapal Laut
 *     security:
 *       - bearerAuth: []
 *     description: Retrieves a list of kapal laut data with optional search and pagination.
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: number
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: number
 *           default: 100
 *       - in: query
 *         name: search
 *         schema:
 *           type: string
 *           default: "asas"
 *       - in: query
 *         name: listIdKapal
 *         schema:
 *           type: string
 *           example: "2,3,4"
 *           description: Comma-separated list of kapal IDs to filter kapal.
 *     responses:
 *       200:
 *         description: Successfully fetched kapal laut
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: number
 *                         example: 1259
 *                       idPerusahaan:
 *                         type: number
 *                         example: 6
 *                       idJenisKapal:
 *                         type: string
 *                         example: " "
 *                       namaKapal:
 *                         type: string
 *                         example: "ANDIKA 02 SPEED"
 *                       dwt:
 *                         type: number
 *                         example: 0
 *                       gt:
 *                         type: number
 *                         example: 0
 *                       kapasitas:
 *                         type: number
 *                         example: 0
 *                       kapasitasAkhir:
 *                         type: number
 *                         example: 17
 *                       kapasitasRoda2:
 *                         type: number
 *                         nullable: true
 *                         example: 0
 *                       kapasitasRoda4:
 *                         type: number
 *                         nullable: true
 *                         example: 0
 *                       kendaraan:
 *                         type: number
 *                         example: 0
 *                       dispen:
 *                         type: number
 *                         example: 0
 *                       geladak:
 *                         type: string
 *                         example: "0"
 *                       createdUser:
 *                         type: number
 *                         example: 279
 *                       createdDate:
 *                         type: string
 *                         nullable: true
 *                         format: date-time
 *                         example: "2024-12-18T00:00:00.000Z"
 *                       updatedUser:
 *                         type: number
 *                         nullable: true
 *                         example: 0
 *                       updatedDate:
 *                         type: string
 *                         nullable: true
 *                         format: date-time
 *                         example: ""
 *                       panjang:
 *                         type: string
 *                         example: "0"
 *                       lebar:
 *                         type: string
 *                         example: "0"
 *                       tahunKapal:
 *                         type: number
 *                         nullable: true
 *                         example: 2019
 *                       grt:
 *                         type: number
 *                         nullable: true
 *                         example: 0
 *                       knot:
 *                         type: number
 *                         nullable: true
 *                         example: 0
 *                       jenisOrg:
 *                         type: string
 *                         example: ""
 *                       namaPemilik:
 *                         type: string
 *                         example: ""
 *                       alamatPemilik:
 *                         type: string
 *                         example: ""
 *                       noRegister:
 *                         type: string
 *                         example: ""
 *                       status:
 *                         type: string
 *                         example: "0"
 *                       isAsdp:
 *                         type: string
 *                         nullable: true
 *                         example: ""
 *                       isException:
 *                         type: string
 *                         example: "0"
 *                       perusahaan:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: number
 *                             example: 13
 *                           namaPerusahaan:
 *                             type: string
 *                             example: "ASDP IF.PT"
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: number
 *                       example: 500
 *                     page:
 *                       type: string
 *                       example: "1"
 *                     limit:
 *                       type: string
 *                       example: "100"
 *                     totalPages:
 *                       type: number
 *                       example: 5
 *       500:
 *         description: Internal server error
 *
 * /master/kapal-asdp:
 *   get:
 *     tags:
 *       - Master Data
 *     summary: Get the list of Kapal ASDP
 *     security:
 *       - bearerAuth: []
 *     description: Retrieves a list of kapal ASDP data with optional search, pagination, and filtering by lintasan.
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: number
 *           default: 1
 *       - in: query
 *         name: limit
 *         schema:
 *           type: number
 *           default: 10
 *       - in: query
 *         name: listLintasan
 *         schema:
 *           type: string
 *           example: "2,3,4"
 *           description: Comma-separated list of lintasan IDs to filter kapal.
 *       - in: query
 *         name: listIdKapal
 *         schema:
 *           type: string
 *           example: "2,3,4"
 *           description: Comma-separated list of kapal IDs to filter kapal.
 *     responses:
 *       200:
 *         description: Successfully fetched kapal ASDP
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       idKapal:
 *                         type: number
 *                         example: 41
 *                       idJenisKapal:
 *                         type: number
 *                         example: 8
 *                       idLintasan:
 *                         type: number
 *                         example: 2
 *                       idPerusahaan:
 *                         type: number
 *                         example: 13
 *                       idpp1:
 *                         type: string
 *                         example: "2"
 *                       idpp2:
 *                         type: string
 *                         example: "2"
 *                       namaKapal:
 *                         type: string
 *                         example: "PRATHITA IV"
 *                       thnKapal:
 *                         type: number
 *                         example: 0
 *                       grt:
 *                         type: number
 *                         example: 507
 *                       knot:
 *                         type: number
 *                         example: 0
 *                       kapasitasPnp:
 *                         type: number
 *                         example: 372
 *                       kapasitasRoda4:
 *                         type: number
 *                         example: 39
 *                       kapasitasRoda2:
 *                         type: number
 *                         example: 90
 *                       statusKapal:
 *                         type: number
 *                         example: 1
 *                       status:
 *                         type: number
 *                         example: 1
 *                       createdUser:
 *                         type: string
 *                         nullable: true
 *                         example: ""
 *                       createdDate:
 *                         type: string
 *                         nullable: true
 *                         example: ""
 *                       updatedUser:
 *                         type: string
 *                         nullable: true
 *                         example: ""
 *                       updatedDate:
 *                         type: string
 *                         format: date-time
 *                         example: "2023-12-15T14:50:47.000Z"
 *                       perusahaan:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: number
 *                             example: 13
 *                           namaPerusahaan:
 *                             type: string
 *                             example: "ASDP IF.PT"
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: number
 *                       example: 66
 *                     page:
 *                       type: string
 *                       example: "1"
 *                     limit:
 *                       type: string
 *                       example: "10"
 *                     totalPages:
 *                       type: number
 *                       example: 7
 *       500:
 *         description: Internal server error
 * /master/upt:
 *   get:
 *     tags:
 *     - Master Data
 *     summary: Get list of role / UPT
 *     security:
 *       - bearerAuth: []
 *     description: Retrieve list of user roles (UPT) from Hubnet API.
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: number
 *           example: 1
 *       - in: query
 *         name: perPage
 *         schema:
 *           type: number
 *           example: 1000
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *           example: "laut"
 *           description: Search text for filtering nama penyelenggara.
 *     responses:
 *       200:
 *         description: Successfully fetched eselon data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       penyelenggara_cd:
 *                         type: string
 *                       penyelenggara_nama:
 *                         type: string
 *                       struktur_induk_nama:
 *                         type: string
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: number
 *                     page:
 *                       type: number
 *                     perPage:
 *                       type: number
 *       500:
 *         description: Internal server error
 * /master/eselon:
 *   get:
 *     tags:
 *     - Master Data
 *     summary: Get list of Eselon / Struktur Organisasi
 *     security:
 *       - bearerAuth: []
 *     description: Retrieves a list of struktur organisasi eselon from Hubnet API.
 *     parameters:
 *       - in: query
 *         name: search_term
 *         schema:
 *           type: string
 *           example: "LAUT"
 *           description: Search keyword for filtering role name.
 *     responses:
 *       200:
 *         description: Successfully fetched UPT / role data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       deskripsi:
 *                         type: string
 *                       akses:
 *                         type: array
 *                         items:
 *                           type: string
 *                       createBy:
 *                         type: string
 *                       createDate:
 *                         type: string
 *                       updateBy:
 *                         type: string
 *                       updateDate:
 *                         type: string
 *                       isAdmin:
 *                         type: boolean
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     total:
 *                       type: number
 *       500:
 *         description: Internal server error
 *
 *
 * /master/posko-shift:
 *   get:
 *     tags:
 *       - Master Data
 *     summary: Get list shift
 *     security:
 *       - bearerAuth: []
 *     description: Retrieve all shift data.
 *     responses:
 *       200:
 *         description: Successfully fetched shift list
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: "#/components/schemas/LaporanPoskoShift"
 */
