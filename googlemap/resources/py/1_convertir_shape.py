from osgeo import ogr
import json

def convert_shape_to_json(shapefile_path, output_json_path):
    # Abrir el archivo Shapefile
    shapefile = ogr.Open(shapefile_path)
    if shapefile is None:
        print("No se pudo abrir el archivo Shapefile.")
        return
    
    # Obtener la primera capa del Shapefile
    layer = shapefile.GetLayer(0)

    # Obtener la cantidad de registros en la capa
    num_records = layer.GetFeatureCount()
    print(f"Se encontraron {num_records} registros en la capa.")

    # Crear una lista para almacenar las características en formato JSON
    features_json = []
    id_correlativo = 1
    for feature in layer:
        # Obtener la geometría de la característica
        geometry = feature.GetGeometryRef()
        # Convertir la geometría a GeoJSON
        geojson = geometry.ExportToJson()  # Modificación aquí
        
        # Obtener los atributos de la característica
        attributes = feature.items()
        # Combinar geometría y atributos en un diccionario
        feature_json = {
            "type": "Feature",
            "geometry": geojson,
            "properties": dict(attributes)
        }
        
        # Agregar más propiedades según sea necesario
        # Por ejemplo, agregar una propiedad "nueva_propiedad" con un valor específico
        # feature_json["properties"]["{output_json_path[:-4]}_id"] = id_correlativo
        feature_json["properties"][f"{output_json_path[:-4]}_id"] = id_correlativo

        id_correlativo += 1

        features_json.append(feature_json)

    # Crear el objeto GeoJSON final
    geojson_data = {
        "type": "FeatureCollection",
        "features": features_json
    }

    # Escribir el objeto GeoJSON en un archivo JSON
    with open(output_json_path, "w") as json_file:
        json.dump(geojson_data, json_file, indent=2)

    print(f"El archivo GeoJSON se ha creado exitosamente en: {output_json_path}")

# Uso de la función
convert_shape_to_json("fibra.shp", "fibra_tmp.json")
convert_shape_to_json("postes.shp", "postes_tmp.json")
# convert_shape_to_json("sp_nivel01.shp", "sp_nivel01.json")
# convert_shape_to_json("sp_nivel02.shp", "sp_nivel02.json")
