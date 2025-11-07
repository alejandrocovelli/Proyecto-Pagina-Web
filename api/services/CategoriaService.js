import { CategoriaRepository } from "../repositories/CategoriaRepository";

export class CategoriaService {
    constructor() {
        this.categoriaRepository = new CategoriaRepository()
    }

    async getCategorias() {
        const categorias = await this.categoriaRepository.getCategorias();
        return { success: true, data: categorias };
    }
}