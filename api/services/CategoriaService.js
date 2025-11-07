import { CategoriaRepository } from "../repositories/CategoriaRepository.js";

export class CategoriaService {
    constructor() {
        this.categoriaRepository = new CategoriaRepository()
    }

    async getCategorias() {
        const categorias = await this.categoriaRepository.getCategorias();
        return { success: true, data: categorias };
    }

    async getCategoriaById(id) {
        const categoria = await this.categoriaRepository.getCategoriaById(id);
        return { success: true, data: categoria };
    }

    async createCategoria(categoriaData) {
        const categoria = await this.categoriaRepository.createCategoria(categoriaData);
        return { success: true, data: categoria };
    }

    async updateCategoria(id, categoriaData) {
        const categoria = await this.categoriaRepository.updateCategoria(id, categoriaData);
        return { success: true, data: categoria };
    }

    async deleteCategoria(id) {
        const result = await this.categoriaRepository.deleteCategoria(id);
        return { success: true, data: result };
    }
}