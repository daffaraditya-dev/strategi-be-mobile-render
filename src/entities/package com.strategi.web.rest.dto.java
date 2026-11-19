package com.strategi.web.rest.dto.request.dataProduksiSdp;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.time.LocalDate;

@Data
public class SearchDataProduksiSdpDto {
    private Integer jenis; //1 = keberangkatan, 2 = kedatangan

    @JsonProperty("is_nihil")
    private Boolean isNihil = false;

    @JsonProperty("is_delete")
    private Boolean isDelete = false;

    @JsonProperty("id_provinsi")
    private Long idProvinsi;

    @JsonProperty("id_pelabuhan")
    private Long idPelabuhan;

    /*
    @JsonProperty("id_pelabuhan_asal")
    private Long idPelabuhanAsal;

    @JsonProperty("id_pelabuhan_tujuan")
    private Long idPelabuhanTujuan;
    */

    @JsonProperty("start_date")
    private LocalDate startDate;

    @JsonProperty("end_date")
    private LocalDate endDate;

    private Integer page = 1;

    @JsonProperty("per_page")
    private Integer perPage = 10;

    @JsonProperty("filter_by_simpul_user")
    private Boolean filterBySimpulUser = false;
    //keberangkatan (jenis 1) : filter menurut pelabuhan asal
    //kedatangan (jenis 2) : filter menurut pelabuhan tujuan
}
