import { ErrorType } from '../../errorType'
export class DomainError {
    static async bad_request(message: string = 'Les ressources envoyés ne sont pas valide'): Promise<ErrorType> {
        return {
            status: 400,
            message: message
        }
    }
}