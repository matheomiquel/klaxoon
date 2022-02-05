import { ErrorType } from '../../errorType'
export class DataError {
    static async ressource_not_found(): Promise<ErrorType> {
        return {
            status: 404,
            message: 'La ressource demandé n\'a pas été trouver'
        }
    }
}