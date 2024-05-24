import json
import os

def leer_y_validar_json(ruta_archivo):
    try:
        with open(ruta_archivo, 'r') as archivo:
            datos = json.load(archivo) 
            return datos["features"]
    except json.JSONDecodeError as e:
        print(f"Error al leer el archivo JSON: {e}")
        return None

def contar_objetos_por_bloque(datos):
    contador = 0
    for bloque in datos:
        if isinstance(bloque, list):
            contador += len(bloque)
        elif isinstance(bloque, dict):
            contador += 1
    return contador

import json

def agregar_campos(datos):
    id_correlativo = 1
    # for bloque in datos:
    for indice, bloque in enumerate(datos):
        if isinstance(bloque, dict):
            if 'id' not in bloque:
                bloque['id'] = id_correlativo
                id_correlativo += 1
            
            if 'codigo' not in bloque:
                bloque['codigo'] = "COD" + str(id_correlativo)   # valor predeterminado
            
            if 'user' not in bloque:
                bloque['user'] = "Usuario"  # usuario predeterminado

            # if 'geom' in bloque:
            #     try:
            #         # validar formato JSON para geom
            #         geom = json.loads(bloque['geom'])
            #         if not isinstance(geom, dict) or 'lat' not in geom or 'lon' not in geom:
            #             print(f"El campo 'geom' en la posición {indice} no tiene el formato correcto: \"{{\"lat\": ##.##, \"lon\": ##.##}}\". \nRef: {bloque}")
            #             # continue
            #             return False
            #     except json.JSONDecodeError:
            #         print(f"El campo 'geom' en la posición {indice} no es un JSON válido, debe ser \"{{\"lat\": ##.##, \"lon\": ##.##}}\". \nRef: {bloque}")
            #         # continue
            #         return False

            bloque['estado'] = 1
    return datos


def generar_nuevo_json(datos, ruta_salida):
    with open(ruta_salida, 'w') as archivo:
        json.dump(datos, archivo, indent=4)

def main(ruta_archivo, ruta_salida):
    if not os.path.exists(ruta_archivo):
        print(f"El archivo {ruta_archivo} no existe.")
        return
    datos = leer_y_validar_json(ruta_archivo)
    if datos:
        cantidad_objetos = contar_objetos_por_bloque(datos)
        print(f"Se encontraron {cantidad_objetos} objetos en el archivo.")
        
        datos_modificados = agregar_campos(datos)
        if not datos_modificados:
            print(f"No se puede generar el archivo, debe corregir los errores primero.")
        else:
            generar_nuevo_json(datos_modificados, ruta_salida)
            print(f"Archivo JSON modificado guardado en {ruta_salida}.")
    else:
        print("No se pudo procesar el archivo JSON.")

main('_fibra_tmp.json' , '__fibra_final.json')
main('_postes_tmp.json', '__postes_final.json')













"""    // Hilos
{
    "codigo"        : "HILO001",
    "tipo"          : "TIPO",
    "nivel"         : "NIVEL",
    "condicion"     : "APTO",
    "capacidad"     : "20.12",
    "longitud"      : "332.1",
    "color_hex"     : "#af1234",
    "geom"          : "{\"lat\": -8.257521521, \"lon\": -77.2929257142}"
}

// Mufas
{
    "poste_id"        : "6636fc75c00a44f07b82d9ec",
    "capacidad"       : "10",
    "codigo"          : "MUFA001",
    "hilo_id_entrada" : "813445f27e2fb3d4637befc1",
    "hilo_id_salida"  : "26343f27dac8f70e00837cc7",
    "geom"            : "{\"lat\": -8.157521521, \"lon\": -77.2929257142}"
}

// Onus
{
    "hilo_id"             : "bcd1fc75c0be44f82da00",
    "splitter_id"         : "c0be44f0a44f07b82d9ec",
    "cliente_nombre"      : "CLIENTE 001",
    "cliente_direccion"   : "AV. A 123",
    "velocidad_mb"        : "100.5",
    "inicio_contrato"     : "29/04/2024",
    "monto_pago"          : "299.90",
    "icono"               : "default_onu.png",
    "geom"                : "{\"lat\": -11.058521521, \"lon\": -77.485621512}"
}

// Postes
{
    "codigo"       : "POSTE 0001",
    "propietario"  : "PROPIETARIO 001",
    "tipo"         : "TIPO",
    "material"     : "MATE",
    "f12"          : "0",
    "f12b"         : "0",
    "f24"          : "4",
    "f24b"         : "2",
    "f48"          : "0",
    "f48b"         : "0",
    "f96"          : "1",
    "f96b"         : "1",
    "f144"         : "0",
    "f144b"        : "0",
    "icono"        : "default_poste.png",
    "geom"         : "{\"lat\": -11.057522521, \"lon\": -77.485521612}"
}

// Splitters
{
    "splitter_padre"  : "0abe44f0a44f07b82d9ec",
    "poste_id"        : "44f0a433c0be44f82da00",
    "hilo_entrada_id" : "c0be44f82de44f0a521f0a",
    "codigo"          : "SPLITTER 001",
    "capacidad"       : "10",
    "nro"             : "1",
    "zona"            : "Z1",
    "tipo"            : "TIPO",
    "pon"             : "5",
    "nivel"           : "1",
    "icono"           : "default_splitter.png",
    "geom"            : "{\"lat\": -11.057521551, \"lon\": -77.485521562}"
}
"""
