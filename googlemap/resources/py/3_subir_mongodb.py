import json
from pymongo import MongoClient

# Variables para la cadena de conexión
usuario = "jnoriegav"
contraseña = "Mongodb.s4p3"
host = "jnv-cluster.ruojgp0.mongodb.net"
puerto = "27017"  # Puerto por defecto 
nombre_base_de_datos = "jnv-cluster"



def cargar_json(nombre_archivo, nombre_coleccion):
    # Cadena de conexión
    cadena_conexion = f"mongodb://{usuario}:{contraseña}@{host}:{puerto}/{nombre_base_de_datos}"

    with open(nombre_archivo, 'r') as file:
        datos = json.load(file)

    client = MongoClient(cadena_conexion)
    db = client[nombre_base_de_datos]
    collection = db[nombre_coleccion]

    # Insertar los datos en MongoDB
    for dato in datos:
        collection.insert_one(dato)

    print(f"Datos guardados en MongoDB con éxito desde el archivo {nombre_archivo}.")

cargar_json('fibra.json','fibra_2')
cargar_json('postes.json','postes_2')