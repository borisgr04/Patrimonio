import { Injectable } from '@angular/core';
import { Result } from '../models/result.model';

export const STORAGE_KEYS = {
  inmuebles: 'pos_inmuebles',
  contratos: 'pos_contratos',
  personas: 'pos_personas',
  pagos: 'pos_pagos',
  mantenimientos: 'pos_mantenimientos',
  tema: 'pos_theme',
  seed: 'pos_seed',
} as const;

@Injectable({ providedIn: 'root' })
export class StorageService {
  private readonly storage = globalThis.localStorage;

  /** Obtiene todos los registros guardados para una clave. */
  getAll<T>(key: string): Result<T[]> {
    try {
      const raw = this.storage.getItem(key);
      if (!raw) {
        return { success: true, data: [] };
      }

      return { success: true, data: JSON.parse(raw) as T[] };
    } catch (error) {
      return { success: false, error: this.toMessage(error) };
    }
  }

  /** Busca un registro por id. */
  getById<T extends { id: string }>(key: string, id: string): Result<T | null> {
    const result = this.getAll<T>(key);
    if (!result.success) {
      return result;
    }

    return { success: true, data: result.data.find((item) => item.id === id) ?? null };
  }

  /** Guarda un nuevo registro. */
  save<T extends { id: string }>(key: string, item: T): Result<T> {
    const result = this.getAll<T>(key);
    if (!result.success) {
      return result;
    }

    this.storage.setItem(key, JSON.stringify([...result.data, item]));
    return { success: true, data: item };
  }

  /** Actualiza un registro existente. */
  update<T extends { id: string }>(key: string, id: string, changes: Partial<T>): Result<T> {
    const result = this.getAll<T>(key);
    if (!result.success) {
      return result;
    }

    let actualizado: T | null = null;
    const data = result.data.map((item) => {
      if (item.id !== id) {
        return item;
      }

      actualizado = { ...item, ...changes };
      return actualizado;
    });

    if (!actualizado) {
      return { success: false, error: 'Registro no encontrado' };
    }

    this.storage.setItem(key, JSON.stringify(data));
    return { success: true, data: actualizado };
  }

  /** Elimina un registro por id. */
  delete<T extends { id: string }>(key: string, id: string): Result<T[]> {
    const result = this.getAll<T>(key);
    if (!result.success) {
      return result;
    }

    const data = result.data.filter((item) => item.id !== id);
    this.storage.setItem(key, JSON.stringify(data));
    return { success: true, data };
  }

  setItem(key: string, value: string): Result<string> {
    try {
      this.storage.setItem(key, value);
      return { success: true, data: value };
    } catch (error) {
      return { success: false, error: this.toMessage(error) };
    }
  }

  getItem(key: string): Result<string | null> {
    try {
      return { success: true, data: this.storage.getItem(key) };
    } catch (error) {
      return { success: false, error: this.toMessage(error) };
    }
  }

  private toMessage(error: unknown): string {
    return error instanceof Error ? error.message : 'Error inesperado de almacenamiento';
  }
}
