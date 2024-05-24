import json
from pymongo import MongoClient
from bson.errors import InvalidDocument

# Variables para la cadena de conexión
usuario = "jnoriegav"
contraseña = "Mongodb.s4p3"
host = "jnv-cluster.ruojgp0.mongodb.net"
nombre_base_de_datos = "jnv-cluster"

def validar_dato(dato):
    try:
        # Intenta convertir el dato a un diccionario de Python
        print(dato)
        _ = json.loads(json.dumps(dato))
        return True
    except ValueError:
        # Imprime un mensaje de advertencia y retorna False
        print(f"Advertencia: El dato '{dato}' no es un diccionario válido.")
        return False

def cargar_json(nombre_archivo, nombre_coleccion):
    # Cadena de conexión
    cadena_conexion = f"mongodb+srv://{usuario}:{contraseña}@{host}/?retryWrites=true&w=majority&appName={nombre_base_de_datos}"
    # cadena_conexion = "mongodb+srv://jnoriegav:Mongodb.s4p3@jnv-cluster.ruojgp0.mongodb.net/?retryWrites=true&w=majority&appName=jnv-cluster"

    with open(nombre_archivo, 'r') as file:
        datos = json.load(file)

    # Intenta conectar a MongoDB
    client = MongoClient(cadena_conexion)
    if client.server_info():
        print(f"Conexión exitosa a {cadena_conexion}")
        cant_guardados = 0
        db = client['test']  # Reemplaza 'nombre_base_de_datos' con el nombre real de tu base de datos
        
        # Verifica si la colección existe antes de intentar crearla
        if nombre_coleccion not in db.list_collection_names():
            print(f"Colección {nombre_coleccion} creada.")
            db.create_collection(nombre_coleccion)
        else:
            print(f"Colección {nombre_coleccion} ya existe.")

        # Parsear el JSON
        datax = json.loads(json.dumps(datos))
        # features = datax['features']
        # print(features)
        # Filtra los datos válidos y los inserta en la base de datos
        # datos_validos = [dato for dato in datos if validar_dato(dato)]
        # datos_validos = [dato for dato in features if validar_dato(dato)]
        datos_validos = [dato for dato in datax ]
        # print(datos)
        for dato in datos_validos:
            try :
                db[nombre_coleccion].insert_one(dato)
                cant_guardados += 1
                if cant_guardados % 200 == 0:
                    print(f"Van {cant_guardados} de {len(datos_validos)} registros guardados.")
            except Exception as e:
                print(f"Error al insertar documento: {e}")
        
        print(f"Cantidad de registros guardados en MongoDB desde el archivo '{nombre_archivo}': {cant_guardados}.")
        return True
    else:
        print(f"No se pudo conectar a {cadena_conexion}.")
        return False

# Llamada a la función
cargar_json('__fibra_final.json', 'hilos')
# cargar_json('__postes_final.json', 'postes')
