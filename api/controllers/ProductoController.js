import { ProductoService } from "../services/ProductoService.js";

// Crear instancia del servicio
const productoService = new ProductoService();

export class ProductoController {
  static async getProductos(req, res) {
    try {
      const { idCategoria, limit } = req.query;
      console.log(idCategoria, limit);
      const result = await productoService.getProductos(idCategoria, limit);

      if (!result) {
        return res.status(400).json({
          error: "Error al listar productos",
          result,
        });
      }

      return res.status(200).json({
        mensaje: "Productos listados correctamente",
        data: result.data,
      });
    } catch (error) {
      console.error("Error en getProductos:", error);
      return res.status(500).json({
        error: "Error interno del servidor",
      });
    }
  }

  static async getProductoById(req, res) {
    try {
      const { idProducto } = req.params;
      const id = Number(idProducto);
      const result = await productoService.getProductoById(id);

      if (!result) {
        return res.status(404).json({
          error: "Producto no encontrado",
        });
      }

      return res.status(200).json({
        mensaje: "Producto encontrado",
        data: result.data,
      });
    } catch (error) {
      console.error("Error en getProductoById:", error);
      return res.status(500).json({
        error: "Error interno del servidor",
      });
    }
  }

  static async createProducto(req, res) {
    try {
      const result = await productoService.createProducto(req.body, req.file);

      if (!result) {
        return res.status(400).json({
          error: "Error al crear el producto",
        });
      }

      return res.status(201).json({
        mensaje: "Producto creado correctamente",
        data: result.data,
      });
    } catch (error) {
      console.error("Error en createProducto:", error);
      return res.status(500).json({
        error: "Error interno del servidor",
      });
    }
  }

  static async updateProducto(req, res) {
    try {
      const { id } = req.params;
      const result = await productoService.updateProducto(id, req.body);

      if (!result) {
        return res.status(404).json({
          error: "Producto no encontrado",
        });
      }

      return res.status(200).json({
        mensaje: "Producto actualizado correctamente",
        data: result.data,
      });
    } catch (error) {
      console.error("Error en updateProducto:", error);
      return res.status(500).json({
        error: "Error interno del servidor",
      });
    }
  }

  static async deleteProducto(req, res) {
    try {
      const { id } = req.params;
      const result = await productoService.deleteProducto(id);

      if (!result) {
        return res.status(404).json({
          error: "Producto no encontrado",
        });
      }

      return res.status(200).json({
        mensaje: "Producto eliminado correctamente",
      });
    } catch (error) {
      console.error("Error en deleteProducto:", error);
      return res.status(500).json({
        error: "Error interno del servidor",
      });
    }
  }
}
