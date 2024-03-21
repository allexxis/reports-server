# DSS Explotación

Este módulo solo sirve para aquellos clientes que tienen activado el módulo de Front Desk porque existen clientes que solo tienen POS o tour operador.

```sql
begin
    declare @desde datetime = '2024-01-01 00:00:00.000'
    declare @hasta datetime = '2024-03-05 00:00:00.000'
    declare @orden int = 0
    declare @id_mone int = 0
    declare @tasa numeric(13, 8) = null
    declare @TipoInforme varchar(100) = ''
    declare @Fil_id_agen bit = null
    declare @vFil_id_agen int = 0
    declare @Fil_id_merc bit = null
    declare @vFil_id_merc int = 0
    declare @Fil_id_cont bit = null
    declare @vFil_id_cont int = 0
    declare @Fil_id_thab bit = null
    declare @vFil_id_thab int = 0
    declare @Fil_id_uhab bit = null
    declare @vFil_id_uhab int = 0
    declare @Fil_tipo bit = null
    declare @vFil_tipo bit = null
    declare @full_ingresos bit = null

    exec
       dbo.DSS_Explotacion
                  @desde,
                  @hasta,
                  @orden,
                  @id_mone,
                  @tasa,
                  @TipoInforme,
                  @Fil_id_agen,
                  @vFil_id_agen,
                  @Fil_id_merc,
                  @vFil_id_merc,
                  @Fil_id_cont,
                  @vFil_id_cont,
                  @Fil_id_thab,
                  @vFil_id_thab,
                  @Fil_id_uhab,
                  @vFil_id_uhab,
                  @Fil_tipo,
                  @vFil_tipo,
                  @full_ingresos

end
```

Este es el objeto que devuelve un row en el procedimiento, no todos son strings este objeto es para explicar qué representa cada campo

```javascript
{
    contrato: '',
    desc_cont: '',
    agencia: '',
    desc_merc: '',
    uso_hab: '',
    desc_uso_hab: '',
    tipo_hab: '',
    desc_t_hab:  '',
    hospedaje: '',
    ayb:  '',
    otros: '',
    noches: '',
    hab_noches:  '',
    adultos:  '',
    ninos:  '',
    ad_noche:  '',
    ni_noche: '',
    fecha: '',
    Agrupador:  '',
    AgrupadorVal:  '',
    DEtalle:  '',
    DetalleVal:   '',
    FecIni:  '',
    FecFin:  '',
    capacidad:  '',
    capacidad_for:  '',
    plazas:  '',
    plazas_for:  '',
    otros_front: '',
    otros_pv: '',
    Moneda: '',
    TarifaProm:  '',
    TipoInforme: '',
    OcultarDetalle: '',
    hosp_porc:  '',
    ayb_porc:  '',
    otros_porc:  '',
    noches_porc:  '',
    ad_noches_porc:  '',
  },

```
