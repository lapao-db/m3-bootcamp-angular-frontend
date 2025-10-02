// definir la estructura de los datos
export interface Product {
    _id:string;
    image: string; //URL de la imagen
    title: string; // Es campo requerido -> por defecto lo va a pedir
    description?: string; // NO es requerido -> se pone en duda agregar '?'
    price: number;
    categories?: string;
    isAvailable?: boolean;
    date?: Date; // COmo esta por defecto, no se necesitaria manejar la información desde el frontend (opcional)
}
