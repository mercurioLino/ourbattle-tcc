export interface User{
    id: number;
    email: string;
    role: Role;
    access_token?: string;
    token_type?: string;
}

export interface LoginData{
    access_token?: string;
    token_type?: string;
}

export enum Role {
    Organizacao = 'organizacao',
    Jogador = 'jogador',
    Admin = 'admin',
}